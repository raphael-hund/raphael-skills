---
name: r-kimi-first
version: 0.1.0
description: >
  Delegiert ein Arbeitspaket an die Kimi-CLI (Kimi K3, 1M Kontext, Weg 2, non-interaktiv)
  und lässt Claude das Ergebnis als strenger Reviewer abnehmen. Ideal für Riesen-Kontexte/
  Volumen; billig/anders bauen (Kimi), teuer prüfen (Claude), Merge behält Claude. Trigger:
  "/kimi-first", "an Kimi geben", "kimi -p", "riesiger Kontext", "1M ingest", "Cross-Vendor-Bau".
class: O
scope: agency
sensitivity: internal
loads:
  - scripts/kimi-first.sh
completion_criteria:
  - "Kimi-Lauf lief durch (Abo 1, sonst Fallback Abo 2) und der Output liegt als Datei vor"
  - "Claude hat den erzeugten Diff/Output als strenger Reviewer geprüft (pass/fail mit eingefügtem Beleg je Fund)"
  - "Claude hat die Tests SELBST ausgeführt (grüne Testausgabe eingefügt) — nicht Kimis Selbstauskunft geglaubt"
  - "Nur die geprüften, gewollten Änderungen sind gemerged; alles andere verworfen"
---

# r-kimi-first — Arbeitspaket an Kimi delegieren, Claude prüft

**Lies zuerst:** `/root/raphael-command-center/ops/ROUTING.md` (Kimi Weg 2, Effort,
Fallback), `AGENTS.md` Regel 2 (Delegations-Ökonomie), 8 (Verifier = andere Familie),
14 (Fertig = Umgebungstatsache), 15 (Datenminimierung).

## Zweck (1 Satz)
Kimi K3 (1M Kontext, andere Modellfamilie) baut/verarbeitet parallel — vor allem bei
Riesen-Kontexten/Volumen; Claude bleibt Reviewer und behält den Merge.

## Wann Kimi statt Codex
- **Riesen-Kontext / Volumen:** ganze Codebasen, lange Transkripte, SERP-Cleanup, Ingest —
  1M Kontext ist Kimis Stärke.
- Wenn Codex-Seats leer sind (Fallback in der Gesamtkette: Claude → Codex → **Kimi**).
Effort steckt fest auf `high` (`~/.kimi-code/config.toml`, `k3.default_effort=high`).

## Wann NICHT
Kleine Tasks nicht delegieren (Regel 2). Kimi-Gotcha: `reasoning_effort` ist launch-seitig
teils MAX-only → kurze Aufgaben unerwartet teuer.

## Ablauf
1. **Task-Ausschnitt schneiden** (Regel 15): nötiges Paket + Kontext, nie den ganzen Vault.
2. **Delegieren** — der Helper schreibt den Prompt in eine Temp-Datei und ruft
   `(cd <repo> && kimi -p "$(cat $PROMPTFILE)")`, Output als Datei:
   ```bash
   scripts/kimi-first.sh /root/clients/client-acme "Fasse alle 40 Call-Transkripte in raw/ zu einem ICP-Dossier zusammen. Nur wiki/_candidates/ schreiben."
   # oder Prompt über stdin:
   cat aufgabe.txt | scripts/kimi-first.sh /root/clients/client-acme
   ```
   Fallback-Kette: **Abo 1 (Default `~/.kimi-code`) → Abo 2** (per `KIMI_HOME`-Override,
   siehe Skript-Kopf). Der Helper setzt `--skills-dir` automatisch auf unser Skill-Repo.
3. **Diff/Output ansehen** — der Helper druckt `git diff --stat` (falls Git) und den
   Output-Pfad. Vollständigen Diff mit `git -C <repo> diff` lesen.
4. **Streng reviewen (Claude, `r-code-review`)** — jeden Fund als **pass/fail + Ort +
   eingefügter Beleg + Fix**. Kimis „hab getestet"-Behauptung NICHT glauben (Regel 8/14).
5. **Tests SELBST fahren** — Claude führt die Suite aus und fügt die Ausgabe ein. Rot →
   zurückspulen (Regel 4) oder selbst fixen.
6. **Merge behält Claude** — nur geprüfte Hunks bleiben; Rest verwerfen. Commit + Handoff.

## Gotchas
- Kimi-Console-Key wie ein Secret behandeln; nie in Git/Chat. `cck`/`kimi -p` brauchen den
  eingerichteten Coding-Endpoint (TODO-RAPHAEL Punkt 3).
- Bei Nicht-Code-Ausgaben (z. B. Dossier ins `_candidates/`) gilt trotzdem: Claude prüft die
  Fakten gegen die Quelle (belegbar, sonst Block — vgl. `r-report`).
- Untrusted rein ODER mächtig raus, nie beides (Regel 17): kein Web-/Ingest-Material
  ungefiltert mit Schreibrechten weiterreichen.
- Sind beide Kimi-Abos leer und Codex auch: Aufgabe selbst machen (Router guilty until
  proven innocent).
