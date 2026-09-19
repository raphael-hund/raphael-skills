# Advertiser → Markt-Segment

Quelle: 711 Referenz-Records, Auswertung vom 13.08.2026 (Roh-Auswertung
am 18.09.2026 auf Chef-Direktive archiviert/entfernt; die Segment-Zuordnung
lebt in dieser Datei und den vier Segment-Seiten unter `maerkte/`).

Ein Skill lädt den Craft-Kern plus **genau ein** Segment.

## Start-Segmente

| Segment | n von 711 | Typische Marken |
|---|---:|---|
| agenturen-coaching | 327 | Marc Evers, Speedscaling, Charlie Morgan, Dr. Matt Shiver, Ben Heath, Hormozi, Finally Freelancing |
| b2b-dienstleister | 211 | Neuhaus Digital, Pascal Harting, Finseo, DatAds, Mario Müller |
| local-service-handwerk | 133 | Enpal, SEOLabs, lokale Services |
| uebertragbar | 40 | Rest ohne klare Marke oder branchenfremd |

## Kunde → Segment (Default)

Das frühere Referenzkonto (Slug entfernt 18.09.2026) war `local-service-handwerk`; die Methodik dazu steht in `eigene-regeln.md`.

| Kunde | Segment | Grund |
|---|---|---|
| wilhelm, sorglos | local-service-handwerk | Local-Service-Kunden |
| evers | agenturen-coaching | Coaching/Agentur-Offer |
| unbekannt | uebertragbar | kein Markt raten |

Überschreiben: `python3 scripts/load-wissen.py --skill <name> --kunde <slug> --segment <segment>`

## Lade-Regel

1. `python3 scripts/load-wissen.py --skill <name> --kunde <slug>`
2. Segment-Datei zuerst: `references/maerkte/<segment>.md`
3. Detailwissen über `references/INDEX.md` passend zur Aufgabe wählen
4. Nie die anderen drei Segmente laden

## Streit (nicht entschieden)

das Referenzkonto und der ads-Router testen neue Angles zuerst als Static.
Evers beschreibt sowohl einfache Static-Tests vor Video als auch Video-/VSL-
Strecken in weiterentwickelten Angeboten. Seine Quelle und die jeweilige Phase
nennen; daraus folgt kein allgemeines Video-first-Gebot.

Belege:

- ads-Skill Statics-first: `SKILL.md` Abschnitt Strategie-Regel
- Evers-Formate im Agenturkontext: `references/maerkte/agenturen-coaching.md`

Der Katalog hält den Streit. Der Skill entscheidet nicht still.
