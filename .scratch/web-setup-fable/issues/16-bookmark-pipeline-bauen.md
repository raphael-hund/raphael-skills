# X-Bookmark-Pipeline bauen (twitter CLI bookmarks → Auswertung → Kandidaten)

Type: task
Status: resolved
Blocked by: 02

## Question

AFK nach 02: Job zieht 'twitter bookmarks' (Cookies aus ~/.secrets), legt je neuer ID raw.md + Auswertung an (Sonnet), schreibt Website-/Design-Kandidaten in eine Kandidatenliste für den Stamp-Batch aus Ticket 15. Firecrawl-Key-Status klären (Betrieb, siehe Map). Beleg: ein Lauf mit mindestens 10 Bookmarks, Ledger-Zeilen, keine Doppelverarbeitung beim zweiten Lauf.

## Resolution (2026-09-03)

X-Bookmark-Adapter auf der funktionierenden `twitter`-CLI gebaut und in die bestehende Brain-Rohschicht integriert. Dreißig Rohnotizen, dreißig Provenance-Dateien und dreißig Auswertungen liegen vor; zwei Website-/Design-Kandidaten wurden in die Muster-Bibliothek übernommen. Wiederholungslauf meldet null neue Einträge. Bookmark-Eval 23/23 und Eval-Nenner registriert. Sol-Bau, echte Grok-Kritik PASS (`wf_108e5eb3-8bb`, `wf_99c16e76-3d7`).
