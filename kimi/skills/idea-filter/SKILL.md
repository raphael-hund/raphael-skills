---
name: "idea-filter"
description: "Bewertet eine Geschäfts-/Produktidee entlang von neun festen Dimensionen gegen Raphaels tatsächliches Portfolio (ICP, Angebot, Voice, Kunden) und endet immer in genau einem von vier Verdikten — Build, Sleep on it, Pass oder Angle klauen. Erzwingt Belege statt Bauchgefühl und legt jede bewertete Idee als Kandidat ab, auch die abgelehnten. Trigger: \"Idee bewerten\", \"lohnt sich das\", \"Geschäftsidee prüfen\", \"soll ich das bauen\", \"idea-filter\", \"Ideen filtern\""
---

# idea-filter — Kimi source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/eigene/idea-filter/SKILL.md`

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
