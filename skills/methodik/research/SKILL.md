---
name: research
version: 0.2.1
description: >
  Recherchiert eine Sachfrage gegen vertrauenswürdige Primärquellen (Docs,
  Source Code, Specs, First-Party-APIs) im Hintergrund und hält die Befunde
  als zitierte Markdown-Datei fest. Die Recherche-Frage selbst wird zuerst
  scharf formuliert (Ziel + Entscheidung, 3-6 Unterfragen, Quellenhierarchie)
  und vor Abschluss läuft eine Gap-Round-Selbstkritik. Trigger:
  "recherchieren", "Doku nachschlagen", "API-Fakten sammeln",
  "Hintergrund-Recherche".
class: M
scope: agency
sensitivity: internal
source: fusion — mattpocock/skills skills/engineering/research @ 9603c1cc + davidondrej-skills skills/research-and-web/research-prompt
completion_criteria:
  - "Jede Behauptung in der Ergebnisdatei ist mit ihrer Primärquelle belegt"
  - "Quellen sind Primärquellen (offizielle Docs/Source/Specs/First-Party-API), keine Sekundär-Zusammenfassung"
  - "Vor Abschluss lief eine Gap-Round: Lücken/Widersprüche/Einzelquellen-Behauptungen aufgelistet und, wo möglich, geschlossen"
  - "Markdown-Datei liegt unter /root/raphael-command-center/ops/research/<datum>-<thema>/BRIEF.md; soll der Befund ins Brain, liegt zusätzlich ein Kandidat in /root/raphael-brain/wiki/_candidates/"
---

# research — Primärquellen-Recherche im Hintergrund

## Zweck (1 Satz)

Eine Sachfrage bis zur besitzenden Primärquelle zurückverfolgen und das Ergebnis als
zitierte Markdown-Notiz ablegen, ohne die Hauptsession zu blockieren.

## Wann

- Doku-/API-Fakten müssen geklärt werden, bevor weitergebaut wird.
- Die Recherche ist reine Lesearbeit, die parallel zur laufenden Arbeit laufen kann.

## Tiefe steuern

Ein Schlüsselwort in der Anfrage reicht, um Gründlichkeit/Kosten zu steuern,
statt es jedes Mal auszuhandeln: **quick** (1-2 Unterfragen, eine
Suchrunde, kein Gap-Round) · **standard** (Standardablauf oben) · **deep**
(6 Unterfragen ausgereizt, mehrere Gap-Rounds, Primärquellen-Kreuzcheck
über mehrere unabhängige Quellen je Kernbehauptung). Ohne Angabe: standard.

## Ablauf

1. **Recherche-Frage scharf formulieren, bevor gesucht wird:** Ziel + die eine Entscheidung,
   die die Recherche informiert, zuerst festhalten. Danach 3-6 nummerierte Unterfragen, die
   die Frage vollständig abdecken (mehr wird selten gebraucht und verschwässert den Fokus).
   Constraints benennen (was rein soll, was explizit raus).
2. Einen Hintergrund-Agenten für die Recherche starten, damit die eigentliche Session
   parallel weiterarbeiten kann.
3. Die Frage gegen **Primärquellen** prüfen — offizielle Dokumentation, Source Code,
   Spezifikationen, First-Party-APIs. Keine Sekundär-Zusammenfassung als Beleg akzeptieren;
   jede Behauptung bis zur Quelle zurückverfolgen, die sie tatsächlich besitzt. Foren/Social
   Media sind nur schwaches Signal, nie Beleg. Widersprechen sich Quellen: Fakt von Inferenz
   trennen, keinen künstlichen Konsens erzwingen.
4. **Gap-Round vor Abschluss:** eine abschließende Selbstkritik-Runde — welche Unterfragen
   sind noch dünn belegt, welche Behauptung stützt sich nur auf eine Quelle, wo bleiben
   Widersprüche offen? Eine weitere Suchrunde gezielt gegen diese Lücken fahren, wiederholen
   bis sauber oder explizit "nicht auffindbar" vermerken.
5. Befunde in einer einzigen Markdown-Datei festhalten, jede Behauptung mit ihrer Quelle.
6. Ablageort: siehe „Recherche-Archiv" — Kopie im Archiv ist Pflicht, die Arbeitskopie
   liegt zusätzlich dort, wo das Projekt vergleichbare Notizen sammelt.

## Recherche-Archiv (Pflicht)

Jeder Lauf legt sein Brief unter einem festen Archivpfad ab, damit ein wachsender
Korpus entsteht statt Wegwerf-Dateien:

```
/root/raphael-command-center/ops/research/<JJJJ-MM-TT>-<thema-kurz>/BRIEF.md
```

- **Vor dem Suchen** dort nachsehen (`ls`/`grep` über `ops/research/`): existiert schon
  ein Brief zur Frage, wird er gelesen und fortgeschrieben statt neu recherchiert.
- Ein Ordner pro Lauf, `BRIEF.md` ist die Ergebnisdatei; Rohmaterial daneben.
- Braucht ein Projekt die Notiz an seinem eigenen Ort, kommt dorthin ein kurzer
  Verweis auf den Archivpfad — nicht zwei divergierende Volltexte.
- Kundenmaterial bleibt im Kundenrepo (TB4); ins Archiv nur die verallgemeinerte
  Sachfrage ohne Kundennamen.
- Soll ein Befund **bleibendes Wissen** werden (nicht nur Projekt-Beleg), endet der Lauf
  im Brain: BRIEF.md nach `/root/raphael-brain/raw/` sichern und als Kandidat verdichten —
  Ablauf: [brain](/root/raphael-skills/skills/eigene/brain/SKILL.md), Modi `einspeisen`
  und `verdichten`. Für Web-Recherche gilt dort zusätzlich der Skeptiker-Schritt
  (andere Modellfamilie, Regel 8).

## Beschaffungs-Fallback-Kette

Kommt eine Quelle nicht herein, in dieser Reihenfolge weiterrücken — nicht abbrechen
und nicht „nicht verfügbar" melden, bevor die Kette durch ist:

1. **Offizielle API / First-Party-Endpunkt** (bevorzugt, stabilstes Format).
2. **Firecrawl** (`firecrawl search` / `firecrawl scrape` oder MCP `firecrawl`)
   für öffentliche Webseiten. Skill:
   [`firecrawl`](/root/raphael-skills/skills/eigene/firecrawl/SKILL.md).
3. **Browser/Fetch** auf die HTML-Seite (WebFetch, `agent-reach`, bei Login
   `raphael-chrome`).
4. **Wayback Machine** (`https://web.archive.org/web/<url>`) — deckt 404, Paywall-Wände
   und seit der Recherche geänderte Seiten ab; im Brief immer den Snapshot-Zeitstempel
   mitzitieren, nicht so tun, als wäre es der Live-Stand.
5. **Bezahlte API** (z. B. Apify) — kostet Geld, deshalb letzter Schritt und nur mit
   vorhandenem Key.

- **Reddit zwingend über Apify.** Die VPS-IP ist bei Reddit geblockt; direkter Abruf
  und Browser-Fetch scheitern reproduzierbar. Immer den Apify-Reddit-Actor nutzen.
- Welche Route für eine Plattform gerade trägt, sagt `agent-reach doctor --json` —
  erst prüfen, dann losschicken.
- Jede Stufe, die genutzt wurde, gehört in die Quellenangabe (Live-Abruf vs. Archiv-
  Snapshot vs. Scraper-Ausgabe sind unterschiedlich starke Belege).

## Agent-Reach: Fan-out und visueller Kritiker

`agent-reach` bleibt der Beschaffungsweg; die Orchestrierung sitzt darum herum.

1. **Vor dem Abruf:** `agent-reach doctor --json` einmal ausführen. Der Befund
   entscheidet nur, welche Route trägt; kein Worker erfindet eine Ersatzroute.
2. **Luna-Fan-out direkt nach der Routenwahl:** Jede unabhängige Quelle, Plattform,
   Unterfrage oder Ergebnisdatei bekommt ein eigenes `luna-worker`-Paket mit
   disjunktem `write_set`. Der Auftrag enthält `agentType: luna-worker`, Effort
   `max`, exakten Agent-Reach-Befehl, Quellenpfad, Output-Schema und ein
   maschinenprüfbares Gate. Gemeinsame Synthese und `BRIEF.md` bleiben beim Lead.
3. **Zusammenführen nach dem Fan-out:** Erst wenn alle Luna-Pakete ihre echten
   Abrufe und Quellenbelege geliefert haben, dedupliziert der Lead und schreibt
   den einen zitierten Brief. Agenten-Reports gelten bis zum Cross-Review als
   untrusted.
4. **Visual-Kritiker nur am visuellen Artefakt:** Wenn Agent-Reach Bilder,
   Screenshots, gerenderte Seiten, Folien oder PDFs liefert, folgt nach Render und
   `visual-g1.py` ein separater `visual-kritiker` aus einer anderen Modellfamilie.
   Er prüft die echten PNGs, nicht URL, Code oder Worker-Zusammenfassung. Rückgabe
   ausschließlich `verdict`, genau eine `biggest_gap`, `beleg`, `confidence`.
5. **Kein visueller Kritiker bei reinem Text-/Datenabruf:** Text, JSON, HTML und
   Quellenlisten gehen durch das normale Cross-Review; der visuelle Kritiker wird
   nicht als allgemeiner Recherche-Prüfer eingesetzt. `fail` routet nur die
   benannte größte Lücke in eine begrenzte Fix-Runde.

## Gotchas

- Ein Blog-Post/Forum-Beitrag über eine API ist keine Primärquelle — nur die API-Doku/der
  Source Code selbst zählt.
- Unbelegte Behauptungen gehören nicht in die Ergebnisdatei — lieber "nicht auffindbar"
  vermerken als eine Sekundärquelle als Beleg tarnen.
- Ergebnis in einer Datei bündeln, nicht über mehrere Notizen verstreuen — sonst verliert die
  nächste Session den Überblick.
- Mehr als 6 Unterfragen pro Recherche-Auftrag ist ein Zeichen, dass zwei Missionen in einen
  Auftrag gepresst wurden — aufteilen statt eine überladene Recherche zu starten.
