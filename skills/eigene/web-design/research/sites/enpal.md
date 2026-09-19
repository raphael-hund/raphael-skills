# www.enpal.de

Analyse vom 2026-09-16. Basis: 16 Seiten der Domain, 4 CSS-Dateien (846.620 Bytes),
4 JS-Assets des Funnels (1.896.896 Bytes). Alle Belege aus `/tmp/site-enpal/`.
Zitate wörtlich. Da `home.css` und `shared.css` einzeilig minifiziert sind, wird
statt Zeilennummer der Selektor plus Regel zitiert.

## Steckbrief

| Feld | Wert |
|---|---|
| Domain | https://www.enpal.de |
| Branche | Greentech / Endkunden-Energie: Photovoltaik, Stromspeicher, Wallbox, Wärmepumpe, Energiemanager, Stromtarif, Finanzierung |
| Geschäftsmodell | Komplettanbieter mit eigenem Handwerkernetz, 0 € Anzahlung, EasyFlex-Finanzierung, Versicherung, Service. Angebot nur über Beratung, kein Online-Checkout |
| Seitentyp | Marketing-Corporate-Site mit Lead-Funnel, großem SEO-Ratgeber und 1024 regionalen Landingpages |
| Stack | Webflow (`data-wf-site="5e870ec047674e044920655e"`, `data-wf-page`, `w-mod-js`-Inline-Script, `enpal.*.js`-Bundles), jQuery 3.5.1, Splide 4.1.4, Alpine.js 3.x (CDN), hls.js 1.6.11 (CDN), Finsweet-Attribute (`fs-cmscombine-element`, `fs-scrolldisable-element`, `fs-toc-element`), Lottie 5.12.0 + PureCounterJS (nur Über-uns, lazy nachgeladen) |
| Funnel-Engine | Eigene React-App, extern gehostet: `https://solar-slider.cust.enpal.io/` (`enpal-components.min.js` lädt `index.html` und `static/index-BHCKJ_T4.js`, 1.887.350 Bytes) |
| Consent | Eigenes Skript `enpal-cookies-v3.min.js` (`@enpal/lastupdated`, `prefix: tracking_`) |
| Analytics / A-B | Google Tag Manager `GTM-MV7CD8D`, Kameleoon (`wr7gl1r66u.kameleoon.eu/engine.js`, `kameleoonLoadingTimeout = 750`), eigener AB-Kanal `window.SLIDER_AB_TESTS.push({ key: '260515Legal_A', feature: 'LegalOptinTop' })` |
| Video | Bunny CDN, HLS-Playlists (`data-player-src="https://vz-e8487767-4b4.b-cdn.net/.../playlist.m3u8"`), eigener `bunny-player`-Custom-Player mit HLS.js |
| Sprache | Inhalte Deutsch, `<html lang="de-DE">` |
| Anrede | Durchgehend Sie. Stichprobe Startseite: 21 Treffer `Sie`, 0 Treffer `Du` |
| Anzahl Seiten in Sitemap | 2264 URLs in einer einzigen `sitemap.xml`, alle mit `lastmod` |
| hreflang | 0 Vorkommen auf allen 16 geprüften Seiten. Sprachwechsel nur im Footer zu `enpal.com` (English) und `enpal.com/it` (Italiano) |
| Canonical | Selbstreferenziell auf allen 16 geprüften Seiten |
| robots.txt | 124 Bytes: `User-agent: *`, `Disallow: /test/`, `Disallow: /alpha/`, `Disallow: /datenschutz-bewerber/`, `Sitemap: https://www.enpal.de/sitemap.xml` |

### Sitemap-Zusammensetzung (2264 URLs)

| Segment | Anzahl | Inhalt |
|---|---|---|
| `/region/` | 1024 | Regionale Landingpages, Muster `/region/<id>` und `/region/<id>-<hash>`, z. B. `/region/100`, `/region/1-f273e` |
| `/faq/` | 319 | Einzel-FAQ-Seiten mit eigener URL |
| `/photovoltaik/` | 274 | PV-Ratgeber und Glossar (Kosten, Förderung, Amortisation, Einspeisevergütung, Brandschutz, Denkmalschutz usw.) |
| `/waermepumpe/` | 228 | Wärmepumpen-Ratgeber und Glossar |
| `/energie-lexikon/` | 170 | Begriffslexikon |
| `/strom/` | 96 | Stromtarif, Smart Meter, § 14a EnWG, virtuelles Kraftwerk, Strompreisentwicklung, Stromkosten |
| `/wallbox/` | 44 | Wallbox-Ratgeber |
| `/elektroauto/` | 19 | E-Auto-Ratgeber |
| `/autoren/` | 13 | Autorenprofile (E-E-A-T) |
| `/erfahrungen/` | 13 | Kundenstimmen und Kundenstories |
| `/info/` | 12 | Datenschutz, Compliance, AGB-Kram |
| `/standorte/` | 11 | Standortübersicht plus 10 Städte |
| `/stromspeicher/` | 11 | Speicher-Ratgeber |
| Rest | 32 | Jeweils 1 URL: Startseite, `/produkt`, `/ueber-uns`, `/magazin`, `/faq`, `/kontakt`, `/auszeichnungen`, `/enpal-one`, `/easyflex`, `/notstrom`, `/app`, `/stromtarif`, `/verguetung`, `/qualitaetsstandard`, `/unser-service`, `/newsletter`, `/podcast`, `/waermepumpe-rechner`, `/informieren-c1`, `/informieren-solar-waermepumpe`, `/weiterempfehlen`, `/partner-werden`, `/vertriebspartner-werden`, `/vertriebspartner-formular`, `/aussendienst-bbg-weiterempfehlen`, `/posteinwurf`, `/pv-steuerhilfe`, `/hilfe`, `/digitale-energiewende`, `/stromtarif-und-verguetung`, `/stromkennzeichnung`, `/gesetzliche-pflichtangaben` |

### Hauptnavigation (Webflow-Dropdowns mit Tab-Panes)

| Ebene 1 | Inhalt |
|---|---|
| Produkte | Komplettpaket, Photovoltaikanlage, Stromspeicher, Wärmepumpe, Wallbox, Notstrom, Enpal.One+, Stromtarif, EasyFlex Finanzierung, Enpal App |
| Service | Häufig gestellte Fragen, Kundenportal (`mein.enpal.de`, `utm_source=navbar_portal`), Kontakt, Service im Überblick |
| Brand-Tab-Menü | Photovoltaik (5 Links), Wärmepumpe (5), Enpal.One / Strom (5), Magazin (1) |
| Über Enpal | Enpal Erfahrungen, Enpal empfehlen, Jobs (`jobs.enpal.com`, eigenes Webflow-Projekt), Presse (`corporate.enpal.com`), Qualitätsstandard, Standorte, Mission & Team |
| Rechts | `Ersparnis berechnen` (`/informieren-c1`, 5 Vorkommen im Nav-HTML) |

Das Nav nutzt zwei Navigationssysteme parallel: altes `nav-bar` mit `nav-bar_dd`-Dropdowns und
neues `navbar-2` mit `w-tabs` (`class="navbar-2_tabs-wrapper w-tabs"`, 28 `navbar-2_tabs-link`,
26 `tab_link-outer w-inline-block w-tab-link` auf der Startseite). Jeder Tab hat
`<div data-url="/photovoltaik" class="navbar-2_tabs-link">`, Navigation per Klick wird
in JavaScript umgeleitet. Der Nav enthält **keine Telefonnummer** (0 Treffer `tel:`
im gesamten Header-Bereich der Startseite).

### Footer (5 Spalten + Siegelzeile + Rechtliches)

| Spalte | Überschrift | Einträge |
|---|---|---|
| 1 | Auszeichnungen | 6 Siegelbilder (TÜV Saarland, Efahrer, Welt Service-Champion, home&smart, Smart Home Award 2023, Life & Living Award 2025) plus `Mehr erfahren` -> `/auszeichnungen` |
| 2 | Produkte | Photovoltaikanlage, Wärmepumpe, Stromspeicher, Wallbox, Enpal.One, Enpal Solarmodul, Enpal Stromtarif, Enpal App, Enpal Notstrom, Enpal Finanzierung, Für Gewerbekunden, Alle Produkte |
| 3 | Informationen | Magazin, Podcast, Energie-Lexikon, Newsletter, Solarrechner, Wärmepumpenrechner, Stromkennzeichnung, Gesetzliche Pflichtangaben |
| 4 | Für Kunden | Freunde empfehlen (Badge `300€`), Kundenerfahrungen, Häufig gestellte Fragen, Enpal Kundenportal |
| 5 | Über Enpal | Presse, Enpal Jobs, 30+ Handwerkspartner werden, Marketing- und Vertriebspartner werden, Nachhaltigkeit, Enpal.pro, Enpal Corporate |

Insgesamt 32 `e_footer_link`, 6 `footer_social-link` (LinkedIn, Instagram, Facebook,
Youtube, X/Twitter, Wikipedia), 6 `is-award-footer`-Siegel.
Rechtszeile: Impressum, Datenschutz, Compliance, Cookie-Einstellungen (`href="#cookies"`),
Sprachdropdown mit English und Italiano. Keine Ortsliste im Footer.

## Sitemap

Rekonstruiert aus `sitemap.xml` (2264 URLs), Hauptnavigation und Footer.

| Pfad | Typ | In Sitemap | In Nav | In Footer |
|---|---|---|---|---|
| `/` | Startseite, 10 Sections | ja | Logo | nein |
| `/photovoltaik` | Leistungs-/Ratgeber-Hybridseite, 14 Sections, 13 H2, 58 H3 | ja | ja | ja |
| `/waermepumpe` | Leistungs-/Ratgeber-Hybridseite, 13 Sections, 13 H2, 54 H3 | ja | ja | ja |
| `/produkt` | Komplettpaket-Übersicht, 10 Sections, 10 H2 | ja | ja | ja |
| `/ueber-uns` | Über uns, 7 Sections, Timeline mit 58 Bildern | ja | ja | nein |
| `/erfahrungen` | Referenzen, 10 Sections, 6 Bunny-Videos, 68 Orts-Tags | ja | ja | ja |
| `/standorte` | Standorte, 8 Sections plus 10 Stadt-Unterseiten | ja | ja | nein |
| `/auszeichnungen` | Award-Wand, 51 H2 (ein H2 pro Auszeichnung) | ja | nein | indirekt |
| `/faq` | FAQ-Übersicht mit Filter, 327 `coll-faq-iitem`, 318 Kartenlinks | ja | nein | ja |
| `/unser-service` | Service-Übersicht, 4 Sections, 6 Service-Karten | ja | ja | nein |
| `/kontakt` | Kontakt, 3 Bereiche, Telefon und E-Mail je Anliegen | ja | ja | nein |
| `/magazin` | Ratgeber-Übersicht, 1 Section mit 6 Themenkarten | ja | ja | ja |
| `/photovoltaik/amortisation` | Einzelartikel, 8 H2, ca. 1401 Wörter | ja | nein | nein |
| `/informieren-c1` | Funnel-Einstieg, React-Slider, 0 `<form>` im HTML | ja | ja | nein |
| `/region/100` | Regionale Landingpage, 2 Sections | ja | nein | nein |
| `/energie-lexikon` | Lexikon-Index mit 100 Links | ja | nein | ja |

Nicht abrufbar / nicht vorhanden: Keine. Alle 16 geprüften URLs lieferten HTTP 200.
Kein `hreflang`, kein `<meta name="robots">` auf allen 16 Seiten, kein
`sitemapindex` (eine flache Datei mit 2264 `<url>`-Blöcken).

## Seiten

### 1. Startseite, https://www.enpal.de/

| Feld | Wert |
|---|---|
| Title | `Solaranlage kaufen: Das Angebot vom Marktführer | Enpal` |
| Meta-Description | `Solaranlage mit Speicher & Wallbox | TÜV-geprüfte Zufriedenheit | 0 % MwSt | Komplettpaket inkl. Montage | Wärmepumpe mit bis zu 80 % Förderung` |
| H1 | `Solaranlage & Wärmepumpe` |
| H2 / H3 | 9 H2, 3 H3, 0 H4 bis H6 |
| Schema.org | nur `Organization` mit `PostalAddress` (Adresse Bödikerstraße 25, 10245 Berlin, `foundingDate: 2017`, `telephone: +49 3030808052`), 13 `sameAs`-Profile |
| Canonical | `https://www.enpal.de` |
| hreflang | keiner |

Sektionsliste in DOM-Reihenfolge (10 `<section>` plus `<header class="hero cc-home">`):

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 0 | Nav, Sticky | keine | keine | volle Breite, 5 Dropdowns | Logo-SVG, 6 Siegel-Icons in Dropdown-Tabs | `Ersparnis berechnen` (5x), `Login` | keine im Nav | `position:fixed`, `min-height:6rem`, `z-index:999`, `cc-scrolled` ab 9 % Scrolltiefe |
| 1 | Hero | `Solaranlage & Wärmepumpe` | 4 rotierende Zeilen: `für 0 € Anzahlung.` / `in über 140.000 deutschen Haushalten.` / `mit persönlicher Beratung.` / `vom Testsieger.` | Full-bleed, 2-Spalten Inhalt plus Hintergrundbild | 3 Bilder (1920px WebP Desktop, 780px WebP Mobil), kein Video im Hero | `Jetzt Ersparnis berechnen` (1x) | Efahrer-Siegel als `hero-badge` unten links, 3 USP-Zeilen mit Häkchen-Icon | `min-height:100svh`, `padding-top:4.25rem`, `padding-bottom:8.75rem` aus `.layout-l.cc-hero-new` |
| 2 | Breakout Video-Karten | `Der kluge Kopf der alles steuert` / `Nie wieder hohe Stromkosten` / `Tschüss Öl und Gas!` | Eyebrow-Texte: `Energiemanager Enpal.One`, `Solaranlage vom Marktführer¹`, `Wärmepumpe vom Testsieger`; Fließtext 1 Satz bei Karte 2 und 3 | 2-Spalten 50/50, Karten mit `aspect-ratio:16/9` und `border-radius:1rem`, Karte 1 und 3 linksbündig, Karte 2 versetzt | 3 stumme Autoplay-Videos (MP4, `IntersectionObserver`, `threshold: 0.01`), Poster-WebP | `Mehr erfahren`, `Ersparnis berechnen`, `Verfügbarkeit prüfen` | keines | Video startet erst im Viewport, `loading`: `source.dataset.src` wird bei Sichtbarkeit gesetzt |
| 3 | Logo/Presse-Marquee | `Enpal ist bekannt aus Presse & TV` | keine | Marquee, 2 Kopien der Liste | 7 Presse-Logos, dupliziert auf 14 `<img>`: Zeit Online, Süddeutsche Zeitung, Der Tagesspiegel, Handelsblatt, Gründerszene, ntv, Focus | keiner | Presse-Logos als Trust | `animation: marquee-horizontal 40s linear infinite`, Gegenrichtung 25s, Rand-Fade per `radial-gradient(circle,#f8f8f800,#f8f8f8)` |
| 4 | Benefits-Bento | `Energie endlich günstig` / `Vom Marktführer in Deutschland¹` | 3 Karten: `Regional & persönlich`, `5-in-1 Komplettpaket`, `In 6 Wochen fertig` mit je 1 Satz | 3er-Grid aus `advantages-card` mit Bild plus Icon plus H3 plus Absatz | 3 Bilder | keiner | keine | `layout-m` (max-width 68.75rem) |
| 5 | Referenzen-Slider | `Alles richtig gemacht!` / `Enpal Erfolgsgeschichten` | 68 Kundenkarten mit Orts-Tag | Splide Carousel, `type: "loop"`, `perPage: 3`, `gap: '1.5rem'`, `speed: 800`, `focus: "center"`, Breakpoints 991/767/479 auf 2/1/1 | 68 Kundenfotos (800px JPG), `loading="lazy"` | keiner | 68 Ortsangaben als Trust-Struktur | Nicht-aktive Slides `opacity: .5`, aktive `opacity: 1`; `overflow: visible` am Track |
| 6 | USP-Liste plus Inline-Funnel | `Ihr Haus, Ihr Komplettpaket` / `Jetzt Ersparnis berechnen` | 3 Häkchenpunkte: `Über 140.000 zufriedene Kunden`, `100% Rundum-Sorglos-Paket`, `Keine Mehrwertsteuer` | 2-Spalten 40/60, links Text rechts eingebetteter Slider | 1 SVG-Pfeil-Icon | eingebetteter React-Slider mit eigenem Funnel-CTA | `Über 140.000 zufriedene Kunden` | `id="solarcheck-neu"`, `class="funnel-wrap cc-complete-pack"`, zweiter Slider-Mount auf derselben Seite |
| 7 | Awards-Marquee | `Ergebnisse statt Versprechen` / `Getestet. Zertifiziert. Empfohlen.` | 14 Auszeichnungs-Karten mit Jahr und Bewertung | Marquee, 2 Kopien, 30 `preise_logo`-Bilder | 30 Siegelbilder (SVG/PNG, `loading="eager"`) | `Alle Auszeichnungen` | Chip Testsieger 2025 `Gesamtbewertung "gut"`, Solar-Marktführer 2024, TÜV `“Gut”`, Wärmepumpen-Marktführer 2024, VDE-Zertifizierung, Nr. 1 Service-Champion, home&smart Testsieger, Marktführer 2022 B2C, Efahrer Testsieger 1. Platz, Life & Living Award 2024 & 2025, KfW Award Gründen 2022 Landessieg, CDR Award 2021 2. Platz | `animation: marquee-horizontal 60s linear infinite`, Gegenrichtung 40s, `background-color: var(--white-smoke)` |
| 8 | Trustpilot-Widget | `Was sagt die Enpal Community?` / `Aktiv in über 140.000 deutschen Haushalten` | keine | 2-Spalten, links Deutschlandkarte, rechts Widget | 1 Kundenkarte (700px WebP), Trustpilot-TrustBox (`data-template-id="54ad5defc6454f065c28af8b"`, `data-businessunit-id="5f8fe3d117e2a10001c7b74c"`, `data-theme="light"`, `data-tags="SelectedReview"`, `data-font-family="Poppins"`, `data-text-color="#072543"`) | keiner | Trustpilot-Bewertungen, Deutschlandkarte mit Kundenstandorten | Trustpilot-Skript wird erst ab 20 % Viewport-Abstand nachgeladen (`viewportHeight * 0.2`) |
| 9 | FAQ-Akkordeon | `Sie haben Fragen?` / `Wir haben Lösungen.` | 3 Fragen plus Abschluss-CTA | 2-Spalten, links Headline, rechts Akkordeon | 0 Bilder | `Jetzt Gespräch vereinbaren!` (4. Akkordeonzeile) | keine | 4 `faq_question`-Zeilen, Icon rotiert `transition: transform .2s` |
| 10 | Zweiter Funnel-Mount | keine Headline im DOM | keine | 1 Spalte zentriert | 1 SVG-Pfeil | keiner (Slider lädt per JS) | keine | `id="solarcheck-2"`, `class="pv-slider-001"`, dritter Slider-Mount |
| 11 | Fußnote | keine | `¹ Deutschlands führender Solaranbieter für PV-Aufdachanlagen bei Privatkunden.` | Zentriert-schmal | keine | `Mehr Informationen hier` | keine | 414 Zeichen, `section_fu-noten`-Stil |

Hero-Formel Startseite: H1 ist ein Produktversprechen aus zwei Begriffen (`Solaranlage & Wärmepumpe`),
die eigentliche Nutzenaussage kommt aus 4 rotierenden Subline-Spans (`für 0 € Anzahlung.`,
`in über 140.000 deutschen Haushalten.`, `mit persönlicher Beratung.`, `vom Testsieger.`),
je 3 bis 6 Wörter. 1 CTA im Hero. Trust im Hero: 1 Efahrer-Siegel plus 3 Häkchen-USPs
(`0 € Anzahlung`, `Einfach Geld sparen`, `Endlich unabhängig`). Medientyp: Foto (3D-Haus-Render
`3d_Haus_2026_Enpalone3.webp`) als Full-bleed-Hintergrund, kein Video. Hero-Höhe:
`min-height:100svh` mit `padding-top:4.25rem` und `padding-bottom:8.75rem`.

CTA-Strategie Startseite: `Ersparnis berechnen` 9x (davon 7 außerhalb des sichtbaren
Haupttexts: 5 im Nav, 1 im Nav-Landscape-Wrapper, 1 in der Nav-CTA-Karte), `Ersparnis berechnen`
im Haupt-CTA des Heroes, `Ersparnis berechnen` in Video-Karte 2, `Jetzt Ersparnis berechnen`
im Hero-Button. Alle zeigen auf `/informieren-c1` oder `https://www.enpal.de/informieren-c1`
(9 Vorkommen des Hrefs). Neben-CTAs: `Mehr erfahren` 2x (`/enpal-one`),
`Verfügbarkeit prüfen` 1x (`/waermepumpe-rechner`), `Alle Auszeichnungen` 1x (`/auszeichnungen`).
Sticky-Header-CTA: ja, `cta-wrap cc-nav-landscape` und `navbar-2_cta-wrapper` mit
Microcopy `Kostenloser Solarrechner` / `Kostenlos in weniger als 2 Minuten!`.
Telefonnummer im Header: nein.

Trust-Staffelung Startseite: (1) Hero: Efahrer-Siegel und 3 USP-Häkchen.
(2) Direkt nach dem Hero: Presse-Logos. (3) Mittelfeld: 68 Kundenfotos mit Ortsnamen.
(4) Unteres Mittelfeld: 14 Auszeichnungen im Marquee. (5) Danach: Trustpilot-Widget und
Deutschlandkarte. (6) FAQ mit Service-Zusage. Kundenzahl `140.000` erscheint 5x
(Hero-Rotation, USP-Liste, Community-Headline, Efahrer-Siegel-Kontext).

Footer: 5 Spalten, siehe Steckbrief.

### 2. Leistungsseite /photovoltaik, https://www.enpal.de/photovoltaik

| Feld | Wert |
|---|---|
| Title | `Photovoltaikanlage: Tipps, Kosten & Angebot vom Marktführer` |
| Meta-Description | `Photovoltaik produziert günstigen Solarstrom | Bei Enpal finanzieren ab 98 € mtl. oder kaufen | Alle Infos zu Planung, Kosten & Montage | Mit Ertragsrechner` |
| H1 | `Enpal Photovoltaikanlage` |
| H2 / H3 / H4 | 13 / 58 / 42 |
| Schema.org | `BlogPosting`, `Person` (2x), `Organization`, `WebPage`, `BreadcrumbList` mit 2 `ListItem`, `FAQPage` mit 22 `Question` und 22 `Answer`, dazu `reviewedBy` als `Person` (Wolfgang Gründinger) |
| Canonical | `https://www.enpal.de/photovoltaik` |

Sektionsliste (14 `<section>` plus `<section class="hero">`):

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 0 | Nav | keine | keine | wie Startseite, Variante `base` statt `transparent` | Logo, Icons | `Ersparnis berechnen` | keine | Nav-Variante wechselt je Seitentyp: `data-wf--section-navbar-2--variant="transparent"` auf Startseite, `"base"` auf Unterseiten |
| 1 | Hero | `Enpal Photovoltaikanlage` | `Mit leistungsstarken 460 Wp PV-Modulen eigenen Strom produzieren und Stromkosten senken. Schon ab 98 € pro Monat.` (17 Wörter) | Full-bleed, 2-Spalten | 2 Bilder (2560px Desktop-JPG, 780px Mobil-WebP) | `Jetzt Ersparnis berechnen`, `Mehr erfahren` (Anker `#mehr-erfahren`), `Ersparnis berechnen` | TÜV-Siegel, 3 Header-Highlights: `Eigenen Strom produzieren`, `460 Wp Solarmodule`, `Ab 98 €/Monat` | `.cc-hero-pv` mit `height:100svh;max-height:70rem;padding-top:8.75rem;padding-bottom:9.75rem` |
| 2 | Inline-Funnel plus Skeleton | `Lohnt sich eine Photovoltaikanlage für Sie?` | keine | 1 Spalte, eingebetteter Slider | Skeleton-Loader mit Shimmer (4 Karten, `min-height:416px`) | keiner | keiner | `id="enpal-solar-slider-001"`, drei Slider-Mounts auf dieser Seite |
| 3 | Benefits-Bento | `Warum Photovoltaik mit Enpal?` | Unterzeile `Günstig & unabhängig` | 3er-/4er-Grid `cc-produkte-grid` | 1 Bild | keiner | keine | Punkte: `Deutschlands günstiger Stromtarif`, `Photovoltaikanlage kaufen, mieten oder finanzieren`, `Bis zu 85 % Unabhängigkeit vom Stromnetz`, `Höhere Erträge über Direktvermarktung` |
| 4 | Zigzag-Feature | `Leistungsstarke PV-Module` | `In Deutschland entwickelt` | 2-Spalten 50/50, Bild/Text wechselnd | 1 Bild | keiner | `460 Wp pro Modul`, Fraunhofer-Institut, Bifazial-Technologie | `cc-produkte-grid`, `is-left`-Klasse steuert Bildseite |
| 5 | Zigzag-Feature | `Leistung 30 Jahre garantiert` | `Mit Glas-Glas-Design` | 2-Spalten gegenläufig | 1 Bild | `Hier gibt's mehr Informationen zum Enpal Solarmodul` | 30 Jahre Leistungsgarantie | |
| 6 | Zigzag-Feature | `Transparente Lieferkette` | `Für höchste Qualität & Nachhaltigkeit` | 2-Spalten | 1 Bild | keiner | TÜV-zertifizierte Produktionsstätten, ISO-Normen | |
| 7 | Schluss-CTA-Block | `Die Energielösung von Enpal` / `Für jeden die perfekte Lösung` | 3 Sätze | 1 Spalte zentriert | 1 Bild | `Ersparnis berechnen` | keine | Textbaustein `cc-complete-solution` wiederholt sich auf 6 von 16 Seiten |
| 8 | 4er-Grid Vorteile | `Warum Enpal? Erleben Sie den Unterschied` | 4 Karten: EasyFlex-Finanzierung, Hochleistungsmodule, Über 140.000 Kunden, 6 Wochen | 4er-Grid | 4 Bilder | keiner | `Über 140.000 Kunden`, `In 6 Wochen installiert` | Größter Abschnitt der Seite (44.719 Zeichen) |
| 9 | Prozess-Steps | `So funktioniert's` / `3 Schritte zur eigenen Energielösung` | 3 Karten mit `1`, `2`, `3` | 3er-Grid `three-steps-card`, Karten `background-color:#f8f8f8;border-radius:.8rem;padding:1.3rem` | 1 Verbindungspfeil-SVG | `Jetzt Ersparnis berechnen` (Anker `#slider`) | `Jetzt Verfügbarkeit prüfen!` als grüner Inline-Link | Schritte: `In 1 Minute Sparpotenzial berechnen`, `Unverbindlich und kostenlos beraten lassen`, `Professionelle Installation Ihrer neuen Energielösung` |
| 10 | Awards-Marquee | `Ergebnisse statt Versprechen` | wie Startseite | Marquee | 30 Siegel | `Alle Auszeichnungen` | 14 Auszeichnungen | identischer Block auf 8 von 16 Seiten |
| 11 | FAQ-Akkordeon | `Sie haben Fragen? Wir haben Lösungen.` | 3 Fragen | 2-Spalten | keine | `Ersparnis berechnen` | keine | `Welche Solarmodule verbaut Enpal?`, `Wie viel kostet eine Enpal Solaranlage?`, `Wie lang ist die Lieferzeit bei Enpal?` |
| 12 | Ratgeber-Hub mit Tabs und Sticky-TOC | `Alles, was Sie zur Photovoltaikanlage wissen müssen` | Themenauswahl | Tabs (`w-tab-link`), Sticky-Sidebar rechts | 1 Bild | `Ersparnis berechnen` (mehrfach) | keine | 4 Tabs: `Funktion & Arten`, `Kosten & Förderung`, `Voraussetzungen & Planung`, `Installation & Betrieb`, `Geld verdienen mit Solar`. 38 `w-tab-pane`, 6 `rt-toc`-Blöcke, Fortschrittslinie `content_toc-progress-line` |
| 13 | Rechner | `Solar-Check für Deutschland 2026` | Datenanalyse | 1 Spalte plus Tabelle | 1 Bild | keiner | Marktstammdatenregister-Daten (1.043.947 Neuinstallationen 2024 vs. 876.888 aktuell) | |
| 14 | Grauer Monitor-Block | `Enpal Photovoltaik-Monitor` | 1 Absatz | `section cc-grey-background` | keiner | keiner | eigene Datenanalysen | |
| 15 | Studien-Sektion | `Solar-Check für Deutschland 2026` | Auswertung von mehr als 5 Mio. Einheiten aus dem Marktstammdatenregister | 1 Spalte | 1 Bild | keiner | eigene Datenbasis | 88.885 Zeichen |

Formulare: 5 `<form>`. Zwei Rechner, beide mit `data-turnstile-sitekey` (Cloudflare Turnstile):
`id="wf-form-Form"` (Ertragsrechner) mit 5 `<select>`: `nennleistung` (1 bis 16 kWp),
`bundesland` (16 Länder), `dachausrichtung`, `neigungswinkel`; Ergebnisblöcke
`Jahresertrag 10.000 kWh` und `Spezifischer Ertrag 1.000 kWh/kWh`. Drei Formulare
`id="heatpump-calculator"` (CO2-Rechner) mit 1 Zahlenfeld
`name="j-hrlicher-W-rmebedarf-des-Haushalts-in-kWH"`, Ergebnisblöcke `CO₂-Ersparnis` pro Jahr
und über die Lebensdauer (30 Jahre), Animation per `requestAnimationFrame` über
`(now - start) / 600` Millisekunden. Kein Fortschrittsbalken, keine persönlichen Daten
in diesen Rechnern. Der eigentliche Lead-Funnel liegt extern auf `/informieren-c1`.

### 3. Leistungsseite /waermepumpe, https://www.enpal.de/waermepumpe

| Feld | Wert |
|---|---|
| Title | `Wärmepumpe kaufen: Bei Enpal ab 7.999 €` |
| Meta-Description | `Wärmepumpen von Enpal ab 7.999€ | Günstig und nachhaltig heizen | Jetzt Kosten sparen und Energieeffizienz steigern | Alle Infos hier` |
| H1 | `Wärmepumpe bei Enpal` |
| H2 / H3 / H4 | 13 / 54 / 30 |
| Schema.org | `BlogPosting`, `Person` (2x), `Organization`, `WebPage`, `BreadcrumbList`, `FAQPage` mit 26 `Question` und 26 `Answer` |
| Canonical | `https://www.enpal.de/waermepumpe` |

Sektionsliste (13 `<section>` plus `<header class="hero">`):

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 0 | Nav | keine | keine | wie überall | Logo | `Ersparnis berechnen` | keine | |
| 1 | Hero | `Wärmepumpe bei Enpal` | `Wirklich günstig heizen: Jetzt Förderung nutzen und Wärmepumpe ab 7.999 € flexibel finanzieren oder kaufen¹` (15 Wörter) | Full-bleed, 2-Spalten | 3 Bilder | `Jetzt Ersparnis berechnen`, `Mehr erfahren`, `Ersparnis berechnen` | TÜV-Siegel, 3 Highlights | `.cc-hero-heat` mit `height:100svh;max-height:70rem` |
| 2 | Inline-Funnel | `Lohnt sich eine Wärmepumpe für Sie?` | keine | 1 Spalte | Skeleton-Loader | keiner | keiner | `cc-slider-heat` |
| 3 | Versprechen-Karte | `Komfortabler Heizungstausch zum Festpreis` | 1 Absatz | 2-Spalten Karte | 1 Bild | keiner | `Festpreis` | `cc-border` |
| 4 | Produkt-Karte | `Perfekt für Bestandsbauten` | 1 Absatz | 2-Spalten gegenläufig | 1 Bild | keiner | keine | |
| 5 | Nutzen-Karte | `Bis zu 45 % günstiger heizen` / `Komplett unabhängig von Öl & Gas` | 1 Absatz | 2-Spalten | 1 Bild | keiner | 45 % Ersparnis | |
| 6 | Nutzen-Karte | `Zukunftssicher heizen` | `Für die kommenden Generationen` | 2-Spalten gegenläufig | 1 Bild | keiner | keine | |
| 7 | 4er-Grid Vorteile | `Warum Enpal? Erleben Sie den Unterschied` | 4 Karten | Splide-Klassen `coll-why-item splide__slide` plus Webflow-Grid `w-col w-col-2` | 7 Bilder | keiner | keine | 46.437 Zeichen |
| 8 | Prozess-Steps | `So funktioniert's` / `Jetzt Wärmepumpe anfragen` | 3 nummerierte Karten | 3er-Grid | 2 Bilder | `Ersparnis berechnen` | keine | `Unverbindliches Angebot anfragen`, `Kostenlos beraten lassen`, `Enpal-Profis installieren Ihre Wärmepumpe` |
| 9 | Referenzen | `Alles richtig gemacht! Was Enpal Kunden sagen` | 45 Bilder | Carousel plus Grid | 45 Bilder | keiner | 45 Kundenfotos | 88.920 Zeichen, größter Block |
| 10 | Video-Testimonial | `Wirklich günstig heizen` / `Michael Kessler zeigt, wie es geht` | keine | Bunny-Player | 1 HLS-Video plus Poster | keiner | Prominenter Testimonial | `bunny-player`-Markup mit `data-player-src` m3u8 |
| 11 | Schluss-CTA-Block | `Die Energielösung von Enpal` / `Für jeden die perfekte Lösung` | 3 Sätze | 1 Spalte | 1 Bild | `Ersparnis berechnen` | keine | Baustein `cc-complete-solution` |
| 12 | Fußnote | keine | werbliche Hinweise zu Förderung, Finanzierung (15 Jahre Laufzeit, 5,99 % Sollzinssatz) | Zentriert-schmal | keine | keiner | home&smart Testsieger 2024, CHIP-Sieger Leistungsspektrum 2025 | `section_fu-noten mf` |

Eigene CTAs dieser Seite: `Jetzt Gespräch vereinbaren` 3x -> `/waermepumpe-rechner`,
`Ersparnis berechnen` 2x -> `/waermepumpe-rechner`, `Wärmepumpe im Altbau` 3x,
`Amortisation Wärmepumpe` 2x. FAQ-Akkordeon im HTML: 0 `faq_question`-Treffer,
FAQ-Wissen liegt hier als Tabs, nicht als Akkordeon.

### 4. Komplettpaket /produkt, https://www.enpal.de/produkt

| Feld | Wert |
|---|---|
| Title | `Die Enpal Energielösung für Ihr Zuhause` |
| Meta-Description | `Solaranlage mit Speicher & Wallbox | Bosch Wärmepumpe | Deutschlands günstiger Stromtarif | Intelligenter Energiemanager Enpal.One ➡️` |
| H1 | `Das Enpal Komplettpaket` |
| H2 / H3 | 10 / 3 |
| Schema.org | kein `application/ld+json` |
| Canonical | `https://www.enpal.de/produkt` |

Sektionsliste (10 `<section>` plus `<header class="hero">`):

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 0 | Hero | `Das Enpal Komplettpaket` | `Die fortschrittlichste Kombination aus Photovoltaik, Wärmepumpe und intelligentem Energiemanager. Oder: Die Energielösung mit dem höchsten Sparpotenzial.` (16 Wörter) | 2-Spalten | 3 Bilder | `Mehr erfahren`, `Ersparnis berechnen`, `Jetzt Ersparnis berechnen` | Efahrer-Siegel | `is-produkt`-Variante |
| 1 | Produkt-Grid | `Unabhängig vom Strompreis` / `Mit Solaranlage & Speicher` | 1 Absatz pro Karte | 2-Spalten pro Karte, 6 Karten | 1 Bild | keiner | keine | `cc-produkte-grid`, `highlight-card`, `highlight-kacheln_icon` |
| 2 | Produkt-Grid | `Günstig & effizient heizen` / `Mit der Enpal Wärmepumpe` | 1 Absatz | Bild links, Text rechts (`is-left`) | 4 Bilder | keiner | keine | |
| 3 | Produkt-Grid | `Nie wieder tanken` / `Dank der Enpal Wallbox` | 1 Absatz | Bild rechts | 2 Bilder | keiner | keine | |
| 4 | Produkt-Grid | `Jederzeit alles im Griff` / `Mit Deutschlands bester Solar-App` | Quellenangabe `Quelle: F.A.Z.-Institut` | Bild links | 3 Bilder | keiner | F.A.Z.-Institut | |
| 5 | Produkt-Grid | `Geld verdienen mit Enpal.One +` / `Und immer günstiger Strom` | 1 Absatz | Bild rechts | 4 Bilder | `www.enpal.de/verguetung` | Badge `produkte-item_badge-check` | |
| 6 | Produkt-Grid | `Der Enpal Service` / `Alles aus einer Hand` | 1 Absatz | Bild links | 3 Bilder | keiner | keine | |
| 7 | Schluss-CTA-Block | `Die Energielösung von Enpal` / `Für jeden die perfekte Lösung` | 3 Sätze | 1 Spalte | 1 Bild | `Ersparnis berechnen` | keine | |
| 8 | Awards-Marquee | `Ergebnisse statt Versprechen` | wie Startseite | Marquee | 30 Siegel | `Alle Auszeichnungen` | 14 Auszeichnungen | |
| 9 | Prozess-Steps | `So funktioniert's` / `3 Schritte zur eigenen Energielösung` | 3 Karten | 3er-Grid | 2 Bilder | `Jetzt Ersparnis berechnen` | `Jetzt Verfügbarkeit prüfen!` | |
| 10 | FAQ-Akkordeon | `Sie haben Fragen? Wir haben Lösungen.` | 3 Fragen | 2-Spalten | keine | `Jetzt Ersparnis berechnen` | keine | Fragen: `Was ist Enpal.One+?`, `Was ist der Unterschied zwischen der staatlichen Einspeisevergütung und der Enpal Vergütung?`, `Was beinhaltet die Enpal Energielösung?` |

Auffällig: 2 CTAs dieser Seite zeigen auf `#` statt auf den Funnel
(`Jetzt Ersparnis berechnen` -> `#`). 2 Links haben leeren Linktext (`‍` -> `/stromspeicher`).

### 5. Über uns /ueber-uns, https://www.enpal.de/ueber-uns

| Feld | Wert |
|---|---|
| Title | `Über Enpal - Vision und Team` |
| Meta-Description | `Mit einer großen Vision und einem starken Team bauen wir bei Enpal die größte Energiebewegung Europas. Grün, günstig, unabhängig  - alles mit Solarenergie.` |
| H1 | `Über Enpal` / `Die Komplettlösung für intelligente Energie` |
| H2 / H3 | 13 / 0 |
| Schema.org | kein `application/ld+json` |
| Canonical | `https://www.enpal.de/ueber-uns` |

Sektionsliste (7 `<section>`, kein `<header class="hero">`, die erste Section ist der Hero):

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero mit Stats | `Über Enpal` / `Die Komplettlösung für intelligente Energie` | 2 Absätze zu Komplettpaket, Enpal.One+ und virtuellem Kraftwerk | 2-Spalten, Bild links, Stats rechts | 1 Bild (`loading="eager" fetchpriority="high"`) | keiner | `#1 Marktführer für Solaranlagen`, `1.000 + Kunden` (Zähler), `#1 Marktführer für Wärmepumpen` | Zähler: `data-countup="140000"`, PureCounter `start: 1000, end: 140000, duration: 1, once: true`; danach Lottie-Konfetti (`setTimeout(..., 1200)`) |
| 2 | Text-Intro Timeline | `Die Enpal Geschichte` / `Was bisher geschah` | 1 Absatz | Zentriert-schmal | keine | keiner | Gründungsjahr 2017, 3 Gründer | |
| 3 | Timeline | keine eigene Headline | Jahres-Chips 2017 bis 2026 | Timeline, rechte und linke Spalte wechseln per `:nth-child(even)` | 58 Bilder, 1 Video | keiner | Meilensteine | `section cc-timeline` mit `background-color: var(--midnight-blue)`, `grid-column: 1 / span 5` vs. `6 / span 7`. Größter Block der Site (146.739 Zeichen) |
| 4 | Karten-Grid Bereiche | `Enpal kann mehr` / `Weitere Enpal Bereiche` | 9 Bereiche mit je 1 Absatz | 3er-Grid `step-card` | 8 Bilder | keiner | keine | Enpal Akademie, Enpal Entwicklungszentren, Enpal Supply Chain Center, Enpal als Partner des Handwerks, Enpal übernimmt Verantwortung, Jobs bei Enpal, Project Ada bei Enpal, Enpal in Presse & Politik |
| 5 | Awards-Marquee | `Ergebnisse statt Versprechen` | wie Startseite | Marquee | 30 Siegel | `Alle Auszeichnungen` | 14 Auszeichnungen | |
| 6 | Team | `Gründer und Management` / `Eine Mission, ein Team` | Zitat Mario Kohle: `Wollen wir weiter Stromkonzernen Geld schenken und der Zerstörung des Planeten zusehen...` | 2-Spalten pro Person, `team-item` plus Splide-Klassen | 3 Bilder | `Mehr über das Team` | Gründerfotos | |
| 7 | Video-CTA | `Bauen Sie mit uns die größte Energiebewegung Europas` | 1 Absatz | 2-Spalten, Bunny-Player | 1 HLS-Video plus Poster | `Zur Enpal Komplettlösung` | keine | 37 `vid`-Marker |

### 6. Referenzen /erfahrungen, https://www.enpal.de/erfahrungen

| Feld | Wert |
|---|---|
| Title | `Enpal Erfahrungen` |
| Meta-Description | `Erfahrungen, Bewertungen und Meinungen zu Enpal. Finden Sie hier die Erfahrungsberichte und Rezensionen von Kunden, die eine Enpal Solaranlage haben.` |
| H1 | `Enpal Erfahrungen` / `So funktioniert die Enpal Energielösung` |
| H2 / H3 | 10 / 6 |
| Schema.org | kein `application/ld+json`. Kein `AggregateRating` trotz Trustpilot-Einbindung |
| Canonical | `https://www.enpal.de/erfahrungen` |

Sektionsliste (10 `<section>` plus `<header class="hero">`):

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 0 | Video-Hero | `Enpal Erfahrungen` / `So funktioniert die Enpal Energielösung` | keine | 1 Spalte mit Video-Grid | 5 Bilder, 6 Bunny-Player mit je 1 m3u8-Quelle | keiner | Kundenstimme als Video, `data-player-autoplay="false"` | 6 HLS-Playlists von `vz-e8487767-4b4.b-cdn.net`, Player mit eigenem Timeline-Handle (`transition: transform 0.15s ease-in-out`) |
| 1 | Referenzen-Wand | `Alles richtig gemacht! Was Enpal Kunden sagen` | 68 Orts-Tags | Grid plus Carousel, 340 `community_more-item` | 340 Bilder | `Video ansehen` 5x | 68 Kundenstandorte als Orts-Tags | Größter Block der gesamten Analyse (410.351 Zeichen) |
| 2 | Empfehlungs-Banner | `Jetzt Freunde empfehlen und 300 € geschenkt bekommen` | 1 Absatz, daneben `Meilenstein: 100.000 Enpal Kunden` | 2-Spalten Karten | 2 Bilder | `Prämie sichern`, `Jetzt mehr erfahren` | 300 € Prämie | `cc-referral`, dunkle Karte |
| 3 | Video-Story | `Grün, günstig, unabhängig` / `Über 140.000 Haushalte nutzen Enpal` | 1 Absatz | 2-Spalten | 1 Bild, 1 Bunny-Video | keiner | 140.000 Haushalte | 37 `vid`-Marker |
| 4 | Awards-Marquee | `Ergebnisse statt Versprechen` | wie Startseite | Marquee | 30 Siegel | `Alle Auszeichnungen` | 14 Auszeichnungen | |
| 5 | Karte | `Enpal in Ihrer Nachbarschaft` / `Jeder Pin eine gute Entscheidung` | keine | 1 Spalte mit iframe | 1 iframe `https://enpal-customer-map.vercel.app/` (`loading="lazy"`, `scrolling="no"`) | keiner | Kundenstandorte als Pins | Standort wird per `postMessage` aus `sessionStorage.getItem('ipLocation')` übergeben, Event `ipLocationSet` |
| 6 | Experten-Karten | `Wir sind für Sie da` / `Beratung & Service von unseren Experten` | 3 Karten: `Unverbindliche Beratung`, `Kostenloser Service`, `Jeder Kunde ein Fan` | 3er-Grid `cc-highlight-fact` | 1 SVG | keiner | keine | |
| 7 | Empfehlungs-Banner | `Jetzt Freunde empfehlen und 300 € geschenkt bekommen` | identisch zu Nr. 2 | 2-Spalten | 1 Bild | `Prämie sichern` | 300 € Prämie | Derselbe Block erscheint 2x auf derselben Seite |
| 8 | Trustpilot | `Tausende Erfahrungsberichte` / `Das sagen Enpal Kunden` | keine | 1 Spalte | Trustpilot-Script-Embed | keiner | Trustpilot | `html-embed-15 w-embed w-script` |
| 9 | Prozess-Steps | `So funktioniert's` / `3 Schritte zur eigenen Energielösung` | 3 Karten | 3er-Grid | 2 Bilder | `Jetzt Ersparnis berechnen` | keine | |
| 10 | Fußnote | keine | keine | Zentriert | keine | keiner | keine | |

### 7. Ratgeber-Übersicht /magazin, https://www.enpal.de/magazin

| Feld | Wert |
|---|---|
| Title | `Enpal Magazin: Energie einfach erklärt` |
| Meta-Description | `Alle Informationen rund um Photovoltaik, Wärmepumpe & Co.: In unseren Artikeln beantworten wir alle Fragen, die Sie als Hausbesitzer beschäftigen.` |
| H1 | `Das Enpal Magazin` / `Alle Infos rund um Photovoltaik, Wärmepumpe & Co.` |
| H2 / H3 | 7 / 3 |
| Schema.org | kein `application/ld+json` |
| Canonical | `https://www.enpal.de/magazin` |

Sektionsliste (2 `<header>`-Blöcke plus 1 `<section>`):

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 0 | Hero | `Das Enpal Magazin` / `Alle Infos rund um Photovoltaik, Wärmepumpe & Co.` | 1 Absatz mit 3 Beispiel-Fragen | Zentriert-schmal, `layout-m` | 0 Bilder | `Expertengespräch vereinbaren` -> `/informieren-solar-waermepumpe` | keine | `cc-magazin-hero`, `text-align:center` |
| 1 | Themen-Karten mit Link-Chips | 6 H2: `Photovoltaikanlage`, `Wärmepumpe`, `Energiemanager`, `Wallbox`, `Stromspeicher`, `Photovoltaik für Gewerbe` | keine | 6 `step-card`, Bild und Inhalt abwechselnd | 6 Bilder | 25 Chip-Buttons, z. B. `Solaranlage Kosten`, `Photovoltaik Förderung`, `Solaranlage mieten`, `Wie funktioniert Photovoltaik?`, `Solaranlage mit Speicher`, `Energie-Lexikon`, `Wärmepumpe Kosten`, `Förderung Wärmepumpe`, `Luftwärmepumpe`, `Enpal.One`, `Smart Meter`, `Dynamischer Stromtarif`, `§ 14a EnWG`, `Stromkosten`, `Strompreisentwicklung`, `Wallbox Förderung`, `Wallbox Kosten`, `Wallbox und Photovoltaik`, `Solarstromspeicher`, `Lithium-Eisenphosphat-Speicher`, `Stromspeicher Förderung`, `Dach verpachten`, `Gewerbestrom selbst erzeugen` | keine | Chip-Variante `button-m w-variant-1f36127b-6bc9-b7cb-82f6-81377d4045f7` = `secondary-transparent-dark`, 25 Vorkommen |
| 2 | Prozess-Steps | `So funktioniert's` / `3 Schritte zur eigenen Energielösung` | 3 Karten | 3er-Grid | 2 Bilder | `Jetzt Ersparnis berechnen` | keine | |
| 3 | Footer | siehe Steckbrief | | | | | | |

Wichtiger Befund: Das Magazin ist **keine Artikelliste**, sondern ein SEO-Hub aus 6
Themenkarten mit 25 Deep-Links in die Ratgeber- und Glossar-Silos. Es gibt 0 Links auf
`/magazin/<slug>`-Artikel. Der einzige Artikel-Einstieg im geprüften Set liegt unter
`/photovoltaik/amortisation`. Die 13 `/erfahrungen/`-URLs in der Sitemap sind Kundenstories,
keine Magazin-Artikel. Artikel templatisiert Enpal also unterhalb der Produkt-Silos, nicht
unter `/magazin/`.

### 8. Ratgeber-Artikel /photovoltaik/amortisation, https://www.enpal.de/photovoltaik/amortisation

| Feld | Wert |
|---|---|
| Title | `Amortisation PV-Anlage: Wann zahlt sich die Investition aus?` |
| Meta-Description | `Von der Anfangsinvestition bis zum Gewinn - Wie lang ist die Amortisationszeit und was hilft diese zu beschleunigen? Mehr dazu hier` |
| H1 | `Amortisation PV-Anlage: Wann zahlt sich die Investition aus?` |
| H2 / H3 | 8 / 0 |
| Schema.org | `BlogPosting` (`datePublished: 2024-03-14T08:55+01:00`, `dateModified` gepflegt, Autor Christopher Grobe, `jobTitle: Online-Redaktionsleitung`), `WebPage` mit `reviewedBy` (Wolfgang Gründinger, verlinkt auf Wikipedia), `Person` 2x, `Organization`, `BreadcrumbList` mit 3 `ListItem` |
| Canonical | `https://www.enpal.de/photovoltaik/amortisation` |
| Textlänge | ca. 1401 Wörter im Artikelblock (56.772 Zeichen HTML) |
| Bilder | 139 `<img>` auf der Seite, davon 100 SVG-Icons, 35 WebP |
| Interne Links | 9 `href="/..."`, 31 externe Links |

Aufbau in DOM-Reihenfolge:

| Nr | Element | Inhalt wörtlich |
|---|---|---|
| 1 | Breadcrumb | `Photovoltaikanlage` > `Solaranlage Kosten` > `Amortisation PV-Anlage` |
| 2 | H1 | `Amortisation PV-Anlage: Wann zahlt sich die Investition aus?` |
| 3 | Autorenzeile | `Autor: Christopher Grobe` (mit Foto, verlinkt auf `/autoren/christopher-grobe`), `Aktualisiert: 17.07.2024`, `Lesezeit: 4 Minuten`. Auffällig: kein Veröffentlichungsdatum sichtbar, nur `Aktualisiert` |
| 4 | Magazin-Logo | 1200px WebP `enpal-magazin-head-gelb.webp` |
| 5 | Key-Takeaways-Box | `A mortisation PV-Anlage: Das Wichtigste in Kürze` mit 5 Bullets, Layout `seo-blue-box` (blauer Kasten) |
| 6 | Inhaltsverzeichnis | `Inhaltsverzeichnis` (`<p id="magazin-headline" class="magazin-headline">`) plus `<div id="toc" class="toc">`, Links `color:#333;font-size:16px;text-decoration:underline`, Hover `#ffb000` |
| 7 | Artikeltext | 8 H2: `Was bedeutet Amortisation?`, `Durchschnittliche Amortisationszeit einer PV-Anlage`, `Kosten einer PV-Anlage`, `Beispielrechnung für die Amortisation einer PV-Anlage`, `Tipps zur Beschleunigung der Amortisation`, `Fazit`; dazwischen 1 HTML-Tabelle `Die Kosten einer PV-Anlage` mit 5 Zeilen (PV pro kWp 1.700 € netto, Speicher pro kWh 1.300 € netto usw.) und Quellenangabe `Fraunhofer ISE und eigene Marktrecherchen` |
| 8 | Sticky-Sidebar | `content_navigation is-right` mit `Inhaltsverzeichnis`-Toggle, Fortschrittslinie `content_toc-progress-line`, Google-Bewertung `4,2 basierend auf 13.256 Rezensionen` mit Google-Logo, CTA `Ersparnis berechnen` -> `/informieren-c1`. Auf Mobil als Bottom-Sheet: `backdrop-filter: blur(20px)`, `border-top-left-radius:2rem`, `bottom:0` |
| 9 | Weiterlesen-Box | `Diese Artikel empfehlen wir Ihnen für weitere Infos:` mit 5 Links (`Einspeisung PV-Anlage: Solarstrom einspeisen oder selbst verbrauchen?`, `Die aktuelle Einspeisevergütung in 2025`, `Solarstrom verkaufen: Diese Möglichkeiten haben Sie`, `Solaranlage mit Speicher kaufen oder mieten: Komplettpaket inkl. Montage`, `Solaranlage mieten oder kaufen? Die wichtigsten Fakten`) |
| 10 | Voting-Widget | `War dieser Artikel hilfreich?` / `12 Leser fanden diesen Artikel hilfreich.` / Buttons `Ja` und `Nein` mit Alpine.js `x-data="{ voted: false }"` |
| 11 | Zweiter CTA | `Ersparnis berechnen` als `content_nav-link` |

Mengen: 0 Zwischen-CTAs im Fließtext (kein CTA zwischen H2-Blöcken, nur Sidebar und
Artikelende). 1 Key-Takeaways-Box, 1 Inhaltsverzeichnis, 1 Autorenbox, 1 Voting-Widget,
5 verwandte Artikel, 0 FAQ im Artikel (anders als die verlinkten Siloseiten, die
`FAQPage`-Schema mit 22 bis 26 Fragen tragen).

### 9. Funnel-Einstieg /informieren-c1, https://www.enpal.de/informieren-c1

| Feld | Wert |
|---|---|
| Title | `Enpal Solarrechner: Jetzt Ersparnis berechnen!` |
| Meta-Description | `Im Enpal Solarrechner kommen Sie kostenlos, schnell und unverbindlich zu Ihrem Photovoltaik Angebot. Jetzt eigenen Strom produzieren und unabhängig machen!` |
| H1 | `100 % kostenloser Solar-Rechner` |
| H2 bis H6 | 0 (das gesamte Formular wird per JavaScript gemountet) |
| Schema.org | kein `application/ld+json` |
| Canonical | `https://www.enpal.de/informieren-c1` |
| Formulare im HTML | 0 `<form>`-Tags. Das Formular existiert nur im 1,89 MB großen React-Bundle |

Sektionsliste (2 Container, keine `<section>`-Tags):

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Funnel-Hero | `100 % kostenloser Solar-Rechner` | keine | Zentriert, `section-funnel-hero2-hd background-image-hd portal` | Hintergrund `slider_background.jpg` von `enpal.azureedge.net`, per `<link rel="preload" as="image" fetchpriority="high">` | Formular-Buttons (JS) | keine im Hero | `class="heading-111 bg-color"` |
| 2 | Slider-Skeleton | keine | keine | Skeleton-Loader mit 4 Karten | `#slider-skeleton-loader` mit `min-height:416px`, `animation-name: shimmer`, `animation-duration: 1.8s`, `linear`, `infinite`, `background-size: 62rem 40rem` | keiner | keine | `#enpal-slider-animated` als Mount-Punkt, `enpal-components.min.js` lädt `index.html` per `fetch(... ?t=Date.now())` und mountet |
| 3 | Zertifikat-Block | keine | `Enpals Kundenzufriedenheit ist mit Note "Gut" durch den TÜV Saarland zertifiziert (SC45293).` | Zentriert, `zertifikat-logos-hd lp c1 intern portal` | TÜV-Siegel-SVG mit Tooltip | `Zum Zertifikat`, `HIER` (beide `href="#"`) | TÜV Saarland Zertifikat SC45293 | Tooltip erscheint per Klick auf das Siegel |
| 4 | Mini-Footer | keine | keine | 4 Links | keine | `Newsletter`, `Freunde empfehlen`, `Impressum`, `Datenschutz` | keine | Kein voller Footer auf dieser Seite |

Funnel-Mechanik aus dem React-Bundle (`slider-app.js`, 1.887.350 Bytes):

| Aspekt | Befund |
|---|---|
| Konfigurationen | 5 Varianten in JS: `completeSlider` (`showProgress:!0`), `miniSlider` (`showProgress:!1`, nur Formular plus Adresse), `fieldSalesSlider`, `fieldSalesSSTSlider`, `dvagSlider` |
| Schrittkette `completeSlider` | vor dem Formular: Gutschein (optional), Bundesland, Haustyp, Dachform, Haushaltsgröße, Stromnutzungszeitpunkt, Eigentümer, Bestandsanlagen; dann 3 Formularschritte: E-Mail, Name, Telefon; dann Termin-Slides und Erfolgs-Slides |
| Fragetypen | `SINGLE_ANSWER_SLIDE` (Kacheln mit Icon-SVG und Label), `MULTIPLE_CHOICE_ANSWERS`, `FORM_SLIDE`, `SEPARATED_FORM_SLIDE`, `STATE_ENTRY_SLIDE`, `ADDRESS_FORM_SLIDE`, `APPOINTMENT_BOOKING_SLIDE`, `SINGLE_ACTION_SLIDE`, `INTERIM_MESSAGE_SLIDE`, `RECOMMENDATION_CHANNEL_SLIDE`, `DISQUALIFYING_SLIDE` |
| Reihenfolge der Formularschritte | `get formSlides(){return[this.d.emailFormSlide,this.d.nameFormSlide,this.d.phoneFormSlide]`, also E-Mail zuerst, Telefon zuletzt |
| Fortschrittsanzeige | `ProgressBarContainer` plus `index_progressBar_zgp-B` mit `background-color:#64d59f33;border-radius:.125rem;height:.25rem;margin:0 2.5rem`, Füllung `index_progress_PMEOh{height:inherit;border-radius:inherit;background-color:#6dce71;transition:width .5s ease-in-out}`, Icon-Größe `--iconSize:1.25rem` (`1.5rem` in `sizeMedium`) |
| Countdown-Microcopy | `progressBar.label` dynamisch: `Nur noch 3 Schritte!` (Name), `Nur noch 2 Schritte!` (E-Mail), `Fast geschafft - noch 1 Schritt!` bzw. `Nur noch 1 Schritt!` (Telefon) |
| Buttons | `submit: "Weiter"`, je Feature-Flag `Jetzt kostenloses Angebot erhalten` oder `Jetzt Anfrage starten`; Rücksprung-Button `backButton: "Zu Privatkunden"` |
| Begründungs-Akkordeons | Jede Frage hat `infoAccordion` mit `Warum benötigen wir diese Information?`. Beispiel: `Die Haushaltsgröße gibt Aufschluss über Ihren Stromverbrauch und Stromnutzung.` |
| Validierungsfehler | `Pflichtfeld`, `Bitte Vorname angeben`, `Bitte E-Mail-Adresse angeben`, `Bitte geben Sie eine deutsche Handynummer ein`, `Bitte Postleitzahl angeben`, `Diese Postleitzahl ist leider zu kurz` |
| Personalisierung | `STATE_ENTRY_SLIDE` sortiert die 16 Bundesländer nach vermuteter Nähe (`Bayern:[DF,OF,kF,VF,MF,zF,jF,EF,FF,HF]`), Zusatzoption `Ich lebe in einem anderen Bundesland` |
| Disqualifikation | Slides mit `softDisqualification:!0`, Text `Leider kann kein Angebot erstellt werden.`, `Leider können wir diesen Dachbelag aktuell nicht bauen.`, `Unerwarteter Fehler` |
| Terminbuchung | `sstAppointmentBooking` mit Kalender-Slots, Texte `Bitte warten... Wir prüfen unsere verfügbaren Termine`, `Herzlichen Glückwunsch! Wir haben gerade einen passenden Termin für Sie gefunden:`, `Nur noch wenige Termine verfügbar. Wir haben noch einen freien Termin gefunden:` |
| Options-Slide | `whatsAppOptin`, `newsletterOptin`, `sellingOptinBDSlide` (`Kostenlose Beratung durch geprüften Partner`, `Aufgrund erhöhter Nachfrage möchten wir Ihnen...`), Marketing-Einwilligung mit Widerrufshinweis `abmelden@enpal.de` |
| Tracking-Events | `enpal-lead-created`, `pv-qualified-lead`, `gaEvent`, `GA_EVENT`; Slide-Konstanten `DYNAMIC_ENTRY_SLIDE`, `CONTACT_FORM`, `SINGLE_ACTION_SLIDE`, `INTERIM_SLIDE`, `SST`, `GEOPICKER`, `WHATSNEXT_SLIDE` |
| Varianten-Umschaltung | `window.PV_SLIDER_CUSTOM_CONFIG`, serverseitig per `window.SLIDER_AB_TESTS` und `Kameleoon` gesteuert. Beispiele auf der Startseite: `{ key: 'SE', feature: 'StateEntry' }`, `{ key: '260515Legal_A', feature: 'LegalOptinTop' }`, `{ key: '260518Legal_A', feature: 'MarketingOptin' }`, `{ key: 'HeatX', feature: 'HP_HeatX' }` |
| Styling im Funnel | Eigene Design-Tokens im Bundle: `--font-primary-color:#0a2742;--font-light-color:#5f5f68;--button-primary-color:#4282fb;--dark-blue:#072543;--green:#64d59f`. Brand-Variante: `.brand .components_Button_IVtrJ{color:var(--dark-blue);background:#ffd233;border-radius:12px}`, Hover `background:#fd6`, Active `background:#ffe999` |
| Übergang | `index_SliderWrapper_UCvQK{width:100%;transition:all .65s ease-in-out;position:relative;overflow:hidden}` |
| Modal | `index_ModalBackdrop_XlPmL{backdrop-filter:blur(8px);background-color:#000000bf}`, Inhalt `border-radius:1rem`, `width:724px` ab 768px |

### 10. Standorte /standorte, https://www.enpal.de/standorte

| Feld | Wert |
|---|---|
| Title | `Enpal Standorte: Hier ist Enpal aktiv` |
| Meta-Description | `Die Energielösungen von Enpal sind in ganz Deutschland verfügbar. Egal ob Solaranlage mit Speicher und Wallbox oder Wärmepumpe - überall bieten wir das Komplettpaket inkl. Montage an.` |
| H1 | `Enpal Standorte` |
| H2 / H3 | 7 / 3 |
| Schema.org | kein `application/ld+json` |
| Canonical | `https://www.enpal.de/standorte` |

Sektionsliste (8 `<section>` plus `<header class="hero">`):

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 0 | Hero | `Enpal Standorte` | keine | 1 Spalte | 1 Bild | `Jetzt Verfügbarkeit in Ihrer Region prüfen` | keine | `cc-location-hero` |
| 1 | Video plus Text | `An welchen Standorten ist Enpal aktiv?` | 2 Absätze | 2-Spalten | 1 Bunny-Video | keiner | `In der Enpal Kundenkarte weiter unten finden Sie Enpal Energielösungen in Ihrer Nachbarschaft.` | 37 `vid`-Marker |
| 2 | Schluss-CTA-Block | `Die Energielösung von Enpal` | 3 Sätze | 1 Spalte | 1 Bild | `Ersparnis berechnen` | keine | |
| 3 | Karte | `Enpal in Ihrer Nachbarschaft` / `Jeder Pin eine gute Entscheidung` | keine | 1 Spalte mit Kundenkarte | 1 Karte | keiner | Kundenstandorte | |
| 4 | Vorteile | `Warum Enpal? Erleben Sie den Unterschied` | 4 Karten | Grid | keine | keiner | keine | |
| 5 | Standort-Grid | `Enpal in ganz Deutschland` / `An jedem Ort eine gute Entscheidung` | 10 Städte | Grid | keine | 10 Links: `/standorte/berlin`, `/standorte/hamburg`, `/standorte/muenchen`, `/standorte/koeln`, `/standorte/frankfurt`, `/standorte/essen`, `/standorte/leipzig`, `/standorte/hannover`, `/standorte/nuernberg`, `/standorte/stuttgart` | keine | |
| 6 | Referenzen | `Alles richtig gemacht! Was Enpal Kunden sagen` | 68 Orts-Tags | Grid | 68 Bilder | keiner | 68 Kundenfotos | |
| 7 | Prozess-Steps | `So funktioniert's` / `3 Schritte zur eigenen Energielösung` | 3 Karten | 3er-Grid | 2 Bilder | `Jetzt Ersparnis berechnen` | keine | |
| 8 | Fußnote | keine | keine | Zentriert | keine | keiner | keine | |

### 11. FAQ-Übersicht /faq, https://www.enpal.de/faq

| Feld | Wert |
|---|---|
| Title | `Häufig gestellte Fragen bei Enpal` |
| Meta-Description | `Hier finden Sie alle Antworten auf die Fragen, die wir bei Enpal häufig gestellt bekommen. Ob zu Produkten, Services oder Enpal selbst - jetzt informieren!` |
| H1 | `Häufig gestellte Fragen` / `Hier finden Sie Antworten` |
| H2 | 11 (10 Kategorien plus Wiederholung `Um welches Produkt handelt es sich?`) |
| Schema.org | kein `application/ld+json`. Kein `FAQPage`-Schema auf der FAQ-Übersicht, obwohl 319 Einzel-FAQ-URLs existieren |
| Canonical | `https://www.enpal.de/faq` |

Aufbau:

| Nr | Sektionstyp | Inhalt | Layout | Hinweise |
|---|---|---|---|---|
| 0 | Hero | `Häufig gestellte Fragen` / `Hier finden Sie Antworten` | Zentriert-schmal, `cc-faqs` | keine Subline |
| 1 | Filter plus Kartenliste | 10 Kategorien: `Um welches Produkt handelt es sich?`, `Allgemein`, `Stromzähler`, `Finanzierung`, `App`, `Enpal.One+`, `Wallbox`, `Stromtarif`, `Photovoltaikanlage`, `Wärmepumpe` | Filter-Radiobuttons plus Kartenliste | 46 `<form>`, 327 `coll-faq-iitem`, 318 `faq-card-2`-Links, 965 `r-indexed`-Werte. Filter per Finsweet (`fs-cmscombine-element`, `r-filter-wrapper="1"`), Reset-Button `Filter zurücksetzen`. Jede Karte verlinkt auf eine eigene FAQ-URL. Radio-Checked-Styling: `.radio-button-category.w--redirected-checked{border-color:var(--midnight-blue);background-color:var(--midnight-blue)}` |
| 2 | Footer | siehe Steckbrief | | |

Die Seite hat keine Akkordeon-Interaktion: alle Antworten liegen als eigene URLs vor
(319 in der Sitemap), die Übersicht ist ein Filter-Index.

### 12. Komplett-Index /produkt bis Region-Landingpage: weitere geprüfte Typen

| Seite | Typ | Besonderheit |
|---|---|---|
| `/unser-service` | Service-Seite | 4 Sections, `cc-community`-Referenzblock mit 68 Karten, 6 Service-Karten (`Persönliche Beratung`, `Individuelle Planung`, `Kein Papierkram`, `Professionelle Installation`, `Flexible Finanzierung`, `Top-Versicherung`). Hero-H1 listet alle 6 Leistungen kommagetrennt |
| `/kontakt` | Kontakt ohne Formular | 3 Bereiche, 0 `<form>`. Routing nach Anliegen: `Enpal Solaranlage`, `Enpal Wärmepumpe`. Telefon `+49 30 30 80 80 52` (Mo bis Fr 9 bis 18 Uhr), `service@enpal.de`, `montage@enpal.de`, `verkauf@enpal.de`, Chat im Kundenportal. Reine Service-Seite ohne Lead-Formular |
| `/auszeichnungen` | Award-Wand | 51 H2 (eine Auszeichnung pro H2), 52 Bilder, `layout-m`-Hero, kein Funnel-CTA ausser Nav und Footer |
| `/region/100` | Regionale Landingpage | 2 Sections. H1 `Ihr individuelles Wärmepumpen-Angebot vom Marktführer`, Trust `4,2 Sterne bei Google`, 3 USPs `Bis zu 70 % Förderung`, `Ohne Anzahlung`, `10 Jahre Garantie`. Title ist nur `enpal.de`, keine Meta-Description. Großer Werbehinweis-Block zu Förderung, Finanzierung (15 Jahre, 5,99 %) und Solarthermie. Eigener Mini-Footer ohne Hauptnav |
| `/energie-lexikon` | Lexikon-Index | 1 `<section>` mit 176.300 Zeichen, 100 Links auf `/energie-lexikon/...`, 2 `<form>`, Buttons `Zurück zur Übersicht`, `Suchen`. Layout `glossary-details_collection-item` mit Accordion-Icons |

## Design-System

### Fonts

Zwei Familien, beide selbst gehostet als WOFF2 von `cdn.prod.website-files.com`,
`font-display: swap`. Keine Google-Fonts- oder Adobe-Fonts-Links im HTML.

| Familie | Gewichte | Schnitte | Rolle |
|---|---|---|---|
| Poppins | 100, 200, 300, 400, 400 italic, 500, 600, 700 (8 `@font-face`-Blöcke) | 8 | Display und Body. `body{color:#333;font-family:Poppins,sans-serif;font-size:14px;line-height:20px}` |
| Inter | 400, 400 italic, 500, 700 (4 `@font-face`-Blöcke) | 4 | Zusatzschrift, u. a. für lange Fließtexte |
| webflow-icons | Base64-Embed | 1 | Webflow-UI-Icons |

Der Funnel lädt Poppins zusätzlich aus dem Bundle: `font-family: Poppins,Helvetica,Arial,Lucida,sans-serif`,
dazu `Lato,Arial,Helvetica,sans-serif` in Einzelkomponenten.
Der Trustpilot-TrustBox wird explizit auf die Markenschrift gesetzt:
`data-font-family="Poppins"`.

### Farben

Top-Werte aus `home.css` plus `shared.css` (261 Sechs-Zeichen-Hex-Vorkommen):

| Anzahl | Wert | Rolle |
|---|---|---|
| 69 | `#072543` | Primärfarbe Text und Buttons, identisch mit `--midnight-blue` und `--enpal-dark-blue` |
| 24 | `#6a7c8e` | Sekundärtext, identisch mit `--enpal-light-blue`, Farbe der `span-h2-variant` |
| 18 | `#f8f8f8` | Hintergrund Sektionen, identisch mit `--white-smoke` und `--enpal-grey` |
| 17 | `#ffd233` | Akzent, identisch mit `--enpal-gold`, Hintergrund aller Primärbuttons |
| 15 | `#cdd3d9` | Rahmen und Trennlinien |
| 10 | `#ebf2ff` | Hellblauer Kasten (Key-Takeaways), identisch mit `--alice-blue` |
| 10 | `#76be74` | Grün für Erfolg und Häkchen, identisch mit `--enpal-text-green` |
| 9 | `#ffb000` | Sekundärakzent, identisch mit `--orange`, TOC-Hover |
| 6 | `#083357` | Dunkelblau-Variante |
| 5 | `#868686` | Grau, identisch mit `--grey` |
| 5 | `#e6e6e6` | Rahmen, identisch mit `--gainsboro` |
| 5 | `#3e7eff` | Flash-Blau für Links, identisch mit `--cornflower-blue` |

CSS-Custom-Properties aus `home.css` (`:root`):

```
--midnight-blue:#072543; --orange-2:#fcb017; --black:black; --white:white;
--dim-grey-2:#5e666f33; --orange:#ffb000; --grey:#868686; --gainsboro:#e6e6e6;
--dim-grey:#5e666f; --enpal-dark-blue:#072543; --enpal-light-blue:#6a7c8e;
--white-smoke:#f8f8f8; --cornflower-blue:#3e7eff; --medium-sea-green:#39b35b;
--enpal-gold:#ffd233; --enpal-white:#fff; --enpal-grey:#f8f8f8; --alice-blue:#ebf2ff;
--435675:#435675; --eefbea:#eefbea; --536a4c:#333; --7e4747:#7e4747; --enpal-black:#000;
--enpal-dark-grey:var(--536a4c); --enpal-text-green:#76be74; --enpal-light-yellow:#fd6;
--enpal-superlight-yellow:#fff9e5; --enpal-banner-green:#2dab2a;
--enpal-flash-blue:var(--cornflower-blue); --fff2eb:#fff2eb; --medium-grey:#a0a0a0
```

Der Funnel bringt einen zweiten, eigenen Token-Satz mit:
`--font-primary-color:#0a2742`, `--font-light-color:#5f5f68`, `--button-primary-color:#4282fb`,
`--dark-blue:#072543`, `--green:#64d59f`. Für die SM-Brand-Variante zusätzlich
`--button-primary-gradient-start:#fcc440`, `--button-primary-gradient-end:#f39419`,
`--blue-gradient:linear-gradient(90deg, #5e7e9e 0%, #30415380 100%), linear-gradient(103.11deg, #5e7e9e 0%, #455d76 100.02%)`.

Farbdoktrin: Blau `#072543` ist Text und Struktur, Gelb `#ffd233` ist der einzige
Aktionsfarbwert, der auf allen Primärbuttons liegt. Grün `#76be74` und `#39b35b`
markieren Erfolg, Bewertungen (`p-green`) und Fortschritt. Der Funnel nutzt für
Fortschritt ein anderes Grün (`#6dce71` auf `#64d59f33`).

### Radius

| Anzahl | Wert | Verwendung |
|---|---|---|
| 11 | `1rem` | Karten, Video-Karten, Bild-Cover, Funnel-Modal, Tabellen-Container |
| 10 | `0` | Icon-Container, Reset |
| 6 | `.875rem` | alle Buttons (`button-m`, `e_button`, `button-nav`) |
| 6 | `.8rem` | Prozess-Karten `three-steps-card` |
| 5 | `6.25rem` | Pills |
| 4 | `50%` | runde Bilder, Timeline-Punkte |
| 3 | `1.5rem` | größere Karten |
| 3 | `.75rem` | kleine Karten |
| 2 | `.5rem`, `5px`, `9px` | Kleinflächen |
| weitere | `10rem`, `5rem`, `3px`, `2.5rem`, `2.25rem`, `.25rem`, `unset`, `100%` | Einzelfälle |

Buttons sind also nicht pill, sondern Rechtecke mit 14 px Radius (`.875rem` bei
Basis-Schriftgröße 16px). Karten liegen bei 16 px (`1rem`). Mobile Bottom-Sheet
`content_navigation` nutzt `border-top-left-radius:2rem;border-top-right-radius:2rem`.

### Shadows

| Anzahl | Wert | Verwendung |
|---|---|---|
| 7 | `none` | Reset in Hover-Zuständen |
| 4 | `1px 1px 14px #0000004d` | schwebende Karten |
| 2 | `0 4px 20px #0003` | Container |
| 2 | `1px 1px 13px -11px #7d7d7d` | sehr weiche Kante |
| 1 | `0 0 0 1px #0000001a,0 1px 3px #0000001a` | Fokusrahmen |
| 1 | `0 2px 10px #0003` | Nav-Tab-Hover |
| 1 | `0 4px 34px #00000040` | großer Container |
| 1 | `1px 1px 8px #00000080` | starke Karte |

Zusätzlich im Funnel: `0 0 50px #07254333` für die Termin-Karte,
`0 10px 15px -3px #0000001a, 0 4px 6px -2px #0000000d` für das Modal.

Schatten sind sparsam. Die Trennung läuft stattdessen über Hintergrundfarbwechsel
(`#fff`, `#f8f8f8`, `#f5f6f7`) und 1px-Rahmen in `#cdd3d9` oder `var(--midnight-blue)`.

### Spacing und Container

| Klasse | max-width | Padding | Grid |
|---|---|---|---|
| `.layout-l` | `85.15rem` | `2.5rem` seitlich, `1.25rem` auf Mobil | 12 Spalten `minmax(0,1fr)`, `gap:1.5rem` |
| `.layout-m` | `68.75rem` | `2.5rem` seitlich, `1.25rem` auf Mobil | 12 Spalten, `gap:1.5rem` |
| `.e_container-large` | `93.625rem` | keine | Block |
| `.layout-l cc-hero-new` | 12-Spalten | `padding-top:4.25rem`, `padding-bottom:8.75rem`, `min-height:100svh` | Hero Startseite |
| `.layout-l cc-hero-pv` | | `height:100svh;max-height:70rem;padding-top:8.75rem;padding-bottom:9.75rem` | Hero Photovoltaik |

Section-Padding (typische Werte): `4.375rem` oben und unten für `cc-community`
und `cc-produkte-grid`, `3rem` für `cc-press-marquee`, `4rem`/`2rem` für
`e_padding-section-medium`, `4.375rem` für `cc-contact-hero`.
Der letzte Abschnitt im `<main>` bekommt per CSS `padding-bottom:13.75rem !important`
(Desktop ab 992px) bzw. `5.5rem` unter 767px.

Wichtig: Die Seite skaliert die Basis-Schriftgröße responsiv, nicht jede Größe einzeln:

```
html { font-size: 1rem; }
@media (max-width:1440px) { html { font-size: calc(0.674554565701559rem + 0.22271714922048996vw); } }
@media (max-width:991px)  { html { font-size: calc(0.44642857142857145rem + 0.8928571428571428vw); } }
@media (max-width:768px)  { html { font-size: calc(0.6678200692041523rem + 0.6920415224913495vw); } }
@media (max-width:479px)  { html { font-size: calc(0.8747384937238494rem + 0.41841004184100417vw); } }
```

Damit skaliert jede `rem`-Angabe mit. `scroll-behavior: smooth` und
`scroll-padding-top: 10rem` sind global gesetzt (Anker landen nicht unter dem Sticky-Nav).

### Typo-Skala

| Klasse | Größe | Gewicht | Line-Height | Kontext |
|---|---|---|---|---|
| `.h1-new` | `4rem` | 600 | 1.2 | Basis. Ab 991px `2.875rem`, ab 767px `2.5rem`, ab 479px `clamp(2rem,10vw,2.5rem)` |
| `.h1-new.cc-pv` | wie `.h1-new` | 600 | 1.2 | ab 479px `clamp(2rem,10vw,2rem)` |
| `.h2-new` | `2.875rem` | 600 | 1.3 | ab 767px `2rem`, Line-Height `1.25` |
| `.h3` / `.h3-new` | `2.875rem` / `1.5rem` | | 1.3 | `.h3` ab 767px `2.25rem`, ab 479px `1.5rem` |
| `.h4-new` | `1.75rem` | 500 | 1.4 | ab 767px `1.5rem`, Farbe `var(--midnight-blue)`, Footer-Variante mit `e_text-color-white` |
| `.h6-new` | `1.25rem` | 600 | 1.5 | Karten-Headlines, FAQ-Fragen, USP-Punkte |
| `.p-1-5` | `1.5rem` | | 1.5 | Unterzeilen in Video-Karten, ab 767px `1rem` |
| `.p-1-25` | `1.25rem` | | 1.5 | Hero-Eyebrows, ab 767px `1rem`, ab 479px `.75rem` |
| `.p-1-0625` | `1.2rem` | 500 | 1.6 | Standard-Fließtext |
| `.p-0-875` | `.875rem` | | 1.4 | Kleingedrucktes, Presse-Zeile |
| `.span-h2-variant` | `2.25rem` | 500 | | Zweite Zeile jeder H2, Farbe `#6a7c8e`, `display:block`, ab 767px `1.5rem` |
| `.p-green` | `.875rem` | 600 | | Bewertungstext in Auszeichnungen, Farbe `#39b35b` |

Letter-Spacing wird nur an 4 Stellen gesetzt: `.02em` (2x), `-.02em` (2x), `normal`, `unset`.
Der Funnel nutzt `letter-spacing:-.01em` mit `line-height:130%` für Sondertitel.
Alle Headlines laufen mit `text-wrap: balance`. `font-weight`-Verteilung im CSS:
500 (53x), 600 (53x), 700 (39x), 400 (20x), Rest 100 bis 900 (je 1 bis 2x).

### Buttons

| Klasse | Werte |
|---|---|
| `.button-m` (Primär) | `color:var(--midnight-blue);background-color:#ffd233;border:1px solid #ffd233;border-radius:.875rem;padding:1rem 1.5rem;font-size:1rem;font-weight:600;line-height:1.5;transition:background-color .2s`. Hover `background-color:#ffdb5a`. Ab 767px `padding:.75rem 1.25rem` |
| `.e_button` (Nav-Checkout) | identisch zum Primärbutton inkl. `transition:background-color .2s`, Hover `#ffdb5a` |
| `.e_button.is-secondary` | Outline, Hover `color:#fff;background-color:#072543` |
| `.e_button.is-icon` | mit Pfeil-Icon, `grid-column-gap:.5rem`, kein rechtes Padding |
| `.button-m.w-variant-289fadd0...` (Sekundär hell) | Outline auf Weiss, Hover `background-color:var(--midnight-blue);color:var(--white)` |
| `.button-m.w-variant-45b5bd25...` (Sekundär transparent) | `button-m`, Hover `background-color:var(--midnight-blue)` |
| `.button-m.w-variant-1f36127b...` (Chip, `secondary-transparent-dark`) | 25 Vorkommen auf der Magazin-Seite, Hover `background-color:var(--midnight-blue);color:var(--white)` |
| `.button-m.cc-secondary-dark` | `border-color:var(--midnight-blue);background-color:#0000`, Hover gefüllt |
| `.button-video` | `background-color:#ffd233;border:1px solid #ffd233;border-radius:.875rem;padding:1rem 1.5rem;font-size:.875rem;font-weight:600;transition:background-color .2s`. Variante weiss-blau: `color:#3e7eff;background-color:#fff;border-color:#3e7eff;padding-top:.5rem;padding-bottom:.5rem` |
| `.button-nav` | `border:1px solid var(--midnight-blue);border-radius:.875rem;padding:1rem 1.5rem;font-weight:600`, Hover `border-color:var(--enpal-gold);background-color:var(--enpal-gold)` |
| `.button-m.w-variant-b60a0a13...` (grün) | Hover `background-color:#70db6d;border-color:#70db6d` |

Alle Icons in Buttons sind Inline-SVG mit `stroke="currentColor" stroke-width="1.5"`
(Pfeil) bzw. `stroke-width="2.5"` (Häkchen), `viewBox="0 0 24 24"` bzw. `"0 0 20 13"`.
Jedes Icon trägt `aria-hidden="true" role="img"`.

### Bilder

| Seite | `<img>` gesamt | `loading="lazy"` | `loading="eager"` | `srcset` | WebP | SVG | AVIF |
|---|---|---|---|---|---|---|---|
| Startseite | 250 | 217 | 32 | 97 | 106 | 120 | 0 |
| Photovoltaik | 211 | 167 | 32 | 54 | 50 | 138 | 0 |
| Wärmepumpe | 239 | 216 | 2 | 63 | 53 | 162 | 0 |
| Magazin | 138 | 136 | 0 | 35 | 36 | 94 | 0 |
| Erfahrungen | 511 | 479 | 30 | 98 | 97 | 390 | 0 |
| Amortisation | 139 | 139 | 0 | 31 | 35 | 100 | 0 |

Formate: WebP und SVG, kein AVIF. Der `<img srcset>` nutzt Webflow-Breitenstufen
(`-p-500`, `-p-800`, `-p-1080`, `-p-1600`, `-p-2000` plus Originalbreite) mit
`sizes="(max-width: 1920px) 100vw, 1920px"` im Hero. `fetchpriority="high"` genau 1x
pro Seite (Hero-Bild). Hero-Bilder haben `loading="eager"`, alles andere `lazy`.
Presse- und Award-Logos im Marquee sind die Ausnahme in die andere Richtung:
`loading="eager"` bei 30 Award-Siegeln.

### Tech-Stack im Detail

| Marker | Befund |
|---|---|
| CMS | Webflow. `data-wf-domain="www.enpal.de"`, `data-wf-page`, `data-wf-site="5e870ec047674e044920655e"`, `<!-- Last Published: Fri Sep 11 2026 13:05:17 GMT+0000 -->`, `w-mod-js`-Class-Script, `w-dyn-item` / `w-dyn-list` für CMS-Listen, `w-tab-pane` für Tabs, `w-dropdown` für Menüs |
| JS-Bundles | `enpal.schunk.1a807f015b216e46.js`, `enpal.schunk.b8b6991873a0661c.js`, `enpal.755c4de1.0cab681a40fbc145.js`, jQuery 3.5.1 von Cloudfront |
| Externe CDNs | `cdn.jsdelivr.net/npm/hls.js@1.6.11`, `cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js`, `cdn.jsdelivr.net/npm/@srexi/purecounterjs`, `cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.0/lottie.min.js` |
| Funnel | `solar-slider.cust.enpal.io` (React, `static/index-BHCKJ_T4.js`), Mount-Funktion `window.mountEnpalSlider(...)`, Diagnose `window.__enpalSliderRuntimeDiagnostics` |
| Consent | `enpal-cookies-v3.min.js`, Speicher `@enpal/lastupdated` mit 7 Tagen, Prefix `tracking_` |
| A-B-Testing | Kameleoon-Engine plus `window.SLIDER_AB_TESTS` und `window.INTERNATIONAL_SLIDER_AB_TESTS` |
| Tag-Management | `GTM-MV7CD8D` |
| Turnstile | `data-turnstile-sitekey="0x4AAAAAAAQTptj2So4dx43e"` auf allen PV-Formularen |
| Sonstiges | `FS`-Finsweet-Attribute für Filter und Scroll-Lock, `x-data` / `x-show` / `x-transition` von Alpine für Toggles |

## Animationen

### Transitions

Alle `transition:`-Deklarationen aus `home.css` plus `shared.css`:

| Anzahl | Wert |
|---|---|
| 3 | `background-color .2s` |
| 3 | `color .2s` |
| 2 | `opacity .2s` |
| 2 | `all .2s` |
| 1 | `background-color .1s,color .1s` |
| 1 | `all .3s` |
| 1 | `filter .2s` |
| 1 | `background-color .2s,color .2s` |
| 1 | `transform .2s` |
| 1 | `box-shadow .3s cubic-bezier(.165,.84,.44,1)` (`.nav-tab-shadow`) |
| 1 | `background-color .3s` |
| 1 | `all .5s cubic-bezier(.19,1,.22,1)` (`.nav-bar-dd_line`) |

Dazu aus Inline-Blöcken und JS:

| Quelle | Wert |
|---|---|
| `.rotating-text span` | `animation-duration:12s`, `animation-iteration-count:infinite`, Delays 0s / 3s / 6s / 9s |
| `html` | `scroll-behavior: smooth` |
| `.marquee` | `animation: marquee-horizontal 40s linear infinite` (Presse) und `60s` (Awards) |
| `.marquee.cc-reversed` | `animation: marquee-horizontal-reverse 25s linear infinite` (Presse) und `40s` (Awards) |
| Funnel-Skeleton `.sl-gradient` | `animation-duration:1.8s`, `linear`, `infinite`, `animation-name: shimmer` |
| `bunny-player__placeholder` etc. | `transition: opacity 0.3s linear, visibility 0.3s linear` |
| `bunny-player__interface` | `transition: all 0.6s cubic-bezier(0.625, 0.05, 0, 1)` |
| `bunny-player__timeline-handle` | `transition: transform 0.15s ease-in-out` |
| Lazy-Video-Poster | `style="opacity: 0; transition: opacity 0.3s ease-in-out;"` |
| Funnel-Titel | `index_Container_JVQtC{opacity:0;animation:.5s forwards index_fadeIn_ahqtK}` |
| Funnel-Slider | `index_SliderWrapper_UCvQK{transition:all .65s ease-in-out}` |
| Funnel-Progress | `index_progress_PMEOh{transition:width .5s ease-in-out}` |
| Funnel-Modal | `transition-property: background-color,border-color,color,fill,stroke,opacity,box-shadow,transform; transition-duration:.3s; transition-timing-function:cubic-bezier(.4,0,.2,1)` |
| Funnel-Button | `background:#ffd233;border-radius:12px`, Hover `#fd6`, Active `#ffe999` |
| Sticky-Nav | `color .2s`, `box-shadow .3s cubic-bezier(.165,.84,.44,1)` |

Splide liefert eigene Vorgabewerte mit: `speed: 400`, `easing: "cubic-bezier(0.25, 1, 0.5, 1)"`,
`interval: 5e3`, `pauseOnHover:!0`, `pauseOnFocus:!0`. Die Erfolgsgeschichten-Slider
werden mit `speed: 800` überschrieben.

### Keyframes

| Name | Quelle | Was animiert |
|---|---|---|
| `rotate` | Inline-Style Homepage (Hero) | Rotierende Subline: `0%` `opacity:0; translateY(100%)`, `10%` `opacity:1; translateY(0)`, `20%` `opacity:1; translateY(0)`, `30%` `opacity:0; translateY(-100%)`, `100%` `opacity:0; translateY(-100%)`. 12s-Zyklus, 4 Spans mit 3s Versatz |
| `marquee-horizontal` | Inline-Style Homepage (2 Varianten: 40s Presse, 60s Awards) | `from { transform: translateX(0); } to { transform: translateX(-50%); }`, `will-change: transform` |
| `marquee-horizontal-reverse` | Inline-Style Homepage (25s Presse, 40s Awards) | `from { transform: translateX(-50%); } to { transform: translateX(0); }` |
| `marquee-horizontal` / `-reverse` | Homepage, zweite Instanz | Presse: `40s` und `25s`. Awards: `60s` und `40s`. Die Werte unterscheiden sich nur, weil die Listen unterschiedlich breit sind |
| `shimmer` | Inline-Style im Funnel-Skeleton | `0% { background-position: -30rem 0; }` bis `100% { background-position: 30rem 0; }`, 1.8s linear infinite, Basis `linear-gradient(to right, #e9ecef 8%, #fafafa 38%, #e9ecef 54%)` mit `background-size: 62rem 40rem` |
| `spin` | `home.css` | `.8s linear infinite spin`, einziger Keyframe im ausgelieferten CSS |
| `index_fadeIn_ahqtK` | Funnel-Bundle | `to { opacity: 1 }`, 0.5s forwards, Start `opacity: 0` |
| `Toastify__spin` | Funnel-Bundle | `0% { transform: rotate(0) }` bis `to { transform: rotate(360deg) }` |
| `splide-loading` | Splide-CSS | Spinner im Slider, `1s linear infinite` |
| `animate-pulse` | Funnel-Bundle (Tailwind-Reste) | Puls für Skeletons |

### Motion-Libraries

| Library | Im HTML erkannt | Belege |
|---|---|---|
| Splide 4.1.4 | ja | Inline-Bundle im Homepage-HTML (`/*! Splide.js Version : 4.1.4 License : MIT */`), 193 Vorkommen `splide`, Init `new Splide('.success-slider', { type: "loop", perPage: 3, perMove: 1, gap: '1.5rem', arrows: true, speed: 800, drag: true, focus: "center", pagination: false, updateOnMove: true, breakpoints: { 991: { perPage: 2 }, 767: { perPage: 1 }, 479: { perPage: 1 } } })` |
| Swiper | indirekt | 7 Vorkommen `swiper` in CSS-Klassen (`swiper-wrapper.is-bekannt-aus`, `swiper-slide.is-community-thumbnail-2.swiper-slide-active .community_img-small`), keine Swiper-JS-Datei im HTML. Vermutlich Altlast im CSS |
| Lottie 5.12.0 | ja, aber nur Über-uns | `cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.0/lottie.min.js`, Konfetti-Animation `Confetti-enpal.json`, `loop: !1, autoplay: !1`, Start per `confettiAnim.goToAndPlay(0, true)` nach 1200 ms |
| PureCounterJS | ja, nur Über-uns | `@srexi/purecounterjs`, `data-countup="140000"`, `start: 1000, end: 140000, duration: 1, once: true, separator: true`, Trigger per `IntersectionObserver` mit `threshold: 0.5` |
| hls.js 1.6.11 | ja | 4 JS-Einbindungen, 6 m3u8-Playlists |
| Bunny Player | ja | 63 Vorkommen `bunny-player`, Custom-Player mit Statusmaschine (`data-player-status="idle"`, `loading`, `playing`, `paused`, `ready`), 2 `IntersectionObserver` mit `threshold: 0.1` |
| Alpine.js 3.x | ja | `x-data="{ activeDot: '' }"`, `x-data="{ voted: false }"`, `x-show`, `x-transition`, `x-on:click` |
| Finsweet | ja | `fs-cmscombine-element="list"`, `fs-scrolldisable-element="preserve"`, `fs-toc-element="contents"`, `r-filter-wrapper="1"`, `r-indexed="input"` |
| GSAP, ScrollTrigger, Lenis, Framer Motion, AOS, Rive, Three.js | nein | 0 Vorkommen von `gsap`, `lenis`, `aos-init`, `data-aos`, `lottie` in `home.html` (ausser dem Lottie-Script auf Über-uns), `framer`, `three` |
| Webflow Interactions | ja, schwach | nur 3 `data-w-id` auf der Startseite: Nav (`57bf9eff-ae6e-a7c7-cf65-54e0a7360ed2`), Nav-Overlay (`...ed4`), Footer (`2b45e9c4-33bd-c458-040e-c098c80fe6d9`). Also fast alle Interaktion sind handgeschriebenes JS, nicht Webflow-IX2 |

### Scroll-Reveal-Muster

Es gibt **kein** generisches Scroll-Reveal-System. Keine `aos-init`, keine
`fade-up`-Klassen, keine `reveal`-Utility, kein Stagger-Muster. Stattdessen 5 einzelne
Trigger:

| Trigger | Code | Zweck |
|---|---|---|
| Video-Autoplay | `const observer = new IntersectionObserver((entries, observer) => { entries.forEach(entry => { if (entry.isIntersecting) { const video = entry.target; const source = video.querySelector("source"); if (!video.src) { source.src = source.dataset.src; video.load(); } video.addEventListener("loadeddata", () => { video.style.opacity = "1"; }); video.play().catch(err => console.error("Autoplay error:", err)); observer.unobserve(video); } }) }, { threshold: 0.01 })` | 3 Videos auf der Startseite laden erst im Viewport und blenden über `opacity 0.3s ease-in-out` ein |
| Trustpilot-Lazy | `if (trustboxRect.top - viewportHeight * 0.2 <= viewportHeight) { loadTrustpilotScript(); window.removeEventListener('scroll', checkProximity); }` | Widget-Skript erst bei 20 % Annäherung |
| Sticky-Nav | `const max = document.documentElement.scrollHeight - innerHeight; const pct = max > 0 ? scrollY / max : 0; nav.classList.toggle("cc-scrolled", pct >= 0.09);` mit `addEventListener("scroll", update, { passive: true })` | Ab 9 % Scrolltiefe wird `cc-scrolled` gesetzt, Nav wird weiss |
| Zähler | `IntersectionObserver` mit `threshold: 0.5`, dann PureCounter | Zähler bis 140.000 plus Konfetti |
| TOC-Fortschritt | `content_toc-progress-line` plus `toc-anchor-wrapper > a[id] { position: absolute; top: -19rem }` | Anker-Korrektur unter dem Sticky-Nav, Fortschrittslinie im TOC |

### Hover-Effekte

| Selektor | Änderung |
|---|---|
| `.button-m:hover` | `background-color:#ffdb5a` |
| `.e_button:hover` | `background-color:#ffdb5a` |
| `.e_button.is-secondary:hover` | `color:#fff;background-color:#072543` |
| `.button-m:hover` (Sekundärvarianten `289fadd0`, `45b5bd25`, `fed8d14b`, `1f36127b`) | `background-color:var(--midnight-blue); color:var(--white)` |
| `.button-m:hover` (Variante `b60a0a13`) | `background-color:#70db6d;border-color:#70db6d` |
| `.button-m.cc-secondary-dark:hover` | `background-color:var(--midnight-blue);color:var(--white)` |
| `.button-video:hover` | `background-color:#ffdb5a` bzw. in einer zweiten Regel `background-color:#0000` |
| `.button-nav.track-portal-link:hover` | `border-color:var(--enpal-gold);background-color:var(--enpal-gold)` |
| `.nav-tab-shadow:hover` | `box-shadow:0 2px 10px #0003`, in einer zweiten Regel `box-shadow:none` |
| `.nav-bar_dd:hover .nav-bar-dd_line` | `width: 100%` (nur ab 992px), Unterstrich der Nav-Tabs fährt auf |
| `.navbar-2_tabs-link:hover` | `background-color:var(--enpal-gold);font-weight:700` |
| `.navbar-2_link:hover` / `.link-navbar:hover` | `color:var(--midnight-blue)` |
| `.e_footer_link:hover` / `.e_footer_legal-link:hover` / `.social-icon:hover` | `color:#ffd233` |
| `.logo_logo:hover` | `filter:saturate(200%)` |
| `.community_img-small.is-small:hover` | `opacity:1` (von `opacity:.5`), dazu Slide-aktiv per `.coll-success-item.splide__slide.is-active .community_small-item { opacity: 1; }` |
| `.splide__arrows--ttb:hover` | `background-color:#fff9e5` |
| `.code-svg.cc-facebook:hover` | `color:var(--enpal-flash-blue)` |
| `.radio-button-category:hover ~ .radio-label-category` | `color: white` |
| `div .toc a:hover` | `color: #ffb000 !important` |
| `.rt-toc a:hover` | `color:#333`, Basis `transition: color 0.3s cubic-bezier(.165,.84,.44,1)` |
| `.index_DatenschutzLink_Q5Rnb a:hover` (Funnel) | `color:#565b5f;text-decoration:underline;text-decoration-thickness:.05rem` |
| Funnel-Button Hover | `background:#fd6`, Active `background:#ffe999` |

### Weitere Bewegung

| Muster | Befund |
|---|---|
| Zähler | 1 auf Über-uns (`140000`, plus Konfetti) |
| Marquees | 4 Instanzen (Presse 40s und 25s, Awards 60s und 40s), je 2 Listenkopien für den Loop, Rand-Ausblendung per `radial-gradient(circle,#f8f8f800,#f8f8f8)` |
| Parallax | keines gefunden |
| Sticky-Sections | Sticky-Nav (`position:fixed`), Sticky-TOC-Sidebar auf Ratgeberseiten (`content_navigation is-right`), Mobile-Bottom-Sheet mit `backdrop-filter: blur(20px)` |
| Video-Autoplay | 3 stumme MP4-Loops auf der Startseite (Hero-Bereich), 6 HLS-Streams auf `/erfahrungen` (`data-player-autoplay="false"`, also klickgesteuert), weitere auf Über-uns und Wärmepumpe |
| Rotierende Headline | 1 auf der Startseite, 4 Phrasen im 12s-Zyklus |
| Kartenrotation | `.card-memory_wrap { transform-style: preserve-3d }` mit `backface-visibility: hidden`, vorhanden im CSS, aber kein Verwendungsort im geprüften HTML |
| Loading-Skeleton | Shimmer auf allen Funnel-Mounts, `#slider-skeleton-loader` mit 4 Karten und `min-height:416px` |
| Reduced Motion | **Nicht vorhanden.** 0 `prefers-reduced-motion`-Regeln in allen 3 CSS-Dateien. Der einzige Treffer im HTML ist die String-Konstante `var v="(prefers-reduced-motion: reduce)"` im eingebetteten Splide-Bundle, die Splide intern für Drag-Verhalten nutzt. Die eigenen Endlos-Marquees, die 12s-Rotationsheadline und der 1.8s-Shimmer laufen ohne Abschaltung weiter |

## Synthese

### 1. Seitentyp-Blueprints

**Startseite** (10 Sections plus Nav):
1. Nav, sticky, 5 Dropdowns, Dauer-CTA `Ersparnis berechnen`, Full-bleed
2. Hero, `min-height:100svh`, H1 plus 4 rotierende Nutzenzeilen, 1 CTA, 3 Häkchen-USPs, 1 Siegel, Full-bleed mit Foto
3. Breakout-Video-Karten, 2-Spalten 50/50, 3 Karten à 16:9, Autoplay im Viewport, Zigzag-Versatz
4. Presse-Marquee, `#f8f8f8`, 7 Logos, 40s links plus 25s rechts
5. Benefits-Bento, 3er-Grid, je Bild plus Icon plus H3 plus Absatz, `layout-m`
6. Referenzen-Carousel, Splide `type:loop`, `perPage:3`, 68 Kundenkarten mit Orts-Tag
7. USP-Liste plus Inline-Funnel, 2-Spalten 40/60, 3 Häkchenpunkte links, Slider rechts
8. Awards-Marquee, `#f8f8f8`, 14 Auszeichnungen, 60s links plus 40s rechts, CTA `Alle Auszeichnungen`
9. Trustpilot plus Deutschlandkarte, 2-Spalten
10. FAQ-Akkordeon, 4 Zeilen, 2-Spalten mit Headline links
11. Zweiter Funnel-Mount ohne Headline
12. Fußnote mit Marktführer-Beleg
13. Footer, 5 Spalten plus 6 Siegel

**Leistungsseite Photovoltaik** (15 Sections plus Nav):
1. Nav Variante `base`
2. Hero, `height:100svh;max-height:70rem`, Preisanker `ab 98 € pro Monat` in der Subline, 3 Highlights plus TÜV-Siegel, 2 CTAs (`Jetzt Ersparnis berechnen` primär, `Mehr erfahren` sekundär als Anker)
3. Inline-Funnel unter H2 `Lohnt sich eine Photovoltaikanlage für Sie?` mit Skeleton
4. Benefits-Grid, 4 Punkte
5. bis 7. Drei Zigzag-Features 50/50 gegenläufig: Modultechnik, Garantie, Lieferkette
8. Schluss-CTA-Block `Die Energielösung von Enpal`
9. 4er-Grid Vorteile `Warum Enpal?`
10. Prozess-Steps, 3 nummerierte Karten, Verbindungspfeil
11. Awards-Marquee
12. FAQ-Akkordeon, 3 Fragen
13. Ratgeber-Hub mit 4 Tabs, Sticky-TOC, Key-Takeaways-Boxen, Rechner, Tabellen, FAQ-Schema
14. Rechner plus Datenmonitor
15. Studien-Sektion
16. Fußnote
17. Footer

**Über-uns** (7 Sections):
1. Hero mit Stats-Spalte (`#1`-Claims plus Zähler 140.000 plus Lottie-Konfetti)
2. Text-Intro
3. Timeline, `background-color: var(--midnight-blue)`, Jahres-Chips 2017 bis 2026, 58 Bilder, Zeilensprung via `:nth-child(even)`
4. Karten-Grid mit 9 Unternehmensbereichen
5. Awards-Marquee
6. Team-Block, 2-Spalten pro Person, Gründerzitat
7. Video-CTA mit Bunny-Player
8. Footer

**Ratgeber-Übersicht** (3 Blöcke):
1. Hero zentriert, H1 plus Erklärtext plus CTA `Expertengespräch vereinbaren`
2. 6 Themenkarten mit je 2 bis 6 Deep-Link-Chips in die Silos
3. Prozess-Steps
4. Footer

**Artikel** (1 Section plus Sidebar):
1. Breadcrumb
2. H1
3. Autorenzeile mit Foto, `Aktualisiert`, `Lesezeit`
4. Key-Takeaways-Box in `#ebf2ff`
5. Inhaltsverzeichnis
6. Artikeltext mit H2-Blöcken, Tabellen in `#faf7f3` mit `border-radius:1rem`
7. Sticky-Sidebar mit TOC-Fortschritt, Google-Bewertung `4,2 basierend auf 13.256 Rezensionen`, CTA `Ersparnis berechnen`
8. Weiterlesen-Box mit 5 Links
9. Voting-Widget
10. Zweiter CTA
11. Footer

**Funnel** (4 Blöcke):
1. H1 `100 % kostenloser Solar-Rechner`, Hintergrundbild mit `fetchpriority="high"` Preload
2. React-Slider mit Skeleton-Loader
3. TÜV-Siegel plus Zertifikatsnummer
4. Mini-Footer
Ablauf im Slider: Bundesland (sortiert nach Nähe) → Haustyp → Dachform → Haushaltsgröße →
Stromnutzungszeitpunkt → Eigentümer → Bestandsanlagen → E-Mail → Name → Telefon → Termin → Erfolg

### 2. Die 5 stärksten Muster

**Muster 1: Zwei-Zeilen-H2 mit grauer Nutzenzeile.**
Jede Sektion hat eine H2 mit `<span>` als Behauptung plus `<span class="span-h2-variant">`
als Erklärung. Beleg: `home.html`, `<h2 class="h2-new"><span>Ergebnisse statt Versprechen</span><span class="span-h2-variant">Getestet. Zertifiziert. Empfohlen.</span></h2>`.
CSS: `.span-h2-variant{color:#6a7c8e;margin-top:.5rem;font-size:2.25rem;font-weight:500;display:block}`.
Das Muster wiederholt sich auf allen 16 geprüften Seiten und macht jede Sektion ohne
zusätzliche Elemente zweistufig lesbar.

**Muster 2: Rotierende Nutzenzeile im Hero statt langer Subline.**
Vier kurze Phrasen ersetzen einen Absatz. Beleg: `home.html`, `@keyframes rotate { 0% { opacity: 0; transform: translateY(100%); } 10% { opacity: 1; transform: translateY(0); } 20% { opacity: 1; transform: translateY(0); } 30% { opacity: 0; transform: translateY(-100%); } 100% { opacity: 0; transform: translateY(-100%); } }`
mit `.rotating-text span{animation-name:rotate;animation-duration:12s;animation-iteration-count:infinite}` und
Delays `0s / 3s / 6s / 9s`. Die Texte: `für 0 € Anzahlung.`, `in über 140.000 deutschen Haushalten.`,
`mit persönlicher Beratung.`, `vom Testsieger.`

**Muster 3: Funnel als externer, mehrfach mountbarer React-Block.**
Derselbe Slider läuft als Skeleton plus Bundle an 3 Stellen der Startseite und in
SEO-Seiten. Beleg: `home.html`, `<div id="solarcheck-neu" class="funnel-wrap cc-complete-pack">`
und `<div id="solarcheck-2" class="pv-slider-001 w-embed">`; Bundle `solar-slider.cust.enpal.io/scripts/enpal-components.min.js`,
`window.mountEnpalSlider(...)`, `document.querySelectorAll(CUSTOM_EMBED_SELECTOR??"div[id^=enpal-]")`.
Der Loader lädt `index.html` per `fetch(sliderHostname+"/index.html?t="+Date.now(),{mode:"cors",cache:"no-store"})`.
Vorteil: ein Funnel, viele Einstiege, A/B-Tests zentral.

**Muster 4: Trust als Dauerband, nicht als Block.**
Presse- und Award-Marquee laufen endlos im Hintergrund und tragen dadurch jeden
Scrollmoment. Beleg: `home.html`, `.marquee { position: absolute; white-space: nowrap; will-change: transform; animation: marquee-horizontal 40s linear infinite; } @keyframes marquee-horizontal { from { transform: translateX(0); } to { transform: translateX(-50%); } }`
und `.preise_overlay { background-image: radial-gradient(circle,#f8f8f800,#f8f8f8); width:100%; height:100%; position:absolute }`.
Insgesamt 4 Marquee-Instanzen (2 Presse, 2 Awards), 14 Presse-Logos plus 30 Awards-Siegel
im DOM, geladen mit `loading="eager"`.

**Muster 5: Ein Akzentfarbwert auf allen Handlungsflächen.**
`#ffd233` liegt auf jedem Primärbutton, ohne Ausnahme, bei 17 Vorkommen in CSS allein
und identisch im Funnel-Bundle (`.brand .components_Button_IVtrJ{color:var(--dark-blue);background:#ffd233;border-radius:12px}`).
Dazu genau eine Hover-Nuance: `.button-m:hover { background-color:#ffdb5a }`. Beleg:
`home.css`, `.button-m{...background-color:#ffd233;border:1px solid #ffd233;border-radius:.875rem;...transition:background-color .2s}`.
Sekundärbuttons bleiben Outline in `var(--midnight-blue)` oder Weiss.

### 3. Animation-Rezepte

**Rezept A: Rotierende Nutzenzeile (exakte Werte von der Seite).**

```css
.rotating-text { position: relative; display: inline-block; vertical-align: bottom; overflow: hidden; }
.rotating-text span {
  position: absolute; left: 0%; top: 0%; width: 100%; right: auto;
  max-width: 100% !important; bottom: auto;
  animation-name: rotate; animation-duration: 12s; animation-iteration-count: infinite;
  opacity: 0; white-space: nowrap; transform: translateY(100%);
}
.rotating-text span:nth-child(1) { animation-delay: 0s; }
.rotating-text span:nth-child(2) { animation-delay: 3s; }
.rotating-text span:nth-child(3) { animation-delay: 6s; }
.rotating-text span:nth-child(4) { animation-delay: 9s; }

@keyframes rotate {
  0%   { opacity: 0; transform: translateY(100%); }
  10%  { opacity: 1; transform: translateY(0); }
  20%  { opacity: 1; transform: translateY(0); }
  30%  { opacity: 0; transform: translateY(-100%); }
  100% { opacity: 0; transform: translateY(-100%); }
}
```

Hinweis: Die Sichtbarkeitsdauer ist kurz (10 % bis 20 % von 12s = 1,2s), die Phrasen
stehen also nur 1,2 Sekunden. Belegt aus `home.html`, Inline-`<style>` im Hero.
Kein Reduced-Motion-Schalter vorhanden, würde man ergänzen.

**Rezept B: Endlos-Marquee mit Rand-Ausblendung.**

```css
.marquee {
  position: absolute; white-space: nowrap; will-change: transform;
  animation: marquee-horizontal 60s linear infinite;
}
@keyframes marquee-horizontal { from { transform: translateX(0); } to { transform: translateX(-50%); } }

.marquee.cc-reversed { animation: marquee-horizontal-reverse 40s linear infinite; }
@keyframes marquee-horizontal-reverse { from { transform: translateX(-50%); } to { transform: translateX(0); } }
```

Container: `.marquees-new { width:100%; min-height:2rem; display:flex; position:relative; overflow:hidden }`.
Rand: `.preise_overlay { background-image: radial-gradient(circle,#f8f8f800,#f8f8f8); width:100%; height:100%; position:absolute }`
mit `pointer-events: off`. Die zweite Liste im DOM ist eine reine Kopie für den Loop.
Auf der Seite laufen Presse mit 40s/25s und Awards mit 60s/40s, also unterschiedliche
Dauern je Liste. `transition-timing-function: linear !important` wird für
`.swiper-wrapper.is-bekannt-aus, .swiper-wrapper.is-preise` zusätzlich gesetzt.

**Rezept C: Video erst im Viewport, dann Fade-in.**

```js
const videos = document.querySelectorAll(".lazy-video");
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const video = entry.target;
      const source = video.querySelector("source");
      if (!video.src) { source.src = source.dataset.src; video.load(); }
      video.addEventListener("loadeddata", () => { video.style.opacity = "1"; });
      video.play().catch(err => console.error("Autoplay error:", err));
      observer.unobserve(video);
    }
  });
}, { threshold: 0.01 });
videos.forEach(video => observer.observe(video));
```

Markup: `<video class="lazy-video" muted playsinline preload="auto" style="opacity: 0; transition: opacity 0.3s ease-in-out;" poster="..."><source data-src="..." type="video/mp4"></video>`.
Kein `loop`-Attribut im Markup, `muted` und `playsinline` gesetzt.

**Rezept D: Sticky-Nav-Farbwechsel ab 9 % Scrolltiefe (exakt).**

```js
const update = () => {
  if (!isDesktop()) return nav.classList.remove("cc-scrolled");
  const max = document.documentElement.scrollHeight - innerHeight;
  const pct = max > 0 ? scrollY / max : 0;
  nav.classList.toggle("cc-scrolled", pct >= 0.09);
};
addEventListener("scroll", update, { passive: true });
addEventListener("resize", update);
MQ.addEventListener?.("change", update);
update();
```

CSS: `.nav-bar.cc-scrolled { background-color: white; }`, dazu `.nav-bar.cc-scrolled .button-nav { color: var(--midnight-blue); border-color: var(--midnight-blue); }`.
Basis `.nav-bar { z-index:999; background-color:var(--white); min-height:6rem; position:fixed; inset:0% 0% auto; padding-left:2.5rem; padding-right:2.5rem; font-size:1.0625rem; font-weight:500; line-height:1.5 }`.

**Rezept E: Nav-Unterstrich beim Hover, exakt.**

```css
@media (min-width: 992px) { .nav-bar_dd:hover .nav-bar-dd_line { width: 100%; } }
.nav-bar-dd_line {
  z-index: 1; background-color: var(--enpal-gold); width: 0%; height: .2rem;
  transition: all .5s cubic-bezier(.19,1,.22,1);
  position: absolute; inset: auto auto 0% 0%;
}
```

Zweite exakte Kurve der Seite: `.nav-tab-shadow { border-radius: 1rem; transition: box-shadow .3s cubic-bezier(.165,.84,.44,1) }`
mit Hover `box-shadow: 0 2px 10px #0003`.

**Rezept F: Funnel-Skeleton-Shimmer, exakt.**

```css
.sl-gradient {
  animation-duration: 1.8s; animation-fill-mode: forwards;
  animation-iteration-count: infinite; animation-name: shimmer;
  animation-timing-function: linear;
  background: linear-gradient(to right, #e9ecef 8%, #fafafa 38%, #e9ecef 54%);
  background-size: 62rem 40rem; position: relative;
}
@keyframes shimmer {
  0%   { background-position: -30rem 0; }
  100% { background-position: 30rem 0; }
}
#slider-skeleton-loader { min-height: 416px; padding: 2.5rem 3rem 3rem 3rem; background-color: #fafafa; }
```

**Nicht belegbar:** Es gibt keine Scroll-Reveal-Animationen mit Stagger, keine
Parallax-Werte, keine `prefers-reduced-motion`-Abschaltung und keine Easing-Kurven
ausserhalb der vier genannten (`cubic-bezier(.19,1,.22,1)`, `cubic-bezier(.165,.84,.44,1)`,
`cubic-bezier(0.625, 0.05, 0, 1)` im Bunny-Player, Splide-Standard `cubic-bezier(0.25, 1, 0.5, 1)`,
Funnel-Modal `cubic-bezier(.4,0,.2,1)`).

### 4. Anti-Patterns / Schwächen

1. **Kein `prefers-reduced-motion`.** 0 Treffer in allen 3 CSS-Dateien und im gesamten
   HTML ausser der Splide-internen Konstante. Vier Endlos-Marquees, eine 12s-Rotationsheadline
   und ein 1,8s-Shimmer laufen ungebremst. Für Sensibilität und Barrierefreiheit ein
   klarer Minuspunkt, und billig zu beheben.
2. **Sitemap-Granularität ohne Struktur.** 2264 URLs in einer flachen `sitemap.xml`,
   davon 319 Einzel-FAQ-Seiten und 1024 `/region/`-Seiten mit kryptischen IDs
   (`/region/1-f273e`). Crawl-Budget wird massiv in Near-Duplicate-Content gesteckt.
3. **`/magazin` ist irreführend.** Der Titel verspricht ein Magazin, im HTML stehen
   6 Themenkarten und 0 Artikellinks. Artikel liegen unter `/photovoltaik/...`.
   Der Nutzer erwartet eine Liste und bekommt einen Link-Hub.
4. **Artikel-Template weicht von den Silos ab.** Artikel haben kein `FAQPage`-Schema
   (`photovoltaik_amortisation.html` enthält 0 `Question`-Typen), die Silos haben 22 bis 26
   Fragen mit Schema. Ebenso fehlt `AggregateRating`, obwohl die Seite selbst
   `4,2 basierend auf 13.256 Rezensionen` anzeigt und Trustpilot einbindet.
5. **Schema-Lücken auf Konversionsseiten.** `/produkt`, `/ueber-uns`, `/erfahrungen`,
   `/standorte`, `/kontakt`, `/faq`, `/magazin`, `/informieren-c1`, `/auszeichnungen`
   haben alle 0 `application/ld+json`. Nur Startseite und die drei Ratgeber-URLs
   liefern strukturierte Daten.
6. **Redundanz im DOM.** Der identische `cc-complete-solution`-Block steht auf 6 Seiten,
   das Awards-Marquee auf 8 Seiten, das Empfehlungs-Banner 2x auf `/erfahrungen`, der
   inline-Funnel 3x auf der Startseite. Das bläht das HTML auf (Startseite 331.688 Bytes,
   FAQ 726.556 Bytes, Erfahrungen 687.391 Bytes) bei dünnem sichtbarem Inhalt.
7. **Tote CTAs und leere Linktexte.** Auf `/produkt` zeigen 2 CTAs auf `#`, 2 Links
   haben den Linktext `‍` (nur Zero-Width-Joiner), auf `/informieren-c1` zeigen
   `Zum Zertifikat` und `HIER` auf `#`.
8. **Veraltete Datumsangaben.** Der Ratgeber-Artikel nennt im sichtbaren Text
   `Die aktuelle Einspeisevergütung in 2025` und `Aktualisiert: 17.07.2024`, bei
   `Today 2026-09-16`. Die Dokumentation läuft also 1 bis 2 Jahre nach.
9. **Nav-Fehlerbildschirm-Umleitung als Reset.** `window.addEventListener('pageshow', ...)`
   mit `if (event.persisted) { location.reload(true); }`, also ein Zwangsreload bei
   Zurücknavigation aus dem Cache, inklusive `console.log('Page loaded from cache - forcing reload')`.
   Das kostet Performance und Scrollposition.
10. **Zwei parallele Navigationssysteme.** `nav-bar` mit `nav-bar_dd`-Dropdowns und
    `navbar-2` mit `w-tabs` existieren gleichzeitig auf derselben Seite, dazu
    `nav-tab-shadow`, `new-navbar_link`, `link-navbar`. Das erklärt die 28-fache
    Wiederholung der Tab-Struktur im HTML und macht Pflege teuer.
11. **Fonts nur als Einzelgewichte.** Poppins wird in 8 separaten WOFF2-Dateien geladen
    statt als Variable Font. Bei 4 Gewichten sichtbar im Layout ist das unnötiger
    Transfer.
12. **Bilderverhältnis.** 250 `<img>` auf der Startseite, davon 120 SVG. Bei den
    30 Award-Siegeln `loading="eager"` statt `lazy`, also alle im kritischen Pfad.

### 5. Conversion-Mechanik in 5 Sätzen

1. Jede Seite baut denselben Druck auf: Preisanker im Hero (`ab 98 €/Monat`,
   `ab 7.999 €`), Dauer-CTA `Ersparnis berechnen` im Nav, in Sektionen und im Footer,
   immer auf dieselbe URL `/informieren-c1`.
2. Der Einstieg ist reibungsarm und beratungslastig: kein Checkout, kein Warenkorb,
   sondern ein Rechner, der in rund 8 Kachelfragen plus 3 Formularschritten zum
   Beratungstermin führt, mit Countdown-Microcopy (`Nur noch 3 Schritte!`) und
   Begründungs-Akkordeons (`Warum benötigen wir diese Information?`).
3. Die Reihenfolge der Datenabfrage ist bewusst: erst Qualifizierung (Bundesland,
   Haustyp, Dachform, Haushaltsgröße, Eigentümer, Bestandsanlagen), dann persönliche
   Daten (E-Mail, Name, Telefon), dann Terminbuchung mit Slot-Knappheit
   (`Nur noch wenige Termine verfügbar`).
4. Trust trägt die Entscheidung ohne Testphase: 14 Auszeichnungen, TÜV-Zertifikat mit
   Nummer, 140.000 Kunden, 68 Kundenstories mit Ortsnamen, Trustpilot, Presse-Logos und
   ein Google-Rating von `4,2 basierend auf 13.256 Rezensionen` direkt neben dem CTA.
5. Nachfrage-Ausbau statt Neukunde: `Freunde empfehlen und 300 € geschenkt bekommen`
   steht in 2 Bannern, im Footer und in der Nav, also drei zusätzliche Lead-Kanäle
   ausserhalb des eigentlichen Funnels.

## Abrufprotokoll

Alle Abrufe am 2026-09-16 mit
`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36`.

| URL | HTTP | Bytes |
|---|---|---|
| https://www.enpal.de/ | 200 | 331688 |
| https://www.enpal.de/photovoltaik | 200 | 549205 |
| https://www.enpal.de/waermepumpe | 200 | 653487 |
| https://www.enpal.de/produkt | 200 | 244499 |
| https://www.enpal.de/ueber-uns | 200 | 387106 |
| https://www.enpal.de/magazin | 200 | 185118 |
| https://www.enpal.de/informieren-c1 | 200 | 29670 |
| https://www.enpal.de/erfahrungen | 200 | 687391 |
| https://www.enpal.de/standorte | 200 | 681652 |
| https://www.enpal.de/kontakt | 200 | 176485 |
| https://www.enpal.de/faq | 200 | 726556 |
| https://www.enpal.de/unser-service | 200 | 268430 |
| https://www.enpal.de/photovoltaik/amortisation | 200 | 232473 |
| https://www.enpal.de/region/100 | 200 | 39787 |
| https://www.enpal.de/auszeichnungen | 200 | 227337 |
| https://www.enpal.de/energie-lexikon | 200 | 345042 |
| https://www.enpal.de/robots.txt | 200 | 124 |
| https://www.enpal.de/sitemap.xml | 200 | 312329 |
| https://cdn.prod.website-files.com/5e870ec047674e044920655e/css/enpal.shared.bb8339bc3.min.css | 200 | 32782 |
| https://cdn.prod.website-files.com/5e870ec047674e044920655e/css/enpal.66013b8282a94b884c137cfd.b7f8ff2e8.opt.min.css | 200 | 296666 |
| https://cdn.prod.website-files.com/5e870ec047674e044920655e/css/enpal.66573f9a6931ff363b62bad3.2e3aa4095.opt.min.css | 200 | 286846 |
| https://cdn.prod.website-files.com/5e870ec047674e044920655e/css/enpal.66013b8282a94b884c1380bb.016fb094b.opt.min.css | 200 | 230326 |
| https://solar-slider.cust.enpal.io/scripts/enpal-components.min.js | 200 | 2616 |
| https://solar-slider.cust.enpal.io/scripts/enpal-cookies-v3.min.js | 200 | 6590 |
| https://solar-slider.cust.enpal.io/index.html | 200 | 340 |
| https://solar-slider.cust.enpal.io/static/index-BHCKJ_T4.js | 200 | 1887350 |

Summe HTML: 18 Abrufe, 5.784.190 Bytes. Summe CSS: 4 Dateien, 846.620 Bytes.
Summe JS: 4 Dateien, 1.896.896 Bytes. Keine URL lieferte einen Fehlerstatus.
Nicht abrufbar: keine.
