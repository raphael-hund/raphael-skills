# Qualitaetsschleife: Befund, Korrektur, Nachweis

Diese Referenz gilt fuer die im Auftrag verlangten Eigenschaften. Der
Gesamtowner waehlt die Pruefungen und nimmt das Ergebnis an; bei Web ist das
`web`. Ein Fachpruefer liefert seinen begrenzten Beleg.

## Ablauf je zusammenhaengendem Aenderungspaket

1. **Ergebnis bestimmen.** Akzeptanz aus Auftrag und aktuellem Plan ableiten.
   Die betroffenen Inputs, Revisionen, Pfade und Benutzerzustaende festhalten.
2. **Direkte Checks ausfuehren.** Vorhandene passende Tests und Pruefer nutzen.
   Der ausfuehrende Prozess braucht die erforderlichen Werkzeuge; Dateiworker
   liefern Inputs, Root fuehrt deren Shell-/Browserpruefungen aus.
3. **Offene Fachfrage pruefen.** Wenn die direkten Checks sie nicht beantworten,
   aktuelle Artefakte und Kriterien an einen geeigneten Pruefer geben.
   Weitere Stimmen nur fuer einen konkreten Erkenntnisgewinn oder Dissens.
4. **Befund behandeln.** Bestaetigte auftragsrelevante Fehler korrigieren oder
   einen falschen Befund mit Beleg zurueckweisen. Jede Korrektur nennt Ursache,
   geaenderte Stelle und erwartetes Verhalten.
5. **Betroffenes erneut pruefen.** Nach einer relevanten Aenderung die davon
   betroffenen Checks wiederholen. Abgeschlossene unveraenderte Eigenschaften
   brauchen keine automatische neue Runde.

Fertig ist das Paket, wenn jede verlangte Eigenschaft fuer den aktuellen Stand
belegt ist und kein bestaetigter relevanter Fehler offen bleibt. Es gibt keine
universelle Screenshotzahl, feste Modellflotte, Mindestzahl von Reviewrunden
oder automatische Score-Schwelle. Ein vom Auftrag verlangter Vergleich behaelt
seine konkreten Kriterien; ein Modellwert ersetzt Raphaels Geschmacksurteil nicht.

## Beleg je Eigenschaft

| Eigenschaft | Nachweis |
|---|---|
| Fakten, Angebot, Copy | Benannte Quelle und tatsaechlich verwendeter Text |
| Sichtbare Gestaltung | Aktueller Render, passende Ansicht und Region |
| Bedienung | Aktion, erwartete Zustandsaenderung, Fokus/Recovery soweit betroffen |
| Uebermittlung | Erwartete UI und Netzwerk-/Datenwirkung am kontrollierten Ziel |
| Bewegung | Laufzeitprobe der betroffenen Animation, einschliesslich Reduced Motion |
| Code/Build/Regression | Passende ausgefuehrte Tests, Exitcodes und Diff fuer denselben Stand |

Fuer Web besitzt [qa-faecher.md](/root/raphael-skills/skills/eigene/web/references/qa-faecher.md)
die konkrete Auswahl. Ein normales Capture fuehrt keine fachlichen Schreibaktionen
aus. Ein Bild einer Erfolgsmeldung beweist keine erfolgreiche Uebermittlung.

## Rueckgabe und Annahme

Jeder Check nennt Frage, Ergebnisstatus, Artefakt/Revision und Belegpfad.
`PASS`, `FAIL`, `BLOCKED`, `NOT_RUN` und begruendetes `N/A` bleiben getrennt.
Der Consumer liest den Status im Ergebnis sowie den echten Exitcode; eine Datei
oder ein Exit 0 bei inhaltlichem FAIL erfuellt kein Gate.

Root prueft Run-/Versuchsidentitaet und aktuelle Inputs vor Annahme. Ein
`timeout`, `cancelled`, `failed`, verlorener Supervisor oder ueberholter Versuch
wird nicht durch spaete Ausgabe aktuell. Transporterfolg bestaetigt nur die
Rueckgabe; fachliche Abnahme braucht die verlangten Checks.

Ein Review sieht Artefakt, relevante Kriterien und notwendige Provenienz,
nicht nur die Selbstdarstellung des Builders. Befunde nennen eine konkrete
Stelle, Auswirkung und Pruefmoeglichkeit. Modell-/Familienwahl folgt dem
aktuellen Nutzer-/Hostvertrag; Fehlerhistorie ist keine dauerhafte Sperrliste.

## Begrenzte Wiederaufnahme

Bei Tool-/Providerfehler zuerst Fehlerklasse, bestehenden Run und moegliche
Teilresultate pruefen. Ein gleicher Infrastrukturfehler wird hoechstens einmal
gezielt wiederholt, danach bleibt das Paket `BLOCKED`. Freie Arbeit wird
fertiggestellt. Ein weiterer fachlicher Versuch braucht eine neue begruendete
Korrektur, keinen neuen Reviewer allein fuer eine hoehere Note.
