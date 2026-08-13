# Teil Research — Angles mit Beleg

Ausgang ist ein Angle-Dossier. Kein Creative.

Schema-Tiefe: `../ads-research/references/angle-dossier-schema.md`.

## Holen

1. Teil ICP, wenn schon da
2. Website, Profile, Bewertungen. Pro Fund: URL, Datum, Zitat
3. Ad Library nur wenn der Token wirkt. Code 10: `ad_library: skipped`, weiter
4. Ein Markt-Segment über `../scripts/load-wissen.py --skill ads --kunde <slug>`

## Schreiben

Mindestens:

- genau ein Segment-Slug
- Zielgruppen-Schnitte mit Zitat
- Pains mit Quelle plus wörtlichem Zitat
- Angles mit Quelle plus wörtlichem Zitat
- Awareness
- Format: statics, video oder beide
- Streit Static-first vs Video-first genannt, nicht still entschieden

Ablage, wenn Kundenrepo da:
`/root/clients/client-<slug>/ads/research/<YYYY-MM-DD>-angle-dossier.md`
Sonst dorthin, wo der User die Datei haben will.

## Gate

```
python3 /root/raphael-skills/skills/eigene/copywriting/scripts/forbidden-check.py <dossier.md>
```

Kein Token in der Datei. Kein Satz 1:1 aus einer fremden Ad.

## Übergabe

```
DOSSIER=<pfad>
SEGMENT=<slug>
```

Teil Video und Teil Statics lesen nur diesen Pfad.
