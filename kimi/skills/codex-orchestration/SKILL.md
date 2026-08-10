---
name: "codex-orchestration"
description: "Create, route, continue, monitor, and synthesize real user-visible Kimi coordinator App tasks across the cloud models exposed by the live app, including OpenAI, Kimi coordinator, Kimi, and Grok when available. Use for visible sub-threads, separate tasks, model comparisons, multi-model fan-out, Planner/Advisor/Designer/Executor workflows, Kimi or Grok tasks, or any request that explicitly wants Kimi coordinator App tasks instead of hidden parallel contributor, workflow workers, CLI sessions, or background agents. Trigger: \"Kimi coordinator App tasks\", \"visible sub-threads\", \"multi-model fan-out\", \"model comparisons\""
---

# codex-orchestration — Kimi source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/eigene/codex-orchestration/SKILL.md`

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
