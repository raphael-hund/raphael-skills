---
name: ultra-loop
version: 0.4.0
description: >
  Baut und betreibt einen selbstkritischen Dauer-Loop, der in JEDEM Durchgang
  einen echten dynamischen Workflow (Workflow-Tool) mit vielen Subagents
  startet: Cross-Vendor-Flotte (Sol/Kimi/Luna plus Sonnet/Haiku) findet Schwächen → verifizieren
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
requires_skills: [orchestrate@^0, eval@^0]
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
   (Workflow-Tool) nach references/workflow-vorlage.md", (b) Cross-Vendor-
   Pflicht-Flotte per `agentType`: sol-pruefer=Urteil, kimi-recherche
   (lesend) bzw. kimi-worker (schreibend)=Gegenperspektive,
   luna-worker=Mechanik; Sonnet/Haiku ergänzen, NIE Fable-Subagents,
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
- **Flotten-Wahl ist frei** (seit 25.07.2026). Die frühere Pflicht, Sol *und*
  Kimi *und* Luna zu starten, ist gestrichen — sie war bei Anbieter-Ausfällen
  nicht erfüllbar und hat die Arbeit blockiert. Worker nach Aufgabe und
  Verfügbarkeit wählen; vor dem Start prüfen, welche Routen antworten.
- **Verifier möglichst aus anderer Modellfamilie** als der Schreiber — jetzt
  Empfehlung statt Gate. Geht das nicht, im Protokoll vermerken.
- **Fremd-Baustellen** anderer Sessions nicht anfassen (im Mandat gelistet).
- **Ehrlichkeit:** findet eine Runde nichts Belegbares, wird genau das
  protokolliert — keine Beschäftigungstherapie.
- **Args-Falle:** Listen an Workflows IMMER als echtes JSON-Array übergeben
  UND im Script defensiv parsen (`typeof args === 'string' ? JSON.parse(args)
  : args`) — der häufigste Workflow-Crash.

## Loop-Hygiene (Idempotenz, Abbruch, Cache)

- **Der Runden-Körper muss idempotent sein.** Zweimal dieselbe Runde = derselbe
  Endzustand, kein Doppel-Eintrag im Protokoll, kein zweiter Commit derselben
  Änderung. Vor dem Schreiben prüfen, ob der Fix schon drin ist (`git status`,
  Grep auf die Zielzeile) — Cron-Fires überlappen, Sessions sterben mitten drin.
- **Jede Schleife braucht eine Abbruchbedingung, bevor sie startet.** Mindestens
  eine davon im Mandat festschreiben: Rundenlimit (z. B. 20), Zeitfenster,
  „Stand-Datei hat keinen offenen Punkt mehr", oder N Runden ohne belegbaren
  Fund. Erreicht = `CronDelete`, nicht weiterdrehen.
- **Bail-out bei Wiederholungsfehler:** dreimal dieselbe Runde am selben Punkt
  gescheitert → Loop anhalten und den Blocker im Protokoll benennen, nicht
  Versuch Nr. 4 fahren (debug-Regel).
- **5-Minuten-Cache-Klippe:** der Prompt-Cache lebt nur ~5 Minuten. Ein Intervall
  von 20–30 Minuten trifft IMMER einen kalten Cache — der stabile Teil (Doktrin,
  Skill, Stand-Datei) wird jede Runde neu bezahlt. Konsequenz: pro Fire EINE
  Runde mit Substanz statt vieler Mini-Fires, stabilen Kontext nach vorn
  (Regel 12), und keine Intervall-Verkürzung „für mehr Durchsatz" — die kostet
  nur Tokens.

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
- **Long-Horizon-Klausel (wichtig auf Codex/Kimi, die kein privates
  CLAUDE.md erben):** Loop-/Workflow-Prompts müssen explizit tragen:
  "long horizon session, human is away" — autonom weiterarbeiten, bis Gates
  grün oder Budget/Rundenlimit erreicht ist, bei Unsicherheit nicht stoppen
  und nicht auf Rückfrage warten. Rot-Klassen bleiben bindend: keine
  Fremd-Baustellen oder Reward-Hacking; vor dem Abschluss-Commit kurzer
  Selbst-QA-Check gegen die Gates, dann erst „fertig“ protokollieren.
