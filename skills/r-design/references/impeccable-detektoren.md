# impeccable-Detektoren — deterministische QA

> Der **finale QA-Schritt** fuer JEDE Linie (Landing wie App). Deterministischer,
> offline laufender Anti-Pattern-Detektor (aus impeccable, Apache-2.0). Kein Netz,
> kein npx, kein API-Key. Node ≥ 18.
>
> **Regel: Interface gilt erst als fertig, wenn der Detektor auf allen geaenderten
> UI-Dateien Exit 0 liefert UND die Handrubrik unten sitzt.**

## Ausfuehren

```bash
# aus dem Skill-Verzeichnis (r-design/):
node scripts/detect.mjs <datei-oder-ordner ...>

# Beispiele
node scripts/detect.mjs index.html
node scripts/detect.mjs src/                 # ganzen Ordner scannen
node scripts/detect.mjs --json src/ > report.json
node scripts/detect.mjs --quiet src/         # nur Fund-Zaehler
```

**Exit-Codes (verbindlich):**
- `0` = sauber -> fertig.
- `2` = Funde vorhanden -> fixen, erneut laufen.
- `1` = Fehler (Pfad falsch, Node kaputt) -> beheben, nicht ignorieren.

## Erkennungsmodi (automatisch nach Dateityp)
- **HTML-Dateien** -> statische HTML/CSS-Analyse (folgt auch verlinktem CSS).
- **Nicht-HTML** (`.css`, `.jsx`, `.tsx`, `.vue`, `.svelte`, ...) -> Regex-Muster-Matching.
- **URLs** -> Puppeteer/Headless (nur wenn Browser im Env vorhanden; fuer reine Datei-QA nicht noetig).

## Nuetzliche Optionen
- `--json` maschinenlesbar · `--quiet` nur Zaehler · `--scope type,layout` nur bestimmte Domains.
- `--no-config` / `--no-inline-ignores` / `--no-design-system` zum Debuggen.
- `--gpt` / `--gemini` schalten provider-spezifische Tells ZUSAETZLICH ein (Default aus). **Das sind reine Heuristiken, KEINE API-Calls** — kosten nichts.
- `--help` zeigt die volle Nutzung.

## Inline-Ignores (nur mit echtem Grund, dokumentiert)
Ein Fund darf per Kommentar gewaehrt werden, wenn er nachweislich Absicht ist:
```html
<!-- impeccable-disable overused-font -- exportiertes Marken-Dokument -->
```
```css
.brand { font-family: Inter } /* impeccable-disable-line overused-font */
```
```jsx
// impeccable-disable-next-line bounce-easing: bewusster Bounce im Maskottchen
```
`impeccable-disable` gilt fuer die ganze Datei, `-line`/`-next-line` nur lokal.
Regel-IDs kommagetrennt, oder weglassen/`*` fuer alle. **Grund IMMER dahinter.**

## Projekt-Config (optional)
`.impeccable/config.json` respektiert `detector.ignoreRules`, `ignoreFiles`,
`ignoreValues`, `designSystem.enabled`. Eine `DESIGN.md` im Projekt aktiviert die
`design-system-*`-Regeln (Abweichung von Marken-Tokens).

---

## Was geprueft wird — 46 Regeln (Kurzreferenz)

Severity: (W)=warning, (a)=advisory. IDs sind zum gezielten Ignorieren/Scopen da.

**Borders & Cards**
- `side-tab` (W) — dicke farbige Seitenborder (der bekannteste AI-Tell)
- `border-accent-on-rounded` — Akzentborder an gerundetem Element
- `nested-cards` — verschachtelte Cards (immer falsch)
- `icon-tile-stack` — Icon-Kachel ueber Heading gestapelt (Feature-Card-Reflex)

**Typografie**
- `overused-font` (W) — ueberstrapazierte Font (Inter u.a.)
- `single-font` — eine Font fuer alles
- `flat-type-hierarchy` — flache Groessen-Hierarchie
- `italic-serif-display` — Italic-Serif-Display-Headline
- `oversized-h1` — Hero-Headline > ~6rem
- `extreme-negative-tracking` — Letter-Spacing enger als -0.04em
- `line-length` — Zeilen laenger als ~75ch
- `tight-leading` — zu enge Line-Height
- `tiny-text` — Body < ~12px
- `all-caps-body` — All-Caps-Fliesstext
- `wide-tracking` — weites Tracking auf Body
- `justified-text` — Blocksatz
- `skipped-heading` — uebersprungene Heading-Ebene

**Farbe & Kontrast**
- `low-contrast` (W) — zu geringer Textkontrast
- `gray-on-color` (W) — grauer Text auf farbigem Grund
- `ai-color-palette` — generische AI-Palette
- `cream-palette` — Cream/Beige-Default-Palette
- `dark-glow` — Dark Mode mit leuchtenden Akzenten
- `gradient-text` (W) — Gradient-Text

**Layout & Spacing**
- `monotonous-spacing` — kein Spacing-Rhythmus
- `cramped-padding` — zu enges Padding
- `body-text-viewport-edge` — Body-Text an Viewport-Kante
- `text-overflow` — Inhalt laeuft aus Container
- `clipped-overflow-container` — positioniertes Kind vom Overflow geclippt

**Motion**
- `bounce-easing` — Bounce/Elastic-Easing
- `layout-transition` — Animation von Layout-Properties (width/height/top/left)
- `image-hover-transform` (a) — Bild-Hover-Transform-Reflex

**Copy / Anti-Slop**
- `em-dash-overuse` — Em-Dash-Uebernutzung *(r-design verschaerft: null Em-Dash, siehe Doktrin §6)*
- `marketing-buzzword` — Marketing-Buzzword
- `aphoristic-cadence` — aphoristischer Copy-Rhythmus
- `theater-slop-phrase` (a) — Theater-/Craftsman-Framing-Copy
- `hero-eyebrow-chip` — Hero-Eyebrow/Pill-Chip
- `repeated-section-kickers` (a) — wiederholte Section-Kicker
- `numbered-section-markers` (a) — nummerierte Marker 01/02/03

**Bilder & Bg-Muster**
- `broken-image` — kaputtes/Placeholder-Bild
- `repeating-stripes-gradient` (a) — Repeating-Gradient-Streifen
- `codex-grid-background` (a) — dekoratives Gitter-Bg
- `gpt-thin-border-wide-shadow` (a) — Haarlinie + breiter Schatten

**Design-System-Kohaerenz (nur mit DESIGN.md)**
- `design-system-font` — Font ausserhalb DESIGN.md
- `design-system-color` (a) — Farbe ausserhalb DESIGN.md
- `design-system-radius` (a) — Radius ausserhalb DESIGN.md
- `design-system-font-size` (a) — Font-Groesse ausserhalb DESIGN.md

---

## QA-Ablauf (verbindlich)

1. Alle im Task geaenderten UI-Dateien sammeln (git-diff hilft).
2. `node scripts/detect.mjs <dateien>` laufen lassen.
3. Jeden Fund **fixen** (Default) oder mit echtem Grund inline ignorieren.
4. Wiederholen bis **Exit 0**.
5. **Handrubrik** (was kein Skript sieht) durchgehen:
   - [ ] Register bewusst gewaehlt (Landing=taste / App=ui-ux) und im Design-Read benannt
   - [ ] Kontrast WCAG AA (Body 4.5:1) real geprueft, auch Buttons/Placeholder
   - [ ] EINE Theme-, EINE Akzent-, EINE Radius-Linie ueber die ganze Seite
   - [ ] Hero passt in den Viewport (Headline ≤ 2 Zeilen, CTA ohne Scroll)
   - [ ] **Null sichtbarer Em-Dash** `—`/`–` (Doktrin §6)
   - [ ] Motion motiviert + `prefers-reduced-motion`-Fallback
   - [ ] Reale Bilder / markierte Slots — keine div-Fake-Screenshots
   - [ ] Empty/Loading/Error-States vorhanden
6. Erst wenn 4 + 5 sitzen: fertig melden.

> Hinweis: r-design nutzt bewusst NUR diesen Detektor-Kern. Der volle impeccable-
> Setup-Flow (context.mjs, PRODUCT.md-Erfassung, `live`-Browser-Modus, pin/hooks)
> ist NICHT Teil dieses Skills.
