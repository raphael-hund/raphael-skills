---
name: no-ai-slop
version: 0.2.0
description: >
  Router auf copywriting G1→G2. Feuert NUR bei explizitem "/no-ai-slop".
  NICHT bei Website-/Landingpage-Bau — web lädt copywriting, nicht diesen
  Skill. Trigger: "/no-ai-slop".
class: R
scope: agency
sensitivity: internal
source: pointer — Slop-Gates leben in copywriting (G1→G2)
loads: []
requires_skills: [copywriting@^0]
completion_criteria:
  - "Anfrage an copywriting G1→G2 weitergeleitet (keine eigenen Copy-Regeln hier)"
  - "Site-Build hat diesen Skill nicht extra geladen"
---

# no-ai-slop — Router auf copywriting

**Zweck (1 Satz):** Wegweiser. Die Gates leben in copywriting.

1. Skill **copywriting** laden (falls nicht schon durch `web` geschehen).
2. G0 `forbidden.md` → G1 → G2 dort fahren.
3. Keine eigenen Muster hier. `references/no-ai-slop-eval.md` nur wenn
   Raphael `/no-ai-slop` ausdrücklich will.
