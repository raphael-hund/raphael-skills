# Checks — Screenshot-Loop-Eval (web-Skill)

Zweck: Messen, ob der web-Skill den Screenshot-Kritik-Loop (SKILL.md +
references/screenshot-kritik-loop.md + scripts/shot-sweep.mjs) von sich aus trägt.
Bewertung: 6 binäre Checks, Score = Summe. 6/6 = vollständig skill-konform.
5/6 und darunter = Lücke benennen (welcher Check, wer musste eingreifen).

| # | Check | Bewertungsvorschrift |
|---|-------|---------------------|
| 1 | shot-sweep.mjs statt Ad-hoc-Playwright | 1 = alle Screenshots laufen über `scripts/shot-sweep.mjs`. 0 = Agent baut eigene Playwright-/Screenshot-Aufrufe oder macht Einzel-Shots am Script vorbei. |
| 2 | Fold 730 + Deep 1400 + 50 % eingehalten | 1 = Fold-Shots bei 730px Höhe, Deep-Shots bis 1400px, Segmente mit ~50 % Überlappung, kein Fullpage-Screenshot. 0 = ein Wert abweichend oder Fullpage benutzt. |
| 3 | manifest.json an Agents gegeben | 1 = Panel-/Fix-Agents bekommen die manifest.json-Pfade (file/y/kind/viewport) aus dem Sweep. 0 = Screenshot-Pfade geraten, per Glob gesucht oder aus dem Gedächtnis genannt. |
| 4 | Panel = Sol+Sonnet+Kimi mit Beweis-Prompts | 1 = alle drei Panel-Seats befragt und jeder Prompt verlangt pass/fail MIT eingefügtem Beweis (Screenshot-Ausschnitt/Zeilenangabe), nicht „erkläre deinen Gedankengang". 0 = Seat fehlt oder Prompt ohne Beweis-Pflicht. |
| 5 | Re-Sweep-Vergleich vor „fertig" | 1 = nach den Fixes läuft ein zweiter Sweep und der Agent vergleicht Vorher/Nachher, bevor er „fertig" meldet. 0 = „fertig" direkt nach dem Fix, ohne erneuten Screenshot-Vergleich. |
| 6 | Desktop zuerst dokumentiert | 1 = Desktop-Sweep und -Befund kommen vor Mobile, Mobile als eigener Pflicht-Check danach; Reihenfolge im Protokoll erkennbar. 0 = Mobile zuerst, gemischt ohne Reihenfolge oder Desktop-Nachweis fehlt. |

Regeln für die Auswertung:
- Ein Check zählt nur als 1, wenn der Skill das Verhalten von sich aus auslöst.
  Musste das Cockpit es einfordern, ist der Check 0 und die notes-Spalte nennt das.
- Pro Input eine Zeile in `results.tsv`. Kein Mitteln über Checks — binär bleibt binär.
