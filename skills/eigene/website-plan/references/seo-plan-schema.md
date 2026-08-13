# SEO-Plan Schema (Pflicht-Deliverable `04-seo-plan.md`)

Immer vollständig (ein Workflow). Bei engem Scope: Raphael sagt Umfang; AEO-Block bleibt.

```markdown
# SEO Plan — [Projekt / Domain]

## 0. Meta
- Owner, Datum, Live-URL (oder keine), Repo MITNUTZEN/IGNORIEREN, Scope, Out-of-scope
- Baseline, Tools (inkl. SEO-Data-API), Datenquellen
- Definition of Done

## 1. Business & Goals
- Angebote, USPs, Zielkunden, Gebiet
- Primary conversions
- 90-Tage- / 12-Monate-KPIs

## 2. Research Summary
- Keyword clusters (Tabelle: cluster, intent, volume/value aus SEO-Data-API, difficulty)
- SERP-Features (Local Pack, PAA, AI Overview, …)
- Competitor set + gaps
- Cannibalization risks

## 3. Keyword → URL Map
| URL | Type | Primary KW | Secondaries | Intent | Priority | Status |

## 4. Technical SEO
- Crawl/index, robots, sitemap, canonical policy
- Redirect map (Relaunch)
- Rendering (SSR/SSG), known issues

## 5. IA & Content Model
- Hierarchy, page types, hub/spoke
- Content gaps

## 6. On-Page Specs (pro Priority-URL)
### [URL]
- Intent, Primary+Secondary KW
- Title, Meta, H1, H2-Outline (final drafts)
- Intro-Thesis, Proof, CTA(s)
- Internal links IN/OUT + Anchor-Vorschläge
- Schema types, OG image motif
- Image/alt plan, Local signals
- Indexation, Priority, Success metric

## 7. Internal Linking Plan
- Rules, orphan prevention, anchor guidelines, depth ≤3

## 8. Local SEO
- GBP, NAP source of truth, location pages, citations, reviews, maps
- oder: N/A + Begründung

## 9. E-E-A-T & Trust
- Proof inventory (nur Belegbares)
- About/Team/Credentials plan

## 10. Schema Inventory
| URL | Types | Required props | Validation |

## 11. Performance / CWV
- Targets LCP/INP/CLS, baseline, fix backlog

## 12. AI Search / AEO (PFLICHT)
- Entity package (Name, sameAs: GBP, Socials, …)
- Zitierfähige Faktenblöcke (Wer/Was/Wo/Gebiet/seit wann)
- Q&A-Direktantworten für echte Fragen
- Monitoring-Ansatz (AI Overviews / Stichproben)

## 13. Analytics & Measurement
- GSC, Analytics/Consent, Events (form/call), Review-Cadence

## 14. Competitive SERP Strategy
- Pro Cluster: was es braucht zum Gewinnen

## 15. Roadmap
### P0 ≤2 Wochen
### P1 2–6 Wochen
### P2 6–16 Wochen

## 16. Risks & Verbote
- Doorways, Stuffing, Fake Schema/Reviews, thin city pages, erfundene Claims

## 17. Appendix
- Keyword export, Redirect CSV, Claims register
```

## Per-URL Pflichtfelder (kurz)

URL · Type · Intent · Primary KW · Secondaries · Title · Meta · H1 · H2 outline · CTA · Links in/out · Schema · Priority · Success metric

## Verbote

Keyword-Dump ohne Map · 1 KW auf viele URLs · Fake AggregateRating · FAQ-Schema ohne sichtbare FAQ · „muss 2000 Wörter“ als hartes Ziel
