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

### Wenn die Typdatei nur weiterleitet

Sechs der 30 Libraries beschreiben ihre API nicht direkt in der Datei, auf die
`package.json` zeigt:

| Library | Form | 
|---|---|
| `leva` | `export * from './declarations/src/index.js'` |
| `motion` | `export * from 'framer-motion/dom'` (Fremdpaket) |
| `zustand` | `export * from 'zustand/vanilla'` + `/react` |
| `date-fns` | `export *` auf ~300 Einzeldateien |
| `clsx` | zwei Typdateien: `.d.mts` (benannt) und `.d.ts` (`export = clsx`) |
| `gsap` | `/// <reference path=…>` × 32 + `declare namespace gsap` |

Bis 29.07.2026 gab `lib-lookup` für diese eine **leere Export-Zeile bei Exit 0**
aus. Das liest sich wie „diese Library hat keine Exporte" — und ist damit genau
die Verwechslung, gegen die der Tresor gebaut wurde: *nicht hingeschaut* sah aus
wie *es gibt nichts*. Wer daraufhin aus dem Gedächtnis importiert, ist wieder am
Raten.

Das Werkzeug folgt jetzt allen drei Weiterleitungsformen (bis zu drei Ebenen
tief) und nennt bei `gsap` die Namespace-API. Kommt es trotzdem nicht weiter,
sagt es **UNPRUEFBAR** und nennt den Dateipfad — das ist eine Antwort, Schweigen
ist keine.

**Siebte Sonderform, gefunden am 29.07.2026: `@base-ui/react`.** Sie brachte zwei
neue Formen auf einmal — die Typen liegen als `.d.mts` (der Resolver kannte nur
`.d.ts`), und jedes Primitive wird per `export * as Select from …` gebündelt. Das
sieht wie ein Stern-Reexport aus, erzeugt aber genau **einen** Namen, nämlich den,
den man importiert. Ergebnis war `UNPRUEFBAR` für alle 42 Subpfade.

Das war die unangenehmste Stelle für diese Lücke: `@base-ui/react` ist seit
demselben Tag die Empfehlung für neun Widgets (siehe
`ui-components/INDEX.md` — sieben von zehn eigenen Widgets sind per Tastatur
nicht bedienbar). Der Tresor schwieg also bei genau der Library, auf die die Doku
verweist — und ein Tresor, der bei der wichtigsten Empfehlung „weiß nicht" sagt,
lädt zum Raten ein. Jetzt nennt er 53 Namen, darunter `Select`, `Popover`,
`Tooltip`, `Tabs`, `Menu`.

Weil `import-check` dieselbe Quelle liest, war damit auch **jeder base-ui-Import
ungeprüft**. Gegenprobe nach dem Fix: `import { Select, Popover } from
'@base-ui/react'` kommt durch, `GibtEsNichtInBaseUi` wird gemeldet.

```bash
node evals/run-lib-lookup.mjs      # 7 Sonderformen + Flächentest über alle 30
node evals/run-import-check.mjs    # 19 Fälle, beide Richtungen für base-ui
```

Der Lauf ist in beide Richtungen belegt: mit dem Fix 0 offene Fälle, mit
zurückgedrehtem Fix 4 rote. Er fällt auch auf, wenn beim nächsten `npm update`
eine siebte Sonderform dazukommt.

### Nachschlagen und Prüfen sind dieselbe Frage

Beides beantwortet `scripts/lib-exporte.mjs` — `lib-lookup` zeigt die Namen an,
`import-check` vergleicht dagegen. Vorher hatte jedes seine eigene Auflösung,
und die des Prüfers war die schwächere: Er gab bei jedem `export *` auf und
übersprang damit still dieselben sechs Libraries, die in der Tabelle oben stehen.
Ein erfundener Import aus `zustand` kam durch, mit „Kein erfundener Import"
darunter. Details und Prüfstand: `SKILL.md`, „Erfundene Imports fallen vor dem
Build auf".

Zwei Formen kommen dabei nur beim Prüfen vor, nicht beim Nachschlagen:

- **Unterpfade.** `motion/react` ist eine andere Exportmenge als `motion` —
  `AnimatePresence` gibt es nur im ersten. Der Pfad wird über die
  `exports`-Karte des Pakets aufgelöst, nicht geraten.
- **Bedingte Typdateien.** `clsx` liefert `.d.mts` (ESM, benannter Export) und
  `.d.ts` (CommonJS, `export = clsx`). Maßgeblich ist die ESM-Datei, weil jedes
  Projekt hier ESM ist.

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
| Scroll-Sequenzen, Timelines, SVG | `gsap` | Abgrenzung zu `motion`: `_archiv/motion-gsap.md`. |
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
  kommerziellen Kunden-Build mit GSAP die Lizenzseite lesen — siehe `_archiv/motion-gsap.md`.

Bei jeder neuen Library im Tresor: Lizenz aus der installierten `package.json`
lesen und hier eintragen, bevor sie in einem Kundenprojekt landet.

## Konflikt mit der Komponenten-Bibliothek — der Tresor gewinnt

Für sieben dieser Aufgaben liegt in `ui-components/motion/` zusätzlich eine
handgeschriebene Datei. Das ist kein Reichtum an Optionen, das sind zwei
Antworten auf dieselbe Frage — und in diesen sieben Fällen gewinnt **immer**
die installierte Library:

| Aufgabe | Handgeschrieben | Genommen wird |
|---|---|---|
| Toasts | `animated-toast-stack.tsx` (503 Z) | `sonner` |
| Einmalcode / OTP | `otp-input.tsx` (392 Z) | `input-otp` |
| Command-Palette | `command-palette.tsx` (341 Z) | `cmdk` |
| Drawer / Bottom-Sheet | `drawer.tsx`, `bottom-sheet.tsx` | `vaul` |
| Zahlen animieren | `number-ticker.tsx`, `animated-number.tsx` | `@number-flow/react` |
| Lange Listen | `infinite-masonry.tsx` | `react-virtuoso` |
| Karussell | `cylinder-carousel.tsx` | `embla-carousel-react` |

Die Dateien bleiben nützlich — als Vorlage für die **Bewegung**, die auf die
Library gehört (`sonner` nimmt eigenes Markup, `input-otp` rendert per
Render-Prop). Was die Library kann, wird nicht nachgebaut; was sie offen lässt,
kommt von dort. Begründung je Zeile: `ui-components/INDEX.md`, Abschnitt
„Wo diese Bibliothek NICHT die Antwort ist".

## Falscher Fall

Ein Toast wird mit `motion` und einem eigenen `useState`-Stapel nachgebaut,
weil das Modell die Props von `sonner` nicht sicher wusste. Ergebnis: 120
Zeilen ohne Swipe-Dismiss, ohne Stapel-Logik, ohne Fokus-Rückgabe — und ein
Detektor-Fund im Craft-Check. Richtig: `node scripts/lib-lookup.mjs sonner`,
README lesen, `<Toaster />` einbauen, fertig.

Zweiter falscher Fall: `import { toast, Toaster, ToastProvider } from 'sonner'` —
`ToastProvider` steht nicht in der `Export:`-Zeile und existiert nicht. Genau
dafür ist das Werkzeug da.
