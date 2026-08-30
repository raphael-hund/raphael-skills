# Wissens-Router — ads

Ein Skill, sechs Teile. Pflicht im Skill. Brain optional.

## Teile

| Teil | Datei |
|---|---|
| Strategie | `teil-strategie.md` |
| ICP | `teil-icp.md` |
| Research | `teil-research.md` |
| Video (Ads Scripts) | `teil-video.md` |
| Statics | `teil-statics.md` |
| Performance (7/30 + watch) | `loop3-ablauf.md` |

```bash
python3 /root/raphael-skills/skills/eigene/ads/scripts/load-wissen.py \
  --skill ads --kunde <slug>
```

Genau ein Segment aus `references/maerkte/`. Fehlt Wiki: `BRAIN=skipped`.

## Tiefe (nur wenn der Teil sie nennt)

Pfade gelten von `ads/references/` aus.

| Frage | Datei |
|---|---|
| Hook-Formeln F1–F13 | `../../ads-video/references/hook-formeln.md` |
| Architekturen A1–A7 | `../../ads-video/references/skript-architekturen.md` |
| Gemessene Sprache | `../../ads-video/references/voice-dna-ads.md` |
| Video-Formate (Talking Head, B-Roll, Green Screen, Skit, Split Screen) | `../../ads-video/references/video-visuals.md` |
| Dossier-Schema | `../../ads-research/references/angle-dossier-schema.md` |
| Static-Styles S1–S8 | `../../ads-statics/references/visual-styles.md` |
| Copy-Bauformen | `../../ads-statics/references/copy-bauformen.md` |
| Konto / Testwelle / 7-30-Tage | `loop3-ablauf.md` |
| Video sehen, Frames, Transkript | `/root/raphael-skills/skills/eigene/watch/SKILL.md` |
| Claims | `claims-verbote.md` |
| Zac Regan / @startrunningads (Hooks, Copy, Creative, Funnel) | `zac-regan-startrunningads.md` |
| Zac-Regan Volltranskripte (41 Reels) | `/root/raphael-brain/raw/resource-2026-08-30-startrunningads-*.md` |

## Übergabe

Strategie nennt Static-first oder Video-first plus Konzept-Achsen.
ICP füllt Felder. Research schreibt `DOSSIER=` plus `SEGMENT=`.
Video und Statics lesen das Dossier. Ohne Dossier: ICP plus User.
