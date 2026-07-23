---
name: "impeccable"
description: "Feuert bei Frontend-Design-Arbeit, die über \"funktioniert\" hinausgehen soll: Design bauen, redesignen, kritisieren, auditieren, polieren, vereinfachen, härtener, animieren, kolorieren, typographieren, layouten, begeistern, klären, anpassen, optimieren — oder bei der Frage \"sieht das nach AI aus?\" / \"mach es bolder/quieter\". Liefert die Kommando-Sprache (23 Befehle wie `audit`, `critique`, `polish`, `bolder`, `quieter`, `distill`, `animate`, `colorize`, `typeset`, `layout`, `delight`, `clarify`, `harden`, `adapt`, `optimize`) und den Craft-Floor (Qualitäts-Mindeststandard) für Web-UI. Der design-Skill bleibt die kanonische Wissensquelle; impeccable ist die Arbeits- und QA-Sprache. Trigger: \"Design review\", \"UI audit\", \"polish this\", \"make it bolder\", \"landing page critique\", \"sieht nach AI aus\", \"Slop check\", \"Design verbessern\", \"animate this\", \"typography fix\""
---

# impeccable — Kimi source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/eigene/impeccable/SKILL.md`

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
