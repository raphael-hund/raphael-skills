> Vendoriert aus jakubkrehel/skills (github.com/jakubkrehel/skills), Skill
> `better-ui` @ Commit `a673333`, MIT-Lizenz. Kondensiert aus SKILL.md +
> surfaces.md + animations.md + performance.md + icons.md. Deckt genau die
> "sieht nach AI aus"-Faelle mit exakten Werten ab (0.96 statt 0.9, blur 4px
> statt 2px) — bei Widerspruch zu Werten in `motion-doktrin.md`/
> `design-doktrin.md` gilt: die exakteren Werte hier gewinnen, weil sie
> deterministisch pruefbar sind. Hit-Areas/Fokus/reduced-motion siehe
> `barrierefreiheit.md`, Gruppierung/Breakpoints siehe `layout-struktur.md`,
> Text siehe `typografie.md`.
> Details: `../VENDORING.md`.

# UI-Polish-Details

Grosse Interfaces entstehen selten aus einer Sache — meist aus vielen
kleinen Details, die sich summieren. Fuer Typo (Wrapping, Font-Rendering,
tabular-nums, Spacing) gilt `typografie.md`; fuer Hit-Areas, Fokus,
Tastatur, ARIA und reduced-motion `barrierefreiheit.md`; fuer Layout-Struktur
(Gruppierung, Abstaende zwischen Sektionen, Breakpoints, raeumliches RTL)
`layout-struktur.md`.

**Beim Review das Interface verlangsamen:** Motion im Animations-Panel des
Browsers auf 10 % Geschwindigkeit abspielen und jeden Zustand ablaufen —
hover, focus, active, loading, empty. Was bei 10 % stoert, ist bei voller
Geschwindigkeit unterschwellig falsch.

**Bestehende Komponenten-Bibliothek, Tokens und Dichte des Projekts
erhalten.** Die etablierte Motion-Sprache uebernehmen, ausser eine Regel hier
schreibt ein exaktes Interaktionsmuster vor.

## Concentric Border Radius

`outerRadius = innerRadius + padding`. Gleicher Radius auf **eng**
verschachtelten Ebenen ist eine haeufige Quelle optischer Spannung.

```
Gut:  card rounded-2xl (16px) p-2 (8px) -> inner rounded-lg (8px = 16-8)
Schlecht: card rounded-xl (12px) p-2 -> inner rounded-xl (12px, gleich)
```

Konzentrisch rechnen, wenn die Ebenen einen sichtbaren, gleichmaessigen
Einzug teilen. Ab Padding >24px als getrennte Oberflaechen behandeln, Radien
unabhaengig waehlen. Ein etabliertes Komponenten-Token bleibt erhalten, wenn
die Ebenen unabhaengig sind oder das Padding absichtlich asymmetrisch ist.

## Optische statt geometrische Ausrichtung

- **Button mit Text+Icon**: Laesst ein Icon sonst symmetrisches Padding
  unausgewogen wirken, bekommt die Icon-Seite ~2px weniger Padding als die
  Text-Seite. Logische Properties nutzen: `padding-inline-start: 16px` /
  `padding-inline-end: 14px`, in Tailwind `ps-4 pe-3.5` statt `pl-4 pr-3.5`.
- **Play-Button-Dreieck**: geometrisches Zentrum ≠ visuelles Zentrum, leicht
  verschieben — `transform: translateX(2px)` (physische Korrektur an der
  Glyphe selbst, nicht `margin-left`).
- **Asymmetrische Icons** (Sterne, Pfeile, Caret): am besten direkt im SVG
  fixen (Viewbox/Pfad anpassen), Fallback `translate-x-px` statt `ml-px`.

## Shadows fuer Elevation, Borders fuer Struktur

Fuer Buttons/Cards/Container, deren Border nur Tiefe erzeugt: Border durch
mehrschichtige transparente `box-shadow` ersetzen — Shadows passen sich jedem
Hintergrund an, Borders nicht. **Borders behalten**, wo sie Struktur oder
Zustand kommunizieren: Dividers, Layout-Trenner, Selected- und
Focus-Zustaende, Form-Input-Outlines (Accessibility).

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
Bildrand. `outline` statt `border` (beeinflusst bei keinem Offset das
Layout), `outline-offset: -1px` zieht den Ring knapp innerhalb der Bildkante,
sodass er dem Eckradius folgt statt aussen davor zu liegen.

## Interruptible Animations

CSS-**Transitions** fuer interaktive Zustandswechsel (Hover, Toggle,
Open/Close) — sie retargeten mid-animation. **Keyframes** nur fuer
einmalige, gestaffelte Sequenzen (Enter-Animation, Loading). Ein Keyframe
auf einem interaktiven Element (Drawer-Toggle) fuehlt sich beim erneuten
Klicken kaputt an (Snap/Restart statt sanftes Umkehren).

Praezisierung zur Dauer: Eine Transition hat ebenfalls eine **feste** Dauer —
sie retargetet mitten im Flug den **Wert**, nicht die Zeitachse. Keyframes
haben eine feste Zeitachse und starten bei Unterbrechung von vorn.

## Enter-Animationen: Splitten & Staffeln

Fuer **seltene, inszenierte Auftritte**, bei denen die Reihenfolge die
Hierarchie erklaert (erster Seitenaufbau eines Hero, Success-State,
Empty-State): nie einen einzelnen grossen Container animieren, sondern in
semantische Gruppen splitten (Titel, Beschreibung, Buttons), ~100ms Stagger
zwischen Gruppen (Titel ggf. wortweise ~80ms). **Routine-Interaktionen nicht
staffeln** — keine Stagger auf Zeilen-Hover, Tastendruck oder wiederholtem
Tab-Wechsel. Kombination `opacity` + `blur` + `translateY`:

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
Enter-Dauer (150ms vs. 300ms). **Easing: `ease-out` fuer Enter UND Exit**
(nicht `ease-in` — das war der alte Rat und ist ueberholt).

Ein subtiler Exit ist richtig, wo er raeumlichen Kontext erhaelt. **Sofort
entfernen** ist dagegen richtig, wenn Motion keine Information traegt, die
Interaktion haeufig wiederholt wird oder reduced-motion angefordert ist —
`display: none` ist dann kein Fehler.

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
1)` — liefert Enter UND Exit ohne zusaetzliche Dependency. In Tailwind als
`ease-[cubic-bezier(0.2,0,0,1)]` schreiben (die nackte Funktion als
Klassenname greift nicht).

**Import-Pfad an das installierte Paket binden:** `package.json` pruefen —
bei `motion` aus `"motion/react"` importieren, bei `framer-motion` aus
`"framer-motion"`. Nie ein installiertes Paket mit dem Import-Pfad des
anderen mischen. Liegen beide vor, den Importen der Komponente bzw. ihrer
naechsten Nachbarn folgen. Liegt keines vor, das CSS-Cross-Fade nehmen — fuer
Icon-Uebergaenge keine neue Dependency einfuehren.

## Scale on Press

`scale(0.96)` beim Klick fuer haptisches Feedback — **immer** 0.96, nie
unter 0.95 (wirkt sonst uebertrieben). CSS-Transition fuer Interruptibility.
Nicht jeder Button braucht das — `static`-Prop vorsehen, wenn Motion stoert.

```css
.button { transition-property: scale; transition-duration: 150ms; transition-timing-function: ease-out; }
.button:active { scale: 0.96; }
```

## Skip Animation on Page Load

`initial={false}` auf **der betroffenen** `AnimatePresence`, damit ein
zustandsbehaftetes Icon oder ein Toggle im Default-Zustand beim ersten Render
nicht einfliegt — nur bei State-Aenderung danach. NICHT verwenden, wenn die
Komponente ihre `initial`-Prop fuer eine echte Erst-Enter-Animation braucht
(gestaffelter Hero) — beabsichtigte Seiten-Auftritte bleiben erhalten. Nach
Full-Page-Refresh visuell verifizieren.

## Performance

**Nie `transition: all`**, auch nicht Tailwinds `transition-all` — animiert
ungewollt Farben/Padding/Shadows mit und verhindert Browser-Optimierungen.
Exakte Properties angeben: `transition-[scale,opacity,filter]`.
`transition-transform` in Tailwind deckt `transform, translate, scale,
rotate` ab.

Praezisierung: Tailwinds **nacktes** `transition` mappt nicht auf `all`,
sondern auf eine kuratierte Default-Liste (Farben, Opacity, Shadow,
Transforms). Trotzdem lieber genau benennen, was sich aendert; `transition-all`
bleibt verboten.

`will-change` sparsam, nur fuer GPU-komponierbare Properties (`transform`,
`opacity`, `filter`) — nie `will-change: all`, nie auf
`background`/`border`/`color` (nicht GPU-komponierbar, bringt nichts).
`clip-path` ist nur in neuerem Chromium GPU-komponierbar und
cross-browser nicht verlaesslich — nicht darauf bauen. Nur
einsetzen, wenn tatsaechlich First-Frame-Stutter auffaellt (Safari
profitiert am meisten) — nicht praeventiv auf jedes animierte Element (jede
Compositing-Layer kostet Speicher).

## Motion-Zurueckhaltung (Budget, keine Garnitur)

Drei Regeln entscheiden, ob eine Animation ueberhaupt hingehoert:

- **Keine eigene Animation auf haeufigen Interaktionen.** Was Nutzer
  staendig ausloesen (jeder Tastendruck, jeder Listenzeilen-Hover, jeder
  Tab-Wechsel im Arbeitswerkzeug), kostet bei **jedem** Ausloesen Aufmerksamkeit.
  Ausdrucksstarke Motion bleibt seltenen Momenten vorbehalten (erster Aufbau
  einer Ansicht, Success-, Empty-States); haeufige Interaktionen bekommen
  sofortiges Feedback oder die subtilste moegliche Transition
  (`opacity`/`background-color` mit ≤150ms).
- **Motion ist nie der einzige Feedback-Kanal.** Jeder Zustandswechsel, den
  eine Animation kommuniziert, muss auch ohne laufende Animation sichtbar
  sein: Farbwechsel, Icon-Tausch, Label. Nutzer mit reduced-motion — und
  jeder, der gerade geblinzelt hat — muessen trotzdem sehen, was passiert ist.
- **Kurz und praezise schlaegt auffaellig.** Kommuniziert eine kuerzere,
  kleinere Animation dasselbe, gewinnt sie. Im Zweifel die Dauer kuerzen,
  nicht die Klarheit.

```css
/* Gut: haeufiger Hover bekommt eine minimale Transition */
.row:hover {
  background-color: var(--surface-hover);
  transition: background-color 100ms ease-out;
}

/* Schlecht: jeder Hover spielt einen ganzen Auftritt neu ab */
.row:hover .row-icon {
  animation: bounceIn 500ms;
}
```

`prefers-reduced-motion` gehoert zu `barrierefreiheit.md` — gilt fuer jede
Animation in dieser Datei.

## Minimum Hit Area

Zwei Werte, zwei Bedeutungen — beide gelten, sie widersprechen sich nicht:

- **24×24px = harte Untergrenze** (WCAG 2.5.8, Level AA). Darunter ist es ein
  Konformitaetsfehler, ausser eine der definierten Ausnahmen greift (Spacing,
  gleichwertiges Control, Inline, User-Agent, Essenziell). Spacing-Ausnahme:
  ein zu kleines Ziel besteht, wenn ein 24px-Kreis um seine Bounding-Box kein
  anderes Ziel schneidet — im einfachen Fall brauchen 20px-Ziele mind. 4px
  Abstand.
- **44×44px = Komfortziel** fuer Touch/Mobil (WCAG 2.5.5 AAA, Apple HIG),
  **40×40px** als Komfortziel im Desktop-UI. Das ist die Qualitaetslatte fuer
  primaere Controls, kein Pass/Fail-Kriterium.

Also: unter 24px ist ein Fehler, zwischen 24 und 44px ist konform aber
verbesserungswuerdig, ab 44px (Touch) bzw. 40px (Desktop) ist es gut. Kleine
Controls nicht blind als Fehler melden — erst die WCAG-Ausnahmen pruefen.

Ist das sichtbare Element kleiner (20×20-Checkbox), per Pseudo-Element
erweitern (auf dem umschliessenden `<label>`/`<button>`, nie auf dem `<input>`).
Zwei Hit-Areas duerfen sich nie ueberlappen — im Konfliktfall die erweiterte
Area verkleinern statt ueberlappen zu lassen. Details, Code-Beispiele und
Touch-Verhalten: `barrierefreiheit.md`.

## Icons

Strichstaerke, Zustaende, Groesse und Richtung — die Details, die Icons
natuerlich im Interface sitzen lassen.

### Icon-Strichstaerke ans Textgewicht anpassen

Ein Icon neben Text muss dasselbe optische Gewicht tragen wie der Text, sonst
wirkt das Paar unstimmig: ein Haarlinien-Icon neben halbfettem Text liest als
kaputt, ein schweres Icon neben normalem Text schreit.

| Text daneben | Icon-Strichstaerke (24px-Grid) |
|---|---|
| Regular (400), 14–16px | `1.5px` |
| Medium/Semibold (500–600) | `2px` |
| Bold (700) oder betont freistehend | `2.5px` |

Zwei Konsistenzregeln dazu:

- **Eine optische Strategie pro Flaeche.** Keine Icon-Bibliotheken mit
  unvereinbaren Strich-Konventionen auf einer Toolbar mischen. Unterstuetzt die
  gewaehlte Bibliothek bewusst Strichvarianten, diese wie oben ans
  Textgewicht koppeln; sonst die native Strichstaerke des Sets erhalten und
  Betonung ueber Groesse oder Farbe loesen.
- **Icons relativ zur Cap-Height des Texts dimensionieren**, inline mit Text
  typischerweise `1em`–`1.25em`, damit das Paar gemeinsam skaliert.

### Ein SVG, per Zustand umgefaerbt

Nie getrennte Icon-Assets fuer default/hover/selected/disabled ausliefern. Ein
einziges SVG mit `currentColor` zeichnen und die Farbe vom CSS-Zustand treiben
lassen:

```html
<svg fill="none" stroke="currentColor" stroke-width="2">…</svg>
```

```css
.icon-button { color: oklch(0.552 0.016 285.938); }
.icon-button:hover { color: oklch(0.21 0.006 285.885); }
.icon-button[aria-pressed="true"] { color: oklch(0.623 0.188 259.815); }
.icon-button:disabled { opacity: 0.4; }
```

Hartcodierte Fuellungen im SVG (`fill="#666"`) brechen das — beim Import auf
`currentColor` strippen.

### Outline als Default, Fill als aktiv

Bietet ein Icon-Set Outline- und Filled-Varianten, sind sie ein **Zustandspaar**,
nicht austauschbar:

| Variante | Wofuer |
|---|---|
| Outline | Default-Zustand: Toolbars, Listenzeilen, inline mit Text |
| Fill | Aktiv/ausgewaehlt: aktiver Tab, gesetztes Lesezeichen, geliktes Herz |

Sind alle Icons gefuellt, hat der aktive Tab kein Zustandssignal mehr. Der
Wechsel zwischen den Varianten ist eine kontextuelle Icon-Animation — exakte
Cross-Fade-Werte siehe Abschnitt "Kontextuelle Icon-Animationen" oben.

### In Rendergroesse entwerfen

Ein Icon, das bei 48px gut aussieht, kann bei 16px zu Matsch zerfallen. Details,
die gross lesbar sind (duenne Innenlinien, enge Punzen, feine Textur),
verschwimmen oder aliasen klein.

- Jedes Icon in der **kleinsten** Groesse testen, in der es rendert (oft
  `16px`) — dort muss es erkennbar bleiben.
- Fuer kleine Kontexte vereinfachte Glyphen nutzen statt detaillierte Grafik
  herunterzuskalieren.
- Icons in ihrer Rendergroesse auf dem Pixelraster halten: ein 16px-Icon, das
  auf einem 24px-Grid mit gebrochener Skalierung gezeichnet ist, rendert weich.
  Native Grid-Groessen des Sets nutzen (`16`, `20`, `24`) statt beliebiger
  Skalierungen.
- Immer SVG, nie Raster — dann bleibt dasselbe Asset bei jeder Pixeldichte
  scharf.

### Icons in RTL

Unter `dir="rtl"` nur die Icons spiegeln, deren Bedeutung an der Leserichtung
haengt:

| Spiegeln | Nicht spiegeln |
|---|---|
| Zurueck-/Vorwaerts-Pfeile, Chevrons in der Navigation | Logos und Markenzeichen |
| Textblock-Glyphen (Ausrichtung, Listen, Einzug) | Haken |
| Lautsprecher-/Lautstaerkewellen (strahlen in Leserichtung) | Physische Objekte: Uhren, Tassen, Stifte |
| "Senden"-artige Richtungsglyphen | Medien-Wiedergabe (Play/Rewind meinen Bandrichtung, Konvention bleibt LTR) |

```css
/* Gut: nur richtungsabhaengige Icons spiegeln */
[dir="rtl"] .icon-directional { scale: -1 1; }
```

Tailwind: `rtl:-scale-x-100` auf die betroffenen Icons.

Zusammengesetzte Icons Teil fuer Teil pruefen: ein Badge- oder
Schraegstrich-Overlay behaelt seine Position womoeglich, auch wenn die
Basis-Glyphe spiegelt. Zugaengliche Namen fuer Icon-only-Buttons stehen in
`barrierefreiheit.md`.

## Common Mistakes

| Problem | Fix |
|---|---|
| Gleicher Radius auf eng verschachteltem Parent+Child | `outerRadius = innerRadius + padding` |
| Icon wirkt schief | optisch nachjustieren (Padding oder SVG direkt) |
| Border nur zum Vortaeuschen von Tiefe | mehrschichtiger `box-shadow`; Struktur-/Zustands-Borders bleiben |
| Ruckartiger inszenierter Auftritt oder kontextueller Exit | seltene Auftritte staffeln, kontexterhaltende Exits subtil halten |
| Zustandsbehaftetes Icon/Toggle animiert seinen Default beim Page-Load | `initial={false}` auf **dieser** `AnimatePresence`; echte Seiten-Auftritte erhalten |
| `transition: all` / Tailwind `transition-all` | exakte Properties |
| Stutter im ersten Frame | `will-change: transform` (sparsam) |
| Hit-Area unter 24×24px (WCAG-Untergrenze) | Pseudo-Element auf 44×44 (Touch) / 40×40px (Desktop) erweitern |
| Haarlinien-Icon neben fettem Text | Strichstaerke ans Textgewicht koppeln |
| Getrennte Icon-Assets je Zustand | ein `currentColor`-SVG, Zustaende per CSS |
| Ueberall gefuellte Icons | Outline als Default, Fill nur fuer aktiv |
| Auftritts-Animation auf jedem Hover/Tastendruck | sofortiges Feedback oder ≤150ms Opacity-/Farb-Transition |

## Review-Output-Format (Pflicht)

Aenderungen als Markdown-Tabelle Before/After, gruppiert nach Prinzip mit
eigener Ueberschrift, jede Zeile ein Diff. Leere Tabellen (nichts zu
aendern) weglassen.

## Review-Checkliste

- [ ] Eng verschachtelte gerundete Elemente nutzen konzentrischen Radius
- [ ] Icons optisch, nicht nur geometrisch zentriert (logische Properties)
- [ ] Shadows statt Borders wo fuer Tiefe (Struktur/Zustand bleibt Border)
- [ ] Seltene Auftritte gesplittet und gestaffelt, Routine-Interaktionen nicht
- [ ] Exit-Animationen subtiler als Enter, Easing `ease-out` in beide Richtungen
- [ ] Keine eigene Animation auf haeufigen Interaktionen; jeder animierte Zustandswechsel hat auch ein statisches Signal
- [ ] Bilder haben eine neutrale (nie getoente) Outline
- [ ] Buttons nutzen Scale-on-Press wo passend (0.96, nie <0.95)
- [ ] `AnimatePresence` nutzt `initial={false}` fuer Default-Zustand-Elemente
- [ ] Kein `transition: all`, nur spezifische Properties
- [ ] `will-change` nur auf transform/opacity/filter, nie `all`
- [ ] Keine Hit-Area unter 24×24px ohne greifende WCAG-Ausnahme (harte Grenze)
- [ ] Primaere Controls erreichen 44×44px (Touch) bzw. 40×40px (Desktop)
- [ ] Icon-Strichstaerke passt zum Gewicht des Texts daneben
- [ ] Icons nutzen `currentColor`, ein Asset pro Icon (Zustaende per CSS)
- [ ] Outline = Default, Fill = aktiver Zustand
- [ ] Jedes Icon bei seiner kleinsten Rendergroesse geprueft
