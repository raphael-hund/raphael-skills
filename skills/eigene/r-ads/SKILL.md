---
name: r-ads
version: 0.1.0
description: >
  Feuert für Meta-/Paid-Ads (Loop 3): Voice-of-Customer, Angles, Hooks,
  Video-Skripte, Ad-Copy, Statics-Briefs, Claims-QA, Performance-Analyse.
  Trigger: "Ads bauen", "Hooks schreiben", "Creatives", "Anzeigentexte", "Testwelle".
class: F
scope: agency
sensitivity: internal
loads: [references/loop3-ablauf.md, references/hook-taxonomie.md, references/claims-verbote.md]
requires_skills: [r-copywriting@^0, r-offers@^0, r-eval@^0]
completion_criteria:
  - "0 verbotene Claims im Live-Set (claims-qa Block, Sol frische Session)"
  - "G1-Stil grün, dann G2 >= 0.7 auf jedem Ship-Output"
  - "Schaltung nur mit Raphaels Signatur + Budget-Egress-Gate"
---

# r-ads — Loop 3: Paid Ads

**Lies zuerst:**
`/root/clients/client-<name>/wiki/ICP.md`, `OFFER.md`, `PROOF.md`, `VOICE.md`
(Dossier aus Loop 1 — Pflicht-Voraussetzung),
`/root/raphael-brain/wiki/swipes/` (Swipe-File), `/root/raphael-brain/wiki/hot.md`.

## Zweck (1 Satz)

Aus dem Dossier scroll-stoppende, policy-saubere Meta-Ads bauen und gegen echte KPIs
in Testwellen verbessern.

## Ablauf (Detail in references/loop3-ablauf.md)

1. **voc-mine** — Voice-of-Customer aus Transkripten/Reviews (Kimi 1M). G1. Wörtliche
   Kundensprache → `client-<name>/wiki/voc.md`.
2. **angles** — Winkel/Big-Ideas (Fable, Checkpoint Raphael).
3. **hooks** — Scroll-Stopper (Sonnet-Worker, Reuse je Kunde). Taxonomie in
   `references/hook-taxonomie.md`. Stil über `r-copywriting`. G1-Stil → G2.
4. **video-scripts** — Skripte pro gewähltem Hook (Sonnet). G1 → G2.
5. **ad-copy** — Primary Text / Headline / Description (Sonnet). G1 → G2.
6. **statics** — Briefs für statische Creatives → verweist auf `r-design` fürs Visuelle.
7. **claims-qa** — **Sol, frische Session.** Jede Behauptung: belegt / riskant / verboten.
   Gegen Meta-Policy **und** HWG/UWG-Verbotsliste (`references/claims-verbote.md`).
8. **Schaltung** — **Signatur (Geld = rot) + Budget-Egress-Gate.** Nie autonom.
9. **perf-analyse** — Performance vs. echte KPI → nächste Testwelle (Sonnet, G4).

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
  CTR/CPL/CVR zählen als Ergebnis (→ r-report).
- **Ads-Daten kommen per Datei-Export oder read-only Zugang — nie Schreib-Scope.** Ein
  Ads-Schreibzugriff berührt direkt die Rot-Klasse Budgets.
- claims-qa läuft in **frischer Session, anderer Modellfamilie** (Sol) — nie Selbstprüfung
  des Autors.
- HWG (Heilmittelwerbung) trifft Gesundheit/Beauty/Supplements hart — Verbotsliste immer prüfen.
- Hook-Autor darf nicht sein eigener Judge sein (Regel 8).
