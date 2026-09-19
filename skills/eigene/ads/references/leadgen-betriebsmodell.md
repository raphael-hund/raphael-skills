# Lead-Generation: vom ersten Kontakt zum wirtschaftlichen Abschluss

**Art dieser Referenz:** betriebliche Anwendung und mathematische Herleitung. Die
Regeln hier sind keine zugeschriebenen Aussagen von Zack, George Clem, Brillaas,
Nick Theriot oder Marc Evers. Autorenbeobachtungen werden separat mit Originalquelle,
Kontext und Übertragungsgrenze geführt. Beispiele sind Rechenbeispiele, keine Benchmarks.

Diese Referenz lesen, wenn eine Testwelle geplant, ein Funnel verändert, CRM-Signale
gewählt oder Anzeigen gehalten, pausiert beziehungsweise skaliert werden sollen.
Eine einzelne Hook-Formulierung braucht nicht das gesamte Betriebsmodell.

## 1. Geschäftsziel und Messvertrag zuerst

Das wirtschaftliche Ziel ist ein tragfähiger Deckungsbeitrag nach Akquisition im
vereinbarten Zeitraum. Qualifizierte Anfrage, Termin und Gespräch sind Zwischenziele.
Ein niedriger CPL oder eine hohe Klickrate belegt noch keinen wirtschaftlichen Erfolg.

Vor einer Empfehlung festhalten:

- Angebot, Region, Zielkunde und konkrete Ausschlusskriterien; keine pauschale
  Umsatzschwelle eines fremden Coaching-Angebots übernehmen.
- Was als neuer Lead, qualifizierter Lead, Buchung, wahrgenommener Termin und
  Neukunde zählt; wer den Status bestätigt und welche Zeitstempel maßgeblich sind.
- Erlös- und Kostengrenze, Bewertungshorizont, Zahlungs- und Erstattungsrisiko,
  vorhandene Vertriebs- und Leistungskapazität.
- Datenquelle, Attributionsregel, Auswertungsstichtag und Reife der Lead-Kohorten.
- Was vorläufig angenommen wird, wer fehlende Daten liefert und welche Entscheidung
  bis dahin möglich ist. Ohne CRM-Abschlüsse bleiben Qualitäts- und CAC-Urteile vorläufig.

## 2. Die Stufen eindeutig zählen

| Kürzel | Geschäftliches Ereignis | Zählregel |
| --- | --- | --- |
| L | gültiger, eindeutiger neuer Kontakt | Kontakt/Opportunity deduplizieren; Spam, Tests und Bestandskunden gesondert führen |
| Q | nach vereinbarten Kriterien qualifiziert | Fit und Ausschlussgrund dokumentieren; unbekannt ist nicht unqualifiziert |
| B | Termin gebucht | erste relevante Buchung pro Opportunity; Umbuchungen nicht als zusätzliche Leads zählen |
| H | relevanter Termin wahrgenommen | tatsächliches Gespräch, nicht bloß vergangener Kalendertermin |
| S | gewonnener Neukunde | unterschrieben, bezahlt oder aktiviert nach expliziter Definition; Storno/Erstattung nachführen |

Plattform-Formularabsendungen zusätzlich als eigene Rohzahl behalten. Spam- und
Dublettenanteil offen berichten; die Definition von L nicht still zwischen
Auswertungen ändern. Ein Preis je gültigem Kontakt ist entsprechend zu beschriften.

`q = Q/L`, `b = B/Q`, `s = H/B`, `w = S/H`.

Für **dieselbe Kohorte** und eine tatsächlich verschachtelte Kette gilt:

`P(S | L) = q × b × s × w = S/L`.

Das ist eine Kettenregel, keine Annahme unabhängiger Stufen. Geht im echten Prozess
die Buchung der Qualifizierung voraus, überspringen Abschlüsse ein Gespräch oder
existieren mehrere Vertriebswege, diese Wege getrennt modellieren beziehungsweise
`S/L` direkt bestimmen. Keine Quoten verschiedener Kalenderwochen, Zielgruppen oder
Vertriebswege zu einer scheinbar exakten Gesamtquote multiplizieren.

Denominator und offene Fälle immer mitliefern: `12 von 40 ausreichend gereiften Q`
ist aussagekräftiger als eine alleinstehende Prozentzahl. Bei `0` im Nenner ist die
Rate nicht bestimmbar. Bei `0` Abschlüssen ist beobachteter CAC nicht endlich;
fehlende oder unreife Daten sind kein CAC von null.

## 3. Zielkosten aus dem Geschäft ableiten

Definiere je Neukunde im Horizont `T`:

- `D_T`: erwarteter Deckungsbeitrag vor Akquisitions- und Vertriebskosten. Nettoerlöse
  abzüglich Rückerstattungen, Zahlungsausfällen, variablen Leistungskosten und sonstigen
  bereits zugeordneten variablen Kosten; Umsatzsteuer ist kein Deckungsbeitrag.
- `R_T`: verbleibender Ergebnis-/Risikopuffer, den das Geschäft verlangt.
- `CAC_sonstig`: zugeordnete Akquisitionskosten außer Media, einschließlich Vertrieb,
  Terminierung, Agentur, Tools und Creative-Produktion, soweit diese nicht bereits
  in `D_T` enthalten sind. Vollkosten- und marginale Betrachtung separat ausweisen.

Dann ist die verfügbare Media-Grenze:

`CAC_media,max = D_T − R_T − CAC_sonstig`.

Ist sie nicht positiv, gibt es unter diesen Annahmen keinen positiven tragfähigen
Media-Spielraum. Einen wirtschaftlichen Verlust nicht durch ein niedrigeres CPL-Ziel
kaschieren. Bei längeren Verträgen nur einen belegten, zum Liquiditätsziel passenden
Horizont verwenden; unsichere Lifetime-Erlöse nicht als heutige Kaufkraft behandeln.
Payback zusätzlich über tatsächlich erwartete Zahlungseingänge und Auszahlungen
prüfen. Ein hoher Vertragswert kann mit einem Liquiditätsengpass zusammenfallen.
Den Startpunkt des Horizonts nennen: ab Leadgewinnung oder ab Kundenbeginn. Im
zweiten Fall kommt die Verzögerung bis zum Abschluss für den Cash-Payback hinzu.

Bei identischem Kostenumfang und gleicher Kohorte folgt:

| Zwischenziel | maximaler Media-Preis |
| --- | --- |
| Rohlead | `CPL_max = CAC_media,max × q × b × s × w` |
| qualifizierter Lead | `CPQL_max = CAC_media,max × b × s × w` |
| Buchung | `CPB_max = CAC_media,max × s × w` |
| wahrgenommenes Gespräch | `CPH_max = CAC_media,max × w` |

Nicht den qualifizierten Zielpreis mit Rohlead-Zahlen vergleichen. Eine Verbesserung
der Abschlussquote erhöht rechnerisch den tragfähigen Zwischenpreis; sie muss dafür
belegt und auf den betrachteten Traffic übertragbar sein. Historischer CPL minus
pauschal 20 Prozent ist keine Herleitung von Zahlungsfähigkeit.

**Rechenbeispiel:** `D_T = 3.000 €`, `R_T = 900 €`, `CAC_sonstig = 600 €` ergeben
`CAC_media,max = 1.500 €`. Bei `q = 40 %`, `b = 50 %`, `s = 75 %`, `w = 20 %`
entstehen rechnerisch drei Neukunden je 100 Leads. Grenzen: `CPL 45 €`, `CPQL 112,50 €`,
`CPB 225 €`, `CPH 300 €`. Das ist eine Planungsrechnung; die Quoten tragen Unsicherheit.

Wenn Bearbeitungskosten stark mit Leadmenge oder Stufe wachsen, nicht mit einem
unveränderlichen `CAC_sonstig` arbeiten. Stattdessen erwartete Nicht-Media-Kosten je
Lead über die tatsächlichen Stufen gewichten und von `P(S|L) × (D_T − R_T)` abziehen.
Für Kosten pro erreichtem Stadium gilt beispielsweise:

`K_je_Lead = c_L + q×c_Q + q×b×c_B + q×b×s×c_H + q×b×s×w×c_S`.

`CPL_max = P(S|L) × (D_T − R_T) − K_je_Lead`.

`c_H` sind dabei Kosten pro wahrgenommenem Gespräch, `c_S` zusätzliche Kosten pro
Neukunde; nicht genutzte Kostenarten auf null setzen. Periodische Fixkosten mit
einer ausdrücklich genannten Mengenannahme zuordnen, nicht als Stufenkosten tarnen.
Vertriebskosten genau einmal abziehen; Kosten pro Lead nicht wie Kosten pro Kunde
behandeln. Bei Segmenten mit stark unterschiedlichem Wert segmentweise rechnen.

## 4. Kohorten, Verzögerung und Attribution

**Zwei Sichten führen:** Die 7-/30-Tage-Lieferung zeigt Spend, Auslieferung und aktuelle
Funnel-Ereignisse. Die Lead-Kohorte ordnet spätere Qualifizierung, Termine und Abschlüsse
dem Zeitraum der Leadentstehung zu. Die Sichten beantworten verschiedene Fragen.
Diese Woche abgeschlossene Alt-Leads geteilt durch diese Woche erzeugte Neu-Leads
ist keine Abschlussquote.

Für Vergleiche gleiches Reifealter nutzen, beispielsweise Resultate bis Tag 30 nach
Leadentstehung, wenn die eigene Historie diesen Horizont trägt. Offene jüngere Leads
als offen führen. Vergangene Reifeverläufe dürfen Prognosen begründen; Prognosen und
beobachtete Ergebnisse separat ausgeben. Keine universelle Wartefrist von sieben,
14 oder 30 Tagen als Beweis ausreichender Abschlussdaten behandeln.

Plattform, Webanalyse und CRM haben verschiedene Attributionsfenster, Identitäten
und Modellierungen. Meta-attribuierte Conversions separat von CRM-Abschlüssen ausweisen,
Abweichungen erklären und unbekannte Herkunft erhalten. Ein Kanal kann an einem Deal
beteiligt sein, ohne alleiniger Auslöser zu sein. Kanalsummen können denselben Abschluss
mehrfach beanspruchen; sie nicht ungeprüft addieren. Aus Attribution folgt keine
Inkrementalität. Bei einer Kausalfrage eine passende randomisierte Messung oder ein
sauber begründetes Experiment planen, soweit Volumen und Zugang reichen.

Auf Opportunity-Ebene nach Möglichkeit stabile CRM-ID, Leadzeit, Akquisitionsquelle,
Kampagnen-/Ad-ID, Formular/LP-Version, Statuszeitpunkte und Abschlusswert verbinden.
Personenbezogene Daten gehören ins berechtigte Kundensystem, nicht in die allgemeine
Wissensbibliothek des Skills. Ein Report braucht aggregierte Zahlen und prüfbare IDs.

## 5. CRM-Feedback und Optimierungsziel

Geschäftliche Definition, technisches Event und gewähltes Optimierungsziel müssen
zusammenpassen. Ein ausgefülltes Formular darf als Lead-Ereignis erfasst werden;
eine später bestätigte Qualifizierung bekommt ihr korrektes nachgelagertes Signal.
Den Rohlead nicht pauschal in „qualifiziert“ umbenennen oder Standardereignisse
unterdrücken, um Qualität vorzutäuschen.

**Meta-Quellenstand, abgerufen am 07.09.2026:** Die Dokumentation der
[Conversion-Leads-Integration](https://developers.facebook.com/documentation/ads-commerce/conversions-api/conversion-leads-integration)
bezieht deren Performance-Ziel auf Lead Ads mit Instant Forms. Die zugehörige
[CRM-Payload-Dokumentation](https://developers.facebook.com/documentation/ads-commerce/conversions-api/conversion-leads-integration/crm-integration/3-implementing-the-crm-integration.md)
grenzt dieses Payload von Website-Leads ab und verlangt die Übermittlung der
CRM-Stufen einschließlich Rohlead. Website-Funnel deshalb nach der für sie passenden
Integration einrichten. Meta nennt Eignungsrichtwerte zu Volumen, Ereignisrate und
Verzögerung; diese nicht zu allgemeinen Leadgen-Mindestwerten umdeuten.

Vor Nutzung des Signals einen eigenen Testfall durch Formular, CRM und Rückmeldung
verfolgen. Prüfen: echte Statusänderung, stabiler Identifier, tatsächlicher Ereigniszeitpunkt,
korrekte Werte/Währung, Matchbarkeit, Dubletten, Wiederholungen, Verzögerung und
Fehlerdiagnostik. Bei parallelem Browser-/Server-Versand die vom konkreten Meta-Endpunkt
geforderte Deduplizierung nutzen. Ein erfolgreicher HTTP-Aufruf beweist weder korrekte
Zuordnung noch Geschäftserfolg. API-/Connector-Version und Events-Manager-Befund festhalten.
Die [allgemeinen CAPI-Best-Practices](https://developers.facebook.com/documentation/ads-commerce/conversions-api/best-practices.md)
erläutern Matching, Deduplizierung und Test Events. Ihre Web-Payload-Regeln nicht
ungeprüft als Conversion-Leads-CRM-Payload verwenden.

Nicht jedes CRM-Label ist ein im Konto verfügbares Optimierungsereignis. Vor Empfehlungen
die aktuelle Oberfläche und Connector-Dokumentation prüfen: Conversion Leads, Website-
Lead, qualifizierter Lead und Termin sind keine austauschbaren Schalter.
Ein tieferes Signal ist vorzuziehen, wenn es zuverlässig, hinreichend häufig und
rechtzeitig die gewünschte Qualität abbildet. Ein seltener, verspäteter oder inkonsistent
bewerteter Abschluss kann ein ungeeignetes Trainingssignal sein. Dann ein belastbares
früheres Qualitätsereignis nutzen und Abschlüsse weiterhin im CRM kontrollieren.

## 6. Vertrieb und Kapazität sind Teil der Werbewirkung

- Lead-Zuweisung, Rückruf-/Kontaktzuständigkeit und vereinbarte Reaktionszeit prüfen.
  Reaktionszeit messen; keine erfundene universelle Minuten-Garantie verwenden.
- Gründe für „nicht erreicht“, „nicht passend“, „noch nicht bereit“, „abgesagt“ und
  „kein Budget“ unterscheiden. Schlechte Erreichbarkeit beweist keinen schlechten ICP.
- Reminder, Umbuchung und thematisch passendes Follow-up entlang des tatsächlichen
  Kaufprozesses planen. Die E-Mail-/Messaging-Ausführung braucht ihren eigenen Auftrag.
- Qualität anhand nachvollziehbarer Kriterien bewerten. Subjektive Scores dürfen
  diagnostisch helfen; `Score <5` ohne validierte Skala ist keine automatische Kill-Regel.
  Vertriebsmitarbeiter, Reaktionszeit und fehlende Bewertungen als Störfaktoren prüfen.
- Vor mehr Budget Kapazität für Kontakt, Termine und Leistung prüfen. Wenn die
  Vertriebsbearbeitung bricht, verschlechtert Skalierung auch die gemessene Ad-Qualität.

Instant Form, Landingpage, Anruf und Messaging nach Angebotskomplexität, benötigtem
Kontext, mobilem Aufwand und tatsächlicher Qualität testen. Ein Review-Schritt oder
eine zusätzliche Frage kann Reibung und Auswahl verändern. Arbeits-E-Mail ist für
manche B2B-Angebote nützlich, für lokale Privatkunden ein unpassender Ausschluss.
Die Auswahl folgt CPQL, Gesprächen und CAC bei vergleichbarer Kohortenreife; eine
universelle LP-Conversion-Grenze von zwei oder fünf Prozent entscheidet sie nicht.

## 7. Creative und Testarchitektur

Eine strategische Hypothese verbindet Persona, Problem/Angle, Angebot, Beweis und
gewünschten nächsten Schritt. Eine Umsetzung verbindet diese mit Hook, Format und
Darstellung. Unterschiedliche Hooks können eine relevante kontrollierte Iteration sein;
eine Farbänderung ist selten eine neue strategische Hypothese. Die Begriffe im Register
trennen, statt Format pauschal für bedeutungslos zu erklären.

**Andromeda richtig einordnen:** Der [Engineering-Artikel von Meta vom 02.12.2024](https://engineering.fb.com/2024/12/02/production-engineering/meta-andromeda-advantage-automation-next-gen-personalized-ads-retrieval-engine/)
beschreibt die erste Retrieval-Stufe der Anzeigenempfehlung: aus vielen Kandidaten
wird eine kleinere Auswahl; nachgelagerte Rankingmodelle bestimmen die Auslieferung.
Daraus folgen weder eine Pflicht zu zwölf Creatives noch pauschal bedeutungsloses
Interessen-Targeting, unbeschränkte Zielgruppenexpansion oder ein Verbot kontrollierter
Tests. Regeln für Region, Ausschlüsse und sonstige Steuerungen im tatsächlichen
Konto prüfen. Interne Retrieval-/Qualitätsverbesserungen sind keine Leadgen-Ergebnisgarantie.

Format und Testreihenfolge nach dem größten offenen Risiko wählen. Ein klar lesbares
Angebot lässt sich günstig als Static prüfen; eine erklärungsbedürftige Leistung,
Demonstration oder glaubwürdige Person kann Video rechtfertigen. Ein Static-Erfolg
beweist noch keine identische Wirkung desselben Hooks im Video. Bei einer ungeklärten
Zielgruppe kann die Persona vor dem Angle zu testen sein.

Vor jedem Test kurz festhalten: Hypothese, variable Eigenschaft, Vergleich, primäre
Kennzahl, Qualitäts-/Kosten-Schutzgrenze, zugewiesener Ausgabenrahmen, benötigte Reife,
Review-Termin und die Entscheidung bei unzureichender Auslieferung. Creative-Anzahl
aus Budget, sinnvoller Exposition, Produktionskapazität und offenen Fragen ableiten.
Zwölf Creatives, fünf Statics oder 300 Hook-Kombinationen sind kein allgemeines Soll.

Automatische Auslieferung verteilt Spend ungleich. Wenig Spend heißt **unbeurteilt**,
nicht bewiesener Verlierer; viel Spend heißt **bevorzugt ausgeliefert**, nicht bewiesener
Gewinner. Für eine präzise Vergleichsfrage geeigneten Split-Test planen. Für wirtschaftliche
Portfolio-Optimierung darf adaptive Verteilung sinnvoll sein. Beide Ergebnisse nicht
als dieselbe Art von Evidenz darstellen. Kontrollierte Teststruktur nur einführen, wenn
die offene Frage den zusätzlichen Aufwand und die Aufteilung des Signals rechtfertigt.

## 8. Halten, pausieren, weiter testen, skalieren

| Befund | belastbare Entscheidung |
| --- | --- |
| Formular/Event defekt, falscher Claim, falsche Region oder untragbarer Geldverlust | betroffene Auslieferung zur Korrektur beziehungsweise vereinbarten Risikobegrenzung pausieren; Ersatz ist keine Vorbedingung |
| kaum Spend oder noch unreife Folgeereignisse | als unbewertet/offen führen; begrenztes Weiterlaufen, gezielte Exposition oder Testende aus Opportunitätskosten begründen |
| günstige Leads, aber wenige passende Gespräche | nach Stufe diagnostizieren: Botschaft, Formular, Kontakt, Terminierung und Vertrieb; keine automatische Hook-Diagnose |
| ausreichend gereifte Kohorte wirtschaftlich nicht tragfähig | pausieren oder gezielte Variante testen; Unsicherheit und vorab vereinbarte Verlustgrenze nennen |
| wirtschaftlich tragfähig, aber kaum Mengenreserve | halten; Engpass oder zusätzliche Hypothesen prüfen, Budget nicht reflexhaft erhöhen |
| wirtschaftlich tragfähig und Vertriebs-/Leistungsreserve vorhanden | begrenzten Budgetschritt mit Mess- und Rücknahmekriterium vorschlagen; Mehrkosten und Qualitätsänderungen beobachten |

Eine festgelegte Verlustgrenze ist ein **Risikobeschluss**, kein Signifikanztest. Zwei
oder drei Zielkosten ohne Abschluss beweisen keine schlechte Ad. Unter einem stark
vereinfachten stationären Poisson-Modell wäre `P(0)=exp(−erwartete Ereignisse)`; `exp(−2)`
beträgt rund 13,5 Prozent. Das ist keine allgemeine „Fehlkill-Rate“: Leadqualität,
Verzögerung, adaptives Matching, Mehrfachtests und wechselnde Auktionen verletzen die
Voraussetzungen. Solche Mathematik erklärt Unsicherheit, legitimiert keine Standard-Kills.

Frequency, CPM, CTR, Hookrate und Landingpage-Rate diagnostisch zusammen mit Zeitraum,
Zielgruppengröße und Ergebnisqualität lesen. Eine Frequency über drei oder eine CTR
über zwei Prozent ist allein weder Fatigue noch Klickköder. Verschlechterung kann
auch Angebot, Wettbewerb, Messung, Saison oder Vertriebsleistung betreffen.

Skalierung an marginalem Mehrergebnis, Kapital und Kapazität ausrichten. Kein universelles
„+20 Prozent alle fünf Tage“, kein garantierter Lernphasen-Reset bei „+30 Prozent“.
Änderung, Grund, Ausgangszustand und tatsächlich beobachteten Lernstatus dokumentieren.
Performende Versionen für Vergleichbarkeit erhalten; neue Varianten nachvollziehbar
versionieren. Eine ökonomisch notwendige Pause nicht durch „Winner nie anfassen“ verhindern.

## 9. Ausgabe und Lernregister

Pro Entscheidung: Kohorte/Stichtag, Spend und gültige Stufenzahlen, Kostenumfang,
Auswertungs-/Attributionsfenster, angenommene Quoten, Unsicherheit, Engpass und
konkrete nächste Handlung. Fehlende Zahlen als fehlend markieren.

Im Kunden-Lernregister Hypothese, Ad-/Funnel-Version, beobachtetes Ergebnis und
Entscheidung getrennt schreiben. Zustände: gestützt, widerlegt, unentschieden oder
nicht geprüft. Ein einzelner Terminpreis erklärt keine universelle Regel. Lernen aus
einem Kunden bleibt mit Branche, Offer, Zeitraum und Datenreife gekennzeichnet.
Allgemeine, nicht personenbezogene Arbeitsweisen können in dieser Skill-Bibliothek
gepflegt werden; Kundenrohdaten bleiben beim Kunden.

Schaltung, Budgetänderung und externes CRM-Schreiben richten sich nach dem konkreten
Nutzerauftrag und den bestehenden Konto-Berechtigungen. Diese Wissensreferenz erteilt
keine zusätzliche Ausführungsbefugnis.
