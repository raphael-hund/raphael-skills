---
name: "brain"
description: "Der eine Einstieg ins Second Brain (/root/raphael-brain) mit sechs Modi: `einspeisen` (Rohmaterial nach raw/ mit Herkunftsbeleg), `verdichten` (Wissen als Kandidat, nie ins Wiki), `abrufen` (nur freigegebene Seiten, mit Quellenliste), `pruefen` (alle Gates in fester Reihenfolge), `sichten` (Kandidaten-Triage für Raphaels Freigabe) und `verbinden` (Verlinkungs-Vorschläge als Diff). Verdrahtet auf die vorhandenen Brain-Skripte statt auf Freitext. Trigger: \"ins Brain\", \"einspeisen\", \"Brain aufräumen\", \"was weiß ich über\", \"Kandidaten sichten\", \"Wissen verdichten\", \"Brain prüfen\", \"brain\", \"Notiz ablegen\", \"Second Brain\"."
---

# brain — Codex source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/eigene/brain/SKILL.md`

The source skill is authoritative for safety, scope, procedure, and completion. Do not copy or paraphrase source content into this adapter.

Codex mapping:
- Claude/Cockpit = current Codex coordinator.
- Read/Bash = current file/terminal tools.
- AskUserQuestion = normale Userfrage.
- Never pretend that a missing tool exists.
- Create new or background threads only when the user explicitly requests them.
- Keep every source safety and completion requirement authoritative.
