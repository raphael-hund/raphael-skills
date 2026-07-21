# Verifikations-Vertrag — Verified nur mit Beweis

**Herkunft:** Prinzip destilliert (nicht portiert) aus
`agent-harness` (Repo alirezarezvani/claude-code-skills, `engineering/agent-harness/skills/agent-harness/scripts/loop_controller.py`,
408 Zeilen + `goal_compiler.py`), Lizenz MIT, Rezension R16a/R17
(`raphael-brain/PROGRESS.md`). Das Original ist ein Python-State-Machine-
Harness (init/next/record/verify/close als CLI-Kommandos, JSON-State-Datei,
atomare Writes). **Wir portieren den Code nicht** — unser Loop ist
Cockpit-getrieben (Claude Code als Dauer-Cockpit, kein Python-Prozess, der
Tasks disponiert). Übernommen ist das **Prinzip**, paraphrasiert und auf
unsere Welt (G1/G2-Gates, ultra-loop-Runden) adaptiert.

## Kernregeln

### (a) Verified nur mit aufgezeichnetem Verify-Lauf

Ein Task gilt NIE als verifiziert, weil ein Agent "fertig, funktioniert"
behauptet. Er gilt erst als verifiziert, wenn ein **Verify-Lauf mit
Exit-Code oder Artefakt aufgezeichnet** ist — ein Log, ein Diff, ein
Test-Exit-Code, ein eingefügter Beweis. Im Original erzwingt das die
State-Machine mechanisch: `record --phase verify --exit-code 0` schlägt
ohne `--evidence`-Flag hart fehl ("a passing verify record requires
--evidence naming what was observed — no verification theater"), und
`cmd_verify` führt die Checks selbst per `subprocess` aus statt dem
gemeldeten Exit-Code zu vertrauen (Reward-Hacking-Schutz: der Controller
adjudiziert, nicht der Worker).

Bei uns heißt das: **G1 vor G2, immer** (deterministisch zuerst, kein
Judge auf ungeprüftem Output), und jedes DoneClaim braucht `evidence`
(Datei:Zeile, Log-Ausschnitt, Diff — nie "sieht gut aus"). Eine
Behauptung ohne Beleg zählt nicht als Verdikt.

### (b) Close verweigert ohne Verify oder Waiver

`close` im Original prüft jeden Task: `verified` → ok, sonst blockiert
es (`CLOSE-REFUSED`, Exit-Code 4) — außer der Task ist explizit
**gewaived**: `--waive <id> --reason <warum>`. Ein Waiver ist keine
stille Ausnahme, sondern ein protokollierter, begründeter Entscheid
(`task["waive_reason"]` landet im Handoff). Ohne passenden `--reason`
zu jedem `--waive` schlägt der Befehl selbst fehl.

Bei uns: ein Runden-Abschluss (ultra-loop) darf nicht als "FERTIG"
markiert werden, solange ein Kern-Ergebnis unverifiziert UND ungewaived
ist. Ein Waiver ist zulässig, aber muss im Runden-Protokoll stehen
(warum akzeptiert, wer entscheidet) — nie ein stillschweigendes
Weglassen.

### (c) Retry-Caps + Eskalation statt Fake-Success

Jeder Task hat `max_attempts` (Default 3). Scheitert ein Versuch,
steigt `attempts`; am Limit wechselt der Task-Status zu `escalated`
und der nächste `next`-Aufruf verlangt zwingend Eskalation an einen
Menschen (Exit-Code 2) — der Loop probiert NICHT ewig weiter. Zusätzlich
gibt es einen globalen `max_loop_iterations`-Deckel über alle Tasks
(Default 12); ist er erreicht, eskaliert der gesamte Loop (Exit-Code 5),
unabhängig vom Task-Fortschritt. Die Retry-Logik verlangt außerdem
Ansatzwechsel: "attempt %d/%d failed — change the approach before
retrying (same command + same input = same failure)".

Bei uns: ultra-loop-Runden und G3-Mutationsläufe stoppen bei Plateau
(3 Experimente ohne Verbesserung), nicht endlos. Ein Fix-Agent, der
nach X Versuchen nicht verifiziert bekommt, eskaliert an Raphael/das
Council statt einen Erfolg zu behaupten, den niemand geprüft hat.

## Mapping auf unsere Welt

| Original (loop_controller.py)                     | Unser Äquivalent |
|-----------------------------------------------------|-------------------|
| Task-States `pending→in_progress→verifying→verified` (oder `escalated`/`waived`) | G1 (deterministisch) → G2 (Judge) → **verifiziert** shipbar; sonst `needs-fix`/`needs-human-review` |
| `record --phase verify` verlangt `--evidence`      | DoneClaim braucht `evidence:` (Datei:Zeile/Log/Diff) im Verdikt-Vertrag |
| `cmd_verify` führt Checks selbst per subprocess aus statt dem Worker zu glauben | andere Kontextinstanz prüft (nie Fable prüft Fable, Regel 8); Judge sieht nur den Chat, verlangt "pasted proof" |
| `close` refuse (Exit 4) ohne verified/waived        | Runde gilt nicht als FERTIG, solange ein Kern-Ergebnis unverifiziert+ungewaived ist |
| `--waive <id> --reason <warum>`                     | begründete Ausnahme im Runden-Protokoll (PROGRESS.md), nie stillschweigend |
| `max_attempts` → `escalated`                        | Eskalation an Raphael/Council statt Fake-Success nach X Fehlversuchen |
| `max_loop_iterations` global                        | ultra-loop-Plateau-Stopp (3 Experimente ohne Verbesserung) |
| JSON-State-Datei als Beweis-Log (`state.json`, atomarer Write) | Run-ID (z. B. `wf_70891d18`) im ultra-loop-Runden-Protokoll als Beweis, dass ein Lauf stattfand |

## Beispiel aus dieser Session

**R16b (`wf_70891d18`, PROGRESS.md):** Ein Richter meldete "design fehlt"
als KRITISCH — eine Simulator-Halluzination, kein echter Repo-Defekt. Der
Fix-Agent hat das korrekt als **nicht-fixbar erkannt und NICHTS erfunden
geändert** — er hat die Behauptung verworfen, statt einen Fake-Fix zu
liefern, nur damit der Task als "erledigt" durchgeht. Das ist der
Verifikations-Vertrag in der Praxis: eine unbelegte Behauptung ("design
fehlt") wird nicht durch eine ebenso unbelegte Gegenbehauptung ("gefixt")
geschlossen — sie wird geprüft, als falsch erkannt und protokolliert
("adversariales System greift!"), nicht stillschweigend übernommen.

## Was bewusst NICHT übernommen wurde

- **Kein Python-Harness/State-Machine als Prozess.** Kein `init/next/
  record/verify/close`-CLI, keine JSON-State-Datei, kein `subprocess`-
  Runner, der Checks selbst ausführt. Unser Loop ist Cockpit-getrieben:
  Claude Code selbst orchestriert, entscheidet, ruft Tools — es gibt
  keinen externen Disponenten-Prozess, der Tasks aus einem Plan zieht.
- **Kein `goal_compiler.py`-Keyword-Scoring.** Task-Zerlegung passiert
  bei uns durch das Cockpit/den Workflow selbst (dynamic-workflow,
  ultra-loop), nicht durch deterministisches Tokenisieren eines Goal-
  Strings gegen ein Skill-Manifest.
- **Keine atomaren `os.replace`-State-Writes.** Unser Beweis-Log ist
  `PROGRESS.md` (git-versioniert, für Menschen lesbar) statt einer
  Maschinen-State-Datei mit Crash-Sicherheit.
- **Keine numerischen Exit-Codes als Vertrags-API** (2/4/5/6). Wir
  nutzen den Verdikt-Vertrag (`confirmed | false-positive | needs-fix |
  needs-human-review`) und G1/G2-Gates als unsere Sprache dafür.
