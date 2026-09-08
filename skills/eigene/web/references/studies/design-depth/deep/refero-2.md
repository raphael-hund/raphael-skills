# refero-2 — Platform-Images: Linear Pricing, Mocha Empty State, Stripe Pricing, Attio Hero, Gumroad Hero

Stand 07.09.2026. Paket: 9 Dateien, 5 Motive (Linear in 5 Ansichten). Alle Bilder mit Read geöffnet; Hex-Werte per Pixel-Sample aus JPEG (±5 pro Kanal, JPEG-Artefakt, keine CSS-Wahrheit). Maße in px auf die jeweilige Bildbreite bezogen (Preview 1120 oder 1440 breit; Linear-Full/Tiles 800 breit = ca. 0,56 der Originalgröße). Kennzeichnung: **B** = Bildbeobachtung, **S** = Pixel-Sample, **R** = eigenes Nachbaurezept. Unlesbares steht explizit als „unlesbar“.

---

## 1. Linear Pricing — `5d709fa1-…jpg` (1120×629, Above-the-fold)

### 1.1 Header/Nav (Bildregion: y 0–52)
- **Geometrie (B):** Höhe ≈52px bei 1120 Breite (≈4,3× Body 12px). Logo links bei x≈160, Nav mittig (Product, Resources, Pricing, Customers, Blog, Contact) mit ≈26px Gap. Rechts „Log in“ (Textlink) + „Sign up“ (gefüllter Button ≈60×26px, Radius ≈6px). Unten 1px Trennlinie, sichtbar heller als Page.
- **Material (S):** Page `#08090b`; Nav-Trennlinie ≈ `#1b1c21`; Sign-up-Fill `#e2e2e2` (Off-White, kein reines Weiß). Nav-Text mittelgrau ≈ `#8b8c8e`.
- **Typografie (B):** Nav-Links ≈12–13px, Regular, keine Tracking-Erhöhung. Sign-up-Label dunkel auf hell ≈12px, Medium.
- **Build (R):** `header{position:sticky;height:52px;display:grid;grid-template-columns:1fr auto 1fr;border-bottom:1px solid #1b1c21;background:#08090b}`; Sign-up `button{background:#e2e2e2;color:#08090b;border-radius:6px;padding:6px 12px;font-size:13px;font-weight:500}`.
- **Warum:** Einzige helle Fläche im Header = einziger Primär-CTA. Nichts konkurriert.

### 1.2 Hero-Headline + Subline (y 100–215)
- **Geometrie (B):** „Pricing“ zentriert, Cap-Höhe ≈40px → Schriftgröße ≈52px (≈4× Body). Subline zwei Zeilen à ≈15px, Zeilenhöhe ≈20px (1,35), max. Breite ≈440px (≈40 % Viewport). Abstand Headline→Subline ≈30px; Subline→Karten ≈90px.
- **Material (S):** Headline Off-White `#f3f3f3`-Bereich (Sample über Buchstaben unlesbar wegen Antialias, Kanten weiß). Subline Muted `#8b8c8e`.
- **Typografie (B):** Sans (Inter-artig), Headline Medium ≈500, Tracking leicht negativ (≈-0.02em), keine Farbabstufung innerhalb der Headline. Subline Regular, Muted-Grau.
- **Build (R):** `h1{font-size:clamp(40px,5vw,56px);font-weight:500;letter-spacing:-0.02em;color:#f3f3f3;text-align:center}` `p{max-width:44ch;margin:24px auto 0;color:#8b8c8e;font-size:15px;line-height:1.4}`.
- **Warum:** Ein Wort als H1, Erklärung in zwei Zeilen — extrem hoher Kontrast der Hierarchiestufen (52 vs 15px). Slop-Risiko: nichts; Schwäche: Subline-Kontrast auf `#08090b` grenzwertig (≈4,5:1).

### 1.3 Pricing-Karten (y 293–629, x 140–980)
- **Geometrie (B):** Vier Spalten, Gesamtbreite ≈840px (75 % Viewport), Spalte ≈210px. Karten stoßen ohne Gap aneinander, getrennt durch 1px-Linien; Außenrahmen 1px, Radius ≈8px. Business-Spalte ist ≈12px höher (beginnt y 293 statt 305) und überragt den Rahmen nach oben: eigenständige Karte mit eigenem Rahmen und eigenem Radius. Innenpadding ≈20px. Kopfzone (Titel + Preis) ≈85px hoch, dann 1px-Divider, Billing-Zeile ≈50px hoch, 1px-Divider, Featureliste mit Zeilenschritt ≈29px.
- **Material (S):** Karten-Fill `#101113`/`#121315` (Surface, nur ≈+8 Luma über Page). Business `#151618`–`#191d20` (Raised, wieder nur ≈+5). Rahmen `#191a1c`. Toggle-Track `#5f6ed5` (Accent Indigo), Knopf `#fbf7f8`. Check-Icon `#5b64b3`–`#6171c6` (Accent, gefüllter Kreis mit weißem Haken). Kein Schatten, kein Glow, kein Verlauf sichtbar.
- **Typografie (B):** Tier-Name ≈18px Medium, Off-White. Preis „$14“ ≈15px Medium hell, „per user/month“ ≈15px Muted — Farbabstufung im selben Textlauf. „Billed yearly“ ≈12px Muted. Features ≈12px Regular hell; Links („Slack“, „GitHub“, „Linear Asks“) unterstrichen, gleiche Farbe wie Text.
- **Build (R):** `.plans{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid #191a1c;border-radius:8px;background:#101113}` `.plan+.plan{border-left:1px solid #191a1c}` `.plan--featured{position:relative;margin-top:-12px;margin-bottom:-12px;background:#151618;border:1px solid #232529;border-radius:8px;z-index:1}` Divider als `border-bottom:1px solid #191a1c` auf Kopf- und Billing-Zeile. Toggle: `input[type=checkbox]` + Label `width:22px;height:12px;border-radius:999px;background:#5f6ed5` mit `::after` Knopf 10px weiß. Check: inline SVG `circle fill=#5b64b3` + `path stroke=#fff`.
- **Warum:** Hervorhebung durch Versatz (+12px) und +5 Luma, nicht durch Farbe, Badge oder Schatten. Das ist die sparsamste mögliche Hervorhebung. Featureliste verzichtet auf Fettdruck, verlässt sich auf Icon-Farbe und Zeilenrhythmus.

## 2. Linear Full + Tiles — `5d709fa1-…-full.jpg` (800×2893), `linear-tile-1/2/3.jpg`

### 2.1 Karten-Footer mit CTA (tile-1, y 505–545)
- **Geometrie (B):** CTA vollbreit in der Karte (≈120×24px bei 800 Breite), Radius ≈6px. Business-CTA hell, alle anderen grau. Unter Business-CTA „or contact sales“ ≈10px Muted, „contact sales“ unterstrichen; Business-Karte ist dafür unten ≈20px länger (endet y 562 statt 542).
- **Material (S):** Business-CTA `#f3f3f3`; Standard-CTA `#5c5b60`-Bereich (Sample auf Text; Fill ≈ `#28292d`, unlesbar exakt wegen Text). Label dunkel auf hell / hell auf dunkel.
- **Build (R):** `.plan__cta{display:block;width:100%;padding:8px;border-radius:6px;background:#26272b;color:#f3f3f3;font-size:13px;font-weight:500}` `.plan--featured .plan__cta{background:#f3f3f3;color:#08090b}`.
- **Warum:** Nur ein CTA auf der Seite ist hell = Blickziel. Wiederholung des CTA-Sets nach der Matrix (tile-3 y 425–465) verhindert Zurückscrollen.

### 2.2 Logo-Leiste (tile-1, y 615–690)
- **Geometrie (B):** Label „Powering the world's best product teams“ ≈10px Muted zentriert, darunter Logozeile ≈30px hoch, Gap ≈70px, Logos angeschnitten links/rechts (Marquee-Hinweis, statisch nicht belegbar).
- **Material (B):** Logos weiß/hellgrau, monochrom, keine Farbe.
- **Build (R):** `ul{display:flex;gap:64px;overflow:hidden;mask-image:linear-gradient(90deg,transparent,#000 15%,#000 85%,transparent)}` `img{height:28px;filter:brightness(0) invert(1)}`.

### 2.3 Feature-Matrix (tile-1 y 770ff, tile-2, tile-3 y 0–410)
- **Geometrie (B):** Gleiche 4-Spalten-Geometrie wie die Karten (x 100–700 bei 800). Kopfzeile mit Tier-Namen ≈16px Medium, darunter Zeilen ≈31px hoch mit 1px-Trennern. Gruppenüberschriften („Core features“, „Team management“, „Security“, „Support“) ≈13px Medium, nur in Spalte 1, ≈45px hoch, ohne Trenner darüber. Business-Spalte behält den Raised-Rahmen über die gesamte Matrixhöhe (≈1.400px), Radius nur oben und unten.
- **Material (S):** Enthaltene Zeile: Check `#5b64b3` + Text hell. Nicht enthalten: Icon ≈ `#101417`-`#2a2d31` (dunkler Kreis mit Punkt), Text `#3e4245` (Muted-2, nur ≈+50 Luma über Surface). Zeilenlinie `#0f1316` (kaum sichtbar, ≈+3 Luma).
- **Typografie (B):** Zelle ≈11px Regular; zweizeilige Einträge („Issues, projects, cycles, and initiatives“) erlaubt, Zeilenhöhe 1,3.
- **Build (R):** Semantische `<table>` mit `<thead>` und `<tbody>`; Gruppenzeile als `<tr class="group"><th colspan=4>`. Jede Zelle wiederholt den Feature-Namen (kein Zeilenkopf links!) — Linear setzt den Namen in jede Spalte. `td{padding:9px 16px;border-bottom:1px solid #141518;font-size:12px}` `td.off{color:#3e4245}` `td.off svg{color:#2a2d31}`. Business-Spalte: `col.featured` + `td:nth-child(3){background:#151618;border-inline:1px solid #232529}`.
- **Warum:** Jede Spalte ist für sich lesbar (Name pro Zelle), aber kostet Redundanz. Gedämpfte Ausschlüsse sind Kontrast-Risiko (≈2,5:1, unter WCAG AA) — bewusst, aber für eigene Builds nur mit ≥ `#6b6e72`.
- **Slop-Prüfung:** Keine. Aber: Tabelle ohne linke Kopfspalte skaliert mobil nicht; nur per Tier-Tabs lösbar (nicht belegt).

### 2.4 Climate-Pill, Abschluss-CTA, Footer (tile-3 y 550–993)
- **Climate-Pill (B/S):** Zentrierte Pille ≈430×30px, Radius 999px, Fill `#323639`-Bereich (Sample auf Text; Fill ≈ `#15171a`), grünes Blatt-Emoji links, Text ≈11px Muted. Build: `div{display:inline-flex;gap:8px;padding:8px 16px;border-radius:999px;background:#15171a;font-size:12px;color:#8b8c8e}`.
- **Abschluss-CTA (B):** Zweispaltig: links Headline „Plan the present. Build the future.“ ≈26px Medium Off-White, rechts zwei Buttons: „Talk to sales“ grau Fill (`#b5b4b9`-Sample auf Text, Fill ≈ `#26272b`), „Get started“ hell `#d5d5d5`-Bereich (≈ `#e2e2e2`). Buttons ≈26px hoch, Radius 6px, Gap 8px. Build: `section{display:flex;justify-content:space-between;align-items:center;padding:80px 0}`.
- **Footer (B/S):** Fill `#070b0e` (dunkler als Page → Page/Footer-Trennung nur durch 1px-Linie). Logo links (Kreis-Icon), 5 Linkspalten mit Spaltenkopf ≈11px hell Medium und Links ≈10px Muted, Zeilenabstand ≈17px. Spaltenbreite ≈100px. Build: `footer{display:grid;grid-template-columns:1fr repeat(5,minmax(96px,auto));gap:24px;padding:40px 0 60px;border-top:1px solid #1b1c21}`.

### 2.5 Full-Ansicht (Struktur, Rhythmus)
- Reihenfolge (B, full.jpg): Nav → Hero (≈180px) → Karten (≈260px) → Logos (≈100px) → Matrix (≈1.300px) → CTA-Wiederholung → Climate-Pill → Abschluss-CTA → Footer. Sektionsabstände ≈80–100px bei 800 Breite (≈140–180px original).
- Es gibt keine Bilder, keine Illustration, keinen Verlauf, keine Schattierung — reine Typografie + 1px-Linien + 3 Luma-Stufen + 1 Akzentfarbe.

---

## 3. Mocha Empty State — `6842d157-…jpg` (1120×629, App-UI)

### 3.1 Topbar (y 0–40)
- **Geometrie (B):** Höhe 40px, 1px Bottom-Border `#e1e1e1`. Logo (Zickzack-„M“) + Chevron-Switcher links. Tabs mittig: „Dashboard“ aktiv mit hellgrauem Pillen-Hintergrund `#f0f0f0` (≈70×24px, Radius 6px), „Learn“, „Spotlight“ ohne Fill. Rechts Book-Icon + CTA „Create new app“.
- **Material (S):** Page `#ffffff`; CTA Indigo-Blau ≈ `#4f46e5`-Bereich (Sample `#e5edff` traf Text-Antialias — Fill unlesbar exakt, Bild zeigt sattes Indigo). Radius ≈6px, Höhe ≈26px, Padding ≈12px horizontal.
- **Build (R):** `header{height:40px;display:grid;grid-template-columns:1fr auto 1fr;border-bottom:1px solid #e1e1e1}` `.tab[aria-selected=true]{background:#f0f0f0;border-radius:6px;padding:4px 10px}` `.btn-primary{background:#4f46e5;color:#fff;border-radius:6px;padding:6px 12px;font-size:12px;font-weight:500}`.

### 3.2 Sidebar (x 0–245)
- **Geometrie (B):** Breite 245px (≈22 %), 1px rechte Border `#e1e1e1`. Kopf „Apps“ + Plus + Panel-Icon, Höhe ≈45px. Items ≈30px hoch, Icon 14px + Label 12px, Gap 8px, Padding-Left 24px. Aktiv „All apps“: Fill `#f0f0f0`, Radius 6px, Innenabstand 8px (Item ist eingerückt, x 13–232). Sektions-Trenner 1px `#e1e1e1` mit 16px Rand. „Settings“ als Sektionslabel ≈12px, darunter Textitems ohne Icon.
- **Material (S):** Sidebar `#fafafa` (Surface, nur +5 Luma unter Page-Weiß). Text `#1a1a1a`-Bereich, Muted-Labels ≈ `#4a4a4a`.
- **Build (R):** `aside{width:245px;background:#fafafa;border-right:1px solid #e1e1e1;padding:12px}` `.item{display:flex;gap:8px;height:30px;align-items:center;padding:0 10px;border-radius:6px;font-size:12px}` `.item[aria-current]{background:#f0f0f0}`.

### 3.3 Content-Kopf, Suche, Tabellen-Header (y 40–120)
- **Geometrie (B):** Titel „All apps“ 12px Medium bei x 260, y 63. Suchfeld rechts ≈165×26px, Radius 6px, Fill `#f0f0f0`, Lupe-Icon links, Wert „4815162342“ (unbeschriftete Zahl – vermutlich Testeingabe; Zustand unklar). 1px-Trenner darunter. Tabellen-Header „Name / Status / Visibility“ mit Sort-Pfeilen ↓↑, 12px Muted, Spalten x 285 / 623 / 847 (≈33 % / 20 % / Rest), Zeile ≈40px hoch, 1px-Trenner darunter.
- **Build (R):** `input[type=search]{height:26px;border:0;background:#f0f0f0;border-radius:6px;padding-left:28px;font-size:12px}` `thead th{font-weight:400;color:#6b6b6b;padding:12px 0;border-bottom:1px solid #e1e1e1}`.

### 3.4 Empty-State-Block (y 120–335)
- **Geometrie (B):** Zone ≈215px hoch, unten 1px-Linie `#e1e1e1` (Ende der „Tabelle“), darunter reines Weiß bis Bildende. Inhalt zentriert: Icon 4 Quadrate ≈32px Outline-Grau, 16px Gap, Titel „No apps yet“ ≈15px Medium, 6px Gap, Erklärung ≈12px Muted, 16px Gap, CTA Indigo ≈115×26px mit Plus-Icon.
- **Material (B):** Icon Outline `#9a9a9a`-Bereich, 1,5px Stroke, Radius 2px pro Quadrat. Kein Illustrationsbild, keine Farbe außer CTA.
- **Typografie (B):** Titel Medium 15px Ink, Body 12px Muted, CTA 12px Weiß Medium.
- **Build (R):** `<section role="status" class="empty"><svg…/><h2>No apps yet</h2><p>…</p><button>+ Create new app</button></section>` `.empty{display:grid;justify-items:center;gap:8px;padding:48px 0;border-bottom:1px solid #e1e1e1}` `.empty h2{font-size:15px;font-weight:500}` `.empty p{font-size:12px;color:#6b6b6b}`.
- **Warum:** CTA erscheint zweimal (Topbar + Empty State) mit identischer Farbe/Form = eindeutige Handlung. **Fehler:** Suchfeld enthält eine Query, Copy sagt „No apps yet“/„first app“ – Zustandsverwechslung. Ein leerer Suchtreffer braucht „No results for …“ + „Clear search“. Slop: Der Content-Bereich ist zu 60 % leer, die Trennlinie unter dem Empty State erzeugt eine zweite, sinnlose Zone.

---

## 4. Stripe Pricing — `716fcc41-…jpg` (1120×629)

### 4.1 Nav (y 0–60)
- **Geometrie (B):** Höhe ≈60px, Logo links x 130 (Wortmarke navy ≈20px hoch). Links mit Chevron „Products ˅ Solutions ˅ Developers ˅ Resources ˅ Pricing“, ≈12px Medium Ink, Gap ≈22px. Vertikaler 1px-Trenner, dann „✦ Guide me“. Rechts „Sign in ›“ als violetter Textlink, „Contact sales ›“ als violette Pille ≈112×28px, Radius 999px. Keine Bottom-Border; Nav liegt über einer hellen Page.
- **Material (S):** Page `#f8f9fd` (leichtes Kaltweiß, nicht #fff). Nav-Fill wie Page. Violett `#6863fe` (Action). Ink-Navy `#0e2a40`.
- **Build (R):** `nav{height:60px;display:flex;align-items:center;gap:22px;font-size:13px;font-weight:500;color:#0e2a40}` `.pill{background:#635bff;color:#fff;border-radius:999px;padding:6px 16px;font-weight:500}`.

### 4.2 Hintergrund-Raster + Schräg-Verlauf (gesamtes Bild)
- **Geometrie (B):** Vertikale Hilfslinien bei x≈118, 340, 560, 782, 1003 (5 Linien = 4 gleich breite Spalten à ≈221px, Container 118–1003 = 885px ≈ 79 %). Linien sind gepunktet/sehr hell (`#f8f9fd`-Sample identisch mit Page → Linie ≈ `#eef0f6`, unlesbar exakt). Schräge Farbfläche von links-unten (y 460 bei x 0) nach rechts-oben (y 240 bei x 1120), Neigung ≈ -11°, mit weißem Ausschnitt in der Mitte (Karten-Zone bleibt ruhig).
- **Material (S):** Verlauf links Violett `#a86aef`, Mitte Magenta/Pink, rechts Orange `#fead52`; horizontal von Violett nach Orange, mit weicher Kante nach oben. Die Kartenzone hat keinen Verlauf hinter sich (Sample `#ffffff`/`#fefefe` unter Karten).
- **Build (R):** `.grid-bg{background-image:repeating-linear-gradient(90deg,#eef0f6 0 1px,transparent 1px 221px);background-position:118px 0}` (oder 5 absolute `div`). Verlauf: `.stripe{position:absolute;inset:auto -10% -30% -10%;height:260px;transform:skewY(-11deg);background:linear-gradient(90deg,#8b5cf6,#ec4899 45%,#f97316 80%,#fbbf24)}` — plus `mask` mit weißem Block hinter Karten, oder Karten mit `box-shadow:0 20px 60px rgba(14,42,64,.15)`.
- **Warum:** Farbe als Marken-Signal ausschließlich in der Deko-Ebene; alle Texte liegen auf Weiß/Navy. **Slop-Risiko:** Ein „skewed rainbow gradient“ ist inzwischen Stripe-Klischee; ohne Kartenausschnitt wird Text unlesbar.

### 4.3 Headline (y 140–240)
- **Geometrie (B):** Zweizeilig, linksbündig auf Spalte 1 (x 130), Cap-Höhe ≈32px → Schriftgröße ≈44px, Zeilenhöhe ≈56px (1,25), Breite ≈430px (≈2 Spalten).
- **Typografie (S/B):** Sans, Bold ≈700, Navy `#0e2a40`, Tracking ≈-0.01em, keine Abstufung.
- **Build (R):** `h1{font-size:clamp(32px,4vw,48px);font-weight:700;line-height:1.2;color:#0e2a40;max-width:12ch}`.

### 4.4 Zwei Angebots-Karten (y 297–530)
- **Geometrie (B):** Karte 1 x 118–552 (434px = 2 Spalten), Karte 2 x 566–1003 (437px). Gap 14px. Höhe 233px. Radius ≈6px. Karte 1 zweigeteilt: linke Hälfte weiß (Text + CTA), rechte Hälfte `#f8f9fd` (Preis-Callout, zentriert). Karte 2 navy, zweigeteilt: links Text + CTA, rechts 4 gestapelte Zellen (je ≈58px hoch, 1px-Trenner heller Navy, Text zentriert). Innenpadding ≈25px. Titel→Body 18px, Body→CTA 20px.
- **Material (S):** Karte 1 `#ffffff` mit weichem Drop-Shadow (sichtbar an Unterkante, ≈0 8px 24px rgba(0,0,0,.08)); Callout-Hälfte `#f8f9fd`. Karte 2 `#0d2e4f`/`#123054` (Navy-Surface), Zellen `#123054`→Trenner ≈ `#25456b` (Sample `#4c6486` auf Text). CTA violett `#6863fe` (auf hell), CTA cyan `#16d1fe` mit Navy-Text (auf dunkel). Beide Pillen ≈100×28px, Radius 999px, Label + Chevron „›“.
- **Typografie (B):** Titel ≈19px Bold Navy/Weiß. Body ≈12px Regular, Zeilenhöhe 1,6, Muted-Navy `#425466`-Bereich (unlesbar exakt) bzw. Hellgrau auf Navy. Preis „2.9% + $0.30“ ≈20px Bold Navy, darunter ≈12px Muted zweizeilig. Zellen ≈13px Medium Weiß.
- **Build (R):** `.offers{display:grid;grid-template-columns:1fr 1fr;gap:14px}` `.offer{display:grid;grid-template-columns:1fr 1fr;border-radius:8px;overflow:hidden;box-shadow:0 8px 24px rgba(14,42,64,.08)}` `.offer--std{background:#fff}` `.offer--std .callout{background:#f6f9fc;display:grid;place-content:center;text-align:center}` `.offer--custom{background:#0a2540;color:#fff}` `.offer--custom .cells{display:grid;grid-template-rows:repeat(4,1fr)}` `.cells div{display:grid;place-content:center;border-top:1px solid rgba(255,255,255,.12)}` CTA: `.pill--dark{background:#00d4ff;color:#0a2540}`.
- **Warum:** Zwei Geschäftsmodelle, zwei Materialien (hell = Self-Serve, navy = Enterprise). Preis als Callout-Zelle isoliert den einen Zahlenbeweis. CTA-Farbe passt sich dem Untergrund an (Violett auf Weiß, Cyan auf Navy) statt eine Farbe zu erzwingen.

### 4.5 Sub-Navigation (y 570–612)
- **Geometrie (B):** Zentrierte weiße Pille ≈285×42px, Radius 999px, 3 Textlinks ≈13px Medium Navy, Gap 20px, sichtbarer Drop-Shadow (Pille schwebt über Verlauf).
- **Build (R):** `nav.sub{display:inline-flex;gap:20px;padding:12px 20px;border-radius:999px;background:#fff;box-shadow:0 4px 16px rgba(14,42,64,.12)}`.

---

## 5. Attio Hero — `9f0c028b-…jpg` (1440×900)

### 5.1 Nav (y 0–67)
- **Geometrie (B):** Höhe 67px, 1px Bottom-Border `#e4e4e4`. Logo x 30–123. Links „Platform ˅ Resources ˅ Customers Pricing“ ≈15px Regular Ink, Gap ≈36px. Rechts „Sign in“ Outline-Button (≈70×34px, 1px Border `#d9d9d9`-Bereich, Radius 8px, Fill weiß) + „Start for free“ gefüllt Ink (≈110×34px, Radius 8px). Gap 10px.
- **Material (S):** Page `#ffffff`; Ink-Fill `#212226`-Bereich (≈ `#1c1d1f`); Outline-Border unlesbar exakt (Sample traf Weiß), sichtbar hellgrau.
- **Build (R):** `nav{height:67px;padding:0 30px;border-bottom:1px solid #e4e4e4;display:flex;align-items:center}` `.btn{height:34px;padding:0 14px;border-radius:8px;font-size:14px;font-weight:500}` `.btn--primary{background:#1c1d1f;color:#fff}` `.btn--outline{background:#fff;border:1px solid #dcdcdc;color:#1c1d1f}`.

### 5.2 Announcement-Badge (y 165–193)
- **Geometrie (B):** Zentrierte Pille ≈305×28px, 1px Border hellgrau, Radius 999px, Text ≈12px Ink, Chevron „›“ rechts. Oberkante zeigt in der Mitte einen ≈60px breiten, blauen Lichtstrich (Sample über dem Badge bei x 720, y 165 ist unlesbar exakt; visuell ein 1px Highlight in Blau).
- **Build (R):** `a.badge{display:inline-flex;gap:8px;padding:6px 14px;border:1px solid #e4e4e4;border-radius:999px;font-size:13px;position:relative;overflow:hidden}` `a.badge::before{content:"";position:absolute;top:0;left:40%;width:20%;height:1px;background:linear-gradient(90deg,transparent,#407ff2,transparent)}`.
- **Warum:** Der einzige Farbpunkt im Hero markiert „neu“. Hoch effizient. Slop-Risiko: Der „glowing top border“ ist ein 2024–25-Klischee; nur mit Zweck (Announcement) einsetzen.

### 5.3 Headline, Subline, CTA-Paar (y 220–450)
- **Geometrie (B):** Headline zweizeilig zentriert, Cap-Höhe ≈50px → Schriftgröße ≈68px (≈4,25× Body 16px), Zeilenhöhe ≈66px (0,97 — extrem eng), Breite ≈520px. Subline ≈20px Muted, Abstand 30px. CTA-Paar 34px hoch, Gap 8px, Abstand 32px zur Subline. Gesamter Hero-Block ≈290px, oben 100px, unten 70px Luft.
- **Material (S):** Headline Ink `#1c1d1f`-Bereich; Subline Muted ≈ `#5c5d61`-Bereich (Sample traf Weiß, Text sichtbar mittelgrau). Kein Verlauf, kein Schatten.
- **Typografie (B):** **Sans** (Inter-Display-artig), Bold ≈600, Tracking ≈-0.03em, Punkt am Satzende („magic.“). Keine Farbabstufung. Widerspruch zum Style-Text (Tiempos Serif) bleibt: Bild zeigt Sans.
- **Build (R):** `h1{font-size:clamp(44px,5vw,72px);font-weight:600;letter-spacing:-0.03em;line-height:0.98;text-align:center;max-width:14ch;margin-inline:auto}` `.cta-row{display:flex;gap:8px;justify-content:center}`.
- **Warum:** Zeilenhöhe <1 + negatives Tracking = dichter Textblock, der wie ein Logo wirkt. Primär (Ink-Fill) und Sekundär (Outline) unterscheiden sich nur durch Fill; gleiche Höhe, gleicher Radius.

### 5.4 Tab-Leiste (y 520–585)
- **Geometrie (B):** Vollbreite 1px-Linien oben (y 520) und unten (y 583) über den gesamten Viewport; vier gleich breite Tabs innerhalb x 140–1300 (1160px, je 290px), getrennt durch 1px vertikale Linien. Aktiver Tab „Ask Attio“: Fill `#f8f8f8`, plus 2px Indikator `#1c1c1c` unten links, ≈70px breit (nicht volle Tabbreite!). Inaktive Tabs Text Muted `#70747d`.
- **Build (R):** `[role=tablist]{display:grid;grid-template-columns:repeat(4,1fr);border-block:1px solid #ececec}` `[role=tab]{padding:22px;text-align:center;font-size:16px;color:#70747d;border-right:1px solid #ececec;position:relative}` `[aria-selected=true]{background:#f8f8f8;color:#1c1d1f}` `[aria-selected=true]::after{content:"";position:absolute;left:0;bottom:-1px;width:70px;height:2px;background:#1c1c1c}`. Über den Viewport hinaus: `border-block` auf einem `div` mit `width:100vw`, Tabs im Container. Die vertikalen Linien laufen oberhalb der Tabs nicht weiter (B).

### 5.5 Produkt-Frame (y 615–900, angeschnitten)
- **Geometrie (B):** Container x 107–1333 (1226px, 85 %), 1px Border `#ebecee`, Radius ≈8px, oben 32px unter Tab-Leiste. Gestrichelte Linien bei x 140/1300 (vertikal, Höhe 583–615) und y 660 (horizontal, außerhalb des Frames) – Blueprint-Hilfslinien als Deko. Innen: Sidebar ≈275px mit Workspace-Switcher, „Quick Actions ⌘K“ Feld + Suche „/“, Navigation (Home aktiv `#eeeff1`), Icons 14px, Zeilen 29px. Hauptbereich: Titelzeile 45px „Win deal with Greenleaf ☆“, rechts Icons; Chat mit rechts ausgerichteter Nutzer-Bubble (`#f7f7f7`, Radius 8px) und „Thinking“ mit Shimmer-Text (links dunkel → rechts hell, Verlauf im Text).
- **Material (S):** Appbar `#fbfbfb`; Frame-Border `#ebecee`; aktives Item `#eeeff1`.
- **Build (R):** `.frame{border:1px solid #ebecee;border-radius:10px;overflow:hidden;box-shadow:0 1px 2px rgba(0,0,0,.04)}` Hilfslinien: `.guide{position:absolute;border-left:1px dashed #e4e4e4}`. Shimmer: `span{background:linear-gradient(90deg,#1c1d1f,#c8c8c8);-webkit-background-clip:text;color:transparent}` (Animation nicht belegt).
- **Warum:** Produkt als echter Screenshot/echtes UI, nicht als Illustration. Dichte im Frame (29px Zeilen) vs. Luft außen (100px) = zwei Dichten, ein System. **Slop-Risiko:** Blueprint-Dashes + gefakte Chat-UI sind Klischee, wenn kein echtes Produkt dahinter steht.

---

## 6. Gumroad Hero — `ac783c6e-…jpg` (1440×900)

### 6.1 Nav (y 0–79)
- **Geometrie (B):** Höhe 79px (hoch!), 1px schwarze Bottom-Border. Logo-Wortmarke ≈32px hoch bei x 32, daneben GitHub-Badge: schwarze Outline-Pille ≈95×28px, Radius 999px, 1px Border, „8.9K ★“. Links „Discover Blog Pricing Features About Careers“ ≈17px Regular Ink, Gap ≈38px. „About“ aktiv: schwarze Pille ≈84×46px, Radius 999px, weißer Text. Rechts 1px vertikale Trennlinie, „Log in“ (Text), 1px Linie, „Start selling“ als schwarzer Block volle Nav-Höhe (x 1298–1440, 142px breit), weißer Text.
- **Material (S):** Page `#f4f5f0` (warmes Off-White, leicht grün). Ink `#000000` reines Schwarz. Linien `#000000` 1px.
- **Build (R):** `nav{height:80px;display:grid;grid-template-columns:auto 1fr auto auto;border-bottom:1px solid #000;background:#f4f5f0}` `.nav__link.is-active{background:#000;color:#fff;border-radius:999px;padding:12px 20px}` `.nav__cta{height:100%;padding:0 24px;background:#000;color:#fff;border-left:1px solid #000;display:flex;align-items:center}` `.nav__login{border-left:1px solid #000;padding:0 24px;height:100%}`.
- **Warum:** Nav-Zellen statt Buttons; die Trennlinien machen die Leiste zu einem Raster. Der CTA ist die dunkelste Zelle des Rasters.

### 6.2 Münz-Illustrationen (Ränder)
- **Geometrie (B):** Fünf Münzen (x 40/y 170 klein ≈180px; x 0/y 410 groß ≈210px, angeschnitten; x 1225/y 105 klein ≈130px; x 1330/y 430 angeschnitten; x 1005/y 570 ≈195px). Alle gekippt (isometrische Ellipse), 2px schwarze Outline, schwarzes „G“ auf der Fläche, Seitenfläche pink dunkler. Überlappen nur den Rand, nie den Text (Textspalte x 350–1090 bleibt frei).
- **Material (S):** Pink `#fe8de9`/`#f79ee2` (Creator Pink), Outline `#000`.
- **Build (R):** 1 SVG-Symbol (Ellipse + Extrusionspfad + Text-Pfad „G“), 5× `<use>` mit `transform:rotate()` und Skalierung, `position:absolute;pointer-events:none;aria-hidden`. `.hero{overflow:hidden}` gegen horizontalen Scroll. Mobile: max. 2 Münzen, Rest `display:none` (nicht belegt).

### 6.3 Headline, Subline, CTA + Suche (y 310–630)
- **Geometrie (B):** „Go from 0 to $1“ Cap-Höhe ≈68px → ≈88px Schriftgröße (≈5× Body 17px), Regular 400 (nicht fett!), Tracking ≈-0.02em, zentriert. Subline zweizeilig ≈20px Regular, Zeilenhöhe 1,6, Breite ≈740px. Abstand Headline→Subline 45px. CTA-Zeile: „Start selling“ schwarz ≈187×62px, Radius 4px; Suchfeld ≈365×62px, 1px schwarze Border, Radius 4px, Fill Page-Farbe, Placeholder Muted `#6b6b6b`-Bereich, rechts innen ein weißer 44×44px Button mit 1px Border, Radius 4px, Lupe. Gap 15px. Darunter „Contribute or fork on GitHub“ ≈13px Muted, GitHub unterstrichen, 35px Abstand.
- **Material (S):** CTA `#131313`/`#000`; Suchfeld-Fill `#f4f5f0` (= Page); Such-Button `#ffffff` (einzige reinweiße Fläche im Hero).
- **Build (R):** `h1{font-size:clamp(48px,6.5vw,96px);font-weight:400;letter-spacing:-0.02em;text-align:center}` `.hero__row{display:flex;gap:16px;justify-content:center}` `.btn-black{background:#000;color:#fff;padding:0 44px;height:62px;border-radius:4px;font-size:18px}` `.search{display:flex;align-items:center;height:62px;border:1px solid #000;border-radius:4px;padding:8px 8px 8px 32px;background:transparent}` `.search button{width:44px;height:44px;background:#fff;border:1px solid #000;border-radius:4px}`.
- **Warum:** Regular-Gewicht bei 88px liest sich leichter als Bold und wirkt „friendly“. Zwei gleich große Controls = zwei Zielgruppen (Seller / Buyer); eine Landingpage mit einem Ziel übernimmt das nicht.

### 6.4 Feature-Karten (y 775ff, angeschnitten)
- **Geometrie (B):** Zwei Karten x 160–885 und x 915–1280, 1px schwarze Border, Radius ≈16px, Fill Page. Titel ≈32px Regular links oben mit 32px Padding. Über der linken Karte ragt ein Browserfenster (weiß, 1px Border, Radius 12px, drei Ampelpunkte oben) ≈40px nach oben hinaus (z-index über der Karte). Inhalt: Illustration mit Teal `#239f94` und Pink-Figuren.
- **Build (R):** `.card{border:1px solid #000;border-radius:16px;padding:32px;position:relative}` `.card__window{position:absolute;top:-40px;left:44%;background:#fff;border:1px solid #000;border-radius:12px}`.

---

## 7. Gemeinsamkeiten im Paket

1. **1px-Linien tragen die Struktur**, nicht Schatten: Linear (Karten/Matrix), Mocha (Sidebar/Tabelle), Attio (Nav/Tabs/Frame), Gumroad (Nav-Zellen/Karten). Nur Stripe nutzt Drop-Shadows, weil Karten über einem Verlauf schweben müssen.
2. **Ein Primär-CTA-Material pro Seite:** Linear Off-White auf Dunkel, Mocha Indigo, Stripe Violett/Cyan je Untergrund, Attio Ink, Gumroad Schwarz. Sekundär immer Outline oder graue Fläche.
3. **Radius folgt der Komponente, nicht global:** Linear 6–8px; Mocha 6px; Stripe 999px (Pillen) + 8px (Karten); Attio 8px (Buttons) + 999px (Badge) + 10px (Frame); Gumroad 4px (Controls) + 16px (Karten) + 999px (Nav-Pille).
4. **Hervorhebung durch Luma-Stufe und Versatz**, nicht durch Farbe: Linear Business +12px/+5 Luma; Mocha aktives Item +5 Luma; Attio aktiver Tab `#f8f8f8`.
5. **Hero-Headline ist Sans, groß (≥4× Body), eng gesetzt (Tracking -0.02 bis -0.03em, Zeilenhöhe ≤1,25)** — in allen vier Marketingseiten. Gewicht variiert: Linear 500, Stripe 700, Attio 600, Gumroad 400.
6. **Dichte-Wechsel:** Marketing-Luft (80–180px Sektionsabstand) vs. Produkt-Dichte (29–31px Zeilen) im selben System (Linear Matrix, Attio Frame, Mocha App).
7. **Farbe bleibt Signal:** Linear nur Check/Toggle Indigo; Attio nur Badge-Highlight Blau; Gumroad Pink nur in Illustration; Stripe Verlauf nur hinter Karten.

## 8. Farblogik als Rollentabelle (S = Sample, ±5)

| Rolle | Linear | Mocha | Stripe | Attio | Gumroad |
|---|---|---|---|---|---|
| Page | `#08090b` | `#ffffff` | `#f8f9fd` | `#ffffff` | `#f4f5f0` |
| Surface | `#101113` | `#fafafa` | `#ffffff` (Karte) | `#fbfbfb` | `#f4f5f0` |
| Raised/aktiv | `#151618`–`#191d20` | `#f0f0f0` | `#0d2e4f` (Navy-Karte) | `#f8f8f8`/`#eeeff1` | `#ffffff` |
| Border | `#191a1c`/`#1b1c21` | `#e1e1e1` | ≈`#eef0f6` (unlesbar exakt) | `#e4e4e4`/`#ebecee` | `#000000` |
| Text | `#f3f3f3` | ≈`#1a1a1a` | `#0e2a40` | `#1c1d1f` | `#000000` |
| Muted | `#8b8c8e` / `#3e4245` (off) | ≈`#4a4a4a`–`#6b6b6b` | ≈`#425466` | `#70747d` | ≈`#6b6b6b` |
| Action | `#e2e2e2` (Fill) | ≈`#4f46e5` | `#6863fe` / `#16d1fe` | `#1c1d1f` | `#000000` |
| Accent | `#5f6ed5`/`#5b64b3` | — | Verlauf `#a86aef`→`#fead52` | `#407ff2` (1px) | `#fe8de9` |

## 9. Spacing-Rhythmus (B, geschätzt)

- Basis 4px sichtbar überall (Paddings 8/12/16/20/24/32).
- Kontrollhöhen: kompakt 24–28px (Linear, Mocha), Standard 34px (Attio), gross 42px (Stripe Sub-Nav), XL 62px (Gumroad Hero-Controls).
- Listen-/Tabellenzeilen 29–31px (Linear Matrix, Mocha Sidebar, Attio Frame).
- Nav-Höhen 40 (App) / 52 / 60 / 67 / 80 (Gumroad) — Marketing höher als App.
- Sektionsabstand Marketing 80–180px; Hero-Top-Luft 100–140px.
- Container: Linear 75 % (840/1120), Stripe 79 % (885/1120), Attio 85 % (1226/1440), Gumroad 78 % (1120/1440).

## 10. Dos

- Struktur mit 1px-Linien und 2–3 Luma-Stufen bauen; Schatten nur, wenn Element über Farbe/Verlauf schwebt (Stripe).
- Einen hellsten/dunkelsten CTA pro Seite; Wiederholung des CTA-Sets nach langen Tabellen (Linear).
- Featured-Tier per Versatz (−12px margin) + eigener Rahmen hervorheben, nicht per Badge-Farbe.
- Preis als isolierter Callout mit einer Zahl (Stripe „2.9% + $0.30“).
- Featurematrix als `<table>` mit Gruppenzeilen; Ausschlüsse gedämpft, aber ≥ 4,5:1 halten.
- Headline groß, eng, Sans; Subline max. 44ch, Muted.
- Farbe nur als Signal: Toggle, Check, Announcement-Highlight, Illustration.
- Produktbeweis als echtes UI in 1px-Frame (Attio), nicht als Illustration.
- Dekorative Assets (Münzen, Verlauf) absolut positioniert, `aria-hidden`, `overflow:hidden` am Container, Text-Spalte frei halten.
- Radius pro Komponentenrolle definieren (Control / Karte / Pille).

## 11. Don'ts

- Keine Empty-State-Copy „No X yet“ bei aktiver Suche/Filter (Mocha) — Zustand vor Muster.
- Keine Ausschluss-Zeilen bei ≈2,5:1 Kontrast kopieren (Linear `#3e4245` auf `#101113`).
- Keinen Verlauf hinter Text; Verlauf braucht Ausschnitt/Karte davor (Stripe).
- Keine globale Pill-Klasse; Gumroad hat 4/16/999px nebeneinander.
- Kein Skew-Rainbow oder Glow-Top-Border ohne Marken- oder Funktionsgrund — beide sind Klischees.
- Kein Vier-Spalten-Grid mobil verkleinern (Linear Matrix hat keine Zeilenköpfe; braucht Tier-Tabs).
- Keine zwei gleich große Hero-Controls (CTA + Suche) bei nur einem Conversion-Ziel.
- Keine fake Chat/„Thinking“-UI im Hero ohne echtes Produkt dahinter.

## 12. Mobile-Hinweise

- Kein Bild im Paket zeigt Mobile. Nicht belegt: Umbruch der Linear-Matrix, Münzpositionen bei Gumroad, Stripe-Verlauf mobil, Attio-Tabs bei <768px. Alles Weitere wäre Vermutung.

## 13. Unlesbar / nicht belegbar

- Exakte Fills unter Text (Linear CTA-Grau, Stripe Grid-Linien, Attio Outline-Border) — Samples trafen Text-Antialias oder Weiß.
- Font-Familien (Inter/Favorit/Sohne etc.) — nur Sans/Serif-Klasse aus Bild erkennbar.
- Hover-, Focus-, Animationszustände (Linear Marquee, Attio Shimmer).
- Mocha-Suchwert „4815162342“: Bedeutung und Datenlage unklar.
- Original-CSS-Maße; alle px-Werte sind Bildschätzungen.
