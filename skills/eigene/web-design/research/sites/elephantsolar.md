# www.elephantsolar.de

## Steckbrief

| Feld | Wert | Beleg |
|---|---|---|
| Domain | www.elephantsolar.de | `home.html`: `<link href="https://www.elephantsolar.de" rel="canonical"/>` |
| Branche | Photovoltaik, Stromspeicher, Wärmepumpen, Wallbox, Energiemanagement. Handwerk/Installation, Region Hannover und Niedersachsen | `home.html` Meta-Description, Nav |
| Seitentyp | Lead-Gen-Website mit 3-Schritt-Anfrage-Funnel als Kern | `anfrage.html`: `id="flowbaseSlider" class="anfrage_form w-form"` |
| Stack | Webflow (site-id `68550e77989ff2ca782e92f7`, page-id `68550e77989ff2ca782e92f3`) | `<html data-wf-domain="www.elephantsolar.de" data-wf-page="..." data-wf-site="..." lang="de">` |
| Agentur | weiss&co / Weiss Global, "Realisiert durch Weiss Global v6.5.0-production" | `home.html` Footer, Kommentar `Realisiert durch weiss&co` in Inline-Script 1 |
| Renderer-Engine | Webflow JS v1.3.9, Webpack-Chunks `elephant-solar.achunk.*.js` | `wf.js`: `r.rv=()=>"1.3.9"`, `r.u=e=>"elephant-solar.achunk."+...` |
| Motion-Libraries | GSAP 3.14.1 (gsap, ScrollTrigger, Draggable, CustomEase, InertiaPlugin), Splide latest + auto-scroll 0.5.3, HLS.js 1.6.11 (CDN jsdelivr) | Script-Tags in `home.html` |
| Interaktionssystem | Webflow IX2 (native interactions), 17 Action Lists, 76 Events | `elephant-solar.achunk.20825e247acf075b.js`: `actionLists:{a:{id:"a",title:"Navbar [Enter]"` |
| Consent | Cookie-Script (`cdn.cookie-script.com/s/6e74b28322f7db8b122e5dcb86fbafc5.js`) | Script-Tag in `home.html` |
| Analytics | Google Tag Manager `GTM-PGTHZVGZ`, Google Ads `AW-17262388604` (gtag), Hotjar `hjid:5135716`, Herofil.es OnSite `RH-832-460-718` | Inline-Scripts in `home.html` |
| Fonts | DIN Next Condensed (Display, 400/700), DIN Next (Label), Area, General Sans, Inter (Body), DM Sans, alle self-hosted woff/ttf/otf auf Webflow-CDN | `@font-face` Blöcke in `css-shared.css` |
| Sprache | Deutsch, `<html lang="de">` | `home.html` |
| Anrede | Du, durchgehend | H1: "Smarter Strom, Smarte Wärme." / "Werde mit Elephant Solar unabhängig!" |
| Seitenanzahl in Sitemap | 105 URLs, davon 41 Blog-Artikel, 30 Referenz-Detailseiten, 6 Produkt-Detailseiten | `sitemap.xml`, 105 `<loc>` |
| Schema.org | keine `application/ld+json` Blöcke auf keiner der 21 geprüften Seiten | Regex `application/ld\+json` auf allen HTML-Dateien: 0 Treffer |
| Canonical | auf allen geprüften Seiten vorhanden und selbstreferenziell | z. B. `/produkte/solaranlagen`: `<link href="https://www.elephantsolar.de/produkte/solaranlagen" rel="canonical"/>` |
| hreflang | keiner | `hreflang` in allen 21 Dateien: 0 Treffer |
| Formular-Backend | Webflow Forms, `method="get"`, `redirect="/danke"` | `anfrage.html`: `<form id="wf-form-Anfragenformular" ... redirect="/danke" method="get">` |

## Sitemap

Hauptnavigation (`<nav role="navigation" class="navbar_menu w-nav-menu">` in `home.html`):

1. Produkte (Dropdown, `data-hover="true"`, `data-delay="300"`)
   - Linke Spalte "Unsere Produkte": Solaranlagen `/produkte/solaranlagen`, Stromspeicher `/produkte/stromspeicher`, E-Mobilität `/produkte/e-mobilitaet`, Wärmepumpe `https://elephanttherm.de/produkte/waermepumpen` (extern, Schwesterseite Elephant Therm)
   - Rechte Spalte: 4 Bildkarten mit H5 + Subline ("Solaranlagen / Nutze die Energie der Sonne", "Stromspeicher / Speicher überschüssigen Strom ein", "E-Mobilität / Lade Dein E-Auto bequem Zuhause", "Energiemanagement / Behalte deine PV-Anlage immer im Blick")
2. Wärmepumpen `https://www.elephanttherm.de/produkte/waermepumpen` (extern)
3. Über Uns `/ueber-uns`
4. Referenzen `/referenzen`
5. Finanzierung `/finanzierung`
6. Blog `/blog`

Rechts in der Nav: Telefon-Button `tel:+4951368042690` mit Label "+49 (0) 5136 8042690", Primär-CTA "Jetzt Angebot sichern" auf `/anfrage`.

Über der Nav liegt ein `.banner`: links "Willkommen bei Elephant Solar!" + live Uhrzeit (`#displayTime`, `setInterval(updateTime, 60000)`), rechts "Unsere Marken:" mit zwei Marken-Links (Elephant Solar, Elephant Therm). Der Banner ist Teil von `.navigation { z-index:999; position:fixed; inset:0% 0% auto }`, die Nav scrollt also mit.

Footer-Gruppen (Überschriften wörtlich): "Übersicht", "Produkte", "Rechtliches", "Elephant Solar GmbH". Dazu Social-Icons für Instagram, LinkedIn, TikTok, YouTube.

Sitemap-Struktur nach URL-Muster:

| Gruppe | Anzahl | Beispiele |
|---|---|---|
| Blog | 41 Artikel (die Übersicht `/blog` selbst ist eine eigene URL) | `/blog/welche-kosten-kommen-bei-einer-pv-anlage-auf-mich-zu` |
| Referenzen | 30 Detailseiten (plus die Übersicht `/referenzen`) | `/referenzen/gerd-meyer` |
| Produkt-Detailseiten | 6 | `/produkt/ecoflow-powerocean`, `/produkt/aiko-neostar-2s-plus` |
| Produkt-Kategorien | 5 | `/produkte/solaranlagen`, `/produkte/stromspeicher`, `/produkte/waermepumpen`, `/produkte/e-mobilitaet`, `/produkte/energiemanagement` |
| Rechtliches | 4 | `/rechtliches/impressum`, `/rechtliches/datenschutz` |
| Aktions-Bedingungen | 3 | `/bedingungen/gewinnspiel-photovoltaikanlage` |
| Standortseiten | 3 | `/photovoltaik/peine`, `/photovoltaik/burgdorf`, `/solaranlage/hannover` |
| Sonstige Einzelseiten | 8 | `/`, `/ueber-uns`, `/anfrage`, `/finanzierung`, `/faq`, `/kontakt`, `/karriere`, `/elephant-connect`, `/danke`, `/gefunden`, `/aktionen/oster-raetsel` |

## Seiten

Alle 21 gefetchten Seiten sind HTTP 200 und inhaltlich gerendert (kein Client-Side-Rendering-Risiko, Webflow liefert vollständiges HTML). Hinweis zur Methode: der Brief nennt als Obergrenze 10 Seiten, hier sind es 21, weil erst mit allen Produkt-, Standort-, Listen- und Funnel-Seiten sichtbar wurde, welche Sektionen site-weit identisch sind und welche nicht.

### Startseite `/`

- `<title>`: "Solar Hannover - Elephant Solar - Die Photovoltaik-Experten"
- Meta-Description: "Photovoltaik- & Solaranlagen - PV-Anlagen zum Bestpreis - Finanzierung ohne Anzahlung inkl.! Elephant Solar GmbH - Deine Solarfirma für Hannover & Region."
- H1: "Smarter Strom, Smarte Wärme." (2 Teile: `<a href="/produkte/solaranlagen">Smarter Strom,</a>` + `<a href="/produkte/waermepumpen"><span class="hero-text-span">Smarte Wärme.</span></a>`)
- H2: 10, H3: 13
- Schema.org: keine. Canonical: `https://www.elephantsolar.de`. hreflang: keiner.

Sektionsliste in DOM-Reihenfolge. Gezählt sind die 14 Top-Level-Blöcke aus `<main class="main-wrap">`, dazu Banner und Footer außerhalb:

| Nr | Sektionstyp | Headline wörtlich | Subline (gekürzt) | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 0 | Banner + Nav | (keine H) | Nav-Punkte siehe Sitemap | Full-bleed, Sticky (fixed) | Marken-SVGs | "Jetzt Angebot sichern", "+49 (0) 5136 8042690" | Live-Uhr, Marken-Umschalter | `.navigation` fixed, `z-index:999` |
| 1 | Hero | "Smarter Strom, Smarte Wärme." | 22 Wörter: "Beratung, Planung und Montage von ganzheitlichen Energielösungen aus einer Hand. Wir sind Dein Partner in Sachen Energie aus Burgdorf." | Full-bleed, Text links in `.hero_content-wrap max-width:50%` | Video: Bunny-CDN HLS "Elephants Solar - Testimonial Supercut.mp4" (`data-player-autoplay="true"`, `data-player-lazy="false"`), Poster-Fallback als CSS-Background | "Jetzt Angebot sichern" (`/anfrage`), "Erklärvideo ansehen" (Lightbox) | 5 Kunden-Avatare (`avatar-group`), "Mehr als 1000+ zufriedene Kunden", 5 Sterne-Logos, "5.0/5.0 auf" + Google-Logo, EcoFlow-Partner-Badge | Hero-Höhe `height:110vh`, `padding-top:12rem`; zwei CTAs; H1 verlinkt auf 2 Produktseiten |
| 2 | Leerer `div.section` (Platzhalter nach dem Hero, kein Inhalt) | (keine H) | keine | kein Layout | keine | keine | keine | `<div class="section"><div class="padding-global"><div class="container"></div>` ohne Kinder |
| 3 | Logos (Splide-Marquee) | "Wir setzen auf Qualitätsmarken" | keine | Marquee, einreihig | 9 Marken-Logos (EcoFlow, AIKO, Easee, KEBA, Tesla, Buderus) | keine | 6+ Qualitätsmarken | `.splide` mit `autoScroll.speed .5`, Maske links/rechts |
| 4 | Benefits-Cards (3er) | "Deine Vorteile bei uns" | Label "Ein Partner - Alles gelöst" | 3er-Grid (`grid-template-columns:1fr 1fr 1fr`, gap 48px) | 3 Produktfotos, oben abgerundet | keine | Marken-Trennung Solar/Therm | Karten `.vorteile_card` mit Gradient `linear-gradient(149deg, #225530, #042422)` |
| 5 | Zähler/Stats | "Zahlen, die überzeugen." | Label "UNSERE ERFOLGE" | 4er-Grid (`stats_grid`), dunkler Gradient-Hintergrund | keine | keine | "2000+ Glückliche Kunden", "30000+ Verbaute Module", "12000+ MWh pro Jahr", "500+ Wärmepumpen" | Zahlen in Akzentfarbe `#e6fa00`, `.stats_title` 4.25rem |
| 6 | Testimonials (Slider) | "Echte Stimmen unserer Kunden" | "Überzeuge dich selbst, durch die Worte von Manfred, Michael, Merle und Antonia." | Carousel, zentriert, GSAP-`horizontalLoop` mit Drag | 4 Testimonial-Banner als PNG, Lightbox | keine | Kundennamen im Text | `data-slider-autoplay="true" data-slider-autoplay-duration="8"`; inaktiv 45% Opacity; keine Bullets im Markup, nur Prev/Next-Buttons |
| 7 | CTA-Band (Gradient) | "Bereit für den nächsten Schritt?" | "Kontaktiere noch heute Deinen persönlichen Ansprechpartner ... kostenfrei ... beraten!" | 2-Spalten 60/40 (`layout_content.is-cta`, `1.5fr .75fr`) | keine | "Jetzt Gespräch vereinbaren" (`/anfrage`), "oder anrufen: +49 (0) 5136 8042690" | "kostenfrei" | Gradient `linear-gradient(132deg,#225530,#042422)` |
| 8 | Produkt-Tabs | "Höchste Qualität, bestes Design." | "Entdecke unseren erstklassigen Produktkatalog von führenden Herstellern der Branche." | Tabs (`w-tabs`, 5 Tabs), darin 5 Produktkarten je Pane | 12 Bilder (Produkt + Datenblatt-Icon) | 5x "Produkt ansehen", 5x "Datenblatt" | Konkrete Specs: "bis zu 23,6%", "25 Jahre Produktgarantie und 30 Jahre Leistungsgarantie", "15 Jahren Garantie" | Tabs: Solarmodule, Wechselrichter, Stromspeicher, Wallbox, Wärmepumpe; `data-duration-in="300" data-duration-out="100"` |
| 9 | Reviews-Grid | "Meinungen zufriedener Kunden" | "Überzeuge Dich selbst durch die Bewertungen unserer glücklichen Kunden!" | 3er-Grid (`review_list`), dunkler Gradient | 6 Avatare | keine | 6 Google-Rezensionen mit je 5 Sternen, Namen "Thorsten H.", "Urmel Titiwu", "Heinrich W.", "Alexander Perelewski", "Jörg Dreekmann", "Ines Weidner", Quelle 6x "Kund*in auf Google Maps" | Maskenverlauf unten (`mask-image:linear-gradient(#000,#000,#000,#000,#0000)`) |
| 10 | Zigzag-Feature (Express-Montage) | "Schnellster Service" | Label "Unsere Express-Montage", Text "Wir liefern deine Energielösung im Umkreis von 100km innerhalb von Niedersachsen bereits in wenigen Wochen ..." | 2-Spalten 50/50 (`layout_content`) | 1 Foto `elephant_express-v1.avif` | "Jetzt Angebot sichern" (`/anfrage`) | "Im Umkreis von 100km", "in wenigen Wochen" | danach ein `divider-horizontal` vor der nächsten Sektion |
| 11 | Zigzag-Feature (Bild links) | "Dein Partner in Sachen Energie und Wärme" | Label "Wer wir sind", Text "Als Meisterbetrieb aus Burgdorf stehen wir für Zuverlässigkeit, Innovation und Umweltbewusstsein ..." | 2-Spalten 50/50 `layout_content asset-left` (Bild links) | Gruppenfoto 2892px | "Erfahre mehr über uns" (`/ueber-uns`) | "Meisterbetrieb aus Burgdorf" | H2-Klasse `heading-style-h2` |
| 12 | Referenzen-Teaser | "Unsere Referenzen" | "So sehen unsere Anlagen aus" | 3er-Grid, Karten | 6 Anlagen-Fotos | "1000+ weitere ansehen" (`/referenzen`) | PLZ + kWp + Modulzahl je Karte, "Full-Black Module", "Installiert in wenigen Wochen" | Karten `border-radius:16px`; H3 je Karte trägt die Klasse `heading-style-h6` |
| 13 | Footer-CTA (Karte) | "Starte deine solare Unabhängigkeit" | "Du denkst über eine Solaranlage, Wärmepumpe oder Wallbox nach? Werde mit Elephant Solar unabhängig!" | Full-bleed Karte in Container | Gruppenfoto 2892px, Blog-Teaser-Thumbnails | "Energiewende starten" (`/anfrage`) | Firmenanschrift, Telefon, E-Mail, "Team kontaktieren" | `.footer-cta` mit `backdrop-filter:blur(8px)`, `border-radius:1rem`, `margin-top:-15rem` (überlappt nach oben) |
| 14 | Footer | (keine H2/H3) | Spaltenüberschriften: Übersicht, Produkte, Rechtliches, Elephant Solar GmbH | 5-Spalten-Grid (`2fr 1fr 1fr 1fr 1fr`) | Footer-Logo, 4 Social-Icons, 4 Blog-Thumbnails | "Team kontaktieren" (mailto) | Adresse Otto-Hahn-Straße 21, 31303 Burgdorf; Tel. 05136 8042 690; info@elephantsolar.de | Rechts unten "2025 © Elephant Solar GmbH / Realisiert durch Weiss Global v6.5.0-production" |

Hero-Formel Startseite:

- H1-Nutzenversprechen: "Smarter Strom, Smarte Wärme." (zwei verlinkte Halbsätze, zweiter Teil in Akzentfarbe `#e6fa00`)
- Subline: 22 Wörter
- Anzahl CTAs im Hero: 2 ("Jetzt Angebot sichern", "Erklärvideo ansehen")
- Trust-Signale im Hero: 4 (5 Kunden-Avatare, "Mehr als 1000+ zufriedene Kunden", "5.0/5.0 auf" mit Google-Logo, EcoFlow-Partner-Badge; das Badge wird unter 479px per CSS `display:none` ausgeblendet)
- Medientyp: Autoplay-HLS-Video mit Overlay-Gradient, Poster als CSS-Background
- Hero-Höhe: `height:110vh` (Desktop), `padding-top:12rem`

CTA-Strategie Startseite:

| CTA-Label | Häufigkeit | Ziel |
|---|---|---|
| "Produkt ansehen" | 5 | `/produkt/*` |
| "Datenblatt" | 5 | CDN-PDF |
| "Jetzt Angebot sichern" | 3 | `/anfrage` |
| "+49 (0) 5136 8042690" | 2 | `tel:+4951368042690` |
| "Erklärvideo ansehen" | 1 | Lightbox |
| "Jetzt Gespräch vereinbaren" | 1 | `/anfrage` |
| "Erfahre mehr über uns" | 1 | `/ueber-uns` |
| "1000+ weitere ansehen" | 1 | `/referenzen` |
| "Energiewende starten" | 1 | `/anfrage` |

Häufigste Linkziele auf der Startseite: `/produkte/solaranlagen` (5x), `/anfrage` (5x), `/produkte/stromspeicher` (3x), `/produkte/e-mobilitaet` (3x), `/ueber-uns` (3x), `/referenzen` (3x). Der Header-CTA "Jetzt Angebot sichern" ist auf jeder Seite vorhanden und immer auf `/anfrage` gerichtet, also ein einziger Funnel. Telefonnummer steht im Header (Desktop) und im Footer.

Trust-Staffelung Startseite: Hero (Avatare, 1000+ Kunden, 5.0 Google, Partner-Badge) -> Logos (Marken) -> Werte (4 Stats) -> Testimonial-Slider -> Produkt-Specs mit Garantieangaben -> Google-Reviews-Grid (6 Stück) -> Referenz-Karten mit echten Orten -> Footer-CTA mit Firmenanschrift und Telefon.

### Produktseiten (Blueprint identisch bei 5 Seiten)

Analysiert: `/produkte/solaranlagen`, `/produkte/stromspeicher`, `/produkte/waermepumpen`, `/produkte/energiemanagement`, `/produkte/e-mobilitaet`.

| Feld | solaranlagen | stromspeicher | waermepumpen |
|---|---|---|---|
| `<title>` | "Solaranlage fürs Eigenheim - Werde solar unabhängig! \| Elephant Solar GmbH" | "Stromspeicher fürs Eigenheim - Maximale Autarkie! \| Elephant Solar GmbH" | "Deine Wärmepumpe von Elephant Therm \| Elephant Solar GmbH" |
| H1 | "Deine individuelle Solaranlage" | "Dein Eigener Stromspeicher" | "Deine Wärmepumpe von Elephant Therm" |
| H1-Klasse | `heading-style-h2` | `heading-style-h2` | `heading-style-h2` |
| H2 / H3 | 5 / 6 | 5 / 6 | 6 / 6 |
| Sektions-Wrapper | `section_header`, 3x `.section`, `section.background-color-gradient`, `section_footer-cta` | dito | `section_header is-therm`, `section.therm-background-color-gradient` (blauer Gradient) |

Sektionsliste `/produkte/solaranlagen`:

| Nr | Sektionstyp | Headline wörtlich | Subline | Layout-Familie | Medien | CTA-Labels | Trust-Elemente |
|---|---|---|---|---|---|---|---|
| 1 | Seiten-Header | H1 "Deine individuelle Solaranlage" | "Mit einer PV-Lösung von Elephant Solar machst du Dein Eigenheim zur Energiequelle!" | Zentriert-schmal (`container content-align-center`, Brotkrumen "Produkte ❯ Solaranlagen") | keine | keine | keine |
| 2 | Zigzag-Feature | "Bring die Energie der Zukunft nach Hause!" | "Mit einer eigenen PV-Anlage machst du dich deutlich unabhängiger von Stromanbietern und Marktpreisen ..." | 2-Spalten 50/50 (`layout_content`, gap 5rem) | 1 Foto (2048px srcset) | "Solaranlage anlegen" | keine |
| 3 | Divider | | | `divider` 1px |
| 4 | Benefits-Grid (Fakten) | (keine H2) | | 3er-Grid `fact-grid` mit 6 `fact-grid_item` | keine | keine | "Stromkosten sparen", "Klimafreundlich", "Endlich unabhängig", "Autarkie steigern", "Hauswert aufwerten", "Steuervorteil genießen" |
| 5 | Zigzag-Feature (Bild links) | "Effizienz trifft Design" | "Wir setzen bei unseren Anlagen hauptsächlich auf die hochwertigen Module von Aiko Solar ... bis zu 460 Watt und ein Wirkungsgrad von bis zu 23,1 %" | 2-Spalten 50/50, `asset-left` (Bild links, auf Mobile `column-reverse`) | 1 Foto | "Solaranlage anlegen" | Marken-Label "Aiko Solar", konkrete Watt- und Prozentwerte |
| 6 | CTA-Band | "Bereit für den nächsten Schritt?" | "Kontaktiere noch heute Deinen persönlichen Ansprechpartner ... kostenfrei" | 2-Spalten 60/40 `layout_content.is-cta` | keine | "Jetzt Gespräch vereinbaren", "oder anrufen: +49 (0) 5136 8042690" | "kostenfrei" |
| 7 | Zigzag-Feature (Bild links) | (weitere Feature-Sektion) | | 2-Spalten 50/50 `asset-left` | 1 Foto | "Jetzt beraten lassen" | |
| 8 | Footer-CTA | "Starte deine solare Unabhängigkeit" | | Karte, Full-bleed | Gruppenfoto | "Energiewende starten" | |
| 9 | Footer | | | 5-Spalten | | | |

Jede Produktseite trägt einen `fact-grid` mit 5 bis 6 Fakten-Kacheln. Die Wärmepumpen-Seite ist auf Blau umgestellt (`--base-color-brand-elephant-therm--brand: #2c98db`) und heißt "Elephant Therm", um die Schwestermarke zu trennen.

### Produkt-Detailseite `/produkt/ecoflow-powerocean`

- `<title>`: (identisch zur Kategorie, kein eigenes Title-Muster geprüft)
- H1: "EcoFlow PowerOcean"
- H2: 1 ("Starte deine solare Unabhängigkeit")
- Aufbau: Header mit Produktname und Unterzeile "Hochwertiger LFP-Akku für mehr Leistung und Sicherheit", dann Feature-Block "Im Fokus: EcoFlow PowerOcean" mit Beschreibung, 4 Spec-Bullets ("Mögliche Erweiterung von jedem Akku auf 45 kWh", "Kabelloses, stapelbares, schmales Design", "Lebensdauer und Garantie von bis zu 15 Jahren", "Outdoorfähig nach IP65-Standard"), CTA "Datenblatt ansehen", dann direkt Footer-CTA.

### Ratgeber-Übersicht `/blog`

- `<title>`: "Unser Blog - News & Ratgeber \| Elephant Solar GmbH"
- H1: "Neuigkeiten rund um Solar & Wärme"
- H2: 2, H3: 0
- Aufbau: `section_header` (Label "Elephant Solar - Blog & News", H1, Subline "Erfahre mehr über Elephant Solar und aktuelle Neuigkeiten rund um die Solar- und Heizungsbranche."), dann `w-dyn-list` mit 41 `collection-item w-dyn-item`.
- Layout: `collection-list` 3er-Grid (Desktop), 1 Spalte mobil.
- Jede Karte: Bild mit Kategorie-Label als Overlay, Datum (Label-Style, englisch ausgeschrieben: "February 1, 2026"), Titel als H6 mit Klasse `heading-style-h5`, 2 bis 3 Zeilen Anreißer, Avatar + "Elephant Solar GmbH" + "Author des Beitrages".
- Kategorien: 3, wörtlich "Blog", "Ratgeber", "News". Die 41 Karten entsprechen den 41 Blog-URLs der Sitemap.
- Kein Paginierungs- oder Filter-UI im HTML gefunden, alle 41 Einträge stehen im DOM.
- Kein Newsletter, kein Lead-Magnet auf der Übersicht.

### Ratgeber-Artikel `/blog/welche-kosten-kommen-bei-einer-pv-anlage-auf-mich-zu`

- `<title>`: "Welche Kosten entstehen bei einer Solaranlage? - Blog \| Elephant Solar GmbH"
- Meta-Description: "Mar 01, 2024 - Bei der Installation einer Solaranlage auf deinem Dach sind zwei Hauptkostenkategorien zu berücksichtigen: Anschaffungskosten und Betriebskosten. ..." (Datum wird automatisch vorangestellt)
- H1: "Welche Kosten entstehen bei einer Solaranlage?"
- H2: 1, H3: 0. Schema: keines (kein Article, kein FAQPage).
- Textlänge: 280 Wörter im `w-richtext`-Block, 11 `<p>`-Elemente, 5 `<ul>`-Listen.
- Bilder: 9 `<img>` auf der Seite, davon 1 Artikelbild in der rechten Spalte (Lightbox-verlinkt).
- Interne Links: 18, externe Links: 8.
- Aufbau:
  - `section background-color-secondary` Header mit Label-Zeile "Ratgeber • 01 Mar 2024" (2 `heading_label`-Divs), H1, Intro-Absatz.
  - `divider`
  - 2-Spalten `blogpost_content-grid`: links `blogpost_content-left` mit `w-richtext`, rechts `blogpost_content-right` (Sticky-ähnliche Sidebar, nicht sticky im CSS).
  - Sidebar enthält: Artikelbild (Lightbox), Metadaten-Block "Veröffentlicht am / 01.03.2024", "Kategorie / Ratgeber", "Veröffentlicht von / Elephant Solar GmbH", "Copyright: Creative Commons BY-ND", dann Divider und Logo-Grid mit Elephant-Solar- und Elephant-Therm-Logo.
  - Kein Inhaltsverzeichnis, keine Autor-Box mit Person, keine Lesezeit, keine Key-Takeaways-Box, keine Zwischen-CTAs, keine verwandten Artikel, keine FAQ.
  - Nach dem Artikel folgt direkt der globale Footer-CTA.

### Referenzen-Übersicht `/referenzen`

- `<title>`: "Referenzen - Erfolgsgeschichten unserer Kunden \| Elephant Solar GmbH"
- H1: "So sehen unsere Anlagen aus", H2: 1, H3: 25 (je Karte eine, in `text-color-white w-embed` gewrappt)
- Layout: `referenzen_list` 3er-Grid, Karten `referenz_item` mit `border-radius:16px`, `border:.5px solid #eaedf0`. Die Übersichtsseite rendert 25 Karten, die Sitemap führt 30 Detail-URLs, es fehlen also 5 Referenzen auf der Übersicht.
- Jede Karte: Bild oben (`referenz_item-image-wrap`, `height:18rem`, `border-radius:14px 14px 0 0`), darüber ein Label mit der PLZ/Stadt, darunter H3 mit Leistung und Modulzahl, dann 2 Feature-Zeilen mit Icons: "Full-Black Module", "Installiert in wenigen Wochen".
- Beispiele wörtlich: "31275 Lehrte / 11,76 kWp, 28 Module", "38100 Braunschweig / 5,04 kWp, 12 Module", "30900 Wedemark / 5,46kwP, 13 Module" (Tippfehler auf der Live-Seite), "30974 Wennigsen / 8,60 kWp, 20 Module", "30966 Hemmingen / 7,14 kWp, 17 Module", "30938 Burgwedel / 14,28 kWp, 34 Module".
- Hover: `box-shadow:0 24px 64px #e0e0e07a` mit `transition:all .3s`.

### Referenz-Detail `/referenzen/gerd-meyer`

- `<title>`: "10,08 kWp, 25 Module \| Elephant Solar GmbH"
- H1: "25 Module - 10,08 kWp", darunter Ort "30938 Großburgwedel"
- H2: 1 (Footer-CTA). Sonst leer: der Inhalts-Container `<div class="section"><div class="padding-global padding-section-legal"><div class="container"></div>` ist leer, es gibt also kein Referenzbild und keine Projektbeschreibung im gerenderten HTML.

### Über uns `/ueber-uns`

- `<title>`: "Über Uns - Was hinter dem Elefanten steckt \| Elephant Solar GmbH"
- H1: "Willkommen bei Elephant Solar!", H2: 8, H3: 0
- Sektion `section_header is-image` (`margin-bottom:4rem; padding-bottom:12rem`, Bild-Header mit Überlappung). Keine weiteren `section`-Wrapper danach im DOM, der Rest läuft über `.section`-Divs.
- Sektionsreihenfolge: Header -> "Unsere Mission / Ein junges Team mit einer klaren Mission" (Text mit "Als Meisterbetrieb aus Burgdorf stehen wir für Zuverlässigkeit, Innovation und Umweltbewusstsein.") -> "Unsere Vision / Unser Anspruch: sorgenfreier Service" -> "Die Elephant Solar Familie / Lerne unser Team kennen" -> Team-Grid -> "Die Elephant Solar Elektromontage / Lerne Die Elektromontage kennen" -> Team-Grid -> "DAS Elephant Solar DC-Team / Lerne unser DC-Team kennen" -> Team-Grid -> "Auf der Suche nach dem Elephant Therm Team?" (extern Link "Zur Website") -> "Du willst ein Teil der Elephant Family werden?" ("Jobs ansehen", "Jetzt initiativ bewerben") -> Footer-CTA.
- Team-Grid: 14 Personen in der Verwaltung/Sales, 18 in der Elektromontage, 15 im DC-Team. Insgesamt 47 Personen-Karten. Jede Karte: `team-grid_image-wrapper` + Position (`team-grid_item-label-text`) + Name. Positionen wörtlich z. B. "Geschäftsführungsassistenz", "Projektleiterin", "Marketing Managerin", "Sales Manager", "Elektro-Meister", "Dachmonteur", "Fachleiter DC-Installation".
- Keine Zahlen/Kennzahlen über uns hinaus, kein Gründungsjahr, keine Zertifikate im HTML erkennbar.

### FAQ `/faq`

- `<title>`: "FAQ - Häufige Fragen auf einen Blick beantwortet \| Elephant Solar GmbH"
- H1: "Häufige Fragen beantwortet", H2: 1 (nur Footer-CTA)
- Der Inhaltsbereich ist leer: `<div class="w-dyn-list"><div class="empty-state w-dyn-empty"><div>Aktuell keine Fragen verfügbar.</div></div></div>`. Es sind null Fragen im DOM, kein Akkordeon, kein FAQPage-Schema. Zweiter Abruf mit anderer User-Agent-Kennung liefert dasselbe Ergebnis (HTTP 200, 55433 Bytes). Die Seite existiert, hat aber keinen Inhalt.

### Kontakt `/kontakt`

- `<title>`: "Kontakt" (kein Marken-Suffix, kürzer als alle anderen)
- Meta-Description: identisch zur FAQ-Seite, also kopiert: "Photovoltaik-& Solaranlagen ... Die am häufigsten gestellten Fragen haben wir hier für Dich beantwortet."
- H1: "Dein Kontakt zu unserem Team", H2: 4
- Inhalt: 3 Kontaktkarten im `vorteile_card-grid` (Gradient-Karten), jede als klickbare Karte:
  1. "E-Mail" -> `mailto:info@elephantsolar.de`
  2. "Telefon" -> `tel:+4951368042690`, Anzeige "+49 (0) 5136 8042690"
  3. "Unser Büro" -> Google-Maps-Link, "Otto-Hahn-Straße 21, 31303 Burgdorf"
- Kein Formular auf der Kontaktseite, kein Karten-Embed. Formular läuft ausschließlich über `/anfrage`.

### Finanzierung `/finanzierung`

- `<title>`: "Finanziere deine Solaranlage - ohne Anzahlung! \| Elephant Solar"
- H1: "Unsere flexible Finanzierung", H2: 4
- Sektionsfolge: Header (Label "Finanziere Deine Solaranlage", H1, "Sichere dir jetzt deine Finanzierung zu Top-Konditionen - Exklusiv bei Elephant Solar.") -> Zigzag "Zahle ganz entspannt / Deine Solaranlage zu flexiblen Konditionen" mit CTA "Jetzt Angebot einholen" -> Divider -> Zigzag "Wir machen es möglich / Ganz ohne Anzahlung" ("die erste Rate von 20% erst nach der Installation") mit CTA "Solaranlage anlegen" -> CTA-Band -> Footer-CTA.
- Trust: konkrete Kondition statt Siegel, "0% Finanzierung ohne Anzahlung" steht in der Meta-Description.

### Standortseite `/solaranlage/hannover`

- `<title>`: "Photovoltaik Hannover - Deine PV Firma in der Nähe \| Elephant Solar GmbH"
- H1: "QUALITATIVE PV-ANLAGEN IN HANNOVER" (H1 wird per CSS `text-transform:uppercase` als Versalien gezeigt, im Quelltext ebenfalls versal geschrieben)
- H2: 4, H3: 0
- Sektionsfolge: Header (Label "Die Solarfirma in Hannover") -> Zigzag `asset-left` "Solarstrom für Dein Eigenheim" mit CTA "Solaranlage anlegen" -> CTA-Band -> Zigzag "UNSER EXPERTEN-SERVICE / PV-Anlage in 8 Wochen" ("Wir installieren deine Solaranlage bereits in 8 Wochen ...") mit CTA "Jetzt beraten lassen" -> Footer-CTA.
- Trust: konkretes Zeitversprechen "in 8 Wochen". Keine Karte, keine Anfahrtsbeschreibung, keine Ortslisten, keine lokalen Referenzen auf der Seite.

### Karriere `/karriere`

- H1: "Deine Karriere bei Elephant Solar", dann H2 "Derzeit keine offenen Stellen" und "Wir freuen uns jederzeit auf Deine Initiativbewerbung!"
- Dann Team-Grid mit direkten E-Mail-Adressen je Person (z. B. `weidemann@elephantsolar.com`, `celina@elephantsolar.de`, `marketing@elephantsolar.de`).
- Kein Bewerbungsformular, keine Job-Liste.

### Weitere geprüfte Seitentypen

- `/produkte/energiemanagement`: H1 "Verwalte Deine Stromproduktion", Blueprint wie Produktseiten, `fact-grid` mit 3 Kacheln.
- `/produkte/e-mobilitaet`: H1 "Elephant Solar & E-Mobilität", `fact-grid _2-col` (2 Spalten), zusätzlicher Abschnitt `section background-color-secondary`.
- `/elephant-connect`: H1 "Das Elephant Connect Kundenportal", Label "Jetzt neu bei Elephant Solar", Subline "Mit Elephant Connect bleibst Du immer auf dem neusten Stand, sammelst Punkte und vieles mehr!". Extrem dünn: nur Header plus Footer.
- `/danke`: H1 "Vielen dank für deine Anfrage!" (Kleinschreibung "dank" wörtlich), Subline "Unser Team wird sich in Kürze mit Dir in Verbindung setzen.", CTA "Zurück zur Startseite". Bestätigungsseite nach dem Funnel.
- `/produkt/ecoflow-powerocean`: siehe oben.

### Footer (auf allen Seiten identisch)

- 5-Spalten-Grid `footer_grid` mit `grid-template-columns:2fr 1fr 1fr 1fr 1fr`.
- Spalte 1: Logo, Claim "Beratung, Planung und Montage aus einer Hand. Dein Weg zur solaren Unabhängigkeit.", 4 Social-Icons (Instagram, LinkedIn, TikTok, YouTube, alle `target="_blank"`).
- Spalte 2 "Übersicht": Home, Über Uns, Referenzen, Karriere, Blog.
- Spalte 3 "Produkte": Solaranlagen, Stromspeicher, Wärmepumpen, E-Mobilität, Energiemanagement.
- Spalte 4 "Rechtliches": Impressum, Datenschutz, Haftungsausschluss, AGB (AGB ist ein direkter `.docx`-Download auf Webflow-CDN).
- Spalte 5 "Elephant Solar GmbH": Otto-Hahn-Straße 21, 31303 Burgdorf, Tel.: 05136 8042 690, info@elephantsolar.de, Link "Team kontaktieren" (mailto).
- Darunter `footer_mid` mit 4 letzten Blog-Beiträgen (Datum, Kategorie-Label, Titel, Thumbnail), dann `footer_bottom` "2025 © Elephant Solar GmbH / Realisiert durch Weiss Global v6.5.0-production".
- Keine Standortliste, keine Siegel, keine Auszeichnungen, kein Newsletter-Feld im Footer.

### Anfrage-Funnel `/anfrage`

- `<title>`: "Jetzt Angebot Sichern! - Elephant Solar GmbH"
- H1: "In wenigen Schritten zum Angebot!" (steht in Schritt 1)
- H2: 1, H3: 3
- Formular: `id="wf-form-Anfragenformular" name="wf-form-Anfragenformular" method="get" redirect="/danke"`, gerendert als Webflow-Slider `anfrage_slider w-slider` mit 3 Slides.
- Slider-Konfiguration aus dem HTML: `data-autoplay="false"`, `data-animation="slide"`, `data-duration="600"`, `data-easing="ease"`, `data-infinite="false"`, `data-hide-arrows="true"`, `data-disable-swipe="true"`. Navigation läuft über eigene Buttons, die per jQuery die versteckten Slider-Pfeile triggern (`$('#flowbaseSlider').on('click', '.next-button-slide', function() { r.trigger('tap'); })`).

| Schritt | Label | Frage/Typ | Optionen wörtlich | Fortschritt | Button |
|---|---|---|---|---|---|
| 1/3 | "Schritt 1/3 Gebäudetyp" | 3 Kachel-Checkboxen mit Bild (`anfrage_checkbox-grid`) | "Einfamilienhaus", "Mehrfamilienhaus", "Gewerbe" | 3 `anfrage_slide-step-block`, der aktive hervorgehoben, plus Zähler "1/3" | "NÄCHSTER SCHRITT" |
| 2/3 | "Schritt 2/3 PRODUKTE" | 3 Kachel-Checkboxen mit Bild | "Stromspeicher", "Wallbox fürs E-Auto", "Wärmepumpe" | Zähler "2/3" | "ZURÜCK", "NÄCHSTER SCHRITT" |
| 3/3 | "Schritt 3/3 DEINE DATEN" | 4 Texteingaben in 2 Grids (`data-row-top`, `data-row-middle`) | Felder: Vorname (`placeholder="Dein Vorname"`), Nachname (`"Dein Nachname"`), "Deine E-Mail" (`"beispiel@email.de"`), "Deine Telefonnummer" (`"+49 (0) 1234 5678"`) | Zähler "3/3" | "ZURÜCK", Submit "ANGEBOT ANFRAGEN" |

- Persönliche Daten werden erst in Schritt 3 erhoben, nach zwei Qualifizierungsfragen. Alle 4 Felder sind `required`.
- Submit-Zustand: `data-wait="Bitte warten..."`.
- Erfolg/Fehler: `.alert-success` "Vielen Dank für deine Anfrage!", `.alert-error` "Beim Absenden des Formulars ist etwas schiefgegangen. Bitte überprüfe deine Eingaben!", danach Redirect auf `/danke`.
- Kein Preisrechner, kein Live-Ergebnis, kein Fortschrittsbalken (nur numerischer Zähler).
- Microcopy: "kostenfrei" erscheint auf der Seite (im Support-Block), aber nicht direkt am Submit-Button.
- Support-Block unter dem Formular: H3 "Fragen Offen? Kein Problem!", Text "Solltest Du Dir noch unsicher sein, welche Lösung die richtige für Dich ist, helfen Dir unsere Expert/innen gerne weiter und beraten Dich kostenfrei am Telefon!", Team-Foto.
- Zusatz-Script: `https://cdn.jsdelivr.net/gh/weisscompany/cm-code/anfrage-selectcustom.js` (Finsweet `selectcustom`, Version 1), baut Select-Felder um.

## Design-System

### Fonts

Self-hosted auf Webflow-CDN, kein Google-Fonts-Link im HTML (Suche nach `fonts.googleapis`/`fonts.gstatic`: 0 Treffer).

| Familie | Rolle | Gewichte | Datei |
|---|---|---|---|
| DIN Next Condensed | Display, alle Headings und Buttons | 400, 700 | `685c06e823b3608b8d8a90e4_dinnextltpro-condensed.woff.ttf` (400), `685c06e8858796d2fa1fe575_din-next-lt-pro-bold-condensed.otf` (700) |
| DIN Next | Labels (`heading_label`) | 400 | `685c06e8dc0cbdf070b7a6ab_DIN-Next-LT-Pro-Regular.ttf` |
| Inter | Body | 100 bis 900 (Variable) | `685c19bef39588d050287ada_Inter-VariableFont_opsz,wght.ttf` |
| Area | ungenutzt im Live-CSS | 100, 300, 500, 700 | `685c1eb2*_AreaNormal-*.otf` |
| General Sans | ungenutzt im Live-CSS | 200 bis 600 | `685c2189*_GeneralSans-*.otf` |
| DM Sans | ungenutzt im Live-CSS | 100 bis 1000 (Variable) | `685c228df14f8957a0be558d_DMSans-VariableFont_opsz,wght.ttf` |

Alle mit `font-display:swap`. Reihenfolge der Häufigkeit im CSS: `DIN Next Condensed,Trebuchet MS,sans-serif` 13x, `General Sans` 5x, `Area` 4x, `DIN Next,Trebuchet MS,sans-serif` 2x, `Inter,Trebuchet MS,sans-serif` 1x.

Body-Regel wörtlich: `body { color:var(--base-color-text--text-primary); letter-spacing:-.015rem; font-family:Inter,Trebuchet MS,sans-serif; font-size:1rem; font-weight:400; line-height:1.4 }`

### Farben

CSS-Custom-Properties aus `:root` in `css-shared.css`:

| Token | Wert | Rolle |
|---|---|---|
| `--base-color-brand-elephant-solar--brand` | `#00322f` | Primärfarbe Solar (dunkles Petrol) |
| `--base-color-brand-elephant-solar--brand-dark` | `#002422` | Footer-Hintergrund |
| `--base-color-brand-elephant-solar--brand-light` | `#034227` | |
| `--base-color-brand-elephant-solar--brand-gradient-light` | `#225530` | Gradient-Start |
| `--base-color-brand-elephant-solar--brand-gradient-dark` | `#042422` | Gradient-Ende |
| `--base-color-brand-elephant-solar--brand-contrast` | `#e6fa00` | Akzent (Neon-Gelbgrün) |
| `--base-color-brand-elephant-therm--brand` | `#2c98db` | Sekundärfarbe Wärmepumpen-Marke |
| `--base-color-brand-elephant-therm--brand-contrast` | `#e74b75` | Akzent Wärmepumpen-Marke |
| `--base-color-neutral--white` | `#fff` | |
| `--base-color-neutral--neutral-lightest` | `#eee` | |
| `--base-color-neutral--neutral-lighter` | `#ccc` | |
| `--base-color-neutral--neutral-light` | `#aaa` | |
| `--base-color-neutral--neutral` | `#666` | |
| `--base-color-neutral--neutral-dark` | `#444` | |
| `--base-color-neutral--neutral-darker` | `#222` | |
| `--base-color-neutral--neutral-darkest` | `#111` | Text primär |
| `--base-color-system--success-green` | `#58ac4f` | |
| `--base-color-system--warning-yellow` | `#e0bf51` | |
| `--base-color-system--error-red` | `#d14444` | |
| `--base-color-system--focus-state` | `#2d62ff` | |

Semantische Aliase: `--base-color-text--text-primary` -> `neutral-darkest`, `--base-color-links--link-primary` -> `#00322f`, `--base-color-backgrounds--background-primary` -> `#fff`, `--base-color-backgrounds--background-alternate` -> `#aaa`, `--base-color-backgrounds--background-secondary` -> `#eee`, `--base-color-backgrounds--background-dark` -> `#222`, `--base-color-backgrounds--background-tertiary` -> `#00322f`.

Häufigste Farbwerte im CSS (roh gezählt): `#fff` 32x, `#0000` (transparent) 29x, `#000` 18x, `#1e1e1e00` 9x, `#222` 7x, `#ddd` 6x, `#ccc` 5x, `#1e1e1ee6` 5x, `#1e1e1ecc` 5x, `#ffffff14` 5x, `#00000080` 5x, `#75869600` 5x (Webflow-Twitter-Shim), `#fff0` 5x, `#e6fa00` 4x (Akzent), `#1e1e1e99` 4x, `#333` 4x, `#fefff7` 3x, `#f5f5f5` 3x, `#0006` 3x, `#efeeec1a` 3x, `#fafafa` 3x, `#c8c8c8` 3x.

Zuordnung: Akzent auf Buttons und Zahlen ist `#e6fa00` (`.color-accent-5`, `.stats_title`, `.footer_column-title`, `hero-text-span`), Primärbutton-Hintergrund ist der Gradient `linear-gradient(156deg,#225530,#042422)` über `#00322f`, Seitenhintergrund ist `#fff`, Fließtext `#111`.

### Radius

| Wert | Anzahl | Verwendung |
|---|---|---|
| `1rem` | 8 | Bild-Container, CTA-Karte, Footer-CTA, Review-Item, Testimonial-Item, Product-Tabs |
| `.4rem` | 3 | Navbar-Link, Navbar-Dropdown-Toggle, Footer-Blog-Label |
| `.6rem` | 3 | Navbar-Item, Tabs-Menü, Product-Card-Notice |
| `.5rem` | 2 | Footer-Blog-Link |
| `16px` | 1 | Referenz-Karte |
| `14px 14px 0 0` | 1 | Referenz-Bild |
| `5px` | 1 | Vorteile-Card-Bild |
| `.45em` | 1 | Button |
| `.75rem` | 1 | Vorteile-Card |
| `100px` | 1 | Avatare |

Buttons sind leicht gerundet (`.45em`, etwa 7px bei 16px Schrift), nicht pill. Karten liegen bei 1rem, kleine Steuerelemente bei .4 bis .6rem.

### Shadows

| Wert | Verwendung |
|---|---|
| `0 1px 1px #2223,0 4px 8px #2020200d` | `.button_content` (Standardbutton) |
| `0 24px 64px #e0e0e07a` | `.referenz_item:hover` |
| `2px 1px 10px #0003` | `.footer-cta` |
| `0 2px 5px #0003` | ein Element |
| `0 0 3px #3336` | ein Element |

Die meisten Buttons und Karten sind shadow-frei; der Schatten ist ein Sonderfall für den Primärbutton und den Referenz-Hover.

### Spacing und Container

- Container: `.padding-global { width:90%; max-width:1280px; margin-left:auto; margin-right:auto }`. Innerer `.container { width:100% }`.
- Section-Padding-Tokens: `xsmall` und `small` 2rem/2rem, `medium` 4rem/4rem, `large` 5rem/5rem, `xlarge` 6rem/6rem, `section` 11rem oben/3rem unten, `full` 11rem oben, `legal` 3rem/4rem, `cta` 3rem/3rem, `vorteile` 5rem oben mit `margin-bottom:-12rem` (zieht die nächste Sektion hoch).
- Margin-Skala: `xxsmall` .25rem, `xsmall` .5rem, `small` 1rem, `medium` 1.5rem, `large` 2.5rem, `xlarge` 3rem, `huge` 5rem.
- Grid-Gaps: `layout_content` 5rem (Desktop), 3rem (Tablet), 2rem (Mobil). `vorteile_card-grid` 48px, dann 64px ab Tablet. `stats_grid` 2rem. `review_list` 1.5rem. `referenzen_list` 2rem.
- `.main-wrap { margin-top:6.25rem }` gleicht die fixe Navigation aus.
- Max-Width-Utilities: `max-width-small` 36rem, `max-width-medium` 40rem, `max-width-large` 48rem.

### Typo-Skala

| Element | Größe | Gewicht | Line-Height | Sonstiges |
|---|---|---|---|---|
| Body | 1rem | 400 | 1.4 | `letter-spacing:-.015rem`, Inter |
| H1 `.heading-style-h1` | 4.75rem, ab 991px 4rem | 700 | 1 | uppercase, `padding-top:.75rem`, DIN Next Condensed |
| H1 Hero `.is-hero` | **13.5vw** (Viewport-Breite, kein clamp) | 700 | 1 | uppercase, Farbe `#fff` |
| H1 `.is-future-hero` | 18vw | 700 | 1 | für Aktionsseiten |
| H2 `.heading-style-h2` | 4rem, ab 991px 3rem | 700 | 1 | uppercase, `padding-top:.5rem` |
| H3 `.heading-style-h3` | 3.5rem, ab 991px 2.75rem | 700 | 1.1 | uppercase, `margin-bottom:-.5rem` |
| H4 `.heading-style-h4` | 2.75rem, ab 991px 2.25rem | 700 | 1 | uppercase |
| H5 `.heading-style-h5` | 2.25rem | 700 | 1 | uppercase |
| H6 `.heading-style-h6` | 1.75rem | 700 | 1.2 | uppercase |
| `.heading_label` | 1.1rem, mobil .9rem | 400 | | `letter-spacing:.2rem`, uppercase, DIN Next, Farbe `#002422` |
| `.heading_label.is-xsmall` | .875rem | | | |
| `.heading_label.is-small` | 1rem | | | |
| `.stats_title` | 4.25rem | 700 | 1 | Farbe `#e6fa00` |
| `.text-size-large` | 1.25rem | | | |
| `.text-size-medium` | 1.1rem | | | |
| `.text-size-regular` | .9rem | | | |
| `.text-size-small` | .875rem | | | |
| `.text-size-xsmall` | .75rem | | | oft mit `opacity:.75` |
| `.button_text` (DIN-Variante) | 130% der Button-Basis | 700 | 1 | uppercase, `padding-top:.25rem` |
| `.button_wrap` | .975rem Basis, Varianten 1.05rem (large) und .9rem (small) | | | |

Header sind ausnahmslos uppercase und laufen auf `line-height:1`, das erzeugt den gestapelten Plakat-Look. Der Hero-H1 nutzt `13.5vw` ohne `clamp`, wird also auf sehr breiten Screens sehr groß.

### Tech-Stack

- **CMS/Framework**: Webflow. Marker: `<html data-wf-domain=... data-wf-page=... data-wf-site=...>`, Klassen-Präfix `w-`, `w-dyn-list`/`w-dyn-item` (Webflow CMS Collections), `w-tabs`, `w-slider`, `w-lightbox`, `w-nav`.
- **JS-Bundle**: `elephant-solar.72189e40.f01d55637de457f1.js` (Startseite, 4632 Bytes Loader) und `elephant-solar.abbb8c8f.c96486ff3e546f21.js` (Anfrage-Seite). Webpack-Runtime `r.rv=()=>"1.3.9"`, 15 Lazy-Chunks unter `elephant-solar.achunk.*.js`.
- **IX2-Daten**: im Chunk `20825e247acf075b.js` (58497 Bytes). 17 Action Lists, darunter "Navbar [Enter]", "Navbar [Leave]", "Navbar menu [Open]", "Navbar Dropdown [Open] [Desktop]", "Navbar item [Hover On]", "Hero WP [Hover On]", "Hero Solar [Hover On]", "New Scroll Animation", "Vorteile Card", "Hide Popup". 76 Events, überwiegend `PAGE_SCROLL_UP`/`PAGE_SCROLL_DOWN` (Navbar-Ein-/Ausblenden), dazu `MOUSE_OVER`/`MOUSE_OUT`, `SCROLL_INTO_VIEW` und drei `SCROLLING_IN_VIEW` (Scroll-Progress-Animationen).
- **jQuery**: 3.5.1 (`d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=68550e77989ff2ca782e92f7`), Webflow-Standard.
- **Analytics/Tracking**: GTM `GTM-PGTHZVGZ`, gtag mit Ads-ID `AW-17262388604`, Hotjar `hjid:5135716`, Herofil.es OnSite `RH-832-460-718` (`trk.herofil.es/onsite/onsite.js`).
- **Consent**: Cookie-Script (`cdn.cookie-script.com/s/6e74b28322f7db8b122e5dcb86fbafc5.js`).
- **Video**: Bunny Stream (`websitefilesde.b-cdn.net/c/elephant/Elephants%20Solar%20-%20Testimonial%20Supercut.mp4`), Auslieferung als HLS mit `hls.js@1.6.11` (Fallback auf natives HLS in Safari via `video.canPlayType('application/vnd.apple.mpegurl')`), `maxBufferLength: 10`. Zusätzlich 24 iframe-Einbettungen auf `iframe.mediadelivery.net` in den `w-json`-Lightbox-Daten.
- **Slider**: Splide (latest) mit `splide-extension-auto-scroll@0.5.3` für den Logo-Marquee. Der Testimonial-Slider und der Referenz-Slider laufen nicht über Splide, sondern über eigenes GSAP-`horizontalLoop`.
- **Formular-Erweiterung**: Finsweet `@finsweet/attributes-selectcustom` v1 über `cdn.jsdelivr.net/gh/weisscompany/cm-code/anfrage-selectcustom.js`.

### Bilder

- Formate auf der Startseite: AVIF 93 Vorkommen, PNG 50, JPG 16, WEBP 11, SVG 1. AVIF ist das Standardformat für Fotos.
- `loading="lazy"`: 54 Bilder, `loading="eager"`: 1 (Google-Review-Logo im Hero).
- `srcset`: 25 Bilder mit 4 bis 7 Breitenstufen (500w, 800w, 1080w, 1600w, 2000w, 2600w, 3200w je nach Original).
- `fetchpriority`: 0 Vorkommen. Das Hero-Video hat kein `poster`-Attribut, sondern einen CSS-Background als Platzhalter.
- Alle Bilder liegen auf `cdn.prod.website-files.com` beziehungsweise `cdn.prod.website-files.com/6858805fd5972115a2906fe6` (zweite Collection-Site-ID).
- Alt-Texte sind fast durchgehend leer (`alt=""`). Ausnahmen: `alt="Kundenmeinung Oliver B."`, `alt="Kundenrezension Anlauf"`, `alt="Kundenmeinung Joern S."`, `alt="Elephant Solar - Ihre PV Experten"`.

### Accessibility-Hinweise (aus dem Markup)

- `prefers-reduced-motion`: **nicht vorhanden**. Weder im CSS (0 Treffer in beiden Stylesheets) noch in den Inline-Styles noch im Custom-JS. Splide hat eine `reduceMotion`-Konfiguration, die ist aber nur mit `speed:0, rewindSpeed:0, autoplay:"pause"` gesetzt und greift nicht für die GSAP-Animationen.
- Fokus-Ring: `*[tabindex]:focus-visible { outline:0.125rem solid #4d65ff; outline-offset:0.125rem }`, plus `--base-color-system--focus-state:#2d62ff`.
- Slider-Buttons haben `aria-label` ("previous slide", "next slide"), Bullets setzen `aria-selected` und `aria-controls`.
- Der Anfrage-Slider hat keine `aria-live`-Region für den Schrittwechsel.

## Animationen

### Transitions (alle Deklarationen aus beiden Stylesheets)

| Selektor | Transition |
|---|---|
| `.button_content` | `all .2s` |
| `.button_wrap` | `all .2s` |
| `.navbar_link` | `background-color .2s` |
| `.navbar_dropdown-toggle` | `background-color .2s` |
| `.banner_brand` | `color .2s` |
| `.footer_logo` | `transform .2s` |
| `.referenz_item` | `all .3s` |
| `.testimonial-slider_item` | `opacity .25s cubic-bezier(.77,0,.175,1)` |
| `.centered-slider-button` | `background-color .3s, color .3s, transform .3s` |
| `.dropdown-chevron` (o. ä.) | `transform .3s, background-color .3s, color .3s` |
| weitere | `height .5s`, `border-color .2s, background-color .2s`, `color .2s`, `background-color .1s, color .1s` |

Nur ein einziger `cubic-bezier`-Wert existiert im ganzen CSS: `cubic-bezier(.77,0,.175,1)` (das ist `easeInOutQuart`-ähnlich), verwendet auf `.testimonial-slider_item`.

### @keyframes

Im ausgelieferten CSS existiert genau **eine** Keyframe-Animation: `spin` (Webflow-Standard, `.8s linear infinite`, für den Lightbox-Spinner). Keine eigene Keyframe-Animation auf der Seite.

### Motion-Libraries

| Library | Version | Zweck | Beleg |
|---|---|---|---|
| GSAP | 3.14.1 | Slider-Physik, Autoplay-Steuerung | `gsap.min.js` in `home.html` |
| GSAP ScrollTrigger | 3.14.1 | Autoplay an/aus je Sichtbarkeit | `ScrollTrigger.create({ trigger: sliderWrapper, start:'top bottom', end:'bottom top', onEnter: startAutoplay, ... })` |
| GSAP Draggable | 3.14.1 | Karten-Drag im Testimonial-Slider | `Draggable.create(proxy, { type:'x', inertia:true, ... })` |
| GSAP InertiaPlugin | 3.14.1 | Auslauf/Momentum nach dem Drag | `typeof InertiaPlugin === 'undefined' && console.warn('InertiaPlugin required for momentum-based scrolling and snapping...')` |
| GSAP CustomEase | 3.14.1 | eigene Ease-Kurve `osmo-ease` | `CustomEase.create('osmo-ease', '0.625, 0.05, 0, 1')` |
| Splide | latest | Logo-Marquee | `new Splide(".splide", { type:"loop", autoWidth:true, drag:"free", arrows:false, pagination:false, autoScroll:{ speed:.5 } })` |
| Splide auto-scroll | 0.5.3 | Endlos-Scroll der Logos | `splide-extension-auto-scroll.min.js` |
| HLS.js | 1.6.11 | Hero-Video-Streaming | `new Hls({ maxBufferLength: 10 })` |
| Webflow IX2 | nativ | Navbar, Hover, Scroll-Progress | `actionLists`-Objekt im Chunk `20825e247acf075b.js` |

Kein Lenis, kein AOS, kein Framer Motion, kein Lottie, kein Rive, kein Three.js. Kein `data-w-id`-basierter IX2-Trigger für die Vorteile-Karten (das läuft als IX2 `SCROLLING_IN_VIEW`, siehe unten).

### Scroll-Reveal-Muster

Kein klassisches Fade-up beim Scrollen. Stattdessen drei Muster:

1. **IX2-Scroll-Progress auf den Vorteile-Karten** (Action List `a-19` "Vorteile Card", Event `e-97`, `SCROLLING_IN_VIEW`): `type:"SCROLL_PROGRESS"`, Keyframe 0 -> `yValue: 2.5rem`, Keyframe 100 -> `yValue: -2.5rem`. Die Karten wandern also über die Scrollstrecke um 5rem nach oben. `smoothing: 50`. Betrifft die Karten mit `data-w-id` `4c90e029-...934` und `...940`.
2. **IX2-Scroll-Progress auf einer weiteren Karte** (Action List `a-16` "New Scroll Animation", Events `e-94` und `e-98`): Keyframe 0 -> `yValue: 50px`, Keyframe 80 -> `yValue: -50px`, Keyframe 100 -> `yValue: -75px`, jeweils `duration:500`. Betrifft `...928`.
3. **Webflow-Standard-Reveal über `style="opacity:0"`**: Die Elemente `4c90e029-...922` (Label) und `...924` (H2) haben im HTML `style="opacity:0"` und werden von IX2 beim Scrollen eingeblendet. Zusätzlich liegen dort `data-w-id`-Trigger für die Karten.

### Weitere Animationen

- **Marquee**: Splide mit `autoScroll.speed .5` auf Desktop, `.8` unter 991px und unter 767px. Das `.splide`-Element ist 4rem hoch und hat eine horizontale Maske `mask-image: linear-gradient(90deg,#0000,#000,#000,#000,#0000)`, die Logos laufen also an beiden Rändern aus.
- **Zähler-Animation**: keine gefunden. Die Zahlen in `.stats_title` (2000+, 30000+, 12000+, 500+) stehen als statischer Text im HTML.
- **Parallax**: nur die IX2-Scroll-Progress-Verschiebungen oben, kein echtes Multi-Layer-Parallax.
- **Sticky**: `.navigation { position:fixed; inset:0% 0% auto; z-index:999 }`. Die Navbar blendet sich per IX2 über `PAGE_SCROLL_DOWN` (Action List `a-2` "Navbar [Leave]") und `PAGE_SCROLL_UP` (Action List `a` "Navbar [Enter]") aus und ein, jeweils via `TRANSFORM_MOVE` auf `.navigation` mit `yValue: 0` bzw. `yValue: -2.35rem` und `easing:"easeInOut", duration:250`.
- **Video-Autoplay**: Hero-Video mit `data-player-autoplay="true"`, `video.muted = true`, `video.loop = true`. Ein `IntersectionObserver` mit `threshold: 0.1` startet und stoppt die Wiedergabe beim Verlassen des Viewports.
- **Hover-Effekte**:
  - `.button_wrap:hover { opacity:.9; transform:translateY(-.15rem) }` mit `transition: all .2s`
  - `.referenz_item:hover { box-shadow:0 24px 64px #e0e0e07a }` mit `transition: all .3s`
  - `.footer_logo:hover { transform:scale3d(.97,.97,1.01) }`
  - `.footer_social:hover { transform:scale(.95) }`
  - `.navbar_link:hover`, `.navbar_dropdown-toggle:hover { background-color:#18432b1a }`
  - `.banner_brand.is-solar:hover { color:#e6fa00 }`, `.is-therm:hover { color:#2c98db }`
  - IX2 `a-11`/`a-12` "Navbar item [Hover On]/[Off]": `TRANSFORM_SCALE` auf `.navbar_bg-image` von 1 auf 1.075 und zurück, `easing:[.684,.205,0,.72]`, `duration:300`.
  - IX2 `a-13`/`a-14`, `a-20`/`a-21` "Hero WP/Solar [Hover On]/[Off]": `STYLE_OPACITY` auf `.hero_image-wrap.is-therm` bzw. `.is-solar` von 0 auf 1, `duration:250`. (Diese Listen zielen auf Klassen, die im aktuellen Live-HTML der Startseite nicht mehr vorkommen, der Hero nutzt inzwischen das Video. Die Action Lists sind also vermutlich verwaist.)
- **Mobile-Menü** (IX2 `a-5` "Navbar menu [Open]"): `.menu-icon_line-middle` `STYLE_SIZE` auf `widthValue:0, duration:200, easing:"inOutQuint"`, `.menu-icon_line-top` und `-bottom` `TRANSFORM_MOVE` `yValue:8` bzw. `-8` mit `duration:400`, dann `TRANSFORM_ROTATE` auf `-45deg` bzw. `45deg` mit `duration:600`, alles `inOutQuint`. Ergibt das X.
- **Dropdown** (IX2 `a-7` "Navbar Dropdown [Open] [Desktop]"): `.navbar_dropdown-list` `STYLE_OPACITY` 0 -> 1 und `.dropdown-chevron` `TRANSFORM_ROTATE` auf `zValue:180`, beides `duration:300, easing:"ease"`.
- **Testimonial-Slider**: Autoplay über `gsap.delayedCall(autoplayDuration, repeat)` mit `autoplayDuration = 8` Sekunden (Attribut `data-slider-autoplay-duration="8"`). Der Übergang läuft über `loop.next({ ease:'osmo-ease', duration: 0.725 })` mit `CustomEase.create('osmo-ease', '0.625, 0.05, 0, 1')`. Inaktive Slides haben `opacity:0.45`, der aktive Slide bekommt volle Deckkraft, gesteuert über `.testimonial-slider_row:has(.testimonial-slider_item.active) .testimonial-slider_item:not(.active) { opacity: 0.45 }`. Hover auf dem Slider stoppt das Autoplay (`sliderWrapper.addEventListener('mouseenter', stopAutoplay)`), Verlassen startet es neu, wenn der Slider im Viewport ist.
- **Marquee-Ease** für den Logo-Slider ist Splides eigene `autoScroll`-Mechanik, nicht konfigurierbar über GSAP.

### Reduced-Motion-Handling

**Nicht vorhanden.** Kein `prefers-reduced-motion` in `css-shared.css`, `css-page.css`, den Inline-Styles oder `elephant-solar.72189e40.f01d55637de457f1.js`. Das einzige Zugeständnis ist Splides `reduceMotion: { speed: 0, rewindSpeed: 0, autoplay: "pause" }` im Splide-Aufruf, das aber nur den Auto-Scroll-Marquee betrifft, nicht die GSAP-Slider, nicht das Video-Autoplay und nicht die IX2-Scroll-Animationen.

## Synthese

### 1. Seitentyp-Blueprints

**Startseite** (14 Top-Level-Blöcke in `<main class="main-wrap">`, plus Banner und Footer außerhalb):

1. Banner + fixe Nav (`position:fixed`, Banner mit Live-Uhr + Marken-Umschalter, Nav mit Dropdown, Telefon-Button, CTA-Button)
2. Hero Full-bleed `height:110vh`, Text links 50%, H1 zweigeteilt und verlinkt, 2 CTAs, Trust-Cluster unter dem Text (Avatare + Sterne + Partner-Badge), Autoplay-HLS-Video als Hintergrund
3. Leerer `div.section` direkt nach dem Hero (kein Inhalt, reiner Abstandshalter)
4. Logo-Marquee (Splide autoScroll, Maske), Label "Wir setzen auf Qualitätsmarken"
5. `divider`
6. Benefits 3er-Grid (`vorteile_card-grid`, Gradient-Karten, Bild oben) mit zentriertem Label + H2
7. Stats 4er-Grid (`stats_grid`) auf Gradient-Band, Zahlen in `#e6fa00`, `.stats_title` 4.25rem
8. Testimonial-Slider (GSAP horizontalLoop, zentriert, 4 Karten, inaktive 45%, Autoplay 8s, keine Bullets)
9. CTA-Band Gradient (`layout_content.is-cta` 1.5fr/.75fr) mit `cta_card` (backdrop-blur, 1rem Radius), Button + Telefonnummer
10. Produkt-Tabs (`w-tabs`, 5 Tabs mit Icon + Label) mit Produktkarten je Pane, Abschluss "Auf Wunsch installieren wir auch gerne Produkte von anderen Herstellern Deiner Wahl!"
11. Zigzag "Schnellster Service" (Express-Montage, 2-Spalten 50/50) + `divider-horizontal`
12. Zigzag "Dein Partner in Sachen Energie und Wärme" (2-Spalten `asset-left`, Bild links)
13. Google-Reviews 3er-Grid (`review_list`) auf Gradient, Maske unten
14. Referenzen-Teaser 3er-Grid + "1000+ weitere ansehen"
15. Footer-CTA-Karte (`margin-top:-15rem`, überlappt) + 5-Spalten-Footer mit Blog-Teaser

**Produktseite** (Blueprint für alle 5 Kategorieseiten):

1. `section_header`, zentriert schmal, Brotkrumen-Label "Produkte ❯ X", H1 in `heading-style-h2`, 1 Subline
2. Zigzag-Feature 2-Spalten 50/50 (Text links, Bild rechts) mit Label, H2, Text, Primär-CTA
3. Divider
4. Fakten-Grid `fact-grid` 3er-Grid mit 5 bis 6 `fact-grid_item` (H3 + 1 Satz)
5. Optional: zweites Zigzag-Feature `asset-left` (Bild links) mit Marken-Label und Spec-Zahlen, CTA
6. CTA-Band Gradient mit `cta_card` und Telefonnummer
7. Optional: weitere Zigzags
8. Footer-CTA
9. Footer

**Über-uns**:

1. `section_header is-image` (Bild-Header mit `padding-bottom:12rem`)
2. Mission (Label + H2 + Fließtext)
3. Vision (Label + H2 + Fließtext + CTA)
4. Team-Sektion 1 (H2 + Grid aus Personen-Karten mit Foto, Position, Name)
5. Team-Sektion 2 (dito, andere Abteilung)
6. Team-Sektion 3 (dito)
7. Cross-Sell auf Schwestermarke (H2 + externer Link)
8. Recruiting-CTA (H2 + 2 Buttons)
9. Footer-CTA + Footer

**Ratgeber-Übersicht**:

1. `section_header` zentriert mit Label, H1, Subline
2. `collection-list` 3er-Grid, Karten mit Bild + Kategorie-Overlay, Datum, H3-Titel, Anreißer, Autor-Zeile
3. Footer-CTA + Footer

**Artikel**:

1. `section background-color-secondary` Header mit Label-Zeile "Kategorie • Datum", H1, Intro-Absatz
2. Divider
3. 2-Spalten `blogpost_content-grid`: links `w-richtext`, rechts Sidebar mit Bild, "Veröffentlicht am/Kategorie/Veröffentlicht von/Copyright", Divider, Logo-Grid
4. Footer-CTA + Footer

**Funnel `/anfrage`**:

1. Optionaler Header
2. Slider mit 3 Slides: Schritt 1 Gebäudetyp (3 Bild-Kacheln, Checkbox), Schritt 2 Produkte (4 Bild-Kacheln, Checkbox), Schritt 3 Kontaktdaten (4 Inputs)
3. Jeder Slide: Label "SCHRITT n", H3, Erklärtext, Fortschrittsblöcke, Kachel-Grid, Zähler "n/3", Buttons
4. Support-Block mit H3 "Fragen Offen? Kein Problem!" und Team-Foto
5. `/danke`-Seite mit H1 "Vielen dank für deine Anfrage!"
6. Footer-CTA + Footer

**Standortseite**:

1. `section_header` zentriert mit Label "Die Solarfirma in X", H1 in Versalien, Subline
2. Zigzag `asset-left` (Bild links) mit H2 + Nutzen-Text + CTA
3. CTA-Band
4. Zigzag (Text links) mit Zeitversprechen "PV-Anlage in 8 Wochen" + CTA
5. Footer-CTA + Footer

### 2. Die 5 stärksten Muster

**Muster 1: Ein einziger Funnel, neun verschiedene Button-Labels.** Jeder Button auf jeder Seite führt zum selben Formular, nur die Beschriftung wird kontextuell getauscht: "Jetzt Angebot sichern", "Jetzt Gespräch vereinbaren", "Energiewende starten", "Solaranlage anlegen", "Stromspeicher anlegen", "Jetzt beraten lassen", "Jetzt Angebot einholen". Beleg: `home.html` hat 5 Links auf `/anfrage`, `solaranlagen.html` 2 mit unterschiedlichen Labels, im Nav-Header steht immer "Jetzt Angebot sichern" (`<a href="/anfrage" ...><div class="button_text ...">Jetzt Angebot sichern</div>`). Das senkt die Reibung: ein Ziel, viele Anlässe.

**Muster 2: Trust wird in vier Stufen gestaffelt, nicht geballt.** Stufe 1 im Hero (5 Avatare, "Mehr als 1000+ zufriedene Kunden", "5.0/5.0 auf" mit Google-Logo, EcoFlow-Partner-Badge), Stufe 2 in der Mitte (4 harte Zahlen: "2000+", "30000+", "12000+", "500+" in Akzentgelb auf Gradient), Stufe 3 als Textbeweis (6 namentliche Google-Rezensionen), Stufe 4 als Ortsbeweis (Referenz-Karten mit PLZ, kWp und Modulzahl). Beleg: `home.html` Hero-Block `<div class="rating-block_title">Mehr als<span class="text-color-brandcontrast"> 1000+ </span>zufriedene Kunden</div>`, Stats `<div class="stats_title">2000<span class="color-accent-5">+</span></div>`, Reviews `<div class="text-size-xsmall">Kund*in auf Google Maps</div>`, Referenzen `<h3 class="heading-style-h5">11,76 kWp, 28 Module</h3>` mit Label `31275 Lehrte`.

**Muster 3: Produkttrennung über eine zweite Marke mit eigener Farb- und Domain-Struktur.** Die Wärmepumpen laufen unter "Elephant Therm" mit eigenem Blau (`#2c98db`) und eigenem Rot-Akzent (`#e74b75`) und verlinken auf `elephanttherm.de`. Beleg in `css-shared.css`: `--base-color-brand-elephant-therm--brand:#2c98db; --base-color-brand-elephant-therm--brand-contrast:#e74b75`, in `home.html` der Banner: `<a href="https://elephanttherm.de" target="_blank" class="banner_brand is-therm">...<div class="banner_brand-text">Elephant <span class="text-weight-400">Therm</span></div></a>`, und `waermepumpen.html` trägt die Klasse `section_header is-therm`.

**Muster 4: Der Footer-CTA ist eine schwebende Karte, die in den Footer hineinragt.** `.footer-cta { backdrop-filter:blur(8px); background-image:linear-gradient(153deg,#225530cc,#042422cc); border-radius:1rem; margin-top:-15rem; box-shadow:2px 1px 10px #0003 }` liegt über dem Footer-Bild und erzeugt einen weichen Übergang vom Inhalt in den dunklen Fuß. Beleg: `home.html` `<section data-wf--cta-footer--variant="elephant-solar" class="section_footer-cta">`, CSS `.section_footer-cta { margin-top:15rem; margin-bottom:-7.5rem }` kombiniert mit `.footer-cta { margin-top:-15rem }`.

**Muster 5: Der 3-Schritt-Funnel stellt die einfachsten Fragen zuerst und die Kontaktdaten zuletzt.** Schritt 1 Gebäudetyp (3 Kacheln, ein Klick), Schritt 2 Produkte (4 Kacheln, ein Klick), erst Schritt 3 verlangt Name, E-Mail und Telefon. Beleg: `anfrage.html`, Schritt 1 `<div class="heading_label is-contrast is-small">Schritt 1</div>` mit 3 `anfrage_checkbox`, Schritt 3 `<div class="heading_label is-contrast is-small">SCHRITT 3</div><h3 class="heading-style-h4 text-color-white">Deine Kontaktdaten</h3>` mit 4 `required`-Inputs. Dazu die Begründung als Microcopy im Formular: "Diese benötigen wir, damit sich unser Team so schnell wie möglich mit Deinem individuellen Angebot bei Dir melden kann."

### 3. Animation-Rezepte

**Rezept 1: Endlos-Karussell mit Drag und Autoplay (GSAP horizontalLoop).** Exakte Werte von der Seite: benutzerdefinierte Ease `CustomEase.create('osmo-ease', '0.625, 0.05, 0, 1')`, Autoplay-Intervall 8 Sekunden aus `data-slider-autoplay-duration="8"`, Übergangsdauer `0.725s`, Padding `paddingRight: 28`, Drag über `Draggable.create(proxy, { type:'x', inertia:true })`, Start/Stopp über `ScrollTrigger.create({ trigger: sliderWrapper, start:'top bottom', end:'bottom top' })`.

```js
gsap.registerPlugin(CustomEase, ScrollTrigger, Draggable, InertiaPlugin);
CustomEase.create('osmo-ease', '0.625, 0.05, 0, 1');
const loop = horizontalLoop(slides, {
  paused: true, draggable: true, center: row, paddingRight: 28,
  onChange: (el, i) => { /* active-Klasse setzen */ },
});
loop.toIndex(0, { duration: 0.01 });
const autoplayDuration = 8;                 // aus data-slider-autoplay-duration
loop.next({ ease: 'osmo-ease', duration: 0.725 });
```

**Rezept 2: Logo-Marquee mit Randauslauf (Splide autoScroll).** Exakte Werte: `type:"loop"`, `autoWidth:true`, `drag:"free"`, `arrows:false`, `pagination:false`, `autoScroll.speed .5` (Desktop), `.8` unter 991px und unter 767px. Die Maske kommt aus dem CSS: `.splide { height:4rem; mask-image:linear-gradient(90deg,#0000,#000,#000,#000,#0000) }`, `.splide__list { grid-column-gap:4rem }`, `.splide__slide { cursor:grab; min-width:120px }`.

```js
new Splide(".splide", {
  type: "loop", autoWidth: true, height: "auto", drag: "free",
  arrows: false, pagination: false, label: "Image Slider",
  reduceMotion: { speed: 0, rewindSpeed: 0, autoplay: "pause" },
  autoScroll: { speed: .5 },
  breakpoints: { 991: { autoScroll: { speed: .8 } }, 767: { autoScroll: { speed: .8 } } }
}).mount(window.splide.Extensions);
```

**Rezept 3: Navbar versteckt sich beim Scrollen nach unten (Webflow IX2).** Exakte Werte aus Action List `a-2` "Navbar [Leave]" und `a` "Navbar [Enter]": `TRANSFORM_MOVE` auf `.navigation`, `yValue: -2.35rem` beim Verlassen und `yValue: 0` beim Zurückkehren, jeweils `easing:"easeInOut", duration:250`. Ausgelöst von `PAGE_SCROLL_DOWN` (Event `e-2`) und `PAGE_SCROLL_UP` (Event `e-3`). Base-State: `.navigation { position:fixed; inset:0% 0% auto; z-index:999 }`.

```js
// Äquivalent ohne IX2
gsap.to('.navigation', { y: '-2.35rem', duration: 0.25, ease: 'power1.inOut' }); // scroll down
gsap.to('.navigation', { y: 0,       duration: 0.25, ease: 'power1.inOut' }); // scroll up
```

**Rezept 4: Karten wandern gegen die Scrollrichtung (IX2 Scroll-Progress).** Exakte Werte aus Action List `a-19` "Vorteile Card": `type:"SCROLL_PROGRESS"`, Keyframe 0 -> `TRANSFORM_MOVE yValue: 2.5rem`, Keyframe 100 -> `TRANSFORM_MOVE yValue: -2.5rem` mit `easing:"inOutExpo", duration:500`, `smoothing: 50`. Ausgelöst von `SCROLLING_IN_VIEW` (Event `e-97`). Die zweite Variante `a-16` "New Scroll Animation" nutzt drei Keyframes: 0 -> `y:50px`, 80 -> `y:-50px`, 100 -> `y:-75px`.

```js
// Äquivalent: Karte hebt sich um 5rem über die Scrollstrecke
gsap.to('.vorteile_card', {
  y: '-2.5rem', ease: 'expo.inOut',
  scrollTrigger: { trigger: '.vorteile_card', start: 'top bottom', end: 'bottom top', scrub: 0.5 }
});
```

**Rezept 5: Button-Hover mit Lift.** Exakte Werte: `.button_wrap { transition: all .2s }` und `.button_wrap:hover { opacity:.9; transform:translateY(-.15rem) }`. Der Button-Inhalt selbst hat `.button_content { border-radius:.45em; transition:all .2s; box-shadow:0 1px 1px #2223,0 4px 8px #2020200d }`.

```css
.button_wrap { transition: all .2s; }
.button_wrap:hover { opacity: .9; transform: translateY(-.15rem); }
```

**Rezept 6: Karten-Hover mit großem Farbschatten.** Exakte Werte: `.referenz_item { border-radius:16px; border:.5px solid #eaedf0; transition:all .3s }` und `.referenz_item:hover { box-shadow:0 24px 64px #e0e0e07a }`.

```css
.referenz_item { border-radius: 16px; border: .5px solid #eaedf0; transition: all .3s; box-shadow: none; }
.referenz_item:hover { box-shadow: 0 24px 64px #e0e0e07a; }
```

Alle sechs Rezepte stammen aus wörtlich ausgelesenen Werten. Nicht belegbar: ob und wie die IX2-Listen auf Touch-Geräten abweichen, dafür liefert das ausgelieferte HTML keine Daten.

### 4. Anti-Patterns und Schwächen

1. **Kein `prefers-reduced-motion`.** Beide Stylesheets und das Custom-JS enthalten null Treffer. Das Hero-Video startet mit `autoplay:true` und `loop:true`, die IX2-Animationen laufen ungebremst. Für eine Seite mit dieser Animationsdichte ist das eine klare Lücke.
2. **H1-Hero mit `font-size:13.5vw` ohne `clamp`.** Bei 2560px Viewport ergibt das rund 345px Schriftgröße. Keine Obergrenze, kein `max()`.
3. **FAQ-Seite ohne Inhalt.** `/faq` liefert `Aktuell keine Fragen verfügbar.` aus einem Webflow-Empty-State, hat aber Title und Meta-Description, als wäre sie gefüllt. Zwei Abrufe mit unterschiedlichen User-Agents liefern dasselbe. Das ist eine verwaiste Seite, die Traffic und Erwartung erzeugt, ohne sie zu bedienen.
4. **Kontaktseite mit kopierter Meta-Description.** `/kontakt` trägt wörtlich die FAQ-Description "Die am häufigsten gestellten Fragen haben wir hier für Dich beantwortet." und das nackte Title "Kontakt" ohne Marken-Suffix.
5. **Referenz-Detailseiten sind leer.** `/referenzen/gerd-meyer` hat H1 "25 Module - 10,08 kWp" und den Ort, aber der Inhaltscontainer `<div class="container"></div>` ist leer. Kein Bild, kein Text, keine Galerie. 30 solcher Seiten stehen in der Sitemap, und die Übersicht zeigt nur 25 Karten, es fehlen also 5.
6. **Kein Schema.org.** Kein `LocalBusiness`, kein `Organization`, kein `Product`, kein `Article`, kein `FAQPage`, kein `BreadcrumbList` auf keiner der 21 geprüften Seiten. Für ein lokales Handwerksunternehmen mit 30 Referenzen, 41 Artikeln und 6 Produktseiten verschenkt das Rich-Result-Fläche.
7. **Alt-Texte fast durchgehend leer.** 93 AVIF-Bilder auf der Startseite, davon die meisten `alt=""`, inklusive der Referenzfotos, die inhaltlich das stärkste Vertrauensmaterial sind.
8. **Kein `fetchpriority` und kein `poster` am Hero-Video.** Das größte Above-the-Fold-Element hat weder Priorisierung noch ein echtes Posterbild, nur einen CSS-Background-Platzhalter.
9. **Verwaiste IX2-Action-Lists.** Die Listen `a-13`/`a-14`/`a-20`/`a-21` zielen auf `.hero_image-wrap.is-solar` und `.is-therm`, Klassen, die im Live-HTML der Startseite nicht mehr vorkommen (der Hero ist jetzt ein Video). Das sind tote Interaktionen, die bei jedem Besuch mitgeladen werden.
10. **Tippfehler und Copy-Fehler im ausgelieferten Text.** "von Elephant SOlar" (`home.html`, Vorteile-Karte), "Kontaktiere Elephant SOlar" (`kontakt.html`), "5,46kwP" (`referenzen.html`), "Vielen dank für deine Anfrage!" (`/danke`), englische Datumsformate im Blog ("February 1, 2026") bei deutscher Seite.
11. **"12000+ MWh pro Jahr" widerspricht der Subline.** Die Kachel behauptet in der Überschrift MWh, im Text steht "Mehr als 12000kw/h". Zwei verschiedene Einheiten für dieselbe Zahl.
12. **Sitemap enthält 41 Blog- und 30 Referenz-URLs, aber nur 1 FAQ- und 1 Kontakt-URL.** Die Gewichtung liegt damit stark auf Content, der wenig Conversion liefert, während die Conversion-Seiten dünn bleiben.

### 5. Conversion-Mechanik

Die Seite führt in fünf Schritten zum Lead: Erstens fängt der Hero mit einem Video und vier Trust-Signalen sofort Vertrauen ab und bietet zwei Wege an, den harten Weg ("Jetzt Angebot sichern") und den weichen ("Erklärvideo ansehen"). Zweitens wiederholt die fixe Navigation auf jeder Seite denselben Primär-CTA und die Telefonnummer, sodass der Einstieg nie weiter als einen Klick entfernt ist. Drittens baut die Startseite Beweis in vier Stufen auf (Zahlen, Testimonials, Google-Rezensionen, Ortsreferenzen mit kWp-Werten), bis der Footer-CTA "Energiewende starten" als naheliegender nächster Schritt wirkt. Viertens senkt der 3-Schritt-Funnel die Hürde, indem er zwei Ein-Klick-Fragen vor die Kontaktdaten setzt und die Datenabfrage im Formular selbst begründet. Fünftens fängt die `/danke`-Seite den Lead mit einer Bestätigung und schickt ihn über "Zurück zur Startseite" wieder in den Content, statt die Sitzung zu beenden.

## Abrufprotokoll

Alle Abrufe mit `curl -sL -m 30` und User-Agent `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36`, Arbeitsverzeichnis `/tmp/site-elephantsolar/`.

| URL | HTTP | Bytes | Datei |
|---|---|---|---|
| `https://www.elephantsolar.de/` | 200 | 175225 | `home.html` |
| `https://www.elephantsolar.de/produkte/solaranlagen` | 200 | 65295 | `solaranlagen.html` |
| `https://www.elephantsolar.de/produkte/stromspeicher` | 200 | 65127 | `stromspeicher.html` |
| `https://www.elephantsolar.de/produkte/waermepumpen` | 200 | 66780 | `waermepumpen.html` |
| `https://www.elephantsolar.de/produkte/energiemanagement` | 200 | 61969 | `p-produkte_energiemanagement.html` |
| `https://www.elephantsolar.de/produkte/e-mobilitaet` | 200 | 65584 | `p-produkte_e-mobilitaet.html` |
| `https://www.elephantsolar.de/produkt/ecoflow-powerocean` | 200 | 56717 | `p-produkt_ecoflow-powerocean.html` |
| `https://www.elephantsolar.de/ueber-uns` | 200 | 101037 | `ueberuns.html` |
| `https://www.elephantsolar.de/karriere` | 200 | 71284 | `p-karriere.html` |
| `https://www.elephantsolar.de/blog` | 200 | 152050 | `blog.html` |
| `https://www.elephantsolar.de/blog/welche-kosten-kommen-bei-einer-pv-anlage-auf-mich-zu` | 200 | 60292 | `artikel.html` |
| `https://www.elephantsolar.de/referenzen` | 200 | 120031 | `referenzen.html` |
| `https://www.elephantsolar.de/referenzen/gerd-meyer` | 200 | 55162 | `referenz-detail.html` |
| `https://www.elephantsolar.de/solaranlage/hannover` | 200 | 61022 | `standort-hannover.html` |
| `https://www.elephantsolar.de/anfrage` | 200 | 76461 | `anfrage.html` |
| `https://www.elephantsolar.de/danke` | 200 | 53048 | `p-danke.html` |
| `https://www.elephantsolar.de/faq` | 200 | 55433 | `faq.html` |
| `https://www.elephantsolar.de/kontakt` | 200 | 56109 | `kontakt.html` |
| `https://www.elephantsolar.de/finanzierung` | 200 | 61271 | `finanzierung.html` |
| `https://www.elephantsolar.de/elephant-connect` | 200 | 55329 | `p-elephant-connect.html` |
| `https://www.elephantsolar.de/rechtliches/impressum` | 200 | 55747 | `p-rechtliches_impressum.html` |
| `https://www.elephantsolar.de/robots.txt` | 200 | 115 | `robots.txt` |
| `https://www.elephantsolar.de/sitemap.xml` | 200 | 11636 | `sitemap.xml` |
| `https://cdn.prod.website-files.com/68550e77989ff2ca782e92f7/css/elephant-solar.shared.26174f4a5.min.css` | 200 | 32951 | `css-shared.css` |
| `https://cdn.prod.website-files.com/68550e77989ff2ca782e92f7/css/elephant-solar.68550e77989ff2ca782e92f3.e9c8dfa94.opt.min.css` | 200 | 55474 | `css-page.css` |
| `https://cdn.prod.website-files.com/68550e77989ff2ca782e92f7/js/elephant-solar.72189e40.f01d55637de457f1.js` | 200 | 4632 | `wf.js` |
| `https://cdn.jsdelivr.net/gh/weisscompany/cm-code/anfrage-selectcustom.js` | 200 | 9199 | `anfrage-selectcustom.js` |
| `https://cdn.prod.website-files.com/68550e77989ff2ca782e92f7/js/elephant-solar.achunk.20825e247acf075b.js` | 200 | 58497 | `chunk-20825e247acf075b.js` (IX2-Action-Lists) |
| 14 weitere `elephant-solar.achunk.*.js` Chunks | 200 | 1007 bis 77424 | `chunk-*.js` |
| `https://www.elephantsolar.de/elektro` (Testabruf) | 404 | 40684 | `p-elektro.html` |

Nicht abrufbar oder nicht vorhanden: keine Seite lieferte 403, leer oder Timeout. Alle 21 geprüften Inhalts-URLs antworteten mit HTTP 200 (dazu robots.txt und sitemap.xml, ebenfalls 200). Zwei Seiten sind inhaltlich leer, obwohl sie 200 liefern: `/faq` (Webflow-Empty-State "Aktuell keine Fragen verfügbar.") und die Referenz-Detailseiten (leerer Container). `/elektro` liefert 404 und ist nicht verlinkt.
