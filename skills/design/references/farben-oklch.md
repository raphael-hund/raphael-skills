> Vendoriert aus jakubkrehel/skills (github.com/jakubkrehel/skills), Skill
> `better-colors`, MIT-Lizenz. Kondensiert aus SKILL.md + color-conversion.md +
> palette-generation.md + accessibility-contrast.md + gamut-and-tailwind.md.
> Details: `../VENDORING.md`.

# Farben in OKLCH

OKLCH ist ein perzeptuell gleichmaessiger Farbraum: die Zahlen bedeuten, was
man intuitiv erwartet. Die meisten Farbprobleme in CSS (kaputte Paletten,
scheiternder Kontrast, Hue-Drift) kommen daher, dass HSL/RGB nicht dem
menschlichen Sehen entsprechen.

## Warum OKLCH statt HSL

- **Perzeptuelle Gleichmaessigkeit**: gleiche L-Schritte = gleiche
  wahrgenommene Helligkeit. HSL "lightness: 50%" variiert stark je nach Hue.
- **Stabiler Hue**: HSL-Blau wandert bei Helligkeitsaenderung Richtung
  Violett; OKLCH-Hue bleibt ueber den gesamten Helligkeitsbereich konstant.
- **Unabhaengige Chroma**: Chroma misst Farbigkeit absolut, unabhaengig von
  Helligkeit — HSL-Saturation nicht.
- **Endlicher Gamut**: nicht jeder oklch-Wert ist in sRGB darstellbar; hohe
  Chroma bei bestimmten Hues clippt — Gamut-Bewusstsein ist Pflicht.

## Syntax

```
oklch(L C H)
oklch(L C H / alpha)
```

| Kanal | Bereich | Bedeutung |
|---|---|---|
| L (Lightness) | 0–1 | 0=schwarz, 1=weiss, perzeptuell gleichmaessig |
| C (Chroma) | 0–~0.4 | Farbigkeit; 0=grau; Max haengt von L und H ab |
| H (Hue) | 0–360 | Farbwinkel in Grad |
| alpha | 0–1 | optional, Slash-Syntax |

Formatierung: L/C mit 3 Nachkommastellen, H mit bis zu 3; -0 als 0
schreiben; Alpha per Slash, nie Komma. Baseline 2023, 96%+ globale
Browserabdeckung.

## Kern-Schwellen

| Regel | Wert |
|---|---|
| Hell/Dunkel-Grenze | L > 0.6 = heller Hintergrund -> dunkler Text |
| Lightness-Gap (hell) | Vordergrund L < 0.35 wenn Hintergrund L > 0.9 |
| Lightness-Gap (dunkel) | Vordergrund L > 0.9 wenn Hintergrund L < 0.25 |
| Hue-Drift-Schwelle | > 10 Grad Spread ueber Paletten-Stufen = sichtbarer Drift |
| APCA Fliesstext | \|Lc\| >= 75 minimal, >= 90 bevorzugt |
| APCA Nicht-Fliesstext (Labels, Headlines) | \|Lc\| >= 60 minimal |
| APCA UI-Komponenten | \|Lc\| >= 30 |
| WCAG 2 Normaltext | 4.5:1 AA, 7:1 AAA |
| WCAG 2 Grosstext (>=18px/>=14px bold) | 3:1 AA, 4.5:1 AAA |
| Kontrast fixen | nur L anpassen; Chroma-Effekt vernachlaessigbar |

APCA ist Standard-Empfehlung (perzeptuell genauer, passt zu OKLCH); WCAG 2
nur wenn eine formale WCAG-2.x-Konformitaetsaussage gebraucht wird.

## Konvertierung

Hex (3/6/8-stellig), rgb()/rgba(), hsl()/hsla() -> oklch(). Nur die
Farbwerte konvertieren, sonst nichts an der CSS-Struktur aendern:
Gradient-Funktion selbst unveraendert lassen, nur die Farbstopps darin
konvertieren. `currentColor`, `inherit`, `initial`, `unset`, `transparent`
sowie Hex-Werte in Fremd-Konfigs (die Hex erwarten) unveraendert lassen.
Alpha per Slash: `oklch(0 0 0 / 0.1)`, Alpha=1 weglassen.

```css
/* Vorher */
color: #3b82f6; background: #1e293b; border-color: #e2e8f0;
/* Nachher */
color: oklch(0.623 0.188 259.815);
background: oklch(0.279 0.037 260.031);
border-color: oklch(0.929 0.013 255.508);
```

## Paletten-Generierung

Skala 50 (hellste) bis 950 (dunkelste); Standard 9 Stufen (50/100/200/300/
500/700/800/900/950, deckt sich mit Tailwind).

Algorithmus: `delta = 0.4`, `minL = max(0.05, baseL-delta)`, `maxL =
min(0.95, baseL+delta)` (Clamping vermeidet reines Schwarz/Weiss mit
Chroma=0). Lightness gleichmaessig von maxL (Stufe 50) zu minL (Stufe 950)
verteilen. Chroma pro Stufe clampen: `maxChroma = findMaxChroma(L, H,
space)`, `C = (chromaProzent/100) * maxChroma` — so bleibt jede Stufe im
Gamut; hochchromatische Basisfarben haben an den Enden automatisch weniger
Chroma, das ist korrekt.

**Multi-Hue-Paletten**: gleiche Lightness UND gleiche Chroma-**Prozent**
(nicht absolute Chroma) fuer alle Hues verwenden — sonst wirken manche Hues
lebendiger als andere, weil jeder Hue eine andere Maximal-Chroma bei
gleicher Lightness hat.

**Dark Mode**: Palette-Mapping umkehren (hellste Stufe wird dunkelste und
umgekehrt) — funktioniert wegen perzeptueller Gleichmaessigkeit in beide
Richtungen gleich gut lesbar.

```css
:root { --color-bg: var(--color-50); --color-text: var(--color-950); }
.dark { --color-bg: var(--color-950); --color-text: var(--color-50); }
```

## Gamut & Tailwind v4

sRGB liegt komplett in Display P3, aber nicht umgekehrt (P3 deckt ~50% mehr
Farben). Max-Chroma variiert je Lightness/Hue (Cyan hat durchgehend die
niedrigste Max-Chroma, der Peak-Hue wandert mit der Lightness). Ueberschreitet
eine Chroma die Grenze fuer ihr L/H/Space, clippt sie — Fix: Chroma
reduzieren, L/H unveraendert lassen.

```css
.accent { color: oklch(0.7 0.2 150); }               /* sRGB-Fallback */
@media (color-gamut: p3) { .accent { color: oklch(0.7 0.3 150); } }
```

Tailwind v4 definiert seine Default-Palette bereits in OKLCH — eigene
`@theme`-Skalen im selben Format anlegen, damit `bg-brand-500/50` etc.
automatisch funktioniert.

## Common Mistakes

| Problem | Fix |
|---|---|
| Hex/rgb/hsl in neuem Code | zu `oklch()` konvertieren |
| HSL-Paletten-Ramp mit Hue-Drift | mit konstantem OKLCH-Hue neu bauen |
| Scheiternder Kontrast | L-Kanal anpassen, C/H unveraendert |
| Hohe Chroma ohne Gamut-Check | auf Max-Chroma fuer L/H in sRGB clampen |
| Gleiche absolute C ueber verschiedene Hues | gleiche C% (Prozent vom Max) fuer konsistente Lebendigkeit |
| P3-Farbe ohne sRGB-Fallback | `@media (color-gamut: p3)`-Pattern ergaenzen |
| Dark Mode mit handgepickten Farben | aus Light-Palette durch L-Mapping-Umkehr ableiten |
| Hex in Tailwind-v4-`@theme` | zu OKLCH konvertieren |
| Alpha mit Komma-Syntax | Slash nutzen: `oklch(L C H / alpha)` |

## Review-Output-Format (Pflicht)

Farbaenderungen immer als Markdown-Tabelle Before/After, **jede** geaenderte
Farbe einzeln aufgefuehrt, nie als Fliesstext-Liste:

| Before | After |
|---|---|
| `color: #3b82f6` | `color: oklch(0.623 0.188 259.815)` |
| Gleiche absolute C ueber Hues | Gleiche C% vom jeweiligen Max-Chroma |
| Keine sRGB-Fallback fuer P3-Farbe | `@media (color-gamut: p3)`-Wrapper |
