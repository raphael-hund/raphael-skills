# QA-Fächer (parallel, Schwarm gemischt)

**Kunden-Vorschau (G1):** nur Fach 2 visuell — frische Shots plus
`node /root/raphael-skills/skills/design/scripts/detect.mjs <dateien>` = Exit 0.
Ablauf, Sitemap, Idee und Design blocken; Fakten-Nits parken als FAKT-GATE.
Lighthouse/axe, Copy-G2 und Proof-Wahrheit sind ausschließlich Launch-Gates.

Sechs Fächer: 1–4 parallel (gemischte Modellfamilien), danach 5 SEO und 6 Trust
(können parallel zueinander laufen, brauchen aber fertige Routes/Content) für den
Launch. G1 zuerst, dann fachlicher G2-Blick. Rollen: `agent-roster.md`.
AAA-Raster: `agentur-rubrik.md`.

## Drei Freigabedimensionen (getrennt, nicht verrechenbar)

| Dimension | Eigenständiger PASS-Beleg |
|---|---|
| **Visuell** | Kanonischer Screenshot-Sweep, PNG-Read durch Kritik-Leaves, Kritik-Loop und bei Ship das terminale `visual-aaa`-Manifest. |
| **Funktional** | Feste Nutzeraufgaben bestehen; Route×Viewport×Target×State-Matrix und target-lokale A11y sind vollständig; Formulare, Links und Recovery-Pfade funktionieren. |
| **Regression** | Vorher/Nachher gegen denselben Auftrag und dieselbe Build-Revision; nur verlangter Scope geändert, alle geänderten und betroffenen Nachbarrouten erneut geprüft. |

Gesamt-PASS gibt es nur bei **Visuell PASS**, **Funktional PASS** und
**Regression PASS**. Keine Dimension darf eine andere aufrechnen: Eine attraktive Seite mit
kaputtem Formular bleibt funktional rot; ein technisch grüner Flow mit sichtbarer
Qualitätslücke bleibt visuell rot; eine gute lokale Änderung mit Nebenänderungen
an Navigation, Tokens oder anderen Routen bleibt Regression rot. Ein neuer Build
invalidiert ältere Sweep-, G1- und Ship-Receipts.

## Web-G1: Basis und Receipt-Identität explizit

```bash
node /root/raphael-skills/skills/eigene/web/scripts/g1-gate.mjs \
  --base <echte-dev-oder-live-url> --routes <route1,route2> \
  --src <projekt-root> --build <build-root> --out <run-out>/g1 \
  --run-id <run-id> --build-revision <revision>
```

`--base`, `--run-id` und `--build-revision` sind Pflicht; kein stiller Host-/Port-
Default und kein anonymer Bericht. Fehlend = Aufruffehler/Exit 2 vor Browserstart.
Der Bericht `web/g1-report/v2`, das Manifest `web/shot-sweep/v2` und
`run-evidence.json` müssen dieselbe Run-ID, Build-Revision und Basis tragen.
G1 startet den kanonischen Sweep mit `--static --states --mobile` und lehnt ein
Manifest mit abweichendem `capture_profile`, fehlender Mobile-Route, unvollständiger
State-Matrix oder Hover-only-Evidence ab.

## Motion-Freigabe (erst nach stabilem Basisstand)

Motion-Polish beginnt erst, wenn der **statische Basisstand PASS** und die
**funktionale Dimension PASS** auf derselben Build-Revision sind. Erst danach
zählen Motion-Belege: reale Eingabe und Timing, ein eigener Reduced-Motion-Pass
sowie Lifecycle-Prüfung für Fresh Load, Hard Reload, Back/Forward, Resize und
Unterbrechung mit Recovery. Motion ist eine zusätzliche Prüfung; sie repariert
kein rotes statisches, funktionales oder Regression-Gate.

**AI-Slop-Sequenz (fest, kein optionaler Zusatzschritt):** design ZUERST (Fach 2, `detect.mjs`
Exit 0 **und** `scan-ai-slop.mjs` mit 0 Treffern — der Scanner endet IMMER mit Exit 0,
auch bei Funden, deshalb zaehlt bei ihm die Trefferzahl aus dem `--json`-Feld `hits`,
nie sein Exit-Code; nachgemessen 02.08.2026) → **danach copywriting G1→G2** auf denselben Seiten (Fach 1,
Voice/Floskel-Check). Siehe SKILL.md "Look & QA".

## Fach 1 — Conversion
- Ein klares Ziel je Seite? CTA über dem Fold + wiederholt? Landing = eine Aktion
  (kein Menü/Blog), Formular direkt eingebettet statt hinter einer Button-Seite.
- Value Proposition in < 5 Sek erfassbar? Proof (Zahlen/Logos/Testimonials belegt)?
- Reibung raus: Formularfelder minimal, Einwände vorweggenommen.

### Harte QA-Regeln Formular (G1, blockieren den Launch)

**Zuerst der Prüfer, dann der Blick.** `node scripts/formular-check.mjs --url <url>`
(im G1-Tor enthalten) misst, was messbar ist: falscher `input-type` (F1, BLOCK),
Einfüge-Sperre (F3, BLOCK), fehlendes `autocomplete` (F2), Feldhöhe (F4),
iOS-Zoom bei Schrift unter 16px (F5), Kontaktdaten zu früh (F6), Absende-Knopf
(F7). **Die Lücke war real:** axe und craft-check ließen ein E-Mail-Feld mit
`type="text"` beide durch (gemessen 29.07.) — das kostet auf einer Landingpage
mehr Leads als jeder Kontrastfehler, den beide zuverlässig finden.

Was das Skript **nicht** kann, bleibt Handarbeit: es liest Feldnamen, nicht die
Fragen dahinter. F6 erkennt „E-Mail steht vor einer Sachfrage", aber nicht, ob
die Sachfrage überhaupt qualifiziert.

- **Reihenfolge = Mikro-Commitments, Kontaktdaten IMMER zuletzt:** Identifikation
  ("Welche Beschreibung passt zu dir?") → Qualifizierung (Branche, Team-Größe,
  **Website-URL** statt Firmenname) → **erst zuletzt** Kontaktdaten (Name → E-Mail →
  Telefon). Kontaktdaten nie als erste Frage. *Beleg: Kontaktdaten nach vorne gezogen →
  Conversion brach ein; zurück ans Ende → Conversion vervierfacht.*
- **Drop-off pro Slide messen:** Conversion jedes einzelnen Slides tracken, Ausreißer-Frage
  finden und fixen. *Beleg: offene Frage → ~40 % Drop-off auf Slide 3; ein URL-Freitextfeld
  27 % Drop-off vs. 3–4 % sonst.*
- **Offene Textfelder ersetzen:** sobald die häufigsten Antworten bekannt sind, Freitext →
  Radio-Select (springt automatisch weiter; weniger Tipp-Reibung als Checkbox).

### Harte QA-Regel Thank-You-/Zwischenseiten (G1)
- **Vor dem letzten Schritt KEIN Abschluss-Wording** ("Danke", "Glückwunsch", "Geschafft") —
  das schließt die Schleife im Kopf, der Nutzer schließt den Tab. Stattdessen "Fast geschafft"/
  "Letzter Schritt" + Fortschrittsanzeige. *Beleg: ein 1,5-s-Ladescreen mit "Thank you" zwischen
  zwei Schritten reichte zum Abbruch; Fix "Please wait".*
- Danach zuerst eine Identitätsaussage zum Zustimmen, dann No-Show-/No-BS-Policy
  (Konsistenzprinzip). *Beleg: ein Identitäts-Textblock hob die Show-Rate 60 % → ~75 %.*

### Testimonial-Check
- Video oder echter Screenshot (voller Name/Handle) statt Fließtext; nach **Identität/Branche**
  gelabelt; Video-Schnitt **Hook-first** (stärkster Moment zuerst, nicht die Vorstellung).
- **Menge NICHT wegkürzen** — Volumen ist der Beweis. *Beleg: Reduktion auf die 4 größten
  halbierte die Conversion.*

## Fach 2 — Design (→ design)
- G1: `node /root/raphael-skills/skills/design/scripts/detect.mjs <dateien>` = Exit 0
  **und** `node /root/raphael-skills/skills/design/scripts/scan-ai-slop.mjs <projekt-root> --rules=/root/raphael-skills/skills/design/scripts/rules.de.mjs`
  triagiert (keine offenen P0-Slop-Funde). Niemals `npx impeccable detect` — das
  trifft die unpatchte npm-Version, nicht die lokalen Regeln. Den Scanner nicht
  über Skill `kill-ai-slop` extra laden — er sitzt in design.
- Visuelle Hierarchie, Kontrast, Rhythmus/Spacing, konsistente Tokens.
- Landing → taste-Kern + `lexlin-design-prinzipien.md` / `damien-design-methodik.md`;
  App/Dashboard → ui-ux-DB.
- Premium/Ship: Screenshot-Kritik-Loop inkl. **Blind-A/B** (`screenshot-kritik-loop.md`
  Schritt 3b) und Stichprobe gegen `agentur-rubrik.md` Visual-Zeilen.
- Immer ZUERST vor Fach 1 Voice-/Floskel-Check laufen lassen (siehe AI-Slop-Sequenz oben).

### Grafik-Assets-Gate
Greift, sobald Freisteller, Layer-Stapel oder eigene Hintergrund-Grafiken im Spiel sind.
Pass nur, wenn alle fünf Punkte stimmen:
- **(A) Kanten sauber:** Alpha ohne Halo/Restrand, Motiv nirgends angeschnitten — Köpfe
  von Personen niemals (harte Regel, Personen-Crops immer per Screenshot prüfen).
- **(B) Trim eng:** links/rechts endet das Bild am letzten Motiv-Pixel (Alpha-Trim);
  oben/unten ist bewusster Raum für Schatten/optische Balance erlaubt (siehe
  `bildgenerierung.md`, Abschnitt "freistellen + eng zuschneiden"). Abstand kommt aus
  dem CSS, nie aus dem Bild.
- **(C) Layer logisch:** Überdeckungsreihenfolge nachvollziehbar, `z-index`-Stufen in
  `art-direction.md` des Projekts dokumentiert.
- **(D) Mobile-Fallback da:** statische Variante oder Poster für Reduced-Motion vorhanden.
- **(E) Screenshot nach Einbau:** Asset im echten Web-Kontext sichtbar, kein Broken Image,
  Farben stimmen mit der Quelle überein.
- **(F) Raphael-Nein:** Root-`DESIGN.md` Teil D und `DECISIONS.md` nennen keine
  Sperre, die dieses Asset oder diesen Dateipfad auf dieser Route verbietet.
  `rg` auf den gesperrten Pfad in der Seiten-Copy und im Hero liefert 0 Treffer.

Fail = ein Punkt offen → zurück in den Bildgenerierungs-/Freisteller-Schritt, nicht im
Layout nachbessern. (F) rot = kein Ship, auch wenn (A)–(E) grün sind.

## Fach 3 — A11y
- **Launch-Fach:** G1: axe = 0 Fehler (hart; nicht Vorschau). Farbkontrast AA,
  Fokus-Reihenfolge, Alt-Texte, Labels.
- Tastatur-Navigation vollständig, ARIA korrekt (nicht überladen).
- **Target-lokal statt Seitenpauschale:** Für jeden Schlüssel aus
  `Route × Viewport × Target × State` enthält der Capture-Beleg die echte
  Tastatursequenz, den erwarteten und tatsächlichen Fokus, Rolle + Accessible
  Name, ARIA-/Live-Region-Ergebnis, Escape-/Recovery-Pfad und Axe auf dem DOM
  **nach** dem Übergang. Ein globaler Axe-Lauf oder ein Shot eines anderen
  Buttons deckt dieses Target nicht ab.
- Fokus-, Open/Expanded-, Loading-, Empty-, Error- und Success-Zustände bleiben
  funktional rot, wenn Setup, Fokusassert, ARIA-State, Live-Region oder Recovery
  fehlschlägt — auch bei visuell korrektem Screenshot.

## Fach 4 — Technik
- **Launch-Fach:** G1: Lighthouse = 0 Fehler (Performance/Best-Practices/SEO;
  nicht Vorschau), Link-Check, HTML-validate.
- Meta/OG/Schema vorhanden, Canonical korrekt, keine Broken Links, responsive.
- **G1 Werkzeug-Gate (hart):** `node /root/raphael-skills/skills/eigene/web/scripts/werkzeug-gate.mjs <projekt> --tabelle
  <pfad>/art-direction.md` = Exit 0. Prueft deterministisch: genau EIN Icon-System,
  null `framer-motion`-Importe (vendorierte Komponenten nutzen `motion/react`),
  `useReducedMotion` in jeder animierenden Datei, keine Dependency ohne Zeile in
  der Werkzeugtabelle aus Schritt 5d. Rot = kein Launch, wie jedes andere G1-Fach.
  "Router wurde gelesen" ist keine gueltige Antwort auf dieses Gate.
- **G1 anti-slop (hart, nur Custom-TS/JS):** Plugin im Repo, `npx oxlint` Exit 0.
  Richtet Skill `install-anti-slop` ein. Detail und Regel-Liste:
  `code-qualitaets-checkliste.md`. Kein Ersatz für `scan-ai-slop.mjs` (das ist
  Text/Markup in Fach 2). CMS-only ohne eigene `.ts`/`.js` = nicht anwenden.

## Fach 5 — SEO
- G1: pro indexierbarer Route unique title (≤60), meta (≤160), clean slug, genau eine H1,
  Canonical, keine Broken Links (Teil von Lighthouse/HTML-Scan = 0 Fehler).
- G1 Index: Marketing-Routen liefern crawlbaren HTML-Inhalt (SSR/SSG/Prerender) — reines
  Client-Empty-Shell ohne Inhalt = Fail.
- G2: `seo`-Skill (Loop 4) ziehen wenn Content-Seiten/Blog/Local — Keyword-Intent,
  Information-Gain, Schema-Tiefe; nicht nur Lighthouse-SEO-Subscore.
- Checkliste: `agentur-rubrik.md` Zeilen 11–17. Fail → kein Launch für öffentliche URLs.

## Fach 6 — Trust

**Launch-only.** Eine Kunden-Vorschau darf mit Fach 6 rot raus (offene Zahlen,
Domain, Platzhalter-Reviews), solange Fach 2 visuell sitzt und Ablauf/Sitemap/Idee
stehen. Inhalt ist ein Swap. Launch: kein erfundener Proof als echt.

- G1: Impressum + Datenschutz erreichbar und vollständig (DE); 404-Route gebrandet,
  Status 404, `noindex`, klarer Rückweg.
- G1 Proof: jede sichtbare Zahl/Logo/Testimonial ist in `PROOF.md`/Dossier belegt —
  erfundene Claims = Fail (nicht „später belegen“). Unklare echte Zahl
  (50 vs 60 Reviews, 24 vs 28h) = FAKT-GATE bis Launch, kein Erfinden.
- G2: Testimonials Video/Screenshot+Identität (Fach-1-Regeln); keine KI-Personen in
  Beweis-Kontexten ohne Raphael-Freigabe; Partner-Logos nur freigegeben; Consent vor
  nicht-essentiellem Tracking wo nötig (`security-audit-playbook.md`).
- Checkliste: `agentur-rubrik.md` Zeilen 18–25. Fail → kein Launch (wie Fach 5).

## Optional — Persona-QA
Je eine Perspektive: Beginner · Engineer · Business-Owner. Findet Blindstellen, die die
Fach-QA übersieht. Kein Gate, nur Zusatzsignal.

## Regel
Kein Launch, solange ein G1-Fach (1–6) rot ist. Findings → `client-<name>/wiki/qa-<datum>.md`.
Kunden-Vorschau: Fach 2 rot = nicht zeigen. Fach 6 Trust-Zahlen und Custom-Domain
sind kein Vorschau-Blocker.


## Kontexttiefe: Prosa gegen Stichpunkte (Fach 5, hart)

Eine Seite kann jedes SEO-Gate bestehen und trotzdem dünn wirken. Der Unterschied
zwischen einer tragenden und einer dünnen Seite ist **nicht die Wortzahl**, sondern
das Verhältnis erklärender Absätze zu Listenpunkten.

Gemessener Referenzmaßstab (acht Weltklasse-Seiten, 01.09.2026):

| | Absätze ab 25 Wörtern |
|---|---|
| inhaltlich tragende Seiten | 17–170 |
| dünne Seiten | 0–7 |

**Messung** (auf dem gerenderten Build, nicht auf der Quelle):

```bash
python3 - <<'EOF'
import re,glob
def txt(s): return ' '.join(re.sub(r'<[^>]+>',' ',s).split())
for f in sorted(glob.glob('dist/*/index.html')):
    h=open(f,encoding='utf-8').read()
    m=re.search(r'<main.*?</main>',h,re.S); body=m.group(0) if m else h
    ps=[len(txt(p).split()) for p in re.findall(r'<p[^>]*>(.*?)</p>',body,re.S)]
    print(f.split('/')[1], sum(1 for w in ps if w>=25), len(re.findall(r'<li',body)))
EOF
```

**Kontextlücke** = H2-Sektion mit mindestens 4 Listenpunkten und **keinem** Absatz ab
25 Wörtern. Jede solche Sektion bekommt einen Einleitungsabsatz von 45–80 Wörtern
**vor** der Liste, der erklärt, was der Leser gleich sieht und warum es für ihn zählt —
keine Wiederholung der Liste.

**Drei Messfallen, die Befunde überzeichnen:**
- **FAQ-Sektionen sind keine Lücke.** Accordion-Antworten liegen in `<div>` und als
  `FAQPage`-JSON-LD, nicht in `<p>`. Immer ausschließen.
- **Nav und Footer mitzählen** hebt jede Route gleichmäßig an. Nur `<main>` messen.
- **Zitat- und Testimonial-Sektionen sind keine Lücke.** Vier Kundenstimmen zählen
  als „4 Listenpunkte ohne Erklärabsatz“, tragen aber bereits Prosa — nur eben
  fremde. Ein erklärender Vorspann über Zitate ist Füllsel und schwächt sie.
  Ausschließen, wenn die Kinder Namen, Ort oder Bewertungsquelle tragen.

**Regel dahinter:** Die Metrik findet Kandidaten, nicht Urteile. Vor jedem Fix die
Sektion ansehen — schließt der Absatz eine echte Erklärlücke, oder erfüllt er nur
den Zähler? Im zweiten Fall die Metrik korrigieren, nicht die Seite.

**Klon-Prüfung bei Orts-/Varianten-Seiten.** Tragen mehrere Seiten dieselben H2 mit
ausgetauschtem Ortsnamen („Was wir in *X* räumen“), ist die Seite strukturell ein Klon —
sie besteht jedes Gate und wirkt im Blindvergleich trotzdem generisch. Prüfen mit
`grep -h '<h2' dist/*/index.html | sed 's/[A-ZÄÖÜ][a-zäöüß]*$//' | sort | uniq -c | sort -rn`.

**Vorsicht bei Hierarchie-Vorwürfen.** „Die Hierarchie ergibt keinen Sinn“ meint fast nie
kaputte Schachtelung. Erst messen (`h3_vor_erstem_h2`), bevor umgebaut wird — häufiger
ist der wahre Befund **Monotonie**: dieselbe Kachelraster-Sektion auf jeder Route.
