---
name: seo
version: 0.5.0
description: >
  Feuert für SEO (Loop 4): Keyword-/SERP-Research, Informationsarchitektur,
  Briefs, Produktion, Tech-QA, GSC-Monitoring, Refresh, Linkbuilding/Digital-PR,
  lokale SEO/GBP, AI-Sichtbarkeit (AEO/GEO), E-E-A-T, SERP-Feature-Analyse,
  interne Verlinkung/Cluster. Trigger: "SEO", "Keyword-Research",
  "Content-Brief", "Ranking", "Tech-Audit", "Backlinks", "Digital PR",
  "Statistikseite", "AI-Sichtbarkeit", "Local SEO", "GBP", "E-E-A-T",
  "SERP-Feature", "Featured Snippet", "Themen-Cluster", "interne Verlinkung".
  Nutzt bei Spezialthemen die belegte SEO-Wissensbibliothek im Second Brain (25 Seiten, on-demand nachgeladen)
class: F
scope: agency
sensitivity: internal
source: >
  eigene Basis + vendorierte Taktik-Bibliothek: coreyhaines-marketingskills
  (MIT, seo-audit/ai-seo/programmatic-seo/schema/directory-submissions/
  competitors) @ 67264763; qwoted-seo-backlinks-skill (MIT) @ 3ef97c52;
  distribb-skill (kein LICENSE, nur Paraphrase/Ideen, keine wörtliche
  Übernahme) @ f86596ce; AgriciDaniel/claude-seo (MIT) @ 6cf1ea9 — Details
  siehe VENDORING-NOTE.md
loads:
  - references/loop4-ablauf.md
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
requires_skills: [copywriting@^0, eval@^0]
completion_criteria:
  - "Tech-QA 0 Blocker (Meta/Schema/Canonical/Links) — G1 hart"
  - "G2 auf jedem Ship-Text >= 0.7"
  - "Belegpflicht: jede Zahl/Behauptung im Brief zeigt auf echten Export (SERP/GSC) — nichts erfunden"
  - "Publish nur mit Raphaels Signatur"
---

# seo — Loop 4: SEO

**Lies zuerst:**
`/root/clients/client-<name>/wiki/ICP.md`, `OFFER.md`, `VOICE.md` (Dossier aus Loop 1),
`/root/raphael-brain/wiki/hot.md`. Stil immer über **copywriting**.

## Zweck (1 Satz)

Aus Suchintention belegbaren, technisch fehlerfreien Content bauen, der rankt, und bei
Ranking-Decay auffrischen.

## Reference-Routing — welche Datei wann laden

| Anliegen | Datei | Ebene |
|---|---|---|
| Loop-4-Ablauf, Gates, Belegpflicht, Modell-Zuteilung | `references/loop4-ablauf.md` | Ablauf |
| Publish-Blocker vor jedem Go-Live | `references/tech-qa-checkliste.md` | Regeln |
| Crawlability/CWV/On-Page/hreflang/GSC-9-Analysen | `references/regeln-technischer-audit.md` | Regeln |
| JSON-LD-Typen, Validierung | `references/regeln-schema-markup.md` | Regeln |
| E-E-A-T-Tiefe, Who/How/Why-Test, YMYL, KI-Content-Bewertung | `references/regeln-eeat.md` | Regeln |
| Backlinks, Digital PR (HARO/Qwoted), Statistikseiten, Directories | `references/taktiken-linkbuilding-digitalpr.md` | Taktiken |
| Instagram-Carousel, Newsjacking, Vergleichsseiten, pSEO, 90-Tage-Fahrplan | `references/taktiken-content-distribution.md` | Taktiken |
| Local SEO/GBP-Taktik-Tiefe (Kategorien, Reviews, NAP, Swap-Test, Branchen-Schema) | `references/taktiken-local-seo-gbp.md` | Taktiken |
| SERP-Feature-/Seitentyp-Analyse (SXO), Featured Snippet, PAA, User-Storys | `references/taktiken-serp-features.md` | Taktiken |
| Themen-Cluster bauen: Hub-and-Spoke, SERP-Overlap-Clustering, Link-Matrix | `references/taktiken-interne-verlinkung-cluster.md` | Taktiken |
| AI-Sichtbarkeit/AEO/GEO, llms.txt, AI-Crawler, Citability-Score | `references/ideen-ai-sichtbarkeit-aeo.md` | Ideen (unbestätigt, mit Vorsicht) |

## Wissens-Router (Second Brain)

Die operative Arbeit steuert der Skill selbst (siehe Reference-Routing oben). Trifft eine Aufgabe aber ein **Spezialthema**, lies **vor** dem Arbeiten die passende Brain-Seite mit dem Read-Tool nach — dort liegt die belegte Tiefe (Schwellenwerte, Algorithmen, API-Tiers, Studienzahlen). Pfadpräfix immer absolut: `/root/raphael-brain/wiki/seo/`. Lade **nur die 1–3 wirklich relevanten Seiten**, nie alle.

| Wenn die Aufgabe … | dann lies |
|---|---|
| eine ganze Website von A–Z durchleuchten, Health-Score + Prioritätenliste liefern | `seo-audit.md` |
| Gesamt-Synthese: Health-Score-Gewichte, Branchen-Erkennung, Quality-Gates zusammenführen | `seo.md` |
| eine einzelne URL tief prüfen (Title/Meta/H1, Keyword-Dichte, Schema, CWV-Risiken) | `seo-page.md` |
| SEO-Strategie/Roadmap für neue oder bestehende Site inkl. Branchen-Template aufsetzen | `seo-plan.md` |
| evidenz-geführtes Betriebsmodell (Find→Leverage→Optimize→Win) + Prompt-Bibliothek anwenden | `seo-flow.md` |
| Keywords nach echtem Google-SERP-Overlap zu Hub-and-Spoke clustern | `seo-cluster.md` |
| einen recherche-gestützten Content-Brief schreiben, der die Top-Ergebnisse schlägt | `seo-content-brief.md` |
| Content-Qualität + E-E-A-T bewerten (Who/How/Why, Thin Content, AI-Content) | `seo-content.md` |
| „X vs Y“-, „Alternatives to X“- oder „Best of“-Vergleichsseiten bauen | `seo-competitor-pages.md` |
| Seiten in Masse aus Daten erzeugen/auditen — Templates, Thin-Content-Gates | `seo-programmatic.md` |
| vollständigen Tech-Audit fahren (Crawlability, CWV, JS-Rendering, IndexNow, 9 Kategorien) | `seo-technical.md` |
| Structured Data erkennen/validieren/generieren + Deprecation-Status prüfen | `seo-schema.md` |
| eine XML-Sitemap validieren oder korrekt generieren (Limits, Quality-Gates) | `seo-sitemap.md` |
| mehrsprachige/mehrregionale Site: hreflang validieren oder generieren | `seo-hreflang.md` |
| Regressionen nach Deploy erkennen — SEO-Elemente als Baseline snapshoten und vergleichen | `seo-drift.md` |
| Bilder für SEO/Performance optimieren (Alt-Texte, Größen, Formate, CLS, Image-SERP) | `seo-images.md` |
| SEO-Bild-Assets per AI generieren (OG-Preview, Hero, Infografik, Favicon) | `seo-image-gen.md` |
| Produktseiten-/E-Commerce-SEO + Google-Shopping/Amazon-Intelligence | `seo-ecommerce.md` |
| lokale WEBSITE-Signale prüfen (GBP, NAP, Citations, Reviews, lokales Schema, Location-Pages) | `seo-local.md` |
| Maps-PLATTFORM-Präsenz analysieren (Geo-Grid, SoLV, Live-GBP-Audit, Review-Intelligence) | `seo-maps.md` |
| für AI-Suche sichtbar werden (AI Overviews, AI Mode, ChatGPT, Perplexity, Citability) | `seo-geo.md` |
| erklären, warum eine technisch perfekte Seite nicht rankt (Seitentyp-Mismatch, User Stories) | `seo-sxo.md` |
| ein Backlink-Profil bewerten (Referring Domains, Anchor, toxische Links, Competitor-Gap, Disavow) | `seo-backlinks.md` |
| echte Google-Felddaten ziehen (GSC, CrUX/PageSpeed, Indexing, GA4, YouTube, NLP) | `seo-google.md` |
| Live-SERP-/Keyword-/Backlink-/OnPage-Daten via DataForSEO holen (mit Kosten-Guardrails) | `seo-dataforseo.md` |

**Regel:** Die operativen `references/` des Skills (Loop-4-Ablauf, Tech-QA-Checkliste) bleiben der **Kern** jeder Arbeit; die Brain-Seiten sind die **tiefe Nachschlage-Bibliothek** für Spezialfälle — dorthin greifen, wenn ein Thema mehr Tiefe braucht als der Kern hergibt, nicht routinemäßig.

## Ablauf (Detail in references/loop4-ablauf.md)

1. **research** — Keyword-/SERP-Research (Kimi räumt Volumen auf, Luna klassifiziert).
   Immer aus **echtem Export** starten: SERP-Ausriss + GSC-Query-Export (Impressions/
   Klicks/Position) ablegen, nicht aus dem Kopf schätzen. G1.
2. **ia** — Informationsarchitektur: Themen-Cluster, Pillar/Cluster-Struktur (Sonnet). G2.
3. **briefs** — Content-Briefs pro Seite (Sonnet): Intent, Entitäten, Struktur, interne Links.
   **Jede Zahl/Behauptung zeigt auf ihren Export** (Quelle + Datum), sonst gilt sie als
   erfunden und darf nicht in den Text. G2.
4. **produce** — Produktion (Volumen billig — Haiku/Luna; Qualitäts-Pass Sonnet). G1-Stil → G2.
   SERP-Title + Meta-Description müssen **wortgleich** die Zielseite versprechen (Intent-Konsistenz,
   siehe Gotchas).
5. **tech-qa** — Skripte (`references/tech-qa-checkliste.md`). **G1 = 0 Blocker, hart.**
6. **Publish** — **Raphaels Signatur.**
7. **monitor** — GSC-Monitoring (Haiku/Luna), read-only Snapshot → Outcome-Daten (G4).
8. **refresh** — bei Ranking-Decay auffrischen (Haiku/Luna, G4).

## Loop-4-Ablauf (verbindlich)

Keyword-/SERP-Research (Kimi räumt auf, Luna klassifiziert, G1) → IA + Briefs (Sonnet, G2) →
Produktion (Volumen billig, Qualitäts-Pass Sonnet; G1-Stil → G2) → Tech-QA (Skripte, G1 =
0 Blocker, hart) → Publish (Signatur) → GSC-Monitoring + Refresh bei Ranking-Decay
(Haiku/Luna, G4).

## SEO vs. SEA in der Beratung (Kanal-Diagnose)

Bevor seo Arbeit annimmt, den richtigen Kanal wählen — sonst optimiert man Suche, wo es
gar keine gibt:

- **Google (SEO/SEA) = bestehende Nachfrage.** Test: die eigene Leistung des Kunden googeln.
  Erscheinen Wettbewerber als Sponsored Ads, existiert Suchnachfrage → SEO/SEA lohnt.
- **FB/IG = Nachfrage erzeugen.** Kennt noch niemand das Angebot, gibt es nichts zu ranken;
  dann erst über Social Nachfrage schaffen (das ist **ads**, nicht seo).

### Brand-Protect-Search: die Paid→Search-Brücke (⭐)

Sobald ein Kunde **signifikant auf FB/IG spielt**, ergänzend eine **Branded-Search-Kampagne**
auf Google einrichten (Marken-/Namens-Keywords). Grund: Wer den Namen wiederholt in Social-Ads
sieht, sucht ihn später direkt bei Google — diese Nachfrage abzufangen ist der **günstigste
erreichbare Lead**. Ohne Brand-Protect greift ein Wettbewerber die Marken-Suche als Anzeige ab.
→ Trigger für seo: bei aktiver FB/IG-Kampagne Brand-Protect als Aufgabe anlegen und mit
ads koordinieren.

## Gotchas

- **Persona-Skills ersetzen kein Fachwissen (Warnung D38).** SEO-Technik kommt aus echten
  SERPs + Erfahrung, nicht aus einem "SEO-Experten"-Prompt.
- **Ads-Kurse liefern kein SEO.** Keyword-/SERP-Research, IA und Tech-SEO kommen aus eigenen
  Quellen (echte SERPs, GSC) — Ads-Kursmaterial taugt nur für die eine Paid→Branded-Search-Brücke,
  nicht für das SEO-Handwerk.
- **Intent-Konsistenz (Erwartung == Zielseite).** SERP-Title/Meta-Description müssen exakt das
  versprechen, was die Zielseite hält — genauso wie Ad-Wording == Landingpage. Lücke Erwartung↔Realität
  killt die Conversion.
- **Rankings sind ein Lag-Indikator (Upstream).** Bei schwacher Seite nicht nur an ihr schrauben,
  sondern die Stufen davor prüfen (Intent-Match, Brief, interne Links, Snippet-Versprechen). Das
  Problem sitzt oft weiter oben als dort, wo es sichtbar wird.
- **Belegpflicht.** Keine Zahl im Text, die nicht auf einen echten Export (SERP/GSC) zeigt —
  erfundene Volumina/Positionen sind ein G2-Fail.
- Tech-QA 0 Blocker ist hart: Meta/Schema/Canonical/Links müssen sauber sein, sonst kein Publish.
- GSC-Zugang read-only, per Snapshot — nie Schreib-Scope (Konnektoren-Regel).
- Volumen billig, Qualität teuer: Massen-Produktion Haiku/Luna, aber Qualitäts-Pass Sonnet
  vor G2 — nicht roh ausliefern.
- Refresh-Trigger = echter Ranking-Decay (G4), nicht Kalender.
- **Vendorierte Studien-Zahlen (E-E-A-T/Local/GEO/SXO) sind kein eigener Beleg.** Sie stammen aus
  Drittstudien im Quell-Repo (siehe `VENDORING-NOTE.md`) und dienen der eigenen Priorisierung —
  in einen Kundenreport gehört nur der eigene Export (GSC/GBP-Insights/SERP-Ausriss), nie die
  fremde Studienzahl als eigene Kennzahl (Belegpflicht).
