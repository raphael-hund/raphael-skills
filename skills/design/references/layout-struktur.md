> Vendoriert aus jakubkrehel/skills (github.com/jakubkrehel/skills), Skill
> `better-layout` @ Commit `a673333`, MIT-Lizenz. Kondensiert aus SKILL.md +
> grouping-and-alignment.md + spacing-and-adaptivity.md. Alle Zahlenwerte
> exakt aus der Quelle uebernommen. Hit-Areas/Fokus liegen in
> `barrierefreiheit.md`, Radius/Shadow/Motion in `ui-polish-details.md`,
> Zeilenlaenge/Text-Spacing in `typografie.md`.
> Details: `../VENDORING.md`.

# Layout & Struktur

Layout spricht, bevor ein Wort gelesen wird: Position, Abstand und Ausrichtung
tragen die Hierarchie allein, grosszuegiger Raum schlaegt Dekoration. Ein gutes
Layout haelt ausserdem Stress aus: Groesse aendern, uebersetzen, fuer RTL
spiegeln — es muss zusammenbleiben.

Jede Aenderung im **vorhandenen** Styling-System des Projekts ausdruecken
(Tailwind, plain CSS, CSS-in-JS). Nie einen zweiten Styling-Ansatz einfuehren.

Die Zahlen unten sind Startwerte fuer Interfaces **ohne** etablierte Dichte-
oder Spacing-Skala. Bewusste Plattform-Chrome, kompakte Profi-Werkzeuge und
vorhandene Projekt-Tokens bleiben erhalten, solange sie Hit-Area-, Zoom-,
Lokalisierungs- und Viewport-Test bestehen.

## 1. Gruppieren mit Raum, nicht mit Linien

Drei Werkzeuge, in dieser Reihenfolge:

1. **Negativer Raum** — der Default. Zusammengehoeriges nah, Fremdes fern.
2. **Hintergrundflaechen** — wenn eine Gruppe als eine Einheit lesen muss
   (auswaehlbare Zeile, ziehbare Karte).
3. **Trennlinien** — letzte Wahl, nur bei dichten Daten, wo Raum zu teuer waere
   (Tabellen, lange Settings-Listen).

**Strukturregel:** Der Abstand *zwischen* Gruppen muss mindestens **2×** so
gross sein wie der Abstand *innerhalb* einer Gruppe. `8px` innen -> `16px`+
aussen. Sonst liest die Gruppierung als Rauschen.

```css
/* Gut: Abstand allein traegt die Gruppierung */
.field-group { display: flex; flex-direction: column; gap: 8px; }
.form { display: flex; flex-direction: column; gap: 24px; }

/* Schlecht: gleichmaessiger Abstand plus Linien als Ausgleich */
.form > * { margin-bottom: 12px; border-bottom: 1px solid var(--separator); }
```

Wenn eine Trennlinie wirklich noetig ist: leise halten — Haarlinien-Breite,
niedriger Kontrast, **nie** kombiniert mit einem grossen Gap (der Gap hat die
Arbeit schon gemacht).

## 2. Bedienelemente von Inhalt unterscheidbar halten

Interaktive Elemente brauchen ein sichtbares Signal: Hintergrund, Border,
Unterstreichung oder eine konsistente Kontroll-Zone (Toolbar, Footer-Zeile).
Ein Control, das exakt wie statischer Text daneben aussieht, ist unsichtbar.

Die Umkehrung gilt auch: statischen Elementen **keine** Control-Optik geben.
Ein nicht klickbares Badge in Button-Form sammelt tote Klicks.

## 3. An gemeinsame Kanten ausrichten

Wenige Ausrichtungskanten waehlen und alles darauf setzen — das Auge folgt
geraden Kanten beim Scannen.

- Jede Streukante (Icon 2px neben der Textkante, Karte anders gepolstert als
  die Nachbarkarte) liest als Rauschen, auch wenn niemand es benennen kann.
- **Ein** Projekt-Spacing-Schritt pro Unterordnungsebene; `16px` ist ein
  brauchbarer Default ohne vorhandene Skala, tiefere Verschachtelung
  wiederholt denselben Schritt.
- Zahlen in Tabellen rechtsbuendig an die Trailing-Kante (Tabular-Figures
  siehe `typografie.md`), Text linksbuendig an die Leading-Kante.

## 4. Logische statt physischer Properties

Richtungsabhaengige horizontale Position als leading/trailing ausdruecken,
damit das Layout unter `dir="rtl"` automatisch spiegelt:

| Physisch (vermeiden) | Logisch (nutzen) |
|---|---|
| `margin-left` | `margin-inline-start` |
| `padding-right` | `padding-inline-end` |
| `left: 0` | `inset-inline-start: 0` |
| `text-align: left` | `text-align: start` |
| `border-right` | `border-inline-end` |

Tailwind: `ms-4 pe-6 text-start` statt `ml-4 pr-6 text-left`.

Physische Properties nur fuer echte physische Bildschirmseiten (Notch-
Positionierung, Element, das einer physischen Gestenrichtung folgen muss).

Wenn die Anordnung einen Fortschritt kodiert (Sterne-Rating, Step-Indicator,
Progress-Bar), spiegelt die Reihenfolge in RTL: Sterne fuellen von der
Trailing-Seite. Flexbox/Grid mit logischen Properties spiegeln automatisch,
handpositionierte Elemente nicht. Die Ziffernreihenfolge *innerhalb* einer
Zahl dreht sich nie.

## 5. Nach Wichtigkeit ordnen

Gelesen wird oben-nach-unten und leading-nach-trailing:

- Das Wichtigste steht oben und an der Leading-Kante. Je weiter unten und
  trailing, desto weniger Aufmerksamkeit.
- Wesentliches braucht Platz. Die eine Zahl, wegen der jemand gekommen ist,
  nicht unter Reihen von Nebendetails begraben — Sekundaeres in eingeklappte
  Abschnitte, Tabs oder Detailansichten schieben.
- Innerhalb einer Zeile fuehrt der identifizierende Inhalt (Name, Titel);
  Metadaten und Aktionen folgen hinten.

In **leading/trailing** denken, nicht links/rechts — dann spiegelt dieselbe
Hierarchie in RTL korrekt.

## 6. Den Einstieg nicht ueberladen

Der erste Bildschirm ist ein Inhaltsverzeichnis, nicht das ganze Buch. Wenn
alles prominent ist, ist nichts prominent:

- **Eine** primaere Aktion pro Ansicht.
- Sekundaere Aktionen ab drei Stueck hinter ein Menue gruppieren.
- Lieber eine kurze Ansicht, die tiefer verlinkt, als eine lange, die alles
  auf Ebene eins zeigt.

## 7. Luft zwischen Zielen

Zu eng gesetzte Controls werden vertippt und lesen als eine Einheit. Ohne
etablierte Dichte-Skala diese Startwerte:

| Zwischen | Startwert |
|---|---|
| Benachbarte Controls mit Border/Fuellung (Buttons, Inputs) | `12px` |
| Um randlose Controls (Text-Buttons, Icon-Buttons) | `24px` |
| Unverwandte Control-Gruppen | `24px`+ (2× der Innen-Gap) |

Randlose Controls brauchen mehr Luft, weil nichts markiert, wo ein Ziel endet
— der Raum *ist* die Grenze. Kompakte Profi-Werkzeuge duerfen weniger nutzen,
solange die Hit-Areas eindeutig bleiben und sich nicht ueberlappen.

WCAG-Zielgroessen und Pseudo-Element-Erweiterung stehen in
`barrierefreiheit.md`; diese Abstaende kommen **zusaetzlich** dazu, damit sich
erweiterte Hit-Areas nie ueberlappen.

## 8. Buttons von den Kanten einruecken

In Content-Layouts wirken Buttons, die an der Viewport-Kante kleben, wie
System-Chrome und beschneiden sich an runden Ecken oder Gesten-Zonen. Innerhalb
der Layout-Margins halten:

```css
/* Gut: eingerueckte Action-Bar */
.action-bar {
  padding-inline: 16px;
  padding-bottom: calc(16px + env(safe-area-inset-bottom));
}
.action-bar button { width: 100%; border-radius: 12px; }

/* Schlecht: Button an alle drei Kanten geklebt */
.action-bar button { width: 100vw; border-radius: 0; position: fixed; bottom: 0; }
```

Ohne Projekt-Token mit ca. `16px` Inline-Margin auf Mobil starten; der Button
darf innerhalb dieser Margins trotzdem die volle Inhaltsbreite spannen.
Edge-to-edge bleibt gueltig, wenn es bewusst Plattform-/App-Chrome ist und
Safe-Areas beruecksichtigt.

## 9. Progressive Disclosure braucht ein Signal

Komplexitaet verstecken ist gut; ohne Hinweis verstecken ist eine Falle. Jeder
ausgeblendete oder eingeklappte Inhalt braucht ein sichtbares Zeichen. Wenn das
Produkt schon ein Muster hat, dieses erhalten — sonst:

- **Peeking Items.** In horizontalen Scrollern/Karussells die Items so
  dimensionieren, dass das naechste **`16–32px`** ueber die Container-Kante
  hinausschaut. Eine Kartenreihe, die exakt an der Kante endet, wirkt
  vollstaendig — und niemand scrollt.
- **Disclosure-Controls.** Eingeklappte Abschnitte bekommen Chevron oder
  "Mehr anzeigen"; das Label nennt, was verborgen ist ("12 weitere Ergebnisse
  anzeigen"), nicht nur "Mehr".
- **Truncation-Signal.** Geklammerter Text zeigt Ellipse plus Weg zum
  Aufklappen (Mechanik in `typografie.md`).

```css
.scroller {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-inline: 24px;
  scroll-padding-inline: 24px;
  scroll-snap-type: x mandatory;
}
.scroller > * {
  flex: 0 0 calc(100% - 48px - 24px); /* Container minus Margins minus Peek */
  scroll-snap-align: start;
}
```

Tailwind-Aequivalent: `w-[80%]` auf den Karten haelt die fuehrenden 16–32px
der naechsten Karte sichtbar.

## 10. Inhalt blutet, Controls schweben

Die zwei Ebenen verhalten sich an den Kanten unterschiedlich:

- **Content-Ebene**: Hintergruende, Hero-Medien und scrollbare Listen laufen
  bis an die Viewport-Kanten.
- **Control-Ebene**: Text und Controls bleiben innerhalb der Layout-Margins
  und Safe-Areas (`env(safe-area-inset-*)`) und schweben ueber dem Inhalt.

Sticky-Chrome schwebt ueber der Content-Ebene, es staut sie nicht.

```css
/* Gut: Full-Bleed-Medien in einem begrenzten Artikel */
.article {
  display: grid;
  grid-template-columns: 1fr min(65ch, calc(100% - 48px)) 1fr;
}
.article > * { grid-column: 2; }
.article > .full-bleed { grid-column: 1 / -1; }

/* Floating Action Button mit Safe-Area */
.fab {
  position: fixed;
  inset-inline-end: calc(16px + env(safe-area-inset-right));
  bottom: calc(16px + env(safe-area-inset-bottom));
}
```

## 11. Struktur halten, bis sie bricht

Breakpoints gehoeren zum Inhalt, nicht zum Geraetekatalog:

- Dort brechen, wo das Layout **tatsaechlich** nicht mehr passt (Sidebar
  drueckt den Inhalt unter sein Mindestmass, Karten-Grid faellt unter eine
  nutzbare Spaltenbreite) — nicht bei `768px`, weil ein Preset das sagt.
- **Spaet kollabieren.** Ein Layout, das seine ausgebaute Struktur haelt,
  solange sie wirklich passt, bleibt stabil und vertraut. Zu frueh
  kollabieren verschenkt Platz, den der Nutzer bezahlt hat.
- Fuer Komponenten **Container-Queries** bevorzugen: eine Karte passt sich
  ihrer Spalte an, nicht dem Viewport.

```css
/* Gut: Komponente reagiert auf ihren Container */
.card-list { container-type: inline-size; }
@container (max-width: 400px) { .card { grid-template-columns: 1fr; } }

/* Schlecht: Viewport-Media-Query zerlegt die Karte in einer schmalen Sidebar */
@media (max-width: 768px) { .card { grid-template-columns: 1fr; } }
```

Testreihenfolge: kleinste und groesste unterstuetzte Groesse zuerst (die
brechen zuerst), dann die Groessen dazwischen.

## 12. Wachstum und Beschneidung einplanen

Layouts scheitern in zwei Richtungen: Inhalt waechst, Viewports schrumpfen.

**String-Wachstum schwankt stark** je nach Sprache und Laenge des
Ausgangsstrings — **nicht** auf einen universellen Prozentwert verlassen:

- Keine festen Breiten, die auf englische Labels dimensioniert sind —
  `max-width` plus Umbruch.
- Keine festen Hoehen auf Textcontainern — `min-height`, wenn eine Untergrenze
  noetig ist.
- Buttons dimensionieren sich aus ihrem Label (`padding-inline`), nie ueber
  eine hartcodierte Breite.
- Vor dem Ausliefern mit Pseudo-Lokalisierung oder einer Langstring-Sprache
  testen.

```css
/* Gut: Label bestimmt die Groesse */
.button { padding-inline: 16px; white-space: nowrap; }

/* Schlecht: Deutsch laeuft ueber oder wird abgeschnitten */
.button { width: 96px; overflow: hidden; }
```

**Clipping:** Kritische Aktionen nie dort parken, wo sie abgeschnitten werden
koennen — Unterkante eines resizebaren Panels, unter dem Fold eines Modals mit
fester Hoehe, hinter der aufklappenden Tastatur. Primaeraktionen in stabiles
Chrome legen: Sticky-Footer mit Safe-Area-Padding oder oben in der Ansicht.
Wenn der Modal-Inhalt scrollt, scrollt die Aktionszeile **nicht** mit.

## Common Mistakes

| Problem | Fix |
|---|---|
| Trennlinie, wo Abstand genuegt | Linie raus, Gap zwischen den Gruppen verdoppeln |
| `margin-left`/`padding-right` in lokalisierbarem Layout | `margin-inline-start`/`padding-inline-end` |
| Content-Button beruehrt versehentlich den Viewport | In die Projekt-Margins einruecken (bewusstes Plattform-Chrome bleibt) |
| Karussell/Scroller wirkt vollstaendig | Naechstes Item `16–32px` ueber die Kante schauen lassen |
| Benachbarte Controls verschmelzen / Hit-Areas ueberlappen | Gap erhoehen (Startwerte `12px`/`24px`) |
| Breakpoints bei 768/1024, weil das die Defaults sind | Dort brechen, wo der Inhalt wirklich nicht mehr passt |
| Textcontainer mit fester Breite fuer eine Sprache | `max-width` + Umbruch, mit Pseudo-Lokalisierung testen |
| Primaeraktion an der clipping-anfaelligen Panel-Unterkante | Sticky-Positionierung oder stabiles Chrome mit Safe-Area-Padding |

## Review-Output-Format

Nur nutzen, wenn ein eigenstaendiges Layout-Review verlangt ist. Befunde nach
Prinzip gruppieren, je Prinzip eine Markdown-Tabelle mit den Spalten
**Severity**, **Location**, **Before**, **After**, **Why** — nie getrennte
"Before:"/"After:"-Zeilen.

- **Severity**: `HIGH` blockiert Inhalt oder eine Aktion bei einer
  unterstuetzten Viewport-Breite · `MEDIUM` schadet Hierarchie, Lesereihenfolge
  oder Anpassungsfaehigkeit · `LOW` ist punktueller Ausrichtungs-/Abstands-
  Feinschliff.
- **Location**: `pfad/zur/datei:zeile`; ohne Quelldateien exakter Screen +
  Komponente.
- Wiederkehrendes Systemproblem in **eine** Zeile konsolidieren und alle
  betroffenen Stellen auflisten. Prinzipien ohne Befund weglassen.

Danach:

1. **Verification** — welche Checks liefen mit welchem beobachteten Ergebnis
   ueber die relevanten Viewport-Breiten, Lesereihenfolge, Zoom und RTL-Zustand.
   Nicht gelaufene Checks explizit als offen benennen.
2. **Verdict** — `Block` bei verbleibendem `HIGH`, `Needs changes` bei nur
   `MEDIUM`/`LOW`, `Approve` nur ohne offene Befunde.

Keine Befunde: Tabellen weglassen, "Keine belastbaren Layout-Befunde" schreiben,
Verification berichten, mit `Approve` enden.

## Review-Checkliste

- [ ] Gruppen-Gap ist mind. 2× der Innen-Gap
- [ ] Trennlinien nur dort, wo Raum zu teuer waere (dann leise)
- [ ] Controls optisch von statischem Text unterscheidbar (und umgekehrt)
- [ ] Wenige gemeinsame Ausrichtungskanten, keine Streukanten
- [ ] Logische Properties statt `margin-left`/`text-align: left`
- [ ] Wichtigstes oben und an der Leading-Kante
- [ ] `12px` zwischen bordered Controls, `24px` um randlose
- [ ] Verstecktes hat ein sichtbares Signal (Peek `16–32px` / Disclosure)
- [ ] Controls innerhalb der Layout-Margins + Safe-Areas
- [ ] Breakpoints aus dem Inhalt, Container-Queries fuer Komponenten
- [ ] Keine festen Breiten/Hoehen auf Textcontainern
- [ ] Primaeraktionen nicht in clipping-anfaelligen Zonen
