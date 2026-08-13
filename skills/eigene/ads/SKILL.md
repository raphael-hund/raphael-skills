---
name: ads
version: 2.0.0
description: >
  Ein Skill für Paid Ads. Vier Teile: ICP, Research, Video-Skript, Statics.
  Video-Skripte klingen wie eine Sprachnachricht. Läuft ohne Second Brain.
  Trigger: "Ads bauen", "Ad-Skript", "Video-Skript", "Ads Scripts",
  "Static-Briefs", "Angle-Dossier", "ICP für Ads", "Hooks schreiben",
  "Creatives", "Testwelle", "Konto-Audit".
class: F
scope: agency
sensitivity: internal
source: >
  Fusion Loop-3 plus Korpus 711. v2.0.0 legt vier Teile in einen Skill.
  Alte Einzel-Skills ads-video, ads-statics, ads-research, ads-copy zeigen hierher.
loads:
  - references/teil-icp.md
  - references/teil-research.md
  - references/teil-video.md
  - references/teil-statics.md
  - references/segment-map.md
  - references/wissens-router.md
  - references/claims-verbote.md
loads_external: ["/root/.claude/forbidden.md"]
requires_skills: [copywriting@^0]
completion_criteria:
  - "Genau ein Teil gewählt und dessen Datei gelesen"
  - "Genau ein Markt-Segment geladen über scripts/load-wissen.py"
  - "copywriting/scripts/forbidden-check.py auf jedem Ship-Text Exit 0"
  - "Keine erfundene Kundenzahl"
  - "Schaltung nur mit Raphaels Signatur"
---

# ads — ICP, Research, Video, Statics

## Schritt 0

```bash
python3 /root/raphael-skills/skills/eigene/ads/scripts/load-wissen.py --skill ads --kunde <slug>
```

Craft-Kern plus genau ein Segment unter `references/maerkte/`.
Wiki fehlt: `BRAIN=skipped`. Skill läuft weiter.

## Welcher Teil

| Auftrag | Datei |
|---|---|
| Wer kauft, was tut weh | `references/teil-icp.md` |
| Angles, Konkurrenz, Dossier | `references/teil-research.md` |
| **Video-Ad-Skript (Ads Scripts)** | `references/teil-video.md` |
| Static-Brief | `references/teil-statics.md` |

Nur diese eine Datei lesen. Tiefe erst, wenn der Teil sie nennt.

Video ist der Default, wenn der User „Skript" oder „Ads Scripts" sagt.

## Reihenfolge

ICP → Research → Video oder Statics.
Fehlt ICP: holen oder `kunden-layer: fehlt` schreiben, dann Craft-Kern.
Streit Static-first vs Video-first nicht still entscheiden. Im Output nennen.

Konto, Kill/Keep/Scale, Scoring: `references/loop3-ablauf.md` nur bei Bedarf.
Claims vor Schaltung: Sol, frische Session, `references/claims-verbote.md`.
Geld: Signatur. Nie autonom schalten.

## Rot

- Second Brain als Pflicht behandeln
- Alle vier Teile auf einmal laden
- Kundenzahlen erfinden
- Coaching-Umsatz in Local-Service kopieren
- „Wenn du [ICP] bist und [Outcome] willst, brauchst du [Offer]"
