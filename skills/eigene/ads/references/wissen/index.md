# Wissensbibliothek für Lead-Generation

Die Arbeitsanweisungen, Autorensynthesen und detaillierten Learnings liegen im
Ads-Skill. Second Brain, Notion und ein Kundenkonto sind zum Nachschlagen nicht
erforderlich. Kundeneigene Daten werden nur für den konkreten Auftrag ergänzt.

## Nach Aufgabe lesen

| Frage | Einstieg |
|---|---|
| Was ist ein wirtschaftlich guter Lead, welcher Test lohnt sich? | [Leadgen-Betriebsmodell](leadgen-betriebsmodell.md) |
| Wo beginnt die nächste Testwelle? | [Strategie](../teil-strategie.md) |
| Welche Botschaft passt zu welcher Person? | [ICP](../teil-icp.md), danach passendes Autoren-Learning |
| Wie recherchiere und belege ich ein Creative? | [Research](../teil-research.md), [Meta-Playback](../meta-ads-library.md) |
| Wie formuliere und produziere ich es? | [Video-Handwerk](../craft/video.md), [Statics-Handwerk](../craft/statics.md), [Diktat und Drehbrief](../video-produktion.md) |
| Welche Formeln und tatsächlichen Beispiele tragen die Entscheidung? | [Referenzkatalog](../craft/referenzkatalog.md) |
| Was bedeuten 7/30 Tage, pausieren, weiterlaufen oder skalieren? | [Performance](../loop3-ablauf.md) |
| Woher stammt eine Lehre, wie vollständig ist ein Profil erfasst? | Autorenregister unten; je Autor `sources.jsonl` und `learnings.jsonl` |
| Was sind MAKEs eigene Ads-Beschlüsse und die Betriebskadenz? | [MAKE-Ads-Regeln](make/ads-regeln.md) — geht im Konfliktfall jedem Creator-Rat vor |
| Wie ergänze ich ein Profil oder aktualisiere eine Aussage? | [Quellenpflege](quellenpflege.md) |

## Autoren und Herkunft

| Autor | Lokale Wissensebene | Anwendung und Grenze |
|---|---|---|
| Zack / @zackpaid | [Autorenreferenz](autoren/zackpaid/index.md) | Botschaft, Creative, Funnel und Tests; jede Zahl mit ihrem ursprünglichen Kontext |
| George Clem / @georgeclem | [Autorenreferenz](autoren/georgeclem/index.md) | Creative-Entwicklung und Kontoführung; E-Commerce-Aussagen ausdrücklich auf Leadgen prüfen |
| @brillaas | [Autorenreferenz](autoren/brillaas/index.md) | Seine erfassten Ansätze, Grenzen und Leadgen-Übertragung |
| Nick Theriot / @nicktheriot_ | [Autorenreferenz](autoren/nicktheriot_/index.md) | Kontoführung und Creative-Tests; Käufe und qualifizierte Anfragen unterscheiden |
| Heik Stepanjan / @heikstepo | [Autorenreferenz](autoren/heikstepo/index.md) | Meta-Ads für Info-Offers und Webinare: Copy als Zielgruppenwahl, Kampagnenstruktur, Show-up; Übertragung auf lokale Leadgen ausdrücklich prüfen |
| Eric Steigner / @eric.steigner | [Autorenreferenz](autoren/eric-steigner/index.md) | Webinar-Mechanik, Neo-Offer, Sandbox-ABO und Cost-Cap-CBO für Coaches und Berater in DACH; Zahlen sind Eigenangaben, Übertragung auf lokale Leadgen ausdrücklich prüfen |
| Marc Evers | [Autorenreferenz](autoren/marc-evers/index.md), [Playbook](../marc-evers-playbook.md), [Detailbestand](bestand/index.md) | Agentur-Offer, Proof, Formulare, Varianten und Sales-Kontext; zusätzlich seine eigenen ausgespielten Anzeigen |
| Zac Regan / @startrunningads | [Playbook](../zac-regan-startrunningads.md), [Detailbestand](bestand/index.md) | Hooks, Copy, Leadqualität, Content und Engpässe |
| Alex Hormozi | [Playbook](../hormozi-paid-ads.md) | Käuferansprache, Wertargumentation, Proof und Reibung als auswählbare Modelle |

Die Autoren sind keine gemeinsame Stimme. Zack und Zac Regan sind verschiedene
Personen. Eric Steigner widerspricht sich zwischen Videos verschiedener Jahre und Formate; seine Autorenreferenz führt diese Stellen. Heik widerspricht sich zwischen einzelnen Reels selbst; seine
Autorenreferenz führt diese Stellen, statt sie zu glätten. Wiederholung oder Zustimmung mehrerer Autoren ersetzt keinen eigenen
Kundentest. Quellenautor, beobachtete Behauptung und unsere Ableitung bleiben im
jeweiligen Register erkennbar.

## Themen finden

Die neuen Autorenregister verwenden gemeinsame Themen. Ein Eintrag kann mehrere
Themen betreffen; gezählt wird er über seine eindeutige Learning-ID.

| Thema im Register | Bedeutung für Lead-Generation |
|---|---|
| `offer-icp` | Kaufproblem, Situation, Angebot, Auswahlkriterien und echte Differenzierung |
| `creative-research` | Kundensprache, Einwände, Marktbeispiele, Recherche und Belegqualität |
| `hooks-copy` | Aufmerksamkeit der passenden Person, verständliche Argumentation, Proof und CTA |
| `production` | Darstellungsformen, Drehen, Schneiden, Varianten und praktikable Produktionskadenz |
| `testing` | Hypothese, Vergleich, Testumfang und Bedingungen einer Entscheidung |
| `targeting-delivery` | Zielgruppen, Placements, Verteilung und technische Auslieferung |
| `measurement-economics` | Messdefinition, Kohorten, Qualitätskosten, CAC, Cash und Deckungsbeitrag |
| `funnel-qualification` | Ad-Ziel-Kongruenz, Formular, passende Reibung und verwertbare Signale |
| `sales-nurture` | Kontakt, Buchung, Erscheinen, Sales-Bearbeitung und Vertrauen |
| `scaling` | Mehr wirtschaftliche Abschlüsse bei tragbarer Bearbeitungskapazität |
| `agency-operations` | Produktion, Prozesse und Zusammenarbeit; nur bei passendem Auftrag |
| `source-context` | Meinungen, Eigenwerbung, Wiederholungen, unzugänglicher oder nicht übertragbarer Inhalt |

```bash
# Vom Ads-Skill-Verzeichnis aus; auch ohne Brain funktionsfähig.
rg -n 'measurement-economics|funnel-qualification' references/wissen/autoren
rg -n 'show.rate|booking|CAC|Termin|Qualifiz' references/wissen
```

Erst eine zum Problem passende Autorenreferenz lesen, dann die darin referenzierten
Learning-IDs. Für eine vollständige Autorensynthese alle lokalen Learnings dieses
Autors lesen. Ein Suchtreffer allein ist keine Gesamtzusammenfassung.

## Was als Wissen gilt

Eine Empfehlung enthält ihre Bedingungen: Ausgangsmarkt, Funnelstufe, verfügbares
Signal, Beweis und eine sinnvolle Vergleichsbasis. Zahlen über andere Konten sind
als Selbstauskunft oder Schätzung markiert. Ein Screenshot, langer Anzeigenlauf
oder eine hohe Anzahl Likes beweist weder Rentabilität noch Ursache.

Die Transferzeile beantwortet, wie die Idee zu passenden Anfragen und Abschlüssen
beitragen könnte. E-Commerce-spezifische Promotions, Warenkorb- oder Retourenlogik
bleiben beim Ursprung. Fehlende Daten werden nicht durch Branchendurchschnitte
ersetzt. Eine offene Hypothese bleibt auch dann offen, wenn sie plausibel klingt.

Der Stand und die Lücken jeder Sammlung stehen in der Autorenreferenz und im
Quellenregister. Keine Profilvollständigkeit aus einem API-Limit ableiten. Neue
Erkenntnisse verbessern die Themenreferenz, ohne die alten Quellen passend
umzuschreiben oder automatisch neue globale Pflichten zu erzeugen.
