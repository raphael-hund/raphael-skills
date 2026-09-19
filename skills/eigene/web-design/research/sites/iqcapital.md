# iqcapital.io

## Steckbrief

| Feld | Wert | Beleg |
|---|---|---|
| Branche | Prop Trading (Crypto, CFDs, Futures Funded Accounts) | `<title>The #1 Prop Trading House \| IQ Capital</title>`, home.html:1 |
| Seitentyp | Marketing-Website plus separater Checkout-Funnel auf Subdomain | `https://checkout.iqcapital.io/products?presel=advanced-50k` in home.html |
| Stack | Next.js 15 App Router (Turbopack), React Server Components, Sanity CMS, Tailwind CSS, Framer Motion, GSAP (+ScrollTrigger), Radix UI, Vidstack Player, PostHog, GTM | siehe Tech-Stack unten |
| Sprache | WordPress nein; HTML hat `lang="de"` auf allen Seiten, Inhalte aber Englisch | home.html `<html ... lang="de">`, Titel und H1 englisch |
| Anrede | durchgehend "you" (Englisch), kein deutsches Sie/Du | H1 "Trade Crypto, CFDs & Futures with the #1 in Prop Trading" |
| Seiten in Sitemap | `sitemap.xml` liefert HTTP 404, robots.txt listet nichts. Aus Nav/Footer/RSC-Payload: 39 interne Routen, davon 5 Success-Story-Details | siehe Sitemap |
| Schema.org | **keine** `application/ld+json`-Blöcke auf allen 16 geprüften Seiten | `grep -c 'application/ld+json'` = 0 |
| hreflang | nicht vorhanden (0 Tags) | home.html |
| Canonical | vorhanden, self-referencing | `<link rel="canonical" href="https://www.iqcapital.io"/>` |
| Font-Rendering | Root-`font-size` an Viewport gekoppelt, rem-basierte Skala | Inline-Style: `:root{font-size:.363636vw}` / `@media (width<=1920px){:root{font-size:.416667vw}}` |

**Hinweis zur Sprache:** Das HTML-Attribut steht auf `lang="de"`, die ausgelieferte
Standardsprache ist aber Englisch. Unter `/de/pricing` liegt eine deutsche Fassung
(Titel "Preise & Pakete", H1 "Finanziere deinen Edge & skaliere dein Trading.").
Die RSC-Payload enthält Inhalte für `en`, `de` und `br` (Portugiesisch) parallel.

## Sitemap

`/sitemap.xml` → **HTTP 404**. `robots.txt` (55 Bytes) disallowt nur `/studio`.

Aus Navigation, Footer-JSON und RSC-Payload rekonstruiert (39 Routen):

**Hauptnavigation (Top-Level, aus RSC-Payload `"name":"Main"`):**
- Products (Dropdown, `isCategory: true`): Pricing, Partner Portal, Affiliate Dashboard (extern), Payouts
- About Us (Dropdown): The founder story (`/about-us`), Manifesto (`/manifesto`)
- Success Stories (`/success-stories`)
- Help Center (extern: `https://support.iqcapital.io/en/`)

**Header-CTAs:** Login (`dashboard.iqcapital.io/Identity/Account/Login`),
Register (`dashboard.iqcapital.io/Identity/Account/Register`), Register-CTA Farbe `green`.

**Footer-Spalten (6):**
| Spalte | Links |
|---|---|
| TRADING | Home, How it Works (`/how-it-works`), Payouts (`/payout`) |
| CHALLENGES | Crypto & CFDs (`/crypto`), Futures (`/futures`), Rules & Limits (`/general-rules`) |
| GETTING STARTED | Why Prop Trading? (`/why-prop-trading`), How IQ Capital Works (`/why-prop-trading`), Start Your First Challenge for $9 (`/become-a-partner`) |
| About Us | The Founding Story (`/about-us`), Manifesto (`/manifesto`), Success Stories, Testimonials (`/reviews`), FAQ (`/faq`) |
| PLATFORM | Pricing (`/pricing`), Partner Portal (`/become-a-partner`), Affiliate Dashboard (extern) |
| POLICY | Imprint (`/imprint`), Privacy (`/privacy-policy`), AGB (`/terms-of-use`), Risk Disclosure (`/risk-disclosure`), Restricted Jurisdictions (`/countries`), Contact Us (`/contact-us`) |

**Weitere erreichbare Routen:** `/cfd`, `/launch-event`, `/de/launch-event`,
`/success-stories/fabian-live-challenge`, `/success-stories/johannespayr`,
`/success-stories/jonas`, `/success-stories/robertrother`, `/success-stories/turkan`,
`/prop-trading` (im Contact-Text verlinkt).

**Externe Ziele:** checkout.iqcapital.io, dashboard.iqcapital.io,
support.iqcapital.io, discord.com/invite/iqcapital,
`https://wa.me/491727387008?text=Let%27s+trade`, 6 Partner-Domains
(bitbull-trading.com, finanzradar.de, floriansondershausen.de, robertrother.com,
trading.de, wrtrading.com, scale-academy.de, trademania.io),
9 YouTube-Kanäle, 4 Instagram-Profile, Trustpilot.

---

## Seiten

### 1. Startseite `/`

- **URL:** https://www.iqcapital.io/
- **Title:** `The #1 Prop Trading House | IQ Capital`
- **Meta-Description:** `Trade Crypto, CFDs & Futures from $1. 90% profit split, certified, 48h payouts. Start your funded trading account today.`
- **H1:** `Trade Crypto, CFDs & Futures with the #1 in Prop Trading` (Desktop-Variante) und `Trade Crypto, CFDs & Futures with the #1 Prop Trading House` (Mobile-Variante, zweites H1 im DOM)
- **H2:** 18, **H3:** 36, **H4:** 3
- **Canonical:** `https://www.iqcapital.io`
- **Schema.org:** keine
- **hreflang:** keine

#### Sektionsliste (DOM-Reihenfolge, 22 `<section>`)

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout | Medien | CTA | Trust | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Sale-Banner (2fach) | `Up to 85% off Challenges & Funding + Raffle!` / `FLASH SALE` | `80% OFF everything + Buy 3 Instants, get 1 for FREE & 100x $50K GIVEAWAY` | Full-bleed, sticky oben | keine | `Secure the offer` | keine | Zwei überlagerte Promo-Banner, ausblendbar via Payload-Flag `hideSummerSale` |
| 2 | Hero | `Trade Crypto, CFDs & Futures with the #1 in Prop Trading` | `A system built to work with you, not against you with end-of-day drawdown and up to 2 forgiven breaches.` (21 Wörter) | Zentriert, `w-[45rem]` mobil / `w-[min(110rem,100%)]` | Hintergrundbild mit `blur(8px)`-Reveal, Video-Player (Vidstack) | `Get Funded for 9$` | 3 Chip-Badges (`Up to $2M across 10 accounts`, `No daily loss limit available`, `90% Profit Split`), Trustpilot-Widget, 8 Testimonial-Slides als Marquee | H1 mischt `font-blacker`-Italic mit Geist; Hervorhebung `background:linear-gradient(to top, #E2F3EF 55%, transparent 55%)` (Textmarker-Effekt) |
| 3 | Logo-Wall / Partner | `The last prop Trading firm you'll ever need` | nichts | Zentriert, Logo-Marquee | 12 Partner-Logos als SVG von cdn.sanity.io | kein eigener | `Partner's Trusting IQ Capital`, Trustpilot | Abstand `lg:py-[15rem]`, Breite `lg:w-[229.875rem]` |
| 4 | Pricing-Tabelle / Produkt-Karten | `Fund Your Edge & Scale Your Trading.` | `Pick your product, pass once, get paid. Choose the account that matches how you trade.` | Tabs + Karten-Grid | Plattform-Logos (Quantower, ATAS, Deepchart) | `Get Plan` (4x) | `Most Popular`-Badge | Tabs: `Futures` / `CFD + Crypto`; Plan-Typen: `Core`, `One-Day-Pass`, `Rapid`, `Instant Funding`, `Challenge`, `After you pass`; Zeilen: Profit Target, Max Drawdown, Drawdown Mode, Daily Loss Limit, Consistency, Duration, Extension Fee, Max Accounts |
| 5 | Plattform-Integration | `Use your favorite trading platform.` | `Trade on the tools you already know. Every plan connects to industry-standard platforms, no lock-in and no learning curve.` | 2 Spalten | 4 Plattform-Logos | keiner | `New`-Badge | Untergruppen `Crypto & CFD integrated with` / `Futures integrated with` |
| 6 | Stats-Leiste | `The trusted name in prop Trading` | `While others profit from your resets, we count payouts.` | 4er-Grid | 4 Icons | keiner | `20,000+ Active Traders`, `4.7 / 5 Rating`, `48h Max Payout Processing`, `$3.5M+ Payouts` | Zähler-Kandidaten, im HTML statisch ausgeliefert (Marquee dupliziert die 4 Werte) |
| 7 | Trust-Bar / TÜV | `The first prop trading firm with TÜV-certified expertise.` | `Verified competence by one of Germany's most renowned certification institutions.` | Zentriert, 1 Zeile | TÜV-Logo | keiner | TÜV-Siegel | Einzelzeile, Sektion nur 1.465 Zeichen HTML |
| 8 | Weltkarte | `One Platform. 52 Countries.` | `Funded traders on every continent. No borders, no exceptions.` | Full-bleed Karte | Interaktive Karte mit 7 Städte-Pins | keiner | 4er-Marquee `4,8 ★ FROM REAL TRADERS`, `20,000+ FUNDED TRADERS`, `TRUSTED IN 52 COUNTRIES`, `$3.5M+ PAID OUT` | Microcopy `Drag the map to explore`; Städte: Los Angeles, New York, São Paulo, Frankfurt, Cape Town, Dubai, Sydney |
| 9 | Payout-Beweis | `Get paid quickly, consistently and fair.` | `We're proud to have already paid out more than $3,500,000.` | Zentriert plus Bild-Marquee | 12 Bildkacheln | keiner | `20,000+ active traders on IQ Capital` | Abschlusstext `Get funded now and be part of $3,500,000+ paid out traders worldwide.` |
| 10 | Testimonials (größte Sektion) | `What people say about IQ Capital` | nichts | Slider/Marquee über `lg:py-[25rem]` | keine Bilder, nur Text | keiner | Trustpilot-Widget | 187.248 Zeichen HTML, 899 `flex-`-Treffer; 9 namentliche Testimonials (Tarek, Selina, Noel, Finn, ...) |
| 11 | Benefits-Grid (Bento) | `What Sets IQ Capital Apart` | `Not from our marketing team. From 20,000+ traders:` | Bento | 2 Bilder | `See our reviews yourself` (extern Trustpilot) | Trustpilot-Stats: `Verified`, `4.7 / 5`, `200+`, `96%` | 5 Karten: `Simple Rules. No Fine Print.`, `90% of all profits are 100% yours.`, `A Mistake Won't Kill Your Account.`, `Payouts in Hours, Not Weeks.`, `Crypto, CFDs, and Futures. One Firm.` |
| 12 | Prozess-Steps / Sticky-Stack | `Prove your edge. Get Funded.` | nichts | 3 sticky Panels `lg:sticky lg:top-[10rem]` | 3 Render-Bilder | `Get Funded for 9$` | keine | Nummerierte Schritte 01 `Challenge`, 02 `IQ Funded`, 03 `Elite Trading`; jedes Panel eigener Headline-Chip mit eigener Hintergrundfarbe (`#65896f`, `#1AA87F`, `#103037`) |
| 13 | Timeline / Ratgeber-Steps | `From $9 to Funded. Here's Exactly How.` | `We're not just another prop firm — we're building the new standard for serious crypto, CFD and futures traders.` | zigzag mit Bild links/rechts | 4 Render-Bilder | keiner | keine | 01 `Choose Your Account`, 02 `Prove Your Edge`, 03 `...`, Zahlen `8% / 6%` und `30 days` inline |
| 14 | Benefit-Karten | `Why IQ Capital?` | `We're not just another prop firm — we're building the new standard for serious crypto and futures traders.` | Bento mit 8 Karten | 2 Bilder | `Get Funded for 9$` (Coupon `80FUNDING`) | keine | Eyebrows `01 · BACKED` bis `08 · TOOLING`, jede Karte mit Icon-Namen (`shield-star`, `chart-dots`, `adjustments`, `scale`, `file-analytics`, `key`, `wallet`, `graph`) und Artwork-Namen (`temple`, `floating-cards`, `horse`, `fresco`) |
| 15 | Team / Coach-Grid | `The best traders in the world Work with IQCapital` | nichts | Karten-Grid, 12 Bilder | Porträtfotos | keiner | Follower-Zahlen, Häkchen-Badges | 12 Namen: Basti (`153,000 YouTube Subscribers`), Christian Böttger (Co-Founder Finanzradar, `✓ 5,500+ Active Community Members`), JT & André (Trading.de), Alina Thumm, Florian Sondershausen & Christian Haag, Rene Meier, Dan Matern, Robert Rother, Matthias Fernholz, Fabian, Peter Becker |
| 16 | Erfolgsgeschichten-Slider | `Traders Stories` | nichts | Horizontal-Slider, sticky, Container `min-height:500rem` | 5 Story-Thumbnails 1920x1080 | kein eigener | Kennzahlen je Story | Fortschrittsbalken links: 1x `w-[4rem] bg-[#12f0b4]`, 4x `w-[3rem] bg-white/20`; Slider-Höhe `height:91rem`. Stories: Jonas Bertram (`€30,000 Payouts in 2 months`, `350% Personal account growth`, `0.25% Risk per trade`), Fabian Klaussner, Johannes Payr, Chris Creamer, Matteo Conti |
| 17 | Live-Payouts (größte Sektion nach HTML) | `Live Payouts. Every Day. Worldwide.` | nichts | 2 Marquee-Reihen, `mask-image:linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)` | keine Bilder | `Get Funded for 9$` | 20 echte Payout-Einträge mit Namen, Betrag, Länderflagge | 211.756 Zeichen HTML, 246 `absolute`-Treffer, 31 Payout-Datensätze; Chip `Storypart` |
| 18 | Zitat-Block | `The moment I stopped trading with my own money and started trading IQ Capital's capital, the fear was gone.` | nichts | Zentriert, 3 Zitate | 3 Porträts | keiner | namentliche Zuordnung | Johannes Payr, Matthias Fernholz, Robert Rother |
| 19 | Lead-Magnet (WhatsApp) | `Exclusive Deals on WhatsApp` | `Sign up now and be the first to know about sales, promotions and new offers.` | 2 Spalten | QR-Code 1054x1054 mit Scan-Animation | `Join Now` → `https://wa.me/491727387008?text=Let%27s+trade` | keine | Animations-Klasse `animate-qr-scan` (3.2s), `motion-reduce:hidden` am Wrapper |
| 20 | Ratgeber-Teaser | `Your trusted source for prop trading education.` | `We create content to educate serious traders seeking clarity, not just clicks and noise.` | Karten-Grid | 1 Bild | keiner | Autorennamen | 7 Videotitel, u.a. `EXPOSED: The Prop Trading Industry`, `The Truth About Prop-Trading - Vice Trading World Champion Reveals Why 99% Fail`; Autoren Christian Böttger, Andre Witzel |
| 21 | Community / Social | `Follow the Journey. From Challenge to Funded.` | `Join thousands of traders who learn, share, and get funded together.` | 4er-Grid | 4 Social-Bilder | `Watch videos`, `Start chatting`, `Discover posts`, `Vi...` | Follower-Kontexte | Kanäle: `@IQCapital_io` (YouTube), `IQCapital Discord`, `@iqcapitalofficial` (Instagram), `@IQCapital_io` |
| 22 | Stats + Final-CTA (Footer-Block) | `Discover your potential and become an IQ Trader` | nichts | Zentriert, Hintergrund `#04271d` mit Textur-Overlay | 1 Render-Bild 1083x744 | `Get Funded for 9$` | Trustpilot-Widget (dark) | Chip `Your Skills, Our Capital`; 4 Stats `20,000+`, `$3.5 million`, `52`, `4.7 / 5` wiederholt |

#### Hero-Formel

- H1-Nutzenversprechen: Kategorie-plus-Marktführerschaft, `#1 in Prop Trading`, kein
  konkreter Outcome. Ein 21-Wörter-Subline-Satz mit drei Nutzenversprechen
  (End-of-Day-Drawdown, 2 verziehbare Breaches, System arbeitet mit dir).
- Subline-Länge: 21 Wörter.
- Anzahl CTAs im Hero: 1 (identischer Button doppelt gerendert für
  Slide-Animation: `button-text` und `button-text-hover`).
- CTA-Label: `Get Funded for 9$`.
- Trust im Hero: Trustpilot-Widget (`data-template-id="5419b732fbfb950b10de65e5"`),
  3 Chip-Badges, 8 Testimonial-Zitate im Marquee.
- Medientyp: Video (Vidstack-Player mit Poster und separatem Play-Button-Bild) plus
  PNG-Hintergrund mit `filter:blur(8px)`.
- Hero-Höhe: `lg:min-h-[140rem]` / mobil `min-h-[145rem]` bei
  `:root{font-size:.363636vw}`. Kein `min-h-screen`.

#### CTA-Strategie

CTA-Labels der Startseite (gezählt aus `class="...button-text"`):

| Label | Häufigkeit | Ziel |
|---|---|---|
| `Get Funded for 9$` | 8 | checkout.iqcapital.io (Payload: `?coupon=80FUNDING`) |
| `Get Plan` | 4 | checkout mit `?presel=<produkt>-<size>`, 12 verschiedene Presets |
| `Join Now` | 1 | wa.me Deep-Link |

Checkout-Presets aus der Payload: `advanced-50k`, `expert-100k`, `master-200k`,
`rapid-advanced-50k`, `rapid-expert-100k`, `instant-funding-50k`,
`instant-funding-100k`, `fut-challenge-50k`, `fut-challenge-100k`,
`fut-dll-challenge-50k`, `fut-dll-challenge-100k`, `fut-rapid-challenge-50k`,
`fut-rapid-challenge-100k`, `fut-instant-funding-50k`, `fut-dll-instant-funding-50k`.
Alle CTAs laufen in **denselben** Funnel auf einer eigenen Subdomain.

- Sticky-Header-CTA: **ja** (Buttons `Login` mit `type: ghost`, `Register` mit
  `type: green`, plus Discord-CTA). Kein `position: sticky` im ausgelieferten
  Header-HTML der Startseite (Header wird clientseitig gerendert, siehe
  `BAILOUT_TO_CLIENT_SIDE_RENDERING`).
- Telefonnummer im Header: **nein**. Telefonnummer erscheint nur als
  WhatsApp-Deeplink `+49 172 7387008` im Lead-Magnet.
- Der Haupt-CTA hat zwei Ebenen: `button-bg` (Flächenfarbe) und `button-bg-hover`
  (Hover-Fläche), beide `duration-500`.

#### Trust-Staffelung

1. Hero: Trustpilot-Widget + 3 Zahlen-Chips + 8 Testimonial-Zitate.
2. Direkt nach Hero: 12 Partner-Logos (`Partner's Trusting IQ Capital`).
3. Nach Pricing: 4-Stats-Leiste (`20,000+`, `4.7 / 5`, `48h`, `$3.5M+`).
4. Danach TÜV-Siegel als eigene Sektion.
5. Danach Weltkarte `52 Countries` mit 7 Städten.
6. Danach Payout-Summe + 12 Payout-Bildkacheln.
7. Mitte: Trustpilot-Widget mit Stats `Verified` / `4.7 / 5` / `200+` / `96%`.
8. Später: 12 namentliche Partner und Coaches mit Followerzahlen.
9. Später: 5 ausführliche Trader-Stories mit Kennzahlen.
10. Später: 20 Live-Payout-Einträge mit Land und Betrag.
11. Footer: 3 Zitate plus Trustpilot-Widget.

#### Funnel/Formular

Auf der Startseite existiert **kein Formular**. Der Funnel ist ein externer
Checkout. Auf `/contact-us`: 0 `<input>`, 0 `<form>`, 0 `<iframe>`; Kontakt läuft
über Live-Chat-Widget und `mailto:info@iqcapital.io`. Firmenangaben dort:
`IQ Capital is operated by Beyond IQ Capital Ltd., Company Number 2026-00296,
Office No. 14, Cap Drive, Cap Estate, Gros Islet, Saint Lucia.`
Zahlungsdienstleister: `Payora Group Limited, Cypriot registration number HE 483332,
Agias Filaxeos 86, Floor 2, Office 201, 3025, Limassol, Cyprus.`

Der Checkout (`checkout.iqcapital.io/products?presel=advanced-50k`) ist eine
**eigene Anwendung**: ASP.NET (`.cshtml`-Pfade, `/lib/bootstrap/dist/css/bootstrap.min.css`,
`/css/crm.css`, `data-theme="light"` `data-alt="blue"`). HTTP 200, 11.669 Bytes,
kein Next.js.

#### Footer

- 1 `<section>`, Hintergrund `#04271d`, Textur-Overlay
  `bg-[url('/footer/cta-texture.webp')] bg-[length:120.3rem_123.8rem] bg-repeat opacity-20 mix-blend-exclusion`.
- Container `lg:w-[176.5rem]`, Padding `lg:py-[17.5rem]`.
- Struktur: Final-CTA-Block (`Your Skills, Our Capital` / `Discover your potential
  and become an IQ Trader` / CTA / Trustpilot) + Render-Bild 1083x744 rechts.
- **6 Link-Spalten** (TRADING, CHALLENGES, GETTING STARTED, About Us, PLATFORM, POLICY),
  siehe Sitemap-Tabelle.
- Ortslisten: **keine** im Footer.
- Social: Discord, YouTube, Instagram (im Community-Block, nicht im Footer).
- Rechtliches: `© IQ Capital - All rights reserved`, 6 Links getrennt durch `/`.
- Risk-Disclaimer (2 Absätze, wörtlich): `IQ Capital provides educational and
  informational content only and does not offer financial, investment, or trading
  advice. IQ Capital operates as a proprietary trading firm; traders do not invest
  their own capital. Trading occurs in simulated evaluation environments or
  proprietary funded accounts under defined rules and risk limits.` und
  `Trading leveraged instruments involves substantial risk and may result in the
  loss of all allocated capital.`

---

### 2. `/pricing`

- **Title:** `Pricing & Packages | IQ Capital` (englische Variante: siehe `/de/pricing` `Preise & Pakete | IQ Capital`)
- **H1:** `Fund Your Edge & Scale Your Trading.`
- **Sektionen:** 9 | **H2:** 7 (aus Sektionsdump) | **Schema.org:** keine
- **Canonical:** `https://www.iqcapital.io/pricing`

| Nr | Sektionstyp | Headline | Layout | CTA | Trust |
|---|---|---|---|---|---|
| 1 | Hero | `Fund Your Edge & Scale Your Trading.` | Zentriert | `Get Funded for 9$` | keine |
| 2 | Vergleichstabelle mit Tabs | `Fund Your Edge & Scale Your Trading.` | Tabs (`Futures` / `CFD + Crypto`) plus Karten-Grid | `Get Plan` | `Most Popular`-Badge |
| 3 | Plattform-Integration | `Use your favorite trading platform.` | 2 Spalten | keiner | keine |
| 4 | Rechner (Slider) | `Estimate Your Profits!` | 2 Spalten mit Range-Inputs | keiner | `Your Share ( 90 %)` |
| 5 | Entscheidungshilfe | `Which option is right for me?` | 3er-Grid | keiner | keine |
| 6 | Testimonials | `What people say about IQ Capital` | Slider | keiner | Trustpilot |
| 7 | Prozess-Steps | `Getting Started Is Simple` | Timeline 01-04 | keiner | keine |
| 8 | Payout-Erklärung | `Fast & Reliable Rewards` | 2 Spalten | keiner | `4,8 ★ FROM REAL TRADERS` |
| 9 | Final-CTA | `Your Skills, Our Capital` | Zentriert | `Get Funded for 9$` | Trustpilot |

**Tabelleninhalt (50K-Beispiel, wörtlich aus dem DOM):**
Profit Target `$3,000`, Max Drawdown `$2,000`, Drawdown Mode `EOD Trailing`,
Daily Loss Limit `$1,000 *`, Consistency `None`, Duration `30 Days`,
Extension Fee `$19`, Max Accounts `10`. Preise: 50K `$245` /
`$49` `one-time fee`; 100K `$475` / `$95`. 100K-Werte: Profit Target `$6,000`,
Max Drawdown `$3,000`, Daily Loss Limit `$1,500 *`.
Microcopy unter der Tabelle: `Still unsure which product suits you? Add plans side
by side and instantly see what sets them apart.` Buttons `Help me choose`, `Compare`.

**Rechner (Schritt 4, wörtlich):** `Profit Share`, `Estimate Your Profits!`,
`Move the slider to pick your funded balance — then enter (or drag) your expected
monthly return. The calculator instantly shows what lands in your pocket at our
flat 90% split.` Felder: `Account size` (`$ 50,000`), `Profit Rate` (`4.3 %`),
`Your Share ( 90 % )` → Ergebnis `$1,935 / month`. Kein Fortschrittsbalken,
keine Datenerhebung. Auf `/how-it-works` derselbe Rechner unter dem Chip
`Calculate yourself` / `Profit-Share` / `Slider`.

**Payout-Widerspruch (belegt):** Auf `/pricing` steht
`The first $10,000 are 100% yours. After that, we split 80:20 — you keep 80%.
Always.` Auf `/crypto`, `/futures` und der Startseite steht `90% profit split`
und `90% of the profit is always yours`. In der RSC-Payload der Startseite:
`90% of all profits are always 100% yours. No other profit split will be applied.`
Zwei unterschiedliche Splits auf derselben Site.

---

### 3. `/crypto` (Leistungsseite, 10 Sektionen)

- **Title:** `Crypto Prop Trading | IQ Capital` (aus Seitentyp; H1 belegt)
- **H1:** `Trade Crypto with up to $2,000,000.`
- **Sektionen:** 10

| Nr | Sektionstyp | Headline | Layout | CTA | Trust |
|---|---|---|---|---|---|
| 1 | Hero | `Trade Crypto with up to $2,000,000.` | Zentriert | `Get Funded for 9$` | 4 Chips: `From $9: lowest entry in prop trading`, `2 forgiven breaches`, `Up to 10 accounts simultaneously`, `90% profit split`; Chip `The #1 Prop Trading House` |
| 2 | leer (1 Zeichen Text) | - | - | - | - |
| 3 | Vergleichstabelle | `Fund Your Edge & Scale Your Trading.` | Tabs | `Get Plan` (6x) | `Most Popular`; Plattformen MetaTrader 5, Volumetrica |
| 4 | Plattform-Integration | `Use your favorite trading platform.` | 2 Spalten | keiner | `New`-Badge |
| 5 | Asset-Liste | `Full market access. Trade what moves.` | Karten-Grid | keiner | Anzahl je Gruppe |
| 6 | Plattform-Detail | `Choose your favorite trading platform` | 2 Spalten | keiner | `Global community of 7M+ traders.` |
| 7 | Payout-Versprechen | `Fast & Reliable Rewards` | 3er-Grid | keiner | Garantie-Text |
| 8 | Payout-Bilder | `Community Payouts Real payouts from our funded traders.` | Bild-Grid | `Get Funded for 9$` | keine |
| 9 | Final-CTA | `The #1 for crypto prop trading` | Zentriert | `Get Funded for 9$` | keine |
| 10 | Footer-Block | `© IQ Capital - All rights reserved` | Footer | - | Risk-Disclaimer |

**Asset-Listen (wörtlich):** `Major Crypto` `16 pairs` (BTC/USDT, ETH/USDT,
SOL/USDT, XRP/USDT, DOGE/USDT, ADA/USDT, UNI/USDT, SUI/USDT, TRX/USDT, ETC/USDT,
`and many more`), `Alt Coins` `200+ alt coins` (ARB, OP, INJ, SEI, TIA, RNDR,
PENDLE, AAVE, CRV, MANTA, `and many more`). Subline:
`Major crypto, forex pairs, indices, and commodities – all available on your
funded account.`

**Garantie wörtlich:** `48 Hours Reward Guarantee` / `Get paid within 48 hours or
we pay you a 100% profit split on it.` Weitere Karten: `Crypto Payouts`
(`We support payouts via USDC and other stablecoins.`), `Flexible Options`
(`You can withdraw via bank transfer, crypto and many local payment methods.`).

---

### 4. `/futures` (Leistungsseite, 10 Sektionen)

- **Title:** Futures-Variante; **H1:** `Trade Futures with up to $1,000,000.`
- Gleiche Sektionsreihenfolge wie `/crypto`.

| Nr | Sektionstyp | Headline | Layout | CTA |
|---|---|---|---|---|
| 1 | Hero | `Trade Futures with up to $1,000,000.` | Zentriert | `Get Funded for $9` |
| 3 | Vergleichstabelle | `Fund Your Edge & Scale Your Trading.` | Tabs | `Get Plan` |
| 5 | Asset-Liste | `Indices, commodities, forex futures and crypto – all available on your funded account.` | Karten-Grid | keiner |
| 6 | Plattform-Detail | `Choose your favorite trading platform` | 2 Spalten | keiner |
| 7 | Payout-Versprechen | `Fast & Reliable Rewards` | 3er-Grid | keiner |
| 9 | Final-CTA | `The #1 in Futures prop trading` | Zentriert | `Get Funded for $9` |

Hero-Subline: `Just a 6% profit target and an end-of-day drawdown that won't knock
you out intraday.` (14 Wörter). Chips: `From $9: lowest entry in prop trading`,
`90% profit split`, `Up to 10 accounts simultaneously`, `Up to 2 forgiven breaches`.

**Asset-Gruppen (wörtlich):** `Indices & Bonds` (`US Indices, EUR Indices, Interest
Rates & Bonds`; Mini S&P 500, Mini Nasdaq 100, Mini Dow, Mini Russell 2000, DAX,
Euro STOXX 50, T-Note 10Y, T-Bond 30Y, T-Note 2Y, Euro Bund), `Commodities`
(`Metals, Energy Futures, Agricultural Futures, Li...` abgeschnitten im DOM).
Plattformen: ATAS (`Order flow`, `Footprint charts`, `Volume clusters and delta
analysis`, `Deepchart Web is available`), Deepchart (`Market depth visualization`,
`Level-2 data optionally available`, `Heatmaps`).

**CTA-Schreibweise inkonsistent:** `/crypto` und die Startseite schreiben
`Get Funded for 9$`, `/futures` schreibt `Get Funded for $9`.

---

### 5. `/cfd` (Leistungsseite)

HTTP 200, 536.580 Bytes. Gleiches Template wie `/crypto` und `/futures`.

---

### 6. `/about-us` (Über uns, 8 Sektionen)

- **Title:** `About Us | IQ Capital`
- **Meta-Description:** `Meet the team behind IQ Capital – our mission, our values, and why we're the leading prop trading house worldwide.`
- **H1:** `Trade with up to 2,000,000 Our Capital. Your Profits.`
- **H2:** 7, **H3:** 11 | **Canonical:** `https://www.iqcapital.io/about-us`

| Nr | Sektionstyp | Headline | Layout | Trust |
|---|---|---|---|---|
| 1 | Hero | `Trade with up to 2,000,000 Our Capital. Your Profits.` | Zentriert | keine |
| 2 | Werte-Grid | `At IQ Capital, we don't sell dreams. We fund execution.` | 3er-Grid | 3 Werte: `Built by traders`, `Performance over credentials`, `Designed for longevity` |
| 3 | Gründer-Story | `Seventeen years on the desk before the firm.` | Zigzag mit nummerierten Schritten | `Christoph Radecker | Founder & CEO`, 17 Jahre Erfahrung |
| 4 | Zitat | `I built IQ Capital because it's the firm I couldn't find when I was the trader. Honest rules. Real capital. The respect of being treated like a professional.` | Zentriert | Zuschreibung an Gründer |
| 5 | Verifizierte Performance | `Christoph's Verified Performance` | Karten-Grid | `+97.3% in 90 Days — 2nd place, World Cup Trading Championship (Forex) 2022`, `Five-figure monthly payouts across major prop firms incl. Topstep, Apex, and MFF` |
| 6 | Beweis-Dokumente | `Over $250,000 in cumulative verified payouts — all documented` | Dokument-Screenshots | Bankbelege: `EINZAHLUNG VON TOPSTEPTRADER LLC MIT REFERENZ RA FEES`, `13. August 2024`, `TRANSFER-1180828169`, `2.532,00` |
| 7 | Team / Partner | `50+ Partners trusting IQ Capital` | Logo-Marquee + Textblock | `one of the strongest tech teams in prop trading — engineers, quants, data scientists, and product leaders` |
| 8 | Final-CTA | `Discover your potencial and become an IQ Trader` | Zentriert | Trustpilot |

**Tippfehler belegt:** Sektion 8 des Footers schreibt `potencial` (fehlendes
Doppel-s) auf `/about-us`, `/contact-us` und `/how-it-works`, aber `potential` auf
der Startseite, `/manifesto`, `/why-prop-trading` und `/payout`.

---

### 7. `/success-stories` (Ratgeber-Übersicht, 6 Sektionen)

- **Title:** `Trader Success Stories | IQ Capital`
- **Meta-Description:** `Real traders, real results. See how our community trades crypto, CFDs & futures successfully with IQ Capital.`
- **H1:** `The IQ Capital Journal`
- **H2:** 4, **H3:** 5
- Chip: `Reviews`. Beschreibung: `Market insights, product updates, technical deep
  dives and real trader stories, straight from the IQ Capital ecosystem.`

Die Seite ist **kein** klassisches Blog-Archiv: Sie kombiniert
Payout-Beweis-Block, Testimonial-Slider und Benefits-Bento. Ein Karten-Grid mit
Artikeln ist im DOM vorhanden, die Artikel-Teaser stehen aber im
"Traders Stories"-Slider der Startseite und in den Detailseiten.

---

### 8. `/success-stories/robertrother` (Einzelner Artikel)

- **Title:** `From $156 Million to 7 years in prison – and back to the markets: Robert Rother – IQ Capital`
- **Meta-Description:** `Robert Rother managed $156M in China at 28, spent 7 years in a Chinese prison, and returned to the markets with a clarity only extreme experience can ...` (im DOM gekürzt)
- **H1:** `From $156 Million to 7 years in prison – and back to the markets: Robert Rother's extraordinary trading story`
- **Sektionen:** 3 | **H2:** 15 | **H3:** 0
- **Textlänge:** ~2.602 Wörter, 14.849 Zeichen
- **Bilder:** 3 | **Interner Link im Artikel:** 0 | **iframe:** 0
- **Kein Inhaltsverzeichnis, keine Autorenbox, keine Lesezeit, kein Schema Article.**

**Artikel-Header (Sektion 1):** Kategorie-Chip `Success Stories`
(`bg-[#0b6d51] text-white px-[1.25rem] py-[0.625rem] rounded-[0.25rem]`),
Datum `April 1, 2026` (`text-[#103037] opacity-50`), H1 darunter mit
`prose-headings:lg:text-[6rem]` und `prose-p:tracking-[-0.18rem]`.
Zwei Hintergrundbilder: mobil `hero-mobile-background.png` (430x371), Desktop
`hero_desktop_background-lg-2.0.png` (1920x1173) im Container `h-[130rem]`.
Beide mit `style="opacity:0;filter:blur(8px)"`.

**H2-Struktur (wörtlich, chronologisch):**
`1995: A 13-Year-Old and a Fascination for the Markets`,
`2004: The Rise in China`, `2011: The Fall`,
`December 2018: A Stranger in a New World`, `2019: The Rebirth as a Trader`,
`The 'Liquidity Method': How Robert Trades Today`, `A Typical Trading Day`,
`The Perfect Day`, `The Typical Beginner Mistake?`,
`2024: The Discovery of Prop Trading`, `What Makes a Good Prop Firm`,
`Why IQ Capital?`, `The Most Important Lessons from 30 Years`,
`The Message Behind the Story`.

**Verwandte Artikel (Sektion 3, Chip `You might also like`):**
`26 Years Old, 100% Return, One World Title: The Story of Chris Creamer`
(`September 1, 26`), `93.6% Pass Rate: How a Former Market Maker Cracked the
Math Behind Prop Firms` (`August 31, 26`). CTA-Label je Karte: `Read more`.
Kein FAQ, kein Zwischen-CTA im Artikeltext.

---

### 9. `/faq` (2 Sektionen, größter Accordion-Block)

- **Title:** `Frequently Asked Questions | IQ Capital`
- **Meta-Description:** `Answers on rules, payouts, soft-breach protection & more. Everything you need to know about funded trading at IQ Capital.`
- **H1:** `Frequently Asked Questions` | **H2:** 10 | **H3:** 50
- **200 geschlossene Accordion-Items** (`data-state="closed"`), 0 offen, 61 Buttons,
  1 Suchfeld. Radix-Accordion bestätigt durch `data-radix-collection-item`,
  `aria-controls="radix-_R_2chmsltd9f8jb_"`.

**Kategorien (Jump-to-Liste, wörtlich):** About IQ Capital, Eligibility & Sign-Up,
Programs & Account Sizes, Key Trading Rules, Evaluation Phase, Instant Funding,
Payouts & Profit Split, Fees & Billing, Risk Management & Drawdown Logic, Glossary.
Subline: `Straight-forward answers to every question about our funding programs,
risk rules, payouts, fees, and growth path—so you can focus on trading, not
searching for fine print.`

**Accordion-Trigger-Klassen (exakt):**
`group/trigger flex w-full items-center gap-[2rem] lg:gap-[2.5rem] p-[4rem] data-[state=open]:pb-[1.5rem] text-left outline-none font-geist transition-[padding-bottom] duration-300 ease-in-out`.
Icon-Box: `w-[3.5rem] h-[3.5rem] bg-black rounded-[0.25rem] group-data-[state=open]/trigger:rounded-[1rem] transition-all duration-200`.
Zwei zeitgleiche Übergänge: Padding-Bottom 300ms und Border-Radius 200ms
(Quadrat zu Rund beim Öffnen).

---

### 10. `/reviews` (3 Sektionen)

- **Title:** `Reviews & Experiences | IQ Capital`
- **Meta-Description:** `What real traders say about IQ Capital – reviews on payouts, support, and trading conditions. See for yourself.`
- **H1:** `What Real Traders Say About Us` | **H2:** 1
- Sektion 2 hat 5.624 Zeichen Text. Testimonial-Slider (identischer Block wie auf
  der Startseite, Sektion 10 dort). Subline: `Over 1,000 verified traders have
  already joined our programs — and their experiences speak louder than any
  marketing claim. Here's what our community shares about trading with us.`
- Beispiele wörtlich: `Had one small question about scaling and support answered
  instantly. Helpful and polite. That matters.` (Lucas T., Verified Trader);
  `Support replied at 11pm my time, which I didn't expect. They fixed my login
  issue in less than 10 minutes.` (Maria L., Verified Trader).

---

### 11. `/contact-us` (3 Sektionen)

- **Title:** `Contact U|s | IQ Capital` (Titel enthält einen Pipe mitten im Wort)
- **H1:** `Contact`
- **0 Formularfelder.** Kontakt-Wege wörtlich: `Live Chat — Fastest Way to Get Help`
  (`use our live chat widget in the bottom right corner of this page. Our support
  team typically responds within one hour during business hours.`), `Email`
  (`info@iqcapital.io`, `Please note that email inquiries may take 1–2 business
  days to process.`), `Company Information` (Jurisdiktion Saint Lucia, siehe oben).
- `Before You Reach Out`-Liste: What is Prop Trading? (`/prop-trading`),
  How does IQ Capital work? (`/how-it-works`), Challenge Rules (`/general-rules`),
  Frequently Asked Questions (`/faq`), Restricted Jurisdictions (`/countries`),
  Risk Disclosure (`/risk-disclosure`).

---

### 12. `/how-it-works` (8 Sektionen)

- **H1:** `How It Works` | Chip `The #1 Prop Trading House`
- Subline: `One streamlined evaluation, two funding routes, and an elite tier
  reserved for our best-performing traders.`

| Nr | Sektionstyp | Headline | Layout |
|---|---|---|---|
| 1 | Hero | `How It Works` | Zentriert |
| 2 | Prozess-Steps | `Evaluation` | 3 Schritte |
| 3 | Rechner | `Profit-Share Slider` / `Estimate Your Profits!` | 2 Spalten |
| 4 | Prozess-Steps | `IQ Funded` | 3 Schritte |
| 5 | Feature-Block | `Instant Funding – Capital Today, Not Tomorrow` | Liste |
| 6 | Prozess-Steps | `IQ Elite` | 2 Schritte |
| 7 | FAQ-Akkordeon | `Frequently Asked Questions` | 5 Fragen |
| 8 | Final-CTA | `Discover your potencial and become an IQ Trader` | Zentriert |

**Schritt-Details wörtlich:** Evaluation `01 Pick & Customise` (`Select virtual
capital from 10k up to 200k USD.`), `02 Reach Your Target` (`Profit target:
8% / 6%`), `03 Step Complete`. IQ Funded: `01 Unlock The Trading Floor`,
`02 Start Trading, Start Earning` (`Access with a simple one-time payment,
conveniently payable via card or cryptocurrency — no hidden charges, no
subscriptions.`), `03 Daily Payouts After 10 Active Days`
(`Trade for 10 active ...` im DOM abgeschnitten). IQ Elite:
`01 Graduate From Funded Trader To Profit Partner` (`Only the top 5% earn an
invite to IQ Elite`), `02 Scale Past $500.000 — Fast` (`we double your allocation
each time—$100k → $200k → $400k → $500k +`). Instant Funding: `Zero Wait-Time:
Activate And Trade Same Day.`, `Pre-Agreed Risk Limits: Max. Drawdown 6% / 5%.
No daily loss limit.`, `Flat, One-Off Entry Fee: Single Fee. No Surprises.`

**FAQ-Sektion (5 Fragen, identisch auf `/why-prop-trading`):**
`What happens if I don't pass the challenge?`, `How fast do I get my payout?`,
`Do I need trading experience?`, `What markets can I trade?`,
`Is the coupon code really exclusive?`

---

### 13. `/general-rules` (3 Sektionen)

- **H1:** `General Rules` | Chip `Guidelines`
- Headline-Aussage: `The First Law of Trading at IQ Capital:` /
  `We trade fair and we expect the same in return`
- Subline: `Your strategy must reflect real-market behavior and honest execution.
  Any attempt to manipulate, exploit, or abuse the system violates this core rule
  and ends the relationship.`
- Tabs: `Crypto & CFDs` / `Futures`. Unterkategorien: `Core Rules`,
  `Trading Conditions`, `Payout Structure & Profit Split`, `Breach Logic &
  Consequences`, `Prohibited Practices`.
- Regel-Karten mit eigenem `WHY?`-Feld. Beispiele wörtlich:
  `Profit Target (Goal)` `8%` `EVALUATION` `Evaluation & Funding` `WHY?` `Shows that
  you can generate profits sustainably with the given risk.`;
  `Max Drawdown (Trailing EoD)` `6% / 5%` `TRAILING LINE` `WHY?` `Protects against
  large, creep...` (im DOM abgeschnitten).

---

### 14. `/why-prop-trading` (9 Sektionen)

- **Title:** `Why Prop Trading? | IQ Capital`
- **H1:** `Why trade someone else's money?` | Chip `Prop Trading 101` | **H2:** 8

| Nr | Sektionstyp | Headline | Layout |
|---|---|---|---|
| 1 | Hero | `Why trade someone else's money?` | Zentriert |
| 2 | Erklär-Block | `How does it work?` | 3 Schritte |
| 3 | Argument-Block | `Why a Challenge instead of straight funding?` | 2 Spalten |
| 4 | Vergleichstabelle | `Prop vs. Self-Funded — at a glance` | Tabelle |
| 5 | Prozess | `Your Turbo Route to Big Capital` | 2 Blöcke |
| 6 | Zitat | `How IQ Capital beats traditional prop firms` | Zentriert |
| 7 | Stats | `What that means for you` | 4er-Grid |
| 8 | FAQ-Akkordeon | `Frequently Asked Questions` | 5 Fragen |
| 9 | Final-CTA | `Discover your potential and become an IQ Trader` | Zentriert |

**Vergleichstabelle (Sektion 4, wörtlich):**

| Kriterium | `Prop Trading with IQ Capital` | `Trading Your Own Account` |
|---|---|---|
| `Capital at risk` | `0 USD personal funds` | `100 % personal funds` |
| `Buying power` | `Up to 200.000 USD` | `Limited to your deposit` |
| `Risk control` | `Hard stop at −6 % / -5 % overall` | `Unlimited downside` |
| `Earnings` | `90% profit split` | `100 %—but only on your small balance` |
| `Growth path` | `IQ Elite up to 500.000 USD` | `Add fre...` (abgeschnitten) |

Zahlen im deutschen Format (`200.000`, `500.000`) in einer englischen Seite.
Stats-Grid (Sektion 7): `500K Scaling` (`climb to million-dollar desks in record
time.`), `0 Hidden Fees` (`zero swaps, weekend holds allowed, no secret
penalties.`), `24/7 Edge` (`real-time on-chain tools and analytics built from and
for traders.`).

---

### 15. `/manifesto` (5 Sektionen)

- **Title:** `Our Manifesto | IQ Capital`
- **H1:** `A Letter from the Founder` | Byline: `Written by Christoph Radecker` | **H3:** 6
- Langtext-Sektionen: `Let's be real: The prop trading industry today is broken.`
  (`It's full of flashy marketing, hidden rules, and firms that earn when you
  lose.`), `Somewhere along the way, prop trading lost its way.` /
  `It stopped being about funding real talent. It became about selling accounts.`
  (`They earn on resets, not results.`), `Conclusion` (`We believe prop trading
  can once again mean opportunity, not exploitation.`).
- **Inkonsistenz:** Hier steht `They earn on resets, not results.` Auf der
  Startseite steht dasselbe Motiv als `While others profit from your resets, we
  count payouts.` Der Anti-Positionierungs-Claim wird auf zwei Seiten
  unterschiedlich formuliert.

---

### 16. `/payout` (8 Sektionen)

- **Title:** `48h Fast Payouts | IQ Capital`
- **H1:** `Your success speaks for itself.` zweimal (Desktop und Mobile),
  Chip `Built by traders, for traders.`
- Sektionen: Hero mit 4-Feld-Trustpilot-Marquee, Payout-Bild-Wall, Reviews-Slider
  (13.788 Zeichen), Benefits-Bento, Erfolgsgeschichten-Slider, Live-Payouts
  (3.024 Zeichen), Einzelzitat (Johannes Payr, `Funded Trader at IQ Capital`),
  Final-CTA.

---

### 17. `/become-a-partner` (9 Sektionen)

- **Title:** `Affiliate Partner Program | IQ Capital`
- 6 H1-Blöcke (ungewöhnlich für eine Landingpage):
  `Partner with IQ Capital.Grow together.`, `Why the top creators choose IQ Capital`,
  `The Network Proof`, `How you become part of it.`, `Your tier grows with your
  impact.`, `Let's build somethingthat lasts.`
- **Fehlende Leerzeichen belegt:** `IQ Capital.Grow`, `somethingthat` (zweimal im DOM).

---

## Design-System

Grundlage: 873.785 Bytes CSS aus 5 Chunks
(`0i308op-6fqh2.css` 379.425 B, `0cywcsm0k2-f8.css` 386.021 B,
`0qgt4i.mpbt4b.css` 67.500 B, `0togo5l_e-7ze.css` 29.363 B,
`01vquo-o0u0op.css` 11.476 B).

### Fonts

30 `@font-face`-Deklarationen. Sieben Familien, alle selbst gehostet unter
`/_next/static/media/`:

| Familie (CSS-Name) | Stile / Gewichte | Dateien | Verwendung |
|---|---|---|---|
| `geist` | Variable (100-900), normal + italic | `Geist[wght].ttf`, `Geist_Italic[wght].ttf` | Body, Buttons, H1-H3 |
| `geistMono` | Variable | `GeistMono_VariableFont_wght.ttf` | Labels, Chips, Trust-Marquees |
| `blacker` | 300, 400 inkl. italic | 4 `.ttf` | Hervorhebung in Headlines (em), Eyebrows |
| `gestura` | 300 italic, 400, 600, 700 | 4 `.otf` | Headline-Alternative |
| `instrument` | 400 normal + italic | 2 `.ttf` | Serif-Akzent |
| `Instrument Sans` | 400, 500, 600, 700 | 2 `.woff2` | UI-Text |
| `Bebas Neue` | 400 | 2 `.woff2` | Display |

Kein Google-Fonts-Link, kein Adobe-Fonts-Link. Beide `woff2`-Familien
(`Bebas Neue`, `Instrument Sans`) sind über zwei verschiedene Dateien
(Subsets) an dieselben Gewichte gebunden.

**Font-Stacks (Häufigkeit im CSS):**
`var(--font-geist), sans-serif` (15x), `var(--font-blacker), serif` (14x),
`var(--font-geist),serif` (12x), `var(--font-geist-mono), monospace` (8x),
`var(--font-instrument-sans), sans-serif` (8x).

**Typo-Skala (aus `.h1` / `.h2` / `.h3`):**

| Klasse | font-size | weight | line-height | letter-spacing |
|---|---|---|---|---|
| `.h1` | `5.5rem` | 600 | 115% | - |
| `.h2` | `4.5rem` | 500 | 110% | - |
| `.h3` | `3.5rem` | 400 | 112% | `-.16rem` |

Im Fließtext überschreiben Tailwind-Klassen die Skala nach oben:
`prose-headings:lg:text-[7rem]` am Hero-H1, `prose-headings:text-[6rem]` an
Sektions-H2, `prose-headings:text-[4rem]` mobil. Keine `clamp()`-Funktion,
stattdessen rem-Skala plus Viewport-gekoppelte Root-Größe.

`.p-normal { color:#fff9 }` (60 % Weiß) im dunklen Kontext.
`.richtext { color:var(--tw-prose-body); max-width:65ch }`.

### Farben

Top-Farbwerte aus 873 KB CSS:

| Wert | Anzahl | Rolle |
|---|---|---|
| `#0000` | 294 | `transparent` (Utilities) |
| `#fff` | 72 | Text auf dunkel, Button-Fläche |
| `#103037` | 52 | Tiefes Petrol, Text auf Weiß (`text-[#103037]`) |
| `#0000001a` | 47 | Schatten/Rahmen 10 % |
| `#001b14` | 46 | Section-Hintergrund dunkelgrün (`bg-[#001B14]`) |
| `#228e71` | 40 | Akzent-Grün mittel |
| `#fff0` | 36 | `transparent` |
| `#ffffff1a` | 31 | Weiß 10 % für Karten auf Dunkel |
| `#f5f5f5` | 29 | Hellgrau Section-Hintergrund |
| `#fff3` | 25 | Weiß 20 % |
| `#d9f9b9` | 25 | Hellgrün Akzent |
| `#1aa87f` | 22 | Grün für Payout-Rahmen (`border-[#1aa87f]`) |
| `#f4f4f4` | 22 | Hellgrau Footer |
| `#ffffff80` | 19 | Weiß 50 % Rahmen |
| `#6da991` | 18 | Gedämpftes Grün |
| `#0009` | 16 | Schwarz 60 % |
| `#0000000d` | 16 | Schwarz 5 % |

Weitere belegte Einzelwerte: `#04271d` (Final-CTA-Hintergrund),
`#003828` (H1-Hervorhebungstext), `#E2F3EF` (Textmarker-Gradient),
`#D6EEE7` (Text auf Dunkel), `#12f0b4` (aktiver Slider-Balken),
`#0b6d51` (Artikel-Kategorie-Chip), `#65896f` (Step-Panel 1),
`#72.61b` äquivalent `#07261b` (Story-Karten-Hintergrund),
`#118f6a66` / `#1ecc9780` (Glow-Schatten), `#a3deb2` (Button Hover-Grün),
`#f0d691` (Button `yellow`), `#5ef0c0` (QR-Scan-Linie), `#5c6af3` (Discord-Button).

**Funktionale Zuordnung:** Akzent auf Buttons ist `rgb(48 127 106)` (`button-green`)
bzw. `rgb(63 162 136)` (`button-white` Hover). Text auf Weiß ist `#103037`.
Primärer dunkler Sektionshintergrund ist `#001B14`. Sekundärer heller
Sektionshintergrund ist `#f4f5f5`.

**CSS-Custom-Properties:**
```
--background:0 0% 100%          --foreground:240 10% 3.9%
--primary:201 96.2% 10.4%       --primary-foreground:0 0% 98%
--secondary:240 4.8% 95.9%      --muted:240 4.8% 95.9%
--muted-foreground:240 3.8% 46.1%  --accent:240 4.8% 95.9%
--destructive:0 84.2% 60.2%     --border:240 5.9% 90%
--input:240 5.9% 90%            --ring:240 10% 3.9%
--radius:.5rem                  --prose-body-color:#0000003c
--prose-heading-color:#000       --card-height:26.875rem (und 42.5rem)
--video-border-radius:.5rem      --video-border:none
```
Das sind die unveränderten shadcn/ui-Defaults. `--primary` (HSL 201 96.2% 10.4%
= `#01364f`-nah) wird auf der Seite nicht als Buttonfarbe verwendet. Die
Marke läuft über Tailwind-Arbitrary-Values, nicht über Custom Properties.

### Radius

Häufigste `border-radius`-Werte:

| Wert | Anzahl | Verwendung |
|---|---|---|
| `inherit` | 22 | Media-Player-intern |
| `1rem` | 13 | `button-shape-round` |
| `.5rem` | 11 | Buttons, Video (`--video-border-radius`) |
| `0` | 10 | Reset |
| `.25rem` | 9 | `button-shape-square`, Karten, Chips |
| `3rem` | 7 | große Karten |
| `9999px` | 6 | `button-shape-pill`, Fortschrittsbalken |
| `1.5rem` / `2rem` | je 6 | Karten |

**Buttons sind eckig.** Standard an allen CTAs ist `button-shape-square`
(`border-radius:.25rem`), gesetzt über `data-shape="square"`. Pill und Round
existieren als Varianten, werden im ausgelieferten HTML aber nicht genutzt.

### Shadows

Fast alle `box-shadow`-Deklarationen sind Tailwind-Ring-Kompositionen
(`var(--tw-ring-offset-shadow,0 0 #0000), var(--tw-ring-shadow,0 0 #0000),
var(--tw-shadow)`, 60x). Echte dekorative Schatten gibt es nur 4:

```
inset 0 0 15.9px #fffc                              /* .button-dark-glow .button-bg */
0 0 3rem #118f6a66,0 1rem #118f6a66                 /* Glow */
0 0 3rem 1rem #118f6a66                             /* Glow */
0 .375rem 2.375rem 0 #1ecc9780                       /* Glow */
```
Das System arbeitet mit Rahmen und Flächen, nicht mit Schatten. Der
Glow-Akzent (`#118f6a` / `#1ecc97`) ist sehr selten im Einsatz.

### Spacing / Container

- Container: `.container { width:100%; margin:auto; padding-left:2rem; padding-right:2rem; max-width:200rem }`.
  Die 200rem (3.200 px bei Root `font-size:.416667vw`) sind der reale Maximalwert.
- Sektions-Paddings (häufigste `lg:py-[...]`):
  `lg:py-[15rem]` (3x), `lg:py-[9rem]` (3x), `lg:py-[4.75rem]` (80x, Marketing-Blöcke),
  `lg:py-[25rem]` (1x, Testimonials), `lg:py-[20rem]` (1x, Ratgeber-Teaser),
  `lg:py-[18rem]` (1x), `lg:py-[17.5rem]` (1x, Footer), `lg:py-[16rem]` (1x).
- Typische Blockbreiten: `w-[min(140rem,...)]` (15x), `w-[min(86rem,...)]` (6x),
  `w-[min(141.5rem,...)]` (6x), `w-[min(160rem,...)]` (4x), `w-[min(147.25rem,...)]` (3x),
  `w-[min(90rem,...)]` (3x), `w-[min(110rem,100%)]` (Hero-H1-Wrapper).
- Die Zahlen sind Konsequenz der Viewport-Root-Größe: bei 1440 px Viewport ist
  `1rem = 6 px`, also `15rem = 90 px` Padding und `140rem = 840 px` Blockbreite.

### Bilder

- **141 Bilder** auf der Startseite: 60 PNG, 49 SVG, 25 JPG, 6 WebP.
- **140 von 141 mit `loading="lazy"`. 0 Bilder mit `fetchpriority`.**
- 124 Bilder mit `srcset` über den Next.js-Image-Optimizer (`/_next/image?url=...&w=...&q=...`).
- Die SVG-Logos der Partner sind **gerastert gerendert und als SVG verpackt**:
  die Payload liefert `"lqip":"data:image/png;base64,..."`-Platzhalter für Dateien
  mit `.svg`-Namen (`new-logo-full.74d5b1c8 1.svg`, `logo_hs_kreis 1.svg`,
  `Trading.de-logo 1.svg`, `Group 2085665791.svg` ...). Alt-Texte sind die
  Dateinamen, nicht beschreibend.
- **Kein AVIF.** Kein `fetchpriority="high"` am Hero-Bild.
- Hero-Video: `<video preload="none" aria-hidden="true">` im Vidstack-Player
  (`data-media-player`, `data-orientation="portrait"`), Poster separat,
  Play-Button als PNG (`/global/video-play-btn.png`, `w-[10rem] h-[10rem]`).

### Tech-Stack

| Marker | Beleg | Deutung |
|---|---|---|
| `data-dpl-id="dpl_2S5DKMt3yMWiStLFEqATahhUZbex"` | home.html `<html>` | Vercel Deployment |
| `/_next/static/chunks/turbopack-0xek247dy3jm9.js` | home.html `<script src>` | Next.js mit Turbopack |
| `<!--$?--><template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING">` | 5x in home.html | React Server Components, Suspense-Fallbacks |
| `cid:9c54d7e6fd576a5791d0d93a70a5dd2e` in `self.__next_f.push` | home.html | RSC-Flight-Payload |
| `cdn.sanity.io/images/p8itl4zg/production/...` (888 Treffer) | home.html | Sanity CMS, Projekt-ID `p8itl4zg` |
| `#sanity-visual-editing { z-index:9999999 }` | all.css | Sanity Visual Editing aktiv |
| `@keyframes accordion-up/down` mit `--radix-accordion-content-height` | all.css | Radix UI Accordion |
| `vds-` Präfix (765x), `vds-marquee`, `vds-buffering-spin` | all.css | Vidstack Media Player |
| `data-radix-collection-item`, `id="radix-_R_chmsltd9f8jb_"` | faq.html | Radix |
| `gsap.registerPlugin()` Warnung, `er.ScrollTrigger` | `js/0th5h2d1a6d1e.js` | GSAP 3 + ScrollTrigger im Bundle |
| `whileInView` in `variantPriorityOrder` | `js/0i_hnjo~7k8h~.js` | Framer Motion (`motion`) |
| `IntersectionObserver` | 5 JS-Chunks | Scroll-Trigger |
| `html.lenis`, `.lenis.lenis-smooth`, `.lenis-stopped`, `.lenis-scrolling` | all.css | Lenis-Smooth-Scroll-Styles vorhanden, **aber kein Lenis-Code in den 26 JS-Chunks** (0 Treffer). Entweder toter CSS-Rest oder Code in einem nicht geladenen Chunk. |
| `GTM-W6PLH6ZW` | home.html `<link rel=preload>` + Script | Google Tag Manager |
| `googletagmanager.com/gtm.js` | home.html | GTM |
| `CSPostHogProvider`, `"posthogFlagKey":"homepage-ab"` | home.html RSC-Payload | PostHog inkl. A/B-Test auf die Startseite |
| `//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js` | home.html `<link rel=preload>` | Trustpilot |
| 4 Trustpilot-Templates: `5419b732fbfb950b10de65e5`, `53aa8807dec7e10d38f59f32`, `5419b6ffb0d04a076446a9af`, `5419b637fa0340045cd0c936` | home.html | Sterne-Widget, Bewertungs-Box, Footer-Widget |
| **Kein Consent-Tool** | 0 Treffer für Usercentrics, Cookiebot, consentmanager, Cookiefirst | DSGVO-Lücke: GTM und PostHog starten ohne Consent-Banner |
| **Kein WordPress, Webflow, HubSpot, Wix, Shopify** | 0 Treffer | - |
| `data-alt="blue"`, `/lib/bootstrap/dist/css/bootstrap.min.css`, `bootstrap.min.css/crm.css` | checkout.html | Checkout ist ASP.NET mit Bootstrap, separate App |

---

## Animationen

### Reveal-System (wichtigstes Muster)

Kein AOS, kein GSAP-ScrollTrigger im sichtbaren Einsatz, sondern **Framer Motion
mit `whileInView` plus serverseitig gerenderten Inline-Styles**. Das Muster:

Elemente werden bereits im HTML mit einem Inline-Style ausgeliefert:
```html
<div class="flex flex-col gap-[4rem]" style="opacity:0;transform:translateY(24px)">
```
Framer Motion hebt den Style beim Eintritt in den Viewport auf.

**Gezählte Reveal-Styles pro Seite:**

| Seite | Reveal-Styles gesamt | `translateY(20px)` | `translateY(24px)` | `filter:blur(8px)` | `translateY(16px)` | `translateY(8px)` | `scale(0.97)` | `scale(0.98)` |
|---|---|---|---|---|---|---|---|---|
| home | 335 | 8 | 3 | 2 | 0 | 0 | 1 | 1 |
| pricing | 159 | 0 | 10 | 2 | 1 | 0 | 0 | 0 |
| crypto | 32 | 23 | 4 | 2 | 2 | 0 | 1 | 0 |
| futures | 35 | 26 | 4 | 2 | 2 | 0 | 1 | 0 |
| cfd | 33 | 24 | 4 | 2 | 2 | 0 | 1 | 0 |
| about-us | 30 | 8 | 7 | 2 | 0 | 10 | 0 | 0 |
| success-stories | 323 | 0 | 1 | 2 | 0 | 0 | 0 | 0 |
| story_robertrother | 9 | 5 | 1 | 2 | 0 | 0 | 0 | 1 |
| contact-us | 5 | 0 | 3 | 2 | 0 | 0 | 0 | 0 |

Die 80er-Wiederholungen mit `opacity:0.1` / `0.4` / `0.6` / `0.8` auf home,
pricing und success-stories sind **kein** Reveal, sondern die Stufen eines
Low-Quality-Image-Placeholders oder eines Fade-Stacks.

**Vier Reveal-Varianten mit exakten Werten:**
- `opacity:0;transform:translateY(20px)` (Standard für Text und Karten)
- `opacity:0;transform:translateY(24px)` (Footer-Blöcke, größere Container)
- `opacity:0;transform:translateY(16px)` (Footer-Zeilen, Stats)
- `opacity:0;transform:translateY(8px)` (feine Elemente auf about-us)
- `opacity:0;filter:blur(8px)` (Hintergrundbilder)
- `opacity:0;transform:scale(0.97)` / `scale(0.98)` (Video-Player, CTA-Bilder)

**Kein noscript-Fallback** (0 `<noscript>`-Tags). Bei deaktiviertem JavaScript
bleiben 15 Elemente auf der Startseite dauerhaft unsichtbar.

**Framer-Motion-Default-Transition im Bundle:**
```js
let tI = { duration: .45, ease: [.4, 0, .1, 1] }
```
Weitere Easing-Konstanten im selben Chunk: `ease:[.25,.1,.35,1]` (Standard-Ease)
und `ease:[.4,0,.1,1]`.

### `@keyframes` (10 eindeutige Namen)

```css
@keyframes trustScroll  { 0%{transform:translate(0)} to{transform:translate(-99.5rem)} }
@keyframes weeklyScroll { 0%{transform:translate(0)} to{transform:translate(calc(-50% - 1.25rem))} }
@keyframes coachesScroll{ 0%{transform:translate(0)} to{transform:translate(calc(-50% - 1rem))} }
@keyframes scrollLeft   { 0%{transform:translate(0)} to{transform:translate(-50%)} }
@keyframes scrollRight  { 0%{transform:translate(0)} to{transform:translate(50%)} }
@keyframes qr-scan      { 0%{transform:translateY(-100%) scaleY(1)} 49.9%{transform:translateY(400%) scaleY(1)}
                          50%{transform:translateY(400%) scaleY(-1)} to{transform:translateY(-100%) scaleY(-1)} }
@keyframes chip-bar     { 0%,to{width:1.5rem} 33.33%{width:.75rem} 66.66%{width:.375rem} }
@keyframes chipBar1     { 0%{width:1.5rem} 33.33%{width:.375rem} 66.66%{width:.75rem} to{width:1.5rem} }
@keyframes chipBar2     { 0%{width:.75rem} 33.33%{width:1.5rem} 66.66%{width:.375rem} to{width:.75rem} }
@keyframes chipBar3     { 0%{width:.375rem} 33.33%{width:.75rem} 66.66%{width:1.5rem} to{width:.375rem} }
@keyframes pulse        { 50%{opacity:.5} }
@keyframes spin         { to{transform:rotate(360deg)} }
@keyframes accordion-down{ 0%{height:0} to{height:var(--radix-accordion-content-height)} }
@keyframes accordion-up  { 0%{height:var(--radix-accordion-content-height)} to{height:0} }
@keyframes enter / exit  { translate3d + scale3d + rotate über CSS-Variablen }
```
Dazu 7 Vidstack-interne (`vds-buffering-spin`, `vds-bezel-fade`,
`vds-menu-enter`, `vds-menu-exit`, `vds-slider-icon`, `vds-tooltip-enter`,
`vds-tooltip-exit`, `vds-marquee`, `vds-audio-track-progress`).

### Marquee-Konfigurationen (exakt)

```css
.trustScroll-animation  { animation: 12s linear infinite trustScroll }
.weeklyScroll-animation { animation: 30s linear infinite weeklyScroll }
.coachesScroll-animation{ animation: 15s linear infinite coachesScroll }
@media (min-width:993px) { .weeklyScroll-animation { animation: none } }
```
Die `scrollLeft` / `scrollRight` (20s linear infinite) und die `chip*`-Animationen
existieren im CSS, sind im ausgelieferten HTML aber nicht angewendet.
Einzige im HTML genutzte Animationsklasse: `animate-qr-scan` (1x).

**Payout-Marquee-Maske (Inline-Style, exakt):**
```html
style="mask-image:linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);
       -webkit-mask-image:linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)"
```
Track: `<div style="transform:none" class="flex gap-[3rem] will-change-transform">`,
Karten: `h-[11.5rem] w-[39.75rem] border-l-2 border-[#1aa87f] bg-white/[0.07]`.

### Button-Hover (Signatur-Effekt)

Jeder CTA hat drei Ebenen mit identischem 500ms-Übergang:
```html
<div class="absolute top-0 left-0 w-full h-full transition-transform duration-500
            group-hover:-translate-y-full button-bg"></div>
<div class="absolute top-0 left-0 w-full h-full transition-transform duration-500
            translate-y-full group-hover:translate-y-0 button-bg-hover"></div>
<div class="relative leading-none overflow-clip">
  <div class="transition-transform duration-500 group-hover:-translate-y-full button-text">Get Funded for 9$</div>
  <div class="absolute top-0 left-0 transition-transform duration-500 translate-y-full group-hover:translate-y-0 button-text-hover">Get Funded for 9$</div>
</div>
```
Fläche, Flächen-Hover und Text fahren gleichzeitig von unten nach oben, mit
Clipping am Container (`overflow-clip` / `overflow-hidden`).
`duration-500` = `.5s`, `transition-transform`.

**Button-Basis (`.button`):**
```css
.button { width:100%; min-height:6rem; font-family:var(--font-geist),sans-serif;
  justify-content:center; align-items:center; gap:2rem;
  padding-left:3.5rem; padding-right:3.5rem;
  font-size:2.25rem; font-weight:600;
  transition-property:all; transition-duration:.3s;
  transition-timing-function:cubic-bezier(0,0,.2,1);
  animation-duration:.3s; animation-timing-function:cubic-bezier(0,0,.2,1) }
```

**Farb-Kombinationen der Button-Varianten:**

| Variante | Fläche | Fläche Hover | Text | Text Hover |
|---|---|---|---|---|
| `button-green` | `rgb(48 127 106)` | `rgb(0 0 0)` | `#fff` | `#fff` |
| `button-white` | `rgb(255 255 255)` | `rgb(63 162 136)` | `#000` | `#fff` |
| `button-default` | `rgb(0 0 0)` | `rgb(48 127 106)` | `#fff` | `#fff` |
| `button-outline` | transparent | transparent | `rgb(227 227 227)` | `#fff` |
| `button-ghost` | transparent | transparent | `#000` | `#000` |
| `button-outline-black` | transparent | `#000` | `#000` | `#fff` |
| `button-discord` | `#fff` | transparent | `rgb(92 106 243)` | dito |
| `button-yellow` | `#f0d691` | `#a3deb2` | `#000` | `#000` |
| `button-dark-glow` | Gradient `#003828` + `inset 0 0 15.9px #fffc` | `rgb(226 242 243)` | `#e2f2f3` | dito |

**Shine-Variante (`.button-shine`):**
```css
.button-shine { opacity:0; width:calc(100% + 2rem); height:calc(100% + 2rem);
  transition: all .3s ease-out .1s; top:-1rem; left:-1rem }
.button-shine .button-light { background:linear-gradient(115deg,#0000 30%,#ffebc32b,#0000 70%);
  transition:transform .3s ease-out; transform:translate(-100%) }
/* Hover: */ .button-shine { opacity:1 }
              .button-light { transform:translate(0) }
              .button-icon  { transform:rotate(-45deg); transition:all .2s ease-out }
```
Ein 115-Grad-Lichtstreifen fährt über den Button, das Icon dreht auf -45 Grad.

### Sticky- und Scroll-getriebene Sektionen

- **Sticky-Prozess-Panels (home S12):** drei Container
  `lg:sticky lg:top-[10rem] lg:w-[157.875rem]`.
- **Sticky-Story-Slider (home S16):**
  `<section style="min-height:500rem">` mit innenliegendem
  `<div class="sticky top-0 flex h-[135rem] flex-col gap-[8rem] overflow-clip bg-[#001b14]">`.
  500rem Scroll-Strecke bei Root `font-size:.416667vw` sind bei 1440 px Viewport
  3.000 px Scrollweg für einen 810 px hohen Sticky-Viewport. Die Story-Karten
  werden über `will-change:transform, opacity` und
  `style="z-index:5;will-change:transform, opacity;opacity:1;transform:none"`
  gesteuert.
- **Fortschrittsbalken:** 1x `w-[4rem] bg-[#12f0b4]` (aktiv),
  4x `w-[3rem] bg-white/20` (inaktiv), jeweils
  `transition-[width,background-color] duration-300`.

### Reduced Motion

**Sehr dünn.** Nur 2 Stellen im gesamten System:

```css
@media (prefers-reduced-motion:reduce){ .motion-reduce\:hidden{ display:none } }
```
und im HTML **ein** Element: `<div class="pointer-events-none absolute inset-0
overflow-hidden motion-reduce:hidden">` um die QR-Scan-Animation.
Die 335 Reveal-Wrapper, die 4 Marquee-Animationen und der 500rem-Sticky-Slider
haben **keine** Reduced-Motion-Behandlung. Die restlichen 9
`prefers-reduced-motion`-Blöcke im CSS stammen alle aus Vidstack
(`.vds-*`-Selektoren), nicht aus dem eigenen Code.

### Hover-Effekte (Häufigkeit im HTML, gezählt)

| Klasse | Anzahl | Wirkung |
|---|---|---|
| `hover:-translate-y-full` | 26 | Button-Text fährt hoch |
| `hover:translate-y-0` | 26 | Button-Fläche fährt nach |
| `hover:text-black` | 27 | Link-/Textfarbe |
| `hover:opacity-50` | 19 | Bilder dimmen |
| `hover:bg-black` | 6 | Fläche |
| `hover:text-white` | 6 | Text auf Fläche |
| `hover:opacity-60` | 4 | sekundär |
| `hover:bg-black/5` | 3 | Karten-Hintergrund |
| `hover:scale-[1.06]` | 1 | Play-Button (`transition-transform duration-500 ease-out`) |
| `hover:brightness-95` | 1 | Bild |
| `group-hover:grayscale-0` | 2 | Logo-Farbwechsel |
| `group-hover:delay-200` | 2 | Verzögerung im Logo-Hover |

### Zähler, Parallax, Autoplay

- **Zähler-Animationen:** keine belegt. Die Stats (`20,000+`, `4.7 / 5`, `48h`,
  `$3.5M+`) stehen als statischer Text im HTML.
- **Parallax:** keine belegte `background-attachment`- oder
  `translateY(scrollY)`-Logik. Der Sticky-Slider ist der Ersatz.
- **Video-Autoplay:** nur in YouTube-`<iframe allow="... autoplay ...">` auf der
  Startseite (66 Treffer für `youtube`, mehrere `youtube.com/embed/`-Frames).
  Das Hero-Video hat `preload="none"` und startet per Klick.
- **Textmarker-Effekt:** H1 und H2 nutzen
  `background:linear-gradient(to top, #E2F3EF 55%, transparent 55%)` mit
  `box-decoration-break:clone`. Nur auf `em`-Spans innerhalb der Headline.

---

## Synthese

### Seitentyp-Blueprints

**A) Startseite (22 Sektionen)**
1. Sale-Banner, Full-bleed, sticky
2. Hero, Zentriert, Video + Testimonial-Marquee
3. Logo-Wall, Marquee
4. Pricing-Tabs + Plan-Karten, Tabs + Grid
5. Plattform-Integration, 2 Spalten
6. Stats-Leiste, 4er-Grid
7. Trust-Bar (TÜV), Zentriert-schmal
8. Weltkarte, Full-bleed mit Pins + Stats-Marquee
9. Payout-Beweis, Zentriert + Bild-Marquee
10. Testimonials, Slider, `lg:py-[25rem]`
11. Benefits-Bento, Bento mit Trustpilot-Stats
12. Prozess-Steps, 3 sticky Panels
13. Timeline, Zigzag
14. Benefit-Karten, Bento 8 Karten
15. Team/Coach-Grid, 12 Karten
16. Erfolgsgeschichten, Sticky-Horizontal-Slider (500rem Scrollweg)
17. Live-Payouts, 2 Marquee-Reihen mit Mask-Fade
18. Zitat-Block, 3 Zitate
19. Lead-Magnet WhatsApp, 2 Spalten mit QR
20. Ratgeber-Teaser, Karten-Grid
21. Community/Social, 4er-Grid
22. Final-CTA + Footer, Full-bleed `#04271d`

**B) Leistungsseite (`/crypto`, `/futures`, `/cfd`, 10 Sektionen)**
1. Hero mit Zielmarkt-Zahl im H1 (`$2,000,000` / `$1,000,000`), 4 Chips
2. Leer-Placeholder
3. Pricing-Tabs + Plan-Karten
4. Plattform-Integration
5. Asset-Liste gruppiert mit Anzahl je Gruppe
6. Plattform-Detail mit Feature-Bullets
7. Payout-Versprechen, 3er-Grid
8. Payout-Bild-Grid
9. Final-CTA mit Markt-Claim
10. Footer mit Risk-Disclaimer

**C) Konversions-/Erklärseite (`/how-it-works`, `/why-prop-trading`)**
1. Hero mit Chip
2. Prozess-Steps Stufe 1
3. Profit-Rechner (Slider)
4. Prozess-Steps Stufe 2
5. Feature-Block (Instant Funding / Vergleichstabelle)
6. Prozess-Steps Stufe 3
7. FAQ-Akkordeon mit 5 Fragen
8. Final-CTA

**D) Über uns (`/about-us`, 8 Sektionen)**
1. Hero mit Kapitalzahl im H1
2. Werte-Grid, 3er
3. Gründer-Story, Zigzag mit nummerierten Schritten
4. Gründer-Zitat, Zentriert
5. Verifizierte Performance, Karten-Grid
6. Beweis-Dokumente (Bankbelege), Screenshots
7. Partner-Logo-Marquee + Tech-Team-Text
8. Final-CTA

**E) Ratgeber-Übersicht (`/success-stories`, 6 Sektionen)**
1. Hero mit Chip `Reviews`
2. Leer-Placeholder
3. Payout-Beweis-Block
4. Testimonial-Slider
5. Benefits-Bento (Variante `2,340+ traders` statt `20,000+`)
6. Final-CTA

**F) Artikel (`/success-stories/<slug>`, 3 Sektionen)**
1. Artikel-Header: Kategorie-Chip + Datum + H1, 2 Hintergrundbilder (mobil/Desktop)
2. Fließtext mit chronologischer H2-Struktur (~2.600 Wörter)
3. `You might also like` mit 2 Karten und `Read more`
   **Kein** Inhaltsverzeichnis, **keine** Autorenbox, **keine** Lesezeit,
   **kein** FAQ, **kein** Schema Article, **keine** internen Links im Text.

**G) Funnel (`checkout.iqcapital.io`, extern)**
Eigene ASP.NET-Anwendung mit Bootstrap. Einstieg über 15 Preset-URLs,
die direkt auf ein Produkt zeigen. Keine eigene Landingpage-Formularstrecke.

**H) FAQ (`/faq`, 2 Sektionen)**
1. Hero mit Suchfeld
2. 200 Accordion-Items in 10 Kategorien mit Jump-to-Navigation

### Die 5 stärksten Muster

**1. Zwei-Ebenen-Button mit fließendem Text und Fläche.**
Fläche und Text bewegen sich gleichzeitig von unten nach oben, exakt 500ms.
Das ist der häufigste Animationsbaustein der Site (26 Vorkommen auf der
Startseite) und wird auf jeden CTA angewendet, auch im Footer.
Beleg home.html:
```html
<div class="absolute top-0 left-0 w-full h-full transition-transform duration-500 group-hover:-translate-y-full button-bg"></div>
<div class="absolute top-0 left-0 w-full h-full transition-transform duration-500 translate-y-full group-hover:translate-y-0 button-bg-hover"></div>
<div class="transition-transform duration-500 group-hover:-translate-y-full button-text">Get Funded for 9$</div>
<div class="absolute top-0 left-0 transition-transform duration-500 translate-y-full group-hover:translate-y-0 button-text-hover">Get Funded for 9$</div>
```

**2. Trust-Beweis durch Mengen statt durch Adjektive.**
Der Beweis wird über konkrete, wiederholte Zahlen geführt:
`20,000+ Active Traders`, `4.7 / 5`, `48h`, `$3.5M+`, `52 Countries`, `4,8 ★`.
Diese vier Werte laufen als Endlos-Marquee an 4 Stellen der Startseite
(Sektionen 8, 9, 21, 22) und auf jeder Unterseite. Dazu 20 namentliche
Live-Payout-Einträge mit Land und Betrag, 12 Payout-Bildkacheln und
12 namentliche Partner mit Followerzahlen. Ein einziger Anti-Claim
(`While others profit from your resets, we count payouts.`) verbindet das
mit der Konkurrenz.
Beleg home.html RSC-Payload:
`"livePayoutsItems":[{"amount":"$$4,320","country":"🇩🇪 Germany","name":"Lukas M."},...]`

**3. Sticky-Scroll als Ersatz für Karussells.**
Zwei Sektionen nutzen sticky Container mit extrem langen Scroll-Strecken:
Prozess-Steps `lg:sticky lg:top-[10rem]` (3 Panels, je eigener Farbchip
`#65896f` / `#1AA87F` / `#103037`) und der Story-Slider mit
`min-height:500rem` außen und `sticky top-0 h-[135rem]` innen. Der
Fortschrittsbalken (`w-[4rem] bg-[#12f0b4]` aktiv gegen `w-[3rem] bg-white/20`)
visualisiert den Stand. Beleg home.html:
```html
<section class="relative w-full" style="min-height:500rem">
  <div class="sticky top-0 flex h-[135rem] flex-col gap-[8rem] overflow-clip bg-[#001b14]">
```

**4. Viewport-gekoppelte rem-Skala statt Media-Query-Kaskade.**
Ein einziges Inline-Style steuert die gesamte Proportion:
```css
:root{font-size:.363636vw}
@media (width<=1920px){:root{font-size:.416667vw}}
@media (width<=992px){:root{font-size:50%}}
@media (width<=639px){:root{font-size:1.83908vw}}
```
Deshalb stehen im ganzen Markup rem-Werte, die auf den ersten Blick absurd
wirken (`lg:w-[229.875rem]`, `lg:py-[15rem]`, `min-height:500rem`,
`text-[7rem]`). Das ist kein Fehler, sondern die Konsequenz der Skala. Vorteil:
echtes fluid sizing ohne `clamp()`. Nachteil: die Werte sind ohne den
Root-Kontext nicht lesbar, und die Bildgrößen müssen manuell nachgezogen werden
(`style="color:transparent;width:240rem;height:auto"` an einem 1920x1080-Bild).

**5. Sanfter Marquee mit Mask-Fade an beiden Rändern.**
Statt harter Schnittkanten wird der Track über eine 12%-Maske ausgeblendet:
```html
<div class="relative w-full overflow-hidden" style="mask-image:linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);-webkit-mask-image:linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)">
  <div style="transform:none" class="flex gap-[3rem] will-change-transform">
```
Dauer je Track: 12s (trustScroll, fixe -99.5rem), 15s (coachesScroll),
30s (weeklyScroll, nur mobil, `@media (min-width:993px){animation:none}`),
20s (scrollLeft / scrollRight). Alle `linear infinite`.

### Animation-Rezepte

**Rezept 1: CTA mit fließender Fläche und fließendem Text (exakte Seitenwerte)**

```html
<button class="group button cta button-white button-shape-square relative flex w-full
               items-center justify-center gap-[1.25rem] overflow-clip"
        data-type="white" data-size="default" data-shape="square">
  <div class="absolute inset-x-0 top-0 h-full transition-transform duration-500
              group-hover:-translate-y-full button-bg"></div>
  <div class="absolute inset-x-0 top-0 h-full transition-transform duration-500
              translate-y-full group-hover:translate-y-0 button-bg-hover"></div>
  <div class="relative overflow-clip leading-none">
    <div class="transition-transform duration-500 group-hover:-translate-y-full button-text">Get Plan</div>
    <div class="absolute left-0 top-0 transition-transform duration-500
                translate-y-full group-hover:translate-y-0 button-text-hover">Get Plan</div>
  </div>
</button>
```
Werte: Property `transform`, Dauer `.5s` (`duration-500`), Easing Tailwind-Default
`cubic-bezier(.4,0,.2,1)`, Trigger `:hover` am Group-Container.
Farben `button-white`: Fläche `#fff`, Fläche-Hover `rgb(63 162 136)`,
Text `#000`, Text-Hover `#fff`. Radius `.25rem` (`data-shape="square"`).

**Rezept 2: Framer-Motion-Scroll-Reveal mit serverseitigem Anfangszustand**

```tsx
// Server-Render: Inline-Style setzt den Startzustand
<div style={{ opacity: 0, transform: 'translateY(24px)' }}>{children}</div>

// Client: Framer Motion hebt ihn beim Viewport-Eintritt auf
import { motion } from 'motion/react'
const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
}
export const RevealBlock = ({ children }: { children: React.ReactNode }) => (
  <motion.div {...reveal}>{children}</motion.div>
)
```
Werte belegt: `whileInView` in
`motion.variantPriorityOrder = ["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"]`
(`js/0i_hnjo~7k8h~.js`); Default-Transition im selben Chunk
`{duration:.45, ease:[.4,0,.1,1]}`. Die vier Y-Varianten der Seite: 8px, 16px,
20px, 24px. Bild-Reveal nutzt `filter: blur(8px)` zusätzlich.

**Rezept 3: Marquee mit Mask-Fade (exakte Seitenwerte)**

```css
@keyframes weeklyScroll {
  0%   { transform: translate(0) }
  to   { transform: translate(calc(-50% - 1.25rem)) }
}
.marquee-track {
  animation: 30s linear infinite weeklyScroll;
  will-change: transform;
}
@media (min-width: 993px) { .marquee-track { animation: none } }  /* Desktop: stehendes Grid */
```
```html
<div class="relative w-full overflow-hidden"
     style="mask-image:linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);
            -webkit-mask-image:linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)">
  <div class="marquee-track flex gap-[1.25rem] will-change-transform">
    <div class="flex shrink-0 gap-[1.25rem]">{items}</div>
    <div class="flex shrink-0 gap-[1.25rem]" aria-hidden="true">{items}</div>
  </div>
</div>
```
Der zweite Track ist die Kopie und muss `aria-hidden="true"` tragen.
Fixe Variante ohne Kopie: `@keyframes trustScroll { to { transform: translate(-99.5rem) } }`,
`12s linear infinite`.

**Rezept 4: Sticky-Scroll-Blende mit Fortschrittsbalken**

```html
<div class="relative w-full bg-[#001b14]">
  <section class="relative w-full" style="min-height:500rem">
    <div class="sticky top-0 flex h-[135rem] flex-col gap-[8rem] overflow-clip bg-[#001b14]">
      <div class="mx-auto flex w-[min(145rem,calc(100%-8rem))] flex-col items-center gap-[2rem] pt-[12rem] text-center">
        {/* Chip, H2, CTAs */}
      </div>
      <div class="flex flex-col items-center justify-center">
        <div class="relative flex w-[min(160rem,calc(100%-8rem))] items-center gap-[4rem]">
          <div class="flex w-[4rem] shrink-0 flex-col gap-[1.75rem]">
            <div class="h-[0.375rem] rounded-full transition-[width,background-color] duration-300
                        w-[4rem] bg-[#12f0b4]"></div>
            <div class="h-[0.375rem] rounded-full transition-[width,background-color] duration-300
                        w-[3rem] bg-white/20"></div>
            <!-- 3 weitere inaktive Balken -->
          </div>
          <div class="relative min-w-0 flex-1 overflow-hidden" style="height:91rem">
            <motion.div style={{ zIndex: 5, willChange: 'transform, opacity' }}>{slide}</motion.div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
```
Der Scroll-Fortschritt wird aus der äußeren 500rem-Strecke berechnet und auf
`will-change:transform, opacity` der inneren Slides abgebildet.
Punkt-Übergänge: `transition-[width,background-color] duration-300`.

**Rezept 5: Textmarker-Hervorhebung in Headlines (exakte Seitenwerte)**

```html
<span class="text-[#003828]"
      style="background:linear-gradient(to top, #E2F3EF 55%, transparent 55%);
             box-decoration-break:clone;
             -webkit-box-decoration-break:clone">
  <span class="!font-blacker"><em class="pr-[.125em] font-normal">#1 in Prop Trading</em></span>
</span>
```
Eine harte 55%-Kante erzeugt einen Marker-Effekt hinter der zweiten Textzeile.
`box-decoration-break:clone` sorgt dafür, dass der Streifen bei Zeilenumbruch
auf jeder Zeile neu beginnt. Drei Farbpaare im Einsatz: `#E2F3EF` auf weißem
Grund, `#083628` auf `#001b14`, plus dieselbe Technik an den Sektions-H2.

**Rezept 6: QR-Scan-Animation (nur hierfür existiert die Reduced-Motion-Regel)**

```html
<div class="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden">
  <div class="h-1/4 w-full animate-qr-scan border-b-[0.25rem] border-[#5ef0c0]
              bg-gradient-to-b from-transparent"></div>
</div>
```
```css
@keyframes qr-scan {
  0%    { transform: translateY(-100%) scaleY(1) }
  49.9% { transform: translateY(400%)  scaleY(1) }
  50%   { transform: translateY(400%)  scaleY(-1) }
  to    { transform: translateY(-100%) scaleY(-1) }
}
.animate-qr-scan { animation: 3.2s cubic-bezier(.4,0,.2,1) infinite qr-scan }
```
Der Scan läuft hinunter und gespiegelt wieder hinauf, in einem Durchlauf.
Belegt in home.html und all.css.

### Anti-Patterns / Schwächen

1. **Kein Schema.org.** 0 `application/ld+json` auf 16 geprüften Seiten. Für
   eine YMYL-Kategorie (Finanzdienstleistung) verschenkt das Rich Results und
   Entitäten-Klarheit. Beleg: `grep -c 'application/ld+json' *.html` = 0.

2. **`lang="de"` bei englischen Inhalten.** Alle 16 Seiten tragen
   `<html lang="de">`, der Text ist Englisch. Screenreader lesen englischen
   Text mit deutscher Phonetik. `hreflang` fehlt komplett.

3. **Kein Consent-Banner, aber GTM und PostHog aktiv.** `GTM-W6PLH6ZW` und
   `CSPostHogProvider` laden ohne vorgeschaltete Zustimmung. 0 Treffer für
   Usercentrics, Cookiebot, consentmanager, Cookiefirst. Bei
   EU-Traffic ein Haftungs- und Abmahnthema.

4. **Reduced Motion praktisch nicht umgesetzt.** Von 335 Reveal-Wrappern,
   4 Marquee-Animationen und dem 500rem-Sticky-Slider hat genau 1 Element
   (`motion-reduce:hidden` am QR-Block) eine Behandlung.

5. **Kein noscript-Fallback.** 0 `<noscript>`-Tags. Ohne JavaScript bleiben
   mindestens 15 Elemente auf der Startseite dauerhaft auf `opacity:0`.

6. **Widersprüchliche Kernzahl beim Profit Split.** Auf `/pricing`
   `The first $10,000 are 100% yours. After that, we split 80:20 — you keep 80%.
   Always.` Gegen `90% profit split` auf Startseite, `/crypto`, `/futures`,
   `/payout` und im Hero-Chip. Zwei sich ausschließende Zahlen auf derselben
   Domain.

7. **Widersprüchliche Trader-Zahlen.** `20,000+ traders` (Startseite, 3x) gegen
   `2,340+ traders` (im Benefits-Bento auf `/payout` und `/success-stories`).
   Die kleinere Zahl ist die glaubwürdigere und steht in der Copy direkt neben
   der größeren.

8. **`sitemap.xml` liefert 404.** 39 interne Routen, keine Sitemap. Kein
   `sitemap.xml`-Verweis in der robots.txt.

9. **`/faq` mit 200 Accordion-Items in 2 Sektionen.** Die gewählte Lösung ist
   ein Suchfeld plus Jump-to-Navigation, aber die Seite ist als einzelne
   DOM-Last von 277 KB ausgeliefert. Kein Content-Split, kein FAQPage-Schema.

10. **Zwei leer gerenderte Sektionen.** Auf `/crypto`, `/futures`, `/cfd` und
    `/success-stories` liefert Sektion 2 exakt 1 Zeichen Text. Sichtbar als
    leerer Block im Layout.

11. **Artikel ohne jede Verlinkung.** `/success-stories/robertrother` hat
    0 interne Links im Artikeltext bei 2.602 Wörtern. Kein Inhaltsverzeichnis,
    keine Autorenbox, keine Lesezeit, kein FAQ, kein Zwischen-CTA.

12. **Kontaktseite ohne Formular.** `/contact-us`: 0 `<input>`, 0 `<form>`.
    Nur Live-Chat und eine `mailto:`-Adresse.

13. **Bilder als SVG verpackte Rasterdaten.** Partner-Logos liegen mit
    `"lqip":"data:image/png;base64,..."` in der Payload und als `.svg`
    ausgeliefert. Alt-Texte sind Dateinamen wie
    `new-logo-full.74d5b1c8 1.svg` und `Mask group (2).svg`.

14. **Kein `fetchpriority="high"` am Hero-Bild, 140 von 141 Bildern `lazy`.**
    Das LCP-Element wird vom Browser nicht priorisiert behandelt.

15. **Tippfehler in kundenseitig sichtbaren Texten:** `potencial` statt
    `potential` (4 Seiten), `Contact U|s` im Title von `/contact-us`,
    `Partner with IQ Capital.Grow together.` und `Let's build somethingthat
    lasts.` auf `/become-a-partner`, `Get Funded for 9$` gegen
    `Get Funded for $9` im selben Funnel.

16. **CTA-Text wird nicht mit dem Ziel synchronisiert.** 8 Startseiten-CTAs
    heißen `Get Funded for 9$`, führen aber teils auf `?coupon=80FUNDING`
    mit anderem Rabatt. Der Button-Text ist nicht der Preis, den der Nutzer
    im Checkout sieht.

### Conversion-Mechanik in 5 Sätzen

Die Site verkauft nicht ein Produkt, sondern eine Risiko-Umkehr: der Hero
adressiert in 21 Wörtern drei konkrete Regeln (End-of-Day-Drawdown, 2 verziehbare
Breaches, kein Tagesverlustlimit), die alle dasselbe Versprechen tragen, nämlich
dass ein einzelner Fehler nicht das Konto kostet. Der Preisanker `$9` steht in
8 von 13 CTAs und in jedem Hero, senkt die Eintrittsschwelle unter jede
Vergleichszahl und macht den Kauf zur Kleinigkeit statt zur Investition.
Der Beweis wird nicht behauptet, sondern quantifiziert und wiederholt:
`20,000+` Trader, `$3.5M+` ausgezahlt, `52` Länder, `4.7 / 5`, plus 20 namentliche
Payout-Einträge und 12 Gesichter mit Followerzahlen, an vier Stellen der
Startseite als Marquee. Alle CTAs laufen in einen externen Checkout mit
15 Preset-URLs, der ohne Zwischenschritt, ohne Formular und ohne Zustimmung
zur Zahlung führt und damit jeden Reibungsverlust zwischen Klick und Kauf
entfernt. Was fehlt, ist die Belastbarkeit der eigenen Zahlen: der Profit Split
widerspricht sich zwischen 90% und 80:20, die Trader-Zahl zwischen 20.000 und
2.340, und der Rabatt im Button (`9$`) ist nicht der Rabatt im Checkout
(`80FUNDING`), was Vertrauen genau dort beschädigt, wo die Seite es am
stärksten aufbaut.

---

## Abrufprotokoll

Werkzeug: `curl -sL -m 30 -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36"`.
Arbeitsverzeichnis: `/tmp/site-iqcapital/`.

### HTML-Seiten

| URL | HTTP | Bytes |
|---|---|---|
| https://www.iqcapital.io/ | 200 | 1.443.827 |
| https://www.iqcapital.io/pricing | 200 | 566.947 |
| https://www.iqcapital.io/crypto | 200 | 529.988 |
| https://www.iqcapital.io/futures | 200 | 517.825 |
| https://www.iqcapital.io/cfd | 200 | 536.580 |
| https://www.iqcapital.io/how-it-works | 200 | 237.322 |
| https://www.iqcapital.io/about-us | 200 | 222.125 |
| https://www.iqcapital.io/faq | 200 | 277.947 |
| https://www.iqcapital.io/success-stories | 200 | 426.293 |
| https://www.iqcapital.io/success-stories/robertrother | 200 | 204.336 |
| https://www.iqcapital.io/success-stories/turkan | 200 | 149.829 |
| https://www.iqcapital.io/reviews | 200 | 265.832 |
| https://www.iqcapital.io/contact-us | 200 | 123.634 |
| https://www.iqcapital.io/why-prop-trading | 200 | 206.301 |
| https://www.iqcapital.io/manifesto | 200 | 164.444 |
| https://www.iqcapital.io/general-rules | 200 | 255.417 |
| https://www.iqcapital.io/payout | 200 | 714.752 |
| https://www.iqcapital.io/become-a-partner | 200 | 226.468 |
| https://www.iqcapital.io/de/pricing | 200 | 560.596 |
| https://checkout.iqcapital.io/products?presel=advanced-50k | 200 | 11.669 |

**20 HTML-Seiten abgerufen, 19 davon auf www.iqcapital.io.**

### Nicht abrufbar

| URL | HTTP | Anmerkung |
|---|---|---|
| https://www.iqcapital.io/sitemap.xml | 404 | Liefert Next.js-Fehlerseite (30.138 Bytes), keine Sitemap |

### Textdateien

| URL | HTTP | Bytes |
|---|---|---|
| https://www.iqcapital.io/robots.txt | 200 | 55 |

### Stylesheets

| URL | HTTP | Bytes |
|---|---|---|
| /_next/static/chunks/0i308op-6fqh2.css | 200 | 379.425 |
| /_next/static/chunks/0cywcsm0k2-f8.css | 200 | 386.021 |
| /_next/static/chunks/0qgt4i.mpbt4b.css | 200 | 67.500 |
| /_next/static/chunks/0togo5l_e-7ze.css | 200 | 29.363 |
| /_next/static/chunks/01vquo-o0u0op.css | 200 | 11.476 |
| Summe (kombiniert `all.css`) | | 873.785 |

### JavaScript-Chunks (26 Dateien, 4,3 MB)

Alle `/_next/static/chunks/*.js?dpl=dpl_2S5DKMt3yMWiStLFEqATahhUZbex`,
alle HTTP 200. Ausgewertet wurden `0th5h2d1a6d1e.js` (2.466.567 B, GSAP +
ScrollTrigger), `0i_hnjo~7k8h~.js` (127.895 B, Framer Motion + IntersectionObserver),
`0.o7qz6wmkq.~.js` (392.004 B, Radix), `0ia2-h-~49qn_.js` (209.883 B, Vidstack),
`0ag11c~g-5rey.js`, `0rq8snzqqrnry.js`, `0oxoi7l2su61w.js`, `0k_u91uigne7k.js`
(PostHog), `0g5i.gikk9x_h.js`, `02u2rnz3bcba0.js`, `0q0x69ti2toje.js`.
Vollständige Dateiliste unter `/tmp/site-iqcapital/js/`.

### Inline-Ressourcen

| Typ | Anzahl | Beleg |
|---|---|---|
| `application/ld+json` | 0 | home.html, 16 Seiten geprüft |
| Inline-`<style>`-Blöcke | 1 | `:root{font-size:.363636vw}` (168 Bytes) |
| Inline-`<script>`-Blöcke | 46 | home.html, überwiegend `self.__next_f.push` |
| `prefers-reduced-motion`-Blöcke im CSS | 11 | davon 9 aus Vidstack, 1 eigener, 1 Duplikat |
</total_tokens>
