# Besetzung — wer baut was, wer richtet wen

> Stand 03.08.2026. Grundlage: Raphaels Rollen-Ansage plus last30days-Recherche
> (r/LocalLLaMA „KIMI K3 Beats Claude Fable and GPT 5.6 sol in arena.ai" —
> 1.903 pts / 335 Kommentare; BridgeMind- und TheAIGRID-Vergleichsläufe,
> 250k Views; Community-Tenor zur Token-Effizienz).

## Was die Community sagt (kurz, mit Beleg)

- **Kimi K3 führt die Frontend-Arena an** — erstes offenes Modell vor Fable 5
  (r/LocalLLaMA, 1.903 pts). Für UI/Web ist Kimi erste Wahl, nicht Ausweichoption.
- **Grok 4.5 ist der Tempo-/Volumen-Spieler**: für Coding und Agent-Workflows
  trainiert, führend bei Tool-Use, günstiger als die Premium-Familien — aber bei
  harter Code-Genauigkeit hinter Fable/Opus. Muster aus der Community: **mit
  Grok implementieren, mit einem stärkeren Modell prüfen.**
- **GPT-5.6 Sol** ist stark bei Terminal-/Agenten-Arbeit über lange Horizonte.
  Vorsicht: unabhängige Prüfer haben Eval-Gaming bemerkt — bei ship-kritischem
  Code nicht blind auf Sol-Selbstauskunft verlassen (deckt sich mit Regel 14).
- **Opus-Familie**: stark bei harten Repo-Bugs und langem Kontext; der
  wiederkehrende Kritikpunkt in Kommentaren ist Token-Verbrauch
  („burn as many tokens as it can", 11 Likes). Bei uns ohnehin Cockpit-only.
- **Kein Modell gewinnt jede Achse.** Vier Frontier-Modelle in einem Monat —
  jede Rangliste ist eine Momentaufnahme. Deshalb: Rollen zuweisen, nicht
  „das beste Modell" suchen.

## Rollen-Zuteilung

| agentType | Familie | Baut | Baut NICHT |
|---|---|---|---|
| `luna-worker` | GPT | **Motor**: Mechanik, Tests, Fix-Schleifen, Verify-Skripte. Läuft auf Max-Effort. Bekommt ein Goal, kein Prosa-Briefing. | Kreative Texte, Design-Urteil |
| `terra-bulk` | GPT | Architektur, Migration, Multi-File-Umbau, Volumen | Feinschliff, Copy |
| `sonnet-worker` | Claude | Solider Bau, Integration, **Glättung nach jeder Welle** | Frontend-Spitze (dafür Kimi) |
| `haiku-worker` | Claude | Massen-Lesen, Referenzen sichten, Vergleichsmaterial vorbereiten, billige Lint-Runden | Urteil über Ship-Qualität |
| `kimi-worker` | Kimi K3 | **Frontend/UI, deutsche Marketing- und Verkaufstexte, kreativer Feinschliff.** Immer K3. | Backend-Architektur |
| `grok-worker` | Grok 4.5 | Schnelle Implementierung in Volumen, Tool-Use, Agent-Schritte, vierte Perspektive | Finale Abnahme |
| `sol-pruefer` | GPT | Urteil, Chairman, finale Abnahme, adversarialer Critic | Bauen im selben Stück, das er abnimmt |
| `kimi-recherche` | Kimi K3 | Lesende Gegenprobe, Referenz-/Latten-Suche | Schreiben |

**Verboten als Subagent:** Fable, Opus (Cockpit-only, Doktrin).
**Verboten:** Kimi HighSpeed, Kimi K2.7.

## Kritiker-Paarung (hart — Regel 8)

Builder-Familie ≠ Kritiker-Familie. Nachschlagen, nicht raten:

| Builder | Familie | Erlaubte Kritiker |
|---|---|---|
| `kimi-worker` | Kimi | `sol-pruefer` (GPT) · `sonnet-worker` (Claude) · `grok-worker` (Grok) |
| `luna-worker` / `terra-bulk` | GPT | `kimi-recherche` (Kimi) · `sonnet-worker` (Claude) · `grok-worker` (Grok) |
| `sonnet-worker` / `haiku-worker` | Claude | `sol-pruefer` (GPT) · `kimi-recherche` (Kimi) · `grok-worker` (Grok) |
| `grok-worker` | Grok | `sol-pruefer` (GPT) · `sonnet-worker` (Claude) · `kimi-recherche` (Kimi) |

Für **ship-relevante** Abnahme bleibt `sol-pruefer` der Standard (Beschluss B1).
Fällt Codex aus: `sonnet-worker` als Ersatz und Panel A auf Kimi.

## Standard-Besetzung je Werkstück-Typ

| Werkstück | Builder | Kritiker | Glätter |
|---|---|---|---|
| Landingpage / Website | `kimi-worker` | `sol-pruefer` (Design-Urteil) + `haiku-worker` (Screenshot-Vergleich) | `sonnet-worker` |
| Ads-Creative / DE-Copy | `kimi-worker` | `sol-pruefer` | `sonnet-worker` |
| Backend-Feature | `luna-worker` (Goal, max) | `sonnet-worker` oder `kimi-recherche` | `sonnet-worker` |
| Große Migration | `terra-bulk` | `sol-pruefer` (Stichprobe gegen `git diff`) | `luna-worker` (Tests) |
| Prototyp / viele Varianten | `grok-worker` (Tempo) | `sol-pruefer` | `sonnet-worker` |
| 3D / visuelle Kreation | `kimi-worker` | Cockpit-Urteil + `sol-pruefer` | `sonnet-worker` |

## Cockpit und direkte Ansprache

- Raphael arbeitet **nicht direkt auf Opus** — Cockpit-Preset für die direkte
  Unterhaltung ist **Grok 4.5** (`claude-raphael-grok`, Route `grok-4.5` über
  CLIProxy 8317, xAI-OAuth).
- Opus/Fable bleiben Cockpit-Modelle für Planung und Urteil, werden aber nie
  als Subagent gestartet.

## Ausfall-Pfade

1. **GPT tot** (Seat widerrufen / `degraded-gpt.flag`): Luna/Terra/Sol →
   `sonnet-worker` als Builder, `kimi-recherche` + `grok-worker` sichern Regel 8.
2. **Kimi-Quota:** nur K3; Ausfall benennen, mit Claude/GPT/Grok weiterfahren.
3. **Grok-Seat weg:** die drei Kernfamilien tragen weiter; im Protokoll nennen.
4. **Claude-Seats voll:** Gateway rotiert 1→4, danach Kimi als Abo-Fallback.
   Kein PAYG-Ausweichen.
5. `unsupported model`: erst systemd-Log des Failover-Proxys, dann direkt gegen
   Port 8317 testen — Task nicht abbrechen.
6. **`Agent type 'grok-worker' not found`:** der Agenten-Katalog wird beim
   Session-Start eingelesen. Eine Definition, die in der laufenden Session neu
   angelegt wurde, greift erst in der NÄCHSTEN Session. Bis dahin die Route
   direkt ansprechen (verifiziert 03.08.2026):
   ```bash
   GWKEY=$(sudo awk '/^api-keys:/{f=1;next} f&&/^  - /{gsub(/^  - "?|"?$/,"");print;exit}' /root/.cli-proxy-api/config.yaml)
   curl -s -X POST http://127.0.0.1:8317/v1/chat/completions \
     -H 'Content-Type: application/json' -H "Authorization: Bearer $GWKEY" \
     -d '{"model":"grok-4.5","messages":[{"role":"user","content":"..."}]}'
   ```
   Ohne `Authorization`-Header antwortet das Gateway `{"error":"Missing API key"}`
   — das ist kein Ausfall der Route.

**Immer gilt:** ein Familien-Ausfall wird im `workbench.md` protokolliert, nie
verschwiegen und nie als Grund zum Abbrechen benutzt.
