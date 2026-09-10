window.ToonEncoder = (function () {
    const INDENT = '  ';

    function isObject(v) {
        return v !== null && typeof v === 'object' && !Array.isArray(v);
    }

    function isPrimitive(v) {
        return v === null || typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean';
    }

    function canonicalNumber(n) {
        if (Number.isNaN(n) || !Number.isFinite(n)) return 'null';
        const abs = Math.abs(n);
        if (n === 0 || (abs >= 1e-6 && abs < 1e21)) {
            let s = String(n);
            if (/\./.test(s)) {
                s = s.replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '');
            }
            if (s === '0.') s = '0';
            if (Object.is(n, -0)) s = '0';
            return s;
        }
        return String(n);
    }

    function normalizeValue(value) {
        if (value instanceof Date) return value.toISOString();
        if (typeof value === 'bigint') return String(value);
        if (value === undefined || typeof value === 'function' || typeof value === 'symbol') return null;
        if (typeof value === 'object') {
            if (typeof value.toJSON === 'function') return normalizeValue(value.toJSON());
            if (value instanceof Map) {
                const out = {};
                for (const [k, v] of value) out[String(k)] = normalizeValue(v);
                return out;
            }
            if (value instanceof Set) return Array.from(value, normalizeValue);
            if (Array.isArray(value)) return value.map(normalizeValue);
            const out = {};
            for (const k of Object.keys(value)) out[k] = normalizeValue(value[k]);
            return out;
        }
        return value;
    }

    const NEEDS_ESCAPE = /[\\"\n\r\t\u0000-\u001f]/;
    function escapeString(s) {
        let out = '';
        for (const ch of s) {
            const code = ch.codePointAt(0);
            if (code === 0x5c) out += '\\\\';
            else if (code === 0x22) out += '\\"';
            else if (code === 0x0a) out += '\\n';
            else if (code === 0x0d) out += '\\r';
            else if (code === 0x09) out += '\\t';
            else if (code < 0x20) out += '\\u' + code.toString(16).toUpperCase().padStart(4, '0');
            else out += ch;
        }
        return out;
    }

    const NUMBER_RE = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/;
    function looksLikeNumber(s) {
        return NUMBER_RE.test(s) && s !== '' && s[0] !== '+';
    }

    function needsQuote(s, delimiter) {
        if (s === '') return true;
        if (/^[ \t]|[ \t]$/.test(s)) return true;
        if (s === 'true' || s === 'false' || s === 'null') return true;
        if (looksLikeNumber(s)) return true;
        if (/[:\\"{}\[\]]/.test(s)) return true;
        if (/[\u0000-\u001f]/.test(s)) return true;
        if (s.includes(delimiter)) return true;
        if (s === '-' || (s[0] === '-' && s.length > 1)) return true;
        if (s[0] === '#') return true;
        return false;
    }

    function quoteIfNeeded(v, delimiter) {
        if (typeof v === 'string') {
            if (needsQuote(v, delimiter)) {
                return '"' + escapeString(v) + '"';
            }
            return v;
        }
        if (typeof v === 'number') return canonicalNumber(v);
        if (v === true) return 'true';
        if (v === false) return 'false';
        return 'null';
    }

    function keysEqual(a, b) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    function unionKeys(objs) {
        const set = new Set();
        for (const o of objs) {
            for (const k of Object.keys(o)) set.add(k);
        }
        return Array.from(set);
    }

    function isUniformObjects(objs) {
        if (objs.length === 0) return false;
        const firstKeys = Object.keys(objs[0]);
        for (const o of objs) {
            if (!isObject(o) || Object.keys(o).length === 0) return false;
            if (!keysEqual(Object.keys(o), firstKeys)) return false;
            for (const k of firstKeys) {
                const val = o[k];
                if (isObject(val) || Array.isArray(val)) return false;
            }
        }
        return true;
    }

    function buildFieldList(objs) {
        const keys = unionKeys(objs);
        const fields = [];
        for (const k of keys) {
            if (isUniformObjects(objs.map(o => o[k]))) {
                const sub = buildFieldList(objs.map(o => o[k]));
                fields.push({ key: k, children: sub });
            } else {
                fields.push({ key: k, children: null });
            }
        }
        return fields;
    }

    function fieldListToText(fields, delimiter) {
        return fields.map(f => {
            if (f.children) {
                return f.key + '{' + fieldListToText(f.children, delimiter) + '}';
            }
            return f.key;
        }).join(delimiter);
    }

    function rowCells(obj, fields, delimiter) {
        const cells = [];
        for (const f of fields) {
            if (f.children) {
                cells.push(...rowCells(obj[f.key], f.children, delimiter));
            } else {
                cells.push(quoteIfNeeded(obj[f.key], delimiter));
            }
        }
        return cells;
    }

    function sameFieldSets(objs) {
        if (objs.length === 0) return false;
        const firstKeys = Object.keys(objs[0]);
        for (const o of objs) {
            if (!isObject(o) || Object.keys(o).length === 0) return false;
            if (!keysEqual(Object.keys(o), firstKeys)) return false;
        }
        return isTabularColumns(objs, firstKeys);
    }

    function isTabularColumns(objs, keys) {
        for (const k of keys) {
            const col = objs.map(o => o[k]);
            if (col.some(Array.isArray)) return false;
            const prims = col.filter(v => isPrimitive(v) || v === undefined);
            const objsCol = col.filter(v => isObject(v));
            if (prims.length === col.length) continue;
            if (objsCol.length === col.length && isUniformObjects(col)) continue;
            return false;
        }
        return true;
    }

    function primitiveArrayInline(vals, delimiter) {
        return vals.map(v => quoteIfNeeded(v, delimiter)).join(delimiter);
    }

    function tabularBody(objs, fields, delimiter) {
        return objs.map(o => rowCells(o, fields, delimiter).join(delimiter)).join('\n');
    }

    function keyedEligible(keys, obj) {
        const uniformValues = keys.filter(k => isObject(obj[k]) && Object.keys(obj[k]).length > 0);
        if (uniformValues.length < 2) return false;
        return isUniformObjects(uniformValues.map(k => obj[k]));
    }

    function encodeObject(obj, delimiter, depth, prefixKey) {
        const lines = [];
        const keys = Object.keys(obj);
        const rootKeyed = depth === 0 && prefixKey === null && keyedEligible(keys, obj);

        if (keyedEligible(keys, obj)) {
            const fields = buildFieldList(keys.map(k => obj[k]));
            const header = (prefixKey !== null ? prefixKey : '')
                + '[' + keys.length + ':' + (delimiter === ',' ? '' : delimiter) + ']'
                + '{' + fieldListToText(fields, delimiter) + '}:';
            lines.push(repeat(INDENT, depth) + header);
            for (const k of keys) {
                const cells = rowCells(obj[k], fields, delimiter).join(delimiter);
                lines.push(repeat(INDENT, depth + 1) + quoteIfNeeded(k, delimiter) + ': ' + cells);
            }
            return lines;
        }

        for (const k of keys) {
            const val = obj[k];
            const keyLine = repeat(INDENT, depth) + quoteIfNeeded(k, delimiter) + ':';
            if (isObject(val)) {
                if (Object.keys(val).length === 0) {
                    lines.push(keyLine);
                } else if (keyedEligible(Object.keys(val), val)) {
                    lines.push(...encodeObject(val, delimiter, depth, k));
                } else {
                    lines.push(keyLine);
                    lines.push(...encodeObject(val, delimiter, depth + 1, null));
                }
            } else if (Array.isArray(val)) {
                lines.push(...encodeArray(val, delimiter, depth, k));
            } else {
                lines.push(keyLine + ' ' + quoteIfNeeded(val, delimiter));
            }
        }
        return lines;
    }

    function encodeArray(arr, delimiter, depth, key) {
        const headerIndent = repeat(INDENT, depth);
        const rowIndent = repeat(INDENT, depth + 1);
        const prefix = key !== null ? key + '[' + arr.length + (delimiter === ',' ? '' : delimiter) + ']' : '[' + arr.length + (delimiter === ',' ? '' : delimiter) + ']';
        const lines = [];

        if (arr.length === 0) {
            if (key !== null) {
                return [headerIndent + key + ': []'];
            }
            return ['[]'];
        }

        if (arr.every(isPrimitive)) {
            lines.push(headerIndent + prefix + ': ' + primitiveArrayInline(arr, delimiter));
            return lines;
        }

        if (sameFieldSets(arr)) {
            const fields = buildFieldList(arr);
            lines.push(headerIndent + prefix + '{' + fieldListToText(fields, delimiter) + '}:');
            const body = tabularBody(arr, fields, delimiter);
            body.split('\n').forEach(l => lines.push(rowIndent + l));
            return lines;
        }

        lines.push(headerIndent + prefix + ':');
        for (const item of arr) {
            if (isObject(item)) {
                const itemKeys = Object.keys(item);
                if (itemKeys.length === 0) {
                    lines.push(rowIndent + '-');
                    continue;
                }
                const firstKey = itemKeys[0];
                const firstVal = item[firstKey];
                const isFirstTabular = Array.isArray(firstVal) && sameFieldSets(firstVal) && firstVal.length > 0;
                if (isFirstTabular) {
                    const restKeys = itemKeys.slice(1);
                    const fields = buildFieldList(firstVal);
                    const subHeader = firstKey + '[' + firstVal.length + (delimiter === ',' ? '' : delimiter) + ']'
                        + '{' + fieldListToText(fields, delimiter) + '}:';
                    lines.push(rowIndent + '- ' + subHeader);
                    const rowsIndent = repeat(INDENT, depth + 3);
                    for (const row of firstVal) {
                        lines.push(rowsIndent + rowCells(row, fields, delimiter).join(delimiter));
                    }
                    const siblingIndent = rowIndent + '  ';
                    for (const rk of restKeys) {
                        const rv = item[rk];
                        if (isObject(rv)) {
                            lines.push(siblingIndent + quoteIfNeeded(rk, delimiter) + ':');
                            lines.push(...encodeObject(rv, delimiter, depth + 2, null));
                        } else if (Array.isArray(rv)) {
                            lines.push(...encodeArray(rv, delimiter, depth + 2, rk));
                        } else {
                            lines.push(siblingIndent + quoteIfNeeded(rk, delimiter) + ': ' + quoteIfNeeded(rv, delimiter));
                        }
                    }
                    continue;
                }
                lines.push(rowIndent + '- ' + quoteIfNeeded(firstKey, delimiter) + ': ' + quoteIfNeeded(firstVal, delimiter));
                const rest = itemKeys.slice(1);
                for (const rk of rest) {
                    const rv = item[rk];
                    if (isObject(rv)) {
                        lines.push(rowIndent + '  ' + quoteIfNeeded(rk, delimiter) + ':');
                        lines.push(...encodeObject(rv, delimiter, depth + 2, null));
                    } else if (Array.isArray(rv)) {
                        lines.push(...encodeArray(rv, delimiter, depth + 2, rk));
                    } else {
                        lines.push(rowIndent + '  ' + quoteIfNeeded(rk, delimiter) + ': ' + quoteIfNeeded(rv, delimiter));
                    }
                }
            } else if (Array.isArray(item)) {
                const sub = encodeArray(item, delimiter, depth + 1, null);
                const subHeader = sub[0].replace(/^ +/, '');
                lines.push(rowIndent + '- ' + subHeader);
                const innerIndent = repeat(INDENT, depth + 2);
                sub.slice(1).forEach(l => lines.push(innerIndent + l.replace(/^ +/, '')));
            } else {
                lines.push(rowIndent + '- ' + quoteIfNeeded(item, delimiter));
            }
        }
        return lines;
    }

    function repeat(ch, n) {
        return n <= 0 ? '' : ch.repeat(n);
    }

    function encode(value, options) {
        const opts = options || {};
        let delimiter = opts.delimiter === '\t' || opts.delimiter === '|' ? opts.delimiter : ',';
        const norm = normalizeValue(value);
        let lines;
        if (isObject(norm)) {
            if (Object.keys(norm).length === 0) {
                lines = [];
            } else {
                lines = encodeObject(norm, delimiter, 0, null);
            }
        } else if (Array.isArray(norm)) {
            lines = encodeArray(norm, delimiter, 0, null);
        } else {
            lines = [quoteIfNeeded(norm, delimiter)];
        }
        return lines.join('\n');
    }

    return { encode };
})();