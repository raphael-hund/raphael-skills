# www.seo-labs.de

## Steckbrief

| Feld | Wert |
|---|---|
| Domain | https://www.seo-labs.de/ |
| Branche | SEO-/GEO-/Website-Agentur für regionale KMU und Mittelstand |
| Betreiber | SEOLabs GmbH, Tim und Robin Koppelmann, München |
| Seitentyp | Agentur-Marketing-Site mit Leistungsseiten, Branchen-Landingpages, Case Studies, News |
| Stack | Framer (generator `Framer d4bdfe7`), React 18 + Motion (Framer Motion), Lenis Smooth Scroll |
| Sprache | Deutsch (`<html lang="de" dir="ltr">`), kein hreflang |
| Anrede | durchgehend **Du** ("Dominiere", "dein Angebot", "deine Zielgruppe") |
| Anzahl Seiten in Sitemap | 83 URLs in `sitemap.xml` |
| Analytics | Meta Pixel (`fbq('init','1476020260918370')`), Framer Events (`events.framer.com/script?v=2`) |
| Consent | Framer Cookie Component (`__framer-cookie-component-button`), Cookie-Banner im Body |
| Terminbuchung | Calendly Inline Widget + Cal.com Inline Embed auf `/termin` |
| Schema.org | **keine** `application/ld+json`-Blöcke auf keiner der 13 geprüften Seiten, 0 Treffer |
| Published/optimized | `data-framer-ssr-released-at="2026-09-14T12:21:13.302Z"` |

## Sitemap

83 URLs laut `/sitemap.xml`. Gruppen:

**Hauptseiten (7):** `/` · `/seo` · `/geo` · `/websites` · `/ueber-uns` · `/usp` · `/karriere`

**Branchen-Landingpages (5):** `/immobilienmakler` · `/handwerker` · `/immobiliengutachter` · `/anwaltskanzleien` · `/steuerberater`

**Funnel/Conversion (4):** `/termin` · `/danke` · `/bewerbung-eingereicht` · `/dev/dev-home`

**Referenzen (1 + 19 + 14):**
- `/cases` (Übersicht, 19 Karten) → `/cases/<slug>`: haubner-group-immobilien, seniocon, ccg-gutachten, immo-kraemer, gastrorocket, schmidt-immobilien, wilkening, uptech-energietechnik, alm bad, fenstero, hagel-it, bodenleger-scholl, boxclan, north-coding, faerhline, skyparking, radulea, bodenbender-dach, irl-bauelemnte
- `/website-cases` (14 Karten) → `/website-cases/<slug>`
- `/cases-branchen/<12>` und `/cases-leistungen/<8>`: Facetten-Varianten derselben Cases

**News (1 + 5):** `/news` → `/news/seolabs-kundentour-2026`, `/news/ki-overviews`, `/news/german-web-award-2026`, `/news/unsere-weihnachtsfeier-im-käfer`, `/news/seolabs-wiesn-2026`

**Karriere (1 + 3):** `/karriere` → `/stellenanzeigen/junior-web-entwickler`, `/stellenanzeigen/seo-manager`, `/stellenanzeigen/seo-projektmanager`

**Rechtliches (3):** `/impressum` · `/datenschutz` · `/agb`

### Hauptnavigation (aus `SEOLabs Navbar`)

Die Nav ist eine **schwebende Pill** (`position:fixed`, `max-width:550px`, `border-radius:12px`, `height:75px`, `padding-top:20px`), bestehend aus: Burger-Icon + Label "Menü" links, Logo mittig (`position:absolute;left:50%`), CTA "Termin" rechts (`border-radius:8px`, `padding:10px 24px`, Hintergrund `rgb(122,127,173)`).

Aufklapp-Menü in 3 Spalten (`grid-template-columns:1fr 1fr 1fr`, `gap:16px`, `padding:32px 20px 40px`), Gruppen mit Eyebrow-Label in `letter-spacing:0.35em` uppercase:

| Spalte | Links |
|---|---|
| Leistungen | SEO · GEO · Websites |
| Über uns | Über uns · Unsere Vorteile · Karriere |
| Branchen | Immobilienmakler · Immobiliengutachter · Handwerker · Anwaltskanzleien · Steuerberater (aus Footer) |
| Ressourcen | Fallstudien (Nav) / SEOLabs News (Footer) |

Alle Nav-Links im Markup: `/` · `/termin/` · `/seo` · `/geo` · `/websites` · `/ueber-uns` · `/usp` · `/karriere`.

### Footer

**5 Spalten** unter der Überschrift-Gruppe `Above` → `Links` → `Links Inner`:

| Gruppe | Einträge |
|---|---|
| Leistungen | SEO · GEO · Websites |
| SEOLabs | Über uns · Vorteile · Karriere |
| Referenzen | SEO Fallstudien · Website Fallstudien |
| Branchen | Immobilienmakler · Handwerker · Immobiliengutachter · Anwaltskanzleien · Steuerberater |
| Ressourcen | SEOLabs News |
| Rechtliches | Impressum · Datenschutz · AGB (AGB nur in der Desktop-Variante) |

Zusätzlich: `Logo + Social` mit Instagram (`instagram.com/seolabs.de`), LinkedIn (`linkedin.com/company/seolabs-marketing/`), YouTube (`youtube.com/@seo-labs`). Trust-Siegel als SVGs: German Web Award Siegel, Süddeutsche Zeitung Logo, Handelsblatt, Forbes, Bayerische Landeszeitung, Hostinger Partner, "ready" und "DSGVO" Badge, "WordPress Native Agency". Link "Jetzt KI-Zusammenfassung von SEOLabs erhalten" führt zu `chatgpt.com/?q=Erzähle mir, was SEOLabs macht...`. Copyright: `© SEOLabs 2026`.

**Telefonnummer im Header oder Footer: keine.** Kein `tel:`-Link, kein Telefonverweis im gesamten HTML der geprüften Seiten.

## Seiten

### 1. Startseite `/`

- URL: https://www.seo-labs.de/
- Title: `SEOLabs GmbH | Tim & Robin Koppelmann | Für das beste SEO der Welt` (67 Zeichen)
- Meta-Description: `SEOLabs unterstützt regionale Unternehmen durch (KI-) SEO systematisch zu 20-40 mehr Kundenanfragen im Monat` (111 Zeichen)
- H1: `Dominiere die Suchergebnisse von Google bis ChatGPT` (wörtlich, 7 Wörter)
- H2: 30 · H3: 60 · Schema.org-Typen: **keine** · Canonical: `https://www.seo-labs.de/` · hreflang: keiner
- Body-Größe: 1.004.190 Bytes · 131 `<img>` · 101 `srcset` · 0 `loading=lazy`

**Sektionsliste in DOM-Reihenfolge:**

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Nav | (kein H) | n/a | Schwebende Pill, fixed | SVG Logo | `Termin` | n/a | `max-width:550px`, Burger + Vollbild-Overlay |
| 2 | Hero | `Dominiere die Suchergebnisse von Google bis ChatGPT` | "… und mach es deiner Zielgruppe dadurch unmöglich nicht zu kaufen. Nutze unser 100-fach erprobtes System…" (45 Wörter) | Full-bleed, zentriert | Hintergrund-WebP 2880x2450 + 3 Inline-SVG-Icons im H1 | `Termin buchen` · `Fallstudien ansehen` | Eyebrow `DIE SEO AGENTUR AUS MÜNCHEN`, `100+ UNTERNEHMEN VERTRAUEN UNS` | `padding:170px 0 100px`, H1 60px/46px/35px je Breakpoint, Letter-spacing -0.05em |
| 3 | Logo-Wall / Marquee-Ticker | n/a | n/a | Marquee (2 Reihen, `reverse`) | 12 Karten mit WebP + SVG | 6x `Mehr erfahren` · 6x `Fallstudie lesen` | German Web Award 2026, HAUBNER GROUP Website, "Mehrfach ausgezeichnet", Karriere, SEOLabs Websites™, Seniocon Case Study | `tickerEffectVelocity:50`, `tickerEffectGap:10`, `tickerEffectDirectionModifier:reverse` |
| 4 | Logo-Wall Presse | n/a | n/a | Marquee | SVG-Logos | n/a | Handelsblatt, Süddeutsche Zeitung, Forbes, Bayerische Landeszeitung, Hostinger Partner | als `Tagline`-Block direkt im Ticker |
| 5 | Intro | `Die größte Chance für regionale Unternehmen seit der Gründung von Google?` | "Echte Statistiken zeigen, dass Menschen im Normalfall bei einem der ersten 3 Links… Heute gibt es einen weiteren Mitspieler, der 50 % der Anfragen liefert: KI-Recherche." | Zentriert-schmal | n/a | n/a | `100+ UNTERNEHMEN VERTRAUEN UNS` | `gap:151px`, `padding:100px 20px` |
| 6 | News-Teaser | `SEOLabs News` | n/a | 3er-Grid, Karte | 3 Bilder, Hover-Overlay | `Alle News ansehen` | Kategorien-Labels `Milestone v1.0.0` bis `v1.0.4` | 3 Artikel verlinkt + Carousel-Pfeile |
| 7 | Testimonials | `Das sagen unsere Kunden` | Zitat "Mit der neuen Webseite und SEO-Strategie von SEOLabs haben wir uns als Marktführer im Emsland positioniert." | Carousel/Slider, 3 Breakpoint-Varianten | Avatar + 5 Kundenlogos | n/a | Robin Ostermann, Geschäftsführer FUX&HAS Immobilien | Zitat wiederholt sich 6x im SSR-Markup (Desktop/Tablet/Phone je 2x) |
| 8 | Leistungen | `Unsere Leistungen` | "Um in 2026 wirklich planbar Anfragen zu generieren, reicht es nicht, einzelne Puzzlestücke zu besitzen." | 3er-Grid, Karten mit Badge | 2 WebP-Screenshots + Karussell | `Mehr zu SEO erfahren` (3x) · `Mehr zu GEO erfahren` (3x) · `Mehr zu Websites erfahren` (3x) | H3s: `Ganz oben in der organischen Google-Suche`, `Die erste Empfehlung in ChatGPT, Claude & Co`, `SEO-Conversion-Website für maximales Anfragenpotenzial` | Dunkler Hintergrund `#211d1d`, `gap:80px`, `padding:100px 20px` |
| 9 | Cases | `So wurden Unternehmen in verschiedenen Branchen zum Marktführer` | n/a | 3er-Grid, Karte | 3 Projekt-WebP | `Fallstudie lesen` (3x) · `Fallstudien ansehen` | HAUBNER GROUP 10.000+/300+, Seniocon 7.000+/120+, GastroRocket 1.000+/52+ | Dunkel, `gap:0`, kurz |
| 10 | Benefits | `Sehr viel mehr als nur Sichtbarkeit` | Eyebrow `DEINE VORTEILE` | 4er-Grid, Karte | SVG-Icons | `Termin buchen` | n/a | Dunkel, 4 Karten: "Bekannteste deiner Region", "Konstanter Anfragenstrom", "Zukunftssicher", "Spaß im Verkauf" |
| 11 | Prozess-Timeline | `Zur Omnipräsenz in nur 5 Schritten` | n/a | Timeline, horizontal | 5 Videos (`max-width:400px`, `aspect-ratio:1/1`, loop, muted, playsinline) | n/a | n/a | Dunkel, `gap:80px`; Schritte: Onboarding & Analyse, Website-Optimierung, Google-Sichtbarkeit, KI-Sichtbarkeit, Betreuung und Optimierung |
| 12 | Über uns | `Gemacht für das beste SEO der Welt` | "Mit unserem 16-köpfigen Team aus SEO-Experten, Redakteuren und Projektleitern haben wir in den letzten 5 Jahren mehr als 100 Kunden an die Spitze der KI und Google-Suche gebracht." | 2-Spalten 50/50 | Team-Foto | `Termin buchen` · `Fallstudien ansehen` | Zähler: `+ 100 regionale Kunden` · `+ 20 Mio Webseitenbesucher` · `+ 50.000 Anfragen` | `background-color:#f6f6f6`, Zähler mit Stellen-Roll-Animation |
| 13 | Prozess-Steps | `Das passiert in unserer kostenlosen Potenzialanalyse` | n/a | 3er-Grid, Karte | 3 Videos (`preload="none"`) | `Termin buchen` · `Fallstudien ansehen` | n/a | `#f6f6f6`, `gap:110px`; Schritt 1 Dein Status Quo, Schritt 2 Dein Potenzial in Zahlen, Schritt 3 Individueller Fahrplan |
| 14 | Lead-Magnet | `Ganz oben in jeder KI-Suchanfrage` | "Wie du als regionaler Dienstleister in JEDER relevanten Suchanfrage deiner Zielgruppe als Erstes erscheinst…" | 2-Spalten, Karte | 6 gestapelte Report-Mockups | `Jetzt herunterladen` | Eyebrow `Unser neuer kostenloser KI-Report` | Dunkel, `gap:0`, `padding:100px 20px`, `id="report"` |
| 15 | YouTube | `Echte Einblicke, echte Ergebnisse` | "Auf unserem YouTube-Kanal teilen wir offen, was andere Agenturen nicht zeigen…" | Bento, 3 Videos | 3 Vorschaubilder (JPG) | `Zum YouTube-Kanal` | Kanalkategorien: SEO & GEO Insights, Case Studies, Day in the Life, Agenturalltag, Teamevents, Behind the Scenes | `#f4f4f4`, `gap:120px` |
| 16 | Presse | `Renommierte Medien berichten über unsere Arbeit` | n/a | Karussell, 12 Screenshots | 12 Presse-Screenshots, 2 Varianten | n/a | Handelsblatt (3x), Wirtschaftsjournal (3x), Süddeutsche Zeitung (3x), Forbes (3x) | `#f4f4f4`, `padding:100px 0` (ohne seitliches Padding) |
| 17 | FAQ-Akkordeon | `Du hast noch Fragen?Wir haben die Antworten.` | n/a | Akkordeon, 5 Items | SVG Plus/Minus-Icons | n/a | n/a | 5 Fragen: "Warum SEO + KI?", "Wann sehe ich erste Ergebnisse?", "Was kostet SEO?", "Mein Angebot ist sehr speziell, klappt das trotzdem?", "SEO vs. bezahlte Werbung. Was ist besser?" Antworttexte sind **nicht im HTML** (nur Button + Icon, `aria-expanded="false"`) |
| 18 | Final-CTA | `Finde heraus, wie viel mehr Anfragen über Google und KI für dich möglich sind.` | "In unserer kostenlosen Potenzialanalyse zeigen wir dir, wie viele zusätzliche Anfragen du erhältst… Wenn wir sehen, dass sich diese Sichtbarkeit für dich messbar lohnt, entwickeln wir im Anschluss eine individuelle Strategie…" | Zentriert-schmal | n/a | `Termin buchen` (2x) | Eyebrow `Jetzt Potenzialanalyse sichern` | `max-width:1045px` |
| 19 | Footer | n/a | n/a | 5-Spalten-Grid + Logo/Social-Zeile | 8 SVG-Siegel | n/a | DSGVO, ready, WordPress Native Agency, German Web Award, SZ, Handelsblatt, Forbes | 3 SSR-Varianten (Desktop/Tablet/Phone) |

**Hero-Formel:**
- H1-Nutzenversprechen: 7 Wörter, Imperativ "Dominiere", Zielobjekt "Suchergebnisse von Google bis ChatGPT". Drei Inline-SVG-Icons sind in den H1-Text eingebettet (`width:46px`, `57px`, `49px`, `vertical-align:middle`, `top:-0.05em`).
- Subline: 45 Wörter, beginnt mit Ellipse "… und mach es deiner Zielgruppe dadurch unmöglich nicht zu kaufen."
- Anzahl CTAs: 2 (primär + sekundär)
- CTA-Labels: `Termin buchen` (primär, Hintergrund `rgb(122,127,173)`, `border-radius:6px`, `height:52px`, `padding:10.31px 16.15px`, `gap:12px`), `Fallstudien ansehen` (sekundär, "Dark"-Variante, 1px Rahmen `rgba(33,29,29,0.1)`)
- Trust-Signal im Hero: Eyebrow `DIE SEO AGENTUR AUS MÜNCHEN`, darunter Ticker mit Award-Karten, plus Text `100+ UNTERNEHMEN VERTRAUEN UNS`
- Medientyp: Foto (WebP 2880x2450 als Full-bleed-Hintergrund), kein Video im Hero
- Hero-Höhe: kein `min-h-screen`, `height:min-content` mit `padding:170px 0 100px` (Desktop/Mobile) bzw. `padding:170px 0 50px` (Tablet). Darüber liegt ein Verlauf-Overlay `.framer-cbk2js` mit `background:linear-gradient(#f5f5f500 58%, #f5f5f5 97%)`.

**CTA-Strategie (Startseite):**

| Label wörtlich | Vorkommen im Hero | Vorkommen in den uebrigen Sektionen | Ziel |
|---|---|---|---|
| `Termin` (Nav-CTA) | 1 | 0 | `/termin/` |
| `Termin buchen` | 1 | 8 | `/termin/` |
| `Fallstudien ansehen` | 1 | 6 | `./cases` |
| `Mehr erfahren` (Ticker-Karten) | 10 | 0 | verschiedene Cases und News |
| `Fallstudie lesen` | 0 | 6 | `./cases/haubner-group-immobilien`, `./cases/seniocon`, `./cases/gastrorocket` |
| `Mehr zu SEO erfahren` | 0 | 3 | `./seo` |
| `Mehr zu GEO erfahren` | 0 | 3 | `./geo` |
| `Mehr zu Websites erfahren` | 0 | 3 | `./websites` |
| `Jetzt herunterladen` | 0 | 2 | Report-Funnel |
| `Alle News ansehen` | 0 | 1 | `./news` |
| `Zum YouTube-Kanal` | 0 | 1 | `https://www.youtube.com/@seo-labs` |
| `Jetzt KI-Zusammenfassung von SEOLabs erhalten` | 0 | 3 | `https://chatgpt.com/?q=…` |

Zählweise: exakte Textknoten in der ersten (Desktop-)SSR-Variante. Die uebrigen Sektionen liegen in 3 Breakpoint-Varianten vor, deshalb sind die Rohzahlen im HTML höher. Die Label-Häufigkeiten der Sektionen sind identisch in allen 3 Varianten.

Sticky-Header-CTA: **ja** (`Termin`, Label im fixed Pill). Telefonnummer im Header: **nein**. Alle primären CTAs laufen auf denselben Funnel `/termin/`.

**Trust-Staffelung:** (1) Hero: Award-Eyebrow + Ticker mit German-Web-Award-Karte. (2) Intro: `100+ UNTERNEHMEN VERTRAUEN UNS`. (3) Cases: konkrete Zahlen (10.000+ Besucher, 300+ Anfragen). (4) About: `+100 Kunden`, `+20 Mio Besucher`, `+50.000 Anfragen`. (5) Presse: 4 Medienlogos x3. (6) Footer: DSGVO, ready, WordPress Native Agency, Award-Siegel.

**Funnel/Formular:** Kein eigenes Formular auf der Startseite. Der Final-CTA verlinkt auf `/termin`, dort Calendly-Inline-Widget. Microcopy auf `/termin`: `Kostenlos & unverbindlich`.

**Footer:** siehe Abschnitt "Footer" oben.

---

### 2. Leistungsseite `/seo`

- Title: `SEOLabs GmbH | Tim & Robin Koppelmann | Für das beste SEO der Welt` (identisch mit Startseite)
- Meta-Description: identisch mit Startseite
- H1 (2 Vorkommen): `Der Sichtbarste bei Google. Egal, wann und wo dein Angebot recherchiert wird` und `Passt du dich der neuen Google-KI an, dankt sie es dir mit Anfragen`
- H2: 12 · H3: 8 · Schema.org: keine · Canonical: `https://www.seo-labs.de/seo`
- 599.189 Bytes · 64 `<img>`, davon 31 `loading="lazy"`

**Sektionsliste:**

| Nr | Sektionstyp | Headline wörtlich | Layout-Familie | CTA-Labels | Trust-Elemente |
|---|---|---|---|---|---|
| 1 | Nav | n/a | Pill | `Termin` | n/a |
| 2 | Hero | `Der Sichtbarste bei Google. Egal, wann und wo dein Angebot recherchiert wird` | Full-bleed, zentriert | `Termin buchen` (2x) · `Fallstudien ansehen` (2x) | ProvenExpert-Sterne, `5,0`, `48+ Bewertungen`, Kundenbild-Leiste, Video |
| 3 | Intro | `100+ regionale Unternehmen empfehlen uns` | Zentriert-schmal | n/a | n/a |
| 4 | Bento Leistungen | `Ganzheitliches SEO, das planbar Anfragen generiert` | Bento, 5 nummerierte Karten | n/a | Eyebrow `SEO LEISTUNGEN` |
| 5 | Bento 2 | `Passt du dich der neuen Google-KI an, dankt sie es dir mit Anfragen` | Bento | n/a | `DIE VORTEILE AUF EINEN BLICK` |
| 6 | Bento-Karten | "Gefunden werden, bevor andere sichtbar sind" / "Als Empfehlung ausgesprochen werden" / "Deine Website bringt dir Anfragen auf Autopilot" / "Dein Unternehmen als Platzhirsch in der Region" | Bento, 4 Karten | n/a | n/a |
| 7 | Cases | `So wurden Unternehmen in verschiedenen Branchen zum Marktführer` | 3er-Grid Karussell | `Fallstudie lesen` (je) · `Fallstudien ansehen` | 3 KPI-Karten |
| 8 | Testimonials | `Das sagen unsere Kunden` | Carousel | n/a | Robin Ostermann, FUX&HAS |
| 9 | Hero 2 | `Sichtbar – egal, wo und wie deine Kunden "googeln"` | Full-bleed | `Termin buchen` · `Fallstudien ansehen` | n/a |
| 10 | Bento-Karten | `Klassiche Google Suche` / `ChatGPT & Co` / `Google MyBusiness & Maps` / `Antwortposition` / `Vertrauenssignale` | Bento, 5 Karten | n/a | n/a |
| 11 | Prozess-Timeline | `In 5 Schritten zur Omnipräsenz auf Google` | Timeline mit 5 Steps | n/a | Nummerierung 01–05 |
| 12 | Tool-Stack | `Wir arbeiten mit den besten Tools am Markt` | Marquee, 12 Logos | n/a | Sistrix, Semrush, GSC, Perspective, Ahrefs, Hostinger, Google Analytics, Funnel Marketing Data, FINSEO, WordPress Dev Agency, Webflow Dev Agency |
| 13 | Final-CTA | `Finde heraus, wie viel mehr Anfragen über Google und KI für dich möglich sind.` | Zentriert | `Termin buchen` (2x) | n/a |

Bento-Leistungen im Detail: `Leistung 01 OnPage SEO – Technische Basis`, `Leistung 02 OffPage SEO – Externe Signale`, `Leistung 03 PR & Linkbuilding`, `Leistung 04 Redaktioneller Content`, `Leistung 05 Conversion Optimierung`.

---

### 3. Leistungsseite `/geo`

- Title und Meta-Description identisch mit Startseite
- H1: `Täglich von ChatGPT & Co empfohlen werden und wie von selbst 30-40 % mehr Kundenanfragen erhalten` (16 Wörter, längster H1 der Site)
- H2: 14 · H3: 8 · Schema.org: keine · Canonical: `https://www.seo-labs.de/geo`
- 609.906 Bytes · 64 `<img>`, 16 lazy

**Sektionsliste:**

| Nr | Sektionstyp | Headline wörtlich | Layout | CTAs | Trust |
|---|---|---|---|---|---|
| 1 | Nav | n/a | Pill | `Termin` | n/a |
| 2 | Hero | `Täglich von ChatGPT & Co empfohlen werden und wie von selbst 30-40 % mehr Kundenanfragen erhalten` | Full-bleed | `Termin buchen` · `Fallstudien ansehen` | ProvenExpert, `5,0`, `48+ Bewertungen` |
| 3 | Intro | `100+ regionale Unternehmen empfehlen uns` | Zentriert | n/a | n/a |
| 4 | Bento | `KI SEO, das dich zur ersten Empfehlung in KI-Antworten macht` | Bento | n/a | n/a |
| 5 | Cases | `So wurden Unternehmen in verschiedenen Branchen zum Marktführer` | 3er-Grid | `Fallstudie lesen` | 3 KPIs |
| 6 | Testimonials | `Das sagen unsere Kunden` | Carousel | n/a | FUX&HAS |
| 7 | Bento | `Wenn dich die KI empfiehlt, wirst du automatisch zum ersten Ansprechpartner` | Bento | n/a | n/a |
| 8 | Features | `Sichtbar in allen KI-Systemen, die Anfragen bringen` | 4er-Grid | n/a | Direkte Empfehlungen, Zitierungen & Quellenangaben, Inhalte in Antworten, Langfristige Präsenz |
| 9 | AI-Systeme | `Vergleichs-Sichtbarkeit` | Karten-Grid | n/a | n/a |
| 10 | Timeline | `In 5 Schritten zur Omnipräsenz in ChatGPT, Claude & Co.` | Timeline | n/a | 01 Analyse, 02 GEO-Fundament, 03 Content, 04 Autorität, 05 Optimieren |
| 11 | Tool-Stack | `Wir arbeiten mit den besten Tools am Markt` | Marquee | n/a | 12 Tools |
| 12 | Final-CTA | `Finde heraus, wie viel mehr Anfragen über Google und KI für dich möglich sind.` | Zentriert | `Termin buchen` | n/a |

---

### 4. Produktseite `/websites`

- Title/Meta-Description identisch mit Startseite
- H1: `Die erste Website, die deinen SEO-Traffic systematisiert in Anfragen verwandelt`
- H2: 16 · H4: 12 (Website-Cases als H4) · Schema.org: keine · Canonical: `https://www.seo-labs.de/websites`
- 690.466 Bytes · 51 `<img>`, 30 lazy

**Sektionsliste:**

| Nr | Sektionstyp | Headline wörtlich | Layout | CTAs | Trust |
|---|---|---|---|---|---|
| 1 | Nav | n/a | Pill | `Termin` | n/a |
| 2 | Hero | `Die erste Website, die deinen SEO-Traffic systematisiert in Anfragen verwandelt` | Full-bleed | `Termin buchen` · `Fallstudien ansehen` | `100+ regionale Unternehmen empfehlen uns` |
| 3 | Ankündigung | `Wir sind German Web Awards Winner 2026` | Karten-Banner | `Termin buchen` · `Fallstudien ansehen` | "8,3 Punkten", Siegel "Best Agencies" |
| 4 | Problem | `Der am teuersten unterschätzte Hebel in deiner SEO‑Strategie` | 2-Spalten | n/a | n/a |
| 5 | Vorher/Nachher | `Bei welchen Websites würdest du eher anfragen?` | Karussell-Vergleich | n/a | 6 Website-Paare (H4-Namen) |
| 6 | Update | `Neuestes Update: Makler-Websites - Automatischer Immobilienimport im Top-Design` | 2-Spalten | `Termin buchen` · `Fallstudien ansehen` | n/a |
| 7 | Bento | `Warum generieren unsere Kunden-Websites im Durchschnitt 20–30 % mehr Anfragen als andere?` | Bento | n/a | n/a |
| 8 | Cases | Website-Cases | Karten-Grid (68 KB) | n/a | H4-Namen der 6 Kundenprojekte |
| 9 | Testimonials | `Das sagen unsere Kunden` | Carousel | n/a | FUX&HAS |
| 10 | Profit | `In diesen Bereichen profitieren unsere Kunden` | 6er-Grid | n/a | Anfragen, Vertrauen, Preisverhandlungen, Vertriebszyklen, Stolz, Zukunft |
| 11 | Timeline | `In 5 Schritten zur Omnipräsenz in ChatGPT, Claude & Co.` | Timeline | n/a | 01 Onboarding, 02 SEO-Kickoff, 03 Konzept/Design, 04 Entwicklung, 05 Launch/Wartung |
| 12 | Vergleichstabelle | `So beschleunigt eine SEO‑Conversion‑Website deinen Erfolg` | Tabelle | n/a | 3 Branchen x 2 Varianten mit Umsatzrechnung |
| 13 | Tool-Stack | `Wir arbeiten mit den besten Tools am Markt` | Marquee | n/a | 12 Tools |
| 14 | Final-CTA | `Finde heraus, wie viel mehr Anfragen über Google und KI für dich möglich sind.` | Zentriert | `Termin buchen` | n/a |

**Vergleichstabelle wörtlich (Spalten: Beispiel, Traffic monatlich, Conversion Rate, Anfragen pro Monat, Abschluss Quote, Neukunden pro Monat, Umsatz pro Monat):**

| Beispiel | Traffic | Conv. | Anfragen | Abschluss | Neukunden | Umsatz | Faktor |
|---|---|---|---|---|---|---|---|
| Immobilienmakler nur SEO | 2.500 | 1,2 % | 30 | 30 % | 9 | 27.000 € | n/a |
| Immobilienmakler SEO + verkaufsstarke Website | 2.500 | 3,5 % | 88 | 40 % | 35 | 105.000 € | × 3,9 |
| Badsanierer nur SEO | 1.800 | 0,9 % | 16 | 35 % | 6 | 36.000 € | n/a |
| Badsanierer SEO + verkaufsstarke Website | 1.800 | 2,8 % | 50 | 45 % | 22 | 132.000 € | × 3,7 |
| Steuerkanzlei nur SEO | 1.200 | 1,0 % | 12 | 40 % | 5 | 25.000 € | n/a |
| Steuerkanzlei SEO + verkaufsstarke Website | 1.200 | 3,0 % | 36 | 55 % | 20 | 100.000 € | × 4,0 |

Legende: `Nur SEO – ohne optimierte Website` / `SEO + verkaufsstarke Website von SEOLabs`.

---

### 5. Über uns `/ueber-uns`

- Title: `Über SEOLabs | Tim & Robin Koppelmann |`
- Meta-Description: `20 Millionen Website Besucher, 50.000 Anfragen, 16-köpfiges Performance Team - Das ist SEOLabs`
- H1: `Gemacht für das beste (KI-) SEO der Welt` · H2: 5 · H4: 4 · H3: 18 · Schema.org: keine
- Canonical: `https://www.seo-labs.de/ueber-uns` · 488.377 Bytes · 58 `<img>`, 4 lazy · rund 1.000 Wörter

**Sektionsliste:**

| Nr | Sektionstyp | Headline wörtlich | Layout | Medien | Trust |
|---|---|---|---|---|---|
| 1 | Nav | n/a | Pill | n/a | n/a |
| 2 | Hero mit Zähler | `Gemacht für das beste (KI-) SEO der Welt` | Zentriert | n/a | 3 Zähler-Animationen mit Roll-Digit-Effekt: `regionale Kunden`, `Webseitenbesucher generiert`, `Anfragen generiert` |
| 3 | Werte | `Dafür stehen wir` | 4er-Grid | n/a | 01 Transparenz, 02 Ergebnisqualität, 03 Messbarkeit, 04 Zukunftsorientierung |
| 4 | Bürotour | `Unsere Bürotour` | 2-Spalten mit rotierten Labels | Bürofotos, Labels `Direkt Lage am englischen Garten`, `Komplett renoviertes Altbau-Gebäude` | Eyebrow `AM ENGLISCHEN GARTEN` |
| 5 | Team | `Das SEOLabs Team` | 4 Gruppen-Grids mit Personenkarten | Fotos | Gruppen: `Geschäftsführung & Projektmanagement`, `Redaktion`, `Webdesign & Webdevelopment`, `Feel-Good-Department`. 17 Personen benannt + 2 "Du?"-Karten mit CTA "Jezt für Redaktion bewerben" / "Jezt für Webdevelopment bewerben" |
| 6 | Timeline | `Unsere Geschichte` | Vertikale Timeline, 14 Stationen | Fotos | Eyebrow `SEOLABS HISTORIE`; März 2024 bis Mai 2026 |
| 7 | Final-CTA | `Finde heraus, wie viel mehr Anfragen über Google und KI für dich möglich sind.` | Zentriert | n/a | n/a |

**Zähler-Anzeige im HTML:** Die Ziffern sind als Rollstreifen mit allen Ziffern `0 1 2 3 4 5 0 0 0 0` bzw. `+ 0 1 0 0` gerendert, dazu die statischen Labels.

---

### 6. Funnel `/termin`

- Title: `SEOLabs | Termin buchen | Tim & Robin Koppelmann |`
- Meta-Description: `Jetzt kostenfreie Potenzialanalyse für 20-40 Kundenanfragen im Monat erhalten`
- H1: `Deine SEO Potenzialanalyse` (3 Wörter, kürzester H1) · H2: 0 · H3: 0 · Schema.org: keine
- Canonical: `https://www.seo-labs.de/termin` · 299.802 Bytes · 6 `<img>`, 4 lazy

**Funnel/Formular:**

| Element | Beobachtung |
|---|---|
| Schritte | **Kein Multi-Step-Formular.** Der Funnel ist ein Single-Step-Terminbuchung (Calendly Inline Widget) |
| Embed | `Calendly.initInlineWidget({url:'https://calendly.com/tim-k-ogtg/vorgesprach-fur-deine-seo-potenzialanalyse-klon-1?hide_event_type_details=1&hide_gdpr_banner=1'})`, Container `#calendly-embed`, `min-width:320px;width:100%;height:700px` |
| Zweites Embed | Cal.com Inline (`app.cal.com/embed/embed.js`, Namespace `15min`, `layout:"month_view"`, `useSlotsViewOnSmallScreen:true`), Container `#my-cal-inline-15min` |
| Höhen-Sync | `ResizeObserver` + `postMessage({embedHeight:height})` |
| Fragetypen | keine (Kalender-Picker), keine Fortschrittsanzeige, keine persönlichen Daten im Site-eigenen Markup |
| Microcopy | Eyebrow `Kostenlos & unverbindlich` (wörtlich) |
| Nutzenargumente links | `Datenbasierte Analyse` ("Sieh genau, wie viele Anfragen dir jeden Tag entgehen – und warum"), `Schnell & effektiv` ("Erhalte in nur 48 Stunden klare Handlungsempfehlungen für messbar mehr Anfragen"), `Konkreter Maßnahmenplan` ("Praxiserprobt in über 50 Projekten und individuell für dein Unternehmen aufbereitet") |
| Trust im Funnel | `100+ Unternehmen VERTRAUEN UNS`, Foto `Mit Tim Koppelmann` |
| Subline unter H1 | `Für mehr Kundenanfragen über deine Website – kostenlos und unverbindlich.` (im zweiten SSR-Durchlauf identisch mit Bindestrich statt Gedankenstrich) |

Layout: `Desktop/Tablet` mit `Left` (Argumente) und `Right` (Kalender), kein Footer-CTA (Footer ist der Standard-Footer).

---

### 7. Referenzen `/cases`

- Title: `SEOLabs` (Platzhalter, 7 Zeichen) · Meta-Description: `SEOLabs` (Platzhalter)
- H1: `Ergebnisse, die für sich sprechen` · H2: 4 · Schema.org: keine
- Canonical: `https://www.seo-labs.de/cases` · 926.305 Bytes · 81 `<img>`, 3 lazy
- Subline: `Echte Zahlen, echte Kunden. Entdecke, wie wir Unternehmen zur digitalen Sichtbarkeit verholfen haben.`
- CTAs: `Termin buchen` (2x) · Trust: `5,0 48+ Bewertungen`

**Karten-Struktur (19 Karten, jede mit):** Leistungs-Badges (SEO, GEO, Webdesign, GMB-Optimierung, PR & Linkbuilding), Branchen-Badge (z.B. `Immobilienmakler`), Kundennamen-H3, 3 KPIs, Link `./cases/<slug>`.

Beispiel HAUBNER GROUP: `+3.233%` `Traffic-Steigerung` · `1.000+` `Seite 1 Rankings` · `300+` `Leads pro Monat`.

Keine Filter-Tabs, kein Kategorie-Umschalter im Markup (`data-framer-name` enthält nur `Desktop`, `Tablet`, `Phone`).

---

### 8. Branchen-Landingpage `/immobilienmakler`

- Title/Meta-Description identisch mit Startseite (kein branchenspezifischer Title)
- H1: `Wie du mind. 4 zusätzliche Alleinaufträge pro Monat gewinnst` (9 Wörter)
- H2: 11 · H4: 3 · Schema.org: keine · Canonical: `https://www.seo-labs.de/immobilienmakler`
- 483.344 Bytes · 50 `<img>`, 23 lazy

**Sektionsliste:**

| Nr | Sektionstyp | Headline wörtlich | Layout | CTAs | Trust |
|---|---|---|---|---|---|
| 1 | Nav | n/a | Pill | `Termin` | n/a |
| 2 | Hero | `Wie du mind. 4 zusätzliche Alleinaufträge pro Monat gewinnst` | Full-bleed | `Termin buchen` · `Fallstudien ansehen` | n/a |
| 3 | Marktverschiebung | `Nie haben sich Marktanteile von Immobilienmaklern schneller verschoben als heute` | 3 nummerierte Punkte | n/a | Eyebrow `Die Marktverschiebung` |
| 4 | Methode | `Löst die Herausforderungen von Immobilienmaklern` | 3er-Grid | n/a | Eyebrow `Die AI-Immo-Methode`; Badge `+5–6 Alleinaufträge pro Monat` |
| 5 | Bento | `4 Bestandteile, die dich zum regionalen Marktführer katapultieren` | Bento | n/a | n/a |
| 6 | Über uns | `Gemacht für das beste SEO der Welt` | 2-Spalten | `Termin buchen` · `Fallstudien ansehen` | `100+` / `20 Mio` / `50.000` Zähler |
| 7 | Testimonials | `Das sagen unsere Kunden` | Carousel | n/a | n/a |
| 8 | Garantie | `Kein Werbebudget. Garantierte Ergebnisse. Stell dir vor, wir gehen zusätzlich noch in Vorleistung …` | 2-Spalten | `Potenzialanalyse` | Schriftliche Ergebnisgarantie mit Geld-zurück |
| 9 | Update | `Neuestes Update: Makler-Websites - Automatischer Immobilienimport im Top-Design` | 2-Spalten | `Potenzialanalyse` | n/a |
| 10 | Werte | (SEOLabs Values Section – Light) | Grid | n/a | n/a |
| 11 | Final-CTA | `Finde heraus, wie viel mehr Anfragen über Google und KI für dich möglich sind.` | Zentriert | `Termin buchen` | n/a |

Die Seite hat **einen eigenen CTA-Label-Typ**: `Potenzialanalyse` (statt `Termin buchen`) bei den mid-page CTAs.

---

### 9. Ratgeber-Übersicht `/news`

- Title: `SEOLabs` (Platzhalter) · Meta-Description: `SEOLabs` (Platzhalter)
- **H1: 0** (kein H1 auf der Seite) · H2: 2 · H4: 5 · Schema.org: keine
- Canonical: `https://www.seo-labs.de/news` · 388.265 Bytes · 24 `<img>`, 3 lazy
- H2: `News aus dem SEOLabs Headquarter` · Trust: `5,0 48+ Bewertungen`, `100+ Partner & Marktführer vertrauen uns`, Eyebrow `DIE SCHNELLSTWACHSENDE SEO-AGENTUR IN DACH`
- 5 Karten, jede mit Kategorie-Label + Versionsnummer + Datum: `Blog Milestone v1.0.0 Mai 2026` · `Blog Milestone v1.0.4 Mai 2026` · `Blog Milestone v1.0.3 Mai 2026` · `Teamevent v1.0.2 Dezember 2026` · `Teamevent v1.0.0 September 2026`
- CTA: `Alle News ansehen` · Final-CTA: `Termin buchen` · `Fallstudien ansehen`
- 2 SSR-Varianten mit identischem Kartenblock

---

### 10. Ratgeber-Artikel `/news/ki-overviews`

- Title: `KI-Overviews bei Google: Ende von SEO - oder Chance?` · Meta-Description: `Alle reden von Traffic-Verlust. Keiner redet davon, was passiert, wenn du jetzt richtig handelst. Dieser Artikel ist fuer KMU-Inhaber, die keine Zeit fuer Panikmache haben - sondern Klarheit brauchen.`
- H1: `KI-Overviews bei Google: Ende von SEO - oder Chance?` · H2: 1 · H3: 6 · Schema.org: **keine** (kein `Article`, kein `FAQPage`, kein `BreadcrumbList`)
- Canonical: `https://www.seo-labs.de/news/ki-overviews` · 328.182 Bytes · 6 `<img>`, 3 lazy
- **Textlänge: 1.017 Wörter** (kompletter Body inkl. Nav/Footer)
- Datum: `23. Mai 2026`, gerendert per Inline-Script `window.__framer_formatRelativeDate(new Date(1779542297235), new Date(), "auto", "long", "auto", true, "de")`
- Teilen-Button: `Teilen` (1x)

**Artikel-Aufbau:**

| Element | Vorhanden? | Beleg |
|---|---|---|
| Inhaltsverzeichnis | **nein** | keine `<nav>` oder Anchor-Liste im Artikel |
| Autor-Box | **nein** | kein Autor-Name, kein LinkedIn-Link im Artikel-Markup |
| Lesezeit | **nein** | kein "X Min. Lesezeit" |
| Datum | ja | `23. Mai 2026` |
| Key-Takeaways-Box | teilweise | Statistik-Trio als Zahlenblock: `17% der deutschen Keywords zeigen AI Overviews`, `7% AI-Overview-Präsenz bei lokalen Dienstleistungssuchen`, `70% Overview-Präsenz im B2B-Tech-Bereich` |
| Zwischen-CTAs | **nein** | nur der Seiten-Final-CTA am Artikelende |
| Verwandte Artikel | **nein** | keine Links zu anderen News-Artikeln im Artikel-Body |
| FAQ | **nein** | n/a |
| Pull-Quote | ja | `"Weniger Klicks bedeuten nicht automatisch weniger Kunden. Das ist der Denkfehler, den gerade viele begehen."` |
| Anzahl Bilder | 6 | 3 lazy |
| Interne Links | nur Nav + Footer + Final-CTA (`Termin buchen`) |

**H3-Gliederung wörtlich:** `Ja, die Klickraten sinken. Aber nicht so, wie du denkst.` · `Die Kehrseite, die niemand zeigt: AI-Traffic konvertiert besser` · `Wer wirklich aufpassen muss` · `Die größte Chance: Als Quelle zitiert werden` · `Was das konkret bedeutet` · `Was das für dich als KMU bedeutet`

---

### 11. Case Study `/cases/ccg-gutachten`

- Title: `Innerhalb von 6 Monaten auf von 0 auf 1.937 Klicks monatlich und Marktführer in Stuttgart`
- Meta-Description: `Wie wir einen Immobiliengutachter von geringer Online-Präsenz zu nachhaltiger Sichtbarkeit entwickelt und eine kontinuierliche, organische Traffic-Quelle über Google aufgebaut haben.`
- H1: identisch mit Title · H2: 14 · H3: 1 · H4: 5 · Schema.org: keine
- Canonical: `https://www.seo-labs.de/cases/ccg-gutachten` · 459.881 Bytes · 33 `<img>`, **0 lazy**
- Textlänge: 932 Wörter

**Sektionsliste:**

| Nr | Sektionstyp | Headline wörtlich | Layout | CTAs |
|---|---|---|---|---|
| 1 | Nav + Kategorie-Leiste | n/a | Pill + Badge-Reihe | n/a |
| 2 | Case-Header | `Innerhalb von 6 Monaten auf von 0 auf 1.937 Klicks monatlich und Marktführer in Stuttgart` | Full-bleed, zentriert | `Termin buchen` (2x) |
| 3 | Projekt-Steckbrief | n/a | Key-Value-Zeile: `Projekt CCG-Gutachten GmbH` · `Branche Immobiliengutachter` · `Standort Süddeutschland` · `Zeitraum 12 Monate` | n/a |
| 4 | Ausgangslage + Umsetzung | n/a | 3 Fließtext-Absätze | n/a |
| 5 | Ergebnis | `Das Ergebnis` | Fließtext | Eyebrow `Das Ergebnis` |
| 6 | Leistungs-Grid | `Was wir umgesetzt haben` | 5er-Grid H4 | SEO · GEO · Webdesign · GMB-Optimierung · PR & Linkbuilding |
| 7 | KPI-Grid | `Die Zahlen sprechen für sich` | 2 Cluster | Eyebrow `Ergebnisse` |
| 8 | Sichtbarkeitsindex | `Sistrix Sichtbarkeitsindex Vorher & Nachher` | 2-Spalten-Vergleich | Labels `01 — Vorher`, `02 — NACHHER` |
| 9 | Testimonial | `Wir lassen unseren Kunden sprechen` | Zitat-Block | Eyebrow `Proof` und `TESTIMONIAL` |
| 10 | Testimonials allgemein | `Das sagen unsere Kunden` | Carousel | n/a |
| 11 | Final-CTA | `Finde heraus, wie viel mehr Anfragen über Google und KI für dich möglich sind.` | Zentriert | `Termin buchen` (2x) |
| 12 | Footer | n/a | 5-Spalten | n/a |

**KPI-Werte wörtlich, geclustert:**

`SEO/GEO KPI`: `105.659+ Impressionen pro Monat` · `1.937+ Klicks pro Monat` · `43+ Top 3 Rankings` · `1.300+ Keywords` · `2.600 €+ Traffic-Wert` · `110+ AI Citations`

`HARD KPI`: `20+ Leads pro Monat` · `15+ Anrufe` · `3% Conversion Rate`

Hero-Badge: `+1.209% Traffic-Steigerung` · `325+ Seite 1 Rankings`

Kundenzitat wörtlich: `"Ich hatte eine Website, aber online war ich schlicht nicht existent. Was mich überzeugt hat: Es wurde nicht einfach eine neue Seite gebaut, sondern von Anfang an alles auf SEO ausgerichtet. Heute kommen konstant qualifizierte Anfragen über Google – und das Beste daran ist die Planbarkeit. Ich weiß, dass jeden Monat Aufträge reinkommen. Der ROI hat sich nach wenigen Monaten eingestellt und wächst seitdem weiter." Cristobal Cuadra Garcia, Geschäftsführer, CCG-Gutachten GmbH`

Namenszeile unter dem Zitat: `CCG-Gutachten GmbH`

---

## Design-System

Basis: 195.016 Zeichen CSS aus 10 Inline-`<style>`-Blöcken der Startseite (`home-inline.css`). Keine externen `<link rel=stylesheet>`-Dateien.

### Fonts

**Custom-Fonts (Framer Assets, `font-display:swap`):**

| CSS-Familie | Datei | Gewicht deklariert |
|---|---|---|
| `"Gilroy-SemiBold ☞"` | `OIEBC0wsutokKwDYd4Np00WEdt0.woff2` | 400 |
| `"Gilroy-Medium ☞"` | `sGBzT1G1Uc92kCPkJG0NGwRkUOw.woff2` | 400 |
| `"Gilroy-Regular ☞"` | `LJI1i2jdQlbm0Nf0iQJSy3Q4s.woff2` | 400 |
| `"Gilroy-Regular Regular"` | `GrFLRQ6Y4yPNJjdepQ5RInBWYU.woff2` | 400 |
| `"Gilroy-Light Regular"` | `SzgSUKjnu0MTo5P2kCxOVnN7Zc.woff2` | 400 |
| `"Gilroy-Medium Regular"` | `h6LVAoR0NeAVd0fjB7Y84IM6fo.woff2` | 400 |

**Inter** als Zweitschrift: 2 Gewichte (400, 700) in je 7 `unicode-range`-Subsets, plus Subsets für 900 und Kursiv in `b8Kb18Obx`. Vollständiger Stack: `"Gilroy-SemiBold ☞", "Gilroy-SemiBold ☞ Placeholder", sans-serif`.

Zusätzlich: `'Playfair Display'` in 4 Deklarationen (vermutlich Zitat-/Akzentnutzung).

**Google-Fonts-Link:** nur `preconnect` auf `fonts.gstatic.com`, kein Stylesheet-Link. Schriften kommen über Framer.

**Display vs. Body:**
- Display: **Gilroy-SemiBold** (H1, H2, H3, H4), `letter-spacing:-.05em`, `line-height:1.2em`
- Body: **Gilroy-Regular**, `font-size:18px` (Desktop) → `16px` (Tablet und Mobile), `letter-spacing:-.015em`, `line-height:1.7em`, Farbe `#211d1dbf`
- Button-/Eyebrow-Font: **Gilroy-Medium**, `font-size:16px`, `line-height:1em`, `letter-spacing:0em`
- Eyebrow/Tagline: **Gilroy-Regular**, `font-size:12px`, `letter-spacing:.32em`, `line-height:1em`
- Nav-Overlay-Kategorie-Label: `font-size:12px`, `letter-spacing:0.35em`, uppercase

### Farben

**CSS-Custom-Properties (Framer-Tokens, aufgelöst):**

| Token | Wert | Rolle |
|---|---|---|
| `--token-205a9d56-…` und `--token-017770bf-…` | `#7a7fad` | **Akzent**: Primaerbutton-Hintergrund, Badge-Border |
| `--token-94cb5cf7-…` | `#211d1d` | Textfarbe hell-Modus, dunkle Sektions-Hintergruende |
| `--token-74158509-…` | `#f4f4f4` | Seiten-Hintergrund |
| `--token-7915ccba-…` | `#f4f4f480` | Sekundaertext |
| `--token-b5e5e04c-…` | `#f4f4f4bf` | Sekundaertext auf dunkel |
| `--token-4047dc19-…` | `#f4f4f440` | dekorativ |
| `--token-460b74a7-…` / `--token-f9d48080-…` | `#211d1dbf` | Body-Text |
| `--token-42aabfbc-…` | `#211d1d80` | Sekundaertext dunkel |
| `--token-276a2e54-…` | `#211d1d40` | Border |
| `--token-9baa3aa2-…` | `#dfdfff` | heller Akzent |
| `--token-ae4b2688-…` | `#1ab467` | Erfolg/Gruen |
| `--token-cf42943b-…` | `#f5f5f7` | Neutral |
| `--token-d4542f02-…` | `#86868b` | Neutral |
| `--token-bf3890a7-…` | `#0b0c11` | fast-schwarz |

**Die 10 häufigsten Farbwerte im CSS (literal):**

| Nr | Wert | Häufigkeit | Rolle |
|---|---|---|---|
| 1 | `#000` | 37 | Default-Reset, Icons |
| 2 | `#f4f4f4` | 21 | Seitenhintergrund |
| 3 | `#211d1d` | 17 | Textfarbe, dunkle Sektion |
| 4 | `#f4f4f480` | 11 | Sekundaertext |
| 5 | `#7a7fad` | 5 | **Akzent** (Buttons) |
| 6 | `#211d1dbf` | 5 | Body-Text |
| 7 | `#f4f4f4bf` | 4 | Sekundaertext dunkel |
| 8 | `#0000` | 4 | transparent |
| 9 | `#211d1d00` | 3 | transparent |
| 10 | `#09f` | 3 | Link-Text (`--framer-link-text-color:#09f`) |

Sektions-Hintergruende: `#f4f4f4` (YouTube, Presse), `#f6f6f6` (About Us, Steps, Report), `#211d1d` (Leistungen, Cases, Benefits, Timeline, Report, FAQ-Umfeld).

### Radius

| Wert | Häufigkeit | Verwendung |
|---|---|---|
| `999px` | 9 | Pills, runde Kreise (FAQ-Plus-Button `72x72`, Nav-Icon-Kreise `36x36`) |
| `20px` | 5 | Karten |
| `6px` | 3 | **Primaerbutton** (`border-radius:6px` inline am CTA) |
| `24px` | 2 | Karten |
| `16px` | 2 | Karten |
| `12px` | 1 | Nav-Pill, Nav-Karten, Teilen-Button |
| `8px` | n/a | Nav-CTA `Termin` (inline) |
| `3px`, `5px`, `11px`, `60px` | je 1-2 | Details |

Buttons sind **eckig mit 6px Radius**, nicht pill. Pill-Form nur für Nav-CTA (`8px`, kompakt) und Kreiselemente (`999px`).

### Shadows

**Keine `box-shadow`-Deklaration im gesamten Inline-CSS der Startseite.** Kein Treffer bei `grep -oE 'box-shadow:[^;}]*'`. Tiefe entsteht ausschließlich über Farbflächen, 1px-Rahmen (`rgba(33,29,29,0.15)`, `rgba(255,255,255,0.1)`) und Hover-`boxShadow` aus JS: `0px 0px 0px 2px rgb(255, 255, 255)` (YouTube-Bild-Hover).

### Spacing/Container

| Element | Wert |
|---|---|
| Content-Container | `max-width:1045px` (Final-CTA, Text-Wrapper), `max-width:900px` (H1), `max-width:650px` (Subline/Paragraph), `max-width:1280px` (11x im Preset-CSS) |
| H1-Container | `max-width:900px` Desktop → `max-width:700px` Tablet |
| Sektions-Padding Desktop | `100px 20px` (Standard), `170px 0 100px` (Hero), `50px 20px 100px` (Cases), `100px 0` (Presse), `100px 20px 50px` (YouTube/About) |
| Sektions-Padding Mobile | `50px 20px`, `50px 0`, `170px 0 50px` |
| Sektions-Gap | `151px` (Intro, News), `120px` (YouTube), `110px` (Steps), `80px` (Leistungen, Benefits, Testimonial, Presse), `48px` (Mobile-Variante), `32px` (Hero-Text-Wrapper), `0` (Cases) |
| Grid-Gap Nav-Overlay | `16px` |
| Button-Gap | `12px` (CTA-Icon-Abstand), `20px` (CTA-Gruppe), `10px` (kleine Buttons), `13px` (Sekundaerbutton) |

**Breakpoints** (aus `data-framer-hydrate-v2` und Media-Queries):
- `(min-width:1200px)` → Hash `72rtr7` (Desktop)
- `(min-width:810px) and (max-width:1199.98px)` → Hash `17vay9h` (Tablet)
- `(max-width:809.98px)` → Hash `devh3d` (Phone)
- Zusaetzliche Preset-Queries: `(max-width:809px) and (min-width:0)` (13x), `(max-width:1199px) and (min-width:810px)` (13x)

### Typo-Skala

| Element | Desktop | Tablet | Mobile |
|---|---|---|---|
| H1 Startseite | 60px | 46px | 35px |
| H1 `/geo` | 60px | n/a | 30px |
| H1 `/seo` (zweiter H1) | 48px | n/a | n/a |
| H2 (Preset `1qzljkw`) | 48px | 32px | 26px |
| H2 (Preset `1gt9i4o`) | n/a | n/a | 30px |
| H4 (Preset `tnkenu`) | 32px/20px | n/a | n/a |
| Body (Preset `9kidbs`) | 18px | 16px | 16px |
| Button-Text (Preset `c0emky`) | 16px | n/a | n/a |
| Eyebrow/Tagline (`1hx2pk`) | 12px | 12px | 12px |
| FAQ-Frage | 24px | n/a | n/a |

Line-Heights: `1.2em` (22x, Headlines), `1.7em` (15x, Body), `1em` (3x, Buttons/Eyebrows).
Letter-Spacing: `-.05em` (Headlines, 15x), `-.015em` (Body, 15x), `-.03em` (3x), `.32em` (Eyebrows, 2x), `0em` (3x), `.35em` (Nav-Gruppen-Label).
**Kein `clamp()`** in der Typografie. Größen werden über Breakpoint-Presets geschaltet.

## Animationen

### Transitions im CSS (`transition:`-Deklarationen)

Nur **eine** Transition-Deklaration im gesamten Inline-CSS:

```css
transition:color .4s cubic-bezier(.44,0,.56,1)
```

Angewandt auf Link-Presets (`.framer-styles-preset-j3g0vm`): Link-Textfarbe wechselt von `#f4f4f480` auf `#f4f4f4`. Alle uebrigen Bewegung kommt aus JS (Framer Motion / Motion Library) und Inline-Styles.

Inline-Transitions in den Nav-Elementen (aus dem Nav-HTML):
- `transition:color 0.2s ease` (Label "Menü")
- `transition:filter 0.3s ease` (Logo)
- `transition:background-color 0.2s ease, border-color 0.2s ease` (Nav-CTA "Termin")

### `@keyframes`

**Nur 3 Vorkommen, alle identisch: `@keyframes rt-spin`** (Framer-interner Spinner). Keine site-eigenen Keyframes, keine Marquees per CSS-Animation.

### Motion-Libraries (aus HTML/JS)

| Library | Belegt? | Beleg |
|---|---|---|
| **Framer Motion / Motion** | ja | `motion.BGJYzJPV.mjs` in allen `modulepreload`-Listen, 151.422 Bytes |
| **Lenis Smooth Scroll** | ja | `<script src="https://unpkg.com/lenis@1.3.25/dist/lenis.min.js">` |
| **React 18** | ja | `react.5iWlVwDP.mjs` |
| Framer Ticker/Carousel/Timeline FX | ja | eigene Framer-Codes: `Counter_FX.CFgazsrg.mjs`, `SEO_Timeline.B_M0msrH.mjs`, `LogoSwitcher.ClfAneqg.mjs` |
| GSAP | nein | 0 Treffer |
| ScrollTrigger | nein | 0 Treffer |
| AOS | nein | 0 Treffer |
| Swiper / Splide | nein | 0 Treffer |
| Lottie / Rive | nein | 0 Treffer (`rive` 1 Treffer, im Text "driven") |
| Three.js | nein | 0 Treffer |
| Webflow | nein | 0 Treffer, `data-w-id` 0 Treffer |
| `data-framer-appear-id` | **0 Treffer** | kein Framer-Appear-System in Verwendung |

### Scroll-Reveal-Muster

**Kein klassenbasiertes Scroll-Reveal.** Keine `aos-init`, keine `fade-up`, keine `reveal`-Klassen. Kein `IntersectionObserver` im Site-Code (0 Treffer in `home.html`).

Stattdessen: **Framer-Loop-Effekte** per `__framer__loop*`-Attribute im hydrate-Payload:
- `__framer__loop:v n` (Endlosrotation des Conic-Gradient-Spinners, `rotate:360`)
- `__framer__loopRepeatType:'loop'`, `__framer__loopRepeatDelay:0`
- `__framer__loopPauseOffscreen:!0` (Loop pausiert ausserhalb des Viewports)

Der **Counter_FX** nutzt einen eigenen `IntersectionObserver` mit `{threshold:.2}` und `triggerMode`-Optionen `onAppear`, `sectionInView`, `onScroll`.

### Hover-Effekte

**Primaerbutton "Termin buchen" (`framer-17g83hv`):**
- Grundzustand: `backgroundColor:rgb(122,127,173)`, `border-radius:6px`, `height:52px`, `padding:10.31px 16.15px`, `gap:12px`, `overflow:hidden`
- Hover-Variante `JSrQklJUu-hover`: `backgroundColor: rgb(33, 29, 29)` (Wechsel von Akzent-Lavendel auf Schwarz), Transition `{bounce:.2, delay:0, duration:.4, type:'spring'}`
- **Pfeil-Stack-Animation:** zwei 12x11px-SVG-Pfeile in einem `overflow:hidden`-Container.
  - Grundzustand: `Arrow 1 {left:-13px}` (ausserhalb), `Arrow 2 {left:2px}` (sichtbar)
  - Hover: `Arrow 1 {left:2px}` (eingeschoben), `Arrow 2 {left:17px}` (herausgeschoben)
  - Effekt: Pfeil fliegt von links herein, alter Pfeil fliegt rechts hinaus

**Marquee-/Case-Karten (`framer-lux5qc`):**
- `whileHover` auf der Karte: `{opacity:1, scale:1.03, transition:{bounce:.2, delay:0, duration:.4, type:'spring'}}`
- `whileHover` auf dem Bild: `{scale:1.05, transition:{delay:0, duration:.4, ease:[.44,0,.56,1], type:'tween'}}`
- YouTube-Vorschaubilder: `whileHover` mit `boxShadow:'0px 0px 0px 2px rgb(255, 255, 255)', y:-10, scale:1, transition:{duration:.4, type:'spring', bounce:.2}`, plus statische Rotationen `rotate:-2`, `rotate:2` an zwei Karten

**Badge-Links:** `whileHover` setzt `backgroundColor: rgb(122,127,173)` (Akzent-Lavendel)

**Nav-Overlay:** Burger oeffnet Grid mit `transform:translateY(32px)` → `0` und `opacity:0` → `1` auf dem Panel

**Cookie-Banner:** `{scale:1, x:0, y:10, transition:{damping:60, delay:0, mass:1, stiffness:500, type:'spring'}}`

### Zähler-Animationen (Counter_FX)

- `triggerMode: onAppear | sectionInView | onScroll`
- `IntersectionObserver` mit `{threshold:.2}`
- Digit-Roll: Ziffern sind vertikal gestapelt, `animate:{y: -(sequence.length-1)*digitHeight}`
- Uebergaenge: `counter`-Modus `{delay:0, duration:<l>, ease:<b[d]>}`, Scroll-Modus `{duration:.08, ease:'linear'}`
- Easing-Map vollstaendig: `b={linear:'linear', smooth:[0,0,.2,1], spring:[.34,1.56,.64,1], bounce:[.22,1.8,.5,1]}`
- Hoehe/Breite: `digitHeight = fontSize*1.2`, `digitWidth = fontSize*.62`
- Maske: `maskImage:linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)`

### Marquees

- **Hero-Ticker:** `tickerEffectEnabled:true`, `tickerEffectVelocity:50`, `tickerEffectGap:10`, `tickerEffectAlign:'center'`, `tickerEffectDirectionModifier:'reverse'`, `tickerEffectHoverModifier:100`, `tickerEffectOverflow:'clip'`, `tickerEffectPosition:'absolute'`, `tickerEffectStackDirection:'row'`, `tickerEffectDraggable:false`
- **Tool-Stack-Marquee:** `tickerEffectGap:'100px'`, `tickerEffectVelocity:50`, `tickerEffectPosition:'relative'`, `tickerEffectAlign:'center'`
- Beide mit `border-radius:10px` auf den Karten und seitlichen Verlaufs-Masken (`linear-gradient(to right, rgba(255,255,255,0), transparent)`, Breite 30 %)

### Parallax / Sticky / Video

- **Sticky/Fixed:** Nav-Pill `position:fixed`, `z-index:9`. Kein `position:sticky` für Sektionen gefunden.
- **Parallax:** kein `translateY`-bei-Scroll auf Sektionsebene gefunden.
- **Video-Autoplay:** 5 Timelines-Videos und 3 Steps-Videos, alle `loop muted playsinline`. Autoplay-Modus im Framer-Code: `on-viewport` (spielt im Viewport), `preload="metadata"` (Timeline) bzw. `preload="none"` (Steps). Auf `/seo` ein Hero-Video `2wLheT3tM8JuXwDbZegtdv7u5Y.mp4` mit `preload="none"`, `object-fit:cover`.
- **Dezente Kreis-Ticker-Grafik:** `tickCount:190`, `tickHeight:21`, `tickWidth:1`, `speed:4` (Einheit `vw`), `direction:'clockwise'`, `fadeEnabled:true`, `fadeAmount:30`, `fadeColor:'rgba(255,255,255,0)'`, `tickColor:'rgba(0,0,0,0.32)'`, `circleSize:100`
- **Lava-Shader-Animation** (Framer-Effect-Code, FAQ-Bereich): `preset:'Lava'`, `speed:30`, `distortion:12`, `swirl:80`, `swirlIterations:10`, `proportion:35`, `shape:'Checks'`, `shapeSize:10`, `softness:100`, `radius:'0px'`

### Reduced-Motion-Handling

**Vorhanden, aber nur an einer Stelle.** Der Lenis-Init prueft:

```js
if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) { return }
```

Damit wird der Smooth-Scroll deaktiviert. **Kein `@media (prefers-reduced-motion: reduce)` im CSS** (0 Treffer in `home-inline.css` und `seo`-CSS). Die Framer-Motion-Animationen, Marquee-Ticker und Counter laufen unabhaengig davon weiter. Es gibt `isReducedMotion:void 0` im Framer-Bootstrap (also nicht gesetzt).

### Tech-Stack im Detail

| Kategorie | Befund |
|---|---|
| CMS/Framework | **Framer** (`meta name="generator" content="Framer d4bdfe7"`), Site-ID `5ITc3MlBS5gGpgHlC9Zq7F`, `data-framer-ssr-released-at="2026-09-14T12:21:13.302Z"` |
| Rendering | Framer SSR mit 3 Breakpoint-Varianten als `.ssr-variant hidden-<hash>`-Bloecke (Desktop 1x sichtbar, Tablet und Phone je 1x), React Hydration via `data-framer-hydrate-v2` |
| Modulepreloads | 32 auf der Startseite, 32 auf `/seo`, 26 auf `/ueber-uns` |
| Analytics | Meta Pixel `1476020260918370` (PageView) auf allen geprueften Seiten; Framer Events `events.framer.com/script?v=2` mit `data-fid` |
| Consent | Framer Cookie Component, CSS-Klassen `__framer-cookie-component-button`, Banner Animation `damping:60, stiffness:500, y:10` |
| Terminbuchung | Calendly Inline + Cal.com Inline (beide auf `/termin`) |
| Hosting-Partner | als Footer-Siegel gefuehrt: Hostinger |
| Dev-Agency-Siegel | "WordPress Native Agency", "Webflow Dev Agency" im Tool-Stack |
| Kein Google Analytics/GTM | 0 Treffer für `googletagmanager`, `gtag(`, `G-XXXXXXXX` |
| Kein HubSpot/Shopify/Webflow-Export | 0 Treffer |

### Bilder

| Seite | `<img>` | `loading=lazy` | `srcset` |
|---|---|---|---|
| `/` | 131 | **0** | 101 |
| `/seo` | 64 | 31 | 33 |
| `/geo` | 64 | 16 | n/a |
| `/websites` | 51 | 30 | n/a |
| `/ueber-uns` | 58 | 4 | n/a |
| `/termin` | 6 | 4 | 3 |
| `/cases` | 81 | 3 | n/a |
| `/immobilienmakler` | 50 | 23 | n/a |
| `/news` | 24 | 3 | n/a |
| `/news/ki-overviews` | 6 | 3 | n/a |
| `/cases/ccg-gutachten` | 33 | **0** | n/a |

**Formate auf der Startseite:** WebP 93, PNG 24, SVG 12, JPG 2.
**`fetchpriority`:** 0 Treffer, weder am Hero-Bild noch sonst. Kein `fetchpriority="high"`.
**AVIF:** 0 Treffer im Site-HTML (ein externes AVIF-Link in der Startseite zeigt auf `cdn.prod.website-files.com`, ein Fremd-Host).
**Hero-Bild Startseite:** `8Irm12b36uKalw6HvE7y3kMz6lc.webp?width=2880&height=2450`, `decoding="async"`, **kein** `loading`-Attribut (laedt eager), `sizes="(min-width:1200px) 100vw,…"`, `object-fit:cover`.

## Synthese

### 1. Seitentyp-Blueprints

**Startseite `/`** (19 Sektionen):
1. Nav-Pill fixed, zentriert, max 550px, Burger + Logo + CTA (Full-bleed/overlay)
2. Hero: H1 60px mit Inline-SVG-Icons, 45-Wort-Subline, 2 CTAs, Hintergrund-WebP + Farbverlauf (Full-bleed)
3. Ticker: 6 Award-/Case-/Karriere-Karten, velocity 50 (Marquee)
4. Presse-Logos im gleichen Ticker (Marquee)
5. Intro-Frage als H2, 2 Absaetze, "100+ Unternehmen" (Zentriert-schmal, gap 151px)
6. News: 3 Karten + "Alle News ansehen" (3er-Grid)
7. Testimonials: 1 Zitat gross, Carousel, Kundenlogos (Carousel)
8. Leistungen: 3 Karten SEO/GEO/Websites mit Badge, dunkel (3er-Grid)
9. Cases: 3 Karten mit je 2 KPIs, dunkel (3er-Grid)
10. Benefits: 4 Karten mit Icons, dunkel (4er-Grid)
11. Timeline: 5 Schritte, je 1 Video, dunkel (Timeline)
12. About: 2-Spalten Text + Foto + 3 Zähler (2-Spalten 50/50)
13. Steps: 3 Karten mit Videos, hell (3er-Grid)
14. Report-Lead-Magnet: Text + 6 gestapelte Mockups, dunkel (2-Spalten)
15. YouTube: Text + 3 Vorschaubilder + 6 Kategorie-Tags (Bento)
16. Presse: 12 Screenshots (Karussell)
17. FAQ: 5 Fragen, Plus/Minus-Icon 72px rund (Akkordeon)
18. Final-CTA: H2 + 3 Absaetze + Button (Zentriert, max 1045px)
19. Footer: 5 Spalten + Social + 8 Siegel + Copyright

**Leistungsseite `/seo`, `/geo`, `/websites`** (gleiches Skelett):
1. Nav-Pill
2. Hero mit eigener H1, ProvenExpert-Trust-Zeile, 2 CTAs (Full-bleed)
3. Intro: "100+ regionale Unternehmen empfehlen uns" + 2 Absaetze (Zentriert)
4. Bento-Leistungen: 4 bis 5 nummerierte Karten "Leistung 01…" (Bento)
5. Bento 2: Nutzenversprechen als H2 + 4 bis 5 Bento-Karten (Bento)
6. Cases: 3 KPI-Karten (3er-Grid, dunkel)
7. Testimonials (Carousel)
8. Zweiter Hero: Zwischen-H2 mit "Sichtbar – egal, wo…" + 2 CTAs
9. Feature-Bento: 4-5 Karten je Kanal (Bento)
10. Timeline: 5 Schritte, Ziffern-Overlay 01-05 (Timeline)
11. Tool-Stack: 12 Tool-Logos (Marquee)
12. Final-CTA (Zentriert)
13. Footer

`/websites` schiebt zwischen 3 und 4 zusaetzlich: Ankuendigungs-Banner, Vorher/Nachher-Karussell, Produkt-Update, Profit-6er-Grid und Vergleichstabelle ein.

**Branchen-Landingpage `/immobilienmakler`** (11 Sektionen):
1. Nav-Pill
2. Hero mit branchenspezifischer Zahl-H1 (Full-bleed)
3. Marktverschiebung: 3 nummerierte Thesen (Zentriert)
4. Methode: 3 Nutzen-Karten mit Badge "+5-6 Alleinauftraege" (3er-Grid)
5. Bento: "4 Bestandteile…" (Bento)
6. About mit Zählern (2-Spalten)
7. Testimonials (Carousel)
8. Garantie-Block mit Geld-zurueck (2-Spalten)
9. Produkt-Update (2-Spalten)
10. Werte-Sektion (Grid)
11. Final-CTA + Footer

**Ratgeber-Uebersicht `/news`** (4 Sektionen):
1. Nav-Pill
2. Kopf: H2 "News aus dem SEOLabs Headquarter" + Trust-Zeile (Zentriert), **kein H1**
3. Kartenliste: 5 Artikel mit Kategorie + Versionsnummer + Datum (3er-Grid / Liste)
4. Final-CTA + Footer

**Ratgeber-Artikel `/news/ki-overviews`** (4 Sektionen):
1. Nav-Pill
2. Artikel-Kopf: Datum, H1, 2 Absaetze Subline, "Teilen"-Button (Zentriert-schmal)
3. Artikel-Body: 6 H3-Abschnitte, 1 Zahlen-Trio, 1 Pull-Quote (Zentriert-schmal, ca. 1.017 Woerter)
4. Final-CTA + Footer

**Funnel `/termin`** (4 Sektionen):
1. Nav-Pill
2. Linke Spalte: Eyebrow `Kostenlos & unverbindlich`, H2-Nutzenversprechen, 3 Argument-Karten ("Datenbasierte Analyse", "Schnell & effektiv", "Konkreter Massnahmenplan"), Foto "Mit Tim Koppelmann", Trust "100+ Unternehmen VERTRAUEN UNS" (2-Spalten)
3. Rechte Spalte: H1 "Deine SEO Potenzialanalyse", Subline, Calendly-Inline-Widget 700px (Sticky-Sidebar-artig)
4. Footer (ohne Final-CTA)

**Case Study `/cases/<slug>`** (12 Sektionen):
1. Nav + Kategorie-Badge-Leiste (Leistungen)
2. Case-Header: Ergebnis-H1 mit Zahlen, 1 Subline, 2 Hero-KPI-Badges, 2 CTAs (Full-bleed)
3. Steckbrief-Zeile: Projekt, Branche, Standort, Zeitraum
4. Ausgangslage + Umsetzung: 3 Absaetze
5. Ergebnis-Absatz
6. Leistungs-Grid: 5 H4 mit 1-Satz-Erklaerung (5er-Grid)
7. KPI-Grid: 2 Cluster (`SEO/GEO KPI`, `HARD KPI`) mit 6 und 3 Zahlen (2-Spalten-Grid)
8. Sistrix-Sichtbarkeitsindex: Vorher/Nachher (2-Spalten)
9. Kunden-Zitat-Block (1-Spalten, gross)
10. Testimonials allgemein (Carousel)
11. Final-CTA
12. Footer

### 2. Die 5 stärksten Muster

**Muster 1: Der Ergebnis-Ticker direkt unter dem Hero als Trust- und Navigationsmaschine.**
Statisch im Markup, 12 Karten (6 doppelt für die Endlosschleife), jede mit Bild, "NEU"-Badge, H3 und "Mehr erfahren"-Button. Beleg: `home.html` `data-framer-name="Ticker Wrapper"`, `tickerEffectVelocity:50`, `tickerEffectGap:10`, `tickerEffectDirectionModifier:'reverse'` (aus `m-T67IipFGEy-…mjs`). Die Karten sind echte Deeplinks (`./news/german-web-award-2026`, `./cases/seniocon`), der Ticker ist damit gleichzeitig sekundäre Navigation.

**Muster 2: Produkt-Bilder als Inline-SVGs mitten im H1.**
Der H1 ist kein Plain-Text, sondern drei Text-Fragmente mit eingebetteten SVG-Icons: `Dominiere die <img width:46px> Suchergebnisse von <img width:57px> Google bis <img width:49px> ChatGPT`. Beleg: `home.html` H1-Markup mit `style="display:inline-block;width:46px;height:auto;vertical-align:middle;margin:0 0px;position:relative;top:-0.05em;flex-shrink:0"`. Das macht den wichtigsten SEO-Text visuell und erklaert Google/ChatGPT ohne zusaetzliche Zeile.

**Muster 3: Der CTA-Button mit Pfeil-Durchlauf im `overflow:hidden`-Container.**
Beleg: `home-inline.css`
```css
.framer-yrYaN .framer-1sw3lh0{width:12px;height:11px;position:absolute;top:2px;left:-13px}
.framer-yrYaN .framer-73hugb{width:12px;height:11px;position:absolute;top:2px;left:2px}
.framer-yrYaN.framer-v-17g83hv.hover .framer-1sw3lh0{left:2px}
.framer-yrYaN.framer-v-17g83hv.hover .framer-73hugb{left:17px}
```
Zwei Pfeile, einer startet ausserhalb links (`left:-13px`), einer sichtbar (`left:2px`). Bei Hover wandern beide um 15px nach rechts. Der Button-Hintergrund wechselt gleichzeitig von `rgb(122,127,173)` auf `rgb(33,29,29)` (Beleg: `m2-DuBZnfrxZ.C9FJ10i5.mjs`, Variante `JSrQklJUu-hover`). Bewegung mit `{bounce:.2, delay:0, duration:.4, type:'spring'}`.

**Muster 4: Spezifische Zahlen als wiederkehrendes Beweismuster auf jeder Ebene.**
Von der H1 der Branchenseite (`Wie du mind. 4 zusätzliche Alleinaufträge pro Monat gewinnst`) über Case-Karten (`10.000+ Website-Besucher/Monat`, `300+ Anfragen/Monat`) bis zur Case Study (`105.659+ Impressionen`, `1.937+ Klicks`, `43+ Top 3 Rankings`, `1.300+ Keywords`, `2.600 €+ Traffic-Wert`, `110+ AI Citations`, `20+ Leads`, `15+ Anrufe`, `3% Conversion Rate`) und zur Vergleichstabelle (`Umsatz 27.000 €` → `105.000 €`, Faktor `× 3,9`). Jede Behauptung trägt eine Zahl. Beleg: `case-ccg.html` Cluster `SEO/GEO KPI` und `HARD KPI`; `websites.html` `Section - Table`.

**Muster 5: Dunkel/Hell-Sektionsrhythmus im Wechsel.**
Feste Reihenfolge ab dem Hero: hell (`#f4f4f4` Hero, Intro, News, Testimonials) → dunkel (`#211d1d` Leistungen, Cases, Benefits, Timeline) → hell (`#f6f6f6` About, Steps) → dunkel (`#211d1d` Report) → hell (`#f4f4f4` YouTube, Presse) → hell-weiss (FAQ, Final-CTA). Beleg: `home-inline.css`
```css
.framer-wsG80 .framer-1frabrz{background-color:var(--token-94cb5cf7-…#211d1d);…gap:80px;…padding:100px 20px}
.framer-wsG80 .framer-173v1gs{background-color:#f6f6f6;…gap:80px;…padding:100px 20px}
.framer-wsG80 .framer-12c89i6{background-color:#f4f4f4;…gap:120px;…padding:100px 20px}
```

### 3. Animation-Rezepte

**Rezept A: CTA-Pfeil-Durchlauf (CSS, exakte Werte von der Site)**

```css
.cta {
  position: relative;
  overflow: hidden;
  display: flex; align-items: center; gap: 12px;
  height: 52px; padding: 10.31px 16.15px;
  border-radius: 6px;
  background-color: rgb(122, 127, 173);
  transition: background-color 0.2s ease;
}
.cta:hover { background-color: rgb(33, 29, 29); }

.arrow-stack { position: relative; width: 12px; height: 11px; }
.arrow-a { position: absolute; top: 2px; left: -13px; width: 12px; height: 11px; }
.arrow-b { position: absolute; top: 2px; left: 2px;   width: 12px; height: 11px; }
.cta:hover .arrow-a { left: 2px; }
.cta:hover .arrow-b { left: 17px; }
```
Quelle: `home-inline.css` (`.framer-yrYaN.framer-v-17g83hv.hover .framer-1sw3lh0{left:2px}` / `.framer-73hugb{left:17px}`), Grundzustand `left:-13px` / `left:2px`. Der Button-Hover-Wechsel nutzt in Framer einen Spring `{bounce:.2, duration:.4}`, in reinem CSS ist `0.2s ease` der nächstliegende Wert aus dem Nav-CTA.

**Rezept B: Karten-Hover, Karte skaliert staerker als das Bild (Framer Motion)**

```jsx
const spring = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" };
const tween  = { delay: 0, duration: 0.4, ease: [0.44, 0, 0.56, 1], type: "tween" };

<motion.a whileHover={{ scale: 1.03, transition: spring }}>
  <motion.img whileHover={{ scale: 1.05, transition: tween }} />
</motion.a>
```
Quelle: `m-T67IipFGEy-…mjs`, `ic={opacity:1,rotate:0,rotateX:0,rotateY:0,scale:1.03,…,transition:rc}` mit `rc={bounce:.2,delay:0,duration:.4,type:'spring'}`; `oc={opacity:1,…,scale:1.05,…,transition:{delay:0,duration:.4,ease:[.44,0,.56,1],type:'tween'}}`.

**Rezept C: Ziffern-Roll-Zähler (exakter Easing-Satz von der Site)**

```js
const easingMap = {
  linear: "linear",
  smooth: [0, 0, 0.2, 1],
  spring: [0.34, 1.56, 0.64, 1],
  bounce: [0.22, 1.8, 0.5, 1],
};
// Ziffernstapel
const digitHeight = fontSize * 1.2;
const digitWidth  = fontSize * 0.62;
const y = -(sequence.length - 1) * digitHeight;
const transition = { delay: 0, duration: DURATION, ease: easingMap[key] };
const mask = "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)";
// Trigger
new IntersectionObserver(([e]) => e.isIntersecting && start(), { threshold: 0.2 });
```
Quelle: `Counter_FX.CFgazsrg.mjs`. Dauer `DURATION` ist ein Prop, im Modul nicht als Default auslesbar, deshalb hier als Variable belassen. Scroll-Modus nutzt `{duration:.08, ease:'linear'}`.

**Rezept D: Endlos-Ticker (Framer Tick Effect, exakte Werte)**

```jsx
<Ticker
  tickerEffectEnabled
  tickerEffectVelocity={50}
  tickerEffectGap={10}
  tickerEffectAlign="center"
  tickerEffectDirectionModifier="reverse"   // Hero-Ticker
  tickerEffectHoverModifier={100}
  tickerEffectOverflow="clip"
  tickerEffectPosition="absolute"
  tickerEffectStackDirection="row"
  tickerEffectDraggable={false}
/>
```
Quelle: `m-T67IipFGEy-…mjs`. Fuer den Tool-Stack stattdessen `tickerEffectGap:"100px"` und `tickerEffectPosition:"relative"`. `tickerEffectHoverModifier:100` bedeutet: bei Hover laeuft der Ticker mit voller Geschwindigkeit weiter (keine Verlangsamung).

**Rezept E: Smooth Scroll mit Reduced-Motion-Guard und Overlay-Kopplung (exakter Code von der Site)**

```html
<script src="https://unpkg.com/lenis@1.3.25/dist/lenis.min.js"></script>
<script>
(function () {
  if (window.__seolabsLenis) return
  function init() {
    if (typeof Lenis === "undefined") return
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    var intensity = 10
    var lenis = new Lenis({ duration: intensity / 10, autoRaf: true })   // duration: 1
    window.__seolabsLenis = lenis
    var overlay = document.getElementById("overlay")
    if (overlay) {
      var sync = function () {
        if (overlay.children.length > 0) {
          var overflow = getComputedStyle(document.documentElement).getPropertyValue("overflow")
          if (overflow === "hidden") { lenis.stop() } else { lenis.start() }
        } else { lenis.start() }
      }
      var mo = new MutationObserver(sync)
      mo.observe(overlay, { childList: true })
      sync()
    }
  }
  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", init) } else { init() }
})()
</script>
```
Quelle: `home.html`, Snippet `O70exYFrZ`. Lenis läuft mit `duration:1` und `autoRaf:true`, gedämpft durch die Endlosschleife, wenn ein Overlay offen ist.

**Rezept F: Farbwechsel der Links (die einzige CSS-Transition der Site)**

```css
a { color: #f4f4f480; transition: color .4s cubic-bezier(.44,0,.56,1); }
a:hover { color: #f4f4f4; }
```
Quelle: `home-inline.css`, `.framer-fYp4k .framer-styles-preset-j3g0vm…{--framer-link-hover-text-color:var(--token-74158509-…,#f4f4f4);--framer-link-text-color:var(--token-7915ccba-…,#f4f4f480);transition:color .4s cubic-bezier(.44,0,.56,1)}`.

### 4. Anti-Patterns, was wir NICHT übernehmen

**1. Fehlendes Schema.org-Markup bei einer SEO-Agentur.**
0 `application/ld+json` auf allen 13 geprueften Seiten. Kein `Organization`, kein `LocalBusiness`, kein `Article` auf dem Ratgeber-Artikel, kein `FAQPage` trotz 5-Fragen-Akkordeon, kein `BreadcrumbList`, kein `Review`/`AggregateRating` trotz sichtbarer `5,0` und `48+ Bewertungen`. Beleg: `grep -c 'application/ld+json'` liefert in jeder der 11 HTML-Dateien 0. Besonders auffaellig, weil die Site selbst auf `/news/ki-overviews` schreibt: "Strukturierte Daten einsetzen: Schema.org-Markup (LocalBusiness, FAQ, Service) ist das erste, was KI-Systeme lesen."

**2. Kein `loading="lazy"` auf der Startseite und der Case Study.**
131 `<img>` auf `/`, 33 auf `/cases/ccg-gutachten`, beide mit **0** lazy-Attributen. Beleg: Zählung `grep -o 'loading="lazy"'`. Auf `/` sind 101 Bilder im `srcset` mit bis zu 4 Stufen (`scale-down-to=512`, `1024`, `2048`, `2880`), alle eager. Kein `fetchpriority` gesetzt (0 Treffer), also wird das 2880px-Hero-Bild mit LCP-Priorität konkurriert von allen Award-Karten-Bildern.

**3. Platzhalter-Titles auf `/cases` und `/news`.**
Title und Meta-Description lauten auf beiden Seiten nur `SEOLabs` (7 Zeichen). Beleg: `/cases` `<title>SEOLabs</title>`, `/news` `<title>SEOLabs</title>`. Fuer zwei starke Landingpages verschenkter Title-Platz. `/news` hat zusaetzlich **kein H1** (0 `<h1>`-Tags).

**4. Identische Titles und Meta-Descriptions auf allen Leistungs- und Branchenseiten.**
`/seo`, `/geo`, `/websites`, `/immobilienmakler` teilen alle den Startseiten-Title `SEOLabs GmbH | Tim & Robin Koppelmann | Für das beste SEO der Welt` und die Startseiten-Description. Nur `/ueber-uns`, `/termin` und die Case Studies haben eigene Texte.

**5. FAQ-Antworten sind nicht im HTML.**
Der FAQ-Block rendert 5 Fragen mit `aria-expanded="false"` und Plus/Minus-Icons, aber ohne Antworttext. Beleg: `home.html`, Abschnitt `Section - FAQ`, 10 Accordion-Buttons (5 Fragen x 2 SSR-Varianten), alle mit `<h3>` und danach nur Icon-Markup. Die Antworten kommen erst zur Laufzeit per JS. Das ist inhaltsleer für Crawler und widerspricht der eigenen Content-Doktrin.

**6. `prefers-reduced-motion` nur halb umgesetzt.**
Der Check existiert nur im Lenis-Snippet. **Null** `@media (prefers-reduced-motion: reduce)` im CSS. Die Marquees (velocity 50, laufen endlos), die 190-Tick-Kreisanimation (`speed:4`), der Lava-Shader (`speed:30`, `swirl:80`), die 8 loopenden Videos und der Counter-Roll laufen alle unabhaengig von der Systemeinstellung weiter.

**7. 5 Videos in der Timeline mit `max-width:400px` und `aspect-ratio:1/1`.**
Beleg: `home.html` `Section - Timeline`, fuenf `<video loop muted playsinline preload="metadata" style="width:100%;max-width:400px;aspect-ratio:1 / 1;object-fit:contain">`. 400px ist auf einem 1045px-Container klein, und `object-fit:contain` laesst zusaetzlich Rand. Dazu 3 weitere Videos im Steps-Block und eins im `/seo`-Hero.

**8. Rechtschreib- und Strukturfehler im sichtbaren Text.**
Beleg: `Spaßs im Verkauf` (FAQ-Antwort/`Data-framer-name` auf `/` und `/immobilienmakler`), `Klassiche Google Suche` (SEO-Bento), `Jezt für Redaktion bewerben` (Team-Karte), `SuÌˆddeutsche Zeitung_Logo 1` (Bildname mit Mojibake), `Für mehr Kundenanfragen über deine Website - kostenlos und unverbindlich.` (Bindestrich statt Gedankenstrich in der zweiten SSR-Variante). Dazu ein Copy-Paste-Fehler: Auf der Startseite und `/seo` tragen zwei verschiedene Sektionen (Presse und FAQ) beide die Bildunterschrift `Renommierte Medien berichten über unsere Arbeit`, obwohl die FAQ-Sektion die Headline `Du hast noch Fragen?Wir haben die Antworten.` trägt.

**9. Wiederholter Text ohne Not.**
Die Startseite hat 30 H2 und 60 H3, viele davon identisch wiederholt, weil jede Sektion in 3 Breakpoint-Varianten im DOM steht. `Das sagen unsere Kunden` erscheint 3x als H2, `Sehr viel mehr als nur Sichtbarkeit` 2x, `Gemacht für das beste SEO der Welt` 2x, `Renommierte Medien berichten über unsere Arbeit` 2x, die 5 FAQ-H3s je 2x, die 6 Ticker-H3s je 2x. Das bläht das DOM auf 1 MB pro Seite (1.004.190 Bytes für `/`).

**10. Keine Telefonnummer.**
Kein `tel:`-Link, keine Nummer in Nav oder Footer auf keiner der 13 geprueften Seiten. Fuer eine Agentur mit explizitem Ziel "mehr Kundenanfragen" fehlt der niedrigschwelligste Kontaktweg. Der einzige Kontaktweg ist der Kalender-Funnel.

### 5. Conversion-Mechanik in 5 Sätzen

**1.** Jede Seite beginnt mit einer Ergebnis-H1 und einem Ergebnis-Bild, das den Suchmaschinen-Sieg visuell zeigt, gefolgt von genau einer Handlung: `Termin buchen`. **2.** Unmittelbar darunter läuft ein Endlos-Ticker mit konkreten Award- und Case-Karten, der Sozialbeweis liefert, ohne dass der Besucher scrollen muss, und gleichzeitig als sekundäre Navigation in die Tiefe dient. **3.** Jede weitere Sektion folgt dem Muster "Behauptung mit Zahl" (10.000+ Besucher, 300+ Anfragen, ×3,9 Umsatz), bis der Besucher die Behauptung als Rechnung akzeptiert. **4.** Der einzige Konversionspunkt ist der Kalender auf `/termin`, der als "kostenlose Potenzialanalyse" mit den drei Argumenten "Datenbasierte Analyse", "in nur 48 Stunden" und "Praxiserprobt in über 50 Projekten" verkauft wird, ohne Formular und ohne Preisseite. **5.** Für die kaufnächste Gruppe (Immobilienmakler) gibt es zusaetzlich eine branchenspezifische Seite mit schriftlicher Ergebnisgarantie und Geld-zurueck-Versprechen, womit das letzte Risiko vor dem Termin entfernt wird.

## Abrufprotokoll

| URL | HTTP | Bytes |
|---|---|---|
| `https://www.seo-labs.de/` | 200 | 1.004.190 |
| `https://www.seo-labs.de/robots.txt` | 200 | 68 |
| `https://www.seo-labs.de/sitemap.xml` | 200 | 5.725 |
| `https://www.seo-labs.de/seo` | 200 | 599.189 |
| `https://www.seo-labs.de/geo` | 200 | 609.906 |
| `https://www.seo-labs.de/websites` | 200 | 690.466 |
| `https://www.seo-labs.de/ueber-uns` | 200 | 488.377 |
| `https://www.seo-labs.de/termin` | 200 | 299.802 |
| `https://www.seo-labs.de/cases` | 200 | 926.305 |
| `https://www.seo-labs.de/immobilienmakler` | 200 | 483.344 |
| `https://www.seo-labs.de/news` | 200 | 388.265 |
| `https://www.seo-labs.de/news/ki-overviews` | 200 | 328.182 |
| `https://www.seo-labs.de/cases/ccg-gutachten` | 200 | 459.881 |

**Zusaetzlich gefetchte Assets (Framer-CDN):**

| Asset | HTTP | Bytes |
|---|---|---|
| `framerusercontent.com/sites/5ITc3MlBS5gGpgHlC9Zq7F/script_main.KJK-V6KQ.mjs` | 200 | 9.881 |
| `…/motion.BGJYzJPV.mjs` | 200 | 151.422 |
| `…/Counter_FX.CFgazsrg.mjs` | 200 | 5.568 |
| `…/SEO_Timeline.B_M0msrH.mjs` | 200 | 18.487 |
| `…/DuBZnfrxZ.C9FJ10i5.mjs` (CTA-Button-Komponente) | 200 | 16.698 |
| `…/LogoSwitcher.ClfAneqg.mjs` | 200 | 12.606 |
| `…/b8Kb18Obx.DFsnAjbi.mjs` (Font-Manifest) | 200 | 9.562 |
| `…/T67IipFGEy-fGiHSqAzcr1RlFDvQ06Lwe2KrRxG-h9M.D_8EQmob.mjs` (Startseiten-Payload) | 200 | 350.758 |
| `…/m2-bMu7VDAOY.BwmOwJqR.mjs` | 200 | 40.442 |
| `…/m2-D5nL9B76m.BMkQVyfY.mjs` | 200 | 107.907 |
| `…/m2-yZm8Xh6kK.B5Z8svcN.mjs` | 200 | 23.951 |
| `…/m2-lh_lZpc4J.B0a4KurQ.mjs` | 200 | 13.206 |
| `…/m2-jto27x78C.CmipNWVV.mjs` | 200 | 24.572 |
| `…/m2-PORGwrtUO.CylPYf5A.mjs` | 200 | 34.036 |
| `…/m2-EyrPIvl29.B-Ta-HN_.mjs` | 200 | 7.526 |
| `…/m2-uMoCpoNEU.dk7Whjd6.mjs` | 200 | 3.555 |
| `…/m2-hOQOcLohM.DhIQJauI.mjs` | 200 | 1.276 |
| `…/m2-bPkpwt_If.DQGID_Ty.mjs` | 200 | 746 |

Alle Abrufe mit User-Agent `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36`. Keine URL lieferte 403 oder leer. Keine nicht-abrufbaren Inhalte. **Nicht belegbar geblieben:** die exakte Dauer des Counter-FX-Props (im Modul als Variable, kein Default auslesbar), die CSS-Regeln der nicht-inline geladenen Framer-Runtime-CSS, sowie alle FAQ-Antworttexte (nicht im HTML).
