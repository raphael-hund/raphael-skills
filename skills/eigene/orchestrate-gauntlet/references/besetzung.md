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

| agentType | Familie | Kann als Builder | Kann als Kritiker | Kann als Glätter | Kann als Rechercheur |
|---|---|---|---|---|---|
| `luna-worker` (max) | GPT | ✅ Mechanik, Tests, Fix-Schleifen, Backend, Refactor, Datenarbeit | ✅ mechanische Prüfung, Tests nachfahren, Zahlen-Check | ✅ technische Angleichung | ✅ Code-/Datei-Recherche |
| `terra-bulk` | GPT | ✅ Architektur, Migration, Multi-File, Volumen | ✅ Architektur-Kritik, Konsistenz über viele Dateien | ✅ Struktur-Angleich | — |
| `sol-pruefer` | GPT | ✅ harte Code-Fälle, Terminal-/Agent-Arbeit, Planung eines Stücks | ✅ **Erstwahl** Urteil, Design-Kritik, Chairman, Abnahme | ✅ inhaltliche Angleichung | ✅ Zahlen-Verifikation |
| `sonnet-worker` | Claude | ✅ solider Bau, Features, Integration, Text-Drafts | ✅ Code-Review, Text-Kritik, Zweitmeinung | ✅ **Erstwahl** Glättung | ✅ Codebase-Verständnis |
| `haiku-worker` | Claude | ✅ mechanische Edits, Boilerplate, Massen-Umbau | ✅ Screenshot-/Datei-Vergleich, Lint, Checklisten | ✅ Format-Angleich | ✅ **Erstwahl** Massen-Lesen |
| `kimi-worker` | Kimi K3 | ✅ **Erstwahl** Frontend/UI, DE-Texte, Kreatives, 3D/visuelle Ideen | ✅ Design-Blick, Text-Kritik, dritte Familie | ✅ visuelle Angleichung | ✅ Riesen-Kontext |
| `kimi-recherche` | Kimi K3 | — (nur lesend) | ✅ lesende Gegenprobe, Latten-Prüfung | — | ✅ Referenzen/Latte finden |
| `grok-worker` | Grok 4.5 | ✅ schnelle Umsetzung in Volumen, Prototypen, Tool-Use, Agent-Schritte | ✅ vierte Perspektive, Tempo-Review | ✅ mechanische Angleichung | ✅ breite Sichtung |
| **Cockpit** (Fable/Opus) | Claude | ❌ nie als Subagent | ✅ **nur im Cockpit**: Letzt-Urteil, Zerlegung, Destillat | ❌ | ✅ im Cockpit |

**Cockpit-Regel:** Fable und Opus arbeiten **im Cockpit**, nicht als Subagent.
Sie zerlegen, entscheiden, destillieren und fällen das Letzt-Urteil über das
geglättete Ganze — sie werden aber nie per `agentType` gestartet. Raphael spricht
direkt über **Grok 4.5** (`claude-raphael-grok`, Route `grok-4.5`), nicht über Opus.

**Verboten:** Kimi HighSpeed, Kimi K2.7.

## Wer baut was — Erst-, Zweit-, Drittwahl

| Werkstück | Erstwahl | Zweitwahl | Drittwahl |
|---|---|---|---|
| Landingpage / UI | `kimi-worker` | `sonnet-worker` | `grok-worker` |
| Deutsche Verkaufstexte / Ads-Copy | `kimi-worker` | `sonnet-worker` | `sol-pruefer` (als Builder) |
| Backend-Feature | `luna-worker` | `sonnet-worker` | `sol-pruefer` |
| Harter Bug / Edge-Case | `sol-pruefer` (als Builder) | `luna-worker` | `sonnet-worker` |
| Große Migration / Multi-File | `terra-bulk` | `luna-worker` | `grok-worker` |
| Prototyp, viele Varianten schnell | `grok-worker` | `luna-worker` | `kimi-worker` |
| Mechanik, Boilerplate, Massen-Edit | `haiku-worker` | `luna-worker` | `grok-worker` |
| Tests schreiben und grün fahren | `luna-worker` | `haiku-worker` | `sonnet-worker` |
| 3D / visuelle Kreation | `kimi-worker` | `grok-worker` | `sonnet-worker` |
| Recherche / Referenzen finden | `kimi-recherche` | `haiku-worker` | `grok-worker` |

## Wer richtet wen (harte Regel 8: Builder ≠ Kritiker-Familie)

| Builder | Familie | Erlaubte Kritiker (alle gleichwertig) |
|---|---|---|
| `kimi-worker` | Kimi | `sol-pruefer` · `luna-worker` · `sonnet-worker` · `haiku-worker` · `grok-worker` |
| `luna-worker` / `terra-bulk` / `sol-pruefer` | GPT | `kimi-worker` · `kimi-recherche` · `sonnet-worker` · `haiku-worker` · `grok-worker` |
| `sonnet-worker` / `haiku-worker` | Claude | `sol-pruefer` · `luna-worker` · `kimi-recherche` · `kimi-worker` · `grok-worker` |
| `grok-worker` | Grok | `sol-pruefer` · `luna-worker` · `sonnet-worker` · `haiku-worker` · `kimi-recherche` |

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
| Hero-Sektion | `kimi-worker` | `sonnet-worker` | `sol-pruefer` |
| Verkaufstext | `kimi-worker` | `sol-pruefer` | `sonnet-worker` |
| Backend-Modul | `luna-worker` | `grok-worker` | `sonnet-worker` |
| Prototyp | `grok-worker` | `kimi-worker` | `luna-worker` |

Der Kritiker sieht **nicht**, welche Variante von wem ist. Die verlierende
Variante wird nicht weggeworfen: ihre beste Idee wandert per einer Lücken-Ansage
in die Gewinner-Variante.

## Ausfall-Pfade

1. **GPT tot** (Seat widerrufen / `degraded-gpt.flag`): Luna/Terra/Sol →
   `sonnet-worker` und `grok-worker` als Builder, `kimi-*` sichert Regel 8.
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

**Immer gilt:** ein Familien-Ausfall wird im `workbench.md` protokolliert, nie
verschwiegen und nie als Grund zum Abbrechen benutzt. Weil jede Rolle mehrfach
besetzt ist, kostet ein Ausfall Auswahl, nie den Lauf.
