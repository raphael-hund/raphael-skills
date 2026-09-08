# open_design — Bauanalyse (open-design.ai, platform-text)

Stand: 2026-09-07. Quelle: `/Users/raphaelhund/skill-workspace/web-design-depth/research/open_design/` (10 PNGs, REPORT.md). Alle Bilder mit dem Read-Tool geöffnet. Desktop 1440×1000, Mobil 390×844. Pixelwerte sind Schätzungen aus dem Screenshot, sofern nicht als „gemessen (REPORT)“ markiert. Body-Bezug: 16px.

## 0. Kurzfazit

Helle Produkt-Marketing-Seite mit einer Farbe als Signal (Neongrün ~#8CFF3B), Graphit-Buttons als Action, warmgraues Page-Off-White. Die Identität kommt nicht aus der Palette, sondern aus der Produktmetapher „Auswahlrahmen + Griffe + Textmarker“ im Hero. Der Rest ist konservatives, sauberes SaaS-Layout mit Pills, Glas-Header und einem identischen Mini-Browser-Mockup als Vergleichsbühne im Katalog.

## 1. home-desktop.png

### 1.1 Announcement-Bar (oben, volle Breite, y 0–44)
- Geometrie: Höhe ~44px, Inhalt zentriert, rechts X-Close bei x≈1396. Elemente: Badge „NEW“, Fetttext, dünner vertikaler Trenner (1px, grau), Lauftext, dunkler Pfeil-Pill.
- Material: Hintergrund helles Lime ~#D9FFB0 (Page-Accent-Tint). Badge „NEW“: satt-grün ~#7CFF2E, Text dunkel, Pill-Radius 9999px, Höhe ~22px, Padding 3px 10px. Pfeil-Pill: Graphit ~#1E1E1E, Höhe ~24px, Breite ~36px, weisser Pfeil.
- Typografie: 13–14px, Fett für „Fable 5.1 ist da“, Regular Grau ~#4A4A4A für Rest.
- Nachbau: `<div class="bar">` mit Flex, `gap:16px`, Trenner als `border-left:1px solid rgba(0,0,0,.15)`; `height:44px`. Close als Button `position:absolute; right:16px`.
- Warum es funktioniert: Der Streifen nutzt die Tint-Stufe der Akzentfarbe, nicht die Vollfarbe; nur Badge und Pfeil sind „laut“. Kein Slop.

### 1.2 Header/Nav (y 44–128, Inhalt 96px eingerückt)
- Geometrie: Höhe ~84px; Logo links (schwarze abgerundete Kachel ~36px, Radius ~10px, plus zweizeilige Wortmarke „Open / Design“). Nav mittig-rechts: Produkt ▾, Preise, Ressourcen ▾, Community ▾; Abstand ~36px. Rechts: Discord-Icon mit grünem Status-Punkt (6px, Lime, oben rechts am Icon), X-Icon, Sprach-Icon, GitHub-Pill „94.6K+“ (Outline 1px ~#D4D4D4, Radius 9999, Höhe ~36px, Padding 0 16px), Download-Button (Graphit ~#1A1A1A, weiss, Höhe ~36px, Radius 9999, Padding 0 18px).
- Typografie: Nav 15px, Medium, Graphit #222; Chevron 10px grau.
- Nachbau: `<header>` Grid `auto 1fr auto`; Nav als `<ul>` Flex `gap:36px`; Icons als SVG 20px; Statuspunkt als `::after` 6px Kreis `background:#8CFF3B; box-shadow:0 0 0 2px #fff`.
- In atelier-tokens.png (y 0–85) und airbnb-preview.png (y 0–75) ist derselbe Header gescrollt: Glas-Header mit `backdrop-filter: blur(~12px)`, halbtransparentem Off-White, unten weicher Schatten/1px Border; Pillen-Kapsel-Form mit grossem Radius (airbnb-preview.png: Kapselrand links x≈15, Radius ≈40px, volle Kapsel). Aktiver Nav-Punkt „Ressourcen“ trägt Underline: in systems-desktop.png grau 1px, in atelier-tokens.png Lime 2px (y≈57) — Underline färbt sich beim Scroll/Hover (Zustand unklar, nicht gemessen).
- Slop-Risiko: Unscharfer Inhalt hinter Glas-Header verdeckt Anker-Ziele (mobile-faq.png). `scroll-margin-top` fehlt sichtbar.

### 1.3 Hero-Auswahlrahmen (x 187–1238, y 150–345)
- Geometrie: Rahmen ~1050×195px, Border 1px Lime ~#8CFF3B, vier quadratische Griffe 8×8px an den Ecken, gefüllt Lime, exakt auf die Ecke zentriert (halb ausserhalb). Rahmen ist nicht auf Container-Breite (1248px) sondern auf Textbreite plus ~48px Luft.
- Headline: „Der Vibe Design Workspace für deine Marke.“ Zentriert, Sans (Albert Sans, REPORT gemessen H1-Container 700 72/72), sichtbar ~56px, Weight 700, Tracking ≈ -0.02em, Graphit #1F1F1F. Leading tight ~1.05.
- Subline: zwei Zeilen, ~30px, Weight 600, gleiche Farbe (kein Grauabstufung!). „Ein Designsystem“ trägt Textmarker: Lime-Fläche ~#B7FF7A, leicht transparent, ~65 % Zeilenhöhe hoch, unten bündig, mit leichtem Überhang (Highlight beginnt x≈380, unter „Ein Designsystem“ hört bei x≈612 auf).
- Nachbau:
  ```html
  <div class="sel"><h1>…</h1><p class="sub">Ein <mark>Designsystem</mark> für …</p></div>
  ```
  ```css
  .sel{position:relative;border:1px solid #8CFF3B;padding:32px 48px;display:inline-block}
  .sel::before,.sel::after,.sel .h::before,.sel .h::after{content:"";position:absolute;width:8px;height:8px;background:#8CFF3B}
  /* 4 Ecken: top:-4px/left:-4px usw. */
  mark{background:linear-gradient(transparent 35%, #B7FF7A 35%);color:inherit;padding:0 .1em}
  ```
- Warum: Metapher = Produktjob (Design bearbeiten). Griffe und Marker sind eine Familie (Lime). Fehler: Subline ist fast so schwer wie H1; auf Mobil (home-mobile-settled.png) wird das zum Textblock ohne Hierarchie.

### 1.4 Dekor-Layer (hinter/neben dem Hero)
- Links x 0–200 y 230–320: 3D-Stift (graues Rasterbild, weicher Schatten). Links x 130–195 y 460–530: grosses 3D-„T“ in Grau-Silber (Raster). Rechts x 1240–1365 y 525–585: blauer Zylinder mit Glow-Hellblau (Raster). Mittig-links x 285–340 y 240–285: Kreis mit Kompass-Icon, sehr schwach.
- Hintergrund: warmes Off-White ~#F6F6F4; Konstruktionslinien (Fibonacci-Spirale rechts x 1080–1420 y 280–520, feine Rasterlinien links) in ~#DADADA, Opazität ~40 %.
- Nachbau: `body{background:#F6F6F4}`; Linienraster als SVG `stroke:#000; stroke-opacity:.08; stroke-width:1` mit `pointer-events:none; aria-hidden`. 3D-Objekte als transparente PNG/WebP, `position:absolute`, ausserhalb des Textrahmens.
- Warum: Kontrastarm (<10 % Luminanzdifferenz), lenkt nicht ab. Slop-Gefahr: 3D-Deko ohne Bezug wird auf fremden Seiten schnell Stockdeko. Hier trägt es das Thema „Design-Werkzeug“.

### 1.5 Feature-Pills (y 380–405, zentrierte Reihe)
- Geometrie: 5 Pills, Höhe ~28px, Padding 6px 14px, Radius 9999, Gap 10px, Zeile zentriert.
- Material: Hintergrund Lime-Tint ~#D9FFB0 (identisch Announcement-Bar), Text Graphit #222, 14px Medium. Kein Border, kein Schatten.
- Nachbau: `<ul class="pills">` Flex `flex-wrap:wrap; justify-content:center; gap:10px`; `li{background:#D9FFB0;border-radius:999px;padding:6px 14px;font:500 14px/1 …}`.
- Bewertung: Fünf Einwand-Beantworter vor dem Beweis. Zweite Textebene vor dem Video — auf Mobil zwei Zeilen (home-mobile-settled.png y 530–630). Für Dienstleister zu viel Inhalt.

### 1.6 CTA-Paar (y 452–500)
- Primär „Desktop herunterladen“: Graphit ~#1A1A1A, Höhe ~50px, Padding 0 24px 0 12px, Radius 9999, links Icon-Kreis 30px in Lime ~#7CFF2E mit dunklem Pfeil-nach-unten (Kontrast-Flip), Text weiss 16px Semibold. Weicher Drop-Shadow ~`0 8px 24px rgba(0,0,0,.18)` (sichtbar unten als dunkler Hof, x 480–715 y 500–520).
- Sekundär „Join Discord Credits“: weiss, 1px Border ~#D4D4D4, gleiche Höhe, Discord-Icon 20px, Text Graphit 16px Semibold, Badge „Credits“ Lime-Pill 22px Höhe, Text 12px Bold.
- Nachbau: `a.btn{display:inline-flex;align-items:center;gap:12px;height:50px;border-radius:999px;padding:0 24px 0 10px}`; `.btn-primary .ico{width:30px;height:30px;border-radius:50%;background:#7CFF2E;color:#111}`; `.btn-secondary{background:#fff;border:1px solid #D4D4D4}`. Badge `span{background:#7CFF2E;border-radius:999px;padding:3px 9px;font:700 12px/1}`.
- Warum: Das grüne Icon ist der einzige Vollton-Akzent im Hero neben Griffen. Reihenfolge Dark→Outline klar. Fehler: Icon ist Deko, Pfeil-nach-unten bedeutet „Download“ nur implizit.

### 1.7 Video-Poster (x 175–1250, y 552–1000+)
- Geometrie: ~1075px breit, Radius ~14px, dunkler Rand 2px Graphit (Kartenrahmen wie Device-Frame), Schatten weich. Innen: Poster aus Person (Foto, mittig), fettem Condensed-Text „I GO TO OPEN DESIGN FIRST.“ links (Display Condensed ~110px, Graphit, Uppercase, Leading 0.9), Label „ONE-PERSON COMPANY“ in Lime ~#6FD82E 18px Semibold Uppercase, Logo oben rechts, Play-Button-Kreis 72px weiss mit dunklem Dreieck, zwei App-Mockups als Einschübe (blaue Karte links unten, „LET'S BUILD“ Karte rechts).
- Unterer Rand y 940–1000: Blur/Fade (Poster läuft in unscharfes Bild aus; Glas-Effekt oder Raster).
- Nachbau: `<button class="video" style="background:url(poster.webp) center/cover"><span class="play"/></button>`, `border:2px solid #1A1A1A; border-radius:14px; aspect-ratio:16/9`. Play als 72px Kreis `background:#fff`, Dreieck als SVG. Text im Poster ist Rasterteil — im Nachbau als HTML-Overlay bauen, nicht rasterisieren.
- Warum: Echtes Gesicht + konkreter Satz = Beweis-Anker statt abstrakter UI. Kein Slop, weil das Testimonial-Format erkennbar ist.

## 2. systems-desktop.png / search-atelier.png (Katalog)

### 2.1 Eyebrow + H1 (x 97, y 148–250)
- Eyebrow „— PLUGIN-BIBLIOTHEK · SYSTEME“: 12px, Tracking ~0.18em, Uppercase, Grau ~#555; vor dem Text kurze Lime-Linie 16×2px (Baseline-Strich); Trennpunkt als „·“.
- H1 „152 Designsysteme.“: ~64px, Weight 800, Tracking -0.03em, Graphit; der Satzpunkt ist Lime ~#7CFF2E (Punkt-Akzent). Linksbündig, kein Rahmen.
- Nachbau: `.eyebrow::before{content:"";display:inline-block;width:16px;height:2px;background:#8CFF3B;margin-right:8px;vertical-align:middle}`; `h1 .dot{color:#7CFF2E}`.
- Warum: Ein farbiger Punkt statt farbiger Headline. Günstige, wiederholbare Akzentregel (auch atelier-desktop.png H1 y 190 „Designsystem.“ mit Lime-Punkt).

### 2.2 Lead-Absatz (y 285–350)
- Max-Width ~680px, 18px, Regular, Grau ~#5A5A5A, Leading 1.45. Inline-Code in Backticks nicht monospaced dargestellt (Slop: Markdown-Backticks sichtbar).

### 2.3 Contribution-Box (x 97–1328, y 402–572)
- Geometrie: volle Containerbreite 1232px, Höhe ~170px, Padding 28px, Radius ~14px, Border 1px ~#DEDEDE, Hintergrund Surface ~#F0F0EE (leicht dunkler als Page). Zwei Spalten: Text links (max 560px), rechts CTA-Reihe.
- Typografie: Titel 20px Semibold Graphit; Body 15px Regular Grau #555, Leading 1.5.
- CTA: „Pull Request öffnen →“ Graphit-Pill Höhe ~50px, Padding 0 24px, deutlicher Schatten (Hof y 505–520); Textlink „Oder ein Issue öffnen →“ 15px Semibold, Underline 1px, Graphit.
- Nachbau: `.box{display:grid;grid-template-columns:1fr auto;align-items:center;gap:32px;padding:28px;border:1px solid #DEDEDE;border-radius:14px;background:#F0F0EE}`.
- Fehler: Box steht vor der Suche und drückt den Hauptjob unter die Falz (Suche erst y 615).

### 2.4 Suchfeld (x 97–516, y 615–654)
- Breite ~420px, Höhe ~40px, Radius 8px, Border 1px #D4D4D4, weisser Hintergrund, Placeholder 15px Grau #777. In search-atelier.png: gefüllt „Atelier“, rechts Clear-X blau (natives Chrome-Clear-Icon, x≈493). Kein Suchicon.
- Nachbau: `<input type="search">` mit `height:40px;border:1px solid #D4D4D4;border-radius:8px;padding:0 14px`.

### 2.5 Systemkarten (3 Spalten, x 97–1328, y 678+)
- Grid: 3 Spalten, Gutter ~20px, Kartenbreite ~397px. Karte: weiss, Border 1px #E6E6E6, Radius ~14px, Padding 24px. Kein Schatten.
- Innen: Mini-Browser-Mockup (Höhe ~218px, Radius 8px, Border 1px, Kopfzeile 22px mit drei 6px-Punkten grau ~#C8C8C8). Mockup-Inhalt: 16px Farbquadrat + Markenname 12px Bold, „Sign up“ Button (Akzent, 24px hoch, Radius 6px, Text weiss 11px Bold), Headline „Build something people love.“ 17px Bold in Akzentfarbe (Agentic Orange #F26A1B, Airbnb Violett #5A0FA8 + Rot #E1004A, Airtable Grün #0E6F2B, Atelier Schwarz), Buttons primär Akzent / sekundär Outline (24px, Radius 6px), drei kleine Featureflächen 48px hoch mit 12px Punkt und zwei Placeholder-Balken (grau ~#DCDCDC, 4px hoch, Radius 2px).
- Mockup-Hintergrund pro System: Agentic warm-beige #F5F3EE; Airbnb weiss; Airtable weiss; Atelier creme #F3EFE2 (search-atelier.png).
- Unter dem Mockup: Name 20px Semibold Graphit, Kategorie 14px Grau #666, Beschreibung 14px Grau, (Link abgeschnitten).
- Nachbau: `<article class="card"><div class="mock" style="--bg:…;--accent:…;--fg:…">…</div><h3>…</h3><p class="cat">…</p></article>`; Mockup vollständig aus HTML/CSS mit CSS-Variablen, keine Bilder. Balken als `div{height:4px;border-radius:2px;background:#DCDCDC}`.
- Warum: Identische Struktur = kontrollierter Vergleich. Fehler: Airbnb-Karte zeigt Violett-Text, Detailseite (airbnb-preview.png) Graphit-Text — Token-Inkonsistenz zwischen Katalog und Detail.

## 3. atelier-desktop.png (Detailseite, Kopf)

- Layout: Hauptspalte x 123–1050 (~928px), rechte Inhaltsnavigation x 1107–1330 (Sticky, „AUF DIESER SEITE“ 11px Tracking 0.15em Grau, Liste 15px Graphit mit 1px linker Trennlinie in Grau ~#DDD, Einträge 34px Abstand).
- Kopf zentriert innerhalb Hauptspalte: Eyebrow Breadcrumb Lime („— PLUGIN-BIBLIOTHEK · SYSTEME · ATELIER ZERO“ 12px Tracking 0.18em, Farbe Lime-Dunkel ~#5FCC1E), H1 ~64px Weight 500 (leichter als Katalog-H1! Sichtbar Medium, nicht Black) mit Lime-Punkt, Lead 18px Grau max 680px Leading 1.5.
- CTA-Reihe y 352–402: Graphit-Pill „Plugin nutzen →“ 50px mit Schatten; Outline-Pill „Auf GitHub ansehen →“ 50px Border 1px #D4D4D4; runder Share-Button 48px Outline mit Share-Icon.
- Sektionstitel „Im Kontext ansehen“ 22px Semibold linksbündig; Beschreibung 16px Grau.
- Preview-Frame (x 123–1050, y 563+): weisse Karte, Border 1px #E3E3E3, Radius 12px, Browser-Kopfzeile 48px (drei Punkte 8px grau, URL-Pill „atelier-zero.com“ grau #EDEDED Radius 999 13px Text), darunter Mock-Website mit Padding 30px: Nav (Schwarz-Kreis-Logo 22px + Name 17px Bold; Links 14px Grau; „Sign up“ Schwarz Button 38px Radius 6), Badge „NEW · LIVE PREVIEW“ (Surface #E9E9E9, 12px Bold Tracking 0.08em, Radius 999, 26px hoch), H2 „Build something people love.“ ~40px Bold Helvetica/Arial (Schriftwechsel im Mockup sichtbar: enger, neutraler als Albert Sans), Sub 14px Grau, Buttons „Get started“ Schwarz 40px Radius 6 / „Learn more“ Outline; drei Feature-Karten Border 1px Radius 8 Hintergrund #F7F7F7 mit 24px schwarzem Quadrat Radius 4.
- Nachbau Frame: `.frame{border:1px solid #E3E3E3;border-radius:12px;overflow:hidden}.frame-bar{height:48px;display:flex;gap:6px;align-items:center;padding:0 20px;border-bottom:1px solid #EEE}.dot{width:8px;height:8px;border-radius:50%;background:#C8C8C8}`.
- Fehler (REPORT bestätigt): Vorschau ist weiss/schwarz, Katalogkarte creme; DESIGN.md-Text nennt Papier #efe7d2 und Coral #ed6f5c. Drei Schichten laufen auseinander.

## 4. atelier-tokens.png (Token-Tabelle)

- Layout: drei Spalten (x 123–410, 443–730, 763–1050), Spaltenbreite ~287px, Gruppen mit Uppercase-Label 11px Tracking 0.15em Grau #666, darunter Zeilen 26px Höhe.
- Zeile: 16px Swatch (Farbe: Quadrat Radius 3px mit 1px Border; Radius-Tokens als Kreis/abgerundetes Quadrat mit dem tatsächlichen Radius gefüllt Schwarz), Tokenname Mono 13px Graphit, Wert Mono 12px rechtsbündig Grau #666. Lange Werte werden abgeschnitten („color-mix(in oklab,…“ , „0 16px 40px rgba(0, 0, 0…“) — Slop: unkopierbar.
- Gelesene Werte (exakt aus dem Bild): bg #ffffff, surface #f7f7f7, surface-warm #eeeeee, fg #111111, fg-2 #3a3a3a, muted #707070, meta #111111, border #d9d9d9, border-soft #eeeeee, accent #111111, accent-on #ffffff, success #168a46, warn #b7791f, danger #c53030; text-xs 12 / sm 14 / base 16 / lg 18 / xl 24 / 2xl 36 / 3xl 54 / 4xl 76; leading-body 1.52, leading-tight 1.06, tracking-display -0.025em; space 4/8/12/16/20/24/32/48; section-y 96/68/48; radius 4/8/12/9999; elev-ring `0 0 0 1px var(--border)`; focus-ring `0 0 0 3px rgba(17,17,17,…)`; motion 150/240ms, ease cubic-bezier(0.2,0,0,…); container 1180, gutter 36/24/16; font-display/body „Helvetica Neue“, Arial; font-mono „SF Mono“, ui-monospace.
- Nachbau: `<dl class="tokens">` mit `display:grid;grid-template-columns:16px 1fr auto;column-gap:10px;row-gap:8px`; Swatch `style="background:var(--x)"`; Werte `white-space:nowrap;overflow:hidden;text-overflow:ellipsis` plus `title`/Copy-Button.
- Warum: Spezifikation als visuelles Material (Swatch + Form). Fehler: Abschneiden ohne Vollwert.

## 5. airbnb-preview.png

- Gleicher Frame wie Atelier; Tokens: bg weiss, fg #222, Akzent Coral #FF385C (Logo-Quadrat 22px Radius 6, Badge-Tint #FFE3E9 mit Coral-Text 12px Bold Tracking, „Sign up“ und „Get started“ Coral-Buttons 40px Radius 8, Text weiss Semibold). Headline ~40px Bold in Cereal-ähnlicher Sans (Fallback sichtbar: Segoe/Noto-artig, Bold breit). Feature-Karten weiss, Border 1px #E6E6E6, Radius 12, Icon-Quadrat Coral 24px Radius 6, Titel 15px Bold, zwei Balken grau.
- Unter dem Frame: Label „Website“ 14px Grau (y 671). Zweiter Frame „Slides“ (y 700+): Karte 16:9-ähnlich, links Badge „KEYNOTE“ Coral-Tint, Titel „Design that ships itself.“ ~40px Bold, rechts Chart-Karte Border 1px Radius 12 mit vier Balken (Coral-Vollton für Hauptbalken, Coral-Tint #FFD9E1 für Nebenbalken, Radius oben 6px), Folienzähler „01 / 12“ 13px Grau rechts oben.
- Nachbau Chart: reine Divs `display:flex;align-items:flex-end;gap:12px;height:220px`; Balken `border-radius:6px 6px 0 0`.
- Warum: Portabilität desselben Tokensets auf zwei Artefakte. Fehler: Zeigt weder Fotografie noch Buchungslogik; ist generisch.

## 6. Mobil (390px)

### 6.1 home-mobile.png vs home-mobile-settled.png
- Announcement-Bar 52px hoch, Lime-Tint, Badge + Fetttext + Pfeil-Pill + X. Header: Logo 36px, Burger-Button 40×40 Outline Radius 10 (Border 1px #D4D4D4), Download Graphit-Pill 36px.
- Hero-Rahmen x 15–360, y 192–496 (Rand 1px Lime, 8px Griffe): H1 ~30px Bold zentriert 3 Zeilen; Subline ~24px Semibold 5 Zeilen mit Marker. Textblock ≈ 300px = 36 % Viewport. Erste Aufnahme: Wörter „Bilder und Videos“ noch geblurrt (Reveal-Animation mit `filter:blur()` per Wort, Wort-für-Wort-Stagger). Settled-Aufnahme scharf.
- Pills in 3 Zeilen, zentriert, Gap 10px. CTA-Stack: Primär 56px hoch (y 671–727) mit Schatten, Sekundär 46px Outline darunter. Dekor (T, blauer Zylinder) verkleinert oben rechts/links.
- Nachbau Reveal: `.word{display:inline-block;filter:blur(8px);opacity:.4;animation:reveal .4s ease-out forwards;animation-delay:calc(var(--i)*60ms)}` + `@media (prefers-reduced-motion:reduce){.word{animation:none;filter:none;opacity:1}}`.
- Fehler: Subline fast gleiche Grösse wie H1 → keine Hierarchie; Video unter der Falz.

### 6.2 mobile-menu.png
- Overlay-Panel: weiss, Radius ~16px, innerhalb 12px Rand, Shadow, eigene Scrollbar. Burger wird X (gleiche 40px-Box). Struktur: Gruppentitel „Produkt“ 17px Medium; Untertitel „FUNKTIONEN/ANWENDUNGSFÄLLE/ROLLEN/TOOLS“ 11px Uppercase Tracking 0.12em Grau; Einträge 17px Regular Graphit, Zeilenhöhe 42px, 1px Trennlinie #EAEAEA, linke Einrückung 24px.
- Nachbau: `<nav aria-expanded>` Panel `position:fixed;inset:120px 12px 12px;overflow:auto;background:#fff;border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.15)`.
- Fehler: >20 Einträge vollständig aufgeklappt; kein Akkordeon.

### 6.3 mobile-faq.png
- Header schwebend als Kapsel (Glas, blur, Radius 999, Border 1px, Schatten) über Inhalt (y 63–127); der Inhalt beginnt darunter abgeschnitten („94.6K+ Sterne · Apache-2.0 · Kostenlos“ 14px Grau) — scroll-margin fehlt.
- FAQ-Item: Nummer „01“ 12px Grau Mono-artig Tracking links (x 36), Frage 20px Regular Graphit (max ~200px, umbricht), rechts Toggle-Kreis 32px: geöffnet Graphit-Fill mit weissem X, geschlossen Outline 1px mit Plus. Antwort 16px Grau #555 Leading 1.55, Padding 16px 0. Link „Mehr erfahren →“ Lime-Dunkel ~#5FCC1E 15px Medium. Trenner 1px #DDD zwischen Items, Item-Padding 20px 0.
- Nachbau: `<details><summary><span class="n">01</span><span class="q">…</span><span class="tg"/></summary><div class="a">…</div></details>`; `details[open] .tg{background:#1A1A1A;color:#fff}`; `summary{display:grid;grid-template-columns:32px 1fr 32px;gap:16px;list-style:none}`; `#faq{scroll-margin-top:96px}`.
- Hintergrund unten leicht geblurrt (nächstes Item y 770+ verschwommen) — Reveal-Animation beim Scrollen.

## 7. Gemeinsamkeiten im Paket

- Ein Akzent, zwei Stufen: Vollton Lime (~#7CFF2E/#8CFF3B) nur für Punkt-Signale (Satzpunkt, Griffe, Rahmen, Icon-Kreis, Badge, Statuspunkt, aktive Underline); Tint (~#D9FFB0) für Flächen (Bar, Pills, Marker). Nie Lime als Text auf weiss ausser Eyebrow in dunklerem Ton.
- Action = Graphit-Pill (Radius 9999, 36px Header / 50px Hero) mit weichem Schatten; Sekundär = Outline-Pill 1px #D4D4D4. Kein farbiger Button irgendwo.
- Karten/Frames: Radius 12–14px, Border 1px #E3E3E3–#E6E6E6, weiss auf Off-White, kein Schatten. Buttons in Mockups: Radius 6–8px.
- Typografie: eine Sans (Albert Sans) in 400/500/600/700/800; Eyebrows Uppercase 11–12px Tracking 0.15–0.18em; Display negatives Tracking; Body Grau statt Schwarz.
- Layout: Container ~1248px (96px Ränder bei 1440), Katalog 3 Spalten Gutter 20px, Detail 928px + 224px Sidebar.
- Spacing-Rhythmus: 8er Raster; Sektionen ~96px; Kopf→Lead 32px; Lead→CTA 40px; Karten-Padding 24px; Pill-Gap 10px.

## 8. Farbrollen-Tabelle (geschätzt aus Screenshots)

| Rolle | Hex | Beleg |
|---|---|---|
| Page | #F6F6F4 | home-desktop.png Hintergrund |
| Surface | #F0F0EE | systems-desktop.png Contribution-Box |
| Raised/Card | #FFFFFF | Systemkarten, Preview-Frames |
| Border | #E3E3E3 / #D4D4D4 (Buttons) | Karten; Outline-Pills |
| Text | #1F1F1F | Headlines, Nav |
| Muted | #555–#666 | Lead-Absätze, Kategorien |
| Action | #1A1A1A | Download, Pull Request, Plugin nutzen |
| Accent (Signal) | #7CFF2E–#8CFF3B | Griffe, Satzpunkt, Icon-Kreis, Badge |
| Accent-Tint | #D9FFB0 | Bar, Pills, Marker (#B7FF7A) |
| Accent-Text | #5FCC1E | Breadcrumb, „Mehr erfahren“ |

## 9. Dos / Don'ts

Dos: Eine Signalfarbe, zwei Stufen. Produktmetapher aus dem Nutzerjob. Hero-Text als DOM. Identische Mockup-Bühne für Vergleich. Native details/summary. Tokens als Swatch+Wert. Deko kontrastarm und ausserhalb des Textrahmens.

Don'ts: Subline im Gewicht der H1. Content-Box vor dem Suchfeld. Tokenwerte abschneiden. Markdown-Backticks im Lead. Mobilmenü mit 20+ offenen Einträgen. Anker unter Glas-Header ohne scroll-margin. Drei Evidenzschichten (Text/Tokens/Render) ungeprüft mischen.

## 10. Unlesbar / nicht belegt

- Exakte Radien von Header-Kapsel und Buttons (nur geschätzt).
- Fontfamilie im Airbnb-Mockup (Fallback sichtbar, nicht identifizierbar).
- Reveal-Dauer/Easing (nur Zwischenstand vs. settled).
- Hover-/Fokus-Zustände aller Buttons.
- Footer (in keinem Bild sichtbar).
- Kartenlink-Text unter den Systemkarten (abgeschnitten).
- Poster-Unterkante home-desktop.png y 940–1000 (Blur, Inhalt unklar).
