# ui-ux-Linie — Offline-DB nutzen (App/Dashboard)

> Fuer App-, Dashboard-, Admin-, Tool- und Produkt-UI. Quelle: **ui-ux-pro-max**
> (MIT). Vendored ist **nur die Offline-DB**: `search.py` (BM25 + Regex, reine
> Python-Stdlib, **kein Netz, kein API-Key**) plus CSV-Daten und zwei Referenzen.
>
> **ENTFERNT (bezahlt / online):** Der komplette "design"-Sub-Skill der Quelle
> (Logo-, CIP-, Icon-, Banner-, Social-Photo-Generierung) haengt an
> `GEMINI_API_KEY` / Gemini Nano-Banana / Gemini 3.x — **nicht vendored, nicht
> nutzen.** Wenn ein Task Logo/Icon-Generierung braucht: als TODO an Raphael
> dokumentieren, nicht selbst einen bezahlten Flow starten.

## Wo die DB liegt
```
r-design/vendor/ui-ux-db/
  scripts/search.py        # CLI (Python 3, keine externen Deps)
  scripts/core.py          # BM25/Regex-Engine
  scripts/design_system.py # --design-system-Aggregation
  data/*.csv               # styles, colors, typography, products, ux-guidelines,
                           # landing, charts, icons, motion(gsap), google-fonts,
                           # react-performance, app-interface, ui-reasoning
  data/stacks/*.csv        # stack-spezifische Guidelines (react, nextjs, vue, ...)
  references/quick-reference.md  # alle ~98 UX-Guidelines im Volltext
  references/pro-rules.md        # App/Native-Politur + Pre-Delivery-Checkliste
```

## Aufrufen
```bash
python3 r-design/vendor/ui-ux-db/scripts/search.py "<query>" --domain <domain> [-n <max>]
```
Falls `python3` fehlt: `python`, dann `py -3`. Immer den vollen Pfad angeben
(die DB liegt nicht im Projektverzeichnis).

## Workflow (4 Schritte)

**1. Anforderungen extrahieren:** Produkttyp (SaaS/E-Commerce/Portfolio/Dashboard/
Tool/...), Zielgruppe+Kontext, Stil-Keywords, **Stack aus dem Projekt erkennen**
(`package.json` deps: react/next/vue/svelte/nuxt/@angular; `pubspec.yaml`=Flutter;
`*.xcodeproj`/`Package.swift`=SwiftUI; `composer.json`=Laravel). Nichts erkennbar
-> fragen oder `html-tailwind` als Default. **Nie den Stack raten.**

**2. Design-System erzeugen (Pflicht bei neuen Seiten):**
```bash
python3 .../search.py "<produkttyp> <industrie> <keywords>" --design-system [-p "Projektname"]
```
Sucht product/style/color/landing/typography parallel, wendet Reasoning-Regeln an,
liefert Pattern, Stil, Farben, Typo, Effekte und Anti-Patterns. Formate:
`-f ascii` (Default), `-f markdown`, `--json`.

**2b. Optional persistieren** (mit `--output-dir` auf Projekt-Root):
```bash
python3 .../search.py "<query>" --design-system --persist -p "Projekt" --output-dir "<projekt-root>"
```
Erzeugt `design-system/<slug>/MASTER.md` (+ `pages/` fuer Overrides). Existiert
MASTER schon, wird ohne `--force` **nicht** ueberschrieben — vorher lesen.

**2c. Design-Dials** (optional, tunen Output ohne Query-Aenderung; 1–10) — spiegeln
die taste-Dials:
```bash
python3 .../search.py "<query>" --design-system --variance <1-10> --motion <1-10> --density <1-10>
```
`--variance` (zentriert/minimal -> bold/asymmetrisch) · `--motion` (haengt ein
passendes GSAP-Snippet an) · `--density` (ueberschreibt die `--space-*`-Tokens:
spacious/standard/dense).

**3. Vertiefen per Domain (nach Bedarf):**
```bash
python3 .../search.py "<keyword>" --domain <domain> [-n <max>]
```
| Bedarf | Domain |
|---|---|
| Produkttyp-Muster | `product` |
| Stile | `style` |
| Farbpaletten | `color` |
| Font-Pairings | `typography` · Einzel-Fonts `google-fonts` |
| Charts | `chart` |
| UX-Best-Practices / Anti-Patterns | `ux` |
| Landing-Struktur | `landing` |
| Icons (Import-Code) | `icons` |
| GSAP-Presets | `gsap` |
| React/Next-Performance | `react` |
| App/Native-Guidelines (iOS/Android/RN) | `web` |

Domain wird auto-erkannt, wenn `--domain` fehlt — bei ueberlappenden Begriffen
(z.B. "font") explizit setzen.

**4. Stack-Guidelines:**
```bash
python3 .../search.py "<keyword>" --stack <stack>
```
Stacks: react, nextjs, vue, svelte, astro, nuxtjs, nuxt-ui, angular, laravel,
swiftui, react-native, flutter, jetpack-compose, html-tailwind, shadcn, threejs,
javafx, wpf, winui, avalonia, uno, uwp.

## Prioritaeten (welche Kategorie zuerst)
1 Accessibility (`ux`) · 2 Touch/Interaction (`ux`) · 3 Performance (`ux`) ·
4 Style/Product (`style`,`product`) · 5 Layout/Responsive (`ux`) ·
6 Typo/Color (`typography`,`color`) · 7 Animation (`ux`,`gsap`) ·
8 Forms/Feedback (`ux`) · 9 Navigation (`ux`) · 10 Charts (`chart`).
Volltext aller Guidelines: `vendor/ui-ux-db/references/quick-reference.md`.
Vor App-UI-Auslieferung: `vendor/ui-ux-db/references/pro-rules.md` (Checkliste).

## Bei 0 Treffern
Nicht erfinden. Einmal breiter umformulieren (product + style getrennt statt
kombiniert). Weiter leer -> Prioritaetentabelle nutzen UND dem Nutzer sagen, dass
die Empfehlung aus Defaults kommt, nicht aus einem DB-Treffer. Nie ein 0-Treffer-
Ergebnis als Daten ausgeben.

## Danach
DB-Empfehlungen + Doktrin (`design-doktrin.md`) zusammenfuehren, implementieren —
und am Ende IMMER die impeccable-Detektoren (`impeccable-detektoren.md`) bis Exit 0.

## Reminder: Cards in dieser Linie
Die DB empfiehlt fuer Dashboards bewusst KPI-/Datenkarten — das ist hier korrekt
(Doktrin §4, product-Register). Verschachtelte Cards bleiben trotzdem verboten.
