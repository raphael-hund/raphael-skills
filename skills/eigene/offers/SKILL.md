---
name: offers
version: 0.2.0
description: >
  Feuert für Angebots-Design: Offer-Stack, Preislogik, Risiko-Umkehr,
  Value-Equation (Hormozi). Trigger: "Angebot bauen", "Offer", "Preis festlegen",
  "Garantie", "Bonus-Stack", "Value Proposition schärfen".
class: M
scope: agency
sensitivity: internal
source: fusion — eigenes Hormozi-Framework + kondensiert aus coreyhaines31/marketingskills
  skills/offers @ 67264763 (MIT-Lizenz)
loads:
  - references/offer-stack.md
  - references/vendor/coreyhaines-offers/guarantee-design-en.md
requires_skills: [eval@^0]
completion_criteria:
  - "Offer-Stack + Preislogik + Risiko-Umkehr dokumentiert in OFFER.md"
  - "Jede Ergebnis-Zahl mit Beleg (sonst als Annahme markiert)"
  - "Keine Formulierung aus der Banned-Vocabulary-Liste im finalen Angebotstext"
---

# offers — Angebots-Architektur

**Lies zuerst:**
`/root/raphael-brain/business/` (Positionierung, falls zentral) **und** zur Laufzeit
`/root/clients/client-<name>/wiki/ICP.md`, `PROOF.md`, `OFFER.md` (Vorlage:
`/root/raphael-brain/templates/offer-template.md`).

## Zweck (1 Satz)

Ein Angebot so bauen, dass der wahrgenommene Wert den Preis klar übersteigt und das Risiko
beim Anbieter liegt — als Baustein von Loop 1 (offer-architect).

## Ablauf (Detail in references/offer-stack.md)

1. **Traumergebnis** — das konkrete Ergebnis, das der ICP wirklich will (aus ICP.md).
2. **Value-Equation** — Wert = (Traumergebnis × Eintrittswahrscheinlichkeit) ÷
   (Zeitverzug × Aufwand/Opfer). An allen vier Hebeln drehen.
3. **Offer-Stack** — Kernleistung + Boni, die genau die Einwände/Hindernisse auflösen; jeder
   Bonus mit Einzelwert → Gesamtwert ≫ Preis.
4. **Preislogik** — Anker, Struktur (einmalig/Retainer/erfolgsbasiert), Zahlungsoptionen.
5. **Risiko-Umkehr** — Garantie, die das Risiko vom Käufer zum Anbieter verschiebt
   (bedingt/unbedingt/ergebnisbasiert) — nur einlösbar formulieren (UWG!). Acht
   Garantie-Typen + Entscheidungsbaum in
   `references/vendor/coreyhaines-offers/guarantee-design-en.md` — Typ nach
   Kundensegment/Refund-Toleranz wählen, nicht per Standardvorlage.

## Gotchas

- **Jede Ergebnis-/Wert-Zahl braucht Beleg** (PROOF.md) — unbelegt = als Annahme markieren,
  nicht als Fakt verkaufen (UWG § 5 Irreführung).
- Garantien nur mit klaren, **einlösbaren** Bedingungen — sonst rechtliches Risiko.
- Offer ist Business-Wissen: kanonisch nach `business/` schreibt **nur Raphael**; der Skill
  liefert den Entwurf, Checkpoint Raphael in Loop 1.
- Preis nicht aus dem Bauch: gegen ICP-Zahlungsbereitschaft + Wettbewerb + Marge prüfen.
- Boni lösen Einwände, sind kein Ramsch-Stapel — Relevanz vor Menge.
- **Banned Vocabulary** (Angebotstexte/Headlines): "Game-Changer", "revolutionär",
  "disruptiv", "next-level", "10x" (liest sich wie KI-Slop) · "Geheimnis", "was dir keiner
  sagt" (Clickbait) · "begrenzte Zeit" ohne echtes Enddatum (Lüge) · "im Wert von X €" ohne
  Vergleichsgrundlage (Aufblähung) · "100 % garantiert" ohne genannte Bedingungen (rechtlich
  riskant, UWG). Immer konkrete Zahlen, benannte Kunden, echte Zeiträume statt Superlative.
- **Wann Offer-Taktiken NICHT einsetzen:** manipulative Verknappung (falsche Countdown-
  Timer, erfundene "nur noch 3 Plätze") — kurzfristiger Lift, dauerhafter Vertrauensverlust;
  über­versprechende Garantien ("Umsatz verdoppeln oder Geld + 1.000 € zurück") — die
  wenigen Fälle, die einlösen, schaden öffentlich mehr als der Umsatz bringt; Bonus-
  Inflation (viele "Boni im Wert von X" auf ein günstiges Produkt) — erfahrene Käufer sehen
  das sofort. (Kondensiert aus coreyhaines31/marketingskills skills/offers/SKILL.md.)
