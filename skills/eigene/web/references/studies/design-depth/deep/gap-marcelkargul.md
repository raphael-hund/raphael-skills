# Gap-Analyse: Marcel Kargul (@marcelkargul) / kargul.studio

Stand: 2026-09-07 · Status: **partial** · Quelle ursprünglich: https://x.com/marcelkargul (403)

## 1. Zugriffsprotokoll (was ging, was nicht)

| Weg | Ergebnis | Fehler |
|---|---|---|
| `https://x.com/marcelkargul` (curl, Mozilla-UA) | HTTP 200, 218 KB, aber nur JS-Shell ohne Tweet-/Media-Daten | kein Inhalt ohne Login/JS |
| `https://api.fxtwitter.com/marcelkargul` | **200** – Profil-JSON | – |
| `https://api.vxtwitter.com/marcelkargul` | **200** – Profil-JSON (ohne Banner) | – |
| `https://cdn.syndication.twimg.com/widgets/timelines/profile?screen_name=…` | 200, 0 Byte | leer |
| `https://syndication.twitter.com/srv/timeline-profile/screen-name/marcelkargul` | 3 Versuche: 429 | `Rate limit exceeded` |
| nitter.net `/marcelkargul`, `/media` | 200, Platzhalterseite „instances … back up“ | Instanz ohne Timeline |
| xcancel.com | 200, „Verifying your browser…“ | Anubis/JS-Challenge, nicht umgangen |
| nitter.privacydev.net, nitter.poast.org | 000 | DNS/Verbindung tot |
| nitter.space, lightbrd.com | 403 | gesperrt |
| `pbs.twimg.com` Banner 1500x500 + Avatar 400x400 | **200** | – |
| `https://kargul.studio` (Website aus der Bio) | **200**, 398 KB HTML + CSS + Bilder | – |

Fazit: Die Tweet-Timeline/Media-Galerie (3.098 Medien laut Profil) ist ohne Login **nicht** erreichbar. Erreichbar: Profil-Metadaten, Banner, Avatar, und die komplette Agentur-Website `kargul.studio` inklusive Case-Study-Bildern und Service-Illustrationen. Die Analyse stützt sich darauf.

Rohdaten: `/Users/raphaelhund/skill-workspace/web-design-depth/research/gaps/marcelkargul/`
- `profile-fxtwitter.json` – Profil (52.782 Follower, 26.829 Tweets, verified, Website kargul.studio)
- `banner.jpg` (1500x500), `avatar.jpg` (400x400), `og-image.jpg` (1200x630)
- `case-1.png` ZeroLeaks Dashboard, `case-2.png` Hyperliquid/Stacked Landing, `case-3.png` Streak-App Mobile (je 1440x1035)
- `service-*.png` (5 isometrische Service-Frames, 2400px, aus AVIF konvertiert), `footer-cta.png`

## 2. Design-System-Fakten (aus dem CSS von kargul.studio, nicht geraten)

- **Schrift:** `Geist` (Vercel), Weights 500/600/700 (`--font-weight-medium/semibold/bold`), 157x `font-bold` im Markup, Fließtext `font-medium`. Mono: ui-monospace-Stack.
- **Farben (Light):** `--background:#efefef`, `--foreground:#232323`, `--card:#fff`, `--muted:#f5f5f5`, `--muted-foreground:#707070`, `--border:#e5e5e5`.
- **Farben (Dark):** `--background:#0a0a0a`, `--card:#171717`, `--muted:#262626`, `--muted-foreground:#a1a1a1`, `--border:#ffffff1a`, `--dark:#232323`, `--dark-card:#2e2e2e`, `--dark-surface:#313131`, `--dark-foreground:#efefef`, `--dark-muted:#9d9d9d`.
- **Radius:** `--radius:.625rem` (10px); Pills `rounded-full`.
- **Grid:** Content `max-w-[988.5px]`, Section-Gaps `64px` mobil / `138px` Desktop, Stack-Gaps 12/18/36px.
- **Motion:** 16x Rive (`.riv`) für Service-Illustrationen, `animate-ripple` auf einem 8px `bg-success`-Punkt („available“-Badge), `motion-reduce:hidden`.
- **Tech:** Next.js `/_next/image`, Sanity CMS für Case-Bilder, Vercel-Deploy.

## 3. Bild-für-Bild-Analyse

### 3.1 X-Banner (1500x500) – „Logo-Wolke mit Leerraum-Zentrum“
**Elemente.** Hintergrund `#ececec`-ähnliches Warmgrau. Links und rechts je ein lockeres Raster aus weißen Kacheln (Radius ~24px), darin Kundenlogos in einheitlichem Mittelgrau (~#b0b0b0). Kachelgrößen: Quadrat ~100px für Icon-Logos, Breitformat ~220x100 für Wortmarken (SideShift, Jupiter, OSTIUM, Whop). Mitte: schwarzes „K“-Logo (zwei Schrägbalken), darunter zweizeiliger Claim in Geist Medium ~20px, `#333`.
**Geometrie.** Kacheln liegen auf einem 4x4-Raster mit 16px Gutter, gezielt unvollständig belegt (Lücken oben rechts, unten links) – wirkt „organisch“, ist aber ein Raster. Symmetrie-Achse in der Mitte; das Zentrum ist bewusst leer (Avatar überdeckt nichts Wichtiges).
**Material.** Flach, keine Schatten, keine Verläufe. Logos monochrom → Social Proof ohne Farbrauschen.
**Typografie.** Claim linksbündig-zentriert, Zeilenhöhe ~1.4, kein Tracking.
**Nachbau.**
```html
<div class="banner">
  <div class="cloud left">…tiles…</div>
  <div class="center"><svg class="k"/><p>A design and engineering partner for<br>scale-ups and enterprise products.</p></div>
  <div class="cloud right">…tiles…</div>
</div>
<style>
.banner{width:1500px;height:500px;background:#ececec;display:grid;grid-template-columns:1fr 480px 1fr;font-family:Geist,system-ui}
.cloud{display:grid;grid-template-columns:repeat(4,100px);grid-auto-rows:100px;gap:16px;padding:24px;align-content:start}
.cloud.right{justify-content:end}
.tile{background:#fff;border-radius:24px;display:grid;place-items:center;color:#b3b3b3;font-weight:700;font-size:26px}
.tile.wide{grid-column:span 2}
.center{display:grid;place-items:center;text-align:center;color:#333;font-weight:500;font-size:20px;line-height:1.4}
</style>
```

### 3.2 Avatar (400x400) – Flat-Line-Illustration
Comic-Porträt mit dickem schwarzen Outline (~6px bei 400px), Haare Grau `#8a8a8a`, Haut Off-White, Sonnenbrille schwarz, kleiner rosa Wangen-Akzent, schwarzes T-Shirt. Hintergrund `#ebebeb`, identisch mit Banner → Avatar sitzt „nahtlos“ in Bannerfarbe. Nachbau: SVG mit `stroke-linejoin:round`, `stroke-width:6`, keine Verläufe.

### 3.3 OG-Image (1200x630) – Reine Typo-Karte
Hintergrund `#efefef`. Wasserzeichen: das K-Logo in `#dddddd` bei `fill-opacity:.7` (identisch mit dem SVG im Site-Markup: `viewBox 0 0 115.5 99`, Pfad im HTML), ~180px hoch, hinter dem Text. Headline dreizeilig, Geist Bold ~72px, `#232323`, Tracking leicht negativ (~-0.02em), Zeilenhöhe ~1.05, zentriert, max-width ~900px.
```css
.og{width:1200px;height:630px;background:#efefef;display:grid;place-items:center;position:relative}
.og h1{font:700 72px/1.05 Geist;letter-spacing:-.02em;color:#232323;text-align:center;max-width:900px;text-wrap:balance}
.og .mark{position:absolute;left:50%;top:22%;translate:-50% 0;width:180px;fill:#ddd;fill-opacity:.7;z-index:0}
```

### 3.4 Case 1 – ZeroLeaks Security-Dashboard (Dark, 1440x1035)
**Elemente.** Sidebar 236px (`#0a0a0a`), Topbar 64px mit Titel + Subtitel (` · ` Trenner in Muted), rechts Search/Bell/„+ New“ Primary-Button (weiß, Radius 8px). Vier KPI-Zellen als Tabelle ohne Karten-Hintergrund: Icon links oben, Delta-Pill rechts (`+10%` grün `#1f3d2b/#5fd38d`, `-4%` rot), Label Uppercase 11px Tracking `.08em` Muted, Wert 30px Regular. Score-Karte: Ring 150px, 6px Stroke, `#3a3a3a` Track, weiße Progress; rechts Legenden-Balken 2px hoch. Timeline-Liste mit 36px Icon-Boxen (1px Border). Tabelle: Header 11px Uppercase, Zeilen 56px, Status-Dot 6px (rot/gelb/grün), Source als Outline-Pill (1px `#ffffff1a`, Radius full), Health als Mini-Balken 110px.
**Geometrie.** Alles 1px-Linien (`#ffffff1a`) statt Karten – Cut-Marks („+“) an den Kreuzungen der Sektionen (typisches „Blueprint“-Detail). Innenabstand 32px, Grid-Gutter 0 (Linien teilen).
**Material.** Kein Schatten, keine Blur-Effekte. Hierarchie nur über Helligkeit (`#fafafa` / `#a1a1a1` / `#707070`).
**Typografie.** Geist, Body 14px, Section-Titel 16px Medium, Zahlen 30px Regular (nicht Bold) – wirkt „instrumentenhaft“.
**Nachbau-Skelett.**
```css
:root{--bg:#0a0a0a;--line:#ffffff1a;--fg:#fafafa;--mut:#a1a1a1;--dim:#707070}
.app{display:grid;grid-template-columns:236px 1fr;grid-template-rows:64px 1fr;background:var(--bg);color:var(--fg);font:14px/1.4 Geist}
.side,.top{border-right:1px solid var(--line);border-bottom:1px solid var(--line)}
.kpis{display:grid;grid-template-columns:repeat(4,1fr)}
.kpi{padding:32px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);position:relative}
.kpi::after{content:"+";position:absolute;right:-6px;bottom:-9px;color:#444;font-size:14px} /* cut mark */
.kpi .lbl{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--dim);margin-top:40px}
.kpi .val{font-size:30px;margin-top:4px}
.pill{display:inline-block;padding:2px 8px;border-radius:999px;font-size:11px;background:#10241a;color:#5fd38d}
.pill.neg{background:#2b1010;color:#f26d6d}
.outline{border:1px solid var(--line);border-radius:999px;padding:4px 10px;font-size:12px}
.ring{width:150px;aspect-ratio:1;border-radius:50%;background:conic-gradient(#fff 0 65%,#2a2a2a 0);-webkit-mask:radial-gradient(circle,transparent 66px,#000 67px)}
```

### 3.5 Case 2 – Hyperliquid / Stacked Landing (Dark Fintech, 1440x1035)
**Elemente.** Sektion 1: Eyebrow „POWERED BY“ 11px Uppercase Muted, Partner-Logo (Mint `#7ef2d9` Icon + Wortmarke, Italic-Teil), zwei Zeilen Body 18px, dann drei KPIs: **Outline-Zahlen** (Hollow-Text, 1px Stroke in Mint/Grau, ~64px, wide sans), Label 18px darunter. Sektion 2: linke Spalte Text im 1px-Rahmen-Container (max-width ~950px), Eyebrow „TEAM LORE“, H2 44px Bold in `#9a9a9a` mit weißem Betonungswort („Stacked.“), Body 17px Muted mit farbigen Inline-Zahlen (`$400m` grün `#7ef28a`, `$15 billion` violett `#a78bfa`).
**Geometrie.** Zentrale Achse; Hintergrund-Strichgrafik: gebündelte Bezier-Linien (4–5 parallele Linien, 1px, Verlauf mint→blau→violett, Alpha ~.5, mit Blur-Tail), die von den oberen Ecken zur Mitte laufen und unten in einen Rauch-/Glow-Fächer auslaufen. Unten rechts „A“-Chevron aus Linien in Regenbogen-Verlauf. Container-Rahmen 1px `#ffffff14`.
**Material.** Glow via `filter:blur(20px)` Duplikat der Linien, nicht via Shadow. Zahlen mit `-webkit-text-stroke:1px` + `color:transparent`.
**Nachbau-Kern.**
```css
.stat{font:400 64px/1 Geist;letter-spacing:-.01em;color:transparent;-webkit-text-stroke:1px #7ef2d9}
.h2{font:700 44px/1.15 Geist;color:#9a9a9a;letter-spacing:-.02em}.h2 b{color:#fff}
.frame{border:1px solid #ffffff14;padding:96px 120px}
.lines path{fill:none;stroke:url(#g);stroke-width:1;opacity:.6}
.lines.glow{filter:blur(14px);opacity:.5}
```
SVG-Gradient `#7ef2d9 → #4f7cff → #a855f7`. Eyebrow-Pattern: `font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#8b8b8b`.

### 3.6 Case 3 – Streak/League Mobile-App (Light, Gamified)
**Elemente.** Drei iPhone-Frames (Radius 40px) auf `#1c1c1c`. Screen 1 „Streak“: Header mit Orange-Verlauf `#ff7a00 → #ffd18a` plus konzentrische Halbkreise (weiß, Alpha .15) und weiche Wolken-Silhouette; Flammen-Maskottchen (Tropfen mit Gesicht, 3D-glossy). Zahl „3“ 56px Bold Orange, „days streak!“ 18px Semibold. Wochenreihe: 7 Kacheln 48x88, Radius 14, 1px Border `#e8e8e8`, aktive mit Orange-Icon + Zahl. Karten-Sektionen mit 1px Border, Radius 16, Progress-Bar 12px mit Milestone-Knöpfen (7/14/30). Screen 2: dasselbe als Modal über abgedunkeltem Blur-Hintergrund (`backdrop-filter:blur(12px)` + `#0008`), Primary-CTA Pill-Button 52px Orange-Verlauf. Screen 3 „League“: Blau-Verlauf-Header `#3a9bff → #dff2ff`, drei 3D-Hexagon-Badges (Silber/Gold/Bronze, Gold größer und höher), XP-Bar mit Pill-Label, Leaderboard-Liste mit Rang-Chips (farbig 1–3, grau ab 4), Avatar 40px, Name Semibold, Wert rechts Muted; „You“-Zeile als hervorgehobene Karte.
**Geometrie.** 16px Außenabstand, 8px-Raster; Header-Halbkreise zentriert auf das Maskottchen (radial-gradient rings).
**Material.** Einzige Stelle mit Verläufen, Glanz und Blur – bewusst „juicy“ für Gamification. Badges: Facetten-Illustration (nicht CSS).
**Nachbau-Kern.**
```css
.phone{width:430px;height:932px;border-radius:40px;background:#fff;overflow:hidden;font-family:Geist}
.hero{height:300px;background:
  radial-gradient(circle at 50% 100%,transparent 60px,#fff2 61px,transparent 62px,transparent 110px,#fff2 111px,transparent 112px),
  linear-gradient(180deg,#ff8a1a,#ffd39a)}
.day{width:48px;height:88px;border:1px solid #e8e8e8;border-radius:14px;display:grid;place-items:center;font-size:12px;color:#9a9a9a}
.day.on{color:#f97316;border-color:#fbd5b0}
.cta{height:52px;border-radius:999px;background:linear-gradient(180deg,#ff9a3c,#ff7a00);color:#fff;font-weight:600;box-shadow:0 6px 14px #ff7a0040}
.xp{height:24px;border-radius:999px;background:#eef2f6;overflow:hidden}.xp i{display:block;height:100%;width:56%;background:linear-gradient(90deg,#5ac8ff,#2b9dff);border-radius:999px}
.rank{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font-size:12px;background:#f1f1f1;color:#666}
.rank.g{background:#ffd447;color:#7a4c00}.rank.s{background:#d9d3f2;color:#4d3f8f}.rank.b{background:#d99a5b;color:#5a3300}
```

### 3.7 Service-Illustrationen (5x, isometrisch, 2400px, aus Rive-Frames)
Gemeinsames System: Hintergrund `#2e2e2e`-`#313131` (`--dark-card`/`--dark-surface`), feines isometrisches Gitter (30°-Achsen, 1px, Alpha ~.06) mit radialem Fade zum Rand, gepunktete Hilfslinien (`stroke-dasharray:2 6`, Alpha .25) als „Blueprint“-Achsen, quadratische 8px-Anfasser (weiß) an Ecken wie in Figma-Selektionen, Hauptobjekte als Flächen `#232323` mit 1px weißem Outline (Alpha .8), Schraffur-Flächen (parallele 1px-Linien, 4px Abstand) für Tiefe/Seitenflächen. Kein Farbakzent – nur Weiß/Grau. Motive: „Landing pages“ = gewölbtes Blatt mit Balken (Konversions-Chart), „Full websites“ = fächernd gestapelte Screens mit Next.js/Framer/Webflow-Marken, „Product UI/UX“ = drei Ebenen (Grid, Komponenten, Wireframe) + „px“-Notiz, „Branding“ = Logo-Karte über Schraffur-Wireframe, „Full-stack“ = Board mit Modul-Slots, Verbinder zu Code- und Stack-Icons. Footer-CTA: Light-Variante (`#fff` auf schwarz) – Kuppel, Torte, Bausteine, Halbmond-Blatt auf isometrischer Platte, umgeben von 1px-Gitter mit radialem Fade.
**Nachbau des Rahmen-Systems.**
```css
.iso{background:#2e2e2e;position:relative;overflow:hidden}
.iso::before{content:"";position:absolute;inset:0;background:
  repeating-linear-gradient(30deg,#ffffff0f 0 1px,transparent 1px 28px),
  repeating-linear-gradient(-30deg,#ffffff0f 0 1px,transparent 1px 28px);
  -webkit-mask:radial-gradient(ellipse at 50% 35%,#000 20%,transparent 70%)}
.plate{transform:rotateX(60deg) rotateZ(45deg);transform-style:preserve-3d;background:#232323;outline:1px solid #ffffffcc}
.handle{position:absolute;width:8px;height:8px;background:#fff;translate:-50% -50%}
.hatch{background:repeating-linear-gradient(45deg,#ffffff33 0 1px,transparent 1px 4px)}
.guide{stroke:#fff;stroke-opacity:.25;stroke-dasharray:2 6}
```

## 4. Muster, die den Stil tragen (Senior-Fazit)
1. **Ein Font, drei Gewichte.** Geist 500/600/700; Zahlen bewusst Regular für Instrumenten-Look.
2. **Grau-Disziplin.** Zwei Paletten (Light `#efefef/#232323`, Dark `#0a0a0a/#fafafa`), Akzent nur, wenn der Kunde ihn mitbringt (Mint, Orange).
3. **Linien statt Karten.** 1px `#ffffff1a` Trennlinien, Cut-Marks, gepunktete Achsen, Anfasser – „Blueprint/Figma-Canvas“ als Markenzeichen.
4. **Isometrie als Illustrationssprache**, monochrom, Rive-animiert, mit radial ausblendendem Gitter.
5. **Leerer Mittelpunkt.** Banner, OG, Footer-CTA: Content in der Mitte, Beweise (Logos) an den Rändern.
6. **Radius-System:** 10px Base, 8px Buttons, 16–24px Kacheln, Pills full.
7. **Motion minimal:** Ripple-Dot für Verfügbarkeit, `motion-reduce` respektiert.

## 5. Datenlücken
- Tweet-Timeline und Media-Tab (3.098 Medien) nicht erreichbar (429/Challenge/403). Keine Aussage zu Marcels eigenen Design-Posts/Threads möglich.
- Case-Bilder stammen von kargul.studio (Sanity-CDN), nicht von X; Zuordnung zu einzelnen Tweets unbekannt.
- Rive-Animationen nur als Standbild (`*-frame.avif`) bewertet.
