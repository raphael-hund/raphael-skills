# Wissens-Router (Second Brain) — ads

Die früheren ~39 Einzel-Slash-Skills sind jetzt belegte Wissensseiten unter dem Pfad
`/root/raphael-brain/wiki/craft/ads/` (Unterordner: grundlagen/ plattformen/ creative/ messung/ strategie/). Trifft eine Aufgabe ein Spezialthema,
lies die passende Seite mit dem **Read-Tool** nach, *bevor* du arbeitest — nie aus dem
Gedächtnis diagnostizieren. Immer nur die 1–3 wirklich relevanten Seiten laden, nie alle.

## Quermaterie & Grundlagen (plattform-übergreifend)

| Wenn die Aufgabe … | dann lies |
|---|---|
| unter jedem Audit/Plan/Creative kognitive Disziplin braucht (welches Denkprinzip überspringe ich gerade?) | `grundlagen/thinking-framework.md` |
| ein Plattform-Konto auditiert wird — gemeinsames 8-Schritt-Verfahren & Grenzen | `grundlagen/_platform-audit-grundmuster.md` |
| einen Health-/Konto-Score berechnen oder einordnen (Formeln, Gewichte, Coverage) | `grundlagen/scoring-system.md` |
| einen Benchmark zitieren oder Fatigue/Anomalie gegen die Konto-Baseline werten | `grundlagen/benchmarks.md` |
| die richtige Gebotsstrategie wählen oder einen Bidder-Wechsel begründen | `strategie/bidding-strategien.md` |
| CPA/CPL/ROAS/MER/Break-even/LTV:CAC sauber rechnen und modellieren | `grundlagen/ads-math.md` |
| Budget, Pacing, marginale Rendite und Skalierung planen | `strategie/ads-budget.md` |
| Plattform-Zahlen abgleichen, Attributionsfenster/Conversions prüfen (nichts Inkompatibles addieren) | `messung/ads-attribution.md` |
| Server-Side-Tracking prüfen (sGTM, CAPI, Browser/Server-Dedup, Consent, Hashing) | `messung/ads-server-side-tracking.md` |
| Policy-/Regulatorik-Risiko oder delegierte Automation (Advantage+/Auto-Rules) einordnen | `grundlagen/ads-compliance.md` |

## Pipeline & Betrieb (Konto-Lebenszyklus)

| Wenn die Aufgabe … | dann lies |
|---|---|
| ein neues Paid-Media-Projekt onboarden (Business-, Konto-, Guardrail-Profil) | `strategie/ads-setup.md` |
| ein Brand-/Offer-Profil aus der Kunden-Website ziehen | `creative/ads-dna.md` |
| Plattform-/API-/Policy-Wissen refreshen oder abgelaufene Claims verifizieren | `grundlagen/ads-research.md` |
| Wettbewerber-Ads über Transparenz-Bibliotheken analysieren | `strategie/ads-competitor.md` |
| eine Paid-Media-Strategie/Media-Plan (Objectives, Kanalwahl, Architektur) bauen | `strategie/ads-plan.md` |
| Kampagnenkonzepte, Messaging, Copy und Creative-Briefs **NEU erzeugen** | `creative/ads-create.md` |
| **BESTEHENDES** Werbematerial auditieren (Hooks, Format-Coverage, Fatigue, Message-Match) | `creative/ads-creative.md` |
| Ad-**Bilddateien** aus einem validierten Brief generieren (Provider, Provenance) | `creative/ads-generate.md` |
| Produktfoto-Varianten (Studio/Lifestyle/Ingredient) generieren | `creative/ads-photoshoot.md` |
| eine Landing-Page für Paid-Traffic prüfen (Message-Match, Mobile, Consent, Friction) | `creative/ads-landing.md` |
| eine Testwelle/ein A/B-Experiment designen und auswerten (Hypothese, Sample-Size, Stopp-Regel) | `strategie/ads-test.md` |
| ein volles Konto-Audit über 1–12 Plattformen mit JSON-Bundle fahren | `grundlagen/ads-audit.md` |
| eine EINZELNE Kennzahl (CPL/CPA/ROAS) driftet über Zeit — Ursache finden & beheben (NICHT ads-audit.md, das ist nur für den vollständigen Konto-/Multiplattform-Review) | `strategie/ads-optimize.md` (+ `creative/ads-creative.md` bei Fatigue-Verdacht, + `grundlagen/benchmarks.md`) |
| Optimierungen diagnostizieren und (Draft-first) anwenden | `strategie/ads-optimize.md` |
| Pacing/Delivery/Fatigue/Tracking laufend überwachen (read-only) | `strategie/ads-monitor.md` |
| eine Kampagne launchen (Draft-first, Mutation-Gate) | `strategie/ads-launch.md` |
| einen Kundenreport/Audit-PDF aus einem validierten Run-Bundle rendern | `messung/ads-report.md` |
| Verträge, Bundles, Scoring-Inputs oder Release-Readiness deterministisch prüfen | `grundlagen/ads-validate.md` |

## Plattform-Seiten (nur laden, was der Kunde bespielt)

| Wenn du prüfst/baust auf … | dann lies |
|---|---|
| Meta (Facebook/Instagram, Pixel/CAPI, Advantage+) | `plattformen/ads-meta.md` |
| Google (Search, Shopping, PMax, Demand Gen) | `plattformen/ads-google.md` |
| YouTube (In-Stream, Shorts, Demand Gen, CTV) | `plattformen/ads-youtube.md` |
| LinkedIn (Insight Tag, Lead Gen, ABM, B2B) | `plattformen/ads-linkedin.md` |
| TikTok (Pixel/Events API, Smart+, Shop) | `plattformen/ads-tiktok.md` |
| Microsoft/Bing (UET, Google-Import, Audience Network) | `plattformen/ads-microsoft.md` |
| Apple Search Ads (App Store, AdServices, Search Match) | `plattformen/ads-apple.md` |
| Amazon (Sponsored Products/Brands/Display, DSP, ACOS/TACOS) | `plattformen/ads-amazon.md` |
| Reddit (Community-/Interest-Targeting, native Creative) | `plattformen/ads-reddit.md` |
| Pinterest (Tag/CAPI, Katalog/Shopping, Performance+) | `plattformen/ads-pinterest.md` |
| Snapchat (Snap Pixel/CAPI, AR-/Katalog-Formate, App-Install) | `plattformen/ads-snapchat.md` |
| X/Twitter (Pixel/CAPI, Conversation-Targeting) | `plattformen/ads-x.md` |

**Plattform-Wahl:** Lade **nur die Plattform-Seite(n), die der Kunde tatsächlich bespielt** —
Raphael skaliert v.a. **Meta**, also ist `plattformen/ads-meta.md` der Normalfall. Nie alle 12 Plattformen
durchgehen. Quermaterie (Attribution, Server-Side-Tracking, Budget, Scoring, Benchmarks,
Bidding, Denk-Framework) kommt **separat** aus dem ersten Block dazu, nicht aus der Plattform-Seite.

## Belegte Muster & Referenz-Notizen (eigene Tiefe, an die Ablauf-Schritte gekoppelt)

Diese datierten Seiten in `wiki/craft/ads/` (bzw. die eigenen Konto-Seiten unter `wiki/company/ads/`) tragen die **eigene, belegte Substanz** (echte Creatives, KPI-Hierarchien, Kampagnenstruktur) und ergänzen die generischen `ads-*.md`. Im passenden Ablauf-Schritt lesen:

| Ablauf-Schritt | dann lies |
|---|---|
| voc-mine / angles (Voice-of-Customer → Winkel) | `2026-07-20-voice-of-customer-angle-produktions-pipeline.md` |
| angles: Awareness-Stufe & Funnel-Zuordnung | `creative/2026-07-20-referenz-awareness-funnel-zuordnung.md` |
| angles: bewährte Nische auf neue übertragen (Make) | `creative/2026-07-20-referenz-nischen-transfer-make.md` |
| video-scripts: Skript-Struktur / Skripte für sophisticated ICP | `creative/2026-07-20-referenz-video-skript-struktur.md`, `creative/2026-07-20-video-ad-skripte-sophisticated-icp.md` |
| ad-copy: Offer-/Garantie-/CTA-Muster | `creative/2026-07-20-referenz-offer-garantie-cta-muster.md` |
| statics: Muster & Konzept-Prinzipien | `creative/2026-07-20-referenz-static-ad-muster.md`, `creative/2026-07-20-static-ad-konzept-prinzipien.md` |
| Schaltung/Pixel-Regel: Lead-Qualifizierung Pixel/CAPI | `messung/2026-07-20-lead-qualifizierung-pixel-conversions-api.md` |
| perf-analyse: Metrik-Hierarchie / Testing-vs-Scaling / eigene Creative-Lehren | `messung/2026-07-20-meta-ads-metrik-hierarchie-kpi.md`, `strategie/2026-07-20-testing-vs-scaling-kampagnenstruktur.md`, `2026-07-20-eigene-creatives-performance-lehren.md` |

(`README.md` im Ordner ist eine Ordnerbeschreibung, keine Wissensseite — nicht laden.)

**Kern vs. Tiefe:** Die operativen `references/` (loop3-ablauf, hook-taxonomie, claims-verbote, static-ad-templates) sind der **Kern** jeder Arbeit; die Brain-Seiten oben sind **Tiefen-Nachschlag** für Spezialfälle. Bei Themen-Überschneidung (z. B. „Copy erzeugen": reference vs. `creative/ads-create.md`) **führt die `references/`-Quelle**.
