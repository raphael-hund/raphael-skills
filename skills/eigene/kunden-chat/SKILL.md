---
name: kunden-chat
version: 0.3.0
description: >
  Feuert bei Kundenkommunikation auf WhatsApp und in Mails: Entwurf im
  Raphael-Ton aus echten MAKE-Chats, Verlauf und Dateien zuerst ziehen.
  always: true bei Kunden-Chat, Kundenmail, Update an den Kunden,
  Erinnerung, Freigabe-Frage, Liefer-Ansage. Trigger: "WhatsApp an Kunden",
  "Kundenmail", "Nachricht an den Kunden", "Kundenupdate schreiben",
  "im Chat antworten".
class: F
scope: agency
sensitivity: internal
source: >
  Destilliert 2026-08-17 aus From-Me-Nachrichten in MAKE-Kundengruppen
  (Manuka, AlpenEnergie, Swisshelp, Geotravel, Innocenti, Kunz, Burak,
  Josephine, Propfin, MGI, Salsaflow). Kein Fremd-Vendoring.
loads:
  - references/stimme-und-muster.md
  - references/whatsapp-mcp.md
requires_skills: [copywriting@^0]
completion_criteria:
  - "Kanal steht (WhatsApp oder Mail) und der Entwurf nutzt das passende Muster aus references/stimme-und-muster.md"
  - "Vor dem Entwurf: Chat gelesen und in einer Zeile eingeordnet (wer schreibt wie, letzter Stand, ob das Gespraech laeuft)"
  - "Anrede und Schluss nur wenn der laufende Chat das gerade so macht. Kein Pflicht-Hallo, kein Pflicht-Liebe-Gruesse"
  - "Dokumente/Bilder im Chat per download_media lokal geholt, wenn der Auftrag sie braucht; Pfad im Output genannt"
  - "Kein Hey, kein HEU, kein Hoi"
  - "Maximal eine klare Bitte-Liste, nummeriert, jeder Punkt ein Satz"
  - "Text ist Entwurf an Raphael, nicht live gesendet, ausser Raphael sagt ausdruecklich senden"
  - "python3 /root/raphael-skills/skills/eigene/copywriting/scripts/forbidden-check.py auf dem Entwurf, Exit 0"
---

# kunden-chat — WhatsApp und Mail an Kunden

## Herkunft, Job, Problem

**Herkunft:** Echte Raphael-Nachrichten in vielen Kundengruppen, nicht nur Manuka.

**Job:** Nachrichten schreiben, die sich anfühlen wie Raphael, nicht wie Agentur-Copy.

**Problem:** Ohne Lage zuerst wird jede Nachricht ein Brief: Hallo, Schluss,
Raphael — auch mitten im laufenden Chat. Raphael tippt dort oft nur den Punkt.

**Entscheidung:** Neuer Skill. `copywriting` bleibt Verkaufstext. Dieser Skill
ist nur 1:1-Kundenkommunikation. `kanaele.md` in copywriting verweist hierher.

## Zweck (1 Satz)

Eine WhatsApp oder eine kurze Kundenmail schreiben, nachdem der echte Chat
gelesen und die Lage eingeordnet ist. Ton und Laenge kommen aus diesem Chat,
nicht aus einer festen Brief-Schablone.

## Wann laden

Immer, sobald Raphael einen Kunden ansprechen will: Update, Bitte, Erklärung,
Erinnerung, Termin, Freigabe, Lieferlink. Auch wenn er nur „schreib denen“ sagt.

Nicht laden für Ads, Landingpages, SEO, interne Ops ohne Kundenkontakt.

## Ablauf

1. **Kunde und Kanal festlegen.** WhatsApp ist Default. Mail nur wenn Raphael
   Mail sagt oder der Chat das verlangt.
2. **Chat finden.** MCP `whatsapp` (und bei Bedarf `whatsapp-business`) mit
   `list_chats` und Kundenname. JID merken.
3. **Verlauf lesen.** `list_messages` auf dieser JID, mindestens die letzten
   20 Nachrichten. Zusaetzlich Raphael-Korpus: `list_messages` mit
   `sender_phone_number` 41762642196, wenn der Chat duenn ist.
   Dialekt des Kunden nicht nachmachen.
4. **Lage in einer Zeile.** Wer schreibt wie. Letzter Stand. Laeuft das
   Gespraech noch (letzte Tage) oder ist es kalt (Wochen Pause). Wie Raphael
   dort selbst tippt: kurz ohne Anrede, oder Brief mit Hallo.
5. **Dateien holen, wenn sie zaehlen.** Bei `[document]` / `[image]` / `[audio]`
   `download_media` mit `message_id` und `chat_jid`. Datei lesen oder Raphael
   den lokalen Pfad nennen. Nie raten, was im PDF steht.
6. **Entwurf schreiben** nach `references/stimme-und-muster.md`. Form folgt
   der Lage-Zeile, nicht der Gold-Beispiele mit Hallo.
7. **Gate.** `forbidden-check.py` auf den Entwurf. Exit 0.
8. **Abgeben als Entwurf.** Text in einem Block, plus 1 Zeile: wen, welcher
   Chat, Lage, ob senden noch fehlt. Senden nur auf ausdrueckliches Wort.

## Harte Regeln

- Anrede und Schluss sind kein Default. Laufendes Gespraech (heute/gestern,
  Raphael tippt dort ohne Hallo): nur der Punkt, kein `Hallo`, kein
  `Liebe Gruesse`, kein Namenszug. Kalter Chat oder erster Kontakt: `Hallo`
  plus Name oder `Hallo ihr Lieben`, Schluss nur wenn Raphael dort so
  unterschreibt.
- Verboten als Opener: `Hey`, `HEU`, `Hoi`.
- Hochdeutsch, gesprochen. `Gruesse`, `abschliessen`, TWINT, CHF.
  Kein Dialekt. Nicht wie Dominic. Nicht wie Agentur-Update.
- Kein Verkaufs-Hook, kein CTA-Druck, keine Emoji-Flut.
- Eine Nachricht = ein Thema. Zwei Themen = zwei Nachrichten oder zwei Bloecke.
- Bitten nummerieren. Jede Bitte sagt was, in welchem Format, warum.
- Lange Erklaerung zuerst in Alltagswörtern, dann der Link.
- Nicht `Beste Gruesse`, nicht `Sonnige Gruesse`.
- Nicht im Namen von MAKE versprechen, was nicht im Chat oder im Auftrag steht.

## WhatsApp-MCP

Siehe `references/whatsapp-mcp.md`. Kurz: Server `whatsapp` und
`whatsapp-business` sind on-demand an. Login ist die bestehende WhatsApp-Web-
Session auf dem VPS. Neu scannen nur wenn `list_chats` fehlschlägt.
