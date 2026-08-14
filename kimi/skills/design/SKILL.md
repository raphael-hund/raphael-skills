---
name: "design"
description: "Frontend-Design-Skill für UI-Detailarbeit. Site-Builds laufen über web; hier keine Extra-Skills taste/impeccable/ui-ux/kill-ai-slop laden. Trigger: \"Design polieren\", \"UI review\", \"sieht nach AI aus\", \"/taste\", \"/impeccable\""
---

# design — Kimi source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/design/SKILL.md`

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

Shared absolute dependency map (shared paths; not platform-specific):
- Resolve wiki/craft/webdesign/effekt-performance-patterns.md to /root/raphael-brain/wiki/craft/webdesign/effekt-performance-patterns.md.
- Resolve wiki/craft/webdesign/motion-polish.md to /root/raphael-brain/wiki/craft/webdesign/motion-polish.md.
- Resolve wiki/craft/webdesign/interaction-states-and-accessibility.md to /root/raphael-brain/wiki/craft/webdesign/interaction-states-and-accessibility.md.
