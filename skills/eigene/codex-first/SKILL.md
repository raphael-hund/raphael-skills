---
name: codex-first
version: 0.1.0
description: >
  Delegiert ein Arbeitspaket an die Codex-CLI (GPT-5.6, Weg 2, non-interaktiv) und lässt
  Claude das Ergebnis als strenger Reviewer abnehmen. Billig/anders bauen (Codex), teuer
  prüfen (Claude), Merge behält Claude. Trigger: "/codex-first", "an Codex geben", "von GPT
  bauen lassen", "codex exec", "Cross-Vendor-Bau".
class: O
scope: agency
sensitivity: internal
loads:
  - scripts/codex-first.sh
completion_criteria:
  - "Codex-Lauf lief durch (Seat 1, sonst Fallback Seat 2) und der Output liegt als Datei vor"
  - "Claude hat den erzeugten Diff als strenger Reviewer geprüft (pass/fail mit eingefügtem Beleg je Fund)"
  - "Claude hat die Tests SELBST ausgeführt (grüne Testausgabe eingefügt) — nicht Codex' Selbstauskunft geglaubt"
  - "Nur die geprüften, gewollten Änderungen sind gemerged; alles andere verworfen"
---

# codex-first — Arbeitspaket an Codex delegieren, Claude prüft

**Lies zuerst:** `/root/raphael-command-center/ops/ROUTING.md` (Profile sol/terra/luna,
Effort, Fallback), `AGENTS.md` Regel 2 (Delegations-Ökonomie), 8 (Verifier = andere
Familie), 14 (Fertig = Umgebungstatsache), 15 (Datenminimierung).

## Zweck (1 Satz)
Ein anderes Modellfamilie (GPT-5.6 via Codex-CLI) baut/ändert Code parallel; Claude bleibt
der Reviewer und behält den Merge — nichts prüft die eigene Hausarbeit.

## Wann NICHT
Kleine Tasks nicht delegieren (Regel 2 / ROUTING „Router guilty until proven innocent") —
Delegation kostet Overhead. Erst ab echter Größe/Parallelisierbarkeit oder wenn bewusst eine
zweite Modellfamilie bauen soll (Cross-Vendor-Diversität).

## Profil-Wahl (Effort steckt fest in der jeweiligen `<name>.config.toml`)
| Profil | Modell | Effort | Wofür |
|---|---|---|---|
| `sol` | GPT-5.6 Sol | medium | Zweitmeinung, harte Code-Fälle, Zahlen-Verifikation |
| `terra` | GPT-5.6 Terra | high | Bulk-Code, Builds, Migrationen |
| `luna` | GPT-5.6 Luna | high | Schnelle Edits, Exploration, Klassifikation |

## Ablauf
1. **Task-Ausschnitt schneiden** (Regel 15): nur das nötige Arbeitspaket + Kontext, nie den
   ganzen Vault. Prompt präzise, Zielrepo benennen.
2. **Delegieren** — der Helper schreibt den Prompt in eine Temp-Datei, ruft
   `codex exec --profile <sol|terra|luna> -C <repo>` und legt den Output als Datei ab:
   ```bash
   scripts/codex-first.sh terra /root/clients/client-acme "Migriere alle v1-Imports in src/ auf die v2-API. Nur src/, keine Tests anfassen."
   # oder Prompt über stdin:
   echo "Prüfe und fixe den Off-by-one in pager.ts" | scripts/codex-first.sh sol /root/clients/client-acme
   ```
   Fallback-Kette automatisch: **Seat 1 (`/root/.codex-1`) → Seat 2 (`/root/.codex-2`)**.
3. **Diff ansehen** — der Helper druckt am Ende `git diff --stat` des Repos. Den vollständigen
   Diff mit `git -C <repo> diff` lesen.
4. **Streng reviewen (Claude, `code-review`)** — jeden Fund als **pass/fail + Datei:Zeile +
   eingefügter Beleg + Fix** notieren. Codex' eigener „hab alles getestet"-Behauptung NICHT
   glauben (Regel 8/14).
5. **Tests SELBST fahren** — Claude führt die Testsuite im Repo aus und fügt die Ausgabe ein.
   Rot? Zurück an Codex mit präziserem Prompt (Regel 4: zurückspulen statt diskutieren) oder
   selbst fixen.
6. **Merge behält Claude** — nur die geprüften, gewollten Hunks bleiben; Rest verwerfen
   (`git restore`/`git checkout -p`). Commit + Handoff.

## Gotchas
- `approval_policy=on-request` + `sandbox_mode=workspace-write` gelten aus der Basis-
  `config.toml`. `danger-full-access`/`approval_policy=never` bleiben verboten (Regel 11) —
  der Helper setzt sie NICHT.
- Effort NICHT im Aufruf überschreiben — er steckt bewusst in der Profildatei (sol=medium,
  terra/luna=high). Effort-vor-Modell (Regel 13) heißt: erst `sol`→bei Bedarf `terra`.
- Läuft Codex-Seat 1 ins leere Quota-Fenster, greift der Fallback auf Seat 2. Sind beide leer:
  Aufgabe selbst machen oder an Kimi (`kimi-first`) geben.
- Untrusted rein ODER mächtig raus, nie beides (Regel 17): kein Web-/Ingest-Material
  ungefiltert als Codex-Prompt mit Schreibrechten.
