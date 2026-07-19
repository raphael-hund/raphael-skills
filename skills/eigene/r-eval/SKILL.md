---
name: r-eval
version: 0.1.0
description: >
  Feuert für Qualitäts-Gates und Bewertung: eval-run (G1→G2), Judge-Panel,
  rubric-author. Jeder Ship-Output läuft hier durch. Trigger: "evaluieren",
  "Gate fahren", "Judge", "Rubrik schreiben", "QA-Score".
class: E
scope: agency
sensitivity: internal
loads: [references/judge-prompts.md, references/rubric-author.md]
requires_skills: []
completion_criteria:
  - "G1 deterministisch grün BEVOR ein Judge läuft"
  - "G2-Judge liefert pass/fail + eingefügten Beweis, Schwelle 0.7"
  - "Verifier nie aus der Autor-Familie; Fable nie Selbstprüfung"
---

# r-eval — Gates & Bewertung (G1 → G2)

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
2. **G2 Judge — 0-2-Skala je Rubrik-Frage, gestaffelt:**
   - Rubrik = Ja/Nein-Checkliste, **3–6 Fragen** (mehr wird gegamed), Start-Schwelle **0.7**.
   - Routine-Zwischenartefakte: 1–2 Judges.
   - **Ship-kritischer/roter Kundenoutput: volles Panel aus 3 Modellfamilien** (z. B.
     Sonnet + Sol + Kimi), Median gegen Rubrik, **>20 % Divergenz = Flag an Raphael**,
     1 Regenerierung, dann Eskalation.
   - Am Ship-Pfad wird **jeder** Output gejudgt (kein Sampling); Sampling nur intern.
3. **G3 Skill-Regression** — Baseline vs. Held-out, nur wenn ein Skill beteiligt ist.
4. **G4 Outcome** — echte CTR/CPL/CVR/Rankings korrigieren Rubriken rückwirkend;
   "Judge liebte es, Markt floppte" → permanentes Anti-Beispiel (`evals/anti/`).

## Judge-Skala (0-2 je Frage)

`0 = fehlt/falsch · 1 = teilweise/mit Mängeln · 2 = erfüllt mit Beleg`.
Score = Summe ÷ Maximum. Schwelle 0.7. Judge sieht **nur den Chat** → `completion_criteria`
verlangen eingefügten Beweis ("pasted proof").

## rubric-author

Rubriken schreiben: 3–6 binäre, überprüfbare Ja/Nein-Fragen mit Beweis-Anker. Detail in
`references/rubric-author.md`.

## Gotchas

- **Judge-Prompts: "pass/fail + eingefügter Beweis", NIE "erkläre dein Denken"/"show your
  work".** Löst bei Fable die `reasoning_extraction`-Refusal aus → stiller Opus-Fallback
  (Regel 19). Prompt-Vorlagen in `references/judge-prompts.md`.
- **Verifier = andere Modellfamilie, frische Session.** Fable prüft nie Fable (Regel 8).
- **G1 vor G2, immer.** Kein Judge auf einem Output, der die deterministischen Checks nicht
  besteht — Judge-Tokens sind teuer und die Antwort steht schon fest.
- Mehr als 6 Rubrik-Fragen werden gegamed — kurz halten.
- "Fertig" ist Environment-Tatsache (Exit-Code/Gate), der Agent setzt sich nie selbst auf
  "passing" (Regel 14).
