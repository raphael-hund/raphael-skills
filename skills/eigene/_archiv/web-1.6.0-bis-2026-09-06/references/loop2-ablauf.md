# Web-Ablauf im Detail

Der Auftrag aus `anfaenger-pfad.md` bestimmt den Einstieg. Für einen Neubau ist
die typische Folge: Ziel/Inhalte → passende Planung → visuelles System und
Copy → integrierter Build → auftragsbezogene Prüfung → beauftragter Abschluss.
Plan-only, Kritik und Bestandsänderungen beginnen und enden an ihrem verlangten
Ergebnis; sie durchlaufen nicht automatisch jeden Schritt.

## Planung und sichtbare Richtung

`rolle-plan.md` hält Ziel, Seitenjobs, Quellen, Abhängigkeiten und Abnahme.
Vorhandene ICP/OFFER/PROOF/VOICE und Kundenabsprachen sind Inputs. Landing-
Struktur oder Sitemap-Planung richten sich nach dem tatsächlichen Umfang.

Bei neuer Gestaltung früh ein repräsentatives sichtbares Artefakt mit realen
Zutaten herstellen. Varianten nach `fold-duell.md` dienen einer offenen Wahl;
festgelegte Kundenrichtung bleibt bestehen. Der aktuelle Kunden-Designvertrag
besitzt Tokens und verbindliche Vorgaben; allgemeine Stilregeln sind nach Scope
einzuordnen. Copy kommt vom aktuellen Copy-Owner.

## Komplexe Pläne übergeben

Wenn `website-plan` verwendet wird, muss der v3-Validator erfolgreich sein:
`PLAN_VERIFIED=YES`, gültiges Receipt, Manifest-Hash und aktuelle Plan-Hashes.
Route-Abhängigkeiten, Write-Sets und Shared Owners werden aus dem aktuellen
Vertrag gelesen. Abhängigkeiten oder überlappende Pfade erzwingen Reihenfolge;
unabhängige disjunkte Pakete dürfen parallel laufen. Gemeinsame Dateien gehören
einem Integrator. Ein anderer kurzer Plan braucht kein zusätzliches v3-Paket.

## Bauen und prüfen

`rolle-bau.md` führt die gewünschte Arbeit aus. Projektstack und vorhandene
Komponenten zuerst nutzen; neue Entscheidungen nach `tool-usecase-router.md`.
`orchestrate` wird für tatsächlich unabhängige delegierte Pakete geladen.

`qa-faecher.md` besitzt die Belegauswahl. Capture, Quelltextscanner, Browser-
Aktion und fachliche Datenwirkung haben unterschiedliche Aussagekraft.
`visual-aaa` liefert bei Bedarf die visuelle Teilprüfung. Gesamtabschluss
entsteht einmal im Web-Auftrag; maschinelle Belege werden nach
`run-evidence-contract.md` an denselben aktuellen Build gebunden.

## Ablage und Abschluss

Bestehende Projektorte weiterverwenden: aktueller Plan, Designvertrag, Copy,
Quellcode und bei längerer Arbeit Status/Handoff. Statt paralleler gleichlautender
Dokumente auf die kanonischen Inhalte verweisen.

Dateien für Raphael liegen in `/root/eingang/ausgang/<thema>/`, Vorschauen sind
vom Mac erreichbar. `rolle-launch.md` führt konkret beauftragte Außenaktionen
am geprüften Ziel aus. Folgende CRO-Auswertung benötigt echte Analytics und
einen entsprechenden Auftrag; der Websitebau startet keine neue Dauerautomation.
