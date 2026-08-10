---
name: "printingpress"
description: "\"Druckt agent-native CLI + SKILL.md für API-only Services aus einem Prompt. Target: ads-research, seo, pipedrive, trello. Intake → Draft-Welle (1-3 Luna parallel) → G1 mechanical → G2 cross-family → _candidates/. Nutze NUR wenn Raphael explizit 'printingpress' oder 'CLI für X' sagt.\""
---

# printingpress — Codex source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/eigene/printingpress/SKILL.md`

The source skill is authoritative for safety, scope, procedure, and completion. Do not copy or paraphrase source content into this adapter.

Codex mapping:
- Claude/Cockpit = current Codex coordinator.
- Read/Bash = current file/terminal tools.
- AskUserQuestion = normale Userfrage.
- Never pretend that a missing tool exists.
- Create new or background threads only when the user explicitly requests them.
- Keep every source safety and completion requirement authoritative.
