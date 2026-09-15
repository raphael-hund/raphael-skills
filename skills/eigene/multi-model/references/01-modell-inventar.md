# Modell-Inventar

Alle Modelle, die auf diesem VPS wählbar sind: Alias, Picker-ID, Agent, Zustand.
Gemessen 15.09.2026, 06:49 UTC gegen Port 8318.

Die einzige Quelle der Liste ist `/root/tools/raphael_failover_policy.py`
(`DEFAULT_ALIAS_MAP`, `NINE_MOTORS`, `DESKTOP_3P_MOTORS`, `CURSOR_VPS_MOTORS`).
Agent-Frontmatter und die Unit-Umgebung `PICKER_MODELS` sind **Senken**, keine
Quellen. Läuft eine davon auseinander, gilt `raphael_failover_policy.py`.

## 1. Claude-Familie (native IDs, keine Umleitung)

| Anzeigename | ID | Agent | Zustand |
|---|---|---|---|
| Claude Opus 5 | `claude-opus-5` | `opus-builder`, `opus-critic`, `marketing-asset-critic` | liefert |
| Claude Fable 5.1 | `claude-fable-5-1` | `fable-main`, `fable-builder`, `fable-critic` | liefert |
| Claude Fable 5 | `claude-fable-5` | — | liefert |
| Claude Sonnet 5 | `claude-sonnet-5` | `sonnet-worker`, `research-synthesizer` | liefert |
| Claude Haiku 4.5 | `claude-haiku-4-5-20251001` | `haiku-worker`, `web-research` | liefert |

Aliase, die auf dieselben Ziele zeigen: `fable`, `fable-5.1`, `fable-5-1`,
`anthropic/claude-fable-5-1`, `claude-haiku-4-5`.

## 2. GPT-Familie (über Gateway-Alias)

| Anzeigename | Alias | Route | Agent | Zustand |
|---|---|---|---|---|
| GPT 6.0 Astra | `claude-gw-astra-6` | `gpt-6-astra` | `astra-worker`, `astra-critic`, `grok-critic`, `kimi-worker`, `asset-generator`, `browser-operator`, `codex-main` | **liefert**, 5/5 ohne Failover (08:45 UTC) |
| GPT 5.6 Sol | `claude-gw-sol-5.6` | `gpt-5.6-sol` | `sol-worker`, `sol-critic`, `grok-worker` | **liefert**, 3/3 + 5/5 ohne Failover (08:53 UTC) |
| GPT 5.6 Luna | `claude-gw-luna-5.6` | `gpt-5.6-luna` | `luna-worker` | **liefert**, 5/5 ohne Failover (08:53 UTC) |
| GPT 5.6 Terra | `claude-gw-terra-5.6` | `gpt-5.6-terra` | `terra-worker` | **liefert**, 3/3 + 5/5 ohne Failover (08:53 UTC) |

Der Cooldown vom Vormittag (08:00 UTC: Astra 0/13, alle GPT-Lanes →
`claude-opus-5`) hat sich um ~08:45 UTC gelöst. Die fünf geparkten Agenten sind
nach erfüllter Rückholbedingung (fünf Anfragen ohne Failover-Header) zurück in
`~/.claude/agents/`. Die Kollaps-Mechanik bleibt: Bei kühlem GPT-Topf schickt
`FAMILY_COOLING_HOPS` jede GPT-Lane in die Claude-Familie, deshalb zählt ein
GPT-Lauf nur mit `X-Raphael-Upstream-Model`-Beleg aus demselben Lauf (§5, §11
und §12 der Verfügbarkeitsreferenz).

Ursache ist `FAMILY_COOLING_HOPS` in `raphael_failover_policy.py`: der Eintrag
`"gpt": ("claude-opus-5", "claude-sonnet-5")` schickt jede ausgefallene GPT-Lane
in die Claude-Familie. Sol, Luna, Terra und Astra sind laut `model_family()` alle
`"gpt"`, die Lane-Trennung innerhalb der Familie greift also nicht.

Astra hat Effort-Varianten (`-ultra`, `-low`, `-medium`, `-high`, `-xhigh`, `-max`)
und Kurzaliase (`astra`, `astra-ultra`, `gpt-6-astra`, `gpt-6.0-astra`).
Astra läuft fest auf High; die Effort-Zeilen sind Alias-Toleranz, keine Steuerung.

## 3. Übrige Familien

| Anzeigename | Alias | Route | Agent | Zustand |
|---|---|---|---|---|
| Gemini 3.8 Flash | `claude-gw-flash-3.8` | `gemini-3.8-flash` | `gemini-copy-worker`, `gemini-critic` | **liefert stabil**, 3/3 |
| DeepSeek 4.1 Flash | `claude-gw-seek-4.1-flash` | `deepseek-flash` | `deepseek-worker`, `deepseek-critic` | **liefert stabil**, 3/3 |
| Muse Spark 1.3 | `claude-gw-spark-1.3` | `muse-spark-1.3` | `muse-worker`, `muse-critic` | **liefert stabil**, 3/3; fehlt in `/v1/models` und `PICKER_MODELS` |
| Grok 4.6 | `claude-gw-xai-4.6` | `xai/grok-4.6` | — (kein Agent) | **ungeliefert (Cooldown)**, 08:53 UTC: 3/3 → `gpt-5.6-sol` |
| Kimi K3 | `claude-gw-k3` | `kimi-k3` | `kimi-worker` (Kompatibilitätsrolle auf Astra) | **stillgelegt**: Upstream „suspended due to insufficient balance" |

Gemini, DeepSeek und Muse sind die drei stabilen Fremdfamilien. Sie tragen
seit 15.09.2026 je einen eigenen Kritiker; jeder von ihnen wurde gestartet und
lieferte seinen Text-Body. Zusammen sind sie der belastbare Kritik-Pool gegen
einen Claude-Build.

Weitere Aliase ohne Agent: `claude-gw-xai-4.5` → Grok 4.6 (veraltet),
`claude-gw-k27` → `kimi-k2.7-code-highspeed`.

## 4. 1M-Kontext-Varianten

Nur die GPT-Familie hat explizite 1M-Forks: `GPT_1M_FORKS` in
`raphael_failover_policy.py:592-595` bildet `gpt-5.6-sol|luna|terra` auf
`…[1m]` ab. Für Kimi, Gemini und Muse existiert **kein** modellspezifisches
1M-Objekt, nur der generische Suffix-Stripper. Ob der Suffix bei diesen drei
wirkt, ist ungeprüft — nicht darauf verlassen.

Die 1M-Varianten im Picker (`Opus 5 1M`, `Fable 5.1 1M`, `Sonnet 5 1M`,
`GPT 5.6 Sol 1M` usw.) sind Picker-Einträge derselben Modelle mit größerem
Kontextfenster, keine eigenen Modelle.

## 5. Cursor (eigener Namensraum)

Cursor erkennt First-Party-IDs (`claude-opus-5`, `grok-4.6`) aus seiner eigenen
Registry und beantwortet sie mit dem Cursor-Abo statt mit dem Custom-Key. Dafür
gibt es die `vps-*`-IDs (`vps-opus-5`, `vps-astra-6`, `vps-kimi-k3`, …,
`raphael_failover_policy.py:198-213`), die Cursor nicht kennt und die deshalb
am Custom-Endpunkt landen. Vierzehn Stück, einer je Modell. Für Claude-Code-Sessions
ohne Bedeutung.

## 6. Kein Agent — Lückenliste

Diese Modelle sind wählbar, haben aber keinen Agenten:

| Modell | Warum kein Agent |
|---|---|
| Claude Fable 5 | `fable-main`/`fable-builder` decken Fable 5.1 ab; Fable 5 ist Reserve |
| Grok 4.6 | Motor liefert nicht; der Agent zeigt auf Sol statt Grok |
| Kimi K3 | Motor liefert nicht; der Agent zeigt auf Astra statt Kimi |
| Muse Spark 1.3 | Motor liefert, ist aber nicht in `PICKER_MODELS` und hat keinen Agenten |
| `vps-*` (14 IDs) | Cursor-Umgehung, kein Claude-Code-Bedarf |
