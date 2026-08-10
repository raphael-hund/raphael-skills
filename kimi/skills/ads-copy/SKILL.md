---
name: "ads-copy"
description: "Feuert für den Primary Text einer Meta-Ad — den Fliesstext über/unter dem Creative, plus Headline und Description. Baut ihn nach gemessenen Mustern aus 105 echten Ads von 10 Werbetreibenden (Marc Evers, Speedscaling, SEOLabs, Neuhaus Digital, Pascal Harting, Dr. Matt Shiver, Charlie Morgan, Ben Heath, Enpal, Tim Krasenbrink) statt aus dem Gefühl. Trigger: \"Primary Text schreiben\", \"Ad-Text\", \"Anzeigentext\", \"Copy unter der Ad\", \"Text zur Anzeige\", \"Ad Copy\""
---

# ads-copy — Kimi source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/eigene/ads-copy/SKILL.md`

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
