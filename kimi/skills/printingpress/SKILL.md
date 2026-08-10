---
name: "printingpress"
description: "\"Druckt agent-native CLI + SKILL.md für API-only Services aus einem Prompt. Target: ads-research, seo, pipedrive, trello. Intake → Draft-Welle (1-3 Luna parallel) → G1 mechanical → G2 cross-family → _candidates/. Nutze NUR wenn Raphael explizit 'printingpress' oder 'CLI für X' sagt.\". Trigger: \"printingpress\", \"CLI für X\""
---

# printingpress — Kimi source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/eigene/printingpress/SKILL.md`

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
