---
name: "codex-first"
description: "Delegiert ein Arbeitspaket an die Codex-CLI (GPT-5.6, Weg 2, non-interaktiv) und lässt Codex coordinator das Ergebnis als strenger Reviewer abnehmen. Billig/anders bauen (Codex), teuer prüfen (Codex coordinator), Merge behält Codex coordinator. Trigger: \"/codex-first\", \"an Codex geben\", \"von GPT bauen lassen\", \"codex exec\", \"Cross-Vendor-Bau\"."
---

# codex-first — Codex source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/eigene/codex-first/SKILL.md`

The source skill is authoritative for safety, scope, procedure, and completion. Do not copy or paraphrase source content into this adapter.

Codex mapping:
- Claude/Cockpit = current Codex coordinator.
- Read/Bash = current file/terminal tools.
- AskUserQuestion = normale Userfrage.
- Never pretend that a missing tool exists.
- Create new or background threads only when the user explicitly requests them.
- Keep every source safety and completion requirement authoritative.
