---
name: orchestrate
version: 1.3.2
description: >
  DER Orchestrierungs-Skill — einer für alles. Verteilt Arbeit über alle
  Modellfamilien und Harnesses (Luna, Sol, Terra, Sonnet, Kimi, Grok,
  Opus; Codex-nativ, Kimi-nativ, MCP) und wählt selbst die Betriebsart: Einmal-Lauf,
  Dauer-Loop, gezeichneter Graph, Gauntlet gegen eine Messlatte, Council bei
  Streit. Nie eine Familie allein bauen und prüfen lassen. Ersetzt
  dynamic-workflow, ultra-loop und graph. Trigger: "orchestrieren",
  "delegieren", "parallelisieren", "Subagenten", "Task aufteilen", "Flotte",
  "Workflow", "als Workflow machen", "fächere das auf", "Loop", "Dauer-Loop",
  "loop der sich verbessert", "Graph", "Pipeline aufsetzen", "Gauntlet",
  "gegen eine Messlatte bauen", "bis es richtig gut ist", "Council",
  "Zweitmeinungs-Rat", "Cross-Model", "Cross-Harness".
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
  - references/cross-model-harness.md
  # Branch-spezifische References (muster-wahl, workflow-vorlage, gauntlet-loop, council, etc.) werden nur bei Bedarf nachgeladen — siehe Zweige unten.
requires_skills: [eval@^0]
completion_criteria:
  - "Betriebsart ist genannt und begründet (SOLO / EINMAL / LOOP / GRAPH / GAUNTLET / COUNCIL)"
  - "Jeder Subagent-Auftrag nennt agentType ODER (MODELL + EFFORT) explizit — nie geerbt"
  - "Bei Substanz-Arbeit lief eine Cross-Model-Flotte über mindestens zwei Modellfamilien; SOLO nur bei <5-Min-Tasks mit genannter Begründung"
  - "Worker-Output gilt untrusted bis Cross-Review durch eine andere Modellfamilie"
  - "Bei Workflow-Lauf: validate-workflow.py lief PASS vor dem Start und die Run-ID ist genannt"
  - "Kern-Ergebnisse wurden vom Cockpit selbst mit eigenem Read/Bash-Beleg nachverifiziert — kein blindes Übernehmen von Agenten-Reports"
  - "Bei LOOP: Abbruchbedingung stand vor dem Start fest und das Runden-Protokoll ist fortgeschrieben"
  - "Bei jeder Substanz-Runde erzeugten Subagenten zuerst einen echten PLAN mit mindestens zwei Steps; jeder Plan-Step läuft über mindestens einen explizit beauftragten Subagenten und abhängige Steps sind sequentiell nachvollziehbar"
  - "LOOP setzt Kimi, Grok, Sol, Terra, Luna, Opus und Sonnet mit echten Rollen ein; fehlt eine Familie wegen eines belegten Routenausfalls, stehen Beleg und Ersatz im Runden-Protokoll"
  - "Bei mindestens einem sinnvoll zerlegbaren LOOP-Step definierte ein Lead eigene Child-Aufträge; der Workflow startete diese Child-Subagenten als sichtbare Runtime-Aufrufe in Wellen und gab ihre echten Ergebnisse zur Lead-Synthese zurück"
  - "Parallelität bleibt innerhalb eines Plan-Steps; mehr als 6 gleichzeitig läuft in Wellen (bindende RAM-Grenze)"
  - "Im LOOP gibt es nie einen Fable-Subagenten"
  - "Bei GRAPH: mindestens ein Gate ist ein externer Anker (Test, Lint, Screenshot-Diff, Live-Signal)"
  - "Bei GAUNTLET: inspizierbare Messlatte liegt als Datei vor, Builder und Kritiker sind verschiedene Familien, Kritik erfolgte am echten Artefakt und lieferte genau EINE größte Lücke"
  - "Bei COUNCIL: anonymes Peer-Ranking; Chairman-Verdikt nennt Konsens, Dissens, Empfehlung und genau einen ersten Schritt"
---

# orchestrate — der eine Orchestrierungs-Skill

**Lies zuerst:**
[`AGENTS.md`](/root/raphael-command-center/AGENTS.md) (Regeln 2, 7, 8, 17, 18),
[`ROUTING.md`](/root/raphael-command-center/ops/ROUTING.md),
[`MODELL-MATRIX.md`](/root/raphael-command-center/ops/MODELL-MATRIX.md),
[`HARNESS-ROUTER-MATRIX.md`](/root/raphael-command-center/ops/HARNESS-ROUTER-MATRIX.md).

## Zweck (1 Satz)

Jede Mehr-Agenten-Arbeit an einer Stelle: **wer** arbeitet (Modellfamilie),
**wo** (Harness), **wie** (Betriebsart), **wer prüft** (andere Familie) —
teuer denkt, Luna tippt Mechanik, Kimi/Terra bauen, Sol/Sonnet richten,
niemand prüft die eigene Arbeit.

## Schritt 1 — Betriebsart wählen (immer zuerst, immer ansagen)

| Betriebsart | Wann | Kern |
|---|---|---|
| **SOLO** | <5 Min, eine Datei, kein Urteil nötig | selbst machen, „SOLO, weil …“ sagen |
| **EINMAL** | ein abgegrenzter Auftrag, Pfad unbekannt | ein Workflow-Run mit Flotte (Schritt 3) |
| **LOOP** | Dauerbetrieb, Runde für Runde besser | Cron + jede Runde ein Workflow (Schritt 5) |
| **GRAPH** | Arbeit kehrt wieder (wöchentlich, je Kunde) | Karte vorab zeichnen, dann fahren (Schritt 6) |
| **GAUNTLET** | Qualität ist das Ziel, nicht Fertigwerden | gegen Messlatte bauen bis der Abstand klein ist (Schritt 7); Maximal-Ausbau: `orchestrate-gauntlet` |
| **COUNCIL** | echte Streitfrage, mehrere plausible Antworten | 3 Familien, anonymes Ranking, Chairman (Schritt 8) |

Faustregeln: **Loop** = du gibst Ziel und Latte, der Agent wählt den Weg.
**Graph** = du zeichnest den Weg, der Agent löst nur die Stationen.
**Gauntlet** = Loop mit einer harten externen Latte statt eines Ziels.
Mischformen sind der Normalfall (Graph mit Loop-in-Node, Loop mit
Gauntlet-Runden). Kombinieren statt künstlich trennen.

## Schritt 2 — Rollen und Flotte

- **Leader** = Cockpit (Fable, Fallback Opus 1M): zerlegt, dispatcht,
  destilliert, verifiziert am Ende selbst. Nur an 2–3 Checkpoints. (Fable/Opus
  als Worker: nur über `fable-architekt`/`opus-builder`, s. u.)
- **Worker:**
  - `luna-worker` — Mechanik, Tests, Recherche, begrenzte Umbauten
    (**Default-Nicht-Claude-Worker**, Max-Effort im Gateway erzwungen)
  - `terra-bulk` — Architektur, große Migrationen über viele Dateien
  - `sonnet-worker` — normale Bau-Arbeit, Drafts, Integration
  - `luna-worker` — Massen-Lesen, Parsen, billige Klassifikation
  - `kimi-worker` — Frontend-Code, deutsche Marketing-/Verkaufstexte (immer K3)
  - `kimi-recherche` — lesende Dritt-Familie, Gegenperspektive
  - `grok-worker` — Grok 4.5, vierte Familie: Tempo/Volumen, Tool-Use, Zweitblick
- **Verifier** (andere Familie, frische Session): `sol-pruefer` (Beschluss B1);
  bei Codex-Ausfall `claude-sonnet-5` plus Panel A auf Kimi (Regel 8).

**Cross-Model-Regel:** mindestens **zwei Providerfamilien** je Substanz-Lauf;
Bauen und Prüfen nie dieselbe Providerfamilie. Für dieses Gate zählen
Luna/Sol/Terra als **GPT**, Opus/Sonnet als **Claude**, dazu Kimi und Grok;
die sieben AgentTypes behalten trotzdem eigene LOOP-Rollen. `model:'opus'|'sonnet'`
allein zählt **nicht** — GPT/Kimi starten nur über `agentType` oder natives Harness.
Isolierbare Sub-Actions gehen zuerst an `luna-worker`, nicht ans Cockpit.
**Fable/Opus nur über `agentType:'fable-architekt'` / `'opus-builder'`**
(Freigabe 03.08.2026, teuer — Einsatzregeln in orchestrate-gauntlet), nie als
roher `model:`-Override. Zuteilung je Aufgabenklasse, Harness-Wahl
(Terminal/Desktop-MCP/Codex-nativ/Kimi-nativ) und Degraded-Pfade:
`references/cross-model-harness.md`. Auftragskontrakt: `references/dispatch.md`.

Router-Kurzform (Familien-Präferenz Raphael 03.08.: Luna/Terra/Grok zuerst,
Sonnet unbeliebt): klein → selbst · Urteil → Cockpit · Mechanik/Tests/Bau
→ `luna-worker` · Bulk/Architektur → `terra-bulk` · schnelle Masse/Prototypen →
`grok-worker` · Frontend/DE-Text/Denken → `kimi-worker` · Ship-Review →
`sol-pruefer` · Zweitmeinung → `kimi-recherche` · stumpfes Massen-Lesen →
`luna-worker` · Sonnet nur Notnagel · Browser → Kimi steuert.
Quota-Fehler = weiterlaufen, das Gateway rotiert; sichtbarer Nicht-Fallback ist
ein Vorfall. Grok 4.5 ist seit 03.08.2026 als Route freigegeben (CLIProxy 8317,
xAI-OAuth) — Cockpit-Preset für Raphaels direkte Ansprache und `grok-worker` als
vierte Familie.

## Schritt 3 — Einmal-Lauf (EINMAL)

0. **Erst der Plan, dann die Flotte.** Bei mehrstufiger Arbeit zuerst einen
   sichtbaren Plan anlegen (TaskCreate je Etappe oder nummerierte Liste) und
   die Etappen **nacheinander** abarbeiten — parallelisiert wird INNERHALB
   einer Etappe, nicht über Etappen hinweg. Belegtes Gut-Muster (Session
   7ac23a32, 03.08.): Plan mit 3 Etappen, dann je Etappe Batches parallel
   über Luna/Grok/Kimi rotiert, jede Etappe fertig bevor die nächste beginnt.
   Falsch: alles gleichzeitig starten und hoffen, dass sich die Abhängigkeiten
   von selbst sortieren.
1. **Zerlegen** (30 Sekunden): Arbeits-Liste, Fertig-Kriterium, Gates, Tabus.
2. **Muster wählen** nach `references/muster-wahl.md` — Fan-out-Pipeline,
   Kritik-Flotte, Council, Recherche-Sweep, Vendor-Kette, Loop-until-dry,
   Mess-und-Vorschlag oder Hybrid.
3. **Script bauen** nach `references/workflow-vorlage.md`: `meta` als pures
   Literal, `pipeline()` als Default, Args defensiv parsen
   (`typeof args === 'string' ? JSON.parse(args) : args`), Flotte per
   `agentType`, kein `Date.now()`/`Math.random()`.
4. **Validieren (Pflicht):** `python3
   /root/raphael-skills/skills/eigene/orchestrate/scripts/validate-workflow.py <script>`
   — FAIL = nicht starten.
5. **Starten**, Run-ID merken. Crash → Script patchen, `resumeFromRunId`
   (fertige Agenten kommen aus dem Cache). Vor „Ergebnis leer“-Diagnosen immer
   `journal.jsonl` lesen.
6. **Selbst verifizieren** — Kern-Funde mit eigenem Read/Bash-Beleg;
   Agenten-Reports nie blind übernehmen. Widerspruch zwischen Agenten →
   Council, nicht Rückfrage an Raphael.

## Schritt 4 — Was jeder Subagent-Auftrag enthält

`agentType` (oder MODELL+EFFORT) · ROLLE · HARNESS · AUFGABE (ein Paket, ein
Output) · INPUT (nur Task-Ausschnitt, TB2) · OUTPUT · GATE · TRUST ·
`write_set` bei parallelen Schreibern. Subagenten starten blind — der volle
Auftrag gehört in den Prompt; Rückgabe ist Ergebnis oder kurze Zusammenfassung,
nie ein Rohdump. Parallele Schreiber nur auf getrennten Dateien; geteilte
Dateien (Index, SKILL.md) bekommen EINEN Owner am Ende.

**Verschachtelte Delegation:** Ein Lead definiert die eigenen Child-Aufträge mit
vollständigem Kontrakt (agentType, ROLLE, HARNESS, AUFGABE, INPUT, OUTPUT, GATE,
TRUST und `write_set`). Der Workflow startet jeden Child danach selbst als sichtbaren
`agent()`-Runtime-Aufruf, fährt mehr als 6 Children in echten nummerierten Wellen und
gibt die echten Child-Ergebnisse an eine frische Lead-Synthese zurück. Hidden Dispatch
im undurchsichtigen Lead-Aufruf ist verboten: Nur so sind Lead→Child→Ergebnis und die
RAM-Grenze technisch prüfbar. `terra-bulk` und `luna-worker` bleiben Leaf-Worker.

**Long-Horizon-Klausel** (Pflicht bei Codex-/Kimi-Adaptern, die das private
CLAUDE.md nicht erben): „long horizon session, human is away“ — autonom
weiterarbeiten bis Gates grün oder Budget/Rundenlimit erreicht, bei Unsicherheit
nicht stoppen, Rot-Klassen bleiben bindend, vor „fertig“ ein Selbst-QA gegen die
Gates.

## Schritt 5 — Dauer-Loop (LOOP)

1. **Mandat klären:** WAS wird verbessert, welche GATES bleiben grün, was ist
   TABU (Fremd-Baustellen, `git add -A`, Reward-Hacking), **Abbruchbedingung**
   (Rundenlimit, Zeitfenster, „keine offenen Punkte mehr“, N Runden ohne Fund).
2. **Plan zuerst:** Vor jeder Substanz-Runde erzeugen Subagenten einen echten
   `PLAN` mit mindestens zwei Steps. Jeder Plan-Step hat ein Ziel, Abhängigkeiten,
   mindestens einen expliziten Subagenten und ein Gate. Abhängige Steps laufen sequentiell;
   Parallelität findet nur innerhalb eines Steps statt. Mehr als 6 gleichzeitig
   wird in Wellen gefahren (bindende RAM-Grenze). Das Cockpit koordiniert und
   verifiziert, erledigt aber keinen Plan-Step solo.
3. **Familien und Delegation besetzen:** Jede LOOP-Runde setzt Kimi, Grok, Sol,
   Terra, Luna, Opus und Sonnet mit echten Rollen ein. Bei echtem
   Routenausfall darf eine Familie fehlen, aber nur mit Beleg und Ersatz im
   Runden-Protokoll. Ein geeigneter Lead definiert für mindestens einen sinnvoll
   zerlegbaren Plan-Step eigene Child-Aufträge. Der Workflow startet die Children
   sichtbar und wellenbegrenzt; danach synthetisiert ein Lead ihre echten Ergebnisse.
   `terra-bulk` und `luna-worker` bleiben Leaf-Worker. **Nie Fable-Subagent im LOOP.**
4. **Cron anlegen** (CronCreate, 20–30 Min, session-only). Der Prompt trägt:
   Workflow-Pflicht, den Subagenten-PLAN vor der Flotte, Flotte per `agentType`,
   Stand-Datei lesen+fortschreiben, Commit-Regel, „EINEN Punkt tief und fertig“,
   Long-Horizon-Klausel und den Nachweis der verschachtelten Delegation.
5. **Runde 1 sofort fahren**, nicht auf den ersten Fire warten.
6. **Runden-Mechanik:** Working-Tree prüfen (Reste einordnen) → Stand lesen →
   Subagenten-PLAN erzeugen → abhängige Plan-Steps nacheinander ausführen →
   selbst verifizieren → chirurgisch fixen → Gates grün → nur bearbeitete Pfade
   committen (**nie `git add -A`**; vor Push den ahead-Stand prüfen, fremde
   ungepushte Commits nicht mitschleifen) → Protokoll nach
   `references/runden-protokoll.md`.
7. **Stoppen:** `CronDelete <job-id>`. Sessionübergreifend → systemd-Timer +
   `claude -p --resume` vorschlagen, nicht Session-Cron.

## Per-Item Loop Primitive

Für eine LOOP-Runde mit mehreren gleichartigen Items (z. B. Seiten, Ansichten oder
Assets) nutzt der Workflow den verbindlichen Vertrag in
[`loop-primitive.md`](/root/raphael-skills/skills/eigene/orchestrate/references/loop-primitive.md).

- Der Workflow besitzt die Schleife und startet alle sichtbaren Agent-Aufrufe.
- Pro Item arbeitet genau ein `luna-worker`; kein Item-Wechsel, keine Selbstabnahme,
  höchstens drei Runden. Rückgabe ist Artefakt plus AAA-Beleg.
- Bei visuellen oder visuellen Spezifikations-Outputs prüft ein separater
  `visual-kritiker` das echte Artefakt. Bei `fail` geht nur `biggest_gap` in die nächste
  Fix-Runde.
- Unabhängige Items dürfen parallel laufen. `PASS` gibt das Artefakt an den nächsten
  Workflow-Schritt; `BLOCKED` nach Runde 3 verhindert den Ship und eskaliert mit dem
  letzten Artefakt, Kritiker-Output und `biggest_gap` ans Cockpit.

**Einsatz im Workflow-Script:**

```javascript
const results = await parallel(items.map(item => () => loopItem(item)))
const blocked = results.filter(result => result.status === 'BLOCKED')

if (blocked.length > 0) {
  return { status: 'BLOCKED', items: blocked }
}

return { status: 'PASS', items: results }
```

`loopItem` übernimmt pro Item den sichtbaren Build-, Kritik- und Fix-Aufruf; die
vollständige Vorlage mit `agentType`, AAA-Gate und `biggest_gap` steht in der
referenzierten Datei.

**Loop-Hygiene:** Runden-Körper idempotent (zweimal dieselbe Runde = derselbe
Endzustand). Dreimal am selben Punkt gescheitert → erst `unstuck` (externe
Wand?), sonst Loop anhalten und Blocker benennen — nie Versuch Nr. 4.
5-Minuten-Cache-Klippe: pro Fire EINE Substanz-Runde statt vieler Mini-Fires.
Retrospektive nach `references/retro-muster.md`.

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

Wenn nicht Fertigwerden das Ziel ist, sondern **richtig gut werden**:
**zerlegen → bauen → richten → wiederholen.**

1. **Messlatte** festlegen — konkret und **inspizierbar** (echte Screenshots
   einer Best-in-Class-Seite, die Referenz-Anzeige, eine Testsuite, ein
   Latenz-Budget). „Mach es großartig“ scheitert immer. Keine Latte da? Ihre
   Suche ist der erste Subagent-Auftrag. Sie darf unerreichbar sein — sie
   verhindert nur, dass jemand bei „ganz okay für KI“ stehenbleibt.
2. **Zerlegen** in kleinste einzeln bewertbare Stücke.
3. **Je Stück ein Paar:** Builder + eigener Kritiker **aus anderer Familie**,
   beide mit frischem Kontext.
4. **Kritiker-Kontrakt:** urteilt am **echten Artefakt** (Screenshot, laufende
   Seite, echte Testausgabe) — nie an der Zusammenfassung des Builders. Blind
   A/B gegen die Latte. Rückgabe: `GEWINNER:` · **genau EINE** größte Lücke ·
   `BELEG:`.
5. **Nach jeder Welle glätten** — ein frischer Agent gleicht die Stücke zu
   einem Ganzen an (kein Redesign).
6. **Stand sichtbar:** `workbench.md` im Arbeitsordner (Screenshot, Verdikt,
   offene Lücke je Stück) — Raphael schaut vom Handy, ohne zu unterbrechen.
7. **Stopp** ohne feste Rundenzahl: wenn die Zugewinne klein werden oder das
   Budget endet.

**Ziel nennen, Route offen lassen** — Architektur, Zerlegung und Rundenzahl
vorzuschreiben ersetzt das Urteil des Modells durch das eigene.
Details: `references/gauntlet-loop.md`. **Maximal-Ausbau** (Graph + feste
Cross-Family-Besetzung + Goal-Loop je Stück):
[`orchestrate-gauntlet`](/root/raphael-skills/skills/eigene/orchestrate-gauntlet/SKILL.md).

## Schritt 8 — Council und adversariales Distill (Streitfragen)

**Council** (mehrere plausible Antworten: Positionierung, Pricing,
Architekturwahl): 3 Modellfamilien (Sonnet + Sol + Kimi) antworten unabhängig
in frischen Sessions → Antworten werden **anonymisiert** und gegenseitig
gerankt (striktes `FINAL RANKING:`) → der Leader synthetisiert als Chairman:
Konsens / Dissens / blinde Flecken / eine Empfehlung / ein erster Schritt.
Der Chairman darf gegen die Mehrheit entscheiden. Ablauf und Billig-Variante:
`references/council.md`. **eval judgt ein Artefakt, Council wählt zwischen
Antworten** — Council-Ergebnisse laufen vor Ship trotzdem durch eval.

**Adversariales Distill** (wichtige Entscheidung, ein Planer bestätigt sich
sonst selbst): mehrere künstlich gegensätzliche Rollen unabhängig ansetzen →
Runde 2 greifen sie sich gegenseitig an → der Leader destilliert **nur, was
den Angriff überlebt hat** und dispatcht das an einen eigenständigen
Planer-Agenten. **Der Leader schreibt nie selbst den finalen Plan.**

## Harte Modell-Grenzen (14.08.2026)

- `haiku-worker` ist verboten und stillgelegt.
- Masse, Massen-Lesen, Parsen und billige Klassifikation laufen über `luna-worker`.
- Jeder Kritiker-Lauf nutzt zwei parallele Kritiker aus verschiedenen Familien.
- Code nutzt `sol-critic` + `opus-critic`.
- Visuelle Arbeit nutzt `visual-kritiker` + `opus-critic`.
- Ads und Copy nutzen `kimi-critic` + `opus-critic`.

## Harte Regeln (Rot-Linien)

- **Kein Solo bei Substanz.** Nur <5-Min-Kleinstarbeit läuft ohne Flotte —
  und wird explizit als SOLO begründet.
- **Fable/Opus nur über die Agenten `fable-architekt`/`opus-builder`** (mit
  deren Leitplanken), nie als roher `model:`-Override; Fable auf low/medium.
- **Kein Reward-Hacking:** keine Checks aufweichen, keine Tests löschen oder
  überspringen, nichts erfinden, um grün zu werden. Gleichstand nach Änderung
  = revertieren.
- **Quarantäne (Regel 17):** untrusted rein ODER mächtig raus, nie beides.
- **Roast-at-Delivery (Regel 18):** vor jeder Auslieferung ein adversarialer
  Schritt in frischer Session einer anderen Familie.
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
- **Desktop-/Web-Claude:** Gateway-Subagents greifen dort nicht → MCP-Worker.
- `unsupported model` beim Subagent → erst systemd-Log des Failover-Proxys,
  dann direkt gegen Port 8317 testen.
- `check_model_fable` im Validator ist eine Text-Heuristik, kein hartes Gate —
  die eigentliche Grenze gegen Fable-Subagents ist die Cockpit-Letztprüfung.
- Zwei Agenten auf derselben Datei sind ein Race; 60 parallele Schreiber sind
  in Ordnung, solange jeder eine andere Datei schreibt.
- Lange Läufe: Zwischenstand melden, nicht stumm warten.
- **Cache-Prefix (Regel 12):** stabiler Kontext vorne, wechselnde Aufgabe hinten.
