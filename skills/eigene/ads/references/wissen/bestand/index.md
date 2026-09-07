# Bisherige Autorenquellen innerhalb des Ads-Skills

Stand: 07.09.2026. Diese Sammlung erhält das bereits ausgewertete Wissen aus
Marc Evers, Zac Regan und Alex Hormozi. Sie funktioniert ohne externes Wiki oder
Kundenordner. Öffentliche Originalquellen bleiben verlinkt; längere Fremdtranskripte
werden nicht als Skill-Inhalt kopiert.

| Bestand | Lokale Arbeitsebene | Vollständigkeit innerhalb des vorhandenen Bestands |
|---|---|---|
| Marc Evers, Instagram | [Playbook](../../marc-evers-playbook.md), [Korpus](marc-evers-korpus.jsonl), [Quellen](marc-evers-quellen.md) | 508 Aussage-/Kontexteinträge aus 118 Medien; 22 Carousel-Videos mit Parent/Position; spätere Nachprüfungen erhalten |
| Marc Evers, eigene Ads | [Analyse](marc-evers-ads.md), [Inventar](marc-evers-ads-inventar.json) | 144 Ad-IDs erfasst; 11 als aktiv gelieferte IDs, zehn unterschiedliche Videos; 72 Bild-Assets anhand von sechs Kontaktbögen gesichtet |
| Zac Regan, Instagram | [Playbook](../../zac-regan-startrunningads.md), [Korpus](zac-regan-korpus.jsonl), [Quellen](zac-regan-quellen.md) | Alle 500 ursprünglichen Nugget-Zuordnungen aus 41 Reels; keine Zusammenlegung, die Zuordnung verliert |
| Alex Hormozi, YouTube | [Paid-Ads-Referenz](../../hormozi-paid-ads.md) | Bisherige Frameworks aus zwei verlinkten Trainings erhalten, konkrete Kundenanweisungen entfernt und universelle Behauptungen eingegrenzt |

Die Zahlen beschreiben den abgegrenzten vorhandenen Bestand. Sie behaupten weder
ein vollständiges historisches Creator-Profil noch unabhängige Bestätigungen für
jede Aussage. Neue Zugriffe auf die Profile wurden bei dieser Lokalisierung nicht
durchgeführt. Bildstichproben und Transkripte sind keine vollständigen Echtzeit-
Playbacks; Zahlen und Plattformbehauptungen behalten ihre ausgewiesenen Grenzen.

## Gezielt suchen

Die Korpora verwenden dieselben Felder: `id`, `author`, `media_id`, `source_url`,
`topic`, `claim`, `kind`, `limitations`, `provenance`. Marc enthält zusätzlich
`verification_context`, damit die Ergänzung eines alten Befunds direkt mitgelesen
wird. Pro Feld `claim` steht eine eigenständig formulierte Auswertung, kein
verbatim Transkript. Historische Pfade existieren nur in `provenance`; sie sind
keine operative Voraussetzung und kein Auftrag, das dortige Wissen zu verändern.

Von einer Frage zuerst zum Thema suchen, dann Aussage, Grenze und verlinkte Quelle
zusammen lesen. Beispielsweise findet `qualifizierung`, `show`, `No-show`,
`Formular`, `Umsatz` oder ein Shortcode die entsprechenden Einträge. Für maschinelle
Suche lassen sich die JSONL-Dateien zeilenweise mit `jq` lesen:

```bash
jq -c 'select(.topic == "funnel-formular") | {id, claim, limitations, source_url}' references/wissen/bestand/marc-evers-korpus.jsonl
jq -c 'select(.topic == "lead-qualitaet-mirroring") | {id, claim, limitations, source_url}' references/wissen/bestand/zac-regan-korpus.jsonl
```

Nicht den gesamten Korpus in jeden Auftrag laden. Ein konkretes Skript braucht
die relevante Lehre und ihre Grenze, ein Quellen-Update das Quellenregister und
die betroffenen IDs. Spezifische Budgets, Volumenquoten oder Umsatzversprechen aus
Creator-Beispielen werden nicht zu Standards für Lead-Generation.

## Namen und Belegarten auseinanderhalten

Zac Regan (`startrunningads`) ist von Zack (`zackpaid`) getrennt. Marc Evers ist ein
weiterer Autor. Auch wenn sich Ratschläge ähneln, dürfen Personen, Aussagen und
Quelle nicht ausgetauscht oder Wiederholungen als unabhängige Wirksamkeitsbelege
gezählt werden.

`teaching` bezeichnet eine Quellenempfehlung. `self_report` ist eine ungeprüfte
Selbstauskunft; `third_party_estimate` enthält Fremdberichte oder Schätzungen.
`visual_observation` / `observation` beschreiben gesehenes Material beziehungsweise
Distribution. `personal` / `context` sichern den Inhalt ohne daraus eine Ads-Regel
zu machen. `coverage_gap` dokumentiert eine Erfassungsgrenze. Der genaue Befund
unter `limitations` entscheidet mit, wie eine Aussage verwendet werden kann.

Bei Lead-Generation den Transfer über passende Anfragen, qualifizierte und
stattgefundene Gespräche, Auftrag und Zahlung prüfen. Ein höherer CTR, niedrigerer
CPL oder länger sichtbarer Werbespot belegt für sich keinen wirtschaftlichen Erfolg.
