# SE-Ranking-MCP — Setup, Tool-Landschaft, Credit-Guardrails

Datenquelle für Keyword-, Domain-, SERP-, Backlink-, Audit- und KI-Sichtbarkeits-
Daten über den offiziellen SE Ranking MCP Server. Primärmarkt: `ch` und `de`,
Sprache `de` (regionale Dienstleister: Handwerk, Immobilien, Treuhand).
Recherche-Stand aller Fakten unten: **2026-09-18** — jede Zeile zeigt ihre Quelle.
Was dort unklar ist, bleibt hier unklar markiert.

**Harte Regel vorweg:** Tool-Schemas zur Laufzeit introspektieren (`tools/list`),
nie hart kodieren. Die Tool-Fläche wächst (Doku „160+ tools", Seiten-Datum
2026-05-29; Produktseite „180+ SEO- und GEO-Tools", Seiten-Datum 2026-07-30) —
die exakte Ist-Zahl ist nur live ermittelbar.
Quellen: https://seranking.com/api/integrations/mcp/ (2026-05-29), https://seranking.com/mcp.html (2026-07-30), abgerufen 2026-09-18.

## Setup

### Gehosteter Remote-MCP (primärer Weg)

| Eigenschaft | Wert |
|---|---|
| Endpoint | `https://api.seranking.com/mcp` |
| Transport | Remote MCP, Streamable HTTP (ältere Clients: `mcp-remote`-Bridge) |
| Auth | **OAuth 2.1** mit dynamischer Client-Registrierung (RFC 9628, Browser-Flow beim ersten Connect) — alternativ **`X-Api-Key: <key>`**-Header (headless/CI; Key aus dem API Dashboard) |
| Verfügbarkeit | In **jedem Paid-Plan** enthalten, läuft auf die API-Credits des Plans; auch standalone per Pay-as-you-go (ab $50 / 250.000 Credits, Wallet-Credits verfallen nie) |

```bash
# Option A: OAuth (empfohlen) — danach einmal /mcp in der Session für den Flow
claude mcp add --transport http se-ranking https://api.seranking.com/mcp

# Option B: API-Key (headless/CI)
claude mcp add --transport http se-ranking https://api.seranking.com/mcp \
  --header "X-Api-Key: *****"
```

Quellen: https://seranking.com/api/integrations/mcp/ (2026-05-29), https://seranking.com/mcp.html (2026-07-30), https://github.com/seranking/seo-skills (CHANGELOG v2.6.0: OAuth 2.1/RFC 9628), https://seranking.com/api-pricing.html — alle abgerufen 2026-09-18.

- **Sub-Accounts:** OAuth-Login von Sub-Accounts verbindet keine Tools (API lebt am Master-Account) → API-Key des Master-Accounts eintragen. Eigene Sub-Account-Keys „on the way".
  Quelle: https://seranking.com/api/integrations/mcp/ (abgerufen 2026-09-18)
- **Ein Key für alles:** Ein einziger API-Key autorisiert Data API und Project API; was aufrufbar ist, hängt vom Tarif ab, nicht vom Key.
  Quelle: https://seranking.com/api/project/getting-started/ (abgerufen 2026-09-18)

### Self-Hosted-Variante (Legacy, ehrlich markiert)

Das offizielle Open-Source-Repo `seranking/seo-data-api-mcp-server` ist **Stand
2026-09-18: 404** (Org listet nur noch `seo-skills`, `n8n-nodes-seranking`,
OpenAPI-Spec u. a.). Erhalten ist ein Fork: `TeamDay-AI/se-ranking-mcp`
(„fork with per-request credential support"), dessen README das Original
wiedergibt. **Unklar, ob Self-Hosted offiziell deprecated ist** — der gehostete
Remote-MCP ist eindeutig der gepflegte Weg. Falls doch self-hosted: stdio via
Docker oder HTTP (`http://0.0.0.0:5000/mcp`), **zwei getrennte Legacy-Tokens**
(`DATA_API_TOKEN` UUID + `PROJECT_API_TOKEN` 40-stellig hex) statt einem Key.
Quellen: https://github.com/TeamDay-AI/se-ranking-mcp, https://github.com/orgs/seranking/repositories (geprüft 2026-09-18).

## Tool-Landschaft: DATA_* vs. PROJECT_*

Zwei Präfix-Namespaces, exakt entlang der REST-Schichten:

| Präfix | REST-Schicht | Rate Limit | Abrechnung |
|---|---|---|---|
| `DATA_*` | Data API (`api.seranking.com/v1/...`) | **10 RPS** | **API-Credits** pro Call |
| `PROJECT_*` | Project API (`/v1/project-management/...`) | **5 RPS** | **Reads gratis**; **Writes konsumieren Plan-Quota-Slots** (Sites, Keywords, Audit-Pages …) |

Limits gelten pro Key, rollierendes 1-Sekunden-Fenster; Überschreitung → HTTP 429,
wiederholt → 10-Minuten-Sperre, eskalierend. Trial-Accounts: 1 RPS.
Quellen: https://github.com/seranking/seo-skills (README „Rate limits and costs"), https://seranking.com/api/rate-limits/ — abgerufen 2026-09-18.

### Wichtigste Tools je Bereich

| Bereich | Tools (Auswahl) |
|---|---|
| Account/System | `DATA_getSubscription` (0 Credits, Preflight), `DATA_getCreditBalance`, `PROJECT_getUserProfile`, `PROJECT_getAvailableRegions`, `PROJECT_getAvailableSearchEngines`, `PROJECT_getSearchVolume` |
| Keyword-Research | `DATA_exportKeywords` (Bulk-Metriken), `DATA_getSimilarKeywords`, `DATA_getRelatedKeywords`, `DATA_getKeywordQuestions`, `DATA_getLongTailKeywords` |
| Domain/Competitor | `DATA_getDomainOverviewDatabases`, `DATA_getDomainOverviewWorldwide`, `DATA_getDomainOverviewHistory`, `DATA_getDomainKeywords`, `DATA_getDomainKeywordsComparison`, `DATA_getDomainCompetitors`, `DATA_getDomainPages`, `DATA_getDomainAdsByDomain`, `DATA_getDomainAdsByKeyword` |
| SERP | **`DATA_getSerpResults`** (Komfort-Wrapper: legt Task an, pollt automatisch bis fertig, liefert standard oder advanced inkl. `ai_overview`/Maps/Reviews), `DATA_getSerpTasks`, `DATA_getSerpTaskResults`, `DATA_getSerpTaskAdvancedResults`, `DATA_getSerpHtmlDump`, `DATA_getSerpLocations` |
| Backlinks (Data) | `DATA_getBacklinksSummary`, `DATA_getBacklinksMetrics`, `DATA_getAllBacklinks`, `DATA_getBacklinksRaw`, `DATA_getBacklinksAnchors`, `DATA_getBacklinksRefDomains`, `DATA_getDomainAuthority`, `DATA_listNewLostReferringDomains`, `DATA_exportBacklinksData` (async) |
| Audit | `DATA_createStandardAudit`, `DATA_createAdvancedAudit`, `DATA_listAudits`, `DATA_getAuditStatus`, `DATA_getAuditReport`, `DATA_getCrawledPages`, `DATA_getAuditPagesByIssue`, `DATA_getFoundLinks`; Project-Varianten `PROJECT_createAudit` ff. mit Settings-Verwaltung |
| Rank-Tracker | `PROJECT_listProjects`, `PROJECT_createProject`, `PROJECT_addKeywords`, `PROJECT_getKeywordStats`, `PROJECT_runPositionCheck`, `PROJECT_getChart`, Keyword-Gruppen/Tags; Competitors im Projekt: `PROJECT_addCompetitor`, `PROJECT_getCompetitorPositions` |
| AIRT (Prompt-Tracking) | `PROJECT_saveSiteBrand`, `PROJECT_createLlmEngine`, `PROJECT_listLlmEngines`, `PROJECT_addPrompts`, `PROJECT_listPrompts`, `PROJECT_getPromptAnswer`, `PROJECT_getPromptsRankings`, Prompt-Gruppen `PROJECT_createPromptGroup` ff. |
| Backlink-Monitoring (Project) | `PROJECT_addProjectBacklink`, `PROJECT_listProjectBacklinks`, `PROJECT_getBacklinkStats`, Disavow-Tools, GSC-Import |
| Analytics | `PROJECT_getGoogleSearchConsole`, `PROJECT_getSeoPotential` |

Vollständige Liste (Self-Hosted-Stand; gehosteter Server deckt denselben Umfang ab und wächst):
https://github.com/TeamDay-AI/se-ranking-mcp (Abschnitte „Available Tools"/„Available Prompts", abgerufen 2026-09-18).
**Parameter stehen in den Tool-`description`-Feldern (JSON-Schema) — live per
Introspektion abrufbar, aber OHNE Credit-Kosten** (s. Credit-Guardrails).

### Eingebaute MCP-Prompts (server-seitige Templates)

| Prompt | Argumente | Zweck |
|---|---|---|
| `serp-analysis` | `keyword`, `location1`, `location2`, `language`, `device` | Zwei SERP-Tasks, Top-10-Vergleich zweier Locations |
| `backlink-gap` | `my_domain`, `competitors`, `min_domain_trust` | Backlink-Gap-Analyse |
| `domain-traffic-competitors` | `domain` | Traffic + Top-Competitors + Empfehlungen |
| `keyword-clusters` | `market`, `seed_keywords` | Related/Similar ziehen, deduplizieren, nach Intent clustern |
| `ai-share-of-voice` | `domain`, `competitors`, `country`, `llm_engines` | AI-Search-SoV-Schätzung vs. Wettbewerber |

Quelle: https://github.com/TeamDay-AI/se-ranking-mcp (abgerufen 2026-09-18).

## Credit-Guardrails (PFLICHT)

1. **Preflight vor jedem grösseren Lauf:** `DATA_getSubscription` aufrufen
   (0 Credits), `units_left` notieren — das ist die Forecast-Grösse.
2. **`DATA_getCreditBalance` NICHT für Forecasts nutzen:** `{limit, used}` und
   `DATA_getSubscription.subscription_info.units_left` liefern **nicht konsistente
   Rest-Credit-Werte** (Live-Differenz ~8,6 Mio. beobachtet). Source of Truth:
   `units_left`.
   Quelle: https://github.com/seranking/seo-skills/blob/main/CHANGELOG.md (v2.10.1, mit Live-Verifikation, abgerufen 2026-09-18)
3. **Tool-Descriptions enthalten KEINE Credit-Kosten** (von SE Rankings eigenem
   Smoke-Test verifiziert) → Kosten aus der REST-Doku mappen (Tabelle unten).
   Quelle: https://github.com/seranking/seo-skills/blob/main/skills/seo-api/SKILL.md (abgerufen 2026-09-18)
4. **Budget-Deckel pro Lauf** (Pattern `ceiling` aus `seranking/seo-skills`):
   vor dem Lauf geschätzte Kosten summieren, gegen `units_left` UND gegen den
   Lauf-Deckel prüfen; bei Überschreitung Umfang kürzen oder Nutzer fragen.
5. **Pacing:** sequentiell innerhalb 10 RPS (`DATA_*`) / 5 RPS (`PROJECT_*`);
   bei 429 zurückstufen, nicht parallel nachschiessen.
6. **Credit-Log:** jeder Lauf dokumentiert Abrufdatum, Tools, geschätzte vs.
   tatsächliche Credits (Export-Datei, s. `se-ranking-workflows.md`).

Kosten-Spickzettel (aus der REST-Doku, auf MCP-Tools gemappt; Stand 2026-09-18):

| Aktion / Tool-Familie | Credits |
|---|---|
| `DATA_exportKeywords` (Bulk bis 5.000 Keywords) | 100 / Request |
| `DATA_getSimilarKeywords` / `…Related…` / `…Questions` | 10 / Keyword |
| `DATA_getLongTailKeywords` | 1 / Keyword |
| `DATA_getDomain*` (Domain-Endpoints) | 100 / Request |
| `DATA_getSerpResults` (Task) | 10 / Keyword (+ 10 advanced) |
| `DATA_getBacklinksSummary` | 100 / Target |
| `DATA_getBacklinksRefDomains` | 1 / Refdomain |
| `DATA_getDomainAuthority` / Page | 5 / Target |
| `DATA_createStandardAudit` / `…Advanced…` | 2 / Seite (HTML), 20 / Seite (JS) |
| `DATA_getAiOverview` | 800 / Request |
| `DATA_getAiOverviewLeaderboard` | 7.500 (flat) |
| `DATA_getAiPromptsByBrand` / `…ByTarget` | 200 / Prompt |
| Audit-Report-Abrufe, SERP-Status, Locations, Subscription | 0 |

Quellen: https://help.seranking.com/hc/en-us/articles/21487397355420-API-pricing, https://seranking.com/api-pricing.html, https://seranking.com/api/data/keyword-research/, https://seranking.com/api/data/serp/, https://seranking.com/api/data/website-audit/, https://seranking.com/api/data/ai-search/ — alle abgerufen 2026-09-18.
Fehlgeschlagene Requests kosten nichts; bei leerem Konto: „Insufficient funds. API
key is temporarily disabled." (Overage standardmässig deaktiviert).
Quelle: https://help.seranking.com/hc/en-us/articles/21487397355420-API-pricing (abgerufen 2026-09-18)

## Fallstricke

- **Transport-Overflow bei grossen Responses:** `DATA_getDomainCompetitors` ohne
  `limit`/`offset` liefert ~60 KB → die MCP-Harness speichert die Response in
  eine **Datei** (Wiederherstellung via `jq`-Slice). Bei Competitor- und grossen
  Keyword-Dumps immer mit Datei-Fallback rechnen und `limit` setzen.
  Quelle: https://github.com/seranking/seo-skills/blob/main/CHANGELOG.md (v2.10.0, abgerufen 2026-09-18)
- **`DATA_getAdsStats` existiert NICHT.** Ads-Daten via `DATA_getDomainKeywords`
  mit `type='adv'` (bzw. `PROJECT_getAdsStats` im Projekt-Kontext).
  Quelle: https://github.com/seranking/seo-skills/blob/main/CHANGELOG.md (v1.0.1, abgerufen 2026-09-18)
- **Project-Writes brauchen Bestätigungs-Gate:** mutierende `PROJECT_*`-Calls
  (create/add/update/delete, Audit-Start, AIRT-Setup) konsumieren Plan-Quota —
  nur nach expliziter Nutzer-Bestätigung (so handhabt es der offizielle
  `seo-api`-Skill). Read-only-Calls laufen ohne Gate.
  Quelle: https://github.com/seranking/seo-skills/blob/main/skills/seo-api/SKILL.md (abgerufen 2026-09-18)
- **SERP-Retention:** SERP-Task-Ergebnisse werden nur **24 h** gespeichert, dann
  gelöscht → Ergebnisse sofort als Export-Datei ablegen. SERP-API ist **nur
  Google** (Bing/Yahoo „in development", Stand Doku).
  Quelle: https://seranking.com/api/data/serp/ (abgerufen 2026-09-18)
- **Schema-Bruch bei historischen Domain-Keywords:** `/v1/domain/keywords` mit
  `year`+`month` liefert ein anderes Response-Schema (`previous_position` statt
  `prev_pos`, `volume`/`traffic` als String, Intents als Langform) — Client muss
  branchen. Retention der Snapshots nicht beziffert („retention window" ohne Zahl).
  Quelle: https://seranking.com/api/data/domain-analysis/ (abgerufen 2026-09-18)
- **ID-Auflösung zuerst:** braucht ein Tool eine ID (Projekt, Search-Engine,
  Location), erst den passenden `*list*`/`*available*`-Call (`PROJECT_listProjects`,
  `DATA_getSerpLocations`, `PROJECT_getAvailableRegions`).

## Was MCP (Stand Recherche) NICHT abdeckt

- **SE Visible API** und **Local Marketing API**: kein `SEVISIBLE_*`-/`LOCAL_*`-
  Namespace in der bekannten Tool-Liste → **nur REST** (`/v1/se-visible/...`,
  `/v1/local-marketing/...`, Local Marketing read-only). **Unklar**, ob der
  gehostete Server (180+ Tools) diese inzwischen abdeckt → **live per `tools/list`
  verifizieren, nicht annehmen.**
  Quellen: https://github.com/TeamDay-AI/se-ranking-mcp (Tool-Liste), https://seranking.com/api/se-visible/, https://seranking.com/api/local-marketing-api/ — abgerufen 2026-09-18
- **Keyword-Clustering:** kein eigener Daten-Endpoint; MCP-Prompt
  `keyword-clusters` + Client-seitiges SERP-Overlap-Clustering auf Standard-Tools
  (s. `se-ranking-workflows.md` Workflow 1).
- **Content Marketing Suite** (Content Editor, Briefs, AI Writer): keine API-
  Endpunkte dokumentiert; Briefs entstehen bei uns aus SERP-Daten (Workflow 4).
  Quelle: https://seranking.com/api/project/project-management/ (abgerufen 2026-09-18)
- Weiterhin REST-only bzw. UI-only: Report Builder, SMM, Insights/Page Changes.
  Quelle: https://seranking.com/api/data/ (Doku-Navigation, abgerufen 2026-09-18)

## Belegpflicht für MCP-Outputs

MCP-Outputs sind **Exporte im Sinne der Belegpflicht**: jede Zahl im Report trägt
Tool + Abrufdatum (Format: `[Quelle: se-ranking <tool> <datum>]`, Datei unter
`client-<name>/seo/exports/`). GSC bleibt die Outcome-Wahrheit für eigene
Rankings (Impressions/Klicks/CTR); SE-Ranking-Daten sind Vendor-Datenbank
(monatlich aktualisiert) bzw. Live-SERP — nicht mit GSC-Zeilen vermischen.
Quelle zur Aktualisierung: https://seranking.com/api/data/keyword-research/ (abgerufen 2026-09-18)
