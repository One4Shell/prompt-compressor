window.CompressorTokenizer = (function () {
    const CDN_URL = 'https://cdn.jsdelivr.net/npm/gpt-tokenizer@2/+esm';

    let mode = 'heuristic';
    let encodeFn = null;

    function heuristic(str) {
        if (!str) return 0;
        return Math.ceil(str.length / 3.8);
    }

    function count(str) {
        if (!str) return 0;
        if (mode === 'bpe' && encodeFn) {
            try {
                return encodeFn(str).length;
            } catch (e) {
                mode = 'heuristic';
            }
        }
        return heuristic(str);
    }

    async function init() {
        try {
            const mod = await import(CDN_URL);
            encodeFn = mod.encode;
            mode = 'bpe';
        } catch (e) {
            mode = 'heuristic';
        }
        return mode;
    }

    return {
        init,
        count,
        heuristic,
        getMode: () => mode
    };
})();