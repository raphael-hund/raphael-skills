---
name: seo
version: 2.1.0
description: >
  Advanced SEO für Service Businesses / regionale Dienstleister (Handwerk,
  Immobilien, Treuhand, Ärzte, Anwälte, Beratungen) — für Google UND
  KI-Suche (Loop 4): Keyword-/SERP-Research,
  Informationsarchitektur, Briefs, Produktion, Tech-QA, GSC-Monitoring,
  Refresh, Linkbuilding/Digital-PR, lokale SEO/GBP, AI-Sichtbarkeit (AEO/GEO),
  E-E-A-T, SERP-Feature-Analyse, interne Verlinkung/Cluster, Google-Ranking-Plan,
  KI-Suche (AI Overviews, AI Mode, ChatGPT, Perplexity, Bing Copilot),
  Programmatic SEO, Search-Everywhere-Optimierung, Citation Outreach,
  Graustufen/asozial/gray-hat. SE-Ranking-MCP-Anbindung: Keyword-Research +
  Clustering, Wettbewerber-/Keyword-Gap-Analyse, Local-SEO-Loop, Content-Briefs
  aus SERP-Daten, AIRT/Prompt-Tracking, Tech-Audit + Backlinks, Rank-Tracking
  + Decay, Programmatic-SEO-Datenbasis (Märkte CH/DE, Sprache de).
  Trigger: "SEO", "Keyword-Research", "Content-Brief", "Ranking", "Ranking-Plan",
  "Tech-Audit", "Backlinks", "Digital PR", "Statistikseite", "AI-Sichtbarkeit",
  "AEO", "GEO", "GSC", "Local SEO", "GBP", "E-E-A-T", "SERP-Feature",
  "Featured Snippet", "Themen-Cluster", "interne Verlinkung", "Graustufen",
  "asozial SEO", "gray-hat", "gray hat", "Citation Outreach", "LLM mentions",
  "programmatic SEO", "pSEO", "Search Everywhere", "Reddit SEO",
  "Query Fan-Out", "in ChatGPT sichtbar", "Perplexity Zitation",
  "Content-Decay", "topical authority", "SE Ranking", "SE-Ranking",
  "SE Ranking MCP", "MCP", "AIRT", "Prompt-Tracking", "Keyword-Gap",
  "Backlink-Gap", "DATA_getSerpResults", "Credit-Preflight", "GA4",
  "AI-Referral", "Generative AI Reports", "Google Trends SEO".
class: F
scope: agency
sensitivity: internal
source: >
  eigene Basis + vendorierte Taktik-Bibliothek: coreyhaines-marketingskills
  (MIT, seo-audit/ai-seo/programmatic-seo/schema/directory-submissions/
  competitors) @ 67264763; qwoted-seo-backlinks-skill (MIT) @ 3ef97c52;
  distribb-skill (kein LICENSE, nur Paraphrase/Ideen, keine wörtliche
  Übernahme) @ f86596ce; AgriciDaniel/claude-seo (MIT) @ 6cf1ea9;
  AgriciDaniel/claude-blog (MIT) @ 49842ea9 (5-Gate-Delivery-Contract);
  Named-Source-Mechaniken 2026-08 (Borja/Edward/Tony/Brain/YouTube; buildinpublic/Sturm, Diamante, Sanders/StudioHawk, Patel);
  mal_shaik/wespreadjam Vercel-Citation-Audit 2026-09-07 (Owned Assets, Vergleichs-Hub, Preis-Prompt-Lücke);
  @borjafat 22 X-Artikel 28.07. bis 07.09.2026 als Playbook-Bibliothek (references/playbooks-borjafat.md);
  @borjafat 6 X-Artikel 09.09. bis 18.09.2026 (Playbooks-Update, plus 2 Zusatzfunde
  12.08./04.09.); Details references/playbooks-borjafat.md Artikel-Index;
  Recherche-Runde 2026-09-15 via agent-reach (YouTube-Transkripte: Ahrefs, Patel,
  Gotch, Surfer, Exposure Ninja; X: jakezward, harpreetchatha_, iannuttall,
  seo_bint_ejamil, ConnorShowler; Web: llms.txt-Evidenz, AIO-Studien) —
  Details references/quellen-2026-09.md.
  v1.1.0 = Merge aus VPS v0.8.0 (Citation Outreach, Borja-Playbooks,
  Creator-Lehren) + v1.0.0 (Recherche 2026-09).
  v2.0.0 = SE-Ranking-MCP-Integration: eigene API-Recherche 2026-09-18
  (seranking.com/api-Doku, KB, Preise, MCP-Doku; Belege mit Datum in
  references/se-ranking-mcp.md) + seranking/seo-skills (MIT, offizieller
  Skills-Katalog) @ fd6d1408 — Patterns adaptiert (Laufzeit-Introspektion,
  Credit-Preflight, Budget-Deckel, Bestätigungs-Gate, SERP-Overlap-Schwellen),
  keine wörtliche Übernahme.
  Recherche-Runde 2026-09-18 (Lücken 2026: Multi-Plattform-GEO,
  AIRT-Methodik, GSC AI Reports).
  v2.1.0 = Modell-Agnostik (keine Ausführungs-Modell-Festlegung), Fokus auf
  Service Businesses — SaaS-/E-Com-/Startup-Inhalte entfernt.
loads:
  - references/wissens-router.md
  - references/loop4-ablauf.md
  - references/blog-delivery-contract.md
  - references/tech-qa-checkliste.md
  - references/regeln-technischer-audit.md
  - references/regeln-schema-markup.md
  - references/regeln-eeat.md
  - references/taktiken-ai-suche-geo.md
  - references/taktiken-search-everywhere.md
  - references/taktiken-content-strategie.md
  - references/taktiken-gsc-workflows.md
  - references/taktiken-programmatic-seo.md
  - references/taktiken-linkbuilding-digitalpr.md
  - references/taktiken-content-distribution.md
  - references/taktiken-local-seo-gbp.md
  - references/taktiken-serp-features.md
  - references/taktiken-interne-verlinkung-cluster.md
  - references/ideen-ai-sichtbarkeit-aeo.md
  - references/ranking-plan.md
  - references/gsc-read.md
  - references/ga4-ki-traffic.md
  - references/se-ranking-mcp.md
  - references/se-ranking-workflows.md
  - references/quellen-2026-08.md
  - references/quellen-2026-09.md
  - references/creator-lehren-2026-08.md
  - references/playbooks-borjafat.md
requires_skills: [copywriting@^0, eval@^0]
completion_criteria:
  - "Tech-QA 0 Blocker (Meta/Schema/Canonical/Links) — G1 hart"
  - "G2 auf jedem Ship-Text >= 0.7"
  - "Belegpflicht: jede Zahl/Behauptung im Brief zeigt auf echten Export (SERP/GSC) — nichts erfunden"
  - "Publish nur mit Raphaels Signatur"
  - "Ranking-Plan (wenn angefordert) enthält Keyword-Ziele, Google-Aktionen, KI-Aktionen für AI Overviews, AI Mode, ChatGPT, Perplexity und Bing Copilot, Beleg-Zeiger, 30- und 90-Tage-Schritte"
  - "AI-Sichtbarkeits-Claims nur als Beobachtung mit Datum + Engine + Query, nie als belastbare KPI"
  - "GSC nur read-only Snapshot mit Query-/Page-Zeilen oder ehrlicher Setup-Fallback"
  - "Graustufen nur nach Raphaels Go, jede Taktik mit Risiko-Label Penalty/Ban/rechtlich"
  - "Citation Outreach: doctor, schema, idempotenter Demo-Lauf, kein external side effect"
  - "SE-Ranking: Credit-Preflight (DATA_getSubscription units_left) vor grösseren DATA_*-Läufen dokumentiert, Budget-Deckel eingehalten, Credit-Log liegt bei"
  - "SE-Ranking: Project-Writes (Rank-Tracker-Setup, Audit-Start, AIRT-Setup) nur nach dokumentierter Nutzer-Bestätigung"
  - "SE-Ranking-MCP-Outputs sind Exporte im Sinne der Belegpflicht: jede Zahl mit Tool + Abrufdatum, Export-Datei abgelegt"
---

# seo — Advanced SEO (Google + KI-Suche, Loop 4)

**Lies zuerst:** `/root/02 CLIENTS/<slug>/wiki/ICP.md`, `OFFER.md`, `VOICE.md`,
`/root/01 COMPANY/icp/` und `/root/01 COMPANY/voice/`. Stil über **copywriting**.

## Grundverständnis 2026

1. **SEO ist der Hebel für KI-Sichtbarkeit, nicht ihr Gegner.** LLMs mit
   Websuche nutzen dieselben Rankings/Autoritätssignale. Niemals Google-
   Rankings für "GEO-Tricks" opfern (Recovery kann 2–3 Jahre dauern).
2. **Mentions ≠ Zitationen ≠ Empfehlungen** — drei Stufen, drei Hebel, im
   Report immer trennen.
3. **Keine KI-Abkürzung.** llms.txt: offiziell wirkungslos für Google
   (Docs 2026-06-15), keine messbare Korrelation (300k-Domain-Studie).
   Content-Chunking "für KI": von Google abgeraten. Was wirkt: gutes SEO +
   extrahierbare Struktur + Marken-Erwähnungen auf Drittseiten.
4. **Suche passiert überall** (Reddit, YouTube, TikTok, Amazon, ChatGPT).
   Strategische Präsenz auf 2–3 Plattformen nach RICE — siehe
   `taktiken-search-everywhere.md`.

## Zweck

Aus belegter Suchintention Content bauen, der in Google **und** in KI-Suche
sichtbar wird, und bei Decay auffrischen.

## Zweig wählen (eine Datei extra, nicht alles in einem Lauf)

| Anliegen | Datei |
|---|---|
| Loop-4, Gates, Belegpflicht | `references/loop4-ablauf.md` |
| Blog 5-Gate vor Ship | `references/blog-delivery-contract.md` |
| Publish-Blocker | `references/tech-qa-checkliste.md` |
| Crawl/CWV/On-Page | `references/regeln-technischer-audit.md` |
| JSON-LD | `references/regeln-schema-markup.md` |
| E-E-A-T / YMYL | `references/regeln-eeat.md` |
| Keyword/SERP + Beleg | `references/loop4-ablauf.md` (research) + echter Export |
| **KI-Suche 2026** (Query Fan-Out, Engine-Matrix, Messung, Placebo-Liste) | `references/taktiken-ai-suche-geo.md` |
| **Search Everywhere** (Plattform-Codes, RICE, Aktions- vs. Info-Queries) | `references/taktiken-search-everywhere.md` |
| **Content-Strategie** (Buyer-Journey-Cluster, Personas, Lead-Gen-Einbettung, Saisonalität, eigene Studien) | `references/taktiken-content-strategie.md` |
| **GSC-Workflows** (Regex-Extraktion, Page-Exporte, SERP-Varianz-Test, Sprints, Knowledge-Base) | `references/taktiken-gsc-workflows.md` |
| **Programmatic SEO** (Patterns, Daten, Templates, Indexierungs-Kontrolle, Skalierung) | `references/taktiken-programmatic-seo.md` |
| IA / Cluster / interne Links | `references/taktiken-interne-verlinkung-cluster.md` |
| Links / Authority / Digital PR | `references/taktiken-linkbuilding-digitalpr.md` |
| Distribution (IG-Carousel, Newsjacking, Vergleichsseiten, Onboarding) | `references/taktiken-content-distribution.md` |
| Local / GBP | `references/taktiken-local-seo-gbp.md` |
| SERP-Features | `references/taktiken-serp-features.md` |
| GSC-Monitor / Refresh | `references/gsc-read.md` + loop4 monitor/refresh |
| **GA4 / KI-Traffic-Messung** (AI-Referral, Conversions aus KI-Traffic, 3-Säulen-Regel) | `references/ga4-ki-traffic.md` |
| **GSC Generative AI Reports** (nur Impressionen, Workarounds, Core-Update-Kalender 2026) | `references/gsc-read.md` + `references/taktiken-gsc-workflows.md` §7/§8 |
| **SE-Ranking-MCP** (Setup, Tool-Landschaft, Fallstricke) | `references/se-ranking-mcp.md` |
| **SE-Ranking-Workflows** (Keyword-Research+Clustering, Wettbewerber, Local-Loop, SERP-Briefs, AIRT, Audit+Backlinks, Rank-Tracking+Decay, pSEO) | `references/se-ranking-workflows.md` |
| **Credit-Guardrails** (Preflight, Budget-Deckel, Credit-Log) | `references/se-ranking-mcp.md` Abschnitt „Credit-Guardrails" — PFLICHT |
| **Google-Ranking-Plan** | `references/ranking-plan.md` + `scripts/ranking_plan.py` |
| **KI-Suche Grundlagen** (Engines namentlich, Citability, Owned Assets) | `references/ideen-ai-sichtbarkeit-aeo.md` |
| **Graustufen / asozial** | `references/graustufen.md` — nur nach Raphael-Go |
| **Citation Outreach / LLM mentions** | `references/citation-outreach-automation.md` + `scripts/citation_outreach.py` |
| **Owned Assets / Vergleichs-Hub / Preis-Prompt-Lücke** (KI-Zitate, Hypothesen) | `references/ideen-ai-sichtbarkeit-aeo.md` Abschnitt „Owned Assets" + Brain `seo-owned-assets-und-vergleichs-hub-fuer-ki-zitate.md` |
| **Borja-Playbooks** (Buy-Intent-Seitentypen, GSC-Regex und Lücken-Loop, Page-Refresh, Topical Map, Information Gain, 4 kontextuelle Links, Statistikseite, Linkbuilding-Taktiken inkl. Customer-Story-Links, Trojan-Listicle, Journalisten-Score, LinkedIn, YouTube, Google-Trends-Rising, GEO-Loops, Local-Wochenloop, Agent-Jobs, Tier-Liste) | `references/playbooks-borjafat.md` |
| **Creator-Lehren** (Audience-first, Mentions > Backlinks, Search Everywhere im Brain) | `references/creator-lehren-2026-08.md` |
| Named-Source-Mechaniken kurz | `references/quellen-2026-08.md`, `references/quellen-2026-09.md` |
| Spezialtiefe | `references/wissens-router.md` |

Alle Nachschlageziele liegen in `references/` dieses Skills. Lade **1–3 Seiten**, nie alle.

## On-Page für Loop 2 (Website-Bau)

Fährt der web-Skill die **Plan-Session**, liefert seo nur die On-Page-Grundlage:
Keyword je Route, Sitemap-Entscheidung, Title-/Meta-/H1-Vorgabe — als Text ins
`PLAN.md`. Kein SERP-Export, kein Ranking-Plan, kein technischer Audit; das
Loop-4-Vollprogramm oben läuft nur bei ausdrücklichem SEO-Auftrag. Geprüft wird
die Grundlage später deterministisch mit
`web/scripts/onpage-check.mjs` (QA-Fach 5 G1). Vertrag auf der Web-Seite:
`web/references/rolle-plan.md`.

## Ablauf

1. **research** — SERP-Ausriss + GSC-Export ablegen. Der SERP-Ausriss kann
   jetzt via SE-Ranking-MCP kommen (`DATA_getSerpResults`, auto-polling,
   advanced inkl. AI Overview/PAA; Ergebnis sofort ablegen, Retention 24 h) —
   GSC bleibt Pflicht-Outcome-Quelle. G1.
2. **ia** — Cluster/Pillar (SERP-Overlap, nicht Bauch). G2.
3. **briefs** — jede Zahl mit Quelle+Datum. G2.
4. **produce** — Intent-Konsistenz Title/Meta == Seite; extrahierbare
   Antwortblöcke sind Standard (siehe taktiken-ai-suche-geo). G1-Stil → G2.
5. **tech-qa** — 0 Blocker, hart.
6. **Publish** — Raphaels Signatur.
7. **monitor** — `scripts/gsc_read.py --live` oder Setup-Fallback. Nur lesen.
   Plus AI-Sichtbarkeits-Snapshot (Pflichtformat in taktiken-ai-suche-geo §7).
8. **refresh** — bei echtem Decay (G4), nicht nach Kalender. Freshness ist
   auch ein KI-Zitier-Hebel.
9. **ranking-plan** (eigener Zweig) — Skript auf denselben Exporten.

Kanal-Diagnose und Brand-Protect: `references/loop4-ablauf.md`.

## Schritt-Ende (prüfbar)

- research fertig = SERP-Ausriss + GSC-Export liegen als Datei.
- ranking-plan fertig = alle sechs Pflichtsektionen nicht leer, fünf Engines genannt.
- ki-audit fertig = eingefrorenes Prompt-Set mit Kern-, Vergleichs- und Preis-Cluster, je Engine „verlinkt / erwähnt / fehlt", Wettbewerber daneben.
- ai-sichtbarkeit fertig = Snapshot-Tabelle mit Datum, Engine, Query, zitiert ja/nein, wer sonst — oder ehrlicher "nicht messbar"-Vermerk.
- gsc-read fertig = Query-/Page-Zeilen im Export **oder** Setup-Fallback-Text.
- ga4-read fertig = AI-Referral-Snapshot-Tabelle mit Datum + Property-ID im
  Pflichtformat (`references/ga4-ki-traffic.md`) **oder** ehrlicher Setup-Fallback.
- se-ranking-research fertig = Export-Datei(en) mit Tool + Abrufdatum liegen
  unter `client-<name>/seo/exports/` **und** Credit-Log (Preflight `units_left`,
  geschätzte/tatsächliche Credits) liegt bei.
- graustufen fertig = Raphael-Go dokumentiert + jedes Item hat Penalty/Ban/rechtlich.
- citation-outreach fertig = doctor + schema + idempotenter Demo-Lauf, kein external side effect.
- publish fertig = Signatur, Tech-QA 0 Blocker.

## Harte Regeln

- Keine Zahl ohne Export (SERP/GSC). Vendor-Studienzahlen sind kein Kundenbeleg.
- GSC nur lesen. Write-Scope verboten.
- **AI-Sichtbarkeits-Messung ist Beobachtung, kein Beleg.** Snapshots immer mit
  Datum + Engine + exakter Query; nie als garantierte KPI verkaufen; "zitiert"
  und "empfohlen" nie vermischen.
- **3-Säulen-Regel KI-Messung — nie vermischen:** GA4 = realer AI-Referral
  (harte Sessions/Conversions, nur Klicks), AIRT/Prompt-Tracking =
  Sichtbarkeits-Beobachtung (nie KPI), GSC = Google-Impressionen (GenAI-Reports
  nur Impressionen, UI-only). Werte nie addieren oder gegeneinander als Beleg
  ausspielen. Details `references/ga4-ki-traffic.md`.
- **Keine KI-Placebos als Leistung verkaufen** (llms.txt, KI-Spezial-Markup,
  Chunking) — Evidenzlage in `taktiken-ai-suche-geo.md` §8 zitieren.
- Graustufen nicht im Default. Erst Go, dann `graustufen.md`, jede Zeile gelabelt.
- Citation Outreach: Client-Config Pflicht, live Target-Page Pflicht, Human Approval für send/spend, Vendorzahlen kein Kundenbeleg.
- **SE-Ranking Credit-Preflight ist Pflicht** vor grösseren `DATA_*`-Läufen:
  `DATA_getSubscription` → `units_left` notieren, Budget-Deckel pro Lauf setzen,
  Credit-Log führen (`references/se-ranking-mcp.md` Credit-Guardrails).
- **SE-Ranking Project-Writes nur nach Nutzer-Bestätigung** (Rank-Tracker-Setup,
  Audit-Start, AIRT-Setup — konsumieren Plan-Quota). Read-only-Calls laufen ohne Gate.
- **MCP-Outputs sind Exporte im Sinne der Belegpflicht:** Zahl + Abrufdatum +
  Tool, Datei unter `client-<name>/seo/exports/`. SE-Ranking-Tool-Schemas nie
  hart kodieren — zur Laufzeit introspektieren (`tools/list`).
- Ein Fakt ein Ort: Borja-Tiefe in `playbooks-borjafat.md`, Kurzfakten in
  `quellen-2026-08.md` / `quellen-2026-09.md` oder im Brain.
- Borja-Zahlen sind Vendor-Snapshots (US, ein Tag). Sie priorisieren, sie belegen nichts im Kundenreport.
- Codex/Kimi/Grok-Adapter dürfen nur zeigen. Dieselbe Trigger-Liste wie dieses Frontmatter.
