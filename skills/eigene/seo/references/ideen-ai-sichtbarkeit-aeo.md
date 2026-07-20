# Ideen — AI-Sichtbarkeit (AEO/GEO)

Als "Ideen" markiert, nicht "Regeln": AI-Suchoptimierung ist 2026 ein sich noch entwickelndes
Feld ohne verlässliche, offiziell bestätigte Ranking-Signale (außer bei Google selbst, siehe
unten). Als Werkzeugkasten nutzen, nicht als geprüfte Checkliste behandeln — Wirkung nicht
belegbar im selben Sinn wie ein GSC-Export.

Quellen: `ai-seo`-Skill aus coreyhaines/marketingskills (MIT), übersetzt und condensiert; das
AI-Visibility-Mess-Konzept (Score/Share-of-Voice/per-Engine-Zitationsstatus) in eigenen Worten
aus dem distribb-skill paraphrasiert (kein LICENSE-File, kein Zitat der API-Struktur).

## Der wichtigste Unterschied zu klassischem SEO

Klassisches SEO bringt eine Seite auf Position 1. AI-Suche **zitiert** eine Seite, auch wenn
sie "nur" auf Seite 2–3 rankt — AI-Systeme wählen Quellen nach Struktur/Qualität/Relevanz, nicht
nur nach Positions-Rang.

## Googles eigene Position — wichtig, bevor irgendetwas Neues gebaut wird

Google sagt explizit: für AI Overviews/AI Mode braucht es **kein** Spezial-Markup, keine
separaten "für-KI"-Dateien, kein Content-Chunking. Stattdessen gilt: hilfreicher, Menschen-
zuerst geschriebener Content mit denselben E-E-A-T-Standards wie normale Suche gewinnt.
Separaten Content "für KI" zu schreiben ist ein Risiko (Googles "Scaled-Content-Abuse"-
Richtlinie).

**Praktische Konsequenz:** für Google AI Overviews zählt normales, gutes SEO (siehe
`regeln-technischer-audit.md`) — das reicht. Die Strukturempfehlungen unten helfen zusätzlich
bei **anderen** Engines (ChatGPT, Claude, Perplexity, Copilot), die aktiv extrahierbare
Struktur (Passagen, FAQ, Vergleichstabellen) bevorzugen und Dateien wie `llms.txt` parsen. Im
Zweifel: "für Menschen schreiben, klar strukturieren" bedient beide Lager.

## Drei Ansatzpunkte für Nicht-Google-Engines

1. **Struktur — extrahierbar machen.** Jede Kernaussage muss als eigenständiger Satz
   funktionieren (40–60 Wörter optimal für Snippet-Extraktion). Definitionsblöcke für
   "Was ist X"-Anfragen, Schritt-für-Schritt-Blöcke für "Wie geht X", Vergleichstabellen statt
   Fließtext für "X vs Y", FAQ-Blöcke für häufige Fragen.
2. **Autorität — zitierfähig machen.** Nach einer vielzitierten Princeton-GEO-Studie (2024,
   Perplexity-Datensatz) bringen Quellenangaben ~+40 % Sichtbarkeit, Statistiken mit Quelle
   ~+37 %, Expertenzitate ~+30 %; Keyword-Stuffing wirkt dagegen **negativ** (~−10 %). Beste
   Kombination laut Studie: Statistiken + gute Lesbarkeit.
3. **Präsenz — dort sein, wo KI nachschaut.** AI-Engines zitieren Drittquellen oft stärker als
   die eigene Domain (Wikipedia, Reddit, Review-Plattformen wie G2/Capterra). Ein gepflegtes
   Wikipedia-/Review-Profil wirkt oft mehr als ein weiterer eigener Blogartikel.

## Maschinenlesbare Dateien (nur als Ergänzung, nicht Ersatz)

- **`/pricing.md`** — Preise/Limits/Features in einfachem Markdown, damit AI-Einkaufs-Agenten
  sie ohne JS-Rendering lesen können. Wichtig, wenn ein Kunde zunehmend über AI-Vergleiche
  gefunden/bewertet wird.
- **`/llms.txt`** — kurzer Kontext-Überblick für AI-Systeme (Produkt, Zielgruppe, wichtigste
  Seiten). Kein bestätigtes Google-Ranking-Signal, aber niedriger Aufwand.
- **AI-Crawler im `robots.txt` nicht versehentlich blocken:** `GPTBot`/`ChatGPT-User` (OpenAI),
  `PerplexityBot`, `ClaudeBot`/`anthropic-ai`, `Google-Extended` (Gemini/AI-Overviews),
  `Bingbot` (Copilot). Wer diese blockt, kann von der jeweiligen Engine gar nicht zitiert
  werden. Reine Trainings-Crawler (z. B. `CCBot`) lassen sich blocken, ohne die Zitierbarkeit
  zu verlieren.

## AI-Sichtbarkeit messen (Konzept, ohne festes Tool-Backend)

Grund-Idee für ein einfaches, manuelles Monitoring, wenn kein Spezial-Tool zur Verfügung steht:

- Monatlich 10–20 wichtige Kunden-Queries in ChatGPT, Perplexity und Google prüfen.
- Pro Query festhalten: erscheint eine AI-Antwort? wird der Kunde zitiert? wer sonst?
- Als einfache Tabelle fahren: `Query | Google-AI-Overview | ChatGPT | Perplexity | Kunde zitiert? | Wettbewerber zitiert?`.
- **Zitiert ≠ empfohlen.** Zitiert zu werden heißt, der Content war nützlich zum Nachschlagen —
  auf die tatsächliche Shortlist zu kommen hängt vom web-weiten Konsens (Reviews, Foren,
  Presse) ab und ist kaum durch eigenen Content allein steuerbar. Erwartung beim Kunden
  entsprechend setzen.

## Was aktiv schadet

- Separaten "KI-Content" statt normalem Content schreiben (Google-Spam-Risiko).
- Content in winzige Fragmente zerhacken, "damit KI es besser versteht" — Google rät explizit
  davon ab.
- Keyword-Stuffing — bei Nicht-Google-Engines nachweislich negativ für die Sichtbarkeit.
- AI-Crawler pauschal blocken und trotzdem Zitierbarkeit erwarten.
- Hauptinhalt hinter nicht-renderndem JavaScript verstecken — sowohl klassische Suche als auch
  AI-Agenten sehen dann nichts.

## Update (2026): Zahlen & Signale aus dem `seo-geo`-Skill

Ergänzung aus `seo-geo` (AgriciDaniel/claude-seo, MIT-Lizenz, Commit `6cf1ea9`), übersetzt und
condensiert. Diese Studien-Zahlen sind Stand des Quell-Repos — als Priorisierungs-Hinweis für
die eigene Arbeit nutzen, nicht ungeprüft in einen Kundenreport übernehmen (Belegpflicht: dort
zählt nur der eigene AI-Sichtbarkeits-Snapshot, siehe unten).

- **Brand-Erwähnungen korrelieren laut einer zitierten Ahrefs-Studie ~3× stärker mit
  AI-Sichtbarkeit als klassische Backlinks.** Praktische Konsequenz: neben Linkbuilding aktiv
  auf Erwähnungen auf YouTube, Reddit, Wikipedia, LinkedIn setzen (deckt sich mit Punkt 3 oben,
  "Präsenz").
- **Citability-Score als Denkraster fürs Brief:** eine Kernaussage in **134–167 Wörtern**
  selbstständig verständlich formulieren (etwas breiter als die 40–60-Wörter-Faustregel oben für
  einzelne Sätze — beides ergänzt sich: kurzer Kernsatz zuerst, dann ein selbstständiger Absatz
  in dieser Länge).
- **Rund 44 % der AI-Zitate stammen aus dem ersten Drittel einer Seite** — die zitierfähigste,
  eigenständigste Antwort nach oben ziehen, nicht am Ende vergraben.
- **Aktualität wirkt als Zitier-Hebel:** Content unter drei Monaten alt wird laut zitierter
  Studie deutlich häufiger zitiert als Content, der seit einem halben Jahr oder länger nicht
  aktualisiert wurde. Ein Refresh-Programm (siehe `refresh`-Schritt in `loop4-ablauf.md`) ist
  damit auch ein AI-Sichtbarkeits-Hebel, nicht nur ein klassischer SEO-Hebel.
- **Multimodaler Content** (Text + Bild/Video/Infografik) wird laut Quelle deutlich häufiger für
  AI-Antworten ausgewählt als reiner Text.
- **`llms.txt` bleibt ohne bestätigten Zitier-Effekt** — die Quelle verweist auf mehrere
  Primärquellen (u. a. Google-Statements), die belegen, dass große AI-Suchsysteme die Datei
  aktuell nicht als Ranking-/Zitier-Signal nutzen. Weiterhin niedriger Aufwand, aber keine
  Priorität vor echten Content-/Struktur-Maßnahmen.

## Gotchas

- **Kein bestätigtes Ranking-Signal für Google AI Overviews** außer normalem gutem SEO — alles
  in diesem Dokument ist Zusatz-Wette auf andere Engines, keine Garantie.
- **AI-Sichtbarkeits-Messung ist Beobachtung, kein Beleg im Sinne der Belegpflicht** — nicht als
  belastbare Kennzahl in einen Kundenreport schreiben, ohne die Unsicherheit zu benennen (siehe
  report).
