---
name: web-design
description: >
  Ganzheitlicher Web-Design-Skill für Business-, Lead-Gen-, SaaS- und SEO-Websites in
  React/Next.js + Tailwind. Baut nach belegten Seitentyp-Blueprints aus 19 analysierten
  Referenz-Sites (Solar, Immobilien, Agentur, SaaS, Consumer-Service), mit ruhigen,
  handwerklich sauberen Animationen (emilkowalski animate/emil-design-eng/
  find-animation-opportunities, Apple-Prinzipien), dem jakubkrehel better-*-Handwerk
  (ui/typography/colors/layout/accessibility), unslop-ui, ui-ux-pro-max und dem
  vollständigen impeccable-Regelwerk (Visitor-Modes, Craft Floor, Detector, Commands)
  als Pflicht-Gates. Enthält DESIGN.md-First-Planung, SEO-Workflow, CRO, Funnels,
  21st.dev-Komponenten-Workflow, Higgsfield-Bildassets und Screenshot-QA.
  Trigger: "Website bauen", "Landingpage", "Leistungsseite", "Funnel", "Redesign",
  "web-design", "/web-design", jede Anfrage nach einer kompletten Site oder Sektion.
---

# Web Design: Der Gesamt-Skill

Ziel: Websites, die aussehen und funktionieren wie die besten Sites ihrer Branche,
nicht wie "KI-Demos". Belegte Struktur, harte Zahlen, ein Funnel, ruhige Bewegung,
sauberes Handwerk. Stack-Annahme: Next.js App Router + React + Tailwind, Komponenten
aus 21st.dev/Registries, Motion mit CSS zuerst und `motion/react` nur wo nötig.

## Kernphilosophie

1. **Blueprint vor Kreativität.** Jede Seite bekommt einen Seitentyp-Blueprint aus
   `references/seitentyp-blueprints.md`. Die Sektionsfolge ist Ergebnis von Firmen,
   die davon leben. Erst wenn die Struktur steht, wird gestaltet.
2. **Still ist der Default.** Die Referenzen nutzen 5 bis 8 Bewegungsarten pro Site:
   Scroll-Reveal (ein Muster), Zähler, Akkordeon, Marquee, Karussell, Sticky-Header,
   Button-States. Kein Popping, keine Hero-Explosion, nichts unter 200 ms außer Press.
3. **Zahlen statt Adjektive.** Trust ist ein Datenpunkt mit Bezug (4,9 bei 1.832
   Bewertungen), gestaffelt über die Seite. Ohne echte Zahl: Slot markieren, nie erfinden.
4. **Ein Funnel, viele Eingänge.** Ein Ziel-Slug, Labels pro Kontext, Deep-Links
   mit vorbelegter Antwort.
5. **Handwerk ist nicht verhandelbar.** Craft Floor (impeccable) + handwerk.md sind
   Gates, keine Empfehlungen. Exakte Werte schlagen Adjektive:
   `cubic-bezier(0.23,1,0.32,1)` statt "smooth", `max-w-[65ch]` statt "lesbar".
6. **Der Brief gewinnt.** Gepinnte Marke, Farben, Fonts, Anrede des Auftrags haben
   Vorrang vor jeder Regel hier. Abweichungen von Blueprints: eine Zeile in DESIGN.md.

## Register wählen (bestimmt alles Weitere)

| Register | Beispiele | Dials VARIANCE/MOTION/DENSITY | Blueprint-Familie |
|---|---|---|---|
| **Lead-Gen-Dienstleister** (Default) | Solar, Immobilien, Handwerk, Agentur, Praxis, Wärme | 5 / 3 / 4 | seitentyp-blueprints §2.1, 2.3, 2.4, 2.9, 2.11 |
| **SaaS / Plattform** | Trading-Ausbildung, App, Mobility | 6 / 4 / 4 | §2.2, 2.12 |
| **SEO-Masse** | Stadt-Seiten, Glossar, Local-Guides, Ratgeber-Hub | 4 / 2 / 4 | §2.4, 2.7, 2.8, 2.11, 2.14 |
| **E-Commerce / Produkt** | Balkonkraftwerk-Shop, Ring, Abo | 5 / 4 / 4 | §2.5, 2.12 |
| Editorial / Portfolio / Experience | nur wenn der Brief es verlangt | 7 / 6 / 3 | design-doktrin, ui-inspo-patterns |

MOTION über 4 nur mit Begründung im Brief. "Visuell cool" ist keine Begründung.

## Harte No-Gos (nie brechen, außer der Brief verlangt es explizit)

Gedankenstrich mit Leerzeichen in sichtbarem Text (Dash-Grep muss leer sein) ·
`ease-in` auf UI · `transition: all` · `scale(0)` · Layout-Property-Animation ·
Scroll-Reveal unter 400 ms oder über 40 px Versatz · Reveal ohne
`prefers-reduced-motion` · Hover-Scale auf Karten und Bild-Zoom · Fake-Zahlen,
Fake-Testimonials, Fake-Screenshots · Placeholder ohne Slot-Kennzeichnung · mehr als
ein H1 · Du und Sie gemischt · zweite Akzentfarbe · verschachtelte Cards ·
Icon-in-rounded-square-Reihen · Emoji als Icon · Glassmorphism als Default ·
AI-Lila-Gradient · Pastell-Default · Serif-Reflex ohne Brief · Hero-Bild lazy.

Starke Heuristiken (begründet überstimmbar, Zeile in DESIGN.md): Zigzag-Cap 3,
Endsequenz FAQ → Final-CTA → Footer, 2 bis 3 Flächenfarben, Container 80rem,
Eyebrow-Restraint, Card-Vermeidung auf Landings.

## Der Workflow (Phasen strikt in Reihenfolge)

### Phase 0: Referenzen und Recherche
→ `references/seitentyp-blueprints.md` §5 (Belege-Index) und `research/README.md`.
Zuerst die 2 bis 3 branchennächsten Referenz-Analysen aus `research/sites/` lesen
(Solar → ekd, elephant, enpal, peter, priwatt; Immobilien → haubner, schmidt, qu;
Agentur → seo-labs; SaaS → iqcapital, worldclassedge, trademania; Service-Ketten →
hellotend, bondvet, miles; Consumer → oura, getsunday, uber). Dann
`references/inspiration.md` für 1 bis 2 zusätzliche Referenzen (Mobbin, Refero,
Spezial-Galerien). Pro Referenz eine Zeile "Was genau ist gut?".

### Phase 1: Brief lesen, Register, Design-Read
Signale: Seitenart, Zielgruppe (wählt die Ästhetik), Conversion-Ziel, Anrede (Du/Sie,
einmal festlegen), Marken-Assets, stille Constraints. Bei echter Zweideutigkeit genau
EINE Rückfrage, sonst annehmen und bauen. Design-Read in einer Zeile:
*"<Seitenart> für <Zielgruppe>, Register <Lead-Gen/SaaS/SEO/Shop>, Funnel-Ziel
</slug>, Anrede <Du/Sie>, Richtung <X>."* Pro Surface einen **Visitor-Mode**
(Persuade/Operate/Read/Experience, impeccable-regelwerk.md §1). **Signature-Element
(Pflicht)**: genau EIN benanntes Element (Bento-Overlap, Rechner-Hero,
Zwei-Ebenen-Button, Mono-Eyebrow, Fallstudien-Karte), aus den Referenzen entlehnt
und an die Marke angepasst. **Generik-Check**: "Was würde jeder Agent hier bauen?"
und jeden default-artigen Teil begründet abweichen.

### Phase 2: Plan: DESIGN.md + Sitemap mit Blueprints + SEO + Content
→ `references/planung-und-seo.md` (Format), → `references/seitentyp-blueprints.md`.
1. **Sitemap**: jede Seite mit Slug, Seitentyp-Blueprint (§2.x), Primär-Keyword,
   Intent, Funnel-Rolle, **Sektionsliste in DOM-Reihenfolge** (aus dem Blueprint
   kopiert und angepasst).
2. **DESIGN.md**: Register, Dials, Visitor-Modes, Tokens (Farben OKLCH zweistufig,
   Typo-Clamp-Skala, Spacing, Radius konzentrisch, Motion-Tokens aus
   animation-rezepte.md §1), Flächen-Rhythmus (2 bis 3 Flächen, feste Folge),
   Funnel-Ziel und Label-Liste, Trust-Inventar (welche echten Zahlen existieren),
   Signature-Element, No-Gos, begründete Abweichungen.
   Vorher `ui-ux-pro-max` befragen (Palette, Font-Paar, Stil-Reasoning):
   ```bash
   python3 "/Volumes/STORAGE/05 SYSTEM/SKILLS/local/ui-ux-pro-max/scripts/search.py" "<branche> <seitentyp> <vibe>" --design-system --variance 5 --motion 3 --density 4 -f markdown
   ```
   Ergebnis ist Vorschlag, nicht Beschluss; DESIGN.md entscheidet. Belegt: für
   "Solar Lead-Gen seriös" liefert das Script Lila `#7C3AED` + Pink `#EC4899`, also
   den AI-Lila-No-Go. Farben daraus nie übernehmen, nur Pattern, Font-Paar und
   UX-Guidelines (`--domain ux`, `--domain typography`) verwenden. Palette kommt
   aus Marke plus handwerk.md §3.
3. **SEO-Plan**: Keyword-Map, On-Page-Spec pro Seite (Title, Meta, H1-H3, Schema
   je Seitentyp: Organization/LocalBusiness, FAQPage, Article, BreadcrumbList,
   Product, DefinedTerm), interne Links, Bilder-SEO.
4. **Content**: Texte VOR Layout, benefit-orientiert, Zahlen-Anker, Copy-Regeln aus
   sektionen-und-funnels.md. Jeder Trust-Slot ohne echte Zahl trägt
   `[TRUST: Zahl vom Kunden einholen]`.

### Phase 3: Dials setzen (1 bis 10, begründet)
`VARIANCE` · `MOTION` · `DENSITY` nach Register-Tabelle. "Motion behauptet = Motion
gezeigt": MOTION 5+ verlangt echte, begründete Bewegung (Sticky-Panels, Scroll-
gekoppelte Effekte), sonst bleibt es beim Business-Profil (animation-rezepte.md §2).

### Phase 4: Struktur und Conversion
→ `references/seitentyp-blueprints.md` §1 (Gesetze), §2 (Blueprints), §3 (Bausteine).
→ `references/sektionen-und-funnels.md` (Dramaturgie, Copy) und
→ `references/conversion-cro.md` (Typ-Diagnose, Hebel, Multi-Step-Handwerk, DSGVO).
Pflicht pro Seite: Hero-Formel (Benefit-H1 + Subline + 1 bis 2 CTAs + Trust-
Datenpunkt), Trust-Staffelung in 4 bis 5 Stufen, ein Funnel-Ziel, Endsequenz.
Funnel: Sachfragen zuerst, Kontakt zuletzt, Microcopy an der Datenabfrage,
Deep-Links mit vorbelegter Antwort, 4 Ausgänge, Danke-Seite mit nächsten Schritten.

### Phase 5: Design-System und Handwerk
→ `references/handwerk.md` (Pflicht): Root-Setup, Typo-Skala, Farb-Tokens, Radius/
Shadow/Outline, Layout-Grid, Button/Input/Radio-Cards mit allen States, Formulare
a11y, Fokus, Hit-Areas, Bilder, Live-Regions.
→ `references/design-doktrin.md` (Doktrin: Typo, OKLCH, Spacing, Layout-Disziplin).
→ Fonts: Adobe Fonts (`komponenten-ideation.md` §5), self-hosted, max. 2 Familien.
Craft Floor aus `~/.claude/skills/design/references/craft-floor-de.md` als
Checkliste in die DESIGN.md kopieren (Kontrast, Tiefe, Spacing, Typo, Motion, States,
Copy, Coverage).

### Phase 6: Komponenten-Ideation und Library-First
→ `references/komponenten-ideation.md` (Pflicht). Für jede Kernkomponente kurze
schriftliche Ideation: Idee, eine Stufe weiter, Referenz aus `research/sites/`,
Entscheidung in DESIGN.md. Pattern-Vorrat: `references/ui-inspo-patterns.md` und
`ui-inspo-bildanalysen.md`. 21st.dev zuerst (MCP `https://21st.dev/api/mcp`), dann
shadcn-Registries, dann selbst. Übernommenes an eigene Tokens anpassen.
unslop-ui-Check auf jeder Komponente: 70/20/10-Farbe, kein Icon-in-Box, kein Emoji,
kein Default-Serif, kein Glass, keine Default-Entrance-Animation.

### Phase 7: Motion (mit den emilkowalski-Skills, aber ruhig)
→ `references/animation-rezepte.md` (Pflicht, copybare Rezepte mit exakten Werten,
kalibriert auf Business-Sites: Reveal 600 ms / 16 px, Stagger max. 4 Gruppen,
Zähler 1400 ms, Akkordeon `grid-template-rows`, Button `scale(0.97)` 120 ms,
Cards nur Border/Shadow, Funnel-Step 150/250 ms, Marquee optional).
→ `references/motion.md` (Doktrin: Frequenz-Gate, Zweck, Easing-Baum, Dauer,
Interruptibility, Reduced Motion).
Ablauf je Seite:
1. **Frequenz-Gate** und **Zweck** für jede geplante Bewegung (motion.md §1 bis 2).
   Kein Zweck, keine Animation.
2. **Opportunities**: Verfahren aus `find-animation-opportunities` (Vorschlag mit
   exakten Werten, Annahme/Ablehnung je Stelle, nur was Orientierung, Feedback oder
   Kontinuität liefert).
3. **Bauen** nach `animate`-Reihenfolge (Tool → Properties → Kurve → Dauer →
   Interruption → Exit), Werte ausschließlich aus den Motion-Tokens.
4. **Feel-Check** (animation-rezepte.md §18): 10 %-Speed, Reduce-Mode, No-JS,
   4x CPU, Zählung der Bewegungsarten (5 bis 8).
5. **Review** im Before/After/Why-Format (`review-animations`), Block bei Popping,
   Stagger-Gesamt über 600 ms, Hover ohne `(hover: hover)`.
→ `references/effekte.md` nur bei MOTION 5+ oder Brief-Anforderung (Mesh-
Gradients, Scroll-Driven, Glass-Sonderfälle).

### Phase 8: Bild-Assets (Higgsfield)
→ `references/bild-assets.md`. Asset-Brainstorm (6 Fragen), Preview-Loop → Final,
Freisteller-Logik, Akzent als Rim-Light, Index mit deutschem Bildtext. Generierte
Assets ersetzen nie echte Fotos von Team, Referenzen, Standorten; solche Slots
werden als `[FOTO: Kunde liefert]` gekennzeichnet.

### Phase 9: Bauen
Vollständig, keine halben Sachen. Reihenfolge: Root-Setup (handwerk.md §1) →
Tokens → Primitives (Button, Input, Container, Section) → Bausteine (seitentyp-
blueprints §3) → Seiten in Sitemap-Reihenfolge → Funnel → Schema/SEO → Motion
zuletzt. Ein Akzent, ein Theme, eine Radius-Skala (Locks). Bei Rebuild-Aufträgen:
Code/Assets sind Ground Truth (review-qa.md §6).

### Phase 10: Gates, Screenshot-QA, Audit (Pflicht, in dieser Reihenfolge)
1. **Mechanische Gates** (Exit-Codes lesen, Befunde beheben, erneut laufen lassen):
   ```bash
   # Detector (impeccable, 61 Regeln; läuft ohne htmlparser2 im Degraded-Mode, dann Befunde als Untergrenze melden)
   node ~/.claude/skills/design/scripts/detect.mjs src app --json
   # AI-Slop-Scanner (Code-Signale typischer KI-Optik, deutsche Floskeln)
   node ~/.claude/skills/design/scripts/scan-ai-slop.mjs . --json --rules=$HOME/.claude/skills/design/scripts/rules.de.mjs
   # Dash-Grep, muss leer sein (sichtbarer Text)
   grep -rnE ' – | — ' src app content --include='*.tsx' --include='*.mdx' --include='*.md' | grep -v 'research/'
   # Motion-Verbote
   grep -rnE 'transition: ?all|ease-in[^-]|scale\(0\)' src app --include='*.css' --include='*.tsx'
   ```
2. **Craft Floor** (impeccable): alle 8 Checks bestanden, sonst kein Screenshot.
3. **Screenshot-QA** → `references/review-qa.md` + Protokoll in planung-und-seo.md
   §6: jede Seite, jeder State, 1440 px und 390 px, Sektion vollständig im Bild,
   nach jedem Fix neu schießen. Sichtprüfung gegen die Anti-Pattern-Tabelle in
   seitentyp-blueprints.md §4.
4. **impeccable-Commands** als Review-Pässe (`~/.claude/skills/design/references/commands-de.md`):
   `critique` (ehrliche Kritik mit Severity), `audit` (a11y/Performance/SEO),
   `harden` (Edge-Cases: leere States, lange Texte, Fehler), `polish` (Details),
   danach je nach Befund `quieter` (zu laut, meist der Fall) oder `bolder`
   (zu generisch), `distill` (zu viel), `clarify` (Copy unklar).
5. **Reporting-Contract** (handwerk.md §13): `| Severity | Location | Before | After | Why |`,
   Verdikt Block/Approve. Launch-Readiness (review-qa.md §7) und Anti-Slop-Kern
   (ui-inspo-patterns.md §4) vor Ship. "Fertig" nur mit Beleg (Screenshots, Gate-
   Ausgaben).

## Referenzen

| Datei | Phase | Inhalt |
|---|---|---|
| `references/seitentyp-blueprints.md` | 0, 2, 4, 9, 10 | Gesetze aller Referenzen, Blueprints je Seitentyp (Startseite Lead-Gen/SaaS, Leistung Landing/Hybrid, Produkt, Über-uns, Ratgeber-Übersicht/Artikel, Funnel, Referenzen/Case, Standort, Preis, Kontakt, Glossar, Branchen-LP), Bausteine mit Code-Skeletten, Anti-Patterns, Belege-Index |
| `research/README.md` + `research/sites/*.md` | 0 | 19 vollständige Site-Analysen (Sitemap, jede Seite als Sektionstabelle, Design-System, Animationen mit wörtlichen Werten, Synthese) |
| `references/animation-rezepte.md` | 7 | Diagnose "komisch/poppend", Motion-Tokens, Business-Profil, 15 copybare Rezepte (Reveal, Hero, Zähler, Akkordeon, Tabs, Sticky-Header, Buttons, Funnel-Step, Marquee, Carousel, Nav, Dialog, Icons), Reduced Motion, Feel-Check |
| `references/handwerk.md` | 5, 9, 10 | better-*-Handwerk als Code: Root-Setup, Typo, Farbe, Oberflächen, Layout, Controls, Formulare, Fokus, Hit-Areas, Bilder, Live-Regions, i18n, Reporting-Contract |
| `references/impeccable-regelwerk.md` | 1 bis 10 | Visitor-Modes, 61 Detector-Regeln, Craft Floor, Bolder/Quieter/Distill, Delight, Clarify, Hardening, Audit/Critique |
| `references/motion.md` | 7 | Motion-Doktrin: Frequenz-Gate, Zweck, Easing, Dauer, Interruptibility, Scroll, A11y, Bans |
| `references/planung-und-seo.md` | 2 | DESIGN.md-Format, Sitemap, Content, SEO-Plan, Screenshot-Protokoll |
| `references/sektionen-und-funnels.md` | 4 | Dramaturgie, Hero, Funnels, Trust, Copy |
| `references/conversion-cro.md` | 4 | Typ-Diagnose, CRO-Prozess, Hebel, Psychologie, Multi-Step, Checkout, Testing |
| `references/design-doktrin.md` | 5 | Typo, Farbe (OKLCH/APCA), Spacing, Layout, Komponenten, Regelkonflikte |
| `references/komponenten-ideation.md` | 6 | Ideation-Pflicht, 21st.dev/Registry-Workflow, Katalog, Adobe Fonts |
| `references/ui-inspo-patterns.md` / `ui-inspo-bildanalysen.md` | 6 | 10 Gesetze, Werte-Bibliothek, Signature-Moves, 66 Screen-Befunde |
| `references/effekte.md` | 7 (MOTION 5+) | Gradients, Figma→CSS, Glass, Scroll-Driven, 60fps |
| `references/bild-assets.md` | 8 | Higgsfield-Workflow |
| `references/review-qa.md` | 10 | Pre-Flight, Anti-Slop-Katalog, Review, Rebuild, Launch-Checkliste |
| `references/inspiration.md` | 0 | Quellen-Katalog |

Externe Skills, die dieser Skill einbindet (Pfade prüfen, bevor sie aufgerufen werden):

| Skill | Ort | Wofür |
|---|---|---|
| impeccable (Commands, Craft Floor, Detektoren) | `~/.claude/skills/design/references/` (craft-floor-de.md, commands-de.md, impeccable-detektoren.md) | Phase 5 Checkliste, Phase 10 Review-Pässe |
| design (detect.mjs, scan-ai-slop.mjs) | `~/.claude/skills/design/scripts/` | Phase 10 mechanische Gates |
| ui-ux-pro-max (search.py) | `/Volumes/STORAGE/05 SYSTEM/SKILLS/local/ui-ux-pro-max/` | Phase 2 Palette/Font/Stil-Vorschlag, `--domain gsap` nur bei MOTION 5+ |
| animate, find-animation-opportunities, emil-design-eng, review-animations, improve-animations | `/Volumes/STORAGE/05 SYSTEM/SKILLS/local/<name>/SKILL.md` (lokale Kopien von emilkowalski/skills; apple-design und animation-vocabulary sind in motion.md und animation-rezepte.md eingearbeitet) | Phase 7 Verfahren; Werte kommen aus animation-rezepte.md, nicht aus deren Layout-Beispielen |
| better-ui/-typography/-colors/-layout/-accessibility | `/Volumes/STORAGE/05 SYSTEM/SKILLS/local/` | in handwerk.md eingearbeitet; Original nur für Detailfragen |
| unslop-ui | `/Volumes/STORAGE/05 SYSTEM/SKILLS/local/unslop-ui/` | Phase 6 Komponenten-Check, Phase 10 Sichtprüfung |

## Redesign-Modus

Modus erkennen: Greenfield / Preserve / Overhaul. Audit vor jeder Änderung (Marken-
Tokens, IA, SEO-Baseline = Risiko #1, bestehende Zahlen und Testimonials sichern).
Nie still ändern: URL-Slugs, Nav-Labels, Formularfeld-Namen, Logo, Legal-Copy,
Telefonnummern. Hebel in Reihenfolge: 1 Struktur nach Blueprint (Hero-Formel,
Trust-Staffelung, Endsequenz) → 2 Typo → 3 Spacing → 4 Farbe (Akzent halten) →
5 Motion (meist: beruhigen) → 6 Voll-Ersatz nur wenn unrettbar.
