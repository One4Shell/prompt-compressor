window.CompressorDiff = (function () {
    const MAX_LINE_CELLS = 3000000;
    const MAX_WORD_TOKENS = 600;
    const MAX_TRACE_BYTES = 64 * 1024 * 1024;

    function escapeHtml(text) {
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    function myersDiff(a, b, cap) {
        const N = a.length, M = b.length;
        if (N === 0 && M === 0) return [];
        if (N === 0) return b.map((_, i) => ({ type: 'add', b: i }));
        if (M === 0) return a.map((_, i) => ({ type: 'del', a: i }));

        const max = N + M;
        const offset = max;
        const v = new Int32Array(2 * max + 1);
        const trace = [];
        let D = -1;

        for (let d = 0; d <= max; d++) {
            if (cap && d > cap) return null;
            trace.push(v.slice());
            if (trace.length * v.length * 4 > MAX_TRACE_BYTES) return null;
            for (let k = -d; k <= d; k += 2) {
                let x;
                if (k === -d || (k !== d && v[offset + k - 1] < v[offset + k + 1])) {
                    x = v[offset + k + 1];
                } else {
                    x = v[offset + k - 1] + 1;
                }
                let y = x - k;
                while (x < N && y < M && a[x] === b[y]) { x++; y++; }
                v[offset + k] = x;
                if (x >= N && y >= M) { D = d; break; }
            }
            if (D >= 0) break;
        }
        if (D < 0) return null;

        const ops = [];
        let x = N, y = M;
        for (let d = D; d >= 1; d--) {
            const vPrev = trace[d];
            const k = x - y;
            let prevK;
            if (k === -d || (k !== d && vPrev[offset + k - 1] < vPrev[offset + k + 1])) {
                prevK = k + 1;
            } else {
                prevK = k - 1;
            }
            const prevX = vPrev[offset + prevK];
            const prevY = prevX - prevK;
            while (x > prevX && y > prevY) {
                ops.push({ type: 'same', a: x - 1, b: y - 1 });
                x--; y--;
            }
            if (x === prevX) {
                ops.push({ type: 'add', b: y - 1 });
                y--;
            } else {
                ops.push({ type: 'del', a: x - 1 });
                x--;
            }
        }
        while (x > 0 && y > 0) {
            ops.push({ type: 'same', a: x - 1, b: y - 1 });
            x--; y--;
        }
        if (x > 0) { ops.push({ type: 'del', a: x - 1 }); x--; }
        if (y > 0) { ops.push({ type: 'add', b: y - 1 }); y--; }

        return ops.reverse();
    }

    function shareWord(lineA, lineB) {
        const wordsA = new Set(lineA.toLowerCase().split(/\s+/).filter(Boolean));
        return lineB.toLowerCase().split(/\s+/).some(w => wordsA.has(w));
    }

    function renderWordDiff(lineA, lineB) {
        const tokensA = lineA.split(/(\s+)/).filter(t => t !== '');
        const tokensB = lineB.split(/(\s+)/).filter(t => t !== '');
        if (tokensA.length + tokensB.length > MAX_WORD_TOKENS) {
            return `<span class="diff-del">${escapeHtml(lineA)}</span> <span class="diff-add">${escapeHtml(lineB)}</span>`;
        }

        const ops = myersDiff(tokensA, tokensB, 200);
        if (!ops) {
            return `<span class="diff-del">${escapeHtml(lineA)}</span> <span class="diff-add">${escapeHtml(lineB)}</span>`;
        }

        let html = '';
        for (const op of ops) {
            if (op.type === 'same') html += escapeHtml(tokensA[op.a]);
            else if (op.type === 'del') html += `<span class="diff-del">${escapeHtml(tokensA[op.a])}</span>`;
            else html += `<span class="diff-add">${escapeHtml(tokensB[op.b])}</span>`;
        }
        return html;
    }

    function positionalDiff(a, b) {
        let html = '';
        const len = Math.max(a.length, b.length);
        for (let k = 0; k < len; k++) {
            const o = a[k], c = b[k];
            if (o === undefined) html += `<span class="diff-add">${escapeHtml(c)}</span>\n`;
            else if (c === undefined) html += `<span class="diff-del">${escapeHtml(o)}</span>\n`;
            else if (o === c) html += escapeHtml(o) + '\n';
            else html += renderWordDiff(o, c) + '\n';
        }
        return html;
    }

    function render(orig, comp) {
        const diffViewer = document.getElementById('diffViewer');
        if (!orig) {
            diffViewer.innerHTML = '<span class="text-slate-500 italic">Inserisci un prompt per vedere la differenza...</span>';
            return;
        }

        const origLines = orig.split('\n');
        const compLines = comp.split('\n');

        let html;
        const cells = origLines.length * compLines.length;
        if (cells > MAX_LINE_CELLS) {
            html = positionalDiff(origLines, compLines);
        } else {
            const ops = myersDiff(origLines, compLines, 4000);
            if (!ops) {
                html = positionalDiff(origLines, compLines);
            } else {
                let out = '';
                for (let i = 0; i < ops.length; i++) {
                    const op = ops[i];
                    if (op.type === 'same') {
                        out += escapeHtml(origLines[op.a]) + '\n';
                    } else if (op.type === 'del') {
                        const next = ops[i + 1];
                        if (next && next.type === 'add' && shareWord(origLines[op.a], compLines[next.b])) {
                            out += renderWordDiff(origLines[op.a], compLines[next.b]) + '\n';
                            i++;
                        } else {
                            out += `<span class="diff-del">${escapeHtml(origLines[op.a])}</span>\n`;
                        }
                    } else {
                        out += `<span class="diff-add">${escapeHtml(compLines[op.b])}</span>\n`;
                    }
                }
                html = out;
            }
        }
        diffViewer.innerHTML = html;
    }

    return { render, myersDiff, escapeHtml };
})();