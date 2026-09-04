---
name: orchestrate
version: 2.6.0
description: >-
  Coordinate multi-step, website, visual, or mass work with Dynamic Workflows
  and Tasks. Spawn Fable (fable-builder), Opus, Grok and Sol subagents; Luna
  for mass. Every build package runs the Qualitaetsschleife (G1 → foreign
  judge with score → retry ≤3 → escalate); Raphael only sees PASS or escalate.
  Trigger: "orchestrieren", "delegieren", "Workflow", "Tasks", website,
  Landingpage, Screenshots, visuelle QA, Unterseiten, Masse, Serie,
  "Controller-Session", "Loop", "Graph", "Gauntlet", "Council", or
  "GRUENDLICH" / "gründlich in einem Durchlauf".
class: O
scope: agency
sensitivity: internal
source: >
  Konsolidierung 03.08.2026 (Raphael-Ansage "nur EIN orchestrate"): vereinigt
  die früheren Skills orchestrate 0.5.0, dynamic-workflow 0.2.0, ultra-loop
  0.4.0 und graph 0.1.0. Muster-Herkunft: llm-council (anonymes Peer-Ranking,
  Idee), shannholmberg Graph-Engineering (Nodes/Routen/Checkpoints/Gates,
  paraphrasiert), Gauntlet Loop von Matt Shumer (somethingbig.ai, Ideen-Merge
  ohne Vendoring), eigene Praxis aus 11 Workflow-Runden 2026-07-20.
loads:
  - references/dispatch.md
  - references/qualitaetsschleife.md
  - references/cross-model-harness.md
  - references/stages.md
  - references/gruendlich.md
  # Branch-spezifische References (muster-wahl, workflow-vorlage, gauntlet-loop, council, etc.) werden nur bei Bedarf nachgeladen — siehe Zweige unten.
requires_skills: [eval@^0]
completion_criteria:
  - "Bei mehr als einem isolierbaren Paket lief ein Dynamic Workflow plus Tasks"
  - "Flotte nur über agentType: fable-builder/fable-advisor, opus-builder/opus-critic, sol-builder/sol-pruefer, grok-worker/grok-critic/visual-kritiker, luna-worker für Masse, terra-bulk (Kimi tot)"
  - "Vor jedem Fan-out lief scripts/preflight.sh <worktree>: jede Familie OK/DOWN belegt, kein fremder Run im Worktree, Leaf-Budget bekannt; Pakete nach Budget geschnitten (Bau-Paket ≤ 2–3 Routen, Zeitbudget im Prompt)"
  - "Jedes Bau-Paket lief durch die Qualitaetsschleife (references/qualitaetsschleife.md): G1-Exit 0 vor dem Judge, Judge anderer Familie mit Score je Dimension und VETO-Frage, ≤3 Runden, sonst ESCALATE — kein Artefakt erreicht Raphael ohne PASS oder ESCALATE"
  - "Worker sind Leaves: null Nachkommen, null Provider-CLIs, Rückgabe Verdict plus Pfad — keine PNGs im Parent"
  - "Jeder Auftrag nennt Ziel, Scope, Negativentscheidungen, Gate, Stop und erlaubte Pfade"
  - "Unabhängige Pakete parallel, abhängige geordnet; shared UI hat einen Opus-Integrator"
  - "Deterministische Checks liefen vor einer familienfremden Modellprüfung"
  - "Höchstens eine Review-Fixrunde; derselbe Infrastrukturfehler höchstens einmal erneut"
  - "Kern-Ergebnisse wurden vom Controller am Artefakt nachverifiziert, ohne Screenshot-Binaries in die Hauptsession zu ziehen"
  - "Providerfehler zählen als BLOCKED, nie als PASS und lösen keine Agentenwelle aus"
  - "Bei GRAPH: mindestens ein Gate ist ein externer Anker (Test, Lint, Screenshot-Diff, Live-Signal)"
  - "GAUNTLET und COUNCIL laufen nur nach wörtlicher Nutzerwahl und mit festem Budget"
  - "Bei GRUENDLICH: Mission eingefroren, volle Queue gefahren, Zwischenmeldung nur bei BLOCKED/Rot-Klasse/Budget"
---

# orchestrate — der eine Orchestrierungs-Skill

**Lies zuerst:**
[`AGENTS.md`](/root/raphael-command-center/AGENTS.md) (Regeln 2, 7, 8, 17, 18),
[`ROUTING.md`](/root/raphael-command-center/ops/ROUTING.md),
[`MODELL-MATRIX.md`](/root/raphael-command-center/ops/MODELL-MATRIX.md),
[`HARNESS-ROUTER-MATRIX.md`](/root/raphael-command-center/ops/HARNESS-ROUTER-MATRIX.md).

## Zweck (1 Satz)

Ein dünner Controller hält Auftrag und Queue stabil, startet Dynamic Workflows
und Tasks großzügig und lässt Leaves die Arbeit in eigenem Kontext erledigen.

## Schritt 1 — Betriebsart wählen (immer zuerst, immer ansagen)

| Betriebsart | Wann | Kern |
|---|---|---|
| **SOLO** | eine zusammenhängende Mini-Änderung ohne isolierbare Teile | Hauptagent baut und prüft deterministisch |
| **EINMAL** | ein unabhängiges Arbeitspaket braucht eigenen Kontext | genau ein Leaf, danach Controller-Prüfung |
| **WORKFLOW** | >1 isolierbares Paket, Website, visuelles QA, Masse | Dynamic Workflow plus Tasks; Default |
| **SEQUENZ** | abhängige Items mit gemeinsamem write_set | eine sichtbare Session je abhängigem Item |
| **LOOP** | ausdrücklich gewünschter Dauerbetrieb | eine Runde zur Zeit, feste Stopbedingung |
| **GRAPH** | Arbeit kehrt wieder (wöchentlich, je Kunde) | Karte vorab zeichnen, dann fahren (Schritt 6) |
| **GAUNTLET** | Nutzer nennt Gauntlet ausdrücklich | begrenzter Vergleich mit Messlatte |
| **COUNCIL** | Nutzer nennt Council ausdrücklich | begrenzte unabhängige Zweitmeinungen |
| **GRUENDLICH** | Nutzer will einen gründlichen Durchlauf ohne Feedback-Schleifen | volle Stage-Queue, Meldung nur am Ende / bei BLOCKED |

Für Websites mit mehreren Routen ist **WORKFLOW** der Default: unabhängige
Seiten als parallele Tasks, gemeinsame UI bei einem Integrator (`fable-builder`
wenn Qualität vor Kosten geht, sonst `opus-builder`).
Aussagen wie „mach alles“, „richtig gut“, „perfekt“, „autonom“ oder „bis es
fertig ist“ genehmigen den Workflow-Default, nicht Gauntlet, Council oder Cron.
Worker bleiben Leaves. Mischformen werden nicht automatisch kombiniert.

## Schritt 0 — Preflight (immer, vor dem ersten `agent()`)

```bash
bash /root/.claude/skills/orchestrate/scripts/preflight.sh <worktree-oder-arbeitsordner>
```

Liefert je Familie OK/DOWN über die tatsächliche Base-URL der Session, das
Leaf-Budget (`RAPHAEL_SUBAGENT_MAX_SECONDS`/`MAX_TOOLS`) und ob ein fremder Run
im Worktree läuft. Regeln:

- DOWN-Familie → im Script als `BLOCKED` behandeln, Fallback rollenkompatibel
  laut `dispatch.md`, sichtbar `FALLBACK` im Label. Kein 6×3-Minuten-Stall.
- Fremder Run im Worktree → erst stoppen lassen (Session-Nachricht + Bestätigung),
  dann starten. Ein Worktree hat einen Owner-Run.
- Pakete nach Budget schneiden: Bau-Paket ≤ 2–3 Routen bzw. ≤ 40 Minuten Arbeit,
  Zeitbudget und `StructuredOutput`-Pflicht 5 Minuten vor Ablauf im Prompt.
  Vier Opus-Leaves à 5 Routen starben am 04.09.2026 alle bei 3601 s ohne Beleg.
- Neu angelegte `agentType`s sieht erst die nächste Session (Registry-Snapshot).

## Schritt 1a — Stages und Task-Queue

Für EINMAL, SEQUENZ, LOOP, GRAPH, GAUNTLET und GRUENDLICH führt der Controller
eine eingefrorene, auflistbare **Task-Queue** mit den fünf Stages **Planen →
Zuteilen → Steps ausführen → Verify → Review**. Format, Statusübergänge und
Failover-Routing: [`references/stages.md`](references/stages.md). SOLO braucht
keine Stage-Queue.

## Schritt 1b — GRUENDLICH (ein Durchlauf, keine Feedback-Schleifen)

GRUENDLICH ist die Betriebsart für "einmal gründlich statt oft nachfragen":
Mission einfrieren, Queue bauen, alle Stages durchfahren, **einmal** am Ende
melden. Zwischenmeldungen nur bei BLOCKED, Rot-Klasse oder erreichtem Budget —
Routenausfälle mit funktionierendem Ersatz werden protokolliert, nicht gemeldet.
Kontrakt und Anti-Muster: [`references/gruendlich.md`](references/gruendlich.md).

## Harte Standardbudgets

- Controller in der Hauptsession: **1** (dünn, keine Screenshot-Reads)
- Dynamic Workflow: **Default** bei >1 isolierbarem Paket, Website, visuellem QA oder Masse
- parallele Leaf-Tasks: so viele wie isolierbare Pakete; `workflowSizeGuideline` ist **unrestricted**; `fable-builder` maximal zwei gleichzeitig (Sitze), weitere Pakete in Wellen oder auf `opus-builder`
- Nachkommen pro Worker: **0**
- Reviewer nach **Bau:** **genau 1** familienfremde Prüfung pro gebautem Paket (`dispatch.md`)
- **Kritik-Session (kein Bau):** Flotte nach `web/references/kritik-matrix.md` —
  PAGE×2 + SITE-Achsen + LINSEN, Überlappung Absicht, Merge-Regel dort. Das ist
  kein Council und kein „ein Kritiker pro Paket“.
- Review-Fixrunden: **1** nach Bau. Kritik selbst baut nicht.
- gleiche Infrastruktur-Wiederholung: **1**
- Council nur auf wörtliche Ansage. Kritik-Matrix ist kein Council.
- Luna: nur `luna-worker` für Masse/Serie, nie für Entscheidungen

Ein Worker darf das Budget nicht selbst erhöhen und keine Kinder starten.
Gauntlet/Council brauchen weiter eine wörtliche Nutzerwahl.

## Schritt 2 — Rollen und Flotte

**Profil zuerst:** `/root/.claude/fleet-profile` sagt, welche Flotte gilt
(fehlt die Datei: `multi-family`). Im Profil `claude-only` sind nur Opus
(Bau, Copy im eigenen Copy-Leaf, Technik, Migration), Sonnet (read-only
Kritik, Review, Recherche) und Haiku (Masse, Serie, Ledger — nie Urteil)
als Subagent verfügbar; Kimi/Grok/Sol/Luna/Terra sind dort `BLOCKED`.
Besetzung und Kritiker-Zuordnung je Profil: `references/dispatch.md`.

- **Leader** = Cockpit (Fable, Fallback Opus 1M): zerlegt, dispatcht,
  destilliert, verifiziert am Ende selbst. Nur an 2–3 Checkpoints. Der
  Leader baut nie selbst (Kontext 300k+, seriell, Cache); Fables Bauleistung
  kommt über `fable-builder`-Leaves mit frischem Kontext.
- **Fable-Advisor** = `fable-advisor` mit `effort: low`: schärft an benannten
  Checkpoints Kriterien. Er schreibt keinen Code, startet keine Kinder und
  prüft den eigenen Lauf nicht. Die Opus-Pakete startet der Workflow, so
  viele unabhängige wie die Arbeit hat.
- **Worker:**
  - `opus-builder` — Frontend, Substanz, ein UI-Integrator
  - `fable-builder` — Fable 5.1 als Builder-Leaf (Raphael 04.09.2026): Frontend,
    Integration, harte Fixes mit vollem Paketkontext; `effort: high`, max zwei
    parallel; Review danach Fremdfamilie, Fallback `opus-critic` mit Label
    `Instanz-Trennung, gleiche Familie`
  - `sol-builder` — Backend, Gate-Code, einziger Copy-Writer (Kimi tot, 03.09.2026)
  - `grok-worker` — technische Fixes, Debugging, harte Engineering-Pakete (kluger Generalist)
  - `luna-worker` — Masse, Serie, mechanische Listen
    (**nur `work_type: mass`**, nie für Entscheidungen oder Substanz-Bau)
  - `terra-bulk` — Architektur, große Migrationen über viele Dateien
- **Kritiker** (immer andere Familie als der Builder, frische Session, read-only):
  - `opus-critic` — Code, Frontend, UX, Copy
  - `sol-pruefer` — Code, Architektur, Security, Ship-Gate
  - `grok-critic` — technisches Urteil, Root-Cause
  - `visual-kritiker` — Screenshots und gerenderte Artefakte (Verdict plus Pfad, nie PNG)

**Cross-Model ist der Default sobald mehr als ein Paket läuft.** Ein einzelnes
Mini-Paket darf ein Builder allein zu Ende führen. Sobald gebaut wurde, prüft
genau eine andere Providerfamilie read-only. Die Prüfung ist kein zweiter Bau
und startet keine Nachkommen. Für dieses Gate zählen Luna/Sol/Terra als GPT,
Opus als Claude, dazu Kimi und Grok.

Isolierbare Massenarbeit geht nur dann an `luna-worker`, wenn sie ein einziges
klar begrenztes Paket bleibt. Sie wird nicht pro Datei oder Screenshot gefächert.
**Opus nur über `opus-builder` oder `opus-critic`**, nie als roher
`model:`-Override. Fable als Worker nur über `agentType:'fable-builder'`
(Raphael 04.09.2026: Frontend-Bau, Integration, harte Fixes; `effort: high`,
maximal zwei parallel, nie Reviewer); daneben `fable-advisor` read-only.
Rohe Fable-Modell-Spawns auf anderen agentTypes bleiben verboten. Zuteilung je Aufgabenklasse,
Harness-Wahl (Terminal/Desktop/Codex-nativ/Kimi-nativ) und Degraded-Pfade:
`references/cross-model-harness.md`. Auftragskontrakt: `references/dispatch.md`.

Router-Kurzform: zusammenhängende Mini-Änderung → SOLO · mehrere Pakete/Seiten/
Shots → Dynamic Workflow + Tasks · Frontend-Substanz/Integration/harter Fix →
`fable-builder` (Qualität) oder `opus-builder` (Breite) · Backend/Gate/Copy →
`sol-builder` · technischer Fix/Debug → `grok-worker` · Masse/Serie →
`luna-worker` · Bulk/Migration → `terra-bulk` · danach je Paket die
Qualitätsschleife mit Judge anderer Familie laut `dispatch.md`. Kimi tot.
Quota-Fehler = weiterlaufen, das Gateway rotiert; sichtbarer Nicht-Fallback ist
ein Vorfall. Grok 4.6 ist als Route freigegeben (CLIProxy 8318,
xAI-OAuth) — Cockpit-Preset für Raphaels direkte Ansprache und `grok-worker` als
vierte Familie.

## Schritt 3 — Einmal-Lauf (EINMAL)

1. Auftrag, erlaubte Pfade, Negativentscheidungen, Gate und Stop festhalten.
2. Genau einen Worker starten. Sein Prompt verbietet Nachkommen und Item-Wechsel.
3. Auf Abschluss oder konkreten Blocker warten.
4. Der Controller prüft Diff, Tests und echtes Artefakt.
5. Bei einer belegten Lücke folgt genau ein Follow-up in derselben Session.
6. Danach PASS, BLOCKED oder menschliche Sichtabnahme; keine Ersatzwelle.

## Schritt 4 — Was jeder Subagent-Auftrag enthält

`agentType` (oder MODELL+EFFORT) · ROLLE · HARNESS · AUFGABE (ein Paket, ein
Output) · INPUT (nur Task-Ausschnitt, TB2) · OUTPUT · GATE · TRUST ·
`write_set`. Subagenten starten blind — der volle
Auftrag gehört in den Prompt; Rückgabe ist Ergebnis oder kurze Zusammenfassung,
nie ein Rohdump und nie ein Bild. Jeder Auftrag enthält wörtlich: „Du bist ein Leaf-Worker. Starte
keine Subagenten, Tasks, Workflows, Provider-CLIs oder Nachkommen. Wechsle nicht
zu einem anderen Item. Gib PASS/FAIL, Dateipfade und eine kurze Begründung zurück —
keine PNGs, kein Base64, keine Transkripte. Bitte den Controller nur bei einer materiellen
Produktentscheidung.“

## Schritt 4a — Qualitätsschleife (jedes Bau-Paket, keine Ausnahme)

Slop ist ein Systemproblem, kein Prompt-Problem. Deshalb lebt die Prüfung im
Paket: **Bauen → G1 deterministisch → Judge anderer Familie mit Score →
unter Schwelle zurück an denselben Builder mit ≤3 Notizen → max 3 Runden →
sonst ESCALATE.** Raphael sieht nur PASS oder ESCALATE. Rubrik = 3–6
Ja/Nein-Fragen aus unserer besten Arbeit, Frage 1 `[VETO]`, Score je
Dimension, nie nur Aggregat. Baustein `mitSchleife()` und Domänen-Anker:
[`references/qualitaetsschleife.md`](references/qualitaetsschleife.md).
Die „eine Review-Fixrunde“ aus den Standardbudgets ist die Runde **nach** der
Schleife (Site-weite Kritik), nicht ihr Ersatz.

## Schritt 5 — Dauer-Loop (LOOP)

LOOP braucht eine ausdrückliche Nutzerwahl. Vor dem Start stehen Ziel, Gate,
Runden- oder Zeitlimit und Providerfehler-Regel fest. Jede Runde besitzt genau
einen Worker. Ein Cron oder systemd-Timer ist keine implizite Erlaubnis.

Runde: Status lesen → ein Item wählen → ein Worker → deterministische Checks →
Controller-Prüfung → Journal → Stopbedingung. Danach erst die nächste Runde.
Keine Familienvollbesetzung, keine Child-Aufträge und keine Kritikflotte.

## SEQUENZ — eine Session je Unterseite

Für mehrere Unterseiten, Ansichten oder Assets gilt der Vertrag in
[`loop-primitive.md`](/root/raphael-skills/skills/eigene/orchestrate/references/loop-primitive.md),
mit parallelen unabhängigen Pages über Dynamic Workflow.

1. Controller ermittelt die vollständige Route-/Item-Liste einmal und friert sie ein.
2. Unabhängige Items mit disjunktem `write_set` laufen als parallele Tasks, so viele wie nötig.
3. Abhängige Items oder shared UI bleiben SEQUENZ bei einem `opus-builder`-Integrator.
4. Jede Task ist Leaf: ein Paket, kein Kind, Rückgabe Verdict plus Pfad.
5. Der Controller prüft Diff, Route und Gates am Artefakt, ohne PNGs in die Hauptsession zu ziehen.
6. Eine konkrete Lücke geht als Follow-up an dieselbe Task.
7. Zwei gleiche Fehler oder unklarer gemeinsamer Scope stoppen als `BLOCKED`.

```javascript
const independent = items.filter(i => i.disjoint)
const dependent = items.filter(i => !i.disjoint)
const results = []
results.push(...await Promise.all(independent.map(runOneItem)))
for (const item of dependent) {
  results.push(await runOneItem(item))
  if (results.at(-1).status === 'BLOCKED') break
}
```

## Schritt 6 — Gezeichneter Graph (GRAPH)

Für wiederkehrende Arbeit die Karte **vorab** zeichnen:

1. **Nodes** — Stationen (research, brief, draft, score, publish), je mit
   Worker (`agentType`), Kontext-Pack, Output-Schema.
2. **Routen** — erlaubte Wege, auch rückwärts.
3. **Checkpoints** — Prüfung je Route: PASS vorwärts, FAIL zurück zum benannten
   Node. Später Fehlschlag routet meist WEIT zurück (Ranking-Miss → Research,
   nicht Draft).
4. **Gates** — unüberspringbar. **Mindestens ein Gate ist ein externer Anker**
   (Testlauf, Lint, Screenshot-Vergleich, Lighthouse, Live-Signal) — reine
   Agenten-Rubriken bestehen sich selbst.
5. **Frozen Rules** — wenige Regeln, die kein Node umschreibt (Brand-Voice,
   verbotene Claims, Rot-Klassen); wandern wörtlich in JEDEN Node-Prompt.

Karte als `graphs/<name>.graph.md` speichern (Format:
`references/graph-vorlage.md`), Kontext je Node nach
`references/kontext-packs.md`, Loop-Typen je Node in
`references/loop-typen.md`. Dann Script generieren, validieren, starten.
Brach ein Node → genau diesen Node in der Karte nachschärfen; die Karte ist
die Quelle der Wahrheit, das Script nur Kompilat. Rückrouten immer mit
Rundenlimit (Default 3).

## Schritt 7 — Gauntlet gegen eine Messlatte (GAUNTLET)

Nur wenn der Nutzer `Gauntlet` oder `orchestrate-gauntlet` ausdrücklich nennt.
Vage Qualitätswörter aktivieren diesen Modus nicht.

1. **Messlatte** festlegen — konkret und **inspizierbar** (echte Screenshots
   einer Best-in-Class-Seite, die Referenz-Anzeige, eine Testsuite, ein
   Latenz-Budget).
2. Budget festlegen: standardmäßig ein Builder, ein optionaler Reviewer,
   eine Review-Fixrunde, 45 Minuten, null Nachkommen.
3. Stücke strikt nacheinander bearbeiten.
4. **Kritiker-Kontrakt:** urteilt am **echten Artefakt** (Screenshot, laufende
   Seite, echte Testausgabe) — nie an der Zusammenfassung des Builders. Blind
   A/B gegen die Latte. Rückgabe: `GEWINNER:` · **genau EINE** größte Lücke ·
   `BELEG:`.
5. Nach einer Lücke genau ein Follow-up an denselben Builder.
6. Dann PASS, BLOCKED oder menschliche Abnahme. Keine Welle 2.

Details: [`orchestrate-gauntlet`](/root/raphael-skills/skills/eigene/orchestrate-gauntlet/SKILL.md).

## Schritt 8 — Council und adversariales Distill (Streitfragen)

**Council** läuft nur auf ausdrücklichen Nutzerwunsch. Dann antworten höchstens
3 Modellfamilien unabhängig
in frischen Sessions → Antworten werden **anonymisiert** und gegenseitig
gerankt (striktes `FINAL RANKING:`) → der Leader synthetisiert als Chairman:
Konsens / Dissens / blinde Flecken / eine Empfehlung / ein erster Schritt.
Kein Council erzeugt Nachkommen oder eine zweite Angriffsrunde.

## Harte Modell-Grenzen (14.08.2026)

- `haiku-worker` ist verboten und stillgelegt.
- Masse, Massen-Lesen, Parsen und billige Klassifikation laufen über `luna-worker`.
- Jedes gebaute Paket bekommt genau einen Kritiker: im Profil `multi-family`
  aus einer anderen Familie, im Profil `claude-only` eine frische
  Sonnet-Instanz mit dem sichtbaren Label `claude-only, Instanz-Trennung`
  (`references/dispatch.md`). Keine Kritikerflotte, kein Self-Review.
- Kein Modell wird nur eingesetzt, damit eine Familie vertreten ist.
- Ein Providerfehler startet weder Ersatzkritiker noch zusätzliche Builder.

## Harte Regeln (Rot-Linien)

- **Ein Owner pro Arbeitspaket.** Parallel nur bei disjunktem `write_set`.
- **Keine Nachkommen.** Worker starten keine Agenten, Tasks oder Workflows.
- **Parent bleibt dünn.** Keine Screenshot-Binaries, keine Higgsfield-PNGs, keine Transkript-Dumps in die Hauptsession.
- **Opus nur über `opus-builder` oder `opus-critic`**, nie als roher `model:`-Override.
  Sonnet und Haiku nie als Subagent — gilt im Profil `multi-family`; im Profil
  `claude-only` sind sie die Kritik- bzw. Massenrolle (`references/dispatch.md`).
  Fable als Worker nur über `fable-builder` (high, max zwei parallel, keine
  Children, nie Self-Review); `fable-advisor` bleibt read-only auf low effort.
- **Kein Reward-Hacking:** keine Checks aufweichen, keine Tests löschen oder
  überspringen, nichts erfinden, um grün zu werden. Gleichstand nach Änderung
  = revertieren.
- **Quarantäne (Regel 17):** untrusted rein ODER mächtig raus, nie beides.
- **Keine Roast-Pflicht.** Ein Reviewer ist risikobasiert, nicht ritualisiert.
- **Rot-Klassen bleiben Raphael** — ein Publish-Node endet an der
  Review-Inbox, nie am Live-Schalter.
- **Git:** nur konkret bearbeitete Pfade stagen (nie `git add -A`);
  committen/pushen nur auf Anordnung.
- **Ehrlichkeit:** findet eine Runde nichts Belegbares, wird genau das
  protokolliert — keine Beschäftigungstherapie.

## Gotchas

- **Args-Falle** ist der häufigste Crash — Listen als echtes JSON-Array
  übergeben UND im Script defensiv parsen.
- **Slice-Falle:** große Zwischenergebnisse nie per `.slice(0,N)` weiterreichen
  — alles über ~8k Zeichen als Datei ablegen und den PFAD übergeben.
- `parallel()` ist eine **Barriere** — nur wenn eine Stufe wirklich alle
  Vorergebnisse zusammen braucht (Dedup, Früh-Abbruch); sonst `pipeline()`.
- Agent-Ausfälle liefern `null` → immer `.filter(Boolean)`.
- **Modellwechsel = neue Session** (Regel 6); mitten drin zerstört den Cache.
- **Desktop-/RAPHAEL:** dieselben `agentType`s; Failover schreibt die Lane über die Rollen-Nadel.
- `unsupported model` beim Subagent → erst systemd-Log des Failover-Proxys,
  dann direkt gegen den internen Diagnoseweg testen; normale Clients bleiben auf 8318.
- `check_model_fable` im Validator ist eine Text-Heuristik. Er erlaubt nur
  `fable-advisor` und `fable-builder` und blockiert rohe Fable-Modell-Spawns
  sowie andere Fable-Agenttypen. Die Cockpit-Letztprüfung verifiziert zusätzlich low effort
  und fehlenden Eigenbau.
- Zwei Agenten auf derselben Datei sind ein Race; Standard ist ohnehin ein Schreiber.
- **Judge-Leaf führt kein G1 aus.** Ein `sol-pruefer` mit Provenienz-Gate blockiert
  einen reinen Befehl („Builderfamilie nicht belegt“, Probe 04.09.2026). G1 fährt
  `luna-worker` (Mechanik, kein Urteil) mit der Provenienz-Zeile im Prompt; der Judge
  bekommt nur Artefakt + Rubrik + Provenienz.
- **Validator-Warnung „nur Claude-Familie“** ist falsch positiv, wenn agentTypes über
  Variablen/Optionen laufen (`mitSchleife({judgeType:'sol-pruefer'})`); seit 04.09.2026
  erkennt `validate-workflow.py` auch String-Literale der Fremdfamilien.
- Lange Läufe: Zwischenstand melden, nicht stumm warten.
- **Cache-Prefix (Regel 12):** stabiler Kontext vorne, wechselnde Aufgabe hinten.
