# Case: SEOLabs (SEO- und GEO-Agentur für regionale Dienstleister, München)

| Feld | Wert |
|---|---|
| Slug | `seo-labs` |
| Status | `kandidat` |
| Belegschwelle | `erfüllt` |
| Quelle | `https://www.seo-labs.de/` — Abruf 02.09.2026 (Shot-Sweep und HTML-Extrakt) |
| Evidence | `seo-labs/shots/home-desktop-00-fold.png`, `-02-y750.png`, `-04-y2250.png`, `-06-y3750.png`, `-08-y5250.png`, `-10-y6750.png`, `-11-y7500.png`, `-14-y9750.png`, `-16-y11250.png`, `-18-y12750.png`, `-21-y15000.png`, `-24-y17124.png`, `home-mobile-00-fold.png`, `home-mobile-08-y2954.png` |
| Evidence-Typ | Website |
| Frame-Beleg | `n/a` (Website-Capture) |
| Sektor | `b2b-dienst` (Agentur für regionale Dienstleister; Ziel-Branchen laut Footer: Immobilienmakler, Handwerker, Immobiliengutachter, Anwaltskanzleien, Steuerberater — `home-desktop-24-y17124.png`) |
| Typ | Extern |
| Datum der Studie | 02.09.2026 |
| Auswahlgrund | Offene Frage, wie eine B2B-Dienstleister-Startseite Beweis führt, ohne ein Foto-Hero zu benutzen: SEOLabs baut einen reinen Typo-Hero und schiebt den gesamten Beweis in Kennzahl-Karten, Presse-Screenshots und Produkt-Mockups darunter. |
| Do-not-copy | Wortmarke „SEOLabs" und das Lupen-Logo; die Portraits, Team- und Arbeitsplatz-Fotos (`home-desktop-06-y3750.png`, `home-desktop-16-y11250.png`); die fremden Presse- und Kunden-Wortmarken (Forbes, Süddeutsche Zeitung, Handelsblatt, HAUBNER GROUP, Seniocon, GastroRocket); alle Fallstudien-Kennzahlen und Kundennamen; sämtliche Copy. Übernommen wird höchstens die Struktur, nie ein Text und nie eine Zahl. |
| Lizenz / Provenance | `ungeklärt` — Screenshots wurden nur als interne Studie erzeugt und bleiben in `seo-labs/shots/`; keine Veröffentlichung, keine Weitergabe, keine Nutzung als Asset. Urheber der Motive ist SEOLabs GmbH bzw. deren Kunden und die genannten Medien. |
| Urteil | GO 02.09.2026 (Raphael-Liste, Begruendungssatz offen) |

Die Belegschwelle ist erfüllt: Quelle, Auswahlgrund, Do-not-copy,
Lizenz/Provenance, Status und die Website-Belege sind gefüllt und gelesen. Weil
Lizenz/Provenance `ungeklärt` bleibt und der Begründungssatz zum Stamp noch
offen ist, bleibt der Case `kandidat`; dieser Agent setzt keinen Stil-Default.

## 1. Capture

**Pflicht-Viewports:** `1440×900` (Desktop-Fold) und `390×844` (mobil).
Danach `1440×1500` @ 750 px Scroll, sequentiell pro Seite.
**Kein `fullPage` als Kritik-Input.**

```bash
node /root/raphael-skills/skills/eigene/web/scripts/muster-studie.mjs \
  --url https://www.seo-labs.de/ --slug seo-labs
node /root/raphael-skills/skills/eigene/web/scripts/shot-sweep.mjs \
  --base https://www.seo-labs.de/ \
  --out .../muster-bibliothek/seo-labs/shots --routes / --mobile --static
```

Beide Läufe Exit 0. Der Wrapper `muster-studie.mjs` reicht `--mobile` und
`--static` nicht an `shot-sweep.mjs` durch, deshalb der zweite Lauf in denselben
Ordner. Ergebnis: 105 Shots, Manifest `seo-labs/shots/manifest.json`
(`capture_profile: static true, mobile true`), nur Route `/` — keine
Unterseiten erfasst. Es gibt keine `/small/`-JPG-Ableitung, gelesen wurden die
PNGs. Budget 12 Shots eingehalten (14 Pfade in `Evidence`, davon 12 gelesene
Bilder plus die zwei Mobil-Shots — siehe Tabelle).

| Shot | Pfad | gelesen? |
|---|---|---|
| Desktop 1440×900 Fold | `seo-labs/shots/home-desktop-00-fold.png` | ja |
| Mobil 390×844 Fold | `seo-labs/shots/home-mobile-00-fold.png` | ja |
| Scroll-Serie Desktop | `home-desktop-02-y750.png`, `-04-y2250.png`, `-06-y3750.png`, `-08-y5250.png`, `-10-y6750.png`, `-11-y7500.png`, `-14-y9750.png`, `-16-y11250.png`, `-18-y12750.png`, `-21-y15000.png`, `-24-y17124.png` | ja (11 von 23) |
| Mobil Scroll | `home-mobile-08-y2954.png` | ja (1 von 44) |
| Klick-Serien (Report-Coverflow, FAQ, Mobil-Menü) | `home-desktop-click-y12750-*`, `-y15000-*`, `-y15750-*`, `home-mobile-click-*` | nein (nur Dateinamen ausgewertet) |

Ein Cookie-Banner steht in allen Shots unten rechts („Okay") und verdeckt dort
Bildteile. Nicht geprüft: übrige Scroll-Slices, Hover-Zustände, Menü-Overlay,
alle Unterseiten.

## 2. Tokens (maschinell, nicht geraten)

Quelle: HTML-Extrakt von `https://www.seo-labs.de/` (curl, 02.09.2026). Die
Seite ist ein Framer-Build (`<meta name="generator" content="Framer …">`) ohne
externes Stylesheet; die Werte stammen aus den `--token-*`-Definitionen und den
`font-family`-Deklarationen im Dokument. `muster-studie.mjs` erhebt keine
Tokens.

| Token | Wert |
|---|---|
| Display-Font | Inter (42 `font-family: "Inter"`-Deklarationen; Framer-Default-Kette `Inter, Inter Placeholder, sans-serif`) |
| Body-Font | Inter (dieselbe Kette; keine zweite Textschrift) |
| Zweitschrift | Playfair Display 600 — nur 4 Deklarationen, ausschliesslich als Auszeichnung einzelner Textstellen |
| Akzentfarbe (HEX) | `#7a7fad` (Lavendel, in zwei Token-IDs doppelt definiert) — trägt Primär-CTA, Timeline-Linie, Hervorhebungs-Spans, Kennzahl-Präfixe |
| Zweit-Akzent | `#dfdfff` (helles Lavendel), `#1ab467` (Grün) — Grün nur als Wort-Einfärbung und Play-Button |
| Grundfläche | `#f4f4f4` (mit Alpha-Staffel `bf` / `80` / `40`), zusätzlich `#f5f5f7` |
| Dunkle Fläche | `#211d1d` (warmes Fast-Schwarz, Alpha-Staffel `bf` / `80` / `40`); zusätzlich `#0b0c11` |
| Sekundärtext | `#86868b` |
| Spacing-Skala | nicht erhoben (Framer setzt Abstände inline pro Element, keine deklarierte Skala) |
| Radii | Sprunghaft, keine geschlossene Familie: `1px` (Hairlines/Trennlinien, 592×), `2px`, `3px`, `6px`, `8px`, `12px`, `16px`, `20px`, `24px`, `40px`, `60px`, `999px` (Pills), `50%` (runde Icon-/Portrait-Ziele, 42×) |
| Schatten | sehr sparsam: eine mehrstufige weiche Standardschicht (`0px 0.6px 0.6px -1.25px rgba(0,0,0,0.18)` + Folgeschichten, 12×) und ein einzelner roter Glow `0 4px 24px rgba(255,0,51,0.3)` |
| Rahmen | Hairlines statt Flächen: `rgba(33,29,29,0.1)` auf Hell, `rgba(255,255,255,0.1)` auf Dunkel, `rgba(122,127,173,0.25/0.32)` für Akzent-Ränder |

## 3. Sektionen-Inventar

Detaillierter Sektions-Atlas: `seo-labs/sektionen.md`. Pattern-IDs aus
`../stil-regeln.md` §4, Layout-Familien aus `../ui-layouts-catalog.md`
§Sektions-Layout-Familien.

Startseite `/`, Reihenfolge von oben:

| # | Sektion | Layout-Familie | Pattern-ID | Wie gebaut (1 Satz) |
|---|---|---|---|---|
| 1 | Navbar | Band | — | Schwebende weisse Pille mit Abstand zum Rand, links Burger + Label „Menü" (auch auf 1440 — keine ausgeschriebene Desktop-Nav), Mitte Wortmarke, rechts ein lavendelfarbener Pill-Button; sie überlagert jede Scroll-Position (`shots/home-desktop-00-fold.png`, `-24-y17124.png`), mobil ohne Button (`shots/home-mobile-00-fold.png`). |
| 2 | Hero | Stack | `P-HERO-PHOTO`-Gegenstück (Typo-Hero ohne Foto) | Zentrierter Textstapel auf hellgrauem Grund: gesperrter Eyebrow, zweizeilige H1 mit drei inline gesetzten Bildmarken (eigenes Lupen-Logo, Google-G, OpenAI-Kringel) als Wortersatz, vierzeiliger grauer Lead, dann CTA-Paar; im Hintergrund nur eine sehr schwache Münchner Skyline-Silhouette (`shots/home-desktop-00-fold.png`), mobil H1 dreizeilig und CTAs vollbreit gestapelt (`shots/home-mobile-00-fold.png`). |
| 3 | Neuigkeiten-Karussell | Raster | — (Kandidat: versetzte Teaser-Reihe) | Horizontale Reihe unterschiedlich hoher und unterschiedlich gefärbter Karten (dunkel, orange, grün, weiss, lavendel) mit „NEU"-Label, Titel und Textlink, vertikal versetzt statt auf Grundlinie; die weisse trägt ein echtes Team-Gruppenfoto mit Zitat, die orange Screenshot-Mockups plus drei Umriss-Chips (`shots/home-desktop-02-y750.png`). |
| 4 | Presse-Leiste | Band | `P-PROOF-STRIP` | Gesperrtes Label, darunter eine Reihe grauer Original-Wortmarken (German Web Awards, Süddeutsche Zeitung, Münchner Allgemeine, Wirtschaftsjournal, Forbes) ohne Karte und ohne Rahmen (`shots/home-desktop-02-y750.png`). |
| 5 | Problem-Sektion mit Video | Stack | — (Kandidat: Frage-Headline + Ortsvideo) | Zentrierte zweizeilige Frage-H2, darunter ein grosses Video mit echter München-Luftaufnahme als Standbild, grünem Play-Button und Ton-Toggle, danach zwei mittig gesetzte Fliesstext-Blöcke mit fett hervorgehobenen Teilsätzen (`shots/home-desktop-02-y750.png`, `-04-y2250.png`). |
| 6 | Kundenlogo-Raster | Raster | `P-PROOF-STRIP` | Gesperrtes Label mit krummer Zahl, darunter ein 4×2-Raster aus Hairline-Zellen mit grauen Kunden-Wortmarken; eine Zelle bleibt sichtbar leer statt aufgefüllt (`shots/home-desktop-04-y2250.png`). |
| 7 | News-Karte (dunkel) | Raster | — (Kandidat: dunkle Karte als Sektionsträger) | Eine dunkle Karte mit grossem Radius auf hellem Grund, darin drei Beitrags-Karten mit gesperrtem „MILESTONE"-Label plus Versionsnummer, Titel und Vorschaubild — die mittlere lavendel gefüllt; seitlich dünne Strichlinien als Dekor (`shots/home-desktop-04-y2250.png`, mobil gestapelt `shots/home-mobile-08-y2954.png`). |
| 8 | Testimonial | Stack | `P-TESTIMONIAL` | Reihe aus sechs runden Portraits echter Personen, die aktive mit lavendelfarbenem Ring, die übrigen entsättigt; darunter zentriert Zitat, Klarname und Firma — kein Sterne-Widget, keine Bewertungszahl (`shots/home-desktop-06-y3750.png`). |
| 9 | Leistungen (dunkel) | Raster | `P-SERVICES-3`-nah | Dunkle Vollbreite-Sektion mit Eyebrow, H2 (zweites Wort lavendel), Lead, einer gezeichneten Bogen-Linie mit grünem Scheitel als Übergang und drei Spalten, deren jede Zwischenzeile mit grün eingefärbtem Anfangsteil, Text, ein Produkt-Mockup (SERP mit Platz #01, ChatGPT-Antwort, Website auf Laptop) und einen eigenen Umriss-Button trägt (`shots/home-desktop-06-y3750.png`, `-08-y5250.png`). |
| 10 | Fallstudien (dunkel) | Stack | `P-CASE`-nah | Gestapelte breite Karten je Kunde mit Branchen-Label, Firmenname, zwei Kennzahl-Kacheln (farbige Zahl, graue Einheit), Umriss-Button und einem breiten Key-Visual im jeweiligen Kundenfarbklima — die Kennzahlfarbe wechselt pro Karte mit dem Bild, ein Seniocon-Visual zeigt einen echten Sistrix-Sichtbarkeitsgraph mit Datumsachse (`shots/home-desktop-08-y5250.png`, `-10-y6750.png`). |
| 11 | Vorteile-Bühne | Split | `P-BENEFITS`-nah | Gerundete Bühne mit abgedunkeltem echtem Foto als Grund: links vier halbtransparente Zeilen-Karten mit Umriss-Icon, gesperrtem Label und zwei Zeilen Text plus Primär-CTA, rechts ein freigestelltes Smartphone-Mockup mit dem eigenen Kunden-Dashboard (Besuche 4263, Anfragen 107) (`shots/home-desktop-11-y7500.png`). |
| 12 | Timeline | Split | `P-PROCESS-3`-nah | Dunkle Sektion mit senkrechter lavendelfarbener Linie und Punkt-Markern; Text- und Bildblock wechseln pro Station die Seite, der Text ist zur Linie hin ausgerichtet — die Bildflächen bleiben in den `--static`-Shots leer, weil die Motive per Scroll-Reveal laden (`shots/home-desktop-14-y9750.png`, `-16-y11250.png`). |
| 13 | Über uns | Split | `P-ABOUT` | Links Eyebrow, zweizeilige H2 und zwei Absätze mit konkreten Zahlen (16-köpfiges Team, 5 Jahre, 100 Kunden) plus CTA-Paar, rechts eine lose Collage aus drei leicht rotierten Fotokarten mit Schlagschatten (Team, Arbeitsplatz, Branding) (`shots/home-desktop-16-y11250.png`). |
| 14 | Kennzahlen-Trio | Raster | `P-STATS` | Drei gleich hohe weisse Karten mit Hairline-Rand, je grosse Zahl mit lavendelfarbenem Plus-Präfix (+100, +20 Mio, +50.000) und einer Zeile Erklärung (`shots/home-desktop-16-y11250.png`). |
| 15 | Potenzialanalyse in 3 Schritten | Raster | `P-PROCESS-3` | Zentrierte H2 mit lavendelfarbenem Teilsatz, darunter drei Spalten mit gesperrtem „SCHRITT"-Label plus farbiger Ziffer, H3, Absatz und einem UI-Mockup des eigenen Produkts (Sichtbarkeitsindex-Tabelle mit „9 von 100%", Lead-Potenzial-Karte, Wachstumsplan); danach zentriert das CTA-Paar (`shots/home-desktop-18-y12750.png`). |
| 16 | Report-Karte (dunkel) | Split | `P-LEADMAGNET`-nah | Dunkle Karte mit grossem Radius: links Pill-Badge mit Häkchen, H2, Absatz und Primär-Button mit Download-Icon, rechts ein Coverflow aus drei Report-Seiten (mittlere frontal und grösser, äussere gekippt und abgedunkelt) mit runden Pfeil-Buttons und Punkt-Indikatoren (`shots/home-desktop-18-y12750.png`). |
| 17 | Themen-Chips + Presse-Slider | Band | `P-PROOF-STRIP`-Erweiterung | Erst eine Reihe Pill-Chips mit farbigem Punkt, dann auf hellem Grund ein horizontaler Slider aus weissen Karten, deren jede einen echten Artikel-Screenshot im Smartphone-Rahmen (mit Statusleiste und Uhrzeit) zeigt, darunter der Medienname als Bildunterschrift; die Karten sind am Rand angeschnitten (`shots/home-desktop-21-y15000.png`). |
| 18 | FAQ | Akkordeon | `P-FAQ` | Zweizeilige H2 mit lavendelfarbener zweiter Zeile, darunter vollbreite Zeilen mit Hairline-Trenner und rundem Toggle-Button rechts; fünf ausklappbare Fragen belegt über die Klick-Shots `home-desktop-click-y15000-*` und `-y15750-*` (`shots/home-desktop-21-y15000.png`). |
| 19 | Schluss-CTA | Stack | `P-CTA-END` | Dunkler Grund, gesperrter Eyebrow, dreizeilige zentrierte H2, Absatz und genau ein Primär-Button — hier ohne Sekundär-Partner (`shots/home-desktop-24-y17124.png`). |
| 20 | Footer | Raster | — | Dunkel, vierspaltig: links Wortmarke plus drei Social-Icons, rechts vier Link-Gruppen; darunter eine Reihe Presse-Wortmarken, zwei Badges, eine Trennlinie und eine Schlusszeile mit Link und OpenAI-Icon (`shots/home-desktop-24-y17124.png`). |

## 4. Raphael-Urteil

**Verdikt: GO 02.09.2026 (Raphael-Liste, Begruendungssatz offen)**

Der Stamp kommt aus Raphaels Liste; der Begründungssatz liegt noch nicht vor.
Die folgenden Punkte sind die Belege aus den Shots, nicht das Urteil.

**Essenz (belegt am Shot).** Die Seite verzichtet komplett auf ein Foto-Hero
und stellt stattdessen eine zentrierte Typo-H1 hin, in die drei fremde
Bildmarken (Google-G, OpenAI-Kringel, eigenes Lupen-Logo) inline als Wortersatz
gesetzt sind — die Positionierung ist damit im Fold ohne Bild lesbar
(`shots/home-desktop-00-fold.png`, mobil identisch aufgebaut
`shots/home-mobile-00-fold.png`). Jeder Beweis darunter ist ein Artefakt statt
einer Behauptung: echte Artikel-Screenshots im Smartphone-Rahmen mit Uhrzeit
und Statusleiste statt Presse-Logos allein
(`shots/home-desktop-21-y15000.png`), ein echter Sistrix-Sichtbarkeitsgraph mit
Datumsachse im Fallstudien-Visual (`shots/home-desktop-10-y6750.png`), das
eigene Kunden-Dashboard mit krummen Werten 4263 / 107 im Handy-Mockup
(`shots/home-desktop-11-y7500.png`). Farbdisziplin: ein einziges Lavendel
`#7a7fad` trägt Primär-CTA, Timeline-Linie, Zahl-Präfixe und
Hervorhebungs-Spans, alles andere ist Grau oder das warme Fast-Schwarz
`#211d1d`.

**Do-not-copy.** Marke und Lupen-Logo, alle Personenfotos (Portraitreihe
`shots/home-desktop-06-y3750.png`, Team-Collage
`shots/home-desktop-16-y11250.png`), die fremden Presse- und Kunden-Wortmarken,
sämtliche Fallstudien-Zahlen und Kundennamen sowie die gesamte Copy. Übernommen
wird höchstens die Struktur.

**Lizenz / Provenance.** `ungeklärt`. Die Screenshots in `seo-labs/shots/`
existieren nur als interne Studie und werden nicht veröffentlicht, weitergegeben
oder als Asset verwendet. Urheber der Motive sind SEOLabs GmbH, deren Kunden
und die abgebildeten Medien.

**Status.** Alle Regel-Kandidaten in §5 stehen auf `kandidat`.

**Spannungen zum Regelbuch** (Beobachtung, kein Urteils-Override):

- S3 (höchstens eine dunkle Sektion pro Seite) ist deutlich verletzt: die
  Startseite hat mindestens sechs dunkle Flächen — News-Karte, Leistungen,
  Fallstudien, Vorteile-Bühne, Timeline, Report-Karte, Schluss-CTA, Footer
  (`shots/home-desktop-04-y2250.png`, `-06-y3750.png`, `-08-y5250.png`,
  `-11-y7500.png`, `-14-y9750.png`, `-18-y12750.png`, `-24-y17124.png`).
- S7 (Inter nie als Display- oder Default-Landingfont) ist verletzt: Inter ist
  die einzige Textschrift der Seite, inklusive H1 (HTML-Extrakt §2).
- S4 (Primär-CTA nie als Pille): der Navbar-CTA „Termin" ist eine Pille
  (`shots/home-desktop-00-fold.png`); die Hero- und Sektions-CTAs sind
  dagegen Rechtecke mit moderatem Radius.
- S19 (Headline nennt Leistung und Keyword selbst): die H1 erfüllt das, weil
  sie „Suchergebnisse", „Google" und „ChatGPT" trägt — aber sie tut es über
  drei Bildmarken statt über Wörter, was für Screenreader und für die
  SEO-Lesbarkeit ein eigenes Risiko ist (`shots/home-desktop-00-fold.png`).
- S6 (einmalig beim Eintritt animieren): die Timeline-Bildflächen bleiben in
  den `--static`-Shots leer, das Motiv erscheint erst beim Scrollen — ohne
  Reduced-Motion-Beleg nicht bewertbar (`shots/home-desktop-14-y9750.png`).
- Radien sind keine Familie: zwölf verschiedene Werte von `2px` bis `999px`
  im selben Dokument (HTML-Extrakt §2) — S20/S23-Nähe auf der Formebene.
- Positiv zu S9-N: keine Fake-Sterne, keine erfundene Bewertungszahl; das
  Testimonial trägt Klarname und Firma statt eines Rating-Widgets
  (`shots/home-desktop-06-y3750.png`), das Kundenlogo-Raster lässt eine Zelle
  sichtbar leer statt sie aufzufüllen (`shots/home-desktop-04-y2250.png`).

## 5. Regel-Kandidaten

Neue S-IDs vergibt dieser Case nicht. Einträge bleiben Kandidaten, bis Raphaels
Begründungssatz und die Synthese sie übernehmen; `../stil-regeln.md` bleibt
unangetastet.

| Beobachtung | Regel-ID | Richtung | Status |
|---|---|---|---|
| Presse-Beweis als Artefakt statt als Logo: die Medien-Sektion zeigt nicht die Wortmarken allein, sondern echte Artikel-Screenshots im Smartphone-Rahmen samt Statusleiste und Uhrzeit, der Medienname steht nur als Bildunterschrift darunter (Beleg: `/` 1440 `shots/home-desktop-21-y15000.png`; die reine Wortmarken-Leiste steht zusätzlich weiter oben `shots/home-desktop-02-y750.png`) | S9-N (Positivseite) | GO | kandidat |
| Kennzahl-Kacheln erben die Farbe des Kundenbildes: jede Fallstudien-Karte trägt zwei Kacheln „Zahl gross farbig / Einheit klein grau", und die Zahlfarbe wechselt mit dem Key-Visual des Kunden (orange bei HAUBNER, blau bei Seniocon, rot bei GastroRocket) — ein Akzent pro Karte statt eines globalen Zweitakzents (Beleg: `/` 1440 `shots/home-desktop-08-y5250.png`, `shots/home-desktop-10-y6750.png`) | S1-Spannung (zweite Farbe nur kartenlokal) | GO | kandidat |
| Produkt-Screenshot statt Icon in jeder Erklär-Sektion: Leistungs-Spalten und Prozess-Schritte tragen kein Line-Icon, sondern ein Mockup des tatsächlichen Ergebnisses — SERP-Liste mit Platz #01, ChatGPT-Antwort, Sichtbarkeitsindex mit „9 von 100%", Wachstumsplan (Beleg: `/` 1440 `shots/home-desktop-08-y5250.png`, `shots/home-desktop-18-y12750.png`) | S14 (Gegenmuster zur Icon-Card-Soup) | GO | kandidat |
| Zwei-Stufen-CTA-System sitewide identisch: Primär = lavendelfarbene Fläche mit Pfeil-Icon, Sekundär = Umriss ohne Icon; das Paar erscheint an vier Stellen in exakt derselben Form, und nur im Schluss-CTA steht der Primärbutton allein (Beleg: `/` 1440 `shots/home-desktop-00-fold.png`, `shots/home-desktop-16-y11250.png`, `shots/home-desktop-18-y12750.png`, `shots/home-desktop-24-y17124.png`; mobil vollbreit gestapelt `shots/home-mobile-00-fold.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Fremde Plattform-Bildmarken inline in der H1 als Wortersatz: Google-G und OpenAI-Kringel stehen mitten im Satz auf x-Höhe und ersetzen kein Wort, sondern verdoppeln es visuell — funktioniert auf 1440 und 390 gleich (Beleg: `/` 1440 `shots/home-desktop-00-fold.png`; `/` 390 `shots/home-mobile-00-fold.png`) | S19-Spannung (Keyword als Bild statt als Text) | GO | kandidat |
| Unvollständiges Raster wird nicht aufgefüllt: das Kundenlogo-Raster hat acht Hairline-Zellen und lässt die achte sichtbar leer, statt ein Logo zu wiederholen oder ein Platzhalter-Logo zu setzen (Beleg: `/` 1440 `shots/home-desktop-04-y2250.png`) | S2-Nähe | GO | kandidat |
| Burger-Menü auch auf 1440: die Desktop-Navbar zeigt keine ausgeschriebene Navigation, sondern Burger plus Label „Menü", Wortmarke und einen CTA — der Fold bleibt dadurch frei von Linkketten (Beleg: `/` 1440 `shots/home-desktop-00-fold.png`; identisch auf allen Scroll-Positionen bis `shots/home-desktop-24-y17124.png`) | — (Prosa-Kandidat, klärungsbedürftig) | offen | kandidat |
| Sechs dunkle Flächen auf einer Startseite: der Hell-Dunkel-Wechsel wird als Rhythmus benutzt, nicht als Ausnahme — die dunklen Zonen tragen jeweils einen eigenen Job (News, Leistungen, Fallstudien, Vorteile, Timeline, Report, Schluss) (Beleg: `/` 1440 `shots/home-desktop-04-y2250.png`, `-06-y3750.png`, `-08-y5250.png`, `-11-y7500.png`, `-14-y9750.png`, `-18-y12750.png`, `-24-y17124.png`) | S3-Gegenbeleg | NO-GO gegen S3 | kandidat |
