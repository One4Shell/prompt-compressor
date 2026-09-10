# LLM Prompt Compressor & Token Optimizer

Applicazione web a pagina singola (SPA) per comprimere prompt, conversazioni, log e dati strutturati destinati a modelli LLM. Riduce il numero di token e i costi di inferenza, mantenendo intatto il contenuto informativo.

L'elaborazione è **100% client-side**: il testo non lascia mai il browser.

## Caratteristiche

- Compressione tramite 6 moduli indipendenti, attivabili/disattivabili singolarmente o in blocco
- **OmniGlyph (opzionale)**: output della pipeline renderizzato come pagine PNG ottimizzate per i modelli vision (solo route Anthropic diretta)
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
| Rimuovi formattazione markdown/HTML | Strip completo mantenendo il contenuto: heading `#`, bullet, blockquote `>`, `**`/`*`/`__`/`_`/`~~`, codice inline, link → solo testo, immagini → alt, tabelle (separatori e pipe esterni), tag HTML e commenti, punteggiatura ripetuta (`!!!`→`!`). I blocchi fence ``` sono protetti: il codice resta intatto, vengono rimosse solo le righe marker |

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

Pulizia di output di terminale e log. I blocchi JSON del testo (nudi o nei fence, con info `json` o contenuto JSON valido) sono protetti dalle trasformazioni riga-per-riga (stack-trace, deduplica, contatori) e passano intatti, così restano JSON valido per Headroom e TOON.

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
| Minifica JSON | Serializza JSON senza indentazione: tutti i blocchi JSON del testo (nei fence, nudi in testo misto, o intero prompt), purché validi e ad inizio riga |
| Converti Array JSON in CSV | Trasforma array di oggetti in CSV con header dai nomi chiave |
| Scarta chiavi JSON | Array di oggetti → array di soli valori (massimo risparmio) |
| Tronca Hash hex lunghi | Riduce hash hex 32-64 char a `primi 8...ultimi 6` |
| Tronca Base64/Token lunghi | Riduce stringhe base64/JWT ≥ 28 char a `primi 12...ultimi 6` |

### TOON

Conversione di dati JSON in **TOON (Token-Oriented Object Notation)** — una codifica compatta del modello dati JSON, studiata per minimizzare i token mantenendo la struttura esplicita. Converte tutti i blocchi JSON del prompt (nei fence, nudi in testo misto, o intero prompt) in blocchi ```toon```.

| Opzione | Effetto |
|---|---|
| Delimiter | Virgola (default), Tab (più compatto, consigliato in profilo Estremo) o Pipe |

L'encoder implementa le forme dello **spec TOON v4.1**: inline (array di primitive), tabular (array di oggetti uniformi, con **nested field group**), keyed tabular (oggetti di oggetti uniformi) e list form (array misti/non-uniformi). Il quoting delle stringhe è minimale (solo quando necessario), i numeri sono emessi in forma canonica. L'output sostituisce il JSON originale ed è avvolto in un fence ```toon```.

### Prose Compress

Rimozione di cliché e frasi ponte a bassa informazione ("In conclusione, va notato che...", "Spero di esserti stato d'aiuto", ecc.). Default disattivo, consigliato in profilo Estremo.

### Parole/Regex personalizzate

Campo in sidebar per termini separati da virgola. Ogni termine viene rimosso come parola intera (word boundary). Accetta anche pattern regex.

### OmniGlyph

Compressione del contesto come immagine. Esegue il rendering dell'output compresso (prompt di sistema, documentazione strumenti, cronologia densa) come pagine PNG compatte che il modello vision legge al posto del testo. I token immagine vengono fatturati in base alle dimensioni anziché ai caratteri — `(larghezza × altezza) / 750` per pagina — quindi il blocco convertito costa sensibilmente meno. **Solo route Anthropic diretta**; disattivato di default in tutti i profili di aggressività.

Quando OmniGlyph è attivo, prima del rendering il testo viene ottimizzato **solo per l'immagine** (l'output testuale della pipeline resta invariato): i blocchi JSON vengono minificati — indentazione e fence ```json rimossi, con fallback silenzioso su JSON non valido — e lo spreco whitespace viene eliminato (trailing space, righe vuote multiple collassate). Nessun conflitto con Headroom: se il JSON è già stato convertito in CSV/TOON il contenuto passa invariato.

| Opzione | Effetto |
|---|---|
| Densità testo | **Auto** (default): il font più grande (16→10px) che tiene tutto su una sola pagina, altrimenti 10px; oppure Leggibile (16px), Compatto (13px) o Denso (10px) |

Le pagine sono ottimizzate per la pipeline vision di Claude: 1152×998 px (~1,15 megapixel, entro il limite di 1568px sul lato lungo che evita il downsampling interno), alto contrasto bianco/nero, font monospace, interlinea compatta (1.2), metriche di riga a sub-pixel e footer ridotto per massimizzare i caratteri per pagina a parità di token immagine. Se il testo sfonda una pagina viene paginato automaticamente. Quando attivo, il pannello output offre un selettore Testo/Immagine con anteprima, navigazione pagine, copia PNG negli appunti e download. Il conteggio "Compressi" e il risparmio vengono ricalcolati sui token immagine (badge `IMG`).

## Aggressività

Il profilo di aggressione imposta un sottoinsieme delle opzioni sopra:

- **Leggera**: comportamento v2 (pulizie sicure)
- **Media**: aggiunge intensificatori, tronca hash/base64, collassa contatori (default)
- **Estrema**: attiva tutto, incluso Prose Compress, stack-trace, scarta chiavi JSON, telegrafico, strip markdown/HTML e **delimiter TOON a Tab**

Dopo aver scelto un profilo puoi comunque rifinire le singole opzioni a mano.

## Metriche

- **Originali / Compressi**: token (BPE reale) e conteggio caratteri
- **Risparmio**: percentuale token salvati
- **Stima Costi**: risparmio economico stimato, calcolato come `(token salvati / 1.000.000) × prezzoModello × richieste`. Modello e numero di richieste configurabili (default GPT-4o, 10.000 richieste)
- **Attivi**: badge dei moduli correntemente abilitati
- **Analizza per modulo**: mostra i token risparmiati da ogni modulo attivo

Il badge accanto alle metriche indica il metodo di conteggio: **BPE** (reale, via CDN), **stima** (euristica `char/3.8`, fallback offline) o **IMG** (token immagine Anthropic `(w×h)/750` per pagina, quando OmniGlyph è attivo).

## Prompt demo

- **Prompt Misto** (Prosa + JSON + Logs)
- **Prosa Logorroica** (Caveman)
- **Prosa con Intensificatori** (Caveman++)
- **Output Shell Logs** (RTK)
- **Array JSON Strutturato** (Headroom)
- **JSON con Token/Base64** (Headroom++)
- **JSON Annidato** (TOON)
- **Mappa JSON** (TOON Keyed)

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
    ├── toon.js       # Encoder JSON→TOON (spec TOON v4.1)
    ├── omniglyph.js  # Renderer testo→PNG per modelli vision (Anthropic): minifica JSON nel PNG, densità auto
    ├── diff.js       # Diff Myers O(ND) + word diff
    └── app.js        # Orchestrazione, metriche, costi, stato
```

I file JS sono caricati con `<script>` standard: funzionano anche aprendo `index.html` direttamente da `file://`, senza build né server.

## Privacy

Nessun dato viene inviato a server. Tutta l'elaborazione avviene localmente nel browser. L'unica dipendenza di rete è il caricamento di librerie da CDN.