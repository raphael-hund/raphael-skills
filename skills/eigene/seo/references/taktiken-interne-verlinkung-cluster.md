# Taktiken — Interne Verlinkung & Hub-and-Spoke-Systematik

Lücke gegenüber dem Bestand: `regeln-technischer-audit.md` nennt interne Verlinkung nur als
Audit-Punkt ("wichtige Seiten gut verlinkt … keine Orphans"), `loop4-ablauf.md` erwähnt
Themen-Cluster nur in der Ablauf-Übersicht. Diese Datei liefert die fehlende Bau-Systematik:
wie ein Pillar/Cluster/Spoke-System mit einer konkreten Link-Matrix entsteht, statt "gut
verlinken" als vage Absicht zu belassen.

Quelle: `seo-cluster`-Skill (SERP-Overlap-Clustering, Original-Idee laut Quell-Repo von Lutfiya
Miller) aus AgriciDaniel/claude-seo (MIT-Lizenz, Commit `6cf1ea9`), übersetzt und condensiert;
ohne die dortige Tool-/Visualisierungs-Pipeline (DataForSEO/JSON-Export) — hier als reine
Planungsmethodik für den `ia`-Schritt in Loop 4.

## Warum SERP-Overlap statt Text-Ähnlichkeit clustern

Zwei Keywords gehören zusammen, wenn Google für beide dieselben Top-Ergebnisse zeigt — nicht,
weil die Wörter ähnlich klingen. Text-Ähnlichkeit täuscht leicht (z. B. "Apple" als Frucht vs.
Marke); geteilte Top-10-URLs sind ein direkter Beweis, dass Google beide Anfragen als
dieselbe Suchintention behandelt.

**Schwellenwerte (Anzahl gemeinsamer URLs in den Top 10):**

| Überlappung | Beziehung | Aktion |
|---|---|---|
| 7–10 | derselbe Artikel | zu einer Seite zusammenführen |
| 4–6 | derselbe Cluster | unter demselben Spoke-Cluster gruppieren |
| 2–3 | verlinken | in Nachbar-Cluster einordnen, Querverlinkung setzen |
| 0–1 | getrennt | eigener Cluster oder ausschließen |

## Intent-Klassifizierung vor dem Clustern

| Intent | Signalwörter | In Cluster aufnehmen? |
|---|---|---|
| Informational | wie, was, warum, Anleitung | ja |
| Commercial | beste, Test, Vergleich, vs. | ja |
| Transactional | kaufen, Preis, Rabatt, bestellen | ja |
| Navigational | Markenname, Login | nein — ausschließen |

Grenzfälle (z. B. "beste CRM-Software" ist commercial **und** informational) nach
dominierendem Intent einordnen, nicht doppelt zählen.

## Hub-and-Spoke-Architektur

```
                [Spoke 1a] --- [Spoke 1b]
                     \       /
                  [Cluster 1]
                       |
[Cluster 2] -- [PILLAR] -- [Cluster 3]
                       |
                  [Cluster 4]
```

**Pillar (Hub):**
- Breitestes, volumenstärkstes Keyword im Set.
- Richtwert Wortzahl: 2.500–4.000 (Vollständigkeits-Anspruch, kein Selbstzweck).
- Verlinkt **auf jeden** Spoke in jedem Cluster (Pflicht, keine Ausnahme).
- Struktur: Inhaltsverzeichnis, ein Abschnitt pro Cluster, Kurzfazit pro Unterthema.

**Spoke:**
- Eigenes, spezifisches Unterthema-Keyword (kein zweites Mal im Set).
- Richtwert Wortzahl: 1.200–1.800.
- Verlinkt **auf den Pillar** (Pflicht) + 2–3 Geschwister-Spokes im selben Cluster.
- Deckt sein Unterthema tiefer ab als der Pillar es im Überblick tut.

**Cluster-Größenordnung:** 2–5 Cluster pro Pillar, 2–4 Spokes pro Cluster.

### Template-Zuordnung nach Intent

| Intent-Muster | Template |
|---|---|
| Informational (breit) | Ultimate-Guide |
| Informational (wie) | How-To |
| Informational (Liste) | Listicle |
| Informational (Konzept) | Erklär-Artikel |
| Commercial (vergleichen) | Vergleichsseite |
| Commercial (bewerten) | Review |
| Commercial (ranken) | Best-of-Liste |
| Transactional | Landingpage |

Bei mehreren passenden Templates: das Format wählen, das die Top-SERP-Ergebnisse für dieses
Keyword tatsächlich zeigen (siehe `taktiken-serp-features.md`), nicht das theoretisch
naheliegendste.

## Link-Matrix — verbindliche Regeln

**Pflicht-Links:**
- Jeder Spoke verlinkt mindestens einmal im Fließtext auf den Pillar.
- Der Pillar verlinkt im passenden Abschnitt auf jeden Spoke.
- Diese zwei Regeln sind nicht verhandelbar — ein Cluster ohne sie ist strukturell defekt.

**Empfohlene Links:**
- 2–3 Spoke-zu-Spoke-Links innerhalb desselben Clusters.
- Beschreibender Anchor-Text (Ziel-Keyword oder naher Variant), niemals "hier klicken".
- Links im Fließtext platzieren, nicht nur in einer "Ähnliche Artikel"-Box.

**Optionale Links:**
- 0–1 Cross-Cluster-Links, nur bei echter inhaltlicher Brücke — keine erzwungenen Links ohne
  Mehrwert für die Leserin.

**Mindestanforderung pro Seite:**
- Jede Seite braucht mindestens 3 eingehende interne Links.
- Keine Orphan-Pages — jede Seite in ≤ 2 Klicks vom Pillar erreichbar.
- Anchor-Text-Vielfalt: kein einzelner Anchor-Text auf mehr als ~40 % der Links zu einer Seite.

## Kannibalisierung verhindern

1. Kein Keyword-Duplikat als Primär-Keyword zweier Seiten — ohne Ausnahme.
2. Bei SERP-Overlap ≥ 7 zwischen zwei Keywords: zu einer Seite zusammenführen statt zwei
   Halbseiten zu bauen.
3. Nach dem Clustern: Liste aller Primär-Keywords auf Near-Duplicates prüfen (z. B. "beste
   CRM" vs. "Top CRM-Software") — entweder zusammenführen oder bewusst nach Intent
   differenzieren (eine als Best-of, eine als Vergleich).

## Gotchas

- **Pflicht-Links zuerst prüfen, bevor über "mehr Content" nachgedacht wird.** Eine fehlende
  Spoke→Pillar- oder Pillar→Spoke-Verlinkung ist der häufigste, am schnellsten behebbare Fehler
  in bestehenden Cluster-Strukturen.
- **SERP-Overlap ist ein Beweis, keine Vermutung** — vor dem Zusammenführen/Trennen zweier
  Keywords tatsächlich die Top-10-Überlappung nachsehen (echter SERP-Ausriss), nicht nach
  Bauchgefühl clustern (Belegpflicht gilt sinngemäß auch hier).
- **Wortzahl-Richtwerte sind kein Ziel, sondern ein Rahmen** — ein kürzerer Spoke, der die
  Suchintention vollständig bedient, schlägt einen aufgeblähten Pflicht-Text (siehe auch
  E-E-A-T-Hinweis zu Wortzahl in `regeln-eeat.md`/`regeln-technischer-audit.md`).
