# Prüffragen und unabhängige Kritik

Diese Matrix wählt eine Fachfrage, keinen festen Agentenfächer. Der Web-Owner
legt den benötigten Umfang nach `qa-faecher.md` fest und führt Befunde zusammen.
Die Fragen müssen die beauftragten Routen und Sektionen abdecken; eine selbst
gewählte Teilfrage verkleinert den Gesamtauftrag nicht.

| Frage | Eingang | Tragender Beleg |
|---|---|---|
| Ist die visuelle Hierarchie verständlich? | Tatsächliche Ansichten, Auftrag, Kundenrichtung | Konkrete Region und beobachtete Wirkung |
| Passt die Umsetzung zur Referenz? | Referenz und aktueller Build bei passender Geometrie | Benannte Übereinstimmung/Abweichung |
| Sind gemeinsame Komponenten konsistent? | Betroffene Konsumenten und Tokens | Sichtbarer Unterschied oder Code-/Laufzeitbefund |
| Passen Sektionen und Seiten zusammen? | Sektionsfolge und Routen bei gleichen Viewports, tatsächliche Inhaltskanten und Code | Sichtbare Breiten-/Rhythmus-/Typo-/Bildsprachabweichung; bewusste Varianten berücksichtigen |
| Funktioniert der Nutzerweg? | Ausgangslage, Aktion und erwartetes Ergebnis | Browser-, Fokus-, Request-/Response- oder Datenbeleg |
| Stimmen Copy und Aussagen? | Verwendeter Text, Voice, Absprachen, Quellen | Wortlautstelle und belegtes Kriterium |
| Stimmen SEO-/Trust-Anforderungen? | Markup, Ziel, PROOF und Projektvertrag | Konkreter Prüf- oder Quellenbeleg |

Ein Reviewer bekommt nur Auftrag, relevante Inputs und seine Prüffrage. Ein
zusätzlicher Reviewer lohnt sich bei hohem Risiko, nicht abgedeckter Fachfrage
oder widersprüchlichen Belegen. Der aktuelle Host und Nutzervertrag bestimmen
Modell und Werkzeuge. Historische Familienquoten sind keine Voraussetzung.
Visuelle Urteile brauchen tatsächlich angesehene Bilder oder gerenderte Ansichten.
Ohne Bildeingang sind Codebefunde möglich, aber kein visuelles `clear`.

Deterministische Gegenproben kommen vor Modellprüfung. Ein einzelner
reproduzierbarer Fehler bleibt ein Fehler; Mehrheitsabstimmung kann ihn nicht
wegstimmen. Bei Widerspruch den konkreten Zustand und die Quelle nachprüfen.
Geschmacksunterschiede werden als solche bezeichnet und nicht durch eine
unbelegte technische Regel entschieden.

## Rückgabe und Zusammenführung

Jeder Befund nennt Ort, Erwartung, Beobachtung, Beleg, Auswirkung und Fixziel
nach `rolle-kritik.md`. Jede Rückgabe nennt außerdem tatsächlich untersuchte
Routen, Sektionen, Viewports/Zustände und offene Abdeckung. Sie unterscheidet:

- `clear`: gestellte Fragen untersucht, keine offenen Befunde in diesem Umfang.
- `changes-required`: belegte offene Befunde mit prüfbarem Fixziel.
- `blocked`: eine verlangte Untersuchung fehlt; Grund und betroffener Umfang.

Der Owner dedupliziert dieselbe Ursache und erhält unabhängig belegte Fehler.
Er macht aus einer Teilprüfung keine Gesamtfreigabe. Erneute Prüfung folgt einem
relevanten Fix oder einer konkreten ungeklärten Frage; keine Mindestzahl Runden.
Eigene Prüfung und unabhängige zweite Prüfung werden korrekt bezeichnet.

Große Bildmengen nach tatsächlichen Prüffragen aufteilen und die geltenden
Hostbudgets einhalten. Ein Verkleinerungsschritt darf wichtige Details nicht
unlesbar machen. Originalpfade und Zuordnung zum Build bleiben nachvollziehbar.
