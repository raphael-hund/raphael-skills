---
name: "last30days"
description: "Recherchiert, was Leute in den letzten 30 Tagen wirklich über ein Thema sagen — Posts und Engagement aus Reddit, X, YouTube, TikTok, Hacker News, Polymarket, GitHub und dem Web, inkl. doctor-Health-Check. Vendored aus last30days-skill (mvanhorn). VORAUSSETZUNG: SCRAPECREATORS_API_KEY (ohne Key laufen nur keyless/degradierte Quellen). Trigger: \"last30days\", \"was sagen Leute über\", \"Trend-/Ad-Library-Scan\", \"Recency-Recherche\""
---

# last30days — Kimi source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/imported/last30days/SKILL.md`

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
