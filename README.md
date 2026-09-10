# LLM Prompt Compressor & Token Optimizer

Applicazione web a pagina singola (SPA) per comprimere prompt, conversazioni, log e dati strutturati destinati a modelli LLM. Riduce il numero di token e i costi di inferenza, mantenendo intatto il contenuto informativo.

L'elaborazione è **100% client-side**: il testo non lascia mai il browser.

## Caratteristiche

- Compressione tramite 5 moduli indipendenti, attivabili/disattivabili singolarmente o in blocco
- **Contatore token reale BPE** (`cl100k_base` via `gpt-tokenizer`) con fallback automatico all'euristica `char/3.8` se offline
- **Slider di aggressività** (Leggera / Media / Estrema) che applica profili di regole predefiniti
- **Analisi per modulo**: quanti token risparmia ogni singolo modulo
- Calcolo in tempo reale di token originali, compressi, risparmio percentuale e **stima costi configurabile** (modello + numero richieste)
- Visualizzatore diff basato su **Myers O(ND)**: parole rimosse evidenziate con barrato rosso
- Dizionari di compressione in italiano e inglese (cortesie, articoli, preposizioni, pronomi, intensificatori)
- Regole personalizzate (parole/termini da rimuovere)
- 6 prompt demo precaricati
- **Persistenza dello stato** in `localStorage` (sidebar, opzioni, lingua, parole personalizzate, modello costi)
- Sidebar collapsible, tema scuro, layout responsive (desktop affiancato, mobile a tab)
- Nessuna build, nessun backend, nessuna dipendenza locale
- Debounce dell'elaborazione (150 ms) per una digitazione fluida

## Moduli

### Lite Clean

Pulizia di spazi e markdown superfluo.

| Opzione | Effetto |
|---|---|
| Trim spazi inizio/fine riga | Elimina spazi bianchi ai bordi di ogni riga |
| Elimina righe vuote multiple | Riduce 3+ righe vuote consecutive a una |
| Pulisci markdown vuoto | Rimuove `**` e `__` vuoti, normalizza sequenze di `-*_` |

### Caveman

Compressione prosaica tramite dizionari di stopword. Selezionabile lingua italiana o inglese.

| Opzione | Effetto |
|---|---|
| Rimuovi cortesie | Elimina frasi come "Per favore...", "Potresti gentilmente...", "Grazie in anticipo" |
| Rimuovi articoli | Elimina articoli (il, la, un, the, a, an...) |
| Rimuovi preposizioni | Elimina preposizioni (di, a, da, in, of, for, with...) |
| Telegrafico | Rimuove pronomi (io, tu, mio, I, you, my...) |
| Rimuovi intensificatori | Elimina avverbi a bassa informazione (davvero, molto, estremamente / very, really...) |

### RTK Filter

Pulizia di output di terminale e log.

| Opzione | Effetto |
|---|---|
| Rimuovi colori ANSI | Strips sequenze di escape tipo `\x1b[31m` |
| Rimuovi Timestamp e Date | Elimina timestamp ISO (`2026-09-10T01:15:22Z`), orari `[01:15:23]` e blocchi `[2026-09-10 01:15:23]` |
| Deduplica log identici | Sostituisce righe consecutive ripetute con `[... Nx righe omesse ...]` |
| Elimina barre progresso/spinner | Rimuove barre `[====>] 50%` e caratteri di blocco |
| Collassa righe con contatori | Righe identiche a parte numeri/sessioni (es. `Compiling module chunk N of 40`) → `[... Nx variazioni ...]` |
| Rimuovi stack-trace | Elimina righe `at ... (file:line)`, `File "...", line N`, `Traceback...` |

### Headroom

Compressione di dati strutturati.

| Opzione | Effetto |
|---|---|
| Minifica JSON | Serializza JSON senza indentazione (anche fuori dai fence) |
| Converti Array JSON in CSV | Trasforma array di oggetti in CSV con header dai nomi chiave |
| Scarta chiavi JSON | Array di oggetti → array di soli valori (massimo risparmio) |
| Tronca Hash hex lunghi | Riduce hash hex 32-64 char a `primi 8...ultimi 6` |
| Tronca Base64/Token lunghi | Riduce stringhe base64/JWT ≥ 28 char a `primi 12...ultimi 6` |

### Prose Compress

Rimozione di cliché e frasi ponte a bassa informazione ("In conclusione, va notato che...", "Spero di esserti stato d'aiuto", ecc.). Default disattivo, consigliato in profilo Estremo.

### Parole/Regex personalizzate

Campo in sidebar per termini separati da virgola. Ogni termine viene rimosso come parola intera (word boundary). Accetta anche pattern regex.

## Aggressività

Il profilo di aggressione imposta un sottoinsieme delle opzioni sopra:

- **Leggera**: comportamento v2 (pulizie sicure)
- **Media**: aggiunge intensificatori, tronca hash/base64, collassa contatori (default)
- **Estrema**: attiva tutto, incluso Prose Compress, stack-trace, scarto chiavi JSON e telegrafico

Dopo aver scelto un profilo puoi comunque rifinire le singole opzioni a mano.

## Metriche

- **Originali / Compressi**: token (BPE reale) e conteggio caratteri
- **Risparmio**: percentuale token salvati
- **Stima Costi**: risparmio economico stimato, calcolato come `(token salvati / 1.000.000) × prezzoModello × richieste`. Modello e numero di richieste configurabili (default GPT-4o, 10.000 richieste)
- **Attivi**: badge dei moduli correntemente abilitati
- **Analizza per modulo**: mostra i token risparmiati da ogni modulo attivo

Il badge accanto alle metriche indica il metodo di conteggio: **BPE** (reale, via CDN) o **stima** (euristica `char/3.8`, fallback offline).

## Prompt demo

- **Prompt Misto** (Prosa + JSON + Logs)
- **Prosa Logorroica** (Caveman)
- **Prosa con Intensificatori** (Caveman++)
- **Output Shell Logs** (RTK)
- **Array JSON Strutturato** (Headroom)
- **JSON con Token/Base64** (Headroom++)

## Come usare

1. Apri `index.html` nel browser
2. Incolla il prompt grezzo nel pannello di sinistra (o usa il pulsante Incolla)
3. Seleziona il profilo di aggressività e/o i moduli e le opzioni nella sidebar
4. L'output compresso appare a destra con evidenziazione diff
5. Usa **Copia** per portare il testo compresso negli appunti
6. **Pulisci** azzera l'area di input

Nota: il pulsante Incolla richiede un contesto sicuro (HTTPS o `localhost`). In assenza di contesto sicuro, incolla manualmente con la scorciatoia di sistema.

## Avvio

Nessuna installazione richiesta. Apri direttamente il file:

```
xdg-open index.html
```

Oppure servi la cartella con un server statico qualsiasi:

```
python3 -m http.server 8000
```

Nota: l'app carica Tailwind CSS, FontAwesome e Google Fonts da CDN esterni, oltre al tokenizer BPE (`gpt-tokenizer`). Necessaria connessione di rete al primo utilizzo; senza rete le metriche tornano all'euristica e l'app resta funzionante.

## Tecnologie

- HTML5 + JavaScript vanilla (nessun framework), suddiviso in moduli separati
- Tailwind CSS (CDN) con palette personalizzata e dark mode
- FontAwesome 6.5.1 per icone
- Fira Code / Inter (Google Fonts)
- `gpt-tokenizer` (cl100k_base) per il conteggio token BPE

## Struttura

```
prompt-compressor/
├── index.html        # Markup + stili (UI)
└── js/
    ├── dicts.js      # Dizionari Caveman/Prose (IT/EN)
    ├── tokenizer.js  # BPE via CDN + fallback euristico
    ├── modules.js    # Pipeline dei moduli di compressione
    ├── diff.js       # Diff Myers O(ND) + word diff
    └── app.js        # Orchestrazione, metriche, costi, stato
```

I file JS sono caricati con `<script>` standard: funzionano anche aprendo `index.html` direttamente da `file://`, senza build né server.

## Privacy

Nessun dato viene inviato a server. Tutta l'elaborazione avviene localmente nel browser. L'unica dipendenza di rete è il caricamento di librerie da CDN.