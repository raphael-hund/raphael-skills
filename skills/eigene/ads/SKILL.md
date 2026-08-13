---
name: ads
version: 0.10.0
description: >
  Router für Meta-/Paid-Ads (Loop 3): Voice-of-Customer, Angles, Strategie,
  Testwellen, Kill-Keep-Scale, Claims-QA, Performance-Analyse, Konto-Audits
  mit deterministischem Scoring, Testwellen-Signifikanz. Delegiert Skripte an
  `ads-video` und Statics-Briefs an `ads-statics`: dies ist der Familien-
  Einstieg, der entscheidet, welcher Fulfillment-Skill dranmuss.
  Trigger: "Ads bauen", "Hooks schreiben", "Creatives", "Anzeigentexte", "Testwelle",
  "Konto-Audit", "Health-Score", "Testwelle auswerten", "Ad-Fatigue prüfen".
  Lädt bei Spezialthemen gezielt die belegten Wissensseiten aus dem Second Brain (wiki/craft/ads, on-demand) nach
class: F
scope: agency
sensitivity: internal
source: fusion, eigenes Loop-3-System + kondensiert aus coreyhaines31/marketingskills
  skills/ads, skills/ad-creative @ 67264763 (MIT-Lizenz) + kondensiert aus
  AgriciDaniel/claude-ads (MIT-Lizenz, Stand 2026-07-11): Scoring-/Audit-/
  Signifikanz-Methodik, paraphrasiert, keine Übernahme von Code/Schemas/Skripten.
loads:
  - references/wissens-router.md
  - references/loop3-ablauf.md
  - references/hook-taxonomie.md
  - references/claims-verbote.md
  - references/vendor/coreyhaines-ads/static-ad-templates-en.md
  - references/vendor/coreyhaines-ads/rsa-output-spec-en.md
  - references/vendor/claude-ads/scoring-methodik.md
  - references/vendor/claude-ads/quellen-und-benchmarks.md
  - references/vendor/claude-ads/experimente-und-monitoring.md
  - references/vendor/claude-ads/automatisierungs-tiers.md
requires_skills: [copywriting@^0, offers@^0, eval@^0, ads-video@^0, ads-statics@^0]
loads_external: ["/root/.claude/forbidden.md"]
completion_criteria:
  - "copywriting/scripts/forbidden-check.py auf jedem Ship-Output gelaufen, Exit 0 — hartes Gate vor G1"
  - "0 verbotene Claims im Live-Set (claims-qa Block, Sol frische Session)"
  - "G1-Stil grün, dann G2 >= 0.7 auf jedem Ship-Output (Gate-Definition: references/loop3-ablauf.md → Abschnitt Gates, Rubrik evals/rubrics/ads.md)"
  - "Schaltung nur mit Raphaels Signatur + Budget-Egress-Gate"
---

# ads — Loop 3: Paid Ads

**Lies zuerst:**
`/root/clients/client-<name>/wiki/ICP.md`, `OFFER.md`, `PROOF.md`, `VOICE.md`
(Dossier aus Loop 1: Pflicht-Voraussetzung),
`/root/raphael-brain/wiki/craft/hooks/` (Swipe-File), `/root/raphael-brain/wiki/hot.md`.

## Zweck (1 Satz)

Aus dem Dossier scroll-stoppende, policy-saubere Meta-Ads bauen und gegen echte KPIs
in Testwellen verbessern.

## Reference-Routing (bei Bedarf laden, nicht vorab)

| Situation | Laden | Inhalt |
|---|---|---|
| Kill/Keep/Scale auf laufendem Konto entscheiden | `references/loop3-ablauf.md` (Abschnitt Kill/Keep/Scale-Engine) | TCPL-Anker, Ad-Count-Deckel, Fatigue-Bänder, Scaling-Protokoll |
| Hook diagnostizieren oder neu schreiben | `references/hook-taxonomie.md` | Hook-Typen, 3-Komponenten-Modell, Diagnose-Trichter |
| Statics-Brief für Design/design bauen (Kern; Tiefe bei Bedarf: `ads-create.md`) | `references/vendor/coreyhaines-ads/static-ad-templates-en.md` | 15 Layout-Vorlagen, Output-Format, Kunden-Review-Artefakt |
| Google-Search-RSAs statt/zusätzlich zu Meta | `references/vendor/coreyhaines-ads/rsa-output-spec-en.md` | Harte Zeichenlimits + Pflicht-Output-Reihenfolge |
| Claims prüfen | `references/claims-verbote.md` | HWG/UWG-Verbotsliste |
| Konto-Audit / Health-Score bauen (Kern; Formel-Tiefe bei Bedarf: `scoring-system.md`, voller Multi-Plattform-Workflow: `ads-audit.md`) | `references/vendor/claude-ads/scoring-methodik.md` | pass/fail/unknown/not_applicable, Schweregewichte, Coverage-Ampel, versionierte JSON-Reports |
| Benchmark zitieren oder Fatigue/Anomalie einschätzen | `references/vendor/claude-ads/quellen-und-benchmarks.md` | Belegpflicht, Vergleichs-Rangfolge, Konto-Baseline statt fixer Branchenwert |
| Testwelle aufsetzen oder auswerten (Kern; Design-/Auswertungs-Workflow bei Bedarf: `ads-test.md`) | `references/vendor/claude-ads/experimente-und-monitoring.md` | Pre-Registrierung, Stopp-Regel, Anti-Peeking, Monitoring-Disziplin |
| Automatisierungsgrad (Advantage+/Automated Rules) einordnen | `references/vendor/claude-ads/automatisierungs-tiers.md` | T0-T4-Klassifikation, Bezug zum Schaltungs-Gate |

## Wissens-Router (Second Brain)

Die früheren ~39 Einzel-Slash-Skills sind jetzt belegte Wissensseiten unter
`/root/raphael-brain/wiki/craft/ads/` (Unterordner: grundlagen/ plattformen/ creative/ messung/ strategie/). Für die **häufigsten** Fälle:

- Meta-Konto prüfen/bauen (Normalfall bei Raphael) → `plattformen/ads-meta.md`
- Kampagnenkonzepte/Copy/Briefs neu erzeugen → `creative/ads-create.md`
- Konto-Audit/Health-Score über 1-12 Plattformen → `grundlagen/ads-audit.md`
- Testwelle designen/auswerten (Signifikanz) → `strategie/ads-test.md`

**Spezialthema (andere Plattform, Quermaterie wie Attribution/Budget/Bidding/Scoring,
Pipeline-Schritt oder belegte Referenz-Notiz)?** Lies zuerst
`references/wissens-router.md` und dann die 1-3 passenden Brain-Seiten daraus:
nie alle Seiten laden, nie aus dem Gedächtnis diagnostizieren.

**Kern vs. Tiefe:** Die operativen `references/` (loop3-ablauf, hook-taxonomie,
claims-verbote, static-ad-templates) sind der **Kern** jeder Arbeit; die Brain-Seiten
sind **Tiefen-Nachschlag** für Spezialfälle. Bei Themen-Überschneidung (z. B. „Copy
erzeugen": reference vs. `ads-create.md`) **führt die `references/`-Quelle**.

## Strategie-Regel: Angles zuerst mit Statics testen, Gewinner zu Video machen

**Statics-first-Sequenz** (Beleg: `raw/evidence/2026-07-23-ads-wissenspaket-2/ig-reel-angle-statics-video/analyse.md`):
neue Angles werden zuerst als einfache Statics getestet (billiger/schneller zu produzieren als
Video), bevor überhaupt ein Video-Skript entsteht. Gewinnt eine Static (bester Cost-per-Ergebnis,
nicht Klicks), wird ihr Hook 1:1 in mehrere Video-Varianten übernommen. Nur der Body/die
Pain-Point-Ansprache variiert, der Hook bleibt eingefroren. Reihenfolge im Ablauf: **angles →
statics (Angle-Screening) → Gewinner-Angle an `video-scripts` (Skript-Produktion) →
Testwelle**. Format-Frage (Static vs. Video) ist der Angle-Frage bewusst untergeordnet: bei
MAKEs Budget läuft primär und laufend Static+Video desselben Angles im selben Testing-Ad-Set
(siehe `references/wissens-router.md` → teststrategie), die Statics-first-Sequenz ist der
Spezialfall für einen **neuen, ungetesteten** Angle. Einschränkung: Einzelfall-Beleg eines
Coaches (unverifizierte Eigenangabe), trägt nur bei Call-Funnel-artigen Offers verlässlich,
nicht automatisch bei E-Com.

## Ablauf (Detail in references/loop3-ablauf.md)

1. **voc-mine** — Voice-of-Customer aus Transkripten/Reviews (Kimi 1M). G1. Wörtliche
   Kundensprache → `client-<name>/wiki/voc.md`.
2. **angles** — Winkel/Big-Ideas (Fable, Checkpoint Raphael).
3. **hooks** — Scroll-Stopper (Sonnet-Worker, Reuse je Kunde). Taxonomie in
   `references/hook-taxonomie.md`. Stil über `copywriting`. G1-Stil → G2.
4. **video-scripts** — Skripte pro gewähltem Hook. **→ Skill `ads-video` mit
   `kunde=<slug>`** (Delegation, siehe Strategie-Regel oben: erst nach Statics-Gewinner).
5. **ad-copy** — Primary Text / Headline / Description (Sonnet). G1 → G2.
6. **statics** — Briefs für statische Creatives. **→ Skill `ads-statics` mit `kunde=<slug>`**
   (Delegation) → verweist dort weiter auf `design` fürs Visuelle. Layout-Vorlagen in
   `references/vendor/coreyhaines-ads/static-ad-templates-en.md` (15 Templates, über alle
   Zyklen statt auf 2-3 Favoriten zu clustern). **Grounding-Pflicht:** jedes Konzept braucht
   eine Quelle (echte Review/Winning-Ad/Ad-Kommentar aus voc.md/PROOF.md): keine erfundenen
   Claims/Statistiken/Testimonials. Fehlt Rohmaterial: stoppen und Raphael/Kunden um Material
   bitten, nicht ungegroundet weiterproduzieren. Für Kunden-Freigabe eines Batches das
   Review-Artefakt `assets/creative-review-template.html` nutzen (ein HTML-File,
   JSON-Datenblock, kein Build nötig).
7. **claims-qa**: **Sol, frische Session.** Jede Behauptung: belegt / riskant / verboten.
   Gegen Meta-Policy **und** HWG/UWG-Verbotsliste (`references/claims-verbote.md`).
8. **Schaltung**: **Signatur (Geld = rot) + Budget-Egress-Gate.** Nie autonom.
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
| Hooks / Ad-Copy | Sonnet-Worker (Reuse je Kunde) | G1 Stil → G2 |
| Video-Skripte | → Skill `ads-video` | wie dort definiert |
| Statics-Briefs | → Skill `ads-statics` | wie dort definiert |
| Claims-QA (Meta-Policy + HWG/UWG) | Sol, frische Session | belegt / riskant / verboten |
| Schaltung | — | **Signatur (Geld=rot) + Budget-Egress-Gate** |
| Performance vs. echte KPI → nächste Testwelle | Sonnet | G4 |

## Gotchas

- **G2-Scores sind Stil-Checks, nie "Performance-Beweis" gegenüber Kunden.** Nur echte
  CTR/CPL/CVR zählen als Ergebnis (→ report).
- **Ads-Daten kommen per Datei-Export oder read-only Zugang: nie Schreib-Scope.** Ein
  Ads-Schreibzugriff berührt direkt die Rot-Klasse Budgets.
- claims-qa läuft in **frischer Session, anderer Modellfamilie** (Sol): nie Selbstprüfung
  des Autors.
- HWG (Heilmittelwerbung) trifft Gesundheit/Beauty/Supplements hart: Verbotsliste immer prüfen.
- Hook-Autor darf nicht sein eigener Judge sein (Regel 8).
- **Andromeda-Budget-Klumpen ist KEIN Fehler (Stand 2025).** Wenn Meta bei ~12 aktiven
  Ads fast das ganze Budget auf eine Anzeige legt, ist das erwartetes Matching: nicht
  manuell umverteilen. (Andromeda-Details + Datumshinweis in loop3-ablauf.md.)
- **Negative Kommentare sind kein Abschalt-Signal.** Nie nach Kommentarstimmung ab-/anschalten
  oder Kommentare löschen. Nur nach CPL/Ergebnis entscheiden. Bissige Kommentare als
  Ad-Rohstoff recyceln (Kommentar einblenden → Beweis-Sequenz).
- **Link-CTR > 2 % = Warnsignal, nicht Erfolg.** Zu wenig Filterung im Text: viele falsche
  Klicks kosten Geld ohne Conversion. Mehr Committed-Sprache senkt die CTR (~1 %) und
  vervielfacht oft die LP-Conversion. Jede Metrik ist ein Regler, kein An/Aus-Schalter.
- **Kein Testwellen-Kill ohne Ersatz in der Pipeline.** Killt eine Ad-Regel eine Anzeige,
  ohne dass 2-3 Iterationen bereitstehen, wird das Budget einfach zurückgefahren: nie eine
  "Zombie"-Anzeige unbeobachtet weiterlaufen lassen (Details: Kill/Keep/Scale-Engine).
- **Statics-Batch ohne Grounding-Quelle ist ein Blocker, keine Stilfrage.** Ein Konzept ohne
  Review-/Winning-Ad-/Kommentar-Beleg wird nicht ausgeliefert: dieselbe Härte wie claims-qa,
  nur schon am Brief statt erst am Text.
- **Es gibt keine feste Ad-Fatigue-Frequenz oder Signifikanz-Schwelle, die für jedes Konto
  gilt.** Immer gegen die eigene Konto-Baseline vergleichen (Details:
  `references/vendor/claude-ads/quellen-und-benchmarks.md`). Eine erfundene Konstante
  wie "Frequency > 3" klingt konkret und ist trotzdem oft falsch.
- **Testwelle ohne vorab festgelegte Stopp-Regel ist keine Testwelle.** Wiederholtes Peeken
  und Abbruch beim ersten guten Ergebnis produziert Falsch-Positive, die sich wie ein
  Gewinner anfühlen (`references/vendor/claude-ads/experimente-und-monitoring.md`).
- **Health-Score ist nie eine Buchstaben-Note.** Jeder Score bekommt Coverage-Status und
  Datenfenster dazu; unter 60 % Coverage wird der Score nicht als Konto-Note präsentiert
  (`references/vendor/claude-ads/scoring-methodik.md`).
- **"No Spend" ist fast immer ein Hook-Problem, nicht ein Budget-/Targeting-Problem.** Eine
  Anzeige, die keinen Spend bekommt, wird an den ersten 3 Sekunden (Hook) repariert oder
  ersetzt: nicht am Targeting gedreht. Ausnahme: technische Ursache (Ablehnung, Budget-Cap,
  frisch gestartete Lernphase) statt kreativer Ursache (Beleg:
  `/root/raphael-brain/wiki/craft/ads/nugget-sammlungen/media-buying-scaling.md` →
  Täglicher Kill/Keep/Scale-Check; Candidate, noch nicht freigegeben, wandert nach Freigabe
  an `wiki/craft/ads/strategie/2026-07-20-testing-vs-scaling-kampagnenstruktur.md`).
- **Tages-Zahlen bei Ads sind Rauschen: nie auf Tagesbasis killen/skalieren.** Bei
  schwankenden Tageswerten auf 3-7-Tage-Durchschnitt umstellen, sonst wird normale
  Volatilität für ein Signal gehalten (Beleg: gleiche Quelle wie oben). Bei sehr kleinem
  Budget/wenig Conversions reicht auch das 3-7-Tage-Fenster oft nicht. Dann länger
  beobachten statt trotzdem zu entscheiden.
- **Statics-first-Sequenz ist kein MAKE-Standard, sondern ein Einzelfall-Beleg für neue
  Angles.** MAKEs laufender Standard ist Static+Video desselben Angles gleichzeitig im
  selben Testing-Ad-Set (siehe Strategie-Regel oben). Die sequenzielle Statics-vor-Video-
  Idee stammt aus einer unabhängigen Quelle mit unverifizierten Eigenangaben und ersetzt den
  MAKE-Standard nicht, sie ergänzt ihn nur für brandneue, ungetestete Angles.
