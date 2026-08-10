---
name: "read-book"
description: "Feuert, wenn ein Buch, PDF, EPUB oder ein längeres Dokument inhaltlich ausgewertet werden soll: extrahiert den Text 100 % lokal (pdftotext / ebook-convert), arbeitet Kapitel für Kapitel und liefert je Kapitel TL;DR, Konzepte, Zitate mit Seitenzahl, Action Items und Frameworks. Legt das Rohmaterial mit Präfix `resource-` in /root/raphael-brain/raw/ ab (inkl. Herkunftsbeleg) und die Verdichtung als Kandidat in wiki/_candidates/ — nie direkt ins Wiki. Keine externen API-Aufrufe. Trigger: \"lies das Buch\", \"PDF auswerten\", \"EPUB zusammenfassen\", \"Buchnotizen\", \"read-book\", \"was steht in diesem Buch\", \"Kapitelzusammenfassung\", \"Buch ins Brain\""
---

# read-book — Kimi source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/eigene/read-book/SKILL.md`

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
