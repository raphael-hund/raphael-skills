---
name: "extract-approach"
description: "\"skillify this\" — feuert, wenn ein Arbeitsmuster zum ZWEITEN Mal auftaucht: extrahiert es als Skill-Kandidat nach _candidates/. Trigger: \"skillify this\", \"das haben wir schon mal so gemacht\", \"daraus einen Skill machen\"."
---

# extract-approach — Codex source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/eigene/extract-approach/SKILL.md`

The source skill is authoritative for safety, scope, procedure, and completion. Do not copy or paraphrase source content into this adapter.

Codex mapping:
- Claude/Cockpit = current Codex coordinator.
- Read/Bash = current file/terminal tools.
- AskUserQuestion = normale Userfrage.
- Never pretend that a missing tool exists.
- Create new or background threads only when the user explicitly requests them.
- Keep every source safety and completion requirement authoritative.
