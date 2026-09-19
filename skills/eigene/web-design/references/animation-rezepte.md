# Animations-Rezepte für Business-Websites (Code, exakte Werte, kein "smooth")

Quelle der Werte: emilkowalski/skills (animate + RECIPES, emil-design-eng, review-animations
STANDARDS, apple-design), jakubkrehel better-ui (animations, enter-exit, icon-transitions),
pbakaus/impeccable Craft-Floor (Motion). Kalibriert auf Lead-Gen-, Dienstleister-, Solar-,
Immobilien- und SaaS-Marketing-Sites. Die Doktrin (Frequenz-Gate, Easing-Baum, Bans) steht in
`motion.md`; hier steht der Code.

Inhalt: 0 Warum KI-Animationen "komisch" wirken · 1 Motion-Tokens (Pflicht) · 2 Das
Business-Motion-Profil · 3 Scroll-Reveal (einmal, ruhig) · 4 Hero-Entrance · 5 Zähler ·
6 Akkordeon/FAQ · 7 Tabs & Underline-Indicator · 8 Sticky-Header · 9 Buttons & Cards ·
10 Funnel-Step-Wechsel · 11 Marquee/Logo-Wall · 12 Carousel/Testimonials · 13 Mega-Menü &
Mobile-Nav · 14 Toast/Dialog · 15 Icon-Wechsel · 16 Reduced Motion & Hover-Gating · 17 Was
NICHT animiert wird · 18 Feel-Check

---

## 0. Warum KI-Animationen "komisch" wirken (Diagnose vor dem Rezept)

Jeder Punkt ist ein beobachteter Fehlmodus. Die Rezepte unten sind so gebaut, dass sie
keinen davon auslösen.

| Symptom | Ursache im Code | Fix |
|---|---|---|
| Alles "poppt" rein | `scale(0)` oder `scale(0.5)` als Start, Bounce-Easing (`cubic-bezier(0.68,-0.55,…)`) | Start `scale(0.97)` + `opacity: 0`, `translateY(12px)`, exponentielles Ease-out |
| Zu schnell, zackig | 150ms auf Sektions-Reveals, `ease-in` | Reveals 500 bis 700ms mit `cubic-bezier(0.22, 1, 0.36, 1)`; UI bleibt unter 300ms |
| Alles bewegt sich gleichzeitig | kein Stagger, Reveal auf jedem Element | Sektion in 2 bis 4 Gruppen teilen, 60 bis 100ms Stagger, Elemente innerhalb einer Gruppe zusammen |
| Sektionen springen bei jedem Scroll erneut | Observer ohne `once` | `once: true`, `threshold 0.15`, `rootMargin: "0px 0px -10% 0px"` |
| Seite "flackert" beim Laden | Content startet `opacity: 0` und JS lädt spät | Default sichtbar; Reveal-Klasse nur setzen, wenn JS läuft (`html.js .reveal`) |
| Hover-Karten wachsen | `hover:scale-105` + `transition-all` | Hover = Flächenwechsel (Background/Border/Shadow-Opacity), nie Wachstum; Bilder nie animieren |
| Ruckelt auf Mobile | `box-shadow`, `height`, `filter: blur(40px)` animiert, Parallax per Scroll-Listener | Nur `transform` + `opacity`; Blur unter 20px; Parallax per CSS `animation-timeline` oder gar nicht |
| Derselbe Fade auf allen Sektionen | ein `.fade-up` global | Ein authored Focal-Moment (Hero), Rest ruhige Reveals mit Varianz (Distanz, Reihenfolge) |
| Animation läuft trotz Reduced Motion | keine Media-Query | Reduced Motion = Crossfade, Transform raus, Loops aus |
| Zähler "rattert" | `setInterval` mit linear | rAF + Ease-out, `tabular-nums`, einmalig bei Sichtbarkeit |

Merksatz: **Die Referenz-Websites (Enpal, Thermondo, EKD, Oura) sind fast still.** Ihre
Bewegung sitzt in wenigen Stellen: Hero, Zähler, Akkordeon, Karussell, Sticky-Header.
Eine Business-Site, die überall animiert, wirkt billiger, nicht teurer.

---

## 1. Motion-Tokens (Pflicht in jedem Projekt, `globals.css`)

Keine Kurve wird frei erfunden. Jede Animation referenziert diese Tokens.

```css
:root {
  /* Easing (aus emilkowalski/skills + impeccable) */
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);        /* UI: Dropdown, Popover, Dialog */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);    /* Reveals, Hero, alles Sichtbare */
  --ease-reveal: cubic-bezier(0.22, 1, 0.36, 1);     /* Scroll-Reveals, Landing */
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);    /* Bewegung auf dem Screen (Tabs, Slider) */
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);     /* Drawer, Sheets, Mobile-Nav */
  --ease-hover: ease;                                 /* Farbe, Border, Opacity */

  /* Dauer */
  --dur-press: 120ms;      /* Button :active */
  --dur-hover: 150ms;      /* Farbe, Border, Opacity */
  --dur-ui: 200ms;         /* Dropdown, Tooltip, Tabs */
  --dur-dialog: 250ms;     /* Modal, Sheet */
  --dur-drawer: 450ms;     /* Mobile-Nav, Drawer */
  --dur-reveal: 600ms;     /* Scroll-Reveal */
  --dur-hero: 700ms;       /* Hero-Entrance pro Gruppe */
  --dur-counter: 1400ms;   /* Zähler */

  /* Distanzen */
  --reveal-y: 16px;        /* Business: 12 bis 20px, nie 40px+ */
  --exit-y: -8px;
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --reveal-y: 0px;
    --exit-y: 0px;
    --dur-reveal: 250ms;
    --dur-hero: 250ms;
  }
}
```

Tailwind v4 (`@theme`):

```css
@theme {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-reveal: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
}
/* Nutzung: transition-transform duration-200 ease-[var(--ease-out)] */
```

---

## 2. Das Business-Motion-Profil (MOTION-Dial 3 bis 4)

Für Lead-Gen, Dienstleister, Solar, Immobilien, lokale Anbieter, B2B. Was auf der Seite
animiert, und nur das:

| Stelle | Animation | Werte |
|---|---|---|
| Hero (einmalig) | Stagger in 3 Gruppen: Headline, Sub + CTA, Trust/Visual | `opacity 0→1`, `translateY(16px→0)`, `blur(4px→0)`, 700ms, `--ease-out-expo`, Stagger 90ms |
| Sektions-Reveal | einmalig beim Eintritt, Gruppen statt Einzelteile | `opacity 0→1`, `translateY(16px→0)`, 600ms, `--ease-reveal`, Stagger 70ms, max 4 Gruppen |
| Zähler (Stats) | einmalig, rAF, Ease-out | 1400ms, `tabular-nums` |
| Akkordeon (FAQ) | `grid-template-rows 0fr→1fr` + Opacity | 220ms `--ease-out`; Chevron `rotate(180deg)` 200ms |
| Sticky-Header | Hintergrund/Shadow beim Scroll | `background-color`, `box-shadow` 200ms `ease`; Höhe NICHT animieren |
| Buttons | Press-Feedback, Hover-Fläche | `:active scale(0.97)` 120ms; Hover `background-color` 150ms |
| Cards (Leistungen) | Hover: Border/Shadow-Layer-Opacity | 150ms `ease`; kein Scale, kein Bild-Zoom |
| Karussell | Slide-Wechsel | `transform: translateX` 400ms `--ease-in-out`, Swipe per Embla |
| Mobile-Nav | Drawer von rechts/oben | 450ms `--ease-drawer`, Backdrop Opacity 250ms |
| Funnel-Step | Step-Wechsel horizontal | Exit 150ms nach links `-12px`, Enter 250ms von rechts `12px`, `--ease-out` |
| Logo-Marquee | optional, max 1x pro Seite | `linear`, 40 bis 60s pro Loop, Pause bei Hover |

Alles andere ist statisch. Kein Parallax, keine Cursor-Effekte, keine Blob-Hintergründe,
keine Text-Scramble-Effekte, kein 3D-Tilt. Diese gehören in Brand-/Experience-Sites mit
MOTION 6+, nie in eine Solar- oder Immobilien-Site.

---

## 3. Scroll-Reveal (einmal, ruhig, gruppiert)

### 3.1 Reines CSS mit `animation-timeline` (Chrome/Edge 115+, Safari 26+), Fallback sichtbar

```css
/* Content ist per Default sichtbar. Animation nur mit Support. */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .reveal {
      animation: reveal-up var(--dur-reveal) var(--ease-reveal) both;
      animation-timeline: view();
      animation-range: entry 10% entry 45%;
    }
  }
}
@keyframes reveal-up {
  from { opacity: 0; transform: translateY(var(--reveal-y)); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Grenze: `view()` spielt beim Zurückscrollen rückwärts. Für "einmal und fertig" den
Observer aus 3.2 nutzen.

### 3.2 React + IntersectionObserver, `once`, gruppiert (Standard für Business-Sites)

`components/Reveal.tsx`:

```tsx
"use client";
import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  /** Stagger-Index innerhalb einer Sektion, 0 bis 3 */
  index?: number;
};

export function Reveal({ children, as: Tag = "div", className = "", index = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.visible = "true";
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = "true";
          io.disconnect(); // einmal, nie wieder
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={{ "--i": index } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
```

`globals.css`:

```css
/* Default: sichtbar. Ohne JS bleibt alles lesbar (impeccable: content-hidden-at-rest = error). */
.reveal { opacity: 1; transform: none; }

html.js .reveal:not([data-visible="true"]) {
  opacity: 0;
  transform: translateY(var(--reveal-y));
}
html.js .reveal[data-visible="true"] {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity var(--dur-reveal) var(--ease-reveal),
    transform var(--dur-reveal) var(--ease-reveal);
  transition-delay: calc(var(--i, 0) * 70ms);
}
```

`html.js` wird im Root-Layout gesetzt (`<script>document.documentElement.classList.add("js")</script>`
im `<head>`), damit Nutzer ohne JS und Crawler nie einen leeren Screen sehen.

Regeln:
- Pro Sektion maximal 4 Reveal-Gruppen (Headline-Block, Grid, CTA). Nicht jede Card einzeln.
- Der Hero bekommt keinen Scroll-Reveal, sondern die Entrance aus Abschnitt 4.
- Elemente above the fold beim Laden (z. B. Trust-Bar direkt unter dem Hero) werden mit
  `index` in die Hero-Sequenz gehängt, nicht separat observiert.
- Distanz 12 bis 20px. 40px+ liest sich als "Slide", nicht als "Erscheinen".

### 3.3 Motion (motion.dev), wenn die Library ohnehin im Projekt ist

```tsx
import { motion, useReducedMotion } from "motion/react";

const group = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = (reduce: boolean) => ({
  hidden: { opacity: 0, transform: reduce ? "none" : "translateY(16px)" },
  show: {
    opacity: 1,
    transform: "translateY(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
});

export function RevealGroup({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      variants={group}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -10% 0px" }}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div key={i} variants={item(reduce)}>{child}</motion.div>
      ))}
    </motion.div>
  );
}
```

Volle `transform`-Strings statt `y:` (Hardware-Beschleunigung, emil-design-eng).

---

## 4. Hero-Entrance (der eine authored Moment)

Drei Gruppen, nicht zwölf Elemente. Headline optional als Zeilen-Maske.

```tsx
// Hero.tsx (Ausschnitt)
<section className="hero">
  <h1 className="hero-line-mask">
    <span className="hero-line" style={{ "--i": 0 } as React.CSSProperties}>
      Strom vom eigenen Dach.
    </span>
    <span className="hero-line" style={{ "--i": 1 } as React.CSSProperties}>
      Ohne Anzahlung, in 6 Wochen.
    </span>
  </h1>
  <div className="hero-enter" style={{ "--i": 2 } as React.CSSProperties}>
    <p>…Subline ≤ 20 Wörter…</p>
    <a className="btn-primary" href="/angebot">Angebot anfordern</a>
  </div>
  <div className="hero-enter" style={{ "--i": 3 } as React.CSSProperties}>
    {/* Trust: Sterne + Anzahl, echt */}
  </div>
</section>
```

```css
.hero-line-mask { overflow: hidden; }
.hero-line { display: block; }

html.js .hero-line {
  transform: translateY(110%);
  animation: hero-line var(--dur-hero) var(--ease-out-expo) forwards;
  animation-delay: calc(var(--i) * 90ms);
}
html.js .hero-enter {
  opacity: 0;
  transform: translateY(16px);
  filter: blur(4px);
  animation: hero-enter var(--dur-hero) var(--ease-out-expo) forwards;
  animation-delay: calc(120ms + var(--i) * 90ms);
}
@keyframes hero-line { to { transform: translateY(0); } }
@keyframes hero-enter { to { opacity: 1; transform: translateY(0); filter: blur(0); } }

@media (prefers-reduced-motion: reduce) {
  html.js .hero-line { transform: none; animation: none; }
  html.js .hero-enter {
    transform: none; filter: none;
    animation: hero-fade 250ms ease forwards;
  }
  @keyframes hero-fade { to { opacity: 1; } }
}
```

Regeln: Gesamtsequenz endet nach maximal 1,1s. Der CTA ist ab 300ms klickbar (Animation
blockiert nie Interaktion). Hero-Bild/Video braucht keinen Fade, wenn es `fetchpriority="high"`
lädt: das LCP-Element soll sofort da sein. Keyframes sind hier korrekt, weil die Sequenz
genau einmal läuft (better-ui: Keyframes für einmalige Sequenzen, Transitions für
Interaktion).

---

## 5. Zähler (Stats, "2.000+ Anlagen")

```tsx
"use client";
import { useEffect, useRef, useState } from "react";

export function Counter({ to, suffix = "", duration = 1400 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        setValue(Math.round(to * easeOutExpo(p)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString("de-DE")}{suffix}
    </span>
  );
}
```

Regeln: `tabular-nums` (better-typography), Ease-out (nicht linear), einmalig, nur auf
echten Zahlen. Der Endwert muss im SSR-HTML stehen (nicht `0`), damit Crawler und
No-JS-Nutzer die echte Zahl sehen: `useState(to)` initial und erst im Effect auf 0 setzen,
wenn JS und Motion erlaubt sind.

---

## 6. Akkordeon / FAQ (Höhe ohne Layout-Jank)

`grid-template-rows` animiert sauber von `0fr` auf `1fr`, ohne JS-Messung.

```tsx
<details className="faq" name="faq">
  <summary>
    <span>Wie lange dauert die Installation?</span>
    <ChevronIcon className="faq-chevron" aria-hidden />
  </summary>
  <div className="faq-body"><div className="faq-inner">
    <p>In der Regel 1 bis 2 Tage vor Ort. …</p>
  </div></div>
</details>
```

```css
.faq summary { cursor: pointer; list-style: none; display: flex; justify-content: space-between; gap: 16px; padding-block: 20px; }
.faq summary::-webkit-details-marker { display: none; }
.faq-chevron { transition: transform var(--dur-ui) var(--ease-out); }
.faq[open] .faq-chevron { transform: rotate(180deg); }

/* Höhe: grid-Trick, kein JS */
.faq-body {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition:
    grid-template-rows 220ms var(--ease-out),
    opacity 180ms var(--ease-out);
}
.faq[open] .faq-body { grid-template-rows: 1fr; opacity: 1; }
.faq-inner { overflow: hidden; }

/* Native <details> kann nicht schließen-animieren; für Exit-Animation:
   Base UI Collapsible oder Radix Accordion mit data-[state=closed] nutzen. */
```

`name="faq"` (exklusive Akkordeons, Chrome 120+, Safari 17.2+) öffnet nur ein Element.
Für Exit-Animation und volle Kontrolle: Base UI `Collapsible` mit `data-starting-style`
und `data-ending-style`, dieselben 220ms.

---

## 7. Tabs & Underline-Indicator (Leistungs-Tabs, Preis-Toggle)

Indicator per `clip-path` oder als eigenes Element mit `translateX` + `scaleX`, nie
`left`/`width`.

```tsx
"use client";
import { useLayoutEffect, useRef, useState } from "react";

export function Tabs({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0].id);
  const listRef = useRef<HTMLDivElement>(null);
  const [ind, setInd] = useState({ x: 0, w: 0 });

  useLayoutEffect(() => {
    const btn = listRef.current?.querySelector<HTMLButtonElement>(`[data-id="${active}"]`);
    if (btn) setInd({ x: btn.offsetLeft, w: btn.offsetWidth });
  }, [active]);

  return (
    <div ref={listRef} role="tablist" className="relative flex gap-6 border-b border-border">
      {items.map((t) => (
        <button
          key={t.id} data-id={t.id} role="tab" aria-selected={active === t.id}
          onClick={() => setActive(t.id)}
          className="py-3 text-sm font-medium text-ink-muted aria-selected:text-ink transition-colors duration-150"
        >
          {t.label}
        </button>
      ))}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-[1px] origin-left bg-accent"
        style={{
          transform: `translateX(${ind.x}px) scaleX(${ind.w})`,
          transition: "transform 200ms var(--ease-in-out)",
        }}
      />
    </div>
  );
}
```

`--ease-in-out`, weil das Element auf dem Screen von A nach B fährt (nicht ein-/austritt).
Panel-Wechsel: instant oder 150ms Opacity-Crossfade. Kein Slide.

---

## 8. Sticky-Header (Hintergrund beim Scroll, Höhe stabil)

```tsx
"use client";
import { useEffect, useState } from "react";

export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    // Sentinel statt Scroll-Listener: kein Layout-Thrash
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting), {
      rootMargin: `-${threshold}px 0px 0px 0px`,
    });
    io.observe(sentinel);
    return () => io.disconnect();
  }, [threshold]);
  return scrolled;
}
```

```css
.header {
  position: sticky; top: 0; z-index: 40;
  height: 72px;
  background-color: transparent;
  transition: background-color 200ms ease, box-shadow 200ms ease;
}
.header[data-scrolled="true"] {
  background-color: color-mix(in oklab, var(--canvas) 88%, transparent);
  backdrop-filter: blur(12px) saturate(1.4);
  box-shadow: 0 1px 0 var(--border);
}
@media (prefers-reduced-transparency: reduce) {
  .header[data-scrolled="true"] { background-color: var(--canvas); backdrop-filter: none; }
}
```

Höhe nie animieren (Layout). Wer den Header "schrumpfen" lassen will: Logo per
`transform: scale(0.85)` mit `transform-origin: left center`, 200ms.

Mobile-Sticky-CTA (Launch-Checkliste): fixe Leiste unten, `env(safe-area-inset-bottom)`,
erscheint nach dem Hero per Sentinel, `translateY(100%)→0` 250ms `--ease-out`.

---

## 9. Buttons & Cards

```css
.btn-primary {
  background-color: var(--accent);
  color: var(--accent-fg);
  transition:
    background-color var(--dur-hover) var(--ease-hover),
    transform var(--dur-press) var(--ease-out);
}
@media (hover: hover) and (pointer: fine) {
  .btn-primary:hover { background-color: var(--accent-hover); }
}
.btn-primary:active { transform: scale(0.97); }
.btn-primary:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }

/* Pfeil-Icon im Button: 2px Versatz, kein Sprung */
.btn-primary .arrow { transition: transform var(--dur-hover) var(--ease-out); }
@media (hover: hover) and (pointer: fine) {
  .btn-primary:hover .arrow { transform: translateX(2px); }
}
```

Card-Hover ohne Wachstum (Shadow als eigener Layer, nur Opacity animiert):

```css
.card { position: relative; border: 1px solid var(--border); border-radius: 16px; }
.card::after {
  content: ""; position: absolute; inset: 0; border-radius: inherit;
  box-shadow: 0 1px 2px oklch(0 0 0 / 0.06), 0 8px 24px -8px oklch(0 0 0 / 0.12);
  opacity: 0; pointer-events: none;
  transition: opacity var(--dur-hover) var(--ease-hover);
}
@media (hover: hover) and (pointer: fine) {
  .card:hover { border-color: var(--border-strong); }
  .card:hover::after { opacity: 1; }
}
/* Bilder in Cards: kein scale, kein Zoom (impeccable: image-hover-transform) */
```

---

## 10. Funnel-Step-Wechsel (Multi-Step-Formular)

Vorwärts: alt nach links raus (kurz), neu von rechts rein. Rückwärts gespiegelt.
Höhe des Containers per `min-height` stabil halten, nie animieren.

```tsx
"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function StepFrame({ step, dir, children }: { step: number; dir: 1 | -1; children: React.ReactNode }) {
  const reduce = useReducedMotion() ?? false;
  const dx = reduce ? 0 : 12 * dir;
  return (
    <div className="relative min-h-[320px]">
      <AnimatePresence mode="wait" initial={false} custom={dir}>
        <motion.div
          key={step}
          initial={{ opacity: 0, transform: `translateX(${dx}px)` }}
          animate={{ opacity: 1, transform: "translateX(0px)", transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] } }}
          exit={{ opacity: 0, transform: `translateX(${-dx}px)`, transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] } }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

Fortschrittsbalken: `transform: scaleX()` mit `transform-origin: left`, 300ms
`--ease-out`. Auswahl-Kachel (Radio-Card): `:checked` → Border-Farbe + Check-Icon
(Icon-Wechsel aus Abschnitt 15), Auto-Advance nach 250ms, damit der Nutzer die
Auswahl noch sieht.

---

## 11. Marquee / Logo-Wall (optional, maximal einmal pro Seite)

impeccable markiert Marquees als Slop-Risiko. Für Business-Sites gilt: statische
Logo-Wall (Grayscale, 45 % Opacity) ist der Default. Marquee nur, wenn mehr als 8 Logos
und der Brief es will.

```css
.marquee { overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
.marquee-track { display: flex; gap: 64px; width: max-content; animation: marquee 50s linear infinite; }
@keyframes marquee { to { transform: translateX(-50%); } }
@media (hover: hover) { .marquee:hover .marquee-track { animation-play-state: paused; } }
@media (prefers-reduced-motion: reduce) { .marquee-track { animation: none; } }
```

Track-Inhalt einmal duplizieren (`aria-hidden` auf der Kopie).

---

## 12. Carousel / Testimonials

Library: Embla (Swipe, Snap, keine Physik selbst bauen). Slide-Bewegung
`--ease-in-out` 400ms; Dots als Indicator (aktiv = Opacity 100 %, inaktiv 40 %);
Autoplay nur mit sichtbarer Pause und Stopp bei Hover/Fokus/`reduce`.

```tsx
import useEmblaCarousel from "embla-carousel-react";
const [ref, api] = useEmblaCarousel({ loop: true, align: "start", duration: 25 });
// duration ist in Embla ein Tween-Faktor (20–30 ≈ 400–500ms), nicht ms
```

Peek-Card rechts (letzte Card angeschnitten, 16 bis 32px) als Scroll-Hinweis
(better-layout: hint at hidden content).

---

## 13. Mega-Menü & Mobile-Nav

Desktop-Dropdown: Origin am Trigger, 200ms.

```css
.menu-panel {
  transform-origin: var(--transform-origin, top left);
  transition: opacity var(--dur-ui) var(--ease-out), transform var(--dur-ui) var(--ease-out);
}
.menu-panel[data-starting-style], .menu-panel[data-ending-style] {
  opacity: 0; transform: translateY(-4px) scale(0.98);
}
```

Mobile-Nav (Vaul/Base-UI-Drawer oder eigener `<dialog>`):

```css
.mobile-nav { transform: translateX(100%); transition: transform var(--dur-drawer) var(--ease-drawer); }
.mobile-nav[data-open="true"] { transform: translateX(0); }
.mobile-nav-backdrop { opacity: 0; transition: opacity 250ms var(--ease-out); }
.mobile-nav-backdrop[data-open="true"] { opacity: 1; }
```

Links innerhalb: kein Stagger (Navigation ist hochfrequent). Fokus in die Nav setzen,
`inert` auf den Rest, Escape schließt, `overscroll-behavior: contain`.

Hamburger-Icon: Icon-Wechsel aus Abschnitt 15, keine Dreistrich-Morph-Choreografie.

---

## 14. Toast / Dialog (Sonner + Base UI)

Toast: Sonner, unverändert (400ms `ease`, `translateY(100%)` Start, Exit gleicher Weg).
Dialog:

```css
.dialog { transform-origin: center; transition: opacity 250ms var(--ease-out), transform 250ms var(--ease-out); }
.dialog[data-starting-style], .dialog[data-ending-style] { opacity: 0; transform: scale(0.96); }
.dialog-backdrop { transition: opacity 250ms var(--ease-out); }
```

Modal nur, wenn Unterbrechung nötig ist (impeccable: Modal ist meist Faulheit). Cookie-
Banner: kein Modal, unten als Sheet, 300ms `--ease-out`.

---

## 15. Icon-Wechsel (Check, Chevron, Hamburger→X, Sonne→Mond)

Exakte Werte aus better-ui: scale 0.25→1, opacity 0→1, blur 4px→0, Spring
`{ type: "spring", duration: 0.3, bounce: 0 }`. Ohne Library: beide Icons im DOM,
Crossfade 300ms `cubic-bezier(0.2, 0, 0, 1)`.

```css
.icon-swap { position: relative; display: inline-grid; place-items: center; }
.icon-swap > svg { grid-area: 1 / 1; transition: opacity 300ms cubic-bezier(0.2, 0, 0, 1), transform 300ms cubic-bezier(0.2, 0, 0, 1), filter 300ms cubic-bezier(0.2, 0, 0, 1); }
.icon-swap > .is-hidden { opacity: 0; transform: scale(0.25); filter: blur(4px); }
```

---

## 16. Reduced Motion & Hover-Gating (Pflicht in jedem Rezept)

```css
/* Sanfter, nicht null: Opacity/Farbe bleiben, Transform-Bewegung und Loops fallen weg */
@media (prefers-reduced-motion: reduce) {
  .reveal, .hero-enter, .hero-line { transform: none !important; filter: none !important; }
  .marquee-track, .parallax { animation: none !important; }
  .carousel [data-autoplay] { animation-play-state: paused; }
}
/* Hover nur bei echtem Pointer */
@media (hover: hover) and (pointer: fine) { /* alle :hover-Regeln hier */ }
```

Nie global `* { animation-duration: 0.01ms !important }` (impeccable Audit: Befund, kein Fix).

---

## 17. Was auf Business-Websites NICHT animiert wird

- Navigation-Links (hochfrequent): nur Farbe 150ms.
- Formularfelder: Fokus-Ring instant; Label-Float maximal 150ms.
- Tabellen, Preise, Datenzeilen: statisch (Daten, die gelesen werden, bewegen sich nicht).
- Bilder bei Hover: nie.
- Sektionshintergründe: keine Blobs, kein Gradient-Drift, kein Grain-Flackern.
- Cookie-Banner, Footer, Breadcrumbs, Sidebar-Inhaltsverzeichnis: statisch.
- Scroll-Cues ("scroll to explore"), Cursor-Follower, Text-Scramble: Production-Test-Tells.
- Keyboard-ausgelöste Aktionen: keine Animation (Frequenz-Gate).

---

## 18. Feel-Check (vor Screenshot-QA)

1. DevTools → Animations-Panel auf 10 % Geschwindigkeit: Was bei 10 % falsch wirkt, ist bei
   100 % subtil falsch (better-ui).
2. Seite mit `prefers-reduced-motion: reduce` laden (DevTools Rendering): Alles lesbar, nichts
   springt, kein leerer Screen.
3. JS deaktivieren: Content sichtbar (kein `opacity: 0` at rest).
4. 4x-CPU-Throttle + Mobile: kein Ruckeln bei Reveal und Karussell.
5. Mit frischen Augen am nächsten Tag: Was nervt beim zweiten Besuch? Das fliegt raus.
6. Zählen: Wie viele verschiedene Bewegungen hat die Seite? Business-Site: 5 bis 8 Typen,
   nicht 20.
