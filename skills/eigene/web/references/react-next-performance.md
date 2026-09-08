# React/Next-Performance — Vercel-Regeln für echten Custom-Code

**Verbund (08.09.2026):** Gilt für den Standardstack aus [stack.md](stack.md) (Next.js 16, React 19, statischer Export). Messregeln zu Feld- und Labordaten dort unter „Performance und Barrierefreiheit“.

**Wofür:** Nur relevant, wenn der Build echten React/Next.js-Custom-Code erzeugt
(eigene Komponenten, Data-Fetching, Server Actions) — **nicht** bei reinen
Webflow/CMS-only-Projekten ohne Code (siehe Abgrenzung in
`code-qualitaets-checkliste.md`, die diese Datei nicht dupliziert: dort steht
allgemeine Code-Hygiene, hier React/Next-Performance).

**Herkunft:** `/root/tools/vendor/vercel-agent-skills/skills/{react-best-practices,
composition-patterns,react-view-transitions,web-design-guidelines,vercel-optimize}`.
Lizenz MIT (Vercel Engineering). `react-best-practices` allein hat 70 Regeln in
8 Kategorien. Die Volltexte mit Code-Beispielen liegen lokal unter
`rules/<regel-id>.md` im jeweiligen Vendor-Ordner — gezielt einzeln nachladen,
wenn eine konkrete Regel gebraucht wird (Progressive Disclosure), nie alle 70
auf einmal in den Kontext holen.

## Die Kurzliste, die wirklich zählt

Ausgewählt aus 70 Regeln, nach Vercels Prioritäts-Reihenfolge (Waterfalls und
Bundle zuerst — das ist der größte Hebel bei Marketing-Sites + kleinen
Dashboards mit Next.js App Router).

**Waterfalls (kritisch)**
- `async-parallel` — unabhängige Fetches mit `Promise.all()` bündeln. Warum:
  eliminiert sequenzielle Round-Trips, 2–10× schneller.
- `async-defer-await` — `await` erst in den Zweig verschieben, der ihn
  tatsächlich braucht. Warum: verhindert, dass ungenutzte Code-Pfade auf Daten
  warten, die sie nie anzeigen.
- `async-cheap-condition-before-await` — billige synchrone Bedingung vor einem
  `await` auf Flags/Remote-Werte prüfen. Warum: erspart den Async-Call, wenn
  die restliche Bedingung eh nie zutrifft.
- `async-api-routes` — in API-Routes/Server-Actions unabhängige Promises sofort
  starten, spät awaiten. Warum: sonst entsteht der Waterfall im Route-Handler
  selbst.
- `async-suspense-boundaries` — Suspense-Grenzen statt alles vor dem Return zu
  awaiten. Warum: Layout (Sidebar, Header) rendert sofort, nur der
  datenabhängige Block wartet.

**Bundle Size (kritisch)**
- `bundle-barrel-imports` — direkt aus Quell-Dateien importieren statt
  Barrel-Index (`lucide-react`, `@mui/material`, `@radix-ui/react-*`). Warum:
  200–800ms Importkosten pro Cold-Start bei Barrel-Files mit tausenden
  Re-Exports.
- `bundle-dynamic-imports` — `next/dynamic` für große, nicht sofort sichtbare
  Komponenten (Editoren, Charts, Modals). Warum: wirkt direkt auf Time-to-
  Interactive und LCP.
- `bundle-defer-third-party` — Analytics/Logging erst nach Hydration laden.
  Warum: blockiert sonst den initialen Bundle, ohne dass der Nutzer davon
  etwas hat.
- `bundle-conditional` — Module nur laden, wenn das Feature aktiv ist. Warum:
  spart Bundle-Gewicht für selten genutzte Pfade.
- `bundle-preload` — bei Hover/Focus vorladen (z. B. Editor-Button). Warum:
  gefühlte Geschwindigkeit ohne initiale Bundle-Kosten.

**Server-Side Performance (hoch)**
- `server-parallel-fetching` — Komponenten so komponieren, dass Server
  Components parallel fetchen statt sequenziell im Baum. Warum: RSC rendern
  sequenziell — ohne Umbau entsteht ein Server-Waterfall, den man im Code
  nicht sofort sieht.
- `server-cache-react` — `React.cache()` für Dedup innerhalb eines Requests
  (Auth-Checks, DB-Queries). Warum: verhindert doppelte Abfragen, wenn mehrere
  Komponenten dieselben Daten brauchen.
- `server-serialization` — nur die Felder an Client-Components übergeben, die
  dort tatsächlich gebraucht werden. Warum: die RSC-Grenze serialisiert alles
  Übergebene in den HTML-Response — Payload-Größe zählt direkt.
- `server-auth-actions` — Server Actions wie öffentliche API-Routes behandeln,
  Auth/Autorisierung **innerhalb** der Action prüfen. Warum: Server Actions
  sind direkt aufrufbar, Layout-Guards reichen nicht.
- `server-hoist-static-io` — statische I/O (Fonts, Logos, Config) auf
  Modul-Ebene laden statt pro Request. Warum: verhindert wiederholte Datei-/
  Netzwerk-Reads bei jedem Aufruf.

**Client-Side Data Fetching (mittel-hoch)**
- `client-swr-dedup` — SWR für automatische Request-Deduplizierung über
  Komponenten-Instanzen. Warum: verhindert, dass jede Instanz eigenständig
  fetcht.
- `client-passive-event-listeners` — `{ passive: true }` bei Touch-/
  Wheel-Listenern ohne `preventDefault()`. Warum: sonst wartet der Browser auf
  den Listener, bevor er scrollt.

**Re-render Optimization (mittel)**
- `rerender-no-inline-components` — keine Komponenten innerhalb von
  Komponenten definieren. Warum: erzeugt bei jedem Render eine neue
  Komponenten-Identität, der Kind-Baum wird komplett neu gemountet statt
  aktualisiert.
- `rerender-derived-state-no-effect` — abgeleiteten State während des Renders
  berechnen, nicht nachträglich in einem Effect setzen. Warum: spart einen
  zusätzlichen Render-Durchlauf und typische Effect-Timing-Bugs.
- `rerender-memo` — teure Berechnungen in memoisierte Unterkomponenten
  auslagern. Warum: verhindert, dass der komplette Baum bei jedem
  Parent-Update neu rendert.

## Server/Client-Grenze

Aus `composition-patterns`: Boolean-Prop-Wucherung vermeiden, stattdessen
Compound Components (`architecture-compound-components`) und explizite
Varianten (`patterns-explicit-variants`) statt `isX`/`showY`-Flags. State lebt
im Provider, nicht in jeder Konsument-Komponente (`state-lift-state`).

Typische Fehler bei der Server/Client-Grenze:
- Eine ganze Seite mit `"use client"` markieren, weil ein einziges
  interaktives Element irgendwo tief im Baum sitzt — zieht den kompletten
  Unterbaum ins Client-Bundle.
- Client-Components, die mehr Props bekommen als sie rendern (siehe
  `server-serialization` oben).
- Kontext-Provider als Client-Component um die ganze App legen, obwohl nur ein
  Teilbaum den State braucht.

Die konkrete Regel, wann `"use client"` gesetzt wird, steht bereits in
`radix-shadcn-tailwind-stack.md` Punkt 7 (Radix-Dialog/Popover/DropdownMenu
sind Client-Components, `"use client"` gezielt nur dort, Server Components
bleiben Default) — hier nicht wiederholt.

## View Transitions

Native `<ViewTransition>`-Komponente (React) für Navigation/Routenwechsel und
Shared-Element-Morphs — ersetzt `document.startViewTransition` nie selbst
aufrufen, React macht das intern. Next.js App Router bündelt die nötige
React-Version bereits; kein `react@canary`-Install nötig.

Grundmuster:
```jsx
<ViewTransition enter="fade-in" exit="fade-out">
  <Page />
</ViewTransition>
```
Muss **vor** jedem DOM-Knoten stehen, sonst feuert enter/exit nicht. Für
gerichtete Übergänge (Liste → Detail) `addTransitionType('nav-forward')` in
`startTransition` setzen, dann typ-abhängige Klassen auf `enter`/`exit`/`share`
mappen.

**Wann View Transitions statt Motion-Library:** für Navigations-/
Routenebene (Seite A → Seite B, Shared-Element-Morph, Suspense-Reveal beim
Laden) — kein JS-Animationscode, läuft nativ im Browser, degradiert graceful
auf alten Browsern. Für alles unterhalb der Navigationsebene (Layout-Drag,
Gesten, orchestrierte Sequenzen, Exit-Animation von Dialogen) bleibt es bei
Framer Motion — das steht schon in `radix-shadcn-tailwind-stack.md` Punkt 5,
hier nicht neu entschieden. Nie beide Systeme für dieselbe Übergangsebene
gleichzeitig einsetzen.

## Bilder/Fonts/LCP

Nur was `vercel-optimize` belegt (Scanner-Pattern `unoptimized-image`,
Metrik `cwvLcpByRoute`):
- Rohes `<img>` statt `next/image` — kein automatisches Resizing/Format.
  Fix: auf `<Image />` umstellen.
- `images.unoptimized: true` global gesetzt schaltet Vercels
  Bildoptimierung für das ganze Projekt ab — nur behalten, wenn das Projekt
  nicht auf Vercel gehostet ist.
- `<Image fill>` ohne `sizes` liefert immer die größte Bildvariante aus. Fix:
  `sizes` passend zum Layout setzen.
- `<Image src=".svg">` ohne `unoptimized` schickt Vektordaten durch die
  Raster-Pipeline — SVGs brauchen `unoptimized`.
- Statische Assets in `public/` über 500 KB: komprimieren (PNG→AVIF/WebP),
  extern hosten (Vercel Blob/CDN) oder aus dem kritischen Pfad nehmen.

Für Font-Ladeverhalten liefert `vercel-optimize` keinen eigenen
Scanner-Befund (nichts belegt an dieser Quelle) — hier bewusst nichts
erfunden.

Zahlt auf Raphaels Lighthouse-Gate (G1, `qa-faecher.md` Fach 4) ein: die
LCP-Metrik (`cwvLcpByRoute`) ist genau das, was Lighthouse als "Largest
Contentful Paint" misst.

## Was aus web-design-guidelines NEU ist

Der Großteil (Kontrast AA, Alt-Texte, Fokus-Reihenfolge, ARIA nicht
überladen, Lighthouse/axe = 0) steht bereits in `qa-faecher.md` Fach 3/4 —
hier nicht dupliziert. Neu, weil in Raphaels Doktrin bisher nicht erfasst und
konkret React/Next-relevant:
- **Listen-Virtualisierung ab ~50 Items** (z. B. `virtua` oder
  `content-visibility: auto`) statt eines langen `.map()`.
- **Keine Layout-Reads während des Renders** (`getBoundingClientRect`,
  `offsetHeight`, `scrollTop`) — Reads und Writes getrennt batchen, sonst
  Layout-Thrashing.
- **Preconnect zu CDN-/Asset-Domains** und Font-Preload mit
  `font-display: swap`.
- **URL soll UI-State kodieren** (Filter, Tabs, Pagination, aufgeklappte
  Panels) statt nur in React-State zu leben — relevant für Deep-Links in
  kleinen Dashboards.

## Prüfbar machen

Was sich deterministisch prüfen lässt, mit Befehl:

- **Barrel-Imports erkennen:**
  `grep -rnE "from ['\"](lucide-react|@mui/material|@mui/icons-material|react-icons)['\"]" --include="*.tsx" --include="*.ts" src/ app/`
  — Treffer, die nicht über `optimizePackageImports` in `next.config` laufen,
  sind Kandidaten für `bundle-barrel-imports`.
- **Rohes `<img>` statt `next/image`:**
  `grep -rn "<img " --include="*.tsx" app/ src/ | grep -v "node_modules"`
- **Inline-Komponenten-Definitionen (Verdacht):**
  `grep -rnE "function [A-Z][A-zA-Z]*\(" --include="*.tsx" app/ src/ | grep -B1 "function [A-Z]"`
  (grober Indikator, kein exakter AST-Check — Treffer manuell prüfen).
- **Bundle-Analyse real laufen lassen:**
  `ANALYZE=true next build` mit `@next/bundle-analyzer` eingerichtet, dann
  die größten Chunks gegen `bundle-dynamic-imports`-Kandidaten prüfen.
- **Lighthouse/LCP-Gate (bereits Pflicht laut `qa-faecher.md` G1):**
  `npx lighthouse <url> --only-categories=performance --output=json` — LCP-Wert
  gegen 2,5s (guter Wert) prüfen.
