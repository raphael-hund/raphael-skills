# Teil Statics — Briefs, die ein Bild tragen

Ein Brief = ein Angle × ein Visual-Style. Kein Bild hier erzeugen.

Tiefe bei Bedarf:
`visual-styles` und `copy-bauformen` und `brief-schema` unter
`../ads-statics/references/`.
Layouts: `vendor/coreyhaines-ads/static-ad-templates-en.md`.

## Holen

1. Angle aus Teil Research. Fehlt das Dossier: Angle aus Teil ICP plus User.
2. Ein Segment über `../scripts/load-wissen.py --skill ads --kunde <slug>`
3. Grounding-Quelle: Review, Winner-Ad, Kommentar oder VOC-Zitat

Ohne Grounding: Zelle auf Material-Liste. Nicht erfinden.

## Schreiben

Pro Brief:

- Angle + woher er kommt
- Visual Style + Format
- Onscreen-Copy (kurz, nicht der ganze Primary Text)
- Primary Text (kurze Absätze, höchstens ein Gedankenstrich)
- Bild-Beschreibung so konkret, dass jemand ohne Rückfrage bauen kann
- Grounding-Quelle
- Status: sofort oder wartet auf Material

Primary Text: erster Absatz trägt allein (Meta schneidet früh).
Eine Zahl mit Quelle. CTA ist ein Satz.

## Gate

```
python3 /root/raphael-skills/skills/eigene/copywriting/scripts/forbidden-check.py <brief.md>
```

Welle braucht vor Produktion eine Stopp-Regel (Metrik + Mindestlaufzeit).

## Bild

Verweis an Skill `higgsfield` (`/higgsfield`). Beweis-Kontexte nie KI-generiert.
