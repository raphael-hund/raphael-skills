---
name: "brainstorm"
description: "Verwandelt eine Idee durch geführten Dialog in eine geprüfte Design-Spec, bevor auch nur eine Zeile Code geschrieben wird. Fragt einzeln nach, schlägt 2-3 Ansätze mit Trade-offs vor, lässt die Spec vom Nutzer freigeben und übergibt danach an plan. Jeder Vorschlag braucht ein Zitat aus Codebase/Gespräch — generische Ideen ohne Beleg sind Rauschen, keine Option. Trigger: \"brainstorm\", \"Idee ausarbeiten\", \"Design-Spec\", \"bevor wir loslegen\", \"Anforderungen klären\""
---

# brainstorm — Kimi source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/methodik/brainstorm/SKILL.md`

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
