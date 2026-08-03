---
name: skill-update
version: 0.1.0
description: >
  Nimmt einen einzelnen Lernpunkt ("das hätte anders laufen sollen") und trägt ihn
  in ALLE betroffenen bestehenden Skills nach — statt ihn in einem Skill zu
  vergraben oder als neuen Skill anzulegen. Zwingt den Lernpunkt zuerst in eine
  Pflichtform, sucht dann dreistufig über das Skill-Repo, unterscheidet
  Skill-Regel von Prinzip und legt jede Datei einzeln zur Freigabe vor.
  Trigger: "Skill anpassen", "Lernpunkt einarbeiten", "das soll der Skill künftig
  anders machen", "Skills nachziehen", "skill-update".
class: M
scope: agency
sensitivity: internal
source: eigenständig geschrieben; Idee UPDATE-Modus aus coreyhaines31/makerskills skillify (Ideen-Merge, kein Vendoring)
completion_criteria:
  - "Lernpunkt liegt in der Pflichtform vor (Skill / neues Verhalten / Grund / altes Verhalten), sonst wurde abgebrochen und nachgefragt"
  - "Alle drei Suchstufen (grep, semantisch, Adjazenz) wurden gefahren und jeder Treffer trägt Confidence hoch/mittel/niedrig"
  - "Triage-Entscheidung Skill-Regel vs. Prinzip ist getroffen und begründet; bei Prinzip liegt ein Kandidat in /root/raphael-brain/wiki/_candidates/ mit Beleg datei:zeile"
  - "Jede geänderte Datei wurde einzeln als Diff vorgelegt und einzeln freigegeben; version: ist nach Semver-Tabelle gebumpt"
  - "Commit ist lokal; kein git push ausgeführt"
---

# skill-update — einen Lernpunkt in alle betroffenen Skills nachziehen

**Lies zuerst:** `/root/raphael-command-center/AGENTS.md` (Regeln 1, 5, 9, 10 — ein
Bedeutungsort, Stand auf der Festplatte, kein automatischer Push).

## Zweck (1 Satz)

Ein einmal gelernter Punkt landet an genau den Stellen im Skill-Repo, an denen er
künftig greifen muss — vollständig, ohne Doppelung, mit Freigabe je Datei.

## Wann

- Nach einer Session, in der ein Skill sich falsch oder unvollständig verhalten hat.
- Raphael sagt "das soll künftig anders laufen" und meint bestehendes Können.
- **Nicht** für ein neues Arbeitsmuster ohne bestehenden Skill → `extract-approach`.
- **Nicht** für Form/Frontmatter/Struktur eines Skills → `writing-skills`.

## Schritt 1 — Lernpunkt in Pflichtform bringen (hartes Gate)

Der Lernpunkt wird wörtlich in diese Form geschrieben:

> **"[Skill] soll [neues Verhalten], weil [Grund]. Aktuell tut es [altes Verhalten]."**

Beispiel: *"`ads` soll vor jedem Statics-Brief die Voice-Seite lesen, weil sonst der
Ton driftet. Aktuell schreibt es Copy direkt aus dem Angle."*

Lässt sich ein Teil nicht füllen — vor allem "aktuell tut es" —, liegt ein Gefühl vor,
keine Änderung. Dann hier stoppen und genau den fehlenden Teil erfragen. Nie raten und
nie mit einer Vermutung weiterarbeiten.

## Schritt 2 — dreistufige Suche über `/root/raphael-skills/skills/`

Alle drei Stufen laufen, auch wenn Stufe 1 schon Treffer liefert. Der ganze Sinn des
Skills ist, die Stellen zu finden, an die niemand denkt.

1. **grep-Keyword** — die Substantive/Verben des Lernpunkts, deutsch und englisch,
   über `skills/**/SKILL.md` und `skills/**/references/*.md`.
   `grep -rn -i -e "<begriff1>" -e "<begriff2>" /root/raphael-skills/skills/`
2. **Semantischer Zweitblick** — Skills, die dieselbe Sache anders benennen
   (z. B. "Beleg" vs. "Quelle" vs. "Evidence", "Freigabe" vs. "Signatur" vs. "Gate").
   Dazu die Skill-Liste durchsehen, nicht nur greppen.
3. **Adjazenz-Scan über den Output-Typ** — welche Skills erzeugen denselben
   Ausgabetyp wie der genannte Skill (Text, Bild, Plan, Kandidatenseite, Commit)?
   Ein Lernpunkt über Belege in Kandidatenseiten trifft jeden Skill, der
   Kandidatenseiten schreibt, nicht nur den zuerst genannten.

Ergebnis ist eine Trefferliste mit je einer Confidence:

| Confidence | Bedeutung | Folge |
|---|---|---|
| hoch | Stelle widerspricht dem neuen Verhalten direkt | Diff vorschlagen |
| mittel | Stelle betrifft dasselbe Thema, Wortlaut passt noch | Diff vorschlagen, als "mittel" markieren |
| niedrig | nur thematisch benachbart | nur nennen, kein Diff ohne Nachfrage |

## Schritt 3 — Triage: Skill-Regel oder Prinzip

- **Skill-Regel** (Standardfall): der Punkt gilt für ein bis zwei Skills → direkt dort
  einarbeiten.
- **Prinzip**: derselbe Lernpunkt taucht zum **dritten Mal** auf (unterschiedliche
  Skills, unterschiedliche Sessions). Dann gehört er nicht fünfmal kopiert, sondern
  einmal als Wissensseite:
  Kandidat nach `/root/raphael-brain/wiki/_candidates/` nach
  `templates/notiz-template.md`, `status: candidate`, mit mindestens einem Beleg als
  `datei:zeile` (die Fundstelle, die den Punkt zum dritten Mal belegt). Die
  betroffenen Skills bekommen dann eine Zeile Verweis auf die Seite, nicht die
  ausformulierte Regel (Regel 1: ein Bedeutungsort).

Ob "drittes Mal" vorliegt, wird belegt — mit den zwei früheren Fundstellen als
`datei:zeile`. Ohne Belege gilt es als Skill-Regel.

## Schritt 4 — Diff je Datei, Einzelfreigabe

Pro betroffener Datei ein eigener Vorschlag, in dieser Reihenfolge:

1. Dateipfad + Confidence + ein Satz, warum diese Datei betroffen ist.
2. Der konkrete Diff (alter Text → neuer Text), minimal — nur die Zeilen, die der
   Lernpunkt verlangt. Kein Mitputzen von Nachbarabschnitten.
3. `version:`-Bump nach Tabelle.
4. Freigabe für **genau diese Datei** einholen, dann schreiben. Keine Sammelfreigabe
   über mehrere Dateien.

Semver-Tabelle für den Bump:

| Änderung | Bump |
|---|---|
| Tippfehler, Formulierung, Beispiel ergänzt | Patch (0.1.0 → 0.1.1) |
| neue Regel/neuer Schritt, Verhalten ändert sich | Minor (0.1.0 → 0.2.0) |
| Ablauf/Gates umgebaut, alte Aufrufe passen nicht mehr | Major (0.1.0 → 1.0.0) |

Nach dem letzten Schreibvorgang: `python3 tools/validate-skill.py <pfad>` je
geänderten Skill — muss `[OK]` zeigen.

## Schritt 5 — lokaler Commit, kein Push

Ein Commit über alle freigegebenen Dateien, Nachricht nennt den Lernpunkt in der
Pflichtform. **`git push` wird nicht ausgeführt** — Push ist extern und braucht
Raphaels eigene Freigabe (AGENTS.md Regel 9). Bei Skill-Mutationen zusätzlich Eintrag
in `/root/raphael-command-center/ops/review-inbox.md` (Rot-Klasse).

## Rote Linien

- Kein Diff ohne Pflichtform aus Schritt 1.
- Kein `git push`, kein Auto-Merge, kein `git add -A`.
- Dieselbe Regel nie in mehr als zwei Skills ausformulieren — ab drei wird es ein
  Prinzip (Schritt 3).
- Keine Änderung an Skills, die nur "niedrig" getroffen wurden, ohne Rückfrage.

## Nachbarn

- [`extract-approach`](/root/raphael-skills/skills/eigene/extract-approach/SKILL.md) —
  legt **neue** Skill-Kandidaten aus 2× wiederholter Arbeit an. `skill-update` ändert
  ausschließlich Bestehendes.
- [`writing-skills`](/root/raphael-skills/skills/methodik/writing-skills/SKILL.md) —
  bestimmt **Form** (Frontmatter, Aufbau, Vendoring-Prüfung). `skill-update` bestimmt
  **Inhalt** und liefert die Form an `writing-skills` ab.
