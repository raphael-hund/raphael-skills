# miles-mobility.com

## Steckbrief

| Feld | Wert |
|---|---|
| Branche | Stationsloses Carsharing, Autovermietung, Auto-Abo, Transporter-Sharing (Mobilität / Mobility-as-a-Service) |
| Anbieter | MILES Mobility GmbH, Leibnizstraße 49, 10629 Berlin, Tel. +49-30-83799699, hello@miles-mobility.com |
| Seitentyp | Konzern-Marketing-Website mit Produkt-, Preis-, Standort-, Hilfe- und Corporate-Seiten |
| Stack | Next.js (App Router, Turbopack, RSC, `data-dpl-id` = Vercel-Deployment) + React + Tailwind CSS v4 + Sanity.io Headless-CMS (`cdn.sanity.io`, Projekt-ID `9r1078q8`, Studio `studio.miles-mobility.com`) |
| Sprache | Deutsch (Primär, `lang="de"`), Zweitsprache Englisch (`/en-de`); `hreflang` de + en-de |
| Anrede | Du-Form durchgehend ("Wähle dein Fahrerlebnis", "Buche ein Auto", "Brauchst du Hilfe?"); wenige Ausnahmen in juristischen Texten ("Die vollständige Studie finden Sie hier") |
| Seiten in Sitemap | 169 URLs gesamt; 89 deutschsprachig (`/de/...`), 80 englisch (`/en-de/...`) |
| Analysierte Seiten | 17 (davon 16 per curl vollständig abrufbar, 1 Weiterleitung identisch) |
| Consent | Usercentrics CMP (`app.usercentrics.eu/browser-ui/latest/loader.js`, Settings-ID vorhanden) |
| Analytics | Google Tag Manager `GTM-WV6M6MW`, Adjust Deep-Links (`app.adjust.com`) |
| Fonts | GT America (eigenhostet, 4 Schnitte), kein Google Fonts |

## Sitemap

Aus `https://www.miles-mobility.com/sitemap.xml` (Status 200, 30525 Bytes, 169 `<loc>`-Einträge,
`lastmod` zwischen 2025-10-07 und 2026-09-16). Struktur der DE-Seiten:

### Hauptnavigation (aus `<nav>` der Startseite, wörtlich)

| Ebene 1 | Dropdown-Einträge | href |
|---|---|---|
| Mieten | Carsharing | `/de/car-sharing` |
| | Autovermietung | `/de/car-rental` |
| | App | `/de/car-sharing/how-it-works` |
| | Preise | `/de/pricing` |
| | MILES Pass | `/de/pass` |
| Abonnieren | Auto Abo | externe Subdomain `abo.miles-mobility.com` |
| | So funktioniert's | `/de/car-sharing/how-it-works` |
| | FAQ | `support.miles-mobility.com` |
| Flotte | Carsharing | `/de/car-sharing/fleet` |
| | Auto Abo | extern |
| | Für Unternehmen | `/de/business/car-sharing` |
| Brauchst du Hilfe? | Hilfe & Kontakt | `/de/help` |
| | FAQ | extern (Zendesk) |
| (kein Dropdown) | Für Unternehmen | `/de/business/car-sharing` |
| Button rechts | Download the app | `app.adjust.com` |

### Footer (5 Spalten + Hilfe-Block)

| Gruppe | Links (wörtlich) |
|---|---|
| Unternehmen | Über uns, Flotte, Jobs, Presse |
| Unser Angebot | So funktioniert's, Carsharing, Autovermietung, Auto Abo, Für Unternehmen, Parken, Standorte |
| Tarife & Sparen | Preise, MILES Pass, Guthaben & Deals, Preis- & Kostenordnung |
| Städte & Partnerschaften | Partnerschaften, PAYBACK, Charity, Nachhaltigkeit, Für Städte, Affiliate-Programm |
| Brauchst du Hilfe? | Hilfe & Kontakt, FAQ |
| Rechtliches (Leiste unten) | Geschäftsbedingungen, Datenschutz, Impressum, MILES for Business Allgemeine Geschäftsbedingungen, MILES for Business Allgemeine Mietbedingungen, Erklärung zur digitalen Barrierefreiheit, Cookies declaration, Datenschutzeinstellungen |

### Seitentypen aus der Sitemap

- Startseite: `/de`
- Produkt-/Angebotsseiten (5): `/de/car-sharing`, `/de/car-rental`, `/de/car-sharing/fleet`, `/de/van-sharing`, `/de/business/car-sharing`
- Preis-/Tarifseiten (4): `/de/pricing`, `/de/pricing/fees`, `/de/pass`, `/de/pass/purchase-{silver,gold,platinum,black}`
- Städteseiten (13 Carsharing + 13 Mietwagen): `/de/car-sharing/{berlin,potsdam,hamburg,munich,cologne,duesseldorf,duisburg,wuppertal,solingen,moenchengladbach,neuss,augsburg,stuttgart,frankfurt-am-main}` und `/de/car-rental/...`
- Städte-Übersichten (3): `/de/cities`, `/de/cities-and-regulations`, `/de/parking-guide`
- Ratgeber/Content: `/de/car-sharing/how-it-works`, `/de/sustainability`, `/de/mobility-data`, `/de/mobility-data-act`, `/de/for-cities`, `/de/innovation-lab`
- Newsroom: `/de/press` + 9 Einzelmeldungen (`/de/press/{carsharing-studie,europcar,bolt,toyota-yaris,payback,neuss,moenchengladbach,miles-mobility-auf-expansionskurs}`)
- Corporate: `/de/about-us`, `/de/jobs`, `/de/partners`, `/de/charity`, `/de/affiliate`, `/de/payback`, `/de/herthabsc`, `/de/credits`
- Hilfe: `/de/help` (Funnel zu Zendesk `support.miles-mobility.com`)
- Funnel-Einstiege: `/de/bizdev-form`, `/de/form-charity`, `/de/affiliate/form`, `/de/app-redirect`, `/de/rookie-deal`, `/de/pass/purchase-*`
- Recht (16): `/de/{impressum,privacy-policy,terms-and-conditions/overview,cookies-declaration,accessibility-statement,general-terms-and-conditions/new,general-terms-and-conditions/old,rental-terms-and-conditions/new,rental-terms-and-conditions/old,business-general-terms-and-conditions,business-rental-terms-and-condition,pass-t-and-c,astronaut/giveaway/terms,miles-for-business/blackdeal2025/terms,collections/privacy-policies}`
- Saison-/Aktionsseiten: `/de/car-rental/easter2026`, `/de/rookie-deal`

`robots.txt` (251 Bytes): `User-Agent: *`, `Allow: /`; Disallow für `/api/`, `/admin/`, `/studio/`,
`/_next/`, `/draft-mode/`, `*?*preview*`, `*?*draft*`. Sitemap-Verweis vorhanden.

## Seiten

### 1. Startseite, `/de`

| Feld | Wert |
|---|---|
| `<title>` | Home – Carsharing, Mietwagen &amp; Transporter \| MILES Mobility |
| Meta-Description | Jetzt ein Auto? Easy! Carsharing nach Kilometern &amp; flexible Mietwagen – einfach per App buchen. |
| H1 (wörtlich) | EINFACHE MOBILITÄT FÜR ALLE |
| H2 / H3 / H4 | 4 / 16 / 0 |
| Schema.org | Organization, PostalAddress, ContactPoint, WebPage (2x Organization, 6 `ld+json`-Blöcke, davon 2 identisch dupliziert) |
| canonical | `https://www.miles-mobility.com/de` |
| hreflang | de → `/de`, en-de → `/en-de` |
| Wörter im `<main>` | 330 |
| Sanity-Sektionen gerendert | 8 `data-sanity`-Blöcke, 7 `pageBuilder`-Sektionen |

#### Sektionsliste in DOM-Reihenfolge

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 0 | Nav (fixed) | (Logo) | n. v. | Sticky-Leiste, 5 Dropdowns | Logo SVG | "Download the app", "Mieten/Abonnieren/Flotte/Brauchst du Hilfe?", "Für Unternehmen" | n. v. | `fixed top-0 z-50 bg-black`, ab 71.5625rem schwebend mit `nav:top-8 nav:left-9 nav:right-9 nav:rounded-2xl`; versteckt sich beim Scrollen nach unten (`-translate-y-full opacity-0`) |
| 1 | Hero | EINFACHE MOBILITÄT FÜR ALLE | Carsharing, Autovermietung und Abo – alles mit nur wenigen Klicks. (11 Wörter) | Zentriert, 12-Spalten-Grid, Text in `grid-column: 3/span 8`, darunter Full-Bleed-Bild | 1 Bild (2640x1502 PNG, `object-fit: cover`) | "Gratis registrieren" (adjust-Link) | n. v. | Kein Sternesiegel, keine Kunden­zahl im Hero; `margin-top: 15.06rem`; Bild in `border-radius: 1rem` |
| 2 | Teaser-Kacheln 4er (Sektion 1) | Wähle dein Fahrerlebnis | n. v. | 4er-Grid (2x2 mobil) | 4 Kachelbilder | ganze Kachel klickbar | n. v. | Kacheln: Carsharing "Übernimm das Steuer ab 0,79€/km.", Mietwagen "App öffnen, mieten, losfahren. Von 3 Stunden bis zu 30 Tagen.", Auto Abo, Für Unternehmen |
| 3 | Final-CTA / App-Download | Starte jetzt, registriere dich kostenlos | Jetzt App runterladen (Vortitel) | 2-Spalten 40/60 im Container, Hintergrund `--color-primary-900` | 1 Bild (1450x1120 PNG) | ganzer Block verlinkt auf `app.adjust.com/1br6crta` | QR-Code-Sektion mit `id="AppdownloadQR"` | `pt-[80%] lg:pt-[70%]` Aspect-Trick |
| 4 | Teaser-Kacheln 60/40 | Über 18.000 Fahrzeuge zur Auswahl | n. v. | 2 Kacheln ungleicher Größe | 2 Bilder | n. v. | Zahl "18.000" in der Headline | Kacheln "Unsere Flotte", "Unsere Transporter" |
| 5 | Zigzag Feature-Karten (3) | Die neue Art zu fahren | n. v. | 3 gestapelte Karten im Sticky-Stack | 3 Bilder | n. v. | n. v. | Texte: "Höchste Stufe der Flexibilität", "Unvergleichliche Flotte" (Europas größte Flotte), "Einfluss auf Nachhaltigkeit" ("ersetzen bis zu 15 Autos") |
| 6 | Teaser-Kacheln klein (3) | (kein H2) | n. v. | 3er-Grid | 3 Bilder | n. v. | n. v. | "Wo kann ich MILES mieten? 14 Städte", "Wie funktioniert MILES?", "Wie viel kostet MILES?" |
| 7 | Teaser-Kacheln klein (3) | Entdecke mehr über uns | n. v. | 3er-Grid | 3 Bilder | n. v. | n. v. | Charity, About, "Für die städtische Entwicklung" |
| 8 | Footer | n. v. | n. v. | 5 Spalten + Hilfe-Block + Rechtliches | PAYBACK-Icon, Flaggen-Icon | "Melde dich kostenlos an", "App runterladen", "Deutsch" | © 2026 MILES Mobility GmbH | `bg-black pt-12 pb-32 text-white`, max-width 1800px |

#### Hero-Formel

- Nutzenversprechen: "EINFACHE MOBILITÄT FÜR ALLE" (4 Wörter, uppercase, `text-transform: uppercase`)
- Subline-Länge: 11 Wörter, als `<strong class="font-medium">` gesetzt
- Anzahl CTAs im Hero: 1
- CTA-Label: "Gratis registrieren" (führt auf `app.adjust.com/1e3cbrpj?campaign=generic_home`)
- Trust-Signal im Hero: keines (keine Sterne, kein Siegel, keine Zahl)
- Medientyp: Foto (aufwendige 3D-Render-Illustration mit Marken-Autos, PNG 2640x1502)
- Hero-Höhe: kein `min-h-screen`; Höhe über `margin-top: 15.06rem` (mobil `calc(var(--spacing) * 28)` = 7rem) und Aspect-Ratio des Bildes bestimmt

#### CTA-Strategie

| CTA-Label | Häufigkeit | Ziel |
|---|---|---|
| Carsharing | 36 | `/de/car-sharing` (Nav + Footer) |
| Auto Abo | 36 | `abo.miles-mobility.com` |
| FAQ | 36 | Zendesk |
| Mieten / Autovermietung / App / Preise / MILES Pass | je 18 | interne Seiten |
| Download the app / App runterladen | 18 | adjust-Deeplink |
| Gratis registrieren | 1 (Hero) | `app.adjust.com/1e3cbrpj` |

- Sticky-Header-CTA: nein. Die Nav enthält rechts "Download the app", aber keinen primären Registrierungs-Button.
- Telefonnummer im Header: nein. Telefonnummer nur im Organization-Schema (+49-30-83799699).
- Zusätzlich ausgeliefert: Sticky-Bottom-Banner (`fixed bottom-0 z-50`, `lg:left-14 lg:right-14 lg:bottom-7`)
  mit Aktionsangebot "Wir feiern 10 Jahre. Feier mit!" (endDate 2026-09-17), dismissbar per X-Button,
  Dismiss-State in `localStorage` unter `promotionBanner-<id>-dismissed`.

#### Trust-Staffelung

| Position | Trust-Element |
|---|---|
| Hero | keines |
| Sektion 4 | Zahl "18.000" Fahrzeuge in der Headline |
| Sektion 5 | "Europas größte Flotte", "ersetzen bis zu 15 Autos", "CO2-Einsparungen" |
| Sektion 6 | "14 Städte – in ganz Deutschland" |
| Footer | © 2026 MILES Mobility GmbH, PAYBACK-Partnerschaft |
| Ganzseitig fehlend | Google-Sterne, TÜV-Siegel, Presse-Logos, Kundenzahl, Garantien |

#### Footer

- Spaltenanzahl: 5 Link-Spalten (`grid-cols-2 md:grid-cols-4 lg:grid-cols-4 col-span-2 lg:col-span-8`)
- Gruppen-Überschriften: Unternehmen, Unser Angebot, Tarife & Sparen, Städte & Partnerschaften, Brauchst du Hilfe?
- Ortslisten: keine Ortsliste im Footer, nur ein Link "Standorte" auf `/de/cities`
- Siegel: PAYBACK-Logo als Inline-SVG (24x24)
- Social: 4 Links (Facebook, Instagram, LinkedIn, YouTube) mit `aria-label` ("Folgen Sie uns auf Instagram")
- Rechtliches: 7 Links + "Datenschutzeinstellungen"-Button (Usercentrics-Nachtrigger)
- Sprachumschalter: Deutsch mit Deutschland-Flagge (18x13 SVG)

### 2. `/de/car-sharing` (Produktseite Carsharing)

| Feld | Wert |
|---|---|
| `<title>` | Home – Carsharing, Mietwagen &amp; Transporter \| MILES Mobility (identisch zur Startseite) |
| Meta-Description | Jetzt ein Auto? Easy! Carsharing nach Kilometern &amp; flexible Mietwagen – einfach per App buchen. (identisch zur Startseite) |
| H1 | BUCHE EIN AUTO MIT NUR EINEM KLICK |
| H2 / H3 | 2 / 23 |
| Schema.org | WebPage, BreadcrumbList, ListItem(2), Service, Country, OfferCatalog, Offer(13), UnitPriceSpecification(13) |
| canonical | `https://www.miles-mobility.com/de/car-sharing` |
| Wörter | 897 |
| Sanity-Sektionen | 9 |

Sektionsreihenfolge (aus Sanity `pageBuilder` + DOM):

| Nr | Sektionstyp | Headline wörtlich | Layout-Familie | CTA-Labels | Trust |
|---|---|---|---|---|---|
| 1 | Hero (`heroBasic`) | BUCHE EIN AUTO MIT NUR EINEM KLICK | Zentriert, Grid 3/span 8 + Full-Bleed-Bild | "Jetzt losfahren" | n. v. |
| 2 | Benefits-Karten (3) | (ohne H2) | `contentTileTextImage`, Text-Bild-Kacheln | n. v. | n. v. |
| 3 | Fahrzeug-Karussell | Finde das beste Fahrzeug für dich | `fleetCarousel`, Slider | "Zu allen Fahrzeugen" | 13 Fahrzeugmodelle mit Preisen |
| 4 | Zigzag-Blöcke (6) | (ohne H2) | `imageTextBlockLarge` mit 6 `imageTextBlock` | n. v. | n. v. |
| 5 | Tarif-Karten (2) | (ohne H2) | `contentTileTextIcon`, 2er-Grid | n. v. | "Standard-km-Tarif ab 0,79€/km + 1€ Unlock Fee", "Stundentarife" |
| 6 | Pass-Teaser | Bereit, mit jeder Fahrt zu sparen? | `contentTile`, 1 Kachel | "Finde deinen Pass" | n. v. |
| 7 | Trust-Karten (3) | n. v. | `contentTileTextImage` 3er-Grid | n. v. | "1 Mio. Nutzer:innen", "Top bewertete App" (Bild "MILES Symbol, darunter 4,5 ausgefüllte Sterne"), "Umfangreiche Flotte" (18.000 Fahrzeuge) |
| 8 | B2B-Banner | Teste MILES for Business | `imageTextBlockLarge` | n. v. | n. v. |
| 9 | FAQ-Akkordeon | Fragen? | `accordion`, eine Spalte `lg:col-span-8 lg:col-start-3` | "Alle FAQ-Artikel" | 6 Fragen |

FAQ-Fragen wörtlich: "Wie funktioniert die Abrechnung bei MILES?", "Wie funktioniert Carsharing?",
"Wo darf ich parken?", "Wie melde ich mich bei eurer Carsharing-Plattform an?",
"Gibt es Voraussetzungen für die Registrierung oder Gebühren?",
"Was passiert, wenn mein Mietwagen während der Mietzeit eine Panne hat?"

### 3. `/de/car-rental` (Produktseite Mietwagen)

| Feld | Wert |
|---|---|
| `<title>` | Mietwagen – Miete ein Auto oder einen Transporter \| MILES Mobility |
| Meta-Description | Miete ein Auto oder einen Transporter bei MILES, inkl. Kraftstoff/Versicherung. Günstig, schnell, einfach. |
| H1 | Automiete in EASY |
| H2 / H3 | 3 / 19 |
| Schema.org | WebPage, BreadcrumbList, ListItem(2), Service, Country, OfferCatalog, Offer(4), UnitPriceSpecification(4), FAQPage, Question(6), Answer(6) |
| canonical | `https://www.miles-mobility.com/de/car-rental` |
| Wörter | 759 |
| Sanity-Sektionen | 8 |

Sektionsreihenfolge: Hero → Benefits-Karten (3) → Fahrzeug-Karussell "Das richtige Auto für dich"
→ Benefit-Karten auf dunklem Grund (3: "Tanken & Laden", "Versicherung", "Parken & Unlock Fee")
→ 3 Zigzag-Blöcke → Kachel "Deine 24 Stunden Flexibilität" → Teaser 2er ("Abonniere ein Auto",
"Für Unternehmen") → FAQ-Akkordeon "Alles, was du wissen musst" (6 Fragen).
Diese Seite trägt den **Preisrechner** als clientseitiges Widget (`0s93rz4dntojv.js`): Felder
"Choose your vehicle", "Choose duration", "By distance"/"By address", "Distance in km",
"Different drop-off location", Ergebnisblock "Your trip" mit "Total", "Unlock fee", "Extra km",
"Parking (per min)", "Airport fee", "Costs include", Disclaimer
"Prices are estimates. Your final price is calculated in the MILES app." Der Rechner ist im
Server-HTML nicht ausgerendert, sondern nur im Client-Bundle vorhanden.

### 4. `/de/pricing` (Preisseite)

| Feld | Wert |
|---|---|
| `<title>` | Preise – Carsharing pro km &amp; Langzeitmieten \| MILES Mobility |
| Meta-Description | Entdecke flexibles Carsharing mit MILES. Preiswert pro km &amp; ideale Angebote für Langzeitmieten. |
| H1 | Entdecke unsere Tarife |
| H2 / H3 | 5 / 36 |
| Schema.org | Organization, PostalAddress, ContactPoint, WebSite, WebPage, BreadcrumbList, ListItem(2), Service, Country, OfferCatalog(5), Offer(21), UnitPriceSpecification(3), FAQPage, Question(7), Answer(7) |
| canonical | `https://www.miles-mobility.com/de/pricing` |
| Wörter | 781 |
| Sanity-Sektionen | 13 (die längste Seite) |

Alle 13 Sektionen mit Hintergrundfarbe (aus `id="section-*" style="background-color:..."`):

| Nr | Sektionstyp | Headline | Hintergrund |
|---|---|---|---|
| 1 | Benefit-Karten (3) | Gemacht für alle deine Pläne | white |
| 2 | Tarif-Karten (3) | Zahle für die Kilometer, die du fährst | white |
| 3 | Einzel-Kachel | (leer), "Kurze Trips, große Flexibilität" | white |
| 4 | Tarif-Karten (2) | (leer), 3h/6h | white |
| 5 | Einzel-Kachel | (leer), "S/M & Premium" | white |
| 6 | Tarif-Karten (4) | (leer), 1 Tag | white |
| 7 | Tarif-Karten (4) | (leer), 2/3 Tage | white |
| 8 | Tarif-Karten (4) | (leer), 4/5/7/9 Tage | white |
| 9 | Einzel-Kachel | (leer), "L & XL" | white |
| 10 | Tarif-Karten (4) | (leer), Transporter-Tage | white |
| 11 | Textblock | "... und viele mehr!" | white |
| 12 | 60/40-Kacheln | Du willst noch mehr sparen? | `var(--color-primary-900)` |
| 13 | FAQ-Akkordeon | Noch Fragen? | white |

Preisbeispiele wörtlich: "S-/M-Autos ab 0,79€/km + 1€ Unlock Fee + 0,35€/min für Parken",
"Premium-Autos ab 1,09€/km + 2€ Unlock Fee", "L-/XL-Transporter ab 1,29€/km + 2€ Unlock Fee",
"3 Stunden & bis zu 40 km ab 39,99€", "1 Tag nur 24,99€", "9 Tage & 450 km ab 370,99€".

### 5. `/de/pass` (Abo-Produktseite mit Vergleichstabelle)

| Feld | Wert |
|---|---|
| `<title>` | MILES Pass – Spare bei jeder Fahrt \| MILES Mobility |
| Meta-Description | Spare mit dem MILES Pass auf alle Fahrten & erhalte extra Vorteile. Jederzeit kündbar. |
| H1 | SMARTER REISEN MIT DEM MILES PASS |
| H2 / H3 | 5 / 20 |
| Schema.org | WebPage, BreadcrumbList, ListItem(2), Service, Country, OfferCatalog, Offer(4), UnitPriceSpecification(8), FAQPage, Question(10), Answer(10) |
| canonical | `https://www.miles-mobility.com/de/pass` |
| Wörter | 538 |
| Sanity-Sektionen | 9 |

Sektionsreihenfolge: Hero → Benefit-Karten (3) → Pass-Karten (2) "Sichere dir noch heute deinen
MILES Pass" → Pass-Karten (2) → 2 Marketing-Banner → **Vergleichstabelle** "Sieh dir alle
MILES Pass-Optionen an" → 2 Textblöcke ("Hast du Fragen? Unser CEO hat Antworten!") →
FAQ-Akkordeon "Wichtige Details" (11 Einträge).

Vergleichstabelle im Detail: `role="table"` mit `aria-label="Check out all MILES Pass options"`,
`grid-template-columns: 1fr 1fr 1fr 1fr 1fr; min-width: 1200px`, in `overflow-x-auto -mx-4 px-4`
gewrappt. 5 Spalten (Vorteil, Silver Pass, Gold Pass, Platin Pass, Black Pass), 5 `role="row"`,
25 `role="cell"`. Zeilen: "Monatlich geschenktes Guthaben" (+10€/+50€/+50€/+250€),
"Standard-km-Tarif" (-10%/-15%/-15%/-15%), "Stunden-, Tagestarife & extra km" (-5%/-10%/-10%/-15%).
Preise: Silber 9,99€/Monat oder 99,99€/Jahr, Gold 49,99€/Monat oder 549,99€/Jahr,
Platin 59,99€/Monat oder 659,99€/Jahr, Black 250€/Monat oder 2.749,99€/Jahr.
Trennlinien als separate Grid-Elemente `col-span-full border-t my-4` mit
`border-color: var(--color-primary-300)` bzw. `primary-400`, `aria-hidden="true"`.

### 6. `/de/car-sharing/fleet` (Flottenseite mit Filter)

| Feld | Wert |
|---|---|
| `<title>` | Flotte – Pkws &amp; Transporter, in einer App \| MILES Mobility |
| Meta-Description | Kleinwagen, Kompaktwagen oder Transporter jederzeit buchen, 24/7 verfügbar, ohne Abholstation. |
| H1 | Entdecke unsere Flotte |
| H2 / H3 | 1 / 10 |
| Schema.org | WebPage, BreadcrumbList, ListItem(3), Service, Country, OfferCatalog, Offer(14), Car(14), UnitPriceSpecification(28), FAQPage, Question(4), Answer(4) |
| canonical | `https://www.miles-mobility.com/de/car-sharing/fleet` |
| Wörter | 453 |
| Sanity-Sektionen | 5 |

**Filter-Mechanik** (aus Sanity `filterData`): 6 Kategorien-Chips
"Alle", "Kleinwagen (S)", "Kombis & SUVs (M)", "Premium (⭐️)", "Kastenwagen (L)", "Transporter (XL)".
Filterdimensionen: `categories` (smallCars, compactAndSuvCars, premiumCars, largeVans, xlVans),
`fuelType` (petrol, electric, diesel), `numberOfSeats` (3 oder 5), `transmission`
(automatic, manual, automatic+manual). Chips sind `role="radiogroup"`-artig als Buttons mit
`aria-pressed` und `aria-label="<Kategorie> category"`, Layout `flex gap-2` mobil horizontal
scrollend (`snap-start flex-shrink-0 w-32 md:w-40 lg:flex-1 lg:w-auto`), Bild je Chip
`aspect-[4/3]`, `object-contain`, `sizes="(max-width: 768px) 128px, (max-width: 1200px) 160px, 192px"`.

14 Fahrzeugmodelle: Volkswagen Polo, Opel Corsa, Volkswagen ID.3, Cupra Born, Audi A4, Audi Q2,
Volkswagen Taigo, Opel Astra, Tesla Model 3, Tesla Model Y, Opel Vivaro, Volkswagen T6,
Mercedes-Benz Sprinter, Volkswagen Crafter.

Sektionsreihenfolge: Hero → Fahrzeugliste mit Filter → Benefit-Karten (3:
"All-inclusive Tarife", "Individuelle Flexibilität", "Immer budget-freundlich") →
FAQ-Akkordeon (4) → 70/30-Kacheln auf `primary-900` ("Unsere Transporter", "Für Unternehmen")
→ Teaser "Auto Abo".

### 7. `/de/business/car-sharing` (B2B-Landingpage mit Lead-Formular)

| Feld | Wert |
|---|---|
| `<title>` | Carsharing für Unternehmen – Firmenflotten \| MILES Mobility |
| Meta-Description | Optimiere deine Geschäftsreisen mit dem Carsharing von MILES. Flexible Pläne, kostengünstige Lösungen. |
| H1 | MILES CARSHARING FÜRUNTERNEHMEN (mit ` ` Zeilenumbruchzeichen) |
| H2 / H3 | 6 / 34 |
| Schema.org | WebPage, BreadcrumbList, ListItem(2), Service, Country, BusinessAudience, OfferCatalog, Offer(4), UnitPriceSpecification(4), FAQPage, Question(5), Answer(5) |
| canonical | `https://www.miles-mobility.com/de/business/car-sharing` |
| Wörter | 2289 (längste Seite der Site) |
| Sanity-Sektionen | 12 |

Sektionsreihenfolge (12 Sektionen, aus `pageBuilder`):

| Nr | Sektionstyp | Headline wörtlich |
|---|---|---|
| 1 | Hero | MILES CARSHARING FÜRUNTERNEHMEN |
| 2 | Benefit-Karten (3) | (ohne H2) "Buche Geschäftsreisen sofort über die App", "Flexibler als herkömmliche Autovermietung", "Verfolge Reisekosten auf deinem Dashboard" |
| 3 | Zielgruppen-Karten | Maßgeschneiderte Lösungen für jede Unternehmensgröße. |
| 4 | Image-Text-Block | (ohne H2) "Vertrauen von Start-up bis Konzern" |
| 5 | Text-Banner | Entdecke, wie MILES zu deinem Business passt. (CTA "Kontakt aufnehmen" → `#leads-form`) |
| 6 | Fahrzeug-Karussell | Das beste Fahrzeug für dein Unternehmen |
| 7 | Text-Banner | (ohne H2) |
| 8 | Prozess-Steps (3) | So funktioniert's |
| 9 | Text-Banner | (ohne H2) |
| 10 | Testimonials (4) | Was Kund:innen sagen |
| 11 | Benefit-Karten (5) | Warum Carsharing ideal für dein Unternehmen ist |
| 12 | 70/30-Kacheln | (ohne H2) "Flexible Firmenmobilität", "Günstige Flughafenfahrten" |
| 13 | Lead-Formular | Warum warten? Beginne noch heute, Firmenkosten zu senken. |
| 14 | FAQ-Akkordeon | Noch Fragen? (5 Fragen, Hintergrund `miles900`) |

**Footer-Sektion Testimonials**: Kartenbreite `w-[16.68rem] sm:w-[26.25rem] max-w-105`,
Karussell-Container `flex justify-start pr-4 lg:pr-12 cursor-grab active:cursor-grabbing select-none w-full max-w-full gap-6`,
mit `role="progressbar"`. Kunden wörtlich: Butterstulle catering, SpreeQuell, BEAT81, Frühstück 3000.
Logo-Wand (10 Logos, aus Bild-Alt): "KoRo, Wirelane, act.3, SPREE QUELL, Butterstulle Catering,
R. Power Renewables, The CaterNauts Catering, ADAC Berlin-Brandenburg, NELLY, and Barebells."

**Lead-Formular im Detail**: Single-Step, keine Fortschrittsanzeige, kein Multi-Step.

| Feld | Gruppe | Input-Typ | Pflicht | Lead-Typ |
|---|---|---|---|---|
| Firmenname | Dein Unternehmen | text, `gridSpan: 6` | ja | organization |
| Stadt | Dein Unternehmen | text, `gridSpan: 4` | ja | organization |
| Anzahl der Mitarbeiter:innen | Dein Unternehmen | select (Listbox) | ja | deal |
| Vorname | Kontaktinformation | text | ja | person |
| Nachname | Kontaktinformation | text | ja | person |
| E-Mail | Kontaktinformation | email | ja | person |
| Telefonnr. (+49 176xxxxxxx) | Kontaktinformation | tel | nein | person |
| Thema | Deine Anfrage | select (Listbox) | ja | deal |
| Erzähle uns kurz, worum es geht | Deine Anfrage | textarea, `rows="4"` | ja | note |
| Language | hidden, Default `de` | text | nein | deal |
| Country | hidden, Default `DE` | text | nein | deal |
| Campaign utm | hidden | hidden | nein | deal |

Thema-Optionen wörtlich: "MILES for Business – Carsharing" / "Geschäftsreisen mit Carsharing für
Unternehmen vereinfachen"; "MILES for Business – Abo" / "Flexibles monatliches Abo für Fahrzeuge
oder ganze Flotten"; "Ich bin mir noch nicht sicher".
Mitarbeiter-Stufen: 1-5, 6-10, 11-50, 51-100, 101-500, 501-1000, 1000+.
Formularrahmen: `grid grid-cols-6 max-w-180 mx-auto gap-4 bg-white rounded-xl lg:rounded-2xl p-4 lg:px-8 lg:py-9 shadow-sm`.
Labels sind Floating Labels (`absolute top-5 left-4 text-primary-400 group-focus-within:top-3`),
Pflichtfelder mit Zusatz "(erforderlich)" im Labeltext. Submit: "Anfrage senden"
(`bg-black text-white rounded-lg px-6 py-5 lg:px-8`).
Microcopy wörtlich: "Mit dem Klicken auf „Anfrage senden" erklärst du dich damit einverstanden,
Mitteilungen an die angegebene E-Mail-Adresse zu erhalten. Mit dem Absenden der Anfrage erklärst du
dich mit den Datenschutzbestimmungen einverstanden und stimmst den Nutzungsbedingungen der MILES
Mobility GmbH zu." Backend: Pipedrive (`_type: pipedriveForm`), Fehlermeldung
"Etwas ist schiefgelaufen! Bitte versuche es später noch einmal."

### 8. `/de/car-sharing/berlin` (Städteseite, Template für 13 Städte)

| Feld | Wert |
|---|---|
| `<title>` | Berlin – Miete Fahrzeuge ab 0,79€/km \| MILES Mobility |
| Meta-Description | Van- und Carsharing in Berlin. Versicherung &amp; Tanken inklusive. Kostenlose Registrierung. |
| H1 | Carsharing in Berlin |
| H2 / H3 | 6 / 29 |
| Schema.org | WebPage, BreadcrumbList, ListItem(3), Service, City, Country, OfferCatalog, Offer(4), UnitPriceSpecification(4), FAQPage, Question(6), Answer(6) |
| canonical | `https://www.miles-mobility.com/de/car-sharing/berlin` |
| Wörter | 908 |
| Sanity-Sektionen | 10 |

Sektionsreihenfolge: Hero → Benefit-Karten (3) "Warum MILES?" → Aktions-Banner
("Starte Fußballtage mit MILES") → Fahrzeug-Kategorien-Karussell "Carsharing in Berlin für jeden
Anlass, vom Kleinwagen bis zum Transporter" → Prozess-Steps (4) "Auto mieten in easy"
("Finde ein Auto", "Öffne das Auto via App", "Mach eine Pause, wenn du willst",
"Beende deine Fahrt in der Stadt") → Tarif-Karten (2) "Flexible Tarife, an deine Plänen
angepasst" → Textblock "Mehr als nur Carsharing" → Marketing-Banner → Anlass-Karten
("Umzug in easy", "Entspannte Shopping-Trips", "Kostenloses Parken in unseren Städten",
"Erkunde die Gegend", "Entdecke unsere City-to-City Fahrten", "Carsharing am Flughafen BER",
"Unser Geschäftsgebiet in Berlin") → App-CTA "Alles in einer App. Hol sie dir!" →
FAQ-Akkordeon "Noch Fragen?" (6 Fragen, erste "Alles über MILES in Berlin").

### 9. `/de/cities` (Standort-Übersicht)

| Feld | Wert |
|---|---|
| `<title>` | MILES Städte – Unser Angebot in Deutschland \| MILES Mobility |
| Meta-Description | Entdecke, an welchen Orten in Deutschland du unsere Flotte mieten kannst. Viele Modelle, günstige Tarife. |
| H1 | Unsere Standorte |
| H2 / H3 | 2 / 11 |
| Schema.org | WebPage, BreadcrumbList, ListItem(16), ItemList, City(14), FAQPage, Question(5), Answer(5) |
| canonical | `https://www.miles-mobility.com/de/cities` |
| Wörter | 461 |
| Sanity-Sektionen | 4 |

14 Städte wörtlich: Berlin, Potsdam, Hamburg, München, Augsburg, Stuttgart, Frankfurt am Main,
Köln, Düsseldorf, Duisburg, Wuppertal, Solingen, Mönchengladbach, Neuss.
Pro Stadt ein Block mit stark gefettetem Ortsnamen und darunter drei Links:
"Carsharing in <Stadt>", "Auto mieten in <Stadt>", "Auto Abo in <Stadt>".
Struktur: `cityList` → `locationSection` → 21 `location`-Objekte (14 Städte + 7 Einträge mit
abweichendem Linkmuster).

### 10. `/de/about-us` (Über uns)

| Feld | Wert |
|---|---|
| `<title>` | About us - Geteilte &amp; nachhaltige Mobilität \| MILES Mobility (englischer Titel-Anfang in der DE-Version) |
| Meta-Description | Unser Ziel ist es, das urbane Leben mit nachhaltigen und zugänglichen Mobilitätslösungen zu verbessern. |
| H1 | Erlebe die gleiche Freiheit wie mit einem eigenen Auto |
| H2 / H3 | 3 / 21 |
| Schema.org | AboutPage, WebSite, BreadcrumbList, ListItem(2), Organization, QuantitativeValue |
| canonical | `https://www.miles-mobility.com/de/about-us` |
| Wörter | 573 |
| Sanity-Sektionen | 9 |

**Zähler/Stats-Block** (`numbers`, Hintergrund `miles900`, kein H2, aber `internalTitle` "Numbers"):
18.000+ Fahrzeuge, 800+ Teammitglieder, 14 Städte.
Sektionsreihenfolge: Hero → Image-Text-Block → Werte-Karten (6) "Unsere Werte" →
**Zahlen-Block** → Sticky-Stack "Entdecke echte Alternativen zum eigenen Auto" (6 Karten) →
Teaser "Unser Einfluss" (2) → Teaser (1) Charity → Kacheln (2) Karriere/Partnerschaften →
3er-Kacheln "MILES for Business", "News & Presse", "Standorte".

### 11. `/de/jobs` (Karriere)

| Feld | Wert |
|---|---|
| `<title>` | Jobs – Karrieremöglichkeiten: Komm in unser Team \| MILES Mobility |
| H1 | Join the ride! |
| H2 / H3 | 6 / 17 |
| Schema.org | WebPage, BreadcrumbList, ListItem, ItemList(2), JobPosting(3), Person(3), Place, PostalAddress |
| canonical | `https://www.miles-mobility.com/de/jobs` |
| Wörter | 584 |
| Sanity-Sektionen | 6 |

Offene Stellen (aus `JobPosting`): "Creative Concept & Copy (w/m/x/d)" (Marketing, Berlin),
"Sales Manager (w/m/x/d)" (Sales, Berlin), "(Senior) CRM Tech Manager (w/m/x/d)" (Marketing, Berlin),
alle verlinkt auf `miles-mobility.jobs.personio.de`. ATS: Personio.
Team-Schema (Person): Laura Kennedy (HR), Nora Goette (PR), Maria Klein (Customer Care),
jeweils mit Zitat als `description`.
Sektionen: FAQ-Akkordeon "Offene Stellen" → Zahlen-Block "Unser Team" (`miles900`) →
Werte-Karten (6) → Meet-our-Team (`miles900`) → "Ein Team, 20+ Standorte" (`miles100`) →
Podcast-Teaser (3 Folgen).

### 12. `/de/press` (Newsroom-Übersicht)

| Feld | Wert |
|---|---|
| `<title>` | Presse – News, Pressemitteilungen &amp; Kontakt \| MILES Mobility |
| H1 | Willkommen in unserem Newsroom |
| H2 / H3 | 2 / 14 |
| Schema.org | WebPage, BreadcrumbList, ListItem, ItemList, Article, DigitalDocument |
| Wörter | 439 |
| Sanity-Sektionen | 5 |

Sektionen: Hero → Intro-Image-Text → News-Liste (8 `imageTextBlock`) "Unsere aktuellen News"
→ Mediendownloads (4) → Text-Banner mit CTA "Alle Pressemitteilungen anzeigen"
(Ziel: `drive.google.com/drive/folders/1b2nUA0cKxTIM5uBdWULVN0essMAvX_dD`, Google Drive).
Pressekontakt: presse@miles-mobility.com.

### 13. `/de/press/carsharing-studie` (Artikel)

| Feld | Wert |
|---|---|
| `<title>` | Presse: Neue Studie zu Carsharing-Nutzung \| MILES Mobility |
| Meta-Description | Neue Studie zu Carsharing-Nutzung zeigt: Ein stationsloses Carsharing-Auto ersetzt bis zu 23 Fahrzeuge |
| H1 | Neue Studie zu Carsharing-Nutzung zeigt: Ein stationsloses Carsharing-Auto ersetzt bis zu 23 Fahrzeuge (83 Zeichen) |
| H2 / H3 | 0 / 4 |
| Schema.org | WebPage, BreadcrumbList, ListItem, NewsArticle, City |
| canonical | `https://www.miles-mobility.com/de/press/carsharing-studie` |
| Wörter | 1047 |
| Sanity-Sektionen | 11 `textBanner`-Blöcke |

**Artikel-Aufbau** (typisch für den Ratgeber-/News-Typ dieser Site):
1. H1, dann Lead-Subline "Free-Floating-Angebot leistet messbaren Beitrag zur Reduktion von privaten Pkw"
2. Bullet-Liste Key-Takeaways direkt nach dem Lead: "- Ein stationsloses Carsharing-Auto ersetzt je nach Stadt zwischen 13 und 23 private Pkw"; "- Ohne Free-Floating Carsharing-Angebot würde sich der private Autobesitz pro Haushalt in den untersuchten Städten um 0,4 Fahrzeuge erhöhen"
3. Ort + Datum wörtlich: "Berlin, 06.08.2025"
4. Download-Button
5. Fließtext mit Aufzählungen
6. Zitat-Box mit Namen (Hannes Schreier; "Kathrin Karola Viergutz, Head of Research bei MILES")
7. Fußnoten-Sektion ("Fußnoten") mit nummerierten Einträgen
8. Hintergrund-Abschnitte "Über die Studie", "Über das Institut Schreier", "Über MILES Mobility"
9. "Pressekontakt" mit E-Mail
10. Verwandte Artikel: Teaser-Kachel "Car sharing news"

Nicht vorhanden (im Unterschied zu klassischen Blog-Artikeln): Inhaltsverzeichnis, Autor-Box mit
Foto, Lesezeit, Artikel-Datum als Meta (steht nur im Text), Zwischen-CTAs, FAQ-Schema, Sterne-Bewertung.
Bilder im Artikel: 1 (das Artikelbild).
Interne Links: nur die globale Nav und der Footer (keine In-Text-Verlinkung auf andere MILES-Seiten).
Externe Links: 2 (`carsharing.de`-PDF in Fußnote 1, `institut-schreier.de`).

### 14. `/de/help` (Hilfe-Funnel)

| Feld | Wert |
|---|---|
| `<title>` | Hilfe – Erhalte 24/7 Hilfe &amp; Unterstützung \| MILES Mobility |
| H1 | HILFE &amp; KONTAKT |
| H2 / H3 | 2 / 11 |
| Schema.org | WebPage, BreadcrumbList, ListItem(11), ItemList(2), Article(4), Thing(5) |
| Wörter | 318 |
| Sanity-Sektionen | 5 |

Sektionen: Hero → Akkordeon "Die wichtigsten Themen" (4 Artikel-Einträge: "Voraussetzungen für
die Registrierung bei MILES", "MILES App Download & Anmeldung", "Verifizierung deiner Dokumente",
"Anmeldung als Fahranfänger:in (Rookie)") → Angebots-Karten (2) "Unser Angebot" (Carsharing,
Automiete) → Angebots-Karten (2) (MILES for Business, Auto Abo) → Kachel "App runterladen".
Sonderfall: nutzt `triggerButton` + `modal` (`_type`), also ein Modal-Element. Help-Center
ausgelagert nach `support.miles-mobility.com` (Zendesk).

### 15. `/de/sustainability`

| Feld | Wert |
|---|---|
| `<title>` | Was Carsharing wirklich bewegt \| MILES Mobility |
| Meta-Description | Eine aktuelle Studie des Schreier-Instituts zeigt, welchen positiven Einfluss flexible Carsharing auf die Verkehrsreduzierung und nachhaltige Mobilität hat. |
| H1 | WAS CARSHARING WIRKLICH BEWEGT |
| H2 / H3 | 4 / 15 |
| Schema.org | WebPage, BreadcrumbList, ListItem |
| Wörter | 471 |
| Sanity-Sektionen | 8 |

Sektionen: Hero → Content-Karten (3) → Marketing-Banner → Textblock → 2 Media-Blöcke →
Content-Karten (2).

### 16. `/de/pass/purchase-gold` (Geschenk-Funnel)

| Feld | Wert |
|---|---|
| `<title>` | Verschenke den MILES Pass Gold \| Premium Carsharing-Geschenk \| MILES Mobility |
| H1 | Verschenke einen Pass für ein City-Upgrade |
| H2 / H3 | 3 / 12 |
| Schema.org | WebPage, BreadcrumbList, ListItem(2), Service, Country, OfferCatalog, Offer(4), UnitPriceSpecification(8), FAQPage, Question(10), Answer(10) |
| Wörter | 372 |
| Sanity-Sektionen | 5 |

Sektionen: Hero → Pass-Auswahl (`passesTile` mit 4 `pass`-Objekten) →
Prozess-Steps (3) "So funktioniert's" ("Gewünschte Laufzeit auswählen", "Empfänger:in angeben &
bezahlen", "Code in der App einlösen") → Image-Text → Cross-Sell-Karten (3) "Entdecke unsere
anderen Pässe" (Silber, Platin, Black) → FAQ-Akkordeon "FAQ" (5 Fragen).
Buttons: "Silber", "Gold", "Platin", "Black", "Zur Bezahlung".

### 17. `/de/car-sharing/how-it-works` (Ablauf-Seite)

| Feld | Wert |
|---|---|
| `<title>` | So geht's – starte in nur wenigen Schritten \| MILES Mobility |
| Meta-Description | App herunterladen, kostenlos registrieren, Führerschein verifizieren und dein MILES starten! |
| H1 | "Tippen, buchen, fahren. Dein Auto in nur wenigen Sekunden." |
| H2 / H3 | 1 / 16 |
| Schema.org | keine `ld+json`-Blöcke im HTML (einzige Seite der Stichprobe ohne strukturierte Daten) |
| Wörter | 450 |
| Sanity-Sektionen | 8 |

Sektionen: Hero → Image-Text → 60/40-Kacheln (2 Schritte: "Reserviere dein Fahrzeug oder starte
die Fahrt", "(Ent)sperre das Auto über die App") → Kacheln (2: "Wähle den Tarif, der am besten zu
dir passt", "Beende die Fahrt innerhalb unseres Geschäftsgebiets") → Content-Karten (3:
"Umfangreiche Flotte" mit "19 verschiedenen Modellen", "Immer der beste Preis", "All-inclusive
Tarife") → 2 Special-Kacheln → Kacheln (2: "Green Rate", "Bonus Ride") → FAQ-Akkordeon
"Brauchst du Hilfe?" (4 Fragen).

## Design-System

### Fonts

Alle Schriften selbst gehostet unter `/fonts/`, kein Google-Fonts- oder Adobe-Fonts-Link.

| `font-family` | Gewicht | Datei |
|---|---|---|
| GT America | 900 | `/fonts/GT-America-Compressed-Black.woff2` (+ .woff) |
| GT America | 500 | `/fonts/GT-America-Standard-Medium.woff2` |
| GT America | 300 | `/fonts/GT-America-Standard-Light.woff2` |
| GT America Mono Regular | 400 | `/fonts/GT-America-Mono-Regular.woff2` |

- Body-Stack: `font-family: GT America, system-ui, sans-serif`
- Mono-Stack (Token vorhanden, im sichtbaren Layout nicht verwendet):
  `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`
- Display vs. Body: **dieselbe Familie**. Der Unterschied entsteht über Gewicht (900 für H1,
  700 für H2, 500 für H3, 300 für Body und Subline) und `text-transform: uppercase`.
  Compressed-Black (900) trennt H1 optisch stark vom Body-Light (300).
- Tailwind-Font-Gewicht-Tokens: `--font-weight-light: 300`, `normal: 400`, `medium: 500`,
  `semibold: 600`, `bold: 700`, `extrabold: 800`, `black: 900`

### Farben

Alle Farbwerte aus `all.css` (CSS-Custom-Properties) und den Häufigkeiten aus den drei CSS-Bundles.

**Primär-Palette (Slate-artig, Tailwind-v4-`@theme`-Token):**

| Token | Hex |
|---|---|
| `--color-primary-50` | `#f8fafc` |
| `--color-primary-100` | `#f2f5f9` |
| `--color-primary-200` | `#e3e8ef` |
| `--color-primary-300` | `#cdd5e0` |
| `--color-primary-400` | `#97a3b6` |
| `--color-primary-500` | `#677589` |
| `--color-primary-600` | `#4a5667` |
| `--color-primary-700` | `#364153` |
| `--color-primary-800` | `#20293a` |
| `--color-primary-900` | `#111729` |
| `--color-black` | `#000` |
| `--color-white` | `#fff` |

**Akzentfarben:**

| Token | Hex | Verwendung |
|---|---|---|
| `--color-accent-blue` | `#0a84ff` | Blue-Button-Hover, Link-Hover, App-CTA im Mobilmenü (`bg-[#0A84FF]`) |
| `--color-accent-red` | `#f6280c` | Fehlermeldungen (`text-accent-red`) |
| `--color-accent-green` | `#0ecaa0` | Token vorhanden, im HTML nicht verwendet |
| `#0059B3` | (kein Token) | Text-Button-Farbe, Fokus-Ring (`focus-visible:ring-[#0059B3]`), Blue-Button-Basis |

**Die 10 häufigsten Hex-Werte im CSS:**

| Rang | Wert | Häufigkeit | Rolle |
|---|---|---|---|
| 1 | `#0000` | 20 | transparent (Verlaufs-Stops) |
| 2 | `#0000001a` | 19 | Schattenfarbe (10% Schwarz) |
| 3 | `#df1b41` | 8 | Zendesk/Formular-Fehlerfarbe (Fremd-Widget) |
| 4 | `#fff` | 7 | Weiß |
| 5 | `#0a84ff` | 7 | Akzent-Blau |
| 6 | `#0059b3` | 7 | Link-/Button-Blau |
| 7 | `#0A84FF` / `#0059B3` | 5 / 5 | Duplikate in anderer Schreibweise |
| 8 | `#0000000f` | 3 | Schatten 6% Schwarz |
| 9 | `#364153` | 2 | `--color-primary-700` |
| 10 | `#cdd5e0` | 2 | `--color-primary-300`, Disabled-Button-Hintergrund |

**Farbrollen:**

- Hintergrund: `#fff` (Standard, `class="bg-white"` am `<html>`), Flächen in `--color-primary-100`
  (FAQ-Akkordeons, Karten) und `--color-primary-900` (Bänder, Formular, Footer)
- Text: `--color-black` (`#000`) auf Weiß; `--color-primary-700` als Sekundärtext;
  `--color-primary-300` als Textfarbe auf dunklem Grund
- Akzent auf Buttons: Primärbutton ist **schwarz** (`bg-black text-white`), nicht blau.
  Blau (`#0059B3` / `#0A84FF`) ist die Link-Farbe und der Fokus-Ring
- Semantik-Zuordnung (aus JS `getBackgroundColor` / `parseTextColor`): `miles100`/`miles200` →
  heller Grund, schwarze Headline, `primary-700`-Body; `miles700`/`miles900` → dunkler Grund,
  weiße Headline, `primary-300`-Body

**CSS-Custom-Properties (vollständig, im CSS deklariert):**

Farben: `--color-primary-{50..900}` (10), `--color-accent-{blue,green,red}`, `--color-black`,
`--color-white`, dazu die von Tailwind v4 mitgelieferten `--color-{red,green,yellow,cyan,blue,purple,gray}-{50..900}`.
Radius: `--radius-md: .375rem`, `--radius-lg: .5rem`, `--radius-xl: .75rem`,
`--radius-2xl: 1rem`, `--radius-3xl: 1.5rem`.
Fonts: `--font-sans`, `--font-mono`, `--font-weight-{light..black}` (7).
Typo: `--text-{xs,sm,base,lg,xl,2xl,3xl,4xl,5xl,6xl}` je mit `--line-height`.
Layout: `--spacing: .25rem`, `--container-{xl: 36rem, 2xl: 42rem, 4xl: 56rem, 6xl: 72rem}`,
`--breakpoint-2xl: 96rem`.
Motion: `--ease-out: cubic-bezier(0, 0, .2, 1)`, `--ease-in-out: cubic-bezier(.4, 0, .2, 1)`,
`--default-transition-duration: .15s`, `--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1)`,
`--animate-spin`, `--animate-pulse`.

### Radius

| Wert | Häufigkeit | Verwendung |
|---|---|---|
| `var(--radius-2xl)` = 1rem | 7 | Karten, große Bildcontainer, FAQ-Container (`lg:rounded-2xl`), Nav-Dropdown |
| `var(--radius-xl)` = .75rem | 6 | Karten mobil, Bildcontainer |
| `var(--radius-lg)` = .5rem | 3 | Formularfelder, Listenpunkte im Dropdown |
| `var(--radius-md)` = .375rem | 1 | Primärbuttons (`rounded-md`) |
| `3.40282e38px` | 3 | `rounded-full`, entspricht Tailwinds Pill-Wert |
| `0` | 3 | scharfe Kanten |

Buttonform: Primärbutton ist **leicht gerundet, nicht pill** (`rounded-md` = 6px).
Nav-Buttons und Sekundärbuttons sind **pill** (`rounded-full`). Karten sind `rounded-2xl` (16px).

### Shadows

Es gibt nur drei Schattenwerte, alle von Tailwind v4 generiert:

| Klasse | Wert |
|---|---|
| `shadow-sm` | `0 1px 3px 0 #0000001a, 0 1px 2px -1px #0000001a` |
| `shadow-lg` | `0 10px 15px -3px #0000001a, 0 4px 6px -4px #0000001a` |
| `shadow-xl` | `0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000001a` |

Verwendung: `shadow-xl` für Nav-Dropdowns, `shadow-lg` für Sticky-Bottom-Banner und
Formular-Selectboxen, `shadow-sm` für Formularcontainer. Keine harten oder farbigen Schatten.

### Spacing und Container

- Container: `mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8` mit
  `max-w-screen-2xl = var(--breakpoint-2xl) = 96rem` (1536px)
- Ausnahme Footer: `mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8`
- Basis-Spacing: `--spacing: .25rem`; jede Tailwind-Spacing-Klasse ist ein Vielfaches davon
- Sektions-Padding: `pb-8` (= 2rem) für alle `pageBuilder`-Sektionen, erste Sektion zusätzlich
  `pt-8` (= 2rem); Sektions-Margin zwischen Blöcken `last:mb-16 lg:last:mb-24`
  (= 4rem mobil / 6rem Desktop)
- Sticky-Stack-Karten: `py-20` (= 5rem)
- Vertikaler Hero-Abstand: `margin-top: 15.06rem` Desktop, `calc(var(--spacing) * 28)` = 7rem mobil
- Grid: durchgehend 12 Spalten (`grid-template-columns: repeat(12, minmax(0, 1fr))`),
  Textblöcke typisch `grid-column: 3/span 8` (Hero) oder `lg:col-span-8 lg:col-start-3` (FAQ),
  Bild-Text-Splits `lg:col-span-5` + `lg:col-span-6 lg:col-start-7`
- Zusätzlicher Custom-Breakpoint `nav:` = `@media (min-width: 71.5625rem)` (1145px) für die
  schwebende Navigation

### Typo-Skala

| Element | Regel (wörtlich aus `all.css`) |
|---|---|
| H1 | `font-size: clamp(3rem, 8vw, 6rem); line-height: 110%; font-weight: 900; text-transform: uppercase` |
| H2 | `font-size: clamp(2.25rem, 6vw, 3.75rem); line-height: 120%; font-weight: 700; text-transform: uppercase` |
| H3 | `font-size: clamp(1.75rem, 4vw, 2.25rem); line-height: 120%; font-weight: 500` (kein uppercase) |
| Body | `font-size: var(--text-lg)` = 1.125rem; `line-height: calc(1.75 / 1.125)` ≈ 1.556; `font-weight: 300` |
| H4-H6 | `font-size: inherit; font-weight: inherit` (keine eigenen Werte, 0 H4 auf allen Seiten) |

Letter-Spacing: **keine** `letter-spacing`-Deklaration für Headlines im CSS. Die optische Enge
kommt ausschließlich aus der Compressed-Black-Schrift und `text-transform: uppercase`.
Zusätzlich im Einsatz: `hyphens-auto` auf allen Headlines und Absätzen (deutsche Silbentrennung),
`text-[clamp(1.75rem,4vw,2.25rem)]` als Utility-Wiederholung des H3-Werts,
`text-base` (1rem) für Subtexte, `text-sm` für Formularmikrocopy,
`text-[1.0625rem] lg:text-lg` für FAQ-Antworten auf Mobil.

## Animationen

### Transition-Deklarationen (alle, mit exakten Werten)

| Property | Dauer | Easing | Beleg |
|---|---|---|---|
| `all` (Tailwind `transition-all`) | `.15s` | `cubic-bezier(.4, 0, .2, 1)` | `--default-transition-duration:.15s`, `.duration-150{--tw-duration:.15s}` |
| `all` | `.2s` | `cubic-bezier(.4, 0, .2, 1)` | `.duration-200{--tw-duration:.2s}` |
| `all` | `.25s` | wie Default | `.duration-250{--tw-duration:.25s}` |
| `all` | `.3s` | wie Default | `.duration-300{--tw-duration:.3s}` |
| `all` | `.4s` | wie Default | `.duration-400{--tw-duration:.4s}` |
| `transform` | `.1s` | Default | `h1{transition:transform .1s}` |
| `opacity` | `.2s` | `ease-in` | `.fnwpv81{transition:opacity .2s ease-in}` |
| `all` | `.2s` | `linear` | Card-Skeleton |

Easing-Tokens: `--ease-out: cubic-bezier(0, 0, .2, 1)`, `--ease-in-out: cubic-bezier(.4, 0, .2, 1)`.

**Konkrete Verwendungen mit exakten Klassen:**

- Nav-Container: `transition-all duration-400` (Verstecken beim Scrollen)
- Nav-Buttons: `transition-all duration-300`, Chevron `transition-transform duration-300`
- Nav-Dropdown-Panel: `transition-all duration-300 transform origin-top`, Zustände
  `opacity-100 visible scale-100 translate-y-0` gegen `opacity-0 invisible scale-95 -translate-y-2 pointer-events-none`
- Dropdown-Links: `transition-all duration-200 font-light`
- Primärbutton: `... active:scale-90 ... transition-all duration-300`
- Blue-Button: `transition-all duration-300`, `active:scale-90`
- Textbutton: `transition-all duration-300`, Chevron `group-hover:translate-x-0.5`
- Footer-Links: `transition-all duration-300` (`text-primary-300 hover:text-white`)
- FAQ-Akkordeon-Button: `transition-all duration-200`, Chevron `transition-transform duration-200`
- Formularfelder: `transition-all duration-250 ease-in-out` (Floating Label hebt sich von
  `top-5` auf `top-3`)
- Selectbox-Optionen: `transition-colors duration-150`

### `@keyframes` (vollständig, alle 6)

| Name | Body | Beschreibung |
|---|---|---|
| `spin` | `to{transform:rotate(360deg)}` | Standard-Spinner |
| `pulse` | `50%{opacity:.5}` | Pulsieren (Skeleton) |
| `_1b6o2se0` | `0%{transform:rotate(0)} to{transform:rotate(360deg)}` | Spinner, `animation:.5s linear infinite _1b6o2se0` |
| `_1a85unk1` | `0%{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)}` | Einblenden mit Scale-Up, `animation:.2s ease-out _1a85unk1` |
| `_1a85unk2` | `0%{opacity:0} to{opacity:1}` | Reines Einblenden, `animation:.2s ease-out _1a85unk2` |
| `fnwpv80` | `0%{transform:translate(-100%)} to{transform:translate(100%)}` | Skeleton-Shimmer |

Zusätzlich als Utility, aber **ohne zugehörige `@keyframes`-Definition im CSS**:
`.animate-\[fadeInUp_0\.4s_ease-out\]{animation:.4s ease-out fadeInUp}`.
Die Animation wird in 7 der 17 HTML-Dateien verwendet (p-car-sharing 13x, p-car-rental 13x,
p-press 12x, p-business 8x, p-city-berlin 8x, p-about-us 6x, p-jobs 6x), insgesamt 66 Instanzen.
Die `fadeInUp`-Keyframes selbst stehen nicht im ausgelieferten CSS, in dem die Klasse definiert
ist. Ob sie in einem separaten Stylesheet oder gar nicht definiert sind, ist mit den hier
verfügbaren Mitteln nicht belegbar.

### Motion-Libraries

| Library | Beleg | Nutzung |
|---|---|---|
| **Framer Motion** | `motion.div`, `motion.li`, `motion.button`, `motion.span`, `motion.section`, `motion.p`, `AnimatePresence`, `whileTap`, `layoutId`, `initial/animate/exit/transition`, `staggerChildren` in `js-0s93rz4dntojv.js` (15x `motion.`), `js-23mfmhok-08fp.js` (8x) | Mobile-Menü, Modal/Drawer, FAQ-Akkordeon, Fahrzeug-Chips, Sticky-Bottom-Banner, Preisrechner |
| React | Next.js App Router, `self.__next_f.push` RSC-Payload, `useEffect`/`useState`/`useRef` | Grundgerüst |
| Vanilla-Transitionen | `transition-all duration-*` | Nav, Buttons, Links, Karten |
| **Nicht gefunden** | kein GSAP, kein ScrollTrigger, kein Lenis, kein AOS, kein Swiper/Splide/Embla/Keen-Slider, kein Lottie, kein Rive, kein Three.js, keine Webflow-`data-w-id`, kein Elementor | Belegt durch Grep über alle 15 JS-Chunks und 17 HTML-Dateien |

### Scroll-Reveal

Kein generisches Scroll-Reveal-System. Konkret belegt:

- **Sticky-Nav-Hide-on-Scroll** (in `js-23mfmhok-08fp.js`, vanille, mit `requestAnimationFrame`):
  ```
  let t = () => {
    let t = window.scrollY;
    if (5 > Math.abs(t - y)) { e = !1; return }   // Totzone 5px
    t > 100 ? b(t < y) : b(!0),                   // über 100px: sichtbar nur beim Hochscrollen
    w(t), e = !1
  }
  ```
  Ergebnis-Klasse am `<nav>`: `-translate-y-full opacity-0`, wenn nicht sichtbar.
  `window.addEventListener("scroll", a, {passive: true})`.
- **IntersectionObserver** ist in 5 Chunks vorhanden (7x in `js-1nes5mp3s07qu.js`, 3x in
  `js-0ewtsnro4ze7n.js`, 2x in `js-0s93rz4dntojv.js`, 2x in `js-00cbwvqtmwgla.js`), dient aber
  nicht dem Reveal, sondern u. a. dem Impression-Tracking (`useTrackImpression` mit
  `{threshold: .5, triggerOnce: true}` für `view_promotion`).
- Kein `aos-init`, kein `data-aos`, keine `reveal`-Klassen mit Stagger (2 Treffer für "reveal"
  in p-about-us.html sind Textinhalt, nicht Code).

### Hover-Effekte

| Element | Änderung |
|---|---|
| Primärbutton schwarz | `hover:bg-primary-700`; zusätzlich `active:bg-primary-700 active:scale-90` |
| Blue-Button | `hover:bg-[#0A84FF]`, `active:bg-[#0059B3] active:scale-90` |
| Weißer Button | `hover:bg-[#F1F5F9]`, `active:bg-white active:scale-90` |
| Textbutton | `hover:text-[#0A84FF]`, Chevron `group-hover:translate-x-0.5` |
| Nav-Button | `hover:bg-primary-900`, Chevron `rotate-180` (bei offenem Dropdown) |
| Dropdown-Link | `hover:bg-primary-800 hover:text-white` |
| Footer-Link | `text-primary-300 hover:text-white` |
| Karussell | `cursor-grab active:cursor-grabbing select-none` |
| Filter-Chip | `hover:bg-primary-50`, inaktiv `hover:border-primary-400` |

### Sticky, Parallax, Marquee, Counter

- **Sticky-Stack (Cards)**: Wrapper `min-h-screen md:min-h-[60vh] flex items-center justify-center sticky top-0 py-20`,
  innere Karte mit `top: calc(-5vh + ${25*h}px)` (h = Kartenindex), `transformOrigin: "top center"`
  und progressiver Skalierung
  `scale = interpolate(progress, [0.25 * index, 1], [1, targetScale || 1 - (totalItems - index) * 0.05])`.
  Standard-Zielskalierung also **1 - (n - i) * 0.05**, das heißt bei 6 Karten skaliert die oberste
  auf 1 - 5*0.05 = 0.75. Belegt in `js-0s93rz4dntojv.js`, Verwendung u. a. p-about-us (6 Karten),
  p-car-sharing (6), p-business (8), p-jobs (8).
- **Karussell**: eigener Vanilla-Slider mit
  `transform: translateX(...)`, `transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
  Progressbar `role="progressbar"` (`js-0s93rz4dntojv.js`).
- **Fahrzeug-Chip-Indikator**: Framer-Motion `layoutId="vehicle-selection"` und
  `layoutId="distance-tab-pill"` mit `transition: {type: "spring", stiffness: 500, damping: 40}`,
  `whileTap: {scale: .96}`.
- **Zähler-Animation (Preis)**: `nD(animierterWert, zielwert, {duration: .5, ease: [.25,.46,.45,.94]})`.
- **Marquee**: kein Marquee vorhanden. `fnwpv80` (translate -100% nach +100%) ist Skeleton-Shimmer,
  kein Logo-Marquee.
- **Video-Autoplay**: keine `<video>`-Tags auf den analysierten Seiten (0 Treffer in allen 17 Dateien).
  Videos liegen nur als eingebettete YouTube-Links (50 YouTube-URLs über alle Seiten, aber
  0 `<iframe>` außer dem GTM-Noscript-iframe). Video-Komponenten sind im CSS vorbereitet
  (`styles-module__RWIo8a__responsiveVideoContainer video{width:100%;height:100%;position:absolute;top:0;left:0}`,
  `video[data-loading=true]{opacity:0}`), aber im abgerufenen HTML nicht instanziiert.

### Framer-Motion-Werte (exakt, aus dem JS)

Mobile-Menü (`js-23mfmhok-08fp.js`):

```
Overlay:   initial={opacity: 0}           animate={opacity: 1}      exit={opacity: 0}
           transition={duration: .3, delay: 0}
Panel:     initial={y: "100%", top: "100%"} animate={y: 0, top: 0}   exit={y: "100%", top: "100%"}
           transition={type: "keyframes", stiffness: 300, damping: 30, duration: .4}
           className="nav:hidden bg-primary-900 z-50 rounded-t-3xl ... mt-16 p-8 fixed bottom-0"
Inhalt:    initial={opacity: 0, y: 20}  animate={opacity: 1, y: 0}   transition={delay: .3, duration: .4}
Nav-Items: initial={opacity: 0, x: -20} animate={opacity: 1, x: 0}   transition={delay: .2 + .1 * i, duration: .3}
Unterteil: initial={opacity: 0, y: 20}  animate={opacity: 1, y: 0}   transition={delay: .6, duration: .4}
Sub-Items: initial={opacity: 0, x: -20} animate={opacity: 1, x: 0}   transition={delay: .7 + .1 * i, duration: .3}
App-CTA:   initial={opacity: 0, y: 20}  animate={opacity: 1, y: 0}   transition={delay: .5, duration: .4}
```

Sticky-Bottom-Promotion-Banner:

```
initial={y: "150%"}  animate={y: 0}  exit={y: "100%", transition: {type: "tween", duration: .3, ease: "easeIn"}}
transition={type: "spring", stiffness: 300, damping: 30, delay: 1}
```

FAQ-Akkordeon (`js-0s93rz4dntojv.js`):

```
initial={height: 0, opacity: 0}  animate={height: "auto", opacity: 1}  exit={height: 0, opacity: 0}
transition={duration: .3, ease: "easeInOut"}   // Konstante O = {duration: .3, ease: "easeInOut"}
```

Bottom-Sheet-/Dialog-Modal (`js-0s93rz4dntojv.js`):

```
Overlay: className="fixed inset-0 z-50 bg-black/50 lg:hidden"
         initial={opacity: 0} animate={opacity: 1} exit={opacity: 0}
         transition={duration: .25, ease: [.25, .46, .45, .94]}
Dialog:  initial={y: "100%"} animate={y: 0} exit={y: "100%"}
         transition={duration: .3, ease: [.25, .46, .45, .94]}
         className="fixed inset-x-0 bottom-0 z-50 flex max-h-[90vh] flex-col rounded-t-2xl bg-white shadow-xl lg:hidden"
```

Preisrechner-Stagger:

```
Container: variants={{hidden: {}, show: {transition: {staggerChildren: .07, delayChildren: .08}}}}
           initial="hidden" animate="show"
Ergebnis:  initial={opacity: 0, x: 24} animate={opacity: 1, x: 0}  transition={duration: .35, ease: [.25,.46,.45,.94]}
Fehler:    initial={opacity: 0, y: 8}  animate={opacity: 1, y: 0}  transition={duration: .3}
Zahlen:    nD(wert, ziel, {duration: .5, ease: [.25, .46, .45, .94]})
```

### Reduced Motion

Vorhanden, aber nur an einer Stelle:

```css
@media screen and (prefers-reduced-motion:reduce){.fnwpv81{background-color:var(--card-skeleton-color-from)}}
@media screen and (prefers-reduced-motion:no-preference){
  .fnwpv84{background-color:var(--card-skeleton-color-from);contain:paint;-webkit-mask-image:linear-gradient(#fff,#fff);mask-image:linear-gradient(#fff,#fff)}
}
```

Das ist die Skeleton-Ladeanimation. Für die Framer-Motion-Animationen (Sticky-Stack,
Mobile-Menü, Sticky-Banner) ist **keine** Reduced-Motion-Berücksichtigung belegt.

### Tech-Stack im Detail

| Kategorie | Wert | Beleg |
|---|---|---|
| Framework | Next.js App Router mit Turbopack | `/_next/static/immutable/chunks/turbopack-3azk_tt3wt5pc.js`, `self.__next_f.push`, RSC-Payload |
| Hosting | Vercel | `<html data-dpl-id="dpl_DMNKzAYskB7QLGepQSmt37bjjY8k">` |
| CSS | Tailwind CSS v4 | `@theme`-Tokens (`--color-primary-*`, `--radius-*`, `--ease-*`), `color-mix(in oklab, ...)`, `@media (min-width: 64rem)`-Ausgabe, `--tw-*`-Variablen |
| CMS | Sanity.io | `cdn.sanity.io/images/9r1078q8/production/...`, `9r1078q8.api.sanity.io`, `studio.miles-mobility.com`, `data-sanity="id=...;type=...;path=pageBuilder:...;base=..."` |
| Bildoptimierung | Next.js Image | `/_next/image?url=...&w=...&q=75`, `data-nimg="fill"`/`data-nimg="1"` |
| Consent | Usercentrics | `app.usercentrics.eu/browser-ui/latest/loader.js`, `data-settings-id`, `data-usercentrics` an Scripts |
| Tag-Manager | Google Tag Manager `GTM-WV6M6MW` | Inline-Snippet + Noscript-iframe |
| Attribution | Adjust | `app.adjust.com/1e3cbrpj?campaign=generic_home`, `app.adjust.com/1br6crta` |
| CRM (B2B) | Pipedrive | `_type: "pipedriveForm"`, Feldmapping `pipedriveFieldId` |
| Support | Zendesk | `support.miles-mobility.com`, `miles-subscription.zendesk.com` |
| Bewerbungen | Personio | `miles-mobility.jobs.personio.de` |
| Auto-Abo | eigene Subdomain | `abo.miles-mobility.com` |
| App-API | eigene Subdomain | `api.app.miles-mobility.com`, `business.app.miles-mobility.com` |
| Formulare | eigene Subdomain | `forms.miles-mobility.com` |
| Analytics-Hinweis | Kein Hotjar, kein Clarity, kein Matomo, kein Facebook-Pixel im HTML gefunden | |

### Bilder

| Merkmal | Wert | Beleg |
|---|---|---|
| Format-Auslieferung | Next.js-Image-Endpunkt, Quelle PNG/WebP/SVG, je nach `fm=`-Parameter auch direkt WebP | `url=...%3Ffm%3Dwebp%26q%3D80`, `.webp`-Assets in p-business (16), p-sustainability (9), p-car-rental (1) |
| `loading="lazy"` | ja, auf fast allen Bildern; nur 2-10 Bilder pro Seite ohne | Startseite 20 von 22, business 29 von 31, car-sharing 24 von 39 |
| `srcset` | ja, auf **allen** Bildern (100%) | `imageSrcSet` mit Stufen 32/48/64/96/128/256/384/640/750/828/1080/1200/1920/2048/3840w, `sizes` gesetzt |
| Hero-`fetchpriority` | Nein, kein `fetchpriority="high"` auf Bildern. Die 2 `rel="preload" as="image"`-Tags laden Logo und Hero-Bild vor | `<link rel="preload" as="image" imageSrcSet=...>` im `<head>` der Startseite |
| Blur-Placeholder | Ja, LQIP als Inline-SVG-Blur (`feGaussianBlur stdDeviation='20'`) plus `blurHash`/`thumbHash` in den Sanity-Metadaten | `style="background-image:url("data:image/svg+xml;...feGaussianBlur stdDeviation=&#x27;20&#x27;...")` |
| Aspect-Ratio | über CSS-Variablen | `--mobile-aspect-ratio`, `--desktop-aspect-ratio`, Klassen `aspectRatioDynamic`/`aspectRatio16to9`/`aspectRatio4to3`/`aspectRatio3to2`/`aspectRatio21to9` |
| Feste Bildhöhen | `responsiveHeightSmall/Medium/Large` = 200/300/400px mobil, 250/350/500px ab Tablet, 300/400/600px ab Desktop | `.styles-module__-9TjVW__responsiveHeight*` |
| Alt-Texte | vorhanden und ausführlich beschreibend, englischsprachig | "A cartoon gray car with \"MILES\" on its side, driven by a woman waving cheerfully from the window, speeds down a road." |

## Synthese

### 1. Seitentyp-Blueprints

**A) Startseite** (7 pageBuilder-Sektionen, alle `background: white`)
1. Nav (fixed, schwebend ab 1145px)
2. Hero mit H1 uppercase + 11-Wort-Subline + 1 Primärbutton, Bild darunter Full-Bleed
3. Teaser-Kacheln 4er-Grid ("Wähle dein Fahrerlebnis"), ganze Kachel verlinkt
4. Final-CTA/App-Download zweispaltig 40/60 auf `primary-900`, ganzer Block verlinkt, mit QR-id
5. Teaser-Kacheln 60/40 ("Über 18.000 Fahrzeuge zur Auswahl")
6. 3 Feature-Karten als Sticky-Stack ("Die neue Art zu fahren")
7. Teaser-Kacheln klein 3er (Orientierung: Städte / Ablauf / Preis)
8. Teaser-Kacheln klein 3er (Corporate: Charity / About / Städteentwicklung)
9. Footer

**B) Produktseite (Carsharing / Mietwagen / Auto-Abo)**
1. Hero zentriert, H1 als Imperativ ("BUCHE EIN AUTO MIT NUR EINEM KLICK")
2. Benefit-Karten 3er mit Text-Bild
3. Fahrzeug-Karussell mit CTA "Zu allen Fahrzeugen"
4. 6 Zigzag-Blöcke (Anlässe: längere Miete, Umzug, Shopping, DIY, Flughafen, Familie)
5. Tarif-Karten 2er (Standard-km / Stundentarife)
6. Pass-Teaser als Einzelkachel
7. Trust-Karten 3er (1 Mio. Nutzer, Top bewertete App mit 4,5 Sternen, 18.000 Fahrzeuge)
8. B2B-Banner
9. FAQ-Akkordeon (6 Fragen, `lg:col-span-8 lg:col-start-3`)

**C) Preisseite**
1. Hero mit Tarifwahl-Subline
2. Benefit-Karten 3er
3. Tarif-Karten 3er (km-Tarif nach Fahrzeugklasse)
4. Einzelkachel als Zwischenüberschrift ("Kurze Trips, große Flexibilität")
5. Tarif-Karten 2er (3h / 6h)
6. Einzelkachel ("S/M & Premium")
7. Tarif-Karten 4er (1 Tag)
8. Tarif-Karten 4er (2/3 Tage)
9. Tarif-Karten 4er (4/5/7/9 Tage)
10. Einzelkachel ("L & XL")
11. Tarif-Karten 4er (Transporter)
12. Textblock "... und viele mehr!"
13. 60/40-Kacheln auf `primary-900` ("Du willst noch mehr sparen?" → Pass / reduzierte Tarife)
14. FAQ-Akkordeon (7 Fragen)

**D) Pass-/Abo-Seite**
1. Hero ("SMARTER REISEN MIT DEM MILES PASS")
2. Benefit-Karten 3er (Sparen / Vorteile / jederzeit kündbar)
3. Pass-Karten 2er (Silber, Gold)
4. Pass-Karten 2er (Platin, Black)
5. 2 Marketing-Banner
6. Vergleichstabelle 5 Spalten, min-width 1200px, in `overflow-x-auto`
7. 2 Textblöcke (einer mit CEO-Video: "Hast du Fragen? Unser CEO hat Antworten!")
8. FAQ-Akkordeon (11 Einträge, erste Position "Bedingungen")

**E) Städteseite** (Template für 13 Städte, H1 = "Carsharing in <Stadt>")
1. Hero mit Städtenamen
2. Benefit-Karten 3er "Warum MILES?"
3. Aktions-Banner (saisonal)
4. Fahrzeug-Kategorien-Karussell (S / M / L- und XL / Premium)
5. Prozess-Steps 4er "Auto mieten in easy"
6. Tarif-Karten 2er
7. Textblock "Mehr als nur Carsharing"
8. Marketing-Banner
9. Anlass-Karten (Umzug, Shopping, Parken, Gegend erkunden, City-to-City, Flughafen, Geschäftsgebiet)
10. App-CTA
11. FAQ-Akkordeon (6 Fragen, erste "Alles über MILES in <Stadt>")

**F) Standort-Übersicht**
1. Hero "Unsere Standorte"
2. `cityList` mit Ländergruppen (H2 "Deutschland 🇩🇪"), pro Stadt Block mit Ortsname fett und 3 Links (Carsharing / Auto mieten / Auto Abo)
3. Marketing-Banner
4. FAQ-Akkordeon (5 Fragen)

**G) Über uns**
1. Hero
2. Image-Text-Block
3. Werte-Karten 6er "Unsere Werte"
4. Zahlen-Block 3 Werte auf `miles900`
5. Sticky-Stack 6 Karten "Entdecke echte Alternativen zum eigenen Auto"
6. Teaser 2er "Unser Einfluss"
7. Teaser 1 Charity
8. Kacheln 2er (Karriere / Partnerschaften)
9. Teaser-Kacheln klein 3er (B2B / Presse / Standorte)

**H) Karriere**
1. Hero "Join the ride!"
2. FAQ-artige Liste der offenen Stellen (aus Personio)
3. Zahlen-Block "Unser Team"
4. Werte-Karten 6er
5. Image-Text mit Team-Fotos "Meet our Team"
6. Image-Text "Ein Team, 20+ Standorte"
7. Podcast-Teaser 3er

**I) B2B-Landingpage mit Lead-Funnel**
1. Hero
2. Benefit-Karten 3er
3. Zielgruppen-Karten 3er nach Unternehmensgröße
4. Image-Text mit Logo-Wand "Vertrauen von Start-up bis Konzern"
5. Text-Banner "Entdecke, wie MILES zu deinem Business passt." mit Sprungmarken-CTA `#leads-form`
6. Fahrzeug-Karussell nach Kategorie
7. Prozess-Steps 3er
8. Testimonial-Karussell 4er (Drag, `cursor-grab`, Progressbar)
9. Benefit-Karten 5er
10. 70/30-Kacheln
11. Lead-Formular (12 Felder, 1 Schritt, Pipedrive)
12. FAQ-Akkordeon 5er auf `miles900`

**J) Newsroom-Übersicht**
1. Hero "Willkommen in unserem Newsroom"
2. Intro-Image-Text
3. News-Liste 8 Karten
4. Mediendownloads 4er
5. Text-Banner mit CTA zu Google Drive

**K) Artikel / Pressemitteilung**
1. H1 als vollständige Aussage (83 Zeichen)
2. Subline als Lead
3. Key-Takeaways als Bullet-Liste direkt unter dem Lead
4. Ort, Datum ("Berlin, 06.08.2025") + Download-Button
5. Fließtext mit Aufzählungen
6. Zitat-Boxen mit Namensnennung
7. Fußnoten-Block
8. Hintergrund-Blöcke ("Über die Studie", "Über das Institut", "Über MILES Mobility")
9. Pressekontakt
10. Verwandte Artikel

**L) Hilfe-Funnel**
1. Hero "HILFE & KONTAKT"
2. Akkordeon "Die wichtigsten Themen" (4 Einträge)
3. Angebots-Karten 2er
4. Angebots-Karten 2er
5. App-Download-Kachel

**M) Geschenk-Funnel (Pass-Kauf)**
1. Hero
2. Produkt-Auswahl (4 Pass-Varianten)
3. Prozess-Steps 3er
4. Image-Text
5. Cross-Sell-Karten 3er
6. FAQ-Akkordeon 5er

### 2. Die 5 stärksten Muster dieser Site

**Muster 1: Konsequente 12-Spalten-Textachse mit schmalem Lesebereich.**
Jeder Textblock sitzt in einem festen Grid-Fenster, nicht in voller Breite. Beleg:
`.styles-module__XAVUbq__heroBasic .styles-module__XAVUbq__headingWrapper{text-align:center;grid-column:2/span 10}`
und auf Desktop `{grid-column:3/span 8}`; FAQ-Items `class="lg:col-span-8 lg:col-start-3"`;
Textbreiten-Deckel `let A="max-w-[40rem]"` für FAQ-Antworten in `js-0s93rz4dntojv.js`;
Hero-Headline-Wrapper `max-w-160 pt-8 lg:pt-16 mx-auto flex flex-col items-center justify-center text-center`.
Wirkung: trotz 1536px-Container bleibt die Textzeile lesbar, Bilder dürfen breit sein.

**Muster 2: Compressed-Black-H1 gegen Light-Body, gleiche Schriftfamilie.**
Beleg: `h1{font-size:clamp(3rem,8vw,6rem);line-height:110%;font-weight:900;text-transform:uppercase}`,
`h2{font-size:clamp(2.25rem,6vw,3.75rem);line-height:120%;font-weight:700;text-transform:uppercase}`,
`body{font-family:GT America,system-ui,sans-serif;font-size:var(--text-lg);font-weight:var(--font-weight-light)}`
mit `--font-weight-light:300`. Dazu `@font-face{font-family:GT America;font-weight:900;
src:url(/fonts/GT-America-Compressed-Black.woff2)}`. Wirkung: maximale Kontrastspannung ohne
zweite Schrift, spart eine Font-Ladung.

**Muster 3: Systematischer Farbwechsel ganzer Sektionen über semantische Tokens.**
Beleg: Sektionen tragen `style="background-color:var(--color-primary-900)"` bzw. `white`
(p-pricing: 12x white, 1x `primary-900`; p-about-us: 4x white, 1x `primary-900`).
Die Textfarben folgen der Hintergrundfarbe automatisch, in `js-0ewtsnro4ze7n.js`:
`case"miles900":i="var(--color-primary-900)",n="#ffffff",a="var(--color-primary-300)"` für
Hintergrund/Headline/Body. Wirkung: Redakteure setzen im CMS nur `background.color = "miles900"`,
das Design bleibt konsistent.

**Muster 4: Primärbutton schwarz, Blau ausschließlich als Aktions-/Linkfarbe.**
Beleg: Primärbutton
`bg-black text-white font-medium px-6 py-4 lg:px-12 rounded-md hover:bg-primary-700 active:bg-primary-700 active:scale-90 disabled:bg-[#CDD5E0] disabled:text-primary-700 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0059B3] focus-visible:border-white transition-all duration-300`.
Blau nur bei Text-Buttons (`text-[#0059B3] hover:text-[#0A84FF]`) und Blue-Buttons
(`bg-[#0059B3] text-white ... hover:bg-[#0A84FF]`). Wirkung: hohe Klickpriorität für den
schwarzen CTA, Blau bleibt für Sekundäres reserviert, dadurch klare visuelle Hierarchie.

**Muster 5: Trust im Mittelteil statt im Hero, mit Zahlen in der Headline.**
Beleg: Startseiten-Hero hat kein Trust-Element. Trust erscheint erst in Sektion 4 als Zahl
("Über 18.000 Fahrzeuge zur Auswahl") und in Sektion 5 als Text
("Mit Europas größter Flotte auf Knopfdruck"). Auf der Produktseite gebündelt in drei Karten
("1 Mio. Nutzer:innen", "Top bewertete App" mit Bild "MILES Symbol, darunter 4,5 ausgefüllte
Sterne", "Umfangreiche Flotte" mit "18.000 Fahrzeugen"). Auf Über uns als reiner Zahlen-Block:
"18.000+ Fahrzeuge", "800+ Teammitglieder", "14 Städte".

### 3. Animation-Rezepte

**Rezept 1: Sticky-Nav, die beim Runterscrollen verschwindet und beim Hochscrollen zurückkommt.**
Reine Vanilla-Logik mit `requestAnimationFrame`, exakt aus `js-23mfmhok-08fp.js`:

```js
useEffect(() => {
  let pending = false;
  const compute = () => {
    const y = window.scrollY;
    if (Math.abs(y - lastY) < 5) { pending = false; return; }  // 5px Totzone
    if (y > 100) setVisible(y < lastY); else setVisible(true);  // über 100px: nur beim Hochscrollen
    setLastY(y);
    pending = false;
  };
  const onScroll = () => { if (!pending) { requestAnimationFrame(compute); pending = true; } };
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, [lastY]);
```

CSS am `<nav>`:
`fixed top-0 left-0 right-0 z-50 bg-black px-5 py-4 flex justify-between items-center nav:top-8 nav:left-9 nav:right-9 nav:rounded-2xl nav:px-6 nav:py-4 transition-all duration-400 text-white`
plus im versteckten Zustand `-translate-y-full opacity-0`. Dauer 400ms, Easing Tailwind-Default
`cubic-bezier(.4, 0, .2, 1)`. Breakpoint `nav:` = 71.5625rem (1145px).

**Rezept 2: Sticky-Stack-Karten (Stapel-Effekt mit progressiver Skalierung).**
Exakt aus `js-0s93rz4dntojv.js`, Framer Motion:

```jsx
// scale = interpolate(scrollProgress, [0.25 * index, 1], [1, 1 - (total - index) * 0.05])
const scale = useTransform(progress, [0.25 * index, 1], [1, 1 - (totalItems - index) * 0.05]);

<div className="min-h-screen md:min-h-[60vh] flex items-center justify-center sticky top-0 py-20">
  <motion.div
    style={{
      backgroundColor, scale,
      top: `calc(-5vh + ${25 * index}px)`,
      transformOrigin: "top center",
    }}
    className="relative rounded-xl lg:rounded-2xl w-full max-w-full mx-auto"
  >
    {/* Inhalt: grid gap-8 grid-cols-1 lg:grid-cols-12 items-center py-8 px-4 lg:p-10 */}
  </motion.div>
</div>
```

Bei 6 Karten skaliert Karte 0 (index 0) im Verlauf von Progress 0 bis 1 von 1.0 auf 0.75,
Karte 1 (index 1) ab Progress 0.25 auf 0.80, und so weiter. Abweichung: `25 * index` Pixel
Versatz pro Karte, `-5vh` Grundversatz.

**Rezept 3: FAQ-Akkordeon mit Höhenanimation.**
Exakt aus `js-0s93rz4dntojv.js`:

```jsx
const O = { duration: .3, ease: "easeInOut" };

<AnimatePresence>
  {isExpanded && content.length > 0 && (
    <motion.div
      id={`content-${key}`}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={O}
      className="overflow-hidden"
    >
      <div className="px-4 pb-3 lg:px-10 lg:pb-6 pt-0">{content}</div>
    </motion.div>
  )}
</AnimatePresence>
```

Container: `rounded-lg lg:rounded-2xl overflow-hidden transition-colors` mit
`backgroundColor: var(--color-primary-100)` (bzw. `#ffffff` bei `miles100`/`miles200`-Sektion).
Button: `flex justify-between items-center gap-6 w-full pl-4 pr-5 py-4 lg:py-6 lg:px-10
cursor-pointer transition-all duration-200`, Chevron `transition-transform duration-200`.
Antworttext: `text-primary-800 text-[1.0625rem] lg:text-lg`.

**Rezept 4: Sticky-Bottom-Promotion-Banner mit Spring-Einblendung.**

```jsx
<motion.div
  className="fixed bottom-0 left-0 right-0 z-50 lg:left-14 lg:right-14 lg:bottom-7"
  initial={{ y: "150%" }}
  animate={{ y: 0 }}
  exit={{ y: "100%", transition: { type: "tween", duration: .3, ease: "easeIn" } }}
  transition={{ type: "spring", stiffness: 300, damping: 30, delay: 1 }}
>
  <div className="relative flex items-center gap-6 overflow-hidden rounded-t-xl lg:rounded-2xl
                  shadow-lg px-4 pb-8 pt-12 lg:px-10 lg:py-4">
```

Dismiss: `localStorage.setItem("promotionBanner-" + id + "-dismissed", "true")`.
Datum-Gate im Client: `start = new Date(startDate + "T00:00:00")`,
`end = new Date(endDate + "T23:59:59")`, Anzeige nur wenn `today >= start && today <= end`.

**Rezept 5: Umschalt-Indikator mit Shared-Layout (Framer Motion `layoutId`).**

```jsx
// Fahrzeug-Auswahl
{selected && (
  <motion.span
    aria-hidden
    layoutId="vehicle-selection"
    className="absolute -inset-px z-0 rounded-lg border-2 border-black"
    transition={{ type: "spring", stiffness: 500, damping: 40 }}
  />
)}
// Chip selbst
<motion.button whileTap={{ scale: .96 }}
  className="relative isolate flex flex-1 cursor-pointer flex-col items-center gap-1
             rounded-lg border border-primary-300 px-2.5 py-3 transition-colors duration-150" />

// Distanz-Tab
{selected && (
  <motion.span layoutId="distance-tab-pill"
    className="absolute inset-0 z-0 rounded-md bg-white shadow-sm"
    transition={{ type: "spring", stiffness: 500, damping: 40 }} />
)}
```

Reduced-Motion-Sonderfall im Code: `whileTap: prefersReducedMotion ? undefined : { scale: .96 }`
und `transition: prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 40 }`.
Das ist die einzige belegte Reduced-Motion-Behandlung für Framer Motion auf der Site.

**Rezept 6: Mobile-Menü mit gestaffelten Einträgen.**
Alle Werte exakt aus `js-23mfmhok-08fp.js` (siehe Abschnitt Animationen). Kurzfassung als
Tailwind-/Framer-Muster:

```jsx
<AnimatePresence>
  {isOpen && <>
    <motion.div className="nav:hidden fixed inset-0 bg-black z-40"
      initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      transition={{duration:.3, delay:0}} />
    <motion.div className="nav:hidden bg-primary-900 z-50 rounded-t-3xl w-full h-full mt-16 p-8
                          text-white fixed bottom-0 left-0 right-0"
      initial={{y:"100%", top:"100%"}} animate={{y:0, top:0}} exit={{y:"100%", top:"100%"}}
      transition={{type:"keyframes", stiffness:300, damping:30, duration:.4}}>
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
        transition={{delay:.3, duration:.4}}>
        {items.map((item, i) => (
          <motion.div key={item._key} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}}
            transition={{delay: .2 + .1*i, duration: .3}} />
        ))}
      </motion.div>
    </motion.div>
  </>}
</AnimatePresence>
```

**Nicht belegbar:** Für die Utility-Klasse `animate-[fadeInUp_0.4s_ease-out]` (66 Instanzen,
7 Seiten) existiert im ausgelieferten CSS keine `@keyframes fadeInUp`-Definition. Der
Animationsablauf dieser Klasse kann aus dem Abruf nicht rekonstruiert werden.

### 4. Anti-Patterns und Schwächen

1. **Startseite mit nur 330 Wörtern Text.** Für die wichtigste Seite einer Site, die organischen
   Traffic über 26 Städteseiten einfängt, ist das dünn. Die Startseite trägt fast nur Kachel-Labels.
2. **Meta-Daten der Startseite auf der Carsharing-Seite dupliziert.**
   `/de/car-sharing` hat exakt `<title>` und Meta-Description der Startseite
   ("Home – Carsharing, Mietwagen &amp; Transporter \| MILES Mobility"). Zwei URLs mit identischem
   Titel und identischer Description konkurrieren im Index.
3. **Organization-Schema doppelt ausgeliefert.** Auf der Startseite stehen zwei bytegleiche
   `Organization`-Blöcke hintereinander im DOM. Redundanz ohne Nutzen.
4. **`how-it-works` ohne jedes strukturierte Datum.** `/de/car-sharing/how-it-works` hat keine
   `ld+json`-Blöcke, obwohl es eine Prozess-Seite mit 4 erklärten Schritten ist.
5. **Keine Reduced-Motion-Behandlung für die großen Animationen.** Reduced Motion ist nur für
   den Skeleton-Shimmer gesetzt. Sticky-Stack, Mobile-Menü, Bottom-Banner und Preisrechner-Zähler
   ignorieren die Nutzereinstellung. Der `whileTap`-Guard im Code zeigt, dass das Problem bekannt ist,
   aber nur punktuell gelöst wurde.
6. **Floating Labels mit Pflicht-Zusatz im Labeltext.** Alle Pflichtfelder tragen "(erforderlich)"
   im Label selbst ("Firmenname (erforderlich)", "Stadt (erforderlich)", "Erzähle uns kurz, worum
   es geht (erforderlich)"). Bei 6 Pflichtfeldern von 9 sichtbaren entsteht redundanter Lärm,
   und der Text bricht in schmalen Feldern um.
7. **Lead-Formular mit 9 sichtbaren Feldern in einem Schritt, ohne Fortschrittsanzeige.** Für
   einen B2B-Funnel mit hartem Fokus ("Sende uns eine unverbindliche Anfrage") sind zwei
   Select-Listboxen und ein Textarea zwischen dem Nutzer und dem Absenden.
8. **Mobile-Menü animiert mit `type:"keyframes"` plus `stiffness`/`damping`.** Die Kombination
   ist widersprüchlich: `stiffness` und `damping` sind Spring-Parameter, werden bei
   `type: "keyframes"` aber ignoriert. Der Effekt ist reines 0.4s-Keyframe-Tweening.
9. **Browser-Scroll-Duplikate über `window.location.search` im Button-Handler.** In
   `js-0ewtsnro4ze7n.js` liest der Button `new URLSearchParams(window.location.search)` beim
   Rendern, um UTM-Parameter an Links zu hängen. Bei statisch gerenderten Seiten ist das ein
   Layout-Bezug auf Client-State.
10. **Pressemitteilungen liegen als Google-Drive-Ordner.** Der CTA "Alle Pressemitteilungen
    anzeigen" führt auf `drive.google.com/drive/folders/1b2nUA0cKxTIM5uBdWULVN0essMAvX_dD`,
    nicht auf eine eigene Übersichtsseite. Kontrolle, Indexierbarkeit und Tracking gehen verloren.
11. **Fußnote mit offenem ToDo im Live-Text.** In `/de/press/carsharing-studie` steht wörtlich
    "( 2 ) [ToDo: Quellen ergänzen: EVA-CS, WiMobil, Öko-Insitut, ggf. Hamburg, Shaheen]" im
    ausgelieferten HTML.
12. **Inkonsistente Anrede im Artikeltext.** Der Pressetext nutzt "Die vollständige Studie finden
    Sie hier" (Sie), während die gesamte restliche Site duzt.
13. **Fehlender H4-Level.** Über 17 Seiten hinweg 0 H4-Elemente, obwohl die Preisseite 36 H3 und
    nur 5 H2 hat. Die Gliederung ist damit flach und schwer scanbar.
14. **Kein Trust-Signal im Hero, obwohl starke Zahlen existieren.** 1 Mio. Nutzer, 4,5 Sterne,
    18.000 Fahrzeuge und 14 Städte liegen alle erst im Seitenmittelteil oder auf Unterseiten.

### 5. Conversion-Mechanik in 5 Sätzen

1. Die Site führt nicht über ein Formular, sondern über die App: jeder Haupt-CTA ist ein
   Adjust-Deeplink (`app.adjust.com/1e3cbrpj?campaign=generic_home` für den Hero,
   `app.adjust.com/1br6crta` für den App-Download-Block), der je nach Gerät in den richtigen
   App-Store oder in die installierte App leitet, und die Attribution läuft über Adjust, nicht
   über die Website.
2. Der Preis wird als Einstiegsanker in die Headlines selbst gesetzt ("Übernimm das Steuer
   ab 0,79€/km", "1 Tag nur 24,99€", "ab 39,99€"), nicht in eine Preistabelle versteckt, und
   die Preisseite wiederholt jeden Tarif als eigene Kachel statt als Fließtext.
3. Der Vertrauensaufbau läuft in drei Stufen von unten nach oben: strukturelle Zahlen
   (18.000 Fahrzeuge, 14 Städte, 1 Mio. Nutzer), All-inclusive-Versprechen
   (Versicherung, Tanken, Laden, Parken) und soziale Beweise bei den Zielgruppen mit Kaufhürde
   (4,5-Sterne-App-Bild, B2B-Kundenstimmen von Butterstulle, SpreeQuell, BEAT81, Frühstück 3000).
4. Jede Produktseite enthält genau ein FAQ-Akkordeon mit 4 bis 11 realen Einwänden
   (Abrechnung, Parken, Registrierungsvoraussetzungen, Panne, Kündigung), das als
   `FAQPage`-Schema ausgeliefert wird und damit direkt in Suchergebnisse ausstrahlt.
5. Der einzige echte Lead-Funnel ist B2B: `/de/business/car-sharing` sammelt über 12 Felder
   in einem Schritt Firmenname, Stadt, Größe, Kontakt und Anliegen in Pipedrive, mit
   unverbindlicher Anfrage als Microcopy und dem Antwortversprechen
   "Sende uns eine unverbindliche Anfrage, und wir finden die perfekte Lösung für dein Unternehmen.";
   B2C konvertiert ausschließlich über den App-Download.

## Abrufprotokoll

Alle Abrufe mit `curl -sL -m 30 -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36
(KHTML, like Gecko) Chrome/128 Safari/537.36"` am 2026-09-16, Arbeitsverzeichnis `/tmp/site-miles/`.

| # | URL | HTTP | Bytes |
|---|---|---|---|
| 1 | `https://www.miles-mobility.com/de` | 200 | 312230 |
| 2 | `https://www.miles-mobility.com/robots.txt` | 200 | 251 |
| 3 | `https://www.miles-mobility.com/sitemap.xml` | 200 | 30525 |
| 4 | `https://www.miles-mobility.com/de/car-sharing` | 200 | 530231 |
| 5 | `https://www.miles-mobility.com/de/car-rental` | 200 | 494297 |
| 6 | `https://www.miles-mobility.com/de/pricing` | 200 | 421574 |
| 7 | `https://www.miles-mobility.com/de/pass` | 200 | 267776 |
| 8 | `https://www.miles-mobility.com/de/cities` | 200 | 208139 |
| 9 | `https://www.miles-mobility.com/de/car-sharing/how-it-works` | 200 | 252560 |
| 10 | `https://www.miles-mobility.com/de/car-sharing/fleet` | 200 | 477132 |
| 11 | `https://www.miles-mobility.com/de/about-us` | 200 | 346788 |
| 12 | `https://www.miles-mobility.com/de/help` | 200 | 182069 |
| 13 | `https://www.miles-mobility.com/de/jobs` | 200 | 303881 |
| 14 | `https://www.miles-mobility.com/de/business/car-sharing` | 200 | 527649 |
| 15 | `https://www.miles-mobility.com/de/press` | 200 | 247307 |
| 16 | `https://www.miles-mobility.com/de/press/carsharing-studie` | 200 | 157692 |
| 17 | `https://www.miles-mobility.com/de/car-sharing/berlin` | 200 | 378411 |
| 18 | `https://www.miles-mobility.com/de/pass/purchase-gold` | 200 | 239763 |
| 19 | `https://www.miles-mobility.com/de/sustainability` | 200 | 251597 |
| 20 | `https://www.miles-mobility.com/_next/static/immutable/chunks/0_jn2v_n41ags.css` | 200 | 75402 |
| 21 | `https://www.miles-mobility.com/_next/static/immutable/chunks/3u1j_yntihg0k.css` | 200 | 6380 |
| 22 | `https://www.miles-mobility.com/_next/static/immutable/chunks/2arn_1kg-ezdx.css` | 200 | 13419 |
| 23 | `.../chunks/1nes5mp3s07qu.js` | 200 | 492256 |
| 24 | `.../chunks/00cbwvqtmwgla.js` | 200 | 155744 |
| 25 | `.../chunks/0fdh9odn3vihc.js` | 200 | 228543 |
| 26 | `.../chunks/0q-vri0-c7rpv.js` | 200 | 79228 |
| 27 | `.../chunks/0c0hxoamwjsbw.js` | 200 | 112594 |
| 28 | `.../chunks/2zqsbm8s85161.js` | 200 | 13894 |
| 29 | `.../chunks/0i3qf0zh14s38.js` | 200 | 32024 |
| 30 | `.../chunks/0ewtsnro4ze7n.js` | 200 | 789869 |
| 31 | `.../chunks/3fn6rt328aj2f.js` | 200 | 18965 |
| 32 | `.../chunks/1pe7zkmlkfb2l.js` | 200 | 1639 |
| 33 | `.../chunks/0s93rz4dntojv.js` | 200 | 389248 |
| 34 | `.../chunks/23mfmhok-08fp.js` | 200 | 41625 |
| 35 | `.../chunks/0o8uyth6u5h35.js` | 200 | 1024 |
| 36 | `.../chunks/1fi26psq805yk.js` | 200 | 54109 |
| 37 | `.../chunks/0p0oeuw-_klwf.js` | 200 | 26819 |
| (Wiederholung) | `https://www.miles-mobility.com/de/help` (zweiter Abruf, Dublette) | 200 | 182069 |

Abrufprobleme: keine. Alle 37 Anfragen lieferten HTTP 200. Keine Seite war nur eingeschränkt
abrufbar. Nicht abrufbar beziehungsweise nicht Teil dieses Auftrags: externe Subdomains
(`abo.miles-mobility.com`, `support.miles-mobility.com`, `business.app.miles-mobility.com`,
`api.app.miles-mobility.com`, `forms.miles-mobility.com`), Asset-Dateien unter `/fonts/` und die
Sanity-API. Das Verhalten nach Client-Hydration (Preisrechner-Ausgabe, Karussell-Drag,
Akkordeon-Öffnen, Formular-Absenden) ist aus dem Server-HTML und den JS-Bundles rekonstruiert,
nicht im Browser beobachtet.
