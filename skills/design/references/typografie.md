> Vendoriert aus jakubkrehel/skills (github.com/jakubkrehel/skills), Skill
> `better-typography`, MIT-Lizenz. Kondensiert aus SKILL.md + choosing-fonts.md
> + css-cheat-sheet.md + details-and-accessibility.md + spacing-and-sizing.md
> + wrapping-and-punctuation.md (variable-fonts-and-opentype.md nur als
> Kurzabschnitt — Deep-Dive fuer Kundenprojekte selten relevant).
> Details: `../VENDORING.md`.

# Web-Typografie

Gute Typografie ist meist Zurueckhaltung: eine sinnvolle Skala, angenehmer
Abstand, genug Kontrast schlagen jeden Effekt. **Immer das Styling-System
des Projekts nutzen** (Tailwind-Utilities, plain CSS, CSS-Module,
styled-components) — nie ein zweites System einfuehren, nur um einen
Typo-Fix anzuwenden.

## Schriftwahl

| Kategorie | Merkmal | Einsatz |
|---|---|---|
| Serif | kleine Endstriche fuehren das Auge | lange Passagen, Editorial |
| Sans-serif | klar, bleibt bei kleinen Groessen scharf | Standard fuer die meisten Interfaces |
| Monospace | jedes Zeichen gleich breit | Code, Tabellen, tabellarische Daten |
| Display | fuer grosse Headlines gezeichnet | Marketing-Headlines, Hero |
| Script | imitiert Handschrift | selten, dekorativ |

"Display" im Namen macht eine Schrift nicht zur Display-Schrift — manche
Familien haben eine `Display`- (grosse Groessen) und eine `Text`-Variante
(kleine Groessen); die zur gesetzten Groesse passende Variante nutzen.
Selten mehr als drei Schriften pro Projekt. Kontrast statt Aehnlichkeit
paaren: Serif-Headline + Sans-Body wirkt bewusst, zwei fast identische
Sans-Serifs wirken wie ein Versehen. Format: `.woff2` fuer's Web (Brotli,
breit supported); `.woff` nur Uralt-Browser-Fallback; `.ttf`/`.otf` nur
Desktop. Bestehendes Type-System des Projekts nutzen, keine neue/bezahlte
Schrift nur um eine Checkliste zu erfuellen.

## Properties statt Raw-Tags

`font-weight: 650` statt `font-variation-settings: "wght" 650`,
`font-optical-sizing: auto` statt `"opsz"`, `font-variant-numeric:
tabular-nums` statt `font-feature-settings: "tnum" 1` — Properties bleiben
gueltig, wenn ein Nicht-Variable-Fallback rendert. Raw-Tags nur fuer
Custom-Achsen ohne eigene Property. **Keine Fake-Weights**: fehlt eine
Gewichtsdatei, faelscht der Browser sie — `font-synthesis: none` setzen,
damit ein fehlender Font sichtbar fehlschlaegt statt gefaket zu wirken.

## Type Scale & Heading-Hierarchie

Wenige feste Groessen, moeglichst wenig Abweichung. Jede Heading-Ebene auf
eine absteigende Skalenstufe abbilden: eine tiefere Ebene darf auf derselben
Seite nie groesser rendern als eine hoehere Ebene (`h3` > `h2` = Fehler).
Tag aus der Dokumentstruktur waehlen (Screenreader navigieren per Ebene:
eine `h1`, keine ausgelassene Ebene), Groesse per CSS steuern — nie eine
niedrigere Ebene wegen der Optik waehlen. Tiefe Ebenen (`h4`/`h5`) duerfen
sich eine Groesse teilen, wenn Gewicht/Letter-Spacing sie trotzdem
unterscheidet. Line-height: Headings ~1.1, Body 1.5–1.6, unitless (skaliert
mit der Schriftgroesse; `24px` fest tut das nicht). Letter-Spacing:
grosse Headings leicht negativ, kleine Uppercase-Labels leicht positiv,
Fliesstext braucht keins.

## Measure, Wrapping, Truncation

Lange Zeilen erschweren dem Auge den Zeilenwechsel — Fliesstext auf 60–75
Zeichen/Zeile kappen (`65ch` oder `max-w-xl`/`max-w-2xl` bei 16px Body).
`text-wrap: balance` auf Headings (verteilt gleichmaessig ueber Zeilen),
`text-wrap: pretty` auf Beschreibungen (vermeidet Waisen-Wort in letzter
Zeile) — beides in Langtext ueberspringen (balance greift dort eh nicht,
pretty verschenkt Platz). `overflow-wrap: break-word` wo lange Woerter/
Links/IDs den Container sprengen koennten. `white-space: nowrap` auf
Labels/Badges. Truncation: einzeilig `text-overflow: ellipsis` +
`overflow: hidden` + `white-space: nowrap`; mehrzeilig `line-clamp` — wenn
der verborgene Text wichtig ist, per Tooltip/Expand erreichbar halten.

## Zahlen, iOS-Zoom, Kontrast-Floors

`font-variant-numeric: tabular-nums` auf jedem sich aendernden Wert (Timer,
Zaehler, Preise) gegen Layout-Shift. **iOS-Input-Zoom-Fix**: Inputs unter
16px zoomen die ganze Seite beim Fokussieren — `text-base sm:text-sm`
verwenden. `maximum-scale=1` im Viewport-Meta vermeiden: Safari ignoriert es
fuer Pinch-Zoom, aber jeder andere Browser haelt sich daran und blockiert
Zoom, was WCAG 1.4.4 verletzt. Groessen-/Kontrast-Floors: Body 16px (Web-
Default), Inputs/Menus 14px (Inputs mobil trotzdem 16px), Captions 13px,
selten unter 12px. WCAG AA: 4.5:1 Normaltext, 3:1 Grosstext (~24px+).

## Smart Punctuation & Internationalisierung

Copy in natuerlicher Schreibweise speichern, Praesentation per
`text-transform` steuern — Redesigns brauchen dann kein Copy-Rewrite.
Typografische Anfuehrungszeichen statt gerader (im Code gerade lassen),
Halbgeviertstrich fuer Bereiche (`2010–2020`), Gedankenstrich als eigenes
Zeichen, einzelnes Ellipsis-Zeichen `…`, `&nbsp;` um Werte wie "16 px"
zusammenzuhalten, `&shy;` fuer kontrollierte Wortumbrueche. `lang`-Attribut
setzen (richtige Anfuehrungszeichen/Trennung), `dir="rtl"` wo noetig, und
durchgehend logische Properties (`margin-inline-start` statt `margin-left`,
`text-align: start` statt `left`) fuer RTL-Faehigkeit.

## Details & Accessibility

Underlines aus den Font-Metriken ziehen: `text-underline-position:
from-font` + `text-decoration-thickness: from-font`, oder manuell per
`text-decoration-thickness`/`text-underline-offset`/
`text-decoration-skip-ink`. `text-decoration-style: dotted` als Hinweis auf
zusaetzliche Info (Abkuerzung, definierter Begriff). Wenn mehr als eine
Farbaenderung animiert werden soll, Underline als eigenes Element bauen statt
`text-decoration` (nur Farbe animiert dort zuverlaessig). `::selection` fuer
Markenfarbe in der Textauswahl (Lesbarkeit pruefen); `user-select: none` auf
Button-Labels, wo Copy unwahrscheinlich/stoerend ist. Font-Smoothing einmal
auf dem Root setzen (`-webkit-font-smoothing: antialiased` +
`-moz-osx-font-smoothing: grayscale`, in Tailwind: `antialiased`) — macOS
rendert sonst zu fett.

## Common Mistakes

| Problem | Fix |
|---|---|
| `.ttf`/`.otf` im Web | zu `.woff2` konvertieren |
| `font-variation-settings:"wght"` fuer Gewicht | `font-weight` (funktioniert mit Non-Variable-Fallback) |
| Browser-gefakter Bold/Italic | Datei laden, `font-synthesis: none` |
| Hartcodierte Einzelgroessen | Type Scale nutzen |
| `h3` groesser als `h2` auf derselben Seite | Heading-Ebenen auf absteigende Skala mappen |
| `line-height: 24px` auf skalierbarem Text | unitless (`1.5`) |
| Volle Breite bei Fliesstext | 60–75 Zeichen/Zeile kappen |
| Zahlen verursachen Layout-Shift | `tabular-nums` |
| Truncated Text ohne Zugriff auf den Volltext | Tooltip/Expand |
| Inputs unter 16px zoomen auf iOS | `text-base sm:text-sm` |
| `margin-left` in RTL-faehiger UI | `margin-inline-start` |

## Review-Output-Format (Pflicht)

Aenderungen immer als Markdown-Tabelle Before/After, gruppiert nach Prinzip
mit eigener Ueberschrift, jede Aenderung einzeln, After-Snippet im
Styling-System des Projekts. Leere Tabellen (nichts zu aendern) weglassen.

## Review-Checkliste

- [ ] Web-Fonts sind `.woff2`
- [ ] `font-synthesis: none` gesetzt, keine gefakten Gewichte/Stile
- [ ] Groessen kommen aus der Type Scale, keine Einzelwerte
- [ ] Heading-Groessen steigen mit der Ebene, keine ausgelassen
- [ ] Headings ~1.1 Line-Height, Body 1.5–1.6, unitless
- [ ] Langtext auf 60–75 Zeichen/Zeile gekappt
- [ ] Aendernde Zahlen nutzen `tabular-nums`
- [ ] Inputs sind 16px+ auf Mobil-Viewports
- [ ] Groessen/Kontrast erfuellen die Floors (16px Body, 4.5:1/3:1)
- [ ] `antialiased` einmal auf dem Root
- [ ] Direction-Properties sind logisch (`inline-start`, `start`)
