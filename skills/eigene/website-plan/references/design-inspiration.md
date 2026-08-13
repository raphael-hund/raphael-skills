# Design-Inspiration → GPT-Prompt-Pakete

Diese Referenz ist der **Single Source of Truth** für die Phase zwischen
Section-Specs und `G-DESIGN`. Ziel ist kein Link-Dump, sondern eine prüfbare
Kette:

`Richtungshypothese → reale Fundstelle → lokaler Capture → abstrahiertes Muster → GPT-Prompt → Vergleichsbild`

## 1. Drei Suchhypothesen vor der Recherche

Für A/B/C zuerst je eine strukturell andere Hypothese notieren:

| Feld | Inhalt |
|---|---|
| Markenwirkung | Was soll die Richtung ausstrahlen? |
| Layoutmodell | Welche räumliche Logik unterscheidet sie? |
| Bildsprache | Foto, Illustration, UI, Materialität |
| Typo/Oberfläche | Dichte, Kontrast, Flächen, Linien, Ecken |
| Motion | Beobachtetes oder geplantes Prinzip; Screenshot ist kein Motion-Beleg |
| offene Designfrage | Wonach wird gezielt gesucht? |

Mindestens drei Achsen unterscheiden sich zwischen A/B/C. Eine reine
Farbvariation ist keine eigene Richtung.

## 2. Reale Inspiration erfassen

1. Repo-Components, Brand-Boards, Asset-Inventar und User-Referenzen zuerst.
2. Mobbin nutzen, wenn der Connector im laufenden Host exponiert ist. Sonst reale
   Websites über Browser/Web-Recherche nutzen und `Mobbin: nicht verfügbar`
   dokumentieren. Zugriff nie behaupten, wenn nur eine Konfiguration existiert.
3. Pro Richtung **2–3 Referenzregionen** suchen:
   - 1 primär für Komposition;
   - 1 sekundär für Bild-/Materialsprache;
   - optional 1 für Typorhythmus oder Interaktionszustand.
4. Die relevante Region capturen (Hero, Proof-Band, Prozess, CTA, Navigation),
   nicht nur eine unlesbare Full-Page-Miniatur.
5. Captures lokal unter `$OUT/09-mockups/references/` speichern. Externe
   Screenshots sind Planungsreferenzen; sie werden nicht zu Kundenassets.

Dateiname:

```text
REF-A-01__domain__region__1440x900__YYYY-MM-DD.png
```

## 3. Referenz-Manifest

`$OUT/09-mockups/reference-manifest.md` erklärt die Kuratierung. Zusätzlich ist
`reference-manifest.tsv` der maschinenlesbare Gate-Vertrag mit exakt diesen
Spalten:

```tsv
id\tdirection\tsource_url\tcaptured_at\tfile\tviewport\tregion\tpattern_take\tdo_not_copy\tmodel_role\tsuitability
```

Pro Capture gelten folgende Werte:

```yaml
- id: REF-A-01
  source_url: "https://example.com/page"
  page_title: "Example"
  captured_at: "YYYY-MM-DD"
  file: "/ABS/OUT/09-mockups/references/REF-A-01__example__hero__1440x900__YYYY-MM-DD.png"
  viewport: "1440x900 @1x"
  region: "Homepage > Hero"
  pattern_take: "abstrahiertes, übertragbares Kompositionsmuster"
  do_not_copy: "Logo, Copy, Originalassets, exakte Farben/Typo/Pixelgeometrie"
  suitability: { A: 2, B: 0, C: 1 }
  model_role: "primary-composition"
  usage: "planning-reference-only"
```

Skala: `0` nicht nutzen · `1` unterstützend · `2` primär. Jede verwendete
Referenz hat genau **eine** primäre Modellrolle. Eine Primärreferenz gehört nur
einer Richtung.

## 4. Drei eigenständige GPT-Prompt-Pakete

`$OUT/09-mockups/gpt-prompts.md` enthält genau drei einzeln kopierbare Blöcke
A/B/C. Jeder Block ist ohne Begleitgespräch ausführbar und enthält:

```text
AUFGABE
Erzeuge genau EINE horizontale Website-Sektion als implementation-friendly
Konzept-Mockup, keine ganze Webseite und keine Collage.

Projekt / Seite / Sektion / Zielgruppe / Section-Job: […]
Ziel-Viewport: [identisch für A/B/C]

DESIGNRICHTUNG [A|B|C] — [Kurzname]
Absicht: […]
Layoutlogik: […]
Bildsprache: […]
Typo/Oberfläche: […]
Motion-Vision: [statisch sichtbarer Ausgangszustand]

COPY — EXAKT SO, NICHT UMSCHREIBEN
Eyebrow: "[…]"
Headline: "[…]"
Subheadline: "[…]"
Body: "[…]"
CTA primary: "[…]"
CTA secondary: "[…]"
Weitere UI-Texte: "[…]"

REFERENCE INPUT MAP — Reihenfolge = angehängte Bilder
1. REF-A-01 — [sichtbares Erkennungsmerkmal]
   Nutze ausschließlich: [eine Modellrolle].
2. REF-A-02 — […]
   Nutze ausschließlich: […].

GRENZEN
Eigenständige Gestaltung. Keine Quellenmarken, Logos, Copy, Originalassets,
charakteristischen Illustrationen oder Pixelkopien. Keine erfundenen Reviews,
Ratings, Zertifikate oder Kundenfotos. Kein Lorem und keine weiteren Texte.
```

Direkt unter jedem Prompt die tatsächliche Attachment-Liste in derselben
Reihenfolge notieren:

```yaml
referenced_image_paths:
  - "/ABS/OUT/09-mockups/references/REF-A-01__...png"
  - "/ABS/OUT/09-mockups/references/REF-A-02__...png"
```

Eine URL im Prompt ist kein visueller Input. Beim Generieren die lokalen Dateien
tatsächlich anhängen. Maximal drei Referenzen pro Generierung.

## 5. G-REF — internes Qualitätsgate

`G-REF=PASS` nur wenn jeder Check `JA` ist:

- [ ] A/B/C unterscheiden sich auf mindestens drei Designachsen.
- [ ] Jede verwendete Referenz hat direkte URL, Datum, Viewport und Region.
- [ ] Jede lokale Capture-Datei existiert, ist lesbar und passt zur Fundstelle.
- [ ] Cookiebanner, Modals oder Browser-Chrome verdecken das Muster nicht.
- [ ] `pattern_take`, `do_not_copy`, Eignung und eine Modellrolle sind notiert.
- [ ] Jede Richtung nutzt 2–3 Referenzen; keine lose angehängten Bilder.
- [ ] `gpt-prompts.md` enthält drei eigenständige Prompts mit identischer finaler
      Copy und identischem Ziel-Viewport.
- [ ] Attachment-Reihenfolge und Referenz-ID-Mapping stimmen überein.
- [ ] Die Prompts schließen Quellenidentität, Fake-Proof und Textänderungen aus.

Bei Bildtool-Verfügbarkeit: je Richtung zuerst **einen vergleichbaren Hero** unter
`09-mockups/generated/` erzeugen und auf Quellenlogos, Quellen-Copy, Textfehler
und erkennbare Kopie prüfen. Ohne Bildtool bleibt `G-DESIGN` auf
`AWAITING_MOCKUPS`; Raphael erhält die drei Prompts plus Attachment-Pfade und
wählt erst nach drei Vergleichsbildern.

Die drei Heros werden maschinenlesbar in `comparison-manifest.tsv` registriert:

```tsv
direction\tfile\tviewport\tcopy_sha256\tsource_prompt\treview
A\t09-mockups/generated/A__hero.png\t1536x864\t<sha256>\tPrompt A\tPASS
```

Vor jeder G-DESIGN-Frage ausführen:

```bash
python3 /root/raphael-skills/skills/eigene/website-plan/scripts/validate-design-gate.py "$OUT"
```

Exit `0` = Frage erlaubt · Exit `3` = `AWAITING_MOCKUPS` · sonst `BLOCKED`.

## Failure Modes

| Fehler | Gate-Reaktion |
|---|---|
| URL-/Moodboard-Dump ohne lokale Captures | `G-REF=FAIL` |
| Full-Page-Miniatur statt relevanter Region | neu capturen |
| „Wie Website X“ ohne abstrahiertes Muster | Prompt verwerfen |
| Ein Bild steuert gleichzeitig Layout, Typo, Farbe und Illustration | auf eine Modellrolle begrenzen |
| Dieselbe Primärreferenz für A/B/C | Richtungen neu recherchieren |
| Screenshot wird als Motion-Beleg ausgelegt | Motion beobachten oder als Hypothese markieren |
| Referenz nur in Markdown verlinkt, nicht angehängt | Generierung ungültig |
| Bildmodell ändert finale Copy | Output nicht freigeben; Spec nie zurückändern |
| KI-Nachher zu echtem Vorher als Beweis | Fake-Proof; Output sperren |
