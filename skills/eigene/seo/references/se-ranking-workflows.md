# SE-Ranking-Workflows — 8 priorisierte Abläufe via MCP

Jeder Workflow: Ziel → Ablauf (Tool-Reihenfolge) → Output → Belegpflicht →
Credit-Hinweis. Vor jedem Lauf gelten die Credit-Guardrails aus
`se-ranking-mcp.md` (Preflight `DATA_getSubscription` → `units_left`,
Budget-Deckel, Credit-Log). Märkte: **`ch` primär, `de` sekundär**, Sprache `de`.
Nischen: regionale Dienstleister (Handwerk, Immobilien, Treuhand) — lokale
Themen mit Ortsmodifikator.

**Schema-Regel (hart):** Tool-Parameter zur Laufzeit per `tools/list`
introspektieren; die Tool-Namen unten sind Stand 2026-09-18 und können wachsen.
Pattern übernommen aus `seranking/seo-skills` (`seo-api`, MIT @ fd6d1408) —
Idee, keine Kopie.

Output-Pfade folgen Loop 4: `client-<name>/seo/exports/`, Reports daneben.
Jeder Workflow schreibt ein Credit-Log (Datum, Tools, geschätzte/tatsächliche
Credits, `units_left` vorher/nachher) — Grundlage für Schritt-Ende
„se-ranking-research".

## 1. Keyword-Research + Clustering

**Ziel:** belegte Keyword-Basis mit Intent/Schwierigkeit, geclustert als
Pillar/Spokes — Anschluss an `taktiken-interne-verlinkung-cluster.md`.

**Ablauf:**
1. Preflight: `DATA_getSubscription` → `units_left`.
2. Seeds aus ICP/OFFER: Leistung × Ort (Pattern **Leistung × Stadt / Kanton /
   Region**, z. B. „treuhand zürich", „immobilien verkaufen aargau",
   „dachdecker winterthur").
3. Expansion je Seed: `DATA_getRelatedKeywords` (SERP-Overlap-Verwandte, mit
   `relevance`-Score), `DATA_getSimilarKeywords` (gleiche Intent),
   `DATA_getLongTailKeywords` (1 Credit/Keyword, nur Strings),
   `DATA_getKeywordQuestions` (Frage-Keywords → PAA-Kandidaten). `source=ch`
   und `source=de` getrennt ziehen, nie mischen.
4. Bulk-Metriken: `DATA_exportKeywords` (Volume, CPC, Difficulty 0–100,
   Intents `I/C/T/L/N`, 12-Monats-`history_trend` → Saisonalität regionaler
   Nachfrage).
5. Clustering per **SERP-Overlap** (kein Token-Overlap — der erzeugt
   Kannibalisierung): `DATA_getSerpResults` je Kandidat, Overlap-Schwellen
   7–10 = gleiche Seite, 4–6 = gleicher Cluster, 2–3 = interlinken, 0–1 =
   getrennt. Alternativ MCP-Prompt `keyword-clusters` (`market`, `seed_keywords`)
   als Startpunkt. Cluster-Regeln und Link-Map: `taktiken-interne-verlinkung-cluster.md`.
6. Ortsmodifikator-Achsen als eigene Spalte (Stadt / Kanton / Region), damit
   Workflow 8 (pSEO) direkt anschliessen kann.

**Output:** `client-<name>/seo/exports/ser-keywords-<markt>-<datum>.csv`
(Spalten: keyword, volume, difficulty, intents, cpc, trend, cluster, ort_achse)
+ Cluster-Map in `client-<name>/seo/ia.md` + Credit-Log.

**Belegpflicht:** jede Volume-/Difficulty-Zahl mit `[Quelle: se-ranking DATA_exportKeywords <datum>]`; Daten sind monatlich aktualisierte Vendor-DB (Quelle: https://seranking.com/api/data/keyword-research/, abgerufen 2026-09-18).

**Credit-Hinweis:** Related/Similar/Questions 10/Keyword, Longtail 1/Keyword,
Export 100/Request, SERP-Overlap 10/Keyword (standard) — Deckel vor Schritt 5
rechnen (Kandidaten × 10), bei > 500 Kandidaten-Set kürzen (Pattern
„budget guard" aus `seranking/seo-skills` `seo-keyword-cluster`, MIT).

## 2. Wettbewerber-Analyse

**Ziel:** Wettbewerber-Set, Keyword-Gap, Backlink-Gap — alles exportbelegt.

**Ablauf:**
1. Preflight + Deckel.
2. `DATA_getDomainOverviewDatabases` (`source=ch`/`de`) auf Kundendomain:
   Keywords, `traffic_sum`, Positionsverteilung als Baseline.
3. `DATA_getDomainCompetitors` (`type=organic`) — **Overflow beachten:** ohne
   `limit`/`offset` ~60 KB → Harness schreibt Datei; mit `limit` arbeiten,
   `jq`-Slice zum Lesen (Fallstrick in `se-ranking-mcp.md`).
4. Keyword-Gap: `DATA_getDomainKeywordsComparison` (`diff=1` = Gap, `diff=0` =
   Overlap) Kunde vs. Top-3-Wettbewerber; Filter Volume/Difficulty.
5. `DATA_getDomainKeywords` auf die Gap-Keywords der Wettbewerber (Positionen,
   Traffic, URLs) → Priorisierung. Paid-Sicht: `type='adv'` oder
   `DATA_getDomainAdsByDomain` (Kanal-Diagnose: wer schaltet Ads auf die
   Leistung?).
6. Backlink-Gap: MCP-Prompt **`backlink-gap`** (`my_domain`, `competitors`,
   `min_domain_trust`) als Gerüst; manuell: `DATA_getBacklinksRefDomains`
   je Wettbewerber, Schnittmenge minus eigene Refdomains
   (`DATA_getBacklinksSummary` Kunde).
7. AI-Overview-Citation-Gap (optional, teuer): `DATA_getDomainKeywords` mit
   `filter[serp_features_2]` `sge`/`without_link` (Domain rankt, wird aber in
   AI Overview nicht zitiert). Quelle: https://seranking.com/api/data/domain-analysis/ (abgerufen 2026-09-18).

**Output:** `client-<name>/seo/exports/ser-competitors-<datum>.csv` +
`ser-keyword-gap-<datum>.csv` + `ser-backlink-gap-<datum>.csv` + kurze
Einordnung in `research.md` + Credit-Log.

**Belegpflicht:** jede Zeile trägt Tool + Datum; Wettbewerber-Traffic ist
Schätzung (`traffic_sum`), im Report als Schätzung labeln.

**Credit-Hinweis:** Domain-Endpoints 100/Request, Refdomains 1/Refdomain —
Gap über 3 Wettbewerber grob 500–1.000 Credits; `limit` setzen.

## 3. Local-SEO-Loop

**Ziel:** lokale Rankings mit Geo-Targeting messen, GBP-Arbeit anbinden —
Anschluss an `taktiken-local-seo-gbp.md` (dort liegen die Taktiken; hier nur
die Mess-Schleife).

**Ablauf:**
1. Preflight + Deckel.
2. Locations auflösen: `DATA_getSerpLocations` (`country_code=ch`, `q=<stadt>`)
   → `location_id` / `google_ads_location_id` für Zürich, Bern, Aargau etc.
3. Lokale SERPs: `DATA_getSerpResults` pro „Leistung × Ort"-Keyword mit
   Location + `language_code=de`, `device=mobile` (lokal = mobil-first);
   advanced nur wenn Local-Pack/Maps-Items gebraucht werden. MCP-Prompt
   `serp-analysis` (`keyword`, `location1`, `location2`) für Orts-Vergleiche
   (z. B. Zürich vs. Bern).
4. Trend über Zeit: Rank-Tracker-Projekt mit City-Level-Engine
   (`PROJECT_createProject` + `PROJECT_addSearchEngine` + `PROJECT_addKeywords`)
   — **Write, nur nach Nutzer-Bestätigung**; Reads danach gratis
   (`PROJECT_getKeywordStats`). Engines bis City-Level belegt:
   https://seranking.com/rank-tracker-api.html (abgerufen 2026-09-18).
5. GBP/Locations-Reporting: **Local Marketing API hat (Stand 2026-09-18)
   KEINEN MCP-Namespace → nur REST, read-only** (`/v1/local-marketing/...`:
   lokale Rankings, GBP-Metriken, Citations, Reviews); Locations anlegen geht
   nur per UI. Vor Nutzung live per `tools/list` verifizieren, ob inzwischen
   Tools existieren. Quelle: https://seranking.com/api/local-marketing-api/ (abgerufen 2026-09-18).
6. Massnahmen selbst laufen in `taktiken-local-seo-gbp.md` (GBP-Profil, NAP,
   Citations, Reviews) — dieser Loop liefert nur die Zahlen dafür.

**Output:** `client-<name>/seo/exports/ser-local-serp-<ort>-<datum>.csv` +
Local-Snapshot-Tabelle (Keyword × Ort × Position × Local-Pack ja/nein) +
Credit-Log.

**Belegpflicht:** lokale Position = SERP-Export mit Location-ID + Datum; nie
„wir ranken lokal" ohne Ort + Datum.

**Credit-Hinweis:** 10/Keyword/Task (+10 advanced); ein 10-Keyword × 3-Orte-
Raster ≈ 300–600 Credits. Tracker-Reads danach 0 Credits (Plan-Quota nur beim
Setup).

## 4. Content-Briefs aus SERP-Daten

**Ziel:** Brief aus echter Top-10-Struktur — Anschluss an Loop-4-Schritt
„briefs" und `blog-delivery-contract.md` (G2, Belegpflicht).

**Ablauf:**
1. Preflight + Deckel; Ziel-Keyword kommt aus Workflow-1-Cluster.
2. `DATA_getSerpResults` (advanced) auf das Primär-Keyword (`source=ch|de`,
   Sprache `de`): Top-10-URLs, `ai_overview` ja/nein, `people_also_ask`,
   `related_searches` — **Ergebnis sofort ablegen, Retention 24 h**
   (Quelle: https://seranking.com/api/data/serp/, abgerufen 2026-09-18).
3. Optional `DATA_getSerpHtmlDump` (ZIP als MCP-Resource) für Struktur-Details.
4. Aus dem Ausriss: Top-10-Gliederung (H1/H2-Muster), Intent-Klassifikation,
   PAA-Fragen → Pflichtfragen im Brief, Featured-Snippet-/AI-Overview-Chance.
5. Keyword-Set für den Brief: `DATA_getRelatedKeywords`/`…Questions…` aufs
   Primär-Keyword (Semantik-Abdeckung).
6. Brief schreiben nach `loop4-ablauf.md` Schritt „briefs"; jede Zahl getaggt;
   Format und Gates nach `blog-delivery-contract.md`.

**Output:** `client-<name>/seo/exports/serp-<keyword-slug>-<datum>.json` +
`client-<name>/seo/briefs/<slug>.md` + Credit-Log.

**Belegpflicht:** Brief-Zahlen (Volume, Difficulty, PAA, „Top 10 zeigt …")
zeigen auf den SERP-Export; ohne Tag gilt erfunden → G2-Fail.

**Credit-Hinweis:** 20/Keyword (Task + advanced) + 10/Keyword Related —
pro Brief grob 50–100 Credits.

## 5. KI-Sichtbarkeit (AEO/GEO) — AIRT / Prompt-Tracking

**Ziel:** Beobachtungs-Snapshot der KI-Sichtbarkeit — Anschluss an
`taktiken-ai-suche-geo.md`. **Regel dort gilt hier: Beobachtung, kein Beleg.**

**Ablauf:**
1. Preflight + **harter Deckel** — AI-Search-Tools sind die teuersten
   (`DATA_getAiOverview` 800/Request, Leaderboard 7.500 flat, Prompts 200/Prompt;
   Quelle: https://seranking.com/api/data/ai-search/, abgerufen 2026-09-18).
2. Setup (Writes → **Nutzer-Bestätigung**): `PROJECT_saveSiteBrand`,
   `PROJECT_createLlmEngine` (ChatGPT, Perplexity, Gemini, AI Overview, AI Mode),
   `PROJECT_createPromptGroup`, `PROJECT_addPrompts` (Prompt-Set aus
   Kern-/Vergleichs-/Preis-Cluster, wie ki-audit-Format in SKILL.md).
3. Reads (gratis, Plan-Quota): `PROJECT_getPromptsRankings` (Positionen, URLs,
   Volume, Intent, **Organic-AI-Overlap** je Engine/Zeitraum),
   `PROJECT_getPromptAnswer` (voller Antworttext), `PROJECT_getLlmStatistics`.
   REST-Beleg AIRT: https://seranking.com/api/project/ai-result-tracker/ (abgerufen 2026-09-18).
4. Recherche ohne Projekt (teuer, sparsam): MCP-Prompt **`ai-share-of-voice`**
   (`domain`, `competitors`, `country`, `llm_engines`) als SoV-Schätzung;
   `DATA_getAiPromptsByTarget` (Prompts, bei denen die Domain auftaucht) nur
   punktuell.
5. Snapshot im Pflichtformat aus `taktiken-ai-suche-geo.md` §7: Datum, Engine,
   exakter Prompt, verlinkt/erwähnt/fehlt, Wettbewerber daneben.
   SE Visible API (projektbasiertes Brand-Tracking) ist REST-only (Stand
   2026-09-18) — live verifizieren, s. `se-ranking-mcp.md`.

**Output:** `client-<name>/seo/exports/ser-airt-<datum>.csv` +
Snapshot-Tabelle (Format taktiken-ai-suche-geo §7) + Credit-Log.

**Belegpflicht:** AI-Sichtbarkeits-Zahlen sind **Beobachtung mit Datum + Engine
+ exaktem Prompt, nie belastbare KPI** (harte Regel SKILL.md); „zitiert" und
„empfohlen" trennen.

**Credit-Hinweis:** AIRT-Reads 0 Credits (Setup = Plan-Quota); Data-AI-Tools
nur mit explizitem Budget — ein Leaderboard-Call allein frisst 7.500 Credits.

## 6. Tech-Audit + Backlinks

**Ziel:** Audit-Health + Link-Profil als Exporte — Anschluss an
`regeln-technischer-audit.md` und `tech-qa-checkliste.md`.

**Ablauf:**
1. Preflight + Deckel; Seitenzahl schätzen → Kosten = Seiten × 2 (Standard)
   bzw. × 20 (Advanced mit JS-Rendering, für SPAs).
2. `DATA_createStandardAudit` (oder `…Advanced…`) — **Write/teuer → Bestätigung**;
   Settings-Variante via `PROJECT_createAudit` nur nach Bestätigung.
3. Pollen: `DATA_getAuditStatus` (0 Credits) bis `finished`.
4. Abruf (alles 0 Credits): `DATA_getAuditReport` (`score_percent`, Issues mit
   `code`/`status`), `DATA_getCrawledPages` (Title/H1/Wortzahl/Indexability),
   `DATA_getAuditPagesByIssue` (URLs je Issue), `DATA_getFoundLinks` (interne
   Links inkl. 3xx-Filter).
5. Backlink-Profil: `DATA_getBacklinksSummary` (Refdomains, InLink Rank,
   Top-Anchors), `DATA_getBacklinksRefDomains`, `DATA_listNewLostReferringDomains`
   (New/Lost im Zeitraum). Voll-Export bei Bedarf async:
   `DATA_exportBacklinksData` + `DATA_getBacklinksExportStatus` (1 Credit/Backlink).
6. Befund-Mapping auf `tech-qa-checkliste.md` (0-Blocker-Regel bleibt hart).

**Output:** `client-<name>/seo/exports/ser-audit-<datum>.json` +
`ser-backlinks-<datum>.csv` + `client-<name>/seo/tech-qa-<datum>.md` +
Credit-Log.

**Belegpflicht:** Health-Score und Issue-Counts mit Audit-ID + Datum; Audit-
Kosten-Rechnung (Seiten × Credits) ins Credit-Log.
Quellen: https://seranking.com/api/data/website-audit/, https://seranking.com/api/data/backlinks/ (abgerufen 2026-09-18).

**Credit-Hinweis:** 1.000-Seiten-Standard-Crawl = 2.000 Credits; Advanced =
20.000 → Advanced nur bei JS-Pflicht und bestätigtem Budget. Report-Abrufe 0.

## 7. Rank-Tracking + Decay

**Ziel:** Positionen über Zeit + Decay-Trigger — Anschluss an `gsc-read.md`/
Loop-4-Schritte monitor/refresh. GSC bleibt Outcome-Wahrheit; SE-Ranking liefert
tägliche Positionen ohne GSC-Lag (GSC hat 2–3 Tage Lag, s. `gsc-read.md`).

**Ablauf:**
1. Preflight; Projekt-Setup falls nicht vorhanden: `PROJECT_createProject`,
   `PROJECT_addSearchEngine` (Google, CH/DE, City-Level bei Local),
   `PROJECT_addKeywords` (Cluster-Primär-Keywords) — **alles Writes →
   Bestätigung**, Plan-Quota (Sites/Keywords).
2. Reads (0 Credits): `PROJECT_getKeywordStats` (Positionen im Zeitraum,
   `content_score` + `content_score_change`, Landingpages, SERP-Features),
   `PROJECT_getChart` (Visibility/avg_pos/Top-10-Zeitreihen),
   `PROJECT_getCompetitorPositions` (Wettbewerber auf denselben Keywords).
3. Decay-Erkennung: Positionsverlust über Zeitraum + fallender
   `content_score_change` → Kandidatenliste; mit GSC-Export (`gsc-read.md`)
   kreuzen — **Decay-Trigger ist echter GSC-/Positionsverlust, nicht der
   Kalender** (G4, `loop4-ablauf.md`).
4. On-demand-Check bei Verdacht: `PROJECT_runPositionCheck` (Write → Bestätigung).
5. Decay-Liste → Loop-4-Schritt „refresh" (Freshness ist auch KI-Zitier-Hebel).

**Output:** `client-<name>/seo/exports/ser-positions-<datum>.csv` +
Decay-Liste in `refresh-<datum>.md` + Credit-Log.

**Belegpflicht:** Positionen mit Tool + Datum; im Report trennen:
SE-Ranking-Position (täglich) vs. GSC avg. Position (Lag) — nie mischen.
REST-Beleg: https://seranking.com/api/project/project-management/ (abgerufen 2026-09-18).

**Credit-Hinweis:** Tracker-Reads 0 Credits; Kosten sitzen in der Plan-Quota
(getrackte Keywords) — Setup deshalb Bestätigungs-Gate.

## 8. Programmatic SEO (Leistung × Region)

**Ziel:** Datenbasis für Leistung × Stadt/Kanton/Region — Anschluss an
`taktiken-programmatic-seo.md` (Templates, Thin-Content-Gates, Indexierungs-
Kontrolle laufen dort).

**Ablauf:**
1. Preflight + Deckel; Achsen definieren: Leistungen (aus ICP) × Regionen
   (Stadt/Kanton, `DATA_getSerpLocations` zur Validierung).
2. Matrix-Metriken: `DATA_exportKeywords` auf die volle Leistung×Region-Matrix
   (Bulk bis 5.000 Keywords/Request, `source=ch` bzw. `de`) → Volume/Difficulty/
   Intent je Zelle. Zellen ohne Volumen fliegen raus (keine Thin-Pages bauen).
3. Nachfrage-Trend: `history_trend` aus dem Export → saisonale Regionen
   erkennen.
4. SERP-Check je Template-Zelle (Stichprobe): `DATA_getSerpResults` — rankt
   Google lokale Seiten oder Verzeichnisse? Das entscheidet den Seitentyp
   (Pattern-Regeln in `taktiken-programmatic-seo.md`).
5. Wettbewerbs-Dichte je Zelle: `DATA_getDomainCompetitors` auf den
   stärksten Zellen (mit `limit`!).

**Output:** `client-<name>/seo/exports/ser-pseo-matrix-<datum>.csv`
(Zeilen = Leistung × Region, Spalten: volume, difficulty, intent, trend,
serp_typ) + Seitentyp-Empfehlung je Cluster + Credit-Log.

**Belegpflicht:** Matrix-Zahlen = Bulk-Export mit Datum; „kein Volumen" ist
auch ein Befund (Zelle streichen, nicht erfinden).

**Credit-Hinweis:** 100/Request für bis zu 5.000 Keywords → die Matrix ist
günstig; teuer wird nur der SERP-Check — auf Stichprobe begrenzen
(z. B. 20 Zellen × 10 Credits).

## Quellen

Alle API-Fakten: Recherche 2026-09-18 (`se-ranking-mcp.md`, dort je Aussage
mit URL). Patterns (Laufzeit-Introspektion, Credit-Preflight, Budget-Deckel,
Bestätigungs-Gate, SERP-Overlap-Schwellen) adaptiert aus
https://github.com/seranking/seo-skills (MIT @ fd6d1408, abgerufen 2026-09-18) —
Ideen/Struktur, keine wörtliche Übernahme.
