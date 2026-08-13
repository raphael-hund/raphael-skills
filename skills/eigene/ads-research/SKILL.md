---
name: ads-research
version: 2.0.0
description: >
  Zeigt auf ads Teil Research. Angle-Dossier mit Beleg.
  Trigger: "Angle-Dossier", "Ads-Recherche", "Konkurrenz-Ads ziehen",
  "Ad Library", "Marktscan Ads".
class: F
scope: agency
sensitivity: internal
loads:
  - ../ads/references/teil-research.md
loads_external: ["/root/.claude/forbidden.md"]
requires_skills: [ads@^2]
completion_criteria:
  - "Teil Research in ads/references/teil-research.md gelesen und befolgt"
  - "Dossier hat Segment, Pains mit Zitat, Angles mit Zitat"
---

# ads-research → ads Teil Research

Arbeit steht in `/root/raphael-skills/skills/eigene/ads/SKILL.md`
dann `references/teil-research.md`.
Ad Library Code 10 stoppt nicht.
