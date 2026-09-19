# Effekte & Motion-Techniken

Implementierbare CSS-Muster für hochwertige, performante Effekte. Grundregel:
Gradients sind nie flach-linear, sondern smooth (OKLCH, Mesh, Blur-Blobs + Grain).
Effekte folgen der Motion-Doktrin (motion.md): motiviert, GPU-freundlich, Reduced-Motion-sicher.


## 1. Smooth / Mesh-Gradients (statt flacher linearer Gradients)

CSS hat kein natives `mesh-gradient()`: Mesh wird **simuliert durch Stapeln mehrerer halbtransparenter radialer Gradients** auf einem Element. Jeder Farbpunkt wird ein `radial-gradient(... at x% y%, farbe, transparent)`:

```css
.hero {
  background-color: #0b0b1a; /* Basis-Farbe darunter */
  background-image:
    radial-gradient(at 20% 30%, oklch(70% 0.2 330 / 0.8), transparent 50%),
    radial-gradient(at 80% 20%, oklch(75% 0.18 220 / 0.8), transparent 50%),
    radial-gradient(at 60% 80%, oklch(80% 0.15 150 / 0.7), transparent 55%);
}
```

**OKLCH-Interpolation repariert die „graue Mitte":** sRGB interpoliert komplementäre Farben über Grautöne. Zwei Wörter genügen: Stops dürfen Hex bleiben:

```css
background: linear-gradient(45deg in oklch, #ff0080, #00d4ff);
background: radial-gradient(circle in oklch, #ff0080, #00d4ff);
background: conic-gradient(from 0deg in oklch, #ff0080, #00d4ff, #ff0080);
```
Support: Chrome 111+, Firefox 113+, Safari 16.2+. Fallback: sRGB-Deklaration zuerst schreiben oder `@supports`.

**Conic für aurora-artige Sweeps:**
```css
background: conic-gradient(from 180deg at 50% 120% in oklch,
  #7c3aed, #06b6d4, #f472b6, #7c3aed);
filter: blur(60px); /* weicher Aurora-Hintergrund */
```

**Blur-Blob-Technik:** 2–4 große, bunte `<div>`s mit `border-radius: 50%` (oder organischem `border-radius: 40% 60% 70% 30% / 60% 30% 70% 40%`), starkem `filter: blur(80px)` und optional langsamer Keyframe-Translation: billiger als riesige Gradienten zu animieren, weil nur `transform` animiert wird.

**Grain-Overlay darüber** (macht Gradients „teuer", verhindert Banding):
```css
.grain::after {
  content: "";
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG feTurbulence-Noise als Data-URI */
  opacity: 0.06;
  mix-blend-mode: overlay;
  pointer-events: none;
}
```
SVG-Noise generieren: `<filter><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2"/></filter>` auf voller Fläche, als Data-URI einbetten.

Tools: colorffy.com/mesh-gradient-generator, csshero.org/mesher.

---

## 2. Figma-Effekte → CSS Mapping

| Figma-Effekt | CSS | Hinweis |
|---|---|---|
| Background Blur | `backdrop-filter: blur(12px)` | Blurrt was **hinter** dem Element liegt; braucht halbtransparenten Hintergrund (`rgba(...,0.5)`), sonst unsichtbar |
| Layer Blur | `filter: blur(8px)` | Blurrt das Element **selbst** |
| Drop Shadow | `box-shadow: 0 8px 24px rgb(0 0 0 / 0.12)` | Figma: x, y, blur, spread → direkt mappen; für realistischere Schatten mehrere Stufen stapeln |
| Inner Shadow | `box-shadow: inset 0 1px 3px rgb(0 0 0 / 0.2)` | `inset`-Keyword; Figma erlaubt Überstand außerhalb: in CSS nur per Pseudo-Element-Workaround |
| Stroke | `border` (außen) oder `box-shadow: 0 0 0 1px color` (kein Layout-Einfluss) | „Inside"-Stroke → `box-shadow: inset 0 0 0 1px ...` |
| Layer-Opacity / Blend Modes | `opacity`, `mix-blend-mode`, `background-blend-mode` | |

**Häufigster Fehler:** `backdrop-filter` auf vollem Opacity-Hintergrund → nichts passiert. Und: Layer Blur ≠ Background Blur: komplett verschiedene Properties.

Realistische Schatten (Figma-Look übertreffen):
```css
box-shadow:
  0 1px 2px rgb(0 0 0 / 0.06),
  0 4px 8px rgb(0 0 0 / 0.06),
  0 12px 32px rgb(0 0 0 / 0.08);
```

---

## 3. Text-Effekte

**Gradient-Text: nur für kurze Headlines, nie für Fließtext** (Kontrast/Lesbarkeit; Screenreader lesen normal, aber visuelles Kontrast-Rating schlägt oft fehl):
```css
h1 {
  background: linear-gradient(90deg in oklch, #a78bfa, #22d3ee);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

**Text-Reveal-Maske (zeilenweiser Slide-Up):** jede Zeile in `<span class="line"><span class="inner">…</span></span>` wrappen; `.line { overflow: hidden; }` und `.inner { transform: translateY(110%); transition: transform .8s cubic-bezier(.2,.7,.2,1); }` → bei `.is-visible` auf `translateY(0)`, mit gestaffeltem `transition-delay`.

**Kinetic Typography:** Char-Splitting (pro Buchstabe ein `<span>`), dann per CSS `transition-delay: calc(var(--i) * 30ms)` Stagger beim Hover; für Scroll-getriebenes Kinetic: `animation-timeline: view()` auf einzelne Wörter.

**Variable-Font-Animation:** Font mit `wght`-/`wdth`-Achse laden, dann:
```css
.variable:hover { font-variation-settings: "wght" 800; transition: font-variation-settings .4s; }
/* oder Keyframes zwischen "wght" 300 ↔ 900: Paint-only, akzeptabel */
```
Hinweis: `font-variation-settings` triggert Paint (nicht Layout, solange Metriken gleich bleiben): für Headline-Hover okay.

Libraries: GSAP SplitText, splitting.js, motion.dev.

---

## 4. Liquid Glass / Glassmorphism 2025–2026

**Klassisches Glas (cross-browser sicher):**
```css
.glass {
  background: rgb(255 255 255 / 0.08);
  backdrop-filter: blur(16px) saturate(1.6);
  border: 1px solid rgb(255 255 255 / 0.15);
  border-radius: 16px;
  /* Spekular-Highlight oben: */
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.25), 0 8px 32px rgb(0 0 0 / 0.2);
}
```
`saturate(1.4–1.8)` im backdrop-filter ist der Schlüssel zum „Apple-Look": erhöht die Lebendigkeit des durchscheinenden Hintergrunds.

**Echte Refraction (Apple Liquid Glass):** SVG-Displacement-Filter. Ein Rounded-Rect-SDF wird als Displacement-Map gerastert (R/G = X/Y-Verschiebung, B = Spekular-Maske), dann `filter: url(#lens)` mit `feDisplacementMap` auf den Inhalt, optional 3-Pass-RGB-Split für chromatische Aberration:
```html
<svg width="0" height="0"><filter id="lens">
  <feImage href="displacement-map.png" result="map"/>
  <feDisplacementMap in="SourceGraphic" in2="map" scale="40"
    xChannelSelector="R" yChannelSelector="G"/>
</filter></svg>
```
Fertige Lösung: **`@samasante/liquid-glass`** (glass.samasante.com): refraktiert das **live DOM** (Text bleibt selektierbar), läuft in Chrome + Safari + Firefox, 0 Deps. Vorteil gegenüber `backdrop-filter: url()` (nur Chromium) und WebGL-Snapshot-Libs (eingefrorener Screenshot).

Spekular-Highlights: zusätzlicher Pseudo-Element-Layer mit hellem Gradient oben/links + ggf. zweiter dunkler unten: simuliert Lichtbrechung an der Kante.

---

## 5. Hover-/Micro-Interaktionen, die „teuer" wirken

- **Magnetischer Button:** `mousemove` → Distanz Button-Center zu Cursor, `transform: translate(dx*0.3, dy*0.3)` mit Lerp (`current += (target-current)*0.15`) in `requestAnimationFrame`; bei `mouseleave` zurück auf 0 (mit Spring-Easing). Lib: motion.dev `useSpring`.
- **Char-Split Hover:** Text splitten, zwei Kopien übereinander; Hover: obere Zeichen `translateY(-100%)` rotieren raus, untere rein, Stagger per `--i`. Fertig: splitting.js, GSAP SplitText, reactbits.dev.
- **Scramble Text:** Interval, das Zeichen durch Random-Chars ersetzt und links→rechts „auflöst" (~30 Zeilen JS). Fertig: reactbits.dev „ScrambleText".
- **Image Trail:** bei `mousemove` (gedrosselt auf Distanz > 80px) Thumbnail am Cursor spawnen, mit `transform` + `opacity` raus-animieren, nach 600ms entfernen.
- **Marquee:** Track-Inhalt duplizieren, `@keyframes { to { transform: translateX(-50%); } }` mit `animation: x 20s linear infinite`; Pause per `animation-play-state: paused` bei Hover.
- **3D Tilt:** `mousemove` → Rotation relativ zur Kartenmitte: `transform: perspective(800px) rotateX(dy*8deg) rotateY(dx*-8deg)`, Glanz-Pseudo-Element mit radial-gradient am Cursor-Punkt.
- **Custom Cursor:** `cursor: none` + fixed div, per Lerp nachgezogen; skaliert auf Hover über Links (`transform: scale(2)`).

Quellen für fertige Komponenten: **reactbits.dev**, **ui.aceternity.com**, **magicui.design**, **cult-ui.com**, codrops-Demos.

---

## 6. Scroll-Effekte

**CSS Scroll-Driven Animations (Chrome/Edge 115+, Safari 18+, Firefox in Arbeit): kein JS, läuft auf dem Compositor:**

```css
/* Reveal beim Eintritt ins Viewport */
.card {
  animation: fade-up linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 40%;
}
@keyframes fade-up {
  from { opacity: 0; translate: 0 40px; }
  to   { opacity: 1; translate: 0 0; }
}

/* Reading-Progress-Bar */
.progress {
  position: fixed; inset: 0 0 auto 0; height: 4px;
  animation: grow linear; animation-timeline: scroll(root block);
  transform-origin: left;
}
@keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }

/* Parallax ohne JS */
.parallax {
  animation: shift linear both;
  animation-timeline: view();
  animation-range: cover 0% cover 100%;
}
@keyframes shift { from { transform: translateY(10%); } to { transform: translateY(-10%); } }

/* Immer Fallback: */
@supports not (animation-timeline: view()) {
  .card, .parallax { animation: none; opacity: 1; transform: none; }
}
```
`animation-range`-Keywords: `entry`, `exit`, `cover`, `contain` (+ Prozent). `timeline-scope` + `view-timeline: --name` erlauben, Element A zu tracken und Element B zu animieren (sticky-Pattern).

**ScrollTrigger (GSAP) nur wenn nötig:** programmatische Kontrolle (play/pause/reverse), Sequenzierung, index-basiertes Stagger, Physik. Faustregel 2026: ~70 % der dekorativen Scroll-Animationen gehen nativ; GSAP/Framer-Motion nur für komplexe Timelines: spart 30–70 KB Bundle.

**Sticky Stack:** Sektionen `position: sticky; top: 0` in einem normalen Flow-Container: Karten stapeln sich ohne JS; kombinierbar mit `view()`-Timeline für Scale/Blur der abgedeckten Karte.

**Horizontal Scroll-Section:** sticky Wrapper (Höhe = N × 100vh), inneres Flex-Row per `transform: translateX()` an die Scroll-Timeline gekoppelt.

**Parallax richtig:** nur `transform` auf separater Compositor-Layer, nie `background-position` animieren (Paint pro Frame), Stärke dezent (0.1–0.3×), `prefers-reduced-motion` respektieren.

---

## 7. 60fps-Regeln

Pipeline: **Style → Layout → Paint → Composite**. Budget: 16,7 ms/Frame. Je weiter rechts man bleibt, desto besser.

| Kostenklasse | Properties | Konsequenz |
|---|---|---|
| Composite (GPU, billig) | `transform`, `opacity` | Standard für alle Bewegungen |
| Paint (mittel) | `color`, `background-color`, `box-shadow` (schlimmer bei großem Blur), `background-position` | Hover-States ok, nie per Frame animieren |
| Layout (teuer) | `width`, `height`, `top/left`, `margin/padding`, `font-size`, `border-width` | Nie animieren: stattdessen `translate`/`scale` |

**Spezifische Killer:**
- **`filter: blur()` / `backdrop-filter` über große Flächen**: Kosten steigen mit Fläche × Radius; Blur lieber auf kleine Blobs begrenzen, statisch vor-renderten (Blobs statt Live-Blur), auf Mobile Radius stark reduzieren.
- **Große `box-shadow` animieren** → stattdessen `opacity` eines Pseudo-Element-Schatten-Layers crossfaden.
- **Scroll-Listener + `getBoundingClientRect()` pro Frame** → Layout-Thrashing; ersetzen durch `animation-timeline` oder IntersectionObserver.
- **Layout-Properties animieren** (Sidebar-Breite, Tooltip-`top`) → `scaleX`/`translateY`-Äquivalente.

**Layer-Management:**
```css
.card { will-change: transform; } /* NUR kurz vor der Animation setzen, danach entfernen */
```
- `will-change` nie dauerhaft/viele Elemente: jede Layer kostet GPU-Memory (Mobile-Crashs).
- DevTools-Check: Rendering-Panel → „Paint flashing" (orange = Main-Thread-Repaint = schlecht), „Layer borders".
- Scroll-linked Motion immer in `@media (prefers-reduced-motion: no-preference)` wrappen.

---

## Quellen (Auswahl)
- conic.style/oklch-gradients: OKLCH-Interpolation
- colorffy.com/mesh-gradient-generator: Mesh via gestapelte Radials
- pixelperfecthtml.com: Figma-Effekte → CSS (Layer vs. Background Blur)
- github.com/samasante/liquid-glass + glass.samasante.com: SVG-Displacement-Refraction, cross-browser
- joshwcomeau.com/animation/scroll-driven-animations: animation-range, timeline-scope
- dev.to/grimicorn, frontendhorizon.com: Scroll-Driven Animations Patterns & Support
- mintec.co: Entscheidungsmatrix Native CSS vs. GSAP/Framer
- frontendchecklist.io/rules/css/animation-performance, unpacked.danielhowells.com: Compositing, will-change
- scrimba.com: Paint-Kosten-Tabelle inkl. box-shadow/blur
