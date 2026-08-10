---
name: "skill-update"
description: "Nimmt einen einzelnen Lernpunkt (\"das hätte anders laufen sollen\") und trägt ihn in ALLE betroffenen bestehenden Skills nach — statt ihn in einem Skill zu vergraben oder als neuen Skill anzulegen. Zwingt den Lernpunkt zuerst in eine Pflichtform, sucht dann dreistufig über das Skill-Repo, unterscheidet Skill-Regel von Prinzip und legt jede Datei einzeln zur Freigabe vor. Trigger: \"Skill anpassen\", \"Lernpunkt einarbeiten\", \"das soll der Skill künftig anders machen\", \"Skills nachziehen\", \"skill-update\""
---

# skill-update — Kimi source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/methodik/skill-update/SKILL.md`

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
