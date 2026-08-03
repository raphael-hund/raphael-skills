<!-- source: vendored from mattpocock/skills skills/engineering/to-spec @ 9603c1cc — konsolidiert in plan 1.0.0 am 03.08.2026 -->

# to-spec — Gespräch zur Spec verdichten

## Zweck (1 Satz)

Aus dem, was im Gespräch und im Code bereits geklärt ist, eine PRD-Spec bauen — ohne den
User erneut zu interviewen (dafür ist `grill` da).

## Ablauf

1. Codebase-Stand verstehen (falls noch nicht geschehen) — Domänen-Vokabular des Projekts
   und bestehende ADRs im betroffenen Bereich respektieren.
2. Test-Seams skizzieren: an welcher Stelle wird das Feature verifiziert? Bestehende Seams
   bevorzugen, so wenige neue wie möglich — Idealfall ist genau eine. Mit dem User
   gegenchecken, ob die Seams seinen Erwartungen entsprechen.
3. Spec nach der Vorlage unten schreiben und dort ablegen, wo das Projekt Specs bereits
   sammelt (bestehende Konvention nutzen; sonst sinnvollen Ort wählen und benennen).

## Spec-Vorlage

- **Problem Statement** — das Problem aus Sicht des Nutzers.
- **Solution** — die Lösung aus Sicht des Nutzers.
- **User Stories** — lange, nummerierte Liste im Format "Als \<Rolle\> will ich \<Feature\>,
  damit \<Nutzen\>", so vollständig wie möglich.
- **Implementation Decisions** — betroffene Module/Interfaces, technische Klärungen,
  Architektur-/Schema-/API-Entscheidungen. Keine Datei-Pfade oder Code-Schnipsel — Ausnahme:
  ein Prototyp-Schnipsel, der eine Entscheidung präziser kodiert als Prosa (State Machine,
  Reducer, Schema), kurz als Prototyp-Herkunft markiert.
- **Testing Decisions** — was einen guten Test ausmacht (nur äußeres Verhalten, keine
  Implementierungsdetails), welche Module getestet werden, Vorbilder aus dem bestehenden Code.
- **Out of Scope** — was bewusst nicht Teil dieser Spec ist.
- **Further Notes** — alles Weitere.

## Gotchas

- Interviewen ist NICHT der Job dieses Skills — dafür `grill` nutzen, davor oder separat.
- Datei-Pfade/Code-Schnipsel veralten schnell — nur die Ausnahme für entscheidungsdichte
  Prototyp-Fragmente nutzen, nie als Doku-Ersatz.
- Ohne Seam-Abgleich mit dem User keine Spec veröffentlichen — sonst wird an der falschen
  Stelle getestet.
