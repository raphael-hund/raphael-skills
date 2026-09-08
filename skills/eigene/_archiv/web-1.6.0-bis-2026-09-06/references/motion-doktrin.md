# Motion im Web-Build — wo die Werte stehen, und was hier dazukommt

Die allgemeinen Motion-Werte stehen in
`/root/raphael-skills/skills/design/references/motion-doktrin.md`
(Fusion aus `emil-design-eng` + `review-animations` inkl. STANDARDS.md, MIT).
Dort: Frequenz-Gate, Zweck-Liste, Easing-Kurven, Dauer-Tabelle, Physicality,
Interruptibility, Performance, Accessibility, Kohäsion, Stagger, Recipes,
Review-Format, die zehn Standards, Eskalations-Trigger, Remedial-Hierarchie.

**Herkunft:** kondensiert aus `starc007/ui-components` ("beUI v2"),
`app/docs/motion-patterns/motion-patterns.tsx` — MIT-Lizenz, Details in
`VENDORING.md` im Repo-Root (`/root/raphael-skills/VENDORING.md`).

> **Warum das so getrennt ist:** Bis 29.07. lagen hier 91 eigene Zeilen mit
> einer zweiten, dünneren Motion-Doktrin (Herkunft `starc007/ui-components`).
> Sie widersprach der eigenen Regel des Skills — „design ist die einzige
> Design-Wissensquelle" — und sie war schwächer: keine Frequenz-Tabelle, keine
> Eskalations-Trigger, keine exakten Kurven. Wer sie las, hielt Motion für
> geprüft und hatte die Hälfte der Regeln nie gesehen. Zwei Doktrinen sind
> keine doppelte Sicherheit, sondern eine Lücke mit zwei Namen.

## Reihenfolge bei jeder Motion-Aufgabe

1. **design-Doktrin lesen** (Pfad oben) — Frequenz-Gate zuerst. Die häufigste
   richtige Antwort ist „gar nicht animieren".
2. **Werkzeug wählen** — Entscheidungstabelle in `_archiv/motion-gsap.md`
   (CSS-Transition / Framer Motion / GSAP).
3. **Fertige Komponente prüfen** — steht die Interaktion schon in
   `ui-components/INDEX.md` oder im Tresor (`bibliotheks-tresor.md`)?
   Passenden Code über `inspirations-quellen.md` tatsächlich lesen und integrieren.
4. **Vollaudit über ein ganzes Repo** → `design`-Skill,
   `design/references/motion-audit-workflow.md` (4-Fragen-Gate + 8 Audit-Kategorien).
   Einzelnes Diff-Review kommt mit der design-Doktrin allein aus.
5. **Gesten, Drag, Sheets, „iOS-Feel"** → `design`-Skill,
   `design/references/apple-fluid-interfaces.md` (Velocity-Handoff,
   Momentum-Projektion, Rubber-banding, Materials).

## Scroll-Referenz in konkrete Bewegung übersetzen

Für eine gewählte Scroll-/Layer-Referenz vor dem Bau im bestehenden Plan
festhalten: **Zweck → Ebenen/Elemente → Auslöser → Verlauf → Endzustand →
mobile und reduzierte Variante**. Werte im Quellcode prüfen, falls verfügbar;
aus dem Video geschätzte Wege oder Geschwindigkeiten als Ableitung benennen.

- **Layering:** Benannte Vorder-, Mittel- und Hintergründe nur trennen, wenn sie
  unabhängig laufen sollen. Beispiel: hinterer Berg, mittlerer Berg,
  Produktansicht, vordere Baumlinie. Pro Ebene Überdeckung und relativen
  Bewegungsweg bestimmen. Anzahl und Motiv folgen dem Auftrag; vier Ebenen sind
  keine Vorgabe. Assets nach `bildgenerierung.md` Abschnitt Layering; Text und
  Bedienung bleiben echte DOM-Elemente.
- **Auslöser unterscheiden:** Ein Reveal startet beim Sichtbarwerden;
  Scrubbing bindet Fortschritt an die Scrollposition; Pointer-Parallax folgt
  dem Zeiger. Eine automatisch laufende Animation ist kein Beleg für
  Scroll-Reaktion. Bei Scrubbing muss dieselbe Scrollposition denselben Zustand
  ergeben, auch rückwärts; Ein-/Ausstieg und Unterbrechung mitplanen.
- **Scrollen bleibt bedienbar:** „Scroll lock“ aus einer Demo bedeutet nicht
  automatisch gesperrtes natives Scrollen. Pinning nur mit benanntem Bereich
  und sauberem Ausstieg; Seite, Anker und CTA bleiben erreichbar. Keine neue
  Scroll-Library allein für einen Reveal installieren.
- **Mobil passend umsetzen:** Ein Kartenstapel darf zur normalen Liste,
  Pointer-Effekt zur ruhigen Komposition werden. Aussage, Inhalt und Bedienung
  erhalten; die gewählte Variante ausdrücklich festlegen. Reduced Motion zeigt
  den verständlichen Inhalt ohne Parallax oder notwendige Scroll-Wartezeit.

Ein neuer Motion-Effekt braucht den Zweck aus der zentralen Design-Doktrin;
eine Referenz erzeugt keine Animationspflicht. Den laufenden Übergang nach
`qa-faecher.md` prüfen, einschließlich sichtbarer Nähte zwischen Abschnitten.

## Die Token in `ui-components/lib/ease.ts` — und der eine Konflikt

Jede Komponente unter `ui-components/motion/` importiert ihre Physik aus
`lib/ease.ts`. Die Springs dort (`SPRING_PRESS`, `SPRING_SWAP`, `SPRING_PANEL`,
`SPRING_LAYOUT`, `SPRING_MOUSE`) sind mit den Komponenten zusammen entstanden und
bleiben unverändert — sie sind aufeinander abgestimmt, nicht einzeln austauschbar.

**Konflikt, entschieden:** `EASE_OUT` steht dort als `[0.16, 1, 0.3, 1]`, die
design-Doktrin nennt `cubic-bezier(0.23, 1, 0.32, 1)`. Beides sind starke
Ease-Out-Kurven, beide erfüllen die Regel „CSS-Standard-Easings sind zu schwach".

| Wo | Welche Kurve | Warum |
|---|---|---|
| Komponenten aus `ui-components/` unverändert übernommen | `[0.16, 1, 0.3, 1]` bleibt | Vendorierter Code wird nicht umgeschrieben. Die Kurve ist auf die Springs derselben Datei abgestimmt. |
| **Neuer eigener CSS/Motion-Code im Projekt** | `cubic-bezier(0.23, 1, 0.32, 1)` | design ist die kanonische Quelle. Ein Projekt mit zwei Ease-Out-Kurven hat keine Motion-Sprache. |
| Beides im selben Projekt | Eine wählen und in den Projekt-Tokens festschreiben | Der Unterschied ist klein, die Uneinheitlichkeit ist der Befund. |

`scripts/motion-check.mjs` erkennt Kurven und weitere Quelltextmuster.
Die tatsächliche Wirkung braucht die Runtime-Prüfung aus `qa-faecher.md`.

Wer eine Komponente aus `ui-components/` **anfasst**, zieht sie auf die
Projekt-Kurve — ab dann gehört die Datei dem Projekt (gleiche Logik wie bei
`shadcn add`, siehe `shadcn-arbeitsweise.md`).

## Reduced Motion ist hier Pflicht, nicht Empfehlung

Die globale CSS-Media-Query stoppt **keine** JS-Animation. Jede Komponente aus
`ui-components/` braucht deshalb ihr Framework-Äquivalent:

| Werkzeug | Äquivalent |
|---|---|
| CSS-Transition/Animation | `@media (prefers-reduced-motion: reduce)` |
| Framer Motion (`motion`) | `useReducedMotion()` |
| GSAP | `gsap.matchMedia()` — **nicht** `useReducedMotion()`, siehe `_archiv/motion-gsap.md` |

Reduced Motion heißt sanfter, nicht null: Opacity- und Farbwechsel bleiben,
Bewegung/Skalierung/Parallax fallen weg (design-Doktrin §8).

## Touch-Phantom-Hover

`ui-components/lib/hooks/use-hover-capable.ts` gatet Hover-Motion gegen Touch —
ein Tap feuert sonst `:hover` und die Animation bleibt nach dem Loslassen
hängen. CSS-Äquivalent: `@media (hover: hover) and (pointer: fine)`.
Beides erfüllt dieselbe Regel aus der design-Doktrin; im React-Code ist der Hook
der zuverlässigere Weg, weil er auch JS-Handler gatet.

## Die fünf Recipes der Komponenten-Bibliothek

Sie ergänzen die Recipes der design-Doktrin um genau die Fälle, für die in
`ui-components/` fertiger Code liegt. Zweck und Vermeidungen stehen dabei —
ohne Zweck fällt die Animation im 4-Fragen-Gate ohnehin durch.

| Recipe | Zweck | Code | Vermeiden |
|---|---|---|---|
| **Press-Feedback** | bestätigt, dass die Eingabe angekommen ist | `motion/button/base.tsx`, `SPRING_PRESS` | große Skalensprünge, langsames Zurückfedern, Spring auf jedem Kind |
| **Semantische Icon-Motion** | verstärkt, *was* die Aktion tut, ohne zweites Label | `motion/action-swap*.tsx` | derselbe generische Bounce auf jedem Icon; ungegatetes Touch-Hover |
| **Content-Reveal** | neuer Inhalt erscheint nicht als harter Schnitt | `motion/scroll-reveal.tsx`, `text-cascade.tsx` | halbsekündige UI-Entrances, Stagger über jedes kleine Kind |
| **Layout-Continuity** | Objekt-Identität bleibt, während sich der Footprint ändert | `motion/expanding-arrow-button.tsx`, `shared-layout-bg.tsx`, `SPRING_LAYOUT` | Width-Tweens; Text erscheint, bevor die Fläche Platz gemacht hat |
| **Content-Swap** | Inhalt hat gewechselt, Kontext steht still (Tabs, Filter) | `motion/tabs.tsx`, `swap.tsx`, `SPRING_SWAP` | seitengroße Übergänge für häufig gewechselte Views |

Reihenfolge im Swap: das alte Element geht schneller als das neue kommt, Travel
nur wenige Pixel. Bei Layout-Continuity zuerst die Form bewegen, dann das Label
einblenden.

## Was der Prüfer davon sieht

`craft-check.mjs` misst am gerenderten DOM: M18 (`prefers-reduced-motion`
vorhanden, wenn animiert wird), M19 (`transition-property: all`), T7
(Springy-Hover-Reflex), M20 (Anzahl animierter Elemente als INFO, keine
Vorgabe für die Zahl der Effekte). Alles andere aus der design-Doktrin
— Easing-Richtung, Dauer, Origin, Interruptibility — ist **nicht** maschinell
geprüft und braucht den Review nach dem Tabellen-Format der design-Doktrin.
