<!-- Private research origin: /root/skill-workspace/skill-updates/2026-09-07-web-design-depth/research/shadcn/REPORT.md; images/code remain outside the skill. -->

# shadcn/ui: Komponentenverträge statt neutralem Standardlook

Stand: 07.09.2026. Autor: Teammitglied shadcn. Zweck: Quellenmaterial für die gestagte Vertiefung des web-Skills; keine Änderung am Live-Skill, kein Einbau, keine Publikation. Bestehende `web/references/component-islands.md` und `dependencies.md` gelesen; deren Astro-/Portal-/Fallback-Verträge bleiben kanonisch.

## Ergebnis und Evidenzgrenze

shadcn ist besonders nützlich als inspizierbarer Baukasten aus Anatomie, semantischen Tokens, Varianten und zustandsabhängigen Styles. Die sichtbare neutrale Docs-Gestaltung ist kein Kunden-Designsystem. Die aktuelle Dokumentation unterscheidet **Base UI, React Aria und Radix UI**; `/docs/components/button` leitete beim Abruf auf `/docs/components/base/button` um. Den Primitive-Typ und Style deshalb an jede Rezeptquelle binden. Bestehende Radix-Proben im web-Skill bleiben gültige, versionsgebundene Proben; daraus folgt keine universelle Radix-Abhängigkeit aller heutigen shadcn-Komponenten.

Evidenzarten: **Sicht** = Screenshot selbst betrachtet; **DOM/Messung** = gerenderte Attribute bzw. getComputedStyle; **Quelle** = aktuelle offizielle Dokumentation/Code; **Ableitung** = empfohlene Übertragung, keine getestete Integration.

Eigener Browser-Tab `tab_9`, 1280×800, bestehende dunkle Darstellung. Button, Field, Card und offener Dialog visuell betrachtet. Keine Anmeldung, Bestellung, Speicherung oder Formularübermittlung. Ein ungültiger Emailwert wurde lokal gesetzt und mit `checkValidity()/reportValidity()` ohne Submit geprüft. Tastaturversuche über t3 lieferten Erfolgsmeldungen, änderten jedoch weder bei Enter noch Tab/Escape den Zustand; deshalb **keine bestandene Tastaturprüfung**. Ein unabhängig erzeugter VPS-Browsertab scheiterte am Navigation-/Locator-Timeout. Beim späteren Menü-Öffnungsversuch meldete t3 „No preview automation host is available“. Menü und Table sind nachfolgend nur quellengestützt, keine behauptete Interaktionsabnahme.

## Quellen und lokale Belege

| Inhalt | Offizielle Quelle | Lokale Evidenz |
|---|---|---|
| Button, Base UI | https://ui.shadcn.com/docs/components/base/button | `button.md`, `button.png`, DOM-Messwerte unten |
| Dialog, Base UI | https://ui.shadcn.com/docs/components/base/dialog | `dialog.md`, `dialog-open.png`, Fokus/ARIA unten |
| Field | https://ui.shadcn.com/docs/components/base/field | `field.md`, `field.png` |
| Card | https://ui.shadcn.com/docs/components/base/card | `card.md`, `card.png`, `card-invalid.png` |
| Dropdown | https://ui.shadcn.com/docs/components/base/dropdown-menu | `dropdown-menu.md`; geschlossener Trigger im DOM gesehen |
| Table | https://ui.shadcn.com/docs/components/base/table | `table.md`, nur Quelle |
| Theming | https://ui.shadcn.com/docs/theming | `theming.md`, `theming.html` |
| Historische/alternative Registry-Familie | https://ui.shadcn.com/r/styles/new-york-v4/button.json | `radix-button.json`; liefert radix-ui-Abhängigkeit, nicht Base-Implementierung |

Die `.md`-Dateien stammen jeweils vom identischen offiziellen URL mit `.md`-Suffix; sie enthalten auch vollständige Demoquellen. Abrufdatum bindet bewegliche URLs, kein behaupteter Git-Commit-Pin. Relevante Originalquellen wurden lokal archiviert; für produktive Übernahme Lizenz und konkrete installierte Version dokumentieren.

## 1. Button: Betonung, Semantik und Zustand getrennt halten

**Sicht/DOM:** Der erste Outline-Button misst 32px hoch, 10px horizontalen Innenabstand, 10px Radius; Schrift Geist 14px/20px, Gewicht 500. Das Icon daneben hat eine eigene kompakte Schaltfläche. Das sind Werte der aktuellen Docs-Vorschau, kein universeller Touch-Standard.

**Quelle/DOM:** Gemeinsame Klassen enthalten `inline-flex`, `shrink-0`, `items-center`, `justify-center`, `whitespace-nowrap`, `outline-none`, `focus-visible:border-ring`, einen 3px-Fokusring mit `ring/50`, `disabled:pointer-events-none`, `disabled:opacity-50` und `aria-invalid`-Styles. SVGs sind nicht selbst pointeraktiv, schrumpfen nicht und erhalten ohne explizite Größe 16px. `data-icon="inline-start"` beziehungsweise `inline-end` steuert die asymmetrische optische Einrückung. Default, outline, secondary, ghost, destructive und link sind Betonungsvarianten; xs/sm/default/lg und Icongrößen bilden eine separate Größenachse.

Der aktuelle aktive Press-Zustand verschiebt um 1px, **ausgenommen Controls mit aria-haspopup**. Ein Menütrigger benötigt somit nicht blind dieselbe Bewegung wie ein normaler Aktionsbutton. Outline ändert bei `aria-expanded` seine Oberfläche; der offene Zustand ist ein eigener Vertrag, kein Hover-Ersatz.

**Quelle, besonders relevant:** Die Base-Docs warnen explizit vor `<Button render={<a />} nativeButton={false} />` als Link: Base Button setzt `role="button"` und überschreibt die Linksemantik. Für Navigation einen echten `<a>` mit `buttonVariants(...)` verwenden. Radix `asChild` und Base `render` sind keine austauschbaren Codefragmente. Ein visuell als Link gestalteter Button bleibt semantisch ein Button.

**Ableitung:** In DESIGN.md pro Aktion Zweck, Element (`a`/`button`), Betonung, Größe, Iconposition und Zustände festhalten. Eine Kunden-CTA darf größer sein als die 32px-Docs-Probe. `whitespace-nowrap` nicht übernehmen, wenn längere deutsche Labels auf schmalen Screens kollidieren. Loading erfordert neben Spinner einen lesbaren Status, passende Busy-/Disabled-Semantik und Verhalten bei Fehler/Retry; die Spinner-Demo allein erfüllt keinen Submitvertrag. Die aktuelle Tailwind-v4-Doku erklärt `cursor:default`; einen Pointer bewusst als Produktentscheidung setzen, nicht als vermeintlichen Bug korrigieren.

## 2. Field: Layoutfamilie ist noch keine Formularlogik

**Sicht:** Field-Demo gruppiert Name/Kartennummer, kurze Hilfestellung, Dreierspalte Month/Year/CVV und eine getrennte Billing-Section. Label bleibt außerhalb des Feldes. Die Demo ist keine Freigabe, Payment-Copy oder Sicherheitsbehauptungen auf eine Kundenseite zu übertragen.

**Quelle:** Anatomie `FieldSet > FieldLegend + FieldDescription + FieldGroup > Field`; einzelnes Field enthält Label, Control, Description, Error. `FieldContent` ist ein optionaler Flex-Wrapper für Label/Beschreibung neben einem Control. `orientation=vertical|horizontal|responsive` ist eine Layoutentscheidung; `FieldGroup` nutzt Container Queries, somit hängt die Anordnung von der verfügbaren Komponentenspalte ab, nicht nur vom Browserviewport. Auswahlkarten entstehen durch einen umfassenden FieldLabel und echte Radio-/Checkbox-/Switch-Controls.

**DOM:** Name/Card Number besitzen echte `label for` / `input id`-Bindungen. In der inspizierten Kartennummer-Demo existiert Hilfetext, der Input hat aber kein `aria-describedby`. Ein bloßes `role=group` erzeugt keinen zugänglichen Gruppennamen und ersetzt diese Verknüpfungen nicht. Die pauschale Formulierung der Docs zur Label-Vererbung nicht als Accessibility-Beweis übernehmen.

**Quelle:** Fehler benötigt drei separate Teile: Wrapper `data-invalid`, Control `aria-invalid`, `FieldError` unmittelbar am Feld; mehrere Error-Objekte können als Liste erscheinen. DOM der Field-Wrapper verwendet den spezifischen Selektor `data-[invalid=true]`; beim eigenen Code die tatsächlich erzeugte Attributform prüfen. Quellenbeispiele mit booleschem Prop erzeugen via React die richtige Form; handgeschriebenes nacktes `data-invalid` darf nicht ungeprüft als identisch gelten.

**Ausgeführte Probe:** In der Card-Login-Demo Email lokal auf `invalid` gesetzt. `checkValidity()=false`, `validity.typeMismatch=true`, `reportValidity()=false`, `aria-invalid=null`. Screenshot zeigt normalen Input und keinen styled FieldError. Browsernative Validität aktiviert die shadcn-Fehlerdarstellung nicht automatisch. Keine Servervalidierung, Formularzustellung oder echte React-Form-Library getestet.

**Ableitung:** Feldrezept ergänzt eine State-Matrix: leer → Eingabe → Validierungszeitpunkt → ungültig mit konkreter Korrektur → erneute Eingabe → gültig → Absenden → Erfolg/Serverfehler. IDs für Hilfe/Fehler und `aria-describedby` explizit verdrahten; Werte bei Serverfehler erhalten. Die Klassen nicht mit Zod/React Hook Form oder Zustellung verwechseln. Für einfache Webseiten reichen echte HTML-Formcontrols plus vorhandener nativer Formvertrag; komplexer geteilter Zustand kann eine zusammenhängende React-Insel rechtfertigen.

## 3. Dialog: Overlaygeometrie und Fokus sind ein Paket

**Sicht:** Dialog liegt mittig über abgedunkelter, weichgezeichneter Seite. Header mit Titel und zweizeiliger Beschreibung; Felder vertikal; abgesetzter Footer enthält Cancel und primäre Save-Aktion. Close ist oben rechts und optisch leiser. `dialog-open.png` zeigt den Fokusring des ersten Felds.

**DOM/Quelle:** Klick auf Open Dialog öffnete die Komponente und fokussierte Input `name-1`. Popup `role=dialog`, `tabindex=-1`, `aria-labelledby` auf echtes h2 und `aria-describedby` auf den Beschreibungstext. Close besitzt versteckten Text „Close“. `data-open`/`data-closed` steuern Animationen. Geometrie: `fixed`, top/left 50%, Translation -50%, `max-w:calc(100%-2rem)`, ab sm maximal `max-w-sm`; Gridgap 16px, Padding16px, `rounded-xl`, `bg-popover/text-popover-foreground`, z50, Ring foreground/10. Animation in dieser Variante 100ms, Fade plus Zoom von 95%. Footer benutzt negative Außenabstände entsprechend Popup-Padding und `flex-col-reverse` bis sm, dann Zeile rechtsbündig. Damit ist die mobile Aktionsreihenfolge Teil des Rezepts.

**Nicht belegt:** Escape, Fokusfalle, Shift-Tab, Rückkehr zum Trigger, Scroll-Lock und Reduced Motion aufgrund Toolgrenze. Diese bleiben Pflichtpunkte bei produktiver Integration, nicht behauptete Fehler der Quelle. `showCloseButton=false` ist eine angebotene Variante, kein Anlass, Nutzern ohne geprüften alternativen Ausgang den Dialog aufzuzwingen.

**Ableitung:** Bei Einbau über Astro Trigger, Root, Popup, Zustand und Provider in eine Insel; Tokens müssen den Portalpfad erreichen. Vorhandenes component-islands.md enthält bereits diese Architektur und darf nicht dupliziert werden. Das neue Rezept ergänzt die konkrete Anatomie, mobile Footerreihenfolge und State-Evidenz. Wichtiges Kontaktformular bekommt weiterhin eine direkt nutzbare HTML-Route, auch wenn ein JS-Dialog als Komfortoberfläche existiert.

## 4. Card und Table: Struktur erst, Interaktion optional

**Sicht/DOM Card:** Container mit Header (Titel, Beschreibung, rechtsbündige Zusatzaktion), Content, abgesetztem Footer. Aktuelles `CardTitle` rendert in der Probe einen **div**, kein Heading. Semantisch benötigte Überschriften muss die Seite bewusst ergänzen. Root `overflow-hidden`, 14px Radius; Default 16px Zwischenraum und oberes Padding, Small 12px. Footer entfernt rootseitiges Bottom-Padding und setzt eigenes Inset.

**Quelle:** `--card-spacing` ist gemeinsame Quelle für Gap, vertikales Padding und horizontale Insets. Default `--spacing(4)`, Small `--spacing(3)`. Negative Margins auf exakt derselben Variable erlauben randfüllenden Inhalt ohne versetzte Kanten. Header nutzt Grid, `1fr auto` bei CardAction und zwei Zeilen bei Description; Action liegt in Spalte2 über beiden Zeilen. Das ist eine übertragbare Ausrichtungsregel, nicht einfach „runde Box mit Schatten“.

**Ableitung:** Einheitliche Insets statt separaten Zufallswerten; statische Leistungskarten als HTML/SSR ohne Clientruntime. Kein gesamter Card-Container als Button, wenn darin mehrere Links/Buttons liegen. Card-Überschrift in die reale Headinghierarchie einfügen; keinen künstlichen Kartenrahmen um jeden Absatz erzeugen.

**Quelle Table (nicht visuell geprüft):** TableCaption, TableHeader/Head, Body/Row/Cell, optional Footer. Zahlen rechtsbündig; Textstatus bleibt ausgeschrieben. Die Quelle unterscheidet einfache Table von Data Table mit TanStack-Sortierung/Filter/Pagination. Zeilenaktionen verwenden einen benannten Iconbutton und Dropdown, destruktive Aktion separat. **Ableitung:** Einfache Preis-/Leistungstabelle braucht keine React-State-Library; horizontales Überlaufen und Kopfzellenbeziehungen gezielt prüfen. Ein sortierbares Datengitter erhält dagegen echte Sortierbuttons, Zustand und `aria-sort`; diese Funktion nicht aus bloßer Tabellenoptik ableiten.

## 5. Menü: Aktionsgruppen und Auswahlzustand sauber komponieren

**Quelle, Interaktion nicht abgenommen:** Root → Trigger → Content → Groups mit Labels/Items/Separators. Submenü hat eigenen SubTrigger und SubContent im Portal; CheckboxItems zeigen unabhängige Optionen, RadioGroup genau eine Auswahl. Demo verwendet `@base-ui/react`, `render={<Button .../>}`, `align=start`; Tabellenaktionen verwenden `align=end`.

**Ableitung:** Menülabel, Shortcuttext und Icon sind verschiedene Slots. Eine angezeigte Tastenkombination implementiert keinen globalen Shortcut. Native Navigation nicht unbesehen als Aktionsmenü modellieren. Vor Übernahme testen: Tastatur öffnen, Pfeilnavigation, disabled überspringen, Home/End, Submenu rechts/links, Escape und Fokusrückgabe; mobile Randkollision, langer deutscher Text und Portaltokens ebenfalls. Keine destruktive Demoaktion für eine Sichtprüfung auslösen.

## 6. Konkrete Tokenrezepte für den web-Skill

**Quelle:** Theming empfiehlt CSS-Variablen und `tailwind.cssVariables:true`. Semantische Paare: background/foreground, card/card-foreground, popover/popover-foreground, primary/primary-foreground, secondary/secondary-foreground, muted/muted-foreground, accent/accent-foreground; zusätzlich destructive, border, input, ring. Diese Rollen machen Seiten-CSS und Insel-CSS konsistent. Dark setzt dieselben Namen neu; keine zweite unabhängige Farbpalette im Widget.

Aktuelle Quellenwerte als dokumentiertes **Neutral-Beispiel**, nicht Kundenrezept:

| Rolle | Light | Dark |
|---|---|---|
| background | oklch(1 0 0) | oklch(0.145 0 0) |
| foreground | oklch(0.145 0 0) | oklch(0.985 0 0) |
| primary | oklch(0.205 0 0) | oklch(0.922 0 0) |
| primary-foreground | oklch(0.985 0 0) | oklch(0.205 0 0) |
| muted-foreground | oklch(0.556 0 0) | oklch(0.708 0 0) |
| border | oklch(0.922 0 0) | oklch(1 0 0 / 10%) |
| input | oklch(0.922 0 0) | oklch(1 0 0 / 15%) |

Aktuelle Radiusableitung: Basis `--radius:0.625rem`, sm×0.6, md×0.8, lg×1, xl×1.4, 2xl×1.8, 3xl×2.2, 4xl×2.6. Ältere additive „radius minus 4px“-Rezepte nicht mit dieser Familie vermischen. 10px Basis erklärt gemessene 10px Buttons und 14px Cards.

**Ableitung als neuer Skillinhalt:**

1. Aus freigegebener Kundenreferenz Flächen/Text/Brand/Error/Focus bestimmen; als Rollenpaare ins bestehende DESIGN.md, nicht Hexwerte ohne Verwendung.
2. Ein gemeinsames CSS-Tokenfile anlegen; benötigte shadcn-Rollen an Kundentokens binden und in Tailwind via `@theme inline { --color-primary:var(--primary); ... }` exponieren. Plain CSS konsumiert dieselben `var(...)`.
3. Komponentengeometrie mit wenigen spezifischen Variablen verbinden, etwa `--card-spacing`; State-Selektoren bleiben an realen ARIA-/data-Attributen. Radius, Dichte und Schrift dürfen von der neutralen Demo abweichen.
4. Drei konkrete Träger gemeinsam prüfen: eine Hauptaktion, ein Formularfeld mit Fehler/Fokus, eine schwebende Fläche. Dadurch fällt eine nur am Inselwrapper gesetzte Themegrenze auf.
5. Erst bei passender Nutzung zusätzliche chart/sidebar-Tokens aufnehmen. Für neue Statusrollen beide Vorder-/Hintergrundfarben definieren und Kontrast am echten Render messen; OKLCH allein garantiert keinen ausreichenden Kontrast.

## Integrationsempfehlung ohne Doppelung

Neue Referenz `component-recipes.md` oder eigener shadcn-Abschnitt sollte auf **bestehendes component-islands.md** verweisen und ausschließlich folgende Vertiefung hinzufügen: Primitive-/Style-/Versionsbindung; Anatomy + Slotgeometrie; semantische Link/Button-Grenze; State-Matrix; konkrete Tokenzuordnung; belegt versus abgeleitet. Der bestehende Astro-Weg muss nicht noch einmal erklärt oder umgesetzt werden.

Kurzform des Rezeptdatensatzes: Quelle/Datum/Primitive/Style → sichtbares Ziel → Anatomy → reale Tags/ARIA → Rollen-Tokens und Geometrie → Default/Hover/Focus/Expanded/Invalid/Disabled/Loading → HTML/SSR oder zusammengehörige Insel → nötige Tests → Evidenzgrenzen. Mit diesem Datensatz kann shadcn als präziser Implementierungsbaustein dienen, während Refero/Mobbin/Kundenmaterial die gestalterische Richtung liefert.

Beobachtungslog: Session-Start-Protokoll ausgeführt, letzte Review 07.09.2026, passende offene Einträge bei gezielter task-observer/web-Abfrage keine. Keine neue Observation geschrieben: Ergebnisse gehören direkt in den beauftragten Forschungs-/Stagingumfang; Browsertoolgrenze dokumentiert als Evidenzgrenze, keine zusätzliche Skillbehauptung.
