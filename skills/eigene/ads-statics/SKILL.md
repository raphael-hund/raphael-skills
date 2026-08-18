---
name: ads-statics
version: 2.5.0
description: >
  Zeigt auf ads Teil Statics. Angle mal Visual-Style-Briefs, acht Styles S1–S8.
  Hook-, Callout- und Angle-Formeln plus kuratierter Referenz-Index liegen als
  Pflicht-Lesen in references/. Copy ist ganze Sätze, Hook UND Deal in einer Ad.
  Trigger: "Statics bauen", "Static-Briefs", "Bildanzeigen",
  "Testwelle Statics", "S1-S8". Bild danach: Skill higgsfield.
class: F
scope: agency
sensitivity: internal
loads:
  - ../ads/references/teil-statics.md
  - references/copy-formeln.md
  - references/referenz-statics-index.md
  - references/visual-styles.md
  - references/copy-bauformen.md
loads_external: ["/root/.claude/forbidden.md"]
requires_skills: [ads@^2]
completion_criteria:
  - "Teil Statics in ads/references/teil-statics.md gelesen und befolgt"
  - "copy-formeln.md und referenz-statics-index.md gelesen; Hook-, Callout- und Angle-ID stehen im Brief"
  - "Jede Onscreen-Zeile ist ein ganzer Satz; Hook UND Deal stehen auf der Ad"
  - "copywriting/scripts/forbidden-check.py auf jedem Brief Exit 0"
---

# ads-statics → ads Teil Statics

Arbeit steht in `/root/raphael-skills/skills/eigene/ads/SKILL.md`
dann `references/teil-statics.md`.

Drei Pflicht-Referenzen liegen hier:

- `references/copy-formeln.md` — Hook F01–F12, Callout C01–C06, Angle A01–A08.
- `references/referenz-statics-index.md` — kuratierte Gewinner-Statics, kategorisiert,
  mit Onscreen-Wortlaut und warum sie tragen. Vor jedem Brief den gewählten Angle lesen.
- `references/visual-styles.md` — die acht Rahmen S1–S8.

Der Skill lernt aus den Referenzen. Er schreibt nicht aus dem Gedächtnis.
