---
name: ads
version: 0.5.0
description: >
  Feuert für Meta-/Paid-Ads (Loop 3): Voice-of-Customer, Angles, Hooks,
  Video-Skripte, Ad-Copy, Statics-Briefs, Claims-QA, Performance-Analyse,
  Konto-Audits mit deterministischem Scoring, Testwellen-Signifikanz.
  Trigger: "Ads bauen", "Hooks schreiben", "Creatives", "Anzeigentexte", "Testwelle",
  "Konto-Audit", "Health-Score", "Testwelle auswerten", "Ad-Fatigue prüfen".
  Lädt bei Spezialthemen gezielt die belegten Wissensseiten aus dem Second Brain (wiki/ads, on-demand) nach
class: F
scope: agency
sensitivity: internal
source: fusion — eigenes Loop-3-System + kondensiert aus coreyhaines31/marketingskills
  skills/ads, skills/ad-creative @ 67264763 (MIT-Lizenz) + kondensiert aus
  AgriciDaniel/claude-ads (MIT-Lizenz, Stand 2026-07-11) — Scoring-/Audit-/
  Signifikanz-Methodik, paraphrasiert, keine Übernahme von Code/Schemas/Skripten.
loads:
  - references/loop3-ablauf.md
  - references/hook-taxonomie.md
  - references/claims-verbote.md
  - references/vendor/coreyhaines-ads/static-ad-templates-en.md
  - references/vendor/coreyhaines-ads/rsa-output-spec-en.md
  - references/vendor/claude-ads/scoring-methodik.md
  - references/vendor/claude-ads/quellen-und-benchmarks.md
  - references/vendor/claude-ads/experimente-und-monitoring.md
  - references/vendor/claude-ads/automatisierungs-tiers.md
requires_skills: [copywriting@^0, offers@^0, eval@^0]
completion_criteria:
  - "0 verbotene Claims im Live-Set (claims-qa Block, Sol frische Session)"
  - "G1-Stil grün, dann G2 >= 0.7 auf jedem Ship-Output"
  - "Schaltung nur mit Raphaels Signatur + Budget-Egress-Gate"
  - "statics-Konzepte tragen Grounding-Quelle (Review/Winning-Ad/Kommentar) — sonst Stopp statt Erfindung"
---

# ads — Loop 3: Paid Ads

**Lies zuerst:**
`/root/clients/client-<name>/wiki/ICP.md`, `OFFER.md`, `PROOF.md`, `VOICE.md`
(Dossier aus Loop 1 — Pflicht-Voraussetzung),
`/root/raphael-brain/wiki/swipes/` (Swipe-File), `/root/raphael-brain/wiki/hot.md`.

## Zweck (1 Satz)

Aus dem Dossier scroll-stoppende, policy-saubere Meta-Ads bauen und gegen echte KPIs
in Testwellen verbessern.

## Reference-Routing (bei Bedarf laden, nicht vorab)

| Situation | Laden | Inhalt |
|---|---|---|
| Kill/Keep/Scale auf laufendem Konto entscheiden | `references/loop3-ablauf.md` (Abschnitt Kill/Keep/Scale-Engine) | TCPL-Anker, Ad-Count-Deckel, Fatigue-Bänder, Scaling-Protokoll |
| Hook diagnostizieren oder neu schreiben | `references/hook-taxonomie.md` | Hook-Typen, 3-Komponenten-Modell, Diagnose-Trichter |
| Statics-Brief für Design/design bauen | `references/vendor/coreyhaines-ads/static-ad-templates-en.md` | 15 Layout-Vorlagen, Output-Format, Kunden-Review-Artefakt |
| Google-Search-RSAs statt/zusätzlich zu Meta | `references/vendor/coreyhaines-ads/rsa-output-spec-en.md` | Harte Zeichenlimits + Pflicht-Output-Reihenfolge |
| Claims prüfen | `references/claims-verbote.md` | HWG/UWG-Verbotsliste |
| Konto-Audit / Health-Score bauen | `references/vendor/claude-ads/scoring-methodik.md` | pass/fail/unknown/not_applicable, Schweregewichte, Coverage-Ampel, versionierte JSON-Reports |
| Benchmark zitieren oder Fatigue/Anomalie einschätzen | `references/vendor/claude-ads/quellen-und-benchmarks.md` | Belegpflicht, Vergleichs-Rangfolge, Konto-Baseline statt fixer Branchenwert |
| Testwelle aufsetzen oder auswerten | `references/vendor/claude-ads/experimente-und-monitoring.md` | Pre-Registrierung, Stopp-Regel, Anti-Peeking, Monitoring-Disziplin |
| Automatisierungsgrad (Advantage+/Automated Rules) einordnen | `references/vendor/claude-ads/automatisierungs-tiers.md` | T0-T4-Klassifikation, Bezug zum Schaltungs-Gate |

## Wissens-Router (Second Brain)

Die früheren ~39 Einzel-Slash-Skills sind jetzt belegte Wissensseiten unter dem Pfad
`/root/raphael-brain/wiki/ads/`. Trifft eine Aufgabe ein Spezialthema,
lies die passende Seite mit dem **Read-Tool** nach, *bevor* du arbeitest — nie aus dem
Gedächtnis diagnostizieren. Immer nur die 1–3 wirklich relevanten Seiten laden, nie alle.

### Quermaterie & Grundlagen (plattform-übergreifend)

| Wenn die Aufgabe … | dann lies |
|---|---|
| unter jedem Audit/Plan/Creative kognitive Disziplin braucht (welches Denkprinzip überspringe ich gerade?) | `thinking-framework.md` |
| ein Plattform-Konto auditiert wird — gemeinsames 8-Schritt-Verfahren & Grenzen | `_platform-audit-grundmuster.md` |
| einen Health-/Konto-Score berechnen oder einordnen (Formeln, Gewichte, Coverage) | `scoring-system.md` |
| einen Benchmark zitieren oder Fatigue/Anomalie gegen die Konto-Baseline werten | `benchmarks.md` |
| die richtige Gebotsstrategie wählen oder einen Bidder-Wechsel begründen | `bidding-strategien.md` |
| CPA/CPL/ROAS/MER/Break-even/LTV:CAC sauber rechnen und modellieren | `ads-math.md` |
| Budget, Pacing, marginale Rendite und Skalierung planen | `ads-budget.md` |
| Plattform-Zahlen abgleichen, Attributionsfenster/Conversions prüfen (nichts Inkompatibles addieren) | `ads-attribution.md` |
| Server-Side-Tracking prüfen (sGTM, CAPI, Browser/Server-Dedup, Consent, Hashing) | `ads-server-side-tracking.md` |
| Policy-/Regulatorik-Risiko oder delegierte Automation (Advantage+/Auto-Rules) einordnen | `ads-compliance.md` |

### Pipeline & Betrieb (Konto-Lebenszyklus)

| Wenn die Aufgabe … | dann lies |
|---|---|
| ein neues Paid-Media-Projekt onboarden (Business-, Konto-, Guardrail-Profil) | `ads-setup.md` |
| ein Brand-/Offer-Profil aus der Kunden-Website ziehen | `ads-dna.md` |
| Plattform-/API-/Policy-Wissen refreshen oder abgelaufene Claims verifizieren | `ads-research.md` |
| Wettbewerber-Ads über Transparenz-Bibliotheken analysieren | `ads-competitor.md` |
| eine Paid-Media-Strategie/Media-Plan (Objectives, Kanalwahl, Architektur) bauen | `ads-plan.md` |
| Kampagnenkonzepte, Messaging, Copy und Creative-Briefs **NEU erzeugen** | `ads-create.md` |
| **BESTEHENDES** Werbematerial auditieren (Hooks, Format-Coverage, Fatigue, Message-Match) | `ads-creative.md` |
| Ad-**Bilddateien** aus einem validierten Brief generieren (Provider, Provenance) | `ads-generate.md` |
| Produktfoto-Varianten (Studio/Lifestyle/Ingredient) generieren | `ads-photoshoot.md` |
| eine Landing-Page für Paid-Traffic prüfen (Message-Match, Mobile, Consent, Friction) | `ads-landing.md` |
| eine Testwelle/ein A/B-Experiment designen und auswerten (Hypothese, Sample-Size, Stopp-Regel) | `ads-test.md` |
| ein volles Konto-Audit über 1–12 Plattformen mit JSON-Bundle fahren | `ads-audit.md` |
| Optimierungen diagnostizieren und (Draft-first) anwenden | `ads-optimize.md` |
| Pacing/Delivery/Fatigue/Tracking laufend überwachen (read-only) | `ads-monitor.md` |
| eine Kampagne launchen (Draft-first, Mutation-Gate) | `ads-launch.md` |
| einen Kundenreport/Audit-PDF aus einem validierten Run-Bundle rendern | `ads-report.md` |
| Verträge, Bundles, Scoring-Inputs oder Release-Readiness deterministisch prüfen | `ads-validate.md` |

### Plattform-Seiten (nur laden, was der Kunde bespielt)

| Wenn du prüfst/baust auf … | dann lies |
|---|---|
| Meta (Facebook/Instagram, Pixel/CAPI, Advantage+) | `ads-meta.md` |
| Google (Search, Shopping, PMax, Demand Gen) | `ads-google.md` |
| YouTube (In-Stream, Shorts, Demand Gen, CTV) | `ads-youtube.md` |
| LinkedIn (Insight Tag, Lead Gen, ABM, B2B) | `ads-linkedin.md` |
| TikTok (Pixel/Events API, Smart+, Shop) | `ads-tiktok.md` |
| Microsoft/Bing (UET, Google-Import, Audience Network) | `ads-microsoft.md` |
| Apple Search Ads (App Store, AdServices, Search Match) | `ads-apple.md` |
| Amazon (Sponsored Products/Brands/Display, DSP, ACOS/TACOS) | `ads-amazon.md` |
| Reddit (Community-/Interest-Targeting, native Creative) | `ads-reddit.md` |
| Pinterest (Tag/CAPI, Katalog/Shopping, Performance+) | `ads-pinterest.md` |
| Snapchat (Snap Pixel/CAPI, AR-/Katalog-Formate, App-Install) | `ads-snapchat.md` |
| X/Twitter (Pixel/CAPI, Conversation-Targeting) | `ads-x.md` |

**Plattform-Wahl:** Lade **nur die Plattform-Seite(n), die der Kunde tatsächlich bespielt** —
Raphael skaliert v.a. **Meta**, also ist `ads-meta.md` der Normalfall. Nie alle 12 Plattformen
durchgehen. Quermaterie (Attribution, Server-Side-Tracking, Budget, Scoring, Benchmarks,
Bidding, Denk-Framework) kommt **separat** aus dem ersten Block dazu, nicht aus der Plattform-Seite.

### Belegte Muster & Referenz-Notizen (eigene Tiefe, an die Ablauf-Schritte gekoppelt)

Diese datierten Seiten in `wiki/ads/` tragen die **eigene, belegte Substanz** (echte Creatives, KPI-Hierarchien, Kampagnenstruktur) und ergänzen die generischen `ads-*.md`. Im passenden Ablauf-Schritt lesen:

| Ablauf-Schritt | dann lies |
|---|---|
| voc-mine / angles (Voice-of-Customer → Winkel) | `2026-07-20-voice-of-customer-angle-produktions-pipeline.md` |
| angles: Awareness-Stufe & Funnel-Zuordnung | `2026-07-20-referenz-awareness-funnel-zuordnung.md` |
| angles: bewährte Nische auf neue übertragen (Make) | `2026-07-20-referenz-nischen-transfer-make.md` |
| video-scripts: Skript-Struktur / Skripte für sophisticated ICP | `2026-07-20-referenz-video-skript-struktur.md`, `2026-07-20-video-ad-skripte-sophisticated-icp.md` |
| ad-copy: Offer-/Garantie-/CTA-Muster | `2026-07-20-referenz-offer-garantie-cta-muster.md` |
| statics: Muster & Konzept-Prinzipien | `2026-07-20-referenz-static-ad-muster.md`, `2026-07-20-static-ad-konzept-prinzipien.md` |
| Schaltung/Pixel-Regel: Lead-Qualifizierung Pixel/CAPI | `2026-07-20-lead-qualifizierung-pixel-conversions-api.md` |
| perf-analyse: Metrik-Hierarchie / Testing-vs-Scaling / eigene Creative-Lehren | `2026-07-20-meta-ads-metrik-hierarchie-kpi.md`, `2026-07-20-testing-vs-scaling-kampagnenstruktur.md`, `2026-07-20-eigene-creatives-performance-lehren.md` |

(`README.md` im Ordner ist eine Ordnerbeschreibung, keine Wissensseite — nicht laden.)

**Kern vs. Tiefe:** Die operativen `references/` (loop3-ablauf, hook-taxonomie, claims-verbote, static-ad-templates) sind der **Kern** jeder Arbeit; die Brain-Seiten oben sind **Tiefen-Nachschlag** für Spezialfälle. Bei Themen-Überschneidung (z. B. „Copy erzeugen": reference vs. `ads-create.md`) **führt die `references/`-Quelle**.

## Ablauf (Detail in references/loop3-ablauf.md)

1. **voc-mine** — Voice-of-Customer aus Transkripten/Reviews (Kimi 1M). G1. Wörtliche
   Kundensprache → `client-<name>/wiki/voc.md`.
2. **angles** — Winkel/Big-Ideas (Fable, Checkpoint Raphael).
3. **hooks** — Scroll-Stopper (Sonnet-Worker, Reuse je Kunde). Taxonomie in
   `references/hook-taxonomie.md`. Stil über `copywriting`. G1-Stil → G2.
4. **video-scripts** — Skripte pro gewähltem Hook (Sonnet). G1 → G2.
5. **ad-copy** — Primary Text / Headline / Description (Sonnet). G1 → G2.
6. **statics** — Briefs für statische Creatives → verweist auf `design` fürs Visuelle.
   Layout-Vorlagen in `references/vendor/coreyhaines-ads/static-ad-templates-en.md` (15
   Templates, über alle zyklen statt auf 2-3 Favoriten zu clustern). **Grounding-Pflicht:**
   jedes Konzept braucht eine Quelle (echte Review/Winning-Ad/Ad-Kommentar aus voc.md/
   PROOF.md) — keine erfundenen Claims/Statistiken/Testimonials. Fehlt Rohmaterial: stoppen
   und Raphael/Kunden um Material bitten, nicht ungegroundet weiterproduzieren. Für Kunden-
   Freigabe eines Batches das Review-Artefakt `assets/creative-review-template.html`
   nutzen (ein HTML-File, JSON-Datenblock, kein Build nötig).
7. **claims-qa** — **Sol, frische Session.** Jede Behauptung: belegt / riskant / verboten.
   Gegen Meta-Policy **und** HWG/UWG-Verbotsliste (`references/claims-verbote.md`).
8. **Schaltung** — **Signatur (Geld = rot) + Budget-Egress-Gate.** Nie autonom.
   **Pixel-Regel (hart, vor Launch):** Tracking/Events VOR dem ersten Live-Schalten
   einrichten; Lead-Event NUR bei qualifizierter Antwort feuern (nicht bei jedem
   Formular-Submit); auf das tiefste Funnel-Event optimieren (Booking, nicht Klicks).
   Details in `references/loop3-ablauf.md` (Pixel-Conditioning).
9. **perf-analyse** — Performance vs. echte KPI → nächste Testwelle (Sonnet, G4).
   Testwellen-Auswertung folgt der Signifikanz-Disziplin in
   `references/vendor/claude-ads/experimente-und-monitoring.md` (Stopp-Regel vorab,
   kein Peeking, Snapshot-Vergleichbarkeit prüfen). Konto-Health-Checks/Audits nutzen
   `references/vendor/claude-ads/scoring-methodik.md` (deterministisch, versioniertes
   JSON, keine Buchstaben-Note).

## Loop-3-Tabelle (Modell + Gate — verbindlich)

| Schritt | Modell | Gate |
|---|---|---|
| Voice-of-Customer aus Transkripten | Kimi (1M) | G1 |
| Angles | Fable | Checkpoint Raphael |
| Hooks / Video-Skripte / Ad-Copy / Statics-Briefs | Sonnet-Worker (Reuse je Kunde) | G1 Stil → G2 |
| Claims-QA (Meta-Policy + HWG/UWG) | Sol, frische Session | belegt / riskant / verboten |
| Schaltung | — | **Signatur (Geld=rot) + Budget-Egress-Gate** |
| Performance vs. echte KPI → nächste Testwelle | Sonnet | G4 |

## Gotchas

- **G2-Scores sind Stil-Checks, nie "Performance-Beweis" gegenüber Kunden.** Nur echte
  CTR/CPL/CVR zählen als Ergebnis (→ report).
- **Ads-Daten kommen per Datei-Export oder read-only Zugang — nie Schreib-Scope.** Ein
  Ads-Schreibzugriff berührt direkt die Rot-Klasse Budgets.
- claims-qa läuft in **frischer Session, anderer Modellfamilie** (Sol) — nie Selbstprüfung
  des Autors.
- HWG (Heilmittelwerbung) trifft Gesundheit/Beauty/Supplements hart — Verbotsliste immer prüfen.
- Hook-Autor darf nicht sein eigener Judge sein (Regel 8).
- **Andromeda-Budget-Klumpen ist KEIN Fehler (Stand 2025).** Wenn Meta bei ~12 aktiven
  Ads fast das ganze Budget auf eine Anzeige legt, ist das erwartetes Matching — nicht
  manuell umverteilen. (Andromeda-Details + Datumshinweis in loop3-ablauf.md.)
- **Negative Kommentare sind kein Abschalt-Signal.** Nie nach Kommentarstimmung ab-/anschalten
  oder Kommentare löschen — nur nach CPL/Ergebnis entscheiden. Bissige Kommentare als
  Ad-Rohstoff recyceln (Kommentar einblenden → Beweis-Sequenz).
- **Link-CTR > 2 % = Warnsignal, nicht Erfolg.** Zu wenig Filterung im Text: viele falsche
  Klicks kosten Geld ohne Conversion. Mehr Committed-Sprache senkt die CTR (~1 %) und
  vervielfacht oft die LP-Conversion. Jede Metrik ist ein Regler, kein An/Aus-Schalter.
- **Kein Testwellen-Kill ohne Ersatz in der Pipeline.** Killt eine Ad-Regel eine Anzeige,
  ohne dass 2-3 Iterationen bereitstehen, wird das Budget einfach zurückgefahren — nie eine
  "Zombie"-Anzeige unbeobachtet weiterlaufen lassen (Details: Kill/Keep/Scale-Engine).
- **Statics-Batch ohne Grounding-Quelle ist ein Blocker, keine Stilfrage.** Ein Konzept ohne
  Review-/Winning-Ad-/Kommentar-Beleg wird nicht ausgeliefert — dieselbe Härte wie claims-qa,
  nur schon am Brief statt erst am Text.
- **Es gibt keine feste Ad-Fatigue-Frequenz oder Signifikanz-Schwelle, die für jedes Konto
  gilt.** Immer gegen die eigene Konto-Baseline vergleichen (Details:
  `references/vendor/claude-ads/quellen-und-benchmarks.md`) — eine erfundene Konstante
  wie "Frequency > 3" klingt konkret und ist trotzdem oft falsch.
- **Testwelle ohne vorab festgelegte Stopp-Regel ist keine Testwelle.** Wiederholtes Peeken
  und Abbruch beim ersten guten Ergebnis produziert Falsch-Positive, die sich wie ein
  Gewinner anfühlen (`references/vendor/claude-ads/experimente-und-monitoring.md`).
- **Health-Score ist nie eine Buchstaben-Note.** Jeder Score bekommt Coverage-Status und
  Datenfenster dazu; unter 60 % Coverage wird der Score nicht als Konto-Note präsentiert
  (`references/vendor/claude-ads/scoring-methodik.md`).
