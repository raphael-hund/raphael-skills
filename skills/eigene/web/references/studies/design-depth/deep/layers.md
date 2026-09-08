# GetLayers (layers) — Deep-Analyse der Konstruktion

Stand: 07.09.2026. Paket: `/Users/raphaelhund/skill-workspace/web-design-depth/research/layers/`.
Eigene Sichtung aller 8 Bilder (Read-Tool). Kontextbericht `REPORT.md` liefert DOM-Messwerte
(Onest, GeneralSans 300, H1 42,67px/LH 45,23px/Tracking −1,28px, Header 68,8px, CTA 201×39px,
Karte 307×251px r12). Das Chrome-CSS liegt extern (`_next/static/chunks/*.css`), im `home-source.html`
nicht inline; Hexwerte darin (#f02be0, #c43ff0, #7b3fd9, #081627) gehören zu Paletten-Daten, nicht zum Chrome.
Alle Farbwerte unten sind optische Schätzungen, außer sie sind als DOM-Messung markiert.
Mobile-PNGs sind DPR 2 (780×1688 = 390×844 CSS-px); Pixelangaben unten in CSS-px umgerechnet.

## 0. Rollentabelle Farbe (geschätzt, gesamtes Paket)

| Rolle | Wert (geschätzt) | Beleg |
|---|---|---|
| Page | #0a0a0b – #0c0c0e (nahe Schwarz, kein reines #000) | 02-home-desktop.png Bereich um Hero, Galerie-Hintergrund |
| Surface (Modal/Card) | #111113 – #141416 | vesper.png rechtes Panel, soffit.png rechtes Panel |
| Raised (Pille/Input) | rgba(255,255,255,.05) auf Page; Nav-Kapsel ≈ #1a1a1c | 02-home-desktop.png Nav-Kapsel x430–920, y45–92 |
| Raised-Active | ≈ rgba(255,255,255,.10) (Library-Pill etwas heller) | 02-home-desktop.png „Library“ x435–500 |
| Border | 1px rgba(255,255,255,.08–.12) Haarlinie | Hero-Rahmen 02-home-desktop.png y100–410; alle Chips in vesper.png rechts |
| Action (Primär) | dunkler Pillenkörper #151517 mit 1px hellem Rand ≈ rgba(255,255,255,.35) oben, plus weißer Icon-Kreis #f2f2f4 | 02-home-desktop.png CTA x535–735, y333–373 |
| Action-Glow (Premium) | warmer Randschein am oberen Rand ≈ #f0b58a→transparent | vesper-mobile.png Upgrade-Button y865–950 |
| Text-Primary | #f5f4f7 (DOM: H1-Gradient-Start) | REPORT.md, sichtbar 02-home-desktop.png H1 |
| Text-Secondary | ≈ #a3a1ad (DOM: Gradient-Ende) | H1 rechte Hälfte „made easy“ |
| Text-Muted | ≈ #8a8a92 | Subline 02-home-desktop.png y250–300; Chips „SaaS“ vesper.png |
| Text-Disabled | ≈ #5c5c64 auf #111 | vesper.png „Copy prompt“ gesperrt x742–905 |
| Accent-Sale | Streifen Verlauf Creme #f1e9e4 → Lavendel #d9d6ea, Text schwarz | 02-home-desktop.png y0–32 |
| Accent-CTA-Warm | #f2a07a (Peach) auf Tutorial-Card | 02-home-desktop.png „Read the docs“ x962–1236, y730–766 |
| Accent-Bild | Mint #7ff5d0 / Violett #6a4cff (Vesper), Magenta #f02be0 (Soffit), Cyan #7ce7f0 (Mint-Palette) | vesper-preview.webp, soffit.png, soffit-mint.png |

Logik: Chrome bleibt komplett neutral (Schwarz + Weißalpha). Farbe existiert nur in
Preview-Motiven und zwei Marketing-Overlays (Sale-Streifen, Tutorial-CTA). Alles Interaktive
ist Weiß-auf-Alpha, nie Buntfarbe.

## 1. 02-home-desktop.png (1280×800)

### 1.1 Sale-Streifen (y0–32)
- Geometrie: 32px hoch, volle Breite, Inhalt zentriert, Zeile aus Uhr-Icon 14px + Text 13px.
- Material: horizontaler Verlauf hell (links Creme #efe6e0, rechts Lavendel #d6d5ea), Text #111.
  Durchgestrichener Alt-Preis „$759“ in #8a8a92, Neu-Preis „$199“ und Timer „18:59:13 left“ fett.
- Typo: 13px Onest 500; Preise/Timer 600. Tracking normal.
- Nachbau: `<aside class="bar">` mit `background:linear-gradient(90deg,#f1e9e4,#d9d6ea)`,
  `display:flex;justify-content:center;gap:.6em;height:32px;font:500 13px/1 Onest`,
  `<s>` für Altpreis, `<time>` für Countdown.
- Wirkung: Einziges helles Band der Seite, deshalb lauter als die Nav. Countdown ist Anbieter-
  Dringlichkeits-Copy; hier nicht verifiziert. Slop-Risiko: Countdown ohne echte Deadline.

### 1.2 Header (y32–100, DOM 68,8px)
- Geometrie: 3 Zonen. Logo links x14–118 (Icon 3 gestapelte Rauten 20px + Wortmarke 16px 600).
  Mitte: Such-Pille x347–420 (Lupe + Kbd „⌘K“ in eigenem 1px-Rahmen r6) plus Nav-Kapsel
  x430–920 h≈46px r999, Links mit ~24px horizontalem Abstand. „MCP“ trägt Sparkle-Icon.
  Rechts „Sign in“ mit User-Icon x1190–1255.
- Material: Kapsel ≈ #161618 (etwas heller als Page), aktiver Link „Library“ als Pille
  rgba(255,255,255,.08) r999, padding ≈ 8px 12px. Keine Border sichtbar an der Kapsel.
- Typo: 15px Onest 400, #d8d8dd; aktiv #f5f4f7.
- Nachbau: `<header>` grid `auto 1fr auto`; Kapsel `<nav><ul>` flex, `background:#161618;
  border-radius:999px;padding:4px`; aktives `<a aria-current="page">` mit `background:
  rgba(255,255,255,.08);border-radius:999px`. Kbd: `<kbd>` mit `border:1px solid rgba(255,255,255,.14);
  border-radius:6px;padding:2px 6px;font-size:11px`.
- Wirkung: Nav als Kapsel trennt sie vom Hero-Rahmen ohne Linie. Fehler: Suche und Kapsel
  sind zwei Pillen nebeneinander mit unterschiedlicher Höhe (x347–420 vs x430–920): leicht unruhig.

### 1.3 Hero-Rahmen (x14–1254, y100–410)
- Geometrie: fast vollbreit (14px Rand beidseitig, identisch zum Header-Padding 14,22px),
  310px hoch, Radius ≈ 20px, Border 1px rgba(255,255,255,.10). Inhalt vertikal zentriert:
  Badge y138–162, H1 y190–230, Subline y250–300, CTA y333–373. Abstände: Badge→H1 28px,
  H1→Sub 20px, Sub→CTA 33px.
- Material: Grund #0b0b0c. Hinter dem Inhalt weiche, körnige weiß-graue Rauchwolken (links
  x0–520 dicht, rechts x700–1254 heller #cfcfd2 mit Mint-Stich unten rechts x1000–1250, y300–400).
  Mitte y130–380 bleibt dunkel: Lesekorridor ≈ 480px breit. Sichtbares Grain in den Wolken.
- Typo H1: „Cinematic AI sites, made easy“ 42,7px GeneralSans 300 (DOM), Tracking −0,03em,
  LH 1,06. Farbverlauf: „Cinematic AI sites,“ #f5f4f7, „made easy“ läuft nach #a3a1ad
  (DOM: linear-gradient 122deg, text-clip). Subline 17px Onest 400 #9a9aa2, 2 Zeilen zentriert,
  max-width ≈ 400px.
- Badge: „Trusted by 1,000+ creators“ 13px #c9c9cf, Pille r999, 1px rgba(255,255,255,.12),
  bg rgba(255,255,255,.04), padding 6px 14px, Höhe 24px.
- CTA: Pille 201×39px (DOM), Text 14px Onest 500 #f5f4f7, links Padding 20px, rechts Icon-Kreis
  26px weiß #f2f2f4 mit schwarzem Sparkle 12px, 6px vom Rand. Körper #17171a mit 1px hellem
  Rand rgba(255,255,255,.30) (oben heller als unten → Highlight-Kante, wirkt wie Glasrand).
- Nachbau:
  ```html
  <section class="hero">
    <div class="hero__fx" aria-hidden="true"></div>
    <p class="badge">Trusted by 1,000+ creators</p>
    <h1>Cinematic AI sites, <span>made easy</span></h1>
    <p class="sub">…</p>
    <a class="btn btn--primary">Get unlimited access <i class="btn__orb">✦</i></a>
  </section>
  ```
  ```css
  .hero{position:relative;margin:0 14px;border:1px solid rgba(255,255,255,.1);
    border-radius:20px;background:#0b0b0c;overflow:hidden;display:grid;place-items:center;
    text-align:center;padding:38px 24px}
  .hero__fx{position:absolute;inset:0;background:
    radial-gradient(60% 80% at 8% 50%,rgba(210,210,215,.55),transparent 60%),
    radial-gradient(45% 70% at 92% 70%,rgba(200,215,210,.6),transparent 60%);
    filter:blur(28px);mask:linear-gradient(90deg,#000 0,#000 30%,transparent 42%,transparent 58%,#000 70%,#000)}
  .hero__fx::after{content:"";position:absolute;inset:0;background:url(noise.png);opacity:.18;mix-blend-mode:overlay}
  h1{font:300 clamp(32px,3.3vw,43px)/1.06 GeneralSans;letter-spacing:-.03em;
    background:linear-gradient(122deg,#f5f4f7 18%,#a3a1ad);-webkit-background-clip:text;color:transparent}
  .btn--primary{display:inline-flex;align-items:center;gap:12px;height:40px;padding:0 6px 0 20px;
    border-radius:999px;background:#17171a;border:1px solid rgba(255,255,255,.28);
    box-shadow:inset 0 1px 0 rgba(255,255,255,.18)}
  .btn__orb{width:26px;height:26px;border-radius:50%;background:#f2f2f4;color:#111;display:grid;place-items:center}
  ```
  Für echte Rauchwolken: geloopter Videobackground oder Canvas; CSS-Fallback wie oben.
- Wirkung: Ein Blickfang (H1) mit dünnem Gewicht, negative Fläche links/rechts, Lesekorridor
  dunkel. Grain verhindert Banding. Slop: Verlaufs-Headline ist hier nur Grauabstufung, kein
  Regenbogen — das ist die richtige Dosis. Fehler: CTA 39px < 44px Touchziel.

### 1.4 Galerie-Kopf (y525–610) und Kartenraster (ab y628)
- Label-Pille „New templates arrive weekly“ x14–207, y527–551, gleicher Chip-Stil wie Hero-Badge,
  aber linksbündig. H2 „Immersive website prompts“ y565–605, ≈ 40px GeneralSans 300, gleicher
  Grau-Verlauf (links weiß, „prompts“ #a3a1ad). Kein Absatz darunter → Bilder folgen nach 24px.
- Raster: 4 Spalten, Gap ≈ 12px, Karten 307px breit (DOM), Bild-Ratio ≈ 16:10, Radius 12px,
  Padding 5px (DOM 4,98) → Bild hat innerhalb der Karte eigenen Radius ≈ 8px.
- Karten-Motive (x14–316 Vesper: Mint-Torus auf Schwarz; x330–628 Stride: blau, Sternknoten;
  x642–938 AI Studio: violettes Objekt auf Weiß). Keine Rahmen, keine Schatten, kein Hover-Glow
  sichtbar. Titel/Meta unterhalb (vom Cookie-Overlay verdeckt, unlesbar in diesem Bild).
- Nachbau: `<section><p class="chip">…</p><h2>…</h2><a class="more">All Templates →</a>
  <ul class="grid">` mit `grid-template-columns:repeat(4,1fr);gap:12px`; `<article>` mit
  `padding:5px;border-radius:12px;background:#0f0f11`; Media `aspect-ratio:16/10;border-radius:8px;
  overflow:hidden` mit `<img>` Poster + optional `<video muted playsinline preload="none">`.
- Wirkung: neutrales Chrome, Bilder tragen die Farbe. Nichts konkurriert mit den Motiven.

### 1.5 Overlays (Cookie x14–316 y640–800; Tutorial x945–1254 y470–800; Ask-AI-Pill x555–715 y748–786)
- Cookie: dunkle Karte, Text #d8d8dd, Buttons „Accept all“ (helle Pille) und „Manage preferences“
  (Textlink). Liegt direkt auf der Vesper-Karte → verdeckt Beweis.
- Tutorial-Card: 310×330px, r16, bg #121214, 1px Border, Thumbnail 274×150 r10 mit Overlay-Text
  „3D SITE IN 1 PROMPT“ (weiß, „1 PROMPT“ in weißer Pille mit schwarzem Text). Eyebrow
  „New to GetLayers?“ 12px Peach #f2a07a. Titel 15px 600 weiß. CTA „Read the docs“ volle Breite
  h36 r10 Peach #f2a07a Text schwarz 600. Close-X oben rechts 24px Kreis grau.
- Ask-AI: schwebende Pille 160×38 r999, bg #1a1a1d, 1px Border, Sparkle + 14px 500 Text, fix unten
  Mitte.
- Fehler: drei Overlays gleichzeitig + Sale-Streifen. Peach-CTA ist der einzige bunte Button der
  Seite und sitzt in einem Nebenelement, nicht am Haupt-CTA. Hierarchie kippt.

## 2. home-mobile.png (390×844 CSS-px)

- Sale-Streifen 40px hoch, gleicher Verlauf, Text 16px; Timer bleibt.
- Header y52–94: Logo-Quadrat 40×40 r12 bg rgba(255,255,255,.06) 1px Border; Such-Pille
  x70–310 h40 r999 mit Placeholder „Search the library“ 16px #9a9aa2; Hamburger-Quadrat 40×40 r12.
  Grid `auto 1fr auto`, Gap 12px. Padding 16px.
- Hero-Karte x16–362, y112–464 (352px hoch), r24, 1px Border. Grain sichtbar als Feinrauschen
  im dunklen Feld (y200–440), keine Wolken wie Desktop → Nebel ist auf Mobile reduziert oder
  außerhalb des Crops. Inhalt zentriert: Badge y155–182 (h27, 16px Text), H1 zweizeilig
  „Cinematic AI sites, / made easy“ ≈ 34px, Subline 16px 2 Zeilen #9a9aa2, CTA x76–302 h44 r999
  Text 18px, Orb 32px. CTA-Rand oben heller (Highlight-Kante) klar sichtbar.
- Abstände: Badge→H1 30px, H1→Sub 26px, Sub→CTA 44px, CTA→Rahmenende 44px.
- Galerie: Chip zentriert y538–564, H2 zweizeilig ≈ 34px zentriert (Verlauf sichtbar auf „prompts“),
  Karten 2 Spalten x16–182 / x196–362, Ratio ≈ 1.45:1, Gap 14px, r10. Titel „Vesper“ 16px 500
  unter der Karte y795. Zweite Reihe beginnt y828.
- Fixer „Ask AI for guides“-Pill x105–273, y792–832 überdeckt genau die Kartentitel-Zeile.
- Nachbau: `@media (max-width:640px){.grid{grid-template-columns:1fr 1fr;gap:14px}
  .hero,h2,.chip{text-align:center}}`; Fixed-Pill mit `bottom:calc(env(safe-area-inset-bottom)+12px)`
  plus `padding-bottom` auf `main`, damit Titel nicht verdeckt werden.
- Do: Suchfeld bekommt die Breite. Don't: fixe Pille ohne Safe-Area.

## 3. vesper.png (Desktop-Detailmodal, 1280×800)

### 3.1 Modal-Layout
- Zwei getrennte Flächen: links x32–694 (662px), rechts x712–1238 (526px); beide y36–764,
  r20, bg #0e0e10, 1px Border rgba(255,255,255,.10). Gap 18px. Hintergrund: Galerie unscharf
  (blur ≈ 12px) und abgedunkelt (≈ rgba(0,0,0,.6)). Close-Button x1196–1226, y48–78, 30px Kreis
  weiß #f2f2f4, X schwarz — oben rechts außerhalb der Card-Kante.
- Nachbau: `<dialog>` mit `::backdrop{backdrop-filter:blur(12px);background:rgba(0,0,0,.55)}`,
  Inhalt `display:grid;grid-template-columns:1.26fr 1fr;gap:18px`.

### 3.2 Linke Preview (x32–694, y36–508 Video; darunter „More like this“)
- Video 662×472 (≈ 1.4:1), oben mit Radius der Card beschnitten. Motiv: Mini-Site-Nav
  (Vesper-Logo, Home/Services/Works/About, „Contact Us“-Outline-Button), Headline
  „Reads presence, / in motion“ dünn ~44px, zweite Zeile teilweise verwaschen (Motion-Blur im Film).
  Sternenfeld, mint-grüne Lichtflecken (x480–560, y270–300), Wolkenband oben (Mint/Teal
  #2a5f5a → Schwarz). Unten Metrikleiste y435–508: 4 Spalten durch 1px-Linien getrennt, jeweils
  linke Hairline + Zahl 15px („91k“) + Label 8px („Live particles“). Das sind Motivinhalte.
- „MORE LIKE THIS“ y548: 11px 600 Tracking +0,1em #8a8a92. Kartenstreifen y575–730, 3 sichtbare
  Karten ≈ 216px breit, r10, Gap 16px; Pfeil-Buttons links/rechts als 36px-Kreise (rechts
  x652–688 dunkel mit 1px Rand). Kartentitel 14px 500 + Badge („Free“ grau, „Premium“ mit
  Schloss, heller Chip #d9d6ea Text schwarz).
- Nachbau: `<figure><video poster>` in `aspect-ratio:1.4;overflow:hidden`; Streifen
  `display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:16px` plus zwei
  `<button class="arrow">` absolut.

### 3.3 Rechtes Info-Panel (x712–1238)
- Padding 30px. Reihenfolge und Abstände (Desktop): Badges y62–86 → Titel y105–130 → CTA y150–188
  → Text y205–265 → Tag-Chips y284–307 → gesperrte Buttons y325–367 → Like/Share y385–425.
  Vertikaler Rhythmus ≈ 18–20px zwischen Gruppen.
- Badges: „Premium“ helle Pille #d9d6ea Text #111 mit Schloss-Icon 12px; „Commercial licence“
  dunkle Pille rgba(255,255,255,.08) Text #e8e8ec. Beide h24, 13px 500, padding 4px 10px.
- Titel „Vesper“ 22px Onest 600 weiß. (Kein Display-Font, Panel ist Utility.)
- CTA „Upgrade to unlock“ x742–925, h38, gleicher Primär-Stil wie Home; auf Desktop Randschein
  neutral-hell, nur schwach warm.
- Beschreibung 15px Onest 400 #c9c9cf, LH 1,5, max 3 Zeilen.
- Tag-Chips: 13px #c9c9cf, 1px Border rgba(255,255,255,.12), bg transparent, r999, h23, padding 4px 10px.
- Gesperrte Buttons: h42, r999, 1px Border rgba(255,255,255,.10), Text #5c5c64 mit Icon links
  und Schloss rechts: „Copy prompt“ 163px, „Download source code“ 220px. Deutlich abgeschwächt
  (Disabled-State durch Textfarbe, nicht Opacity des Rahmens).
- Like „♡ 153“ Pille h40, Share-Kreis 40px, beide 1px Border.
- Nachbau: `<aside class="meta">` Stack mit `display:flex;flex-direction:column;gap:18px`;
  Buttons als `<button disabled>` mit `color:#5c5c64;border-color:rgba(255,255,255,.1)`; Chips `<ul>`.
- Wirkung: Panel nutzt nur 45 % seiner Höhe; Leere unten (y430–764) ist gewollte Ruhe, sieht
  aber auf 800px hoch unausgewogen aus.

## 4. vesper-mobile.png (390×844 CSS-px)

- Close-Button oben rechts x322–362, y18–58, 40px Quadrat r12 bg rgba(255,255,255,.10), X 18px weiß.
  Sitzt außerhalb der Card, auf abgedunkeltem Hintergrund.
- Card x16–362 ab y72, r24, 1px Border, bg #0e0e10. Preview y72–318 (Ratio ≈ 1.4:1), Motiv jetzt
  horizontale Galaxie (Mint-Strahl y185–200, Violett-Kern x150–230). Metrikleiste y280–318 4 Spalten,
  Labels ≈ 6px → unlesbar klein, aber Motivinhalt.
- Meta-Stack Padding 16px: Badges y337–360 (h23, Text 16px!), Titel „Vesper“ 30px 700 y375–410,
  CTA y432–475 (h44, Text 20px, Orb 34px) mit sichtbarem **warmen Peach-Glow entlang der
  Oberkante** (x150–240 ≈ #f0b58a → transparent) — auf Mobile deutlicher als Desktop.
  Beschreibung 18px LH 1,45 #c9c9cf y495–615. Tag-Chips 18px h26, wrap in 2 Reihen.
  Gesperrte Buttons volle Breite h48 r999, Text #5c5c64 18px, gestapelt Gap 12px.
- Abstände: 18–24px zwischen Gruppen; Card-Unterkante y828.
- Nachbau: `@media(max-width:640px){.modal{grid-template-columns:1fr}.meta{padding:16px}
  .btn--locked{width:100%}}`. Glow: `.btn--primary::before{content:"";position:absolute;inset:-1px;
  border-radius:inherit;background:linear-gradient(90deg,transparent,rgba(240,181,138,.6),transparent);
  mask:linear-gradient(#000,transparent 40%);pointer-events:none}` unter dem Body-Layer.
- Fehler: Badges skalieren mit 16px zu groß für ihre Rolle; Chips und Badges sehen gleich aus.

## 5. vesper-preview.webp (1440×1026, Poster des Motivs)

- Vollflächiges Motiv, kein Site-Chrome. Nav oben: schwebende Zeile y15–58, Logo-Stern + „Vesper“
  15px, Links 15px Onest 400 #e8e8ec, „Contact Us ·“ Outline-Button 1px rgba(255,255,255,.3) r4
  h34 x940–1068. Nav-Gruppe x363–1075: nicht randbündig, sondern als Block mittig-rechts.
- H1 „Motion instead / of chrome“ x25–560, y135–275, ≈ 72px GeneralSans 300 weiß, LH 1,0,
  Tracking −0,02em, linksbündig hart am Rand (25px). Zwei Zeilen, links, während der Torus
  x390–1140 rechts-mittig steht → asymmetrischer Split.
- Torus: Partikelfeld 750×650px, Farbverlauf oben Mint #7ff5d0 → Mitte Cyan → unten Violett #6a4cff;
  Loch in der Mitte schwarz. Kleine graue Sternpunkte verstreut (x20–320, y350–700). Hinter dem
  Torus dunkler Teal-Nebel oben links (x0–400, y0–330, #1f3b3a).
- Untere Zeile y760: 1px Hairline volle Breite (rgba(255,255,255,.15)). Darunter links Caption
  Uppercase 14px Tracking +0,06em weiß 2 Zeilen („IT READS YOUR PRESENCE — …“); rechts
  Fließtext 15px #d0d0d5 3 Zeilen rechtsbündig max 280px.
- Unten links y985: Tags in eckigen Klammern „[ LIVING INTERFACE ] • [ MOTION LAYER ]“ 14px
  Uppercase Tracking +0,06em, Punkt-Separatoren. Unten rechts: CTA „Send Request“ **weiß**
  #f2f2f4 rechteckig r0 h56 x1137–1360, daneben quadratisches weißes Icon-Feld 56×56 mit
  schwarzem Stern, 2px Gap.
- Nachbau: Hero `display:grid;grid-template-rows:auto 1fr auto;min-height:100vh;padding:24px`.
  Canvas/WebGL `position:absolute;inset:0;z-index:0`, Text `z-index:1`. Hairline via
  `border-top:1px solid rgba(255,255,255,.15)`. CTA-Split: `display:inline-grid;grid-template-columns:
  1fr 56px;gap:2px` beide `background:#f2f2f4;color:#111`. Eckige Klammern als reiner Text.
- Wirkung: ein Ereignis (Torus), dünne Typo, Utility-Labels in Mono-ähnlichem Uppercase.
  Rechteck-CTA bricht mit der Pillenlogik der Plattform → Template hat eigene Formsprache.
- Slop-Risiko: Weißer Text auf mint-hellem Torusbereich (H1 „instead“ überlappt Torus-Rand
  x520–560) leicht kontrastarm; Caption 14px auf Nebel.

## 6. soffit.png / soffit-mint.png / soffit-ui.png (Konfigurator, 1280×800)

### 6.1 Layout (alle drei)
- Selbes Modalraster wie Vesper: links Preview-Card x32–694, rechts Panel x712–1238, y36–764.
- Preview-Canvas 662×472 (DOM: 497×355 intern, 0,75×). Unten rechts im Canvas Qualitäts-Pille
  „− 0.75× +“ x578–652 h24 r999 bg rgba(0,0,0,.45), daneben Stop-Kreis 24px.
- „MORE GRADIENT VARIANTS“ y548 gleiches Label-Muster (11px 600 Tracking +0,1em #8a8a92).
  Varianten-Streifen y575–730: aktive Karte trägt **2px weiße Kontur** mit 8px Innenabstand
  (x56–292 Outer r14, Bild x64–282 r10) — Auswahl als Outline-Ring, nicht als Farbfüllung.
  Labels „Soffit“ 14px + „Free“-Chip.

### 6.2 Material
- soffit.png: Preview Magenta #f02be0 → Pink #f37ee0, milchige helle Lichtfelder (x130–330,
  y60–110 hell; x400–520 y220–420 helles Band), Kanten diffus, Blur-Radius groß (≈ 80px).
- soffit-mint.png: Cyan #7ce7f0 links oben → Mint #b6ffe6 rechts unten; hellster Fleck
  x280–520, y120–350. Gleiche Geometrie (Lichtband), nur Palette getauscht → Beleg, dass Farbe
  und Form getrennt gespeichert sind.
- soffit-ui.png: gleicher Mint-Grund; HTML-Overlay: Mini-Nav y45–62 („Onda“ 10px, Links 9px,
  „Let's talk →“ dunkle Pille x605–682 h20). Headline „Design that“ 24px Sans weiß +
  „Bends the light“ 34px Serif-Italic (Schreibschrift-Kontrast) weiß; CTAs y310–336:
  „Let's talk →“ dunkle Pille #111 mit weißem Pfeilkreis, „Book a call“ Outline-Pille 1px weiß.
  **Kontrast weiß auf #b6ffe6 sichtbar zu schwach** (Headline y210–290).

### 6.3 Rechtes Panel
- Kopf (soffit.png): Badges „Free“/„Commercial licence“ y62–84; Titel „Soffit“ 22px 600;
  Aktionsreihe y150–192: „Copy prompt“ Pille h42 (Text weiß, nicht disabled), „Copy prompt + UI“,
  Like „♡ 15“, Share-Kreis. Hinweis „1 free copy left today…“ 12px #8a8a92. Hairline y248.
- „Configure gradient“ 16px 600 + Info-Icon + „BETA“-Chip (10px Uppercase, bg rgba(255,255,255,.08));
  rechts „♡ Favourites · 0“ Outline-Pille h26.
- Palette: Label „Select palette“ 14px; 2 Spalten (Dark/Warm/Light links x742–955, Cool/Muted/Custom
  rechts x987–1200). Spaltenlabel 11px Mono-Look #8a8a92 (breite Buchstaben, Tracking +).
  Swatches 34×22 r7 Verlaufskacheln, Gap 6px. Aktive Swatch (soffit-mint.png „Aqua Mint“
  x1122–1158, y56–78) hat 1px hellen Ring + Außenabstand.
- Controls: Zeile „Controls ⓘ“ + „⤮ Randomize“ Outline-Pille h26 rechts. „Adjusted · 0“ 12px
  muted + Reset-Icon. Slider: Label 14px links, Wert rechts 11px Mono („0.33“, „1.6“, „1.00×“),
  Track 2px rgba(255,255,255,.15) volle Breite, Thumb 12px weißer Kreis, Zeilenhöhe 40px.
  „Show all ⌄“ zentrierte Outline-Pille h30. Hairline.
- „UI templates ⓘ“ + Segmented „Dark | Light“ (aktiv „Dark“ Pille rgba(255,255,255,.10) in
  Container rgba(255,255,255,.05) r999 h24).
- Thumbnail-Grid (soffit-mint.png y497–705): 4 Spalten × 2 Reihen, Karten 112×98 r8 bg #1a1a1c,
  Innenbild 96×60 r6: schematische Wireframes (graue Rechtecke, Kreise, Streifen als
  Platzhalter), Label 10px unten. Aktiv (Bare bzw. Spotlight in soffit-ui.png x742–855, y607–703)
  = 1px heller Ring. Rechts Pfeil-Kreis x1200–1226 = horizontaler Overflow. Scrollbar-Track y715 2px.
- Nachbau Slider: `<label>Grain <output>0</output></label><input type=range>` mit
  `appearance:none;height:2px;background:rgba(255,255,255,.15)`,
  `::-webkit-slider-thumb{width:12px;height:12px;border-radius:50%;background:#fff}`.
  Swatch: `<button aria-label="Aqua Mint" style="background:linear-gradient(135deg,#7ce7f0,#b6ffe6)">`
  `width:34px;height:22px;border-radius:7px;outline-offset:2px` und `[aria-pressed=true]{outline:1px solid #fff}`.
  Thumbnails als Inline-SVG (`<rect>`-Gruppen mit fill rgba(255,255,255,.2/.4)), kein Screenshot.
- Wirkung: Preview + Entscheidung in einem Viewport; Auswahl immer als Ring, nie als Farbe →
  konsistent mit neutralem Chrome. Mono-Werte rechts geben Präzisionsgefühl.
- Fehler: Shader-Fachbegriffe (tilt, warp, dither) ohne Erklärung; sehr kleine Labels (10–11px).

## 7. Gemeinsamkeiten im Paket

1. Zwei Schriften, klare Rollen: GeneralSans 300 für Display (H1/H2, Preview-Headlines),
   Onest 400–600 für alles Bedienbare. Alle Bilder.
2. Display-Text bekommt einen Grau-Verlauf (#f5f4f7 → #a3a1ad) über die Zeile, immer auf dem
   letzten Wort. Home Desktop H1/H2, Mobile H1/H2.
3. Radien-System: Pille 999 für alles Klickbare; 12px Karten; 20–24px Hero/Modal; 6–8px Kbd/Thumb-Bild.
4. Border-Logik: 1px Weißalpha .08–.12 als einzige Trennung; Hairlines statt Schatten. Kein
   Box-Shadow irgendwo sichtbar.
5. Primär-CTA-Muster: dunkler Pillenkörper + heller Rand mit Top-Highlight + weißer Orb mit
   Sparkle rechts. Home, Vesper (Desktop+Mobile), Soffit-UI („Let's talk“ mit Pfeilkreis).
6. Auswahlzustand = heller Ring/Outline (Varianten, Swatch, Thumbnail, aktiver Nav-Link als
   hellere Fläche). Nie Akzentfarbe.
7. Sektionslabel: 11px Uppercase Tracking +0,1em muted („MORE LIKE THIS“, „MORE GRADIENT VARIANTS“).
8. Modal-Prinzip: Content-Card + Meta-Card getrennt, Hintergrund blur+dim, Close außerhalb der Card.
9. Farbe nur in Motiv und Marketing-Overlay; Chrome bleibt monochrom.
10. Grain als Anti-Banding in dunklen Flächen (Hero Desktop-Wolken, Mobile-Hero-Feld).

## 8. Spacing-Rhythmus

- Außenrand: 14px Desktop (Header-Padding = Hero-Margin = Galerie-x), 16px Mobile.
- Gruppen im Stack: 18–20px Desktop, 20–24px Mobile.
- Innerhalb Hero: 28 / 20 / 33px (Badge→H1→Sub→CTA) Desktop; 30 / 26 / 44px Mobile.
- Grid-Gap: 12px Desktop (4 Spalten), 14px Mobile (2 Spalten), 16–18px zwischen Modal-Cards.
- Karten-Padding 5px, Bild-Radius = Karten-Radius − Padding (12 − 5 ≈ 8 px, nested radius).
- Kontroll-Zeilen 40px Höhe; Pillen 24 (Chip) / 26 (Utility) / 38–42 (Button) / 44–48 (Mobile).

## 9. Mobile-Hinweise

- Suche wird zur Hauptzeile; Nav in Hamburger (home-mobile.png y52–94).
- Alles zentriert; H1/H2 brechen in zwei Zeilen bei ≈ 34px.
- Modal wird zu einer Karte: Preview oben, Meta darunter, Close außerhalb (vesper-mobile.png).
- Buttons volle Breite, h44–48. Badges/Chips skalieren zu groß (16–18px) → Rollen verschwimmen.
- Fixe Pille überdeckt Kartentitel (home-mobile.png y792–832) → Safe-Area-Padding nötig.

## 10. Dos / Don'ts

Dos: Chrome monochrom halten und Farbe den Motiven lassen; Display 300er-Gewicht mit
−0,03em Tracking; Grau-Verlauf statt Buntverlauf in Headlines; Hairlines statt Schatten;
Auswahl als Outline-Ring; Preview und Controls im selben Viewport; Poster zuerst, Video lazy;
Grain in dunklen Verläufen; nested radius (Außen − Padding).

Don'ts: 3 Overlays gleichzeitig; Countdown ohne echte Deadline; CTA unter 44px Touch; weiße
Schrift auf hellem Mint ohne Scrim; Labels unter 11px als Premium-Signal; fixe Elemente ohne
Safe-Area; bunter Button in Nebenkarte, während Haupt-CTA neutral bleibt; Shader-Fachbegriffe
ohne Tooltip-Text in Kundenoberflächen.

## 11. Unlesbar / nicht belegt

- Kartentitel/Meta unter der ersten Desktop-Galeriereihe (02-home-desktop.png y780–800, von Cookie-
  und Tutorial-Karte verdeckt).
- Metrik-Labels in Vesper-Mobile-Preview (vesper-mobile.png y300–312, ≈ 6px).
- Nav-Link-Texte in Soffit-UI-Overlay (soffit-ui.png y48–58, ≈ 9px) nur teilweise lesbar.
- Hover-/Focus-Zustände: in keinem Bild sichtbar.
- Footer: in keinem Bild enthalten.
- Exakte Chrome-Hexwerte: CSS extern, nicht im Paket; alle Werte geschätzt außer DOM-Messungen aus REPORT.md.
