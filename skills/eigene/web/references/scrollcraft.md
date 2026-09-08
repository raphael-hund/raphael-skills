# Scrollcraft: Bild, Asset und Video mit Scroll verbinden

Dieses Modul wird nach [GPT Image](gpt-image.md) geladen, wenn Bewegung die Darstellung erklärt oder ausdrücklich gewünscht ist. Es ergänzt den React-Stack als Client-Komponente ohne weitere Framework-Abhängigkeit. Eine Service-Website braucht keinen Film, um hochwertige Bilder einzusetzen.

Quelle: [Nate Herks scroll-craft](https://github.com/nateherkai/scroll-craft), geprüfter Stand `0b816225945e45380397d6a0487efa3c98916858`, MIT. Der tatsächliche Skillpfad ist `plugins/nateherk-design/skills/scroll-craft/SKILL.md`. Die Quellfassung nutzt KIE für Medienerzeugung. Das ist kein Higgsfield-Zugang. Dieser Web-Adapter übernimmt die Scroll-Runtime und passende Gestaltungsprinzipien; Bild-/Videogenerierung läuft über die im Auftrag erlaubten Werkzeuge. Keine automatische KIE-Installation oder Providerumschaltung.

## Die passende Art der Bewegung

| Bedarf | Umsetzung | Medienvertrag |
|---|---|---|
| Haus, Papier, Produkt oder Karte räumlich verschieben | Separate Raster-Layer plus Vanilla/WAAPI, `transform` und gegebenenfalls `opacity` | Saubere Alpha-Kanten, feste Anker, Z-Reihenfolge, gemeinsamer Canvas beziehungsweise erhaltene Trim-Versätze |
| Durch ein Foto fahren, Ausschnitt ändern | Ein vorhandenes Bild mit kontrolliertem Crop/Transform | Genügend Bildfläche, festgelegter mobiler Ausschnitt, Motiv nicht abschneiden |
| Licht, Material, Kamera oder Szene tatsächlich verändern | Referenzbild → erlaubtes Image-to-Video → kodierter Clip → Scroll-Scrub | Freigegebenes Startbild, Grenzen der Veränderung, geprüftes Ende und Zwischenbilder |
| Exakte Vorwärts-/Rückwärtsbilder, wenn Video-Seeking nicht reicht | Begrenzte WebP-Sequenz auf Canvas | Anzahl, Abmessungen, komprimiertes und dekodiertes Speicherbudget; Poster und echte HTML-Inhalte |
| Einfacher Zustand, Auswahl oder Formularfortschritt | CSS/Vanilla-Interaktion | Bild nur als Inhalt; echte Controls, Fokus und Text bleiben im DOM |

Ein Kameraschwenk als CSS-Transform erzeugt keine neue Rückseite eines Hauses. Ein generiertes Hausvideo ist kein geometrisch belastbares 3D-Modell. Für echte freie Objektrotation eine passende 3D-Datei und einen begründeten Renderer verwenden.

Aus der Scrollcraft-Quelle sind besonders brauchbar: vorab Leserfolge und einen sinnvollen Höhepunkt bestimmen; unabhängige Bildebenen mit gemeinsamen Kontaktpunkten planen; wiederholten Stiltext und dieselben Referenzen verwenden; Mobile eigenständig komponieren; Text als HTML belassen; Zwischenzustände und Rückwärts-Scroll prüfen. Die persönlichen Vorgaben des Originalautors zu vier Bewegungsfamilien, Fotografie als Default oder wiederholten Interviews sind keine Anforderungen an Raphaels Projekt. Eine illustrierte Sorglos-Welt darf illustriert bleiben. Keine zusätzlichen Abschnitte allein für eine Quote.

## Image-to-Video über den erlaubten Provider

1. Das tatsächlich akzeptierte Standbild aus dem Assetmanifest wählen und ansehen. Für kontinuierliche Szenen nur die dort erlaubten Merkmale verändern. Inhalt/Stil bleiben gebunden; der Videoprompt beschreibt hauptsächlich Bewegung, Dauer, Bildgrenzen und Invarianten.
2. Aktuelles Modell-/Jobschema und Kosten mit der echten Startdatei lesen. Im Test vom 06.09.2026 war `kling3_0_turbo` über Higgsfield verfügbar: `start_image`, 3 Sekunden, 720p, 16:9; kein `end_image` in diesem Schema. Diese Angaben sind ein belegtes Beispiel, keine ewige Kompatibilitätszusage. Keine nicht angebotenen Endframe-Parameter erfinden.
3. Genau einen Create auslösen, Job-ID sichern, terminalen Status abholen, Original-MP4 herunterladen. Pollingfehler rechtfertigen keinen zweiten Create. Start-/Endframe-Führung nur anbieten, wenn der tatsächlich gewählte Provider beides unterstützt.
4. Clip visuell auf Flackern, Morphing, Beschnitt, veränderte Identität, neue Gegenstände und Text prüfen. Ein gelungener erster Frame genügt nicht. Gewünschte Bewegung und tatsächlich erzeugte Bewegung getrennt protokollieren.
5. Original erhalten. Für Scrubbing kurz und ohne Ton kodieren: im Test H.264, `yuv420p`, 24 fps, GOP 4, deaktivierte Szenenschnitt-Keyframes, `+faststart`. Aus dem **fertig kodierten Clip** das Poster ableiten, damit der erste Wechsel keinen unbeabsichtigten Bildsprung erzeugt. Qualität/Bitrate und GOP an die reale Zielhardware anpassen.
6. Nur die benötigte Darstellungsart laden. Videodatei und Sequenz nicht gleichzeitig vorladen. Eine Sequenz ist keine kostenlose Alternative: 24 Frames mit 640×360×4 Byte benötigen bereits rund 22,1 MB dekodierte Pixeldaten, zusätzlich zu Laufzeit-/Browserkosten.

Für ein illustriertes Haus etwa: „Animate the supplied image with one restrained continuous push-in. Keep the exact building layout, objects, materials and colors. Preserve the entire roof, garage and basement. No morphing, cuts, extra people, text or changing architecture.“ Die Intensität aus dem tatsächlichen Layout ableiten; nicht jedes Motiv braucht Bewegung.

## Vanilla-Runtime und statischer Zustand

Das [getestete Beispiel samt Runtime und Medien](../assets/scrollcraft/README.md) liegt im Skill-Paket. Beim Übernehmen nur den benötigten Modus verwenden, Medien durch passende Projektassets ersetzen und den Einbau neu prüfen. Die Probe ist eine ausführbare Referenz, keine vorgegebene Websitegestaltung.

Die ursprüngliche Runtime liest `data-sc-*` aus echtem HTML. Beispiel für Video-Scrubbing:

```html
<section data-sc-act="scrub" data-sc-span="3" data-sc-clip-map="travel">
  <div data-sc-stage>
    <img class="sc-stage__poster" src="assets/poster.webp" alt="">
    <video data-sc-scrub data-sc-src="assets/clip.mp4"
           muted playsinline preload="none" aria-hidden="true"></video>
    <h2>Die tatsächliche Aussage dieses Abschnitts</h2>
  </div>
</section>
```

Das ist das Quellformat, noch kein vollständiger abgesicherter Einbau. `data-sc-span="3"` bedeutet drei Viewporthöhen Abschnitt und ungefähr zwei Höhen Sticky-Weg. Mit `data-sc-clip-map="travel"` folgt der Clip diesem Weg. `ScrollCraft.mount(document.body)` erst nach der Wahl von Bewegung oder statischer Darstellung aufrufen. Eigene Animationen können den Fortschritt aus `--sc-p` lesen. Keine pauschalen, minutenlangen Scrollstrecken.

Die getestete Integration ergänzt vor dem Mount:

- `prefers-reduced-motion`, Save-Data und im Beispiel Mobile/Coarse-Pointer führen direkt zum Poster. Keine versteckten MP4-/Sequenzdownloads in diesen Modi. Mobilvideo ist eine begründete Projektentscheidung, kein Muss.
- Ein dekodiertes Videobild muss bereit sein, bevor das Poster verschwindet. `requestVideoFrameCallback` beziehungsweise ein geeigneter Ladezustand statt eines blinden Timers. Bei Fehlern Poster und lesbare Inhalte behalten.
- Mediengrössen und Ladezeit begrenzen. Beispielbudget: Video 3 MiB; Sequenz 48 Frames, 1,5 MiB komprimiert und 48 MiB geschätzte dekodierte Pixel; Timeout 8 Sekunden. Diese Grenzwerte sind für die kleine Probe gewählt, keine globalen Websitebudgets.
- Nur den gewünschten Modus aktivieren; `[hidden]` darf nicht durch eine allgemeine `display:block`-Bildregel überschrieben werden. Kein unsichtbares Asset über dem Video.
- Bei Fehlern einmal abbrechen; kein erneuter Download bei jedem Scrollereignis. Ressourcen am Seitenende freigeben. Für mehrere schwere Abschnitte zusätzlich viewportnah laden und die Speicherstrategie projektbezogen prüfen.

**Nachgewiesene Quellgrenze:** Die unveränderte Scrollcraft-Sequenz lud und bewegte Frames auch bei Reduced Motion. Der vorgeschaltete Adapter verhindert das. Ausserdem enthält die Original-Engine einen zeitgesteuerten Posterwechsel und eine fortlaufende Animationsschleife ohne allgemeine Destroy-Schnittstelle. Deshalb die Quelle nicht als pauschal geprüfte SPA-/Mobile-Lösung übernehmen. Eine kurze Vanilla-Seite und eine langlebige SPA haben unterschiedliche Lebenszyklen.

## Abnahme am eingebauten Medium

Desktop bei 0/25/50/75/100 Prozent und anschließend rückwärts prüfen. Videozeit, tatsächlich dekodierte Bildänderung und sichtbaren Ausschnitt erfassen. Bei Sequenzen die echten Framewechsel kontrollieren. Bei Layern dürfen Anker, Überdeckung und Ränder nicht springen. Zusätzlich Mobilansicht, Reduced Motion, Save-Data, JavaScript aus, fehlende Datei und Budgetüberschreitung prüfen. Poster allein ist kein Beleg für funktionierendes Video; eine veränderte `currentTime` allein kein Beleg für ein sichtbares neues Bild.

Text, Links und nächste Handlung müssen auch statisch funktionieren. Scrollspan, mobile Bildposition, Layeranker, Motionparameter und Poster in DESIGN.md sowie der IMAGE-SPEC festhalten. Tatsächliche Browserbelege angeben. Headless Chromium ersetzt keine Messung auf einem echten iPhone mit Safari, Low Power Mode und dessen Decoder. Diese Grenze bleibt im Abnahmebericht sichtbar.

## Optionale Erweiterung: mehrere zusammenhängende Kameraszenen

Quellenstudie vom 06.09.2026: [oso95/scroll-world](https://github.com/oso95/scroll-world), Einstieg und tatsächlichen Scroll-Engine-Quelltext gelesen; Herkunft und Konflikte unter `oso95/scroll-world` im [UI-Skills-Katalog](ui-skills-catalog.json). Diese Erkenntnisse beschreiben eine mögliche spätere Erweiterung. Die bisherigen Runtime-Testbelege dieses Moduls gelten für die dort konkret getesteten Varianten; sie belegen keinen ausgeführten Mehrszenen-Bau.

1. Zwischen räumlich kontinuierlichem Rundgang und Miniaturkarte mit bewusstem Eintauchen/Herausfahren wählen. Szene, Besucherfrage und benötigte Lesedauer zusammen planen.
2. Für einen Übergangsclip die tatsächlich gerenderten Nachbar-Endbilder verwenden, soweit das erlaubte Modell solche Eingaben unterstützt. Komposition, Kamerarichtung und Geschwindigkeit an der Naht prüfen. Eine Überblendung kaschiert keinen grundsätzlich falschen Anschluss.
3. Eine monotone, endpunkterhaltende Zeitabbildung kann ruhige Lesephasen verlängern und Übergänge bündeln. Kontrollpunkte dokumentieren; Vorwärts- und Rückwärtsscrollen, schnelle Richtungswechsel und Szenengrenzen prüfen.
4. Nur benötigte Nachbarszenen gezielt vorladen; Seeks zusammenfassen und Poster erhalten. Blob-/Seekability-Fallbacks und eine tatsächlich nötige iOS-Gesteninitialisierung anhand der Zielbrowser prüfen. Requests, Listener, RAF und Blob-URLs müssen ihren eigenen Lebenszyklus haben.
5. Text, Links und CTAs im initialen HTML halten. Nicht aktive CTAs dürfen trotz geringer Opazität nicht unsichtbar im Fokuspfad bleiben. Resize und live geänderte Motionpräferenzen müssen zur passenden Medien-/Stilldarstellung führen; Mobil erhält eine brauchbare Komposition.

Die untersuchte Engine setzt Ganzseiten-CSS, globale Scrollkoordinaten und JavaScript-erzeugte Copy voraus und enthält unvollständiges Cleanup. Für Web ihre nützlichen Mechanismen in einen begrenzten Bereich übertragen; keine ungeprüfte Ganzseiten-Übernahme oder automatische Medienanbieter-Umschaltung. Bestehende GPT-Image-Inhalts-/Stilreferenzen und die tatsächlichen Providerparameter behalten ihre Gültigkeit.
