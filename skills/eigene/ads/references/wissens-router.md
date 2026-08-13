# Wissens-Router — ads

Ein Skill, vier Teile. Pflicht im Skill. Brain optional.

## Teile

| Teil | Datei |
|---|---|
| ICP | `references/teil-icp.md` |
| Research | `references/teil-research.md` |
| Video (Ads Scripts) | `references/teil-video.md` |
| Statics | `references/teil-statics.md` |

```bash
python3 /root/raphael-skills/skills/eigene/ads/scripts/load-wissen.py \
  --skill ads --kunde <slug>
```

Genau ein Segment aus `references/maerkte/`. Fehlt Wiki: `BRAIN=skipped`.

## Tiefe (nur wenn der Teil sie nennt)

| Frage | Datei |
|---|---|
| Hook-Formeln F1–F13 | `../ads-video/references/hook-formeln.md` |
| Architekturen A1–A7 | `../ads-video/references/skript-architekturen.md` |
| Gemessene Sprache | `../ads-video/references/voice-dna-ads.md` |
| Dossier-Schema | `../ads-research/references/angle-dossier-schema.md` |
| Static-Styles | `../ads-statics/references/visual-styles.md` |
| Konto / Testwelle | `references/loop3-ablauf.md` |
| Claims | `references/claims-verbote.md` |

## Übergabe

ICP füllt Felder. Research schreibt `DOSSIER=` plus `SEGMENT=`.
Video und Statics lesen das Dossier. Ohne Dossier: ICP plus User.
