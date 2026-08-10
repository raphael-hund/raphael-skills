---
name: "plan"
description: "DER Planungs-Skill — einer für alles Planen. Führt von der rohen Idee bis zum umsetzbaren Plan und wählt selbst die Stufe: GRILL (Entscheidung durchbohren), SPEC (Idee zur freigegebenen Spec), PLAN (Spec zum bissgroßen Umsetzungsplan), TICKETS (in Tracer-Bullet-Tickets schneiden), UMSETZUNG (parallel contributor je Task). Ersetzt brainstorm, grill, to-spec, tickets und sdd. Trigger: \"planen\", \"Plan machen\", \"plane das\", \"Umsetzungsplan\", \"brainstorm\", \"Idee ausarbeiten\", \"Design-Spec\", \"Spec schreiben\", \"PRD\", \"grillen\", \"grill mich\", \"Entscheidung durchleuchten\", \"Tickets schreiben\", \"Plan schreiben\", \"Spec in Tasks zerlegen\", \"implementation plan\", \"Backlog bauen\", \"Plan umsetzen\", \"Tasks ausführen\""
---

# plan — Kimi source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/methodik/plan/SKILL.md`

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
