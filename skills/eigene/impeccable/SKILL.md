---
name: impeccable
version: 0.2.0
description: >
  Router auf Kommandosprache + Craft-Floor in design. Feuert NUR bei
  explizitem "/impeccable" oder einem namentlichen Kommando (audit, polish,
  bolder, quieter, distill, live). NICHT bei Website-/Landingpage-Bau —
  das ist web + design. Trigger: "/impeccable", "impeccable audit",
  "impeccable polish".
class: F
scope: agency
sensitivity: internal
source: vendored — pbakaus/impeccable v4.0.1 @ bdaa5a4 (Apache-2.0), destilliert
  auf die Kommando-Sprache + Craft-Floor; CLI/Setup/Hooks/PRODUCT.md-Flow
  NICHT übernommen (siehe VENDORING.md im design-Skill)
loads:
  - references/craft-floor-de.md
  - references/commands-de.md
requires_skills: []
completion_criteria:
  - "Jede Design-Änderung endet mit craft-floor-Check (Kontrast, Tiefe, Spacing, Typo, Motion, States, Copy, Coverage) — alle 8 grün"
  - "Jede kritisierte/auditierte Fläche hat benannten Modus (Persuade/Operate/Read/Experience) + benanntes Register (brand/product)"
  - "Finale QA läuft über die deterministischen Detektoren im design-Skill (Exit 0) — impeccable ersetzt das nicht"
---

# impeccable — Router auf design

**Zweck (1 Satz):** Kommando-Vokabular + Craft-Floor. Doktrin und Detektoren
leben in design.

## Routing

1. Register + Modus benennen (brand/product · Persuade/Operate/Read/Experience).
2. Kommando aus `references/commands-de.md` wählen.
3. Vor dem Edit: `references/craft-floor-de.md`.
4. Finale QA nur über design:

```bash
node /root/raphael-skills/skills/design/scripts/detect.mjs <dateien>
```

Keine eigene Doktrin hier. Site-Build lädt diesen Skill nicht.
