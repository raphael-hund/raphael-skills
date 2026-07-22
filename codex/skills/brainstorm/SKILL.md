---
name: "brainstorm"
description: "Verwandelt eine Idee durch geführten Dialog in eine geprüfte Design-Spec, bevor auch nur eine Zeile Code geschrieben wird. Fragt einzeln nach, schlägt 2-3 Ansätze mit Trade-offs vor, lässt die Spec vom Nutzer freigeben und übergibt danach an plan. Jeder Vorschlag braucht ein Zitat aus Codebase/Gespräch — generische Ideen ohne Beleg sind Rauschen, keine Option. Trigger: \"brainstorm\", \"Idee ausarbeiten\", \"Design-Spec\", \"bevor wir loslegen\", \"Anforderungen klären\""
---

# brainstorm — Codex source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/methodik/brainstorm/SKILL.md`

The source skill is authoritative for safety, scope, procedure, and completion. Do not copy or paraphrase source content into this adapter.

Codex mapping:
- Claude/Cockpit = current Codex coordinator.
- Read/Bash = current file/terminal tools.
- AskUserQuestion = normale Userfrage.
- Never pretend that a missing tool exists.
- Create new or background threads only when the user explicitly requests them.
- Keep every source safety and completion requirement authoritative.
