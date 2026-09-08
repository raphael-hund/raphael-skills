<!-- Private research origin: /root/skill-workspace/skill-updates/2026-09-07-web-design-depth/research/resume/videos.md; images/code remain outside the skill. -->

# Zwei Videos — belegte Frameanalyse

Root sah bei Wiederaufnahme beide Kontaktbogenpaare (29 und 32 Samples) und zusätzliche grosse Frames. Das ist eine zeitlich gesampelte Sichtung, keine framegenaue Vermessung und keine Backendprüfung. Keine Audiotranskripte erfunden. Zeitbereiche unten sind ungefähre Einordnungen der Samples.

## Amicro / Mono Charts

Quelle: https://x.com/Manixh02/status/2096175237109092642. Medien: `../x_creators_a/2096175237109092642/media-0.mp4`, Frames und Kontaktbögen im selben Ordner. APIdauer ungefähr 29 Sekunden; 29 Samples. Grosse Detailansicht: `frames/frame-01.jpg`. Verlinktes Produkt https://amicro.vercel.app hier nicht live geprüft.

| Zeit ungefähr | Sichtbarer Inhalt | Ableitung |
|---|---|---|
| 0–5 s | Heatmaps und erste Charts in drei Spalten | Gemeinsame Cardanatomie: Name, Grafik, Copyaktion |
| 5–12 s | Weitere Line-, Bar-, Donut-, Scatter-/Candlesticktypen | Chartform nach Datenfrage auswählen |
| 12–21 s | Untere Typen wie Sankey, Funnel, Matrix, Treemap, Waterfall | Keine Form ohne passende Datenbeziehung verwenden |
| 21–29 s | Rückscroll, wechselnde Werte/Zeichenanimationen | Demoanimation von produktivem Dashboard trennen |

Der Posttext nennt Buttons, Cards und Loaders; das Video zeigt einen Chartkatalog. Es ist kein Beleg für Button-Microinteractions. Monochrome Charts erzeugen Konsistenz durch gemeinsame Strichstärken, Flächen, Labels und Kartengrössen. Farbige Heatmaps kodieren Intensität statt wahlloser Markenakzente. Für eigene Charts SVG plus zugängliche Werte/Tabelle einsetzen; Daten, Legende und Tooltips aus derselben Quelle. Copyicons benötigen eindeutige Namen und Rückmeldung. Permanente Wertanimationen sind im Arbeitsdashboard störend; nur Datenänderungen erklären, reduced motion respektieren. Easing, Originalframework und Renderingtechnik sind aus dem Film nicht nachgewiesen.

## Marcel Kargul — Agentur-Booking

Quelle: https://x.com/marcelkargul/status/2096192737867350330. Medien: `../x_creators_c/2096192737867350330/1tggKFHyfuzQmAbn.mp4`; ffprobe 32.000 s, nur Videostream; API nennt 31.978 s. 32 Samples. Detailframes: `frames/second-03.jpg`, `second-14.jpg`, `second-30.jpg`.

| Zeit ungefähr | Schritt | UX-Befund |
|---|---|---|
| 0–3 s | Hero → Fitcheck, drei Checkboxen | Trial $2500/Projekt $10000+, Entscheider, Start binnen 30 Tagen früh geklärt |
| 4–9 s | Name → Email | Ein klarer Job pro Ansicht |
| 9–15 s | Datum → Zeit | Zeitzone Calcutta GMT+5:30, 12h/24h-Auswahl sichtbar |
| 15–21 s | Firma → optionale Website → Leistung | Optionale Eingabe mit Skip möglich |
| 21–27 s | Budget → Deadline → Freitext/Anhang | Umfang und Qualifikation statt bloss Kontaktadresse |
| 27–32 s | Herkunft → „Yay, you’re booked!“ | Konfetti, Email-/Homeaktion; keine sichtbare Terminübersicht |

Ein schmaler zentrierter Formularblock, heller Grund, grosses schwaches Hintergrundlogo, dunkle Pillbuttons und Fortschritt unten schaffen Konsistenz. Controls bleiben ruhiger als die Markenfläche. Eigene Umsetzung als semantisches Formular mit explizitem Zustandsmodell, erhaltenen Werten beim Zurückgehen, sichtbaren Labels, Fokus am Schritttitel und Fehler am Feld. Datum und Zeitzone in der Zusammenfassung wiederholen; Reload-/Netzfehler und doppelte Submission behandeln.

Nicht universal kopieren: Viele Schritte erhöhen Aufwand. Für eine einfache lokale Anfrage kann eine kompakte Seite besser passen. Der frühe Fitcheck verlangt Start binnen 30 Tagen, später werden 2–6 Monate angeboten: fachlicher Widerspruch. Die Erfolgssicht braucht Termin, Zeitzone, Kontakt und Änderungsweg. „Booked“ darf erst auf tatsächlich bestätigte Reservierung folgen; ein Video der Erfolgskarte beweist keinen Kalenderwrite. Bei bloss eingegangener Anfrage entsprechend formulieren (Gegenprobe: Refero Acne-Flow).
