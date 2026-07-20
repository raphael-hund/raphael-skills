# Dispatch — Auftrag an Subagenten

## Pflicht-Felder je Subagent-Auftrag

```
ROLLE:     Leader | Worker | Verifier
MODELL:    fable | opus | sonnet | haiku | sol | terra | luna | kimi   (explizit!)
EFFORT:    standard | medium | high | max                              (explizit!)
AUFGABE:   <ein klar umrissenes Arbeitspaket, ein Output>
INPUT:     <Verweise auf Dateien — nur der Task-Ausschnitt, nicht der ganze Vault (TB2)>
OUTPUT:    <Zielpfad>
GATE:      <welches r-eval-Gate der Output bestehen muss>
TRUST:     untrusted-bis-cross-review | trusted
```

## Effort-Defaults (KLARER-PLAN Kap. 3)

| Modell | Effort |
|---|---|
| Fable / Opus / Sonnet / Haiku | Standard |
| Sol (GPT-5.6) | medium |
| Terra / Luna (GPT-5.6) | max (high) |
| Kimi K3 | high |

## Muster

- **Advisor:** Leader (Fable) nur an 2–3 Checkpoints; dazwischen laufen Worker allein.
- **Assembly-Line:** Recherche → `/clear` → Draft → `/clear` → Polish (Kontext-Hygiene).
- **Adversarial verification / Tournament:** mehrere Worker bauen Varianten, Verifier/Panel
  wählt — für ship-kritische Outputs.
- **Cross-Vendor-Review:** wer baut (z. B. Terra) ist nie wer reviewt (z. B. Sol/Sonnet).

## Delegations-Schwelle

Task in < ~5 Min solo erledigbar → **nicht delegieren** (Orchestrierungs-Aufschlag > Nutzen).
Delegieren lohnt bei Parallelität, Volumen oder nötiger Fremd-Familien-Prüfung.

## Autonomer-Lauf-Kontrakt (5 Teile)

Für lange, unbeaufsichtigte Einzelaufgaben (Migration, Coverage-Lift,
TDD-Feature-Build) statt eines Prosa-Auftrags einen 5-Teile-Kontrakt
schreiben — jeder Teil ist Pflicht:

1. **Objective** — ein Satz, ein konkretes Ergebnis.
2. **Constraints** — was NICHT geändert werden darf (öffentliche API,
   Dateien, Libs, Konventionen).
3. **Validation Command** — der exakte Shell-Befehl, der Fortschritt
   beweist.
4. **Stop Condition** — prüfbar: "Stopp, wenn X grün ist" ODER "wenn
   weitere Änderungen menschliches/Produkt-Urteil brauchen".
5. **Documentation** — ein Satz, der den Agenten zu knapper, gezielter Doku
   für jede Änderung verpflichtet.

**Reward-Hacking explizit verbieten:** "Tests nicht löschen, überspringen
oder abschwächen, um die Stop-Condition zu erreichen" — sonst gamed der
Agent das Ziel. Scope-Creep ebenfalls explizit verbieten ("kein
unabhängiges Refactoring, keine neuen Dependencies").

**Drift-Eskalation, gestaffelt:**
- Klein: Korrektur inline im laufenden Auftrag einfließen lassen.
- Mittel: pausieren, eine engere Fassung des Kontrakts geben.
- Schlimm: abbrechen, `git status`/`git stash`, Kontrakt neu schreiben,
  neu starten.

## Verbote (Regel 11)
`--dangerously-skip-permissions`, `approval_policy=never`, `danger-full-access`,
Auto-Update-Pfade, blockierende PreToolUse-Hooks auf dem unbeaufsichtigten VPS — nie an
Subagenten weitergeben.
