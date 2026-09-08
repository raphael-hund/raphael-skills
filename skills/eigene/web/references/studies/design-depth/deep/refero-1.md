# Analyse refero-1 (platform-images) — Wie diese neun Screens gebaut sind

Stand 07.09.2026. Alle neun Bilder mit Read geöffnet, zusätzlich Pixelproben (PIL) und 2x-Crops
von Nav/Terminal/Modal/Form-Fuß. Hex-Werte sind JPEG-Proben, keine CSS-Messung. B = Bild,
Q = Refero-Quelltext aus REPORT.md, R = eigenes Rezept. Schriftgrößen sind in Bildpixeln geschätzt
(Mercury/Acne/On/Rox: 1120px-Preview ≈ 0,78 des 1440-Viewports; Oxide/CLOU: 1440px = 1:1).

---

## 1. Mercury Mega-Menü — `13c48a4c-7882-422f-ac3b-0954163a6c7c.jpg`

### Geometrie
- Announcement-Bar oben (y 0–38): 38px hoch, Text mittig, Sparkle-Icon links + Pfeil rechts. Darunter 1px hellere Linie.
- Nav (y 40–100): 60px hoch. Logo links bei x 27; Nav-Items ab x 310, Abstand ca. 40px; Log in / Open account rechts.
- Aktiver Trigger „Products" (x 310–410, y 53–87): Pille, 34px hoch, Padding ≈ 16px horizontal, Radius voll (9999px), Chevron zeigt nach oben.
- CTA „Open account" (x 977–1092): gleiche Höhe 34px, Pille, Padding ≈ 16px.
- Panel (y 100–565): volle Breite, 1px Border oben/unten. Drei Spalten: Intro 0–373px (1/3), rechts 2×2 Raster (373–747, 747–1120). Raster-Zellen durch 1px-Linien getrennt, Zellenhöhe ≈ 215px.
- Zellen-Padding: 27px links (x 401 in Zelle bei 373), ≈ 28px oben. Intro-Padding 27px.
- Zeile „Personal Banking" (y 495–565): 70px hoch, Text + kreisförmiger Pfeil-Chip (28px, Radius voll).
- „Try the demo" Chip (x 27–138, y 222–250): 28px hoch, Pille, Text 13px, Pfeil-Icon rechts.
- Disclaimer (y 570–600): zentrierte Pille ca. 750px breit, 30px hoch, dunkler als Panel; sitzt „auf" dem Foto darunter.

### Material (Rollentabelle)
| Rolle | Hex (Probe) | Wo |
|---|---|---|
| Page/Panel | #272733 / #242430 | Panelfläche, Nav |
| Announcement | #28253a (leicht violett) | Top-Bar |
| Border | #3a3947 / #3c3848 | Zellenlinien, Panel-Rahmen (1px) |
| Raised (Chip) | #3c4058 | Try the demo, Pfeil-Kreis |
| Active Nav | #505874 | Products-Pille |
| Action | #5064e8 (Blau) | Open account |
| Text primär | ≈#eceef5 | Titel |
| Text sekundär | #a9abb7 (Erklärung) | Kurztexte |
| Muted Label | #84848e | PRODUCTS Eyebrow |
| Disclaimer | #1c1c28 | Pille unten |
Keine Schatten, kein Verlauf im Panel. Foto darunter (#2f3035, dunkelgrün-grau) wird vom Panel verdeckt, kein Blur sichtbar (nicht sicher, Panel scheint opak).

### Typografie
- Sans (geometrisch-humanist, ähnlich „Inter"/„Graphik"). Body-Bezug ≈ 13px (Links).
- Zellen-Titel „Banking & More": ≈ 16px, Gewicht 500–600, Tracking normal.
- Intro-Titel „Business Banking": ≈ 18px, 500.
- Erklärung: 13px, 400, Farbe sekundär, Zeilenhöhe ≈ 1.45.
- Eyebrow „PRODUCTS": 11px, 500, Tracking ≈ +0.08em, Uppercase, muted.
- Link-Liste: 13px, 400, Zeilenabstand 20px (y 222, 242, 262, 282).
- „Personal Banking": ≈ 18px, 500.
- Disclaimer: 10–11px, 400.

### Nachbau
```html
<nav class="nav"><a class="logo">…</a>
  <ul><li><button class="trigger is-open" aria-expanded="true">Products <svg chevron/></button></li>…</ul>
  <a class="btn btn-primary">Open account</a></nav>
<div class="mega" role="region">
  <section class="mega__intro"><h3>Business Banking</h3><p>…</p><a class="chip">Try the demo ↗</a></section>
  <div class="mega__grid">  <!-- 4 × section.cell -->  </div>
  <a class="mega__foot">Personal Banking <span class="chip-round">→</span></a>
</div>
```
```css
.nav{height:60px;background:#272733}
.trigger{height:34px;padding:0 16px;border-radius:9999px;color:#eceef5;background:transparent}
.trigger.is-open{background:#505874}
.btn-primary{height:34px;padding:0 16px;border-radius:9999px;background:#5064e8;color:#fff}
.mega{border-block:1px solid #3a3947;display:grid;grid-template-columns:1fr 2fr}
.mega__grid{display:grid;grid-template-columns:1fr 1fr;border-left:1px solid #3a3947}
.cell{padding:28px 27px;min-height:215px;border-bottom:1px solid #3a3947}
.cell:nth-child(odd){border-right:1px solid #3a3947}
.eyebrow{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#84848e;margin:24px 0 8px}
.cell ul{display:grid;gap:6px;font-size:13px}
.chip{height:28px;padding:0 12px;border-radius:9999px;background:#3c4058;font-size:13px}
```
Linien als `border`, nicht als `gap`+Hintergrund. Chips als echte `<a>`.

### Warum es funktioniert / Fehler
- Drei Hierarchiestufen pro Zelle (Titel → Erklärung → Eyebrow+Links) erzeugen scannbares Raster. Linien statt Karten sparen Rauschen.
- Aktiver Trigger als gefüllte Pille + Chevron-Flip = eindeutiger Zustand.
- Slop-Risiko: Zwei Blautöne (Top-Bar-Violett vs. Panel) laufen nah beieinander; Disclaimer-Pille mit 10px Text auf Foto ist an der Lesbarkeitsgrenze. Panel ist sehr hoch (465px); auf 768px-Höhe scrollt es.

---

## 2. Oxide Hero — `57399d2f-b94d-48df-a573-2c423077b16c.jpg` (1440×900)

### Geometrie
- Nav (y 0–60): 60px, 1px Border unten (#0c0f14→ minimal heller). Logo links x 40; Nav mittig-links ab x 433; zwei Buttons rechts.
- Buttons: „TRY NOW" (x 1183–1262, y 15–45): 30px hoch, Padding ≈ 12px, 1px Border #2a2c30, Radius ≈ 2px, transparent. „CONTACT SALES" (x 1271–1399): 30px, Fill #002820, Text #00d892, gleicher Radius.
- Terminal-Karte (x 40–436, y 100–350): 396×250px, Radius ≈ 2px, Fill #18181c, Header 38px mit Tabs (CLI aktiv grün, 2px Unterstrich #00d892) + Skeleton-Balken rechts. Body Padding 16px.
- Verbinder: 1px Linie #2a2f33 von Terminal-rechts (x 450, y 225) → horizontal 90px → Diagonale 45° nach unten rechts → horizontal bis x 805, y 357. SVG-Polyline.
- Rack-Render (x 835–1400, y 190–870): 3 Racks, ≈ 40% Breite, angeschnitten unten.
- „FIG. 1" Kasten (x 1172–1230, y 150–170): 1px Border #3b464c, Mono 11px, Label rechts daneben #7d8286.
- Punktraster rechts (x 1405–1440, y 150–900): Dots ≈ 2px, Pitch ≈ 8px, Farbe #344044; verläuft nach links aus (Opacity-Fade).
- Headline (x 40, y 560–690): zwei Zeilen, ≈ 64px Größe, Zeilenhöhe ≈ 1.05.
- Logo-Streifen (y 760–860): Eyebrow „POWERING THE BEST TEAMS" Mono 11px mit 1px Linie links/rechts; Logos grau #57585d, horizontal scrollend (links angeschnitten „h").

### Material
| Rolle | Hex | Wo |
|---|---|---|
| Page | #080c10 / #0a0d12 | Canvas (Q: #0b0e12) |
| Surface | #18181c | Terminal |
| Border | #2a2c30 / #303235 (Q) | Buttons, Nav-Linie |
| Accent | #00d892 (Q) / Probe #3ce09a | Logo, Tab-Unterstrich, CTA-Text, Rack-Sleds |
| Action fill | #002820 (Q #002923) | Contact sales |
| Text | #eaebef Headline; #b8b9bd Mono-Body; #7d8286 Muted; #57585d Logos |
| Raster | #344044 Dots | rechter Rand |
Kein Schatten, kein Glas. Ein diffuser dunkelblauer Schimmer hinter den Racks (x 700–1100, y 200–600, Probe ≈ #0e1419) — sehr subtiler radialer Gradient, nicht sicher (könnte Render-Schatten sein).

### Typografie
- Headline: Sans (Q SuisseIntl), 400, ≈ 64px, Tracking ≈ -0.01em, Farbe #eaebef, Zeilenhöhe 1.05. Keine Farbabstufung innerhalb.
- Nav: Mono, 12px, Uppercase, Tracking +0.05em, #b8b9bd. Chevrons 10px.
- Buttons: Mono 11–12px, Uppercase, Tracking +0.06em.
- Terminal: Mono 13px; Prompt `~>` gedämpft #6b6e73, Befehl #dedede, „Enter code" #5a5d62, Cursor als 8×14 Block #b8b9bd.
- Tabs: Mono 11px Uppercase; aktiv #00d892.

### Nachbau
```html
<header class="nav"><a class="logo"><svg…/></a><nav class="mono">…</nav>
  <a class="btn btn-ghost">Try now</a><a class="btn btn-accent">Contact sales</a></header>
<section class="hero">
  <figure class="term"><div class="term__tabs"><button aria-selected="true">CLI</button>…</div>
    <pre><code><span class="p">~&gt;</span> oxide auth login
<span class="m">Enter code</span>
LU8A-9AMP

<span class="p">~&gt;</span> oxide instance<span class="cursor"></span></code></pre></figure>
  <svg class="connector" viewBox="0 0 360 135"><polyline points="0,0 90,0 245,135 360,135" fill="none" stroke="#2a2f33"/></svg>
  <h1>On-prem that feels<br>like the public cloud</h1>
  <figure class="rack"><figcaption class="fig"><span class="fig__n">Fig. 1</span> Oxide cloud computer</figcaption><img src="rack.webp" alt="…"></figure>
</section>
```
```css
:root{--bg:#0b0e12;--surface:#18181c;--line:#303235;--ink:#dedede;--mute:#7d8286;--green:#00d892;--green-fill:#002923}
.nav{height:60px;border-bottom:1px solid var(--line);font:500 12px/1 'GT America Mono',monospace;letter-spacing:.06em;text-transform:uppercase}
.btn{height:30px;padding:0 12px;border-radius:2px;border:1px solid var(--line)}
.btn-accent{background:var(--green-fill);color:var(--green);border-color:transparent}
.term{width:396px;background:var(--surface);border-radius:2px;font:13px/1.55 monospace}
.term__tabs button[aria-selected=true]{color:var(--green);box-shadow:inset 0 -2px 0 var(--green)}
.cursor{display:inline-block;width:.5em;height:1.1em;background:#b8b9bd;vertical-align:-.15em}
.hero{background-image:radial-gradient(circle,#344044 1px,transparent 1.5px);background-size:8px 8px;/* nur rechter Streifen via mask */
  mask-image:linear-gradient(to left,#000 0,#000 40px,transparent 300px)}
.fig__n{border:1px solid #3b464c;padding:2px 6px;margin-right:8px}
h1{font:400 clamp(40px,4.5vw,65px)/1.05 'Suisse Intl',sans-serif;letter-spacing:-.01em;color:#eaebef;max-width:12ch}
```
Punktraster als CSS `radial-gradient` in eigenem absoluten Div mit `mask-image`. Verbinder als SVG, nicht als rotierte Divs.

### Warum es funktioniert / Fehler
- Beweis-Dreieck: Code (links oben) → Linie → Hardware (rechts). Die Linie erklärt Kausalität ohne Copy.
- Grün wird sparsam an vier Stellen benutzt: Logo, Tab, CTA, Hardware-Sleds. Medium und UI teilen sich den Akzent.
- Fehler: Logo-Streifen #57585d auf #0b0e12 ≈ 3.5:1, für Wortmarken grenzwertig. Nav 12px Mono ist klein. Skeleton-Balken im Terminal-Header ist Dummy-UI (Slop, wenn ohne Funktion).

---

## 3. CLOU Architects — `5c404b95-00d9-4188-9db0-03692ad28a3e.jpg` (1440×900)

### Geometrie
- Nav (y 0–75): Logo (4 geometrische Glyphen, 100×25px) bei x 25; Links ab x 157, Abstand 18px; aktiver Link „Info" mit 1px Unterstrich, Offset ≈ 3px; Sprachwechsel rechts, „En" unterstrichen, „/" Trenner, „中文".
- Schwarzer Block (x 90–1367, y 116–306): 1277×190px, keine Rundung. Padding ≈ 8px oben, Text links x 100 → Padding ≈ 10px. Block ist enger als das Foto (x 25–1415) — asymmetrischer Einzug 65px.
- Foto (x 25–1415, y 340–540): 1390×200px, Seitenverhältnis ≈ 7:1, kein Radius. `object-fit: cover; object-position: center`.
- Rest darunter leer (weiß) — Screenshot endet, Seite scrollt vermutlich.

### Material
| Rolle | Hex | Wo |
|---|---|---|
| Page | #fffffb (Q #fffffc) | Canvas |
| Ink | #000000 | Block, Logo, Nav-Text |
| Text on Ink | #ffffff | Headline |
| Foto | Rot #c8202a / Grün Pflanze / Glasdach | Medium trägt Farbe |
Keine Border, kein Schatten, keine Verläufe.

### Typografie
- Headline „We do social space.": Grotesk (Q Circular Std) 400, ≈ 150px, Tracking ≈ -0.04em, Zeilenhöhe ≈ 1.0, Weiß auf Schwarz, eine Zeile. Sitzt im Block mit 8–10px Padding — die Ober-/Unterlänge berührt fast die Kante.
- Nav: 17px, 400, Tracking normal.

### Nachbau
```html
<header><a class="logo"><svg viewBox="0 0 100 25">…</svg></a><nav><a>Projects</a><a aria-current="page">Info</a><a>Contact</a></nav><nav class="lang"><a aria-current>En</a>/<a>中文</a></nav></header>
<h1 class="slab">We do social space.</h1>
<img class="strip" src="…" alt="…">
```
```css
body{background:#fffffc;color:#000;font:400 17px/1.3 'Circular Std',sans-serif}
header{display:flex;align-items:center;gap:16px;padding:25px}
nav a[aria-current]{text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1px}
.slab{margin:40px 73px 0 90px;background:#000;color:#fff;padding:.05em .07em;font-size:clamp(48px,10.4vw,150px);line-height:1;letter-spacing:-.04em;font-weight:400;white-space:nowrap}
.strip{display:block;width:calc(100% - 50px);margin:34px 25px 0;aspect-ratio:7/1;object-fit:cover}
```
Wichtig: `line-height:1` + minimaler Padding, damit der Block als Satzfläche und nicht als Card wirkt.

### Warum es funktioniert / Fehler
- Ein Satz, ein Bild, kein CTA: Kontrast durch Größe (150px vs 17px = 9×).
- Der schwarze Block macht die Headline zum Objekt; Foto darunter liefert die einzige Farbe.
- Fehler/Risiko: `white-space:nowrap` bricht bei deutschen Sätzen; Mobile braucht mehrzeilige Neukomposition. Foto 7:1 zeigt fast nichts vom Projekt (Atmosphäre, kein Beweis).

---

## 4. On Menü-Panel — `35affe14-fb40-4edc-966b-a50c26c7aad8.jpg`

### Geometrie
- Panel (x 427–1120, y 0–629): weiße Fläche, 62% Breite, Vollhöhe, kein Radius, kein Schatten sichtbar an Kante (Probe x 426 = Foto, x 428 = #fcfcfc, harte Kante).
- Panel-Nav (y 20–55): „Shop" aktiv mit 1px Unterstrich, Offset 4px; „Activities", „Explore" Abstand 28px. Rechts Icons (Search, Bag, AI-Sparkle mit schwarzem „AI"-Badge 6px Radius, Account in blass-lila Kreis #f3e8f8 ≈ 28px).
- Kategorien (ab y 130): „Women" 26px; „Men" 26px mit 25px-Strich (2px) links + Einrückung 40px; Unterpunkte 15px, Zeilenabstand 23px; „Kids" 26px; danach zweite Ebene „Shop all/Featured/…" 26px.
- Links: Foto-Hero (x 0–427): Headline „On FormTec™ Train Tig…" ≈ 34px, weiß; Subline 22px weiß; zwei weiße Pillen-Buttons 40px hoch, Radius voll, Text 13px 500 schwarz.
- Logo oben links weiß 40px.

### Material
| Rolle | Hex | Wo |
|---|---|---|
| Panel | #fcfcfc | Menü |
| Ink | #111 | Text |
| Photo | #18231f (dunkel) | Hero |
| Action (hell) | #ffffff auf Foto | Pillen |
| Accent | #f3e8f8 | Account-Kreis |
| Badge | #272727 | AI-Label |

### Typografie
- Grotesk (Ähnlich „On Grotesk"/Founders). Panel-Nav 16px 500; Kategorien 26px 500; Unterpunkte 15px 400; Hero H1 34px 500; Hero Sub 22px 400.
- Zustand „geöffnet" = Strich links + Einrückung, nicht Fett/Farbe.

### Nachbau
```html
<aside class="drawer"><nav class="drawer__top"><a aria-current>Shop</a>…</nav>
 <ul class="cats"><li><button>Women</button></li>
  <li class="open"><button aria-expanded="true">Men</button><ul class="sub">…</ul></li>
  <li><button>Kids</button></li></ul></aside>
```
```css
.drawer{position:fixed;inset:0 0 0 auto;width:62vw;background:#fff;padding:20px 27px;overflow:auto}
.drawer__top a[aria-current]{text-decoration:underline;text-underline-offset:4px}
.cats button{font:500 26px/1.35 sans-serif;padding:0}
.cats .open>button{padding-left:40px;position:relative}
.cats .open>button::before{content:"";position:absolute;left:0;top:50%;width:25px;height:2px;background:#111}
.sub{font-size:15px;line-height:23px;margin:6px 0 30px}
.pill{height:40px;padding:0 20px;border-radius:9999px;background:#fff;color:#111;font:500 13px/1}
```

### Warum es funktioniert / Fehler
- Progressive Offenlegung: nur ein Zweig offen; Größe (26 vs 15px) trennt Ebenen ohne Linien.
- Fehler: Panel schneidet Hero-Headline ab (kein Overlay-Dimming) — Hintergrund bleibt aktiv-wirkend. Zweite 26px-Liste („Shop all/Featured…") ist optisch gleichrangig mit Kategorien → Hierarchiebruch (unklar ob Scroll-Artefakt).

---

## 5. Rox Payment-Modal — `49229bf2-3256-4465-8754-b7d6f2a10c59.jpg`

### Geometrie
- Dashboard-Shell: Sidebar 170px (Logo, 5 Items mit 16px Icons, Zeilenabstand 33px, Avatar unten). Content-Card rechts mit Radius ≈ 12px, 1px Border.
- Overlay: #a4a4a4 über #f4f4f0 → schwarz ≈ 30% Opacity.
- Modal (x 314–806, y 70–557): 492×487px, Radius ≈ 12px, Fill #f4f4f0 (warmes Off-White), Schatten weich (Rand nicht messbar, Kante hart erkennbar → leichter Shadow ≈ 0 8px 24px rgba(0,0,0,.12)). Padding 18px.
- Close „×" oben rechts 18px Icon, 14px vom Rand.
- Formular: zwei Spalten 1fr / 1.6fr (Label x 331, Feld x 505–789). Gruppen durch 1px Divider #e6e6e2 getrennt, Gruppen-Höhe ≈ 85–110px.
- Card-Feld (y 154–180): 26px hoch, Radius 6px, Fill #f6ccd0 (Rot 12%), Text Rot #c9282e; „MM / YY  CVC" als Inline-Placeholder in derselben Zeile. Fehlertext darunter 11px rot, 8px Abstand.
- Billing Contact Input: 26px, Radius 6px, Fill #fcfcfc (weißer als Modal), Placeholder #999, 1px Border #e5e5e2.
- Skeleton-Adressblock: 3× (Label-Balken 55–90px×8px + Feld 26px), Fill #ececec, Radius 4px.
- Footer: „Cancel" (x 622–678, 28px hoch, weiß, 1px Border, Radius 6px) und „Save Method" (x 685–789, disabled, Fill #f8f8f8, Text #9a9a9a, Icon Kreditkarte).
- Hintergrund-Card: Upgrade-Button beige #a09084 (gold-braun), Progress-Bar Rot #922b2e — Warnung „Kontingent verbraucht".

### Material
| Rolle | Hex | Wo |
|---|---|---|
| Page | #f4f4f0 | Shell + Modal |
| Surface Input | #fcfcfc | aktive Felder |
| Border | #e6e6e2 | Divider, Inputs |
| Overlay | rgba(0,0,0,.3) | Scrim |
| Danger bg | #f6ccd0 | invalides Feld |
| Danger text | #c9282e | Fehlerzeile |
| Muted | #9a9a9a | disabled, Placeholder |
| Skeleton | #ececec | Lade-Balken |
| Warn | #a09084 / #922b2e | Upgrade, Progress |

### Typografie
- Sans (SF/Inter-artig). Modal-Titel 16px 600; Gruppenlabel 14px 400 #333; Feld-Label „Card" 11px #666; Feldwert 12px; Fehlertext 11px; Buttons 12px 500.

### Nachbau
```html
<div class="scrim"><dialog class="modal" open><header><h2>Add Payment Method</h2><button aria-label="Close">×</button></header>
 <form><fieldset class="group"><legend>Payment Method</legend>
  <label for="card">Card</label>
  <div class="field is-invalid"><input id="card" aria-invalid="true" aria-describedby="card-err" value="1234 5678 9098 7655"><span class="ph">MM / YY</span><span class="ph">CVC</span></div>
  <p id="card-err" class="err">Your card number is invalid.</p></fieldset>
  …
  <footer><button type="button" class="btn">Cancel</button><button class="btn" disabled>Save Method</button></footer></form></dialog></div>
```
```css
.scrim{position:fixed;inset:0;background:rgba(0,0,0,.3)}
.modal{width:492px;border:0;border-radius:12px;background:#f4f4f0;padding:18px;box-shadow:0 8px 24px rgba(0,0,0,.12)}
.group{display:grid;grid-template-columns:1fr 1.6fr;gap:8px 16px;padding:20px 0;border-bottom:1px solid #e6e6e2}
.field{display:flex;height:26px;border-radius:6px;background:#fcfcfc;border:1px solid #e6e6e2;padding:0 8px;font-size:12px}
.field.is-invalid{background:#f6ccd0;border-color:transparent;color:#c9282e}
.err{color:#c9282e;font-size:11px;margin-top:8px}
.btn{height:28px;padding:0 12px;border-radius:6px;background:#fff;border:1px solid #e6e6e2;font:500 12px/1}
.btn:disabled{background:#f8f8f8;color:#9a9a9a;border-color:#eee}
.skel{height:26px;border-radius:4px;background:#ececec}
```

### Warum es funktioniert / Fehler
- Fehler ist dreifach codiert: Feldfüllung, Textfarbe, Fehlerzeile direkt unter dem Feld. Save disabled als Konsequenz.
- Warmes Off-White (#f4f4f0) statt reinem Weiß gibt den weißen Inputs Kontrast, ohne Border zu brauchen.
- Fehler: Kartenfeld als Rot-Fläche (12%) ist stark; „MM / YY CVC" bleibt im selben roten Feld, obwohl nur die Nummer falsch ist. Skeleton unter Adress-Feldern ohne Erklärung. Modal 26px-Inputs sind für Touch zu klein.

---

## 6–8. Acne Studios Appointment-Flow — `3acf3200` (leer) → `53b1f56c` (gefüllt) → `33db4d94` (Erfolg) + `-full`

### Geometrie (identisch in allen drei)
- Top-Nav (y 0–45): 45px, Text 11px Uppercase Tracking +0.05em, links WOMAN/MAN/BAGS/SALE %/SEARCH (Abstand 22px); Wortmarke „Acne Studios" mittig 24px, 500; rechts HELP/ACCOUNT/Bag „00".
- Sub-Nav (y 45–80): 35px, Fill #f8f8f8 (kaum vom Page #fcfcfc unterscheidbar), Links 11px Mixed-Case, aktiver Link „Book appointment" grau #7a7a7a mit 1px Unterstrich; Pfeil-Chevrons links/rechts bei Overflow (in 33db und 53b1 sichtbar: „‹" bei x 12, „›" bei x 813).
- Zwei Spalten: Formular x 48–511 (Breite 463px, 41% Viewport) / Foto x 560–1120 (50%). Gap 49px. Foto ab y 80 bis unten, `object-fit: cover`.
- Titel „Book a private appointment" bei y 133, 16px 400. Intro 11px, Zeilenhöhe 16px, max-width ≈ 430px.
- Felder: 5 Blöcke, jeder 50–52px hoch, Fill #f4f4f4, kein Radius, kein Border, Abstand 6px. Padding 10px links. Label oben 9–10px Uppercase Tracking +0.08em #7a7a7a; Wert darunter 14px #111. Chevron rechts (Select) 12px bei x 490. „OPTIONAL" als 8px Uppercase-Suffix hinter dem Label.
- Phone: Länder-Chevron + „+1" inline links.
- Button (y 563–612): 49px hoch, volle Formularbreite, Fill #000, Text 11px Uppercase Tracking +0.08em Weiß, kein Radius.
- Erfolg (33db): Button wird Outline (2px #000, Fill Page), darunter Erfolgsbalken Fill #f0fce8 (Blassgrün), Text 11px #111 „Thank you Liam, we will contact you about your appointment shortly!" — nur Oberkante sichtbar (y 618–629), Rest abgeschnitten. `-full.jpg` (800×449) zeigt dieselbe Aufnahme kleiner; Balkenhöhe bleibt unlesbar.

### Material
| Rolle | Hex | Wo |
|---|---|---|
| Page | #fcfcfc | Canvas |
| Surface Field | #f4f4f4 | Inputs |
| Sub-Nav | #f8f8f8 | Sekundärleiste |
| Ink | #111 / #000 | Text, Button |
| Muted | #7a7a7a | Labels, aktiver Sub-Link |
| Success | #f0fce8 | Hinweisbalken |
| Foto | Beige #bcac90, Weiß, Hellblau (Tasche) | rechte Hälfte |
Keine Border, kein Radius, kein Schatten. Farbe kommt ausschließlich aus dem Foto (Tasche als einziger Sättigungspunkt).

### Typografie
- Grotesk (ähnlich „Acne"-Hausschrift/Helvetica-Nachbar). Body-Referenz 11px. Titel 16px = 1.45×. Feldwert 14px. Labels 9px. Alles 400; Wortmarke 500.
- Gewicht bleibt konstant; Hierarchie nur über Größe und Uppercase.

### Nachbau
```html
<form class="appt">
 <h1>Book a private appointment</h1><p class="intro">…</p>
 <div class="fld"><label for="country">Country/Region/Location</label><select id="country">…</select></div>
 <div class="fld"><label for="name">Name</label><input id="name"></div>
 <div class="fld"><label for="phone">Phone number <small>optional</small></label><div class="row"><select aria-label="Country code">…</select><input id="phone" type="tel"></div></div>
 <button class="submit">Request appointment</button>
 <p class="success" role="status" aria-live="polite">Thank you Liam, we will contact you about your appointment shortly!</p>
</form>
```
```css
.appt{width:41%;max-width:463px;font:400 11px/16px sans-serif;color:#111}
.appt h1{font-size:16px;font-weight:400;margin:52px 0 20px 10px}
.fld{position:relative;background:#f4f4f4;min-height:50px;padding:10px 10px 8px;margin-bottom:6px}
.fld label{display:block;font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:#7a7a7a}
.fld label small{font-size:8px;margin-left:6px}
.fld input,.fld select{width:100%;border:0;background:transparent;font-size:14px;padding:4px 0 0;appearance:none}
.fld select{background:url(chevron.svg) right 10px center/12px no-repeat}
.submit{width:100%;height:49px;background:#000;color:#fff;border:2px solid #000;font-size:11px;letter-spacing:.08em;text-transform:uppercase}
.appt.is-sent .submit{background:#fcfcfc;color:#000}
.success{background:#f0fce8;padding:10px;margin-top:6px;display:none}
.appt.is-sent .success{display:block}
```
Foto-Spalte: `grid-template-columns:41% 1fr` mit `gap:49px`, `img{height:100%;object-fit:cover}`.

### Warum es funktioniert / Fehler
- Feld = Fläche, nicht Rahmen: Label und Wert leben im selben Block, Zeilenrhythmus 56px (50+6).
- Button-Zustandswechsel (Fill → Outline) plus Erfolgsbalken zeigt „gesendet" ohne Seite zu verlassen.
- Fehler: Erfolgsbalken liegt unter dem Fold — ohne Fokus/Scroll übersieht der Nutzer die Bestätigung. Labels 9px #7a7a7a auf #f4f4f4 ≈ 4.1:1, grenzwertig. Sub-Nav-Hintergrund #f8f8f8 vs #fcfcfc ist praktisch unsichtbar.

---

## Gemeinsamkeiten im Paket
1. **Linien und Flächen statt Karten mit Schatten.** Mercury (1px Grid), Oxide (1px Border, 2px Radius), Acne (Flächen ohne Border), CLOU (harte Rechtecke). Nur Rox nutzt Radius 12 + Schatten — und das ist ein Modal.
2. **Radius ist komponentengebunden:** Pille (9999) für Nav-Trigger/kleine CTAs (Mercury, On); 2–6px für technische Controls (Oxide, Rox); 0 für Editorial/Fashion (CLOU, Acne).
3. **Ein Akzent, alles andere neutral.** Mercury Blau, Oxide Grün, Rox Rot (nur Fehler), Acne Blassgrün (nur Erfolg), CLOU Rot nur im Foto.
4. **Eyebrows/Labels immer Uppercase + Tracking + Muted.** Mercury PRODUCTS, Oxide FIG.1/POWERING, Acne Feld-Labels.
5. **Medium liefert die Farbe, UI bleibt grau.** CLOU Foto, Oxide Rack, Acne Store, On Athletin.
6. **Nav-Aktivzustand = Unterstrich (hell) oder gefüllte Pille (dunkel).** CLOU, On, Acne: 1px Underline mit Offset. Mercury: Pille.
7. **Off-White statt #fff:** #fffffc, #fcfcfc, #f4f4f0. Reines Weiß nur für Inputs auf Off-White (Rox).

## Spacing-Rhythmus
- Nav-Höhen: 45 (Acne), 60 (Mercury, Oxide), 75 (CLOU). Sub-Nav 35.
- Innen-Padding Panels/Zellen: 27–28px (Mercury), 16–18px (Oxide Terminal, Rox Modal), 10px (Acne Felder).
- Button-Höhen: 28 (Chip), 30 (Oxide), 34 (Mercury Nav-CTA), 40 (On Pille), 49 (Acne Vollbreite).
- Listenzeilen: 20px (Mercury Links), 23px (On Sub), 33px (Rox Sidebar).
- Feld-Rhythmus Acne: 50px Block + 6px Gap = 56px Takt.
- Seitenrand: 25 (CLOU), 27 (Mercury), 40 (Oxide), 48 (Acne).

## Mobile-Hinweise (aus den Bildern ableitbar)
- On-Panel ist bereits ein Drawer-Muster (62vw → 100vw auf Mobile), Hierarchie über Größe funktioniert dort weiter.
- Acne Sub-Nav zeigt Overflow-Chevrons — horizontal scrollende Tab-Leiste ist mobil vorgesehen.
- Rox Label/Feld-Grid muss auf 1 Spalte stapeln; Mercury 2×2-Grid wird zu Akkordeon (nicht belegt, R).
- CLOU 150px-Headline braucht clamp und mehrzeiligen Umbruch (R).

## Unlesbar / nicht belegt
- Acne Erfolgsbalken: Höhe, Padding und eventuelles Icon (abgeschnitten in beiden Dateien).
- Oxide: Nav-Item-Hover, Terminal-Animation, exakter Gradient hinter Rack.
- Mercury: ob Panel opak oder mit Backdrop-Blur über dem Foto liegt.
- Rox: Schattenwerte des Modals; Sidebar-Icons exakte Form; Text hinter Overlay („Pa…", „Bi…") teilweise verdeckt.
- On: Rest der Kategorienliste unter y 629; ob Foto-Hero gedimmt wird.
- CLOU: Inhalt unterhalb y 540 (weiß, leer) — Scroll oder Ende unklar.
- Schriftfamilien: nur Q-Angaben (Circular, SuisseIntl, GT America Mono), aus JPEG nicht verifizierbar.
