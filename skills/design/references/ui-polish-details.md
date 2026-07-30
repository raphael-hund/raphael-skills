> Vendoriert aus jakubkrehel/skills (github.com/jakubkrehel/skills), Skill
> `better-ui`, MIT-Lizenz. Kondensiert aus SKILL.md + surfaces.md +
> animations.md + performance.md. Deckt genau die "sieht nach AI aus"-Faelle
> mit exakten Werten ab (0.96 statt 0.9, blur 4px statt 2px) — bei
> Widerspruch zu Werten in `motion-doktrin.md`/`design-doktrin.md` gilt: die
> exakteren Werte hier gewinnen, weil sie deterministisch pruefbar sind.
> Details: `../VENDORING.md`.

# UI-Polish-Details

Grosse Interfaces entstehen selten aus einer Sache — meist aus vielen
kleinen Details, die sich summieren. Fuer Typo (Wrapping, Font-Smoothing,
tabular-nums, Spacing) gilt `typografie.md`.

## Concentric Border Radius

`outerRadius = innerRadius + padding`. Gleicher Radius auf verschachtelten
Ebenen ist der haeufigste Grund, warum ein Interface "falsch" wirkt.

```
Gut:  card rounded-2xl (16px) p-2 (8px) -> inner rounded-lg (8px = 16-8)
Schlecht: card rounded-xl (12px) p-2 -> inner rounded-xl (12px, gleich)
```
Ab Padding >24px als getrennte Oberflaechen behandeln, Radien unabhaengig
waehlen statt strikt konzentrisch zu rechnen.

## Optische statt geometrische Ausrichtung

- **Button mit Text+Icon**: Icon-Seite bekommt ~2px weniger Padding als die
  Text-Seite (`pl-4 pr-3.5` statt `px-4` beidseitig).
- **Play-Button-Dreieck**: geometrisches Zentrum ≠ visuelles Zentrum, leicht
  nach rechts verschieben (`margin-left: 2px`).
- **Asymmetrische Icons** (Sterne, Pfeile, Caret): am besten direkt im SVG
  fixen (Viewbox/Pfad anpassen), Fallback per Margin.

## Shadows statt Borders (fuer Tiefe, nicht fuer Layout-Trennung)

Fuer Cards/Buttons/Container mit Tiefe/Elevation: Border durch mehrschichtige
transparente `box-shadow` ersetzen — Shadows passen sich jedem Hintergrund
an, Borders nicht. **Nicht** anwenden auf Dividers (`border-b`/`border-t`)
oder Form-Input-Outlines (Accessibility) — die bleiben Borders.

```css
/* Light Mode: 1px-Border-Ring + leichter Lift + ambientes Depth */
--shadow-border:
  0px 0px 0px 1px oklch(0 0 0 / 0.06),
  0px 1px 2px -1px oklch(0 0 0 / 0.06),
  0px 2px 4px 0px oklch(0 0 0 / 0.04);
--shadow-border-hover:
  0px 0px 0px 1px oklch(0 0 0 / 0.08),
  0px 1px 2px -1px oklch(0 0 0 / 0.08),
  0px 2px 4px 0px oklch(0 0 0 / 0.06);

/* Dark Mode: ein einziger weisser Ring reicht (Layered Depth unsichtbar) */
--shadow-border: 0 0 0 1px oklch(1 0 0 / 0.08);
--shadow-border-hover: 0 0 0 1px oklch(1 0 0 / 0.13);
```

## Image-Outlines (nicht verhandelbar)

1px Outline, niedrige Opazitaet, **reines Schwarz/Weiss, nie getoent**:
Light Mode `oklch(0 0 0 / 0.1)`, Dark Mode `oklch(1 0 0 / 0.1)`. Nie
slate-900/zinc-900/eine getoente Neutral-Stufe oder die Marken-/Ink-Farbe —
eine getoente Outline nimmt die Umgebungsfarbe auf und wirkt wie Dreck am
Bildrand. `outline` statt `border` (beeinflusst kein Layout), `outline-offset:
-1px` (inset, aendert die Bildgroesse nicht).

## Interruptible Animations

CSS-**Transitions** fuer interaktive Zustandswechsel (Hover, Toggle,
Open/Close) — sie retargeten mid-animation. **Keyframes** nur fuer
einmalige, gestaffelte Sequenzen (Enter-Animation, Loading). Ein Keyframe
auf einem interaktiven Element (Drawer-Toggle) fuehlt sich beim erneuten
Klicken kaputt an (Snap/Restart statt sanftes Umkehren).

## Enter-Animationen: Splitten & Staffeln

Nie einen einzelnen grossen Container animieren. In semantische Gruppen
splitten (Titel, Beschreibung, Buttons), ~100ms Stagger zwischen Gruppen
(Titel ggf. wortweise ~80ms). Kombination `opacity` + `blur` + `translateY`:

```css
.stagger-item {
  opacity: 0; transform: translateY(12px); filter: blur(4px);
  animation: fadeInUp 400ms ease-out forwards;
}
.stagger-item:nth-child(2) { animation-delay: 100ms; }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); filter: blur(0); } }
```

## Exit-Animationen: subtiler als Enter

Kleiner fixer `translateY` (z.B. -12px) statt volle Container-Hoehe;
Richtung leicht andeuten, nicht dramatisieren. Exit-Dauer kuerzer als
Enter-Dauer (150ms vs. 300ms). Nie komplett ohne Exit-Animation (Element
verschwindet sonst abrupt per `display: none`).

## Kontextuelle Icon-Animationen (exakte Werte, nicht abweichen)

Icon-Wechsel (Hover, State-Change) per `opacity`+`scale`+`blur` statt
Sichtbarkeits-Toggle:

- `scale`: `0.25` -> `1` (nie 0.5 oder 0.6)
- `opacity`: `0` -> `1`
- `filter`: `blur(4px)` -> `blur(0px)`
- `transition`: `{ type: "spring", duration: 0.3, bounce: 0 }` — Bounce
  **immer** 0, nie 0.1 o.ae.

Ohne Motion-Lib im Projekt: beide Icons im DOM behalten (eines absolut
positioniert), Cross-Fade per CSS-Transition mit `cubic-bezier(0.2, 0, 0,
1)` — liefert Enter UND Exit ohne zusaetzliche Dependency. `package.json`
auf `motion`/`framer-motion` pruefen, bevor eine neue Motion-Dependency
eingefuehrt wird.

## Scale on Press

`scale(0.96)` beim Klick fuer haptisches Feedback — **immer** 0.96, nie
unter 0.95 (wirkt sonst uebertrieben). CSS-Transition fuer Interruptibility.
Nicht jeder Button braucht das — `static`-Prop vorsehen, wenn Motion stoert.

```css
.button { transition-property: scale; transition-duration: 150ms; transition-timing-function: ease-out; }
.button:active { scale: 0.96; }
```

## Skip Animation on Page Load

`initial={false}` auf `AnimatePresence`, damit Elemente im Default-Zustand
beim ersten Render nicht einfliegen — nur bei State-Aenderung danach. NICHT
verwenden, wenn die Komponente ihre `initial`-Prop fuer eine echte
Erst-Enter-Animation braucht (gestaffelter Hero) — sonst faellt der ganze
Einstieg weg. Nach Full-Page-Refresh visuell verifizieren.

## Performance

**Nie `transition: all`** (auch nicht Tailwinds `transition`-Shorthand, die
darauf mappt) — animiert ungewollt Farben/Padding/Shadows mit und
verhindert Browser-Optimierungen. Exakte Properties angeben:
`transition-[scale,opacity,filter]`. `transition-transform` in Tailwind
deckt `transform, translate, scale, rotate` ab.

`will-change` sparsam, nur fuer GPU-komponierbare Properties (`transform`,
`opacity`, `filter`, `clip-path`) — nie `will-change: all`, nie auf
`background`/`border`/`color` (nicht GPU-komponierbar, bringt nichts). Nur
einsetzen, wenn tatsaechlich First-Frame-Stutter auffaellt (Safari
profitiert am meisten) — nicht praeventiv auf jedes animierte Element (jede
Compositing-Layer kostet Speicher).

## Minimum Hit Area

Interaktive Elemente brauchen 44×44px Hit-Area fuer Touch/Mobil, mindestens
40×40px im Desktop-UI. Ist das sichtbare Element kleiner (20×20-Checkbox),
per Pseudo-Element erweitern. Zwei Hit-Areas duerfen sich nie ueberlappen —
im Konfliktfall die erweiterte Area verkleinern statt ueberlappen zu lassen.

## Common Mistakes

| Problem | Fix |
|---|---|
| Gleicher Radius auf Parent+Child | `outerRadius = innerRadius + padding` |
| Icon wirkt schief | optisch nachjustieren (Padding oder SVG direkt) |
| Harte Border zwischen Sektionen (fuer Tiefe) | mehrschichtiger `box-shadow` |
| Ruckartige Enter/Exit-Animation | splitten, staffeln, Exit subtiler |
| Animation feuert beim Page-Load | `initial={false}` auf `AnimatePresence` |
| `transition: all` | exakte Properties |
| Stutter im ersten Frame | `will-change: transform` (sparsam) |
| Winzige Hit-Area bei kleinen Controls | Pseudo-Element auf 44×44/40×40px erweitern |

## Review-Output-Format (Pflicht)

Aenderungen als Markdown-Tabelle Before/After, gruppiert nach Prinzip mit
eigener Ueberschrift, jede Zeile ein Diff. Leere Tabellen (nichts zu
aendern) weglassen.

## Review-Checkliste

- [ ] Verschachtelte gerundete Elemente nutzen konzentrischen Radius
- [ ] Icons optisch, nicht nur geometrisch zentriert
- [ ] Shadows statt Borders wo fuer Tiefe (nicht bei Dividern)
- [ ] Enter-Animationen gesplittet und gestaffelt
- [ ] Exit-Animationen subtiler als Enter
- [ ] Bilder haben eine neutrale (nie getoente) Outline
- [ ] Buttons nutzen Scale-on-Press wo passend (0.96, nie <0.95)
- [ ] `AnimatePresence` nutzt `initial={false}` fuer Default-Zustand-Elemente
- [ ] Kein `transition: all`, nur spezifische Properties
- [ ] `will-change` nur auf transform/opacity/filter, nie `all`
- [ ] Interaktive Elemente haben 44×44px (Touch) bzw. 40×40px (Desktop) Hit-Area
