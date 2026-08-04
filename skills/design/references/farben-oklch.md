> Vendoriert aus jakubkrehel/skills (github.com/jakubkrehel/skills), Skill
> `better-colors` @ Commit `a673333`, MIT-Lizenz. Kondensiert aus SKILL.md +
> color-conversion.md + palette-generation.md + accessibility-contrast.md +
> gamut-and-tailwind.md + color-usage.md. Alle Zahlenwerte exakt aus der
> Quelle. WCAG-Einordnung/Anforderungsklassen siehe `barrierefreiheit.md`,
> Textgroessen siehe `typografie.md`.
> Details: `../VENDORING.md`.

# Farben in OKLCH

OKLCH ist ein perzeptuell gleichmaessiger Farbraum, in dem Lightness, Chroma
und Hue brauchbare Design-Regler sind. Die meisten Farbprobleme in CSS
(kaputte Paletten, scheiternder Kontrast, Hue-Drift) kommen daher, dass
HSL/RGB nicht dem menschlichen Sehen entsprechen.

**Bestehendes System respektieren.** OKLCH einsetzen, wenn das Projekt schon
OKLCH nutzt, ein neues Farbsystem entsteht oder ausdruecklich Konvertierung/
Paletten-Arbeit gefragt ist. Sonst die etablierten Tokens und die Notation
des Projekts erhalten: ein konsistentes Hex-/RGB-Token-System ist besser als
eine zweite Farb-Darstellung fuer einen Einzelfix. Notation nicht
konvertieren, nur weil diese Referenz geladen wurde.

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
schreiben; Alpha per Slash, nie Komma. OKLCH ist Baseline 2023 — bei
ungewoehnlich breiten Support-Anforderungen die Browser-Matrix des Projekts
pruefen statt sich auf eine feste globale Abdeckungszahl zu verlassen.

## Kern-Schwellen

| Regel | Wert |
|---|---|
| Hell/Dunkel-Grenze | L > 0.73 = heller Hintergrund -> dunkler Text; darunter punktet heller Text noch hoeher |
| Lightness-Gap (hell) | Vordergrund L < 0.35 wenn Hintergrund L > 0.9 |
| Lightness-Gap (dunkel) | Vordergrund L > 0.9 wenn Hintergrund L < 0.25 |
| Hue-Drift-Schwelle | > 10 Grad Spread ueber Paletten-Stufen = sichtbarer Drift |
| APCA Fliesstext | \|Lc\| >= 75 minimal, >= 90 bevorzugt |
| APCA Nicht-Fliesstext (Labels, Headlines) | \|Lc\| >= 60 minimal |
| APCA UI-Komponenten, Disabled-/Placeholder-Text | \|Lc\| >= 30 |
| APCA absoluter Boden (Nicht-Text ueberhaupt erkennbar) | \|Lc\| >= 15 |
| WCAG 2 Normaltext (<24px / <18.5px bold) | 4.5:1 AA, 7:1 AAA |
| WCAG 2 Grosstext (>=24px / >=18.5px bold) | 3:1 AA, 4.5:1 AAA |
| Kontrast fixen (nur auf Anforderung) | zuerst L anpassen, C/H moeglichst halten, dann das gerenderte Paar neu messen |

APCA ist Standard-Empfehlung (perzeptuell genauer, passt zu OKLCH); WCAG 2
nur wenn eine formale WCAG-2.x-Konformitaetsaussage gebraucht wird. WCAG
definiert "Grosstext" in Punkt: 18pt ≈ `24px`, 14pt bold ≈ `18.5px`.

Die Hell/Dunkel-Grenze liegt hoeher, als die Intuition sagt: im Band
0.6–0.73 wirkt der Hintergrund bereits hell, weisser Text punktet aber immer
noch deutlich besser als schwarzer.

**Melden statt uebermalen.** Faellt ein Kontrast-Check durch, das Ergebnis
berichten (das durchgefallene Vordergrund/Hintergrund-Paar, sein gemessener
Lc-/Ratio-Wert, die verfehlte Schwelle) und die Farben unveraendert lassen.
Projektfarben sind eine Design-Entscheidung; erst auf Anforderung fixen —
dann L anpassen, C/H moeglichst halten, C bei Bedarf reduzieren, damit die
angepasste Farbe im Gamut bleibt, und anschliessend neu messen. Chroma und
Hue beeinflussen Gamut-Mapping und gemessenen Kontrast durchaus mit; "nur L,
nie C" ist zu grob.

Der Lightness-Gap ist asymmetrisch, weil APCA polaritaets-bewusst ist:
gespiegelte Paare punkten nicht identisch. Die Gap-Werte sind Naeherungen —
immer mit einer echten Kontrastrechnung verifizieren. Mittelhelle
Hintergruende deckeln den erreichbaren Kontrast: auf einem Hintergrund mit
L 0.75 erreicht selbst reines Schwarz nur etwa Lc 60; Fliesstext braucht
einen Hintergrund nahe dem hellen oder dunklen Extrem.

## Konvertierung

Nur konvertieren, wenn es ausdruecklich gefragt ist, das Projekt gerade auf
OKLCH standardisiert oder eine vereinbarte Farbsystem-Migration es verlangt.
Keinen Einzelwert in einem Projekt konvertieren, das bewusst eine andere
Notation nutzt. Auch Bulk-Konvertierung einer ganzen Datei ist eine
Migrations-Aufgabe, kein Routine-Aufraeumen.

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

Skala 50 (hellste) bis 950 (dunkelste). **11 Stufen** (50/100/200/300/400/
500/600/700/800/900/950) decken sich mit Tailwinds Default-Skalen; **9
Stufen** (ohne 400/600) sind der schlankere Default, wenn die
Zwischenstufen nicht gebraucht werden.

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

**Dark Mode**: Zuerst die hellen und dunklen semantischen Rollen tauschen,
dann die gemappten Werte fuer die dunkle Erscheinung nachziehen.

```css
:root { --color-bg: var(--color-50); --color-text: var(--color-950); }
.dark { --color-bg: var(--color-950); --color-text: var(--color-50); }
```

**Nicht mechanisch jede Palettenstufe umkehren.** Dunkle Erscheinungen
brauchen oft andere Chroma- und Lightness-Abstaende, und gleiche
OKLCH-Schritte garantieren nicht, dass jedes Vordergrund/Hintergrund-Paar
seinen Kontrast behaelt. Jedes Paar neu pruefen und die Dark-Tokens dort
einzeln nachziehen, wo es noetig ist.

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

## Farb-Einsatz (Bedeutung, Tokens, Betonung)

Wie Farbe im Interface eingesetzt wird — die Werte selbst kommen aus
"Paletten-Generierung", die Pruefung aus "Kern-Schwellen".

### Eine Farbe, eine Bedeutung

Eine Farbe durchgehend fuer **einen** Zweck (interaktiv, destruktiv,
hervorgehoben). Signalisiert die Markenfarbe "dieser Text ist klickbar",
sagt derselbe Hue (auch ±15 Grad drumherum) auf nicht-interaktivem Text den
Nutzern, sie sollen etwas anklicken, das nicht klickbar ist.

```css
/* Schlecht: Markenblau heisst gleichzeitig "Link" und "dekorative Headline" */
a { color: oklch(0.623 0.188 259.815); }
.section-title { color: oklch(0.65 0.17 259.815); }

/* Gut: interaktive Elemente besitzen den Marken-Hue, Headings bleiben neutral */
a { color: oklch(0.623 0.188 259.815); }
.section-title { color: oklch(0.279 0.041 260.031); }
```

### Semantische Tokens statt Rohwerte

Farben nach **Rolle** benennen, nicht nach Aussehen — und nur in dieser Rolle
verwenden. `--color-text-secondary` ist gedaempfter Vordergrundtext; als
Hintergrund eingesetzt bricht es jede kuenftige Theme-Aenderung, die sich auf
die Rolle verlaesst.

```css
/* Gut: Tokens nach Rolle benannt, in ihrer Rolle benutzt */
:root {
  --color-text-primary: oklch(0.21 0.006 285.885);
  --color-text-secondary: oklch(0.552 0.016 285.938);
  --color-separator: oklch(0.92 0.004 286.32);
  --color-surface: oklch(1 0 0);
}

/* Schlecht: Separator-Token als Textfarbe zweckentfremdet */
.caption { color: var(--color-separator); }

/* Schlecht: Secondary-Text-Token als Hintergrund zweckentfremdet */
.tag { background: var(--color-text-secondary); }
```

Fehlt fuer eine Rolle ein Token, das **Token ergaenzen** — nie eines
ausleihen, das heute zufaellig den richtigen Wert hat. In Tailwind-Projekten
ist das der `@theme`-Block.

### Eine farbige Aktion pro Ansicht

Kodiert das Produkt primaere Betonung ueber gefuellte Farbe, bekommt genau
**eine** primaere Aktion im aktuellen Entscheidungskontext diese Behandlung;
gleichrangige Aktionen bleiben neutral. Eine etablierte Komponenten-Hierarchie,
die Betonung anders loest, bleibt erhalten — Controls nicht umfaerben, nur um
dieses Rezept durchzusetzen. Mehrere farbige Hintergruende sind in Ordnung,
wenn sie unterschiedliche Zustaende oder Kategorien kodieren und nicht als
gleichrangige Aktionen konkurrieren.

```html
<!-- Gut: eine gefuellte Primaeraktion, neutrale Sekundaeraktionen -->
<button class="bg-blue-600 text-white">Speichern</button>
<button class="text-zinc-700">Abbrechen</button>

<!-- Schlecht: alles farbig, also ist nichts primaer -->
<button class="bg-blue-600 text-white">Speichern</button>
<button class="bg-blue-600 text-white">Duplizieren</button>
<button class="bg-blue-600 text-white">Exportieren</button>
```

Die Farbe gehoert auf den **Hintergrund**, nicht auf das Label: ein gefuellter
`bg-blue-600 text-white`-Button liest sich quer durch den Raum als primaer;
blauer Labeltext auf neutralem Button liest sich als Link. Ausgewaehlte
Zustaende (aktiver Tab, gesetztes Segment) duerfen die Akzentfarbe auf Glyphe
und Label tragen — das ist Zustand, nicht Betonung.

### Farbe ueber Kulturen

Farbbedeutung ist nicht universell. Ist eine Farbe tragend (Finanzen, Status,
Alerts), die Bedeutung fuer jede ausgelieferte Locale pruefen.

| Farbe | Uebliche westliche Lesart | Anderswo |
|---|---|---|
| Rot | Gefahr, Verlust, Fehler | Glueck, Wohlstand; **Gewinne** in chinesischen Finanz-UIs |
| Gruen | Erfolg, Gewinn, los | Verluste in chinesischen Finanz-UIs |
| Weiss | Reinheit, Sauberkeit | Trauer in Teilen Ostasiens |
| Gold | Premium, Luxus | religioese Bedeutung in manchen Regionen |

Der Klassiker: Kurstabellen zeigen Gewinne fuer englische Locales gruen, fuer
chinesische rot. Lokalisiert das Produkt in solche Maerkte, gehoeren die
Gewinn-/Verlust-Farben in ein **Locale-Token**, nicht in einen hartcodierten
Wert.

### Hell, Dunkel und erhoehter Kontrast

Jede eigene Farbe braucht eine helle und eine dunkle Variante. Zusaetzlich
erwarten Nutzer mit erhoehtem Kontrast sichtbar staerkere Unterscheidung —
per `prefers-contrast` liefern:

```css
:root {
  --color-accent: oklch(0.623 0.188 259.815);
}

@media (prefers-color-scheme: dark) {
  :root { --color-accent: oklch(0.707 0.165 254.624); }
}

@media (prefers-contrast: more) {
  :root { --color-accent: oklch(0.488 0.243 264.376); }
}
```

Die Kontrast-Variante vergroessert den Lightness-Abstand zwischen Vordergrund
und Hintergrund um mindestens `0.15` L gegenueber der Default-Variante.
Danach das Paar gegen die bevorzugten APCA-Schwellen neu pruefen (Lc 90
Fliesstext, Lc 75 Nicht-Fliesstext).

Zwei Testregeln:

- **Jedes Vordergrund/Hintergrund-Paar in beiden Erscheinungen pruefen.** Ein
  Paar, das im Light Mode besteht, kann im Dark Mode durchfallen — die
  Paletten sind keine Spiegelbilder.
- **Transluzenz einrechnen.** Eine Farbe auf einer durchscheinenden Flaeche
  (`backdrop-filter`-Header, Overlay) verschiebt sich mit dem, was
  dahinterscrollt. Ueber dem hellsten und dem dunkelsten moeglichen Inhalt
  testen — oder die Flaeche opak genug machen, dass die Verschiebung den
  Kontrast nicht kippen kann.

## Common Mistakes

| Problem | Fix |
|---|---|
| Rohe Farbe umgeht das semantische Token-System | passendes Rollen-Token in der bestehenden Notation nutzen oder ergaenzen |
| Einzelner OKLCH-Wert in eine Hex-/RGB-Codebase gestreut | etablierte Notation erhalten, ausser die Aufgabe ist eine Farbsystem-Migration |
| HSL-Paletten-Ramp mit Hue-Drift | mit konstantem OKLCH-Hue neu bauen |
| Scheiternder Kontrast | Paar, gemessenen Lc und verfehlte Schwelle melden; Farben nur auf Anforderung aendern (dann L anpassen, C/H halten) |
| Hohe Chroma ohne Gamut-Check | auf Max-Chroma fuer L/H in sRGB clampen |
| Gleiche absolute C ueber verschiedene Hues | gleiche C% (Prozent vom Max) fuer konsistente Lebendigkeit |
| P3-Farbe ohne sRGB-Fallback | `@media (color-gamut: p3)`-Pattern ergaenzen |
| Dark Mode durch mechanisches Umkehren der Light-Palette | Light-Palette als Startpunkt, dann Chroma/Lightness nachziehen und jedes Paar neu pruefen |
| Hex in Tailwind-v4-`@theme` | zu OKLCH konvertieren |
| Alpha mit Komma-Syntax | Slash nutzen: `oklch(L C H / alpha)` |
| Derselbe Hue bedeutet zwei Dinge (Linkfarbe dekorativ wiederverwendet) | eine Farbe, eine Bedeutung; der zweiten Nutzung ein Neutral geben |
| Semantisches Token ausserhalb seiner Rolle (Separator als Text) | Token fuer die fehlende Rolle ergaenzen, nie nach Wert ausleihen |
| Mehrere farbige Control-Hintergruende in einer Ansicht | nur die eine primaere Aktion fuellen, Sekundaeraktionen neutral |
| Palette nur im Light Mode geprueft | jedes Vordergrund/Hintergrund-Paar in beiden Erscheinungen nachmessen |

## Review-Output-Format (Pflicht)

Farbaenderungen immer als Markdown-Tabelle Before/After, **jede** geaenderte
Farbe einzeln aufgefuehrt, nie als Fliesstext-Liste:

| Before | After |
|---|---|
| `color: #3b82f6` | `color: oklch(0.623 0.188 259.815)` |
| Gleiche absolute C ueber Hues | Gleiche C% vom jeweiligen Max-Chroma |
| Keine sRGB-Fallback fuer P3-Farbe | `@media (color-gamut: p3)`-Wrapper |
