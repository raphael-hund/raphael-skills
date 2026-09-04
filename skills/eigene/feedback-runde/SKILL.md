---
name: feedback-runde
version: 0.1.0
description: >
  Feuert, wenn ein Kunde Feedback zu einer bestehenden Website als Video,
  Loom, Supercut, Sprachnachricht oder Punkteliste liefert und die Punkte
  umgesetzt werden sollen. Verkettet die vorhandenen Bausteine in fester
  Reihenfolge: Transkript (watch) → Item-Liste mit Zeitstempel → Worktree
  feedback-rN → Qualitätsschleife je Item (orchestrate) → Deploy
  (deploy-vercel.sh) → Ergebnisliste plus URL nach /root/eingang/ausgang/.
  Ersetzt die Handkette aus watch, video-vorfilter.mjs, feedback-sortieren.py
  und Kritiker-Prompts, die im Agent-Audit vom 04.09.2026 in vier Projekten
  (sorglos, wilhelm, manuka, zemp) über 40 Sessions von Hand getippt wurde.
  Trigger: "Kundenfeedback umsetzen", "Feedback-Video", "Loom", "Supercut",
  "der Kunde hat gesagt", "Änderungen vom Kunden", "feedback-runde", "Runde N".
class: F
scope: agency
sensitivity: internal
loads: [references/item-liste.md]
requires_skills: [watch, orchestrate, web, handoff]
provenance: "Agent-Audit 04.09.2026, Befund 3.1; Belege in /root/eingang/ausgang/agent-audit/BERICHT.md"
completion_criteria:
  - "Item-Liste liegt als docs/feedback-<datum>.md im Worktree: je Item Zeitstempel oder Zitat des Kunden, Route, Soll-Zustand, Status"
  - "Jedes Item lief durch die Qualitätsschleife (G1 exit 0 plus Judge-PASS anderer Familie) oder steht mit ESCALATE und Grund in der Liste"
  - "Deploy über /root/tools/deploy-vercel.sh, URL und HTTP-Codes in der Ergebnisdatei"
  - "Ergebnisdatei unter /root/eingang/ausgang/feedback/<projekt>-r<N>-<datum>.md per SendUserFile display render geliefert"
  - "Kein Item außerhalb der Kundenliste gebaut; eingefrorene Seiten laut DECISIONS.md nur gelistet"
---

# feedback-runde — Kundenfeedback in eine gebaute, geprüfte Runde

Der Kunde sagt, was anders sein soll. Diese Runde macht daraus eine Liste,
baut jeden Punkt in einem Worktree, lässt jeden Punkt prüfen und liefert eine
URL. Nichts davon ist neu; neu ist nur, dass die Reihenfolge fest ist und kein
Schritt von Hand getippt wird.

## Eingaben

- Quelle: Video-Link (YouTube, Loom, Supercut, Vimeo), lokale Datei aus
  `/root/eingang/`, Sprachnachricht-Transkript oder Textliste.
- Projekt: Repo-Pfad unter `/root/clients/<kunde>` oder `/root/website-projects/<projekt>`.
- Rundennummer N: höchste vorhandene `feedback-r*`-Worktree plus 1.

## Ablauf

1. **Transkript.** Video-Link oder Datei an `watch` (Tiefenstufe `transkript`).
   Textliste direkt übernehmen. Ergebnis nach `/tmp/feedback-<projekt>/transkript.txt`.
2. **Item-Liste.** Aus dem Transkript je Aussage ein Item nach
   `references/item-liste.md`: Zeitstempel oder Zitat, betroffene Route,
   Soll-Zustand in einem Satz, Status `offen`. Was der Kunde lobt, ist kein
   Item. Was DECISIONS.md als eingefroren führt, bekommt Status `eingefroren`
   und wird nicht gebaut. Datei: `<worktree>/docs/feedback-<YYYY-MM-DD>.md`.
   Vorher `node …/web/scripts/video-vorfilter.mjs --file transkript.txt`
   laufen lassen; seine Marker (Dateinamen, Slash-Commands) sind Hinweise auf
   Items, die technisch statt visuell sind.
3. **Worktree.** `git worktree add .claude/worktrees/feedback-r<N> -b feedback-r<N>`
   im Root-Checkout, dann nur noch absolute Pfade in diesem Worktree. Kein
   `EnterWorktree`. Dev-Server über `raphael-preview start --cwd <worktree> --port <frei>`.
4. **Bau je Item.** Ein `Workflow` nach `orchestrate/references/qualitaetsschleife.md`:
   je Item ein Builder-Leaf (Frontend `opus-builder` oder `fable-builder`,
   Technik `grok-worker`, Copy `sol-builder`), G1 per `luna-worker`
   (`shot-sweep.mjs` auf die betroffene Route plus `gate-check.mjs`), Judge
   der anderen Familie mit der Rubrik: (1) [VETO] Soll-Zustand des Items
   sichtbar im Shot, Köpfe nie angeschnitten, (2) keine Nebenänderung außerhalb
   der Route, (3) Mobile 390 und Desktop 1440 beide belegt. Drei Runden, dann
   `ESCALATE` in die Liste. Ein Schreiber pro Datei; Items auf derselben Datei
   laufen sequenziell.
5. **Liste nachziehen.** Jedes Item bekommt Status `PASS`, `ESCALATE` oder
   `eingefroren` plus Shot-Pfad.
6. **Deploy.** `/root/tools/deploy-vercel.sh <worktree> --routes <alle Item-Routen>`
   (Preview, `--prod` nur auf Ansage in dieser Session). Ohne PASS auf allen
   nicht-eingefrorenen Items kein Deploy; stattdessen Ergebnisdatei mit den
   ESCALATE-Gründen.
7. **Ergebnis.** `/root/eingang/ausgang/feedback/<projekt>-r<N>-<YYYY-MM-DD>.md`:
   Tabelle Item | Status | Shot | Notiz, darunter URL und HTTP-Codes. Per
   `SendUserFile` mit `display: render` liefern. Danach `handoff` (SESSION).

## Gotchas

- Item-Liste vor dem ersten Bau. Wer beim Hören baut, baut das erste Drittel
  und vergisst den Rest (Belege: sorglos r6, salsaflow r19).
- Kundenlob ist kein Item. Kundenfragen ("geht das?") sind Items mit Status
  `frage`, die Raphael beantwortet, nicht der Builder.
- "Startseite nicht anfassen" und andere Sperren aus DECISIONS.md schlagen
  jedes Kritiker-Urteil (Beleg: umzug-braun 12.08., sorglos 13.08.).
- Kein `git add -A`; nur die Dateien des Items stagen.
- Der Judge sieht Shots, nicht die Builder-Zusammenfassung.
