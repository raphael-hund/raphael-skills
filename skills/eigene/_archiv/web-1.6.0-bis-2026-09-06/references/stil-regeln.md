# Stil-Regeln — Go's & No-Go's (lebendes Regelbuch)

**Pflicht-Load vor jeder Art-Direction** (Beschluss Raphael 30.08.2026).
Diese Datei ist die einzige Quelle für „wie eine geile Seite aussieht".
Wer eine Regel ändern will, braucht Belege in `muster-bibliothek/` — nie
ad hoc im Chat.

## Schema

| ID | Regel (1 Satz, imperativ) | Richtung | Status | Belege |
|---|---|---|---|---|
| S-xx | … | GO / NO-GO | kandidat / bestätigt / verbindlich | Case-Slug oder M-ID |

**Status-Logik:**
- **kandidat** — aus 1–2 Studien beobachtet.
- **bestätigt** — mindestens 3 konkordante Belege in der Muster-Bibliothek.
- **verbindlich** — von Raphael in einer `DESIGN.md` gelockt ODER durch einen
  deterministischen Check erzwungen (`craft-check.mjs` / `scan-ai-slop.mjs`).

**House-Lock-Regel (30.08.2026):** Was in einer Kunden-`DESIGN.md` steht, hat
Raphael gelockt. Solche Regeln starten sofort als **verbindlich**, nicht als
Kandidat. Ein Agent stuft eine gelockte Regel nie zurück.

**Richtung:** GO = so bauen · NO-GO = nie bauen.

**Präzedenz (Raphael 04.09.2026, MAKE-Neustart):** Die Kunden-`DESIGN.md`,
Raphaels Referenzbilder im Eingang und seine Worte in `DECISIONS.md` schlagen
jede S-Regel dieser Datei. Eine Regel, deren Belege nur aus Handwerk-Cases
stammen (S2, S3, S4, S8-Fontliste, S14), gilt im Sektor `agency-dark` und bei
`clone-parity` nicht als Sperre, sondern als Hinweis. Wer eine Referenz von
Raphael «wegregelt» (Typo-Hero statt Foto-Hero, all-sharp statt 20px-Karten,
eine dunkle Sektion statt dunkler Seite), baut am Auftrag vorbei — genau das
hat am 04.09.2026 zum «von null» geführt. Die Regeln sind Leitplanke, die
Referenz ist Ziel; bei Konflikt steht die Auflösung als Zeile in
`brand/DESIGN.md`, nicht als stiller Kompromiss im CSS.

---

## 1. Sektor-Dials (setzen VOR der Komponentenwahl)

Der erste Schritt jeder Art-Direction ist die Sektorwahl. Die Dials gewinnen
gegen die Baseline 8/6/4 aus `design/references/taste-kern.md`. Die Baseline
gilt für Premium-Editorial, nicht für Handwerk, Kita oder Ads-Landings.

| Sektor | VARIANCE | MOTION | DENSITY | Typische Cases |
|---|---|---|---|---|
| `handwerk-local` | 4 | 3 | 5 | braun-services, swisshelp-elektro, kraftwerk-garage |
| `kita` | 5 | 3 | 5 | kita-wunderkiste |
| `tanz-community` | 6 | 5 | 4 | salsaflow |
| `ads-lp` | 5 | 3 | 6 | — |
| `b2b-dienst` | 4 | 2 | 5 | — |
| `agency-dark` | 7 | 5 | 5 | make-marketing-clone, leadfluss, seo-labs (dunkle Agentur-Landing: Foto-Hero, 20px-Karten mit Hairline, ein Glow-Akzent, Carousel/Bento erlaubt) |
| `clone-parity` | match live | match live | match live | alpenenergie; Default bei «Look der Live-Seite weiterbauen» |
| Fallback (unbekannter Sektor) | 4 | 3 | 5 | nur wenn weder `DESIGN.md` noch Live-Seite noch Referenz einen Sektor hergibt; eine Zeile Begründung in `brand/DESIGN.md`. MAKE selbst ist `agency-dark`, nie Fallback. |

`clone-parity` heisst: Die Dials kommen aus der gemessenen Live-Seite, nicht
aus einer Baseline. Ein Clone-Auftrag ist kein Redesign-Auftrag.

Die Regel dazu ist **S15** und ist verbindlich.

---

## 2. Go's

| ID | Regel | Status | Belege |
|---|---|---|---|
| S1 | Nutze genau eine Akzentfarbe und nie als Vollfläche; Ausnahme die eine Schlusssektion nach S3 (`P-CTA-END`). | verbindlich | swisshelp-elektro, salsaflow, kraftwerk-garage, braun-services |
| S2 | Setze eine Karte nur dort, wo gleich hohe Dinge verglichen werden; sonst tragen offene Raster, Bildflächen, Linien und Typografie. Scope: nicht `agency-dark` (dort sind Karten mit Hairline der Stil). | verbindlich (handwerk-local, kita, b2b-dienst) | braun-services, salsaflow |
| S3 | Erlaube pro Seite höchstens eine dunkle Sektion und eine Akzent-Schlusssektion. Scope: nur helle Seiten; bei `theme: dark` in `DESIGN.md` gilt stattdessen: höchstens zwei helle Breaks. | verbindlich (helle Sektoren) | braun-services, swisshelp-elektro |
| S5 | Lege über ein Foto-Hero einen Zonen-Verlauf in der Grundfarbe, der nur eine Zone verdunkelt. | verbindlich | braun-services |
| S6 | Animiere einmalig beim Eintritt, danach ist Ruhe. | verbindlich | braun-services, salsaflow |
| S9 | Verwende echte Fotos von echten Menschen. | verbindlich | swisshelp-elektro, salsaflow, kita-wunderkiste, braun-services |
| S10 | Setze genau eine H1 pro Seite. | verbindlich | swisshelp-elektro |
| S15 | Setze die Sektor-Dials VOR der Komponentenwahl; die taste-kern-Baseline 8/6/4 gilt im Site-Build nicht. | verbindlich | Raphael 30.08.2026 |
| S16 | Gib jeder Sektion eine Pattern-ID aus dem Katalog in §4 und schreibe sie in `art-direction.md`. | verbindlich | Raphael 30.08.2026 |
| S17 | Halte ein mittleres Aktionsband ruhig: die Fläche bleibt `surface`, nur die Aktion trägt Farbe. | kandidat | braun-services |
| S18 | Nimm bei einem Clone-Auftrag die Dials aus der gemessenen Live-Seite. | verbindlich | alpenenergie |
| S19 | Schreibe jede Headline (H1/H2) SEO-direkt und scannbar: Sie nennt Leistung, Keyword und Kernaussage selbst — keine Poesie. Der Eyebrow trägt nie die Kernbotschaft; er ist höchstens ein kurzes Kontext-Label und darf ersatzlos entfallen. Test: Eyebrow abdecken — die Headline muss allein verständlich bleiben. | verbindlich | Raphael 01.09.2026 |
| S20 | Definiere pro Site genau sechs sichtbare Typo-Stufen als Tokens (H1/H2/H3/Body 1/Body 2/Label) und ziehe sie sitewide durch. Zwei H2 derselben Ebene rendern nie in verschiedener Größe; Semantik-Hierarchie und Sicht-Hierarchie decken sich. | verbindlich | Raphael 01.09.2026 (braun-services) |
| S21 | KI-generierte oder KI-regenerierte Motive werden auf der Seite nicht als KI gekennzeichnet und nicht verteidigt („Keine Bildagentur"-Sätze sind No-Go, M1). Gesichter dürfen KI-generiert werden, aber ausschließlich referenzbasiert auf echten Fotos der echten Person — nie frei erfunden. S9 (echte Menschen) bleibt der Maßstab fürs Motiv. | verbindlich | Raphael 01.09.2026 (braun-services) |
| S22 | Entscheide Detailfragen ohne Geschäftsgewicht (Zahlenformat einer Bewertung, URL-/Preview-Wahl, Anzeigevariante) selbst per Default und nenne sie im Abschluss. An Raphael gehen nur Geschmack am Screenshot, Geld, Kundenkontakt und Irreversibles. | verbindlich | Raphael 01.09.2026 („Das ist mir im Webdesign-Skill scheißegal") |
| S23 | Prüfe jede Typo-Stufe am gerenderten Bild, nicht am Token: Zwei Stufen, die sich um weniger als ~20 Prozent Schriftgrösse unterscheiden, sind für den Betrachter EINE Stufe. Eine Seite entscheidet sich pro Ebene für eine Lautstärke und mischt nicht. | verbindlich | braun-services 01.09.2026 (gemessen: H2 34px gegen H3 32px = keine Hierarchie) |
| S24 | Gib einem beschriftungslosen Icon-Ziel nie die volle Signalfarbe der Hauptaktion; es braucht Umriss oder eigenen Grund, sonst verschwindet das Icon. Icons in Buttons mit fester Breite und ohne Innenabstand tragen `shrink-0`. | verbindlich | braun-services 01.09.2026 (gemessen: svgBox 0x20 bei korrekter Farbe) |
| S25 | Behandle Token-Aliase nicht als Flächenstufen: Wenn zwei Namen auf denselben Farbwert zeigen, erzeugt ihr Wechsel keinen sichtbaren Wechsel. Vor dem Rhythmus-Entwurf die tatsächlich verschiedenen Werte zählen. | verbindlich | braun-services 01.09.2026 (--surface = --paper, --surface-deep = --warm-grey) |

### Belegstellen im Fliesstext

- **S1** — `/root/clients/swisshelp/DESIGN.md:25` „Rot ist Akzent, nie
  Vollfläche. Keine zweite Akzentfarbe." Gleichlautend
  `/root/clients/salsaflow/DESIGN.md:41` („nie als Deko-Fläche, ~90/10") und
  `/root/clients/kraftwerk/DESIGN.md:56` („Rot ist Signal, nie Fläche").
- **S2** — `/root/clients/braun-services/DESIGN.md:26` „Karten sind nicht das
  Standardmuster." Erlaubt sind dort genau drei Stellen: zwei Leistungen, drei
  Kundenstimmen, Kombi-Matrix.
- **S3** — `/root/clients/braun-services/DESIGN.md:30` „Pro Seite höchstens
  eine dunkle Sektion und eine vollorange Schlusssektion."
- **S5** — `/root/clients/braun-services/DESIGN.md:76` „Das ist kein Wash. Ein
  Wash färbt das Motiv. Diese Verläufe verdunkeln nur eine Zone in der
  Grundfarbe."
- **S6** — `/root/clients/braun-services/DESIGN.md:57` „genau EINMALIGE
  Entrance-Animationen … Danach ist Ruhe."
- **S10** — `/root/clients/swisshelp/DESIGN.md:50` „Pro Seite genau EINE `.h1`."
- **S17** — `/root/clients/braun-services/DESIGN.md:34` „Das mittlere Band
  bleibt ruhig: Die Aktion trägt Orange, nicht die Fläche."
- **S19** — Raphael 01.09.2026 (Feedback-Pfad): „Die Headline soll eher immer
  SEO-direkt statt Poesie sein … Das Problem ist meistens, dass die Eyebrows
  das, was scannbar ist, machen." Wiederkehrendes Fehlerbild: Kernbotschaft
  wandert in den Eyebrow, die H1 bleibt vage.

---

## 3. No-Go's

| ID | Regel | Status | Belege |
|---|---|---|---|
| S4 | Baue den Primär-CTA nie als Pille. Radius bis 12px ist keine Pille; `DESIGN.md` lockt den Wert. | verbindlich | braun-services, kraftwerk-garage, swisshelp-elektro · **Ausnahme:** salsaflow |
| S5-N | Lege nie einen Wash, eine OKLAB-Staffel, einen `color-mix`-Verlauf oder einen orangen Farbschleier über ein Foto. | verbindlich | braun-services |
| S6-N | Baue kein WebGL, keine Partikel, keinen Ken-Burns-Loop, keinen Scroll-Scrub und kein Mesh-/Liquid-Glass ohne DESIGN-Token. | verbindlich | braun-services |
| S7 | Setze Inter nie als Display- oder Default-Landingfont. | verbindlich | salsaflow · **Body-Ausnahme:** kraftwerk-garage |
| S8 | Verwende keine der gesperrten Fonts (Liste unten) als Modell-Default. Scope: eine Kunden-`DESIGN.md` mit gelockter Schrift hebt die Sperre für diese Marke auf (MAKE: Poppins/Outfit). | verbindlich (nur ohne DESIGN.md-Lock) | salsaflow |
| S9-N | Generiere keine KI-Personen und zeige keine Fake-Sterne oder erfundenen Bewertungszahlen. | verbindlich | kraftwerk-garage, swisshelp-elektro, salsaflow, braun-services |
| S11 | Nummeriere nicht mit 01/02/03-Markern, ausser es ist eine echte Sequenz. | kandidat | kraftwerk-garage |
| S12 | Baue keinen Cream-plus-`#F4F1EA`-plus-Serif-plus-Terracotta-Default, kein near-black-plus-acid-green und keinen Purple-/Indigo-Gradient. | verbindlich | kraftwerk-garage |
| S13 | Zeige dasselbe Bildmotiv nie in zwei aufeinanderfolgenden Sektionen. | verbindlich | braun-services, salsaflow |
| S14 | Baue keine generische Card-Soup aus drei Icon-Karten als Default-Raster. Scope: greift nicht, wenn die Kunden-Live-Seite oder Raphaels Referenz genau dieses Muster zeigt (`clone-parity`, `agency-dark`). | kandidat | salsaflow, braun-services |

### Belegstellen im Fliesstext

- **S4** — `/root/clients/braun-services/DESIGN.md:37` „Pillenform ist nur für
  Marker … Eine Hauptaktion trägt nie Pillenform."
  `/root/clients/kraftwerk/DESIGN.md:68` „Buttons `4px`. Keine Pillen, keine
  Blobs." `/root/clients/swisshelp/DESIGN.md:69` „keine runden Ecken (scharf,
  wie heute)".
  **Einzige Ausnahme:** `/root/clients/salsaflow/DESIGN.md:85` lockt
  ausdrücklich „Primary-CTA: roter Pill (`bg-salsa`)". Eine Pille ist nur dort
  erlaubt, wo eine `DESIGN.md` sie für Buttons explizit lockt.
- **S5-N** — `/root/clients/braun-services/DESIGN.md:78` „Weiterhin verboten:
  OKLAB-Staffel, soft photo blend, `color-mix`-Verlauf und jeder orange Wash
  über einem Foto. Sitewide."
- **S6-N** — `/root/clients/braun-services/DESIGN.md:61` „Keine dauernden
  Animationen, keine Ken-Burns-Loops, kein Scroll-Scrub und kein WebGL."
- **S7** — `/root/clients/salsaflow/DESIGN.md:23` führt Inter auf der
  `banned`-Liste. **Body-Ausnahme:** `/root/clients/kraftwerk/DESIGN.md:62`
  lockt „Body/UI: Inter 400/500/600". Inter als Body ist damit nur bei
  Kraftwerk zulässig, nie als Display und nie als Default für eine neue Landing.
- **S8** — gesperrte Fonts, Quelle `/root/clients/salsaflow/DESIGN.md:23`
  plus Display-Sperre aus S7:
  Inter (als Default/Display), Plus Jakarta Sans, Geist, Manrope, Poppins, Outfit,
  DM Sans, Satoshi, Montserrat, Roboto, Fraunces, Instrument Serif,
  Hanken Grotesk. Body nur Kraftwerk, siehe S7. **Eine Kunden-`DESIGN.md`
  hebt die Sperre für ihre Marke auf** (MAKE: Poppins Body Raphael 19.08.,
  Outfit 04.09.); die Liste sperrt Modell-Defaults, nicht Markenentscheide.
- **S9-N** — `/root/clients/kraftwerk/DESIGN.md:36` „Keine erfundenen
  Bewertungszahlen … keine Fake-Sterne mit Zahl."
  `/root/clients/swisshelp/DESIGN.md:123` „Personen: immer echtes Foto … nie
  KI." `/root/clients/salsaflow/DESIGN.md:91` „Menschen nie KI-from-scratch."
- **S12** — `/root/clients/kraftwerk/DESIGN.md:76` verbietet „generische
  Purple/Blue-Gradients", Gradient-Text und Glassmorphism. Die drei genannten
  Paletten sind die Standard-Ausgabe eines improvisierenden Modells und
  deshalb hier komplett gesperrt.
- **S13** — `/root/clients/braun-services/DESIGN.md:103` „Zwei Sektionen
  direkt untereinander zeigen nie dasselbe Motiv."
  `/root/clients/salsaflow/DESIGN.md:93` „Kein Bild auf derselben Seite
  doppelt."
- **S14** — `/root/clients/salsaflow/DESIGN.md:111` „keine generische
  Card-Soup"; `/root/clients/salsaflow/DESIGN.md:87` „Karten brauchen einen
  Job".

---

## 4. Sektionen-Katalog (freigegebene Varianten)

Jede gebaute Sektion trägt eine dieser IDs. Steht keine ID dran, ist die
Sektion improvisiert und fällt in QA durch (S16).

| ID | Was es ist | Do | Don't |
|---|---|---|---|
| `P-HERO-PHOTO` | Vollflächiges Foto, Text links, genau ein Primär-CTA im Fold | Zonen-Verlauf in der Grundfarbe für die Lesbarkeit der Textspalte legen. | Kein Wash über dem Motiv, kein zweiter gefüllter CTA im Fold. |
| `P-HERO-SPLIT` | Links Fläche, rechts Bildspalte | Nur bauen, wenn die `DESIGN.md` den Split ausdrücklich lockt. | Der BRAUN-Split vom 11.08.2026 ist ÜBERHOLT und wird nie als Vorbild zitiert. |
| `P-PROOF-STRIP` | Trust, Logos, echte Reviews als schmale Leiste | Original-Bildmarken nutzen (Google-G, Siegel, Partner-Logo als SVG). | Keine Fake-Zahlen, keine selbstgebauten Buchstaben-Kacheln als Quellenzeichen. |
| `P-OFFER-PAIR` | Zwei gleich hohe Leistungskarten | Zwei gleichwertige Einstiege gleich hoch stellen. | Nicht drei generische Icon-Karten daraus machen. |
| `P-PROCESS-3` | Drei Schritte | Nur bei echtem Prozess mit echter Reihenfolge. | Keine 01/02/03-Marker auf einer Liste ohne Sequenz (S11). |
| `P-GALLERY` | Bildstrecke | Echte Fotos, einheitlicher Crop, ein Bildstil. | Kein Motiv, das die Nachbarsektion schon zeigt (S13). |
| `P-FAQ` | Akkordeon | Echte Fragen aus den FAQ-Quadranten, Volltext im HTML. | Keine erfundenen Fragen als SEO-Füllung. |
| `P-CTA-MID` | Ruhiges Aktionsband in der Seitenmitte | Fläche `surface`, nur die Aktion trägt Farbe (S17). | Die Fläche nie in voller Akzentfarbe. |
| `P-CTA-END` | Eine Akzent-Schlusssektion | Genau eine pro Seite, am Ende. | Nicht zusätzlich zu einer zweiten Akzentfläche (S3). |
| `P-CONTACT` | Formular plus Kontaktdaten | Mikro-Commitments zuerst, Kontaktdaten zuletzt (G1). | Nie E-Mail als erstes Feld. |
| `P-PRICE` | Preise / Pakete | Klaren Preis einer echten Leistung gegenüberstellen. | Keine Fake-Rabatte, keine drei Icon-Pakete als Default. |
| `P-TEAM` | Team / Gesichter | Echte Fotos echter Menschen (S9). | Keine KI-Personen, keine Stock-Gesichter. |
| `P-MAP` | Karte / Einzugsgebiet | Echte Adresse oder klarer Radius, nutzbar. | Keine dekorative Karte ohne Adresse. |
| `P-TESTIMONIAL` | Kundenstimmen | Echte Namen, echte Fotos, echte Zitate. | Keine Fake-Sterne, keine erfundenen Bewertungszahlen (S9-N). |

Fehlt eine ID, nimm die nächstliegende und schreibe die Lücke in `art-direction.md` — nicht frei erfinden.

---

## 5. Checkbare Regeln → deterministische Gates

Jede NO-GO-Regel, die maschinell prüfbar ist, bekommt einen Detektor in
`scripts/craft-check.mjs` (gerendertes DOM) oder
`design/scripts/scan-ai-slop.mjs` (Quelltext) plus einen Eval unter `evals/`.
Eine Regel mit Detektor ist automatisch **verbindlich** und kann nicht mehr
still verwässern — Änderung nur über Beleg plus PR.

**Ein DOM-Check beweist Existenz, nicht Sichtbarkeit** (Beleg braun-services
01.09.2026). Ein Element kann im DOM stehen, die richtige Farbe tragen,
`opacity: 1` und `visibility: visible` melden — und trotzdem null Pixel breit
sein. Wo ein Kritiker am Bild etwas meldet, das die Messung nicht bestätigt,
misst meist die Messung am falschen Ort. Geometrie (`getBoundingClientRect`)
gehört zu jeder Sichtbarkeitsprüfung dazu.

**Ein Code-Kommentar ist keine Prüfung.** Im selben Fall trug der erste Fix den
Kommentar „das Icon bleibt orange auf Papier", geschrieben ohne Blick auf ein
gerendertes Bild. Ein Kritiker meldete die Behauptung als eigenen Befund — zu
Recht: Wer sie liest, hält die Stelle für erledigt.

Kandidaten für einen Detektor, noch nicht gebaut (baut ein anderer Worker):
S3 (Zahl dunkler Sektionen), S4 (`border-radius: 9999px` auf Primär-CTA),
S7/S8 (Font-Familie im Quelltext), S10 (H1-Zahl), S13 (doppelter `src` in
Folge-Sektionen), S16 (Pattern-ID pro Sektion in `art-direction.md`),
S23 (Grössenabstand benachbarter Typo-Stufen im gerenderten DOM),
S25 (Token-Aliase, die auf denselben Farbwert zeigen).

---

## 6. Externe Kandidaten (ungestempelt)

Diese Zeilen sind bewusst leer. Der Skill erfindet keine Fremd-URLs. Raphael
legt URL oder Screenshot in `/root/eingang`; erst dann füllt ein Agent die
Zeile und legt eine Case-Datei an.

| # | Sektor | Quelle | Raphael-Urteil |
|---|---|---|---|
| E1 | handwerk-local | Raphael legt URL/Screenshot in /root/eingang | offen |
| E2 | handwerk-local | Raphael legt URL/Screenshot in /root/eingang | offen |
| E3 | kita | Raphael legt URL/Screenshot in /root/eingang | offen |
| E4 | tanz-community | Raphael legt URL/Screenshot in /root/eingang | offen |
| E5 | ads-lp | Raphael legt URL/Screenshot in /root/eingang | offen |
| E6 | ads-lp | Raphael legt URL/Screenshot in /root/eingang | offen |
| E7 | b2b-dienst | Raphael legt URL/Screenshot in /root/eingang | offen |
| E8 | b2b-dienst | Raphael legt URL/Screenshot in /root/eingang | offen |
