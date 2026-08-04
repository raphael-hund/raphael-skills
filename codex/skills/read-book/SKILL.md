---
name: "read-book"
description: "Feuert, wenn ein Buch, PDF, EPUB oder ein längeres Dokument inhaltlich ausgewertet werden soll: extrahiert den Text 100 % lokal (pdftotext / ebook-convert), arbeitet Kapitel für Kapitel und liefert je Kapitel TL;DR, Konzepte, Zitate mit Seitenzahl, Action Items und Frameworks. Legt das Rohmaterial mit Präfix `resource-` in /root/raphael-brain/raw/ ab (inkl. Herkunftsbeleg) und die Verdichtung als Kandidat in wiki/_candidates/ — nie direkt ins Wiki. Keine externen API-Aufrufe. Trigger: \"lies das Buch\", \"PDF auswerten\", \"EPUB zusammenfassen\", \"Buchnotizen\", \"read-book\", \"was steht in diesem Buch\", \"Kapitelzusammenfassung\", \"Buch ins Brain\"."
---

# read-book — Codex source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/eigene/read-book/SKILL.md`

The source skill is authoritative for safety, scope, procedure, and completion. Do not copy or paraphrase source content into this adapter.

Codex mapping:
- Claude/Cockpit = current Codex coordinator.
- Read/Bash = current file/terminal tools.
- AskUserQuestion = normale Userfrage.
- Never pretend that a missing tool exists.
- Create new or background threads only when the user explicitly requests them.
- Keep every source safety and completion requirement authoritative.
