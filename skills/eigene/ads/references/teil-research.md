# Teil Research — Angles mit Beleg

Ausgang ist ein Angle-Dossier oder bei reiner Library-/Playback-Anfrage ein
Rechercheprotokoll. Kein Creative.

Schema-Tiefe: `craft/dossier-schema.md`
(Pfad gilt von dieser Datei aus).
Für eine reine Library-/Playback-Anfrage reicht das Rechercheprotokoll aus
`meta-ads-library.md`; ein vollständiges Angle-Dossier nur, wenn es zum Auftrag gehört.

## Holen

Bei „nur geliefertes Material“ keine Website-, Library- oder Foreplay-Suche
starten. Vorhandene lokale Grundlagen nutzen und die gelieferten Bilder/Videos
nach `meta-ads-library.md` prüfen; fehlenden Kontext als Lücke nennen.

1. Vor der Suche vorhandenen ICP und das eigene Lern-Register
   `/root/clients/<slug>/ads/lern-register.md` lesen. Über `wissen/index.md`
   passende Themen und Autorenreferenzen als Prüfraster wählen. Bereits
   gelesene Grundlagen nicht erneut laden. Fehlender Kundenkontext blockiert
   keine allgemeine Library-Recherche; Annahmen zum Markt ausweisen.
   Die historische Hormozi-Recherche mit „Gewinnern“, ungefähr 50 Ads und
   eigenen Versionen ist kein Nachweis für Performance und keine Pflichtmenge.
   Sie erweitert den Auftrag nicht um Feed-Aktionen oder Creative-Produktion.
   Für Suche, Beurteilung und Abschluss gelten die Belegregeln in
   `meta-ads-library.md`.
2. Website, Profile, Bewertungen. Pro Fund: URL, Datum, kurzes Zitat.
3. **Meta Ads Library im sichtbaren Browser recherchieren.** Vorher
   `meta-ads-library.md` lesen: Suche und Filter bedienen, Anzeigen öffnen,
   Bilder ansehen und ausgewählte Videos abspielen. Playbacks kommen vor
   Hook-/Struktur-Empfehlungen. Browser-Zugang hängt nicht vom API-Token ab.
   Bei ausdrücklich auf geliefertes Material begrenztem Auftrag entfällt die
   Live-Suche; Umfang im Protokoll nennen.
4. Ein bereits verbundener Foreplay-Zugang kann Suche und Materialsicherung
   ergänzen. Vorher verfügbare Integration, ihre aktuelle Hilfe und den
   autorisierten Umfang prüfen. Falls die CLI `fp` vorhanden ist, deren
   `--help` für Suche, Brand-Anzeigen, Boards und Medienexport verwenden;
   keine API-Schlüssel, festen Toolpfade oder Kontingente voraussetzen.
   Exportierte Anzeigen mit ID, Quelle, Zeitpunkt und Medien lokal sichern.
   Die Bilder ansehen und den wörtlichen Onscreen-Text zitieren; Copy-Felder
   ersetzen das Bild nicht. Große Bildmengen als lesbare Kontaktbögen
   sichten und wichtige Originale öffnen. Bereits kuratierte Boards und
   Swipefiles können die Discovery-Suche fokussieren.
   Ein Meta-API-Fehler wird separat notiert und beendet die Browser-Recherche nicht.
   Foreplay-Medien bekommen ihre eigene Quellenangabe; sie zählen nicht als
   Sichtung in der Meta-Oberfläche. Ausgewählte Videos nach dem Playback bei
   Bedarf mit `scripts/media-extract.sh` im geladenen Ads-Skill vertiefen
   (siehe `meta-ads-library.md`); Extraktion und Sichtung separat protokollieren.
   Langläufer und wiederkehrende Varianten sind Recherchekandidaten, keine
   nachgewiesenen Gewinner. Laufzeit und Engagement belegen weder Rentabilität
   noch die Wirkung eines Angles. Über eigene Botschaften entscheiden eigene
   Resultate am Terminpreis. Ein Markt-Learning, das einer
   Absprache oder einem eigenen Befund widerspricht, wird im Dossier als verworfen
   markiert, nicht als Empfehlung geführt.
5. Ein Markt-Segment über den im Einstieg genannten `scripts/load-wissen.py`,
   sofern nicht bereits geladen.

## Angle-Dossier schreiben

Mindestens:

- genau ein Segment-Slug
- Zielgruppen-Schnitte mit Zitat
- Pains mit Quelle plus wörtlichem Zitat
- Angles mit Quelle plus wörtlichem Zitat
- Awareness
- Format: statics, video oder beide
- Streit Static-first vs Video-first genannt, nicht still entschieden
- Bei Konkurrenz-Recherche: Suchkontext, Ad-Links/-IDs, visuelle Belege und
  Playback-Abdeckung aus `meta-ads-library.md`; Beobachtung und Testhypothese trennen

Ablage, wenn Kundenrepo da:
`/root/clients/<slug>/ads/research/<YYYY-MM-DD>-angle-dossier.md`
Sonst dorthin, wo der User die Datei haben will.

## Gate für das Angle-Dossier

```
python3 "$ADS_ROOT/scripts/text-check.py" <dossier.md>
```

Kein Token in der Datei. Kurze, klar markierte Quellenzitate sind Belege;
keine fremden Ad-Sätze als eigene Creative-Empfehlung übernehmen.

## Übergabe des Angle-Dossiers

```
DOSSIER=<pfad>
SEGMENT=<slug>
```

Teil Video und Teil Statics lesen nur diesen Pfad.
