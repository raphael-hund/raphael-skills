# Qualitätsnachweise nach Auftrag

Wähle vor der Prüfung die verlangten Eigenschaften und betroffenen Routen,
Ansichten oder Funktionen. Eine Vorschau darf ausdrücklich provisorische
Inhalte enthalten. Bereits verlangtes Verhalten wird auch in der Vorschau
geprüft. Veröffentlichung ergänzt die tatsächlichen Produktionsanforderungen.

## Eigenschaften und Belege

| Eigenschaft | Passender Nachweis | Aussagegrenze |
|---|---|---|
| Inhalt und Voice | Verwendeter Text, Kundenabsprachen, VOICE und benannte Quellen | Ein sichtbarer Claim beweist seine Wahrheit nicht. |
| Darstellung | Jede Sektion im Umfang tatsächlich ansehen, einschließlich ihrer relevanten Hover-/Fokuszustände; mit Referenz und Nachbarsektionen vergleichen | Ein Bild beweist weder Bedienung noch Datenübermittlung. |
| Bedienung | Konkrete Aktion mit erwartetem und tatsächlichem Ergebnis | DOM-Veränderung allein ist noch kein richtiges Verhalten. |
| Übermittlung | Request-Inhalt, Response, UI-Zustand und kontrollierter Speicher-/Empfangsnachweis | Ein Mock prüft den Frontendvertrag, keine echte CRM-Zustellung. |
| Bewegung | Laufzeit am betroffenen Element, normale und reduzierte Bewegung | Quelltextmuster oder stabilisierte Shots beweisen keine Wirkung. |
| Barrierefreiheit | Passende automatische Regeln plus tatsächliche Tastatur-/Fokus-/Reflow-Prüfung | axe allein beweist keine vollständige WCAG-Konformität. |
| Technik | Vorhandene Build-/Typ-/Lint-/Integrationstests, relevante Links, Assets und On-Page-Prüfungen | Syntax-PASS ist kein Funktions-PASS. |
| Regression | Diff und erneut geprüfte betroffene Funktionen/Shared-Konsumenten | Unverlangte Nebenänderungen werden nicht durch bessere Gestaltung ausgeglichen. |

Visuell, funktional und Regression bleiben getrennte Ergebnisse. Gesamt-PASS
setzt alle **anwendbaren** verlangten Ergebnisse voraus. `FAIL`, `BLOCKED`,
`NOT_RUN` und begründetes `N/A` sind unterscheidbar. N/A bezieht sich auf genau
die betreffende Anforderung; eine fremde Route oder ein anderes Target deckt
keine Prüflücke. Plan-only und Inspiration benötigen keine Build-Receipts.

## Prüfstand und Identität

Prüfe die tatsächlich ausgelieferte Revision, Basis-URL, Routen und Zustände.
Bei geändertem Build sind alte G1-, Capture-, Funktions- und Ship-Belege ungültig.
`run-evidence-contract.md` beschreibt die maschinelle Zusammenführung.

```bash
node /root/raphael-skills/skills/eigene/web/scripts/g1-gate.mjs   --base <url> --routes <routen> --src <projekt> --build <build>   --out <run-out>/g1 --run-id <run-id> --build-revision <revision>
```

Der G1-Checkumfang muss zum Auftrag passen. Ein grüner technischer Teilcheck
wird nicht als erfolgreiche fachliche Nutzerreise ausgegeben. Testfehler und
fehlende Umgebung bleiben offen, auch wenn andere Checks bestanden haben.

## Darstellung und Gestaltung

Den aktuellen Build tatsächlich ansehen. Bei einer ganzen Seite oder Site gilt
**jede Sektion jeder beauftragten Route**, einschließlich Footer und wiederholter
Bausteine. Bei lokalem Fix gelten dessen Fläche, Übergänge zu Nachbarsektionen
und betroffene gemeinsame Konsumenten. Die vorhandene Route-/Sektionsliste aus
Plan oder Code mit dem gerenderten Stand abgleichen; ungesichtete Bereiche bleiben
ungeprüft. Fehlende Liste im bestehenden Prüfbericht ergänzen.

Auf drei Ebenen prüfen:

- **Sektion:** Hierarchie, Textlesbarkeit, Bildmotiv/-schnitt/-auflösung, Balance,
  Abstände sowie ruhende und bediente Zustände der vorhandenen Komponenten.
- **Seite:** Tatsächliche Inhaltskanten, Text-/Bildbreiten, Spaltenausrichtung,
  vertikalen Rhythmus, Oberflächen, Typografie und Übergänge aufeinander beziehen.
  Gleiche `max-width`-Tokens genügen nicht: innere Paddings, Grid-Spalten und
  lokale Overrides können den sichtbaren Inhalt trotzdem versetzen.
- **Site:** Seiten bei gleichen Viewports nebeneinander vergleichen: Breiten,
  Schriftrollen, Buttons, Bildsprache, Navigation und Footer sollen einem
  erkennbaren System folgen. Bewusste Full-Bleed-Flächen, schmale Lesespalten
  und wechselnde Layouts sind zulässig; unbeabsichtigte Sprünge sind Befunde.

Desktop und Mobil je Sektion abdecken. 1440×900 und 390×844 sind mögliche
Vergleichsdefaults, keine vollständige Responsive-Abnahme. Reflow bei 320
CSS-Pixeln und betroffene Zwischenbreiten prüfen. `screenshot-kritik-loop.md`
beschreibt Aufnahme und tatsächlichen Bildzugriff; vollständige Flächenabdeckung
ist keine feste Screenshotquote.

Die vorhandenen Designscanner bleiben Teilprüfungen:
`/root/raphael-skills/skills/design/scripts/detect.mjs` sowie
`scan-ai-slop.mjs --json`; bei deutschem Text `--rules=…/rules.de.mjs`.
Beim Slopscanner Ergebnisse aus `hits` triagieren, nicht nur Exit 0 lesen.
Ein bewusst gewähltes Kundenmuster ist nicht durch einen generischen Treffer widerlegt.

Assets vor Verwendung auf Motiv, Kanten, Auflösung und tatsächliche Herkunft
prüfen; anschließend im Seitenkontext. Aktuelle Asset-/Motiv-Neins gelten für
ihren benannten Umfang. `visual-aaa` liefert bei zusätzlichem visuellem
Prüfbedarf einen wiederverwendbaren Beleg, keinen zweiten Gesamtabschluss.

## Konkrete Nutzerwege

Für Navigation, Menü, Dialog oder Tastaturweg: Ausgangszustand → Handlung →
erwarteter Zustand → Rückweg. Fokus, Accessible Name, relevante ARIA-Zustände
und Escape-Verhalten am tatsächlichen betroffenen Target prüfen. Ein Screenshot
eines offenen Menüs belegt nicht, dass es sich öffnen oder schließen lässt.

Bei Ganzseitenabnahme interaktive Komponenten und ihre unterschiedlichen Varianten
aus DOM und Code erfassen: Buttons/Links, Karten, Menü, Accordion, Tabs, Carousel
und vorhandene weitere Controls. Je Variante Hover und Tastaturfokus ansehen,
Aktivierung und Rückweg bedienen; nur tatsächlich hoverfähige Geräte verlangen
Hover, Touch braucht einen vollständigen eigenen Weg. `--hover` prüft nur die
genannten Selektoren, `--states` nur die deklarierte State-Spec.

Alle Linkziele im Umfang auflösen: interne Routen und Anker, externe Ziele,
Downloads sowie `mailto:`/`tel:`. HTTP-Erreichbarkeit allein beweist weder das
richtige Ziel noch einen bedienbaren Link. Primäre Wege und unterschiedliche
Linkvarianten tatsächlich anklicken; kein unbeabsichtigter Submit oder Tracking-
Overlay darf sie blockieren. Externe Dienste ohne Zugriff bleiben benannt ungeprüft.

Formularabnahme: gültige Absendung, Validierungsfehler und technische Ablehnung
mit verständlicher Recovery. Anzahl und Inhalt der Requests, Response und
Erfolgsmeldung gegeneinander prüfen; Fehler dürfen keinen UI-Erfolg vortäuschen.
`formular-check.mjs` prüft Feldstruktur und Bedienungsdetails; ohne zusätzlichen
Szenarionachweis ist eine Absendung **nicht geprüft**. Echte Zustellung nur am
autorisierten kontrollierten Ziel testen.

Vorhandene Projekt-E2E-Tests bevorzugen. Für einfache Zustandsproben kann die
bestehende `state-spec.json` konkrete Schritte, Targets und Erwartungen halten.
Der Schlüssel ist Route × Viewport × Target × State. Normales Capture klickt
keine beliebigen Buttons und wiederholt keine Schreibaktion als vermeintliches Undo.

## Bewegung

Den betroffenen Ablauf in Normal- und Reduced-Motion-Modus ausführen. Bei
Ganzseitenabnahme umfasst das alle Sektionen mit Reveal-/Scrollbindung und
die unterschiedlichen interaktiven Animationen, auch unterhalb des Heros. Die
Präferenz muss am tatsächlich animierten Element wirken. `motion-check.mjs`
ohne Runtimeziel ist ein Quelltextscanner; für die Wirkungsprobe Ziel-URL und
betroffenes Element angeben. Fresh Load, Reload, Resize oder Unterbrechung
werden geprüft, wenn die Änderung diesen Lebenszyklus berührt.

Bei Scroll-/Layer-Szenen vorwärts und rückwärts durch **Eintritt, Wechsel und
Austritt** gehen. Auf Sprünge, harte Bildkanten, freigelegte Hintergründe,
abgeschnittene Ebenen und unter Overlays versteckte Texte/CTAs achten.
Pinning muss enden und den nächsten Inhalt freigeben. Auf schmaler Touch-Ansicht
die gewählte mobile Variante bedienen; ein Desktop-Kartenstapel muss dort
nicht gleich animieren, sein Inhalt muss vollständig erreichbar bleiben.

Ein tatsächlich angesehener kurzer Mitschnitt oder gezielte Bildfolgen belegen
den untersuchten Übergang; passende Zustands-/Scrollmessungen prüfen die
erwartete Reaktion. Bei einer Naht die Stelle dichter erfassen und nach dem
Fix erneut prüfen. Keine pauschale Frame-, Pixel- oder Screenshotquote.
Einzelbilder beurteilen Erscheinung, nicht flüssiges Timing oder Eingabereaktion.

`--static` deaktiviert Bewegung und kann Reveals sichtbar machen. Solche
Aufnahmen sind stabilisierte Vergleichsbilder; normales Laden und tatsächliche
Sichtbarkeit werden dadurch nicht bewiesen.

## Inhalte, Technik und Veröffentlichung

Neue/geänderte Copy folgt `copywriting`: Kunden-Voice und Quellen, G0/G1,
auftragsgemäße abschließende Prüfung. Bei Web-Ship gilt die bestehende Rubrik
`/root/raphael-command-center/evals/rubrics/web.md` mit ihrer Schwelle; ein
unveränderter gültiger Text braucht keine erneute vollständige Schreibschleife.

Technische Checks aus dem Projekt nutzen. Bei Custom-TS/JS passende Lint-/Typ-
und Verhaltensprüfungen; Oxlint anti-slop nach `code-qualitaets-checkliste.md`,
wenn dieser Projektvertrag gilt. Neue Dependencies werden nach dem
`tool-usecase-router.md` entschieden, ohne bei einem kleinen Fix die Toolchain
ungefragt zu ersetzen.

Je Route Title/Description, H1 und Heading-Struktur, Canonical, Robots-
Meta/HTTP-Header, interne Verlinkung und crawlbaren Inhalt prüfen; Sitemap und
strukturierte Daten, soweit für den Auftrag relevant. Erwartete Indexierbarkeit
vorher aus Preview-/Produktionsziel ableiten: ein beabsichtigtes Preview-`noindex`
ist kein Fehler. `onpage-check.mjs` liefert technische Hinweise; `seo` wird
für echte Intent-/IA-/Contentfragen geladen. SEO-PASS ersetzt keine Frontendprüfung.
Lighthouse-Laborwerte und gemessene Feld-Performance bleiben getrennt.

Vor Launch: sichtbare Aussagen und Proof belegen, offene Inhalte auflösen,
Ziel/Domain/HTTPS, Datenschutz/Consent und tatsächliche Integrationen passend
zum Projekt prüfen. Details: `rolle-launch.md`. Eine sinnvolle Checkliste
richtet sich nach der Website; fixe Wortzahlen oder Screenshotmengen sind
keine Ersatzabnahme. „AAA“ in `agentur-rubrik.md` meint das Agentur-Raster,
nicht WCAG AAA.
