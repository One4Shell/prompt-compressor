window.CompressorModules = (function () {
    const ORDER = ['lite', 'rtk', 'headroom', 'caveman', 'prose', 'custom'];

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
        return text;
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

        let lines = text.split('\n');

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

        return lines.join('\n');
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

        const bareJson = text.trim();
        if (bareJson.startsWith('[') || bareJson.startsWith('{')) {
            const processed = processJsonContent(bareJson);
            if (processed) {
                text = processed.content;
            }
        }

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
            case 'lite': return lite(text, o);
            case 'rtk': return rtk(text, o);
            case 'headroom': return headroom(text, o);
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
            cur = run(name, cur, mod);
            if (onStage) onStage(name, cur);
        }
        return cur;
    }

    return { ORDER, run, runAll };
})();