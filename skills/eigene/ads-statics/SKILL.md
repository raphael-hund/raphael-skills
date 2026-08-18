---
name: ads-statics
version: 2.1.0
description: >
  Zeigt auf ads Teil Statics. Angle mal Visual-Style-Briefs, acht Styles S1–S8.
  Trigger: "Statics bauen", "Static-Briefs", "Bildanzeigen",
  "Testwelle Statics", "S1-S8". Bild danach: Skill higgsfield.
class: F
scope: agency
sensitivity: internal
loads:
  - ../ads/references/teil-statics.md
loads_external: ["/root/.claude/forbidden.md"]
requires_skills: [ads@^2]
completion_criteria:
  - "Teil Statics in ads/references/teil-statics.md gelesen und befolgt"
  - "copywriting/scripts/forbidden-check.py auf jedem Brief Exit 0"
---

# ads-statics → ads Teil Statics

Arbeit steht in `/root/raphael-skills/skills/eigene/ads/SKILL.md`
dann `references/teil-statics.md`.
Styles und Copy liegen dort als Pflicht-Lesen, nicht hier.
