# bondvet.com

## Steckbrief

| Feld | Wert |
|---|---|
| Domain | https://bondvet.com |
| Marke | Bond Vet (Tierarztkette, US-Ostküste) |
| Branche | Veterinärmedizin, Primär-, Urgent- und Notfallversorgung plus Chirurgie, stationäre Kette mit 46 Standorten |
| Seitentyp | Multi-Standort-Lead-Gen mit sehr großer SEO-Maschine (Blog, Stadt-Landepages, Standortseiten, Service-Landepages) |
| Geschäftsmodell | Walk-in und Same-Day-Buchung, Jahresmitgliedschaft, eigene App/Pet-Portal, Telehealth, Online-Apotheke BondRx, Finanzierungspartner |
| Sprache | Englisch (`<html lang="en">`), kein hreflang auf allen 19 geprüften Seiten (0 Treffer) |
| Anrede | Englisch, kein Du/Sie; Ton durchgehend informell und warm ("you and your pet", "We're Different") |
| Stack Hauptsite | Gatsby 5.13.7 (`<meta name="generator" content="Gatsby 5.13.7"/>`), React, Emotion-CSS-in-JS, Tina-CMS-Variablen (`--tina-color-primary`, `--tina-radius-small`), Material UI (`MuiCircularProgress`) |
| Stack Service-Landepages | Wix (`<meta name="generator" content="Wix.com Website Builder"/>`, `wixui-section`, `x-wix-request-id`), Wix-Thunderbolt-Bundle, `static.parastorage.com` |
| Drittanbieter | Google Tag Manager `GTM-MSQTPXNK`, Google Analytics via gtag, Cookiebot, Convert Experiments (`cdn-4.convertexperiments.com/v1/js/1004632-1004567.js`), Hotjar und Meta Pixel über eigenen Proxy `proxy.bondvet.com` via Partytown 0.8.0, Level Access (UserWay) für Barrierefreiheit, Calendly (Telehealth-Modal) |
| Edge/CDN | Cloudflare vor allen Seiten; Wix-Seiten zusätzlich mit `via: 1.1 google` und `server-timing: cache;desc=hit, varnish;desc=hit_hit` (Fastly) |
| Schrift | Sailec (MyFonts-Build 3718361, Type Dynamic), 400 und 700 im Critical-Pfad, Rest über `/fonts/fonts-deferred.css` nachgeladen |
| Anzahl Seiten in Sitemap | 765 URLs in `/sitemap-0.xml`; `/careers/sitemap-0.xml` liefert 145 URLs, die vollständig Teilmenge der 765 sind |
| Sitemap-Zusammensetzung | 470 Blog-Artikel, 46 Standortseiten (`/c/*`), 46 Buchungs-Deeplinks (`/booking/city/*`), 7 Regionen, 6 Membership-Regionen, 6 Chirurgie-Unterseiten, 4 Service-Unterseiten, 107 Karriere-Jobs, 25 Karriere-Blog, 48 Einzelseiten |
| Consent | Cookiebot (`consent.cookiebot.com/uc.js`), GTM startet mit `gtag("consent","default",{ad_personalization:"denied",ad_storage:"denied"})` |

## Sitemap

### Hauptnavigation (aus `<nav aria-label="Main Navigation">`, identisch doppelt im Mobile-Menü)

| Ebene 1 | Ebene 2 |
|---|---|
| Today's Availability (`/same-day`) | keine |
| Locations (`/regions`) | Boston, Chicago, D.C. Area, Long Island, New Jersey, New York City, Philadelphia, Today's Availability, Telehealth, Opening Soon |
| Services (`/veterinary-clinic-services`) | Our Services, Urgent Care, Preventive Care, Puppy Visits, Kitten Visits, Surgeries, Spay & Neuter, Dentals, Telehealth, Travel Certificates, BondRx Pharmacy |
| Membership (`/membership`) | keine |
| Careers (`https://www.careers.bondvet.com/`) | keine |
| More (`#`) | About Us, Blog, Gift Cards, Medical Records, Payment Options, Refer a Friend |
| Log In (`https://app.bondvet.com/?login_origin=website`) | keine |
| BOOK NOW (`/booking/city`) | keine, roter Button rechts im Header |

Der Header enthält keine Telefonnummer (`href="tel:"` kommt auf der Startseite 0 mal vor). Der BOOK-NOW-Button hat die Klasse `Nav-module--booking-cta--9c336` (Breite 8,25 rem, Höhe 2,1875 rem mobil, 2,5 rem ab 1244 px).

### Footer (5 Gruppen plus Rechtliches)

| Spalte | Inhalt |
|---|---|
| Kontakt | Logo, Newsletter "Get the scoop about events, promotions, and clinic openings.", 6 Social-Icons (LinkedIn, Instagram, Facebook, X, Spotify, Apple Podcasts) |
| Contact Us | Text: (646) 453-5158, Other Inquiries |
| Company | About Us, Careers (We're Hiring!) |
| Get Care | Locations, Our Services, Surgeries, Dentals, Spays & Neuters, Telehealth, Travel Certificates |
| Resources | Blog, FAQ, Cancellation Policy, Refer a Friend, Pet Portal |
| Rechtliches | Terms of Use, Membership Terms & Conditions, Telehealth Terms & Conditions, Promotion Terms & Conditions, Privacy Policy, Manage Consent, Accessibility, Copyright "© 2026 copyright all rights reserved" |

Der Footer enthält 29 `<a>`-Elemente. Footer-Hintergrund ist `#dae6ed` (`--footer-background-color:#dae6ed;--footer-font-color:#10365a`). Der Wir-hirren-CTA-Block darüber trägt den wellenförmigen Übergang (`CtaFooter-module--topSwirl`, SVG-Pfad mit `fill="#103559"`).

## Seiten

### 1. https://bondvet.com/ (Startseite)

| Feld | Wert |
|---|---|
| Title | "Friendly, Compassionate Primary & Urgent Care For Pets \| Bond Vet" |
| Meta-Description | "We offer compassionate, thorough, & friendly pet care in a warm, comfortable environment. Walk in or book online." (18 Wörter) |
| H1 | "Open 7 days a week at most locations. Walk-ins welcome." (10 Wörter, 55 Zeichen) |
| H2 / H3 | 2 H2 / 5 H3 / 4 H4 |
| Schema.org | `VeterinaryCare` (mit `telephone`, `email`, `foundingDate` "2018-06-01", `isAcceptingNewPatients:true`), 10x `Place`, 9x `Offer` mit je einem `Service` |
| Canonical | https://bondvet.com/ |
| hreflang | keine |
| Medien | 28 `<img>`, 15 `<picture>`, 25 SVG, 1 Iframe (GTM), 0 Video; 14 `loading="lazy"`, 0 `fetchpriority` |

**Sektionsliste in DOM-Reihenfolge (Byte-Offsets in home.html):**

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Nav, sticky | keine | keine | Einzelzeile, fixed | Logo-SVG | "BOOK NOW", "Log In", alle Dropdown-Punkte | keine | `position:fixed`, `z-index:999`, Start `opacity:0;transform:translateY(calc(1px - var(--nav-height)))`, wird per `.booted` sichtbar |
| 2 | Hero + Merger-Announcement (Offset 11384/22033) | "Open 7 days a week at most locations. Walk-ins welcome." | Ankündigung "Bond Vet is merging with Small Door Veterinary" mit "Learn More" | 2 Spalten 50/50 auf 24-Spalten-Grid (`grid-column:1/span 12` Bild, `12/-1` Text), Bild mobil full-bleed | 1 Foto "Veterinarian with a dog and a client in an exam room", 1244 bis 2500 px srcset | "Book Now" (contained), "Book a Telehealth Visit" (outlined) | Ankündigungs-Box in `#ecf1f7` | Hero-Höhe `min-height:calc(850px - var(--fixed-item-height))`, Bild `height:calc(var(--content-width)*.47)`, `max-width` startet bei 1px und wächst per `--intro-transition` |
| 3 | Award-Bar (Offset 23622) | "Newsweek's America's Best Animal Hospitals 2025" | "We're proud to share that" plus Standortname | Zentrierte Card, ab 768 px 2-spaltig (Badge + Text) | Award-Badge-PNG, 200 px / 400 px srcset | keine | Auszeichnungssiegel Newsweek | `background:#ecf1f7`, `border-radius:.625rem`, `box-shadow:0 0 .25rem 0 rgba(0,0,0,.2)`, `margin-top:3.75rem` ab 900 px |
| 4 | Zigzag "We're Different" (Offset 29351) | "We're Different" | "Bond Vet is an animal hospital designed around you and your pet. Because that's how we think pet care should work." | 2 Spalten 11/13 im 24er-Grid, links Text, rechts 4 Karten im Auto-Fit-Grid (min 14,375 rem) | 1 Icon "Locations" (127 px), Card-Icons 94 px | "View Locations" als Icon-Zeile, dann "Learn more here", "our telehealth service", "Log in" als Inline-Links | keine Zahlen, keine Sterne | Karten sind weiß mit `border-radius:.8125rem`, `box-shadow:0 0 4px rgba(0,0,0,.16)`; rechte Spalte hat Wellen-SVG als Hintergrund (`different_right_mobile-...svg`, `background-size:170% auto`, ab 768 px `auto 344px`) |
| 5 | Loading-Platzhalter (6 Stück, Offsets 52249 bis 55029) | keine | keine | zentrierter Spinner | MUI `CircularProgress` 40 px | keine | keine | Das ist der clientseitig nachgeladene Bereich (Instagram-Feed/weiterer Content), im SSR-HTML nur Spinner: `aria-label="loading details"` |
| 6 | Swirl-Spacer | keine | keine | Höhe 75 px | keiner | keine | keine | `globalPages-module--swirlSpacer--8ee92{height:75px}` |
| 7 | CTA-Leiste vor Footer (Offset 55575) | "Better Care, Right When You Need It" | keine | Zentriert, dunkel, voll breit | Wellen-SVG oben, Hintergrund-SVG `cta-....svg` rechts unten | "Book a visit" (outlined) | keine | `background-color:var(--primary-color)` `#10365a`, `padding-bottom:16.875rem`, H3 2,75 rem ab 768 px |
| 8 | Footer (Offset 56811) | "Contact Us", "Company", "Get Care", "Resources" | "Get the scoop about events, promotions, and clinic openings." | 5 Gruppen, mobil gestapelt | 6 Social-SVGs, Level-Access-Icon | "Submit" (Newsletter-Pfeil), "Manage Consent" | Careers "(We're Hiring!)" | Footer-BG `#dae6ed`, Newsletter-Input mit weißem Schatten-Input |

**Hero-Formel:** H1 ist ein Verfügbarkeitsversprechen, kein Nutzenversprechen ("Open 7 days a week at most locations. Walk-ins welcome."). H1-Länge 10 Wörter, 55 Zeichen. Subline ist keine, stattdessen die Merger-Ankündigung oberhalb. 2 CTAs im Hero. Trust-Signal im Hero: keines, das Award-Siegel sitzt direkt danach als eigener Block. Medientyp: Foto. Hero-Höhe: `min-height:calc(850px - var(--fixed-item-height))` ab 768 px, kein `min-h-screen`.

**CTA-Strategie:** Alle primären CTAs zeigen auf denselben Funnel `/booking/city`. Labels: "BOOK NOW" 1x (Header), "Book Now" 1x (Hero), "Book a Telehealth Visit" 1x (Hero, Ziel `/telehealth`), "Book a visit" 1x (CTA-Leiste), "Log In" 2x (Header mobil/desktop, Ziel `app.bondvet.com`). Insgesamt 78 `<a>`-Elemente auf der Seite, davon 41 im Header. Kein Sticky-Header-CTA im Sinne eines eigenen Buttons, aber der Header selbst ist sticky und enthält BOOK NOW dauerhaft. Keine Telefonnummer im Header.

**Trust-Staffelung:** (1) Merger-Ankündigung "Bond Vet is merging with Small Door Veterinary" ganz oben als Autoritätsbeweis. (2) Newsweek-Siegel "America's Best Animal Hospitals 2025" als eigener Block direkt unter dem Hero. (3) Keine Sterne, keine Kundenzahl, keine Testimonials auf der Startseite. (4) Erst im Footer die "(We're Hiring!)"-Markierung. Customer-Reviews erscheinen nur auf Standortseiten.

**Funnel/Formular:** Auf der Startseite kein Formular ausser Newsletter. Der Buchungsfunnel liegt unter `/booking/*` und ist ein eigener zustandsbehafteter Flow (siehe Seite 12).

**Footer:** 5 Gruppen (siehe Sitemap-Abschnitt), 29 Links, 6 Social-Ziele, Rechtliches mit 8 Punkten, Copyright-Zeile ohne Jahr-Dynamik im SSR ("© 2026 copyright all rights reserved").

### 2. https://bondvet.com/veterinary-clinic-services/urgent-care (Wix-Seite)

| Feld | Wert |
|---|---|
| Title | "Urgent Care Vet for Pets \| Same-Day & Walk-In Visits \| Bond Vet" |
| Meta-Description | "Bond Vet provides urgent vet care for pets for conditions that can't wait. Walk-ins welcome, same-day appointments available. Book at a location near you." |
| H1 | 4 Stück: "Same-Day Urgent Vet Care for Dogs & Cats", "Better care, right when you need it.", "Frequently Asked Questions", "Better care, right when you need it." |
| H2 / H3 | 6 H2 / 30 H3 (davon 5 aus fremden FAQ-Blöcken eingeschleppt) |
| Schema.org | `WebSite`, `VeterinaryCare`, 20x `Place`, `Certification`, 2x `Organization`, `WebPage`, `BreadcrumbList` + 3x `ListItem`, `Service`, `Audience`, `ServiceChannel`, `ReserveAction`, `EntryPoint`, `Reservation` |
| Canonical | https://bondvet.com/veterinary-clinic-services/urgent-care |
| Medien | 7 `<img>`, 70 SVG, 0 Video, 0 Iframe |
| Eyebrow | H5 "Urgent Care For Pets" |

**Sektionsliste in DOM-Reihenfolge (10 Wix-`<section>`, alle mit `id="section-container"`):**

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Wix-Header, sticky | keine | keine | volle Breite | Logo | "BOOK NOW", "Log In", "Menu", "Close" | keine | dupliziert die Hauptnav mit allen Gruppen doppelt im DOM |
| 2 | Hero | "Same-Day Urgent Vet Care for Dogs & Cats" | H5-Eyebrow "Urgent Care For Pets" | zentriert, grosses Foto | 1 Foto "A veterinarian holding a cat." | "Book Now" | keine | Wix-Komponente `comp-mm9lltwy` |
| 3 | Erklärtext-Block | "What is Urgent Care for Pets?", "What's the Difference Between Urgent Care and Emergency Care?", "Reasons to Seek Urgent Care" | Fliesstext zu Abgrenzung Urgent vs. Emergency | Text plus Inline-Illustrationen | SVG-Icons | "Book Now" | keine | enthält im selben Block die FAQ-Akkordeons "Frequently asked questions" (5 Fragen) |
| 4 | FAQ-Block 1 (fremd) | "Frequently Asked Questions" | 7 Fragen zu Preventive Care | Wix-Akkordeon `widget-accordion-wrapper`, `data-hook="accordion-item-header"`, `aria-expanded="false"` | Chevron-SVG 24x24 | keine | keine | Inhaltlich falsch platziert: Preventive-Care-FAQ auf der Urgent-Care-Seite |
| 5 | FAQ-Block 2 | "Frequently Asked Questions" | 9 Fragen zu Urgent Care | Wix-Akkordeon | Chevron-SVG | keine | keine | Der inhaltlich passende Block |
| 6 | Final-CTA | "Better care, right when you need it." | keine | zentriert, farbige Fläche | Cat_Dog_Graphic 1.png | "Book a Visit" | keine | |
| 7 | FAQ-Block 3 (fremd) | "Frequently Asked Questions" | 3 Fragen zu Puppy-Vaccines | Wix-Akkordeon | keine | keine | keine | dritter Fremd-FAQ-Block |
| 8 | Final-CTA wiederholt | "Better care, right when you need it." | keine | zentriert | Pink Poppy Flowers | "Book a Visit" ohne Link | keine | Zweiter identischer CTA-Block mit anderem Bild |
| 9 | Wix-Footer | "Contact Us", "Company", "Get Care", "Resources" | Newsletter | 5 Gruppen | 6 Social-SVGs | "Book a Visit" | keine | Reihenfolge der Rechtslinks anders als im Gatsby-Footer |
| 10 | zweiter Footer-Knoten | identisch | identisch | identisch | identisch | identisch | keine | Footer-Markup doppelt im DOM |

**CTA-Strategie:** 9 CTA-artige Elemente. Alle ausser "Log In" führen auf `https://bondvet.com/booking/city`. Labels: "BOOK NOW" 1x, "Book Now" 3x, "Book a Visit" 3x. Der letzte "Book a Visit" hat kein `href`, ist also toter Button.

**Trust-Staffelung:** Keine. Weder Siegel, noch Sterne, noch Zahlen auf dieser Seite.

**Funnel:** Kein Formular, nur Absprung in den Buchungsfunnel.

### 3. https://bondvet.com/veterinary-clinic-services/preventive-care und /puppy-visits (Wix)

| Feld | Wert |
|---|---|
| Title Preventive | "Preventive Care for Pets \| Wellness Exams, Vaccines & More \| Bond Vet" |
| Title Puppy | "Puppy Vet Care \| Exams, Vaccines & Guidance for New Puppies \| Bond Vet" |
| H1 Preventive | "Preventive Pet Care: Wellness Exams, Vaccines & Diagnostics" plus 3 weitere H1 |
| H1 Puppy | "Raising a Puppy" plus 3 weitere H1 |
| H2 / H3 | Preventive 7 H2 / 30 H3, Puppy 6 H2 / 30 H3 |
| Schema.org | identisches Set wie Urgent Care: `WebSite`, `VeterinaryCare`, 20x `Place`, `Certification`, 2x `Organization`, `WebPage`, `BreadcrumbList`, `Service` |
| Medien | je 7 `<img>`, 70 bis 71 SVG |

**Sektionen Preventive:** Hero (H5-Eyebrow "Preventive Care") → Erklärblock mit "What is Preventive Care for Pets?", "What Happens During Their Exam?", "How Often Should Your Pet See the Vet?", "What to Bring to Your First Visit" → FAQ-Block Urgent-Care-Fragen → FAQ-Block Preventive-Fragen → Final-CTA → FAQ-Block Puppy-Vaccines → Final-CTA (Wiederholung). Dieselbe Dreifach-FAQ-Kollision wie auf der Urgent-Care-Seite.

### 4. https://bondvet.com/surgery

| Feld | Wert |
|---|---|
| Title | "Pet Surgery: Spay, Neuter, Dental & More \| Bond Vet \| Bond Vet" (Marke doppelt im Titel) |
| Meta-Description | "Need surgery for your dog or cat? Bond Vet offers spay/neuter, dental, and emergency pet surgery with Fear Free certified care. Book a consultation today." |
| H1 | "Comprehensive & Compassionate Surgical Care" |
| H2 / H3 | 19 H2 / 4 H3 |
| Schema.org | keine ld+json-Blöcke (0) |
| Medien | 5 `<img>`, 32 SVG |

**Sektionsliste in DOM-Reihenfolge:**

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero full-width (`HeroFullWidth-module--root--89003`) | "Comprehensive & Compassionate Surgical Care" | "We know surgeries can be stressful for pets and pet parents, but you can rest easy: Our highly-skilled, caring vets and support team go above and beyond" | Zentriert, dunkler Block | 1 Foto | "Book a Consultation" (Ziel `/booking/city?appointmentReasonId=53552`) | Eyebrow "SURGERIES BY BOND VET", "Fear Free certified care" (nur in Meta) | Erster Deep-Link in den Funnel mit vorbelegtem Grund |
| 2 | Team-Teaser | "Meet Our Surgery Team" | "Surgery at Bond Vet is led by our Director of Surgery, Dr. Renee McDougall." | 2-spaltig | Portrait | keiner | Personenname plus Fachtitel | |
| 3 | Service-Liste | "Surgeries we Offer" | keine | Kartenliste (`ServiceList-module--card--118db`, weisse Karte, `border-radius:.8125rem`, Höhe 5,375 rem) | keine | keine | keine | 13 Einträge: Dental, Mass Removals, Spays And Neuters, Orthopedic Surgery, Soft Tissue Surgery, Foreign Body Removal, Bladder stones, Abdominal Exploratory, Wound Repair, Specialty Surgery, Emergency Surgery, C-Section |
| 4 | FAQ-Akkordeon | "FAQs" | 16 Fragen | Expander-Liste (`Expander-module--root--3e5c1`) | keins | keine | keine | 18 Expander-Instanzen im Dokument |
| 5 | Standort-Finder | "Conveniently Located" | "Find your nearest Bond Vet location." | Karte plus Liste | Karten-Widget | keiner im SSR | keine | Zahl "0" im SSR, Liste wird clientseitig gefüllt |

**CTA-Strategie:** Nur ein sichtbarer Primär-CTA ("Book a Consultation", 3x im Text wiederholt) plus "Book a Consultation" im Hero mit `appointmentReasonId=53552`. Absicht: Vorqualifizierung des Buchungsgrunds.

**Trust-Staffelung:** Nennung des Director of Surgery mit Fachbezeichnung, sonst keine Siegel.

### 5. https://bondvet.com/membership

| Feld | Wert |
|---|---|
| Title | "Bond Vet Membership - Save on Exams & Care \| Bond Vet" |
| Meta-Description | "Get a free exam every year, 20% off additional exam fees, plus members-only events and perks with Bond Vet Membership." |
| H1 | "Bond Vet Membership" |
| H2 / H3 | 19 H2 / 6 H3 |
| Schema.org | keine (0) |
| Medien | 3 `<img>`, 36 SVG |

**Sektionsliste in DOM-Reihenfolge:**

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero halbseitig (`HeroHalfPageWithImage-module--hero--263bd`) | "Bond Vet Membership" | "A membership that makes it easier and more affordable to stay on top of your pet's care." | 2 Spalten 50/50 | 1 Foto "Day One Exam" | "Sign Up" (Ziel `app.bondvet.com/plan-signup`) | keine | |
| 2 | Nutzen-Liste (`VerticalCardList-module--verticalCardListSection--840e6`) | "Thoughtful Benefits for Everyday Care" | keine | Kartenliste mit Akkordeon-Verhalten, Hintergrund `#fbf4ef`, `padding:var(--section-block-padding,4.6875rem) 0` | keine | keine | Preisanker "Free Exam Each Year (up to $155 value)" 4x im Text | 4 Nutzen: Free Exam Each Year (bis 155 USD), 20% Off Future Exam Fees, Priority Chat Access, Members-Only Events & Perks |
| 3 | Preis-/Regionsblock (`membership-module--beige-section--6b642`) | "Explore Bond Vet Membership" | "Your membership benefits:" | Tabs nach Region | keins | "Join the Club" | Preisnennung in USD | Regionen: New York, New Jersey, Boston, Chicago, D.C. Area, Philadelphia |
| 4 | FAQ | "FAQs" | 16 Fragen | Expander-Liste | keins | keine | keine | 19 Expander-Instanzen |
| 5 | CTA-Leiste plus Footer | "Better care, Right when you need it" | keine | zentriert dunkel | Wellen-SVG | "Book a visit" | keine | |

**Trust-Staffelung:** Nur der Wertanker "up to $155 value". Kein Testimonial, kein Versicherungs-Vergleich.

### 6. https://bondvet.com/about-us

| Feld | Wert |
|---|---|
| Title | "About Us and our wonderful veterinarians \| Bond Vet" |
| Meta-Description | "Our compassionate veterinarians specialize in both urgent care and wellness services for cats and dogs in NYC." |
| H1 | kein H1 (0) |
| H2 / H3 | 4 H2 / 272 H3 |
| Schema.org | nur der globale `VeterinaryCare`-Block, kein Person/Organization-Markup für Team |
| Medien | 1068 `<img>` (Team-Fotos plus Platzhalter), 18 SVG |
| Dateigrösse | 3.372.241 Bytes, die grösste geprüfte Seite |

**Sektionsliste in DOM-Reihenfolge:**

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Text mit kleinem Bild (`TextSmallImageCenteredTitle-module--root--5585d`) | "Hi, We're bond Vet." | "We're on a mission to strengthen the human-animal bond through better pet care, and we started with a new approach: urgent care." | Zentriert, max 42,1875 rem Textbreite | 1 kleines Bild, im SSR nur Spinner | keine | Gründungsdatum "Since we opened in June 2019 in Cobble Hill, Brooklyn", "treated tens of thousands of cats and dogs" | 3 Absätze, Fettungen als Satzanker |
| 2 | Team-Grid Leadership | "Leadership team" | keine | 3er-/4er-Grid | 7 Portraits | keine | Namen mit Titeln: Zay Satchu DVM (Chairman of the Board), Joe Altobelli (President & CFO), Renee McDougall DVM MPH DACVS (Chief Veterinary Officer), David Birse DVM (SVP Operations), Sabrina Kuo DVM EMBA (VP Central Operations), Sarah Snipes (SVP Technology), Liz Kolleeny Tankel (VP Legal) | Wiederholte Blöcke im DOM (3x dieselbe Liste) |
| 3 | Team-Grid Medical | "Medical Team" | keine | Grid mit Kartenscroll | 74 eindeutige Portraits | keine | Jede Karte mit Name plus Rolle "Medical Director" oder "Veterinarian" | 243 H3-Zeilen insgesamt, 74 eindeutige Namen |
| 4 | Arrow-Tabs Kultur (`ArrowTabs-module--sectionRoot--d5971`) | keine Headline | 5 Kulturtexte ohne Labels | Links klickbare Pfeil-Tabs (`ArrowTabs-module--arrowLink--633f1`, Höhe 3,875 rem, ab 900 px 5 rem), rechts Panel | keine | keine | keine | 5 Panels, nur eines sichtbar (`hidden=""` auf den anderen), Button-Labels fehlen im SSR komplett |
| 5 | CTA-Leiste plus Footer | "Better Care, Right When You Need It" | keine | zentriert | Wellen-SVG | "Book a visit" | keine | |

**Trust-Staffelung:** Massiv über Personen: 74 namentlich genannte Tierärzte mit Rolle, dazu 7 Führungskräfte mit Abschlüssen. Kein einziges Kundensiegel auf dieser Seite.

### 7. https://bondvet.com/blog (Ratgeber-Übersicht)

| Feld | Wert |
|---|---|
| Title | "Expert Veterinary Medical Advice Blog \| Bond Vet" |
| H1 | "Everything You Want To Know About Your Pet" |
| H2 / H3 | 0 H2 / 8 H3 |
| Schema.org | keine (0) |
| Medien | 16 `<img>`, 18 SVG |

**Sektionsliste in DOM-Reihenfolge:**

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Blog-Hero (`BlogListHero-module--root--cabe3`) | "Everything You Want To Know About Your Pet" | keine | zentriert | keine | keine | keine | `padding-top:2.9375rem`, `padding-bottom:1.75rem` |
| 2 | Kategorie-Filter (`Categories-module--root--029c1`) | keine | keine | Pill-Leiste, mobil Modalklappe | Chevron als CSS-Dreieck (`border-left:.5rem solid var(--secondary-color)`) | 2 Leisten: All/Dogs/Cats und All/Medical Info/Pet Parenting/Puppies/Kittens/Diet and Nutrition/Dental Care/Products | keine | Pill: `border-radius:.5625rem`, `border:3px solid transparent`, `box-shadow:0 0 3px rgba(0,0,0,.12)`, Höhe 3,1875 rem; aktiv `border-color:var(--secondary-color)` |
| 3 | Artikel-Grid (`BlogEntries-module--entries--6584c`) | keine | keine | 2er-Grid ab 768 px, `grid-column-gap:.625rem`, `max-width:1210px` | je 1 Foto 600x300 (`BlogCard-module--image--97d1c{height:300px}`) | "Read more" | keine | Karte: `border-radius:1.25rem`, weiss, `overflow:hidden`, Content-Padding `2.5rem 1.5rem 2rem` |
| 4 | Pagination | keine | keine | zentriert | keine | "1", "2", "3", "...", "Next" | keine | Ziel `/blog/all/all/2` |
| 5 | Footer | wie Startseite | keine | 5 Gruppen | Social-SVGs | "Submit" | keine | |

### 8. https://bondvet.com/blog/urgent-care-vs-emergency-care (Artikel)

| Feld | Wert |
|---|---|
| Title | "Urgent Care Vs. Emergency Care: How to Know the Difference \| Bond Vet" |
| Meta-Description | "When your pet is sick, injured, or just off enough that you know that something isn't quite right, it can be difficult to tell whether…" (abgeschnitten mit `&hellip;`) |
| H1 | "Urgent Care Vs. Emergency Care: How to Know the Difference" |
| H2 / H3 | 1 H2 ("You Might Also Like") / 11 H3 |
| Schema.org | `Article` mit `headline`, `url`, `image`, `datePublished:"2019-09-09T00:00:00+00:00"`, `author: {@type:Organization, name:"Bond Vet", url:"https://bondvet.com/experts"}`; zusätzlich `Organization` |
| Canonical | https://bondvet.com/blog/urgent-care-vs-emergency-care |
| Textlänge | 421 Wörter Fliesstext im Artikelblock |
| Bilder | 0 im Artikelblock (nur das Hero-Bild) |
| Interne Links | 1 (`/booking/city` im Zwischen-CTA) |

**Aufbau:**

| Nr | Element | Inhalt | Hinweise |
|---|---|---|---|
| 1 | Artikel-Hero (`BlogEntryHero-module--root--65be9`) | Foto links (600 px Spalte), rechts Datum "September 9, 2019" und H1 | Grid `600px 1fr`, `grid-column-gap:5.875rem`, H1 `font-size:3.125rem`, `letter-spacing:-.0307em`, `line-height:1.24` |
| 2 | Artikel-Body (`BlogContent-module--root--dd472`) | `grid-template-columns:repeat(24,1fr)`, Inhalt `grid-column:3/-3`, Body 1,125 rem bei `line-height:1.6666666667` | H2/H3 in `--primary-soft-color` `#295889` |
| 3 | Zwischen-CTA (`BookingButton-module--redButton--05656`) | "Need a Vet? Book a Visit." mitten im Text | Einziger Zwischen-CTA |
| 4 | Inhaltsblöcke | 3 H3: "Urgent care" (23 Stichpunkte), "Emergency care" (14 Stichpunkte), "Additional Resources" mit 3 AVMA/ASPCA-Quellenlinks | Kein Inhaltsverzeichnis, keine Lesezeit, keine Key-Takeaways-Box, keine Autorenbox |
| 5 | Verwandte Artikel (`RelatedArticles-module--root--1ad51`) | H2 "You Might Also Like", 3 Karten | `background-color:var(--secondary-light-color)`, `margin-top:300px` ab 768 px, senkrechte Verbindungslinien per `:before`/`:after` (`height:4.875rem` bzw `4.6875rem`, `width:2px`, `background-color:var(--beige-color)`) |
| 6 | CTA-Leiste plus Footer | "Better care, Right when you need it" | wie überall |

**Bewertung:** Der Artikel ist auffällig dünn: 421 Wörter, kein Bild im Body, kein Inhaltsverzeichnis, keine Autorenzeile als Person, kein FAQ-Schema. Das `author`-Feld zeigt auf eine Organisation, nicht auf einen Menschen, obwohl die Seite `/experts` existiert.

### 9. https://bondvet.com/faq

| Feld | Wert |
|---|---|
| Title | "FAQ \| Bond Vet" |
| Meta-Description | "Bond Vet offers primary & urgent care. Read our frequently asked questions to learn more about who we are and what we offer." |
| H1 | "Frequently Asked Questions" |
| H2 / H3 | 23 H2 / 5 H3 |
| Schema.org | keine (0), obwohl 23 Fragen auf der Seite stehen: kein `FAQPage` |
| Medien | 0 `<img>`, 40 SVG |

**Sektionsliste:** H1-Block → Expander-Liste mit 23 Fragen (26 Expander-Instanzen im DOM) → CTA-Leiste → Footer. Die Fragen sind technisch H2 in einem `<dt>`-Button, nicht H3, dadurch ist die Überschriftenhierarchie untypisch flach.

**Funnel:** Die FAQ enthält die Preisfrage "What is your pricing like?" und die Antwort "What payment options do you offer?" ohne Preisnennung im SSR.

### 10. https://bondvet.com/booking und /booking/new-york-city und /booking/new-york-city/chelsea (Funnel)

| Feld | Wert |
|---|---|
| Title Schritt 1 | erbt die Startseiten-Metadaten ("Friendly, Compassionate Primary & Urgent Care For Pets \| Bond Vet") |
| Title Schritt 2 | "Book a Vet Appointment in New York City \| Bond Vet" |
| Title Schritt 3 | "Book a Vet Appointment \| Chelsea in New York City \| Bond Vet" |
| H1 | keiner (0 auf allen drei Stufen) |
| Schema.org | keine |
| Canonical | auf Schritt 1 `https://bondvet.com/*` (Platzhalter, nicht aufgelöst) |

**Funnel/Formular:**

| Merkmal | Befund |
|---|---|
| Fortschrittsanzeige | `<progress class="Progress-module--root--2bd04 BookingProgress-module--root--2dbcb" max="100" value="11.11111111111111" role="progressbar" aria-label="Booking progress indicator">` |
| Schritt 1 | `value="11.11111111111111"` = 1/9, Titel H3 "Choose a city" (Ziel `data-cy="citySelection"`) |
| Schritt 2 | `value="22.22222222222222"` = 2/9, H3 "Choose a location" mit Liste (Astoria, Bayside, Bed-Stuy, Chelsea, …) und Tabs "List"/"Map" |
| Schritt 3 | `value="33.33333333333333"` = 3/9, H3 "Choose a date, time and provider at <strong>Chelsea</strong>" mit Kalender-Select "Choose a Provider", Option "First Available Provider", Monatslabel "Sep 2026" |
| Weitere Schritte | Aus den Webpack-Chunk-Namen belegbar: `booking-pet`, `booking-client`, `booking-credit-card`, `booking-summary`, `booking-finished`, `booking-deeplink`. Neun Schritte passen zu 11,11 % pro Schritt |
| Fragetypen | Stadt und Standort als Kachel-/List-Auswahl, Datum als Kalender mit Wochenraster, Provider als Select, danach Formularfelder |
| Feldliste (aus i18n-Strings im Bundle) | `Pet's Name`, `Breed`, `Pet's Age*`, Checkbox `I know my pet's exact date of birth`, `Sex`, `Neutered/Spayed`, `Reason for Visit`, `More details, please!`, `First Name`, `Last Name`, `Email Address`, `Phone Number`, Checkbox `I would like to text with Bond Vet` |
| Wann persönliche Daten | Erst nach Stadt, Standort, Datum/Zeit und Pet-Daten; Kartendaten erst im Schritt `credit-card` |
| Microcopy | Das Bundle liefert den Grund für die Kreditkarte im Klartext: `"In order to secure your appointment, we require a credit card."` und die Stornogebühren-Erklärung mit Variablen `${lateCancelFee}`, `${lateCancelHours}`, `${lateRescheduleFee}`, `${lateRescheduleHours}`, `${noShowFee}` |
| Pflicht-Checkbox vor Abschluss | `"I have read and agree to follow Bond Vet's <link>cancellation policy</link>"` mit Fehlertext `"Please review the cancellation policy."` |
| Nach dem Abschluss | `"Thank you for scheduling an appointment.<br></br> We look forward to seeing you and <pet>{petName}</pet> soon."`, dann "Add to Calendar" und die Umfrage `referralSource` mit Frage `"How did you hear about us?"` und 9 Optionen (Friends/Family, Local Event, Corporate Program, Google, Instagram, Facebook, TikTok, Reddit, YouTube, …) |
| Verknappungs-Microcopy | Bei Vollbuchung: `"Looks like we don't have any availability at {location} on this day"` mit Verweis auf Nearby-Locations und "See all of our same-day availability" |
| Retargeting im Funnel | Bei leeren Slots verlinkt der Funnel zurück auf `/same-day` |
| Kein "kostenlos"/"unverbindlich" | Die Microcopy sagt das Gegenteil: die Kreditkarte ist Pflicht, Stornogebühren werden genannt |

### 11. https://bondvet.com/same-day (Verfügbarkeits-Filter)

| Feld | Wert |
|---|---|
| Title | "Same-day Appointment Availability \| Bond Vet" |
| H1 | "Today's Availability" |
| H2 / H3 | 0 H2 / 4 H3 |
| Schema.org | keine |
| Medien | 0 `<img>`, 17 SVG |

**Sektionsliste:**

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | CTA-Labels wörtlich | Hinweise |
|---|---|---|---|---|---|---|
| 1 | Filter-Hero (`AvailabilityHero-module--root--b8031`) | "Today's Availability" | "Changing the region or zip code below will immediately filter the list of clinics with same-day availability." | zentriert, Hintergrund `var(--light-blue-color)` `#ecf1f7`, mobil `margin-left:-37px` | "Submit" (Zip-Sortierung) | Select "New York City" plus Optionen (New York City, Boston, Philadelphia, Chicago, D.C. Area, Long Island, New Jersey), Eingabe "Sort by Zip Code..." |
| 2 | Fehlerzustand | keine | keine | keine | keine | Bei leerer Auswahl greift `animation:AvailabilityHero-module--shake--0891f .1s linear;animation-iteration-count:3` |
| 3 | Footer | wie überall | | | | Die Ergebnisliste selbst ist im SSR leer (0 Treffer für Clinic-Karten) |

### 12. https://bondvet.com/regions und /regions/new-york-city

| Feld | Wert |
|---|---|
| Title Regions | "Cities \| Bond Vet" |
| Title NYC | "Vet Clinic & Animal Hospital in NYC - 22 Locations \| Bond Vet" |
| H1 Regions | "Our Locations" |
| H1 NYC | "New York City Animal Hospitals" |
| H2 / H3 Regions | 7 H2 / 4 H3 |
| H2 / H3 NYC | 0 H2 / 4 H3 |
| Schema.org | keine auf beiden Seiten |

**Sektionen Regions:** H1 "Our Locations" plus Kartenliste mit 7 Regionen und Standortzahl. Jede Karte verlinkt auf die Region.

| Region | Standortzahl laut Seite | Sitemap-Standorte `/c/*` |
|---|---|---|
| New York City | 21 Locations | 21 |
| D.C. Area | 7 Locations | 7 |
| New Jersey | 6 Locations | 6 |
| Boston | 4 Locations | 4 |
| Chicago | 4 Locations | 4 |
| Long Island | 3 Locations | 3 |
| Philadelphia | 1 Location | 1 |

Die NYC-Seite hat einen Listen-/Karten-Umschalter und pro Standort eine Zeile aus Name, Adresse und "Book Now". Standortzahl in Title (22) und H1-Liste (21) widersprechen sich.

### 13. https://bondvet.com/c/chelsea-animal-hospital (Standortseite)

| Feld | Wert |
|---|---|
| Title | "Chelsea, NYC Animal Hospital & Vet Clinic - Checkups, Emergencies, & More \| Bond Vet" |
| Meta-Description | "Bond Vet in the heart of Chelsea NYC is an animal hospital that offers wellness visits and urgent care for sick pets. Open Mon-Fri, 9am-7pm & Sat-Sun 10am-8pm." |
| H1 | "A Convenient, Thorough Vet Clinic Chelsea" |
| H2 / H3 | 11 H2 / 13 H3 |
| Schema.org | `VeterinaryCare` mit `aggregateRating: {bestRating:5, ratingValue:4.599999904632568, reviewCount:489, worstRating:1}`, `LocalBusiness` mit `telephone:"+1-212-518-4667"`, `priceRange:"$$"`, `PostalAddress` (555 6th Ave, Manhattan, NY 10011), `GeoCoordinates` (40.7384717 / -73.9962774), 14x `ImageObject`, `Organization`, `FAQPage` mit 4 `Question`/`Answer` |
| Canonical | `https://bondvet.com/*` (Platzhalter, nicht aufgelöst) |
| Medien | 40 `<img>`, 97 SVG, 1 Iframe (`title="Virtual Tour"`, `src="about:blank"`, `loading="lazy"`) |

**Sektionsliste in DOM-Reihenfolge:**

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels wörtlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Location-Hero (`LocationHero-module--root--ab397`) | "A Convenient, Thorough Vet Clinic Chelsea" | "We offer a broad range of primary and urgent care services, from vaccinations and annual exams to those uh-oh moments when you need veterinary care ASAP." | 2 Spalten | 1 Foto "Bond Vet Chelsea - Lobby" | "Book Now", "555 6th Ave, Manhattan, NY 10011" (Google-Maps-Link), "See more ways to contact us" | "NEW Text Us: (646) 453-5158" (Ziel `sms:+16464535158`), **"489 Google Reviews"** mit 6 Sternen | Sterne-Farbe `#f4d6c6`, `font-size:1.5625rem` |
| 2 | Team | "Meet Your Care Team" | keine | Karten | 2 Portraits | keine | "Dr. Heather Jimenez" und "Dr. Zachary Lee", Rolle "Veterinarian" | |
| 3 | Info-Karten (`LocationCards-module--root--08a6a`) | "Things to Know" | keine | 3er-Grid | 3 Icons | keine | keine | Karten: "New to Bond?", "Getting Here" (Anfahrt mit F/M/L und A/C/E), "Virtual Visits" |
| 4 | Kalender-Teaser | keine | keine | Wochenraster | keine | "Go to next week" | keine | Kopfzeile "Sep 13 - Sep 19", H4 |
| 5 | Google-Reviews-Wand (`GoogleReviews-module--root--80e41`) | keine | keine | Bild-Hintergrund mit 3 überlagerten weissen Review-Karten | Hintergrundbild 30,1875 rem mobil, 53,125 rem ab 768 px | "see more on google" | Google-Sterne, echte Rezensionstexte mit Namensnennung (z.B. "Amin kinana") | Karte: weiss, `border-radius:.3125rem`, `height:18.25rem` ab 768 px, Breite 25 rem, Kommentar in `quotes:"“" "”"` mit `:before{content:open-quote}` |
| 6 | Standort-Finder | "Nearby Locations" | "Changing the region or zip code below will immediately filter the list of nearby clinics." | Filter plus Liste | Karte | "Submit" | keine | Select "Select a City" plus "New York City", Zip-Eingabe |
| 7 | E-Mail-Capture (`EmailCapture-module--e58c6`) | "Want to get updates about Chelsea?" | "Be the first to know about exclusive promotions, upcoming events, new clinic openings, and more." | 2-spaltig mit H4-Fragment | keine | "Sign up" | keine | H4 "Want to get updates about" und H3 "Chelsea ?" sind getrennte Elemente |
| 8 | Galerie-Carousel (`Carousel-module--root--40890`) | keine | keine | Carousel/Slider | 3 Bilder (Examination room, Pet in exam room, Vet with pet in lobby) | Pfeil-Buttons (SVG, Labels fehlen im SSR) | keine | Pfeile: `background:#295889`, `border-radius:50%`, `box-shadow:0 5px 8px 0 rgba(0,0,0,.25)`, 3,75 rem, `transition:background-color .3s ease`, Hover `#10365a`; Punkte: `background-color:var(--white-color)`, `border:1px solid var(--light-navy-color)`, `border-radius:50%`, 0,6875 rem, `transition:background-color .3s ease,border-color .3s ease` |
| 9 | Virtueller Rundgang (`VirtualTour-module--root--9d8b7`) | "Inside Our Clinics" | "Whether your dog or cat needs a last-minute checkup or a weekend appointment that fits your schedule, Bond Vet Chelsea makes it simple." | Text plus eingebetteter Rundgang | Iframe `about:blank` (Matterport o.ä., Ziel wird erst im JS gesetzt) | keine | keine | Hintergrund `#f1f6f8` |
| 10 | FAQ | "FAQs" | 4 Fragen | Expander (`Expander-module--root--3e5c1`, 7 Instanzen) | keine | keine | keine | Als `FAQPage` ausgezeichnet, anders als die Haupt-FAQ-Seite |
| 11 | CTA-Leiste plus Footer | "Better care, Right when you need it" | "We offer compassionate, thorough, and friendly care in a warm, comfortable environment." | zentriert | Wellen-SVG | "Book a visit" | keine | |

**Trust-Staffelung:** Die Standortseite ist die einzige Seite mit echtem Social Proof: 489 Google-Rezensionen, Note 4,6 im Schema, sechs Sterne, echte Review-Texte mit Namen, Team-Fotos, Anfahrtsbeschreibung, SMS-Nummer. Reihenfolge: Bewertungszahl im Hero, Team, Reviews, alles andere danach.

### 14. https://bondvet.com/experts

| Feld | Wert |
|---|---|
| Title | "Meet our Medical Experts \| Bond Vet" (Leerzeichen vor dem Pipe) |
| Meta-Description | Copy der Startseite ("We offer compassionate, thorough, and friendly care in a warm, comfortable environment. With convenient hours, same-day appointments, and telehealth, we're always here when you need us.") |
| H1 | "Meet Our Medical Experts" |
| H2 / H3 | 0 H2 / 6 H3 |
| Schema.org | keine (0), obwohl die Seite für E-E-A-T gebaut ist |
| Medien | 20 `<img>` |

**Sektionsliste:** H1-Block (`ExpertsHeader-module--root--e02b1`, H1 3,125 rem, `letter-spacing:-.09625rem`, `line-height:3.25rem`) mit H3 "Meet the Bond Vet medical experts & veterinary professionals that review and verify the medical accuracy of all of our information, resources, and articles." → Experten-Liste (`ExpertsList-module--root--075e4`) mit Portraits, Name, Rolle (z.B. "Kit Ying Crystal Leung, Medical Director") und ausführlicher Bio → CTA-Leiste → Footer. Der Body hat genau 6 H3, die Redaktionsrolle wird nur behauptet, nicht verlinkt.

### 15. https://bondvet.com/payment-options

| Feld | Wert |
|---|---|
| Title | "Bondvet Payment Options \| Bond Vet" (Schreibweise "Bondvet" im Titel) |
| H1 | "Discover Ways to Pay" |
| H2 / H3 | 7 H2 / 4 H3, 22 H4 |
| Schema.org | keine |
| Medien | 11 `<img>`, 53 SVG |

**Sektionen:** Hero halbseitig "Discover Ways to Pay" mit "Explore Payment Options" → 4 Blöcke des Typs `HalfPageWithCarousel-module--container--642bd`, je mit H2 und 4 H4: (1) "Pay Veterinary Costs Over Time with the CareCredit Credit Card*" mit 4 Nutzen, CTA "Learn More*" (extern `carecredit.com/go/864GHH/`), (2) "The Scoop on Pet Insurance" mit 3 H4 (What is pet insurance? / How does it work? / What should I consider?), CTA "Learn More" (intern `/b/pet-insurance`), (3) "Pay for Veterinary Care on Your Schedule with Zip" mit 4 H4, CTA "Learn More*" (extern `zip.co/us`), (4) "Additional Payment Options" mit CTA "View Your Pet Portal" → FAQ → Footer.

**Trust-Hinweise:** Jeder Finanzierungsblock trägt Sternchen-Disclaimer im Klartext, CareCredit "Subject to credit approval by CareCredit. See carecredit.com for details.", Zip "**Subject to credit Approval ***VISA is a trademark owned by Visa International Service Association and used under license. ****A fee may apply for payment date changes".

### 16. Nicht abrufbare bzw. leere Seiten

`https://bondvet.com/sitemap.xml` liefert 404, die Seite ist von der `sitemap-index.xml` erreichbar. Der Inhalt der 404-Antwort ist die Gatsby-Standardseite (703.338 Bytes), keine Sitemap. In `robots.txt` ist korrekt `Sitemap: https://bondvet.com/sitemap-index.xml` und `Sitemap: https://bondvet.com/careers/sitemap-index.xml` deklariert.

## Design-System

### Fonts

`fonts-deferred.css` lädt 12 Sailec-Schnitte über Type Dynamic (MyFonts-Build 3718361, 2019). Kritischer Pfad aus `styles.css`:

```css
@font-face{font-display:swap;font-family:Sailec;font-style:normal;font-weight:400;src:url(/static/38BCD9_A_0-9c7e0c72dc9f8c2a183fd77e36dbd483.woff2) format("woff2")}
@font-face{font-display:swap;font-family:Sailec;font-style:normal;font-weight:700;src:url(/static/38BCD9_0_0-5a8cd3de148d83d28bb3c5cffc1c2e3e.woff2) format("woff2")}
```

Die Kommentare in `fonts-deferred.css` dokumentieren die Absicht: `/* Regular (400) is critical, intentionally omitted */` und `/* Bold (700) is critical, intentionally omitted */`. Die Datei wird per `defer-fonts.js` mit `media="print"` und `load`-Umschaltung auf `media="all"` nachgeladen, plus `data-fonts-deferred-loaded="1"` als Marker.

Stack: `--ff:Sailec,Helvetica,Arial,sans-serif`. Gewichte als Tokens: `--fw-thin:200;--fw-light:300;--fw-regular:400;--fw-medium:500;--fw-bold:600;--fw-bolder:700;--fw-black:800`. Display-Font ist dieselbe Familie, nur in 900/Black.

Wix-Seiten nutzen zusätzlich `din-next-w01-light` für `--font_1` und Sailec-Varianten für alle anderen Rollen, Madefor für Wix-UI.

Es gibt keine Display-Font-Trennung. Headlines und Body teilen sich Sailec, unterscheiden sich nur in Gewicht und Grösse.

### Farben (häufigste Werte aus styles.css)

| Wert | Häufigkeit | Rolle |
|---|---|---|
| `#fff` | 173 | Flächen, Karten, Text auf Dunkel |
| `#10365a` | 160 | Primärfarbe, Headline, Fliesstext, CTA-Leisten-Hintergrund (`--primary-color`) |
| `#ff4d4d` | 39 | Akzent, Buttons, Links, Fehler (`--secondary-color`) |
| `#295889` | 37 | Sekundär-Ton für Hover und Blog-Headlines (`--primary-soft-color`) |
| `#f7f0eb` | 32 | Beige-Highlight hinter Textabschnitten (`--secondary-light-color`) |
| `#ecf1f7` | 31 | Hellblau für Award-Bar, Filter-Hero, Blog-Liste (`--light-blue-color`) |
| `#fbf4ef` | 26 | Membership-Block (`--primary-beige`) |
| `#f4d6c6` | 25 | Pfirsich für Sterne und Info-Tiles (`--primary-peach`) |
| `#f4e3d7` | 19 | Beige-strong |
| `#ccd6e0` | 16 | Beige-Linien |
| `#a4b2bf` | 14 | Grau-Blau für Uppercase-Labels |
| `#000` | 12 | Schattenbasis |

Die vollständige Token-Liste aus `:root`:

```css
--primary-color:#10365a;--primary-soft-color:#295889;--hover-color:#295889;--secondary-color:#ff4d4d;
--secondary-light-color:#f7f0eb;--success-color:#48d2a0;--light-color:rgba(0,0,0,.161);
--light-blue-color:#ecf1f7;--beige-color:#ccd6e0;--beige-strong-color:#f4e3d7;
--font-light-color:#dae6ed;--font-grey-color:#474747;--font-light-grey-color:#6d6d6d;
--disabled-cta-color:#f4e8df;--input-border-color:#6d6d6d;--error-red-color:#e11900;
--hover-red:#f04b4b;--disabled-red:#ffa6a6;--primary-peach:#f4d6c6;--primary-beige:#fbf4ef;
--light-navy-color:#506c87;--beige-color-new:#f8f1eb;--lilac-color:#d0cfe2
```

Hover-Verhalten der Buttons ändert nur die Tokens, die Utility-Klasse bleibt:

```css
.CallToAction-module--root--ecd2e{--color:var(--white-color);--bg-color:var(--secondary-color);--border-color:var(--secondary-color);background-color:var(--bg-color);border:1px solid var(--border-color);border-radius:4px;color:var(--color);font-size:1rem;font-weight:700;line-height:125%}
.CallToAction-module--root--ecd2e.CallToAction-module--contained--7db9c{--color:var(--white-color);--bg-color:var(--secondary-color)}
.CallToAction-module--root--ecd2e.CallToAction-module--outlined--ecf30{--color:var(--secondary-color);--bg-color:var(--white-color)}
.CallToAction-module--root--ecd2e.CallToAction-module--contained--7db9c:hover{--bg-color:var(--hover-red)}
.CallToAction-module--root--ecd2e.CallToAction-module--outlined--ecf30:hover{--color:var(--white-color);--bg-color:var(--secondary-color)}
.CallToAction-module--root--ecd2e.CallToAction-module--text--39722:hover{--color:var(--hover-red)}
.CallToAction-module--root--ecd2e.CallToAction-module--primary--e74a6:hover{--bg-color:var(--primary-soft-color)}
```

Wichtig: Der Primär-Button ist NICHT pill. `border-radius:4px`. Pill-Radien gibt es nur bei Spezialfällen (Kategorie-Pill 0,5625 rem, Sucheingabe `border-radius:6.25rem` in der Karriere-Variante).

### Radius

| Wert | Häufigkeit | Verwendung |
|---|---|---|
| .8125 rem (13px) | 39 | Karten (Card, Expander, ServiceList, Different-locations) |
| .625 rem (10px) | 37 | Award-Bar, Merger-Announcement, Info-Tiles |
| 1,875 rem (30px) | 26 | Sonderfälle (Blog-Preview-Button `border-radius:30px 0 0 30px`) |
| 1,25 rem (20px) | 22 | BlogCard |
| .5 rem (8px) | 21 | kleinere Flächen |
| .25 rem (4px) | 20 | Buttons |
| 50% | 18 | Carousel-Pfeile, Punkte, runde Bilder |
| var(--tina-radius-small) | 11 | Tina-CMS-Variablen, im ausgelieferten CSS nicht aufgelöst |
| .375 rem (6px) | 10 | |

### Shadows

| Wert | Häufigkeit |
|---|---|
| `0 0 3px rgba(0,0,0,.12)` | 44 |
| `0 0 4px rgba(0,0,0,.16)` | 15 |
| `none` | 12 |
| `0 0 .1875rem rgba(0,0,0,.12)` | 10 |
| `0 -.15em 0 .1em #f7f0eb,0 .15em 0 .1em #f7f0eb` | 6 (Text-Highlight-Trick) |
| `var(--nav-shadow)` = `0 2px 3px rgba(0,0,0,.29)` | 3 |
| `0 5px 8px 0 rgba(0,0,0,.25)` | 3 (Carousel-Pfeile) |

Der Text-Highlight-Trick ist das auffälligste Detail: `<strong>` innerhalb von Fliesstext bekommt keinen Fettdruck, sondern einen farbigen Hintergrund plus `box-shadow` mit `.15em` Überstand oben und unten und `box-decoration-break:clone`:

```css
.Different-module--left--53ebe p strong{background-color:#f7f0eb;-webkit-box-decoration-break:clone;box-decoration-break:clone;box-shadow:0 -.15em 0 .1em #f7f0eb,0 .15em 0 .1em #f7f0eb;font-style:normal;font-weight:var(--fw-regular)}
.Hero-module--hero--2a795 h1 strong{background-color:#fff;-webkit-box-decoration-break:clone;box-decoration-break:clone;box-shadow:0 -.15em 0 .1em #fff,0 .15em 0 .1em #fff;font-style:normal;font-weight:var(--fw-black)}
```

### Spacing und Container

```css
:root{--content-width:calc(100vw - 74px);--content-padding:37px;--column-gap:0.625rem;--column-count:5}
@media only screen and (min-width:768px){:root{--content-width:min(calc(100vw - var(--content-padding)*2),1440px);--column-count:24;--column-width:calc((var(--content-width) - (var(--column-count) + 1)*var(--column-gap))/var(--column-count))}}
@media only screen and (min-width:1244px){:root{--nav-logo-height:29px;--nav-height:109px}}
```

Das System ist ein 24-Spalten-Grid mit 0,625 rem Gutter und einem Container, der bei 1440 px deckelt. Section-Abstand ist `9.375rem` über die Klasse `default-section-margin` (ab 768 px), Standard-Sektionsabstände liegen bei `5rem`. Nav-Höhe ist dreistufig: 60 px mobil, 109 px ab 1244 px, 66 px im Scroll-Zustand (`:root.scrolling{--nav-height:66px}`).

Breakpoints: 480, 767,9, 768, 899,9, 900, 1024, 1243,9, 1244, 1512, 1514 px. Am häufigsten: 631 Regeln bei `min-width:768px`, 196 bei `max-width:767.9px`, 63 bei `max-width:899.9px`, 53 bei `min-width:1244px`.

### Typo-Skala

```css
--fs:16px;--fs-1:3.125rem;--fs-1-sm:2.1875rem;--fs-2:2.5rem;--fs-3:1.5625rem;--fs-4:1.25rem;--fs-4-sm:0.9375rem;--fs-5:1rem
```

Body:

```css
body{color:var(--color);font-size:1.125rem;font-weight:var(--fw-regular);letter-spacing:-.034375rem;line-height:1.8333333333}
```

H1 Hero, drei Stufen ohne clamp:

```css
.Hero-module--hero--2a795 h1{font-size:2.1875rem;font-weight:var(--fw-medium);line-height:1.5714285714}
@media (min-width:768px){.Hero-module--hero--2a795 h1{font-size:2.5rem;letter-spacing:-.09625rem;line-height:1.6}}
@media (min-width:1244px){.Hero-module--hero--2a795 h1{font-size:3.125rem}}
```

H2 Standard:

```css
.Title-module--title--aaf16{color:var(--primary-color);font-size:2.5rem;font-weight:var(--fw-medium);letter-spacing:-.0307em;line-height:1;text-align:center;text-transform:capitalize}
@media (min-width:768px){.Title-module--title--aaf16{font-size:3.125rem;line-height:1.04}}
```

Clamp wird nur 12x in der gesamten CSS-Datei benutzt und nie für Schriftgrössen, sondern für Bild- und Tabellenmasse (`height:clamp(18.75rem,37.5vw,31.25rem)`, `padding:clamp(.5rem,2vw,.75rem) clamp(.625rem,2.5vw,1.25rem)`).

### Bilder

- Formate: WebP und PNG/JPG über `<picture>` mit `type="image/webp"`-Source, kein AVIF (0 Treffer).
- `loading="lazy"` 14x auf der Startseite, `loading="eager"` 0x, `fetchpriority` 0x (auch im Hero).
- `srcset` 89x auf der Startseite, Gatsby-`.gatsby-image-wrapper` mit `max-width` Platzhalter, `data-placeholder-image` mit `transition:opacity 500ms linear` und Inline-`opacity:1` im SSR.
- Alle Bilder haben `alt`, wichtige Bilder beschreibend ("Veterinarian with a dog and a client in an exam room", "Newsweek's America's Best Animal Hospitals 2025 Award Badge"), Deko-Bilder `alt=""` mit `aria-hidden="true"`.
- 0 Videos, 25 SVG auf der Startseite. SVG wird überall für Icons und die Wellen-Übergänge eingesetzt.

### Tech-Stack, belegt

| Marker | Beleg |
|---|---|
| Gatsby 5.13.7 | `<meta name="generator" content="Gatsby 5.13.7"/>` auf allen Nicht-Wix-Seiten |
| React + Emotion | `data-emotion="css z01bqi"`, emotion-generierte Stylesheets im Body |
| Tina CMS | 80 CSS-Variablen mit Präfix `--tina-` (`--tina-color-primary`, `--tina-radius-small`, `--tina-z-index-4`), im Root nicht definiert |
| Material UI | `MuiCircularProgress-root MuiCircularProgress-indeterminate` |
| Wix | `<meta name="generator" content="Wix.com Website Builder"/>`, `wixui-section`, `x-wix-request-id`, `static.parastorage.com` |
| Swiper | `swiper-icons` Font, `swiper-vertical.swiper-css-mode` Regeln |
| react-multi-carousel | `react-multi-carousel-list`, im About-us- und Blog-Kontext |
| Partytown 0.8.0 | `/* Partytown 0.8.0 - MIT builder.io */` und `document.currentScript.dataset.partytown=""` |
| Proxy für Tracker | `hostnamesToProxy=['connect.facebook.net','static.hotjar.com','vars.hotjar.com','ads.nextdoor.com','www.redditstatic.com']`, Weiterleitung auf `https://proxy.bondvet.com` |
| Kein GSAP, kein Lenis, kein AOS, kein Framer Motion, kein Lottie, kein Rive, kein Three.js | 0 Treffer in `app-*.js`, `framework-*.js` und `styles.css` für diese Namen als Bibliothek |

### Animationen

**Transitions:** 109 `transition:`-Deklarationen in der CSS-Datei. Dauer-Häufigkeit: `.2s` 27x, `.3s` 17x, `0.2s` 11x, `.4s` 9x. Easing: `ease-in-out` und `ease` dominieren, `linear` nur für Logo-Fades, `cubic-bezier` nur im MUI-Spinner und in Wix-CSS.

Die zwei zentralen Tokens:

```css
--intro-transition-length:1.1s;--intro-transition-timing:ease-out;--intro-transition:var(--intro-transition-length) var(--intro-transition-timing);--scrolling-transition:0.4s linear
```

Häufigste vollständige Transitions:

| Zahl | Wert |
|---|---|
| 11 | `0.2s ease-in-out` |
| 9 | `background-color var(--transition),color var(--transition)` |
| 5 | `width .4s ease-in-out` |
| 5 | `all .2s ease` |
| 5 | `background-color .2s ease` |
| 4 | `opacity var(--transition)` |
| 3 | `opacity var(--intro-transition),transform var(--intro-transition)` |
| 3 | `background-color .3s ease` |
| 3 | `all .3s ease-in-out` |
| 3 | `box-shadow .2s ease` |

**Keyframes in der eigenen CSS-Datei (6 Stück):**

| Name | Inhalt | Wirkung |
|---|---|---|
| `ReferralSourceModal-module--modalFadeIn--c0d8c` | `0%{opacity:0}to{opacity:1}` | Modal-Einblendung |
| `BookingBanner-module--slide-top--4aa81` | `0%{transform:translateY(100px)}to{transform:translateY(0)}` | Buchungs-Banner von unten |
| `BookingBanner-module--slide-bottom--604e8` | `0%{transform:translateY(-100px)}to{transform:translateY(0)}` | Buchungs-Banner von oben |
| `Stamp-module--rotate--526a9` | `0%{transform:rotate(0deg)}to{transform:rotate(1turn)}` | rotierender Stempel, `10s linear infinite` |
| `AvailabilityHero-module--shake--0891f` | `0%{left:-5px}to{right:-5px}` | Fehler-Shake, `.1s linear`, 3 Wiederholungen |
| `ConsultationInfoTile-module--fadeIn--e486f` | `0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}` | Info-Kachel, `.3s ease-in-out` |

**Intro-Animation des Heros:** Das ist das einzige choreografierte Element. Vor JS-Signal ist der Hero unsichtbar und nach unten verschoben, nach `.booted` klappt alles auf:

```css
.Hero-module--hero--2a795 .Hero-module--button--9429f,.Hero-module--hero--2a795 h1{opacity:0;transform:translateY(30vh)}
.booted .Hero-module--hero--2a795 .Hero-module--button--9429f,.booted .Hero-module--hero--2a795 h1,.no-js .Hero-module--hero--2a795 .Hero-module--button--9429f,.no-js .Hero-module--hero--2a795 h1{opacity:1;transform:none}
.Hero-module--hero--2a795 h1{transition:opacity var(--intro-transition),transform var(--intro-transition)}
.Hero-module--hero--2a795:after{background-color:var(--secondary-light-color);content:"";height:0;left:calc(50% - 50vw);position:absolute;top:100%;transition:top var(--intro-transition),height var(--intro-transition);width:100vw}
.booted .Hero-module--hero--2a795:after{height:100%;top:0}
.Hero-module--img--fd410{max-width:1px;transition:max-width var(--intro-transition)}
.booted .Hero-module--img--fd410{margin:0;max-width:50vw}
```

Das heisst: H1 und Buttons fahren aus 30vh Höhe hoch, das Bild wächst per `max-width` von 1 px auf 50 vw, die Hintergrundfläche fährt von `height:0` auf `height:100%`. Alles in `1.1s ease-out`. Die Klasse `.booted` steht schon im SSR-`<html class="no-js booted">`, das Skript setzt sie.

**Nav:** Ebenfalls per Intro-Klasse:

```css
.Nav-module--root--7e616{opacity:0;transform:translateY(calc(1px - var(--nav-height)));transition:transform var(--intro-transition),opacity var(--intro-transition),height var(--scrolling-transition),padding var(--scrolling-transition),box-shadow var(--scrolling-transition)}
.booted .Nav-module--root--7e616{opacity:1;transform:none}
.scrolling.booted .Nav-module--root--7e616{opacity:.95}
.Nav-module--spacer--2b02b{height:var(--nav-height);transition:height var(--scrolling-transition)}
```

**Scroll-Reveal:** Keiner. 0 Treffer für `data-aos`, `aos-init`, `fade-up`, `reveal`, `data-w-id`, `wow`, `ScrollReveal`, `data-scroll`, `sal(` auf der Startseite. `IntersectionObserver` existiert im Bundle nur als Polyfill (Modul 18504 ist das offizielle IntersectionObserver-Polyfill) und für Gatsby-Prefetch. Kein Scroll-Progress, keine Parallaxe, keine Sticky-Sections mit Pinning.

**Zähler-Animationen:** Keine. Zahlen wie "489 Google Reviews", "21 Locations", "74 Ärzte" stehen statisch im HTML.

**Marquee:** Keines in der eigenen CSS-Datei.

**Video-Autoplay:** Keine Videos auf allen 19 geprüften Seiten (0 `<video>`-Tags).

**Reduced-Motion:** In der Gatsby-CSS 0 Treffer für `prefers-reduced-motion`. Auf den Wix-Seiten 2 Treffer, aber nur für Wix-eigene View-Transitions (`::view-transition-group(*){animation:none!important}`). Der 1,1-Sekunden-Hero-Intro, der 10-Sekunden-Stempel und die Hover-Transitions laufen für alle Nutzer unverändert.

**Hover-Effekte:** 195 `:hover`-Vorkommen, 163 Regelblöcke, 30 davon in `@media(hover:hover)` gekapselt. Muster:

| Element | Änderung |
|---|---|
| Primärbutton | `--bg-color` auf `#f04b4b` |
| Outline-Button | füllt sich rot, Text weiss |
| Textlink-Button | Farbe auf `#f04b4b` |
| Nav-Link | `color:var(--secondary-color)`, zusätzlich `stroke` des Dropdown-Pfeils |
| Footer-Link | `text-decoration:underline` |
| Social-Icon | `color:var(--hover-red)` |
| Kategorie-Pill | `border-color:var(--secondary-color)` im aktiven Zustand |
| Carousel-Pfeil | `background:#10365a` statt `#295889` |
| Submit-Pfeil im Newsletter | `background-color:var(--hover-red)` |

**MUI-Spinner-Keyframes** (aus Emotion-Inline-Styles, pro Instanz dupliziert, 7x auf der Startseite):

```css
@keyframes animation-61bdi0{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
@keyframes animation-1p2h4ri{0%{stroke-dasharray:1px,200px;stroke-dashoffset:0}50%{stroke-dasharray:100px,200px;stroke-dashoffset:-15px}100%{stroke-dasharray:100px,200px;stroke-dashoffset:-125px}}
```

**Wix-Seiten:** 487 `transition:`-Deklarationen, häufigste Werte `opacity 300ms cubic-bezier(.39,.11,.37,.99) 0ms` (60x) und `transform .4s cubic-bezier(.3,.13,.12,1),filter .5s ease,opacity .5s ease!important` (24x). Dazu 40 `@keyframes`-Blöcke, viele mit obfuskierten Namen (`_3Dk1w`, `aYoad`, `MVh4s`, `W5vtYG`), daneben sprechende wie `slide-horizontal-new`, `out-in-old` und `CopyUrlButton64520312__bounce-in`.

## Synthese

### 1. Seitentyp-Blueprints

**Startseite** (8 Sektionen):
1. Sticky-Header mit Logo, Dropdown-Nav, "Log In", rotem "BOOK NOW" (Full-bleed, sticky)
2. Hero: H1 als Verfügbarkeitsversprechen, 2 CTAs, Foto rechts (2 Spalten 50/50 auf 24er-Grid, Bild mobil full-bleed)
3. Merger-Announcement-Box über dem Hero (Zentriert, farbige Box)
4. Award-Bar mit Siegel (2 Spalten ab 768 px, Card mit Hellblau)
5. Zigzag "We're Different": links Claim, rechts 4 Nutzen-Karten (2 Spalten 11/13, Auto-Fit-Grid)
6. Nachgeladener Content-Bereich mit Spinner-Platzhaltern (Zentriert)
7. CTA-Leiste mit Wellenübergang (Full-bleed dunkel, Zentriert)
8. Footer mit 5 Gruppen (5er-Grid mobil gestapelt)

**Leistungsseite Wix-Typ (Urgent Care, Preventive Care, Puppy Visits)** (10 Sektionen, identische Schablone):
1. Wix-Header, doppelte Nav im DOM (Full-bleed)
2. Hero mit H5-Eyebrow, H1, 1 Foto, 1 CTA (Zentriert)
3. Erklärblock mit 3 bis 4 H2 und Fliesstext plus Inline-FAQ (Text plus Icons)
4. FAQ-Block 1, thematisch fremd (Akkordeon)
5. FAQ-Block 2, thematisch passend (Akkordeon)
6. Final-CTA mit Maskottchen-Grafik (Zentriert)
7. FAQ-Block 3, thematisch fremd (Akkordeon)
8. Final-CTA, wortgleich wiederholt, anderer Hintergrund, CTA ohne Link (Zentriert)
9. Wix-Footer (5 Gruppen)
10. Footer-Duplikat im DOM

**Leistungsseite Gatsby-Typ (Surgery)** (5 Sektionen):
1. Hero full-width mit Eyebrow, H1, Subline, 1 Foto, 1 CTA mit Deep-Link-Parameter (Zentriert dunkel)
2. Team-Teaser mit Personenname und Fachtitel (2 Spalten)
3. Leistungs-Kartenliste, 13 Einträge (Karten-Grid)
4. FAQ-Akkordeon, 16 Fragen (Akkordeon)
5. Standort-Finder mit Karte und Liste (Karte + Liste)

**Produktseite (Membership)** (5 Sektionen):
1. Hero halbseitig: H1, Subline, 1 Foto, 1 CTA (2 Spalten 50/50)
2. Nutzen-Kartenliste mit Preisanker (Karten, farbiger Hintergrund)
3. Regions-Tabs plus Preis und CTA (Tabs)
4. FAQ, 16 Fragen (Akkordeon)
5. CTA-Leiste und Footer (Zentriert)

**Über-uns** (5 Sektionen):
1. Missionstext mit kleinem Bild, Zentriert-schmal
2. Leadership-Grid, 7 Personen mit Titeln (3er-/4er-Grid)
3. Medical-Team-Grid, 74 Personen (Karten-Grid, sehr lang)
4. Kultur-Tabs mit 5 Panels und Pfeil-Navigation (Tabs)
5. CTA-Leiste und Footer

**Ratgeber-Übersicht** (5 Sektionen):
1. H1-Hero (Zentriert)
2. Kategorie-Pills in 2 Reihen (Pill-Leiste, mobil Modalklappe)
3. Artikel-Grid, 2 Spalten ab 768 px, Karten mit 300 px Bild, H3, Teaser, "Read more" (2er-Grid)
4. Pagination (Zentriert)
5. Footer

**Ratgeber-Artikel** (6 Sektionen):
1. Artikel-Hero mit Foto links, Datum und H1 rechts (2 Spalten 600px/1fr)
2. Fliesstext mit H2/H3 in `#295889`, Inhalt in `grid-column:3/-3` (Zentriert-schmal im 24er-Grid)
3. Zwischen-CTA "Need a Vet? Book a Visit." (Inline, roter Button)
4. Related Articles mit 3 Karten (3er-Grid mit Verbindungslinien)
5. CTA-Leiste
6. Footer

**Funnel (Buchung, 9 Schritte)** (je Schritt eine Vollbild-Ansicht):
1. Fortschrittsbalken oben (0,5 rem hoch, weiss auf `#f7f0eb`)
2. Buchungs-Header mit Logo, kein Menü
3. Schritt 1: Stadt als Kachel-Liste mit Standortzahl (11,11 %)
4. Schritt 2: Standort als Liste oder Karte (22,22 %)
5. Schritt 3: Datum, Zeit, Provider als Kalender und Select (33,33 %)
6. Schritte 4 bis 8: Pet-Details, Grund, Kundendaten, Kreditkarte, Zusammenfassung
7. Schritt 9: Bestätigung mit Add-to-Calendar und Herkunftsumfrage
8. Kein Footer, keine Navigation weg vom Funnel

**Standortseite** (11 Sektionen):
1. Location-Hero: H1, Standort-Subline, Foto, "Book Now", Google-Maps-Adresse, SMS-Nummer, "489 Google Reviews" mit Sternen (2 Spalten)
2. Team mit 2 Portraits (Karten)
3. Info-Karten "Things to Know" mit Anfahrt (3er-Grid)
4. Kalender-Teaser (Wochenraster)
5. Google-Reviews-Wand mit 3 Karten auf Bildhintergrund (Full-bleed mit Overlay)
6. Standort-Finder mit Filter (Filter plus Liste)
7. E-Mail-Capture mit Standortnamen (2 Spalten)
8. Galerie-Carousel (Carousel)
9. Virtueller Rundgang mit Iframe (Text plus Embed)
10. FAQ, 4 Fragen, als `FAQPage` ausgezeichnet (Akkordeon)
11. CTA-Leiste und Footer

**Verfügbarkeits-Filter (/same-day)** (3 Sektionen):
1. Filter-Hero mit Select und Zip-Eingabe (Zentriert, hellblau)
2. Ergebnisliste (im SSR leer, clientseitig gefüllt)
3. Footer

**Regionen-Übersicht und Region** (2 bis 3 Sektionen):
1. H1 plus Regionskarten mit Standortzahl (Karten-Grid)
2. Bei Region: Liste/Karten-Umschalter, Standortzeilen mit Adresse und "Book Now"
3. Footer

### 2. Die 5 stärksten Muster

**Muster 1, Verfügbarkeit als Headline statt Nutzenversprechen.** Die Startseite schreibt in die H1 keinen Nutzen, sondern eine Öffnungszeit: "Open 7 days a week at most locations. Walk-ins welcome." (home.html, Offset 703097). Beleg in der Struktur: der komplette Buchungsfunnel hängt an `/booking/city`, und der Knappheits-Pfad `/same-day` ist ein eigener Navigationspunkt ganz oben. Für eine Dienstleistung mit Termindruck ist die Verfügbarkeit selbst das Produkt.

**Muster 2, Text-Highlight per `box-shadow` statt Fettdruck.** Statt `<strong>` fett zu setzen, legt das System einen farbigen Kasten hinter den Text und bricht ihn über Zeilen um:
`box-shadow:0 -.15em 0 .1em #f7f0eb,0 .15em 0 .1em #f7f0eb` plus `box-decoration-break:clone` (styles.css, Offset 340524). Im Hero dasselbe mit weissem Kasten um das black-gewichtete "Walk-ins welcome." (styles.css, Offset 528961 ff). Das erzeugt einen Marker-Effekt ohne Textauszeichnung und funktioniert mit der 1,8333-Zehenhöhe des Body.

**Muster 3, Token-Umschaltung für alle Button-Zustände.** Buttons sind drei Zeilen: Basis-Deklaration plus zwei Varianten, die nur `--color`, `--bg-color`, `--border-color` setzen. Hover ändert ein Token, sonst nichts.
`CallToAction-module--root--ecd2e{--color:var(--white-color);--bg-color:var(--secondary-color);border-radius:4px;border:1px solid var(--border-color)}` und `CallToAction-module--contained--7db9c:hover{--bg-color:var(--hover-red)}` (styles.css, Offset 80946). Dadurch bleibt jeder Hover eine Ein-Zeilen-Regel, und eine neue Button-Variante kostet zwei Zeilen.

**Muster 4, der Funnel als eigener Bildschirm ohne Ablenkung.** `/booking/*` rendert eine eigene Vollbild-Anwendung: `Booking-module--root--a4321{display:grid;grid-template-columns:100vw;grid-template-rows:var(--progress-height) var(--nav-height) 1fr;height:calc(100vh - var(--adbar-height));overflow:hidden}` (styles.css, Offset 29628). Kein Haupt-Nav, kein Footer, nur Logo plus Fortschrittsbalken. Der Fortschritt ist echt berechnet und in drei Stufen belegt: 11,11 %, 22,22 %, 33,33 % (booking.html, booking_nyc.html, booking_chelsea.html), also 9 Schritte. Preis der Konversion ist die Kreditkarte, die Microcopy sagt es offen: `"In order to secure your appointment, we require a credit card."`

**Muster 5, ein 24-Spalten-Grid als einziges Layoutwerkzeug.** Alles ist `display:grid;grid-template-columns:repeat(24,1fr)` mit `grid-column`-Spans: Hero `1/span 12` und `12/-1`, "We're Different" `span 11` und `span 13`, Blog-Content `3/-3`, Blog-Hero `600px 1fr`, Different-Karten `repeat(auto-fit,minmax(14.375rem,1fr))`. Der Container ist an einer Stelle definiert: `--content-width:min(calc(100vw - var(--content-padding)*2),1440px)` (styles.css, Offset 4191). Es gibt keine zweite Layoutsprache, kein Flexbox-Sonderlayout, keine Ausnahmen.

### 3. Animation-Rezepte mit exakten Werten

**Rezept A, Hero-Intro mit drei gleichzeitigen Bewegungen (1,1 s ease-out).** Die auffälligste Animation der Site. Alle drei Effekte nutzen dasselbe Timing-Token.

```css
:root{--intro-transition-length:1.1s;--intro-transition-timing:ease-out;--intro-transition:var(--intro-transition-length) var(--intro-transition-timing)}
.hero h1,.hero .btn{opacity:0;transform:translateY(30vh)}
.hero__img{max-width:1px;transition:max-width var(--intro-transition)}
.hero:after{background:var(--secondary-light-color);height:0;transition:top var(--intro-transition),height var(--intro-transition)}
.booted .hero h1,.booted .hero .btn{opacity:1;transform:none}
.booted .hero__img{max-width:50vw}
.booted .hero:after{height:100%;top:0}
```

Trigger: die Klasse `.booted` auf `<html>`, gesetzt sobald das JS läuft. Sie steht im SSR bereits im Markup (`<html class="no-js booted">`), die Animation ist also ein reines CSS-Progressiv-Enhancement. Belastbar, weil `booted` neunmal im Startseiten-HTML vorkommt. `30vh` ist aus `styles.css` Offset 528961 wörtlich belegt.

**Rezept B, FAQ-Akkordeon über `[hidden]` auf dem Definitionskörper (0,3 s ease-in-out).** Ohne JS-Höhenberechnung, nur `max-height` und `opacity`.

```css
.Expander{background:#fff;border-radius:.8125rem;box-shadow:0 0 .1875rem rgba(0,0,0,.12);transition:all .3s ease-in-out}
.Expander__term>button svg line{stroke:#ff4d4d;opacity:1;transition:all .3s ease-in-out}
.Expander__term>button svg line[hidden]{display:initial;opacity:0}
.Expander__definition{max-height:50rem;opacity:1;overflow:hidden;transition:all .3s ease-in-out;padding:1.25rem 1.875rem 1.875rem 2.625rem}
.Expander__definition[hidden]{max-height:0;opacity:0;padding-bottom:0;padding-top:0}
```

Das Plus-Icon besteht aus zwei Linien, bei offenem Zustand wird die waagerechte Linie über `opacity:0` ausgeblendet, übrig bleibt das Minus. Markup ist `<dl>` mit `<dt><button aria-expanded="false"><h2>` und `<dd hidden>`. Beleg: `Expander-module--root--3e5c1` styles.css Offset 281708, Instanz auf faq.html (26 Stück).

**Rezept C, Fehler-Shake im Filter (0,1 s linear, 3 Iterationen).**

```css
@keyframes shake{0%{left:-5px}to{right:-5px}}
.AvailabilityHero-module--error--facff{animation:AvailabilityHero-module--shake--0891f .1s linear;animation-iteration-count:3;position:relative}
```

styles.css Offset 514796. Wichtig: der Keyframe animiert `left` und `right` gegenläufig, nicht `translateX`. Dadurch ruckelt es härter als ein normaler Shake.

**Rezept D, rotierender Stempel (10 s linear, unendlich).**

```css
@keyframes Stamp-module--rotate--526a9{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}
.Stamp-module--root--b17e5 .text{fill:var(--color);animation:Stamp-module--rotate--526a9 10s linear infinite;transform-origin:center center}
.Stamp-module--root--b17e5.Stamp-module--zoomed--a8e71 .text{animation:none}
.Stamp-module--root--b17e5{--color:#d5dde5;width:240px}
```

styles.css Offset 234905. `rotate(1turn)` statt `rotate(360deg)`, damit der Loop keine Sprünge hat. Das Zoomed-Flag schaltet die Animation ab, wenn gross dargestellt wird.

**Rezept E, Nav-Schrumpfung beim Scrollen (0,4 s linear).**

```css
:root{--scrolling-transition:0.4s linear}
:root{--nav-height:60px}
@media (min-width:1244px){:root{--nav-height:109px}}
:root.scrolling{--nav-height:66px}
.Nav .spacer{height:var(--nav-height);transition:height var(--scrolling-transition)}
.Nav{transition:transform var(--intro-transition),opacity var(--intro-transition),height var(--scrolling-transition),padding var(--scrolling-transition),box-shadow var(--scrolling-transition)}
.scrolling .Nav{box-shadow:var(--nav-shadow)}
.scrolling.booted .Nav{opacity:.95}
.scrolling .NavLogo svg path{transition:opacity .3s linear}
.scrolling .scrolling .NavLogo svg path{opacity:0}
.scrolling .NavLogo svg path.logo__icon{opacity:1}
```

Beleg: `styles.css` Offsets 4124, 3477, 4402. Das Logo ist ein SVG mit zwei Pfadgruppen (Icon und Wortmarke), beim Scrollen blendet die Wortmarke aus und nur das Herz-Icon bleibt, damit die 66-px-Leiste nicht überladen wirkt.

**Rezept F, Buchungs-Banner-Vorfahrt (0,5 s ease-in, `both`).**

```css
@keyframes slide-top{0%{transform:translateY(100px)}to{transform:translateY(0)}}
@keyframes slide-bottom{0%{transform:translateY(-100px)}to{transform:translateY(0)}}
.BookingBanner.visible.top-position{animation:BookingBanner-module--slide-bottom--604e8 .5s ease-in both;top:0}
.BookingBanner.visible.bottom-position{animation:BookingBanner-module--slide-top--4aa81 .5s ease-in both;bottom:0}
```

styles.css Offset 205430. `both` ist nötig, damit der Startzustand ausserhalb des Viewports nicht zurückspringt.

**Nicht belegbar:** Ob es Zeitsteuerung oder Verzögerungen zwischen den Hero-Elementen gibt, lässt sich aus dem ausgelieferten CSS nicht ablesen. Alle drei Hero-Bewegungen starten am selben `.booted`-Moment mit identischem Timing, also ist die Choreografie ein einziger Schlag, keine Staffelung. Es gibt keinen Scroll-Trigger, keine Stagger-Verzögerung und keinen Intersection-Observer für Reveals, das ist durch 0 Treffer für alle gängigen Reveal-Marker belegt.

### 4. Anti-Patterns, was wir nicht übernehmen

**Anti-Pattern 1, drei FAQ-Blöcke pro Leistungsseite, zwei davon thematisch falsch.** Die Urgent-Care-Seite (Wix) enthält zwei fremde FAQ-Blöcke: 7 Preventive-Care-Fragen und 3 Puppy-Vaccine-Fragen, dazwischen der eigene Block. Beleg: `veterinary-clinic-services_urgent-care.html`, Überschriftenfolge ab "Frequently asked questions" (Offset 1334946), dann "Frequently Asked Questions" mit "What is included in a preventive care visit?" und nochmal "Frequently Asked Questions" mit "What does my first puppy vaccine appointment consist of?". Für den Nutzer entsteht der Eindruck, er sei auf der falschen Seite.

**Anti-Pattern 2, doppelte Footer und doppelte Nav auf Wix-Seiten.** Der Footer-Markup liegt zweimal im DOM, die Hauptnavigation ebenfalls. Beleg: `out_urgent-care`, der Wix-Footer erscheint als zwei `<section>`-Knoten mit identischem Text.

**Anti-Pattern 3, mehrere H1 pro Seite auf Wix-Seiten.** 4 H1 auf Urgent Care und Preventive Care, 3 auf der Service-Übersicht, 0 auf About-us und im Funnel. Beleg: `veterinary-clinic-services_urgent-care.html` liefert "Same-Day Urgent Vet Care for Dogs & Cats", "Better care, right when you need it.", "Frequently Asked Questions" und nochmal "Better care, right when you need it." als H1.

**Anti-Pattern 4, Canonical-Platzhalter auf Standort- und Buchungsseiten.** `https://bondvet.com/c/chelsea-animal-hospital` und `/booking` liefern `rel="canonical" href="https://bondvet.com/*"`. Beleg: `clinic.html`, Offset 673460, und `booking.html`, gleicher Wert. Ein Sternchen-Canonical ist ein unaufgelöstes Template, das 46 Standortseiten und den Funnel aus dem Index kippen kann.

**Anti-Pattern 5, kein `prefers-reduced-motion` in der eigenen CSS-Datei.** 0 Treffer für den Medienquery in `styles.css`, bei 109 Transitions und einem 1,1-Sekunden-Hero-Intro plus einem unendlich rotierenden Stempel. Die Wix-Seiten haben den Query nur für Wix-eigene View-Transitions.

**Anti-Pattern 6, `author` im Artikel-Schema zeigt auf eine Organisation, obwohl es eine Seite mit 74 Ärzten gibt.** `blog_artikel.html` liefert `"author":{"@type":"Organization","name":"Bond Vet","url":"https://bondvet.com/experts"}` und keine Autorenzeile im Body.

**Anti-Pattern 7, `FAQPage`-Schema auf der falschen Seite.** Die Standortseite mit 4 Fragen ist als `FAQPage` markiert, die zentrale FAQ-Seite mit 23 Fragen hat 0 `ld+json`-Blöcke. Beleg: `clinic.html` (FAQPage, 4 Question/Answer) gegen `faq.html` (0 Schema-Typen).

**Anti-Pattern 8, Meta-Description-Kopien.** `/experts`, `/regions`, `/same-day` und `/blog` teilen sich denselben Beschreibungstext, der die Startseite beschreibt. Beleg: identischer String auf allen vier Seiten, der Text lautet "We offer compassionate, thorough, and friendly care in a warm, comfortable environment. With convenient hours, same-day appointments, and telehealth, we're always here when you need us."

**Anti-Pattern 9, Zahlwiderspruch bei den Standorten.** `/regions` listet "New York City 21 Locations", die NYC-Seite titelt "22 Locations", die Sitemap enthält 21 `/c/*`-Einträge für NYC. Beleg: `regions.html` Kartentext gegen `regions_nyc.html` Title.

**Anti-Pattern 10, zwei Designsysteme mit zwei Paletten und zwei Radien.** Gatsby nutzt `#10365a` und 4 px Button-Radius, die Wix-Seiten nutzen `#116dff` (108 Vorkommen) und Wix-UI-TPA-Tokens. Auf derselben Domain wechseln Header und Footer-Optik beim Klick von der Startseite auf "Urgent Care".

**Anti-Pattern 11, Spinner-Statt-Inhalt im SSR.** Die Startseite liefert 6 leere `MuiCircularProgress`-Platzhalter mit `aria-label="loading details"` (home.html, Offsets 52249 bis 55029). Wer ohne JS oder mit Reader kommt, sieht sechs Ladebalken statt Inhalt.

**Anti-Pattern 12, CTA ohne Ziel.** Auf der Urgent-Care-Seite existiert ein zweiter "Book a Visit"-Button ohne `href`. Beleg: der achte Sektionsblock in `veterinary-clinic-services_urgent-care.html`.

### 5. Conversion-Mechanik in 5 Sätzen

Erstens: Die Startseite verkauft nicht die Leistung, sondern die sofortige Verfügbarkeit ("Open 7 days a week", "Walk-ins welcome."), und der Header trägt den roten "BOOK NOW"-Button dauerhaft in jeder Scrollposition. Zweitens: Jede Seite hat genau ein Ziel, alle primären CTAs auf allen 19 geprüften Seiten führen nach `/booking/city`, mit Ausnahme der bewusst abweichenden "Book a Telehealth Visit". Drittens: Der Einstieg in den Funnel verlangt nichts, Schritt 1 ist nur eine Städteauswahl, und die Eingabe persönlicher Daten beginnt erst nach Stadt, Standort, Termin und Pet-Daten. Viertens: Der Preis der Konversion wird offen benannt, statt versteckt: Kreditkarte als Pflicht ("In order to secure your appointment, we require a credit card."), Stornogebühren mit benannten Variablen, eine Pflicht-Checkbox zur Stornopolitik und eine Herkunftsumfrage direkt nach der Buchung. Fünftens: Abgesichert wird das Ganze nicht auf der Startseite, sondern auf der Standortseite, wo "489 Google Reviews" mit 4,6 Sternen, echter Rezensionstext mit Namen und zwei Arztportraits im Hero stehen, direkt unter dem "Book Now"-Button.

## Abrufprotokoll

Alle Abrufe mit `curl -sL -m 30 -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36"`.

| # | URL | HTTP | Bytes |
|---|---|---|---|
| 1 | https://bondvet.com/ | 200 | 793378 |
| 2 | https://bondvet.com/veterinary-clinic-services | 200 | 1431081 |
| 3 | https://bondvet.com/veterinary-clinic-services/urgent-care | 200 | 1986635 |
| 4 | https://bondvet.com/veterinary-clinic-services/preventive-care | 200 | 1977333 |
| 5 | https://bondvet.com/veterinary-clinic-services/puppy-visits | 200 | 1950304 |
| 6 | https://bondvet.com/surgery | 200 | 760156 |
| 7 | https://bondvet.com/membership | 200 | 757197 |
| 8 | https://bondvet.com/about-us | 200 | 3372241 |
| 9 | https://bondvet.com/experts | 200 | 784142 |
| 10 | https://bondvet.com/blog | 200 | 777454 |
| 11 | https://bondvet.com/blog/urgent-care-vs-emergency-care | 200 | 779801 |
| 12 | https://bondvet.com/faq | 200 | 753085 |
| 13 | https://bondvet.com/booking | 200 | 707760 |
| 14 | https://bondvet.com/booking/city | 200 | 707624 |
| 15 | https://bondvet.com/booking/new-york-city | 200 | 718745 |
| 16 | https://bondvet.com/booking/new-york-city/chelsea | 200 | 708055 |
| 17 | https://bondvet.com/regions | 200 | 742785 |
| 18 | https://bondvet.com/regions/new-york-city | 200 | 752641 |
| 19 | https://bondvet.com/c/chelsea-animal-hospital | 200 | 934833 |
| 20 | https://bondvet.com/c/cobble-hill-animal-hospital | 200 | 945273 |
| 21 | https://bondvet.com/same-day | 200 | 735621 |
| 22 | https://bondvet.com/payment-options | 200 | 868677 |
| 23 | https://bondvet.com/robots.txt | 200 | 151 |
| 24 | https://bondvet.com/sitemap-index.xml | 200 | 182 |
| 25 | https://bondvet.com/sitemap-0.xml | 200 | 94959 |
| 26 | https://bondvet.com/careers/sitemap-index.xml | 200 | 190 |
| 27 | https://bondvet.com/careers/sitemap-0.xml | 200 | 18256 |
| 28 | https://bondvet.com/sitemap.xml | 404 | 703338 (Gatsby-404-Seite, keine Sitemap) |
| 29 | https://bondvet.com/styles.2068ed279ac402019394.css | 200 | 668816 |
| 30 | https://bondvet.com/fonts/fonts-deferred.css | 200 | 4354 |
| 31 | https://bondvet.com/js/defer-fonts.js | 200 | 790 |
| 32 | https://bondvet.com/app-71b0c01152c9c0fd270b.js | 200 | 914193 |
| 33 | https://bondvet.com/framework-58e75b1c5657110779a2.js | 200 | 141457 |
| 34 | https://bondvet.com/webpack-runtime-36940a37e41da1cebbaf.js | 200 | 14213 |

Server-Header-Stichprobe: alle Antworten über Cloudflare (`server: cloudflare`, `cf-cache-status: DYNAMIC`); die vier Wix-Seiten zusätzlich mit `x-wix-request-id`, `via: 1.1 google` und `server-timing: cache;desc=hit, varnish;desc=hit_hit, dc;desc=fastly_g`.

Nicht abrufbar oder nicht vorhanden: `hreflang`-Angaben (0 auf allen 19 Seiten), `<video>`-Elemente (0), AVIF-Bilder (0), `fetchpriority` (0), `prefers-reduced-motion` in der Gatsby-CSS (0), Scroll-Reveal-Marker (0), GSAP/Lenis/AOS/Framer-Motion/Lottie/Rive/Three.js (0 Treffer in den drei JS-Bundles).
