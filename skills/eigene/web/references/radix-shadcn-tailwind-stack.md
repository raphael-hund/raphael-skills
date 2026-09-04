# Default-Stack — Next.js + Tailwind + Radix/shadcn + Motion

**Wofür:** Konkrete Setup-Entscheidungen für Raphaels Standard-Agenturprojekte
(kein Enterprise-Marken-System nötig, siehe `_archiv/design-systeme-vergleich.md` §1
für die Abgrenzung). Motion-Prinzipien dupliziert dieser Skill nicht — die
stehen in `motion-doktrin.md` (wann/wie animieren) und `ui-components/INDEX.md`
(fertiger Motion-Code).

**Herkunft Radix-Fakten:** `/root/tools/vendor/radix-themes` Source gelesen
(Komponentenliste, Token-/Props-Struktur, Stand 20.07.26). Aussagen zu shadcn
und Motion aus Fachwissen, nicht per WebFetch nachverifiziert diese Runde.

## Regeln

1. **Ein Layer pro Zweck, nicht doppelt.** Tailwind = Utility-Layer für Layout/
   Spacing/Farbe. Radix Primitives = A11y-/Verhaltens-Layer für interaktive
   Komponenten (Dialog, Dropdown, Popover, Tabs, Select …). shadcn/ui = die
   Brücke: Radix-Primitives + Tailwind-Klassen, als Code in `components/ui/`
   **kopiert**, nicht als npm-Paket importiert — deshalb volles Styling-Recht,
   kein Versionskonflikt, keine Blackbox.
2. **Radix Themes NUR wenn die volle Theme-Engine gewollt ist** (Scaling-Faktor,
   automatische 12-stufige Farbskalen, `<Theme>`-Provider). Für die meisten
   Agentur-Projekte reicht **Radix Primitives + shadcn + eigenes Tailwind-Theme**
   — mehr Kontrolle über die Marken-Optik als die fertige Radix-Themes-Optik.
   Radix Themes selbst passt eher bei internen Tools ohne eigenes Brand-Design
   (siehe Vergleichstabelle).
3. **Komponenten-Wahl: Primitive zuerst prüfen, dann selbst bauen.** Radix
   deckt (Auszug, Quelle: Komponentenliste im Source) u.a. ab: `Dialog`,
   `AlertDialog`, `DropdownMenu`, `ContextMenu`, `Popover`, `HoverCard`,
   `Tooltip`, `Select`, `RadioGroup`/`RadioCards`, `CheckboxGroup`/
   `CheckboxCards`, `Switch`, `Slider`, `Tabs`/`TabNav`, `SegmentedControl`,
   `ScrollArea`, `Table`, `DataList`, `Avatar`, `Badge`, `Callout`, `Skeleton`,
   `Spinner`, `Progress`, `Separator`, `VisuallyHidden`, `Portal`. Braucht ein
   Interface eines davon — Radix-Primitive + shadcn-Pattern nehmen, nicht neu
   erfinden (A11y-Fokus-Management/Tastaturnavigation ist bereits gelöst).
   Fehlt eine Komponente in der Liste (z.B. reine Marketing-Hero-Sections,
   Bento-Grids, individuelle Layouts) → eigenes Tailwind-Markup, kein
   Primitive erzwingen.
4. **Tailwind-Konfiguration = Marken-Tokens, nicht Radix-Tokens duplizieren.**
   Farbpalette, Radius-Skala, Font-Stack im Tailwind-Theme aus dem Kunden-
   Briefing ableiten (Brand-Farben, nicht Radix-Default-Blau). Wird Radix
   Primitives verwendet, bekommen die unstyled Primitives ihre Optik komplett
   über Tailwind-Klassen — Radix liefert nur Verhalten/A11y, keine Optik.
5. **Motion nur für das, was CSS-Transitions nicht können.** Installiert wird
   Paket `motion`, importiert wird aus `motion/react`; Paket und Imports von
   `framer-motion` sind blockiert. Motion dient Layout-Animationen
   (`layout`-Prop), Exit-Animationen (`AnimatePresence` beim Unmount von
   Dialogen/Tooltips), Drag-/Gesten-Interaktionen und orchestrierten Sequenzen.
   Einfache Hover-/Fokus-Übergänge bleiben CSS (`transition-colors` etc.) —
   Motion nicht für jeden Button-Hover einbinden (Bundle-Size, unnötige
   Client-Component-Grenze in Next.js).
6. **Motion-Entscheidungen (Timing, Kurven, Reduced-Motion) kommen aus
   `motion-doktrin.md` — hier nicht neu definieren.** `motion/react` ist nur die
   technische Umsetzung der dortigen Vier-Fragen-Prüfung.
7. **Next.js App Router als Grundstruktur** (siehe `_archiv/design-systeme-vergleich.md`
   §4): Radix-Dialog/Popover/DropdownMenu sind Client-Components (State,
   Browser-Events) — `"use client"` gezielt nur auf diese Komponenten setzen,
   Server Components bleiben Default für alles, was keine Interaktivität
   braucht (Seiteninhalt, Layout-Shell).

## Taktiken

- **Setup-Reihenfolge:** Next.js-Projekt → Tailwind konfigurieren (Marken-
  Tokens) → shadcn-CLI initialisieren (nutzt Radix Primitives unter der Haube)
  → einzelne Komponenten gezielt hinzufügen, nicht die ganze Bibliothek auf
  einmal (Bundle-Disziplin).
- **Theme-Wechsel (Hell/Dunkel):** über Tailwind `dark:`-Klassen + CSS-
  Variablen im `:root`/`.dark`-Selektor, nicht über Radix-Themes-`<Theme>`-
  Provider, außer das Projekt nutzt bewusst die volle Radix-Themes-Engine
  (Punkt 2).
- **Formulare:** Radix-Primitives (`Select`, `CheckboxGroup`, `RadioGroup`,
  `Switch`) für alles mit Tastatur-/Screenreader-Anforderungen, native
  `<input>`/`<textarea>` (Tailwind-gestylt) für Freitextfelder — kein Radix-
  Overhead für simple Textfelder.
- **Tabellen/Daten-Listen:** Radix `Table`/`DataList` als Grundgerüst, bei
  Analytics-lastigen Ansichten die Carbon-Data-Viz-Regeln aus
  `_archiv/design-systeme-vergleich.md` §3 für Diagramme daneben anwenden (Radix hat
  kein eigenes Chart-System).
- **Vor jedem `AnimatePresence`-Einsatz:** prüfen, ob `useReducedMotion()`-
  Äquivalent aktiv ist — gilt genauso wie in `ui-components/INDEX.md` gefordert;
  Motion respektiert `prefers-reduced-motion` nicht automatisch.

## Beispiel

Kunden-Brief: "Modernes B2B-SaaS-Onboarding, eigene Markenfarbe Petrol,
soll sich nicht wie ein 08/15-Template anfühlen."

→ Next.js App Router, Tailwind-Theme mit Petrol als Primärfarbe (kein Radix-
Blau), shadcn-`Dialog`/`Select`/`Tabs` für den Onboarding-Flow (A11y gelöst,
Optik komplett über Tailwind), Motion (`motion`/`motion/react`) nur für den
Schritt-Übergang im Onboarding-Wizard (`AnimatePresence` beim Step-Wechsel,
Timing/Kurve nach Timing-Tabelle in `motion-doktrin.md`), Radix Themes NICHT
eingesetzt (würde eigene Farbwelt überschreiben, siehe Regel 2).
