# Web-Pakete ausführen

`web` hält Auftrag und Gesamtabschluss. `orchestrate` besitzt Delegation,
Prozesssteuerung und Hostanbindung. Diese Datei ergänzt nur den Websitezuschnitt;
sie führt keine eigene Provider-/Modellliste.

## Vor dem Fan-out

Route-/Abhängigkeitsliste einmal bestimmen und einfrieren. Erst gemeinsame
Design-, Inhalts- und Komponentenentscheidungen auflösen; dann können
unabhängige Seiten oder klar begrenzte technische Pakete parallel entstehen.
Jedes Paket nennt Ziel, Inputs, absolute normalisierte Schreibpfade, Abnahme
und Stopbedingung. Überlappende Schreibpfade bleiben bei einem Owner oder in
isolierten Arbeitskopien mit benannter Integration.

## Tatsächliche Fähigkeiten

Der laufende Host bestimmt verfügbare Werkzeuge. Für den benannten VPS-CLI-
Ablauf wird der vorhandene `cli-worker` verwendet; laufende App-Aufgaben folgen
ihrem Sitzungsadapter. Sichtbare neue nutzereigene Tasks sind ein eigener
expliziter Auftrag und kein impliziter Ersatz für interne Delegation.

CLI-Dateiworker ohne Shell/Browser liefern Dateien und nachvollziehbare Befunde.
Der damit ausgestattete Owner führt Build, Funktions-, Scope- und nötige
Renderprüfungen aus. Kein Prompt fordert ein nicht vorhandenes Workflow-Tool.
Der Transportstatus `completed` allein ist keine fachliche Abnahme.
Ein visuelles Paket braucht einen Prüfer mit tatsächlichem Bildzugriff; ein
Worker ohne Bildeingang gibt keine Darstellungsfreigabe. Ausfälle und ungeprüfte
Teile übernimmt ein geeigneter verfügbarer Prüfer oder sie bleiben offen.

Modellrollen folgen dem aktuellen Nutzer-/Hostvertrag. Quelle, tatsächlicher
Datei-/Bildzugriff und Ausführungsidentität zählen; historische Tabellen aus
einem anderen Sandbox- oder Providerstand werden nicht wieder als Pflicht geladen.

## Integrieren und abnehmen

Deterministische Tests zuerst. Fehlgeschlagene oder verspätete überholte
Ergebnisse werden nicht als Erfolg übernommen. `orchestrate` beschreibt
Timeout/Cancel/Wiederaufnahme; `run-evidence-contract.md` den aktuellen
fachlichen Nachweis. Visuelle Belege und Referenzbilder bleiben an die passende
Prüffrage und Buildidentität gebunden.

Prüfbedarf nach `qa-faecher.md`, zusätzliche unabhängige Fragen nach
`kritik-matrix.md`. Eine größere Seitenzahl erhöht Routen- und Zustandsabdeckung;
sie erzeugt keine feste Mindestzahl von Agenten oder Modellfamilien.
Routen-/Sektionspakete lassen sich unabhängig prüfen; Code/Funktion und SEO
können parallel laufen. Der Owner prüft nach Integration zusätzlich die
Sektionsfolge und gemeinsamen Muster über Paketgrenzen hinweg. Viele lokale
Teilurteile belegen diese Kongruenz noch nicht. Nutze weitere Leaves für solche
unabhängigen offenen Fragen, soweit Kapazität und tatsächliche Werkzeuge passen.

Nur tatsächliche Abhängigkeiten verzögern ein Paket. Wenn B und C das gemeinsame
Menü benötigen, warten B und C darauf; unabhängige Routen können während der
Menüarbeit bereits beginnen. Die Integration folgt den vereinbarten Schreibgrenzen.
