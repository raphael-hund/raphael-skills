# React-first Stack und Hosting (Stand 08.09.2026)

Raphaels Entscheidung vom 08.09.2026: Der Web-Skill baut Websites **als React-Projekt**, nicht mehr als HTML-first-Site mit Astro-Inseln. Grund: Die Komponentenbibliotheken (shadcn/ui, Magic UI, Aceternity, Kibo, Mantine, HeroUI, 21st.dev und die weiteren Katalogeinträge) liefern React-Code über shadcn-Registries, npm und MCP. Ein React-Projekt kann diesen Code direkt installieren und teilen; HTML-first musste ihn nachbauen oder in Inseln kapseln. Die frühere HTML-first-Fassung bleibt als [Legacy-Weg](component-islands.md) für bestehende HTML-Projekte erhalten.

Die SEO- und Formularverträge aus dem Hauptskill bleiben unverändert: jede vereinbarte Route liefert vollständiges HTML mit Inhalt, Metadaten und Links im ersten Response; jedes Formular hat ein echtes Ziel.

## Standardstack

| Schicht | Wahl | Begründung, Beleg |
|---|---|---|
| Framework | **Next.js App Router** (geprüft: 16.3.4 mit React 19.2.8) | Prerendering pro Route, `metadata`-API, statischer Export; Registry-Items setzen `rsc: true` voraus. Andere React-Frameworks (Vite + React Router, Remix, TanStack Start) nur bei bestehendem Projekt oder ausdrücklichem Grund. |
| Sprache | TypeScript, `tsx: true` | Alle Registries liefern TSX; die shadcn-CLI verlangt eine `tsconfig.json`. |
| Styling | **Tailwind CSS v4** plus CSS-Variablen aus `DESIGN.md` in `app/globals.css` | Gemeinsame Tokenquelle für alle Registry-Komponenten (`cssVariables: true`); `@theme inline` bildet `--color-*` auf die Projekt-Tokens ab. |
| Komponentenbasis | **shadcn/ui** über `components.json` mit Namespace-Registries | Eine Installationsoberfläche für 40+ Bibliotheken; siehe [component-registries.md](component-registries.md). |
| Primitive | Radix UI oder Base UI, je nach shadcn-Style; nicht beide für dieselbe Komponentenfamilie | Zwei Primitive-Familien für Dialog/Menü erzeugen doppelte Fokuslogik und Portale. |
| Motion | `motion` (geprüft 13.2.0) für React-Komponenten, CSS/WAAPI für einfache Übergänge | Regeln in [motion-native.md](motion-native.md); die React-Einstiege sind jetzt Normalfall, nicht Ausnahme. |
| Icons | `lucide-react` als Standard; `@tabler/icons-react` nur wenn eine Bibliothek es mitbringt | Ein zweites Icon-Set nur mit Grund; Registry-Items können es still mitinstallieren. |
| Rendering | `output: "export"` für Service-Websites ohne Serverlogik; SSR/ISR nur bei echtem Serverbedarf | Statischer Export liefert `out/<route>/index.html` mit vollständigem Inhalt (geprüft: `<h1>` und Preistext im HTML ohne JavaScript). |
| Formulare | Server Action oder externer Endpoint (Formspark, Resend-Route, eigenes API) | Bei `output: "export"` gibt es keine Server Actions; dann externer Endpoint mit Erfolg-/Fehlerzustand. Kein Fake-Erfolg. |

Bei `output: "export"`: `trailingSlash: true`, `images.unoptimized: true` oder ein Loader; keine dynamischen Routen ohne `generateStaticParams`; keine `headers()`/`cookies()`-Aufrufe in Seiten. Ein Build, der still auf SSR zurückfällt, ist kein statischer Export; `out/` muss existieren und je Route ein `index.html` enthalten.

## Projektstruktur

```
app/                      Routen: app/page.tsx, app/leistungen/beratung/page.tsx, app/kontakt/page.tsx
app/globals.css           Tailwind-Import, @theme inline, :root/.dark-Tokens aus DESIGN.md
app/sitemap.ts            Sitemap aus derselben Routenquelle
app/robots.ts             robots
components/ui/            installierte Registry-Komponenten (eine Implementierung pro Job)
components/site/          eigene Kompositionen: Header, Footer, Sections
components/registry/      optional: Rohkopien fremder Items vor Anpassung (nur wenn Diff-Nachweis nötig)
lib/utils.ts              cn()
lib/routes.ts             eine Routenquelle für Navigation, Breadcrumbs, Sitemap
content/                  MDX oder JSON je Route, wenn Copy von der Struktur getrennt wird
.21st/design.json         Design Context für 21st (Tokens, Stack, installierte Komponenten)
components.json           shadcn-Konfiguration mit Registry-Namespaces
.mcp.json                 shadcn-MCP für dieses Projekt
DESIGN.md, SEO-PAGE-MAP.json, STATUS.md   Skill-Records
```

Ein Starter mit geprüften Dateien liegt unter [assets/react-starter/](../assets/react-starter/README.md). Er wird kopiert und angepasst, nicht blind übernommen; Versionen vor dem Bau gegen npm prüfen.

## Client-/Server-Grenze

Seiten sind Server Components. Registry-Komponenten mit Zustand, Events, Hooks oder Browser-APIs tragen `"use client"` bereits in ihrer Datei; fehlt es (Mantine-Komponenten, einige Community-Items), dann eine Client-Hülle anlegen oder die Seite als Client markieren. Belegter Fehler: eine Mantine-Seite ohne `"use client"` bricht den Prerender mit `Element type is invalid … got: undefined`; mit der Direktive baut sie.

Sichtbarer Inhalt, Links und Metadaten bleiben in Server Components, damit sie im ersten HTML stehen. Ein Client-Baum darf keine indexierbare Hauptinhalte allein tragen. Provider (Mantine, Theme, Query) leben in einem `providers.tsx` mit `"use client"` und werden im Layout einmal eingebunden; kein Provider pro Sektion.

## Komponenten holen statt nachbauen

Reihenfolge je Komponentenjob (Details in [component-registries.md](component-registries.md)):

1. Bedarf benennen (Job, Zustände, Inhalt, mobile Form).
2. `npx shadcn@latest search <namespace> -q <begriff>` in den konfigurierten Registries; parallel `21st search` oder das 21st-MCP mit Design Context.
3. Kandidaten mit `shadcn view` oder `add --dry-run` lesen: Dateien, `dependencies`, `registryDependencies`, CSS-Vars, Lizenz aus dem Korpus.
4. Genau eine Implementierung installieren, auf `DESIGN.md`-Tokens abbilden, überflüssige Abhängigkeiten entfernen.
5. Roh-HTML, Interaktion, Tastatur, Mobile und Bundle prüfen; Herkunft im Komponentenabschnitt von `DESIGN.md` festhalten.

Eigenbau ist zulässig, wenn kein Kandidat passt oder die Lizenz die Nutzung ausschliesst. Die Entscheidung steht dann mit Begründung im Komponentenabschnitt von `DESIGN.md`.

## Bestehende Projekte

Ein bestehendes Next-/React-Projekt wird erhalten und erweitert. Ein bestehendes HTML-/Astro-Projekt bleibt bei gezielten Änderungen auf seinem Stack; dafür gilt weiter [component-islands.md](component-islands.md). Eine Migration nach React ist ein eigener Auftrag mit Konvertierungsvertrag: Routenkarte, semantisches DOM, Tokens, Asset-Manifest, Zustände, Metadaten und freigegebenes Verhalten bleiben gleich; Vergleich derselben URLs, Viewports und Zustände vor und nach der Umstellung. [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

## Hosting und Release

Statischer Export läuft auf jedem statischen Host (Vercel, Netlify, Cloudflare Pages, eigener Nginx). SSR/ISR braucht Vercel oder einen Node-Host. Vor dem ersten Deploy die Domain→Projekt-Bindung auflösen (Hauptskill §8b). Prüfen: direkter Aufruf jeder Route, Trailing-Slash-Politik und Canonicals, echte 404 mit Status 404 (statischer Export liefert `404.html`; der Host muss sie mit Status 404 ausliefern), Redirects, `sitemap.xml`, `robots.txt`, tatsächlicher Formular-Endpoint.

Navigation und Inhalt müssen im Response-HTML stehen; `curl` auf die Produktions-URL ist der Beleg, nicht der Build-Log.

## Performance und Barrierefreiheit

Bildgrössen, Formate und Crops bewusst wählen; `next/image` mit statischem Import oder `unoptimized` beim Export, eager für das erste grosse Bild, lazy darunter. Schriften über `next/font` mit Subsetting, das deutsche Umlaute und ß behält. Reduced Motion in Motion-Komponenten über `useReducedMotion()` behandeln.

Bundle je Route messen (`next build`-Tabelle plus Produktions-Requests im Browser). Eine Registry-Komponente kann Motion, Radix und ein zweites Icon-Set mitbringen; nach jedem `add` die Diff in `package.json` lesen. Belegter Fall: ein Aceternity-Item installierte zusätzlich das Paket `cn` (0.2.6), das das Projekt nicht braucht.

Core-Web-Vitals-Grenzen (LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 bei p75) und die Regeln zu Feld- vs. Labordaten aus der bisherigen Fassung gelten weiter; Lighthouse ist kein Feld-INP. [Web Vitals](https://web.dev/articles/vitals).
