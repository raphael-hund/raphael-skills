---
name: "raphael-writing-skills"
description: "Beschreibt, wie in diesem Repo neue Skills geschrieben werden: Vorhersagbarkeit als Leitprinzip, Informationshierarchie (Frontmatter → SKILL.md-Schritte → references/), unser Pflicht-Frontmatter-Schema und wann validate-skill.py grün sein muss. Ergänzt um die TDD-Testdisziplin aus superpowers, die zwei Skill-Archetypen (Capability- vs. Process-Primitive) und eine Sicherheits-/Qualitäts-Checkliste für jedes vendorierte Fremd-Skill. Trigger: \"neuen Skill schreiben\", \"SKILL.md anlegen\", \"Skill überarbeiten\", \"Skill erstellen\", \"Frontmatter-Schema\", \"Fremd-Skill vendorieren\""
---

# raphael-writing-skills — Kimi source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/methodik/writing-skills/SKILL.md`

The canonical source is authoritative for safety, scope, procedure, and completion. Do not copy or paraphrase it into this adapter.

Compatibility mapping:
- Claude/Cockpit in the source means the current Kimi coordinator.
- `AskUserQuestion` → the surfaced Kimi `AskUserQuestion` capability.
- `TodoList` → the surfaced Kimi `TodoList` capability.
- `Agent` → the surfaced Kimi `Agent` capability.
- `AgentSwarm` → the surfaced Kimi `AgentSwarm` capability.
- `Read` → the surfaced Kimi `Read` capability.
- `Write` → the surfaced Kimi `Write` capability.
- `Edit` → the surfaced Kimi `Edit` capability.
- `Bash` → the surfaced Kimi `Bash` capability.
- `Grep` → the surfaced Kimi `Grep` capability.
- `Glob` → the surfaced Kimi `Glob` capability.
- `FetchURL` → the surfaced Kimi `FetchURL` capability.
- `WebSearch` → the surfaced Kimi `WebSearch` capability.
- `Skill` → the surfaced Kimi `Skill` capability.
Use a capability only when the current Kimi host actually surfaces it; never invent an unavailable tool or silently substitute another one. Keep every source safety and completion requirement authoritative.

Shared absolute dependency map (shared paths; not platform-specific):
- For canonical Raphael source skills, use /root/raphael-skills/tools/validate-skill.py and the repository frontmatter contract. For a Kimi directory skill, SKILL.md frontmatter contains exactly name and description; Kimi does not require agents/openai.yaml.
- The pinned upstream Superpowers writing guide is /root/tools/vendor/superpowers/skills/writing-skills/SKILL.md; preserve it instead of copying it into this adapter.
