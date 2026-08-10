---
name: "orchestrate-gauntlet"
description: "Der Maximal-Modus von orchestrate: ein Werkstück wird gegen eine inspizierbare Messlatte gebaut, bis der Abstand klein ist — als gezeichneter Graph, mit überlappender Cross-Family-Besetzung (high-judgment model, Luna, Sol, Terra, fast model, Grok auf max; Kimi K3 auf high; review model bewusst auf low/medium) plus zwei festen Tandems — Sol+high-judgment model fürs Urteil, Kimi+review model als austauschbares Denk-Paar — und einem Kritiker, der NIE aus der Familie des Builders kommt. Läuft als Dauerlauf über Stunden: Welle für Welle, immer wieder neu, bis die Zugewinne klein sind. Trigger: \"/orchestrate-gauntlet\", \"Gauntlet\", \"Gauntlet-Loop\", \"gegen eine Messlatte bauen\", \"bis es richtig gut ist\", \"so krass wie möglich\", \"maximaler Modus\", \"alle Modelle drauf\", \"lauf über Nacht\", \"Dauerlauf\""
---

# orchestrate-gauntlet — Kimi source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/eigene/orchestrate-gauntlet/SKILL.md`

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
