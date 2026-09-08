# designmd_supply — Designgrammatik aus Pixeln, DOM und Quellcode

Stand: 07.09.2026. Paket: `/Users/raphaelhund/skill-workspace/web-design-depth/research/designmd_supply/`.
Evidenzklassen: **P** = Pixel im Screenshot, **D** = `home-computed.json`, **Q** = Quellcode `designmd-supply-main/`, **G** = generierter Guide (Aussage des Diensts, keine Messung), **A** = eigene Ableitung.

Alle Pixelangaben in CSS-px. Desktop-Screenshots 1280×800 @1x; Mobile-Screenshots 390×844 @2x (Bilddatei 780×1688, Bildkoordinaten halbieren). Fremdaufnahmen `*-source-home.png` 1920×1080, Viewport/DPR unbekannt.

---

## 1. Die eigene Oberfläche (designmd.supply)

### 1.1 Farblogik als Rollentabelle (P/D/Q)

| Rolle | Wert | Beleg |
|---|---|---|
| Page (Papier) | `#fbfaf6` | `globals.css:4`, `01-home-desktop.png` Gesamtfläche |
| Surface (Input, Logokachel) | `#ffffff` | `domain-search.tsx` `bg-white`; `01-home-desktop.png` Input y408–464 |
| Raised (Codefenster) | `#0a0a0a` (Ink als Fläche) | `markdown-copy-block.tsx` `bg-ink`; `02-linear-desktop.png` x32–832, y342–800 |
| Action | `#0a0a0a` Kreis/Tab; Fremd-Badge `#2663eb` | `01-home-desktop.png` x711–751, y416–456; Badge x1110–1240, y740–776 |
| Text | `#0a0a0a` | `globals.css:5` |
| Muted | `#6f6b66` (+ Alpha-Stufen /80, /70, /60) | `globals.css:6`; `01-home-desktop.png` Absatz y250–340 |
| Border (Hairline) | `rgb(10 10 10 / 0.08)` | `globals.css:7`; `02-linear-desktop.png` Linie y213 |
| Text auf Ink | `#fbfaf6` mit Alpha /95, /60, /45, /15 | `markdown-copy-block.tsx` `text-paper/95`, `text-paper/45`, `bg-paper/15` |
| Accent | keiner. Markenfarben erscheinen nur als Inhalt (Swatches, Logos, Screenshots) | `01-home-desktop.png` Farbkreise y786–800 |

Merkmal: Ein Ton (Ink) übernimmt Text, Aktion und Raised-Fläche. Hierarchie entsteht durch Alpha-Stufen und Größe, nicht durch weitere Hues. Selektion invertiert (`::selection` Ink 92 % auf Papier, `globals.css:27–30`).

### 1.2 Typografie (P/D/Q)

Familie: Inter via `next/font`, Fallback `ui-sans-serif, system-ui` (`layout.tsx:6`, `home-computed.json` fontFamily). Font-Features `ss01, cv11` (`globals.css:20`) → alternatives „a“/„g“ sichtbar im Hero `01-home-desktop.png` y80–224.

| Rolle | Desktop | Mobile | Gewicht | Tracking | Beleg |
|---|---|---|---|---|---|
| Hero H1 | 72px / 1.0 (Höhe 144px für 2 Zeilen) | 48px / 1.0 | 500 | `tracking-tight` ≈ −0.025em | `home-computed.json` H1 rect 144px; `page.tsx:14` `text-5xl sm:text-7xl` |
| Hero-Akzent „style guides“ | gleiche Größe | gleich | 300 kursiv | gleich | `page.tsx:16`; `01-home-desktop.png` x428–556, y90–150 grau kursiv |
| Lead | 18px / 32px | 16px / 28px | 400 | 0 | `page.tsx:19` `text-base/7 sm:text-lg/8`; `01-home-desktop.png` y250–340 drei Zeilen à 32px |
| Guide-Titel | ≈48px / 1 | ≈48px | 500 | tight | `02-linear-desktop.png` „Linear“ x32–155, y135–185 |
| Eyebrow / Sektionslabel | 11px Mono, Uppercase, Tracking 0.18em | 11px | 400 | 0.18em | `guide-canvas.tsx:33`, `02-linear-desktop.png` „TECHNOLOGY“ y112; „DESIGN TOKENS · COPY & PASTE“ y261 |
| Hint rechts | 10px Mono Uppercase, muted/70 | ausgeblendet (`hidden sm:block`) | 400 | wide | `02-linear-desktop.png` „READY“ x801–832, y261; „CAPTURED JUST NOW“ x1126–1232, y361 |
| Kartentitel | 14px | 14px | 600, tight | | `domain-directory.tsx:94`; `01-home-desktop.png` „Apple“ x158–195, y786 |
| Kartenmeta | 11px Mono, muted/80 | 11px Mono | 400 | | `domain-directory.tsx:97`; `06-home-mobile.png` „apple.com · Technology“ Bild-y1650 |
| Code | 13px / 24px Mono, paper/95 | gleich | 400 | | `markdown-copy-block.tsx:81`; `02-linear-desktop.png` y419–800 Zeilenabstand 24px |
| Tab-Label | 12px Mono 500, Hint 10px Uppercase | 14px (Hint versteckt) | | | `guide-tabs.tsx:71–79`; `05-stripe-mobile.png` Bild-y545–610 |

Headline-Farbabstufung: Ink 500 aufrecht vs. Muted 300 kursiv im selben Satz. Das ist der einzige „Stimmwechsel“ der Seite und codiert das Objekt („style guides“) als Zitat (`01-home-desktop.png` y80–224, `06-home-mobile.png` Bild-y170–450).

Mono-Zweitschrift trägt alle Metadaten (Domain, Kategorie, Status, Dateiname, Zeilenzahl) und alle Eyebrows. Sans trägt Aussage und Namen. Diese Zweiteilung ist konsequent über alle sechs Screenshots.

### 1.3 Spacing-Rhythmus (D/Q)

- Main: `max-w-6xl` = 1152px, Padding 80px oben, 32px seitlich, 128px unten (`home-computed.json` MAIN rect; `page.tsx:12`). Mobile: 20px seitlich, 80px oben.
- Hero-Block → Suchfeld: `gap-12 sm:gap-16` = 48/64px (`page.tsx:13`). Im Bild: Absatz endet y≈340, Form beginnt y408 → 64px passt.
- Suchfeld → Kartengrid: `mt-20` = 80px (`page.tsx:31`); Form-Unterkante y464, Grid y544 → 80px (`home-computed.json`).
- H1 → Lead: `mt-6` = 24px.
- Kartengrid: 1/2/3 Spalten, Gap 16/20/24px (`domain-directory.tsx:22`). Desktop: 3×346.66px + 2×24px = 1088px.
- Guide: Grid `minmax(0,1fr) 22rem`, Gap 48px, Sidebar `lg:sticky lg:top-8` (REPORT.md Guide-Absatz; `guide-canvas.tsx:86`). Sidebar-Sektionen `gap-6` = 24px, innerhalb `gap-2.5` = 10px.
- Kartenfuß: `px-5 py-4` = 20/16px, `gap-3` = 12px zwischen Logo, Text, Swatches.
- Codefenster-Header: `px-4 py-3` (Desktop), `px-3 py-2.5` (Mobile); Pre `px-5 py-4`.

Rhythmus: 4er-Basis mit Sprüngen 8 → 10 → 12 → 16 → 24 → 48/64 → 80 → 128. Kleine Abstände (10, 12) bleiben in Sidebar/Kartenfuß; große (64, 80, 128) trennen Hero, Werkzeug und Verzeichnis.

### 1.4 Elemente im Detail

#### Header / Nav (P/Q)
Es gibt keine Nav-Leiste. Zwei fixe Elemente:
- „open source“ Pill oben rechts: `01-home-desktop.png` x1105–1240, y25–57 → Höhe 32px, Padding 6/14px, Radius full, Border `ink/10`, Hintergrund `paper/80` + `backdrop-blur`, `shadow-sm`, GitHub-SVG 16px + Text 14px 500 (`layout.tsx:41–52`). Mobile: nur Icon, 36px Kreis, `06-home-mobile.png` Bild-x1290–1430, y70–210.
- „Context.dev“ Badge unten rechts: Blau `#2663eb`, Radius full, Text 12px, Ring inset `white/15`, `shadow-lg` blau/30, Hover `-translate-y-0.5` (`layout.tsx:60–64`). Überlagert Inhalt: `01-home-desktop.png` Kartenfuß Google x1110–1240, y740–776; `05-stripe-mobile.png` Codeblock Bild-y1585–1660; `06-home-mobile.png` Kartenfuß Bild-y1580–1660.

Nachbau Pill: `<a class="pill">` mit `position:fixed; inset:24px 24px auto auto; display:inline-flex; gap:8px; padding:6px 14px; border-radius:9999px; border:1px solid rgb(10 10 10/.1); background:rgb(251 250 246/.8); backdrop-filter:blur(8px); box-shadow:0 1px 2px rgb(0 0 0/.05)`.

#### Hero (P/D/Q)
- H1 links, `max-w-[14ch]`, `text-balance`, Zeilenhöhe 1.0. Keine Zentrierung, keine Badge, kein Eyebrow.
- Lead `max-w-[58ch]`, Muted.
- Freie rechte Hälfte (x760–1240) bleibt leer bis auf das fixe Pill → Ruhe statt Illustration.

Nachbau: `<h1 style="font:500 72px/1 Inter; letter-spacing:-.025em; max-width:14ch; text-wrap:balance">A supply of <em style="font-weight:300; color:#6f6b66">style guides</em>, generated.</h1>`.

Warum es funktioniert: Größe (72 vs. 18) plus zwei Gewichtsstufen in einer Zeile erzeugen Hierarchie ohne Farbe. Slop-Risiko: Der kursiv-graue Akzent ist ein bekanntes Muster; ohne inhaltlichen Grund wirkt er dekorativ.

#### Suchfeld = Primäraktion (P/D/Q)
- Container: 56px hoch, Radius full, Weiß, 1px Hairline, `pl-6 pr-2` (`domain-search.tsx:34`). `01-home-desktop.png` x88–760, y408–464.
- Focus-within: Border `ink/40`, Ring 4px `ink/5` (Quellcode; Laufzeit nicht belegt).
- Button: 40×40 Kreis, Ink, Papier-Pfeil 16px (Lucide ArrowRight), `aria-label="Generate style guide"`. `home-computed.json` BUTTON rect 40×40 bei x711, y416; Radius 16777216px (= full).
- Disabled `ink/30`, Pending: Spinner statt Pfeil.
- Placeholder 14px muted/70 Desktop, 16px Mobile (Zoom-Schutz iOS).

Nachbau: `<form><div class="field"><input …><button aria-label="…"><svg …/></button></div></form>`; `.field{display:flex;align-items:center;height:56px;padding:0 8px 0 24px;border-radius:9999px;background:#fff;border:1px solid rgb(10 10 10/.08)} .field:focus-within{border-color:rgb(10 10 10/.4);box-shadow:0 0 0 4px rgb(10 10 10/.05)} button{width:40px;height:40px;border-radius:50%;background:#0a0a0a;color:#fbfaf6;display:grid;place-items:center}`.

Warum: Ein einziger dunkler Punkt auf einer weißen Fläche zieht den Blick; der Freiraum davor (Input) macht die Aufgabe klar. Mobile bleibt die Anatomie identisch (`06-home-mobile.png` Bild-y870–985).

#### Karten im Verzeichnis (P/D/Q)
- Ganze Karte ist `<a>` (`domain-directory.tsx:40`). Radius 16px, Hairline, `overflow:hidden`, Papier-Hintergrund.
- Medienzone: `aspect-[16/10]`, Screenshot `object-cover object-top`, Fallback-Farbe = erste Markenfarbe, zusätzlich innerer `outline-1 -outline-offset-1 outline-black/5` als Pseudo-Kante. `01-home-desktop.png` Apple-Karte x88–435, y544–760 (Bildzone ≈216px hoch).
- Fuß: 36px Logokachel (Radius 8px, Weiß, Outline black/5, Logo 24px) · Titel 14px 600 · Meta 11px Mono · Swatches 16px Kreise, `ring-2 ring-paper`, Überlappung −4px (`-space-x-1`). `01-home-desktop.png` y770–800; `06-home-mobile.png` Bild-y1580–1680 zeigt Logokachel 72px Bild = 36px CSS.
- Hover: `-translate-y-0.5`, Border `ink/15`, Schatten `0 18px 40px -22px rgb(10 10 10/.25)`, Bild `scale(1.02)` über 700ms ease-out. Nicht im Screenshot belegt, nur Q.

Nachbau: `<a class="card"><div class="media" style="background:#brand"><img loading="lazy"></div><div class="foot"><span class="mark"><img></span><div><p class="t">Name</p><p class="m">domain · kategorie</p></div><ul class="sw"><li style="background:#hex"></li>…</ul></div></a>`; `.card{display:block;border-radius:16px;border:1px solid rgb(10 10 10/.08);overflow:hidden;transition:transform .2s,box-shadow .2s} .media{aspect-ratio:16/10;position:relative} .media::after{content:"";position:absolute;inset:0;outline:1px solid rgb(0 0 0/.05);outline-offset:-1px}`.

Warum: Bild = Beweis, Text = Navigation. Die Swatches liefern eine zweite, nonverbale Kennung. Slop-Risiko: 42 gleichförmige Karten ohne Gruppierung (`home-computed.json` 42 Links); auf Mobile eine 4.300px lange Einzelspalte.

#### Guide-Seite: Kopf (P/Q)
- „← Back to supply“ Mono 13px muted, y58 (`02-linear-desktop.png` x32–155).
- Eyebrow Kategorie („TECHNOLOGY“, „FINANCE“) Mono 11px Uppercase, y112.
- Titel 48px 500 links; Domainlink Mono 11px Uppercase + External-Icon 12px rechts unten auf Grundlinie (`justify-between items-end`), y172.
- Hairline y213, volle Inhaltsbreite x32–1232 (1200px; Guide nutzt breiteren Container als Home, Padding 32px).
Mobile (`05-stripe-mobile.png`): identische Reihenfolge, Titel und Domainlink teilen eine Zeile, Bild-y300–370.

#### Tab-Leiste (P/Q)
- Container: `rounded-lg border-rule bg-paper p-1`, Höhe ≈40px (`02-linear-desktop.png` x32–832, y283–322).
- Aktiver Tab: Ink-Fläche, Papier-Text, `rounded-md`, `px-3 py-2`, Schatten `0 8px 24px -12px rgb(10 10 10/.35)`; Label Mono 12px 500 + Hint Mono 10px Uppercase paper/60 („RAW MARKDOWN“).
- Inaktiv: Muted, Hover `ink/[0.04]`.
- Mobile: `flex-1`, Hint versteckt, drittes Label wird abgeschnitten „CSS variab…“ (`05-stripe-mobile.png` Bild-x1030–1370, y545–610).

Nachbau: `<div role="tablist" style="display:flex;gap:4px;padding:4px;border:1px solid rgb(10 10 10/.08);border-radius:8px"><button role="tab" aria-selected="true" style="padding:8px 12px;border-radius:6px;background:#0a0a0a;color:#fbfaf6;font:500 12px ui-monospace">DESIGN.md <small style="opacity:.6;text-transform:uppercase;font-size:10px">raw markdown</small></button>…</div>`.

#### Codefenster (P/Q)
- Rahmen: `rounded-xl` 12px, `bg-ink`, Hairline, Schatten `0 24px 60px -30px rgb(10 10 10/.35)` (`markdown-copy-block.tsx:44`). `02-linear-desktop.png` x32–832, y342–800.
- Header ≈44px: drei Kreise 10px `paper/15` (Desktop only), Dateiname Mono 12px Papier, rechts „293 lines · 8,811 chars“ Mono 12px paper/45 tabular, Copy-Button Border `white/10`, Fläche `white/5`, `rounded-md`, `px-2.5 py-1.5`, Icon 14px + „Copy“. Trennlinie `border-white/10`.
- Body: Pre Mono 13px/24px paper/95, `max-h 36rem` mit eigenem Scrollbalken (`02-linear-desktop.png` x823, y396–430 Daumen), `whitespace-pre-wrap`.
- Mobile: Header 14px, Copy-Icon 16px, kein max-h → Codeblock 9.752px hoch (REPORT.md UX-Absatz).

Nachbau: `<figure class="code"><header><span class="dots" aria-hidden></span><p class="file">stripe.com/DESIGN.md</p><p class="meta">297 lines · 9,447 chars</p><button>Copy</button></header><pre><code>…</code></pre></figure>`; `.code{background:#0a0a0a;color:rgb(251 250 246/.95);border-radius:12px;box-shadow:0 24px 60px -30px rgb(10 10 10/.35)} header{display:flex;gap:12px;align-items:center;padding:12px 16px;border-bottom:1px solid rgb(255 255 255/.1)} .dots{display:flex;gap:6px} .dots::before,.dots::after{content:"";width:10px;height:10px;border-radius:50%;background:rgb(251 250 246/.15)} pre{max-height:36rem;overflow:auto;padding:16px 20px;font:13px/24px ui-monospace}`.

Warum: Die einzige Raised-Fläche ist dunkel → das Ergebnis dominiert. Zeilen-/Zeichenzahl ist ein Proof-Element (echte Zahl statt Behauptung). Slop-Risiko: Fake-Fensterpunkte sind Dekoration ohne Funktion; auf Mobile ohne Höhenbegrenzung entsteht ein Scrollmonster.

#### Sidebar „Ingredients“ (P/Q)
- Breite 22rem = 352px; Bild x882–1232 (`02-linear-desktop.png`).
- Kopf: Eyebrow „INGREDIENTS“ + Mono 11px/20px muted/80 Subline, `border-b` (`guide-canvas.tsx:106–115`). y261–325.
- Sektionskopf: 6px Ink-Punkt · Lucide-Icon 12px muted · Label Mono 11px Uppercase Ink · Hint rechts Mono 10px muted/70 (`guide-canvas.tsx:379–403`). y361 „● ⌾ LIVE SCREENSHOT … CAPTURED JUST NOW“.
- Screenshot-Frame: `rounded-md` 6px, Hairline, Punktraster `radial-gradient(circle at 1px 1px, rgb(10 10 10/.05) 1px, transparent 0)` 14px Kachel, Bild `aspect-[16/10] object-top`. y380–598.
- Identity: `grid-cols-2 gap-2`, Slots `aspect-[5/3]`, Radius 6px, Hairline, Caption-Leiste `border-t px-2 py-1.5` Mono 10px Uppercase muted/80. Linker Slot Papier + Logo (max-h 40px, max-w 70 %), rechter Slot `linear-gradient(135deg, primary, accent)` + Mark. `02-linear-desktop.png` y652–782: Linear-Slot links „◆ Linear“, rechts dunkles Verlaufsquadrat mit weißem Mark-Kachel. `04-stripe-desktop.png` y652–782: rechts Violettverlauf `#533afd`→helleres Violett, Mark auf weißer Kachel.
- Weitere Sektionen (Backdrop, Palette, Source payload) liegen unterhalb des Viewports; nur Q belegt: Palette als `grid-cols-3`, Swatch 36px hoch + Hex Mono 10px; Source-Rows mit Status-Punkt (Ink = ok, muted/40 = fehlend).

Nachbau Sektionskopf: `<header style="display:flex;justify-content:space-between;align-items:center"><span style="display:flex;gap:8px;align-items:center"><i style="width:6px;height:6px;border-radius:50%;background:#0a0a0a"></i><svg width=12 …/><span style="font:11px ui-monospace;text-transform:uppercase;letter-spacing:.05em">Live screenshot</span></span><span style="font:10px ui-monospace;text-transform:uppercase;color:rgb(111 107 102/.7)">captured just now</span></header>`.

Warum: Provenienz wird als Material gezeigt, nicht behauptet. Slop-Risiko: „captured just now“ ist statischer Text (REPORT.md, Cache ohne Altersfilter) → Proof-Sprache ohne Proof.

#### Loading-Canvas und Bewegung (Q, nicht im Screenshot)
`globals.css:83–281`: Tile-Reveal 0.7s `cubic-bezier(.2,.8,.2,1)` mit `translateY(10px) scale(.985)`; Shimmer-Sweep 2.4s; Karten-Enter mit `blur(8px)`→0; Bobble 9s ±10px; Progress-Balken 60s bis 97 %; Grain als `radial-gradient` 22px Raster; Vignette `radial-gradient(ellipse, transparent 35%, papier/.55 75%, papier/.95 100%)`; `prefers-reduced-motion` schaltet alles ab. Keine Laufzeitbestätigung.

Slop-Risiko: Blur-Ein-Animationen und schwebende Karten sind AI-Loader-Klischee. Übernehmbar: die eine Kurve `cubic-bezier(.2,.8,.2,1)` und der Reduced-Motion-Block.

#### CTA-Block „Behind the supply“ (Q, unterhalb Viewport)
`raw-data-cta.tsx`: Karte `rounded-2xl` + Hairline, Punktraster 18px opacity .7, Blur-Blob `size-[28rem] blur-3xl` in `#2663eb1a` oben rechts, Grid `1.1fr 1fr`, H2 30/36px 500 `max-w-[18ch]`, Pill-Button blau mit `ring-inset white/15` und Schatten `0 12px 32px -10px #2663eb66`, Mock-API-Fenster mit „GET“-Badge grün `rgb(52 211 153/.15)`. Einziger Ort mit Fremdfarbe; der Blob ist der einzige Glow der Seite.

### 1.5 Mobile (P/Q)
- `06-home-mobile.png`: H1 48px drei Zeilen (Bild-y170–450), Lead 16/28 (Bild-y500–770), Suchfeld volle Breite 56px (Bild-y870–985), Karte einspaltig, Bildzone 16/10 (Bild-y1145–1560), Fuß mit 36px Logokachel. Seitliches Padding 20px.
- `05-stripe-mobile.png`: Titel 48px, Domainlink rechts auf Grundlinie, Tab-Bar `flex-1` mit Truncation, Codeblock ohne Höhengrenze, Mono 13/24 umbrechend. Sidebar erst nach dem gesamten Code (Q: `lg:` Grid, darunter Stack).
- Fixe Badges überdecken Inhalt in beiden Mobile-Bildern (Bild-y1580–1660).
- Placeholder/Inputs 16px auf Mobile, 14px Desktop (`text-base/6 sm:text-sm/5`) → verhindert iOS-Zoom.

---

## 2. Die drei Markenaufnahmen (Fremd-Screenshots, 1920×1080)

### 2.1 Linear (`linear-source-home.png`, `linear-DESIGN.md`)
- **P** Nav 72px: Wortmarke links x312, Links 14px hellgrau ≈`#8a8f98` rechts, Trenner, „Log in“ Text, „Sign up“ heller Button ≈72×32px, Radius ≈8px, Text dunkel 13px 500 (x1520–1594, y20–52). **Kein Pill.**
- **P** Headline 2 Zeilen ≈64px weiß, Gewicht ≈500, Tracking eng, links x312, y270–400. Subline 16px grau y443. Rechts kleiner Ankündigungs-Link mit farbigem Punkt (x1285–1590, y444).
- **P** Produktkarte ab y528, x293–1610, Radius ≈12px, 1px Rand `white/10`, Fläche ≈`#0f1011` auf Grund ≈`#08090a`. Innere App-UI mit Sidebar, Issue-Detail, Cursor-Agent-Panel. Text darin lesbar (12–16px).
- **P** Hintergrund oben minimal heller als unten (Verlauf ≈`#0c0d0e` → `#08090a`), kein Glow, kein Grain.
- **G** Guide: Display 56/61.6px 510 −1.232px; Body 15/24; Spacing 6/14/24/36/128; Primärbutton Pill 44px min. Höhe, Padding 14/20.
- **G-Widerspruch zu P:** Guide verlangt Pillen und verbietet Rechtecke; Bild zeigt abgerundetes Rechteck (REPORT.md nennt denselben Befund). Guide-Display 56px, Bild eher 64px bei 1920 breit (unbekannter Viewport, nicht messbar).
- **D-Defekt:** `linear-DESIGN.md` hat nur eine `---`-Zeile → kein gültiges Frontmatter. `linear-tokens.css` beginnt mit hellem `:root` (`--primary: #c3c3c4`), dunkel nur in `.dark` → Export widerspricht Guide (Primär `#e5e5e6`).

Nachbau Linear-Karte: `.panel{background:#0f1011;border:1px solid rgb(255 255 255/.1);border-radius:12px;box-shadow:inset 0 1px 0 rgb(255 255 255/.04)}` auf `body{background:#08090a;color:#f7f8f8}`. Sekundärbutton laut G: `box-shadow: inset 0 0 0 1px rgb(255 255 255/.03), inset 0 1px 0 rgb(255 255 255/.04), 0 0 0 1px rgb(0 0 0/.6), 0 4px 4px rgb(0 0 0/.1)` — Inset-Rand statt Border.

### 2.2 Anthropic (`anthropic-source-home.png`, `anthropic-DESIGN.md`)
- **P** Grund warm ≈`#f0eee6` (Guide sagt `#faf9f5`; Pixel wirkt dunkler/wärmer — Abweichung unklar, Aufnahme-Farbraum unbekannt).
- **P** Nav 68px: Wortmarke „ANTHROP\C“ fett 18px x324, Links 14px, „Try Claude“ schwarzer Split-Button ≈150×36px Radius ≈6px mit Chevron-Segment (x1442–1596, y16–52).
- **P** Headline 3 Zeilen ≈64px Sans 700 Ink, x324–990, y215–430; zwei Wörter mit dicker Unterstreichung (≈4px, Textfarbe) → Links im Headline-Text.
- **P** Rechts Serif-Absatz ≈24px/34px, x1084–1540, y290–420. Zwei Spalten ≈ 55/45, obere Kanten nicht bündig (Absatz vertikal mittig zur Headline).
- **P** Storykarte y545 bis Bildrand, x324–1596 (1272px), Radius ≈16px, Fläche ≈`#141413`. Links Serif-Display „Project Glasswing“ ≈110px weiß, darunter Serif-Untertitel ≈20px in ≈`#3a3a38` — sehr schwacher Kontrast (y975–1010). Rechts Netz-Grafik (weiße Zellenlinien, Rasterfüllung) als Bild.
- **G** Buttons 4px Radius, 8/16px Padding, min 40×120; Karte 8px Radius, 16px Padding, Border `#e5e7eb` (kühles Grau auf warmem Grund — Tailwind-Default statt Markenwert; A: verdächtig).
- **G-Widerspruch:** YAML `inverse-surface: #141413`, Prosa gruppiert `inverse-surface` mit `#000000`.

Nachbau Hero: `<section style="display:grid;grid-template-columns:1.2fr 1fr;gap:96px;align-items:center"><h1 style="font:700 64px/1.05 sans">AI <a style="text-decoration:underline;text-decoration-thickness:4px;text-underline-offset:6px">research</a> and …</h1><p style="font:400 24px/1.4 serif">…</p></section>`.

### 2.3 Stripe (`stripe-source-home.png`, `stripe-DESIGN.md`)
- **P** Nav 76px weiß mit Hairline unten (y76): Wortmarke x338, Dropdown-Links 15px navy mit Chevron, „Sign in“ weißer Button mit 1px Rand ≈85×40 (x1338–1422), „Contact sales ›“ violett ≈`#635bff` ≈138×40 Radius ≈4px (x1430–1568).
- **P** Ribbon: diagonales Farbband (Blau `#7ab5ff` → Orange `#ff8a3c` → Pink `#ff4f9a` → Violett) von oben Mitte nach unten rechts, beschnitten an y880; weicht hinter dem Text zurück (Text bleibt lesbar durch Textfarbe, nicht durch Overlay).
- **P** Eyebrow „Global GDP running on Stripe: 1.63207271%“ 14px, y270. Headline 4 Zeilen ≈52px/58px, Gewicht ≈400 (Guide sagt 300 — Pixel wirkt normaler), Farbe wechselt innerhalb der Zeile von Navy `#0a2540` zu Blau/Violett ≈`#4c5fff` auf den späteren Wörtern → Gradient-Text oder Farbschwellen pro Wort (x440–1370, y325–540).
- **P** Buttons y580–628: „Get started ›“ violett 141×48 Radius 4; „Sign up with Google“ weiß mit hellviolettem 1px Rand ≈`#c9c9ff`, gleiche Höhe, 10px Abstand.
- **P** Logoschiene y845: 8 Logos, teils farbig (amazon, nvidia, coinbase, Google, shopify), Abstand ≈170px, über Hairline y880.
- **P** Nächste Sektion y997: 36px Sans, erster Satz navy, Rest muted `#425466`-ähnlich.
- **P** Chat-Widget unten rechts: weiße Karte mit Schatten, Radius ≈12px, Icon-Kachel violett/hellviolett.
- **G** Radius 4/6/8/12, Spacing 6/14/24/40/80, Karte Schatten `rgba(0,0,0,.1) 0 20.187px 40.374px -20.187px` (krumme Werte = gemessen, nicht designt).

Nachbau Headline mit Farbwechsel: `<h1 style="font:400 52px/1.12 sans;letter-spacing:-.02em;color:#0a2540">Financial infrastructure to grow <span style="background:linear-gradient(90deg,#0a2540,#4c5fff);-webkit-background-clip:text;color:transparent">your revenue.</span>…</h1>`. Ribbon als einzelnes Raster/SVG `position:absolute; right:-10%; top:-20%; width:60%; pointer-events:none; z-index:-1`.

---

## 3. Gemeinsamkeiten im Paket

1. **Ein Rollensatz, wenig Hues.** Alle vier Oberflächen (Supply, Linear, Anthropic, Stripe) arbeiten mit Page/Text/Muted/Hairline + höchstens einer Aktionsfarbe. Supply und Anthropic: Ink als Aktion. Stripe: Violett als Aktion. Linear: Hell auf Dunkel.
2. **Linksbündige Headline, Freiraum rechts.** `01-home-desktop.png`, `linear-source-home.png`, `anthropic-source-home.png`, `stripe-source-home.png` — nie zentriert.
3. **Beweis direkt unter dem Versprechen.** Supply: Kartengrid mit echten Screenshots. Linear: Produktbild. Anthropic: Story-Karte. Stripe: Logoschiene.
4. **Border-Stärke 1px, Alpha statt Grau.** Supply `rgb(10 10 10/.08)`; Linear `white/10`; Anthropic `#e5e7eb`; Stripe hellviolett.
5. **Schatten nur an Raised-Flächen, negativer Spread.** Supply `0 24px 60px -30px`, Stripe `0 20px 40px -20px`. Keine Glows außer Supply-CTA-Blob.
6. **Monospace für Metadaten** (nur Supply); Marken nutzen eine Sans (Linear, Stripe) oder Sans+Serif (Anthropic).
7. **Aktionen sind klein und wenige.** Supply: 1 Kreis. Linear: 1 heller Button. Anthropic: 1 schwarzer Split-Button. Stripe: 1 violett + 1 Outline.

## 4. Dos
- Eine dunkle Fläche pro Ansicht (Codefenster, Produktkarte, Storykarte) als Raised-Ebene; Rest bleibt Page.
- Hairline als `rgb(ink / 0.08)` definieren, damit sie auf jeder Papier-Nuance stimmt.
- Metadaten in Mono 10–11px Uppercase mit 0.18em Tracking, Aussagen in Sans.
- Ganze Karte als Link; Bildzone mit festem Seitenverhältnis (16/10) und `object-position: top`.
- Echte Zahlen als Proof (Zeilen, Zeichen, Anzahl Tokens) statt Adjektive.
- Inputs 16px auf Mobile, 14px Desktop.
- `prefers-reduced-motion` global abschalten.
- Eine Easing-Kurve `cubic-bezier(.2,.8,.2,1)` für alle Einblendungen.

## 5. Don'ts
- Fixe Badges über Inhalt legen (Supply: dreimal belegt).
- Codeblöcke auf Mobile ohne `max-height` (9.752px).
- Fake-Fensterpunkte, Blur-Einflüge, Bobble-Loops ohne Funktion.
- Guide-Werte (G) als gemessene Werte behandeln: Linear-Pill vs. Rechteck, Anthropic-Border `#e5e7eb`, Stripe-Gewicht 300 vs. sichtbar 400.
- Statische Proof-Texte („captured just now“).
- Drei Markensysteme mitteln; eine Leitquelle wählen.
- Unterstrichene Wörter in Headlines ohne Linkfunktion kopieren (Anthropic-Muster ist Navigation).
- Sehr schwache Untertitel auf Schwarz (Anthropic Story-Karte ≈`#3a3a38` auf `#141413`).

## 6. Unlesbar / nicht belegbar
- `04-stripe-desktop.png`: linke Spalte leer (Streaming-Zwischenzustand), keine Aussage über Codeblock-Layout möglich.
- Sidebar-Sektionen Backdrop, Palette, Source payload: unterhalb aller Viewports, nur Quellcode.
- Hover-, Focus- und Loading-Zustände: nur Quellcode, keine Pixel.
- Exakte Schriftgrößen in den 1920×1080-Fremdaufnahmen: Viewport/DPR unbekannt, Werte sind Schätzungen mit ±10 %.
- Exakter Anthropic-Hintergrundton: Pixel ≈`#f0eee6`, Guide `#faf9f5`; Ursache (Farbprofil vs. Fehlmessung) offen.
- Stripe-Headline-Farbwechsel: Gradient-Text oder Wort-Spans nicht unterscheidbar.
- `*-api.json`: Vercel-Checkpoint-HTML, keine Daten.
