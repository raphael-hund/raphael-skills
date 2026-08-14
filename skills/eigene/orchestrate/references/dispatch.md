# Dispatch — Auftrag an Subagenten

## Pflicht-Felder je Subagent-Auftrag

```
ROLLE:      Leader | Worker | Verifier
agentType:  luna-worker | terra-bulk | sol-pruefer | sonnet-worker |
            kimi-worker | kimi-recherche
MODELL:     sonnet | sol | terra | luna | kimi   (nur wenn kein agentType)
EFFORT:     standard | medium | high | max               (explizit!)
HARNESS:    claude-agent | mcp-codex | mcp-kimi | codex-native | kimi-native
AUFGABE:    <ein klar umrissenes Arbeitspaket, ein Output>
INPUT:      <Verweise auf Dateien — nur der Task-Ausschnitt, nicht der ganze Vault (TB2)>
OUTPUT:     <Zielpfad oder Schema>
GATE:       <welches r-eval-Gate / Shell-Befehl der Output bestehen muss>
TRUST:      untrusted-bis-cross-review | trusted
write_set:  <disjunkte Dateiliste bei parallelen Writern>
```

In Claude-Terminal-Sessions **`agentType` bevorzugen** — nur so starten Luna/Sol/
Terra/Kimi über Gateway bzw. MCP. Reines `model:'sonnet'|'opus'` ist ein
Claude-Override und zählt **nicht** als Cross-Model-Flotte.

## Effort-Defaults

| Modell / agentType | Effort |
|---|---|
| Fable / Opus (nur Cockpit, nie Subagent) | high |
| Sonnet | standard (bei Bedarf high) |
| Sol (`sol-pruefer`) | medium–high |
| Terra (`terra-bulk`) | max (high) |
| Luna (`luna-worker`) | max (Gateway `forced_effort`) |
| Kimi K3 (`kimi-worker`/`kimi-recherche`) | high — nie HighSpeed, nie K2.7 |

## Muster

- **Advisor:** Leader (Fable) nur an 2–3 Checkpoints; dazwischen laufen Worker allein.
- **Assembly-Line:** Recherche → `/clear` → Draft → `/clear` → Polish (Kontext-Hygiene).
- **Standard-Flotte (Cross-Model):** `luna-worker` (Mechanik/Tests) + Bau-Worker
  (`sonnet-worker`/`kimi-worker`/`terra-bulk`) + Verifier anderer Familie —
  Zuteilung in `cross-model-harness.md`.
- **Adversarial verification / Tournament:** mehrere Worker bauen Varianten, Verifier/Panel
  wählt — für ship-kritische Outputs.
- **Cross-Vendor-Baustein:** `codex-first` / `kimi-first` für ein natives Fremdpaket;
  Claude reviewt und fährt die Tests selbst. Ersetzt die Flotte nicht.
- **Cross-Model-Review:** wer baut (z. B. Terra/Kimi) ist nie wer reviewt (Sol/Sonnet).

## Delegations-Schwelle

Task in < ~5 Min solo erledigbar → **nicht delegieren** (Orchestrierungs-Aufschlag > Nutzen).
Delegieren lohnt bei Parallelität, Volumen, isolierbaren Luna-Mechanik-Häppchen oder
nötiger Fremd-Familien-Prüfung.

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
