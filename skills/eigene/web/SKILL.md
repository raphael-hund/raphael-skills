---
name: web
description: >
  Dach-Skill für Websites/Landingpages (Loop 2): Strategie, Sitemap, Copy,
  Look/QA (design integriert), Build, QA, CRO-Learning, Website-Referenzen
  nachbauen, Bild-Rebuild, UI-Motion-Komponenten, Tool-Use-Case-Router
  (Defaults/Install statt Linkliste) und kuratierte Frontend-Referenzen. Trigger: "Website bauen", "Landingpage", "Sitemap",
  "Website-QA", "CRO", "Design polieren", "Slop entfernen",
  "Referenzseite nachbauen", "Website clonen", "Popup/Lead-Magnet",
  "Screenshot nachbauen", "aus Bild bauen".
metadata:
  raphael-version: "0.10.0"
  raphael-class: "F"
  raphael-scope: "agency"
  raphael-sensitivity: "internal"
  raphael-loads: '["references/loop2-ablauf.md","references/qa-faecher.md","references/landingpage-struktur.md","references/informationsarchitektur.md","references/web-clone-playbook.md","references/rebuild-from-image.md","references/bildgenerierung.md","references/ui-components/INDEX.md","references/motion-doktrin.md","references/ui-layouts-catalog.md","references/cro-diagnose.md","references/experiment-programm.md","references/conversion-elemente.md","references/code-qualitaets-checkliste.md","references/security-audit-playbook.md","references/domain-safe-browsing-checkliste.md","references/readonly-db-rolle.md","references/design-systeme-vergleich.md","references/radix-shadcn-tailwind-stack.md","references/remotion-produktionsweg.md","references/screenshot-kritik-loop.md","references/tool-usecase-router.md","references/frontend-referenzbibliothek.md","references/lexlin-design-prinzipien.md","references/templates/statistics-page-template.html"]'
  raphael-requires-skills: '["copywriting@^0","design@^0","eval@^0","impeccable@^0","taste@^0","ui-ux@^0"]'
  raphael-completion-criteria: '["Lighthouse/axe = 0 Fehler (G1, hart)", "Formular-Reihenfolge: Kontaktdaten zuletzt; Drop-off pro Slide gemessen (G1, hart)", "G2 auf jedem Ship-Copy-Block >= 0.7", "Launch nur mit Raphaels Signatur + Deploy-Egress-Gate", "Bei Website-Referenz-Nachbau: Lizenz-Check aus web-clone-playbook.md dokumentiert vor Launch", "Bei components/art-direction/build mit UI-Tools: tool-usecase-router.md angewendet; Defaults+Install/Use dokumentiert; keine 160-Link-Dump-Antwort", "Messlatte-Szenario (Motion-Hero+Icons+Stock/FAQ): vier Default-Zeilen aus Router ohne Galerie-Dump", "Werkzeugtabelle in client-<name>/web/art-direction.md existiert vor dem ersten npm i; jede Zeile nennt Bedarf, Werkzeug, Befehl, Gate und Router-Anker", "Keine Dependency in package.json ohne Zeile in der Werkzeugtabelle (Nachweis: node scripts/werkzeug-gate.mjs <projekt> Exit 0)"]'
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

## Portabilitätsvertrag

- Die **aktuelle Koordination** hält Plan, Entscheidungen, Freigaben und Abschlussbeweis.
- Rollen wie Strategie, Copy, Umsetzung, visuelle Kritik oder unabhängiger Review
  beschreiben Fähigkeiten, keine fest verdrahteten Anbieter oder Modelle.
- Jede Rolle wird nur an Werkzeuge gebunden, die der aktuelle Host tatsächlich
  bereitstellt. Fehlende Werkzeuge niemals erfinden oder als ausgeführt darstellen.
- Neue nutzereigene Hintergrundaufgaben oder getrennte Arbeitskontexte nur anlegen,
  wenn der Nutzer das ausdrücklich verlangt; interne, begrenzte Delegation bleibt
  innerhalb der Regeln des aktuellen Hosts.
- Sicherheits-, Egress-, Screenshot- und Abschluss-Gates gelten in jedem Runtime-Kontext
  unverändert.

## Screenshot-Pflicht (Raphael-Regel, hart — gilt fuer jede sichtbare Aenderung)

**Design wird NUR noch an Screenshots entschieden (Raphael 23.07.). Desktop zuerst.**
Fuer WEB-Seiten/URL-Routen ist `scripts/shot-sweep.mjs` das Standard-Werkzeug: First Fold
exakt 1440×730, danach 1440×1400 im 50-%-Schritt, echte Scroll-Events, NIEMALS
fullPage/captureBeyondViewport. Bei PDFs/Folien/Creatives gilt weiterhin: rendern
(z. B. pdftoppm) und jedes PNG per Read ansehen. Das Skript schreibt ein
`manifest.json` — Kritik-Rollen bekommen ausschliesslich dieses Manifest + die PNGs,
keine selbst geratenen Pfade. Der vollstaendige Ablauf
(Sweep → eigenes Ansehen → unabhängiges Kritik-Panel → verifizierte Fixliste → Fix →
Re-Sweep-Vergleich) steht in `references/screenshot-kritik-loop.md` und ist bei
jeder visuellen Arbeit verbindlich.

Nach JEDER Aenderung an Seiten/Folien/Creatives: Sweep fahren und jedes PNG
**per Read wirklich ansehen** — nicht nur erzeugen. Jedes Bild-Asset VOR dem Einbau
einzeln ansehen: Freisteller wirklich freigestellt (kein Hintergrund-Kasten),
richtiges Produkt/Motiv, Stil passt zu den Nachbar-Assets (sonst Higgsfield
`image_background_remover` bzw. neu generieren). Fehler fixen -> ERNEUT Sweep.
Erst fertig melden, wenn der letzte Zyklus sauber war. Diese Pflicht in jeden
Delegations-Prompt fuer visuelle Arbeit explizit hineinschreiben (inkl. absoluter
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

## Look & QA (design ist die einzige Design-Wissensquelle)

Dieser Skill ist das **Dach**: eine Anleitung von Strategie bis Launch. Alles Visuelle
(Art Direction) **und** die finale Design-Prüfung laufen über **design** — nicht
zwischen zwei Skills springen, aber Design auch nie hier neu erfinden. So teilt sich design auf:

| Aufgabe | r-design-Linie | Referenz in design |
|---|---|---|
| Landing/Kampagne/Portfolio (Design IST das Produkt) | **taste-Linie** | `/root/raphael-skills/skills/design/references/taste-kern.md` |
| App/Dashboard/Tool (Design DIENT dem Produkt) | **ui-ux-Linie** (Offline-DB) | `/root/raphael-skills/skills/design/references/ui-ux-db-nutzung.md` |
| Finale Design-QA (immer, hart) | **impeccable-Detektoren** | `/root/raphael-skills/skills/design/references/impeccable-detektoren.md` |
| Konflikte/Doktrin (Typo/Farbe/Layout) | fusionierte Regeln | `/root/raphael-skills/skills/design/references/design-doktrin.md` |

Regel: In den Schritten `art-direction` und `qa-faecher` (Fach 2 Design) **design laden
und befolgen**. impeccable = Exit 0 ist harte Ship-Bedingung. Herkunft der Design-Regeln
(impeccable/taste/ui-ux-pro-max, Lizenzen) steht in
`/root/raphael-skills/skills/design/VENDORING.md`.

**Feste Reihenfolge bei kombiniertem Design+Copy-Check (z.B. AI-Slop-Check über mehrere
Seiten):** immer **design ZUERST** (Detektoren
`node /root/raphael-skills/skills/design/scripts/detect.mjs` +
`node /root/raphael-skills/skills/design/scripts/scan-ai-slop.mjs` je Exit 0),
**danach copywriting G1→G2** auf denselben Seiten
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

1. **strategy** — Ziel, Zielgruppe, Konversionspfad (Strategie-Rolle, Checkpoint Raphael).
2. **sitemap** — Seitenstruktur + Sektionsplan (Informationsarchitektur-Rolle). Landing → Struktur aus
   `references/landingpage-struktur.md` (eine Aktion, Reihenfolge nach Überzeugungskraft).
   Mehrseitige Website (kein Ads-Landing) → `references/informationsarchitektur.md`
   (Seitenhierarchie, Navigation, URL-Struktur, internes Verlinken).
3. **copy** — Copy sektionsweise (Copy-Rolle, Brand-Voice + Proof über copywriting). G1-Stil → G2.
4. **art-direction** — **verweist auf design.** G1 = impeccable-46-Regeln (`npx impeccable detect --json`).
   Braucht die Art Direction **UI-/Landing-Inspiration** (Galerien, Mobbin, Refero)
   → zuerst `references/tool-usecase-router.md` §1 (eine Quelle wählen), nicht die
   ganze Inspirationsliste aus der Referenzbibliothek. Tool-Use-Case-Router ($#grafik-baum$ für Medien-Wahl).
   Wenn Brief UI-Inspiration braucht: §1 $#inspiration$ ziehen (eine Quelle, 3–7 Screenshots).
   Wenn fertige Design-Referenzseite vorhanden: web-clone-playbook.md zuerst, rebuild-from-image.md nur für Bildteile.
   Für Premium-Landing-Flächen zusätzlich `references/lexlin-design-prinzipien.md` laden
   (15 Arbeitsregeln, Hero-Konstruktion, Dials) — Ergänzung zum vendorten taste-kern.
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
5. **components** — Komponenten-Spezifikation aus Art Direction. Vier Schritte,
   in dieser Reihenfolge, kein Überspringen:
   **5a Bedarfsliste** — jede Sektion durchgehen und notieren, was sie braucht
   (Interaktion? Icon? Motion? Hintergrund? Video? Schrift?).
   **5b Router ziehen** — `references/tool-usecase-router.md` laden und pro Bedarf
   **genau eine** Zeile ziehen (Default + Install/Use + Gate).
   **5c Abweichung nur belegt** — Nicht-Default braucht einen Satz Grund **und**
   einen AgentReach-Beleg (Datum, geprüfte URL, Lizenzstand) in derselben Zeile.
   **5d Werkzeugtabelle schreiben** — Ergebnis als Tabelle nach
   `client-<name>/web/art-direction.md` (Spalten: Bedarf | Werkzeug | Befehl |
   Gate | Router-Anker | geprüft-am). **Diese Tabelle ist die Freigabe für
   Schritt 6** — ohne sie beginnt kein Build und kein `npm i`.
   Die Antwort nennt diese Defaults —
   **nicht** die 160er-Kandidatenliste. `references/frontend-referenzbibliothek.md`
   nur öffnen, wenn eine Router-Zeile ausdrücklich dorthin zeigt; höchstens
   3 URLs daraus zitieren, nie eine ganze Kategorie;
   nie die gesamte Liste installieren oder in den Kontext kippen. Copy-paste-fertige
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
6. **build** — **Kein `npm i`, kein `npx … add`, kein Vendorieren ohne passende
   Zeile in der Werkzeugtabelle aus 5d.** Fällt beim Bauen ein neuer Bedarf auf:
   zurück in den Router, Zeile nachziehen, dann installieren. Umsetzung durch eine
   Implementierungs-Rolle nach den in
   `components` gewählten Router-Defaults (`references/tool-usecase-router.md`);
   Install nur gezielt (z.B. `npx shadcn@latest add accordion`, `npm i lucide-react`),
   nie Blind-Install ganzer Libraries. Danach unabhängiger
   Cross-Provider-Review durch einen getrennten Kontext. Bei echtem Custom-Code
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
   Schreibzugriff für ausführende Rollen).
7. **qa-faecher** — QA parallel: **Conversion · Design · A11y · Technik** (Schwarm gemischt).
   G1 Lighthouse/axe = 0, hart. Fach 4 enthält zusätzlich das **Werkzeug-Gate**
   (`node scripts/werkzeug-gate.mjs <projekt>`): ein Icon-System, kein
   `framer-motion`-Import, `useReducedMotion` in jeder kopierten Motion-Datei,
   keine Dependency ohne Zeile in der Werkzeugtabelle — rot = kein Launch. Fach 2 Design laeuft ab jetzt als Screenshot-Kritik-Loop
   nach references/screenshot-kritik-loop.md.
   (Panel: eine Code-Ursachenprüfung plus zwei unabhängige visuelle Prüfungen.)
   Bei kombiniertem Design+Copy-Check (AI-Slop) gilt die feste
   Sequenz aus "Look & QA": design ZUERST, **danach copywriting G1→G2 als fester zweiter
   Schritt** (nicht optional) — Details in `references/qa-faecher.md`. Optional Persona-QA
   (Beginner/Engineer/Business-Owner). Conversion-Elemente (Popup/Lead-Magnet/Free-Tool) →
   `references/conversion-elemente.md`. Tiefere CRO-Diagnose bei Bestandsseiten →
   `references/cro-diagnose.md`.
8. **Launch** — **Signatur + Deploy-Egress-Gate.** Nie autonom. Neue/junge Domain →
   vorher `references/domain-safe-browsing-checkliste.md` durchgehen (Google-Safe-Browsing-Flag
   verhindern). Bei Referenz-Nachbau: Lizenz-Check aus `web-clone-playbook.md` muss geklärt sein.
9. **cro-learn** — CRO aus echten Analytics (Analyse-Rolle, G4). Für ein laufendes Test-Programm
   statt Einzelfixes → `references/experiment-programm.md` (ICE-Score, Experiment-Playbook).

## Loop-2-Ablauf (verbindlich)

Strategie (Strategie-Rolle, Checkpoint Raphael) → Sitemap + Copy sektionsweise
(Informationsarchitektur-/Copy-Rolle, Voice+Proof; G1-Stil → G2) → Art Direction
(design, G1 impeccable) → Build (Implementierungs-Rolle + unabhängiger Review) →
QA-Fächer parallel (G1 Lighthouse/axe = 0, hart) → Launch (Signatur +
Deploy-Egress-Gate) → CRO-Learning aus echten Analytics (Analyse-Rolle, G4).

## Statistik-/Linkbait-Seite als Vorlage

Für eine eigenständige Statistik-/Datenseite (Linkbait für seo, oder als
Ressourcenseite auf der Kundenwebsite): `references/templates/statistics-page-template.html`
— eigenständige HTML-Vorlage mit Chart.js, Article+FAQPage-Schema.org, mobile-first,
Print-Styles. Unverändert übernehmen, nur Inhalte/Branding ersetzen.

## Gotchas

- **Frontend-Tools über `tool-usecase-router.md`, nicht über Link-Dumps.**
  Jeder Bedarf (Icons, FAQ, Motion, Stock, …) bekommt Default + Install/Use + Gate.
  `frontend-referenzbibliothek.md` ist nur Anhang nach dem Router — wer sie ohne
  gezogene Router-Zeile öffnet, arbeitet falsch herum.
  160 URLs in die Antwort kippen = Regelverstoß.
- **Das Motion-Paket heißt `motion`, der Import `motion/react`.** `npm i framer-motion`
  bricht alle vendorierten Komponenten aus `references/ui-components/` (alle 75
  Motion-Importe dort lauten `from "motion/react"`).
- **Genau EIN Icon-System pro Projekt, Default Lucide** — shadcn und die 31
  Icon-Importe der vendorierten Komponenten nutzen bereits `lucide-react`.
  Ein zweites Set ist doppelte Bundle-Last und optischer Bruch.
- **Lighthouse/axe = 0 ist hart** — kein "fast fertig". Fertig = Environment-Tatsache (Regel 14).
- Art Direction nie selbst erfinden — Design läuft über **design** (Details in Sektion
  "Look & QA" oben, nicht doppelt hier).
- Build läuft unabhängig geprüft: wer baut, ist nicht wer reviewt.
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
