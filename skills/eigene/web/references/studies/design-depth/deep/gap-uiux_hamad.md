# Gap-Analyse: @uiux_hamad (Hamad Tanveer, Product Designer)

**Status:** partial (Profil-Metadaten + Portfolio + 2 Behance-Case-Studies erreicht; die eigentliche Tweet-Timeline bleibt gesperrt)
**Datum:** 2026-09-07
**Rohdaten:** `/Users/raphaelhund/skill-workspace/web-design-depth/research/gaps/uiux_hamad/`

## 1. Zugriffsprotokoll (max. 3 Versuche pro Weg)

| Weg | Ergebnis | Fehler |
|---|---|---|
| `https://x.com/uiux_hamad` (curl, UA Mozilla) | HTTP 200, aber nur JS-Shell ohne Tweets | kein Inhalt ohne Browser/Login |
| `https://api.fxtwitter.com/uiux_hamad` | HTTP 200, Profil-JSON | – |
| `https://syndication.twitter.com/srv/timeline-profile/screen-name/uiux_hamad` (3 Varianten) | HTTP 429 | Rate-Limit, 20 Byte Body |
| `https://cdn.syndication.twimg.com/timeline/profile?screen_name=…` (2 Varianten) | HTTP 200, 0 Byte | leerer Body (Endpoint abgeschaltet) |
| `nitter.net/uiux_hamad`, `/media`, `/with_replies`, `/rss` | 200 / 200 / 200 / 410 | Seiten enthalten 0 `timeline-item`, nur Spenden-Hinweis von zedeus; RSS 410 Gone |
| `xcancel.com/uiux_hamad` | HTTP 200 | Anti-Bot-Seite „Verifying your browser…“ (nicht umgangen) |
| `nitter.space` | HTTP 403 | gesperrt |
| `nitter.privacydev.net`, `nitter.poast.org` | Connect-Timeout / DNS-Fehler | Instanz tot |
| `pbs.twimg.com` Banner + Avatar | HTTP 200 | – |
| `hamadtanveer.framer.website` (Website aus Profil) | HTTP 200 | – |
| Behance `EduCore` + `Navo AI` (aus Portfolio verlinkt) | HTTP 200, 51 Board-Bilder (1920 px) | – |

**Profil-Fakten (fxtwitter-JSON):** Name Hamad Tanveer, Bio „product designer - hiring? let's talk", 6.568 Follower, 1.790 Tweets, 525 Medien, Mitglied seit 04/2022, Website `hamadtanveer.framer.website`. Instagram-Handle identisch (`uiux_hamad`), Behance `hamadtanveer`.

**Geladene Assets:** `banner.jpg` (1500x500), `avatar.jpg` (400x400), `portfolio_hero.jpg` (3200x3200), 2 Framer-Videos (928x928, 9 s / 11 s) + Frames, `behance_01…51.png` (Spacer entfernt), Vorschau-Crops in `preview/`.

## 2. Was die Quelle designerisch ausmacht

Hamad ist ein **System-first Product Designer**. Beide Case-Studies sind keine Screen-Galerien, sondern argumentierende Long-Reads: Section-Label → Claim-Headline mit farbigem Zweitteil → 2 Absätze Rationale → nummerierte „Entscheidung: Begründung“-Liste → 3er-Reihe Phone-Mockups. Das Muster wiederholt sich in jedem Kapitel exakt. Das ist der eigentliche Swipe: **die Erzählstruktur, nicht die Screens**.

### 2.1 Profil-Assets (X)

**Banner** (`preview/banner.jpg`): Warm-off-white Fläche `#f1f0ee`, kein Bild. Rechts der Mitte ein Zitat in zwei Zeilen, Inter/SF-ähnliche Grotesk, Semibold, ~22 px bei 900 px Breite, tiefes Anthrazit. Öffnendes doppeltes Anführungszeichen als eigene Zeile darüber, mit großem Abstand (ca. 2 Zeilenhöhen). Text in Kleinschreibung: „good design is obvious. / great design is transparent.“ Der Textblock startet bei ~53 % Breite, unten ausgerichtet (Baseline ~90 % der Höhe). Leere linke Hälfte ist Absicht: das runde Avatar sitzt auf X links unten und würde sonst kollidieren.

**Avatar**: Studio-Portrait, Kopf leicht nach links gedreht, greige Polo vor greige Wand (`#ccc2b8` im Hero, im Avatar ähnlich). Monochrome Erdton-Palette; nichts konkurriert mit dem Gesicht. Das gleiche Bild dient als 3200x3200-Hero des Portfolios.

### 2.2 Portfolio (Framer)

Ein Single-Page-Portfolio in Inter (70 `font-family: "Inter"`-Deklarationen, dazu „Inter Variable“). Struktur laut DOM-Text: Sticky-Header „HT.“ + Live-Uhr „16 : 53 : 16 GMT+5“ (Pakistan-Zeit, monospace-artiger Ziffernabstand mit Leerzeichen um die Doppelpunkte), dann Name, Rolle „Product Designer“, ein 6-Absatz-Selbstportrait in Kleinschreibung-naher Alltagssprache („I am not an expert, and I do not think I need to be.“). Zwei quadratische Loop-Videos (928x928) sind Logo-Reveals: EduCore-Wortmarke weiß auf `#0d0e0e`-Schwarz mit Lächel-Bogen unter „uCo“, Navo-AI-Node-Mark dunkelgrün auf Creme. Links zu zwei Behance-Cases, LinkedIn, Instagram, X. Sprachversion `/fr/` vorhanden.

Takeaway: Portfolio als Haltung, nicht als Grid. Ein Bild, ein Text, zwei Videos, vier Links.

### 2.3 Case Study „EduCore“ (Mobile Education App)

**Palette (gemessen):** Canvas `#f5f5f5`, Brand-Grün `#28b475`, Ink `#181d27`, Neutral `#e9eaeb`, Karten weiß. Grün-Tint für Icon-Chips ~`#e6f5ee`. Sekundärfarben nur in Status-Chips (Coral für „Wrong“, Orange für Streak-Flamme).

**Typografie:** Inter durchgehend. Case-Study-Headline ~72 px / -2 % Tracking / Regular-Weight (nicht Bold!) mit zweiter Zeile in Grün. Section-Label darüber: 13 px Caps, Grün, Tracking +4 %. Body 17–18 px, Grau `#6b7280`-artig, Zeilenhöhe 1.55. Der dokumentierte Type-Scale (Board 01): Display 2xl 72/90 -2 %, xl 60/72, lg 48/60, md 36/44, sm 30/38, xs 24/32, Text xl 20/30, lg 18/28, md 16/24, sm 14/20, xs 12/18. Vier Gewichte: Regular, Medium, Semibold, Bold. Das ist 1:1 der Untitled-UI-Scale.

**Geometrie:**
- Phone-Frames: 375 px Content in weißem Rahmen, Radius ~48 px, 1 px Border `#e9eaeb`, weicher Schatten `0 8px 32px rgba(24,29,39,.06)`. Status-Bar mit Dynamic Island als schwarze Pille.
- Karten in der App: Radius 12–16 px, 1 px Border, keine Schatten. Chips: Pille (999 px), Grün gefüllt bei aktiv, weiß mit Border bei inaktiv.
- Buttons: 48 px hoch, Radius 12 px, Grün gefüllt, weißes Label Semibold 15 px.
- Tab-Bar: 4 Tabs (explizit begründet: „four tab maximum“), aktiver Tab grün, Icon-Outline-Stil.
- Streak-Kalender: 7-Spalten-Grid, gefüllte Tage als 28-px-Grünkreise mit weißer Ziffer.
- Stat-Karten („40+ / 8 / 1“): 3-Spalten-Table-Look mit 1-px-Trennlinien, Zahl 44 px Grün Medium, Label 14 px Semibold Ink, Beschreibung 13 px Grau.
- „Honest reflection“-Karten: weiß, Radius 28 px, Padding 36 px, Eyebrow 11 px Caps Grün, Titel 20 px Semibold, Body 14 px Grau. Vertikaler Gap 16 px.
- Pill-Farbchips (Board 01 unten): vier vertikale Stadion-Formen (Radius 50 % der Breite), überlappend um ~15 %, Reihenfolge Ink / Weiß / Grün / Neutral — reine Deko-Sektion als Kapitelschluss.

**Material:** flach, papierartig, kein Glas, kein Gradient außer Hero-Foto. Tiefe entsteht nur durch 1-px-Borders auf `#f5f5f5` und die weiße Karte darauf. Genau ein Akzent (Grün) trägt Hierarchie, Aktiv-Zustand und Zweitzeile der Headline gleichzeitig.

**Erzählstruktur je Kapitel (7 Kapitel, immer gleich):**
1. `N. SECTION NAME` Caps-Label grün
2. Headline zweizeilig, Zeile 2 grün (Claim, z. B. „Sell the outcome. / Then the content.“, „The home screen is a / dashboard, not a lobby.“)
3. 2 Absätze Warum
4. Nummerierte Liste „**Entscheidung:** Begründung“ (2–4 Punkte)
5. 3 Phones nebeneinander, ggf. zweite Reihe

### 2.4 Case Study „Navo AI“ (AI Product Design Platform, Brand + Web + Mobile)

**Palette (dokumentiert auf Board 43, gemessen bestätigt):** Dark Teal `#002B27` (Primary surface & ink), Pale Lime `#CBE174` (Accent & action), Canvas `#F7F8F0`, Aqua `#7DE1D6` (Highlight & data), Teal 900 `#071F1C`, Teal 600 `#145247`, Cloud `#5D6B65`, Mist `#85938D`. Gemessen: App-Hintergrund `#07201d`, Karten `#011e19`, Board-Canvas `#edefec`, Hero-Grau `#5e6b64`.

**Typografie:** Display-Font **Suisse Int'l** (Trial), Body **DM Sans**. Dokumentierter Scale: display-lg 48/56 Bold, heading-lg 32/40 Bold, heading-md 24/32 SemiBold, body-md 16/20 Regular, body-sm 14/20 Regular. In der Web-App zusätzlich Monospace-Andeutung („Google Sans“ in einem Preview-Feld). Case-Study-Headlines hier Semibold 32–40 px, Board-Titel „Dark mode.“ als 200-px-Display mit Lime-Wort.

**Logo-System:** Node-Graph aus 3 dunklen + 1 Lime-Quadrat auf 8x8-Grid, Radius 0,75 Unit, 45°-Diagonal-Connector zwischen oben-links und unten-rechts. Vier verworfene Richtungen werden mit Begründung gezeigt (Kompass „too literal“, N „generic“, Path „illegible below 24px“). Minimum-Size-Regel: Marke bis 16 px, darunter Single-Node-Favicon.

**Geometrie Web-App (Dark):**
- Sidebar 200 px, Logo oben, 8 Items mit 20-px-Outline-Icon, aktiver Eintrag als Karte `#0b2a25` Radius 8 px.
- Topbar: Workspace-Switcher (Pille mit Chevron), Suchfeld mit `⌘k`-Kbd, Bell mit Lime-Badge, Avatar+Name, Primary-Button Lime 36 px Radius 8 px mit schwarzem Text.
- KPI-Karten 4-spaltig: Label 13 px Mist, Zahl 28 px Bold Cream, Delta-Zeile mit Pfeil, Icon rechts in Rounded-Square 40 px Border 1 px `#1a3a33`.
- Alle Panels: 1 px Border `rgba(255,255,255,.08)` auf `#07201d`, Radius 12 px, kein Schatten.
- Donut-Chart 4 Segmente (Aqua/Orange/Lila/Blau), Legende rechts. Der Chart bricht die 2-Farb-Regel, ist die einzige bunte Stelle.
- User-Flow-Builder: Node-Karten 120x44 Radius 8, dashed Connectors, Diamant-Decision-Node mit Lime-Outline, Mini-Map unten rechts.
- Stepper „1 Project Details — 2 Choose Template …“ als Linie mit Kreis-Zahlen.

**Geometrie Mobile (Light + Dark):** Phones Radius 44 px, Content 340 px. Onboarding mit 5-Punkt-Progress (aktiv = Dark-Teal-Linie), Headline 22 px Semibold zentriert, Illustration in Karte, Primary-Button volle Breite Dark Teal 48 px Radius 8 px, darunter „Skip for now“ 12 px. Dark-Variante invertiert nur Surface und Ink; Lime bleibt Accent, Aqua für Daten.

**Brand-Material:** Badge-Mockup (Board 47): Karte Dark Teal mit Verlauf nach Lime unten (`linear-gradient(180deg,#002b27 60%,#cbe174 100%)`), Radius 20 px, Wortmarke „NAVO AI“ in Condensed-Bold Caps, „AI“ Lime. Hero-Foto: Hand mit Phone auf `#5e6b64`-Grau, daneben Stat-Karte „< 60s“ mit Goal-Chip Lime.

**Visual-Language-Regeln (Board 39, wörtlich):** rounded-square containers, dashed construction grids, 45° connectors, generous negative space, „Motion always travels along a path“.

## 3. Was übertragbar ist (für unsere Landingpages)

1. **Claim-Headline mit farbiger Zweitzeile.** Regular-Weight bei 60–72 px wirkt teurer als Bold. Zweite Zeile in Akzentfarbe trägt die Pointe. Tracking -2 %.
2. **„Entscheidung: Begründung“-Listen** statt Feature-Bullets. Fettes Label, dann grauer Halbsatz. Maximal 4.
3. **Ein Akzent, drei Neutrale.** Alle Zustände (aktiv, Link, Zweitzeile, Icon-Chip-Tint) aus einer Farbe ableiten.
4. **Kapitel-Rhythmus**: Label → Claim → Warum → Liste → Beleg. Für Long-Form-Sales-Pages direkt nutzbar.
5. **Logo-Rationale-Board**: verworfene Optionen mit Grund zeigen. Erzeugt Vertrauen in die Entscheidung. Für „Warum wir“-Sektionen adaptierbar.
6. **Pale Lime auf Dark Teal** als CTA ist ein starker, wenig verbrauchter Kontrast (WCAG ~11:1).

**Anti-Pattern:** Das Layout ist Untitled-UI/Figma-Community-nah (Type-Scale identisch, Untitled-Icons). Für Distinctiveness reicht das nicht; Palette und Erzählstruktur sind das Eigene, nicht die Komponenten.

## 4. Nachbau in HTML/CSS

### 4.1 X-Banner

```html
<div class="banner">
  <blockquote>
    <span class="q">"</span>
    good design is obvious.<br>great design is transparent.
  </blockquote>
</div>
```
```css
.banner{width:1500px;height:500px;background:#f1f0ee;position:relative;
  font-family:Inter,system-ui,sans-serif}
.banner blockquote{position:absolute;left:53%;bottom:44px;margin:0;
  font-size:37px;font-weight:600;line-height:1.2;color:#1c1c1c;letter-spacing:-.01em}
.banner .q{display:block;font-size:52px;line-height:1;margin-bottom:64px}
```

### 4.2 EduCore-Kapitelblock (Label → Claim → Text → Liste → Phones)

```html
<section class="chapter">
  <p class="eyebrow">4. COURSE DETAIL</p>
  <h2>Sell the outcome.<br><em>Then the content.</em></h2>
  <p class="lead">The course detail page answers three questions in this exact order …</p>
  <ol class="decisions">
    <li><b>Instructor card is prominent:</b> learners complete more when they feel connected …</li>
    <li><b>"Enrol Free" label:</b> price transparency eliminates the last point of hesitation …</li>
  </ol>
  <div class="phones">
    <div class="phone"><div class="island"></div><!-- screen --></div>
    <div class="phone"></div><div class="phone"></div>
  </div>
</section>
```
```css
:root{--ink:#181d27;--brand:#28b475;--canvas:#f5f5f5;--line:#e9eaeb;--muted:#6b7280;
  --tint:#e6f5ee}
.chapter{max-width:1440px;padding:96px 140px;background:var(--canvas);
  font-family:Inter,system-ui,sans-serif;color:var(--ink)}
.eyebrow{font-size:13px;font-weight:600;letter-spacing:.04em;color:var(--brand);
  text-transform:uppercase;margin:0 0 40px}
.chapter h2{font-size:72px;line-height:90px;font-weight:400;letter-spacing:-.02em;margin:0 0 32px}
.chapter h2 em{font-style:normal;color:var(--brand)}
.lead{font-size:18px;line-height:1.55;color:var(--muted);max-width:68ch;margin:0 0 20px}
.decisions{padding-left:22px;font-size:18px;line-height:1.5;color:var(--muted)}
.decisions li{margin:0 0 18px;max-width:64ch}
.decisions b{color:var(--ink);font-weight:600}
.phones{display:grid;grid-template-columns:repeat(3,375px);gap:48px;margin-top:64px}
.phone{position:relative;height:812px;background:#fff;border:1px solid var(--line);
  border-radius:48px;box-shadow:0 8px 32px rgba(24,29,39,.06);padding:56px 16px 24px}
.island{position:absolute;top:14px;left:50%;transform:translateX(-50%);
  width:110px;height:32px;background:#000;border-radius:999px}
/* In-App-Bausteine */
.card{background:#fff;border:1px solid var(--line);border-radius:14px;padding:14px}
.chip{display:inline-flex;align-items:center;gap:6px;height:36px;padding:0 14px;
  border-radius:999px;border:1px solid var(--line);background:#fff;font-size:13px;font-weight:500}
.chip.on{background:var(--brand);border-color:var(--brand);color:#fff}
.btn{height:48px;border-radius:12px;background:var(--brand);color:#fff;
  font-weight:600;font-size:15px;border:0;width:100%}
.icon-chip{width:36px;height:36px;border-radius:10px;background:var(--tint);
  display:grid;place-items:center;color:var(--brand)}
.tabbar{display:grid;grid-template-columns:repeat(4,1fr);font-size:11px;color:#6b7280}
.tabbar .on{color:var(--brand)}
.streak{display:grid;grid-template-columns:repeat(7,1fr);gap:8px}
.streak .day{width:28px;height:28px;border-radius:50%;background:var(--line);
  display:grid;place-items:center;font-size:12px;font-weight:600}
.streak .day.hit{background:var(--brand);color:#fff}
```

### 4.3 EduCore Stat-Row + Reflection-Cards

```css
.stats{display:grid;grid-template-columns:repeat(3,1fr);background:#fff;
  border:1px solid var(--line);border-radius:28px;overflow:hidden}
.stats>div{padding:56px 48px}
.stats>div+div{border-left:1px solid var(--line)}
.stats .n{font-size:44px;font-weight:500;color:var(--brand);letter-spacing:-.02em}
.stats .l{font-size:14px;font-weight:600;margin:20px 0 10px}
.stats .d{font-size:13px;line-height:1.5;color:var(--muted)}
.reflect{background:#fff;border-radius:28px;padding:36px;margin-bottom:16px}
.reflect .eyebrow{font-size:11px;margin:0 0 10px}
.reflect h3{font-size:20px;font-weight:600;margin:0 0 8px}
.reflect p{font-size:14px;line-height:1.55;color:var(--muted);margin:0}
.pills{display:flex}
.pills span{width:200px;height:380px;border-radius:200px;margin-left:-30px}
.pills span:nth-child(1){background:#181d27;margin-left:0}
.pills span:nth-child(2){background:#fff}
.pills span:nth-child(3){background:#28b475}
.pills span:nth-child(4){background:#e9eaeb}
```

### 4.4 Navo AI Dark-Dashboard-Shell

```html
<div class="app">
  <aside class="side">
    <div class="logo"><span class="mark"></span>Navo AI</div>
    <nav><a class="on">Dashboard</a><a>New Project</a><a>AI Workspace</a><a>User Flow</a>
      <a>Wireframes</a><a>Design System</a><a>Assets</a><a>Settings</a></nav>
    <div class="upgrade">Upgrade Plan<small>You're on Pro Plan</small></div>
  </aside>
  <header class="top">
    <button class="ws">Acme Mobile App ▾</button>
    <label class="search">Search projects, files, flows, or assets… <kbd>⌘k</kbd></label>
    <button class="bell"><i>3</i></button>
    <button class="me">AV Alex Valdez ▾</button>
    <button class="primary">+ New Project</button>
  </header>
  <main>
    <div class="kpis">
      <div class="kpi"><span>Projects</span><b>24</b><small>↑ 12% vs last 7 days</small></div>
      …
    </div>
  </main>
</div>
```
```css
:root{--teal:#002b27;--t900:#071f1c;--t600:#145247;--lime:#cbe174;--aqua:#7de1d6;
  --canvas:#f7f8f0;--cloud:#5d6b65;--mist:#85938d;--line:rgba(255,255,255,.08)}
.app{display:grid;grid-template-columns:200px 1fr;grid-template-rows:56px 1fr;
  min-height:100vh;background:var(--t900);color:#eef0e9;
  font-family:"DM Sans",Inter,system-ui,sans-serif;font-size:13px}
.side{grid-row:1/3;border-right:1px solid var(--line);padding:16px 12px;display:flex;flex-direction:column}
.logo{font-family:"Suisse Int'l",Inter,sans-serif;font-weight:700;font-size:16px;
  display:flex;gap:8px;align-items:center;padding:6px 8px 24px}
.mark{width:18px;height:18px;
  background:
    linear-gradient(#eef0e9,#eef0e9) 0 0/7px 7px no-repeat,
    linear-gradient(var(--lime),var(--lime)) 100% 0/7px 7px no-repeat,
    linear-gradient(#eef0e9,#eef0e9) 0 100%/7px 7px no-repeat,
    linear-gradient(#eef0e9,#eef0e9) 100% 100%/7px 7px no-repeat;
  border-radius:2px}
.side nav a{display:block;padding:10px 12px;border-radius:8px;color:#cfd6d0}
.side nav a.on{background:#0b2a25;color:#fff}
.upgrade{margin-top:auto;border:1px solid var(--line);border-radius:10px;padding:12px}
.upgrade small{display:block;color:var(--mist);font-size:11px}
.top{display:flex;align-items:center;gap:12px;padding:0 20px;border-bottom:1px solid var(--line)}
.top button,.top label{height:36px;border-radius:8px;border:1px solid var(--line);
  background:transparent;color:#cfd6d0;padding:0 12px;display:inline-flex;align-items:center;gap:8px}
.search{flex:1;max-width:420px;color:var(--mist)}
.search kbd{margin-left:auto;font:11px "DM Sans";background:#0b2a25;padding:2px 6px;border-radius:4px}
.bell i{position:absolute;transform:translate(8px,-10px);font:600 9px/14px sans-serif;
  width:14px;height:14px;border-radius:50%;background:var(--lime);color:var(--teal);font-style:normal;text-align:center}
.primary{background:var(--lime)!important;color:var(--teal)!important;border:0!important;font-weight:600}
main{padding:24px}
.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.kpi{border:1px solid var(--line);border-radius:12px;padding:16px;display:grid;
  grid-template-columns:1fr 40px;gap:4px}
.kpi span{color:var(--mist)}
.kpi b{font-family:"Suisse Int'l",Inter,sans-serif;font-size:28px;font-weight:700}
.kpi small{color:#cfd6d0;grid-column:1/3}
```

### 4.5 Navo Onboarding-Phone (Light)

```css
.nphone{width:375px;height:812px;background:#fff;border-radius:44px;padding:64px 20px 24px;
  color:var(--teal);font-family:"DM Sans",sans-serif;text-align:center;display:flex;flex-direction:column}
.dots{display:flex;gap:6px;justify-content:center;margin-bottom:24px}
.dots i{width:6px;height:6px;border-radius:50%;background:#dfe5df}
.dots i.on{width:22px;border-radius:3px;background:var(--teal)}
.nphone h2{font-family:"Suisse Int'l",Inter,sans-serif;font-size:22px;font-weight:600;
  line-height:1.2;margin:0 0 8px}
.nphone p{font-size:13px;color:var(--cloud);line-height:1.5;max-width:28ch;margin:0 auto 20px}
.nphone .art{flex:1;border:1px solid #e3e8e2;border-radius:12px;padding:12px;text-align:left}
.nphone .cta{height:48px;border-radius:8px;background:var(--teal);color:#fff;font-weight:600;
  border:0;margin-top:20px}
.nphone .skip{font-size:12px;color:var(--mist);margin-top:12px}
```

### 4.6 Navo Badge (Brand-Mockup)

```css
.badge{width:290px;height:460px;border-radius:20px;padding:28px;
  background:linear-gradient(180deg,#002b27 0%,#0a3b32 55%,#cbe174 100%);
  color:#fff;display:flex;flex-direction:column;
  box-shadow:0 30px 60px rgba(0,0,0,.45)}
.badge .word{margin-top:auto;font:800 56px/1 "Suisse Int'l",Inter,sans-serif;
  letter-spacing:-.02em;text-transform:uppercase}
.badge .word em{font-style:normal;color:var(--lime)}
.badge .tag{font-size:15px;margin:12px 0 auto}
.badge address{font-style:normal;font-size:12px;line-height:1.4;display:flex;justify-content:space-between;align-items:flex-end}
```

### 4.7 Logo-Mark als SVG (8x8-Grid, Radius 0,75 Unit, 45°-Connector)

```html
<svg viewBox="0 0 8 8" width="64" height="64" fill="#002b27">
  <rect x="0" y="0" width="3" height="3" rx=".75"/>
  <rect x="5" y="0" width="3" height="3" rx=".75" fill="#cbe174"/>
  <rect x="0" y="5" width="3" height="3" rx=".75"/>
  <rect x="5" y="5" width="3" height="3" rx=".75"/>
  <path d="M2.2 2.2 L5.8 5.8" stroke="#002b27" stroke-width="1.1" stroke-linecap="round"/>
</svg>
```

## 5. Datenlücken

- **Tweets/Threads nicht erreichbar.** 1.790 Tweets und 525 Medien-Posts bleiben unbekannt; das Gesamtbild seiner X-Präsenz (Tipps, Before/After-Posts, Design-Takes) ist nicht belegt. Alle Aussagen oben stützen sich auf Profil-Metadaten, Portfolio und Behance.
- Behance-Boards sind Case-Study-Konzepte („EduCore is a design concept, not yet published“), keine Live-Produkte.
- Instagram `uiux_hamad` nicht versucht (außerhalb des Auftrags).
- Video-Frames zeigen nur Logo-Reveals, keine UI-Animation.

## 6. Quellen

- `research/gaps/uiux_hamad/banner.jpg`, `avatar.jpg` (pbs.twimg.com, 2026-09-07)
- `research/gaps/uiux_hamad/portfolio.html` (hamadtanveer.framer.website, Zeile mit Bio-Text; 70x `font-family: "Inter"`)
- `research/gaps/uiux_hamad/behance_01.png` (Type-Scale, Palette), `behance_03/06/08/10/12.png` (EduCore-Kapitel), `behance_14/16.png` (Stats, Reflection)
- `research/gaps/uiux_hamad/behance_37/45.png` (Navo Web-App), `behance_39/40/42/43.png` (Visual Language, Type, Grid, Palette), `behance_44/48.png` (Mobile Onboarding), `behance_47.png` (Badge), `behance_49.png` (Dark mode), `behance_51.png` (Hero + Goal)
- Farbwerte per PIL gemessen (Kommando im Sitzungslog), Hex-Codes der Navo-Palette laut Board 43.
