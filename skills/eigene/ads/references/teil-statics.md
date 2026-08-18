# Teil Statics — Briefs, die ein Bild tragen

Ein Brief = ein Angle × ein Style (S1–S8). Kein Bild hier erzeugen.
Style wählen **bevor** Copy.

## Pflicht vor dem Schreiben

1. Lies `../../ads-statics/references/visual-styles.md` (S1–S8).
2. Lies `../../ads-statics/references/copy-formeln.md` (Hook F01–F12, Callout C01–C06, Angle A01–A08).
3. Lies `../../ads-statics/references/referenz-statics-index.md` und dort mindestens die
   Statics des gewählten Angles. Notiere die Copy-Bauform daraus. Nicht aus dem Gedächtnis.
4. Ziehe echte Statics zum Segment:

```
python3 /root/raphael-skills/skills/eigene/ads/scripts/load-referenzen.py \
  --kind static --suche "<segment-wort>"
```

Ohne diese Schritte kein Brief. Das Wort Pflicht gilt hier wörtlich.

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
- Onscreen-Copy: ganze Sätze, die ein Fremder in einer Sekunde auf dem Handy versteht.
  Resultat in Franken oder Platz, plus wer. Kein internes Wissen
  (keine Listen-Quote, kein CRM-Bruch, kein «13 von 87»).
  Jede Zeile hat Subjekt und Verb. Kein Telegramm («Platz 1 / 30 Tage / kein Rappen» ist tot).
  Raphaels eigene Ads sind Material, nie die einzige Vorlage.
- Instant-Formular — Hook UND Deal in einer Ad (die eine Regel):
  Hook zuerst (Ergebnis, Callout oder Schmerz). Nie «Wir bauen …» als Opener.
  **Direkt danach steht, was der Klick bringt** — in einem Satz:
  neue Website inkl. Fotoshooting, Platz 1 in 30 Tagen, schriftlich, «Jetzt bewerben».
  Es gibt keine Landingpage nach dem Klick. Wer den Deal nicht auf der Ad sieht,
  weiss nicht, wofür «Jetzt bewerben» gilt.
  Beide Fehler sind rot: Feature-Opener ohne Hook. UND Hook ohne Klick-Grund.
  Referenzen: Name plus Zahl (Jannis), Callout plus Outcome (Marc Evers),
  Pain mit Ausweg (Kaschinski), dann erst Offer und CTA.
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
- copy-formeln.md gelesen (Pflicht): Hook-ID, Callout-ID und Angle-ID stehen im Brief
- referenz-statics-index.md gelesen (Pflicht): Copy-Bauform aus dem gewählten Angle abgeleitet
- `load-referenzen.py --kind static --suche` gelaufen
- Style-ID S1–S8 steht im Brief
- Jede Onscreen-Zeile ist ein ganzer Satz (Subjekt + Verb), kein Telegramm
- Handy-Test: ein Fremder versteht die Headline in einer Sekunde
- Instant-Formular: Hook UND Deal in einer Ad — Hook first, danach der Klick-Grund in einem Satz
- Weder Feature-Opener noch Hook ohne Klick-Grund
- keine interne Zählung auf dem Bild
- forbidden-check Exit 0
- kein Bild in diesem Teil erzeugen
