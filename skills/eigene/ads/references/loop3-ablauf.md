# Performance: Lead-Generation von Auslieferung bis Abschluss

Für Kontoauswertung und Kill/Keep/Scale lesen. Berechnungen, CRM-Integration und
Primärquellen stehen in [wissen/leadgen-betriebsmodell.md](wissen/leadgen-betriebsmodell.md).
Diese Referenz beschreibt den Arbeitsablauf, keine automatische Kontosteuerung.

## Eingangsdaten und Beobachtung

1. Den beauftragten Zeitraum und das passende Kunden-Lernregister lesen, sofern vorhanden.
2. Aktuelle 7- und 30-Tage-Exporte als Dateien sichern: Konto, Zeitzone, Währung,
   Attribution, Report-Stichtag, Kampagne/Adset/Ad und jeweilige Ergebnisdefinition.
3. Spend, Auslieferung und Plattformereignisse von CRM-Stufen und gereiften
   Lead-Kohorten trennen. Unvollständige Daten oder unbekannte Herkunft ausweisen.
4. Bei Creative-Urteilen das tatsächlich ausgelieferte Material ansehen. Videos
   mit Spend im beauftragten Scope über `watch` oder verfügbare gleichwertige
   Extraktion auf Frames und Transkript prüfen. Kein Tonzugang ist kein gehörtes Audio.
5. Bei umfangreichen Konten die Inventarliste und unbearbeitete Medien sichtbar
   führen. Keine Vollsichtung aus Thumbnail, Skript oder Ads-Manager-Zeile behaupten.

Ohne CRM-Daten kann die Auslieferung beurteilt und eine Diagnose geplant werden.
Ein abschliessendes Urteil über Leadqualität, Neukunden-CAC oder Rentabilität
bleibt dann begrenzt. Fehlende Daten sind keine Nullwerte.

## Stufen und Wirtschaftlichkeit

Roh-Submits, gültige deduplizierte Kontakte, qualifizierte Kontakte, Buchungen,
wahrgenommene Gespräche und Neukunden separat zählen. Kriterien und Verantwortliche
festhalten. Leads ohne Bewertung nicht als schlechte Leads verbuchen.

Kosten je Stufe stets mit passendem Nenner und gleicher Kohorte rechnen. Ziel-CAC
aus Deckungsbeitrag im gewählten Zeitraum, Ergebnisreserve und übrigen
Akquisitionskosten ableiten. Die ausführliche Kettenregel und Rechenbeispiele
stehen im Betriebsmodell. Eine historische CPL-Verbesserung um 20 Prozent ist
keine bewiesene Geschäftsgrenze.

Aktuelle 7-/30-Tage-Lieferung und gereifte Kohorten nebeneinander ausgeben.
Diese Woche gewonnene Alt-Leads nicht durch diese Woche gewonnene Neu-Leads teilen.
Stornos, Zahlungsfluss, Vertriebsaufwand und begrenzte Kapazität berücksichtigen.

## Engpassdiagnose

| Beobachtung | Nächste Prüfung |
|---|---|
| Geringe Auslieferung | Budget, Gebote, Verfügbarkeit, Zielgruppe/Controls, Optimierungssignal und Testarchitektur |
| Wenig passende Aufmerksamkeit | Einstieg, visuelle Relevanz, Angebotsklarheit und erreichte Personen |
| Klicks ohne gültige Kontakte | Botschaft/Zielseite, Geschwindigkeit, Formular, Tracking und Trafficqualität |
| Viele Kontakte, wenig qualifiziert | ICP-Versprechen, Informationsbedarf, Ausschlusskriterien und Bewertungspraxis |
| Passende Kontakte, wenig Termine | Erreichbarkeit, Reaktionszeit, Kalenderverfügbarkeit und Follow-up |
| Buchungen, wenig erschienene Gespräche | Erwartung, Terminabstand, Bestätigung, Erinnerungen und Umbuchung |
| Gute Gespräche, wenig wirtschaftliche Abschlüsse | Offer, Entscheidungsprozess, Sales, Preis/Kosten, Zahlungsbedingungen und Nachlauf |

Das sind Hypothesen, keine festen Zuordnungen. Hohe CPM oder CTR beweisen keine
einzelne Ursache. Frequency ist ohne Zeitraum und Publikum nicht aussagekräftig.
Nicht ausschliesslich den leichtesten Prozentwert optimieren, sondern den
plausiblen wirtschaftlichen Engpass.

## Entscheidungsprotokoll

| Entscheidung | Erforderliche Begründung |
|---|---|
| **Halten** | Tragfähige Ergebnisse innerhalb Kapazität; Datenbasis und verbleibende Unsicherheit nennen |
| **Weiter testen** | Offene relevante Frage, ausreichender Rest-Ausgabenrahmen und erwartbar nützliche Exposition |
| **Pausieren/korrigieren** | Defekt, falsche Aussage/Zielregion, vereinbarte Verlustgrenze oder gereift untragfähige Wirtschaftlichkeit |
| **Unbewertet** | Keine ausreichende Auslieferung, fehlende Bewertung oder unreife Kohorte |
| **Skalieren vorschlagen** | Erwarteter zusätzlicher Deckungsbeitrag, Liquidität, Vertriebskapazität und klares Kontroll-/Rücknahmekriterium |

Zwei oder drei Zielkosten ohne Ergebnis sind kein universeller Beweis eines
Verlierers. Eine Verlustgrenze kann eine Pause trotzdem wirtschaftlich begründen.
Wenig Spend ist keine nachgewiesene Niederlage; hoher Spend ist kein Gewinnerbeleg.
Eine notwendige Pause muss nicht auf Ersatz-Creatives warten.

Budgetschritte anhand Risiko, Datenvolumen und Grenzertrag wählen. Kein fixer
Prozentsatz garantiert eine stabile Lernphase. Ausgangszustand, Änderung,
beobachteten Lernstatus und nachlaufende Qualität dokumentieren. Tragfähige
Versionen zum Vergleichen erhalten, neue Varianten nachvollziehbar benennen.

## Formulare und Rückmeldung

Ad und Folgeschritt müssen denselben Deal erklären. Instant Form, Website, Anruf
oder Messaging nach Auftrag und Zielgruppe beurteilen. Eine Arbeits-E-Mail ist
keine geeignete Pflicht für jeden Privatkunden; mehr Tipp-Arbeit garantiert keine
Qualität. Buchung und tatsächliches Erscheinen bleiben unterschiedliche Ereignisse.

Rohlead und nachgelagerte Stufen korrekt senden. Für Metas CRM-Conversion-Leads
gelten andere Parameter und Voraussetzungen als für Websiteereignisse. Aktuelle
offizielle Dokumentation lesen, bevor ein Payload oder Optimierungsziel empfohlen
wird. Jeden Zweig über Formular, CRM und tatsächliche Rückmeldung testen.

## Produktion und Lernregister

Nach einer belegten Diagnose die nächste konkrete Hypothese festhalten. Hooks
können auf passende Bodies treffen; unterschiedliche Kaufmotive benötigen häufig
unterschiedliche Beweisführung. Produktionskadenz aus Lernfragen, Kapazität und
Testbudget ableiten. Kein allgemeines Minimum an Ads pro Woche.

Pro Entscheidung dokumentieren: Datum, Konto/Ad-/Funnel-Version, Kohorte,
Beobachtung, Interpretation, Handlung, nächste Prüfung und verantwortliche Person.
Hypothesen als gestützt, widerlegt, unentschieden oder ungeprüft markieren.
Kundeneigenes Lernregister nutzen, wenn vorhanden; sonst den im Auftrag
vereinbarten lokalen Ergebnisort. Keine allgemeinen Skill-Edits aus einem
einzelnen Kundenresultat ableiten.

## Ausgabe und Ausführung

Der Bericht enthält Quellenexporte, tatsächlich gesichtete Creatives, das
berechnete Geschäftsbild, die Engpassdiagnose und begründete Entscheidungen.
Eine Datenlücke führt zu einem konkreten Prüfpunkt.

Schaltung, Budgetänderungen, Nachrichten und externe CRM-Schreibvorgänge nur im
konkret autorisierten Umfang. Diese Referenz erteilt keine Kontoberechtigung.
Kundenmaterial bleibt im Kundenprojekt; der gemeinsame Skill enthält nur
allgemeines Handwerk und öffentlich belegte Beispiele.
