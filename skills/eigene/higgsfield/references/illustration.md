# Illustration (GPT Image 2)

Nur laden bei Medium `illustration`. Mehr Suche als beim Foto.

## Wann Illustration

Karte, Schnitt, Icon mit Volumen, Glas, Hintergrund-Deko, markige Mini-Szene.
Nicht: CSS-Verlauf, Lucide, unDraw, echter Text im Bild, Video.

## Familien — eine pro Auftrag, nicht mischen

| Familie | Wann | Stil-Suche |
|---|---|---|
| Flache Marken-Vektorlinie | Schnitt, Map, technische Linie wie Wilhelm | bestehende Projekt-Illustration + Seiten-Screenshot |
| Soft-3D / Clay-Icon | Icon mit Volumen, kein Film-Render | 2–3 Icons derselben Clay-/Studio-Licht-Familie |
| Deko-Objekt | Glas, Form, Hintergrund-Ding | 2–3 Fotos oder Renders nur fuer Material und Licht |

## Recherche (Pflicht)

Vor dem Job mindestens drei offene Quellen ansehen (Firecrawl oder Browser):
bestehende Assets im Projekt, eine Illustrations-Referenzseite, ein Material-
oder Ikon-Beispiel. Stilkontext = 2–3 Dateien einer Familie. Inhaltkontext =
echte Map, echtes Produkt, echte Form. Stadtplan nicht halluzinieren.

Seiten-Screenshot ist immer Stilkontext.

## Prompt-Pflicht (keine Kamera-Linse)

1. Inhaltkontext from image N, geometry not invented.
2. Stilkontext: line weight or clay volume, palette, density from images M.
3. Viewpoint and light on the object (top-down map, 3/4 icon, studio softbox).
4. Fit the existing layout. Empty margin allowed; trim comes after.
5. No dummy logos, no paragraph text, no photoreal skin on icons.

## Nach dem Generate

1. Read das Bild.
2. Freistellen: `image_background_remover`.
3. Trim: `convert … -trim +repage` (links/rechts hart; oben/unten Schatten-Ausnahme
   laut `bildgenerierung.md`).
4. `bilder.mjs add` mit deutschem `--motiv`.
5. Einbau: Abstand in CSS, Kante ausfaden wenn noetig.

## Fertig

Familie genannt, 2–3 Stil-Dateien einer Familie, Inhalt nicht erfunden,
kein Recraft, kein Lucide-Ersatz durch KI wenn nur ein Strich noetig ist.
