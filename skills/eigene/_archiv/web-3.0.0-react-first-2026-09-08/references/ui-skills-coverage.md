# UI Skills: Quellenabdeckung und Konsolidierung

Stand: **06.09.2026**. Gegenstand ist der vollständige öffentliche Katalog von [ui-skills.com](https://www.ui-skills.com/skills/registry.txt), seine tatsächlichen Skill-Quellen und das Playbook. Die Hauptseite allein wurde nicht als Gesamtkatalog behandelt.

## Was vollständig erfasst und gelesen wurde

| Gegenstand | Ergebnis |
|---|---:|
| Live-Katalogeinträge | 289 |
| Unterschiedliche verlinkte Quell-URLs | 287 |
| Vollständig gelesene zugewiesene Einstiegstexte | 289 / 289 |
| Gesicherte Primärtextmenge, einschliesslich Alias-Kopien | 3.228.227 Bytes |
| Individuelle Extraktionsdatensätze | 289 |
| Quellenbezogene Prinzipien-/Extraktionspunkte | 1.857 |
| Konflikt-, Korrektur- und Abgrenzungspunkte | 1.278 |
| Playbook-Taktiken vollständig gelesen und kontextualisiert | 47 / 47 |
| Native Quellen-Subagents mit getrennten Zuständigkeiten | 12 |

Die Punktzahlen zählen quellenbezogene Einträge; wiederkehrende Erkenntnisse können bei mehreren Autoren vorkommen. Sie behaupten weder 1.857 einzigartige neue Regeln noch eine Qualitätssteigerung durch die reine Anzahl. Die [konsolidierte Anleitung](ui-skills.md) und das [Playbook](ui-playbook.md) führen Überschneidungen zusammen. Der [JSON-Katalog](ui-skills-catalog.json) erhält die detaillierte Herkunft und Widersprüche zur gezielten Recherche.

**112 Einträge** liefern allgemein übertragbare Prinzipien (`integrate`), **149** gelten nur für passende Aufgaben, Medien oder vorhandene Stacks (`conditional`), **28** werden begründet nicht als Web-Workflow übernommen (`exclude`). Ausschlüsse bleiben mit ihrem gelesenen Inhalt beziehungsweise Ausschlussgrund auffindbar. Dazu gehören fachfremde Tracker-/Native-App-Controller, erzwungene persönliche Toolkonventionen und reine Ausgabe-/Routingverfahren. Bestehende geeignete Frameworks werden bei einem späteren passenden Auftrag weiterhin erhalten; insbesondere ist Pinia für geerbte Vue-Projekte bedingt eingeordnet.

## Prüffähige Herkunft

- Die Live-Registry wurde gegen `src/data/registry.ts` aus [ibelick/ui-skills](https://github.com/ibelick/ui-skills/tree/f5dd1de9c0fc6c033a43dc3fd2a5be41366e9f43) abgeglichen: keine fehlende oder zusätzliche Quell-URL.
- Der Commit `f5dd1de9c0fc6c033a43dc3fd2a5be41366e9f43` wurde über die GitHub-Commit-Antwort aufgelöst. Registry und Playbook wurden zusätzlich unter diesem exakten Commit abgerufen; ihre SHA-256-Werte entsprechen den zuerst gelesenen Dateien.
- Die anderen Autorenquellen stammen aus den im Katalog aufgeführten URLs, häufig beweglichem `main`. **Dieser Website-Commit pinnt nicht die anderen Repositories.** Abrufzeit, tatsächliche Datei, Bytezahl und SHA-256 sichern die gelesene Fassung.
- `accesslint/contrast-checker`, `accesslint/link-purpose` und `accesslint/use-of-color` verweisen auf dieselbe Quell-URL; der tatsächliche Einstieg heisst `accessibility-inspect`. Die drei Katalog-IDs bleiben erhalten. Einige Impeccable-Einträge verlinken Operationsreferenzen statt einer eigenen SKILL.md. Die lokal einheitliche Dateibenennung ändert diese Herkunft nicht.
- Die Standardskorrekturen zu WCAG-Zielgrössen und Textkontrast wurden mit W3C-Originaldokumentation abgeglichen. Einzelne Beispielkorrekturen sind durch ausdrücklich protokollierte kleine Quell-/Sprachprüfungen ergänzt; daraus folgt keine vollständige Runtime-Abnahme der Bibliothek.

Der begleitende Rechercheordner heisst `web-ui-skills-2026-09-06` und liegt in dieser Installation neben `web`. Er enthält `raw/`, alle 289 gespeicherten Primärdateien unter `sources/`, `inventory.json`, die zwölf `batches/`, Quellen-/Leseprotokolle, Zusammenfassungen und Prüfergebnisse. Im portablen JSON bezeichnen `research_path`-Werte Pfade relativ zu diesem separaten Rechercheordner. Sie sind keine eingebetteten Dateien des Web-Skill-Pakets. Die eigentliche Konsolidierung und ihre Quellen-URLs bleiben im Skill verfügbar.

## Zusatzdokumente: gezielte Vertiefung

Die Subagents haben substanztragende delegierte Referenzen gelesen, einschliesslich Designsystem-, Accessibility-, Framework-, Animations- und Medienunterlagen. Die folgende Tabelle beschreibt **Lesevorgänge je Batch**. Gemeinsame Referenzen können mehrfach auftreten; die Zeilen werden nicht zu einer vermeintlichen Zahl einzigartiger Quellen addiert.

| Batch | Haupttexte | Zusatzlektüre und ausdrückliche Grenzen |
|---|---:|---|
| 01 | 23 | 60 vollständige Zusatzdateien; zwei falsche relative README-Pfade über den Repository-Hauptpfad geklärt |
| 02 | 23 | 24 vollständige Zusatzdokumente; zwei Indizes nur zur Pfadauflösung |
| 03 | 24 | 42 vollständige Zusatzdokumente und zwei vollständige W3C-Haupttexte; fünf zusätzlich geladene Randdateien ausdrücklich ungelesen |
| 04 | 24 | 38 vollständige Zusatzdokumente; ein relativer README-404 am richtigen Hauptpfad geklärt |
| 05 | 24 | 60 vollständige Zusatzdateien; GSAP-Implementierung zusätzlich gezielt ausschnittweise gelesen |
| 06 | 24 | 28 vollständige Zusatzdokumente; drei Repository-Indizes nur zur Pfadsuche |
| 07 | 25 | 40 vollständige Markdown-Dokumente und zwei vollständige Artikeltexte; ein falscher Grilling-Pfad geklärt |
| 08 | 24 | 36 vollständige Dateien und vier vollständige Next.js-Artikeltexte; deren Roh-HTML mit Skripten/Navigation nicht als Volllektüre gezählt |
| 09 | 25 | 26 vollständige Dateien, drei vollständige Haupttexte und sechs dokumentierte Ausschnittslektüren |
| 10 | 24 | 43 vollständige Zusatzdokumente und sechs dokumentierte Ausschnittslektüren; Fehlpfade über korrigierte Quellen geklärt |
| 11 | 24 | 36 vollständige Dateien, ein vollständiger Artikeltext und zwei dokumentierte Ausschnittslektüren; vier Migration-Fehlpfade geklärt |
| 12 | 25 | 45 unterschiedliche vollständige Zusatztexte; eine identische Methodik zusätzlich als Kopie gespeichert |

Die Quellenregister unterscheiden vollständige Lektüre, vollständigen Artikel-Haupttext, Ausschnitte, nur zur Pfadsuche untersuchte Indizes, reine Downloads, bewusste Randverweise und fehlgeschlagene Zugriffe. Eine heruntergeladene HTML-Datei oder ein indexierter Link wird nicht automatisch als vollständig gelesen oder angesehen gezählt. Das vollständige Lesen aller Dokumente, Bilder, Videos und Programme in sämtlichen verlinkten Repositories war nicht Gegenstand dieser Katalogkonsolidierung.

## Konkrete Lücken und Grenzen

Alle 289 primären Quell-URLs waren erreichbar. Keine primäre Skill-Datei fehlt.

- Mehrere iart-Referenzen auf `skills/<name>/scripts/README.md` liefern 404. Andere Batches haben die gemeinsame Datei unter dem Repository-Hauptpfad `scripts/README.md` abgerufen und gelesen. Der jeweilige ursprüngliche Fehlaufruf bleibt dokumentiert; Helper-Ausführung oder installationsfertige per-Skill-Pfade werden nicht behauptet.
- Der behauptete Three.js-Pfad `https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/jsm/objects/ContactShadows.js` war nicht vorhanden. Der Katalog verwirft diesen ungeprüften Import; keine automatische React/Drei-Abhängigkeit wurde als Ersatz eingebaut.
- Ausführbare Beispielprogramme, sämtliche interaktiven Demos, Browser-/Screenreader-Kombinationen und die Bibliotheken als Ganzes wurden durch diese Quellenstudie nicht praktisch getestet. API-Widersprüche, etwa bei Figma und Next.js-Streaming/Bots, bleiben versionsgebundene Prüfhinweise für die spätere echte Implementierung.
- Die neuen Kreide-/Geometrie-Ideen beruhen auf gelesenen Textquellen; deren Beispielbilder wurden nicht angesehen. Die Mehrszenen-Scrollidee beruht auf gelesenen Quellen einschliesslich Engine-Code und wird nicht mit früheren Scrollcraft-Runtime-Belegen gleichgesetzt.
- Nicht ausgewertete Randverweise, Teile grosser Typing-/Chart-/Framework-Dateien und unbestätigte Marketing-/Studienbehauptungen sind pro Quelle ausgewiesen. Es wird kein vollständiges Wissen über einen Autor oder alle seine Veröffentlichungen behauptet.

## Integration und Prüfung

Die Konsolidierung ist mit SKILL.md, Startprompt, DESIGN.md-Vertrag/Vorlage, Komponenten-/Stack-Entscheidungen, SEO-Metadaten, Screenshot-Verfahren sowie Bild-/Scrollmodulen verbunden. HTML-first und tatsächliche shadcn-Wiederverwendung über statische Ausgabe oder gezielte Astro-Inseln bleiben gültig. Die 289 Einträge wurden als abrufbares Wissen integriert; **keine globale Installation von 289 Skills**, neuen Hooks oder fremden Laufzeiten ist erfolgt.

Die unabhängige Playbook-Prüfung bestätigt 47 eindeutige Einträge und korrekte kontextuelle Übertragung. Die am 07.09.2026 abgeschlossene Integrationsprüfung bestätigt alle 289 Datensätze und ihre Prüfsummen, unveränderte Extraktionsinhalte sowie substanzielle Quellenstichproben aus allen zwölf Batches. Eine kleine Fehlzuordnung von `shadcn/improve` wurde anschliessend zur Review-Unterstützung korrigiert und gezielt geprüft.

Ein unabhängiger Anwendungstest erstellte mit dem erweiterten Skill eine DESIGN.md aus dem vorhandenen Astro-/shadcn-Beispielprojekt. Er dokumentierte echte Komponenten, Zustände, CSS-/Portalgrenzen und neun quellenbezogene Verbesserungsvorschläge, liess alle 25 vorhandenen Projektdateien unverändert und kennzeichnete Darstellung/Laufzeit ausdrücklich als ungeprüft. Der Owner las das Ergebnis und glich wesentliche Aussagen mit den tatsächlichen Quellen ab. Berichte und Paketprüfungen liegen im begleitenden Rechercheordner. Dieser Dokumentationstest belegt keine neu ausgeführten Browser- oder Bibliothekstests. Frühere Website-, Bild- und Hybrid-Testberichte behalten ihre ursprüngliche Reichweite.
