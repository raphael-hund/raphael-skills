# Advertiser → Markt-Segment

Quelle: 711 Referenz-Records, 2026-08-13.
Zählung: `references/analyse-2026-08-13/counts.json`
Zuordnung je Marke: `references/analyse-2026-08-13/advertiser-segment.json`

Ein Skill lädt den Craft-Kern plus **genau ein** Segment.

## Start-Segmente

| Segment | n von 711 | Typische Marken |
|---|---:|---|
| agenturen-coaching | 327 | Marc Evers, Speedscaling, Charlie Morgan, Dr. Matt Shiver, Ben Heath, Hormozi, Finally Freelancing |
| b2b-dienstleister | 211 | Neuhaus Digital, Pascal Harting, Finseo, DatAds, Mario Müller |
| local-service-handwerk | 133 | Enpal, SEOLabs, lokale Services |
| uebertragbar | 40 | Rest ohne klare Marke oder branchenfremd |

## Kunde → Segment (Default)

| Kunde | Segment | Grund |
|---|---|---|
| make | local-service-handwerk | MAKE verkauft an Handwerk und lokale Dienstleister |
| wilhelm, sorglos | local-service-handwerk | Local-Service-Kunden |
| evers | agenturen-coaching | Coaching/Agentur-Offer |
| unbekannt | uebertragbar | kein Markt raten |

Überschreiben: `python3 scripts/load-wissen.py --skill <name> --kunde <slug> --segment <segment>`

## Lade-Regel

1. `python3 scripts/load-wissen.py --skill <name> --kunde <slug>`
2. Segment-Datei zuerst: `references/maerkte/<segment>.md`
3. Brain nur zusätzlich, nie als Pflicht
4. Nie die anderen drei Segmente laden

## Streit (nicht entschieden)

MAKE und der ads-Router testen neue Angles zuerst als Static.
Evers validiert ein Offer zuerst als Video, Statics hängen am Open-VSL.

Belege:

- ads-Skill Statics-first: `SKILL.md` Abschnitt Strategie-Regel
- Evers Video-first: `references/maerkte/agenturen-coaching.md`

Der Katalog hält den Streit. Der Skill entscheidet nicht still.
