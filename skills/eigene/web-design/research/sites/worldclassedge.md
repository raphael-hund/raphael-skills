# www.worldclassedge.com

Analyse vom 2026-09-16. Basis: 8 HTML-Seiten, 5 CSS-Dateien (645.585 Zeichen CSS).
Alle Belege aus `/tmp/site-worldclassedge/`. Zitate wörtlich, Zeilennummern beziehen
sich auf die jeweilige Datei im Arbeitsverzeichnis.

## Steckbrief

| Feld | Wert |
|---|---|
| Domain | www.worldclassedge.com |
| Branche | Trading-Ausbildung / Finanz-Education (SaaS-Plattform) |
| Seitentyp | Marketing-One-Pager mit Unterseiten, Funnel auf externe App-Subdomain |
| Stack | Next.js (App Router, Turbopack, Vercel), Tailwind v3, Sanity CMS, Mux Video, Lenis Smooth Scroll, Radix UI |
| Analytics | Google Tag Manager `GTM-54BZTKCB`, PostHog (`CSPostHogProvider`) |
| Consent | Kein Consent-Tool im HTML gefunden, nur `Cookie Settings`-Link im Footer (`href="#"`) |
| Formular-Backend | Zapier Webhook + HubSpot-Formular-ID (nur als Config im Flight-Data, DOM hat 0 `<form>`-Tags) |
| Sprache | Inhalte Englisch, `<html lang="de">` |
| Anrede | Du („why you'll never see anywhere else", „You get free access") |
| Anzahl Seiten in Sitemap | 0 (keine `sitemap.xml`, HTTP 404). `robots.txt` verweist auf keine Sitemap, sperrt nur `/studio` |
| Bekannte Routen | 8 (7 intern verlinkt + 1 versteckte `/thank-you`) |
| Preis | 0 EUR, „€0 — completely free" |

**Nicht abrufbar / nicht vorhanden:** `/sitemap.xml` liefert HTTP 404 mit Next.js-Fehlerseite
(34.065 Bytes, `"__next_error__"`, `noindex`). `robots.txt` enthält nur zwei `User-agent: *`-Blöcke
ohne Sitemap-Zeile. Kein `<meta name="description">` auf Startseite, Mentors, Privacy, Terms,
Risk Disclaimer, Thank-you (nur auf Manifesto und Masterclasses). Kein einziges
`application/ld+json` auf allen 8 Seiten. Kein `hreflang` auf allen 8 Seiten.

## Sitemap

Aus Navigation, Footer und Link-Graph rekonstruiert.

| Pfad | Typ | In Nav | In Footer |
|---|---|---|---|
| `/` | Startseite (11 Sections) | Logo | ja |
| `/mentors` | Mentor-Übersicht + 7 Detail-Blöcke | ja | ja |
| `/manifesto` | Founder-Letter | ja | ja |
| `/course-gallery` | Kurs-/Masterclass-Übersicht | ja („Masterclasses") | ja |
| `/privacy` | Legal, 19 H2 | nein | ja |
| `/terms-and-conditions` | Legal, 17 H2 | nein | ja |
| `/risk-disclaimer` | Legal, 7 H2 | nein | ja |
| `/thank-you` | Funnel-Danke-Seite mit Countdown | nein (versteckt) | nein |

Anker-Ziele auf der Startseite: `/#why-wce`, `/#manifesto`, `/#faq`.
Externe Ziele: `https://worldclassedge.app` (Login, Register, alle CTAs),
`https://wce-platform-2026.vercel.app/login` (Watch intro), Instagram, YouTube, LinkedIn.

## Seiten

### / (Startseite)

- `<title>`: `Home - World Class Edge`
- Meta-Description: keine
- H1: `Learn from World Class Traders` (2× im DOM, einmal Desktop- und einmal Mobile-Variante)
- H2: 11, H3: 3
- Schema.org: 0, canonical: `https://https://worldclassedge.com//` (doppeltes Protokoll und doppelter Slash, fehlerhaft), hreflang: 0

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Nav | Logo (SVG, nur Pfad, kein Text) |, | Full-bleed sticky-ish | SVG-Logo 161×25 | Login, Register |, | `nav class="w-full border-b shadow-[0_0.5rem_2.5rem_rgba(0,0,0,0.24)] ... bg-black/20"`, keine Telefonnummer, kein sticky |
| 2 | Hero | Learn from World Class Traders | World Trading Champions, Market Makers, Hedge Fund Traders, Get free access to the strategies you'll never see anywhere else. Taught by people who manage real capital, not content | Full-bleed mit Video-Layer | Mux-Video Autoplay muted loop, Poster `image.mux.com/J02aVbeu7MYIQRSPTV1Pafvm01uakTnBQjbcqdo1ueHfk/thumbnail.png` | Register Now, Watch intro | „World Class Edge presents" Eyebrow | `lg:h-[96svh] lg:min-h-[64rem]`, Overlay `data-navbar-theme="light"` |
| 3 | Trailer / Video-Teaser | Meet the world's best. New classes added every month. |, | Zentriert schmal | Video-Player |, |, | Eyebrow „Teaser", `<video preload="none" aria-hidden="true">` |
| 4 | Mentor-Grid + Marquee | Learn directly from institutional traders. |, | 3er-Grid Desktop, Karussell Mobile | 9 Mentor-Fotos (Sanity CDN, `aspect-[390/480]`) | Register Now | Titel: „Multiple Vice World Champion in Trading", „2× World Champ, 12× Top 3 worldwide", „Wall Street Trader, $10 million managed", „TTT Founder, 4× World Champ Mentor", „TradingView's Pine Script™ Wizard" | 9 Mentoren, Grid-Container `lg:grid-cols-3` |
| 5 | Benefits-Tabs (3 Schritte) | Why thousands of traders choose WCE. |, | Tabs, Full-bleed weiße Sektion | 3 Icon-Gruppen | Register Now (3×) | „verified professional background", „top 1% of traders" | `bg-white py-[8rem] lg:py-[15rem]`, Nummerierung 01/02/03, Themen „Master the Art of Trading", „Learn On Your Own Time", „Connect With Ambitious Traders" |
| 6 | Kurs-Karten | Enjoy Hours of Trading Education in 5+ Courses |, | Carousel/Slider mit Zähler-Punkten 1 bis 6 | Kurs-Thumbnails | Watch intro, All classes | „5 Videos", „1:40:14" Laufzeit | `bg-black py-[15rem]`, Kurs 1 „The complete Order Flow by Fabio Valentini" mit 11 Lesson-Zeilen |
| 7 | Lesson-Liste |, |, | Liste |, |, |, | 11 nummerierte Lessons mit Einzeldauer (11:34, 12:31, 11:03, 12:26, 9:52, 12:49, 9:25, 8:44, 9:16, 8:10, 07:05) |
| 8 | Coming-Soon-Karussell | Coming Soon |, | Carousel (`aria-roledescription="carousel"`, 16 Slides) | Gradient-Karten `linear-gradient(180.056deg, #0C1E29 13.038%, #314C5E 120.36%)` |, | „New traders" Label | `bg-black`, `cursor-grab` |
| 9 | Produkt-Demo-Mockup | Everything about trading in one place. See what you can expect inside. |, | Bento/Mockup mit Sticky-Innenheader | 5 gestapelte Rechtecke als Browser-Chrome, SVG-Assets | Watch now, Learn more | Plattform-Nav „Dashboard, Student Area, Ranks, Leaderboard, Community, Macrodashboard, Rewards" | Einzige weiße Sektion mit `bg-white`; Innen-Scroll mit `data-lenis-prevent="true"`, `sticky top-0 z-20`, Kurszeile „Read intent before price moves, trade the tape the way desks do.", „14 Videos", „3:42:18", Autor „Serge Bering" |
| 10 | Stats-Zähler | WCE wins. Every time. |, | 2-Spalten-Vergleich, 4er-Grid | Check- und X-Icons | Register Now | Links „Other Platforms", rechts „World Class Edge" | 9 Vergleichszeilen: „€3,000–9,000 per course" vs „€0 — completely free", „3–5 years" vs „Clear path in 6–12 months", „Fake screenshots" vs „Third-party verified", „Generic courses" vs „World Trading Champion methodology", „None included" vs „Institutional Macrodashboard", „None" vs „Cashback + ranking rewards", „Zero" vs „Full — verified, not claimed", „€49–199 signals" vs „None", „No structure" vs „Disciplined framework included" |
| 11 | FAQ-Akkordeon | Frequently asked questions |, | Akkordeon (Radix) |, |, |, | 5 Fragen, Eyebrow „FAQ", `bg-white/[0.03] p-[3rem] rounded-[1.5rem]`, erste Antwort sichtbar (`data-state="open"`) |
| 12 | Final-CTA | There is no reason not to join. | It's free. No credit card. No commitment. Just the best trading education on the planet waiting for you. | Zentriert-schmal |, | Register Now | „No credit card. No commitment." | Plus-Icon im Kreis `h-[5.25rem] w-[5.25rem] rounded-full border border-white/30` |
| 13 | Footer | There is no reason not to join. | dito | 4 Bereiche, Desktop only | Logo 252×38 | Register Now, Socials | Socials Instagram, Youtube | `bg-[#0F0F0F]`, Spalten: Logo+Claim+CTA, `WEBSITE` (nur Masterclasses-Seite), `SOCIALS`, Rechtliches (Privacy policy, Terms of Service, Risk Disclaimer, Cookie Settings), `© World Class Edge - All rights reserved` |

**Hero-Formel**

- H1-Nutzenversprechen: „Learn from World Class Traders" (4 Wörter). Das `em`-Element
  setzt „World" kursiv in Newsreader.
- Subline-Länge: 25 Wörter.
- Anzahl CTAs im Hero: 2 („Register Now" als Primär, „Watch intro" als Video-Overlay).
- CTA-Labels wörtlich: `Register Now`, `Watch intro`.
- Trust-Signal im Hero: keins. Keine Sterne, keine Siegel, keine Kundenzahl. Nur die
  Eyebrow „World Class Edge presents".
- Medientyp: Video (Mux, Autoplay, muted, loop, playsInline) plus Poster-Thumbnail.
- Hero-Höhe: `lg:h-[96svh] lg:min-h-[64rem]`, mobil `flex relative flex-col bg-black`.

**CTA-Strategie Startseite**

| Label | Häufigkeit im HTML | Ziel |
|---|---|---|
| Register | 20 | `https://worldclassedge.app` |
| Register Now | 18 (12 Links + 6 Textdoppelungen für Hover) | `https://worldclassedge.app` |
| Login | 1 | `https://worldclassedge.app` |
| Watch intro | 1 | `https://wce-platform-2026.vercel.app/login` |
| Watch now | 1 | Plattform-Demo |
| Learn more | 1 | Plattform-Demo |
| All classes | 1 | `/#courses` |
| Join Waitlist | 1 (nur Flight-Data, `"action":"popup"`) | Popup mit Zapier-Formular |

Alle 12 „Register Now"-Links zeigen auf dieselbe externe URL. Es gibt genau einen Funnel,
keine Segmentierung. Sticky-Header-CTA: nein, die Nav ist `w-full`, nicht `fixed`/`sticky`.
Telefonnummer im Header: nein, nirgends auf der Site.

**Trust-Staffelung (Reihenfolge im DOM)**

1. Hero: keine Trust-Elemente.
2. Sektion 4: Mentor-Namen mit Titeln, das ist das erste Trust-Element.
3. Sektion 5: Qualifier „verified professional background", „top 1% of traders".
4. Sektion 6: Kurslaufzeiten als Substanz-Beleg.
5. Sektion 10: Vollvergleich gegen „Other Platforms".
6. Sektion 11: FAQ beantwortet Einwände.
7. Footer: „No credit card. No commitment."

Auffällig: keine Google-Sterne, keine Presse-Logos, keine Auszeichnungs-Siegel, keine
Kundenzahl, keine Garantie, keine Standortliste. Das gesamte Vertrauen hängt an den
Mentor-Namen und deren Titeln.

**Funnel/Formular**

Aus dem Next.js-Flight-Data der Startseite:

```
"signupCTA":{"cta":{"action":"popup", ... "name":"Join Waitlist",
"popup":{..., "content":[{"...text":"Join our "},{...,"marks":["em"],"text":"waitlist!"}, ...],
"formType":"zapier",
"zapierForm":{"fields":[{"label":"First Name","name":"First Name","required":true,"type":"text"},
{"label":"Email Address","name":"Email address","required":true,"type":"email"}],
"settings":{"message":"Vielen Dank für Ihre Einsendung!","onSubmit":"redirect",
"redirect":{...,"slug":{"current":"/thank-you"}},"submitText":"Join now",
"url":"https://hooks.zapier.com/hooks/catch/10370650/4hp0wki/"}},"title":"Join Waitlist"}}
```

- Schritte: 1 Schritt, 2 Felder, kein Multi-Step.
- Fragetypen: `type="text"` für Vorname, `type="email"` für E-Mail. Keine Kacheln,
  keine Radio-Buttons, kein Rechner, kein Konfigurator.
- Fortschrittsanzeige: keine.
- Persönliche Daten: sofort, beide Felder `required: true`.
- Microcopy neben dem Button: keine. Der Popup-Text lautet
  „Register now and get directly access to the live event for free!".
- Submit-Label: `Join now`. Danach Redirect auf `/thank-you`.
- Es gibt eine zweite, ungenutzte Konfiguration mit HubSpot (`formId`,
  `portalId: "146426345"`, `submitText: "Join now!"`) im selben Flight-Data.
- Im gerenderten DOM existiert kein `<form>` und kein `<input>`. Das Formular ist rein
  clientseitig und wird per Popup gemountet.

**Ratgeber-Artikel:** nicht vorhanden. Kein Blog, kein Magazin, kein Ratgeber, kein
Artikel-Layout, keine Autorenbox, keine Lesezeit. Entsprechend auch kein Article- oder
FAQPage-Schema.

### /mentors

- `<title>`: `Mentors - World Class Edge`, Meta-Description: keine
- H1: `World Class Traders`, H2: 2, H3: 0, Schema.org: 0
- Eyebrow: `our mentors`

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero | World Class Traders | World Trading Champions, Market Makers, Hedge Fund Traders: On World Class Edge we gather some of the best traders worldwide. | Zentriert-schmal |, | Learn more about them, (scroll down ↓) |, | `about their background, trading style and achievements` |
| 2 | Mentor-Grid | The World Class Edge Mentors | But who are these people really? | 3er-Grid Desktop, Carousel Mobil (20 Slides) | 9 Portraits | Register Now | „Since 2024", „verified professionals with real, audited track records and titles from the World Trading Championships" | Subline: „Our mentors are not coaches or marketers." |
| 3 | Mentor-Detail-Blöcke | Get to know more about each Mentor |, | Zigzag / Tabs (7 Reiter) | Portraits, externe Videolinks | Watch Fabios Course now, Watch Andreas Course now, Watch Toms Course now, Watch Serge Course now (4×), Watch Matteos Course now, Watch Patricks Course now | Zahlen: „verified quarterly performances of +68%, +88%, and a staggering +218%", „500+ trades in just three months while keeping his drawdown under 20%", „over 500% verified performance" | 7 Blöcke: Fabio Valentini, Andrea Cimitan, Tom Vorwald, Serge Hoffmann, Lars Schmeldtenkopf, Matteo Conti, Patrick Nill |
| 4 | Final-CTA | There is no reason not to join. | It's free. No credit card. No commitment. | Zentriert-schmal |, | Register Now |, |, |
| 5 | Footer |, |, | 4 Bereiche | Logo | Register Now | Socials Instagram, Youtube | Eine Gruppe heißt hier `Socials`, auf der Startseite `SOCIALS` |

CTA-Ziel je Mentor: `https://worldclassedge.app/student-area/<kurs-slug>`
(`the-complete-order-flow`, `trading-fundamentals`, `institutional-edge`,
`global-macro-investing`, `the-institutional-approach`, `the-trader-dna-method`).
Sechs „Watch ... Course now"-Links zeigen alle auf die Kurs-Slugs in der App.
Zwei Fehler im Text: Lars Schmeldtenkopfs Button heißt `Watch Serge Course now`,
und Matteo Contis Bio bricht die Perspektive („before founding my own hedge fund"
in einer dritten Person geführten Bio).

### /manifesto

- `<title>`: `The Idea behind World Class Edge — Our Manifesto`
- Meta-Description: `A letter from Andrea Cimitan: why World Class Edge exists, and how committed traders get direct access to the best traders in the world.`
- H1: `The Idea behind World Class Edge`, H2: 1, H3: 2, Schema.org: 0
- Eyebrow: `A letter from Andrea Cimitan`

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero | The Idea behind World Class Edge |, | Zentriert-schmal |, |, | „A letter from Andrea Cimitan" |, |
| 2 | Langtext-Brief | Let's be honest: | The trading industry today is broken. | Zentriert-schmal, Fließtext |, |, | „Champions. Traders with audited track records.", „verified returns of 50%+ per year" | `data-navbar-theme="light"`, einzige Sektion der Site mit Navbar-Themenwechsel |
| 3 | Mission | Our mission is simple: | To give committed traders direct access to the best traders in the world | Zentriert-schmal |, |, |, | „Not with recycled courses or copy-trading gimmicks." |
| 4 | Signatur | Andrea Cimitan | Founder, World Class Edge |, |, |, |, |, |
| 5 | Final-CTA + Footer | There is no reason not to join. | It's free. No credit card. No commitment. | Zentriert-schmal |, | Register Now | Socials |, |

Der Text nennt „free access" und „elite, proven approach used by world champions to
achieve consistent, verified returns of 50%+ per year". Ein Tippfehler: „trading plattform".

### /course-gallery

- `<title>`: `Masterclasses — Everything about trading in one place`
- Meta-Description: `See what you can expect inside. Learn from World Champions, Market Makers, Institutional Traders, and discover the real strategies.`
- H1: `Everything about trading in one place.`, H2: 6, H3: 8, Schema.org: 0
- Eyebrow: `Masterclasses`

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero | Everything about trading in one place. | See what you can expect inside. Learn from World Champions, Market Makers, Institutional Traders, and discover the real strategies. | Zentriert-schmal |, | Register Now |, | `pt-[6rem] lg:pt-[12.5rem]` |
| 2 | Stats-Zähler | The Tools Behind Better Trading |, | 4er-Grid | 4 Karten `rounded-[0.5rem] bg-white/[0.08]`, Höhe `lg:h-[41.125rem]` | Our Award Winning Strategy | „Free Forever: Full access with no hidden costs.", „Mentors: Learn from experienced professionals." | Zähler starten bei `0`, `0+`, `$0` und animieren clientseitig hoch. Vier Zähler: Mentoren, Free Forever, Videos, Masterclasses |
| 3 | Trust-Bar Grid | New classes added every month. |, | 2 Spalten (Zigzag), weiße Sektion | 6 Icon-Karten mit JetBrains-Mono-Zählerbalken (`|||||` mit Opacity-Stufen) |, | „Learn from traders with verified track records", „Access institutional-grade market analysis tools", „Join the world's most serious trading community", „Courses from the world's most proven traders", „Watch on desktop, TV, or mobile - anytime", „Verified Trading Strategies" | `data-navbar-theme="light"`, Karten-Shadow `inset 0px 0.5rem 3.3375rem 0px rgba(0,0,0,0.04)` |
| 4 | Mentor-Grid | Learn directly from institutional traders. |, | 3er-Grid (8 Mentoren statt 9) | Portraits |, | Mentor-Titel | Hier fehlt Imre Gams, dafür ist Fredy Sarmiento dabei |
| 5 | Disziplin-Tabs | Seven disciplines. One edge. | Each mentor teaches what they've truly mastered. Tap a discipline to discover what you'll learn. | Tabs mit horizontalem Karussell | Icons | Previous discipline, Next discipline | „11 classes, 1h 36m", „13 classes, 4h 20m", „12 classes, 1h 54m", „7 classes, 1h 22m", „10 classes, 1h 47m", „32 classes, 2h 00m" | 6 Disziplinen: The order book, Foundation, Execution, The big picture, Your style, Inside the desk. Slide-Wechsel mit `transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]` und `[mask-image:linear-gradient(...)]` |
| 6 | Kurs-Karten-Grid | All Classes |, | 3er-Grid | 8 Kurs-Karten mit Level-Badge |, | Level: `beginner`, `intermediate`, `advanced` | 8 Kurse: The Complete Order Flow (Serge Hoffmann, Order Flow, advanced), Global Macro Investing (Lars Schmeldtenkopf, Macro & Investing, intermediate), The Trader DNA Method (Tom Vorwald, Psychology & Strategy, beginner), Institutional Edge (Fabio Valentini, Institutional, advanced), Prop. Trading (Patrick Nill, Prop Trading, intermediate), The Institutional Approach (Matteo Conti, Institutional, advanced), Trading Fundamentals (Andrea Cimitan, Fundamentals, beginner), DeepCharts Masterclass (Andrea Cimitan) |
| 7 | FAQ-Akkordeon | Frequently asked questions |, | Akkordeon |, |, |, | 6 Fragen, andere als auf der Startseite |
| 8 | Final-CTA | There is no reason not to join. | It's free. No credit card. No commitment. | Zentriert-schmal |, | Join Now (4×) |, | Hier `Join Now` statt `Register Now`, inkonsistent |
| 9 | Footer |, |, | 4 Bereiche | Logo | Register Now | Socials Instagram, Youtube, LinkedIn | Erste Seite mit `WEBSITE`-Gruppe und LinkedIn. Anker: Why WCE, Trailer, Our Mentors, What to expect, WCE vs Others, FAQ |

Die FAQ-Antworten sind konkreter als auf der Startseite und enthalten das Monetarisierungsmodell:
„We earn through the funded challenges and tools you can unlock later, not by charging you for
education.", „You earn points from real, verified results through IQ Capital.", „Only if you want
to earn points and climb the ranks."

### /privacy

- `<title>`: `Privacy Policy - World Class Edge`, H1: `Privacy Policy`, H2: 19, H3: 19
- Struktur: nummerierte Abschnitte 01 bis 19 im Format `01 Introduction`,
  `02 Data Collection and Use` mit Unterpunkten `2.1 Access to Third-Party Accounts`,
  `2.2 Advertising Services`, `2.3 Analytics Services`, `2.4 Applications Used`
- Tracker-Kategorien: Necessary, Functionality, Experience, Measurement, Marketing,
  jeweils mit „Trackers managed by third parties" und „Trackers managed directly by the Owner"
- Textlänge: ca. 5.185 Wörter. Kein Schema, keine Meta-Description.

### /terms-and-conditions

- `<title>`: `Terms and Conditions - World Class Edge`, H1: `Terms and Conditions`, H2: 17, H3: 0
- Abschnitte 01 Acceptance of Terms bis 17 Contact Information, unter anderem
  `03 Financial Education Disclaimer`, `07 Digital Products and Course Access`,
  `10 Limitation of Liability`, `12 Dispute Resolution`
- Textlänge: ca. 1.019 Wörter.

### /risk-disclaimer

- `<title>`: `Risk Disclaimer - World Class Edge`, H1: `Risk Disclaimer`, H2: 7, H3: 0
- Abschnitte: `01 Global Risk Disclaimer and Disclosure Statement`,
  `02 Risk Acknowledgement`, `03 No Financial Advice or Recommendations`,
  `04 Hypothetical Performance Disclaimer`, `05 User Responsibility`,
  `06 No Guarantees`, `07 Jurisdiction and Legal Compliance`
- Textlänge: ca. 624 Wörter. Kürzeste der drei Legal-Seiten.

### /thank-you (nicht verlinkt, nur als Redirect-Ziel)

- `<title>`: `Opt-In Thank-you - World Class Edge`, H1: `Congrats! You're officially part of the masterclass!`, H2: 0
- Eigner Header mit Logo statt der Haupt-Nav: `header class="relative z-10 flex h-[7.5625rem] w-full items-center justify-center border-b border-white/10 px-[2rem]"`
- Hintergrund: Video-Layer plus drei Gradients, `main class="relative flex min-h-screen flex-col overflow-clip bg-black"`
- H1-Typo: `font-news text-[4.75rem] leading-[1.06] tracking-[-0.0475rem]`, Desktop `lg:text-[7rem]`
- Zwei Buttons: `Save Your Spot` (`https://calendarlink.com/event/TGSaM`, bg `#98D8FF`)
  und `Youtube live` (`https://www.youtube.com/watch?v=6YL1feeJf80`, `bg-white/10` mit
  `ring-1 ring-inset ring-white/10 backdrop-blur-[12.5rem]`)
- Termin-Box in Weiß: `Sunday, 20 September 2026 at 20:00 CEST`, darunter Countdown
  mit den Einheiten `day`, `hours`, `minutes`, `seconds`, Startwerte `00`
- Footer reduziert auf Copyright `© World Class Edge 2026 - All rights reserved` plus
  Terms & Conditions, Privacy policy, Risk Disclaimer

## Design-System

### Fonts

Alle Fonts lokal gehostet, keine Google-Fonts- oder Adobe-Fonts-Links im HTML.
`<link rel="preload">` für Geist, Helvetica Neue und weitere.

| Familie | Rolle | Gewichte | Dateien |
|---|---|---|---|
| `geist` (Geist Variable) | Body, UI, Nav, Buttons, Sublines | variabel | `Geist_VariableFont_wght-s.p.a58a88e0.ttf` |
| `helveticaNeue` | Reserve / Alt-Stack | 100, 200, 300, 400, 500, 700, 800, 900, je normal und italic | 16 OTF/TTF-Dateien |
| `newsreader` (Newsreader Variable) | Display, alle H2 und Akzent-`em` in Kursiv | variabel (opsz, wght), normal und italic | `Newsreader_VariableFont_opsz,wght-s.p.04080db6.ttf` |
| `spacemono` | Eyebrows, Labels, „Scroll"-Hinweis | 400, 700, je normal und italic | 4 TTF-Dateien |
| `jetbrainsmono` | Eyebrow-Variante auf der Masterclasses-Seite | variabel, normal und italic | 2 TTF-Dateien |

Zuordnung: Newsreader ist die Display-Schrift für alle Headlines, Geist die Body-Schrift,
SpaceMono und JetBrainsMono sind die Label-Schriften. Das Muster „Eyebrow in Mono,
Headline in Serif, Body in Sans" zieht sich durch die ganze Site.

Der Font-Stack steht als CSS-Variablen bereit:
`--font-spacemono: "spacemono","spacemono Fallback"`, `--font-geist: "geist","geist Fallback"`,
`--font-helvetica-neue: "helveticaNeue","helveticaNeue Fallback"`,
`--font-newsreader: "newsreader","newsreader Fallback"`,
`--font-jetbrainsmono: "jetbrainsmono","jetbrainsmono Fallback"`.

### Farben

Häufigste Farbwerte im gesamten CSS (645.585 Zeichen):

| Anzahl | Wert | Rolle |
|---|---|---|
| 233 | `#0000` | Transparenz-Reset |
| 67 | `#fff` | Text auf Dunkel, Button-Flächen |
| 49 | `hsl(var(--foreground)` | Theme-Token |
| 45 | `#0000001a` | Schatten |
| 39 | `#000` | Hintergrund |
| 38 | `#012234` | Dunkelblau, nur CSS-Token, nicht auf Marketing-Seiten im HTML |
| 35 | `#ffffff1a` | Hairline-Borders |
| 30 | `#71A961` | Grün, nur CSS-Token, nicht im HTML der 8 Seiten |
| 26 | `rgb(255 255 255/var(--tw-text-opacity)` | Text |
| 26 | `#153444` | Dunkelblau, nur CSS-Token |
| 20 | `#D9F9B9` | Hellgrün, nur CSS-Token |
| 19 | `#f5f5f5` | heller Hintergrund |
| 18 | `#202223` | Text dunkel |
| 17 | `#ffffff0d` | Flächen |
| 16 | `#B5FFA0` | Grün, nur CSS-Token |

Tatsächlich im HTML der Marketing-Seiten verwendete Farben (Startseite):

| Anzahl | Wert | Verwendung |
|---|---|---|
| 68 | `#b8d2e2` | Eyebrow-Text und Label-Akzente (kühles Hellblau) |
| 56 | `#98d8ff` | Button-Fläche, Icon-Box, Akzent (helles Cyan-Blau) |
| 14 | `#0a0a0a` | Near-Black |
| 11 | `#6abef2` | Sekundär-Akzent |
| 10 | `#161616` | Icon-Stroke |
| 9 | `#ff6464` | Rot für Negativ-Icons im Vergleich (X-Symbol) |
| 9 | `#bfe7ff` | Akzent-Aufhellung |
| 8 | `#000000` | Schwarz |
| 4 | `#0c1e29` | Gradient-Start Coming-Soon-Karten |
| 4 | `#314c5e` | Gradient-Ende Coming-Soon-Karten |
| 3 | `#cfcfd0` | Logo-Grau |
| 2 | `#a9e4f6` | „Scroll"-Hinweis |

Farbstrategie: Schwarz als Grundfläche, Weiß als Kontrastfläche für zwei Sektionen,
`#98D8FF` als einziger Button-Akzent, `#b8d2e2` als Label-Akzent, `#ff6464` als
Negativ-Marker im Vergleich. Die Masterclasses-Seite nutzt auf demselben Akzent
zusätzlich `#98D5F9` (144×) und `#6B9EBD` (144×).

Akzent auf Buttons: `bg-[#98D8FF]`. Hintergrund: `#000` (dunkle Sektionen) und
`#fff` (zwei helle Sektionen auf der Startseite, eine auf der Masterclasses-Seite).
Text: `#fff` auf Dunkel, `#000` auf Hell, Sekundärtext über `text-white/60` und
`text-white/70`.

**Achtung:** `#71A961`, `#D9F9B9`, `#B5FFA0`, `#012234`, `#153444` sind im CSS definiert,
kommen aber im HTML der analysierten Seiten 0-mal vor. Sie stammen vermutlich aus einem
anderen Produktteil (App/Plattform) und gehören nicht zum Marketing-Design.

### Custom Properties

Die 297 eindeutigen CSS-Variablen sind fast vollständig Tailwind-Interna und
Vidstack-Player-Variablen. Die gestalterisch relevanten:

```
--video-border-radius: .5rem
--progress: 0
--font-spacemono: "spacemono","spacemono Fallback"
--font-geist: "geist","geist Fallback"
--font-helvetica-neue: "helveticaNeue","helveticaNeue Fallback"
--font-newsreader: "newsreader","newsreader Fallback"
--font-jetbrainsmono: "jetbrainsmono","jetbrainsmono Fallback"
--size: max(18%,40px)
--cta-bg-rest: calc(100% - var(--cta-icon-size,6.5rem) - .5rem)
```

Es gibt kein Token-System für Farben oder Abstände. Alle Werte stehen direkt als
Tailwind-Arbitrary-Values im Markup.

### Root-Skalierung (wichtigstes Layout-Fundament)

```css
:root{font-size:.363636vw}
@media (width<=1920px){:root{font-size:.364583vw}}
@media (width<=992px){:root{font-size:50%}}
@media (width<=639px){:root{font-size:1.83908vw}}
```

Die gesamte Typografie skaliert mit der Viewport-Breite. Alle Größen sind in `rem`
geschrieben und wachsen proportional zur Fensterbreite. Bei 1920 px entspricht
`1rem` rund 7 px. Deshalb sehen Werte wie `text-[6rem]` klein aus, sind aber
rechnerisch große Headlines. Das erklärt auch, warum so viele Nachkommastellen
in den Klassen stehen.

### Radius

Häufigste `border-radius`-Werte im CSS:

| Anzahl | Wert | Verwendung |
|---|---|---|
| 12 | `1rem` | Karten, Mockup-Rahmen |
| 8 | `9999px` | Pill, Buttons, Icon-Kreise |
| 9 | `.5rem` | Video, kleine Karten |
| 6 | `1.25rem` | Buttons, CTA-Wrapper |
| 6 | `1.5rem` | FAQ-Zeilen, Portraits |
| 6 | `.75rem` | kleine Elemente |
| 6 | `2rem` | Vergleichstabelle |
| 5 | `.375rem` | klein |
| 4 | `2px`, `.25rem`, `1.75rem`, `4rem` | vereinzelt |
| 2 | `23.6875rem` | Sonderfall |

Buttons sind pill oder leicht gerundet: `rounded-[1.25rem]` beim CTA,
`rounded-full` bei Nav-Pills und Icon-Kreisen. Karten liegen bei `0.5rem` bis `1.5rem`.

### Shadows

Das CSS enthält fast nur Tailwind-Ring-Kompositionen. Die eigenständigen Werte:

| Wert | Verwendung |
|---|---|
| `0 0.5rem 2.5rem rgba(0,0,0,0.24)` | Nav-Leiste |
| `0 0.5rem 1.25rem rgba(0,0,0,0.24)` | Sticky-Innenheader im Plattform-Mockup |
| `inset 0px 0.5rem 3.3375rem 0px rgba(0,0,0,0.04)` | Trust-Karten (Masterclasses) |
| `0 0 3rem #118f6a66, 0 1rem #118f6a66` | nicht auf Marketing-Seiten genutzt |
| `0 .375rem 2.375rem 0 #1ecc9780` | nicht auf Marketing-Seiten genutzt |

Schatten sind sparsam und zurückhaltend. Tiefe entsteht hauptsächlich über
`backdrop-filter` (154 Vorkommen im CSS) und Opacity-Schichten.

### Spacing und Container

Häufigste Container-Breiten (aus `w-[min(...)]`):

| Anzahl | Breite |
|---|---|
| 20 | `min(48.75rem,100%)` (Mentor-Portraits) |
| 10 | `min(150rem,100%)` (Haupt-Container) |
| 2 | `min(135.25rem,100%)` (Vergleich) |
| 2 | `min(38.125rem,100%)` |
| 1 | `min(149.75rem,100%)` (Footer) |
| 1 | `min(88.5rem,100%)` (FAQ) |
| 1 | `min(87rem,100%)`, `min(67.625rem,100%)`, `min(47rem,100%)`, `min(44.25rem,100%)` |

Sektions-Padding (Häufigkeit aus dem Startseiten-HTML):

| Anzahl | Klasse | Bedeutung |
|---|---|---|
| 3 | `pb-[20rem]` | größter Sektionsabschluss |
| 3 | `pb-[8rem]` | mittlerer Abschluss |
| 2 | `py-[15rem]` | große Sektion oben und unten |
| 2 | `pb-[17.5rem]` | Standard unten Desktop |
| 1 | `pt-[14rem]` | Hero-Abstand mobil |
| 1 | `pt-[7rem]` / `pb-[12rem]` | helle Plattform-Sektion |
|, | `pt-[9rem] pb-[9rem] lg:pt-[15rem] lg:pb-[20rem]` | Vergleich und Final-CTA |

Horizontales Padding der Sektionen: `px-[2rem]`, im Desktop oft `lg:px-0`, weil der
Container selbst die Breite begrenzt.

### Typo-Skala

Keine `clamp()`-Skala. Nur 2 `clamp()`-Vorkommen im gesamten CSS, beide
`clamp(1.6rem,4vw,3rem)`, also nicht für Headlines. Die Skala entsteht aus festen
`rem`-Werten plus der vw-basierten Root-Größe.

| Rolle | Mobil | Desktop | Weitere Werte |
|---|---|---|---|
| H1 Hero | `text-[5.5rem]`, `tracking-[-0.11rem]` | `text-[7.5rem]`, `tracking-[-0.15rem]` | `leading-[1.1]` |
| H1 Unterseite | `text-[4.75rem]` | `text-[7rem]` | Thank-you: `leading-[1.06]` mobil |
| H2 Sektion | `text-[4.5rem]`, `tracking-[-0.15rem]` | `text-[6rem]`, `tracking-[-0.25rem]` | `leading-[1.1]` |
| H2 Helles Panel | `text-[3.6rem]` | `text-[6rem]` | `text-black/90` |
| H3 Karte | `text-[2rem]` bis `text-[2.5rem]` | `text-[2.75rem]` | `leading-[1.31]` |
| Stats-Zahl | `text-[6rem]`, `tracking-[-0.16rem]` | `text-[8rem]` | `leading-[1.1]` |
| Body / Subline | `text-[2.25rem]`, `tracking-[0.045rem]` | `text-[2.25rem]`, `leading-[1.5]` | `text-white/60` bis `text-white/70` |
| Nav-Link | `text-[1.75rem]`, `tracking-[-0.0875rem]` | dito | `leading-[3rem]` |
| Eyebrow | `text-[1.5rem]` bis `text-[1.75rem]`, `tracking-[0.025rem]` | dito | uppercase, Space Mono |
| FAQ-Frage | `text-[2.25rem]`, `tracking-[-0.09rem]` | dito | `leading-[1.5]` |

Line-Heights: Headlines `1.1`, Body `1.5`, H3-Karten `1.31`, Thank-you-H1 `1.06`.
Letter-Spacing bei Headlines negativ (`-0.11rem` bis `-0.25rem`), bei Eyebrows positiv
(`+0.025rem`, bei der Terminzeile `+0.12rem`).

Body-Text nutzt `.richtext` mit `max-width:65ch` als Basis, wird aber über
Utility-Klassen auf konkrete Breiten überschrieben.

### Bilder

86 `<img>`-Tags auf der Startseite.

| Merkmal | Wert |
|---|---|
| Formate | 47× `.jpg`, 27× `.png`, 12× `.svg` |
| WebP / AVIF | 0 |
| `loading="lazy"` | 84 von 86 |
| `srcset` | 0 |
| `fetchpriority` | 0 |
| Bild-CDN | `cdn.sanity.io` (77 Referenzen) |
| Video-CDN | `image.mux.com` (2 Referenzen) |

Next.js Image wird genutzt (`data-nimg="fill"`, `data-nimg="1"`) mit automatisch
generierten Blur-Placeholders als Inline-SVG. Optimierung läuft über den
Next.js-Image-Optimizer (`?w=1920&q=75`), nicht über moderne Formate im Markup.
Kein `srcset`, keine `fetchpriority`-Auszeichnung für das Hero-Bild.

### Tech-Stack

| Komponente | Beleg |
|---|---|
| Next.js App Router | `/_next/static/`, `__next_f`, `self.__next_f.push`, RSC-Payload |
| Turbopack | `/chunks/turbopack-f2b05fdef18da59b.js` |
| Vercel | `?dpl=dpl_A57U7PUj8kBruJNtvSiwUdRE1ruP` an allen Asset-URLs |
| React | RSC-Flight-Data, `$L`-Referenzen |
| Tailwind CSS v3 | Arbitrary-Values überall, `--tw-`-Variablen |
| Sanity CMS | `cdn.sanity.io/images/jyrt8op7/production/...`, `_type: "block"`, `_key`, `markDefs` |
| Radix UI | `@keyframes accordion-up`, `accordion-down`, `--radix-accordion-content-height`, `id="radix-_R_1c9brd5tgjb_"` |
| vidstack | 9 `vds-`-Keyframes, 113 `vds-`-Klassenselektoren, 229 `--media-*`-Variablen |
| Lenis Smooth Scroll | `data-lenis-prevent="true"` (4× auf der Startseite) |
| GTM | `https://www.googletagmanager.com/gtm.js?id=GTM-54BZTKCB` |
| PostHog | `CSPostHogProvider` in der Flight-Data |
| Zapier | `https://hooks.zapier.com/hooks/catch/10370650/4hp0wki/` |
| HubSpot | `portalId: "146426345"`, `formId` (ungenutzte Zweitkonfiguration) |
| Calendarlink | `https://calendarlink.com/event/TGSaM` |

Kein Consent-Management-Tool im HTML. Der Footer-Link `Cookie Settings` zeigt auf `#`.

## Animationen

### Motion-Libraries

Keine externen Animationsbibliotheken gefunden. Kein GSAP, kein ScrollTrigger, kein
Framer Motion, kein AOS, kein Swiper, kein Splide, kein Lottie, kein Three.js.
Suche in 176.540 Zeichen Inline-JavaScript und allen 5 CSS-Dateien ergab 0 Treffer
für `gsap`, `ScrollTrigger`, `framer`, `motion`, `aos`, `swiper`, `splide`, `lottie`,
`rive`, `three`, `emotion`.

Einzige Fremd-Library mit Motion-Anteil: Lenis für Smooth Scroll und vidstack für
den Player. Alles andere ist handgeschriebenes CSS plus React-State.

### Scroll-Reveal-Muster

Das Muster ist einheitlich und im Server-HTML sichtbar:

```html
<div style="opacity:0;transform:translateY(24px)">
```

45 Elemente auf der Startseite tragen genau diesen Inline-Style, keinen anderen
Wert. Es gibt genau ein Reveal-Muster, keinen Stagger, keine Varianten, keine
`aos`- oder `reveal`-Klassen. Das Element wird clientseitig auf `opacity:1` und
`translateY(0)` gesetzt. Weitere Vorkommen: Masterclasses-Seite und Thank-you-Seite
nutzen dasselbe Muster.

### Transitions (wörtlich aus dem CSS)

Häufigste `cubic-bezier`-Werte im gesamten CSS:

| Anzahl | Wert |
|---|---|
| 44 | `cubic-bezier(.4,0,.2,1)` |
| 10 | `cubic-bezier(0,0,.2,1)` |
| 5 | `cubic-bezier(.4,0,1,1)` |
| 2 | `cubic-bezier(.65,0,.35,1)` |

Häufigste `transition:`-Deklarationen:

```
all .3s ease-in-out
transform .2s ease-out
opacity .3s
opacity .2s ease-out
max-width .14s ease-in
opacity .15s ease-out,visibility .15s ease-out
opacity .15s ease-in,visibility .15s ease-in
transform .1s linear
all .1s ease-out
all .3s ease-out .1s
transform .3s ease-out
all .2s ease-out
all 1.2s
```

`transition-duration`-Werte nach Häufigkeit: `.15s` (32×), `.3s` (10×), `.2s` (3×),
`.1s` (2×), `1s` (2×), `.5s` (2×).

Im Markup dominieren zwei Muster: `transition-all duration-300` für Button-Text
und `transition-[opacity,color] duration-200` für Nav-Links.

### @keyframes

45 Deklarationen mit 31 eindeutigen Namen. 9 Namen sind vidstack-Player
(`vds-audio-track-progress`, `vds-bezel-fade`, `vds-buffering-spin`, `vds-marquee`,
`vds-menu-enter`, `vds-menu-exit`, `vds-slider-icon`, `vds-tooltip-enter`,
`vds-tooltip-exit`). 22 Namen sind site-eigen:

| Name | Wirkung |
|---|---|
| `trustScroll` | `translate(0)` nach `translate(-99.5rem)`, 12s linear infinite |
| `weeklyScroll` | `translate(0)` nach `translate(calc(-50% - 1.25rem))`, 30s linear infinite |
| `coachesScroll` | `translate(0)` nach `translate(calc(-50% - 1rem))`, 15s linear infinite |
| `scrollLeft` | `translate(0)` nach `translate(-50%)`, 20s linear infinite |
| `scrollRight` | `translate(-50%)` nach `translate(0)`, 20s linear infinite |
| `scrollUp` | `translateY(0%)` nach `translateY(-50%)` |
| `scrollDown` | `translateY(-50%)` nach `translateY(0%)` |
| `marquee-up` | `translateY(0)` nach `translateY(-50%)`, 60s linear infinite |
| `marquee-down` | `translateY(-50%)` nach `translateY(0)`, 60s linear infinite |
| `chip-bar` | Breite 1.5rem, 33.33% auf .75rem, 66.66% auf .375rem, 2s `cubic-bezier(.4,0,.2,1)` infinite |
| `chipBar1` / `chipBar2` / `chipBar3` | Varianten mit vertauschten Phasen |
| `progressFill` | `width:0%` nach `width:100%`, 5s linear forwards |
| `ping` | 75% auf `opacity:0; transform:scale(2)`, 1s `cubic-bezier(0,0,.2,1)` infinite |
| `rank-drift` | `translate(-drift, drift*0.6) scale(1)` nach `translate(drift, -drift*0.6) scale(1.015)` bei 50%, 16s ease-in-out infinite |
| `rank-sweep` | `translate(-180%) rotate(18deg)` nach `translate(180%) rotate(18deg)`, 1.15s ease-in-out forwards |
| `spin` | `rotate(360deg)`, 1s linear infinite und 25s linear infinite |
| `enter` / `exit` | Tailwind-Animation für Dialoge, über `--tw-enter-*`-Variablen gesteuert |
| `accordion-up` / `accordion-down` | `height` zwischen 0 und `var(--radix-accordion-content-height)`, .2s ease-out |

Die Marquee-Keyframes (`trustScroll`, `weeklyScroll`, `coachesScroll`) sind im CSS
definiert, ihre Klassen kommen im Server-HTML der 8 Seiten aber 0-mal vor. Sie werden
vermutlich erst clientseitig nachgeladen.

Die Scroll-Utilities sind als Klassen vorhanden:

```css
.trustScroll-animation{animation:12s linear infinite trustScroll}
.weeklyScroll-animation{animation:30s linear infinite weeklyScroll}
.coachesScroll-animation{animation:15s linear infinite coachesScroll}
.infinite-scroll-left{animation:20s linear infinite scrollLeft}
.infinite-scroll-right{animation:20s linear infinite scrollRight}
```

### Hover-Effekte auf Buttons (wörtlich aus dem CSS)

Der CTA hat drei gleichzeitige Effekte:

```css
.cta-wrapper .cta-bg{width:100%;transition:width .5s cubic-bezier(.65,0,.35,1),background-color .3s}
.cta-wrapper.has-icon{--cta-bg-rest:calc(100% - var(--cta-icon-size,6.5rem) - .5rem)}
.cta-wrapper.has-icon .cta-bg{width:var(--cta-bg-rest)}
.cta-wrapper.has-icon:hover .cta-bg{width:100%}
.cta-wrapper .button-icon{transition:transform .5s cubic-bezier(.65,0,.35,1)}
.cta-wrapper:hover .button-icon{transform:rotate(0)}
.button-text-hover,.button-icon-hover{opacity:0;transition-property:all;transition-duration:.3s;
  transition-timing-function:cubic-bezier(.4,0,.2,1);position:absolute}
.cta-wrapper:hover .button-text-hover{--tw-translate-y:-3rem;transform:translate(...);opacity:1}
.cta-wrapper:hover .button-text-initial{--tw-translate-y:-3rem;transform:translate(...);opacity:0}
```

Im Markup stehen zwei identische Textkopien übereinander: die sichtbare
`button-text-initial` und die versteckte `button-text-hover` bei `top-[3rem]`.
Beim Hover wandern beide um `-3rem` nach oben, die zweite wird sichtbar.
Zusätzlich wächst die Hintergrundfläche von `calc(100% - 6.5rem - .5rem)` auf `100%`,
und das Pfeil-Icon dreht von `rotate-[-45deg]` auf `rotate(0)`.
Das passiert in 0.5s mit `cubic-bezier(.65,0,.35,1)`, einem symmetrischen
In-Out-Easing, das den Effekt weich anlaufen und auslaufen lässt.

Nav-Links: `transition-[opacity,color] duration-200`, `opacity-60` auf `hover:opacity-100`.
Login-Button: `hover:bg-white/10`. Register-Button: `bg-white text-black hover:bg-white/90`
mit `text-shadow:0 0.125rem 0.125rem rgba(255,255,255,0.23)`.
Karten-Buttons: `hover:opacity-70`.

### Zähler-Animation

Auf der Masterclasses-Seite vier Stats-Karten. Im Server-HTML steht als Wert nur `0`:

```html
<p class="m-0 font-news text-[6rem] leading-[1.1] tracking-[-0.16rem] text-white lg:text-[8rem]">
  <span class="">0</span>
</p>
```

Die Werte `0`, `$0` und `0+` werden clientseitig hochgezählt. Die Ziele stehen im
Flight-Data, nicht im DOM. Belegbar ist nur: Startwert 0, Zielwert clientseitig.

### Weitere Bewegung

- **Parallax/Sticky:** Der Plattform-Mockup hat einen `sticky top-0 z-20`-Innenheader
  in einem scrollbaren Container.
- **Marquee:** `animate-marquee-down` und `animate-marquee-up` mit 60s linear infinite,
  im Server-HTML 0-mal verwendet.
- **Karussells:** 2 Karussells auf der Startseite mit 16 Slides, 1 auf der Mentors-Seite
  mit 20 Slides. `cursor-grab` (8×), `cursor-grabbing` (4×), `select-none` (14×).
  Kein `aria-live`, aber vollständige ARIA-Rollen
  (`aria-roledescription="carousel"`, `"slide"`, `role="group"`).
- **Tabs:** Disziplin-Wechsel mit `transition-transform duration-500
  ease-[cubic-bezier(0.65,0,0.35,1)]` und `will-change-transform`.
- **Ticker-Leiste:** `animate-chip-bar` 2s infinite, plus die drei `chipBar`-Varianten.
- **Video-Autoplay:** Zwei `<video autoPlay muted playsInline>` auf der Startseite,
  eins davon mit `loop`, eins mit Mux-Poster. Kein `controls`, kein Pause-Button.
- **Scroll-Hinweis:** „Scroll"-Label mit
  `linear-gradient(90deg, rgba(169,228,246,0.3) 0%, rgba(169,228,246,0.9) 50%, rgba(169,228,246,0.3) 100%)`
  und `background-size:200% 100%` für einen wandernden Glanz.

### Reduced Motion

11 Vorkommen von `prefers-reduced-motion` im CSS. Die site-eigenen Regeln:

```css
@media (prefers-reduced-motion:reduce){
  .motion-reduce\:hidden{display:none}
  .motion-reduce\:animate-none{animation:none}
  .motion-reduce\:transition-none{transition-property:none}
}
@media (prefers-reduced-motion:reduce){.animate-rank-sweep,.animate-rank-drift{animation:none!important}}
```

Dazu kommen neun vidstack-eigene Blöcke, die Player-Animationen abschalten.
Nicht abgedeckt: die Scroll-Reveals, die CTA-Hover-Transforms, die Marquee-Keyframes
und die Karussell-Transitions haben keinen Reduced-Motion-Zweig. Die
`motion-reduce:`-Utilities sind vorhanden, aber im HTML der Marketing-Seiten
nicht gesetzt.

## Synthese

### Seitentyp-Blueprints

**Startseite** (11 Sektionen, 13 Blöcke mit Footer)

1. Nav: Full-bleed, Logo links, 6 Anker-Links mittig, Login plus Register rechts. Kein sticky, keine Telefonnummer.
2. Hero: Full-bleed, `lg:h-[96svh]`, Mux-Video-Autoplay als Hintergrund, Eyebrow in Space Mono, H1 in Newsreader mit kursivem `em`, Subline `text-white/60` bis `/70`, ein Primär-CTA.
3. Trailer: Zentriert-schmal, weiße Sektion, Eyebrow plus zweizeilige Headline.
4. Mentor-Grid: 3er-Grid Desktop, Karussell Mobil, 9 Portraits mit `aspect-[390/480]`, Name plus Titel.
5. Benefits-Tabs: Full-bleed weiße Sektion, 3 nummerierte Stufen 01/02/03, je Headline, Fließtext, 3 Bulletpoints, CTA.
6. Kurs-Karussell: Full-bleed dunkel, `py-[15rem]`, 6 Karten mit Thumbnail, Autor, Beschreibung, Videoanzahl, Laufzeit.
7. Lesson-Liste: Nummerierte Zeilen mit Einzeldauer, 11 Einträge.
8. Coming-Soon-Karussell: Full-bleed, 16 Slides mit Gradient-Karten.
9. Produkt-Mockup: Weiße Sektion, 5 gestapelte Rechtecke als Browser-Chrome, darin scrollbares App-Mockup mit Sticky-Header.
10. Vergleich: 2 Spalten, links 9 Negative mit `#ff6464`-X, rechts 9 Positive, je `rounded-[2rem] bg-[#141414]`.
11. FAQ-Akkordeon plus Final-CTA plus Footer.

**Leistungs-/Produktseite (`/course-gallery`, 7 Sektionen plus Footer)**

1. Hero zentriert-schmal mit Eyebrow und CTA.
2. Stats-Zähler als 4er-Grid, helle Karten, Zahlen animiert.
3. Trust-Bar als weiße Sektion, 2 Spalten, 6 Icon-Karten mit Mono-Zählerbalken.
4. Mentor-Grid 3er, kompakte Variante.
5. Disziplin-Tabs mit horizontalem Karussell, 6 Reiter, je Klassen-Zahl und Laufzeit.
6. Kurs-Grid 3er mit Level-Badges, 8 Karten.
7. FAQ-Akkordeon, Final-CTA, Footer mit `WEBSITE`- und `SOCIALS`-Gruppe.

**Über-uns / Manifesto (5 Blöcke)**

1. Hero zentriert mit Eyebrow „A letter from …".
2. Brief in Fließtext, `max-width:65ch`, mit Zwischenüberschriften als H3.
3. Mission-Absatz.
4. Signatur mit Rolle.
5. Final-CTA plus Footer.

`data-navbar-theme="light"` schaltet die Nav auf dieser Seite auf die helle Variante.

**Mentor-Übersicht (`/mentors`)**

1. Hero mit Frage-Headline und Scroll-Hinweis.
2. Grid der Kurzprofile.
3. Detail-Blöcke je Mentor als Tabs, je mit Zitat, Zahlen, Kurs-Link.
4. Final-CTA plus Footer.

**Funnel** (Popup plus `/thank-you`)

1. Auslöser: „Join Waitlist"-CTA, `"action":"popup"`.
2. Popup: H1 „Join our waitlist!", ein Absatz, zwei Pflichtfelder, Submit `Join now`.
3. Redirect auf `/thank-you`.
4. Danke-Seite: eigener Header, Video-Hintergrund, H1, Termin-Box mit Datum, Countdown, zwei Buttons (Termin speichern, YouTube Live).

**Ratgeber:** existiert nicht.

### Die 5 stärksten Muster

**1. Eyebrow aus vier Mono-Strichen mit gestaffelter Opacity.**
Das häufigste visuelle Motiv. Wörtlich aus dem Hero:

```html
<p class="m-0 uppercase font-spacemono text-[1.75rem] text-[#b8d2e2]">
  <span class="text-[#b8d2e2]/20">|</span><span class="text-[#b8d2e2]/40">|</span>
  <span class="text-[#b8d2e2]/60">|</span><span> World Class Edge presents</span></p>
```

Der Strich links blendet von 20% auf 80% auf, rechts spiegelt von 60% auf 20%.
Der Text bleibt bei 100%. Es sind vier Striche links und vier rechts, mit
`text-[#b8d2e2]`. Dieses Muster trägt jede Sektion: `WHY WCE`, `Teaser`, `OUR MENTORS`,
`WHAT TO EXPECT`, `ALL AVAILABLE COURSES`, `New traders`, `our platform`,
`World Class Edge vs others`, `FAQ`, `Masterclasses`, `Our mentors`, `Your trading edge`,
`We found the best of the best`, `7 mentors only for you`, `A letter from Andrea Cimitan`.
Es löst das Sektionslabel-Problem ohne Icon und ohne Trennlinie.

**2. CTA mit drei gekoppelten Hover-Mechaniken.**
Wörtlich aus dem CSS:

```css
.cta-wrapper.has-icon{--cta-bg-rest:calc(100% - var(--cta-icon-size,6.5rem) - .5rem)}
.cta-wrapper.has-icon .cta-bg{width:var(--cta-bg-rest)}
.cta-wrapper.has-icon:hover .cta-bg{width:100%}
.cta-wrapper .cta-bg{width:100%;transition:width .5s cubic-bezier(.65,0,.35,1),background-color .3s}
.cta-wrapper .button-icon{transition:transform .5s cubic-bezier(.65,0,.35,1)}
.cta-wrapper:hover .button-icon{transform:rotate(0)}
.cta-wrapper:hover .button-text-initial{--tw-translate-y:-3rem;opacity:0}
.cta-wrapper:hover .button-text-hover{--tw-translate-y:-3rem;opacity:1}
```

Ein Hover löst drei Dinge gleichzeitig aus: die Akzentfläche wächst um die
Icon-Breite, der Pfeil dreht von `rotate-[-45deg]` auf `rotate(0)`, und der
Button-Text tauscht über zwei übereinanderliegende Kopien mit `top-[3rem]`-Versatz.
Dauer überall `0.5s` mit `cubic-bezier(.65,0,.35,1)`, Textwechsel separat `0.3s`
mit `cubic-bezier(.4,0,.2,1)`. Der Button fühlt sich dadurch mechanisch an, ohne
dass ein einziges Bild nötig wäre.

**3. Vergleichstabelle als Schuld-und-Gegenüberstellung mit Icon-Semantik.**
Wörtlich aus dem HTML:

```html
<span class="flex items-center rounded-full bg-white/[0.06] p-[0.875rem] w-[4rem] h-[4rem] shrink-0">
  <svg viewBox="0 0 24 24" fill="none" class="h-[2.25rem] w-[2.25rem]" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" stroke="#FF6464" stroke-width="2" stroke-linecap="round"></path>
  </svg></span>
<span class="font-geist text-[2.25rem] tracking-[0.0225rem] text-white/[0.86]">€3,000–9,000 per course</span>
```

Zwei Container nebeneinander, links „Other Platforms" mit roten X-Icons, rechts
„World Class Edge" mit Haken. Beide `rounded-[2rem] bg-[#141414] p-[4rem]`,
Höhe `lg:h-[100rem]`, 9 Zeilen gegenübergestellt. Jede Zeile ist ein konkreter,
prüfbarer Satz (Preis, Zeitraum, Nachweis), kein Adjektiv. Das ist die stärkste
Conversion-Sektion der Seite, weil sie den Preisnachteil in einen Vorteil dreht.

**4. Font-Trio: Mono-Eyebrow, Serif-Headline, Sans-Body.**
Wörtlich aus dem Hero-Markup:

```html
<div class="richtext richtext-start prose-em:font-news prose-em:italic
  prose-headings:font-news prose-headings:leading-[1.1]
  prose-headings:tracking-[-0.11rem] prose-headings:text-white
  prose-headings:text-[5.5rem] lg:prose-headings:tracking-[-0.15rem]
  lg:prose-headings:text-[7.5rem]">
  <h1 class="">Learn from <br/><em class="pr-[.125em]">World</em> Class Traders</h1>
</div>
```

Newsreader kursiv trägt einzelne Wörter in der Headline, Geist trägt die Subline
(`prose-p:font-geist prose-p:text-[2.25rem]`), Space Mono trägt das Label. Der
Wechsel Serif zu Sans innerhalb einer Sektion erzeugt Hierarchie ohne Größenwechsel.
Das `pr-[.125em]` am `em` ist ein Kursiv-Rand, damit der Serif-Kursivschnitt nicht
am nächsten Wort klebt.

**5. vw-basierte Root-Schriftgröße statt Media-Query-Stufen.**
Wörtlich das gesamte Inline-Style der Seite:

```css
:root{font-size:.363636vw}
@media (width<=1920px){:root{font-size:.364583vw}}
@media (width<=992px){:root{font-size:50%}}
@media (width<=639px){:root{font-size:1.83908vw}}
```

Alle Größen stehen in `rem` und skalieren mit dem Viewport. Zwischen 992 px und
1920 px wächst die komplette Seite proportional, ohne Umbruch. Nur drei echte
Breakpoints. Das ist der Grund für die vielen Nachkommastellen und die
`lg:`-Varianten: unter 992 px springt die Root-Größe auf 50%, also werden die
`lg:`-Werte benötigt, um die Desktop-Größen wiederherzustellen.

### Animation-Rezepte

Alle Werte sind wörtlich aus dem CSS der Seite.

**Rezept 1: Scroll-Reveal, ein Muster für alles**

```css
.reveal { opacity: 0; transform: translateY(24px); transition: opacity .6s cubic-bezier(.4,0,.2,1), transform .6s cubic-bezier(.4,0,.2,1); }
.reveal.is-visible { opacity: 1; transform: translateY(0); }
```

Belegbar ist nur der Startzustand, wörtlich `style="opacity:0;transform:translateY(24px)"`
auf 45 Elementen der Startseite. Die Zielwerte und die Dauer stehen in clientseitigem
JavaScript, das im Server-HTML nicht vorliegt. **Dauer und Easing sind damit nicht
belegbar.** Belegbar ist: es gibt genau ein Muster, es gibt keinen Stagger, und die
Verschiebung beträgt exakt `24px` in `translateY`.

**Rezept 2: CTA-Hover mit Flächenwachstum und Icon-Rotation**

```css
.cta-wrapper .cta-bg {
  width: 100%;
  transition: width .5s cubic-bezier(.65, 0, .35, 1), background-color .3s;
}
.cta-wrapper.has-icon { --cta-bg-rest: calc(100% - var(--cta-icon-size, 6.5rem) - .5rem); }
.cta-wrapper.has-icon .cta-bg { width: var(--cta-bg-rest); }
.cta-wrapper.has-icon:hover .cta-bg { width: 100%; }
.cta-wrapper .button-icon { transition: transform .5s cubic-bezier(.65, 0, .35, 1); }
.cta-wrapper:hover .button-icon { transform: rotate(0); }
```

Startzustand des Icons im Markup: `class="button-icon rotate-[-45deg]"`.
Trigger ist `:hover` auf dem Wrapper, kein JS nötig.

**Rezept 3: Zwei-Kopien-Textwechsel im Button**

```css
.button-text-initial, .button-text-hover {
  transition-property: all; transition-duration: .3s;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
}
.button-text-hover { opacity: 0; position: absolute; }
.cta-wrapper:hover .button-text-initial { --tw-translate-y: -3rem; opacity: 0; }
.cta-wrapper:hover .button-text-hover   { --tw-translate-y: -3rem; opacity: 1; }
```

Markup: der Hover-Text sitzt bei `top-[3rem]`, der Initial-Text bei 0. Beide
wandern um `-3rem`, sodass der zweite von unten in die Position des ersten fährt.

**Rezept 4: Marquee, horizontal endlos**

```css
@keyframes scrollLeft { 0% { transform: translate(0); } to { transform: translate(-50%); } }
.infinite-scroll-left { animation: 20s linear infinite scrollLeft; }
@keyframes trustScroll { 0% { transform: translate(0); } to { transform: translate(-99.5rem); } }
.trustScroll-animation { animation: 12s linear infinite trustScroll; }
```

Der Inhalt muss doppelt im DOM liegen, damit die `-50%`-Bewegung nahtlos greift.
Dieses Muster ist auf den 8 Seiten nicht instanziiert, nur definiert.

**Rezept 5: Tab-Indikator als Ticker**

```css
@keyframes chip-bar { 0%, to { width: 1.5rem } 33.33% { width: .75rem } 66.66% { width: .375rem } }
.animate-chip-bar { animation: 2s cubic-bezier(.4, 0, .2, 1) infinite chip-bar; }
```

Drei Striche mit unterschiedlichen Breiten wechseln im 2-Sekunden-Takt. Das ist
der Lade- bzw. Aktiv-Indikator. Die Varianten `chipBar1`, `chipBar2`, `chipBar3`
vertauschen die Phasen für die drei Positionen.

**Rezept 6: Akkordeon über CSS-Grid statt Höhenanimation**

```css
@keyframes accordion-down { 0% { height: 0 } to { height: var(--radix-accordion-content-height) } }
@keyframes accordion-up   { 0% { height: var(--radix-accordion-content-height) } to { height: 0 } }
```

Der Inhalt nutzt zusätzlich `class="grid transition-all duration-200 mt-[1.5rem] grid-rows-[1fr] opacity-50"`
für den offenen Zustand, die geschlossene Variante hat `grid-rows-[0fr]`.
Die Variablen kommen von Radix. `0.2s ease-out` für beide Richtungen.

### Anti-Patterns und Schwächen

1. **Canonical-Tag ist auf allen 4 geprüften Seiten defekt.**
   Startseite: `href="https://https://worldclassedge.com//"`, Mentors:
   `href="https://https://worldclassedge.com//mentors"`. Doppeltes Protokoll und
   doppelter Slash. Ein Canonical, der auf eine ungültige URL zeigt, ist schlimmer
   als kein Canonical.
2. **Kein einziges Schema.org auf 8 Seiten.** 0 `application/ld+json`. Für eine
   Seite, deren Kern ein FAQ-Akkordeon, 9 Mentoren mit Titeln, 8 Kurse mit Dauer
   und ein Preisversprechen sind, liegen `FAQPage`, `Course`, `Person` und
   `Organization` ungenutzt. Kein Rich-Result, keine Wissenspanel-Chance.
3. **Keine Sitemap.** `/sitemap.xml` liefert 404. Die Seite hat 8 Routen und keine
   Sitemap. `robots.txt` verweist auf keine.
4. **Meta-Description fehlt auf 6 von 8 Seiten.** Vorhanden nur auf `/manifesto`
   und `/course-gallery`.
5. **`<html lang="de">` bei rein englischem Inhalt.** Falsche Sprachauszeichnung,
   schadet Screenreadern und Suche.
6. **Reduced-Motion deckt die eigenen Animationen nicht ab.** 11
   `prefers-reduced-motion`-Blöcke, aber alle site-eigenen Effekte (Scroll-Reveals,
   CTA-Hover, Marquee, Karussell) laufen weiter. Die `motion-reduce:`-Utilities sind
   definiert, aber im HTML nicht gesetzt.
7. **Hero-Video ohne Pause-Möglichkeit.** Zwei `<video autoPlay muted playsInline>`,
   nur eins mit `loop`, keins mit `controls` oder Pause-Button. Das Video läuft
   dauerhaft im Hintergrund, ohne Ausstieg für Nutzer.
8. **`srcset` und `fetchpriority` fehlen komplett.** 0 von 86 Bildern haben `srcset`,
   0 haben `fetchpriority`. Kein WebP, kein AVIF. Nur `loading="lazy"` (84 von 86)
   und der Next.js-Optimizer.
9. **Duplicate Content durch Desktop- und Mobile-Kopien.**
   Der H1 steht 2× im DOM, viele Textblöcke 2× (`hidden lg:block` und `lg:hidden`),
   die Mentor-Liste 2×, die FAQ-Antworten 2×. Das bläht das HTML auf
   (712 KB Startseite, 1,02 MB Masterclasses) und verdoppelt Textinhalte für Crawler.
10. **CTA-Mikrocopy von Seite zu Seite inkonsistent.** Startseite und Mentors nutzen
    `Register Now`, die Masterclasses-Seite `Join Now`, das Popup `Join now!`,
    im DOM `Join now`. Die FAQ sagt „Simply join the waitlist", der Button sagt
    „Register". Der Nutzer weiß nicht, ob er sich registriert oder auf eine Warteliste
    setzt.
11. **Trust-Aussagen ohne Belegquelle.** „audited track records", „verified",
    „Third-party verified", „verified quarterly performances of +68%, +88%, and a
    staggering +218%" stehen als Text da, ohne Link auf den Nachweis. Kein Siegel,
    keine Prüfstelle, keine Registrierungsnummer. Für eine Finanz-Education-Seite
    ist das die riskanteste Stelle.
12. **Widersprüchliche Freiheits-Aussage.** „€0 — completely free" und
    „Full access with no hidden costs" stehen gegen die FAQ-Antwort
    „We earn through the funded challenges and tools you can unlock later".
    Das ist kein Widerspruch im Rechtssinn, aber im Leseeindruck.
13. **Tippfehler und Perspektivfehler im sichtbaren Text.** „trading plattform"
    (Manifesto), „Watch Serge Course now" auf Lars Schmeldtenkopfs Karte,
    „before founding my own hedge fund" in einer dritten Person geführten Bio,
    „It's not meant for everyone" ohne Kontraktion, fehlender Punkt nach
    „not the other way around" und „the future of trading".
14. **Keine Telefonnummer, kein Kontaktformular, keine Adresse.**
    Die einzige Kontaktmöglichkeit ist das Waitlist-Popup. Der Privacy-Block
    „04 Contacting the User" existiert, aber kein Kontaktweg im UI.
15. **Cookie-Settings-Link zeigt auf `#`.** Ein Consent-Link ohne Ziel, während
    GTM und PostHog im HTML laden. Das ist der gravierendste Rechtsmangel.
16. **Nur 5 Haupt-Nav-Punkte, zwei davon reine Anker auf die Startseite.**
    „Why WCE" und „What to Expect" springen beide auf die Startseite, „FAQ" auch.
    Drei von fünf Menüpunkten verlassen die aktuelle Seite nicht.

### Conversion-Mechanik

Die Seite verkauft ein kostenloses Produkt und braucht deshalb einen einzigen,
reibungsarmen Einstieg. Jede der 12 „Register Now"-Flächen führt auf dieselbe
externe App-URL, ohne Zwischenschritt, ohne Formular, ohne Preisseite. Das
Vertrauen wird nicht über Siegel oder Zahlen aufgebaut, sondern über die Namen
und Titel der 9 Mentoren, die über drei Sektionen hinweg wiederholt werden. Der
Vergleichsblock „WCE wins. Every time." macht den Preis zum Argument, weil er
„€3,000–9,000 per course" gegen „€0 — completely free" stellt und jede Zeile
konkret benennt. Die FAQ fängt die letzten Einwände ab, darunter die ehrlichste
Stelle der Seite: „We earn through the funded challenges and tools you can unlock
later, not by charging you for education." Der eigentliche Funnel liegt nicht auf
der Marketing-Seite, sondern im „Join Waitlist"-Popup mit zwei Pflichtfeldern,
das per Zapier an ein HubSpot-Formular geht und auf die Thank-you-Seite mit
Countdown und Kalender-Link weiterleitet.

## Abrufprotokoll

Alle Abrufe am 2026-09-16 mit
`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36`.

| URL | HTTP | Bytes |
|---|---|---|
| `https://www.worldclassedge.com/` | 200 | 712.492 |
| `https://www.worldclassedge.com/mentors` | 200 | 214.468 |
| `https://www.worldclassedge.com/manifesto` | 200 | 100.285 |
| `https://www.worldclassedge.com/course-gallery` | 200 | 1.024.918 |
| `https://www.worldclassedge.com/privacy` | 200 | 225.063 |
| `https://www.worldclassedge.com/terms-and-conditions` | 200 | 80.777 |
| `https://www.worldclassedge.com/risk-disclaimer` | 200 | 68.635 |
| `https://www.worldclassedge.com/thank-you` | 200 | 60.314 |
| `https://www.worldclassedge.com/robots.txt` | 200 | 55 |
| `https://www.worldclassedge.com/sitemap.xml` | 404 | 34.065 |
| `https://www.worldclassedge.com/_next/static/chunks/d66f5d791facf18c.css?dpl=dpl_A57U7PUj8kBruJNtvSiwUdRE1ruP` | 200 | 268.716 |
| `https://www.worldclassedge.com/_next/static/chunks/77a0839a0435f7a2.css?dpl=dpl_A57U7PUj8kBruJNtvSiwUdRE1ruP` | 200 | 8.513 |
| `https://www.worldclassedge.com/_next/static/chunks/ef0a6d7d98414b6f.css?dpl=dpl_A57U7PUj8kBruJNtvSiwUdRE1ruP` | 200 | 275.736 |
| `https://www.worldclassedge.com/_next/static/chunks/2982999255bdb474.css?dpl=dpl_A57U7PUj8kBruJNtvSiwUdRE1ruP` | 200 | 26.008 |
| `https://www.worldclassedge.com/_next/static/chunks/5d0b1d71ff3f3459.css?dpl=dpl_A57U7PUj8kBruJNtvSiwUdRE1ruP` | 200 | 66.617 |
| `https://worldclassedge.app` (leitet auf `/login`) | 200 | 41.175 |

Nicht abgerufen: die Datei `/platform-demo/masterclasses/title-1.svg` und die
Sanity-Bilddateien (nur referenziert, nicht geladen). Die App hinter
`worldclassedge.app` ist das Produkt, nicht die Marketing-Site, und wurde nicht
in die Analyse einbezogen.
