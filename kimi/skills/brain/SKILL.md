---
name: "brain"
description: "Der eine Einstieg ins Second Brain (/root/raphael-brain) mit sechs Modi: `einspeisen` (Rohmaterial nach raw/ mit Herkunftsbeleg), `verdichten` (Wissen als Kandidat, nie ins Wiki), `abrufen` (nur freigegebene Seiten, mit Quellenliste), `pruefen` (alle Gates in fester Reihenfolge), `sichten` (Kandidaten-Triage für Raphaels Freigabe) und `verbinden` (Verlinkungs-Vorschläge als Diff). Verdrahtet auf die vorhandenen Brain-Skripte statt auf Freitext. Trigger: \"ins Brain\", \"einspeisen\", \"Brain aufräumen\", \"was weiß ich über\", \"Kandidaten sichten\", \"Wissen verdichten\", \"Brain prüfen\", \"brain\", \"Notiz ablegen\", \"Second Brain\""
---

# brain — Kimi source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/eigene/brain/SKILL.md`

The canonical source is authoritative for safety, scope, procedure, and completion. Do not copy or paraphrase it into this adapter.

Compatibility mapping:
- Claude/Cockpit in the source means the current Kimi coordinator.
- `AskUserQuestion` → the surfaced Kimi `AskUserQuestion` capability.
- `TodoList` → the surfaced Kimi `TodoList` capability.
- `Agent` → the surfaced Kimi `Agent` capability.
- `AgentSwarm` → the surfaced Kimi `AgentSwarm` capability.
- `Read` → the surfaced Kimi `Read` capability.
- `Write` → the surfaced Kimi `Write` capability.
- `Edit` → the surfaced Kimi `Edit` capability.
- `Bash` → the surfaced Kimi `Bash` capability.
- `Grep` → the surfaced Kimi `Grep` capability.
- `Glob` → the surfaced Kimi `Glob` capability.
- `FetchURL` → the surfaced Kimi `FetchURL` capability.
- `WebSearch` → the surfaced Kimi `WebSearch` capability.
- `Skill` → the surfaced Kimi `Skill` capability.
Use a capability only when the current Kimi host actually surfaces it; never invent an unavailable tool or silently substitute another one. Keep every source safety and completion requirement authoritative.
