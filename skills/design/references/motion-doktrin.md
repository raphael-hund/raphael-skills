> Vendoriert aus emilkowalski/skills (github.com/emilkowalski/skills @ 6bf24434),
> MIT-Lizenz. Fusion aus `emil-design-eng`, `review-animations` (+STANDARDS.md).
> Die im Original enthaltene Kurs-Werbung ("check out Emil's course") wurde
> entfernt. Details: `../VENDORING.md`.

# Motion-Doktrin

Werte und Regeln fuer jede Animation/Motion-Entscheidung. Bei Reviews immer
den exakten Wert von hier zitieren, nie approximieren.

## Grundhaltung

Gute Motion ist trainiert, kein Bauchgefuehl: unsichtbare Details summieren
sich ("a thousand barely audible voices all singing in tune" — Paul Graham).
Die meisten Nutzer merken einzelne Details nie bewusst — genau das ist das
Ziel. Bei Unsicherheit ist Loeschen der Animation oft der staerkste Zug.

## 1. Soll das ueberhaupt animieren? (Frequenz-Gate)

| Frequenz | Entscheidung |
|---|---|
| 100+/Tag (Shortcuts, Command-Palette) | Keine Animation. Nie. |
| Zig-mal/Tag (Hover, Listen-Navigation) | Entfernen oder stark reduzieren |
| Gelegentlich (Modals, Drawer, Toasts) | Standard-Animation |
| Selten/Erstnutzung (Onboarding, Feedback, Celebration) | Delight erlaubt |

Nie Keyboard-ausgeloeste Aktionen animieren — sie wiederholen sich hunderte
Male am Tag, Animation macht sie langsam/entkoppelt (Raycast hat bewusst
keine Open/Close-Animation).

## 2. Zweck (muss explizit benennbar sein)

Gueltig: **Spatial Consistency** (Toast kommt/geht an derselben Kante),
**State Indication** (morphender Button zeigt Zustandswechsel), **Feedback**
(Press-Scale bestaetigt Eingabe), **Explanation** (Marketing-Demo),
**Preventing Jarring Change** (kein teleportierendes Erscheinen/Verschwinden).
"Sieht cool aus" ist kein Zweck — wenn das die einzige Antwort ist und das
Element oft gesehen wird: nicht animieren.

## 3. Easing

Entscheidungsreihenfolge: Ein-/Austritt -> `ease-out` · Bewegung/Morph auf der
Flaeche -> `ease-in-out` · Hover/Farbwechsel -> `ease` · konstante Bewegung
(Marquee, Progress) -> `linear` · Default -> `ease-out`.

**Nie `ease-in` auf UI** — startet langsam, genau wenn der Nutzer am
genauesten hinsieht. CSS-Standard-Easings sind zu schwach fuer bewusste
Motion:

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);        /* starker Ease-Out */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);    /* starker Ease-In-Out */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);     /* iOS-Drawer-Kurve (Ionic) */
```
Kurven nicht selbst erfinden — easing.dev / easings.co.

## 4. Dauer

| Element | Dauer |
|---|---|
| Button-Press-Feedback | 100–160ms |
| Tooltips, kleine Popover | 125–200ms |
| Dropdowns, Selects | 150–250ms |
| Modals, Drawer | 200–500ms |
| Marketing/erklaerend | darf laenger sein |

**Regel: UI-Animationen bleiben unter 300ms.** Ein 180ms-Dropdown wirkt
responsiver als 400ms bei identischer Wahrnehmung. Nach dem ersten offenen
Tooltip: folgende Tooltips im selben Cluster instant (kein Delay, keine
Animation).

## 5. Physicality

- **Nie `scale(0)`.** Start `scale(0.9–0.97)` + `opacity: 0` — nichts in der
  echten Welt erscheint aus dem Nichts.
- **Popover/Dropdown/Tooltip skalieren vom Trigger**, nicht vom Zentrum:
  `transform-origin: var(--radix-popover-content-transform-origin)` (Radix)
  bzw. `var(--transform-origin)` (Base UI). **Modals sind ausgenommen** —
  zentriert ist dort korrekt.
- **Press-Feedback**: `transform: scale(0.97)` auf `:active`,
  `transition: transform 160ms ease-out`. Subtil halten (0.95–0.98), gilt fuer
  jedes druckbare Element.

## 6. Interruptibility (wichtigstes Prinzip bei Gesten)

CSS-**Transitions** retargeten vom aktuellen Wert; **Keyframes** starten bei
0 neu. Alles schnell/rueckwaertig Ausloesbare (Toast-Stapel, Toggles, Drags)
braucht Transitions oder Springs.

- Entry ohne JS: `@starting-style` (Legacy-Fallback: `data-mounted` per
  `useEffect`).
- Springs tragen Velocity beim Unterbrechen weiter (Keyframes nicht) — daher
  Pflicht fuer Drag/Gesten.
- Spring-Config, Apple-Stil (empfohlen): `{ type: "spring", duration: 0.5,
  bounce: 0.2 }`. Bounce subtil (0.1–0.3), meist ganz vermeiden; nur bei
  Drag-to-Dismiss/Playful-Momenten.
- **Asymmetrisches Timing**: bewusste Phase (Press-and-Hold, destruktive
  Bestaetigung) langsam, System-Antwort snappt sofort. `transition:
  clip-path 2s linear` beim Halten, `200ms ease-out` beim Loslassen.

## 7. Performance

- **Nur `transform`/`opacity` animieren** — GPU, kein Layout/Paint.
  `width/height/margin/padding/top/left` triggern alle drei Render-Schritte.
- `transition: all` ist der Tell im Tell: keine Entscheidung, welche
  Eigenschaft die Bedeutung trägt.
- **Framer-Motion-Shorthands (`x`/`y`/`scale`) sind NICHT hardware-
  akzeleriert** — laufen im rAF auf dem Main-Thread und droppen Frames unter
  Last. Volle Transform-String nutzen: `animate={{ transform:
  "translateX(100px)" }}`.
- Keine CSS-Variable am Parent fuer Kind-Transforms setzen (Style-Recalc auf
  alle Kinder) — `transform` direkt am Element setzen.
- CSS/WAAPI schlagen JS unter Last — CSS fuer vorbestimmte Motion, JS/Springs
  fuer dynamische/gesten-getriebene Motion.
- `filter: blur()` waehrend Transitions unter 20px halten (teuer, v.a. Safari).

## 8. Accessibility

```css
@media (prefers-reduced-motion: reduce) {
  .element { animation: fade 0.2s ease; } /* Opacity/Farbe bleibt, Bewegung faellt weg */
}
@media (hover: hover) and (pointer: fine) {
  .element:hover { transform: scale(1.05); } /* Touch feuert Hover bei Tap sonst falsch */
}
```
Reduced Motion heisst weniger/sanfter, nicht null — Uebergaenge, die das
Verstehen unterstuetzen, bleiben; Bewegung/Position faellt weg.

## 9. Kohaesion

Motion passt zur Persoenlichkeit des Produkts: Playful darf federn, ein
Dashboard bleibt knackig und schnell. Sonner (13M+ wtl. Downloads) wirkt u.a.
deshalb stimmig, weil Easing, Dauer, Design und selbst der Name harmonieren —
leicht langsamer, `ease` statt `ease-out`, fuer Eleganz. Opacity+Height beim
Ein-/Austritt von Listenelementen ist Trial-and-Error, keine Formel.

## 10. Stagger

Gruppen-Eintritt staffeln, 30–80ms zwischen Elementen. Laenger wirkt
langsam. Stagger ist dekorativ — darf Interaktion nie blockieren.

## 11. Recipes

**Buttons responsiv**: `.button:active { transform: scale(0.97) }`,
`transition: transform 160ms ease-out`.

**Blur gegen unsaubere Crossfades**: wenn zwei Zustaende beim Crossfade
sichtbar ueberlappen trotz Easing/Duration-Tuning, `filter: blur(2px)`
waehrend der Transition einsetzen — verschmilzt die zwei Zustaende zu einem
wahrgenommenen Uebergang.

**translateY in Prozent**: `translateY(100%)` bewegt um die eigene Hoehe,
unabhaengig von echten Massen (so positionieren Sonner/Vaul Toasts/Drawer).
Prozent statt hartcodierten Pixeln.

**clip-path als Motion-Werkzeug**: `inset(top right bottom left)` — jeder
Wert frisst von der Seite. Reveal-on-Scroll: `inset(0 0 100% 0)` ->
`inset(0 0 0 0)`. Hold-to-delete: Overlay `inset(0 100% 0 0)` -> `inset(0 0 0
0)` ueber 2s linear beim Halten, 200ms ease-out beim Loslassen. Tabs mit
perfektem Farbwechsel: Tab-Liste duplizieren, Kopie als "aktiv" stylen, nur
den aktiven Ausschnitt per clip-path sichtbar machen und beim Wechsel
animieren. Vergleichs-Slider: zwei Bilder ueberlagern, oberes per
`clip-path: inset(0 50% 0 0)` clippen, rechten Inset-Wert an Drag-Position
koppeln.

**Gesten/Drag**: Velocity statt Distanz-Schwelle für Dismiss
(`Math.abs(distance)/elapsedMs > ~0.11` reicht für ein Flick). Damping an
Grenzen statt Hard-Stop. Pointer Capture ab Drag-Start. Zusaetzliche
Touch-Punkte nach Drag-Beginn ignorieren (Multi-Touch-Schutz).

## Review-Format (Pflicht bei jedem Motion-Review)

Immer eine Markdown-Tabelle, nie eine Vorher:/Nachher:-Liste:

| Before | After | Why |
| --- | --- | --- |
| `transition: all 300ms` | `transition: transform 200ms ease-out` | Exakte Eigenschaft angeben; `all` animiert Ungewolltes GPU-fern |
| `transform: scale(0)` | `transform: scale(0.95); opacity: 0` | Nichts erscheint aus dem Nichts |
| `ease-in` auf Dropdown | `ease-out` + custom curve | `ease-in` verzoegert den Moment, den der Nutzer am genauesten beobachtet |
| `transform-origin: center` auf Popover | `var(--radix-popover-content-transform-origin)` | Popover skaliert vom Trigger (Modals ausgenommen) |

## Die zehn nicht verhandelbaren Standards (fuer Review/QA)

1. Begruendete Motion — Zweck explizit benennbar.
2. Frequenz-passend — siehe Gate oben.
3. Responsives Easing — kein `ease-in` auf UI.
4. Unter 300ms auf UI.
5. Origin & Physicality korrekt (Trigger-Origin, kein `scale(0)`).
6. Interruptibility bei schnell/gesten-getriebener Motion.
7. Nur GPU-Eigenschaften.
8. Accessibility (reduced-motion, Hover-Gating).
9. Asymmetrisches Timing bei bewussten Aktionen.
10. Kohaesion mit Produkt-Persoenlichkeit.

## Eskalations-Trigger (sofort flaggen)

`transition: all` · `scale(0)`/reine Fade-Entrances ohne initialen Transform
· `ease-in` auf UI · Animation auf Keyboard-/100+/Tag-Aktion · UI-Dauer
>300ms ohne Begruendung · `transform-origin: center` auf Trigger-verankertem
Popover · Keyframes auf Toasts/Toggles/schnell Ausloesbarem · Layout-
Eigenschaften animiert · Framer-Motion-Shorthands unter Last · CSS-Variable
am Parent treibt Kind-Transform · fehlendes `prefers-reduced-motion` ·
ungegatetes `:hover` · symmetrisches Timing bei Press-and-Hold · Gruppen-
Eintritt ohne Stagger.

## Remedial-Hierarchie (billigsten Fix zuerst)

1. Animation loeschen (hochfrequent/zwecklos/Keyboard).
2. Reduzieren (kuerzer, kleinerer Transform, weniger Eigenschaften).
3. Easing fixen (`ease-in` -> `ease-out`/custom).
4. Origin/Physicality fixen (`transform-origin`, `scale(0)` -> `scale(0.95)`+opacity).
5. Interruptible machen (Keyframes -> Transitions/Spring).
6. Auf die GPU verschieben (Layout-Props -> transform/opacity).
7. Asymmetrisches Timing einziehen.
8. Polish (Blur-Maskierung, Stagger, `@starting-style`).
9. Accessibility & Kohaesion.

## Debugging

Slow-Motion (2–5x Dauer oder DevTools-Animation-Inspector), Frame-by-Frame
(Chrome DevTools Animations-Panel), echte Geraete fuer Gesten (Telefon per
USB/IP, Safari Remote DevTools), am naechsten Tag mit frischem Blick
nochmal ansehen — Unsauberkeiten fallen dann eher auf.
