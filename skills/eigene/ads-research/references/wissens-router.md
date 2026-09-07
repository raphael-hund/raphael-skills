# Wissens-Router — ads-research

Craft-Kern plus genau ein Markt-Segment. Pflicht im Skill. Brain optional.

## Craft-Kern

```bash
python3 /root/raphael-skills/skills/eigene/ads/scripts/load-wissen.py \
  --skill ads-research --kunde <slug>
```

Vor dem Dossier: `references/angle-dossier-schema.md`.
Ad-Library-Zweig: `references/api-referenz.md`.
Treffer auswerten: `references/skript-analyse.md`.

## Genau ein Markt-Segment

Reihenfolge:

1. Skill: `ads/references/maerkte/<segment>.md`
2. Optional Brain-approved, dann Brain-Kandidat

MAKE: `--kunde make` → `local-service-handwerk`.
Die anderen drei Segmente nicht laden.
Fehlt die Skill-Datei: FAIL. Fehlt nur das Wiki: weiter.

## Kunden-Onboarding

Zuerst `/root/clients/<slug>/wiki/`.
MAKE-Brain `wiki/company/` nur wenn vorhanden.
Fehlt beides: `kunden-layer: fehlt`, weiter mit öffentlichen Quellen.
