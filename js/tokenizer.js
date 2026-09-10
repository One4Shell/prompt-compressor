window.CompressorTokenizer = (function () {
    const CDN_URL = 'https://cdn.jsdelivr.net/npm/gpt-tokenizer@2/+esm';

    let mode = 'heuristic';
    let encodeFn = null;

    const CACHE_MAX = 16;
    const CACHE_MAX_LEN = 500000;
    const cache = new Map();

    function heuristic(str) {
        if (!str) return 0;
        return Math.ceil(str.length / 3.8);
    }

    function compute(str) {
        if (mode === 'bpe' && encodeFn) {
            try {
                return encodeFn(str).length;
            } catch (e) {
                mode = 'heuristic';
            }
        }
        return heuristic(str);
    }

    function count(str) {
        if (!str) return 0;
        if (str.length > CACHE_MAX_LEN) return compute(str);
        const hit = cache.get(str);
        if (hit !== undefined) return hit;
        const val = compute(str);
        if (cache.size >= CACHE_MAX) cache.delete(cache.keys().next().value);
        cache.set(str, val);
        return val;
    }

    function clearCache() {
        cache.clear();
    }

    async function init() {
        try {
            const mod = await import(CDN_URL);
            encodeFn = mod.encode;
            mode = 'bpe';
        } catch (e) {
            mode = 'heuristic';
        }
        clearCache();
        return mode;
    }

    return {
        init,
        count,
        heuristic,
        clearCache,
        getMode: () => mode
    };
})();