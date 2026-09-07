# Regel-Kandidaten — dedupliziert (ungestempelt)

Stand: 02.09.2026, nach der Case-Recovery, der Endabnahme und der Aufnahme
der acht Studien vom 02.09.2026.
**Nichts hier ist verbindlich.** `../stil-regeln.md` bleibt unangetastet und
endet bei S18, bis Raphael GO gibt.

**Kandidaten tragen keine S-Nummern.** Sie heißen Prosa-Kandidaten mit
sprechendem Arbeitstitel. Eine S-ID vergibt erst `stil-regeln.md` — und zwar
erst, nachdem Raphael den Kandidaten GO gestempelt hat. Vorab-Reservierungen
gibt es nicht.

Beleg-Qualität, ehrlich benannt — **zwei Beleg-Klassen, nie vermischt**:

- **Klasse A, 8 Cases mit vollem GO-Stamp (Raphael, 31.08.2026):**
  `elephant-solar`, `farisschmidt`, `peter-at`, `enpal`, `ekd-solar`,
  `jantronic`, `priwatt`, `alpen-energie`. Nur diese Klasse traegt die
  Zähler in der Tabelle „Bereit fuer Verbindlichkeit".
- **Klasse B, 8 Cases vom 02.09.2026 mit Stamp `GO 02.09.2026 (Raphael-Liste,
  Begruendungssatz offen)` und Status `kandidat`:** `pangram`, `seo-labs`,
  `leadfluss`, `ploy-ai`, `lassie-ai`, `cryptory`, `tradingfreaks`,
  `matthias-aumann`. Der Stamp stammt aus Raphaels URL-Liste, der
  Begruendungssatz fehlt, Lizenz/Provenance ist ueberall `ungeklaert`, bei
  `pangram` zusaetzlich die Belegschwelle `offen`. Klasse-B-Belege zaehlen
  in einem **eigenen** Zähler und heben keinen Kandidaten ueber die
  Drei-Belege-Schwelle.

Jeder Zähler unten zählt ausschließlich Case-Dateien und ist per `grep` in
Paragraph 5 bzw. den Sektions-Tabellen der genannten Datei nachvollziehbar.
Sites ohne Beleg in der Case-Datei zählen nicht mit.

## Bereit fuer Verbindlichkeit — wartet auf Raphael-GO (≥ 3 Case-Belege)

| Kandidat (prüfbar) | Beleg-Cases (Klasse A) | Zähler A | Nachtrag Klasse B (02.09.2026) | Zähler B |
|---|---|---|---|---|
| **Kandidat: Proof im Hero-Fold** — mindestens ein überprüfbares Proof-Element (Bewertungszahl mit Quellmarke, Partner-Logo, Prüfsiegel) steht im 1440-Fold, nicht erst in einer tieferen Sektion | elephant-solar (Proof-Zeile: 1000+ Kunden, 5.0 Google, Ecoflow-Logo), farisschmidt (Trust-Pill über der H1), alpen-energie (Swissolar/Ecoflow/SwissWatt-Logos), ekd-solar (4,2 von 5,0 aus über 1.800 Bewertungen), enpal (CHIP-Siegel + Checkmark-Band), jantronic (ProvenExpert-Widget „SEHR GUT"), peter-at (3 ProvenExpert-Siegel) | 7 | cryptory (TUEV-Siegel und Trust-Zeile im Fold, `home-desktop-00-fold.png`), tradingfreaks (TUEV-Siegel plus Trustpilot-Wertung im Fold, `home-desktop-00-fold.png`), pangram (Trust-Zeile nennt zwei Universitaeten namentlich, `home-desktop-00-fold.png`) | 3 |
| **Kandidat: Genau ein gefüllter Akzent-CTA im Fold** — ein zweiter CTA ist neutral/hell, nie eine zweite Akzentfüllung | elephant-solar, farisschmidt (eine blaue Pille), alpen-energie (rot + grau „Erklärvideo"), ekd-solar (ein oranger), enpal (ein gelber), jantronic (grün + grau „Unsere Geschichte"), peter-at (ein gelber) | 7 | matthias-aumann (eine gruene Taste, nie ein zweiter CTA), lassie-ai (eine Pille aus E-Mail-Feld und Button, sonst nichts) — Gegenbelege: cryptory und tradingfreaks fahren ein festes CTA-**Paar**, pangram zwei CTAs plus Werkzeug-Button | 2 dafuer, 3 dagegen |
| **Kandidat: Referenz- und Testimonial-Karten tragen Messwerte statt Adjektive** — PLZ/Ort-Badge, kWp/Modulzahl/Modultyp, konkrete Ersparnis-Summe je Karte | elephant-solar (PLZ-Badge, kWp + Modulzahl, Fakten-Chips), alpen-energie (Kundenname-Badge + Modulzahl/kWp/Modultyp), ekd-solar („176.620 € / 30 Jahre", Komponenten-Chips), peter-at („Bis zu 110.869 €, Familie Prerost, 10.1 kWp / 10.2 kWh"), enpal (Klarname + Ort + Anlagen-Fakten unter dem Testimonial-Video), farisschmidt (+75 %/+120 %-Charts, gelieferte Websites als echte Screenshots) | 6 | leadfluss (Ortschip, Gewerkschip, Kundenlogo, Vor-Ort-Teamfoto und genau eine Ergebniszahl je Karte, `home-desktop-04-y2250.png`), matthias-aumann (zwei beschriftete Balken „vorher"/„Heute" mit Euro-Betraegen unter Portraet und Firma, `shots/home-desktop-02-y750.png`), lassie-ai (Belegkarten mit Klarnamen, krummen Dollar-Betraegen und Zeitstempeln, `home-desktop-14-y9750.png`), cryptory (Fall mit Ausgangslage/Ziel/Ergebnis als Bullet-Liste mit Zahlen, `home-desktop-18-y12750.png`), seo-labs (Kennzahl-Kacheln „Zahl gross farbig / Einheit klein grau" je Fallstudie, `home-desktop-08-y5250.png`) | 5 |
| **Kandidat: Krumme, belegte Zahlen mit Quelle oder Stand statt runder Claims** — Bewertungszahlen, Ersparnisse und Bestandszahlen erscheinen unbeschönigt und mit Label/Fußnote | priwatt („Bis zu 1879 kWh*", „90.000 t CO2* (Stand: August 2025)"), enpal (Trustpilot „4.2 von 5, 29.580 Bewertungen"; Google „4,2, 13.256 Rezensionen"), ekd-solar (4,2 von 5,0 aus über 1.800; Stats-Band nur mit Labels zitierbar), jantronic (ProvenExpert mit nur 8 Bewertungen + Authentizitäts-Datum), peter-at (Zähler „Bereits 71921 PV-Anfragen gestellt") | 5 | cryptory (2.139+ Teilnehmer, 398 Bewertungen, 143.900+ aufgeteilt in 40.700/50.000/75.800), leadfluss (Google „5,0" mit „(41)" daneben, je Karte Verifiziert-Haken und Zeitangabe), tradingfreaks (Wertung plus Bewertungszahl mit Link auf die Plattform; Renditewert nie nackt, mit Sternchen und Risiko-Fussnote), pangram (Benchmark-Karten mit Modellname, Prozentwert und Pruefmonat), seo-labs (Dashboard-Werte 4263 / 107 im Mockup) | 5 |
| **Kandidat: Jede Unterseite öffnet mit demselben Sub-Hero-Band** — gleiches Muster aus Eyebrow/Breadcrumb in Akzent, Display-H1, einem Lead-Satz und genau einem CTA | elephant-solar (alle 4 Unterseiten, dunkler Marken-Verlauf), ekd-solar (oranger Eyebrow, weiße H1 auf abgedunkeltem Echt-Foto, ein oranger CTA), farisschmidt (Projekt-Detailseiten als striktes Template), jantronic (identisches CTA-Paar im Fold jeder Route) | 4 | leadfluss (`/faq` oeffnet mit Sub-Hero-Band auf `--muted`, `shots-routen/faq-desktop-00-fold.png`; `/anfrage` mit demselben Quiz-Baustein) | 1 |
| **Kandidat: Stats-Band als wiederverwendbarer Beweisblock** — drei bis vier große Zahlen, jede mit genau einem konkreten Belegsatz oder Label darunter, nie nackte Zahlen | elephant-solar (vier Zahlen in Akzentfarbe auf dunkler Fläche), alpen-energie (identischer Aufbau auf drei Routen, Eyebrow „ZAHLEN, DIE ÜBERZEUGEN"), ekd-solar (drei Zahlen auf Warmgrau, Bezugsgrößen gemischt und nur mit Label zitierbar) | 3 | tradingfreaks (Fakten-Raster, in dem jede Zahl ein eigenes Bildmittel statt eines Icons bekommt, `home-desktop-02-y750.png`), cryptory (eine Karte je Plattform mit Original-Logo und eigener krummer Zahl, `home-desktop-23-y16130.png`) | 2 |
| **Kandidat: Konversions-/Funnel-Seite ohne Navigation, Mikro-Commitment zuerst** — eigene Route ohne Menü, erster Schritt ist eine Auswahlfrage oder ein Kalender, kein Datenfeld | farisschmidt (`/termin`: Logo, H1, Nutzenzeile, Kalender-Embed), peter-at (`/anfragen`: Menü durch Zähler ersetzt, Bundesland-Kacheln + Fortschrittsbalken), alpen-energie (`/anfrage`: 4-Schritt-Frage-Funnel, Kontaktdaten nicht im Fold), enpal (Konfigurator-Quiz statt Formular, belegt über die Click-Serie) | 4 | leadfluss (5-Schritt-Quiz mit Ein-Klick-Erstfrage, Schrittzaehler und Fortschrittsbalken, auf `/anfrage` als identischer Baustein), matthias-aumann (Landingpage ganz ohne Navigation, einziger Ausgang ist der Funnel-CTA), cryptory (Fold ohne Navigation; die Leiste erscheint erst ab der Trust-Sektion als Bodenpille) | 3 |

Der CTA-Kandidat schärft das bestehende `P-HERO-PHOTO`-Don't („kein zweiter
gefüllter CTA im Fold") zur eigenen Regel mit externem Beleg.

## Kandidaten unter 3 Case-Belegen

Klasse-B-Belege (02.09.2026) stehen mit dem Zusatz `(B)` und zaehlen im
Zähler getrennt, weil ihnen Raphaels Begruendungssatz fehlt.

| Kandidat (prüfbar) | Beleg-Cases | Zähler | Status |
|---|---|---|---|
| **Kandidat: Ein wörtlich identischer Primär-CTA sitewide** — derselbe Wortlaut in Header, Hero und Schluss-Sektion, nie ein konkurrierender „Kontakt"-CTA | enpal („(Jetzt) Ersparnis berechnen" auf 4 Routen), peter-at („Jetzt Ersparnis berechnen" in Header/Hero/Schluss), matthias-aumann (B, ein Aktions-Wortlaut sechsmal, `shots/home-desktop-00-fold.png`, `-04-y2250.png`, `-10-y6750.png`, `-12-y8250.png`, `-15-y10500.png`, `-16-y11250.png`), lassie-ai (B, dieselbe E-Mail-Pille im Fold und im Schluss-Band ueber rund 22.000 px), cryptory (B, dasselbe CTA-Paar an vier Wiederholungen), tradingfreaks (B, dasselbe CTA-Paar in Hero, Video-Split, Ueber-uns-Band und Schlussbuehne), seo-labs (B, Primaer/Sekundaer-Paar an vier Stellen in exakt derselben Form) | 2 + 5 (B) | kandidat |
| **Kandidat: Vergleichs-Matrix statt Selbstlob** — Spalten für Wettbewerbstypen, je Zeile eine prüfbare Eigenschaft, eigene Spalte dezent getönt | farisschmidt (4 Spalten mit Legende), jantronic (3 Spalten Broker/Hersteller/eigene Marke), pangram (B, Balkenvergleich gegen den namentlich genannten Wettbewerber mit Quelle als Link, `home-desktop-16-y11250.png`), leadfluss (B, Problem/Loesung als zwei Spalten mit identischem Kachel-Bau, unterschieden nur durch Semantikfarbe und Bildhelligkeit, `home-desktop-11-y7500.png`) | 2 + 2 (B) | kandidat |
| **Kandidat: Hero-Motiv und CTA-Paar bleiben mobil identisch** — 390 kürzt nur die Proof-Elemente, nicht Motiv oder Button-System | alpen-energie (gleiche Gründer-Aufnahme, gleiche zwei Buttons; nur Partner-Logos rutschen unter den Fold), elephant-solar (Gegenrichtung: Motiv wechselt, Proof-Zeile schrumpft — als Spannung notieren), lassie-ai (B, dieselbe Pillen-Navigation und dieselbe CTA-Pille auf 390, `home-mobile-00-fold.png`), seo-labs (B, CTA-Paar mobil vollbreit gestapelt, Aufbau identisch), pangram (B, Gegenrichtung: der Consent-Dialog verdeckt den mobilen Fold in allen 63 Shots — die Gegenprobe ist gar nicht moeglich) | 2 + 3 (B) | kandidat |
| **Kandidat: Ein Funnel-Template über mehrere Produktlinien** — dieselbe Rechner-Sektion mit identischen Checkmarks und identischem CTA, einmal gebaut, mehrfach montiert | priwatt (Solar- und Wärmepumpen-Seite) | 1 | kandidat |
| **Kandidat: Typo-Hero ohne Foto** — genau ein Schlüsselwort der H1 in Serif-Kursiv + Akzentfarbe, Muster wiederholt sich in jeder H2 | farisschmidt, seo-labs (B, zentrierte Typo-H1 mit inline gesetzten fremden Bildmarken statt eines Fotos, `home-desktop-00-fold.png`), cryptory (B, ein blaues Serifen-Kursiv-Wort als einzige typografische Abweichung je Headline), lassie-ai (B, zweite Headline-Zeile im echten Serif-Kursiv-Schnitt als einzige Betonung) | 1 + 3 (B) | kandidat |
| **Kandidat: Verknappung als Status-Marker im Button** — grüner Punkt + konkrete Restplatz-Aussage als zweite CTA-Zeile, kein Countdown, kein Fake-Timer | farisschmidt | 1 | kandidat |
| **Kandidat: Benefit-Chips mit Substanz** — 3 Checkmark-Claims im Fold bzw. Chip mit fettem Stichwort plus konkretem Halbsatz, nie nur Adjektive | enpal (3 Chips in beiden Viewports), jantronic (Schluss-Band mit Halbsatz je Chip), pangram (B, Beispiel-Chips im Werkzeug-Feld tragen echte Eingaben statt Adjektiven, `home-desktop-00-fold.png`) | 2 + 1 (B) | kandidat |
| **Kandidat: Team-Karten mit direktem Draht** — persönliche E-Mail und Telefonnummer je Person statt Sammel-Formular | jantronic | 1 | kandidat |
| **Kandidat: Ein einziges Marken-Deko-Element sitewide** — dieselbe Glyphe/Textur auf allen Flächen, keine wechselnden Blobs oder Gradients | priwatt (hellgrünes Pixel-Konfetti), pangram (B, handgezeichnete Papierschnitt-Textur traegt Fold, Branchenkarten und Footer-Rahmen, `home-desktop-00-fold.png`, `-10-y6750.png`, `-21-y14695.png`), lassie-ai (B, Blumen-Bildwelt als durchgehende Marken-Signatur) | 1 + 2 (B) | kandidat |
| **Kandidat: Wiederkehrendes Berater-Band als Sektionstrenner** — echtes Berater-Foto, Klartext-Telefonnummer, Erreichbarkeitszeiten, zwei Kanal-CTAs | priwatt (zweimal auf derselben Seite) | 1 | kandidat |
| **Kandidat: Varianten-Wahl als Foto-Kachel-Systematik** — gleichformatige Foto-Kacheln mit Ein-Wort-Label statt Dropdown | priwatt (5 Montageorte) | 1 | kandidat |
| **Kandidat: Magazin-Artikel als Beweisstück** — Autor mit Foto, Aktualisiert-Datum, Lesezeit, „Das Wichtigste in Kürze"-Box, eigene Datenanalyse als Tabelle | enpal | 1 | kandidat |
| **Kandidat: Zweizeilige Headline mit abgestufter zweiter Zeile** — Zeile 1 in Textfarbe, Zeile 2 in Akzent (dunkel) oder Grau (hell), sitewide wiederkehrend | peter-at | 1 | kandidat |
| **Kandidat: Riesige Wortmarke als Seitenabschluss** — viewportbreiter Schriftzug als letztes Element im Footer jeder Seite | peter-at, lassie-ai (B, hellblaues Band traegt den Markennamen als ueberformatiges, unten angeschnittenes Serif-Wort nach dem Footer, `home-desktop-31-y22218.png`, mobil identisch), ploy-ai (B, Footer-Panel zeigt die Wortmarke einmal gross in allen vier Marken-Farben, `home-desktop-12-y8250.png`) | 1 + 2 (B) | kandidat |
| **Kandidat: Marken-Typo im Testimonial-Video** — Untertitel-Boxen in Markenfarbe machen jedes Standbild sofort zuordenbar | enpal | 1 | kandidat |
| **Kandidat: Beweis als fremdes Artefakt statt als Logo oder Claim** — die Belegsektion zeigt nicht die Wortmarke oder eine Behauptung, sondern das echte Dokument: Artikel-Screenshot im Smartphone-Rahmen samt Statusleiste, Sichtbarkeitsgraph mit Datumsachse, TUEV-Zertifikat in Originalgroesse mit Registriernummer und Gueltigkeitsdatum, Bewertungs-Embed mit Klarnamen | seo-labs (B, `home-desktop-21-y15000.png`, `-10-y6750.png`, `-11-y7500.png`), cryptory (B, `shots/home-desktop-09-y6000.png`, `-20-y14250.png`), tradingfreaks (B, `home-desktop-13-y9000.png`, `-11-y7500.png`), leadfluss (B, echtes Maps-Fenster mit Adresse, `home-desktop-15-y10289.png`), pangram (B, Benchmark-Karten mit Modellname und Pruefmonat) | 0 + 5 (B) | kandidat |
| **Kandidat: Produkt-Artefakt statt Icon in jeder Erklaer-Sektion** — Leistungs-Spalten und Prozess-Schritte tragen kein Line-Icon, sondern ein Bruchstueck des tatsaechlichen Ergebnisses: SERP-Liste, Push-Mockup mit Budgetzahl, Metrik-Karte mit Sparkline, Systemmeldung mit Uhrzeit und @-Handle, verkettete Belegfragmente mit Status-Chips | seo-labs (B, `home-desktop-08-y5250.png`, `-18-y12750.png`), leadfluss (B, iOS-Push-Mockup gegenueber jedem Textblock, `home-desktop-02-y750.png`), ploy-ai (B, `home-desktop-04-y2250.png`, `-08-y5250.png`), lassie-ai (B, Prozess-Karten mit UI-Bruchstuecken ohne 01/02/03-Marker, `home-desktop-26-y18750.png`), pangram (B, Produktkarte traegt echtes UI im oberen Drittel, `home-desktop-05-y3000.png`) | 0 + 5 (B) | kandidat |
| **Kandidat: Das laufende Werkzeug im Fold statt eines Produkt-Screenshots** — die rechte Fold-Haelfte ist ein bedienbares Feld mit Tab-Paar, Textfeld, Beispiel-Chips und Absende-Button, sodass der erste Beweis eine eigene Eingabe ist | pangram (B, `home-desktop-00-fold.png`) | 0 + 1 (B) | kandidat |
| **Kandidat: Fremde Autoritaet mit Datum statt Selbstlob** — Benchmark- und Bewertungsangaben nennen Anbieter, Modellname, Prozentwert und Pruefmonat, Zitate tragen Klarname, Institution und Hochschullogo, der Wettbewerber wird offen benannt | pangram (B, `home-desktop-03-y1500.png`, `-13-y9000.png`, `-16-y11250.png`) | 0 + 1 (B) | kandidat |
| **Kandidat: Mehrfarben-System ohne Akzentbruch** — mehrere Vollflaechenfarben markieren Sektionen und Produktzweige, aber genau eine Farbe wird je zu Button, Zahl oder Eyebrow; ohne diese Reservierung ist es ein S1-Bruch | pangram (B, sechs Vollflaechenfarben, Orange allein als Aktion, `home-desktop-05-y3000.png`, `home-desktop-hover-00-Products.png`), ploy-ai (B, Gegenposition: vier gleichrangige Marken-Toene als Panels ohne reservierte Aktionsfarbe, `home-desktop-04-y2250.png`, `-06-y3750.png`) | 0 + 2 (B) | kandidat |
| **Kandidat: Typo-Durchdringung mit 3D-Objekt** — dieselbe Headline liegt teils vor, teils hinter demselben Objekt, und Versalwoerter werden um einen Objekt-Cluster ueber die Flaeche verteilt statt zentriert gesetzt | ploy-ai (B, `home-desktop-02-y750.png`, `-08-y5250.png`) | 0 + 1 (B) | kandidat |
| **Kandidat: Schluss-CTA ohne Akzentflaeche** — die groesste Type der Seite steht auf normaler Grundflaeche, darunter ein Ein-Feld-Formular; kein farbiges Schlussband | ploy-ai (B, `home-desktop-11-y7500.png`, `-12-y8250.png`) | 0 + 1 (B) | kandidat |
| **Kandidat: AEO-Footer mit LLM-Block** — der Footer traegt einen eigenen Block mit Outline-Pillen fuer die Zusammenfassungs-Ziele (ChatGPT, Claude, Google AI Mode, Grok, Perplexity) | ploy-ai (B, `home-desktop-12-y8250.png`, `-14-y9067.png`) | 0 + 1 (B) | kandidat |
| **Kandidat: Schwarz als Aktionsfarbe statt Akzentfarbe** — der Primaer-Button ist Fast-Schwarz, Farbe erscheint nur als Flaeche oder als Semantik; die Seite kommt ohne Marken-Akzentfarbe aus | lassie-ai (B, `--color-surface-button-primary: #070503`, sichtbar `home-desktop-31-y22218.png`) | 0 + 1 (B) | kandidat |
| **Kandidat: Schwebende Pillen-Navigation ohne Burger** — statt Vollbreiten-Leiste eine schwebende Gruppe, mobil unveraendert und ohne Burger-Menue | lassie-ai (B, `home-desktop-00-fold.png`, `-18-y12750.png`, `home-mobile-00-fold.png`), seo-labs (B, Gegenrichtung: Burger plus Label „Menue" auch auf 1440, `home-desktop-00-fold.png`), cryptory (B, Navigation erst nach dem Fold als eingeblendete Bodenpille, `home-desktop-09-y6000.png`), matthias-aumann (B, gar keine Navigation, `shots/home-desktop-00-fold.png`) | 0 + 4 (B) | kandidat |
| **Kandidat: Reichweite und Einzelbeleg in derselben Sektion** — Punktraster-Karte mit Nutzerzahl als Flaeche, darueber gelegt die Testimonial-Karte mit Portraet, Klarname und Praxisname, statt getrennter Karten- und Testimonial-Sektion | lassie-ai (B, `home-desktop-22-y15759.png`, mobil `home-mobile-15-y5908.png`) | 0 + 1 (B) | kandidat |
| **Kandidat: Rechtspflicht als Serioritaetssignal** — der Footer besteht aus einer Zeile Rechtslinks und drei Absaetzen Risikohinweis mit ausdruecklichem Ausschluss der Anlageberatung, kein Link-Raster und kein Social-Block | cryptory (B, `shots/home-desktop-23-y16130.png`), tradingfreaks (B, Renditewert nie nackt: Sternchen, Verlustabschnitt im Chart, zweizeilige Risiko-Fussnote, `home-desktop-03-y1500.png`) | 0 + 2 (B) | kandidat |
| **Kandidat: Reichweite pro Kanal einzeln beziffert** — eine Karte je Plattform mit Original-Logo und eigener krummer Zahl, die Gesamtzahl nur als Badge darueber | cryptory (B, `shots/home-desktop-23-y16130.png`) | 0 + 1 (B) | kandidat |
| **Kandidat: Testimonial als vollstaendiger Fall statt als Zitat** — Personen-Tableiste schaltet zwischen Faellen, jeder Fall zeigt Video plus Ausgangssituation / Ziel / Ergebnis, das Ergebnis als Bullet-Liste mit Zahlen | cryptory (B, `shots/home-desktop-18-y12750.png`), matthias-aumann (B, Versprechen und Kundenzitat mit Klarname im selben Bauteil, viermal identisch, `shots/home-desktop-04-y2250.png`, `-06-y3750.png`, `-08-y5250.png`) | 0 + 2 (B) | kandidat |
| **Kandidat: Selfie-Video-Faecher statt Testimonial-Slider** — mehrere ueberlappende, leicht gedrehte Hochkant-Standbilder echter Kunden, nur das mittlere aufrecht mit Play-Knopf | matthias-aumann (B, `shots/home-desktop-08-y5250.png`) | 0 + 1 (B) | kandidat |
| **Kandidat: Eine Schriftfamilie fuer alles** — Hierarchie entsteht nur ueber Groesse, Gewicht und Sperrung; keine zweite Familie im Site-CSS | leadfluss (B, `--font-sans: "Jost"` als einzige Textfamilie, sichtbar `home-desktop-00-fold.png` gegen `-04-y2250.png`), seo-labs (B, Gegenrichtung: Inter als einzige Textschrift inklusive H1 — verletzt S7) | 0 + 2 (B) | kandidat |
| **Kandidat: Unvollstaendiges Raster wird nicht aufgefuellt** — eine Zelle im Kundenlogo-Raster bleibt sichtbar leer, statt ein Logo zu wiederholen oder einen Platzhalter zu setzen | seo-labs (B, acht Hairline-Zellen, die achte leer, `home-desktop-04-y2250.png`) | 0 + 1 (B) | kandidat |
| **Kandidat: Layering-Sektion ohne belegten Reduced-Motion-Opt-out** — Sticky-, Parallax-, Karussell- und Akkordeon-Strecken tragen die Seite, aber `prefers-reduced-motion` fehlt im Site-CSS oder existiert nur als ungenutzte Utility; nach `../ui-layouts-catalog.md` ein Fail, kein Geschmacksstreit | tradingfreaks (B, 13 `position:sticky`-Regeln, `prefers-reduced-motion` 0x), ploy-ai (B, vier Layering-Sektionen von elf, genau eine Regel in 357.989 Bytes CSS), pangram (B, nur die Tailwind-Utility), lassie-ai (B, Parallax ueber mehrere Bildschirmhoehen, aus statischen Shots nicht belegbar), cryptory (B, scrollgebundene Chat-Blasen, nicht geprueft), matthias-aumann (B, Layering-Sektionen 3/6/8/14), seo-labs (B, Timeline-Bildflaechen bleiben in `--static` leer) | 0 + 7 (B) | **NO-GO** in allen sieben Faellen — als Anti-Muster notiert, nicht als Uebernahme-Kandidat |
| **Kandidat: Deklarierte, nie benutzte Farb-Tokens** — Token-Set und sichtbares System fallen auseinander (S25-Naehe) | tradingfreaks (B, Amber, Orange und Trust-Blue stehen im CSS und in keinem der 12 gelesenen Shots) | 0 + 1 (B) | **NO-GO** — Anti-Muster |
| **Kandidat: Consent-Dialog verdeckt den mobilen Fold** — der Dialog liegt als zentrierte Box ueber H1, Subline und CTA und bleibt ueber die ganze Seite stehen | pangram (B, alle 63 mobilen Shots), tradingfreaks (B, Cookie-Banner verdeckt in jedem gelesenen Shot den unteren Rand, mobil die Beleg-Karte unter dem CTA-Paar) | 0 + 2 (B) | **NO-GO** — G1-Befund gegen die Seite, kein uebernehmbares Muster |
| **Kandidat: Mobiler Sticky-CTA, den es auf Desktop nicht gibt** — er erscheint ab Verlassen des Folds und ueberdeckt sichtbar Inhalt darunter | matthias-aumann (B, `shots-mobile/home-mobile-04-y1266.png`, `home-mobile-08-y2954.png`; Desktop-Gegenprobe `shots/home-desktop-04-y2250.png`) | 0 + 1 (B) | gemischt — Wirkung belegt, Verdeckung spricht dagegen |
| **Kandidat: Gezeichnete Sternereihe ohne Plattform-Bildmarke und ohne Quellenlink** — Bewertungsgrafik ohne pruefbare Quelle | matthias-aumann (B, `shots/home-desktop-02-y750.png`) | 0 + 1 (B) | **NO-GO** — direkter S9-N-Bruch |
| **Kandidat: Alles ist Vollpille** — `--radius-button: 100rem` als Token, sichtbar in Nav-Leiste, beiden Hero-CTAs und der Formular-Eingabe | ploy-ai (B, `home-desktop-00-fold.png`, `-12-y8250.png`, `home-mobile-00-fold.png`) — Gegenpol: leadfluss (B, `--radius: 0rem`, jede CTA-Ecke scharf, `home-desktop-00-fold.png`) | 0 + 2 (B) | **NO-GO nach S4** — die beiden Cases stehen als Gegenpol-Paar |

## Beleg-Nachträge zu bestehenden Regeln (kein neuer Kandidat)

| Regel | Nachtrag | Cases |
|---|---|---|
| S1 (verbindlich) | Akzentfarbe nur als Wort-Span, Label und Einzel-Button, nie als Fläche | elephant-solar (Lime färbt genau ein H1-Wort), farisschmidt (Blau nur Spans/CTAs/Marker), ekd-solar (Akzent in genau drei Rollen; einzige Akzent-Fläche ist die Illustration) |
| S9 (verbindlich) | Team-Grid als einheitliche Foto-Serie: gleiche Kleidung, gleicher Hintergrund, Rollen-Label, Namenskarte | elephant-solar, alpen-energie (12+ Porträts vor derselben Betonwand, gleiche Pose), jantronic (Rolle als Caps-Label, echtes Portrait) |
| S9-N (verbindlich) | Positivseite: Trust-Zahlen nur mit Quelle, Jahr und krummer Zahl, nie selbstgebaute Sterne | enpal, priwatt, ekd-solar |
| `P-CONTACT` (Katalog) | Do-Beleg G1: Frage-Funnel statt Formular als erster Schritt | alpen-energie, peter-at, enpal |
| S9-N (verbindlich) | Klasse-B-Nachtrag: das Dokument selbst statt des Siegels — TUEV-Zertifikat in Originalgroesse mit Registriernummer und Gueltigkeitsdatum, Bewertungs-Embed mit Klarnamen und Datum, Wertung mit Link auf die Plattform | cryptory (B), tradingfreaks (B), leadfluss (B), seo-labs (B), pangram (B) |
| S14 (Katalog) | Klasse-B-Nachtrag zur Gegenprobe: das Dreier-/Sechser-Muster ohne Icon-Karten loesen — Spalten mit Trennlinien, Karten mit eigener Kennzahl, Akkordeon, oder je Zahl ein eigenes Bildmittel | ploy-ai (B, viermal ohne Icon-Raster), tradingfreaks (B, sechs Zahlen mit je eigenem Bildmittel), seo-labs (B, Produkt-Mockup statt Line-Icon), leadfluss (B, Zickzack aus Text und Push-Mockup) |
| Layering-Familie (`../ui-layouts-catalog.md`) | Klasse-B-Nachtrag, **negativ**: 7 von 8 Studien fahren Sticky-/Parallax-/Karussell-Strecken ohne belegten Reduced-Motion-Opt-out. Das ist der haeufigste harte Befund der Serie und kein Geschmacksstreit | seo-labs (B), leadfluss (B, nicht erhoben), pangram (B), ploy-ai (B), lassie-ai (B), cryptory (B), tradingfreaks (B), matthias-aumann (B) |

## Spannungen — ehrlich notiert, kein Kandidat

- **elephant-solar** bekam GO trotz mehrerer dunkler Sektionen pro Seite (S3)
  und `P-CTA-MID` auf dunkler Fläche statt `surface` (S17). Zusätzlich Inter
  als Body (S7-Konflikt für House-Builds) und ein zweiter heller CTA im
  Hero-Fold.
- **enpal** bekam GO, obwohl Hero und Produkt-Bühnen 3D-Renders statt Fotos
  sind (S9-Spannung; die Menschen-Sektionen sind echt), zwei dunkle Bänder in
  Folge plus dunkler Produkt-Hero laufen (S3) und Poppins auf der
  S8-Sperrliste steht. Dazu Doppel-CTA im Produkt-Hero.
- **alpen-energie**: rote Ticker-Topbar als schmale Akzent-Vollfläche
  (S1-Lesart), `P-CTA-MID` auf dunklem Schiefer-Verlauf (S17). Die Seite ist
  eine `clone-parity`-Vorlage, dort gilt S18: die Live-Seite ist der Maßstab.

S3, S8, S9 und S17 bei der nächsten Synthese gegen weitere externe GO-Belege
prüfen, nicht still verwässern. Keiner dieser Punkte ist ein Kandidat, weil
keiner als Regel formuliert wurde — sie markieren, wo unser Regelbuch und
gestempelte Referenzen auseinanderlaufen.

**Klasse B, 02.09.2026 — S3 ist die Regel, die am haerstesten unter Druck
steht.** Sieben der acht neuen Studien verletzen die Ein-dunkle-Sektion-Grenze
oder ihr Farbflaechen-Pendant, und zwar nicht als Ausrutscher, sondern als
Rhythmus-Prinzip: seo-labs faehrt sechs dunkle Flaechen mit je eigenem Job,
matthias-aumann sechs dunkelgruene bis schwarze Sektionen, ploy-ai drei
Akzent-Panels in Folge plus dunklen Footer, pangram sechs Vollflaechenfarben,
cryptory zwei schwarze Flaechen in Folge, tradingfreaks mehrere dunkle Baender.
Genau ein Case haelt S3 sauber: leadfluss mit einer einzigen dunklen Sektion,
der letzten vor dem Footer. S4 steht aehnlich: seo-labs, tradingfreaks,
lassie-ai und ploy-ai fahren Pillen als Primaer-CTA, nur leadfluss faehrt
`--radius: 0rem`. Beides gehoert in die naechste Synthese, nicht in eine stille
Lockerung.

## Delta zu unseren House-Regeln

Basis der Punkte 1–5: die 5 House-Cases (`braun-services`, `swisshelp-elektro`,
`kraftwerk-garage`, `salsaflow`, `kita-wunderkiste`), `../stil-regeln.md`
und die 8 externen Case-Dateien der Klasse A mit vollem GO-Stamp. Punkt 6
kommt aus den 8 Klasse-B-Studien vom 02.09.2026 und ist deshalb schwaecher
belegt.

1. **Proof im Fold fehlt im Regelbuch.** 7 von 8 Referenzen ziehen
   Bewertungszahl, Siegel oder Partner-Logo in den 1440-Fold; unser Katalog
   kennt `P-PROOF-STRIP` nur als eigene Sektion unter dem Hero, und
   swisshelp verbietet Proof-Zahlen sogar ganz (House-Lock, dort ok — aber
   ein Proof-im-Fold-Slot existiert nirgends).
2. **Belegte Messwerte sind kein geregelter Inhaltstyp.** S9-N verbietet nur
   erfundene Zahlen; keine Regel fordert echte Messwerte. 6 von 8 Referenzen
   argumentieren mit kWp, Modulzahl, PLZ, Ersparnis-Summen oder krummen
   Bewertungszahlen inklusive Stand-Datum. `P-GALLERY`/`P-TESTIMONIAL`
   verlangen „echt", nicht „gemessen" — und keine Regel verlangt die Fußnote
   oder das Label, ohne das priwatt und ekd-solar ihre Zahlen nie zeigen.
3. **Unterseiten-Konsistenz ist ungeregelt.** 4 von 8 (elephant-solar,
   ekd-solar, farisschmidt, jantronic) standardisieren das Seiten-Opening als
   striktes Template über alle Routen; unser Katalog regelt nur
   Einzelsektionen, keine seitenübergreifende Template-Pflicht.
4. **Ergebnis-CTA statt Kontakt-CTA.** 4 von 8 (alpen-energie, ekd-solar,
   enpal, peter-at) führen wörtlich „(Jetzt) Ersparnis berechnen" als
   Primär-CTA — ein Rechner als Konversionsziel. Der Katalog kennt nur
   `P-CONTACT` (Formular); ein Rechner-/Ergebnis-Pattern fehlt.
   (Sektorlastig Solar — bei Übernahme als sektorspezifisch markieren.)
5. **Navigationslose Konversionsseite fehlt als Pattern.** 4 von 8
   (farisschmidt `/termin`, peter-at `/anfragen`, alpen-energie `/anfrage`,
   enpal Konfigurator) bauen eine eigene Route ohne Menü, die mit einer
   Auswahlfrage oder einem Kalender beginnt statt mit einem Datenfeld. Unser
   Katalog kennt nur `P-CONTACT` als Sektion innerhalb einer normalen Seite —
   weder die eigene Route noch das Weglassen der Navigation ist geregelt.
6. **Reduced-Motion ist geregelt, wird aber nirgends geliefert (Klasse B).**
   `../ui-layouts-catalog.md` verlangt fuer jede Layering-Familie einen
   Reduced-Motion-Beleg. In 7 von 8 Studien vom 02.09.2026 fehlt er:
   `prefers-reduced-motion` kommt gar nicht vor (tradingfreaks), nur als
   ungenutzte Tailwind-Utility (pangram), oder genau einmal in 358 kB CSS
   (ploy-ai). Der Katalog hat die Regel, die Referenzen haben sie nicht — das
   ist kein Grund, sie zu lockern, sondern der Grund, sie im eigenen Bau
   deterministisch zu pruefen statt sie von Referenzen abzulesen.
