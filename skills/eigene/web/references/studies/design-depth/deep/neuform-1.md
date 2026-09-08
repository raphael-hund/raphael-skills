# neuform-1 — Belegpaket-Analyse (platform-images)

Stand: 07.09.2026. Quelle: 6 Screenshots unter `research/neuform/evidence/`, Kontext `research/neuform/REPORT.md`.
Desktop 1280×800 CSS-px (1× Raster). Mobile-PNGs 780×1688 Bildpixel = 390×844 CSS-px (2× Raster); alle Mobile-Maße unten sind bereits auf CSS-px halbiert.
Markierung: `gemessen` = aus Pixeln geschätzt, `Quelltext` = laut REPORT.md aus DOM/Computed Style, `unlesbar` = nicht bestimmbar.

Body-Referenz für Verhältnisse: Beschreibungstext der Auth-Säule ≈ 15px (Quelltext 15.04px).

---

## 1. `01-home-desktop.png` — Homepage, Desktop

### 1.1 Grundriss (gesamtes Bild)
- Zwei Zonen: linke Auth-Säule x 8–368 (360px, Quelltext 360×784) und rechte Galerie x 376–1256, 2 Spalten × 2 Reihen, Karten ≈ 436×388 (Quelltext), Gap 8px. Außenluft rings 8px. Page-Hintergrund `#0B0B0C` (gemessen, sehr dunkles Neutral).
- Kein klassischer Header. Wortmarke sitzt in der Säule (oben links, y ≈ 34). Kein Nav-Bar über der Galerie. Scrollbar rechts (y 10–150) zeigt: Galerie scrollt, Säule bleibt stehen.
- Grid: `grid-template-columns: 360px 1fr`, Galerie `grid-template-columns: repeat(2, 1fr)`, `gap: 8px`, `padding: 8px`.
- Warum: 8px-Gap + 6px-Radius machen die Karten zu „Kacheln im Rahmen“, nicht zu schwebenden Cards. Die Arbeit (Previews) nimmt ≈ 70 % der Fläche; der Verkaufstext nur 28 %.

### 1.2 Auth-Säule (Bildregion x 8–368, y 8–792)
- Material: Surface-Verlauf `rgb(29,29,32)` → `rgb(23,23,25)` (Quelltext), also `#1D1D20` → `#171719`, vertikal. Border 1px `rgba(255,255,255,0.06)` (gemessen, kaum sichtbar). Radius 6px (Quelltext). Kein Schatten. Innenpadding ≈ 18–19px (Quelltext 18.6px).
- Wortmarke (y ≈ 34): Asterisk-Glyphe ≈ 14px + „NEUFORM“ Mono/Sans-Versalien ≈ 11px, Tracking ≈ 0.25em, Farbe `#B8B8B8` (Muted). Rolle: Logo als Label, nicht als Bild.
- Eyebrow (y ≈ 75): „PROMPT-TO-PRODUCTION DESIGN WORKFLOW“, JetBrains Mono ≈ 9.3px (Quelltext 9.28), Tracking ≈ 0.2em, Farbe `#9DB1FF` (Quelltext rgb 157,177,255). Blau = Label-Accent, nicht Button-Accent.
- H1 (y 92–190): DM Sans 300, 32.6px / 32px Zeilenhöhe (Quelltext), also Zeilenhöhe ≈ 0.98, Verhältnis zu Body 2.2×. Farbe `#FFFFFF`. Drei Zeilen, linksbündig, kein Farbwechsel innerhalb der Headline. Tracking leicht negativ (gemessen ≈ -0.01em).
- Body (y 203–275): ≈ 15px / 25px (Quelltext 15.04/24.82), Zeilenhöhe 1.65, Farbe `#B5AFA4` (Quelltext rgb 181,175,164) — Warmgrau, nicht Neutralgrau. Das ist der einzige warme Ton im Layout und trägt den Kontrast zur kalten Blau-Eyebrow.
- Social Proof (y 290–330): drei überlappende Avatare ⌀ ≈ 30px, Überlappung ≈ -10px, Ring 2px in Surface-Farbe. Rechts daneben „31.1K“ Semi-Bold ≈ 15px weiß + „users are building“ Regular; darunter Mono-Nachzeile „MADE 25.1K DESIGNS FASTER.“ ≈ 10px, Tracking 0.15em, `#7C7C82` (Muted).
- Google-CTA (y 366–412): 322×46px, Radius 999px (Quelltext), Fläche `#F4F1EA`, Text `#141414` 15px Medium. Google-G-SVG links (x ≈ 44, 18px). Rechts ein Kreis ⌀ ≈ 34px, `rgba(0,0,0,0.08)` gemessen `#DEDBD4`, mit schwarzem Pfeil `→`. Drei-Zonen-Button: Icon | Label (links ausgerichtet) | Pfeilscheibe.
- Divider „OR“ (y 432): zwei 1px-Linien `rgba(255,255,255,0.12)` links/rechts, Mono-Wort ≈ 10px, Tracking 0.2em, `#7C7C82`.
- Feldlabel-Zeile (y 458): links „EMAIL“, rechts „FORGOT“ als Link, beide Mono ≈ 10.5px, Tracking 0.2em, `#8A8A90`. `display:flex; justify-content:space-between`.
- Input (y 472–518): Höhe ≈ 46px, Radius 999px (Pill wie CTA), Border 1px `rgba(255,255,255,0.10)`, Fläche `#1B1B1E` (leicht heller als Säule), Placeholder `#6E6E74` 15px. Kein Submit-Button sichtbar — Enter erwartet oder Button erscheint bei Eingabe (unlesbar).
- Footer-Zeile (y 768): Mono-Versalien „PRICING LEARN FAQ TERMS PRIVACY“ ≈ 10px, Tracking 0.2em, `#6E6E74`, Gap ≈ 14px; rechts „2026“. Fixiert am Säulenboden (`margin-top:auto`).
- Vertikal-Rhythmus in der Säule (gemessen): Logo→Eyebrow 40, Eyebrow→H1 14, H1→Body 14, Body→Proof 20, Proof→CTA 36, CTA→OR 18, OR→Label 22, Label→Input 12. Grundmaß 4px, kompakter als Tailwind-Default.

### 1.3 Galeriekarten (rechte Zone)
Vier Karten, jede ein eigener „Stil“ (Live-Iframe, Quelltext). Gemeinsam: Radius 6px, 1px Border `rgba(255,255,255,0.08)`, kein Schatten, Inhalt randlos.

**Karte A „Spatial Engine“ (x 376–806, y 8–396):**
- Page `#111113`. Eckmarken (L-Winkel 1px, ≈ 10px lang, `#3A3A3E`) an vier Ecken, Offset ≈ 12px. Eyebrow „SPATIAL ENGINE“ Mono ≈ 8px Coral `#E0664F`. H2 Sans Medium ≈ 22px weiß, 3 Zeilen, Zeilenhöhe 1.15. Rechts Body-Snippet ≈ 8px `#8A8A90` 3 Zeilen, Breite ≈ 140px.
- Panel (y 175–380): Raised `#1A1A1D`, Radius 12px, Border 1px `rgba(255,255,255,0.08)`. Statusleiste mit rotem Punkt ⌀ 5px + „Grid stable“ 8px; rechts Pill „View logs“ `#2A2A2E` 8px. Drei Listenzeilen: Icon-Quadrat 14px `#2E2E33` links, Titel 9px weiß, Subtitel 7px `#8A8A90`. Zeilen getrennt durch 1px Linie.
- Kreisbadge (x 682–756, y 290–366): ⌀ 74px, Verlauf Violett→Blau (`#4B3FB0` → `#1C4A9A`), Innenrand 1px weiß 20 %, Text „V.3.1 CORE“ Mono weiß 8px zentriert, Schatten `0 8px 24px rgba(0,0,0,0.5)`. Badge überlappt Panel-Kante (`position:absolute; right:-12px; bottom:-12px`).
- Slop-Risiko: der Violett-Blau-Verlaufsball ist generisches „Tech-Orb“-Motiv, ohne Bezug zum Produkt.

**Karte B „S/C Systema“ (x 822–1256, y 8–396):**
- Page `#0C0C0C` mit sehr feiner 135°-Schraffur (Quelltext: `repeating-linear-gradient(135deg, rgba(255,255,255,.015) 0 1px, transparent 1px 22px)`), in der Aufnahme kaum sichtbar (gemessen: unter Wahrnehmungsschwelle bei 1×).
- Top-Bar: „S/C“ Sans ≈ 9px weiß oben links; rechts runder Coral-Button ⌀ 24px `#FF7A6E` mit zwei weißen Strichen (Hamburger, 2 Linien). Eckmarken wie Karte A, aber weiß 30 %.
- Headline (y 70–180): Serif (Playfair Display) 300, ≈ 30px, Zeilenhöhe 1.35, drei Zeilen; Zeile 1 `#E7E7E7`, Zeile 2 `#BDBDBD` (heller Muted), Zeile 3 Handschrift (Caveat) `#FFFFFF` ≈ 34px kursiv. Farbabstufung innerhalb der Headline: hell → gedimmt → hell-handschriftlich.
- Body (y 200–230): Sans ≈ 8px `#9A9A9A`, letzter Satz „Less friction. Higher fidelity.“ Weiß 500 als Inline-Betonung (`<strong>`).
- Unten rechts (y 361): „EXECUTE SEQUENCE ↗“ Mono 7px Versalien weiß, Tracking 0.15em. Link statt Button.
- Rechter Rand: 1px vertikale Linie `#2A2A2A` plus weiße Scroll-Leiste — Scrollbar des Iframes, kein Designelement.

**Karte C „Meridian Hall“ (x 376–806, y 404–792):**
- Page `#0E0E10`. „MERIDIAN / HALL“ Mono 7px `#8A8A90` oben links, zwei Zeilen. Mittig ein Bogen (1px, `#2C2C30`, Radius ≈ 200px, nur Teilkreis sichtbar) — Pendel-Motiv. Zentrum: senkrechter Strich 1px × 14px weiß + „PER CENT“ 6px Mono darunter.
- Untere Textgruppe (y 645–790): „Preparing the gallery“ Serif ≈ 15px `#E0E0E0` zentriert; darunter 2 Zeilen Mono 7px `#6E6E74`; Datenpaare „0.8° PLANE ROTATION“, „28.4 m WIRE LENGTH“, „32 h FULL PRECESSION“ — Wert Mono 9px `#C8C8C8`, Label 6px `#6E6E74`, Tracking 0.15em. Zwei Spalten, dann eine mittig. Pfeil „↓“ als Scroll-Hint.
- Wirkung: ruhigste Karte, Loader als Inszenierung; Slop-Risiko: 6–7px Mono-Text ist auf Desktop unleserlich (unlesbar in Detailteilen bestätigt).

**Karte D „Saltworks“ (x 822–1256, y 404–792):**
- Zwei Hälften (Quelltext `1.08fr 1fr`): links Canvas `#0A1013` (hier leer, Reveal pausiert — unlesbar), rechts Content `#0E1418`, Trennlinie 1px `rgba(244,241,233,0.10)`.
- Wortmarke „SALTWORKS“ Serif (Newsreader) ≈ 11px Versalien, Tracking 0.22em, `#F4F1E9`. H1 Serif 300 ≈ 22px, Zeilenhöhe 1.1, 2 Zeilen; Wort „first crust“ in Amber `#E8A33D` (Inline-`<em>`-Färbung). Body Mono ≈ 7px `rgba(244,241,233,0.5)`, 4 Zeilen.
- Datenliste (y 585–665): vier `dt/dd`-Zeilen, Label Mono 6px Versalien `#8A8A80` links, Wert rechtsbündig Mono 7px `#F4F1E9` (Tabellenziffern), Trennlinien 1px 10 % Alpha, Zeilenhöhe ≈ 22px.
- CTA primär (y 688–710): Rechteck `#E8A33D`, Text `#0E1418` Mono 7px Versalien Tracking 0.2em, Padding ≈ 28/14 (Quelltext), Radius 0.
- CTA sekundär (y 718–742): Gradient-Border-Wrapper (Quelltext 1px Padding, Verlauf `#F4F1E9` 30 % → 5 % → transparent), Innenfläche dunkel, Text weiß Mono 7px + Pfeil.
- Fußzeile (y 776): „PAN 07 · BITTERN STAGE“ links, „SATURATION 0.74“ rechts, Mono 6px `#6E6E64`.

### 1.4 System-Overlays (unten rechts)
- FPS-Pill (x 1210–1268, y 726–746): `#2A1A1A` Fläche, Border 1px `#7A2E2E`, Text „2 FPS“ 11px `#FF8A8A`, Radius 999px.
- Toast (x 1010–1270, y 758–792): `#2B1B1B`, Radius 8px, Text 10px `#FFD0D0`, zwei Zeilen rechtsbündig. Warnfarbe = gedämpftes Rot auf dunklem Rotgrund, nicht Vollrot.

---

## 2. `02-detail-desktop.png` — Systema-Detail mit Inspector, Desktop

### 2.1 Werkzeugleiste (y 0–40)
- Höhe 40px, Page `#0A0A0A`. Links Zahnrad-Icon 14px `#8A8A90`; Avatar ⌀ 20px; Titel „Systema Core — Digital Architecture Studio“ 12px `#E0E0E0`; „by @aksonvady“ 12px Bold weiß + blaues Verified-Badge ⌀ 12px `#3B82F6`. Danach Zähler „☆ 9 · ▢ 4 · 👁 173“ 11px `#8A8A90`, Trenner „·“.
- Icon-Buttons: 26×26 Kreise, Fläche `#1C1C1F`, Border 1px `rgba(255,255,255,0.10)`, Icon 12px `#C8C8C8`. Paare `‹ ›` (x 520–570) und Edit/Grid (x 620–668); ganz rechts Panel-Toggle (x 1250). Abstände 8px innerhalb Paar, 48px zwischen Gruppen.
- Warum: Kreis-Icon-Buttons + Pill-Sprache konsistent mit Homepage. Fehler: Touchziel 26px, unter 44px.

### 2.2 Preview-Bühne (x 8–830, y 44–792)
- Iframe-Viewport ≈ 822×748, Radius 6px, Page `#000000`. Inhalt: „S/C“ 16px weiß (y 75); Coral-Kreisbutton ⌀ 46px `#FF7A6E` mit 2 weißen Strichen 16px (x 764–810, y 62–108), kein Schatten.
- Eckmarken: L-Winkel 1px `#5A5A5A`, Schenkel ≈ 12px, an (28,118), (802,118), (28,752), (802,752). Innenabstand 20px vom Iframe-Rand.
- Headline: Zeile 1 abgeschnitten (nur Buchstaben-Unterlängen sichtbar y 195–212, Reveal pausiert — unlesbar); Zeile 2 „architectures,“ Serif Playfair 400 ≈ 52px Coral `#FF7A6E`, Zeilenhöhe ≈ 1.1, x 28.
- Unten (y 705–770): riesiger Schriftzug „CORE“ Serif ≈ 130px, angeschnitten durch Unterkante; Füllung Blau-Grau-Foto-Textur (`background-clip:text` mit Bild oder Verlauf `#2B4A6A` → `#5A6E80`), Opazität ≈ 0.6. Dekorativ, nicht H1 (REPORT §6).
- Scrollbar rechts (x 832–840) hell `#D0D0D0` – Iframe-Scrollbar.
- Remix-Toast (x 590–830, y 728–780): Weißes Panel Radius 8px, Schatten `0 8px 24px rgba(0,0,0,0.4)`, Thumbnail 48×36 Radius 4 mit 1px Border, Titel 12px Bold `#111`, „by @aksonvady“ 10px `#6E6E74`.

### 2.3 Inspector (x 852–1258, y 44–792)
Alle Karten: Fläche `#FFFFFF`, Radius 10px, kein Border, Schatten kaum sichtbar (`0 1px 2px rgba(0,0,0,0.3)` geschätzt), Gap 12px, Innenpadding 16px. Hülle dahinter `#0A0A0A`. Kontrastprinzip: weiße Analyse auf schwarzer Hülle vs. dunkles Designobjekt.

**Typografiekarte (y 44–310):**
- Action-Pills oben (y 50–72): `#2A2A2E` Fläche, Radius 999px, Höhe 22px, Icon 12px + Text 11px weiß Medium; Reihenfolge „DESIGN.md · Save Skill · Copy · Save Typography“, Gap 6px. Darunter zwei graue Punkte ⌀ 10px `#B0B0B0` (Pager/Status, unlesbar Funktion).
- Zweispaltig: links 58 % weiß, rechts 42 % Sand `#F1EDE8`. Titel „Typography“ Serif Playfair ≈ 20px `#111`. Zwei Spalten „Heading system“ / „Body system“ Sans 12px Bold `#111`; Spezifikation 12px `#6E6E74`, Zeilenhöhe 1.5 („Playfair Display + Caveat · 160px / 500 / 160px / -0.05em“ — Quelltext widerlegt 160px, siehe REPORT §6).
- Große Probe (y 232–295): „Playfair Display + Caveat“ Serif ≈ 30px Bold + Handschrift 28px.
- Rechte Sandspalte: Alphabet „Aa Bb …“ in Caveat 12px, 6 Spalten, rechtsbündig, Zeilenabstand 17px; „Numbers“ Sans 12px Bold; Ziffern „01 … 09“ Caveat 11px.

**Farbkarte (y 320–636):**
- 2×2 Swatches, je 178×142px, Gap 10px, Radius 0. Oben 70 % Vollfarbe mit Rolle links („Primary“ Sans 11px Bold) und Hex rechts (Mono 10px Bold), beides in Dunkel `#111` auf Farbe. Unten 30 %: Tonwertreihe 10 Stufen, 5 heller (Tint) links, 5 dunkler (Shade) rechts, je 17.8px breit.
- Farben: Primary `#FF7A6E` (Coral), Secondary `#E7E7E7`, Tertiary `#FFE278` (Gelb), Neutral `#E7E7E7`. Secondary = Neutral (Duplikat → Extraktions-Slop).
- Warum: Swatch groß + Stufenreihe ist lesbarer als Hex-Liste. Fehler: Gelb ist im Preview nirgends zu sehen; Rolle ungeprüft.

**Overview-Karte (y 646–792, angeschnitten):**
- Titel-Zeile: Fingerabdruck-Icon in Kreis ⌀ 20px `#F0F0F0` + „Overview“ 12px Bold; rechts „Grid“ 11px `#8A8A90`.
- Spec-Tiles 2 Spalten: Fläche `#F5F5F5`, Border 1px `#E5E5E5`, Radius 8px, Padding 12px; Label Mono 9px Versalien `#6E6E74` Tracking 0.1em; Wert 12px Bold `#111`. Werte: LAYOUT Grid, CONTENT WIDTH Full Bleed, FRAMING Open, (GRID) Strong.

---

## 3. `03-home-mobile.png` — Homepage, Mobile 390×844

- Auth-Säule wird erste vollbreite Karte: x 8–367 (359px), y 8–605, Radius 6px, gleicher Verlauf `#1D1D20` → `#171719`, Border 1px `rgba(255,255,255,0.08)`. Zweite Karte (Galerie, leer wegen 0 FPS — unlesbar) beginnt y 613 mit 8px Gap, Fläche `#0E0E10`.
- Page-Hintergrund `#0B0B0C` mit sehr feiner Diagonalschraffur sichtbar am linken Rand (x 0–8): `repeating-linear-gradient(135deg, …)` 1px/≈ 6px — hier auf Body, nicht nur in Systema.
- Innenpadding 18px (x 26). Wortmarke y 34 (Glyphe 14px + „NEUFORM“ 11px Tracking 0.3em `#B8B8B8`).
- Eyebrow y 75, Mono 10.5px Blau `#7F98FF` (mobil kräftiger als Desktop, gemessen), Tracking 0.18em.
- H1 y 95–205: DM Sans 300 ≈ 38px / 38px, drei Zeilen weiß — mobil größer als Desktop (32.6px), Body bleibt ≈ 15px/25px `#B5AFA4`.
- Proof y 312–345: Avatare ⌀ 34px, Überlappung -12px, Ring 2px; „31.1K users are building“ 13px; Mono-Zeile 10px `#7C7C82`.
- CTA y 385–430: Pill 45px hoch, `#F4F1EA`, Google-G 18px, Label 14px Medium `#141414`, Pfeilscheibe ⌀ 32px `#DEDBD4`. Volle Breite 322px.
- OR y 450, Labels y 477 (EMAIL links, FORGOT rechts), Input y 493–535 (42px, Pill, Border 1px 10 %, Placeholder 14px `#6E6E74`).
- Trennlinie y 560 1px `rgba(255,255,255,0.08)`, Footer-Links y 580 Mono 10px Tracking 0.2em `#6E6E74`, Gap 14px, „2026“ rechts.
- Vertikal-Rhythmus: Eyebrow→H1 12, H1→Body 18, Body→Proof 28, Proof→CTA 40, CTA→OR 20, OR→Labels 18, Labels→Input 12, Input→Linie 26, Linie→Footer 18. Grundmaß 4px, Sprünge 12/18/28/40.
- FPS-Pill unten rechts (x 320–378, y 810–834): `#1E1E22`, Radius 999, „0 FPS“ 11px weiß — Systemoverlay.
- Mobile-Lehre: Säule wird nicht sticky, sondern erste Karte; Hierarchie bleibt, Galerie rutscht nach unten. Kein Hamburger, keine Top-Nav. Footer-Links 10px sind zu klein für Touch.

---

## 4. `04-detail-mobile.png` — Systema Inspector, Mobile 390×844

- Toolbar y 0–40: Page `#0A0A0A`. Logo-Glyphe 14px links (x 18); zwei Kreisbuttons ⌀ 24 `#1C1C1F` Border 1px 12 % (`‹ ›`, x 34–86); Mitte Edit + Grid Kreisbuttons (x 172–222); rechts Panel-Toggle (x 360). Titel entfällt.
- Inspector vollbreit x 8–367, Karten Radius 10px weiß, Gap 8px.
- Typografiekarte y 40–388: Action-Pills überlappen (y 52–72): „DESIGN.md“ (x 19–112), „Save Skill“ (x 122–214) liegt ÜBER „Copy“, „Save Typography“ (x 222–340). Pill 22px hoch, `#2A2A2E`, Text 11px weiß, Schatten `0 2px 6px rgba(0,0,0,0.4)`. Fehler: Aktionen nicht umgebrochen → Überlagerung.
- Zweispaltig 52 %/48 %: links weiß, rechts Sand `#F1EDE8` volle Kartenhöhe. Titel „Typography“ Serif 20px; Spec-Spalten 12px Bold / 12px `#6E6E74`; Spec bricht sechszeilig um (ungünstig). Große Probe „Playfair Display + Caveat“ 3 Zeilen ≈ 30px.
- Alphabet rechts Caveat 12px, 6 Spalten rechtsbündig; „Numbers“ + Ziffern.
- Farbkarte y 397–712: 2×2 Swatches 155×142, Gap 10px, Oben Vollfarbe 70 % + Rolle/Hex, unten 10-stufige Tonwertreihe. Identische Werte wie Desktop.
- Overview y 720–844 angeschnitten: Icon-Kreis + „Overview“ 12px Bold, rechts „Grid“; Spec-Tiles 2 Spalten `#F5F5F5` Border `#E5E5E5` Radius 8.
- FPS-Pill (x 320–378, y 770–790) rot `#2A1A1A`/`#FF8A8A` „2 FPS“; Toast y 800–834 `#2B1B1B` Radius 8, Text 10px `#FFD0D0`.
- Mobile-Lehre: Preview verschwindet komplett (Toggle rechts oben vermutlich Wechsel — unlesbar). Karten-Stack 1 Spalte, Swatches bleiben 2 Spalten.

---

## 5. `05-forgot-mobile.png` — Passwort vergessen, Mobile 390×844

- Page `#050507` → nahezu Schwarz. Halo hinter der Karte (x 20–290, y 130–200): weicher Blob `rgba(120,130,170,0.18)`, Blur ≈ 60px, leicht nach oben-links versetzt. Bau: Pseudo-Element `::before` mit `radial-gradient`/`filter: blur(60px)`, `z-index:-1`.
- Karte x 14–376 (362px), y 196–648, Radius 14px (größer als Home-6px), Border 1px `rgba(255,255,255,0.10)`, Fläche `#0E0E11` fast page-gleich, Verlauf oben leicht heller. Innenpadding 22px (x 28).
- Kopfzeile y 221: Glyphe + „NEUFORM“ 11px `#B8B8B8` Tracking 0.3em; rechts Close-Kreis ⌀ 32 `#1A1A1E` Border 1px 12 %, „×“ 14px weiß.
- Eyebrow y 260 „PASSWORD RESET“ Mono 11px Blau `#7F98FF` Tracking 0.18em.
- H1 y 280–340: DM Sans 300 ≈ 32px / 32px, zwei Zeilen weiß; Wort „Neuform“ Serif Italic (Playfair/Instrument-Serif-Typ) ≈ 34px in Blau `#8FA4FF`. Farb-/Schriftwechsel innerhalb der Headline als Brand-Betonung.
- Body y 355–420: 15px / 25px `#B5AFA4`, 3 Zeilen.
- Label „EMAIL“ y 476 Mono 10.5px `#8A8A90` Tracking 0.2em; Input y 493–533 Pill 40px, Border 1px 10 %, Placeholder 14px `#6E6E74`.
- Primary-Button y 545–586: Pill 41px, Fläche `#5B63F0` (Blau-Violett, satt), Text „Send reset link“ 14px Semi-Bold weiß zentriert. Volle Breite. Kein Icon, kein Pfeil.
- Trennlinie y 607 1px 8 %, Footer y 626 Mono 10px `#6E6E74`: „HOME LOGIN TERMS PRIVACY“ + „2026“ rechts.
- Rhythmus: Kopf→Eyebrow 28, Eyebrow→H1 12, H1→Body 14, Body→Label 44, Label→Input 10, Input→Button 8, Button→Linie 20, Linie→Footer 18.
- Warum es funktioniert: hellster Fleck = Button, zweithellster = H1; Halo gibt Tiefe ohne Schatten. Fehler: Blau-Button vs. Blau-Eyebrow vs. Blau-Serif-Wort — drei Blautöne (`#7F98FF`, `#8FA4FF`, `#5B63F0`) auf einer Karte.

---

## 6. `06-saltworks-desktop.png` — Saltworks Bibliotheksansicht, Desktop

### 6.1 Toolbar (y 0–40)
Identisch zu 02: Avatar ⌀ 20 mit „V“, Titel „SALTWORKS · Bittern crystal harvest by @vanh“ 12px, Verified-Badge, Zähler „6 · 4 · 140“, Kreisbuttons 26px.

### 6.2 Preview (x 8–830, y 44–792)
- Hintergrund Verlauf links `#0A1013` → rechts `#0E1418` (Quelltext), Trennlinie 1px `rgba(244,241,233,0.10)` bei x 441. Rechte Hälfte leer (Reveal pausiert, Text unsichtbar — unlesbar); einzige Spur: 1px Linie x 490–796 bei y 386 (vermutlich `dt/dd`-Trenner `rgba(244,241,233,0.10)`).
- Canvas links (x 8–441): ≈ 45 Kristalle, jeder 3–4 konzentrische Quadrate, Stroke 1px `rgba(244,241,233,0.55–0.85)`, gemeinsam gedreht (Winkel variiert 0–45°). Größen 12–90px. Zusätzlich einzelne gefüllte kleine Quadrate ⌀ 6px `#3A3F3E` (Keime). Sehr schwache bernsteinfarbene Aufhellung oben rechts (gemessen `#10161A` vs `#0A1013`). Unten weicher Fade zu Schwarz (y 720–792).
- Bau: `<canvas aria-hidden>` mit `strokeRect` ×4 unter `ctx.rotate()`; statischer Ersatz als SVG `<g transform="translate() rotate()"><rect .../></g>` × 4 mit `fill:none; stroke:#F4F1E9; stroke-opacity:.6`. Fade als `::after` mit `linear-gradient(transparent, #0A1013)`.
- Warum: Motiv = Kristallwachstum = Produktmechanik. Kein Partikelnebel.

### 6.3 Inspector (x 852–1258)
- Typografiekarte y 44–268: Pills „DESIGN.md · Save Skill“. Titel „Typography“ Serif Newsreader 18px. Spec in Mono (IBM Plex Mono) 11px `#6E6E74`: „Newsreader · 48px / 300 / 48px / -0.025em“, „IBM Plex Mono · 14px / 400 / 22.75px“. Große Probe „Newsreader“ Serif 32px. Rechte Sandspalte `#F1EDE8`: „Letters“ Sans 11px Bold rechtsbündig, Alphabet Serif 12px 5–6 Spalten, „Numbers“ + Ziffern Serif.
- Farbkarte y 278–592: Primary `#E8A33D` (Amber) mit Tooltip-Pill „#2E210C“ (dunkler Shade, Hover-Zustand: schwarze Pill Radius 6 weiß 11px Bold); Secondary `#F4F1E9`; Tertiary `#BBEF40` (Lime — im Preview nirgends, Slop); Neutral `#F4F1E9`. Rolle in Mono 11px Bold. Action-Pills „Copy · Save Colors“ oben rechts über der Karte (y 288–306).
- Overview y 602–792: „Overview“ Mono 12px Bold; Tiles LAYOUT Grid, CONTENT WIDTH Full Bleed, FRAMING Framed, GRID Strong. Inspector-Labels in Mono, weil das Body-System Mono ist — Inspector übernimmt Schriftfamilie der Vorlage.
- FPS-Pill + Toast identisch zu 01/02.

---

## 7. Gemeinsamkeiten im Paket

1. **Dunkle Hülle, helle Handlung.** Page `#0A0A0C`–`#0B0B0C`, Surface `#171719`–`#1D1D20`, hellster Fleck ist immer der einzige Primär-CTA (01 `#F4F1EA`, 05 `#5B63F0`).
2. **Pill-Sprache für alles Interaktive** (CTA, Input, Icon-Kreis, Action-Pills, FPS-Pill): Radius 999px. Container dagegen 6px (Home) / 10px (Inspector) / 14px (Auth-Karte 05).
3. **Mono-Versalien mit 0.15–0.3em Tracking** für jedes Label, Eyebrow, Footer, Datenzeile; 9–11px. Sans 300 für H1, Serif nur in Vorlagen und Inspector-Titeln.
4. **Warmgrau-Body `#B5AFA4`** auf kaltem Neutral — einzige Wärme im Interface, macht Text lesbar ohne Weiß.
5. **Blau `#7F98FF`/`#9DB1FF` = Label-Accent**, nicht Button-Accent (Ausnahme 05). Coral/Amber gehören den Vorlagen.
6. **1px-Borders in 6–12 % Weiß** statt Schatten; Schatten nur bei schwebenden Overlays (Toast, Remix-Panel, Pills über Karte).
7. **Eckmarken + Schraffur** als „technische Bühne“ (Karte A, B, 02, Page 03).
8. **8px-Gap-Kachelraster**, Außenluft 8px, Innenpadding 18px; 4px-Grundmaß.
9. **Inspector-Format:** weiße Karte, große Schriftprobe, 2×2 Swatch mit 10-Tonwerten, Spec-Tiles mit Mono-Label + Bold-Wert.

## 8. Farblogik als Rollentabelle (Interface, nicht Vorlagen)

| Rolle | Hex | Beleg |
|---|---|---|
| Page | `#0B0B0C` | 01 Außenluft, 03 Rand |
| Page (Auth) | `#050507` | 05 |
| Surface | `#1D1D20` → `#171719` Verlauf | 01/03 Säule (Quelltext) |
| Surface-2 (Input) | `#1B1B1E` | 01 y 472 |
| Raised (Icon-Btn, Pill) | `#1C1C1F` / `#2A2A2E` | 02 Toolbar, 02 Pills |
| Border | `rgba(255,255,255,.06–.12)` | überall |
| Text | `#FFFFFF` | H1 |
| Text-Body | `#B5AFA4` warm | 01/03/05 |
| Muted | `#7C7C82` / `#6E6E74` | Footer, Nachzeilen |
| Accent-Label | `#9DB1FF` (Desktop) / `#7F98FF` (Mobile) | Eyebrows |
| Action-Light | `#F4F1EA`, Text `#141414` | Google-CTA |
| Action-Blue | `#5B63F0` | 05 Button |
| Warn | `#2A1A1A` Fläche, `#FF8A8A` Text | FPS-Pill |
| Inspector Surface | `#FFFFFF`, Sand `#F1EDE8` | 02/04/06 |
| Inspector Tile | `#F5F5F5` Border `#E5E5E5` | Overview |

Vorlagen-Akzente (nur dort): Coral `#FF7A6E` (Systema), Amber `#E8A33D` (Saltworks), Violett-Blau-Orb (Spatial).

## 9. Spacing-Rhythmus
- Grundmaß 4px. Sichtbare Stufen: 8 (Gaps, Außen), 12 (Label→Input), 14–18 (Text-Blöcke, Padding), 20–28 (Sektionen in Säule), 36–44 (vor CTA / vor Formular).
- Zeilenhöhen: H1 ≈ 1.0, Body 1.65, Mono-Labels 1.2.
- Karten: Home 8px Gap, Inspector 12px (Desktop) / 8px (Mobile).

## 10. Dos
- Einen hellen Primär-CTA pro Fläche; alles andere dunkel und 1px-gerahmt.
- Drei-Zonen-CTA: Marken-SVG links, Label links ausgerichtet, Pfeil in eigener Kreisscheibe rechts.
- Mono-Versalien-Labels mit 0.2em Tracking als einzige Auszeichnungsschicht.
- Warmgrau-Body auf kaltem Dunkel.
- Live-Objekt und Analyse räumlich trennen (dunkel/weiß, 2/3 + 1/3).
- Swatch-Karte: Rolle + Hex + 10 Tonstufen, nie Hex-Liste allein.
- Prozessgrafik als Geometrie (Canvas/SVG) statt Stock-Partikel.
- Halo als Blur-Pseudo-Element statt Box-Shadow für Tiefe.

## 11. Don'ts
- Keine 6–8px Mono-Texte als Inhaltsträger (Karte C/D auf Desktop unleserlich).
- Keine drei Blautöne auf einer Karte (05).
- Keine Action-Pills absolut positioniert ohne Umbruch (04 überlappt).
- Keine 24–26px Icon-Buttons als einzige Aktion (Touch-Minimum 44).
- Keine Inspector-Werte (160px H1, Lime `#BBEF40`, Gelb `#FFE278`) ungeprüft als Tokens übernehmen.
- Kein Violett-Blau-Verlaufsball als „Tech-Beweis“ (Karte A).
- Keine Datenliste mobil per `display:none` löschen (Saltworks Quelltext).
- Keine Headline, die bei pausiertem Reveal unsichtbar bleibt (02, 06).

## 12. Unlesbar / nicht belegbar
- 01 Karte D linke Canvas-Hälfte: leer wegen Pause.
- 02 Headline Zeile 1: abgeschnitten.
- 02/04 graue Punkte unter Action-Pills: Funktion unbekannt.
- 03 zweite Karte: Inhalt leer (0 FPS).
- 04 Panel-Toggle-Verhalten: nicht getestet.
- 06 rechte Preview-Hälfte: Text unsichtbar.
- Schraffur-Sichtbarkeit in 01 Karte B: unter Schwelle, nur Quelltext.
- Hover/Fokus-Zustände: außer Swatch-Tooltip (06) keine sichtbar.
