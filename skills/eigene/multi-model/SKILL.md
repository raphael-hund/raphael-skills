---
name: multi-model
version: 2.0.0
class: O
scope: agency
sensitivity: internal
description: |
  Multi-Modell-Subagenten auf diesem VPS: welche Modelle es gibt, welcher Agent
  sie anspricht, welches Modell für welchen Job, und wie die gelieferte Familie
  gemessen wird. Trigger: "Multi-Modell", "Subagent mit anderem Modell",
  "Grok/Kimi/Sol/Terra/Luna/Astra als Subagent", "Worker aufsetzen", "Review
  durch zweites Modell", "Modell-Orchestrierung", "Modellliste", "welches Modell".
completion_criteria:
  - "Gewaehltes Modell und Route (Agent-Typ oder cli-worker) sind benannt und zum Job-Pool passend"
  - "Jeder Fremdfamilien-Alias ist vor dem Fan-out auf X-Raphael-Upstream-Model geprueft; ein Familienwechsel gilt als ungeliefert"
  - "Kein Modell hat allein die eigene Arbeit geprueft; mindestens ein zweiter Motor aus dem Kritik-Pool war beteiligt"
---

# Multi-Modell-Subagenten

Root entscheidet. Pools statt Pflicht-Paare. Stand 15.09.2026.

Drei Dateien tragen die Modelllogik, jede mit einer Aufgabe:

| Datei | Aufgabe |
|---|---|
| `references/01-modell-inventar.md` | Was existiert: Alias, Picker-ID, Agent, Ist-Zustand |
| `references/02-routing-matrix.md` | Was gewählt wird: Job → Kandidaten, Kosten, Privatsphäre |
| `references/03-verfuegbarkeit.md` | Was tatsächlich liefert: Preflight, Failover, Provenienz |

Die Matrix ist eine **weiche Empfehlung**, keine Exklusivrolle. Kosten, Latenz,
Kontingent, Verfügbarkeit, Datenklasse und Task-Fit verschieben das Ranking.
Was zählt, ist die **gelieferte** Familie, gemessen am Gateway-Header
`X-Raphael-Upstream-Model` — nie der Agent-Name, nie `message.model` aus dem
Transkript (das trägt den *angefragten* Alias, s. `references/03-verfuegbarkeit.md` §5).

## 1. Der eine Vertrag, der alles andere schlägt

Ein Modell-Alias gilt erst als **lieferbar**, wenn `X-Raphael-Upstream-Model`
dem angefragten Modell entspricht. Weicht es ab, ist der Alias für diese Aufgabe
**ungeliefert** — auch wenn HTTP 200 zurückkommt.

```
FAILOVER: xai/grok-4.6 → gpt-5.6-sol      → Grok ist NICHT geliefert
```

Das Gateway schreibt den Wechsel sichtbar in den Body und in den Header. Ein
stiller Wechsel ist ein Gateway-Fehler, kein Erfolg. Vor jedem bezahlten Fan-out
läuft die Probe aus `references/03-verfuegbarkeit.md`.

## 2. Was heute liefert (Messung 15.09.2026, 08:45–08:53 UTC)

| Modell | Alias | Zustand | gemessen |
|---|---|---|---|
| Claude Opus 5 / Fable 5.1 / Fable 5 / Sonnet 5 / Haiku 4.5 | native IDs | **liefert** live | `/v1/models` |
| GPT 6.0 Astra | `claude-gw-astra-6` | **liefert** | 5/5 `gpt-6-astra`, kein Failover |
| GPT 5.6 Sol | `claude-gw-sol-5.6` | **liefert** | 3/3 + 5/5 `gpt-5.6-sol`, kein Failover |
| GPT 5.6 Luna | `claude-gw-luna-5.6` | **liefert** | 5/5 `gpt-5.6-luna`; Erstreihe 1× → Terra |
| GPT 5.6 Terra | `claude-gw-terra-5.6` | **liefert** | 3/3 + 5/5 `gpt-5.6-terra`, kein Failover |
| Gemini 3.8 Flash | `claude-gw-flash-3.8` | **liefert stabil** | 3/3 `gemini-3.8-flash`, kein Failover |
| DeepSeek 4.1 Flash | `claude-gw-seek-4.1-flash` | **liefert stabil** | 3/3 `deepseek-flash`, kein Failover |
| Muse Spark 1.3 | `claude-gw-spark-1.3` | **liefert stabil**, nicht im Picker | 3/3 `muse-spark-1.3` |
| Grok 4.6 | `claude-gw-xai-4.6` | **ungeliefert (Cooldown)** | 3/3 → `gpt-5.6-sol` (FAILOVER); Upstream: 429 "cooling down" |
| Kimi K3 | `claude-gw-k3` | **stillgelegt** | 429 / → `claude-opus-5`; Upstream: "suspended due to insufficient balance" |

Der GPT-Cooldown vom Vormittag (08:00 UTC: Astra 0/13) hat sich um ~08:45 UTC
gelöst; die Rückholbedingung (fünf Anfragen ohne Failover-Header) ist für
Astra, Sol, Luna und Terra erfüllt. Die fünf geparkten Agenten (`sol-worker`,
`sol-critic`, `luna-worker`, `terra-worker`, `grok-worker`) sind zurück in
`~/.claude/agents/`. Grok bleibt Cooldown (Probe wiederholen, kein Agent zeigt
auf die Lane); Kimi ist beim Anbieter kontogesperrt — das ist die
`suspended`-Kategorie, kein Wartezustand.

**Mechanik der Kollapse (bleibt gültig):** `FAMILY_COOLING_HOPS` in
`raphael_failover_policy.py` schickt bei kühlem GPT-Topf **jede** GPT-Lane in
die Claude-Familie (`"gpt": ("claude-opus-5", "claude-sonnet-5")`); Sol, Luna,
Terra und Astra sind laut `model_family()` eine Familie und kollabieren
gemeinsam. Ein GPT-PASS braucht deshalb immer den Header-Beleg desselben Laufs.
Details, Messhistorie und Prüfbefehle: `references/03-verfuegbarkeit.md` §9–§12.

## 3. Kritik-Regel

Nach jedem Bau **genau ein** Kritiker aus einer anderen Familie als der Builder,
`effort: high`. Vor Auslieferung **genau eine** Abnahme. Zweiter Kritiker oder
`xhigh` nur nach einem FAIL.

Der Kritik-Pool folgt der **gemessenen** Verfügbarkeit aus §2, nicht einer
Stufen-Tabelle. Stand 15.09.2026, 08:53 UTC liefern fremd: `gemini-critic`,
`deepseek-critic`, `muse-critic` (stabil seit dem Vormittag) sowie wieder die
GPT-Kritiker `astra-critic`, `grok-critic` (beide Astra) und `sol-critic` —
der GPT-Cooldown hat sich gelöst, die Rückholprobe lief je 5/5 ohne Failover.

Ein GPT-Kritiker zählt nur, wenn der `X-Raphael-Upstream-Model`-Header
**desselben Laufs** die GPT-Familie zeigt. Zeigt er `claude-opus-5`, ist der
Lauf Eigenkritik und der PASS ungültig, egal welcher Agentenname ihn gestartet
hat. Die Cooldown-Meldung ist ein Wartezustand — die Probe aus §2 in ≤ 1 h
wiederholen, nicht den Agenten parken.

Gleiche Familie nur als gekennzeichnete Instanz-Trennung (Fable prüft Opus, Opus
prüft Fable), nie Opus nach Opus.

**Ein PASS ist nur ein Fremdfamilien-PASS, wenn auch die Familie des vorangegangenen
Kritikers verschieden war.** Sonst ist es ein Parent-Check und die Kritik wird
nachgeholt.

Sind alle Fremdfamilien kollabiert, gilt eine gekennzeichnete Instanz-Trennung als
gültige Kritik; der `familien.json`-Beleg kommt ins Entscheidungslog, die Fremdkritik
wird nachgeholt, sobald eine Fremdfamilie liefert **und** das Artefakt sich seither
geändert hat.

## 4. Agent-Namen sind keine Modelle

Ein Agent, dessen Dateiname eine Familie nennt, muss im `model:`-Feld dieselbe
Familie tragen. Drei Kompatibilitätsrollen verletzen das weiterhin, weil der
namensgebende Anbieter abgeschaltet ist:

| Agent | Name sagt | `model:` fährt | Familie |
|---|---|---|---|
| `kimi-worker` | Kimi | `claude-gw-astra-6` | GPT |
| `kimi-critic` | Kimi | `claude-opus-5` | Claude |
| `grok-critic` | Grok | `claude-gw-astra-6` | GPT |

Wer `kimi-critic` nach einem GPT-Build einsetzt, bekommt eine Claude-Kritik, die die
Formalprüfung besteht und keine Kimi-Kritik ist. Die Beschreibungen dieser drei
Dateien sagen das offen; `kimi-critic` trägt zusätzlich `[UNVOLLSTAENDIG]`, weil
der ursprüngliche Vertrag nur halb gerettet werden konnte.

Für die drei stabilen Fremdfamilien existieren seit 15.09.2026 eigene Kritiker:
`gemini-critic`, `deepseek-critic`, `muse-critic`. Sie sind der belastbare Teil
des Kritik-Pools.

Die Korrektur der Zuordnung steht in `references/02-routing-matrix.md`, Abschnitt 5.

## 5. Route A oder Route B

**Route A — Agent-Tool (`~/.claude/agents/`).** Standard für kurze bis mittlere
Pakete, Fan-out über mehrere Modelle, Reviews. Fremdmodelle nur über den
Agent-Typ; das `model:`-Feld des Agent-Tools kennt sie nicht. Claude-Modelle
(`sonnet`, `opus`, `haiku`, `fable`) laufen über `model:`.

**Route B — `cli-worker`.** Lange, schreibende Pakete mit eigener Provider-CLI,
persistenter Session und `result.json`:

```bash
/root/.local/bin/cli-worker run <codex|kimi|claude> --cwd /abs/pfad \
  --task-file /abs/task.txt [--model <id>] [--effort high|max] \
  [--write] [--input /abs/referenz]
```

**Parallelität:** Das Gateway bearbeitet 48 Anfragen gleichzeitig
(`FAILOVER_MAX_CONCURRENCY=48`, `FAILOVER_MAX_QUEUE=64`); `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS`
steht auf 12. Mehr Pakete werden in Wellen geplant.

## 6. Paketformat

Jedes Paket nennt Ziel, Eingaben, `write_set`, Prüfbefehl, Stop-Bedingung und
Rückgabeformat. Reviews zusätzlich `ACTUAL_BUILDER_FAMILY`.

**Pflichtzeile am Anfang jedes Leaf-Auftrags:** „Du bist ein Leaf. Du startest
keine Subagenten; ein Agent-Aufruf sperrt alle Werkzeuge." Die Root-Regel
„Massen-Read an Stufe 3" gilt für den Leaf nicht, weil er die Stufe ist. Nenne
die Lesewege (`grep -n`, `sed -n`), damit der Leaf keinen Grund sieht zu delegieren.

Zurück kommt: erste Zeile `ANGEFRAGTES MODELL: <Name>`, dann geänderte Dateien
oder Ergebnis, jeder Fund mit Datei:Zeile, Gate-Ausgang, offene Lücke. Maximal
eine Seite, keine PNGs, kein Base64. Die Selbstauskunft ist **Indiz, nie Beleg**.

## 7. Parallel schreibende Leaves

Parallele Schreiber laufen mit `isolation: "worktree"`; jeder Leaf bekommt einen
eigenen Worktree unter `.claude/worktrees/` und einen eigenen Branch. `/root` ist
dafür ein leeres Repository (`.gitignore` ignoriert alles), `worktree.baseRef`
steht auf `head`, weil es kein `origin` gibt. Ohne Isolation gilt: disjunkte
`write_set`s und ein Integrations-Owner je gemeinsamer Datei.

**Dynamic Workflows** im `multi-family`-Profil binden jeden Leaf per globalem
`agentType` und enthalten mindestens zwei Modellfamilien. Der `agentType` steht
wörtlich an jedem `agent()`-Aufruf, nie aus einer Variablen. `isolation` vererbt
sich nicht und gehört an jeden einzelnen Aufruf. Das Arbeitsverzeichnis wird vor
dem Fan-out festgelegt und nicht gewechselt.

## 8. Effort

`high` ist Standard. `xhigh`/`max` nur nach FAIL oder für den finalen Build vor
Auslieferung. Kimi: `low|high|max`. Astra läuft fest auf High.
