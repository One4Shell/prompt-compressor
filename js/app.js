const SAMPLE_PROMPTS = {
    system_mixed: `[2026-09-10 01:21:00] [DEBUG] Initializing system prompt agent...
[2026-09-10 01:21:01] [DEBUG] Fetching user payload parameters...
[2026-09-10 01:21:01] [DEBUG] Fetching user payload parameters...
[2026-09-10 01:21:01] [DEBUG] Fetching user payload parameters...

Ciao! Per favore, vorrei chiedere la tua assistenza professionale per analizzare un lista di utenti presenti nel nostro database. Potresti gentilmente assicurarti di prendere in considerazione ciascuno dei seguenti dati forniti qui sotto? È molto importante per il mio progetto!

\`\`\`json
[
  {
    "id": 101,
    "name": "Mario Rossi",
    "role": "Software Engineer",
    "department": "Engineering",
    "status": "Active"
  },
  {
    "id": 102,
    "name": "Giulia Bianchi",
    "role": "Product Manager",
    "department": "Product",
    "status": "Active"
  },
  {
    "id": 103,
    "name": "Luca Verdi",
    "role": "UX Designer",
    "department": "Design",
    "status": "Inactive"
  }
]
\`\`\`

Rimango in attesa di un tuo celere riscontro. Per cortesia genera un riassunto dettagliato dei ruoli. Grazie mille in anticipo per il tuo aiuto!`,

    caveman_prose: `Per favore, vorrei che tu agissi come un esperto senior di programmazione Python. Potresti gentilmente aiutarmi a scrivere una funzione che calcoli la sequenza di Fibonacci? 
Assicurati assolutamente che il codice sia efficiente, ben documentato e che gestisca in modo corretto tutti i casi limite come ad esempio i numeri negativi o lo zero.
Ti sarei davvero molto grato se potessi fornirmi anche degli esempi pratici di utilizzo di questa funzione. Grazie per la cortesia!`,

    caveman_extra: `Assolutamente, vorrei davvero che tu facessi molto più di scrivere solo un esempio di codice. Ti sarei davvero molto grato se potessi gentilmente includere commenti esplicativi davvero dettagliati, perché voglio comprendere completamente ogni singolo dettaglio. In conclusione, va notato che una documentazione chiara è estremamente importante per qualsiasi progetto serio. Spero di esserti stato d'aiuto, grazie mille in anticipo!`,

    rtk_logs: `\x1b[32m[INFO]\x1b[0m 2026-09-10T01:15:22Z Starting build process...
[2026-09-10 01:15:23] [DEBUG] Loading configuration files from /etc/app/config.json
[2026-09-10 01:15:24] [DEBUG] Connecting to database cluster at 10.0.0.1:5432...
[2026-09-10 01:15:24] [DEBUG] Connecting to database cluster at 10.0.0.1:5432...
[2026-09-10 01:15:24] [DEBUG] Connecting to database cluster at 10.0.0.1:5432...
[2026-09-10 01:15:25] [VERBOSE] Compiling module chunk 1 of 40...
[2026-09-10 01:15:25] [VERBOSE] Compiling module chunk 2 of 40...
[2026-09-10 01:15:25] [VERBOSE] Compiling module chunk 3 of 40...
[====================>                    ] 50%
[========================>                ] 60%
[========================================>] 100%
\x1b[31m[ERROR]\x1b[0m Failed to load asset bundle: 404 Not Found at https://cdn.example.com/assets/a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2.js
[2026-09-10 01:15:28] [INFO] Build completed with 1 non-fatal error.`,

    headroom_json: `\`\`\`json
[
  {
    "product_id": "PRD-001",
    "product_name": "Tastiera Meccanica RGB",
    "category": "Periferiche",
    "price_eur": 129.99,
    "in_stock": true
  },
  {
    "product_id": "PRD-002",
    "product_name": "Mouse Ergonomico Wireless",
    "category": "Periferiche",
    "price_eur": 59.50,
    "in_stock": true
  },
  {
    "product_id": "PRD-003",
    "product_name": "Monitor 4K 27 pollici",
    "category": "Schermi",
    "price_eur": 389.00,
    "in_stock": false
  }
]
\`\`\``,

    headroom_keys: `\`\`\`json
[
  {
    "user_id": "usr_ab12cd34ef56",
    "session_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1hcmlvIFJvc3NpIiwicm9sZSI6ImFkbWluIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    "email": "mario@example.com",
    "plan": "enterprise",
    "region": "eu-west-1",
    "login_count": 12,
    "risk_score": 0.07,
    "mfa_enabled": true
  },
  {
    "user_id": "usr_78gh90ij12kl",
    "session_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5ODc2NTQzMjEwIiwibmFtZSI6IkdpdWxpYSBCaWFuY2hpIiwicm9sZSI6ImVkaXRvciJ9.poIQ2xU6YqV0lBRy2qGqfllypRVYZ9iK7KkZz9k3QcM",
    "email": "giulia@example.com",
    "plan": "pro",
    "region": "eu-west-1",
    "login_count": 3,
    "risk_score": 0.42,
    "mfa_enabled": false
  }
]
\`\`\``,

    toon_mixed: `Riepilogo meteo per il lancio di domani. Ecco i dati strutturati:

\`\`\`json
{
  "location": {
    "city": "Berlin",
    "country": "DE",
    "units": "metric"
  },
  "alerts": ["frost", "wind"],
  "forecast": [
    {
      "day": "Mon",
      "temp": { "min": -2, "max": 4 },
      "condition": "snow",
      "rainChance": 80
    },
    {
      "day": "Tue",
      "temp": { "min": 1, "max": 7 },
      "condition": "cloudy",
      "rainChance": 20
    },
    {
      "day": "Wed",
      "temp": { "min": 3, "max": 11 },
      "condition": "sunny",
      "rainChance": 5
    }
  ]
}
\`\`\`

Analizza il meteo per i prossimi giorni.`,

    toon_keyed: `Ecco la configurazione degli ambienti di deploy:

\`\`\`json
{
  "environments": {
    "production": { "region": "eu-central-1", "replicas": 6, "debug": false },
    "staging": { "region": "eu-central-1", "replicas": 2, "debug": true }
  }
}
\`\`\`

Riassumi i settings di ogni ambiente.`
};

const COST_MODELS = {
    'gpt4o': { label: 'GPT-4o', price: 2.50 },
    'gpt4o-mini': { label: 'GPT-4o mini', price: 0.15 },
    'claude35-sonnet': { label: 'Claude 3.5 Sonnet', price: 3.00 },
    'claude35-haiku': { label: 'Claude 3.5 Haiku', price: 0.80 },
    'gemini15-pro': { label: 'Gemini 1.5 Pro', price: 1.25 },
    'deepseek-v3': { label: 'DeepSeek V3', price: 0.27 },
    'llama70b': { label: 'Llama 3.1 70B', price: 0.90 }
};

const AGGRESSION = {
    light: {
        mod_lite: true, lite_trim: true, lite_empty_lines: true, lite_markdown: true, lite_strip: false,
        mod_rtk: true, rtk_ansi: true, rtk_timestamps: true, rtk_dedupe: true, rtk_progress: true, rtk_counters: false, rtk_stacktrace: false,
        mod_headroom: true, headroom_minify: true, headroom_csv: true, headroom_hashes: false, headroom_base64: false, headroom_stripkeys: false,
        mod_toon: true, toon_delimiter: ',',
        mod_caveman: true, caveman_fillers: true, caveman_articles: true, caveman_preps: true, caveman_telegraph: false, caveman_intensifiers: false,
        mod_prose: false, mod_omniglyph: false
    },
    medium: {
        mod_lite: true, lite_trim: true, lite_empty_lines: true, lite_markdown: true, lite_strip: false,
        mod_rtk: true, rtk_ansi: true, rtk_timestamps: true, rtk_dedupe: true, rtk_progress: true, rtk_counters: true, rtk_stacktrace: false,
        mod_headroom: true, headroom_minify: true, headroom_csv: true, headroom_hashes: true, headroom_base64: true, headroom_stripkeys: false,
        mod_toon: true, toon_delimiter: ',',
        mod_caveman: true, caveman_fillers: true, caveman_articles: true, caveman_preps: true, caveman_telegraph: false, caveman_intensifiers: true,
        mod_prose: false, mod_omniglyph: false
    },
    extreme: {
        mod_lite: true, lite_trim: true, lite_empty_lines: true, lite_markdown: true, lite_strip: true,
        mod_rtk: true, rtk_ansi: true, rtk_timestamps: true, rtk_dedupe: true, rtk_progress: true, rtk_counters: true, rtk_stacktrace: true,
        mod_headroom: true, headroom_minify: true, headroom_csv: true, headroom_hashes: true, headroom_base64: true, headroom_stripkeys: true,
        mod_toon: true, toon_delimiter: '\t',
        mod_caveman: true, caveman_fillers: true, caveman_articles: true, caveman_preps: true, caveman_telegraph: true, caveman_intensifiers: true,
        mod_prose: true, mod_omniglyph: false
    }
};

// Spazio di ricerca del bottone Automatico. Solo le opzioni "sicure" (senza
// rimozione di contenuto informativo) vengono enumerate per combinazione;
// le opzioni distruttive restano forzate OFF. Ogni voce elenca i checkbox di
// un modulo e l'eventuale select (TOON delimiter) da provare.
const AUTO_SEARCH_MODULES = [
    { ids: ['mod_lite', 'lite_trim', 'lite_empty_lines', 'lite_markdown', 'lite_strip'], select: null },
    { ids: ['mod_rtk', 'rtk_ansi', 'rtk_progress', 'rtk_dedupe'], select: null },
    { ids: ['mod_headroom', 'headroom_minify', 'headroom_csv', 'headroom_hashes', 'headroom_base64'], select: null },
    { ids: ['mod_toon'], select: { id: 'toon_delimiter', values: [',', '\t', '|'] } }
];

const AUTO_FORCED_OFF = [
    'rtk_timestamps', 'rtk_counters', 'rtk_stacktrace',
    'headroom_stripkeys',
    'mod_caveman', 'caveman_fillers', 'caveman_articles', 'caveman_preps',
    'caveman_telegraph', 'caveman_intensifiers',
    'mod_prose', 'mod_omniglyph'
];

const AUTO_STATIC_IDS = ['caveman_lang', 'omniglyph_density', 'toon_delimiter'];

const AUTO_OPTION_IDS = (() => {
    const set = new Set(AUTO_STATIC_IDS);
    AUTO_SEARCH_MODULES.forEach(m => {
        m.ids.forEach(id => set.add(id));
        if (m.select) set.add(m.select.id);
    });
    AUTO_FORCED_OFF.forEach(id => set.add(id));
    return Array.from(set);
})();

const STAGE_INFO = {
    lite: { label: 'Lite Clean', cls: 'bg-sky-500/10 text-sky-400 border-sky-500/20', bar: 'bg-sky-500' },
    rtk: { label: 'RTK Filter', cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', bar: 'bg-emerald-500' },
    headroom: { label: 'Headroom', cls: 'bg-purple-500/10 text-purple-400 border-purple-500/20', bar: 'bg-purple-500' },
    toon: { label: 'TOON', cls: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20', bar: 'bg-cyan-500' },
    caveman: { label: 'Caveman', cls: 'bg-amber-500/10 text-amber-400 border-amber-500/20', bar: 'bg-amber-500' },
    prose: { label: 'Prose Compress', cls: 'bg-rose-500/10 text-rose-400 border-rose-500/20', bar: 'bg-rose-500' },
    omniglyph: { label: 'OmniGlyph', cls: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20', bar: 'bg-fuchsia-500' },
    custom: { label: 'Parole/Regex', cls: 'bg-slate-500/10 text-slate-400 border-slate-500/20', bar: 'bg-slate-500' }
};

const STORE_KEY = 'llm-compressor-v3';

const MODULE_IDS = ['lite', 'caveman', 'rtk', 'headroom', 'toon', 'prose', 'omniglyph'];

let isSidebarCollapsed = false;
let currentAggression = 'medium';
let toonAutoDisabled = false;
let debounceTimer = null;
let outputView = 'text';
let glyphState = { active: false, pages: [], urls: [], current: 0, tokens: 0, pageTokens: 0 };
let glyphSeq = 0;

function $(id) { return document.getElementById(id); }

const FLAT_SELECT_IDS = ['caveman_lang', 'toon_delimiter', 'omniglyph_density'];

const CHECKBOXES = Array.from(document.querySelectorAll('input[type=checkbox]')).filter(cb => cb.id);

const MODULE_CONTROLS = (() => {
    const map = {};
    for (const name of MODULE_IDS) {
        const toggle = $(`mod_${name}`);
        if (!toggle) continue;
        const card = toggle.closest('.module-card');
        map[name] = {
            toggle,
            card,
            controls: card ? Array.from(card.querySelectorAll('.sidebar-content input, .sidebar-content select')) : []
        };
    }
    return map;
})();

function readFlatState() {
    const flat = {};
    for (const cb of CHECKBOXES) flat[cb.id] = cb.checked;
    for (const id of FLAT_SELECT_IDS) {
        const el = $(id);
        if (el) flat[id] = el.value;
    }
    return flat;
}

function flatToOpts(flat, options) {
    const opts = options || {};
    const words = opts.words || $('customWords').value.split(',').map(w => w.trim()).filter(Boolean);
    const toonDisabled = !!opts.toonDisabled;
    return {
        lite: {
            on: flat.mod_lite,
            trim: flat.lite_trim,
            emptyLines: flat.lite_empty_lines,
            markdown: flat.lite_markdown,
            strip: flat.lite_strip
        },
        rtk: {
            on: flat.mod_rtk,
            ansi: flat.rtk_ansi,
            timestamps: flat.rtk_timestamps,
            dedupe: flat.rtk_dedupe,
            progress: flat.rtk_progress,
            counters: flat.rtk_counters,
            stacktrace: flat.rtk_stacktrace
        },
        headroom: {
            on: flat.mod_headroom,
            minify: flat.headroom_minify,
            csv: flat.headroom_csv,
            hashes: flat.headroom_hashes,
            base64: flat.headroom_base64,
            stripKeys: flat.headroom_stripkeys
        },
        toon: {
            on: flat.mod_toon && !toonDisabled,
            delimiter: flat.toon_delimiter
        },
        caveman: {
            on: flat.mod_caveman,
            lang: flat.caveman_lang,
            fillers: flat.caveman_fillers,
            articles: flat.caveman_articles,
            prepositions: flat.caveman_preps,
            telegraph: flat.caveman_telegraph,
            intensifiers: flat.caveman_intensifiers
        },
        prose: { on: flat.mod_prose, lang: flat.caveman_lang },
        omniglyph: {
            on: flat.mod_omniglyph,
            density: flat.omniglyph_density
        },
        custom: { on: words.length > 0, words }
    };
}

function writeFlatState(flat) {
    for (const id of Object.keys(flat)) {
        const el = $(id);
        if (!el) continue;
        if (el.type === 'checkbox') el.checked = !!flat[id];
        else el.value = flat[id];
    }
}

function readOptions() {
    return flatToOpts(readFlatState(), { toonDisabled: toonAutoDisabled });
}

function syncModuleStates() {
    for (const name of MODULE_IDS) {
        const entry = MODULE_CONTROLS[name];
        if (!entry) continue;
        const { toggle, card, controls } = entry;
        const autoOff = name === 'toon' && toonAutoDisabled;
        const on = toggle.checked && !autoOff;
        if (card) card.classList.toggle('module-off', !on);
        const disabled = !on;
        for (const el of controls) {
            if (el.disabled !== disabled) el.disabled = disabled;
        }
        if (name === 'toon') {
            const title = autoOff ? 'TOON disattivato: aumenterebbe i token per questo input' : '';
            if (toggle.disabled !== autoOff) toggle.disabled = autoOff;
            if (toggle.title !== title) toggle.title = title;
        }
    }
}

function processPrompt() {
    const t0 = performance.now();
    const rawText = $('rawInput').value;
    const opts = readOptions({ toonDisabled: false });

    const activeBadgesContainer = $('activeBadges');
    activeBadgesContainer.innerHTML = '';
    let activeCount = 0;

    const order = ['lite', 'rtk', 'headroom', 'caveman', 'prose', 'toon', 'omniglyph'];
    for (const name of order) {
        if (opts[name] && opts[name].on) {
            addBadge(activeBadgesContainer, STAGE_INFO[name].label, STAGE_INFO[name].cls);
            activeCount++;
        }
    }
    if (opts.custom.on) {
        addBadge(activeBadgesContainer, STAGE_INFO.custom.label, STAGE_INFO.custom.cls);
        activeCount++;
    }

    let beforeToon = null;
    let toonOut = null;
    const text = CompressorModules.runAll(rawText, opts, (name, out, before) => {
        if (name === 'toon') {
            beforeToon = before;
            toonOut = out;
        }
    });

    let textFinal = text;
    let glyphOpt = opts.omniglyph;
    toonAutoDisabled = false;
    if (toonOut !== null && beforeToon !== null
        && CompressorTokenizer.count(toonOut) > CompressorTokenizer.count(beforeToon)) {
        const optsFinal = readOptions({ toonDisabled: true });
        textFinal = CompressorModules.runAll(rawText, optsFinal, () => {});
        toonAutoDisabled = true;
        glyphOpt = optsFinal.omniglyph;
    }
    syncModuleStates();

    if (activeCount === 0) {
        activeBadgesContainer.innerHTML = '<span class="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">Nessuno</span>';
    }

    $('compressedOutput').value = textFinal;
    updateMetrics(rawText, textFinal);
    scheduleDiff(rawText, textFinal);

    if (glyphOpt.on) {
        renderGlyph(textFinal, glyphOpt.density);
    } else {
        disableGlyph();
    }

    $('procTime').innerText = `${(performance.now() - t0).toFixed(1)} ms`;
}

async function renderGlyph(text, density) {
    const seq = ++glyphSeq;
    glyphState.active = true;
    $('outputViewToggle').classList.remove('hidden');
    try {
        if (document.fonts && document.fonts.ready) await document.fonts.ready;
    } catch (e) {}
    if (seq !== glyphSeq) return;

    const res = OmniGlyph.render(text, density);
    glyphState.pages = res.pages;
    glyphState.urls = new Array(res.pages.length).fill(null);
    glyphState.current = Math.min(glyphState.current, Math.max(0, res.pages.length - 1));
    glyphState.tokens = res.tokens;
    glyphState.pageTokens = res.pageTokens;
    updateGlyphViewer();
    updateMetrics($('rawInput').value, $('compressedOutput').value);
}

function disableGlyph() {
    if (!glyphState.active && outputView === 'text' && $('outputViewToggle').classList.contains('hidden')) return;
    glyphSeq++;
    glyphState = { active: false, pages: [], urls: [], current: 0, tokens: 0, pageTokens: 0 };
    $('outputViewToggle').classList.add('hidden');
    if (outputView === 'image') switchOutputView('text');
    updateMetrics($('rawInput').value, $('compressedOutput').value);
}

function updateGlyphViewer() {
    const n = glyphState.pages.length;
    const prev = $('glyphPrev');
    const next = $('glyphNext');
    if (n === 0) {
        $('glyphPageInfo').innerText = 'nessun contenuto';
        $('glyphImage').removeAttribute('src');
        prev.disabled = true;
        next.disabled = true;
        prev.classList.add('opacity-40', 'cursor-not-allowed');
        next.classList.add('opacity-40', 'cursor-not-allowed');
        return;
    }
    prev.disabled = n <= 1;
    next.disabled = n <= 1;
    prev.classList.toggle('opacity-40', n <= 1);
    prev.classList.toggle('cursor-not-allowed', n <= 1);
    next.classList.toggle('opacity-40', n <= 1);
    next.classList.toggle('cursor-not-allowed', n <= 1);

    const i = glyphState.current;
    if (!glyphState.urls[i]) glyphState.urls[i] = glyphState.pages[i].toDataURL('image/png');
    $('glyphImage').src = glyphState.urls[i];
    const perPage = glyphState.pageTokens || OmniGlyph.pageTokens();
    $('glyphPageInfo').innerText = `pag ${i + 1}/${n} · ${perPage.toLocaleString()} tok/pag`;
}

function glyphNav(delta) {
    const n = glyphState.pages.length;
    if (n === 0) return;
    glyphState.current = (glyphState.current + delta + n) % n;
    updateGlyphViewer();
}

function switchOutputView(view) {
    outputView = view;
    const isText = view === 'text';
    $('diffViewer').classList.toggle('hidden', !isText);
    $('glyphViewer').classList.toggle('hidden', isText);
    $('glyphViewer').classList.toggle('flex', !isText);
    $('outputLabel').innerText = isText ? 'Output Compresso (Diff)' : 'Output OmniGlyph (PNG)';
    $('viewBtnText').className = isText
        ? 'px-2 py-0.5 text-[10px] font-semibold rounded-l-lg bg-brand-600 text-white border-r border-slate-700'
        : 'px-2 py-0.5 text-[10px] font-semibold rounded-l-lg bg-slate-800 text-slate-400 hover:bg-slate-700 border-r border-slate-700';
    $('viewBtnImage').className = !isText
        ? 'px-2 py-0.5 text-[10px] font-semibold rounded-r-lg bg-brand-600 text-white'
        : 'px-2 py-0.5 text-[10px] font-semibold rounded-r-lg bg-slate-800 text-slate-400 hover:bg-slate-700';
}

async function downloadGlyph() {
    const page = glyphState.pages[glyphState.current];
    if (!page) return;
    try {
        const blob = await OmniGlyph.toBlob(page);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const suffix = glyphState.pages.length > 1 ? `-p${glyphState.current + 1}of${glyphState.pages.length}` : '';
        a.href = url;
        a.download = `omniglyph${suffix}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 5000);
        showToast('PNG scaricato!');
    } catch (err) {
        showToast('Errore durante la generazione del PNG', true);
    }
}

function scheduleProcess() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(processPrompt, 150);
}

let diffTimer = null;
let diffPending = null;

function scheduleDiff(raw, comp) {
    diffPending = { raw, comp };
    clearTimeout(diffTimer);
    diffTimer = setTimeout(flushDiff, 250);
}

function flushDiff() {
    clearTimeout(diffTimer);
    if (!diffPending) return;
    const { raw, comp } = diffPending;
    diffPending = null;
    if (isMobileView() && !$('outputPanel').classList.contains('flex')) return;
    CompressorDiff.render(raw, comp);
}

function flushDiffNow() {
    clearTimeout(diffTimer);
    if (!diffPending) return;
    const { raw, comp } = diffPending;
    diffPending = null;
    CompressorDiff.render(raw, comp);
}

let saveTimer = null;

function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveState, 600);
}

function updateInputCount(text) {
    const el = $('inputCharCount');
    if (!el) return;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    el.innerText = `${text.length.toLocaleString()} car. · ${words.toLocaleString()} parole`;
}

function onInputChange() {
    updateInputCount($('rawInput').value);
    scheduleProcess();
    scheduleSave();
}

const TEXT_EXTENSIONS = ['.txt', '.md', '.markdown', '.json', '.log', '.csv', '.yaml', '.yml', '.xml', '.html', '.htm', '.ini', '.conf', '.sql', '.py', '.js', '.ts', '.go', '.java', '.c', '.cpp', '.sh'];

function isTextFile(file) {
    if (!file) return false;
    if (file.type && file.type.startsWith('text/')) return true;
    const name = (file.name || '').toLowerCase();
    return TEXT_EXTENSIONS.some(ext => name.endsWith(ext));
}

function readFileAsText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ''));
        reader.onerror = () => reject(reader.error || new Error('read error'));
        reader.readAsText(file);
    });
}

function insertDroppedText(text, fileCount) {
    const input = $('rawInput');
    if (!text) return;
    const existing = input.value;
    input.value = existing.trim() ? existing.replace(/\s*$/, '') + '\n\n' + text : text;
    updateInputCount(input.value);
    processPrompt();
    saveState();
    const label = fileCount
        ? `${fileCount} file caricat${fileCount > 1 ? 'i' : 'o'}`
        : 'Testo inserito';
    showToast(`${label} nell'input!`);
}

async function handleDroppedData(dt) {
    if (!dt) return;
    const files = Array.from(dt.files || []);
    if (files.length) {
        const texts = [];
        let count = 0;
        for (const file of files) {
            if (!isTextFile(file)) {
                showToast(`File non supportato: ${file.name}`, true);
                continue;
            }
            try {
                texts.push(await readFileAsText(file));
                count++;
            } catch (err) {
                showToast(`Errore nella lettura di ${file.name}`, true);
            }
        }
        if (texts.length) insertDroppedText(texts.join('\n\n'), count);
        return;
    }
    const text = dt.getData('text/plain');
    if (text) insertDroppedText(text, 0);
}

function initDragAndDrop() {
    const panel = $('inputPanel');
    if (!panel) return;
    let depth = 0;
    const clear = () => { depth = 0; panel.classList.remove('drag-active'); };

    panel.addEventListener('dragenter', e => {
        e.preventDefault();
        depth++;
        panel.classList.add('drag-active');
    });
    panel.addEventListener('dragover', e => {
        e.preventDefault();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        panel.classList.add('drag-active');
    });
    panel.addEventListener('dragleave', () => {
        depth--;
        if (depth <= 0) clear();
    });
    panel.addEventListener('drop', e => {
        e.preventDefault();
        clear();
        handleDroppedData(e.dataTransfer);
    });
}

function onOptionChange() {
    processPrompt();
    saveState();
}

function updateMetrics(raw, comp) {
    const useImg = glyphState.active;
    const origTok = CompressorTokenizer.count(raw);
    const compTok = useImg ? glyphState.tokens : CompressorTokenizer.count(comp);
    const savedTok = Math.max(0, origTok - compTok);
    const percent = origTok > 0 ? Math.round((savedTok / origTok) * 100) : 0;
    const savedChars = Math.max(0, raw.length - comp.length);
    const charPct = raw.length > 0 ? Math.round((savedChars / raw.length) * 100) : 0;

    const model = COST_MODELS[$('costModel').value] || COST_MODELS['gpt4o'];
    const requests = Math.max(1, parseInt($('costRequests').value, 10) || 10000);
    const savedCost = (savedTok / 1000000) * model.price * requests;

    $('origTokens').innerText = origTok.toLocaleString();
    $('origChars').innerText = `${raw.length.toLocaleString()}c`;
    $('compTokens').innerText = compTok.toLocaleString();
    $('compChars').innerText = useImg ? `${glyphState.pages.length.toLocaleString()} pag` : `${comp.length.toLocaleString()}c`;
    $('savingPercent').innerText = `${percent}%`;
    $('savedTokens').innerText = `-${savedTok.toLocaleString()} tok`;
    $('savedChars').innerText = savedChars.toLocaleString();
    $('savedCharsPct').innerText = `-${charPct}%`;
    $('savedCost').innerText = `$${savedCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 3 })}`;
    updateInputCount(raw);
    $('outputCharCount').innerText = useImg ? `${glyphState.pages.length} pag` : `${comp.length} car.`;

    const modeEl = $('tokenizerMode');
    let text, title, cls;
    if (useImg) {
        text = 'IMG';
        title = 'Token fatturati come immagine Anthropic: (larghezza × altezza) / 750 per pagina';
        cls = 'text-[9px] font-mono px-1.5 py-0.5 rounded bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20';
    } else if (CompressorTokenizer.getMode() === 'bpe') {
        text = 'BPE';
        title = 'Metodo di conteggio token';
        cls = 'text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    } else {
        text = 'stima';
        title = 'Metodo di conteggio token';
        cls = 'text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-500/10 text-slate-400 border border-slate-500/20';
    }
    if (modeEl.innerText !== text) modeEl.innerText = text;
    if (modeEl.title !== title) modeEl.title = title;
    if (modeEl.className !== cls) modeEl.className = cls;
}

function addBadge(container, label, colorClasses) {
    const badge = document.createElement('span');
    badge.className = `text-[9px] font-semibold px-1.5 py-0.2 rounded border ${colorClasses}`;
    badge.innerText = label;
    container.appendChild(badge);
}

function analyzeModules() {
    const panel = $('analysisPanel');
    const btn = $('analyzeBtn');
    const shown = panel.classList.contains('hidden') === false;
    if (shown) {
        panel.classList.add('hidden');
        btn.innerHTML = '<i class="fa-solid fa-chart-simple text-[10px]"></i> Analizza';
        return;
    }

    const rawText = $('rawInput').value;
    const opts = readOptions();
    const stages = [];
    const finalText = CompressorModules.runAll(rawText, opts, (name, text) => stages.push({ name, text }));

    const origTok = CompressorTokenizer.count(rawText);
    const finalTok = CompressorTokenizer.count(finalText);
    const totalSaved = origTok - finalTok;
    const maxSaved = Math.max(1, ...stages.map(s => origTok - CompressorTokenizer.count(s.text)));

    let html = '<div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-3">';
    for (const s of stages) {
        const info = STAGE_INFO[s.name];
        const saved = origTok - CompressorTokenizer.count(s.text);
        const width = Math.max(2, Math.round((saved / maxSaved) * 100));
        html += `<div class="bg-darkcard rounded-lg border border-darkborder p-2.5">
            <div class="flex items-center justify-between mb-1">
                <span class="text-[10px] font-semibold px-1.5 py-0.2 rounded border ${info.cls}">${info.label}</span>
                <span class="text-[11px] font-mono font-bold ${saved > 0 ? 'text-emerald-400' : 'text-slate-500'}">-${saved.toLocaleString()} tok</span>
            </div>
            <div class="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div class="h-full ${info.bar} rounded-full" style="width:${width}%"></div>
            </div>
        </div>`;
    }
    html += `<div class="bg-darkcard rounded-lg border border-brand-500/30 p-2.5 flex items-center justify-between">
        <span class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Totale risparmiato</span>
        <span class="text-sm font-mono font-bold text-brand-400">-${Math.max(0, totalSaved).toLocaleString()} tok</span>
    </div>`;
    html += '</div>';

    panel.innerHTML = html;
    panel.classList.remove('hidden');
    btn.innerHTML = '<i class="fa-solid fa-xmark text-[10px]"></i> Nascondi';
}

function applyAggression(level) {
    currentAggression = level;
    const profile = AGGRESSION[level] || AGGRESSION.medium;
    for (const id of Object.keys(profile)) {
        const el = $(id);
        if (!el) continue;
        if (id === 'toon_delimiter') {
            el.value = profile[id];
        } else if (el.type === 'checkbox') {
            el.checked = profile[id];
        }
    }
    ['light', 'medium', 'extreme'].forEach(l => {
        const btn = $(`agg_${l}`);
        if (btn) {
            btn.className = l === level
                ? 'flex-1 py-1 text-[10px] font-semibold rounded-lg bg-brand-600 text-white border border-brand-500/50'
                : 'flex-1 py-1 text-[10px] font-semibold rounded-lg bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700';
        }
    });
    saveState();
    processPrompt();
}

function clearAggressionHighlight() {
    ['light', 'medium', 'extreme'].forEach(l => {
        const btn = $(`agg_${l}`);
        if (btn) btn.className = 'flex-1 py-1 text-[10px] font-semibold rounded-lg bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700';
    });
}

function autoCombosFor(module) {
    const n = module.ids.length;
    const total = 1 << n;
    const selectValues = module.select ? module.select.values : [null];
    const combos = [];
    for (let mask = 0; mask < total; mask++) {
        for (const sel of selectValues) {
            const combo = {};
            module.ids.forEach((id, i) => { combo[id] = !!(mask & (1 << i)); });
            if (module.select) combo[module.select.id] = sel;
            combos.push(combo);
        }
    }
    return combos;
}

function autoSeedFlat() {
    const current = readFlatState();
    const flat = {};
    AUTO_OPTION_IDS.forEach(id => { flat[id] = current[id]; });
    AUTO_SEARCH_MODULES.forEach(m => {
        m.ids.forEach(id => { flat[id] = true; });
        if (m.select) flat[m.select.id] = '\t';
    });
    AUTO_FORCED_OFF.forEach(id => { flat[id] = false; });
    return flat;
}

function autoScore(rawText, flat, words, cache) {
    const key = JSON.stringify(flat);
    if (cache.has(key)) return cache.get(key);
    const opts = flatToOpts(flat, { toonDisabled: false, words });
    const out = CompressorModules.runAll(rawText, opts, () => {});
    const tok = CompressorTokenizer.count(out);
    cache.set(key, tok);
    return tok;
}

function searchBestTextOptions(rawText, words) {
    const cache = new Map();
    let best = autoSeedFlat();
    let bestTok = autoScore(rawText, best, words, cache);
    const maxPasses = rawText.length > 120000 ? 1 : 3;
    for (let pass = 0; pass < maxPasses; pass++) {
        let improved = false;
        for (const mod of AUTO_SEARCH_MODULES) {
            for (const combo of autoCombosFor(mod)) {
                const cand = Object.assign({}, best, combo);
                const tok = autoScore(rawText, cand, words, cache);
                if (tok < bestTok) {
                    bestTok = tok;
                    best = cand;
                    improved = true;
                }
            }
        }
        if (!improved) break;
    }
    return { flat: best, tokens: bestTok, evaluations: cache.size };
}

function chooseOmniGlyph(rawText, flat, textTokens, words) {
    if (!rawText || !rawText.trim()) return null;
    const opts = flatToOpts(flat, { toonDisabled: false, words });
    const out = CompressorModules.runAll(rawText, opts, () => {});
    if (!out || !out.trim()) return null;
    let bestDensity = null;
    let bestTokens = textTokens;
    for (const density of ['auto', 'readable', 'compact', 'dense']) {
        let m;
        try { m = OmniGlyph.measure(out, density); } catch (e) { continue; }
        if (m.tokens > 0 && m.tokens < bestTokens) {
            bestTokens = m.tokens;
            bestDensity = density;
        }
    }
    return bestDensity ? { density: bestDensity, tokens: bestTokens } : null;
}

function applyAutoMode() {
    const rawText = $('rawInput').value;
    if (!rawText.trim()) {
        showToast("Inserisci un prompt prima di usare l'Automatico", true);
        return;
    }
    const btn = $('autoBtn');
    const icon = $('autoBtnIcon');
    if (btn && btn.dataset.busy === '1') return;
    if (btn) { btn.dataset.busy = '1'; btn.classList.add('opacity-60', 'pointer-events-none'); }
    if (icon) icon.className = 'fa-solid fa-spinner fa-spin text-[10px]';
    showToast('Calcolo configurazione ottimale...');

    setTimeout(() => {
        let result = null;
        try {
            const words = $('customWords').value.split(',').map(w => w.trim()).filter(Boolean);
            const search = searchBestTextOptions(rawText, words);
            const glyph = chooseOmniGlyph(rawText, search.flat, search.tokens, words);
            const flat = Object.assign({}, search.flat);
            let finalTokens = search.tokens;
            if (glyph) {
                flat.mod_omniglyph = true;
                flat.omniglyph_density = glyph.density;
                finalTokens = glyph.tokens;
            } else {
                flat.mod_omniglyph = false;
            }
            result = { flat, tokens: finalTokens, image: !!glyph };
        } catch (err) {
            console.error(err);
        } finally {
            if (btn) { delete btn.dataset.busy; btn.classList.remove('opacity-60', 'pointer-events-none'); }
            if (icon) icon.className = 'fa-solid fa-wand-magic-sparkles text-[10px]';
        }
        if (!result) { showToast('Errore nel calcolo automatico', true); return; }

        currentAggression = 'auto';
        writeFlatState(result.flat);
        clearAggressionHighlight();
        syncModuleStates();
        saveState();
        processPrompt();

        const origTok = CompressorTokenizer.count(rawText);
        const saved = Math.max(0, origTok - result.tokens);
        const pct = origTok > 0 ? Math.round((saved / origTok) * 100) : 0;
        const mode = result.image ? ` · OmniGlyph (${result.flat.omniglyph_density})` : '';
        showToast(`Auto: -${saved.toLocaleString()} tok (${pct}%)${mode}`);
    }, 30);
}

function isMobileView() {
    return window.matchMedia('(max-width: 1023px)').matches;
}

const desktopLayoutQuery = window.matchMedia('(min-width: 1024px)');

function syncPresetLocation() {
    const wrapper = $('presetWrapper');
    const headerSlot = $('headerPresetSlot');
    const sidebarSlot = $('presetSlotSidebar');
    if (!wrapper || !headerSlot || !sidebarSlot) return;
    const target = desktopLayoutQuery.matches ? headerSlot : sidebarSlot;
    if (wrapper.parentElement !== target) target.appendChild(wrapper);
}

if (desktopLayoutQuery.addEventListener) {
    desktopLayoutQuery.addEventListener('change', syncPresetLocation);
} else {
    desktopLayoutQuery.addListener(syncPresetLocation);
}

function openMobileSidebar() {
    const sidebar = $('sidebar');
    sidebar.classList.add('sidebar-mobile-open');
    sidebar.classList.remove('sidebar-collapsed');
    sidebar.classList.add('sidebar-expanded');
    $('sidebarBackdrop').classList.remove('hidden');
}

function closeMobileSidebar() {
    const sidebar = $('sidebar');
    sidebar.classList.remove('sidebar-mobile-open');
    $('sidebarBackdrop').classList.add('hidden');
    if (isSidebarCollapsed) {
        sidebar.classList.remove('sidebar-expanded');
        sidebar.classList.add('sidebar-collapsed');
    }
}

function toggleSidebar() {
    if (isMobileView()) {
        closeMobileSidebar();
        return;
    }
    const sidebar = $('sidebar');
    const toggleIcon = $('sidebarToggleIcon');
    isSidebarCollapsed = !isSidebarCollapsed;

    if (isSidebarCollapsed) {
        sidebar.classList.remove('sidebar-expanded');
        sidebar.classList.add('sidebar-collapsed');
        toggleIcon.classList.add('rotate-180');
    } else {
        sidebar.classList.remove('sidebar-collapsed');
        sidebar.classList.add('sidebar-expanded');
        toggleIcon.classList.remove('rotate-180');
    }
    saveState();
}

function handleLogoClick() {
    if (isSidebarCollapsed) toggleSidebar();
}

function loadPreset(key) {
    if (!key || !SAMPLE_PROMPTS[key]) return;
    $('rawInput').value = SAMPLE_PROMPTS[key];
    $('presetSelect').value = key;
    processPrompt();
}

function clearAll() {
    $('rawInput').value = '';
    $('presetSelect').selectedIndex = 0;
    updateInputCount('');
    processPrompt();
}

function toggleAllModules(enable) {
    ['mod_lite', 'mod_caveman', 'mod_rtk', 'mod_headroom', 'mod_toon', 'mod_prose', 'mod_omniglyph'].forEach(id => {
        const el = $(id);
        if (el) el.checked = enable;
    });
    saveState();
    processPrompt();
}

function toggleCustomRules() {
    const panel = $('customRulesPanel');
    const icon = $('customRulesIcon');
    if (!panel) return;
    const isHidden = panel.classList.contains('hidden');
    panel.classList.toggle('hidden');
    if (icon) {
        icon.className = isHidden ? 'fa-solid fa-chevron-up text-slate-500 text-[10px]' : 'fa-solid fa-chevron-down text-slate-500 text-[10px]';
    }
}

async function pasteFromClipboard() {
    try {
        const text = await navigator.clipboard.readText();
        if (text) {
            $('rawInput').value = text;
            processPrompt();
            showToast('Testo incollato dagli appunti!');
        }
    } catch (err) {
        showToast('Errore durante la lettura dagli appunti', true);
    }
}

function copyOutput() {
    if (glyphState.active && outputView === 'image') {
        copyGlyphImage();
        return;
    }
    const outputText = $('compressedOutput').value;
    if (!outputText) return;

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(outputText).then(() => {
            showToast('Copiato negli appunti!');
        }).catch(() => {
            fallbackCopyText(outputText);
        });
    } else {
        fallbackCopyText(outputText);
    }
}

async function copyGlyphImage() {
    const page = glyphState.pages[glyphState.current];
    if (!page) return;
    try {
        if (!navigator.clipboard || !window.ClipboardItem || !window.isSecureContext) {
            throw new Error('clipboard image non supportato');
        }
        const blob = await OmniGlyph.toBlob(page);
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        showToast(`Pagina ${glyphState.current + 1} copiata come PNG!`);
    } catch (err) {
        showToast('Copia immagine non supportata qui: usa Scarica PNG', true);
    }
}

function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        showToast('Copiato negli appunti!');
    } catch (err) {
        showToast('Errore durante la copia', true);
    }
    document.body.removeChild(textArea);
}

function switchMobileTab(tab) {
    const inputPanel = $('inputPanel');
    const outputPanel = $('outputPanel');
    const btnInput = $('tabBtnInput');
    const btnOutput = $('tabBtnOutput');

    if (tab === 'input') {
        inputPanel.classList.remove('hidden');
        outputPanel.classList.add('hidden');
        outputPanel.classList.remove('flex');
        btnInput.className = 'flex-1 py-1.5 text-xs font-semibold rounded-lg bg-brand-600 text-white';
        btnOutput.className = 'flex-1 py-1.5 text-xs font-semibold rounded-lg text-slate-400';
    } else {
        inputPanel.classList.add('hidden');
        outputPanel.classList.remove('hidden');
        outputPanel.classList.add('flex');
        btnInput.className = 'flex-1 py-1.5 text-xs font-semibold rounded-lg text-slate-400';
        btnOutput.className = 'flex-1 py-1.5 text-xs font-semibold rounded-lg bg-brand-600 text-white';
        flushDiffNow();
    }
}

function showToast(message, isError = false) {
    const toast = $('toast');
    const toastMsg = $('toastMsg');
    if (!toast || !toastMsg) return;

    toastMsg.innerText = message;
    if (isError) {
        toast.classList.remove('bg-emerald-600');
        toast.classList.add('bg-red-600');
    } else {
        toast.classList.remove('bg-red-600');
        toast.classList.add('bg-emerald-600');
    }

    toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-2');
    toast.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-2');
    }, 2500);
}

function saveState() {
    const state = { sidebar: isSidebarCollapsed, aggression: currentAggression };
    for (const cb of CHECKBOXES) state[cb.id] = cb.checked;
    const inputs = ['caveman_lang', 'toon_delimiter', 'omniglyph_density', 'customWords', 'costModel', 'costRequests'];
    inputs.forEach(id => {
        const el = $(id);
        if (el) state[id] = el.value;
    });
    try {
        localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch (e) {}
}

function persistRawInput() {
    const rawInput = $('rawInput');
    if (!rawInput || !rawInput.value || rawInput.value.length > 200000) return;
    let state = null;
    try { state = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) { state = null; }
    state = state || {};
    state.rawInput = rawInput.value;
    try {
        localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch (e) {}
}

function restoreState() {
    let state = null;
    try {
        state = JSON.parse(localStorage.getItem(STORE_KEY));
    } catch (e) {
        state = null;
    }

    if (state) {
        const isAuto = state.aggression === 'auto';
        if (!isAuto && state.aggression && AGGRESSION[state.aggression]) currentAggression = state.aggression;
        applyAggression(currentAggression);
        if (isAuto) clearAggressionHighlight();
        for (const cb of CHECKBOXES) {
            if (state[cb.id] !== undefined) cb.checked = state[cb.id];
        }
        ['caveman_lang', 'toon_delimiter', 'omniglyph_density', 'customWords', 'costModel', 'costRequests'].forEach(id => {
            const el = $(id);
            if (el && state[id] !== undefined) el.value = state[id];
        });
        if (state.sidebar) {
            $('sidebar').classList.remove('sidebar-expanded');
            $('sidebar').classList.add('sidebar-collapsed');
            $('sidebarToggleIcon').classList.add('rotate-180');
            isSidebarCollapsed = true;
        }
        syncModuleStates();
    } else {
        applyAggression('medium');
    }
    return state;
}

window.addEventListener('DOMContentLoaded', () => {
    syncPresetLocation();
    const state = restoreState();
    initDragAndDrop();
    const rawInput = $('rawInput');
    const savedInput = state?.rawInput;
    $('presetSelect').value = '';
    if (savedInput) {
        rawInput.value = savedInput;
        updateInputCount(savedInput);
        processPrompt();
    } else {
        loadPreset('system_mixed');
    }
    CompressorTokenizer.init().then(() => {
        processPrompt();
    });

    rawInput.addEventListener('blur', persistRawInput);
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') persistRawInput();
    });
    window.addEventListener('pagehide', persistRawInput);
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeMobileSidebar();
        const panel = $('analysisPanel');
        if (!panel.classList.contains('hidden')) {
            panel.classList.add('hidden');
            $('analyzeBtn').innerHTML = '<i class="fa-solid fa-chart-simple text-[10px]"></i> Analizza';
        }
    }
});