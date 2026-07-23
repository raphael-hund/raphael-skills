---
name: "no-ai-slop"
description: "Feuert beim Redigieren/Verfeinern englischer UND deutscher Texte, die nach KI klingen sollen — und bei der Frage \"liest sich das nach AI?\". Zweit-Meinung als scharfer menschlicher Editor NACH dem copywriting-Skill: erkennt 20+ AI-Slop-Muster (binary contrasts, throat-clearing, faux-insight, colon reveals, importance puffery, weasel attribution u.a.), entfernt sie mit minimalen Eingriffen und bewahrt dabei die Stimme des Autors. Trigger: \"klingt nach KI\", \"humanize\", \"schärfer machen\", \"AI slop raus\", \"ist das AI-slop?\", \"audit this text\", \"make it sound human\""
---

# no-ai-slop — Kimi source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/eigene/no-ai-slop/SKILL.md`

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
