---
name: "debug"
description: "Feuert bei jedem harten Bug, Testfehler oder unerwartetem Verhalten — BEVOR ein Fix vorgeschlagen wird. Disziplin: erst einen engen pass/fail-Loop bauen, dann Root Cause, dann Fix. Nach 3 Fehlversuchen wird die Architektur hinterfragt, nicht Fix Nr. 4 probiert. Trigger: \"debug\", \"diagnose\", \"warum schlägt der Test fehl\", \"geht nicht\", \"kaputt\", \"Regression\", \"langsam geworden\""
---

# debug — Codex source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/eigene/debug/SKILL.md`

The source skill is authoritative for safety, scope, procedure, and completion. Do not copy or paraphrase source content into this adapter.

Codex mapping:
- Claude/Cockpit = current Codex coordinator.
- Read/Bash = current file/terminal tools.
- AskUserQuestion = normale Userfrage.
- Never pretend that a missing tool exists.
- Create new or background threads only when the user explicitly requests them.
- Keep every source safety and completion requirement authoritative.
