# thermondo.de

## Steckbrief

| Feld | Wert |
|---|---|
| Domain | https://www.thermondo.de/ |
| Branche | SHK-Handwerk / Wärmepumpen-Installation, deutschlandweit, B2C-Hausbesitzer |
| Seitentyp | Corporate-Website mit Lead-Funnel und großem Ratgeber-Portal |
| Sprache | Deutsch (`<html lang="de">`) |
| Anrede | Sie (durchgehend: "Holen Sie sich jetzt Ihr Festpreisangebot") |
| Anzahl Seiten in Sitemap | 684 URLs in `sitemap.xml` |
| CMS / Framework Website | Django + Wagtail (Marker: `csrfmiddlewaretoken`, `data-block-key` auf Rich-Text-Blöcken, `/django-admin` in robots.txt) |
| CMS / Framework Funnel | Vue 3 + Vite SPA auf eigener Subdomain `lead-form.thermondo.de`, Token-basiertes Design-System, Tailwind-CSS-Layer |
| CSS-Framework | Bootstrap 5.3.8 (Utilities) + handgeschriebenes Komponenten-CSS |
| Consent | Usercentrics (`app.usercentrics.eu/browser-ui/latest/loader.js`) |
| A/B-Testing | VWO (Visual Website Optimizer), account_id 76531 |
| Tag-Manager | GTM auf eigener Subdomain (`gtm.thermondo.de`, Container `GTM-TSMSBB`) |
| Media-CDN | `media.thermondo.de` (Wagtail-Renditions, `.fill-WxH.format-webp.webp`) |
| Analytics | Sentry (Release-ID im Funnel-Bundle), gtag-Consent-Mode, Microsoft UET |
| Kein Google Fonts | Schriften selbst gehostet als `@font-face` im CSS bzw. in `/assets/` |

## Sitemap

`robots.txt` (109 Bytes): `Disallow: /admin`, `/django-admin`, `/login`; Sitemap-Verweis auf `/sitemap.xml`.

Verteilung der 684 URLs nach Pfadsegment (jeweils erste zwei Ebenen):

| Anzahl | Pfad |
|---|---|
| 490 | `info/rat/...` (Ratgeber) |
| 76 | `unternehmen/presse/...` |
| 28 | `unternehmen/ueber-uns/...` |
| 23 | `info/finanzen/...` |
| 8 | `leistungen/heizsystem/...` |
| 8 | `leistungen/einzelleistungen/...` |
| 8 | `unternehmen/jobs/...` |
| 7 | `standorte/...` |
| 4 | `info/authors/...` |
| 3 | `leistungen/komplettpaket-waermepumpe/...` |
| 6 | weitere Einzelseiten (`/leistungen/`, `/info/`, `/intern/`, `/kunde/`, `/weiterempfehlen/`, `/subsidy-calculator/`) |

Ratgeber-Kategorien mit Artikelzahl: `waermepumpe` 110, `vergleich` 102, `heizen` 99, `erneuerbare-energie` 60, `gas` 50, `oel` 24, `photovoltaik` 20, `info/finanzen/foerderung` 20, `smart` 15, `gesetze` 9.

Hauptnavigation (Top-Level): Produkte (Flyout mit 5 Bildkarten), Ratgeber (Flyout mit 7 Kategorien und je bis zu 7 Artikeln), Empfehlung, Standorte, Kundenservice, Über uns (Flyout), Jobs (Flyout), plus rechts abgesetzt der Button "Zum Angebot". Der Ratgeber-Flyout enthält 74 Link-Einträge insgesamt im Nav-Markup.

## Seiten

### https://www.thermondo.de/ (Startseite)

| Feld | Wert |
|---|---|
| `<title>` | "Wir sind Ihr Heizungsbauer vor Ort \| thermondo" |
| Meta-Description | "thermondo ist Ihr Heizungsbauer für einen bequemen Heizungswechsel ✓ Umfassende Beratung ✓ Festpreisangebot ✓ Inkl. Montage und Fördermittelservice ✓" |
| H1 | "Bequem und zuverlässig zur Wärmepumpe" (2x im DOM, Desktop- und Mobile-Variante) |
| H2 / H3 / H4 | 9 / 6 / 3 |
| Schema.org | Organization, WebPage, PostalAddress |
| canonical | `https://www.thermondo.de/` |
| hreflang | keine |
| og:title | "Schnell und bequem zur Wärmepumpe" |
| theme-color | `#f60439` |

Sektionen in DOM-Reihenfolge:

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Sticky-Header + Nav | "Produkte", "Ratgeber", "Empfehlung", "Standorte", "Kundenservice", "Über uns", "Jobs" | - | Full-width sticky, Flyout-Panels | Logo-SVG 160px | "Zum Angebot" | - | `header__wrapper` fixed, `z-index:99`; auf `.home` ohne Hover transparent (`background-color:transparent`) |
| 2 | Mobile-Conversion-Banner | "Heizungswechsel inkl. Montage" | - | Full-width Sticky-Bottom (`d-lg-none`) | - | "Zum kostenlosen Angebot" | - | `mobile-conversion-banner`, fährt ab 1,3 `innerHeight` Scrolltiefe ein |
| 3 | Hero | "Bequem und zuverlässig zur Wärmepumpe" | "Mit thermondo - Deutschlands Nr. 1" (6 Wörter) | Full-bleed Foto mit überlagerter Gradient-Box links | Hintergrundfoto als CSS-`background-image` in 5 Breakpoint-Varianten (576x260, 1024x300, 1200x700, 1920x800, 3840x800) | "Zum kostenlosen Angebot" | - | `hero__box` mit `linear-gradient(to top right,#d10000,#f60439,#b105f4)`; Höhe 260 bis 800px je Breakpoint |
| 4 | H2-Zwischentitel | "Zur Top-Wärmepumpe mit dem Marktführer" | - | Zentriert, `comp-squeeze-lg` | - | - | - | Struktur trennt Themenblöcke |
| 5 | Zigzag-Feature | H3 "Heizkosten und CO2 einsparen" | - | 2-Spalten 50/50 (`teaser-showcase-large`, Bild links) | WebP-Foto 536x335 | "Mehr zur Wärmepumpe von thermondo" | Zahl "bis zu 22.400 € staatliche Förderung" | Bullet-Liste mit 4 Punkten |
| 6 | Zigzag-Feature | H3 "Stromkosten senken" | - | 2-Spalten 50/50 (Bild links) | WebP 536x335 | "Mehr zum Dream Team aus Wärmepumpe + PV" | - | identische Komponente |
| 7 | Zigzag-Feature | H3 "Energiekosten senken" | - | 2-Spalten 50/50 | WebP 536x335 | "Mehr zu unserem Energiemanager thermondo smart" | Zahl "Bis zu 4.000 € Energiekosten jährlich sparen" | - |
| 8 | Benefits-Grid | H2 "Ihre Vorteile mit thermondo" | - | 3er-Grid (`col-12 col-sm-6 col-lg-4`, 6 Kacheln) | 6 weiße SVG-Icons 80x80 | - | "24h-Notfallhotline", "über 600 Handwerker", "SHK-Innungsmitglied", "bis zu 80 % Förderung" | Auf Gradient-Fläche `linear-gradient(to top right,#d10000,#f60439,#b105f4)` |
| 9 | Testimonials / Trust-Bar | H2 "Das sagt unsere Kundschaft" + H3 "Top-Ratings - volles Vertrauen" | - | Zentriert + Zigzag | Trustpilot-Sterne-SVG von `images-static.trustpilot.com` | "Unsere Kundenbewertungen" | "Hervorragend", **4,4** von 5 aus **20.833** Bewertungen, "Seit 2013 vertrauen uns 60.000+ Kunden", ">16.000 Wechsel zur Wärmepumpe im Bestand" | Trustpilot-Widget nativ nachgebaut, kein iframe |
| 10 | Referral / Lead-Magnet | H2 "Empfehlen Sie uns weiter. Es lohnt sich." + H3 "300 € für Ihre Empfehlung" | - | Zigzag | WebP 536x335 | "Mehr zum Empfehlungsprogramm" (Textlink) | "300 €" Prämie für beide Seiten | - |
| 11 | Recruiting-Teaser | H2 "Bei thermondo einsteigen." + H3 "Mach mit und wachse mit uns" | - | Zigzag | WebP 536x335 | "Jetzt bei thermondo einsteigen" | - | Du-Anrede nur in diesem Block |
| 12 | Final-CTA-Banner | "Wärmepumpe ab 8.700 € nach Förderung" | - | Zentriert breit, Hintergrund `#f5f3ef` mit 60vw großem Kreis-Logo, `opacity:.5` | SVG-Kreislogo | "Zum Festpreisangebot" | "Hervorragend" + Trustpilot-Sterne + Logo | `contact-banner` |
| 13 | Footer | H4 "Thermondo", "Für Sie", "Folgen Sie uns" | - | 3-Spalten + Rechtszeile | 3 Social-Icons | - | "300 € Prämie" | Darüber der 24px hohe Gradient-Streifen `footer__gradient` |

Hero-Formel: H1-Nutzenversprechen "Bequem und zuverlässig zur Wärmepumpe", Subline 6 Wörter, 1 CTA ("Zum kostenlosen Angebot"), kein Trust-Signal im Hero, Medium: Foto als CSS-Hintergrund, Höhe aus CSS-Klasse (800px ab 1200px Viewport, nicht `min-h-screen`, sondern fixe Höhen je Breakpoint).

CTA-Strategie: 6 Buttons mit `t-btn`-Klasse auf der Seite. Labels: "Zum kostenlosen Angebot" (3x), "Zum Angebot" (2x), "Zum Festpreisangebot" (1x). Alle 6 führen auf `https://www.thermondo.de/heizungsplaner/`. Sticky-Header-CTA: ja (`header__cta`, `d-none d-lg-inline-block`), wird nach 70 Prozent Scrolltiefe per JS auf `header--inverted` geschaltet (roter Puls). Telefonnummer im Header: nein, auf keiner der 10 Seiten steht eine Telefonnummer im Header.

Trust-Staffelung: kein Trust-Element im Hero; Trustpilot-Gesamtwertung erst nach dem Benefits-Grid (Position 9 von 13); Kundenbewertungen mit Datum und Klarnamen auf Produktseite; Trustpilot-Sterne im Final-CTA wiederholt; keine Presse-Logos, keine Auszeichnungs-Siegel im Layout der Startseite.

Footer: 3 Spalten. Spalte 1 "Thermondo" (9 Links: Leistungen, Unternehmen, Presse, Karriere, Kontakt, Kundenservice & FAQ, Erfahrungen, Freunde empfehlen, Ethics & Compliance). Spalte 2 "Für Sie" (8 Links in Ratgeber-Kategorien). Spalte 3 "Folgen Sie uns" (YouTube, Instagram, LinkedIn). Keine Ortslisten im Footer. Rechtszeile: "2013 - 2026 | Thermondo GmbH" plus Cookie-Einstellungen, Impressum, AGB, Datenschutz.

### https://www.thermondo.de/leistungen/ (Leistungsübersicht)

| Feld | Wert |
|---|---|
| `<title>` | "Unsere Leistungen im Überblick \| thermondo" |
| Meta-Description | "Bei thermondo erhalten Sie Ihren Heizungsmodernisierung mit Rundum-Service..." |
| H1 | "Bequem und zuverlässig zur Wärmepumpe!" |
| H2 / H3 / H4 | 9 / 0 / 3 |
| Schema.org | keine |
| canonical | `https://www.thermondo.de/leistungen/` |

Sektionen:

| Nr | Sektionstyp | Headline wörtlich | Layout-Familie | CTA-Labels wörtlich | Trust-Elemente |
|---|---|---|---|---|---|
| 1 | Nav + Sticky-Header | siehe Startseite | Full-width | "Zum Angebot" | - |
| 2 | Hero (kompakt) | "Bequem und zuverlässig zur Wärmepumpe!" | Full-bleed mit Gradient-Box | - | - |
| 3 | Intro + Prozess | "Ihr Umstieg auf die Wärmepumpe in guten Händen" | Zentriert schmal | - | - |
| 4 | Produkt-Karten | "Wärmepumpe kaufen inkl. Installation" | 3er-Grid (`showcase`) | - | - |
| 5 | Förder-Block | "Wärmepumpe ab 8.700 € dank 80 % Förderung" | Zentriert | - | Förderhöhe |
| 6 | Preis-Block | "Sie kennen alle Kosten von Anfang an" | Zentriert | - | "Festpreisangebot" |
| 7 | Testimonials | "Über 50.000 zufriedene Kunden sind überzeugt! Unsere besten Argumente:" | Zentriert | - | "50.000 zufriedene Kunden" |
| 8 | Produkt-Karten | "Wärmepumpe von thermondo" | Karten-Grid | - | - |
| 9 | Produkt-Karten | "Top-Wärmepumpen" | Karten-Grid | - | - |
| 10 | Testimonials | "Unsere Kunden sind begeistert" | Carousel | - | Kundenstimmen |
| 11 | Final-CTA-Banner | "Wärmepumpe ab 8.700 € nach Förderung" | Zentriert | "Zum Festpreisangebot" | Trustpilot |
| 12 | Footer | - | 3 Spalten | - | - |

CTA-Strategie: 4 CTAs, Labels "Zum Angebot" (2x), "Zum kostenlosen Angebot", "Zum Festpreisangebot". Alle auf `/heizungsplaner/`.

### https://www.thermondo.de/leistungen/waermepumpe-kaufen/ (Kern-Produktseite)

| Feld | Wert |
|---|---|
| `<title>` | "Wärmepumpe: Installation, Kosten & Förderung 2026" |
| Meta-Description | "Leistungsstarke Luft-Wasser-Wärmepumpe für den Altbau kaufen ✅ Inkl. Lieferung und zuverlässiger Installation ✅ Jetzt unabhängig von fossilen Brennstoffen werden" |
| H1 | "Wärmepumpe kaufen: Zukunftssicher Heizen mit thermondo" |
| H2 / H3 / H4 | 13 / 4 / 3 |
| Schema.org | FAQPage, Question, Answer |
| canonical | `https://www.thermondo.de/leistungen/waermepumpe-kaufen/` |
| Bilder | 41 `<img>`, davon 6 mit `class="lazy"`, 34 Dateien im Format webp, 0 mit `loading=lazy`, 0 mit `fetchpriority`, 2 mit `srcset` |
| Wortzahl im Body | ~2.400 einschließlich Navigation und Footer |

Sektionen in DOM-Reihenfolge:

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente |
|---|---|---|---|---|---|---|---|
| 1 | Nav + Sticky-Header | siehe Startseite | - | Full-width | - | "Zum Angebot" | - |
| 2 | Hero (kompakt) | "Wärmepumpe kaufen: Zukunftssicher Heizen mit thermondo" | - | Full-bleed | Hintergrundfoto | - | - |
| 3 | Zigzag-Feature | H2 "Unsere Luft-Wasser-Wärmepumpen für Bestands- und Altbau:" | - | Zigzag (`highlight`) | WebP 600x600 | - | - |
| 4 | Produkt-Karte | H2 "Buderus Logatherm WLW186i AR" | "gilt als besonders leistungsstark ... leiseste Wärmepumpe auf dem Markt" | Zigzag | WebP | "Zur Buderus Logatherm" | "28,5 dB (5 kW)", "leiseste Wärmepumpe auf dem Markt" |
| 5 | Produkt-Karte (reversed) | H2 "LG Therma V R290" | "Vorlauftemperatur bis 75 °C ... SCOP-Wert von bis zu 5,23" | Zigzag reversed | WebP | "Zur LG Therma V" | "SCOP-Wert von bis zu 5,23" |
| 6 | FAQ-Akkordeon | H2 "Fragen und Antworten zum Wärmepumpenkauf mit thermondo" | - | Akkordeon (`handorgel`) | - | - | - |
| 7 | Autoritäts-Block | H2 "Leistungsstarke Wärmepumpen vom Testsieger" | "Die Luft-Wasser-Wärmepumpe der Logatherm-Reihe von Buderus wurde 2024 von Stiftung Warentest in der Leistungsklasse bis 10 kW mit der Note „GUT" (2,3) zum Testsieger gekürt." | Zentriert schmal (`comp-squeeze-lg`) | - | - | "Stiftung Warentest", "Note GUT (2,3)", Fußnote "punktgleich mit einem Wettbewerber" |
| 8 | On-Page-Funnel | "Festpreisangebot in nur 2 Minuten anfragen" | "Für welchen Gebäudetyp benötigen Sie eine neue Heizung?" | 6er-Grid aus Kachel-Buttons mit SVG-Icons | 6 SVG-Haus-Icons 60x60, Checkmark-Animation | Kacheln "Einzelhaus", "Doppelhaushälfte", "Reihenendhaus", "Reihenmittelhaus", "Mehrfamilienhaus", "Wohnung" | - |
| 9 | Content-Block | H2 "Wärmepumpen bei thermondo: Ab 8.700 € im Komplettpaket" | "Unser Komplettpaket umfasst die Beratung, Planung sowie die vollständige Installation" | Zentriert schmal | - | - | "über 15.000 Installationen", "durchschnittlich 32.000 € vor Förderung", "ab 8.700 €" |
| 10 | Testimonials-Carousel | H2 "Das sagen einige unserer Kunden über ihre thermondo-Erfahrung" | Caption "Unsere Lieblingsbewertungen" | Carousel/Slider (`swiper`, 9 Slides) | Trustpilot-Sterne-SVG | "Mehr Bewertungen" | Trustpilot-Sterne pro Slide, Datum, Klarname ("Maria Seyler", "Alexander D.") |
| 11 | Content-Block | H2 "Mit Wärmepumpe langfristig sicher & sparsam heizen" | "Neue Heizungen müssen gem. GEG 2024 mindestens 65 Prozent erneuerbare Energien nutzen." | Zentriert schmal | - | - | Gesetzesbezug GEG 2024 |
| 12 | Promotion-Banner | "Flexible Finanzierung: Wärmepumpe ab 78 € im Monat" | "Mit der neuen Finanzierungsmöglichkeit thermondo flex profitieren Sie ab sofort von einer flexiblen Ratenfinanzierung" | 2-Spalten 50/50 (`promotion-banner-product`) | WebP 600x600 | "Zum Festpreisangebot" | "Laufzeit von 15 Jahren", "Sondertilgungen", "ohne Zusatzkosten" |
| 13 | Info-Box mit Icon | H3 "Feldtest bestätigt: Wärmepumpen heizen auch im Bestand effizient" | "die Ergebnisse eines Forschungsprojekts des Fraunhofer-Instituts¹" | Zentriert schmal (`info-box--with-icon`) | CSS-Icon | - | "Fraunhofer-Institut", "56 Bestandsgebäude (15 bis 170 Jahre alt)", "1,9 % Heizstab-Anteil" |
| 14 | Final-CTA-Banner | "Wärmepumpe ab 8.700 € nach Förderung" | - | Zentriert | Kreislogo | "Zum Festpreisangebot" | Trustpilot |
| 15 | Footer | - | - | 3 Spalten | - | - | - |

CTA-Strategie: 10 CTAs. "Zum Festpreisangebot" (4x), "Zum Angebot" (2x), "Zum kostenlosen Angebot" (1x), plus 3 produktspezifische Text-Buttons ("Zur Buderus Logatherm", "Zur LG Therma V", "Mehr Bewertungen"). Ziele: 5x `/heizungsplaner/?energy_source_new=air_to_water_heat_pump`, 3x `/heizungsplaner/`, 1x Trustpilot-Profil, 2x Marken-Unterseiten. Alle Conversion-CTAs laufen in denselben Funnel, die Deep-Link-Variante setzt den Fragebogen direkt auf "Wärmepumpe".

On-Page-Funnel: ein Schritt inline, Frage `building_type`, 6 Kachel-Antworten ohne Freitext, die per `form method="post"` auf `/heizungsplaner/` mit `?building_type=<wert>` weiterleiten (JS: `setTimeout(..., s||isAbTest?400:0)`, also 400ms Verzögerung für die Checkmark-Animation). Keine Fortschrittsanzeige, keine Datenerhebung an dieser Stelle.

### https://www.thermondo.de/leistungen/waermepumpe-mit-pv-kaufen/ (Bundle-Seite)

| Feld | Wert |
|---|---|
| `<title>` | "Wärmepumpe mit Photovoltaik im Komplettpaket kaufen" |
| Meta-Description | "Wärmepumpe mit Photovoltaik kaufen" |
| H1 | "Wärmepumpe mit Photovoltaik kaufen" |
| H2 / H3 / H4 | 8 / 4 / 3 |
| Schema.org | FAQPage, Question, Answer |
| canonical | `https://www.thermondo.de/leistungen/waermepumpe-mit-pv-kaufen/` |
| Bilder | 21 `<img>`, 6 mit `class="lazy"`, 2 mit `srcset`, 1 `<picture>` mit 7 `<source>`-Breakpoints (320 bis 1200px Breite) |

Sektionen:

| Nr | Sektionstyp | Headline wörtlich | Layout-Familie | CTA-Labels wörtlich | Trust-Elemente |
|---|---|---|---|---|---|
| 1 | Hero | "Wärmepumpe mit Photovoltaik kaufen" | Full-bleed | - | - |
| 2 | Benefits-Block | "Wärmepumpe mit Photovoltaik: Bis zu 3.600 € pro Jahr sparen" | Zentriert | - | "Bis zu 3.600 € pro Jahr" |
| 3 | Prozess-Steps | H2 "So einfach gehts!" | 3er-Grid (`showcase`, Icon über Text) | - | - |
| 4 | Zwischen-CTA | "Jetzt Wärmepumpe mit Photovoltaik im Komplettpaket" | Zentriert (`cta-teaser`) | "Zum Festpreisangebot" | - |
| 5 | Content + Produktbild | H2 "Das steckt in der Kombination" | Zentriert + Full-width-Bild | - | "über 6.000 installierte Wärmepumpen", "FEBESOL, das bereits über 7.000 Solaranlagen verbaut" |
| 6 | Produktbeschreibung | H3 "Wärmepumpe von thermondo", H3 "Die FEBESOL Photovoltaikanlage", H3 "Wer ist FEBESOL?" | Textblöcke | - | - |
| 7 | Video-Testimonials | H2 "Erfahrungsbericht: Wärmepumpe mit Photovoltaik" (2x im DOM) | Carousel (`swiper`) | - | Kundenstimmen als Video |
| 8 | FAQ-Akkordeon | H2 "Wärmepumpe und Photovoltaikanlage kaufen – FAQ" | Akkordeon (`handorgel`) | - | - |
| 9 | Final-CTA | "Wärmepumpe ab 8.700 € nach Förderung" | Zentriert | "Zum Festpreisangebot" | Trustpilot |

### https://www.thermondo.de/unternehmen/ueber-uns/ (Über uns)

| Feld | Wert |
|---|---|
| `<title>` | "Lernen Sie uns kennen \| Thermondo" |
| Meta-Description | "Thermondo ist Deutschlands größter Heizungsbauer mit Sitz in Berlin. Erfahren Sie hier mehr über das Unternehmen." |
| H1 | "Gemeinsam machen wir Wohnen klimaneutral!" |
| H2 / H3 / H4 | 7 / 4 / 3 |
| Schema.org | keine |
| canonical | `https://www.thermondo.de/unternehmen/ueber-uns/` |

Sektionen:

| Nr | Sektionstyp | Headline wörtlich | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente |
|---|---|---|---|---|---|---|
| 1 | Hero | "Gemeinsam machen wir Wohnen klimaneutral!" | Full-bleed | Video (`data-video-player`, plyr) mit "Mehr lesen"/"Weniger lesen"-Toggle | - | - |
| 2 | Mission | H2 "Was uns antreibt" (2x im DOM) | Zentriert | - | - | - |
| 3 | Zähler / Stats | H2 "thermondo Fakten." | 3er-Grid auf Gradient-Fläche (`usp__wrapper`) | 3 weiße SVG-Icons | - | "über 1.200 Profis", "mehr als 50.000 Heizungen ausgetauscht", "knapp 3 Millionen Tonnen CO₂ vermieden", "Gründung 2013" |
| 4 | Zigzag-Features | H2 "Was uns auszeichnet." | 4x Zigzag | 4 WebP-Fotos 536x335 | - | "über 600 festangestellte Handwerker:innen", "über 55.000 Installationen" |
| 5 | Team | H2 "Unser Management." | Karten-Grid | Fotos | - | Management-Porträts |
| 6 | Recruiting-CTA | H2 "Neugierig?" | Zentriert | - | - | - |
| 7 | Final-CTA | "Wärmepumpe ab 8.700 € nach Förderung" | Zentriert | Kreislogo | "Zum Festpreisangebot" | Trustpilot |
| 8 | Footer | - | 3 Spalten | - | - | - |

CTA-Strategie: nur 4 CTAs ("Zum Angebot" 2x, "Zum kostenlosen Angebot", "Zum Festpreisangebot"), alle auf `/heizungsplaner/`. Die Unternehmensseite verzichtet auf eigene Abschlüsse und schiebt denselben Funnel nach.

### https://www.thermondo.de/info/rat/waermepumpe/ (Ratgeber-Hub)

| Feld | Wert |
|---|---|
| `<title>` | "Alles zum Thema Heizen mit Wärmepumpe \| thermondo" |
| Meta-Description | "Eine Ratgeberkategorie, die Ihnen einen Überblick zum Thema Wärmepumpe verschafft..." |
| H1 | "Heizen mit Wärmepumpe" |
| H2 / H3 / H4 | 3 / 0 / 4 |
| Schema.org | keine |
| canonical | `https://www.thermondo.de/info/rat/waermepumpe/` |

Sektionen:

| Nr | Sektionstyp | Headline wörtlich | Layout-Familie | CTA-Labels wörtlich |
|---|---|---|---|---|
| 1 | Mobile-Conversion-Banner | "Heizungswechsel inkl. Montage" | Sticky-Bottom | "Zum kostenlosen Angebot" |
| 2 | Seitenkopf | "Heizen mit Wärmepumpe" | Zentriert (`layout--sidebar` .head) | - |
| 3 | Intro | "Die Wärmepumpe ist der Gamechanger für klimaneutrales Heizen. Erfahren Sie alles zu dieser Zukunftstechnologie." | Zentriert schmal (`intro-text`) | - |
| 4 | Artikel-Grid "Top" | H2 "Top-Artikel Wärmepumpe:" | 3er-Grid (`free-list grid-teaser`) | - |
| 5 | Artikel-Grid "Alle" | H2 "Alle Artikel zur Wärmepumpe:" | 3er-Grid, viele Karten | - |
| 6 | Sidebar-Empfehlung | H4 "Passende Heizung finden" | Sticky-Sidebar (`sidebar`, 25 Prozent Breite, `d-none d-lg-block`) | - |
| 7 | Final-CTA | "Wärmepumpe ab 8.700 € nach Förderung" | Zentriert | "Zum Festpreisangebot" |
| 8 | Footer | - | 3 Spalten | - |

Kartenaufbau (`teaser`): Bild 380x220, Titel als Link, `teaser__intro-text` per `-webkit-line-clamp` auf 2 Zeilen (Titel) bzw. 3 bis 4 Zeilen (Text) gekürzt. Karte hebt sich beim Hover per `box-shadow` von `rgba(0,0,0,.15) 0 0 5px` auf `rgba(0,0,0,.2) 0 0 15px`.

### https://www.thermondo.de/info/rat/waermepumpe/waermepumpe-kosten/ (Ratgeber-Artikel)

| Feld | Wert |
|---|---|
| `<title>` | "Wärmepumpe Kosten 2026: Preise, Förderung & Eigenanteil" |
| Meta-Description | "Was kostet eine Wärmepumpe 2026? 💡 Preise von 27.000–50.000 € ✅ bis zu 80 % Förderung ✅ und Ihr realer Eigenanteil ✅ mit Beispielrechnung. Jetzt informieren!" |
| H1 | "Wärmepumpe Kosten 2026: Preise, Förderung & Eigenanteil" |
| H2 / H3 / H4 | 15 / 7 / 4 |
| Schema.org | Article, WebPage, ImageObject, Person, Organization, FAQPage, Question (6x), Answer (6x) |
| canonical | `https://www.thermondo.de/info/rat/waermepumpe/waermepumpe-kosten/` |
| Autor | Luisa Ney (`/info/authors/7/`), Schema `Person` |
| datePublished | 2023-02-17T14:25:12+01:00 |
| dateModified | 2026-09-16T15:16:13+02:00 |
| Textlänge | ~5.559 Wörter im `<article>`-Element (inkl. Tabellen, FAQs, verwandter Artikel) |
| Bilder | 41 `<img>` auf der Seite, 32 davon im Artikel; Formate: 59 SVG, 5 JPG, 3 PNG, 2 WebP |
| Interne Links im Artikel | 40 |
| Externe Links im Artikel | 5 |
| Lesezeit | nicht angegeben |
| Breadcrumbs | ja, `BreadcrumbList` (Startseite > Heizungswissen > ...), dunkler Balken `#1a1a1a` |

Aufbau des Artikels in DOM-Reihenfolge:

| Nr | Element | Inhalt | Hinweis |
|---|---|---|---|
| 1 | Breadcrumbs | "thermondo Startseite" > … | Schema `BreadcrumbList` mit `itemprop` |
| 2 | H1-Block mit Meta | H1 + "Ein Artikel von Luisa Ney" + "Zuletzt aktualisiert am: 16.09.2026" | Autor und Datum sichtbar |
| 3 | Key-Takeaways-Box | H2 "Wärmepumpe Kosten & das Wichtigste in Kürze:" | 6 Bullets mit fett gedruckten Kennzahlen (27.000 bis 50.000 €, 80 %, 8.700 €, 1.940 €/Jahr, 730 € Ersparnis) |
| 4 | Inhaltsverzeichnis | "Themen auf dieser Seite" (`jumplinks`) | 11 Einträge, mit `data-scroll-to` und Offset 84px (Mobile) bzw. 132px (Desktop) für den Sticky-Header |
| 5 | Fließtext-Abschnitte | 15 H2-Blöcke von "Was kostet eine Wärmepumpe in 2026?" bis "Fazit: Lohnen sich die Kosten für eine Wärmepumpe?" | Jede H2 hat `id` als Sprungziel plus leeren `<div class="jumplink-anchor">` |
| 6 | Rechner-Einbettung | H2 "thermondo Kostenrechner: Berechnen Sie Ihre Kosten einer Wärmepumpe selbst" | `<div data-tco-calculator>` als Mount-Punkt |
| 7 | Zwischen-CTAs | 4x `cta-teaser` mit Headline "Luft-Wasser-Wärmepumpe ab 8.700 € bei 80 % Förderung" | Button "Zum Festpreisangebot" |
| 8 | Info-Box | H3 "Welche Möglichkeiten gibt es noch, um die Heizkosten zu berechnen?" | `info-box--with-icon`, ein Vorkommen |
| 9 | Autor-Box | Bild 50x50 + "Luisa ist Autorin dieses Artikels und unsere Expertin auf den Gebieten Photovoltaik, Wärmepumpe und Energiewende. …schreiben Sie ihr: fragen@thermondo.de" | E-Mail-Adresse der Autorin als Kontaktweg |
| 10 | Verwandte Artikel | "Weitere Artikel zum Thema Heizen mit Wärmepumpe" | 6 `grid-teaser__item` |
| 11 | Sticky-Sidebar | "mehr zum thema" + "Weitere Artikel dazu" | 48 Sidebar-Link-Einträge insgesamt, 25 Prozent Spaltenbreite ab 1024px |
| 12 | Final-CTA + Footer | "Wärmepumpe ab 8.700 € nach Förderung" | Trustpilot im Banner |

FAQ: 9 Fragen im `handorgel`-Akkordeon direkt im Artikel, dieselben 6 Fragen zusätzlich als `FAQPage`-Schema. Zwischen-CTA-Dichte: 15 `cta-teaser`-Vorkommen im Artikelbereich, 9 tatsächliche Buttons.

### https://www.thermondo.de/leistungen/kundenmeinungen/ (Referenzen)

| Feld | Wert |
|---|---|
| `<title>` | "thermondo Erfahrungen: Das sagen unsere Kunden" |
| Meta-Description | "Welche Erfahrungen machten unsere Kunden? ✅ Kundenbewertungen geben Ihnen einen Überblick ➤ Hier lesen!" |
| H1 | "thermondo Erfahrungen: Das sagen unsere Kunden" |
| H2 / H3 / H4 | 4 / 0 / 3 |
| Schema.org | keine |
| canonical | `https://www.thermondo.de/leistungen/kundenmeinungen/` |

Sektionen:

| Nr | Sektionstyp | Headline wörtlich | Layout-Familie | CTA-Labels wörtlich | Trust-Elemente |
|---|---|---|---|---|---|
| 1 | Hero | "thermondo Erfahrungen: Das sagen unsere Kunden" | Full-bleed | - | - |
| 2 | Trustpilot-Widgets | - | Carousel + Karten-Grid (`customer-reviews`) | "Mehr Information" | Trustpilot-Sterne, Datum, Klarnamen, "Alles anzeigen"-Modal je Bewertung |
| 3 | CTA-Teaser | - | Zentriert | "Alle Kundenbewertungen ansehen" | Link auf `de.trustpilot.com/review/www.thermondo.de` |
| 4 | Video-Testimonials | H2 "Unsere Kunden-Storys" | Carousel (`swiper`, `video-teaser__item`) | - | 3 YouTube-Videos: "Zu Besuch bei Familie Weidner", "Zuhause bei Familie van Schaik" u.a., mit `data-video-player` (plyr) |
| 5 | Benefits | H2 "Ihre Vorteile mit thermondo" | 3er-Grid | - | - |
| 6 | Prozess | H2 "Schnell und zuverlässig zur Wärmepumpe" | 3er-Grid | - | - |
| 7 | Final-CTA | "Wärmepumpe ab 8.700 € nach Förderung" | Zentriert | "Zum Festpreisangebot" | Trustpilot |
| 8 | Footer | - | 3 Spalten | - | - |

CTA-Strategie: 7 CTAs. "Zum Angebot" (2x), "Zum Festpreisangebot" (2x), "Zum kostenlosen Angebot", "Alle Kundenbewertungen ansehen" (extern Trustpilot), "Mehr Information".

### https://www.thermondo.de/standorte/ (Standorte)

| Feld | Wert |
|---|---|
| `<title>` | "Standorte in Ihrer Nähe \| thermondo vor Ort" |
| Meta-Description | "thermondo hat Standorte in ganz Deutschland. Finden Sie heraus, ob wir auch in Ihrer Nähe aktiv sind..." |
| H1 | "thermondo bei Ihnen vor Ort" |
| H2 / H3 / H4 | 3 / 6 / 3 |
| Schema.org | keine |
| canonical | `https://www.thermondo.de/standorte/` |

Sektionen:

| Nr | Sektionstyp | Headline wörtlich | Layout-Familie | CTA-Labels wörtlich | Trust-Elemente |
|---|---|---|---|---|---|
| 1 | Hero | "thermondo bei Ihnen vor Ort" | Full-bleed | - | - |
| 2 | PLZ-Check | - (Eingabefeld `maxlength="5" inputmode="numeric"`) | Zentriert schmal (`zipcode-search-small`) | "Suchen"; bei Treffer "Zum Festpreisangebot" | Erfolgstext "Gute Nachricht! Wir sind auch in Ihrer Nähe." / Fehlertext "Leider sind wir in Ihrer Nähe nicht verfügbar." |
| 3 | Content | H2 "Unsere Installationsteams deutschlandweit" | Zentriert schmal | "Zum Festpreisangebot" | "24-Stunden-Servicehotline", "Standorte in ganz Deutschland" |
| 4 | Benefits-Grid | H2 "Ihre Vorteile mit thermondo" | 3x2-Grid (`showcase showcase--space-evenly`) | - | H3 "Alles aus einer Hand", "Festpreisangebot", "Ihre Wärmepumpe auf Raten", "Auch in Ihrer Region", "Höchste Qualität", "Geld vom Staat zurück" |
| 5 | Final-CTA | "Wärmepumpe ab 8.700 € nach Förderung" | Zentriert | "Zum Festpreisangebot" | Trustpilot |
| 6 | Footer | - | 3 Spalten | - | - |

Nur 6 Standort-Unterseiten in der Sitemap (`neue-heizung-berlin`, `-niedersachsen`, `-muenchen`, `-baden-wuerttemberg`, `-augsburg`, `-goeppingen`). Die Seite nutzt stattdessen einen PLZ-Check gegen `window.TNS.config.backend.url + /api/zipcode`, ohne Ortsverzeichnis im Footer.

### https://www.thermondo.de/heizungsplaner/ (Funnel-Einstieg)

| Feld | Wert |
|---|---|
| `<title>` | "Heizungsplaner" |
| Meta-Description | leer (`content=""`) |
| H1 | "Jetzt zur Wärmepumpe wechseln & bis zu 45% Heizkosten sparen." |
| H2 / H3 / H4 | 0 / 0 / 0 |
| Schema.org | keine |
| canonical | `https://www.thermondo.de/heizungsplaner/` |
| Body-Klasse | `body-lead-form` (Hintergrund `#f5f3ef`) |

Aufbau: zweispaltiger Split-Screen. Links der Persuasion-Block, rechts die geladene App.

| Nr | Element | Inhalt |
|---|---|---|
| 1 | Kopf | Logo plus Trustpilot-Zeile "Hervorragend \| 20.833 Bewertungen" und 4,5-Sterne-SVG von `images-static.trustpilot.com` |
| 2 | H1 | "Jetzt zur Wärmepumpe wechseln & bis zu 45% Heizkosten sparen." |
| 3 | Pfeil-Grafik | SVG `arrow.4f8c5d77f8ee.svg` zeigt auf den Formularbereich |
| 4 | App-Container | `<div id="app">` mit `<div class="loader__wrapper"><div class="loader"></div></div>` als Ladezustand |
| 5 | Mini-Footer | "© 2026 thermondo GmbH \| Impressum \| Datenschutz \| Cookie-Einstellungen" |

Funnel-Technik: Die Seite lädt beim `DOMContentLoaded` per `new TNS.website.AppLoader('https://lead-form.thermondo.de/', 'module')` das HTML der Subdomain, zieht daraus alle `<script src>` und `<link rel=stylesheet>` und hängt sie in den Host-Head. Beim Standalone-Aufruf rendert die App in einen Shadow Root.

Funnel-Struktur aus `lead-form.thermondo.de/assets/index-DXf272In.js`, Konstante `JSON.parse('{"brennstoff-neu":…')`, 29 Schritte:

| Schlüssel | `step_key` (Backend) | Komponente | Frage wörtlich |
|---|---|---|---|
| brennstoff-neu | energy_source_new | QuestionChoice | "Wie möchten Sie in Zukunft heizen?" |
| brennstoff-alt | energy_source_old | QuestionChoice | "Wie heizen Sie aktuell?" |
| alte-heizungsanlage | years_since_old_heating_was_mounted | QuestionChoice | "Wie viele Jahre ist Ihre alte Heizung schon in Betrieb?" |
| verrohrung | pipeline_system_exists | QuestionChoice | "Liegt in Ihrem Haus eine komplette Heizungsverrohrung vor?" |
| gebaeudetyp | building_type | QuestionChoice | "Für welchen Gebäudetyp benötigen Sie eine neue Heizung?" |
| gebaeudeeigentuemer | customer_is_building_owner | QuestionChoice | "Sind Sie Eigentümer der Immobilie?" |
| gebaeudealter | building_year_built | QuestionChoice | "Wann wurde die Immobilie gebaut?" |
| wohnflaeche | building_heated_area | QuestionChoice | "Wie groß ist die zu beheizende Wohnfläche?" |
| bewohner | people_count | QuestionChoice | "Wie viele Personen leben im Haushalt?" |
| waermeverteilung | heat_distribution | QuestionChoice | "Wie werden Ihre Räume beheizt?" |
| montagezeitraum | planned_installation_time | QuestionChoice | "Wann soll die neue Heizung installiert werden?" |
| heizung-etage | floor_new_heating | QuestionChoice | "Wo im Haus befindet sich Ihre Heizung?" |
| gas-verbraucht | old_heating_energy_consumption | QuestionChoice | "Wie viel Heizenergie in kWh benötigt Ihr Haus in einem Jahr?" |
| oel-verbraucht | old_heating_energy_consumption | QuestionChoice | "Wie viel Liter Heizöl verbrauchen Sie in einem Jahr?" |
| pv | pv_system_existing_or_planned | QuestionChoice | "Sind Sie zusätzlich an einer Photovoltaikanlage zur Senkung Ihrer Stromkosten interessiert?" |
| plz | zipcode | Zipcode | "Verfügbarkeit prüfen" |
| anfragen | inquire | Inquire | "Erstellung Ihres Festpreisangebots" |
| sq-eigentuemer | sq_ownership | QuestionChoice | "Bewohnen Sie Ihr Eigentum selbst?" |
| sq-kamin | sq_kamin | QuestionChoice | "Haben Sie einen wasserführenden Kamin?" |
| sq-kamin-integrate | sq_kamin_integrate | QuestionChoice | "Möchten Sie den Kamin an den Heizkreis anbinden?" |
| sq-solarthermie | sq_solarthermie | QuestionChoice | "Haben Sie Solarthermie auf dem Dach?" |
| sq-heating-age | years_since_old_heating_was_mounted | QuestionChoice | "Wie viele Jahre ist Ihre alte Heizung schon in Betrieb?" |
| sq-review | sq_review | SelfQualifyReview | (Review-Seite ohne Frage) |
| sq-adresse | sq_address | SelfQualifyAddress | (Adresseingabe) |
| sq-terminbuchung | sq_booking | SelfScheduleBooking | "Terminauswahl" (iframe) |
| sq-disqualified | sq_disqualified | SelfQualifyExit | "Leider können wir Ihnen im Moment keinen Termin anbieten." |
| sq-opted-out | sq_opted_out | SelfQualifyOptedOut | "Vielen Dank für Ihr Interesse" |
| sq-clarification | sq_clarification | SelfQualifyExit | "Lassen Sie uns das telefonisch klären" |
| sq-session-expired | sq_session_expired | SelfQualifySessionExpired | "So geht Ihre Festpreisanfrage weiter" |

Fragetypen: ausschließlich `QuestionChoice` mit Kachel-Antworten, dazu `Zipcode` (5-stelliges numerisches Feld), `Inquire` (Kontaktdaten) und `SelfQualifyAddress` (Straße, PLZ, Ort mit Autovervollständigung). Keine Slider, keine Freitextfelder außer Adresse und Kontaktdaten. Jede Frage hat einen Hilfetext (`help`), der erklärt, wofür die Angabe gebraucht wird, zum Beispiel "Der Gebäudetyp ist ausschlaggebend für die Bestimmung Ihres Wärmebedarfs."

Verzweigung: bedingte Kanten (`next_step.type === "condition"`) leiten abhängig von Vorantworten, zum Beispiel nach `heizung-etage`: bei `energy_source_old == natural_gas` nach `gas-verbraucht`, bei `oil` nach `oel-verbraucht`, sonst nach `pv`.

Fortschrittsanzeige: `ProgressBar`-Komponente mit `role="progressbar"`, `aria-valuenow`, sichtbarem Prozentwert plus Label. Beschriftung: "Schritt {current} von {total}" und Label "geschafft" (Standard) bzw. "zu Ihrem Wunschtermin" (Self-Service). Balken animiert mit `transition-[width] duration-300`. Der Adress-Schritt hat einen festen Fortschrittswert von 75 Prozent. Der letzte Schritt vor Abschluss zeigt 99 Prozent (`finalStep`).

Wann persönliche Daten: erst im Schritt `anfragen` ("Erstellung Ihres Festpreisangebots"), also nach 16 Sachfragen. Begründung im Hilfetext: "Damit wir Sie während des gesamten Heizungswechsels optimal beraten und unterstützen können, benötigen wir Ihre E-Mail Adresse und Telefonnummer." Felder: Anrede (Herr/Frau), Vorname, Nachname, Telefon, E-Mail.

Microcopy: `inquire.disclaimer`: "SSL VERSCHLÜSSELUNG. Auf Ihre Anfrage hin verarbeiten wir Ihre Angaben ausschließlich zur Erstellung eines kostenlosen und unverbindlichen Angebots und geben diese NICHT an Dritte weiter oder nutzen diese für unerwünschte Werbung." Submit-Label: "Angebot anfordern". Der Self-Service-Flow beschreibt sein Ergebnis als "Ihr Festpreisangebot und Ihr Berater aus der Region sind bereit". Der Self-Qualify-Zweig zeigt nach der Auswertung eine Förderprognose: "Basierend auf Ihren Angaben erhalten Sie bis zu {percent} % Förderung", berechnet aus `heatingAge` und `ownership`: 30 Prozent ohne Eigentum, 80 Prozent bei Heizungsalter 20+ Jahre, sonst 70 Prozent.

### https://www.thermondo.de/unternehmen/kontakt/ (Kontakt)

| Feld | Wert |
|---|---|
| `<title>` | "Kontaktieren Sie uns! \| thermondo" |
| H1 | "Kontaktieren Sie uns!" |
| H3 | "Sie möchten einen Servicefall melden", "Angebot für Ihren Heizungswechsel", "Wartungsangebot anfordern" |
| H2 / H3 / H4 | (H2 aus Final-CTA) / 3 / 3 |
| Schema.org | keine |

Kein `tel:`-Link und keine Telefonnummer im Kontaktformular. Die drei Wege sind in H3-Kacheln getrennt (Servicefall, Angebot, Wartung), der Anruf erfolgt erst nach Lead-Abgabe von der Nummer "0151 54457583", wie auf der Bestätigungsseite genannt.

### https://www.thermondo.de/bestaetigung/ (Danke-Seite)

| Feld | Wert |
|---|---|
| `<title>` | nicht extrahiert, aber 140.286 Bytes HTML |
| H1 | "Ihre Angebotsanfrage war erfolgreich!" |
| H2 | "So geht es nun für Sie weiter:", "thermondo empfehlen und Prämie sichern" |

Aufbau: Erfolgs-Info-Box mit "Vielen Dank für Ihr Vertrauen! … Der Anruf wird von der Nummer 0151 54457583 erfolgen.", dann ein 3er-Grid mit dem Prozess (H2 "1. Beratungstermin", "2. Festpreisangebot", "3. Installation") als mikro-Prozess-Steps, danach das Empfehlungsprogramm mit E-Mail-Formular. Der Funnel konvertiert die Danke-Seite also sofort in einen weiteren Lead-Kanal. Zwei Varianten: `/bestaetigung/` und `/bestaetigung/danke/`, ausgewählt über 24 `behaviourModifiers`-Regeln im TNS-Config.

## Design-System

Quelle: `/static/css/website.242eb4118da5.css` (380.874 Bytes dekomprimiert) sowie das Funnel-CSS in `lead-form.thermondo.de/assets/index-DXf272In.js`.

### Fonts

`@font-face`-Deklarationen im Website-CSS (6 Familien):

| Familie | Datei | Gewicht | Hinweis |
|---|---|---|---|
| Open Sans | `OpenSans-Regular.237aa94493d9.woff2` | 400 | Body, `font-display:swap` |
| Open Sans | `OpenSans-Bold.f9fc9780feed.woff` | 700 | kein woff2 |
| Mont Bold | `Mont-Bold.8c0793ceaf26.woff2` | als 400 deklariert | Display-Headlines |
| Mont Heavy | `Mont-Heavy.8e2a4b743e15.woff2` | als 400 deklariert | größere Headlines |
| Merriweather | `merriweather-v33-latin-italic.e02afa5fc636.woff2` | 400 italic | Zitat-Auszeichnung |
| t-website-icons | EOT/WOFF/TTF | - | Icon-Font, unter anderem `.t-website-angle-right`, `.t-website-search`, `.t-website-check`, `.t-website-exclamation-mark` |

Keine Google-Fonts- oder Adobe-Fonts-Requests. `font-family`-Verwendungshäufigkeit im CSS: `"Mont Bold",sans-serif` 50x, `"Mont Heavy",sans-serif` 17x, `"Open Sans",sans-serif` 5x.

Funnel-App lädt `Mont-Bold-Cc9Y38Wi.woff2` (weight 700) und `Mont-Heavy-B0-Z6kNp.woff2` (weight 900) plus 30 Open-Sans-Subsets. Funnel-Stack: `--font-sans:"Open Sans Variable", "Open Sans", ui-sans-serif, system-ui, sans-serif`. Es gibt dort eine merkwürdige Nicht-Nutzung: `--font-mont:Mont` wird definiert, die Utility-Klasse `font-mont` wird aber nur an einer Stelle im Markup verwendet (`class="font-mont text-text-primary text-2xl font-bold"` auf der Opted-Out-Seite).

### Farben

Die 10 häufigsten Hex-Werte im Website-CSS mit Vorkommen:

| Anzahl | Wert | Rolle |
|---|---|---|
| 137 | `#fff` | Flächen, Button-Text |
| 75 | `#f60439` | Primär-Akzent, Buttons, Links-Hover, Akkordeon-Kopf |
| 59 | `#323232` | Body-Text (`p{color:#323232}`) |
| 55 | `#1a1a1a` | Headlines (`h1,h2,h3{color:#1a1a1a}`) und Footer-Hintergrund |
| 30 | `#dedede` | Rahmen, Divider, Disabled-Fläche |
| 27 | `#d10000` | Button-Hover (`t-btn-1`), Verlaufsstart |
| 24 | `#f5f3ef` | Warme Fläche (Contact-Banner, Lead-Form-Hintergrund) |
| 21 | `#595b60` | Footer-Separator, gedämpfter Text |
| 20 | `#b105f4` | Verlaufsende (Violett) |
| 17 | `#000` | `t-btn-3`-Text |

Weitere Rollen: `#838383` Disabled-Text, `#b7b7b7` Footer-Link, `#55a041` Check-Icon grün, `#f9f9f9` Akkordeon-Innenfläche, `#f5f3ef` Sektionsfläche.

Keine CSS-Custom-Properties für Farben im Website-CSS. Stattdessen Bootstrap-5.3.8-Variablen, die aber die thermondo-Palette nicht abbilden (siehe unten) und praktisch nur von Bibliotheks-Code (plyr, Bootstrap-Utilities) benutzt werden. Die echten Farbwerte stehen als Literale, unter anderem `--bs-link-color: #323232`, `--bs-link-hover-color: #f60439`, `--bs-body-color: #212529`, `--bs-body-bg: #fff`.

Custom Properties im Website-CSS: nur `--headerHeight` (52px mobil, 92px ab 1024px), `--logoWidth` (140px bzw. 160px), `--logoHeight`, `--swiper-theme-color:#007aff`, plus die Bootstrap- und plyr-Variablen.

Markenverlauf, 18x als Literal im CSS: `linear-gradient(to top right,#d10000,#f60439,#b105f4)`. Verwendet für `hero__box`, `usp__wrapper`, `footer__gradient`, `contact-banner__background-logo` und als 8px-Unterstrich `teaser-showcase-large::after`.

Funnel-Design-System (3 Ebenen, aus `lead-form.thermondo.de`):

| Ebene | Beispiel-Token | Wert |
|---|---|---|
| Brand-Gradient | `--base-color-gradient-brand` | `linear-gradient(45deg, #d10000 0%, #f60439 50%, #b105f4 100%)` |
| Coral-Red-Rampe | `--base-color-coral-red-500` | `#f60439` |
| Fire-Red-Rampe | `--base-color-fire-red-500` / `-600` / `-700` | `#d10000` / `#be0000` / `#940000` |
| Violet-Rampe | `--base-color-violet-500` | `#b105f4` |
| Neutral-Rampe | `--color-neutral-700` / `-800` | `#333` / `#1a1a1a` |
| Semantik | `--sys-color-text-neutral-default` | `var(--base-color-neutral-700)` |
| Aktion | `--sys-action-bg-primary-default` | `var(--base-color-coral-red-500)` |
| Aktion Hover | `--sys-action-bg-primary-hover` | `var(--base-color-fire-red-500)` |
| Fläche | `--sys-color-canvas-subtle` | `var(--base-color-brown-100)` = `#f5f3ef` |
| Status | `--color-sys-error` / `-success` / `-info` / `-warning` | `#be0000` / `#249f03` / `#0463e0` / `#f86d36` |

186 `--sys-*`-Tokens insgesamt. Die Website nutzt dieses System nicht, das ist ein Parallel-System der Funnel-App.

### Radius

Häufigste `border-radius`-Werte im Website-CSS: `50%` (17x, Icons und Kreise), `2px` (13x, alle `t-btn`-Buttons und Karten), `100%` (5x), `4px` (4x), `100px` (4x), `8px` (3x), `0.375rem` (2x). Buttons sind eckig mit 2px, nicht pill. Pill taucht nur als Bootstrap-Utility `--bs-border-radius-pill` auf.

Funnel-Design-System: `--base-radius-25:2px`, `--base-radius-50:4px`, `--base-radius-100:8px`, `--base-radius-200:16px`, `--base-radius-full:9999px`, plus `--radius-sys-sm:2px`, `--radius-sys-md:4px`, `--radius-sys-lg:8px`. Die 2px der Website entsprechen also `--base-radius-25`.

### Shadows

Website-CSS, häufigste Werte:

| Wert | Vorkommen | Verwendung |
|---|---|---|
| `rgba(0,0,0,.15) 0 0 5px` | 3 | `teaser`-Karte Ruhezustand |
| `rgba(0,0,0,.2) 0 0 15px` | 1 | Karten-Hover (`.card`, `.teaser`, `.product-listing__link`) |
| `0 0 0 30px #fff inset` | 1 | Swiper-Navigation-Button |
| `0 0 3px rgba(0,0,0,.2)` | 1 | `mobile-conversion-banner` |
| `0 1px 3px rgba(0,0,0,.4)` | 1 | `t-btn-3` |

Funnel-Design-System hat eine vollständige Shadow-Skala: `--shadow-sm: 0 1px 2px 0 #0000000d`, `--shadow-md: 0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a`, `--shadow-lg: 0 10px 15px -3px #0000001a, 0 4px 6px -4px #0000001a`, `--shadow-xl`, `--shadow-2xl`, `--shadow-button-default`, `--shadow-button-hover`, `--shadow-card-default`, `--shadow-card-hover`, `--shadow-modal-backdrop`.

### Spacing und Container

Container: `.website-container{max-width:1240px;margin:0 auto;padding-right:20px;padding-left:20px}`, ab 1024px 32px Innenabstand. Textspalte: `.comp-squeeze-lg{max-width:960px}`.

Sektionsabstände über `vertical-rhythm`: Kinder bekommen `margin-bottom:48px`, ab 1024px 64px. Spreizer-Klassen `vr-medium` (80px, ab 1024px 96px) und `vr-large` (96px, ab 1024px 144px).

Breakpoints aus dem TNS-Config: `xs:360, sm:576, md:768, lg:1024, xl:1200, xxl:1400`. Media-Query-Häufigkeit im CSS: `min-width:576px` 358x, `min-width:1024px` 217x, `min-width:1200px` 27x, `max-width:575.98px` 115x.

Funnel-Spacing: `--base-space-25:2px` bis `--base-space-1300:104px`, plus semantische `--spacing-sys-inset-*` und `--spacing-sys-gap-*`. Tailwind-Spacing-Basis `--spacing:.25rem`.

### Typo-Skala

Kein `clamp()`. Feste Werte je Breakpoint.

Website, `layout--full-width` (Startseite, Produktseiten):

| Element | Mobil | ab 576px | ab 1024px | ab 1200px |
|---|---|---|---|---|
| H1 | 32px / 40px, Mont Bold | 36px / 48px, Mont Heavy | 46px / 56px | 52px / 64px (nur `hero__title`) |
| H2 | 29px / 40px, Mont Bold | 32px / 40px | 41px / 56px, Mont Heavy | - |
| H3 | 23px / 32px, Mont Bold | 26px / 32px | 26px / 32px | - |
| p | 16px / 24px | 18px / 29px | 20px / 32px | - |
| li | 16px / 24px | 18px / 29px | 20px / 32px | - |
| small | 14px / 20px | 14px / 20px | 14px / 20px | - |
| table | 16px / 24px | 20px / 32px | 20px / 32px | - |

Website, `layout--sidebar` (Ratgeber, kompakter): H1 29px bis 36px, H2 23px bis 29px, H3 18px bis 23px, p 16px bis 18px, li 16px bis 18px, table konstant 16px.

Buttons: `t-btn-1/2/3` 16px / 24px, ab 576px 18px / 29px, `padding:12px 24px`, `font-weight:700`, `border-radius:2px`. `t-btn-lg` 18px bis 20px mit `padding:16px 40px`. `t-btn-sm` 16px mit `padding:8px 16px`.

`letter-spacing`: kein einziger Wert im gesamten Website-CSS.

Zeilenabstände: `1.2` auf allen Überschriften (`h1,h2,h3,h4,h5,h6{line-height:1.2}`), Body `1.5`. Die konkreten Pixel-Zeilenabstände der thermondo-Klassen sind oben in der Tabelle absolut angegeben.

### Tech-Stack im Detail

| Schicht | Befund |
|---|---|
| Backend Website | Django, Session-Cookie-basiert, `csrfmiddlewaretoken` im Funnel-Formular |
| CMS Website | Wagtail, erkennbar an `data-block-key`-Attributen auf jedem Rich-Text-Block (zum Beispiel `data-block-key="x72b8"`) |
| CSS Website | eine Datei, `website.242eb4118da5.css`, 380.874 Bytes dekomprimiert, 58.906 Bytes gzip |
| JS Website | eine Datei, `website.e60e872fde2b.js`, 522.832 Bytes dekomprimiert, 165.189 Bytes gzip |
| Bootstrap | 5.3.8, Utility-Layer, laut CSS-Header-Kommentar "Bootstrap v5.3.8" |
| Swiper | Slider-Bibliothek, Klassen `swiper-container`, `swiper-wrapper`, `swiper-slide`, `swiper-navigation` |
| Plyr | Video-Player, CSS-Variablen `--plyr-*`, Klassen `plyr__video-embed` |
| lazysizes | Lazy-Loading, Konfiguration im Bundle: `{elements_selector:".lazy", threshold:300, data_src:"src", class_loaded:"loaded", cancel_on_exit:!0}` |
| Handorgel | Akkordeon-Bibliothek, Klassen `handorgel__header__button`, `handorgel__content`, initialisiert mit `{multiSelectable:!1}` |
| Micromodal | Modals für Trustpilot-Volltexte, Klassen `modal micromodal-slide`, `data-micromodal-close` |
| Popper | Tooltips/Popover, `window[Uh](Lz...` mit `@popperjs`-Modifiern `flip`, `preventOverflow` |
| Sentry | Fehler-Tracking im Funnel-Bundle, `SENTRY_RELEASE={id:"b9c86d3409544acdf1847d53bc340bfa4e07ee99"}` |
| Funnel-App | Vue 3 + Vite, 33 `__name:`-Komponenten, `createApp`, Router mit `RouterView` und `RouterLink`, Lazy-Chunks `LeadFormView-BhTSh4f7.js` (107.726 Bytes) und `LeadFormView-B7nIz2pW.css` |
| Funnel-Micro-Frontend | eigene Subdomain `lead-form.thermondo.de`, Einbettung über `AppLoader` mit HTML-Scraping der Subdomain, Rendering in Shadow Root |
| Funnel-HTTP | `HttpContext`-Klasse, `Bearer`-Token aus `window.TNS.config.backend.token` |
| gtm | Container `GTM-TSMSBB` über `gtm.thermondo.de` |
| Consent | Usercentrics, `UC_UI.showSecondLayer()` im Cookie-Einstellungen-Link |
| A/B | VWO mit `account_id=76531` und `hide_element='body'` plus `opacity:0 !important` gegen Flackern |
| Keine Motion-Library | kein GSAP, kein ScrollTrigger, kein Lenis, kein AOS, keine Webflow-Interactions, kein Framer Motion, kein Lottie, kein Three.js |

Kein `data-w-id` im HTML, kein `wp-content`, kein `_next`, kein `__NEXT_DATA__`, kein `data-reactroot`.

### Bilder

Formate: WebP dominiert (Startseite 12x, Produktseite 34x), daneben SVG für Icons und Illustrationen (Startseite 12x, Artikel 59x), JPG für Personalia (3x) und PNG für Logos.

Lazy-Loading läuft über die Klasse `lazy` plus `data-src`/`data-srcset`, nicht über das native `loading="lazy"`. Zählung: Startseite 23 `<img>`, davon 6 mit `class="lazy"` und 0 mit `loading=` oder `fetchpriority`. Produktseite 41 `<img>`, 6 lazy, 2 `srcset`. Artikel 41 `<img>`, 7 lazy, 5 `srcset`, 11 `<picture>`.

Platzhalter: `<img srcset="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" class="lazy">`, also ein 1x1-Transparent-GIF als `srcset`-Wert. `srcset`-Breakpoints laufen über `<source media="(min-width: ...)">` in `<picture>`, zum Beispiel 1200, 1000, 800, 640, 480, 360, 320px Breite.

Kein `fetchpriority="high"` auf dem Hero. Der Hero der Startseite ist ein CSS-Hintergrundbild, kein `<img>`, und wird deshalb vom Lazy-Loader nicht erfasst.

## Animationen

### Transitions

Alle `transition`-Deklarationen im Website-CSS mit Vorkommen:

| Vorkommen | Deklaration |
|---|---|
| 12 | `box-shadow .3s ease` |
| 6 | `all .2s ease` |
| 6 | `width .2s ease` |
| 3 | `opacity .3s ease` |
| 2 | `all .3s ease` |
| 2 | `transform .2s .1s ease,opacity .2s .1s ease` |
| 2 | `all .2s` |
| 1 | `.2s ease-in-out transform` |
| 1 | `transform .4s ease-in-out` |
| 1 | `all .1s ease-in-out` |
| 1 | `transform .3s ease` |
| 1 | `height .35s cubic-bezier(.4,0,.2,1),width .35s cubic-bezier(.4,0,.2,1)` |
| 1 | `transform .3s ease,opacity .3s ease` |
| 1 | `opacity .4s ease-in-out,transform .4s ease-in-out` |
| 1 | `background-color .2s ease` |
| 1 | `border-color .15s ease-in-out,box-shadow .15s ease-in-out` |
| 1 | `background 1s` |
| 1 | `background .4s` |
| 1 | `height .1s ease .2s` |
| 1 | `height .2s ease` |
| 1 | `opacity .1s ease` |
| 1 | `stroke-dashoffset 200ms ease-out` |
| 1 | `bottom .5s` |
| 1 | `all .2s ease-out` |

Alle `cubic-bezier`-Werte im Website-CSS: `cubic-bezier(0,0,.2,1)` (4x) und `cubic-bezier(.4,0,.2,1)` (2x). Das ist Material-Standard-Easing, beide aus Bootstrap.

Funnel-Design-System, Motion-Tokens: `--sys-motion-duration-fast:.15s`, `-moderate:.2s`, `-slow:.28s`, `-slower:.4s`; `--sys-motion-easing-standard:cubic-bezier(.2, 0, 0, 1)`, `-decelerate:cubic-bezier(.05, .7, .1, 1)`, `-accelerate:cubic-bezier(.4, 0, 1, 1)`. Tailwind-Default: `--default-transition-duration:.15s`, `--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1)`.

### Keyframes

20 Keyframe-Blöcke im Website-CSS:

| Name | Inhalt | Herkunft |
|---|---|---|
| `plyr-progress` | Fortschrittsbalken | plyr |
| `plyr-popup` | Popup-Einblendung | plyr |
| `plyr-fade-in` | Opazität | plyr |
| `loader` | `rotate(0deg)` nach `rotate(360deg)` | Funnel-Loader |
| `bounce` | `translateY(0)` / `-15px` bei 50 Prozent / `-7px` bei 60 Prozent | eigen |
| `fadeIn` | `opacity:0` nach `1` | eigen |
| `fadeOut` | `opacity:1` nach `0` | eigen |
| `pulse` | `scale(1,1)` / `scale(1.1,1.1)` bei 50 Prozent | Sticky-Header-CTA |
| `slideInLeft` | `translateX(-100%)` nach `0` | Navigation |
| `slideInRight` | `translateX(100%)` nach `0` | Navigation |
| `slideOutLeft` | `translateX(0)` nach `-100%` | Navigation |
| `slideOutRight` | `translateX(0)` nach `100%` | Navigation |
| `slideInTop` | `translateY(-100%)` nach `0` | Mobile-Menü |
| `getReadyLeadFormBoxSlideIn` | `translateY(10%)` + `opacity:0` bis 60 Prozent, dann nach `translateY(0)` + `opacity:1` | Lead-Form |
| `getReadyLeadFormBoxFillProgress` | `width:0` bis 80 Prozent, dann nach `width:10%` | Lead-Form |
| `overlayIn` / `overlayOut` | `opacity` 0 auf 1 bzw. 1 auf 0 | Modal |
| `containerIn` / `containerOut` | `scale(1.1)` auf `scale(1)` bzw. umgekehrt | Modal |
| `swiper-preloader-spin` | `rotate(0deg)` nach `rotate(360deg)` | Swiper |

### Motion-Libraries

Keine. Explizit geprüft und nicht gefunden: GSAP, ScrollTrigger, Lenis, AOS, Splide, Lottie, Rive, Three.js, Framer Motion, Webflow (`data-w-id`). Gefunden und im Einsatz: Swiper, plyr, lazysizes, Handorgel, Micromodal, Bootstrap, Popper. Scroll-Animationen laufen ausschließlich über `IntersectionObserver` (2 Vorkommen im Website-Bundle: einmal in lazysizes, einmal für einen Filter-Button auf Listen-Seiten).

### Scroll-Reveal-Muster

Kein Reveal-System. Es gibt keine `aos-init`-, `fade-up`- oder `reveal`-Klassen. Der einzige beim Scrollen ausgelöste Effekt ist Lazy-Loading über lazysizes mit `threshold:300` und den Klassen `entered`, `loading`, `loaded`, `error`.

### Hover-Effekte

| Element | Änderung | Dauer und Easing |
|---|---|---|
| `.t-btn-1` | `background-color:#f60439` nach `#d10000` | kein `transition` deklariert |
| `.t-btn-2` | `border-width:1px` auf `2px`, `padding:12px 24px` auf `11px 23px`, `background-color` nach `#f60439`, `color` nach `#fff` (aktiv) | kein `transition` |
| `.t-btn-3` | `background-color:#dedede`, `border-color:#dedede` | kein `transition` |
| `.teaser` (Karte) | `box-shadow` von `rgba(0,0,0,.15) 0 0 5px` auf `rgba(0,0,0,.2) 0 0 15px` | `transition:box-shadow .2s` |
| `.header__logo` | `transform:scale(1.03)`, `transform-origin:center` | kein `transition` |
| `.navigation__card-item img` | `transform:scale(1.1)` | `transition:transform .3s ease-in-out` |
| `.handorgel__header__button` | Farbe nach `#f60439`, bei offenem Zustand Hintergrund `#f60439` und `::after` `rotate(180deg)` | `transition:background-color .2s ease` |
| `.footer-menu__link` | Farbe von `#b7b7b7` nach `#fff` | kein `transition` |
| `.sidebar-nav__link` | Farbe nach `#f60439` | kein `transition` |
| `.breadcrumbs__link` | Farbe von `#b7b7b7` nach `#fff` | kein `transition` |
| `.header--inverted` | `background:#f60439` plus `animation:pulse 1s linear`, Hover `#d10000` mit `transition:background .4s` | - |

### Zähler, Marquees, Parallax, Sticky, Video

Keine Zähler-Animation (0 Treffer für countUp oder `data-count`). Keine Marquee. Kein Parallax. Keine Sticky-Sections außer Header und Sidebar.

Sticky-Mechaniken: `header__wrapper` ist `position:fixed` und wechselt ab Scroll-Position 0 auf `header__wrapper--transparency` (`background-color:rgba(255,255,255,.97)`); auf der Startseite ist er ohne Hover transparent. Der Header-CTA `#header__cta` wechselt nach 70 Prozent der Dokumenthöhe auf `header--inverted` (roter Grund plus `pulse`-Animation). Der Mobile-Conversion-Banner fährt ab 1,3-facher Fensterhöhe ein und ab 100px Hochscrollen wieder aus, jeweils über `bottom:-100%` nach `bottom:0` mit `transition:bottom .5s`.

Video-Autoplay: nein. plyr-Videos sind Klick-to-play, 3 YouTube-Einbettungen auf der Kundenmeinungen-Seite.

### Reduced Motion

Zwei Vorkommen von `prefers-reduced-motion` im gesamten CSS, beide aus Bootstrap:

1. `@media (prefers-reduced-motion:reduce){.icon-link>.bi{transition:none}}`
2. `@media (prefers-reduced-motion:no-preference){:root{scroll-behavior:smooth}}`

Für die eigenen Animationen (`pulse` auf dem Header-CTA, `slideIn*` in der Navigation, `getReadyLeadFormBoxSlideIn`, der Mobile-Banner) gibt es keine Reduced-Motion-Behandlung. Ebenso im Funnel-Bundle.

## Synthese

### Seitentyp-Blueprints

**Startseite**

1. Sticky-Header mit 7 Top-Level-Punkten und 2 Flyout-Menüs, Full-width sticky
2. Mobile-Conversion-Banner, Sticky-Bottom, nur unter 1024px
3. Hero, Full-bleed-Foto mit Gradient-Box links (2-Spalten asymmetrisch), 1 CTA
4. H2-Zwischentitel, Zentriert schmal
5. Zigzag-Feature, 2-Spalten 50/50, Bild links
6. Zigzag-Feature, 2-Spalten 50/50
7. Zigzag-Feature, 2-Spalten 50/50
8. Benefits-Grid, 3er-Grid auf Gradient-Fläche, 6 Kacheln
9. Testimonials, Zentriert plus Trustpilot-Zeile, dann Zigzag
10. Referral-Teaser, Zigzag
11. Recruiting-Teaser, Zigzag
12. Final-CTA-Banner, Zentriert breit auf `#f5f3ef`
13. Footer, 3 Spalten plus Rechtszeile

**Leistungs-/Produktseite**

1. Nav und Sticky-Header
2. Hero, Full-bleed kompakt
3. Zigzag-Intro, 2-Spalten
4. Produkt-Karte, Zigzag
5. Produkt-Karte, Zigzag reversed
6. FAQ-Akkordeon, einspaltig
7. Autoritäts-Block mit Testergebnis, Zentriert schmal
8. On-Page-Funnel, 6er-Kachel-Grid
9. Content-Block, Zentriert schmal
10. Testimonials-Carousel, Swiper mit Modal-Volltext
11. Content-Block, Zentriert schmal
12. Promotion-Banner (Finanzierung), 2-Spalten
13. Info-Box mit Icon, Zentriert schmal
14. Final-CTA-Banner
15. Footer

**Ratgeber-Artikel**

1. Breadcrumbs, dunkler Balken
2. H1-Block mit Autor und Änderungsdatum
3. Key-Takeaways-Box, Zentriert schmal, 6 Bullets
4. Inhaltsverzeichnis mit Sprungmarken, `data-scroll-to` plus Header-Offset
5. Fließtext in 15 H2-Blöcken, Zentriert schmal
6. Rechner-Einbettung als Mount-Punkt
7. Zwischen-CTAs, 4x zentriert
8. Info-Box mit Icon
9. Autor-Box mit Foto, 50x50
10. Verwandte Artikel, 3er-Grid
11. Sticky-Sidebar, 25 Prozent Breite ab 1024px
12. FAQ-Akkordeon, 9 Fragen
13. Final-CTA plus Footer

**Funnel**

1. Split-Screen: links Persuasion-Block mit H1 und Trustpilot, rechts App-Container
2. Ladezustand als Spinner
3. 16 Sachfragen als Kachel-Auswahl mit Hilfetext, Fortschrittsbalken oben
4. Kontaktdaten erst nach den Sachfragen
5. PLZ-Verfügbarkeitsprüfung
6. Self-Qualify-Zweig: 5 Zusatzfragen, Förderprognose, Review, Adresse mit Autovervollständigung, Terminbuchung
7. Vier Ausgänge: qualifiziert, disqualifiziert, abgelehnt, telefonische Klärung

### Die 5 stärksten Muster

1. **Deep-Link in den Funnel setzt die erste Antwort vor.** Jeder Conversion-Button auf Produkt- und Ratgeberseiten verlinkt auf `/heizungsplaner/?energy_source_new=air_to_water_heat_pump`, der On-Page-Funnel sogar mit `?building_type=<wert>`. Beleg: `leistungen_waermepumpe-kaufen.html`, `<a href="https://www.thermondo.de/heizungsplaner/?energy_source_new=air_to_water_heat_pump" class="t-btn-1">Zum Festpreisangebot</a>` und `data-engagement-on-page-lead-form-question="building_type"`. Der Nutzer sieht den Funnel nie als leeres Formular, sondern startet mitten in der Qualifizierung.

2. **Die Seite fragt selbst und schiebt erst dann in den Funnel.** `leistungen_waermepumpe-kaufen.html` enthält einen Inline-Block mit `data-engagement-on-page-lead-form`, Überschrift "Festpreisangebot in nur 2 Minuten anfragen" und der Frage "Für welchen Gebäudetyp benötigen Sie eine neue Heizung?". Die sechs Kacheln sind `button type="submit"` in einem `form method="post"` auf `/heizungsplaner/` und tragen `data-param="detached_house"` bis `data-param="apartment"`. Antworten passiert in einem Klick mit Icon und Checkmark statt in einem Formular.

3. **Der Funnel liefert die Förderprognose als Zwischenbelohnung.** Aus `leadform_view.js`: `B = () => c.value !== "True" ? 30 : (d.value === "30_or_more" || d.value === "20_29") ? 80 : 70`, angezeigt als "Basierend auf Ihren Angaben erhalten Sie bis zu {percent} % Förderung" (`sq.review.subsidyAmount`). Nach 16 Fragen ohne Kontaktdaten bekommt der Nutzer eine Zahl, bevor er Name und Nummer eingibt.

4. **Der Markenverlauf ist ein einziges, 18-fach wiederholtes CSS-Literal.** `linear-gradient(to top right,#d10000,#f60439,#b105f4)` erscheint 18x in `website.242eb4118da5.css` und trägt Hero-Box, Benefits-Fläche, Footer-Streifen (`footer__gradient`, `height:24px`), den 8px-Unterstrich `teaser-showcase-large::after` und das 60vw-Kreislogo im Final-CTA. Dieselbe Rampe liegt im Funnel als `--base-color-gradient-brand:linear-gradient(45deg, #d10000 0%, #f60439 50%, #b105f4 100%)`.

5. **Der Lead-Funnel ist ein separat deploybares Micro-Frontend mit eigenem Design-System.** `AppLoader` in `website.e60e872fde2b.js` holt `https://lead-form.thermondo.de/` per GET, parst daraus alle `<script src>` und `<link href>` und hängt sie in den Host-Head. Die App bringt 186 `--sys-*`-Tokens und eine vollständige Tailwind-Theme-Schicht mit. Der Funnel kann damit unabhängig von der Wagtail-Website ausgerollt werden, während das Hosting-Styling (Hintergrund `#f5f3ef` als `--sys-color-canvas-subtle`) übereinstimmt.

### Animation-Rezepte

Alle Werte stammen wörtlich aus `/static/css/website.242eb4118da5.css` (W) und `lead-form.thermondo.de/assets/index-DXf272In.js` (F).

**1. Sticky-Header-CTA, der nach 70 Prozent Scrolltiefe auf Rot umschaltet und pulsiert**

Trigger aus `website.e60e872fde2b.js`: `const t=document.getElementById("header__cta"), n=.7*document.body.scrollHeight; ... window.pageYOffset > n ? t.classList.add("header--inverted") : t.classList.remove("header--inverted")`, gedrosselt über ein Flag mit `setTimeout(..., 200)`.

```css
.header--inverted {
  background: #f60439 !important;
  color: #fff;
  font-weight: 700;
  animation: pulse 1s linear;
}
.header--inverted:hover {
  border-color: #d10000;
  color: #fff;
  background: #d10000 !important;
  transition: background .4s;
}
@keyframes pulse {
  0%, to  { transform: scale(1, 1); }
  50%     { transform: scale(1.1, 1.1); }
}
```

**2. Mobile-Conversion-Banner, der von unten hereinfährt**

Trigger: Einfahren ab `1.3 * window.innerHeight` Scrolltiefe und Scrollrichtung nach unten, Ausfahren ab 100px Hochscrollen, gedrosselt mit `setTimeout(..., 100)`.

```css
.mobile-conversion-banner {
  position: fixed;
  bottom: -100%;
  left: 0; right: 0;
  background-color: #fff;
  z-index: 10;
  transition: bottom .5s;
  padding-top: 12px; padding-bottom: 12px;
  box-shadow: 0 0 3px rgba(0,0,0,.2);
  border-top: 1px solid #dedede;
}
.mobile-conversion-banner--show { bottom: 0; }
```

**3. Karten-Hover über Shadow, kein Lift, kein Scale**

```css
.teaser {
  background-color: #fff;
  box-shadow: rgba(0,0,0,.15) 0 0 5px;
  transition: box-shadow .2s;
}
.card:hover,
.teaser:hover,
.product-listing__link:hover,
.product-pricing--as-card:hover,
.list-filter__scrollto-button:hover {
  box-shadow: rgba(0,0,0,.2) 0 0 15px;
}
```

**4. FAQ-Akkordeon mit Höhen- und Opazitätsstaffelung**

```css
.handorgel__header__button {
  cursor: pointer;
  display: block;
  padding: 12px 58px 12px 24px;
  color: #1a1a1a;
  position: relative;
  transition: background-color .2s ease;
  border-top: 1px solid #dedede;
}
.handorgel__header__button::after {
  color: #f60439;
  font-weight: 700;
  position: absolute;
  right: 16px; top: 50%;
  transform: translateY(-50%);
}
.handorgel__header--opened .handorgel__header__button {
  color: #fff;
  background-color: #f60439;
}
.handorgel__header--opened .handorgel__header__button::after {
  transform: translateY(-50%) rotate(180deg);
  color: #fff !important;
}
.handorgel__content {
  display: none; overflow: hidden; height: 0;
  transition: height .1s ease .2s;
  background-color: #f9f9f9;
}
.handorgel__content--open    { display: block; transition: height .2s ease; }
.handorgel__content__inner   { padding: 20px 24px; opacity: 0; transition: opacity .1s ease; }
.handorgel__content--opened .handorgel__content__inner { opacity: 1; transition: opacity .3s ease; }
```

**5. On-Page-Funnel-Kachel mit Checkmark und 400ms-Verzögerung**

Markup aus `leistungen_waermepumpe-kaufen.html`: `<button type="submit" class="lead-form-choice" data-param="detached_house">` mit `<svg ... class="checkmark"><polyline class="checkmark__line" ... /></svg>`. JS aus `website.e60e872fde2b.js`:

```js
t.setAttribute("data-engagement-on-page-lead-form-is-selected", !0),
s = e.querySelector(".checkmark__line"),
s.classList.add("checkmark__line--checked"),
setTimeout(() => {
  t.querySelector(".loader-overlay").style.display = "block";
  const n = new URL(r);
  n.searchParams.set(i, e.dataset.param);
  window.location.href = n.toString();
}, s || isAbTest ? 400 : 0)
```

**6. Fortschrittsbalken im Funnel, aus `leadform_view.js`**

```html
<div role="progressbar" aria-valuenow="…" aria-valuemin="0" aria-valuemax="100"
     class="flex flex-col gap-1">
  <div class="text-text-secondary text-right text-sm">
    <span translate="no">… %</span> geschafft
  </div>
  <div class="bg-border-primary h-1 w-full overflow-hidden rounded-lg sm:h-[5px] sm:rounded-b-none">
    <div class="bg-success h-full transition-[width] duration-300 …"></div>
  </div>
</div>
```

Beschriftungen aus der i18n-Tabelle: `"progress.step":"Schritt {current} von {total}"`, `"progress.label.default":"geschafft"`, `"progress.label.selfService":"zu Ihrem Wunschtermin"`. Der Adress-Schritt hat einen harten Wert `"progress": 75`, der letzte Schritt vor Abschluss `if (e.finalStep) return 99`.

### Anti-Patterns und Schwächen

1. **Reduced Motion wird praktisch ignoriert.** Nur 2 Vorkommen von `prefers-reduced-motion` im gesamten 380-KB-CSS, beide aus Bootstrap. Die eigene `pulse`-Animation auf dem Sticky-CTA und die Slide-Animationen der Navigation laufen unverändert. Das ist bei einer dauerhaft pulsierenden Fläche im Sichtfeld ein echte Barrierefreiheits-Lücke.

2. **Hover-Zustände ohne Transition.** Die wichtigsten Buttons (`t-btn-1`, `t-btn-2`, `t-btn-3`), Logo-Scale und Footer-Links wechseln die Farbe hart, ohne `transition`. Nur die Karten und das Akkordeon sind weich. Die Buttons wirken dadurch billiger als die restliche Seite.

3. **Kein `letter-spacing` im gesamten CSS.** 0 Vorkommen. Bei `Mont Heavy` in 46px bis 52px und durchgehenden Großbuchstaben-Labels (`footer-menu__title{text-transform:uppercase}`, `.footer--legal{text-transform:uppercase}`) fehlt die optische Korrektur.

4. **Fixe Hero-Höhen statt `clamp()` oder Viewport-Einheiten.** Fünf feste Werte (220, 260, 300, 700, 800px) je Breakpoint, dazu fünf separate Hintergrundbilder. Zwischen 1024px und 1199px springt die Höhe von 300px auf 700px, das ist ein harter Bruch mitten im Tablet-Bereich.

5. **Bootstrap-Variablen bleiben ungenutzt stehen.** `--bs-primary:#0d6efd`, `--bs-secondary`, `--bs-success:#198754` usw. werden eingebunden, obwohl die Seite Rot als Akzent nutzt. Jede Utility-Klasse mit `text-primary` oder `btn-primary` würde das falsche Blau ziehen. Ein `--bs-primary:#f60439` wäre eine Zeile Arbeit gewesen.

6. **Lazy-Loading ohne `srcset` auf den meisten Bildern.** Nur 2 bis 5 `srcset`-Vorkommen pro Seite. Der Platzhalter ist ein 1x1-Transparent-GIF in `srcset`, während die echte URL in `data-src` liegt, was ohne JS zu leeren Bildern führt und keinen `noscript`-Fallback hat.

7. **Kein `fetchpriority` auf dem Hero-Bild.** 0 Vorkommen in allen 10 abgerufenen Seiten. Der Hero ist ein CSS-Hintergrundbild und wird deshalb erst nach dem CSS-Download und vom Lazy-Loader gar nicht erfasst. Das ist der LCP-relevanteste Fehler der Startseite.

8. **Zwei parallele Design-Systeme ohne gemeinsame Tokens.** Die Website nutzt Farb-Literale (`#f60439` 75x im CSS), der Funnel nutzt `--sys-*`-Tokens. Es gibt keine geteilte Token-Datei, nur zufällig identische Werte. Der Verlauf wird an zwei Stellen unterschiedlich definiert: `linear-gradient(to top right, #d10000, #f60439, #b105f4)` auf der Website, `linear-gradient(45deg, #d10000 0%, #f60439 50%, #b105f4 100%)` im Funnel. Das sind nicht dieselben Winkel.

9. **Mobile-Conversion-Banner und Sticky-Header sind zwei konkurrierende sticky Elemente.** Auf Mobilgeräten belegt der Header 48px, der Banner zusätzlich Höhe am unteren Rand, und der Footer hat deshalb `padding-bottom:128px` als Ausgleich. Auf kleinen Displays bleibt wenig Nutzfläche.

10. **Kein Telefonkontakt in der Navigation.** Obwohl die Seite "24h-Notfallhotline" bewirbt und eine Beratung anbietet, steht auf keiner der 10 Seiten eine Telefonnummer im Header oder Footer. Der einzige Anrufweg ist ein Callback nach der Lead-Abgabe, Nummer "0151 54457583", die auf der Bestätigungsseite genannt wird.

### Conversion-Mechanik in 5 Sätzen

Der Traffic landet auf Produkt- oder Ratgeberseiten, die beide auf dasselbe Ziel zeigen: `/heizungsplaner/`. Dort erwartet den Nutzer keine Preisliste, sondern ein 16-teiliger Kachel-Dialog, der mit der Frage nach der künftigen Heizart beginnt und bei "Wärmepumpe" in den Kernpfad einbiegt. Persönliche Daten werden erst nach diesen 16 Sachfragen verlangt, und der Self-Qualify-Zweig fügt zwischen Fragen und Kontaktdaten noch eine Förderprognose ("bis zu 80 % Förderung") als Belohnung ein. Bei fehlender Qualifikation fängt das System den Lead mit drei alternativen Ausgängen ab: Rückruf, Rückruf zum Wunschtermin, Storno mit nachgeschicktem Terminlink per E-Mail. Die Danke-Seite verkauft sofort das Empfehlungsprogramm mit "300 €" Prämie weiter, sodass jeder konvertierte Lead direkt zum nächsten Akquise-Kanal wird.

## Abrufprotokoll

Alle Abrufe mit User-Agent `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36` und `curl --compressed`. Angegeben sind HTTP-Status und übertragene Bytes (komprimiert); die abgelegten Dateien sind durch die Dekomprimierung größer.

| URL | Status | Bytes |
|---|---|---|
| https://www.thermondo.de/ | 200 | 13.631 |
| https://www.thermondo.de/ (User-Agent Googlebot) | 200 | 13.631 |
| https://www.thermondo.de/ (User-Agent curl/8.7.1) | 200 | 13.631 |
| https://www.thermondo.de/robots.txt | 200 | 109 |
| https://www.thermondo.de/sitemap.xml | 200 | 9.522 |
| https://www.thermondo.de/leistungen/ | 200 | 12.380 |
| https://www.thermondo.de/leistungen/waermepumpe-kaufen/ | 200 | 27.826 |
| https://www.thermondo.de/leistungen/waermepumpe-mit-pv-kaufen/ | 200 | 21.619 |
| https://www.thermondo.de/unternehmen/ueber-uns/ | 200 | 15.059 |
| https://www.thermondo.de/info/rat/waermepumpe/ | 200 | 32.476 |
| https://www.thermondo.de/info/rat/waermepumpe/waermepumpe-kosten/ | 200 | 37.963 |
| https://www.thermondo.de/leistungen/kundenmeinungen/ | 200 | 18.572 |
| https://www.thermondo.de/standorte/ | 200 | 16.052 |
| https://www.thermondo.de/heizungsplaner/ | 200 | 5.039 |
| https://www.thermondo.de/unternehmen/kontakt/ | 200 | 11.693 |
| https://www.thermondo.de/bestaetigung/ | 200 | 18.792 |
| https://www.thermondo.de/bestaetigung/danke/ | 200 | 17.250 |
| https://www.thermondo.de/waermepumpe/ | 404 | 9.916 |
| https://www.thermondo.de/static/css/website.242eb4118da5.css | 200 | 58.906 |
| https://www.thermondo.de/static/js/website.e60e872fde2b.js | 200 | 165.189 |
| https://www.thermondo.de/static/js/browserDeprecatedBanner.99635a36fb41.js | 200 | 339 |
| https://lead-form.thermondo.de/ | 200 | 489 |
| https://lead-form.thermondo.de/assets/index-DXf272In.js | 200 | 152.613 |
| https://lead-form.thermondo.de/assets/LeadFormView-BhTSh4f7.js | 200 | 107.726 |
| https://lead-form.thermondo.de/assets/LeadFormView-B7nIz2pW.css | 200 | 500 |

Nicht abrufbar oder nicht vorhanden: `/waermepumpe/` liefert 404. Es gab keinen Bot-Schutz und kein Client-Rendering-Problem auf der Startseite: die 13.631 Bytes sind der gzip-komprimierte Response-Body, dekomprimiert sind es 94.925 Bytes vollständiges HTML. Drei verschiedene User-Agents (Chrome, Googlebot, curl) lieferten byte-identische Antworten. Ein Teil der Funnel-Inhalte ist echtes Client-Rendering: der Lead-Formularbereich unter `/heizungsplaner/` rendert ausschließlich per JavaScript aus `lead-form.thermondo.de`, im HTML steht nur `<div id="app">` mit einem Spinner. Alle Funnel-Fragen wurden deshalb aus dem JS-Bundle extrahiert, nicht aus dem DOM.
