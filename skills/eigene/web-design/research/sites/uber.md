# uber.com (de/de)

## Steckbrief

| Feld | Wert |
|---|---|
| Domain | www.uber.com |
| Analysierter Bereich | deutsche Marketing-Site `/de/de/` |
| Branche | Mobility-as-a-Service: Ride-Hailing, Essenslieferung, Business-Mobilität |
| Seitentyp | Multi-Produkt-Plattform mit globalem Template-System, DACH-Lokalisierung |
| Sprache | Deutsch (de-DE), mit englischsprachigen Resten im deutschen Template |
| Anrede | gemischt: Fahrt/Fahrer-Seiten "du", Business-Seiten "Sie" |
| Stack | Eigenes React-Framework (Uber Fusion), Base Web Design System, Tealium, Contentful-artiges UDM |
| Anzahl Seiten in Sitemap | 19 697 URLs unter `/de/de/`, gesamt 1 585 Sitemap-Dateien im Index |
| Fetch-Hürde | Default-curl-UA liefert HTTP 406, erst vollständige Browser-Header liefern 200 |
| Schema.org | kein einziger `application/ld+json`-Block auf allen 20 geprüften Seiten |

## Sitemap

`robots.txt` (904 Bytes) erlaubt `*.js` und `*.css`, sperrt `/app/`, `/local/search`, `*/api/`, `*/custom-api/`, `*/_uwa`. Kein `Crawl-delay`.

`sitemap.xml` ist ein Sitemap-Index mit 1 585 Kinddateien. Die deutsche Datei `www_uber_com-de_de-c-sitemap.xml` hat 19 697 URLs. Verteilung nach Pfadsegment:

| Anzahl | Pfad | Inhalt |
|---|---|---|
| 14 456 | `/de/de/r/` | Route- und Stadt-Landingpages (SEO-Masse) |
| 2 265 | `/de/de/e/` | Einstiegsseiten pro Stadt und Rolle |
| 1 746 | `/de/de/b/` | Orts-/Business-Landingpages |
| 557 | `/de/de/newsroom/` | Presse |
| 312 | `/de/de/blog/` | Ratgeber |
| 52 | `/de/de/business/` | Uber for Business |
| 43 | `/de/de/drive/` | Fahrer |
| 42 | `/de/de/ride/` | Fahrgast-Fahrt |
| 25 | `/de/de/about/` | Unternehmen |
| 25 | `/de/de/deliver/` | Kuriere |

Wichtigste Navigationsstruktur (aus dem Header der Startseite):

- Hauptnav: Fahrt, Umsatz erzielen, Business, Uber Eats, Über uns
- Über-uns-Dropdown: Über uns, Unsere Angebote, So funktioniert Uber, Nachhaltigkeit
- Entdecken-Dropdown: Städte (10 Städte), Transportmöglichkeiten (10), Taxi in meiner Nähe, Taxi (10 Städte), Newsroom, Investorenbeziehungen, Autonome Fahrtoptionen, Uber Werbung, Händler, Blog, Karriere
- Utility: DE-DE Sprachwahl, Hilfe, Anmelden, Registrieren

## Seiten

### 1. Startseite, https://www.uber.com/de/de/

- Title: `Erziele Umsätze als Fahrer*in oder bestelle jetzt eine Fahrt | Uber Deutschland`
- Meta-Description: `Bestelle eine Fahrt in wenigen Minuten. Oder registriere dich als Fahrer*in und erziele Umsätze nach deinem eigenen Zeitplan. ...` (43 Wörter)
- H1: `Go anywhere` (englisch auf deutscher Seite)
- H2: 31 (davon 19 Template-Wiederholungen), H3: 18, H4: 0
- Canonical: `https://www.uber.com/de/de/`, hreflang: 173 Alternates
- Schema.org: keins

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Nav | `Uber` + 5 Hauptpunkte | keine | Split-Header, 64px hoch | SVG-Icons 24px | `Anmelden`, `Registrieren` | keine | 2 Nav-Varianten im DOM (Desktop/Mobile) |
| 2 | Hero mit Funnel | `Go anywhere` | keine Subline | 2-Spalten, Text links, Formular rechts, Hintergrund `#000000` | Hero-Foto 3:2 (`Ride with Uber`), 552/1072/1152px Varianten | `Pickup location`, `Dropoff location`, `See prices`, `Log in to check your activity` | keine | Formular englisch, H1 englisch, Rest deutsch |
| 3 | Produkt-Tabs | `Entdecke, was du mit der Uber App tun kannst` | keine | 5er-Grid, Carousel `1/5` | Icon-Kacheln 24px | `Fahrt`, `Umsätze erzielen`, `Uber Eats`, `Business` | keine | 3-fach identisch im DOM (`CROProductSuggestions`) |
| 4 | Prozess-Steps | `So bestellst du eine Fahrt` | keine | 5er-Carousel, `1/5` | Steps ohne Bilder | keine | keine | H3-Steps: Erste Schritte, Mit einem Fahrer verbunden werden, Dein Fahrer kommt, Gute Fahrt, Fahrt bewerten |
| 5 | Reise-Teaser, dunkel | `Planst du deine nächste Reise?` | `Vom Wochenendausflug bis zum internationalen Reiseziel ...` (20 Wörter) | 2-Spalten, Bild rechts | City-Hub-Collage | `Down` (Scroll-Pfeil) | keine | Auto-Play-Video `GO-GET_2026_Event_Web_Travel-Mode_Animated_360p.mp4` |
| 6 | Feature-Carousel | `Die Vielfalt der Uber App` | keine | 3er-Carousel, `1/3` | Foto je Karte | `Jetzt reservieren`, `Preise anzeigen`, `Einen Gegenstand versenden` | keine | H3: Plane deine Fahrt im Voraus (`90 Tage`), Komfortabel unterwegs, Artikel versenden |
| 7 | Eats-Feature-Carousel | keine eigene H2 | keine | 2er-Carousel, `1/2` | Food-Fotos | `Restaurants finden`, `Jetzt Vorräte auffüllen` | keine | H3: Bei deinen Lieblingsrestaurants bestellen, Wichtige Alltagsartikel |
| 8 | Membership-Banner | `Get member savings on rides and delivery` | keine | Full-bleed, einfarbig | keine | `Sign up now` | keine | englisch, verweist auf Uber One |
| 9 | Recruiting-Carousel | `Earn with Uber` | keine | 3er-Carousel, `1/3` | Fahrer-/Kurier-Fotos | `Sign up to drive`, `Get details`, `Sign up` | keine | H3: Drive and earn on your schedule, Deliver when you want, specialized skills (AI Solutions) |
| 10 | B2B-Zigzag | `Alle Vorteile von Uber – neu gedacht für Unternehmen` | `Uber for Business bietet Ihrem Unternehmen mehr Kontrolle ...` (28 Wörter) | 2-Spalten 50/50, dunkel | Dashboard-Mockup | `Mehr erfahren` | keine | SIE-Anrede mitten in DU-Seite |
| 11 | App-Download | `In den Apps ist es einfacher` | keine | 2er-Panel | QR-Codes | `Lade die Uber App herunter`, `Fahrer-App herunterladen`, `Zum Herunterladen scannen` | keine | 2-mal identisch im DOM |
| 12 | Footer | `Unternehmen` / `Produkte` / `Globales Engagement` / `Reisen` | keine | 5-Spalten + Utility-Zeile | Social-Icons | `Datenschutz`, `Barrierefreiheit`, `Nutzungsbedingungen` | `© 2026 Uber Technologies Inc.` | 4 Gruppen, 25 Links, Städte- und Taxi-Listen |

**Hero-Formel:** H1-Nutzenversprechen `Go anywhere` (2 Wörter, englisch), keine Subline, 2 CTAs im Formular (`See prices` primär, `Log in to check your activity` Textlink), dazu Zwei-Feld-Routen-Formular. Trust-Signal im Hero: keins (keine Sterne, keine Zahl, kein Siegel). Medientyp: Foto (`tb-static.uber.com/prod/udam-assets/a3cf8564-...jpg`, 3500x2333) plus zuschaltbares Video. Hero-Höhe: kein `min-h-screen`, Höhe folgt dem 3:2-Bild (`aspectRatio: aspect_3_2` auf Desktop, `aspect_1_1` mobil).

**CTA-Strategie:** Hauptlabels `Fahrt` (5x, -> `m.uber.com/looking` und `m.uber.com/login-redirect`), `Uber Eats` (5x, -> `ubereats.com/login-redirect`), `Business` (3x), `Preise anzeigen` (3x, -> `m.uber.com/looking`), `Als Fahrgast registrieren` (3x, -> `m.uber.com/looking`), `Anmelden` (2x, -> `auth.uber.com/login-redirect`), `Umsätze erzielen` (2x, -> `drivers.uber.com`). Alle primären CTAs landen in einem von 3 Zielen: Ride-App, Driver-Portal, Eats-Login. Sticky-Header-CTA: nein. Telefonnummer im Header: nein.

**Trust-Staffelung:** Auf der Startseite kein einziges Trust-Element. Keine Kundenstimmen, keine Presse, keine Zähler, keine Auszeichnungen. Nur die Copyright-Zeile im Footer.

**Funnel/Formular:** Startseite, Hero. Zwei Schritte sichtbar: Abholort, Ankunftsort (beide `role="combobox"` mit `aria-autocomplete="list"`), dann Button `See prices`. Kein Fortschrittsbalken, keine Microcopy wie "kostenlos", keine persönlichen Daten vor dem Klick. Zusätzlich `Now`/`Schedule later`-Pill (`pickupTimePlaceholder: "Now"`, `pickupDatePlaceholder: "Today"`). Beide Felder tragen die Fehlermeldung als `aria-label`: `Pickup location needs to be filled in`, `Dropoff location needs to be filled in`.

**Footer:** 4 Link-Gruppen und eine Utility-Zeile. Gruppen: `Unternehmen` (7 Links), `Produkte` (10), `Globales Engagement` (2), `Reisen` (4). Dazu Social: linkedin, youtube, instagram, twitter. Sprache: `Globe Deutsch` mit Sprachwahl-Modal `Wähle deine bevorzugte Sprache` (Englisch/Deutsch). Rechtliches: Datenschutz, Barrierefreiheit, Nutzungsbedingungen. Ortslisten: 10x `Transportmöglichkeiten <Stadt>`, 10x `Taxi <Stadt>`. Keine Siegel, keine Zertifikate.

### 2. Fahrt bestellen, https://www.uber.com/de/de/ride/

- Title: `Bestelle Fahrten mit der Uber App | Rund um die Uhr | Offizielle Uber Website`
- Meta-Description: `Du kennst dein Ziel, weißt aber noch nicht so recht, wie du dort hinkommen sollst? ... Nutze unseren Fahrpreiskalkulator.` (42 Wörter)
- H1: `Fahrt bestellen`
- H2: 31 (davon ~20 Template), H3: 12, H4: 0
- Canonical: `https://www.uber.com/de/de/ride/`, hreflang: 175

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Nav (global) | siehe Startseite | | | | `Anmelden`, `Registrieren` | | |
| 2 | Sub-Nav | `Fahrt` | keine | horizontale Leiste mit Dropdown | keine | `Fahrt bestellen`, `Fahrt reservieren`, `Preise anzeigen`, `Entdecke deine Fahrtoptionen`, `Flughafenfahrten` | keine | eigene Produkt-Navigation |
| 3 | Hero mit Funnel | `Fahrt bestellen` | keine Subline | 2-Spalten, Text + Formular, weiss | keine | `Preise anzeigen`, `Als Fahrgast registrieren` | keine | Pill `Jetzt abholen` mit Clock-Icon, `Clock`-Dropdown |
| 4 | App-Promo | `Mehr Funktionen in der App` | keine | 2-Spalten mit QR-Panel | QR-Codes | `Lade die Uber App herunter`, `Zum Herunterladen scannen` | keine | 2-mal im DOM |
| 5 | Produkt-Tabs | `Entdecke, was du mit der Uber App tun kannst` | keine | 5er-Carousel `1/5` | Icons | wie Startseite | keine | identischer Block |
| 6 | Membership | `Uber One` | `Eine Mitgliedschaft für exklusive Preise und besondere Erlebnisse ...` (16 Wörter) | Full-bleed dunkel | keine | `Jetzt ausprobieren` | keine | |
| 7 | Vorteils-Carousel | `Nutze die Uber App und komme nach deinen Wünschen ans Ziel` | keine | 3er-Carousel `1/3` | Fotos | `Fahrtoptionen durchsuchen`, `Flughäfen suchen`, `Städte suchen` | Zahlen im Text: `Über 700 Flughäfen`, `Über 15 000 Städte` | H3 tragen die Zahlen |
| 8 | B2B-Cross-Sell | `Auf der Suche nach Geschäftslösungen?` | `Hier gibt es Informationen dazu, wie Unternehmen Uber for Business nutzen:` (11 Wörter) | 2-Spalten | keine | `Erste Schritte`, `Lösungen ansehen` | keine | Links: Geschäftsreisen, Gesponserte Fahrten, Verpflegungsprogramme, Artikellieferung |
| 9 | FAQ-Akkordeon | `Häufig gestellte Fragen` | keine | Akkordeon, 5 `<details>` | Chevron-Icon | `Mehr erfahren`, `Mehr über Taxibestellungen erfahren` | keine | native `<details>/<summary>` |
| 10 | App-Download schmal | `Mehr Funktionen in der App` | keine | 2er-Panel `#F6F6F6` | QR | `Lade die Uber App herunter`, `Als Fahrgast registrieren` | keine | |
| 11 | Footer | siehe Startseite | | | | | | |

**Hero-Formel:** H1 `Fahrt bestellen` (2 Wörter), keine Subline, 2 CTAs (`Preise anzeigen` primär, `Als Fahrgast registrieren` sekundär). Kein Trust-Signal. Medien: keine Bilder im Hero, nur Formular. Hero-Höhe: `padding-bottom:40px` mobil, `56px` ab 1136px, kein `vh`.

**CTA-Strategie:** `Fahrt` (3x), `Uber Eats` (3x), `Uber for Business` (3x), `Preise anzeigen` (3x, -> `m.uber.com/looking`), `Als Fahrgast registrieren` (3x, -> `m.uber.com/looking`), `Lade die Uber App herunter` (2x, -> `rides.sng.link/Aw5zn/o42y` mit `_dl=uber://`-Deeplink). Sticky-Header-CTA: nein. Telefon: nein.

**Funnel:** 3 Schritte im sichtbaren Formular: Zeitwahl-Pill `Jetzt abholen` (Dropdown mit `Pickup now`/`Schedule later` -> `m.uber.com/reserve`), `Abholort`, `Ankunftsort`, dann `Preise anzeigen`. Alle Felder `role="combobox"`. Daten werden erst nach Klick auf `m.uber.com` erhoben. Microcopy: keine. Zusätzlich ein `MERCHANDISING_AD`-Seitenelement mit `bodyText: "Ready to travel?"` und CTA `Schedule ahead` (englisch).

**Trust:** nur die Zahlen `Über 700 Flughäfen` und `Über 15 000 Städte` als H3, sonst nichts.

### 3. Fahrtoptionen, https://www.uber.com/de/de/ride/ride-options/

- Title fehlt im Kopf der Prüfung, H1: `Nutze die Uber App`
- H2: 20, H3: mehrere
- hreflang: 169

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente |
|---|---|---|---|---|---|---|---|
| 1 | Sub-Nav | `Fahrt` | | Leiste | | `Fahrt bestellen`, `Fahrt reservieren`, `Preise anzeigen`, `Entdecke deine Fahrtoptionen`, `Flughafenfahrten` | |
| 2 | Hero schmal | `Nutze die Uber App` | `Finde eine Fahrt für jede Straße – in über 15.000 Städten weltweit. Weil die besten Abenteuer zu dir kommen.` (18 Wörter) | zentriert, Formular darunter | keine | `Preise anzeigen`, `Lade die Uber App herunter` | Zahl `15.000 Städte` |
| 3 | Options-Grid | `Fahrten auf der ganzen Welt` | `Die Uber App bietet flexible Fahrtoptionen ...` (20 Wörter) | Karten-Grid, mehrere Carousels `1/10` bis `1/5` | Fahrzeugfotos | je Karte `Mehr zu UberX`, `Mehr über Uber Electric erfahren` usw. | keine |
| 4 | Welt-Zahlen | `Entdecke die Welt mit Uber` | keine | 2-Spalten | Karte | `Alle Städte anzeigen`, `Alle Flughäfen anzeigen` | `über 15 000 Städten`, `an über 700 Flughäfen` |
| 5 | Vorteils-Carousel | `Umweltbewusst unterwegs` | keine | 3er-Carousel | Fotos | `Mehr erfahren` (3x) | keine |

Fahrtoptionen: Uber Reserve, Uber Taxi, UberX, Uber Electric, Uber Hourly, UberX Share, Uber Transit, Uber Intercity, Uber Pet, Uber Moto, E-Bikes, Scooter, Uber Auto, Uber Comfort, Uber Black, Uber Black SUV, UberXL, Uber WAV. 18 Optionen, jede mit eigenem Deep-Link.

### 4. Fahren (Fahrer), https://www.uber.com/de/de/drive/

- Title: `Tritt einer Flotte in Deutschland bei | Werde jetzt Uber Fahrer`
- Meta-Description: `Wenn du Fahrer werden möchtest und andere Fahrer-Jobs in Betracht ziehst, kannst du bei einem der Uber Partner-Unternehmen als angestellter Fahrer Umsätze erzielen.` (24 Wörter)
- H1: `Schließe dich einer Flotte in Deutschland an und fahre mit Uber`
- H2: 30, H3: 13
- Canonical: `https://www.uber.com/de/de/drive/`, hreflang: 178
- Anrede: konsequent "du" (49 du/dein-Treffer)

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente |
|---|---|---|---|---|---|---|---|
| 1 | Sub-Nav | `Fahrten anbieten` | | Leiste | | `Registrieren`, `Voraussetzungen`, `Fahrzeuglösungen`, `Deine erste Fahrt`, `Nutzung der App`, `Uber Pro`, `Sicherheit`, `Kontakt` | |
| 2 | Hero dunkel | `Schließe dich einer Flotte in Deutschland an und fahre mit Uber` | `Auf der Suche nach Fahrer-Jobs in Deutschland? Werde angestellter Fahrer bei einem Flottenunternehmen, das mit Uber kooperiert.` (20 Wörter) | 2-Spalten, dunkel `#000000` | Foto | `Als Fahrer registrieren`, `Anmelden` | keine |
| 3 | Benefits-Zigzag | `Sei dein eigener Boss` | 3 H3-Blöcke: `Fahre wann du möchtest`, `Sei dein eigener Chef`, `Uber vermittelt dir Fahrgäste` | Zigzag 2-Spalten | Fotos | keine | keine |
| 4 | Prozess-Steps | `Einfach starten` | 3 Schritte | 3er-Grid | Icons | `Jetzt registrieren`, `Voraussetzungen`, `Fahrzeuganforderungen` | keine |
| 5 | B2B-Teaser | `Werde Flottenpartner` | `Wenn du erwägst, dein eigenes PHV-Unternehmen (Private-Hire Vehicle) zu gründen ...` (21 Wörter) | 2-Spalten | | `Mietwagenunternehmer werden` | |
| 6 | Support-Dreier | `Wir sind da für dich` | `Starte mit Uber in Deutschland` | 3er-Grid | Icons | `Hilfe anfordern`, `Kontaktiere uns`, `Erfahre mehr` | keine |
| 7 | FAQ-Akkordeon | `Häufig gestellte Fragen` | 4 Fragen | `<details>` | Chevron | `Alle Städte anzeigen`, `Anforderungen für Fahrer ansehen` | keine |
| 8 | App-Teaser | `Die Fahrer-App` | `Die benutzerfreundliche, zuverlässige App wurde mit Fahrer*innen für Fahrer*innen entwickelt.` (13 Wörter) | 2-Spalten | App-Screens | `So funktioniert's` | keine |
| 9 | App-Download | `Biete Fahrten nach deinem Zeitplan an` | | 2er-Panel | QR | `Fahrer-App herunterladen`, `Zum Herunterladen scannen` | keine |
| 10 | Zwei-Wege-CTA | keine Headline | | 2er-Grid mit Pfeil-Icons | | `Als Fahrer registrieren` und `Als Kurier registrieren`, je 6x `Arrow right` | keine |
| 11 | Rechtstext | keine Headline | Garantie-Kleingedrucktes (116 Wörter) | schmale Spalte | | | |
| 12 | Footer | | | | | | |

**Hero-Formel:** H1 12 Wörter, Subline 20 Wörter, 2 CTAs (`Als Fahrer registrieren` primär, `Anmelden` sekundär). Kein Trust-Signal. Medien: Foto. Hintergrund `#000000`.

**Funnel:** Zweistufig. Erst `drivers.uber.com` (3x `Anmelden`, 3x `Registrieren`), Deeplink mit `marketing_vistor_id`-Parameter. Kein Formular auf der Seite selbst. Der Recruiting-Funnel läuft vollständig extern.

### 5. Lieferungen anbieten, https://www.uber.com/de/de/deliver/

- Title: `Mit Uber Eats liefern | Uber`, H1: `Mit Uber Eats liefern`, H2: 22, hreflang: 80
- Deutlich dünner als die Fahrer-Seite

| Nr | Sektionstyp | Headline wörtlich | Layout-Familie | CTA-Labels wörtlich |
|---|---|---|---|---|
| 1 | Hero | `Mit Uber Eats liefern` | 2-Spalten, dunkel | `Als Kurier registrieren`, `Anmelden` |
| 2 | Zwei-Zielgruppen | `Für Flottenpartner` / `Für Kuriere` | 2-Spalten | keine |
| 3 | Support-Suche | `Du hast noch Fragen?` | Zentriert, Suchfeld | `Search` |
| 4 | App-Download | `Biete Lieferungen nach deinem Zeitplan an` | 2er-Panel | `Fahrer-App herunterladen` |

Anrede: du (15 du/dein-Treffer gegen 2 Sie).

### 6. Uber for Business, https://www.uber.com/de/de/business/

- Title: `Unternehmensdienstleistungen für Mobilität, Verpflegung und Lieferungen | Uber for Business`
- H1: `Uber – neu erfunden für Unternehmen`, H2: 11, H3: 19
- Canonical: `https://www.uber.com/de/de/business/`, hreflang: 137
- Anrede: konsequent "Sie" (117 Sie/Ihr-Treffer gegen 5 du)

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente |
|---|---|---|---|---|---|---|---|
| 1 | Mega-Menü | `Übersicht` / `Lösungen` / `Kunden-Support` / `Ressourcen` | je Eintrag 1 Satz Beschreibung | 4-spaltiges Mega-Menü | keine | `Anmelden`, `Jetzt starten` | keine |
| 2 | Hero dunkel | `Uber – neu erfunden für Unternehmen` | `Uber for Business bietet Ihrem Unternehmen mehr Kontrolle. Verwalten und verfolgen Sie Geschäftsreisen ...` (19 Wörter) | 2-Spalten, dunkel | Dashboard-Bild | `Erste Schritte`, `Unsere Lösungen entdecken` | keine |
| 3 | Benefits-Grid | `Eine globale App, die auf dem weltweit größten Mobilitätsnetzwerk aufgebaut ist` | 2 H3-Blöcke | 2-Spalten | keine | keine | Zahlen: `bis zu 10 %`, `99,9 %` |
| 4 | Benefits-Grid 2 | `Bieten Sie auch Ihren Mitarbeitenden Vorteile` | 2 H3-Blöcke | 2-Spalten | keine | keine | `99,9 % aller über die Uber App gebuchten Fahrten ohne gemeldete Sicherheitsvorfälle` |
| 5 | Lösungs-Übersicht | `So nutzen Unternehmen Uber for Business` | `Geschäftsreisen`, `Gesponserte Fahrten`, `Verpflegungsprogramme` | 3er-Grid | Icons | keine | keine |
| 6 | Feature-Zigzag | `Starten Sie ohne Vorabkosten` | 3 H3-Blöcke | Zigzag | Screenshots | keine | `ohne Servicegebühren` |
| 7 | Kunden-Zähler | `Schließen Sie sich über 200 000 Unternehmen an, darunter die Hälfte aller Fortune 500 Unternehmen` | keine | Zentriert, Logo-Wall | Logos | keine | `200 000 Unternehmen`, `Hälfte der Fortune 500` |
| 8 | Testimonial | `„Gehalt und grundlegende Zusatzleistungen sind nicht genug. ...“` | Ryan Carter, Gründer und CEO, Parachute Media | Zitat-Block | Youtube-Einbettung | keine | Personenzitat mit Foto |
| 9 | Empfehlungs-Stat | `9 von 10 Kund*innen würden Uber for Business empfehlen³` | keine | Zentriert | keine | `Erste Schritte` | `9 von 10` mit Fußnote 3 |
| 10 | Ratgeber-Teaser | `Möchten Sie mehr erfahren?` | 3 Artikel | 3er-Grid | Fotos | `So funktioniert's`, `Mehr erfahren`, `Weiterlesen` | keine |
| 11 | Fußnoten-Block | `Die Verfügbarkeit von Produkten und Funktionen kann je nach Markt und Standort variieren.` | 3 nummerierte Fußnoten, 96 Wörter | schmale Spalte | keine | `starten Sie hier` | Quellenangaben zu Umfragen (275 bzw. 323 Kund*innen) |
| 12 | Footer | eigenes Business-Footer | | | | `Mehr entdecken` | |

**Hero-Formel:** H1 5 Wörter, Subline 19 Wörter, 2 CTAs. Trust im Hero: keins. Medien: Dashboard-Screenshot. Höhe: 2-Spalten dark, kein `vh`. Kein Formular, kein Preis, kein Telefon.

**Trust-Staffelung (einzige Seite mit echter Staffelung):** Sektion 3 `99,9 %` und `10 %` -> Sektion 4 `99,9 %` -> Sektion 7 `200 000 Unternehmen` + Fortune 500 -> Sektion 8 CEO-Zitat mit Namen und Firma -> Sektion 9 `9 von 10` -> Sektion 11 belegende Fußnoten mit Stichprobengröße. Das ist die stärkste Trust-Kette der ganzen Site. Telefonnummer: nirgends.

### 7. Uber for Business Preise, https://www.uber.com/de/de/business/platform/pricing/

- Title: `Preise von Uber for Business | Uber for Business`
- H1: `Uber for Business ist kostenlos in der Registrierung`, H2: 8, H3: 12
- Canonical: korrekt gesetzt

| Nr | Sektionstyp | Headline wörtlich | Layout-Familie | CTA-Labels |
|---|---|---|---|---|
| 1 | Hero | `Uber for Business ist kostenlos in der Registrierung` | 2-Spalten dunkel | keine im Hero sichtbar |
| 2 | Feature-Liste | `Nutze leistungsstarke Funktionen ohne Registrierungsgebühren` | 6er-Kartenliste | |
| 3 | Preis-Aussage | `Sie zahlen nur die Kosten für die Fahrten und Mahlzeiten Ihrer Teams.¹` | Zentriert | `Erste Schritte` |
| 4 | FAQ-Akkordeon | `Häufig gestellte Fragen` | Akkordeon | |
| 5 | Final-CTA | `Ihr Unternehmen entwickelt sich stets weiter. Wir sind da, um zu helfen.` | Zentriert | |

H3-Features: Anpassbare Programme, Automatischer Kostenabgleich, Flexible Abrechnungsoptionen, Benutzerdefinierte Ausgabencodes, Zentral gesteuerte Bezahlung, Berichte und Erkenntnisse.

### 8. Erste Schritte, https://www.uber.com/de/de/business/getting-started/

- Title: `Erste Schritte mit Uber for Business`
- H1: `Zwei Optionen für Ihre ersten Schritte mit Uber for Business`, H2: 8, H3: 8
- Besonderheit: Canonical ist relativ und falsch: `uber.com/business/getting-started/` (ohne Protokoll, ohne `/de/de/`)

| Nr | Sektionstyp | Headline wörtlich | Layout-Familie | CTA-Labels |
|---|---|---|---|---|
| 1 | Hero | `Zwei Optionen für Ihre ersten Schritte mit Uber for Business` | Zentriert | |
| 2 | Zwei-Wege-Vergleich | `Ein Selbstbedienungsansatz, um sofort loszulegen` / `Ein individuell abgestimmtes Erlebnis für die Bedürfnisse Ihres Unternehmens` | 2-Spalten 50/50 | `Jetzt anmelden`, `Vertrieb kontaktieren` |
| 3 | Ressourcen-Grid | `Sie sind noch nicht startklar?` | 3er-Grid | `Anleitung herunterladen`, `Artikel lesen`, `Mehr erfahren` |

Die Segmentierung läuft über die Mitarbeiterzahl: Selbstbedienung für kleine Unternehmen, Vertriebskontakt ab 100 Mitarbeitenden. Kein Formular, kein Preisvergleich, keine Kostenrechner.

### 9. Über uns, https://www.uber.com/de/de/about/

- Title und Meta-Description vorhanden, H1: `Über uns`, H2: 20, H3: mehrere
- Canonical: `https://www.uber.com/de/de/about/`, hreflang: 172

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels |
|---|---|---|---|---|---|---|
| 1 | Hero-Titel | `Über uns` | keine | Zentriert, nur H1 | keine | keine |
| 2 | Mission-Statement | `Wir sind bestrebt, die Art und Weise zu verbessern, wie wir uns auf der Welt fortbewegen` | 84 Wörter Manifest, sehr kurze Sätze | Zentriert schmal | keine | keine |
| 3 | CEO-Brief | `Ein Brief von unserem CEO` | `Lies mehr darüber, wie wir uns dafür einsetzen, dass jeder über unsere App Zugang zu der Technologie erhält ...` | 2-Spalten | Porträt | `Daras Brief lesen` |
| 4 | Nachhaltigkeit | `Nachhaltigkeit` | `Uber will sich bis 2040 zu einer vollelektrischen und emissionsfreien App entwickeln ...` (66 Wörter) | 2-Spalten | Foto | `Mehr erfahren` |
| 5 | Produkt-Übersicht | `Fahrten und mehr` | `Wir helfen den Fahrgästen nicht nur, vom Abhol- zum Zielort zu gelangen ...` (52 Wörter) | 2-Spalten | Foto | `So nutzt du die Uber App`, `Unsere Angebote` |
| 6 | Sicherheit | `Deine Sicherheit ist unser Antrieb` | `Deine Sicherheit ist wichtig – egal, ob du auf der Rückbank oder hinter dem Steuer sitzt.` (43 Wörter) | 2-Spalten | Foto | `Mehr erfahren` |
| 7 | Unternehmen | `Informationen zum Unternehmen` | 2 H3-Blöcke: `Wer Uber antreibt`, `Handeln auf Basis von Integrität` | 2-Spalten | Team-Fotos | `Unsere Unternehmensführung ansehen`, `Mehr erfahren` |
| 8 | Presse-Trio | `Bleibe auf dem Laufenden` | `Newsroom`, `Blog`, `Investorenbeziehungen` | 3er-Grid | Icons | `Zum Newsroom`, `Unsere Beiträge lesen`, `Mehr erfahren` |
| 9 | Karriere-CTA | `Gestalte mit uns die Welt neu` | keine | Full-bleed dunkel | Foto | `Stellenangebote durchsuchen` |

Trust-Elemente: Team-Fotos und Namen der Führung, CEO-Brief, Nachhaltigkeitsziel mit Jahreszahl 2040. Keine Auszeichnungen, keine Preise.

### 10. So funktioniert Uber, https://www.uber.com/de/de/about/how-does-uber-work/

- 647 KB, H2/H3-Struktur, hreflang vorhanden. Gleiche Template-Familie wie die About-Seite.

### 11. Blog-Übersicht, https://www.uber.com/de/de/blog/

- Title: `Neueste Nachrichten & Storys von Uber | Uber Blog`
- H1: **fehlt** (kein `<h1>` im Dokument), H2: 16 (davon 14 Template), H3: 3
- Canonical: `https://www.uber.com/de/de/blog/`, hreflang: 181

| Nr | Sektionstyp | Headline wörtlich | Layout-Familie | CTA-Labels |
|---|---|---|---|---|
| 1 | Blog-Nav | `Uber-Blog` | eigenes Mega-Menü mit 11 Kategorien | `Entdecken`, `Produkte` |
| 2 | Titel-Band | `Blog` / `Unternehmungen und wie man hinkommt` | Zentriert, dunkel | keine |
| 3 | Artikel-Liste | `Verwandte Artikel` | Filterzeile `Filtern nach: Alle Kategorien open` + Liste | keine |
| 4 | Footer | siehe Startseite | | |

Der Titel der Artikelliste ist wörtlich `Verwandte Artikel` ("Related Articles"), auch auf der Index-Seite. Kategorien aus dem Menu: Werbung, Umsatz erzielen, Fahrt, Uber Eats, Händler*innen, Geschäftlich, Gesundheit, Hochschulbildung, ÖPNV, Ingenieurwesen, Community-Support.

### 12. Blog-Artikel, https://www.uber.com/de/de/blog/was-ist-uber-for-business/

- Title: `Was ist Uber for Business?`, Meta-Description 42 Wörter
- H1: `Was ist Uber for Business?`, H2: 16 (alle Template, **keine inhaltlichen H2**), H3: 3
- Canonical korrekt, hreflang: **0**. Der zweite geprüfte Artikel hat dagegen 3 hreflang-Links (de-de, de-ch, de-at), der dritte 0. Das ist uneinheitlich.
- Schema.org: keins (kein `Article`, kein `FAQPage`)

Aufbau in DOM-Reihenfolge: Blog-Nav -> Titel-Band mit Datum `5. April 2023` und H1 -> Avatar mit Initialen `RL` + Name `Raquel Lanca` -> Hero-Bild mit `fetchpriority="high" loading="eager"` -> Teilen-Zeile `Diesen Artikel teilen` mit 4 Buttons (`Facebook`, `Linkedin`, `X social`, `Link`) -> Fließtext -> `Kategorie Geschäftlich` -> Autor-Box `Verfasst von RL Raquel Lanca` -> `Verwandte Artikel 6 Artikel` -> Footer.

- Textlänge: 749 Wörter nach der Teilen-Zeile, plus 166 Wörter Einstieg
- Bilder: 19 `<img>` (davon 8 generische Teaser-Icons, 6 Inhaltsbilder)
- Struktur-Elemente: 13 `<ul>`, **0 `<ol>`**, **0 `<table>`**, **0 `<blockquote>`**, **0 `<h2>`/`<h3>` im Inhalt**
- Interne Links im Artikeltext: **0** (`<a href` im `<main>`: 0 Treffer, alle Links sind Navigation/Footer)
- Kein Inhaltsverzeichnis, keine Lesezeit, keine Key-Takeaways-Box, keine Zwischen-CTAs, kein FAQ
- Inhaltsbilder laufen über `cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=407/height=0/srcb64=<base64>`

Zweiter Artikel `fahrten-im-voraus-planen-mit-uber-reserve` (524 Wörter, 3 `<h3>`, 3 `<ol>`), dritter `newsroom/uber-eats-awards-2026-halbfinalisten` (462 Wörter, 8 `<a href>`, 0 H3). Damit schwankt die Artikellänge zwischen 460 und 750 Wörtern, die Struktur ist nicht standardisiert.

### 13. Newsroom, https://www.uber.com/de/de/newsroom/

- Title: `Deutschland Neueste Nachrichten | Uber Newsroom`
- H1: **fehlt**, H2: 16, H3: 4
- Canonical: `https://www.uber.com/de/de/newsroom/`, hreflang: 176

| Nr | Sektionstyp | Headline wörtlich | Layout-Familie | CTA-Labels |
|---|---|---|---|---|
| 1 | Newsroom-Nav | `Uber Newsroom` | 4 Punkte: Neuigkeiten, Über uns, Unternehmensführung, Medieninhalte | keine |
| 2 | Titel-Band | `Neuigkeiten` / `Neuigkeiten von Uber in Deutschland` | dunkel, zentriert | keine |
| 3 | Presse-Liste | `Verwandte Artikel` mit Zähler `549 Artikel` | Filterzeile + Liste mit Kategorien und Datum | keine |
| 4 | Drei Presse-Boxen | `Unternehmensinformationen` / `Unternehmensführung` / `Medieninhalte` | 3er-Grid, jede Box hat den Beschreibungstext doppelt | `Erfahre mehr` (doppelt) |

Top-Meldungen (Datum aus dem HTML): `Uber Eats baut mit REWE sein Lebensmittelangebot in ganz Deutschland aus` (15. September 2026), `Building a simpler, faster Uber` (2. September 2026, englischer Titel), `Uber wird Geißbockpartner des 1. FC Köln` (26. August 2026), `Uber Weintaxi: Von Frankfurt direkt in die Weinberge` (24. August 2026).

### 14. Uber One, https://www.uber.com/de/de/uber-one/

- H1 fehlt im Kopf, inhaltlich beginnt die Seite mit `Spare mehr bei deinen Bestellungen mit Uber One`
- hreflang: 97

| Nr | Sektionstyp | Headline wörtlich | Layout-Familie | CTA-Labels | Trust-Elemente |
|---|---|---|---|---|---|
| 1 | Angebots-Hero | `Spare mehr bei deinen Bestellungen mit Uber One` | 2-Spalten, weiss | `Jetzt anmelden` | Preis im Hero: `€4.99/Monat oder €49.99/Jahr`, `Teste es einen Monat kostenlos` |
| 2 | Vorteils-Grid | `Profitiere von 0€ Liefergebühr` | Mehrspaltig | keine | `0€ Liefergebühr`, `bis zu 10 % Guthaben` |
| 3 | Preis-Wiederholung | `Sichere dir jetzt mit einer Uber One Mitgliedschaft in der Uber und Uber Eats App` | Zentriert | `Jetzt anmelden` | `erste Monat für neue Mitglieder ist gratis`, `4,99 €/Monat`, `Gültig nur in Deutschland` |
| 4 | Rechtstext | `*Vorteile nur in teilnehmenden Händlern verfügbar...` | Kleingedrucktes, 108 Wörter | `Siehe Zusatzbedingungen` | Verfallsangabe `Uber One-Guthaben verfällt nach 36 Monaten` |

### 15. Sicherheit, https://www.uber.com/de/de/safety/

- H1: `Unser Engagement für deine Sicherheit`, H2: 6+, hreflang: 173
- Einzige Seite mit Marken-Akzentfarbe als Sektionshintergrund: `#276EF1`

| Nr | Sektionstyp | Headline wörtlich | Layout-Familie | Medien | CTA-Labels |
|---|---|---|---|---|---|
| 1 | Video-Hero | `Unser Engagement für deine Sicherheit` | Full-bleed, dunkel | eingebettetes Video | `Play Video`, `Youtube` |
| 2 | Community-Programm | `Gemeinsam für die Sicherheit der Communitys` | 2-Spalten, weiss | Foto | `Zum Portal für öffentliche Sicherheit` |
| 3 | Feature-Dreier | `So sorgen wir für deine Sicherheit` | 3er-Grid | Icons | keine |
| 4 | Zielgruppen-Zweier | `Mehr Sicherheit für alle Beteiligten` | 2-Spalten | Fotos | `Mehr erfahren` (2x) |
| 5 | Zitat-Block | `„Unsere Technologie führt jeden Tag Millionen von Menschen in Städten auf der ganzen Welt zusammen. ...“` | Full-bleed blau `#276EF1` | keine | `Dara Khosrowshahi, Uber CEO` |
| 6 | Zielgruppen-Wiederholung | `Fahrersicherheit` / `Fahrgastsicherheit` | 2er-Grid | Fotos | `Mehr erfahren`, `Learn more` (englisch) |
| 7 | Fußnote | `*Bestimmte Anforderungen und Funktionen variieren je nach Region ...` | schmal | | |

### 16. Autonome Fahrtoptionen, https://www.uber.com/de/de/autonomous/

- H1: `Wir bringen Autonomität voran`, hreflang: 165
- Auffällig: Der erste Absatz ist **komplett englisch** auf der deutschen Seite: `At Uber, it's our mission to reimagine the way the world moves for the better—and it's clear that autonomous vehicles (AVs) will play a part in our future.`
- 4 `<video>`-Elemente mit `autoplay loop muted playsinline`, plus ein YouTube-Iframe `youtube.com/embed/uVDxmbNS2h4`
- Vollbild-Videoquelle: `tb-static.uber.com/prod/crm/global_brand_experience/AV Lander/Uber_Autonomous_Website_Hero_360p.mp4`

| Nr | Sektionstyp | Headline wörtlich | Layout-Familie | Medien |
|---|---|---|---|---|
| 1 | Video-Hero | `Wir bringen Autonomität voran` | Full-bleed Video | MP4 360p, Autoplay |
| 2 | Positions-Statement | keine eigene H2 | 2-Spalten, dunkel | keine |
| 3 | Drei-Säulen | `Mobilität` / `Lieferung` / `Uber Freight` | 3er-Carousel `1/3` | Videos/Avatare |

### 17. 404-Seite, https://www.uber.com/de/de/earn/

- Title: `Seite nicht gefunden | Uber`, H1: `Leider können wir die von dir gesuchte Seite nicht finden`
- hreflang: 0, Canonical: keiner
- 3 Hilfs-Grids: `Beliebte Seiten für Fahrgäste`, `Beliebte Seiten für Fahrer*innen`, `Beliebte Seiten rund um Lieferungen`, dazu `Weitere hilfreiche Links`

### 18. Uber Eats, https://www.ubereats.com/de

HTTP 403, 7 883 Bytes. **Nicht abrufbar.** Die Uber-Eats-Domain liefert auch mit vollständigen Browser-Headern und `Accept-Language: de-DE` nur eine Blockade-Seite. Der Eats-Bereich ist damit nicht analysierbar. Aus der Uber-Site ist nur belegbar, dass `www.ubereats.com` als externes Ziel verlinkt wird (`Uber Eats` 5x auf der Startseite) und `merchants.ubereats.com/de/de/` als Händler-Portal.

## Design-System

Alle Werte aus `/tmp/site-uber/main.css` (78 741 Bytes, `/_static/client-main-styles-d9d73c42bd734fa7.css`) und aus dem Seiten-`<style>`-Block (123 087 Bytes).

### Fonts

Zwei eigene Schriften, beide selbst gehostet über `tb-static.uber.com`, `font-display: swap`, vier Gewichte je Familie:

| Familie | Gewicht | Datei |
|---|---|---|
| `UberMove` (Display) | 200, 400, 500, 600 | `UberMove-{Light,Regular,Medium,Bold}.woff2/.woff` |
| `UberMoveText` (Body) | 200, 400, 500, 600 | `UberMoveText-{Light,Regular,Medium,Bold}.woff2/.woff` |

Zusätzlich `UberMoveMono` als `--base-font-family-mono` deklariert, aber keine `@font-face`-Quelle gefunden. Ein dritter `@font-face` namens `"Book"` lädt `/_static/d9fefb2e7848440e.woff` mit `font-display: fallback`.

Stacks wörtlich:
- Display, 44 Verwendungen: `UberMove, UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif`
- Body, 54 Verwendungen: `UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif`
- Sonderfall, 6 Verwendungen: `'UberMoveText', 'Open Sans', 'Helvetica Neue', Helvetica, sans-serif`

`fonts.googleapis.com` steht in der CSP, wird aber auf keiner geprüften Seite tatsächlich geladen.

### Farben

Die CSS-Variablen definieren 12 vollständige Paletten mit je 24 Stufen (0 bis 100) plus 9 Gradient-Paletten. Die 10 häufigsten konkreten Farbwerte in beiden Stylesheets:

| Anzahl gesamt | Wert | Rolle |
|---|---|---|
| 162 | `#FFFFFF` / `#ffffff` | Hintergrund hell, Text auf dunkel |
| 66 | `#000000` | Primärbutton, Hero-Hintergrund dunkel |
| 40 | `#F3F3F3` | deaktiviert, Hover auf hellem Button, Trennlinien |
| 21 | `#276EF1` | **Fokusring** (`box-shadow: inset 0 0 0 2px #FFFFFF, 0 0 0 2px #276EF1`) und Akzentfläche auf der Sicherheitsseite |
| 16 | `#A6A6A6` | Textfarbe deaktiviert |
| 12 | `#5E5E5E` | Text sekundär |
| 5 | `#E2E2E2` | Hover-Variante |
| 5 | `#4B4B4B` | Textlink-Hover |
| 4 | `#AFAFAF` | Text stumm |
| 2 | `#F6F6F6` | Sektion `css-jBUnZd` |
| 1 | `#EEEEEE` | Rahmen |

Skalenwerte Stufe 57 (die Akzentstufe):
- `--base-blue-57: #1175dd`
- `--base-green-57: #17904e`
- `--base-red-57: #e42500`
- `--base-membership-57: #9f6402`
- `--base-indigo-57: #745fda`
- `--base-purple-57: #9b3ae3`
- `--base-neutral-57: #777777`

Produkt-Themes schalten `--base-accent-*` um:
- `[data-product="eats"]`: `--base-accent-background-primary-bold: var(--base-green-53)` (`#098042`)
- `[data-product="membership"]`: `--base-accent-background-primary-bold: var(--base-membership-57)` (`#9f6402`)
- `[data-product="ai"]`: `--base-accent-background-primary-bold` über `--base-indigo-*`
- `[data-product="offers"]`: `--base-accent-background-primary-bold: var(--base-red-57)`
- Dazu `[data-theme="dark"]`-Varianten derselben Themes.

Sektionsrhythmus Startseite (aus den `background-color` der `<section>`-Wrapper): 6x `#000000` -> Hero `#000000` -> 2x `#000000` -> 3x `#FFFFFF` -> `#000000` -> 2x `#000000` -> 3x `#FFFFFF`. Die Seite alterniert in langen Blöcken, nicht Sektion für Sektion.

### Radius

`border-radius`-Werte nach Häufigkeit: `8px` (5x, Karten und Kacheln), `4px` (3x, Buttons und Felder), `12px` (2x), `16px` (2x), `6px` (1x). Buttons sind **eckig**, nicht pill. Pill-Form gibt es nur über den `inset 999px 999px`-Trick für Hover-Overlays und für die runden Fortschrittsanzeigen.

### Shadows

| Anzahl | Wert | Verwendung |
|---|---|---|
| 17 | `none` | Basiszustand Buttons |
| 14 | `inset 0 0 0 2px #FFFFFF, 0 0 0 2px #276EF1` | Fokusring |
| 9 | `inset 999px 999px 0px rgba(255, 255, 255, 0.1)` | Hover-Overlay dunkler Button |
| 9 | `inset 999px 999px 0px rgba(255, 255, 255, 0.2)` | Active-Overlay dunkler Button |
| 5 | `inset 999px 999px 0px rgba(0, 0, 0, 0.04)` | Hover-Overlay heller Button |
| 5 | `inset 999px 999px 0px rgba(0, 0, 0, 0.08)` | Active heller Button |
| 3 | `0 4px 16px hsla(0, 0%, 0%, 0.16)` | Popover/Karte |
| 1 | `0px 4px 16px rgba(0, 0, 0, 0.12)` | Overlay |
| 1 | `rgba(0, 0, 0, 0.08) 0px -8px 20px 0px` | Sticky-Bottom-Button, Schatten nach oben |

Die Elevation-Tokens sind zweiteilig aus Key- und Ambient-Schatten aufgebaut, z. B. `--base-elevation-lowest-key-blur: 2px`, `--base-elevation-lowest-key-color: rgba(0, 0, 0, 0.05)`, `--base-elevation-lowest-ambient-y: 0.5px`, `--base-elevation-lowest-ambient-blur: 10px`, `--base-elevation-lowest-ambient-spread: -1px`.

### Spacing und Container

- Container: `max-width: 1280px` ab `min-width: 1136px` (`.css-ofGld`), daneben `--max-width: 1152px` für Textcontainer
- Sektionspadding: `padding: 40px 24px` mobil, `padding: 64px 64px` ab 1136px
- Randbreite mobil 24px, Desktop 32px bis 64px
- Breakpoints, nach Häufigkeit: `min-width: 320px` (59x), `min-width: 600px` (81x), `min-width: 768px` (6x), `min-width: 1024px` (1x), `min-width: 1120px` (3x), `min-width: 1136px` (86x). Dazu `max-width: 767px` (6x), `1023px` (1x), `1119px` (5x)
- Grids: `repeat(4, 1fr)` (5x), `repeat(3, minmax(0, 1fr))` (3x), `repeat(8, 1fr)` (2x), `repeat(12, 1fr)` (2x), `repeat(5, minmax(0, 1fr))` (2x), `repeat(6, minmax(0, 1fr))` (2x)
- Gaps: `16px` mobil, `36px` Desktop (Karussells), `8px` (Formulargruppen), `4px` (Hero-Stack)
- Häufigste Padding-Einzelwerte: `40px` (29x), `64px` (14x), `56px` (13x)

### Typo-Skala

Feste Pixel, **kein `clamp()`** (0 Treffer in beiden Stylesheets).

| Rolle | Klasse | Größe / Line-Height / Gewicht |
|---|---|---|
| H1 mobil | `.css-cgxnTe` | 36px / 44px / 700 |
| H1 Tablet | `.css-cgxnTe` | 44px / 52px / 700 |
| H1 Desktop | `.css-cgxnTe` | 52px / 64px / 700 |
| H2 | `.css-fXLKki` | 28px / 36px / 700 -> 32px/40px -> 36px/44px |
| H3 | diverse | 36px / 44px / 700 |
| H3 klein | `.css-jmnQxd` | 24px / 32px / 700 |
| Body L | `.css-jKLevy` | 16px / 24px / 400 |
| Body M | (Body-M-Token) | 14px / 18px |
| Body S | (Body-S-Token) | 12px / 16px |
| Accordion-Summary | `.css-gOfMna` | 16px / 20px / 500 |
| CTA-Link groß | `.css-bLZDAV` | 20px / 112px / 400 -> 24px |

`letter-spacing: 0` bei allen Headlines. Skala-Tokens: `--base-font-size-10` bis `--base-font-size-42` in 2px-Schritten (`calc(10/16*1rem)` usw.), Line-Heights passend dazu `--base-line-height-10` bis `-42`. Letter-Spacing-Tokens `--base-letter-spacing-ls-25: 0.25px`, `ls-28: 0.28px`, `ls-30: 0.3px` plus Negativwerte. Insgesamt 270 `--base-typography-*`-Tokens für Kombinationen aus Größe, Gewicht und Familie.

## Animationen

### Motion-Libraries

**Keine.** Kein GSAP, kein ScrollTrigger, kein Lenis, kein Framer Motion, kein AOS, kein Swiper, kein Splide, kein Lottie, kein Rive, kein Three.js, kein Webflow (`data-w-id`: 0 Treffer), kein Elementor. Nur ein einziges Vorkommen von `aos` im gesamten HTML und das ist ein Teilstring in `aspectRatioMobile`. Die Site animiert ausschließlich mit CSS-Transitions, CSS-Keyframes und `IntersectionObserver` aus dem eigenen Bundle.

### `@keyframes`

Im Seiten-CSS gibt es genau **einen** Keyframe:
```css
@keyframes animation-dkKkL{0%{background-position:100% 50%}100%{background-position:0% 50%}}
```
Das ist der Lade-Skeleton-Skeleton-Shimmer (`.css-kvneza`, siehe unten).

Fünf weitere Keyframes liegen im JS-Bundle (`client-main.js`, Modul `97928`), nicht im CSS:
```js
"@keyframes fadeFromBottom":{from:{animationTimingFunction:o,opacity:0,transform:"translateY(100px)"},to:{opacity:1,transform:"translateY(0px)"}}
"@keyframes fadeFromLeft":{from:{animationTimingFunction:o,opacity:0,transform:"translateX(-100px)"},to:{opacity:1,transform:"translateX(0px)"}}
"@keyframes fadeFromRight":{from:{animationTimingFunction:o,opacity:0,transform:"translateX(100px)"},to:{opacity:1,transform:"translateX(0px)"}}
"@keyframes fadeFromTop":{from:{animationTimingFunction:o,opacity:0,transform:"translateY(-100px)"},to:{opacity:1,transform:"translateY(0px)"}}
"@keyframes fadeIn":{from:{animationTimingFunction:o,opacity:0},to:{opacity:1}}
```
mit den wörtlichen Konstanten aus demselben Modul:
```js
o = "cubic-bezier(0, 0, 0, 1)"   // Easing
l = "1100ms"                     // Dauer
i = 150                          // Stagger-Basis in ms
a = "dotcom-anim-reveal"         // Klassenname
n = {freezeOnceVisible:true, root:null, rootMargin:"0px", threshold:.35}
```

### Scroll-Reveal

Zweistufig. Erstens im React-Bundle:
```js
const m={...c.no, ...g||{}, ...p?{[l.medium]:p}:{},
  "@media (prefers-reduced-motion: reduce)":{animationName:"none",opacity:1,transform:"none"}};
```
Zweitens als separater Inline-Script-Injector `wcb3-highlight-reveal-enhancer` mit `{"revealClass":"dotcom-anim-reveal"}`:
```js
function(e){var n=e.getBoundingClientRect(),t=window.innerHeight||document.documentElement.clientHeight;
  return n.top<t*(1-CONFIG.THRESHOLD)&&n.bottom>0}(e)
  ? function(e){e.__wcbRevealed||(e.__wcbRevealed=!0,e.style.animationPlayState="running")}(e) : r++}
```
`CONFIG.THRESHOLD` ist `.35`. Das Element startet also mit `animation-play-state: paused` und wird beim Scrollen auf `running` geschaltet. Der Reveal-Trigger ist damit **ein Prozentwert der Viewporthöhe**, nicht `IntersectionObserver` (der Injector hört auf `scroll` und `resize` und drosselt über `requestAnimationFrame`). Der React-Pfad nutzt `IntersectionObserver` mit `threshold: .35`. Genau ein Element pro Seite trägt `dotcom-anim-reveal`: nachweisbar auf Startseite, ride, drive, business, about, safety und uber-one (je 1 Treffer). Auf ride-options, deliver, autonomous, blog, newsroom und den Artikeln kommt der Marker nicht vor. Der Effekt wird also extrem sparsam eingesetzt.

### Transitions

57 `transition`-Deklarationen im Seiten-CSS, gruppiert:

| Anzahl | Deklaration | Kontext |
|---|---|---|
| 18 | `transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1)` | Headline-Klassen `.css-cgxnTe`, Buttons |
| 9 | `transition:all 200ms ease` | Textlinks, Sekundärelemente |
| 8 | `transition:transform 1000ms cubic-bezier(.2, .8, .4, 1)` | Karussell-Spur |
| 6 | `transition:transform 200ms ease-out` | Skip-Link `.css-jcwfVM` |
| 6 | `transition:all 0.3s ease-in-out` | Diverses |
| 3 | `transition:all 500ms cubic-bezier(0.22, 1, 0.36, 1)` | Textlinks mit Unterstreichungs-Animation |
| 3 | `transition:backgroundColor 500ms` | Menüzeilen |
| 3 | `transition:all 400ms ease !important` | Overrides |

Easing-Werte nach Häufigkeit: `cubic-bezier(0.4, 0, 0.2, 1)` (18x, Material-Standard), `cubic-bezier(0, 0, 1, 1)` (15x, identisch zu `linear`), `cubic-bezier(0.22, 1, 0.36, 1)` (13x, Expo-Out), `cubic-bezier(.2, .8, .4, 1)` (8x, Karussell).

### Karussell

Alle Karussells (24 Instanzen über die 13 geprüften Seiten, Kennung `aria-label="Galeriesteuerung"`; 9 davon auf der Startseite, 12 auf Fahrtoptionen, 3 auf Autonome Fahrtoptionen) nutzen dasselbe Muster: die Spur ist ein CSS-Grid mit allen Slides und wird per `transform` verschoben.
```css
.css-kFFrEt{display:grid;grid-gap:16px;
  grid-template-columns:repeat(5, minmax(0, 1fr));
  transform:none;
  transition:transform 1000ms cubic-bezier(.2, .8, .4, 1);
  width:calc(500%);}
```
Responsiv wird nur die Spaltenzahl getauscht: `repeat(5,...)` + `width:calc(500%)` mobil, `repeat(6,...)` + `width:calc(300%)` und `repeat(6,...)` + `width:calc(200%)` in den größeren Breakpoints. Keine Library, keine Dots-Bibliothek, die Steuerung ist ein `<nav aria-label="Galeriesteuerung">` mit `1/5`-Zähler und zwei Chevron-Buttons.

### Hover-Effekte

Drei Muster, alle aus CSS:

1. **Overlay-Trick** für Buttons:
```css
.css-lWgfA:hover{box-shadow:inset 999px 999px 0px rgba(255, 255, 255, 0.1);}
.css-lWgfA:active{box-shadow:inset 999px 999px 0px rgba(255, 255, 255, 0.2);}
```
2. **Unterstreichung wächst von links** per `background-size`:
```css
.css-geNvgm{background-image:linear-gradient(transparent calc(100% - 1px), white 1px), linear-gradient(transparent calc(100% - 1px), #CBCBCB 1px);background-position:0 bottom, 0 bottom;background-repeat:no-repeat;background-size:0% 6px, 100% 6px;transition:all 500ms cubic-bezier(0.22, 1, 0.36, 1);}
.css-geNvgm:hover{background-size:100% 6px, 100% 6px;}
```
3. **Icon schiebt sich** in Karten:
```css
.css-iEmtFV:hover [data-testid="icon-wrapper"]{transform:translateX(12px);}
```
4. Farbwechsel auf Menüzeilen: `.css-jDamMz:hover{background-color:#F3F3F3;color:#000000;}`

### Lade-Skeleton

```css
.css-kvneza{animation-timing-function:ease-out;animation-duration:1.5s;animation-iteration-count:infinite;background-size:400% 100%;animation-name:animation-dkKkL;background-image:linear-gradient(135deg,#E8E8E8,#E8E8E8,#E8E8E8,#E8E8E8,#E8E8E8,#E8E8E8,#F3F3F3,#E8E8E8,#E8E8E8,#E8E8E8,#E8E8E8,#E8E8E8,#E8E8E8);}
```
8 Instanzen. Die Produktkacheln erscheinen im Server-HTML als leere `testid="loader"`-Divs und werden erst clientseitig gefüllt.

### FAQ-Akkordeon

Native `<details>`/`<summary>` mit CSS-Animation über `::details-content`:
```css
.wcb-accordion-opt{interpolate-size:allow-keywords}
.wcb-accordion-opt details::details-content{height:0;overflow:clip;transition:height 0.3s ease,content-visibility 0.3s ease allow-discrete}
.wcb-accordion-opt details[open]::details-content{height:auto}
.wcb-accordion-opt details[open] > summary .wcb-accordion-opt-chevron{transform:rotate(180deg)}
```
Chevron-Rotation separat: `.css-kMlzVP{transition-duration:0.2s;transition-property:transform;transition-timing-function:ease;}`

### Reduced Motion

`prefers-reduced-motion` kommt **genau einmal** in beiden Stylesheets vor: 0 Treffer in `main.css`, 0 Treffer im Seiten-CSS. Der einzige Treffer liegt im JS-Bundle und deaktiviert Animationen nur für die Reveal-Blöcke:
```js
"@media (prefers-reduced-motion: reduce)":{animationName:"none",opacity:1,transform:"none"}
```
Alle anderen Animationen (Karussell-Transform über 1000ms, Skeleton-Shimmer, Hover-Transitions) laufen ohne Reduced-Motion-Behandlung weiter.

### Weitere Motion-Elemente

- **Video-Autoplay:** Startseite 1 `<video autoplay loop muted playsinline>`; Autonome Seite 4 solcher Videos plus 1 YouTube-Iframe `youtube.com/embed/uVDxmbNS2h4`
- **Sticky-Bottom-CTA:** `CROStickyBottomButton` mit `containerSettings: {showShadow: true}`, `visibility: "SHOW_ON_SCREEN_BELOW_BLOCK"`, Button `Preise anzeigen`, zwei Varianten (desktop/mobile), Schatten `rgba(0,0,0,0.08) 0px -8px 20px 0px`
- **Guided Tour:** `CROGuidedTour`, `awaitUntilPrivacyBannerIsOpen: true`, `hideOnDesktop: true`, `hideOnTablet: true`, `placement: "Vertical"`, mit Resume-Modal (`Tour fortsetzen`, `Fortsetzen`, `Neu starten`)
- **Zähler-Animationen:** keine gefunden
- **Marquee:** keine gefunden
- **Parallax:** keine gefunden
- **Sticky-Sections:** keine gefunden. Kein `min-h-screen`, kein `100vh`-Hero
- **Sticky-Header:** nur ein mobile Menü-Overlay `.css-eJIDYU{height:100vh;position:fixed;top:0;width:100vw;z-index:1;visibility:hidden;}`

### Tech-Stack (Marker)

| Marker | Treffer | Deutung |
|---|---|---|
| `__fusion__` | 39 | Uber Fusion, eigenes React-Framework |
| `data-hydrate-component-name` | 16 distinkte Komponenten | Island-Architektur mit selektiver Hydration |
| `data-hydrate-method="eager"/"visible"/"none"` | an jedem Block | Hydration-Strategie pro Block steuerbar |
| `data-baseweb="..."` | 353x `block`, 103x `link`, 51x `button`, 14x `typo-headingxlarge` | Base Web Design System von Uber |
| `css-*` | 2 624 | Emotion-artige CSS-in-JS-Klassennamen, pro Seite generiert |
| `webpackChunkFusion` | 0 (Bundle-intern `self.webpackChunkFusion`) | Webpack |
| `tags.tiqcdn.com/utag/uber/main/prod/utag.js` | 1 | Tealium Tag Manager |
| `udam` | 142 | Uber Design Asset Manager |
| `contentful` | 2 | Asset-Referenz |
| `botdefense-enabled: false` | 1 | Bot-Defense vorhanden, deaktiviert |
| `munchkin.marketo.net` | in Skriptliste | Marketo |
| `tag.demandbase.com/e353a7a2a87d1338.min.js` | in Skriptliste | Demandbase ABM |
| `dev.visualwebsiteoptimizer.com` | in Skriptliste | VWO (A/B-Tests) |
| `hotjar`, `clarity.ms`, `doubleclick`, `facebook.net`, `analytics.tiktok.com`, `snapchat.com`, `linkedin`, `stackadapt`, `appier`, `inmarkethub` | je in CSP und Skriptliste | breites Ad-Tech-Setup |

Es gibt **kein `__NEXT_DATA__`**, kein `_next/static`, kein `wp-content`, kein `data-w-id`, kein Shopify, kein Wix, kein HubSpot. Statische Assets liegen unter `/_static/client-{main,vendor,runtime}-<hash>.{js,css}` plus Legacy-Varianten `client-legacy-*`. CSS-Datei und JS-Bundles tragen SRI-`integrity`-Hashes und `nonce`.

Tracking: `data-tracking-name` an praktisch jedem Link, generiert als `_<block-uuid>_links[4].childNodes[0].link_cta10` bzw. `homepage_<uuid>_RIDE.formCTAOne.ctaDetails_cta2`. Statistiken laufen über `window.__PRE_ANALYTICS__`.

### Bilder

- Formate: nur `.jpg`, `.jpeg`, `.png`, `.gif`, `.svg`. **0 Treffer für `webp` und `avif`** in allen geprüften HTML-Dateien. Die Auslieferung läuft über `cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/...`; die Formatwahl passiert also serverseitig hinter `format=auto`, nicht im Markup
- Lazy Loading: Startseite 20 von 32 `<img>`, ride 12 von 25, Artikel 16 von 21, drive 12 von 17
- `fetchpriority="high" loading="eager"`: 12x Startseite, 13x ride, 9x Artikel, 5x drive. Alle Hero- und die ersten Kachelbilder
- `srcset` im `<img>`: **0 Treffer**. Responsivität läuft über `<picture>` mit `<source media="screen and (min-width: 1136px|600px|320px)">` und darin `srcSet` mit 1x- und 2x-URL, z. B. `width=1152` und `width=2304`
- Bild-URLs sind base64-kodierte Pfade: `srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20v...`
- Zusätzlich `srcSet` als `srcSet`-Prop in `<img>` an einer Stelle (Artikel-Avatar), sonst nur `<picture>`

### Anrede-Messung

| Seite | du/dein | Sie/Ihr | Dominanz |
|---|---|---|---|
| Startseite | 26 | 4 | du |
| ride | 16 | 2 | du |
| drive | 49 | 3 | du |
| deliver | 15 | 2 | du |
| safety | 30 | 2 | du |
| ride-options | 14 | 2 | du |
| uber-one | 17 | 3 | du |
| about | 15 | 2 | du |
| business | 5 | 117 | Sie |
| business/pricing | 8 | 103 | Sie |
| blog-Artikel | 5 | 49 | Sie |
| newsroom | 3 | 0 | neutral |

Die B2C-Seiten sind durchgehend "du", die B2B-Seiten durchgehend "Sie". Die Startseite bricht die Regel in Sektion 10 (`Uber for Business bietet Ihrem Unternehmen mehr Kontrolle`).

## Synthese

### 1. Seitentyp-Blueprints

**Startseite** (Endlos-Scroll, 11 Blöcke):
1. Header 64px, dunkel `#000000`: Logo, 5 Hauptpunkte, `Anmelden`, `Registrieren`
2. Hero 2-Spalten `#000000`: H1 `Go anywhere` links, Routen-Formular rechts, Full-bleed-Foto 3:2 (`aspect_3_2` -> `aspect_1_1` mobil)
3. Produkt-Tabs, 5er-Grid, Carousel `1/5`, Icon-Kacheln
4. Prozess-Steps, 5er-Carousel `1/5`, nur bei Fahrten
5. Reise-Teaser, 2-Spalten, Autoplay-Video
6. Feature-Carousel, 3er `1/3`, Foto-Karten mit Deep-Links
7. Eats-Carousel, 2er `1/2`
8. Membership-Banner, Full-bleed, englisch
9. Recruiting-Carousel, 3er `1/3`
10. B2B-Zigzag 50/50, SIE-Anrede, `Mehr erfahren`
11. App-Download-Panel, 2er, QR-Codes
12. Footer 5 Spalten

**Leistungsseite (Fahrt / Fahrer / Lieferung)** (9 Blöcke):
1. Header + Sub-Nav mit Produkt-Dropdown
2. Hero 2-Spalten dunkel, H1 + Subline 2 Zeilen, 2 CTAs, ein Zielgruppen-Formular oder kein Formular
3. Nutzen-Zigzag, 3 H3-Blöcke mit Foto
4. Prozess-Steps, 3er-Grid mit Icon, je Schritt ein Link
5. Cross-Sell-Block (B2B auf Fahrt-Seite, B2B-Flotte auf Fahrer-Seite)
6. Support-Dreier, 3er-Grid, `Kontaktiere uns`
7. FAQ-Akkordeon, 4-5 native `<details>`
8. App-Download-Panel
9. Doppel-CTA `Als Fahrer registrieren` / `Als Kurier registrieren` mit Pfeil-Icons
10. Footer

**B2B-Produktseite (Business)** (12 Blöcke):
1. Mega-Menü mit 4 Gruppen und Beschreibungstexten
2. Hero dunkel, H1 5 Wörter, 2 CTAs
3. Benefits-Grid 2-Spalten, Zahlen im Text
4. Benefits-Grid 2, Sicherheitszahl `99,9 %`
5. Lösungs-Übersicht 3er-Grid
6. Feature-Zigzag, 3 H3-Blöcke
7. Logo-Wall + Zähler `200 000 Unternehmen`
8. Testimonial mit Name, Titel, Firma, Video
9. Empfehlungs-Stat `9 von 10` mit Fußnote
10. Ratgeber-Teaser 3er-Grid
11. Fußnoten-Block mit Stichprobengrößen
12. eigenes B2B-Footer

**Über-uns-Seite** (9 Blöcke):
1. Titel-Band zentriert, nur H1
2. Mission-Statement in sehr kurzen Sätzen, zentriert schmal, 84 Wörter
3. CEO-Brief 2-Spalten mit Porträt
4. Nachhaltigkeit 2-Spalten, Ziel mit Jahr 2040
5. Produkt-Übersicht 2-Spalten
6. Sicherheit 2-Spalten
7. Unternehmens-Info 2-Spalten, Führung und Integrität
8. Presse-Trio 3er-Grid (Newsroom, Blog, Investoren)
9. Karriere-CTA Full-bleed dunkel

**Ratgeber-Index** (4 Blöcke):
1. Blog-Nav mit 11 Kategorien als Mega-Menü
2. Titel-Band dunkel `Blog` + Claim
3. Filterzeile `Filtern nach: Alle Kategorien` + Kartenliste mit Kategorie und Datum
4. Footer

**Ratgeber-Artikel** (7 Blöcke):
1. Blog-Nav
2. Titel-Band: Datum, H1, Avatar mit Initialen, Autorname
3. Hero-Bild `fetchpriority="high" loading="eager"`
4. Teilen-Zeile mit 4 Buttons
5. Fließtext ohne H2, 460 bis 750 Wörter
6. Kategorie-Chip + Autor-Box `Verfasst von`
7. `Verwandte Artikel` mit Zähler, 6 Karten
8. Footer

**Funnel/Business-Einstieg** (3 Blöcke):
1. Titel-Band zentriert
2. Zwei-Spalten-Vergleich mit Segmentierung (Selbstbedienung / Vertrieb ab 100 Mitarbeitenden), je Spalte eine Liste und ein CTA
3. Ressourcen-Grid 3er
4. Footer. **Kein Formular, kein Rechner, kein Fortschritt.**

### 2. Die 5 stärksten Muster

1. **Ein Formular als Hero, das sofort eine Zahl liefert.** Die Startseite setzt statt eines Claims ein Routen-Formular in den Hero (`Pickup location`, `Dropoff location`, `See prices`) und führt in einem Klick nach `m.uber.com/looking`. Beleg: `home2.html`, Sektion 3 enthält `checkbox`-freie `role="combobox"`-Felder mit `data-testid="dotcom-ui.pickup-destination.input.pickup"` und CTA `"text":"See prices","href":"https://m.uber.com/looking"`. Dasselbe Muster auf `ride`, `ride-options`, `home`. Kein Trust-Badge, kein Claim, nur das Werkzeug.

2. **Ein Karussell-Mechanismus ohne jede Library.** 24 Karussells auf den 13 geprüften Seiten, alle mit identischem CSS: Grid-Spur plus `transform`, feste Dauer 1000ms, festes Easing. Beleg: `.css-kFFrEt{...transition:transform 1000ms cubic-bezier(.2, .8, .4, 1);width:calc(500%);}` und `.css-kxAFoe{...grid-template-columns:repeat(3, minmax(0, 1fr));...transition:transform 1000ms cubic-bezier(.2, .8, .4, 1);width:calc(300%);}`. Responsiv nur die Spaltenzahl, sonst identisch. Steuerung als `<nav aria-label="Galeriesteuerung">` mit Zähler `1/5`.

3. **Scroll-Reveal, der sich selbst wieder abschaltet.** Der Injector entfernt seine Listener, sobald nichts mehr zu tun ist: `0===r&&(window.removeEventListener("scroll",i,!0),window.removeEventListener("resize",i))`. Schwelle als Anteil der Viewporthöhe: `n.top<t*(1-CONFIG.THRESHOLD)` mit `CONFIG={THRESHOLD:.35}`. Umschaltung über `e.style.animationPlayState="running"` mit Merker `__wcbRevealed`. Kein Library-Overhead, kein Dauer-Listener.

4. **Produktfarbe über ein Datenattribut statt über eigene Komponenten.** Ein Satz CSS-Variablen deckt alle Produkte ab: `[data-product="eats"]{--base-accent-background-primary-bold: var(--base-green-53)}`, `[data-product="membership"]{--base-accent-background-primary-bold: var(--base-membership-57)}`, `[data-product="ai"]{...}`, `[data-product="offers"]{...}`, plus `[data-theme="dark"]`-Varianten. 12 Paletten mit je 24 Stufen, Akzent immer auf Stufe 57 (Blau `#1175dd`, Grün `#17904e`, Rot `#e42500`, Membership `#9f6402`, Indigo `#745fda`).

5. **Ein Trust-Block, der Zahlen belegt statt behauptet, aber nur im B2B-Bereich.** Nur `business` staffelt Beweise: `Erzielen Sie Kosteneinsparungen von bis zu 10 %`, `99,9 % aller über die Uber App gebuchten Fahrten ohne gemeldete Sicherheitsvorfälle`, `Schließen Sie sich über 200 000 Unternehmen an, darunter die Hälfte aller Fortune 500 Unternehmen`, Testimonial mit `Ryan Carter, Gründer und CEO, Parachute Media`, `9 von 10 Kund*innen würden Uber for Business empfehlen³`. Die Fußnoten nennen die Stichproben wörtlich: `Basierend auf einer Umfrage unter mehr als 275 Uber for Business Kund*innen weltweit im Februar 2023` und `einer im November 2021 von Uber in Auftrag gegebenen Umfrage, in der 323 Uber for Business Kund*innen ...`.

### 3. Animation-Rezepte

Alle Werte wörtlich aus dem gefetchten CSS/JS.

**Rezept 1: Karussell-Track (Kern-Interaktion der Seite)**
```css
.track {
  display: grid;
  grid-gap: 16px;                                   /* Desktop: 36px */
  grid-template-columns: repeat(5, minmax(0, 1fr));
  list-style-type: none;
  margin: 0; padding: 0;
  transform: none;
  transition: transform 1000ms cubic-bezier(.2, .8, .4, 1);
  width: calc(500%);                                 /* = Spaltenzahl * 100% */
}
/* Breakpoints tauschen nur Spalten und Breite, Transition bleibt:
   repeat(6) + calc(300%)  |  repeat(6) + calc(200%) */
```
Trigger: Klick auf `<button>` mit `Chevron right small` in `nav[aria-label="Galeriesteuerung"]`, Fortschritt im `1/5`-Zähler.

**Rezept 2: Scroll-Reveal von unten, viewport-relativ, mit Selbstabschaltung**
```css
@keyframes fadeFromBottom {
  from { animation-timing-function: cubic-bezier(0, 0, 0, 1); opacity: 0; transform: translateY(100px); }
  to   { opacity: 1; transform: translateY(0px); }
}
.reveal {
  animation-name: fadeFromBottom;
  animation-duration: 1100ms;
  animation-fill-mode: both;
  animation-play-state: paused;                        /* Start */
  animation-delay: calc(<stagger-index> * 150ms);
}
@media (prefers-reduced-motion: reduce) {
  .reveal { animation-name: none; opacity: 1; transform: none; }
}
```
```js
const CONFIG = { THRESHOLD: .35 };
// Auslöser, wörtlich aus dem Injector:
const inView = (el) => {
  const r = el.getBoundingClientRect();
  const h = window.innerHeight || document.documentElement.clientHeight;
  return r.top < h * (1 - CONFIG.THRESHOLD) && r.bottom > 0;
};
el.style.animationPlayState = "running";
```
Drosselung über `requestAnimationFrame`, Listener auf `scroll` und `resize`, Abbau bei `0 === remaining`.

**Rezept 3: Button-Hover als Overlay ohne Farbwechsel-Layoutshift**
```css
.btn { background-color: #000000; color: #FFFFFF; transition-property: background; transition-duration: 200ms; }
.btn:hover  { box-shadow: inset 999px 999px 0px rgba(255, 255, 255, 0.1); }
.btn:active { box-shadow: inset 999px 999px 0px rgba(255, 255, 255, 0.2); }
.btn:focus-visible { box-shadow: inset 0 0 0 2px #FFFFFF, 0 0 0 2px #276EF1; }
.btn:disabled { cursor: not-allowed; background-color: #F3F3F3; color: #A6A6A6; }
```
Heller Button nutzt dieselbe Technik mit `rgba(0, 0, 0, 0.04)` bzw. `0.08`.

**Rezept 4: Textlink-Unterstreichung, die von links einläuft**
```css
.link {
  background-image:
    linear-gradient(transparent calc(100% - 1px), white 1px),
    linear-gradient(transparent calc(100% - 1px), #CBCBCB 1px);
  background-position: 0 bottom, 0 bottom;
  background-repeat: no-repeat;
  background-size: 0% 6px, 100% 6px;
  padding-bottom: 6px;
  text-decoration: none;
  transition: all 500ms cubic-bezier(0.22, 1, 0.36, 1);
}
.link:hover { background-size: 100% 6px, 100% 6px; }
```
Die erste Ebene ist die weiße Linie, die zweite die graue Grundlinie (`#CBCBCB`). Farbwechsel zusätzlich: `.link:hover { color: #4B4B4B; }`

**Rezept 5: FAQ-Akkordeon ohne JavaScript**
```css
.wcb-accordion-opt { interpolate-size: allow-keywords; }
.wcb-accordion-opt details::details-content {
  height: 0;
  overflow: clip;
  transition: height 0.3s ease, content-visibility 0.3s ease allow-discrete;
}
.wcb-accordion-opt details[open]::details-content { height: auto; }
.wcb-accordion-opt details[open] > summary .wcb-accordion-opt-chevron { transform: rotate(180deg); }
.chevron { transition-property: transform; transition-duration: 0.2s; transition-timing-function: ease; }
```
Markup: `<details class="css-iHRcXs"><summary class="css-gOfMna">` mit `border-bottom: 1px solid #F3F3F3` und `padding: 16px 20px`.

**Rezept 6: Lade-Skeleton-Shimmer**
```css
@keyframes animation-dkKkL { 0% { background-position: 100% 50% } 100% { background-position: 0% 50% } }
.skeleton {
  animation-name: animation-dkKkL;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-iteration-count: infinite;
  background-size: 400% 100%;
  background-image: linear-gradient(135deg, #E8E8E8, #E8E8E8, #E8E8E8, #E8E8E8, #E8E8E8, #E8E8E8, #F3F3F3, #E8E8E8, #E8E8E8, #E8E8E8, #E8E8E8, #E8E8E8, #E8E8E8);
}
```
Nicht belegbar: die genauen Stagger-Indizes pro Kachel. Der Multiplikator `150ms` steht im Bundle (`i = 150`), die konkreten Indexwerte kommen aus den Blockdaten und sind im Server-HTML nicht sichtbar.

### 4. Anti-Patterns / Schwächen

1. **Sprachmix auf den deutschen Seiten.** Die Startseite hat `Go anywhere` als H1 und `Pickup location`, `Dropoff location`, `See prices`, `Log in to check your activity` im ersten Formular. Sektion 8 heißt `Get member savings on rides and delivery`, Sektion 9 `Earn with Uber` mit H3 `Drive and earn on your schedule`. Die Autonome-Seite beginnt mit einem kompletten englischen Absatz. Die Sicherheitsseite endet mit dem CTA `Learn more`. Das ist konsistenzlos und kostet Klarheit auf der wichtigsten Seite.

2. **Kein einziges strukturiertes Datum.** 0 `application/ld+json`-Blöcke auf allen 20 geprüften Seiten, kein `Article`, kein `FAQPage`, kein `Organization`, kein `BreadcrumbList`, obwohl FAQ-Akkordeons und Artikel vorhanden sind. Die hreflang-Abdeckung der Artikel schwankt zwischen 0 und 3, und die Artikel tragen keine inhaltlichen H2.

3. **Hero ohne Vertrauensanker und ohne Subline.** Die Startseite verkauft in einem Satz von zwei Wörtern. Kein Siegel, keine Zahl, keine Kundenzahl, keine Presse. Für ein Produkt, das eine Zahlungsmethode und einen Standort verlangt, fehlt jeder Risiko-Nehmer im ersten Bildschirm.

4. **Kein Reduced-Motion-Handling außerhalb des Reveals.** `prefers-reduced-motion` kommt in beiden Stylesheets 0-mal vor. Die 1000ms-Karussells, der Endlos-Shimmer, die 500ms-Textlink-Animation und der Sticky-Bottom-Button laufen unverändert.

5. **Ratgeber ohne Ratgeber-Funktion.** Es gibt kein Inhaltsverzeichnis, keine Lesezeit, keine Key-Takeaways, keine Zwischen-CTAs, 0 interne Links im Artikeltext, 0 `<table>`, 0 `<blockquote>`. Die Liste heißt auch auf der Index-Seite `Verwandte Artikel`. Artikel zwischen 460 und 750 Wörtern sind für Suchintentionen zu kurz.

6. **Redundanz im DOM.** `Entdecke, was du mit der Uber App tun kannst` steht 3x als H2 im HTML, `In den Apps ist es einfacher` 2x, `Mehr Funktionen in der App` 2x. Jede Seite liefert das 4- bis 5-fache an Markup gegenüber dem sichtbaren Inhalt (Startseite 810 KB HTML für 11 Blöcke).

7. **Kein Preis, kein Rechner, kein Telefon.** Auf keiner geprüften Fahrt- oder Fahrer-Seite gibt es einen Preis, einen Kostenrechner oder eine Telefonnummer. Der Preis erscheint erst nach dem Klick in `m.uber.com/looking`. Wer nicht klicken will, bekommt keine Zahl.

8. **Kaputte Details.** Die Canonical-URL auf `business/getting-started/` ist `uber.com/business/getting-started/` ohne Protokoll und ohne `/de/de/`. Der `meta` `"twitter:card"` steht doppelt im Dokument einmal als `app` und einmal als `summary`. Der Sprachtitel lautet `Wähle deine bevorzugte Sprache`, das Modal hat den Button `Globe Deutsch`. Die Newsroom-Boxen drucken ihren Beschreibungstext zweimal.

9. **Formular-Microcopy fehlt.** Keine der geprüften Formularseiten sagt "kostenlos", "unverbindlich", "dauert 2 Minuten" oder nennt einen Preis. Der Nutzer weiß vor dem Klick nicht, was `See prices` kostet oder verlangt.

### 5. Conversion-Mechanik in 5 Sätzen

1. Jede Seite beginnt mit einem Werkzeug oder einer klaren Handlung statt mit einem Claim: die Startseite mit einem Routen-Formular, die Fahrt-Seite mit Abhol- und Ankunftsfeld, die Fahrer-Seite mit `Als Fahrer registrieren`, die Business-Seite mit `Erste Schritte`.
2. Alle primären CTAs laufen in nur drei Senken: `m.uber.com/looking` für Fahrten, `drivers.uber.com` für Fahrer, `business.uber.com` für Firmenkunden, dazu `ubereats.com` als vierte.
3. Auf jeder Fahrt- und Fahrer-Seite wiederholt sich derselbe App-Download-Block mit QR-Code, und auf jeder Seite sitzt ein Sticky-Bottom-Button `Preise anzeigen`, der erst sichtbar wird, wenn der Nutzer den Hero verlassen hat.
4. Die Beweisführung ist streng nach Zielgruppe getrennt: B2C-Seiten zeigen gar keinen Trust, B2B-Seiten bauen eine Kette aus Prozentzahlen, Fortune-500-Anteil, namentlichem CEO-Zitat und fußnotenbelegten Umfragen mit Stichprobengröße.
5. Vertrauen entsteht im B2C nicht durch Siegel, sondern durch Funktionsklarheit: 18 Fahrtoptionen mit je eigenem Deep-Link, Prozess-Steps in 5 Schritten, FAQ-Akkordeone von 4 bis 5 Fragen, und auf den Business-Seiten eine Segmentierung nach Unternehmensgröße statt eines Preisrechners.

## Abrufprotokoll

Alle Abrufe am 16. September 2026. Erst mit dem User-Agent eines Windows-Chrome und den Headern `Accept` (mit `image/avif,image/webp`) und `Accept-Language: de-DE,de;q=0.9,en;q=0.8`. Der Standard-`curl`-User-Agent liefert auf allen `/de/de/`-Seiten HTTP 406 mit 14 Bytes.

| URL | HTTP | Bytes |
|---|---|---|
| https://www.uber.com/de/de/ | 200 | 810 018 |
| https://www.uber.com/de/de/ride/ | 200 | 821 374 |
| https://www.uber.com/de/de/ride/how-it-works/ | 200 | 761 140 |
| https://www.uber.com/de/de/ride/ride-options/ | 200 | 801 485 |
| https://www.uber.com/de/de/drive/ | 200 | 732 650 |
| https://www.uber.com/de/de/deliver/ | 200 | 559 946 |
| https://www.uber.com/de/de/business/ | 200 | 473 210 |
| https://www.uber.com/de/de/business/platform/pricing/ | 200 | 431 595 |
| https://www.uber.com/de/de/business/getting-started/ | 200 | 387 621 |
| https://www.uber.com/de/de/about/ | 200 | 618 369 |
| https://www.uber.com/de/de/about/how-does-uber-work/ | 200 | 647 629 |
| https://www.uber.com/de/de/blog/ | 200 | 418 406 |
| https://www.uber.com/de/de/blog/was-ist-uber-for-business/ | 200 | 417 139 |
| https://www.uber.com/de/de/blog/fahrten-im-voraus-planen-mit-uber-reserve/ | 200 | 408 451 |
| https://www.uber.com/de/de/newsroom/ | 200 | 402 455 |
| https://www.uber.com/de/de/newsroom/uber-eats-awards-2026-halbfinalisten/ | 200 | 404 925 |
| https://www.uber.com/de/de/uber-one/ | 200 | 591 202 |
| https://www.uber.com/de/de/u/uber-one/ | 200 | 591 202 |
| https://www.uber.com/de/de/safety/ | 200 | 611 873 |
| https://www.uber.com/de/de/autonomous/ | 200 | 613 891 |
| https://www.uber.com/de/de/earn/ | 404 | 414 381 (404-Seite, kein Ziel) |
| https://www.uber.com/robots.txt | 200 | 904 |
| https://www.uber.com/sitemap.xml | 200 | 206 115 |
| https://www.uber.com/www_uber_com-de_de-c-sitemap.xml | 200 | 2 519 856 |
| https://www.uber.com/_static/client-main-styles-d9d73c42bd734fa7.css | 200 | 78 761 |
| https://www.uber.com/_static/client-main-ee8dcba50303c59a.js | 200 | 1 682 130 |
| https://www.uber.com/_static/client-vendor-673c886a6b0b9772.js | 200 | 654 025 |
| https://www.ubereats.com/de | 403 | 7 883 (**nicht abrufbar**, blockiert) |

Server-Dateien im Arbeitsverzeichnis `/tmp/site-uber/`.
