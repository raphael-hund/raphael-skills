# Item-Liste — Format für docs/feedback-<datum>.md

Eine Zeile je Aussage des Kunden. Nur Änderungswünsche, keine Bestätigungen.

| # | Zeit / Zitat | Route | Soll (ein Satz) | Typ | Status | Shot |
|---|---|---|---|---|---|---|
| 1 | 05:40 „die Mini-Sachen lost" | /events | Workshop-Liste hat genau zwei Punkte, keine Zeilenumbrüche in den Punkten | visuell | offen | |
| 2 | 07:12 „Logo oben rechts kleiner" | / | Header-Logo 20 % kleiner, Abstand rechts bleibt | visuell | offen | |
| 3 | 09:03 „geht der Kalender auch auf dem Handy?" | /buchung | — | frage | frage | |
| 4 | 11:30 „Startseite komplett anders" | / | — | gesperrt | eingefroren (DECISIONS.md 12.08.) | |

Typ: `visuell` (Layout, Bild, Abstand), `copy` (Text), `technik` (Formular,
Link, Performance), `frage` (Kunde fragt, Raphael antwortet), `gesperrt`.

Status: `offen` → `PASS` / `ESCALATE` / `frage` / `eingefroren`. Bei PASS und
ESCALATE steht der Shot-Pfad (Original-PNG, nicht `/small/`).

Regeln:
- Zeitstempel im Format mm:ss aus dem Transkript; bei Textliste das Zitat.
- Ein Item, ein Soll-Satz, eine Route. Zwei Routen sind zwei Items.
- Nichts ergänzen, was der Kunde nicht gesagt hat. Eigene Beobachtungen kommen
  unter die Tabelle als „Vorschläge (nicht vom Kunden)".
