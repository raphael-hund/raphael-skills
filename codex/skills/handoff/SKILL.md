---
name: "handoff"
description: "Feuert vor jedem /clear und am Session-Ende: schreibt einen Übergabe-Brief, damit die nächste Session ohne Verlust weiterarbeitet. Fakten statt Anweisungen (State, not instructions), inkl. Fallen/Sackgassen-Sektion und Secret-Redaktion. Trigger: \"handoff\", \"übergeben\", \"vor /clear\", \"Session beenden\", \"~300-400k Tokens erreicht\"."
---

# handoff — Codex source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/eigene/handoff/SKILL.md`

The source skill is authoritative for safety, scope, procedure, and completion. Do not copy or paraphrase source content into this adapter.

Codex mapping:
- Claude/Cockpit = current Codex coordinator.
- Read/Bash = current file/terminal tools.
- AskUserQuestion = normale Userfrage.
- Never pretend that a missing tool exists.
- Create new or background threads only when the user explicitly requests them.
- Keep every source safety and completion requirement authoritative.
