# Video-Referenzen untersuchen und für Web nutzen

Stand: 05.09.2026. Gilt für eine Video-/Scroll-Demo als Referenz oder als Quelle
für eine beauftragte Skill-Änderung. Der aktuelle Auftrag bestimmt Ergebnis,
Prüfung und Ablage. Eine Videoanalyse startet keinen zusätzlichen Website-Bau.

## Quelle und relevante Abläufe tatsächlich prüfen

1. Für Download und lokale Frames den vorhandenen Skill
   [watch](/root/raphael-skills/skills/eigene/watch/SKILL.md) nutzen. Eine lokale
   Datei braucht keinen Download. Originalquelle unverändert behalten.
2. Vorhandene Untertitel zuerst prüfen. Meldet der Extraktor „kein Transkript“,
   bei Bedarf mit `yt-dlp --skip-download --list-subs <url>` nachsehen; auch X
   kann Captions liefern. Bei VTT Wort-Tags entfernen und überlappende oder
   wiederholte Cues zeitlich sauber behandeln, Originaldatei erhalten. Lokale
   Transkription nur für benötigte Sprache ohne brauchbare Captions.
3. Bei Screenshares nach Kapiteln und Szenenwechseln sichten. Relevante
   Interaktionen als zeitliche Bildfolge ansehen; für kleinen Text einen Frame
   in ausreichender Auflösung öffnen. Hook-Kadenz für Reels und pauschale
   Screenshotmengen sind kein Maß für eine Website-Demo.
4. Quelle und Aussage trennen: Ein Frame zeigt einen Zustand, eine Bildfolge
   einen beobachteten Verlauf, das Transkript die Erklärung des Sprechers.
   Für Timing oder Eingabereaktion den relevanten Ablauf ausreichend dicht
   ansehen; ein einzelner Screenshot und ein Dateihash genügen dafür nicht.
   Eine erreichbare Originalseite zusätzlich untersuchen, wenn ihr Code oder
   tatsächliches Verhalten für die Umsetzung benötigt wird.

## Kurzer Beleg im bestehenden Plan oder Ergebnis

Kein zusätzliches Pflichtformular. Festhalten, soweit für den Befund relevant:

- **Quelle:** kanonische URL, Abrufdatum, Plattform-/Video-ID oder lokale Datei,
  Dauer und Originaltitel, falls verfügbar. Einen Repost-Autor nicht mit dem
  Sprecher verwechseln; getrennte Post-/Media-IDs benennen.
- **Coverage:** gelesene Untertitel-/Transkriptbereiche und Methode; davon
  getrennt tatsächlich gesehene Bildfolgen mit Zeitmarken und lokalen Belegen.
  Audio/Transkript kann `vorhanden`, `fehlt`, `stumm` oder `nicht geprüft` sein.
  Fehlende Sprache blockiert eine belegte rein visuelle Aussage nicht.
- **Befund:** konkrete Beobachtung mit Zeitbereich, daraus abgeleiteter
  Mechanismus und Grenze. `beobachtet`, `abgeleitet` und `unbekannt` trennen.
  Nicht gezeigte Mobile-Zustände, DOM-Technik oder Backendwirkung bleiben
  unbekannt. Widersprechen Bild und Erklärung einander, den Konflikt benennen.
- **Anwendung:** übernommene Eigenschaft, vorhandener Zielpfad und passende
  Prüfung; bei reiner Analyse nur die begründete Entscheidung. Unsicherheit
  und fehlende Prüfung ausdrücklich benennen.

Video-/Frame-Dateien in `/tmp` sind Arbeitsmaterial. Benötigte dauerhafte
Belege mit Herkunft im bestehenden Projekt-/Auftragsort sichern; Dateien für
Raphael nach `/root/eingang/ausgang/<thema>/`. Kein automatischer Brain-Kandidat,
zusätzlicher Ledger oder Modellfamilien-Review für jede Web-Videoquelle.

## Aus dem Befund eine gezielte Änderung machen

`inspirations-quellen.md` führt von der untersuchten Eigenschaft zum Einbau;
`motion-doktrin.md` beschreibt Ebenen, Auslöser, Verlauf und mobile Variante.
`qa-faecher.md` prüft das aktuelle Ergebnis. Eine beobachtete Produktdemo ist
kein Beleg für ihre echte Integration, Conversion oder Leistung.

Bei ausdrücklich beauftragter Skill-Änderung den vorhandenen Bedeutungsort
über `skill-update` ändern und prüfen. Bereits vorhandene Regeln bestätigen,
widersprechende kürzen. Review nach konkreter offener Frage und verfügbaren
Werkzeugen; keine feste Reviewerzahl, fremde Modellfamilie oder zusätzliche
Promotion-Freigabe. Subjektive Art Direction bleibt beim Nutzer.
Creator-Scores, Modell-Rangfolgen, Kostenversprechen und „one shot“-Aussagen
sind ohne passende unabhängige Messung keine allgemeinen Defaults.

## Geprüfter Anlass: X-Video vom Nutzer

Quelle: [Post 2095866538247049506](https://x.com/celineodier/status/2095866538247049506),
abgerufen 05.09.2026; Media-ID `2095866243119185920`, Dauer 16:12,85.
Eigene Ableitungen aus Quelluntertiteln und angesehenen Bildfolgen:

| Zeitbereich | Beobachtung / Erklärung | Konsequenz im vorhandenen Web-Skill |
|---|---|---|
| 00:57–01:28 | Mobile-Demo zeigt andere Tab-Anordnung und Kartenfolge als Desktop. | Mobile Variante ausdrücklich wählen und bedienen. |
| 02:42–03:23 / 06:19–06:55 | Diktat-Demo stellt Eingabe und Ergebnis in Zielprogrammen gegenüber. | Produktnutzen als verständliche Folge; Simulation von echter Integration unterscheiden. |
| 04:16–05:10 | Fora als Referenz; Sprecher zerlegt die Szene in Berge, Produktansicht und Vordergrund. | Komposition in benannte Ebenen und Bewegungswege übersetzen. |
| 05:11–05:50 | 21st.dev mit Komponenten-Demo und „Copy prompt“; genaues verwendetes Hintergrund-Item wird nicht wiedergefunden. | Komponentenweg tatsächlich nutzen; unbekannte Item-ID nicht erfinden. |
| 09:25–10:14 | Wachstumssequenz und Tastatur-Seite; sichtbare harte Bildkante um 10:05, vom Sprecher als Fehler benannt. | Eintritt, Wechsel, Austritt und Rückweg prüfen; Naht nach Fix gezielt erneut ansehen. |
| 10:54–11:23 | Brand Guidelines sowie Pain, Person, Promise. | Bereits in `rolle-plan.md` enthalten; keine zweite Checkliste. |
| 11:24–12:10 / 13:26–13:48 | Sprecher relativiert „scroll lock“, empfiehlt später pauschales Screenshotten. | Zweckgebundene, bedienbare Motion; Umfang der Bildprüfung folgt dem konkreten Ablauf. |

Die Demonstrationen zeigen keine gemessene Conversion-Steigerung. Aussagen zu
Modellen/Kosten am Videoende wurden nicht als Tool- oder Modellpolicy übernommen.

## Historische Belege

Der [Plan vom 31.08.2026](../plans/2026-08-31-web-workflow-evidenzvertrag-plan.md)
mit fünf Quellen, 48 Lessons und damaligen Worker-/Review-Receipts bleibt
unverändert. `evals/run-video-evidence-check.mjs` prüft dessen Ledger und
Runtime-Provenance separat. Historische Kandidaten-/Promotionfelder und feste
Phasen sind keine zusätzlichen Anforderungen an den heutigen Auftrag.
