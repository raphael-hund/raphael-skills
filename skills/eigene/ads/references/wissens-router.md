# Wissens-Router — ads

Ein Skill mit aufgabenbezogenen Teilen und lokaler Wissensbibliothek.
Der zentrale Einstieg ist [wissen/index.md](wissen/index.md).

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

Ein zum Auftrag passendes Segment aus `references/maerkte/`.
Der Loader benötigt weder Brain noch eine Notion-Verbindung.

## Tiefe (nur wenn der Teil sie nennt)

Pfade gelten von `ads/references/` aus.

| Frage | Datei |
|---|---|
| Hooks, Skriptarchitektur, gesprochene Sprache und Videoformen | [craft/video.md](craft/video.md) |
| Dossier-Schema | [craft/dossier-schema.md](craft/dossier-schema.md) |
| Static-Styles, Copy-Bauformen und Brief | [craft/statics.md](craft/statics.md) |
| Konkrete Referenzen und Ursprung der Formeln | [craft/referenzkatalog.md](craft/referenzkatalog.md) |
| Leadqualität, CAC, Tracking, Tests und Skalierung | [wissen/leadgen-betriebsmodell.md](wissen/leadgen-betriebsmodell.md) |
| Autoren, einzelne Learnings, Vollständigkeit und Quellen | [wissen/index.md](wissen/index.md) |
| Konto / Testwelle / 7-30-Tage | `loop3-ablauf.md` |
| Video sehen, Frames, Transkript | `/root/raphael-skills/skills/eigene/watch/SKILL.md` |
| Marc Evers: Offer, Proof, Video, Testen und Quellenabdeckung | `marc-evers-playbook.md`, [wissen/autoren/marc-evers/index.md](wissen/autoren/marc-evers/index.md) |
| MAKE-eigene Ads-Beschlüsse, Anrede/H17/Statics, Betriebskadenz | [wissen/make/ads-regeln.md](wissen/make/ads-regeln.md) |
| Diktat, Wispr, Drehbrief und kontinuierliche Video-Produktion | `video-produktion.md` |
| Visuelle Meta Ads Library und Playback-Belege | `meta-ads-library.md` |
| Claims | `claims-verbote.md` |
| Zac Regan / @startrunningads (Hooks, Copy, Creative, Funnel) | `zac-regan-startrunningads.md` |
| Detaillierter Bestand zu Evers und Regan | [wissen/bestand/index.md](wissen/bestand/index.md) |
| Heik Stepanjan / @heikstepo (Kampagnenstruktur, Copy als Targeting, Webinar-Show-up, Widersprüche) | [wissen/autoren/heikstepo/index.md](wissen/autoren/heikstepo/index.md) |
| Eric Steigner / @eric.steigner (Webinar-Mechanik, Neo-Offer, Sandbox-ABO, Cost-Cap-CBO, Widersprüche) | [wissen/autoren/eric-steigner/index.md](wissen/autoren/eric-steigner/index.md) |
| ChatGPT Ads (Stand, Format, Gebote, Kategorien, DACH) | [wissen/plattformen/chatgpt-ads.md](wissen/plattformen/chatgpt-ads.md) |
| Neues Creator-Wissen aufnehmen | [wissen/quellenpflege.md](wissen/quellenpflege.md) |

## Übergabe

Strategie nennt die begründete Formatwahl plus Konzept-Achsen.
ICP füllt Felder. Research schreibt `DOSSIER=` plus `SEGMENT=`.
Video und Statics lesen das Dossier. Ohne Dossier: ICP plus User.
