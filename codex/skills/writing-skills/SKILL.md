---
name: "writing-skills"
description: "Beschreibt, wie in diesem Repo neue Skills geschrieben werden: Vorhersagbarkeit als Leitprinzip, Informationshierarchie (Frontmatter → SKILL.md-Schritte → references/), unser Pflicht-Frontmatter-Schema und wann validate-skill.py grün sein muss. Ergänzt um die TDD-Testdisziplin aus superpowers, die zwei Skill-Archetypen (Capability- vs. Process-Primitive) und eine Sicherheits-/Qualitäts-Checkliste für jedes vendorierte Fremd-Skill. Trigger: \"neuen Skill schreiben\", \"SKILL.md anlegen\", \"Skill überarbeiten\", \"Skill erstellen\", \"Frontmatter-Schema\", \"Fremd-Skill vendorieren\""
---

# writing-skills — Codex source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/methodik/writing-skills/SKILL.md`

The source skill is authoritative for safety, scope, procedure, and completion. Do not copy or paraphrase source content into this adapter.

Codex mapping:
- Claude/Cockpit = current Codex coordinator.
- Read/Bash = current file/terminal tools.
- AskUserQuestion = normale Userfrage.
- Never pretend that a missing tool exists.
- Create new or background threads only when the user explicitly requests them.
- Keep every source safety and completion requirement authoritative.

Codex dependency map:
- For canonical Raphael source skills, use /root/raphael-skills/tools/validate-skill.py and the repository frontmatter contract. For a Codex adapter or plugin skill, use only name and description in SKILL.md frontmatter plus agents/openai.yaml, as required by the Codex skill creator.
- The pinned upstream Superpowers writing guide is /root/tools/vendor/superpowers/skills/writing-skills/SKILL.md; preserve it instead of copying it into this adapter.
