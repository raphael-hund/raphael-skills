# Website bauen oder gezielt ändern

Baue aus dem aktuellen Auftrag und vorhandenen Plan. Ein Neubau braucht einen
geeigneten Plan, eine konkrete Änderung einen eindeutigen Auftrag oder
Reproducer. Wird ausdrücklich eine Kritik umgesetzt, ist deren gültige Fixliste
der Eingang. Für Neubau und Bestandsänderungen genügt ihr eigener gültiger Eingang.

## Eingang und Schreibgrenzen

Lies Ziel, relevante Quellen, aktuelle Neins und Abnahmebedingungen. Für einen
v3-Plan validiere Receipt, Manifest-Hash und aktuelle Plan-Hashes vor der
Paketbildung. `session-gate.mjs` unterstützt explizite Bau-Eingänge; CLI und
Receipt-Vertrag stehen in `run-evidence-contract.md`. Platzhalterdateien und
eine beliebige GO-Zeile belegen keinen abgeschlossenen Arbeitsschritt.

Ermittle betroffene Dateien und vorhandene Änderungen. Ein isolierter Workspace
oder disjunkte Schreibpfade erhalten fremde Arbeit. Starte aus dem tatsächlich
beauftragten Stand, nicht automatisch aus einem älteren `main`.

Lies die betroffenen Routen, Komponenten, Layout-/Typotokens, CSS und
Ereignisbehandler im Code. Verfolge Imports und Shared-Konsumenten; suche nach
lokalen Breiten-/Padding-Overrides, bevor du ein sichtbares Problem überdeckst.
Source, Build und laufende Seite müssen denselben Stand zeigen.

## Bauen und integrieren

Lade `design` für echte visuelle Entscheidungen, `copywriting` für neue Texte
und die übrigen Fachquellen nach `load-graph.md`. Nutze vorhandene Komponenten
und Projektwerkzeuge. Für neue Werkzeug-/Assetentscheidungen gilt
`tool-usecase-router.md`; ein gezielter Bestandsfix installiert nicht ungefragt
eine neue Toolchain.

Bei neuen Bausteinen gilt [inspirations-quellen.md](inspirations-quellen.md):
passende Nutzerquelle oder lokale Originalkomponente tatsächlich lesen, die
Auswahl übernehmen und an ihrem gerenderten Einsatzort prüfen. Ein Download
ohne Import/Einbau ist noch keine Verwendung.

Bei offener neuer Gestaltung entsteht früh ein repräsentatives Ergebnis mit
realen Zutaten. `fold-duell.md` wird nur bei Variantenbedarf geladen. Bei
festgelegtem Look oder Referenznachbau werden die Vorgaben umgesetzt.

Bei Foto-/Illustrationsbedarf gilt [bildgenerierung.md](bildgenerierung.md#bildwelt-im-projekt):
vorhandene Bildwelt ansehen und `higgsfield` laden. Fehlende oder unpassende
Motive im erlaubten Umfang mit Inhalts- und Stilreferenzen ergänzen; neue Assets
in der Sektion und neben den übrigen Bildern prüfen.

Ein Integrations-Owner besitzt gemeinsame Dateien. Unabhängige Pakete bekommen
Ziel, Inputs, absolute Schreibpfade, Abnahme und Rückgabe. `orchestrate` bindet
sie an den aktuellen Host. Ein Leaf führt nur vorhandene Werkzeuge aus; nötige
Build-/Browserprüfungen übernimmt der damit ausgestattete Owner. Es gibt keine
Pflichtdelegation im ersten Turn und keine universelle Modell-/Reviewerflotte.

Produktionscopy schreibt der nach aktuellem Nutzervertrag benannte Copy-Owner.
Der Integrator übernimmt den Wortlaut und meldet Layoutkonflikte zurück.
Copyprüfung gilt bereits für Working-Copy im beauftragten Umfang; offene
Zahlen oder provisorische Slots bleiben ausdrücklich markiert.

## Gegen den Auftrag prüfen

Für einen Bug den verlangten Fehler vor dem Fix reproduzieren, danach denselben
Fall prüfen. Deterministische Projektprüfungen und passende Browseraktionen
kommen vor zusätzlicher Modellkritik. `qa-faecher.md` bestimmt die Belege.

Nach einem zusammenhängenden sichtbaren Änderungspaket die betroffenen Ansichten
prüfen; bei Shared Components deren tatsächliche Konsumenten berücksichtigen.
Bei einer Funktionsänderung die Aktion und erwartete Wirkung ausführen. Ein
Screenshot und ein Quelltextscanner ersetzen diese Wirkung nicht.

Für maschinelle Abnahme nach neuem Build die Revision mit `run-evidence.mjs
bind-build` binden und die verlangten aktuellen Belege anhängen. Alte Receipts
dürfen einen neuen Build nicht freigeben. Standard-Capture hat keine impliziten
Schreibaktionen; absichtliche Zustandsherstellung erfolgt über konkrete Szenarien.

Zusätzliche Befunde werden nach ihrer Wirkung eingeordnet. Nötige Korrekturen
innerhalb des Auftrags ausführen; ungefragte Nachbaränderungen als Folgearbeit
benennen. Der größte Mangel kann funktional, inhaltlich oder visuell sein.

## Abschluss

Das verlangte Ergebnis existiert, aktuelle Neins bleiben eingehalten und alle
verlangten Prüfungen sind erfolgreich oder ehrlich als offen ausgewiesen.
Im bestehenden Status stehen Änderungen, Belege und Restpunkte. Zeit/Kosten
werden nur mit tatsächlicher Messquelle genannt; ein fehlendes `/cost`-Tool
macht einen fertigen Patch nicht unfertig. Beauftragte Außenaktionen folgen
`rolle-launch.md` und dem konkreten autorisierten Ziel.
