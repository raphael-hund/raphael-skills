---
name: "handoff"
description: "Feuert für JEDE Übergabe — zwei Modi: (1) SESSION: vor jedem /clear und am Session-Ende einen Übergabe-Brief für die eigene nächste Session schreiben (PROGRESS.md/DECISIONS.md, Commit+Push, hartes /clear). (2) EXTERN: das Gespräch zu einem redigierten Übergabe-Dokument für eine andere Instanz, einen parallel contributors oder eine externe Person verdichten (Verweis statt Duplikat, Ablage im OS-Temp). Fakten statt Anweisungen, inkl. Fallen/Sackgassen und Secret-Redaktion. Trigger: \"handoff\", \"übergeben\", \"vor /clear\", \"Session beenden\", \"~300-400k Tokens erreicht\", \"Handoff für einen anderen Agenten\", \"an parallel contributors übergeben\", \"externe Übergabe\", \"handoff-ext\"."
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
