---
name: "handoff-ext"
description: "Verdichtet das laufende Gespräch zu einem kompakten Übergabe-Dokument für eine andere Instanz, einen parallel contributors oder eine externe Person, die weiterarbeiten soll — mit Redaktion sensibler Daten und Verweis statt Duplikat auf bestehende Artefakte. Trigger: \"Handoff für einen anderen Agenten\", \"an parallel contributors übergeben\", \"externe Übergabe\", \"handoff-ext\"."
---

# handoff-ext — Codex source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/methodik/handoff-ext/SKILL.md`

The source skill is authoritative for safety, scope, procedure, and completion. Do not copy or paraphrase source content into this adapter.

Codex mapping:
- Claude/Cockpit = current Codex coordinator.
- Read/Bash = current file/terminal tools.
- AskUserQuestion = normale Userfrage.
- Never pretend that a missing tool exists.
- Create new or background threads only when the user explicitly requests them.
- Keep every source safety and completion requirement authoritative.
