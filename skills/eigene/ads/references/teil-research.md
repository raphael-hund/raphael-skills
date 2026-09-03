# Teil Research — Angles mit Beleg

Ausgang ist ein Angle-Dossier. Kein Creative.

Schema-Tiefe: `../../ads-research/references/angle-dossier-schema.md`
(Pfad gilt von dieser Datei aus).

## Holen

1. Teil ICP, wenn schon da
2. Website, Profile, Bewertungen. Pro Fund: URL, Datum, Zitat
3. Foreplay zuerst (Key liegt in `/root/.secrets/api-keys.env`, CLI `fp`, Doku
   `/root/tools/foreplay/README.md`; 1 Credit pro Ad, 10'000/Monat):
   `fp ads "<suchwort>" --lang German --live --order longest_running --limit 25`
   und `fp export "<suchwort>" --lang German --live --order longest_running --limit 40
   --out /root/clients/<slug>/ads/research/foreplay-<YYYY-MM-DD>/` → ein Markdown je Ad
   plus `_index.md`. Konkurrenten per `fp brands "<name>"` und `fp brand-ads <brand_id>`.
   Raphaels Boards (`fp boards`, `fp board-ads <id>`) und Swipefile (`fp swipefile`)
   sind kuratiertes Material und schlagen die Discovery-Suche.
   Meta Ad Library nur als Ergänzung, wenn der Token wirkt. Code 10: `ad_library: skipped`, weiter.
   Wenn Material da ist, Hormozi-Methode (`hormozi-paid-ads.md`): die am längsten laufenden
   Ads mit meistem Engagement suchen (Laufzeit = Markt-Votum), ~50 Gewinner
   transkribieren, Sprache des Avatars übernehmen, modellieren statt kopieren.
   Vor dem Dossier das eigene Lern-Register `/root/clients/<slug>/ads/lern-register.md`
   lesen. Markt-Votum (Laufzeit) belegt nur die Bauform; über Angle und Botschaft
   entscheiden eigene Resultate am Terminpreis. Ein Markt-Learning, das einer
   Absprache oder einem eigenen Befund widerspricht, wird im Dossier als verworfen
   markiert, nicht als Empfehlung geführt.
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
`/root/clients/<slug>/ads/research/<YYYY-MM-DD>-angle-dossier.md`
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
