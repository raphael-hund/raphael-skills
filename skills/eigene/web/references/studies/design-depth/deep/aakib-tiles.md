# Aakib-Tiles: vier Kompositionsboards, eine Sektionsgrammatik, vier Häute

Paket: `research/x_aakib/tiles/2095863741250474026_*` (16 Crops aus 4 Vollboards). Quelle: X-Post 2095863741250474026. Keine Original-CSS, keine Fontmessung; Pixelwerte sind Schätzungen relativ zur Crop-Breite (1127–1400 px, Board-Layout ≈ 1000–1100 px Content). Body-Schrift im Crop ≈ 12–14 px, daraus Verhältnisse abgeleitet. Alle Boards sind Figma/Design-Mockups, keine Live-Sites; Slop-Hinweise beziehen sich auf Copy und Detailfehler im Mockup.

Kontextbericht `research/resume/x-aakib.md` gelesen; eigene Sichtung deckt sich, ergänzt Geometrie/Material.

## 0. Bildindex und Lesbarkeit

| Datei | Board | Region | Lesbarkeit |
|---|---|---|---|
| HRYA2c5acAAMBO-_0 | Nexora (dunkel) | Nav, Berg-Hero, Logowall, How-it-works | gut |
| HRYA2c5acAAMBO-_1 | Nexora | Pricing (3 Karten), Testimonial-Kopf | gut, UI-Tabelle oben unlesbar |
| HRYA2c5acAAMBO-_2 | Nexora | Features-Tabs, grosse Dashboard-Vorschau, Pricing-Kopf | Dashboard-Tabellenzeilen unlesbar |
| HRYA2c5acAAMBO-_3 | Nexora | Zitatwand, CTA-Banner, Footer mit Riesenwortmarke | gut |
| HRYAn81bIAAztkn_0 | Kalender (Ultramarin) | Nav, Hero, Kalender-Preview, Kompatibilitätsleiste | Hero-Sub/CTA-Text unscharf |
| HRYAn81bIAAztkn_1 | Kalender | Integrations-Grid-Rest, Pricing auf Blau, Testimonial-Kopf | Pricing-Zeilen unscharf, Struktur klar |
| HRYAn81bIAAztkn_2 | Kalender | Prozess 4 Schritte + UI, Feature-Split mit Task-Tabelle | gut |
| HRYAn81bIAAztkn_3 | Kalender | Zitatwand, CTA-Rahmenbox, blauer Footer | gut |
| HRYAn8lasAAGjba_0 | Launchkit (Finanz, hell) | Nav, Hero, Prompt-Komposer, Logowall | gut |
| HRYAn8lasAAGjba_1 | Launchkit | Pricing-Tabelle, FAQ-Kopf, FAQ-Kacheln | Buttontext unscharf |
| HRYAn8lasAAGjba_2 | Launchkit | 2 Featureflächen (Transfer Routes, Phone), Infrastruktur-Kopf, Schichtdiagramm | Diagramm-Labels teils unlesbar |
| HRYAn8lasAAGjba_3 | Launchkit | FAQ-Rest, Newsletter, schwarzer Footer | gut |
| HRYAn9ea8AAjiLg_0 | Motivra (Autohändler, warmweiss) | Nav, Split-Hero, Dashboard über Wiese, Features-Kopf | gut |
| HRYAn9ea8AAjiLg_1 | Motivra | Prozess + UI, Pricing 3 Karten, Testimonial-Kopf | gut |
| HRYAn9ea8AAjiLg_2 | Motivra | 3 Featurebilder, Prozess, Pricing-Kopf | gut |
| HRYAn9ea8AAjiLg_3 | Motivra | 3 Portraitkarten, CTA-Banner auf Wiese, Footer mit Riesenwortmarke | gut |

Jeder Crop zeigt links/rechts angeschnittene Nachbarabschnitte (Board-Montage). Kein zweispaltiges Seitenlayout daraus ableiten (HRYA2c5acAAMBO-_1 links: Bergfoto-Streifen ist Nachbarboard).

## 1. Board Nexora (dunkel) — HRYA2c5acAAMBO-

### 1.1 Nav (HRYA2c5acAAMBO-_0, oben, y≈100–170)
- Geometrie: Höhe ≈ 64 px, Logo links als 28 px Quadrat mit Radius 6, Links zentriert (5 Items, Abstand ≈ 32 px), rechts "Log in" als Text + "Join waitlist" als weisse Pille (Höhe ≈ 36 px, Radius 999, Padding 8/16).
- Material: Nav transparent über dem Hero-Foto, kein Blur sichtbar. Text #FFFFFF bei ≈ 85 % Deckung. Logo-Quadrat #1A1A1A mit weisser Glyphe.
- Seitenkarte: der gesamte Screen liegt als Karte mit Radius ≈ 24 px oben-links auf einem #3A3A3A-Canvas (Board-Rahmen, nicht Site).
- Nachbau: `header{position:absolute;inset:0 0 auto;display:grid;grid-template-columns:auto 1fr auto;align-items:center;padding:20px 56px}`; CTA `border-radius:9999px;background:#fff;color:#111;padding:8px 16px;font-size:.875rem`.
- Warum: Nav bleibt unsichtbar-leicht, damit Foto und Headline führen. Pille als einziger heller Klick-Block oben rechts.

### 1.2 Hero (HRYA2c5acAAMBO-_0, y≈170–830)
- Geometrie: Vollbreite Foto, Höhe ≈ 730 px (≈ 90 vh). Zentrierter Textblock, max-width ≈ 560 px. Eyebrow-Pille → Headline (2 Zeilen) → Sub (2 Zeilen) → 1 CTA. Vertikaler Rhythmus: Eyebrow 32 px über Headline, Sub 24 px unter Headline, CTA 24 px unter Sub.
- Material: Bergfoto, Himmel mit warmem Abendlicht (#E8B58A → #8FA6C1), Tal dunkel (#1B1D1F). Unten weicher Verlauf ins Seitenschwarz #0C0C0C, Übergang ≈ 120 px. Kein zusätzlicher Scrim über der Textzone erkennbar; Text sitzt im hellen Himmel und bleibt lesbar, weil Himmel gleichmässig hell ist.
- Eyebrow: dunkle, halbtransparente Pille (rgba(0,0,0,.35)), Höhe ≈ 32 px, Text Versalien "SEE THE BIGGER PICTURE", tracking ≈ +0.08em, ≈ 11 px, Farbe #D9D9D9; rechts ein weisses Ordner-Icon + "founders" in Regular.
- Headline: Grotesk mit runden Formen (unbestätigt, kein Fontname), ≈ 60 px, Weight ≈ 400–500, Zeilenhöhe ≈ 1.1, tracking ≈ −0.02em, Farbe #FFFFFF. Keine Farbabstufung innerhalb.
- Sub: ≈ 15 px, #FFFFFF bei ≈ 75 %, Zeilenhöhe 1.5.
- CTA: weisse Pille "Join waitlist", ≈ 40 px hoch, Padding 10/20, Text #111 ≈ 14 px Medium. Kein Sekundärbutton.
- Nachbau: `section.hero{position:relative;min-height:90vh;display:grid;place-items:center;padding-top:120px}` + `img{position:absolute;inset:0;object-fit:cover}` + `.hero::after{content:"";position:absolute;inset:auto 0 0;height:160px;background:linear-gradient(to bottom,transparent,#0C0C0C)}`.
- Warum: Ein CTA, hell auf dunkel, zentriert. Klarer Dominanzweg Headline → Button. Slop: Eyebrow "founders" mit Ordner-Icon ergibt keinen Sinn im Kontext (Copy-Fehler).

### 1.3 Logowall (HRYA2c5acAAMBO-_0, y≈840–900)
- 7 Logos in einer Zeile, Abstand ≈ 80 px, Höhe ≈ 24 px, Farbe #9A9A9A (einheitlich grau eingefärbt, kein Original-Branding). Kein Trennstrich, Padding 40 px oben/unten.
- Nachbau: `ul{display:flex;justify-content:space-between;filter:grayscale(1);opacity:.6}`.

### 1.4 How-it-works (HRYA2c5acAAMBO-_0, y≈960–1511)
- Sektionskopf zweispaltig: links Label-Pille "How it works" (weiss, Höhe 28, Radius 999, Text #111 12 px) + Headline ≈ 34 px Weight 400, rechts Absatz ≈ 14 px #C8C8C8, max-width 420 px, vertikal zum unteren Rand der Headline ausgerichtet. Abstand Pille→Headline ≈ 28 px.
- Prozess links: vertikale Stepper-Liste. Jeder Step: 16 px weisses Quadrat (kein Radius) als Marker, Titel 15 px Medium weiss, optional Beschreibung 12 px #A0A0A0. Verbindungslinie: 1 px vertikal grau (#3A3A3A) links vom Quadrat; unter jedem Step eine gepunktete horizontale Linie 1 px (`border-bottom:1px dotted #555`), Breite bis 400 px. Step-Abstand ≈ 72 px.
- Rechts: UI-Preview auf Bergfoto in Karte mit Radius ≈ 16 px, angeschnitten am rechten Rand; Innencard "User Details" auf dunklem Glas (rgba(20,20,20,.85)), Radius 12, mit Avatar, Badges "Admin" (schwarz) und "Active" (grün #1E7A3C).
- Nachbau: `.steps{display:grid;grid-template-columns:1fr 1fr;gap:80px}` `.step{position:relative;padding-left:28px}` `.step::before{content:"";position:absolute;left:0;top:2px;width:16px;height:16px;background:#fff}` `.step+.step::after{...border-left:1px solid #333}`; Trennung `border-bottom:1px dotted #4a4a4a`.
- Warum: Quadrat statt Kreis und gepunktete Linie erzeugen technisches, karten-artiges Timing. Foto in der Preview setzt die Hero-Bildfamilie fort.

### 1.5 Features-Tabs + Dashboard (HRYA2c5acAAMBO-_2)
- Label-Pille "Features", Headline 2 Zeilen ≈ 34 px, rechts Absatz. Danach Tab-Leiste: 4 Items "01 – User & Role Management" usw., Text 14 px, Höhe ≈ 44 px, Aktiv-Tab mit Hintergrund #2A2A2A (Radius 0, vollflächig), Inaktiv transparent. Tab-Leiste spannt volle Content-Breite (`grid-template-columns:repeat(4,1fr)`).
- Dashboard: Karte Radius ≈ 24 px, Rahmen 1 px rgba(255,255,255,.12), Hintergrund #1C1C1C mit Foto-Streifen links/rechts (Foto läuft hinter der UI, UI-Sidebar halbtransparent). Innere Tabelle: Zeilen 40 px, Text 11 px #8C8C8C, Badges "Admin"/"Basic" 10 px. Rechtes Panel "User Details" #222 Radius 12 mit Metrik-Karten #2A2A2A Radius 10 und Aufgabenliste mit Checkbox.
- Slop: Headline "Everything you need to turn emails into leads" auf Teammanagement-Seite; Tabelle mit 10× gleichem Namen "Mitchell Saint". Nicht kopieren.
- Nachbau: Dashboard als Bild-Asset oder HTML; Karte `overflow:hidden;border:1px solid rgba(255,255,255,.12);border-radius:24px`.

### 1.6 Pricing (HRYA2c5acAAMBO-_1, y≈270–1000; HRYA2c5acAAMBO-_2 unten)
- Kopf: Pille "Pricing & Plans", Headline ≈ 40 px Weight 600 (kräftiger als übrige Sektionsheadlines), Sub 14 px #B0B0B0 max 380 px; rechts Toggle "Billed Monthly ● Billed yearly" (Track 28×16 weiss, Knopf schwarz).
- 3 Karten, Grid `repeat(3,1fr)`, gap ≈ 24 px. Aussenkarten #000 mit 1 px Border #262626, Radius 16, Padding 16/16. Mittlere Karte weiss #FFFFFF, nach oben um ≈ 28 px überstehend mit Kopfband "Our Recommendation ✦" (Bergfoto als Bandhintergrund, Höhe ≈ 28 px, Text 12 px #111).
- Kartenaufbau: 3D-Icon (≈ 40 px, Metall-Render) → Planname 16 px Medium → Beschreibung 13 px Muted → Preis "$25" ≈ 34 px Bold + Pille "20 Users" (schwarz, 11 px, Radius 6) → 1 px Trenner → Featureliste (Check in Quadrat 14 px, Text 13 px, Zeilenabstand 28 px) → Button volle Breite Höhe 40, Radius 8 → Fussnote 11 px Muted.
- Buttons invertiert: dunkle Karte = weisser Button #F2F2F2 Text #111; weisse Karte = schwarzer Button #1A1A1A Text #fff.
- Slop: "dvanced role management" (Tippfehler), "Everything in Team Pro" (Plan heisst Pro Plan).
- Nachbau: `.plan.featured{background:#fff;color:#111;margin-top:-28px}` `.plan.featured::before{content:"Our Recommendation";display:block;height:28px;background:url(mtn.jpg) center/cover;font-size:12px;text-align:center}`.

### 1.7 Testimonials (HRYA2c5acAAMBO-_1 unten, HRYA2c5acAAMBO-_3 oben)
- Kopf zweispaltig wie 1.4. Body: Split 40/60. Links Zitatkarte #0F0F0F, Padding 24 px: 5 orange Sterne (#E2652C, 12 px), Zitat ≈ 24 px Weight 400 Zeilenhöhe 1.3 weiss, unten Avatar 32 px + Name 12 px + Rolle 11 px Muted. Rechts: Foto (Gebetsfahnen/Berg) als Hintergrund, darauf 2×2 weisse Karten (Radius 0, Padding 16, Avatar 36 px, Name 13 px Semibold, Rolle 11 px Muted, Text 12 px #333), Karten teils angeschnitten am rechten Rand (Grid überläuft, Slop oder bewusstes Overflow).
- Nachbau: `.wall{position:relative;background:url(flags.jpg) center/cover}` `.wall .grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:24px}` Karten `background:#fff;border-radius:0`.

### 1.8 CTA-Banner (HRYA2c5acAAMBO-_3, y≈450–830)
- Karte 700×380 px, Radius 24, Foto (Gebetsfahnen) mit Verlauf von #000 oben zu Foto unten (Verlauf über obere 45 %). Text zentriert: Headline 2 Zeilen ≈ 28 px, Sub 12 px, zwei Pillen: schwarz "Start Free Trial" + weiss "Book a Demo", Höhe 32, gap 12.
- Nachbau: `.cta{border-radius:24px;overflow:hidden;position:relative}` `.cta::before{content:"";position:absolute;inset:0;background:linear-gradient(#000 0%,rgba(0,0,0,.6) 40%,transparent 100%)}`.

### 1.9 Footer (HRYA2c5acAAMBO-_3, y≈960–1360)
- 3 Spalten: Brand (Name 24 px + Absatz 14 px + 2 Social-Icons 20 px), "Quicklinks", "Policy" (Titel 13 px, Links 13 px #B0B0B0, Zeilenabstand 24 px). Darunter Bergfoto Vollbreite ≈ 300 px mit Riesenwortmarke "Nexora" in Serif (Didone-Kontrast, unbestätigt), ≈ 260 px, Weiss bei ≈ 85 %, unten angeschnitten. Übergang Seite→Foto via Schwarzverlauf oben.
- Slop: "Resea rch" umbricht in der Mitte (Spalte zu schmal, Wortumbruch-Fehler).
- Nachbau: `footer .mark{font-family:serif;font-size:clamp(120px,22vw,280px);line-height:.8;color:rgba(255,255,255,.85);mix-blend-mode:normal;overflow:hidden}`; Foto als `background` mit `linear-gradient(#0C0C0C,transparent 40%)` Overlay.

## 2. Board Kalender (Ultramarin) — HRYAn81bIAAztkn

### 2.1 Nav + Hero (HRYAn81bIAAztkn_0)
- Seite als weisse Karte Radius 16 auf #C8C8C8-Canvas. Nav 64 px, Links mit Chevron-Dropdowns (Product ▾, Solutions ▾, Resources ▾), 14 px #333; CTA rechts: Rechteck-Button #1B3BFF, Radius 4, Höhe 32, Text weiss 12 px; auffällig: heller 1 px Innenrand + dunkler Unterschatten (`box-shadow:inset 0 1px 0 rgba(255,255,255,.4),0 2px 0 #0A1FA8`) — "gepresster" Knopf.
- Content-Rahmen: 1 px Linien #E5E5E5 links/rechts als Spaltenkanten; ausserhalb Diagonalschraffur (45°, 1 px Linien #D9D9D9, Abstand 12 px) als Randmotiv. Nav-Unterkante 1 px #EAEAEA.
- Hero zentriert: Eyebrow "▬ Work Calendar for Modern Teams" mit blauem Rechteck-Bullet (10×6 px) statt Punkt; Headline Monospace-Grotesk (technischer Duktus, unbestätigt) ≈ 40 px Weight 500, zweifarbig: Zeile 1 #111, Zeile 2 ab "task, and deadline." #1B3BFF. Sub 13 px #666, 2 CTAs: blauer Pressknopf + grauer Sekundär (#E5E5E5, Radius 4).
- Preview: Vollbreite blaues Panel #1B3BFF mit feinem Linienraster (Grid 8 px, Linien rgba(255,255,255,.12)), Padding 32; darin weisse Kalender-UI (Radius 6), Wochenansicht mit farbigen Events (Blau #DDE6FF, Rosa #FCE0EC, Orange #FFE6D0).
- Nachbau Raster: `.panel{background:#1B3BFF;background-image:linear-gradient(rgba(255,255,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.12) 1px,transparent 1px);background-size:8px 8px}`. Schraffur: `background:repeating-linear-gradient(45deg,#D9D9D9 0 1px,transparent 1px 12px)`.
- Warum: Ein Signalblau trägt CTA, Headline-Akzent und Preview-Fläche; alles andere ist Grau/Weiss. Raster + Schraffur geben "Blueprint"-Charakter ohne Fotos.

### 2.2 Kompatibilitätsleiste (HRYAn81bIAAztkn_0, y≈1040–1130)
- Titel 13 px #333 zentriert "Compatible with your AI agent", darunter 5 Logos in Originalfarbe (Claude orange, Codex schwarz, Cursor, Windsurf, VS Code blau), Abstand ≈ 120 px, Höhe 22 px. 1 px Trennlinie darunter.

### 2.3 Prozess + UI (HRYAn81bIAAztkn_2, oben)
- Label-Tag "Workflows Made Simple": Rechteck Höhe 22, Rand 1 px #E0E0E0, Radius 2, kleiner grüner Balken 2×10 px links. Headline einzeilig ≈ 34 px, zweifarbig ("Plan Once." #111, Rest #1B3BFF).
- Stepper wie 1.4, Marker schwarze Quadrate 16 px, gepunktete Trenner, CTA "Try it now ›" Blau-Pressknopf 32 px.
- Rechts: UI in blauem Rasterrahmen (Radius 12, oben-links abgerundet), Verlauf Blau→Violett (#1B3BFF→#5A4BFF) am oberen Rand, UI unten/rechts angeschnitten.
- Featurekopf darunter: Punkt-Eyebrow "● Features" (blauer Kreis 6 px), Headline zentriert zweifarbig, Sub 12 px.
- Feature-Split "Never Miss What Matters": links Titel 24 px (Wort "What Matters" blau), Sub 12 px Title Case (Slop: jedes Wort grossgeschrieben), 3 Bulletpunkte mit blauem Check-Kreis, CTA. Rechts Task-Tabelle in blauem Rasterrahmen mit farbigen Tag-Pillen (Radius 2, 11 px).

### 2.4 Pricing (HRYAn81bIAAztkn_1)
- Kopf zentriert: Eyebrow "● Features" (Slop: falsches Label, Sektion ist Pricing), Headline zweifarbig, Sub 12 px.
- Container: Vollbreite Blau #1B3BFF, Padding 24. 3 weisse Karten Radius 0, Rand 1 px #DCDCDC, gap 16. Karte: Name 11 px, Beschreibung 13 px #444 (2 Zeilen), Preis "$16" 18 px + "/forever" 10 px Muted, Toggle + Label "Billed Yearly" + Tag "2 MONTH FREE" (Monospace 9 px, Hintergrund #F0F0F0), Button volle Breite Höhe 30 mit **Eckmarkern** (4 kurze schwarze Winkel an den Ecken, "Crop-Marks"), mittlere Karte Button blau, andere #E5E5E5; Featureliste mit Check-Kreis grau, 1 px Trennlinien zwischen Zeilen (Zeilenhöhe 30).
- Nachbau Eckmarker: Button in `position:relative`; `::before/::after` als 8×8 px Boxen mit `border-left/top:2px solid #111` oben-links und `border-right/bottom` unten-rechts; für 4 Ecken zwei Wrapper.
- Warum: Weiss auf Blau macht die Preistabelle zum hellsten Block der Seite. Eckmarker wiederholen das Blueprint-Motiv.

### 2.5 Testimonials (HRYAn81bIAAztkn_1 unten, HRYAn81bIAAztkn_3 oben)
- Split: links 5 orange Sterne + Zitat in Monospace ≈ 22 px #111 Zeilenhöhe 1.35 + Avatar/Name unten; rechts blaues Rasterpanel mit 2×2 weissen Karten (Radius 0, Padding 16, Avatar 36, Name 12 Semibold, Rolle 10 Muted, Text 11 px). Karten rechts angeschnitten.

### 2.6 CTA-Box (HRYAn81bIAAztkn_3, y≈540–820)
- Rechteck 680×280, Hintergrund #F7F7F7 mit feinem Linienraster (#EDEDED, 16 px), 1 px Rand #111 und 4 schwarze Eckpunkte (5×5 px) wie Auswahlrahmen. Palmwedel-Grafik (Graustufen, Halbton) oben-links und unten-rechts. Eyebrow-Tag mit Rand + blauem Punkt "START BUILDING SMARTER" (Monospace 10 px). Headline zweifarbig ≈ 26 px, Sub 11 px, zwei Rechteck-Buttons Blau/Schwarz (#1B3BFF, #2A2A2A) mit Eckmarkern, Höhe 30.
- Nachbau: `.box{border:1px solid #111;position:relative}` Eckpunkte via `::before/::after` 5×5 px #111 + zwei Extra-Spans; Raster wie 2.1 in Hellgrau.

### 2.7 Footer (HRYAn81bIAAztkn_3, y≈900–1200)
- Vollflächig #1B3BFF, Padding 64/88. Alles Monospace Versalien 10–11 px weiss: "JOIN OUR NEWSLETTER" + Input (weiss, Höhe 30, Radius 0, Placeholder "YOUR EMAIL") + Button "JOIN NOW" (weiss, Text schwarz). Spalten "COMPANY"/"PRODUCT" mit Links, jeder Link mit kurzer Linie davor (`— ABOUT`, 12 px Strich #9FB0FF). Social-Icons 16 px unten links.
- Nachbau: `footer a::before{content:"";display:inline-block;width:12px;height:1px;background:currentColor;opacity:.5;margin-right:8px;vertical-align:middle}`.

## 3. Board Launchkit (Finanz, hell) — HRYAn8lasAAGjba

### 3.1 Nav + Hero (HRYAn8lasAAGjba_0)
- Seite: weisse Karte #FAFAFA auf unscharfem Himmel/Wiese-Foto (Board-Hintergrund). Content-Rahmen: 1 px vertikale Linien #E6E6E6 links/rechts, Nav-Unterkante 1 px. Nav 84 px, Logo 32 px Quadrat #1A1A1A Radius 8, Links 15 px #555 zentriert, rechts CTA "Start for free" Rechteck #2A2A2A Radius 4 Höhe 40.
- Hero zentriert: Eyebrow "● Powering Next-Gen Finance" (orangener Punkt #E85D2A 6 px, Text 12 px #333). Headline Monospace-Grotesk ≈ 44 px Weight 500, Zeile 1 #111, Zeile 2 "Business Finance" #7A7A7A (Grauabstufung statt Farbe). Sub 13 px #444 2 Zeilen. CTAs: schwarz Rechteck Radius 6 Höhe 40 + grau #E8E8E8 Sekundär.
- Prompt-Komposer: Karte 760×260, Radius 24, Rand 1 px #E6E6E6, Hintergrund #fff, Schatten 0 8px 24px rgba(0,0,0,.05). Oben 3 Chips (Radius 999, Rand 1 px, Icon + Label 14 px + ×), Textarea-Placeholder 16 px #9A9A9A, unten Toolbar: "+"-Quadrat, Segmentpille "Analyze Spend | Smart Analysis" (aktiv weiss, inaktiv Muted), Modell-Dropdown "GPT 5.2 ▾", Mikro-Icon, schwarzer Senden-Button 44×44 Radius 12 mit ↑. Hinter der Karte orangefarbenes Punktraster (Punkte 2 px, Abstand 8 px, #F0A080), das links unten und rechts oben aus der Karte herausragt (Offset ≈ 40 px).
- Nachbau Punktraster: `.composer::before{content:"";position:absolute;inset:-40px -40px -40px -40px;background:radial-gradient(#F0A080 1px,transparent 1.2px) 0 0/8px 8px;z-index:-1;mask:linear-gradient(135deg,#000 30%,transparent 70%)}` (Maske schätzt die diagonale Ausblendung).
- Warum: Einziger Farbakzent (Orange) ist Dekor und Eyebrow-Punkt, nie CTA. CTA bleibt Schwarz. Komposer als Produktbeweis in Hero, ohne Screenshot.

### 3.2 Logowall (HRYAn8lasAAGjba_0, y≈1215–1480)
- Hellgrauer Streifen #F2F2F2 mit Titel "Trusted by Leading Companies" (Monospace 26 px Weight 400), darunter Logozellen: Vollbreite Zeile 110 px hoch, Zellen mit 1 px Rand #E2E2E2, Logos schwarz, Leerzellen zwischen Logos (Rhythmus Logo–Leer–Logo). Nachbau: `grid-template-columns:repeat(11,1fr)`, jede Zelle `border:1px solid #E2E2E2`, Logos in ungeraden Zellen.

### 3.3 Sektionsköpfe (HRYAn8lasAAGjba_1/_2)
- Wiederkehrend: orange Punkt-Eyebrow → Headline Sans (nicht Monospace!) ≈ 40 px Weight 600 tracking −0.02em → Sub 13 px → 2 Buttons (schwarz + grau, Höhe 34, Radius 4). Zwei Schriftsysteme auf derselben Seite (Mono-Hero vs. Sans-Sektionen) — Inkonsistenz, nicht kopieren, oder bewusst als Hero/Body-Split festlegen.
- Sektionen sind durch 1 px horizontale Linien #E6E6E6 getrennt, die bis zum Seitenrand laufen und die vertikalen Rahmenlinien kreuzen (Linienraster-Layout).

### 3.4 Featureflächen (HRYAn8lasAAGjba_2, y≈290–960)
- 2 Karten, Grid 1fr 1fr, gap 48, ohne Rand, Hintergrund #F5F5F5 Radius 0. Titel 22 px Semibold, Sub 13 px #555 max 380 px. Links "Transfer Routes"-Widget: Karte Radius 12, Rand 1 px #F0D8CC (orange getönt), Suchfeld Höhe 44 Radius 10, Listenzeilen 96 px mit Flaggen-Kreis 56 px, Landname 20 px Semibold, Rate in Monospace 20 px rechts, Delta rot/grün 12 px. Rechts Phone-Umriss (nur Kontur, #D8D8D8, Radius 40) mit NFC-Symbol; dahinter rechts unten orangenes Punktraster.
- Nachbau: Phone als SVG-Kontur oder `border:6px solid #E0E0E0;border-radius:40px`.

### 3.5 Infrastruktur-Diagramm (HRYAn8lasAAGjba_2, unten)
- Isometrischer Stapel aus 5 Dashboard-Platten (Linienzeichnung, #DADADA, Versatz 24 px), links Beschriftungsliste Monospace 9 px Versalien mit Unterstrichlinie ("ANALYSIS", "PAYMENT MONITORING"), rechts drei Monospace-Versalzeilen. Labels teils unlesbar. Nachbau: SVG mit `transform:skewY(-30deg) scaleY(.86)` für Platten.

### 3.6 Pricing-Tabelle (HRYAn8lasAAGjba_1, y≈420–1000)
- Container #F0F0F0, Padding 56. Tabelle 3 Spalten, Rand 1 px #DCDCDC, Zellen ohne Radius, Zeilen: Kopf (Name 11 px, Beschreibung 14 px #555, 2 Zeilen) → Preis "$49" 20 px + "/Forever" 10 px + Toggle (orange #F26522) "Billed Yearly" + Tag "2 MONTH FREE" Mono 9 px → Button Höhe 32, mittlere orange #F26522, andere #E5E5E5, mit Eckmarkern → Featurezeilen 42 px mit Check-Kreis grau und 1 px Zeilentrenner.
- Warum: Tabellenlogik statt Karten. Ein Orange-Button als einzige Sättigung in der Sektion.
- Slop: "$0/Forever" bei Starter plus "2 MONTH FREE" bei Forever-Preisen widerspricht sich.

### 3.7 FAQ (HRYAn8lasAAGjba_1 unten, HRYAn8lasAAGjba_3 oben)
- Kopf zentriert mit Pillenbutton "View all Question →" (schwarz, Höhe 44, Radius 999). Grid 3 Spalten, gap 48, 9 Kacheln: Fragezeichen-Kreis 22 px schwarz → Frage 14 px Medium (2 Zeilen) → Antwort 12 px #666. Erste Kachel als dunkle Karte #2A2A2A Radius 8 Padding 24 (Hover/Aktiv-Zustand gezeigt).
- Nachbau: `.faq{display:grid;grid-template-columns:repeat(3,1fr);gap:48px 40px}` `.faq>li.active{background:#2A2A2A;color:#fff;border-radius:8px;padding:24px}`.

### 3.8 Newsletter + Footer (HRYAn8lasAAGjba_3)
- Newsletter zentriert: Headline 36 px Semibold, Sub 12 px, Input 240×40 Rand 1 px #DDD Radius 4 + Button "GET STARTED" #2A2A2A Mono 10 px Versalien Radius 4.
- Footer #000, Padding 80/72: Logo-Glyphe + Absatz 12 px #CCC + Social 16 px; rechts 3 Spalten (Titel 14 px weiss, Links 12 px #BBB). Unten Riesenwortmarke "LAUNCHKIT" Sans Bold ≈ 150 px in #1F1F1F auf #000 (Ton-in-Ton, fast unsichtbar), unten angeschnitten.
- Slop: zwei Spalten heissen beide "Primary" mit identischen Links; Footer-Text "Performance Marketing" passt nicht zu Finanzprodukt; "operations at scale.e." Tippfehler.

## 4. Board Motivra (Autohändler, warmweiss) — HRYAn9ea8AAjiLg

### 4.1 Nav + Split-Hero (HRYAn9ea8AAjiLg_0)
- Seite als Karte #FAFAF8 Radius 24 auf #DAD7D3-Canvas. Nav 80 px, Logo 20 px Glyphe links, Links rechts (Pricing, Blog, Trust, Log in) 13 px #333, kein Nav-CTA.
- Hero: Headline links ≈ 36 px Weight 600 tracking −0.02em, 2 Zeilen, max 640 px; Sub 15 px #333 3 Zeilen max 520 px. CTAs rechts unten auf Höhe der Sub-Zeile: schwarze Pille "Start Free Trial" (Höhe 36, Radius 999, Schatten 0 2px 4px rgba(0,0,0,.3)) + hellgraue Pille "Book a Demo" #EDEDED. Aussergewöhnlich: CTAs rechts, nicht unter dem Text.
- Preview: Karte Vollbreite Radius 16, oben #F5F5F3 (leer), unten Wiesenfoto mit gelben/blauen Blumen; Dashboard (weiss, Radius 8) liegt mittig auf Karte, Sidebar-Unterkante mit weissem Verlauf ausgeblendet (`mask-image:linear-gradient(#000 80%,transparent)`), Foto beginnt hinter dem Dashboard ≈ 45 % Höhe. Dashboard: Metrik-Karten, Donut (Orange #F08A5D), Balken (Orange-Verlauf), Liniendiagramm Orange/Schwarz. Orange ist Datenfarbe, nie Aktion.
- Nachbau: `.hero{display:grid;grid-template-columns:1fr auto;align-items:end;gap:40px}` `.preview{position:relative;border-radius:16px;overflow:hidden;background:#F5F5F3}` `.preview img.meadow{position:absolute;bottom:0;width:100%}` `.preview .app{position:relative;margin:80px 60px 0;-webkit-mask-image:linear-gradient(#000 85%,transparent)}`.

### 4.2 Featurebilder (HRYAn9ea8AAjiLg_0 unten, HRYAn9ea8AAjiLg_2 oben)
- Kopf zweispaltig: Headline 36 px links, Absatz 15 px rechts. 3 Karten, Grid 3, gap 24: Bild oben (Radius 12, Höhe ≈ 200 px, Foto unscharf mit UI-Ausschnitt: Icon-Grid auf Glas, Meeting-Clash-Karte, Balkendiagramm), darunter Titel 19 px Medium (2 Zeilen) + Text 13 px #555. Kein Kartenrand, Bild und Text offen gestapelt.
- Warum: Bild = konkretes UI-Detail, nicht Illustration. Text unterhalb ohne Box hält es leicht.

### 4.3 Prozess + UI (HRYAn9ea8AAjiLg_1 oben, HRYAn9ea8AAjiLg_2 Mitte)
- Tag "Dealership Operations, Simplified" (Rand 1 px, Radius 4, grüner Balken links), Headline einzeilig ≈ 40 px Weight 600. Stepper wie 1.4 in Schwarz auf Hell, gepunktete Trenner #BBB, CTA "Try it now ›" schwarze Pille mit Schatten. Rechts: UI-Karte Radius 12 auf unscharfem Strassenfoto, Dashboard-Ausschnitt angeschnitten rechts/unten.
- Doppelter Sektionskopf: "From Setup to Sales, It's That Simple" (zweispaltig) direkt gefolgt von Tag + "Run Your Dealership…" — zwei Headlines für eine Sektion, redundant.

### 4.4 Pricing (HRYAn9ea8AAjiLg_1)
- Kopf: Pille "Pricing & Plans" (#F0F0F0), Headline 40 px Semibold, Sub 14 px, Toggle rechts (Blau #2B4CFF — einziges Blau der Seite, Inkonsistenz mit Schwarz-Aktion).
- 3 Karten weiss, Rand 1 px #E8E8E8, Radius 16, Padding 16; mittlere mit Kopfband "Our Recommendation ✦" auf unscharfem Foto, um 28 px nach oben versetzt. Aufbau identisch zu 1.6: 3D-Icon → Name 16 px → Beschreibung 13 px → Preis 32 px Bold + schwarze Pille "20 Users" → Trenner → Checkliste (Check im schwarzen Quadrat 12 px, Text 13 px, 26 px Zeilen) → Button (mittlere schwarz #1A1A1A, andere #EFEFEF) Höhe 40 Radius 8 → Fussnote 11 px.
- Warum: Mittlere Karte gewinnt durch Versatz + Bild + einzigen dunklen Button, nicht durch Farbe.

### 4.5 Portrait-Belege (HRYAn9ea8AAjiLg_3 oben)
- 3 Hochkantkarten, Grid 3, gap 16, Radius 12, Höhe ≈ 430 px, Foto Vollfläche, unten Schwarzverlauf (ab 55 %) mit Firma 11 px #CCC, Name 14 px weiss Medium, Zitat 12 px #DDD. Oben rechts kleiner runder "+"-Button 24 px schwarz.
- Nachbau: `.card{position:relative;aspect-ratio:2/3;border-radius:12px;overflow:hidden}` `.card::after{content:"";position:absolute;inset:0;background:linear-gradient(transparent 50%,rgba(0,0,0,.85))}` Text `position:absolute;bottom:20px;left:16px;right:16px`.

### 4.6 CTA-Banner (HRYAn9ea8AAjiLg_3, y≈500–860)
- Karte 700×360, Radius 16, Wiesenfoto unten, weisser Verlauf von oben (weiss bis 45 %). Headline 2 Zeilen 30 px #111, Sub 12 px, Pillen schwarz + weiss Höhe 32. Spiegelbild zu 1.8 mit Hell statt Dunkel.

### 4.7 Footer (HRYAn9ea8AAjiLg_3, y≈960–1370)
- Struktur identisch zu 1.9 (Brand + Quicklinks + Policy, derselbe "Resea rch"-Umbruchfehler). Darunter Wiesenfoto mit Riesenwortmarke "Motivra" Serif ≈ 260 px in Weiss ≈ 80 % Deckung, Übergang oben via Weissverlauf.
- Slop: Textblock ist als Vorlage aus Nexora übernommen (gleiche Linkliste "Science, Journal, Reviews" bei Autohändler).

## 5. Gemeinsamkeiten im Paket

1. **Sektionsgrammatik identisch in allen 4 Boards:** Eyebrow/Label → Headline → Sub → (Aktion) → Beweisfläche. Reihenfolge: Hero → Logowall → Prozess (4 Steps, Stepper links / UI rechts) → Features → Pricing (3 Pläne) → Testimonials (Zitat links / 2×2 Karten rechts, oder 3 Portraits) → CTA-Banner → Footer mit Riesenwortmarke oder Vollfarbe. (alle _0–_3)
2. **Stepper-Primitive:** Quadratmarker 16 px + 1 px vertikale Linie + gepunktete horizontale Trenner. Gleich in Nexora (_0), Kalender (_2), Motivra (_1/_2).
3. **Zwei Pricing-Muster:** Karten mit versetzter Mittelkarte + Bildband (Nexora, Motivra) vs. Tabelle mit Eckmarker-Buttons (Kalender, Launchkit). Immer 3 Pläne, mittlerer hervorgehoben, Button-Inversion als einziges Hervorhebungsmittel.
4. **Ein Signalwert pro Seite:** Nexora Weiss auf Schwarz; Kalender Ultramarin; Launchkit Schwarz-Aktion + Orange-Dekor; Motivra Schwarz-Aktion + Orange-Daten. Nie zwei gesättigte Aktionsfarben.
5. **Bildfamilie als Klammer:** Hero-Foto kehrt im Preview-Hintergrund, Pricing-Band, Testimonial-Wand, CTA-Banner und Footer zurück (Nexora Berg, Motivra Wiese). Kalender und Launchkit ersetzen Foto durch Raster/Schraffur/Punktraster.
6. **Headline-Hierarchie durch Farbabstufung, nicht Grösse:** zweite Zeile in Akzentfarbe (Kalender) oder Grau (Launchkit). Nexora/Motivra einfarbig.
7. **Typo-Duktus pro Board:** Nexora runde Grotesk Weight 400; Kalender/Launchkit Monospace-Grotesk 500 in Hero; Motivra enge Grotesk 600. Fontnamen unbestätigt.
8. **Buttons:** Pillen (Nexora/Motivra, Radius 999, Höhe 32–40) vs. Rechteck Radius 4 (Kalender/Launchkit). Sekundär immer hellgrau ohne Rand.
9. **Body-Skala:** Body 13–15 px, Sub 12–13 px, Muted #666–#A0A0A0, Headline-Sektion 34–40 px, Hero 40–60 px. Verhältnis Hero/Body ≈ 3.5–4.5.
10. **Spacing-Rhythmus:** Sektions-Padding ≈ 96–120 px vertikal; Kopf→Inhalt ≈ 48–64 px; Kartengap 16–24 px; Innenpadding 16–24 px; Listenzeilen 26–30 px (Karten) bzw. 42 px (Tabelle).

## 6. Farblogik als Rollentabelle

| Rolle | Nexora | Kalender | Launchkit | Motivra |
|---|---|---|---|---|
| Page | #0C0C0C | #FFFFFF | #FAFAFA | #FAFAF8 |
| Surface | #000 + 1px #262626 | #FFF + 1px #DCDCDC | #F0F0F0 / #F5F5F5 | #FFF + 1px #E8E8E8 |
| Raised/Featured | #FFFFFF (Mittelkarte) | #1B3BFF-Panel | Komposer #FFF + Schatten | Mittelkarte + Bildband |
| Action | #FFFFFF Pille / #1A1A1A auf Weiss | #1B3BFF Rechteck (Pressed) | #2A2A2A Rechteck | #1A1A1A Pille + Schatten |
| Secondary | rgba(255,255,255,.9) Pille | #E5E5E5 | #E8E8E8 | #EDEDED |
| Text | #FFFFFF | #111111 | #111111 | #111111 |
| Muted | #A0A0A0 / #C8C8C8 | #666666 | #666666 / #7A7A7A | #555555 |
| Border | rgba(255,255,255,.12) | #E5E5E5 / #111 (Rahmenbox) | #E6E6E6 | #E8E8E8 |
| Accent (Dekor/Daten) | Orange Sterne #E2652C, Grün Badge | Event-Pastelle, Tag-Pillen | Orange Punkt/Toggle/Punktraster #E85D2A–#F0A080 | Orange Daten #F08A5D, Blau Toggle (Ausreisser) |
| Motiv | Bergfoto | Raster + Schraffur | Punktraster + Linienraster | Wiesenfoto + unscharfe Strassenfotos |

## 7. Dos

- Sektion = Frage + Darstellungsform + Anschlussaktion; jede Sektion endet mit Beweis (UI, Zahl, Zitat) oder CTA.
- Ein Aktionsfarbwert; Dekor und Datenfarben getrennt halten (Launchkit-Orange nur Dekor, Motivra-Orange nur Daten).
- Produktvorschau als eigene Ebene: Karte mit Radius, Foto/Raster dahinter, UI ausgeblendet per Mask oder Verlauf.
- Featured-Preis durch Versatz, Bildband und Button-Inversion, nicht durch dritte Farbe.
- Riesenwortmarke im Footer als Abschlussanker, unten angeschnitten, Ton-in-Ton oder Weiss auf Foto.
- Rahmenlinien (1 px vertikal) + Schraffur/Raster ausserhalb als Blueprint-Motiv ohne Fotos (Kalender, Launchkit).
- Stepper mit Quadratmarkern + gepunkteten Trennern statt nummerierter Kreise.

## 8. Don'ts

- Copy aus Vorlage übernehmen: "turn emails into leads" auf Teamseite (HRYA2c5acAAMBO-_2), "Performance Marketing" auf Finanz-Footer (HRYAn8lasAAGjba_3), "Science/Journal" bei Autohändler (HRYAn9ea8AAjiLg_3).
- Tippfehler und Dummy-Wiederholung in Mockups ausliefern: "dvanced", "scale.e.", 10× "Mitchell Saint", 2× "Primary"-Spalte.
- Footer-Spalte so schmal, dass "Research" umbricht (Nexora, Motivra).
- Eyebrow "Features" über einer Pricing-Sektion (HRYAn81bIAAztkn_1).
- Zwei Schriftsysteme (Mono-Hero, Sans-Sektionen) ohne Regel mischen (Launchkit).
- Blauer Toggle als einziges Blau auf einer Schwarz/Orange-Seite (Motivra _1).
- 2×2 Testimonial-Grid, das am Kartenrand abgeschnitten wird (Nexora _1, Kalender _3).
- Zwei Sektionsheadlines hintereinander für einen Inhalt (Motivra _2).
- "$0/Forever" neben "2 MONTH FREE" (Launchkit _1).

## 9. Mobile

Keine Mobile-Ansicht im Paket. Ableitung aus Struktur: Stepper links/UI rechts → Text vor Beweis stapeln; Pricing-Tabelle (Kalender/Launchkit) muss zu gestapelten Karten werden, Eckmarker-Buttons bleiben; Riesenwortmarke per `clamp()` skalieren und `overflow:hidden`; Split-Hero mit CTAs rechts (Motivra) → CTAs unter die Sub-Zeile. Nicht belegt, nur Konsequenz.

## 10. Unlesbar / nicht belegt

- Fontnamen aller Boards.
- Dashboard-Tabellenzeilen Nexora (_1 oben, _2 Mitte): Zeitstempel/Emails nur teilweise lesbar.
- Kalender-Board: Hero-Sub, CTA-Labels, Pricing-Featurezeilen, Integrations-Karten-Untertitel unscharf (_0, _1).
- Launchkit: Sekundär-Buttontexte ("Get a Live Demo" vermutet), Diagramm-Labels im Isometrie-Stapel (_2 unten).
- Motivra: Dashboard-Kleinlabels, Footer-Feinlinks nur Struktur.
- Exakte Hexwerte, Schatten- und Blur-Radien: Schätzung aus JPEG.
