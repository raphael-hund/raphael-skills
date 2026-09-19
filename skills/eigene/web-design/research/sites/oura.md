# ouraring.com/de

Hinweis zur Zeichensetzung: In diesem Bericht steht kein Gedankenstrich mit Leerzeichen als Stilmittel. Vier Stellen mit " – " sind wörtliche Zitate aus `<title>` und Meta-Description der Seite und bleiben unverändert, weil der Brief wörtliche Zitate verlangt.

## Steckbrief

| Feld | Wert |
|---|---|
| Domain | ouraring.com (deutsche Version unter `/de`) |
| Branche | Consumer Health Tech, Smart Ring, Wearable + Abo-Mitgliedschaft |
| Seitentyp | E-Commerce-Marketing-Hybrid: DTC-Shop, Produktseiten, Feature-/Wissenschaftsseiten, eigener Blog |
| Sprache | Deutsch (`<html class="nojs" lang="de">`, home.html:42) |
| Anrede | durchgehend Du ("Verbessere deine Gesundheit", "Hol dir beim Bezahlen dein kostenloses Probeabo") |
| Stack | Next.js App Router (RSC-Flight-Payload `self.__next_f`), Tailwind CSS v4, Framer Motion ("motion"), TypeScript-Chunks |
| Blog-Stack | WordPress (getrennter Unterbau unter `/blog`, WPML 4.9.7, Yoast SEO, WP Rocket 3.23.3.3) |
| Consent | OneTrust (`cdn.cookielaw.org/scripttemplates/otSDKStub.js`, Domain-Script-ID vorhanden) |
| Seiten in Sitemap | 80 URLs in `growth/sitemap.xml` (79 mit hreflang de), dazu 2528 Blog-Posts + 804 Kategorien + 23 Blog-Pages + 31 Autoren |
| Sprachen | 17 hreflang-Varianten: ar, cs, da, de, en (x-default), es, fi, fr, he, hi, it, ja, ko, nb, nl, sv, zh-CN, zh-TW |
| Analysierte Seiten | 16 Hauptseiten vollständig plus 1 404-Kontrollabruf (15 im Detail seziert) |

**Abrufhinweis:** `robots.txt` erlaubt alles außer `/cart`, `/checkout`, `/my-account`, `/orders`. Die Sitemap zeigt nur 80 nicht-Blog-URLs, weil produktive Blog-Inhalte in einem separaten WordPress-Sitemap-Index liegen.

## Sitemap

`https://ouraring.com/sitemap.xml` (191 Bytes) verweist nur auf `https://ouraring.com/growth/sitemap.xml` (192063 Bytes, 80 `<loc>`).

**Hauptseiten (Auswahl aus `growth/sitemap.xml`, alle ohne /de-Präfix in der Datei):**

Produkt und Shop: `/store`, `/store/rings/oura-ring-5`, `/store/rings/oura-ring-4`, `/store/rings/oura-ring-4-ceramic`, `/store/rings/oura-ring-5/{gold,silver,deep-rose,stealth,brushed-silver,black}`, `/store/accessories/*` (6 Ladegeräte/Cases), `/store/gift-card`, `/store/dexcom/stelo-glucose-biosensor`, `/sizing`, `/compatibility`, `/ceramic-kit`, `/ceramic-care`, `/gift`, `/extend`

Mitgliedschaft und Preis: `/membership`, `/hrm-terms-and-conditions`, `/oura-purchase-terms`

Features: `/why-oura`, `/how-it-works`, `/app`, `/integrations`, `/sleep-and-rest`, `/activity-and-movement`, `/heart-health`, `/heart-rate-monitoring`, `/stress`, `/womens-health`, `/metabolic-health`, `/perimenopause`, `/fitness`, `/health-radar`

Wissenschaft und Trust: `/science-and-research`, `/clinical-and-science-experts`, `/trust-center`, `/psti-soc`, `/newsroom`

Unternehmen: `/about-us`, `/leadership`, `/careers`, `/careers/privacy`, `/contact`, `/developer`, `/germany`, `/best-buy/store-locator`

Recht: `/privacy-policy`, `/terms-and-conditions`, `/cookie-policy`, `/impressum`, `/accessibility`, `/intellectual-property-notice`, `/declarations-of-conformity`, `/fcc-compliance-statements/*`, `/regulatory-notices-ca`, `/shipping-information`, `/previous-terms-and-conditions`, `/guidelines-for-commercial-use`, `/social-use-agreement`, `/tc/*`

**Blog (separater Index `https://ouraring.com/blog/sitemap_index.xml`):**
`post-sitemap.xml` 1001 URLs, `post-sitemap2.xml` 999, `post-sitemap3.xml` 528 (davon 95 mit `/blog/de/`), `page-sitemap.xml` 23, `category-sitemap.xml` 804, `author-sitemap.xml` 31. Summe 3386 Einträge. `reviewed-by-sitemap.xml` existiert ebenfalls im Index.

**Nicht abrufbar:** `https://ouraring.com/de/videositemap.xml` liefert HTTP 500. `https://ouraring.com/de/blog` und `https://ouraring.com/de/blog/de/...` liefern HTTP 404 (der Blog liegt außerhalb des /de-Präfix). `https://ouraring.com/blog/de/sitemap.xml` liefert HTTP 404.

## Seiten

### 1. Startseite `/de`

- **URL:** https://ouraring.com/de (1510903 Bytes)
- **`<title>`:** "Oura Ring – der Smart-Ring für Fitness, Stress, Schlaf und Gesundheit."
- **Meta-Description:** "Verbessere deine Gesundheit mit Oura. Mit dem Oura Ring hast du Schlaf, Fitness und Stress rund um die Uhr im Blick. Jetzt HSA/FSA-förderfähig."
- **H1:** "Diskret. Leistungsstark." (home.html:42)
- **H2:** 6, **H3:** 12
- **Schema.org:** 2 JSON-LD-Blöcke; Typen: `Organization` (mit fehlerhafter `url: https://0.0.0.0:3000/de`)
- **Canonical:** `https://ouraring.com/de`; **hreflang:** 16 Alternates inkl. `x-default`
- **Medien:** 12 Bilder (11 mit `srcSet`, 11 `loading=lazy`, 1 `fetchPriority=high`, 11 `decoding=async`), 1 Video (Hero)

**Sektionsliste in DOM-Reihenfolge**

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 0 | Announcement-Bar | "Hol dir beim Bezahlen dein kostenloses Probeabo für Natural Cycles – die App zur hormonfreien Schwangerschaftsverhütung" | keine | Full-bleed, 1 Zeile, `bg-sandstone-200` | keine | "Jetzt kaufen" (im Text verlinkt) | Partner-Nennung Natural Cycles | `data-cy="eyebrow-cta-message"`, `z-[60]` |
| 1 | Sticky Header + Mega-Menü | "Jetzt kaufen" (als Button-Label) | keine | Full-bleed sticky, `min-h-[90px]` | Logo-SVG | "Jetzt kaufen", "Gesundheitsfunktionen", "Oura nutzen", "Für Unternehmen", "Menü" | Warenkorb-Status | `header.top-0.sticky`, `transition-all duration-500`, Mega-Panel mit `backdrop-blur-[2rem]` |
| 2 | Hero (Video, Full-bleed) | "Diskret. Leistungsstark." | "Der kompakteste Smart-Ring der Welt." (5 Wörter) | Full-bleed, `h-svh`, zentriert | Autoplay-Video stumm, Poster-Bild mit `fetchPriority="high"` | "Mehr erfahren" → `/store/rings/oura-ring-5` | keine im Hero | `class="relative isolate h-svh bg-sandstone-200"`, Innen-Wrapper `lg:rounded-b-xl` |
| 3 | Benefits-Intro | "Verstehe deinen Körper. Behalte die Kontrolle über deine Gesundheit." | "Oura gibt dir Erkenntnisse über deinen Körper, sodass jeder Tag zu einem längeren, gesünderen Leben beiträgt." | Zentriert-schmal (22-Spalten-Raster, `md:col-start-5 md:col-end-21`) | keins | "Die Vorteile von Oura" → `/why-oura`, "So funktioniert Oura" → `/how-it-works` | keine | H2 in 56 / 60 / 68 px, `tracking-[-2.04px]`, `text-balance` |
| 4 | Feature-Slider (6 Karten) | H3-Karten: "Schlafe besser als je zuvor", "Lebe nicht nur länger, sondern auch gesünder", "Rücke deine Fitnessziele in den Fokus", "Höre auf das, was dein Herz dir sagt", "Verstehe die Frauengesundheit in all ihren Facetten", "Geh deinem Stress auf den Grund" | je Kartenlabel als Eyebrow ("Schlaf und Erholung", "Wohlbefinden und Langlebigkeit", "Aktivität und Fitness", "Herzgesundheit", "Frauengesundheit", "Stress") | Carousel, Snap-Slider (`ul.no-scrollbar.snap-x.snap-mandatory`), je Karte 4x4-Grid | 6 Bilder + Overlay-Pills mit `backdrop-blur-xl` | keine Buttons, Karten sind `aria-label`-Regionen | keine | Karten `h-[388px] w-[80vw] md:h-[658px] md:w-[493px]`, Fortschrittsbalken `scaleX` |
| 5 | Stats-Block mit Zähler-Aussage | "86 % der Oura-Mitglieder stellen eine Verbesserung ihres Gesundheitszustands fest. 1" | "Verfolge über 50 Messparameter zu deiner Gesundheit und erhalte personalisierte Rückmeldungen zu deinem Schlaf, deiner Aktivität, deinem Stress und mehr, alles in der Oura-App." + "Verfügbar für iOS und Android." | Zentriert-schmal, 2 Blöcke | 1 großes App-Collage-Bild (`aspect-2600/1341`) | "Entdecke die Mitgliedschaft" → `/membership` | Zahl 86 % mit Fußnoten-Anker `#legal-footnotes` (Studie 2026, 3501 Mitglieder, 30 Tage) | Abschnitt `py-10 lg:px-8 lg:py-20` |
| 6 | Testimonial-Karten (3) | "Das sagen Oura-Mitglieder" (sr-only) | Kategorien: "Herzgesundheit", "Symptommelder", "Frauengesundheit" | 3er-Grid auf `md:flex-row`, Karten `bg-sandstone-400`, `rounded-lg` | 3 Profilfotos | keine | 3 namentliche Zitate ("Tim S.", "Tabitha P.", "Ashley W."), eines mit Arzt-Zitat | Erste Karte: "Mein Kardiologe sagte zu mir ... der Ring hat mir das Leben gerettet." |
| 7 | Presse + empfohlener Artikel | "PRESSESTIMMEN" (Eyebrow) / "EMPFOHLENER ARTIKEL" | Blog-Titel "How Oura Measures Sleep and Validates Accuracy" | Bento: 2x2-Raster, linke Hälfte Presse-Slider, rechte Hälfte Artikelkarte | 3 Presse-Logos + Artikelbild, Gradient-Overlay `from-transparent to-black opacity-40` | "Mehr erfahren" → `/blog/de/how-oura-measures-sleep-and-validates-accuracy/` | Drei Presse-Titel wörtlich: The Guardian ("Ein atemberaubender Generationensprung bei den Smart-Ringen"), Esquire ("schlanker, als wir es uns hätten träumen können"), CNET ("Der neue Goldstandard") | Sektion `py-8 lg:py-16 bg-gray-600` |
| 8 | Legal-Fußnoten | keine Headline | keine | Zentriert-schmal | keine | "1" (Anker) | Studie mit Datum und Stichprobe | `id="legal-footnotes"` |
| 9 | Footer | "Zahlungsoptionen" / "Erhalte die neuesten Beiträge, Tipps und Angebote von Oura" | "Der Schutz deiner Daten ist uns wichtig. Erfahre mehr in unserer Datenschutzerklärung." | 2-spaltig + Rechtszeile | 7 Zahlungs-Logos (Klarna, PayPal, Apple Pay, Google Pay, Visa, Mastercard, American Express) | Newsletter-Feld, Sprachwahl-Button "Deutsch" | Adresse "Oura Health Oy, Elektroniikkatie 10, 90590 Oulu, Finland", Copyright 2026 | Der 4-spaltige Link-Grid-Container ist im ausgelieferten HTML **leer** (`<div class="grid w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4"></div>`) |

**Hero-Formel:** H1 ist ein Markenversprechen in 2 Wörtern ohne Nutzenbezug. Subline 5 Wörter. 1 CTA ("Mehr erfahren"). Kein Trust-Signal im Hero. Medium: stummgeschaltetes Autoplay-Video mit Poster-Fallback. Höhe: `h-svh` (100svh, `main.css`: `.h-svh{height:100svh}`).

**CTA-Strategie:** 5 Button-Links (`data-cy="button-link"`) auf der ganzen Seite: "Mehr erfahren" (Ring 5), "Die Vorteile von Oura", "So funktioniert Oura", "Entdecke die Mitgliedschaft", "Mehr erfahren" (Blog). Alle führen auf eigene Unterseiten. Sticky-Header-CTA: ja, "Jetzt kaufen" im Header. Telefonnummer im Header: nein, auf keiner der 17 geprüften Seiten gibt es einen `tel:`-Link.

**Trust-Staffelung:** (1) Hero: kein Trust. (2) Stats-Block: 86-%-Mitgliederzahl mit Studien-Fußnote. (3) Testimonials: 3 namentliche Mitglieder-Zitate, ein medizinisches Outcome. (4) Presse: drei namentliche Testberichte. (5) Footer: Zahlungslogos und DSGVO-Hinweis.

**Funnel/Formular:** Nur ein Formular, das Newsletter-Feld im Footer (`<form data-cy="footer_email_signup" noValidate>`, Input `aria-label="E-Mail-Adresse"`). Kein Multi-Step, keine Fortschrittsanzeige. Persönliche Daten erst beim Checkout.

**Footer:** Zwei Blöcke statt klassischer Spalten. Block 1: "Zahlungsoptionen" mit 7 Logos links, Newsletter-Headline + E-Mail-Feld rechts. Block 2 nach Trennlinie: Rechtslinks (AGB, Datenschutzerklärung, Barrierefreiheit, EU-Konformitätserklärung, Urheberrecht), Copyright-Zeile, Sprachwahl-Button, Firmenadresse und Impressum-Link. Keine Ortslisten, keine Social-Icons im ausgelieferten HTML (Label-Keys `footer_social_heading`, `instagram`, `pinterest`, `tiktok`, `facebook` existieren in den JS-Bundles, werden auf /de aber nicht gerendert).

### 2. Produktseite Ring 5 `/de/store/rings/oura-ring-5`

- **URL:** https://ouraring.com/de/store/rings/oura-ring-5 (1632816 Bytes)
- **`<title>`:** "Der Oura Ring 5: Der Smart-Ring zur Verfolgung von Schlaf, Fitness, Gesundheit & Erholung | Oura"
- **Meta-Description:** "Der Oura Ring 5. Jetzt mit einem um 40 % kompakteren Design aus Titan und bis zu neun Tagen Akkulaufzeit für Einblicke in Schlaf, Aktivität, Stress, Herzgesundheit und Erholung. Entdecke die Kollektion."
- **H1:** "Integriert sich perfekt"
- **H2:** 9, **H3:** 34
- **Schema.org:** `Product` mit `AggregateOffer` (lowPrice 429.00, highPrice 529.00, priceCurrency EUR, offerCount 6), `OfferShippingDetails` (15.00 EUR nach DE, Handling 0 bis 1 Tag, Transit 2 bis 4 Tage), `MerchantReturnPolicy` (30 Tage, kostenlos), `BreadcrumbList`, `WebPage`
- **Canonical:** `https://ouraring.com/de/store/rings/oura-ring-5`; **hreflang:** 16
- **Medien:** 42 Bilder (38 `srcSet`, 40 lazy, 4 `fetchPriority`), 3 Videos

**Sektionsliste in DOM-Reihenfolge**

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 0 | Announcement-Bar | (leer auf dieser Seite, `class="... hidden"`) | keine | 1 Zeile | keine | keine | keine | Banner wird pro Seite geschaltet |
| 1 | Sticky Header | "Jetzt kaufen" (Nav-Button) | keine | Full-bleed sticky | Logo | "Jetzt kaufen", "Gesundheitsfunktionen", "Oura nutzen" | Warenkorb | wie Startseite |
| 2 | Zweite Sticky-Nav (PDP) | Ring-5-Wortmarke als SVG | keine | Full-bleed, 1 Zeile | SVG-Logo | "Jetzt kaufen" → `/store/rings/oura-ring-5/silver` | keine | `nav.pointer-events-auto.fixed.top-0.z-100 ... transition-transform duration-500`, Zustand `-translate-y-full` bis Scroll-Trigger; `bg-sandstone-200/30 backdrop-blur-[2rem]` |
| 3 | Hero mit 3D-Ring und Radial-Gradient | H1 "Integriert sich perfekt" | "Der neue Oura Ring 5" (Eyebrow, H2) + "Der weltweit kompakteste Smart-Ring bietet dir Einblicke in über 50 Gesundheitskennzahlen." | Full-bleed, `h-svh`, Ring-Motiv als absolut positioniertes Quadrat `w-[250vw] md:w-[150vw]` | 2 Ring-PNGs, CSS-Radialgradient als Bühne | "Jetzt kaufen" → Variant-URL | keine im Hero | Gradient wörtlich: `radial-gradient(334.64% 412.19% at 194.27% -174.96%,#E3E5E7 10%,#C8CBCE 20%,#AFB1B5 30%,#96989D 40%,#7E8086 50%,#62646B 60%,#484950 70%,#2F3035 80%,#19191C 90%)` |
| 4 | Scroll-Sticky-Vergleich (200svh) | "40 % Schlanker. Leichter. Kompakter." | Zahl 40 % als Grafik | Sticky-Pin: `section.h-[200svh]` + `div.sticky.top-0.h-svh`, überlagerte Grid-Zellen | Ring 5 und Ring 4 Ceramic als freigestellte PNGs mit `clip-path`- und `scale`-Reveal | keine | keine | Framer-Motion-Mapping: `scrollYProgress` → `{clipPath: [100,0] bzw. [0,100], scale: [1, 0.47]}`, Range `[.1, 1]` |
| 5 | Film-Sektion | "Film anschauen" (Button-Label) | keine | Full-bleed, `lg:aspect-video` | Autoplay-Video, stumm, `preload="none"`, Poster | "Film anschauen" (Button mit Plus-Icon) | keine | `bg-gray-550 px-8 py-14`, Textschatten `0 0 8px rgb(0 0 0/0.15)` |
| 6 | Genauigkeits-Bento | "Neu entwickelt für noch mehr Genauigkeit" | "Hochpräzise Sensoren, die sich an deinen Körper anpassen und dir rund um die Uhr deine Gesundheitsdaten bereitstellen." | Bento: 2 asymmetrische Bildspalten (`col-start-main col-end-8 md:col-end-15`, dann `col-start-3 md:col-start-15`) | 2 Bilder in `rounded-3xl`, mobile/desktop-Art-Direction über `<source media>` | keine | 3 Zahlen-Kacheln: "99 % Messgenauigkeit der Herzfrequenz" (vs. EKG), "95 % Übereinstimmung der Schlafphasenanalyse" (vs. Schlaflabor), "90 % der Mitglieder fühlen sich gesünder" (NPS-Umfrage) | Zahlen in `size-15`-Kreisen mit `bg-gray-150` |
| 7 | Akku-Sektion (h-svh) | "1 Woche Akkulaufzeit nach einer einzigen Ladung." | keine | Full-bleed, Grid-Overlay über Hintergrund-Video | Autoplay-Video mit Poster | keine | keine | `section.relative.z-1.grid.h-svh` |
| 8 | Komfort-Sektion | "Langlebiges Design. Maximaler Tragekomfort." | "Wasserdichtes Titanium. Perfekt für den Alltag." | Full-bleed mit Hintergrund-Video | Video + Postermotiv | keine | keine | `mt-[12vh] lg:mt-[20vh]` |
| 9 | Feature-Tabs (6 Kategorien) | "Erfassung von Gesundheitsdaten rund um die Uhr" | 6 Tab-Labels: Schlaf, Aktivität und Fitness, Tagesform, Stress, Herzgesundheit, Frauengesundheit | Tabs, tablist als Snap-Slider (`ul.no-scrollbar.snap-x`), Panels mit bis zu 4 Detailkarten | App-Mockups | Tabs sind `<button role="tab">` | Detailtexte mit Messbezug pro Feature | Tab-Pille: `rounded-[100px] border-2 border-sandstone-500 bg-gray-550 text-sandstone-200`, aktiv via `aria-selected="true"` |
| 10 | Tech-Spezifikationen | "Technische Spezifikationen" (Eyebrow) | "Lieferumfang Oura Ring 5: Größenspezifisches Standard-Ladegerät, USB-C-Kabel" | Akkordeon, 6 Einträge: Sensoren, Kompatibilität, Gewicht und Abmessungen, Akkulaufzeit, Materialqualität, Konnektivität | keine | keine | Konkrete Hardwarespezifikation (Breite 6,09 mm, Dicke 2,28 mm, ab 2 g, 6 bis 9 Tage Akku, 100 m wasserdicht, IP68, BLE, EMF-sicher, FCC) | Sektion als gerundete Karte: `bg-[#E6E4E2] mx-4 rounded-[40px]` |
| 11 | Varianten-Karussell | "Wähle deine Ausführung" | 6 Varianten mit Preis: Gold 529 € (Überarbeitete Ausführung), Silver 429 €, Deep Rose 529 € (Neue Ausführung), Stealth 529 €, Brushed Silver 529 €, Black 429 € | Carousel mit Snap, Produktkarten `article.group` | 6 Ring-Renderings | "Jetzt kaufen" → `/store/rings/oura-ring-5/silver` (Default) | Preisangabe pro Variante | Karten `h-[240px] w-[240px] md:h-[336px] lg:h-[422px] lg:w-[360px]`; Variantenlabels `transition-all duration-1000 ease-in-out will-change-[left,transform]` |
| 12 | Legal-Fußnoten | keine | 3 Fußnoten (Genauigkeit, Vergleich, Akku) | Zentriert | keine | "1", "2", "3" | Quellenangaben inkl. DOI-Link `https://doi.org/10.3390/s21134302` | `id="legal-footnotes"` |
| 13 | Footer | wie Startseite | wie Startseite | wie Startseite | wie Startseite | wie Startseite | wie Startseite | identisch auf allen geprüften Seiten |

**Hero-Formel:** H1 "Integriert sich perfekt" ist kein Nutzen, sondern ein Designversprechen. Subline 12 Wörter plus Eyebrow. 1 CTA ("Jetzt kaufen"). Trust-Signal: keins im Hero, aber direkt darunter drei Prozentzahlen. Medium: Render plus CSS-Gradient, kein Foto. Höhe: `h-svh`.

**CTA-Strategie:** Nur ein CTA-Label auf der ganzen Seite: "Jetzt kaufen" (2 Vorkommen, plus die Sticky-Nav). Es führt immer nach `/store/rings/oura-ring-5/silver`; die Variantenwahl erfolgt über die sechs Karten links. Sticky-Header-CTA: ja (doppelt, Standard-Header und PDP-Nav).

**Trust-Staffelung:** (1) Genauigkeits-Bento mit drei Prozentzahlen. (2) Akku-Zahl "1 Woche". (3) Technische Spezifikationen mit Normbezug (IP68, FCC, EMF). (4) Fußnoten mit DOI-Links.

**Funnel/Formular:** Kein Formular. Kein Konfigurator im klassischen Sinn, die Größwahl passiert auf der Varianten-URL (`/silver` etc.).

**Footer:** identisch zur Startseite.

### 3. Produkt-Kaufseite (Variante) `/de/store/rings/oura-ring-5/silver`

- **URL:** https://ouraring.com/de/store/rings/oura-ring-5/silver (1609009 Bytes)
- **`<title>`:** "Oura Ring 5 kaufen: Smart-Ring in Silver für Schlaf, Gesundheit & Aktivität | Oura"
- **Meta-Description:** "Oura Ring 5 Silver entdecken. Der neue Smart-Ring aus Titan, jetzt 40 % kompakter, erfasst Schlaf, Aktivität, Stress, Herzgesundheit und Frauengesundheit. HSA/FSA-berechtigt"
- **H1:** "Oura Ring 5"
- **H2:** 7, **H3:** 14
- **Schema.org:** 2 JSON-LD-Blöcke, `Product`/`Offer`-Familie
- **Canonical:** `https://ouraring.com/de/store/rings/oura-ring-5/silver`; **hreflang:** 16
- **Medien:** 19 Bilder (6 `srcSet`, 5 lazy, 7 `fetchPriority`), 1 Video

**Sektionsliste in DOM-Reihenfolge**

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Kauf-Modul | H1 "Oura Ring 5" + "Der kompakteste Smart-Ring der Welt" | "Wähle deine Ausführung" mit 6 Optionen, "Größe", Hinweis "Die Größe unterscheidet sich von anderen Modellen", "Kostenloses Größenprobier-Set" | 2-Spalten: links Sticky-Galerie (`sticky top-0 lg:top-24`), rechts Kaufpanel | 6 Slides im Carousel | "Zum Warenkorb hinzufügen" (Button `data-cy="add-to-cart-button"`, Startzustand `pointer-events-none bg-...` = deaktiviert bis Größe gewählt), Größen-Info-Button, Slideshow-Pfeile | "Kostenlose und einfache Rücksendung innerhalb von 30 Tagen", "Eingeschränkte 1-Jahres-Garantie", "24/7-Support" (aus dem Shop-Kontext) | Produktinformationsleiste unten: `fixed bottom-4 z-90`, `bg-sandstone-200/85 backdrop-blur-sm`, Einblendung über `--product-info-bar-motion-y:100px` (mobil) / `20px` (ab md) |
| 2 | Nutzen-Bento mit Zahlen | "Kleiner Ring, große Wirkung" | Drei Aussagen: "40 % kompakter", "über 50 Gesundheitsmetriken", "6 bis 9 Tage Akkulaufzeit" | Bento, hervorgehobene Zahlen im Fließtext | 1 App-Bild | keine | Drei belegte Produktzahlen | Sektion `py-10 lg:pt-28 lg:pb-20` |
| 3 | Mitgliedschafts-Brücke | "Oura gibt deinem Körper eine Stimme" | "Die Oura-Mitgliedschaft bietet personalisierte Einblicke, einen KI-Gesundheitsbegleiter und immer die neusten Funktionen, alles in der Oura-App. Verfügbar für iOS und Android." | 2-Spalten, links Text, rechts Bild | App-Screenshot | keine | Kategorie-Pillen: Herzgesundheit, Schlaf und Erholung, Aktivität und Bewegung, Stress, Frauengesundheit, Metabolische Gesundheit | verbindet Kauf mit Abo |
| 4 | FAQ-Akkordeon | "Häufig gestellte Fragen" | 6 Fragen: Genauigkeit, Wasserdichtigkeit, erfasste Daten, Ladeintervalle, Größenfindung, plus eine weitere | Akkordeon, `data-cy="accordion-v4"`, Items `rounded-lg bg-gray-300/40`, erster Eintrag `aria-expanded="true"` | keine | "Mehr erfahren" im Antworttext | Antwort mit Bezug auf "independent, peer-reviewed studies" und "gold-standard lab measurements" | Plus/Minus-Icon als 2 CSS-Balken, `duration-200 ease-in-out` auf der Opazität |
| 5 | Tech-Spezifikationen | "Technische Spezifikationen" | wie Ring-5-Seite, Karte in `bg-[#E7E0D9] rounded-[40px]` | Akkordeon | keine | keine | siehe Ring-5-Seite | Farbton weicht leicht ab (E7E0D9 vs. E6E4E2) |
| 6 | Footer | wie Startseite | wie Startseite | wie Startseite | wie Startseite | wie Startseite | wie Startseite | identisch |

**Funnel:** Die Seite enthält genau einen Conversion-Punkt: "Zum Warenkorb hinzufügen". Der Button ist vor der Größenwahl über `pointer-events-none` gesperrt. Danach folgt der Checkout (nicht analysiert, `robots.txt` sperrt `/checkout`). Persönliche Daten erst im Checkout.

### 4. Mitgliedschaft und Preise `/de/membership`

- **URL:** https://ouraring.com/de/membership (1555027 Bytes)
- **`<title>`:** "Oura-Mitgliedschaft."
- **Meta-Description:** "Schenke dir mehr Power – mit einer Oura-Mitgliedschaft."
- **H1:** "Oura-Mitgliedschaft"
- **H2:** 20, **H3:** 1
- **Schema.org:** kein JSON-LD
- **Canonical:** `https://ouraring.com/de/membership`; **hreflang:** 16
- **Medien:** 18 Bilder (17 lazy, 2 `fetchPriority`), keine Videos

**Sektionsliste in DOM-Reihenfolge**

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero | H1 "Oura-Mitgliedschaft", H2 "Persönlicher, intuitiver, ganz du" | "Ein umfassender Einblick in deine Gesundheit für nur 5,99 $ USD */Monat. Für neue Mitglieder ist der erste Monat kostenlos. Verfügbar für iOS und Android." | `lg:flex lg:h-auto lg:min-h-svh`, links Text, rechts App-Bild | App-Mockup | keiner im Hero sichtbar | Preisnennung, Hinweis "Erster Monat kostenlos" | Preis ist im SSR als "5,99 $ USD" gerendert, obwohl EU-Fußnote 5,99 EUR nennt (Diskrepanz durch SSR-Default) |
| 2 | App-Modul | "Oura-App" (Eyebrow) | "Die Oura-Mitgliedschaft und der Oura Ring ergänzen einander perfekt und helfen dir, einen gesünderen Lebensstil aufzubauen. Verfolge über 50 Messparameter ..." | Full-bleed-Bild + Zentriert-Text | App-Collage `aspect-2600/1341` | keine | H3 "5 Mio.+ Oura-Mitglieder" | Sektion `py-10 lg:py-20` |
| 3 | Benefit-Grid | 3 H2-Zeilen: "Dynamische Einblicke in Echtzeit", "Ein klares Bild deiner Gesundheit", "Langfristiges Wohlbefinden" | je 1 Satz | 3er-Grid | 3 Bilder | keine | Kategorien: Ruhepuls, Schritte, Kalorien, kardiovaskuläres Alter, Stressresilienz | H2-Größe `text-heading-sm` |
| 4 | Feature-Tabs mit Karussell | "Die Oura-Mitgliedschaft wächst mit dir" | "Mit der Oura-Mitgliedschaft stehen dir aufschlussreiche Daten zur Verfügung ... Als Oura-Mitglied erhältst du Zugang zum Oura Advisor (deinem KI-gestützten Gesundheitsbegleiter) ..." | 2-Spalten 50/50: links Karussell `aspect-square lg:aspect-[600/480]`, rechts Tab-Pillen | 6 Slides | 6 Pillen-Links: Schlaf und Erholung, Herzgesundheit, Aktivität und Bewegung, Stress, Frauengesundheit, Metabolische Gesundheit | Erwähnung des KI-Begleiters Oura Advisor | Pille: `rounded-full border border-current bg-transparent py-3`; Slide-Zähler als `sr-only` "Slide 1 von 4" |
| 5 | Testimonials | "Das sagen Oura-Mitglieder" | 3 Karten: Herzgesundheit, Schlaf, Frauengesundheit | 3er-Grid | 3 Portraits | keine | Zitat mit Diagnose-Outcome: "Ich ging zum Arzt und Tests ergaben, dass ich Vorhofflimmern habe." (Ted N.) | identische Zitat-Bausteine wie Startseite, andere Auswahl |
| 6 | Datenschutz-Versprechen | "Der Schutz deiner Daten steht an erster Stelle" | "Uns deine Gesundheitsdaten anzuvertrauen, ist eine wichtige Entscheidung ... Wir verpflichten uns dazu, deine Daten auf keinen Fall zu verkaufen und sie niemals ohne deine Zustimmung weiterzugeben." | 2-Spalten | Bild | "Mehr erfahren" → `/trust-center` | Kein-Verkauf-Versprechen | Sektion `bg-sandstone-200` |
| 7 | FAQ-Akkordeon | "Häufig gestellte Fragen" | 7 Fragen: Ring nötig? Ringwechsel? Kündigung? Ohne Abo? Startzeitpunkt? Datenverlust bei Kündigung? | Akkordeon, schmale Spalte | keine | keine | Antwort zur Kündbarkeit und zum Datenverbleib | Sektion `py-6 md:py-20` |
| 8 | Final-CTA | "Beginne deinen Weg zu mehr Gesundheit noch heute" | "Nimm deine Gesundheit in die Hand, für nur 5,99 $ */Monat. Der erste Monat geht auf uns ..." | Zentriert | keine | "Alle Produkte entdecken" → `/store` | Monatszahl plus Gratismonat | H2 in 56 px, `tracking-[-2.24px]` |
| 9 | Blog-Teaser | "Neuste Oura-App-Updates" (Eyebrow) | 4 Artikel: "Update von Oura Cycle Insights ...", "Inside the Ring: Welche Faktoren beeinflussen deine Nährwertanalyse?" (Nov. 2025), "Neues Feature Kumulativer Stress ..." (Nov. 2025), "Neu bei Oura: Laborwerte" (Okt. 2025) | Bento: 1 großer Artikel + 3 kleinere | Bilder | "Mehr erfahren" → `/blog/oura-cycle-insights-update` | Datumsangaben pro Artikel | Sektion `py-8 lg:py-16 bg-slate-200` |
| 10 | Legal-Fußnote | keine | Preisstaffel pro Land (USA 5,99 USD, EU 5,99 EUR, AU 9,99 AUD, CA 7,99 CAD, JP 999 JPY, UK 5,99 GBP, CH 5,99 CHF, Rest 6,99 USD) | 1 Zeile `text-sm` | keine | "*" (Anker) | vollständige Preisliste nach Region | `id="legal-footnotes"` |
| 11 | Footer | wie Startseite | wie Startseite | wie Startseite | wie Startseite | wie Startseite | wie Startseite | identisch |

**CTA-Strategie:** 2 Button-Links: "Mehr erfahren" (Blog) und "Alle Produkte entdecken" → `/store`. Alle sechs Feature-Pillen sind Marketing-Links, keine Buttons. Sticky-Header-CTA: ja.

**Funnel/Formular:** Kein Formular, kein Signup auf der Seite selbst. Der Weg zum Abo läuft über den Ring-Kauf. Das ist bemerkenswert: Das Abo ist der Umsatzträger, wird aber nicht direkt abschließbar gemacht. Microcopy neben Preis: "Für neue Mitglieder ist der erste Monat kostenlos."

### 5. Wissenschaftsseite `/de/science-and-research`

- **URL:** https://ouraring.com/de/science-and-research (1708670 Bytes)
- **`<title>`:** "Oura Ring: wissenschaftliche Forschung für mehr Gesundheit"
- **Meta-Description:** "Die wissenschaftlich fundierte Forschungsarbeit von Oura legt den Schwerpunkt auf einen gesunden Lebensstil. Erfahre mehr zu validierten Studien und Spitzentechnologie, die neuste Erkenntnisse zum Wohlbefinden liefern."
- **H1:** "Forschung und Wissenschaft"
- **H2:** 28, **H3:** 8
- **Schema.org:** kein JSON-LD
- **Canonical:** `https://ouraring.com/de/science-and-research`; **hreflang:** 16
- **Medien:** 17 Bilder (16 lazy, 7 `fetchPriority`), keine Videos

**Sektionsliste in DOM-Reihenfolge**

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero | H1 "Forschung und Wissenschaft", H2 "Verankert in der Wissenschaft, getragen von der Forschung" | "Unser Ansatz, klinische Forschung, innovative Technologie und Nutzer-Feedback miteinander zu verbinden, hilft uns dabei, den wissenschaftlich fundiertesten Smart-Ring zu entwickeln." | `lg:min-h-svh`, links Text | Hintergrundbild | "Mehr zu Oura in der Forschung" | keine | H1-Stil ist hier uppercase Eyebrow (`text-body-sm ... font-bold uppercase`), nicht Display-Typo |
| 2 | Zahlen-Leiste (4 Werte) | "Unser forschungsorientierter Innovationsansatz" | "Bei Oura entwickeln wir eine innovative Sensortechnologie, welche die höchsten wissenschaftlichen Standards übertrifft ..." | 4er-Grid unter Text | keine | keine | "50+ promovierte Forschende", "130+ Fachpublikationen", "12+ Jahre Forschung und Innovation", "14 aktive Partnerschaften mit akademischen und klinischen Instituten weltweit" | Sektion `py-20` |
| 3 | Genauigkeits-Werte | "Unschlagbare Genauigkeit" + H3 "Sensoren auf Forschungsniveau" | "Der Oura Ring verfügt über Sensoren, die sich perfekt an deinen Finger anpassen und dir rund um die Uhr genaue Daten liefern." | Slide-Karussell mit 4 Wertkarten | Sensor-Grafiken | keine | "99% Messgenauigkeit der Herzfrequenz r² (vs. EKG)", "98% Messgenauigkeit der Herzfrequenzvariabilität r²", "94% Erkennungsgenauigkeit des Eisprungs (vs. Ovulationstests)", "79% Messgenauigkeit der Schlafdaten (vs. klinische Polysomnographie bei 83 %)" | Jede Zahl mit Fußnotenmarker |
| 4 | Studien-Slider | "Unabhängig getestete Sensoren" | "Die Sensortechnologie des Oura Rings wurde auf internationaler Ebene in mehreren unabhängigen Publikationen mit Peer Review validiert, u. a. im Journal of Medical Internet Research, in Sensors und in Sleep Medicine." | Carousel über `gridContainerV3` | keine Bilder | keine | 3 Study-Titel wörtlich, u. a. "Das Versprechen des Schlafs: Ein Multisensor-Ansatz für die genaue Erkennung von Schlafphasen mithilfe des Oura Rings" | Sektion `pt-20 lg:pt-32` |
| 5 | Publikationsliste (6 Karten) | "Von Oura unterstützte Forschungsarbeiten wurden in über 130 Fachzeitschriften veröffentlicht" | "Führende Forschungsteams und Institutionen nutzen den Oura Ring in ihrer Forschung für ein besseres öffentliches Gesundheitswesen." | 3er-Grid, 6 Publikationen mit Journal und Datum | keine | "Oura-Forschungsdatenbank" → `https://ouraring.com/blog/oura-in-research/` | Journals namentlich: ScienceDirect (Mai 2025), npj Digital Medicine (Aug. 2024), Nature and Science of Sleep (Mai 2025), Sensors (Aug. 2024), PLOS Digital Health (Apr. 2024), Science Reporter (Feb. 2024) | Sektion `pt-20` |
| 6 | Forschungsfelder (Fließtext mit 5 Absätzen) | keine eigene Headline | 5 anonyme Beschreibungen von Studienfeldern | Zentriert, Fließtext | keine | keine | Nennt Duke University, Google Fitbit, UNC-Chapel Hill, National University of Singapore | Sektion `py-20` |
| 7 | Forschungshighlights | H3 "Highlights aus der von Oura durchgeführten Forschung" | 4 Karten mit Titel und Datum | Slide-Karussell, erste Karte als "Empfohlene Studie" gelabelt | keine | "Mehr erfahren" → `https://ouraring.com/blog/de/gondor-as-clinical-trial/` | Studien mit Datum: Aug. 2023, Sept. 2023, März 2023 | Sektion `bg-neutral-800 text-sandstone-500`, Fußnoten-Override `pt-20! pb-0!` |
| 8 | Medical Advisors | H3 "Die medizinischen Beraterinnen und Berater von Oura" | "Oura hat sich mit renommierten medizinischen Experten zusammengeschlossen, die in ihren jeweiligen Fachgebieten führend sind." | Slide-Karussell mit Personenkarten | Portraits | "Lerne unsere medizinischen Beraterinnen und Berater kennen" (2x) | Namentliche Titel: "Dr. Rebecca Robbins, PhD" (Harvard Medical School), "Dr. Elissa Epel, PhD" (UCSF), "Dr. Eleni Jaswa, MD, MSc, FACOG" (UCSF), "Jagmeet P. Singh, MD, ScM, DPhil" | Sektion `bg-neutral-800 text-sandstone-200 py-20` |
| 9 | Research-Partnerschafts-CTA | H3 "Oura als Antrieb deiner Forschung" | "Wir würden uns über eine Zusammenarbeit in künftigen klinischen Studien freuen." | 2-Spalten | keine | "Kontaktiere uns", "Oura for Business" | keine | Lead-Einstieg für B2B-Forschung |
| 10 | Footer | wie Startseite | wie Startseite | wie Startseite | wie Startseite | wie Startseite | wie Startseite | identisch |

**CTA-Strategie:** 2 Button-Links ("Oura-Forschungsdatenbank", "Mehr erfahren") plus 2 Text-CTAs. Diese Seite verkauft nicht, sie belegt.

**Trust-Staffelung:** Zahlen (50+, 130+, 12+, 14) → Genauigkeits-Prozente mit Fußnoten → Journals namentlich → Institutionen namentlich → externe Berater mit Uni-Titeln. Das ist die dichteste Trust-Kette der ganzen Site.

### 6. Warum Oura `/de/why-oura`

- **URL:** https://ouraring.com/de/why-oura (1737509 Bytes)
- **`<title>`:** nicht separat erhoben, identische Struktur wie Startseite
- **H1:** "Nimm deine Gesundheit in die Hand"
- **H2:** 10, **H3:** 13
- **Canonical:** `.../de/why-oura`; **hreflang:** 16
- **Medien:** 34 Bilder (32 `srcSet`, 31 lazy, 2 `fetchPriority`), 1 Video

**Sektionsliste in DOM-Reihenfolge**

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero | H1 "Nimm deine Gesundheit in die Hand" | "Die meisten Wearables liefern nur Daten. Oura erstellt daraus persönliche Empfehlungen, die dir helfen, deine Gesundheit im Blick zu behalten und bewusste Entscheidungen für dein Wohlbefinden zu treffen." | `lg:min-h-svh`, links Text | Hintergrundbild | keine im Hero | Eyebrow "Die Vorteile von Oura" | H1 ist hier `font-serif` in `text-heading-6xl` |
| 2 | Einzel-Stat | "86 % der Oura-Mitglieder stellen eine Verbesserung ihres Gesundheitszustands fest. 1" | keine | Zentriert, eine Zeile in `text-heading-6xl` auf Desktop | keine | keine | Zahl plus Fußnote | Sektion `py-20 lg:py-32` |
| 3 | 2-Spalten-Modul | "Vom Wissen zum Handeln" | "Deinen Körper zu verstehen ist nur der erste Schritt. Oura vermittelt Erkenntnisse über den Körper, gibt dir proaktive Empfehlungen und verbindet dich bei Bedarf mit der passenden medizinischen Fachkraft. 2" | 2-Spalten, Karussell rechts | App-Mockups | keine | Konzept "Oura Advisor" | Sektion `relative pb-20 lg:pt-20` |
| 4 | Zahlen-Grid | "Erfahrung und Forschung 12+ Jahre" | 4 Werte: "50+ promovierte Forschende arbeiten in unserem interdisziplinären Team im Bereich Medizin und Wissenschaft", "5 Generationen jede Generation intelligenter und leistungsfähiger als die vorherige", "5 Mio.+ Mitglieder weltweit vertrauen Oura" | 3er-Grid mit Zahlen | keine | keine | 4 Zahlen mit Einordnung | Sektion `relative pt-10 pb-20 lg:py-30` |
| 5 | Genauigkeits-Sektion (dunkel) | H2 "Genauigkeit beginnt am Finger" + H3 "Präzision auf jeder Ebene" | "Am Finger werden die Herzfrequenz, der Blutsauerstoff und die Körpertemperatur am genauesten gemessen. 3 Der Oura Ring erfasst mehr als 50 Messparameter mit einer Genauigkeit, auf die du dich verlassen kannst, und in einem Design, das langlebig, wasserdicht und so bequem ist, dass du ihn kaum spürst." | 2-Spalten, dunkler Grund `bg-gray-600 text-white` | 1 Bild | "Jetzt kaufen" → `/store` (2x) | 4 Genauigkeitswerte: "99 % Messgenauigkeit der Herzfrequenz r² im Vergleich zum EKG 4", "98 % Messgenauigkeit der Herzfrequenzvariabilität r²", "94 % Erkennungsgenauigkeit des Eisprungs Im Vergleich zu Ovulationstests 5", "79 % Genauigkeit der 4-Phasen-Schlafphasenanalyse 6" | H2 in `text-heading-8xl` auf xl; Sektion `pt-12 lg:pt-20` |
| 6 | Zeitverlauf-Modul | "Dein individueller Weg zu mehr Gesundheit" | "Dein Körper verändert sich von Tag zu Tag und damit auch seine Bedürfnisse. Oura lernt im Laufe der Zeit deine Muster kennen und präsentiert dir präzise Erkenntnisse, damit du besser verstehst, was dir guttut und was dich aus dem Gleichgewicht bringt." | 2-Spalten mit Monats-Chart (Juni, Juli, August) | App-Chart | keine | Zeitreihen-Visualisierung | Sektion `bg-sandstone-200 pt-16 lg:pt-30` |
| 7 | Datenschutz-Versprechen | "Der Schutz deiner Daten steht an erster Stelle" | wie Mitgliedschaftsseite, wortgleich | 2-Spalten | Bild | "Mehr erfahren" → `/trust-center` | Kein-Verkauf-Versprechen | Sektion `bg-sandstone-200` |
| 8 | Logo-Wall | "Führende Unternehmen und Organisationen vertrauen Oura" | keine | Logo-Wall: `ul.flex.flex-wrap` mit 14 Logos in `li.flex.size-15.md:size-30` (2 davon `hidden md:flex`) | 14 SVG-Logos in `rounded-3xl bg-gray-600 p-4 md:px-12 md:py-15` | keine | 14 Organisationen, visuell, ohne Namen im HTML (Logos ohne `alt`-Text) | Erster echter Logo-Wall der Site |
| 9 | Feature-Karussell (dunkel) | H2 "ENTDECKE DEINE MÖGLICHKEITEN" (uppercase) | 6 Karten: Schlaf und Erholung, Herzgesundheit, Aktivität und Fitness, Wohlbefinden und Langlebigkeit, Frauengesundheit, Stress | Carousel | Bilder | Karten sind Links | keine | Sektion `bg-gray-600 pt-16` |
| 10 | Footer | wie Startseite | wie Startseite | wie Startseite | wie Startseite | wie Startseite | wie Startseite | identisch |

**CTA-Strategie:** 2 Button-Links "Jetzt kaufen" → `/store` plus 1 "Mehr erfahren" → `/trust-center`. Keine Telefonnummer, kein Sticky-CTA außerhalb des Headers.

### 7. So funktioniert Oura `/de/how-it-works`

- **URL:** https://ouraring.com/de/how-it-works (1499045 Bytes)
- **`<title>`:** nicht separat erhoben
- **H1:** "Der Oura Ring liefert die Daten. Die Mitgliedschaft erklärt."
- **H2:** 8, **H3:** 0
- **Canonical:** `.../de/how-it-works`; **hreflang:** 16
- **Medien:** 11 Bilder, keine Videos

**Sektionsliste in DOM-Reihenfolge**

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero | H1 "Der Oura Ring liefert die Daten. Die Mitgliedschaft erklärt." | "Der Oura Ring erfasst die Signale deines Körpers. Mithilfe der Oura-Mitgliedschaft lernst du, sie zu verstehen, denn aus den Messparametern werden personalisierte Empfehlungen für mehr Wohlbefinden und langfristige Gesundheit." | Full-bleed, `bg-sandstone-200` | Hero-Bild | keine | keine | Eyebrow "So funktioniert Oura" |
| 2 | Tagesablauf-Timeline (5 Schritte) | "Morgendliche Gewissheit" (06:00), "Auf die Plätze, fertig, los" (12:00), "Finde deine innere Ruhe" (15:00), "Erkenne die Gewohnheiten" (18:00), "Zeit zum Abschalten" (22:00) | je 1 Satz mit Feature-Bezug | Zigzag: Text-Spalte wechselt zwischen `col-start-16 col-end-22` und Bild `col-end-15`, Zeitspanne als Pille | 5 Bilder in `aspect-[4/3] rounded-r-3xl` | keine | keine | Uhrzeit-Pille: `inline-flex w-fit items-center gap-4 rounded-full bg-sandstone-400 px-4 py-2`, Uhr-Icon `size-6` |
| 3 | Final-CTA | "Beginne deinen Weg zu mehr Gesundheit noch heute" | "Finde den richtigen Oura Ring für dich und reagiere darauf, was dein Körper dir sagt." | Zentriert | keine | "Alle Produkte entdecken" → `/store` | keine | Sektion `text-sandstone-500 py-20 xl:pt-24` |
| 4 | Footer | wie Startseite | wie Startseite | wie Startseite | wie Startseite | wie Startseite | wie Startseite | identisch |

**CTA-Strategie:** genau 1 Button-Link ("Alle Produkte entdecken"). Kein Kaufdruck, reine Erklärseite mit 241 Wörtern im Hauptbereich.

### 8. Über uns `/de/about-us`

- **URL:** https://ouraring.com/de/about-us (1454601 Bytes)
- **`<title>`:** nicht separat erhoben
- **H1:** nicht als H1 im Hauptbereich gefunden
- **H2:** 4, **H3:** 0
- **Sektionen:** 1
- **Medien:** 6 Bilder
- **Haupttext (wörtlich):** "Unsere Mission: zum Alltag zu machen Gesundheit. Unsere Identität liegt in unseren Wurzeln: in Finnland, bekannt als glücklichstes Land der Welt. Optimismus ist Teil unserer DNA und wir glauben fest daran, dass jeder Mensch ein ausgeglichenes Leben führen kann. Oura ist ein finnisches Präzisionsprodukt, dessen Design auf deinen Körper und Geist abgestimmt ist, damit du deine Gesundheit ganzheitlich verstehen und selbstbestimmt gestalten kannst."
- **CTA-Labels:** "Mehr erfahren" → `/trust-center`, "Mehr erfahren" → `/clinical-and-science-experts`
- **Trust:** Herkunft Finnland, Verweis auf Trust Center und Clinical/Science Experts

**Schwachstelle:** Diese Seite hat nur eine `<section>` und 4 H2. Der Seitenname verspricht Unternehmensgeschichte, liefert aber 474 Wörter. Team-, Gründer-, Standort- und Zahleninhalte fehlen im HTML. Die Navigation verlinkt `/leadership` separat.

### 9. Feature-Seite Schlaf `/de/sleep-and-rest`

- **URL:** https://ouraring.com/de/sleep-and-rest (1551982 Bytes)
- **H1:** "Schlaf und Erholung" (Eyebrow-Stil uppercase)
- **H2:** 16, **H3:** 8
- **Canonical:** `.../de/sleep-and-rest`; **hreflang:** 16
- **Medien:** 15 Bilder, keine Videos

**Sektionsliste in DOM-Reihenfolge**

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero | H1 "Schlaf und Erholung", H2 "Deeper insights, backed by science" (englisch!) | "Sleep is a whole-body state, not just brain activity. Oura gives you insights across every stage of the night, so you wake up knowing exactly how you slept and how to shape your day." (englisch!) | `lg:min-h-svh`, `min-h-[50vw]` | Bild | keiner | keine | **Sprachmix: Headline und Subline auf Deutsch nicht übersetzt** |
| 2 | Feature-Akkordeon/Tabs | Eyebrow "FUNKTIONEN IM ÜBERBLICK" | 4 Einträge: "Schlafwert", "Schlafphasen" (Text englisch: "Every night, your body moves through distinct stages of sleep ..."), "Sauerstättigung des Bluts", "Ruhemodus" | Tabs mit Slide-Zähler "1/4" | App-Mockups | keine | keine | 2 von 4 Beschreibungstexten englisch |
| 3 | Herkunfts-Sektion | "Die Grundlage für erholsame Nächte" | "With over a decade of research and innovation, Oura is the gold standard in wearable sleep tracking. Sleek, comfortable, and accurate, it's so easy you can do it with your eyes closed." (englisch!) | 2-Spalten | Bild | "Jetzt kaufen" → `/store/rings/oura-ring-5/silver` | "gold standard" als Behauptung ohne Quelle | Sektion ohne Klasse |
| 4 | Integrationen | "Integrationen" | "Deine Oura-Daten sind nicht nur in der Oura-App nützlich. Wir arbeiten mit einigen der führenden Gesundheits- und Wellness-Apps zusammen ..." | 3er-Grid | App-Icons | keine | Nennt Apollo, Ernährungs- und Schlaf-Apps | Sektion `py-16` |
| 5 | Final-CTA | "Gesünder und länger leben" | "Finde den richtigen Oura Ring für dich und reagiere darauf, was dein Körper dir sagt." | Zentriert | keine | "Alle Produkte entdecken" → `/store` | keine | Sektion `text-sandstone-200 py-20` |
| 6 | Blog-Teaser | Eyebrow "AUS UNSEREM BLOG THE PULSE" | "Empfohlener Artikel How Oura Measures Sleep and Validates Accuracy" + 3 Artikel: "Welche 4 Schlafphasen gibt es?", "Herzfrequenz im Schlaf: Kennst du diese 4 Muster?", "Was ist dein Chronotyp und welche Rolle spielt er?" | Bento | Bilder | "Mehr erfahren" | keine | Sektion `py-8 lg:py-16 text-slate-600 bg-slate-600` |
| 7 | Footer | wie Startseite | wie Startseite | wie Startseite | wie Startseite | wie Startseite | wie Startseite | identisch |

### 10. Shop-Übersicht `/de/store`

- **URL:** https://ouraring.com/de/store (1550181 Bytes)
- **`<title>`:** "Oura-Shop – Smarte Ringe und Zubehör"
- **Meta-Description:** "Entdecke alle Produkte, u. a. den Oura Ring 4, offizielle Größenprobier-Sets, Ladegeräte und Zubehör, um Schlaf, Fitness und Wellnessdaten noch genauer zu erfassen."
- **H1:** "Beginne jetzt deinen Weg zu mehr Gesundheit"
- **H2:** 9, **H3:** 17
- **Canonical:** `.../de/store`; **hreflang:** 16
- **Medien:** 30 Bilder

**Sektionsliste in DOM-Reihenfolge**

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 1 | Seitenkopf | H1 "Beginne jetzt deinen Weg zu mehr Gesundheit" | keine | Zentriert, `pt-48 pb-32` | keine | keine | keine | sehr viel Weißraum über der H1 |
| 2 | Produkt-Karussell Oura Ring 5 | H2 "Oura Ring 5 Ab 429 €" + Badge "Neu" | 6 Varianten mit Preis, 2 mit Zusatzlabel ("Überarbeitete Ausführung" bei Gold, "Neue Ausführung" bei Deep Rose) | Carousel mit Snap, Produktkarten | 6 Renderings | Karten sind `article.group` mit `cursor-pointer` | Preisab 429 € | Karten `h-[240px] w-[240px] md:h-[336px] lg:h-[422px] lg:w-[360px]` |
| 3 | Produkt-Karussell Ring 4 | H2 "Oura Ring 4 Ab 265,30 €" | 3 sichtbare Varianten mit Streichpreis (Gold 300,30 € statt 429 €, Silver 265,30 € statt 379 €, Stealth 265,30 € statt 379 €) | Carousel | Renderings | wie oben | Rabatt als Doppelpreis | Ersparnis ohne Prozentangabe |
| 4 | Produkt-Karussell Ring 4 Ceramic | H2 "Oura Ring 4 Ceramic 300,30 €" | 2 Varianten: Midnight, Cloud (je 300,30 € statt 429 €) | Carousel | Renderings | wie oben | Doppelpreis | |
| 5 | Service-Versprechen (4 Werte) | keine Headline | 4 Aussagen: "Sicherer Kaufvorgang", "Kostenlose und einfache Rücksendung Innerhalb von 30 Tagen nach dem Kauf", "Kostenloser Probemonat Für neue Oura-Mitglieder", "Eingeschränkte 1-Jahres-Garantie Erweiterte Optionen verfügbar", "24/7-Support Wir unterstützen dich rund um die Uhr" | Karte `rounded-3xl mx-6 my-16 md:rounded-5xl` | Icons | keine | 5 Service-Zusagen | Erste echte Service-Trust-Sektion |
| 6 | Zubehör | "Zubehör für den Oura Ring" | 5 Artikel: Ring-5-Charging-Case 109,00 €, Ring-4-Charging-Case 109,00 €, Ring-5-Charger 69,00 €, Ring-4-Ladegerät 69,00 €, Ring-Gen3-Ladegerät 69,00 € | Karussell/Karten | Produktbilder | "Zum Warenkorb hinzufügen" | Preisnennung | Sektion `px-6 pt-6 md:px-15 md:pt-20` |
| 7 | Partner-Offer | "Teste Natural Cycles° kostenlos als Verhütungsmethode Bereitgestellt von Oura Ring" | "Der Oura Ring erfasst nachts deine Temperaturtrends und synchronisiert die Daten automatisch mit Natural Cycles, der App zur hormonfreien Verhütung. Erhalte beim Kauf eines Oura Rings kostenlos eine exklusive 28-tägige Probemitgliedschaft." | 2-Spalten | Bild | "Mehr erfahren" | Fremdanbieter-Kennzeichnung "Bereitgestellt von" | Sektion `py-10 lg:py-20 bg-gray-100!` |
| 8 | Footer | wie Startseite | wie Startseite | wie Startseite | wie Startseite | wie Startseite | wie Startseite | identisch |

### 11. Ringgrößen `/de/sizing`

- **URL:** https://ouraring.com/de/sizing (1445368 Bytes)
- **`<title>`:** "So bestimmst du die richtige Größe für deinen Oura Ring"
- **Meta-Description:** (englisch, nicht übersetzt) "Are you ready to size your new Oura Ring? Finding the right size guarantees that your Oura ring will be a friendly companion for years to come. The Oura ring is available in 8 sizes, from US6 to US13. Confirm your size n..."
- **H1:** "Ringgrößen"
- **H2:** 6, **H3:** 0
- **Sektionen:** 4
- **Medien:** 1 Bild
- **Canonical:** `.../de/sizing`; **hreflang:** 16

**Sektionsliste**

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | Medien | CTA-Labels | Trust-Elemente |
|---|---|---|---|---|---|---|---|
| 1 | Hero | "Ermittle deine perfekte Passform" | keine | `relative min-h-screen lg:min-h-[540px]` | 1 Video/Bild | "Oura Ring 5-Video ansehen" | keine |
| 2 | Produkt-Hinweis Ring 5 | "Oura Ring 5" | "Der Oura Ring 5 ist unser bisher schlankester und leichtester Ring, erhältlich in den Größen 6 bis 13. Die überarbeitete Innenseite hat eine andere Passform als beim Oura Ring 4. Halte dich daher an die unten stehende Anleitung ..." | 2-Spalten | keine | "Video ansehen" | Größenspanne 6 bis 13 |
| 3 | Produkt-Hinweis Ring 4 | "Oura Ring 4" | "Der Oura Ring 4 ist in den Größen 4 bis 15 verfügbar. Befolge die unten stehende Anleitung, um deine Passform anhand eines Proberings zu bestätigen." | 2-Spalten | keine | "Video ansehen" | Größenspanne 4 bis 15 |
| 4 | Abschluss | H2 "Ringgröße bestätigen" | "Wenn du mit der Größe und Passform zufrieden bist, kannst du unten deine Größe bestätigen." | Zentriert | keine | "Ringgröße bestätigen" | keine |

**Funnel:** Die Seite ist ein Pre-Purchase-Tool ohne Fortschrittsanzeige und ohne Formularschritte im HTML. Der Ablauf läuft über Probering-Bestellung und Größenbestätigung im Konto.

### 12. Kontakt `/de/contact`

- **URL:** https://ouraring.com/de/contact (1434857 Bytes, keine `<section>`)
- **`<title>`:** "Du möchtest Oura kontaktieren? Hier geht's lang | Oura Ring"
- **Meta-Description:** "Du möchtest Oura kontaktieren? So geht's: Für Medienanfragen wende dich an press@ouraring.com Für Partnerschaftsanfragen wende dich an partnerships@ouraring.com Für andere Anliegen fülle bitte das Anfrageformular au..."
- **H1:** "Wir freuen uns, von dir zu hören"
- **H2:** 4, **H3:** 2
- **Medien:** 0 Bilder

**Struktur (keine `<section>`, reine `gridContainerV3`-Blöcke):**

| Nr | Block | Text wörtlich | Layout |
|---|---|---|---|
| 1 | Seitenkopf | "Wir freuen uns, von dir zu hören" | `py-24`, H1 über `col-main` |
| 2 | Kontaktwege | H2 "Kontakt" links, rechts: H3 "Oura-Support" ("Wirf bei Fragen einen Blick in unseren Mitgliedersupport-Bereich", Link `https://support.ouraring.com/hc/`) und H3 "Geschäfts-, Forschungs-, Medien- und Partnerschaftsanfragen" ("Fülle bitte das Anfrageformular aus", Link `https://s.ouraring.com/oura-partners-contact`) | 2-Spalten `col-main lg:col-end-12` / `lg:col-start-13 lg:col-end-main`, `bg-white py-16` |
| 3 | Standorte | H2 "Unsere Standorte" links, rechts: "Oura hat Standorte in San Francisco, San Diego, Helsinki und Oulu." | wie oben |
| 4 | Footer | wie Startseite | identisch |

**Funnel/Formular:** Kein Formular im HTML. Beide Anfragewege führen auf externe Subdomains (`support.ouraring.com`, `s.ouraring.com`). Die Kontaktseite ist bewusst als Weiche gebaut, nicht als Funnel.

### 13. Deutschland-Landingpage `/de/germany`

- **URL:** https://ouraring.com/de/germany (1522602 Bytes)
- **`<title>`:** "Oura Ring 5: Smart Ring für Schlaf, Fitness & Gesundheit"
- **Meta-Description:** "Entdecke den Oura Ring 5: Titan-Design, bis zu 9 Tage Akkulaufzeit & präzises Tracking für Schlaf, Stress & Erholung. Jetzt Smart Ring entdecken."
- **H1:** "Gesünder und länger leben"
- **H2:** 9, **H3:** 12
- **Sektionen:** 8
- **Medien:** 18 Bilder, 2 Videos

**Sektionsliste in DOM-Reihenfolge**

| Nr | Sektionstyp | Headline wörtlich | Subline gekürzt | Layout-Familie | CTA-Labels | Trust-Elemente |
|---|---|---|---|---|---|---|
| 1 | Hero | H1 "Gesünder und länger leben" | "Der Oura Ring hilft dir, deinen Körper zu verstehen und auf seine Bedürfnisse einzugehen." | Full-bleed, `bg-[#DEDDDB]`, responsive Padding-Stufen (`xs:pt-64 sm:pt-36 md:pt-56 lg:pt-40 xl:pt-24 xxl:pt-16`) | "Jetzt kaufen" | keine |
| 2 | Nutzen-Intro | "Erhalte ein ganzheitliches Bild deiner Gesundheit" | "Erkenne Trends bei Schlaf, Trainingseinheiten und vielen anderen Bereichen, alles auf dich und deine Ziele abgestimmt." | 2-Spalten, `bg-[#B8B7B2]` | keine | keine |
| 3 | Film | keine Headline | keine | Full-bleed Video | "Film anschauen" | keine |
| 4 | Vorteile + Genauigkeit (dunkel) | "Die Vorteile von Oura" | "88 % der Oura-Mitglieder stellen eine Verbesserung ihres Gesundheitszustands fest." + "Genauigkeit beginnt am Finger" | `bg-[#1C1C1C] text-white` | keine | 5 Werte: 88 %, 99 % Herzfrequenz, 98 % HFV, 94 % Eisprung, 79 % Schlafdaten. **Achtung: 88 % hier gegen 86 % auf Startseite und why-oura, also inkonsistente Kernzahl** |
| 5 | Messparameter-Grid | "Messparameter von Oura" | "Über 50 Gesundheitsmetriken, Tag und Nacht" mit 5 Karten: Schlaf, Tagesform, Stress, Frauengesundheit, Metabolische Gesundheit | 3er-Grid, `bg-gray-100 py-15 lg:pt-36 lg:pb-20` | keine | 5 Funktionsbeschreibungen |
| 6 | Preis + Sicherheit | "Erster Monat kostenlos /Monat 5,99 $ /Jahr 69,99 $" | "Der Oura Ring liefert die Daten. Die Mitgliedschaft erklärt. Verwandle deine Gesundheitsdaten in persönliche Erkenntnisse ... Enthält Oura Advisor, einen KI-gestützten Gesundheitsbegleiter, der Fragen auf der Grundlage deiner physiologischen Muster beantwortet." | 2-Spalten mit Preisblock | keine | "DSGVO-konform", "AES-256-Verschlüsselung", "TLS 1.2+-Verschlüsselung" plus Erklärtext zum Datenexport und Löschrecht |
| 7 | Wissenschaft (dunkel) | "Forschung und Wissenschaft" | "Verankert in der Wissenschaft, getragen von der Forschung. Bei Oura bilden klinische Forschung, wissenschaftlich begutachtete Studien und institutionelle Partnerschaften den Kern für die Entwicklung eines Smart-Rings, dem man vertrauen kann." | `bg-[#1C1C1C] text-white` | keine | 4 Zahlen: 50+ Forschende, 130+ Fachpublikationen, 12+ Jahre, 14 Partnerschaften |
| 8 | Varianten-Karussell | "Wähle deine Ausführung" | 6 Varianten mit Preis | Carousel, `bg-gray-100 pt-24 pb-32 lg:pt-28` | keine | Preisnennung |

**Anmerkung:** Diese Seite ist eine eigenständige Performance-Landingpage mit abweichender Farbpalette (`#DEDDDB`, `#B8B7B2`, `#1C1C1C` als Hex statt Marken-Tokens) und abweichender Kernzahl (88 %).

### 14. Blog-Übersicht `/blog/de/`

- **URL:** https://ouraring.com/blog/de/ (381847 Bytes)
- **`<title>`:** "Home - THE PULSE Blog"
- **Meta-Description:** leer
- **H1:** keiner (0 H1 auf der Seite)
- **H2:** 9, **H3:** 13
- **Schema.org:** `WebPage`, `ReadAction`, `BreadcrumbList`, `WebSite`, `SearchAction`, `Organization`
- **Canonical:** `https://ouraring.com/blog/`
- **Medien:** 66 Bilder (10 lazy, 8 `fetchPriority`)
- **Stack:** WordPress mit eigenem Theme ("look"), WPML, Yoast, WP Rocket, jQuery 3.5.1

**Struktur:**

| Nr | Typ | Inhalt wörtlich | Layout |
|---|---|---|---|
| 1 | Sprachleiste | 23 Sprachen (Deutsch, Čeština, Dansk, Nederlands, English, Suomi, Français, Italiano, 日本語, Norsk, Español, Svenska, العربية, Ελληνικά, עברית, हिन्दी, Magyar, 한국어, Polski, 繁體中文, Português, 简体中文) | oberste Zeile |
| 2 | Kennzeichnung | "Wir veröffentlichen kontinuierlich weitere Blog-Artikel in deutscher Sprache." | Hinweisbanner; nur 95 von 2528 Posts sind deutsch |
| 3 | Blog-Navigation | Kategorien: Entdecke Oura, Das Wichtigste über Oura, Oura & Wissenschaft, Ring-Technologie, News, Schlaf (Schlafgrundlagen, Vorteile von Schlaf, Schlaftipps, Schlafpositionen), Health (HFV, Frauengesundheit, Psychische Gesundheit & Stress, Herzgesundheit, Aktivität & Bewegung, Langlebigkeit, Metabolische Gesundheit, Krankheiten), Community (Mitglieder im Fokus, Tipps unserer Mitglieder, Aussagekräftige Daten), Für Unternehmen (Artikel, Case Studies, White Paper, Profile) | Mega-Menü mit 4 Gruppen und Untergruppen |
| 4 | Top-Artikel | "Demnächst: Neue Oura-Funktionen, die dir helfen, deine Gesundheit im Blick zu behalten", "Der neue Oura Ring 5: Der kompaktste Smart-Ring der Welt", "Inside the Ring: Entwicklung von Oura Ring 5", "Frühe Anzeichen zur frühzeitigen Intervention: Wir stellen vor: Health Radar" | Bento mit großem Aufmacher |
| 5 | Kategorie-Teaser | "Oura 101", "Meet the Community" | 2er-Grid |
| 6 | Featured Articles | 4 Artikel mit Autor und Datum: "Sleep Science at Oura: How We've Earned Our Position in the Scientific Community" (Massimiliano de Zambotti, PhD, 10. September 2026), "Oura Ring Selected as the Official Health Wearable of the Los Angeles Dodgers" (Oura Team, 9. September 2026), "ŌURA Brings Menopause Impact Scale into Clinical Care through Expanding Partner Network" (Oura Team, 2. September 2026), "Sleep Staging Is Not Guesswork" (Raphael Vallat, PhD, 28. August 2026) | Kartenliste mit Autor und Datum |
| 7 | Recent Articles | 5 weitere Artikelüberschriften | Kartenliste |
| 8 | Suche | 3 Suchformulare (mobil, desktop, off-canvas) mit `placeholder="Search"`, `placeholder="Search Blog"`, `placeholder="Search and hit enter…"` | Header |
| 9 | Footer | identische Rechtszeile wie Hauptseite, aber Copyright-Hinweis auf der Blog-Seite und Newsletter-Formular mit `data-cy="footer_email_signup"` | 2 Blöcke |

### 15. Blog-Artikel `/blog/de/how-oura-measures-sleep-and-validates-accuracy/`

- **URL:** https://ouraring.com/blog/de/how-oura-measures-sleep-and-validates-accuracy/ (401496 Bytes, HTTP 200; die Variante ohne Schluss-Slash liefert 404)
- **`<title>`:** "Standing Behind Our Science: How Oura Measures Sleep and Validates Accuracy - THE PULSE Blog"
- **Meta-Description:** "How accurate is Oura Ring sleep tracking? Learn how PPG technology, autonomic signals, and peer-reviewed studies validate Oura's sleep staging algorithms." (englisch)
- **H1:** "Standing Behind Our Science: How Oura Measures Sleep and Validates Accuracy"
- **H2:** 5: "How Does Oura Track Sleep?", "How Oura Compares to Polysomnography (PSG)", "The Research Behind Oura's Staging Algorithm", "Committed to Transparency", "FAQ: Oura's Sleep Tracking Science & Accuracy"
- **H3:** 15
- **Schema.org:** `Article` (wordCount 2716, datePublished 2026-08-23, dateModified 2026-08-25, articleSection ["Entdecke Oura","News","Das Wichtigste über Oura"], inLanguage "de-DE"), `WebPage`, `ImageObject`, `BreadcrumbList`, `WebSite`, `SearchAction`, `Organization`, `Person`
- **Canonical:** `https://ouraring.com/blog/how-oura-measures-sleep-and-validates-accuracy/` (**Canonical zeigt auf die englische URL, nicht auf die deutsche**)
- **hreflang:** 0 Alternates
- **Medien:** 45 Bilder (1 lazy, 3 `fetchPriority`), 0 Videos

**Artikel-Aufbau:**

| Element | Vorhanden? | Beleg |
|---|---|---|
| Inhaltsverzeichnis | ja, clientseitig generiert | Inline-Script `inserIndex()` baut `.sidebar_index` und `.mobile_index` aus `div.entry-content.single-entry > h2, > h3` und setzt IDs per `heading.textContent.split(" ").join("-").toLowerCase()` |
| Autor-Box | ja, in der Kopfzeile | "Author: Oura Team", "Published on: 23. August 2026", "Reviewed by: Shyamal Patel, PhD, SVP, Science at Oura" |
| Lesezeit | ja, im Meta | `twitter:data2` = "13 Minuten" |
| Datum | ja | `article:published_time` 2026-08-23, `article:modified_time` 2026-08-25 |
| Key-Takeaways-Box | nein | kein `takeaway`-Marker im HTML |
| Zwischen-CTAs | ja, als RELATED-Blöcke | "RELATED: Inside the Ring: Developing Oura's Latest Sleep Staging Algorithm", "RELATED: Independent Study Finds Oura Ring Most Accurate Wearable for HRV & RHR", "READ MORE: The Accuracy Advantages of Finger-Worn Wearable Devices" |
| Verwandte Artikel | ja | H3 "Featured Articles" mit 4 Artikeln, dazu "Neue Veröffentlichungen" |
| Newsletter-CTA | ja | H3 "Werde Teil der Community", Formular `id="newsletter-form"` mit Klasse `footer_email_signup` |
| FAQ | ja, als Fließtext-Q&A | H2 "FAQ: Oura's Sleep Tracking Science & Accuracy" mit 5 Fragen und ausführlichen Antworten |
| Schema `Article` | ja | siehe oben |
| Schema `FAQPage` | nein | nur `Article` im Yoast-Graph |
| Textlänge | 2162 Wörter im `entry-content`, 2716 laut Schema `wordCount` | |
| Anzahl Bilder im Artikel | 22 `<img>` im `entry-content`-Bereich | |
| Interne Links | hoch, u. a. auf `community`, `how PPG technology`, `algorithms`, `polysomnography (PSG)`, `research and accuracy`, `light sleep`, `REM`, `deep sleep`, `Sleep stages` | Linktext ist oft thematisch, nicht generisch |

**Artikel-Inhalt (Kern):** Der Text reagiert auf eine juristische Auseinandersetzung. Wörtlich: "A recent baseless, opportunistic legal allegation seeks to discredit how consumer wearables, including Oura Ring, track and estimate sleep stages. We dispute these allegations and stand firmly behind our research and accuracy." Der Artikel nennt 5 Studien mit Zahlen: Brigham and Women's Hospital 2024 (76,3 % 4-Stage, 92 % 2-Stage), National University of Singapore 2022 (76,4 % / 92 bis 93 %), NUS Multi-Device 2023 (91,1 % 2-Stage, kappa 0,64 gegen Fitbit Sense 89,4 % / 0,58), University of Tokyo 2024 (91,7 bis 91,8 % 2-Stage, kappa 0,83 bis 0,84 über 421045 Epochen), MDPI Sensors 2021 (79 % 4-Stage, 96 % 2-Stage aus 440 Nächten bei 106 Personen). Die FAQ entkräftet drei Vorwürfe ("sleep happens in the brain, not on the finger", "AI guesswork", "coin flip") und erklärt, was die "95 %" bedeuten.

**Anti-Pattern:** Der Artikel liegt unter `/blog/de/`, aber Canonical und der Title verweisen auf die englische Seite. Die Meta-Description ist englisch. Die H2-Struktur ist englisch. Ein deutscher Leser landet auf einer formal deutschen URL mit englischem Inhalt.

### 16. Nicht abrufbare oder gesperrte Seiten

| URL | Status | Grund |
|---|---|---|
| `https://ouraring.com/de/blog` | 404 | Blog liegt außerhalb des /de-Präfix |
| `https://ouraring.com/de/blog/de/how-oura-measures-sleep-and-validates-accuracy` | 404 | fehlender Schluss-Slash |
| `https://ouraring.com/de/videositemap.xml` | 500 | Serverfehler |
| `https://ouraring.com/blog/de/sitemap.xml` | 404 | falscher Pfad |
| `/cart`, `/checkout`, `/my-account`, `/orders` | gesperrt | `robots.txt` Disallow |
| `https://ouraring.com/b/a/ecom-website/v1.131.0/_next/static/chunks/5245-944843033cab5.js` | 403 | Chunk nur mit gültigem Referer abrufbar |

## Design-System

Alle Werte aus `main.css` (219638 Bytes, `/b/a/ecom-website/v1.131.0/_next/static/css/19bb4987485ff80c.css`), plus zwei Inline-`<style>`-Blöcke in jedem HTML.

### Fonts

Zwei Schriftfamilien, beide selbst gehostet als WOFF2, per Inline-`@font-face` deklariert:

```css
@font-face { font-family: 'AkkuratLL'; font-style: normal; font-weight: 400; src: url('/assets/fonts/AkkuratLL-Regular.woff2') format('woff2'); }
@font-face { font-family: 'AkkuratLL'; font-style: normal; font-weight: 300; src: url('/assets/fonts/AkkuratLL-Light.woff2') format('woff2'); }
@font-face { font-family: 'Editorial New'; font-style: normal; font-weight: 300; src: url('/assets/fonts/PPEditorialNew-Light.woff2') format('woff2'); }
@font-face { font-family: 'Editorial New'; font-style: normal; font-weight: 200; src: url('/assets/fonts/PPEditorialNew-Ultralight.woff2') format('woff2'); }
@font-face { font-family: 'Editorial New'; font-style: italic; font-weight: 200; src: url('/assets/fonts/PPEditorialNew-UltralightItalic.woff2') format('woff2'); }
```

- Body-Font: `--default-font-family: "AkkuratLL",sans-serif`, dazu `--font-sans: "AkkuratLL"`.
- Display-Font: `--font-serif: "Editorial New"` (eine Serifenschrift von Pangram Pangram, PP Editorial New).
- Nur 5 Schnitte insgesamt: AkkuratLL 300 und 400, Editorial New 200, 200-italic und 300. Kein Bold-Schnitt vorhanden. Bold wird über `font-bold` mit dem 400er Schnitt plus Browser-Synthese erzeugt. Das ist eine bewusste Reduktion, aber technisch eine Schwäche (synthetisches Bold).
- Der Blog nutzt einen **anderen** Font-Stack: `font-family:MessinaSansWeb,Helvetica,Arial,sans-serif!important` und lädt zusätzlich Google Fonts Raleway plus Font Awesome 6.7.2. Damit brechen Blog und Hauptseite typografisch auseinander.
- Der Blog-Artikel-Titel ist als `post-title` gesetzt, `font-size:20px` für Karten, `is-big-title` 26px, `is-small-title` 15px.

### Farben

Die 10 häufigsten Farbtoken in `main.css` (aus 301 Farb-Tokens gesamt):

| Rang | Wert | Vorkommen | Rolle |
|---|---|---|---|
| 1 | `#0000` (transparent) | 30 | Tailwind-Transparenz-Reset |
| 2 | `#0000001a` | 12 | Schatten-Alpha |
| 3 | `#ede9e4` | 5 | Sandstein-Ton, Variante |
| 4 | `#00000026` | 4 | `--drop-shadow-lg` Alpha |
| 5 | `#ece9e5` | 4 | Sandstein-Ton |
| 6 | `#1c1c1c` | 4 | `--color-gray-600`, dunkle Sektionen |
| 7 | `#e2dbd3` | 4 | Sandstein-Ton |
| 8 | `#e6e4e2` | 4 | Spezifikationskarte auf Ring-5-Seite (`bg-[#E6E4E2]`) |
| 9 | `#e7e0d9` | 4 | Spezifikationskarte auf Kaufseite (`bg-[#E7E0D9]`) |
| 10 | `#fff` | 3 | Weiß |

**Semantische Marken-Tokens (Custom Properties):**

```css
--color-sandstone-100: #fefaef;   /* hellster Grund */
--color-sandstone-200: #f7f1e8;   /* Haupt-Hintergrund der Site */
--color-sandstone-300: #efeae2;
--color-sandstone-400: #efe6db;   /* Kartenflächen, Uhrzeit-Pillen */
--color-sandstone-450: #e6ded3;
--color-sandstone-500: #4a4741;   /* Haupt-Textfarbe (warmes Dunkelgrau) */
--color-backdrop-500: #222428;    /* Glas-Overlays */
--color-backdrop-600: #151619;
--color-gray-100: #f3f1f0;
--color-gray-150: #e2e1da;        /* Icon-Kreise */
--color-gray-300: #d3d1ce;        /* Fortschrittsbalken, FAQ-Item-Hintergrund */
--color-gray-350: #a8a5a0;        /* Footer-Text */
--color-gray-400: #838280;
--color-gray-450: #5a5958;
--color-gray-500: #202020;
--color-gray-550: #19191c;        /* dunkelster Text, Film-Sektion */
--color-gray-600: #1c1b1a;        /* dunkle Sektionen, Button-Hover */
--color-blue-100: #2a72de;        /* Primary-Button */
--color-blue-200: #2056a6;        /* Primary-Button-Hover */
--color-cream-50: #f7f1e8;
--color-mustard-100: #ddaa61;
--color-olive-400: #849671;
--color-slate-200: #4f5f68;
```

**Zuordnung:**
- Akzent auf Buttons: `--color-blue-100` `#2a72de` (Blau, einziger echter Akzent). Hover `--color-blue-200` `#2056a6`.
- Sekundär-Button: `--color-sandstone-500` `#4a4741` als Grund, Text `--color-sandstone-200`, Hover `--color-gray-600` `#1c1b1a`.
- Hintergrund der Site: `--color-sandstone-200` `#f7f1e8` (warmes Creme). Mit 26 Nutzungen der häufigste Token.
- Text: `--color-sandstone-500` `#4a4741` (28 Nutzungen, häufigster Token überhaupt). Auf dunklen Flächen `--color-sandstone-200` oder `--color-gray-100`.
- Dunkle Bühnen: `--color-gray-600` `#1c1b1a` und `--color-neutral-800`.

**Farbstrategie:** Warme Sandsteintöne als Rahmen, ein einziger kühler Blau-Akzent ausschließlich für die primäre Kauf-Handlung ("Jetzt kaufen" auf `bg-blue-100`, "Zum Warenkorb hinzufügen" auf `bg-blue-100`). Produktbilder und Weißraum tragen die Marke, nicht Farbe.

### Radius

`border-radius`-Deklarationen in `main.css` nach Häufigkeit:

| Wert | Vorkommen | Verwendung |
|---|---|---|
| `0` | 4 | Reset |
| `3.40282e+38px` | 4 | `.rounded-full` (Tailwind-Maximalwert, effektiv Pill) |
| `var(--radius-lg)` = `.5rem` = 8px | 3 | Akkordeon-Items, Testimonial-Karten, Produktinformationsleiste |
| `var(--radius-2xl)` = `1rem` = 16px | 2 | Karten |
| `var(--radius-3xl)` = `1.5rem` = 24px | 2 | Feature-Bilder, Zubehör-Karte |
| `var(--radius-4xl)` = `2rem` = 32px | 2 | Karten |
| `20px` | 2 | Modal-Drag-Handle |
| `40px` | 2 | Spezifikationskarten (`rounded-[40px]`) |
| `var(--radius-5xl)` = `3.75rem` = 60px | 2 | Shop-Service-Karte (`md:rounded-5xl`) |
| `1.25rem`, `2.5rem`, `4rem`, `15px`, `24px` | je 1 | Einzelfälle |
| `3.5vw`, `4vw`, `6.4vw` | je 1 | Fluid Radius |

**Buttons sind immer Pill** (`rounded-full`, effektiv `3.40282e+38px`). Karten nutzen `rounded-lg` bis `rounded-4xl`, große Bildflächen `rounded-3xl`, Sonderkarten `rounded-[40px]`. Die Sprache ist durchgehend "weich", es gibt keine eckigen Flächen außer dem Trennstrich im Footer.

### Shadows

`box-shadow` tritt fast nur als Tailwind-Token-Kette auf, konkrete Werte:

| Klasse | Wert |
|---|---|
| `.shadow-2xl` | `0 25px 50px -12px #00000040` |
| `.hover\:shadow-xl` | `0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000001a` |
| `.hover\:shadow-[0_16px_16px_rgba(0,0,0,0.05)]` | `0 16px 16px #0000000d` |
| Produktinformationsleiste (inline) | `0px 6px 30px -4px rgba(0,0,0,0.1)` |
| Chat-Fenster (inline) | `-5px 5px 20px rgba(66,66,66,0.25)` |
| `--drop-shadow-lg` | `0 4px 4px #00000026` |
| E-Mail-Feld (inline) | `inset 0 1px 0 ...` (Insent) |

Schatten sind selten und weich. Die Seiten trennen Flächen primär über Farbwechsel (`sandstone-200` gegen `sandstone-400` gegen `gray-600`), nicht über Elevation.

### Spacing und Container

Das Raster ist das Herzstück des Layouts:

```css
.gridContainerV3 {
  --smallGutter: 24px;
  --largeGutter: 64px;
  --maxContent: 1440px;
  --maxCol: calc(var(--maxContent) / 22);
  grid-template-columns: [full-start] var(--smallGutter) [main-start] repeat(8, minmax(0,1fr)) [main-end] var(--smallGutter) [full-end];
  display: grid;
}
@media (min-width:768px)  { .gridContainerV3 { grid-template-columns: [full-start] var(--smallGutter) [main-start] repeat(22, minmax(0,1fr)) [main-end] var(--smallGutter) [full-end]; } }
@media (min-width:1024px) { .gridContainerV3 { grid-template-columns: [full-start] var(--largeGutter) [main-start] repeat(22, minmax(0,1fr)) [main-end] var(--largeGutter) [full-end]; } }
@media (min-width:1440px) { .gridContainerV3 { grid-template-columns: [full-start] minmax(var(--largeGutter),1fr) [main-start] repeat(22, var(--maxCol)) [main-end] minmax(var(--largeGutter),1fr) [full-end]; } }
```

Drei Eigenschaften sind bemerkenswert:
1. **22 Spalten**, nicht 12. Dadurch sind feine Abstufungen möglich (`col-start-main md:col-start-5 col-end-main md:col-end-21`).
2. **Benannte Linien** `full-start`, `main-start`, `main-end`, `full-end`. `main` ist der Inhaltsbereich zwischen den Guttern, `full` ist die Kante. Utility-Klassen nutzen das direkt (`col-start-main`, `col-end-full`).
3. Mobile 8 Spalten, ab 768px 22 Spalten, ab 1440px fixe `--maxCol` = 1440/22 = 65,45px pro Spalte.

Spacing-Basis: `--spacing: .25rem`. Sektions-Padding kommt in diesen Stufen vor: `py-1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 14, 15, 16, 20, 24, 32, 64, 72` (also 4px bis 288px). Typische Sektions-Paddings: `py-10 lg:py-20` (40 / 80px), `py-16` (64px), `py-20 lg:py-32` (80 / 128px), `py-8 lg:py-16` (32 / 64px).

Weitere Container-Werte: `--maxContent: 1440px`, `max-w-[1312px]` (Slider), `max-w-[1254px]` (Produktinformationsleiste), `max-w-[64rem]` (H2-Textbreite), `max-w-480` (Ring-Bühne), `--container-xl: 36rem`.

### Typo-Skala

Zwei Skalen-Systeme nebeneinander: Standard-Tailwind (`--text-5xl: 3rem` bis `--text-9xl: 8rem`) und eine eigene Markenskala (`--text-eyebrow` bis `--text-title-xl`).

**Markenskala (Desktop-Werte):**

```css
--text-eyebrow: .75rem;       /* 12px, Labels in Versalien */
--text-body-sm: .875rem;      /* 14px */
--text-body-lg: 1.125rem;     /* 18px */
--text-heading-xs: 1.25rem;   /* 20px */
--text-heading-sm: 1.5rem;    /* 24px */
--text-heading-base: 1.75rem; /* 28px */
--text-heading-lg: 2rem;      /* 32px */
--text-heading-xl: 2.5rem;    /* 40px */
--text-heading-2xl: 3rem;     /* 48px */
--text-heading-3xl: 3.5rem;   /* 56px */
--text-heading-4xl: 4rem;     /* 64px */
--text-heading-5xl: 4.25rem;  /* 68px */
--text-heading-6xl: 5rem;     /* 80px */
--text-title-md: 4.5rem;      /* 72px */
--text-title-lg: 6rem;        /* 96px */
--text-title-xl: 7.5rem;      /* 120px */
--text-h1-md: 3.25rem;        /* 52px, H1-Zwischenstufe */
--text-h2-base: 2rem;         /* 32px, H2-Grundstufe */
```

**Tatsächlich gemessene H1-Größen (wörtlich aus den Klassen):**

| Seite | H1-Klassen | Effektiv Desktop |
|---|---|---|
| Startseite | `text-5xl leading-tighter tracking-tighter md:text-7xl` | 72px |
| Ring 5 | `text-5xl tracking-tighter md:text-6xl lg:text-7xl xl:text-8xl xxl:text-9xl` | bis 128px |
| why-oura | `text-heading-xl md:text-[length:var(--text-h1-md,3.75rem)] lg:text-heading-6xl` | 80px |
| Mitgliedschaft | `text-heading-xl md:text-[length:var(--text-h1-md,3.75rem)] lg:text-heading-6xl` | 80px |
| Wissenschaft, Kontakt | `text-[length:var(--text-h2-base,2.25rem)] ... lg:text-heading-5xl` | 68px |

**Gemessene H2-Größen:**

- Startseite Benefits: `text-[56px] leading-[1.1] tracking-[-2.04px] md:text-[60px] lg:text-[68px]`
- Ring 5 Groß-Headlines: `text-heading-2xl leading-tighter lg:text-[6.125rem]` = 98px
- Mitgliedschaft Final-CTA: `text-[56px] leading-[1.1] tracking-[-2.24px]`
- why-oura Stat: `text-heading-2xl leading-tighter tracking-[-0.96px] lg:text-heading-6xl lg:tracking-[-1.6px]`
- Die größten H2 sind auf `leading-[1.1]` bis `--leading-tighter: 1.1` gesetzt.

**Body-Größe:** `text-base` = 1rem mit `leading-normal` = 1.5. Kleine Varianten `text-body-sm` 14px, `text-body-lg` 18px, `text-xs` 12px für Fußnoten.

**Letter-Spacing:** `--tracking-tighter: -.05em`, aber konkret gemessen: `-2.04px` bei 56 bis 68px, `-2.24px` bei 56px, `-1.12px` bei heading-xl/3xl, `-1.6px` bei 80px, `-0.96px` bei 48px. Die Regel: rund -1,5 bis -3 % der Schriftgröße. Für Eyebrow-Labels umgekehrt `tracking-wide` bis `tracking-wider` (positiv).

**Clamp:** Es gibt **kein** `clamp()` in der Typografie. Die Größen sind über Breakpoint-Stufen gestaffelt (`md:`, `lg:`, `xl:`, `xxl:`). Das ist eine bewusste Entscheidung für deterministische Layouts, kostet aber Flexibilität zwischen den Breakpoints.

### Breakpoints

```css
@media (min-width:320px){}  /* xs */
@media (min-width:420px){}  /* s */
@media (min-width:650px){}
@media (min-width:768px){}  /* md */
@media (min-width:1024px){} /* lg */
@media (min-width:1280px){} /* xl */
@media (min-width:1440px){} /* xxl, = --breakpoint-xxl */
@media (min-width:1568px){}
@media (min-width:1920px){}
@media (min-width:2000px){}
```

Zusätzlich: `@media (orientation:portrait)` und `@media (orientation:landscape)` werden im Ring-5-Hero genutzt (`portrait:mt-[66svh]`, `landscape:my-auto`).

### Bilder

- CDN: imgix (`ourahealth.imgix.net`), 8 Variantenbreiten pro Bild.
- Parametermuster: `?ixlib=js-3.8.0&auto=format&fit=max&fm=png&q=70&w=256|384|640|750|828|1080|1200|1920|2048|3840`.
- **`fm=png` ist der Default**, `fm=webp` erscheint nur bei Video-Postern. Gemessen: 94 `fm=png` gegen 2 `fm=webp` auf der Startseite, 318 gegen 2 auf der Ring-5-Seite, 349 gegen 1 auf why-oura. AVIF kommt nicht vor.
- `srcSet` mit Breitendeskriptoren: 11 von 12 Bildern auf der Startseite, 38 von 42 auf Ring 5, 32 von 34 auf why-oura.
- `loading="lazy"`: 11 von 12 auf der Startseite, 40 von 42 auf Ring 5. Immer gesetzt außer beim Hero.
- `fetchPriority="high"`: 1 auf der Startseite (Hero-Poster), 4 auf Ring 5, 7 auf der Kaufeite.
- `decoding="async"`: durchgehend.
- Art Direction über `<picture>` mit `<source media="(max-width: 767px)">` und `<source media="(min-width: 768px)">` plus unterschiedlichen `ar`-Parametern (z. B. `ar=257:190` gegen `ar=824:885`).
- Alle Bilder haben ausführliche deutsche `alt`-Texte, oft ganze Sätze: "Ein Oura Ring 5 Gold ruht vor einem sanften, neutralen Hintergrund auf einem strukturierten dunklen Stein, auf dessen Kante ein Marienkäfer sitzt." Das ist überdurchschnittlich.

### Tech-Stack

| Ebene | Erkenntnis | Beleg |
|---|---|---|
| Framework | Next.js App Router mit React Server Components | 32 `<script src>` auf `/b/a/ecom-website/v1.131.0/_next/static/chunks/...`, React-Flight-Payload `self.__next_f.push(...)` 298 mal, Chunk-Namen `app/%5Blocale%5D/page-*.js`, `app/%5Blocale%5D/layout-*.js` |
| Versionierung | Pfad enthält `v1.131.0` | `data-repo-name="ecom-website"` am `<body>` |
| CSS | Tailwind CSS v4 | Custom Properties mit `--tw-`-Präfix, `@theme`-artige Variablen `--color-*`, `--text-*`, `--radius-*`, `color-mix(in oklab, ...)` |
| Motion | Framer Motion als `motion` importiert | Chunk 3338 enthält `shouldReduceMotion`, `whileInView`, `viewport`, `MotionHandoffAnimation`, Spring-Defaults `{type:"spring",stiffness:500,damping:25,restSpeed:10}` |
| Anwendungs-Code | Eigene Motion-Presets im Chunk 9216 | `fadeUp`, `fadeIn`, `blurFadeIn`, `none` als benannte Varianten |
| State/Config | Statsig (Feature Gates), Segment, Sentry | `NEXT_PUBLIC_STATSIG_CLIENT_KEY`, `NEXT_PUBLIC_SEGMENT_KEY`, `NEXT_PUBLIC_SENTRY_DSN` als Feldnamen im Payload |
| Zahlung | Klarna Web SDK, Affirm, ID.me | `Link rel=preload href=https://js.klarna.com/web-sdk/v1/klarna.js`, `NEXT_PUBLIC_KLARNA_CLIENT_ID_DE`, `NEXT_PUBLIC_AFFIRM_KEY`, `NEXT_PUBLIC_IDME_CLIENT_ID` |
| Chat | Decagon AI | `https://decagon.ai/loaders/oura_embed.js` als Preload, `data-cy="chatbot"`, `data-cy="chatbot-trigger-button"` |
| Monitoring | Noibu | `https://cdn.noibu.com/collect-core.js` |
| Consent | OneTrust | `NEXT_PUBLIC_ONETRUST_DOMAIN_SCRIPT`, im Blog `https://cdn.cookielaw.org/scripttemplates/otSDKStub.js` |
| Remote Config | `ouraringconfig.com` | `https://ouraringconfig.com/sdk/9.min.js` als Preload |
| Karten | Mapbox | `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` (Feldname) |
| Blog | WordPress + WPML 4.9.7 + Yoast + WP Rocket 3.23.3.3 + jQuery 3.5.1 | `<meta name="generator" content="WPML ver:4.9.7 ...">`, `<meta name="generator" content="WP Rocket 3.23.3.3" data-wpr-features="wpr_minify_js wpr_async_css wpr_lazyload_images ...">`, `jQuery(document).ready`, `/blog/wp-admin/admin-ajax.php` |
| Kein CMS im Hauptteil | Die Marketing-Seiten sind kein WordPress | keine `wp-content`-Treffer in `home.html`, aber 212 in `blog-article.html` |
| Analytics-Tracking | Eigenes Event-System | `window.ouraAnalytics.track(ef.Bx.CTAClicked,{cta:"shop now",location:"hero",path:o,action:"go to pdp"})` und `window.ouraAnalytics.track(a.Bx.PageScrolled,{page:n,threshold:"".concat(t)})` |

**Barrierefreiheit (gemessen, nicht behauptet):**
- Skip-Link: `<a data-cy="skip-to-content" href="#main-content">Zum Hauptbereich wechseln</a>` in einem `sr-only focus-within:not-sr-only`-Container.
- `<main id="main-content" tabindex="-1">`.
- 28 `aria-label` und 28 `sr-only` auf der Startseite.
- Tab-Widgets mit vollständiger ARIA-Verknüpfung: `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, `tabindex`.
- Akkordeon mit `aria-expanded`, `aria-controls`, `aria-labelledby`, `id`.
- `<noscript>`-Block, der die Motion-Klassen neutralisiert: `.motionComponent { filter: none !important; opacity: 1 !important; transform: none !important; }`.
- Eine Einschränkung nennt die Seite selbst: Im Accessibility-Statement-Text steht wörtlich "ction moves and does not have a mechanism to pause, stop, or hide the motion. (2.2.2)". Das ist der WCAG-Verstoß 2.2.2 (Pause, Stop, Hide) für die Auto-Animationen. Der Text ist als Datenquelle zitiert, nicht als Anweisung.

## Animationen

Alles Folgende ist aus dem ausgelieferten Code belegt. Ich trenne strikt zwischen exakt auslesbaren Werten und dem, was nur als Verhalten sichtbar ist.

### Motion-Library

**Framer Motion** (Paketname im Bundle "motion"). Belege:

- Chunk `3338-dc2c12dd276a6c8.js` enthält `whileInView`, `viewport`, `shouldReduceMotion`, `MotionHandoffAnimation`, `reducedMotionConfig`, Spring-Setups.
- Chunk `9216-37f2b2057513e18.js` enthält die App-eigenen Motion-Presets (siehe unten).
- `data-cy="motionComponent"`-artige Klassen `class="motionComponent"` mit Inline-Styles `style="opacity:0;transform:translateY(20px)"` als Server-Render-Zustand, der clientseitig aufgelöst wird.

**Nicht gefunden:** GSAP, ScrollTrigger, Lenis, AOS, Swiper, Splide, Lottie, Rive, Three.js, Webflow (`data-w-id`), Elementor. Animierte Ring-Renderings sind PNG mit CSS-Transformation, kein WebGL.

**Eigenbau-Carousel:** Die Slider sind native `ul` mit `overflow-x-auto` und CSS Scroll-Snap (`snap-x snap-mandatory snap-always`). Keine Carousel-Bibliothek im Einsatz.

### Motion-Presets (wörtlich aus `js/9216-37f2b2057513e18.js`)

```js
let a = {
  blurFadeIn: { initial: { filter: "blur(5px)", opacity: 0 },
                whileInView: { filter: "blur(0px)", opacity: 1 },
                viewport: { once: true },
                transition: { duration: .6, delay: .25, type: "tween" } },
  fadeUp:     { initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: .5, type: "tween" } },
  fadeIn:     { initial: { opacity: 0 },
                whileInView: { opacity: 1 },
                viewport: { once: true },
                transition: { duration: .75, type: "tween" } },
  none: {}
};
```

Diese vier Presets tragen den größten Teil der Seitenanimationen. `viewport: { once: true }` heißt: jede Animation läuft genau einmal, beim ersten Sichtbarwerden.

### Stagger über Kinder-Mapping (wörtlich aus `js/9216-37f2b2057513e18.js`)

```js
Children.map(w, (e, t) => isValidElement(e)
  ? jsx(d.default, { initial: { opacity: 0 },
                     transition: { delay: .1 * (t + 1), duration: .5, type: "tween" },
                     viewport: { once: true },
                     whileInView: { opacity: 1 },
                     children: e })
  : e)
```

Stagger-Formel: `delay = 0.1 * (Index + 1)` Sekunden, also 100ms, 200ms, 300ms. Dauer je Element 500ms. Ein zweiter Chunk (`3617-7851471da9633c7.js`) nutzt die identische Formel.

### Scroll-getriebene Animationen (Chunk `js2/page-80a25356752c3.js`, Ring-5-Seite)

Alle folgenden Werte sind wörtliche Codeauszüge aus dem Seiten-Chunk:

| Element | scrollYProgress-Range | Ausgabe |
|---|---|---|
| Hintergrund-Ring-Parallax | `[0, 1]` | `y: ["10%", "-13%"]`, bei Reduced Motion `["0%", "0%"]` |
| Text "40 % Schlanker" | `[.8, 1]` | `filter: ["blur(10px)", "blur(0px)"]`, `opacity: [0, 1]`, `y: [20, 0]` (mobil `y: [0, 0]`) |
| Kleines Ring-Badge | `[.1, .2]` | `opacity: [1, 0]` |
| Text "Langlebiges Design" | `[.4, 1]` | `filter: ["blur(15px)", "blur(0px)"]`, `opacity: [0, 1]`, `y: [30, 0]` |
| Ring-Reveal (Clip) | `[.1, 1]` | `{ clipPath: [100, 0] bzw. [0, 100], scale: [1, .47] }` |
| Fortschritts-Overlay | `[0, .58, .67, 1]` | `opacity: [0, .999, .999, 0]` |
| Hero-Text-Einblendung | nicht scroll-, sondern `whileInView` | `initial {opacity:0}`, `transition {delay:.25, duration:1, type:"tween"}`, `viewport {amount:.67, once:true}` |
| Hero-Ring-Einblendung | nicht scroll-, sondern animate | `initial {opacity:0}`, `transition {delay:.25, duration:1.25, type:"tween"}` |
| "Langlebiges Design"-Block-Einblendung | animate | `initial {filter:"blur(5px)", opacity:0, translateY:25}`, `animate {filter:"blur(0)", opacity:1, translateY:0}`, `transition {delay:.25, duration:1.25, type:"tween"}` |

**Scroll-Container-Definitionen (wörtlich):**
- `useScroll({ target: e })` für die 200svh-Sektion
- `useScroll({ offset: ["start end", "end start"], target: e })` für die Mitteilungs-Sektion
- `useScroll({ offset: ["start start", "end start"], target: e })` für die Hero-Ausblendung

Das sind echte Scroll-Progress-Animationen, nicht Intersection-Observer-Einmal-Effekte.

### Transition-Werte im CSS

`main.css` enthält nur zwei `transition:`-Kurzschreibweisen wörtlich:
- `transition: opacity .2s ease-in-out` (2 Vorkommen)

Der Rest läuft über Utility-Klassen:
- `.transition` = `transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-*, opacity, box-shadow, transform, translate, scale, rotate, filter, backdrop-filter`
- `.transition-all`, `.transition-colors`, `.transition-opacity`, `.transition-transform` als Varianten
- `transition-duration: .15s` ist der Default (`--default-transition-duration: .15s`), `--default-transition-timing-function: cubic-bezier(.4,0,.2,1)`

**Verwendete Dauern (aus den Utility-Klassen gezählt):** `75ms`, `.1s`, `.2s`, `.25s`, `.3s`, `.4s`, `.5s`, `.7s`, `.75s`, `1s`.

**Alle `cubic-bezier`-Werte in `main.css` (vollständig, 4 Stück):**
- `cubic-bezier(.4,0,.2,1)` (2 Vorkommen) = `--ease-in-out`
- `cubic-bezier(.4,0,1,1)` = `--ease-in`
- `cubic-bezier(0,0,.2,1)` = `--ease-out`
- `cubic-bezier(.4,0,.6,1)` = `--animate-pulse` Timing

Zusätzlich in JavaScript (Framer-Motion-Easings, wörtlich): `ease:[.4,0,.1,1]`, `ease:[.25,.1,.35,1]`, `ease:"easeInOut"`, `ease:"easeOut"`, `ease:"easeIn"`, `ease:"linear"`.

### @keyframes

`main.css` enthält **genau zwei** Keyframes:

```css
@keyframes spin { to { transform: rotate(1turn) } }
@keyframes pulse { 50% { opacity: .5 } }
```

`--animate-spin: spin 1s linear infinite`, `--animate-pulse: pulse 2s cubic-bezier(.4,0,.6,1) infinite`.

Alles andere ist Inline-Animation über Framer Motion, nicht CSS-Keyframes. Das heißt: Praktisch jede Bewegung auf dieser Site wird per JavaScript getrieben, nicht per CSS.

### Hover-Effekte (echte Regelkörper aus `main.css`)

**Buttons:**
- Primary: `bg-blue-100 text-white hover:bg-blue-200` → `#2a72de` zu `#2056a6`
- Sekundär: `bg-sandstone-500 text-sandstone-200 hover:bg-gray-600` → `#4a4741` zu `#1c1b1a`
- Auf hellem Grund: `bg-gray-100 text-gray-550 hover:border-gray-400 hover:bg-gray-400`
- Übergang: `.transition` ohne weitere Klasse, also 150ms mit `cubic-bezier(.4,0,.2,1)` als Default

**Karten und Links:**
- `.hover\:scale-105:hover { --tw-scale-x:105%; --tw-scale-y:105%; --tw-scale-z:105%; scale: var(--tw-scale-x) var(--tw-scale-y) }`
- `.hover\:brightness-125:hover` und `.hover\:brightness-200:hover` über `filter`
- `.hover\:opacity-70:hover` und `.hover\:opacity-100:hover`
- `.hover\:shadow-xl:hover` = `0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000001a`
- `.hover\:shadow-[0_16px_16px_rgba(0,0,0,0.05)]:hover`
- `.hover\:border-white:hover`, `.hover\:border-sandstone-500:hover`, `.hover\:border-gray-400:hover`
- `.hover\:bg-white\/10:hover` = `color-mix(in oklab, white 10%, transparent)`
- `.hover\:text-white\/80:hover`

**Gruppen-Hover (Eltern hover steuert Kind):**
- `.group-hover\:-translate-y-0.5` und `.group-hover\:translate-y-0.5` = `translateY(-2px)` bzw. `translateY(2px)`
- `.group-hover\:bg-gray-300`, `.group-hover\:text-blue-500`, `.group-hover\:text-gray-450`
- `.group-hover\:text-stroke-color-current`
- `.group-hover\:md\:left-0`, `.group-hover\:md\:translate-x-0`, `.group-hover\:md\:opacity-0`, `.group-hover\:md\:opacity-100`

Der Menü-Button nutzt das konkret: Zwei 18px breite 2px-Balken (`h-0.5 w-[18px] origin-center transition-all duration-300 ease-in-out bg-sandstone-500`) fahren beim Hover auseinander (`group-hover:-translate-y-0.5` und `group-hover:translate-y-0.5`).

Alle Hover-Regeln stehen in `@media (hover:hover)`-Blöcken, also nur auf Zeigegeräten.

### Sticky-Header und Scroll-Verhalten

Standard-Header (alle Seiten):
```html
<header class="pointer-events-auto z-50 min-h-[90px] w-full py-2 transition-all duration-500 top-0 sticky">
```
500ms Übergang auf `all`.

PDP-Sticky-Leiste (Ring-5- und Kaufseiten), vollständiges Klassenattribut:
```html
<nav aria-hidden="true" class="pointer-events-auto fixed top-0 z-100 w-full transition-transform duration-500 bg-sandstone-200/30 backdrop-blur-[2rem] text-sandstone-500 pointer-events-none -translate-y-full">
```
Zustand `-translate-y-full` blendet sie aus, `translate-y-0` ein. Der Umschaltcode steht in `js2/4168c042-fae5207e4.js`:
```js
function ex({buttonLabel:e, hide:r=!1, href:a, ...}) {
  return jsx("nav", {
    "aria-hidden": r,
    className: cx("pointer-events-auto fixed top-0 z-100 w-full transition-transform duration-500",
      "bg-sandstone-200/30 backdrop-blur-[2rem]",
      {"text-white": t, "text-sandstone-500": !t,
       "pointer-events-none -translate-y-full": r,
       "pointer-events-auto translate-y-0": !r}),
    children: ... })
}
```

Mega-Menü-Panel:
```html
<div class="absolute left-0 top-0 z-0 w-full overflow-hidden bg-sandstone-200 shadow-2xl lg:rounded-b-[3rem]" style="height:0px">
<div class="duration-400 absolute inset-0 mx-3 rounded-lg bg-sandstone-500/10 backdrop-blur-[2rem] transition-opacity md:mx-6">
```
Das Panel startet mit `height:0px` und wird beim Öffnen animiert. Die Milchglas-Fläche darunter ist `bg-sandstone-500/10 backdrop-blur-[2rem]` mit `duration-400`.

Produktinformationsleiste auf der Kaufseite:
```html
<div class="... [--product-info-bar-motion-y:100px] md:[--product-info-bar-motion-y:20px]"
     style="opacity:0;transform:translateY(var(--product-info-bar-motion-y))">
```
Eigene CSS-Variable steuert die Eintrittsstrecke: 100px mobil, 20px ab md. Container ist `fixed bottom-4 z-90`, Fläche `bg-sandstone-200/85 backdrop-blur-sm` mit `shadow-[0px_6px_30px_-4px_rgba(0,0,0,0.1)]`.

### Reduced Motion

**Vorbildlich umgesetzt.** `main.css` enthält 8 `prefers-reduced-motion`-Blöcke:
- `@media (prefers-reduced-motion:reduce) { html { scroll-behavior: auto } }`
- `@media (prefers-reduced-motion:no-preference)` mit `motion-safe:`-Klassen: `motion-safe:transition-all`, `motion-safe:duration-500`, `motion-safe:ease-in-out`, plus Stilwerte `top-[41%]`, `mt-[-25vh]`, `h-[80vh]`
- `@media (prefers-reduced-motion:reduce)` mit `motion-reduce:`-Klassen: `motion-reduce:top-[44.5%]`, `motion-reduce:mt-[-25vw]`, `motion-reduce:h-[120vw]`, `motion-reduce:hidden`
- Dazu `html:not(.nojs) .lg\:motion-safe\:js\:absolute`, `js:sticky`, `js:h-screen`-Varianten: das Layout prüft zusätzlich, ob JavaScript aktiv ist.

Im Markup:
- Startseiten-Hero: `<div class="motion-reduce:hidden relative size-full">` für das Video und `<img class="motion-safe:hidden size-full object-cover">` als Standbild. Bei Reduced Motion wird also das Video durch ein Bild ersetzt, nicht nur gestoppt.
- `<noscript><style>.motionComponent { filter: none !important; opacity: 1 !important; transform: none !important; }</style></noscript>` stellt sicher, dass ohne JavaScript kein Inhalt unsichtbar bleibt.

In JavaScript prüft die App selbst per `matchMedia`:
```js
function o(){
  if (n.r.current=!0, i)
    if (window.matchMedia) {
      let e = window.matchMedia("(prefers-reduced-motion)"),
          t = () => n.O.current = e.matches;
      e.addEventListener("change", t), t()
    } else n.O.current = !1
}
```
Framer-Motion liefert `shouldReduceMotion` und `reducedMotionConfig` mit. Die Ring-5-Animationen lesen das Flag direkt: `a = (0,B.I)()` liefert den Reduced-Motion-Zustand, und die Ausgabe wird dann auf `"0%"` gesetzt: `l = useTransform(scrollYProgress, [0,1], [a ? "0%" : "10%", a ? "0%" : "-13%"])`.

**Einschränkung:** Die Seite nennt selbst in ihrem Accessibility-Statement einen offenen Verstoß gegen WCAG 2.2.2 (Pause, Stop, Hide) für eine bewegte Komponente. Der Text steht wörtlich im Payload: "ction moves and does not have a mechanism to pause, stop, or hide the motion. (2.2.2)".

## Synthese

### 1. Seitentyp-Blueprints

**Blueprint A: Startseite** (Referenz: `/de`, 5 Sections, 351 Wörter im Hauptbereich)

1. Announcement-Bar, Full-bleed, 1 Zeile, `bg-sandstone-200`, Textlink als CTA
2. Sticky Header mit Mega-Menü, Full-bleed, `min-h-[90px]`, Primär-CTA "Jetzt kaufen"
3. Hero, Full-bleed, `h-svh`, Video-Autoplay stumm mit Poster, H1 als 2-Wort-Markenversprechen, Subline 1 Satz, 1 CTA
4. Benefits-Intro, Zentriert-schmal über 22-Spalten-Raster (`md:col-start-5 md:col-end-21`), H2 56 bis 68px mit `tracking-[-2.04px]`, 2 Sekundär-CTAs in Reihe
5. Feature-Slider, Carousel mit CSS-Snap, 6 Karten (`h-[388px] w-[80vw] md:h-[658px] md:w-[493px]`), je Karte 4x4-Grid mit Bild plus Glas-Overlay-Pille, Fortschrittsbalken mit `scaleX`
6. Stats-Block, Zentriert-schmal, H2 = eine Prozentzahl mit Fußnoten-Anker, Subline 2 Sätze, 1 CTA, 1 großes Collage-Bild darunter
7. Testimonials, 3er-Grid auf `md:flex-row`, Karten `bg-sandstone-400 rounded-lg`, Kategorie-Eyebrow, Zitat, Name plus Portrait
8. Presse plus Blog-Teaser, Bento 2x2, dunkle Bühne `bg-gray-600`, Presse-Slider links, Artikelkarte rechts mit Gradient-Overlay
9. Legal-Fußnoten, `id="legal-footnotes"`
10. Footer, 2 Blöcke: Zahlungslogos plus Newsletter, dann Rechtszeile plus Sprachwahl plus Adresse

**Blueprint B: Produktseite (Marketing-PDP)** (Referenz: `/de/store/rings/oura-ring-5`, 9 Sections, 930 Wörter)

1. Announcement-Bar (hier leer geschaltet)
2. Sticky Header
3. PDP-Sticky-Leiste (erscheint beim Scrollen): Produktwortmarke links, "Jetzt kaufen" rechts
4. Hero, Full-bleed, `h-svh`, Ring-Renderings auf CSS-Radialgradient, H1 als Designversprechen, Eyebrow-H2 als Produktname, 1 CTA direkt zur Variante
5. Scroll-Sticky-Vergleich, `h-[200svh]` außen, `sticky top-0 h-svh` innen, zwei Ringe mit Clip-Path- und Scale-Reveal, große Zahl als Headline
6. Film-Sektion, Full-bleed, Video mit Play-Button, `lg:aspect-video`
7. Genauigkeits-Bento, 2 asymmetrische Bildspalten, darunter 3 Zahlen-Kacheln in Kreisen
8. Akku-Sektion, `h-svh`, Video-Hintergrund, eine Zahl als Headline
9. Komfort-Sektion, Video-Hintergrund, zweizeilige H2
10. Feature-Tabs, 6 Kategorien als Snap-Slider-Pillen, Panels mit je bis zu 4 Detailkarten
11. Tech-Spezifikationen, Akkordeon in Karte `bg-[#E6E4E2] rounded-[40px]`, 6 Einträge
12. Varianten-Karussell, Karten `article.group`, 6 Varianten mit Preis
13. Legal-Fußnoten mit DOI-Links
14. Footer

**Blueprint C: Kaufseite (Transaktions-PDP)** (Referenz: `/de/store/rings/oura-ring-5/silver`, 5 Sections, 814 Wörter)

1. Sticky Header
2. Kauf-Modul, 2 Spalten: links Sticky-Galerie (`sticky top-0 lg:top-24`, 6 Slides, Pfeile, Slide-Zähler als `sr-only`), rechts Variantenwahl (6 Optionen), Größenwahl mit Info-Modal, "Zum Warenkorb hinzufügen" (gesperrt bis Größe gewählt)
3. Nutzen-Bento mit 3 Zahlen im Fließtext
4. Mitgliedschafts-Brücke, 2 Spalten, 6 Kategorie-Pillen
5. FAQ-Akkordeon, 6 Fragen, erster Eintrag offen
6. Tech-Spezifikationen, Akkordeon in Karte `bg-[#E7E0D9] rounded-[40px]`
7. Produktinformationsleiste, `fixed bottom-4 z-90`, erscheint beim Scrollen
8. Footer

**Blueprint D: Feature-/Erklärseite** (Referenz: `/de/how-it-works`, 7 Sections, 241 Wörter; `/de/sleep-and-rest`, 9 Sections, 569 Wörter)

1. Hero, `lg:min-h-svh`, links Text, H1 als These, Subline 2 Sätze, kein CTA
2. Erklär-Modul, Zigzag oder Akkordeon, je Eintrag 1 Bild plus 1 Absatz
3. Bei `how-it-works`: Timeline in 5 Schritten, Uhrzeit-Pille (`rounded-full bg-sandstone-400 px-4 py-2` mit Uhr-Icon `size-6`), Text-Spalte wechselt die Seite, Bild in `aspect-[4/3] rounded-r-3xl`
4. Bei `sleep-and-rest`: Feature-Tabs mit Slide-Zähler "1/4"
5. Herkunfts-Sektion mit Behauptung
6. Integrations-Grid, 3er-Grid mit Partner-Apps
7. Final-CTA, Zentriert, H2 plus 1 Button "Alle Produkte entdecken"
8. Blog-Teaser, Bento
9. Footer

**Blueprint E: Wissenschafts-/Beweis-Seite** (Referenz: `/de/science-and-research`, 9 Sections, 1371 Wörter)

1. Hero, `lg:min-h-svh`, H1 als Kategorie-Eyebrow in Versalien (nicht Display-Typo), H2 als These, Subline 2 Sätze, 1 Text-CTA
2. Zahlen-Leiste, 4er-Grid: 50+ Forschende, 130+ Publikationen, 12+ Jahre, 14 Partnerschaften; jeder Wert als H3 mit Einordnungssatz
3. Genauigkeits-Werte, Slide-Karussell mit 4 Karten, je eine Prozentzahl plus Vergleichsmaßstab plus Fußnotenmarker
4. Studien-Slider, Überschrift plus 3 Studientitel mit Journal-Namen im Fließtext
5. Publikationsliste, 3er-Grid mit 6 Publikationen (Titel, Journal, Monat Jahr), 1 CTA zur Forschungsdatenbank
6. Forschungsfelder, 5 anonyme Absätze, Institutionen namentlich
7. Forschungshighlights, dunkle Bühne `bg-neutral-800`, Slide-Karussell, erste Karte als "Empfohlene Studie"
8. Medical Advisors, dunkle Bühne, Slide-Karussell mit Namen, Titel, Institution, 1 CTA
9. Partnerschafts-CTA, 2 CTAs
10. Footer

**Blueprint F: Blog-Übersicht** (Referenz: `/blog/de/`, WordPress)

1. Sprachleiste, 23 Sprachen
2. Hinweisbanner zum Übersetzungsstand
3. Mega-Navigation mit 4 Gruppen und Untergruppen (Entdecke Oura, Schlaf, Health, Community, Für Unternehmen)
4. Top-Artikel-Bento mit 1 großem Aufmacher und 3 kleineren
5. Kategorie-Teaser-Grid
6. Featured Articles, Karten mit Kategorie, Titel, Autor, Datum
7. Recent Articles, Kartenliste
8. Footer mit Suchformular und Newsletter

**Blueprint G: Blog-Artikel** (Referenz: `/blog/de/how-oura-measures-sleep-and-validates-accuracy/`, 2162 Wörter)

1. Sprachleiste und Mega-Navigation (identisch zur Übersicht)
2. Featured-Articles-Leiste (4 Artikel)
3. Artikelkopf: Kategorie ("Entdecke Oura"), H1, "Author: Oura Team", "Published on: 23. August 2026", "Reviewed by: Shyamal Patel, PhD, SVP, Science at Oura", Lesezeit "13 Minuten"
4. Fließtext mit 5 H2-Abschnitten, 22 Bildern und Zwischenblöcken "RELATED: ..." und "READ MORE: ..."
5. FAQ-Abschnitt als Q&A-Fließtext, 5 Fragen
6. Sticky Sidebar mit clientseitig erzeugtem "Table of Contents" (Script `inserIndex()`, IDs aus `heading.textContent`)
7. "Werde Teil der Community" Newsletter-CTA
8. "Neue Veröffentlichungen" und "Featured Articles"
9. Footer

### 2. Die 5 stärksten Muster

**Muster 1: Das 22-Spalten-Raster mit benannten Linien als Layout-Fundament.**

Das ist die wichtigste technische Entscheidung der Site. Beleg aus `main.css`:
```css
.gridContainerV3{--smallGutter:24px;--largeGutter:64px;--maxContent:1440px;--maxCol:calc(var(--maxContent) / 22);grid-template-columns:[full-start] var(--smallGutter) [main-start] repeat(22,minmax(0,1fr)) [main-end] var(--smallGutter) [full-end];display:grid}
@media (min-width:1440px){...grid-template-columns:[full-start] minmax(var(--largeGutter),1fr) [main-start] repeat(22,var(--maxCol)) [main-end] minmax(var(--largeGutter),1fr) [full-end]}
```
Beleg im Markup, `membership.html`:
```html
<div class="col-start-main lg:col-start-3 col-end-main lg:col-end-13">
<div class="col-start-main lg:col-start-14 col-end-main lg:col-end-23">
```
Statt 12 Spalten erlaubt das 22 Spalten feine Asymmetrien (13/10-Teilung für ein Karussell), und die benannten Linien `main` und `full` machen Full-bleed-Bilder innerhalb desselben Rasters möglich, ohne das Grid zu verlassen. Ein Agent kann das direkt nachbauen: `grid-template-columns: [full-start] 64px [main-start] repeat(22, minmax(0,1fr)) [main-end] 64px [full-end]`.

**Muster 2: Vier benannte Motion-Presets statt Ad-hoc-Animationen.**

Beleg aus `js/9216-37f2b2057513e18.js`:
```js
blurFadeIn:{initial:{filter:"blur(5px)",opacity:0},whileInView:{filter:"blur(0px)",opacity:1},viewport:{once:true},transition:{duration:.6,delay:.25,type:"tween"}},
fadeUp:{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:true},transition:{duration:.5,type:"tween"}},
fadeIn:{initial:{opacity:0},whileInView:{opacity:1},viewport:{once:true},transition:{duration:.75,type:"tween"}},
none:{}
```
Jede Sektion wählt eines von vier Presets über einen Namen (`motionPreset`), plus optional `motionPropsFromProps`. Der Server rendert den `initial`-Zustand als Inline-Style (`style="opacity:0;transform:translateY(20px)"`), der Client löst ihn auf. Das erzeugt einen konsistenten Rhythmus über die gesamte Site ohne Wiederholungscode, und es macht Animation nachträglich änderbar an einer Stelle. Die `blur(5px)`-Kombination ist die Signatur der Marke.

**Muster 3: Reduced Motion auf drei Ebenen gleichzeitig.**

Drei Mechanismen greifen ineinander. Erstens CSS: `@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}` und `motion-reduce:hidden` gegen `motion-safe:hidden`. Zweitens Markup: Der Hero liefert zwei Elemente, `<div class="motion-reduce:hidden relative size-full"><video ...></div>` und `<img class="motion-safe:hidden size-full object-cover">`. Reduced Motion bekommt also ein Standbild statt eines gestoppten Videos. Drittens JavaScript, in `3338-dc2c12dd276a6c8.js`:
```js
let e=window.matchMedia("(prefers-reduced-motion)"),t=()=>n.O.current=e.matches;e.addEventListener("change",t),t()
```
Und die Scroll-Animationen lesen das Flag und setzen die Ausgabe auf null, wörtlich aus `js2/page-80a25356752c3.js`:
```js
l=useTransform(t,[0,1],[a?"0%":"10%",a?"0%":"-13%"])
```
Viertens `<noscript>`: `<style>.motionComponent { filter: none !important; opacity: 1 !important; transform: none !important; }</style>`. Ohne JavaScript bleibt nichts unsichtbar. Das ist die vollständigste Reduced-Motion-Behandlung, die ich in dieser Analyse gesehen habe.

**Muster 4: Trust als Zahlen-Kaskade mit Fußnoten-Ankern, nicht als Badge-Wand.**

Die Site zeigt keine Trust-Siegel im Hero. Stattdessen baut sie eine Zahlenkette über den Scroll: Startseite "86 % der Oura-Mitglieder stellen eine Verbesserung ihres Gesundheitszustands fest. 1" mit `<a href="#legal-footnotes">1</a>` und darunter im Fußnotenblock "Basierend auf einer Studie von 2026 mit 3501 Oura-Mitgliedern nach dem Tragen des Oura Rings über 30 Tage." Auf `why-oura` folgen "12+ Jahre", "50+ promovierte Forschende", "5 Generationen", "5 Mio.+ Mitglieder" als H2/H3-Kombination. Auf `science-and-research` dann "130+ Fachpublikationen" plus Journals namentlich (ScienceDirect, npj Digital Medicine, Nature and Science of Sleep, Sensors, PLOS Digital Health) plus Medical Advisors mit Universitätsnamen (Harvard Medical School, UCSF). Die Fußnoten sind immer am Seitenende verankert, nie im Fließtext versteckt. Das ist teuer zu produzieren und deshalb ein schwer kopierbarer Vorteil.

**Muster 5: CSS-Scroll-Snap-Carousel ohne Bibliothek, mit Fortschrittsbalken und Glas-Overlay.**

Beleg aus `home.html`:
```html
<div class="relative h-[1px] w-full overflow-hidden bg-gray-300" role="presentation"><div class="absolute inset-0 h-[1px] origin-left bg-sandstone-500" style="transform:scaleX(0)"></div></div>
<div class="flex justify-end gap-x-4 pt-6 pb-4" data-cy="swipeable-nav-buttons"></div>
<ul class="no-scrollbar flex snap-x snap-mandatory snap-always items-stretch overflow-x-auto gap-x-6 pr-6" data-cy="slider" tabindex="0">
```
Die Karte ist ein 4x4-Raster mit einem vollflächigen Bild plus einer Glas-Pille über drei Zellen:
```html
<div class="col-start-1 col-end-4 row-start-1 row-end-2 pt-6 pl-6">
  <div class="relative inline-flex items-center gap-x-2.5 overflow-hidden px-4 py-3 md:px-6 md:py-4">
    <div class="motionComponent absolute min-h-px bg-blend-multiply backdrop-blur-xl left-0 top-0 rounded-3xl size-full bg-backdrop-500/40 lg:bg-backdrop-500/40"></div>
```
Kein Swiper, kein Splide, kein Embla. Nur `overflow-x-auto`, `snap-x snap-mandatory snap-always`, `no-scrollbar` (`scrollbar-width:none`) und ein `scaleX`-Balken, der an den Scroll-Fortschritt gekoppelt ist. Das ist billig, robust, tastaturzugänglich (`tabindex="0"`) und ohne Bundle-Größe.

### 3. Animation-Rezepte

Alle Werte sind aus dem ausgelieferten Code. Wo ein Wert nicht belegbar ist, sage ich es.

**Rezept 1: Blur-Fade-In beim Scrollen (Signatur-Effekt der Marke)**

Exakte Werte aus `js/9216-37f2b2057513e18.js`, Preset `blurFadeIn`. HTML-Zustand im ausgelieferten Server-Render: `style="opacity:0;filter:blur(5px);transform:translateY(25px)"`.

```css
/* CSS-Nachbau; die Originalumsetzung läuft über Framer Motion */
.blur-fade-in {
  opacity: 0;
  filter: blur(5px);
  transform: translateY(25px);
  transition: opacity .6s ease .25s,
              filter .6s ease .25s,
              transform .6s ease .25s;
}
.blur-fade-in.is-visible {
  opacity: 1;
  filter: blur(0px);
  transform: translateY(0);
}
```

Die Originalwerte für den Textblock: `duration .6`, `delay .25`, `type "tween"`, `viewport {once:true}`. Für den Hero-Textblock (nicht Preset, sondern inline in `js2/page-80a25356752c3.js`): `duration 1.25`, `delay .25`, `initial {filter:"blur(5px)", opacity:0, translateY:25}`.

Hinweis: Framer Motion nutzt für `type:"tween"` ohne `ease`-Angabe seine eigene Default-Kurve. Der exakte Easing-Wert für `tween` **ist nicht belegbar**, weil er im minifizierten Bundle als Funktionszeiger steckt. Im CSS steht für vergleichbare Übergänge `cubic-bezier(.4,0,.2,1)`.

**Rezept 2: Listen-Stagger mit indexabhängigem Delay**

Exakte Werte aus `js/9216-37f2b2057513e18.js` und identisch in `js/3617-7851471da9633c7.js`:

```jsx
{React.Children.map(children, (child, i) =>
  React.isValidElement(child) ? (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * (i + 1), duration: 0.5, type: "tween" }}
    >
      {child}
    </motion.div>
  ) : child
)}
```

CSS-Äquivalent mit `nth-child`:

```css
.stagger > * {
  opacity: 0;
  transition: opacity .5s cubic-bezier(.4,0,.2,1);
}
.stagger.is-visible > *:nth-child(1) { transition-delay: .1s }
.stagger.is-visible > *:nth-child(2) { transition-delay: .2s }
.stagger.is-visible > *:nth-child(3) { transition-delay: .3s }
.stagger.is-visible > * { opacity: 1 }
```

Stagger-Schritt exakt 100ms, Basis-Dauer exakt 500ms.

**Rezept 3: Scroll-getriebener Clip-Path- und Scale-Reveal für Produktvergleich**

Exakte Werte aus `js2/page-80a25356752c3.js`, Ring-5-Vergleichssektion:

```jsx
const ref = useRef(null);
const { scrollYProgress } = useScroll({ target: ref });

const [.1, 1] = range;                      // Output-Range
const reveal = useTransform(scrollYProgress, [.1, 1], {
  clipPath: [100, 0],                        // Prozent, als Template "inset(0 0 X%)"
  scale: [1, .47]
});

<section ref={ref} className="relative z-1 h-[200svh] w-full">
  <div className="sticky top-0 left-0 grid h-svh w-screen grid-cols-1 grid-rows-1">
    <motion.div className="relative aspect-square size-[90vw] max-h-180 max-w-180 md:size-[50vw]"
                style={{ clipPath: reveal.clipPath, scale: reveal.scale }} />
  </div>
</section>
```

Die zwei Clip-Templates im Original wörtlich:
- `["inset(0 0 ", "% )"]` für den einen Ring (`shouldRevealOnScroll: true`, `transformOutputRange: [100, 0]`)
- `["inset(", "% 0 0)"]` für den anderen (`shouldRevealOnScroll: false`, `transformOutputRange: [0, 100]`)

Die Sektion ist `h-[200svh]`, der Inhalt `sticky top-0 h-svh`. Damit läuft eine doppelte Viewporthöhe an Scrollweg durch eine stehende Bühne. Genau dieses Muster lässt sich in reinem CSS mit `animation-timeline: view()` nachbauen, aber die Seite nutzt bewusst den JS-Weg für breitere Browserunterstützung.

**Rezept 4: Scroll-gesteuerte Text-Einblendung mit Blur und Y-Versatz**

Exakte Werte aus `js2/page-80a25356752c3.js`:

```js
// "40 % Schlanker. Leichter. Kompakter."
const l = useTransform(scrollYProgress, [.8, 1], {
  filter: ["blur(10px)", "blur(0px)"],
  opacity: [0, 1],
  y: [20, 0]
});

// "Langlebiges Design. Maximaler Tragekomfort."
const l2 = useTransform(scrollYProgress, [.4, 1], {
  filter: ["blur(15px)", "blur(0px)"],
  opacity: [0, 1],
  y: [30, 0]
});

// Badge-Ausblendung
const a = useTransform(scrollYProgress, [.1, .2], { opacity: [1, 0] });

// Fortschritts-Overlay
const o = useTransform(scrollYProgress, [0, .58, .67, 1], { opacity: [0, .999, .999, 0] });
```

Zwei Varianten im Einsatz: `blur(10px)` mit 20px Y-Versatz für den einen Text, `blur(15px)` mit 30px Y-Versatz für den anderen. Beide blenden über eine Range von 0,2 bis 0,6 Progress ein.

**Rezept 5: Sticky-Leiste mit `translateY`-Umschaltung**

Exakte Werte aus `js2/4168c042-fae5207e4.js` und dem ausgelieferten Markup:

```css
.pdp-nav {
  position: fixed;
  top: 0;
  inset-inline: 0;
  z-index: 100;
  background: color-mix(in oklab, var(--color-sandstone-200) 30%, transparent);
  -webkit-backdrop-filter: blur(2rem);
  backdrop-filter: blur(2rem);
  transition: transform .5s cubic-bezier(.4,0,.2,1);
  transform: translateY(-100%);
  pointer-events: none;
}
.pdp-nav[data-visible="true"] {
  transform: translateY(0);
  pointer-events: auto;
}
```

`duration-500`, `transition-transform`, `backdrop-blur-[2rem]`, Zustandsklassen `-translate-y-full` beziehungsweise `translate-y-0`.

Produktinformationsleiste auf der Kaufseite, exakte Werte aus dem Markup:
```css
.info-bar {
  position: fixed;
  bottom: 1rem;
  z-index: 90;                      /* z-90 */
  background: color-mix(in oklab, var(--color-sandstone-200) 85%, transparent);
  backdrop-filter: blur(4px);       /* backdrop-blur-sm = 8px laut --blur-sm; inline genutzt ist blur-sm */
  box-shadow: 0px 6px 30px -4px rgba(0,0,0,0.1);
  transition: transform .5s cubic-bezier(.4,0,.2,1), opacity .5s;
  --product-info-bar-motion-y: 100px;   /* mobil */
}
@media (min-width: 768px) { .info-bar { --product-info-bar-motion-y: 20px } }
```
Der Startzustand lautet im Server-Render `style="opacity:0;transform:translateY(var(--product-info-bar-motion-y))"`. Die Eintrittsstrecke ist also 100px mobil, 20px ab 768px.

**Rezept 6: Mega-Menü-Panel mit Höhen-Animation und Milchglas**

Exakte Werte aus `home.html`:

```html
<div class="absolute left-0 top-0 z-0 w-full overflow-hidden bg-sandstone-200 shadow-2xl lg:rounded-b-[3rem]" style="height:0px">
  <div class="absolute top-0 z-20 h-24 w-full bg-gradient-to-b from-sandstone-200 to-transparent lg:hidden"></div>
</div>
```
und darunter die Glasfläche:
```html
<div class="duration-400 absolute inset-0 mx-3 rounded-lg bg-sandstone-500/10 backdrop-blur-[2rem] transition-opacity md:mx-6">
```

```css
.mega-panel {
  overflow: hidden;
  background: var(--color-sandstone-200);
  box-shadow: 0 25px 50px -12px #00000040;   /* shadow-2xl */
  border-radius: 0 0 3rem 3rem;              /* lg:rounded-b-[3rem] */
  height: 0;
  transition: height .4s cubic-bezier(.4,0,.2,1);
}
@media (min-width: 1024px) { .mega-panel.is-open { height: auto } }

.mega-scrim {
  position: absolute; inset: 0;
  background: color-mix(in oklab, var(--color-sandstone-500) 10%, transparent);
  backdrop-filter: blur(2rem);
  transition: opacity .4s cubic-bezier(.4,0,.2,1);  /* duration-400 */
}
```

**Nicht belegbar:** Der exakte Easing-Wert für Framer Motions `type:"tween"` ohne `ease`-Angabe. Die CSS-Easings sind vollständig belegbar. Ebenso nicht belegbar: die Laufzeit der `translateY`-Fahrt des Header-Mega-Panels im geschlossenen Zustand, weil das Panel mit `height:0px` startet und die Öffnung im minifizierten Client-Code steckt.

### 4. Anti-Patterns und Schwächen

1. **Sprachmix auf den deutschen Seiten.** Auf `/de/sleep-and-rest` sind die H2 "Deeper insights, backed by science" und der Fließtext "Sleep is a whole-body state, not just brain activity. Oura gives you insights across every stage of the night, so you wake up knowing exactly how you slept and how to shape your day." unübersetzt. Zwei von vier Feature-Beschreibungen im Tab-Modul sind englisch. Beleg: `sleep.html`, Sektion 1 und 2.

2. **Canonical zeigt auf die englische Seite.** Der deutsche Blog-Artikel `/blog/de/how-oura-measures-sleep-and-validates-accuracy/` trägt `<link rel="canonical" href="https://ouraring.com/blog/how-oura-measures-sleep-and-validates-accuracy/">`. Damit sagt die Seite Google, die englische Fassung sei die kanonische. Für eine deutsche Zielgruppe ist das ein Ranking-Nachteil.

3. **Hreflang fehlt im Blog.** Die Hauptseiten haben 16 `hrefLang`-Alternates. Der Blog-Artikel hat 0. `rel="alternate"` existiert dort nicht.

4. **Der vier-spaltige Footer-Linkbereich ist leer ausgeliefert.** Alle 17 geprüften Seiten enthalten wörtlich `<div class="grid w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4"></div>` ohne Inhalt. Die Labels dafür (`footer_company_heading` = "Our Company", `footer_support_heading`, `footer_blog_heading`, `footer_careers` = "Careers", `footer_press` = "Presse", `footer_about_us` = "About Us") existieren in `js/4168c042-fae5207e4b6.js`, werden auf /de aber nicht gerendert. Im englischen `home-en.html` ist der Container ebenfalls leer. Ergebnis: Der Footer hat keinen Linkblock zu Unternehmen, Karriere, Presse oder Support. Für eine Site mit 80 Hauptseiten ist das eine echte Navigationslücke.

5. **Inkonsistente Kernzahl.** Die Startseite und `/de/why-oura` sagen "86 % der Oura-Mitglieder stellen eine Verbesserung ihres Gesundheitszustands fest". `/de/germany` sagt "88 % der Oura-Mitglieder stellen eine Verbesserung ihres Gesundheitszustands fest". Beide beziehen sich auf dieselbe Aussage. Das untergräbt die Zahl, die auf der ganzen Site als Hauptbeweis dient.

6. **Preiswiderspruch in der Mitgliedschaft.** Auf `/de/membership` steht im gerenderten HTML "für nur 5,99 $ USD */Monat", während die Fußnote auf derselben Seite "5,99 EUR/Monat oder 69,99 EUR/Jahr inkl. Steuern für Mitglieder in der EU" nennt. Ein deutscher Nutzer liest zuerst Dollar, dann im Kleingedruckten Euro. Dasselbe Muster auf `/de/germany`: "5,99 $" und "69,99 $".

7. **`<h1>` fehlt auf der Blog-Übersicht** (`/blog/de/` hat 0 H1) und ist auf mehreren Hauptseiten ein Eyebrow statt einer Aussage. Auf `/de/membership` lautet die H1 "Oura-Mitgliedschaft", auf `/de/science-and-research` "Forschung und Wissenschaft", auf `/de/sleep-and-rest` "Schlaf und Erholung". Das sind Kategorienamen mit `text-body-sm font-bold uppercase`-Styling, keine Nutzenversprechen. Gleichzeitig vergeben andere Seiten starke H1 ("Diskret. Leistungsstark.", "Nimm deine Gesundheit in die Hand"). Die H1-Rolle ist uneinheitlich besetzt.

8. **Nur zwei `@keyframes` und ein synthetisches Bold.** Es gibt keinen Bold-Schnitt der Hausschrift. `font-bold` wird auf einen 400er-Schnitt gelegt und vom Browser synthetisiert. Das ist auf großen Display-Größen sichtbar.

9. **`fm=png` als Bild-Default.** 94 bis 349 `fm=png` gegen 1 bis 2 `fm=webp` pro Seite. AVIF kommt nicht vor. Bei 42 Bildern auf der Ring-5-Seite ist das ein unnötiges Gewicht, auch wenn imgix `auto=format` setzt.

10. **Bild-Zahl ohne Aussage.** Die Startseite lädt 12 Bilder, die Ring-5-Seite 42, die Kaufseite 19, `why-oura` 34. Kein einziges ist als `fetchPriority="high"` markiert außer dem Hero. Die mittleren Bilder sind zwar lazy, aber die absoluten Zahlen sind hoch.

11. **Selbst eingeräumter WCAG-Verstoß.** Der Accessibility-Text im Payload nennt wörtlich "ction moves and does not have a mechanism to pause, stop, or hide the motion. (2.2.2)". Die Auto-Animationen (Hero-Video, Scroll-Effekte) haben keinen Pause-Knopf.

12. **Zwei Farbpaletten für dieselbe Rolle.** Die Ring-5-Seite nutzt `bg-[#E6E4E2]` für die Spezifikationskarte, die Kaufseite `bg-[#E7E0D9]`. Der Unterschied ist minimal, aber es ist keine Design-Entscheidung, sondern Drift. `/de/germany` nutzt zusätzlich die Hex-Werte `#DEDDDB`, `#B8B7B2`, `#1C1C1C` außerhalb der Token-Skala.

13. **Der Blog ist ein Fremdkörper.** Anderer Font-Stack (MessinaSansWeb plus Google Raleway plus Font Awesome), eigenes Theme ("look"), jQuery 3.5.1, eine 45-Zeilen-Inline-Script-Initialisierung für das Inhaltsverzeichnis (`inserIndex()`), separates Consent-Skript. Zwei Stacks für eine Marke.

14. **Kontaktseite ohne Formular.** Obwohl die Meta-Description "fülle bitte das Anfrageformular aus" verspricht, enthält `/de/contact` kein Formular im HTML. Beide Wege führen auf externe Subdomains (`support.ouraring.com`, `s.ouraring.com`). Die Ortsangabe "San Francisco, San Diego, Helsinki und Oulu" ist Text, keine Karte.

### 5. Conversion-Mechanik in 5 Sätzen

1. Die Site verkauft nicht auf der Startseite, sondern baut eine Beweiskette: Der Hero zeigt nur ein Versprechen, der erste CTA führt zur Produktseite, und das eigentliche Überzeugungsargument kommt erst danach als Zahlenkaskade (86 %, 50+ Messparameter, 99 % Genauigkeit, 130+ Publikationen).
2. Der Kauf wird über zwei Produktseiten-Typen gestaffelt: die Marketing-PDP `/store/rings/oura-ring-5` erzeugt Begehren mit Scroll-Inszenierung und drei Genauigkeitszahlen, die Transaktions-PDP `/silver` erledigt Auswahl und Warenkorb, wobei der Kauf-Button bis zur Größenwahl per `pointer-events-none` gesperrt bleibt.
3. Der wiederkehrende Umsatz liegt im Abo, wird aber nie direkt abgeschlossen: Preis, Gratismonat und Kündbarkeit stehen auf `/de/membership`, der Abschluss läuft immer über den Ring-Kauf, und die Seite liefert nur einen einzigen Produkt-CTA ("Alle Produkte entdecken").
4. Vertrauen entsteht durch drei Zahlen-Ebenen mit Quellenpflicht: Prozentwerte immer mit Fußnoten-Anker und Studienangabe im Fußnotenblock, Journals und Universitäten namentlich auf der Wissenschaftsseite, namentliche Mitgliederzitate mit medizinischen Outcomes auf Startseite und Mitgliedschaftsseite.
5. Die Reibung ist bewusst niedrig gehalten: kein Telefonnummer-Verkauf, kein Formular außer dem Newsletter, keine Preistabelle mit Sternchen-Dschungel, stattdessen klare Service-Zusagen im Shop ("Kostenlose und einfache Rücksendung innerhalb von 30 Tagen", "Eingeschränkte 1-Jahres-Garantie", "24/7-Support") und eine Fußnote, die den Preis pro Region vollständig offenlegt.

## Abrufprotokoll

Alle Abrufe mit `curl -sL -m 30..40` und dem User-Agent `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36`. Arbeitsverzeichnis `/tmp/site-oura/`. Kein npm, kein Browser.

### HTML-Seiten

| URL | HTTP | Bytes | Datei |
|---|---|---|---|
| https://ouraring.com/de | 200 | 1510903 | home.html |
| https://ouraring.com/de/store/rings/oura-ring-5 | 200 | 1632816 | ring5.html |
| https://ouraring.com/de/store/rings/oura-ring-5/silver | 200 | 1609009 | buy.html |
| https://ouraring.com/de/membership | 200 | 1555027 | membership.html |
| https://ouraring.com/de/science-and-research | 200 | 1708670 | science.html |
| https://ouraring.com/de/why-oura | 200 | 1737509 | why-oura.html |
| https://ouraring.com/de/how-it-works | 200 | 1499045 | how-it-works.html |
| https://ouraring.com/de/about-us | 200 | 1454601 | about-us.html |
| https://ouraring.com/de/sleep-and-rest | 200 | 1551982 | sleep.html |
| https://ouraring.com/de/store | 200 | 1550181 | store.html |
| https://ouraring.com/de/sizing | 200 | 1445368 | sizing.html |
| https://ouraring.com/de/contact | 200 | 1434857 | contact.html |
| https://ouraring.com/de/germany | 200 | 1522602 | germany.html |
| https://ouraring.com/blog/de/ | 200 | 381847 | blog-index.html |
| https://ouraring.com/blog/de/how-oura-measures-sleep-and-validates-accuracy/ | 200 | 401496 | blog-article.html |
| https://ouraring.com/ | 200 | 1384264 | home-en.html |
| https://ouraring.com/de/404 | 200 | (nicht gespeichert) | |

### Fehlversuche und Nicht-Abrufbares

| URL | HTTP | Bytes | Bemerkung |
|---|---|---|---|
| https://ouraring.com/de/blog | 404 | 1363777 | Blog liegt außerhalb /de |
| https://ouraring.com/de/blog/de/how-oura-measures-sleep-and-validates-accuracy | 404 | 1365859 | fehlender Schluss-Slash |
| https://ouraring.com/blog/de/sitemap.xml | 404 | 273576 | falscher Pfad |
| https://ouraring.com/de/videositemap.xml | 500 | (nicht gespeichert) | Serverfehler |
| https://ouraring.com/b/a/ecom-website/v1.131.0/_next/static/chunks/5245-944843033cab5.js | 403 | (nicht gespeichert) | Chunk nur mit gültigem Referer |
| https://ouraring.com/de/blog/ | 404 | (nicht gespeichert) | falscher Pfad |

### Sitemaps und robots

| URL | HTTP | Bytes |
|---|---|---|
| https://ouraring.com/robots.txt | 200 | 241 |
| https://ouraring.com/sitemap.xml | 200 | 191 |
| https://ouraring.com/growth/sitemap.xml | 200 | 192063 |
| https://ouraring.com/blog/sitemap_index.xml | 200 | 1177 |
| https://ouraring.com/blog/post-sitemap.xml | 200 | 1886256 |
| https://ouraring.com/blog/post-sitemap2.xml | 200 | 2994176 |
| https://ouraring.com/blog/post-sitemap3.xml | 200 | 1470024 |
| https://ouraring.com/blog/wp-sitemap.xml | 200 | (nur Status geprüft) |
| https://ouraring.com/blog/page-sitemap.xml | 200 | (nur Anzahl geprüft: 23 locs) |
| https://ouraring.com/blog/category-sitemap.xml | 200 | (nur Anzahl geprüft: 804 locs) |
| https://ouraring.com/blog/author-sitemap.xml | 200 | (nur Anzahl geprüft: 31 locs) |

### Stylesheet

| URL | HTTP | Bytes | Datei |
|---|---|---|---|
| https://ouraring.com/b/a/ecom-website/v1.131.0/_next/static/css/19bb4987485ff80c.css | 200 | 219638 | main.css |

### JavaScript-Chunks (Startseite, 32 Dateien nach js/, 2260 KB gesamt)

Vollständig geladen: `4bd1b696-182b6b13bdad92e3.js` (173025), `1255-aa23a19ffd02a79d.js` (173812), `main-app-234525b5e3ddebfb.js` (525), `7122-084c7200d44f3329.js` (32108), `global-error-ec89984006467957.js` (5959), `4168c042-fae5207e4b68b6cf.js` (284066), `9922-9c74baf7e4451dec.js` (5765), `1126-f187cf9ac3484579.js` (180350), `1768-701bc35e36b14539.js` (67049), `1128-ea3f282d6e42c166.js` (31015), `4371-2355ae7cb34ff983.js` (76720), `9026-019e3912a78283c3.js` (41629), `9634-df2d27c00589ec2c.js` (103849), `3338-dc2c12dd276a6c8f.js` (346334), `4564-d70189fa98424ddc.js` (24416), `907-5d62d4d305933523.js` (70947), `3757-25dce4130a53abec.js` (32161), `9907-de25ae10a8950b04.js` (23202), `3179-c7d8bfc891188136.js` (22343), `5815-27909ab8ff8f912a.js` (10141), `1470-fd46154d2ec7465f.js` (28705), `9216-37f2b2057513e182.js` (9866), `3314-9cfbd7de82021c9d.js` (23626), `3617-7851471da9633c7c.js` (10788), `app/%5Blocale%5D/page-d405dee8abdfd47b.js` (15451), `8292-8e711cc052362137.js` (36320), `6970-80741e5ec74834b4.js` (9447), `4552-8c6231e13c6dd48f.js` (276925), `app/%5Blocale%5D/layout-9888b81eed86aa84.js` (11680), `app/%5Blocale%5D/not-found-6bfbd08101672a2d.js` (1286), `polyfills-42372ed130431b0a.js` (112594), `webpack-614bf4f98fe5d635.js` (6510). Alle HTTP 200.

Zusätzlich 41 Chunks der Ring-5-Seite in `js2/` (2496 KB), darunter die analysierten `page-80a25356752c3.js` (50399), `4168c042-fae5207e4.js`, `1470-fd46154d2ec74.js`. Der Chunk `5245-944843033cab5.js` (in `js2/` vorhanden) liefert bei direktem Abruf HTTP 403.

### Verwendete Werkzeuge

`curl`, `python3` (Module `re`, `html`, `html.parser`, `json`, `collections`), `grep`, `head`, `wc`. Eigene Parser in `/tmp/site-oura/`: `dom.py` (HTMLParser-basierter DOM-Baum), `extract.py` (Meta- und Heading-Extraktion), `secs.py` und `secsa.py` (Sektionslisten), `mainseq.py` (Heading-Reihenfolge).
