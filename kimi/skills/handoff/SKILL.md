---
name: "handoff"
description: "Feuert für JEDE Übergabe — zwei Modi: (1) SESSION: vor jedem /clear und am Session-Ende einen Übergabe-Brief für die eigene nächste Session schreiben (PROGRESS.md/DECISIONS.md, Commit+Push, hartes /clear). (2) EXTERN: das Gespräch zu einem redigierten Übergabe-Dokument für eine andere Instanz, einen parallel contributors oder eine externe Person verdichten (Verweis statt Duplikat, Ablage im OS-Temp). Fakten statt Anweisungen, inkl. Fallen/Sackgassen und Secret-Redaktion. Trigger: \"handoff\", \"übergeben\", \"vor /clear\", \"Session beenden\", \"~300-400k Tokens erreicht\", \"Handoff für einen anderen Agenten\", \"an parallel contributors übergeben\", \"externe Übergabe\", \"handoff-ext\""
---

# handoff — Kimi source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/eigene/handoff/SKILL.md`

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
