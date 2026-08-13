---
name: ads-copy
version: 2.0.0
description: >
  Zeigt auf ads Teil Statics für Primary Text unter der Anzeige.
  Trigger: "Primary Text schreiben", "Ad-Text", "Anzeigentext",
  "Copy unter der Ad".
class: F
scope: agency
sensitivity: internal
loads:
  - ../ads/references/teil-statics.md
  - references/bauformen.md
loads_external: ["/root/.claude/forbidden.md"]
requires_skills: [ads@^2, copywriting]
completion_criteria:
  - "Teil Statics gelesen; Primary Text dort gebaut"
  - "copywriting/scripts/forbidden-check.py Exit 0"
  - "scripts/pruefen.py Exit 0"
---

# ads-copy → ads Teil Statics

Primary Text gehört zum Static-Brief.
Arbeit: `/root/raphael-skills/skills/eigene/ads/references/teil-statics.md`.
Längen-Check bleibt `scripts/pruefen.py`.
