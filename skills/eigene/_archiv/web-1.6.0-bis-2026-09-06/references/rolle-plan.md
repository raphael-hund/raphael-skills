# Website planen

Ergebnis ist ein umsetzbarer Plan für den verlangten Umfang. Der Plan enthält
Ziel, aktuelle Kundenentscheidungen, Inhalte/Funktionen, Abhängigkeiten und
messbare Abnahme. Eine Plan-only-Aufgabe erzeugt keinen Production-Code und
braucht keine Build-Aufnahmen. Unabhängige Recherche darf delegiert werden.

## Vorhandene Wahrheit auflösen

Lies den konkreten Projektstand und die relevanten Kundenquellen: Absprachen,
`DECISIONS.md`, ICP/OFFER/PROOF/VOICE und vorhandenes `brand/DESIGN.md`.
Neueste Nutzerworte entscheiden. Widersprüchliche Designfassungen werden im
bestehenden Designvertrag aufgelöst; andere Pläne verweisen darauf.

Vor einer offenen Stilentscheidung relevante Eingangsdateien der letzten sieben
Tage prüfen und verwendete Bildreferenzen tatsächlich ansehen. Der Plan nennt
Quelle und Zweck. Neue globale Stilregeln folgen nicht aus einem Kunden-Lock.

## Passende Plantiefe

| Umfang | Planort und Inhalt |
|---|---|
| Kleine Änderung | Bestehender Auftrag/Issue oder kurzer Abschnitt im aktuellen Plan: Verhalten, Grenze, Prüfbedingung. |
| Landingpage | Vorhandener `PLAN.md` bzw. Projektplan: Zielgruppe, Angebot, Seitenjob, Abschnitte, Inhalte, Funktionen und Abnahme; `landingpage-struktur.md` unterstützt. |
| Mehrere Routen / Shared Owners | `sitemap-section-planung.md`; bei maschinellem Routen-/Write-Vertrag `website-plan` mit v3-Manifest und Validator. |

`PLAN.md` enthält den **aktuellen Planstand**. Abgelöste Entscheidungen bleiben
im vorhandenen Decision Log, gelten aber nicht weiter. Ist ein v3-Paket kanonisch,
verweist `PLAN.md` darauf; dieselbe Spezifikation wird nicht daneben wiederholt.
Ein Abschnittsplan ergänzt die fachliche Beschreibung, widerspricht aber weder
Route-Abhängigkeiten noch Schreibgrenzen. Bei Änderungen Vertrag aktualisieren
und erneut validieren, bevor der Build ihn konsumiert.

## Inhalte und Gestaltung

Halte fest, für wen die Seite ist, welches Problem sie löst und welche Handlung
sie ermöglichen soll. Claims und konkrete Zahlen brauchen benannte Quellen.
Offene Fakten stehen als `FAKT-GATE` mit ihrer Wirkung auf die Abnahme im Plan.
Eine ausdrücklich provisorische Vorschau darf gekennzeichnete Slots verwenden;
ein verlangtes entscheidendes Faktum bleibt eine echte offene Anforderung.

Für Copy: Problem, Person, Versprechen, Ton, relevante Absprachen und Proof-Lage
an den geltenden Copy-Owner geben. Verlangt der Planauftrag bereits reale Copy,
liefert dieser Owner sie mit den Copychecks. Sonst genügt das Copy-Briefing.
SEO nur laden, wenn Keyword, Indexierung oder Informationsarchitektur eine
tatsächliche Planentscheidung sind.

Eine festgelegte Referenzrichtung bleibt bestehen. Bei offener Richtung zuerst
ein repräsentatives sichtbares Beispiel planen; mehrere Varianten nach
`fold-duell.md` nur bei entsprechendem Entscheidungsbedarf. Ein Modellurteil
ersetzt keine subjektive Wahl Raphaels. Pattern-IDs werden für tatsächlich
verwendete Muster notiert, nicht als Pflichtschmuck jeder Sektion.

## Abnahme und Übergabe

Die Prüffragen folgen `qa-faecher.md`: Inhalt, Darstellung, konkrete Nutzerwege,
Technik und Revision soweit anwendbar. Bei umfangreicher Kritik kann der
bestehende `PRUEFGEGEN.md` die ausgewählten Fragen bündeln; ein anderer gültiger
Auftrag braucht dafür keine fünf Pflichtlinsen oder leere Zusatzdatei.

Ein v3-Plan besteht nur mit `PLAN_VERIFIED=YES`, gültigem
`website-plan/verification/v3`-Receipt, passendem `manifest_sha256` und aktuellen
Plan-Hashes. Overlap, fehlende Owner und überholte Inputs bleiben offen.

Fertig: Jede verlangte Seite/Funktion ist beschrieben, verbindliche Vorgaben
und Vorschläge sind unterscheidbar, Abhängigkeiten und Prüfkriterien sind klar.
Die Übergabe referenziert Quellen und Grenzen nach
`planner-executor-protokoll.md`; sie startet keine ungefragte nächste Phase.
