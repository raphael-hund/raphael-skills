> Vendoriert aus jakubkrehel/skills (github.com/jakubkrehel/skills), Skill
> `better-typography` @ Commit `a673333`, MIT-Lizenz. Kondensiert aus SKILL.md
> + choosing-fonts.md + css-cheat-sheet.md + details-and-accessibility.md
> + spacing-and-sizing.md + wrapping-and-punctuation.md
> (variable-fonts-and-opentype.md nur als Kurzabschnitt — Deep-Dive fuer
> Kundenprojekte selten relevant). Alle Zahlenwerte exakt aus der Quelle.
> Heading-Semantik/Outline siehe `barrierefreiheit.md`, raeumliches RTL und
> logische Properties siehe `layout-struktur.md`, Kontrastmessung siehe
> `farben-oklch.md`, Interface-Texte siehe `interface-texte.md`.
> Details: `../VENDORING.md`.

# Web-Typografie

Gute Typografie ist meist Zurueckhaltung: eine sinnvolle Skala, angenehmer
Abstand, genug Kontrast schlagen jeden Effekt. **Immer das Styling-System
des Projekts nutzen** (Tailwind-Utilities, plain CSS, CSS-Module,
styled-components) — nie ein zweites System einfuehren, nur um einen
Typo-Fix anzuwenden.

**Beim Review die Seite lesen, nicht den Code scannen:** blinzeln (haelt die
Hierarchie?), einen vollen Absatz am Stueck lesen (ist es angenehm?), das
Viewport-Fenster ziehen (schlechte Umbrueche, Waisen, Truncation bei echten
Textlaengen). Was hier auffaellt, findet kein Grep.

**Zustaendigkeiten:** Die Woerter selbst (Button-Labels, Fehlermeldungen,
Empty States) liegen in `interface-texte.md`; die semantische
Heading-Struktur in `barrierefreiheit.md`; raeumliches RTL-Layout und
logische CSS-Properties in `layout-struktur.md`; gemessener Kontrast eines
Vordergrund/Hintergrund-Paars und Farb-Fixes in `farben-oklch.md`. Diese
Datei besitzt, **wie** Text rendert, umbricht und sich in gemischt gerichtetem
Inhalt verhaelt.

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

**Duenne Gewichte sind Display-only.** Unter `18px` bei Gewicht `400`+
bleiben; `100`–`300` (Ultralight/Thin/Light) verschwinden bei Textgroessen
und auf Low-DPI-Bildschirmen. Erst ab `28px` Display-Text einsetzen — und
auch dort gegen den Hintergrund pruefen.

## Properties statt Raw-Tags

`font-weight: 650` statt `font-variation-settings: "wght" 650`,
`font-optical-sizing: auto` statt `"opsz"`, `font-variant-numeric:
tabular-nums` statt `font-feature-settings: "tnum" 1` — Properties bleiben
gueltig, wenn ein Nicht-Variable-Fallback rendert. Raw-Tags nur fuer
Custom-Achsen ohne eigene Property.

**Gewuenschte Schnitte laden statt Synthese abschalten.** Fehlt ein Gewicht
oder ein Kursiv-Schnitt, faelscht der Browser ihn. Der richtige Fix ist, die
Schnitte zu laden, die das Design wirklich benutzt. `font-synthesis: none`
erst setzen, nachdem geprueft ist, dass ueber den **kompletten
Fallback-Stack** jedes gebrauchte Bold, Kursiv, Kapitaelchen, Hoch- und
Tiefgestellt visuell unterscheidbar bleibt — `none` schaltet alle diese
Synthesen gemeinsam ab und kann Betonung loeschen, wenn der echte Schnitt
fehlt. Fuer Body- und Interface-Text Synthese eher anlassen. Stoert nur ein
Modus, die spezifische Longhand nehmen (`font-synthesis-weight`,
`font-synthesis-style`) statt der pauschalen Shorthand.

## Type Scale & Heading-Hierarchie

Wenige feste Groessen, moeglichst wenig Abweichung. Heading-Ebenen innerhalb
**eines semantischen Abschnitts** auf absteigende Skalenstufen abbilden: ein
untergeordnetes Heading darf sein Eltern-Heading nicht optisch ueberstimmen.
Tiefe Ebenen duerfen sich eine Groesse teilen, wenn Gewicht/Letter-Spacing
sie trotzdem unterscheidet. Ein Heading ist nie kleiner als Body-Text — es
sei denn, es ist bewusst eine Label-/Overline-Zeile.

Die **Semantik** (welches Tag, keine ausgelassene Ebene, eine `h1`) gehoert
zu `barrierefreiheit.md`; diese Datei steuert nur die optische Behandlung.
Nie ein Heading-Element wegen seiner Browser-Default-Groesse waehlen.

**Rollen-Skala:** Eine Skala, die je Rolle Groesse + Line-height + Gewicht
zusammenbindet, macht aus drei Entscheidungen eine. Solider Startpunkt fuer
Produkt-Interfaces:

| Rolle | Groesse | Line-height | Gewicht |
|---|---|---|---|
| Display | `2.25rem` (36px) | `1.1` | `600` |
| Title | `1.5rem` (24px) | `1.2` | `600` |
| Heading | `1.125rem` (18px) | `1.3` | `600` |
| Body | `1rem` (16px) | `1.5` | `400` |
| Caption | `0.8125rem` (13px) | `1.4` | `400` |

Betonung innerhalb einer Rolle ist **ein Gewichtsschritt** hoch
(`400` → `500`), kein Groessenwechsel.

Line-height: Headings ~1.1, Body 1.5–1.6, unitless (skaliert mit der
Schriftgroesse; `24px` fest tut das nicht). **Enge Line-height ist nur fuer
kurzen Text**: alles, was auf drei oder mehr Zeilen umbricht, braucht
mindestens `1.4` — auch in hoehenbeschraenkten Listenzeilen und Cards. Ein
eng gesetzter Absatz ist schwerer zu lesen, als eine hoehere Zeile zu
verkraften ist.

```css
/* Schlecht: Card-Beschreibung auf Heading-Leading */
.card-description { line-height: 1.1; }

/* Gut: bricht auf 3 Zeilen um, liest sich also als Body */
.card-description { line-height: 1.4; }
```

Letter-Spacing: grosse Headings leicht negativ, kleine Uppercase-Labels
leicht positiv, Fliesstext braucht keins.

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

## Zahlen, iOS-Zoom, Groessen-Floors

`font-variant-numeric: tabular-nums` auf jedem sich aendernden Wert (Timer,
Zaehler, Preise) gegen Layout-Shift. **iOS-Input-Zoom-Fix**: Inputs unter
16px zoomen die ganze Seite beim Fokussieren — `text-base sm:text-sm`
verwenden. `maximum-scale=1` im Viewport-Meta vermeiden: Safari ignoriert es
fuer Pinch-Zoom, aber jeder andere Browser haelt sich daran und blockiert
Zoom, was WCAG 1.4.4 verletzt.

**Groessen-Floors sind Startpunkte, keine Gesetze.** Langtext nahe dem
Browser-Default `16px` beginnen und dann in der echten Schrift, Zeilenlaenge,
Plattform und Produktdichte beurteilen. UI-Text darf kleiner: `14px` als
Startpunkt fuer Inputs und Menues (Inputs mobil trotzdem `16px`), `13px` fuer
Captions, selten unter `12px`.

Wirkt Text kontrastschwach, das gerenderte Vordergrund/Hintergrund-Paar mit
`farben-oklch.md` **messen** und die Anforderung mit `barrierefreiheit.md`
einordnen — Farben nicht ungefragt aendern (Projektfarben sind eine
Design-Entscheidung).

## Smart Punctuation & Internationalisierung

Copy in natuerlicher Schreibweise speichern, Praesentation per
`text-transform` steuern — Redesigns brauchen dann kein Copy-Rewrite.
Typografische Anfuehrungszeichen statt gerader (im Code gerade lassen),
Halbgeviertstrich fuer Bereiche (`2010–2020`), Gedankenstrich als eigenes
Zeichen, einzelnes Ellipsis-Zeichen `…`, `&nbsp;` um Werte wie "16 px"
zusammenzuhalten, `&shy;` fuer kontrollierte Wortumbrueche.

`lang`-Attribut setzen, damit Browser und Hilfstechnik die richtige
Aussprache, Anfuehrungszeichen und Trennung waehlen. `dir` an der
Dokument- oder Inhaltsgrenze setzen, an der die Richtung wechselt.
Raeumliches Spiegeln und die logischen Properties (`margin-inline-start`,
`text-align: start`) gehoeren zu `layout-struktur.md`.

Zwei Feinheiten bei gemischt gerichtetem Text:

- **Lange Absaetze richten sich nach ihrer eigenen Sprache aus.** Ein ein-
  oder zweizeiliges Schnipsel folgt der Richtung der umgebenden UI; ein
  Absatz ab drei Zeilen richtet sich nach seiner eigenen Schriftrichtung —
  ein englischer Absatz bleibt LTR start-ausgerichtet, auch in einer
  RTL-Oberflaeche. `text-align: start` plus korrektes `lang`/`dir` am
  Absatz-Element erledigt das.
- **Ziffern nie umdrehen.** Zahlen behalten ihre Reihenfolge in jeder
  Richtung: eine Telefonnummer oder "541" liest sich in RTL identisch.
  Browser regeln das ueber den Unicode-Bidi-Algorithmus — nicht per Hand
  gegensteuern; gemischte Zahl-/Text-Werte bei Bedarf in `<bdi>` wickeln.

## Details & Accessibility

Underlines aus den Font-Metriken ziehen: `text-underline-position:
from-font` + `text-decoration-thickness: from-font`, oder manuell per
`text-decoration-thickness`/`text-underline-offset`/
`text-decoration-skip-ink`. `text-decoration-style: dotted` als Hinweis auf
zusaetzliche Info (Abkuerzung, definierter Begriff). Wenn mehr als eine
Farbaenderung animiert werden soll, Underline als eigenes Element bauen statt
`text-decoration` (nur Farbe animiert dort zuverlaessig).

**Text selektierbar lassen.** `::selection` darf die Markenfarbe in die
Textauswahl tragen, solange die Kombination lesbar bleibt. Auswahl ist per
Default aktiv — auch in der Applikations-Chrome: Nutzer kopieren Labels, IDs,
Fehlertexte und Werte auf Wege, die niemand vorhersieht. `user-select: none`
nur auf einer konkreten Drag-/Gesten-Flaeche, wo versehentliches Markieren
die Interaktion nachweislich stoert — nie global und nie nur, um "nativer"
zu wirken.

Font-Smoothing einmal auf dem Root setzen (`-webkit-font-smoothing:
antialiased` + `-moz-osx-font-smoothing: grayscale`, in Tailwind:
`antialiased`) — macOS rendert sonst zu fett.

## Common Mistakes

| Problem | Fix |
|---|---|
| `.ttf`/`.otf` im Web | zu `.woff2` konvertieren |
| `font-variation-settings:"wght"` fuer Gewicht | `font-weight` (funktioniert mit Non-Variable-Fallback) |
| Synthetisierter Schnitt weicht vom gemeinten Design ab | benoetigten Schnitt laden; nur den geprueften Synthese-Modus abschalten, ohne Betonung zu loeschen |
| Hartcodierte Einzelgroessen | Type Scale nutzen |
| Kind-Heading ueberstimmt optisch sein Eltern-Heading | Hierarchie dieses Abschnitts auf absteigende Skalenstufen mappen |
| Heading-Element wegen seiner Default-Groesse gewaehlt | Semantik ueber `barrierefreiheit.md`, Groesse per CSS |
| `line-height: 24px` auf skalierbarem Text | unitless (`1.5`) |
| `leading-none` auf dreizeiliger Card-Beschreibung | mind. `1.4` bei allem, was auf 3+ Zeilen umbricht |
| Thin/Light-Gewicht auf `14px` UI-Text | Gewicht `400`+ unter `18px`; duenne Gewichte nur Display |
| Volle Breite bei Fliesstext | 60–75 Zeichen/Zeile kappen |
| Zahlen verursachen Layout-Shift | `tabular-nums` |
| Truncated Text ohne Zugriff auf den Volltext | Tooltip/Expand |
| Inputs unter 16px zoomen auf iOS | `text-base sm:text-sm` |
| Root-Layout ohne Font-Smoothing | `antialiased` einmal auf dem Root |
| Gemischt gerichteter Wert rendert in falscher Reihenfolge | korrektes `lang`/`dir` setzen, Wert bei Bedarf in `<bdi>` |
| Auswahl in der ganzen App-Chrome abgeschaltet | Auswahl zurueckgeben; nur auf konkreter Drag-/Gesten-Flaeche unterdruecken |

## Review-Output-Format (Pflicht)

Aenderungen immer als Markdown-Tabelle Before/After, gruppiert nach Prinzip
mit eigener Ueberschrift, jede Aenderung einzeln, After-Snippet im
Styling-System des Projekts. Leere Tabellen (nichts zu aendern) weglassen.

## Review-Checkliste

- [ ] Web-Fonts sind `.woff2`
- [ ] Alle gebrauchten Schnitte geladen; `font-synthesis` nur nach geprueftem Fallback-Stack abgeschaltet
- [ ] Groessen kommen aus der Type Scale (Rollen-Skala), keine Einzelwerte
- [ ] Heading-Groessen fallen innerhalb jedes Abschnitts ab
- [ ] Headings ~1.1 Line-Height, Body 1.5–1.6, unitless; 3+ Zeilen mind. 1.4
- [ ] Kein Gewicht unter `400` bei Text unter `18px`
- [ ] Langtext auf 60–75 Zeichen/Zeile gekappt
- [ ] Aendernde Zahlen nutzen `tabular-nums`
- [ ] Inputs sind 16px+ auf Mobil-Viewports
- [ ] Text selektierbar; `user-select: none` nur auf begruendeter Drag-/Gesten-Flaeche
- [ ] `antialiased` einmal auf dem Root
- [ ] `lang`/`dir` an den richtigen Grenzen gesetzt, Ziffernreihenfolge intakt
- [ ] Beim Review: geblinzelt, einen Absatz gelesen, Viewport gezogen
