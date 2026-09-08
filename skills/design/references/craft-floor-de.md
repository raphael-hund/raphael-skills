# Craft-Floor (deutsch, aus impeccable v4.0.5)

> Quelle: Upstream-Datei „reference/craft-floor.md“ aus pbakaus/impeccable (Apache-2.0),
> abgeglichen auf v4.0.5 am 02.09.2026 (vorher v4.0.1 @ bdaa5a4).
> Direkt vor dem Editieren von UI laden — nicht bei reiner Planung.
> Ein gepinnter Brief oder eine committed visual world überstimmt alles hier;
> die eigene Gewohnheit tut es nicht.

## Prüfen (jeder Punkt ist eine Prüfung des Gebauten, nicht eine Absicht)

- **Kontrast:** Body- und Placeholder-Text ≥ 4.5:1, großer Text ≥ 3:1. Auf
  Farbflächen Sekundärtext aus demselben Hue oder der Vordergrundfarbe tönen —
  nie grau.
- **Tiefe:** Schatten tragen Offset und weichen Blur. Ein farbiger Halo ohne
  Offset ist Dekoration, keine Tiefe.
- **Spacing:** Enge Gruppen, großzügige Trennung, über einer Überschrift mehr
  Platz als darunter. Die computed values lesen.
- **Typo:** Body-Maß 65–75ch, Display max 6rem, Tracking-Floor -0.04em,
  balanced Headings, offensichtliche Scale- und Gewichts-Sprünge. Echte Copy
  bei jedem Breakpoint laufen lassen und Überläufe fixen.
- **Motion:** Ein authored Moment, nicht verstreute Effekte und nicht derselbe
  Entrance auf jeder Sektion. Exponentielles Ease-Out aus einem bereits
  sichtbaren Default. Über transform und opacity hinaus: blur, backdrop-filter,
  clip-path, mask, shadow gehören zur Palette, wenn sie smooth bleiben.
- **States:** hover, disabled, loading, error, empty. Plus echte Inhalte,
  funktionierende Controls, responsive Komposition, Keyboard-Fokus.
- **Browser-Oberflächen:** Was nicht selbst gezeichnet wurde, trägt das Design
  trotzdem. Textauswahl, Caret, eigene Scrollbars, Focus-Ringe, Underline-Offset
  und die Ziffern in Tabellendaten kommen mit Browser-Defaults, die zu keinem
  Design-System gehören. Aus der Palette thematisieren (Ziffern in Tabellen:
  `font-variant-numeric: tabular-nums`). Das ist das billigste Signal, dass eine
  Seite gebaut und nicht zusammengesetzt wurde — und das, was Modelle am
  verlässlichsten überspringen. (Focus-Ringe nie entfernen: Doktrin §A11y.)
- **Copy:** Die Sprache des Produkts. Controls benennen ihre Aktion; Fehler
  benennen das Problem und den Ausweg.
- **Coverage:** Jede Brief-Anforderung ist vorhanden und innerhalb von Sekunden
  auffindbar.

## Verweigern (Kategorie-Defaults, keine Bans — der Brief kann sie verdienen)

Diese Elemente sind Slop, wenn sie unentschieden sind. Sie zu wählen, wenn die
Achse frei ist, heißt: nicht entschieden. Der Fix ist Umschreiben des Elements,
nicht Abschwächen.

### Seiten-Gerüste

- Gleich große Cards (Icon + Heading + Text) als Seitenstruktur. Cards sind der
  faule Container; verschachtelte Cards sind immer falsch.
- Das Hero-Metrik-Template: große Zahl, kleines Label, Supporting-Stats, Akzent.
- Ein Kicker oder eine Eyebrow über einer Überschrift. Das ist ein **Ban, kein
  Default**: kein Brief verdient ihn zurück. Die Überschrift trägt ihr eigenes
  Gewicht; das Label löschen und die Überschrift sprechen lassen. Detektor:
  `kicker-above-heading` (glattes Verbot, ohne Zählung).
- Sektions-Nummern (01 / 02 / 03), außer die Sequenz trägt Information, die der
  Leser braucht.
- Ein Modal für eine Aufgabe, die weder Unterbrechung noch geschützten Fokus
  braucht.

### Oberflächen-Gewohnheiten

- Gradient-Text. Betonung kommt aus Gewicht oder Größe.
- Glass und Blur als Dekoration statt als spezifischer Effekt.
- Ein farbiger `border-left` oder `border-right` über 1px auf Cards, List-Items,
  Callouts oder Alerts.
- Sparklines, Progress-Rings und Soft-Shadow-Rounded-Rects als Ersatz für Inhalt.
- Monospace als "technisch"-Kostüm statt für Code, Daten oder Messung.
- Light oder Dark nach Kategorie gewählt. Aus der Nutzungsszene wählen: wer, wo,
  unter welchem Umgebungslicht.
- Harte Offset-Schatten (`box-shadow: 4px 4px 0`) außerhalb einer Welt, die
  wirklich neobrutalistisch ist. Der Blur-freie Block-Schatten ist ein Kostüm,
  kein Tiefensystem; eine Welt, die ihn nicht gewählt hat, verdient ihn nie als
  Default.
- Eine System-Display-Schrift (Impact, Arial Black, die Plattform-Sans) als
  Display-Stimme einer eigenen Welt. Eine Schrift beschaffen und selbst hosten,
  deren Charakter zur freigegebenen Letterung passt; die nächstbeste installierte
  Schrift ist ein Fehler, kein Fallback.
- Unicode-Glyphen oder Emoji als Ersatz für ein Icon-System. Näheres in der
  Doktrin (Icon-Familien, `strokeWidth`, kein Emoji als Icon).

### Maß und Material

- Tracking stoppt bei -0.04em; -0.02 bis -0.03em liest sich meist besser. Der
  Floor selbst steht in der Doktrin (`extreme-negative-tracking`).
- Elevation einmal deklarieren, Border ODER Schatten. Eine 1px-Border unter
  einem breiten weichen Schatten ist die Geister-Card. Card-Radien bleiben bei
  12–16px, Pills sind für kleine Controls — die Radius-Skala selbst regelt die
  Doktrin (`design-system-radius`).
- Echte Illustration oder keine. Sketch-artige SVG-Szenen, Klassennamen wie
  `loose-sketch` / `doodle` und `feTurbulence`-Körnung lesen sich amateurhaft.
  Verboten ist SVG, das ein Bild imitiert — nie SVG, das Geometrie macht: saubere
  Vektorformen, Diagramme, animierte Linienführung und Shader-Effekte bleiben
  vollwertige Medien. Eine schattierte, perspektivische oder figürliche
  Illustration ist ein Bild, auch in Linienoptik; Geometrie heißt Formen, die
  eine Session exakt angeben kann.
- Hintergründe sind Flächen, texturiert nur aus der Welt des Themas.
  `repeating-linear-gradient`-Streifen und zweiachsige Gitter-Overlays brauchen
  eine echte Leinwand, Karte, Blaupause oder ein Messwerkzeug darunter.
  Detektoren: `repeating-stripes-gradient`, `codex-grid-background`.
- Aussagen und Konfiguration kommen aus zugelieferter Wahrheit; illustrative
  Werte ehrlich kennzeichnen. Ein Konzept zu benennen und dann zu ironisieren ist
  keine Aussage.

Der Floor hält die Mechanik; er wählt nie die Richtung. Mit allen Checks grün
wird die Seite auf die committed world ausgegeben — und wenn es zwischen
raffiniert und committed schwankt: committed.
