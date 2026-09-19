# www.getsunday.com

## Steckbrief

| Feld | Wert |
|---|---|
| Domain | www.getsunday.com (Betreiber laut JSON-LD und Footer: Sunday, Inc. / This Land, Inc., Boulder, Colorado) |
| Branche | D2C-Abo fuer Rasen- und Gartenpflege: Rasenduenger, Unkrautvernichtung, Gras-Saatgut, Schaedlingsbekaempfung, Gartenpflanzen |
| Seitentyp | Abo-Funnel plus Vollsortiment-Shop plus Content-Hub. Drei Segmente in einer Domain. |
| Stack | React-Router v7 im SSR-Streaming-Modus (`window.__reactRouterContext.streamController`), React 19, Vite-Bundles, CSS Modules mit gehashten Klassennamen (`_heroHeading_1qnjw_110`), Sanity CMS als Bild-Host (cdn.sanity.io/images/afv8yn22), Cloudflare vor nginx/Envoy |
| Sprachen | Englisch, nur eine Sprache, kein hreflang, `lang="en"` |
| Anrede | durchgehend Du-Anrede im Englischen (You, Your yard), keine Sie-Form |
| Seiten in Sitemap | 2152 URLs gesamt ueber 5 Sub-Sitemaps: regional-pages 1347, shop 253, shed 470, help 65, general 17 |
| Fonts | Poppins (Display), Inter (Body), Lora (Shed-Ratgeber-Serif), Fraunces (Sunny-AI-Serif), Domine (Quiz-Serif), aesthet-nova via Adobe Typekit (Branding-Refresh-Variante) |
| Analytics | Google Ads (AW-815643512, AW-408734799, AW-380869256, AW-16958554397), UA-108527695-4, Facebook Pixel 574186016276220, Heap (37 `data-heap-id`-Attribute), VWO A/B-Tests (ID 779953), Klaviyo-Formulare, Veritone-Pixel |
| Consent-Tool | iubenda (Privacy-Policy-Link), kein Consent-Banner im ausgelieferten HTML sichtbar |
| Schema.org | `Corporation` auf Startseite, `Product` plus `AggregateOffer` auf /custom-lawn-plan, `Product` plus `AggregateRating` plus 10 `Review`-Objekte auf /reviews, `FAQPage` auf Local-Guide-Seiten. Auf Ratgeber-Artikeln, Shop-Kategorien, Produktseiten und Help-Center kein JSON-LD. |

## Sitemap

Hauptnavigation Desktop (6 Punkte plus CTA-Bereich), Header `nav.dnav-navGroup`:

| # | Linktext | href |
|---|---|---|
| 1 | Custom lawn plan | /custom-lawn-plan |
| 2 | Custom pest plan | /custom-pest-plan |
| 3 | Lawn care | /shop/category/lawn-care |
| 4 | Pest control | /shop/category/pest-control |
| 5 | Garden | /shop/category/garden |
| 6 | The Shed blog | /shed |

Header-Zusatz: Suchleiste mit Platzhalter `What can we help you find today?`, Rechtsgruppe `Sign in` mit Avatar-Icon, `Cart` mit Warenkorb-SVG. Kein Telefonnummer-Link im Header.

Footer (Desktop), 5 Linkgruppen plus App-Badges plus Shed-Block:

| Gruppe | Links |
|---|---|
| Customer service | /help-center (Need help?), /reviews/sunday-lawn-care-reviews (Customer reviews), /sunday-guarantee (Guarantee), /our-ingredients (Ingredients), /local-guide (Local guides) |
| My account | /login?redirect=%2F (Sign in) |
| Learn more | /about (About us), /our-mission (Our mission), /careers (Careers) |
| Social | facebook.com/getsunday, instagram.com/getsunday, youtube.com/@getsunday, tiktok.com/@getsunday |
| Get the app | apps.apple.com App-Store, play.google.com Google-Play |
| Shed-Block | /shed (Explore The Shed) mit Text `Your guide to growing, mowing, and caring for your yard in ways that are better for people, pets, and planet.` |
| Rechtliches | iubenda.com/privacy-policy/87446194/full-legal, /terms-and-conditions, /shed/sunday-way/msds, /privacy/settings (Do not sell my personal information) |

Sitemap-Struktur (aus `/sitemap.xml` und den 5 Sub-Sitemaps):

| Sub-Sitemap | Anzahl URLs | Inhalt |
|---|---|---|
| /sitemap/regional-pages.xml | 1347 | `/local-guide/lawn-care-in-<stadt>-<bundesstaat>` ueber 50 Bundesstaaten, Top-Bundesstaaten TX 122, FL 87, CA 61, IL 51, CO 51 |
| /sitemap/shop.xml | 253 | 229 Produktseiten plus 24 Kategorie-Seiten. Verteilung: lawn-care 106, garden 86, pest-control 36 |
| /sitemap/shed.xml | 470 | 421 Artikel plus 49 Tag-Filter-URLs in 7 Kategorien: Lawn, Weeds, Garden, Pest, Product Instructions, Backyard Living, Regional Yard Guides |
| /sitemap/help.xml | 65 | Help-Center plus 64 FAQ-Antwortseiten (Gladly-generiert, laut Kommentar in sitemap.xml) |
| /sitemap/general.xml | 17 | /, /about, /careers, /custom-lawn-plan, /custom-pest-plan, /llms.txt, /llms-full.txt, /our-ingredients, /our-mission, /pest/new, /privacy/settings, /reviews/sunday-lawn-care-reviews, /search, /seed-finder, /soil-test-registration, /sunday-guarantee, /terms-and-conditions |

Die Site liefert zusaetzlich `/llms.txt` und `/llms-full.txt` als maschinenlesbare Firmenbeschreibung aus.

## Seiten

### Startseite `/`

- `<title>`: `Sunday Lawn Care`
- Meta-Description: `Sunday takes the guesswork out of growing your dream backyard. With our custom lawn and pest plans, plus personalized plant recommendations, it's easier than ever to create an outdoor space your family will love.`
- H1: `Grow a yard you love`
- H2: 4, H3: 1
- Schema.org: `Corporation` mit `legalName` `Sunday, Inc.`, `email` `support@getsunday.com`, `telephone` `(415) 903-6932`, `knowsAbout` `Lawn Care, Garden Care, Pest Control`, `location` `Boulder, Colorado`
- canonical: `https://www.getsunday.com`
- hreflang: kein
- Wortzahl im `<main>`: 435

| Nr | Sektionstyp | Headline woertlich | Subline gekuerzt | Layout-Familie | Medien | CTA-Labels | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Nav | keine (nur Links) | Sucher `What can we help you find today?` | Full-bleed Sticky-Header, 2 Zeilen | Logo SVG, Icons | Sign in, Cart | keine | `header.dnav-header` mit `position:sticky;top:0`, Desktop und Mobile getrennt gerendert |
| 2 | Hero geteilt | `Grow a yard you love` | `Get started today for as low as $55 for a custom lawn plan` (13 Woerter) | 2-Spalten 50/50, links gruener Verlauf, rechts Video | Autoplay-Video `hero-desktop.mp4` beziehungsweise `hero-mobile.mp4` per `media`-Attribut | `Get my plan` | Preisanker `$55`, Feldlabel `Get started: zip code` | Linke Spalte `_leftPanel_1qnjw_39` mit `linear-gradient(to top right,var(--secondary-dark-color),var(--secondary-color))`. H1 hat `_copyLoading` = `visibility:hidden` als Platzhalter |
| 3 | Funnel-Einstieg (Zip) | `Where do you live?` | leer | Zentriert in der linken Hero-Haelfte | Google-Maps-Autocomplete-Eingabe | `Get my plan` | none | Formular ohne `action`, Absenden per Client-Handler, `data-testid="hero-address-submit-button"` |
| 4 | Promo-Banner | leer im SSR | leer | Full-bleed, `max-height:0` | none | none | none | `_promoBanner_dpnt8_1` mit `transition:max-height .7s ease-in`, per Client geoeffnet |
| 5 | Benefit-Intro plus Prozess-Steps | `Just grab a hose` | `Get the lush green lawn of your dreams, without all the toxic stuff.` | Zentriert, dann 3er-Grid (Desktop) beziehungsweise Mobile-Carousel (nuka-carousel) | 3 SVG-Illustrationen | `Get my plan` | Sternebewertung `4.3 rating`, `Based on over 10,000 reviews` | H3 `How it works` als Untertitel. Schritte: `Get yard analysis`, `Open your box`, `Spray it on` |
| 6 | Funnel-Wiederholung | `Let's get started` | leer | Zentriert | Zip-Formular | `Get my plan` | Rating-Block direkt unter dem Button | Zweites Zip-Formular auf derselben Seite |
| 7 | Yellow-Flag-Sektion | `Those yellow flags are red flags` | `Traditional lawn care and pest control are wasteful, brute force approaches...` | 2-Spalten mit eingeschobenem Warnschild-Bild, dann Listen-Karte | Foto `caution-pesticide.png`, Icon `crossed-out-circle.svg` | `See our ingredients` | Verneinungsliste vier Wirkstoffe | Hintergrund `#38996C1A`, Liste `glyphosate, imidacloprid, bifenthrin, trifluradin` |
| 8 | Reviews-Mosaik | `10,000+ reviewers are raving` | `Don't just take our word for it. Take the word of people like you...` | Bento-Raster mit 6 `grid-template-areas` `"mn mn lawn lawn" "mn mn purewow tn" "tree girl purewow tn" "tree girl ca ca" "tx tx ca ca" "tx tx gh gh"` | 5 Fotos, State-Outline-SVGs (Minnesota, California, Texas), Vorher-Nachher-Bild | `See more reviews` | 8 Kundenstimmen mit Vorname plus Bundesstaat, Pressezitate PureWow und Today's Homeowner | Desktop-Raster `max-width:100rem`, Zitate mit `_quoteText` 2.2rem/700 und SVG-Anfuehrungszeichen als `:before` |
| 9 | Footer | none | Shed-Beschreibung | 5 Linkgruppen plus Legal-Band | Social-Icons, App-Badges, Shed-Logo | `Explore The Shed` | keine | Hintergrund `var(--gray-2)` = `#4d524f`, Legal-Band `var(--dark-color)` |

Hero-Formel Startseite: H1-Nutzenversprechen `Grow a yard you love` (4 Woerter), Subline 13 Woerter, 1 CTA im Hero (`Get my plan`), Trust-Signal im Hero keines direkt, das Rating steht erst in Sektion 4. Medientyp Autoplay-Video, stumm, Loop, `playsInline`. Hero-Hoehe aus CSS: `@media screen and (min-width:48em){._leftPanel_1qnjw_39{min-height:57rem}}`, kein `min-h-screen`.

CTA-Strategie Startseite: Labels und Haeufigkeit: `Get my plan` 2, `See more reviews` 1, `See our ingredients` 1, `Sign in` 1, `Explore The Shed` 1, `Need help?` 1. Alle Funnel-CTAs fuehren in dasselbe Zip-Formular. Sticky-Header-CTA: der Container `dnav-lawnCtaFallback` ist im SSR leer und wird clientseitig mit einem gelben Button gefuellt (`_cta_oyy0u_1` aus app-nav, Label haengt vom Login-Status ab). Telefonnummer im Header: nein, nur im JSON-LD und im Help-Center.

Trust-Staffelung Startseite: Platz 1 Preisanker `$55` im Hero, Platz 2 Sternebewertung `4.3` mit Zahl `10,000 reviews` nach den Prozess-Steps, Platz 3 Verneinungsliste der Wirkstoffe in der Mitte, Platz 4 acht Kundenstimmen plus zwei Pressezitate im unteren Drittel.

### Leistungsseite `/custom-lawn-plan`

- `<title>`: `Custom Lawn Plan | Sunday Lawn Care`
- Meta-Description: `A custom lawn plan from Sunday is the easiest way to maintain a happy and healthy lawn. We'll send you the right nutrients for your lawn, with personalized instructions.`
- H1: `Grow a yard you love` (identisch mit Startseite)
- H2: 10, H3: 7
- Schema.org: `Product` mit `sku` `SMART_LAWN_PLAN`, `offers` als `AggregateOffer` `lowPrice` `129.00`, `highPrice` `189.00`
- canonical: `https://www.getsunday.com/custom-lawn-plan`
- Wortzahl im `<main>`: 893

| Nr | Sektionstyp | Headline woertlich | Subline gekuerzt | Layout-Familie | Medien | CTA-Labels | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Nav | wie Startseite | wie Startseite | Sticky-Header | wie Startseite | wie Startseite | keine | identisch |
| 2 | Hero geteilt | `Grow a yard you love` | `Get started today for as low as $55 for a custom lawn plan` | 2-Spalten 50/50 | Autoplay-Video | `Get my plan`, `Been here before? Skip to your results` | Preisanker `$55`, Label `Zip code` | Zweiter CTA `_magicLinkCta` als Link-Button fuer Wiederkehrer |
| 3 | Testimonial-Einzelzitat | keines | `I love how simple Sunday is to get great lawn results.` | Zentriert, `figure` mit `blockquote` | SVG-Anfuehrungszeichen, `mix-blend-mode:multiply` | none | Kunde `Matt, Pennsylvania` | Direkt unter dem Hero, vor dem Nutzenblock |
| 4 | Prozess-Steps | `Better ingredients. Better support. Better results.` | `How it works` als Vorzeile | 4er-Grid | 4 runde SVG-Icons | none | keine | `Free soil analysis`, `Custom lawn plans`, `Seasonal deliveries`, `Unlimited expert support` |
| 5 | Funnel-Wiederholung | `Let's get started` | leer | Zentriert | Zip-Formular | `Get my plan` | `4.3 rating`, `Based on over 10,000 reviews` | Rating folgt direkt unter dem Button |
| 6 | Nutzen-Claim plus Feature-Zigzag | `Tailored just for your lawn for real results.` | `We combine unique data with cutting-edge science...` | Zentriert, dann 3-spaltige Feature-Karten | 3 Produktfotos | none | keine | Drei Karten: `A unique plan created just for your lawn`, `Exactly what your lawn needs all year long`, `All you need is a hose for a beautiful lawn` |
| 7 | Feature-Liste mit Bild | `You can do this!` | keine | 2-Spalten, links Foto, rechts 3 Feature-Zeilen mit Icons | Foto `application-lifestyle.jpg`, 3 Icons | none | keine | Jede Zeile hat einen farbigen Inline-Highlight per `_featureHighlight` |
| 8 | Video-Sektion | `You bring the hose. We'll bring the rest.` | `Your first box includes everything you need, and nothing you don't.` | Zentriert, 16:9-Videobox | Video in `_howItWorksVideoWrapper` mit `padding-bottom:56%` | none | keine | Box hat `border:2px solid var(--off-white-color)` und `border-radius:var(--border-radius-lg)` |
| 9 | 3er-Nutzen | `Maximize enjoyment, minimize effort` | keine | 3er-Grid mit grossem Bild | Produktfoto | none | keine | Drei Aussagen: `Lusher, greener, self-sustaining lawns`, `Better ingredients for people, pets and planet`, `Everything you need delivered to your door` |
| 10 | Produktkarten-Reihe | `Everything you need to yard better` | keine | 4er-Grid | 4 Produktbilder | none | keine | `Lawn nutrients`, `Weed control`, `Grass seed`, `Pest control` |
| 11 | Wissenschafts-Block mit Autoritaet | `Rooted in science. Made for our planet.` | `Dr. Frank Rossi, one of the country's foremost experts in turf science...` | 2-Spalten, links Text plus 5 Punkte, rechts Feature-Liste | Foto | none | Namentliche Expertenreferenz `Dr. Frank Rossi`, Bezug auf `Yankee Stadium` | Fuenf Nachhaltigkeitspunkte als Liste |
| 12 | Inhaltsstoffe plus Garantie | `Grow a better lawn, guaranteed` | `We're committed to making sure Sunday works for you and your lawn, so our Yard Advisors are here to help with unlimited one-on-one support.` | 2-Spalten mit Bild plus Badge-Overlay | 4 Zutatenbilder, Foto, `sunday-guarantee-badge-green.svg` | `Read more reviews` | Garantiesiegel, vier benannte Zutaten | Zutaten woertlich: `Soy protein`, `Beet juice extract`, `Seaweed`, `Molasses` |
| 13 | Team-Sektion | `Made by real people, for real people` | `It all started with two brothers and one radical idea...` | 2-Spalten mit rundem Bild (Desktop), Float mit `shape-outside:circle()` (Mobile) | Teamfoto | none | Gruenderstory | `_madeByImage` mit `border-radius:50%` und `shape-outline` |

### Leistungsseite `/custom-pest-plan`

- `<title>`: `Preventive Pest Control | Sunday Lawn Care`
- Meta-Description: `DIY pest control made easy! Sunday pest protection is tailored for where you live and simple to use. Get a custom plan today!`
- H1: 5 Stueck im Dokument: `Killer pest control. Peace of mind.`, `My Plan custom checklist`, `Leave hazmat suits where they belong, in the past`, `OK, but does it work?`, `Ready to solve your pest problem?`
- H2: 4, H3: 8
- Schema.org: kein JSON-LD
- canonical: `https://www.getsunday.com/custom-pest-plan`
- Wortzahl im `<main>`: 327

| Nr | Sektionstyp | Headline woertlich | Subline gekuerzt | Layout-Familie | Medien | CTA-Labels | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Nav | wie Startseite | wie Startseite | Sticky-Header | wie Startseite | wie Startseite | keine | identisch |
| 2 | Hero dunkel | `Killer pest control. Peace of mind.` | `Sunday delivers custom pest control that works for your home. No scary chemicals or expensive pros.` | 2-Spalten, Text links auf Verlauf, Video rechts | Autoplay-Video `pest-plan-hero-video.mp4` mit `poster` | `Get my custom plan` | keine | Hintergrund `linear-gradient(280.06deg,#007290 38.28%,#003d4e 99.99%)`, H1 6.4rem/7.6rem ab 75em |
| 3 | Schaedlings-Carousel | `Protect your home from dozens of pests` | keine | Carousel/Slider mit Pfeil-Buttons | 8 Tier-Icons mit Label | keine | keine | Acht Arten woertlich: `Mosquito`, `House ant`, `Spider`, `Tick`, `House fly`, `Flea`, `Harvester ant`, `Cockroach` |
| 4 | Prozess-Steps | `How it works` | keine | 3er-Grid | 3 Bilder | `Get started` | keine | `Take the quiz`, `Open your box`, `Apply as needed` |
| 5 | Produkt-Feature mit App-Bezug | `My Plan custom checklist` | `With personalized tips, you'll never wonder what to do when.` | 2-Spalten | App-Screenshot | `Get a pest plan` | Label `Subscriber exclusive!` | Drei Nutzen: `Product application dates`, `Pest prevention tips`, `Expert pest guidance` |
| 6 | Verneinungs-Block | `Leave hazmat suits where they belong, in the past` | `Sunday is all the things you want in pest control, easy, effective, backed by science, and none of the things you don't.` | 2-Spalten | Foto | `See our ingredients` | keine | Gleiche Mechanik wie Yellow-Flag-Sektion der Startseite, hier als Textverneinung ohne Liste |
| 7 | Inhaltsstoff-Grid | `Feel-good ingredients. Real-good results.` | keine | 4er-Grid | 4 Zutatenbilder | keine | Vier benannte Wirkstoffe | `Pyrethrin`, `Lemongrass`, `Cedar`, `Spinosad` |
| 8 | Reviews-Block | `OK, but does it work?` | `Bugs hate us, but you're gonna love us.` | Mosaik mit 5 Zitaten | keine Bilder | keine | Fuenf Kundenstimmen mit Name und Ort | Orte: Bridgewater NJ, Ashburn VA, Denver CO, Salt Lake City UT, Mt. Juliet TN |
| 9 | Final-CTA | `Ready to solve your pest problem?` | keine | Zentriert | none | `Get started` | keine | Fuehrt zurueck in den Funnel |

### Shop-Kategorieseite `/shop/category/lawn-care`

- `<title>`: `Lawn Care`
- Meta-Description: `Get a greener and healthier lawn with safer ingredients and eco-friendly tools. Find fertilizers, weed control, grass seeds, and more.`
- H1: `Lawn care`
- H2: 1, H3: 8
- Schema.org: kein JSON-LD
- canonical: `https://www.getsunday.com/shop/category/lawn-care`
- Wortzahl im `<main>`: 2224
- Produkte in der ausgelieferten Seite: 47 Karten mit 42 `Add to cart`-Buttons, 40 Sale-Badges, 47 Mal `Free Shipping!`

| Nr | Sektionstyp | Headline woertlich | Subline gekuerzt | Layout-Familie | Medien | CTA-Labels | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Nav | wie Startseite | wie Startseite | Sticky-Header | wie Startseite | wie Startseite | keine | identisch |
| 2 | Inline-Funnel-Banner | `Wondering what your lawn really needs?` | `Let's create a custom plan for you.` | 1-zeilige Karte mit Bild links, Formular rechts | Icon `my-yard-plan.svg` | `Start your lawn analysis` | keine | Hintergrund `#2883561c`, `border-radius:var(--border-radius-lg)`. Zweites Zip-Formular |
| 3 | Seiten-Ueberschrift | `Lawn care` | keine | Linksbuendig, H1 | none | keine | keine | H1 direkt unter dem Funnel-Banner |
| 4 | Visuelle Sub-Navigation | `Top categories` | keine | 6er-Grid mit runden Bildern | 6 Bilder mit 2x-srcset | keine | keine | `Grass seed`, `Weed killer`, `Lawn fertilizer`, `Custom yard kits`, `Pet products`, `Irrigation tools` |
| 5 | Sortier-und-Filter-Leiste | `Sort and Filter` | keine | Sticky-Sidebar (Desktop), Accordion plus Modal (Mobile) | none | `Clear all filters`, `Show more` | keine | Sortieroptionen: `Recommended`, `Alphabetically, A-Z`, `Alphabetically, Z-A`, `Price, Low to High`, `Price, High to Low`. Zaehler `on sale 78` |
| 6 | Produkt-Grid | keine | keine | 2er, 3er oder 4er-Grid je Breakpoint | Produktbilder von cdn.sanity.io, 400x400 | 42 x `Add to cart` | `SAVE $20`-Badges, `Free Shipping!` mit Icon, Streichpreise | `grid-template-columns:repeat(2,1fr)` / `repeat(3,minmax(15rem,1fr))` / `repeat(4,minmax(18rem,1fr))`. Beispiel erste Karte: `Fall to Winter Ready Lawn Kit` `$62` statt `$82` |
| 7 | Marken-Differenzierungs-Widget | `The Sunday difference` | keine | 2x2 Widget-Raster | none | `Get my custom plan` | Drei Aussagen: `Grow a greener lawn`, `Get pesticide-free fertilizers`, `Made for people, pets & planet` | Eingeschoben zwischen Produktkarten, `_planWidget_1l6cx_1` |
| 8 | SEO-Textblock | `What to look for in lawn care products` | keine | Centered, 4 thematische Bloecke | none | keine | keine | Weitere Bloecke: `Types of lawn care products and how to choose`, `When to apply lawn care products throughout the year`, `Sunday's approach to lawn care products` |
| 9 | FAQ-Akkordeon | `Lawn care products frequently asked questions` | keine | Akkordeon | none | keine | keine | Fuenf Fragen, Antworten je rund 60 Woerter |
| 10 | Verwandte Kategorien | `Complete your lawn care routine` | `A great lawn usually needs more than one type of product working together.` | 4er-Textblock | none | keine | keine | Verlinkt `Lawn Fertilizer`, `Grass Seed`, `Weed Control`, `Lawn Pest Control` |
| 11 | Footer | wie Startseite | wie Startseite | wie Startseite | wie Startseite | wie Startseite | keine | identisch |

### Produktseite `/shop/garden/arabian-jasmine`

- `<title>`: `Arabian Jasmine Shrub`
- Meta-Description: keine, das `<meta name="description">` fehlt auf dieser Seite
- H1: `Arabian Jasmine`
- H2: 3, H3: 0
- Schema.org: kein JSON-LD, keine `itemprop`-Attribute
- canonical: `https://www.getsunday.com/shop/garden/arabian-jasmine`
- Wortzahl im `<main>`: 250

| Nr | Sektionstyp | Headline woertlich | Subline gekuerzt | Layout-Familie | Medien | CTA-Labels | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Nav | wie Startseite | wie Startseite | Sticky-Header | wie Startseite | wie Startseite | keine | identisch |
| 2 | Breadcrumb | keine | `Shop / Garden / Tree & shrub / Arabian Jasmine` | Zeile ueber dem Inhalt | none | keine | keine | `_breadcrumbs_e92k7_1`, Links `1.2rem` |
| 3 | Produktkopf plus Kaufbox | `Arabian Jasmine` | `Tropical vine with scented flowers` | 2-Spalten gespiegelt (`flex-direction:row-reverse`), Bildspalte `flex:0 1 50rem` beziehungsweise `62rem` | 3 Bilder im Hero-Carousel plus Thumbnails | `Add to cart` | 5 leere Sterne plus Link `Write a review` | Wissenschaftlicher Name als eigener Absatz `Jasminum sambac`, Preis `$44`, Einheit `Trade gallon pot`, Mengen-Inkrementor |
| 4 | Beschreibung plus Plant-Info | `Intensely fragrant shrub that's perfect for containers` | keine | 2-spaltige Info-Liste mit Icons | 5 Icons | keine | keine | Sechs Felder: `Sunlight exposure` `Full sun to part shade`, `Growing Rate` `Rapid`, `Mature height` `4-5 ft`, `Mature width` `4-5 ft`, `Bloom season` `Summer, fall`, `Bloom color` `White` |
| 5 | Anleitungs-Teaser | `Everything you need to plant your shrub` | `We want you and your shrub to succeed, so we've laid out all the steps you need to start strong.` | Zentriert | none | `Get started` | keine | Fuehrt zu einer Pflegeanleitung |
| 6 | Empfehlungen | `Related products` | keine | Karten-Reihe | Produktbilder | `Add to cart` | keine | Beispiel `WonderFert Tree & Shrub Garden Fertilizer` `$19.00` |
| 7 | Kundenbewertungen | `Customer reviews` | keine | Widget-Einbindung | none | `Write a review` | Yotpo-Widget | `data-testid="yotpo-widget-instance-SST0089"`, Widget im SSR leer |
| 8 | Sticky Mobile-CTA | none | none | Sticky-Leiste unten, `position:sticky;bottom:0` | none | `Add to cart` | keine | `_newMobileFloatingCta` mit Klassen `_hidden` im SSR, wird clientseitig bei Scroll eingeblendet |
| 9 | Footer | wie Startseite | wie Startseite | wie Startseite | wie Startseite | wie Startseite | keine | identisch |

### Ratgeber-Uebersicht `/shed`

- `<title>`: `The Shed | Sunday Yard Care Blog`
- H1: `Fall Lawn Care in 4 Simple Steps`. Das ist der Titel des Feature-Artikels, die Seite selbst hat keine eigene Hauptzeile.
- H2: 5, H3: 28
- Schema.org: kein JSON-LD
- canonical: `https://www.getsunday.com/shed`
- Wortzahl im `<main>`: 930
- Artikelverlinkungen im Dokument: 93

| Nr | Sektionstyp | Headline woertlich | Subline gekuerzt | Layout-Familie | Medien | CTA-Labels | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Nav | wie Startseite | wie Startseite | Sticky-Header | wie Startseite | wie Startseite | keine | identisch |
| 2 | Feature-Hero | `How to: Fall Lawn Care from the experts` | keine | Full-bleed Bild mit weisser Titelbox, die ueber das Bild ragt | Hero-Bild | none | Kategorie, Autor, Datum | Bildhoehe `64rem` ab 62em, Titel `7.2rem/8rem`. Titelbox `padding:5.6rem 6.4rem` mit gruenem Unterstrich `height:1.6rem;width:69.6rem` |
| 3 | Inline-Funnel-Banner | `Wondering what your lawn really needs?` | `Let's create a custom plan for you.` | Inline-Karte | Icon | `Start your lawn analysis` | keine | Drittes Vorkommen desselben Banners im Seitenkopf |
| 4 | Quintett-Artikelreihe | `How to: Fall Lawn Care from the experts` | keine | 5 Karten untereinander, erste gross | 5 Bilder | none | Autor plus Datum je Karte | `_articleQuintet_1msny_16` |
| 5 | Kategorie-Navigation | `Explore by category` | keine | Zweispaltig, Desktop-Nav mit Hintergrundbildern, mobile Liste | 7 Hintergrundbilder | none | keine | Sieben Kategorien: `Lawn`, `Weeds`, `Garden`, `Pest`, `Product Instructions`, `Backyard Living`, `Regional Yard Guides` |
| 6 | Garantie-Band | `Grow a better lawn, guaranteed` | `We're committed to making sure Sunday works for you and your lawn!` | 2-Spalten, links Bild mit Badge-Overlay | Foto plus `sunday-guarantee-badge-green.svg` | `Start today!` | Garantiesiegel | Wiederkehrende Garantiesektion, auch auf anderen Seiten |
| 7 | Trio-Reihe | `Our favorite lawn care guides to get you started` | keine | 3er-Grid mit Trennstrich-Header | 3 Bilder | none | keine | Header `_headerWrapper_6hy7k_1` mit `_tagLineDash` als grafische Linie |
| 8 | Quartett-Reihe | `All about Fall` | keine | 4er-Grid, `repeat(4,calc(25% - 2.5rem))` ab 62em, `gap:4.8rem` ab 75em | 4 Bilder | none | keine | Bildhoehen gestaffelt `11.6rem` bis `24rem` |
| 9 | Neueste Artikel | `Recent Articles` | keine | 3er-Grid | Bilder | none | keine | 9 Karten |
| 10 | Footer | wie Startseite | wie Startseite | wie Startseite | wie Startseite | wie Startseite | keine | identisch |

### Ratgeber-Kategorieseite `/shed/categories/weeds`

- `<title>`: `Weed Control | Sunday Lawn Care`
- Meta-Description: `Become an expert in weed ID and removal; not all weeds are bad! Get to know Sunday's cutting-edge herbicides that get fast results without harsh chemicals.`
- H1: `Weeds`
- H2: 1, H3: 18
- canonical: `https://www.getsunday.com/shed/categories/weeds`
- Wortzahl im `<main>`: 605
- Artikelverlinkungen: 56

| Nr | Sektionstyp | Headline woertlich | Subline gekuerzt | Layout-Familie | Medien | CTA-Labels | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Nav | wie Startseite | wie Startseite | Sticky-Header | wie Startseite | wie Startseite | keine | identisch |
| 2 | Kategorie-Kopf | `Weeds` | `Become an expert in weed ID and removal. Get tips for seeding a weedy lawn, learn why not all weeds are bad...` | Linksbuendig, links 8px gruener Balken | none | keine | keine | `_categoryPage_16rsm_1` mit Pseudoelement `:after` `height:8.8rem;width:1.6rem` |
| 3 | Beliebt-Liste | `Popular in Weeds` | keine | 4er-Grid plus eine breite Karte | 5 Bilder | none | Autor plus Datum | Titel unter anderem `Lawn Weed ID Guide`, `Not All Weeds Are Bad` |
| 4 | Sortier-und-Filter | `All`, `Articles`, `Sort Order` | keine | Accordion | none | `Sort by`, `Featured` | keine | Optionen: `Alphabetically, A-Z`, `Alphabetically, Z-A`, `Publication date, new to old`, `Publication date, old to new` |
| 5 | Artikel-Grid | `Weeds` | keine | 3er-Grid, `grid-gap:6.4rem` ab 62em | Bilder | none | Autor plus Datum | 15 Karten |
| 6 | Footer | wie Startseite | wie Startseite | wie Startseite | wie Startseite | wie Startseite | keine | identisch |

### Ratgeber-Artikel `/shed/lawn/soil-food-web`

- `<title>`: `The Soil Food Web: Importance of Healthy Soil`
- Meta-Description: `Explore the soil food web under your grass and understand why healthy soil is crucial for the food chain. Then, learn how grass fits into the soil food chain with Sunday.`
- H1: `The Soil Food Web: Importance of Healthy Soil`
- H2: 9, H3: 4
- Schema.org: kein JSON-LD, kein `Article`, kein `FAQPage`
- canonical: `https://www.getsunday.com/shed/lawn/soil-food-web`
- Wortzahl Artikelkoerper: 851

Aufbau in DOM-Reihenfolge:

| Nr | Elementtyp | Inhalt woertlich | Layout | Hinweise |
|---|---|---|---|---|
| 1 | Hero-Bild | keine Headline | Full-bleed, Hoehe `20rem` mobil, `64rem` ab 62em | `_heroImgWrapper_voenw_13` |
| 2 | Titelbox | `The Soil Food Web: Importance of Healthy Soil` | Absolute Positionierung ueber dem Bild, Breite `86.8rem`, `padding:5.6rem 6.4rem` | Kategorie-Pfad `Lawn / Soil` als zwei Links, `_category_voenw_95` in Lora italic gruen |
| 3 | Sticky-Sidebar | `In This Article` | Sticky-Sidebar, `grid-template-columns:minmax(min-content,20.6rem) minmax(min-content,68rem) 27.6rem` ab 75em | Enthaelt Tag-Chips (`Lawn`, `Soil`), Autorblock mit Foto und `Updated on January 22, 2025`, vier Share-Buttons (Facebook, Twitter, Pinterest, Link), Inhaltsverzeichnis |
| 4 | Inhaltsverzeichnis | `In This Article` | Liste mit H3-Einrueckung `margin-left:2rem`, mobil als `<select>` | Im ausgelieferten HTML ist die `<ul>` leer, wird clientseitig gefuellt |
| 5 | Desc-Text | `The soil food web is the living, breathing system that promotes plant growth, soil health and ultimately, a beautiful lawn.` | Zentriert ueber dem Body | Ein Satz, visuell abgesetzt |
| 6 | Artikelkoerper | 9 H2 und 4 H3 | Fliesstext `_blockContent_awpsr_1` mit `p{line-height:1.7}` | Nachweise: 16 interne Links auf andere Shed-Artikel, 4 externe Quellen-Links. Bilder im Artikelkoerper: 1. Keine Tabellen, 1 geordnete Liste |
| 7 | Quellen | `Cited sources` | Absatzliste | Vier Eintraege: University of Minnesota Extension, USDA NRCS, UC Santa Cruz, Ohio State University, jeweils mit `target="_blank" rel="noopener noreferrer"` |
| 8 | Body-Footer | keine Headline | Grid mit `grid-template-areas:"tags social" "author author"` ab 48em | Tag-Chips, Share-Leiste, Autorblock mit Foto und Bio. Kein Zwischen-CTA, kein Newsletter, keine verwandten Artikel im ausgelieferten HTML (Container `_moreLikeThisWrapper` ist leer) |
| 9 | Footer | wie Startseite | wie Startseite | identisch |

Autor-Box: Foto `cdn.sanity.io/.../c8dad811...jpg` als 80x80-Avatar, Name `Polina Chizhov`, Datum `Updated on January 22, 2025`, Bio `Polina earned her B.S. in Environmental Science with a focus in Watershed Science from SUNY College of Environmental Science and Forestry...` (zirka 45 Woerter). Lesezeit wird nicht angezeigt. Key-Takeaways-Box fehlt.

### Ratgeber-Artikel Fehlversuch `/shed/lawn-care/how-to-get-rid-of-crabgrass`

HTTP 404, 36148 Bytes. Dokumentiert, weil der Pfad aus der Sitemap-Struktur plausibel wirkt, aber nicht existiert. Gueltige Artikel liegen unter `/shed/<kategorie>/<slug>` mit Kategorien wie `lawn`, `garden`, `backyard-living`, `sunday-way`.

### Local-Guide-Seite `/local-guide/lawn-care-in-austin-tx`

- `<title>`: `Lawn Care in Austin, TX | From $55, 10,500+ Reviews | Sunday Lawn Care`
- Meta-Description: `Austin, TX heat stress and drought can wreck even tough bermuda. Get a custom pesticide-free plan built for your yard, safe for kids and pets. Plans from $55.`
- H1: keines im Dokument. Die optische Hauptzeile `Lawn Care in Austin, TX for Yards That Love the Heat` ist ein H2.
- H2: 7, H3: 5
- Schema.org: `FAQPage` mit sechs Fragen
- canonical: `https://www.getsunday.com/local-guide/lawn-care-in-austin-tx`
- Wortzahl im `<main>`: 1449

| Nr | Sektionstyp | Headline woertlich | Subline gekuerzt | Layout-Familie | Medien | CTA-Labels | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Nav | wie Startseite | wie Startseite | Sticky-Header | wie Startseite | wie Startseite | keine | identisch |
| 2 | Ort-Hero | `Lawn Care in Austin, TX for Yards That Love the Heat` | `Austin lawn care starts with understanding your soil and giving warm-season grass what it actually needs.` | Zentrierte Karte auf gruenem Grund | none | keine | keine | `_heroSection_prdhk_1` mit `background-color:var(--secondary-dark-color)`, innere Karte `background-color:var(--light-color)`, `max-width:80rem` |
| 3 | Marketing-Sektion mit Zip-Formular | keine Headline | `Austin summers don't mess around. Between the relentless heat and stretches without rain...` | 2-Spalten mit Bild plus Formular links, Text rechts | Bild `find-new-hero-desktop.png` | `Get my plan` | Label `Get started: zip code` | Lokale Statistik im Text: `Sunday builds custom lawn plans using 2,000+ soil samples from Austin yards.` |
| 4 | Nutzen-Liste | `What Sunday delivers for Austin lawns` | keine | Textblock mit 4 Punkten | none | keine | keine | Punkte: `Nutrient plans adjusted for alkaline clay soil`, `Seasonal timing matched to local growing windows`, `Pesticide-free products safe for bare feet and pets`, `Shipments timed to Austin's warm-season rhythm` |
| 5 | Prozess-Steps | `How it works` | keine | 3er-Grid | 3 Icons | `Get your free lawn analysis` | keine | Identische drei Schritte wie Startseite, hier mit Textlink-CTA statt Button |
| 6 | Daten-Tabelle | `Lawn care for Austin, Texas` | keine | 2-Spalten-Tabelle mit 6 Zeilen | none | keine | Messdaten mit Stichprobengroesse | Zeilen: `Average lawn size` `3,000 sq ft (based on 2,100 local soil tests)`, `Dominant grass type` `Warm-season grasses`, `Typical soil pH` `7.8 (slightly alkaline)`, `Organic matter` `4.8%`, `Soil composition` `24% sand, 31% silt, 46% clay (clay soil)`, `Key nutrients` `Potassium 275 ppm, phosphorus 54 ppm, calcium 7,839 ppm` |
| 7 | Lokaler Fliesstext | `That clay soil isn't the villain you think it is` | keine | Fliesstext mit H3 | none | `Get your free lawn analysis` als Inline-Link | keine | Endet mit dem Link auf die Rasen-Ratgeber |
| 8 | Reviews-Marquee | `Sunday lawn care reviews near Austin, TX` | `Explore over 6,000 five star reviews of Sunday lawn care` | Horizontal laufendes Band, Karten `width:30rem` | Review-Fotos von cdn-yotpo-images-production.yotpo.com | keine | Ort je Karte plus Sterne | Animation `_scroll_prdhk_1 70s linear infinite`, ab 62em `animation-duration:50s`. Die Kartenliste liegt doppelt im DOM, damit die Schleife nahtlos ist |
| 9 | Funnel-Wiederholung | `Let's get started` | leer | Zentriert in gruener Box | Zip-Formular | `Get my plan` | keine | identisch zur Startseite |
| 10 | Orts-FAQ-Akkordeon | `Austin, Texas FAQs` | keine | Akkordeon | none | keine | keine | Sechs Fragen, unter anderem `How much does lawn care cost in Austin, TX?` mit Preisvergleich `$55` gegen `up to $1,500 annually` |
| 11 | Anbau-Anleitung | `How to grow grass in Austin, Texas` | keine | 3er-Datenblock plus Fliesstext | none | keine | Drei Messdaten | `Recommended grass species` `Bermudagrass, zoysiagrass, St. Augustinegrass, buffalograss`, `Best establishment method` `Seeding, sodding, or plugging`, `Spring seeding window` `April 2 to May 14` |
| 12 | Ratgeber-Teaser | `Austin, TX lawn care blogs` | keine | 4er-Grid | Bilder | keine | keine | Vier Artikelkarten, unter anderem `Warm-Season Lawn Care Guide` |
| 13 | Nachbarschafts-Funnel | `Join your Sunday neighborhood` | `Check out how many of your neighbors are already making an impact!` | 2-Spalten mit Karte | Kartenansicht | `Look up` | Nachbarschaftsvergleich | Zip-Eingabe mit Karten-Visualisierung |
| 14 | Footer | wie Startseite | wie Startseite | wie Startseite | wie Startseite | wie Startseite | keine | identisch |

### Bewertungsseite `/reviews/sunday-lawn-care-reviews`

- `<title>`: `Sunday Lawn Care Reviews | Sunday Lawn Care`
- Meta-Description: `Read verified Sunday Lawn Care reviews and see how real customers are transforming their lawns with easy, custom lawn care.`
- H1: `Sunday Lawn Care Reviews`
- H2: 2, H3: 10
- Schema.org: `Product` mit `@id` `https://www.getsunday.com/custom-lawn-plan#product`, `sku` `SMART_LAWN_PLAN`, `aggregateRating` `ratingValue` 4.3, `reviewCount` 10658, plus 10 einzelne `Review`-Objekte mit Autor, Datum und `reviewBody`
- canonical: `https://www.getsunday.com/reviews/sunday-lawn-care-reviews`
- Wortzahl im `<main>`: 869

| Nr | Sektionstyp | Headline woertlich | Subline gekuerzt | Layout-Familie | Medien | CTA-Labels | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Nav | wie Startseite | wie Startseite | Sticky-Header | wie Startseite | wie Startseite | keine | identisch |
| 2 | Seitenkopf | `Sunday Lawn Care Reviews` | `Our customers love their Sunday lawns.` | Zentriert | none | keine | keine | H1 in `_staticPageHeading_13fvh_1`, 4.8rem ab 92.5em |
| 3 | Funnel-Band | `Let's get started` | leer | Zentriert auf Teal-Verlauf | Zip-Formular | `Get my plan` | `4.3` und `10,658` unmittelbar darunter | Verlauf `linear-gradient(237.99deg,var(--accent-teal-03) 25.67%,#38996c 100%)` |
| 4 | Bewertungs-Zusammenfassung | keine Headline | `Based on 10,658 reviews` | Zentriert, dann links Histogramm, rechts Aktionen | none | `Write a review`, `See reviews summary` | Score `4.3`, Histogramm 5 Sterne `6,781`, 4 `1,961`, 3 `881`, 2 `441`, 1 `594` | Histogramm als klickbare Filterzeilen, Track `height:.8rem` pill, Fuellung `var(--accent-yellow-00)`, aktive Zeile gruen `var(--accent-green-03)` |
| 5 | Filterleiste | keine Headline | `Reviews with media`, `Search reviews`, `Rating`, `Filter & sort` | Sticky-Leiste, mobil als Modal | none | `All ratings`, `With media` | keine | 29 Themen-Chips woertlich: `color`, `shipping`, `packaging`, `problem`, `feel`, `looks`, `results`, `price`, `improvement`, `instructions`, `support`, `use`, `summer`, `convenience`, `water`, `lawn`, `quality`, `value`, `box`, `grass`, `effort`, `weather`, `shape`, `plan`, `maintenance`, `compliments`, `spring`, `service`, `heat` |
| 6 | Review-Liste | keine Headline | keine | Einspaltige Liste, Karte mit `grid-template-columns:1fr auto`, ab 48em `display:flex` | Review-Fotos im Media-Carousel | `Read more`, Daumen-hoch und -runter mit Zaehler | Verifizierte Kunden, Datum, Sterne | 10 Karten im SSR. Reaktionszaehler woertlich: neun Mal Daumen-runter mit `0`, dazu Daumen-hoch-Zaehler `6 x 0`, `2 x 1` und `2 x 2` |
| 7 | Funnel-Band | `Let's get started` | leer | identisch zu Nr. 3 | Zip-Formular | `Get my plan` | keine | Wiederholung am Seitenende |
| 8 | Footer | wie Startseite | wie Startseite | wie Startseite | wie Startseite | wie Startseite | keine | identisch |

### Help-Center `/help-center`

- `<title>`: `Help Center | Sunday Lawn Care`
- Meta-Description: `Get answers to common questions about Sunday lawn care plans, orders, shipping, and subscriptions, or contact our team of lawn experts for personalized support.`
- H1: `Sunday Help Center`
- H2: 7, H3: 1
- Schema.org: kein JSON-LD
- canonical: `https://www.getsunday.com/help-center`
- Wortzahl im `<main>`: 616

| Nr | Sektionstyp | Headline woertlich | Subline gekuerzt | Layout-Familie | Medien | CTA-Labels | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Nav | wie Startseite | wie Startseite | Sticky-Header | wie Startseite | wie Startseite | keine | identisch |
| 2 | Sticky-Sidebar | `Need help?` | keine | Sticky-Sidebar `width:19.8rem`, Position `top:13rem` | none | keine | keine | Auf Mobil ein `<select>` mit einer Option |
| 3 | Seitenkopf plus Kontakt | `Sunday Help Center` | keine | Zentriert | none | keine | E-Mail `support@getsunday.com` per Cloudflare-Verschleierung geschuetzt, Telefon `(415) 903-6932` | Beide Kontaktwege direkt unter dem Titel |
| 4 | Suche | keine Headline | Platzhalter `Search...` | Zentriertes Suchfeld | none | keine | keine | `aria-label="Search the help center"` |
| 5 | Inline-Funnel-Banner | `Wondering what your lawn really needs?` | `Let's create a custom plan for you.` | Inline-Karte | Icon | `Start your lawn analysis` | keine | identisch zu Shop und Shed |
| 6 | Themen-Bloecke | `Most Frequently Viewed` | keine | 7 Listenbloecke mit je 6 bis 30 Links, jeweils `See more` | none | 5 x `See more` | keine | Bloecke: `Most Frequently Viewed`, `Products & Services`, `Best Practices`, `Issues with my Order` und drei weitere |
| 7 | Footer | wie Startseite | wie Startseite | wie Startseite | wie Startseite | wie Startseite | keine | identisch |

### Seiten mit Fehlversuch

| Pfad | Status | Beobachtung |
|---|---|---|
| /about | HTTP 200, 24176 Bytes, aber Inhalt ist eine leere App-Shell | Die Seite liefert `content-type: text/plain; charset=utf-8` und `content-length: 0` im Kopf, der Body enthaelt nur `<div class="app-shell"></div>`, einen React-Router-Stream und `router/legacy-layout`. Kein H1, kein Text. Mit Googlebot-UA, mit `Accept`-Header und mit anderen User-Agents dreimal reproduziert, identischer Byte-Stand. Titel trotzdem `Sunday Lawn Care`, og:title `About Sunday Custom Yard Care`. |
| /sunday-guarantee | HTTP 200, 23264 Bytes, inhaltsgleiche App-Shell wie /about | Byte-identisch (MD5 `e3c032b32d62dc0370c084cf2ec833f5`) mit /about, /our-ingredients und /lawn-size. Nur die og-Tags unterscheiden sich. |
| /our-ingredients | HTTP 200, 23264 Bytes, inhaltsgleiche App-Shell | dito |
| /lawn-size | HTTP 200, 23264 Bytes, inhaltsgleiche App-Shell | Funnel-Schritt ist ohne JavaScript nicht sichtbar |
| /shed/lawn-care/how-to-get-rid-of-crabgrass | HTTP 404, 36148 Bytes | Falsche Kategorie-Segmentierung, siehe oben |

### Sitemap-Seiten ohne Abruf

Aus der Sitemap bekannt, aber nicht gefetcht, weil das Seitenbudget auf 10 Inhaltsseiten begrenzt ist: `/our-mission`, `/careers`, `/seed-finder`, `/soil-test-registration`, `/shed/sunday-way/msds`, `/terms-and-conditions`, `/privacy/settings`, `/search`, `/pest/new`, die 229 Produktseiten und die 1347 Local-Guide-Seiten. Deren Existenz ist ueber Sitemap, Footer-Links und Navigation belegt, ihr Aufbau nicht.

## Design-System

Alle Werte aus `/assets/index-BzbZtsQD.css` (22463 Bytes) und den 64 Modul-Stylesheets.

### Fonts

Sechs Familien, geladen ueber vier Google-Fonts-Requests und einen Adobe-Typekit-Request. Kein einziges `@font-face` im eigenen CSS, alle Schriften kommen von fremden Hosts.

| Variable | Stack | Rolle | Gewichte (aus dem jeweiligen CSS) |
|---|---|---|---|
| `--primary-font` | `"Poppins", "Futura", -apple-system, BlinkMacSystemFont, "Roboto", sans-serif` | Display, alle Headlines und Buttons | 400, 400 italic, 600, 700, 800 |
| `--body-font` | `"Inter", sans-serif` | Body, Navigation, Formulare, Preise | 400, 500, 700, 800 |
| `--shed-font` | `"Lora", sans-serif` | Ratgeber-Autor-Bio und Kategoriezeilen, kursiv | 400, 500, 600, 700, 400 italic |
| `--sunny-font` | `"Fraunces", serif` | Sunny-AI-Chat | Variable 100 bis 900, aufrecht und kursiv |
| `--questionnaire-font` | `"Domine", serif` | Quiz | 700 |
| Branding-Refresh | `"aesthet-nova", serif` via `use.typekit.net/qcf8ymb.css` | Alternative Display-Schrift hinter `:root.branding-refresh` | 400, 500, 700 |

Verwendung gezaehlt ueber alle Stylesheets: 80 x `var(--body-font)`, 44 x `var(--primary-font)`, 24 x `var(--shed-font)`, 3 x `font-family:"aesthet-nova"`.

### Farben

Top-Werte aus den 10 haeufigsten Hex-Codes ueber alle Stylesheets, plus die Herkunft aus den Custom Properties:

| Wert | Haeufigkeit | Rolle |
|---|---|---|
| `#007290` (`--gray-blue-light`, `--sand-color`) | 11 | Blau fuer Bewertungsseite und Pest-Control-Hero |
| `#f1f4f3` (`--off-white-color`) | 9 | Flaechiger Hintergrund, Sektionswechsel |
| `#003d4e` (`--gray-blue`) | 7 | Dunkelblau, Text auf gelben Buttons |
| `#00000040` | 7 | Standard-Schatten `0 4px 16px` |
| `#e02d3c` (`--alert-color`) | 6 | Sale-Badges, Rabattpreise |
| `#6e7370` (`--gray-3`) | 4 | Sekundaertext |
| `#38996c` | 4 | Funnel-Verlauf-Endpunkt |
| `#d9dbda` (`--gray-6`) | 3 | Rahmen, Footer-Titel |
| `#dc5f4a` (`--silt-color`) | 2 | Bodenart-Codierung, Fehler |
| `#ffd900` (`--interactive-yellow-color`) | 2 | Button-Gelb im Branding-Refresh |

Rollen aus den Custom Properties:

| Rolle | Wert | Beleg |
|---|---|---|
| Akzent auf Buttons | `--secondary-dark-color: #288356` (gruen) | `.button{background:var(--secondary-dark-color)}` |
| Zweiter Button-Akzent | `--primary-dark-color: #ffc059` beziehungsweise `--interactive-yellow-color: #ffd900` | `._yellow_1yerl_122{background:var(--primary-dark-color)}` |
| Primaer-Akzent | `--primary-color: #f9ce19` | `.underline:after{background:var(--primary-color)}`, Sterne auf der Bewertungsseite |
| Hintergrund dunkel | `--dark-color: #191a19` | `.footer__legal{background:var(--dark-color)}` |
| Hintergrund Footer | `--gray-2: #4d524f` | `.footer{background:var(--gray-2)}` |
| Hintergrund hell | `--light-color: #ffffff` | 182 Verwendungen, haeufigste Variable im Projekt |
| Text | `--dark-color: #191a19`, `--black: #001c0e` | `body{color:var(--dark-color)}` |
| Sekundaertext | `--gray-3: #6e7370` | 45 Verwendungen |
| Fehler | `--error-color: var(--tertiary-dark-color)` = `#fc3a30` | `._inputError_1d5ad_98{border-color:var(--error-color)}` |
| Rasen-Pflege-Akzent | `--primary-green-color: #2d4b33` | `._leftPanel_1qnjw_39._brandingRefresh{background:var(--primary-green-color)}` |
| Schaedlings-Akzent | `--gray-blue-light: #007290` | Pest-Plan-Hero |

Insgesamt 129 Custom Properties auf `:root`, davon 17 `--z-index-*`-Stufen von `-1` bis `2147483647`.

### Radius

Basis `--border-radius: 8px`. Alle Ableitungen per `calc()`:

| Token | Wert | Haeufigkeit |
|---|---|---|
| `var(--border-radius)` | 8px | 41 |
| `50%` | Kreis | 32 |
| `var(--border-radius-sm)` | 4px | 30 |
| `var(--border-radius-pill)` | 9999px | 10 |
| `var(--border-radius-lg)` | 16px | 8 |
| `var(--border-radius-xl)` | 20px | 3 |

Buttons sind auf Mobil `4px` und ab 48em `8px` gerundet, also nicht pill. Pill-Radius nur fuer Sonderformen: `_pill_1yerl_54`, Bewertungs-Histogramm-Track, `Write a review`-Button, Quick-Select-Chips (`border-radius:20rem`).

### Shadows

| Token | Wert | Haeufigkeit |
|---|---|---|
| `var(--box-shadow)` | `0 4px 8px rgba(0, 0, 0, .16)` | 6 |
| `0 4px 16px #00000040` | direkt notiert | 5 |
| `var(--box-shadow-lg)` | `8px 16px 24px -2px rgba(50, 55, 90, .2), 6px 12px 16px -4px rgba(100, 100, 100, .26)` | 3 |
| `var(--box-shadow-sm)` | `0 2px 2px rgba(0, 0, 0, .16)` | 3 |
| `var(--box-shadow-sm-hover)` | `0 2px 2px rgba(0, 0, 0, .08), 0 2px 4px rgba(0, 0, 0, .16)` | 3, nur im Hover |
| Sticky-Header | `0 0 5px #0000001a` | 2 |
| Mobile Sticky-CTA | `0 -4px 4px #00000040` | 1 |

### Spacing und Container

| Token | Wert |
|---|---|
| `--max-content-width` | `128rem` = 1280px, `.container{max-width:var(--max-content-width);margin:0 auto}` |
| `--gutter-width` | `2.4rem` = 24px |
| `--gutter-width-sm` | `1.4rem` |
| `--inverse-gutter` | `calc(var(--gutter-width) * -1)` = -24px, fuer Full-bleed-Brueche |
| `--body-padding-bottom` | `6rem` |
| `--progress-bar-width` | `65rem` |
| Section-Padding | `_fullWidthSectionInner_13fvh_23{padding:4rem var(--gutter-width)}`, ab 48em `padding:6.4rem var(--gutter-width)` |
| `html{font-size:62.5%}` | 1rem = 10px, alle rem-Werte sind also direkte Pixelwerte |

Breakpoints, gezaehlt ueber alle Stylesheets:

| Breakpoint | Vorkommen |
|---|---|
| `48em` (768px) | 403 |
| `62em` (992px) | 333 |
| `75em` (1200px) | 123 |
| `34.375em` (550px) | 74 |
| `80em` (1280px) | 12 |
| `23.375em` | 5 |
| `92.5em` | 3 |

### Typo-Skala

Aus `Typography-C9B7s8MF.css`, den verbindlichen Utility-Klassen:

| Klasse | Familie | Gewicht | Groesse | Zeilenhoehe |
|---|---|---|---|---|
| `_h1-display` | Poppins | 800 | 4.8rem, ab 48em 6.4rem | 6rem, ab 48em 7.6rem |
| `_h1-large` | Poppins | 700 | 4rem, ab 48em 4.8rem | 5rem, ab 48em 6rem |
| `_h1-small` | Poppins | 700 | 3.2rem, ab 48em 4rem | 3.9rem, ab 48em 4.8rem |
| `_h2` | Poppins | 700 | 2.6rem, ab 48em 3.2rem | 3.2rem, ab 48em 4rem |
| `_h3` | Poppins | 700 | 2.2rem, ab 48em 2.4rem | 3rem, ab 48em 3.2rem |
| `_h4` | Poppins | 500 | 2rem | 2.6rem |
| `_h5` | Inter | 800 | 1.6rem | 2.4rem |
| `_subtitle-1` | Inter | 700 | 2.4rem | 3rem |
| `_body-1` | Inter | 400 | 2rem | 2.8rem |
| `_body-2` | Inter | 400 | 1.6rem | 2.4rem |
| `_caption`, `_info-text` | Inter | 400 | 1.4rem | 2rem |
| Global | Poppins | 700 | `line-height:1.25` | `h1..h6{font-family:var(--primary-font);font-weight:700;line-height:1.25}` |
| Body-Basis | Inter | 400 | 1.6rem | 1.5 |

Kein `clamp()` in der Typografie. Skalierung ausschliesslich ueber Media Queries. `letter-spacing` wird nur viermal gesetzt, davon einmal `.08em` und einmal `.01rem`. Headlines laufen ohne Tracking-Anpassung.

Haeufigste `font-size`-Werte ueber alle Stylesheets: 1.4rem (139), 1.6rem (89), 1.8rem (65), 3.2rem (61), 2.4rem (54), 2rem (42). Die Site arbeitet also mit einer dichten kleinen Skala und springt nur in Headlines nach oben.

### Bilder

Formate im Startseiten-HTML: 30 SVG, 12 JPG, 4 PNG, 2 MP4. Kein WebP, kein AVIF in den ausgelieferten Markup-Verweisen. Sanity-Bilder erhalten `?w=...&fit=max&auto=format&dpr=1` und liefern damit formatoptimierte Varianten erst zur Laufzeit.

| Attribut | Vorkommen Startseite |
|---|---|
| `loading="lazy"` | 19 |
| `srcSet` | 6 |
| `srcset` | 0 |
| `fetchpriority` | 0 |

Kein `fetchpriority` irgendwo. Das Hero-Video bekommt kein `preload`-Attribut, es hat `autoPlay`, `loop`, `muted`, `playsInline` und `controlsList="nofullscreen nodownload noremoteplayback noplaybackrate"`.

## Animationen

### Easing

Eine einzige zentrale Kurve: `--easing-function: cubic-bezier(.22, .61, .36, 1)`. Sie wird 16 Mal verwendet, unter anderem fuer Unterstreichungen, Akkordeon-Icons und Icon-Farbwechsel.

Daneben zwei weitere Kurven:

| Kurve | Vorkommen | Einsatz |
|---|---|---|
| `cubic-bezier(.18,.89,.32,1.1)` | 6 | Modal-Backdrop, Modal-Content, Slide-Out-Modal. Hat Ueberschwinger ueber 1 |
| `cubic-bezier(.4,0,.2,1)` | 2 | Tabs-Pill-Indikator, Transform und Width |

Keyword-Easings: 16 x `ease-out`, 6 x `ease-in-out`, 6 x `ease`, 2 x `ease-in`.

### Transitions

| Deklaration | Vorkommen | Wirkung |
|---|---|---|
| `transition:all .2s ease-out` | 13 | Standard fuer Buttons, Tabs, Links |
| `transition:all .3s var(--easing-function)` | 5 | Unterstreichungs-Animation |
| `transition:transform .3s ease` | 4 | Drawer und Menue-Panels |
| `transition:all .5s cubic-bezier(.18,.89,.32,1.1)` | 3 | Modals |
| `transition:transform .5s var(--easing-function)` | 2 | Aufklapp-Icons |
| `transition:visibility .8s ease-in-out,background .8s ease-in-out` | 1 | Mobile-Nav-Overlay |
| `transition:max-height .7s ease-in` | 1 | Promo-Banner |
| `transition:transform .28s cubic-bezier(.4,0,.2,1),width .28s cubic-bezier(.4,0,.2,1)` | 1 | Tabs-Pill |
| `transition:all .1s ease-out` | 2 | Footer-Links |
| `transition:transform .15s ease-in-out` | 1 | Slider-Thumb |

### Keyframes

| Name | Inhalt | Wirkung |
|---|---|---|
| `_fadeIn_1u47l_1` | `0%{opacity:.25}to{opacity:1}` | Einblenden der Impact-Bildkarte, `animation:_fadeIn_1u47l_1 var(--easing-function) 1s` |
| `_scroll_prdhk_1` | `0%{transform:translate(0)}to{transform:translate(calc(-50% + .5 * var(--inverse-gutter)))}` | Endlos-Marquee der Reviews auf Local-Guide-Seiten, `70s linear infinite`, ab 62em `50s` |
| `_pulse_hp02p_1` | `0%{background-color:var(--gray-5)}50%{background-color:var(--gray-6)}to{background-color:var(--gray-5)}` | Skeleton-Ladeplatzhalter, `1.5s infinite` |
| `_bounce_1fux1_1` / `bounce` | `0%,85%,to{opacity:.2;transform:scale(.8)}45%{opacity:1;transform:scale(1)}` | Drei-Punkte-Ladespinner, `1s infinite ease-in-out both`, Delays `-.33s` und `-.16s` |
| `spin` | `0%{transform:rotate(0)}to{transform:rotate(360deg)}` | Rotation |
| `chaseTail` | `stroke-dashoffset` 280 auf 30 und zurueck plus Rotation | SVG-Spinner fuer das Yotpo-Widget |

### Motion-Libraries

Keine. Im HTML finden sich keine Marker fuer GSAP, ScrollTrigger, Lenis, Framer Motion, AOS, Swiper, Splide, Lottie, Rive, Three.js, Webflow oder Elementor. Belege:

- `grep` nach `gsap|ScrollTrigger|lenis|Lenis|framer|swiper|Swiper|splide|Splide|lottie|Lottie|rive|three\.js|THREE|aos|AOS` im Startseiten-HTML liefert nur zwei Treffer, beide sind das Wort `right` innerhalb von Fliesstext.
- Die JavaScript-Bundles enthalten `react-spring` (`assets/react-spring_web.modern-Lc3Wt9sE.js`) als einzige Animationsabhaengigkeit.
- Carousel-Bibliothek ist `nuka-carousel` (11 Vorkommen von `nuka-*`-Klassen im Startseiten-HTML).

### Scroll-Reveal-Muster

Es gibt kein generisches Reveal-System. Die Site nutzt einen eigenen Visibility-Hook, ausgeliefert als `assets/use-visibility-ByTeNAxH.js`:

```
rootMargin:"300px 0px", threshold:0
```

Der Hook setzt `IntersectionObserver` mit 300px Vorlauf und `threshold:0` und liefert ein Boolean. Er steuert Lazy-Loading und das Nachladen von Abschnitten, nicht das Einblenden. Es gibt keine `aos-init`, `fade-up` oder `reveal`-Klassen. Lazy-Bilder bekommen stattdessen zwei Klassen aus `index-BzbZtsQD.css`:

```
.lazyImg{opacity:0;transition:opacity .2s var(--easing-function)}
.lazyImgVisible{opacity:1}
```

Das ist der einzige Einblend-Effekt beim Scrollen: ein 200ms-Opacity-Fade pro Bild, kein Stagger, keine Richtung, kein Versatz.

### Hover-Effekte

| Muster | Regel | Vorkommen |
|---|---|---|
| Button-Helligkeit | `._button_1yerl_1:hover{filter:var(--highlight-filter)}` mit `brightness(107%)` | 5 Buttons plus Tabs |
| Unterstreichung von links | `.dnav-link.dnav-link:after{content:"";position:absolute;left:0;right:0;bottom:0;height:.4rem;background:var(--primary-color);transform:scaleX(0);transform-origin:0;transition:all .3s var(--easing-function)}` und im Hover `transform:scaleX(1)` | 10 Stellen (Nav, Footer, Secondary-Nav) |
| Kartenbild-Invertierung | `._articleLink_t82pe_189:hover img{filter:invert(100%)}` plus Hintergrundwechsel auf `#4d524fd9` | Presse-Karten im Reviews-Mosaik |
| Karussell-Pfeile | `._button_dhx0w_52:hover svg{fill:var(--primary-color)}` und `._svgContainer:hover{border-color:var(--primary-color)}` | Carousel-Steuerung |
| Text-Unterstreichung | `text-decoration:underline` | 13 Stellen |
| Schatten-Verstaerkung | `box-shadow:var(--box-shadow-sm-hover)` plus Helligkeit | 3 Stellen |

### Weitere Bewegung

- Zaehleranimationen: keine gefunden. Die Zahlen `10,000`, `10,658`, `4.3` stehen statisch im HTML.
- Marquees: genau eines, das Review-Band auf Local-Guide-Seiten, mit dupliziertem DOM fuer den nahtlosen Umlauf.
- Parallax: keines gefunden.
- Sticky-Sections: drei. `header.dnav-header{position:sticky;top:0}`, `._aside_d2wd5_17{position:sticky;top:13rem}` im Help-Center, `._desktop_pape6_1{position:sticky;top:var(--secondary-nav-top)}` mit `--secondary-nav-top: 16.2rem`.
- Video-Autoplay: zwei Videos auf der Startseite, eines im Lawn-Plan-Hero, eines im Pest-Plan-Hero. Alle `muted`, `loop`, `playsInline`, mit sichtbarem Play-Pause-Button, der per `style="display:none"` initial versteckt ist.
- Back-to-Top-Pill: `._toTopPill_jk3el_1` mit `position:fixed;top:9rem;left:50%;background:#191a19bf;border-radius:3.6rem`. Im ausgelieferten HTML nicht vorhanden, also clientseitig.
- Mobile Sticky-CTA: `._newMobileFloatingCta_1buj3_1` mit `position:sticky;bottom:0;z-index:var(--z-index-sticky-cta)` und `box-shadow:0 -4px 4px #00000040`.

### Reduced Motion

Genau eine Stelle im gesamten Projekt, in `Drawer-cDDLPxdk.css`:

```
@media(prefers-reduced-motion:reduce){._backdrop_xe0fw_8,._popup_xe0fw_59{transition-duration:1ms}}
```

Marquee, Autoplay-Videos, Bild-Fades und alle `transition:all`-Regeln laufen ohne Reduced-Motion-Behandlung weiter.

## Synthese

### Seitentyp-Blueprints

**Startseite** (`/`)

1. Sticky-Nav, Full-bleed, zwei Zeilen (Logo, Suche, Sign in, Cart, dann 6 Links plus CTA-Bereich)
2. Hero 2-Spalten 50/50, links gruener Verlauf mit H1 plus Subline plus Zip-Formular, rechts Autoplay-Video
3. Promo-Banner, Full-bleed, initial `max-height:0`
4. Benefit plus Prozess-Steps, zentriert, dann 3er-Grid beziehungsweise Mobile-Carousel, danach zweites Zip-Formular plus Rating
5. Verneinungs-Sektion mit Warnbild, Listen-Karte und Textlink, Hintergrund `#38996C1A`
6. Reviews-Bento mit 6 Rasterbereichen, 8 Zitaten, 2 Pressezitaten, Vorher-Nachher-Bild
7. Footer, 5 Linkgruppen plus Legal-Band

**Leistungsseite** (`/custom-lawn-plan`)

1. Sticky-Nav
2. Hero 2-Spalten 50/50 mit Video, zweiter Link-CTA fuer Wiederkehrer
3. Einzelzitat mit Kundenname und Bundesstaat
4. Prozess-Grid 4er mit Icons
5. Zip-Formular plus Sternebewertung
6. Nutzen-Claim plus 3 Feature-Karten
7. Feature-Liste mit Bild links und 3 Icon-Zeilen rechts
8. Video-Sektion, zentriert, 16:9
9. 3er-Grid Nutzen mit grossem Bild
10. Produktkarten-Reihe 4er
11. Wissenschafts-Block 2-Spalten mit namentlichem Experten
12. Inhaltsstoff-Grid plus Garantie-Band mit Badge-Overlay, Textlink zu Bewertungen
13. Team-Sektion 2-Spalten mit rundem Bild
14. Footer

**Local-Guide-Seite** (`/local-guide/lawn-care-in-<stadt>-<staat>`)

1. Sticky-Nav
2. Ort-Hero, zentrierte Karte auf farbigem Grund, H2 statt H1
3. Marketing 2-Spalten mit Bild plus Zip-Formular
4. Nutzen-Liste mit 4 lokalen Punkten
5. Prozess-Steps 3er
6. Datentabelle mit 6 lokalen Messwerten
7. Lokaler Fliesstext mit H3
8. Review-Marquee 70s beziehungsweise 50s mit dupliziertem DOM
9. Zip-Formular in grüner Box
10. Orts-FAQ-Akkordeon mit 6 Fragen, als `FAQPage` ausgezeichnet
11. Anbau-Datenblock plus Fliesstext
12. Ratgeber-Teaser 4er
13. Nachbarschafts-Funnel mit Kartenansicht
14. Footer

**Ratgeber-Artikel** (`/shed/<kategorie>/<slug>`)

1. Sticky-Nav
2. Hero-Bild Full-bleed, Hoehe 20rem mobil, 64rem ab 62em
3. Titelbox absolut positioniert ueber dem Bild, Breite 86.8rem, mit Kategorie-Breadcrumb
4. Sticky-Sidebar mit Tags, Autor, Datum, Share, Inhaltsverzeichnis
5. Desc-Satz zentriert
6. Artikelkoerper mit H2 und H3, internen Links und Quellenabschnitt
7. Body-Footer mit Tags, Share und Autor-Bio
8. Footer

**Shop-Kategorieseite** (`/shop/category/<bereich>`)

1. Sticky-Nav
2. Inline-Funnel-Banner mit Icon, Text und Zip-Formular
3. H1 linksbuendig
4. Visuelle Sub-Navigation 6er-Grid mit runden Bildern
5. Sortier-und-Filter-Leiste, Desktop-Sidebar, Mobil Modal
6. Produkt-Grid 2er, 3er oder 4er je Breakpoint, Karten mit Badge, Streichpreis, Free-Shipping-Zeile und Add-to-cart
7. Differenzierungs-Widget 2x2 zwischen den Karten
8. SEO-Textbloecke mit H3
9. FAQ-Akkordeon
10. Verwandte Kategorien 4er
11. Footer

**Produktseite** (`/shop/<bereich>/<slug>`)

1. Sticky-Nav
2. Breadcrumb
3. Produktkopf plus Kaufbox, 2-Spalten gespiegelt, Bildcarousel mit Thumbnails, Name, wissenschaftlicher Name, Preis, Einheit, Sterne, Mengen-Inkrementor, Add-to-cart
4. Beschreibung plus Plant-Info-Liste mit 6 Icon-Zeilen
5. Anleitungs-Teaser mit CTA
6. Related products
7. Yotpo-Review-Widget
8. Sticky Mobile-CTA
9. Footer

**Funnel-Einstieg** (Zip-Formular, auf 7 von 10 Seiten identisch)

1. Optional Vorzeile `Get started: zip code` in Versalien 1rem
2. Label `Where do you live?` beziehungsweise `Zip code`
3. Eine Eingabe mit Google-Maps-Autocomplete, `role="combobox"`, `aria-autocomplete="list"`, Placeholder `Enter your zip code`
4. Button `Get my plan` beziehungsweise `Get my lawn analysis` beziehungsweise `Get my custom plan`
5. Direkt darunter Sternebewertung `4.3` und `Based on over 10,000 reviews`

Kein Multi-Step-Quiz im ausgelieferten HTML. Die Folgeseiten `/lawn-size`, `/my-plan` und `/pest/new` liegen hinter JavaScript beziehungsweise hinter robots-Sperren, ihr Formularaufbau ist deshalb nicht belegbar.

### Die 5 staerksten Muster

**1. Der Preisanker steht im Hero und wiederholt sich als Datenpunkt.**

Startseite, `pretty/home.html:283`: `<p class="_subheading_1qnjw_133 _leftAligned_1qnjw_122 _copyLoading_1qnjw_150" id="homepage-hero-subheader">Get started today for as low as $55 for a custom lawn plan</p>`

Derselbe Wert erscheint im Title-Tag der Local-Guide-Seiten (`From $55`), im FAQ-Schema (`typically costs $55 for the first box`) und in `llms.txt` (`Plans start at $80/season`). Die Zahl wird also ueber alle Kanaltypen konsistent gehalten, nicht pro Seite neu erfunden.

**2. Die Verneinung als Vertrauensbeweis, mit Namensliste.**

Startseite, `pretty/home.html:426-433`: `<h2>Those yellow flags are red flags</h2>` und darunter `<p>You <strong>won&#x27;t</strong> find this junk in Sunday products:</p><ul class="_notIncludedList_5hob1_114"><li>glyphosate</li><li>imidacloprid</li><li>bifenthrin</li><li>trifluradin</li></ul>`

Die Pest-Plan-Seite wiederholt die Mechanik ohne Liste, `pretty/custom-pest-plan.html:407`: `<h1>Leave hazmat suits where they belong—in the past</h1>`. Die Liste nennt vier konkrete Wirkstoffnamen, keine Kategorie wie "Chemikalien". Die Karte hat eigene Gestaltung, `_notIncludedBlock_5hob1_91` mit `background-color:var(--light-color)`, `border-radius:var(--border-radius)`, `box-shadow:var(--box-shadow)` und einem 2x2-Raster mit durchgestrichenen Kreis-Icons als `:before`-Content.

**3. Der Funnel-Einstieg ist ein einziges, mehrfach platziertes Formular.**

Startseite traegt dasselbe Zip-Formular zweimal, im Hero und nach den Prozess-Steps. `pretty/home.html:407`: `<span>10,000 reviews </span>` mit Link auf `#reviews`. Shop-Kategorie, Shed-Uebersicht, Help-Center und jeder Local-Guide tragen dasselbe Element mit anderem Label. Die Feldstruktur ist immer identisch: `role="combobox"`, `data-testid="google-autocomplete"`, `aria-label="zip code"`, `name="address"`. Nur das Button-Label variiert zwischen `Get my plan`, `Get my lawn analysis`, `Get my custom plan` und `Start your lawn analysis`. Ein einziges Conversion-Element, ueber die ganze Site verteilt.

**4. Die Masse an Content wird als Trust-Flaeche eingesetzt, nicht als Blog gepflegt.**

Sitemap: 1347 Local-Guide-Seiten, 421 Ratgeber-Artikel, 229 Produkte, 64 FAQ-Seiten. Die Local-Guide-Seiten tragen pro Stadt eine Daten-Tabelle mit sechs Messwerten und Stichprobengroesse, `pretty/local-guide.html:407`: `<td class="_tableCell_1evxs_14"> Average lawn size </td><td class="_tableCell_1evxs_14"> 3,000 sq ft (based on 2,100 local soil tests) </td>`.

Dazu 1449 Worte im Haupttext, sechs ortsspezifische FAQ mit `FAQPage`-Auszeichnung, ein Review-Marquee mit Standortangabe je Karte und eine Liste lokaler Blogartikel. Eine Seite deckt damit Ranking, Ortsbezug und Beweis gleichzeitig ab.

**5. Die Hover-Unterstreichung als einziges wiederkehrendes Bewegungsmotiv.**

`css/index-BzbZtsQD.css`: `.dnav-link.dnav-link:after{content:"";position:absolute;left:0;right:0;bottom:0;height:.4rem;background:var(--primary-color);transform:scaleX(0);transform-origin:0;transition:all .3s var(--easing-function)}`

Zehn Stellen benutzen genau dieses Motiv, mit variierender Hoehe (`.4rem` in der Hauptnav, `.2rem` im Footer und in der Secondary-Nav, `2px` beim Sign-in) und variierendem Farbwert (`var(--primary-color)` gelb, `var(--interactive-green-color)` gruen im Branding-Refresh). Der Ursprung liegt immer links, die Skalierung immer von 0 auf 1. Kein Slide, kein Fade, kein Layout-Shift.

### Animation-Rezepte

Alle Werte woertlich aus dem Projekt.

**Rezept 1: Nav-Unterstreichung, links nach rechts**

```css
.nav-link{position:relative;padding-bottom:1.4rem;font-weight:600;font-size:1.4rem}
.nav-link::after{
  content:"";position:absolute;left:0;right:0;bottom:0;height:.4rem;
  background:#f9ce19;                 /* --primary-color */
  transform:scaleX(0);transform-origin:0;
  transition:all .3s cubic-bezier(.22,.61,.36,1);  /* --easing-function */
}
.nav-link:hover::after,
.nav-link:focus-visible::after,
.nav-link.is-active::after{transform:scaleX(1)}
```

Beleg: `css/index-BzbZtsQD.css`, Klasse `.dnav-link.dnav-link`.

**Rezept 2: Button-Hover per Filter, ohne Farbwechsel**

```css
.button{
  background:#288356;border:2px solid #288356;color:#ffffff;
  padding:1.2rem 3.2rem;border-radius:8px;
  font-family:"Poppins",sans-serif;font-weight:600;font-size:1.6rem;
  text-shadow:0 1px 10px rgba(0,0,0,.1);
  transition:all .2s ease-out;
}
.button:hover{filter:brightness(107%)}
.button:disabled{filter:brightness(93%);cursor:not-allowed}
```

Beleg: `css/button-2B4S-34K.css`, Klasse `._button_1yerl_1` mit `--highlight-filter: brightness(107%)` aus `index-BzbZtsQD.css`. Der Hover veraendert keine einzige Farb- oder Layout-Property, nur den Filter.

**Rezept 3: Autoplay-Hero-Video ueber das `media`-Attribut, nicht per JavaScript**

```html
<video autoPlay loop muted playsInline
       controls controlsList="nofullscreen nodownload noremoteplayback noplaybackrate">
  <source src="/videos/hero-mobile.mp4"  type="video/mp4" media="(max-width: 767px)">
  <source src="/videos/hero-desktop.mp4" type="video/mp4">
</video>
```

Beleg: `pretty/home.html:296-299`. Der Browser waehlt die Quelle selbst, die Site liefert kein `preload`-Attribut und kein `poster` auf der Startseite, nur auf der Pest-Plan-Seite (`poster="/images/pest/pest-plan-hero-still.jpg"`).

**Rezept 4: Review-Marquee mit dupliziertem DOM**

```css
.marquee-viewport{overflow:hidden;position:relative;height:450px}
.marquee{
  display:flex;gap:3.2rem;
  animation:scroll 70s linear infinite;
  position:absolute;top:2rem;left:0;
}
@media screen and (min-width:62em){.marquee{animation-duration:50s}}

@keyframes scroll{
  0%  {transform:translate(0)}
  to  {transform:translate(calc(-50% + .5 * -24px))}   /* 0.5 * var(--inverse-gutter) */
}
```

Beleg: `css/regional-seo-page-DvgSxWRe.css`, Klassen `_reviewOuterContainer_prdhk_171`, `_reviewsContainer_prdhk_178`. Die Kartenliste steht zweimal im HTML, daher der Halbierungsfaktor im `translate`. Kein Pause-on-Hover, keine Reduced-Motion-Variante.

**Rezept 5: Modal von unten, mit Ueberschwinger**

```css
.backdrop{
  background:#000000ab;position:fixed;inset:0;opacity:1;
  transition:opacity .5s cubic-bezier(.18,.89,.32,1.1);
}
.backdrop[data-starting-style],
.backdrop[data-ending-style]{opacity:0}

.modal{
  --modal-open-y:5rem;
  transform:translateY(var(--modal-open-y));
  transition:opacity .5s cubic-bezier(.18,.89,.32,1.1),
             transform .5s cubic-bezier(.18,.89,.32,1.1);
}
.modal[data-starting-style],
.modal[data-ending-style]{opacity:0;transform:translateY(67vh)}
@media screen and (min-width:48em){.modal{--modal-open-y:0rem}}
```

Beleg: `css/modal-CCL7vmK2.css`, Klassen `._backdrop_fse7v_6` und `._modal_fse7v_26`. Auf Mobil startet das Modal bei `67vh` und faehrt auf `5rem` hoch, auf Desktop auf `0`. Dieselben Werte stehen fuer die Legacy-Modals in `index-BzbZtsQD.css` unter `.ReactModal__Overlay` und `.ReactModal__Content`.

**Rezept 6: Bild-Lazy-Fade**

```css
.lazyImg{opacity:0;transition:opacity .2s cubic-bezier(.22,.61,.36,1)}
.lazyImgVisible{opacity:1}
```

Beleg: `css/index-BzbZtsQD.css`. Visibility-Trigger im JS-Bundle `use-visibility-ByTeNAxH.js`: `new window.IntersectionObserver(cb,{rootMargin:"300px 0px",threshold:0})`. Kein Stagger, kein Versatz, keine Richtung.

Nicht belegbar: alle Animationen, die erst nach Hydration entstehen (Skeleton-Shimmer mit `_pulse_hp02p_1`, Spinner mit `_bounce_1fux1_1`, Modal-Ein- und -Ausblenden, VWO-Testvarianten). Diese Werte stehen im CSS, ihr tatsaechlicher Trigger ist ohne Browser nicht messbar.

### Anti-Patterns und Schwaechen

1. **Kein `prefers-reduced-motion` ausser an einer Stelle.** Nur der Drawer bremst sich auf `transition-duration:1ms`. Das Endlos-Marquee auf 1347 Local-Guide-Seiten laeuft mit `70s linear infinite` weiter, zwei Autoplay-Videos starten auf jeder Startseiten- und Funnel-Ansicht, alle `transition:all`-Regeln bleiben aktiv. Das ist bei einer Seite mit dieser Reichweite eine Accessibility-Luecke.

2. **Kein Zustand im Kopf-Tag der Kernseiten.** Startseite, Ratgeber-Artikel, Shop-Kategorien, Produktseiten und Help-Center liefern kein JSON-LD aus. Nur Startseite, `/custom-lawn-plan`, `/reviews` und die Local-Guides haben Schema. Ein Ratgeber-Artikel mit 851 Woertern, Autor, Datum und Quellenliste hat kein `Article`-Markup, dort waere es der einfachste Gewinn.

3. **Vier Kernseiten liefern eine leere App-Shell aus.** `/about`, `/sunday-guarantee`, `/our-ingredients` und `/lawn-size` antworten mit HTTP 200 und 23264 Bytes, die byte-identisch sind und nur `<div class="app-shell"></div>` plus Datenstrom enthalten. Der `content-type` ist `text/plain; charset=utf-8` mit `content-length: 0`. Ueber `curl` ist der Inhalt dieser Seiten nicht lesbar, ueber Googlebot ebenfalls nicht. Der Titel bleibt jeweils `Sunday Lawn Care`.

4. **Fuenf Schriftfamilien gleichzeitig.** Poppins, Inter, Lora, Fraunces, Domine und aesthet-nova inklusive. Davon sind drei Serif-Schriften (Lora, Fraunces, Domine) fuer drei eng umrissene Zwecke. Das kostet Ladezeit und erzeugt einen sichtbaren Bruch zwischen Shop und Ratgeber.

5. **H1 wird uneinheitlich behandelt.** Gezaehltes Vorkommen von `<h1` je Seite: Startseite 1, `/custom-lawn-plan` 1, `/custom-pest-plan` 5, `/shop/category/lawn-care` 1, Produktseite 1, `/shed` 1 (dort traegt der Feature-Artikel den H1, nicht die Seite), `/shed/categories/weeds` 1, Artikel 1, `/reviews` 1, `/help-center` 1, `/local-guide/lawn-care-in-austin-tx` 0. Die Pest-Plan-Seite setzt H1 fuenf Mal, unter anderem auf `My Plan custom checklist`, `Leave hazmat suits where they belong—in the past`, `OK, but does it work?` und `Ready to solve your pest problem?`. Die 1347 Local-Guide-Seiten haben gar kein H1, ihre Hauptzeile `Lawn Care in Austin, TX for Yards That Love the Heat` ist ein H2.

6. **Keine Bildformate ausser JPG und PNG im Markup.** 12 JPG und 4 PNG auf der Startseite, 0 WebP, 0 AVIF. Die Formatoptimierung haengt vollstaendig an Sanity (`?auto=format`) und greift nur bei den ueber Sanity gehosteten Bildern, nicht bei den lokalen Pfaden unter `/images/`.

7. **`transition:all` an 13 Stellen.** Jede dieser Regeln animiert auch Eigenschaften mit, die sich nicht aendern sollen, und ist damit ein Layout-Thrashing-Risiko.

8. **Das mobile Burger-Icon animiert nicht.** `pretty/home.html:246-249` zeigt drei Pfade mit `stroke="var(--black)"`, das Hamburger-SVG hat keine Animationsklasse. Der Wechsel zum Kreuz passiert ohne Uebergang.

### Conversion-Mechanik

Die Seite beginnt mit einem Preisversprechen (`Get started today for as low as $55`) und einem einzigen Eingabefeld statt einem Formular, sodass der erste Schritt weniger Aufwand kostet als das Ausfuellen einer Adresse. Dieses Zip-Element ist ueber Startseite, beide Leistungsseiten, vier Shop- und Content-Seiten, jede Local-Guide-Seite und das Help-Center identisch platziert, es gibt also ueberall denselben Einstieg statt vieler verschiedener. Der Beweis wird in der Reihenfolge Preis, Sternebewertung mit absoluter Zahl, Verneinungsliste konkreter Wirkstoffe und erst danach Kundenstimmen gestaffelt, das Risiko wird also frueh benannt statt spaet beschwichtigt. Die Verneinung (`glyphosate`, `imidacloprid`, `bifenthrin`, `trifluradin`) und die Garantie mit Siegel tragen die Kaufentscheidung, nicht die Produktbeschreibung. Nach dem Zip folgen Anmeldung, Adresserkennung und Quiz, ein Preis wird erst nach dem Quiz sichtbar, das ist die eigentliche Konversionsstrecke.

## Abrufprotokoll

Alle Abrufe mit User-Agent `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36`, Kurzzeitlimit 30s.

| URL | Status | Bytes |
|---|---|---|
| https://www.getsunday.com/ | 200 | 53385 |
| https://www.getsunday.com/robots.txt | 200 | 1292 |
| https://www.getsunday.com/sitemap.xml | 200 | 903 |
| https://www.getsunday.com/sitemap/regional-pages.xml | 200 | 124056 |
| https://www.getsunday.com/sitemap/shop.xml | 200 | 25204 |
| https://www.getsunday.com/sitemap/shed.xml | 200 | 44370 |
| https://www.getsunday.com/sitemap/help.xml | 200 | 7433 |
| https://www.getsunday.com/sitemap/general.xml | 200 | 1502 |
| https://www.getsunday.com/custom-lawn-plan | 200 | 69275 |
| https://www.getsunday.com/custom-pest-plan | 200 | 53325 |
| https://www.getsunday.com/reviews/sunday-lawn-care-reviews | 200 | 144536 |
| https://www.getsunday.com/shed | 200 | 209086 |
| https://www.getsunday.com/shop/category/lawn-care | 200 | 1866395 |
| https://www.getsunday.com/shop/category/lawn-care/lawn-fertilizer | 200 | 1839890 |
| https://www.getsunday.com/shop/garden/arabian-jasmine | 200 | 1560531 |
| https://www.getsunday.com/shed/lawn/soil-food-web | 200 | 98930 |
| https://www.getsunday.com/shed/categories/weeds | 200 | 132884 |
| https://www.getsunday.com/local-guide/lawn-care-in-austin-tx | 200 | 117321 |
| https://www.getsunday.com/help-center | 200 | 65525 |
| https://www.getsunday.com/llms.txt | 200 | 2242 |
| https://www.getsunday.com/llms-full.txt | 200 | 13582 |
| https://www.getsunday.com/about | 200 | 24176 (leere App-Shell) |
| https://www.getsunday.com/about (Googlebot-UA) | 200 | 23080 (leere App-Shell) |
| https://www.getsunday.com/about (Accept-Header) | 200 | 24537 (leere App-Shell) |
| https://www.getsunday.com/sunday-guarantee | 200 | 23264 (leere App-Shell) |
| https://www.getsunday.com/our-ingredients | 200 | 23264 (leere App-Shell) |
| https://www.getsunday.com/lawn-size | 200 | 23264 (leere App-Shell) |
| https://www.getsunday.com/shed/lawn-care/how-to-get-rid-of-crabgrass | 404 | 36148 |
| https://www.getsunday.com/assets/index-BzbZtsQD.css | 200 | 22463 |
| https://www.getsunday.com/assets/home-DKQjNTDS.css | 200 | 10250 |
| https://www.getsunday.com/assets/product-details-page-VT5NLVyB.css | 200 | 4294 |
| https://www.getsunday.com/assets/recommended-products-list-D9jm5Dbg.css | 200 | 2714 |
| https://www.getsunday.com/assets/trending-products-C3Ek5GVq.css | 200 | 368 |
| https://www.getsunday.com/assets/neighbors-impact-section-rWR-J3AB.js | 200 | 6931 |
| https://www.getsunday.com/assets/use-visibility-ByTeNAxH.js | 200 | 380 |
| https://www.getsunday.com/assets/app-nav-B-GlL4en.js | 200 | 5302 |
| https://www.getsunday.com/assets/my-plan-cta-CH1Sd3fd.js | 200 | 526 |
| https://www.getsunday.com/assets/products-D4QRg8Em.js | 200 | 372 |
| https://www.getsunday.com/assets/legacy-routes-CzGtsU3N.js | 200 | 2566 |
| https://www.getsunday.com/assets/root-DVsB-oS4.js | 200 | 6787 |
| https://www.getsunday.com/assets/home-BtU6kJ3S.js | 200 | 6099 |
| https://www.getsunday.com/assets/index-B5tn2vFw.js | 200 | 10670 |
| https://fonts.googleapis.com/css?family=Poppins:400,600,700,800,italic | 200 | 586 |
| https://fonts.googleapis.com/css?family=Inter:400,500,700,800 | 200 | 750 |
| https://fonts.googleapis.com/css?family=Lora:400,500,600,700,italic | 200 | 1780 |
| https://fonts.googleapis.com/css2?family=Domine:wght@700&display=swap | 200 | 390 |
| https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900 | 200 | 641 |
| https://use.typekit.net/qcf8ymb.css | 200 | 680 |

Zusaetzlich 60 weitere Modul-Stylesheets von `/assets/*.css` geladen, jeweils HTTP 200, zwischen 37 und 6383 Bytes. Alle 65 heruntergeladenen Stylesheet-Dateien liegen in `/tmp/site-getsunday/css/`, die HTML-Dateien in `/tmp/site-getsunday/`, zeilenweise aufbereitete Kopien fuer Zitate in `/tmp/site-getsunday/pretty/`.

Antwort-Header der Domain (Stichprobe, `curl -sI https://www.getsunday.com/`): `server: cloudflare`, `cf-cache-status: DYNAMIC`, `cache-control: public, max-age=0, s-maxage=10, stale-while-revalidate=60`, `x-envoy-upstream-service-time: 5`, `strict-transport-security: max-age=31536000; includeSubDomains`.
