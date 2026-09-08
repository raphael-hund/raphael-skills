---
name: web
description: >
  Für Websites und Landingpages: Inspiration, Planung, Neubau oder Redesign,
  Änderungen am Bestand, Nachbau einer URL, Bild- oder Videoreferenz, Website-Kritik
  und Veröffentlichung. Auch für Sitemap, Anfrageformulare und CRO an einer
  Website. Reine UI-Detailarbeit kann direkt über design laufen.
metadata:
  raphael-version: "1.6.0"
  raphael-class: "F"
  raphael-scope: "agency"
  raphael-sensitivity: "internal"
  raphael-loads: '["references/anfaenger-pfad.md", "references/load-graph.md", "references/rolle-plan.md", "references/rolle-bau.md", "references/rolle-kritik.md", "references/rolle-launch.md", "references/qa-faecher.md", "references/run-evidence-contract.md"]'
  raphael-requires-skills: '["design@^0","copywriting@^0","website-plan@^3","eval@^0","seo@^0","visual-aaa@^1"]'
  raphael-completion-criteria: '["Der verlangte Auftrag und seine betroffenen Routen, Inhalte oder Funktionen sind bestimmt; nur die dafür benötigten Referenzen und Fachskills wurden geladen", "Das verlangte Ergebnis existiert und hält aktuelle Kundenentscheidungen sowie den erlaubten Änderungsumfang ein", "Alle anwendbaren Qualitätsnachweise aus references/qa-faecher.md beziehen sich auf den geprüften Stand; Fehler und ungeprüfte Eigenschaften sind ausdrücklich benannt", "Bei maschineller Run-Abnahme bestätigt run-evidence validate --ready die auftragsspezifischen erfolgreichen Belege und ihre aktuellen Hashes", "Beauftragte Außenaktionen sind ausgeführt und am tatsächlichen Ziel geprüft; subjektive Urteile und fehlende Live-Belege werden nicht als PASS ausgegeben"]'
---

# web — Websites planen, bauen und prüfen

`web` ist der einzige Agency-Website-Workflow-Owner. Es hält Auftrag und
Gesamtabschluss zusammen. Die Fachskills werden für konkrete Arbeit geladen;
die Metadaten sind ein Verzeichnis verfügbarer Quellen, keine Leseliste.

## 1. Auftrag und vorhandenen Stand bestimmen

Wähle den passenden Auftrag in [anfaenger-pfad.md](references/anfaenger-pfad.md).
Dort stehen Einstieg, minimale Ladung und fertiges Ergebnis für sieben Fälle.
Vorschau oder Launch bestimmt die Abnahmestufe; daraus entsteht kein weiterer
Workflow. Ein Planauftrag endet mit dem Plan, eine explizite Kritik mit Befunden.

Lies den betroffenen Projektstand, die aktuellen Kundenabsprachen und
Negativentscheidungen. Nutze vorhandene ICP-/OFFER-/PROOF-/VOICE-Dateien, soweit
sie den Auftrag bestimmen. Vor einer Designentscheidung prüfe relevante neue
Dateien der letzten sieben Tage in `/root/eingang`. Ein abgelegtes Bild ist eine
Referenz; seine Existenz erweitert den Auftrag nicht.

Halte Ziel, Änderungsumfang und überprüfbare Abschlussbedingungen im bestehenden
Auftrags-/Planort fest. Eine kleine Korrektur braucht keinen vollständigen
Website-Plan. Bei einem vorhandenen v3-Plan prüfe Receipt, Manifest-Hash und
aktuelle Plan-Hashes, bevor Baupakete daraus entstehen.

## 2. Passende Facharbeit ausführen

Der [load-graph.md](references/load-graph.md) ordnet Fachskills einer konkreten
Entscheidung zu. `design` besitzt das visuelle System, `copywriting` den Text,
`website-plan` den bei komplexen Routen benötigten Planvertrag. Absorbierte
Designskills und `web-anti-slop` sind keine Pflicht-Loads.

Bei neuer Gestaltung zeige früh ein repräsentatives sichtbares Ergebnis mit
realen Zutaten. Mehrere Varianten sind sinnvoll, wenn die Richtung offen ist
oder der Auftrag sie verlangt. Eine vorgegebene Referenz wird nicht erneut zur
Wahl gestellt. Kunden-`DESIGN.md`, Referenzen und aktuelle Nutzerworte bestimmen
die Richtung; allgemeine Stilhinweise ergänzen sie innerhalb ihres Geltungsbereichs.

Bei Bildbedarf lade [higgsfield](/root/raphael-skills/skills/eigene/higgsfield/SKILL.md).
Sieh vorhandene Bilder und ihren Einsatz auf der Seite an: Motiv, Bildart und
Stilfamilie bestimmen Wiederverwendung, Bearbeitung oder ein neues GPT-Image-2-Asset.
Inhalts- und Stilreferenzen werden als Dateien mitgegeben. Der konkrete Web-Weg
steht in [bildgenerierung.md](references/bildgenerierung.md#bildwelt-im-projekt).

Bei einer Video-/Scroll-Demo gilt [video-evidence-contract.md](references/video-evidence-contract.md):
relevante Bildfolgen und verfügbare Untertitel tatsächlich prüfen; daraus
Ebenen, Auslöser, Zustandswechsel und mobile Abweichungen ableiten. Ein einzelner
Frame beschreibt nur seinen sichtbaren Zustand. Die konkrete Umsetzung und
ihre Grenzen gehören in den bestehenden Plan.

Bei neuer Gestaltung oder einem neuen Baustein nutze Raphaels passende Quellen
aus der [Zugangskarte](references/zugangskarte.md#raphaels-quellen-vom-05092026):
konkretes Beispiel öffnen und ansehen, gewählte Komponente oder Gestaltungsidee
im Projekt anwenden und dort prüfen. [inspirations-quellen.md](references/inspirations-quellen.md)
führt vom Fund zum Einsatzort. [Raphaels Favoriten](references/muster-bibliothek/favoriten.md)
sammeln gespeicherte Inspiration; Speicheraufträge beschreibt die Quellenreferenz.
Eine Homepage, Linkliste oder unbenutzte Datei
belegt keine Anwendung. Im vorhandenen Plan/Ergebnis stehen Quelle, übernommene
Eigenschaft, Einsatzort und Prüfbeleg. Bestandsfixes ohne neue Gestaltung brauchen
keine zusätzliche Inspirationsrunde. Das gilt auch für den Astra-CLI-Root;
fehlende MCP-Tools werden über die vorhandenen Script-/Browserwege aufgelöst.

Ein Owner integriert gemeinsame Dateien. Unabhängige Pakete dürfen mit
disjunkten Schreibpfaden parallel laufen. Lade `orchestrate`, wenn tatsächlich
delegiert wird; der Host-Adapter bestimmt die verfügbaren Werkzeuge. Modellrollen
folgen dem aktuellen Nutzer-/Hostvertrag, nicht historischen Web-Tabellen.
Produktionscopy hat einen eigenen Copy-Owner; der Integrator übernimmt sie
unverändert und meldet Layoutkonflikte zurück.

## 3. Das verlangte Ergebnis nachweisen

[qa-faecher.md](references/qa-faecher.md) ist die gemeinsame Auswahl der
Qualitätsnachweise: jede Sektion im Auftragsumfang, ihr Zusammenspiel auf der
Seite und die gemeinsamen Muster zwischen Seiten. Darstellung braucht
tatsächlich angesehene gerenderte Ansichten; Funktion braucht
eine Aktion mit erwarteter Wirkung; Übermittlung braucht Netzwerk-/Datenbelege.
Ein Scanner oder Screenshot bestätigt nur seine tatsächlich geprüfte Eigenschaft.
Der Owner führt die dort beschriebene finale Größenprüfung selbst am Browser aus;
delegierte Bildurteile ersetzen diesen Schritt nicht.

Prüfe nach einem zusammenhängenden Änderungspaket die betroffenen Flächen und
Abhängigkeiten. Wiederhole nach einem relevanten Fix oder offenem Befund.
Bildmenge und Reviewerzahl ergeben sich aus den Prüffragen. `visual-aaa` liefert
bei Bedarf ein wiederverwendbares visuelles Urteil innerhalb dieses Auftrags.

Für maschinelle Build-Abnahme gilt [run-evidence-contract.md](references/run-evidence-contract.md):
aktuelle Run-/Build-Identität, erfolgreiche verlangte Belege und vollständige
Abdeckung. `FAIL`, `BLOCKED`, `NOT_RUN` und begründetes `N/A` bleiben unterscheidbar.

## 4. Ergebnis liefern

Nenne Ergebnis, relevante Prüfung und verbleibende Lücken. Dateien für Raphael
liegen unter `/root/eingang/ausgang/<thema>/`; nutze den verfügbaren Ausgabeweg.
Webvorschauen müssen von seinem Mac erreichbar sein. Veröffentlichung folgt dem
konkreten Auftrag und geprüften Ziel: [rolle-launch.md](references/rolle-launch.md).

Für längere Arbeit hält [planner-executor-protokoll.md](references/planner-executor-protokoll.md)
den aktuellen Stand und die gültigen Entscheidungen über Übergaben hinweg fest.
Neue globale Regeln entstehen im bestehenden Lern-/Skill-Update-Weg, nicht als
Nebenwirkung eines Kundenlaufs. Referenz- und Werkzeugzugänge stehen im
[Reference-Routing](references/anfaenger-pfad.md#reference-routing).

## Gotchas

Ein für ein Fensterformat reparierter Bildausschnitt kann bei anderer Höhe den
Kopf abschneiden. Die Gegenprobe steht unter
[Fensterformate und Bildausschnitte](references/qa-faecher.md#fensterformate-und-bildausschnitte).

## Werkzeuge und Prüfungen

Capture: `scripts/shot-sweep.mjs` mit tatsächlicher HTTP-Basis oder gültigem
Preview-State. Nutze für Projektserver den vorhandenen `raphael-preview`-Adapter.
Designscanner: `/root/raphael-skills/skills/design/scripts/detect.mjs` und
`scan-ai-slop.mjs`; deutsche Copy mit `rules.de.mjs`. Projektstack und bestehende
Komponenten zuerst prüfen; neue Werkzeugentscheidungen dokumentiert der
[tool-usecase-router.md](references/tool-usecase-router.md).

`evals/` enthält Struktur-, Verhaltens- und Integrationsprüfungen. Deren Umfang
steht in `evals/eval-umfang.json`; ein grüner Strukturtest ist kein Nachweis
für das Verhalten einer Website oder eines Modells.
