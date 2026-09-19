# Handwerk: UI-Polish, Typografie, Farbe, Layout, Accessibility (mit Code)

Destilliert aus jakubkrehel/better-* (better-ui, better-typography, better-colors,
better-layout, better-accessibility), emil-design-eng und apple-design. Diese Datei ist
die Bau-Referenz mit exakten Werten und Snippets. Die Doktrin (Locks, Bans, Floors) steht in
`design-doktrin.md`; hier steht, WIE man es baut. Jeder Wert ist ein exakter Wert, kein
Bereich zum Schätzen: `0.96` ist nicht `0.95`, `cubic-bezier(0.2, 0, 0, 1)` ist nicht
`cubic-bezier(0.4, 0, 0.2, 1)`.

Inhalt: 1 Root-Setup · 2 Typografie-Rezepte · 3 Farb-System-Rezepte · 4 Oberflächen (Radius,
Shadow, Outline) · 5 Layout-Rezepte · 6 Buttons, Inputs, Controls · 7 Formulare (a11y
komplett) · 8 Fokus, Keyboard, Landmarks · 9 Hit-Areas & Touch · 10 Bilder & Medien ·
11 Screenreader & Live-Regions · 12 Zoom, Reflow, i18n · 13 Reporting-Contract

---

## 1. Root-Setup (einmal pro Projekt, `globals.css` / `layout.tsx`)

```css
@layer base {
  html {
    -webkit-font-smoothing: antialiased;   /* einmal auf Root, nie pro Komponente */
    -moz-osx-font-smoothing: grayscale;
    text-size-adjust: 100%;
    scroll-behavior: smooth;
  }
  @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }

  body {
    font-family: var(--font-body), system-ui, sans-serif;
    font-size: 1rem;                        /* 16px Body-Floor */
    line-height: 1.55;
    color: var(--color-ink);
    background: var(--color-canvas);
    font-synthesis: none;                   /* nur nach Check aller Bold/Italic-Faces */
  }

  h1, h2, h3 { text-wrap: balance; line-height: 1.1; letter-spacing: -0.02em; }
  p { text-wrap: pretty; }
  a { text-underline-position: from-font; text-decoration-thickness: from-font; }

  /* Browser-Oberflächen mitgestalten: billigstes Craft-Signal */
  ::selection { background: color-mix(in oklab, var(--color-accent) 25%, transparent); color: var(--color-ink); }
  :focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }
  input, textarea { caret-color: var(--color-accent); }

  [id] { scroll-margin-top: 88px; }         /* Sticky-Header 72px + Luft */
  button, [role="button"], a { touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
}
```

Root-Layout (Next.js):

```tsx
<html lang="de" dir="ltr">
  <head><script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js")' }} /></head>
  <body>
    <a href="#main" className="skip-link">Zum Inhalt springen</a>
    <Header />
    <main id="main">{children}</main>
    <Footer />
  </body>
</html>
```

---

## 2. Typografie-Rezepte

### 2.1 Rollen-Skala (eine Entscheidung = Size + Line-Height + Weight)

Business-/Marketing-Site (fluid mit `clamp`, Display gedeckelt bei 6rem):

```css
:root {
  --text-display: clamp(2.5rem, 1.6rem + 3.5vw, 4.5rem);   /* 40 bis 72px */
  --text-h2:      clamp(1.875rem, 1.3rem + 2vw, 2.75rem);  /* 30 bis 44px */
  --text-h3:      clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem);  /* 20 bis 24px */
  --text-lead:    1.125rem;  /* 18px */
  --text-body:    1rem;      /* 16px */
  --text-ui:      0.875rem;  /* 14px */
  --text-caption: 0.8125rem; /* 13px, nie unter 12px */
}
h1 { font-size: var(--text-display); font-weight: 600; line-height: 1.05; letter-spacing: -0.03em; }
h2 { font-size: var(--text-h2); font-weight: 600; line-height: 1.1; letter-spacing: -0.02em; }
h3 { font-size: var(--text-h3); font-weight: 600; line-height: 1.25; letter-spacing: -0.01em; }
.lead { font-size: var(--text-lead); line-height: 1.5; color: var(--color-ink-muted); }
```

Product-UI (Operate-Mode): feste rem-Skala, Ratio 1.125 bis 1.2, kein clamp:
Display 36/1.1/600 · Title 24/1.2/600 · Heading 18/1.3/600 · Body 16/1.5/400 · Caption 13/1.4/400.

Regeln: Emphase innerhalb einer Rolle = ein Weight-Step (400→500), nie Size-Wechsel.
Heading-Ebenen absteigend; ein Kind rendert nie größer als sein Elternteil. Unter 18px
mindestens Weight 400. Alles, was 3+ Zeilen umbricht: Line-Height ≥ 1.4.

### 2.2 Maß, Umbruch, Zahlen

```css
.prose { max-width: 65ch; }                       /* 60 bis 75 Zeichen */
.badge, .nav-label { white-space: nowrap; }
.url, .id { overflow-wrap: break-word; }
.price, .counter, .timer, td.num { font-variant-numeric: tabular-nums; }
.truncate-1 { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
```

Truncation versteckt Inhalt: Vollwert per Tooltip oder Expand erreichbar halten.

### 2.3 Optische Trimmung (Progressive Enhancement)

```css
.btn, .badge { text-box: trim-both cap alphabetic; }  /* Chromium 133+, Safari 18.2+ */
```

### 2.4 Font-Technik

- `.woff2`, self-hosted oder `next/font`, `font-display: swap`, nur genutzte Weights.
- Adobe Fonts (Typekit) als Primärquelle, siehe `komponenten-ideation.md` §5.
- CSS-Properties vor Raw-Tags: `font-weight: 650` statt `font-variation-settings: "wght" 650`;
  `font-optical-sizing: auto`; `font-variant-numeric` statt `"tnum"`.
- Keine Blacklist-Fonts als Default (Inter, Roboto, Plus Jakarta, Space Grotesk, Fraunces,
  Playfair, DM Sans, Outfit, Instrument): siehe `design-doktrin.md` und
  `impeccable-regelwerk.md` §13.

### 2.5 Smart Punctuation in gerendertem Text

Typografische Anführungszeichen („…“ im Deutschen), Bis-Strich ohne Leerzeichen (2010–2020),
einzelnes Ellipsen-Zeichen, `&nbsp;` in "16 px" und "ab 98 €", `&shy;` in langen
Komposita (Photo&shy;voltaik&shy;anlage). Kein Gedankenstrich mit Leerzeichen.

### 2.6 iOS-Zoom auf Inputs verhindern

```css
input, select, textarea { font-size: 1rem; }  /* 16px, sonst zoomt Safari die Seite */
```

---

## 3. Farb-System-Rezepte

### 3.1 Zwei Tiers, Rollen-Namen

```css
:root {
  /* Primitives (nie in Komponenten verwenden) */
  --green-50: oklch(97% 0.02 160);
  --green-500: oklch(62% 0.17 160);
  --green-700: oklch(48% 0.14 160);
  --gray-50: oklch(98% 0.004 160);   /* getönt Richtung Marken-Hue, +0.005 bis 0.015 Chroma */
  --gray-900: oklch(20% 0.01 160);

  /* Semantics (einzige Referenz in Komponenten) */
  --color-canvas: var(--gray-50);
  --color-surface: oklch(100% 0 0 / 0.6);
  --color-ink: var(--gray-900);
  --color-ink-muted: oklch(45% 0.01 160);
  --color-border: oklch(88% 0.01 160);
  --color-border-strong: oklch(78% 0.01 160);
  --color-accent: var(--green-500);          /* CTA exklusiv, ≤ 10 % Fläche */
  --color-accent-hover: var(--green-700);
  --color-accent-fg: oklch(99% 0 0);
  --color-focus: oklch(55% 0.2 250);
  --color-error: oklch(55% 0.2 25);
  --color-success: var(--green-700);
}
```

Regeln (better-colors):
- Ramps, nicht Farben: eine Neutral-Ramp, eine Akzent-Ramp, Status-Ramps nur wenn gerendert.
- Jeder Step hat einen Job (Page-Bg, Hover, Border, Solid, Text). Kein Step ohne Rolle.
- Token nie außerhalb seiner Rolle borgen (Separator ≠ Text). Fehlt eine Rolle, Token anlegen.
- `accent` = Marke; `primary` = prominentestes Element seiner Gruppe. Kollision
  `--color-primary` vs `--color-text-primary` vermeiden.
- Eine Farbe, eine Bedeutung (Hues innerhalb 15° gelten als dieselbe Farbe). Akzent nur auf
  Interaktivem; Status-Hue darf nicht mit Akzent-Hue kollidieren.
- Genau eine gefüllte Primäraktion pro View; Farbe auf den Background, nicht auf das Label.

### 3.2 Ramp-Generierung (ausführbar, für neue Paletten)

```js
// culori: gleichmäßige perzeptive Lightness, konstanter Hue, Chroma mid-ramp am höchsten
import { formatCss, clampChroma } from "culori";
export function ramp(hue, chromaPct = 0.8) {
  const steps = [97, 93, 87, 78, 67, 58, 49, 40, 31, 22];
  return steps.map((L) => formatCss(clampChroma({ mode: "oklch", l: L / 100, c: 0.4 * chromaPct * bell(L), h: hue })));
}
const bell = (L) => 1 - Math.abs((L - 60) / 40) ** 2 * 0.7;   // Chroma-Peak bei ~60 % L
```

Dark Mode: Lightness-Mapping umkehren als Startpunkt, dann Vividness senken, dunkles Ende
weiten, jedes Paar neu messen. Ein Switching-Mechanismus (`.dark`-Klasse ODER
`prefers-color-scheme`), nie beide gemischt.

### 3.3 Kontrast messen, nicht schätzen

```bash
# WCAG 2 Kontrast per Node (culori)
node -e 'const c=require("culori");console.log(c.wcagContrast("#1a3d2e","#f5f7f6"))'
```

Gegen den tatsächlich gerenderten Hintergrund messen (Card ≠ Page, Transluzenz: hellste und
dunkelste Unterlage). Fehlerhaftes Paar melden, nicht eigenmächtig umfärben. Kontrast über
Lightness fixen, nie über Hue.

### 3.4 Gradient-Interpolation

`in oklab` als Default (gleichmäßige Helligkeit), `in oklch` wenn zwei Hues in der Mitte grau
werden. sRGB-Default mutet den Midpoint. P3 nur mit sRGB-Fallback zuerst:

```css
.hero-bg { background: linear-gradient(135deg in oklab, var(--green-700), var(--green-500)); }
@media (color-gamut: p3) { .cta { background: oklch(62% 0.22 160); } }
```

---

## 4. Oberflächen: Radius, Shadow, Outline

### 4.1 Concentric Radius

```
outer = inner + padding
```

```tsx
<div className="rounded-[20px] p-2">        {/* 12 + 8 */}
  <img className="rounded-[12px]" />
</div>
```

Über 24px Padding: Layer als getrennte Flächen behandeln, Radius unabhängig wählen.
Shape-Lock: eine Radius-Skala pro Seite (z. B. 8 / 12 / 16 / 24; Pills nur kleine Controls).

### 4.2 Shadow als Border (Light) vs. Ring (Dark)

```css
/* Light: dreilagig, getönt, mit Offset */
.surface {
  box-shadow:
    0 0 0 1px oklch(0 0 0 / 0.06),
    0 1px 2px -1px oklch(0 0 0 / 0.06),
    0 2px 4px 0 oklch(0 0 0 / 0.04);
}
.surface:hover { box-shadow: 0 0 0 1px oklch(0 0 0 / 0.08), 0 1px 2px -1px oklch(0 0 0 / 0.08), 0 2px 4px 0 oklch(0 0 0 / 0.06); }

/* Dark: nur ein White-Ring, layered Shadows sind unsichtbar */
.dark .surface { box-shadow: 0 0 0 1px oklch(1 0 0 / 0.08); }
.dark .surface:hover { box-shadow: 0 0 0 1px oklch(1 0 0 / 0.13); }
```

Elevation einmal deklarieren: Border ODER Shadow. Hairline + breiter Weichschatten =
Ghost-Card (GPT-Signatur). Schatten tragen Offset + weichen Blur; Zero-Offset-Farbhalo ist Deko.
Borders bleiben für Struktur: Divider, Tabellenzellen, Input-Outlines.

### 4.3 Bild-Outline

```css
img.framed { outline: 1px solid oklch(0 0 0 / 0.1); outline-offset: -1px; }
.dark img.framed { outline-color: oklch(1 0 0 / 0.1); }
```

Reines Schwarz/Weiß mit Alpha, nie getönt (slate/zinc lesen sich als Schmutz am Bildrand).
`outline` statt `border`, weil layout-neutral.

### 4.4 Optische Ausrichtung

- Icon-Seite Padding = Text-Seite minus 2px (`pl-3 pr-4` bei Icon links).
- Play-Dreieck `translateX(2px)`.
- Asymmetrische Icons im SVG selbst korrigieren, nicht per Margin.
- Icon-Stroke ans Textgewicht koppeln: 1.5px neben 400, 2px neben 500–600, 2.5px neben 700.
  Ein Icon-Set, ein Stroke pro Oberfläche. Outline = Default, Fill = Active.

---

## 5. Layout-Rezepte

### 5.1 Gruppieren mit Raum (2×-Regel)

```css
.field-group { display: flex; flex-direction: column; gap: 8px; }    /* innerhalb */
.form { display: flex; flex-direction: column; gap: 24px; }          /* zwischen: ≥ 2× */
```

Reihenfolge: 1 Negativraum → 2 Hintergrundfläche → 3 Trennlinie (nur dichte Daten).
Trennlinien hairline, low-contrast, nie zusätzlich zu großem Gap.

### 5.2 Spacing-Skala nach DENSITY

| DENSITY | Skala | Section-Gap |
|---|---|---|
| spacious (3) | 24–96px | `py-24 md:py-32` |
| standard (4–5) | 16–64px | `py-16 md:py-24` |
| dense (7+) | 8–32px | `py-8 md:py-12` |

Controls: 12px zwischen bordered/filled Controls, 24px um randlose, 24px+ zwischen Gruppen.
Über einer Überschrift mehr Raum als darunter (`mt-16 mb-6`, nie symmetrisch).

### 5.3 Container & Full-Bleed

```css
.container { max-width: 80rem; margin-inline: auto; padding-inline: clamp(1rem, 4vw, 2rem); }

/* Article: Text im Maß, Medien bluten */
.article { display: grid; grid-template-columns: 1fr min(65ch, calc(100% - 48px)) 1fr; }
.article > * { grid-column: 2; }
.article > .full-bleed { grid-column: 1 / -1; }
```

Content blutet (Bilder, Hintergründe bis Viewport-Kante), Controls schweben (innerhalb Margins
+ `env(safe-area-inset-*)`).

### 5.4 Breakpoints aus dem Inhalt, Container Queries für Komponenten

```css
.card-list { container-type: inline-size; }
@container (max-width: 400px) { .card { grid-template-columns: 1fr; } }
```

Struktur halten, bis sie bricht. Spät kollabieren. Kleinste und größte Größe zuerst testen.
Asymmetrische Layouts kollabieren unter 768px strikt einspaltig.

### 5.5 Peeking (versteckter Inhalt braucht Signal)

```html
<div class="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-4 pl-4">
  <div class="w-[80%] shrink-0 snap-start">…</div>
</div>
```

16 bis 32px der nächsten Card sichtbar, oder ein Disclosure-Control. Null Hinweis = existiert nicht.

### 5.6 Wachstum und Clipping

- Keine fixen Breiten/Höhen auf Text-Containern (`max-width` + wrap, `min-height` statt `height`).
- Buttons sizen sich aus dem Label (`padding-inline`), nie `width: 96px`.
- Deutsch ist ~30 % länger als Englisch: Pseudo-Lokalisierung testen.
- Primäraktion nie in Clipping-Zonen (Pane-Unterkante, unter Keyboard): Sticky-Footer mit
  Safe-Area oder oben im View.
- Logische Properties: `padding-inline-start`, `margin-inline-end` statt left/right.

---

## 6. Buttons, Inputs, Controls

### 6.1 Button (vollständige States)

```tsx
import { cva } from "class-variance-authority";

const button = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-[12px] font-medium",
    "min-h-11 px-5 text-base whitespace-nowrap",                       /* 44px Touch */
    "transition-[background-color,border-color,color,transform] duration-150 ease-[var(--ease-out)]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
    "active:not-disabled:scale-[0.97]",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "aria-busy:cursor-progress",
  ],
  {
    variants: {
      intent: {
        primary: "bg-[var(--color-accent)] text-[var(--color-accent-fg)] hover:bg-[var(--color-accent-hover)]",
        secondary: "bg-transparent text-[var(--color-ink)] border border-[var(--color-border-strong)] hover:bg-[var(--color-canvas-hover)]",
        ghost: "bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-canvas-hover)]",
      },
      size: { md: "min-h-11 px-5", lg: "min-h-12 px-6 text-lg" },
    },
    defaultVariants: { intent: "primary", size: "md" },
  }
);

export function Button({ loading, children, className, static: isStatic, ...props }) {
  return (
    <button
      className={button({ ...props, className: cn(className, isStatic && "active:scale-100") })}
      aria-busy={loading || undefined}
      disabled={props.disabled}
      {...props}
    >
      {loading && <Spinner className="size-4" aria-hidden />}
      {children}   {/* Label bleibt sichtbar, nie nur Spinner */}
    </button>
  );
}
```

Regeln: Label ≤ 3 Wörter, Verb zuerst, konkrete Aktion. `<button>` für Aktionen, `<a href>` für
Navigation (Cmd/Ctrl/Middle-Click muss funktionieren). Nie `<div onClick>`. Tailwind 4 kompiliert
`hover:` bereits unter `@media (hover: hover)`.

### 6.2 Input

```tsx
<div className="field-group">
  <label htmlFor="plz" className="text-sm font-medium">Postleitzahl</label>
  <input
    id="plz" name="postal-code" type="text" inputMode="numeric" autoComplete="postal-code"
    pattern="[0-9]{5}" maxLength={5} placeholder="z. B. 50667" spellCheck={false}
    aria-invalid={error ? true : undefined}
    aria-describedby={error ? "plz-error" : "plz-hint"}
    className="min-h-11 rounded-[10px] border border-[var(--color-border-strong)] bg-white px-3 text-base
               focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-focus)]
               aria-invalid:border-[var(--color-error)]"
  />
  <p id="plz-hint" className="text-sm text-[var(--color-ink-muted)]">Für die Verfügbarkeitsprüfung in deiner Region.</p>
  {error && <p id="plz-error" role="status" className="text-sm text-[var(--color-error)]"><ErrorIcon aria-hidden /> {error}</p>}
</div>
```

Label über dem Input, Helper im Markup, Fehler unter dem Feld mit Icon + Text (nie nur roter
Rahmen). Placeholder = Beispiel, nie Label.

### 6.3 Radio-Cards (Funnel-Kacheln)

```tsx
<fieldset className="grid gap-3 sm:grid-cols-2">
  <legend className="text-lg font-semibold mb-4">Welche Dachform hat dein Haus?</legend>
  {options.map((o) => (
    <label key={o.value} className="relative flex min-h-16 cursor-pointer items-center gap-3 rounded-[14px] border border-[var(--color-border-strong)] p-4
                                     has-[:checked]:border-[var(--color-accent)] has-[:checked]:bg-[color-mix(in_oklab,var(--color-accent)_8%,white)]
                                     has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--color-focus)]">
      <input type="radio" name="roof" value={o.value} className="sr-only" onChange={advance} />
      <o.Icon className="size-6 shrink-0" strokeWidth={1.5} aria-hidden />
      <span className="font-medium">{o.label}</span>
    </label>
  ))}
</fieldset>
```

Label und Control teilen einen Hit-Target, kein Dead-Zone. Pfeiltasten wechseln nativ zwischen
Radios. Auto-Advance erst nach 250ms.

---

## 7. Formulare (a11y komplett)

- Jedes Feld: `<label for>` oder wrapping `<label>`. Pflichtfelder: natives `required` +
  sichtbarer Hinweis, einmal pro Formular erklärt.
- `autocomplete`-Tokens: `name`, `given-name`, `family-name`, `email`, `tel`, `street-address`,
  `postal-code`, `country`, `one-time-code`, `new-password`/`current-password`.
  Sektions-Prefix: `autocomplete="shipping street-address"`.
- Keyboard-Typen: `type="email|url|tel"`; PIN/Code `type="text" inputmode="numeric"`; Geld
  `inputmode="decimal"`; echte Menge `type="number"`.
- Paste nie blockieren (Passwörter, Codes). Freitext akzeptieren, danach validieren, Werte
  trimmen (Autocomplete fügt Leerzeichen an).
- Validierung on submit: `aria-invalid="true"` + `aria-describedby` auf Fehlertext, erstes
  ungültiges Feld fokussieren. Submit bleibt aktiv, bis der Request startet; dann disabled +
  Spinner NEBEN dem Original-Label.
- Erfolg: polite Live-Region (`role="status"`). Formularweite Fehler ohne Feld: `role="alert"`.
- Tippt der Nutzer, darf ein Re-Render Fokus und Wert nie verlieren. Unsaved-Changes-Warnung
  bei Navigation.
- Enter sendet aus jedem Input; in `<textarea>` ⌘/Ctrl+Enter.
- Serverseitige Validierung immer zusätzlich; Double-Submit blocken.
- DSGVO: Checkbox nicht vorausgewählt, Datenschutz-Link im Label, Zweckbindung neben dem Feld
  ("Nur für die Terminbestätigung"). Details in `conversion-cro.md`.

---

## 8. Fokus, Keyboard, Landmarks

```css
.skip-link { position: absolute; inset-inline-start: -999px; }
.skip-link:focus { inset-inline-start: 16px; top: 16px; z-index: 100; }
```

- `:focus-visible` stylen, nie bare `:focus`. Nie `outline: none` ohne verifizierten Ersatz.
  Ring ≥ 2px, gegen jede angrenzende Farbe geprüft; `forced-colors: active` respektieren.
- Landmarks: ein `<main>`, `<header>`, `<nav aria-label="Haupt">`, `<footer>`, `<aside>`.
  Ein `<h1>` pro Seite, keine Ebene überspringen.
- `tabindex="0"` nur für custom Interaktives, `-1` für programmatischen Fokus. Nie positiv.
- Composite-Widgets (Tabs, Menüs, Radiogruppen): Roving Tabindex, Pfeiltasten, ein Tab-Stop.
- Overlays: `inert` auf Hintergrund, Fokus hinein, Escape schließt, Fokus zurück zum Trigger,
  `overscroll-behavior: contain`. Base UI / Radix übernehmen das; nie hand-rollen.
- Sticky-UI darf das fokussierte Element nie verdecken (WCAG 2.4.11): `scroll-margin-top`.

---

## 9. Hit-Areas & Touch

| Standard | Minimum |
|---|---|
| WCAG 2.5.8 AA | 24×24 CSS-px (hartes Floor; 20px-Target mit 4px-Gap passt per Spacing-Exception) |
| Touch (HIG/Material) | 44×44 / 48×48 |
| Desktop-Empfehlung | 40×40 |

```css
/* kleines Icon, großer Hit-Bereich: Pseudo-Element auf label/button, nie auf input */
.icon-btn { position: relative; }
.icon-btn::after { content: ""; position: absolute; top: 50%; left: 50%; width: 44px; height: 44px; transform: translate(-50%, -50%); }
/* oder echte Geometrie */
.icon-btn { min-width: 44px; min-height: 44px; display: inline-grid; place-items: center; }
```

Hit-Areas überlappen nie. Dekorative Layer (Scrim, Glow, `::after`-Sheen) bekommen
`pointer-events: none` + `aria-hidden="true"`. `touch-action: manipulation` auf Interaktivem;
`touch-action: none` nur auf eigenen Drag-Flächen.

---

## 10. Bilder & Medien

```tsx
<Image
  src="/hero-dach.jpg" alt="Monteur befestigt Solarmodul auf einem Satteldach in Köln"
  width={1600} height={1000} priority fetchPriority="high" sizes="(min-width: 1024px) 50vw, 100vw"
/>
<Image src="/referenz-1.jpg" alt="" loading="lazy" width={800} height={600} />  {/* dekorativ */}
```

- Alt nach Zweck: dekorativ `alt=""`, informativ beschreibt Bedeutung, funktional beschreibt
  Aktion (`alt="Suchen"`, nicht "Lupe").
- Hero-Bild: `priority`, nie lazy. Alles unter dem Fold lazy. `width`/`height` oder
  `aspect-ratio` gegen CLS. WebP/AVIF, `srcset` + `sizes`.
- Video-Autoplay: stumm, `playsinline`, sichtbarer Pause-Button, stoppt bei `reduce`.
- Logo-Walls: echte SVGs, grayscale + 45 % Opacity, Light+Dark tauglich.

---

## 11. Screenreader & Live-Regions

Drei Mechanismen, drei Jobs:
- `aria-describedby`: feldspezifische Validierung.
- `role="status"` (polite): Toasts, Ergebniszähler, nicht-dringende Updates. Region VOR dem
  Update stabil im DOM rendern, dann Text setzen.
- `role="alert"`: dringende, feldlose Fehler. Nichts sonst.

Icon-only-Buttons: `aria-label`. Sichtbarer Label-Text muss im Accessible Name vorkommen.
Dekoratives `aria-hidden="true"`, nie auf Fokussierbarem. Karussells: Position ansagen,
Prev/Next per Keyboard, Autoplay stoppt bei Fokus/Hover/`reduce`.

---

## 12. Zoom, Reflow, i18n

- 200 % Zoom und 320px Breite ohne Horizontal-Scroll. `min-height` statt `height` auf Text.
- Viewport-Meta nie mit `maximum-scale=1` oder `user-scalable=no`.
- `lang="de"`, `dir` an Sprachgrenzen; `<bdi>` für gemischte Werte; Ziffern nie reversen.
- Formatierung per `Intl.NumberFormat("de-DE")`, `Intl.DateTimeFormat`; Pluralisierung per Library.
- Text selektierbar lassen; `user-select: none` nur auf Drag-Flächen.

---

## 13. Reporting-Contract (für jeden Review mit diesen Regeln)

Severity: **HIGH** bricht Interaktion, versteckt Inhalt vor AT, macht Text unlesbar oder weist
eine irreführende semantische Farbe zu. **MEDIUM** sichtbare Inkonsistenz oder erschwerte
Interaktion. **LOW** isolierter Polish.

Verifikation: ohne Browser aus dem Code (jeder State, Dauern/Easings, Token-Werte, Accessible
Names, Label-Bindungen); mit Browser jeden State durchgehen, Motion auf 10 % Speed, Tab-Flow,
Accessibility-Tree, Kontrast am gerenderten Hintergrund, alle Viewports, 200 % Zoom.
Nicht Prüfbares explizit als `Not verified`.

Format: nach Prinzip gruppiert, nach Severity sortiert, eine Zeile pro Root-Cause mit allen
Fundstellen:

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |

`Location` = `pfad/datei:zeile`. `Why` nennt Prinzip und Nutzer-Auswirkung. Abschluss `Block`
bei offenem HIGH, sonst `Approve`. Nie Coverage approven, die nicht inspiziert wurde. Ohne
Befund: "Keine handlungsrelevanten Findings" plus Verifikationsumfang.
