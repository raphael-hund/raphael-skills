# Claims-Verbotsliste — Meta-Policy + HWG/UWG (DE)

Für **claims-qa** (Sol, frische Session). Jede Behauptung einordnen: **belegt / riskant / verboten**.
Verboten = harter Block, geht nicht live. Riskant = umschreiben + belegen, dann erneut prüfen.

## A. Meta Advertising Policy (Auszug, häufigste Blocker)

- **Personal attributes**: Anrede, die persönliche Merkmale unterstellt/bejaht, Gesundheit,
  Gewicht, Alter, Religion, sexuelle Orientierung, finanzielle Not, kriminelle Vergangenheit.
  Verboten: "Bist du übergewichtig?" / "Leidest du an Depressionen?".
  Erlaubt: "Unser Programm für mehr Energie".
- **Unrealistic outcomes / Schulden-Weg-Zauber**: garantierte Einkommens-/Abnehm-/Heilversprechen.
- **Before/After** mit unrealistischer/idealer Transformation (Gesundheit, Fitness, Beauty).
- **Nicht-existierende Funktionalität**: fake Play-Buttons, fake Cursor, fake Schließen-X.
- **Sensational / shock content**, Clickbait, irreführende Behauptungen.
- **Non-functional landing page** / Mismatch Anzeige ↔ Zielseite.
- **Zählerstände/Countdowns**, die faken Bestand/Dringlichkeit vortäuschen.
  ⚠️ **Querverweis Chef-Vetos 59/60 (18.09.2026, `konflikt-register.md`):** Urgency/Countdown und Knappheit sind intern **erlaubt** — die Meta-Policy bleibt die Grenze (kein fake-Bestand als technischer Fake/Zähler). Einordnung: mindestens `riskant`, echter Grund/Beleg mitliefern, kein internes Verbot mehr.
- **Third-party-Marken/Prominente** ohne Genehmigung (Testimonial-Fake).

## B. HWG (Heilmittelwerbegesetz, DE) — Gesundheit/Beauty/Supplements

- **Keine Heilversprechen** ("heilt", "beseitigt Krankheit X", "wirkt garantiert").
- **Krankheitsbezogene Werbung** nur eng geregelt; für viele Mittel Laienwerbung verboten.
- **Keine Vorher-Nachher-Bilder** bei operativen/ästhetischen Eingriffen (§ 11 HWG).
- **Keine Angst-Werbung** ("wenn Sie X nicht tun, drohen schwere Folgen").
- **Keine fachlichen Empfehlungen/Testimonials** von Ärzten/Wissenschaftlern zur Wirkung.
- **Health Claims (EU VO 1924/2006)**: nur zugelassene Aussagen für Lebensmittel/Supplements.

## C. UWG (Gesetz gegen unlauteren Wettbewerb, DE)

- **Irreführung** (§ 5): falsche/missverständliche Angaben zu Ergebnis, Preis, Verfügbarkeit,
  Auszeichnungen, Testsiegeln.
- **Preiswerbung**: durchgestrichene "Statt-Preise" nur mit echtem Referenzpreis.
- **Spitzenstellungswerbung** ("Nr. 1", "der Beste", "einzigartig") nur mit Beleg.
- **Testsiegel/Bewertungen**: Quelle + Fundstelle nötig; keine erfundenen Bewertungen (§ 5b).
- **Dringlichkeit/Countdown** ohne echten Grund = irreführend.
  ⚠️ **Querverweis Chef-Vetos 59/60/70 (18.09.2026, `konflikt-register.md`):** Urgency, Knappheit (auch bei freiem Bestand) und „Gratis" im Hook (wenn danach ein Vorausgespräch kommt) sind intern **erlaubt** — UWG/Meta-Policy bleiben als Grenze geprüft. Einordnung: `riskant` statt `verboten`, echten Grund belegen, dann erneut prüfen.
- **Garantie**: nur mit klaren, einlösbaren Bedingungen.

## Einordnungs-Heuristik (Output-Format der claims-qa)

Pro Claim eine Zeile:
`CLAIM: "<text>" | STATUS: belegt|riskant|verboten | GRUND: <Regel A/B/C> | BELEG/FIX: <…>`

Ein einziges `verboten` blockt das gesamte Live-Set (Ship-Bedingung: 0 verbotene Claims).
