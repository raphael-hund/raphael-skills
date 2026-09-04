# Dispatch — Auftrag an Subagenten

## Pflicht-Felder je Subagent-Auftrag

```
ROLLE:      Leader | Worker | Verifier
agentType:  fable-builder | opus-builder | opus-critic | sol-builder | sol-pruefer |
            grok-worker | grok-critic | visual-kritiker | luna-worker | terra-bulk
            (kimi-* tot, Raphael 03.09.2026)
MODELL:     opus | sol | terra | luna | kimi   (nur wenn kein agentType)
EFFORT:     standard | medium | high | max               (explizit!)
HARNESS:    claude-agent | mcp-codex | mcp-kimi | codex-native | kimi-native
AUFGABE:    <ein klar umrissenes Arbeitspaket, ein Output>
INPUT:      <Verweise auf Dateien — nur der Task-Ausschnitt, nicht der ganze Vault (TB2)>
OUTPUT:     <Zielpfad oder Schema>
GATE:       <welches r-eval-Gate / Shell-Befehl der Output bestehen muss>
TRUST:      untrusted-bis-cross-review | trusted
PROVENIENZ: (nur Kritiker/Judge) erste Prompt-Zeile
            ACTUAL_BUILDER_FAMILY=<Familie> (agentType <x>, Workflow <id>, Failover ja/nein)
            — fehlt sie, blockiert visual-kritiker/opus-critic fail-closed
write_set:  <disjunkte Dateiliste bei parallelen Writern>
```

In Claude-Terminal-Sessions **`agentType` bevorzugen** — nur so starten Luna/Sol/
Terra/Kimi über Gateway bzw. MCP. Reines `model:'sonnet'|'opus'` ist ein
Claude-Override und zählt **nicht** als Cross-Model-Flotte.

## Effort-Defaults

| Modell / agentType | Effort |
|---|---|
| Fable (`fable-builder`) | high — nie xhigh/max (denkt sonst das Deliverable doppelt); max zwei parallel |
| Opus (`opus-builder` / `opus-critic`) | high |
| Sol (`sol-builder` / `sol-pruefer`) | max |
| Terra (`terra-bulk`) | max |
| Luna (`luna-worker`) | max |
| Kimi K3 (`kimi-worker` / `kimi-recherche` / `kimi-critic`) | high — nie HighSpeed, nie K2.7 |
| Grok (`grok-worker` / `grok-critic` / `visual-kritiker`) | high |

## Builder → Kritiker (genau einer)

**Ein Bedeutungsort:** Diese beiden Profil-Tabellen sind die einzige
Builder→Kritiker-Quelle des Skills. Welches Profil gilt, steht in
`/root/.claude/fleet-profile` (fehlt die Datei: `multi-family`).

### Profil `claude-only`

Nur Opus, Sonnet und Haiku sind als Subagent verfügbar; Kimi/Grok/Sol/Luna/
Terra werden vom Proxy auf Fable umgeleitet und zählen als `BLOCKED`. Statt
Fremdfamilie gilt **Instanz-Trennung**: der Kritiker ist eine frische
Sonnet-Instanz, die nur Artefakte sieht (Screenshots, Diffs, `PRUEFGEGEN.md`),
nie den Build-Verlauf. Das ist eine ausdrücklich **schwächere** Garantie als
Fremdfamilie, keine Äquivalenz — jedes Review trägt sichtbar das Label
`claude-only, Instanz-Trennung`. Deterministische Gates (`detect.mjs`,
`scan-ai-slop`, `onpage-check`, `craft-check`, `axe`, `g1-gate`, Copywriting
G0/G1) sind hier nicht Beleg, sondern Urteil.

| Builder | Kritiker | Hinweis |
|---|---|---|
| Opus-Frontend | Sonnet, read-only | Label Pflicht; visuelles Urteil am Shot |
| Opus-Backend | Sonnet, read-only | Label Pflicht; Gates gehen vor Prosa |
| Opus-Copy-Leaf | Sonnet-Judge G2 | G0/G1 laufen im Copy-Leaf selbst |
| Haiku-Masse | Sonnet, read-only | Haiku urteilt nie, auch nicht über sich |
| Opus → Opus | — | Self-Review, `BLOCKED` |

Copy schreibt ein eigener Opus-Copy-Leaf, nie der Integrator-Leaf.

### Profil `multi-family`

Luna/Sol/Terra zählen als GPT. Self-Review ist `BLOCKED`.

| Builder | Default-Kritiker | Alternative |
|---|---|---|
| `fable-builder` | `sol-pruefer` (Text/Code), `visual-kritiker` (Shot) | `grok-critic`; Fremd-Gateway tot → `opus-critic` mit Label `Instanz-Trennung, gleiche Familie` |
| `opus-builder` | `sol-pruefer` | `grok-critic`; visuell `visual-kritiker` (Kimi tot) |
| `sol-builder` | `opus-critic` | `grok-critic`, `kimi-critic` |
| `terra-bulk` | `opus-critic` | `grok-critic`, `kimi-critic` |
| `luna-worker` | `opus-critic` | `grok-critic` |
| `kimi-worker` | `sol-pruefer` | `opus-critic`, `grok-critic` |
| `grok-worker` | `sol-pruefer` | `opus-critic`, `kimi-critic` |

`visual-kritiker` ist der visuelle Gate-Kritiker nach jedem Nicht-Grok-Build.
Nach einem Grok-Build prüft `opus-critic` oder `sol-pruefer` auch das Bild.

## Muster

- **Advisor:** Leader (Opus-Cockpit) nur an 2–3 Checkpoints; dazwischen laufen Worker allein.
- **Assembly-Line:** Recherche → `/clear` → Draft → `/clear` → Polish (Kontext-Hygiene).
- **Standard-Flotte (Cross-Model):** Dynamic Workflow mit `opus-builder` /
  `sol-builder` / `kimi-worker` / `grok-worker`, `luna-worker` nur für Masse,
  Verifier anderer Familie (`sol-pruefer` / `opus-critic` / `grok-critic` /
  `kimi-critic` / `visual-kritiker`).
  Zuteilung in `cross-model-harness.md`.
- **Adversarial verification / Tournament:** mehrere Worker bauen Varianten, Verifier/Panel
  wählt — für ship-kritische Outputs.
- **Cross-Vendor-Baustein:** `codex-first` / `kimi-first` für ein natives Fremdpaket;
  Claude reviewt und fährt die Tests selbst. Ersetzt die Flotte nicht.
- **Cross-Model-Review:** wer baut (z. B. Terra/Kimi) ist nie wer reviewt (Sol/Opus).

## Delegations-Schwelle

Nur eine zusammenhängende Mini-Änderung ohne isolierbare Teile bleibt SOLO.
Alles andere delegieren: >1 Paket, Website-Seite, Screenshot/ visuelles QA,
Foto-Serie, Masse, oder nötige Fremd-Familien-Prüfung. Default ist Dynamic
Workflow plus Tasks, nicht „erst fünf Minuten selbst machen“.

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
