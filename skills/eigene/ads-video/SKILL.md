---
name: ads-video
version: 2.1.0
description: >
  Zeigt auf ads Teil Video. Video-Ad-Skripte, gesprochener Sprechtext,
  Formate Talking Head, B-Roll, Green Screen, Skit, Split Screen.
  Trigger: "Video-Skript schreiben", "Ad-Skript", "Ads Scripts",
  "Drehbuch für Ads", "Hook-Varianten fürs Video", "Video-Formate".
class: F
scope: agency
sensitivity: internal
loads:
  - ../ads/references/teil-video.md
loads_external: ["/root/.claude/forbidden.md"]
requires_skills: [ads@^2]
completion_criteria:
  - "Teil Video in ads/references/teil-video.md gelesen und befolgt"
  - "copywriting/scripts/forbidden-check.py auf dem Skript Exit 0"
---

# ads-video → ads Teil Video

Dieser Skill ist ein Eingang. Die Arbeit steht in einem Skill:

`/root/raphael-skills/skills/eigene/ads/SKILL.md`

Dann nur `references/teil-video.md`.
Kein Second Brain nötig. Formate stehen in der Tiefe, nicht hier.
