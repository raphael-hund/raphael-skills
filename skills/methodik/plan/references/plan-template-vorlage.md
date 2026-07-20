# Plan-Vorlage — für den schwächsten plausiblen Umsetzer

Jeder Plan ist für einen Umsetzer geschrieben, der **null Kontext** hat: er
hat die aktuelle Session, den Dialog, keinen der anderen Pläne gesehen — und
kann ein kleineres/günstigeres Modell sein. Kompetent im Befolgen expliziter
Anweisungen, schwach im Lückenfüllen oder im Wissen, wann er stoppen soll.

Drei Eigenschaften machen einen Plan für ein schwächeres Modell ausführbar:

1. **Selbstständiger Kontext** — alles Nötige steht in der Datei: Pfade,
   Code-Ausschnitte, Konventionen, Kommandos.
2. **Verifikations-Gates** — jeder Schritt endet mit einem Kommando und dem
   erwarteten Ergebnis. Der Umsetzer muss nie *beurteilen*, ob es geklappt
   hat.
3. **Harte Grenzen + Notausgänge** — explizite Out-of-Scope-Liste, und
   "STOPP und melden"-Bedingungen statt den Umsetzer improvisieren zu
   lassen, wenn die Realität vom Plan abweicht.

## Kopf jedes Tasks/Plans

```
**Planned at**: Commit `<SHA>`, <Datum>
**Priorität**: P1 | P2 | P3   **Effort**: S | M | L   **Risiko**: LOW|MED|HIGH
**Depends on**: <anderer Task/Plan, oder "keine">

## Warum das wichtig ist
2-5 Sätze: das Problem, seine konkreten Kosten, was sich mit der Umsetzung
verbessert. Für den Umsetzer UND einen menschlichen Reviewer — Absicht ist,
was einen korrekten Ermessens-Entscheid erlaubt, wenn ein Detail nicht passt.

## Aktueller Stand
Die Fakten, die der Umsetzer braucht, direkt eingebettet — nie "wie
besprochen" oder "siehe Audit":
- Relevante Dateien, je mit einer Zeile zur Rolle:
  `src/orders/api.ts` — Order-List-Endpoint, enthält das N+1 (Zeilen 130-160)
- Code-Ausschnitte wie sie heute existieren, mit `datei:zeile`-Markern.
- Konventionen des Repos, mit Verweis auf ein Vorbild.
- Vokabular/Constraints aus Design-Docs, wörtlich zitiert — der Umsetzer hat
  diese Docs nicht gelesen.
```

## Kommandos-Tabelle

| Zweck | Kommando | Erwartung bei Erfolg |
|---|---|---|
| Install | `<pnpm/npm install>` | Exit 0 |
| Typecheck | `<typecheck-Kommando>` | Exit 0, keine Fehler |
| Tests | `<test-Kommando> -- <Filter>` | alle grün |
| Lint | `<lint-Kommando>` | Exit 0 |

(Exakte Kommandos aus diesem Repo — beim Erkunden verifiziert, nicht
geraten.)

## Scope

**In Scope** (die einzigen Dateien, die geändert werden dürfen):
- `<Pfad 1>`
- `<Pfad 2>` (neu anlegen)

**Out of Scope** (nicht anfassen, auch wenn es verwandt aussieht):
- `<Pfad>` — Begründung, warum das Anfassen schadet statt hilft.

## Schritte

### Schritt 1: <imperativer Titel>
Was genau zu tun ist. Exakte Dateien/Symbole nennen. Zielform des Codes
zeigen, wenn tragend (das Muster, nicht jede Zeile).

**Verify**: `<Kommando>` → `<erwartete Ausgabe>`

(Jeder Schritt einzeln verifizierbar. Reihenfolge so wählen, dass die
Codebasis zwischen Schritten möglichst nie kaputt ist.)

## Done Criteria (maschinenprüfbar, ALLE müssen zutreffen)

- [ ] `<typecheck>` Exit 0
- [ ] `<test>` Exit 0, neue Tests für X existieren und laufen durch
- [ ] `grep -rn "<altes Muster>" <pfad>` liefert keine Treffer
- [ ] Keine Dateien außerhalb der In-Scope-Liste geändert (`git status`)

## STOP-Bedingungen

Stoppen und melden (nicht improvisieren), wenn:

- Der Code an den in "Aktueller Stand" zitierten Stellen nicht mit den
  Ausschnitten übereinstimmt (Drift seit "Planned at").
- Die Verifikation eines Schritts nach einem angemessenen Fixversuch
  zweimal fehlschlägt.
- Der Fix eine Out-of-Scope-Datei zu berühren scheint.
- Sich eine Kernannahme des Plans als falsch herausstellt.

## Wartungshinweise

Für wen den Code danach betreut: was künftige Änderungen berührt, was ein
Reviewer im Diff besonders prüfen sollte, was bewusst aus diesem Plan
ausgeklammert wurde (und warum).

---

## Qualitäts-Latte — vor Abschluss jedes Plans prüfen

- Könnte ein Modell, das dieses Repo nie gesehen hat, mit nur Plan + Repo
  ausführen? Fehlt Wissen aus der Planungs-Session, gehört es inline in
  den Plan.
- Ist jede Verifikation ein Kommando mit erwartetem Ergebnis, kein
  Ermessen ("sicherstellen, dass es funktioniert")?
- Nennt jeder Schritt exakte Dateien/Symbole statt "das relevante Modul"?
- Sind die STOP-Bedingungen spezifisch für die tatsächlichen Risiken dieses
  Plans, keine Textbausteine?
- Keine Secret-Werte in der Datei — nur Fundort und Credential-Typ.
