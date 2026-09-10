window.OmniGlyph = (function () {
    // Geometria pagina: entro i limiti di elaborazione vision Anthropic
    // (max 1568px lato lungo, max ~1.15 megapixel prima del downsample).
    const PAGE_W = 1152;
    const PAGE_H = 998;
    const PADDING = 8;
    const FOOTER_H = 12;
    const LINE_H = 1.2;
    const TAB_WIDTH = 4;

    const DENSITIES = {
        readable: 16,
        compact: 13,
        dense: 10
    };
    const AUTO_MIN_PX = DENSITIES.dense;
    const AUTO_MAX_PX = DENSITIES.readable;

    const FONT = (px) => `${px}px "Fira Code", "Courier New", monospace`;

    // Tariffazione immagini Anthropic: token = (larghezza x altezza) / 750
    function estimateTokens(w, h) {
        return Math.ceil((w * h) / 750);
    }

    function pageTokens() {
        return estimateTokens(PAGE_W, PAGE_H);
    }

    function makeCanvas() {
        const c = document.createElement('canvas');
        c.width = PAGE_W;
        c.height = PAGE_H;
        return c;
    }

    function minifyJson(str) {
        try {
            return JSON.stringify(JSON.parse(str.trim()));
        } catch (e) {
            return null;
        }
    }

    // Ottimizzazione solo-immagine: JSON minificato (fence rimossi) e
    // whitespace di scarto eliminato. L'output testuale resta invariato.
    function prepare(text) {
        text = text.replace(/```(?:json)?\s*([\s\S]*?)\s*```/gi, (match, code) => {
            const minified = minifyJson(code);
            return minified !== null ? minified : match;
        });

        if (window.CompressorModules && typeof window.CompressorModules.findJsonBlocks === 'function') {
            const blocks = window.CompressorModules.findJsonBlocks(text);
            for (let i = blocks.length - 1; i >= 0; i--) {
                const b = blocks[i];
                const minified = minifyJson(text.slice(b.start, b.end));
                if (minified !== null) {
                    text = text.slice(0, b.start) + minified + text.slice(b.end);
                }
            }
        } else {
            const bare = text.trim();
            if (bare.startsWith('[') || bare.startsWith('{')) {
                const minified = minifyJson(bare);
                if (minified !== null) text = minified;
            }
        }

        return text
            .split('\n').map(line => line.replace(/\s+$/, ''))
            .join('\n')
            .replace(/\n{3,}/g, '\n\n')
            .replace(/\n+$/, '');
    }

    function wrapLine(line, maxChars) {
        if (line.length <= maxChars) return [line];
        const out = [];
        let start = 0;
        while (start < line.length) {
            let end = Math.min(start + maxChars, line.length);
            if (end < line.length) {
                const sp = line.lastIndexOf(' ', end - 1);
                if (sp > start) end = sp + 1;
            }
            out.push(line.slice(start, end).replace(/\s+$/, ''));
            start = end;
        }
        return out;
    }

    function layout(text, ctx, fontPx) {
        ctx.font = FONT(fontPx);
        const charW = (ctx.measureText('M'.repeat(100)).width / 100) || fontPx * 0.6;
        const usableW = PAGE_W - PADDING * 2;
        const usableH = PAGE_H - PADDING * 2 - FOOTER_H;
        const maxChars = Math.max(8, Math.floor(usableW / charW));
        const lineH = fontPx * LINE_H;
        const linesPerPage = Math.max(1, Math.floor(usableH / lineH));
        const pad = ' '.repeat(TAB_WIDTH);
        const src = text.replace(/\r\n?/g, '\n').replace(/\t/g, pad).split('\n');
        const lines = [];
        for (const raw of src) {
            for (const wrapped of wrapLine(raw, maxChars)) lines.push(wrapped);
        }
        return { lines, lineH, linesPerPage };
    }

    // Densita' automatica: il font piu' grande (16 -> 10px) che tiene
    // tutto il testo su una singola pagina.
    function autoFontPx(text, ctx) {
        for (let px = AUTO_MAX_PX; px > AUTO_MIN_PX; px--) {
            const { lines, linesPerPage } = layout(text, ctx, px);
            if (lines.length <= linesPerPage) return px;
        }
        return AUTO_MIN_PX;
    }

    // Calcola il piano di impaginazione (font, righe, pagine) senza
    // disegnare: usato sia dal render sia dalla stima leggera dei token.
    function plan(text, densityKey) {
        const prep = prepare(text);
        const probe = makeCanvas();
        const probeCtx = probe.getContext('2d');
        const fontPx = densityKey === 'auto'
            ? autoFontPx(prep, probeCtx)
            : (DENSITIES[densityKey] || DENSITIES.compact);
        const { lines, lineH, linesPerPage } = layout(prep, probeCtx, fontPx);
        const totalPages = Math.max(1, Math.ceil(lines.length / linesPerPage));
        return { fontPx, lines, lineH, linesPerPage, totalPages, tokens: totalPages * pageTokens() };
    }

    // Stima i token immagine di una densita' senza generare le canvas.
    function measure(text, densityKey) {
        if (!text || !text.trim()) {
            return { pages: 0, tokens: 0, pageTokens: pageTokens(), fontPx: 0 };
        }
        const p = plan(text, densityKey);
        return { pages: p.totalPages, tokens: p.tokens, pageTokens: pageTokens(), fontPx: p.fontPx };
    }

    function render(text, densityKey) {
        if (!text || !text.trim()) {
            return { pages: [], tokens: 0, pageTokens: pageTokens() };
        }
        const { fontPx, lines, lineH, linesPerPage, totalPages } = plan(text, densityKey);
        const pages = [];

        for (let p = 0; p < totalPages; p++) {
            const c = makeCanvas();
            const ctx = c.getContext('2d');
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, PAGE_W, PAGE_H);
            ctx.fillStyle = '#000000';
            ctx.textBaseline = 'top';
            ctx.textAlign = 'left';
            ctx.font = FONT(fontPx);
            const first = p * linesPerPage;
            const last = Math.min(first + linesPerPage, lines.length);
            for (let i = first; i < last; i++) {
                ctx.fillText(lines[i], PADDING, PADDING + (i - first) * lineH);
            }
            ctx.fillStyle = '#888888';
            ctx.font = FONT(9);
            ctx.textAlign = 'right';
            ctx.fillText(`${p + 1}/${totalPages}`, PAGE_W - PADDING, PAGE_H - FOOTER_H + 2);
            ctx.textAlign = 'left';
            pages.push(c);
        }

        return { pages, tokens: pages.length * pageTokens(), pageTokens: pageTokens(), fontPx };
    }

    function toBlob(canvas) {
        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('toBlob failed')), 'image/png');
        });
    }

    return { render, measure, prepare, estimateTokens, pageTokens, toBlob, DENSITIES, PAGE_W, PAGE_H };
})();
