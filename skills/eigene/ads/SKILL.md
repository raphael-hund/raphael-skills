---
name: ads
description: >
  Paid Ads für Lead-Generation: Strategie, ICP, visuelle Konkurrenz-Recherche, Statics,
  sprechbare Video-Skripte, Drehbriefs und Auswertung bis zum Abschluss. Recherchiert die
  Meta Ads Library im Browser mit Playbacks und Bildbelegen. Enthält eine eigene
  Wissensbibliothek mit Autorenreferenzen, Quellen, Leadgen-Übertragung und Aussagegrenzen.
  Verbindet Wispr-Diktate, Creative-Produktion und das Kunden-Lern-Register. Für Ads bauen,
  Hooks, Ads Scripts, Static-Briefs, Testwellen, Werbebibliothek, Konto-Audits, Creator-
  Wissen und 7/30-Tage-Auswertungen. Wissen und Referenzen liegen im Skill; Second Brain ist
  für Nutzung und Aktualisierung nicht erforderlich.
metadata:
  raphael-version: "4.0.0"
  raphael-class: "F"
  raphael-scope: "agency"
  raphael-sensitivity: "internal"
  raphael-loads: "[\"references/wissen/index.md\", \"references/wissen/leadgen-betriebsmodell.md\", \"references/wissen/quellenpflege.md\", \"references/teil-strategie.md\", \"references/teil-icp.md\", \"references/teil-research.md\", \"references/teil-video.md\", \"references/teil-statics.md\", \"references/loop3-ablauf.md\", \"references/claims-verbote.md\"]"
  raphael-requires-skills: "[]"
  raphael-changelog: "[\"4.0.0 (07.09.2026): Wissensbibliothek im Skill unter references/wissen (Zack/@zackpaid, George Clem, @brillaas, Nick Theriot, Bestand Evers/Regan), Leadgen-Betriebsmodell, Quellenpflege, craft/, Meta-Ads-Library-Playbacks, portable Helfer text-check.py und media-extract.sh, Frontmatter auf metadata-Form; Claude und Codex laden dieselbe Quelle. Umbau lief in Codex Desktop (Thread 01a077e3), Arbeitsverzeichnis /tmp/ads-four-creators-2026-09-06\", \"3.0.0 (06.09.2026): Marc-Evers-Quellen neu ausgewertet, aktuelle Reels und Carousel-Videos erfasst, Werbeformen gesichtet; Quellenarten und Messgrenzen getrennt; video-produktion.md, Wispr-Vorlagen und fortlaufendes Lernen ergänzt\", \"2.7.7 (06.09.2026): Kalter Leser zuerst im Teil Statics, sechs Textelemente in ads-statics\", \"2.7.6 (03.09.2026): Statics-Bild mit GPT Image 2 aus Logo, Look, JSON-Spec; Pillow-Overlay Fail\", \"2.7.5 (03.09.2026): Foreplay-Export mit Medien im Teil Research, Objektverkauf-Regel im Teil Statics\", \"2.7.4 (30.08.2026): Zac Regan / @startrunningads aus 41 Reels\", \"2.7.3 (28.08.2026): Evers 39. Video und 90 Reels: Flow vor Reibung, Pixel Conditioning, VSL hinter Formular, 6x6\", \"2.7.2: Lern-Register pro Kunde, Write-back nach Auswertung, Hypothese im Brief\", \"2.7.1: Marc-Evers-Playbook\", \"2.7.0 (19.08.2026): Hormozi-Doktrin aus zwei Paid-Ads-Trainings\", \"2.2.0: Strategie in teil-strategie (Static-first, Konzept-Achsen, Andromeda)\", \"2.0.0 (13.08.2026): ein Skill, vier Teile, ohne Brain-Pflicht; Fusion Loop-3 plus Korpus 711\"]"
  raphael-completion-criteria: "[\"Passender Teil und lokal auflösbare Referenzen gelesen\", \"Originalquelle, Aussage und Leadgen-Anwendung getrennt\", \"Keine erfundenen Kundenergebnisse oder unbelegten Performance-Gewinner\", \"Sichtungs- und Erfassungslücken ausgewiesen\", \"Kontoaktionen nur im autorisierten Umfang\"]"
---

# ads — Lead-Generation von der Botschaft bis zum Abschluss

Start bei `references/wissen/index.md`: Themen, Autoren und lokale Detailbelege.
Für Entscheidungen über Qualität, Kosten, Tests oder Wachstum zusätzlich
`references/wissen/leadgen-betriebsmodell.md`. Aus E-Commerce übernommene Ideen
werden auf Anfrage, Qualifizierung, Termin, Gespräch und Abschluss geprüft.
Ein Kauf-ROAS oder Warenkorbwert wird nicht einfach in CPL umbenannt.

Kundenauftrag, eigenes Lern-Register und überprüfte Resultate haben Vorrang.
Autorenaussage, beobachtetes Beispiel und unsere Anwendung bleiben getrennt.
Fremde Budgets, Quoten und Umsatzwerte sind keine Vorgaben für den Kunden.
Bei Bedarf liefern die lokalen Playbooks von Hormozi, Marc Evers und Zac Regan
ergänzende Muster. Nicht alle Autoren für jede Aufgabe laden.

## Schritt 0

`ADS_ROOT` bezeichnet den Ordner der tatsächlich geladenen `SKILL.md`.
Diesen absoluten Pfad für Shell-Aufrufe einsetzen; er kann im Plugin-Cache,
in einer lokalen Installation oder im Quellverzeichnis liegen. Claude und
Codex verwenden denselben Skill und dieselben enthaltenen Helfer.

```bash
python3 "$ADS_ROOT/scripts/load-wissen.py" --skill ads --kunde <slug>
```

Der Loader nennt lokale Wissenspfade und das passende Segment unter
`references/maerkte/`. Ohne bekannten Kunden `--segment` aus dem Auftrag wählen
oder `uebertragbar` verwenden; keine MAKE-Annahmen einsetzen. Die aufgelösten
Dateien tatsächlich lesen. Der Loader führt keine Brain-Abfrage aus.

## Welcher Teil

| Auftrag | Datei |
|---|---|
| Was zuerst, Konzept, Static oder Video | `references/teil-strategie.md` |
| Wer kauft, was tut weh | `references/teil-icp.md` |
| Angles, Konkurrenz, Dossier, Meta Ads Library, Werbebibliothek, Ad-Playbacks | `references/teil-research.md` |
| **Video-Ad-Skript (Ads Scripts)** | `references/teil-video.md` |
| Wispr-Diktat, Drehbrief, regelmässige Video-Produktion | `references/teil-video.md` → `references/video-produktion.md` |
| Static-Brief | `references/teil-statics.md` |
| Laufende Ads, 7/30 Tage, Kill/Keep | `references/loop3-ablauf.md` (Abschnitt Performance) |
| Wissen eines Creators ergänzen, alle Posts/Themen erschliessen | `references/wissen/quellenpflege.md` |

Den passenden Teil lesen, Detailwissen über dessen Links gezielt ergänzen.
`metadata.raphael-loads` ist das Dateimanifest, kein Lade-Befehl.

Video ist der Default, wenn der User „Skript" oder „Ads Scripts" sagt.
Performance ist der Default bei „Zahlen", „7 Tage", „30 Tage", „laufende Ads".
Jedes Video mit Spend wird visuell und sprachlich ausgewertet. Der enthaltene
Helfer `scripts/media-extract.sh` liefert Kontaktbögen, Body-Frames und
verfügbare Untertitel. Extraktion ist keine Sichtung: Bilder tatsächlich
öffnen, Sprachquelle lesen oder anhören, fehlendes Transkript ausweisen.
Konkurrenz-Recherche startet im Teil Research; dort gehört die visuelle Meta
Ads Library zum Ablauf. Vor Empfehlungen aus Video-Ads die Playbacks ansehen.
Eine reine Library-Recherche liefert Recherche und Belege, keine ungefragten Creatives.

Testwelle / was zuerst / Static oder Video: zuerst `references/teil-strategie.md`.
Auch bei direktem Skript- oder Statics-Einstieg: die drei Strategie-Zeilen
(Konzept, Welle, Messen) stehen im Output. Eine Zeile je Punkt reicht.

## Reihenfolge

Bei reiner Library-/Playback-/Materialanalyse gelten die Belege und der Umfang
aus Teil Research; keine ungefragte Formatentscheidung oder CREATE-Ausgabe.
Die folgenden Strategie-Zeilen gelten für Strategie, Angle-Dossier und Produktion.

Strategie-Frage **nicht still** entscheiden. Im Output nennen:
Static-first, Video-first oder ein begründeter paralleler Test plus Grund.
Dann drei Denkzeilen: OBSERVE, THINK (Unit Economics), CREATE.
Nicht alle zehn Prinzipien abspulen.

ICP → Research → Video oder Statics.
Fehlt ICP: holen oder `kunden-layer: fehlt` schreiben, dann Craft-Kern.

Konto, Kill/Keep/Scale: `references/loop3-ablauf.md` nur bei Bedarf.
Claims vor Schaltung: `references/claims-verbote.md` und eine zur Aufgabe passende Prüfung.
Geld: Signatur. Nie autonom schalten.

## Enthaltene Werkzeuge

- `python3 "$ADS_ROOT/scripts/text-check.py" <entwurf.md>` prüft Copy lokal;
  Exit 1 bedeutet harte Muster. Hinweise fachlich beurteilen. Dieser Filter
  belegt weder rechtliche Freigabe noch die Richtigkeit von Kundenzahlen.
- `bash "$ADS_ROOT/scripts/media-extract.sh" --doctor` prüft die benötigten
  Medienwerkzeuge. Mit Video-URL oder lokalem Dateipfad entstehen lokale
  Analyseartefakte; die Ausgabe nennt den tatsächlichen Sichtungsstatus.
- Ergänzende Copywriting-, Watch- oder Bildwerkzeuge nur nutzen, wenn sie
  vorhanden und für den Auftrag sinnvoll sind. Live-Konto- oder Foreplay-
  Zugänge sind optionale autorisierte Integrationen; keine Secrets voraussetzen.

## Creator-Wissen aktualisieren

Nur bei entsprechendem Auftrag `references/wissen/quellenpflege.md` verwenden.
Inventar, paraphrasierte Learnings, Original-URLs, Autor/Datum, Kontext und
Übertragungsgrenzen unter `references/wissen/` halten. Die Themenübersicht macht
jede Wissenseinheit auffindbar; Autorenregister erhalten die Herkunft.
Threads, Replies, Artikel und Medien mitprüfen, sobald sie Inhalt tragen.
Ein vollständiger Scraper-Lauf beweist nur den zugänglichen Umfang. Lücken und
nicht übertragbare Themen behalten einen begründeten Eintrag.
Eine Speicherung im Second Brain erfolgt nur auf ausdrücklichen Auftrag.
Gewöhnliche Ad-Produktion startet keinen Creator-Import oder Skill-Umbau.

## Rot

- Second Brain als Pflicht behandeln
- Alle Teile auf einmal laden
- Kundenzahlen erfinden
- Coaching-Umsatz in Local-Service kopieren
- „Wenn du [ICP] bist und [Outcome] willst, brauchst du [Offer]"
- Static-first vs Video-first still entscheiden
