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
- **Kimi K3 ist Fables günstigerer Zwilling.** Artificial Analysis Intelligence
  Index: Fable 59,86 · Sol max 58,89 · Sol xhigh 57,65 · **K3 57,11 (Platz 4)**.
  Dazu 1M Kontext, Thinking immer an, führend bei SWE Marathon, BrowseComp,
  DeepSearchQA und AutomationBench. Kimi ist also **nicht nur der Frontend-Mann** —
  er kann schweres Denken, und zwar zum Bruchteil des Preises. Moonshot selbst
  räumt ein, dass K3 die stärksten proprietären Modelle insgesamt noch nicht
  schlägt — der Abstand ist aber klein genug, um Fable in den meisten Stücken
  zu ersetzen.
- **Kein Modell gewinnt jede Achse.** Vier Frontier-Modelle in einem Monat —
  jede Rangliste ist eine Momentaufnahme. Deshalb: Rollen breit besetzen,
  nicht „das beste Modell" suchen.

## Was jede Familie kann (Überlappung explizit)

| agentType | Familie | Effort | Kann als Builder | Kann als Kritiker | Kann als Glätter | Kann als Rechercheur |
|---|---|---|---|---|---|---|
| `fable-architekt` | Claude | **low/medium** | ✅ **die schwersten Stücke**: Langhorizont, Feature end-to-end, tiefe Bug-Jagd, Frontend als Ganzes | ✅ High-Recall-Bug-Kritik (61,1% Recall) | — (zu teuer) | — (zu teuer) |
| `opus-builder` | Claude | **max** | ✅ Terminal-/Agent-Arbeit, Debugging, Root-Cause, harte Fälle | ✅ rauscharmes Review (39,3% Precision), Root-Cause-Urteil | ✅ inhaltliche Angleichung | ✅ tiefes Codebase-Verständnis |
| `luna-worker` | GPT | **max** (Gateway erzwingt) | ✅ **Motor**: Mechanik, Tests, Fix-Schleifen, Backend, Refactor | ✅ mechanische Prüfung, Tests nachfahren, Zahlen-Check | ✅ technische Angleichung | ✅ Code-/Datei-Recherche |
| `terra-bulk` | GPT | **max** | ✅ Architektur, Migration, Multi-File, Volumen | ✅ Architektur-Kritik, Konsistenz über viele Dateien | ✅ Struktur-Angleich | — |
| `sol-pruefer` | GPT | **max** | ✅ harte Code-Fälle, Terminal-/Agent-Arbeit, Planung eines Stücks | ✅ **Erstwahl** Ship-Urteil, Design-Kritik, Chairman, Abnahme | ✅ inhaltliche Angleichung | ✅ Zahlen-Verifikation |
| `haiku-worker` | Claude | **max** | ✅ mechanische Edits, Boilerplate, Massen-Umbau | ✅ Screenshot-/Datei-Vergleich, Lint, Checklisten | ✅ Format-Angleich | ✅ **Erstwahl** Massen-Lesen |
| `kimi-worker` | Kimi K3 | **high** | ✅ **Erstwahl** Frontend/UI, DE-Texte, Kreatives, 3D — **und schweres Denken** (Platz 4 Intelligence Index, Thinking immer an) | ✅ Design-Blick, Text-Kritik, Analyse-Kritik, dritte Familie | ✅ visuelle Angleichung | ✅ Riesen-Kontext (1M), Deep-Search |
| `kimi-recherche` | Kimi K3 | **high** | — (nur lesend) | ✅ lesende Gegenprobe, Latten-Prüfung | — | ✅ Referenzen/Latte finden |
| `grok-worker` | Grok 4.5 | **max** | ✅ schnelle Umsetzung in Volumen, Prototypen, Tool-Use, Agent-Schritte | ✅ vierte Perspektive, Tempo-Review | ✅ mechanische Angleichung | ✅ breite Sichtung |
| `sonnet-worker` | Claude | — | ⬜ **nicht Teil der Gauntlet-Besetzung** (Raphael 03.08.) — nur als Notnagel bei Familien-Ausfall | ⬜ | ⬜ | ⬜ |

**Effort-Doktrin (Raphael 03.08.2026):**

| Modell | Effort | Warum |
|---|---|---|
| `fable-architekt` | **low / medium** | Fable ist das stärkste Modell im Feld (Index 59,86, Platz 1) — die Kraft kommt aus dem Modell, nicht aus langem Nachdenken. Der Effort-Aufschlag ist der Kostentreiber. Reicht low nicht → medium, nie höher. |
| `opus-builder` | **max** | Der Denk-Aufwand ist hier der Hebel: Root-Cause und Debugging leben von langen Ketten. |
| alle übrigen (Luna, Sol, Terra, Haiku, Grok) | **max** | Luna erzwingt max nativ im Gateway (`forced_effort`). |
| `kimi-worker` / `kimi-recherche` | **high** | K3 hat Thinking immer an; `max` verbrennt bei kurzen Aufgaben unverhältnismäßig viele versteckte Denk-Tokens (bei Launch: 13.241 Reasoning-Tokens für 3.417 Output-Tokens). |

Braucht ein Stück wirklich maximales Nachdenken, ist das **nicht** Fable auf max —
sondern `opus-builder` oder `sol-pruefer`. Effort immer explizit im Auftrag
mitgeben, sonst erbt der Subagent das Cockpit-Setup (Regel 7).

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
| **Das schwerste Stück im Lauf** | `kimi-worker` (günstiger Zwilling) | `fable-architekt` | `opus-builder` |
| Feature end-to-end, lange Strecke | `fable-architekt` | `kimi-worker` | `opus-builder` |
| Schwere Analyse / Architekturfrage | `kimi-worker` | `opus-builder` | `sol-pruefer` |
| Deep-Search / Riesen-Kontext (1M) | `kimi-worker` | `kimi-recherche` | `grok-worker` |
| Landingpage / UI | `kimi-worker` | `fable-architekt` | `grok-worker` |
| Deutsche Verkaufstexte / Ads-Copy | `kimi-worker` | `fable-architekt` | `opus-builder` |
| Prosa, langer Text, Argumentation | `kimi-worker` | `fable-architekt` | `opus-builder` |
| Backend-Feature | `luna-worker` | `opus-builder` | `sol-pruefer` |
| Harter Bug / Edge-Case / Root-Cause | `opus-builder` | `fable-architekt` | `sol-pruefer` |
| Tiefe Bug-Jagd (hoher Recall nötig) | `fable-architekt` | `opus-builder` | `luna-worker` |
| Große Migration / Multi-File | `terra-bulk` | `luna-worker` | `grok-worker` |
| Prototyp, viele Varianten schnell | `grok-worker` | `luna-worker` | `kimi-worker` |
| Mechanik, Boilerplate, Massen-Edit | `luna-worker` | `grok-worker` | `haiku-worker` |
| Tests schreiben und grün fahren | `luna-worker` | `grok-worker` | `terra-bulk` |
| 3D / visuelle Kreation | `kimi-worker` | `fable-architekt` | `grok-worker` |
| Recherche / Referenzen finden | `kimi-recherche` | `grok-worker` | `luna-worker` |

**Kosten-Bremse:** `fable-architekt` ist fast überall die **Zweitwahl hinter
Kimi** — der Zwilling kann dasselbe billiger. Erstwahl ist Fable nur bei
Langhorizont-Strecken über Stunden, wo sein Vorsprung belegt ist. Ein Gauntlet,
in dem Fable jedes Stück baut, ist falsch besetzt.

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
- Text und Ton → `kimi-worker` oder `fable-architekt` (low)
- Schneller Zweitblick, vierte Familie → `grok-worker`
- Reine Gegenprobe ohne Schreiben → `kimi-recherche`

Für **ship-relevante** Abnahme bleibt `sol-pruefer` der Standard (Beschluss B1),
im Tandem mit `opus-builder` als Gegenprobe. **Fällt Codex/GPT aus, übernimmt
`opus-builder` die Ship-Abnahme allein**, solange Panel A auf Kimi läuft
(Regel 8 gewahrt). `sonnet-worker` kommt nur, wenn auch Opus nicht erreichbar
ist — er gehört sonst nicht zur Gauntlet-Besetzung.

## Die zwei festen Tandems (Raphael 03.08.2026)

Zwei Paare arbeiten im Gauntlet standardmäßig zusammen, weil sie sich ergänzen
statt zu überlappen:

### Sol + Opus — das Urteils-Tandem

**Immer zusammen einsetzen, wenn ein Stück beurteilt oder ein harter Fehler
gejagt wird.** Sie sind verschiedene Familien (GPT / Claude), also erfüllen sie
Regel 8 gegenseitig — und ihre Stärken greifen ineinander:

| | Sol (GPT, max) | Opus (Claude, max) |
|---|---|---|
| Stärke | Terminal-/Agent-Arbeit über lange Horizonte, Ship-Urteil, Chairman | SWE-bench Verified 96,0%, Root-Cause, rauscharmes Review (39,3% Precision) |
| Schwäche | Eval-Gaming von unabhängigen Prüfern bemerkt → Selbstauskunft nicht blind glauben | teurer pro Urteil |
| Rolle im Tandem | findet und benennt, führt den Chairman-Teil | verifiziert die Ursache, prüft Sols Fund gegen den echten Code |

**Muster:** Sol urteilt zuerst und nennt EINE Lücke. Opus prüft diesen Fund am
echten Artefakt und bestätigt oder widerlegt ihn mit Beleg. Erst was beide
tragen, geht an den Builder zurück. Das neutralisiert Sols Eval-Gaming-Risiko
und Opus' Neigung, ohne Anstoß nichts zu melden.

Bei Ship-Abnahme: Sol ist die Erstwahl (Beschluss B1), Opus die Gegenprobe.

### Kimi + Fable — das Denk-/Bau-Tandem

**Austauschbar, nicht additiv.** Die beiden sind sich fachlich ähnlich (Index
57,11 vs. 59,86; beide stark bei Frontend, langem Kontext, Denken). Deshalb:

- **Default ist Kimi.** Er macht dasselbe zu einem Bruchteil des Preises.
- **Fable kommt nur, wenn Kimi zweimal an derselben Lücke gescheitert ist** oder
  wenn das Stück ausdrücklich Langhorizont-Autonomie über Stunden braucht.
- **Nie beide am selben Stück gleichzeitig** — das ist doppelt bezahlt. Ausnahme:
  bewusstes Varianten-Duell (unten), dann aber mit einer dritten Familie als
  Kritiker.
- Als **Kritiker füreinander sind sie gesperrt**? Nein — verschiedene Familien
  (Kimi / Claude), also erlaubt. Kimi darf Fable prüfen und umgekehrt. Das ist
  sogar die günstigste Art, Fable-Output abzunehmen.

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
| Schwerstes Stück | `kimi-worker` | `fable-architekt` | `sol-pruefer` |
| Urteil über ein fertiges Stück | `sol-pruefer` | `opus-builder` | (immer als Tandem, siehe oben) |

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
