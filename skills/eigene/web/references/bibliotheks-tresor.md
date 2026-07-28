# Bibliotheks-Tresor — die echte API lesen statt sie zu raten

**Wofür:** Bevor eine Interaktion selbst gebaut oder eine Library aus dem
Gedächtnis importiert wird. Der Tresor liegt lokal unter
`/root/tools/uikit-vault` und enthält 30 kuratierte Libraries **installiert** —
mit README, Typdatei und echten Exportnamen. Kein Internet nötig, kein Raten
von Props, keine erfundenen Imports.

**Herkunft der Auswahl:** Emil Kowalskis kuratierte Liste
(`/root/tools/vendor/emilkowalski-skills/skills/pick-ui-library/SKILL.md`, MIT)
plus Raphaels Stack-Entscheidungen aus `radix-shadcn-tailwind-stack.md`. Die
Liste ist bewusst **eine Antwort pro Aufgabe**, keine Auswahl. Wer davon
abweicht, begründet es.

**Der Tresor ist kein App-Build.** Er wird nur gelesen. Für ein Kundenprojekt
wird die Library dort ganz normal per `npm install` hinzugefügt — der Tresor
sagt nur, *welche* und *wie sie wirklich heißt*.

## Werkzeug

```bash
node scripts/lib-lookup.mjs                # alle 30, sortiert nach Rolle
node scripts/lib-lookup.mjs sonner         # Version, Doku-Pfad, echte Exporte
node scripts/lib-lookup.mjs sonner --api   # dazu die rohen Typ-Zeilen
node scripts/lib-lookup.mjs --task toasts  # welche Library für welche Aufgabe
```

Beispielausgabe (echt, 28.07.):

```
sonner@2.0.7
Rolle:  toasts — Toasts / Benachrichtigungen
Doku:   /root/tools/uikit-vault/node_modules/sonner/README.md
Typen:  /root/tools/uikit-vault/node_modules/sonner/dist/index.d.ts
Export: Toaster, toast, useSonner
```

Exit 1 heißt: Library gelistet, aber nicht installiert (`cd /root/tools/uikit-vault && npm install`)
oder Aufgabe nicht abgedeckt. Exit 2 heißt: kein Tresor am erwarteten Pfad.

**Pflicht bei jeder Library-Nutzung im Build:** erst `lib-lookup` auf die
Library, dann den README-Pfad öffnen und das Muster von dort übernehmen.
Ein Import, der nicht in der `Export:`-Zeile steht, existiert nicht.

## Die Zuordnung — eine Library pro Aufgabe

| Aufgabe | Library | Warum genau die |
|---|---|---|
| Unstyled A11y-Primitives (Dialog, Popover, Menü, Select) | `@base-ui/react` | Fokus-Falle, Tastatur, Dismiss sind gelöst. Optik komplett über Tailwind. |
| Command-Palette (⌘K) | `cmdk` | Filter-Scoring eingebaut, sonst baut man Fuzzy-Suche selbst. |
| Toasts | `sonner` | Stapel, Swipe, Promise-Toasts — nie von Hand bauen. |
| Einmalcode / OTP | `input-otp` | Ein Feld pro Ziffer mit Paste-Verhalten ist überraschend schwer. |
| Drawer / Bottom-Sheet | `vaul` | Drag mit Snap-Points, iOS-Verhalten. |
| Regler-Panel (Prototyp, Demo) | `leva` | Nur für Prototypen — nie im Kunden-Build. |
| Springs, Layout-/Exit-Animationen in React | `motion` | Siehe `motion-doktrin.md`. |
| Scroll-Sequenzen, Timelines, SVG | `gsap` | Abgrenzung zu `motion`: `motion-gsap.md`. |
| Zahlen animieren (Zähler, Preise, KPIs) | `@number-flow/react` | Ziffern-Übergang statt neu gerendertem Text. |
| Echtzeit-/Streaming-Diagramme | `liveline` | Punkte kommen live rein, Chart scrollt mit der Zeit. |
| Alle anderen Diagramme | `recharts` | Zusätzlich `dataviz`-Regeln beachten. |
| Drag and Drop | `@dnd-kit/core` (+ `/sortable`) | Tastatur-Sensor inklusive — Maus-only ist ein A11y-Fehler. |
| Lange Listen, große Tabellen | `react-virtuoso` | Vor jedem Pagination-Behelf. |
| Tabellen-Logik ohne Optik | `@tanstack/react-table` | Sortierung/Filter headless, Optik bleibt Projektsache. |
| Karussell | `embla-carousel-react` | Leicht, Touch-korrekt. |
| Formular-Zustand | `react-hook-form` | Unkontrollierte Felder → kein Re-Render pro Tastendruck. |
| Schema-Validierung | `zod` | Ein Schema für Client und Server. |
| Geteilter Zustand | `zustand` | Statt `useState`-Ketten durch fünf Ebenen. |
| Bedingte Klassen | `clsx` | Für Ad-hoc-Bedingungen. |
| Widersprüchliche Tailwind-Klassen | `tailwind-merge` | `cn()` = `clsx` + `twMerge`. |
| Echte Varianten (size, intent, state) | `class-variance-authority` | Erst ab echter Varianten-Achse, sonst `clsx`. |
| Hell/Dunkel ohne Flackern | `next-themes` | Inline-Script vor Hydration. |
| Icons | `lucide-react` | Einzeln importieren, nie das Barrel. |
| Datum | `date-fns` | Baumschüttelbar, kein Moment.js. |
| 3D-Globus | `cobe` | Ein Canvas, kein Three.js-Stack. |
| OG-Bilder aus HTML/CSS | `satori` | Für dynamische Social-Vorschauen. |
| Syntax-Hervorhebung | `shiki` | Baut zur Build-Zeit, kein Client-JS. |
| Volle Theme-Engine | `@radix-ui/themes` | **Nur** ohne eigenes Brand-Design — siehe `radix-shadcn-tailwind-stack.md` Regel 2. |
| Fertige gestylte Komponenten | `@appica/ui-react` | Zweite Quelle neben shadcn — siehe `shadcn-arbeitsweise.md`. |

## Lizenzen (geprüft am 28.07.26 aus den installierten `package.json`)

- **MIT** (26 Libraries): base-ui, appica, dnd-kit (core+sortable), number-flow,
  radix-themes, tanstack-react-table, clsx, cmdk, cobe, date-fns, embla,
  input-otp, leva, liveline, motion, next-themes, react-hook-form,
  react-virtuoso, recharts, shiki, sonner, tailwind-merge, vaul, zod, zustand.
  Kunden-Builds unbedenklich.
- **Apache-2.0**: `class-variance-authority` — unbedenklich, NOTICE beachten.
- **ISC**: `lucide-react` — unbedenklich.
- **MPL-2.0**: `satori` — unbedenklich bei Nutzung als Abhängigkeit.
  Änderungen *an der Library selbst* müssten offengelegt werden; wir ändern sie nicht.
- **GSAP Standard "no charge" License** (kein OSS-Kürzel):
  `gsap.com/standard-license`. Nicht mit MIT verwechseln. Vor dem ersten
  kommerziellen Kunden-Build mit GSAP die Lizenzseite lesen — siehe `motion-gsap.md`.

Bei jeder neuen Library im Tresor: Lizenz aus der installierten `package.json`
lesen und hier eintragen, bevor sie in einem Kundenprojekt landet.

## Falscher Fall

Ein Toast wird mit `motion` und einem eigenen `useState`-Stapel nachgebaut,
weil das Modell die Props von `sonner` nicht sicher wusste. Ergebnis: 120
Zeilen ohne Swipe-Dismiss, ohne Stapel-Logik, ohne Fokus-Rückgabe — und ein
Detektor-Fund im Craft-Check. Richtig: `node scripts/lib-lookup.mjs sonner`,
README lesen, `<Toaster />` einbauen, fertig.

Zweiter falscher Fall: `import { toast, Toaster, ToastProvider } from 'sonner'` —
`ToastProvider` steht nicht in der `Export:`-Zeile und existiert nicht. Genau
dafür ist das Werkzeug da.
