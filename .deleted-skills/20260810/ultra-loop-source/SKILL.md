---
name: ultra-loop
version: 0.4.0
description: >
  Baut und betreibt einen selbstkritischen Dauer-Loop, der in JEDEM Durchgang
  einen echten dynamischen Workflow (Workflow-Tool) mit vielen Subagents
  startet: Worker-Flotte (Sol/Kimi/Luna/Sonnet/Haiku, frei nach Verfügbarkeit) findet Schwächen → verifizieren
  → fixen → Gates grün → committen/pushen → Stand fortschreiben. Trigger:
  "/ultra-loop", "Loop mit Workflows", "Dauer-Verbesserungs-Loop",
  "selbstkritischer Loop", "loop der sich verbessert", "ultracode-Loop".
class: O
scope: agency
sensitivity: internal
source: >
  eigene Praxis 2026-07-20 (Skill-Harvest-/Router-Umbau-Session) + Muster aus
  goal-loop (Ralph-Loop-Kontrakt), autoresearch (Baseline→Mutation→Score),
  llm-council (anonymes Peer-Ranking bei Streit) — alles paraphrasiert.
loads:
  - references/workflow-vorlage.md
  - references/runden-protokoll.md
  - references/retro-muster.md
provenance: >
  Eigene Praxis (Skill-Harvest-/Router-Umbau-Session 2026-07-20), Muster
  paraphrasiert aus goal-loop (Ralph-Loop-Kontrakt), autoresearch
  (Baseline-Mutation-Score) und llm-council (anonymes Peer-Ranking bei Streit).
  Kein fremder Code uebernommen — siehe auch das source-Feld unten.
requires_skills: [orchestrate@^0, eval@^0]
# Wie tief ist dieser Skill geprueft? Die Zahl ist an einen Lauf gebunden —
# UmfangTest in scripts/test_validate_workflow.py reisst, wenn sie faellt.
eval_scorecard:
  stand: 2026-07-30
  laeufe:
    - "scripts/test_validate_workflow.py — 19 Tests: alle sieben Validator-Regeln, jede in beide Richtungen"
    - "darin SabotageTest: merkt der Test es, wenn der Validator kaputtgeht?"
    - "darin UmfangTest: hat die Testdatei noch alle 19 Tests?"
  grenzen:
    - "Geprueft ist der Workflow-VALIDATOR, nicht der Loop selbst — ob eine Runde etwas Sinnvolles findet, misst kein Test"
    - "Der Loop startet echte Subagent-Flotten; ein gruener Testlauf sagt nichts ueber deren Ergebnis"
completion_criteria:
  - "Cron-Job existiert (CronList zeigt ihn) und der Prompt enthält das Workflow-Pflicht-Mandat"
  - "Jede Runde mit Substanz-Arbeit hat einen Workflow-Run (Run-ID im Runden-Protokoll) — keine Solo-Runden außer Kleinst-Fixes"
  - "Nach jeder fertigen Verbesserung: Gates grün (validate/build-index bzw. brain-Gates) + chirurgischer Commit gepusht"
  - "Runden-Protokoll in PROGRESS.md ('## Skill-Loop') ist nach jeder Runde fortgeschrieben"
---

# ultra-loop — Dauer-Loop, der jede Runde einen dynamischen Workflow startet

## Zweck (1 Satz)

Ein Loop, der sich selbst kritisiert und verbessert — und zwar **verbindlich**
über echte dynamische Workflows mit Subagent-Flotten, nicht über Solo-Arbeit
des Cockpits.

## Warum dieser Skill existiert (das Problem)

Ein nackter `/loop`-Prompt garantiert NICHT, dass jede Runde einen Workflow
startet — das Cockpit-Modell entscheidet frei und arbeitet gern "mal eben
selbst". Dieser Skill macht den Workflow-Start zur **Pflicht-Mechanik**:
Der Cron-Prompt trägt das Mandat, die Vorlage liegt bereit, das Protokoll
erzwingt die Run-ID als Beweis.

## Aufbau (3 Schritte beim Aktivieren)

1. **Mission klären** (aus Nutzer-Input, nicht nachfragen wenn ableitbar):
   WAS wird verbessert (Repo/Skill/Wiki-Bereich), welche GATES müssen grün
   bleiben, was ist TABU (Fremd-Baustellen, `git add -A`, Reward-Hacking).
2. **Cron anlegen** (CronCreate, Standard alle 20–30 Min, Session-only):
   Der Prompt MUSS enthalten: (a) Pflicht "starte einen Workflow
   (Workflow-Tool) nach references/workflow-vorlage.md", (b) Worker per
   `agentType` frei nach Aufgabe und Verfügbarkeit wählen (sol-pruefer=Urteil,
   kimi=Gegenperspektive, luna-worker=Mechanik, Sonnet/Haiku ergänzen) —
   keine Pflicht-Kombination mehr, aber NIE Fable-Subagents,
   (c) Stand-Datei lesen+fortschreiben, (d) Commit/Push-Regel,
   (e) "EINEN Punkt tief und fertig, nicht zehn anfangen".
3. **Runde 1 sofort ausführen** — nicht auf den ersten Cron-Fire warten.

## Die Runden-Mechanik (jede Runde gleich)

0. **Working-Tree prüfen** (`git status`): unbestätigte Reste einer
   abgebrochenen Vorrunde (Session-Tod, Cron-Timeout, Workflow-Abbruch
   zwischen Fixen und Committen) erst einordnen — committen (wenn erkennbar
   fertig und verifiziert) oder verwerfen (wenn halb/unklar) — bevor neue
   Arbeit beginnt. Ergebnis als `ABGEBROCHEN R<N>`-Eintrag protokollieren
   (siehe `references/runden-protokoll.md`), dann erst Schritt 1.
1. **Stand lesen:** `PROGRESS.md` → Abschnitt `## Skill-Loop` (oder die im
   Mandat genannte Stand-Datei). Nächsten offenen Punkt wählen.
2. **Workflow starten** (Pflicht bei Substanz-Arbeit): Script nach
   `references/workflow-vorlage.md` bauen — Kritik-Flotte, Verifikation,
   Fix-Kette, Review. Vor dem Start: `python3 scripts/validate-workflow.py
   <script>` — rot (FAIL) = nicht starten, erst fixen. Run-ID notieren.

   > **Der Validator hat sieben Prüfer; bis 30.07.2026 waren vier davon
   > ungetestet** — ausgerechnet die, die vor den drei Fehlern schützen, die
   > laut `workflow-vorlage.md` wirklich passiert sind: `Date.now()`/
   > `Math.random()` brechen Resume, `args` ohne defensives Parse crasht,
   > `JSON.stringify(...).slice(0, N)` kappt Daten still (3× real, R13/R15).
   > `python3 scripts/test_validate_workflow.py` deckt jetzt alle sieben ab
   > (19 Tests statt 3), jeweils in **beide** Richtungen: `new Date(args.stamp)`
   > und `JSON.stringify(x)` ohne `.slice` müssen **durchgehen**, sonst wäre der
   > Validator auch durch „melde immer" erfüllbar und macht Zeitstempel
   > unmöglich.
   >
   > Ein Meta-Test prüft zusätzlich, dass **jede** `check_*`-Funktion in der
   > Testdatei namentlich vorkommt. Ohne ihn fällt ein achter, ungetesteter
   > Prüfer nicht auf — genau der Zustand, in dem vier von sieben waren.
3. **Selbst verifizieren:** Funde der Kritiker nie ungeprüft übernehmen —
   jeden Kern-Fund mit eigenem Read/Bash-Beleg bestätigen (kein performatives
   Zustimmen). Bei echtem Streit zwischen Kritikern: llm-council-Muster
   (anonymes Peer-Ranking über orchestrate), nicht den Nutzer fragen.
4. **Fixen:** chirurgisch, nur verifizierte Funde.
5. **Gates grün:** die im Mandat genannten (z. B. `validate-skill.py`,
   `build-index.py`, `candidate-provenance.py`, `wiki-lint.sh`).
6. **Committen + pushen:** nur konkret bearbeitete Pfade (NIE `git add -A` —
   Parallel-Sessions!), aussagekräftige Message. **Vor jedem Push den
   ahead-Stand prüfen** (`git status -sb`): Sitzen fremde ungepushte Commits
   unter dem eigenen, würde ein Push deren Push-Gate (z.B. Sol-PASS der
   Brain-Loop-Session) umgehen — dann eigenen Commit zurückstellen oder auf
   deren Push warten, nie durchpushen (Lektion R29).
7. **Protokoll fortschreiben:** nach `references/runden-protokoll.md`
   (Runde, Workflow-Run-ID, Agentenzahl, Funde→Fixes, Commits, Nächstes).

## Harte Regeln (Rot-Linien)

- **Kein Workflow = keine Substanz-Runde.** Nur Kleinst-Fixes (<5 Min, eine
  Datei) dürfen solo laufen — und werden im Protokoll als solche markiert.
- **Kein Reward-Hacking:** nie Checks/Lints aufweichen, Sektionen leeren oder
  Wissen erfinden, um grün zu werden. Gleichstand nach Änderung = revertieren
  (autoresearch-Regel).
- **Nie Fable-Subagents** — Fable bleibt Cockpit.
- **Flotten-Wahl ist frei** (seit 25.07.2026). Die frühere Pflicht, in jeder
  Substanz-Runde Sol *und* Kimi *und* Luna zu starten, ist gestrichen — sie war
  bei Anbieter-Ausfällen nicht erfüllbar und hat die Arbeit blockiert. Wähle die
  Worker nach Aufgabe und Verfügbarkeit. Prüfe vor dem Start, welche Routen
  tatsächlich antworten, statt eine tote Flotte anzufordern.
- **Verifier möglichst aus anderer Modellfamilie** als der schreibende Agent —
  jetzt Empfehlung statt Gate. Geht das nicht (Ausfall, Quota), im Protokoll
  vermerken, dass die Prüfung familienintern lief.
- **Fremd-Baustellen** anderer Sessions nicht anfassen (im Mandat gelistet).
- **Ehrlichkeit:** findet eine Runde nichts Belegbares, wird genau das
  protokolliert — keine Beschäftigungstherapie.
- **Args-Falle:** Listen an Workflows IMMER als echtes JSON-Array übergeben
  UND im Script defensiv parsen (`typeof args === 'string' ? JSON.parse(args)
  : args`) — der häufigste Workflow-Crash.

## Stoppen

`CronDelete <job-id>` (steht im Protokoll-Kopf). Der Loop stirbt sonst mit der
Session bzw. nach 7 Tagen Auto-Ablauf. Für sessionübergreifende Loops:
`/schedule` (Cloud) statt Session-Cron.

## Gotchas

- Cron-Jobs sind **session-only**: Session zu = Loop weg. Das ist gewollt
  (Kontrolle), im Protokoll-Kopf steht deshalb immer Job-ID + Anlagezeit.
- Workflow-Scripts: `meta` als pures Literal, kein `Date.now()`/
  `Math.random()`, `pipeline()` als Default, Barrieren nur mit Grund.
- 63 parallele Schreiber sind ok, wenn jeder eine ANDERE Datei schreibt —
  zwei Agenten auf derselben Datei sind ein Race (Worktree-Isolation nutzen
  oder sequenzieren).
- Der Verify-Schritt gehört in den Workflow (haiku je Artefakt), aber die
  Letzt-Verifikation der Kern-Funde macht das Cockpit selbst.
- `check_model_fable` in `scripts/validate-workflow.py` ist nur eine
  Text-Heuristik, kein hartes Gate: sie erkennt das Literal
  `model:'fable'` case-insensitiv, aber Verschleierung per
  Variablen-Concat (`const m='fa'+'ble'`) kann ein statischer Check
  prinzipbedingt nicht fangen. Genau dafür ist die Cockpit-
  Letztverifikation oben da — sie ist die eigentliche Grenze gegen
  Fable-Subagents, nicht der Regex. Backtick-Template-Strings (Kritiker-
  Agent-Prompts) werden vor dem Match maskiert, damit ein Prompt-Text,
  der das Fable-Verbot nur zitiert, keinen False-Positive-FAIL auslöst —
  echte Konfiguration in `'...'`/`"..."` wird weiter erkannt.
