# Verfügbarkeit und Provenienz

Wie vor einem Fan-out gemessen wird, was tatsächlich liefert — und wie nach
einem Lauf belegt wird, welche Familie geliefert hat.

## 1. Der Grundsatz

Ein Alias gilt erst als lieferbar, wenn `X-Raphael-Upstream-Model` dem
angefragten Modell entspricht. HTTP 200 genügt nicht. Das Gateway schreibt einen
Familienwechsel sichtbar:

```
HTTP/1.1 200 OK
X-Raphael-Upstream-Model: gpt-5.6-sol
X-Raphael-Model-Failover: xai/grok-4.6 -> gpt-5.6-sol
```

Body und Header widersprechen sich nicht: Der Body beginnt mit einer
`⚠️ FAILOVER:`-Zeile. Wer nur den Statuscode liest, hält einen Sol-Lauf für
einen Grok-Lauf.

Verglichen wird das **Modell**, nicht die Familie. Fable und Opus sind beide
Claude, haben aber getrennte Kontingenttöpfe. Eine Prüfung auf Familienebene
meldet Fable als "direkt", während das Gateway Opus liefert und der Fable-Topf
zu 100 % verbraucht ist.

## 2. Probe je Alias

```bash
K=/root/.cli-proxy-api/api-key.txt
curl -s -D - -o /tmp/probe.json --max-time 90 \
  -X POST http://127.0.0.1:8318/v1/messages \
  -H "content-type: application/json" -H "anthropic-version: 2023-06-01" \
  -H "x-api-key: $(cat $K)" \
  -d '{"model":"claude-gw-astra-6","max_tokens":8,
       "messages":[{"role":"user","content":"ping"}]}' \
  | grep -iE "^HTTP|x-raphael"
```

Erwartet: `HTTP/1.1 200`, `X-Raphael-Upstream-Model: gpt-6-astra`, **kein**
`X-Raphael-Model-Failover`. Jede Failover-Zeile bedeutet: ungeliefert.

Der Endpunkt ist `http://127.0.0.1:8318` (Loopback). Die Tailscale-Adresse
`http://100.79.22.77:8318` ist derselbe Dienst; die Preflight-Warnung, eine
lokale Session erreiche das Gateway nicht, ist für Loopback nachweislich falsch
(Observations 0012, 0014).

## 3. Frischer Preflight (familienweise)

**Dieses Werkzeug existiert derzeit nicht** (Obs 0264). Der Abschnitt bleibt als
Sollzustand stehen; die ausführbare Probe ist §2 je Alias, ein `curl`-Aufruf
ohne Abhängigkeit.

```bash
python3 /root/tools/harness-v2/preflight-familien.py --cache-minuten 0
```

Ausgabe je Familie: `LIEFERBAR` oder `TOT/UMGELEITET`, mit Alias und Grund.
Exit 0 bei genug Familien, Exit 2 wenn kein Alias das Gateway erreicht.
Cache: `--cache-minuten 15` für Folgeaufrufe. Ein alter grüner Snapshot ist
kein Nachweis — `familien.json` trägt `geprueft`, das Alter zählt.

Das Werkzeug prüft **Familien**, nicht Modelle. `LIEFERBAR gpt` sagt nicht,
ob Astra, Sol, Luna und Terra alle einzeln liefern. Für modellgenaue Prüfung
die Probe aus §2 je Alias, oder `references/../scripts/` (Abschnitt 6).

## 4. Kontingent nicht mit Erreichbarkeit verwechseln

```bash
curl -s http://127.0.0.1:8390/zustand.json | head -60
curl -s http://127.0.0.1:8390/usage.json  | head -80
```

`zustand.json` zeigt Kopfzeile und Sitze (`frei_prozent`, `reset_text`).
Gemessen 15.09.2026: `GPT 4/5 · FB 1/6 · CL 2/6 · Grok 2/2`.

**Zwei Messungen, die sich widersprechen, sind ein Befund, kein Ranking.**
Am 15.09. meldet `zustand.json` beide xAI-Sitze mit 100 % frei, während der
Upstream `429 "All credentials for model xai/grok-4.6 are cooling down"`
antwortet. Guthaben ist nicht Erreichbarkeit (Observation 0301). Bei Widerspruch
gilt der Alias als ungeliefert und der Widerspruch wird gemeldet.

429/403/402 werden am Fehlerkörper dreigeteilt:

| Körper | Behandlung |
|---|---|
| "cooling down", "all credentials" | warten (Cooldown < 1h) |
| Kontingent, "insufficient quota" | umrouten |
| "suspended", "insufficient balance", Auth | reparieren oder Agent stilllegen |

## 5. Provenienz nach dem Lauf

Nie aus Agent-Typ, Selbstauskunft oder Notification-Text. Zwei zulässige Quellen:

1. **Gateway-Header der Anfrage, die diesen Lauf gespeist hat** —
   `X-Raphael-Upstream-Model` sagt, welches Modell geantwortet hat;
   `X-Raphael-Model-Failover` sagt, warum es nicht das angefragte war. Der
   Header ist die einzige direkte Aussage über die Lieferung.
2. **Der Lauf selbst an der Quelle.** Für einen Agenten heißt das: denselben
   Alias vor dem Spawn einmal per `curl` prüfen (Prüfbefehl in §10) und den
   Header lesen.

**`message.model` im JSONL ist kein Beleg.** Am 15.09.2026 an vier frisch
gestarteten Fremdfamilien-Agenten gemessen: Das Transkript trug in allen Fällen
den **angefragten Alias**, nicht das gelieferte Modell.

```
gemini-critic   -> message.model: claude-gw-flash-3.8      (3/3 Header: gemini)
deepseek-critic -> message.model: claude-gw-seek-4.1-flash (3/3 Header: deepseek)
muse-critic     -> message.model: claude-gw-spark-1.3      (3/3 Header: muse)
astra-worker    -> message.model: claude-gw-astra-6        (2/3 Header: astra)
```

Der letzte Fall ist der Beweis: Im selben Messfenster lieferte `astra-worker`
nachweislich einmal `claude-opus-5`, sein Transkript zeigt trotzdem durchgehend
`claude-gw-astra-6`. Eine Prüfung auf `message.model` hätte diesen Kollaps als
sauberen Astra-Lauf gemeldet. Die Regel „`message.model` ist die Wahrheit" war
falsch und ist hiermit ersetzt.

**Die beiden Agenten, die sich selbst als Claude meldeten, sind kein
Gegenbeweis.** `deepseek-critic` und `muse-worker` schrieben auf die Frage nach
ihrer Familie „Claude"/„Anthropic", weil sie ihre eigene Systembeschreibung
lesen, nicht ihr Modell. Das ist genau die Selbstauskunft, die als Beleg
ausscheidet — und der Grund, warum die Frage nicht dem Agenten gestellt wird,
sondern dem Gateway.

Die Zeile `ANGEFRAGTES MODELL` bleibt Pflicht, aber nur als Kreuzprobe. Sie ist
Indiz, nie Beleg (Observation 0109).

Im Workflow-Modus liest der Parent den Header der Leaf-Anfrage, bevor der Leaf
schreiben darf. Bei blockierenden Agent-Calls ist es eine Post-hoc-Prüfung:
Dateien eines familienfalschen Leafs zählen nicht als Draft.

## 6. Modellgenaue Verfügbarkeitsliste

`scripts/modell-verfuegbarkeit.py` prüft **jeden** relevanten Alias einzeln und
schreibt je Modell `requested`, `delivered`, `family`, `failover_header`, `status`.
Damit ist die Lücke zwischen Familien-Preflight und Modellmatrix geschlossen.
Existiert das Skript nicht, ist §2 je Alias die Ersatzprobe (Obs 0264).

```bash
python3 scripts/modell-verfuegbarkeit.py            # Probe je Alias
python3 scripts/modell-verfuegbarkeit.py --json     # maschinenlesbar
python3 scripts/modell-verfuegbarkeit.py --nur claude-gw-astra-6,claude-gw-xai-4.6
```

Exit 0, wenn alle geprüften Aliase ihr angefragtes Modell liefern. Exit 1, wenn
mindestens einer abweicht oder ausfällt — mit Namensliste. Der Lauf dauert bei
14 Aliasen rund drei Minuten; zwei 429-Aliase brauchen je bis zu 100 s Timeout.

## 7. Wann kein Spawn

- Alias liefert nicht (`failover_header` gesetzt oder Status ≠ 200): kein Spawn.
- Derselbe Alias ist zweimal kollabiert: kein dritter Versuch.
- Providerfehler höchstens einmal identisch wiederholen, dann `BLOCKED` mit dem
  konkreten Fehlerkörper und die unabhängige Arbeit abschließen.

## 8. Der Diagnose-Fehler, der die Verfügbarkeit verdeckt

**Ein Probe darf nicht durch die Umleitung laufen, die er prüfen soll.**

Am 15.09.2026 gemessen: `grok-token-refresh.sh` probt die Route über das
Gateway auf 8318 — dieselbe Schicht, die bei kühlem Seat auf ein Fremdmodell
umleitet. Der Probe sieht deshalb `HTTP 200` und meldet „falsches
Provider-Modell", statt den Anbieter zu erreichen. Folge: Der xAI-Seat wird nie
aufgefrischt, bleibt kühl, und der nächste Lauf scheitert identisch. Der Timer
stand einen Tag auf Exit 2, ohne dass etwas passierte.

Der Gegenbeweis ist die Laufzeit: Derselbe Request direkt am Upstream 8317
antwortet in **1,6 ms** mit `429 "All credentials … are cooling down"`. Diese
Zeit ist kein Provider-Roundtrip — der Cooldown wird lokal beantwortet, bevor
überhaupt ein Token geprüft wird.

Für jede Verfügbarkeitsmessung gilt deshalb:

- **Upstream direkt ansprechen** (`127.0.0.1:8317`), nicht das Gateway (8318),
  wenn die Frage lautet „liefert der Anbieter?". Das Gateway beantwortet die
  andere Frage: „bekommt der Aufrufer eine Antwort?".
- **Ein wiederholt scheiternder Selbstheilungs-Job ist ein Reparaturfall**, kein
  regulärer Fehllauf. Exit 2 an einem Timer gehört an eine sichtbare Stelle.
- **Ein Cooldown, der eine Sekunde nach dem Request antwortet, ist lokal.** Bei
  Verdacht die Upstream-Antwortzeit messen: unter ~50 ms bedeutet, dass kein
  Anbieter kontaktiert wurde und die Sperre aus dem lokalen Zustand kommt.
- Der xAI-Token-Refresh und die Credential-Ablage (`/root/.cli-proxy-api/`,
  `0600 root`) liegen außerhalb der Claude-Session. Reparatur braucht eine
  Root-Session; die Session dokumentiert den Befund und die Befehle, sie führt
  sie nicht aus.

## 9. Messung 15.09.2026, 07:42 UTC — das Gateway kollabiert in die Claude-Familie

Direkt am Gateway 8318 gemessen, je Anfrage der `X-Raphael`-Header. Das ist
dieselbe Schicht, über die jeder Sub-Agent läuft.

| angefragt | HTTP | geliefert | Failover-Header |
|---|---|---|---|
| `gpt-6-astra` | 200 | `gpt-6-astra` | **keiner** |
| `gpt-5.6-sol` | 200 | `claude-opus-5` | `gpt-5.6-sol -> claude-opus-5` |
| `gpt-5.6-luna` | 200 | `gpt-5.6-sol` | `gpt-5.6-luna -> gpt-5.6-sol` |
| `gpt-5.6-terra` | 200 | `claude-opus-5` | `gpt-5.6-terra -> claude-opus-5` |
| `xai/grok-4.6` | 200 | `claude-opus-5` | `xai/grok-4.6 -> claude-opus-5` |
| `kimi-k3` | 429 | — | — |
| `claude-opus-5`, `claude-fable-5-1`, `claude-sonnet-5`, `claude-haiku-4-5` | 200 | wie angefragt | keiner |
| `claude-gw-flash-3.8` | 200 | `gemini-3.8-flash` | keiner (Text-Body belegt) |
| `claude-gw-seek-4.1-flash` | 200 | `deepseek-flash` | keiner |
| `claude-gw-spark-1.3` | 200 | `muse-spark-1.3` | keiner |

Gegenprobe direkt am Upstream 8317, ohne die Umleitung, die geprüft wird:
`gpt-5.6-sol` antwortet 200, `gpt-5.6-terra`, `xai/grok-4.6` und `kimi-k3`
antworten 429. Terra, Grok und Kimi sind also schon beim Anbieter gesperrt;
Sol liefert beim Anbieter, wird aber vom Gateway trotzdem auf Opus umgeleitet.

**Folge für die Kritik-Regel.** Fremdfamilien-Kritik ist derzeit nur über Astra,
Gemini, DeepSeek und Muse möglich. Terra und Grok liefern auf `claude-opus-5`
um: ein darauf gebauter Kritiker ist eine vermeintliche Fremdkritik, die in
Wahrheit aus der Claude-Familie kommt, und darf nicht als Fremdfamilien-PASS
zählen (Obs 0208, 0251). Fünf Agenten zeigen auf solche Routen:
`grok-worker`, `sol-worker`, `sol-critic` (Sol), `luna-worker`, `terra-worker`.

**Fremdfamilien-PASS nur mit Astra.** *(Überholt durch §10: Astra liefert selbst
nur 2/3. Belastbar sind Gemini, DeepSeek und Muse.)*

## 10. Stabilitätsmessung und Ursache der Kollapse (15.09.2026, je Alias 3 Anfragen)

§9 maß je Alias **eine** Anfrage. Eine Anfrage trennt „liefert" nicht von
„liefert manchmal". Dieselbe Reihe dreifach wiederholt:

| Alias | angefragt | geliefert je Anfrage | Urteil |
|---|---|---|---|
| `claude-gw-flash-3.8` | gemini-3.8-flash | 3/3 gleich | stabil fremd |
| `claude-gw-seek-4.1-flash` | deepseek-4.1-flash | 3/3 gleich | stabil fremd |
| `claude-gw-spark-1.3` | muse-spark-1.3 | 3/3 gleich | stabil fremd |
| `claude-gw-astra-6` | gpt-6-astra | Astra, Astra, `claude-opus-5` | unzuverlässig |
| `claude-gw-terra-5.6` | gpt-5.6-terra | Opus, `gpt-5.6-luna`, Opus | ungeliefert |
| `claude-gw-sol-5.6` | gpt-5.6-sol | 3× `claude-opus-5` | ungeliefert |
| `claude-gw-luna-5.6` | gpt-5.6-luna | 3× `claude-opus-5` | ungeliefert |
| `claude-gw-xai-4.6` | xai/grok-4.6 | 3× `claude-opus-5` | ungeliefert |
| `claude-gw-k3` | kimi-k3 | HTTP 429, dann 2× `claude-opus-5` | ungeliefert |

Kimi ist damit nicht mehr „429 durchgehend" wie in §9, sondern fällt nach dem
ersten 429 ebenfalls in die Claude-Familie. Der Anbieter ist gesperrt; das
Gateway leitet danach um.

**Die Ursache liegt nicht in der Alias-Zuordnung.** `DEFAULT_ALIAS_MAP` in
`/root/tools/raphael_failover_policy.py` bildet jeden Alias korrekt ab:

```
"claude-gw-sol-5.6":   "gpt-5.6-sol"
"claude-gw-luna-5.6":  "gpt-5.6-luna"
"claude-gw-terra-5.6": "gpt-5.6-terra"
"claude-gw-xai-4.6":   "xai/grok-4.6"
"claude-gw-k3":        "kimi-k3"
"claude-gw-astra-6":   "gpt-6-astra"
```

Die Umleitung steht eine Ebene tiefer, in `FAMILY_COOLING_HOPS`:

```python
FAMILY_COOLING_HOPS = {
    "kimi":     ("claude-opus-5", "gpt-5.6-sol"),
    "grok":     ("gpt-5.6-sol", "claude-opus-5"),
    "gpt":      ("claude-opus-5", "claude-sonnet-5"),
    "claude":   ("gpt-5.6-sol", "gpt-5.6-terra"),
    "gemini":   ("claude-sonnet-5", "gpt-5.6-luna"),
    "meta":     ("claude-sonnet-5", "gpt-5.6-luna"),
    "deepseek": ("claude-sonnet-5", "gpt-5.6-luna"),
}
```

Zwei Folgen, die aus der Tabelle direkt lesbar sind:

- **Der GPT-Topf hat nur Claude als Ziel.** `"gpt"` führt nach
  `claude-opus-5` und `claude-sonnet-5`. Fällt der Topf, ist die Ziel-Familie
  für Sol, Luna, Terra und Astra dieselbe. Eine Lane-Trennung innerhalb der
  Familie rettet nichts, weil die Kühlung familienweise greift.
- **Astra ist Familie `gpt`.** `model_family()` liefert für `gpt-6-astra` den
  Wert `"gpt"`, weil `name.startswith("gpt-")`. Astra steht damit unter
  derselben Kühlungsregel wie Sol und Terra — die 1/3-Kollapse in der Tabelle
  sind genau das. Die Lane ist erreichbar; das Gateway verlässt sie trotzdem,
  sobald `family_is_skipped("gpt")` wahr ist.

**Warum Gemini, DeepSeek und Muse stabil bleiben.** Ihre Kühlungsziele
(`claude-sonnet-5`, `gpt-5.6-luna`) liegen in einer anderen Familie, und diese
Familien waren nicht gleichzeitig gesperrt. Der Zufall, dass gerade die drei
stabil sind, ist kein Entwurf — die Regel begünstigt Fremdfamilien, deren
Ziel-Lanes frei sind.

### Prüfbefehl für einen einzelnen Alias

```bash
K=$(cat /root/.cli-proxy-api/api-key.txt)
curl -s -D - -o /dev/null --max-time 60 -X POST http://127.0.0.1:8318/v1/messages \
  -H "content-type: application/json" -H "anthropic-version: 2023-06-01" \
  -H "x-api-key: $K" \
  -d '{"model":"claude-gw-astra-6","max_tokens":8,
       "messages":[{"role":"user","content":"ping"}]}' \
| tr -d '\r' | grep -iE '^HTTP|^x-raphael'
```

`X-Raphael-Upstream-Model` ist der einzige Beleg. Fehlt der Header und ist der
Body-Alias gleich dem angefragten, gilt die Lane als geliefert. Weicht der
Header ab, ist sie ungeliefert — auch bei HTTP 200.

### Rückholbedingung für geparkte Agenten

Ein geparkter Agent kommt zurück, wenn sein Alias in **fünf** aufeinanderfolgenden
Anfragen ohne Failover-Header sein eigenes Modell liefert. Vorher nicht.

## 11. Nachtrag 08:00 UTC — Astra kollabiert vollständig, Ursache ist Cooldown

§10 maß Astra mit 2/3. Dieselbe Reihe 40 Minuten später: **0 von 13**.
Gemessen wurde zuerst am Gateway 8318 (8 Anfragen: 1× HTTP 408, 7×
`claude-opus-5`), dann fünf weitere (`gpt-5.6-terra`, 4× `claude-opus-5`).
Kein einziger Lauf lieferte `gpt-6-astra`.

**Der Anbieter selbst antwortet 429, und zwar mit der Cooldown-Meldung:**

```
$ curl -s -X POST http://127.0.0.1:8317/v1/messages -d '{"model":"gpt-6-astra",...}'
{"type":"error","error":{"type":"rate_limit_error",
 "message":"All credentials for model gpt-6-astra are cooling down via provider codex"}}
```

Dieselbe Meldung für `gpt-5.6-sol` („cooling down via provider codex") und
`xai/grok-4.6` („cooling down"). Nach der Dreiteilung aus §4 ist das die
**Cooldown**-Kategorie — nicht `suspended`/`insufficient balance` (stilllegen)
und nicht `insufficient quota` (umrouten). Astra ist **nicht gesperrt**, sondern
vorübergehend kühl.

**Das ändert die Maßnahme.** Ein Cooldown ist ein Wartezustand; Parken wäre die
falsche Antwort. Astra bleibt im Katalog, aber:

- `astra-critic` und `grok-critic` zählen für einen Fremdfamilien-PASS nur mit
  vorausgegangenem `X-Raphael-Upstream-Model`-Beleg **aus demselben Lauf**.
- Ist der Header `claude-opus-5`, ist der Lauf Eigenkritik und der PASS ungültig
  — unabhängig davon, welcher Agentenname den Lauf gestartet hat.
- Der Cooldown löst sich von selbst; die Probe aus §2 in ≤ 1 h wiederholen.

**Kontingent widerspricht der Erreichbarkeit, wie in §4 beschrieben.**
`zustand.json` um 07:58 UTC meldet für den GPT-Topf `4/5` mit zwei Sitzen über
`5 %` frei (`abo2` 68 %, `abo4` 34 %); nur `abo1` steht auf `0.0 %`. Nach §4 ist
dieser Widerspruch ein Befund, kein Ranking: Der Seat ist gebucht, die
Codex-Credentials für Astra sind trotzdem im Cooldown.

### Die belastbare Kritik-Regel nach dieser Messung

Solange Astra kühlt, trägt **kein** GPT-Agent eine Fremdfamilien-Kritik.
Belastbar sind ausschließlich `gemini-critic`, `deepseek-critic` und
`muse-critic` — die drei am 15.09. dreifach als stabil gemessenen Routen.
Jeder Fremdfamilien-PASS über Astra, Sol, Luna, Terra, Grok oder Kimi ist bis
zum Header-Gegenbeweis als Eigenkritik zu behandeln.

## 12. Nachtrag 15.09.2026, 08:45–08:53 UTC — der GPT-Cooldown ist vorbei

Die Rückholprobe aus dem Handoff lief je Alias als eigene Messreihe am
Gateway 8318, Beleg ist der Header:

| Alias | Messreihe | geliefert | Failover |
|---|---|---|---|
| `claude-gw-astra-6` | 5/5 | `gpt-6-astra` | keiner |
| `claude-gw-sol-5.6` | 3/3 + 5/5 | `gpt-5.6-sol` | keiner |
| `claude-gw-luna-5.6` | 5/5 (Zweitreihe) | `gpt-5.6-luna` | Erstreihe 1× `→ gpt-5.6-terra`, Zweitreihe sauber |
| `claude-gw-terra-5.6` | 3/3 + 5/5 | `gpt-5.6-terra` | keiner |
| `claude-gw-flash-3.8` | 3/3 | `gemini-3.8-flash` | keiner |
| `claude-gw-seek-4.1-flash` | 3/3 | `deepseek-flash` | keiner |
| `claude-gw-spark-1.3` | 3/3 | `muse-spark-1.3` | keiner |
| `claude-gw-xai-4.6` | 3/3 | `gpt-5.6-sol` | `xai/grok-4.6 -> gpt-5.6-sol` |
| `claude-gw-k3` | 3 Anfragen | 1× HTTP 429, 2× `claude-opus-5` | `kimi/k3 -> claude-opus-5` |

Fehlerkörper am Upstream 8317 (Dreiteilung aus §4):

- `xai/grok-4.6`: `rate_limit_error … cooling down` → **Cooldown**, Probe
  wiederholen. Kein Agent zeigt auf diese Lane; nichts zu tun bis sie liefert.
- `kimi/k3`: `exceeded_current_quota_error … suspended due to insufficient
  balance` → **stilllegen**. Das ist keine Kühlung; ohne Aufladung kommt Kimi
  nicht zurück. `kimi-worker`/`kimi-critic` bleiben Kompatibilitätsrollen auf
  Astra/Opus.

**Maßnahme ausgeführt:** Die Rückholbedingung aus `agents-disabled/GRUND.md`
(fünf Anfragen ohne Failover-Header) ist für Sol, Luna und Terra erfüllt.
`sol-worker`, `sol-critic`, `luna-worker`, `terra-worker`, `grok-worker` sind
um 08:53 UTC nach `/root/.claude/agents/` zurückgekehrt; die GEPARKT-Kommentare
sind entfernt. Ein zweiter Katalog unter `/root/koordinator/.claude/` existiert
derzeit nicht (Verzeichnis fehlt nach dem Verlust vom 15.09.).

**Registry-Falle gilt weiter:** Agenten, die in einer laufenden Sitzung nach
`agents/` zurückkehren, sind erst nach Sitzungsneustart spawnbar.

### Kritik-Pool nach dieser Messung

Fremdfamilien, die liefern: **GPT** (Astra, Sol, Luna, Terra), **Gemini**,
**DeepSeek**, **Muse**. Damit tragen `astra-critic`, `grok-critic` (Astra),
`sol-critic`, `gemini-critic`, `deepseek-critic` und `muse-critic` wieder
Fremdfamilien-Kritik — jeweils weiterhin nur mit Header-Beleg aus demselben
Lauf, wie §5 es verlangt. Grok- und Kimi-Lanes bleiben ungeliefert.

**Harness-Hinweis zu `claude --agent` mit Gateway-Aliasen:** Claude Code meldet
`unrecognized_model` für `claude-gw-*` und erzwingt Auto-Compact bei 200k
Kontext. Der Lauf funktioniert trotzdem (15.09., `sol-worker` lieferte).
Für 1M-Kontext `[1m]` an den Alias anhängen oder `behavesAs` im Picker mappen.
