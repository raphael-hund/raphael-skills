# Case: Leadfluss (Marketing-Agentur für Handwerksbetriebe, Leipzig)

| Feld | Wert |
|---|---|
| Slug | `leadfluss` |
| Status | `kandidat` |
| Belegschwelle | `erfüllt` |
| Quelle | `https://www.leadfluss.de/` · Abruf 02.09.2026 (Capture in dieser Studie) |
| Evidence | `leadfluss/shots/`, `leadfluss/shots-mobile/`, `leadfluss/shots-routen/` (Manifeste je Ordner); gelesene Shots in der Tabelle unter §1 |
| Evidence-Typ | Website |
| Frame-Beleg | `n/a` (Website-Capture) |
| Sektor | `b2b-dienst` (Dienstleister, dessen Kunden Handwerksbetriebe sind — die Bildwelt ist `handwerk-local`, die Zielgruppe ist B2B) |
| Typ | Extern |
| Datum der Studie | 02.09.2026 |
| Auswahlgrund | Offene Frage, wie eine B2B-Dienstleisterseite Referenzergebnisse belegt, ohne in Karten-Raster und Stock-Optik zu kippen — und wie ein mehrstufiger Funnel mitten in der Startseite sitzen kann statt als Kontaktformular am Ende |
| Do-not-copy | Wortmarke und Logo „Leadfluss", die Kunden- und Team-Fotos, die Kunden-Logowand, die Google-Bewertungstexte, sämtliche Headlines und Fließtexte |
| Lizenz / Provenance | `ungeklärt` — Screenshots sind unlizenziertes Fremdmaterial, ausschließlich intern als Studie in diesem Repo; nichts davon geht in ein Kundenprojekt |
| Urteil | GO 02.09.2026 (Raphael-Liste, Begruendungssatz offen) |

## 1. Capture

**Pflicht-Viewports:** `1440×900` (Desktop-Fold) und `390×844` (mobil).
Danach `1440×1500` @ 750 px Scroll, sequentiell pro Seite.

```bash
node /root/raphael-skills/skills/eigene/web/scripts/muster-studie.mjs \
  --url https://www.leadfluss.de/ --slug leadfluss
# Exit 0, 29 Shots -> leadfluss/shots/

node /root/raphael-skills/skills/eigene/web/scripts/shot-sweep.mjs \
  --base https://www.leadfluss.de --out .../leadfluss/shots-mobile --routes / --mobile --static
# Exit 0, 81 Shots -> leadfluss/shots-mobile/ (muster-studie reicht --mobile nicht durch)

node /root/raphael-skills/skills/eigene/web/scripts/shot-sweep.mjs \
  --base https://www.leadfluss.de --out .../leadfluss/shots-routen --routes /anfrage,/faq --static
# Exit 0, 56 Shots -> leadfluss/shots-routen/
```

Kein `/small/`-JPG-Ableger im Sweep-Output; gelesen wurden die PNGs.

| Shot | Pfad | gelesen? |
|---|---|---|
| Desktop 1440×900 `/` | `leadfluss/shots/home-desktop-00-fold.png` | ja |
| Mobil 390×844 `/` | `leadfluss/shots-mobile/home-mobile-00-fold.png` | ja |
| Scroll-Serie `/` Desktop | `home-desktop-02-y750.png`, `-03-y1500.png`, `-04-y2250.png`, `-07-y4500.png`, `-09-y6000.png`, `-10-y6750.png`, `-11-y7500.png`, `-13-y9000.png`, `-15-y10289.png` | ja |
| Mobil Scroll `/` | `shots-mobile/home-mobile-21-y8440.png` | ja |
| Desktop `/anfrage` | `shots-routen/anfrage-desktop-00-fold.png` | ja |
| Desktop `/faq` | `shots-routen/faq-desktop-00-fold.png` | ja |

12 Shots gelesen (Budget ausgeschöpft). Der Cookie-Banner liegt in allen
Desktop-Shots unten mittig und verdeckt dort jeweils den unteren Rand; die
Sektionsurteile stützen sich auf die unverdeckten Bereiche.
Nicht geprüft: übrige Scroll-Slices, Hover- und Click-Serien (nur Dateinamen
ausgewertet), die Routen `/blog`, `/karriere`, `/vor-ort-videodreh`.

## 2. Tokens (maschinell, nicht geraten)

Quelle: `https://www.leadfluss.de/_next/static/immutable/chunks/3p9_i7ejwsu5f.css`
(einziges Site-CSS, per curl extrahiert 02.09.2026; Custom Properties im
`:root`- und Dark-Block, Tailwind-v4-Theme). Wo zwei Werte stehen, ist der
erste der Hell-, der zweite der Dark-Block.

| Token | Wert |
|---|---|
| Display-Font | `--font-sans: "Jost", "Jost Fallback"` (einzige Text-Familie im CSS; keine zweite Display-Familie) |
| Body-Font | Jost (identisch mit Display); `--font-geist-mono: "Geist Mono"` nur als Mono-Slot |
| Akzentfarbe (HEX) | `--brand: #00c281` = `--signal: #00c281` = `--ring: #00c281` = `--chart-1`; Zweitton `--chart-2: #099768` |
| Grundfläche | `--background: #fff`, `--card: #fff`, `--muted: #eff5f2`, `--secondary: #eef6f2`, `--accent: #e5f5ed`, `--icon-bg: #e3f8ef` |
| Dunkle Fläche | `--foreground / --primary / --card-foreground: #1d2c42` (Navy); Dark-Block `--background: #090f0c`, `--card: #121815`; Sekundärtext `--muted-foreground: #5e6a7b`, `--secondary-foreground: #2d394a` |
| Semantik-Rot | `--destructive: #e40014` (hell) / `#ff6568` (dark), `--color-red-500: #fb2c36` |
| Spacing-Skala | `--spacing: .25rem`; Sektionen als Vielfache (`padding-block: calc(var(--spacing) * 16 / 20 / 24)` = 4 / 5 / 6 rem); Container `--container-7xl: 80rem` |
| Radii | `--radius: 0rem` — alle abgeleiteten Radien (`calc(var(--radius) * .8 … * 2.6)`) fallen damit auf 0; rund nur, wo `border-radius: 9999px` explizit steht (Pills, Avatare) |
| Schatten | Tailwind-Defaults, sparsam: `0 1px 3px 0 #0000001a`, `0 4px 6px -1px #0000001a`, `0 10px 15px -3px #0000001a`, `0 25px 50px -12px #00000040` |
| Typo-Skala | `--text-xs .75` bis `--text-8xl 6rem` (Tailwind-Stufen, `--tracking-tight: -.025em`, `--tracking-wider: .05em`) |

## 3. Sektionen-Inventar

Detaillierter Sektions-Atlas: `leadfluss/sektionen.md`.

Startseite `/` (Desktop-Serie), Reihenfolge von oben. Layout-Familie aus
`../ui-layouts-catalog.md` §Sektions-Layout-Familien.

| # | Sektion | Layout-Familie | Pattern-ID | Wie gebaut (1 Satz) |
|---|---|---|---|---|
| 1 | Navbar | Band | — | Weiße Leiste über volle Breite, Logo links, 5 Textlinks mittig, genau ein grüner rechteckiger Button rechts; identisch auf `/`, `/anfrage`, `/faq` (`shots/home-desktop-00-fold.png`, `shots-routen/anfrage-desktop-00-fold.png`, `shots-routen/faq-desktop-00-fold.png`). |
| 2 | Hero | Split | `P-HERO-PHOTO`-Variante (Text oben zentriert, Foto+Checkliste darunter zweispaltig) | Kein Vollbild-Foto: hellgrüner Verlauf von oben, gesperrter Kapitälchen-Eyebrow, zentrierte H1, in der zwei Teilaussagen grün ausgezeichnet sind, darunter zweizeilige Subline, dann links ein echtes Beratungsfoto und rechts vier Checkmark-Zeilen plus ein grüner CTA (`shots/home-desktop-00-fold.png`). |
| 3 | Kunden-Logowand | Raster | `P-PROOF-STRIP` | „Diese Kunden vertrauen uns" als Eyebrow, darunter 36 echte Kunden-Wortmarken in einem 6-spaltigen Graustufen-Raster ohne Karten und ohne Rahmen (`shots/home-desktop-02-y750.png`). |
| 4 | Nutzen-Zickzack | Split | `P-BENEFIT`-nah (kein Karten-Raster) | Drei Textblöcke alternierend links/rechts auf `--muted`, jeweils H3 + Absatz, gegenüber statt Icon ein echtes iOS-Push-Mockup mit konkretem Inhalt („Neue Anfrage für Terrassendach: Budget 30.000 €", „Neue Bewerbung als Dachdecker!") (`shots/home-desktop-02-y750.png`, `-03-y1500.png`). |
| 5 | Kundenergebnisse (Case-Stapel) | Stack | `P-CASE`/`P-TESTIMONIAL`-Hybrid | Linksbündiger Eyebrow „ERGEBNISSE" + H2 + Lead, darunter untereinander gestapelte, randscharfe Hairline-Karten: links Firmenname, grüne Branchenzeile, Absatz, zwei Umriss-Chips (Ort mit Pin-Icon, Gewerk mit Werkzeug-Icon) und das echte Kundenlogo — rechts ein echtes Teamfoto vor Ort mit dunklem Ergebnisstreifen darüber („50+ Leads pro Monat zusätzlich", „40 Leads pro Monat", „80 Leads pro Monat") (`shots/home-desktop-04-y2250.png`, `-07-y4500.png`). |
| 6 | Potenzialanalyse-Funnel | Layering (Karte über Foto-Bühne) | `P-CONTACT`-Ersatz (Quiz statt Formular) | Ganzflächiges, stark aufgehelltes Büro-Foto als Bühne, darüber zentriert eine weiße Karte mit Zähler „Schritt 1 von 5", Frage-H2 mit grün gesetztem Schlüsselwort, vier Radio-Kacheln, Hinweiszeile „Tippe auf eine Auswahl" und ein grüner Fortschrittsbalken an der Kartenunterkante (`shots/home-desktop-09-y6000.png`). |
| 7 | Google-Bewertungen | Raster (Slider) | `P-TESTIMONIAL` | Zentrierte H2 + Subline „Echte Google-Bewertungen aus über 75 Partnerbetrieben.", darunter Google-Logo mit „5,0", fünf gelben Sternen und „(41)", dann vier gleich hohe Hairline-Karten mit echtem Avatar + Google-G, Klarname, Verifiziert-Haken, Zeitangabe („vor 6 Monaten"), Sternen, Volltext und „Mehr lesen"-Kürzung; rechts ein runder Pfeil (`shots/home-desktop-09-y6000.png`, `-10-y6750.png`). |
| 8 | Team | Raster | `P-TEAM` | Linksbündige zweizeilige H2 + Absatz mit Gründungsjahr und Projektzahl, darunter fünf gleich breite Hairline-Karten mit echten Hochformat-Porträts vor gleichem Hintergrund, darunter Name und Rolle (`shots/home-desktop-11-y7500.png`, `-10-y6750.png`). |
| 9 | Problem / Lösung | Raster (2 Spalten) | `P-PROBLEM-SOLUTION` | Zentrierte H2, dann zwei Spalten mit den Labels „DAS PROBLEM" (rot) und „UNSERE LÖSUNG" (grün): links dunkel abgedunkelte Foto-Kacheln mit rotem Randstrich und rotem Icon-Quadrat, rechts hell aufgehellte Foto-Kacheln mit grünem Randstrich und grünem Icon-Quadrat, dazwischen je ein grüner Pfeil als Zeilenbindung (`shots/home-desktop-11-y7500.png`, `-13-y9000.png`). |
| 10 | Standort Leipzig | Split | `P-ABOUT`-nah | Links grüner Eyebrow „UNSER STANDORT", H2, zwei Absätze und ein grüner CTA, rechts eine echte Luftaufnahme von Leipzig (`shots/home-desktop-13-y9000.png`). |
| 11 | Kontakt-Band | Band (dunkel) + Split | `P-CONTACT` | Einzige dunkle Sektion: Navy-Fläche `#1d2c42`, links ein echtes eingebettetes Google-Maps-Fenster mit Firmenkarte („Leadfluss GmbH, Rückertstraße 4, 04157 Leipzig, 5.0 ★ (41)"), rechts H2, Satz, grüner CTA und drei Hairline-Zeilen mit Icon für Geschäftszeiten, E-Mail und Telefon im Klartext (`shots/home-desktop-15-y10289.png`). |
| 12 | Footer | Raster | — | Helle Fläche, links Logo, Kurzsatz, grüner CTA und Klartext-Kontakt, rechts drei Link-Spalten (Unternehmen / Ressourcen / Rechtliches), darunter Trennlinie, Copyright und drei Social-Icons in Umriss-Quadraten (`shots/home-desktop-15-y10289.png`). |

Mobil `/` (390×844): identische Reihenfolge, alles einspaltig und zentriert;
im Fold Hamburger statt Nav-Links und kein CTA über der Falz — Eyebrow, H1,
Subline und Foto füllen den Fold, die Checkliste beginnt erst am unteren Rand
(`shots-mobile/home-mobile-00-fold.png`). Der Funnel bleibt mobil derselbe
Baustein mit derselben Schrittanzeige und vollbreiten Radio-Kacheln
(`shots-mobile/home-mobile-21-y8440.png`).

Unterseiten:

| Seite | Muster |
|---|---|
| `/anfrage` | Der Funnel aus Sektion 6 als eigenständige Seite, aber ohne Foto-Bühne: weiße Fläche, gleicher Eyebrow, gleiche H1, gleiche Subline, dieselbe Karte mit „Schritt 1 von 5", denselben vier Radio-Kacheln und demselben grünen Fortschrittsbalken; Navigation und CTA bleiben stehen, es gibt also keinen navigationslosen Funnel (`shots-routen/anfrage-desktop-00-fold.png`). |
| `/faq` | Sub-Hero-Band auf `--muted`: kleiner grüner Eyebrow „FAQ", linksbündige H1, ein Satz Lead, danach auf Weiß ein Akkordeon in der linken ~60-%-Spalte, gruppiert unter gesperrten grünen Kapitälchen-Labels („ALLGEMEINES ZUM ANGEBOT & DER METHODE"), Fragen als Hairline-Zeilen mit Chevron rechts — keine Karten, keine Flächen (`shots-routen/faq-desktop-00-fold.png`). |

## 4. Raphael-Urteil

**Verdikt: GO 02.09.2026** (Raphael-Liste, Begründungssatz offen).

**Essenz (max. 3 Sätze):** Leadfluss belegt jede Behauptung mit einem
nachprüfbaren Fremdartefakt statt mit Design — 36 echte Kunden-Wortmarken,
Case-Karten mit Ortschip, Gewerkschip, Kundenlogo, echtem Vor-Ort-Teamfoto und
einer Zahl im dunklen Streifen, Google-Bewertungen mit Avatar, Klarname,
Verifiziert-Haken und Zeitangabe, dazu ein echtes Maps-Fenster mit Adresse
(`shots/home-desktop-02-y750.png`, `-04-y2250.png`, `-10-y6750.png`,
`-15-y10289.png`). Der Hauptabschluss ist kein Formular, sondern ein
5-Schritt-Quiz, das mit einer Ein-Klick-Frage beginnt, mitten auf der
Startseite über einer Foto-Bühne sitzt und auf `/anfrage` als derselbe
Baustein noch einmal auftaucht (`shots/home-desktop-09-y6000.png`,
`shots-routen/anfrage-desktop-00-fold.png`). Das ganze System ruht auf
genau einer Schriftfamilie, Radius 0 und einem einzigen Grün `#00c281`, das
nur Aktion, Label und ausgezeichnetes Schlüsselwort trägt — Rot erscheint
ausschließlich als Problem-Semantik in der Gegenüberstellung
(`shots/home-desktop-00-fold.png`, `-13-y9000.png`, CSS-Tokens §2).

**Do-not-copy:** Wortmarke und Logo „Leadfluss"; die Kunden-Logowand und alle
Kundenlogos; die Team- und Vor-Ort-Fotos; die Google-Bewertungstexte samt
Namen; sämtliche Headlines, Sublines und Fließtexte. Übertragbar ist die
Struktur — Beleg-Artefakt statt Behauptung, Chip-Metadaten an der Case-Karte,
Zahl im dunklen Bildstreifen, Quiz statt Formular —, nie das Material.

**Lizenz / Provenance:** `ungeklärt`. Die Screenshots sind unlizenziertes
Fremdmaterial und liegen ausschließlich intern in diesem Repo als Studie; sie
werden nicht veröffentlicht, nicht weitergegeben und gehen in kein
Kundenprojekt. Urheber der Seite: Leadfluss GmbH, Rückertstraße 4, 04157
Leipzig (Impressum-Angabe, sichtbar im Maps-Fenster
`shots/home-desktop-15-y10289.png`).

**Status aller Regel-Kandidaten unten: `kandidat`.**

## 5. Regel-Kandidaten

| Beobachtung | Regel-ID | Richtung | Status |
|---|---|---|---|
| Referenz-Karte trägt vier Beleg-Schichten gleichzeitig: Ortschip mit Pin, Gewerkschip mit Werkzeug-Icon, echtes Kundenlogo und ein echtes Vor-Ort-Teamfoto, über das ein dunkler Streifen mit genau einer Ergebniszahl gelegt ist — ohne Zahl keine Karte (Beleg: `/` 1440 `shots/home-desktop-04-y2250.png`, `shots/home-desktop-07-y4500.png`) | S9-Beleg (Positivseite), S2-Beleg (Karte nur für Gleichartiges) | GO | kandidat |
| Ein einziges Grün `#00c281` bei `--radius: 0rem`: dasselbe Grün trägt Nav-Button, jeden CTA, jeden Eyebrow, das ausgezeichnete Schlüsselwort in H1 und Frage-H2 sowie den Fortschrittsbalken — nie als Vollfläche, und wo es Fläche wird (Button), ist die Ecke scharf (Beleg: `/` 1440 `shots/home-desktop-00-fold.png`, `shots/home-desktop-09-y6000.png`; CSS `--brand`/`--radius` in §2) | S1 | GO | kandidat |
| Genau eine dunkle Sektion auf der ganzen Startseite, und zwar die letzte vor dem Footer (Navy-Kontaktband); alle übrigen Flächenwechsel laufen über Weiß gegen `--muted #eff5f2` (Beleg: `/` 1440 `shots/home-desktop-15-y10289.png` gegen `-02-y750.png`, `-11-y7500.png`) | S3 | GO | kandidat |
| Der Haupt-Conversion-Baustein ist ein 5-Schritt-Quiz mit Ein-Klick-Erstfrage, Schrittzähler und Fortschrittsbalken; er sitzt mitten auf der Startseite über einer Foto-Bühne und wird auf `/anfrage` als identischer Baustein wiederverwendet — statt eines Kontaktformulars (Beleg: `/` 1440 `shots/home-desktop-09-y6000.png`; `/` 390 `shots-mobile/home-mobile-21-y8440.png`; `/anfrage` 1440 `shots-routen/anfrage-desktop-00-fold.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Nutzen wird als Zickzack aus Text und echtem Produkt-Artefakt gezeigt, nicht als Icon-Karten-Raster: gegenüber jedem Textblock steht ein iOS-Push-Mockup mit konkretem Inhalt inklusive Budgetzahl statt eines Icons (Beleg: `/` 1440 `shots/home-desktop-02-y750.png`, `shots/home-desktop-03-y1500.png`) | S2, S14-Gegenbeleg | GO | kandidat |
| Bewertungen nur mit Fremd-Quelle und Prüfmerkmalen: Google-Logo, „5,0" mit „(41)" daneben, je Karte echter Avatar mit Google-G, Klarname, Verifiziert-Haken, Zeitangabe und „Mehr lesen"-Kürzung — keine selbstgebauten Sterne, keine gekürzten Wunschzitate (Beleg: `/` 1440 `shots/home-desktop-10-y6750.png`) | S9-N-Beleg (Positivseite) | GO | kandidat |
| Problem und Lösung als zwei Spalten mit identischem Kachel-Bau, unterschieden nur durch Semantikfarbe und Bildhelligkeit: links roter Randstrich, rotes Icon-Quadrat und abgedunkeltes Foto, rechts grüner Randstrich, grünes Icon-Quadrat und aufgehelltes Foto, dazwischen ein grüner Pfeil pro Zeile (Beleg: `/` 1440 `shots/home-desktop-11-y7500.png`, `shots/home-desktop-13-y9000.png`) | — (Prosa-Kandidat) | GO | kandidat |
| FAQ ohne Karten: Sub-Hero-Band auf `--muted`, dann Akkordeon in der linken ~60-%-Spalte, thematisch gruppiert unter gesperrten grünen Kapitälchen-Labels, Fragen nur als Hairline-Zeile mit Chevron (Beleg: `/faq` 1440 `shots-routen/faq-desktop-00-fold.png`) | S2 | GO | kandidat |
| Eine Schriftfamilie für alles: `--font-sans: "Jost"` ist die einzige Textfamilie im gesamten Site-CSS, Hierarchie entsteht nur über Grösse, Gewicht und Sperrung (Kapitälchen-Eyebrow mit `--tracking-wider`) (Beleg: CSS-Extrakt §2; sichtbar in `/` 1440 `shots/home-desktop-00-fold.png` gegen `shots/home-desktop-04-y2250.png`) | S20, S23 | GO | kandidat |
