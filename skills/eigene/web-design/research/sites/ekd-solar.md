# ekd-solar.de

## Steckbrief

| Feld | Wert |
|---|---|
| Domain | https://www.ekd-solar.de/ |
| Marke | Energiekonzepte Deutschland GmbH (EKD) |
| Branche | Photovoltaik, Stromspeicher, Wärmepumpe, Wallbox, Stromtarif (Endkunden, Deutschland) |
| Geschäftsmodell | Komplettanbieter: Planung, Verkauf, Montage, Service; Produktlinie "EKD365+" mit Eigenmarke "Ampere" |
| Seitentyp | Lead-Gen-Unternehmensseite mit sehr großer SEO-Ratgeber-Sektion |
| Stack | WordPress 6.9.7, Theme Salient 18.1.1 + Child-Theme `salient-child-ekd-2023-04` (Autor: lipsia.digital), Page-Builder WPBakery (js_composer_salient 8.7.2) |
| Plugins (erkannt) | Yoast SEO (Sitemap-XSL), WP Rocket 3.19.2.1, Borlabs Cookie 3.4.2.2, Contact Form 7, Popup Maker 1.22.0, TablePress 3.3.2, Google Site Kit 1.185.0, URL Shortify, ppi-personio (Karriere), salient-portfolio, salient-core, Use Any Font |
| Funnel-Tool | Heyflow (Webview-Widget von `assets.prd.heyflow.com`) |
| Consent | Borlabs Cookie, blockiert reCAPTCHA bis Einwilligung |
| Analytics | Google Tag `GT-TQVKH4K`, Google Ads `AW-642854066`, GA4 `G-PBWE8MZRV` mit `anonymize_ip: true`, gtag Consent Mode v2 (`ad_storage`, `ad_user_data`) |
| Sprache | Deutsch, kein hreflang, kein Sprachumschalter |
| Anrede | Inkonsistent: überwiegend Sie, an mehreren Stellen Du ("So findest du die Richtige" im Title, "Hier findest Du alles Wichtige", "Du interessierst dich für mehr?", "Ideal für Neubau & Bestand"/"deine Wärmepumpe") |
| Sitemap-Umfang | 600 URLs gesamt: 520 Pages (`page-sitemap.xml`), 58 Posts (`post-sitemap.xml`), 22 Jobs (`ppi-personio-job-sitemap.xml`) |
| Canonical | Selbstreferenziell auf allen 15 geprüften Seiten |
| robots.txt | `Allow: /`, `Disallow: /downloads/iq-box-...pdf`, `Disallow: /*?slug=*` |

### Sitemap-Zusammensetzung (page-sitemap, 520 URLs)

| Segment | Anzahl | Inhalt |
|---|---|---|
| `waermepumpe-funktionsweise/` | 249 | Wärmepumpen-Glossar, je Begriff eine eigene URL |
| `photovoltaik/` | 214 | PV-Glossar, je Begriff eine eigene URL |
| Root-Ebene | 45 | Hauptseiten inkl. 9 Stadt-Landingpages (`solaranlage-leipzig/` usw.) |
| `pv-grossanlagen/` | 5 | Gewerbe/Großanlagen |
| `solaranlage/` | 4 | Solaranlage, Schritt-für-Schritt, Amortisation, Amperesolarpro |
| `kundenerfahrungen/` | 2 | Referenzen, Kundenstories |
| `kontakt/` | 1 | Kontakt |

Die 463 Glossar-URLs sind der dominante SEO-Anteil. Sie folgen dem Muster `/<thema>/<begriff>/` und verlinken untereinander alphabetisch in Blöcken.

## Sitemap

### Hauptnavigation (aus `<header id="top">`, `aria-label="Main Menu"`)

| Ebene 1 | Ebene 2 |
|---|---|
| Energiesystem | (Direktlink `/energiesystem/`) |
| Produkte | Solaranlage, Energiemanagement, Stromspeicher, Wallbox, Wärmepumpe, Stromtarif |
| Ratgeber | Magazin, News, Glossar, In 5 Schritten zur Solaranlage, Amortisation, Alles Wichtige zur Solaranlage |
| Weitere | Magazin, News, Glossar, PV-Großanlagen, Kundenerfahrungen, Über uns |
| Kundenportal | extern `https://kundenportal.ekd-solar.de` |
| Ersparnis berechnen | `/ersparnisrechner/` (rechts ausgerichtet, Akzentfarbe) |

"Produkte" und "Ratgeber" sind Dropdowns ohne eigenen Link (`href="#"`). "Weitere" existiert nur mobil. Das Ratgeber-Dropdown hat einen per jQuery injizierten Header: "Unser Ratgeber" / "Hier findest Du alles Wichtige rund um das Thema Solaranlage."

### Footer (4 Spalten + Rechtliches)

| Spalte | Einträge |
|---|---|
| (Social) | LinkedIn, Instagram, Facebook |
| Angebot | Energiesystem, Solaranlage, Energiemanagement, Stromspeicher, Wallbox, Wärmepumpe, Stromtarif EKD Flow, Notstrom |
| Services | Energiekonzept.Plus, Plus.Finanzierung, Plus.Versicherung, Solar-Check, Ersparnisrechner, Vertrag hier kündigen |
| Unternehmen | Über uns, Bewertungen, Kundenerfahrung, Karriere, Montagepartner werden |
| Ihr EKD | Presse, Kontakt, Kundenportal, Magazin, Glossar |
| Rechtliches | Impressum, Datenschutz, Cookie Einstellungen ändern, Allgemeine Einkaufsbedingungen, AGB, Widerrufsbelehrung |

Keine Ortsliste im Footer, keine Siegel im Footer, kein Telefonlink. Cookie-Einstellungen ändern ist ein JS-Link (`href="#"`).

### Geprüfte Seitentypen

1. Startseite
2. Leistungsseite Ratgeber-Hybrid (`/solaranlage/`)
3. Produktseite (`/stromspeicher/`, `/waermepumpe/`)
4. Systemseite (`/energiesystem/`, 62 Sektionen)
5. Unternehmen (`/unternehmen/`)
6. Magazin-Übersicht (`/magazin/`)
7. Einzelartikel (`/photovoltaik/stromspeicher-kosten-2026/`)
8. Referenzen (`/kundenerfahrungen/`)
9. Glossar-Hub (`/glossar/`)
10. Kontakt (`/kontakt/`)
11. Funnel: Ersparnisrechner, Anfrage, Direktanfrage, Checkliste

## Seiten

### 1. Startseite, https://www.ekd-solar.de/

- Title: `Die komplette Solaranlage für Ihr Zuhause | EKD`
- Meta-Description: `Ihr Energiesystem: Solaranlage · Stromspeicher · Wärmepumpe · Wallbox ✓ Smart vernetzt ✓ Inkl. Planung, Installation, Wartung ✓ ▶ alle Infos`
- H1: `Ihr Energiesystem mit Solaranlage und Speicher.`
- H2: 23, H3: 12
- Schema: WebSite, Organization, WebPage, NewsArticle, BreadcrumbList, Person, ImageObject, SearchAction, ReadAction, PropertyValueSpecification (alles Yoast-Graph)
- Canonical: `https://www.ekd-solar.de/`, hreflang: keine
- Top-Level-Rows im DOM: 26, Text ca. 2.251 Wörter im Content-Bereich

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Nav | (Logo) | Menü: Energiesystem, Produkte, Ratgeber, Weitere, Kundenportal, Ersparnis berechnen | 1-Zeilen-Header | Logo PNG 212x40 1x/2x | Kostenlose Beratung (nicht im Header), Ersparnis berechnen | keine | Header-Nav-Höhe 94px, mobil 48px |
| 2 | Hero | `Ihr Energiesystem mit Solaranlage und Speicher.` | `Immer der günstigste und sauberste Strom.` (Eyebrow-H2) | Full-bleed, Video-Hintergrund | Hintergrundvideo `EKD-365-Startseite-V2.mp4`, 1800x700, autoplay loop muted playsinline | `Kostenlose Beratung` | 4-von-5-Sterne-Bild + Text `Google Bewertungen 4,2 von 5,0 Sternen aus über 1.800 Bewertungen` in weißer Card (border-radius 5px, shadow medium_depth) | Padding `calc(100vw * 0.12)` oben, `calc(100vw * 0.14)` unten; Hintergrund `#21262b`; Clip-Path-Animation mit Delay 1200ms; `data-parallax-speed="medium_fast"` |
| 3 | Bento-Box Highlights | `Maximale Kostenersparnis.` / `Smart` | `Perfekt aufeinander abgestimmte Komponenten` | Bento, 2 Zeilen, Klasse `ekd-bento-box-highlights` | 2 Bilder | - | - | Weiße Box (`--row-bg-color: #ffffff`), `data-br="15px"`, `translate_y_-100px` (überlappt Hero) |
| 4 | Bento-Box | `Alles aus einer Hand.` | `Prämierte Expertise aus über 45.000 verbauten Solaranlagen` | Bento | 1 Bild | - | 45.000 Anlagen | `translate_y_-100px`, gleiche Box-Optik |
| 5 | System-Erklärung | `Die rentabelste Solaranlage: Das Energiesystem` | - | Full-bleed, Anker `#energiesystem` | 2 Bilder | Zum Energiesystem | - | `translate_y_-20px` |
| 6 | Produkt-Karussell | `Solaranlage`, `Wärmepumpe`, `Stromspeicher`, `Ampere IQ`, `Wallbox`, `Stromtarif` | - | Carousel/Slider (`ekd-clevere-geraete-carousel`) | 6 Bilder | - | - | Anker `#komponenten`, `translate_y_-170px`, `ekd-overflow-visible` |
| 7 | Rechner-Teaser | `Die wirtschaftlichste Lösung für Ihr Zuhause.` | - | 2-Spalten | 2 Bilder | - | - | Anker `#ersparnis`, erscheint zweimal im DOM (Desktop/Mobile-Variante) |
| 8 | Rechner-CTA | `Jetzt Ihre persönliche Ersparnis berechnen!` | - | Zentriert | 1 Bild | Zum Ersparnisrechner | - | - |
| 9 | Stats / Zähler | `45.000` `+`, `90` `Mio €` | `Verbaute PV-Anlagen seit 2018`, `Stromkostenersparnis pro Jahr` | 2er-Grid | 1 Bild | - | 2 Kennzahlen | `nectar-milestone` mit `data-effect="count"`, `data-symbol-pos="after"`, `data-symbol-size="40"`, Hintergrund `#e9e9e6` |
| 10 | Standort-Intro | `Ihr Partner für Solaranlagen in ganz Deutschland.` | Bundesweit Fachberater und zertifizierte Montageteams | Zentriert-schmal | - | - | Bundesweit, zertifizierte Teams | - |
| 11 | Standort-Liste | `EKD Montage West GmbH`, `Standort Bad Neustadt an der Saale`, `Standort Gifhorn`, `Standort Baar-Ebenhausen`, `Standort Kühlsheim`, `Store Kronach`, `Store Mühlhausen`, `Bischoff Energiesysteme GmbH`, `Store Halle`, `EKD Hauptsitz Leipzig`, `Store Magdeburg`, `Standort Göttingen`, `Store Alsfeld`, ... | `Unser Team mit Standort in X ist stets für Sie da.` | Karten-Grid, 22.8 KB HTML | 2 Bilder | `Jetzt Beratung anfragen!` (wiederholt pro Standort) | 15+ Standorte, Hauptsitz Leipzig | Anker `#` Funnel führt auf `/direktanfrage/` |
| 12 | Testimonial / Kundenstory | - | - | Zigzag | 8 Bilder (Kunde Matthias, Familie Ehnert) | `Zur Kundenstory im Video` -> YouTube, `Jetzt starten` -> `/kundenstories/lindhorst` | Echte Kundennamen, Vor-Ort-Fotos, Video | Bild-Alt-Texte sind beschreibend, z. B. "Kunde Matthias bedient Display der Ampere.IQ App im Haus" |
| 13 | Kundenstory 2 | - | - | Carousel (`owl-carousel`) | 8 Bilder | - | - | Duplikat-Struktur von Sektion 12 |
| 14 | FAQ-Akkordeon | `Fragen & Antworten` | - | Akkordeon | - | - | - | 5 Fragen als H3, Antworten 60 bis 90 Wörter |
| 15 | Lead-Magnet | `Jetzt Ihre kostenlose Solar-Checkliste herunterladen` | - | 2-Spalten | 1 Bild | `Zur Checkliste` | "kostenlos" | Führt auf `/checkliste/` (Heyflow) |
| 16 | Rundum-Sorglos | `Beim Kauf inklusive: Unser Rundum-Sorglos-Paket` | - | Feature-Grid, 14 KB | - | - | Garantie-/Serviceversprechen | Anker `#rundum-sorglos` |
| 17 | Prozess-Steps | `In 5 einfachen Schritten zum Energiesystem` | `Wie Sie in nur fünf Schritten zur eigenen PV-Anlage mit Stromspeicher gelangen und direkt online mit dem ersten Schritt starten können, erfahren Sie hier:` | Timeline/Steps | 1 Bild | `Mehr erfahren` -> `/solaranlage/schritt-fuer-schritt` | - | Schrittnummern als H3 `1` bis `5` |
| 18 | Prozess-Detail | `1 Wenige Fragen beantworten`, `2 Kostenlose Vor-Ort-Beratung`, `3 Planung & Angebot`, `4 Installation & Anmeldung`, `5 Aktivierung` | - | Horizontaler Stepper | - | `Jetzt starten` -> `/anfrage` | - | Jeder Schritt verlinkt auf `/solaranlage/schritt-fuer-schritt/#schritt-N` |
| 19 | Video-Kundenstory | - | - | Full-bleed | - | `Zur Kundenstory im Video` | - | Link auf YouTube `G4lZcEUaVdU` |
| 20 | Broschüren-Band | `Bessere Energie für Ihr Zuhause. Das ganze Jahr.` | - | Full-bleed, dunkel | 3 Bilder | `Broschüre herunterladen` | - | Hintergrund `#21262b`, Textfarbe light, Padding 70px oben/unten, PDF-Link |
| 21 | Footer-Links + Rechtliches | `© 2026 Energiekonzepte Deutschland GmbH` | - | 4er-Grid | 1 Bild | - | - | Hintergrund `#21262b` |

**Hero-Formel:** H1 ist ein Nutzenversprechen ("Ihr Energiesystem mit Solaranlage und Speicher.", 6 Wörter). Subline 6 Wörter ("Immer der günstigste und sauberste Strom."). 1 CTA im Hero (`Kostenlose Beratung`). Trust-Signal im Hero: 4-von-5-Sterne-Grafik plus Zahl "über 1.800 Bewertungen" in weißer Card. Medientyp: Video (MP4, autoplay, loop, muted, playsinline). Höhe: kein `min-h-screen`, stattdessen prozentuales Viewport-Padding `calc(100vw * 0.12)` / `calc(100vw * 0.14)`.

**CTA-Strategie Startseite:** Insgesamt 15 CTA-Blöcke vom Typ `nectar-cta` (ohne Footer-Menüs). Häufigste Ziele: `/anfrage` (Kostenlose Beratung, Jetzt starten), `/direktanfrage/` (Jetzt Beratung anfragen), `/ersparnisrechner` (Zum Ersparnisrechner), `/energiesystem` (Zum Energiesystem), `/solaranlage/schritt-fuer-schritt`, `/checkliste`, YouTube, PDF-Downloads. Sticky-Header-CTA: ja, "Ersparnis berechnen" rechts im Header. Telefonnummer im Header: **nein**, im gesamten HTML der Startseite existiert kein einziges `tel:`-Link.

**Trust-Staffelung auf der Startseite:** (1) Hero: Google-Sterne 4,2 und 1.800 Bewertungen. (2) Bento: "über 45.000 verbaute Solaranlagen". (3) Stats-Band: 45.000+ Anlagen, 90 Mio € Ersparnis pro Jahr. (4) Standorte: 15+ Standorte, Hauptsitz Leipzig, namentliche Standortleiter. (5) Kundenstories mit echten Fotos und Namen (Matthias, Familie Ehnert). (6) Rundum-Sorglos-Paket als Garantieblock. Keine Presse-Logos auf der Startseite, keine Auszeichnungen auf der Startseite (beides liegt auf `/ersparnisrechner/` und `/unternehmen/`).

### 2. Leistungsseite /solaranlage/, https://www.ekd-solar.de/solaranlage/

- Title: `Solaranlagen: So findest du die Richtige!` (Du-Form)
- Meta-Description: `Infos zu: Technik, Einbauvoraussetzungen & Ertrag ● Kosten für Anschaffung & Montage ● Kauf oder Miete? ● Mit Checkliste ➤ Lesen!`
- H1: `Solaranlagen: So finden Sie die Richtige!` (Sie-Form, widerspricht dem Title)
- H2: 11, H3: 15
- Schema: derselbe Yoast-Graph, kein Article-Typ
- Canonical: `https://www.ekd-solar.de/solaranlage/`
- Top-Level-Rows: 34

| Nr | Sektionstyp | Headline wörtlich | Layout-Familie | Medien | CTA-Labels | Hinweise |
|---|---|---|---|---|---|---|
| 1 | Hero | `Solaranlagen: So finden Sie die Richtige!` | Full-bleed, 1-spaltig | - | - | - |
| 2 | Intro-Bild | - | 2-Spalten | 1 Bild | - | - |
| 3 | Nutzen-Block | - | 2-Spalten | - | - | - |
| 4 | Inline-CTA | `Solaranlage mit Stromspeicher und Energiemanagementsystem:` | Zentriert | - | `Jetzt Angebot anfordern` -> `/anfrage/` | - |
| 5 | Inhaltsverzeichnis | `Inhalt` | Liste, Ankerlinks | - | - | 10+ Sprungmarken |
| 6 | Ratgeber-Kapitel | `Einstieg: Was ist überhaupt Solarenergie? Wie entsteht sie?` | 2-Spalten Text+Bild | 0 Bilder | - | Anker `#solarenergie` |
| 7 | Ratgeber-Kapitel | `Historie: Eine kurze Geschichte der Photovoltaik` | Text | - | - | Anker `#geschichte` |
| 8 | Ratgeber-Kapitel | `Technik: Welche Arten von Solaranlagen, PV-Modulen und Solarzellen gibt es?` | Text+Bild | 1 Bild | - | Anker `#technik` |
| 9 | Inline-CTA | `Setzen Sie bei Ihrer Solaranlage auf Solar-Module mit Backcontact-Tech` | Zentriert | - | `Jetzt Angebot anfordern` | - |
| 10 | Ratgeber-Kapitel | `Nutzen: Für wen sind Solaranlagen interessant?` | Text | - | - | Anker `#nutzen` |
| 11 | Ratgeber-Kapitel + Tabelle | `Kosten: Lohnt sich eine Solaranlage für Ihr Zuhause?` | Text + Tabelle | 1 Bild | - | 2 Tabellen zur Einspeisevergütung 2024 (Teil-/Volleinspeisung), TablePress |
| 12 | Inline-CTA | `Wie viel können Sie mit unserem EKD365+ Energiesystem sparen?` | Zentriert | - | `Jetzt Ersparnis berechnen` | - |
| 13 | Ratgeber-Kapitel | `Eignung: Bauliche Voraussetzungen für den Einbau einer Solaranlage` | Text+Bild | 1 Bild | - | Anker `#eignung` |
| 14-20 | Kriterien-Grid | `Wohnort`, `Ausrichtung des Dachs`, `Neigung des Dachs`, `Nutzbare Fläche des Dachs`, `Verschattung des Dachs`, `Altbau oder Neubau`, `Leistung und Wirkungsgrad der Module` | 7 Einzel-Rows als Karten | - | - | Je Kriterium ein eigener Row |
| 21 | Ratgeber-Kapitel | `Finanzierung: Solaranlage kaufen oder mieten?` | Text | - | - | Anker `#finanzierung` |
| 22 | Ratgeber-Kapitel | `Komponenten: Warum zur Solaranlage ein Stromspeicher und ein Energiemanagement gehören sollten` | Text | - | - | Anker `#komponenten` |
| 23-25 | Inline-CTA | `Wie viel Geld können Sie mit EKD365+ sparen?` | Zentriert | 1 Bild | `Zum Ersparnisrechner` | - |
| 26 | Ratgeber-Kapitel | `Sicherheit: Wie schütze ich meine Solaranlage vor Schäden?` | Text+Bild | 1 Bild | - | Anker `#sicherheit` |
| 27 | Service-CTA | `Planung der Solaranlage, Technik, Installation und umfassende Garantie` | Zentriert | - | `Energiekonzept.Plus` | - |
| 28 | Lead-Magnet | `Checkliste: So finden Sie die richtige Solaranlage` | 2-Spalten | 1 Bild | `Download Checkliste` | - |
| 29 | FAQ/Ende | - | - | - | - | - |
| 30 | Broschüren-Band | `Bessere Energie für Ihr Zuhause. Das ganze Jahr.` | Full-bleed dunkel | 3 Bilder | `Broschüre herunterladen` | - |

### 3. Produktseite /stromspeicher/, https://www.ekd-solar.de/stromspeicher/

- Title: `Stromspeicher Ampere.StoragePro: Sicher, innovativ, smart`
- Meta-Description: `6,6–23,1 kW Speichergröße ● Höchste Sicherheit ● Smart steuerbar ● Bis zu 20 Jahre Garantie ● Inkl. Installation ▶ Jetzt informieren!`
- H1: `Stromspeicher Ampere.StoragePro`
- H2: 62, H3: 13
- Canonical: `https://www.ekd-solar.de/stromspeicher/`
- Top-Level-Rows: 50, ca. 2.897 Wörter

| Nr | Sektionstyp | Headline wörtlich | Layout-Familie | Medien | CTA-Labels | Trust-Elemente |
|---|---|---|---|---|---|---|
| 1 | Hero | (kein H1-Text im Hero-Row ausgelesen, H1 steht in Row 1) | Full-bleed | 4 Bilder | `Kostenlose Beratung anfragen` (2x) -> `/direktanfrage` | - |
| 2 | Benefits-Trio | `Maximal Sicher`, `0 auf 100 % in Bestzeit`, `bis 4 MPPT` | 3er-Grid | - | - | - |
| 3 | Feature-Zigzag | `Mehr Leistung`, `100 %`, `Smart vernetzt` | Zigzag | 2 Bilder, 1 Video | - | `Kapazitätsgarantie auf 10 Jahre` |
| 4 | Beratungs-CTA | `Kostenlose Beratung zu Speicher und Solaranlage sichern.` | Zentriert | - | - | "Kostenlose" |
| 5-7 | Feature-Bänder | - | Full-bleed | 1 Video | - | - |
| 8 | Performance-Intro | `Begeisternde Performance für Ihr Maximum an Energie` | Zentriert | - | - | - |
| 9 | Performance-Feature | `0 auf 100 % in Bestzeit`, `Smart vernetzt` | 2-Spalten | 3 Bilder, 1 Video | - | - |
| 10 | Performance-Feature | `bis 4 MPPT` | 2-Spalten | 2 Bilder | - | H3 `4 Dachseiten anschließen` |
| 11 | Performance-Carousel | `Alle Performance Features`, `20 % effizienter`, `10`, `6,6`, `23,1` | Carousel | 6 Bilder | - | Zahlen: 10 Jahre, 6,6 bis 23,1 kW |
| 12 | Sicherheits-Intro | `Mehr Sicherheit durch innovative Technik` | Zentriert | - | - | - |
| 13-15 | Sicherheits-Features | `Sicherheitstechnik`, `Lichtbogenerkennung`, `Sichere Batterie-Technologie`, `Alle Sicherheit Features`, `spritzwassergeschützt`, `Autark bei Stromausfall`, `Fernwartung und Updates`, `brandsicher` | 2-Spalten + 5er-Grid | 1+3+5 Bilder, 1 Video | - | "geprüfte" |
| 16-18 | Langlebigkeit | `Langlebigkeit der Spitzenklasse`, `Maximierung der Lebensdauer`, `12000`, `10 Jahre`, `100 % Kapazität garantiert` | Zigzag + Stats | 4 Bilder, 1 Video | - | 12.000 Zyklen, 10 Jahre, 100 % Kapazität |
| 19 | Produkt-CTA | `Jetzt den Stromspeicher Ampere.StoragePro anschauen` | Zentriert | - | - | - |
| 20 | Datenblätter | `Datenblätter Ampere.StoragePro` | 2-Spalten | 1 Bild | `12kW Datenblatt herunterladen`, `22kW Datenblatt herunterladen` | PDF-Downloads |
| 21-23 | Design-Story | `Deutsche Ingenieurskunst trifft bestes Design` | Zigzag | 4 Bilder | - | H3 `Ein Meisterwerk der Ingenieurskunst`, `Designed von den Besten` |
| 25 | System-Einordnung | `Alle Komponenten smart vernetzt und aufeinander abgestimmt` | 2-Spalten | 1 Bild, 1 Video | `Zum Energiesystem` | - |
| 26 | Komponenten-Carousel | `Solaranlage`, `Wärmepumpe`, `Stromspeicher`, `Ampere IQ`, `Wallbox`, `Stromtarif` | Carousel | 6 Bilder | - | - |
| 28 | Kontaktblock | `Wir melden uns bei Ihnen` (Eyebrow `Kostenlose Solar-Beratung`) | 2-Spalten, 40/60 | 1 Bild | `Unverbindlich anfragen` | "kostenlos und unverbindlich" |
| 29 | Broschüren-Band | `Bessere Energie für Ihr Zuhause. Das ganze Jahr.` | Full-bleed dunkel | 3 Bilder | `Broschüre herunterladen` | - |

Sektion 28 nutzt scroll-getriebene Clip-Path-Animation: `data-nectar-animate-settings` mit `clipPath` von `inset(0px 0px 0px 0px round 0)` auf `inset(4% 4% 4% 4% round 20px)`, Offsets `start: "50.00"`, `end: "80.00"`, `origin: "top"`, Zielselektor `.row-bg-layer`.

### 4. Systemseite /energiesystem/, https://www.ekd-solar.de/energiesystem/

- H1: `Die rentabelste Solaranlage: Das Energiesystem`
- H2: 3 (Rest sind Sektions-Headlines in tieferen Ebenen), Top-Level-Rows: 62, ca. 3.578 Wörter
- Längste und dichteste Seite der Site

| Nr | Sektionstyp | Headline wörtlich | Layout | Medien | CTA |
|---|---|---|---|---|---|
| 1 | Hero | `Die rentabelste Solaranlage: Das Energiesystem` | Full-bleed | 2 Bilder | `Jetzt Gewinn berechnen` |
| 2 | Benefit-Bento | `Strom für bis zu 0 Cent`, `Smart` | Bento | 2 Bilder | - |
| 3 | Service-Versprechen | `Wir kümmern uns um alles.` | 2-Spalten | 1 Bild | - |
| 4-6 | Dach-Individualisierung | `Jedes Dach ist anders.`, `Unsere Lösung ist individuell.` | Zigzag | 3 Bilder | - |
| 7 | Ersparnis-Referenzen | `Insgesamt`, `176.620 €`, `105.300 €`, `84.006 €` | 3er-Grid | 6 Bilder | - |
| 8-9 | Wirtschaftlichkeit | `Die wirtschaftlichste Lösung für Ihr Zuhause.`, `Rentiert sich mehr als jede andere Lösung` | 2-Spalten | 4 Bilder | - |
| 10 | Rechner-CTA | `Jetzt Ihre persönliche Ersparnis berechnen!` | Zentriert | 1 Bild | `Zum Ersparnisrechner` |
| 11 | Design-Auszeichnung | `Begeisternde Performance.`, `Ausgezeichnetes Design.` | 2-Spalten | 3 Bilder | - |
| 12 | Komponenten-Grid | `Maximale Solarerzeugung`, `Effizientester Stromspeicher`, `Schnellste Wallbox`, `Autarke, kompatible Wärme` | 4er-Grid | 8 Bilder | - |
| 13 | Saison-Bruch | `Tschüss Saisonanlage.`, `Hallo intelligentes Energiesystem.` | Zentriert | - | - |
| 14 | App / Kontrolle | `Immer die volle Kontrolle.`, `Mit nur einem Daumenwisch.`, `Ein System. Smart vernetzt.` | 2-Spalten | 8 Bilder, 1 Video | - |
| 15 | Smarte Features | `Smarte Features`, `Nutzen Sie überschüssigen Strom für ihr E-Auto oder ihre Wärmepumpe`, `Verkaufen Sie ihn gewinnbringend ins Netz.`, `Kaufen Sie einfach den günstigsten Strom aus dem Netz.`, `Bestimmen Sie spielend Ihre Prioritäten. Wir beladen, wie Sie wollen.`, `Der Zukunft voraus: Mit unserer Wetterprognose beziehen Sie clever nur den nötigsten Strom`, `Ampere.IQ denkt für Sie mit. Und voraus.` | Feature-Liste | 7 Bilder | - |
| 16-18 | Autarkie | `Maximale Autarkie an jedem Tag im Jahr. Auch bei schlechtem Wetter.` | 2-Spalten | 2 Bilder | - |
| 19-21 | Winter-Energiemix | `Immer der günstigste Strom.`, `Auch im Winter.`, `Winter Energie-Mix`, `Strom beziehen, wenn er günstig ist und nutzen, wenn Sie ihn brauchen.` | Zigzag | 6 Bilder, 2 Videos | - |
| 22-23 | Wärmepumpe im System | `Nachhaltig Heizen. 100 % flexibel und smart.`, `Genießen Sie echte Wahlfreiheit bei dynamischen Stromtarifen.` | 2-Spalten | 10 Bilder | `Dynamischer Stromtarif EKD Flow` |
| 24-26 | Sommer-Energiemix | `Holt das Maximum aus Ihrer erzeugten Solarenergie.`, `Sommer Energie-Mix`, `Immer die effizienteste Entscheidung, dank Wetterprognose.` | Zigzag | 6 Bilder, 2 Videos | - |
| 27 | E-Auto-Laden | `E-Auto automatisch mit überschüssigem PV-Strom laden.`, `Sie erzeugen mehr Strom, als Sie nutzen können?` | 2-Spalten | 2 Bilder | - |
| 28 | Feature-Detail-Grid | `Für immer auf dem aktuellsten Stand.`, `Die günstigsten wohligen Temperaturen mit Wärmepumpe und Heizstab`, `§ 14a EnWG: Stromnetz entlasten und flexibles Verhalten belohnen lassen`, `Zeit im Griff, Netzentgelte im Griff`, `Ihr Auto. Ihr Stromspeicher.`, `Solarstrom direkt verkaufen und Einnahmen maximieren`, `Smart Home neu gedacht: Europaweit breiteste Kompatibilität` | 6er-Karten | 7 Bilder | - |
| 29 | Broschüren-Band | `Bessere Energie für Ihr Zuhause. Das ganze Jahr.` | Full-bleed dunkel | 3 Bilder | `Broschüre herunterladen` |
| 34-39 | Referenz-Stats | `Individuell geplant. Intelligent gesteuert. Beeindruckend gespart.`, `176620`/`163776`/`12844`, `Gesamtersparnis auf 30 Jahre*`, `Familie Ehnert`, `105300`/`100000`/`5300`, `Gesamtersparnis auf 20 Jahre*`, `Familie Lindhorst`, `84600`/`77808`/`3000`/`3198` | Stats-Blöcke | 6 Bilder | - |
| 40-62 | Produkt-Feature-Zigzags | `0 auf 100% in Bestzeit`, `Smart vernetzt`, `Engineered in Deutschland, entwickelt mit Ampere und Studio F. A. Porsche`, `Hochleistungsmodule der Spitzenklasse`, `Speicherrevolution für maximale Energie`, `Bringt rasant Ihre Energie auf die Straße`, `Wärmepumpe`, `Energie mit einem Swipe`, `Vier Dachseiten anschließen dank bis zu vier MPP-Trackern`, `Laden und Heizen mit eigener Solarenergie`, `Machen Sie Ihre Solaranlage zur Einnahmequelle`, `Wenn Strompreise fallen, sparen Sie – automatisch`, `Laden nach Ihren Regeln – mit Leichtigkeit`, `Mit Sonnenprognose heute schon wissen, was morgen zählt`, `Strom clever nutzen, mit maximalem Gewinn`, `Volle Flexibilität - deine Wärmepumpe passt ins System`, `Sie sparen, wenn der Strom tagsüber teuer ist.`, `Holen Sie sich die Belohnung für's Entlasten`, `Zeit ist Geld`, `Ihr Auto. Ihr Stromspeicher.`, `Solarenergie direkt vermarkten und Erträge steigern`, `Maximaler Komfort für ein Zuhause, das mitdenkt`, `Spritzwassergeschütztes Aluminium-Gehäuse (IP65)` | Zigzag | je 1 Bild | - |

Auffällig: Die Rows 34 bis 62 liegen im DOM **nach** dem Footer-Block, sind also per Builder-Reihenfolge nachgelagerte Zusatzsektionen.

### 5. Über uns /unternehmen/, https://www.ekd-solar.de/unternehmen/

- Title: `Wir sind Energiekonzepte Deutschland`
- Meta-Description: `Anbieter innovativer Energie-, Solar- und Speichersysteme ● Über 35.000 verbaute PV-Anlagen ▶ Mehr Energie, mehr Autarkie, mehr Sicherheit`
- H1: `Wir sind Energiekonzepte Deutschland` und `Unsere Vision vom perfekten Energiesystem` (zwei H1)
- H2: 16, H3: 6, Top-Level-Rows: 23, ca. 2.268 Wörter
- Canonical: `https://www.ekd-solar.de/unternehmen/`

| Nr | Sektionstyp | Headline wörtlich | Layout | Medien | CTA | Trust |
|---|---|---|---|---|---|---|
| 1 | Hero | `Wir sind Energiekonzepte Deutschland` | Full-bleed | - | `Zu unserer Vision` | - |
| 2 | Image-Trust | `Ihre Investition in sichere Energie` | Zentriert | - | - | - |
| 3 | Meilenstein-Bild | `EKD schreibt Energiegeschichte in Deutschland`, `Stand heute` | 2-Spalten | 2 Bilder | - | - |
| 4 | Stats-Band | `45.000`+, `90` Mio €, `15`+ | 3er-Grid | - | - | 45.000 Solaranlagen seit 2018, 90 Mio € Ersparnis pro Jahr, 15+ Standorte |
| 5 | Standort-Block | `Bundesweit verfügbar – auch in Ihrer Nähe!` | Text | - | - | - |
| 6 | Präsenz | - | 2-Spalten | 2 Bilder | - | - |
| 7 | Leistungsversprechen | `Alles aus einer Hand` | Zentriert | - | - | Anker `#aus-einer-hand` |
| 8 | Partner-Recruiting | `Ihr Meisterbetrieb, bald EKD-Partner?` | 2-Spalten | 1 Bild | `Montagepartner werden` | Anker `#smart-meter` |
| 9-10 | Timeline | `Die wichtigsten Meilensteine der Energiegeschichte` | Timeline, 2 Rows | - | - | Anker `#steps` |
| 11 | Karriere | `Karriere bei EKD` | 2-Spalten | 1 Bild, 1 Video | `Zur Karriere` | - |
| 12 | Vision | `Unsere Vision vom perfekten Energiesystem` | Full-bleed | 2 Bilder | `Beratung zum Energiesystem` | Anker `#vision` |
| 13 | Team/Person | `Christian Arnold` | Bild + Text | 2 Bilder | - | Namentliche Person |
| 14 | Werte-Trio | `Mehr Energie`, `Mehr Autarkie`, `Mehr Sicherheit` | 4er-Grid | 3 Bilder | 3 Links | - |
| 15 | Presse | `Pressekontakt` | 2-Spalten | 1 Bild | `Zu den Presse-News` | Ansprechpartnerin "Presse und PR Julia Neuer" |
| 17-18 | Magazin-Teaser | `Magazin` (5x) | Carousel/Grid | 3 Bilder | `Zum Magazin` | - |
| 19 | Broschüren-Band | `Bessere Energie für Ihr Zuhause. Das ganze Jahr.` | Full-bleed dunkel | 3 Bilder | `Broschüre herunterladen` | - |

**Auszeichnungen auf dieser Seite** (aus Bild-Alt-Texten, belegt): `iF Gold Award 2025`, `reddot winner 2025`, `Wachstumschampion 2026 ausgezeichnet von Focus und statista`, `kununu widget`.

### 6. Magazin-Übersicht /magazin/, https://www.ekd-solar.de/magazin/

- Title: `Magazin - Energiekonzepte Deutschland`
- Meta-Description: `Das EKD Magazin ● Interessante Artikel rund um erneuerbare Energien und ihre Lösungen ● Expertenwissen für Ihr Zuhause ➤ Jetzt lesen!`
- H1: `Das EKD Magazin`
- H2: 4, H3: 12, Top-Level-Rows: 11, ca. 1.170 Wörter

| Nr | Sektionstyp | Headline wörtlich | Layout | Medien | CTA |
|---|---|---|---|---|---|
| 1 | Hero | `Das EKD Magazin` | Full-bleed | - | `Alle Artikel anzeigen` -> `#artikeluebersicht` |
| 2 | Featured-Artikel | `Ausgewählte Artikel` | 3er-Grid | 3 Bilder | - |
| 3 | Artikelübersicht | `Artikelübersicht` | Post-Grid | 6 Bilder | Buttons "Mehr anzeigen" |
| 4-5 | Du-Ansprache | `Du interessierst dich für mehr?` | Zentriert | - | - |
| 6 | Cross-Sell-Karten | `Jetzt Energiesystem zusammenstellen`, `Energiesystem entdecken`, `EKD News durchstöbern` | 3er-Grid | 3 Bilder | `Jetzt Angebot sichern!`, `Zum Energysystem`, `Zu den News` |
| 7 | Broschüren-Band | `Bessere Energie für Ihr Zuhause. Das ganze Jahr.` | Full-bleed dunkel | 3 Bilder | `Broschüre herunterladen` |

Ausgewählte Artikel (H3 wörtlich): `Was kostet eine Solaranlage? Faktoren und Preise im Jahr 2026`, `Solaranlage: So finden Sie die Richtige`, `Photovoltaik: Funktionsweise und interessante technische Fakten`, `Wärmepumpe mit PV-Anlage: Der Praxisguide`, `Stromspeicher 5 & 10 kWh Kosten 2026: Preise, Größen und was Sie wirklich brauchen`, `Dynamischer Stromtarif – so funktioniert's`, `Preisbasiertes Laden: Energiemanagement AMPERE.IQ`, `Intelligentes Messsystem: Transparenz und Effizienz für die Energiezukunft`, `Gemeinschaftliche Energieversorgung in Mehrparteienhäusern`.

Der Grid-Filter ist per CSS deaktiviert: `.ekd-post-grid .nectar-post-grid-filters { display: none; }` mit Kommentar "Filters deactivated for now".

### 7. Einzelartikel /photovoltaik/stromspeicher-kosten-2026/

- Title: `Stromspeicher 5 & 10 kWh Kosten 2026: Preise, Größen und was Sie wirklich brauchen`
- `article:published_time`: `2026-08-07T14:18:14+00:00`
- H2: 7, H3: 8, ca. 1.143 Wörter im Artikelkörper (ca. 1.832 Wörter mit Boilerplate), Top-Level-Rows: 18
- Bilder: 2 im Artikelkörper, 6 srcset-Varianten
- Interne Links im Artikelkörper: 5

| Nr | Sektionstyp | Headline wörtlich | Layout | CTA |
|---|---|---|---|---|
| 1 | Artikel-Header | - | Full-bleed Titelbild | - |
| 2-3 | Meta + Inhaltsverzeichnis | `Lesedauer: 8 Minuten`, `Inhalt` | Sticky-Sidebar / Zentriert-schmal | - |
| 4 | Artikel-Kapitel | `Was kostet ein Stromspeicher 2026 und wie hoch ist der Preis für 5, 10 oder 15 kWh?` | Text | - |
| 5 | Artikel-Kapitel | `Warum sind 5 kWh oder 10 kWh allein nicht entscheidend?` | Text + H3 `Ein Beispiel:` | - |
| 6 | Artikel-Kapitel | `Wie entsteht ein realer Nutzen des Solar-Speichers für Strom durch Steuerung und Systemeinbindung?` | Text | - |
| 7 | Zwischen-CTA | `Ganzjahresenergiesystem EKD365+ mit intelligentem Energiemanagement:` | Zentriert | `Jetzt Angebot anfordern` -> `/anfrage/` |
| 8 | Artikel-Kapitel | `Wie lässt sich der Eigenverbrauch aktiv optimieren?` | Text | - |
| 9 | Feature-Trio | `Wallbox und Überschussladen`, `Wärmepumpe und Ladesteuerung` | 2-Spalten | - |
| 10 | Artikel-Kapitel | `Worauf kommt es beim Kauf eines Stromspeichers mit 5, 10 oder 15 kWh wirklich an?` | Text + nummerierte Liste `Eine sinnvolle Reihenfolge für Fragen zur Kaufentscheidung sieht so aus:` | - |
| 11 | Fazit | `Fazit` | Text | - |
| 12 | Lead-Magnet | `10 wichtige Punkte, auf die Sie vor dem Kauf einer Solaranlage achten sollten` | 2-Spalten | `Kostenlose Checkliste` |
| 14 | Broschüren-Band | `Bessere Energie für Ihr Zuhause. Das ganze Jahr.` | Full-bleed dunkel | `Broschüre herunterladen` |

**Ratgeber-Artikel-Features:** Inhaltsverzeichnis mit 6 Ankerlinks, Lesezeit-Angabe "Lesedauer: 8 Minuten", Zwischen-CTA nach Kapitel 3, Lead-Magnet am Ende, Breadcrumbs nur auf Posts sichtbar (`#breadcrumbs { display: none; }` global, `.single-post #breadcrumbs { display: block; max-width: 1000px; margin: auto; }`). Kein sichtbares Autorenelement im Artikelkörper. Keine Key-Takeaways-Box. Keine FAQ-Sektion im Artikel. Kein Article-Schema (nur der generische Yoast-Graph mit `NewsArticle`, das ist die Sitewide-Entität, nicht artikelspezifisch).

### 8. Referenzen /kundenerfahrungen/, https://www.ekd-solar.de/kundenerfahrungen/

- Title: `Kundenerfahrungen - Energiekonzepte Deutschland`
- Meta-Description: `Welche Erfahrungen haben EKD Kunden mit Solaranlage, Stromspeicher & Kundenservice gemacht? ● Selbst EKD Kunde werden ➤ Kundenstory lesen`
- H1: `Unsere Kundenerfahrungen`, H2: 12, H3: 6, Top-Level-Rows: 20, ca. 1.158 Wörter

| Nr | Sektionstyp | Headline wörtlich | Layout | Medien | CTA | Trust |
|---|---|---|---|---|---|---|
| 1 | Hero | `Unsere Kundenerfahrungen` | Full-bleed | 1 Bild | `Jetzt Kunde werden` | - |
| 2 | Auszeichnungs-Doppel | `Begeisterte Kunden.`, `Ausgezeichnetes Design.` | 2-Spalten | 3 Bilder | - | iF Gold Award, reddot |
| 4 | Kundenstory 1 | `Matthias aus Leipzig`, `176620` | Zigzag + Stat | 1 Bild | - | Ersparnis 176.620 € |
| 6 | Kundenstory 2 | `Nahkauf Ines und Thomas Ehnert`, `105300` | Zigzag + Stat | 1 Bild | - | Ersparnis 105.300 € |
| 7 | Rechner-CTA | `Wie viel Geld können Sie mit EKD365+ sparen?` | Zentriert | - | `Zum Ersparnisrechner` | - |
| 8 | Beratungs-CTA | `Sie wollen auch Kunde werden? Lassen Sie sich unverbindlich beraten!` | Zentriert | - | `Jetzt Kontakt aufnehmen` | "unverbindlich" |
| 9 | Bewertungen | `EKD Bewertungen` | 2-Spalten | 1 Bild | `Alle Bewertungen` -> `/erfahrungen/` | Anker `#bewertungen`, kununu-Widget |
| 10 | Bewertungs-Wand | - | Bildergrid | 9 Bilder | - | - |
| 11 | Gewinnspiel | `25.000 € für glückliche EKD Kunden` | 2-Spalten | 2 Bilder | `Gewinner kennenlernen` | - |
| 12-13 | Prozess-Steps | `In 5 einfachen Schritten zur Solaranlage`, `1`-`5` | Timeline | 1 Bild | `Mehr erfahren`, `Jetzt starten` | - |
| 14 | Kontakt | - | Anker `#kontakt` | - | - | - |
| 15 | Kontaktblock | `Wir melden uns bei Ihnen` | 2-Spalten | 1 Bild | `Unverbindlich anfragen` | - |
| 16 | Broschüren-Band | `Bessere Energie für Ihr Zuhause. Das ganze Jahr.` | Full-bleed dunkel | 3 Bilder | `Broschüre herunterladen` | - |

### 9. Glossar /glossar/, https://www.ekd-solar.de/glossar/

- Title: `Glossar - Energiekonzepte Deutschland`
- Meta-Description: `Unser Glossar hilft Ihrem Wissen rund um Erneuerbare Energien rasch auf die Sprünge.`
- H1: `Glossar`, H2: 3 (Photovoltaik, Wärmepumpe, plus), H3: 0, Top-Level-Rows: 9

Aufbau: Hero ohne Bild, dann zwei alphabetische Link-Blöcke. Jeder Block ist ein `nectar-cta` vom Typ `underline`, der 20 bis 30 Begriffe in einem Link-Text bündelt (deshalb erscheinen die Labels als ein langer String). Blöcke: Photovoltaik (3 Blöcke), Wärmepumpe (3 Blöcke). Gesamt 463 Glossar-URLs in der Sitemap. Jeder Begriff ist eine eigene Seite unter `/photovoltaik/<begriff>/` oder `/waermepumpe-funktionsweise/<begriff>/`.

### 10. Kontakt /kontakt/, https://www.ekd-solar.de/kontakt/

- Title: `Kontakt - Energiekonzepte Deutschland`
- Meta-Description: `Alles aus einer Hand. Von der Erstberatung über den Kauf der PV-Anlage bis zur Installation der PV-Anlage beraten wir Sie kompetent. Rundum-Sorglos-Paket.`
- H1: `Kontakt`, H2: 1, H3: 2
- Canonical: `https://www.ekd-solar.de/kontakt/`
- Top-Level-Rows: 7, ca. 794 Wörter

| Nr | Sektionstyp | Headline wörtlich | Layout | Hinweise |
|---|---|---|---|---|
| 1 | Hero | `Kontakt` | Full-bleed | - |
| 2 | Weichenstellung (2 Karten) | `Ich interessiere mich für EKD` | 2-Spalten | Copy: `Sie haben Fragen zu unserem Energiesystem oder wünschen ein unverbindliches Angebot? Nehmen Sie Kontakt zu unseren Fachberater:innen auf.` CTA: `Beratung vereinbaren` -> `/anfrage/` |
| 2b | Weichenstellung (2. Karte) | `Ich bin bereits Bestandskund:in` | 2-Spalten | Copy: `Sie haben ein Anliegen zu Ihrem Energiesystem? Kontaktieren Sie unseren Kundenservice. Als Kund:in haben Sie ebenfalls Zugang zu unserem Kundenportal.` CTAs: `Kundenservice kontaktieren` -> `/kontakt/bestandskundenservice/`, `Zum Kundenportal` -> extern |
| 3 | Broschüren-Band | `Bessere Energie für Ihr Zuhause. Das ganze Jahr.` | Full-bleed dunkel | - |

Wichtig: `/kontakt/` enthält **kein** Kontaktformular und **kein** Heyflow-Element (0 Treffer). Die Seite ist reine Weiche zu `/anfrage/`, `/direktanfrage/` und `/kontakt/bestandskundenservice/`. Auch hier gibt es keine Telefonnummer.

### 11. Funnel /ersparnisrechner/, https://www.ekd-solar.de/ersparnisrechner/

- Title: `Ersparnisrechner`
- Meta-Description: `Berechnen Sie die Ersparnis mit Ihrem EKD Energiesystem und vereinbaren Sie anschließend Ihr persönliches Beratungsgespräch ▶ Starten!`
- H1: `Wie viel können Sie mit einem Energiesystem von EKD sparen?`
- H2: 4, H3: 1, Top-Level-Rows: 11, ca. 809 Wörter

| Nr | Sektionstyp | Headline wörtlich | Layout | Medien |
|---|---|---|---|---|
| 1 | Hero-Bild | - | Full-bleed | 2 Bilder |
| 2 | Funnel-Headline | `Wie viel können Sie mit einem Energiesystem von EKD sparen?` | Zentriert | 1 Bild |
| 3-4 | Heyflow-Einbettung | - | Full-width | 1 Bild |
| 5 | Presse-Wall | `EKD ist bekannt aus` | 4er-Grid | 4 Logos: ProSieben, Kabel 1, Sat.1, SIXX |
| 6 | Auszeichnungen | - | 3er-Grid | iF Gold Award 2025, reddot winner 2025, Wachstumschampion 2026 (Focus/statista) |
| 6 | Stats | `45.000`, `90`, `15` | 3er-Grid | - |
| 7 | Broschüren-Band | `Bessere Energie für Ihr Zuhause. Das ganze Jahr.` | Full-bleed dunkel | 3 Bilder |

**Funnel-Technik:** `<heyflow-wrapper flow-id="yZPwZdIE6tMNOEYQFGy4" dynamic-height scroll-up-on-navigation style-config='{"width":"100%"}'>` in `<div class="heyflow-container" style="border-radius: 5px; overflow: hidden;">`. Skript: `https://assets.prd.heyflow.com/builder/widget/latest/webview.js`. Preconnect auf `assets.prd.heyflow.com` und `fonts.heyflow.cloud`. Die Funnel-Schritte selbst sind nicht im HTML, sie kommen clientseitig aus Heyflow (nicht belegbar aus statischem HTML).

### 12. Funnel /anfrage/, https://www.ekd-solar.de/anfrage/

- Title: `Anfrage zu Solaranlage und Energiesystem stellen`
- H1: `Kostenlose Beratung für Ihr Energiesystem.`
- flow-id: `d5ierulbweq7ho5wptkt52y4`, Top-Level-Rows: 11, ca. 1.028 Wörter

### 13. Funnel /direktanfrage/, https://www.ekd-solar.de/direktanfrage/

- Title: `Direktanfrage zu Solaranlage stellen`
- H1: `Stellen Sie jetzt Ihre Anfrage für eine Solaranlage mit Speicher.`
- flow-id: `d5ierulbweq7ho5wptkt52y4` (identisch zu `/anfrage/`), Top-Level-Rows: 12, ca. 907 Wörter

### 14. Funnel /checkliste/, https://www.ekd-solar.de/checkliste/

- Title: `Kostenlose Solar-Checkliste herunterladen`
- H1: keine
- flow-id: `cnepcnt813wk7i1tzatuu5qh` (eigener Flow), Top-Level-Rows: 11, ca. 906 Wörter

**Formular-Details:** Alle drei Funnel-Seiten nutzen Heyflow, nicht Contact Form 7. Contact Form 7 ist zwar geladen (12 `wpcf7`-Treffer, 3 `contact-form-7`), aber im gerenderten HTML dieser Seiten sind **keine** `<form>`, `<input>`, `<select>` oder `<textarea>`-Elemente vorhanden. Die Felder entstehen erst im Heyflow-iFrame/Webview. Keine Mehrschritt-Anzeige im HTML, keine Fortschrittsanzeige im HTML, keine Microcopy neben Buttons im HTML. Damit ist die Formularmechanik aus statischem HTML **nicht belegbar**. reCAPTCHA von Google ist eingebunden und wird von Borlabs blockiert (2 blockierte Skripte, 16 mal "Inhalt entsperren" pro Seite).

## Design-System

Alle Werte aus `salient-dynamic-styles.css`, `main-style.css` (Salient 18.1.1), `style-non-critical.css` und den Inline-`<style>`-Blöcken der Startseite.

### Fonts

Selbst gehostet über Use Any Font (`/wp-content/uploads/useanyfont/`), keine Google-Fonts- oder Adobe-Fonts-Links.

| Familie | Gewichte | Dateien | Rolle |
|---|---|---|---|
| `pp-telegraf` | 400, 500, 600 | `6923PP-Telegraf.woff2` / `.woff`, `4593...`, `1380...` | Display: alle H1 bis H4 |
| `circular` | 400, 500, 700 | `9007Circular.woff2` / `.woff`, `4485...`, `2416...` | Body, UI, Buttons, Navigation |

Regel: `font-display: auto` bei allen sechs Deklarationen. Body-Regel `.bold, strong, b { font-family: circular; font-weight: 600; }`.

### Farben (Top-Werte aus allen CSS-Quellen, Anzahl Vorkommen)

| Farbe | Anzahl | Rolle |
|---|---|---|
| `#21262b` | 76 | Primär-Dunkel: Text, dunkle Bänder, Footer, Hero-Hintergrund. `--nectar-font-color`, `--nectar-extra-color-1` |
| `#ef870e` | 49 | **Akzent**: Buttons, Links, Hover. `--nectar-accent-color` |
| `#ffffff` | 44 | Hintergrund. `--nectar-bg-color`, `--nectar-extra-color-3` |
| `#32d6ff` | 17 | Sekundär-Akzent (Gradient-Start) |
| `#e9e9e6` | 12 | Hellgrau-Band. `--nectar-extra-color-2` |
| `#2ac4ea` | 12 | Sekundär-Akzent (Gradient-Ende) |
| `#3452ff` | 3 | Vereinzelter Blau-Akzent |
| `#64676b` | 2 | Grau-Sekundärtext |

Custom Properties (wörtlich aus `:root`):
```
--nectar-accent-color:#ef870e
--nectar-extra-color-1:#21262b
--nectar-extra-color-2:#e9e9e6
--nectar-extra-color-3:#ffffff
--nectar-bg-color:#ffffff
--nectar-font-color:#21262B
--nectar-font-light-color:#ffffff
--nectar-extra-color-gradient-1:linear-gradient(to right,#21262b,#ef870e)
--nectar-extra-color-gradient-2:linear-gradient(to right,#32d6ff,#2AC4EA)
--nectar-border-radius:2px
--nectar-body-font-size:18px
--nectar-body-line-height:28px
--container-width:1600px
--container-padding:90px
--header-nav-height:94px
--nectar-menu-padding:32px
--nectar-menu-item-spacing:16px
--nectar-border-thickness:1px
--nectar-starting-header-color:#ffffff
--nectar-starting-dark-header-color:#21262b
```

Sekundär-Paar für die Produktmarke: `#32d6ff` und `#2AC4EA`, genutzt als Verlauf und als Schattenfarbe `0px 30px 90px #2AC4EA`.

### Radius

| Wert | Anzahl | Verwendung |
|---|---|---|
| `2px` | 4 (+3 mit `!important`) | Salient-Standard, `--nectar-border-radius` |
| `100px` | 2 | Pill-Formen (Banner, Badge) |
| `200px` | 2 (mit `!important`) | Runde Elemente |
| `4px` | 1 | - |
| `5px` | aus Inline-CSS | Funnel-Container, Post-Grid-Karten, Hero-Card |
| `15px` | aus HTML | Bento-Boxen (`data-br="15px"`) |
| `20px` | aus `data-nectar-animate-settings` | Clip-Path-Endzustand |
| `50%` | 1 | Kreise |

Buttons sind **nicht** pill. Sie sind eckig bis leicht gerundet (2px bis 5px), die Pill-Werte gelten für Banner und Badges. Das Bento-Grid nutzt 15px, die Funnel-Container 5px.

### Shadows

| Wert | Verwendung |
|---|---|
| `0px 36px 60px 0px rgba(0, 0, 0, 0.09)` | `.ekd-shadow-plane-m` (Standard-Karten) |
| `0px 50px 250px -25px rgba(0, 21, 74, 0.1)` | Calendly-Inline-Widget |
| `inset 0 0 0 2px #ef870e` | Fokus-/Aktiv-Ring in Akzentfarbe |
| `inset 0 0 0 8px rgba(33,38,43,0.3)` | Innerer Rahmen dunkel |
| `inset 0 0 0 2px rgba(33,38,43,0.8)` | Innerer Rahmen dunkel 2 |
| `#ef870e 0px 8px 15px` | Farbiger Button-Schatten |
| `0 30px 90px #ef870e` | Großer Farb-Glow |
| `0 30px 90px #21262b` / `#e9e9e6` / `#ffffff` | Farb-Glow-Varianten je Hintergrund |
| `0px 30px 90px #2AC4EA` | Glow in Sekundärfarbe |

### Spacing und Container

- Container-Breite: `1600px`, Innenabstand `90px` (`--container-width`, `--container-padding`)
- Section-Padding vertikal: prozentual vom Viewport, z. B. `calc(100vw * 0.12)` oben und `calc(100vw * 0.14)` unten im Hero, `calc(100vw * 0.05)`, `calc(100vw * 0.08)`, `calc(100vw * 0.10)`, `calc(100vw * 0.07)` in weiteren Sektionen. Umsetzung über Klassen `data-top-percent` und `data-bottom-percent` plus Inline-Style.
- Seitlicher Rand: `right_padding_4pct` / `left_padding_4pct` auf fast allen Rows
- Responsive: `right_padding_tablet_0px`, `right_padding_phone_0px` (Tablet und Phone ohne Seitenrand)
- Überlappungen als Stilmittel: `translate_y_-100px`, `translate_y_-170px`, `translate_y_-175px`, `translate_y_-20px`, `translate_y_24px` (Bento-Boxen schieben sich über den Hero)

### Typo-Skala

| Element | Größe | Line-Height | Familie | Gewicht |
|---|---|---|---|---|
| H1 (Default Salient) | 54px | 62px | pp-telegraf | - |
| H1 (Site-Override) | 72px | 88px | pp-telegraf | 400 |
| H1 Tablet (1000-1300px) | 64px | 72px | - | - |
| H1 Phone (max 690px) | 38.4px | 48px | - | - |
| H2 | 48px | 60px | pp-telegraf | 400 |
| H2 Variante | 45px | 51px | - | - |
| H2 Variante | 41px | 51px | - | - |
| H2 klein | 33px | 39px | - | - |
| H3 | 36px | 44px | pp-telegraf | 400 |
| H3 Variante | 31px | 38px | - | - |
| H4 | 24px | 32px | pp-telegraf | 500 |
| H5 | 20px | 28px | circular | 500 |
| H6 | 14px | 22px | circular | 400 |
| Body | 18px | 28px | circular | 400 |
| Nav-Item | 18px | 28px | circular | 400 |
| Button/CTA | 18px | - | circular | 500 |
| Off-Canvas-Menü | 44px | 54px | circular | 500 |
| Kicker/Label | 16px | 20px | circular | 500 |
| Kleintext | 14px | 22px | circular | 400 |

`letter-spacing: 0px` ist die Regel (13 mal `0px`, 1 mal `inherit`), `text-transform: none` für Überschriften. Keine `clamp()`-Funktion im gesamten CSS. Responsive Größen laufen über Media-Queries bei 1300px, 1000px und 690px.

## Animationen

### Transitions (häufigste Werte, Anzahl Vorkommen)

| Deklaration | Anzahl |
|---|---|
| `all .45s cubic-bezier(0.25,1,0.33,1)` | 4 |
| `all 0.2s linear` | 3 |
| `opacity 0.4s ease` | 2 |
| `background-size 0.55s cubic-bezier(.2,.75,.5,1)` | 2 |
| `transform 0.3s ease` | 2 |
| `background-color 0.30s ease, box-shadow 0.30s ease, margin 0.25s ease, backdrop-filter 0.25s ease` | 2 |
| `border-color 0.30s ease` | 2 |
| `opacity .45s cubic-bezier(0.25,1,0.33,1), transform .45s cubic-bezier(0.25,1,0.33,1), border-color .45s cubic-bezier(...)` | 2 |
| `all 0.3s cubic-bezier(.55,0,.1,1)` | 2 |
| `all 0.5s cubic-bezier(0.165,0.84,0.44,1)` | 2 |
| `transform 1.2s cubic-bezier(0.25,1,0.5,1), opacity 1.2s cubic-bezier(0.25,1,0.5,1), filter 1.2s cubic-bezier(0.25,1,0.5,1)` | 2 |
| `transform .65s cubic-bezier(.05,.2,.1,1)` | 2 |
| `transform 1.3s cubic-bezier(.12,.75,.4,1), opacity .55s ease-out .2s` | 1 |

Easing-Werte wörtlich (Häufigkeit):
```
cubic-bezier(0.25,1,0.33,1)      16x
cubic-bezier(.55,0,.1,1)          6x
cubic-bezier(0.25,1,0.5,1)        6x
cubic-bezier(.3,.4,.2,1)          4x
cubic-bezier(.2,.75,.5,1)         3x
cubic-bezier(0.52,0.01,0.16,1)    2x
cubic-bezier(0.165,0.84,0.44,1)   2x
cubic-bezier(.2,1,.2,1)           2x
cubic-bezier(.15,0.2,.1,1)        1x
cubic-bezier(0.25,0,0.4,1)        1x
cubic-bezier(0.33,1,0.68,1)       1x
```

Ein Anteil von 16 von 40 Transitions nutzt `cubic-bezier(0.25,1,0.33,1)`, eine starke Überschwinger-freie Ease-Out-Kurve. Das ist die Hauskurve der Site.

### @keyframes

| Name | Datei | Wirkung |
|---|---|---|
| `nectar_cta_letter_animation` | style-non-critical.css | Buchstaben-Reveal: `0% {opacity:0; transform:translateY(115%)}`, `30% {opacity:1}`, `45% {opacity:1; transform:translateY(-25%)}`, `100% {opacity:1; transform:translateY(0)}` |
| `row_bg_zoom_out` | main-style.css | `0% {transform:scale(1.2)}` zu `100% {transform:scale(1)}` |
| `spinning_animation` | main-style.css | `0% scale(1) rotate(0)` zu `50% scale(.8) rotate(360deg)` zu `100% scale(1) rotate(720deg)` |
| `bounce_in_animation` | main-style.css | `0% scale(0,0)`, `20% scale(1.4,1.4)`, `50% scale(.8,.8)`, `85% scale(1.1,1.1)`, `100% scale(1,1)` |
| `down_arrow_bounce` | main-style.css | `translateY(0)`, `-14px`, `-7px` |
| `nectar_pulsate` | Inline (index.html) | Pulsieren |
| `spin-counter` | Inline (index.html) | Zähler-Rotation |
| `nectar_ltr_line_animation`, `nectar_ltr_line_animation_start` | dynamic-styles.css | Linien-Wisch |
| `fadebottom` | style-non-critical.css | Einblenden von unten |
| `mouse-scroll-btn-roll-over`, `trackBallSlide`, `nudgeMouse` | main-style.css | Scroll-Indikator |
| 29 weitere CTA-Pfeil-Keyframes | style-non-critical.css | `ctaArrowStart`, `ctaArrowEnd`, `rightLineStart`, `rightLineEnd`, `nectar_curved_arrow_animation__*` |

### Motion-Libraries (Zählung im Startseiten-HTML)

| Library | Treffer | Beleg |
|---|---|---|
| GSAP / ScrollTrigger / Lenis / Framer Motion / AOS | **0** | nicht vorhanden |
| Owl Carousel | 16 | `owl.carousel.min.js?ver=2.3.4` |
| Flickity | 18 | `flickity.js?ver=2.3.3` |
| Swiper | 7 | Treffer im CSS/JS |
| anime.js | 2 | `anime.min.js?ver=4.5.1` |
| Vivus | 2 | `vivus.min.js?ver=6.0.1` |
| Lottie | 5 | Treffer im HTML |
| Waypoints | 2 | `waypoints.js?ver=4.0.2` |
| Transit | - | `transit.min.js?ver=0.9.9` |
| jQuery easing | - | `jquery.easing.min.js?ver=1.3` |
| Webflow `data-w-id` | 0 | nicht vorhanden |
| Elementor / Wix / Next / Nuxt | 0 | nicht vorhanden |

Es gibt **keine** Scroll-Trigger-Bibliothek im modernen Sinn. Die Scroll-Animationen laufen über Salients eigene Waypoint-Logik (`nectar-waypoints.js`) plus CSS-Klassen.

### Scroll-Reveal-Muster

Klassen und Attribute in DOM-Reihenfolge:
- `data-animation="fade-in-from-bottom"` (9 mal), `data-animation="fade-in"` (2 mal), `data-animation="slight-fade-in-from-bottom"` (1 mal), `data-animation="none"` (66 mal, überwiegend im Footer)
- Verzögerung: `data-delay="0"` (134 mal), `data-delay="300"` (1 mal), `data-delay="150"` (1 mal)
- Container-Klassen: `.col.has-animation`, `.wpb_column.has-animation`, `img.img-with-animation` (37 mal), `.nectar-fancy-box.has-animation`
- Startzustand: alle `opacity: 0; position: relative`
- `.nectar-waypoint-el:not([data-nectar-waypoint-el-stagger]) { opacity: 0 }`
- Starttransform `fade-in-from-bottom`: `translateY(75px)` für Spalten, `translateY(100px)` für Bilder, `translateY(50px)` für `slight-fade-in-from-bottom`
- Stagger: Salient bietet `data-nectar-waypoint-el-stagger`, im Startseiten-HTML nicht gefunden

### Hover-Effekte

**CTA `text-reveal-wave`** (Hauptbutton-Stil, 20 Vorkommen über 15 Seiten):
```css
.nectar-cta[data-style=text-reveal-wave] .char { display: inline-block; line-height: 1 }
.nectar-cta[data-style=text-reveal-wave] .link_text.hover .char {
  animation: nectar_cta_letter_animation .5s cubic-bezier(.46,.4,.56,.87) forwards;
  transform: translateY(110%); opacity: 0
}
.nectar-cta[data-style=text-reveal-wave][data-using-bg=true] .link_wrap { transition: background-color .3s ease }
.nectar-cta[data-style=text-reveal-wave][data-using-bg=true] .link_wrap:hover {
  transition: background-color .5s cubic-bezier(.23,.46,.4,1)
}
```
Jeder Buchstabe ist ein eigenes `<span class="char">` im HTML. Beim Hover laufen die Buchstaben von unten hoch.

**CTA `underline`** (Sekundärbutton, 30+ Vorkommen):
```css
.nectar-cta[data-style=underline] .link_wrap .link_text:after {
  display: block; content: ''; position: absolute; z-index: -1; width: 100%; height: 2px;
  bottom: 0; border-bottom: 2px solid #000; border-radius: 0;
  background-color: transparent !important;
  transition: transform .4s cubic-bezier(.23,.46,.4,1); transform-origin: left
}
.nectar-cta[data-style=underline].underline-visible-on-hover .link_wrap .link_text:after {
  animation: none; transform: scaleX(0); transform-origin: right
}
body:not(.mobile) .nectar-cta[data-style=underline].underline-visible-on-hover .link_wrap:hover .link_text:after {
  transform: scaleX(1); transform-origin: left
}
```

**Text-Links:** `.wpb_text_column a { color: #ef870e; opacity: 1 !important }` und `.wpb_text_column a:hover { opacity: 0.8 !important }`.

**Footer-Links:** `--nectar-text-color: #ffffff` mit `--nectar-text-color-hover: #ef870e`.

**Karten mit Hover-Text:** `.more-partner-1:hover`, `.more-usp-1` mit `transition: max-height 0.5s, overflow 0.5s, margin 0.5s` und `cursor: pointer` (Aufklapp-Mechanik).

### Zähler-Animationen

`nectar-milestone` mit `data-effect="count"`:
```html
<div class="nectar-milestone" data-symbol="+" data-effect="count"
     data-symbol-alignment="superscript" data-symbol-pos="after"
     data-symbol-size="40" data-single-decimal-place="" data-ms-align="left">
```
Werte auf der Startseite: `45.000` mit Suffix `+`, `90` mit Suffix `Mio €`. Dazu ein DOM-MutationObserver im Inline-Skript der Startseite, der die Zahl formatieren soll: er ersetzt Komma durch Punkt und hängt ein `<span class="updated-number">` an.

Weitere Zähler-Klassen im CSS: `.ekd-milestone-add-currency .updated-number:after { font-size: 36px; content: " €" }`, `.ekd-milestone-break-font` mit 60px bei 1300px und 92px bei 1000px Breakpoint.

### Parallax

`parallax_section` als Row-Klasse, `data-parallax-speed` mit Werten `fast` (4 mal), `subtle` (3 mal), `medium_fast` (2 mal). Dazu `data-bg-cover="true"` (7 mal) und `data-bg-pos` (`center center` 8 mal, `right center` 3 mal).

### Sticky-Sections und Video

- Sticky: `.nectar-sticky-media-section__media` mit `background-size: contain` im Custom-CSS. Header ist sticky (`sticky: 110` Treffer, `--header-nav-height: 94px`).
- Video-Autoplay im Hero: `<video class="nectar-video-bg" width="1800" height="700" preload="auto" loop autoplay muted playsinline>` mit `<source src=".../EKD-365-Startseite-V2.mp4" type="video/mp4">`.
- Hero-Hintergrund-Animation: `data-bg-animation="clip-path"` mit `data-bg-animation-delay="1200"`, weitere Werte `zoom-out-reveal` (1 mal) und `fade-in` (1 mal).
- Scroll-getriebener Clip-Path auf der Speicher-Seite: `data-nectar-animate-settings` mit Start `inset(0px 0px 0px 0px round 0)` und Ende `inset(4% 4% 4% 4% round 20px)`, Offsets `start: "50.00"`, `end: "80.00"`, `origin: "top"`.

### Reduced Motion

**Nicht vorhanden.** `prefers-reduced-motion` kommt in keiner der geprüften CSS-Quellen vor (`salient-dynamic-styles.css`: 0, `main-style.css`: 0, `style-non-critical.css`: 0, Inline-Styles: 0). Das ist ein belegter Barrierefreiheits-Mangel bei gleichzeitigem Video-Autoplay, Parallax und Scroll-Reveals.

### Bilder

| Merkmal | Befund |
|---|---|
| Formate | Startseite: 119 jpg, 103 png, 2 jpeg, 14 svg, 1 mp4. Energiesystem-Seite: 176 png, 106 jpg, 66 svg, 42 webp, 5 mp4, 1 gif. |
| AVIF | 0 Treffer auf keiner Seite |
| WebP | nur auf der Energiesystem-Seite (42 Treffer), sonst 0 |
| `loading="lazy"` | **0 Treffer auf allen geprüften Seiten** |
| Lazy-Mechanik | Salient-eigenes `.nectar-lazy` mit `opacity: 0` und `transition: opacity .5s ease`, plus Klasse `.loaded` und `data-src`. `.skip-lazy` 39 mal im Header/Logo-Bereich. |
| `srcset` | 31 mal (Startseite), 51 mal (Energiesystem), 9 mal (Referenzen) |
| `fetchpriority` | 1 mal (Startseite), 2 mal (andere) |
| `decoding="async"` | 39 mal (Startseite), 86 mal (Energiesystem) |
| `<picture>` / `<source>` | 0 / 1 |
| Alt-Texte | Durchgehend vorhanden und beschreibend, z. B. "Oranger Pfeil nach rechts", "iF Gold Award 2025", "Kunde Matthias bedient Display der Ampere.IQ App im Haus" |

## Synthese

### Seitentyp-Blueprints

**Startseite (26 Sektionen):**
1. Nav, sticky, mit Rechts-CTA "Ersparnis berechnen" (1-Zeilen-Header)
2. Hero: Video-Hintergrund, H1-Nutzenversprechen, 1 CTA, Google-Sterne-Card (Full-bleed)
3. Bento-Box 1: weiße überlappende Box, 2 Headlines, `translate_y_-100px` (Bento)
4. Bento-Box 2: weiße überlappende Box, 1 Headline, `translate_y_-100px` (Bento)
5. System-Erklärung mit Anker `#energiesystem` (Full-bleed)
6. Produkt-Karussell mit 6 Komponenten (Carousel)
7. Rechner-Teaser "Die wirtschaftlichste Lösung" (2-Spalten)
8. Rechner-CTA (Zentriert)
9. Stats-Band mit 2 Zählern auf `#e9e9e6` (2er-Grid)
10. Standort-Intro (Zentriert-schmal)
11. Standort-Liste mit 13+ Karten (Karten-Grid)
12. Kundenstory 1 mit Video-Link (Zigzag)
13. Kundenstory 2 (Carousel)
14. FAQ-Akkordeon, 5 Fragen (Akkordeon)
15. Lead-Magnet Checkliste (2-Spalten)
16. Rundum-Sorglos-Paket (Feature-Grid)
17. Prozess-Intro "In 5 einfachen Schritten" (Full-bleed)
18. 5er-Stepper mit Ankerlinks (Timeline)
19. Video-Kundenstory (Full-bleed)
20. Broschüren-Band `#21262b` (Full-bleed dunkel)
21. Footer-Links, 4 Gruppen + Rechtliches (4er-Grid)

**Leistungsseite Ratgeber-Hybrid (34 Sektionen):** Hero → Intro-Bild → Nutzen-Block → Inline-CTA → Inhaltsverzeichnis mit Ankern → 8 Ratgeber-Kapitel mit H2 → 7 Kriterien-Karten → 3 Inline-CTAs an Kapitelgrenzen → Service-CTA → Lead-Magnet → Broschüren-Band → Footer.

**Produktseite (50 Sektionen):** Hero → Benefits-Trio → Feature-Zigzag mit Kapazitätsgarantie → Beratungs-CTA → 3 Feature-Bänder → Performance-Intro → 2 Performance-Zigzags → Performance-Carousel → Sicherheits-Intro → 3 Sicherheits-Feature-Blöcke → 3 Langlebigkeits-Blöcke mit Stat-Zahlen → Produkt-CTA → Datenblatt-Downloads → Design-Story → System-Einordnung mit CTA → Komponenten-Carousel → Kontaktblock → Broschüren-Band.

**Systemseite (62 Sektionen):** Hero → Bento → Service-Versprechen → Dach-Individualisierung → Ersparnis-Referenzen → Wirtschaftlichkeit → Rechner-CTA → Design-Auszeichnung → Komponenten-Grid → Saison-Bruch → App-Kontrolle → Smarte Features → Autarkie → Winter-Mix → Wärmepumpe-Tarif → Sommer-Mix → E-Auto-Laden → Feature-Detail-Grid → Broschüren-Band → 6 Referenz-Stat-Blöcke → 23 Produkt-Feature-Zigzags.

**Über-uns (23 Sektionen):** Hero → Image-Trust → Meilenstein-Bild → Stats-Trio mit 3 Zahlen → Standort-Block → Präsenz-Bilder → Leistungsversprechen → Partner-Recruiting-CTA → Timeline mit 2 Rows → Karriere-CTA → Vision mit H1 und CTA → Person "Christian Arnold" → Werte-Trio → Pressekontakt → Magazin-Teaser → Broschüren-Band.

**Ratgeber-Übersicht (11 Sektionen):** Hero mit Sprung-CTA → Featured-Artikel 3er-Grid → Artikelübersicht Post-Grid → Du-Ansprache-Zwischenzeile → Cross-Sell-3er-Grid mit 3 CTAs → Broschüren-Band.

**Artikel (18 Sektionen):** Artikel-Header mit Titelbild → Meta mit `Lesedauer: 8 Minuten` → Inhaltsverzeichnis mit 6 Ankern → 7 Artikel-Kapitel als H2 → 1 Zwischen-CTA nach Kapitel 3 → Fazit → Lead-Magnet → Broschüren-Band.

**Funnel (11 Sektionen):** Hero-Bild → H1-Frage → Heyflow-Wrapper (alle Schritte clientseitig) → Presse-Wall mit 4 Logos → 3 Auszeichnungen → Stats-Trio → Broschüren-Band.

### Die 5 stärksten Muster

**1. Überlappende Bento-Boxen mit negativem Y-Offset.** Die Sektionen 3 und 4 der Startseite schieben sich per `translate_y_-100px` über den Hero, mit `data-br="15px"` und `--row-bg-color: #ffffff`. Beleg: `<div id="fws_6aaaa815a758e" data-br="15px" data-br-applies="bg" ... class="wpb_row vc_row-fluid vc_row has-row-bg-color ... ekd-bento-box-highlights ... translate_y_-100px" style="padding-top: 48px; padding-bottom: 0px; z-index: 100; --row-bg-color: #ffffff;">`. Das Muster wiederholt sich mit `translate_y_-170px` (Komponenten-Carousel) und `translate_y_-175px` (Ersparnis-Block). So entsteht Tiefe ohne Schatten.

**2. CTA-Typografie als Animationsträger.** Statt Buttons mit Hintergrund nutzt die Site Buchstaben-Reveals. Beleg aus `style-non-critical.css`: `.nectar-cta[data-style=text-reveal-wave] .link_text.hover .char{animation:nectar_cta_letter_animation .5s cubic-bezier(.46,.4,.56,.87) forwards;transform:translateY(110%);opacity:0}` und `@keyframes nectar_cta_letter_animation{0%{opacity:0;transform:translateY(115%)}30%{opacity:1}45%{opacity:1;transform:translateY(-25%)}100%{opacity:1;transform:translateY(0)}}`. Der Überschwinger auf `-25%` bei 45 Prozent gibt dem Text einen physischen Kick.

**3. Ein Akzentton, kompromisslos durchgezogen.** `#ef870e` erscheint in allen CSS-Quellen als `--nectar-accent-color` und in 49 Deklarationen plus 16 Inline-Treffern. Beleg: `--nectar-accent-color:#ef870e` und `.wpb_text_column a{color:#ef870e;opacity:1!important}` und `inset 0 0 0 2px #ef870e` als Fokusring. Es gibt keinen zweiten konkurrierenden Button-Ton.

**4. Trust-Kaskade mit harten Zahlen statt Adjektiven.** Die Startseite staffelt `4,2 von 5,0 Sternen aus über 1.800 Bewertungen` im Hero, `über 45.000 verbaute Solaranlagen` im Bento, dann die Zähler `45.000 +` und `90 Mio €`. Beleg aus dem Milestone-Markup: `<div class="nectar-milestone" data-symbol="Mio €" data-effect="count" data-symbol-pos="after" data-symbol-size="40">`. Auf `/kundenerfahrungen/` stehen dieselben Zahlen personalisiert: `Familie Ehnert`, `105300`. Dazu drei Fremd-Auszeichnungen als Bild-Alts: `iF Gold Award 2025`, `reddot winner 2025`, `Wachstumschampion 2026 ausgezeichnet von Focus und statista`.

**5. Prozentuale Viewport-Abstände statt fester Pixelwerte.** Jede Row trägt `data-top-percent` und `data-bottom-percent`, die in Inline-Styles zu `calc(100vw * N)` werden. Beleg: `<div id="fws_6aaaa815a62a2" ... data-top-percent="12%" data-bottom-percent="14%" ... style="padding-top: calc(100vw * 0.12); padding-bottom: calc(100vw * 0.14); z-index: 1;">`. Die Abstände skalieren damit automatisch mit der Bildschirmbreite, ohne Media-Query. Der Hero ist 12 Prozent der Viewport-Breite hoch gepolstert, also bei 1600px Breite 192px.

### Animation-Rezepte

Alle Werte stammen wörtlich aus den abgerufenen CSS-Dateien.

**Rezept 1: CTA-Buchstaben-Reveal (exakt belegt)**
```css
.char { display: inline-block; line-height: 1 }

@keyframes nectar_cta_letter_animation {
  0%   { opacity: 0; transform: translateY(115%) }
  30%  { opacity: 1 }
  45%  { opacity: 1; transform: translateY(-25%) }
  100% { opacity: 1; transform: translateY(0) }
}

.link_text:hover .char {
  animation: nectar_cta_letter_animation .5s cubic-bezier(.46,.4,.56,.87) forwards;
  animation-delay: calc(var(--i) * 0.02s); /* Stagger pro Buchstabe, Delay-Werte nicht im CSS belegt */
}
```
Einschränkung: Der Stagger zwischen den Buchstaben ist im ausgelieferten CSS **nicht** belegt, die Buchstaben sind nur als einzelne `<span class="char">` vorhanden. Die Keyframes und die Animationsdauer 0,5 Sekunden sind belegt.

**Rezept 2: Button-Hintergrund mit weichem Ein- und Ausschwingen (exakt belegt)**
```css
.nectar-cta[data-style=text-reveal-wave][data-using-bg=true] .link_wrap {
  transition: background-color .3s ease;
}
.nectar-cta[data-style=text-reveal-wave][data-using-bg=true] .link_wrap:hover {
  transition: background-color .5s cubic-bezier(.23,.46,.4,1);
}
```
Beim Verlassen greift die 0,3-Sekunden-Variante, beim Hover die langsamere 0,5-Sekunden-Kurve. Der Unterschied ist Absicht: rein schnell, raus langsam.

**Rezept 3: Unterstrich von rechts nach links (exakt belegt)**
```css
.nectar-cta[data-style=underline] .link_wrap .link_text:after {
  content: ''; position: absolute; width: 100%; height: 2px; bottom: 0;
  border-bottom: 2px solid #000; background-color: transparent !important;
  transition: transform .4s cubic-bezier(.23,.46,.4,1); transform-origin: left;
}
.nectar-cta[data-style=underline].underline-visible-on-hover .link_wrap .link_text:after {
  transform: scaleX(0); transform-origin: right;
}
.link_wrap:hover .link_text:after {
  transform: scaleX(1); transform-origin: left;
}
```

**Rezept 4: Scroll-Reveal ohne Bibliothek (Werte belegt, Trigger nicht im JS lesbar)**
```css
.col.has-animation, .wpb_column.has-animation,
img.img-with-animation { opacity: 0; position: relative }

.wpb_column.has-animation[data-animation=slight-fade-in-from-bottom] { transform: translateY(50px) }
.col.has-animation[data-animation=fade-in-from-bottom],
.wpb_column.has-animation[data-animation=fade-in-from-bottom] { transform: translateY(75px) }
img.img-with-animation[data-animation=fade-in-from-bottom],
.img-with-aniamtion-wrap[data-animation=fade-in-from-bottom] .hover-wrap { transform: translateY(100px) }

.nectar-waypoint-el:not([data-nectar-waypoint-el-stagger]) { opacity: 0 }
```
Die Aufhebung setzt Salients `nectar-waypoints.js` per Klassenwechsel. Die genaue Übergangsdauer für diese Reveals ist im ausgelieferten CSS **nicht gefunden** worden; sicher belegt sind nur die Starttransformationen (50px, 75px, 100px) und der Startzustand `opacity: 0`. Für Nachbau: 0,6 bis 0,8 Sekunden `cubic-bezier(0.25,1,0.33,1)` (Hauskurve der Site) ist plausibel, aber nicht belegt.

**Rezept 5: Parallax-Hintergrund mit Clip-Path-Aufdeckung (Markup belegt)**
```html
<div class="parallax_section" data-bg-animation="clip-path" data-bg-animation-delay="1200">
  <div class="row-bg-wrap">
    <div class="row-bg using-image" data-parallax-speed="medium_fast"></div>
  </div>
</div>
```
Kombiniert mit dem separaten Scroll-Clip-Path aus `data-nectar-animate-settings`:
```json
{"animations":{"desktop":{"clipPath":{
  "start":"inset(0px 0px 0px 0px round 0)",
  "end":"inset(4% 4% 4% 4% round 20px)"}}},
 "offsets":{"start":"50.00","end":"80.00","origin":"top"},
 "config":{"inner_selector":".row-bg-layer"}}
```
Der Block schrumpft also beim Scrollen von Vollflächen auf 4 Prozent Innenabstand mit 20px Eckenrundung.

**Rezept 6: Bild-Zoom beim Reveal (exakt belegt)**
```css
@keyframes row_bg_zoom_out { 0% { transform: scale(1.2) } 100% { transform: scale(1) } }
```
Verwendet über `data-bg-animation="zoom-out-reveal"`.

### Anti-Patterns und Schwächen

**1. Kein `prefers-reduced-motion`.** Belegt: 0 Treffer in `salient-dynamic-styles.css`, `main-style.css`, `style-non-critical.css` und allen Inline-Styles. Bei gleichzeitigem Video-Autoplay, Parallax, Clip-Path-Scroll-Animation und Buchstaben-Reveals ist das ein klarer Barrierefreiheits-Verstoß, den wir nicht übernehmen.

**2. Kein `loading="lazy"`.** Belegt: 0 Treffer auf allen fünf geprüften Seiten. Die Startseite lädt 119 JPGs und 103 PNGs. Zwar federt WP Rocket und Salients `.nectar-lazy`-Mechanik das teilweise ab, aber das native Attribut fehlt vollständig. Nachbau: `loading="lazy"` plus `fetchpriority="high"` nur für das Hero-Bild.

**3. Riesige PNG-Dateien ohne AVIF.** 103 PNG-Treffer auf der Startseite, 176 auf der Energiesystem-Seite, 0 AVIF-Treffer auf allen Seiten. WebP nur auf einer von fünf Seiten. Bei einer Seite, die 504 KB HTML allein ausliefert, ist das verschenkte Ladezeit.

**4. Du-Ansprache und Sie-Ansprache gemischt.** Belegt: Title der Solaranlagen-Seite lautet `Solaranlagen: So findest du die Richtige!`, die H1 derselben Seite aber `Solaranlagen: So finden Sie die Richtige!`. Weiter: `Hier findest Du alles Wichtige rund um das Thema Solaranlage.` (injizierter Mega-Menü-Header), `Du interessierst dich für mehr?` (Magazin), `Volle Flexibilität - deine Wärmepumpe passt ins System` (Energiesystem). Innerhalb einer Seite wechselt die Anrede. Das gehört vereinheitlicht.

**5. Kein Telefonkontakt.** Auf der Startseite existiert kein einziges `tel:`-Link (0 Treffer bei 496 `phone`-Klassentreffern, die alle CSS-Klassen sind). Für eine Branche mit hoher Anrufbereitschaft und einem 94px hohen Sticky-Header ist das eine verschenkte Conversion-Fläche.

**6. Zwei H1 auf der Über-uns-Seite.** `Wir sind Energiekonzepte Deutschland` und `Unsere Vision vom perfekten Energiesystem` sind beide als H1 ausgezeichnet. SEO-Handwerkfehler.

**7. Inkonsistente Landingpage-Blöcke.** Auf `/stromspeicher/`, `/waermepumpe/` und `/energiesystem/` liegen mehrere Rows im DOM **nach** dem Footer (Row-IDs `fws_6aaa1d4490fbc` bis `fws_6aaa1d4491bc7` auf der Wärmepumpen-Seite). Das ist ein Builder-Artefakt und ein Hinweis auf unaufgeräumte Seiten.

**8. Glossar-Skalierung ohne Nutzenkontrolle.** 463 der 520 Seiten-URLs sind Glossar-Begriffe unter zwei Prefixen. Der Glossar-Hub selbst hat 3 H2 und keine H3, gruppiert Begriffe aber in `nectar-cta`-Blöcke, in denen 30 Link-Labels in einem einzigen Link-Text zusammenlaufen. Das ist für Screenreader problematisch.

**9. `data-animation="none"` als Mehrheit.** 66 von 97 `data-animation`-Attributen auf der Startseite sind `none`. Die Reveal-Mechanik wird also nur für einen Bruchteil der Elemente überhaupt genutzt.

### Conversion-Mechanik in 5 Sätzen

Erstens fängt der Hero mit einem Google-Sterne-Signal (4,2 von 5 bei 1.800 Bewertungen) direkt neben dem einzigen CTA "Kostenlose Beratung" die Unsicherheit ab, bevor der Nutzer etwas gelesen hat. Zweitens übernimmt eine Kaskade aus harten Zahlen (45.000 Anlagen, 90 Mio € Ersparnis, 15+ Standorte) den Beweis, ohne ein einziges Werbeadjektiv zu benutzen. Drittens gibt es mit dem Ersparnisrechner ein niedrigschwelliges Zwischenziel, das den Nutzer von der Website in einen Heyflow-Funnel bewegt, ohne dass er sofort seine Telefonnummer hergeben muss. Viertens führt die Ratgeberstrategie mit 463 Glossarseiten und langen Hybridseiten den Nutzer in der Informationsphase auf die Domain und setzt an jeder Kapitelgrenze einen Inline-CTA ("Jetzt Angebot anfordern", "Zum Ersparnisrechner"). Fünftens schließt jede einzelne Unterseite mit demselben Broschüren-Band in `#21262b` ab, das als letzter, reibungsarmer Mikroabschluss einen PDF-Download anbietet, wenn der Nutzer für den echten Funnel noch nicht bereit ist. Die gesamte Mechanik läuft ohne Telefonnummer und ohne sichtbares Kontaktformular auf der Hauptseite, alles führt über `/anfrage`, `/direktanfrage`, `/ersparnisrechner` und `/checkliste` in Heyflow.

## Abrufprotokoll

Alle Abrufe mit `curl -sL -m 30..40` und User-Agent `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36`.

| URL | Status | Bytes |
|---|---|---|
| https://www.ekd-solar.de/ | 200 | 504.115 |
| https://www.ekd-solar.de/robots.txt | 200 | 180 |
| https://www.ekd-solar.de/sitemap.xml | 200 | 666 |
| https://www.ekd-solar.de/sitemap_index.xml | (in sitemap.xml referenziert, nicht separat geholt) | - |
| https://www.ekd-solar.de/post-sitemap.xml | 200 | 38.321 |
| https://www.ekd-solar.de/page-sitemap.xml | 200 | 300.489 |
| https://www.ekd-solar.de/ppi-personio-job-sitemap.xml | 200 | 4.209 |
| https://www.ekd-solar.de/solaranlage/ | 200 | 360.702 |
| https://www.ekd-solar.de/stromspeicher/ | 200 | 562.191 |
| https://www.ekd-solar.de/waermepumpe/ | 200 | 445.139 |
| https://www.ekd-solar.de/unternehmen/ | 200 | 427.472 |
| https://www.ekd-solar.de/magazin/ | 200 | 313.293 |
| https://www.ekd-solar.de/ersparnisrechner/ | 200 | 322.421 |
| https://www.ekd-solar.de/kundenerfahrungen/ | 200 | 420.603 |
| https://www.ekd-solar.de/glossar/ | 200 | 492.146 |
| https://www.ekd-solar.de/photovoltaik/stromspeicher-kosten-2026/ | 200 | 328.008 |
| https://www.ekd-solar.de/kontakt/ | 200 | 278.761 |
| https://www.ekd-solar.de/energiesystem/ | 200 | 754.956 |
| https://www.ekd-solar.de/anfrage/ | 200 | 337.685 |
| https://www.ekd-solar.de/direktanfrage/ | 200 | 323.006 |
| https://www.ekd-solar.de/checkliste/ | 200 | 323.677 |
| https://www.ekd-solar.de/wp-content/uploads/salient/salient-dynamic-styles.css?ver=94907 | 200 | 199.156 |
| https://www.ekd-solar.de/wp-content/themes/salient-child-ekd-2023-04/style.css?ver=18.1.1 | 200 | 225 |
| https://www.ekd-solar.de/wp-content/uploads/useanyfont/uaf.css?ver=1776327840 | 200 | 2.097 |
| https://www.ekd-solar.de/wp-content/themes/salient/css/build/style.css?ver=18.1.1 | 200 | 164.251 |
| https://www.ekd-solar.de/wp-content/themes/salient/css/build/style-non-critical.css?ver=18.1.1 | 200 | 32.717 |

**Nicht abrufbar oder nicht belegbar:** Die Heyflow-Funnel-Schritte hinter den drei `flow-id`s (`yZPwZdIE6tMNOEYQFGy4`, `d5ierulbweq7ho5wptkt52y4`, `cnepcnt813wk7i1tzatuu5qh`) sind clientseitig und aus dem statischen HTML nicht auslesbar. Formularfelder, Fortschrittsanzeige und Microcopy der Funnel sind deshalb nicht dokumentiert. Einzelne Bilder, Videos und PDF-Dateien wurden nicht heruntergeladen. Keine Seite lieferte 403 oder eine leere Antwort.
