# Kanon-Pipeline bauen: Eingang-Watcher, Stamp-Batch, Quellen-Ledger

Type: task
Status: resolved
Blocked by: 03

## Question

AFK nach 03: P1 URL-Datei in /root/eingang startet scripts/muster-studie.mjs und legt Case-Datei mit leerem Stamp an; P2 wöchentlicher Stamp-Batch (scheduled-tasks) mit 3 bis 5 Cases je Nachricht, Stamp bleibt manuell; P5 references/quellen-ledger.md mit URL, Datum, Reifegrad, Zieldatei, Ablaufdatum, verlinkt aus load-graph.md §5. P4 Video-Vorfilter (Haiku klassifiziert Transkript auf harte Marker) als scripts/video-vorfilter.mjs. Beleg: erste fremde URL läuft durch bis Case-Datei; Ledger hat alle 11 Quellen dieser Session.

## Resolution (2026-09-03)

Kanon-Pipeline gebaut: URL-Eingang, manueller Stamp-Batch, Video-Vorfilter, Quellen-Ledger und acht neue Referenzstudien einschließlich Pangram. `web` steht auf 0.31.0. Belege: Kanon-Eval 20/20, Muster-Bibliothek 23/23, Referenz-Verweise 1/1 mit 99 gültigen Zielen; Stamp-Batch liefert fünf begründungs-offene Cases und schreibt nie. Wöchentlicher Desktop-Task `weekly-web-reference-stamps` aktiv, montags gegen 09:00 lokal. Sol-/Opus-Bau, echte Grok-Kritik PASS (`wf_108e5eb3-8bb`, `wf_99c16e76-3d7`, `wf_27d0c2ae-8a1`).
