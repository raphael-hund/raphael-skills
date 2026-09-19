# Seitentyp-Blueprints: Wie Business-, Lead-Gen- und SEO-Websites wirklich aufgebaut sind

Quelle: 19 Referenz-Sites, jede von einem eigenen Agenten per curl vollständig
abgerufen und analysiert (Startseite, Leistungs-, Produkt-, Über-uns-, Ratgeber-,
Funnel-, Referenz- und Standortseiten). Die Einzelberichte mit Belegen liegen unter
`research/sites/<slug>.md`. Jede Aussage hier hat dort einen Beleg (Markup, CSS,
JS-Bundle). Was nicht belegbar war, steht als "nicht belegt". Ein Hinweis vorab:
die Referenzen widersprechen sich teils selbst (iqcapital 90 % vs. 80:20
Profit-Split, thermondo 60.000+ vs. 50.000+ Kunden, elephant 1000+ vs. 2000+
Kunden, getsunday $55 vs. $80). Wo es für eine Regel hier relevant ist, ist der
Widerspruch vermerkt; übernommen werden Muster, nie die Zahlen der Referenzen.

Analysierte Sites: ekd-solar, elephantsolar, peter-at, enpal, thermondo, priwatt
(Solar/Wärme), haubnergroup, qu-immobilien, schmidt-immobilien (Immobilien),
seo-labs (Agentur), iqcapital, worldclassedge, trademania (SaaS/Finanz), miles,
uber, getsunday, hellotend, bondvet, ouraring (Consumer/Service/SEO-Masse).

## 0. Wie diese Datei benutzt wird

1. **Seitentyp bestimmen** (Abschnitt 2). Jede Seite eines Projekts bekommt genau
   einen Blueprint. Hybride sind erlaubt (Leistungsseite + Ratgeber), aber benannt.
2. **Sektionsfolge übernehmen**, nicht erfinden. Die Reihenfolge ist das Ergebnis
   von Unternehmen, die davon leben. Abweichungen sind erlaubt, wenn sie in der
   DESIGN.md mit einer Zeile begründet sind.
3. **Bausteine aus Abschnitt 3** einsetzen. Jeder Baustein hat Layout-Familie,
   Inhalt, Trust-Slot, CTA-Slot und ein Code-Skelett.
4. **Anti-Patterns aus Abschnitt 4** prüfen. Die Referenzen machen auch Fehler,
   die wir nicht kopieren.
5. Motion für all das kommt aus `animation-rezepte.md`, Handwerk aus `handwerk.md`.

Die wichtigste Erkenntnis vorab: **Diese Sites sind fast still.** Kein
Parallax-Zirkus, keine Hero-Explosion. Bewegung ist Scroll-Reveal (ein Muster,
immer gleich), Zähler, Akkordeon, Marquee, Karussell, Sticky-Header. Die Wirkung
kommt aus Struktur, Zahlen und Wiederholung, nicht aus Effekten.

## 1. Die Gesetze, die alle Sites teilen

### 1.1 Ein Funnel, viele Eingänge

Jede Site hat genau ein Conversion-Ziel und führt von überall dorthin. Die Labels
wechseln mit dem Kontext, das Ziel nie.

| Site | Ziel | Eingänge | Beleg |
|---|---|---|---|
| elephantsolar | `/anfrage` | 9 verschiedene Button-Labels, 5 Links allein auf der Startseite | elephantsolar.md Muster 1 |
| schmidt-immobilien | `/immobilienbewertung/` | Home 5x, Verkaufsseite 6x, Stadtteilseite 7x | schmidt-immobilien.md Muster 1 |
| hellotend | `/booking/markets` | 36 von 67 Buttons der Startseite heißen "Book Now" | hellotend.md Muster 3 |
| thermondo | `/heizungsplaner/` | Die meisten CTAs (5 von 8 auf der Kern-Produktseite) tragen `?energy_source_new=…` und setzen die erste Funnel-Antwort vorab | thermondo.md Muster 1 |
| ekd-solar | Heyflow | `/anfrage` und `/direktanfrage` teilen denselben Flow, `/ersparnisrechner` und `/checkliste` sind eigene Flows, alles im selben Tool | ekd-solar.md Conversion-Mechanik |
| peter.at | `/anfragen` | Alle 5 CTAs der Startseite | peter-at.md Conversion-Mechanik |

Regel: **Ein Ziel-Slug. Labels kontextuell.** Der Header-CTA ist auf jeder Seite
identisch. Deep-Links dürfen Antworten vorbelegen (`?building_type=…`).

### 1.2 Hero-Formel

Erster Viewport auf allen Lead-Gen-Sites: **Benefit-H1 + Subline + 1 bis 2 CTAs +
Trust-Cluster.** Der Trust-Cluster ist kein Siegel-Haufen, sondern ein Datenpunkt
mit Bezug.

| Site | Trust im Hero | Form |
|---|---|---|
| ekd-solar | "4,2 von 5,0 Sternen aus über 1.800 Bewertungen" | Google-Sterne-Card neben dem CTA |
| elephantsolar | 5 Avatare + "Mehr als 1000+ zufriedene Kunden" + "5.0/5.0 auf Google" + Partner-Badge | Cluster unter dem Text |
| haubnergroup | Trustindex-Sterne + 4 Siegel + 3 Häkchen-Liste + 4 Zahlen-Kacheln | linke Spalte, rechts der Rechner |
| peter.at | 3 Siegel rechts unten + Countdown-Banner | Hero 100vh |
| hellotend | "Over 8,000 five star reviews" mit 5 Sternen | nicht im Hero, sondern im Nutzen-Block (Sektion 5); der Hero selbst trägt keine Sterne |
| getsunday | Sterne "4.3, Based on over 10,000 reviews" direkt unter dem Zip-Formular | Formular-nah |

Drei Hero-Varianten, alle belegt:

- **Text-Hero** (2-Spalten 50/50 oder 60/40, Text links, Foto/Video rechts): elephant (50/50), hellotend ist keine 2-Spalten-Form sondern 3 Spalten 4/4/4 (H1 mittig, zwei Model-Fotos mit Parallax).
- **Full-bleed-Medien-Hero** (Foto/Video als Hintergrund, Text überlagert, oft links): ekd (Video-Hintergrund + Trust-Card), peter (Text links, Bild full-bleed dahinter), thermondo (Foto mit Gradient-Box links), worldclassedge (Video als Hero-Hintergrund, 2 CTAs).
- **Rechner-Hero** (H1 links, Formular/Rechner rechts als gleichwertige Spalte): haubnergroup ("Was ist Ihre Immobilie wert?"), uber (Routen-Formular "See prices"), getsunday (Zip-Formular). Der Lead-Köder ist die Neugier auf das eigene Ergebnis, nicht das Angebot.
- **Zentrierter Hero** (H1 + Subline + CTA mittig, darunter Full-bleed-Medium): miles, seo-labs (H1 mit Inline-SVG-Icons für Google/ChatGPT).

Preis-Anker im oder nahe am Hero, wenn es einen gibt: peter "ab 58 € im Monat, 0 €
Anzahlung" (in 4 Kontexten identisch), getsunday "as low as $55" (Hero, Title-Tag, FAQ-Schema identisch; die llms.txt nennt abweichend "$80/season", Gegenbeispiel). **Eine Zahl, überall dieselbe.**

### 1.3 Trust in Stufen, nicht geballt

Belegte Staffelung (elephantsolar, peter, ekd, iqcapital, haubner):

1. **Hero:** Sterne + Anzahl (ein Datenpunkt).
2. **Nach dem Nutzen:** Stats-Band mit 2 bis 4 harten Zahlen (Zähler): "45.000+ Anlagen", "90 Mio €", "2000+", "12000+".
3. **Mitte:** Namen. Kundenstimmen mit Klarname, Ort, Objekt und Ergebnis ("Familie Ehnert, 105.300 €", "Mario K., Bremen-Borgfeld, 12 Tage bis zum Verkauf").
4. **Vor dem Funnel:** Institutionen. Logo-Wall, Presse, Auszeichnungen ("iF Gold Award 2025", "Wachstumschampion 2026", IHK, ImmoScout-Silber).
5. **Ortsbeweis** (lokale Dienstleister): Referenz-Karten mit PLZ, kWp, Modulzahl, Ersparnis.

Regel: **Zahlen statt Adjektive.** Jede Behauptung trägt eine Zahl (seo-labs:
"105.659+ Impressionen", "43+ Top-3-Rankings"; haubner: "+116.000 €", "4 Wochen zum
vollen Preis"). Fake-Zahlen sind ein No-Go; peter.at's erfundener
"PV-Anfragen"-Zähler (Sinus-Funktion seit 22.05.2024) ist das Negativbeispiel.

### 1.4 Sektions-Rhythmus über Flächenwechsel

Die Sites strukturieren lange Seiten nicht über Trennlinien, sondern über
Hintergrundwechsel in fester Folge:

- seo-labs: hell `#f4f4f4` → dunkel `#211d1d` (Leistungen, Cases, Benefits, Timeline) → hell `#f6f6f6` → dunkel (Report) → hell → weiß (FAQ, Final-CTA).
- peter.at: `bg-color-black` und `bg-color-white` im strikten Wechsel, Headlines ein Font, ein Gewicht (400).
- elephantsolar: Gradient-Bänder für Stats, CTA-Band, Reviews; dazwischen weiß.
- miles: Tokens nur `white` und `primary-900`, Textfarben folgen per Token-Map; die Startseite selbst ist aber durchgehend weiß, dunkel sind nur einzelne Teaser-Kacheln.
- ekd-solar: Stats-Band `#e9e9e6`, Broschüren-Band `#21262b`, Rest weiß.
- qu-immobilien: 15 von 18 Sektionen hell, 3 dunkel (Zählerband, Legal, Final-CTA). Die dunkle Fläche ist eine Ausnahmefarbe für Beweis und Abschluss, kein Wechselrhythmus.
- uber: alterniert in langen Blöcken (6x schwarz, 3x weiß, 1x schwarz, 3x weiß), nicht Sektion für Sektion.

Regel: **Zwei Flächenfarben, selten drei. Die dunkle Fläche markiert Beweis-Cluster
(Stats, Cases, Report) und Final-CTA.** Ob strikter Wechsel (peter, seo-labs), Blöcke
(uber) oder Ausnahmefarbe (qu, miles) hängt vom Register ab; in der DESIGN.md wird
eine der drei Varianten festgelegt. Keine dritte Akzentfarbe.

### 1.5 Ein Akzent, kompromisslos

ekd `#ef870e` (49 Deklarationen, kein zweiter Button-Ton), peter `#f4c23c`,
elephant `#e6fa00` für Zahlen auf Grün, thermondo Markenverlauf als 18-fach
wiederholtes Literal, hellotend ein Akzent-Button 36-fach. **Ein Akzent, eine
Button-Farbe, Rest neutral.**

### 1.6 Der Seitenabschluss ist auf jeder Seite identisch

- ekd: Broschüren-Band `#21262b` (PDF-Download als reibungsarmer Mikroabschluss) + Footer, auf jeder Unterseite.
- elephant: Footer-CTA als schwebende Karte (`margin-top: -15rem`, ragt in den dunklen Footer).
- peter: Funnel-Block → FAQ → Final-CTA → Footer auf Startseite, Über-uns, Referenzen und Artikeln; die Presse-Übersicht endet ohne FAQ und Final-CTA.
- haubner: Final-CTA mit zwei Wegen (Verkaufen / Finden) + Ansprechpartner + Linkliste.
- thermondo: Final-CTA-Banner auf `#f5f3ef` + Footer.

Regel: **FAQ → Final-CTA → Footer** ist die Standard-Endsequenz auf Conversion-Seiten
(Startseite, Leistung, Produkt, Standort, Referenzen). Übersichtsseiten (Ratgeber-Hub,
Presse) enden mit Kontakt-CTA oder nur Footer. Der Final-CTA bietet oft einen
weicheren zweiten Weg (PDF, Rückruf, WhatsApp). Gegenbeispiele, die wir nicht
kopieren: bondvet setzt den Final-CTA doppelt und vor einen fremden FAQ-Block, miles
den App-Download als Sektion 4 von 9.

### 1.7 Zigzag ist das Arbeitspferd der Leistungsseiten

thermondo (3 Zigzags direkt nach dem Hero), ekd (2 Performance-Zigzags plus
Feature-Zigzag auf der Speicherseite), elephant, uber (3 H3-Blöcke mit Foto), miles
(6 Anlass-Zigzags in Folge, die mit Tarif-Karten unterbrochen werden). Die 23
Produkt-Zigzags auf der ekd-Systemseite liegen im DOM nach dem Footer und sind
Builder-Reste, kein Gegenbeleg. Regel aus design-doktrin (Zigzag-Cap) bleibt:
**maximal 3 in Folge, dann Flächenwechsel oder Grid.** Sie stammt aus der Doktrin,
nicht aus den Sites.

### 1.8 Ratgeber ist Hybrid, nicht Blog

Die starken Sites bauen Leistungsseiten als Landing-Oberteil plus Ratgeber-Unterteil
mit Inhaltsverzeichnis und Inline-CTAs an Kapitelgrenzen (ekd 34 Sektionen,
thermondo, haubner). Artikel haben Key-Takeaways, TOC, Autor-Box mit
"Fachlich geprüft", Lesezeit, Zwischen-CTA, verwandte Artikel, FAQ mit Schema.
Wer das weglässt (peter, iqcapital, uber: kein TOC, kein FAQ, keine Autorenbox), hat
die schwächeren Artikel.

### 1.9 Lokale Seiten sind Templates mit drei getauschten Blöcken

haubner (40+ Orte), schmidt (Stadtteilseiten als Startseiten-Klon mit getauschtem
H1, Hero-Absatz, Marktblock, FAQ), miles (13 Städte), getsunday (1.347
Local-Guides mit lokaler Datentabelle), hellotend (18 Leistungen × 10 Märkte).
**Ein Template, lokale Daten in H1, Intro, Marktblock, FAQ, Referenzen.**

### 1.10 Motion-Profil der Referenzen

Zuerst die ehrliche Zählung: **6 von 19 Sites haben gar kein Scroll-Reveal** (bondvet,
enpal, thermondo, hellotend, priwatt, getsunday), elephantsolar nutzt statt Reveal
einen Scroll-Progress-Versatz. Reveal ist also optional, nicht konstitutiv. Wo es
eines gibt, ist es genau ein Muster pro Site.

| Bewegung | Belegte Werte (wörtlich aus den Berichten) | Sites |
|---|---|---|
| Scroll-Reveal von unten, sanft | `translateY(24px)` + opacity als SSR-Startzustand, 45 Elemente, kein Stagger; Dauer und Easing nicht belegbar (worldclassedge). Framer-Default `duration .45, ease [.4,0,.1,1]`, Y-Varianten 8/16/20/24 px, Bilder zusätzlich `blur(8px)` (iqcapital). `fadeUp: y 20, duration .5`, `blurFadeIn`, `viewport: once` (oura) | worldclassedge, iqcapital, oura, miles, trademania |
| Scroll-Reveal von unten, deutlich | `translateY(100px)` → 0, `outQuart`, 1000 ms, Trigger bei 30 % Sichtbarkeit (peter, Webflow-Preset). Dasselbe Preset 41x mit Delay-Stufen 100 bis 400 ms (qu-immobilien). `translateY(100px)`, 1100 ms, Schwelle 35 % Viewport, Selbstabschaltung der Listener (uber) | peter, qu-immobilien, uber, ekd (Startwerte 50/75/100 px, Dauer nicht belegt) |
| Stagger | 70 ms `staggerChildren` (miles), 90 ms `STACK_STEP` (trademania), 100 ms je Index (oura), 150 ms Basis, aber nur ein Element pro Seite (uber). Explizit ohne Stagger: peter, worldclassedge, getsunday | 4 mit, 3 ausdrücklich ohne |
| Zähler | `data-duration="2000"` nur auf Referenzen (haubner), `duration: 1` s (enpal), Ziffern-Roll 900 ms + Deckkraft 450 ms (priwatt), Easing-Map mit `smooth [0,0,.2,1]` und Trigger `threshold .2`, Dauer als Prop (seo-labs). Kein Zähler: elephant (statische Zahlen), ekd nutzt Salient-Milestone ohne belegte Dauer | haubner, enpal, priwatt, seo-labs |
| Akkordeon | 500 ms `ease` Höhe + Icon 45° (peter), `grid-template-rows` (worldclassedge), native `<details>` ohne Animation (schmidt, uber, haubner), Handorgel mit Farbwechsel 200 ms (thermondo), FAQ-Icon `transform .2s` (enpal). Elephant hat gar kein Akkordeon | fast alle |
| Logo-Marquee | `linear infinite`, 20 s (worldclassedge), 30 s (peter, qu), 40/25 s gegenläufig (enpal), 80 s (haubner), 12 bis 15 s (iqcapital), 145 bis 150 s (trademania); elephant läuft per Splide-autoScroll ohne Sekunden-Dauer, Maske 25 % je Seite; `mask-image` 12 % beidseitig (iqcapital), DOM doppelt mit `aria-hidden` | haubner, iqcapital, seo-labs, elephant, enpal, qu, peter |
| Karussell | `transition: transform 1000ms cubic-bezier(.2,.8,.4,1)` ohne Library, manuell per Chevron (uber), Swiper `speed 500`, Autoplay 5000 ms, Pause bei Hover (schmidt), GSAP `osmo-ease 0.625,0.05,0,1`, 725 ms, Autoplay 8 s mit Hover-Pause (elephant), 3 Swiper-Instanzen ohne Autoplay (thermondo) | uber, schmidt, elephant, thermondo, enpal |
| Sticky-Header | Nicht universell: schmidt, qu und trademania haben keinen. Wo vorhanden: Klasse ab 46 px (hellotend), ab 9 % Scrolltiefe (enpal), ab 1 px per jQuery (peter), `transition-all duration-500` (oura), Verstecken bei Scroll-down `-2.35rem` 250 ms (elephant), Farbwechsel des CTA ab 70 % Tiefe mit Puls (thermondo) | 16 von 19 |
| Button-Hover | Fläche/Farbe 200 bis 300 ms, Zwei-Ebenen-Textwechsel `duration-500` (iqcapital), Flächenwachstum + Icon-Rotation `.5s cubic-bezier(.65,0,.35,1)` (worldclassedge), Label-Tausch `.3s cubic-bezier(.4,0,.2,1)` (trademania), Helligkeits-Filter (getsunday Buttons; der `scaleX`-Unterstrich `.3s cubic-bezier(.22,.61,.36,1)` sitzt dort auf Nav-Links, nicht auf Buttons), Radius-Sprung (priwatt), nur `--bg-color`-Token-Wechsel (bondvet). Gegenbeispiel: thermondo wechselt die Kern-Buttons hart ohne `transition` | fast alle |
| Karten-Hover | Schatten `0 0 5px → 0 0 15px`, 200 ms, kein Scale (thermondo); `0 24px 64px #e0e0e07a`, 300 ms (elephant); Bild-Zoom 1.1 über 800 ms (peter, träge, nicht kopieren) | die guten ohne Scale |
| Sticky-Scroll-Panels | `sticky top-[10rem]`, 3 Panels (iqcapital); `min-height: 300vh` mit innerem Sticky-Screen (trademania); Sticky-Stack (miles); `h-[200svh]` mit Clip-Path- und Scale-Reveal (oura) | nur SaaS und Consumer-Produkt |
| Reduced Motion | 4 Ebenen: CSS, Markup (Video gegen Standbild), JS-Listener, noscript (oura). Abschaltung im Reveal-Modul (uber). Lenis-Guard (seo-labs). **Fehlt komplett** bei ekd, peter, elephant, enpal, qu, priwatt, bondvet, thermondo (nur Bootstrap) | 3 sauber, 8 ohne |

Alle Business-Sites zusammen: **5 bis 8 Bewegungsarten pro Site, nie mehr.**
(Ausreißer nach oben: trademania und iqcapital mit je über 8 Arten, darunter
Scroll-Scrubs und 300-vh-Stickies; sie liegen damit über unserem Budget, nicht
darunter.) Die
Hausregel in `animation-rezepte.md` entscheidet sich für das sanfte Reveal (16 px,
600 ms, Stagger 70 bis 90 ms, maximal 4 Gruppen), weil die Sites mit dem deutlichen
100-px-Reveal (Webflow-Preset, 1000 ms) genau die "poppende" Wirkung erzeugen, die
vermieden werden soll. Das ist eine Designentscheidung, keine Mehrheitsabstimmung.
Reduced Motion ist bei uns Pflicht, weil es den meisten Referenzen fehlt.

## 2. Blueprints je Seitentyp

Notation: Layout-Familie in Klammern. T = Trust-Slot, C = CTA-Slot.

### 2.1 Startseite: Lead-Gen-Dienstleister (Solar, Immobilien, Handwerk, Agentur)

Belegte Länge: 14 (peter) bis 26 (ekd) Sektionen. Ziel: Vertrauen aufbauen, dann
in den einen Funnel. Empfohlene Standardfolge (Synthese aus ekd, elephant, peter,
haubner, seo-labs, thermondo):

| Nr | Sektion | Layout | Inhalt | T/C |
|---|---|---|---|---|
| 1 | Header sticky | Full-bleed, 1 Zeile | Logo, 4 bis 6 Links, Telefon, 1 Primär-CTA. Optional Topbar (Bewertungs-Aufforderung, Aktion mit Countdown) | C |
| 2 | Hero | 2-Spalten 50/50 oder Rechner-Hero | Benefit-H1 (Zahl oder Umkehr), Subline, 1 bis 2 CTAs, Trust-Cluster (Sterne + Anzahl, Avatare, 3 Häkchen) | T+C |
| 3 | Logo-/Siegel-Marquee | Full-bleed | 8 bis 19 Logos, Label "Bekannt aus" oder "Wir setzen auf Qualitätsmarken" | T |
| 4 | Nutzen | 3er-Grid oder Bento mit 2 überlappenden Boxen (ekd `translate_y_-100px`) | 3 bis 4 Benefits, je Headline + 1 Satz, optional Bild oben | |
| 5 | Stats-Band | 2er- bis 4er-Grid auf Flächenwechsel | 2 bis 4 Zähler mit harten Zahlen und Untertitel | T |
| 6 | Leistungen / Produkte | 3er-Grid, Tabs oder Karussell | 3 bis 6 Karten, je Bild, H3, 1 Satz, Link | C (sekundär) |
| 7 | Rechner-Teaser oder Micro-Funnel | 2-Spalten | "Was ist Ihre Immobilie wert?" mit 1 bis 2 Feldern (haubner PLZ + Objektart), Ersparnisrechner-Teaser (ekd) | C |
| 8 | Prozess | Timeline oder 3er- bis 5er-Stepper | "In 3 (5) Schritten", je Nummer, Titel, 1 Satz, optional Video | |
| 9 | Kundenstimmen | Karussell oder 3er-Grid | Klarname, Ort, Objekt, Ergebnis-Zahl; Fallstudien-Format (haubner) | T |
| 10 | Referenzen / Standorte | Karten-Grid | Referenz-Karten mit Ort, kWp, Ersparnis; oder Standort-Liste (ekd 13 Karten, während der Trust-Text "15+ Standorte" sagt; hellotend 33) | T |
| 11 | Vergleich oder Risiko-Umkehr | Vergleichstabelle oder 2-Spalten | "Wir vs. Standard" 8 bis 10 Zeilen (peter, haubner, worldclassedge), "Das Risiko liegt bei uns" | |
| 12 | Über uns kurz | 2-Spalten 50/50 | Foto, 2 Absätze, 3 Zähler (seo-labs) | T |
| 13 | Lead-Magnet | 2-Spalten | Checkliste, Report, Broschüre (ekd, seo-labs) | C (weich) |
| 14 | Ratgeber-Teaser | 3er- oder 4er-Grid | 3 bis 4 Artikel | |
| 15 | FAQ | Akkordeon, 4 bis 7 Fragen | native `<details>`, FAQPage-Schema | |
| 16 | Final-CTA | Zentriert-schmal oder 2 Wege | H2 + 1 Absatz + Primär-CTA, optional Telefon/WhatsApp | C |
| 17 | Footer | 4 bis 6 Spalten | Leistungen, Standorte, Rechtliches, Kontakt, Siegel | |

Varianten mit Beleg:
- **Rechner-Hero** (haubner): Sektion 7 rückt in den Hero, dann folgt direkt das Stats-Band.
- **Video-Hero** (ekd, elephant, worldclassedge): Autoplay muted, Poster-Bild Pflicht, `fetchpriority="high"` auf dem Poster. Keine der drei Referenzen macht beides (elephant weder Poster noch fetchpriority, siehe §4); das ist die Hausregel gegen ihr Anti-Pattern.
- **Tabs für Produkte** (elephant: 5 Tabs mit Icon + Label, je Pane Produktkarten).
- **Verneinungs-Sektion** (getsunday "Those yellow flags are red flags", Liste mit 4 konkreten Wirkstoffnamen): Vertrauen durch das, was man NICHT tut.
- **Team-Grid** (haubner 9 Personen, elephant 3 Abteilungen) nur bei personengetriebenen Dienstleistern.

Code-Skelett der Komposition (Next.js/React, Sektionen als Komponenten mit
gemeinsamer Container-Breite):

```tsx
// app/page.tsx
export default function Home() {
  return (
    <>
      <Header cta={{ label: "Ersparnis berechnen", href: "/anfrage" }} phone="+49 …" />
      <main id="main">
        <Hero
          eyebrow="Photovoltaik in Niedersachsen"
          h1="Solaranlage mit Speicher ab 58 € im Monat"
          sub="Festpreis, 0 € Anzahlung, Montage in 8 Wochen."
          primary={{ label: "Angebot in 2 Minuten", href: "/anfrage" }}
          secondary={{ label: "So funktioniert es", href: "#prozess" }}
          trust={{ rating: 4.9, count: 1832, source: "Google" }}
          media={<HeroImage />}
        />
        <LogoMarquee label="Wir verbauen" logos={brands} />
        <Benefits items={benefits} />                       {/* 3er-Grid */}
        <StatsBand tone="muted" stats={stats} />            {/* Zähler */}
        <Services items={services} />                       {/* 3er-Grid, Links auf Leistungsseiten */}
        <MicroFunnel h2="Was spart Ihr Dach?" fields={["plz", "dachtyp"]} />
        <Process id="prozess" steps={steps} />              {/* Timeline */}
        <Testimonials items={reviews} />                    {/* Karussell, Klarname + Ort + Zahl */}
        <References items={projects} />                     {/* Karten mit PLZ, kWp, Ersparnis */}
        <Comparison rows={rows} us="Wir" them="Regionaler Anbieter" />
        <AboutShort />
        <LeadMagnet asset="Checkliste PV 2026 (PDF)" />
        <Faq items={faq} />
        <FinalCta h2="Bereit für Ihr Angebot?" primary="Angebot anfordern" secondary="Rückruf vereinbaren" />
      </main>
      <Footer />
    </>
  );
}
```

### 2.2 Startseite: SaaS / Produkt / Plattform

Belege: worldclassedge (11), iqcapital (22), miles (7 pageBuilder-Sektionen), uber
(11), oura, trademania. Ziel: Registrierung, App-Download, Kauf.

| Nr | Sektion | Layout | Inhalt |
|---|---|---|---|
| 1 | Header | Full-bleed | Logo, 5 bis 6 Anker-Links, Login + Register rechts. Kein Telefon. |
| 2 | Hero | Zentriert oder 2-Spalten mit Formular | H1 kurz (5 Wörter nur bei worldclassedge belegt, Imperativ bei miles/uber), Eyebrow in Mono, 1 CTA, Video oder Produktbild; uber: Formular liefert sofort eine Zahl ("See prices") |
| 3 | Logo-Wall / Presse | Marquee | |
| 4 | Pricing früh (iqcapital Sektion 4) oder Produkt-Tabs (uber 5er-Grid) | Tabs + Karten-Grid | Bei Kaufprodukten steht der Preis vor dem Beweis |
| 5 | Feature-Blöcke | Sticky-Stack (miles 3 Karten), Sticky-Panels (iqcapital 3 Stufen), Benefits-Tabs 01/02/03 (worldclassedge) | Ein Feature pro Panel, Headline + 3 Bullets + CTA |
| 6 | Stats-Band | 4er-Grid | iqcapital: "20,000+ Traders", "4.7/5", "48h", "$3.5M+"; "52 Countries" und "4,8 ★" laufen dagegen im Marquee, nicht im Grid |
| 7 | Produkt-Mockup | Weiße Sektion, Browser-Chrome | Scrollbares App-Mockup (worldclassedge) |
| 8 | Vergleich | 2 Spalten "Andere vs. Wir" | 9 Zeilen, rote X links, Haken rechts, konkrete Sätze (Preis, Zeit) |
| 9 | Kundenstimmen / Erfolgsgeschichten | Slider oder Sticky-Horizontal | Zahlen im Zitat |
| 10 | Team / Mentoren / Coaches | 3er-Grid Portraits | nur wenn Personen das Produkt sind |
| 11 | Ratgeber-Teaser | Karten-Grid | |
| 12 | FAQ | Akkordeon | |
| 13 | Final-CTA + App-Download | Full-bleed dunkel, QR-Codes | |
| 14 | Footer | | Risk-Disclaimer bei Finanz |

Typische Signaturen: Eyebrow aus Mono-Strichen mit gestaffelter Opacity
(worldclassedge), Font-Trio Mono/Serif/Sans, viewport-gekoppelte Root-Schriftgröße
(`:root{font-size:.3636vw}`, iqcapital und worldclassedge, Vorsicht: nur mit
Mindestgrößen), Zwei-Ebenen-Button.

### 2.3 Leistungsseite, Variante A: Landing (kurz, verkaufend)

Belege: peter `/anfragen`, seo-labs `/seo`, haubner Verkaufsseite, uber Fahrt/Fahrer,
thermondo Wärmepumpe-Kaufen, miles Carsharing.

| Nr | Sektion | Layout | Inhalt |
|---|---|---|---|
| 1 | Hero | 2-Spalten 60/40 oder zentriert-schmal | H1 mit Wertversprechen oder Risiko-Umkehr ("zum vollen Preis, ohne Risiko"), Badge mit Aktion, 3 Häkchen, Trust-Zeile, 1 bis 2 CTAs |
| 2 | Stats-Leiste | 2er- bis 4er-Grid | 2 bis 4 Zahlen |
| 3 | Logo-Marquee oder Trust-Grid | Full-bleed | Zusatz-Variante aus den Berichten: Live-Payout- oder Bewertungs-Marquee mit namentlichen Einträgen, Beträgen und Flaggen (iqcapital, 2 Reihen) sowie vertikale Testimonial-Marquees gegenläufig (trademania, 4 Spalten, 145 bis 150 s) |
| 4 | Nutzen | 4er-Grid oder nummerierte Bento "Leistung 01…05" (seo-labs) | |
| 5 | Zigzag-Features | 2 bis 3 Zigzags | je Label, H2, Text, CTA; bei Produkten mit Spec-Zahlen |
| 6 | On-Page-Qualifier | 6er-Kachel-Grid | "Für welchen Gebäudetyp?" als `<button type="submit">` je Kachel, Antwort wandert in die Funnel-URL (thermondo) |
| 7 | Vergleichstabelle | 3 Spalten, 8 bis 10 Zeilen | "Standard-Makler / Privatverkauf / Wir" (haubner), "Lokale Anbieter / Wir" (peter) |
| 8 | Risiko-Umkehr / Garantie | 2-Spalten | "Das Risiko liegt bei uns", Geld-zurück (seo-labs Branchenseite) |
| 9 | Fallstudien | 3er-Grid | Ausgangslage / Maßnahmen / Zitat / Ergebnis-Zahl (haubner) |
| 10 | Ergebnis-Galerie | Grid | "Verkauft. Verkauft. Verkauft." 14 Objekte (haubner), Payout-Bilder (iqcapital) |
| 11 | Video-Testimonial | 2-Spalten | Zitat als H2 |
| 12 | Prozess | Timeline 3 bis 5 | |
| 13 | Rechner-Doppel | 2er-Grid | "Sofort bewerten" oder "Experte buchen", beide "Kostenfrei" (haubner) |
| 14 | FAQ | Akkordeon + "Ihre Frage ist nicht dabei?" | |
| 15 | Final-CTA | 2-Spalten | mit Telefon/WhatsApp/Finanzierung als zweitem Weg |
| 16 | Footer | | |

Funnel-Sonderform (peter `/anfragen`): **Formular oben, Vertrauen danach.** Hero-H1
+ Heyflow-Widget + Logo-Wall zuerst, dann Prozess, Bewertungen (3 Portale mit
Sternwerten), Vergleich, FAQ. Für Traffic aus Ads, der schon entschieden ist.

### 2.4 Leistungsseite, Variante B: Ratgeber-Hybrid (lang, SEO-tragend)

Beleg: ekd `/solaranlagen/` (34 Sektionen), thermondo Produktseiten, haubner
Standort- und Verkaufsseiten. Das ist die wichtigste Seitenform für
SEO-lastige Projekte. Priwatt ist kein Beleg für die Hybrid-Form: seine
Leistungsseiten sind Landingpages mit Tab-Hub am Ende, der geprüfte Artikel hat
kein Inhaltsverzeichnis und keine Heading-IDs.

| Nr | Sektion | Inhalt |
|---|---|---|
| 1 | Hero | wie 2.3, Trust-Zeile Pflicht |
| 2 | Intro-Bild + Nutzen-Block | 3 Benefits |
| 3 | **Inline-CTA 1** | Ein Satz + Button, kein Band |
| 4 | **Inhaltsverzeichnis** | Ankerliste, `scroll-margin-top` = Header-Höhe |
| 5 bis 12 | **6 bis 8 Ratgeber-Kapitel als H2** | je 150 bis 300 Wörter, Zwischenbilder, Tabellen, Kriterien-Karten (ekd: 7 Kriterien-Karten in Kapitel 3) |
| dazwischen | **Inline-CTAs an Kapitelgrenzen** | ekd: 4 Blöcke (Rows 4, 9, 12, 23 bis 25; die Synthese im Bericht sagt 3, die Detail-Tabelle 4), thermondo: 4x `cta-teaser` zentriert. Label variiert ("Jetzt Angebot anfordern", "Zum Ersparnisrechner") |
| 13 | Autoritäts-Block | Testergebnis, Zertifikat (thermondo) |
| 14 | On-Page-Qualifier | 6er-Kachel-Frage |
| 15 | Kundenstimmen | Karussell mit Modal-Volltext |
| 16 | Promotion / Finanzierung | 2-Spalten |
| 17 | Lead-Magnet | Checkliste/PDF |
| 18 | FAQ | 5 bis 9 Fragen, Schema |
| 19 | Final-CTA + Footer | |

Layout-Regel für den Ratgeber-Teil: Textspalte `min(65ch, 100% - 48px)`,
Full-bleed nur für Bilder und CTA-Bänder (miles: Text in `grid-column: 3/span 8`,
Bilder Full-bleed). Sticky-Sidebar mit CTA ab 1024px (thermondo 25 % Breite).

### 2.5 Produktseite (physisches Produkt oder Produktkategorie)

Belege: ekd Speicher (50 Sektionen), elephant Kategorieseiten, getsunday PDP, miles
Pass, oura.

| Nr | Sektion | Inhalt |
|---|---|---|
| 1 | Section-Header | Brotkrumen-Label "Produkte ❯ X", H1, 1 Subline (elephant) |
| 2 | Benefits-Trio | 3 Karten |
| 3 | Feature-Zigzag | mit Garantie-Zahl ("Kapazitätsgarantie 10 Jahre") und Primär-CTA |
| 4 | Fakten-Grid | 3er-Grid, 5 bis 6 Items H3 + 1 Satz (elephant `fact-grid`) |
| 5 | Feature-Bänder | 3 Stück, je Full-bleed mit Bild |
| 6 | Performance / Sicherheit / Langlebigkeit | je Intro + 2 bis 3 Blöcke mit Stat-Zahlen (ekd) |
| 7 | Produkt-CTA | Band mit Telefon |
| 8 | Datenblatt-Downloads | Liste |
| 9 | System-Einordnung | "Passt zu …" mit Komponenten-Karussell |
| 10 | Kontakt / Final-CTA / Footer | |

E-Commerce-PDP (getsunday): Breadcrumb → Produktkopf 2-Spalten (Bildcarousel mit
Thumbnails links, Name, Preis, Sterne, Mengen-Inkrementor, Add-to-cart rechts) →
Beschreibung + Info-Liste 6 Icon-Zeilen → Anleitungs-Teaser → Related → Reviews →
Sticky Mobile-CTA.

Pass-/Abo-Seite (miles): Hero → Benefits 3er → Plan-Karten 2er + 2er →
Vergleichstabelle 5 Spalten in `overflow-x-auto` → CEO-Video → FAQ 11.

### 2.6 Über-uns

Belege: ekd (23), peter (13), elephant, haubner, hellotend (14), uber (9), miles,
worldclassedge (Manifest).

| Nr | Sektion | Inhalt |
|---|---|---|
| 1 | Hero | H1 als Aussage ("Wir sind …") oder Nutzenumkehr, 1 CTA, Bild-Header |
| 2 | Mission + Vision | 2-Spalten Text + Bild, je Label + H2 + Fließtext |
| 3 | Stats-Trio | 3 Zahlen (Gründungsjahr, Anlagen, Mitarbeitende) |
| 4 | Meilensteine | Timeline, 2 Rows (ekd) |
| 5 | Werte | 3er- oder 6er-Grid (miles 6, ekd 3) |
| 6 | Team | Grid mit Foto, Name, Position; nach Abteilung gruppiert (elephant 3 Sektionen) |
| 7 | Gründer-Statement | Zitat mit Portrait (uber CEO-Brief, iqcapital Gründer-Story als Zigzag) |
| 8 | Standorte / Präsenz | Karte oder Bundesländer-Karussell (peter 9 Slides) |
| 9 | Video | mit Fortschrittsbalken, Modal (peter) |
| 10 | Karriere-CTA | 2 Buttons |
| 11 | Presse-Kontakt / Magazin-Teaser | |
| 12 | Funnel-Block → FAQ → Final-CTA → Footer | wie überall |

Manifest-Variante (worldclassedge): Hero mit Eyebrow "A letter from …" → Brief in
`max-width: 65ch` mit H3-Zwischenüberschriften → Signatur → Final-CTA. Für
Marken mit Gründerstimme.

### 2.7 Ratgeber-Übersicht

Belege: ekd (11), haubner, elephant, hellotend, getsunday, thermondo.

1. Hero: H1 ("Der HAUBNER GROUP Ratgeber"), Subline, optional Sprung-CTA. Nicht H2 (seo-labs-Fehler).
2. Kategorie-Navigation: Chips oder Karussell (hellotend 15 Kategorien).
3. Featured: 1 Großkarte "Unser neuester Artikel" oder 3er-Grid.
4. Artikel-Grid 3/2/1: Bild 250px hoch, Kategorie-Overlay, `<time>`-Datum, H3, 2-Satz-Teaser, Autor-Zeile, "Weiterlesen".
5. Paginierung numerisch ("Page 1 of 14").
6. Cross-Sell: 3er-Grid mit Leistungs-CTAs (ekd).
7. Kontakt-CTA (Telefon, WhatsApp, E-Mail) + Footer.

### 2.8 Ratgeber-Artikel

Belege: haubner (stärkstes Beispiel), thermondo, getsunday, hellotend, ekd.

| Nr | Element | Detail |
|---|---|---|
| 1 | Breadcrumbs | dunkler Balken oder Zeile, BreadcrumbList-Schema |
| 2 | Artikelkopf | Kategorie-Chip, H1 als vollständige Aussage, Datum, Autor mit Foto, "Fachlich geprüft: Name", "Lesezeit: 8 Min.", "Aktualisiert am" |
| 3 | Titelbild | Full-bleed, `fetchpriority="high"`, nicht lazy |
| 4 | **Key-Takeaways** | Box "Das Wichtigste vorab", 5 bis 6 Bullets |
| 5 | **Inhaltsverzeichnis** | Ankerliste, sticky in Sidebar ab 1024px, `data-scroll-to` mit Header-Offset |
| 6 | Body | 8 bis 15 H2 mit H3, 700 bis 2.600 Wörter, Tabellen, Info-Boxen mit Icon, interne Links, Rechner-Einbettung als Mount-Punkt |
| 7 | **Zwischen-CTAs** | nach Kapitel 3 und am Ende, 2er-Grid "Verkaufen" / "Kontakt" (haubner), 4x zentriert (thermondo) |
| 8 | Sticky-Sidebar | 25 % Breite: TOC, Share, CTA-Karte |
| 9 | Sticky-Fortschrittsbalken | oben, `scaleX` (hellotend) |
| 10 | Pull-Quote / Zahlen-Trio | 1 pro Artikel (seo-labs) |
| 11 | Quellenabschnitt | bei Zahlen Pflicht (getsunday) |
| 12 | Autor-Box | Foto 50x50, Bio, Rolle |
| 13 | FAQ | 4 bis 9 Fragen, FAQPage-Schema |
| 14 | Verwandte Artikel | 3er-Grid "Diese Beiträge passen dazu" |
| 15 | Kontaktblock mit Anker `#kontakt` + Formular oder Final-CTA | |
| 16 | Footer | |

Layout-Grid (aus handwerk.md, belegt durch miles/thermondo):

```css
.article {
  display: grid;
  grid-template-columns: 1fr min(65ch, calc(100% - 48px)) 1fr;
}
.article > * { grid-column: 2; }
.article > .full-bleed { grid-column: 1 / -1; }
@media (min-width: 1024px) {
  .article-layout { display: grid; grid-template-columns: 1fr 25%; gap: 48px; }
  .article-aside { position: sticky; top: 96px; align-self: start; }
}
```

### 2.9 Funnel / Anfrage (Multi-Step) und Danke-Seite

Belege: elephant `/anfrage` (3 Schritte im Markup), thermondo Heizungsplaner (29
Schritte aus dem Vue-Bundle), haubner Maklaro, ekd/peter Heyflow, hellotend Booking,
schmidt `btm-valuation` (10 Schritte).

Struktur der Funnel-Seite:

1. Optionaler Minimal-Header (nur Logo, kein Menü).
2. Split-Screen ab 1024px: links Persuasion (H1, 3 Argument-Karten, Foto des Ansprechpartners, Trust "100+ Unternehmen", Trustpilot), rechts der Funnel (thermondo, seo-labs `/termin`).
3. Schrittfolge, zwei belegte Schulen:
   - **Sachfragen zuerst, Kontakt zuletzt** (Default für Handwerk, Solar, Immobilien, Praxis): elephant Gebäudetyp (3 Bild-Kacheln) → Produkte (3 Kachel-Checkboxen: Stromspeicher, Wallbox, Wärmepumpe) → Kontakt (4 Felder); thermondo 16 Sachfragen → PLZ-Prüfung → Kontakt → Self-Qualify-Zweig mit Förderprognose als Zwischenbelohnung (30 % ohne Eigentum, 70 % Standard, 80 % bei Heizungsalter 20+ Jahre) → Terminbuchung; bondvet Stadt → Standort → Termin → Tier → Kontakt. Microcopy mit Restschritten ("Nur noch 3 Schritte!") und Begründungs-Akkordeon pro Datenfrage ("Warum benötigen wir diese Information?"): enpal. Wer den Funnel clientseitig mountet (Heyflow, eigenes Widget), rendert einen Skeleton-Loader mit fester `min-height` (enpal 416px Shimmer, thermondo Spinner), damit ohne JS kein leeres Custom Element stehen bleibt (Gegenbeispiel §4).
   - **E-Mail zuerst, dann Qualifizierung** (Default für SaaS, Ausbildung, Abo, wenn der Lead auch ohne Abschluss per E-Mail nachgefasst wird): enpal `emailFormSlide → nameFormSlide → phoneFormSlide`, trademania "Schritt 1 von 4" mit einem E-Mail-Feld, getsunday Zip → Anmeldung → Quiz → Preis.
   Die Wahl steht in der DESIGN.md. Mischformen (Sachfrage, E-Mail, Rest) sind erlaubt, wenn der erste Schritt maximal ein Feld hat.
4. Jeder Schritt: Label "SCHRITT n", H3, Erklärtext, Fortschrittsbalken, Kachel-Grid, Zähler "n/3", Zurück + Weiter.
5. Microcopy an der Datenabfrage: "Diese benötigen wir, damit sich unser Team so schnell wie möglich mit Deinem Angebot melden kann." Und Kontroll-Versprechen (haubner): "Wir melden uns genau einmal. Danach liegt der Ball bei Ihnen."
6. Unter dem Funnel: Support-Block ("Fragen offen? Kein Problem!" mit Team-Foto), Presse-Wall, 3 Auszeichnungen, Stats-Trio (ekd).
7. Vier Ausgänge (thermondo): qualifiziert, disqualifiziert, abgelehnt, telefonische Klärung. Jeder mit eigener Seite.

Danke-Seite: H1 Bestätigung, was als Nächstes passiert (3 Schritte), zurück in den
Content (elephant), oder Termin-Box mit Countdown und Kalender-Buttons (worldclassedge).

Deep-Link-Regel: Jeder CTA darf die erste Antwort vorbelegen (`/anfrage?produkt=speicher`).

Skelett eines Schritts (React, Motion-Werte aus animation-rezepte.md):

```tsx
<StepFrame step={2} total={3} label="Schritt 2" title="Was soll geplant werden?">
  <p className="text-ink-muted">Mehrfachauswahl möglich.</p>
  <RadioCards name="produkte" multiple options={[
    { value: "pv", label: "Solaranlage", img: "/kacheln/pv.avif" },
    { value: "speicher", label: "Stromspeicher", img: "/kacheln/speicher.avif" },
    { value: "wallbox", label: "Wallbox", img: "/kacheln/wallbox.avif" },
    { value: "wp", label: "Wärmepumpe", img: "/kacheln/wp.avif" },
  ]} />
  <StepNav back onNext={next} nextLabel="Weiter" />
</StepFrame>
```

### 2.10 Referenzen, Kundenstimmen, Case Study

Belege: peter `/erfahrungen` (13 Projekte mit Klarnamen, kWp, kWh, Ersparnis auf 30
Jahre), haubner Fallstudien, seo-labs Case Study (12 Sektionen), iqcapital
Success Stories, ekd Kundenerfahrungen.

Referenz-Übersicht:
1. Hero H1.
2. Projekt-Grid 3er: Foto, Ort/PLZ, Anlagenwerte, Ersparnis, Klarname.
3. Community/Karte mit Testimonials.
4. Empfehlungs-Teaser (peter 250 € Prämie).
5. Logo-Wall, Bewertungs-Widget (3 Portale mit Sternwerten).
6. Video-Interviews Karussell.
7. Funnel-Block → FAQ → Final-CTA → Footer.

Case Study (seo-labs):
1. Kategorie-Badge-Leiste.
2. Ergebnis-H1 mit Zahlen, 2 Hero-KPI-Badges, 2 CTAs.
3. Steckbrief-Zeile: Projekt, Branche, Standort, Zeitraum.
4. Ausgangslage + Umsetzung (3 Absätze), Ergebnis-Absatz.
5. Leistungs-Grid 5 H4.
6. KPI-Grid in 2 Clustern ("SEO KPI" 6 Zahlen, "HARD KPI" 3 Zahlen).
7. Vorher/Nachher-Chart.
8. Kunden-Zitat groß.
9. Testimonials allgemein → Final-CTA → Footer.

Fallstudien-Karte (haubner-Format, das stärkste Testimonial-Muster):

```tsx
<article className="rounded-2xl border border-border bg-surface p-6">
  <p className="text-display-sm font-semibold tabular-nums">12 Tage bis zum Verkauf</p>
  <dl className="mt-4 space-y-3 text-sm">
    <div><dt className="font-medium">Ausgangslage</dt><dd>Verkauf wegen Umzug, Zeitplan stand fest, kein Preisnachlass.</dd></div>
    <div><dt className="font-medium">Unsere Maßnahmen</dt><dd>Premium-Exposé, passende Suchprofile, gebündelte Besichtigungen.</dd></div>
  </dl>
  <blockquote className="mt-4 border-l-2 border-accent pl-4">„Kaufvertrag zum vollen Preis unterschrieben."</blockquote>
  <footer className="mt-3 text-sm text-ink-muted">Mario K. · Bremen-Borgfeld · <span>Verifizierte Bewertung</span></footer>
</article>
```

### 2.11 Standort- / Stadt-Seite

Belege: haubner (12 Sektionen, 40+ Orte), schmidt (Stadtteil-Klon), miles (13
Städte), elephant, getsunday Local-Guide (14), hellotend Studio-Seite (17).

| Nr | Sektion | Inhalt |
|---|---|---|
| 1 | Lokaler Hero | H1 "Ihr Immobilienmakler in {Ort}" / "Carsharing in {Stadt}" / "Die Solarfirma in {Ort}", lokale Telefonnummer, 2 CTAs |
| 2 | Logo-Marquee | global |
| 3 | Lokaler Rechner-Aufruf | "Was ist Ihre {Ort}-Immobilie wert?" |
| 4 | Zwei Wege | 2er-Grid "Online-Rechner" / "Persönliche Bewertung" |
| 5 | Lokaler Nutzen | 4 Punkte mit Ortsbezug |
| 6 | Lokale Daten | Tabelle mit 6 Messwerten und Stichprobe (getsunday), Marktblock mit Nachfrage-Liste nach Stadtteil (schmidt) |
| 7 | Objekte / Referenzen vor Ort | Karussell + 3er-Grid mit Preis, Fläche, Zimmer |
| 8 | Prozess | 3er- bis 5er-Steps |
| 9 | Testimonials mit Ortsangabe | Karussell + Siegel |
| 10 | Kontakt-Tabs | Adresse, Öffnungszeiten, Amenities, Karte (hellotend) |
| 11 | Lokales FAQ | 4 bis 6 Fragen mit Stadtbezug, Schema |
| 12 | Nachbar-Standorte | 3er-Grid mit Entfernung (hellotend) |
| 13 | Einzugsgebiet-Linkliste | 43 Ortslinks in 4 H2-Gruppen als Body-Sitemap (schmidt) |
| 14 | Final-CTA + Footer | |

Regel: Getauscht werden H1, Hero-Absatz, Marktblock, FAQ, Referenzen. Der Rest ist
global. Zwei orthogonale Achsen (hellotend): Leistung × Ort ergibt eigene URL,
eigenen Title mit Ortszusatz, eigene H1.

### 2.12 Preisseite

Belege: miles Pricing (14 Sektionen), iqcapital Pricing-Tabs. Worldclassedge
hat keine Preisseite; sein Vergleich ist eine Startseiten-Sektion und steht in
§2.2/§3 als Baustein, nicht als Seitentyp-Beleg.

1. Hero mit Tarifwahl-Subline.
2. Benefit-Karten 3er.
3. Tarif-Karten nach Segment: 3er (Klasse) → Einzelkachel als Zwischenüberschrift → 2er (Stunden) → 4er (Tage). **Einzelkacheln als Zwischenüberschriften** statt H2-Zeilen (miles).
4. Pricing-Tabs (iqcapital): Tabs für Markt, darunter Plan-Karten, "Most popular"-Badge.
5. Sparen-Teaser 60/40 auf dunkler Fläche ("Du willst noch mehr sparen?" → Abo).
6. Vergleichstabelle, `overflow-x-auto`, `min-width: 1200px`.
7. FAQ 7 bis 11 Fragen.

### 2.13 Kontakt

Belege: haubner, elephant, thermondo, schmidt, peter.

1. H1 + 1 Satz.
2. 2-Spalten: links Ansprechpartner mit Foto, Telefon, WhatsApp, E-Mail, Öffnungszeiten, Adresse mit Karte; rechts Formular (max. 5 Felder, DSGVO-Checkbox, Erfolgsmeldung deutsch).
3. Standort-Liste.
4. FAQ kurz.
5. Footer.

Nie zwei konkurrierende Formulare (peter-Fehler). Nie eine kopierte
Meta-Description (elephant-Fehler).

### 2.14 Glossar / Wissens-Hub

Beleg: ekd (463 von 520 URLs sind Glossarbegriffe unter zwei Prefixen), getsunday
64 FAQ-Seiten, iqcapital FAQ mit 200 Items in 10 Kategorien mit Jump-Navigation.

1. Hub: H1, Suchfeld, A-Z-Sprungleiste oder Kategorie-Tabs, Begriffe als
   einzelne Links (nie 30 Labels in einem Link-Text, ekd-Fehler).
2. Begriffsseite: H1 Begriff, Definition in 2 Sätzen (Featured-Snippet-tauglich),
   3 bis 5 H2, verwandte Begriffe, CTA zur passenden Leistungsseite, DefinedTerm-Schema.

### 2.15 Branchen-Landingpage

Beleg: seo-labs `/immobilienmakler` (11 Sektionen).

1. Hero mit branchenspezifischer Zahl-H1 ("Wie du mind. 4 zusätzliche Alleinaufträge pro Monat gewinnst").
2. Marktverschiebung: 3 nummerierte Thesen.
3. Methode: 3 Nutzen-Karten mit Ergebnis-Badge.
4. Bento "4 Bestandteile".
5. About mit Zählern.
6. Testimonials aus der Branche.
7. Garantie-Block mit Geld-zurück.
8. Werte / Produkt-Update.
9. Final-CTA + Footer.

## 3. Sektions-Bausteine (Vokabular mit Layout und Skelett)

Jeder Baustein: Layout-Familie, Inhalt, wo er belegt ist, Skelett. Container
überall `max-width: 80rem`, Padding aus der DENSITY-Tabelle in handwerk.md.

### 3.1 Header sticky mit Topbar

Full-bleed, 1 Zeile 64 bis 80px. Logo links, 4 bis 6 Links, Telefon als Link,
Primär-CTA rechts. Optional Topbar 32px: Aktion mit Countdown (peter), Bewertungs-
Aufforderung (haubner), Nutzen-Marquee (hellotend). Hintergrund transparent über
Hero, nach 1px Scroll weiß mit Border (peter per jQuery, wir per Sentinel).
Mobil: Sticky-Bottom-Bar mit "Anrufen" und "Angebot" ab 1,3 Viewport-Höhen
(thermondo), Tapbar (hellotend).

```tsx
<header data-scrolled={scrolled} className="fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-200 data-[scrolled=true]:bg-canvas/95 data-[scrolled=true]:shadow-sm data-[scrolled=true]:backdrop-blur">
  <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
    <Logo />
    <nav aria-label="Hauptnavigation" className="hidden gap-8 lg:flex">…</nav>
    <div className="flex items-center gap-3">
      <a href="tel:+49…" className="hidden text-sm font-medium lg:inline">0421 …</a>
      <Button href="/anfrage">Angebot anfordern</Button>
      <MenuButton className="lg:hidden" />
    </div>
  </div>
</header>
```

### 3.2 Hero 2-Spalten mit Trust-Cluster

Layout 50/50 (ekd, thermondo) oder 60/40 (peter). Links: Eyebrow (optional),
H1 (max. 12 Wörter, Zahl oder Umkehr), Subline (max. 25 Wörter), Button-Reihe,
Trust-Cluster. Rechts: Foto mit echten Menschen/Objekten oder Video mit Poster.
Mobil: Text zuerst, Bild darunter, Trust-Cluster bleibt im ersten Viewport.

```tsx
<section className="relative overflow-hidden">
  <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
    <div>
      <p className="eyebrow">Photovoltaik + Speicher</p>
      <h1 className="text-display text-balance">Solaranlage zum Festpreis, montiert in 8 Wochen</h1>
      <p className="mt-5 max-w-[52ch] text-lg text-ink-muted text-pretty">0 € Anzahlung, 30 Jahre Garantie, eigenes Montageteam.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/anfrage" size="lg">Angebot in 2 Minuten</Button>
        <Button href="#prozess" variant="ghost" size="lg">So läuft es ab</Button>
      </div>
      <TrustCluster rating={4.9} count={1832} avatars={5} badge="Google" />
    </div>
    <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl outline outline-1 -outline-offset-1 outline-black/10">
      <Image src="/hero.avif" alt="Montageteam auf einem Satteldach in Hannover" fill priority sizes="(min-width:1024px) 50vw, 100vw" />
    </figure>
  </div>
</section>
```

### 3.3 Bento mit überlappenden Boxen (ekd-Signatur)

Zwei weiße Boxen mit `border-radius: 15px` schieben sich per negativem Y-Offset
über das Hero-Bild. Tiefe ohne Schatten. Werte: `translateY(-100px)` Desktop,
`-48px` mobil, `z-index` über dem Hero.

```css
.bento-overlap { margin-top: -100px; position: relative; z-index: 10; }
@media (max-width: 767px) { .bento-overlap { margin-top: -48px; } }
.bento-overlap > article { background: var(--color-surface); border-radius: 15px; padding: 40px; }
```

### 3.4 Stats-Band mit Zählern

2er- bis 4er-Grid auf Flächenwechsel. Zahl in Display-Größe, `tabular-nums`,
Einheit als Suffix kleiner, Untertitel 1 Zeile. Zähler-Rezept in
animation-rezepte.md (1400 ms, easeOutExpo, SSR-Endwert).

### 3.5 Logo-/Siegel-Marquee

Full-bleed, Label darüber ("Bekannt aus", "Wir setzen auf Qualitätsmarken"), 8 bis
19 Logos in Graustufen oder Original, DOM doppelt, `mask-image` 12 % beidseitig,
`linear infinite` 12 bis 80 s (die Spanne der Referenzen reicht von 12 s bei iqcapital bis 150 s bei trademania), Pause bei Hover, bei reduced-motion statisches Grid.
Marquee-Rezept in animation-rezepte.md.

### 3.6 Zigzag-Feature

2-Spalten 50/50, Bild und Text abwechselnd, Label + H2 + Text (max. 80 Wörter) +
Bullet-Liste (3) oder Spec-Zahlen + Textlink oder Button. Mobil immer Bild oben.
Maximal 3 in Folge.

### 3.7 Prozess-Timeline

3 bis 5 Schritte, nummeriert 01 bis 05 als Ziffern-Overlay (seo-labs), je Titel + 1
Satz, optional Video je Schritt (seo-labs) oder Ankerlinks (ekd). Horizontal ab
1024px, vertikal mobil mit Linie links.

### 3.8 Fallstudien-Karte

Siehe 2.10. Reihenfolge fest: Ergebnis-Zahl → Ausgangslage → Maßnahmen → Zitat →
Person + "Verifizierte Bewertung".

### 3.9 Vergleichstabelle

3 Spalten (Standard / Privat / Wir) oder 2 Container nebeneinander (Andere mit roten
X / Wir mit Haken, worldclassedge). 8 bis 10 Zeilen, jede Zeile ein prüfbarer Satz
mit Zahl. Mobil: Karten statt Tabelle oder `overflow-x-auto` mit sichtbarer
Scroll-Andeutung (Peeking).

```tsx
<table className="w-full text-sm">
  <thead><tr><th scope="col" className="text-left">Kriterium</th><th scope="col">Standard-Makler</th><th scope="col">Privatverkauf</th><th scope="col" className="bg-accent/10">HAUBNER</th></tr></thead>
  <tbody>
    {rows.map(r => (
      <tr key={r.label} className="border-t border-border">
        <th scope="row" className="py-3 text-left font-medium">{r.label}</th>
        <td className="text-center">{r.standard}</td>
        <td className="text-center">{r.privat}</td>
        <td className="bg-accent/10 text-center font-semibold">{r.us}</td>
      </tr>
    ))}
  </tbody>
</table>
```

### 3.10 On-Page-Qualifier (thermondo)

Ein H2 als Frage, 6 Kacheln mit Icon + Label, jede Kachel ein
`<button type="submit" name="building_type" value="…">` in einem `<form method="get" action="/anfrage">`.
Bei Klick: 400 ms Checkmark, dann Redirect mit vorbelegter Antwort. Funktioniert
ohne JS.

```html
<form method="get" action="/anfrage" class="qualifier">
  <h2>Für welches Gebäude planen Sie?</h2>
  <div class="grid grid-cols-2 gap-3 md:grid-cols-3">
    <button type="submit" name="gebaeude" value="efh"><Icon name="house"/>Einfamilienhaus</button>
    <button type="submit" name="gebaeude" value="dhh">Doppelhaushälfte</button>
    <button type="submit" name="gebaeude" value="mfh">Mehrfamilienhaus</button>
    <button type="submit" name="gebaeude" value="gewerbe">Gewerbe</button>
  </div>
</form>
```

### 3.11 Micro-Funnel (haubner)

H2 als Frage ("Wie viele Käufer passen zu Ihrer Immobilie?"), 1 Satz mit Zahl
("4.330 vorgemerkte Interessenten"), 2 Felder (PLZ, Objektart), 1 Button. Keine
E-Mail, keine Checkbox. Ergebnis auf der nächsten Seite, dort erst Kontakt.

### 3.12 Rechner-Doppel

2er-Grid: "Sofort online bewerten" (3 Min., Ergebnis sofort) und "Experte buchen"
(Vor-Ort, 30 Min.), beide mit Label "Kostenfrei", beide auf dasselbe Funnel-Ziel mit
unterschiedlichem Parameter.

### 3.13 FAQ

Native `<details name="faq">`, 4 bis 9 Fragen, Frage als H3 im `<summary>`,
Plus-Icon rotiert 45°, Antwort 40 bis 80 Wörter, FAQPage-Schema aus denselben
Daten generiert. 2-Spalten 30/70 (H2 links sticky, Fragen rechts) ab 1024px.
Abschluss: "Ihre Frage ist nicht dabei?" mit Telefon-Link.

### 3.14 Lead-Magnet

2-Spalten: links Mockup des PDFs (3 bis 6 gestapelte Seiten, seo-labs), rechts H2 +
3 Bullets + E-Mail-Feld + Button. Oder als Band am Seitenende (ekd Broschüre).

### 3.15 Final-CTA

Zentriert-schmal (`max-width: 1045px`, seo-labs): H2 + 1 bis 3 Absätze + Primär-CTA.
Oder 2 Wege (haubner): "Verkaufen" / "Finden" als zwei Karten. Zweiter Weg weich:
Telefon, WhatsApp, PDF. Dunkle Fläche oder Akzent-Gradient. Auf jeder Seite
identisch.

### 3.16 Footer

4 bis 6 Spalten: Leistungen, Standorte, Unternehmen, Rechtliches; Kontaktblock mit
Adresse, Telefon, E-Mail; Siegel-Reihe (seo-labs 8 Siegel); Social; Copyright.
Optional Footer-CTA-Karte darüber (elephant) oder Blog-Teaser im Footer.

### 3.17 Sticky Mobile-CTA

Fixed bottom, weiß, Border-top, Schatten, 2 Buttons (Anrufen, Angebot), erscheint
ab 1,3 Viewport-Höhen beim Runterscrollen, verschwindet bei 100px Hochscrollen,
`transition: transform 300ms var(--ease-out)`. Nur unter 1024px.

### 3.18 Sticky-Scroll-Panels (SaaS)

3 Panels, jedes `position: sticky; top: 10rem`, eigener Farbchip, Fortschritts-
balken. Scrollweg = Panelzahl × Panelhöhe. Nur bei MOTION ≥ 5 und Desktop, mobil
als normale Stapel.

### 3.19 Sale-Topbar (SaaS/Shop)

Ausblendbares Band über dem Header, eine Zeile, Aktion plus Code ("80FUNDING",
iqcapital; Rabattcode "TAGZUNACHT", priwatt). Der Code wiederholt sich in den
CTAs. Persistent dismissal (sessionStorage), keine Animation außer Höhe 200 ms.

### 3.20 Preis im CTA-Label

Der Preis steht im Button selbst: "Get Funded for 9$" 8x auf der iqcapital-
Startseite. Aggressivere Variante des Preis-Ankers aus §1.2; nur wenn der Preis
stabil und kanonisch ist.

### 3.21 Profit-Rechner (SaaS)

Slider-Rechner ohne Datenerhebung: Range-Inputs, Sofort-Ergebnis ("Estimate Your
Profits!" → "$1,935 / month", iqcapital). Kein Lead-Gate vor dem Ergebnis, CTA
darunter. Markup: `input[type=range]` mit `output`, tick-Marken, tabellarische
Zahlen.

### 3.22 Founder-Letter als Sektion

Gründerbrief mitten auf der Startseite (trademania Sektion 2): Eyebrow "A letter
from …", Fließtext `max-w-[65ch]`, Portrait klein, Signatur als Handschrift-Grafik.
Die Manifest-Variante als eigene Seite steht in §2.6.

### 3.23 Vergleichstabelle mit Signalfarben

3-Spalten-Vergleich, jede Spalte eine Signalfarbe als dezente Fläche (trademania:
eigenes Produkt `#D9F9B9`, Alternativen `#E9B9F9`/`#B9C0F9`). Auf Mobile werden die
Konkurrenz-Spalten ausgeblendet (`hidden lg:table-cell`), die eigene bleibt.
Basis-Markup in §3.9.

### 3.24 Sticky-Horizontal-Story-Slider

Äußerer Container `min-height: 500rem`, innerer `sticky top-0 h-screen`, Slides
fahren horizontal per Scroll-Fortschritt, Fortschrittsbalken mit aktivem Segment
(iqcapital Sektion 16). Nur bei MOTION ≥ 5, Desktop only; mobil normale Stapel-
Liste. Mechanik wie §3.18, scrollgekoppelt statt sticky-gestapelt; kein fertiges
Rezept in animation-rezepte.md, Werte aus dem Beleg übernehmen.

### 3.25 Funnel-Skeleton

Wenn der Funnel clientseitig mounted (Heyflow, eigenes Widget), rendert die Seite
einen Skeleton mit fester `min-height` (enpal 416 px, Shimmer-Animation), damit
kein leeres Custom Element steht. Bei reduced-motion: Shimmer aus, statischer
Platzhalter mit Telefonnummer als Fallback.

## 4. Anti-Patterns, die die Referenzen machen und wir nicht

Alle mit Beleg in den Site-Berichten.

| Fehler | Site | Unsere Regel |
|---|---|---|
| Kein `prefers-reduced-motion` | ekd, peter, elephant, thermondo (nur Bootstrap), fast alle | Pflicht, siehe animation-rezepte.md §16 |
| 13 bis 32 `<h1>` pro Seite (jede Sektions-Headline ist H1) | peter | Ein H1, Rest H2/H3 |
| Zwei H1 auf Über-uns | ekd | dito |
| Kein Schema.org auf keiner Seite | peter, elephant, seo-labs, iqcapital, trademania | Organization/LocalBusiness, FAQPage, Article, BreadcrumbList, Product |
| `html lang="en"` auf deutscher Seite | peter | `lang="de"` |
| Kein canonical, byteidentische Seiten unter 2 URLs | peter `/presse` = `/news` | canonical Pflicht |
| Hero-Bild `loading="lazy"`, kein `fetchpriority` | peter, elephant, thermondo, haubner, worldclassedge (`fetchpriority` 0 Vorkommen) | Hero `priority`, alles darunter lazy |
| Hero-Video ohne Poster | elephant | Poster + `preload="metadata"` |
| `loading="lazy"` nirgends, 119 JPG + 103 PNG ohne AVIF | ekd | AVIF/WebP, lazy unterhalb |
| Alt-Texte leer oder "Image gallery marquee" | schmidt, elephant, iqcapital, trademania | Alt nach Zweck, siehe handwerk.md |
| Du und Sie auf derselben Seite | ekd, peter | Eine Anrede pro Projekt, in der DESIGN.md festgelegt |
| Lorem ipsum im Live-HTML | schmidt | Pre-Flight-Grep |
| Englische Fehlermeldung im deutschen Formular | peter | Alle States lokalisiert |
| Zwei konkurrierende Formulare auf Kontakt | peter | Eines |
| Kopierte Meta-Description, nackter Title | elephant | On-Page-Spec pro Seite |
| FAQ-Seite mit "Aktuell keine Fragen verfügbar" | elephant | Leere Seiten nicht veröffentlichen |
| Referenz-Detailseiten leer (30 URLs) | elephant | Detailseite nur mit Inhalt |
| Erfundener Zähler (Sinus-Funktion) | peter | Nur gemessene Zahlen |
| H1 und H2 gleich groß | schmidt | Typo-Skala aus handwerk.md |
| Hero ohne Trust-Signal, Beweise erst nach 5 Sektionen | schmidt | Hero-Formel |
| 30 Glossar-Links in einem Link-Text | ekd | Ein Link pro Begriff |
| Root-Font in vw ohne Mindestgröße | iqcapital, worldclassedge | clamp mit rem-Untergrenze |
| Hover-Zoom 1.1 über 800 ms auf Karten | peter | Schatten-Opacity, kein Scale |
| Header-Farbwechsel per jQuery-Inline-Style | peter | Klasse + IntersectionObserver |
| Funnel als leeres Custom Element ohne JS-Fallback | peter, haubner, ekd (Heyflow, Maklaro) | Eigener Funnel oder sichtbarer Fallback mit Telefon + Formular |
| Consent fehlt, Tracker feuern sofort | peter, iqcapital, trademania | Consent vor Trackern |
| `transition: all` | elephant, schmidt, iqcapital, trademania | Property-Listen |
| Rows nach dem Footer (Builder-Müll) | ekd | Sauberer DOM |
| Canonical zeigt auf fremde Domain | trademania | canonical immer auf die eigene URL |
| Reveal-System ohne No-JS-Fallback, Inhalt unsichtbar ohne JS | worldclassedge | Reveal als Enhancement: SSR-Endzustand sichtbar, `html.js`-Gate (animation-rezepte.md §3) |

## 5. Belege-Index

| Site | Bericht | Stack | Stärkstes Muster |
|---|---|---|---|
| ekd-solar.de | research/sites/ekd-solar.md | WordPress Salient + WPBakery, Heyflow | Bento-Overlap, Ratgeber-Hybrid mit Inline-CTAs, Broschüren-Band, Glossar-Masse |
| elephantsolar.de | research/sites/elephantsolar.md | Webflow, GSAP, Splide, HLS | Ein Funnel/9 Labels, Trust in 4 Stufen, Footer-CTA-Karte, 3-Schritt-Funnel |
| peter.at | research/sites/peter-at.md | Webflow, Heyflow, particles.js | Sektions-Baukasten, Preis als Monatsrate, halbtransparenter Headline-Teil |
| haubnergroup.de | research/sites/haubnergroup.md | WordPress Elementor, Maklaro | Rechner-Hero, Fallstudien-Karte, Risiko-Umkehr, Micro-Funnel, Microcopy |
| schmidt-immobilien.koeln | research/sites/schmidt-immobilien.md | WordPress Elementor | Stadtteil-Template, Einzugsgebiet-Linkliste, native details |
| seo-labs.de | research/sites/seo-labs.md | Framer, Lenis | Ergebnis-Ticker, Hell/Dunkel-Rhythmus, Case-Study-Struktur, Zahlen überall |
| thermondo.de | research/sites/thermondo.md | Django/Wagtail, Bootstrap, Vue-Funnel | Deep-Link-Funnel, On-Page-Qualifier, Förderprognose als Belohnung, Ratgeber mit TOC |
| iqcapital.io | research/sites/iqcapital.md | Next.js, Tailwind, Framer Motion | Zwei-Ebenen-Button, Trust durch Mengen, Sticky-Panels, Marquee mit Mask |
| worldclassedge.com | research/sites/worldclassedge.md | Next.js, Tailwind, Sanity | Mono-Eyebrow, Vergleich als Gegenüberstellung, Font-Trio, Manifest-Seite |
| miles-mobility.com | research/sites/miles.md | Next.js, Tailwind v4, Sanity, Framer Motion | 12-Spalten-Textachse, Compressed-H1 vs. Light-Body, Token-Flächenwechsel, Preisseite |
| uber.com/de | research/sites/uber.md | Eigenes Design-System | Formular-Hero mit Sofortzahl, Karussell ohne Library, Reveal mit Selbstabschaltung, Produktfarbe per data-Attribut |
| getsunday.com | research/sites/getsunday.md | Custom React | Preis-Anker konsistent, Verneinung als Beweis, Zip-Formular 7x, 1.347 Local-Guides |
| hellotend.com | research/sites/hellotend.md | WordPress + Next.js-Booking | Nutzenumkehr-H1, 36x Book Now, Standort als Conversion-Achse, Leistung × Ort |
| enpal.de | research/sites/enpal.md | Webflow, Splide, Alpine, externer React-Funnel | Zwei-Zeilen-H2 mit grauer Nutzenzeile, rotierende Hero-Subline (12 s Zyklus), Funnel 3x auf der Startseite gemountet mit Skeleton, Awards-Marquee als Dauerband, Ratgeber-Hub mit Sticky-TOC und Key-Takeaways |
| qu-immobilien.com | research/sites/qu-immobilien.md | Webflow IX2, Lenis, Lottie | Eine Akzentfarbe nur auf Beweis- und Abschlusssektionen (3 von 18), Bildbeweis in 3 Stufen (Zahlen, 12 Vorher/Nachher, 13 Google-Stimmen), Gesicht der Firma an 3 Stellen im Conversion-Pfad, ein Reveal mit Stagger 100 bis 400 ms |
| trademania.io | research/sites/trademania.md | Next.js, Tailwind, Sanity, GSAP + Framer Motion | Kicker-Chip als Label-System, CTA mit Clip-Path-Ecke und Label-Tausch, Vier-Zahlen-Rhythmus (Hero, Zähler-Grid, Final-CTA wortgleich), Founder-Letter als Sektion 3, Vergleichstabelle mit Farbe je Spalte |
| bondvet.com | research/sites/bondvet.md | Gatsby + Wix-Landingpages, 9-Schritt-Booking-App | Verfügbarkeit als H1 und Funnel-Ziel (Walk-ins, 7 Tage), Buttons per CSS-Token umgeschaltet, Standortseite mit Google-Review-Zahl im Hero, FAQPage-Schema auf Standortseiten |
| priwatt.de | research/sites/priwatt.md | Next.js + Headless WordPress, Typeform-Funnel | Preis und Rabattcode direkt sichtbar (Announcement-Bar), Trust neben dem Kaufentscheid (4 Trust-Kacheln unter dem Warenkorb-Button), Content-Hub mit Tabs statt Akkordeon-Stapel am Seitenende, Button-Hover als Radius-Sprung |
| ouraring.com/de | research/sites/oura.md | Next.js, Tailwind v4, Framer Motion, WordPress-Blog | 22-Spalten-Raster mit benannten Linien, 4 benannte Motion-Presets (blurFadeIn, fadeUp, fadeIn, none) mit `viewport: once`, Reduced Motion auf 4 Ebenen (CSS, Markup, JS, noscript), Wissenschafts-Seite mit Publikationsliste als Beweis |

## 6. Entscheidungs-Kurzform für den Bau

1. Seitentyp → Blueprint aus Abschnitt 2 in die Sitemap schreiben (Sektionsliste pro Seite).
2. Hero-Variante wählen (Text / Rechner / Zentriert) und Trust-Datenpunkt festlegen. Ohne echte Zahl: Slot als `[TRUST: Zahl vom Kunden einholen]` markieren, nie erfinden.
3. Ein Funnel-Ziel-Slug festlegen, alle CTAs darauf, Labels pro Kontext.
4. Flächen-Rhythmus festlegen (2 bis 3 Flächenfarben, feste Folge).
5. Bausteine aus Abschnitt 3 zuordnen, maximal 3 Zigzags in Folge.
6. Endsequenz FAQ → Final-CTA → Footer auf jeder Seite.
7. Motion aus animation-rezepte.md, 5 bis 8 Bewegungsarten, nicht mehr.
8. Anti-Pattern-Tabelle als Pre-Flight-Checkliste.
