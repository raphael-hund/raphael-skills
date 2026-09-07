# Website kritisieren

Untersuche das konkrete Artefakt und die gestellten Fragen. Ergebnis sind
belegte, priorisierte Befunde; ein reiner Kritikauftrag ändert keinen Code.
`web` integriert die Teilurteile in einen Bericht.

## Prüfumfang

Lies den Auftrag, relevante aktuelle Kundenentscheidungen und vorhandene
Prüffragen. Ein ausgefüllter `PRUEFGEGEN.md` kann diese bündeln; bei einem
expliziten begrenzten Auftrag genügt dessen konkrete Fragestellung.
`qa-faecher.md` ordnet die passende Belegart zu. `kritik-matrix.md` hilft nur
bei der Auswahl unabhängiger Fachfragen oder zusätzlicher Reviewer.

Identifiziere den tatsächlich geprüften Build, seine Basis-URL und betroffene
Routen/Zustände. Prüfe bei einem lokalen Build dessen Frische; eine angegebene
Revision allein beweist nicht, dass der Server diesen Stand ausliefert.
Ladefehler und fehlende Assets sind technische Befunde, keine Geschmacksurteile.

## Belege erheben

- Darstellung und Referenztreue: passende aktuelle Ansichten tatsächlich
  ansehen. Bei Bedarf Capture nach `screenshot-kritik-loop.md`; gültige bereits
  vorhandene Bilder dürfen wiederverwendet werden.
- Code: betroffene Routes, Komponenten, CSS/Tokens, Breakpoints und Handler lesen.
  Bei Breiten-/Spacing-/Zustandsbefunden den sichtbaren Fehler mit der zuständigen
  Quelle und ihren Shared-Konsumenten verbinden. Ohne Quellzugriff bleibt die
  Ursache unbestätigt; ein Bild kann die sichtbare Abweichung trotzdem belegen.
- Bedienung: Aktion, erwartete und tatsächliche Zustandsänderung prüfen.
- Formulare: Feldstruktur getrennt von Request, Response, UI und fachlichem
  Empfangsnachweis beurteilen.
- Inhalt/SEO/Trust: Text, Markup und benannte Quellen prüfen. Sichtbarer Proof
  ist nicht automatisch wahr; Faktenprüfungen brauchen keinen zweiten Geschmack.
- Revision: verlangte Änderung und betroffene Nachbarflächen gegen den Auftrag
  prüfen; eine ungefragte Verbesserung ist ebenfalls eine Scopeabweichung.

Ein reproduzierbarer Befund braucht keine Mehrheit. Zusätzliche unabhängige
Prüfung lohnt sich bei hohem Risiko, offenen Fachfragen oder widersprüchlichen
Belegen. Herkunft und Grenzen einer Eigenprüfung oder zweiten Meinung werden
benannt; ein Modellurteil entscheidet nicht für Raphael über den Geschmack.

## Bericht

Nutze den vorhandenen Berichtsort, bei wiederholten Kritikaufträgen
`handoff/KRITIK-<n>.md`.

Vor den Befunden steht die tatsächliche Abdeckung, auch wenn keine Fehler
gefunden wurden: Route × Sektion × Viewport → angesehene Bildpfade, bediente
Zustände und verbleibende Lücken. Dazu den Vergleich der Sektionsfolge und der
gemeinsamen Muster zwischen Seiten benennen. Vorhandene Tabellen/Manifeste
verlinken statt ein zweites Protokoll anzulegen. Hero-only oder ungeprüfte
Sektionen erlauben keine vollständige Darstellungsfreigabe.

Jeder Befund nennt:

| Feld | Inhalt |
|---|---|
| Ort | Route, Element, Viewport/Zustand oder Quellstelle |
| Erwartung | Anforderung, konkrete Referenz oder begründetes Qualitätskriterium |
| Beobachtung und Beleg | Tatsächliches Ergebnis mit Bild-, Test-, Request- oder Quellenpfad |
| Bedeutung | Auswirkung, Priorität und betroffener Umfang |
| Fixziel | Überprüfbares gewünschtes Verhalten |

Der Bericht unterscheidet abgeschlossen ohne Befunde, Änderungen erforderlich
und nicht vollständig geprüft. Ein leerer Platzhalter ist kein Kritikresultat.
Offene Inhalte einer ausdrücklich provisorischen Vorschau dürfen gekennzeichnet
bleiben; ein beauftragter kaputter Nutzerweg bleibt ein echter Befund.

Für nachfolgende maschinelle Bauübergaben den abgeschlossenen Kritikstatus nach
`run-evidence-contract.md` übergeben. `STATUS.md` verweist auf den aktuellen
Bericht und gültige Belege; erledigte alte Befunde werden nicht erneut aktiviert.
