# hellotend.com (Tend Dental)

## Steckbrief

| Feld | Wert |
|---|---|
| Domain | https://www.hellotend.com |
| Analysierte Start-URL | https://www.hellotend.com/site/home |
| Marke | Tend Dental (Marktname im Fließtext: "Tend", Rechtsträger-Hinweis im Footer) |
| Branche | Zahnmedizin, US-weite Studio-Kette (D2C, Endkunden) |
| Geschäftsmodell | Eigene "Studios" statt Praxen, Online-Buchung, PPO-Versicherungsabwicklung, Ratenfinanzierung, eigene App |
| Seitentyp | Multi-Standort-Lead-Gen mit sehr großer SEO-Maschine (Blog, Stadt-Landepages, Leistung x Stadt) |
| Sprache | Englisch (`<html lang="en">`), keine hreflang-Angaben (0 auf allen geprüften Seiten) |
| Anrede | Du/Sie nicht zutreffend (Englisch), Ton durchgehend informell-persönlich, "you", "we", "no judgment, ever" |
| Stack Hauptseite | CMS "Tymbrel" (`<meta name="generator" content="Tymbrel ( www.tymbrel.com )" />`), jQuery 3.6.3, Splide, FontAwesome, Vanilla-LazyLoad |
| Stack Buchung | Next.js (eigene App unter `/booking/*`, `__NEXT_DATA__`, Material UI `MuiButtonBase-root`), Bild-CDN Contentful (`images.ctfassets.net`) |
| Weitere Marker | Bugsnag (`apiKey` im HTML), Google Tag Manager `GTM-NQ88W4P`, Vimeo Player API, Google Maps JS + Embed, AddToAny Share |
| Consent | Kein Consent-Tool. Next.js-Buchung zeigt Cookie-Hinweis mit "Dismiss"-Button ohne Ablehnungsoption |
| Anzahl Seiten in Sitemap | 406 URLs gesamt: 225 (sitemap.xml) + 120 (`/site/hub-xml-sitemap`) + 61 (`/site/dentists-xml-sitemap`) |
| Sitemap-Zusammensetzung | 134 Blog-URLs, 34 Studio-URLs, 18 Service-URLs, 9 Leadership-URLs, 61 Dentist-Profile, 120 Leistung-x-Stadt-Hub-Seiten, Rest Einzelseiten |
| Canonical | Selbstreferenziell auf jeder geprüften Seite |
| Radius/Buttons | Pill (3,125 rem), Karten 1,5625 rem, große Bild-Radien bis 12,875 rem |

## Sitemap

### Hauptnavigation (aus `<nav aria-label="Primary">`, identisch als `<nav aria-label="Mobile">` dupliziert)

| Ebene 1 | Ebene 2 |
|---|---|
| Core Services (`/site/services`) | Family Dental Care, Dental Exams, Hygiene & Cleaning, Emergency, Orthodontics, Invisalign & SimplyClear Aligners, Teeth Whitening, Veneers, Dental Implants |
| Special Services (`/site/specialty-dental-services`) | Oral Surgery, Endodontics / Root Canal, Perio Protect Gum Treatment, Sleep Apnea Therapy, Therapeutic Injectables, Curodont Cavity Treatment, Wisdom Tooth Extractions, Dental IV Sedation |
| Locations (`/site/search`) | New York City, Boston, Washington DC, Atlanta, Westport, Nashville |
| Patients (`/site/patient-information`) | Payment & Financing, Insurance, Dental Plans |
| About (`/site/about`) | About Tend Dental, Meet Our Dentists, Meet Our Leadership, Innovation & Technology, Tend Dental Blog, Careers |

Der Header enthält zusätzlich eine Standortsuche (`placeholder="Find a dental studio near you"`) und einen Telefon-CTA `(212) 686-3686`. Ein Topbar-Slider zeigt acht wechselnde Nutzen-Phrasen: "Soothing studios", "Dental done differently", "No judgment ever", "Outcomes, not quotas", "Decades of experience", "Science-based care", "Top-rated clinical team", "Full-service dentistry".

### Footer (4 Spalten + Rechtliches)

| Spalte | Inhalt |
|---|---|
| All about Tend | FAQs, Dentists, Leadership, Press, Dental Plans; aufklappbar: Careers (7 Links), Insurance (9 Versicherer x 5 Standorte, verschachtelte `<details>`) |
| Locations | Aufklappbar nach Region: New York City, Brooklyn, Manhattan, Queens, Washington DC Metro, Boston, Atlanta, Connecticut, Nashville, je mit "All Locations"-Sammellink |
| Services | All Services, dann je Leistung aufklappbare Liste Leistung x 10 Märkte (Dental Hygiene, Invisalign, Veneers, Emergencies, Family Dental Care, Wisdom Teeth Removal u. a.) |
| Questions? | Call, Email, Social (Facebook, LinkedIn, Instagram) |
| Rechtliches | Privacy Policy, Accessibility, Terms of Use, Search, Sitemap, Back to Top, Copyright "© 2026", Invisalign-Markenhinweis, Hinweis auf "Life Bridge Dental VA, PLLC Offices" |

Der Footer enthält auf der Startseite 239 Links, die Seite insgesamt 516 `<a>`-Elemente.

## Seiten

### 1. https://www.hellotend.com/site/home (Startseite)

| Feld | Wert |
|---|---|
| Title | Modern, Judgment-Free Dental Care, Tend Dental |
| Meta-Description | Enjoy easy booking, modern, soothing studios, and a team of top-rated dentists at Tend Dental. Schedule your first visit today! |
| H1 | "Look forward to going to the dentist" (7 Wörter) |
| H2 / H3 | 17 H2 / 41 H3 |
| Schema.org | 36 `ld+json`-Blöcke: 33x `Dentist` + `Organization` + `PostalAddress` + `GeoCoordinates` + 196x `OpeningHoursSpecification`, 1x `MedicalOrganization` + `ContactPoint`. Kein `aggregateRating`, kein `Review` |
| Canonical | https://www.hellotend.com/site/home |
| hreflang | keine |

**Sektionen in DOM-Reihenfolge**

| Nr | Sektionstyp | Headline wörtlich | Layout | Medien | CTA-Labels | Trust |
|---|---|---|---|---|---|---|
| 1 | Nav + Topbar | (Nutzen-Slider) | Full-bleed, fixiert | Logo SVG, 8 Phrasen | Book Now, Login, Telefon | Telefonnummer im Header |
| 2 | Hero | "Look forward to going to the dentist" | 3 Spalten (4/4/4), linkes und rechtes Model-Bild | 2 Fotos, `parallaxImg--normal` und `parallaxImg--reverse` | "Book Now", "(212) 686-3686" | "Whether it's been 6 months or 6 years" |
| 3 | Qualifier-Slider | "We offer a full range of services for all your needs" | Carousel, Kachel-Buttons | 7 Slides | Dental Exams, Emergency Care, Oral Hygiene, Orthodontics, Perio Protect, Veneers, Teeth Whitening |  |
| 4 | Foto-Marquee | (keine) | Marquee, automatische Endlos-Animation | 4 Fotos | keine |  |
| 5 | Video + Benefits | "The Tend Dental difference" | 2 Spalten 50/50 | 1 Vimeo-Embed (Player-Facade) | "Book Now" | "Over 8,000 five star reviews" + 5 Sterne |
| 6 | Feature-Kachel-Liste | (an Sektion 5 angehängt) | 2-Spalten-Button-Grid, `visible-8` + "View More" | keine | Convenient locations, Modern mindful dental care, Online appointment booking, Same day appointments, Evening & Saturday hours, Flexible financing, Most major PPO insurance accepted, Orthodontics with clear aligners, TV & free WiFi, Cutting-edge technology, Soothing studios, Complimentary brush bags with exam |  |
| 7 | Testimonials | "Why people love Tend" | Carousel, 3 Karten sichtbar, `focus: center` | 10 Text-Reviews | Pfeile | 5 Sterne je Review, Vorname + Studioort |
| 8 | Standort-Intro | "Dental studios across the US" | Zentriert schmal | keine | keine | "covered by insurance" |
| 9 | Marktliste + Karte | (Studio-Liste) | 2 Spalten 50/50, Sticky-Sidebar-Effekt | 33 Studios als `<li>` mit Koordinaten, Google-Maps-Embed | "16 Studios", "8 Studios", "4 Studios", "3 Studios", "1 Studio" |  |
| 10 | Versicherung | "Dental insurance coverage" / "Our insurance carriers" / "Check your insurance" | 2 Spalten 50/50 + Tabs | 9 Versicherer-Logos, 2 iframes (`/insurance-checker`) | "More Questions?" | 9 namentliche PPO-Versicherer |
| 11 | Klinik-Team | "A top-rated clinical team" | 3 Spalten 4/4/4 mit Oval-Bildern | 2 Fotos, 4 SVG-Icons | "Meet Our Clinical Team" | Decades of experience, Science-based care, Outcomes not quotas, Putting safety first |
| 12 | Team-Marquee | (keine) | Marquee | 4 Fotos | keine |  |
| 13 | Blog-Teaser | "Blog" | 2 Spalten 4/8 + Slider-Umbau per JS | 3 Beitragsbilder | "View All Posts" |  |
| 14 | Presse | "In the press:" | Logo-Marquee | 9 Presse-Logos | keine | Business Insider, Fast Company, Forbes, Med City News, New York Magazine, Tech Crunch, The Boston Globe, The New York Times, The Wall Street Journal |
| 15 | Final-CTA (im Footer) | "Care at Tend Dental isn't just painless, it's a pleasure" | 2 Spalten 8/4 | Hintergrundbild `/files/cta-bg.jpg` | "Book Now" |  |
| 16 | App-Download | "Download the Tend Dental app" | 3 Spalten | QR-Code, App-Store-Badge | "Download the Tend Dental app" |  |
| 17 | Sticky-Bottom-Bar | (mobil) | Fixiert unten, `#sticky` | keine | Book Now, Login, Telefon |  |

**Hero-Formel:** H1 ist ein Nutzenversprechen in 7 Wörtern, das eine Erwartung umdreht ("Look forward to going to the dentist"). Subline 22 Wörter mit Fettung auf "no judgment, ever." Zwei CTAs plus Telefon: "Book Now" (Sekundär-Button) und "(212) 686-3686" (Alert-Button). Trust im Hero: keine Sterne, aber die Subline adressiert die Angst ("6 months or 6 years"). Medientyp: zwei freigestellte Model-Fotos mit Farbhintergrund (Blau, Gelb), beide mit `fetchpriority="high"`. Hero-Höhe: keine `min-h-screen`-Klasse, Höhe entsteht aus `.hero-home>.tymbrel-col:nth-child(2){padding-top:11.5rem}` plus Bildhöhe `36.125rem`.

**CTA-Strategie (Startseite):** 67 Button-Elemente, davon 36x "Book Now". Alle "Book Now" führen auf `https://www.hellotend.com/booking/markets` (gleicher Funnel). Studio-Karten führen direkt in den vorbefüllten Funnel `booking/services?market=<markt>&studio=<studio>`. Telefon-CTA `tel:2126863686`. Header-CTA: ja, "Book Now" wird per JS als `<button class="book-now-btn">` injiziert. Telefonnummer im Header: ja. Zusätzlich Sticky-Bottom-Bar `#sticky` mit "Book Now", "Login", Telefon, die per Scroll-Klasse eingeblendet wird.

**Trust-Staffelung:** Hero (Angst-Adressierung), Sektion 5 (8.000 Fünf-Sterne-Reviews + 5 Sterne), Sektion 7 (10 namentliche Reviews mit Studiozuordnung), Sektion 9 (33 Standorte als Größenbeweis), Sektion 10 (9 Versicherer), Sektion 11 (4 klinische Qualitätsversprechen + Teamfotos), Sektion 14 (9 Presse-Logos). Kein Bewertungssiegel, keine Auszeichnungen.

**Funnel/Formular:** Auf der Marketing-Seite kein Formular. Zwei eingebettete iframes `https://www.hellotend.com/insurance-checker` (Next.js-App, `MuiButtonBase-root`) mit Microcopy "Curious if your insurance will cover your exam? We can tell you in just a few seconds." Ein Inline-Skript setzt nach Klick auf "Check insurance" per MutationObserver `target="_top"` auf die entstehenden "Book Now"-Buttons.

**Footer:** 4 Spalten (All about Tend, Locations, Services, Questions?), 2 verschachtelte `<details>`-Bäume mit Versicherern und Leistung-x-Markt-Links, 3 Social-Profile, 5 Rechtliche Links, 2 Disclaimer.

### 2. https://www.hellotend.com/site/services (Leistungsübersicht)

| Feld | Wert |
|---|---|
| Title | Dental Services Near You, Tend Dental |
| Meta-Description | Experience gentle, modern dental care with Tend Dental's top-rated dental team. Easy booking, soothing studios, healthy smiles. Schedule your first visit today! |
| H1 | "Dental Services at Tend" (4 Wörter) |
| H2 / H3 | 9 H2 / 30 H3 |
| Schema.org | keine `ld+json`-Blöcke |
| Canonical | https://www.hellotend.com/site/services |

**Sektionen in DOM-Reihenfolge**

| Nr | Sektionstyp | Headline | Layout | Medien | CTA | Trust |
|---|---|---|---|---|---|---|
| 1 | Hero | "Dental Services at Tend" | 3 Spalten 4/4/4 mit zwei Model-Fotos | 2 Fotos | Book Now, Telefon | Subline 42 Wörter: "Modern dental care that fits your life." |
| 2 | Foto-Marquee | (keine) | Marquee | 4 Fotos | keine |  |
| 3 | Produkt-Karten | "Family Dental Care" / "Dental Exams" | 2er-Reihe, 7 Reihen, `services-all` | je 2 Fotos | "More", "Book Now" |  |
| 4 | Blog-Teaser | "Blog" | 2 Spalten 4/8 | 3 Bilder | "View All Posts" |  |
| 5 | Presse-Marquee (Footer) |  |  |  |  |  |

Besonderheit: Die Kartenliste enthält eine Dublette "Orthodontics at Tend, TREATMENT CALCULATOR IP" (`/site/services/orthodontics-copy-treatment-calc`), ein sichtbarer Redaktionsrest im Live-Bestand.

### 3. https://www.hellotend.com/site/services/dental-exams (Leistungsdetail)

| Feld | Wert |
|---|---|
| Title | Dental Exams at Tend Dental |
| Meta-Description | Regular exams are one of the most important parts of your oral health care routine. Click here to learn how Tend Dental has reimagined the dental exam experience. |
| H1 | "Dental Exams at Tend" |
| H2 / H3 | 20 H2 / 18 H3 |
| Schema.org | `FAQPage` mit 9 `Question`/`Answer`-Paaren |
| Canonical | https://www.hellotend.com/site/services/dental-exams |
| Details-Elemente | 6 (`<details>`-Akkordeons) |

**Sektionen in DOM-Reihenfolge**

| Nr | Sektionstyp | Headline wörtlich | Layout | Medien | CTA | Trust |
|---|---|---|---|---|---|---|
| 1 | Hero intern | "Dental Exams at Tend" | 3 Spalten 4/4/4, Breadcrumb "Services / Dental Exams" | 2 Model-Fotos, `fetchpriority="high"` | Book Now, Telefon | "Over 8,000 five star reviews" + 5 Sterne; Checkliste mit 5 Punkten |
| 2 | Standort-Slider | "Locations near you in <Ort>" | Carousel, per `template` + JS gefüllt | keine | "Book online" (12x), "Call: (212) 686-3686" | Entfernungsangabe in Meilen |
| 3 | Foto-Marquee | (keine) | Marquee | 4 Fotos | keine |  |
| 4 | Zigzag-Text | "Why regular dental exams matter" | 2 Spalten 50/50 | 1 Foto | "Check insurance" (Textlink auf `#insurance`) | Verweis auf Forschung zu Herz, Diabetes, Schlaganfall |
| 5 | Feature-Intro schmal | "Inside Tend dental exams" | Zentriert schmal | keine | keine |  |
| 6 | Video | (keine Headline) | Vollbreite, zentriert, max-width 53,125 rem | 1 Vimeo-Facade (`aspect-ratio 16/9`) | Play-Button | Patientenstimme im Video |
| 7 | Leistungs-Inhalt (2 Spalten) | "What's included in your dental exam?" | 2 Spalten 4/8, dunkelgrüner Callout | keine | keine | 6 `<details>`: Comprehensive evaluation, Digital X-rays, Professional cleaning, Gum disease screening, "Free oral cancer screening ($60 value)", Personalized care plan |
| 8 | Zigzag-Text | "In the suite" | 2 Spalten 50/50, Bild rechts | 1 Foto | keine | 5 Checkmarks, u. a. "80% less radiation", "Complimentary Tend brush bag", "We'll never, ever recommend care that you don't need or want" |
| 9 | Versicherung | "Dental insurance coverage" / "Our insurance carriers" / "Check your insurance" | 2 Spalten + Tabs | 9 Logos, 2 iframes | "More Questions?" | 9 namentliche Versicherer |
| 10 | FAQ-Akkordeon | "Have questions about dental exams?" | Zentriert schmal, 9 Accordion-Items | keine | keine | Schema-FAQPage identisch zum sichtbaren Inhalt |
| 11 | Testimonials | "Why people love Tend" | Carousel | 10 Reviews | Pfeile | 5 Sterne |
| 12 | Leistungs-Slider | "Other dental services at Tend Dental" | Carousel, 3 Karten sichtbar | keine | "More", "Book Online", "Call: (212) 686-3686" |  |
| 13 | Presse-Leiste | (keine Headline) | Zentriert, 6 Logos | 6 Bilder | keine | Presse-Logos |
| 14 | Blog-Teaser | "Blog" | 2 Spalten 4/8 | 3 Bilder | "View All Posts" |  |

**CTA-Strategie der Seite:** 32 Button-Elemente, 12x "Book Online" (Carousel-Karten, führen auf `booking/markets?service=CLNCHK` bzw. Leistungs-Codes wie `INVISALN`, `SLPCONS`, `EMGNCY`, `VENCONS`, `WHTNG`, `COSCON`, `BOTOXCON`), 11x "More" (interne Leistungslinks). Der Servicecode wird als Query an den Funnel übergeben.

### 4. https://www.hellotend.com/site/dentist-studios/new-york-city/hygiene (Leistung x Stadt)

| Feld | Wert |
|---|---|
| Title | Dental Hygiene in New York City, NY, Tend Dental Studios |
| Meta-Description | Tend's dental hygienists in New York City focus on thorough cleanings and preventive guidance for a healthier smile. Book now to get started. |
| H1 | "Dental Hygiene Cleaning in New York City" |
| H2 / H3 | 16 H2 / 33 H3 |
| Schema.org | `FAQPage` mit 8 Fragen |
| Canonical | https://www.hellotend.com/site/dentist-studios/new-york-city/hygiene |

**Sektionen in DOM-Reihenfolge**

| Nr | Sektionstyp | Headline | Layout | Medien | CTA | Trust |
|---|---|---|---|---|---|---|
| 1 | Hero Hub | "Dental Hygiene Cleaning in New York City" | 3 Spalten, Breadcrumb "Locations / New York City" | 2 Fotos | Book Now |  |
| 2 | Foto-Marquee | (keine) | Marquee | 4 Fotos | keine |  |
| 3 | Standortliste | "Dental studios in New York City" | Liste + Karte | 16 Studios | "View All Locations", 6x "Book Now" |  |
| 4 | Versicherung | "Dental insurance coverage" | 2 Spalten + Tabs | 9 Logos, 2 iframes | "More Questions?" | 9 Versicherer |
| 5 | Leistungs-Slider | "Dental services in New York City" | Carousel | keine | "More", "Book Online" |  |
| 6 | Presse-Leiste | (keine) | 5 Logos | 5 Bilder | keine | Presse |
| 7 | Testimonials | "Why people love Tend" | Carousel | 10 Reviews | Pfeile | 5 Sterne |
| 8 | Textblock | "About dental cleanings in New York City" | Zentriert schmal | keine | keine |  |
| 9 | Blog-Teaser | "Blog" | 2 Spalten 4/8 | 3 Bilder | "View All Posts" |  |

Diese Seite ist das Muster für 120 Sitemap-URLs: 9 Märkte x 12 bis 14 Leistungen, jeweils eigener Title mit Ortszusatz.

### 5. https://www.hellotend.com/site/studios/hells-kitchen (Standortseite)

| Feld | Wert |
|---|---|
| Title | Dentist in Hell's Kitchen, Hell's Kitchen Dental Clinic |
| Meta-Description | Get quality dental care in Hell's Kitchen with expert cleanings fillings and more. Schedule your visit today. |
| H1 | "Tend Dental Hell's Kitchen" |
| H2 / H3 | 18 H2 / 36 H3 |
| Schema.org | `Dentist` (mit Adresse, `openingHoursSpecification` für 6 Wochentage, Telefon, `geo`, `parentOrganization`), `Organization`, `FAQPage` mit 6 Fragen |
| Canonical | https://www.hellotend.com/site/studios/hells-kitchen |

**NAP-Block (wörtlich):** "242 W 53rd St Ste A", "New York", "NY", "10019", "US", Telefon "(646) 582-0672". Öffnungszeiten: Montag 11:00 bis 19:00, Dienstag 07:00 bis 15:00, Mittwoch 09:00 bis 17:00, Donnerstag 11:00 bis 19:00, Freitag 11:00 bis 19:00, Samstag 08:00 bis 15:00, Sonntag Closed. Anreisehinweis: "Our studio is on 53rd Street between 7th and 8th Avenues, just a short walk from the Broadway theater district". Subway-Angaben: "7TH AVE" mit B, D, E und "57 ST-7 AV" mit N, Q, R, W.

**Sektionen in DOM-Reihenfolge**

| Nr | Sektionstyp | Headline | Layout | Medien | CTA | Trust |
|---|---|---|---|---|---|---|
| 1 | Hero Studio | "Tend Dental Hell's Kitchen" | 3 Spalten, Bilder unten ausgerichtet | 5 Fotos, `splide-studios-hero` | "Book Now", "(646) 582-0672" |  |
| 2 | Info-Leiste | (keine) | 3 Spalten 4/4/4 | keine | "Check Your Insurance" | "Today's Hours" als Tooltip, Adresse verlinkt auf `#find` |
| 3 | Testimonials | (keine) | 2 Spalten 8/4 | 1 Vimeo-Embed | keine | "63 Google Reviews", "4.4 average rating" mit 4 vollen Sternen, 5 Text-Reviews |
| 4 | Leistungsliste | "Dental services at Hell's Kitchen Tend Dental" | 2er-Kartenliste, 18 Leistungen | keine | "More", "Book Online" (13x) |  |
| 5 | Presse-Leiste | (keine) | 6 Logos | 6 Bilder | keine | Presse |
| 6 | Differenzierung | "The difference Tend Dental" | Zentriert schmal, Gradient-Hintergrund | keine | keine |  |
| 7 | Feature-Buttons | (keine) | 2-Spalten-Buttons, grün | keine | Convenient location, Emergency care, Family dental appointments, Most major insurance accepted, TV and free WiFi, Online appointment booking |  |
| 8 | Studio-Galerie | (keine) | 2 Slider (Desktop und Mobil getrennt) | 4 Bilder je Slider | keine |  |
| 9 | Zahnarzt-Teaser | "Our top-tier dental provider" | 1 Karte | 1 Foto | "More" | "Dr. William Ferrante" |
| 10 | Versicherung | "Dental insurance coverage" / "Our insurance carriers" | 2 Spalten + Tabs | 9 Logos, 2 iframes | "More Questions?" | 9 Versicherer |
| 11 | Presse/Versicherer-Galerie | (keine) | 5 Logos | 5 Bilder | keine |  |
| 12 | Kontakt | "Find Tend Dental in Hell's Kitchen" | Zentriert schmal | keine | keine |  |
| 13 | Kontakt-Tabs | "Address" / "How to get here" / "Hours" / "Other amenities" | 3er-Grid + Tabs (`Address`, `Hours`, `Other Amenities`) | Google-Maps-Embed, 2x | keine | 9 Amenities: Soothing studio, Noise-cancelling headphones, Free WiFi, Comfortable seating, Complimentary brush bag, Financing options, Intraoral cameras, Aromatherapy / scented diffusers, Laser dentistry |
| 14 | Karte | (keine) | Vollbreite | 1 Kartenbild | keine |  |
| 15 | FAQ-Akkordeon | "Frequently asked questions" | Zentriert | keine | keine | 6 Fragen als Schema |
| 16 | Nachbar-Standorte | "Nearby studios" | 3er-Karten-Grid | 9 Karten | "View New York Studios", 8x "More" | Entfernung "( mi)" pro Karte, im Rohzustand leer |
| 17 | Blog-Teaser | "Blog" | 2 Spalten 4/8 | 3 Bilder | "View All Posts" |  |

**CTA-Strategie:** 57 Button-Elemente, 13x "Book Online" (führt in den Service-Funnel), 21x "More" (interne Links), 5x "Call: (646) 582-0672", 2x "More Questions?". Telefonnummer ist standortspezifisch, nicht die Konzernnummer.

### 6. https://www.hellotend.com/site/about (Über uns)

| Feld | Wert |
|---|---|
| Title | About Our Tend Studios |
| Meta-Description | At Tend, we want you to feel confident about your oral health every time you eat, laugh, smile, or speak. Learn more about our dental care services. |
| H1 | "Look forward to visiting the dentist" (6 Wörter) |
| H2 / H3 | 13 H2 / 43 H3 |
| Schema.org | keine `ld+json`-Blöcke |

**Sektionen in DOM-Reihenfolge**

| Nr | Sektionstyp | Headline | Layout | Medien | CTA | Trust |
|---|---|---|---|---|---|---|
| 1 | Hero | "Look forward to visiting the dentist" | 2 Spalten, Model-Fotos | 2 Bilder | Book Now, Telefon |  |
| 2 | Foto-Marquee | (keine) | Marquee | 4 Fotos | keine |  |
| 3 | Quick-Links | "Quick Links:" | Carousel mit 7 Kategorien-Links | keine | Tend Dentists, Tend Leadership Team, Tend Dental Blog, Careers, Insurance, Innovation & Technology, Dental Wellness Plans |  |
| 4 | Zigzag-Text | "We've completely reimagined what dental care feels like" | 2 Spalten 50/50 | 1 Foto | "Find a Location", "Meet Our Leadership Team" | "Maybe you've experienced judgment, anxiety, or a lack of trust" |
| 5 | Werte-Intro | "What makes Tend different?" | Zentriert schmal | keine | keine |  |
| 6 | 3er-Grid | "Judgment-free care" | 3er-Grid | keine | keine | Judgment-free care, Beautiful relaxing studios, Only the care you need |
| 7 | 3er-Grid | "Modern technology for gentle, precise care" | 3er-Grid | keine | keine | Modern technology, Easy payment and financing, Caring professionals who love what they do |
| 8 | Galerie-Intro | "Step inside" | Zentriert, Gradient-Hintergrund | keine | keine |  |
| 9 | Feature-Buttons | (keine) | 2-Spalten-Buttons | keine | Family-friendly studios, Seamless online booking, Sedation dentistry, Soothing atmosphere, Clear claims process, Intraoral cameras |  |
| 10 | Studio-Slider | (keine) | 2 Slider (Desktop/Mobil) | 4 Bilder je | keine |  |
| 11 | Zitat mit Foto | "A word from our Chief Dental Officer" | 2 Spalten 4/8 | 1 Porträtfoto | keine | Zitat "Your mouth is in great hands at Tend." von Chris Salierno, Chief Dental Officer |
| 12 | Tech-Akkordeon | "Smart care starts with smart tech" | 2 Spalten 4/8, dunkler Callout | keine | keine | 6 `<details>`: Digital X-rays, 3D printing, Zoom! Teeth whitening system u. a. |
| 13 | Standortliste | "Find a Tend studio near you" | Liste + Karte | 33 Studios | "16 Studios", "8 Studios" usw. |  |
| 14 | Testimonials | "Why people love Tend" | Carousel | 10 Reviews | Pfeile | 5 Sterne |

### 7. https://www.hellotend.com/site/dentists (Team-Übersicht)

| Feld | Wert |
|---|---|
| Title | Dentists, Tend Dental |
| Meta-Description | Tend Dental delivers exceptional dental care with a modern approach that puts you first. Our expert dentists combine advanced technology with a personalized touch. |
| H1 | "Dentists" (1 Wort) |
| H2 / H3 | 5 H2 / 64 H3 |
| Schema.org | keine |
| Textmenge | 402 Wörter im `<main>` |

**Aufbau:** Zentrierter Banner mit H1 und 31-Wörter-Subline, dann ein 3er-Grid `showcaseFourColumns dentists` mit 61 Karten. Jede Karte: quadratisches Foto (`aspect-ratio: 1 / 1`, 299x299 px), Fachrichtung als Fließtext ("Orthodontist", "General Dentist"), `<h3>` mit Name als Link, "More"-Link. Keine Filter, keine Suche, keine Paginierung auf der Seite selbst. 61 Einzelprofile liegen in `/site/dentists-xml-sitemap`.

### 8. https://www.hellotend.com/site/blog (Ratgeber-Übersicht)

| Feld | Wert |
|---|---|
| Title | The Latest in Oral Health & Modern Dentistry, Tend Dental Blog |
| Meta-Description | From oral health tips and product recs to behind-the-scenes looks at our studios, the Tend Dental blog is your go-to for smarter care and everyday wellness. |
| H1 | "The Latest in Oral Health & Modern Dentistry from Tend" (10 Wörter) |
| H2 / H3 | 16 H2 / 3 H3 |
| Schema.org | keine |

**Aufbau:** Banner mit H1 und 24-Wörter-Subline, dann "Categories:" als Carousel mit 15 Kategorien (Treatment & Services, Orthodontics, Clear Aligners, Conditions & Symptoms, Oral Health Tips, Prevention, Patient Experience, Cosmetic Dentistry, Insurance & Billing, Emergencies, Studio News, Hygiene, Oral Surgery, Technology, Providers). Darunter 10 Beitragskarten mit Thumbnail, `<h2 class="title">`, Autor-Zeile "By Tend", Datum plus Kategorien, 2-Satz-Teaser und "Read more". Paginierung als numerische Liste: `1 2 3 Last`, "Page 1 of 14". 134 Blog-URLs in der Sitemap passen zu 14 Seiten mit 10 Einträgen.

### 9. https://www.hellotend.com/site/blog/2025/07/21/not-sure-you-can-trust-a-new-dentist-heres-what-you-can-expect-from-tend (Artikel)

| Feld | Wert |
|---|---|
| Title | Not Sure You Can Trust a New Dentist? Here's What You Can Expect from Tend |
| Meta-Description | If you're searching for a new dental off and feel a little nervous about it, you're definitely not the only one. Whether it's been a few months or a few years, Tend is here to help. |
| H1 | "Not Sure You Can Trust a New Dentist? Here's What You Can Expect from Tend" |
| H2 / H3 | 17 H2 / 3 H3, davon 11 H2 im Artikelkörper |
| Schema.org | keine `ld+json`-Blöcke, kein `Article`, kein `FAQPage` |

**Artikel-Aufbau (belegt):**

| Element | Befund |
|---|---|
| Inhaltsverzeichnis | `<div id="blog-table-of-contents">` mit `<h2>In this article:</h2>`. Die `<ul class="toc-list">` ist im HTML leer und wird per Inline-JS aus allen `<h2>` des Artikels erzeugt (Slugify entfernt Stoppwörter "the|a|an|at|and|or|to|in") |
| Autorenbox | Nur eine Zeile "By Tend" als `<p class="meta meta-author">`, kein Bild, keine Vita. Das JS entfernt `.meta`-Elemente nach dem Laden und baut eine Zeile mit Datum und "Last updated" |
| Lesezeit | nicht vorhanden |
| Datum | "Posted Jul 21st, 2025 in Patient Experience" |
| Key-Takeaways-Box | nicht vorhanden |
| Zwischen-CTAs | 1 CTA im ganzen Artikel ("Book Now" in der Schlusssektion "Your Healthier Smile Starts Here") |
| Verwandte Artikel | nicht vorhanden. Nach dem Artikel folgen direkt Footer-Blog-Teaser und Custom-Footer |
| FAQ | nein |
| Textlänge | 1.211 Wörter im Artikelkörper, 1.338 Wörter im `<main>` |
| Bilder | 0 im Artikelkörper, 1 Beitragsbild der Klasse `tymbrelGalleryItems` mit Fancybox-Lightbox und `sr-only`-Bedienhilfe |
| Interne Links | 1 im Artikelkörper ("dentist at Tend" auf `/site/home`) |
| Share | AddToAny mit Facebook, Messenger, X, Email, `a2a_dd` |
| Fortschrittsanzeige | `.blog-progress-wrapper` mit `.blog-progress-bar`, per Inline-JS erzeugt, `position: sticky; top: 0; height: .3125rem`, Balkenfarbe `var(--alert-400)`, `transition: width 0.1s ease-out` |
| Sticky-Sidebar | `#blog-table-of-contents{position:sticky;top:5.25rem;padding:2rem 1.75rem}` |
| Autor-Kategorie-Links | Kategorie "Patient Experience" auf `/site/blog/category/patient-experience` |

Die Artikel-Sektion "What Tend Members Are Saying" enthält 3 wörtliche Patientenzitate ohne Namen, ohne Quelle, ohne Schema-`Review`. Das ist der einzige Trust-Block im Artikel.

### 10. https://www.hellotend.com/site/faqs (FAQ-Zentrum)

| Feld | Wert |
|---|---|
| Title | Frequently asked questions, Tend Dental FAQs |
| Meta-Description | Explore our most frequently asked questions (FAQs) to learn everything you need to know about Tend Dental. |
| H1 | "Frequently asked questions" (3 Wörter) |
| H2 / H3 | 12 H2 / 3 H3 |
| Schema.org | `FAQPage` mit 41 Fragen |
| Accordion-Items | 40 sichtbar, 41 im Schema |

**Aufbau:** Banner, "Categories:"-Carousel mit 6 Themen (Booking, Your Visit, Insurance, Studio, Whitening, Billing), dann je Kategorie ein `<ul class="accordion">` mit `data-accordion-item`. Fragen als `<a href="#" class="accordion-title">`, Antwort in `<div class="accordion-content">`. Erste Fragen: "Why can't I choose a provider for my initial visit?", "How will I know which dentist or hygienist I'll be seeing?", "Can I request a different dentist or hygienist than I'm scheduled to see?", "How do I reschedule or cancel my appointment?", "How experienced are your dentists?", "What services do you offer?"

### 11. https://www.hellotend.com/site/insurance (Versicherung)

| Feld | Wert |
|---|---|
| Title | Dental Insurance Coverage, Tend Dental |
| Meta-Description | Tend Dental accepts most major PPO dental insurance plans, helps you understand and get the most out of your coverage, and handles the paperwork for you. |
| H1 | "Dental insurance at Tend" |
| H2 / H3 | 14 H2 / 5 H3 |
| Schema.org | `FAQPage` mit 30 Fragen |
| Details-Elemente | 6 |

**Sektionen:** Hero, Foto-Marquee, Erklär-Zigzag ("We're here to help you navigate your coverage"), Versicherungsblock (9 Logos, `Check your insurance`-iframe, Tabs), Prozess-Intro ("The insurance process at Tend"), 2-Spalten-Prozess (`In-network insurance steps` / `Out-of-network insurance steps`, je 3 Schritte), "No dental insurance? We can help.", "How insurance fits into your final bill", "Pay with HSA or FSA", FAQ-Akkordeon (29 sichtbare Items, 30 Schema-Fragen).

**Prozess-Schritte (wörtlich, In-Network):** "Insurance check", "Coverage estimate", "Claim submission". Out-of-Network: "Insurance check", "Coverage overview", "Claim submission", mit dem Hinweis "We'll ask that you pay in full upfront, or in some cases, split payments, with 50% due upfront and the remainder after your claim is processed."

### 12. https://www.hellotend.com/site/payment-financing (Zahlung und Finanzierung)

| Feld | Wert |
|---|---|
| Title | Payment & Financing Options, Tend Dental |
| Meta-Description | Learn about payment and financing options at Tend Dental that help take the stress out of make caring for your smile. |
| H1 | "Payment & Financing Options at Tend" |
| H2 / H3 | 12 H2 / 4 H3 |
| Schema.org | `FAQPage` mit 14 Fragen |
| Details-Elemente | 1 |

**Sektionen:** Hero, Foto-Marquee, Zahlungs-Zigzag ("Simple, convenient and secure online payment" mit CTAs "Access your bill" und "Questions? Learn More"), Finanzierungs-Zigzag ("Flexible financing with" und `<h3>Applying is easy</h3>`), FAQ-Akkordeon (14 sichtbare Items, 14 Schema-Fragen), Blog-Teaser.

### 13. https://www.hellotend.com/site/search (Standortsuche)

| Feld | Wert |
|---|---|
| Title | Studio Search |
| Meta-Description | leer |
| H1 | "Find Your Tend Dental Studio" |
| H2 / H3 | 5 H2 / 37 H3 |

Ein Inline-Skript am Anfang von `<main>` erzwingt beim Aufruf ohne Query-Parameter eine Weiterleitung: `window.location.href = "?q=Leipzig SN, DE"`. Danach folgen ein Geolocation-Suchfeld (`#searchDiv`, `gmp-place-autocomplete`, `#useMyLocation`), ein Tooltip-Template für Öffnungszeiten und 33 Studioergebnisse als `<li>` mit `data-latitude`, `data-longitude`, `data-full-address`, `data-code`. Ohne JavaScript ist die Seite eine Weiterleitungs- und Liste-Seite.

### 14. https://www.hellotend.com/site/sitemap (HTML-Sitemap)

H1 "Sitemap", 525 interne Links, `<ul class="sitemap">` mit `<ul class="sitemap-level2">`. Listet Leadership-Profile, Karriereseiten, Versicherung, Dental Plans je Stadt, Studios, Leistungen, Blog-Kategorien und Blog-Archiv.

### 15. https://www.hellotend.com/booking/markets (Funnel Schritt 1)

| Feld | Wert |
|---|---|
| Title | Choose City, Booking |
| Meta-Description | Online booking available. Choose your location and time |
| H1 | "Choose a city" (in `<main id="content">`) |
| Stack | Next.js, Material UI |

**Aufbau:** Links eine Liste `<ul id="markets-list">` mit 6 Einträgen, jeder ein `<a href="/booking/markets?market=<slug>">` mit stark gesetztem Ortsnamen, "N studio"/"N studios" als Subline und Pfeil-SVG. Rechts ein Contentful-Hero-Bild (`Suite-test-4800x3200.jpg`, 4.800x3.200 px). Der Einstieg ist ein reiner Klickpfad, keine Datenerhebung. Marktzahlen wörtlich: Westport "1 studio", New York City "16 studios", Washington DC Metro "8 studios", Atlanta "3 studios", Nashville "1 studio", Boston (abgeschnitten). Cookie-Hinweis mit "Dismiss" und Link auf `/terms#cookies`.

### 16. https://www.hellotend.com/booking/services?market=new-york-city (Funnel Schritt 2)

| Feld | Wert |
|---|---|
| Title | Services, Booking, Tend |
| Meta-Description | leer |
| H1 | "How can we help?" |

**Aufbau:** `<ul id="booking-services-list">` mit 6 Leistungs-Kacheln, jede mit SVG-Icon, starkem Label, erklärender Subline und Pfeil. Wörtlich:

| Label | Subline | Ziel |
|---|---|---|
| Dental Exam | "Routine cleaning, x-rays, and exam" | `/booking/services?service=CLNCHK` |
| Clear Aligners | "Discreet, removable dentist-led aligners" | `/booking/studios?service=INVISALN` |
| Emergency | "We'll see you asap" |  |
| (Sleep) | "Consultation for better sleep & breathing" |  |
| Cosmetic | "Veneers, whitening, and more" |  |
| Procedures | "Injectables for jaw pain, implants, and more" |  |

Verlauf: Markt wählen, dann Leistung wählen, dann Studio, dann Termin. Persönliche Daten kommen erst nach der Leistungswahl. Microcopy auf den Buttons: keine Zusätze wie "kostenlos" oder "unverbindlich", stattdessen Ergebnisversprechen ("We'll see you asap").

### 17. https://www.hellotend.com/site/services/orthodontics-copy-treatment-calc (Rechner)

| Feld | Wert |
|---|---|
| Title | Orthodontics at Tend |
| H1 | "Orthodontics at Tend, TREATMENT CALCULATOR IP" |
| H2 | 23 |

**Rechner** (`<div id="costCalculator">`, Klasse `cost-calc-blur`): Abschnitt "Orthodontic Treatment Calculator", Microcopy "*Orthodontic treatment at Tend generally falls within the $6500-$7500 range, and we offer financing via CareCredit. Costs vary based on insurance coverage." Darunter ein `<fieldset id="costCalc">` mit 3 numerischen Eingaben (Treatment Cost, Down Payment, Insurance Coverage, je mit `inputmode="numeric"` und `pattern="^[0-9]{1,10}"`), 2 Radio-Buttons (Payment Length: 24 Months vorausgewählt, 36 Months) und einer Read-only-Ausgabe "Your estimated cost is: $ 0 /month". Vor der Freischaltung ist der Rechner per CSS verdeckt: `.cost-calc-blur .calc-blur-wrap.cost-calc-hidden #costCalc{filter:blur(3px);opacity:0.7}` und darüber ein zentrierter Button "Reveal Calculator" (`position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)`). Ausgabe heißen "Your estimated cost is:" und "/month". Keine Datenerhebung im Rechner.

## Design-System

### Fonts

Zwei Familien, beide selbst gehostet mit `font-display:swap`, je in WOFF2 und WOFF:

| Familie | Rolle | Gewichte | Dateien |
|---|---|---|---|
| Founders Grotesk | Body, UI, Buttons (`--ff-primary`) | 300, 400, 500, 600, 700 | `founders-grotesk-light/regular/medium/semibold/bold.woff2` |
| Nantes | Display, alle H1 bis H3 (`--ff-secondary`, Serif) | 300, 400, 400 italic, 700 | `NantesWeb-Light/Regular/RegularItalic/Bold.woff2` |
| FontAwesome | Icons | 1 | `fontawesome-webfont.woff2` |

Keine Google-Fonts- oder Adobe-Fonts-Einbindung. Heading-Regel wörtlich: `h1,.h1,.h1-sm,.h1-lg,h2,.h2,.h2-lg{font-weight:700;font-family:var(--ff-secondary)}`. Body: `body{background-color:var(--neutral-100);font-family:var(--ff-primary);line-height:1.45;color:var(--text);font-size:var(--fs-body);font-weight:400;letter-spacing:.01em}`.

### Farbsystem (Custom Properties aus `:root`)

**Neutral**

| Token | Wert | Rolle |
|---|---|---|
| `--neutral-100` | #ffffff | Hintergrund, Text auf Akzent |
| `--neutral-200` | #f9f9f6 | Helle Fläche |
| `--neutral-300` | #f4f2ef | Fläche |
| `--neutral-400` | #d1ccc2 | Rahmen |
| `--neutral-500` | #efede9 | Fläche, Progress-Track |
| `--neutral-700` | #3b3b3c | Text |
| `--neutral-800` | #0a0a0a | Text/Hover |
| `--neutral-900` | #000000 | Button-Hover-Text |
| `--text` | #6c675c | Fließtext (Warmgrau) |

**Primary (Braun, warm)**

| Token | Wert |
|---|---|
| `--primary-100` | #f8f3ee |
| `--primary-200` | #f2e6dc |
| `--primary-300` | #ebdacb |
| `--primary-350` | #ffb6a8 |
| `--primary-400` | #bc8452 |
| `--primary-500` | #a57448 |

**Secondary (Graubraun)**

`--secondary-100` #f5f5f4, `--secondary-200` #f0f0ef, `--secondary-300` #e9e8e7, `--secondary-400` #6c675c, `--secondary-500` #524e46

**Success (Petrol/Dunkelgrün, Haupt-Akzent der Seite)**

| Token | Wert | Rolle |
|---|---|---|
| `--success-100` | #f5f7f7 | Fläche |
| `--success-200` | #f0f3f2 | Fläche |
| `--success-300` | #e9edec | Fläche |
| `--success-350` | #eaf4eb | Kachel- und Accordion-Fläche |
| `--success-380` | #bcd3bd | Button-Hover in Qualifier-Kacheln |
| `--success-400` | #698680 | Button-Grundfarbe, H1/H2-Textfarbe |
| `--success-450` | #415f5a | |
| `--success-500` | #5c7570 | Button-Hover |
| `--success-600` | #36514c | Dunkle Callout-Flächen, Header-Nav |
| `--success-700` | #22322f | |

**Alert (Korall)**

`--alert-100` #fff8f6, `--alert-200` #fff0ee, `--alert-300` #ffe9e5, `--alert-400` #ffb6a8 (Progress-Balken), `--alert-500` #df9f93

**Accent (Blau, nur Sekundär-Button) und Accent2 (Lime)**

`--accent-400` #0178d1, `--accent-500` #0169b7, `--accent2-400` #e7fb7e, `--accent2-text` = `--text`

**Weitere Einzelwerte:** `--emergency` #ff0000, `--stars` #ffcc00

Häufigste Hex-Werte im CSS: #fff (18x), #ccc (4x), #ffcccb (3x), #ff0000 (3x), #eaf4eb (3x), #e7fb7e (3x), #36514c (3x). Häufigste `rgba()`: `rgba(255,255,255,0)`, `rgba(0,0,0,0.1)`, `rgba(54,81,76,0)`, `rgba(234,244,235,0)`.

### Radius

| Wert | Vorkommen | Verwendung |
|---|---|---|
| `var(--border-radius)` = 1,5625 rem | 43x | Karten, Kacheln, Accordions, Bilder |
| `var(--border-radius-btn)` = 3,125 rem | 27x + 10x in Kombination | alle Buttons, pill |
| `50%` | 11x | Avatare, runde Icons |
| `0` | 11x | Reset |
| 500px | 6x | Pill-Varianten |
| 1,875 rem | 5x | |
| `var(--border-radius-xlg)` = 12,875 rem | 2x + 2x mit `!important` | Hero-Bilder, Oval-Porträts |

### Shadows

| Wert | Häufigkeit | Kontext |
|---|---|---|
| `none` | 7x + 2x `!important` | bewusst flach |
| `0 0 1,875rem 0 rgba(0,0,0,0.15)` | 2x | schwebende Overlays |
| `0 0 1,5625rem 0 rgba(0,0,0,0.1)` | 2x | Overlays |
| `0 0 0 2px var(--success-400)` | 2x | Fokusring |
| `0 0 0 2px var(--neutral-100), 0 0 0 4px var(--success-400)` | 1x | Doppelter Fokusring |
| `var(--box-shadow)` = `0 1,5625rem 1,5625rem 0 rgba(0,0,0,0.1)` | 1x | definiert, selten genutzt |
| `0 0 1,25rem 0 rgba(0,0,0,0.1)` | 1x | |
| `0 0 ,3125rem #ccc` | 1x | |

Das System arbeitet fast schattenfrei. Tiefe entsteht über Flächenfarben und Radien, nicht über Shadows.

### Spacing und Container

| Token | Wert | Rolle |
|---|---|---|
| `--max-width` | 82,25 rem (1.316 px) | Inhaltsbreite |
| `--max-width-padding` | 84,75 rem (1.356 px) | Container inkl. Padding |
| `--max-width-wide` | 91,25 rem | breite Variante |
| `--max-width-wide-padding` | 93,75 rem | |
| `--padding` | 1,25 rem | Spalten-Innenabstand |
| `--double-padding` | 2,5 rem | doppeltes Padding |
| `--space-10` bis `--space-160` | 0,625 rem bis 10 rem | Sektionsabstände, ab `--space-30` fluid per `clamp()` |
| Zeilenabstand Standard | `--space-60` = 2,5 bis 3,75 rem | `.tymbrel-row{margin-block:var(--space-60) 0}` |

Grid: `.tymbrel-row` ist ein Flex-Wrap-Container mit `max-width:var(--max-width-padding)` und `justify-content:center`. Spalten `.tymbrel-col-{3,4,6,8,12}` haben `max-width:calc(var(--max-width-padding) / 12 * N)`. `.full-width` setzt `max-width:none`, die inneren Spalten behalten ihre Breite. Mobile: `.tymbrel-col-6{width:100%}`.

### Typo-Skala

| Token | Wert |
|---|---|
| `--fs-h1-lg` | `clamp(2.5rem, calc(5vw - 0.5rem), 3.9375rem)` |
| `--fs-h1` | `clamp(2.5rem, calc(5vw - 0.5rem), 3.625rem)` |
| `--fs-h1-sm` | `clamp(2.5rem, calc(5vw - 0.5rem), 3.125rem)` |
| `--fs-h2-lg` | `clamp(2rem, calc(4.5vw - 0.5rem), 3rem)` |
| `--fs-h2` | `clamp(1.875rem, calc(4.5vw - 0.5rem), 2.375rem)` |
| `--fs-h3` | `clamp(1.5rem, calc(4vw - 0.5rem), 1.875rem)` |
| `--fs-h4` | `clamp(1.3125rem, calc(3.5vw - 0.5rem), 1.5rem)` |
| `--fs-h5` | `clamp(1.25rem, calc(3.25vw - 0.5rem), 1.3125rem)` |
| `--fs-h6` | 1,125 rem |
| `--fs-leadin` | `clamp(1.25rem, calc(4vw - 0.5rem), 1.375rem)` |
| `--fs-md` | `clamp(1.125rem, calc(4vw - 0.5rem), 1.25rem)` |
| `--fs-body` | 1,0625 rem (17 px) |

Line-Heights: H1 `1.1904761905`, H2 `1.3157894737`, H2-lg `1.2916666667`, `.leadin` `1.4090909091`, Body `1.45`. Letter-Spacing: Body `.01em` (24x im CSS), Uppercase-Elemente `.08em` bis `.1em`. Kein Letter-Spacing-Trick auf H1 oder H2.

Uppercase wird nur bei kleinen Meta-Elementen eingesetzt: `.preheading,.author` (`.9375rem`, `letter-spacing:.1em`, `font-weight:500`, `text-transform:uppercase`, `color:var(--success-400)`), Blog-Meta, Share-Überschrift, Slider-Weiter-Label.

**Buttons (Basis, wörtlich):** `padding:.75rem 1.875rem .75rem;border:.125rem solid transparent;border-radius:var(--border-radius-btn)` plus `font-weight:600;font-size:.9375rem;line-height:1.25;transition:all 0.2s ease-out;letter-spacing:.08em;text-transform:uppercase`. Kleine Variante: `padding:.53125rem 1.5625rem`.

| Klasse | Grundfarbe | Hover |
|---|---|---|
| `.cms-button-primary` | `background:var(--primary-400);color:var(--primary-text)` | `--primary-500` |
| `.cms-button-secondary` | `background:var(--accent-400);color:var(--accent-text)` | `--accent-500` |
| `.cms-button-success` | `background:var(--success-400);color:var(--success-text)` | `--success-500` |
| `.cms-button-alert` | `background:var(--neutral-100);color:var(--accent-400);border-color:var(--accent-400)` | invertiert zu `background:var(--accent-400)` |
| `.cms-button-text` | `color:var(--primary-400)`, mit `::after` Pfeil aus FontAwesome | `--primary-500` |
| `.qualifiers .cms-button-success` | `background:var(--success-350);color:var(--secondary-400);border-radius:var(--border-radius);min-height:5.625rem;font-size:var(--fs-h3);text-transform:unset` | `--success-380` |

Auf dunklem Grund (`--success-600`) dreht sich der Success-Button: `.calloutSuccess .cms-button-success{background-color:var(--neutral-100);color:var(--neutral-900)}` mit Hover auf Schwarz.

### Bilder

| Maßnahme | Startseite | Leistungsseite | Studio-Seite |
|---|---|---|---|
| `<img>` gesamt | 39 | 28 | (viele) |
| `loading="lazy"` | 31 | 13 | |
| `srcset` | 68 | 30 | |
| `fetchpriority="high"` | 6 | 5 | |
| `<picture>` | 26 | 11 | |
| Formate | WebP + JPG als `<source>`-Paar, PNG für Logos, SVG für Logos und Icons | dito | dito |

Kein AVIF. Bilder laufen über vier Cloudfront-Hosts (`d207pkrvhz1w8t`, `d2zp5xs5cp8zlg`, `d2l4d0j7rmjb0n`, `d2wy8f7a9ursnm`), alle per `<link rel="preconnect">` vorgeladen. Vimeo-iframes nutzen Player-Facade: `data-src` statt `src`, Ladeschwellwert `threshold:.25`, Klick auf `.video-start` lädt und startet den Player.

### Tech-Stack

| Schicht | Befund |
|---|---|
| CMS Marketing | Tymbrel (`<meta name="generator" content="Tymbrel ( www.tymbrel.com )" />`), HTML-Kommentar am Dateiende: "S: us-app02 / C: 3658 / V: 3935" |
| CMS Buchung | Next.js mit Material UI (`MuiButtonBase-root`, `__NEXT_DATA__`, `/_next/static/chunks/*`), Contentful als Bildquelle (`images.ctfassets.net`) |
| JS-Bibliotheken | jQuery 3.6.3, Splide + Splide AutoScroll, Vanilla-LazyLoad 16.1.0, autoComplete.js 10.2.9, Fancybox 3.6.3 (Artikel-Galerie), AddToAny |
| Fehlermonitoring | Bugsnag (`releaseStage: 'production'`) |
| Tag-Manager | Google Tag Manager `GTM-NQ88W4P` (einziger Analytics-Marker im Marketing-HTML) |
| Karten | Google Maps JS API + Embed, Standortsuche über `location-selector.js` |
| Video | Vimeo Player API |
| Consent | kein Consent-Management-Tool im Marketing-HTML. In der Buchungs-App nur ein Hinweis-Banner mit "Dismiss" |
| Fonts | selbst gehostet, kein Drittanbieter |

## Animationen

### Transitions (aus `custom-style-v30.css`, aggregiert)

| Deklaration | Häufigkeit |
|---|---|
| `all 0.2s ease` | 6x |
| `opacity 0.2s ease-out` | 5x |
| `none !important` | 5x |
| `all 0.2s ease-out` | 5x |
| `background-color 0.2s ease-out` | 4x |
| `background 0.2s ease-out` | 4x |
| `color 0.2s ease-out` | 3x |
| `width 0.2s ease-out` | 2x |
| `top 0.2s ease-out, height 0.2s ease-out` | 2x |
| `opacity 0.3s` | 2x |
| `font-size 0.2s ease-out` | 2x |
| `all 0.5s ease` | 2x |
| `all 0.3s ease-in-out` | 2x |
| `border-radius 0.55s ease-in-out` | 1x |
| `transform 0.6s ease-in` | 1x |
| `background-color 0.5s ease-in-out` | 1x |
| `all 0.4s ease, border-radius 0.5s ease` | 1x |
| `all 0.5s ease, border-radius 0.5s ease` | 1x |
| `.25s all ease` | 1x |

Dominantes Muster: 0,2 s, `ease-out`, auf `background-color`, `color`, `opacity` und `all`. Keine `cubic-bezier()`-Definitionen im gesamten CSS.

### @keyframes

| Name | Inhalt | Verwendung |
|---|---|---|
| `moveSlideshow` | `0%{transform:translateX(0)} 100%{transform:translateX(-50%)}`, ab 900 px Breite `translateX(-33.3333%)` | Foto-Marquees `.hero-section-mob-slider-auto ul`, `width:113.5rem` (mobil) bzw. `170.25rem` (ab 900 px), `gap:1.25rem`, `animation:moveSlideshow 25s linear infinite`, `will-change:transform`. Startet pausiert (`animation-play-state:paused`) |
| `fadeInCloseBtn` | `0%{opacity:0} 100%{opacity:1}` | Schließen-Button |

Nur 2 Keyframes im gesamten CSS.

### Motion-Bibliotheken

| Bibliothek | Befund |
|---|---|
| Splide + AutoScroll | ja, Hauptanimationsträger |
| GSAP | nein (0 Treffer) |
| ScrollTrigger | nein |
| Lenis | nein |
| Framer Motion | nein |
| AOS | nein (0 Treffer für `aos-init`, `fade-up`, `data-aos`, `reveal`) |
| Lottie, Rive, Three.js | nein |
| Webflow-Interactions | nein (kein `data-w-id`) |
| IntersectionObserver | ja, 2 Verwendungen (Parallax und Vimeo-Lazy-Load) |
| requestAnimationFrame | ja, 2 Verwendungen (Parallax-Loop, `<details>`-Expander) |

### Scroll-Reveal-Muster

Es gibt kein Scroll-Reveal. Keine Einblend-, Stagger- oder `is-visible`-Klassen im HTML. Der einzige scrollgesteuerte Effekt ist Parallax auf `.parallaxImg` (siehe unten) plus `.header--a.scroll` ab 46 px Scrolltiefe.

### Parallax (exakt)

`.parallaxImg{will-change:transform;transform:translateY(var(--parallax, 0px));transition:transform 0.1s linear;backface-visibility:hidden}`

JS: Klasse `parallaxImg--slow` setzt `__parallaxSpeed = .1`, sonst `.17`. `parallaxImg--reverse` spiegelt das Vorzeichen. Der Versatz wird als CSS-Variable `--parallax` in px geschrieben, berechnet aus der Elementmitte relativ zur Viewportmitte, normiert auf `[-1, 1]` und multipliziert mit `Höhe x Speed`. Aktivierung erst ab `IntersectionObserver` mit `threshold: 0`. Ein Resize-Listener initialisiert neu.

### Auto-Scroll-Geschwindigkeiten (Splide AutoScroll)

| Slider | Speed | Gap | Breakpoints |
|---|---|---|---|
| `.splide-notes` (Header-Topbar) | 0,3; ab 1700 px 0,28; ab 640 px 0,2 | 7vw, ab 950 px 1.875rem | `type:loop, autoWidth:true, drag:true, pauseOnHover:true, pauseOnFocus:true` |
| `.splide-logos` (Presse) | 0,2 | 4vw | `type:loop, autoWidth:true` |
| `.splide-categories` | 0,2; ab 1700 px 0,28 | 2.25rem | `perPage:4`, ab 1150 px 3, ab 950 px 2 |
| Qualifier-Slider `.splide--qualifiers-a` | kein AutoScroll | 2.5rem | `type:loop, perPage:3`, ab 950 px 2 |
| Reviews `.splide--reviews` | kein AutoScroll | 2.5rem | `type:loop, autoWidth:true, focus:center, perPage:3` |
| `.splide-blog` | kein AutoScroll | 2.25rem | `type:slide, perPage:3`; ab 950 px `type:loop, autoWidth:true, focus:center` |

Bei `prefers-reduced-motion: reduce` wird jeder AutoScroll auf `speed: "none"` gesetzt und die Pfeile werden sichtbar geschaltet.

### Weitere Bewegung

| Effekt | Befund |
|---|---|
| Zähler-Animation | nicht vorhanden |
| Marquee | ja, `moveSlideshow` (Fotos) und Splide AutoScroll (Logos, Kategorien, Topbar) |
| Sticky-Sections | `#sticky` (Mobile-Tapbar), `.header__nav{position:fixed}`, `.blog-progress-wrapper{position:sticky;top:0}`, `#blog-table-of-contents{position:sticky;top:5.25rem}` |
| Video-Autoplay | nein, Klick auf `.video-start` startet |
| Header-Shrink | ja, `.header--a.scroll` ab 46 px Scrolltiefe ändert Logo-Größe, Telefonbutton, Button-Padding, Nav-Position |
| Akkordeon (`<details>`, Service- und About-Seiten) | Web-Animations-API: Öffnen `duration:400, easing:"ease-out"`, Schließen `duration:200, easing:"ease-in-out"`, animierte Eigenschaft `height` |
| "View More" Listen | jQuery `slideDown(200)` / `slideUp(200)`, mobil andere Sichtbarkeitsgrenze (`Math.min(n,4)`) |
| Fortschrittsbalken Artikel | `.blog-progress-bar{transition:width 0.1s ease-out}`, Breite per Scroll-Listener |
| Hero-Read-More | `.hero__text[data-truncate-lines]` mit Zeilenbegrenzung, Button-Toggle ändert Text zwischen "Read more" und "Read less" |
| Rechner-Reveal | statisch per CSS-Klasse, `filter:blur(3px);opacity:0.7` zu scharf |

### Reduced Motion

Zwei Blöcke:

```
@media (prefers-reduced-motion: reduce){html:focus-within{scroll-behavior:auto}*,*::before,*::after{animation-duration:0.01ms !important;animation-iteration-count:1 !important;transition-duration:0.01ms !important;scroll-behavior:auto !important}}
@media (prefers-reduced-motion: reduce){.parallaxImg{transform:none !important;transition:none !important}}
```

Zusätzlich im JS: Parallax wird bei `prefers-reduced-motion` gar nicht initialisiert, AutoScroll auf `"none"` gesetzt, Slider-Pfeile auf sichtbar geschaltet.

### Hover-Effekte

Aus 211 Regeln mit `:hover` oder `:focus`:

| Geänderte Eigenschaft | Häufigkeit |
|---|---|
| `color` | 85x |
| `background-color` | 62x |
| `opacity` | 36x |
| `background` | 20x |
| `box-shadow` | 6x |
| `font-size` | 3x |
| `border-color` | 3x |
| `padding` | 2x |
| `transform` | 1x |

Kein Scale, kein Translate, kein Lift auf Karten. Buttons wechseln die Flächenfarbe und behalten die Form. Bilder haben keinen Hover-Zoom.

## Synthese

### 1. Seitentyp-Blueprints

Zählbasis: sichtbare Sektionen in DOM-Reihenfolge. Besteht eine Sektion im HTML aus mehreren `<div class="tymbrel-row">`, ist das vermerkt. Gemessene Top-Level-`tymbrel-row`-Blöcke im `<main>`: Startseite 13, Leistungsdetail 16, Standortseite 24, Über-uns 16, Leistung-x-Stadt 15, Versicherung 10, Zahlung 7, Ratgeber-Übersicht 2, Artikel 2, Funnel-Schritte je 1.

**Startseite** (17 Sektionen, aus 13 main-Blöcken, Header, Sticky-Bar und 3 Footer-Blöcken)
1. Fixierter Header mit Nutzen-Marquee, Standortsuche, Book-Now-Button, Telefonnummer, Layout: Full-bleed
2. Hero, 3 Spalten 4/4/4, H1 mit Nutzenumkehr, 2 Model-Fotos mit gegenläufigem Parallax, Layout: 3er-Grid
3. Qualifier-Kachel-Slider, 7 Leistungen als große Flächen-Buttons, Layout: Carousel
4. Foto-Marquee, 4 Hochformat-Bilder, Layout: Marquee
5. Video plus Nutzen-Text, 2 Spalten 50/50, Vimeo-Facade links, 8.000-Reviews-Claim rechts, Layout: 2-Spalten 50/50
6. Feature-Button-Grid, 12 Einträge, 8 sichtbar, "View More", Layout: 2er-Grid
7. Testimonial-Slider, 10 Reviews mit Studiozuordnung, Layout: Carousel
8. Standort-Intro, zentriert schmal
9. Marktliste plus Karten-Embed, 2 Spalten 50/50, 33 Studios mit Koordinaten, Layout: 2-Spalten 50/50
10. Versicherungs-Block, 2 Spalten 50/50 plus Tabs, 9 Logos, Checker-iframe, Layout: Tabs
11. Klinik-Team, 3 Spalten 4/4/4, Oval-Bilder plus 4 Icon-Benefits, Layout: 3er-Grid
12. Team-Marquee
13. Blog-Teaser, 2 Spalten 4/8 plus per JS umgebauter Splide, Layout: 2-Spalten 40/60
14. Presse-Logos, 9 Medien, Layout: Marquee
15. Final-CTA mit Hintergrundbild, 2 Spalten 8/4
16. App-Download, QR plus Store-Badge, Layout: 3er-Grid
17. Sticky-Tapbar mobil

**Leistungsdetailseite** (14 Sektionen, aus 16 main-Blöcken: Leistungs-Intro und Karten-Slider sowie Blog-Kopf und Blog-Slider sind je zwei Blöcke)
1. Hero intern, 3 Spalten, Breadcrumb, H1, Nutzen-Subline mit Zeilenklemme plus "Read more", Checkliste, Sterne-Claim, Book Now, Telefon
2. Standort-Slider mit Servicecode, per JS aus Geolocation gefüllt
3. Foto-Marquee
4. Warum-Sektion, 2 Spalten 50/50, Foto plus Argumentationstext, Textlink "Check insurance"
5. Feature-Intro zentriert schmal
6. Vimeo-Facade 16/9, max-width 53,125 rem
7. Was-enthalten-ist, 2 Spalten 4/8, dunkelgrüner Callout, 6 `<details>`
8. In-der-Suite, 2 Spalten, Bild rechts, Checkliste mit Garantie-Aussage
9. Versicherung, 2 Spalten plus Tabs plus Checker-iframe
10. FAQ-Akkordeon, 9 Fragen, Schema-FAQPage mit denselben 9 Fragen
11. Testimonial-Slider
12. Andere Leistungen, Carousel, 12 Karten
13. Presse-Leiste
14. Blog-Teaser

**Standortseite** (17 Sektionen, aus 24 main-Blöcken: Versicherungsblock und Kontakt-Tabs sind je mehrere Blöcke)
1. Hero Studio, 3 Spalten, studienspezifische Telefonnummer
2. Info-Leiste, 3 Spalten 4/4/4: Öffnungszeiten-Tooltip, Adresse mit Anker, "Check Your Insurance"
3. Testimonials mit Google-Rating und Review-Zahl, 2 Spalten 8/4 plus Vimeo
4. Leistungsliste, 18 Leistungen als Karten mit "Book Online"
5. Presse-Leiste
6. Differenzierung, zentriert, Gradient
7. Feature-Buttons, 6 Kriterien, grüne Fläche
8. Studio-Galerie, 2 getrennte Slider für Desktop und Mobil
9. Zahnarzt-Karte
10. Versicherung, Tabs plus Checker
11. Logo-Galerie
12. Kontakt-Intro zentriert schmal
13. Kontakt-Tabs (Address, Hours, Other Amenities) plus Karte plus 9 Amenities
14. Vollbreites Kartenbild
15. FAQ-Akkordeon, 6 Fragen (Schema-FAQPage mit 6 Fragen)
16. Nachbar-Standorte, 3er-Grid mit Entfernungsangabe
17. Blog-Teaser

**Über-uns** (14 Sektionen, aus 16 main-Blöcken: Studio-Galerie ist ein Doppelblock für Desktop und Mobil)
1. Hero 2-spaltig, 2. Foto-Marquee, 3. Quick-Links-Carousel mit 7 Zielen, 4. Reimagined-Zigzag 2 Spalten mit 2 CTAs, 5. Werte-Intro schmal, 6. 3er-Grid Judgment-free care, 7. 3er-Grid Modern technology, 8. Galerie-Intro, 9. Feature-Buttons 2er, 10. Studio-Slider doppelt, 11. Chief-Dental-Officer-Zitat 2 Spalten 4/8, 12. Tech-Akkordeon 2 Spalten 4/8, 13. Standortliste plus Karte, 14. Testimonial-Slider

**Ratgeber-Übersicht** (5 Sektionen, aus 2 main-Blöcken plus Footer)
1. Banner mit H1 plus Subline, 2. Kategorie-Carousel mit 15 Kategorien, 3. 10 Beitragskarten mit Thumbnail, H2, Autor, Datum, Kategorien, 2-Satz-Teaser, "Read more", 4. Numerische Paginierung "Page 1 of 14", 5. Footer mit Blog-Teaser und Presse

**Artikel** (3 Sektionen, aus 2 main-Blöcken plus Footer)
1. Beitragsbild-Galerie mit Fancybox, 2. Sticky-Fortschrittsbalken plus 2 Spalten 4/8 (links Share plus sticky TOC, rechts Meta-Zeile, 11 H2 mit Fließtext, Schluss-CTA), 3. Footer

**Funnel** (mehrstufig, eigene Next.js-App)
1. `/booking/markets`: Marktliste mit Studionummer je Markt plus 1 Hero-Bild
2. `/booking/services?market=<slug>`: 6 Leistungskacheln mit Icon, Label, Subline, Servicecode in URL
3. `/booking/studios?service=<code>`: Studiowahl
4. Danach Terminwahl; erste Dateneingabe erst an dieser Stelle

### 2. Die 5 stärksten Muster

**Muster 1: Der Nutzen wird als Nutzenumkehr formuliert, nicht als Leistung.** H1 der Startseite: "Look forward to going to the dentist" (`home.html:777`), H1 der Über-uns-Seite: "Look forward to visiting the dentist". Die Subline benennt direkt die Angst und nimmt sie weg, mit Fettung auf den Kern: "Whether it's been 6 months or 6 years, we make it easy to get back to the dentist with `<strong>no judgment, ever.</strong>`" (`home.html:777`). Nicht die Leistung steht im H1, sondern das Gefuehl vor dem Termin. Der Claim wird im Footer als Fläche wiederholt: "Care at Tend Dental isn't just painless, it's &lt;strong&gt;a pleasure&lt;/strong&gt;" (`home.html:5015`).

**Muster 2: Das Trust-Element ist ein Datenpunkt mit Bezug, nicht ein Siegel.** "Over 8,000 five star reviews" mit 5 FontAwesome-Sternen (`home.html:827`), und in den Testimonials ist jeder Eintrag mit Vorname plus Studioort signiert, zum Beispiel "&lt;strong&gt;Claire C&lt;/strong&gt; Hells Kitchen" (`home.html`, Testimonial-Slider). Der Beleg ist damit lokal verifizierbar, nicht anonym. Die Startseite baut den Beweis in eine Kette: 8.000 Reviews, 33 Standorte mit Koordinaten im HTML (`data-latitude`, `data-longitude`), 9 namentliche Versicherer, 9 Presse-Logos.

**Muster 3: Ein einziger Akzent-Button, 36 mal wiederholt.** Der Funnel-Einstieg ist immer derselbe: 36 der 67 Buttons der Startseite heißen "Book Now" und führen auf `https://www.hellotend.com/booking/markets`. Der Servicecode wird in der URL mitgeführt, damit die Leistung den Klick überlebt (`https://www.hellotend.com/booking/markets?service=CLNCHK` auf `service-exams.html`, plus `INVISALN`, `SLPCONS`, `EMGNCY`, `VENCONS`, `WHTNG`, `COSCON`, `BOTOXCON`). Auf Standortseiten führt der Klick direkt in den vorbefüllten Funnel (`booking/services?market=new-york-city&studio=hells-kitchen`, `home.html`). Kein Button führt auf ein Kontaktformular.

**Muster 4: Der Standort ist eine eigene Conversion-Achse, nicht ein Footer-Eintrag.** 33 Studios liegen als Listeneinträge mit Koordinaten im HTML der Startseite, gruppiert nach Markt mit Studionummer ("16 Studios", "8 Studios", "4 Studios", "3 Studios", "1 Studio"). Die Standortseite liefert 9 Amenities, Öffnungszeiten für 6 Tage, U-Bahn-Linien mit Stationsnamen, einen Anreiseparagraphen, ein Karten-Embed und die standorteigene Telefonnummer `(646) 582-0672` statt der Konzernnummer. Jede Standortseite hat ein eigenes `Dentist`-Schema mit Adresse, Geo, Öffnungszeiten und `parentOrganization`.

**Muster 5: Content-Skalierung über zwei orthogonale Achsen statt über Textmenge.** Achse 1: 18 Leistungsseiten im Sitemap, dazu 120 Hub-Seiten aus 9 Märkten mal 12 bis 14 Leistungen, je mit eigener URL, eigenem Title mit Ortszusatz und eigener H1 ("Dental Hygiene Cleaning in New York City", `hub-nyc-hygiene.html`), 120 Sitemap-URLs. Achse 2: 134 Blog-URLs, 14 Seiten mit 10 Einträgen, 15 Kategorien. Beide Achsen nutzen dieselben Modulbausteine (Versicherungsblock, Testimonial-Slider, Presse-Leiste, Blog-Teaser), deshalb ist eine neue Landepage eine Datenzeile, kein Layout.

### 3. Animation-Rezepte mit exakten Werten

**Rezept 1: Parallax auf freigestellten Hero-Bildern (0,1 s linear, ohne Reveal)**

CSS, exakt:
```css
.parallaxImg {
  will-change: transform;
  transform: translateY(var(--parallax, 0px));
  transition: transform 0.1s linear;
  backface-visibility: hidden;
}
```
HTML: `<img class="parallaxImg parallaxImg--normal" fetchpriority="high" ...>` und `<img class="parallaxImg parallaxImg--reverse" ...>`.

JS, exakt (Werte `0.1`, `0.17`, `[-1,1]`):
```js
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const els = [...document.querySelectorAll('.parallaxImg')];
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { e.target.__inView = e.isIntersecting; });
  }, { threshold: 0 });
  els.forEach(el => {
    el.__speed = el.classList.contains('parallaxImg--slow') ? 0.1 : 0.17;
    el.__dir = el.classList.contains('parallaxImg--reverse') ? 'reverse' : 'normal';
    io.observe(el);
  });
  // rx: Elementmitte minus Viewportmitte, normiert auf [-1,1], mal Höhe mal Speed
  // el.style.setProperty('--parallax', offset.toFixed(2) + 'px')
}
```
Beleg: `custom-style-v30.css` bei Zeichen 264106, `custom-scripts-v9-min.js` bei Zeichen 10231 und 10679.

**Rezept 2: Foto-Marquee, pausiert bis Scroll (25 s linear infinite)**

```css
.hero-section-mob-slider-auto ul {
  display: flex;
  align-items: flex-end;
  width: 113.5rem;
  gap: 1.25rem;
  animation: moveSlideshow 25s linear infinite;
  will-change: transform;
  animation-play-state: paused;   /* Start pausiert */
}
@media screen and (min-width: 900px) {
  .hero-section-mob-slider-auto ul { width: 170.25rem; }
  @keyframes moveSlideshow { 100% { transform: translateX(-33.3333%); } }
}
@keyframes moveSlideshow {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```
Trigger im JS: bei `scroll` auf `running`, nach 300 ms Timeout zurück auf `paused`. Beleg: `custom-style-v30.css` bei Zeichen 427957, `custom-scripts-v9-min.js` bei Zeichen 29114.

**Rezept 3: Akkordeon über `<details>` mit Web-Animations-API (400 ms ease-out öffnen, 200 ms ease-in-out schließen)**

```js
el.animate({ height: [from, to] }, { duration: 400, easing: 'ease-out' });      // öffnen
el.animate({ height: [from, to] }, { duration: 200, easing: 'ease-in-out' });   // schließen
document.querySelectorAll('details').forEach(el => new DetailsAnimator(el));
```
Angewendet auf die 6 `<details>`-Blöcke der Leistungsseite und die 6 der Über-uns-Seite. Beleg: `custom-scripts-v9-min.js` bei Zeichen 9060 und 9529.

**Rezept 4: Auto-Scroll-Slider für Logos und Kategorien (Splide AutoScroll)**

```js
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
new Splide('.splide-logos', {
  type: 'loop', perPage: 1, perMove: 1, autoWidth: true,
  pagination: false, arrows: true, gap: '4vw', trimSpace: false,
  autoScroll: { speed: reduced ? 'none' : 0.2 }
}).mount(window.splide.Extensions);
```
Kategorien-Variante: `perPage: 4`, `gap: '2.25rem'`, Breakpoints `1150: {perPage:3}`, `950: {perPage:2, gap:'1.25rem'}`. Header-Topbar: `gap: '7vw'`, Speed `0.3`, ab 1700 px `0.28`, ab 640 px `0.2`. Beleg: `custom-scripts-v9-min.js` bei Zeichen 24280.

**Rezept 5: Fortschrittsbalken am Artikel, sticky Sidebar**

```css
.blog-progress-wrapper { position: sticky; top: 0; left: 0; width: 100%; height: .3125rem; background-color: var(--neutral-500); z-index: 99; }
.blog-progress-bar { height: 100%; width: 0%; background-color: var(--alert-400); transition: width 0.1s ease-out; }
#blog-table-of-contents { position: sticky; top: 5.25rem; padding: 2rem 1.75rem; }
```
Balken und Inhaltsverzeichnis werden per Inline-JS erzeugt, das TOC aus allen `<h2>` des Artikels. Beleg: `custom-style-v30.css` bei Zeichen 406534, `blog-article.html` Inline-Skriptblöcke.

**Rezept 6: Header-Verdichtung ab 46 px Scroll**

```js
const HEADER_SCROLL_THRESHOLD = 46;
$(window).on('scroll', () => {
  $(window).scrollTop() > HEADER_SCROLL_THRESHOLD ? $header.addClass('scroll') : $header.removeClass('scroll');
});
```
Kein Reveal, nur Dichte: Logo verkleinert, Telefonbutton auf 2,5 rem x 2,4375 rem reduziert, Button-Padding auf `.5rem` beschnitten, Nav auf `position: fixed` gesetzt. Beleg: `custom-scripts-v9-min.js` bei Zeichen 11069; CSS-Regeln `.header--a.scroll ...`.

Nicht belegbar: keine `cubic-bezier()`-Definitionen im gesamten CSS, keine Scroll-Reveal-Bibliothek, keine Zähler-Animation, keine Stagger-Werte.

### 4. Anti-Patterns und Schwächen

1. **Kein Consent-Management im Marketing-HTML.** GTM `GTM-NQ88W4P` lädt direkt im `<head>` ohne Einwilligungsabfrage. In der Next.js-Buchung existiert nur ein Hinweis "By using this website, you agree with our use of cookies" mit einem "Dismiss"-Button und Link auf `/terms#cookies`, also ohne Ablehnungsoption und ohne Kategorien.
2. **Bewertungs-Claims ohne Markup und ohne Belegdaten.** "Over 8,000 five star reviews" steht als `<p class="reviews__number">` ohne `aggregateRating` im Schema (0 Treffer auf Startseite und Standortseite). Die Standortseite zeigt "63 Google Reviews" und "4.4 average rating" im `sr-only`-Text, rendert aber nur 4 volle Stern-Spans, ohne Google-Attribution und ohne Datum. Der Artikel "What Tend Members Are Saying" zitiert 3 anonyme Patientenstimmen ohne Quelle.
3. **Redaktionsreste im Live-Bestand.** "Orthodontics at Tend, TREATMENT CALCULATOR IP" ist als sichtbare H3 auf `/site/services` verlinkt, URL `/site/services/orthodontics-copy-treatment-calc`. Dazu im HTML der Standortseite ein Karten-iframe, dessen `data-src` auf "Les Centres Dentaires VIVA, Cornwall" zeigt, also auf eine fremde Praxis (im Adress-Tab-Panel der Kontaktsektion) neben dem korrekten Tend-Embed.
4. **Leergebliebene JavaScript-Platzhalter.** Die Nachbar-Standort-Karten zeigen im HTML-Text `Rockefeller Center ( mi)` mit leerer Entfernungszahl, weil der Wert erst per JS in `[data-studio-distance]` geschrieben wird. Ohne JavaScript steht dort eine kaputte Klammer. Gleiches Muster bei `<span id="services-location">` in der Hero-H2 "Locations near you in ".
5. **Erzwungene Weiterleitung ohne Query.** `/site/search` leitet beim Aufruf ohne Parameter per Inline-JS nach `?q=Leipzig SN, DE` um. Ein deutscher Ort als Default in einem US-Zahnarzt-Funnel, vermutlich ein Testwert, der in Produktion steht. Zusätzlich liefert die Seite eine leere Meta-Description.
6. **Dubletten und Ballast im DOM.** Die Startseite enthält 36 `ld+json`-Blöcke mit 33 nahezu identischen `Dentist`-Objekten und 196 `OpeningHoursSpecification`-Einträgen, dazu die komplette Navigation zweimal (Mobile plus Primary). Der CSS-Datei-Name ist `custom-style-v30.css` und 429 KB groß, unminifizierte Regelnamen mit teils vierstufigen Selektor-Vererbungen.
7. **Unbelegte Kernzahlen.** "80% less radiation" (Leistungsseite) und "Free oral cancer screening ($60 value)" stehen ohne Quelle und ohne Datum im Text. Für Zahnmedizin sind das regulierte Aussagen.
8. **Kein `Article`-, kein `Review`- und kein `BreadcrumbList`-Schema** auf dem geprüften Blogartikel (0 `ld+json`-Blöcke), obwohl Breadcrumbs als `<p class="page-links">` sichtbar sind.
9. **Uppercase-Buttons bei 0,9375 rem** mit `letter-spacing:.08em` sind auf Deutsch mit längeren Labels kritisch ("ONLINE-APPOINTMENT-BOOKING"). Das System schaltet in den Qualifier-Kacheln bereits auf `text-transform:unset` um, inkonsistent zum Rest.
10. **Keine Stagger-, Reveal- oder Hover-Bewegung auf Karten.** Bei 211 Hover-Regeln ändert genau 1 Regel ein `transform`, kein Bild zoomt, keine Karte hebt sich. Das ist eine bewusste, aber sehr flache Interaktionsschicht für eine Marke, die "soothing" als Kernversprechen führt.

### 5. Conversion-Mechanik in 5 Sätzen

Tend führt nicht über ein Formular, sondern über einen Klickpfad in eine eigene Buchungs-App: jeder Button heißt "Book Now" und führt auf `/booking/markets`, wo Markt, dann Leistung (mit Servicecode in der URL), dann Studio gewählt wird, persönliche Daten kommen erst nach der Leistungswahl. Die Marketing-Seite hat die Aufgabe, die Hemmschwelle zu nehmen, deshalb steht in jedem Hero eine Angst-Adressierung ("Whether it's been 6 months or 6 years", "no judgment, ever") statt einer Leistungsliste. Der Beweis wird lokal geführt: 8.000 Fünf-Sterne-Reviews als Zahl, Testimonials mit Vorname und Studioort, 9 namentliche PPO-Versicherer, 33 Studios mit Koordinaten im HTML und standorteigene Telefonnummern. Kostenangst wird an zwei Stellen entkörnt, über den Versicherungs-Checker als iframe ("We can tell you in just a few seconds") und über den CareCredit-Rechner mit Bereichsangabe "$6500-$7500" und dem Blur-Reveal als Interaktionshuerde, die den Wert erst nach einem Klick zeigt. Der Content übernimmt den Rest der Kette, 134 Blogartikel und 120 Leistung-x-Stadt-Seiten fangen die Suche ab und leiten über denselben "Book Now"-Pfad zurück in die Buchung.

## Abrufprotokoll

Alle Abrufe mit `curl -sL -m 30 -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36"`, Arbeitsverzeichnis `/tmp/site-hellotend/`.

| # | URL | HTTP | Bytes | Datei |
|---|---|---|---|---|
| 1 | https://www.hellotend.com/site/home | 200 | 419.631 | home.html |
| 2 | https://www.hellotend.com/site/services | 200 | 110.694 | services.html |
| 3 | https://www.hellotend.com/site/services/dental-exams | 200 | 145.452 | service-exams.html |
| 4 | https://www.hellotend.com/site/services/orthodontics-copy-treatment-calc | 200 | 185.347 | calc-ortho.html |
| 5 | https://www.hellotend.com/site/dentist-studios/new-york-city/hygiene | 200 | 304.601 | hub-nyc-hygiene.html |
| 6 | https://www.hellotend.com/site/studios/hells-kitchen | 200 | 171.052 | studio-hells-kitchen.html |
| 7 | https://www.hellotend.com/site/about | 200 | 363.163 | about.html |
| 8 | https://www.hellotend.com/site/dentists | 200 | 119.638 | dentists.html |
| 9 | https://www.hellotend.com/site/blog | 200 | 100.197 | blog.html |
| 10 | https://www.hellotend.com/site/blog/2025/07/21/not-sure-you-can-trust-a-new-dentist-heres-what-you-can-expect-from-tend | 200 | 106.840 | blog-article.html |
| 11 | https://www.hellotend.com/site/faqs | 200 | 138.386 | faqs.html |
| 12 | https://www.hellotend.com/site/insurance | 200 | 156.720 | insurance.html |
| 13 | https://www.hellotend.com/site/payment-financing | 200 | 123.998 | payment-financing.html |
| 14 | https://www.hellotend.com/site/search | 200 | 332.216 | search.html |
| 15 | https://www.hellotend.com/site/sitemap | 200 | 103.774 | sitemap-page.html |
| 16 | https://www.hellotend.com/booking/markets | 200 | 169.614 (Body 3.843) | booking.html |
| 17 | https://www.hellotend.com/booking/services?market=new-york-city | 200 | 204.969 (Body 3.843) | booking-services.html |
| 18 | https://www.hellotend.com/robots.txt | 200 | 818 | robots.txt |
| 19 | https://www.hellotend.com/sitemap.xml | 200 | 22.606 | sitemap.xml |
| 20 | https://www.hellotend.com/site/hub-xml-sitemap | 200 | 16.139 | hub-sitemap.xml |
| 21 | https://www.hellotend.com/site/dentists-xml-sitemap | 200 | 5.823 | dentists-sitemap.xml |
| 22 | https://www.hellotend.com/images/3658/css/custom-style-v30.css | 200 | 429.231 | custom-style-v30.css |
| 23 | https://www.hellotend.com/images/3658/js/custom-scripts-v9-min.js | 200 | 34.541 | custom-scripts-v9-min.js |
| 24 | https://www.hellotend.com/images/3658/css/splide.min.css | 200 | 5.002 | splide.min.css |

Nicht abrufbar (404): `https://www.hellotend.com/site/treatment-calculator` liefert 404 (97.668 Bytes Fehlerseite). Der Rechner wurde daraufhin auf der Seite `/site/services/orthodontics-copy-treatment-calc` analysiert, die im HTML als "TREATMENT CALCULATOR IP" verlinkt ist.

Nicht aufgelöst: `/booking/*` liefert an den Marketing-Cache nur eine 3.843-Byte-Hülle, der Rest kommt per Next.js-Hydration. Die Funnel-Analyse stützt sich daher auf das serverseitig gerenderte Markup plus `__NEXT_DATA__`, nicht auf die interaktiven Schritte nach der Leistungswahl.
