# priwatt.de

## Steckbrief

| Feld | Wert |
|---|---|
| Domain | https://priwatt.de/ (Startpunkt der Analyse: https://priwatt.de/solaranlagen/) |
| Marke | priwatt Energiesysteme GmbH, Leipzig (Schema.org: `"name":"priwatt Energiesysteme GmbH"`, `"founder":{"@type":"Person","name":"Kay Theuer"}`, `"telephone":"+49 341 221 796 80"`) |
| Branche | Photovoltaik, Balkonkraftwerke (Stecker-Solar), Batteriespeicher, Wärmepumpen, Zubehör, Split-Klimaanlagen, Stromtarif Orbit Energy |
| Geschäftsmodell | E-Commerce-Shop (Balkonkraftwerk-Sets, Zubehör) plus Lead-Gen mit Fachpartner-Montage (PV-Komplettanlagen, Wärmepumpen), Franchise-Stores |
| Seitentyp | Hybrid: Shop-Kategorieseiten mit eigenem Warenkorb, dazu Beratungs-Landingpages mit Funnel-Einstieg |
| Stack | Next.js (Pages Router) mit React, `x-powered-by: Next.js`, `x-nextjs-cache: HIT`, `cache-control: s-maxage=60, stale-while-revalidate`; serverseitig `server: nginx/1.24.0 (Ubuntu)` |
| CSS-in-JS | styled-components 5.3.11 (`data-styled-version="5.3.11"`, `componentId`-Klassen wie `sc-fd54d5fb-0`), dazu Tailwind-CSS-Utilities mit eigenem Token-Set |
| CMS | Headless WordPress: alle Redaktionsinhalte unter `/wordpress/wp-content/uploads/...` |
| Commerce/Backend | eigene API `api.priwatt.de/media/...` für Produktbilder, Checkout-Routen im Build-Manifest (`/checkout/gratitude`, `/checkout/processing/amazon-initiation`) |
| Analytics | Google Tag Manager `GTM-MWKSXWF`, Google Consent Mode v2 (`ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage` default `denied`) |
| Consent | Cookiebot (`consent.cookiebot.com/uc.js`, `data-cbid` gesetzt), `data-cookieconsent="ignore"` auf dem Shop-JSON-LD |
| CRM/Newsletter | Klaviyo (Link-Parameter `utm_medium=email&_kx=`), Typeform als Funnel, OMQ (`omq.io`) als FAQ-Helpdesk-Widget |
| Spam-Schutz | Cloudflare Turnstile (`id="cf-turnstile"`), kein reCAPTCHA |
| Schriften | Eigenhosted: Roobert (`__roobertFont_ae733a`, Gewichte 400/600/700) und N27 (`__n27Font_8e7e19`, nur Ziffern), beide als woff2 |
| Sprache | Deutsch, `<html class="scroll-smooth" lang="de">`, `hreflang="de-DE"` selbstreferenziell auf allen Seiten |
| Anrede | Durchgehend Du, mit konsequenter Genderform "KundInnen", "MieterInnen", "ExpertInnen-Support" |
| Sitemap-Umfang | 511 URLs: `sitemap-0.xml` 48, `server-sitemap-blog.xml` 318, `server-sitemap-products.xml` 143, `server-sitemap.xml` verweist nur |
| robots.txt | `User-agent: *` mit `Disallow: /wordpress/category`; alle KI-Crawler explizit erlaubt (GPTBot, ClaudeBot, PerplexityBot, Google-Extended), nur `CCBot` gesperrt |
| Analysierte Seiten | 18 (davon 17 priwatt.de + 1 externer Funnel) |

## Sitemap

### Hauptnavigation (aus `<header>`, `aria-label="Hauptnavigation"`)

| Ebene 1 | Ziel | Ebene 2 |
|---|---|---|
| Franchise | `/franchise-partner-werden/` | (Dropdown, Ziel unbekannt) |
| Solaranlagen | `/solaranlagen/` | Dropdown: 5 kWp, 7 kWp, 9 kWp, 10 kWp, DIY-Sets SunEnergyXT, Sets ohne Montage |
| Wärmepumpen | `/waermepumpen/` | Dropdown, Ziel unbekannt |
| Balkonkraftwerke | `/stecker-solaranlagen/` | Dropdown: Balkon, Garten, Flachdach, Fassade, Schrägdach, ohne Halterung |
| Speicher | `/balkonkraftwerk-speicher/` | Dropdown: GoodWe Sets, Einzelspeicher |
| Zubehör | `/zubehoer/` | Dropdown: Kabel, Energiemessung, Halterungen, Module/Wechselrichter |
| Blog | `/blog/` | Direktlink |
| Service | `/service/` | Dropdown (Erklärvideos, Ertragsrechner, FAQ) |

Über der Navigation liegt eine Announcement-Bar in `bg-dust-60` mit Rabattcode: "Speicher deine Mittagssonne für den Feierabend, 100€ Rabatt mit Code TAGZUNACHT" plus Button "Angebot sichern!" auf `/balkonkraftwerk-speicher/goodwe/`.

Rechts in der Navigation sitzt ein Warenkorb-Button mit `data-test="cart-button"` und `aria-label="Leerer Warenkorb"`, plus eine Telefonnummer ist **nicht** im Header (kein `tel:`-Link im Header).

### Footer (dunkles `bg-forest-100`, 6 Spalten)

| Gruppe | Einträge |
|---|---|
| USP-Zeile | Passgenaue Premium-Halterung, 100% normkonforme Sets, 30 Tage Rückgaberecht |
| Hilfe & Kontakt | Häufige Fragen (FAQ), Hilfe & Support, Zahlung & Versand, Erklär-Videos, Solar und PV News, Newsletter |
| Unternehmen | Karriere, Über uns, Presseraum |
| Solaranlagen | Solaranlage kaufen, Solaranlagen Zubehör, Solaranlage 5 kWp, 7 kWp, 9 kWp, 10 kWp |
| Balkonkraftwerke | konfigurieren, erweitern, Sets mit Speicher, Ertragsrechner, Zubehör, BKW Sets 800 Watt, BKW Sets 2000 Watt |
| Speicher | GoodWe Sets, Einzelspeicher |
| Wärmepumpen | Viessmann VITOCAL 250-A |
| Weitere Spalten | Versandpartner, Zahlungsmethoden, Social Media (Facebook, LinkedIn, Instagram, YouTube), Beratung (Kontakt aufnehmen, E-Mail Anfrage) |
| Rechtliches | Impressum, AGB, Datenschutzerklärung, Widerrufsbelehrung, Vertrag widerrufen, Rücknahme & Recycling, Barrierefreiheitserklärung |

Ortslisten im Footer: keine. Standort-Struktur liegt auf `/store-in-deiner-naehe/` (7 Stores).

### Sitemap-Zusammensetzung

| Sitemap | Anzahl | Inhalt |
|---|---|---|
| `sitemap-0.xml` | 48 | Kernseiten: 8x stecker-solaranlagen, 7x solaranlagen, 5x zubehoer, 4x service, 4x store-in-deiner-naehe, 3x ebooks plus Einzelseiten |
| `server-sitemap-blog.xml` | 318 | Ratgeber Artikel, 36 Paginierungsseiten auf `/blog/?page=N` |
| `server-sitemap-products.xml` | 143 | Produkt-Detailseiten: 120 unter `stecker-solaranlagen`, 19 unter `zubehoer`, 4 unter `balkonkraftwerk-speicher` |
| Build-Manifest | 67 Routen | zusätzlich `/checkout/*` (5), `/sales/*` (10), `/ebooks/*` (3), `/kontakt` (2), `/newsletter` (2) |

Produkt-URLs haben das Muster `/stecker-solaranlagen/<ort>/<halterung>/<variante>/<SKU>` und existieren je Variante in bis zu 4 SKU-Versionen (z. B. `garten/garten/priflat` in 4 SKUs).

## Seiten

### 1. https://priwatt.de/solaranlagen/ (Kategorieseite, Startpunkt)

| Feld | Wert |
|---|---|
| Title | Solaranlage kaufen: Dein individuelles Komplettset |
| Meta-Description | Alles aus einer Hand: Professionelle Beratung, unschlagbarer Preis, hochwertige Komponenten und schneller Montageservice von unseren Fachpartnern! |
| H1 | "Deine Solaranlage: Beratung & Montage vom Testsieger" |
| H2 / H3 | 13 / 51 |
| Schema.org | FAQPage, Question, Answer, Organization, Person, WebSite |
| Canonical | `https://priwatt.de/solaranlagen/`, hreflang `de-DE` |

**Sektionsliste in DOM-Reihenfolge**

| Nr | Sektionstyp | Headline wörtlich | Subline (gekürzt) | Layout | Medien | CTA-Labels | Trust-Elemente | Hinweis |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero (`id="hero"`) | "Deine Solaranlage: Beratung & Montage vom Testsieger" | "Alles aus einer Hand: Professionelle Beratung, unschlagbarer Preis, hochwertige Komponenten..." (16 Wörter) | 2-Spalten, mobil `flex-col-reverse`, Bild rechts `lg:w-1/2 xl:w-7/12` | Foto PNG, `fetchpriority="high"` | "Jetzt kostenlose Beratung sichern" | Eyebrow mit Blitz-Icon "Solaranlage kaufen: Alles aus einer Hand", 5 Häkchen-Liste (u. a. "Bereits über +80.000 zufriedene KundInnen", "Festpreis ohne versteckte Kosten") | Hero-Höhe `height:calc(100svh - 7.5rem)`, Bild `rounded-tr-[10.5rem]` |
| 2 | Logo-Wall (Presse) | (keine) | (keine) | Marquee/Slider, 15 Slides | SVG-Logos in `grayscale` | (keine) | Presse-Logos (GIGA, Gründerszene, efahrer, netzwelt u. a.) | Swiper ohne sichtbare Paginierung |
| 3 | Trust-Bar / Kontaktleiste (`id="cta-contact"`) | "Schnelle und unverbindliche Erstberatung?" | "Montag bis Freitag 9–17 Uhr" | Zentriert-schmal, Foto links | Foto `ContactPhoto.jpg` | `+49 151 420 510 42`, "WhatsApp Nachricht senden", "E-Mail senden" | Öffnungszeiten, Direktkontakt | Telefonnummer als `tel:`-Link auf `+4934122179680` verlinkt, Label zeigt Mobilnummer |
| 4 | Rechner/Funnel (`id="cta-typeform"`) | "Deine PV-Anlage: Errechne jetzt Deine Ersparnis!" | "Nur 4 Klicks bis zum unverbindlichen Angebot und kostenlosen Beratungstermin." | 2-Spalten 50/50, Bild links | Foto | "Los geht's" | 3 Punkte: "Kostenfrei und unverbindlich", "Sicher und transparent", "Professionell auf Dich zugeschnitten" | Link extern `form.typeform.com/to/vzr20lvC`, `target="_blank"` |
| 5 | Benefits-Grid (`id="four-reasons"`) | "4 gute Gründe für Deine eigene Solaranlage" | (keine) | 2x2-Grid, Icon-Karten | 4 Icons (identische Grafik) | (keine) | Zahlenbeweise im Text ("rund 5 Cent", "Schnitt um 10 % pro Jahr") | Hintergrund `bg-white-100/35` |
| 6 | Logo-Wall Marken (`id="brands"`) | "Top Marken für maximale Leistung und höchste Ansprüche" | "Wir arbeiten in Sachen Hardware nur mit den besten Herstellern zusammen:" | Full-bleed Banner plus Logo-Reihe | Banner `houseBanner.jpg`, Logos JaSolar, GoodWe, SunEnergyXT | (keine) | Hersteller-Marken | Hintergrund `bg-white-100/50` |
| 7 | Produkt-Karten (`id="komplettsets"`) | "Dein Solaranlagen-Komplettset" | "Abgestimmte Top-Komponenten für Deinen individuellen Bedarf." | 2er-Karten-Grid | Foto Monteure | Karte 1 "DIY Komplettsets" -> `/solaranlagen/komplettsets-sunenergyxt/`, Karte 2 "Komplettsets ohne Montage" -> `/solaranlagen/komplettsets-ohne-montage/` | (keine) | Beide Karten mit Untertitel-Zeile |
| 8 | Trust-Bar / Kontaktleiste | (wie Nr. 3) | | | | `+49 151 420 510 42`, "WhatsApp Nachricht senden", "E-Mail senden" | | Zweite Instanz, identischer Block |
| 9 | Bento-Grid (`id="bento-grid"`) | "Professionelle Montage durch unsere Fachpartner" | (keine) | Bento aus 5 Karten | Foto, Power-Card mit Zähler "1879 kWh*" | (keine) | "Garantierte Montage innerhalb von 4 Wochen nach Kauf", "Volle Gewährleistung auf Dach- & Elektroarbeiten", "Lebenslanger Profi-Service" | Zähler-Zahl in N27-Font |
| 10 | Video (`id="video"`) | "So funktioniert die Montage mit unseren Fachpartnern" | (keine) | Zentriert, 1 Video | YouTube-ID `CzzDVFsTL9Q` als Thumbnail, kein iframe | (keine) | (keine) | Click-to-load, `img.youtube.com/vi/.../maxresdefault.jpg` |
| 11 | Trust-Zeile (`id="floatingUsp"`) | (keine, 6 Karten) | (keine) | Slider/Marquee, 6 Items | Icons `DarkFlash.svg` | (keine) | "Lebenslanger Support", "30 Jahre Garantie", "30 Tage Rückgaberecht", "80.000 zufriedene KundInnen", "90.000 Tonnen CO2 eingespart", "Komplett-Sets" | Hintergrund `bg-white-60` |
| 12 | Logo-Wall (Presse) | (keine) | (keine) | Marquee, 15 Slides | SVG-Logos | (keine) | Presselogos | Zweite Instanz am Seitenende |
| 13 | Ratgeber-Teaser (`id="ressourcenhub"`) | "Ressourcenhub" | "Wie funktioniert eine Solaranlage?" und weitere | Tabs links, Inhalt rechts, mobil horizontale Scroll-Leiste | 4 Video-Thumbnails | Tab-Buttons "FAQs", "Beratung", "Videos", "Kontakt"; Textlinks in 4 Blöcke gruppiert | 3 Tabs mit 6 FAQ-Einträgen (`options[].children`), u. a. "Wie funktioniert eine Solaranlage?", "Lohnt sich eine Solaranlage?" | Inhalt doppelt im DOM (Tab-Panel plus H2-Blöcke darunter), 51 H3-Tags |

**Hero-Formel**: H1-Nutzenversprechen "Beratung & Montage vom Testsieger" (7 Wörter), Subline 16 Wörter, 1 CTA ("Jetzt kostenlose Beratung sichern"), Trust im Hero = 5 Häkchen-Punkte inkl. "Bereits über +80.000 zufriedene KundInnen" und "dreifach ausgezeichneter Meisterbetrieb", kein Sternerating, Medientyp Foto, Höhe `calc(100svh - 7.5rem)` mit `max-height:70.313vw` (mobil), 54.861vw (ab 1440px), `65.875rem` (ab 1920px).

**CTA-Strategie**: 7 Buttons mit `data-technical-name="pw-button"`: "Jetzt kostenlose Beratung sichern" (1), "Los geht's" (1, extern Typeform), "WhatsApp Nachricht senden" (2), "E-Mail senden" (2), "Kontakt" (1, Sticky-Bar). Dazu 2 `tel:`-Links und 2 `wa.me`-Links. Alle Beratungs-CTAs laufen auf denselben Typeform `vzr20lvC`. Sticky-Header-CTA: nein, nur Announcement-Bar. Telefonnummer im Header: nein.

**Trust-Staffelung**: Hero (80.000 KundInnen, Meisterbetrieb, Festpreis) -> Presse-Marquee -> Kontaktleiste mit Öffnungszeiten -> Markenlogos -> Bento mit Garantien -> USP-Slider (30 Jahre Garantie, 30 Tage Rückgabe, 90.000 t CO2) -> zweiter Presse-Marquee -> FAQ. Kein Google-Sterne-Widget, kein Trustpilot, kein `aggregateRating` im Schema.

**Funnel**: Der Funnel selbst liegt extern auf Typeform (siehe Seite 18). Auf dieser Seite nur der Einstieg per Button.

**Footer**: siehe Sitemap-Abschnitt.

### 2. https://priwatt.de/ (Startseite)

| Feld | Wert |
|---|---|
| Title | Solar Shop für Deine Energiewende - priwatt |
| Meta-Description | Von Balkon bis Dach: Im priwatt Solar Shop findest Du alles für Deine Energiewende. Über 80.000 Haushalte vertrauen uns. Starte Deine Unabhängigkeit! |
| H1 | "Balkonkraftwerk-Sets mit GoodWe Speicher ESA Athena" |
| H2 / H3 | 12 / 26 |
| Schema.org | FAQPage, Question, Answer, Organization, Person, WebSite |
| Canonical | `https://priwatt.de/`, hreflang `de-DE` |

**Sektionsliste in DOM-Reihenfolge**

| Nr | Sektionstyp | Headline wörtlich | Subline (gekürzt) | Layout | Medien | CTA-Labels | Trust-Elemente | Hinweis |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero-Slider (3 Slides, Full-bleed) | "Balkonkraftwerk-Sets mit GoodWe Speicher ESA Athena" | "Plug & Play, ab 999 €" | Full-bleed mit Overlay, Text links unten | 3 Bilder, erstes `fetchpriority="high"`, WebP plus JPEG als `<source>` | "Jetzt konfigurieren" (Slide 1), "Jetzt konfigurieren" (Slide 2), "Jetzt beraten lassen" (Slide 3) | Slide 1 listet 3 Fakten im Hero ("1,92 kWh heute. Bis zu 9,6 kWh morgen.", "Integrierter 800 W Wechselrichter und notstromfähig.", "Kein Werkzeug. Keine Fachkraft. In 30 Minuten fertig.") | Höhe inline `height:calc(100vh - 120px)` plus `min-height:44.3rem` ab Tablet, Swiper mit `effect:"fade"` und Autoplay |
| 2 | Testimonials/Community | "Werde Teil der priwatt-Community" | "Seit 5 Jahren treiben wir gemeinsam die private Energiewende voran, mit Lösungen, die langfristig überzeugen." | Slider/Marquee, 16 Slides | Zitat-Icons `quote-left.svg` | (keine) | Badge "+80.000 KundInnen vertrauen uns" | Kundenstimmen mit Namen und Ort, je mit kWh-Zahl als Beweis |
| 3 | Trust-Bar mit Foto | (keine Headline) | (keine) | 2-Spalten | Foto `ContactPhoto.jpg` | "Kontakt aufnehmen" -> `/kontakt/email/` | (keine) | Kürzester Block der Seite |
| 4 | Kategorie-Karten | "Unsere Lösungen für Deine Energiewende" | Kartentexte: "Vom Meisterbetrieb – Lass Dich jetzt kostenlos beraten", "Konfiguriere Dein Balkonkraftwerk-Komplettset", "Deine Heizrevolution mit bis zu 70 % Förderungen" | 3er-Grid, Karten mit Foto-Hintergrund und Icon | 3 Hintergrundfotos plus Icon-Overlays | Karte Solaranlagen, Karte Balkonkraftwerke, Karte Wärmepumpen | "Vom Meisterbetrieb", "bis zu 70 % Förderungen" | Hover: `hover:rounded-tr-2xl`, `transition-all duration-200 ease-in-out` |
| 5 | Produkt-Karten Bestseller | "Unsere Bestseller" | 4 Karten mit kWh-Angaben | 4er-Reihe (Swiper), mobil Slider | 4 Produktfotos von `api.priwatt.de` | 4x "Zum Komplettset" | Preisangaben "ab 1.249 €" mit Streichpreis "1.419 €", Badge "Starter-Set" / "Bestseller" | Hintergrund `bg-white-60`, Kartentitel z. B. "priBasic 1000 Wp mit 3,8 kWh Speicher" |
| 6 | Tabs/Rechner (`calculation-formula`) | "Fünf unschlagbare Argumente für priwatt" | (Tab-Inhalte) | Tabs als Pill-Slider, darunter Info-Spalte plus Rechen-Formel | Foto pro Tab | Tab-Labels "Wirtschaftlichkeit", "Autarkie", "Kompetenz", "Klimaschutz", "Community" | Rechenformel mit Quellenangabe in Kleinschrift ("*Berechnungsgrundlage: 10.000 kW/h Solarstromproduktion p.a., ... 4% jährlicher Strompreissteigerung, Betrachtungszeitraum 20 Jahre") | Umschalter ist ein `radio name="calculation-formula"`, Spalten-Headlines z. B. "Mehr Energie. Weniger Kosten." |
| 7 | Kategorie-Slider | "Dein Zuhause. Deine Energiewende." | (keine) | Slider mit Thumbnails (`swiper-active-thumb-slider`), 4 Slides | 4 Hintergrundfotos | "Mehr erfahren" (Solaranlage), "Mehr erfahren" (Wärmepumpe), "Jetzt konfigurieren" (Balkonkraftwerk), "Zu allen Speichern" | Preisanker in den Karten: "Bis zu 2000 Wp Ab 189 €", "Ab 629 €" | Karten-Titel "Deine Solaranlage", "Deine Wärmepumpe", "Dein Balkonkraftwerk", "Dein Speicher" (jeweils H5, doppelt im DOM) |
| 8 | Zähler/Stats | "So viel haben wir schon erreicht" | (keine) | 3er-Grid | Zähler als `<number-flow-react>`-Web-Components | (keine) | 3 Zahlen: "130 Mio. kWh aus erneuerbaren Energien gewonnen", "90.000 t C0² eingespart (Stand: August 2025)", "640 Berichte der begeisterten Presse über priwatt" | Kennzahlen stehen in `__NEXT_DATA__` als `{"value":130,"suffix":"Mio."}`, im HTML starten sie bei 0 und animieren hoch |
| 9 | Ratgeber-Teaser mit FAQ und Videos (`id="ressourcenhub"`) | "Häufige Fragen & Videos" | (keine) | Tabs links, Panel rechts, FAQ-Akkordeon | 80 Video-Thumbnails im DOM | Tabs "FAQs", "Beratung", "Videos", "Kontakt"; Textlinks unter anderem "Ertragsrechner für Deine Stromersparnis", "E-Books zur Energiewende" | Zwei Tab-Sets im DOM: das erste mit 5 Einträgen, das zweite mit 6 Blöcken: "Über priwatt", "Unser Versprechen: Alles aus einer Hand", "Was wir Dir für Deine Energiewende anbieten", "Unsere Serviceleistungen", "Welche Förderungen kann ich bei priwatt nutzen?", "Kontaktiere uns direkt" | Zusätzlich 6 Montageort-Kacheln (Flachdach, Garten, Balkon, Fassade, Schrägdach, Variabel) |

**Hero-Formel**: H1 "Balkonkraftwerk-Sets mit GoodWe Speicher ESA Athena" (6 Wörter) als Produktversprechen, Subline "Plug & Play, ab 999 €" (5 Wörter, Preis im Hero), 1 CTA pro Slide, Trust im Hero = 3 Faktenpunkte mit Icon, Medientyp Foto mit dunklem Verlauf (`linear-gradient(180deg, rgba(0, 0, 0, 0.00) 73.64%, rgba(0, 0, 0, 0.45) 100%)`), Höhe `calc(100vh - 120px)`.

**CTA-Strategie**: 18 Buttons mit `data-technical-name="pw-button"`, Labels: "Jetzt konfigurieren" (4), "Zum Komplettset" (4), "Mehr erfahren" (4), "Zu allen Speichern" (2), "Kontakt" (2), "Jetzt beraten lassen" (1), "Kontakt aufnehmen" (1). Alle Produkt-CTAs führen in den Konfigurator bzw. auf die Set-Detailseiten. Keine `tel:`-Links auf der Startseite, kein WhatsApp. Sticky-Header ja (`sticky left-0 right-0 top-0 z-600`), aber ohne eigenen CTA-Button, Telefonnummer im Header nein.

**Trust-Staffelung**: Hero mit Fakten -> Community-Testimonials mit Verbrauchszahlen -> Kontaktkarte -> Kategoriekarten mit Meisterbetrieb und Förderquote -> Bestseller mit Preisen -> Argumente-Tabs mit Rechenbeleg -> Statistik-Zähler (130 Mio. kWh, 90.000 t CO2, 640 Presseberichte) -> FAQ. Presselogos nur indirekt über die Zahl "640 Berichte".

### 3. https://priwatt.de/stecker-solaranlagen/ (Produkt-/Kategorieseite)

| Feld | Wert |
|---|---|
| Title | Balkonkraftwerk kaufen - priwatt |
| Meta-Description | Dein Balkonkraftwerk kaufen: Komplettsets für Balkon, Garten, Dach & Fassade, optional mit Speicher. Plug-&-Play zum Selbst montieren, sofort Strom sparen. |
| H1 | "Balkonkraftwerk kaufen: Der schnellste Weg Stromkosten zu senken!" |
| H2 / H3 | 6 / 19 |
| Schema.org | FAQPage, Question, Answer, Organization, Person, WebSite |
| Canonical | `https://priwatt.de/stecker-solaranlagen/`, hreflang `de-DE` |

**Sektionsliste in DOM-Reihenfolge**

| Nr | Sektionstyp | Headline wörtlich | Subline (gekürzt) | Layout | Medien | CTA-Labels | Trust-Elemente | Hinweis |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero (`id="hero"`) | "Balkonkraftwerk kaufen: Der schnellste Weg Stromkosten zu senken!" | (keine sichtbare Subline) | 2-Spalten, Bild links | Foto | "Jetzt konfigurieren" | (keine im Hero) | Höhe `100svh` ohne Header-Abzug, Klasse `!h-fit !min-h-[auto]` |
| 2 | Produkt-Karten (`id="preise"`) | "Wähle jetzt Dein Balkonkraftwerk" | "Für alle Montageorte geeignet." | 3er-Swiper, mobil Karussell | 3 Produktfotos | 3x "Zum Komplettset" plus 1x "Jetzt konfigurieren" | Badges "Starter-Set" und "Bestseller" auf Karten, Preis "ab 1.249 €" mit Streichpreis "1.419 €", Vorteilsliste pro Karte ("Notstrom bei Blackout", "Integrierter 800 W Wechselrichter", "Bestimme den Montageort selbst") | Kartentitel "1000 Wp mit 3,8 kWh Speicher", "2000 Wp mit 3,8 kWh Speicher", "900 Wp mit 3,8 kWh Speicher" |
| 3 | Trust-Zeile (`id="floatingUsp"`) | "So profitierst Du vom Kauf eines Balkonkraftwerks" | (keine) | 6 Karten in Slider | Icons | (keine) | "Lebenslanger Support", "30 Jahre Garantie", "30 Tage Rückgaberecht", "80.000 zufriedene KundInnen", "90.000 Tonnen CO2 eingespart", "Komplett-Sets" | Trustzeile direkt nach Preisliste platziert |
| 4 | Kategorie-Karten (`id="montageorte"`) | "Die perfekte Lösung für jeden Montageort" | "Schon gewusst? Balkonkraftwerke kannst Du an nahezu jedem Ort anbringen. Entdecke unsere Montageorte und Premium-Halterungen." | 5er-Grid (`lg:grid-cols-5`) | 5 Hintergrundfotos | "Garten", "Flachdach", "Fassade", "Balkon", "Schrägdach" | (keine) | 5 Kacheln, je auf eine Montageort-Landingpage |
| 5 | Referenzen/Community (`id="useCases"`) | "Inspiration aus der priwatt Community" | "Wir sind bereits über 80.000 und täglich werden es mehr. Werde auch Du ein Teil der Energiewende!" | Slider, 12 Slides | 12 Nutzerfotos | (keine) | Namen plus Ort plus Anlagenname (z. B. "Christoph aus Zülpich", "priShed Duo") | Echte Aufbaufotos statt Stockmaterial |
| 6 | Testimonials (`id="floatingReviews"`) | "So begeistert sind unsere KundInnen nach dem Kauf ihres Balkonkraftwerks – echte Erfahrungen, die überzeugen!" (mobil gekürzt: "Das sagen KundInnen nach dem Kauf ihres Balkonkraftwerks") | (keine) | Slider, 10 Slides | Zitat-Icon | (keine) | Kundenstimmen mit kWh-Werten und Sparsummen | Karten mit `border-forest-100/5` und `bg-white-60` |
| 7 | Ratgeber-Teaser (`id="ressourcenhub"`) | "Ressourcenhub" | 8 FAQ-Blöcke | Tabs plus Akkordeon | Video-Thumbnails | Tabs "FAQs", "Beratung", "Videos", "Kontakt" | 8 Blocktitel unter anderem "Welches Balkonkraftwerk soll ich kaufen?", "Was kostet ein Balkonkraftwerk?", "Brauche ich einen Speicher dazu?", "Was unterscheidet priwatt-Balkonkraftwerke von anderen?" | Erste Blocktitel mit Fragezeichen |
| 8 | Lead-Magnet (`id="formSectionStart"`) | "Sichere Dir Dein E-Book zum Download: Der ultimative Leitfaden zum Balkonkraftwerk" | "Stand Frühjahr 2026 sind bereits über 1,3 Millionen Stecker-Solaranlagen in Deutschland im Marktstammdatenregister eingetragen." | 2-Spalten, Tablet-Mockup links, Formular rechts | Bild `Tablet-Ebook.webp` | "Jetzt Leitfaden sichern", "Mehr lesen" (Consent-Text aufklappen) | Zahl als Autoritätsbeleg (1,3 Mio. Anlagen) | Formularfelder Vorname, Nachname, E-Mail plus 3 Consent-Checkboxen plus Turnstile |
| Sticky-Bar | In-Page-Navigation | (keine) | (keine) | `fixed z-50` am unteren Rand | (keine) | Sprunglinks "Montageorte", "priwatt Community", "Bestseller", "Ressourcenhub" plus Button "Jetzt konfigurieren" | (keine) | `translate-y-full` als Startzustand, `shadow-xl-top`, taucht beim Scrollen auf |

**Hero-Formel**: H1 als Nutzenversprechen "schnellster Weg Stromkosten zu senken" (9 Wörter), keine Subline, 1 CTA ("Jetzt konfigurieren"), kein Trust-Signal im Hero, Medientyp Foto, Höhe `100svh`.

**CTA-Strategie**: 9 Buttons: "Jetzt konfigurieren" (3), "Zum Komplettset" (3), "Kontakt" (2), "Jetzt Leitfaden sichern" (1). Alle Konfigurator-Buttons zielen auf `/stecker-solaranlagen/basic/ohne-halterung/pribasic-duo-ohne-halterung/SW10753.7`. Kein `tel:`, kein WhatsApp auf dieser Seite. Sticky-Bar unten ja, Sticky-Header-CTA nein.

**Trust-Staffelung**: Hero ohne Trust -> Preisliste mit Badges und Streichpreisen -> USP-Zeile (6 Punkte) -> Montageorte -> Community-Fotos -> Kundenstimmen -> FAQ -> E-Book-Formular mit Marktzahl.

### 4. https://priwatt.de/waermepumpen/ (Leistungsseite)

| Feld | Wert |
|---|---|
| Title | Wärmepumpe kaufen: Viessmann Premium bis 70 % Förderung |
| Meta-Description | Wärmepumpen mit Komplettservice: Beratung, Installation & Inbetriebnahme. Förderung & Finanzierung aus einer Hand – Eigenanteil ab 16 € monatlicher Rate! |
| H1 | "Viessmann Premium Wärmepumpe kaufen – Moderne Heiztechnik vom Fachbetrieb" |
| H2 / H3 | 8 / 18 |
| Schema.org | FAQPage, Question, Answer, Organization, Person, WebSite |
| Canonical | `https://priwatt.de/waermepumpen/`, hreflang `de-DE` |

**Sektionsliste in DOM-Reihenfolge**

| Nr | Sektionstyp | Headline wörtlich | Subline (gekürzt) | Layout | Medien | CTA-Labels | Trust-Elemente | Hinweis |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero (`id="hero"`) | "Viessmann Premium Wärmepumpe kaufen – Moderne Heiztechnik vom Fachbetrieb" | "Hocheffiziente Luft-Wasser-Wärmepumpen von Viessmann – professionell beraten, fachgerecht installiert und opti..." | 2-Spalten | Foto | "Jetzt kostenlos beraten lassen" | Herstellername Viessmann im H1 | Höhe `calc(100svh - 7.5rem)`, gleiche Klasse wie Solaranlagen-Hero |
| 2 | Logo-Wall (Presse) | (keine) | (keine) | Marquee, 15 Slides | SVG-Logos | (keine) | Presselogos | identisches Modul wie auf anderen Seiten |
| 3 | Kontaktleiste (`id="cta-contact"`) | (keine Headline) | (keine) | Zentriert | (keine) | "WhatsApp Nachricht senden" (`wa.me/4915142090501`), "E-Mail senden" (`mailto:waermepumpen@priwatt.de`) | (keine) | Eigene WhatsApp-Nummer für Wärmepumpen |
| 4 | Produkt-Karten (`productListingSection`) | "Hocheffiziente Premium Wärmepumpen von Viessmann – Beratung, Installation und Inbetriebnahme aus einer Hand." | (keine) | 1 große Karte | Gerätefoto | "Mehr erfahren" -> Blogartikel | (keine) | Einziges Modell: VITOCAL 250-A |
| 5 | Rechner/Funnel | "Hier geht's zu Deiner individuellen Wärmepumpe-Beratung!" | (keine) | 2-Spalten | (keine) | "Los geht's" -> Typeform | (keine) | Gleicher Typeform wie PV |
| 6 | Förder-Block (`id="imagery"`) | "Senke mit Förderungen und Zuschüssen bis zu 70 % Deiner Anschaffungskosten" | (keine) | 2-Spalten mit Grafik | SVG-Illustration 412x417 | "Zur kostenlosen Erstberatung" -> Anker `#cta-typeform` | Förderquote 70 % | Ankerlink in derselben Seite |
| 7 | Benefits-Grid (`id="four-reasons"`) | "Warum eine Luft-Wasser-Wärmepumpe?" | (keine) | 2x2-Grid | Icons | (keine) | "Maximale Förderung bis 70 % garantiert", "Flexible Finanzierung", "Premium-Technologie mit Komplettservice zum besten Preis", "Perfekte Solar-Integration" | Paralleler Aufbau zu `/solaranlagen/` |
| 8 | FAQ-Akkordeon (`id="acordion"`) | "Unser empfohlenes Wärmepumpen-Modell im Überblick" | (keine) | Akkordeon plus Tabs | Produktfotos, App-Screenshot | (keine) | Punkte "Ideal für die Modernisierung", "Intuitive ViCare App" | Schreibfehler im Anker (`acordion`) |
| 9 | Vergleichstabelle (`id="comparison-bars"`) | "Wärmepumpe vs. Gas-/Ölheizung: Jedes Jahr sparen" | (keine) | Balkenvergleich | (keine) | (keine) | Konkrete Jahreskosten Gasheizung, Ölheizung, Wärmepumpe | Balkenlängen als Vergleich |
| 10 | Prozess-Steps (`id="steps"`) | "Wärmepumpe kaufen & installieren lassen" | "Step-by-Step zu Deiner modernen Heizlösung" | Step-Karten mit Mitarbeiterfotos | Mitarbeiterporträt pro Step | (keine) | Gesichter der BeraterInnen im Prozess | Erster Step "Schnelle und unverbindliche Erstberatung" |
| 11 | Kontaktleiste | (wie Nr. 3) | | | | WhatsApp, E-Mail | | Zweite Instanz |
| 12 | Rechner/Funnel (`id="calculate-savings"`) | "Die Installation Deiner Wärmepumpe überlässt Du den Profis" | "Fachgerechte Installation nach aktuellen Standards – inklusive aller VDE-Vorgaben." | 2-Spalten | (keine) | "Los geht's" -> Anker `#cta-typeform` | VDE-Vorgaben erwähnt | |
| 13 | Trust-Zeile (`id="floatingUsp"`) | (keine) | (keine) | Slider | Icons | (keine) | gleiche 6 USP-Karten | |
| 14 | Logo-Wall | (keine) | (keine) | Marquee | SVG-Logos | (keine) | Presselogos | |
| 15 | Ratgeber-Teaser (`id="ressourcenhub"`) | "Ressourcenhub" | 11 FAQ-Einträge | Tabs plus Akkordeon | Thumbnails | Tabs "FAQs", "Beratung" | Blöcke zu Förderung, Vorlauftemperatur, Lautstärke, SG-Ready, hydraulischem Abgleich | 2 Tabs statt 4 (kein Video-, kein Kontakt-Tab) |

**CTA-Strategie**: 10 Buttons: "WhatsApp Nachricht senden" (2), "E-Mail senden" (2), "Los geht's" (2), "Jetzt kostenlos beraten lassen" (1), "Mehr erfahren" (1), "Zur kostenlosen Erstberatung" (1), "Kontakt" (1). Kein Preis, kein Warenkorb, reine Lead-Strecke.

### 5. https://priwatt.de/solaranlagen/24-module-10-kwp/ (Produkt-Landingpage)

| Feld | Wert |
|---|---|
| Title | 10 kWp Solaranlage mit Komplettservice - priwatt |
| Meta-Description | 10 kWp PV-Anlage: Beratung, Installation und Inbetriebnahme sowie Förder-Check. Attraktive 0-%-Finanzierung möglich. Deine Solaranlage finanziert sich selbst! |
| H1 | "Solaranlage 10 kWp – Deine komplette Energielösung für maximale Unabhängigkeit" |
| H2 / H3 | 5 / 21 |
| Schema.org | FAQPage, Question, Answer, Organization, Person, WebSite |
| Canonical | `https://priwatt.de/solaranlagen/24-module-10-kwp/`, hreflang `de-DE` |

**Sektionsliste in DOM-Reihenfolge**

| Nr | Sektionstyp | Headline wörtlich | Layout | Medien | CTA-Labels | Trust-Elemente |
|---|---|---|---|---|---|---|
| 1 | Hero (`id="hero"`) | "Solaranlage 10 kWp – Deine komplette Energielösung für maximale Unabhängigkeit" | 2-Spalten | Foto | "Jetzt kostenlose Beratung sichern" (Link mit `sub_id=unde...`) | (keine im Hero) |
| 2 | Kontaktleiste | (keine) | Zentriert | (keine) | "WhatsApp Nachricht senden", "E-Mail senden" | (keine) |
| 3 | Vergleichstabelle / Varianten | "Deine PV-Anlage 10 kWp mit 24 Modulen" | 4er-Grid (`H4`: Schrägdach, Flachdach, Zaun, Carport) | 4 Variantenbilder | 4 Anker auf Typeform plus "Jetzt anfragen" | Badge "Montagetermin innerhalb 4 Wochen" auf jeder Variante, Specs "24 Full Black Module mit je 415-445 Wp" |
| 4 | Montageort-Karten | "Der perfekte Montageort für Deine PV-Anlage mit 24 Modulen und 10 kWp" | 4 Karten | Fotos | (keine) | (keine) |
| 5 | Kontaktleiste | (keine) | | | WhatsApp, E-Mail | |
| 6 | Komponenten-Zigzag | "Die Komponenten Deiner Photovoltaikanlage" | Zigzag, 4 Blöcke | 4 Produktfotos | (keine) | Bauteilangaben: "Solarmodule (415-445 Wp)", "Speicher (5-15 kWh)", "Montagesystem mit Unterkonstruktion", "Verkabelung und Stecker" |
| 7 | Prozess (`id` leer) | "Professionelle Beratung, Montage & Inbetriebnahme" | Zentriert | (keine) | (keine) | Prozessversprechen im Titel |
| 8 | Ratgeber-Teaser (`id="ressourcenhub"`) | "Ressourcenhub" | Tabs plus Akkordeon | Thumbnails | Tab-Buttons "Häufige Fragen", "Blogartikel", "Videos" | 17 FAQ-Einträge im Tab "Häufige Fragen" (im DOM als H3-Links, deshalb kein Fragezeichen im Tag), plus 6 Blogartikel und 1 Video; Fragen wie "Was kostet eine 10 kWp Solaranlage mit Speicher?", "Welche Einspeisevergütung bekomme ich für eine 10 kWp Solaranlage?" |

**CTA-Strategie**: 4x "Jetzt anfragen" (alle direkt auf Typeform), 1x "Jetzt kostenlose Beratung sichern", 2x WhatsApp, 2x E-Mail. Kein Warenkorb, obwohl es eine Produktseite ist. Preise fehlen vollständig.

### 6. https://priwatt.de/balkonkraftwerk-speicher/goodwe/ (Kategorieseite Speicher)

| Feld | Wert |
|---|---|
| Title | Balkonkraftwerk Sets mit GoodWe Speicher kaufen - priwatt |
| H1 | "Balkonkraftwerk-Sets mit GoodWe Speicher Athena" |
| Sections | 4 `<section>`-Tags, davon Hero plus Slider-Module |
| Canonical | `https://priwatt.de/balkonkraftwerk-speicher/goodwe/` |

Ziel der Announcement-Bar ("Angebot sichern!"). Aufbau entspricht der Startseite (gleicher Hero-Titel), jedoch ohne Kategorie-Karten und ohne Tabs-Argumente-Sektion. Belege im DOM: H1 identisch mit dem Startseiten-Slide 1, 36 WebP-Referenzen, Produktbilder von `api.priwatt.de`.

### 7. https://priwatt.de/stecker-solaranlagen/ohne-halterung/pribasic-duo/SW11911.4 (Produkt-Detailseite)

| Feld | Wert |
|---|---|
| Sections | 4 |
| H3 | "Premium Solarmodul 500 Wp" |
| Schema.org | Organization, Person, WebSite (kein Product-Schema gefunden) |

**Sektionsliste**

| Nr | Sektionstyp | Inhalt | Layout | CTA-Labels | Trust-Elemente |
|---|---|---|---|---|---|
| 1 | Produkt-Buy-Box | Tabs "Solarmodul" und "Batteriespeicher", Spec-Liste "Monokristalline Zellstruktur", "500 W Nennleistung", "Wirkungsgrad 22,72 %", "Maße und Gewicht 1960 × 1134 × 30 mm, 26,6 kg", Link "Datenblatt" (PDF auf `api.priwatt.de`) | 2-Spalten mit Galerie | "In den Warenkorb" (2x), "Optionen Vergleichen" | Trust-Zeile direkt am Button: "Rückgaberecht 30 Tage", "Lieferzeitraum 12-15 Werktage", "Ratenzahlung möglich", "30 Jahre Garantie", "Wir akzeptieren" (Zahlungslogos), Preis-Hinweis "(inkl. 0% MwSt. ( zzgl. Versandkosten ))" |
| 2 | Cross-Sell | "Kundlnnen kauften auch" | 5 Karten | 5x "Zum Produkt" | (keine) |
| 3 | Testimonials (`floatingReviews`) | "Das sagt die priwatt Community Kundenstimmen" | Slider | (keine) | Kundenstimmen |
| 4 | Ratgeber/FAQ | (Ressourcenhub-Struktur) | Tabs | (keine) | (keine) |

**Funnel/Formular**: Warenkorb statt Leadformular. Wichtige Schwäche: Die Cross-Sell-Links enthalten unaufgelöste Platzhalter, z. B. `href="/stecker-solaranlagen/[category]/zubehoer/kabel/..."`.

### 8. https://priwatt.de/ueber-uns/ (Über uns)

| Feld | Wert |
|---|---|
| Title | priwatt: Erfahre mehr über uns und unser Team |
| H1 | "Über uns" |
| H2 / H3 | 5 / 2 |
| Schema.org | Organization, Person, WebSite |
| Canonical | `https://priwatt.de/ueber-uns/` |

**Sektionsliste**

| Nr | Sektionstyp | Headline wörtlich | Layout | Medien | Inhalt/Beleg |
|---|---|---|---|---|---|
| 1 | Mission plus Zähler | "Was uns motiviert" / "Unsere Mission: Solarenergie für alle nutzbar machen, schnell und einfach nach dem DIY-Prinzip" | 2-Spalten Text, darunter 3 Zähler | Team-Foto-Hero (`Aktion_-Solar-Dea-4.webp`), Bild-Slider mit 3 Team-/Office-Fotos | Zähler-Karten mit "mehr als" plus Wert, u. a. "130 Mio." mit Unit "kWh aus erneuerbaren Energien gewonnen"; Text nennt "über 48 GWh aus grünem Solarstrom" |
| 2 | Team | "Unser Team" | 4er-Grid | 4 Porträts | 4 Mitglieder im `__NEXT_DATA__`, z. B. "Norman Schulz", Position "B2B Manager", Kurztext "... versorgt unser Team mit Humor und die Teams anderer Unternehmen mit Stecker-Solaranlagen."; Fließtext nennt "über 40 IngenieurInnen, Solar-ExpertInnen, MarketerInnen, AutorInnen (und vierbeinigen Feel-Good-ManagerInnen)" plus "20 DigitalexpertInnen unserer Partneragentur und Gesellschafterin TWNTY Ventures" | CTA "Werde Teil unseres Teams" -> `/career/` |
| 3 | Timeline/Geschichte | "Unsere Geschichte" | Timeline mit 4 Ereignissen | (keine) | Erster Eintrag "Von der Idee zur Bewegung: Wie priwatt Balkonkraftwerke salonfähig machte" mit "Im August 2020 – mitten in der Pandemie"; Zitatblock "„Wir brauchen eine einfache Möglichkeit, mit der alle ihren Solarstrom selbst produzieren können!"", Ursprung "50-m2-Garagenlager" |
| 4 | Presse | "Auch die Presse ist Feuer und Flamme für Stecker-Solaranlagen" | Pressekarten | Verlagslogos | Zwei verlinkte Artikel (Mitteldeutsche Zeitung, startup-mitteldeutschland.de) |

**Besonderheit**: Die Team-Sektion zeigt nur 4 Mitglieder, obwohl der Text "über 40" nennt. Die Hero-Slider-Bilder verweisen teils auf `develop.priwatt.de` (Staging-Host), z. B. `https://develop.priwatt.de/wordpress/wp-content/uploads/2023/11/team-scaled.jpeg`.

### 9. https://priwatt.de/erfahrungen/ (Referenzen/Testimonials)

| Feld | Wert |
|---|---|
| Title | Das sagt man über priwatt: Kundenerfahrungen & Auszeichnungen |
| Meta-Description | Warum sich über 80.000 Haushalte für priwatt entscheiden: Echte Erfahrungen von KundInnen, Pressestimmen und unabhängige Auszeichnungen auf einen Blick |
| H1 | "Wir sind priwatt: Erfahrungen, Auszeichnungen & Pressestimmen" |
| H2 / H3 | 4 / 0 |
| Schema.org | Organization, Person, WebSite, FAQPage (nur global) |
| Canonical | `https://priwatt.de/erfahrungen/` |

**Sektionsliste**

| Nr | Sektionstyp | Headline wörtlich | Layout | Medien | Trust-Elemente |
|---|---|---|---|---|---|
| 1 | Hero-Bild | "Wir sind priwatt: Erfahrungen, Auszeichnungen & Pressestimmen" | Full-bleed Bild mit Overlay | Hintergrundbild `ExpiriencePageHero.png` | (keine) |
| 2 | Zähler | (wie Startseite) | 3 Zahlen | (keine) | 130 Mio. kWh, 90.000 t, 640 Berichte |
| 3 | Video | (Video-Sektion) | Zentriert | YouTube-Thumbnail `MXBFk4YwcPc`, Titel im `__NEXT_DATA__`: "Wie wir in 1 Jahr mit einem Balkonkraftwerk Stromkosten sparen!" | (keine) |
| 4 | Testimonials (`floatingReviews`) | "Erfahrungen aus der priwatt-Community:" | Slider, 10 Karten | Zitat-Icons | 10 Kundenstimmen mit vollem Namen und Ort (Jürgen aus Fuldabrück, Thomas aus Altbach, Michael aus Estenfeld, Matthias aus Lüdenscheid, Isabelle aus Guben, Ludolf aus Oftersheim, Martin aus Paderborn u. a.), je mit kWh-Zahl |
| 5 | Logo-Wall Presse | "Bekannt aus:" | Marquee, 15 Slides | Verlagslogos | energetmagazin, GIGA, Gründerszene, efahrer, netzwelt u. a. |
| 6 | Gründer-Zitat | (kein H) | 2-Spalten mit Porträt | `kay-profile.png` | Zitat "„Es macht mich stolz, zu sehen, wie viele Menschen mit priwatt Teil der Energiewende werden. Seit fünf Jahren begeistern wir mit unserer Mission – und wir sind noch lange nicht am Ziel."" von "Kay Theuer, Mitgründer & Geschäftsführer von priwatt" |
| 7 | Referenzen Community | "Diese priwatt-Anlagen produzieren fleißig Strom:" | Slider, 12 Karten | Nutzerfotos | Karten mit Name plus Ort plus Anlagenbezeichnung |
| 8 | Presse | "Pressestimmen: So wird über priwatt berichtet" | Pressekarten mit Zitat | Verlagslogos | Artikel mit Autor, Medium, Auszug und Link |
| Hinweis | Auszeichnungen | Sektion `brandSection` existiert im `__NEXT_DATA__` mit Titel "Unsere Auszeichnungen", hat aber `"isVisible": false` und wird nicht gerendert | | | |

**Wichtig**: Trotz "Auszeichnungen" im Title und in der Meta-Description enthält die Seite **keine** sichtbaren Auszeichnungen. Der einzige Beleg für "dreifach ausgezeichneter Meisterbetrieb" steht als Textzeile auf `/solaranlagen/`. Kein Google-Sterne-Rating, kein Trustpilot-Widget, kein `aggregateRating`.

### 10. https://priwatt.de/blog/ (Ratgeber-Übersicht)

| Feld | Wert |
|---|---|
| Title | Solar & PV News |
| Meta-Description | Solar PV News ✓ Alles rund um Balkonkraftwerke & Mini-Solaranlagen ✓ echte Experten ✓ regelmäßige Ratgeber |
| H1 | "Solar & PV News" (Klasse `sr-only`, nur für Screenreader) |
| H2 / H3 | 0 / 1 |
| Canonical | `https://priwatt.de/blog/` |

**Aufbau**: Ein `<article>`-Wrapper mit einer Featured-Karte (groß, `lg:w-[48.8%]`, Höhe `lg:h-[34.75rem]`) und 9 kleineren Karten in einer Liste. Jede Karte zeigt Datum, Kategorie-Tag, Lesezeit, Titel, Teaser, AutorIn. 10 Artikel pro Seite, Paginierung über `/blog/?page=N` bis Seite 36, also rund 350 Artikel-Einträge.

**Karten-Bestandteile**: Datum ("10. Juli"), Tag ("Förderung"), "Lesezeit 5 Minuten" (doppelt im DOM), Titel, Teaser, AutorIn ("Michelle"). Beispiel-Titel: "Änderung Förderung Wärmepumpe 2026: Das musst Du jetzt wissen".

**Newsletter**: Unterhalb der Liste ein Formular mit Feldern "Vorname*" und "E-Mail*" plus Consent-Checkbox, Button "Newsletter abonnieren", Link auf "Datenschutzerklärung".

**Footer/Header**: identisch zu allen Seiten, inklusive Footer-USP-Zeile.

### 11. https://priwatt.de/blog/balkonkraftwerk-mit-speicher-sinnvoll/ (Ratgeber-Artikel)

| Feld | Wert |
|---|---|
| Title | Balkonkraftwerk mit Speicher: Lohnt es sich? Ratgeber |
| Meta-Description | Lohnt sich ein Balkonkraftwerk mit Speicher? Wann er sinnvoll ist, welche Größe Du brauchst, was er kostet und worauf Du achten musst. |
| H1 | "Balkonkraftwerk mit Speicher: Lohnt es sich? Der große Ratgeber" |
| H2 / H3 | 15 / 12 |
| Schema.org | BlogPosting, WebPage, Organization, Person, WebSite |
| Canonical | `https://priwatt.de/blog/balkonkraftwerk-mit-speicher-sinnvoll/` |

**BlogPosting-Schema wörtlich** (aus `<script id="item-jsonld">`): `"genre":"Balkonkraftwerk"`, `"datePublished":"2026-07-28T08:02:17+02:00"`, `"dateModified":"2026-07-28T08:09:39+02:00"`, `"author":[{"@type":"Person","name":"Sandra","image":".../2026/04/Sandra.jpg","jobTitle":"Redakteurin"}]`, `"keywords":["Balkonkraftwerk"]`. Kein `wordCount`, kein `aggregateRating`.

**Artikel-Aufbau in DOM-Reihenfolge**

| Nr | Element | Beleg |
|---|---|---|
| 1 | Artikel-Header zentriert (`md:items-center`) | `<header class="... flex flex-col items-start space-y-2xl md:items-center">` |
| 2 | Autorenzeile mit Porträt, Name, Rolle | `<h3 class="text-md font-semibold text-green-100">Sandra</h3>` plus `<p class="text-xs text-green-100">Redakteurin</p>` |
| 3 | Veröffentlichungsdatum plus Kategorie-Tag plus Lesezeit | `<abbr title="Veröffentlichung">VÖ</abbr>: 28. Juli 2026`, Tag "Balkonkraftwerk" in `bg-lime-100`, "Lesezeit 9 Minuten" |
| 4 | Titelbild | `featuresBackground-scaled.jpeg`, `fetchpriority="high"`, Höhe `25rem`, `rounded-sm` |
| 5 | Autorenbox mit Selbstvorstellung | "Für mich ist die Energiewende kein neues Thema: Mit betriebswirtschaftlichem Hintergrund und Fokus auf Nachhaltigkeit, regionale Wirtschaftskreisläufe und die Agenda 2030 schreibe ich seit 2022 über PV, Wärmepumpen und Balkonkraftwerke." |
| 6 | Sticky-Share-Sidebar (`xl:sticky`) | "Teilen" mit Facebook-Sharer-Link, `xl:flex-col` |
| 7 | Key-Takeaways-Box | `<h2>Das Wichtigste in Kürze</h2>` mit 4 Bullets, u. a. "Ein Speicher steigert den Eigenverbrauch Deines Balkonkraftwerks von typischen 30–50 % auf 70–90 %" |
| 8 | Artikeltext in `text-editor`-Wrapper | 14 H2 und 12 H3, Inhaltsverzeichnis **nicht vorhanden** (kein "Inhaltsverzeichnis", keine Heading-IDs) |
| 9 | Eingebettete Produktkarte mitten im Text | `data-technical-name="pw-product-card-small"`, Bild von `localhost:18890` (5 Vorkommen, siehe Schwächen) |
| 10 | Zwischen-CTA als E-Book-Box | H3 "Sichere Dir jetzt unser kostenloses E-Book mit Checkliste und allen wichtigen Infos" |
| 11 | Fazit | H2 "Fazit: Für die meisten eine lohnende Investition" |
| 12 | FAQ mit 6 Fragen | H2 "Häufig gestellte Fragen", letzte H3 ist leer (Rendering-Rest) |
| 13 | Verwandte Artikel | H2 "LeserInnen interessierte auch:", der Slider ist im HTML **leer** (nur Preloader-Divs) |

**Textlänge**: rund 1.900 Wörter im Artikel-Body. **Bilder**: 17 `<img>` im Artikelbereich. **Interne Links**: 13 auf priwatt.de, davon 10 auf `/stecker-solaranlagen/` und 4 auf `/blog/`. **Listen**: 6 `<ul>`, **Tabellen**: 2, **Figures**: 5. Keine externen Links im Artikel.

**Autoren-Einheit fix**: Name, Jobtitel, Foto und Kategorie-Tag sind Teil des Templates, nicht des Artikels.

### 12. https://priwatt.de/service/ertragsrechner/ (Rechner/Funnel)

| Feld | Wert |
|---|---|
| Title | Ertragsrechner Balkonkraftwerk: Berechne Deine Ersparnis |
| Meta-Description | Mit dem priwatt-Balkonkraftwerk-Rechner berechnest Du Stromkosteneinsparung, Eigenverbrauch, Ertrag und CO₂-Ersparnis. Wie sehr lohnt es sich für Dich? |
| H1 | "Jetzt Balkonkraftwerk Ersparnis berechnen!" (Desktop) und "Jetzt Ersparnis berechnen!" (mobil) |
| H2 / H3 | 1 / 8 |
| Canonical | `https://priwatt.de/service/ertragsrechner/` |

**Sektionsliste**

| Nr | Sektionstyp | Headline wörtlich | Layout | CTA/Inhalt |
|---|---|---|---|---|
| 1 | Hero | H1 doppelt (Desktop/Mobil-Variante) | 2-Spalten | "Jetzt Berechnung starten" als Ankerlink `#ertragsrechner` |
| 2 | Rechner (`id="ertragsrechner"`) | (Widget) | 3-Schritt-Wizard | siehe unten |
| 3 | Beratungs-Block | "Du hast Fragen?" | Zentriert, 4 Feature-Karten | "Jetzt Termin vereinbaren" -> `/kontakt/`; Karten "Individuelle Fachberatung", "Kinderleichte Montage", "Schneller Support in Garantiefragen", "Lebenslanger Support" |
| 4 | Lead-Magnet (`id="formSectionStart"`) | "Sichere Dir Dein E-Book zum Download: Der ultimative Leitfaden zum Balkonkraftwerk" | 2-Spalten | "Jetzt Leitfaden sichern", "Mehr lesen" |
| 5 | Ratgeber-Text | "Bestimme Deinen Photovoltaik-Eigenverbrauch mit unserem Balkonkraftwerk-Rechner" | Tabs plus Text | 7 Blöcke, unter anderem "So nutzt Du unseren Balkonkraftwerk-Rechner:", "Rechenbeispiel: Lohnt sich ein Balkonkraftwerk?" |

**Funnel/Formular im Detail** (aus `__NEXT_DATA__` `calculatorSection.steps`):

3 Schritte mit Fortschrittsleiste im Kopf: "Dein Verbrauch", "Dein Einsatzort", "Dein Ergebnis".

| Schritt | Frage wörtlich | Antworttyp | Optionen wörtlich |
|---|---|---|---|
| 1 | "Wie viele Menschen leben in Deinem Haushalt?" | Kacheln | "1 Person", "2 Personen", "3 Personen", "4 Personen"; optional "Optional Verbrauch und Preis eingeben" mit Select "Stromverbrauch" (2000, 2500, 3000, 3500, 4000 kWh) und Eingabefeld "Strompreis" in Cent, Platzhalter "41,00 Cent", Range 1 bis 100 |
| 2 | "Wo wirst Du Dein Balkonkraftwerk montieren?" | Kacheln | "Garten/ Flachdach" (20°), "Schrägdach" (40°), "Gitterbalkon" (70°), "Fassade" (90°); optional Winkel 20/40/70/90° und Ausrichtung "Ost", "Süd-Osten", "Süden", "Süd-Westen", "Westen" |
| 3 | "Sonne Dich in Deinen Vorteilen." | Ergebnis | "Glückwunsch, hier ist Dein Ergebnis!" mit Result-Karte "Deine Kosteneinsparung" (€/Jahr), Detailzeilen "Ertrag pro Jahr" (kWh), "Eigenversorgung pro Jahr" (kWh), "CO2-Ersparnis/Jahr" (Tonnen), dazu 3 Produktempfehlungen mit Button "Zum Produkt" und Preis-Präfix "ab" |

**Microcopy**: Kleinschrift-Hinweis unter der Result-Karte: "*Berechnet mit einem Standardhaushaltslastprofil - der reale Eigenverbrauch kann abweichen." Keine Angabe von persönlichen Daten in Schritt 1 und 2, alle Eingaben sind Kacheln. Persönliche Daten erst im E-Book-Formular darunter, dort aber nur Vorname, Nachname, E-Mail.

**Fehlertexte**: "Hier scheint etwas nicht zu stimmen. Bitte prüfe Deine Eingabe." für Out-of-Range und Nicht-Zahlen.

### 13. https://priwatt.de/kontakt/ (Kontakt)

| Feld | Wert |
|---|---|
| Title | priwatt KundInnensupport & Kontakt |
| H1 | "Hallo, wie können wir Dir helfen?" |
| H2 / H3 | 0 / 3 |
| Canonical | `https://priwatt.de/kontakt/` |

**Aufbau**: Zentrierter Header (`max-w-span8`) mit Eyebrow-Icon plus Label "Kontakt", H1, Subline "Tippe Deine Frage im Suchfeld ein, und erhalte direkt eine Antwort." Darunter ein OMQ-Suchwidget (`id="omq-container"`, Klassen `faq__preloader`), das clientseitig geladen wird. Im HTML steht nur ein Preloader-Gerüst, keine Frage-Texte.

Darunter 3 Karten: "Schau Dir unsere Videos an" -> "Hier gehts zur Videothek", "Erfahre mehr in unserem Blog" -> "Hier gehts zur Blog", "Kontaktiere uns per E-Mail" -> "Schicke uns eine E-Mail".

Kein klassisches Kontaktformular auf dieser Seite, der E-Mail-Weg läuft über `/kontakt/email/`.

### 14. https://priwatt.de/service/faq/ (FAQ)

| Feld | Wert |
|---|---|
| Title | FAQ & Häufige Fragen |
| Meta-Description | FAQ ► Montage ✓ Versand ✓ Zahlungen ✓ Stecker ✓ Hilfreiche Informationen |
| H1 | "Hallo, wie können wir Dir helfen?" |
| H2 / H3 | 0 / 0 |
| Schema.org | Organization, Person, WebSite (kein FAQPage) |
| Canonical | `https://priwatt.de/service/faq/` |

**Aufbau**: identischer Header wie `/kontakt/`. Der gesamte FAQ-Inhalt kommt aus dem OMQ-Helpdesk-Widget (`omq-help-container`, `omq-help-account`, `omq-help-api-key` als leere Attribute im HTML, gefüllt per JS). Im Quelltext stehen keine Fragen, nur 17 `aria-expanded="false"`-Buttons und die Widget-Styles. Das Suchfeld ist nicht im HTML, sondern wird vom Widget gerendert. Kein FAQPage-Schema auf dieser Seite.

### 15. https://priwatt.de/store-in-deiner-naehe/ (Standorte)

| Feld | Wert |
|---|---|
| Title | Store in Deiner Nähe – Beratung & Installation |
| Meta-Description | Finde den priwatt Store in Deiner Nähe. Kostenlose Beratung, Fördercheck und Installation von Wärmepumpen, PV-Anlagen & Klimaanlagen. ✓ Zertifizierte Partner |
| H1 | "Deine Energielösung. Persönlich. Vor Ort." |
| H2 / H3 | 4 / 26 |
| Schema.org | Offer, OfferCatalog, FAQPage, Organization, Person, WebSite |
| Canonical | `https://priwatt.de/store-in-deiner-naehe/` |

**Sektionsliste**

| Nr | Sektionstyp | Headline wörtlich | Layout | CTA | Trust |
|---|---|---|---|---|---|
| 1 | Hero (`id="hero"`, `bg-green-100`) | "Deine Energielösung. Persönlich. Vor Ort." | Zentriert | "Standorte finden" (Anker) | (keine) |
| 2 | Zähler | (wie Startseite) | 3 Zahlen | (keine) | 130 Mio. kWh, 90.000 t, 640 Berichte |
| 3 | Karten-Liste (`id="stores"`) | "Finde einen Store in Deiner Nähe" | Kartenliste, Filter-Tabs | "Alle Stores" (Tab), je Store "Zur Store-Seite" | Pro Store Telefonnummer und E-Mail, z. B. "Tel.: +49 177 7825 806" (Teutschenthal), "Tel.: +49 178 5100 346" (Riegel am Kaiserstuhl), "Freiburg@priwatt.de", "Ludwigshafen@priwatt.de" |
| 4 | Lösungs-Karten | "Unsere Lösungen für Deine Energiewende" | 3er-Grid | Wärmepumpen, PV-Anlagen, Klimaanlagen | "Zertifizierte Partner" (aus Meta-Description) |
| 5 | Prozess-Steps | "In 4 Schritten zu Deiner Energielösung:" | 4 Step-Karten | (keine) | "Standort finden", "Beratung vor Ort", "Planung & Angebot", "Installation" |
| 6 | Ratgeber-Teaser (`id="ressourcenhub"`) | "Häufige Fragen" | Tabs plus Akkordeon | (keine) | 1 Tab mit 11 FAQ-Einträgen |

**7 Store-Standorte**: Halle (Saale) mit Teutschenthal, Riegel am Kaiserstuhl, Bad Oeynhausen, Freiburg, Ludwigshafen, Hamburg, Rennsteig Region. Im Schema sind nur 3 als `Offer` hinterlegt (`teutschenthal`, `riegel-am-kaiserstuhl`, `bad-oeynhausen`).

### 16. https://priwatt.de/career/ (Karriere)

| Feld | Wert |
|---|---|
| Title | Karriere |
| Meta-Description | Teil von Priwatt werden. Suchen Sie nach der Arbeit Ihrer Berufung |
| H1 | "Werde Teil des Teams" |
| H2 / H3 | 1 / 5 |

**Sektionsliste**: 1) Header `bg-white-100` mit H1; 2) Werte-Block "Dafür stehen wir" mit den Kacheln "Über uns", "Teamwork", "Nachhaltigkeit", "Passion", "Fairness"; 3) Stellenliste unter H3 "Offene Stellen" mit dem Zustand "Kein Datensatz gefunden" (keine offenen Stellen zum Abrufzeitpunkt); 4) Bewerbungsformular unter H2 "Du möchtest Teil des Teams werden? Bewirb Dich jetzt!" mit H4 "Anhang für Lebenslauf/Anschreiben", Link "Datenschutzerklärung", Button "Bewerbung abschicken".

### 17. https://priwatt.de/presseraum/ (Presse)

| Feld | Wert |
|---|---|
| Title | priwatt Presseraum - Materialien und Bilder für JournalistInnen |
| H1 | kein H1 im DOM, die Seite nutzt H2 |
| H2 / H3 | 2 / 4 |
| Canonical | `https://priwatt.de/presseraum/` |

**Aufbau**: Große Bildfläche mit dem Schriftzug "Presse Raum.", darunter "Du interessierst Dich für das Thema Solar und möchtest über priwatt und die Energiewende für alle berichten? Dann findest Du hier die passenden Informationen und Materialien für Deinen Beitrag." Plus Kontaktblock "Deine AnsprechpartnerIn" mit E-Mail-Hinweis. Kein Pressekontakt-Formular, keine Download-Materialien im HTML sichtbar.

### 18. https://form.typeform.com/to/vzr20lvC (externer Funnel)

Dies ist der zentrale Multi-Step-Funnel. Titel im Typeform-Objekt: "Starte jetzt Deine Energierevolution", Meta-Titel "Starte Deine Energiewende!", Beschreibung "Starte jetzt mit Wärmepumpe, Solaranlage oder beidem in Deine Energiewende!". Fortschrittsbalken: `"progress_bar":"proportion"`, `"show_progress_bar":true`. Sprache `de`, Theme mit Farben `question: #2E4A3B`, `background: #F4F2EB`, `button: #FFFFFF`, Schrift "Helvetica Neue (Mac)", `rounded_corners: small`.

**Felder in Reihenfolge** (aus dem eingebetteten Formular-JSON):

| Nr | Typ | Frage wörtlich | Antwortoptionen |
|---|---|---|---|
| 1 | multiple_choice | "Wie möchtest Du in Zukunft Kosten sparen?" | "Solaranlage", "Wärmepumpe", "Solaranlage & Wärmepumpe" |
| 2 | picture_choice | "Wie viele Personen leben in Deinem Haushalt?" | "1-2 Personen", "3-5 Personen", "5 Personen oder mehr" |
| 3 | picture_choice | "Welche Dachform hat Dein Haus?" | "Schrägdach", "Flachdach", "Andere Dachform" |
| 4 | picture_choice | "Wie heizt Du aktuell?" | "Gas", "Öl", "Strom", "Holz", "Anderes" |
| 5 | statement | "Deine Förderung wartet!" | Zwischenschritt ohne Eingabe |
| 6 | contact_info | "Bitte gib Deine Kontaktdaten an und wir melden uns bei Dir mit Deinem Sparpotenzial." | Subfelder "First name", "Last name", "Phone number", "Email", alle `required: true` |
| 7 | short_text | "In welcher Straße & Hausnummer soll die Solaranlage installiert werden?" | Freitext |
| 8 | short_text | "Bitte teile uns noch die Stadt und Postleitzahl mit" | Freitext |
| Abschluss | thankyou_screen | "Vielen Dank für Deine Angaben. Wir melden uns in Kürze bei Dir!" | ohne Button |

Muster: 4 Qualifizierungsfragen vor der ersten Datenabfrage, Adresse erst nach dem Kontaktblock, am Ende ein Förderschritt als Motivations-Brücke.

## Design-System

Alle Werte aus `/_next/static/css/0346111fcfb2ffc9.css` (186.480 Bytes, im Bericht `app.css`), `/_next/static/css/890258743c10881d.css` (13.752 Bytes, `page.css`) und den Inline-`<style>`-Blöcken (20.834 Bytes, davon 3 styled-components-Sheets).

### Schriften

| Rolle | Familie | Quelle | Gewichte | Fallback |
|---|---|---|---|---|
| Display und Body | Roobert | `@font-face{font-family:__roobertFont_ae733a;src:url(/_next/static/media/94a3324d74dfb3d6-s.p.woff2) format("woff2");font-display:swap;font-weight:400}` plus 600 und 700 | 400, 600, 700 | `__roobertFont_Fallback_ae733a` mit `local("Arial")`, `size-adjust:103.20%` |
| Ziffern (Zähler, Preise) | N27 | `@font-face{font-family:__n27Font_8e7e19;...font-weight:400}`, `unicode-range:u+30-39,U+0000-U+007F,u+20ac` | 400 | `__n27Font_Fallback_8e7e19` mit `size-adjust:102.98%` |

Zuordnung per Utility: `.font-n27{font-family:var(--font-n27)}` und `.font-roobert{font-family:var(--font-roobert)}`. `body,main{font-family:var(--font-roobert)}`. Kein Google-Fonts- oder Adobe-Fonts-Link, alles selbst gehostet und per `<link rel="preload" as="font">` vorgeladen.

Ein Hinweis zum Tailwind-System: `--font-roobert:'__roobertFont_ae733a', '__roobertFont_Fallback_ae733a'`. Der gemessene `font-bold` ist nicht 700, sondern 750, `font-semibold` ist 650: `.font-bold{font-weight:750}`, `.font-semibold{font-weight:650}`, `.font-normal{font-weight:400}`.

### Farben

Die 10 häufigsten Farbwerte aus dem CSS plus die vollständige Token-Liste:

| Häufigkeit | Wert | Token | Verwendung |
|---|---|---|---|
| 15 | `rgba(19,34,25,.15)` | `forest-100/15` | Trennlinien, Rahmen, Paginierungspunkte |
| 11 | `rgba(19,34,25,.5)` | `forest-100/50` | Sekundärtext, Label-Rahmen |
| 11 | `#132219` | `forest-100` | Primärtext, dunkle Buttons, Footer-Fläche |
| 10 | `#f3f1e8` | `white-100` | Sektionshintergrund warm |
| 10 | `#fefefb` | `white-60` | Body-Hintergrund (`--background:#fefefb`) |
| 8 | `#5c7a68` | `green-60` | Hover-Textfarbe der Navigation |
| 7 | `#caf476` | `lime-100` | Hauptakzent, Hero-Button, Tag-Badges |
| 7 | `#fefefb` | `white-60` | Kartenhintergrund |
| 6 | `rgba(19,34,25,.05)` | `forest-100/5` | Kartenrahmen |
| 3 | `#eafbc8` | `lime-40` | Icon-Flächen im Hero |
| 2 | `#335942` | `green-100` | Dunkelgrüner Button, Store-Hero |
| 2 | `#adbdb3` | `green-40` | Zähler-Suffix |
| 1 | `#45ea8f` | `fresh-100` | Akzentlinien, NProgress-Balken, SVG-Highlights |
| 1 | `#e3dcb2` | `dust-60` | Announcement-Bar |
| 1 | `#f16a4c` | `orange-100` | Warnfarbe |
| 1 | `#b8ddf8` | `blue-40` | Kartenfläche |
| 1 | `#bdacfd` | `lavender-100` | Newsletter-Badge |

Vollständige Palette (`<name>-<stufe>` mit `bg`, `text`, `border`, `fill`, `stroke`):

| Familie | 40 | 60 | 100 |
|---|---|---|---|
| white | rgb(255 255 255) | rgb(254 254 251) | rgb(243 241 232) |
| forest | (fehlt) | (fehlt) | rgb(19 34 25) |
| green | rgb(173 189 179) | rgb(92 122 104) | rgb(51 89 66) |
| lime | rgb(234 251 200) | rgb(223 248 173) | rgb(202 244 118) |
| fresh | rgb(181 247 210) | rgb(143 242 188) | rgb(69 234 143) |
| dust | rgb(235 230 198) | rgb(227 220 178) | (fehlt) |
| blue | rgb(184 221 248) | (fehlt) | rgb(77 171 237) |
| lavender | rgb(229 222 254) | rgb(215 205 254) | rgb(189 172 253) |
| orange | rgb(249 199 183) | (fehlt) | rgb(241 106 76) |

Rollen: Hintergrund `#FEFEFB`, Fläche `#F3F1E8`, Text `#132219`, Akzent auf Primär-Buttons `#CAF476` (Lime) mit Text in `#132219`, Zweitbutton `#335942` (Green) mit Text in `#FFFFFF`. Ein klassisches Grün-Blau-Akzentschema gibt es nur für Browser-UI (`.nprogress .bar{background:#3EDC99}`).

CSS-Custom-Properties: nur Tailwind-Interna (`--tw-*`). Eigene Variablen sind minimal: `:root{--background:#fefefb;--foreground:#132219;scrollbar-gutter:stable}`, plus `--font-roobert` und `--font-n27`. Kein `--primary`/`--accent`-Set.

### Radius

| Utility | Wert | Verwendung |
|---|---|---|
| `rounded-xs` | .125rem | Annahme: kleine Marker |
| `rounded-sm` | .25rem | Standard für Buttons, Karten, Bilder |
| `rounded-md` | .5rem | Größere Karten, Modalflächen |
| `rounded-lg` | 1rem | Slider-Container (`swiper-active-thumb-slider rounded-lg`) |
| `rounded-xl` | 1.5rem | Pill-Umschalter (`rounded-xl py-xs`) |
| `rounded-2xl` | 7rem | Karten-Hover (`hover:rounded-tr-2xl`) |
| `rounded-3xl` | 10.5rem | Hero-Bildecken |
| `rounded-[28px]` | 28px | Tab-Container |
| `rounded-full` | 50% | Radiopunkte, Puls-Punkt |

Signatur-Muster: **asymmetrische Ecken**. Regelmäßig nur eine Ecke groß gerundet: `rounded-tr-2xl` (7rem), `rounded-tr-3xl` (10.5rem), `rounded-tr-[10.5rem]` am Hero-Bild, `rounded-tr-[1.4rem]` am Autorenbild, `rounded-tr-xs` am Icon, `rounded-bl-sm rounded-tr-[10.5rem]` kombiniert am Solaranlagen-Hero. Buttons starten bei `rounded-sm` (4px) und gehen im Hover auf `border-top-right-radius:1rem` (`hover:rounded-tr-lg`).

### Shadows

| Wert | Beleg | Verwendung |
|---|---|---|
| `var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)` | `.shadow-xl-top` in `app.css` | Sticky-Bar unten und Sticky-Header |
| `0px 9px 20px 0px rgba(19,34,25,0.12)` | `app.css`, Tooltip-Klasse | Tippy-Tooltip, Modalflächen |
| `0px -2px 20px 0px rgba(19,34,25,0.12)` | `app.css`, Hover-Zustand des Puls-Punkts | Schwebender Hover-Effekt |
| `0 5px 30px -4px rgba(119,132,165,0.4)` | `app.css` | Einzelner starker Schatten |
| `0 0 10px #3EDC99, 0 0 5px #3EDC99` | `app.css` NProgress | Ladefortschritts-Balken |

Das System ist fast schattenfrei. Flächen werden über Farbwechsel (`bg-white-60`, `bg-white-100`, `bg-forest-100`) statt über Elevation getrennt.

### Spacing und Container

| Token | Wert |
|---|---|
| Container breit | `max-w-screen-2xl{max-width:1920px}` |
| Container schmal | `max-w-screen-xl{max-width:1440px}` |
| Lesespalten | `span3` 20.5rem, `span4` 27.5rem, `span5` 34.75rem, `span8` 56.5rem, `span11` 78.25rem |
| Container-Padding | `px-lg` 1rem, `md:px-2xl` 1.5rem, `lg:px-3xl` 2rem, `xl:px-9` 2.25rem, Sonderfall `xl:px-6xl` 3.5rem |
| Sektions-Padding Standard | `py-4xl` 2.5rem, `md:py-5xl` 3rem, `lg:py-6xl` 3.5rem, `xl:py-9xl` 5rem |
| Sektions-Padding groß | `py-7xl` 4rem, `lg:py-8xl` 4.5rem, `xl:py-9xl` 5rem, `pt-11xl` 7.25rem |
| Abstands-Skala | `xs` .25, `sm` .5, `md` .75, `lg` 1, `xl` 1.25, `2xl` 1.5, `3xl` 2, `4xl` 2.5, `5xl` 3, `6xl` 3.5, `7xl` 4, `8xl` 4.5, `9xl` 5, `10xl` 6rem |

Breakpoints im CSS: 360, 475, 768, 1024, 1440, 1920 px (Häufigkeit: 768 mit 27 Vorkommen, 1024 mit 12, 1440 mit 10).

### Typo-Skala

| Token | Größe | Line-Height | Letter-Spacing |
|---|---|---|---|
| `text-s` | .5rem | 150% | .01em |
| `text-xs` | .75rem | 150% | .01em |
| `text-sm` | .875rem | 150% | .01em |
| `text-md` | 1rem | 150% | .01em |
| `text-lg` | 1.125rem | 108% | -.01em |
| `text-xl` | 1.25rem | 108% | -.01em |
| `text-2xl` | 1.5rem | 108% | -.01em |
| `text-3xl` | 2rem | 108% | -.01em |
| `text-4xl` | 2.25rem | 108% | -.01em |
| `text-5xl` | 3rem | 108% | -.01em |
| `text-6xl` | 3.75rem | 108% | -.01em |
| `text-7xl` | 4.5rem | 108% | -.01em |
| `text-8xl` | 6rem | 108% | -.01em |

Kein `clamp()` in der Typografie. Der einzige `clamp`-Treffer im CSS ist `clamp(.875rem,1.35vw,1.25rem)` in einer Einzelstelle. Headlines nutzen stattdessen responsive Stufen, z. B. Hero-H1 `text-3xl md:text-6xl xl:text-8xl`, also 3rem bis 6rem. Ab 1440px greift zusätzlich `line-height:90%` (`@media (min-width:1440px){.fWHtDd{line-height:90%;}}`). Body-Text 1rem / 150%. Sektions-H2 meist `text-3xl md:text-4xl xl:text-5xl`, also 2rem bis 3rem.

Editor-Defaults aus `app.css` für CMS-Inhalte: `h1{font-size:2rem;line-height:108%;letter-spacing:-.01em;font-weight:750}`, ab 768px auf 3rem; `h2` 1.5rem auf 2rem; `h3` 1.25rem auf 1.5rem; `h4` 1.125rem auf 1.25rem; `h5` 1rem mit 150% auf 1.125rem.

### Bilder

| Merkmal | Beleg |
|---|---|
| Optimierer | `/_next/image/?url=...&w=...&q=75`, 399 Vorkommen auf der Startseite |
| Formate | WebP mit JPEG-Fallback als `<source>`; 80 `.webp`-Referenzen auf der Startseite, AVIF 0 |
| Breiten-Stufen | 16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840 |
| Lazy Loading | 57 von 92 Bildern mit `loading="lazy"` auf der Startseite |
| Priorität | 1 Bild mit `fetchpriority="high"` pro Seite (Hero-LCP) |
| Alt-Texte | 47 Bilder mit Alt-Text, 45 mit leerem `alt=""`, 0 ohne Alt-Attribut |
| Quellen | Redaktion `priwatt.de/wordpress/wp-content/uploads/...`, Produkte `api.priwatt.de/media/...`, Videos `img.youtube.com/vi/...` |

### Videos

Kein `<video>`-Tag, kein `<iframe>` im ausgelieferten HTML auf keiner der geprüften Seiten. Video-Sektionen rendern nur `img.youtube.com/vi/<ID>/maxresdefault.jpg` als Thumbnail (`videoSection` auf `/solaranlagen/` mit `https://www.youtube.com/watch?v=CzzDVFsTL9Q`). Das ist Click-to-load und spart den YouTube-Player vollständig.

## Animationen

Es gibt **keine** Motion-Library. Kein GSAP, kein ScrollTrigger, kein Lenis, kein Framer Motion, kein AOS, kein Lottie, kein Rive, kein Three.js, kein Webflow, kein Elementor. Belege aus den geladenen JS-Chunks und dem HTML: Treffer für "gsap", "ScrollTrigger", "lenis", "framer", "data-aos", "data-w-id", "elementor" = 0. Alles läuft über CSS-Transitions, CSS-Keyframes, Swiper und eine IntersectionObserver-freie Implementierung.

### Transitions

Standard-Utility in `app.css`:

```
.transition-\[border-radius\2c background-color\]{transition-property:border-radius,background-color;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}
.duration-300{transition-duration:.3s}
.duration-500{transition-duration:.5s}
.duration-200{transition-duration:.2s}
.ease-in-out{transition-timing-function:cubic-bezier(.4,0,.2,1)}
.ease-out{transition-timing-function:cubic-bezier(0,0,.2,1)}
```

Ausgezählte Timing-Funktionen: `cubic-bezier(.4,0,.2,1)` 19x, `cubic-bezier(0,0,.2,1)` 1x, `cubic-bezier(.54,1.5,.38,1.11)` 1x (nur Tippy-Tooltip-Trägheit). Bei den Dauern führt `.15s` mit 18 Deklarationen, dann `.3s` mit 2, `.2s`, `.5s`, `.7s`, `1s`, `2s` je 1.

Alle animierten Property-Kombinationen im CSS:

| Properties | Anzahl |
|---|---|
| `opacity` | 3 |
| `transform` | 3 |
| `color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter` | 1 (Tailwind `transition`) |
| `border-radius,background-color` | 1 |
| `border-radius` | 1 |
| `height,opacity` | 1 |
| `max-height` | 1 |
| `opacity,height` | 1 |
| `opacity,transform` | 1 |
| `opacity,visibility,transform` | 1 |
| `padding`, `stroke`, `transform,opacity`, `all`, `height`, `transform,height`, `transform,visibility,opacity` | je 1 |

`will-change: transform` wird genau 1x gesetzt.

### Keyframes

| Name | Inhalt wörtlich | Anwendung |
|---|---|---|
| `bounceAngle` | `0%{transform:none}50%{transform:translate(10%,-10%)}to{transform:none}` | `.group:hover .group-hover\:animate-bounceAngle{animation:bounceAngle 1s infinite}` |
| `fade` | `0%,to{opacity:1}50%{opacity:.5}` | `animate-[fade_1s_ease_infinite]`, dazu Varianten mit `.4s` und `.5s` Delay |
| `pulse` | `50%{content:var(--tw-content);opacity:.5}to{content:var(--tw-content);transform:scale(1.4185);opacity:0}` | `.animate-pulse{animation:pulse 1.4s ease infinite}` |
| `pulseDot` | `0%{transform:translate(-50%,-50%) scale(1);opacity:1}to{transform:translate(-50%,-50%) scale(3);opacity:0}` | `.animate-pulseDot{animation:pulseDot 2.4s ease infinite}` (Karten-Hotspots) |
| `runEnergieStrokes` | `0%{stroke-dashoffset:50}to{stroke-dashoffset:-600}` | `.\[\&_\.animStroke\]\:animate-runEnergieStrokes .animStroke{animation:runEnergieStrokes 2.4s linear infinite}` und `.animate-runEnergieStrokesReverse{animation:runEnergieStrokes 8s linear infinite reverse}` (Energiefluss in SVG) |
| `swiper-preloader-spin` | `0%{transform:rotate(0deg)}to{transform:rotate(1turn)}` | Swiper-Ladespinner |
| `fslhPo` (inline) | `0%{opacity:1;}50%,100%{opacity:0.5;}` | `animation:fslhPo 1s infinite alternate`, 6 Vorkommen |
| `iKBLzF` (inline) | `0%{transform:scale(1);opacity:1;}100%{transform:scale(1.4185);opacity:0;}` | `animation:iKBLzF 1.4s ease infinite`, 2 Vorkommen, Halo um Karten-Hotspot |
| `nprogress-spinner` | (Ladebalken) | `animation:nprogress-spinner 400ms linear infinite` |

### Motion-Trigger und Muster

| Muster | Beleg | Verhalten |
|---|---|---|
| Hero-Slider Autoplay | `js_index.js`: `autoplay:{delay:d,disableOnInteraction:!1}` mit `slideChangeSpeed:5` und `slideTransitionSped:0.6` aus `__NEXT_DATA__` `timers:{"idleState":0.5,"slideTransitionSped":0.6,"slideChangeSpeed":5}` | Slide wechselt alle 5.000ms, Übergang 600ms, Effekt `effect:"fade"`; Idle-Ruhezustand 500ms; Autoplay stoppt bei `onMouseEnter`, startet bei `onMouseLeave` neu; nur ab 1024px aktiv (`breakpoints:{0:{allowTouchMove:!0},1024:{autoplay:{...},allowTouchMove:!1}}`) |
| Marquee-Logo-Wall | `inline_styles.css`: `.jivyXn .swiper-wrapper{transition-timing-function:linear !important}` plus `js_5178`: `freeMode:{enabled:!0,sticky:!1,momentum:!1}` mit `speed:0` und `loop:!0`, Slides werden doppelt gerendert `[...l,...l]` | Endlos-Lauf ohne Easing, Slide-Breite fest: `width:20.5rem !important`, ab 768px `21.62rem`, ab 1600px `21.89rem` |
| Sticky Header | `<header class="sticky left-0 right-0 top-0 z-600 transition-transform duration-300 ease-in-out">` | Zwei Sticky-Ebenen: Announcement-Zeile plus Navigationszeile (`sticky ... bg-white-60 scrollbar-stable`) |
| Sticky In-Page-Bar | `p_stecker.html`: `<div class="fixed z-50 w-full bg-transparent transition-transform duration-500 translate-y-full flex justify-center" style="bottom:0">` mit `shadow-xl-top` | Fährt beim Scrollen hoch, enthält Sprunglinks plus Konfigurator-Button |
| Sticky Article-Sidebar | `p_artikel.html`: `<aside class="... xl:sticky xl:mt-0 xl:flex xl:flex-col xl:items-start">` | Share-Leiste klebt ab 1440px |
| Hover auf Buttons | `home.html`: `transition-[border-radius,background-color] ... hover:rounded-tr-lg` | Ecke oben rechts springt von 4px auf 1rem, Dauer 150ms, `cubic-bezier(.4,0,.2,1)` |
| Hover auf Karten | `home.html`: `transition-all duration-200 ease-in-out hover:rounded-tr-2xl` | Radius der Karten-Ecke springt auf 7rem bei 200ms |
| Hover auf Navigationspunkten | `home.html`: `transition-color ... duration-300 ease-in-out group-hover:text-green-60`, Chevron `rotate-90 ... group-hover:translate-y-px`, SVG `transition-[stroke] duration-300 ease-in-out group-hover:stroke-green-60` | Farbe plus 1px Verschiebung plus Strichfarbe, einheitlich 300ms |
| Zähler-Animation | `js_4571` (Number-Flow-Library): `opacityTiming:{duration:450,easing:"ease-out"}`, `transformTiming:{duration:900,easing:"linear(0,.005,.019,...)"}` mit `respectMotionPreference:!0` | Statistiken zählen von 0 hoch, Ziffern rollen in 900ms, Deckkraft in 450ms; respektiert Systemeinstellung |
| Scroll-Smooth | `<html class="scroll-smooth" lang="de">` | Ankerlinks scrollen weich |
| Video/Lightbox | `transition:opacity 0.5s ease,visibility 0.5s ease` (4x im inline-CSS), `transition:bottom 0.5s ease` | Lightbox und Bottom-Bar ein-/ausblenden in 500ms |

### Reduced Motion

`prefers-reduced-motion` kommt im gesamten ausgelieferten CSS **nicht** vor (0 Treffer in `app.css`, `page.css`, den Inline-Styles und auf allen 17 Seiten). Der einzige Treffer sitzt in der Number-Flow-Bibliothek: `o="u">typeof matchMedia?matchMedia("(prefers-reduced-motion: reduce)"):null` kombiniert mit `respectMotionPreference:!0`. Das heißt: die Zähler-Animation respektiert die Systemeinstellung, alle CSS-Transitions, Keyframes und Swiper-Autoplays nicht.

## Synthese

### 1. Seitentyp-Blueprints

**A. Startseite (`/`)**: 1. Nav mit Announcement-Rabattbar. 2. Full-bleed Hero-Slider mit 3 Produkt-Slides, Fade, 5s, Preis im Hero, 3 Faktenpunkte. 3. Testimonial-Slider (Marquee) mit Badge "+80.000 KundInnen". 4. Kompakte Kontaktleiste mit Foto und Button. 5. 3er-Kategoriekarten mit Foto-Hintergrund und Hover-Radius. 6. Bestseller-Reihe mit Preis, Streichpreis und Badge. 7. Tab-Sektion "Fünf unschlagbare Argumente" mit Rechenformel und Kleinschrift-Quelle. 8. Thumbnail-Kategorie-Slider "Dein Zuhause. Deine Energiewende." mit Preisankern. 9. Statistik-Zähler mit 3 Kennzahlen. 10. Ressourcenhub mit 4 Tabs (FAQ, Beratung, Videos, Kontakt), FAQ-Akkordeon plus Montageort-Kacheln. 11. Footer mit USP-Zeile und 6 Spalten.

**B. Leistungsseite PV/Wärmepumpe (`/solaranlagen/`, `/waermepumpen/`)**: 1. Nav. 2. 2-Spalten-Hero mit Eyebrow-Icon, H1-Nutzenversprechen, Subline, 5 Häkchen-Punkten und 1 CTA. 3. Presse-Logo-Marquee. 4. Kontaktleiste mit Telefon, WhatsApp, E-Mail und Öffnungszeiten. 5. Rechner/Funnel-Block mit Bild, 3 Versprechen und Typeform-Button. 6. 2x2-Benefits-Grid mit Zahlenbeweisen. 7. Marken-Logo-Block. 8. 2er-Karten "Dein Komplettset". 9. Zweite Kontaktleiste. 10. Bento-Grid mit Zähler, Garantie- und Service-Karten. 11. Video-Sektion mit Youtube-Thumbnail. 12. USP-Slider (6 Trust-Karten). 13. Zweiter Presse-Marquee. 14. Ressourcenhub mit 2 bis 4 Tabs und 6 bis 17 FAQ-Einträgen. 15. Footer.

**C. Produkt-/Kategorieseite Balkonkraftwerk (`/stecker-solaranlagen/`)**: 1. Nav. 2. 2-Spalten-Hero ohne Trust, 1 CTA. 3. Pricing-Reihe mit 3 Sets, Badges, Streichpreisen und Vorteilslisten. 4. USP-Zeile direkt nach dem Preis. 5. Montageort-Grid mit 5 Kacheln. 6. Community-Foto-Slider mit Nutzernamen. 7. Testimonial-Slider. 8. Ressourcenhub mit 8 FAQ-Blöcken. 9. E-Book-Lead-Magnet mit Formular und Marktzahl. 10. Sticky In-Page-Bar mit Sprunglinks und Konfigurator-Button. 11. Footer.

**D. Produkt-Detailseite (`/stecker-solaranlagen/.../<SKU>`)**: 1. Nav mit Warenkorb. 2. Produkt-Buy-Box mit Tab-Umschaltern, Spezifikationsliste, Datenblatt-Link, Preisangabe mit MwSt.-Hinweis und Button "In den Warenkorb", unmittelbar darunter 4 Trust-Kacheln (Rückgabe, Lieferzeit, Ratenzahlung, Garantie) plus Zahlungslogos. 3. Cross-Sell-Reihe "Kundlnnen kauften auch" mit 5 Karten. 4. Testimonial-Slider. 5. Ressourcenhub. 6. Footer.

**E. Produkt-Landingpage mit Beratung (10 kWp)**: 1. Nav. 2. Hero mit 1 Beratungs-CTA auf Typeform. 3. Kontaktleiste. 4. Varianten-Grid mit 4 Montagearten, je mit Badge "Montagetermin innerhalb 4 Wochen" und Specs. 5. Montageort-Karten. 6. Kontaktleiste. 7. Komponenten-Zigzag mit 4 Bauteilen. 8. Prozess-Block. 9. Ressourcenhub mit 17 FAQ-Einträgen in 3 Tabs. 10. Footer. Kein Preis, kein Warenkorb.

**F. Über uns (`/ueber-uns/`)**: 1. Nav. 2. Bild-Hero plus Bild-Slider. 3. Missionstext mit 3 Zähler-Karten. 4. Team-Grid mit 4 Porträts plus Recruiting-CTA. 5. Timeline "Unsere Geschichte" mit 4 Ereignissen und Zitatblock. 6. Presse-Karten. 7. Footer.

**G. Referenzen (`/erfahrungen/`)**: 1. Nav. 2. Bild-Hero. 3. Zähler (3 Kennzahlen). 4. Video. 5. Testimonial-Slider mit 10 Stimmen. 6. Presse-Marquee "Bekannt aus:". 7. Gründer-Zitat mit Porträt. 8. Community-Anlagen-Slider. 9. Pressestimmen-Karten. 10. Footer.

**H. Ratgeber-Übersicht (`/blog/`)**: 1. Nav. 2. Screenreader-H1. 3. Featured-Karte groß. 4. 9 Karten mit Datum, Tag, Lesezeit, Titel, Teaser, Autor. 5. Paginierung 36 Seiten. 6. Newsletter-Formular. 7. Footer.

**I. Ratgeber-Artikel (`/blog/<slug>/`)**: 1. Nav. 2. Zentrierter Artikel-Header mit Autor, Datum, Tag, Lesezeit. 3. Titelbild mit `fetchpriority="high"`. 4. Autorenbox mit Selbstvorstellung. 5. Sticky-Share-Leiste links ab 1440px. 6. Key-Takeaways-Box "Das Wichtigste in Kürze". 7. Fließtext mit 14 H2, eingebetteter Produktkarte, 13 internen Links, 2 Tabellen. 8. E-Book-Zwischen-CTA. 9. Fazit. 10. FAQ mit 6 Fragen. 11. Newsletter-Block. 12. Footer.

**J. Rechner/Funnel (`/service/ertragsrechner/`)**: 1. Nav. 2. Hero mit H1 doppelt (Desktop/Mobil) und Anker-CTA. 3. 3-Schritt-Wizard mit Fortschrittsleiste. 4. Beratungs-Block mit 4 Service-Karten und Termin-CTA. 5. E-Book-Formular. 6. Ratgeber-Textblöcke. 7. Footer.

**K. Kontakt und FAQ (`/kontakt/`, `/service/faq/`)**: 1. Nav. 2. Zentrierter Header mit Eyebrow, H1 "Hallo, wie können wir Dir helfen?" und Such-Hinweis. 3. OMQ-Widget (clientseitig). 4. Drei Karten auf Video, Blog, E-Mail. 5. Footer.

**L. Standorte (`/store-in-deiner-naehe/`)**: 1. Nav. 2. Hero in `bg-green-100` mit Anker-CTA. 3. Zähler. 4. Store-Liste mit Filter-Tabs, je mit Telefon und E-Mail. 5. Lösungs-Karten. 6. 4 Prozess-Steps. 7. FAQ-Tabs mit 11 Einträgen. 8. Footer.

**M. Multi-Step-Funnel (externes Typeform)**: 1. Einstiegsfrage zum Ziel (3 Optionen). 2. Haushaltsgröße (3 Optionen mit Bildern). 3. Dachform (3 Optionen). 4. Aktuelle Heizung (5 Optionen). 5. Förder-Statement. 6. Kontaktdaten (4 Pflichtfelder). 7. Straße und Hausnummer. 8. Stadt und PLZ. 9. Danke-Screen ohne Button.

### 2. Die 5 stärksten Muster

**Muster 1: Eine Akzentfarbe auf allen Primär-Buttons, und die Ecke als Hover-Signatur.**
Der Button ist ein einziges wiederverwendbares Bauteil `data-technical-name="pw-button"` mit drei Varianten. Hero-Variante (`home.html:308`): `class="not-text-editor relative inline-flex min-w-[8.75rem] items-center justify-center space-x-xs rounded-sm p-xl transition-[border-radius,background-color] bg-lime-100 text-forest-100 hover:rounded-tr-lg self-start"`. Dunkle Variante auf weißen Flächen: `"bg-forest-100 text-white-100 hover:rounded-tr-lg"`. Sekundär auf Bildern: `"bg-green-100 text-white-100 hover:rounded-tr-lg"`. Die einzige visuelle Bewegung im Hover ist die Ecke: `border-top-right-radius` von `.25rem` auf `1rem`, Dauer `.15s` mit `cubic-bezier(.4,0,.2,1)`. Dieser Radius-Sprung kehrt auf Karten als `hover:rounded-tr-2xl` (7rem) und `duration-200 ease-in-out` wieder. Das ist billig zu bauen, sofort wiedererkennbar und funktioniert auf jedem Button.

**Muster 2: Zahlen als Trust, nicht Sterne.**
priwatt zeigt auf keiner der 17 Seiten ein Bewertungswidget, kein `aggregateRating`, kein Google- oder Trustpilot-Siegel. Stattdessen drei harte Zahlen, aus `__NEXT_DATA__` der Startseite: `"cards":[{"number":{"value":130,"suffix":"Mio."},"description":"kWh aus erneuerbaren Energien gewonnen"},{"number":{"value":90000,"suffix":"t"},"description":"C0² eingespart (Stand: August 2025)"},{"number":{"value":640,"suffix":"Berichte"},"description":"der begeisterten Presse über priwatt"}]`. Dazu dieselbe Kundenzahl an fünf Stellen: "+80.000 KundInnen vertrauen uns" im Community-Badge, "80.000 zufriedene KundInnen" im USP-Slider, "Bereits über +80.000 zufriedene KundInnen" im Solaranlagen-Hero, "Über 80.000 Haushalte vertrauen uns" im FAQ-JSON-LD, "Wir sind bereits über 80.000 und täglich werden es mehr" im Community-Slider. Ein Zitat aus den Testimonials zeigt das Muster im Kleinen: "Seit das Kraftwerk montiert ist, haben wir annähernd 650 kWh produziert, was ca. 200 € entspricht." Kundenstimmen werden also immer mit einer Messgröße belegt.

**Muster 3: Jede Seite endet im selben Content-Hub mit Tabs statt Accordion-Stapel.**
Das Modul `id="ressourcenhub"` steht auf `/`, `/solaranlagen/`, `/stecker-solaranlagen/`, `/waermepumpen/`, `/solaranlagen/24-module-10-kwp/` und `/store-in-deiner-naehe/`. Aufbau (`solaranlagen.html`): links eine Spalte mit horizontal scrollenden Tab-Buttons (`min-w-[12.5rem] md:w-full`, aktiver Tab `bg-forest-100 text-white-100`, inaktiver Tab `text-forest-100 hover:border-forest-100`), rechts das Panel. Die Tab-Labels heißen je Seite "FAQs", "Beratung", "Videos", "Kontakt", auf der 10-kWp-Seite stattdessen "Häufige Fragen", "Blogartikel", "Videos". Der Inhalt sind immer echte H3-Fragen, die als SEO-Text auch unterhalb im DOM stehen, also doppelt indexierbar sind: `/solaranlagen/` hat 51 H3-Tags und 6 FAQ-Einträge, `/stecker-solaranlagen/` 8, `/waermepumpen/` 11, `/store-in-deiner-naehe/` 11, `/solaranlagen/24-module-10-kwp/` 17. Belegt im Schema: Die Seiten liefern `FAQPage` mit `Question` und `Answer` aus, auf `/` sogar mit den Blöcken "Über priwatt", "Unser Versprechen: Alles aus einer Hand" und "Was wir Dir für Deine Energiewende anbieten".

**Muster 4: Preis und Preisanker direkt sichtbar, Rabattcode in der Announcement-Bar.**
Die Announcement-Bar nutzt `bg-dust-60` (`rgb(227 220 178)`, das einzige Vorkommen dieser Farbe) und trägt: "Speicher deine Mittagssonne für den Feierabend, 100€ Rabatt mit Code TAGZUNACHT" plus Link "Angebot sichern!" auf `/balkonkraftwerk-speicher/goodwe/`. Produktkarten zeigen zwei Preise gleichzeitig, im DOM der Startseite als "ab 1.249 €" mit dem durchgestrichenen "1.419 €". Kategorie-Slider arbeiten mit Preisankern im Text: "Bis zu 2000 Wp Ab 189 €" und "Erhöhe Deinen Eigenverbrauch Ab 629 €". Der PDP-Preis trägt zusätzlich die Steuerinfo "(inkl. 0% MwSt. ( zzgl. Versandkosten ))". Der Haupt-Hero nennt den Preis sogar im H2: "Plug & Play, ab 999 €".

**Muster 5: Vertrauen steht unmittelbar neben dem Kaufentscheid, nicht am Seitenende.**
Auf der PDP sitzt die Trust-Zeile direkt unter dem Warenkorb-Button: "Rückgaberecht 30 Tage", "Lieferzeitraum 12-15 Werktage", "Ratenzahlung möglich", "30 Jahre Garantie", "Wir akzeptieren" plus Zahlungslogos, dazu Kleintext "(inkl. 0% MwSt. ( zzgl. Versandkosten ))". Auf der Kategorieseite `/stecker-solaranlagen/` steht der USP-Block (`id="floatingUsp"`) unmittelbar nach der Preisliste, mit 6 Karten: "Lebenslanger Support", "30 Jahre Garantie", "30 Tage Rückgaberecht", "80.000 zufriedene KundInnen", "90.000 Tonnen CO2 eingespart", "Komplett-Sets". Dieselben 6 Karten stehen auf `/solaranlagen/` mit dem Titel "So profitierst Du vom Kauf eines Balkonkraftwerks" zwischen Video und Presse-Marquee. Garantien werden außerdem konkret beziffert: "Neben der üblichen Herstellergarantie profitierst Du von 30 Jahren linearer Leistungsgarantie auf Deine Solarmodule."

### 3. Animation-Rezepte

**Rezept 1: Button-Hover als Radius-Sprung (exakte Werte belegbar).**
```css
/* Basis */
.pw-button {
  border-radius: .25rem;              /* rounded-sm */
  padding: 1.25rem;                   /* p-xl */
  background: #CAF476;                /* lime-100 */
  color: #132219;                     /* forest-100 */
  transition-property: border-radius, background-color;
  transition-duration: .15s;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
}
.pw-button:hover { border-top-right-radius: 1rem; }   /* hover:rounded-tr-lg */
```
Quelle: `home.html:308` plus `app.css` Utility `.transition-\[border-radius\2c background-color\]{...transition-duration:.15s}`.

**Rezept 2: Marquee als Swiper mit linearem Wrapper und festen Slide-Breiten.**
```css
.jivyXn .swiper-wrapper { transition-timing-function: linear !important; }
.jivyXn .swiper-slide   { width: 20.5rem !important; }
@media (min-width: 768px)  { .jivyXn .swiper-slide { width: 21.62rem !important; } }
@media (min-width: 1600px) { .jivyXn .swiper-slide { width: 21.89rem !important; } }
```
Dazu Swiper-JS: `freeMode:{enabled:true,sticky:false,momentum:false}`, `speed:0`, `loop:true`, Slides doppelt einhängen (`[...l, ...l]`). Quelle: `inline_styles.css:39` und `js_5178`.

**Rezept 3: Hero-Slider mit Idle-Autoplay und Fade.**
```js
new Swiper(el, {
  speed: 600,                          // slideTransitionSped 0.6 * 1000
  effect: "fade",
  pagination: { el, clickable: true },
  breakpoints: {
    0:    { allowTouchMove: true },
    1024: { autoplay: { delay: 5000, disableOnInteraction: false }, allowTouchMove: false }
  },
  keyboard: { enabled: true, onlyInViewport: false }
});
container.addEventListener("mousemove", idleReset);  // idleState 0.5s
container.addEventListener("keydown",  idleReset);
container.addEventListener("scroll",   idleReset);
container.addEventListener("mouseenter", () => swiper.autoplay.stop());
container.addEventListener("mouseleave", () => swiper.autoplay.start());
```
Alle Zahlen belegt: `timers:{"idleState":0.5,"slideTransitionSped":0.6,"slideChangeSpeed":5}` in `__NEXT_DATA__`, `speed:c` mit `sliderSpeed:1e3*p`, `autoplay:{delay:d,disableOnInteraction:!1}` mit `slideChangeDelay:1e3*u`. Bei `prefers-reduced-motion` greift hier nichts.

**Rezept 4: Karten-Hotspot mit Halo-Puls (Karten, nicht Listen).**
```css
@keyframes pulseDot {
  0%   { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
}
.hotspot-dot { animation: pulseDot 2.4s ease infinite; }

@keyframes pulse {
  50%  { opacity: .5; }
  100% { transform: scale(1.4185); opacity: 0; }
}
.hotspot-halo { animation: pulse 1.4s ease infinite; }
```
Quelle: `app.css` (`.animate-pulseDot{animation:pulseDot 2.4s ease infinite}`) und Inline-Style `.kcqVEV::before{...animation:iKBLzF 1.4s ease infinite}`. Der Halo hat zusätzlich `background-color:#caf476; opacity:0.3` und im Hover `background-color:#fff; box-shadow:0px -2px 20px 0px rgba(19,34,25,0.12)`.

**Rezept 5: Zähler-Animation mit Ziffern-Rollen.**
```js
// Number-Flow mit diesen Defaults
transformTiming: { duration: 900, easing: "linear(0,.005,.019,.039,...,1)" }
opacityTiming:   { duration: 450, easing: "ease-out" }
respectMotionPreference: true
```
Quelle: `js_4571-bbb8ec6202dabf18.js`, Auszug `k.defaultProps={transformTiming:{duration:900,easing:"linear(0,.005,.019,.039,...)"},...opacityTiming:{duration:450,easing:"ease-out"},animated:!0,...respectMotionPreference:!0}`. Die Ziffern werden über die CSS-Custom-Properties `--_number-flow-d-opacity`, `--_number-flow-d-width`, `--_number-flow-dx`, `--_number-flow-d` animiert, registriert per `CSS.registerProperty({name:h,syntax:"<number>",inherits:!1,initialValue:"0"})`.

**Rezept 6: SVG-Energiefluss (Strich zeichnet sich nach).**
```css
@keyframes runEnergieStrokes { 0% { stroke-dashoffset: 50; } 100% { stroke-dashoffset: -600; } }
/* Variante A, nur auf Elemente mit Klasse animStroke */
.wrapper .animStroke { animation: runEnergieStrokes 2.4s linear infinite; }
/* Variante B, rückwärts und langsamer */
.energie { animation: runEnergieStrokes 8s linear infinite reverse; }
```
Quelle: `app.css`, wörtlich `@keyframes runEnergieStrokes{0%{stroke-dashoffset:50}to{stroke-dashoffset:-600}}` und `.animate-runEnergieStrokesReverse{animation:runEnergieStrokes 8s linear infinite reverse}`. Nicht belegbar: welches SVG genau die Klasse `animStroke` trägt, das ist im ausgelieferten HTML der geprüften Seiten nicht auffindbar.

**Nicht belegbar:** Es gibt keine Scroll-Reveal-Klassen (`aos-init`, `fade-up`, `reveal` = 0 Treffer), keine Stagger-Muster, keine Parallax-Werte, keine Zähler-Trigger-Schwellen. Es gibt auch kein `prefers-reduced-motion` im CSS.

### 4. Anti-Patterns und Schwächen

1. **Kein `prefers-reduced-motion` im CSS.** 0 Treffer in `app.css`, `page.css` und allen Inline-Styles. Betroffen sind alle Endlos-Animationen: `animate-[fade_1s_ease_infinite]`, `animate-pulseDot 2.4s ease infinite`, `animate-runEnergieStrokesReverse 8s linear infinite reverse`, `group-hover:animate-bounceAngle 1s infinite`, der Logo-Marquee ohne Easing und der Hero-Fade alle 5s. Nur die Zähler-Library respektiert die Einstellung.
2. **`develop.priwatt.de` im Produktiv-HTML.** Auf `/ueber-uns/` verweisen Teambilder auf `https://develop.priwatt.de/wordpress/wp-content/uploads/2023/11/team-scaled.jpeg` und `office-scaled.jpeg`. Ein Staging-Host in Auslieferungsdaten ist ein Betriebsfehler.
3. **`localhost:18890` in Produktkarten eines Artikels.** Auf `/blog/balkonkraftwerk-mit-speicher-sinnvoll/` stehen 5 Bild-URLs mit `http://localhost:18890/media/...` und `http://localhost:18890/thumbnail/...`. Das sind kaputte Bilder für Endnutzer.
4. **Unaufgelöste URL-Platzhalter.** Auf der PDP (`SW11911.4`) lauten Cross-Sell-Links `href="/stecker-solaranlagen/[category]/zubehoer/kabel/solarkabel-mit-mc4-stecker-dc-verlaengerungskabel-6-mm2-set-laenge-waehlba..."`. Der Template-Platzhalter `[category]` ist nicht ersetzt.
5. **Leere Module werden mitgerendert.** Auf dem Artikel ist der Block "LeserInnen interessierte auch:" vorhanden, der Slider darin enthält nur Preloader-Divs (`sc-d375281f-3 hASOrl` plus zwei leere Kinder), keine Karten. Achtung: das ist ein Rendering-Rest am HTML-Ende, das echte Modul lädt clientseitig nach. Belegbar ist nur der leere Zustand im ausgelieferten HTML.
6. **"Auszeichnungen" im Title ohne Auszeichnungen auf der Seite.** `/erfahrungen/` heißt "Kundenerfahrungen & Auszeichnungen", die zugehörige Sektion hat aber `"brandSection":{"isVisible":false,...}` und wird nicht gerendert. Der Titel verspricht mehr, als die Seite hält.
7. **Doppelte Nummerierung der Statistik heißt "C0²" statt "CO₂".** In allen drei Zähler-Beschreibungen der Startseite steht `"C0² eingespart (Stand: August 2025)"`, also Ziffer Null statt Buchstabe O. Der Text stammt aus dem CMS und ist auf Startseite, `/erfahrungen/` und `/store-in-deiner-naehe/` identisch falsch.
8. **Telefon-Label und Telefon-Ziel weichen ab.** Auf `/solaranlagen/` zeigt der Link den Text `+49 151 420 510 42`, das `href` lautet aber `tel:+4934122179680`, also die Festnetz-Zentrale statt der angezeigten Mobilnummer. Auf `/store-in-deiner-naehe/` lauten Links zusätzlich `tel:Tel.: +49 177 7825 806` und `tel:Freiburg@priwatt.de`, ein E-Mail-Wert in einem `tel:`-Schema.
9. **Zwei H1 auf einer Seite.** Der Ertragsrechner liefert zwei `<h1>`-Elemente aus ("Jetzt Balkonkraftwerk Ersparnis berechnen!" und "Jetzt Ersparnis berechnen!"), offenbar Desktop- und Mobil-Variante ohne `sr-only`-Trennung.
10. **Ratgeber-Artikel ohne Inhaltsverzeichnis und ohne Heading-IDs.** 14 H2, 0 IDs, kein TOC. Bei rund 1.900 Wörtern ist das ein Navigationsverlust.
11. **Kundenstimmen ohne Quelle, ohne Bewertung.** Es gibt kein Datum, keine Verifikationsmarkierung, kein Sternerating und kein Schema-Attribut zu den 10 Testimonials. Für Google Reviews ist damit kein Rich Result möglich.
12. **Sitemap deckt den Blog kaum ab.** 318 Blog-URLs in `server-sitemap-blog.xml`, aber auf `/blog/` paginieren 36 Seiten, das entspricht rund 350 Artikeln. Die Zahlen passen zueinander, allerdings tragen alle Blog-URLs im Sitemap keinen `lastmod`-Wert, alle 48 URLs in `sitemap-0.xml` ebenfalls nicht.
13. **Kein `Product`-Schema auf der Produkt-Detailseite.** Die PDP liefert nur Organization, Person und WebSite. Preis, Verfügbarkeit und Bewertungen sind damit für Suchmaschinen nicht strukturiert.
14. **OMQ-FAQ nicht indexierbar.** `/service/faq/` und der FAQ-Teil auf `/kontakt/` bestehen aus einem clientseitig geladenen Widget. Im ausgelieferten HTML stehen 0 Fragen. Die Sitemap enthält die Seite, der Inhalt ist für Crawler ohne JS leer.

### 5. Conversion-Mechanik in 5 Sätzen

priwatt trennt zwei Strecken: alles, was ein Nutzer selbst montieren kann, läuft über Preis, Konfigurator und Warenkorb, alles mit Handwerker läuft über Beratungs-CTA und Typeform. Auf der Selbstmontage-Strecke erzeugt die Announcement-Bar mit Code TAGZUNACHT Dringlichkeit, direkt darunter nennen Preisliste und Bestseller konkrete Zahlen mit Streichpreis, und unmittelbar nach dem Preis steht die Trust-Zeile mit 30 Tagen Rückgabe, 12 bis 15 Werktagen Lieferzeit und 30 Jahren Garantie. Auf der Beratungsstrecke ersetzt der Funnel die Preisliste: Der Hero verspricht "Jetzt kostenlose Beratung sichern", die Kontaktleiste bietet zusätzlich WhatsApp und Telefon mit Öffnungszeiten, und der Typeform stellt vier Qualifizierungsfragen vor die erste Datenabfrage, sodass Kontaktdaten erst nach investierter Zeit kommen. Der Abschluss jeder Seite ist derselbe Ressourcenhub aus FAQ, Beratung, Videos und Kontakt, der offene Fragen abfängt und den Nutzer mit vier bis dreizehn echten Fragen auf der Seite hält. Getragen wird das Ganze von einer einzigen wiederkehrenden Zahl: über 80.000 Haushalte, die an fünf Stellen der Startseite und in jedem Schema-Block auftaucht.

## Abrufprotokoll

| # | URL | HTTP | Bytes |
|---|---|---|---|
| 1 | https://priwatt.de/solaranlagen/ | 200 | 394874 |
| 2 | https://priwatt.de/ | 200 | 386110 |
| 3 | https://priwatt.de/stecker-solaranlagen/ | 200 | 339945 |
| 4 | https://priwatt.de/waermepumpen/ | 200 | 381513 |
| 5 | https://priwatt.de/solaranlagen/24-module-10-kwp/ | 200 | 444462 |
| 6 | https://priwatt.de/balkonkraftwerk-speicher/goodwe/ | 200 | 219002 |
| 7 | https://priwatt.de/stecker-solaranlagen/ohne-halterung/pribasic-duo/SW11911.4 | 200 | 364941 |
| 8 | https://priwatt.de/ueber-uns/ | 200 | 171698 |
| 9 | https://priwatt.de/erfahrungen/ | 200 | 220014 |
| 10 | https://priwatt.de/blog/ | 200 | 191015 |
| 11 | https://priwatt.de/blog/balkonkraftwerk-mit-speicher-sinnvoll/ | 200 | 215790 |
| 12 | https://priwatt.de/service/ertragsrechner/ | 200 | 198230 |
| 13 | https://priwatt.de/kontakt/ | 200 | 128194 |
| 14 | https://priwatt.de/service/faq/ | 200 | 126844 |
| 15 | https://priwatt.de/store-in-deiner-naehe/ | 200 | 203256 |
| 16 | https://priwatt.de/career/ | 200 | 130377 |
| 17 | https://priwatt.de/presseraum/ | 200 | 163135 |
| 18 | https://form.typeform.com/to/vzr20lvC | 200 | 201124 |
| 19 | https://priwatt.de/robots.txt | 200 | 540 |
| 20 | https://priwatt.de/sitemap.xml | 200 | 184 |
| 21 | https://priwatt.de/sitemap-0.xml | 200 | 8187 |
| 22 | https://priwatt.de/server-sitemap.xml | 200 | 271 |
| 23 | https://priwatt.de/server-sitemap-blog.xml | 200 | 55591 |
| 24 | https://priwatt.de/server-sitemap-products.xml | 200 | 29688 |
| 25 | https://priwatt.de/_next/static/css/0346111fcfb2ffc9.css | 200 | 186480 |
| 26 | https://priwatt.de/_next/static/css/890258743c10881d.css | 200 | 13752 |
| 27 | https://priwatt.de/_next/static/chunks/pages/index-caef4b77843903f0.js | 200 | 44319 |
| 28 | https://priwatt.de/_next/static/chunks/5178-ffa9f9fa244832ba.js | 200 | 11160 |
| 29 | https://priwatt.de/_next/static/chunks/4571-bbb8ec6202dabf18.js | 200 | 17416 |
| 30 | https://priwatt.de/_next/static/chunks/2532-b785cd6f43d7bd4e.js | 200 | 10417 |
| 31 | https://priwatt.de/_next/static/chunks/main-387bad9d6ed7f8b1.js | 200 | 116703 |
| 32 | https://priwatt.de/_next/static/chunks/pages/_app-ceb293ca63d7613f.js | 200 | 132899 |
| 33 | https://priwatt.de/_next/static/chunks/framework-945b357d4a851f4b.js | 200 | 140001 |
| 34 | https://priwatt.de/_next/static/e9k7nzAblk4H4-BH9C-h3/_buildManifest.js | 200 | 13892 |

Antwort-Header der Startseite: `server: nginx/1.24.0 (Ubuntu)`, `x-powered-by: Next.js`, `x-nextjs-cache: HIT`, `cache-control: s-maxage=60, stale-while-revalidate`, `strict-transport-security: max-age=31536000; includeSubDomains; preload`.

Nicht abrufbar oder nicht auswertbar:

- Das FAQ-Widget (OMQ) und die Navigation-Dropdown-Panels werden clientseitig gerendert. Im HTML stehen nur leere Container (`omq-help-account`, `omq-help-api-key` sind leere Attribute, das Dropdown-Panel `role="menu" id=":R1hnm:"` enthält keine Links). Die Ziel-URLs der Dropdowns unter "Solaranlagen", "Wärmepumpen", "Balkonkraftwerke", "Speicher", "Zubehör" und "Service" sind damit nicht belegbar.
- Der Typeform ist nur als eingebettetes Formular-JSON auswertbar, nicht als durchlaufener Funnel. Schritt-Reihenfolge und Optionen stammen aus dem JSON, nicht aus einem Test-Durchlauf.
- Die Zahl der Blog-Artikel ließ sich nicht exakt bestimmen: 318 URLs in der Blog-Sitemap gegen 36 Paginierungsseiten mit 10 Karten, also rund 350 Einträge. Die Differenz ist nicht auflösbar ohne die Paginierung durchzublättern.
- Bild- und Videoinhalte wurden nicht visuell geprüft, nur ihre Referenzen im HTML.
