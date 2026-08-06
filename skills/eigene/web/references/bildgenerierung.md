# Bildgenerierung über die Higgsfield CLI (Creative-Assets für Websites)

**Wofür:** Echte Bild-Assets für die Website erzeugen — Hero-Bilder, Produkt-Shots,
Szenen, Menschen, Illustrationen (2D/3D). Standard-Werkzeug ist die **Higgsfield
CLI** (`higgsfield`, Aliase `higgs`/`hf`) auf dem VPS. Nicht raten — dieses Dokument
nennt die realen Job-Types und Parameter (geprüft mit `higgsfield model get`).

Login/Workspace/Fähigkeiten der CLI stehen in der Memory `higgsfield-cli`. Diese
Referenz ist die **Bild-Doktrin** darüber: welches Modell, wann, mit welchen Referenzen.

## Abgrenzung — welches Skill/Werkzeug für welches Bild?

Drei verschiedene Dinge, oft verwechselt. Erst einordnen, dann arbeiten:

| Ich brauche… | Werkzeug | Nicht verwechseln mit |
|---|---|---|
| **Inhalts-Bild** auf der fertigen Seite (Hero-Foto, Produkt, Szene, Illustration) | **Higgsfield CLI** (dieses Dokument) | keine Design-Mockups, echte Assets |
| **Design-Referenz-Mockup** je Sektion (wie soll die Sektion aussehen) | Image-first: `lexlin-design-prinzipien.md` + `rebuild-from-image.md` (ein Bild PRO Sektion; kein separates `imagegen-web`-Skill) | erzeugt Layout-Vorlagen, keine Endkunden-Assets |
| **UI selbst als Code** (Layout, Komponenten, Motion, Anti-Slop-QA) | **design** | kein Bildgenerator |
| Allgemeine Marketing-Bild-Werkzeugkunde (Nicht-Higgsfield-Fälle, Web-Optimierung) | **image** (vendored) | Fallback/Nachschlagewerk |
| Marken-/Logo-/Identity-Boards | **brandkit** | ganze Brand-Systeme, kein Einzel-Asset |

Für Websites gilt: **Art Direction kommt aus `design`** (Look, Palette, Register) →
diese Referenz setzt die Art Direction in konkrete Bilder um.

## Vorbereitung (einmal pro Session)

```bash
hf workspace set 17fb38d1-d9ad-49fd-b665-7d80ee81f9ad   # Workspace muss gesetzt sein
hf account status                                        # Credits prüfen
hf generate cost <job_type> --prompt "…"                 # IMMER vorab: Kosten schätzen
```

Referenzbilder zuerst hochladen (oder direkt als Pfad übergeben — Pfade werden
auto-hochgeladen): `hf upload create ./ref.png` → Upload-ID. Bereits hochgeladene
wiederverwenden: `hf upload list`.

## Der Entscheidungsbaum (verbindlich)

**Scope-Grenze:** Diese Datei gilt erst, wenn der Grafik-Medium-Entscheidungsbaum
(`tool-usecase-router.md#grafik-baum`) auf `#bilder` gezeigt hat — also bei Marken-Look
oder Fotorealismus. Flache, generische Illustrationen (Marke egal) laufen über
`#illustration-flat` (Bibliothek, z. B. unDraw), nicht über KI-Generierung.

**Erste Frage immer: Gibt es Referenzen?**

```
Referenzen vorhanden?
├── JA  → GPT Image 2  (gpt_image_2)   ← Standard, sobald es IRGENDEINE Referenz gibt
│         ├── Inhaltliche Referenz (was ist zu sehen)
│         └── Visuelle/stilistische Referenz (wie soll es aussehen)
└── NEIN → Was für ein Bild?
          ├── Illustration / stilisiert (2D/3D, markenspezifisch — sonst greift
          │     `#illustration-flat`, siehe Scope-Grenze oben) → GPT Image 2  ← bester Illustrator
          └── echt fotorealistisch              → Recraft V4.1 (recraft_v4_1)
                mit striktem JSON-Prompting, ohne Color-Grading
                ⚠ KEINE Nahaufnahme-Gesichter echter Menschen — nur Distanz / beiläufig

Previews (schnell, wegwerfbar) → Nano Banana 2 (nano_banana_flash), sonst NIE.
Auflösung finaler Assets → immer 4k oder 2k, nie 1k.
```

**Merksatz:** GPT Image 2 ist die erste Wahl für alles Stilisierte und alles mit
Referenz. Recraft ist der **Realismus-Spezialist** — nur ranholen, wenn es echt
fotorealistisch aussehen muss.

### 4-Felder-Kontext-Checkliste (Pflicht vor jedem Generate)

Vor **jedem** `hf generate create` müssen diese vier Felder **schriftlich** stehen —
im Brief, im Prompt oder im Job-Kommentar. Ohne Kontext kommt Beliebigkeit heraus:

| Feld | Was da stehen muss |
|---|---|
| **Colors** | Markenpalette — Hex-Codes oder Token-Namen (z. B. `--brand-700`), nicht „passend zur Marke" |
| **Style** | Register: editorial, minimalistisch, playful, fotorealistisch, künstlerisch … |
| **Composition** | Fokus-Punkt, Blickrichtung, Anordnung der Elemente — nicht „mach ein schönes Bild" |
| **Use case** | Wofür konkret: Hero-Foto, Produkt-Shot, Empty-State-Szene, Feature-Illustration … |

**Pass:** alle vier Felder schriftlich vorhanden → generieren.
**Fail:** ein Feld fehlt → zurück zur Art Direction (`design`), **kein Generate ohne
Kontext**. Die Felder wandern anschließend in den Bild-Index (`style`, `motiv`, `typ`).

*(Idee sinngemäß nach Leon Lin, „How To Actually Design With AI", X-Post 2026 —
eigene Formulierung, keine Übernahme.)*

### 1. Referenzen vorhanden → GPT Image 2 (`gpt_image_2`)

**Sobald es eine Referenz gibt, ist GPT Image 2 der Default.** Referenzen werden per
`--image-references` (Alias `--image`) übergeben — mehrfach wiederholen für mehrere
Bilder. Genau das ist das „Add Image 1 / Add Image 2 / …"-Prinzip.

**GPT Image 2 ist außerdem der beste Illustrator.** Jede **markenspezifische** stilisierte Illustration
(2D, 3D-Render, Icon-Szenen, „geile Illustrationen") läuft über GPT Image 2 — **auch
ohne Referenz**. Recraft ist dafür die falsche Wahl (das ist der Realismus-Weg unten).
Mit Stil-Referenz (bestehende Illustrationen) wird es noch treffsicherer, aber
zwingend ist sie hier nicht.

Zwei Arten von Referenz — meist gemischt:

**a) Inhaltliche Referenz — *was* ist zu sehen.**
Eine bestimmte Person, ein konkretes Produkt, eine Szene, eine Stadt, ein Objekt.
- **Regel:** Meist liegen die als **Kontext-Bilder** bei → direkt als
  `--image-references` mitgeben.
- **Wenn nicht vorhanden:** das Motiv **online heraussuchen** (echte Stadt, echtes
  Produkt, reale Location), herunterladen, als Referenz mitgeben. Nie das Aussehen
  eines konkreten realen Dings frei erfinden.

**b) Visuelle / stilistische Referenz — *wie* soll es aussehen.**
„So ungefähr, in diesem Stil." Farben und Look aus einem Foto-Shooting mitnehmen;
oder ein Illustrationsstil (3D-Renders, 2D-Illustration) als Vorlage.
- **Regel:** Alle Stil-Referenzbilder (z. B. mehrere Shooting-Bilder, mehrere
  Illustrationen) als `--image-references` mitgeben und im Prompt explizit sagen,
  was übernommen werden soll: „match the color palette, lighting and grade of the
  reference images" bzw. „match the illustration style / line weight / shading of
  the reference images".
- Bei einem ganzen Shooting: 2–4 der aussagekräftigsten Bilder als Referenz —
  Farbe + Licht + Look wandern so ins neue Bild.

**Optional — Prompt aus einer visuellen Referenz destillieren:**
`cocktailpeanut/image-to-prompt` (Florence-2, lokal) macht aus einem Bild einen
strukturierten JSON-Prompt (Szene, Objekte, Palette, Elemente). Nützlich, um aus
einer Stil-Referenz einen sauberen Start-Prompt zu ziehen, den man dann kürzt/anpasst
— ersetzt nicht die Referenzbilder selbst, ergänzt sie.

**Rezept:**
```bash
hf generate cost gpt_image_2 --prompt "…"                      # vorab
hf generate create gpt_image_2 \
  --prompt "<Motiv + was aus den Referenzen übernommen wird>" \
  --image ./shooting-01.jpg --image ./shooting-02.jpg \        # Add Image 1, 2, …
  --aspect-ratio 16:9 --resolution 4k --quality high --wait
```
Params (`gpt_image_2`): `aspect_ratio` (1:1,4:3,3:4,16:9,9:16,3:2,2:3) ·
`resolution` (1k,2k,4k, Default 2k → **auf 4k setzen** für Finals) ·
`quality` (low,medium,high; Default high) · `image_references` (Array).

### 2. Echt fotorealistisch, keine Referenz → Recraft V4.1 (`recraft_v4_1`)

Recraft ist der **Realismus-Spezialist** — nur ranholen, wenn das Bild echt
fotorealistisch aussehen soll und es keine Referenz gibt. Alles Stilisierte gehört zu
GPT Image 2 (oben). Recraft ist reines Text-zu-Bild — **kein `image_references`**.

**Gesichter echter Menschen: nur aus Distanz oder beiläufig.** Keine
Nahaufnahme-Porträts realer Personen mit Recraft — KI-Gesichter fallen im Close-up auf
und werden schnell unheimlich/fake. Menschen nur auf mittlere/weite Distanz, angeschnitten,
von der Seite, in Bewegung, als Teil der Szene — nie das erkennbare Gesicht als Motiv.
Braucht die Seite ein echtes, nahes Gesicht → **echtes Foto** (Shooting/Stock), nicht Recraft.

**Das Recraft-Problem:** Recraft baut ungefragt gern einen **cinematischen, leicht
getönten, filmischen Look** (Teal-Orange-Grade, Film-Tint). Das passt fast nie zu
dem, was wir machen, und wirkt billig-generisch. Dagegen wird **hart** gegengesteuert:

- **JSON-Prompting** (strukturierter Prompt, siehe Vorlage unten) — Farbe, Stil,
  Licht, Komposition **explizit** benennen, statt Recraft raten zu lassen.
- Im Prompt Farbe/Grade **negativ** festnageln: „flat neutral grade, no cinematic
  color grading, no teal-orange, no film tint, true-to-life color".
- **NICHT** das Color-Grading benutzen: weder die Parameter `colors` /
  `background_color` erzwingen noch das separate `color_grading_lut`-Modell. Farbe
  wird im Prompt beschrieben, nicht per Grading-Feature aufgezwungen.
- **Kein Illustrations-Weg:** stilisierte Illustration läuft IMMER über GPT Image 2
  (markenspezifisch) bzw. `#illustration-flat` (generisch) — Recraft bleibt der
  Realismus-Weg. `--model-type vector`/`utility_vector` nur für rein technische
  Vektor-Utilities, nie als Illustrations-Alias.

**Rezept:**
```bash
hf generate cost recraft_v4_1 --prompt "…"
hf generate create recraft_v4_1 \
  --prompt '<JSON-Prompt, siehe Vorlage>' \
  --model-type standard \                # vector = nur technische Vektor-Utilities, NICHT Illustration
  --aspect-ratio 16:9 --resolution 2k --wait
```
Params (`recraft_v4_1`): `aspect_ratio` · `resolution` (1k,2k → **2k**, mehr geht
nicht) · `model_type` (standard,vector,utility,utility_vector) · `colors`,
`background_color` **nicht nutzen**.

### 3. Previews → Nano Banana 2 (`nano_banana_flash`) — und sonst nie

Nano Banana **nur** als **Nano Banana 2** (`nano_banana_flash`) für schnelle,
wegwerfbare Previews (Komposition/Idee testen, bevor das teure Final auf GPT Image 2
oder Recraft läuft). Kann Referenzen und bis 4k, aber im Website-Flow **ausschließlich
Preview**. Kein finales Asset aus Nano Banana. Andere Nano-Varianten (Pro/Lite/Stylist)
nicht verwenden.

## JSON-Prompt-Vorlage für Recraft (gegen den Filmlook)

Recraft ohne Struktur = generischer cinematic Slop. Diesen JSON-Block als Prompt
übergeben, Felder ausfüllen, `negative` immer mit den Anti-Grade-Begriffen:

```json
{
  "subject": "<was genau, konkret>",
  "composition": "<Bildausschnitt, Perspektive, Platz für Text/Overlay>",
  "style": "<z. B. clean product photography / cinematic photo / photoreal 3D render>",
  "palette": "<echte Marken-/Shooting-Farben, exakt benannt>",
  "lighting": "<soft daylight / studio softbox / … — flat und natürlich>",
  "background": "<beschrieben, nicht per background_color erzwungen>",
  "mood": "<nüchtern, klar — NICHT 'cinematic'>",
  "negative": "no cinematic color grading, no teal-orange, no film tint, no vignette, flat neutral true-to-life color"
}
```

Herkunft der Methode: strukturiertes Prompting (das „JSON-Prompting-Skill"-Prinzip) +
`image-to-prompt` als Extraktor. Ziel ist Kontrolle über Farbe/Stil, nicht Recrafts
Default-Ästhetik.

## Bild-Bearbeitung mit Higgsfield (nicht nur erzeugen)

Higgsfield erzeugt nicht nur Bilder, es **bearbeitet und erweitert** sie auch. Ein
bestehendes Asset (generiert oder geliefert) muss nicht neu geprompted werden — oft
reicht eine gezielte Bearbeitung. Alle mit echten Job-Types/Params (`higgsfield model
get <job_type>`). Übergabe des Ausgangsbilds per `--image` (= `--image-references`).

| Aufgabe | Job-Type | Aufruf (Kurz) |
|---|---|---|
| **Hintergrund entfernen / freistellen** | `image_background_remover` | `--image ./foto.jpg` (genau 1) → **transparentes** Ergebnis |
| **Bild erweitern / Canvas vergrößern (Outpaint)** | `outpaint` | `--image ./hero.jpg --aspect-ratio 21:9` (Hero auf Breitbild ziehen) |
| **Gezielt ändern per Anweisung** (Objekt raus/rein, Farbe, Text) | `gpt_image_2` | `--image ./bild.jpg --prompt "entferne die Person links"` (Ausgangsbild als Referenz) |
| **Hochskalieren, schnell** | `bytedance_image_upscale` | `--image ./bild.jpg --resolution 4k` |
| **Hochskalieren / restaurieren, High-End** | `topaz_image` | `--image … --output-width 3840 --output-height 2160 --variant "High Fidelity V2"` |
| **Auto (Modellwahl automatisch)** | `image_auto` | `--image … --prompt "…"` (bis 14 Refs) |

```bash
# Beispiel: Produktfoto freistellen → transparentes Ergebnis
hf generate create image_background_remover --image ./sessel.jpg --wait
# Beispiel: Hero-Foto auf 21:9 erweitern
hf generate create outpaint --image ./hero.jpg --aspect-ratio 21:9 --wait
```

**Regel:** Jede Bearbeitung ergibt ein **neues** Bild → danach zwingend durch
`bilder.mjs add` (AVIF + Index). Beim Freistellen ist das Ergebnis **transparent** —
das wird als AVIF **mit Alpha** gespeichert und im Index als `transparenz: true`
geführt (siehe unten). Weitere Higgsfield-Fähigkeiten (Video, 3D, Upscale, Marketing
Studio) stehen in der Memory `higgsfield-cli` — hier nur die Web-Bild-relevanten Ops.

**Illustrations-Regel: freistellen + eng zuschneiden (Raphael-Doktrin 23.07.2026, hart).**
Illustrationen, die auf der Website mit transparentem Hintergrund stehen sollen,
werden IMMER (1) per `image_background_remover` freigestellt und (2) danach mit
ImageMagick **auf das Motiv getrimmt**, sodass das Bild links/rechts/oben/unten
exakt am letzten Element-Pixel aufhört (z. B. genau an der Dachkante des Hauses):

```bash
# Schritt 1: freistellen (transparent)
hf generate create image_background_remover --image ./illustration.png --wait
# Schritt 2: eng auf das Motiv zuschneiden (Alpha-Trim, kein Rand)
convert freigestellt.png -trim +repage illustration-final.png
```

Grund: Ohne Trim bringt das generierte Bild seinen eigenen White Space mit, der
sich mit den normalen Margins/Paddings des Layouts addiert — die Illustration
wirkt dann verloren und die Abstände sind unkontrollierbar. Der Abstand gehört
ins CSS, NIE ins Bild. (Beim Generieren darf/soll das Motiv trotzdem mit viel
Luft angefragt werden — damit nichts angeschnitten wird; der Rand fliegt danach
im Trim-Schritt raus.) **Ausnahme oben/unten:** Bei Freistellern mit Schatten oder
nötiger optischer Balance darf oben/unten bewusst etwas Raum bleiben — links/rechts
wird IMMER hart bis zur Alpha-Grenze getrimmt (Brain-SOP
`/root/raphael-brain/wiki/craft/webdesign/2026-07-20-higgsfield-freisteller-ohne-transparenten-leerraum.md`). Danach wie immer: AVIF mit Alpha + `bilder.mjs add`
(`transparenz: true`).

## Layering-Workflow (Tiefe, Motion, Fallback)

Kommt **nach** dem Freisteller: mehrere fertige Assets zu einer Szene mit Tiefe
zusammensetzen. Fünf Regeln:

1. **Nur bei echtem Bedarf trennen.** Vorder-, Mittel- und Hintergrund werden nur dann
   als getrennte Assets erzeugt, wenn der Brief **Tiefe, Parallax oder Layer-Motion**
   verlangt. Reine Deko rechtfertigt keine Layer-Trennung — ein Bild reicht.
2. **Stacking vorher festlegen.** Vor der Generierung benannte Ebenen und ihre
   `z-index`-Stufen definieren: Der Hintergrund liegt hinten (niedrigste Stufe), der
   Mittelgrund darüber und der Vordergrund oben (höchste Stufe). Diese Reihenfolge
   dokumentieren; die Umsetzung prüft das [Grafik-Assets-Gate](./qa-faecher.md).
3. **Transparenz und Überdeckungen prüfen.** Freigestellte Layer bleiben Alpha-Assets.
   Vor dem Einbau Alpha-Kanten auf saubere Ränder ohne Halo prüfen und jede
   Überdeckung im zusammengesetzten Stack kontrollieren; die Umsetzung prüft das
   [Grafik-Assets-Gate](./qa-faecher.md).
4. **Reduced-Motion-Zustand und statischen Fallback bereitstellen.** Umsetzung nach der
   [motion-doktrin.md](./motion-doktrin.md). Zusätzlich ist ein flaches Composite-Bild
   als Pflicht-Asset zu erzeugen; es dient als statischer Fallback für Nutzer ohne
   Motion. Den Einbau prüft das [Grafik-Assets-Gate](./qa-faecher.md).
5. **Trim und CSS-Abstand anwenden.** Jeden Layer nach der Freistellung nach der
   Freisteller-Regel oben trimmen: links/rechts IMMER hart bis zur Alpha-Grenze;
   oben/unten gilt dieselbe Ausnahme wie beim Freistellen (Schatten/optische Balance,
   Brain-SOP). Abstand und Positionierung kommen aus dem CSS, nie aus dem Asset-Canvas.

*(Idee sinngemäß nach Leon Lin, „How To Actually Design With AI", X-Post vom
12.07.2026 — eigene Formulierung, keine Übernahme.)*

Die projektspezifische Layer-Ordnung (welche Ebenen eine Szene überhaupt hat) steht im
Asset-Kompositions-Abschnitt der Art Direction des Kunden:
`/root/clients/client-<name>/web/art-direction.md`.

## Bild-Index + AVIF — Pflicht bei JEDEM Bild

Gilt für **alle** Bilder im Projekt: selbst generierte **und** von Raphael gelieferte.
Zwei feste Regeln:

1. **Jedes Bild wird sofort nach AVIF konvertiert.** Kein PNG/JPG bleibt als Web-Asset
   liegen — AVIF ist das Format im `assets/`-Ordner.
2. **Jedes Bild steht im Index** (`bilder-index.json` im selben `assets/`-Ordner) mit:
   **typ** (Hero/Produkt/Szene/Illustration-2D/-3D/Portrait…), **motiv** (was ist zu
   sehen, konkret), **style** (Look/Palette/Stil), **modell** (`gpt_image_2` /
   `recraft_v4_1` / `nano_banana_flash` / `-` bei geliefert), **referenzen** (genutzte
   Referenzbilder), **prompt**, **quelle** (`generiert`/`geliefert`), **transparenz**
   (true/false, automatisch erkannt), **erstellt**, **status**.

Das erledigt deterministisch das Helferskript `scripts/bilder.mjs` (keine
npm-Abhängigkeiten). Konvertierung: **`avifenc`** (libavif) — erhält **Transparenz**
(Pflicht für freigestellte Bilder aus dem Background-Remover), erkennt Alpha
automatisch und schreibt `transparenz: true/false` in den Index. Fehlt `avifenc`
(`apt-get install libavif-bin`), fällt das Skript auf ffmpeg zurück — **das verliert
Alpha**, also für freigestellte Bilder unbedingt `avifenc` installiert lassen.

```bash
DIR=/root/clients/client-<name>/web/assets   # ein Index pro Projekt

# Bild aufnehmen: konvertiert nach AVIF + trägt in den Index ein
node scripts/bilder.mjs add "$DIR" ./roh/hero.png \
  --typ "Hero-Foto" --motiv "Werkstatt bei Tageslicht" \
  --style "clean, neutraler Grade" --modell gpt_image_2 \
  --ref "shooting-01.jpg,shooting-02.jpg" --quelle generiert --datum 2026-07-21

node scripts/bilder.mjs list "$DIR"     # Index als Tabelle
```

Fehlen `--typ/--motiv/--style/--datum`, stehen sie als `TBD` im Index und **müssen**
nachgetragen werden (das Skript warnt). Semantik kennt nur der Agent — Konvertierung
und Buchhaltung macht das Skript.

### Verwerfen — „das Bild ist scheiße"

Sagt Raphael, ein von mir erstelltes Bild taugt nichts:

```bash
node scripts/bilder.mjs reject "$DIR" <id-oder-datei>
```

Das **löscht die AVIF-Datei komplett** und **entfernt den Index-Eintrag** in einem
Schritt — weg ist weg, der Index bleibt sauber und zeigt nur noch, was wirklich lebt.
Nie nur die Datei löschen und den Index stehen lassen (oder umgekehrt).

## Harte Regeln (Kurzfassung)

1. **Referenz da → GPT Image 2.** Immer. `--image-references` = Add Image 1/2/…
2. **Illustration/stilisiert (2D/3D) → GPT Image 2**, auch ohne Referenz (bester Illustrator).
3. Inhaltliche Referenz fehlt als Bild → **online suchen**, nie erfinden.
4. Visuelle Referenz (Shooting-Look, Illustration) → **als Referenzbilder mitgeben**,
   Übernahme im Prompt benennen (Farbe/Licht/Stil).
5. **Nur echt fotorealistisch & ohne Referenz → Recraft**, mit JSON-Prompting,
   Farbe im Prompt festgenagelt.
6. **Recraft: keine Nahaufnahme-Gesichter echter Menschen** — nur Distanz/beiläufig;
   echtes nahes Gesicht → echtes Foto.
7. **Recraft: kein Color-Grading** (`colors`/`background_color`/`color_grading_lut` aus).
8. **Auflösung: 4k oder 2k** (GPT 4k, Recraft max 2k). Nie 1k für Finals.
9. **Nano Banana nur als Nano Banana 2 (`nano_banana_flash`) für Previews.**
10. Vorab **immer** `hf generate cost`; Jobs mit `--wait` bzw. `hf generate wait` abholen.
11. **Jedes** Bild (generiert wie geliefert) sofort → **AVIF** via `scripts/bilder.mjs add`.
12. **Jedes** Bild steht im **Index** (`bilder-index.json`): typ/motiv/style/modell/refs/quelle.
13. **„Bild ist scheiße" → `bilder.mjs reject`**: Datei komplett löschen + Index-Eintrag raus.

## Guardrails (Kundenprojekte)

- **Nur wo erlaubt.** Manche Kunden wollen **nur echte Fotos** (siehe
  `innocenti-redesign-local-project`: „Nur echte Projekte/Bilder") — dann keine
  KI-Generierung, echte Assets verwenden. Vor KI-Bildern für Kundenwebsites klären.
- **Datenminimierung (TB2):** an Higgsfield geht nur das nötige Referenzmaterial,
  nie der ganze Kunden-Vault. Kundenmaterial bleibt im Kundenrepo.
- **Credits sind endlich** — `hf account status` im Blick, Previews billig
  (Nano Banana 2), Finals gezielt.
- Bild-Assets liegen beim jeweiligen Projekt (`client-<name>/web/assets/`), nicht
  zentral.
