---
name: brainstorm
version: 2.0.0
description: >-
  Expliziter Ideenmodus ohne Kritikerwellen. Klärt das Ziel und entwickelt bis
  zu drei Perspektiven strikt nacheinander; anschließend synthetisiert der
  Parent einmal. Keine Umsetzung. Trigger: /brainstorm, "brainstorme" oder
  "Lösungsrichtungen entwickeln".
class: O
scope: agency
sensitivity: internal
completion_criteria:
  - "Ziel, Grenzen und Entscheidungskriterien sind festgehalten"
  - "Ein bis drei Perspektiven wurden strikt nacheinander erarbeitet"
  - "Keine Perspektive hat Child-Agenten oder Kritiker gestartet"
  - "Eine Synthese nennt Empfehlung, Trade-offs und offene Entscheidung"
  - "Keine Umsetzung ohne ausdrückliche Freigabe"
---

# brainstorm — sequenzielle Perspektiven, eine Synthese

Dieser Skill ist nur für Ideen und Entscheidungen. Er implementiert nichts und
startet keine Kritiker-, Council- oder Gauntlet-Wellen.

## Harter Vertrag

- Das Ziel wird mit `plan` auf GRILL- oder SPEC-Niveau geklärt.
- Standard ist **eine** Perspektive. Wenn echte Alternativen helfen, sind bis
  zu drei Perspektiven erlaubt: konservativ, ausgewogen, ambitioniert.
- Perspektiven laufen strikt nacheinander. Gleichzeitig aktive Agenten: 1.
- Jede Perspektive ist ein Leaf: keine Child-Agenten, Workflows oder
  Provider-CLI-Spawns.
- Keine Reviewer pro Perspektive und keine Reparaturrunden.
- Der Parent synthetisiert genau einmal und benennt Empfehlung, Trade-offs,
  Risiken und die noch nötige Nutzerentscheidung.
- Kimi, Grok oder andere Modelle werden nur bei ausdrücklicher Modellwahl
  verwendet; Vielfalt wird nicht künstlich durch Providerzahl erzeugt.

## Ablauf

1. Problem, Nicht-Ziele, Constraints und Entscheidungskriterien festhalten.
2. Nur bei echtem Nutzen 2–3 disjunkte Perspektiven definieren.
3. Jeweils eine Perspektive vollständig erarbeiten und beenden, dann die
   nächste beginnen.
4. Der Parent vergleicht die Ergebnisse deterministisch entlang der vorher
   festgelegten Kriterien.
5. Eine kompakte Spec oder Entscheidungsvorlage schreiben.
6. Vor jeder Umsetzung Raphaels ausdrückliche Freigabe abwarten.

## Verbote

- Kein automatischer Aufruf von `ultracode`.
- Keine drei Kritiker je Perspektive und keine „PASS aller Stimmen“-Bedingung.
- Kein paralleles Perspektiven-Fan-out.
- Kein Commit, Push, Deploy oder Veröffentlichen.
