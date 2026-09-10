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
let debounceTimer = null;
let outputView = 'text';
let glyphState = { active: false, pages: [], urls: [], current: 0, tokens: 0, pageTokens: 0 };
let glyphSeq = 0;

function $(id) { return document.getElementById(id); }

function readOptions() {
    const words = $('customWords').value.split(',').map(w => w.trim()).filter(Boolean);
    return {
        lite: {
            on: $('mod_lite').checked,
            trim: $('lite_trim').checked,
            emptyLines: $('lite_empty_lines').checked,
            markdown: $('lite_markdown').checked,
            strip: $('lite_strip').checked
        },
        rtk: {
            on: $('mod_rtk').checked,
            ansi: $('rtk_ansi').checked,
            timestamps: $('rtk_timestamps').checked,
            dedupe: $('rtk_dedupe').checked,
            progress: $('rtk_progress').checked,
            counters: $('rtk_counters').checked,
            stacktrace: $('rtk_stacktrace').checked
        },
        headroom: {
            on: $('mod_headroom').checked,
            minify: $('headroom_minify').checked,
            csv: $('headroom_csv').checked,
            hashes: $('headroom_hashes').checked,
            base64: $('headroom_base64').checked,
            stripKeys: $('headroom_stripkeys').checked
        },
        toon: {
            on: $('mod_toon').checked,
            delimiter: $('toon_delimiter').value
        },
        caveman: {
            on: $('mod_caveman').checked,
            lang: $('caveman_lang').value,
            fillers: $('caveman_fillers').checked,
            articles: $('caveman_articles').checked,
            prepositions: $('caveman_preps').checked,
            telegraph: $('caveman_telegraph').checked,
            intensifiers: $('caveman_intensifiers').checked
        },
        prose: { on: $('mod_prose').checked, lang: $('caveman_lang').value },
        omniglyph: {
            on: $('mod_omniglyph').checked,
            density: $('omniglyph_density').value
        },
        custom: { on: words.length > 0, words }
    };
}

function syncModuleStates() {
    for (const name of MODULE_IDS) {
        const toggle = $(`mod_${name}`);
        if (!toggle) continue;
        const card = toggle.closest('.module-card');
        if (!card) continue;
        const on = toggle.checked;
        card.classList.toggle('module-off', !on);
        card.querySelectorAll('.sidebar-content input, .sidebar-content select').forEach(el => {
            el.disabled = !on;
        });
    }
}

function processPrompt() {
    syncModuleStates();
    const t0 = performance.now();
    const rawText = $('rawInput').value;
    const opts = readOptions();

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

    const text = CompressorModules.runAll(rawText, opts, () => {});

    if (activeCount === 0) {
        activeBadgesContainer.innerHTML = '<span class="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">Nessuno</span>';
    }

    $('compressedOutput').value = text;
    updateMetrics(rawText, text);
    CompressorDiff.render(rawText, text);

    if (opts.omniglyph.on) {
        renderGlyph(text, opts.omniglyph.density);
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

    const model = COST_MODELS[$('costModel').value] || COST_MODELS['gpt4o'];
    const requests = Math.max(1, parseInt($('costRequests').value, 10) || 10000);
    const savedCost = (savedTok / 1000000) * model.price * requests;

    $('origTokens').innerText = origTok.toLocaleString();
    $('origChars').innerText = `${raw.length.toLocaleString()}c`;
    $('compTokens').innerText = compTok.toLocaleString();
    $('compChars').innerText = useImg ? `${glyphState.pages.length.toLocaleString()} pag` : `${comp.length.toLocaleString()}c`;
    $('savingPercent').innerText = `${percent}%`;
    $('savedTokens').innerText = `-${savedTok.toLocaleString()} tok`;
    $('savedCost').innerText = `$${savedCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 3 })}`;
    $('inputCharCount').innerText = `${raw.length} car.`;
    updateInputCount(raw);
    $('outputCharCount').innerText = useImg ? `${glyphState.pages.length} pag` : `${comp.length} car.`;

    const modeEl = $('tokenizerMode');
    if (useImg) {
        modeEl.innerText = 'IMG';
        modeEl.title = 'Token fatturati come immagine Anthropic: (larghezza × altezza) / 750 per pagina';
        modeEl.className = 'text-[9px] font-mono px-1.5 py-0.5 rounded bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20';
    } else {
        modeEl.innerText = CompressorTokenizer.getMode() === 'bpe' ? 'BPE' : 'stima';
        modeEl.title = 'Metodo di conteggio token';
        modeEl.className = CompressorTokenizer.getMode() === 'bpe'
            ? 'text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            : 'text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-500/10 text-slate-400 border border-slate-500/20';
    }
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

function isMobileView() {
    return window.matchMedia('(max-width: 1023px)').matches;
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
    document.querySelectorAll('input[type=checkbox]').forEach(cb => {
        state[cb.id] = cb.checked;
    });
    const inputs = ['caveman_lang', 'toon_delimiter', 'omniglyph_density', 'customWords', 'costModel', 'costRequests'];
    inputs.forEach(id => {
        const el = $(id);
        if (el) state[id] = el.value;
    });
    const rawInput = $('rawInput');
    if (rawInput && rawInput.value.length <= 200000) state.rawInput = rawInput.value;
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
        if (state.aggression && AGGRESSION[state.aggression]) currentAggression = state.aggression;
        applyAggression(currentAggression);
        document.querySelectorAll('input[type=checkbox]').forEach(cb => {
            if (state[cb.id] !== undefined) cb.checked = state[cb.id];
        });
        ['caveman_lang', 'omniglyph_density', 'customWords', 'costModel', 'costRequests'].forEach(id => {
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
}

window.addEventListener('DOMContentLoaded', () => {
    restoreState();
    initDragAndDrop();
    const savedInput = (function () {
        try { return JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); } catch (e) { return null; }
    })()?.rawInput;
    $('presetSelect').value = '';
    if (savedInput) {
        $('rawInput').value = savedInput;
        updateInputCount(savedInput);
        processPrompt();
    } else {
        loadPreset('system_mixed');
    }
    CompressorTokenizer.init().then(() => {
        updateMetrics($('rawInput').value, $('compressedOutput').value);
    });
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