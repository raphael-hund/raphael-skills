---
name: brainstorm
version: 0.2.0
description: >
  Verwandelt eine Idee durch geführten Dialog in eine geprüfte Design-Spec, bevor
  auch nur eine Zeile Code geschrieben wird. Fragt einzeln nach, schlägt 2-3
  Ansätze mit Trade-offs vor, lässt die Spec vom Nutzer freigeben und übergibt
  danach an plan. Jeder Vorschlag braucht ein Zitat aus Codebase/Gespräch —
  generische Ideen ohne Beleg sind Rauschen, keine Option. Trigger:
  "brainstorm", "Idee ausarbeiten", "Design-Spec", "bevor wir loslegen",
  "Anforderungen klären".
class: M
scope: agency
sensitivity: internal
source: fusion — superpowers (obra) skills/brainstorming @ d884ae04 + shadcn/improve skills/improve/references/audit-playbook.md (Grounding rule, Kategorie "Direction")
completion_criteria:
  - "Spec-Datei geschrieben und committet (Pfad genannt)"
  - "Nutzer hat die geschriebene Spec explizit freigegeben"
  - "Kein Code, kein Scaffolding, keine Implementierung vor der Freigabe erfolgt"
---

# brainstorm — Idee zur freigegebenen Spec

**Zweck:** Ideen durch natürlichen Dialog in eine vollständige, geprüfte Spec
verwandeln — nicht in Code. Gilt für JEDES Vorhaben, auch scheinbar triviale
("nur ein Config-Change", "nur eine Utility-Funktion"). Gerade dort passieren
die teuersten unhinterfragten Annahmen.

## Hartes Gate

Keine Implementierung, kein Scaffolding, kein Code vor Präsentation UND
Freigabe der Spec durch den Nutzer. Das gilt unabhängig von der wahrgenommenen
Einfachheit des Vorhabens. Die Spec darf kurz sein (ein paar Sätze reichen bei
trivialen Fällen), aber sie muss präsentiert und freigegeben werden.

## Davor / danach

Geht es um eine Geschäfts- oder Angebotsidee (lohnt sich das überhaupt?), läuft erst
[`idea-filter`](/root/raphael-skills/skills/eigene/idea-filter/SKILL.md) — dieser Skill
setzt das Verdikt "Build" bereits voraus und klärt nur noch das Wie. Nach der Freigabe
folgt [`plan`](/root/raphael-skills/skills/methodik/plan/SKILL.md).

## Ablauf

1. **Kontext erkunden** — vorhandene Dateien, Docs, letzte Commits ansehen.
2. **Umfang prüfen** — beschreibt die Anfrage mehrere unabhängige Teilsysteme
   (z. B. "Plattform mit Chat, Storage, Billing, Analytics")? Dann zuerst in
   Teilprojekte zerlegen, jedes bekommt seinen eigenen Spec→Plan→Umsetzung-Zyklus.
   Nicht in Detailfragen zu einem Projekt investieren, das erst zerlegt werden muss.
3. **Klärende Fragen — eine nach der anderen.** Multiple-Choice bevorzugt, aber
   offene Fragen sind ok. Nur ein Thema pro Nachricht. Fokus: Zweck, Constraints,
   Erfolgskriterien.
4. **2-3 Ansätze vorschlagen** — mit Trade-offs, eigener Empfehlung zuerst und
   Begründung. **Evidenz-Pflicht:** jeder Ansatz/Vorschlag braucht ein Zitat
   aus Codebase, Gespräch oder Dossier — ein Vorschlag, der auf jedes
   beliebige Projekt der Kategorie zuträfe ("Dark Mode ergänzen", "KI-
   Feature hinzufügen"), ist Rauschen, keine Option. Belegquellen: offene
   TODO/FIXME-Cluster, unerfüllte README-/Roadmap-Versprechen, einseitige
   Fähigkeiten-Paare (Export ohne Import), explizit genannte Nutzer-
   Reibung. Kein Vorschlag ohne eine dieser Quellen.
5. **Design abschnittsweise präsentieren** — Umfang je Abschnitt an dessen
   Komplexität anpassen (ein paar Sätze bis ~200-300 Wörter). Nach jedem
   Abschnitt fragen, ob es passt. Abdecken: Architektur, Komponenten,
   Datenfluss, Fehlerbehandlung, Testansatz.
6. **Spec schreiben und committen** — an einem sinnvollen Projektpfad
   (z. B. `docs/specs/YYYY-MM-DD-<thema>-design.md`), sofern der Nutzer keinen
   anderen Ort vorgibt.
7. **Spec-Selbstprüfung** — mit frischem Blick auf die eigene Spec:
   - Platzhalter-Scan: "TBD", "TODO", unvollständige Abschnitte, vage Anforderungen?
   - Interne Konsistenz: widersprechen sich Abschnitte? Passt Architektur zu Feature-Beschreibung?
   - Umfangsprüfung: passt das in einen einzigen Implementierungsplan, oder muss zerlegt werden?
   - Mehrdeutigkeitsprüfung: lässt sich eine Anforderung zweideutig lesen? Dann festlegen.
   Gefundene Probleme direkt beheben, keine erneute Prüfrunde nötig.
8. **Nutzer prüft die geschriebene Spec** — explizit fragen: "Spec geschrieben
   und committet unter `<Pfad>`. Bitte prüfen, sag Bescheid, falls Änderungen
   nötig sind, bevor wir den Umsetzungsplan schreiben." Auf Antwort warten.
9. **Übergabe an plan** — nach Freigabe. Kein anderer Implementierungsskill
   folgt direkt auf brainstorm.

## Design für Isolation und Klarheit

- System in kleine Einheiten mit je einem klaren Zweck zerlegen, die über
  definierte Schnittstellen kommunizieren und einzeln verständlich/testbar sind.
- Für jede Einheit beantwortbar: Was tut sie? Wie nutzt man sie? Wovon hängt sie ab?
- Kleinere, klar begrenzte Einheiten sind auch für die Umsetzung zuverlässiger —
  wächst eine Datei zu groß, ist das ein Signal für zu viel Verantwortung an
  einer Stelle.

## In bestehenden Codebasen

- Erst Struktur erkunden, dann Änderungen vorschlagen. Bestehenden Mustern folgen.
- Wo bestehender Code die aktuelle Arbeit behindert (zu große Datei, unklare
  Grenzen), gezielte Verbesserungen als Teil des Designs einplanen — nicht als
  unabhängiges Nebenprojekt. Kein unzusammenhängendes Refactoring vorschlagen.

## Kernprinzipien

- Eine Frage nach der anderen, nicht mit Fragenkatalogen erschlagen.
- Multiple-Choice, wo möglich.
- YAGNI konsequent — Unnötiges aus jedem Design streichen.
- Immer Alternativen durchdenken, bevor man sich festlegt.
- Inkrementell validieren: erst Freigabe je Abschnitt, dann weiter.
- Flexibel bleiben — bei Unstimmigkeiten zurückgehen und klären.
