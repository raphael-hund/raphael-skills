# designmd-me-1 — Belegpaket-Analyse (platform-images)

Quelle: `research/designmd_me/evidence/`, 7 Bilder, gesichtet 07.09.2026. Desktop-Screens 1280×800 (CSS-px = Bild-px). Mobile 780×1688 (Scale nicht belegt, Werte in Bild-px). Source-Screens 1440×900. Farben per Pixel-Sampling (Pillow), Masse per Kantenmessung. Der HTML-Export (`home.html`, `discover.html`) enthält nur den Vercel-Security-Checkpoint, kein Produkt-CSS — Fonts sind daher nur visuell klassifiziert, nie belegt.

## 1. Globale Farblogik (Produkt designmd.me, Dark Mode)

| Rolle | Hex (gemessen) | Beleg |
|---|---|---|
| Page | `#0F1012` | home-desktop.png, Fläche x640/y150 |
| Surface (Card, Input, Chip, Secondary-Button) | `#17181B` | home-desktop.png Input-Card y463–557; stripe-desktop.png Token-Panel |
| Surface-2 (Discover-Card-Body) | `#131416` | discover-desktop.png Kartenkörper y760–800 |
| Raised-Header (Panel-Kopf) | `#1A1B1E` (neutral) / `#1B202C` (blau getönt) | home-desktop.png Preview-Kopf y241–275; stripe-desktop.png Tokens-Kopf y427–495 |
| Inset-Row (Token-Zeile) | `#15151A` | home-desktop.png y362–385 |
| Border | `#28292E` (Card) / `#222428` (Nav-Pill) | home-desktop.png Kanten x85 / x485 |
| Action | `#4E81EE` | Sign in, CTA, Copy Prompt, Raw-Segment, Eyebrow, Italic-Wort — alle Bilder |
| Action-Tint (aktiver Chip) | `#151B28` + Border ~`#2A3C66` | discover-desktop.png Chip „All" x115–155 |
| Accent-Purple (Badge, Figma) | `#252039` Fläche, `#8957E5`-Text | home-desktop.png „VARIABLES" x1100–1168/y330–344 |
| Promo-Gradient | `#7928F4 → #8B20F0 → #B119D9` | home-desktop.png Banner y0–38 |
| Text-Primary | `#F5F6F8`/`#FFFFFF` | Headlines |
| Text-Muted | `#9498A2` / `#9BA0AA` | Body-Absätze |
| Text-Label | `#80838C` | „PRIMARY"/„NEUTRAL" stripe-desktop.png y523 |
| Alert-Dot | `#FF3B30`-ähnlich | home-desktop.png „What's new" x997/y55 |

Regel: eine einzige Aktionsfarbe (Blau) trägt Klick, Auswahl, Eyebrow und typografischen Akzent. Purple nur für Promo-Banner und Figma/Variables-Kontext. Kein Grün/Rot ausser Swatch-Inhalte.

## 2. home-desktop.png

### Promo-Banner (y0–38)
- Geometrie: 38 px hoch, volle Breite, Inhalt zentriert, Close-X rechts bei x1253.
- Material: horizontaler Verlauf `#7928F4` (links) → `#B119D9` (rechts). Kein Schatten.
- Typo: „FLASH SALE" 13 px, 700, uppercase, Tracking ~0.08em, weiss; Trenner „·"; Text „up to 40% off all credits." 13 px, 500. Pill „Claim the offer →" 24 px hoch, Radius 999, Fläche `rgba(255,255,255,.18)`, weiss 600.
- Nachbau: `<div class="promo">` mit `background:linear-gradient(90deg,#7928F4,#B119D9)`, Flex, `gap:10px`, Pill als `<a>` mit `background:rgba(255,255,255,.18);border-radius:999px;padding:4px 12px`.
- Wirkung: kontrastiert als einzige warme Fläche; Fehler: Marketing-Rauschen über Primärnav, verschiebt die Fold um 38 px.

### Header/Nav (y38–90)
- Geometrie: 52 px hoch; Logo-Tile 24×24, Radius 6, Blau `#4E81EE` mit weissem Raute-Glyph; Wortmarke 18 px, 600, weiss. Nav-Items rechts: Pills 26 px hoch (y52–78), Radius 999, Border 1 px `#222428`, Fläche transparent/Page, Padding 0 14 px, Icon 14 px + Text 13 px, 500, Farbe `#C3C4C5`; Gap 8 px. Credits-Pill „⚡ 4" gleiche Pille, Zahl blau. „Sign in" 76×26, Radius 999, Fläche `#4E81EE`, weiss 600. Mond-Icon 16 px als Theme-Toggle.
- Roter Alert-Dot 6 px am Pill-Rand oben rechts (x997/y55).
- Nachbau: `<header>` sticky, `height:52px`, `padding:0 85px` (Container 85–1189 = 1104 px Content). Nav `<a>` als `display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 14px;border:1px solid #222428;border-radius:999px;font:500 13px/1 Inter`. Dot: `::after{position:absolute;top:-2px;right:-2px;width:6px;height:6px;border-radius:50%;background:#FF3B30}`.
- Wirkung: alle Nav-Elemente sind gleich hohe Pillen → Rhythmus; Sign-in als einzige gefüllte Pille. Slop: 6 Pillen + Dot + Theme-Toggle = zu viele gleichwertige Zielflächen.

### Hero links (x85–636, y173–640)
- „New — import to Figma →" Badge: 180×26, Radius 999, Fläche `#171523` (Purple-Tint), Border 1 px ~`#2A2745`, Text 12 px weiss, Figma-Icon 14 px.
- Eyebrow „WEBSITE → DESIGN SYSTEM": 11 px, 700, uppercase, Tracking ~0.18em, Blau `#4E81EE`. Abstand Badge→Eyebrow 18 px, Eyebrow→H1 20 px.
- H1: 2 Zeilen, ~46 px, 700, Tracking −0.02em, Zeilenhöhe ~1.1 (Zeilen y268/y318 → 50 px), weiss. Wort „any" in Serif-Italic (Instrument-Serif-artig, nicht belegt), Blau `#4E81EE`, gleiche Grösse. Gemischte Familie innerhalb eines Satzes.
- Lead: 17 px, Zeilenhöhe 1.55, `#9498A2`, max-width ~440 px; Schlüsselbegriffe (`DESIGN.md`, `HTML preview`, `Figma import`) 600 weiss → Zwei-Ton-Absatz.
- Nachbau: `h1{font:700 46px/1.1 Inter;letter-spacing:-.02em} h1 em{font:italic 400 1em/1 "Instrument Serif",serif;color:#4E81EE}`; Lead `p{font:400 17px/1.55;color:#9498A2} p strong{color:#fff;font-weight:600}`.
- Wirkung: Eyebrow-Blau, Italic-Blau und Blau-Button bilden eine vertikale Farbspur zur Aktion.

### URL-Input-Card (x85–636, y463–557)
- Geometrie: 551×94, Radius ~14, Border 1 px `#28292E`, Fläche `#17181B`. Innen: Link-Icon 16 px + Placeholder „linear.app" 18 px `#8A8E98` (y494). Zweite Zeile y532: Toggle 22×12 (Track `#3A3C41`, Knob 10 px weiss links = aus), Layers-Icon, Label „Multi-page" 13 px muted. Submit rechts unten: 32×32, Radius 8, Fläche `#2F4882` (Blau abgedunkelt = disabled-State), Pfeil-Icon weiss/grau.
- Nachbau: `<form class="url-card">` Grid 2 Zeilen, `padding:18px 20px`, `input` ohne eigene Border (`background:none;font-size:18px`), Footer-Reihe `display:flex;justify-content:space-between`; Submit `button[disabled]{background:#2F4882;opacity:1}` aktiv `#4E81EE`.
- Wirkung: Karte statt Feld → wirkt wie Konsole; Slop: kein sichtbares Label, Toggle ohne Zustandsbeschriftung.

### TRY-Reihe (y573–599) und Meta-Reihe (y629)
- „TRY" 11 px muted uppercase, dann 5 Pillen 26 px hoch, Radius 999, Border 1 px `#28292E`, Fläche Page, Favicon 14 px + Domain 13 px weiss 500, Gap 8.
- Meta: drei Items „◆ 4 credits / spec · HTML + Figma add-ons · No card to start", Raute 6 px Blau `#395DA9`, Text 13 px muted.
- Nachbau: `ul{display:flex;gap:8px}` Pills wie Nav-Pills; Meta `li::before{content:"◆";color:#4E81EE;font-size:8px;margin-right:8px}`.

### Preview-Mockup rechts (x701–1189, y241–569)
- Geometrie: 488×328, Radius 12, Border 1 px `#28292E`, Fläche `#191820`–`#15151A` (leicht purple-getönt). Titelleiste 34 px, `#1A1B1E`: drei Dots 8 px `#3A3B40` links, rechts „preview · github.com" 11 px mono muted. Tab-Reihe 34 px: „DESIGN.md" / „HTML" (aktiv, Fläche `#26272C`, Radius 6) / „Figma", 13 px, Icons 14 px; rechts blauer Fortschrittsbalken 62×2 px Blau. Panel-Kopf: 16 px Purple-Quadrat Radius 4, „DesignMD Tokens" 13 px 600 weiss, Badge „VARIABLES" 10 px 700 Tracking 0.1em, Fläche `#252039`, Text `#8957E5`, Radius 4.
- Token-Rows: 5 Zeilen à 36 px, Gap 4, Fläche `#15151A`, Radius 6, links Swatch 16×16 Radius 4 (Blau/Grün/Purple) bzw. `#`-Glyph in Box, Name mono 11 px muted (`color/primary`), rechts Wert mono 11 px weiss (`#1F6FEB`). Fussleiste: 5 Farbpillen 76×20, Radius 6 (Blau, Grün, Purple, Rot, Schwarz).
- Nachbau: `.window{border:1px solid #28292E;border-radius:12px;background:#17161D;overflow:hidden}` + `.titlebar{height:34px;display:flex;align-items:center;padding:0 12px;background:#1A1B1E}` + `.row{display:flex;justify-content:space-between;height:36px;padding:0 12px;background:#15151A;border-radius:6px;font:11px/1 ui-monospace}`.
- Wirkung: Fake-Window = Proof, dass Output strukturiert ist; Slop: Fortschrittsbalken ohne Funktion, Farbpillen ohne Label, Purple-Tint kollidiert mit neutraler Card-Fläche links.

### Floating Elemente
- Counter-Pill unten rechts (x975–1250, y743–777): 275×34, Radius 999, Fläche `#17181B`, Border 1 px, Blitz-Icon blau, „76,033+" 14 px 700 weiss, Rest 14 px muted. Fixed, `bottom:22px;right:28px`.
- X-Share-Button rechts (x1228–1268, y378–420): 40×40 Quadrat Radius 8 Fläche `#17181B`, weisses X-Logo, an Viewport-Kante geklebt. Slop: überlappt Content-Layer, kein Bezug zur Hero.
- Zweiter Abschnitt (y733–780): Eyebrow „THE PIPELINE" 11 px Blau tracked, H2 „From URL to production in four steps" 30 px 700 weiss. Abstand Hero-Ende (y640) → Eyebrow 93 px.

## 3. discover-desktop.png

- Banner + Header identisch zu home (y0–90).
- Back-Link „← Back to DesignMD" (y183): 15 px muted, Pfeil-Icon 14 px, links am Container.
- H1 zentriert (y243–290): „Explore real" 46 px 700 weiss + „design systems" Serif-Italic Blau `#4D80ED` (Pixel-Sample 357 Treffer in x628–905). Gleiche Grösse, keine Gewichtsdifferenz.
- Sub (y318–390): 17 px, Zeilenhöhe 1.5, `#9498A2`, max-width ~470 px, zentriert, 3 Zeilen.
- CTA „✦ Get your site featured" (x530–743, y424–466): 213×42, Radius 999, Fläche `#4E81EE`, Text 15 px 600 weiss, Sparkle-Icon 16 px links. Abstand Sub→CTA 34 px.
- Filter-Chips (y496–528): 11 Chips à 32 px, Radius 999, Border 1 px `#28292E`, Fläche Page, Text 13 px `#969AA4`, Padding 0 16 px, Gap 8, zentriert, Gesamtbreite 1050. Aktiv „All": Fläche `#151B28`, Border blau-getönt, Text weiss.
- Card-Grid (y560–): 3 Spalten à 351 px, Gap 25 px (85–436 / 462–812 / 838–1189). Card: Radius 12, Border 1 px `#28292E`, Fläche `#131416`, Bild oben 351×190 (Cover, Radius nur oben), darunter 4 px Palette-Strip aus Token-Farben (Stripe: Blau-Segmente; Vercel: Purple/Orange/Blau/Schwarz), Body Padding 16: Domain 15 px 600 weiss (y783), Beschreibung 13 px muted (abgeschnitten).
- Overlay auf Bild oben links: Heart-Pill „♡ 3" 48×24 Radius 999, Fläche `rgba(255,255,255,.85)` mit Blur, Text/Icon dunkel; oben rechts Bookmark-Quadrat 30×30, Radius 8, gleiche Fläche.
- Nachbau: `.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}` `.card{border:1px solid #28292E;border-radius:12px;background:#131416;overflow:hidden}` `.card img{aspect-ratio:351/190;object-fit:cover;object-position:top}` `.palette{display:flex;height:4px} .palette span{flex:1}` `.like{position:absolute;top:12px;left:12px;backdrop-filter:blur(8px);background:rgba(255,255,255,.85);border-radius:999px;padding:4px 10px;font:600 13px}`.
- Wirkung: Palette-Strip macht Token-Extraktion sichtbar, ohne Text. Slop: Screenshots heller als Page → hoher Kontrast frisst die Cards; kein Ergebniszähler, kein Leerzustand sichtbar.

## 4. stripe-desktop.png und anthropic-desktop.png (Detailseite, identisches Template)

- Back-Link (y159) 15 px muted.
- Eyebrow Kategorie (y201): „DEVELOPER TOOLS"/„AI" 11 px 700 Blau, Tracking 0.18em.
- H1 (y223–261): Domain 48 px 700 weiss, Tracking −0.02em; rechts daneben „Visit ↗"-Button 76×37 (x339–414), Radius 8, Border 1 px `#28292E`, Fläche `#17181B`, Text 15 px 500 weiss; Gap 14 px zur H1.
- Action-Cluster rechts (x827–1188, y224–261): „Copy Prompt" Split-Button 172×37, Radius 8, Fläche `#4E81EE`, Icon 16 px, Text 15 px 600; Dropdown-Segment 34 px breit mit 1 px hellerer Trennlinie (`#9EBAF5`-Sample = weiss @ 40 %). Like-Button „♡ 3" 54×37, Bookmark „Bookmark" 118×37, beide Radius 8, Border 1 px, Fläche `#17181B`. Gap 10 px.
- URL-Zeile (y287): mono 13 px Blau `#4E81EE` + „↗" 10 px. Abstand H1→URL 26 px.
- Beschreibung (y310–352): 17 px `#9498A2`, Zeilenhöhe 1.5, max-width ~700 px.
- Meta-Chips (y372–399): 27 px hoch, Radius 999, Border 1 px, Text 13 px; aktiv „14 colors"/„16 colors": Fläche `#151B28`, Border blau, Text weiss; Font-Chip „sohne-var"/„Anthropic Sans" in Mono 13 px; Gap 8.
- Viewer-Card (x85–824, y427–799+): 739 px breit, Radius 16, Border 1 px, Fläche `#17181B`, Padding 16; Screenshot innen Radius 8 (703 px breit), Overlay-Buttons prev/next 34×34 Kreis, Fläche `#8C8C8C` @ ~70 %, weisser Chevron 14 px, vertikal mittig, 10 px vom Bildrand.
- Token-Panel (x849–1188, y427–799+): 339 px breit, Radius 16, Border 1 px, Kopf 68 px Fläche `#1B202C` (blau getönt) mit 10 px Blau-Quadrat Radius 3 + „Design tokens" 15 px 600 weiss + „Extracted from stripe.com" 13 px muted; Body `#17181B`, Padding 16. Section-Label „PRIMARY" 11 px 700 `#80838C` Tracking 0.12em. Swatch-Grid 4 Spalten à 68 px, Gap 9: Swatch 68×30 Radius 6 oben, darunter Hex mono 10 px muted auf `#17181B`, Zellen mit 1 px Border Radius 8. Scroll-Track rechts sichtbar (x1183, 4 px, `#2C2C2C`).
- Layout: 2 Spalten 739 / 339 (≈ 2.18:1), Gap 25. Content-Container 1104 px.
- Nachbau: `.detail{display:grid;grid-template-columns:1fr 339px;gap:24px}` `.tokens header{background:#1B202C;padding:16px}` `.swatches{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}` `.swatch{border:1px solid #28292E;border-radius:8px;overflow:hidden} .swatch i{display:block;height:30px} .swatch code{font:10px ui-monospace;padding:6px 8px;color:#9BA0AA}`.
- Wirkung: Beweis durch Nebeneinander (Original links, Extrakt rechts). Slop: Counter-Pill (y743–777) überlagert das Token-Panel (stripe-desktop.png x975–1250) → fixed Element ohne z-Index-Rücksicht; Swatch-Hex 10 px unter Lesbarkeitsgrenze.
- anthropic-desktop.png Screenshot im Viewer (y447–800): Anthropic-Hero „AI research and products that put safety at the frontier" — Unterstreichungen als Hover-/Link-Stil, Cookie-Modal dunkel unten rechts. Belegt: Cookie-Banner wird mit-eingefroren → Extraktions-Rauschen.

## 5. anthropic-mobile-state2.png (780 px Bild-breite, Scale nicht belegt)

- Header (y0–100): Logo-Tile 46 px, Wortmarke 26 px 600; rechts „◎ Discover"-Pill 174×47 Radius 999 Border; „Sign in" 128×47 Radius 999 Blau; Hamburger 62×62 Kreis Border mit rotem Dot 14 px oben rechts. Header ist sticky mit halbtransparenter Fläche + Blur: „Bookmark"-Button (y100–145) scheint abgedunkelt durch den Header (Text „Bookmark" oben abgeschnitten, ~50 % Deckung) → `backdrop-filter:blur`.
- URL mono 28 px Blau (y175); Beschreibung 30 px muted, Zeilenhöhe 1.5 (y220–350).
- Chips (y385–510): 2 Zeilen, 54 px hoch, Radius 999, Gap 16, Wrap; aktiv „16 colors" `#151B28` mit blauer Border; Mono-Chip „Anthropic Sans".
- Viewer-Card (x32–735, y566–1240): Radius ~28, Border 1 px, Fläche `#17181B`, Padding 30; Screenshot innen Radius 12; prev/next Kreise 74 px `#8C8C8C`/70 %; Caption „2 / 4 — Home \ Anthropic" 28 px muted zentriert (y1036); Thumbnail-Strip (y1075–1185): 4 Thumbs 190×110, Radius 8, aktiv mit 3 px Blau-Border; native horizontale Scrollbar sichtbar (y1195–1210, Thumb `#6B6B6B`, Track `#2C2C2C`) → Slop.
- Section „Preview" (y1300–1420): H2 42 px 700 weiss + Inline-Sub „the generated design system" 28 px muted (gleiche Zeile, Baseline-Aligned); Body 30 px muted mit weissen 600-Keywords „Visual"/„Raw".
- Segmented Control (y1459–1540): Container 282×81, Radius 999, Border 1 px, Fläche `#151619`; Segment „Visual" transparent muted; „Raw" aktiv 116×70 Radius 999 Fläche `#4E81EE` weiss 600, 5 px Inset. Rechts zwei Download-Pillen „⤓ DESIGN.md" 214×70, „⤓ HTML" 146×70, Radius 999, Border 1 px, Fläche Page.
- Code-Block (y1565–): Border 1 px, Radius ~24, Fläche Page `#0F1012`, Zeilennummern mono 28 px `#2B2C31`/muted, Code mono 28 px weiss („---", „name: Anthropic").
- Nachbau Segmented: `.seg{display:inline-flex;padding:5px;border:1px solid #28292E;border-radius:999px;background:#151619} .seg button{padding:0 20px;height:34px;border-radius:999px;color:#9BA0AA} .seg button[aria-pressed=true]{background:#4E81EE;color:#fff}`.
- Mobile-Hinweis: Detail-Actions wrappen untereinander (Bookmark volle Breite); Desktop-Split wird vertikale Reihenfolge Meta → Viewer → Preview → Code. Kein Ergebnis-Sticky-CTA. Thumbnail-Strip braucht `scrollbar-width:none`.

## 6. anthropic-source-screen3.jpg (Original-Marke, Referenz)

- Page `#FAF9F5` (warmes Off-White), kein Grid, kein Grain.
- Nav (y0–68): Wortmarke „ANTHROP\C" 18 px 700 tracked; Items 15 px 500 `#141413`, Chevrons 12 px; „Try Claude" Split-Button 152×36, Radius 8, Fläche `#151513`, Text weiss 15 px; Dropdown-Segment 42 px mit hellerer Trennung.
- Headline „Keep thinking." (y320–420): Serif (Tiempos-artig, nicht belegt), ~96 px, 400, Tracking −0.01em, Farbe `#141413`, zentriert. Verhältnis zu Body 17 px = 5.6×.
- Body (y470–575): 17 px, Zeilenhöhe 1.55, `#71706C`, max-width ~670 px, zentriert, 4 Zeilen.
- CTA (y598–634): „Listen to more hard questions →" 262×36, Radius 8, Fläche `#151513`, Text weiss 15 px 500, Pfeil 14 px.
- „Scroll ↓" Ghost-Button (y824–862): 98×38, Radius 8, Border 1 px `#D6D5CF`, Fläche `#F5F5ED`, Text 15 px `#8B8A85`.
- Cookie-Modal (x993–1430, y612–890): 437×278, Radius 16, Fläche `#151513`, Padding 32; Titel 20 px 500 weiss Serif-Sans-Mix (Sans); Text Serif 14 px `#D9D8D2`; Buttons: „Customize" volle Breite 40 px Radius 8 Border 1 px weiss; „Reject"/„Accept" 2-Spalten Gap 8, Radius 8, Reject Border, Accept Fläche `#FAF9F5` Text dunkel.
- Nachbau: `body{background:#FAF9F5;color:#141413} h1{font:400 96px/1.05 "Tiempos",Georgia,serif;letter-spacing:-.01em}` Buttons `border-radius:8px;height:36px;padding:0 16px`.
- Wirkung: Ein Serif-Satz, ein Absatz, ein Button — Weissraum trägt Hierarchie; Hell/Dunkel-Umkehr im Modal setzt Priorität. Kein Slop im Screen; Cookie-Modal ist Pflichtrauschen.

## 7. stripe-source-screen.jpg (Original-Marke, Referenz)

- Page `#FFFFFF`; Content-Container mit sichtbaren vertikalen Hairlines bei x87 und x1353 (1 px `#E6E6E6`, y75–900) → Layout-Guides als Designmittel.
- Nav (y0–75): Logo 22 px; Items 15 px 500 `#0A2540` mit Chevron 12 px, Gap 44; rechts „Sign in" 85×38 weiss Radius 4 (Border/Schatten nicht messbar), „Contact sales ›" 135×38, Radius 4, Fläche `#5539FD` (Stripe-Purple-Blue), Text weiss 15 px 500.
- Hero-Gradient (x600–1440, y75–760): schräges Band ca. 25° aus `#FC8E13` (Orange) → `#FE88E8` (Pink) → `#80A8FF` (Blau), Kanten weich (Blur ~40 px), liegt hinter dem Text; Text auf Gradient bleibt lesbar durch Gradient-Text-Farbverschiebung.
- Stat-Line (y209): „Global GDP running on Stripe:" 15 px 500 `#0A2540` + Wert „1.69524440%" 15 px `#425466` (Live-Zahl als Proof).
- Headline (y265–475): 4 Zeilen, ~52 px, 500, Tracking −0.02em, Zeilenhöhe 1.08; erste Hälfte `#0A2540`, ab „your revenue." Verlauf in Text `#635BFF → #D88EF1` per `background-clip:text` (Sample x1000 = `#D88EF1`).
- CTA (y519–567): „Request an invite ›" 182×48, Radius 4, Fläche `#5539FD`, Text 16 px 500 weiss. Abstand Headline→CTA 44 px.
- Logo-Bar (y690–760): 8 farbige Kunden-Logos, Höhe ~22 px, horizontal gleichmässig, läuft rechts/links aus dem Container (Marquee-Indiz).
- Sektion 2 (y860+): H2 40 px 500 `#0A2540` + Blau-Verlauf für Nachsatz „Grow your …".
- Nachbau: `.hero-bg{position:absolute;inset:0;background:linear-gradient(115deg,#FC8E13 0%,#FE88E8 45%,#80A8FF 100%);clip-path:polygon(...);filter:blur(20px);transform:skewY(-12deg)}` `h1 span{background:linear-gradient(90deg,#635BFF,#D88EF1);-webkit-background-clip:text;color:transparent}`.
- Wirkung: Gradient nur im Hintergrund + im Textakzent, Buttons bleiben flach; Container-Hairlines geben dem Weissraum Struktur. Radius 4 (Stripe) vs Radius 999 (DesignMD) → DesignMD-Preview ersetzt Stripe-Geometrie durch eigene, Bericht-Warnung bestätigt.

## 8. Gemeinsamkeiten im Paket (Produkt designmd.me)

- Ein Page-Ton `#0F1012`, eine Surface `#17181B`, eine Border `#28292E`, eine Action `#4E81EE`. Alle Zustände (aktiv, Eyebrow, Link, Italic-Akzent) sind Ableitungen dieses Blaus.
- Zwei Radius-Familien: 999 (Pills: Nav, Chips, CTA, Toggle, Counter) und 8/12/16 (Buttons mit Icon-Cluster, Cards, Panels, Viewer). Card-Radius wächst mit Kartengrösse: 12 (Grid-Card) → 14 (Input) → 16 (Viewer/Panel).
- Headline-Muster: Sans 700 weiss + ein Wort/Phrase Serif-Italic Blau. Wiederholt auf home und discover.
- Eyebrow-Muster: 11 px, 700, uppercase, Tracking 0.18em, Blau, 20 px über der Headline.
- Body: 17 px muted mit weissen 600-Keywords.
- Mono für alles Maschinelle: URLs, Token-Namen, Hex-Werte, Font-Namen in Chips.
- Proof-Muster: Fake-Window (home), Palette-Strip (discover), Original-Screenshot neben Token-Panel (detail), Counter-Pill „76,033+".

## 9. Spacing-Rhythmus (Desktop)

- Container 1104 px, Rand 85 px bei 1280.
- Vertikal: Banner 38 → Nav 52 → 83 px Luft → Back-Link → 18 → Eyebrow → 20 → H1 → 26 → URL → 24 → Body → 20 → Chips → 28 → Cards.
- Horizontal: Gap zwischen Cards 24–25, zwischen Chips/Pills 8, zwischen Buttons im Cluster 10, Icon→Text 6–8.
- Höhen-Skala Interaktionselemente: 26 (Nav-Pill) · 27 (Meta-Chip) · 32 (Filter-Chip, Submit) · 34 (Counter, Titlebar) · 37 (Detail-Buttons) · 42 (Hero-CTA). Kein reines 8er-Raster; 26/27/37 sind Font-Grösse + Padding-Ergebnisse.

## 10. Dos

- Eine Aktionsfarbe für Klick, Auswahl, Eyebrow und typografischen Akzent.
- Serif-Italic-Wort in Sans-Headline als einziger Schmuck.
- Original neben Extrakt zeigen (Viewer + Token-Panel) statt zu behaupten.
- Palette-Strip 4 px unter Card-Bild als visuelle Metadaten.
- Panel-Köpfe leicht getönt (`#1B202C`) statt zusätzlicher Borders.
- Hairline-Container-Guides (Stripe) und warmes Off-White (Anthropic) als Alternativen zum Dark-Default.

## 11. Don'ts

- Fixed-Counter über Content-Panels legen (stripe-desktop.png y743–777 überdeckt Swatches).
- Native Scrollbar in Thumbnail-Strips sichtbar lassen (anthropic-mobile-state2.png y1195).
- Nav mit 6 gleichwertigen Pillen + Alert-Dot + Toggle überladen.
- Hex-Labels unter 11 px.
- Promo-Banner über Primärnav dauerhaft.
- Purple-Tint in einem Panel, Neutral-Grau im Nachbarpanel (home-desktop.png Preview vs Input-Card).
- Screenshot-Cards heller als Page ohne Abdunkelung/Overlay.
- Cookie-Modal in extrahierte Screenshots einfrieren.

## 12. Unlesbar / nicht belegt

- Schriftfamilien (Inter-artig, Instrument-Serif-artig, Tiempos-artig): HTML-Export enthält nur Vercel-Checkpoint, keine Font-Deklaration.
- Mobile-Scale (1×/2×/3×) nicht belegt; Werte in Bild-px.
- Hover-, Fokus-, Error-States: keine Belege.
- Stripe „Sign in"-Button-Border/Schatten: bei JPG-Kompression nicht messbar.
- discover-desktop.png Card-Beschreibungstexte: unter Bildkante abgeschnitten.
- anthropic-mobile-state2.png Code-Block unter Zeile 2: abgeschnitten.
