---
name: impeccable
version: 0.1.0
description: >
  Feuert bei Frontend-Design-Arbeit, die über "funktioniert" hinausgehen soll:
  Design bauen, redesignen, kritisieren, auditieren, polieren, vereinfachen,
  härtener, animieren, kolorieren, typographieren, layouten, begeistern,
  klären, anpassen, optimieren — oder bei der Frage "sieht das nach AI aus?"
  / "mach es bolder/quieter". Liefert die Kommando-Sprache (23 Befehle wie
  `audit`, `critique`, `polish`, `bolder`, `quieter`, `distill`, `animate`,
  `colorize`, `typeset`, `layout`, `delight`, `clarify`, `harden`, `adapt`,
  `optimize`) und den Craft-Floor (Qualitäts-Mindeststandard) für Web-UI.
  Der design-Skill bleibt die kanonische Wissensquelle; impeccable ist die
  Arbeits- und QA-Sprache. Trigger: "Design review", "UI audit", "polish this",
  "make it bolder", "landing page critique", "sieht nach AI aus", "Slop check",
  "Design verbessern", "animate this", "typography fix".
class: F
scope: agency
sensitivity: internal
source: vendored — pbakaus/impeccable v4.0.1 @ bdaa5a4 (Apache-2.0), destilliert
  auf die Kommando-Sprache + Craft-Floor; CLI/Setup/Hooks/PRODUCT.md-Flow
  NICHT übernommen (siehe VENDORING.md im design-Skill)
loads:
  - references/craft-floor-de.md
  - references/commands-de.md
requires_skills: []
completion_criteria:
  - "Jede Design-Änderung endet mit craft-floor-Check (Kontrast, Tiefe, Spacing, Typo, Motion, States, Copy, Coverage) — alle 8 grün"
  - "Jede kritisierte/auditierte Fläche hat benannten Modus (Persuade/Operate/Read/Experience) + benanntes Register (brand/product)"
  - "Finale QA läuft über die deterministischen Detektoren im design-Skill (Exit 0) — impeccable ersetzt das nicht"
---

# impeccable — Design-Kommandosprache + Craft-Floor

**Zweck (1 Satz):** Design-Arbeit über "funktioniert" hinausheben — mit einer
präzisen Kommando-Sprache und einem nicht verhandelbaren Qualitäts-Floor.

**Verhältnis zu design:** Der **design**-Skill ist die kanonische Wissensquelle
(Doktrin, taste-/ui-ux-Linien, deterministische Detektoren). impeccable ist die
**Arbeits- und QA-Sprache**: die 23 Kommandos, mit denen man eine Fläche
benennt, angreift und abnimmt. Wenn design geladen ist, lädt impeccable mit —
als Vokabular, nicht als Ersatz. Finale QA bleibt `node scripts/detect.mjs`
Exit 0 aus design.

## Zwei Register, vier Modi

Vor jeder Aktion benennen (eine Zeile):

- **Register:** `brand` (Landing/Marketing/Portfolio — Design IST das Produkt)
  oder `product` (App/Dashboard/Tool — Design DIENT dem Produkt).
- **Modus:** `Persuade` (Besucher entscheidet + handelt) · `Operate` (Besucher
  erledigt Aufgabe) · `Read` (Besucher versteht) · `Experience` (Besucher ist
  im Werk).

Das Register wählt die Doktrin-Linie (brand → taste-Linie, product → ui-ux-Linie);
der Modus entscheidet, was Erfolg auf dieser Fläche bedeutet.

## Die 23 Kommandos (Kurz-Index)

**Bauen:** `craft` (neue Fläche, voller Prozess) · `init` (Kontext erfassen) ·
`shape` (UX/UI planen vor Code) · `document` (DESIGN.md aus Bestand) ·
`extract` (Tokens/Komponenten ins System ziehen)

**Bewerten:** `critique` (UX-Review: Hierarchie, Klarheit, Resonanz) ·
`audit` (technische Qualität: A11y, Performance, Responsive)

**Verfeinern:** `polish` (letzter Schliff vor Ship) · `bolder` (zu sicher →
mutiger) · `quieter` (zu laut → ruhiger) · `distill` (auf Essenz reduzieren) ·
`harden` (Fehlerfälle, i18n, Edge-Cases) · `onboard` (First-Run, Empty-States)

**Verbessern:** `animate` (Motion mit Absicht) · `colorize` (strategische Farbe) ·
`typeset` (Typo-Hierarchie/Fonts) · `layout` (Spacing/Rhythmus/Hierarchie) ·
`delight` (Persönlichkeit/Momente) · `overdrive` (technisch außergewöhnlich)

**Reparieren:** `clarify` (UX-Copy, Labels, Fehlermeldungen) · `adapt`
(Devices/Breakpoints) · `optimize` (UI-Performance)

**Iterieren:** `live` (Browser-Variantenmodus — nur wenn impeccable-CLI
verfügbar; sonst manuell)

Details und Ablauf je Kommando: `references/commands-de.md`.

## Craft-Floor (nicht verhandelbar, vor jedem "fertig")

Jede gebaute/geänderte Fläche muss diese 8 Prüfungen bestehen — nicht als
Absicht, sondern als gebautes Ergebnis:

1. **Kontrast:** Body/Placeholder ≥ 4.5:1, großer Text ≥ 3:1. Auf Farbflächen
   Sekundärtext aus demselben Hue oder der Vordergrundfarbe tönen — nie grau.
2. **Tiefe:** Schatten haben Offset + weichen Blur. Ein farbiger Halo ohne
   Offset ist Dekoration, keine Tiefe.
3. **Spacing:** Enge Gruppen, großzügige Trennung; über einer Überschrift mehr
   Platz als darunter. Die computed values lesen, nicht schätzen.
4. **Typo:** Body-Maß 65–75ch, Display max 6rem, Tracking-Floor -0.04em,
   balanced Headings, offensichtliche Scale-/Gewichts-Sprünge. Echte Copy bei
   jedem Breakpoint laufen lassen, Überläufe fixen.
5. **Motion:** EIN authored Moment, nicht verstreute Effekte und nicht derselbe
   Entrance auf jeder Sektion. Exponentielles Ease-Out aus sichtbarem Default.
   Über transform/opacity hinaus: blur, backdrop-filter, clip-path, mask,
   shadow — wenn es smooth bleibt.
6. **States:** hover, disabled, loading, error, empty. Plus echte Inhalte,
   funktionierende Controls, responsive Komposition, Keyboard-Fokus.
7. **Copy:** Die Sprache des Produkts. Controls benennen ihre Aktion; Fehler
   benennen Problem + Ausweg.
8. **Coverage:** Jede Brief-Anforderung ist vorhanden und in Sekunden auffindbar.

## Refuse (Kategorie-Defaults, keine Bans — der Brief kann sie verdienen)

Diese Elemente sind Slop, wenn sie unentschieden sind. Sie zu wählen, wenn die
Achse frei ist, heißt: nicht entschieden. Der Fix ist Umschreiben des Elements,
nicht Abschwächen.

- Gleich große Cards (Icon + Heading + Text) als Seitenstruktur. Cards sind der
  faule Container; verschachtelte Cards sind immer falsch.
- Hero-Metrik-Template (große Zahl, kleines Label, Supporting-Stats, Akzent).
- Getrackte Uppercase-Eyebrow über jeder Sektion. Ein benannter Kicker ist ein
  System; eine Eyebrow überall ist ungewählte Grammatik.
- Sektions-Nummern (01/02/03), außer die Sequenz trägt Information.
- Modal für eine Aufgabe, die weder Unterbrechung noch geschützten Fokus braucht.
- Gradient-Text. Betonung kommt aus Gewicht oder Größe.
- Glass/Blur als Dekoration statt als spezifischer Effekt.
- Farbiger `border-left`/`border-right` über 1px auf Cards/List-Items/Callouts/Alerts.
- Sparklines, Progress-Rings, Soft-Shadow-Rounded-Rects als Content-Ersatz.
- Monospace als "technisch"-Kostüm statt für Code/Daten/Messung.
- Light/Dark nach Kategorie gewählt. Aus der Nutzungsszene wählen: wer, wo,
  welches Umgebungslicht.

## Arbeitsweise

1. **Register + Modus benennen** (eine Zeile), dann die passende Doktrin-Linie
   aus design laden.
2. **Kommando wählen** aus der Tabelle oben. Kein Kommando passt → als allgemeine
   Design-Arbeit behandeln, `craft`-Logik folgen.
3. **Ist-Zustand prüfen** — mindestens eine repräsentative Quelle visueller Wahrheit
   (Tokens, Theme, CSS, Komponente, Asset) lesen, bevor editiert wird.
4. **Craft-Floor direkt vor dem Editieren laden** (`references/craft-floor-de.md`).
5. **Nach dem Editieren:** Craft-Floor-Check (8 Punkte) + deterministische
   Detektoren aus design (`node scripts/detect.mjs` Exit 0).
6. **Nie Drift als Nebeneffekt reparieren.** Ein `CONTEXT_STALE`-Fund wird
   gemeldet, nicht still behoben.

## Gotchas

- **impeccable ersetzt nicht design.** Die kanonische Doktrin, die Konflikt-
  Entscheidungen (Em-Dash, Cards, Tracking, Serif) und die deterministischen
  Detektoren leben im design-Skill. impeccable liefert die Kommando-Sprache
  und den Craft-Floor — mehr nicht.
- **Kein Setup-Flow.** Upstream-impeccable hat `context.mjs`, `PRODUCT.md`,
  `init`, `hooks`, `pin`, `doctor`. Das ist hier **nicht** Teil des Skills —
  nur die Kommando-Sprache + Craft-Floor wurden übernommen (siehe
  `design/VENDORING.md`).
- **Ein Detektor-Fund ist Defekt-Evidenz, kein Qualitätsbeweis.** Auch mit
  Exit 0 muss die gerenderte Erfahrung und der echte Interaktionspfad geprüft
  werden (Screenshot-Pflicht aus design).
- **Refinement bewahrt, Redesign ersetzt.** Wer "nur mal polish" sagt, aber das
  Konzept austauscht, macht verdecktes Redesign. Wenn das Konzept falsch ist:
  sagen, nicht schmuggeln.
- **Brief schlägt Gewohnheit.** Ein gepinnter Brief oder eine committed visual
  world überstimmt jede Regel hier — die eigene Gewohnheit tut es nicht.
- **Deutsche Copy-Slop gehört zu copywriting/no-ai-slop, nicht hierher.**
  impeccable prüft Design, nicht Text-Tells.
