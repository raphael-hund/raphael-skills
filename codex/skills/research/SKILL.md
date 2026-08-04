---
name: "research"
description: "Recherchiert eine Sachfrage gegen vertrauenswürdige Primärquellen (Docs, Source Code, Specs, First-Party-APIs) im Hintergrund und hält die Befunde als zitierte Markdown-Datei fest. Die Recherche-Frage selbst wird zuerst scharf formuliert (Ziel + Entscheidung, 3-6 Unterfragen, Quellenhierarchie) und vor Abschluss läuft eine Gap-Round-Selbstkritik. Trigger: \"recherchieren\", \"Doku nachschlagen\", \"API-Fakten sammeln\", \"Hintergrund-Recherche\"."
---

# research — Codex source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/methodik/research/SKILL.md`

The source skill is authoritative for safety, scope, procedure, and completion. Do not copy or paraphrase source content into this adapter.

Codex mapping:
- Claude/Cockpit = current Codex coordinator.
- Read/Bash = current file/terminal tools.
- AskUserQuestion = normale Userfrage.
- Never pretend that a missing tool exists.
- Create new or background threads only when the user explicitly requests them.
- Keep every source safety and completion requirement authoritative.
