# LLM Prompt Compressor & Token Optimizer

Applicazione web a pagina singola (SPA) per comprimere prompt, conversazioni, log e dati strutturati destinati a modelli LLM. Riduce il numero di token e i costi di inferenza, mantenendo intatto il contenuto informativo.

L'elaborazione è **100% client-side**: il testo non lascia mai il browser.

## Caratteristiche

- Compressione tramite 4 moduli indipendenti, attivabili/disattivabili singolarmente o in blocco
- Calcolo in tempo reale di token originali, token compressi, risparmio percentuale e stima dei costi
- Visualizzatore diff: parole rimosse evidenziate con barrato rosso
- Dizionari di compressione in italiano e inglese
- Regole personalizzate (parole/termini da rimuovere)
- 4 prompt demo precaricati
- Sidebar collapsible, tema scuro, layout responsive (desktop affiancato, mobile a tab)
- Nessuna build, nessun backend, nessuna dipendenza locale

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

### RTK Filter

Pulizia di output di terminale e log.

| Opzione | Effetto |
|---|---|
| Rimuovi colori ANSI | Strips sequenze di escape tipo `\x1b[31m` |
| Rimuovi Timestamp e Date | Elimina timestamp ISO (`2026-09-10T01:15:22Z`) e orari `[01:15:23]` |
| Deduplica log identici | Sostituisce righe consecutive ripetute con `[... Nx righe omesse ...]` |
| Elimina barre progresso/spinner | Rimuove barre `[====>] 50%` e caratteri di blocco |

### Headroom

Compressione di dati strutturati.

| Opzione | Effetto |
|---|---|
| Minifica JSON | Serializza JSON senza indentazione |
| Converti Array JSON in CSV | Trasforma array di oggetti in CSV con header dai nomi chiave |
| Tronca Hash/Base64 lunghi | Riduce hash hex 32-64 char a `primeiro 8...ultimi 6` |

### Parole/Regex personalizzate

Campo in sidebar per termini separati da virgola. Ogni termine viene rimosso come parola intera (word boundary). Accetta anche pattern regex.

## Metriche

- **Originali / Compressi**: token stimati e conteggio caratteri
- **Risparmio**: percentuale token salvati
- **Stima Costi**: risparmio economico stimato su 10.000 richieste, calcolato come `(token salvati / 1.000.000) × $3.00 × 10.000`
- **Attivi**: badge dei moduli correntemente abilitati

La stima dei token usa l'euristica `Math.ceil(numeroCaratteri / 3.8)`. È un'approssimazione, non un tokenizzatore reale (es. `tiktoken`).

## Prompt demo

- **Prompt Misto** (Prosa + JSON + Logs)
- **Prosa Logorroica** (Caveman)
- **Output Shell Logs** (RTK)
- **Array JSON Strutturato** (Headroom)

## Come usare

1. Apri `index.html` nel browser
2. Incolla il prompt grezzo nel pannello di sinistra (o usa il pulsante Incolla)
3. Seleziona i moduli e le opzioni nella sidebar
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

Nota: l'app carica Tailwind CSS, FontAwesome e Google Fonts da CDN esterni. Necessaria connessione di rete al primo utilizzo.

## Tecnologie

- HTML5 + JavaScript vanilla (nessun framework)
- Tailwind CSS (CDN) con palette personalizzata e dark mode
- FontAwesome 6.5.1 per icone
- Fira Code / Inter (Google Fonts)

## Struttura

```
prompt-compressor/
└── index.html   # Intera applicazione (markup, stili, logica)
```

## Privacy

Nessun dato viene inviato a server. Tutta l'elaborazione avviene localmente nel browser.