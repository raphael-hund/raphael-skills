---
name: "eval"
description: "Feuert für Qualitäts-Gates und Bewertung: eval-run (G1→G2), Judge-Panel, rubric-author. Jeder Ship-Output läuft hier durch. Ein Worker behauptet nie selbst \"fertig\" — eine andere Instanz verifiziert per striktem Verdikt-Vertrag, jede Einstufung braucht einen konkreten Beleg statt einer Vermutung. Trigger: \"evaluieren\", \"Gate fahren\", \"Judge\", \"Rubrik schreiben\", \"QA-Score\""
---

# eval — Codex source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/eigene/eval/SKILL.md`

The source skill is authoritative for safety, scope, procedure, and completion. Do not copy or paraphrase source content into this adapter.

Codex mapping:
- Claude/Cockpit = current Codex coordinator.
- Read/Bash = current file/terminal tools.
- AskUserQuestion = normale Userfrage.
- Never pretend that a missing tool exists.
- Create new or background threads only when the user explicitly requests them.
- Keep every source safety and completion requirement authoritative.
