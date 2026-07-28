---
name: eval
version: 0.3.2
description: >
  Feuert für Qualitäts-Gates und Bewertung: eval-run (G1→G2), Judge-Panel,
  rubric-author. Jeder Ship-Output läuft hier durch. Ein Worker behauptet
  nie selbst "fertig" — eine andere Instanz verifiziert per striktem
  Verdikt-Vertrag, jede Einstufung braucht einen konkreten Beleg statt
  einer Vermutung. Trigger: "evaluieren", "Gate fahren", "Judge", "Rubrik
  schreiben", "QA-Score".
class: E
scope: agency
sensitivity: internal
loads: [references/judge-prompts.md, references/rubric-author.md, references/verifikations-vertrag.md]
requires_skills: []
completion_criteria:
  - "G1 deterministisch grün BEVOR ein Judge läuft"
  - "G2-Judge liefert pass/fail + eingefügten Beweis, Schwelle 0.7"
  - "Verifier möglichst andere Modellfamilie (bei Anbieter-Ausfall Ausnahme im Protokoll vermerken); Fable nie Selbstprüfung"
  - "Jedes Verdikt trägt evidence+confidence; keine Severity-Einstufung ohne konkreten Beleg/Angriffspfad"
---

# eval — Gates & Bewertung (G1 → G2)

**Lies zuerst:**
`/root/raphael-command-center/AGENTS.md` (Regeln 8, 14, 18, 19),
`/root/raphael-brain/evals/` (golden/ anti/ holdout/ outcome/),
Rubriken unter `evals/rubrics/` des jeweiligen Repos.

## Zweck (1 Satz)

Objektiv entscheiden, ob ein Output shippt — erst deterministisch (G1), dann Judge (G2) —
ohne dass etwas seine eigene Arbeit prüft.

## eval-run: feste Reihenfolge

1. **G1 deterministisch (ohne LLM) — läuft IMMER zuerst; kein Judge, bevor G1 grün ist.**
   Skripte/Checklisten: impeccable-46 (`npx impeccable detect --json`), Link-/HTML-Check,
   Meta-Policy-Verbotsliste, LLM-ismus-/Passiv-Detektor, Zahlen-Plausibilität. **Exit-Code
   entscheidet.**
2. **Self-Check (Autor selbst, vor Abgabe an den Judge)** — der Autor prüft
   sein eigenes Artefakt einmal gegen dieselbe Rubrik, korrigiert
   offensichtliche Lücken selbst. Zählt NICHT als Verdikt (Autor prüft nie
   sich selbst final, Regel 8) — reduziert nur die Zahl der Judge-Runden,
   die an trivialen Mängeln scheitern. Bei Routine-Artefakten optional,
   bei Ship-kritischem Output Pflicht.
3. **G2 Judge — 0-2-Skala je Rubrik-Frage, gestaffelt:**
   - Rubrik = Ja/Nein-Checkliste, **3–6 Fragen** (mehr wird gegamed), Start-Schwelle **0.7**.
   - Routine-Zwischenartefakte: 1–2 Judges.
   - **Ship-kritischer/roter Kundenoutput: volles Panel aus 3 Modellfamilien** (z. B.
     Sonnet + Sol + Kimi), Median gegen Rubrik, **>20 % Divergenz = Flag an Raphael**,
     1 Regenerierung, dann Eskalation.
   - Am Ship-Pfad wird **jeder** Output gejudgt (kein Sampling); Sampling nur intern.
   - **Abgrenzung:** das Panel judgt EIN Artefakt gegen eine Rubrik. Offene
     Entscheidungsfragen mit mehreren Kandidaten-Antworten gehören ins Council-Muster
     (anonymes Peer-Ranking + Chairman): `orchestrate` → `references/council.md`.
4. **G3 Skill-Regression** — Baseline vs. Held-out, nur wenn ein Skill beteiligt ist.
   Zum aktiven **Verbessern** eines Skills (nicht nur Absichern): Mutations-Loop nach
   Karpathys Autoresearch-Disziplin — erst Baseline messen, dann **genau eine** Änderung
   je Experiment, gleiche Test-Inputs, binäre Evals; Score besser = behalten, gleich
   oder schlechter = **revertieren** (gleich = Komplexität ohne Nutzen). Jedes
   Experiment ins Changelog (Änderung, Hypothese, Ergebnis), Stopp bei Plateau
   (3 Experimente ohne Verbesserung) oder >=95 %. Ausführbarer Loop: Skill
   `autoresearch` (`~/.claude/skills/autoresearch`). Nicht auf die Test-Inputs
   overfitten — bestehen alle Evals ohne echte Qualitätsverbesserung, sind die
   Evals schlecht, nicht der Skill gut.
5. **G4 Outcome** — echte CTR/CPL/CVR/Rankings korrigieren Rubriken rückwirkend;
   "Judge liebte es, Markt floppte" → permanentes Anti-Beispiel (`evals/anti/`).

## Judge-Skala (0-2 je Frage)

`0 = fehlt/falsch · 1 = teilweise/mit Mängeln · 2 = erfüllt mit Beleg`.
Score = Summe ÷ Maximum. Schwelle 0.7. Judge sieht **nur den Chat** → `completion_criteria`
verlangen eingefügten Beweis ("pasted proof").

## DoneClaim / AdversarialVerify — Verdikt-Vertrag

Jede "fertig"-Meldung eines Workers ist vorläufig (**DoneClaim**), nie
Wahrheit. Eine **andere** Kontextinstanz muss sie prüfen und liefert ein
striktes Verdikt zurück:

```
verdict:    confirmed | false-positive | needs-fix | needs-human-review
evidence:   <Datei:Zeile, Log-Ausschnitt, Diff — nicht "sieht gut aus">
repro:      <Befehl/Schritt, der den Zustand reproduziert>
confidence: HIGH | MED | LOW
```

Ohne `evidence` kein Verdikt — eine Behauptung ohne Beleg zählt nicht.
**Keine Severity ohne Angriffspfad:** eine Einstufung als kritisch/hoch
braucht konkrete Voraussetzungen, unter denen der Fund tatsächlich auftritt
(nicht nur "könnte theoretisch"), sonst auf niedriger einstufen oder als
`needs-human-review` markieren statt aufzublähen.

## Verifikations-Vertrag (Verified nur mit Beweis)

Bei jedem "fertig"/"verifiziert"-Anspruch (Runden-Abschluss, Close, Waiver, Retry-Cap/Eskalation): `references/verifikations-vertrag.md` — destilliertes agent-harness-Prinzip, auf G1/G2 und ultra-loop-Runden gemappt.

## rubric-author

Rubriken schreiben: 3–6 binäre, überprüfbare Ja/Nein-Fragen mit Beweis-Anker. Detail in
`references/rubric-author.md`.

## Gotchas

- **Judge-Prompts: "pass/fail + eingefügter Beweis", NIE "erkläre dein Denken"/"show your
  work".** Löst bei Fable die `reasoning_extraction`-Refusal aus → stiller Opus-Fallback
  (Regel 19). Prompt-Vorlagen in `references/judge-prompts.md`.
- **Verifier = möglichst andere Modellfamilie, frische Session.** Fable prüft nie Fable (Regel 8).
  Seit 25.07.2026 Empfehlung statt hartes Gate (Anbieter-Ausfälle): geht keine Fremd-Familie,
  Ausnahme im Protokoll vermerken — siehe ultra-loop/SKILL.md "Flotten-Wahl ist frei".
- **G1 vor G2, immer.** Kein Judge auf einem Output, der die deterministischen Checks nicht
  besteht — Judge-Tokens sind teuer und die Antwort steht schon fest.
- Mehr als 6 Rubrik-Fragen werden gegamed — kurz halten.
- **Veto vor Aggregat.** Die harte Ship-Bedingung (`[VETO]`) wird pro Achse eigenständig
  geschwellt: Riss dort ⇒ Gesamt-FAIL, egal ob die Summe ≥ 0.7 liegt. Detail in
  `references/rubric-author.md` / `judge-prompts.md` (Idee aus Inspect-AI `multiple-scorers`, MIT).
- "Fertig" ist Environment-Tatsache (Exit-Code/Gate), der Agent setzt sich nie selbst auf
  "passing" (Regel 14).
