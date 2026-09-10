window.CompressorModules = (function () {
    const ORDER = ['privacy', 'lite', 'rtk', 'headroom', 'caveman', 'prose', 'custom', 'toon'];

    // ---- Privacy: redazione dati sensibili ----

    // Luhn: true se la sequenza di cifre e' una carta di credito valida.
    function luhnValid(digits) {
        let sum = 0;
        let double = false;
        for (let i = digits.length - 1; i >= 0; i--) {
            let d = digits.charCodeAt(i) - 48;
            if (double) {
                d *= 2;
                if (d > 9) d -= 9;
            }
            sum += d;
            double = !double;
        }
        return sum % 10 === 0;
    }

    // IBAN: validazione lunghezza + mod-97 (BBAN a cifre). True se plausibile.
    function ibanValid(iban) {
        const compact = iban.replace(/\s+/g, '').toUpperCase();
        if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(compact)) return false;
        const reordered = compact.slice(4) + compact.slice(0, 4);
        let mod = 0;
        for (const ch of reordered) {
            if (ch >= '0' && ch <= '9') {
                mod = (mod * 10 + (ch.charCodeAt(0) - 48)) % 97;
            } else {
                mod = (mod * 100 + (ch.charCodeAt(0) - 55)) % 97;
            }
        }
        return mod === 1;
    }

    // Determina se il match e' un valore scalare JSON nudo (non dentro una
    // stringa): in tal caso il placeholder va quotato per non rompere il JSON.
    function isBareJsonScalar(text, start, end) {
        let i = start - 1;
        while (i >= 0 && (text[i] === ' ' || text[i] === '\t')) i--;
        const prev = text[i];
        if (prev === '"') return false;
        if (prev !== ':' && prev !== ',' && prev !== '[' && prev !== '{' && prev !== '(') return false;
        let j = end;
        while (j < text.length && (text[j] === ' ' || text[j] === '\t')) j++;
        const next = text[j];
        return next === ',' || next === '}' || next === ']' || next === ')' || next === undefined || next === '\n' || next === '\r';
    }

    // Sostituisce tutti i match di "re" con il placeholder, quotandolo se
    // appare come valore JSON nudo. "pick" (opzionale) restituisce
    // { index, 0 } relativo al match: la porzione da rimpiazzare. Se pick
    // ritorna null il match viene ignorato (es. card non Luhn-valida).
    function redact(text, re, label, pick) {
        return text.replace(re, (...args) => {
            const match = args[0];
            const offset = args[args.length - 2];
            const full = args[args.length - 1];
            const value = pick ? pick(...args) : { index: 0, 0: match };
            if (value === null || value === undefined) return match;
            const end = offset + match.length;
            const placeholder = isBareJsonScalar(full, offset, end) ? `"${label}"` : label;
            return match.slice(0, value.index) + placeholder + match.slice(value.index + value[0].length);
        });
    }

    const PEM_KEY_RE = /-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z0-9 ]*PRIVATE KEY-----/g;
    const JWT_RE = /\beyJ[A-Za-z0-9_-]{5,}\.[A-Za-z0-9_-]{5,}\.[A-Za-z0-9_-]{5,}\b/g;
    const API_KEY_RE = /\b(?:(?:sk-(?:proj-)?[A-Za-z0-9_-]{20,})|(?:AKIA|ASIA)[0-9A-Z]{16}|(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{22,}|AIza[0-9A-Za-z_-]{35}|xox[baprs]-[A-Za-z0-9-]{10,}|(?:sk|pk|rk)_(?:live|test)_[A-Za-z0-9]{16,})\b/g;
    const BEARER_RE = /\bBearer\s+[A-Za-z0-9_\-\.=]{16,}\b/g;
    const GENERIC_SECRET_RE = /\b(?:api[_-]?key|apikey|access[_-]?token|auth[_-]?token|client[_-]?secret|secret[_-]?key)\b\s*[:=]\s*["']?[A-Za-z0-9_\-\.\/+]{12,}["']?/gi;
    const PASSWORD_RE = /\b(?:password|passwd|pwd|pass)\b\s*[:=]\s*["']?[^\s"',;]{3,}["']?/gi;
    const CARD_RE = /\b(?:\d[ -]?){12,18}\d\b/g;
    const IBAN_RE = /\b[A-Z]{2}[ ]?\d{2}(?:[ ]?[A-Z0-9]{4}){2,7}(?:[ ]?[A-Z0-9]{1,3})?\b/g;
    const EMAIL_RE = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
    const PHONE_RE = /(?<![A-Za-z0-9])[+()\d][\d\s.()-]{6,17}\d(?!\d)/g;

    function phoneValid(t) {
        if (/[:/]/.test(t)) return false;
        if (/^\d{1,3}(\.\d{1,3}){3}$/.test(t)) return false;
        if (/\d{4}[.-/]\d{1,2}[.-/]\d{1,2}/.test(t)) return false;
        if (/\d{1,2}[.-/]\d{1,2}[.-/]\d{4}/.test(t)) return false;
        const digits = t.replace(/[^\d]/g, '');
        if (digits.length < 8 || digits.length > 15) return false;
        if (/^\+/.test(t)) return true;
        return /[ .\-()]/.test(t);
    }

    function privacy(text, o) {
        if (o.pem) {
            text = text.replace(PEM_KEY_RE, '[REDACTED:PRIVATE_KEY]');
        }
        if (o.jwt) {
            text = text.replace(JWT_RE, '[REDACTED:JWT]');
        }
        if (o.apikeys) {
            text = redact(text, API_KEY_RE, '[REDACTED:API_KEY]');
            text = text.replace(BEARER_RE, 'Bearer [REDACTED:API_KEY]');
            text = redact(text, GENERIC_SECRET_RE, '[REDACTED:API_KEY]', (m) => {
                const eq = m.indexOf('=') !== -1 ? m.indexOf('=') : m.indexOf(':');
                if (eq === -1) return null;
                let valueStart = eq + 1;
                while (valueStart < m.length && (m[valueStart] === ' ' || m[valueStart] === '\t')) valueStart++;
                const value = m.slice(valueStart);
                if (!value.replace(/^["']|["']$/g, '')) return null;
                return { index: valueStart, 0: value };
            });
        }
        if (o.passwords) {
            text = text.replace(/\b[A-Za-z][A-Za-z0-9+.-]*:\/\/[A-Za-z0-9._~%+-]+:([^@/\s]+)@/g,
                (m, p) => m.replace(`:${p}@`, ':[REDACTED:PASSWORD]@'));
            text = redact(text, PASSWORD_RE, '[REDACTED:PASSWORD]', (m) => {
                const eq = m.indexOf('=') !== -1 ? m.indexOf('=') : m.indexOf(':');
                if (eq === -1) return null;
                let valueStart = eq + 1;
                while (valueStart < m.length && (m[valueStart] === ' ' || m[valueStart] === '\t')) valueStart++;
                const value = m.slice(valueStart);
                if (!value.replace(/^["']|["']$/g, '')) return null;
                return { index: valueStart, 0: value };
            });
        }
        if (o.cards) {
            text = redact(text, CARD_RE, '[REDACTED:CC]', (m) => {
                const digits = m.replace(/[ -]/g, '');
                if (digits.length < 13 || digits.length > 19 || !luhnValid(digits)) return null;
                return { index: 0, 0: m };
            });
        }
        if (o.iban) {
            text = redact(text, IBAN_RE, '[REDACTED:IBAN]', (m) => {
                return ibanValid(m) ? { index: 0, 0: m } : null;
            });
        }
        if (o.emails) {
            text = redact(text, EMAIL_RE, '[REDACTED:EMAIL]');
        }
        if (o.phones) {
            text = redact(text, PHONE_RE, '[REDACTED:PHONE]', (m) => {
                return phoneValid(m) ? { index: 0, 0: m } : null;
            });
        }
        return text;
    }

    function lite(text, o) {
        if (o.trim) {
            text = text.split('\n').map(line => line.trim()).join('\n');
        }
        if (o.emptyLines) {
            text = text.replace(/\n{3,}/g, '\n\n');
        }
        if (o.markdown) {
            text = text.replace(/\*\*([ \t]*)\*\*/g, '')
                       .replace(/__([ \t]*)__/g, '')
                       .replace(/[-*_]{4,}/g, '---');
        }
        if (o.strip) {
            text = stripFormatting(text);
        }
        return text;
    }

    // Rimuove i caratteri di formattazione markdown/HTML mantenendo il
    // contenuto. I blocchi fence ``` sono protetti: il codice resta
    // intatto e vengono eliminate solo le righe marker.
    function stripFormatting(text) {
        const n = text.length;
        let out = '';
        let i = 0;

        while (i < n) {
            const fenceAt = text.indexOf('```', i);
            if (fenceAt === -1) {
                out += stripSegment(text.slice(i));
                break;
            }
            out += stripSegment(text.slice(i, fenceAt));

            const infoEnd = text.indexOf('\n', fenceAt + 3);
            const bodyStart = infoEnd === -1 ? n : infoEnd + 1;
            const close = text.indexOf('```', bodyStart);
            if (close === -1) {
                out += text.slice(bodyStart);
                break;
            }
            out += text.slice(bodyStart, close);

            let after = close + 3;
            if (text[after] === '\n') after++;
            i = after;
        }

        return out;
    }

    function stripSegment(text) {
        text = text.replace(/<!--[\s\S]*?-->\n?/g, '')
                   .replace(/^[ \t]*<\/?[a-zA-Z][^>]*>[ \t]*$\n?/gm, '')
                   .replace(/<\/?[a-zA-Z][^>]*>/g, '')
                   .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
                   .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
                   .replace(/\[([^\]]*)\]\[[^\]]*\]/g, '$1')
                   .replace(/~~([^~]+)~~/g, '$1')
                   .replace(/\*{1,3}([^*\n]+?)\*{1,3}/g, '$1')
                   .replace(/(^|[^\w\\])_{1,3}([^_\n]+?)_{1,3}($|[^\w])/g, '$1$2$3')
                   .replace(/`+([^`\n]+?)`+/g, '$1');

        text = text.replace(/^[ \t]{0,3}#{1,6}[ \t]+/gm, '')
                   .replace(/^[ \t]{0,3}>[ \t]?/gm, '')
                   .replace(/^[ \t]{0,3}>[ \t]?/gm, '')
                   .replace(/^[ \t]{0,3}([-*_][ \t]*){3,}$\n?/gm, '')
                   .replace(/^[ \t]*[-*+][ \t]+/gm, '')
                   .replace(/^([ \t]*\d+)[.)][ \t]+/gm, '$1 ')
                   .replace(/^[ \t]*\|?[ \t]*:?-{1,}:?([ \t]*\|[ \t]*:?-{1,}:?)*[ \t]*\|?[ \t]*$\n?/gm, '')
                   .replace(/^[ \t]*\|[ \t]?/gm, '')
                   .replace(/[ \t]?\|[ \t]*$/gm, '');

        return text.replace(/([!?])\1+/g, '$1')
                   .replace(/\.{4,}/g, '...')
                   .replace(/[ \t]{2,}/g, ' ')
                   .replace(/\n{3,}/g, '\n\n');
    }

    function rtk(text, o) {
        if (o.ansi) {
            text = text.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-n]/g, '');
        }
        if (o.timestamps) {
            text = text.replace(/\[[ \t]*\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2}(?:\.\d+)?[^\]]*\]/g, '')
                       .replace(/\b\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?\b/gi, '')
                       .replace(/\[\d{2}:\d{2}:\d{2}(\.\d+)?\]/g, '')
                       .replace(/\b\d{2}:\d{2}:\d{2}\b/g, '');
        }
        if (o.progress) {
            text = text.replace(/\[[=#>-]+\s*\]\s*\d{1,3}%?/g, '')
                       .replace(/[█▓▒░\=\-\>\#]{5,}/g, '');
        }

        if (o.stacktrace || o.dedupe || o.counters) {
            text = rtkLinePass(text, o);
        }
        return text;
    }

    // Applica le trasformazioni riga-per-riga di RTK solo ai segmenti di
    // testo normale: i blocchi JSON (nudi o nei fence) vengono saltati
    // (vd. splitProtected) cosi' restano validi per Headroom e TOON.
    function rtkLinePass(text, o) {
        return splitProtected(text)
            .map(seg => seg.protected ? seg.text : rtkLines(seg.text.split('\n'), o).join('\n'))
            .join('');
    }

    function rtkLines(lines, o) {
        if (o.stacktrace) {
            lines = lines.filter(line => {
                const t = line.trim();
                if (!t) return true;
                if (/^at\s+.*\(\S+:\d+\)$/.test(t)) return false;
                if (/^at\s+\S+:\d+:\d+$/.test(t)) return false;
                if (/^File\s+"[^"]+",\s*line\s+\d+/.test(t)) return false;
                if (/^Traceback\s*\(most recent call last\):/.test(t)) return false;
                if (/^in\s+<module>$/.test(t)) return false;
                if (/^\s*from\s+\S+\s+import\s+/.test(t)) return false;
                if (/^\s*(raise|throw)\s+/.test(t)) return false;
                return true;
            });
        }

        if (o.dedupe) {
            const filtered = [];
            let lastLine = '';
            let repeatCount = 0;

            for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed !== '' && trimmed === lastLine) {
                    repeatCount++;
                } else {
                    if (repeatCount > 0) {
                        filtered.push(`[... ${repeatCount + 1}x righe omesse ...]`);
                        repeatCount = 0;
                    }
                    filtered.push(line);
                    lastLine = trimmed;
                }
            }
            if (repeatCount > 0) {
                filtered.push(`[... ${repeatCount + 1}x righe omesse ...]`);
            }
            lines = filtered;
        }

        if (o.counters) {
            lines = collapseNumericVariants(lines);
        }

        return lines;
    }

    function numericSignature(line) {
        let replaced = false;
        const sig = line
            .replace(/\b(?:0x[0-9a-f]+|0x[0-9A-F]+)\b/g, '#')
            .replace(/\b\d{12,}\b/g, '#id')
            .replace(/\b\d{1,6}\b/g, '#')
            .replace(/[a-f0-9]{32,64}/gi, '#h');
        if (sig !== line) replaced = true;
        return replaced ? sig : '';
    }

    function collapseNumericVariants(lines) {
        const result = [];
        for (let i = 0; i < lines.length; i++) {
            const sig = numericSignature(lines[i]);
            if (!sig) {
                result.push(lines[i]);
                continue;
            }
            let j = i + 1;
            while (j < lines.length) {
                const nextSig = numericSignature(lines[j]);
                if (nextSig && nextSig === sig) j++;
                else break;
            }
            const count = j - i;
            if (count > 1) {
                result.push(lines[i]);
                result.push(`[... ${count - 1}x variazioni ...]`);
                i = j - 1;
            } else {
                result.push(lines[i]);
            }
        }
        return result;
    }

    // Scansione di un candidato JSON a partire da "start": traccia lo stato
    // stringa (con escape) e la profondita' {/[ ; ritorna l'indice dopo la
    // chiusura bilanciata, oppure -1 se non si chiude.
    function scanJsonCandidate(text, start) {
        let depth = 0;
        let inString = false;
        for (let i = start; i < text.length; i++) {
            const ch = text[i];
            if (inString) {
                if (ch === '\\') i++;
                else if (ch === '"') inString = false;
                continue;
            }
            if (ch === '"') inString = true;
            else if (ch === '{' || ch === '[') depth++;
            else if (ch === '}' || ch === ']') {
                depth--;
                if (depth === 0) return i + 1;
                if (depth < 0) return -1;
            }
        }
        return -1;
    }

    // Trova TUTTI i blocchi JSON embedded nel testo misto (prosa + JSON).
    // Un blocco e' valido solo se: inizia a inizio riga (solo whitespace
    // prima sulla riga), le parentesi si bilanciano e JSON.parse ha successo.
    // Le regioni gia' dentro fence ``` sono saltate.
    function findJsonBlocks(text) {
        const blocks = [];
        const n = text.length;
        let i = 0;

        while (i < n) {
            const ch = text[i];

            if (ch === '`' && text.startsWith('```', i)) {
                const close = text.indexOf('```', i + 3);
                i = close === -1 ? n : close + 3;
                continue;
            }

            if (ch === '{' || ch === '[') {
                const lineStart = text.lastIndexOf('\n', i - 1) + 1;
                if (text.slice(lineStart, i).trim() === '') {
                    const end = scanJsonCandidate(text, i);
                    if (end !== -1) {
                        try {
                            JSON.parse(text.slice(i, end));
                            blocks.push({ start: i, end });
                            i = end;
                            continue;
                        } catch (e) { /* non e' JSON valido: continua la scansione */ }
                    }
                }
            }
            i++;
        }
        return blocks;
    }

    // Sostituisce i blocchi JSON individuati da findJsonBlocks applicando
    // "process" a ciascuno; i blocchi per cui process ritorna null/undefined
    // restano intatti. La sostituzione avviene in ordine inverso per
    // preservare gli indici dei blocchi precedenti.
    function replaceJsonBlocks(text, process) {
        const blocks = findJsonBlocks(text);
        for (let b = blocks.length - 1; b >= 0; b--) {
            const block = blocks[b];
            const replacement = process(text.slice(block.start, block.end));
            if (replacement !== null && replacement !== undefined) {
                text = text.slice(0, block.start) + replacement + text.slice(block.end);
            }
        }
        return text;
    }

    // True se la stringa e' JSON valido.
    function isJson(str) {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Divide il testo in segmenti alternati { protected, text }. Sono
    // protetti i blocchi JSON nudi (individuati da findJsonBlocks, che
    // salta l'interno dei fence) e i fence con info "json" o contenuto
    // JSON valido: le trasformazioni riga-per-riga di RTK non devono
    // toccarli, pena JSON invalido per Headroom e TOON.
    function splitProtected(text) {
        const spans = [];

        let i = 0;
        while (i < text.length) {
            const fenceAt = text.indexOf('```', i);
            if (fenceAt === -1) break;
            const infoEnd = text.indexOf('\n', fenceAt + 3);
            const info = text.slice(fenceAt + 3, infoEnd === -1 ? text.length : infoEnd).trim().toLowerCase();
            const bodyStart = infoEnd === -1 ? text.length : infoEnd + 1;
            const close = text.indexOf('```', bodyStart);
            const end = close === -1 ? text.length : close + 3;
            if (info === 'json' || (close !== -1 && isJson(text.slice(bodyStart, close).trim()))) {
                spans.push({ start: fenceAt, end });
            }
            i = end;
        }

        for (const block of findJsonBlocks(text)) {
            spans.push(block);
        }

        spans.sort((a, b) => a.start - b.start);

        const segments = [];
        let pos = 0;
        for (const span of spans) {
            if (span.start < pos) continue;
            if (span.start > pos) segments.push({ protected: false, text: text.slice(pos, span.start) });
            segments.push({ protected: true, text: text.slice(span.start, span.end) });
            pos = span.end;
        }
        if (pos < text.length) segments.push({ protected: false, text: text.slice(pos) });
        return segments;
    }

    function headroom(text, o) {
        const processJsonContent = (jsonStr) => {
            try {
                const parsed = JSON.parse(jsonStr.trim());

                if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0] !== null) {
                    const keys = Object.keys(parsed[0]);

                    if (o.stripKeys) {
                        const rows = parsed.map(obj => keys.map(k => {
                            let val = obj[k];
                            if (val === null || val === undefined) return '';
                            if (typeof val === 'string' && (val.includes(',') || val.includes('\n'))) {
                                return `"${val.replace(/"/g, '""')}"`;
                            }
                            return val;
                        }).join(','));
                        return { content: rows.join('\n'), wrapper: 'csv' };
                    }

                    if (o.csv) {
                        const header = keys.join(',');
                        const rows = parsed.map(obj => keys.map(k => {
                            let val = obj[k];
                            if (val === null || val === undefined) return '';
                            if (typeof val === 'string' && (val.includes(',') || val.includes('\n'))) {
                                return `"${val.replace(/"/g, '""')}"`;
                            }
                            return val;
                        }).join(','));
                        return { content: [header, ...rows].join('\n'), wrapper: 'csv' };
                    }
                }

                if (o.minify) {
                    return { content: JSON.stringify(parsed), wrapper: 'json' };
                }
            } catch (e) {
                return null;
            }
            return null;
        };

        text = text.replace(/```(?:json)?\s*([\s\S]*?)\s*```/gi, (match, code) => {
            const processed = processJsonContent(code);
            if (processed) {
                return `\`\`\`${processed.wrapper}\n${processed.content}\n\`\`\``;
            }
            return match;
        });

        text = replaceJsonBlocks(text, (jsonStr) => {
            const processed = processJsonContent(jsonStr);
            return processed ? processed.content : null;
        });

        if (o.hashes) {
            text = text.replace(/\b([a-f0-9]{32,64})\b/gi, (match) => match.substring(0, 8) + '...' + match.substring(match.length - 6));
        }

        if (o.base64) {
            text = text.replace(/\b([A-Za-z0-9+/]{28,}={0,2})\b/g, (match) => {
                if (/^[a-f0-9]{32,64}$/i.test(match)) return match;
                return match.substring(0, 12) + '...' + match.substring(match.length - 6);
            });
        }

        return text;
    }

    function toon(text, o) {
        const delimiter = o.delimiter === '\t' || o.delimiter === '|' ? o.delimiter : ',';
        const encodeJson = (jsonStr) => {
            try {
                const parsed = JSON.parse(jsonStr.trim());
                return window.ToonEncoder.encode(parsed, { delimiter });
            } catch (e) {
                return null;
            }
        };

        text = text.replace(/```(?:json)?\s*([\s\S]*?)\s*```/gi, (match, code) => {
            const processed = encodeJson(code);
            if (processed !== null) {
                return '```toon\n' + processed + '\n```';
            }
            return match;
        });

        text = replaceJsonBlocks(text, (jsonStr) => {
            const encoded = encodeJson(jsonStr);
            return encoded !== null ? '```toon\n' + encoded + '\n```' : null;
        });

        return text;
    }

    function caveman(text, o) {
        const dict = window.CompressorDicts.CAVEMAN[o.lang] || window.CompressorDicts.CAVEMAN.it;

        if (o.fillers) {
            dict.fillers.forEach(regex => {
                text = text.replace(regex, '');
            });
        }
        if (o.articles) {
            text = text.replace(dict.articles, '');
        }
        if (o.prepositions) {
            text = text.replace(dict.prepositions, '');
        }
        if (o.telegraph) {
            text = text.replace(dict.pronouns, '');
        }
        if (o.intensifiers) {
            text = text.replace(dict.intensifiers, '');
        }

        return text.replace(/[ \t]{2,}/g, ' ').replace(/\n /g, '\n');
    }

    function prose(text, o) {
        const dict = window.CompressorDicts.PROSE[o.lang] || window.CompressorDicts.PROSE.it;
        dict.forEach(regex => {
            text = text.replace(regex, '');
        });
        return text.replace(/[ \t]{2,}/g, ' ').replace(/\n /g, '\n');
    }

    function customWords(text, words) {
        if (!words || words.length === 0) return text;
        const safeWords = words.map(w => w.trim()).filter(Boolean);
        if (safeWords.length === 0) return text;

        let re;
        try {
            re = new RegExp(`\\b(${safeWords.join('|')})\\b`, 'gi');
        } catch (e) {
            const esc = safeWords.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
            re = new RegExp(`\\b(${esc.join('|')})\\b`, 'gi');
        }
        return text.replace(re, '').replace(/[ \t]{2,}/g, ' ');
    }

    function run(name, text, o) {
        switch (name) {
            case 'privacy': return privacy(text, o);
            case 'lite': return lite(text, o);
            case 'rtk': return rtk(text, o);
            case 'headroom': return headroom(text, o);
            case 'toon': return toon(text, o);
            case 'caveman': return caveman(text, o);
            case 'prose': return prose(text, o);
            case 'custom': return customWords(text, o.words || []);
            default: return text;
        }
    }

    function runAll(text, opts, onStage) {
        let cur = text;
        for (const name of ORDER) {
            const mod = opts[name];
            if (!mod || !mod.on) continue;
            const prev = cur;
            cur = run(name, cur, mod);
            if (onStage) onStage(name, cur, prev);
        }
        return cur;
    }

    return { ORDER, run, runAll, findJsonBlocks };
})();