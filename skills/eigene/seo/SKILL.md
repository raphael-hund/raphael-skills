---
name: seo
version: 0.7.7
description: >
  Feuert für SEO (Loop 4): Keyword-/SERP-Research, Informationsarchitektur,
  Briefs, Produktion, Tech-QA, GSC-Monitoring, Refresh, Linkbuilding/Digital-PR,
  lokale SEO/GBP, AI-Sichtbarkeit (AEO/GEO), E-E-A-T, SERP-Feature-Analyse,
  interne Verlinkung/Cluster, Google-Ranking-Plan, KI-Suche (AI Overviews,
  AI Mode, ChatGPT, Perplexity, Bing Copilot), Graustufen/asozial/gray-hat.
  Trigger: "SEO", "Keyword-Research", "Content-Brief", "Ranking", "Ranking-Plan",
  "Tech-Audit", "Backlinks", "Digital PR", "Statistikseite", "AI-Sichtbarkeit",
  "AEO", "GEO", "GSC", "Local SEO", "GBP", "E-E-A-T", "SERP-Feature",
  "Featured Snippet", "Themen-Cluster", "interne Verlinkung", "Graustufen",
  "asozial SEO", "gray-hat", "gray hat", "Citation Outreach", "LLM mentions".
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
  mal_shaik/wespreadjam Vercel-Citation-Audit 2026-09-07 (Owned Assets, Vergleichs-Hub, Preis-Prompt-Lücke).
  Details siehe references/quellen-2026-08.md
loads:
  - references/wissens-router.md
  - references/loop4-ablauf.md
  - references/blog-delivery-contract.md
  - references/tech-qa-checkliste.md
  - references/regeln-technischer-audit.md
  - references/regeln-schema-markup.md
  - references/regeln-eeat.md
  - references/taktiken-linkbuilding-digitalpr.md
  - references/taktiken-content-distribution.md
  - references/taktiken-local-seo-gbp.md
  - references/taktiken-serp-features.md
  - references/taktiken-interne-verlinkung-cluster.md
  - references/ideen-ai-sichtbarkeit-aeo.md
  - references/ranking-plan.md
  - references/gsc-read.md
  - references/quellen-2026-08.md
  - references/creator-lehren-2026-08.md
requires_skills: [copywriting@^0, eval@^0]
completion_criteria:
  - "Tech-QA 0 Blocker (Meta/Schema/Canonical/Links) — G1 hart"
  - "G2 auf jedem Ship-Text >= 0.7"
  - "Belegpflicht: jede Zahl/Behauptung im Brief zeigt auf echten Export (SERP/GSC) — nichts erfunden"
  - "Publish nur mit Raphaels Signatur"
  - "Ranking-Plan (wenn angefordert) enthält Keyword-Ziele, Google-Aktionen, KI-Aktionen für AI Overviews, AI Mode, ChatGPT, Perplexity und Bing Copilot, Beleg-Zeiger, 30- und 90-Tage-Schritte"
  - "GSC nur read-only Snapshot mit Query-/Page-Zeilen oder ehrlicher Setup-Fallback"
  - "Graustufen nur nach Raphaels Go, jede Taktik mit Risiko-Label Penalty/Ban/rechtlich"
  - "Citation Outreach: doctor, schema, idempotenter Demo-Lauf, kein external side effect"
---

# seo — Loop 4: SEO

**Lies zuerst:** `client-<name>/wiki/ICP.md`, `OFFER.md`, `VOICE.md`,
`/root/raphael-brain/wiki/hot.md`. Stil über **copywriting**.

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
| IA / Cluster / interne Links | `references/taktiken-interne-verlinkung-cluster.md` |
| Links / Authority / Digital PR | `references/taktiken-linkbuilding-digitalpr.md` |
| Local / GBP | `references/taktiken-local-seo-gbp.md` |
| SERP-Features | `references/taktiken-serp-features.md` |
| GSC-Monitor / Refresh | `references/gsc-read.md` + loop4 monitor/refresh |
| **Google-Ranking-Plan** | `references/ranking-plan.md` + `scripts/ranking_plan.py` |
| **KI-Suche** (AIO, AI Mode, ChatGPT, Perplexity, Copilot) | `references/ideen-ai-sichtbarkeit-aeo.md` |
| **Graustufen / asozial** | `references/graustufen.md` — nur nach Raphael-Go |
| **Citation Outreach / LLM mentions** | `references/citation-outreach-automation.md` + `scripts/citation_outreach.py` |
| **Owned Assets / Vergleichs-Hub / Preis-Prompt-Lücke** (KI-Zitate, Hypothesen) | `references/ideen-ai-sichtbarkeit-aeo.md` Abschnitt „Owned Assets" + Brain `seo-owned-assets-und-vergleichs-hub-fuer-ki-zitate.md` |
| Named-Source-Mechaniken (Borja, Edward, Tony, Brain) | `references/quellen-2026-08.md` |
| Spezialtiefe Brain | `references/wissens-router.md` |

Brain-Präfix immer `/root/raphael-brain/wiki/craft/seo/`. 1–3 Seiten, nie alle.

## On-Page für Loop 2 (Website-Bau)

Fährt der web-Skill die **Plan-Session**, liefert seo nur die On-Page-Grundlage:
Keyword je Route, Sitemap-Entscheidung, Title-/Meta-/H1-Vorgabe — als Text ins
`PLAN.md`. Kein SERP-Export, kein Ranking-Plan, kein technischer Audit; das
Loop-4-Vollprogramm oben läuft nur bei ausdrücklichem SEO-Auftrag. Geprüft wird
die Grundlage später deterministisch mit
`web/scripts/onpage-check.mjs` (QA-Fach 5 G1). Vertrag auf der Web-Seite:
`web/references/rolle-plan.md`.

## Ablauf

1. **research** — SERP-Ausriss + GSC-Export ablegen. G1.
2. **ia** — Cluster/Pillar. G2.
3. **briefs** — jede Zahl mit Quelle+Datum. G2.
4. **produce** — Intent-Konsistenz Title/Meta == Seite. G1-Stil → G2.
5. **tech-qa** — 0 Blocker, hart.
6. **Publish** — Raphaels Signatur.
7. **monitor** — `scripts/gsc_read.py --live` oder Setup-Fallback. Nur lesen.
8. **refresh** — bei echtem Decay (G4), nicht nach Kalender.
9. **ranking-plan** (eigener Zweig) — Skript auf denselben Exporten.

Kanal-Diagnose und Brand-Protect: `references/loop4-ablauf.md`.

## Schritt-Ende (prüfbar)

- research fertig = SERP-Ausriss + GSC-Export liegen als Datei.
- ranking-plan fertig = alle sechs Pflichtsektionen nicht leer, fünf Engines genannt.
- ki-audit fertig = eingefrorenes Prompt-Set mit Kern-, Vergleichs- und Preis-Cluster, je Engine „verlinkt / erwähnt / fehlt", Wettbewerber daneben.
- gsc-read fertig = Query-/Page-Zeilen im Export **oder** Setup-Fallback-Text.
- graustufen fertig = Raphael-Go dokumentiert + jedes Item hat Penalty/Ban/rechtlich.
- citation-outreach fertig = doctor + schema + idempotenter Demo-Lauf, kein external side effect.
- publish fertig = Signatur, Tech-QA 0 Blocker.

## Harte Regeln

- Keine Zahl ohne Export (SERP/GSC).
- GSC nur lesen. Write-Scope verboten.
- Graustufen nicht im Default. Erst Go, dann `graustufen.md`, jede Zeile gelabelt.
- Vendor-Studienzahlen sind kein Kundenbeleg.
- Citation Outreach: Client-Config Pflicht, live Target-Page Pflicht, Human Approval für send/spend, Vendorzahlen kein Kundenbeleg.
- Ein Fakt ein Ort: neue Mechanik steht in `quellen-2026-08.md` oder im Brain, nicht doppelt.
- Codex/Kimi/Grok-Adapter dürfen nur zeigen. Dieselbe Trigger-Liste wie dieses Frontmatter.
