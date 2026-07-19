---
name: r-kimi-first
version: 0.2.0
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

## Schwarm-Modus (verschachtelt) — für Riesen-Aufgaben
**TLDR:** Ein Chef gibt an EINEN Kimi-Helfer. Ist die Aufgabe zu riesig, darf dieser
Helfer selbst kleine Helfer aufmachen (z. B. „du machst Ordner A, du machst Ordner B").
Aber nur **eine Etage tief** und mit festen Bremsen, damit es nicht ausufert.

**Wann nutzen (nur dann!):** Eine Aufgabe ist so groß, dass ein einziger Lauf sie nicht
schafft — z. B. **ganzer Ordner** durchackern, **50 Dokumente** zusammenfassen, **großer
Brain-Ingest**. Für alles Kleinere: normaler Einzel-Lauf oben (Regel 2, nicht delegieren).

**Das Bild (max. 2 Etagen):**
```
Chef (Claude)  ── delegiert das GANZE Paket ──▶  Kimi-Chef      (Etage 1)
                                                   ├─ Kimi-Helfer A  (Etage 2 = Schluss)
                                                   ├─ Kimi-Helfer B  (Etage 2 = Schluss)
                                                   └─ Kimi-Helfer C  (Etage 2 = Schluss)
```
Etage-2-Helfer dürfen **KEINE** weiteren Helfer mehr aufmachen. Tiefe endet bei 2.

**Sicherungsbremsen (alle Pflicht, hart einhalten):**
1. **Tiefe ≤ 2:** Chef → Kimi-Chef (1) → Kimi-Helfer (2). Ende. Ein Etage-2-Helfer, der
   nochmal delegieren will, macht das Teilpaket selbst oder meldet „zu groß" zurück.
2. **Helfer-Deckel:** höchstens **5** Etage-2-Helfer gleichzeitig. Mehr Teilpakete →
   nacheinander abarbeiten, nicht mehr Helfer starten.
3. **Stillstand-Abbruch:** Zeigt ein Helfer nach **10 Minuten** oder **2 Runden** keinen
   Fortschritt (keine neue/geänderte Datei, kein größerer Output), wird er abgebrochen und
   das Teilpaket landet als „ungelöst" im Fortschritts-Zettel. Kein endloses Warten.
4. **Aktive Fortschritts-Rückmeldung:** Jeder Helfer schreibt seinen Stand in EINE
   gemeinsame Datei `progress.md` (Zeile pro Teilpaket: `offen / läuft / fertig / ungelöst`).
   Der Kimi-Chef liest sie und meldet den Gesamtstand nach oben an den Chef (Claude). So
   sieht der Chef jederzeit, was läuft — kein Blindflug.
5. **Grenzen sind Text im Prompt:** Die CLI erzwingt das nicht — die Regeln stehen als
   klare Anweisung im Prompt an den Kimi-Chef. Deshalb Prompt kurz und eindeutig halten.

**Konkreter Aufruf:** Der Chef startet nur den Kimi-Chef (Etage 1) über den Helper; die
Tiefe-1-Delegation steckt im Prompt:
```bash
scripts/kimi-first.sh /root/clients/client-acme "$(cat <<'PROMPT'
SCHWARM-MODUS, Riesen-Aufgabe: Fasse alle 50 Dokumente in raw/ zu Dossiers zusammen.
Du bist Kimi-Chef (Etage 1). Regeln, die du strikt einhältst:
- Teile die 50 Dokumente in Häppchen und starte pro Häppchen EINEN Etage-2-Helfer:
    kimi -p "<Teilauftrag: nur Dateien X..Y>" --skills-dir /root/raphael-skills/skills
- MAX 5 Helfer gleichzeitig. Tiefe endet bei 2: deine Helfer dürfen NICHT weiter delegieren.
- Führe progress.md: je Teilpaket eine Zeile (offen/läuft/fertig/ungelöst). Halte sie aktuell.
- Stillstand (10 Min oder 2 Runden ohne neue Datei) = Helfer abbrechen, Zeile "ungelöst".
- Schreibe NUR nach wiki/_candidates/. Am Ende: Kurzbericht + progress.md-Stand ausgeben.
PROMPT
)"
```
Der Helper hängt `--skills-dir /root/raphael-skills/skills` schon an den Kimi-Chef-Lauf;
im Prompt oben wiederholst du es für die **inneren** `kimi -p`-Aufrufe der Etage-2-Helfer,
damit auch die unsere `r-*`-Skills sehen.

**Danach unverändert:** Claude reviewt streng (Schritt 4–6 oben), prüft `progress.md` gegen
die echten Dateien (Regel 14: fertig = Umgebungstatsache, nicht Kimis Selbstauskunft), fährt
Tests selbst, behält den Merge. „ungelöst"-Teilpakete macht Claude selbst oder plant sie neu.

## Gotchas
- Kimi-Console-Key wie ein Secret behandeln; nie in Git/Chat. `cck`/`kimi -p` brauchen den
  eingerichteten Coding-Endpoint (TODO-RAPHAEL Punkt 3).
- Bei Nicht-Code-Ausgaben (z. B. Dossier ins `_candidates/`) gilt trotzdem: Claude prüft die
  Fakten gegen die Quelle (belegbar, sonst Block — vgl. `r-report`).
- Untrusted rein ODER mächtig raus, nie beides (Regel 17): kein Web-/Ingest-Material
  ungefiltert mit Schreibrechten weiterreichen.
- Sind beide Kimi-Abos leer und Codex auch: Aufgabe selbst machen (Router guilty until
  proven innocent).
