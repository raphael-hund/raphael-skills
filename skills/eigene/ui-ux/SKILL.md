---
name: ui-ux
version: 0.2.0
description: >
  Router auf die ui-ux-Linie in design. Feuert NUR bei explizitem "/ui-ux"
  oder "ui-ux-Linie". NICHT bei Website-Bau — das ist der web-Skill.
  Trigger: "/ui-ux", "ui-ux-Linie", "ui-ux-pro-max Suche".
class: R
scope: agency
sensitivity: internal
source: pointer — ui-ux-pro-max Offline-DB ist vendored im design-Skill
  (skills/design/vendor/ui-ux-db/ aus nextlevelbuilder/ui-ux-pro-max-skill @ 5c0946f, MIT)
loads: []
requires_skills: [design@^0]
completion_criteria:
  - "Anfrage als App/product-Register erkannt und an design/ui-ux-Linie weitergeleitet (keine eigenen Design-Regeln hier)"
  - "Offline-DB abgefragt (search.py --design-system, dann --domain) und Empfehlungen an den Projekt-Stack gebunden"
---

# ui-ux — Router auf die ui-ux-Linie in design

**Zweck (1 Satz):** Wegweiser. Methodik + Offline-DB leben in design.

## Routing

1. **design** laden (falls nicht schon durch `web` geschehen).
2. **ui-ux-Linie** wählen: `design/references/ui-ux-db-nutzung.md` +
   `design/references/design-doktrin.md`.
3. Offline-DB (absoluter Pfad, kein Netz):

```bash
python3 /root/raphael-skills/skills/design/vendor/ui-ux-db/scripts/search.py "<thema>" --design-system
```

Keine eigenen Regeln hier. Skill `ui-ux-pro-max` nicht extra laden.
