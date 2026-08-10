# Craft-Floor (deutsch, aus impeccable v4.0.1)

> Quelle: `reference/craft-floor.md` aus pbakaus/impeccable @ bdaa5a4 (Apache-2.0).
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
- Eine getrackte Uppercase-Eyebrow über jeder Sektion. Ein benannter Kicker ist
  ein System; eine Eyebrow überall ist ungewählte Grammatik.
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

Der Floor hält die Mechanik; er wählt nie die Richtung. Mit allen Checks grün
wird die Seite auf die committed world ausgegeben — und wenn es zwischen
raffiniert und committed schwankt: committed.
