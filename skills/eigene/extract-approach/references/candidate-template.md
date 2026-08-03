# Skill-Kandidat — Template (_candidates/)

Ablage: `/root/raphael-skills/skills/_candidates/<name>/SKILL.md`. Status bleibt Kandidat,
bis Raphael promotet.

Verbindlich ist das Pflicht-Schema in
[`writing-skills`](/root/raphael-skills/skills/methodik/writing-skills/SKILL.md#frontmatter-schema-pflicht-für-jeden-skill)
— unten nur die Kandidaten-Abweichungen (`version: 0.0.1`, Ablage in `_candidates/`).

```yaml
---
name: r-<name>            # r-Präfix, noch nicht final vergeben
version: 0.0.1            # Kandidat
description: >            # WANN würde der Skill feuern
  <präziser Trigger>
class: <R|M|F|O|E|W|G>
scope: agency            # oder client:<slug> / project:<slug>
sensitivity: internal
status: candidate        # <-- markiert: nicht aktiv
loads: []
requires_skills: []
completion_criteria:
  - <prüfbare Fertig-Tatsache>
---
```

## Pflicht-Abschnitte im Kandidaten

- **Herkunft:** die 2 konkreten Wiederholungen (Session/Repo/Datum) — Beweis, dass echter
  Bedarf bestand.
- **Lies zuerst:** relevante Brain-Pfade.
- **Ablauf:** das extrahierte WIE, Schritt für Schritt.
- **Gotchas:** was beim 1./2. Mal schiefging (der wertvollste Teil).

## Promotion-Weg (nur Raphael)
Kandidat → Inbox-Notiz → Review → bei OK: r-Präfix final, `status` raus, Version 0.1.0,
Move nach `skills/eigene/` (oder passende Kategorie), Signatur.
