---
name: "unstuck"
description: "Feuert, wenn die Arbeit an einer Wand steht, die KEIN Bug ist: Login/2FA verlangt, API-Limit erreicht, Werkzeug fehlt, Anbieter blockt, Weg scheint versperrt — und IMMER als Pflicht-Schnellpfad, bevor eine \"geht nicht\"/\"ist nicht möglich\"-Meldung an Raphael geht. Klassifiziert die Sackgasse (falsche Annahme / falsches Framing / Gatekeeper / Werkzeug), sammelt mindestens 10 Winkel, bevor bewertet wird, und erzwingt so die Autonomie-Doktrin \"Raphael ist der ALLERLETZTE Ausweg\". Trigger: \"geht nicht\", \"ich komme nicht weiter\", \"steckt fest\", \"keine Möglichkeit\", \"blockiert\", \"unstuck\", \"gibt es einen anderen Weg\", \"bin in einer Sackgasse\""
---

# unstuck — Kimi source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/methodik/unstuck/SKILL.md`

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
