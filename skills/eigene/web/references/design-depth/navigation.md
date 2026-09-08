# Navigation: Header, Nav, Logo-Zone, CTA, Sticky/Floating, Mobile-Menü, Footer

## TLDR

Die Nav ist eine leise Zeile mit drei Zonen (Logo | Links | ein CTA), in der nur der CTA Farbe oder Fläche trägt; alles andere ist Text, Hairline oder Pille.

Belegbasis: 54 Einzelanalysen unter `../studies/design-depth/deep/`. Zahlen sind gemessen (Datei genannt) oder als **Startwert** markiert. Skalen: Analysen messen teils in Bild-px, teils in CSS-px; wo umgerechnet, steht es dabei.

---

## Regeln

### R1. Drei-Zonen-Grid ist die Grundform
- Logo links, Links exakt mittig, ein CTA rechts. `grid-template-columns:1fr auto 1fr` hält die Mittelachse auch bei ungleich breitem Logo und CTA.
- Beleg: `2095874058697293985.md` (Hubmini, media-0.jpg Nav y≈160–265, Höhe 64 px), `2096292759489609818.md` (Nav y≈100–170, Höhe 70 px), `2096944343487852961.md` (HRnXnnKbQAAUnen.jpg y≈65–145, Logo x≈165, Nav x≈550–1195, CTA x≈1403–1578), `2096931638118871502.md` (Vetra, y≈45–105), `2096889729337921598.md` (HRml921acAEzvBx.jpg y 50–110), `2095565814405742911.md` (HRTx4-EacAA8TEU.jpg y40–235), `mobbin-2.md` (Amplemarket 887f98cc y≈8–33).
- Varianten ohne Mittelachse: Links direkt neben dem Logo, Actions per `margin-left:auto` (`2096855995909869867.md` nav.png x178–1825; `refero-1.md` CLOU Links ab x 157).

### R2. Höhe 48–80 px, Marketing höher als App
- Gemessen: 45 px (`mobbin-1.md` Miro), 48 px (`twentyfirst.md` y 0–48; `2096165490498695410.md` Canvas-Topbar), 52 px (`refero-2.md` Linear; `designmd-me-1.md`), 60 px (`refero-1.md` Mercury/Oxide; `2096889729337921598.md`), 64 px (`2095874058697293985.md`; `2096175237109092642.md`; `shadcn.md`), 67 px (`refero-2.md` Attio), 72 px (`2096618423983964587.md` Topbar image-1.jpg y150–270), 78 px (`mobbin-3.md` Airtable), 80 px (`2095488681796854015.md` HRSr1m5bUAAuYh-.jpg y 0–80; `refero-2.md` Gumroad y 0–79).
- Ausreisser: 96 px im Panel (`2095807169346334900.md`), 116 px (`2096944343487852961.md`), 195 px Original (`2095565814405742911.md`, entspricht ≈ 4.9 Body). Das sind Board-Kompositionen mit grosser Luft, keine App-Werte.
- Prior-Corpus-Cap: 64–72 px, Deckel 80 px (`prior_corpus.md`, taste-SKILL.md:247-248).
- Konsens: `refero-2.md` "Nav-Höhen 40 (App) / 52 / 60 / 67 / 80 (Gumroad) — Marketing höher als App."

### R3. Genau ein CTA, und der ist der einzige Farb- oder Flächenfleck oben
- `2096149200178418026.md` (Arcstone): keine Nav-Links, ein Pill-Button oben rechts, media-3.jpg beide Screens.
- `2096931638118871502.md`: Orange-CTA rechts spiegelt Orange-Logo links, Rest ohne Bar-Fläche.
- `twentyfirst.md`: CTA `#1132f5` (Messung 1116–1191/10–38) ist der einzige gesättigte Punkt oben rechts.
- `refero-2.md` Linear: Sign-up `#e2e2e2` als einzige helle Fläche im dunklen Header.
- Sekundär daneben immer als Textlink oder Outline: "Log in" Text + Pill (`2095863741250474026.md`; `2095874058697293985.md`), Outline-Login + Fill-Signup (`mobbin-1.md` Miro: Login Outline x630–662, Sign up blau x668–727).

### R4. Zwei Familien für die Nav-Fläche: Zeile oder schwebende Kapsel
- **Zeile:** volle Breite, opak oder transparent, 0 oder 1 px Hairline unten. Hairline gemessen `#ECECEC` (`2095874058697293985.md`), `#e2e2e2` (`2096618423983964587.md` y≈270), `#EBEBEB` (`2096944343487852961.md`), `#1b1c21` auf Dark (`refero-2.md`).
- **Kapsel:** zentriert, `position:fixed|sticky`, 18–32 px vom Top, Radius 14 px oder 999, Schatten statt Border. Gemessen: 540×60 px Radius 14, `0 8px 24px rgba(0,0,0,.15)` (`2095488681796854015.md` HRSr1nFaYAAjoag.jpg x 330–870 y 36–95); ≈700 px breit, top 24, Radius 999 (`2095797753305612601.md` media-0.jpg y≈115–170); 62 % Breite, 60 px hoch, Radius 12–14, `rgba(15,14,12,.9)` (`2096876701775261945.md` HRmaNBSbUAE_QzN.jpg 285–345); 1160 px max, 96 px hoch (`2096175830624055596.md` HRccl6xawAAtmvV.jpg y≈60–165); Weiss, 1 px `#e5e5e5`, `0 4px 16px rgba(0,0,0,.06)` (`mobbin-2.md` Qatalog 8fb5fbc1 x≈197–570 y≈10–45).
- **Kapsel-Cluster:** Logo-Kreis 40–44 px + Link-Pille + CTA-Pille, Gap 8 px, top 16–18 px (`2096192737867350330.md` second-01.jpg y0–60; `-video-2.md` second-17.jpg y=18–62, Kreis x=536–580, Pille x=587–768).
- Kapsel gehört auf gesättigten Grund oder Foto (`2096175830624055596.md` Blau-Canvas; `2095797753305612601.md` Hero-Foto; `2096876701775261945.md` Himmel).

### R5. Transparente Nav über Foto braucht einen Dunkelverlauf, kein Blur
- `2096149200178418026.md`: Lesbarkeit aus oberem Verlauf ca. `#1A1A1A → transparent` über ≈ 25 % Höhe (media-2.jpg oben).
- `aakib-tiles.md` HRYA2c5acAAMBO-_0 y 100–170: Nav transparent über Berg-Hero, kein Blur, Text Weiss ≈ 85 %.
- `2096855995909869867.md`: kein Border, kein Hintergrund, kein Blur, Nav sitzt auf Punktraster.
- `prior_corpus.md` (unslop-react-design.md:9,61): `position:fixed` + `backdrop-filter` ist ein Slop-Default; Blur nur, wenn wirklich Inhalt darunter scrollt.

### R6. Aktiver Link: Helligkeit, Pille oder 1-px-Unterstrich, nie Akzentbalken
- Helligkeit: aktiv `#262626`, andere `#7A7A7A` (`2095874058697293985.md`); aktiv `#f2f2f2`, Rest `#a8a8a8` (`2096931638118871502.md`); aktiv `#fff`, Rest `#8a8a8a` (`2096876701775261945.md`).
- Gefüllte Pille auf Dark: `#1c1c1c`/`#232323`, Padding 8–10/16, Radius 999 (`2096175237109092642.md` frame-29.jpg "Mono Charts" x415–515; `layers.md` Kapsel x430–920 y45–92 mit `rgba(255,255,255,.08)`); Mercury Trigger `#505874` (`refero-1.md` x310–410 y53–87); Gumroad schwarze Pille (`refero-2.md` About x 994–1078).
- 1-px-Unterstrich mit 3–4 px Offset auf hellem Canvas (`refero-1.md` CLOU Info x235–262 y38, On Shop x459 y37, Acne x200–289 y62). Lime-Underline 2 px als Sonderfall (`open_design.md` atelier-tokens.png y≈57).
- Konsens `refero-1.md`: "Nav-Aktivzustand = Unterstrich (hell) oder gefüllte Pille (dunkel)."

### R7. Nav-Text ist Muted, 12–15 px Sans; Versalien nur mit Tracking und maximal 5 Links
- 14 px `#7A7A7A` (`2095874058697293985.md`); 14 px Weiss 60 % (`twentyfirst.md`); 13 px `#8a8a8a` (`2096175237109092642.md`); 15 px `#3a3a3a` (`2096855995909869867.md`); 12–13 px `#8b8c8e` (`refero-2.md` Linear).
- Versalien: 12–13 px, Tracking +0.04em, `#353535` (`2095488681796854015.md` DOCS BLOG PRICING ABOUT US); Mono 12 px Uppercase +0.05em (`refero-1.md` Oxide); 11 px Uppercase (`refero-1.md` Acne).
- Warnung `2095488681796854015.md`: "Versalien-Nav bei mehr als 5 Links wird unruhig."
- Ausreisser 22 px in Board-Kompositionen (`2095807169346334900.md`, `2096931638118871502.md`, `2096889729337921598.md`) skalieren mit Body 20–22 px, Verhältnis bleibt ≈ 1.0–1.1 Body.

### R8. Dropdown-Trigger tragen einen kleinen Chevron; Mega-Menü ist ein Liniengrid
- Chevron 8–14 px, 8 px rechts vom Label (`2096944343487852961.md`; `2095807169346334900.md`; `mobbin-1.md`; `mobbin-3.md` 4 px Chevron).
- Mega-Menü: Weiss, 1 px `#e5e5e5`, Radius 8, `0 4px 12px rgba(0,0,0,.05)`, Grid 2fr/1fr mit 1-px-Trenner (`twentyfirst.md` 18191-preview.png Panel x 265–1675 y 505–1065). Dunkel: Intro 1/3 + 2×2 Zellen mit 1-px-Linien (`refero-1.md` Mercury 13c48a4c Linien x373/747, y318).
- Menü-Item: ganzer Link, 12 px Padding, Icon 20 + Semibold-Titel, 14 px Muted-Beschreibung, 2-Zeilen-Clamp (`twentyfirst.md` Items x 310–1150 y 590–1010).
- Trigger geöffnet: gefüllte Pille + Chevron rotiert 180° (`refero-1.md`).

### R9. Logo-Zone: Wortmarke oder 24–44 px Kachel/Kreis, Marken-Radius 6–10
- Dunkles Quadrat 28–32 px Radius 6–8 (`aakib-tiles.md` Launchkit 32 px Radius 8; Nexora `#1A1A1A`), 20 px Radius 4 (`2095863741250474026.md`), 24 px Radius 6 Blau (`designmd-me-1.md`), 30 px Lime Radius 8 (`2096891182701793331.md`), 36 px Radius 10 (`open_design.md`), 40 px Radius 10 Orange (`2096931638118871502.md` gesampelt 160,75), 44 px Radius 10 (`2095807169346334900.md`).
- Kreis: Orange Ø 28 mit Asterisk (`2095874058697293985.md`); Weiss 40–44 px als Nav-Objekt (`2096192737867350330*.md`).
- Serif-Wortmarke gegen Sans-Nav als einziger Stilkontrast (`2096855995909869867.md` "Stellar" ≈ 27 px @1440; `2096953356086313312.md` Asterisk + Serif Bold 22 px).
- Kachel-Grösse ist Systemgrösse: Logo 44, Sidebar-Logo 40, KPI-Icons 36 als eine Glyph-Familie (`2096944343487852961.md`).

### R10. Announcement-Bar über der Nav: 38–52 px, Tonwert statt Farbe
- 40 px `#F3F3F3` (`mobbin-3.md` Airtable y 0–22 Bild ≈ 40 real), 38 px violett-tonig (`refero-1.md` Mercury y 0–38), 44–52 px Lime-Tint (`open_design.md` y 0–44; mobile 52 px).
- Kosten: verschiebt die Fold um 38 px, Marketing-Rauschen über Primärnav (`designmd-me-1.md` Slop-Notiz).

### R11. Mobile-Menü: Burger in 40-px-Box wird X, Panel als Overlay oder Drawer
- Burger 40×40, 1 px `#D4D4D4`, Radius 10; Panel `inset:120px 12px 12px`, Radius 16, Schatten, Gruppenlabel 11 px Uppercase +0.12em, Einträge 17 px, Zeile 42 px, 1 px `#EAEAEA` (`open_design.md` mobile-menu.png Panel x10–380 y125–844, X-Button x220–260 y67–107).
- Drawer rechts 62 vw, Weiss, harte Kante ohne Schatten, Hierarchie über 26 px vs 15 px (`refero-1.md` On 35affe14 Panel x427–1120).
- Mobile-Header-Grid `40px 1fr 40px`: Logo-Quadrat, Such-Pille volle Breite, Burger-Quadrat (`layers.md` home-mobile.png y52–94).
- Hamburger als Kreis mit Dot (`designmd-me-1.md` anthropic-mobile-state2.png 62×62 Kreis), als Coral-Disc Ø 24 (`neuform-1.md`), als Menü-Disc 36 px am unteren Rand (`2096634909263646898.md`).
- Gilt als dünn belegt: nur 5 Quellen zeigen Mobile-Nav. Kein Bottom-Tab-Bar im Corpus.

### R12. Footer: Brand-Spalte breit, 2–5 Linkspalten schmal, Bottom-Bar mit Hairline
- Grid 5:1:1:1:1, Gap 24, Padding `3rem 4% 4rem`, `#f7f7f7` (`2096891319843164276.md` image-1 Spaltenstart x=50/637/777/918/1058).
- Grid 1.2fr 1fr 1fr 1fr, Spaltentitel Orange über 1-px-Linie, Links 14 px, Zeile 40 px, Bottom-Bar Copyright links + 2 Links rechts (`2095874058697293985.md` r_cta-Crop y≈548–790, y≈872–950).
- Dark: `#1C1C1E`, Radius 40 oben, 4 Spalten ab x≈688, Titel 13 px `#D0D0D0`, Links 13 px `#8A8A8A`, Zeile 28 px, Hairline `#3A3A3C`, Legal zentriert 12 px (`2095797753305612601.md` media-3 y≈1255–2000).
- Linear: `1fr repeat(5,minmax(96px,auto))`, `border-top:1px solid #1b1c21`, Fill `#070b0e` dunkler als Page (`refero-2.md` tile-3).
- Vollfarbe Ultramarin `#3238ff` mit Mono-Versalien und Strich-Listen `— ABOUT` (`2096292759489609818.md` y 2200–2560; `aakib-tiles.md` HRYAn81bIAAztkn_3).
- Mono-Versalien als Footer-Systemschrift: 10–11 px, Tracking 0.06–0.2em (`2096891319843164276.md`; `neuform-1.md` y 768; `2096292759489609818.md`).

### R13. Riesenwortmarke im Footer ist ein Stilmerkmal der Template-Familie, nicht Pflicht
- Ton-in-Ton `#2A2A2C` auf `#1C1C1E`, ≈330 px Kapitalhöhe, `clamp(200px,28vw,420px)` (`2095797753305612601.md`); Serif ≈260 px Weiss 85 % über Foto (`aakib-tiles.md` Nexora/Motivra); Sans Bold ≈150 px `#1F1F1F` auf `#000` (`aakib-tiles.md` Launchkit).
- Kosten: ~400 px reine Deko (`2095797753305612601.md`).

### R14. Footer-Links dürfen nicht umbrechen
- "Resea rch"-Umbruch bei zu schmaler Spalte in zwei Boards (`2095863741250474026.md`; `aakib-tiles.md` Nexora + Motivra). Fix: Spalten mit `auto` oder `minmax(96px,auto)` und `white-space:nowrap`.

### R15. Sticky nur mit Funktion; Anker unter fixiertem Header brauchen scroll-margin
- `prior_corpus.md`: `position:sticky;top:0` nur bei Anker-Nav oder Warenkorb.
- `open_design.md` mobile-faq.png: Text "94.6K+ Sterne" y125 wird von Glas-Kapsel überdeckt, `scroll-margin-top` fehlt.
- Belegte Sticky-Fälle: Qatalog-Pille überlappt Seitentitel (`mobbin-2.md`, "Sticky wahrscheinlich, nicht belegt"); Wizard-Nav bleibt fix, nur Step-Container animiert (`2096192737867350330-video-1.md` second-02…16).

### R16. Im Funnel verschwindet der Nav-CTA
- Landing: drei Pillen (Logo, Links, "Start a project"); im Wizard: zwei (`2096192737867350330-video-1.md` second-01.jpg vs second-02.jpg x536–768).
- Checkout: kein Menü, nur Logo + "Secure checkout"-Pille mit Schloss (`2096929195381457078.md` image-1.jpg y115–150, Pille x1242–1382).
- Booking-Seiten: nur Wortmarke, kein Nav (`mobbin-1.md` Zoom; `mobbin-2.md` Apollo zentriert y≈45).

### R17. App-Shell: Sidebar 200–300 px, Item 30–48 px, Aktiv als Tonwertfläche, Topbar 40–84 px
- Breiten: 122 px (`mobbin-1.md`), 170 px (`refero-1.md` Rox), 212 px (`2096832279775486079.md`), 245 px (`refero-2.md` Mocha), 255 px (`2096944343487852961.md`), 300 px (`2096215770783199316.md`; `2096891182701793331.md`), 330 px (`2096889729337921598.md`).
- Item-Höhen: 30 px (`refero-2.md`; `shadcn.md` h-[30px]), 39 px (`2096944343487852961.md`), 40–43 px (`2096891182701793331.md`; `2096832279775486079.md`), 46 px (`2096889729337921598.md`), 48 px (`2096215770783199316.md`).
- Aktiv-Zustand: `#F3F3F5` Radius 8 (`2096215770783199316.md` Dashboard y245–290); `#ebebeb` (`2096660897628668066.md` y 437–512); Weiss + 1 px Border + `0 1px 2px rgba(0,0,0,.06)` Radius 8–10 auf grauer Sidebar (`2096944343487852961.md` x≈222–443 y≈993–1032; `2096889729337921598.md`; `2096175830624055596.md`); Dark `#1B1B1B` Radius 14 (`2096499167225078020.md` y=415–495); Raised + orangenes Icon (`2096832279775486079.md`); Lime-Icon + `#171C23` (`2096891182701793331.md`).
- Gruppenlabel: 12 px Uppercase, Tracking +0.06 bis +0.12em, Muted (`2096215770783199316.md` TEAMS y805; `2096499167225078020.md` GENERAL y=375).
- Badge: roter 22-px-Kreis (`2096215770783199316.md` x360–385 y700–725) oder Raised-Grau-Pille statt Akzent (`2096499167225078020.md` 842 x=413–483).
- Sidebar-Footer per `margin-top:auto` (`2096215770783199316.md` y1420–1500).
- Topbar: 40 px App (`refero-2.md` Mocha), 48 px (`2096165490498695410.md`), 64 px (`gap-marcelkargul.md`), 72 px (`2096618423983964587.md`), 84 px (`2096215770783199316.md`). Breadcrumb 14–18 px, Eltern Muted, letztes Glied 500–600 (`2096891182701793331.md` y 63 x 555-970; `2096944343487852961.md`; `2096660897628668066.md` y 262).

---

## Bauanleitungen

Alle Snippets eigene Umsetzung. Werte mit Quellenverweis sind gemessen, Rest ist Startwert.

### B1. Drei-Zonen-Header (Zeile, hell)

```html
<header class="nav">
  <a class="nav__brand" href="/"><span class="nav__mark" aria-hidden="true"></span>Marke</a>
  <nav class="nav__links" aria-label="Hauptnavigation">
    <a href="/produkt" aria-current="page">Produkt</a>
    <a href="/preise">Preise</a>
    <a href="/kunden">Kunden</a>
    <button aria-haspopup="true" aria-expanded="false">Ressourcen <svg class="chev" width="10" height="10" viewBox="0 0 10 10"><path d="M2 3.5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button>
  </nav>
  <div class="nav__actions">
    <a class="nav__login" href="/login">Login</a>
    <a class="btn btn--primary" href="/start">Kostenlos starten</a>
  </div>
</header>
```

```css
.nav{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;
  height:64px;padding:0 40px;border-bottom:1px solid #ECECEC;background:#fff}
/* 64 px + #ECECEC: 2095874058697293985.md; Padding 40 px: 2095863741250474026.md */
.nav__brand{display:flex;align-items:center;gap:10px;font-weight:600;font-size:18px;color:#171717}
.nav__mark{width:28px;height:28px;border-radius:6px;background:#1a1a1a}
/* 28 px Radius 6: aakib-tiles.md */
.nav__links{display:flex;gap:28px;font-size:14px;color:#7A7A7A}
/* Gap 28, 14 px, #7A7A7A: 2095874058697293985.md */
.nav__links a[aria-current]{color:#262626}
.nav__links button{all:unset;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
.nav__actions{justify-self:end;display:flex;align-items:center;gap:20px}
.nav__login{font-size:14px;font-weight:500;color:#171717}
.btn--primary{height:36px;padding:0 16px;border-radius:999px;background:#111;color:#fff;
  font:500 14px/1 inherit;display:inline-flex;align-items:center}
/* Höhe 36 Startwert; Pill weiss auf Foto ~32 px: 2095863741250474026.md */
```

### B2. Transparente Nav über Foto-Hero mit Dunkelverlauf

```html
<section class="hero">
  <div class="hero__scrim" aria-hidden="true"></div>
  <header class="nav nav--overlay">…wie B1, ohne Border…</header>
  …
</section>
```

```css
.hero{position:relative;min-height:80vh;background:url(hero.jpg) center/cover}
.hero__scrim{position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(180deg,rgba(0,0,0,.55),transparent 30%)}
/* Verlauf ~#1A1A1A → transparent über 25 % Höhe: 2096149200178418026.md */
.nav--overlay{position:absolute;inset:0 0 auto;background:none;border:0;color:#fff;
  padding:20px 56px}
/* Padding 20/56: aakib-tiles.md HRYA2c5acAAMBO-_0 */
.nav--overlay .nav__links{color:rgba(255,255,255,.85)}
.nav--overlay .btn--primary{background:#fff;color:#111}
/* Weisse Pille als einziger heller Klickblock: aakib-tiles.md, 2095863741250474026.md */
```

### B3. Schwebende Nav-Kapsel

```html
<header class="capsule">
  <a class="capsule__logo" href="/" aria-label="Start"><svg width="18" height="18">…</svg></a>
  <nav class="capsule__links"><a href="#work">Work</a><a href="#pricing">Pricing</a><a href="#contact">Contact</a></nav>
  <a class="capsule__cta" href="/start">Projekt starten</a>
</header>
```

```css
.capsule{position:sticky;top:24px;z-index:10;width:max-content;margin:0 auto;
  display:flex;align-items:center;gap:32px;padding:7px 7px 7px 20px;
  border-radius:999px;background:#fff;box-shadow:0 8px 24px rgba(0,0,0,.08)}
/* top 24, Inset 7/20, Schatten .08: 2095797753305612601.md media-0.jpg; Gap 32 gemessen */
.capsule__links{display:flex;gap:24px;font:500 14px/1 inherit;color:#5a5a5a}
/* 14 px 500, #5a5a5a–#666: 2096192737867350330*.md */
.capsule__cta{height:40px;padding:0 20px;border-radius:999px;background:#F04E12;color:#fff;
  display:inline-flex;align-items:center;font:500 13px/1 inherit}
/* 40 px, Orange: 2095797753305612601.md */
/* Dark-Variante: background:rgba(15,14,12,.9);border-radius:14px;height:60px
   → 2096876701775261945.md; Weiss + 1px #e5e5e5 + 0 4px 16px rgba(0,0,0,.06) → mobbin-2.md */
```

### B4. Kapsel-Cluster (Logo-Kreis + Link-Pille + CTA-Pille)

```css
.cluster{position:fixed;top:18px;left:50%;transform:translateX(-50%);display:flex;gap:8px;z-index:10}
.cluster .logo{width:44px;height:44px;border-radius:50%;background:#fff;display:grid;place-items:center}
.cluster .pill{height:44px;padding:0 16px;border-radius:999px;background:#fff;
  display:inline-flex;align-items:center;gap:14px;font-size:14px;color:#666}
.cluster .pill--cta{font-weight:600;color:#1a1a1a}
body[data-flow] .cluster .pill--cta{display:none}
/* 44 px, Gap 8, top 18, #666: 2096192737867350330-video-2.md second-17.jpg;
   CTA im Flow entfernt: -video-1.md second-01 vs second-02 */
```

### B5. Aktiver Link als Pille auf Dark

```css
.nav--dark{background:#111;border:0}
.nav--dark .nav__links a{padding:10px 16px;border-radius:999px;color:#9a9a9a;font-size:13px}
.nav--dark .nav__links a[aria-current]{background:#232323;color:#fff}
.nav--dark .icon-btn{width:36px;height:36px;border-radius:50%;background:#232323;display:grid;place-items:center}
/* 2096175237109092642-video-2.md frame-28.jpg: Pille x≈413–518, Icon-Buttons x≈1095–1262 */
.nav--dark .stars{display:inline-flex;gap:8px;height:36px;padding:0 14px;border-radius:999px;background:#232323}
/* GitHub-Star-Zähler als Proof im Header */
```

### B6. Aktiver Link als Unterstrich auf hellem Canvas

```css
.nav--editorial .nav__links a[aria-current]{
  text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1px}
/* 1 px, Offset 3–4 px: refero-1.md CLOU/On/Acne */
```

### B7. Mega-Menü als Liniengrid

```html
<li class="menu">
  <button aria-expanded="true" aria-controls="m-products">Products <svg class="chev">…</svg></button>
  <div class="menu__panel" id="m-products">
    <section class="menu__grid">
      <h3 class="menu__eyebrow">Capabilities</h3>
      <ul>
        <li><a href="/a"><span class="row"><svg width="20" height="20">…</svg>Accordion</span><p>Zwei Zeilen Beschreibung, danach Clamp.</p></a></li>
        …
      </ul>
    </section>
    <section class="menu__feat">…</section>
  </div>
</li>
```

```css
.menu{position:relative}
.menu > button[aria-expanded=true]{background:#f5f5f5;border-radius:6px}
.menu > button[aria-expanded=true] .chev{transform:rotate(180deg)}
.menu__panel{position:absolute;top:calc(100% + 12px);left:0;
  display:grid;grid-template-columns:2fr 1fr;gap:12px;
  width:min(900px,calc(100vw - 32px));padding:16px;background:#fff;
  border:1px solid #e5e5e5;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,.05)}
/* twentyfirst.md 18191-preview.png: Panel Radius 8, 16 px Padding, Divider #e5e5e5 (2284,1500) */
.menu__feat{border-left:1px solid #e5e5e5;padding-left:16px}
.menu__eyebrow{font:600 14px/1 inherit;text-transform:uppercase;letter-spacing:.02em;color:#737373;padding-left:10px}
.menu__grid ul{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:10px;list-style:none;padding:0}
.menu__grid li a{display:block;padding:12px;border-radius:6px;color:inherit;text-decoration:none}
.menu__grid li a:hover,.menu__grid li a:focus-visible{background:#f5f5f5}
.row{display:flex;gap:8px;align-items:center;font-weight:600;letter-spacing:-.01em}
.menu__grid p{margin-top:8px;font-size:14px;line-height:1.375;color:#737373;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.menu__panel[hidden]{display:none}
```

### B8. Mobile-Menü (Burger → X, Overlay-Panel)

```html
<button class="burger" aria-expanded="false" aria-controls="mnav" aria-label="Menü">
  <svg width="18" height="18" viewBox="0 0 18 18"><path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" stroke-width="1.5"/></svg>
</button>
<nav id="mnav" class="mnav" hidden>
  <section>
    <h2>Produkt</h2>
    <p class="mnav__group">Funktionen</p>
    <ul><li><a href="/f1">Editor</a></li><li><a href="/f2">Export</a></li></ul>
  </section>
</nav>
```

```css
.burger{width:40px;height:40px;border:1px solid #D4D4D4;border-radius:10px;background:none;display:grid;place-items:center}
.burger[aria-expanded=true] svg{display:none}
.burger[aria-expanded=true]::before{content:"×";font-size:22px;line-height:1}
.mnav{position:fixed;inset:120px 12px 12px;overflow:auto;background:#fff;border-radius:16px;
  box-shadow:0 12px 40px rgba(0,0,0,.15);padding:16px 0;z-index:20}
.mnav h2{font:500 17px/1 inherit;padding:0 24px 12px}
.mnav__group{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#777;padding:12px 24px 4px}
.mnav li a{display:block;padding:11px 0 11px 24px;border-bottom:1px solid #EAEAEA;font-size:17px;color:#1F1F1F}
/* alle Masse: open_design.md mobile-menu.png Panel x10–380 y125–844 */
[id]{scroll-margin-top:96px}
@media(max-width:480px){[id]{scroll-margin-top:140px}}
/* Anker-Fix: open_design.md mobile-faq.png y125 überdeckt */
@media(max-width:640px){
  .nav{grid-template-columns:40px 1fr 40px;gap:12px;padding:16px}
  .nav__links,.nav__login{display:none}
  /* Mobile-Grid 40/1fr/40: layers.md home-mobile.png y52–94 */
}
```

Drawer-Alternative (`refero-1.md` On): `.drawer{position:fixed;inset:0 0 0 auto;width:62vw;background:#fff;padding:20px 27px;overflow:auto}` mit Kategorien 26 px 500 und Unterpunkten 15 px, ohne Schatten.

### B9. Footer mit Brand-Spalte, Linkspalten, Bottom-Bar

```html
<footer class="ft">
  <div class="ft__grid">
    <div class="ft__brand">
      <a class="nav__brand" href="/"><span class="nav__mark"></span>Marke</a>
      <p>Ein Satz Claim, zwei Zeilen maximal.</p>
      <ul class="ft__social">…</ul>
    </div>
    <nav aria-label="Produkt"><h4>Produkt</h4><ul><li><a href="#">Funktionen</a></li>…</ul></nav>
    <nav aria-label="Unternehmen"><h4>Unternehmen</h4><ul>…</ul></nav>
    <nav aria-label="Rechtliches"><h4>Rechtliches</h4><ul>…</ul></nav>
  </div>
  <div class="ft__legal"><small>© 2026 Marke</small><nav><a href="/datenschutz">Datenschutz</a><a href="/impressum">Impressum</a></nav></div>
</footer>
```

```css
.ft{background:#f7f7f7;padding:48px 4% 64px}
/* #f7f7f7, Padding 3rem 4% 4rem: 2096891319843164276.md */
.ft__grid{display:grid;grid-template-columns:5fr repeat(3,minmax(140px,1fr));gap:24px}
/* 5:1:1:1:1 mit Schritt ≈140 px: 2096891319843164276.md image-1 x=637/777/918/1058 */
.ft__brand p{max-width:32ch;font-size:13px;color:#555;margin:12px 0 16px}
.ft h4{font:500 11px/1 ui-monospace,monospace;letter-spacing:.06em;text-transform:uppercase;color:#191919;margin-bottom:36px}
/* Mono-Versalien 0.9 Body, Heading→Link 36 px: 2096891319843164276.md */
.ft li{padding:10px 0;font-size:14px}
.ft a{color:#262626;text-decoration:none;white-space:nowrap}
/* nowrap gegen "Resea rch": aakib-tiles.md, 2095863741250474026.md */
.ft__legal{display:flex;justify-content:space-between;align-items:center;
  margin-top:48px;padding-top:20px;border-top:1px solid #ECECEC;font-size:12px;color:#777}
.ft__legal nav{display:flex;gap:20px}
/* Bottom-Bar mit Hairline: 2095874058697293985.md r_cta-Crop y≈872–950 */
@media(max-width:768px){.ft__grid{grid-template-columns:1fr 1fr}.ft__brand{grid-column:1/-1}}
/* Ableitung aus 2096891319843164276.md, nicht gemessen */
```

Dark-Variante: `background:#1C1C1E;border-radius:40px 40px 0 0;` Titel `#D0D0D0`, Links 13 px `#8A8A8A` (Kontrast schwach, besser `#B0B0B0`), Hairline `#3A3A3C` (`2095797753305612601.md`). Riesenwortmarke optional: `.ft__giant{position:absolute;bottom:-40px;left:50%;transform:translateX(-50%);font-size:clamp(200px,28vw,420px);font-weight:600;color:#2A2A2C;line-height:1;white-space:nowrap;pointer-events:none;user-select:none}` mit `overflow:hidden` am Footer.

### B10. App-Sidebar mit Tonwert-Aktivzustand

```css
.shell{display:grid;grid-template-columns:245px 1fr;min-height:100vh}
aside{background:#fafafa;border-right:1px solid #e1e1e1;padding:12px;display:flex;flex-direction:column}
/* 245 px, #fafafa, #e1e1e1: refero-2.md Mocha */
aside .brand{display:flex;align-items:center;gap:8px;font-weight:600;font-size:16px;padding:8px 10px 24px}
aside .group{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#6B6B70;margin:20px 10px 8px}
aside a{display:flex;align-items:center;gap:10px;height:36px;padding:0 10px;border-radius:8px;font-size:14px;color:#222}
/* Höhe 36 Startwert zwischen 30 (refero-2) und 39 (2096944343487852961) */
aside a svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.5}
aside a[aria-current]{background:#fff;border:1px solid #e5e5e5;box-shadow:0 1px 2px rgba(0,0,0,.06);font-weight:500}
/* Raised-Aktiv: 2096944343487852961.md; flache Alternative background:#F3F3F5 → 2096215770783199316.md */
aside .badge{margin-left:auto;min-width:20px;height:20px;border-radius:999px;background:#E5484D;color:#fff;font-size:11px;display:grid;place-items:center}
aside .foot{margin-top:auto}
.topbar{height:56px;display:flex;align-items:center;gap:16px;padding:0 24px;border-bottom:1px solid #EBEBEB}
.crumbs{display:flex;gap:10px;font-size:14px;color:#777}
.crumbs [aria-current]{color:#111;font-weight:500}
/* Breadcrumb 14 px, #555/#999/#111: 2096944343487852961.md */
```

---

## Varianten je Stilfamilie

| Familie | Nav-Fläche | Höhe | Aktiv-Zustand | CTA-Form | Footer | Belege |
|---|---|---|---|---|---|---|
| SaaS hell (Hubmini, Amplemarket, Miro, Airtable) | Weiss, 1 px Hairline oder 1-px-Schatten | 45–78 px | Text dunkler | Pill grau/blau oder 4–8 px Rechteck | 4 Spalten, Bottom-Bar | `2095874058697293985.md`, `mobbin-1.md`, `mobbin-2.md`, `mobbin-3.md` |
| SaaS dunkel (21st, Linear, Mono Charts, Layers) | Page-Farbe, ohne Border | 48–64 px | Gefüllte Pille `#232323` oder Muted→Weiss | Blau/Weiss-Pille oder Off-White-Button | dunkler als Page + Hairline | `twentyfirst.md`, `refero-2.md`, `2096175237109092642*.md`, `layers.md` |
| Foto-Hero (Nexora, Arcstone, Motivra) | Transparent über Foto, Dunkelverlauf oben | 48–64 px | Weiss 85 % | Weisse Pille | Riesenwortmarke über Foto | `aakib-tiles.md`, `2096149200178418026.md`, `2095863741250474026.md` |
| Kapsel auf Farbe (Recurr, Hive-B, Wireframe→Final) | Schwebende Pille, Schatten | 60–96 px Kapsel | Weiss vs Grau | Pille in Akzent | Dark-Board Radius 40 | `2095797753305612601.md`, `2095488681796854015.md`, `2096876701775261945.md`, `2096175830624055596.md` |
| Objekt-Nav (Kargul-Wizard) | Drei Pillen, kein Balken | 40–44 px | Semibold vs Regular | Pille, im Flow entfernt | Einzeilig zentriert | `2096192737867350330*.md` |
| Editorial/Fashion (CLOU, On, Acne) | Weiss, Radius 0 | 45–75 px | 1-px-Unterstrich | Textlink oder Outline-Pille | nicht im Paket | `refero-1.md` |
| Versal-Tech (Delta A/C/D, Oxide) | Weiss/Dunkel, 1 px Hairline | 60–80 px | keiner sichtbar | Chamfer-Block oder Mono-Button | Mono-Versalien | `2095488681796854015.md`, `2095565814405742911.md`, `refero-1.md` |
| Blueprint/Terminal (Kalender-Ultramarin, Nexus) | Weiss, Hairline | 64–70 px | – | Blau mit Innenkante | Vollfarbe oder Off-White, Mono-Headings | `2096292759489609818.md`, `aakib-tiles.md`, `2096891319843164276.md` |
| Glas-Kapsel (Open Design) | Beim Scroll Kapsel mit Blur, Border, Schatten | 84 px → Kapsel | Underline grau/Lime | Graphit-Pille 36 px | nicht im Paket | `open_design.md` |
| App-Shell hell | Sidebar `#F3F4F6`–`#fafafa`, Topbar Hairline | Topbar 40–84 px | Weiss-Tile mit Border oder `#F3F3F5` | schwarzer Button oben rechts | – | `2096944343487852961.md`, `2096889729337921598.md`, `2096215770783199316.md`, `refero-2.md` |
| App-Shell dunkel | Sidebar `#0C0F14`–`#1b191c` | Topbar 48–72 px | `#1B1B1B`/`#171C23` + Akzent-Icon | Weiss oder Lime 36–54 px | – | `2096499167225078020.md`, `2096891182701793331.md`, `2096832279775486079.md` |

Formregel pro Seite: eine Button-Familie. Header-Pillen und eckige Hero-Buttons auf derselben Seite sind ein Bruch (`mobbin-2.md` Square: Pillen y≈40–70 vs Radius 4 y≈325).

---

## Dos

- **Ein CTA im Header, Rest Text.** Login als Textlink, Signup als Fläche (`mobbin-1.md`, `2095863741250474026.md`, `refero-2.md`).
- **Nav-CTA = Hero-CTA in Form und Farbe.** Gleicher Button oben und unten liest sich als System (`2096889729337921598.md` Blau-Verlauf Radius 14 beide; `2096855995909869867.md` "Get Started" Nav und Hero identisch). Aber kleiner: Nav-CTA 36–44 px, Hero-CTA 48–60 px (`open_design.md` 36 vs 50; Gegenbeispiel `2096931638118871502.md` beide 60 px → Hierarchie verwässert).
- **Proof in den Header, wenn er echt ist.** GitHub-Star-Zähler als Pille (`2096175237109092642-video-2.md`; `open_design.md` "94.6K+"; `refero-2.md` Gumroad "8.9K ★").
- **Mittelachse rechnen, nicht schätzen.** `1fr auto 1fr` statt `space-between` (`2096944343487852961.md` "exakte Mittelachse").
- **Auf Foto: Verlauf statt Blur.** `2096149200178418026.md`, `aakib-tiles.md`.
- **Kapsel nur auf Farbe oder Foto.** Auf Weiss ist die Kapsel "kaum von der Fläche abgesetzt" (`2096192737867350330-video-1.md` Slop-Risiko).
- **Im Funnel Ausstiege entfernen.** Checkout ohne Nav (`2096929195381457078.md`), Wizard ohne Nav-CTA (`2096192737867350330-video-1.md`).
- **Footer-Spalten mit `nowrap` und Mindestbreite.** (`aakib-tiles.md`, `2095863741250474026.md`).
- **Mobile: Burger und X in derselben 40-px-Box.** (`open_design.md` mobile-menu.png).
- **Anker unter Sticky-Header mit `scroll-margin-top`.** (`open_design.md` mobile-faq.png).
- **Announcement-Bar in Tonwert, nicht in Akzent.** `#F3F3F3` (`mobbin-3.md`), Lime-Tint (`open_design.md`).
- **Sidebar-Aktiv ohne Akzentfarbe, ohne Balken.** Eine Tonwertstufe reicht, weil sonst nichts Fläche hat (`2096215770783199316.md`, `2096660897628668066.md`, `2096499167225078020.md`).

## Don'ts mit Gegenbeispiel

- **Doppelte Nav-Einträge.** "Company" zweimal in der Nav (`2095874058697293985.md` Nav-Crop x≈1000 und x≈1215). "SPACES" zweimal in der Sidebar (`2096660897628668066.md`). Zwei Footer-Spalten "Primary" mit identischen Links (`aakib-tiles.md` Launchkit).
- **Dropdown-Chevron ohne Menü.** Deko-Pfeile in der Kapsel-Nav (`2095488681796854015.md` System B "Dropdown-Pfeile ohne Menü sind Deko").
- **Nackter Chevron neben Icon-Buttons.** Ohne Container oder Label unlesbar, was er öffnet (`2096618423983964587.md` image-1.jpg x1765–1785 y205).
- **Zwei gleich schwere CTAs.** "APP" Textlink und "Start building" Button ohne Rangordnung (`2095565814405742911.md`); Nav-CTA 60 px gleich gross wie Hero-CTA (`2096931638118871502.md`); vier CTAs in zwei Header-Reihen (`mobbin-2.md` Square).
- **Sechs gleichwertige Pillen plus Dot plus Toggle.** Zu viele Zielflächen (`designmd-me-1.md` home-desktop.png y52–78).
- **Nav-Links grau auf hellem Himmel ohne deckende Fläche.** (`2096876701775261945.md` Slop-Risiko; Pille rettet es).
- **Portal-Navigation auf öffentlicher Seite.** Messages, Settings, Upgrade in einer Agentur-Website (`2096832279775486079.md`).
- **Keine Nav bei mehr als zwei Sektionen.** Arcstone funktioniert nur, weil es eine Foto-Bühne ist (`2096149200178418026.md` "Keine Navigation komplett streichen, wenn die Seite mehr als 2 Sektionen hat").
- **Glas-Header als Reflex.** `position:fixed` + `backdrop-filter` ohne scrollenden Inhalt dahinter (`prior_corpus.md` unslop-react-design.md:9,61).
- **Mobilmenü mit 20+ offenen Einträgen.** Kein Akkordeon (`open_design.md` mobile-menu.png).
- **Footer-Copy aus dem Template.** "Performance Marketing" bei Finanzprodukt, "Science/Journal" bei Autohändler (`aakib-tiles.md`, `2095863741250474026.md`); Gmail-Adresse als "Company"-Spalte (`2095874058697293985.md`).
- **Footer-Links `#8A8A8A` in 13 px auf `#1C1C1E`.** Schwacher Darkmode-Text (`2095797753305612601.md`).
- **Riesenwortmarke ohne Budget.** 400 px reine Deko (`2095797753305612601.md`).
- **Fake-Browser-Chrome als Produkt-UI.** Ampel ohne Titel/URL nur im Mockup (`2096833304351961505.md`).
- **Wetter-Widget ohne Standortbezug.** (`2096149200178418026.md`; `prior_corpus.md` taste-SKILL.md:669).
- **Versions-Footer auf Marketing-Seiten.** "v1.4.2 · Build 0048" (`prior_corpus.md` taste-SKILL.md:662).
- **Sticky-Abschluss-CTA-Banner.** (`prior_corpus.md` unslop-react-design.md:48).
- **Hero-Foto hart an der Topbar ohne Rand.** (`2096832279775486079.md` y 145).
- **Sub-Nav-Fill unsichtbar.** `#f8f8f8` auf `#fcfcfc` trennt nichts (`refero-1.md` Acne).

## Gilt nicht wenn

- **Ein-Schritt-Seiten:** Checkout, Booking, Login zeigen nur Logo (`2096929195381457078.md`, `mobbin-1.md` Zoom, `mobbin-2.md` Apollo, `neuform-1.md`). Kein Drei-Zonen-Grid nötig.
- **Foto-Bühne mit einem Ziel:** Arcstone-Muster (Meta | Wortmarke | ein Button) ohne Links, nur bei 1–2 Sektionen (`2096149200178418026.md`).
- **Immersive Player/Portfolio:** Marke als Ornament zentriert, Menü als Disc am unteren Rand (`2096634909263646898.md`); Wortmarke in der Säule statt Bar (`neuform-1.md`).
- **App-Shell:** Sidebar ersetzt Header-Nav; Topbar trägt Breadcrumb, Suche, Aktionen (R17). Marketing-Regeln zu CTA-Form gelten dort nicht.
- **Editorial ohne Aktion:** Portfolio-Nav ohne CTA, Sprachwechsel rechts (`refero-1.md` CLOU).
- **Kapsel auf reinem Weiss:** Kapsel-Familie verliert ohne Farb- oder Fotogrund ihren Kontrast; dann Zeile mit Hairline (`2096192737867350330-video-1.md`).
- **Board-Kompositionen:** Nav-Höhen 96–195 px in Dribbble-Boards sind Präsentationsluft, keine Web-Masse (`2095807169346334900.md`, `2095565814405742911.md`, `2096944343487852961.md`).

## Datenlücken

- Mobile-Nav nur in 5 Quellen belegt (`open_design.md`, `layers.md`, `designmd-me-1.md`, `refero-1.md` On, `neuform-1.md`). Bottom-Tab-Bars: kein Beleg.
- Hover-/Fokus-Zustände in keiner Analyse gemessen. Sticky-Verhalten meist "nicht belegt" (`2096175237109092642.md`, `mobbin-2.md`).
- Footer auf Mobile: nur Ableitung (`2096891319843164276.md`).
- Exakte Fontfamilien der Nav-Links bleiben in fast allen Quellen "Inter-artig".

## Quellen

Alle Pfade relativ zu `../studies/design-depth/deep/`:

- Drei-Zonen/Zeile: `2095874058697293985.md`, `2096292759489609818.md`, `2096944343487852961.md`, `2096931638118871502.md`, `2096889729337921598.md`, `2095565814405742911.md`, `2095488681796854015.md`, `2095863741250474026.md`, `2096855995909869867.md`, `2095807169346334900.md`, `twentyfirst.md`, `shadcn.md`, `mobbin-1.md`, `mobbin-2.md`, `mobbin-3.md`, `refero-1.md`, `refero-2.md`, `designmd_supply.md`, `aakib-tiles.md`
- Kapsel/Floating: `2095797753305612601.md`, `2095488681796854015.md`, `2096876701775261945.md`, `2096175830624055596.md`, `2096192737867350330.md`, `2096192737867350330-video-1.md`, `2096192737867350330-video-2.md`, `mobbin-2.md`, `open_design.md`, `refero-2.md` (Sub-Nav-Pille)
- Foto-Overlay: `2096149200178418026.md`, `aakib-tiles.md`, `2095863741250474026.md`
- Aktiv-Zustand/Dark: `2096175237109092642.md`, `2096175237109092642-video-2.md`, `layers.md`, `refero-1.md`, `open_design.md`
- Mega-Menü: `twentyfirst.md`, `refero-1.md`
- Mobile: `open_design.md`, `layers.md`, `designmd-me-1.md`, `refero-1.md`, `neuform-1.md`, `2096634909263646898.md`
- Funnel/Checkout: `2096929195381457078.md`, `2096192737867350330-video-1.md`, `mobbin-1.md`, `mobbin-2.md`
- Footer: `2096891319843164276.md`, `2095874058697293985.md`, `2095797753305612601.md`, `aakib-tiles.md`, `2095863741250474026.md`, `2096292759489609818.md`, `refero-2.md`, `neuform-1.md`, `2096175237109092642.md`, `prior_corpus.md`
- App-Shell/Sidebar/Topbar: `2096215770783199316.md`, `2096499167225078020.md`, `2096660897628668066.md`, `2096832279775486079.md`, `2096891182701793331.md`, `2096618423983964587.md`, `2096165490498695410.md`, `2096944343487852961.md`, `2096889729337921598.md`, `refero-2.md`, `shadcn.md`, `mobbin-1.md`, `gap-marcelkargul.md`, `gap-uiux_hamad.md`
- Logo-Zone: `2096953356086313312.md`, `2096931638118871502.md`, `2096891182701793331.md`, `designmd-me-1.md`, `2096855995909869867.md`, `neuform-1.md`
- Slop-Kanon: `prior_corpus.md`, `2096833304351961505.md`
- Ohne Nav-Befund (gelesen, kein Beitrag): `2095383602431459523.md`, `2095784926717300835.md`, `2095783930775433616.md`, `2095928637346472339.md`, `2096634909263646898.md` (nur Menü-Disc), `2096674796704813174.md`, `2096175237109092642-video-1.md` (Card-Footer, kein Site-Footer)
