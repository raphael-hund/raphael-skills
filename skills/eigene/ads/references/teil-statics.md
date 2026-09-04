# Teil Statics — Briefs, die ein Bild tragen

Ein Brief = ein Angle × ein Style (S1–S8) bei Dienstleistung und Angebot.
Bei Objektverkauf gilt der Abschnitt «Objektverkauf» unten: eine Botschaft, das Foto wechselt.
Bild erst nach Text und nach gezeigten Referenzen, über higgsfield, nie Pillow.
Style wählen **bevor** Copy.

## Pflicht vor dem Schreiben

0. Lies das eigene Lern-Register des Kunden, wenn vorhanden:
   `/root/clients/<slug>/ads/lern-register.md`. Eigene Resultate schlagen jede
   Markt-Referenz. Was dort als tot markiert ist, wird nicht wieder gebaut.
1. Lies `../../ads-statics/references/visual-styles.md` (S1–S8).
2. Lies `../../ads-statics/references/copy-formeln.md` (Hook F01–F12, Callout C01–C06, Angle A01–A08).
3. Lies `../../ads-statics/references/referenz-statics-index.md` **und die Angle-Datei
   des gewählten Angles** (`angles/a01-social-proof.md` bis `angles/a08-contrarian.md`)
   komplett. Die Copy-Bauform kommt aus einer namentlich genannten Referenz aus dieser
   Datei — ihr Name steht im Brief unter «Grounding-Quelle». Nicht aus dem Gedächtnis.
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
  Zwei Fragen muss ein Fremder in einer Sekunde beantworten können:
  «Was macht die Firma?» und «Was passiert, wenn ich klicke?»
  Referenzen: Name plus Zahl (Jannis), Callout plus Outcome (Marc Evers),
  Pain mit Ausweg (Kaschinski), dann erst Offer und CTA.
- ICP-Filter (Messaging-Regel): Die Ansprache muss so eng sein, dass sich nur der ICP
  angesprochen fühlt. Schwelle, Rolle, Ort oder eine Rechnung, die nur er kennt.
  Test: Würde ein 19-Jähriger ohne Betrieb die Ad lesen wollen, ist der Callout zu weit.
  Der Callout ist ein Element, kein Angle — er steuert WER bleibt, der Angle steuert WAS
  die Ad will (Proof, Problem, Outcome, Verlust, Vergleich, Mechanismus, Garantie, Haltung).
- Friction-Waage (Hormozi): Das Instant-Formular mit der Umsatzfrage ist gute Reibung,
  sie filtert. Lead-Qualität fällt → Reibung hoch (Zusatzfrage). Volumen fällt →
  Reibung runter. Nie die Ad opfern, wenn das Targeting schief ist.
- Kein Interpretationsspielraum (Evers): Ad plus Formular beantworten drei Fragen
  unmissverständlich: warum du, was das Angebot, was nach dem Eintrag passiert.
  Der CTA nennt den konkreten nächsten Schritt («wir melden uns in 24 Stunden»).
  Jeder falsche Eintrag vergiftet den Pixel. Meta holt mehr davon.

## Formular (die zweite Hälfte der Ad)

Das Instant-Formular gehört zum Brief, nicht erst zur Schaltung:

- **Qualifizierungsfrage zuerst** (bei MAKE: Umsatz-Schwelle). Wer rausfällt,
  kostet keinen Call.
- **Wenige Fragen, echte Reibung:** jede Frage muss filtern, nicht dekorieren.
  Pflichtfeld mit Tipp-Arbeit (kein Autofill) ist der stärkste Qualitäts-Hebel.
- **A-Leads zuerst:** Eintrag + Terminbuchung schlägt nur Eintrag. Wer einen Termin
  wählt, wird zuerst angerufen.
- **Follow-up unter 24 Stunden** nach Opt-in. Nicht nach drei Tagen.
- Ad-Versprechen und erste Formular-Frage nennen denselben Deal (Kongruenz).
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

## Objektverkauf (Raphael, 03.09.2026)

Verkauft der Kunde ein Objekt mit Preis (Immobilie, Neubau, Fahrzeug, Möbel), gibt es
keine Angle-Wahl. Die Karte ist: Produkt gross im Bild, drei bis fünf Fakten, Preis oder
Preisanker, Verknappung als kleines Element, ein Button. Alle Karten einer Welle tragen
dieselbe Botschaft, nur das Foto wechselt (Aussen, Innen, Drohne, Portal-Look).
Beleg: Foreplay-Langläufer Specht Cuxhaven 529 Tage, Blumenauer München 345 Tage,
BUWOG Havel Lichter 142 Tage, Haus Arbor 142 Tage (Sichtung 03.09.2026, Dossier
`/root/clients/ak-omega/ads/research/2026-09-03-angle-dossier-statics.md`).
Nicht auf die Karte: wer baut, seit wann, wie oft; Auswahl-Fragen; Lage-Dreiklänge;
alles, was der Käufer erst nach «Was ist das, was kostet es» wissen will.
Beispiel: `/root/clients/ak-omega/ads/statics/welle-1-umiken/TEXT-UND-IDEE.md`.

## Bild (Raphael, 03.09.2026 abends)

Text und Idee zuerst. Raphael sieht Logo, Look und Onscreen-Text. Dann Skill `higgsfield`,
Job `gpt_image_2`: `--image` Logo, `--image` Look (Website oder Winner-Ad), `--image`
Inhaltfoto. Prompt = JSON-Spec plus Text-Fidelity-Regel in `higgsfield/references/ops.md`
(Ads-Static). Logo compositen, nie neu zeichnen. Pillow-Overlay auf Copy und Logo ist Fail.
Beweis-Kontexte (Screens, Cases, echte Gesichter) nie KI-generiert.

Ein Brief, ein Style. Ein Angle bei Dienstleistung, eine Botschaft bei Objektverkauf. Keine Stil-Mischung in einer Karte.

## Check vor Abgabe

- visual-styles.md gelesen (Pflicht)
- Lern-Register des Kunden gelesen (Pflicht, wenn vorhanden): keine als tot markierte Bauform erneut
- copy-formeln.md gelesen (Pflicht): Hook-ID, Callout-ID und Angle-ID stehen im Brief (entfällt bei Objektverkauf)
- referenz-statics-index.md + die Angle-Datei des gewählten Angles gelesen (Pflicht):
  Copy-Bauform aus einer namentlich genannten Referenz abgeleitet, Referenz-Name im Brief
- `load-referenzen.py --kind static --suche` gelaufen
- Style-ID S1–S8 steht im Brief
- Jede Onscreen-Zeile ist ein ganzer Satz (Subjekt + Verb), kein Telegramm
- Handy-Test: ein Fremder versteht in einer Sekunde, was die Firma tut und was der Klick bringt
- Instant-Formular: Hook UND Deal in einer Ad — Hook first, danach der Klick-Grund in einem Satz
- Weder Feature-Opener noch Hook ohne Klick-Grund
- ICP-Filter: nur der ICP fühlt sich angesprochen (Schwelle, Rolle, Ort oder ICP-Rechnung)
- keine interne Zählung auf dem Bild
- forbidden-check Exit 0
- Bild über higgsfield gpt_image_2 mit Logo, Look, Text-Spec; Pillow-Overlay Fail
