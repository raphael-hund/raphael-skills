---
name: "plan"
description: "Verwandelt eine freigegebene Spec in einen bissgroßen Umsetzungsplan mit exakten Dateipfaden, vollständigem Code je Schritt und TDD-Zyklus — für einen Umsetzer, der die Codebasis nicht kennt. Jeder Schritt endet an einem Verify-Kommando, jeder Plan trägt einen Drift-Check und explizite STOP-Bedingungen statt Freestyle bei Unstimmigkeiten. Trigger: \"Umsetzungsplan\", \"Plan schreiben\", \"Spec in Tasks zerlegen\", \"implementation plan\""
---

# plan — Codex source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/methodik/plan/SKILL.md`

The source skill is authoritative for safety, scope, procedure, and completion. Do not copy or paraphrase source content into this adapter.

Codex mapping:
- Claude/Cockpit = current Codex coordinator.
- Read/Bash = current file/terminal tools.
- AskUserQuestion = normale Userfrage.
- Never pretend that a missing tool exists.
- Create new or background threads only when the user explicitly requests them.
- Keep every source safety and completion requirement authoritative.
