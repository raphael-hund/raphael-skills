# Getestetes Scrollcraft-Beispiel

Eine isolierte HTML-/Vanilla-Probe mit tatsächlichen Medien. [index.html](index.html) über einen lokalen HTTP-Server öffnen; kein Framework-Build nötig. Für einen Kundenbau nur den passenden Medienabschnitt übernehmen und dessen Gestaltung aus DESIGN.md entwickeln. Testnavigation, Statuszeile, dunkle Flächen und `noindex` gehören zur Probe und sind keine Kundenwebsite-Vorlage.

Die enthaltenen neuen Illustrationen stammen aus einer begrenzten Sorglos-Referenzprobe. Sie sind Konzept-/Testmedien, keine echten Projektfotos und keine allgemeine Freigabe fremder Kundenidentitäten. Für neue Projekte passende eigene Originale und erlaubte Referenzen einsetzen. Generierungsweg und Prüfung sind im [Bildmodul](../../references/gpt-image.md) und [Scrollcraft-Modul](../../references/scrollcraft.md) beschrieben.

## Dateien einsetzen

- `scrollcraft.js` und `scrollcraft.css`: unveränderte Original-Runtime von [scroll-craft](https://github.com/nateherkai/scroll-craft), Commit `0b816225945e45380397d6a0487efa3c98916858`, MIT. [LICENSE.scrollcraft](LICENSE.scrollcraft) bei Weitergabe erhalten.
- `adapter.js`, `probe.css`, `index.html`: eigener geprüfter Einbau. `manifest.json` benennt Video, Poster, optionales Einzelasset, Bildsequenz und Budgets. Der Einzelassetmodus behält auch mobil/reduziert sein eigenes Bild.
- `assets/real/`: tatsächlich geprüfte Medien. Video 1,5 Sekunden, ohne Ton, H.264, 24 fps, GOP4. 24 WebP-Frames als optionale Alternative. Nur der gewählte Modus lädt Bewegungsmedien.
- `?mode=video`, `sequence`, `asset` oder `still`: die verfügbaren Probewege. Diagnosemodi des Entwicklungs-Harness sind standardmässig gesperrt. `data-allowed-modes` nicht ergänzen, um diese Sperre auf einer Kundenseite aufzuheben.

Für ein Projekt Poster, Clip und optionale Sequenz/Asset austauschen; Pfade und reale Abmessungen im Manifest eintragen. Eine nicht benötigte Darstellungsart samt Testnavigation entfernen. Die geometrischen und qualitativen Eigenschaften neu erzeugter Medien müssen erneut geprüft werden; dieses Beispiel nimmt sie nicht vorweg.

## Grenzen dieses konkreten Beispiels

Der originale generierte Clip dauerte 3,042 Sekunden und schnitt gegen Ende die Garage an. Hier enthalten ist nur der geprüfte Anfang von 1,5 Sekunden. Das eigene Einzelasset besitzt echte Transparenz, zeigt auf dunklen Flächen aber einen hellen Saum; die warme helle Assetfläche ist deshalb Teil seines Einbauvertrags. Die native Bildkorrektur änderte einzelne Innendetails und war keine verlustfreie Extraktion.

Mobile/Coarse Pointer, Reduced Motion und Save-Data erhalten statische Bilder. Das ist die gewählte Policy, kein universelles Verbot von mobilem Video. Kein Nachweis für echte iPhone-/Safari-Decoder, Low Power Mode oder Core Web Vitals. Die Original-Runtime hat keine allgemeine SPA-Destroy-Schnittstelle; dieses Beispiel ist eine normale Dokumentseite.

Die Probe lädt nur einen schweren Medienabschnitt. Für mehrere Abschnitte viewportnahes Laden und Speicherverbrauch gezielt planen. Kein KIE-Client, Uploadcode, Generierungsjob oder Zugangsschlüssel ist enthalten. Aktuelle Testbelege liegen im begleitenden Taskbericht `web-image-modul-2026-09-06/ERGEBNIS.md` ausserhalb des portablen Skill-Pakets.
