# Motion-Doktrin

Die beste Animation ist oft keine. Motion ist Teil des Builds, motiviert und benennbar:
"sieht cool aus" ist kein Grund. Bei Unsicherheit: löschen ist der stärkste Zug.

Inhalt: 1 Frequenz-Gate · 2 Zweck · 3 Easing · 4 Dauer · 5 Properties & Performance ·
6 Tool-Auswahl · 7 Interruptibility & Gesten · 8 Enter/Exit & Stagger ·
9 Scroll-Motion · 10 Accessibility · 11 Motion-Bans

Diese Datei ist die Doktrin (das Warum). Die copybaren Rezepte mit exakten Werten,
kalibriert auf Business-Sites, stehen in `animation-rezepte.md`; dort auch die
Diagnose, warum KI-Animationen poppend wirken, und der Feel-Check. Beim Bauen:
erst hier das Gate, dann dort das Rezept.

---

## 1. Das Frequenz-Gate (zuerst, vor jeder Animation)

| Frequenz | Entscheidung |
|---|---|
| 100+/Tag (Shortcuts, Command Palette) | **Keine Animation. Niemals.** Tastatur-Aktionen sind Disqualifizierer. |
| Zig-mal/Tag (Hover, Listennavigation) | Nur fast-unwahrnehmbar: schnell + subtil, oder nichts |
| Gelegentlich (Modals, Drawer, Toasts) | Standard-Animation |
| Selten/erstmalig (Onboarding, Success, Celebration) | Hier lebt das Delight-Budget |

## 2. Zweck benennen

Erlaubte Zwecke: **Feedback** · **Spatial Consistency** · **State Indication** ·
**Jarring Change verhindern** · **Explanation** (nur Marketing/Onboarding) ·
**Delight** (nur Selten-Tier). Funktions-Check: Daten, die der User liest, bewegen sich
nicht für Style.

## 3. Easing

- Entscheidungsbaum: Enter/Exit → `ease-out` · On-Screen-Bewegung → `ease-in-out` · Hover/Farbe → `ease` · konstante Bewegung → `linear` · Default → `ease-out`.
- **Niemals `ease-in` auf UI** (startet langsam, verzögert genau den beobachteten Moment).
- Eingebaute CSS-Easings sind zu schwach. Standard-Kurven:
  - `cubic-bezier(0.22, 1, 0.36, 1)` (starker Allrounder, Landing/Reveals)
  - `cubic-bezier(0.23, 1, 0.32, 1)` (UI ease-out)
  - `cubic-bezier(0.16, 1, 0.3, 1)` (natürliche Dezeleration)
  - `cubic-bezier(0.77, 0, 0.175, 1)` (ease-in-out, On-Screen-Movement)
  - `cubic-bezier(0.32, 0.72, 0, 1)` (Drawer, iOS-artig)
  - Spring-Overshoot: `cubic-bezier(0.34, 1.56, 0.64, 1)` (sparsam)
- Kurven von easing.dev/easings.co holen, nicht selbst erfinden. Keine approximierten Werte.

## 4. Dauer

| Element | Dauer |
|---|---|
| Button-Press-Feedback | 100–160ms |
| Tooltips, kleine Popover | 125–200ms |
| Dropdowns, Selects | 150–250ms |
| Modals, Drawer | 200–500ms |
| Marketing-/Scroll-Reveals | 0.4–0.9s (Peak 0.6s) |
| Authored Focal-Entrance | bis 500–800ms |

- **UI bleibt unter 300ms.** Exit schneller/kürzer als Enter, nie abrupt; Exit-Dauer = 60–70 % der Enter-Dauer.
- Asymmetrisches Timing: deliberate Phase langsam, System-Antwort snappy.

## 5. Properties & Performance

- **Nur `transform` + `opacity`** animieren (GPU). Layout-Properties (width/height/margin/top/left) = Finding. `clip-path` als sanktionierter Dritter.
- **Niemals `scale(0)`** → Start `scale(0.9–0.97)` + `opacity: 0`. Nichts entsteht aus dem Nichts. Press-Feedback `scale(0.96)`, nie < 0.95.
- **`transform-origin` am Trigger** für Popover/Dropdowns/Tooltips; Modals bleiben zentriert.
- `transition: all` verboten → exakte Properties benennen.
- Framer Motion: volle transform-Strings (`transform: "translateX(100px)"`), nicht `x`/`y`-Shorthands (nicht hardware-beschleunigt).
- Kein Child-Transform über CSS-Variable am Parent. `will-change` nur während bekannter Animation. `filter: blur` < 20px. Loops stoppen, wenn offscreen.
- **Theme-Switch-Smear-Fix**: `*,*::before,*::after { transition: none !important }` injizieren, Reflow forcieren (`document.body.offsetHeight` lesen), per doppeltem `requestAnimationFrame` entfernen. Bei next-themes eingebaut: `disableTransitionOnChange`.
- Content im Default-State sichtbar (Script-Fehler darf Seite nicht verstecken).

## 6. Tool-Auswahl (billigstes, das funktioniert)

1. Hover/Press/Farbe/Class-Toggle → **CSS transition**
2. Entry on mount → **CSS `@starting-style`**
3. Vorbestimmte Motion, smooth unter Last → **CSS animation**
4. Programmatische Kontrolle ohne Lib → **WAAPI**
5. Springs, Layout-Animationen, Exits, Gesten → **Motion (motion.dev)**

Keine Motion-Library für einen Fade installieren. Komponenten mit Focus-Management
(Toast, Drawer, Command Menu) aus UI-Library nehmen, nicht hand-rollen.

## 7. Interruptibility & Gesten (Apple-Prinzipien)

- **Wichtigstes Prinzip: Interruptibility.** Jede Animation jederzeit greif-/umkehrbar; nie Input während Transition sperren.
- Immer vom aktuellen Presentation-Value animieren, nie vom logischen Target.
- **Transitions statt Keyframes** für rapid-getriggerte Elemente (Toasts, Toggles): Transitions retargeten, Keyframes starten bei null.
- **Springs für Gesten** (Velocity-Handoff): Release-Velocity = Initial-Velocity des Springs; Momentum-Projektion `project(v, rate=0.998) = (v/1000) * rate / (1 − rate)`; Flick > ~0.11 px/ms dismissen.
- Spring-Defaults: kritisch gedämpft (bounce 0) als Hausstil; Bounce 0.1–0.3 nur bei Momentum-Interaktionen. Web: `{ type: "spring", duration: 0.5, bounce: 0.2 }`.
- Response-First: Feedback auf pointer-down; 1:1-Tracking während Drag; Grab-Offset respektieren; `setPointerCapture`; Hysterese ~10px.
- **Rubber-Banding** an Grenzen: `rubberband(o, d, c=0.55) = (o*d*c) / (d + c*|o|)`.
- 2D-Motion in unabhängige X/Y-Springs zerlegen.
- **Cancellable State-Transitions**: finale States explizit setzen, nie auf `animationend`-Events angewiesen (das Event kann bei Interruption ausbleiben).

## 8. Enter/Exit & Stagger

- **Exit wie Entry**: symmetrische Pfade (Toast kommt unten rein → geht unten raus), gespiegelte Kurven.
- Enter in semantische Gruppen splitten: `opacity + blur(4px) + translateY(12px)`, Stagger 30–80ms (max 100ms), Gesamt-Delay deckeln, nie Interaktion blockieren.
- **Opacity-Threshold**: nie unter 0.2 verweilen; entweder ganz ausfaden oder sichtbar bleiben.
- **Navigation-Direction**: vorwärts = Elemente kommen von rechts/unten, rückwärts umgekehrt. Hierarchie-Motion: von unten = tiefer im Stack, nach oben = zurück.
- **Contextual Icon-Transitions** (exakte Werte, keine Abweichung): scale 0.25→1 (nie 0.5/0.6), opacity 0→1, blur 4px→0; Spring `{ type: "spring", duration: 0.3, bounce: 0 }` (bounce immer 0). Ohne Motion-Library: beide Icons im DOM, eines absolut positioniert, Cross-Fade `cubic-bezier(0.2, 0, 0, 1)` 300ms. Nie eine Dependency nur für Icon-Transitions installieren.
- Wort-/Zeilen-Masken-Reveals für Display-Headlines (jedes Wort in eigenem span, overflow-hidden Line-Wrapper): das Signatur-Pattern für Premium-Landings.
- **Ein autorisierter Focal-Moment** statt verstreuter Effekte; kein identischer Section-Fade überall.
- `initial={false}` auf AnimatePresence, wo kein Erst-Enter nötig; nie dort, wo `initial` den First-Enter trägt (Hero-Stagger).

## 9. Scroll-Motion

- Verboten: `window.addEventListener('scroll')`, `scrollY` in React-State, rAF-Loops auf State, `useState` für kontinuierliche Werte. Stattdessen: Motion `useMotionValue`/`useScroll`, GSAP ScrollTrigger, IntersectionObserver, CSS scroll-driven animations.
- GSAP/Three.js nie mit Motion im selben Tree mischen; in Client-Leaf-Islands isolieren + Cleanup.
- Smooth Scroll (Lenis): genau EINE Instanz, an den GSAP-Ticker gekoppelt.
- GSAP Pinning: `start: "top top"`, `pin: true`, scrub korrekt.
- Parallax sparsam; Marquee max 1× pro Seite.

## 10. Accessibility

- **Reduced Motion = sanfter, nicht null**: Opacity/Farbe behalten, Transform-Bewegung streichen; Crossfades statt Slides/Springs; kein Overshoot. Kein globales `0.01ms`-Kill. Pflicht ab MOTION > 3: Infinite-Loops/Parallax/Magnetik kollabieren zu statisch.
- **Hover-Gating**: `@media (hover: hover) and (pointer: fine)`, weil Touch falsche Hovers feuert.
- Zusätzlich `prefers-reduced-transparency` (Blur raus, Opacity rauf) und `prefers-contrast: more` respektieren.

## 11. Motion-Bans

- `ease-in` auf UI · `scale(0)` · `transition: all` · Layout-Property-Animation ·
  Springy-Hover (`hover:scale-105` + transition-all): Hover-Feedback ist
  Flächenverschiebung, kein Wachstum · Bounce/Elastic reflexartig · Keyframes auf
  rapid-getriggerten Elementen · identischer Fade auf jeder Sektion · Bilder on hover
  animieren · zweite Lenis-Instanz · Motion für Style auf funktionalen Daten.

**Motion-Review (10 Non-Negotiables):** justified motion · frequency-appropriate ·
responsive easing · sub-300ms UI · origin & physicality · interruptibility ·
GPU-only properties · accessibility · asymmetrisches enter/exit · cohesion.
Remedial-Hierarchie: 1 Löschen → 2 Reduzieren → 3 Easing → 4 Origin → 5 Interruptible →
6 GPU → 7 Asymmetrie → 8 Polish → 9 A11y.

Review-Technik: das Interface verlangsamen (10 % Speed). Was sich bei 10 % falsch
anfühlt, ist bei Vollspeed subtil falsch. Dazu: Review am nächsten Tag mit frischen Augen.
