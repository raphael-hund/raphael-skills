# Imagery: Bild trägt Stimmung und Farbe, Text und Controls bleiben HTML

## TLDR

Foto oder Mockup liefert Farbe und Tiefe, während Text und Controls HTML bleiben, Fades nur Übergänge verbinden und der Crop den relevanten Proof zeigt.

Corpus: 53 vom Auftrag benannte Analysen unter `../studies/design-depth/deep/`. Zahlen sind gemessen, wenn direkt eine Beleg-Datei folgt; sonst steht **[Startwert]**. Branchenbegriffe: ICP, Hook, CTA, Proof und Offer.

## Regeln

### A. Hero-Foto und Text

1. **Text in die ruhigste Bildzone.** Headline auf gleichmäßigen Himmel, dunkle Wolkenbank oder Nebel, nie auf Detailreiches. Beleg: `2095928637346472339.md` (betwnstudios: Text auf dunkler Wolkenbank), `2096175830624055596.md` (Aakib: Headline über Wolkenband), `aakib-tiles.md` §1.2 (Nexora: Text im gleichmäßig hellen Himmel, kein Scrim nötig), `2096891319843164276.md` §1.6 (Nexus: Wolken links/rechts unten, Mitte oben wolkenfrei).
2. **Bodenfade verbindet Hero und Folgesektion, wenn das Foto nicht selbst das Layout ist.** Foto läuft über 115–160 px in die Page-Farbe aus. Gemessen: Moodist ~135 px auf `#09090b` (`2096634909263646898.md`), Nexus 115 px auf `#f7f7f7` (`2096891319843164276.md` §1.6), Nexora ~120 px auf `#0C0C0C` (`aakib-tiles.md` §1.2), Flowz 40 %→100 % (`2096876701775261945.md` §1).
3. **Weiß-Fade oben und unten klammert die Beweiszone.** Foto erscheint erst nach dem Textblock und verschwindet vor dem nächsten Textblock. Beleg: Tasklify Fade y 300→620 oben, 1450→1900 unten (`2096944343487852961.md` §3); UgcNinja Weiß-Fade über der UI (`2096889729337921598.md` §1).
4. **Seitlicher Mask-Fade bei Split-Hero.** Foto rechts läuft über ~250 px per `mask-image` nach links in die Surface (`2096832279775486079.md` §3, Mindspace: Fade x 640→890).
5. **Dunkler Verlauf oben für Header-Lesbarkeit.** Auf CTA-Bannern liegt der Verlauf über den oberen 40–45 % (`aakib-tiles.md` §1.8: `linear-gradient(#000 0%,rgba(0,0,0,.6) 40%,transparent)`); Portrait-Karten spiegeln das nach unten ab 50–55 % (`aakib-tiles.md` §4.5).
6. **Nutze zuerst die ruhige Bildzone; ergänze einen Scrim nur bei zu wenig Kontrast.** Recurr belegt weißen Text auf gleichmäßig blauem Himmel ohne Overlay; dort ist der CTA über den Köpfen der konkrete Fehler, nicht das fehlende Overlay (`2095797753305612601.md` §1.2). Grau-Text auf gesättigten Bildstellen fällt dagegen unter 3:1 (`2096889729337921598.md` §4: „That" auf Blau ≈2,5:1; `2096944343487852961.md` §5: `#A5A5A5` auf getöntem Foto ≈2,4:1).
7. **Foto-Temperatur = Page-Temperatur.** Warme Fotos auf warmer Creme-Page verschmelzen; Foto liefert die Temperatur, das Glas übernimmt sie (`2096832279775486079.md` §9.6; `2096833304351961505.md` §1.3: kühl oben, warm unten).

### B. Produkt-Mockup auf Material

8. **Mockup ist eine eigene Ebene auf einem Material.** Material = Foto (Berg, Wiese), Stoff-Textur, Verlauf oder gesättigte Bühne mit Raster. Vorschau immer beschnitten: unten hart oder gefadet (`2095488681796854015.md` §5.2: A/C Foto, D Stoff `#2F5421→#3B2D12`, B Verlauf).
9. **Oben Weiß-Fade an die Textzone.** Variante C (Wiese mit Fade y 500→640) schlägt Variante A (harte Kante auf Himmelblau, Kartenrand verliert). Beleg: `2095488681796854015.md` §2 vs §1.7.
10. **Unten weicher Fade statt hartem Schnitt.** Phone-Cutout mit `mask-image` ab 65 % (`2095797753305612601.md`), Kanban-Reihe per Maske ausgeblendet (`2096876701775261945.md` §3.5), Dashboard + Foto zusammen ausgeblendet (`2096944343487852961.md` §4). Gegenbeispiel: Fade vor lesbarem Inhalt zerstört den Proof (`2096944343487852961.md` §11).
11. **Gesättigte Bühne mit Linienraster.** Ultramarin `#0d12dc`/`#1B3BFF` mit 8–12 px Raster `rgba(255,255,255,.08–.12)`, Padding 32–46 px, UI-Karte darauf mit Radius 6–12 (`2096292759489609818.md`; `aakib-tiles.md` §2.1).
12. **Angeschnittene Shots tragen Radius nur an der sichtbaren Ecke.** UI-Karte rechts/unten aus dem Rahmen laufen lassen, Radius nur oben-links (`aakib-tiles.md` §2.3, §4.3; `2096292759489609818.md`).
13. **Browserrahmen kennzeichnen den Proof, nicht das Live-Produkt.** Eine deckende Titelleiste (`#1b1b1b`, gemessene 36–50 px) gibt Glas eine stabile Oberkante (`2096833304351961505.md` §1.3; `2096876701775261945.md` §3.5). Zeige nur Chrome, den der ICP zur Einordnung braucht. Drei Ampelpunkte mit 10–12 px sind **[Startwert]**, kein Corpus-Messwert.
14. **Foto darf hinter der UI durchscheinen.** Sidebar halbtransparent, Foto-Streifen links/rechts vom Frame (`aakib-tiles.md` §1.5, `2096889729337921598.md` §7: Blau-Streifen x 28–112).

### C. Präsentationsbühne ist nicht Produkt

15. **Mockup-Artefakte nie nachbauen.** Grau-Passepartout mit Kreuzlinien (`2096855995909869867.md` §0: `#b8b8b8`), grainiger Backdrop (`2096499167225078020.md`, Aloxi), Cross-Grid-Bühne (`2096674796704813174.md`, Flowly), Board-Canvas `#3A3A3A`/`#C8C8C8` (`aakib-tiles.md`), Mobbin-Leiste (`mobbin-1.md`), gezeichneter Hand-Cursor (`2095783930775433616.md`, Mango) sind Präsentation. Der Frame ist Referenzgrenze.
16. **Popover-Menüs im Screenshot sind Deko.** Sehen bedienbar aus, sind es nicht (`2095488681796854015.md` §1.7, §11).

### D. Fotos von Menschen

17. **Drei Foto-Rollen, drei Behandlungen.** Farbgalerie = Stimmung, Einzel-Reportage = Kontext, S/W-Portraits = Team-Index (`2095874058697293985.md`, Hubmini: 4-Spalten-Galerie r16 gap 22, Team-Grid `grayscale(1)`).
18. **Ragged-Bottom-Galerie auf Hairline-Grid.** 4 Spalten, Gap 10 px, unterschiedliche Aspect-Ratios (4/5, 7/6, 3/4), Mono-Captions (`2096149200178418026.md`, Arcstone: 100vh entsättigter Hero, quadratische Dots).
19. **S/W-Portraits neben Pastellflächen.** Verhindert Farbstreit (`mobbin-2.md` §4, Jasper Bento: Portrait `grayscale(1)` neben `#DDF3D9/#D6E6F7`).
20. **Foto-Cutouts rahmen den Text, überdecken ihn nie.** 12-Spalten-Grid, Bilder in Spalten 1–3/6–8/10–12, Text in 4–9, Bilder dürfen am Viewport anschneiden (`mobbin-2.md` §2, Square).
21. **Eine Motivfamilie als Klammer.** Hero-Foto kehrt in Preview, Pricing-Band, Testimonial-Wand, CTA-Banner und Footer zurück (`aakib-tiles.md` §5.5: Nexora Berg, Motivra Wiese; `2095863741250474026.md`).
22. **Zwei Produkte per Foto-Temperatur codieren.** Warm-/Kalt-Karten (`2095807169346334900.md`, Fastino).
23. **Kein CTA über Gesichtern.** (`2095797753305612601.md`, Recurr: CTA über Köpfen).
24. **Echtes Gesicht + konkreter Satz = Proof-Anker.** Video-Poster mit Person, Zitat im Poster als HTML-Overlay, nicht rasterisiert (`open_design.md` §1.7).

### E. Grain, Glas, Scrim

25. **Grain nur auf der Foto-/Verlaufsebene, nie auf Text.** `feTurbulence baseFrequency .9`, Opacity .18–.35, `mix-blend-mode:overlay` (`2095807169346334900.md`, Fastino: grainige Langzeitbelichtung + Creme-Panel r40; `2096855995909869867.md` §8: Grain auf Karten-Verläufen; `layers.md` §1.3: Grain gegen Banding in Wolken).
26. **Glas-Karten nur auf Fotos, deckende Datenflächen innen.** Hülle `rgba(120,120,120,.35)` + `blur(24px)`, Karten `#1a1a1a` ≥ .78 deckend (`2096833304351961505.md` §1.3: „Transparenz außen, Deckung innen"; `2095565814405742911.md`, Delta: Konsolen in Glas-Hülle).
27. **Glas-Chip mit Stroke-Gradient statt Vollborder.** `rgba(255,255,255,.45)` oben-links → `.08` unten-rechts (`2096833304351961505.md` §1.2).
28. **Modal mit zwei Lichtquellen + Grain.** Zwei `radial-gradient` (warm unten rechts, kalt oben) über `linear-gradient(160deg,#3a3646,#1f1d27)`, Grain-Pseudo-Element opacity .55, Controls über dem Grain (`2096674796704813174.md`, Flowly).
29. **Panel-auf-Foto.** Creme-Panel r40 auf Landschaft, Foto bleibt an den Seiten sichtbar (`2095807169346334900.md`).

### F. Brand-Wasserzeichen und Wortmarke

30. **Riesige Marke bei ≈1,05:1 Kontrast hinter dem Content.** `#e8e8e8` auf `#eee`, `position:fixed`, `min(840px,90vw)` (`2096192737867350330.md`, Kargul); OG-Image `#ddd` @ .7 (`gap-marcelkargul.md` §3.3).
31. **Riesen-Wortmarke im Footer, unten angeschnitten.** Serif 260 px, Weiß 80–85 % auf Foto, oder Ton-in-Ton `#1F1F1F` auf `#000` (`aakib-tiles.md` §1.9, §3.8, §4.7; `2095797753305612601.md`).

### G. Illustration vs Raster

32. **Monochrome isometrische Line-Art mit einem Akzent.** Stroke `#2A2A2A` 1.5 px, Kern `#111`, Check `#22C55E`, `transform:matrix(.866,.5,-.866,.5,0,0)` (`2095784926717300835.md`, zahragr8r). Kargul: 30°-Gitter Alpha .06, Schraffur 4 px, 8-px-Anfasser, gepunktete Achsen (`gap-marcelkargul.md` §3.7).
33. **Dekorative Iso-Icons in Dunkelgrau bleiben Deko.** `#3a3a3a` auf `#101010` ≈2:1, nie Informationsträger (`2096876701775261945.md` §6).
34. **Dekorative Freisteller absolut, geclipt, aria-hidden.** Münzen am Rand, Textspalte frei (`refero-2.md` §6.2, Gumroad); 3D-Objekte an zwei Kanten beschnitten (`twentyfirst.md` §4: `right:-32px;bottom:-32px`); 3D-Deko nur mit Bezug zum Produktjob (`open_design.md` §1.4).
35. **Bitmaps ohne Produktbezug streichen.** Palmwedel (`2096292759489609818.md`), Kugel-Render ohne Funktion (`2096929195381457078.md` §10), Wiese für E-Mail (`2095488681796854015.md` §2), Tech-Orb (`neuform-1.md` Karte A), Stock-Landschaft als einziger Beweis (`2096876701775261945.md` §14).
36. **Geometrie-Motive als Stroke-SVG in Akzentfarbe.** Kritzel-Stern, Phyllotaxis-Spirale, Ellipsen-Stapel mit Opacity-Fade; ein Motiv pro Fläche (`2096953356086313312.md`, Nest).
37. **Prozessgrafik als Canvas/SVG-Geometrie, nicht Stock-Partikel.** Kristalle als konzentrische `strokeRect` (`neuform-1.md` §6.2).
38. **Materialrollen strikt.** Text und Controls = HTML; Foto, Illustration, Textur = Raster; skalierbare Formen = SVG/CSS (`prior_corpus.md` §1.11; `open_design.md` §1.7).

### H. Charts als Imagery

39. **Monochrom, 4 Grautöne, runde Caps, `rx`, kein Gridline.** Area-Gradient 18–28 % Weiß, Mono-Achsenlabels (`2096175237109092642.md` + video-1/2, Mono Charts). Illustrative Charts: Stroke 3–4 px komplementär, kein Grid (`2096833304351961505.md` §4.1).
40. **Datenbindung ist Pflicht.** Legende = Chart-Farben (Gegenbeispiel `2095383602431459523.md`, Filow: Legende ≠ Ring), Segment = Wert (`2096618423983964587.md`: Donut ohne Bindung), zwei Einheiten brauchen zwei Skalen (`2096833304351961505.md` §4.1; `2096215770783199316.md`, Lurni).
41. **Outline-Zahlen als Display-Proof.** `-webkit-text-stroke:1px` + `color:transparent` (`gap-marcelkargul.md` §3.5).

### I. Avatare, Logos, Icons

42. **Avatar-Stack 24–56 px, Überlappung −6…−12 px, Ring 2 px in Surface-Farbe.** (`2096165490498695410.md`: 24 px −8; `2096833304351961505.md`: 28 px −10; `neuform-1.md`: 30 px −10; `2096929195381457078.md`: 28 px −8.)
43. **Logo-Kacheln: Squircle `#f6f7f9` 90×96 r18 oder Tile `#f4f4f4` 48 r10.** (`2095383602431459523.md`; `2096618423983964587.md`; Kargul-Banner Kacheln r24 auf `#ececec`, `gap-marcelkargul.md` §3.1.)
44. **Logo-Walls monochrom, ≥3:1.** `#9A9A9A` auf `#0C0C0C` ok (`aakib-tiles.md` §1.3); `#5C5C5C` auf `#333` ≈2,5:1 fällt durch (`mobbin-3.md` Airtable); Logos nie auf die hellste Glow-Kreuzung (`2096931638118871502.md` §8). Kein Logoipsum, keine Fake-Marken (`2096876701775261945.md` §4).
45. **Outline-Icons 1.5 px, 18–24 px, `currentColor`.** (`2096889729337921598.md` §8; `2096165490498695410.md`.)

### J. Fake-Interaktives

46. **Trenne statischen Produkt-Proof von einer interaktiven Demo.** Eine statische Dashboard-Vorschau darf ein `<img>` sein (`2096889729337921598.md` §7); ein Composer oder Control, das der Nutzer bedienen soll, muss echtes HTML sein (`2095928637346472339.md`). Baue keinen Screenshot aus bedeutungslosen `div`-Rechtecken nach (`prior_corpus.md` §1.11).
47. **Crop vor Blur.** Zeige einen scharfen, relevanten Zustand und schneide Nebensächliches ab. Blur ist kein Proof. Unlesbare Chart-Reihe per Blur (`2095488681796854015.md` §4.6), Blur als Fake-Proof (`2096175830624055596.md`).
48. **Alt-Text aus echten Pixeln.** Katalog-Alt „Farbeimer" bei Schachdame-Bild (`twentyfirst.md` §4).

## Bauanleitungen

Alle Snippets sind eigene Umsetzungen ohne kopierte Assets. CSS-Zahlen übernehmen direkt die jeweils im Titel oder Absatz genannte Beleg-Geometrie; abweichende Werte stehen als **[Startwert]**.

### 1. Hero mit Bodenfade (Moodist, ~135 px)

```html
<section class="hero">
  <img class="hero__bg" src="hero.jpg" alt="" fetchpriority="high">
  <div class="hero__scrim" aria-hidden="true"></div>
  <div class="hero__copy"><h1>…</h1><p>…</p><a class="btn">CTA</a></div>
</section>
```
```css
.hero{position:relative;min-height:90vh;display:grid;place-items:center;background:#09090b;overflow:hidden;isolation:isolate}
.hero__bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 30%;z-index:-2}
.hero__scrim{position:absolute;inset:auto 0 0 0;height:36%;z-index:-1;
  background:linear-gradient(to bottom,transparent,rgba(9,9,11,.6) 45%,#09090b)}
.hero__copy{max-width:560px;text-align:center;color:#fff}
```
Textzone per `object-position` auf die ruhige Bildzone legen (Regel 1). Für Header-Lesbarkeit zusätzlich `.hero::before{inset:0 0 auto;height:30%;background:linear-gradient(#000,transparent)}` (Regel 5).

### 2. Split-Hero mit seitlichem Mask-Fade (Mindspace)

```css
.hero-img{position:absolute;inset:0 0 0 auto;width:62%;height:100%;object-fit:cover;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 45%);mask-image:linear-gradient(90deg,transparent,#000 45%)}
```

### 3. Mockup auf Foto mit Top-Weißfade (Aakib C, nicht A)

```html
<section class="preview">
  <img class="preview__bg" src="meadow.jpg" alt="">
  <div class="preview__app"><!-- echtes HTML oder <img alt=""> --></div>
</section>
```
```css
.preview{position:relative;aspect-ratio:870/490;overflow:hidden;background:#fff}
.preview__bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
  -webkit-mask-image:linear-gradient(transparent,#000 30%);mask-image:linear-gradient(transparent,#000 30%)}
.preview__app{position:absolute;inset:48px 90px auto;border:1px solid #e5e5e5;border-radius:6px;background:#fff;
  -webkit-mask-image:linear-gradient(#000 70%,transparent);mask-image:linear-gradient(#000 70%,transparent)}
```
Fade unten erst nach der ersten lesbaren Inhaltszeile beginnen (Regel 10).

### 4. Phone-Cutout mit Bodenfade (Recurr)

```css
.phone{-webkit-mask-image:linear-gradient(#000 65%,transparent 100%);mask-image:linear-gradient(#000 65%,transparent 100%)}
```

### 5. Gesättigte Bühne mit Raster (Kalender, `#1B3BFF`)

```css
.stage{background:#0d12dc;padding:36px 46px;border-radius:16px;overflow:hidden;
  background-image:linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px);
  background-size:12px 12px}
.stage .shot{border-radius:12px 0 0 0;margin:0 -60px -40px 0;box-shadow:0 30px 80px rgba(0,0,0,.3)}
```
Radius nur an der sichtbaren Ecke (Regel 12).

### 6. Zwei Weiß-Fades klammern die Beweiszone (Tasklify)

```css
.stage{position:relative;isolation:isolate}
.stage::before{content:"";position:absolute;inset:0;background:url(landscape.jpg) center/cover;z-index:-2}
.stage::after{content:"";position:absolute;inset:0;z-index:-1;
  background:linear-gradient(#fff 0,#fff 18%,rgba(255,255,255,0) 40%,rgba(255,255,255,0) 75%,#fff 100%)}
```

### 7. Galerie mit Ragged Bottom (Arcstone)

```css
.gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:0 10px;align-items:start}
.gallery figure{margin:0}.gallery figure:nth-child(1){grid-column:1}.gallery figure:nth-child(2){grid-column:2/4}.gallery figure:nth-child(3){grid-column:4}
.gallery img{width:100%;object-fit:cover;filter:saturate(.85)}
.gallery figure:nth-child(1) img{aspect-ratio:4/5}.gallery figure:nth-child(2) img{aspect-ratio:7/6}.gallery figure:nth-child(3) img{aspect-ratio:3/4}
.gallery figcaption{font:11px/1.4 ui-monospace,monospace;letter-spacing:.06em;text-transform:uppercase;color:#6b6b6b;margin-top:8px}
```

### 8. Team-Grid S/W (Hubmini)

```css
.team{display:grid;grid-template-columns:repeat(3,1fr);gap:60px 28px}
.team img{aspect-ratio:1/.93;width:100%;object-fit:cover;border-radius:12px;filter:grayscale(1)}
```

### 9. Foto-Cutouts um zentrierten Text (Square)

```css
.hero{display:grid;grid-template-columns:repeat(12,1fr);grid-auto-rows:minmax(120px,auto);gap:24px;overflow:hidden;background:#000;color:#fff}
.hero img{width:100%;height:100%;object-fit:cover;border-radius:16px}
.hero .copy{grid-column:4/10;grid-row:2;text-align:center;align-self:center}
.hero .a{grid-column:1/4;grid-row:1;margin-left:-24px;border-radius:0 16px 16px 0}
```

### 10. Portrait-Karte mit Unten-Scrim (Motivra)

```css
.card{position:relative;aspect-ratio:2/3;border-radius:12px;overflow:hidden}
.card img{width:100%;height:100%;object-fit:cover}
.card::after{content:"";position:absolute;inset:0;background:linear-gradient(transparent 50%,rgba(0,0,0,.85))}
.card figcaption{position:absolute;bottom:20px;left:16px;right:16px;color:#fff;z-index:1}
```

### 11. Grain nur auf der Bildebene (Fastino)

```html
<svg width="0" height="0" aria-hidden="true"><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .6 0"/></filter></svg>
```
```css
.photo{position:relative;isolation:isolate}
.photo::after{content:"";position:absolute;inset:0;filter:url(#grain);opacity:.35;mix-blend-mode:overlay;pointer-events:none}
.photo .panel{position:relative;z-index:1;background:#f4efe6;border-radius:40px;padding:48px}
```
Panel liegt über dem Grain, Text bleibt scharf.

### 12. Glas-Hülle mit Stroke-Gradient (Flowz)

```css
.shot{position:relative;border-radius:24px;overflow:hidden;background:#0c0c0c}
.shot::after{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;pointer-events:none;
  background:linear-gradient(160deg,rgba(255,255,255,.45),rgba(255,255,255,.08));
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
.window{border-radius:12px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.45)}
.window .chrome{height:50px;background:#1b1b1b;display:flex;gap:13px;align-items:center;padding-left:40px}
.window .body{padding:36px;background:rgba(120,120,120,.35);backdrop-filter:blur(24px) saturate(1.1)}
.window .card{background:rgba(22,22,22,.78);border-radius:12px}
@supports not (backdrop-filter:blur(1px)){.window .body{background:#2a2a2a}}
```

### 13. Modal-Lichtszene (Flowly)

```css
.modal{position:relative;border-radius:16px;overflow:hidden;isolation:isolate;color:#fff;
  background:radial-gradient(60% 50% at 78% 80%,rgba(176,90,92,.9),transparent 70%),
             radial-gradient(50% 40% at 45% 0%,rgba(76,91,124,.9),transparent 70%),
             linear-gradient(160deg,#3a3646,#1f1d27)}
.modal::before{content:"";position:absolute;inset:0;filter:url(#grain);opacity:.55;mix-blend-mode:overlay;pointer-events:none;z-index:0}
.modal>*{position:relative;z-index:1}
```

### 14. Brand-Wasserzeichen (Kargul)

```css
.bg-mark{position:fixed;left:50%;top:27%;translate:-50% 0;width:min(840px,90vw);fill:#e8e8e8;pointer-events:none;z-index:0}
body{background:#eee;position:relative}main{position:relative;z-index:1}
```

### 15. Riesen-Wortmarke im Footer (Nexora/Motivra)

```css
footer .mark{font-family:serif;font-size:clamp(120px,22vw,280px);line-height:.8;color:rgba(255,255,255,.85);overflow:hidden;white-space:nowrap}
footer .band{position:relative;background:url(mtn.jpg) center/cover;padding-top:120px}
footer .band::before{content:"";position:absolute;inset:0;background:linear-gradient(#0C0C0C,transparent 40%)}
```

### 16. Isometrische Line-Art (zahragr8r / Kargul)

```html
<svg viewBox="0 0 320 240" aria-hidden="true" class="iso">
  <g transform="matrix(.866 .5 -.866 .5 160 40)" fill="none" stroke="#2A2A2A" stroke-width="1.5">
    <rect width="120" height="120" rx="8" fill="#111"/><rect x="20" y="20" width="80" height="80" rx="6"/>
    <path d="M40 60l14 14 26-26" stroke="#22C55E" stroke-width="2.5" stroke-linecap="round"/>
  </g>
</svg>
```
```css
.iso-stage{background:#2e2e2e;position:relative;overflow:hidden}
.iso-stage::before{content:"";position:absolute;inset:0;
  background:repeating-linear-gradient(30deg,#ffffff0f 0 1px,transparent 1px 28px),repeating-linear-gradient(-30deg,#ffffff0f 0 1px,transparent 1px 28px);
  -webkit-mask:radial-gradient(ellipse at 50% 35%,#000 20%,transparent 70%)}
```

### 17. Dekorativer Freisteller an zwei Kanten beschnitten (21st)

```css
.svc{position:relative;overflow:hidden;border-radius:12px;padding:24px}
.svc__img{position:absolute;right:-32px;bottom:-32px;width:160px;height:160px;object-fit:contain;opacity:.9;pointer-events:none}
```
`<img alt="" aria-hidden="true">`; Textspalte bleibt frei.

### 18. Avatar-Stack, Logo-Squircle, Outline-Icon

```css
.avatars{display:flex}.avatars img{width:28px;height:28px;border-radius:50%;border:2px solid #fff;margin-left:-8px;object-fit:cover}
.avatars img:first-child{margin-left:0}.avatars .more{width:28px;height:28px;border-radius:50%;background:#e5e5e5;font:600 11px/28px sans-serif;text-align:center;margin-left:-8px}
.logo{width:90px;height:96px;border-radius:18px;background:#f6f7f9;display:grid;place-items:center}.logo img{width:50px;filter:grayscale(1)}
.icon{width:20px;height:20px;stroke:currentColor;stroke-width:1.5;fill:none}
```

### 19. Monochromer Area-Chart (Mono Charts)

```html
<svg viewBox="0 0 400 160" role="img" aria-label="Umsatz Jan–Jun, steigend">
  <defs><linearGradient id="area" x2="0" y2="1"><stop stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
  <path d="M0 120C60 100 100 130 160 90S260 60 320 70 400 40 400 40V160H0Z" fill="url(#area)"/>
  <path d="M0 120C60 100 100 130 160 90S260 60 320 70 400 40 400 40" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
</svg>
```
Werte aus Daten erzeugen; Legende bindet dieselben Farben (Regel 40).

### 20. Statischer Produkt-Proof als Rasterbild

```html
<figure class="shot">
  <img src="dashboard.webp" alt="Dashboard mit KPI-Reihe und Kanban-Board" width="1400" height="900" loading="lazy">
  <figcaption>Der neue Ablauf bündelt Status und nächste Aktion.</figcaption>
</figure>
```
Das Rasterbild zeigt einen scharfen, echten Zustand. Ist dasselbe Bild nur Atmosphäre und bereits in der Copy erklärt, nutze stattdessen `alt=""`. Wenn Controls bedienbar sein sollen, baue echtes HTML (`2096889729337921598.md` §7, §14; `2095928637346472339.md`; `twentyfirst.md` §4).

### 21. Browserrahmen für Produkt-Proof

```html
<figure class="browser-proof">
  <div class="browser-proof__bar" aria-hidden="true"><i></i><i></i><i></i></div>
  <img src="product.webp" alt="Projektansicht mit freigegebenem Status" width="1440" height="900">
  <figcaption>Freigaben und Kommentare bleiben in einer Ansicht.</figcaption>
</figure>
```
```css
.browser-proof{overflow:hidden;border:1px solid #2a2a2a;border-radius:12px;background:#111}
.browser-proof__bar{height:44px;display:flex;align-items:center;gap:8px;padding:0 16px;background:#1b1b1b}
.browser-proof__bar i{width:10px;height:10px;border-radius:50%;background:#666}
.browser-proof>img{display:block;width:100%;height:auto;object-fit:cover;object-position:top}
.browser-proof figcaption{padding:12px 16px;color:#aaa;font-size:13px}
```
`44px`, `8px`, `16px`, `10px`, `12px`, `13px` sind **[Startwerte]** innerhalb der in Regel 13 belegten 36–50-px-Titelleiste. Entferne die Leiste, wenn sie keine Einordnung liefert. Browserrahmen nie um echtes Live-UI legen.

## Varianten je Stilfamilie

| Stilfamilie | Bildrolle | Hülle / Fade | Material | Beleg |
|---|---|---|---|---|
| Dark Landscape SaaS (Nexora, Moodist, Flowz) | Vollflächiges Landschaftsfoto im Hero, kehrt in Preview/CTA/Footer zurück | Bodenfade 120–160 px in `#0C0C0C`/`#09090b`; Glas-Fenster mit deckender Titelleiste | Grain auf Foto, Glas-Hülle | `aakib-tiles.md` §1, `2096634909263646898.md`, `2096876701775261945.md` |
| Light Mockup-on-Nature (Aakib A/C, Tasklify, Motivra, UgcNinja) | Weiße UI-Karte auf Berg/Wiese/Wolken | Weiß-Fade oben (30 %) und unten (70 %→100 %) | Foto Pastell, UI Schwarz/Weiß | `2095488681796854015.md`, `2096944343487852961.md`, `2096889729337921598.md` |
| Saturated Stage (Kalender-Board, Launchkit) | Kein Foto; Raster/Schraffur/Punktraster als Bühne | Cropped Shot, Radius nur sichtbare Ecke | `#1B3BFF` + 8–12 px Grid; Punktraster `#F0A080` 8 px | `aakib-tiles.md` §2–3, `2096292759489609818.md` |
| Editorial Warm (Fastino, Mindspace, Nexora Checkout) | Grainige Landschaft, Panel oder Split-Foto | Panel r40 auf Foto; seitlicher Mask-Fade 250 px | Creme `#f9f0e9`–`#f4efe6`, ein warmer Akzent | `2095807169346334900.md`, `2096832279775486079.md`, `2096929195381457078.md` |
| Photo Gallery / Agency (Hubmini, Arcstone, Square) | Foto ist Inhalt: Galerie, Team, Cutouts | Hairline-Grid, Ragged Bottom, Cutouts an Viewport-Kante | Entsättigt/S/W, Mono-Captions | `2095874058697293985.md`, `2096149200178418026.md`, `mobbin-2.md` §2 |
| Blueprint Mono (Kargul, Nest, Neuform) | Line-Art-Isometrie, Stroke-SVG-Motive, Wasserzeichen | Iso-Gitter mit radialem Fade; Eckmarken | Ein Grau-Rollensatz, Akzent nur im Motiv | `gap-marcelkargul.md`, `2096953356086313312.md`, `neuform-1.md` |
| Cinematic Preview Library (Layers, 21st) | Motiv-Karten tragen alle Farbe, Chrome monochrom | Karten ohne Border, Beschnitt links/rechts | Grain in dunklen Verläufen, Rauchwolken mit Lesekorridor | `layers.md`, `twentyfirst.md` |
| Gradient Deco (Stripe, Nexus Pastell, Soffit) | CSS-Verlauf statt Foto | Verlauf nur hinter Karten/Ausschnitt, nie hinter Text | Skew-Band, Linienraster 90 px | `refero-2.md` §4, `2096891319843164276.md` §1.7, `layers.md` §6 |

## Dos

- Textzone vor Bildwahl festlegen; Foto mit ruhiger Fläche dort auswählen (`object-position` als Focal Point; `2095928637346472339.md`, `2096175830624055596.md`).
- Fades nur an Übergängen zur Page einsetzen: Boden 115–160 px (`2096634909263646898.md`, `2096891319843164276.md`), Seite ~250 px (`2096832279775486079.md`), Top-Weißfade y 500–640 (`2095488681796854015.md`). Fullbleed- und Editorial-Fotos bleiben hart.
- Mockup auf eigenem Material, oben per Weiß-Fade an die Textzone, unten nach der ersten lesbaren Zeile ausblenden (`2095488681796854015.md`, `2096944343487852961.md`).
- Eine Motivfamilie über Hero, Preview, Pricing-Band, CTA-Banner und Footer wiederholen (`aakib-tiles.md` §5.5, `2095863741250474026.md`).
- Foto-Temperatur an Page-Temperatur koppeln; Glas übernimmt die Temperatur (`2096832279775486079.md` §9.6, `2096833304351961505.md` §1.3).
- Grain auf Foto oder Verlauf legen; Text bleibt auf deckendem Panel darüber (`2095807169346334900.md`, `2096674796704813174.md`).
- S/W für Team-Portraits, Farbe für Stimmung, ein Reportage-Foto für Kontext (`2095874058697293985.md`).
- Dekorative Assets absolut, `aria-hidden`, `overflow:hidden`; Textspalte frei (`refero-2.md` §6.2, `twentyfirst.md` §4).
- Logos monochrom ≥3:1 (`mobbin-3.md`), Avatare mit Ring in Surface-Farbe (`2096165490498695410.md`), Icons `currentColor` 1.5 px (`2096889729337921598.md`).
- Charts aus Daten erzeugen; Legende und Farben binden; Mono-Achsen nutzen (`2096175237109092642.md`, `2096618423983964587.md`).
- Bedeutenden Produkt-Proof als scharfes `<img>` mit pixelwahrem Alt-Text liefern; dekorative Bilder bekommen `alt=""`; bedienbare Demos sind echtes HTML (`2096889729337921598.md`, `2095928637346472339.md`, `twentyfirst.md`).
- Riesen-Wortmarke oder Wasserzeichen mit gemessenem ≈1,05:1 Kontrast als Abschlussanker einsetzen (`2096192737867350330.md`).

## Don'ts mit Gegenbeispiel

- CTA über Gesichtern platzieren: `2095797753305612601.md` §1.2 (Recurr). Weißer Text auf dem gleichmäßigen blauen Himmel funktioniert dort ausdrücklich ohne Overlay.
- Graue Headline-Phrase auf gesättigter Bildstelle (≈2,5:1): `2096889729337921598.md` §4 („That" auf Blau); `2096944343487852961.md` §5.
- Harte Kante Dashboard auf Himmelblau ohne Fade: `2095488681796854015.md` §1.7 (Variante A).
- Fade, der den Proof vor der ersten lesbaren Zeile löscht: `2096944343487852961.md` §11 (Kanban-Karten verschwinden).
- Split-Hero-Foto ohne Rand oder Mask-Fade direkt unter die Topbar schneiden: `2096832279775486079.md` §3.
- Mockup-Bühne nachbauen (Grau-Passepartout, Kreuzlinien, Hand-Cursor, Board-Canvas): `2096855995909869867.md` §0, `2096674796704813174.md`, `2095783930775433616.md`.
- Popover-Menü im Screenshot, das bedienbar aussieht: `2095488681796854015.md` §11.
- Raster-Composer als Fake-Input: `2095928637346472339.md`.
- Blur als Proof: `2095488681796854015.md` §4.6, `2096175830624055596.md`.
- Drei Bildstile in einer Projektreihe (Foto, UI-Mockup, Produkt): `2096832279775486079.md` §5.
- Bunte Blüten neben Orange-Akzent, Wiese für E-Mail-Produkt: `2095488681796854015.md` §2.
- Landschaftsfoto als einziger Beweis, Iso-Icons als Informationsträger: `2096876701775261945.md` §14.
- Palmwedel-Deko, Kugel-Render ohne Funktion, Tech-Orb: `2096292759489609818.md`, `2096929195381457078.md` §10, `neuform-1.md` Karte A.
- Logos auf hellster Glow-Kreuzung: `2096931638118871502.md` §8.
- Logo-Wall `#5C5C5C` auf `#333`: `mobbin-3.md` Airtable.
- Legende ≠ Chart-Farben, Donut ohne Werte, zwei Einheiten eine Skala: `2095383602431459523.md`, `2096618423983964587.md`, `2096833304351961505.md` §4.1.
- Alt-Text aus dem Katalog statt aus dem Bild: `twentyfirst.md` §4.
- Verlauf direkt hinter Text ohne Ausschnitt: `refero-2.md` §11 (Stripe).
- Weiße Schrift auf hellem Mint-Torus ohne Scrim: `layers.md` §6.2.
- Fixe Badges über Content-Bildern, Cookie-Modal im Screenshot eingefroren: `designmd_supply.md` §5, `designmd-me-1.md` §11.
- Pills, Credits, Version-Labels über Bildern als Deko: `prior_corpus.md` §1.11.

## Gilt nicht wenn

- **Dashboards, Public Sector, B2B-Tools:** kein Foto, kein Glas, kein Grain; Tiefe nur über 1-px-Linien und Luma-Stufen (`2096891182701793331.md` Kestrel, `shadcn.md`, `prior_corpus.md` §1.12).
- **Rein typografische Heros:** eine Farbe, ein Textblock, ein Button; Bild wäre Fremdkörper (`mobbin-1.md` Lemon Squeezy, `refero-2.md` Linear).
- **Fashion/Editorial mit Vollformat-Foto:** kein Fade, harte Kanten, Radius 0, Foto ist Layout (`refero-1.md` CLOU 7:1-Streifen, Acne).
- **Booking-/Formular-Flows:** Kontext neben dem Formular ist Text/Zitat/Logos, kein Motiv (`mobbin-3.md`).
- **Gamification/Consumer-Apps:** Verläufe, Glanz und 3D-Badges sind bewusst „juicy" (`gap-marcelkargul.md` §3.6).
- **Ohne echtes Produkt:** Fake-Chat, Fake-Thinking, Fake-Fensterpunkte weglassen (`refero-2.md` §5.5, `designmd_supply.md` §5).

## Quellen

Alle Pfade relativ zu `../studies/design-depth/deep/`.

- Hero-Foto/Scrim: `2096634909263646898.md`, `2095928637346472339.md`, `2096175830624055596.md`, `2096891319843164276.md`, `2096876701775261945.md`, `2096832279775486079.md`, `2096149200178418026.md`, `2096931638118871502.md`.
- Mockup auf Material: `2095488681796854015.md`, `2096944343487852961.md`, `2096889729337921598.md`, `2096292759489609818.md`, `aakib-tiles.md`, `2095863741250474026.md`, `2095797753305612601.md`, `2095565814405742911.md`.
- Bühne ≠ Produkt: `2096855995909869867.md`, `2096499167225078020.md`, `2096674796704813174.md`, `2095783930775433616.md`, `mobbin-1.md`, `mobbin-2.md`.
- Menschen/Galerie: `2095874058697293985.md`, `2096149200178418026.md`, `mobbin-2.md`, `2095807169346334900.md`, `open_design.md`, `2096929195381457078.md`.
- Grain/Glas: `2095807169346334900.md`, `2096833304351961505.md`, `2096674796704813174.md`, `layers.md`, `prior_corpus.md`.
- Wasserzeichen/Wortmarke: `2096192737867350330.md` (+ video-1/2), `gap-marcelkargul.md`, `aakib-tiles.md`.
- Illustration: `2095784926717300835.md`, `gap-marcelkargul.md`, `2096953356086313312.md`, `neuform-1.md`, `refero-2.md`, `twentyfirst.md`, `2096660897628668066.md`.
- Charts: `2096175237109092642.md` (+ video-1/2), `2095383602431459523.md`, `2096618423983964587.md`, `2096215770783199316.md`, `2096833304351961505.md`.
- Avatare/Logos/Icons: `2096165490498695410.md`, `2095383602431459523.md`, `2096618423983964587.md`, `mobbin-3.md`, `designmd_supply.md`, `designmd-me-1.md`.
- Gilt-nicht: `2096891182701793331.md`, `shadcn.md`, `refero-1.md`, `mobbin-3.md`, `gap-uiux_hamad.md`. Nicht verwertbar: `gap-marcelkargul-2096970816969703645.md` (Post gelöscht).
