# Taktiken — SERP-Features rückwärts lesen (Search Experience Optimization)

Lücke gegenüber dem Bestand: bisher wird eine SERP nur für Keyword-/Cluster-Research
angeschaut (`loop4-ablauf.md`), nicht systematisch auf **Seitentyp-Erwartung** und
**SERP-Feature-Konsens** geprüft. Diese Datei liefert die fehlende Methodik: "was belohnt
Google für dieses Keyword wirklich — und passt unsere Seite überhaupt zu diesem Muster?"

Quelle: `seo-sxo`-Skill (Search Experience Optimization, Original-Autor Florian Schmitz laut
Quell-Repo) aus AgriciDaniel/claude-seo (MIT-Lizenz, Commit `6cf1ea9`), übersetzt und
condensiert; ohne die dortigen Skript-/Tool-Aufrufe (WebFetch/Render-Pipeline) — hier als reine
Analyse-Methodik für den research-/briefs-Schritt in Loop 4.

## Der Kerngedanke

Eine Seite kann technisch nahezu perfekt sein und trotzdem nicht ranken, weil sie der
**falsche Seitentyp** für dieses Keyword ist. Zeigt Google für ein Keyword überwiegend
Vergleichsseiten, verliert ein Blogartikel unabhängig von seiner Qualität — die SERP selbst
verrät, was Google für diese Anfrage als richtige Antwortform gelernt hat.

## Schritt 1 — SERP rückwärts lesen

Für die Top-10-Ergebnisse eines Ziel-Keywords erfassen:

- Seitentyp je Ergebnis (Blogartikel, Produktseite, Vergleichsseite, Tool/Rechner, Video,
  Listicle, Ratgeber …)
- Content-Format (Long-Form, Listicle, How-To, Vergleich)
- Vorhandene SERP-Features: Featured Snippet (Absatz/Liste/Tabelle/Video), People Also Ask
  (alle sichtbaren Fragen notieren), Ads (Anzahl + Botschaft-Thema), Related Searches,
  Knowledge Panel/Local Pack/Shopping-Ergebnisse, AI-Overview-Präsenz und deren Quellentypen.

**SERP-Konsens berechnen:**

| Anteil dominanter Typ | Einordnung | Konsequenz |
|---|---|---|
| > 60 % | starker Konsens | eigene Seite muss diesem Typ folgen |
| 40–60 % | gemischt | Spielraum für Differenzierung |
| < 40 % | fragmentiert | Chance, mit klarer Differenzierung zu gewinnen |

## Schritt 2 — Seitentyp-Mismatch erkennen

| Eigener Typ | SERP erwartet | Schwere | Empfehlung |
|---|---|---|---|
| Blogartikel | Produktseiten | kritisch | eigene Produktseite bauen |
| Blogartikel | Vergleich | hoch | zu Vergleichsseite mit Matrix umbauen |
| Produktseite | Informativ | hoch | erklärende Content-Ebene ergänzen |
| Landingpage | Tool/Rechner | hoch | interaktives Tool-Element bauen |
| Service-Seite | Local-Ergebnisse | mittel | lokale Signale + Schema ergänzen |
| Typ passt | – | passt | Fokus auf Content-Tiefe und UX statt Struktur |

## Schritt 3 — User-Storys aus SERP-Signalen ableiten

Aus den erfassten Signalen echte Nutzer-Bedürfnisse ableiten statt zu raten:

- **PAA-Fragen** zeigen Wissenslücken/Bedenken der Suchenden.
- **Ad-Copy-Themen** zeigen kommerzielle Trigger und Nutzenversprechen der Konkurrenz.
- **Related Searches** zeigen die Suchreise davor/danach.
- **Featured-Snippet-Format** zeigt die erwartete Antwortstruktur (Absatz vs. Liste vs.
  Tabelle) — das Brief sollte diese Form direkt übernehmen.
- **AI-Overview-Inhalt** zeigt, was Google aktuell als die "definitive" Antwort behandelt.

Format je Story: *Als [Persona aus Signal] will ich [Ziel aus Intent], weil [emotionaler
Treiber aus Ad-Copy/PAA-Ton], aber [Blocker aus PAA/Related Searches].* 3–5 Storys pro
Keyword reichen für ein Brief.

## Featured-Snippet-Taktik (Ergänzung zu den PAA/FAQ-Regeln)

- Antwort in **40–60 Wörtern** direkt unter der passenden Überschrift platzieren — deckt sich
  mit der Passagen-Länge aus `ideen-ai-sichtbarkeit-aeo.md` für AI-Zitate.
- Format an das beobachtete Snippet-Format anpassen: Frage-Überschrift → Definitionssatz für
  "Absatz"-Snippets, nummerierte Schritte für "Listen"-Snippets, echte Tabelle für
  "Tabellen"-Snippets.
- FAQ-Schema: siehe `regeln-schema-markup.md` — Google hat FAQ-Rich-Results 2026 für alle
  Seiten eingestellt (kein SERP-Feature mehr), das Markup bleibt aber für AI-Zitierbarkeit
  sinnvoll (Info-, kein Critical-Befund).

## Buy-Intent-Seitentypen (Borja, 2026-07)

Welche Seitenform je Kauf-Suchmuster gewinnt (Pricing als eigene Seite ohne Jahr, X-vs-Y als Marken-Seite mit Median 2 Backlinks, Alternatives mit Zahl im Title, Trial und Discount getrennt, Review fremd mit Byline): `playbooks-borjafat.md` Abschnitt 2.

## Gotchas

- **Nicht mit Cluster-/Keyword-Research verwechseln.** SERP-Feature-Analyse prüft die Form
  der Antwort (Seitentyp/Feature), Cluster-Research (`references/loop4-ablauf.md`) die Menge
  und Struktur der Themen — beide zusammen vor dem Brief einsetzen, nicht alternativ.
  Belegpflicht gilt auch hier: jede SERP-Beobachtung stammt aus einem echten Suchausriss, nicht
  aus dem Gedächtnis.
- **Fragmentierte SERP ist eine Chance, keine Lücke im Datensatz** — bei < 40 % Konsens aktiv
  nach einer besseren, noch unbesetzten Antwortform suchen statt zu raten, welcher Typ "der
  richtige" ist.
- **AI-Overview-Quellentyp mitprotokollieren** — verrät oft, welche Seiten-Art Google aktuell
  bevorzugt zitiert, unabhängig vom organischen Ranking.
