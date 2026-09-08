# Visuelle Prüfung und Referenzvergleich

Diese Referenz beschreibt Bilder als Nachweis der Darstellung. Die Auswahl
aller Qualitätsnachweise steht in `qa-faecher.md`; Bildprüfung übernimmt keine
Formular-, Daten-, Motion- oder Gesamtfreigabe.

## Passenden Stand aufnehmen

1. Aktuellen Build, echte HTTP-Basis und betroffene Routen/Ansichten bestimmen.
   Fonts und relevante Assets müssen geladen sein. Ein falscher Serverstand
   oder fehlende CSS-Datei ist ein technischer Befund.
2. Vorhandene gültige Bilder derselben Revision wiederverwenden oder den
   kanonischen `scripts/shot-sweep.mjs` ausführen. Für Run-Evidence Run-ID und
   Build-Revision übergeben. Keine Basis aus einem fremden Projekt erraten.
3. Fensterbreiten **und -höhen** nach
   `qa-faecher.md#fensterformate-und-bildausschnitte` wählen. Der Standard-Sweep
   allein deckt diese Auswahl nicht ab; fehlende Formate mit dem vorhandenen
   Browserwerkzeug neu rendern. Übersichten und Detail-Crops ergänzen sich.
   Kleine Schrift muss tatsächlich lesbar bleiben.
   Jede Sektion im Umfang einer passenden Aufnahme zuordnen. Überlappende
   Scrollbilder dürfen mehrere kurze Sektionen abdecken; lange Sektionen brauchen
   mehrere Ansichten. Sektionsgrenzen und Übergänge dürfen nicht im Zuschnitt fehlen.
4. Aufnahmeprofil dokumentieren. `--static` stabilisiert Bewegung und Reveals;
   es belegt nicht den normalen Ladeablauf. Normales Capture führt keine
   impliziten Consent-/Submit-Klicks aus. Absichtliche Zustandsherstellung nutzt
   konkrete `state-spec.json`-Szenarien oder vorhandene Projekt-E2E-Tests.

`--hover '#eindeutiges-ziel'` erwartet genau ein erreichbares Element pro
Selektor. Fehlende, mehrdeutige oder verdeckte Ziele sind Fehler. Für unterschiedliche
Routen/Varianten die State-Spec verwenden. `scroll_coverage` im Manifest bestätigt
zusammenhängende Viewport-Aufnahmen bis zum gemessenen Dokumentende; Scroll-Lock
oder ausgelassene Intervalle schlagen fehl. Das bestätigt weder vollständige
Sektionsidentifikation noch tatsächliches Ansehen oder Designqualität.

Schlägt Capture fehl, Fehlerklasse und Grund feststellen. Einen belegten Fehler
im vorhandenen Werkzeug im autorisierten Umfang beheben; andere vorhandene
Browserwerkzeuge dürfen eine konkrete Prüffrage ebenfalls nachweisen.

## Tatsächlich ansehen

Öffne die Bilddateien mit einem tatsächlich bildfähigen Werkzeug, in Codex etwa
`view_image`, oder nutze einen vom Modell gesehenen Browser-Screenshot. Pfad,
Dateiliste, OCR, DOM, Alt-Text und ein Tool-Status allein sind kein Bildzugriff.
Ein Reviewer ohne Bildeingang liefert Code-/Dateibefunde; sein visueller Teil
bleibt `BLOCKED`, bis ein bildfähiger Prüfer ihn übernimmt.

Prüfe jede Sektion und ihr Zusammenspiel nach `qa-faecher.md`, gegen Auftrag
und aktuelle Kundenrichtung. Ein auf Miniaturgröße verkleinerter Fullpage-Shot
genügt für lesbare Details nicht. Bei verdeckten Inhalten oder wiederholtem
Fixed-Header zuerst echten Browserzustand und Capture-Artefakt unterscheiden,
dann die betroffene Region neu aufnehmen. Code-/Geometriewerte helfen bei der
Ursache; das Bild zeigt, ob der Unterschied sichtbar und gestalterisch stimmig ist.

Referenz und Build bei passenden Viewports/Zuständen vergleichen. Ein Blind-A/B
kann eine konkrete offene Richtungsfrage untersuchen; gleiche Geometrie und
wechselnde Anordnung reduzieren Positionsbias. Das Ergebnis beschreibt Befunde
und Unsicherheit. Raphaels subjektive Wahl bleibt seine Entscheidung.

## Befund und Wiederholung

Der bestehende Prüfbericht ordnet Route × Sektion × Breite × Höhe den tatsächlich
angesehenen Bildpfaden zu und nennt geprüfte Zustände sowie verbleibende Lücken.
Erzeugte, aber nicht angesehene Aufnahmen zählen nicht als visuelle Abnahme.
Ein visueller Befund nennt Bildpfad, Region, Erwartung und beobachtete Abweichung.
Zusätzliche Reviewer werden nach `kritik-matrix.md` gewählt. Es gibt weder eine
universelle Familienquote noch eine Mindestzahl Renderzyklen.

Nach einem relevanten Fix den zusammenhängenden neuen Stand erneut prüfen.
Unveränderte gültige Teilbelege werden nicht bloß wegen einer weiteren Phase
dupliziert. Ändert sich der Build, müssen die für seine Abnahme verwendeten
Receipts aktuell sein. `visual-aaa` kann einen visuellen Beleg liefern;
Gesamtabschluss bleibt bei Web und `run-evidence`.

Wiederkehrende Live-Beobachtung ist ein eigener Monitoringauftrag. Ein
Websitebuild richtet dafür keine automatische Screenshot-Dauerprüfung ein.
