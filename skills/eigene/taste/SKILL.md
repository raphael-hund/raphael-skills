---
name: taste
version: 0.2.0
description: >
  Router auf die taste-Linie in design. Feuert NUR bei explizitem "/taste"
  oder "taste-Linie". NICHT bei Website-/Landingpage-Bau — das ist der
  web-Skill (laedt design progressiv). Trigger: "/taste", "taste-Linie",
  "taste-Skill".
class: R
scope: agency
sensitivity: internal
source: pointer — taste-Kern ist vendored im design-Skill
  (skills/design/references/taste-kern.md aus Leonxlnx/taste-skill @ 7c397f2, MIT)
loads: []
requires_skills: [design@^0]
completion_criteria:
  - "Anfrage als Landing/brand-Register erkannt und an design/taste-Linie weitergeleitet (keine eigenen Design-Regeln hier)"
  - "design-Skill geladen und taste-Linie (taste-kern.md + design-doktrin.md) angewendet"
---

# taste — Router auf die taste-Linie in design

**Zweck (1 Satz):** Wegweiser. Die Methodik lebt in
`/root/raphael-skills/skills/design/references/taste-kern.md`.

## Routing

1. **design** laden (falls nicht schon durch `web` geschehen).
2. **taste-Linie** wählen: `design/references/taste-kern.md` +
   `design/references/design-doktrin.md`.
3. Design-Read (1 Zeile), dann taste-kern folgen.

Keine eigenen Regeln hier. Kein Extra-Load von `impeccable` oder
`design-taste-frontend`.
