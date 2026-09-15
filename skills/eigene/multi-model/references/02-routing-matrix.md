# Routing-Matrix

Welches Modell für welchen Job. Weiche Empfehlung, keine Exklusivrolle.

**Diese Matrix ist die Quelle.** Sie steht nicht zusätzlich in einzelnen
Agent-Dateien; Agenten tragen nur ihren Motor. Bei Widerspruch zu
`ops/ROUTING.md`, `ops/MODELL-MATRIX*.md` oder `ops/HARNESS-ROUTER-MATRIX.md`
gewinnt diese Datei — jene sind historische Momentaufnahmen mit Backup-Suffixen
im Namen und werden nicht mehr fortgeschrieben.

## 1. Nutzerentscheidungen (Raphael, 14.09.2026)

Diese Entscheidungen sind aktueller als jede ältere Routing-Datei:

- Ads und Strategie: Astra.
- Orchestrierung: Astra oder Fable.
- Große, unklare Probleme und Architektur: Fable bevorzugt.
- Backend und Coding: Fable, danach Astra.
- Debugging und Technik: Grok.
- Bulk/Serienarbeit: DeepSeek.
- Copy: Gemini 3.8 Flash.
- Frontend/UI: Rang 1 Astra und Fable; Rang 2 Kimi und Muse Spark; Rang 3 Opus.

Ränge sind weiche Empfehlungen. Kosten, Latenz, Kontingent, Verfügbarkeit,
Datenklasse und Task-Fit verschieben das Ranking.

## 2. Stufen

Die Stufen sind eine Rollenordnung, keine Verfügbarkeitsaussage. Welcher Motor
einen Platz tatsächlich besetzt, steht in §2 des Skills und in
`01-modell-inventar.md`.

- **Stufe 1 (Fable, Astra, Gemini):** entscheiden, planen, Architektur,
  Design-Richtung, Frontend und UI, Copy, finale Abnahme. Astra macht kein
  Research. Kimi stand hier bis zur Kontosperre; Gemini übernimmt den Copy-Teil.
- **Stufe 2 (Opus, DeepSeek, Gemini, Sol):** erste Kritik nach jedem Bau, andere
  Familie als der Builder. Opus baut Frontend und UI mit. DeepSeek macht Technik,
  Backend, API, Tests, Browser, Bulk. Sol ist seit 15.09. 08:53 UTC zurück
  (5/5 ohne Failover); Grok bleibt entfallen (Cooldown, kein Agent).
- **Stufe 3 (Sonnet, Haiku, Muse, Luna, Terra, Explore):** lesen und
  wiederholen. Scout, Kartierung, Massen-Read, Serien, Migrationen,
  Vorverdichtung. Nie Urteil, nie Design. Luna und Terra sind seit 15.09.
  08:53 UTC zurück.
- Composer experimentell für Integration.

## 3. Job-Matrix

Top-4-Kandidaten je Job, bester zuerst. Agent-Typ in Klammern.

| Job | Kandidaten | Agent |
|---|---|---|
| Orchestrierung, Plan, Architektur | Fable → Astra → Opus | Hauptsession; `astra-worker` |
| Ads (Strategie, Research, Copy, Kritik) | Astra → Fable → Sol/Grok | `astra-worker`, `ads-analyst`; **nie** Sol/Terra/Luna/Opus/Sonnet/Haiku |
| Backend, Coding, API, Tests | Fable → Astra → Sol → DeepSeek | `sol-worker`, `deepseek-worker`, `astra-worker` |
| Debugging, Technik, Browser | Astra → Sol → DeepSeek | `grok-worker` (fährt Sol), `deepseek-worker` |
| Frontend, UI | Astra/Fable → Gemini → Opus | `astra-worker`, `opus-builder`, `gemini-copy-worker` |
| Copy | Gemini → Astra → Muse | `gemini-copy-worker`, `muse-worker`; Gate `forbidden-check.py` |
| Bulk, Serien, Migrationen | DeepSeek → Luna/Terra → Muse → Haiku | `deepseek-worker`, `luna-worker`, `terra-worker`, `muse-worker`, `haiku-worker` |
| Kartierung, Massen-Read, Vorverdichtung | Sonnet → Haiku → Explore | `sonnet-worker`, `haiku-worker`, builtin `Explore` |
| Erste Kritik nach Bau (stabil) | Gemini → DeepSeek → Muse (andere Familie als Builder) | `gemini-critic`, `deepseek-critic`, `muse-critic` |
| Erste Kritik nach Bau (nur mit Header-Beleg) | Astra → Sol | `astra-critic`, `grok-critic`, `sol-critic`; GPT liefert wieder seit 08:45 UTC (5/5) |
| Abnahme vor Auslieferung | Fable → Gemini → DeepSeek (andere Familie als Builder) | `fable-critic`, `gemini-critic`, `deepseek-critic` |

Die Reihenfolgen folgen der gemessenen Verfügbarkeit, nicht der Wunschordnung.
`sol-critic` ist seit 15.09. 08:53 UTC zurück (Sol liefert 5/5 ohne Failover).
Die drei stabilen Fremdfamilien Gemini, DeepSeek, Muse tragen weiterhin je
einen eigenen Kritiker; jeder GPT-PASS braucht den Header-Beleg desselben Laufs.

## 4. Kosten-, Latenz- und Datenklassen

| Modell | Kosten | Latenz | Datenklasse |
|---|---|---|---|
| Haiku 4.5 | sehr niedrig | sehr schnell | Claude-Abo |
| Sonnet 5 | niedrig | schnell | Claude-Abo |
| Gemini 3.8 Flash | niedrig | schnell | Google-Direkt — **Kundendaten nur wenn Tarif keine Trainingsnutzung erlaubt** |
| DeepSeek 4.1 Flash | niedrig | mittel | Direkt-API |
| Luna / Terra / Sol | mittel | mittel | GPT-Abo — liefern wieder (5/5, 08:53 UTC) |
| Astra | mittel | mittel | GPT-Abo — liefert wieder (5/5, 08:45 UTC) |
| Muse Spark 1.3 | niedrig | mittel | Direkt-API, stabil |
| Opus 5 | hoch | mittel | Claude-Abo, knappstes Kontingent |
| Fable 5.1 | hoch | mittel | Claude-Abo, knappstes Kontingent |
| Grok 4.6 | mittel | schnell | xAI-Abo — **Cooldown, liefert nicht; kein Agent** |
| Kimi K3 | mittel | mittel | **stillgelegt (Konto suspendiert)** |

Die knappste Ressource ist der Claude-Topf. Ein Claude-Modell als Bulk-Worker
verbraucht ihn für Arbeit, die DeepSeek oder Muse leisten. Der Root liest nicht
selbst — Kartierung und Massen-Read gehen an Stufe 3.

## 5. Agent-Namen und Motoren — die drei verbleibenden Abweichungen

Ein Agent, dessen Name eine Familie nennt, muss im `model:`-Feld dieselbe Familie
tragen. Wer `kimi-critic` nach einem GPT-Build einsetzt, bekommt eine Claude-Kritik;
die Formalprüfung (andere Familie als Builder) besteht, die erwartete Familie fehlt.
Das ist die gefährlichste Form: Sie sieht wie ein gültiger Fremdfamilien-PASS aus.

Am 15.09.2026 verletzen drei Dateien die Regel, alle drei sind als
Kompatibilitätsrollen gekennzeichnet: `kimi-worker` (fährt Astra),
`kimi-critic` (fährt Opus, zusätzlich `[UNVOLLSTAENDIG]`) und `grok-critic`
(fährt Astra). `muse-worker` wurde am selben Tag korrigiert und fährt jetzt
Muse, wie der Name sagt.

Drei Wege, in dieser Reihenfolge:

1. **Motor reparieren.** Wenn Grok oder Kimi wieder liefern (Konto/Cooldown geklärt),
   das `model:`-Feld auf den echten Alias setzen und die Selbstauskunft im Prompt
   entsprechend ändern. Dann stimmen Name und Familie.
2. **Agent umbenennen.** Wenn der Motor absehbar nicht liefert, den Agenten
   familienneutral führen (`fallback-critic` statt `kimi-critic`) und die
   tatsächliche Familie im `description`-Feld **benennen**, nicht verstecken.
   Der Name darf keine Familie versprechen, die das Frontmatter nicht liefert.
3. **Agent entfernen.** Wenn kein Bedarf für die Rolle besteht.

Nicht zulässig: Der Agent behält einen Kimi- oder Grok-Namen und läuft still auf
einer dritten Familie. Der Name ist dann eine Provenienz-Behauptung, die niemand
prüft.

Zwei Agenten sind heute Waisen — keine Regel, kein Skill und keine Rollendatei
wählt sie: `muse-worker` (Name sagt Muse, `model:` ist `claude-gw-flash-3.8`,
also Gemini; kein Kompatibilitätsrollen-Hinweis) und `gemini-copy-worker`
(korrekt benannt). Beide brauchen einen Wähler in dieser Matrix oder gehören
entfernt. Muse Spark 1.3 liefert grundsätzlich (`claude-gw-spark-1.3`, HTTP 200),
fehlt aber in der aktiven `PICKER_MODELS`; vor einem Umbinden auf Muse erst
prüfen, dass der Alias aus der Session erreichbar ist.

## 6. Bei Widerspruch

Die Matrix weicht bewusst von älteren Dateien ab. Bekannte Widersprüche und die
gültige Lesart:

| Widerspruch | Gültig |
|---|---|
| `ops/MODELL-MATRIX.md`: Backend ist Grok/Sol | Fable → Astra (Nutzerentscheidung 14.09.) |
| `ops/MODELL-MATRIX-v2.md`: Haiku "verboten", Kimi "Frontend-Code" | Haiku erlaubt für Lookups; Kimi kein Frontend-Builder |
| `ops/ROUTING.md`: Kimi als letztes Glied der Claude-Kette | Kimi liefert nicht (Kontosperre) |
| `subagenten.md` zitiert einen Skill `multi-model`, der bis 15.09. fehlte | dieser Skill, Version 2.0.0 |
