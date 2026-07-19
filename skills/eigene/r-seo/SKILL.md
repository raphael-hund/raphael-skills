---
name: r-seo
version: 0.2.0
description: >
  Feuert für SEO (Loop 4): Keyword-/SERP-Research, Informationsarchitektur,
  Briefs, Produktion, Tech-QA, GSC-Monitoring, Refresh. Trigger: "SEO",
  "Keyword-Research", "Content-Brief", "Ranking", "Tech-Audit".
class: F
scope: agency
sensitivity: internal
loads: [references/loop4-ablauf.md, references/tech-qa-checkliste.md]
requires_skills: [r-copywriting@^0, r-eval@^0]
completion_criteria:
  - "Tech-QA 0 Blocker (Meta/Schema/Canonical/Links) — G1 hart"
  - "G2 auf jedem Ship-Text >= 0.7"
  - "Belegpflicht: jede Zahl/Behauptung im Brief zeigt auf echten Export (SERP/GSC) — nichts erfunden"
  - "Publish nur mit Raphaels Signatur"
---

# r-seo — Loop 4: SEO

**Lies zuerst:**
`/root/clients/client-<name>/wiki/ICP.md`, `OFFER.md`, `VOICE.md` (Dossier aus Loop 1),
`/root/raphael-brain/wiki/hot.md`. Stil immer über **r-copywriting**.

## Zweck (1 Satz)

Aus Suchintention belegbaren, technisch fehlerfreien Content bauen, der rankt, und bei
Ranking-Decay auffrischen.

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

Bevor r-seo Arbeit annimmt, den richtigen Kanal wählen — sonst optimiert man Suche, wo es
gar keine gibt:

- **Google (SEO/SEA) = bestehende Nachfrage.** Test: die eigene Leistung des Kunden googeln.
  Erscheinen Wettbewerber als Sponsored Ads, existiert Suchnachfrage → SEO/SEA lohnt.
- **FB/IG = Nachfrage erzeugen.** Kennt noch niemand das Angebot, gibt es nichts zu ranken;
  dann erst über Social Nachfrage schaffen (das ist **r-ads**, nicht r-seo).

### Brand-Protect-Search: die Paid→Search-Brücke (⭐)

Sobald ein Kunde **signifikant auf FB/IG spielt**, ergänzend eine **Branded-Search-Kampagne**
auf Google einrichten (Marken-/Namens-Keywords). Grund: Wer den Namen wiederholt in Social-Ads
sieht, sucht ihn später direkt bei Google — diese Nachfrage abzufangen ist der **günstigste
erreichbare Lead**. Ohne Brand-Protect greift ein Wettbewerber die Marken-Suche als Anzeige ab.
→ Trigger für r-seo: bei aktiver FB/IG-Kampagne Brand-Protect als Aufgabe anlegen und mit
r-ads koordinieren.

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
