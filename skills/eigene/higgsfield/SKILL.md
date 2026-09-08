---
name: higgsfield
version: 0.4.0
description: >
  Higgsfield-CLI fuer Website- und Ads-Bilder: GPT Image 2, Inhalt- plus
  Stil-Referenz, Kamera nur bei Fotos, Index plus Bildtext.
  v0.2.0 (Raphael 03.09.2026): Ads-Static = Logo plus Look plus JSON-Spec
  als --image, Logo compositen nie neu zeichnen, Text 1:1 mit Umlauten.
  v0.3.0 (Raphael 04.09.2026): Statics immer 4:5 generieren, dann outpaint
  auf 9:16. Nie direkt 9:16.
  v0.4.0 (Raphael 08.09.2026): Ein GPT-Image-Lauf pro Karte. Kein Edit,
  kein Fix-Lauf auf ein fertiges Bild; jeder weitere GPT-Image-Durchgang
  verfaelscht das Motiv (Noise). Feed = lokaler 4:5-Crop des Masters,
  Story = symmetrisch je 285 px per Streifen-Outpaint (flux_2_pro_outpaint
  auf oberen/unteren Feed-Streifen, Feed bleibt pixelgenau). Kein
  «Visualisierung» im Bild. Staging mitdenken: TV an der Wand, nichts
  auf dem Boden.
  Trigger:
  "/higgsfield", "Higgsfield", "GPT Image", "gpt_image_2", "Freisteller",
  "Expand Image", "Outpaint", "Hintergrund entfernen", "Website-Bild",
  "Ads-Static Bild".
class: F
scope: agency
sensitivity: internal
source: >
  Raphael 2026-08-17 Grill plus bestehende CLI-Doktrin in
  web/references/bildgenerierung.md. Kein Fremd-Vendoring.
loads:
  - references/foto-prompt.md
  - references/illustration.md
  - references/ops.md
requires_skills: [web@^1]
completion_criteria:
  - "Medium steht schriftlich: foto oder illustration. CSS/SVG/Text laeuft nicht durch Higgsfield"
  - "Final-Job ist gpt_image_2. nano_banana_flash nur als benannter Preview. recraft_v4_1 nicht aufgerufen"
  - "Mindestens eine Stil-Referenz liegt als Datei vor (Seite, Shooting oder gesuchtes Stilbild) und steht im Prompt als Stilkontext"
  - "Inhaltkontext ist Datei oder begruendete Suche (Pexels/Unsplash/Web). Motiv nicht erfunden wenn eine Vorlage existiert"
  - "Foto-Prompt nennt Linse, Blende, Distanz, Licht, Grade. Illustrations-Prompt nennt Blick, Licht auf dem Objekt, Linie oder Volumen"
  - "higgsfield generate cost vor generate create. Ausgabe der Cost-Zeile im Lauf genannt"
  - "Ergebnis per Read angesehen. Danach bilder.mjs add mit typ, motiv, style, modell, refs, prompt, quelle. Deutscher Bildtext steht im Index-motiv oder daneben"
  - "Personen-Nahaufnahme nur mit echter Personen-Referenz (Kunde oder Stock-Gesicht). Soul, Video, 3D-App nicht genutzt"
  - "Ads-Static: genau EIN gpt_image_2-Lauf pro Karte (3:4, Text komplett in der 4:5-Safe-Zone). Feed 4:5 = lokaler Crop, Story 9:16 = Streifen-Outpaint je 285 px oben und unten (flux_2_pro_outpaint auf 500-px-Streifen, Feed pixelgenau in der Mitte). Kein Fussnoten-Text im Bild. Lokale Blur- oder Flaechenraender, gpt_image_2-Edit oder Fix-Lauf auf das fertige Bild sind Fail; passt es nicht, neuer Master mit korrigierter Spec."
  - "Ads-Static: Raphael sieht Logo, Look und Onscreen-Text bevor der Job laeuft. gpt_image_2 mit --image Logo, --image Look, Prompt = JSON-Spec plus Text-Fidelity. Logo nie neu zeichnen. Pillow-Overlay Fail."
---

# higgsfield — Bilder fuer Website und Ads

## Herkunft, Job, Problem

**Herkunft:** Raphael 17.08.2026 plus CLI-Doktrin in
`/root/raphael-skills/skills/eigene/_archiv/web-1.6.0-bis-2026-09-06/references/bildgenerierung.md`.

**Job:** Ein Bild erzeugen oder bearbeiten und ins Projekt legen.

**Problem:** Der Ablauf steckte nur im Web-Skill. Recraft und Soul verfuehren.
Dieser Skill ist der Einstieg. Job-Types und `bilder.mjs` bleiben in
`bildgenerierung.md`.

**Entscheidung:** Neue Datei. Web routet hierher. Kein zweiter CLI-Katalog.

## Zweck (1 Satz)

Inhalt und Stil als getrennte Referenzen hochladen, mit GPT Image 2 bauen,
Kamera nur bei Fotos, danach Text plus Index.

## Wann

`/higgsfield`, Website-Asset, Ads-Static, Freisteller, Expand, Handyfoto-Upgrade.
Nicht fuer CSS-Flaeche, Lucide-Icon, flaches unDraw, Video, Soul, Relight/Angles
ohne Raphael-Wort.

## Ablauf

1. **Medium.** `foto` oder `illustration`. Form/Farbe ohne Motiv → CSS.
   UI-Strich → Lucide. Generische Flat-Szene ohne Marke → `#illustration-flat`.
   Fertig wenn eine Zeile Medium plus Grund steht.
2. **Index zuerst.** `bilder.mjs list` auf dem Projekt-`assets/`. Gleicher
   Inhalt im richtigen Stil → kein Generate.
3. **Zwei Kontexte.**
   - Inhaltkontext = was zu sehen ist (Produkt, Person, Szene, Map, Handyfoto).
   - Stilkontext = wie es gemacht ist (Kamera, Farbe, Licht, Linie, Volumen).
   Seite existiert fast immer → Screenshot oder bestehende Illustration ist
   Stil, nie Inhalt. Fehlt eine Datei: suchen (Pexels, Unsplash, echte Map,
   echte Produktseite). Personen-Gesicht: Stock-Foto als Inhalt, nicht erfinden.
   Foto braucht 1–3 Stilbilder. Illustration braucht mehr Suche: 2–3 Stilbilder
   derselben Familie (flach / soft-3D / technische Linie), nicht mischen.
4. **Prompt.** Foto: `references/foto-prompt.md`. Illustration:
   `references/illustration.md`. Im Prompt jede Datei als `Inhaltkontext:`
   oder `Stilkontext:` benennen. Prompt-Sprache Englisch. Rapport Deutsch.
5. **Cost, dann Job.** `higgsfield account status` bei Unsicherheit.
   `higgsfield generate cost gpt_image_2 --prompt "…"`.
   Preview nur `nano_banana_flash`. Final immer:

```bash
higgsfield generate create gpt_image_2 \
  --prompt "Inhaltkontext: … from image 1. Stilkontext: camera/color/setup from image 2. Do not invent the subject." \
  --image ./inhalt.jpg --image ./stil-1.jpg \
  --aspect-ratio 16:9 --resolution 4k --quality high --wait
```

   Edit, Expand, Freisteller, Upscale: `references/ops.md`.
   Ads-Static (Logo, Look, JSON-Spec, Text-Fidelity): `references/ops.md` Abschnitt Ads-Static.
6. **Lesen.** Datei mit Read oeffnen. Kopf am Rand, Fake-Gesicht, falsches Motiv
   → neuer Job oder Raphael, kein stilles „passt schon“.
7. **Index plus Text.** Sofort:

```bash
node /root/raphael-skills/skills/eigene/_archiv/web-1.6.0-bis-2026-09-06/scripts/bilder.mjs add "$DIR" ./roh.png \
  --typ "Hero-Foto" --motiv "<deutsch, konkret was zu sehen ist>" \
  --style "<Kamera oder Illustrationsfamilie>" --modell gpt_image_2 \
  --ref "inhalt.jpg,stil-1.jpg" --quelle generiert --datum 2026-08-17
```

   `--motiv` ist der Pflicht-Bildtext. Raphael-Nein → `bilder.mjs reject`.

## Harte Regeln

- Final = `gpt_image_2`. Recraft nicht aufrufen.
- `nano_banana_flash` nur Preview, nie ins Index als Final.
- Mindestens eine Stil-Referenz. Inhalt suchen statt halluzinieren.
- Kamera-Saetze nur bei `foto`.
- Soul, Video, 3D-App, Relight, Angles, Character-Swap nur auf Raphael-Wort.
- Credits vor Create. Kundenvault nicht ganz hochladen.
- Ads-Static: Logo als --image compositen, nie neu zeichnen. Text nur die Spec-Strings, Umlaute 1:1, kein ß. Pillow-Overlay auf Copy und Logo ist Fail.
- Ship der Seite bleibt `visual-aaa`. Dieses Skill liefert das Asset.

## Abgrenzung

| Bedarf | Hier | Wo sonst |
|---|---|---|
| Hero, Produkt, markige Illustration, 3D-Icon, Glas-Deko | ja | — |
| CSS, SVG-Text, Lucide, unDraw | nein | `tool-usecase-router.md` |
| Video / Soul | nein | eigener Auftrag |
| Trust-/Marken-Logo (Google, ProvenExpert, TÜV) | nein — nie generieren | `web` Schritt 4: Brand-Kit-Beschaffung |
| CLI-Params, Trim, Layer, AVIF-Details | Verweis | `bildgenerierung.md` |
