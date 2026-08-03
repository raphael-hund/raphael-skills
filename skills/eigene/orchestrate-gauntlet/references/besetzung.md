# Besetzung — wer kann was, wer richtet wen

> Stand 03.08.2026. Grundlage: Raphaels Rollen-Ansage („die dürfen sich auch
> überlappen") plus last30days-Recherche (r/LocalLLaMA „KIMI K3 Beats Claude
> Fable and GPT 5.6 sol in arena.ai" — 1.903 pts / 335 Kommentare; BridgeMind-
> und TheAIGRID-Vergleichsläufe, 250k Views).

## Grundsatz: Überlappung ist gewollt

Kein Modell hat ein Monopol auf eine Rolle. Jede Familie kann **mehrere** Dinge,
und für fast jede Aufgabe gibt es **mehrere** taugliche Besetzungen. Das ist kein
Schönheitsfehler, sondern der Sinn der Sache:

- **Ausfallsicherheit** — fällt eine Familie aus (Quota, Seat, Wartung), gibt es
  immer eine zweite und dritte Wahl, ohne dass der Lauf stoppt.
- **Echte Varianten** — beim Gauntlet lohnt es, dasselbe Stück von zwei Familien
  bauen zu lassen und den Kritiker wählen zu lassen (Tournament-Muster).
- **Regel 8 bleibt erfüllbar** — je mehr Familien eine Rolle können, desto
  leichter ist Builder ≠ Kritiker.

Die Tabellen unten nennen **Erst-, Zweit- und Drittwahl**. Erstwahl ist der
Default, wenn nichts dagegen spricht. Zweit-/Drittwahl sind gleichwertig
einsetzbar — bei Ausfall, bei Varianten-Vergleich, oder wenn die Erstwahl schon
als Kritiker desselben Stücks gebunden ist.

## Was die Community sagt (kurz, mit Beleg)

- **Kimi K3 führt die Frontend-Arena an** — erstes offenes Modell vor Fable 5
  (r/LocalLLaMA, 1.903 pts). Für UI/Web erste Wahl, nicht Ausweichoption.
- **Grok 4.5 ist der Tempo-/Volumen-Spieler**: für Coding und Agent-Workflows
  trainiert, führend bei Tool-Use, günstiger als die Premium-Familien — aber bei
  harter Code-Genauigkeit hinter Fable/Opus. Community-Muster: **mit Grok
  implementieren, mit einem stärkeren Modell prüfen.**
- **GPT-5.6 Sol** ist stark bei Terminal-/Agenten-Arbeit über lange Horizonte.
  Vorsicht: unabhängige Prüfer haben Eval-Gaming bemerkt — bei ship-kritischem
  Code nicht blind auf Sol-Selbstauskunft verlassen (deckt sich mit Regel 14).
- **Opus/Fable**: stark bei harten Repo-Bugs, langem Kontext und Prosa; der
  wiederkehrende Kritikpunkt in Kommentaren ist Token-Verbrauch
  („burn as many tokens as it can", 11 Likes).
- **Kein Modell gewinnt jede Achse.** Vier Frontier-Modelle in einem Monat —
  jede Rangliste ist eine Momentaufnahme. Deshalb: Rollen breit besetzen,
  nicht „das beste Modell" suchen.

## Was jede Familie kann (Überlappung explizit)

| agentType | Familie | Effort | Kann als Builder | Kann als Kritiker | Kann als Glätter | Kann als Rechercheur |
|---|---|---|---|---|---|---|
| `fable-architekt` | Claude | **max** | ✅ **die schwersten Stücke**: Langhorizont, Feature end-to-end, tiefe Bug-Jagd, Frontend als Ganzes | ✅ High-Recall-Bug-Kritik (61,1% Recall) | — (zu teuer) | — (zu teuer) |
| `opus-builder` | Claude | **max** | ✅ Terminal-/Agent-Arbeit, Debugging, Root-Cause, harte Fälle | ✅ rauscharmes Review (39,3% Precision), Root-Cause-Urteil | ✅ inhaltliche Angleichung | ✅ tiefes Codebase-Verständnis |
| `luna-worker` | GPT | **max** (Gateway erzwingt) | ✅ **Motor**: Mechanik, Tests, Fix-Schleifen, Backend, Refactor | ✅ mechanische Prüfung, Tests nachfahren, Zahlen-Check | ✅ technische Angleichung | ✅ Code-/Datei-Recherche |
| `terra-bulk` | GPT | **max** | ✅ Architektur, Migration, Multi-File, Volumen | ✅ Architektur-Kritik, Konsistenz über viele Dateien | ✅ Struktur-Angleich | — |
| `sol-pruefer` | GPT | **max** | ✅ harte Code-Fälle, Terminal-/Agent-Arbeit, Planung eines Stücks | ✅ **Erstwahl** Ship-Urteil, Design-Kritik, Chairman, Abnahme | ✅ inhaltliche Angleichung | ✅ Zahlen-Verifikation |
| `haiku-worker` | Claude | **max** | ✅ mechanische Edits, Boilerplate, Massen-Umbau | ✅ Screenshot-/Datei-Vergleich, Lint, Checklisten | ✅ Format-Angleich | ✅ **Erstwahl** Massen-Lesen |
| `kimi-worker` | Kimi K3 | **high** | ✅ **Erstwahl** Frontend/UI, DE-Texte, Kreatives, 3D/visuelle Ideen | ✅ Design-Blick, Text-Kritik, dritte Familie | ✅ visuelle Angleichung | ✅ Riesen-Kontext |
| `kimi-recherche` | Kimi K3 | **high** | — (nur lesend) | ✅ lesende Gegenprobe, Latten-Prüfung | — | ✅ Referenzen/Latte finden |
| `grok-worker` | Grok 4.5 | **max** | ✅ schnelle Umsetzung in Volumen, Prototypen, Tool-Use, Agent-Schritte | ✅ vierte Perspektive, Tempo-Review | ✅ mechanische Angleichung | ✅ breite Sichtung |
| `sonnet-worker` | Claude | — | ⬜ **nicht Teil der Gauntlet-Besetzung** (Raphael 03.08.) — nur als Notnagel bei Familien-Ausfall | ⬜ | ⬜ | ⬜ |

**Effort-Doktrin (Raphael 03.08.2026):** alles auf **max**, außer Kimi auf
**high**. Luna erzwingt max nativ im Gateway (`forced_effort`). Effort explizit
im Auftrag mitgeben — sonst erbt der Subagent das Cockpit-Setup (Regel 7).

**Fable und Opus sind jetzt Teil der Flotte** (Freigabe Raphael 03.08.2026).
Die frühere Regel „nie Fable/Opus als Subagent" ist damit für den Gauntlet
aufgehoben. Sie bleiben aber **teuer** — Einsatzregel:

- `fable-architekt` nur für das **schwerste Stück** und für den Dauerlauf über
  Stunden (dort liegt sein Vorsprung: „je länger und komplexer die Aufgabe,
  desto größer Fables Vorsprung"). Nie für Mechanik oder Boilerplate.
- `opus-builder` für Substanz-Stücke, Debugging und Root-Cause — etwa halb so
  teuer wie Fable bei fast gleicher Frontier-Leistung.
- Beide zählen als **Claude-Familie** für Regel 8: sie dürfen keinen
  Claude-Builder abnehmen.

Raphael spricht direkt über **Grok 4.5**, nicht über Opus.

**Verboten:** Kimi HighSpeed, Kimi K2.7.

## Wer baut was — Erst-, Zweit-, Drittwahl

| Werkstück | Erstwahl | Zweitwahl | Drittwahl |
|---|---|---|---|
| **Das schwerste Stück im Lauf** | `fable-architekt` | `opus-builder` | `sol-pruefer` |
| Feature end-to-end, lange Strecke | `fable-architekt` | `opus-builder` | `luna-worker` |
| Landingpage / UI | `kimi-worker` | `fable-architekt` | `grok-worker` |
| Deutsche Verkaufstexte / Ads-Copy | `kimi-worker` | `fable-architekt` | `opus-builder` |
| Backend-Feature | `luna-worker` | `opus-builder` | `sol-pruefer` |
| Harter Bug / Edge-Case / Root-Cause | `opus-builder` | `fable-architekt` | `sol-pruefer` |
| Tiefe Bug-Jagd (hoher Recall nötig) | `fable-architekt` | `opus-builder` | `luna-worker` |
| Große Migration / Multi-File | `terra-bulk` | `luna-worker` | `grok-worker` |
| Prototyp, viele Varianten schnell | `grok-worker` | `luna-worker` | `kimi-worker` |
| Mechanik, Boilerplate, Massen-Edit | `haiku-worker` | `luna-worker` | `grok-worker` |
| Tests schreiben und grün fahren | `luna-worker` | `haiku-worker` | `grok-worker` |
| 3D / visuelle Kreation | `kimi-worker` | `fable-architekt` | `grok-worker` |
| Recherche / Referenzen finden | `kimi-recherche` | `haiku-worker` | `grok-worker` |

**Kosten-Bremse:** `fable-architekt` steht in genau den Zeilen, wo sein
Vorsprung belegt ist (Langhorizont, Bug-Recall, End-to-End-Frontend). Für alles
andere ist er die Zweitwahl oder gar nicht dabei. Ein Gauntlet, in dem Fable
jedes Stück baut, ist falsch besetzt.

## Wer richtet wen (harte Regel 8: Builder ≠ Kritiker-Familie)

| Builder | Familie | Erlaubte Kritiker (alle gleichwertig) |
|---|---|---|
| `kimi-worker` | Kimi | `sol-pruefer` · `luna-worker` · `terra-bulk` · `opus-builder` · `fable-architekt` · `haiku-worker` · `grok-worker` |
| `luna-worker` / `terra-bulk` / `sol-pruefer` | GPT | `kimi-worker` · `kimi-recherche` · `opus-builder` · `fable-architekt` · `haiku-worker` · `grok-worker` |
| `fable-architekt` / `opus-builder` / `haiku-worker` | Claude | `sol-pruefer` · `luna-worker` · `terra-bulk` · `kimi-worker` · `kimi-recherche` · `grok-worker` |
| `grok-worker` | Grok | `sol-pruefer` · `luna-worker` · `opus-builder` · `fable-architekt` · `haiku-worker` · `kimi-recherche` |

**Achtung Claude-Familie:** `fable-architekt`, `opus-builder` und
`haiku-worker` sind **dieselbe Familie**. Fable prüft nie Opus, Opus nie Fable,
und keiner von beiden prüft Haiku-Output (Regel 8).

**Wahl innerhalb der erlaubten Kritiker** nach Art der Prüfung:
- Design-/Ship-Urteil → `sol-pruefer` (Beschluss B1), ersatzweise `kimi-worker`
- Mechanik, Tests nachfahren, Zahlen → `luna-worker` oder `haiku-worker`
- Text und Ton → `kimi-worker` oder `sonnet-worker`
- Schneller Zweitblick, vierte Familie → `grok-worker`
- Reine Gegenprobe ohne Schreiben → `kimi-recherche`

Für **ship-relevante** Abnahme bleibt `sol-pruefer` der Standard. Fällt Codex
aus: `sonnet-worker` als Ersatz und Panel A auf Kimi.

## Zwei-Familien-Varianten (Tournament im Gauntlet)

Bei einem Stück mit hohem Einsatz lohnt es, **zwei Builder aus verschiedenen
Familien parallel** dasselbe bauen zu lassen und den Kritiker (dritte Familie)
per Blind-A/B wählen zu lassen. Bewährte Paare:

| Stück | Builder A | Builder B | Kritiker (dritte Familie) |
|---|---|---|---|
| Hero-Sektion | `kimi-worker` | `fable-architekt` | `sol-pruefer` |
| Verkaufstext | `kimi-worker` | `opus-builder` | `sol-pruefer` |
| Backend-Modul | `luna-worker` | `grok-worker` | `opus-builder` |
| Prototyp | `grok-worker` | `kimi-worker` | `luna-worker` |
| Schwerstes Stück | `fable-architekt` | `kimi-worker` | `sol-pruefer` |

Der Kritiker sieht **nicht**, welche Variante von wem ist. Die verlierende
Variante wird nicht weggeworfen: ihre beste Idee wandert per einer Lücken-Ansage
in die Gewinner-Variante.

## Ausfall-Pfade

1. **GPT tot** (Seat widerrufen / `degraded-gpt.flag`): Luna/Terra/Sol →
   `opus-builder` und `grok-worker` als Builder, `kimi-*` sichert Regel 8.
   Ship-Abnahme übernimmt `opus-builder`, solange Panel A auf Kimi läuft.
2. **Kimi-Quota:** nur K3; Ausfall benennen, mit Claude/GPT/Grok weiterfahren.
3. **Grok-Seat weg:** die drei Kernfamilien tragen weiter; im Protokoll nennen.
4. **Claude-Seats voll:** Gateway rotiert 1→4, danach Kimi als Abo-Fallback.
   Kein PAYG-Ausweichen.
5. `unsupported model`: erst systemd-Log des Failover-Proxys, dann direkt gegen
   Port 8317 testen — Task nicht abbrechen.
6. **`Agent type 'x' not found`:** der Agenten-Katalog wird beim Session-Start
   eingelesen. Eine Definition, die in der laufenden Session neu angelegt wurde,
   greift erst in der NÄCHSTEN Session. Bis dahin die Route direkt ansprechen
   (verifiziert 03.08.2026):
   ```bash
   GWKEY=$(sudo awk '/^api-keys:/{f=1;next} f&&/^  - /{gsub(/^  - "?|"?$/,"");print;exit}' /root/.cli-proxy-api/config.yaml)
   curl -s -X POST http://127.0.0.1:8317/v1/chat/completions \
     -H 'Content-Type: application/json' -H "Authorization: Bearer $GWKEY" \
     -d '{"model":"grok-4.5","messages":[{"role":"user","content":"..."}]}'
   ```
   Ohne `Authorization`-Header antwortet das Gateway `{"error":"Missing API key"}`
   — das ist kein Ausfall der Route.
7. **`unknown provider for model`:** die Preset-Namen (`fable[1m]`, `opus[1m]`)
   sind NICHT die Gateway-Routen. Die echten IDs holt man sich mit
   `curl -s http://127.0.0.1:8317/v1/models -H "Authorization: Bearer $GWKEY"`.
   Gültig sind u. a. `claude-fable-5`, `claude-opus-5`, `claude-sonnet-5`,
   `claude-haiku-4-5-20251001`, `gpt-5.6-luna`, `gpt-5.6-sol`, `gpt-5.6-terra`,
   `kimi-k3`, `grok-4.5` (alle am 03.08.2026 live geprüft).

**Immer gilt:** ein Familien-Ausfall wird im `workbench.md` protokolliert, nie
verschwiegen und nie als Grund zum Abbrechen benutzt. Weil jede Rolle mehrfach
besetzt ist, kostet ein Ausfall Auswahl, nie den Lauf.
