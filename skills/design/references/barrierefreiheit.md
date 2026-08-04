> Vendoriert aus jakubkrehel/skills (github.com/jakubkrehel/skills), Skill
> `better-accessibility` @ Commit `a673333`, MIT-Lizenz. Kondensiert aus
> SKILL.md + focus-and-keyboard.md + semantics-and-aria.md + forms.md +
> screen-readers.md + hit-areas.md + motion-and-zoom.md. Alle Zahlenwerte und
> WCAG-Kriterien exakt aus der Quelle. Kontrastmessung siehe `farben-oklch.md`,
> Textgroessen/iOS-Zoom siehe `typografie.md`, raeumliches RTL-Layout siehe
> `layout-struktur.md`.
> Details: `../VENDORING.md`.

# Barrierefreiheit (A11y)

Barrierefreiheit ist keine Compliance-Checkbox am Ende, sondern der Boden fuer
Interface-Handwerk. Das meiste ist gratis, wenn man die Plattform nutzt: native
Elemente bringen Tastaturbedienung mit, echte Labels melden sich selbst, ein
sichtbarer Fokusring ist eine CSS-Regel.

Beim Review **zuerst als reiner Tastatur-Nutzer** durchlaufen (jeder Flow muss
ohne Maus komplett durchfuehrbar sein), **dann als Screenreader-Nutzer**: Meldet
jedes Control einen Namen, eine Rolle und seinen Zustand? Im Zweifel den
Plattform-Default nehmen statt neu zu bauen — und ARIA eher **entfernen** als
hinzufuegen.

Fixes immer im vorhandenen Styling-System des Projekts (Tailwind vs. plain CSS
vs. CSS-in-JS).

## 1. Native Elemente zuerst

Erste ARIA-Regel: kein ARIA, wenn ein natives Element existiert.

| Element | Wofuer | Warum |
|---|---|---|
| `<a href>` | Navigation: alles, was irgendwohin fuehrt oder die URL aendert | Gratis Cmd/Ctrl/Mittelklick, Rechtsklick -> Link kopieren, Enter |
| `<button>` | Aktionen: submit, toggle, oeffnen, loeschen | Gratis Fokus, Enter **und** Space, Formular-Semantik |
| `<div onClick>` | Nichts | Keine Rolle, kein Fokus, keine Tastatur; Screenreader sehen nur Text |

Die fuenf ARIA-Regeln:

1. Gibt es ein natives HTML-Element mit der gebrauchten Semantik und dem
   gebrauchten Verhalten, dieses nutzen statt ein anderes per ARIA umzuwidmen.
2. Native Semantik nicht aendern, ausser es geht wirklich nicht anders.
3. Jedes interaktive ARIA-Control muss tastaturbedienbar sein — eine Rolle ist
   ein **Versprechen** auf das komplette Tastaturmodell, die Zustaende und das
   Verhalten.
4. Nie `role="presentation"` oder `aria-hidden="true"` auf ein fokussierbares
   Element.
5. Alle interaktiven Elemente brauchen einen zugaenglichen Namen.

**Kein ARIA ist besser als schlechtes ARIA** — ein Screenreader vertraut den
Rollen, eine falsche Rolle ist schlimmer als gar keine.

Wenn ein natives Element wirklich unmoeglich ist, lautet das volle Polyfill
`role="button"` + `tabindex="0"` + Enter- und Space-Handler — genau deshalb ist
das native Element immer weniger Code.

Wenn es klickbar aussieht, muss es klickbar sein — und umgekehrt. Einen Link
als Button nachzubauen (oder umgekehrt) bricht Erwartungen: ein "Button", der
navigiert, gehoert als gestyltes `<a>` gebaut.

### Haeufige ARIA-Fehler

| Fehler | Warum es scheitert |
|---|---|
| `aria-label` auf einem einfachen `<div>`/`<span>` | Namen auf nicht-interaktiven, rollenlosen Elementen ignorieren die meisten Screenreader |
| `<button role="button">` | Redundante Rolle, nur Rauschen |
| `aria-hidden="true"` auf oder ueber einem fokussierbaren Element | Erzeugt Tab-Stopps, die fuer den Screenreader nicht existieren |
| `aria-labelledby`/`aria-describedby` auf fehlende ID | Erzeugt still gar keinen Namen/keine Beschreibung |
| `role="menu"` auf einer Nav-Liste | `menu` verspricht App-Pfeiltasten-Verhalten; Seitennavigation ist `<nav>` mit Liste |

## 2. Sichtbare Fokusringe

`:focus-visible` stylen, **nicht** blankes `:focus` — der Browser zeigt es bei
Tastatur und Assistenztechnik, unterdrueckt es aber beim Mausklick.

Am besten den **unveraenderten** Browser-Fokusring behalten: er passt sich
Plattform und Forced-Colors an, ohne dass jemand jeden Hintergrund vorhersagen
muss. Nur `outline-offset` zu ergaenzen erhaelt diesen Indikator in der Regel.
Ein `outline: 2px solid` ohne Farbe rendert `currentColor` — das ist **nicht
automatisch** zugaenglich, weil die Outline Farben kreuzen kann, die sich vom
Texthintergrund unterscheiden.

```css
/* Am besten: Browser-Ring behalten, nur Luft geben */
:focus-visible { outline-offset: 2px; }

/* Eigener Ring, wenn das Design ihn braucht: verifiziertes Projekt-Token */
:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
```

Mindestens **`2px`** durchgehende Umrandung oder eine gleichwertig sichtbare
Flaeche. Nie `outline: none` / `focus:outline-none` ohne verifizierten Ersatz.

Ein eigener Fokus-Indikator muss die geltende Projekt-/WCAG-Vorgabe fuer
sichtbare Flaeche und Kontrastwechsel erfuellen. Den **kompletten Umriss** gegen
**jede** angrenzende Farbe pruefen, die er kreuzt: Komponentenfuellungen,
Seitenflaechen, Bilder, Gradienten sowie Hover-/Selected-Zustaende. Token,
Markenfarbe oder `currentColor` sind nur nach bestandenem Render-Check okay.

In `forced-colors: active` (Windows High Contrast) die Standard-Farbanpassung
behalten oder explizit eine Systemfarbe wie `Highlight` nutzen; nie mit
`forced-color-adjust: none` die Autorenfarbe einfrieren, ausser das Control
bleibt wahrnehmbar.

`:focus-within` nutzen, wenn ein Wrapper aufleuchten soll, waehrend ein inneres
Input Fokus hat (Suchfeld mit Icon innerhalb der Border).

### Skip-Link

Geht wiederholte Navigation oder wiederholtes Chrome dem Hauptinhalt voraus,
ist das **erste** fokussierbare Element ein "Zum Inhalt springen"-Link auf
`<main id="main">`, visuell versteckt bis zum Fokus:

```css
.skip-link { position: absolute; inset-inline-start: -999px; }
.skip-link:focus { inset-inline-start: 16px; top: 16px; }
```

Anker-Ziele auf der Seite bekommen `scroll-margin-top` (z.B.
`scroll-margin-top: 80px` unter einem Sticky-Header).

## 3. Volle Tastaturbedienung

Jede Zeigerinteraktion braucht einen Tastaturpfad.

### tabindex-Regeln

- `tabindex="0"`: nimmt am natuerlichen Tab-Order teil. Nur fuer eigene
  interaktive Elemente, die nicht nativ fokussierbar sind.
- `tabindex="-1"`: nur per JavaScript fokussierbar (`el.focus()`). Fuer
  Ueberschriften, auf die Fokus gesetzt wird, Modal-Container und Mitglieder
  eines Roving-Tabindex.
- **Positiver `tabindex`: nie.** Kapert die Tab-Reihenfolge der ganzen Seite —
  stattdessen die DOM-Reihenfolge korrigieren.

**Roving Tabindex:** Composite-Widgets (Tabs, Menues, Toolbars, Radio-Gruppen)
belegen **einen** Tab-Stopp. Das aktive Element hat `tabindex="0"`, alle anderen
`tabindex="-1"`, Pfeiltasten bewegen Fokus **und** die `0`.

### Tastaturmuster (ARIA APG)

| Widget | Tasten |
|---|---|
| Dialog | Tab/Shift+Tab zirkulieren innen (am Ende umbrechen); Escape schliesst |
| Tabs | Pfeiltasten wechseln zwischen Tabs (umlaufend); Tab verlaesst zum Panel; Home/End zu erstem/letztem |
| Menue-Button | Enter/Space/ArrowDown oeffnet + fokussiert erstes Item; ArrowUp oeffnet + fokussiert letztes; Pfeile navigieren; Escape schliesst und fokussiert den Button zurueck |
| Disclosure/Akkordeon | Header ist `<button aria-expanded>`; Enter und Space toggeln |
| Combobox | ArrowDown oeffnet/geht in die Liste; Enter uebernimmt; Escape schliesst und kehrt zum Input zurueck; Tippen filtert |
| Listbox/Radio-Gruppe | Pfeiltasten bewegen die Auswahl; ein Tab-Stopp fuer die ganze Gruppe |

Universelle Regeln:

- Escape schliesst das zuletzt Geoeffnete: erst Tooltip, dann Menue, dann Dialog.
- Pfeiltasten (nicht Tab) bewegen **innerhalb** eines Composite-Widgets; Tab
  bewegt **zwischen** Widgets.
- Tabs waehlen den Aktivierungsmodus: automatisch (Panel wechselt beim
  Pfeil-Fokus), wenn Panels sofort rendern; manuell (Enter/Space aktiviert),
  wenn der Wechsel teuer ist.
- Enter sendet das Formular des fokussierten Inputs ab. In `<textarea>` fuegt
  Enter einen Zeilenumbruch ein, ⌘/Ctrl+Enter sendet ab.

## 4. Fokus fangen und zuruecksetzen

Modals muessen den Fokus fangen. Moderne Technik: `inert` auf allem hinter dem
Dialog — nimmt Hintergrundinhalt in einem Zug aus Tab-Order **und**
Assistenztechnik.

```tsx
// Beim Oeffnen
document.getElementById("app-content").inert = true;
const dialog = dialogRef.current;
(dialog.querySelector("[autofocus]") ??
  dialog.querySelector("button, [href], input, select, textarea"))?.focus();

// Beim Schliessen
document.getElementById("app-content").inert = false;
triggerRef.current?.focus(); // Fokus IMMER zum oeffnenden Element zurueck
```

Natives `<dialog>` mit `showModal()` liefert Trap, `inert`-Hintergrund und
Escape-Handling gratis — bevorzugen. Ein eigenes Overlay braucht
`role="dialog"`, `aria-modal="true"` und einen zugaenglichen Namen
(`aria-labelledby` auf die Ueberschrift). In beiden Faellen:

- Beim Oeffnen das erste fokussierbare Element fokussieren; bei destruktiven
  Bestaetigungen stattdessen die **am wenigsten** destruktive Aktion.
- Beim Schliessen Fokus zum Trigger zurueck. Existiert der nicht mehr, auf den
  naechstgelegenen logischen Container.
- `overscroll-behavior: contain` auf den Dialog, damit Scrollen darin nie die
  Seite dahinter scrollt.

### SPA-Routenwechsel

Client-seitige Navigation setzt weder Fokus zurueck noch meldet sie etwas. Beim
Routenwechsel: `document.title` auf den neuen Kontext aktualisieren, dann Fokus
auf die `<h1>` der neuen Ansicht (mit `tabindex="-1"`) oder auf `<main>`.
Scrollposition bei Zurueck/Vorwaerts wiederherstellen, bei Vorwaertsnavigation
nach oben scrollen.

## 5. Mindest-Hit-Area

**Konformitaets-Untergrenze und Komfortziel sind zwei verschiedene Dinge:**

| Standard | Minimum |
|---|---|
| WCAG 2.5.8 (AA) | **24×24px — die harte Untergrenze** |
| WCAG 2.5.5 (AAA) | 44×44px |
| Apple HIG | 44×44pt |
| Material Design | 48×48dp |

WCAG 2.5.8 Level AA verlangt ein Ziel von 24×24 CSS-Pixeln **oder** eine seiner
definierten Ausnahmen. **44px** gilt als empfohlenes Touch-Ziel fuer primaere
Controls, **40px** als brauchbares Desktop-Ziel, wenn die Dichte des Produkts es
zulaesst. Kleinere Controls sind nicht automatisch Fehler: erst die Ausnahmen
fuer Spacing, gleichwertiges Control, Inline, User-Agent und Essenziell pruefen,
bevor man einen Fund meldet.

**Spacing-Ausnahme:** Ein zu kleines Ziel besteht, wenn ein 24px-Kreis, zentriert
auf seiner Bounding-Box, kein anderes Ziel und keinen Kreis eines anderen zu
kleinen Ziels schneidet. Im einfachen Fall brauchen 20px-Ziele mindestens
**4px** Abstand.

Das **sichtbare** Element darf klein bleiben; gross sein muss die **Hit-Area**.
Was klickbar aussieht, muss auf seiner ganzen sichtbaren Flaeche klickbar sein —
keine toten Zonen (Checkbox und ihr Label teilen sich ein Ziel).

### Hit-Area erweitern

Ist das sichtbare Element kleiner (z.B. 20×20-Checkbox), per Pseudo-Element
erweitern. Das Pseudo-Element gehoert auf das umschliessende `<label>` oder
`<button>`, **nicht** auf das `<input>` selbst — ersetzte Elemente rendern
`::before`/`::after` nicht zuverlaessig.

```css
/* Kleine Checkbox mit erweiterter 44px-Hit-Area, auf dem Label */
.checkbox-label { position: relative; width: 20px; height: 20px; }
.checkbox-label::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%; /* physische Zentrierung: richtungsunabhaengig */
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
}
```

Tailwind: `relative size-5 after:absolute after:top-1/2 after:left-1/2
after:size-11 after:-translate-1/2`.

**Layout-Alternative:** Wenn das Element echte Box-Groesse haben darf, das
Pseudo-Element sparen und die Box selbst zum Ziel machen — dann kennt der
Browser auch die echte Geometrie fuer Scrolling und Gesten:

```css
.icon-button { min-width: 44px; min-height: 44px; display: inline-grid; place-items: center; }
```

**Kollisionsregel:** Ueberlappt die erweiterte Hit-Area ein anderes interaktives
Element, das Pseudo-Element verkleinern — aber so gross wie moeglich ohne
Kollision. Zwei interaktive Elemente duerfen **nie** ueberlappende Hit-Areas
haben.

### Touch-Verhalten

- `touch-action: manipulation` auf interaktive Elemente entfernt die
  Doppeltipp-zum-Zoomen-Verzoegerung auf Mobil.
- `-webkit-tap-highlight-color` passend zum Design setzen statt des grauen
  Default-Blitzes.
- Grosszuegige Ziele und klare Affordances schlagen fummelige Interaktionen
  (winzige Drag-Handles, praezise Hover-Zonen).

## 6. Jedes Control labeln und typisieren

Jedes Control braucht ein programmatisches Label: `<label for>` auf die `id` des
Inputs oder ein umschliessendes `<label>`. Ein **Placeholder ist nie ein Label**
— er verschwindet beim ersten Tippen und scheitert meist am Kontrast.

```html
<!-- Gut: explizite Verknuepfung -->
<label for="email">E-Mail</label>
<input id="email" type="email" autocomplete="email" />

<!-- Gut: umschliessendes Label, ein gemeinsames Ziel -->
<label><input type="checkbox" /> Updates schicken</label>
```

Label und Control teilen **ein** Ziel: ein Klick auf den Text toggelt die
Checkbox, ohne tote Zone dazwischen. Pflichtfelder mit nativem `required` plus
sichtbarem Hinweis, der einmal pro Formular erklaert wird ("* Pflichtfeld").
Placeholder **zusaetzlich** zum Label zeigen ein Format-Beispiel:
`placeholder="name@firma.de"`.

### Autocomplete und Input-Typen

`autocomplete` mit sinnvollem `name` fuellt Formulare in einem Tipp und ist fuer
Felder ueber den Nutzer eine WCAG-Anforderung (1.3.5):

| Feld | `autocomplete` |
|---|---|
| Name | `name` (bzw. `given-name`/`family-name`) |
| E-Mail | `email` |
| Telefon | `tel` |
| Adresse | `street-address`, `address-line1`, `postal-code`, `country` |
| Karte | `cc-number`, `cc-exp`, `cc-csc`, `cc-name` |
| Login | `username`, `current-password` |
| Registrierung/Reset | `new-password` |
| 2FA-Code | `one-time-code` |

Bei Bedarf mit Sektion praefixen: `autocomplete="shipping street-address"`.

Richtiger `type` und `inputmode` waehlen die Mobil-Tastatur:

| Input | Nutzen |
|---|---|
| E-Mail, URL, Telefon | `type="email"`, `type="url"`, `type="tel"` |
| OTP/PIN/Kartennummer | `type="text" inputmode="numeric"` (behaelt Text-Semantik, kein Spinner) |
| Geld, Dezimalzahlen | `type="text" inputmode="decimal"` |
| Echte numerische Menge | `type="number"` |

`spellcheck="false"` bei E-Mails, Codes und Benutzernamen.

**Nie gegen die Werkzeuge des Nutzers arbeiten:** Einfuegen (Paste) nie
blockieren — Passwoerter und Einmalcodes werden eingefuegt. Kompatibel mit
Passwortmanagern und 2FA-Autofill bleiben: echtes `<form>`, korrektes
`autocomplete`, keine Fake-Inputs.

## 7. Fehler, die sich melden

```html
<label for="email">E-Mail</label>
<input id="email" type="email" autocomplete="email"
       aria-invalid="true" aria-describedby="email-error" />
<p id="email-error">Bitte eine gueltige E-Mail-Adresse eingeben.</p>
```

- `aria-invalid="true"` auf das fehlerhafte Feld, nach Korrektur entfernen.
- `aria-describedby` verknuepft Feld und Inline-Fehler, damit der Screenreader
  ihn gemeinsam mit dem Feld meldet.
- Fehler erscheinen inline am Feld, mit Icon oder Text — **nie** nur ein roter
  Rahmen (reine Farbsignale scheitern).
- Beim Absenden das **erste** ungueltige Feld fokussieren.
- Unvollstaendiges Absenden zulassen, damit Validierung ueberhaupt sichtbar wird.
- Freitext annehmen und danach validieren; nicht waehrend des Tippens blocken
  oder Zeichen filtern. Werte vor der Validierung trimmen — Autocomplete und
  Textbausteine haengen Leerzeichen an.

**Submit-Verhalten:** Submit **aktiviert lassen**, bis der Request startet; dann
deaktivieren und einen Spinner zeigen, **aber das Original-Label behalten**
("Speichern" mit Spinner, nicht nur ein Spinner) — das Label sagt der
Assistenztechnik, welcher Button beschaeftigt ist. Erfolg ueber eine hoefliche
Live-Region melden. Vor Navigation bei ungespeicherten Aenderungen warnen und
getippte Eingaben nie an ein Re-Render verlieren; Hydration muss Fokus und Wert
erhalten.

### Disabled-Zustaende

Natives `disabled` liefert das komplette Plattform-Verhalten: nimmt das Control
aus der Tab-Order, unterdrueckt Aktivierung, wendet `:disabled` an und schliesst
Formular-Controls vom Absenden aus. Nutzen, wenn ein natives Control wirklich
nicht verfuegbar ist. `aria-disabled="true"` **meldet nur** den Zustand — es
aendert weder Fokussierbarkeit noch Verhalten noch Styling.

- Submit-Buttons gar nicht deaktivieren: aktiviert lassen, beim Absenden
  validieren, ersten Fehler fokussieren.
- `aria-disabled="true"` nur, wenn Auffindbarkeit in der Tab-Order **absichtlich**
  erhalten bleiben soll oder ein eigenes Control kein natives `disabled` nutzen
  kann. Dann Zeiger- **und** Tastaturaktivierung im Handler blocken, Absenden
  verhindern, den Zustand explizit stylen (inkl. Forced-Colors) und in der Naehe
  erklaeren, warum die Aktion nicht verfuegbar ist.
- **Nie** `disabled` und `aria-disabled` gleichzeitig auf dasselbe Element.
- Disabled-Controls sind von Kontrast-Minima ausgenommen — trotzdem lesbar halten.

## 8. Zugaengliche Namen ueberall

Namensreihenfolge: `aria-labelledby` > `aria-label` > natives Label (`<label>`,
Textinhalt, `alt`) > `title`-Attribut.

- Sichtbaren Text oder `aria-labelledby` gegenueber `aria-label` bevorzugen:
  `aria-label` ist unsichtbar, laeuft aus dem UI heraus und wird von
  Uebersetzungswerkzeugen uneinheitlich behandelt.
- Icon-only-Buttons brauchen **immer** einen Namen: `<button aria-label="Schliessen">`
  mit dem Icon auf `aria-hidden="true"`.
- Der sichtbare Label-Text muss **im** zugaenglichen Namen vorkommen (WCAG 2.5.3
  Label in Name). Ein Button mit der Aufschrift "Senden" und
  `aria-label="Nachricht absenden"` bricht Sprachsteuerung ("Klick Senden").
- `translate="no"` auf Markennamen, Code-Tokens und Identifier, damit
  Auto-Uebersetzung sie nicht zerlegt.

## 9. Nicht auf Farbe allein verlassen

Status braucht ein redundantes Signal: Icon, Text oder Unterstreichung neben der
Farbe. Erst aus Inhalt und Zustand bestimmen, **welche** WCAG-Kontrastanforderung
gilt, dann mit `farben-oklch.md` das gerenderte Vordergrund-/Hintergrund-Paar
messen. Bei Nichtbestehen das Paar und das verfehlte Kriterium melden — die
Projektfarben nicht ungefragt aendern.

## 10. `prefers-reduced-motion` respektieren

Motion **opt-in** machen: Animationen in
`@media (prefers-reduced-motion: no-preference)` wickeln, statt jeder Animation
hinterher zu ueberschreiben.

```css
.card { /* statische Styles */ }
@media (prefers-reduced-motion: no-preference) {
  .card { transition: transform 200ms ease-out; }
}
```

Tailwind: `motion-safe:` / `motion-reduce:`-Varianten.

Wenn Opt-in in einer Bestandscodebase nicht machbar ist, ist der globale
Kill-Switch der Fallback:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

`0.01ms` statt `none`, damit `animationend`/`transitionend` weiter feuern und
darauf wartendes JS nicht haengt.

Reduced Motion heisst **reduziert, nicht eliminiert** — es zielt auf
vestibulaere Ausloeser, nicht auf Feedback:

| Ganz abschalten | Ersetzen | Behalten |
|---|---|---|
| Parallax-Scrolling | Slide/Scale/Zoom -> Opacity-Crossfade | Lade-Spinner und Fortschritt |
| Autoplay-Video, GIFs, Endlos-Deko | Smooth Scrolling -> sofortiger Sprung | Sofortige Zustandswechsel (Hover-Farbe, Fokusring) |
| Rotieren, grossflaechige Bewegung ueber den Screen | Auto-rotierende Karussells -> pausiert starten | Kurzes funktionales Feedback (Button-Druck) |

Animationen muessen unterbrechbar und nutzergesteuert sein; nichts darf
automatisch starten oder sich weigern zu stoppen.

## 11. Autoplay und zeitgesteuerte UI

- **Kein Autoplay-Medium ohne sichtbare Steuerung** (WCAG 2.2.2): alles, was
  sich laenger als **5 Sekunden** automatisch bewegt, blinkt oder aktualisiert,
  braucht einen sichtbaren Pause-/Stopp-Knopf. Stummgeschaltete Hero-Loop-Videos
  eingeschlossen.
- **Explizites Schliessen schlaegt Timer.** Auto-schliessende Toasts sind nur
  fuer risikoarme Bestaetigungen okay; alles mit Aktion, Fehler oder
  handlungsrelevanter Information bleibt bis zum Schliessen stehen. Muss ein
  Toast ablaufen, sind **5 Sekunden** die Untergrenze, und Hovern oder
  Fokussieren pausiert den Timer.
- **Nie kritische Information nur in ein zeitgesteuertes Element legen.** Ein
  verschwundener Toast mit dem einzigen Undo-Link ist Datenverlust nach Zeitplan.

## 12. Dynamische Inhalte melden

Diese Liste abarbeiten und beim ersten Treffer stoppen:

1. **Fokus wandert ohnehin dorthin** (geoeffnetes Modal, erstes fehlerhaftes Feld
   beim Absenden): nichts weiter noetig, die Fokusbewegung **ist** die Meldung.
2. **An ein bestimmtes Control gebunden** (Feldfehler, Zeichenzaehler):
   `aria-describedby` auf dem Control — wird gemeinsam mit dem Feld gemeldet.
3. **Nicht dringend, nicht an ein Control gebunden** (Toast, "Gespeichert",
   Ergebniszahl, Ladezustand): hoefliche Live-Region / `role="status"`.
4. **Dringend und nicht an ein Control gebunden** (Formular-Fehler,
   Session laeuft ab): `role="alert"`.

| Mechanismus | Hoeflichkeit | Wofuer |
|---|---|---|
| `role="status"` (= `aria-live="polite"` + `aria-atomic="true"`) | Wartet auf eine Pause | Toasts, "Gespeichert", Ergebniszahlen, Lade-Updates |
| `role="alert"` (= `aria-live="assertive"` + `aria-atomic="true"`) | Unterbricht sofort | Nur Fehler und dringende Probleme |

- Fuer **wiederholte** hoefliche Updates eine **stabile leere Region** im DOM
  halten und nur ihren Text aendern. Eine neue Region samt Inhalt einzufuegen
  wird uneinheitlich gemeldet.
- Dynamisch eingefuegte `role="alert"`-Inhalte werden meist gemeldet, aber das
  Verhalten schwankt — nur fuer dringende, nicht control-gebundene Fehler nutzen
  und mit den Ziel-Browser/Screenreader-Kombinationen testen.
- Default ist **polite**. `assertive` zu ueberstrapazieren ist der haeufigste
  Live-Region-Fehler.
- Nachrichten kurz und in sich verstaendlich halten; `aria-atomic="true"` liest
  die ganze Region neu vor.
- **Fokus nicht auf einen Toast bewegen** — melden und den Fokus dort lassen, wo
  gearbeitet wird. Toasts brauchen grosszuegigen Timeout oder Schliessen-Knopf,
  und nie den einzigen Weg zu einer Aktion enthalten.

Fuer Ladezustaende: `aria-busy="true"` auf die aktualisierende Region,
"Laedt …" hoeflich melden, danach das Ergebnis ("Geladen, 12 Ergebnisse").

### Visuell verstecken (`.sr-only`)

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
```

`1px`-Boxen statt `0` — manche Screenreader ueberspringen Elemente ohne Groesse.
`white-space: nowrap` verhindert, dass Woerter als eine zusammenhaengende Kette
gelesen werden. **Nie** `display: none` oder `visibility: hidden` dafuer — beide
entfernen den Inhalt komplett aus der Assistenztechnik. Tailwind liefert das als
`sr-only`; fuer Skip-Links eine Fokus-Variante ergaenzen (`focus:not-sr-only`).

`aria-hidden="true"` entfernt ein Element **samt Teilbaum** aus der
Assistenztechnik — fuer dekorative Icons und visuell duplizierten Inhalt. Nie auf
(oder ueber) einem fokussierbaren Element; wer etwas Interaktives versteckt, muss
es auch aus der Tab-Order nehmen.

## 13. Alt-Text nach Zweck

Nach **Zweck** waehlen, nicht danach, wie das Bild aussieht:

| Zweck | Alt | Beispiel |
|---|---|---|
| Dekorativ oder redundant zum Text daneben | `alt=""` (leer, aber vorhanden) | Logo neben dem ausgeschriebenen Firmennamen |
| Informativ | Die **Bedeutung** beschreiben, die es ergaenzt | `alt="Ticket-QR-Code"` |
| Funktional (Bild ist der Link/Button) | Die **Aktion** oder das Ziel beschreiben | Lupen-Icon -> `alt="Suchen"`, nicht `alt="Lupe"` |
| Bild von Text | Exakt der Text (besser: echter Text) | `alt="50 % auf alles"` |
| Komplex (Chart, Diagramm) | Kurzzusammenfassung im `alt`, volle Daten als Tabelle/Text daneben | `alt="Umsatz nach Quartal, unten beschrieben"` |

Ein **fehlendes** `alt`-Attribut ist schlimmer als ein leeres — Screenreader
lesen sonst den Dateinamen vor.

**SVG:** Dekorativ -> `aria-hidden="true"` + `focusable="false"` (letzteres fuer
altes Edge/IE), kein Titel noetig. Bedeutungstragendes Inline-SVG ->
`role="img"` plus `aria-label="…"` (oder `<title>` als erstes Kind, referenziert
per `aria-labelledby`). Einfache Faelle: `<img src="icon.svg" alt="…">` ist die
zuverlaessigste Auslieferung.

**Video/Audio:** Aufgezeichnetes Video braucht Untertitel, Audio braucht
Transkripte. Nie mit Ton automatisch abspielen, immer Bedienelemente rendern.

## 14. Struktur ist Navigation

- **Ein** sichtbares primaeres `<main>`-Landmark. `<header>`, `<nav>`, `<aside>`,
  `<footer>` mappen auf Landmarks, zwischen denen Screenreader-Nutzer springen.
- Mehrere Landmarks desselben Typs brauchen unterscheidende Labels:
  `<nav aria-label="Hauptnavigation">`, `<nav aria-label="Breadcrumbs">`.
- Ueberschriften beschreiben ihre Abschnitte und bilden eine schluessige
  Gliederung. Eine `<h1>` pro Seite und sauber verschachtelte Ebenen sind der
  **empfohlene Default**, keine eigenstaendigen WCAG-Pass/Fail-Regeln — ohne
  konkrete Navigations- oder Verstaendnisfolge nicht als Fehler melden.
  Ueberschriften sind Struktur, nicht Styling: eine Ebene per CSS stylen, statt
  das Tag nach Groesse zu waehlen.
- `<title>` passt zum aktuellen Kontext, Spezifischstes zuerst:
  `Rechnungen · Einstellungen · Acme`.
- Skip-Link als erstes fokussierbares Element, siehe oben.

## 15. Zoom und Textvergroesserung ueberleben

- **200 % Zoom** (WCAG 1.4.4): aller Inhalt und alle Funktionen muessen bei auf
  200 % skaliertem Text funktionieren. Zoom nie blockieren: kein
  `user-scalable=no`, kein `maximum-scale=1`. Safari ignoriert die Sperre, jeder
  andere Browser erzwingt sie.
- **Reflow bei 320px** (WCAG 1.4.10): bei 400 % Zoom auf einem 1280px-Viewport
  (entspricht 320px Viewport) muss die Seite mit **nur vertikalem** Scrollen
  funktionieren — kein zweidimensionales Scrollen ausser bei echt
  zweidimensionalem Inhalt (Tabellen, Karten, Code-Bloecke), das dann im eigenen
  Container scrollt.
- Feste Hoehen brechen unter Zoom: `min-height` auf allem mit Text, Container
  wachsen lassen.

### rem vs. px

Zuerst der Codebase folgen: sizet das Projekt in `px` (oder einer etablierten
Tailwind-Skala), dabei bleiben — keine gemischten Einheiten in ein fremdes
System einschleppen. Wo die Wahl besteht (neuer Code oder Codebase schon auf
`rem`): `rem` respektiert die Basis-Schriftgroesse des Nutzers, `px` ignoriert
sie.

| `rem` nutzen | `px` nutzen |
|---|---|
| `font-size` | Borders und Haarlinien |
| `max-width` von Textcontainern | Fokus-Outline-Breite und -Offset |
| Media-Query-Breakpoints (`@media (min-width: 48rem)`) | `box-shadow`-Details |
| Abstaende, die mit dem Text skalieren sollen | Deko in fester Groesse |

Am meisten zaehlt die Wahl bei **Breakpoints**: bei groesserer Basisschrift
schaltet eine `em`/`rem`-Query aufs Mobil-Layout, wenn der Text es braucht — eine
`px`-Query nicht.

## Common Mistakes

| Fehler | Fix |
|---|---|
| `outline: none`, um den Fokusring zu entfernen | Stattdessen `:focus-visible` stylen; Mausklicks zeigen ihn ohnehin nicht |
| Eigene Fokusfarbe als "wird schon passen" angenommen | Vollen Indikator gegen jede angrenzende Farbe und in Forced-Colors pruefen |
| `<div onClick>` als Button oder Link | `<button>` fuer Aktionen, `<a href>` fuer Navigation |
| Placeholder als einziges Label | Sichtbares `<label for>` ergaenzen — Placeholder verschwinden beim Tippen |
| Positiver `tabindex`, um die Fokusreihenfolge zu reparieren | DOM-Reihenfolge korrigieren; nur `0` und `-1` nutzen |
| Wiederholtes hoefliches Update wird unzuverlaessig gemeldet | Stabile leere Status-Region halten und nur den Text aendern; Ziel-Screenreader testen |
| `assertive`-Live-Region fuer einen Routine-Toast | `polite` nutzen; `assertive` fuer Fehler reservieren |
| `aria-hidden="true"` auf einem fokussierbaren Element | Entfernen oder das Element nicht fokussierbar machen |
| Funktionales Icon-Alt beschreibt das Bild | Die Aktion beschreiben: `alt="Suchen"`, nicht `alt="Lupe"` |
| `maximum-scale=1` gegen iOS-Input-Zoom | 16px Input-Schrift auf Mobil (siehe `typografie.md`); Zoom nie blockieren |
| Submit deaktiviert, bis das Formular gueltig ist | Aktiviert lassen, beim Absenden validieren, ersten Fehler fokussieren |

## Review-Output-Format

Nur nutzen, wenn ein eigenstaendiges A11y-Review verlangt ist. Befunde nach
Prinzip gruppieren, je Prinzip eine Markdown-Tabelle mit **Severity**,
**Location**, **Before**, **After**, **Why** — nie getrennte
"Before:"/"After:"-Zeilen.

- **Severity**: `HIGH` verhindert eine Aufgabe, versteckt Inhalt vor
  Assistenztechnik oder erzeugt einen systemischen A11y-Ausfall · `MEDIUM` macht
  eine Interaktion spuerbar schwerer · `LOW` ist punktueller Feinschliff.
- **Location**: `pfad/zur/datei:zeile`; ohne Quelldateien exakter Screen +
  Komponente.
- Wiederkehrendes Systemproblem in **eine** Zeile konsolidieren und alle
  betroffenen Stellen auflisten. Prinzipien ohne Befund weglassen.

Danach:

1. **Verification** — welche Checks liefen mit welchem Ergebnis, inkl.
   Tastatur-Durchlauf, Pruefung der zugaenglichen Namen und, wo zutreffend,
   Screenreader- oder automatisierte Checks. Nicht gelaufene Checks als offen
   benennen.
2. **Verdict** — `Block` bei verbleibendem `HIGH`, `Needs changes` bei nur
   `MEDIUM`/`LOW`, `Approve` nur ohne offene Befunde.

Keine Befunde: Tabellen weglassen, "Keine belastbaren A11y-Befunde" schreiben,
Verification berichten, mit `Approve` enden.

## Review-Checkliste

- [ ] Jeder Flow ist ohne Maus komplett durchfuehrbar
- [ ] Jedes Control meldet Name, Rolle und Zustand
- [ ] `:focus-visible` sichtbar, mind. `2px`, nie `outline: none` ohne Ersatz
- [ ] Native Elemente statt `<div onClick>`; kein redundantes ARIA
- [ ] Modals: `inert` im Hintergrund, Fokus rein beim Oeffnen, zurueck zum Trigger
- [ ] Kein positiver `tabindex`; Composite-Widgets mit Roving Tabindex
- [ ] Hit-Areas mind. 24×24px (WCAG AA), Ziel 44×44 Touch / 40×40 Desktop
- [ ] Erweiterte Hit-Areas ueberlappen sich nirgends
- [ ] Jedes Input hat ein echtes Label; Placeholder ist kein Label
- [ ] `autocomplete` + korrekter `type`/`inputmode` gesetzt
- [ ] Fehler: `aria-invalid` + `aria-describedby`, erstes Fehlerfeld fokussiert
- [ ] Submit bleibt aktiviert bis zum Request
- [ ] Icon-only-Buttons haben `aria-label`, Icon `aria-hidden="true"`
- [ ] Status nie nur ueber Farbe
- [ ] Motion in `prefers-reduced-motion: no-preference` gewickelt
- [ ] Autoplay >5s hat sichtbare Pause; Toasts mit Aktion laufen nicht ab
- [ ] Live-Regionen: `role="status"` als Default, `role="alert"` nur dringend
- [ ] Alt-Text nach Zweck; kein fehlendes `alt`
- [ ] Ein `<main>`, schluessige Ueberschriften-Gliederung, Skip-Link
- [ ] 200 % Zoom und 320px-Reflow funktionieren, kein `user-scalable=no`
