---
name: "skill-update"
description: "Nimmt einen einzelnen Lernpunkt (\"das hätte anders laufen sollen\") und trägt ihn in ALLE betroffenen bestehenden Skills nach — statt ihn in einem Skill zu vergraben oder als neuen Skill anzulegen. Zwingt den Lernpunkt zuerst in eine Pflichtform, sucht dann dreistufig über das Skill-Repo, unterscheidet Skill-Regel von Prinzip und legt jede Datei einzeln zur Freigabe vor. Trigger: \"Skill anpassen\", \"Lernpunkt einarbeiten\", \"das soll der Skill künftig anders machen\", \"Skills nachziehen\", \"skill-update\"."
---

# skill-update — Codex source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/methodik/skill-update/SKILL.md`

The source skill is authoritative for safety, scope, procedure, and completion. Do not copy or paraphrase source content into this adapter.

Codex mapping:
- Claude/Cockpit = current Codex coordinator.
- Read/Bash = current file/terminal tools.
- AskUserQuestion = normale Userfrage.
- Never pretend that a missing tool exists.
- Create new or background threads only when the user explicitly requests them.
- Keep every source safety and completion requirement authoritative.
