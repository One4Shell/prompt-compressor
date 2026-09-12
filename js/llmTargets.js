window.LLMTargets = (function () {
    const PLACEHOLDER = 'IL_TUO_PROMPT';

    const DEFAULT_TEXT = [
        'BRAVE:          https://search.brave.com/ask?q=IL_TUO_PROMPT',
        'CHATGPT:        https://chatgpt.com/?q=IL_TUO_PROMPT',
        'GOOGLE-SEARCH:  https://www.google.com/search?udm=50&q=IL_TUO_PROMPT',
        'PERPLEXITY:     https://www.perplexity.ai/search?q=IL_TUO_PROMPT',
        'CLAUDE:         https://claude.ai/new?q=IL_TUO_PROMPT',
        'DUCK_AI:        https://duck.ai/chat?q=IL_TUO_PROMPT'
    ].join('\n');

    let targets = [];
    let loaded = false;

    // Parses "NOME: URL" lines (the LLM-url file format). Lines without the
    // placeholder are kept but never used to build a URL.
    function parse(text) {
        const list = [];
        for (const line of String(text || '').split(/\r?\n/)) {
            const idx = line.indexOf(':');
            if (idx <= 0) continue;
            const name = line.slice(0, idx).trim();
            const url = line.slice(idx + 1).trim();
            if (!name || !url) continue;
            list.push({ name, url });
        }
        return list;
    }

    async function load() {
        try {
            const res = await fetch('LLM-url');
            if (res.ok) {
                const parsed = parse(await res.text());
                if (parsed.length) {
                    targets = parsed;
                    loaded = true;
                    return targets;
                }
            }
        } catch (e) { /* file:// o CORS: usa i default */ }
        targets = parse(DEFAULT_TEXT);
        loaded = true;
        return targets;
    }

    function getTargets() {
        return targets;
    }

    function buildUrl(name, prompt) {
        const target = targets.find(t => t.name === name) || targets[0];
        if (!target || !target.url.includes(PLACEHOLDER)) return null;
        return target.url.replace(PLACEHOLDER, encodeURIComponent(prompt || ''));
    }

    return { load, getTargets, buildUrl, parse };
})();