---
name: "no-ai-slop"
description: "Router auf copywriting G1→G2. Feuert NUR bei explizitem /no-ai-slop. NICHT bei Website-Bau. Trigger: \"/no-ai-slop\"."
---

# no-ai-slop — Codex source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/eigene/no-ai-slop/SKILL.md`

The source skill is authoritative for safety, scope, procedure, and completion. Do not copy or paraphrase source content into this adapter.

Codex mapping:
- Claude/Cockpit = current Codex coordinator.
- Read/Bash = current file/terminal tools.
- AskUserQuestion = normale Userfrage.
- Never pretend that a missing tool exists.
- Create new or background threads only when the user explicitly requests them.
- Keep every source safety and completion requirement authoritative.
