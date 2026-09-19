# www.peter.at

## Steckbrief

| Feld | Wert |
|---|---|
| Domain | www.peter.at (Betreiber laut Impressum: PTR Energie GmbH, Donauwörtherstraße 15, 2380 Perchtoldsdorf) |
| Branche | Photovoltaik, Stromspeicher, Wärmepumpe, Klima, Wallbox, Stromtarif, Energiegemeinschaft in Österreich |
| Seitentyp | Lead-Gen-Unternehmensseite mit Produktbaukasten und Funnel-Einstieg, kein Shop |
| Stack | Webflow (Published Tue Sep 15 2026 07:36:07 GMT+0000), Webflow CMS Collections (`w-dyn-list`), jQuery 3.5.1 |
| Sprachen | Deutsch, nur eine Sprache, kein hreflang |
| Anrede | Wechselnd: Startseite überwiegend Du ("Mach dich unabhängig", "dein Zuhause"), Ratgeber- und Formularseiten Sie ("Berechnen Sie", "Kontaktiere jetzt einen unserer Experten"). Startseiten-Hero duzt, /anfragen siezt. |
| Seiten in Sitemap | 0. `https://www.peter.at/sitemap.xml` liefert HTTP 404 (907 Bytes Webflow-404-Seite), ebenso `/sitemap_index.xml` und `https://peter.at/sitemap.xml`. `/robots.txt` liefert HTTP 200 mit 0 Bytes, also leer. |
| Seitenzahl laut Navigation | 12 Kernseiten in Nav und Footer plus 10 Presseartikel plus 4 Client-Stories plus 1 PV-Handbuch. Ich habe 17 Seiten mit Inhalt gefetcht. |
| `<html lang>` | `lang="en"` auf allen 17 geprüften Seiten, auf einer deutschsprachigen Österreich-Seite |
| Tracking | GTM `GTM-5XK5XSL7`, GA4 `G-7Y0VMHGF2B`, Facebook Pixel `584839947100153`, Microsoft Clarity `u8ifdmweuu`, Taboola `1966080`, HubSpot Portal `139646081`, Optibase `app.optibase.io/script.js` |
| Consent-Tool | keines im HTML erkennbar (kein Cookiebot, Usercentrics, Borlabs, OneTrust, Klaro, Cookieyes). Die Datenschutzseite erwähnt nur ein "Cookie-Consent-Tool" im Fließtext. |

## Sitemap

Hauptnavigation (nur 4 Links plus CTA), Header `nav.header__nav-menu`:

| # | Linktext | href |
|---|---|---|
| 1 | Kundenerfahrungen | /erfahrungen |
| 2 | Über uns | /uber-peter-at |
| 3 | Freunde empfehlen | /weiterempfehlen |
| 4 | Kontakt | /kontakt |
| CTA | Jetzt Ersparnis berechnen | /anfragen |

Footer, zwei Spalten mit Überschriften (Footer-Gruppen):

| Gruppe | Links |
|---|---|
| Informationen | /uber-peter-at (Über peter.at), /erfahrungen (Kundenerfahrungen), /weiterempfehlen (Freunde empfehlen), /karriere (Karriere bei peter.at, mit Badge "Wir suchen"), /partnerbetrieb-werden (Partnerbetrieb werden), /presse (Presse) |
| Rechtliches | /agb (AGB), /impressum (Impressum), /widerrufsrecht (Widerrufsrecht), /datenschutzerklarung (Datenschutz) |

Nicht in Nav oder Footer verlinkt, aber erreichbar: `/news` (identisch mit `/presse`), `/news/<slug>` (10 Artikel), `/client-stories/<slug>` (4 Stories), `/pv-handbuch`, `/weiterempfehlen-link`, `/anfragen#form`.

Die Presseübersicht listet 10 Artikel:

1. /news/aus-pv-peter-wird-peter-at-rebranding-mit-klarer-botschaft
2. /news/grosser-andrang-beim-infoevent-von-peter-at-und-dah-solar
3. /news/neue-e-auto-flotte-fur-osterreichweiten-aussendienst
4. /news/neue-finanzierung-macht-pv-anlagen-ab-58-euro-moglich
5. /news/peter-at-erstmals-hauptsponsor-bei-fussball-turnier-in-perchtoldsdorf
6. /news/peter-at-grundet-eigene-energiegemeinschaft-fur-haushalte
7. /news/peter-at-sommerfest-in-wiener-weinbergen-voller-erfolg
8. /news/peter-at-startet-empfehlungsprogramm-mit-250-euro-pramie
9. /news/peter-at-startet-kooperation-mit-betriebsrat-des-roten-kreuzes
10. /news/zwei-provenexpert-auszeichnungen-fur-peter-at-im-jahr-2024

Client-Stories: `/client-stories/goetz`, `/client-stories/tsulufis`, `/client-stories/verner`, `/client-stories/clon`.

## Seiten

### Startseite `/`

- `<title>`: `Mach dich unabhängig und senke deine Energiekosten | peter.at`
- Meta-Description: `peter.at ist die führende Wahl für schnelle und zuverlässige PV-Lösungen. Wir übernehmen den gesamten Prozess. Von der Planung, der Förderung bis hin zur fertigen Installation in nur 4 Wochen.`
- H1 wörtlich: `Das Leben ist unberechenbar. Deine Energie sollte es nicht sein.` (Klasse `heading-h1 hompage`)
- H2: 2 (`Häufige Fragen`, `Werde zum Held der österreichischen Energiewende`). H3: 18. H1-Tags im DOM: 13 (die Seite setzt `heading-h2`-Optik mehrfach als `<h1>`, siehe Anti-Patterns).
- Schema.org: keine. `application/ld+json` kommt 0 mal vor. Canonical: keiner. hreflang: keiner.
- Textmenge im Hauptbereich: 999 Wörter.

Sektionsliste in DOM-Reihenfolge:

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 0 | Nav, Countdown-Banner, Sticky-Header | `peter Sommerschlussverkauf startet in` | Countdown `Tage Std. Min. Sek.` | Full-bleed, 1 Zeile | keins | `Jetzt Ersparnis berechnen` | keins | `.header_countdown_banner` rot `#d90b0b`, darunter `header_countdown_old_banner` mit `Jetzt PV-Anlage ab 58€ pro Monat sichern`. Header `position: fixed`, `background-color: #fff0` |
| 1 | Hero | `Das Leben ist unberechenbar. Deine Energie sollte es nicht sein.` | `Mit Photovoltaik, Speicher, Wärmepumpe, Klima & Energiemanagement machst du dein Zuhause unabhängig und senkst deine Energiekosten.` (15 Wörter) | Full-bleed, Text links, Bild full-bleed dahinter | 2 Fotos (`hero__image-horizontal`, `hero__image-vertical`), 3 Proof-Bilder | 1 CTA: `Jetzt Ersparnis berechnen` | 3 Siegel-Bilder im `hero__proof`, rechts unten absolut positioniert, Höhe 8rem | `.hero { height: 100vh }`, Mobil unter 767px `height: 56rem`, unter 479px wieder `100vh`. H1 nutzt `font-size: 6.3vw` unter 479px |
| 2 | Benefits-Grid, dann Produkt-Slider | `Österreichs Partner #1 für nachhaltige Energie` | drei Benefits: `Persönlich und regional`, `Rundum-Sorglos-Paket`, `Fertig in wenigen Wochen` | Zentriert oben, darunter Carousel | 9 Produktbilder | keiner | keins | `h1.heading-h2` mit `<span class="heading-color-transparent">für nachhaltige Energie</span>`, also halbtransparenter Textteil |
| 3 | Rechner/Funnel plus Trust-Bar | `Starte deine Energiewende noch heute` | `Lass dir von unseren Experten eine kostenlose Projektplanung erstellen.` | Zentriert-schmal, 4er-Zeile darunter | Heyflow-Widget (`flow-id="peter-lp"`), 4 Avatare | im Widget, extern geladen | 4 Check-Items: `Über 98% Kundenzufriedenheit`, `100% Rundum-Sorglos-Paket`, `0€ Anzahlung`, `Bis zu 30 Jahre Garantie`. Darunter `Bereits über 1.000+ Dächer mit nachhaltiger Solarenergie ausgerüstet` mit 4 Avataren | Sektion `bg-color-black`. Heyflow liefert Inhalt per Shadow DOM, nicht im HTML |
| 4 | Referenzen, Carousel | `peter's Erfolgsgeschichten` | `Wer heute investiert, spart morgen` | Carousel/Slider | 14 Kundenorte als Slides, keine Bilder im HTML | keiner | Ortsnamen als Slides: Wien, Siebenhirten, Groß-Enzersdorf, Gerasdorf, Lanzenkirchen, Strasshof, Traiskirchen, Himberg u. a. | Swiper `customers` mit `centeredSlides: true`, `loop: true` |
| 5 | Vollbild-Zwischenbild | keine | keine | Full-bleed | 1 AVIF `Night scene with AC to cut no logo.avif` | keiner | keins | `.full-screen-image { aspect-ratio: 2 }`, nur Bild, keine Copy |
| 6 | Erklärgrafik Haus | `Jedes Zuhause braucht eine individuelle Energielösung` | `Mit unserem peter Power Home™ schaffen wir Lösungen, die Photovoltaikanlage, Batteriespeicher sowie Technologien ...` | Zentriert-schmal, Vollbild-Grafik | 1 AVIF `sheme.avif`, zweimal eingebunden (Desktop und Mobil) | keiner | keins | `span.text-color-transparent` auf `eine individuelle Energielösung`, Farbe `#0000004d` |
| 7 | Testimonials plus Karte | `Was sagt die peter Community?` | `Schließ dich hunderten Haushalten in deiner Nähe an` | Karte plus Carousel | `map-mask.svg` plus Particle-Canvas, 9 Testimonial-Slides, 4 Avatare | keiner | `Bereits über 1.000+ Dächer mit nachhaltiger Solarenergie ausgerüstet` | `particlesJS("particles-js", ...)`, 600 Partikel, Farbe `#f4c23c` |
| 8 | Finanzierung, 2 Spalten | `Dein Energiesystem ab 58€ im Monat` | `Wir wollen die Energiewende jetzt – und nicht später. Hohe Anfangskosten sollen dich nicht aufhalten.` | 2-Spalten 50/50 | keins | `Jetzt Ersparnis berechnen` | 3 Punkte: `Top-Zinssatz über die gesamte Laufzeit`, `Sondertilgungen jederzeit kostenlos möglich`, `In nur 2 Tagen erfolgreich abgewickelt` | Trennlinie je Item `border-bottom: 1px solid var(--white)` |
| 9 | App-Feature, 2 Spalten plus 3er-Grid | `Österreichs günstigste Energielösung` | `Der intelligente Energiemanager für dein Zuhause: Mit peter.pro steuerst du dein komplettes Energiesystem ...` | 2-Spalten plus 3er-Grid | 1 App-Screenshot `app-image.jpg` | keiner | keins | `Eigenverbrauch optimieren`, `Preissignalfähigkeit nutzen`, `Energie smart steuern` |
| 10 | Prozess-Steps, 3er | `In 3 einfachen Schritten zur Photovoltaikanlage` | 1 `In 1 Minute Ersparnis berechnen`, 2 `Persönliche und unverbindliche Beratung`, 3 `Professionelle Installation Ihrer neuen Photovoltaikanlage` | 3er-Grid auf Vollbild-Foto | 1 AVIF Hintergrund | `Jetzt Ersparnis berechnen` | drei Kreiszahlen `steps__number`, je 2rem rund, weiss | Body-Texte siezen hier, während die Headlines duzen |
| 11 | FAQ-Akkordeon | `Häufige Fragen` (h2) | keine | 2-Spalten, links Titel 16.25rem, rechts Liste 47.5rem | keins | keiner | keins | 4 Fragen, Antworten im HTML. Aufklappen per Webflow-IX2, nicht per `<details>` |
| 12 | Final-CTA | `Werde zum Held der österreichischen Energiewende` (h2) | keine | Zentriert-schmal | keins | `Jetzt Ersparnis berechnen` | keins | letzte Sektion vor dem Footer |
| 13 | Footer | `Endlich unabhängig mit peter.at` | keine | 2 Navigationsspalten plus Adressblock links, Logo Mitte | 4 Proof-SVGs, 1 Footer-Logo | keiner | 4 Siegel-SVGs (`Widget.svg`, `Widget-1.svg`, `footer-widget-2.svg`, `footer-widget-1.svg`), Adresse `Donauwörtherstraße 15, 2380 Perchtoldsdorf, Österreich` | Copyright `© peter.at 2026, All Rights Reserved.`, keine Social-Links |

Hero-Formel Startseite: H1 ist ein Nutzenversprechen in zwei Sätzen (`Das Leben ist unberechenbar. Deine Energie sollte es nicht sein.`), Subline 15 Wörter, 1 CTA (`Jetzt Ersparnis berechnen`), Trust im Hero sind 3 Siegel-Bilder ohne Zahl. Medientyp: zwei Fotos, horizontal und vertikal, je nach Viewport getauscht. Hero-Höhe `100vh` aus `.hero { height: 100vh }`.

CTA-Strategie Startseite: `Jetzt Ersparnis berechnen` 5 mal, alle auf `/anfragen`. Weiter gibt es `1 Ansehen`-freie Fläche. Sticky-Header-CTA: ja, `header__button` sitzt fest im `position: fixed` Header und ist immer sichtbar. Telefonnummer im Header: nein, nur auf `/kontakt` als `tel:+4314170780`.

Trust-Staffelung Startseite: 3 Siegel im Hero (Position 1), 4 Zahlen-Check-Items im Funnel-Block (Position 3), `1.000+ Dächer` plus Avatare (Position 3 und 7), 14 Referenzorte (Position 4), 9 Testimonials (Position 7), 4 Footer-Siegel (Position 13). Also Trust in jeder zweiten Sektion, aber kein Preis- oder Garantiebeleg im Hero.

Funnel Startseite: Sektion 3 ist der Einstieg, aber kein eigenes Multi-Step-Formular im HTML, sondern ein Heyflow-Widget `<heyflow-wrapper flow-id="peter-lp" id="peter-lp" dynamic-height style-config='{"width": "100%"}'>`. Schritte, Fragetypen und Fortschrittsanzeige sind damit nicht aus dem HTML belegbar. Vier Check-Items stehen als Microcopy neben dem Widget (`0€ Anzahlung`, `Bis zu 30 Jahre Garantie`).

### `/anfragen` (Funnel-Einstieg, Angebotsseite)

- `<title>`: `Angebot`. Keine Meta-Description. Kein Schema, kein Canonical.
- H1 wörtlich: `Photovoltaik-Komplettpaket inkl. Montage und limitierten Geschenken im Wert von über 8.869 €`
- H1-Tags im DOM: 5 (`heading-h2 is-custom-h1` einmal, `heading-h2 is-custom-h2` einmal, drei `heading-h3`). H2: 4, H3: 3. 429 Wörter.

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 0 | Hero-Angebot | `Photovoltaik-Komplettpaket inkl. Montage und limitierten Geschenken im Wert von über 8.869 €` | Badge `Der große Saisonabschluss · 21. bis 30. September` | 2-Spalten 60/40, `container-small` | 1 Foto `peter image top 1.jpg` mit srcset 500/800/1024w | keiner im Hero | 3 Check-Items mit Icons: `Bis zu 10 Cent Einspeisevergütung (Energiegemeinschaft)`, `Top-Dienstleister 2026`, `Ohne Anzahlung` | Sektion doppelt als `div.div-block-9` und innere `<section id="form">`, dadurch zwei IDs-Vorkommen im DOM |
| 1 | Funnel plus Logo-Wall | `In 2 Minuten kostenloses Angebot anfragen` | keine | Zentriert-schmal | Heyflow `flow-id="peter-lp"` plus gelber Pfeil-SVG `arrow-heyflow.svg` | im Widget | `Geprüfte Kundenzufriedenheit`: Top-Dienstleister 2026, ProvenExpert, weiteres Siegel. `peter.at ist Partner von`: Bank, DAH Solar, weiteres Logo | Heyflow-Wrapper mit `background-color: var(--white-secondary-surface)`, `border-radius: .25rem`, `padding: 2.5rem` |
| 2 | Prozess-Timeline, 3 Stufen | `Das peter.at Prinzip` | keine | Timeline, abwechselnd links und rechts | keine Bilder geladen (`stages_column is-hide`) | `Hier geht's zum Fragebogen →`, `Jetzt erhalten →`, `Jetzt Energiekosten sparen →`, alle auf `#` | keine | Sektion `section-bg-linear-red`, Kreiszahlen `stages_number` 3.5rem schwarz |
| 3 | Bewertungen plus Einzelstimme | `Top Bewertungen für unseren Service` | keine | Zentriert-schmal, dann 2-Spalten-Grid | 1 Kundenfoto, 1 Sternbild `rate_star` | keiner | `4,67 Sterne bei provenexpert.com`, `4,9 Sterne bei Google`, `4,67 Sterne bei trustpilot.com`. Einzelstimme `Herr Tsulufis aus Brunn am Gebirge, Intensivkrankenpfleger` mit `Anlage in Betrieb seit 19.02.2024` und `Größe 6,44 kWp` | Einzige Stelle mit Datum plus Anlagengröße als Beleg |
| 4 | Vergleichstabelle | `Vergleichen Sie es selbst` | keine | Vergleichstabelle, 3 Spalten, mobil `min-width: 40rem` | Icon-SVGs grün `#2BB757` und rot `#DF5144` | keiner | 8 Kriterien: `Top-Dienstleister 2026`, `0€ Anzahlung`, `Hauseigene Energiegemeinschaft`, `Österreichs günstigster Stromtarif (BEG)`, `10 Cent Einspeisevergütung (BEG)`, `Installation in wenigen Wochen`, `Attraktive Finanzierungsvarianten` | Spalte 2 ist `is-accent` und komplett leer im HTML, Spalte 3 heißt `Lokale Anbieter` und ist durchgehend rot |
| 5 | FAQ-Akkordeon plus Button | `Häufige Fragen` | keine | 2-Spalten wie Startseite | keins | `Jetzt PV-Anlage anfragen` (`button button_yellow`, href `#`) | keine | 3 Fragen, andere als auf der Startseite |

Funnel-Details `/anfragen`: Schritte, Fragetypen und Fortschritt stecken ausschliesslich im Heyflow-Widget und sind aus dem HTML nicht belegbar. Persönliche Daten werden erst im Widget erhoben, davor stehen zwei Sektionen ohne Formular. Microcopy vor dem Formular: `In 2 Minuten kostenloses Angebot anfragen`, im Hero `Ohne Anzahlung`. Auf der Seite selbst gibt es genau einen Button, alle anderen Einstiege laufen über das eingebettete Widget. Zusätzlich zählt ein Zähler im Header mit: `Bereits` plus `<div class="clones">000</div>` plus `PV-Anfragen gestellt`, gefüttert von PureCounter.

### `/erfahrungen` (Referenzen und Testimonials)

- `<title>`: `Erfahrungen`. Keine Meta-Description, kein Schema, kein Canonical.
- Erste H1 im Hero: Text `peter Hero Stories: Echte Kundenerfahrungen, echte Unabhängkeit` (Schreibfehler `Unabhängkeit` im Original). H1-Tags im DOM: 11, H2: 2, H3: 17. 1101 Wörter.

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 0 | Hero, Unterseiten-Variante | `peter Hero Stories: Echte Kundenerfahrungen, echte Unabhängkeit` | keine | Full-bleed mit Bild links | 1 Foto, `hero__cover` als Overlay | `Jetzt Ersparnis berechnen` auf `/anfragen` | keins | Klassen `hero another`, `hero__content another` |
| 1 | Kundenprojekte, Sammlung | keine eigene | keine | 3er-Grid aus CMS-Items | 13 `clients__video-item` mit Vorschaubild | keiner | je Item: Werte wie `10 kWp 10 kWh`, Ersparnis `Bis zu 97.518 €`, `Ersparnis auf 30 Jahre`, Klarname plus Ort (`Familia Gallati aus Ollersbach`) | Größte Trust-Sektion der Site. 13 Items von `Bis zu 48.182 €` bis `Bis zu 110.869 €` |
| 2 | Testimonials plus Karte | `Was sagt die peter Community?` | `Schließ dich hunderten Haushalten in deiner Nähe an` | Karte plus Carousel | Kartenmaske, Partikel, 9 Testimonial-Slides | keiner | `Bereits über 1.000+ Dächer mit nachhaltiger Solarenergie ausgerüstet` | identischer Block wie auf der Startseite |
| 3 | Empfehlungs-Teaser | `Jetzt Freunde empfehlen und 250€ geschenkt bekommen` | `Für jeden empfohlenen Neukunden erhältst du und die empfohlene Person eine Prämie in Höhe von 250€.` | 2-Spalten mit Bild | 1 Foto | `Jetzt Prämie erhalten` auf `/weiterempfehlen` | keine | `span.text-color-brand` auf `250€ geschenkt bekommen` |
| 4 | Logo-Wall | `Ausgezeichnet und offizieller Partner von` | keine | 7er-Reihe, einzeilig | 7 Siegel-Bilder | keiner | ProvenExpert Auszeichnungen mehrfach, Top Dienstleister 2026, DAH Solar, Bank | `.proof__logos` mit `border-radius: .25rem` und `overflow: hidden` |
| 5 | Bewertungs-Widget | `Zertifizierte Bewertungen` | keine | Zentriert-schmal | externes ProvenExpert-Widget | keiner | ProvenExpert | lädt zusätzlich `https://www.provenexpert.com/css/widget_landing.css` |
| 6 | Vier Kundeninterviews, Carousel | `Einfacher Prozess. Bessere Technologie. Zufriedene Kunden.` | je Slide Name, Ort, Anlagenwerte | Carousel/Slider | 4 Slides | `Jetzt lesen` je Slide | `4.3 kWp 5 kWh`, `Alexandra Götz im Interview`, `Brunn am Gebirge` | verlinkt auf `/client-stories/goetz`, `/tsulufis`, `/verner`, `/clon` |
| 7 | Funnel-Wiederholung | `Starte deine Energiewende noch heute` | `Lass dir von unseren Experten eine kostenlose Projektplanung erstellen.` | Zentriert | Heyflow | im Widget | dieselben 4 Check-Items | identischer Block wie Startseite Sektion 3 |
| 8 | FAQ-Akkordeon | `Häufige Fragen` | keine | 2-Spalten | keins | keiner | keine | dieselben 4 Fragen wie Startseite |
| 9 | Final-CTA | `Werde zum Held der österreichischen Energiewende` | keine | Zentriert | keins | `Jetzt Ersparnis berechnen` | keine | identischer Block wie Startseite |

### `/uber-peter-at` (Über uns)

- `<title>`: `Über peter.at`. Keine Meta-Description, kein Schema, kein Canonical.
- H1 im Hero: `Österreichs Energiezukunft beginnt bei peter.` H1-Tags im DOM: 14, H2: 2, H3: 12. 557 Wörter.

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 0 | Hero, Unterseiten-Variante | `Österreichs Energiezukunft beginnt bei peter.` | keine | Full-bleed | 1 Foto mit Overlay | `Jetzt Ersparnis berechnen` | keins | wie auf `/erfahrungen` |
| 1 | Mission, 2 Textspalten plus Karte | `Energie neu gedacht` | `Seit unserer Gründung setzen wir alles daran, Österreich unabhängiger von teuren Stromkonzernen zu machen.` | 2-Spalten 50/50 plus Vollbild | 1 Bild | `Jetzt Ersparnis berechnen` in `about__cta bg-color-white` | keins | `span.text-color-transparent` auf `sondern in eine nachhaltige Zukunft.` |
| 2 | Benefits-Grid | `Österreichs Partner #1 für nachhaltige Energie` | dieselben 3 Benefits wie Startseite | 3er-Grid | keins | keiner | `Persönlich und regional`, `Rundum-Sorglos-Paket`, `Fertig in wenigen Wochen` | auf dieser Seite steht `Nach nur vier Wochen` statt `Innerhalb kürzester Zeit` |
| 3 | Video-Sektion | `Unser Event für erneuerbare Energie in Wien` | `peter.at x DAH Solar` | Full-bleed Hintergrundvideo | `w-background-video` mit zwei `<source>`, Fortschrittsbalken | Play-Button | keins | Video-Modal öffnet YouTube `D3EySzeNV48` über embedly |
| 4 | Bewertungs-Widget | `Zertifizierte Bewertungen` | keine | Zentriert | ProvenExpert-Widget | keiner | ProvenExpert | wie auf `/erfahrungen` |
| 5 | Erklärgrafik Haus | `Jedes Zuhause braucht eine individuelle Energielösung` | wie Startseite | Zentriert | dieselbe `sheme.avif` | keiner | keins | wiederverwendeter Block |
| 6 | Logo-Wall | `Ausgezeichnet und offizieller Partner von` | keine | 7er-Reihe | 7 Siegel | keiner | wie `/erfahrungen` | wiederverwendet |
| 7 | Bundesländer, Carousel | `Meisterbetriebe vor Ort in ganz Österreich` | `Ob Gemeindebau oder Gründerzeithaus – auch in Wien wird Sonne zu Strom.` | Carousel, 9 Slides | keins | `Jetzt Verfügbarkeit prüfen` | 9 Bundesländer: Wien, Niederösterreich, Burgenland, Steiermark, Kärnten, Oberösterreich, Salzburg, Tirol, Vorarlberg, jeder mit eigener Zeile | stärkster lokaler Trust-Baustein der Site |
| 8 | Funnel-Wiederholung | `Starte deine Energiewende noch heute` | dieselbe Subline | Zentriert | Heyflow | im Widget | dieselben 4 Check-Items | wiederverwendet |
| 9 | FAQ-Akkordeon | `Häufige Fragen` | keine | 2-Spalten | keins | keiner | keine | dieselben 4 Fragen |
| 10 | Final-CTA | `Werde zum Held der österreichischen Energiewende` | keine | Zentriert | keins | `Jetzt Ersparnis berechnen` | keine | wiederverwendet |
| 11 | Video-Modal | keine | keine | Modal | YouTube-iframe | keiner | keine | `.video__modal`, per IX2 ein- und ausgeblendet |

### `/kontakt`

- `<title>`: `Kontakt`. Keine Meta-Description, kein Schema, kein Canonical.
- H1 wörtlich: `Sag Servus! Und kontaktiere uns` (zweiter Teil in `span.heading-color-transparent`). H1: 1, H2: 0, H3: 0. 74 Wörter, die kürzeste Seite.
- Eine einzige Sektion, 2-Spalten 50/50.

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 0 | Kontakt, 2 Spalten | `Sag Servus! Und kontaktiere uns` | `Die beste Zeit für ein individuelles Energiekonzept war gestern. Die zweitbeste ist jetzt! Kontaktiere jetzt einen unserer Experten.` | 2-Spalten 50/50 | kein Bild | Submit `Jetzt absenden` | `Telefonnummer +43 1 41 70 780` als `tel:`-Link, `E-Mail servus@peter.at` als `mailto:` | links Kontaktdaten, rechts Formular |

Formular `/kontakt`: 5 Felder in einem Schritt, alle Pflicht (`*` in `span.text-required`). Frageypen: `input type=text name=Vor--und-Nachname` mit Placeholder `Max Mustersonne`, `input type=text name=PLZ` mit Placeholder `1010`, `input type=email name=E-Mail-2` mit Placeholder `max@mustersonne.at`, `input type=number name=Telefonnummer` mit Placeholder `+43`, `textarea.form__area`. Keine Fortschrittsanzeige, kein Multi-Step. Erfolgsmeldung: `Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt und wir werden uns in Kürze bei Ihnen melden.` Fehlermeldung im Original auf Englisch: `Oops! Something went wrong while submitting the form.` Bemerkenswert: neben dem Webflow-Formular liegt ein zweites, verstecktes HubSpot-Embed (`data-form-id="fd721ad3-b939-4920-bde6-0bfb5b7b5f1d"`, `data-portal-id="139646081"`), das denselben Zweck erfüllt.

### `/weiterempfehlen` (Empfehlungsprogramm)

- `<title>`: `Jetzt 250€ im peter.at Empfehlungsprogramm sichern`. Meta-Description identisch mit der Startseite. Kein Schema, kein Canonical.
- H1 im Hero: `250 € für Sie und 250 € für jeden Kunden, den Sie werben`. H1-Tags: 6, H2: 3, H3: 7. 462 Wörter.

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 0 | Hero | `250 € für Sie und 250 € für jeden Kunden, den Sie werben` | `Empfehlen Sie peter.at an Familie, Freunde und Nachbarn und tragen Sie aktiv zur Energiewende in Österreich bei.` | Full-bleed | 1 Foto | `Jetzt Prämie erhalten` auf `#form` | keins | Anker-CTA springt direkt zum Formular |
| 1 | Benefits-Grid plus Bild | `Strahlend einfach empfehlen` | 3 Benefits: `250 € Prämie erhalten`, `Teil der Peter Family werden`, `Endlich unabhängig sein` | 3er-Grid | 1 Foto | keiner | keins | siezt durchgehend |
| 2 | Prozess-Steps, 3er plus Formular | `So funktioniert's` | 1 `Empfehlungscode teilen`, 2 `Kunden werben`, 3 `Prämien erhalten` | 3er-Grid, dann 2-Spalten-CTA-Block | Heyflow `flow-id="test-eca557"` | im Widget | keins | Hier greift das Code-Script: Feld mit `data-label="Peter-Code-Erstellung"` erzeugt `PETER-` plus 6 Zeichen, danach Redirect auf `/weiterempfehlen-link?code=[PETER-CODE]` |
| 3 | FAQ-Akkordeon | `Häufige Fragen` | keine | 2-Spalten | keins | keiner | keine | andere Fragen als Startseite, z. B. `Muss ich Kunde von peter.at sein, um eine Prämie zu erhalten?` |
| 4 | Final-CTA | `Jetzt weiterempfehlen und gemeinsam strahlen` | keine | Zentriert | keins | `Jetzt Prämie erhalten` | keine | eigene CTA-Copy, nicht die Standardzeile |

### `/karriere`

- `<title>`: `Karriere`. Keine Meta-Description, kein Schema, kein Canonical.
- H1 wörtlich: `Karriere bei peter.at`. H1: 2, H2: 7, H3: 21. 1387 Wörter, die längste der geprüften Kernseiten.

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 0 | Stellenliste, 7 Jobs | `Karriere bei peter.at` | `Lassen Sie uns gemeinsam die Energiewende gestalten` | Liste mit Akkordeon-Modal (`jobs__item`, `jobs__modal`) | keine Bilder | `Mehr anzeigen` 7 mal | 7 Rollen mit Anstellungsart und Ort | `Aftersales Projektmanager` (Mind. 30 h, Wien, Homeoffice möglich), `Kundenberater Online (Closer)` (Vollzeit, Wien), `Vertriebsassistenz (Setter)` (Vollzeit, Wien), `Planung Intern` (Teil-/Vollzeit, Wien), `Monteur` (Vollzeit, Österreichweit), `Elektriker` (Vollzeit, Österreichweit), `Vertriebsmitarbeiter / freier Handelsvertreter (Außendienst)` (Vollzeit, Österreichweit) |
| 1 | Bewerbungs-CTA | `Ihr Traumjob ist nicht dabei?` | `Senden Sie uns Ihre Initiativbewerbung an bewerbungen@peter.at` | Zentriert-schmal | keins | `bewerbungen@peter.at` als `mailto:` | keine | Sektion `bg-color-white--seccondary` |

### `/presse` und `/news` (identisch, gleiche Bytes)

- `<title>`: `peter.at News & Medienberichte`. Meta-Description vorhanden: `Aktuelle Pressemitteilungen, Medienberichte und News von peter.at – Österreichs Anbieter für PV-Anlagen, Speicherlösungen und intelligentes Energiemanagement.`
- H1 wörtlich: `Aktuelle News`. H1: 2, H2: 10, H3: 0. 230 Wörter. `/news` und `/presse` sind byteidentisch (54623 Bytes, `diff` zeigt keinen Unterschied).

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 0 | Presse-Übersicht | `Aktuelle News` | `Hier finden Sie aktuelle Nachrichten und die jüngsten Medieninformationen von peter.at` | Liste aus CMS-Items | je Artikel ein Bild | `Mehr lesen` 10 mal | 10 Artikel mit Datum | keine Filter, keine Paginierung sichtbar. Ein Artikel ist nur eine Rebranding-Meldung ohne Namen |
| 1 | Pressekontakt | `Wollen Sie über peter.at schreiben?` | `Senden Sie uns eine Email an servus@peter.at` | Zentriert-schmal | keins | `servus@peter.at` als `mailto:` | keine | Sektion `bg-color-white--seccondary` |

### `/news/peter-at-grundet-eigene-energiegemeinschaft-fur-haushalte` (Presseartikel)

- `<title>` dieser Seite nicht separat geprüft, Sektion liegt in `section bg-color-white`.
- H1 wörtlich: `peter.at gründet eigene Energiegemeinschaft für Haushalte`. Subline: `Ab sofort können Kundinnen und Kunden Teil einer regionalen Stromgemeinschaft werden.`
- H1: 6, H2: 6, H3: 0. 404 Wörter. Kein Schema, kein Canonical.
- Aufbau: H1, Subline in `text-size-large text-color-secondary`, `news_hero-image`, dann `div.text-rich-text.w-richtext` mit 4 `<p>`, dann `client-story__similar-post` mit H2 `Ähnliche Beiträge` und 4 Teaser-Karten mit `Mehr lesen`, darunter FAQ-Sektion und Final-CTA.
- Keine Autorenbox, keine Lesezeit, kein Datum im sichtbaren Text, kein Inhaltsverzeichnis, keine Key-Takeaways-Box, keine Zwischen-CTAs im Artikelkörper. Interne Links: nur die 4 Teaser plus Footer, keine In-Text-Links.
- Alle 4 Absätze sind Fließtext ohne Struktur. Das ist eher eine Pressemeldung als ein Ratgeberartikel.

### `/client-stories/goetz` (Kundeninterview)

- H1: 8, H2: 2, H3: 13. 915 Wörter. Keine Meta-Description, kein Schema.
- Aufbau: H1, langer Intro-Absatz, Interview im Frage-Antwort-Muster (`Götz:` als Sprecherkennzeichnung), dann ähnliche Beiträge und Final-CTA. Auch hier keine Autorenbox, keine Lesezeit, kein Datum.

### `/pv-handbuch` (Ratgeber)

- `<title>`: `PV Handbuch`. H1-Tags: 32, H2: 6. 2153 Wörter, längster Text der Site.
- Nutzt eigene FAQ-Klassen `pv-handbuch-faq-answer-wrapper` mit eigenen IX2-Aktionen (`FAQ Open pv-handbuch`, `FAQ Close pv-handbuch`). Diese Seite ist aus der Navigation und aus dem Footer nicht verlinkt.
- H1-Tags im Überfluss, weil jede Handbuch-Überschrift ein `<h1>` ist.

### `/partnerbetrieb-werden`

- `<title>`: `Partnerbetrieb werden`. H1: 1, H2: 0, H3: 3. 124 Wörter, kürzeste Unterseite nach `/kontakt`.
- H1 wörtlich: `Werden Sie unabhängiger Montagepartner`. Nur eine Sektion mit Heyflow `flow-id="partnerbetriebe"` und `style-config` inklusive `"backgroundColor": "#f5f5f5"`. Kein eigener Textblock mit Vorteilen.

### Rechtliches: `/impressum`, `/agb`, `/widerrufsrecht`, `/datenschutzerklarung`

| Seite | `<title>` | H1 | H2 | Wörter |
|---|---|---|---|---|
| /impressum | `Impressum \| peter.at` | 1 | 0 | Firmendaten PTR Energie GmbH, FN 629991 h, UID ATU80896345, Handelsgericht Wiener Neustadt, GF Pascal Mansouri |
| /agb | `AGB \| peter.at` | 1 | 19 | langer Vertragstext |
| /widerrufsrecht | `Widerrufsrecht \| peter.at` | 1 | 0 | kurzer Text |
| /datenschutzerklarung | `Datenschutzerklärung \| peter.at` | 1 | 16 | langer Text, erwähnt Google Analytics, Facebook Pixel und ein Cookie-Consent-Tool |

## Design-System

Grundlage: `https://cdn.prod.website-files.com/67c1e15dd78e4c417dc5ea2d/css/peter-at-v2.webflow.shared.f162c4cdc.css`, 136641 Bytes, auf allen 17 geprüften Seiten dieselbe Datei. Zusätzlich `swiper@11/swiper-bundle.min.css` von jsdelivr, auf `/erfahrungen` und `/uber-peter-at` auch `provenexpert.com/css/widget_landing.css`.

**Fonts.** Nur eine echte Markenschrift, kein Google Fonts, kein Adobe Fonts.

| Family | Quelle | Gewicht | Format |
|---|---|---|---|
| `ABC` | `67c1e23159ec474be049e658_PPNeueMontreal-Regular.woff2` | 400 | woff2, `font-display: swap` |
| `ABC` | `690489b34c821e0abac141cb_PPNeueMontreal-Bold.woff2` | 700 | woff2, `font-display: swap` |
| `webflow-icons` | Inline-Base64-TTF | normal | nur für Webflow-Widgets |

Body-Stack: `font-family: ABC, Arial, sans-serif; font-size: 1rem; line-height: 1.5; color: var(--white)`. Kein Display-Font, kein Serif, kein Kontrastpaar. Die Seite nutzt nur eine Familie in zwei Gewichten. `@font-face`-Familie heißt `ABC`, geladen wird PP Neue Montreal, also ein lizenzpflichtiger Font über CDN.

**Farben.** Die 10 häufigsten Werte aus dem Stylesheet mit Vorkommen:

| Rang | Wert | Vorkommen | Rolle |
|---|---|---|---|
| 1 | `#0000` | 20 | transparent, vor allem die Header-Fläche im Ausgangszustand |
| 2 | `#000` | 16 | Text und Sektionshintergrund, `--black` |
| 3 | `#fff` | 15 | Text auf Schwarz, Sektionshintergrund, `--white` |
| 4 | `#ccc` | 7 | Sekundärtext auf Dunkel, `--white-secondary-text` |
| 5 | `#3898ec` | 7 | Webflow-Standardblau, nur für Widget-Standardzustände |
| 6 | `#fff0` | 6 | Header-Hintergrund transparent |
| 7 | `#ddd` | 6 | Webflow-Standardrahmen |
| 8 | `#222` | 6 | Webflow-Standardtext |
| 9 | `#0000004d` | 5 | halbtransparenter Headline-Teil, `heading-color-transparent` |
| 10 | `#ffffff26` | 4 | 1px-Rahmen auf Dunkel, `border-bottom: 1px solid #ffffff26` |

Akzent auf Buttons: `--brand: #f4c23c`, Hover `--brand-hover: #f6d153`. Weitere Markenwerte: `--blue: #3c82f6` und `--blue-hover: #2563eb`, `--green: #2bb757` (Häkchen-Icons, `bg-red-custom` als Gegenstück), `#DF5144` (rotes X in der Vergleichstabelle), `#d90b0b` (Countdown-Banner), `#fac63b` (`button button_yellow`). Hintergründe: `--white`, `--black`, `--background-white-secondary: #fbfbfb`, `--white-secondary-surface: whitesmoke`.

CSS-Custom-Properties vollständig:

```
:root {
  --white: white;
  --brand: #f4c23c;
  --white-secondary-surface: whitesmoke;
  --black: #000;
  --white-secondary-text: #ccc;
  --dark-secondary-text: #4e4e4e;
  --border-light: #e0e0e0;
  --white-tertiary-text: #4d4d4d;
  --background-white-secondary: #fbfbfb;
  --brand-hover: #f6d153;
  --blue: #3c82f6;
  --blue-hover: #2563eb;
  --green: #2bb757;
  --brand-text: var(--brand);
}
```

**Radius.** `border-radius: .25rem` kommt 39 mal vor und ist der Grundwert für Buttons, Karten, Badges, Heyflow-Wrapper und Logo-Walls. Danach `100%` 17 mal (Kreise für Step-Nummern, Avatare, Icon-Flächen), `6px` 3 mal (nur Countdown-Kacheln), `50%` 3 mal, `8px` 2 mal, `4px` 2 mal. Buttons sind also eckig mit leichtem Radius, nicht pill (`border-radius: .25rem`, nicht `9999px`).

**Shadows.** Praktisch keine. Im gesamten Stylesheet gibt es 7 `box-shadow`-Deklarationen, davon mehrere Webflow-Standards: `box-shadow: 0 0 3px 1px #3898ec`, `box-shadow: 0 0 #0003`, `box-shadow: 0 0 0 2px #fff`, `box-shadow: 0 0 0 1px #0000001a, 0 1px 3px #0000001a`. Die Seite arbeitet mit Flächen und Rahmen statt mit Tiefe.

**Spacing und Container.**

| Element | Wert |
|---|---|
| `.container` | `max-width: 77.5rem`, `padding: 8rem 2.5rem`, `grid-gap: 5rem`, `flex-flow: column` |
| `.container` unter 991px | `max-width: 75rem`, `padding-left/right: 1.25rem` |
| `.container` unter 767px | `gap: 2.5rem`, `padding-top/bottom: 5rem` |
| `.container-small` | `max-width: 62.75rem`, `padding: 2rem`, `gap: 2rem` |
| `.faq__heading` | `max-width: 16.25rem` |
| `.faq__list` | `max-width: 47.5rem` |
| `.col-4` | `max-width: 22.5rem` |
| `.col-5` | `max-width: 28.75rem` |
| `.col-6` | `max-width: 35rem` |
| Sektions-Padding | kein eigenes `.section`-Padding, alles über `.container` |
| Breakpoints | nur `@media screen and (max-width: 991px)`, `(max-width: 767px)`, `(max-width: 479px)` |

**Typo-Skala.** Kein `clamp()` im gesamten Stylesheet, keine `letter-spacing`-Deklaration ausser `unset` und `normal`. Alles in festen `rem`-Werten mit Breakpoint-Sprüngen.

| Klasse | Größe | Gewicht | Line-Height |
|---|---|---|---|
| `.heading-h1` | `2.5rem` | 400 | 1.2 |
| `.heading-h1` unter 767px | `2rem` | 400 | 1.3 |
| `.heading-h1.hompage` unter 479px | `6.3vw` | 400 | 1.3 |
| `.heading-h2` | `2rem` | 400 | 1.25 |
| `.heading-h2` unter 767px | `1.75rem` | 400 | 1.25 |
| `.heading-h3` | `1.25rem` | 400 | 1.4 |
| `.text-size-xl` | `1.5rem` | 400 | 1.5 |
| `.text-size-large` | `1.25rem` | 400 | 1.6 |
| `.text-size-medium` | `1.125rem` | 400 | 1.5 |
| `.text-size-base` | `1rem` | 400 | 1.5 |
| `.text-size-small` | `.875rem` | 400 | 1.5 |

Alle Headlines stehen auf `font-weight: 400`, auch die H1. Es gibt keine fette Headline. Fett (`700`) kommt nur im Fließtext und in Buttons vor. Das ist der auffälligste Typografie-Entscheid der Site.

**Buttons.**

```css
.button {
  grid-column-gap: .5rem;
  grid-row-gap: .5rem;
  background-color: var(--brand);
  color: var(--black);
  border-radius: .25rem;
  padding: .75rem 1rem .75rem 1.25rem;
  text-decoration: none;
  transition: all .2s;
  display: inline-flex;
}
.button:hover { background-color: var(--brand-hover); }
.button_yellow { background-color: #fac63b; }
```

CTA-Aufbau im HTML ist immer gleich: `<a class="button w-inline-block">` mit zwei Kindern, `div.button-text` und `div.icon w-embed` (Pfeil-SVG `path d="M8 6.4873L6.95 7.5373L11.15 11.7373H2V13.2373H11.15L6.95 17.4373L8 18.4873L14 12.4873L8 6.4873Z"`). Der Pfeil sitzt also rechts im Button, nicht als eigenes Icon.

**Header.** `.header { background-color: #fff0; border-bottom: 1px solid #ffffff26; position: fixed; inset: 0% 0% auto; transition: all .2s; }`. Beim Scrollen färbt ein jQuery-Script den Header per Inline-Style auf `#fff` um und setzt `.header__link` auf `#000`. `.header__link { padding: 1.75rem 1.25rem; transition: all .2s; }`, Hover `opacity: .5`, aktive Seite ebenfalls `opacity: .5`. Mobil wird das Menü `height: 100vh`, `background-color: var(--black)`, `z-index: 99`.

**Bilder.** Formate über alle Seiten: 139 SVG, 84 AVIF, 23 JPG, 2 PNG plus 1 webm und 1 mp4. Kein WebP. `loading="lazy"` 234 mal, `loading="eager"` 14 mal, `fetchpriority` 0 mal. `srcset` auf der Startseite 12 mal bei 74 `<img>`-Tags, also nur ein Teil ist responsiv aufgelöst. Die Startseite hat 56 AVIF-Referenzen. Hero-Bilder sind ausgerechnet `loading="lazy"`, auch `.hero__image-horizontal`.

## Animationen

**Transition-Deklarationen vollständig.** Keine `cubic-bezier()`-Funktion im gesamten Stylesheet, kein `@keyframes` ausser einem.

| Selektor | Transition |
|---|---|
| `.button` | `all .2s` |
| `.header` | `all .2s` |
| `.header__logo` | `all .2s` |
| `.header__link` | `all .2s` |
| `.header__button` | `all .2s` |
| `.preloader` | `all .2s` |
| `.video__button` | `all .2s` |
| `.video__close-button` | `all .2s` |
| `.form__field` | `all .2s` |
| `.form__button` | `all .2s` |
| `.form__area` | `all .2s` |
| `.jobs__item` | `all .2s` |
| `.jobs__close` | `all .2s` |
| `.news_item` | `all .2s` |
| `.client-story__similar-post-item.customer-noactive-slide` | `all .2s` |
| `.swiper-slide.customer-noactive-slide` | `all .2s` |
| `.swiper-nav`, `.swiper-nav-disable` | `border-color .2s` |
| `.footer__navigation-link` | `opacity .2s` |
| `.w-slider-dot` | `background-color .1s, color .1s` |
| `.w-lightbox-control` | `all .3s` |
| `.w-webflow-badge`, `.w-webflow-badge > img` | `unset` |

**Keyframes.** Genau einer:

```css
@keyframes spin {
  0% { transform: rotate(0); }
  100% { transform: rotate(360deg); }
}
```

Verwendung: `animation: .8s linear infinite spin`, einmal im Stylesheet, für den Preloader-Spinner. Auf den gefetchten Seiten ist kein `.preloader`-Element im DOM, die Regel läuft also ins Leere.

**Motion-Libraries im HTML und JS.**

| Library | Belegt durch | Einsatz |
|---|---|---|
| Swiper 11 | `cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js` plus CSS | alle Carousels, 78 Nennungen `swiper` auf der Startseite |
| particles.js 2.0.0 | `cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js` | Karte im Community-Block |
| PureCounter | `cdn.jsdelivr.net/npm/@srexi/purecounterjs/dist/purecounter_vanilla.js` | Zähler `Bereits ... PV-Anfragen gestellt` auf `/anfragen` |
| Webflow IX2 | `webflow.schunk.e15f4730386f54d9.js`, 207854 Bytes | FAQ, Mobilmenü, Reveals, Modals, Marquee |
| Heyflow Widget | `static.heyflow.app/widget/latest/webview.js` | alle Formulare |
| jQuery 3.5.1 | `d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min...js` | Header-Farbskript, Countdown |

Nicht vorhanden: GSAP, ScrollTrigger, Lenis, Framer Motion, AOS, Splide, Lottie, Rive, Three.js. Keine `data-w-id`-Massen, nur 5 auf der Startseite, alle für FAQ-Fragen.

**Scroll-Reveal.** Muster ist die Klasse `.fade-bottom` auf Containern, verdrahtet über IX2-Event `e-13`: `eventTypeId: "SCROLL_INTO_VIEW"`, `actionTypeId: "SLIDE_EFFECT"`, `config: { actionListId: "slideInBottom", scrollOffsetValue: 30, scrollOffsetUnit: "%", direction: "BOTTOM", effectIn: true }`, Ziel `{ selector: ".fade-bottom", appliesTo: "CLASS" }`. Kein Stagger, kein Delay, jedes Element startet gleichzeitig beim eigenen Eintritt. Achtung: `.fade-bottom` hat zusätzlich eine Layout-Bedeutung, unter 767px setzt das Stylesheet `.fade-bottom { padding-bottom: 2.5rem }`. Die Klasse macht also zwei Dinge.

**Hover-Effekte.** `.button:hover` wechselt nur `background-color` von `#f4c23c` auf `#f6d153`. `.header__link:hover` setzt `opacity: .5`. `.header__button:hover` setzt `border-color: var(--white)`. `.footer__navigation-link` blendet per `opacity .2s`. Karten skalieren nicht per CSS, sondern per IX2: News-Hover skaliert `.image.cover` auf `1.1` (siehe Rezepte).

**Zähler.** PureCounter auf `/anfragen` mit `selector: '.clones'`, `start: 136`, `end: getCurrentDate(result)`, `duration: 2` Sekunden, `delay: 10`, `decimals: 0`. `result` startet bei `26179` und addiert pro Tag seit dem 22.05.2024 eine mit `Math.sin` deterministisch erzeugte Zahl zwischen 30 und 80. Der Zähler wächst also jeden Tag ohne echte Datenquelle.

**Marquee.** IX2-Aktion `a-12` mit Titel `Partner Logos Loop`: `TRANSFORM_MOVE` auf `.partner-logos__holder`, `xValue: -100`, `xUnit: "%"`, `duration: 30000`, danach Rücksprung `xValue: 0`, `duration: 0`. Das ist der einzige Loop, 30 Sekunden pro Durchlauf.

**Parallax und Sticky-Sections.** Kein Parallax. `.header` ist `position: fixed` mit `inset: 0% 0% auto`. Keine scrollgesteuerten Hintergrundbewegungen.

**Video-Autoplay.** `/uber-peter-at` nutzt `div.background-video-2.w-background-video` mit zwei `<source>`-Tags und eigenem Fortschrittsbalken (`video__progress`), plus Modal mit YouTube-iframe über embedly. Autoplay-Attribut im Quelltext nicht gesetzt, Webflow setzt es zur Laufzeit.

**Reduced-Motion.** `prefers-reduced-motion` kommt 0 mal im Stylesheet vor. Es gibt keine Rücksicht auf Bewegungsreduzierung, obwohl 600 Partikel und 1000ms-Slides laufen.

## Synthese

### 1. Seitentyp-Blueprints

**Startseite** (13 Blöcke, alle auf `bg-color-black` und `bg-color-white` im Wechsel):

1. Sticky-Header mit Countdown-Banner, Logo, 4 Nav-Links, CTA-Button (Full-bleed)
2. Hero mit H1, Subline, 1 CTA, 2 Fotos, 3 Siegeln rechts unten (`100vh`, Text links)
3. Benefits-Grid 3er plus Produkt-Carousel mit 9 Slides (zentriert, dann Carousel)
4. Funnel-Block mit H2, 4 Check-Items, Heyflow-Widget, 1.000-plus-Beweis mit 4 Avataren (Zentriert-schmal)
5. Referenz-Carousel mit 14 Orten (Carousel)
6. Vollbild-Zwischenbild ohne Text (Full-bleed)
7. Erklärgrafik Haus mit H2 und Subline (Zentriert-schmal)
8. Community-Block mit Karte, Partikeln, 9 Testimonials (Karte plus Carousel)
9. Finanzierung 2-Spalten mit H2, 1 CTA, 3 Punkten (2-Spalten 50/50)
10. App-Block 2-Spalten plus 3er-Grid (2-Spalten plus 3er-Grid)
11. Prozess-Steps 3er auf Vollbild-Foto (3er-Grid)
12. FAQ-Akkordeon mit 4 Fragen (2-Spalten 30/70)
13. Final-CTA zentriert (Zentriert-schmal)
14. Footer 2 Navigationsspalten plus Adresse (Full-bleed)

**Leistungs- und Angebotsseite** (`/anfragen` als Muster):

1. Hero-Badge mit Aktionszeitraum plus H1 mit Wertversprechen plus 3 Check-Items plus Foto (2-Spalten 60/40)
2. Funnel-Block mit H1 und Heyflow-Widget plus Logo-Wall in 2 Gruppen (Zentriert-schmal)
3. Prozess-Timeline 3 Stufen (Timeline)
4. Bewertungsblock mit 3 Portalen und Einzelstimme mit Anlagenwerten (Zentriert plus 2-Spalten)
5. Vergleichstabelle 8 Kriterien gegen `Lokale Anbieter` (Vergleichstabelle)
6. FAQ-Akkordeon plus gelbem CTA-Button (2-Spalten)
7. Footer

**Über-uns** (`/uber-peter-at`):

1. Hero mit H1 und 1 CTA (Full-bleed)
2. Mission 2 Textspalten plus Bild plus CTA-Karte (2-Spalten 50/50)
3. Benefits-Grid 3er (3er-Grid)
4. Video-Sektion mit Fortschrittsbalken und Play-Button (Full-bleed)
5. Bewertungs-Widget (Zentriert)
6. Erklärgrafik Haus (Zentriert-schmal)
7. Logo-Wall 7er (Zentriert)
8. Bundesländer-Carousel mit 9 Slides und CTA (Carousel)
9. Funnel-Block (Zentriert-schmal)
10. FAQ-Akkordeon (2-Spalten)
11. Final-CTA (Zentriert)
12. Video-Modal (Modal)
13. Footer

**Referenzen** (`/erfahrungen`):

1. Hero mit H1 (Full-bleed)
2. 13 Kundenprojekte mit Anlagenwerten, Ersparnis und Klarnamen (3er-Grid)
3. Community-Block mit Karte und Testimonials (Karte plus Carousel)
4. Empfehlungs-Teaser mit 250-Euro-Angebot (2-Spalten)
5. Logo-Wall (Zentriert)
6. Bewertungs-Widget (Zentriert)
7. Vier Kundeninterviews als Carousel (Carousel)
8. Funnel-Block (Zentriert)
9. FAQ (2-Spalten)
10. Final-CTA (Zentriert)
11. Footer

**Ratgeber-Übersicht** (`/presse`, `/news`):

1. H1 plus Intro (Zentriert-schmal)
2. 10 Artikelkarten mit Bild, Titel, Subline, `Mehr lesen` (Liste)
3. Pressekontakt mit Mailadresse (Zentriert)
4. Footer

**Artikel** (Presseartikel oder Kundeninterview):

1. H1 plus Subline plus Hero-Bild (zentriert-schmal)
2. Fließtext in `w-richtext` (Zentriert-schmal)
3. H2 `Ähnliche Beiträge` plus 4 Teaser (Liste)
4. FAQ (2-Spalten)
5. Final-CTA (Zentriert)
6. Footer
Kein Inhaltsverzeichnis, keine Autorenbox, keine Lesezeit, kein Datum, keine Zwischen-CTAs.

**Funnel** (`/anfragen`, `#form`):

1. Formularsektion mit H1, Heyflow-Widget, Pfeil-Grafik, Logo-Wall (Zentriert-schmal)
2. danach Prozess, Bewertungen, Vergleich, FAQ als Vertrauensaufbau nach dem Formular
Der eigentliche Funnelinhalt liegt im Heyflow-Widget und ist aus dem HTML nicht rekonstruierbar.

### 2. Die 5 stärksten Muster

**Muster 1: Ein wiederverwendbarer Sektionstypen-Baukasten über alle Seiten.** Dieselben Blöcke tauchen in identischer Reihenfolge auf: Funnel-Block, FAQ, Final-CTA, Bewertungen, Logo-Wall, Erklärgrafik. Beleg: `erfahrungen.html` Sektionen 2, 7, 8, 9 und `index.html` Sektionen 7, 11, 12 nutzen dieselben Klassen `faq`, `quiz`, `cta`, `map`, `scheme`. Ein Agent kann sieben Blöcke bauen und daraus alle 17 Seiten montieren.

**Muster 2: Trust wird quantifiziert und lokal verankert, nicht behauptet.** Die Zahlen stehen wörtlich im HTML. Beleg `index.html`: `Über 98% Kundenzufriedenheit`, `0€ Anzahlung`, `Bis zu 30 Jahre Garantie`, `Bereits über 1.000+ Dächer mit nachhaltiger Solarenergie ausgerüstet`. Beleg `anfragen.html`: `4,67 Sterne bei provenexpert.com`, `4,9 Sterne bei Google`, `4,67 Sterne bei trustpilot.com`. Beleg `erfahrungen.html`: 13 Einzelprojekte mit Klarnamen, Ort, kWp, kWh und Ersparnis von `Bis zu 48.182 €` bis `Bis zu 110.869 €` auf `Ersparnis auf 30 Jahre`. Beleg `uber-peter-at.html`: alle 9 Bundesländer einzeln mit eigener Zeile. Das ist die stärkste Conversion-Mechanik der Site.

**Muster 3: Preis und Monatsrate als Lead-Hook im Hero-nahen Bereich.** `Dein Energiesystem ab 58€ im Monat` (Startseite Sektion 8), `Jetzt PV-Anlage ab 58€ pro Monat sichern` (Header-Banner), `Ab nur 58€ pro Monat gehört deine Energielösung sofort dir` (Produkt-Slide `peter.pay`), `Ab 58€ pro Monat` in `Presse` (`Neue Finanzierung macht PV-Anlagen ab 58 Euro möglich`). Dieselbe Zahl in vier Kontexten, immer mit `0€ Anzahlung` daneben.

**Muster 4: Halbtransparenter Headline-Teil als Signatur.** Jede grosse H2 ist zweigeteilt: erster Teil weiss oder schwarz, zweiter Teil in der Akzentfarbe oder halbtransparent. Beleg `index.html`: `<h1 class="heading-h2">In 3 einfachen Schritten<br/><span class="text-color-brand">zur Photovoltaikanlage</span></h1>`, `<h1 class="heading-h2 text-color-black">Jedes Zuhause braucht eine individuelle Energielösung<br/><span class="text-color-transparent">eine individuelle Energielösung</span></h1>`. CSS: `.text-color-transparent { color: #0000004d }` und `.heading-color-transparent { color: #0000004d }`, `.text-color-brand { color: var(--brand) }`.

**Muster 5: Radikale Typo-Reduktion, ein Font, ein Gewicht für Headlines.** Beleg `style.css`: nur zwei `@font-face`-Blöcke für die Marke, `.heading-h1 { font-weight: 400 }`, `.heading-h2 { font-weight: 400 }`, `.heading-h3 { font-weight: 400 }`. Kein `clamp()`, kein Serif, kein Google Fonts. Die Hierarchie entsteht allein über Grösse, Weissraum und Farbfläche (`bg-color-black` gegen `bg-color-white` im Wechsel). Das ist billig zu kopieren und wirkt trotzdem eigenständig.

### 3. Animation-Rezepte mit exakten Werten

**Rezept A: Scroll-Reveal von unten, die Standardanimation der Site.** Ziel sind alle Container mit `.fade-bottom`, Trigger `SCROLL_INTO_VIEW` bei 30 Prozent Sichtbarkeit, Richtung `BOTTOM`.

```css
.fade-bottom { opacity: 0; transform: translateY(100px); }
.fade-bottom.is-in { opacity: 1; transform: translateY(0); transition: transform 1000ms cubic-bezier(0.25, 1, 0.5, 1), opacity 1000ms cubic-bezier(0.25, 1, 0.5, 1); }
```

Die Werte stammen wörtlich aus dem IX2-Preset `slideInBottom` in `webflow.schunk.e15f4730386f54d9.js`: `{actionTypeId:"STYLE_OPACITY", config:{delay:0, duration:0, value:0}}`, dann `{actionTypeId:"TRANSFORM_MOVE", config:{delay:0, duration:0, xValue:0, yValue:100, xUnit:"PX", yUnit:"PX"}}`, dann `{actionTypeId:"TRANSFORM_MOVE", config:{delay:0, easing:"outQuart", duration:1e3, yValue:0}}` plus `{actionTypeId:"STYLE_OPACITY", config:{delay:0, easing:"outQuart", duration:1e3, value:1}}`, Trigger `config:{scrollOffsetValue:30, scrollOffsetUnit:"%", direction:"BOTTOM", effectIn:true}`. Das Easing `outQuart` ist in Webflow definiert als `cubic-bezier(0.165, 0.84, 0.44, 1)`-Klasse, im gebündelten Code als `Math.pow(e-1,4)+1` umgesetzt. Wer den exakten `cubic-bezier`-String will: die Seite selbst enthält keinen, nur die Funktionsnamen.

**Rezept B: FAQ-Akkordeon, Höhe plus Icon-Rotation.** Zwei Aktionen, `a` (Open) und `a-2` (Close), beide 500ms `ease`.

```css
.faq__answer { overflow: hidden; height: 0; transition: height 500ms ease; }
.faq__question .icon { transition: transform 500ms ease; }
.faq__item.is-open .faq__answer { height: auto; }
.faq__item.is-open .faq__question .icon { transform: rotate(45deg); }
```

Wörtlich aus dem IX2-Config: Open-Aktion `a` setzt initial `STYLE_SIZE` auf `.faq__answer` mit `heightValue:0`, dann `STYLE_SIZE` auf `heightUnit:"AUTO"`, `duration:500`, `easing:"ease"`, und `TRANSFORM_ROTATE` auf `.icon` mit `zValue:45`, `duration:500`, `easing:"ease"`. `useFirstGroupAsInitialState: true`. Das Icon ist ein Plus-SVG (`path d="M12 4.1543V20.1543M20 12.1543H4"`), das um 45 Grad zu einem X wird. Es gibt dieselbe Aktion dreimal im Bundle (`a`/`a-2`, `a-15`/`a-16`, `a-23`/`a-24`) plus eine Variante für `/pv-handbuch` (`a-25`/`a-26`).

**Rezept C: Mobiles Menü, Kaskade aus 100, 200 und 500 Millisekunden.** Aktion `a-3` mit `useFirstGroupAsInitialState: true`.

```
Initial:    .header__nav-menu  opacity 0,            duration 500ms
Schritt 1:  .header__nav-menu  opacity 1,            duration 200ms, ease
            .header__menu-line-middle  opacity 0,    duration 100ms, ease
            .header__menu-line-top     translateY .34375rem, duration 200ms, ease
            .header__menu-line-bottom  translateY -.34375rem, duration 100ms, ease
Schritt 2:  .header__menu-line-top     rotate 45deg,  duration 100ms, ease
            .header__menu-line-bottom  rotate -45deg, duration 100ms, ease
```

Schliessen spiegelt: `a-4` dreht zuerst zurück (`zValue: 0`, 100ms), blendet die Mittellinie ein, fährt dann beide Linien auf `yValue: 0`. `.34375rem` entspricht 5.5px bei 16px Basis.

**Rezept D: Logo-Marquee, 30 Sekunden, ohne Keyframes.**

```css
.partner-logos__holder { animation: marquee 30s linear infinite; }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
```

Webflow macht das nicht per CSS, sondern per IX2-Aktion `a-12` mit Titel `Partner Logos Loop`: `{actionTypeId:"TRANSFORM_MOVE", config:{selector:".partner-logos__holder", xValue:-100, xUnit:"%", duration:3e4}}`, dann `{xValue:0, duration:0}`. Ein Loop von 30 Sekunden, keine Pause, kein Easing.

**Rezept E: Karten-Zoom bei Hover.** Zwei Aktionen, `a-13` (News Hover In) und `a-14` (New Hover Out), Ziel ist `.image.cover` als Kind.

```css
.news_item .image.cover { transition: transform 800ms; }
.news_item:hover .image.cover { transform: scale(1.1); }
```

Wörtlich: `{actionTypeId:"TRANSFORM_SCALE", config:{useEventTarget:"CHILDREN", selector:".image.cover", xValue:1.1, yValue:1.1, locked:true, duration:800, easing:[.3,1,.3,1]}}`. Das Easing ist als Array `[.3, 1, .3, 1]` hinterlegt, also eine Cubic-Bezier-Kurve, die im Code als Kontrollpunkte gelesen wird. Achtung: die 800ms sind die längste Hover-Dauer der Site, gepaart mit 1.1 Zoom, das wirkt träge.

**Rezept F: Browser-Tab-Titel-Zähler und Header-Farbschema per jQuery.** Das Header-Skript ist der einzige Ort mit eigenen Farbwechseln und nicht per CSS-Lösung umgesetzt.

```javascript
// aus index.html, gekürzt, Original nutzt jQuery
$('.header').css('background-color', '#fff');
$('.header').css('border-color', '#e0e0e0');
$('.header__logo, .header__link').css('color', '#000');
$('.header__button').css({ 'background-color': '#f4c23c', 'border-color': '#f4c23c', 'color': '#000' });
```

Ausgangszustand: `background-color: #fff0`, `border-color: #ffffff26`, Textfarbe `#fff`, Button transparent mit Rahmen `#ffffff26`. Der Schwellwert ist `$(window).scrollTop() > 0`, also schon nach dem ersten Pixel. Wer das nachbaut, sollte es per CSS-Klasse und `IntersectionObserver` machen, nicht per Inline-Style.

### 4. Anti-Patterns und Schwächen

1. **`<h1>` als Allzweck-Tag.** Die Startseite hat 13 `<h1>`-Tags, `/uber-peter-at` 14, `/erfahrungen` 11, `/pv-handbuch` 32. Jede FAQ-Frage ist ein `<h1 class="heading-h3">`, jede Sektionsheadline ein `<h1 class="heading-h2">`. Das zerstört die Dokumentstruktur und die Auszeichnung für Suchmaschinen. Richtig wäre ein `<h1>` pro Seite und `<h2>`/`<h3>` darunter.
2. **Kein einziges Schema.org.** `application/ld+json` kommt 0 mal in allen 17 geprüften Seiten vor. Kein `Organization`, kein `LocalBusiness`, kein `FAQPage`, kein `Article`, obwohl 4 FAQ-Antworten, 10 Presseartikel und 4 Kundeninterviews als Content vorliegen. Das ist verschenktes Potenzial bei einer Seite mit so viel Trust-Material.
3. **`html lang="en"` auf allen Seiten.** Eine rein deutschsprachige Österreich-Seite deklariert Englisch, 17 von 17 geprüften Seiten.
4. **Kein `<link rel="canonical">` auf keiner Seite.** Bei `/presse` und `/news`, die byteidentisch sind, ist das ein echtes Duplicate-Content-Problem.
5. **Keine `sitemap.xml`.** HTTP 404. `robots.txt` ist HTTP 200 mit 0 Bytes, also leer. Für eine Seite mit 17 plus Artikeln ist das schwache technische Hygiene.
6. **`prefers-reduced-motion` kommt 0 mal vor**, obwohl 600 Partikel auf der Karte, drei Carousels und ein 1000ms-Reveal laufen. Kein Bewegungsausschluss für empfindliche Nutzer.
7. **Kein Consent-Tool im HTML**, obwohl GTM, GA4, Facebook Pixel, Microsoft Clarity, Taboola, HubSpot und Optibase alle direkt beim Laden feuern. In der EU mit Österreich-Bezug ist das ein erhebliches Risiko.
8. **Formular-Fehlermeldung auf Englisch.** `Oops! Something went wrong while submitting the form.` mitten in einem deutschen Kontaktformular.
9. **Zwei konkurrierende Formulare auf `/kontakt`.** Ein sichtbares Webflow-Formular und ein verstecktes HubSpot-Embed mit eigener Form-ID. Doppelte Datenwege, unklar welcher greift.
10. **Heyflow-Widgets ohne Inhalt im HTML.** Der komplette Funnel, also der wichtigste Teil der Seite, ist ein leeres Custom Element `<heyflow-wrapper flow-id="peter-lp">` mit Shadow DOM. Ohne JavaScript und ohne Heyflow zeigt die Seite an dieser Stelle nichts. Auch das Bewertungs-Widget auf `/erfahrungen` ist ein leeres `div.widget-code`.
11. **Header-Farbwechsel per jQuery und Inline-Style.** Das Skript setzt `#fff`, `#e0e0e0`, `#000`, `#f4c23c` und `#ffffff26` hart als Inline-Styles, teils mit `!important` im `attr('style')`-Aufruf. Nicht wartbar, nicht überschreibbar.
12. **Anrede springt innerhalb einer Seite.** Die Startseite duzt in H1 und Subline, die Prozess-Steps siezen drei Sektionen später: `Berechnen Sie mit dem peter-Ersparnis-Rechner`, `Unsere Experten beraten Sie`. Auf `/weiterempfehlen` siezt die ganze Seite. Das ist kein durchgehaltener Tonalitätsrahmen.
13. **Schreibfehler im sichtbaren Hero.** `/erfahrungen` schreibt `echte Unabhängkeit` statt `Unabhängigkeit`. Ausserdem `peter's Erfolgsgeschichten` mit Apostroph statt `peters`.
14. **Bilder im Hero mit `loading="lazy"`.** Auch `.hero__image-horizontal` und `.hero__image-vertical` sind lazy. `fetchpriority="high"` kommt 0 mal vor. Das kostet LCP.
15. **Toter CSS-Code.** `.preloader`-Regeln und die `spin`-Animation existieren, aber kein `.preloader`-Element liegt im DOM. `stages_column is-hide` blendet auf `/anfragen` alle Bilder der Timeline aus.
16. **Zähler ohne Datenquelle.** Der `PV-Anfragen gestellt`-Zähler startet bei 26179 und addiert pro Tag seit dem 22.05.2024 eine per Sinus-Funktion erzeugte Zahl zwischen 30 und 80. Das ist eine erfundene Zahl, keine Messung.

### 5. Conversion-Mechanik in 5 Sätzen

Die Seite hat genau ein Ziel, das Formular unter `/anfragen`, und jeder der 5 CTAs der Startseite zeigt dorthin. Vor dem Formular baut die Seite in drei Schritten Vertrauen auf: zuerst Zahlen (`98%`, `1.000+`, `30 Jahre Garantie`, `0€ Anzahlung`), dann Namen (13 Kundenprojekte und 9 Testimonials), dann Institutionen (ProvenExpert, Google, Trustpilot, Top-Dienstleister 2026, Logo-Wall). Der Preis wird als Monatsrate entkoppelt (`ab 58€ im Monat`, `0€ Anzahlung`), damit die Kaufhürde nicht wie ein fünfstelliger Betrag aussieht, und eine Deadline (Countdown im Header, `Der große Saisonabschluss · 21. bis 30. September`) erzeugt Zeitdruck. Das Formular selbst ist auf `/anfragen` bewusst umgebaut: die Vertrauenssektionen stehen nach dem Widget, also nach dem Einstieg, der Rest der Startseite steht davor. Zusätzlich gibt es zwei Nebenschleifen, ein Empfehlungsprogramm mit 250 Euro Prämie und ein Empfehlungscode-System, das Leads ohne zusätzliche Medienkosten liefert.

## Abrufprotokoll

Alle Abrufe mit User-Agent `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36`, Zeitlimit 20 bis 60 Sekunden, Arbeitsverzeichnis `/tmp/site-peter-at/`.

| URL | Status | Bytes |
|---|---|---|
| https://www.peter.at/ | 200 | 99263 |
| https://www.peter.at/anfragen | 200 | 86870 |
| https://www.peter.at/erfahrungen | 200 | 144910 |
| https://www.peter.at/uber-peter-at | 200 | 77393 |
| https://www.peter.at/kontakt | 200 | 41480 |
| https://www.peter.at/weiterempfehlen | 200 | 57330 |
| https://www.peter.at/karriere | 200 | 96909 |
| https://www.peter.at/partnerbetrieb-werden | 200 | 39445 |
| https://www.peter.at/presse | 200 | 54623 |
| https://www.peter.at/news | 200 | 54623 |
| https://www.peter.at/impressum | 200 | 36175 |
| https://www.peter.at/agb | 200 | 66139 |
| https://www.peter.at/widerrufsrecht | 200 | 37925 |
| https://www.peter.at/datenschutzerklarung | 200 | 90354 |
| https://www.peter.at/client-stories/goetz | 200 | 63462 |
| https://www.peter.at/news/peter-at-grundet-eigene-energiegemeinschaft-fur-haushalte | 200 | 46599 |
| https://www.peter.at/pv-handbuch | 200 | 72537 |
| https://www.peter.at/weiterempfehlen-link | 200 | 42062 (nur Status geprüft, Inhalt nicht ausgewertet) |
| https://www.peter.at/robots.txt | 200 | 0 (leer) |
| https://www.peter.at/sitemap.xml | 404 | 906 |
| https://www.peter.at/sitemap_index.xml | 404 | 906 |
| https://peter.at/sitemap.xml | 404 | 906 |
| https://www.peter.at/sitemap | 404 | 906 |
| https://www.peter.at/client-stories | 404 | 906 |
| https://cdn.prod.website-files.com/67c1e15dd78e4c417dc5ea2d/css/peter-at-v2.webflow.shared.f162c4cdc.css | 200 | 136641 |
| https://cdn.prod.website-files.com/67c1e15dd78e4c417dc5ea2d/js/webflow.b0f4821f.a7f308134c626bed.js | 200 | 1838 |
| https://cdn.prod.website-files.com/67c1e15dd78e4c417dc5ea2d/js/webflow.schunk.36b8fb49256177c8.js | 200 | 41429 |
| https://cdn.prod.website-files.com/67c1e15dd78e4c417dc5ea2d/js/webflow.schunk.e15f4730386f54d9.js | 200 | 207854 |

Nicht abrufbar oder nicht vorhanden: `sitemap.xml` in drei Varianten (404), `robots.txt` leer, `/client-stories` als Übersicht (404), `/sitemap` (404). Der Inhalt der Heyflow-Widgets (`flow-id="peter-lp"`, `test-eca557`, `partnerbetriebe`) liegt in einem Shadow DOM und wurde nicht ausgewertet, Schritte und Fragetypen der Formulare sind daher nicht belegt. Der Zähler-Endwert auf `/anfragen` wird zur Laufzeit berechnet und ist statisch nicht auslesbar.
