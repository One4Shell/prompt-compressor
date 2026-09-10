window.CompressorDicts = (function () {
    const CAVEMAN = {
        it: {
            fillers: [
                /\b(per favore|per cortesia|potresti|vorrei che tu|assicurati di|è importante che|tieni presente che|ricorda che|ti sarei davvero molto grato|grazie mille|in anticipo|rimango in attesa|celere riscontro|grazie per la cortesia|agissi come|esperto)\b/gi,
                /\b(in modo da|al fine di|allo scopo di|con l'obiettivo di|per quanto riguarda|come già detto|praticamente|sostanzialmente|in linea di massima|per così dire)\b/gi,
                /\b(vorrei|gradirei|desidererei|mi farebbe piacere se|sarebbe fantastico se|sarebbe utile se|ti chiedo gentilmente|se possibile|nel caso in cui)\b/gi
            ],
            articles: /\b(il|lo|la|i|gli|le|un|uno|una|l'|un'|dei|degli|delle|un')\b/gi,
            prepositions: /\b(di|a|da|in|con|su|per|tra|fra|del|dello|della|al|allo|alla|ai|agli|alle|dal|dallo|dalla|nel|nello|nella|nei|negli|nelle|sul|sullo|sulla|sui|sugli|sulle|verso|durante|oltre|senza|presso|mediante|tramite)\b/gi,
            pronouns: /\b(io|tu|lui|lei|noi|voi|loro|mio|tuo|suo|nostro|vostro|loro|questo|quello|questa|quella|questi|queste|quelli|quelle)\b/gi,
            intensifiers: /\b(molto|davvero|veramente|estremamente|assolutamente|completamente|totalmente|decisamente|particolarmente|enormemente|terribilmente|incredibilmente|effettivamente|sicuramente|certamente|ovviamente)\b/gi
        },
        en: {
            fillers: [
                /\b(please|kindly|could you|would you|i want you to|i need you to|make sure to|ensure that|it is important to|note that|keep in mind that|i would be very grateful|thanks in advance|act as an expert|as an AI assistant)\b/gi,
                /\b(in order to|for the purpose of|with the aim of|as mentioned earlier|basically|actually|essentially|in general terms|so to speak)\b/gi,
                /\b(i would like|i would appreciate it if|it would be great if|it would be helpful if|if possible|in case|just a quick note)\b/gi
            ],
            articles: /\b(a|an|the)\b/gi,
            prepositions: /\b(of|in|to|for|with|on|at|from|by|about|as|into|through|after|over|between|out|against|during|without|before|under|around|among|towards|via)\b/gi,
            pronouns: /\b(i|you|he|she|it|we|they|my|your|his|her|its|our|their|this|that|these|those|me|him|us|them)\b/gi,
            intensifiers: /\b(very|really|extremely|absolutely|completely|totally|quite|rather|highly|incredibly|truly|especially|particularly|pretty|genuinely|actually|definitely|certainly|obviously)\b/gi
        }
    };

    const PROSE = {
        it: [
            /\b(come già detto|come accennato in precedenza|come menzionato sopra|in conclusione|per concludere|in altre parole|in poche parole|per dirla in breve|va notato che|si noti che|è bene ricordare che|a questo proposito|a tal proposito|al riguardo|nel senso che|d'altra parte|in ogni caso)\b/gi,
            /\b(non vedo l'ora di|spero di esserti stato d'aiuto|spero di essere stato utile|buona fortuna|in bocca al lupo|non esitare a contattarmi|sono a tua disposizione|resto a disposizione)\b/gi,
            /\b(va da sé che|è ovvio che|è chiaro che|inutile dire che|a dirla tutta|francamente parlando|se devo essere sincero)\b/gi
        ],
        en: [
            /\b(as mentioned earlier|as previously stated|as noted above|in conclusion|to conclude|in other words|in short|to put it briefly|it should be noted that|please note that|in this regard|in this context|in that sense|on the other hand|in any case|anyway)\b/gi,
            /\b(i hope this helps|i hope i was helpful|good luck|let me know if you need anything else|feel free to reach out|i am at your disposal|i remain at your disposal)\b/gi,
            /\b(it goes without saying that|it is obvious that|needless to say|frankly speaking|to be honest|as a matter of fact)\b/gi
        ]
    };

    return { CAVEMAN, PROSE };
})();