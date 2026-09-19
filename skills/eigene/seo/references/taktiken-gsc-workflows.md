# Taktiken — GSC-Workflows (Advanced)

Operative Search-Console-Workflows jenseits des Standard-Exports. Ergänzt
`regeln-technischer-audit.md` (die neun GSC-Analysen bleiben die
Diagnose-Ebene) und `gsc-read.md` (read-only Snapshot-Skript).
Quelle: Nathan Gotch "If I Had to Win at SEO in 2026" (Transkript 2026-09-15)
+ Bestand — Details `quellen-2026-09.md`. §7/§8 aus Recherche-Runde
2026-09-18 (GSC Generative AI Reports, Core-Update-Kalender 2026).

## 1. Extraktion jenseits der 1.000-Zeilen-Grenze

Der UI-Export deckelt bei 1.000 Queries. Auswege:

- **Regex-Filter im UI** (Query → "Custom (regex)"): kommerzielle Modifier
  zuerst extrahieren, z. B.
  `(best|top|vs|review|alternative|pricing|cost|buy|software|tool|agency|service)`
  bzw. deutsch `(beste|vergleich|test|kosten|preis|kaufen|agentur|tool|software)`.
  Bottom-of-Funnel zuerst — die Strategie von unten nach oben aufbauen.
- **Page-gefilterter Export:** Performance → Pages → eine URL auswählen →
  Queries-Tab → Export. Liefert bis zu 1.000 Queries **pro URL** — für
  Cluster-Arbeit die wichtigste Export-Form.
- **API/Looker Studio/BigQuery** für den vollen Query-Raum großer Sites
  (ab ~1 Mio. Impressions realistisch nötig); GSC-BigQuery-Export einmalig
  einrichten lassen (Kunde), dann nur lesen.
- Exporte datiert unter `client-<name>/seo/exports/` ablegen (Belegpflicht).

## 2. Sprint-Priorisierung (nicht alles gleichzeitig)

1. Money-Pages markieren: Queries/Seiten mit klarer kommerzieller Intention,
  die Umsatz treiben könnten (z. B. "best X tools for Y").
2. **Ein Cluster pro Sprint** (5–10 Core-Topics initial): eine Core-Page +
  ihre Varianten + 5–9 Supporting-Pages.
3. Pro Core-Page: page-gefilterten Export ziehen → jede Query in genau einen
   Bucket: **Variante** (auf bestehender Seite mit abdecken) oder **Neu**
   (eigene Seite nötig) oder **Irrelevant**.

## 3. Variante vs. neue Seite — der SERP-Varianz-Test

Der häufigste teure Fehler: für jede Keyword-Variante eine eigene Seite
bauen (Kannibalisierung) oder umgekehrt alles auf eine Seite werfen
(Intent-Mismatch). Entscheidung nicht aus dem Bauch:

1. Query A (Core-Keyword) in Google suchen, Top-10 notieren.
2. Query B (Variante) suchen, Top-10 notieren.
3. **Viel Überlappung** → gleiche Intention → Variante auf der bestehenden
   Seite abdecken: fehlendes Wort ("monitoring", "platforms") in Title/Meta/
   H2/Fließtext aufnehmen.
4. **Wenig Überlappung** → eigene Intention → dedizierte Seite im Cluster.
   (Deckt sich mit den SERP-Overlap-Schwellen in
   taktiken-interne-verlinkung-cluster: ≥7 gleiche URLs = eine Seite.)
5. Denkstütze: "Wenn ich eine Landingpage bauen und Paid Ads drauf fahren
   müsste — wie spezifisch würde ich sie machen?"

## 4. On-Page-Upgrade der Core-Page (Reihenfolge)

1. **Basics zuerst:** crawlbar/indexierbar (robots.txt, `site:`-Check),
   Primär-Keyword in Title, Meta, H1, ersten H2s.
2. **Varianten einbauen:** die im Export gefundenen Synonyme/Wortvarianten
   (monitoring, platforms, tracking …) in Title/Meta/Headings ergänzen —
   eine Seite deckt so den ganzen Variantenraum ab.
3. **Content-Gap gegen Top-Wettbewerber:** Content-Optimizer (Rankability/
   Surfer o. ä.) oder manuell: welche Subtopics nennen alle Ranker, die wir
   nicht nennen (z. B. "AI models", "Meta AI")? → einbauen.
   **Aber:** Optimizer-Score ist Momentaufnahme der aktuellen Ranker — wer
   rankt, macht nicht automatisch die beste Strategie. Echte Lücken
   (niemand hat eine dedizierte Seite zum Subtopic) sind Chancen, nicht
   Warnungen.
4. **Interne Verlinkung prüfen:** Crawl (Screaming Frog) → für die URL:
   Crawl-Depth ≤3 (wichtige Money-Pages: 1–2), Unique Inlinks zählen.
   Tiefe zu hoch → in der Architektur hochziehen; Inlinks zu wenig → aus
   verwandten Artikeln verlinken (Borja: 4–11 kontextuelle Links auf
   Money-Pages).
5. **Page-Speed kontextuell:** ~70 PageSpeed reicht meist; B2B = Desktop
   zuerst. Abnehmender Grenznutzen — nicht überoptimieren.
6. **FAQ-Sektion für angrenzende Themen:** verwandte, aber nicht
   kernrelevante Fragen (z. B. "AI Mode vs. AI Overviews") als FAQ —
   deckt Fan-Out-Queries ab, ohne die Seite zu verwässern.
7. **Links, wenn die SERP stark ist:** Ranker mit DR 66+ und vielen
   Referring Domains auf Seitenebene → On-Page allein gewinnt nicht;
   Linkbuilding-Plan (siehe taktiken-linkbuilding-digitalpr) ist dann die
   eigentliche Maßnahme. Erwartung entsprechend setzen.

## 5. Refresh-Zyklus (Optimierung ist nie evergreen)

- Optimizer-/SERP-Bild ist eine Momentaufnahme: in 3–6 Monaten ranken
  andere Seiten mit neueren Subtopics → Re-Optimierung einplanen.
- Refresh-Trigger bleibt echter Decay im GSC-Export (Position/CTR über
  Zeit), nicht der Kalender (G4, loop4-ablauf).
- Bei Refresh: neue Varianten aus dem frischen page-gefilterten Export
  ziehen — GSC liefert laufend neue Long-Tail-Queries, die die Seite
  bereits streift.

## 6. Knowledge-Base vor Content-Produktion

Damit KI-generierte Briefs/Content on-brand und faktisch korrekt sind,
**vor** der Produktion eine Kunden-Knowledge-Base bauen:

- **Minimal:** LLM-Projekt (modell-neutral, oder gleichwertig) mit Marken-Docs:
  Leistungen, Service-Seiten, Testimonials, Reviews, Positionierung, bisherige
  Best-Content.
  Briefs/Briefings werden dagegen retrieved → Markenstimme + Fakten statt
  generischem AI-Slop.
- **Agency-Skalierung:** eigenes Mini-Tool (z. B. Replit-Prototyp, ~30 min)
  mit einer Knowledge-Base pro Kunde; Upload von Artefakten, Abfragen
  dagegen.
- Nutzen über Content hinaus: HARO/Qwoted-Pitches im Kundenton
  (Freigabe-Prozess bleibt, siehe taktiken-linkbuilding-digitalpr).

## 7. GSC Generative AI Reports (seit 03.06.2026)

Google hat am 03.06.2026 dedizierte „Search Generative AI"-Reports in GSC
eingeführt (Impressionen aus AI Overviews, AI Mode, generative AI in Discover;
Dimensionen: Seiten, Länder, Devices, Datum). **Weltweiter Rollout:
31.08.2026.** (Quellen: mariehaynes.com 03.06.2026; SEJ 31.08.2026.)

**Was man sieht — und was nicht:**

| Sichtbar | NICHT sichtbar |
|---|---|
| Impressionen aus AIO/AI Mode/GenAI-Discover | Klicks, CTR |
| Dimensionen Seiten/Länder/Devices/Datum | Query-Daten |
| Trend über Zeit | API-/BigQuery-Zugriff (UI-only, verifiziert 11.08.2026; suganthan.com 18.08.2026) |

Konsequenz: Der Report ist eine **Trend-Anzeige** (steigt/sinkt die
GenAI-Impression?), keine Zitations- oder Klick-Messung. In Kundenreports nie
als Traffic-Beleg ausgeben — 3-Säulen-Regel beachten (siehe
`taktiken-ai-suche-geo.md` §7).

**Workarounds für konversationelle AI-Queries:** Konversationelle Strings
(„yes go on", ganze Prompts) erscheinen als normale Queries im
Performance-Report (von John Mueller bestätigt). Extraktion per
**Custom-Regex-Filter** (J.-C. Chouinard, 14.08.2026) oder
**ML-Klassifikator** (Suganthan, 18.08.2026) auf den Query-Export — aufbauend
auf den Regex-Workflow in §1. **Caveat:** AI-Mode-Klick-Queries sind fast
vollständig anonymisiert (Chouinard, 12.01.2026) — Erwartung entsprechend
deckeln.

## 8. Core-Update-Kalender 2026 (Kontext für Decay-/Refresh-Interpretation)

Core-Updates laufen 2026 **~quartalsweise** (statt 2×/Jahr; dataslayer.ai,
06.01.2026, laufend aktualisiert). Relevanz für §5: Ein Decay im GSC-Export,
der in ein Update-Fenster fällt, ist **kein** Refresh-Trigger im Sinne von G4 —
erst nach Update-Abschluss (Rollout-Ende + ~2 Wochen Beruhigung) bewerten.

| Update | Zeitraum | Kurz |
|---|---|---|
| Feb 2026 Discover Core | 05.–26.02.2026 | Erstes Discover-only-Core-Update ever (lokale Relevanz hoch, Clickbait runter) |
| March 2026 Spam | 24.–25.03.2026 | <1 Tag; u. a. scaled AI content abuse |
| **March 2026 Core** | 27.03.–08.04.2026 | **Volatilste Core-Update bisher**: 79,5 % der Top-3-URLs wechselten (SE Ranking via SEL, 15.04.2026); Muster: Destinationen > Intermediäre |
| May 2026 Core | 21.05.–02.06.2026 | Noch schwerer als März (Glenn Gabe, via dataslayer.ai); fiel mit I/O-2026-Redesign zusammen |

Nächstes Update für Q3 2026 erwartet — zum Recherchezeitpunkt (Sept. 2026)
**nicht bestätigt**; vor Decay-Diagnosen die aktuelle Update-Timeline prüfen.

## 9. AI-Content-Grad nach Wettbewerbsdruck

- **Niedriger/mittlerer Wettbewerb:** KI-Content mit Knowledge-Base +
  manuellem Qualitäts-Pass funktioniert.
- **Hoher Wettbewerb:** je kompetitiver die Query, desto weniger KI-Anteil;
  First-Party-Erfahrung, eigene Daten, echte Beispiele + externe Signale
  (Backlinks, Erwähnungen) entscheiden. KI-Masse ohne Fortification verliert
  gegen starke Domains.
