# Quellen für die lokalen Craft-Bauformen

Dieser Katalog macht die vorhandene Handwerkskenntnis im Ads-Skill nutzbar.
Stand der Lokalisierung: 07.09.2026. Er ist **keine neue Live-Sichtung** und
kein Nachweis, dass die verlinkten Anzeigen heute aktiv sind. Die öffentlichen
Archivlinks übernehmen bereits gespeicherte Ad-IDs. Neue Bild-, Ton-, Schnitt-
oder Leistungsbehauptungen benötigen die passende Originalprüfung.

Die beschreibenden Beispiele sind eigene kurze Zusammenfassungen. Umsatz,
Garantie oder Erfolgsangaben der Werber bleiben deren Aussagen. Fremde Fälle,
Knappheiten und Bedingungen dürfen nicht in Kundenangebote übernommen werden.

## Herkunft und Verwendung

- **Korpusbeleg:** ein identifizierbarer Datensatz im lokalen
  [711-Record-Bestand](../analyse-2026-08-13/scripts-711.jsonl). Die
  Record-ID ist stabiler als eine Position in einem alten Shard. `complete`
  beschreibt den damaligen Datenstand. Wirksamkeit und aktuelle Sichtung
  benötigen jeweils eigene Belege.
  Einzelne Records enthalten nur Struktur/Metadaten; dafür keinen Volltextabruf
  voraussetzen. Vorhandene F/A-Tags sind historische Annotationen, keine
  unanfechtbare Klassifikation.
- **Historischer Katalogbeleg:** Ad-ID und Struktur stammen aus dem alten
  Static-Referenzkatalog; der 711-Bestand muss keinen passenden Eintrag haben.
  Solche Angaben können die Text-Bauform erklären, ersetzen keine neue
  Layout-Sichtung.
- **Redaktionelle Anwendung:** Auswahl, Lead-Gen-Transfer und Grenzen in
  [Video](video.md), [Statics](statics.md) und [Dossier](dossier-schema.md)
  sind unsere Synthese. Sie sind nicht wörtlich Lehre eines einzelnen Creators.

Zum Nachsehen einer Record-ID genügt lokal etwa:

```bash
rg 'rec3M1FPdEIp15Da2' /root/raphael-skills/skills/eigene/ads/references/analyse-2026-08-13/scripts-711.jsonl
```

Das ist eine optionale Vertiefung. Die Guides enthalten die nutzbaren Muster
bereits; kein Notion-, Brain-, Airtable- oder Netzwerkzugang ist Voraussetzung.

## Video- und medienübergreifende Strukturbelege

| ID | Autor / Original | Lokaler Record | Was sich an der gespeicherten Struktur lernen lässt | Grenze |
|---|---|---|---|---|
| V01 | [Marc Evers, Ad 2024205344889602](https://www.facebook.com/ads/library/?id=2024205344889602) | `rec4VbYDuFXq8FRXr` | Rollen-Callout, Ergebnisbehauptung und anschliessende Cases; Text verweist auf zu zeigende Belege | Originalclaims sind keine eigene Kundenzusage; neue Synchronitätsbehauptungen erfordern Playback |
| V02 | [Pascal Harting, Ad 1824244865210795](https://www.facebook.com/ads/library/?id=1824244865210795) | `rec1DdladvtwlByM7` | Risiko-Umkehr als Einstieg und konkreter nächster Schritt | Garantie nur für das Originalangebot belegt; keine allgemeine SEO-Zusage |
| V03 | [Marc Evers, Ad 1011448258122906](https://www.facebook.com/ads/library/?id=1011448258122906) | `rec2cy8W2LrDSfBjv` | Kunden-Ausgangslage eröffnet die Geschichte; Veränderung wird anschliessend erklärt | Geschichte und Resultate bleiben Anbieterbericht |
| V04 | [Neuhaus Digital, Ad 2105892510212259](https://www.facebook.com/ads/library/?id=2105892510212259) | `rec3M1FPdEIp15Da2` | Enger Bildungsanbieter-Callout → Auslastungsproblem → Prozess → Fall → Angebot | Die Struktur überträgt sich eher als fremde Umsatzwerte; andere Lead-Qualifikationen nötig |
| V05 | [Dr. Matt Shiver, Ad 1188654516803427](https://www.facebook.com/ads/library/?id=1188654516803427) | `recJ8jT27gt9HNeCH` | Unpassende Anfragen als Ausgangspunkt für bessere Selbstselektion | Fehlender Callout ist eine Hypothese, keine vollständige Diagnose schlechter Leads |
| V06 | [Speedscaling, Ad 990232776923890](https://www.facebook.com/ads/library/?id=990232776923890) | `rec1iktyZHnKXGeeS` | Konkretes Skript anbieten → Inhalt erklären → Ergänzungen → Download | Auftrags-/Umsatzsumme ist Autorenbehauptung; Materialdownload ist noch kein qualifizierter Lead |
| V07 | [Speedscaling, Ad 2853239871539542](https://www.facebook.com/ads/library/?id=2853239871539542) | `rec33rHywYPShmG6Z` | Fragen öffnen den Konflikt; anschliessend werden Lösungswege verglichen | Alternatives Angebot fair darstellen; alte Annotation ist kein Wirkungsnachweis |
| V08 | [Dr. Matt Shiver, Ad 4257311164587557](https://www.facebook.com/ads/library/?id=4257311164587557) | `recZBfA5paRfea3jF` | Eine konkrete Handlung als kurze Anleitung versprechen | Dauer und tatsächliche Demo erst am Original prüfen; kein fertiges Lead-Gen-Resultat |
| V09 | [Dr. Matt Shiver, Ad 841089281964713](https://www.facebook.com/ads/library/?id=841089281964713) | `recUTIkV8crVZWdYK` | Budgetfrage anhand einer Beispielrechnung erklären | Annahmen zu Callpreis, Abschluss und Erlös sind keine Benchmarks; Umsatz ist nicht Gewinn |
| V10 | [Enpal, Ad 1272940491684309](https://www.facebook.com/ads/library/?id=1272940491684309) | `rec17U3mWcOXU4YCO` | Eignungsfrage → konkrete Leistung → Haus-Check als nächster Schritt | Finanzierung, Dauer und Konditionen nicht übernehmen; späteren Beratungsprozess prüfen |
| V11 | [Enpal, Ad 1257382019278821](https://www.facebook.com/ads/library/?id=1257382019278821) | `rec0lu32t2vpLbYnh` | Region und Hausbesitzerrolle bilden den Einstieg | Ein örtlicher Callout beweist keine regionale Verfügbarkeit beim neuen Kunden |
| V12 | [Speedscaling, Ad 1559405135776811](https://www.facebook.com/ads/library/?id=1559405135776811) | `rec2ILHjWtSze7Hfj` | Einladung mit Termin, Ablauf und Vorführung | Kein Zwang zu Pain-first; Superlativ und Eventtermin sind separat zu prüfen |
| V13 | [Dr. Matt Shiver, Static 1626747671937346](https://www.facebook.com/ads/library/?id=1626747671937346) | `rec3uLSzT64XrYOAn` | Konkrete Zielgruppe und Angebot verbinden; Beispiel für Einladungs-Hook | Die Platzanzahl und versprochenen Ergebnisse sind nicht übertragbar; Static, kein Video-Beleg |
| V14 | [Ben Heath, Static 1916114325655993](https://www.facebook.com/ads/library/?id=1916114325655993) | `rec59XaNOpwlojbpa` | Rolle → versprochener Nutzen eines Templates → Download | Datensatz unvollständig; nur gespeicherte Textstruktur, keine aktuelle Bildprüfung |
| V15 | [Ben Heath, Static 2240431486447206](https://www.facebook.com/ads/library/?id=2240431486447206) | `rec9YUPmU4YX5QzTL` | Prozessangebot mit Inhaltsübersicht und Autoritätsbehauptung | Keine Übernahme der aggregierten Umsatzbehauptung; Datensatz unvollständig |
| V16 | [Vantage / Acquisition.com, Static 2259677848285374](https://www.facebook.com/ads/library/?id=2259677848285374) | `recyPL8rE623A9b74` | Mitgliedschaft und konkret benannte Leistungsbestandteile | Werbeaussage des Advertisers; nicht automatisch eine persönliche Lehrmeinung Hormozis |

Der Korpus nennt unter anderem Charlie Morgan, Finseo, Marwan und weitere
Advertiser. Ihre Namen im Bestand sind kein Grund, neue Einzelclaims aus
unvollständigen Feldern zu rekonstruieren. Wenn eine passende Quelle fehlt,
bleibt die entsprechende Bauform eine redaktionelle Option.

## Historische Static-Referenzen nach Angle

Diese Beispiele waren in den früheren A01–A08-Dateien mit Ad-ID dokumentiert.
Hier bleiben der relevante Aufbau und die Original-Referenz erhalten, keine
vollständigen fremden Ad-Texte. Layoutfarben, genaue Gestik und Laufzeiten
werden aus diesen alten Beschreibungen nicht als frisch geprüft ausgegeben.

| ID / Angle | Original | Übertragbare Struktur | Aussagegrenze |
|---|---|---|---|
| S01 / A01 | [Cole Gordon 1899812560714166](https://www.facebook.com/ads/library/?id=1899812560714166) | Ergebnisbehauptung zuerst, danach Erklärung des Appointment-Setter-Angebots | Anzahl Termine und Durchschnitt sind Originalclaim, kein eigener Benchmark |
| S02 / A01 | [Cole Gordon 1799180104822960](https://www.facebook.com/ads/library/?id=1799180104822960) | Post-Rahmen mit einem Prozessgedanken und nächstem Schritt | Einen eigenen Post verwenden, keine fremde Identität oder Verifizierung kopieren |
| S03 / A01 | [Client Acquisition Accelerator 790630973333883](https://www.facebook.com/ads/library/?id=790630973333883) | Mehrere Nachrichten als soziale Bestätigung | Nur echte eigene Nachrichten verwenden; Unabhängigkeit der Belege prüfen |
| S04 / A02 | [Ben Heath 3278190002366756](https://www.facebook.com/ads/library/?id=3278190002366756) | Entscheiderrolle und erlebtes Werbeproblem vor dem Angebot | Nutzerproblem ist Hypothese bis Kundensprache/VOC es stützt |
| S05 / A02, A04 | [michael.kaschinski 1467604198139983](https://www.facebook.com/ads/library/?id=1467604198139983) | Lücke zwischen Geschäftsentwicklung und Nachbearbeitung → Erklärung → Lösung | E-Commerce-Quelle: nur die nachvollziehbare Lückenlogik auf Lead-Nachbearbeitung übertragen; keine Käuferquote übernehmen |
| S06 / A03 | [Mario Müller 950689707571462](https://www.facebook.com/ads/library/?id=950689707571462) | Direkte Bedarfsfrage zum Website-Angebot | Ein Screen kann die Leistung anschaulich machen, beweist aber keine Anfragen |
| S07 / A03 | [Cole Gordon 1007881888774704](https://www.facebook.com/ads/library/?id=1007881888774704) | Rolle/Mechanismus mit Outcome verbinden | Extremes Umsatzversprechen ist nicht der übertragbare Teil |
| S08 / A07 | [Cole Gordon 2192595851668193](https://www.facebook.com/ads/library/?id=2192595851668193) | Leistung und Zahlungsbedingung als kompakte Risiko-Umkehr | Weitere IDs 1422649973040771 und 1426934845860493 sind historische Varianten, keine drei unabhängigen Erfolgsbelege |
| S09 / A07 | [Cole Gordon 1763584814673248](https://www.facebook.com/ads/library/?id=1763584814673248) | Konkretes Leistungsergebnis, passende Rollen und Garantiebedingung | Zahlen und Fristen gehören zum Originalangebot; Leistungsfähigkeit beim Kunden separat prüfen |

Für A05 (Vergleich) reicht eine faire eigene Vorher/Nachher-Basis; eine fremde
Erfolgsgeschichte ist dafür keine Pflicht. A06 (Mechanismus) hat Beleganker
V01/V15/V16. A08 (Haltung) bleibt ohne passenden Originalbeleg eine zu testende
redaktionelle These. Der alte Katalog enthält hierzu nicht überall eindeutige
öffentliche IDs; diese Lücken werden nicht durch erfundene Links geschlossen.

## Verwandte lokale Wissensquellen

- [Marc Evers](../marc-evers-playbook.md): Creator-Lehre, eigene Ads und
  kontextabhängige Varianten. Eine Variante ist keine unabhängige Bestätigung.
- [Zac Regan / startrunningads](../zac-regan-startrunningads.md): Avatar,
  Problem, Lösung und nächster Schritt als kompakter Aufbau. **Zac Regan ist
  nicht automatisch der X-Account ZackPaid.** Identitäten und Quellen getrennt halten.
- [Hormozi](../hormozi-paid-ads.md): Callout-Typen und Varianten über Nutzen,
  Perspektive und Zeit. Werbemittel von Acquisition.com/Vantage nicht mit
  nachgewiesener Wirksamkeit einer persönlichen Lehre gleichsetzen.
- [Hook-Taxonomie](../hook-taxonomie.md) und
  [Segmentkarte](../segment-map.md): vorhandene lokale Ordnung, keine
  zusätzliche externe Datenabhängigkeit.

## Was bei der Lokalisierung bewusst nicht zur Regel wurde

Eine Zahl oder ein Name in jedem ersten Satz, ein erfundener Eigenname für
jeden Mechanismus, Proof genau zweimal, künstliche Platzknappheit, universelle
Sprech-/Schnittquoten, feste CPL-/CTR-Grenzen, ein bestimmtes Geschlecht/Alter
als Anrede-Regel und „Native gewinnt immer“ waren überzogene Ableitungen des
Altbestands. Beibehalten sind überprüfbare Struktur, echte Quellen und
Kundenpassung. Die aktuellen Vorgaben 4:5 → 9:16, echtes Logo, kalter
Headline-Test und Foto-Variation beim Objektverkauf stehen in
[Statics](statics.md).
