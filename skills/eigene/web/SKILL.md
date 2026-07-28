---
name: web
version: 0.7.0
description: >
  Dach-Skill für Websites/Landingpages (Loop 2): Strategie, Sitemap, Copy,
  Look/QA (design integriert), Build, QA, CRO-Learning, Website-Referenzen
  nachbauen, Bild-Rebuild, UI-Motion-Komponenten. Trigger: "Website bauen",
  "Landingpage", "Sitemap", "Website-QA", "CRO", "Design polieren",
  "Slop entfernen", "Referenzseite nachbauen", "Website clonen",
  "Popup/Lead-Magnet", "Screenshot nachbauen", "aus Bild bauen".
class: F
scope: agency
sensitivity: internal
loads:
  - references/loop2-ablauf.md
  - references/qa-faecher.md
  - references/landingpage-struktur.md
  - references/informationsarchitektur.md
  - references/web-clone-playbook.md
  - references/rebuild-from-image.md
  - references/bildgenerierung.md
  - references/ui-components/INDEX.md
  - references/motion-doktrin.md
  - references/ui-layouts-catalog.md
  - references/cro-diagnose.md
  - references/experiment-programm.md
  - references/conversion-elemente.md
  - references/code-qualitaets-checkliste.md
  - references/security-audit-playbook.md
  - references/domain-safe-browsing-checkliste.md
  - references/readonly-db-rolle.md
  - references/design-systeme-vergleich.md
  - references/radix-shadcn-tailwind-stack.md
  - references/remotion-produktionsweg.md
  - references/templates/statistics-page-template.html
  - references/agentur-merkmale.md
  - references/orchestrierung.md
requires_skills: [copywriting@^0, design@^0, eval@^0, impeccable@^0, taste@^0, ui-ux@^0]
completion_criteria:
  - "`node scripts/g1-gate.mjs --url <url> --src <projekt>` endet mit Exit 0 (G1, hart — Lighthouse, axe, tote Links, Slop, Craft, Sweep in einem Exit-Code)"
  - "`node scripts/craft-check.mjs --url <url>` meldet 0 BLOCK (Agentur-Merkmale, belegt in references/agentur-merkmale.md)"
  - "Formular-Reihenfolge: Kontaktdaten zuletzt; Drop-off pro Slide gemessen (G1, hart)"
  - "G2 auf jedem Ship-Copy-Block >= 0.7"
  - "Launch nur mit Raphaels Signatur + Deploy-Egress-Gate"
  - "Bei Website-Referenz-Nachbau: Lizenz-Check aus web-clone-playbook.md dokumentiert vor Launch"
---

# web — Loop 2: Website

**Lies zuerst:**
`/root/clients/client-<name>/wiki/ICP.md`, `OFFER.md`, `PROOF.md`, `VOICE.md`
(Dossier aus Loop 1 — Pflicht), `/root/raphael-brain/wiki/hot.md`.
Für alles Visuelle → **design** (Art Direction, impeccable-QA).

**Lädt automatisch mit:** `design` (Wissensquelle: Doktrin, Detektoren,
beide Register-Linien) **und** `impeccable` (Kommandosprache + Craft-Floor)
**sowie** `taste` und `ui-ux` (Register-Router: taste = Landing/brand-Linie,
ui-ux = App/product-Linie — beide zeigen auf die Linien im design-Skill).

## Zweck (1 Satz)

Aus dem Dossier eine konversionsstarke, technisch fehlerfreie Website bauen und aus echten
Analytics verbessern.

## Screenshot-Pflicht (Raphael-Regel, hart — gilt fuer jede sichtbare Aenderung)

**Design wird NUR noch an Screenshots entschieden (Raphael 23.07.). Desktop zuerst.**
Fuer WEB-Seiten/URL-Routen ist `scripts/shot-sweep.mjs` das Standard-Werkzeug: First Fold
exakt 1440×730, danach 1440×1400 im 50-%-Schritt, echte Scroll-Events, NIEMALS
fullPage/captureBeyondViewport. Bei PDFs/Folien/Creatives gilt weiterhin: rendern
(z. B. pdftoppm) und jedes PNG per Read ansehen. Das Skript schreibt ein
`manifest.json` — Kritik-Agents bekommen ausschliesslich dieses Manifest + die PNGs,
keine selbst geratenen Pfade. Der vollstaendige Ablauf
(Sweep → eigenes Ansehen → Panel Sol/Sonnet/Kimi → verifizierte Fixliste → Fix →
Re-Sweep-Vergleich) steht in `references/screenshot-kritik-loop.md` und ist bei
jeder visuellen Arbeit verbindlich.

Nach JEDER Aenderung an Seiten/Folien/Creatives: Sweep fahren und jedes PNG
**per Read wirklich ansehen** — nicht nur erzeugen. Jedes Bild-Asset VOR dem Einbau
einzeln ansehen: Freisteller wirklich freigestellt (kein Hintergrund-Kasten),
richtiges Produkt/Motiv, Stil passt zu den Nachbar-Assets (sonst Higgsfield
`image_background_remover` bzw. neu generieren). Fehler fixen -> ERNEUT Sweep.
Erst fertig melden, wenn der letzte Zyklus sauber war. Diese Pflicht in jeden
Subagent-Prompt fuer visuelle Arbeit explizit hineinschreiben (inkl. absoluter
Pfade zum Skript und zum out-Verzeichnis). Bei PDF-Export zusaetzlich
`pdffonts <datei.pdf>` laufen lassen: Nur die CI-Fonts duerfen eingebettet sein
(Fallback auf Arimo/Roboto/Arial = Webfont war beim Headless-Render nicht da ->
Fonts lokal per `@font-face` buendeln, neu rendern).

**Nach JEDEM Fix ALLES nochmal pruefen, nicht nur die geaenderte Stelle.**
Wer einen Fehler fixt (Pfad, Layout, Bild-Quelle, CSS) und dann nur die
gefixte Seite anschaut, uebersieht dasselbe Problem auf den anderen Seiten.
Nach jedem Fix: ALLE Seiten/Assets erneut rendern und ansehen. Beispiel:
Bild-Pfad auf Seite 3 gefixt -> Seiten 1-11 alle nochmal ansehen, ob die
Bilder ueberall laden. Erst wenn ALLE Seiten sauber sind, ist die Arbeit
fertig.

## Das Auslieferungs-Tor (G1) — "fertig" ist ein Exit-Code

Vor jeder Auslieferung und vor jeder Fertig-Meldung läuft **ein** Befehl:

```bash
node scripts/g1-gate.mjs --url http://localhost:3000/ --src .
```

Er bündelt Erreichbarkeit, Lighthouse (4 Kategorien), axe, tote Links, AI-Slop,
Craft-Check und den Screenshot-Sweep in einem einzigen Exit-Code:

- **Exit 0** — bestanden. Nur dann darf „fertig" gesagt werden.
- **Exit 1** — Qualität gerissen. Der Bericht nennt Kategorie und Ist/Soll.
- **Exit 2** — das Tor selbst ist kaputt (Server nicht erreichbar, Werkzeug fehlt).
  **Ausdrücklich kein Bestanden.** Ein Prüfer, der nicht laufen konnte, hat nichts geprüft.

Fehlende Werkzeuge meldet das Tor als SKIP, nie still als PASS. Wer einen SKIP sieht,
hat ein ungeprüftes Feld — kein grünes. **Und das Tor zählt selbst mit:** ist auch nur
**einer** der vier Qualitäts-Prüfer (Lighthouse, axe, AI-Slop, Craft) überhaupt nicht
gelaufen, endet es mit Exit 2 statt Exit 0. Sonst hätte ein Rechner ohne installierte
Werkzeuge jede beliebige Seite mit „G1 BESTANDEN — 0 Checks grün" durchgewinkt.

> Bis 27.07. reichten hier **zwei von vier**. Diese Schwelle war willkürlich: fehlten
> Lighthouse und der Slop-Scan, meldeten axe und Craft allein ein grünes Tor — Tempo,
> Suchmaschinen und KI-Tells waren schlicht ungeprüft. Jeder der vier beantwortet eine
> eigene Frage, keiner vertritt einen anderen.

Drei Läufe belegen, dass das Tor unterscheidet — dieselbe Seite, drei Umgebungen:

| Lauf | Ergebnis | Exit |
|---|---|---|
| Beweis-Build, alle Werkzeuge da | 7 Checks grün | **0** |
| dieselbe Seite ohne die Mobile-Umbruch-Regel | craft/ gerissen, 2× M13 | **1** |
| dieselbe Seite, Werkzeuge nicht auffindbar | 1 von 4 Prüfern gelaufen | **2** |

### Wer prüft den Prüfer

```bash
node evals/run-antiset.mjs
```

Unter `evals/antiset/` liegt siebenmal **dieselbe** saubere Seite: einmal als
Kontrolle, sechsmal mit je **genau einem** eingebauten Fehler. Der Lauf besteht nur,
wenn die Kontrolle durchgeht **und** jede kaputte Fixture am erwarteten Check reißt —
nicht an einem anderen und nicht an gar keinem.

Ein Tor, das nie grün wird, ist genauso nutzlos wie eins, das nie rot wird. Nur der
Unterschied ist der Beweis. `a5` prüft zusätzlich den Schweregrad: Ghost-Card und
Springy-Hover sind laut Doktrin WARN und dürfen im Normallauf **nicht** blocken,
müssen aber mit `--strict` rot werden.

Das hat sich sofort gelohnt: Der erste Lauf legte zwei Bugs frei, die vorher grün
gemeldet hatten. `ai-slop` zählte vier gefundene Tells als null (der Scanner liefert
`hits` als Zahl, nicht als Liste), und `--strict` war wirkungslos, weil das Gate den
Exit-Code des Craft-Prüfers wegwarf. **Beide Fehler zeigten sich nur in Richtung
falsches Grün** — die Richtung, die ein Gate nie haben darf.

Unter `evals/briefings/` liegen fünf Aufträge als Gegenstück (Handwerk, B2B-SaaS,
Beratung, Produkt, Relaunch). Sie messen nicht das Tor, sondern das Ergebnis: jedes
Briefing endet mit prüfbaren Kriterien, nicht mit „wirkt professionell".

### Das Anti-Set findet nur, woran gedacht wurde

Es prüft die Fälle, für die jemand eine Fixture gebaut hat. Es prüft **nicht**, was
passiert, wenn ein Werkzeug mitten im Lauf stirbt — dafür bräuchte es eine Fixture pro
Absturzart. Diese Lücke schließt ein zweiter, andersartiger Prüfschritt: ein Auditor
aus einer **fremden Modellfamilie** liest die Skripte mit genau einem Auftrag —
*„finde Wege, auf denen ein kaputtes Ergebnis grün gemeldet wird"*. Nur diese Richtung.
Falsches Rot darf er ignorieren.

Der Lauf vom 27.07. brachte elf Befunde, davon neun **derselbe Fehler an neun Stellen**:

```js
const violations = parsed.violations || [];   // ← stirbt das Werkzeug, ist das "0 Probleme"
```

`|| []` macht aus einer fehlenden Antwort eine leere Liste — und aus einem Absturz
eine Bestnote. Ersetzt durch einen Helfer `liste(parsed, feld, werkzeug)`, der wirft,
wenn das Feld fehlt oder keine Liste ist. **Fehlendes Feld ist nicht dasselbe wie
leeres Feld.** Der Aufrufer fängt das ohnehin und meldet ehrlich „Ausgabe unlesbar".

Dieselbe Denkart in drei weiteren Ecken:

| Stelle | vorher grün, obwohl… |
|---|---|
| Lighthouse-Score fehlt | Kategorie wurde als `?` gedruckt und nicht gewertet |
| Screenshot-Sweep bei HTTP 500 | Fehlerseiten wurden hübsch fotografiert und gezählt |
| Screenshot-Sweep bei weißer Seite | leere Bilder bestehen jede Prüfung, weil niemand hineinsieht |

Der Sweep verlangt jetzt vor dem ersten Auslöser mindestens 40 Zeichen Text und
10 Elemente im Body. Eine App, die nicht hydratisiert, liefert damit einen ehrlichen
Fehler statt einer Serie weißer PNGs.

Aus dem Befund wurde ein dauerhafter Prüfschritt — sonst schleicht sich `|| []` beim
nächsten Umbau wieder ein:

```bash
node evals/run-kaputte-ausgaben.mjs     # braucht weder Browser noch Server, läuft in Sekunden
```

Er füttert die Auswertung mit neun Antworten, wie ein sterbendes Werkzeug sie liefert
(`{}`, `null`, `0`, `"Segmentation fault"`, fehlendes Feld) und verlangt, dass keine
davon als „0 Probleme" durchgeht. Dazu zwei **echte** leere Antworten, die durchgehen
müssen — sonst hätte man das Tor nur in die andere Richtung kaputtgemacht.

**Merksatz:** Das Anti-Set prüft, ob das Tor Fehler *erkennt*. Dieser Lauf prüft, ob
das Tor einen Absturz *überlebt*. Beides ist nötig, und der Anstoß dazu muss aus
anderer Hand kommen als der Code selbst (Regel 8).

### Ein neuer Blocker braucht am selben Tag seine Fixture

Am 27.07. bekam `craft-check.mjs` den M24-Blocker („kein einziges Bild über
Icon-Größe"). Am selben Tag bekamen **alle sechs** Fixtures ein Bild — sonst wäre die
Kontrolle daran gerissen. Damit prüfte das Anti-Set den neuen Blocker nicht mehr: es
gab keine bildlose Seite mehr. Der Blocker war scharf, aber ungeprüft — niemand hätte
gemerkt, wenn er nie auslöst.

`a6-ohne-bildwelt.html` schließt das. Sie ist eine Kopie der Kontrolle, aus der genau
eine Zeile entfernt wurde. Das ist die Bauform für jede Fixture:

> **Eine Fixture ändert genau einen Umstand gegenüber `_basis.html`.** Reißt sie an
> zwei Checks, weiß man nicht, welcher der beiden den Fehler wirklich sieht.

**Regel:** Wer einen BLOCK-Befund einbaut, baut im selben Zug die Fixture, die ihn
auslöst, und trägt sie in `ERWARTET` ein. Ein Blocker ohne Fixture ist eine Behauptung.

Zwei Prüfer, zwei Blindstellen, beide nötig: `scan-ai-slop.mjs` liest **Quelltext**,
`craft-check.mjs` liest das **gerenderte DOM**. Auf demselben Testfall meldete der
Quelltext-Scan 0 Tells, während der DOM-Scan 5 Blocker fand. Details und Schwellen:
`references/agentur-merkmale.md`.

## Look & QA (design ist die einzige Design-Wissensquelle)

Dieser Skill ist das **Dach**: eine Anleitung von Strategie bis Launch. Alles Visuelle
(Art Direction) **und** die finale Design-Prüfung laufen über **design** — nicht
zwischen zwei Skills springen, aber Design auch nie hier neu erfinden. So teilt sich design auf:

| Aufgabe | r-design-Linie | Referenz in design |
|---|---|---|
| Landing/Kampagne/Portfolio (Design IST das Produkt) | **taste-Linie** | `references/taste-kern.md` |
| App/Dashboard/Tool (Design DIENT dem Produkt) | **ui-ux-Linie** (Offline-DB) | `references/ui-ux-db-nutzung.md` |
| Finale Design-QA (immer, hart) | **impeccable-Detektoren** | `references/impeccable-detektoren.md` |
| Konflikte/Doktrin (Typo/Farbe/Layout) | fusionierte Regeln | `references/design-doktrin.md` |

Regel: In den Schritten `art-direction` und `qa-faecher` (Fach 2 Design) **design laden
und befolgen**. impeccable = Exit 0 ist harte Ship-Bedingung. Herkunft der Design-Regeln
(impeccable/taste/ui-ux-pro-max, Lizenzen) steht in `design/VENDORING.md`.

**Feste Reihenfolge bei kombiniertem Design+Copy-Check (z.B. AI-Slop-Check über mehrere
Seiten):** immer **design ZUERST** (Detektoren `node scripts/detect.mjs` + `node
scripts/scan-ai-slop.mjs` je Exit 0), **danach copywriting G1→G2** auf denselben Seiten
— orchestriert über web als Dach-Skill. "Unklar" ist hier kein zulässiges Ergebnis;
wenn wirklich kein Skill passt, erst dann als unklar zurückmelden.

## Landingpage-Struktur (Besucher → qualifizierte Leads)

Detail in `references/landingpage-struktur.md` (Quelle: Ads-Kurs-Synthese, siehe dort).
Kurz — eine Landingpage für Ads-Traffic ist **eine Aktion**, kein Website-Menü:

- **Eine Aktion:** kein Menü, kein Blog, kein "About us". Formular **direkt eingebettet**
  (nicht hinter einer "Apply Now"-Button-Seite). CTA/Formular **im oder knapp unter dem Fold**.
- **Formular = Kette kleiner Ja's:** Identifikation → Qualifizierung → **Kontaktdaten ZULETZT**
  (harte QA-Regel, siehe qa-faecher). Website-URL statt Firmenname abfragen.
- **Reihenfolge:** Big Idea oben → FAQ (4 Quadranten) + "Für wen" → Testimonials → Details.
  FAQ-vor-Testimonials ist eine **selbst zu testende Hypothese** (A/B), kein Gesetz.
- **Testimonials:** Video/Screenshot statt Fließtext, nach Identität/Branche gelabelt,
  Menge NICHT wegkürzen (Kürzung halbierte die Conversion).

## Ablauf (Detail in references/loop2-ablauf.md)

1. **strategy** — Ziel, Zielgruppe, Konversionspfad (Fable, Checkpoint Raphael).
2. **sitemap** — Seitenstruktur + Sektionsplan (Sonnet). Landing → Struktur aus
   `references/landingpage-struktur.md` (eine Aktion, Reihenfolge nach Überzeugungskraft).
   Mehrseitige Website (kein Ads-Landing) → `references/informationsarchitektur.md`
   (Seitenhierarchie, Navigation, URL-Struktur, internes Verlinken).
3. **copy** — Copy sektionsweise (Sonnet, Brand-Voice + Proof über copywriting). G1-Stil → G2.
4. **art-direction** — **verweist auf design.** G1 = impeccable-46-Regeln (`npx impeccable detect --json`).
   Soll eine bestehende Referenzseite als Vorlage/Stil dienen ("baue mir etwas Ähnliches
   wie X", "clone diese Landingpage") → **zuerst** `references/web-clone-playbook.md` laden
   (Entscheidungsbaum, Lizenz-Check, Komplexitätsskala L1–L6) **bevor** Art Direction beginnt.
   Ist die Vorlage kein Link, sondern ein **Bild** (Screenshot, Mockup,
   Figma-Export, Fullpage-Longshot — "Screenshot nachbauen", "aus Bild bauen",
   "pixelgenau aus dem Bild umsetzen") → **zuerst** `references/rebuild-from-image.md`
   laden (Sektions-Analyse, Renderstrategie pro Element, Rebuild-Prompt,
   Pixel-Treue-Check gegen 1440/768/390 px). Beide Vorlagen gleichzeitig
   vorhanden (Screenshot einer Seite, deren URL man auch hat) → web-clone-
   playbook.md zuerst, rebuild-from-image.md nur für Bildteile ohne
   erreichbaren Source.
   Sobald **echte Bild-Assets** gebraucht werden (Hero-Foto, Produkt-Shot, Szene,
   2D/3D-Illustration) → `references/bildgenerierung.md` laden: Standard-Werkzeug ist
   die **Higgsfield CLI**, mit festem Entscheidungsbaum — **Referenz vorhanden →
   GPT Image 2** (`--image-references` = „Add Image 1/2/…", für inhaltliche UND
   stilistische Referenzen; GPT Image 2 ist auch der beste **Illustrator**, 2D/3D auch
   ohne Referenz), **nur echt fotorealistisch ohne Referenz → Recraft V4.1** mit
   JSON-Prompting, ohne Color-Grading und ohne Nahaufnahme-Gesichter echter Menschen,
   **Nano Banana 2 nur für Previews**, Finals in 4k/2k. Nicht
   verwechseln mit den **Design-Referenz-Mockups** aus `imagegen-web`/`imagegen-mobile`
   (ein Mockup pro Sektion) — die Tabelle „Abgrenzung" in `bildgenerierung.md` trennt das.
5. **components** — Komponenten-Spezifikation aus Art Direction. Copy-paste-fertige
   Motion-Komponenten (Buttons, Modals, Tabs, Command-Palette, …) → `references/ui-components/INDEX.md`
   + Motion-Doktrin (wann/wie animieren, Reduced-Motion-Pflicht) → `references/motion-doktrin.md`.
   Weitere Komponenten-Ideen (Glass/Mesh-Gradient/3D) nur als Vokabular →
   `references/ui-layouts-catalog.md`. Welches Design-System zum Brief passt
   (Radix/shadcn/Tailwind, Fluent, Carbon, Polaris, Atlassian, Material, …) →
   `references/design-systeme-vergleich.md`. Raphaels Default-Stack für eigene
   Agenturprojekte (Next.js + Tailwind + Radix/shadcn + Framer Motion) →
   `references/radix-shadcn-tailwind-stack.md`. Braucht das Projekt ein
   Hero-/Teaser-Video oder eine React-basierte Video-Composition (kein
   normales CSS-Motion) → `references/remotion-produktionsweg.md`.
6. **build** — Umsetzung (Terra/Sol, Cross-Vendor `/codex:review`). Bei echtem Custom-Code
   zusätzlich `references/code-qualitaets-checkliste.md` gegen AI-Slop prüfen. Formular-
   Backends, Kundendaten-Handling, npm-Abhängigkeiten (Formular/Tracking/Payment) →
   `references/security-audit-playbook.md` (Fail-Open-Defaults, Footgun-Configs,
   Supply-Chain-Check, Quelle Trail of Bits). Bei Code-Review von Formularen/API-Routes/
   Webhooks/**Cookie-Banner/Consent-Layer/Tracking-Einbindung** (z.B. Popup-Lead-Magnet
   mit E-Mail-Erfassung, DSGVO-Consent-Formular, Tracking-Skript-Einbindung) zusätzlich
   `/root/raphael-skills/skills/methodik/code-review/references/owasp-checkliste.md`
   nachladen (A02/A03/A05/A08/A10-Einträge, DSGVO-Consent des Formularfelds prüfen).
   Braucht der
   Build Datenbankzugriff zur Content-Prüfung → `references/readonly-db-rolle.md` (nie
   Schreibzugriff für Agenten).
7. **qa-faecher** — QA parallel: **Conversion · Design · A11y · Technik** (Schwarm gemischt).
   G1 Lighthouse/axe = 0, hart. Fach 2 Design laeuft ab jetzt als Screenshot-Kritik-Loop
   nach references/screenshot-kritik-loop.md.
   (Panel: sol-pruefer=Code+Befundliste, sonnet-worker=Screenshots, kimi-recherche=Screenshots.)
   Bei kombiniertem Design+Copy-Check (AI-Slop) gilt die feste
   Sequenz aus "Look & QA": design ZUERST, **danach copywriting G1→G2 als fester zweiter
   Schritt** (nicht optional) — Details in `references/qa-faecher.md`. Optional Persona-QA
   (Beginner/Engineer/Business-Owner). Conversion-Elemente (Popup/Lead-Magnet/Free-Tool) →
   `references/conversion-elemente.md`. Tiefere CRO-Diagnose bei Bestandsseiten →
   `references/cro-diagnose.md`.
8. **Launch** — **Signatur + Deploy-Egress-Gate.** Nie autonom. Neue/junge Domain →
   vorher `references/domain-safe-browsing-checkliste.md` durchgehen (Google-Safe-Browsing-Flag
   verhindern). Bei Referenz-Nachbau: Lizenz-Check aus `web-clone-playbook.md` muss geklärt sein.
9. **cro-learn** — CRO aus echten Analytics (Sonnet, G4). Für ein laufendes Test-Programm
   statt Einzelfixes → `references/experiment-programm.md` (ICE-Score, Experiment-Playbook).

## Loop-2-Ablauf (verbindlich)

Strategie (Fable, Checkpoint Raphael) → Sitemap + Copy sektionsweise (Sonnet, Voice+Proof;
G1-Stil → G2) → Art Direction (design, G1 impeccable) → Build (Terra/Sol, Cross-Vendor
`/codex:review`) → QA-Fächer parallel (G1 Lighthouse/axe = 0, hart) → Launch (Signatur +
Deploy-Egress-Gate) → CRO-Learning aus echten Analytics (Sonnet, G4).

## Statistik-/Linkbait-Seite als Vorlage

Für eine eigenständige Statistik-/Datenseite (Linkbait für seo, oder als
Ressourcenseite auf der Kundenwebsite): `references/templates/statistics-page-template.html`
— eigenständige HTML-Vorlage mit Chart.js, Article+FAQPage-Schema.org, mobile-first,
Print-Styles. Unverändert übernehmen, nur Inhalte/Branding ersetzen.

## Gotchas

- **Lighthouse/axe = 0 ist hart** — kein "fast fertig". Fertig = Environment-Tatsache (Regel 14).
- Art Direction nie selbst erfinden — Design läuft über **design** (Details in Sektion
  "Look & QA" oben, nicht doppelt hier).
- Build läuft Cross-Vendor geprüft: wer baut (Terra/Sol) ist nicht wer reviewt.
- Deploy = Rot-Klasse: nie autonom, immer Egress-Gate (Domain-Whitelist) + Signatur.
- CRO-Behauptungen nur aus echten Analytics (G4), nie aus Judge-Scores.
- **"Auf GitHub öffentlich" ≠ "frei nutzbar"** — beim Nachbauen einer Referenzseite immer
  den Lizenz-Check aus `web-clone-playbook.md` machen, sonst Urheberrechtsrisiko im
  Kunden-Launch (siehe dortige Iron Rule).
- **Junge Domain + Formular ist das Safe-Browsing-Flag-Muster** — vor jedem Launch auf
  neuer Domain die Checkliste in `domain-safe-browsing-checkliste.md` durchgehen, nicht
  erst wenn der rote Warnbildschirm schon da ist.
- Motion-Komponenten aus `ui-components/` nie ohne `useReducedMotion()`-Äquivalent
  einbauen — die globale CSS-Media-Query stoppt keine JS-Animationen.
- **Bild-Assets über die Higgsfield CLI, nach `references/bildgenerierung.md`** —
  Referenz vorhanden **oder Illustration (2D/3D)** → **GPT Image 2**; Recraft nur für
  **echt fotorealistische** Bilder ohne Referenz (JSON-Prompt gegen den Filmlook,
  **kein** Color-Grading, **keine** Nahaufnahme-Gesichter echter Menschen — nur
  Distanz/beiläufig). Nano Banana nur als Nano Banana 2 für Previews. Bei Kundenseiten
  vorher klären, ob KI-Bilder erlaubt sind (manche wollen nur echte Fotos) —
  Datenminimierung (TB2) beachten.
- **Jedes Bild → AVIF + Index, Verwerfen löscht komplett.** Alle Bilder (generiert wie
  geliefert) sofort nach AVIF konvertieren und in `bilder-index.json` führen
  (typ/motiv/style/modell/refs) — deterministisch über `scripts/bilder.mjs`
  (`add`/`list`/`reject`). „Bild ist scheiße" → `reject` löscht Datei **und**
  Index-Eintrag in einem Schritt. Details in `references/bildgenerierung.md`.
