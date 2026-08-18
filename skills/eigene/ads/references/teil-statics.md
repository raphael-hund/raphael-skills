# Teil Statics — Briefs, die ein Bild tragen

Ein Brief = ein Angle × ein Style (S1–S8). Kein Bild hier erzeugen.
Style wählen **bevor** Copy.

## Pflicht vor dem Schreiben

1. Lies `../../ads-statics/references/visual-styles.md` (S1–S8).
2. Lies `../../ads-statics/references/copy-bauformen.md`.
3. Ziehe echte Statics zum Segment:

```
python3 /root/raphael-skills/skills/eigene/ads/scripts/load-referenzen.py \
  --kind static --suche "<segment-wort>"
```

Ohne diese drei Schritte kein Brief. Das Wort Pflicht gilt hier wörtlich.

Layouts extra: `vendor/coreyhaines-ads/static-ad-templates-en.md`.
Schema: `../../ads-statics/references/brief-schema.md`.
Alle Pfade gelten von dieser Datei aus (`ads/references/`).

S1–S8 kurz: Text-only, Native-UI, Testimonial, Chat, Schild,
Story-Selfie, Device/Dashboard, Quiz/Map/Product.
Wähle einen Style aus der gelesenen Datei, nicht aus dem Gedächtnis.

## Holen

1. Angle aus Teil Research. Fehlt das Dossier: Angle aus Teil ICP plus User.
2. Ein Segment über `../scripts/load-wissen.py --skill ads --kunde <slug>`
3. Grounding-Quelle: Review, Winner-Ad, Kommentar oder VOC-Zitat

Ohne Grounding: kein Brief. Die Zelle steht nur als Zeile auf der
Material-Liste im Batch-Kopf. Nicht erfinden.

## Schreiben

Pro Brief:

- Angle + woher er kommt
- Style S1–S8 + Format (Style steht fest, dann Onscreen-Copy).
  Format-Default: 9:16 anlegen, Kern im zentrierten 1:1 (Safe-Zone)
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

Ein Brief, ein Angle, ein Style. Keine Stil-Mischung in einer Karte.

## Check vor Abgabe

- visual-styles.md gelesen (Pflicht)
- copy-bauformen.md gelesen (Pflicht)
- `load-referenzen.py --kind static --suche` gelaufen
- Style-ID S1–S8 steht im Brief
- forbidden-check Exit 0
- kein Bild in diesem Teil erzeugen
