---
name: orchestrate-gauntlet
version: 2.2.0
description: >
  Der Maximal-Modus von orchestrate: ein Werkstück wird gegen eine
  inspizierbare Messlatte gebaut, bis der Abstand klein ist — als gezeichneter
  Graph, mit überlappender Cross-Family-Besetzung (Opus, Luna, Sol, Terra,
  Haiku, Grok auf max; Kimi K3 auf high; Fable bewusst auf low/medium) plus
  zwei festen Tandems — Sol+Opus fürs Urteil, Kimi+Fable als austauschbares
  Denk-Paar — und einem Kritiker, der NIE aus der Familie des Builders kommt.
  Läuft als Dauerlauf über Stunden: Welle für Welle, immer wieder neu, bis die
  Zugewinne klein sind.
  Trigger: "/orchestrate-gauntlet", "Gauntlet", "Gauntlet-Loop", "gegen eine
  Messlatte bauen", "bis es richtig gut ist", "so krass wie möglich",
  "maximaler Modus", "alle Modelle drauf", "lauf über Nacht", "Dauerlauf".
class: O
scope: agency
sensitivity: internal
source: >
  Muster „Gauntlet Loop" von Matt Shumer (somethingbig.ai/gauntlet-loop) —
  Ideen-Merge, kein Vendoring (keine Lizenzdatei), komplett neu formuliert.
  Graph-Ebene aus shannholmberg Graph-Engineering (paraphrasiert). Besetzung
  aus Raphael-Ansage 03.08.2026 ("die dürfen sich auch überlappen") plus
  last30days-Recherche zum Modell-Stand
  (r/LocalLLaMA 1.903 pts, BridgeMind/TheAIGRID-Vergleichsläufe, 08/2026).
loads:
  - references/besetzung.md
  - references/gauntlet-graph.md
  - references/dauerlauf.md
requires_skills: [orchestrate@^1, eval@^0]
completion_criteria:
  - "Die Messlatte existiert als Datei (Screenshots/URLs/Referenztext/Testsuite) und hängt in JEDEM Kritiker-Prompt"
  - "Der Graph liegt als Datei vor (gauntlet/<name>.graph.md) mit Nodes, Routen, Checkpoints, Gates und Frozen Rules"
  - "Mindestens ein Gate ist ein externer Anker (Test, Lint, Screenshot-Diff, Build) — kein reines Agenten-Urteil"
  - "Je Stück ist Builder-Familie ≠ Kritiker-Familie, und das ist im Protokoll je Runde belegt"
  - "Die Besetzung wurde in references/besetzung.md nachgeschlagen, nicht geraten — Erst-/Zweit-/Drittwahl je Stück ist bewusst gewählt"
  - "Jeder Kritiker urteilte am echten Artefakt (Screenshot/Testausgabe) und gab GEWINNER + genau EINE größte Lücke + BELEG zurück"
  - "Mindestens drei Modellfamilien waren im Lauf aktiv (oder der Ausfall ist benannt)"
  - "workbench.md ist fortgeschrieben: je Stück Screenshot, Verdikt, offene Lücke, Rundenzahl"
  - "Nach jeder Welle lief ein Glättungs-Schritt; das Ergebnis wirkt als ein Stück"
  - "Gestoppt wurde begründet (Zugewinn klein / Budget / Ansage) — nicht bei einer festen Rundenzahl"
  - "Bei Dauerlauf: Abbruchbedingung stand VOR dem ersten Fire fest, der Cron-Job ist mit ID protokolliert, und jede Welle hat eine eigene Run-ID im workbench.md"
  - "Effort ist je Auftrag explizit gesetzt (max überall, Kimi high, Fable low/medium) — nie geerbt"
  - "Die Welle lief in Breite: geplante Agentenzahl vorab genannt, bei Substanz-Werkstücken ≥10 Agenten (Ziel 20–100+), jedes isolierbare Teilproblem hat seinen eigenen Luna-Goal-Agenten"
---

# orchestrate-gauntlet — Graph + Gauntlet über alle Familien

**Lies zuerst:** [`orchestrate`](/root/raphael-skills/skills/eigene/orchestrate/SKILL.md)
(Betriebsarten, Cross-Model-Regel, Dispatch-Kontrakt) und dort
`references/gauntlet-loop.md`. Dieser Skill ist die **ausgebaute Betriebsart
GAUNTLET** — orchestrate bleibt der allgemeine Einstieg.

## Zweck (1 Satz)

Ein Werkstück gegen eine echte Messlatte hochziehen — als Graph gezeichnet, mit
allen verfügbaren Modellfamilien besetzt, jedes Stück in seinem eigenen
Bauen-Richten-Loop, bis der Abstand zur Latte klein ist.

## Wann dieser Skill statt orchestrate

| Situation | Nimm |
|---|---|
| Normale Verteilung von Arbeit | `orchestrate` |
| Ein Durchgang mit Flotte | `orchestrate` (EINMAL) |
| Dauer-Verbesserung eines Repos | `orchestrate` (LOOP) |
| **Ein Werkstück, Qualität ist das Ziel, es darf teuer sein** | **dieser Skill** |

Der Gauntlet kostet ein Vielfaches. Für Mechanik mit binärem Gate (Migration,
Bugfix) ist er falsch.

## Die Besetzung (überlappend — Details in references/besetzung.md)

**Grundsatz: die Rollen überlappen sich.** Kein Modell hat ein Monopol. Jede
Familie kann mehrere Dinge, und für fast jede Aufgabe gibt es mehrere taugliche
Besetzungen — das macht den Lauf ausfallsicher, erlaubt echte Varianten-Duelle
und hält Regel 8 (Builder ≠ Kritiker) immer erfüllbar.

| agentType | Familie | Effort | Stärke | Kann außerdem |
|---|---|---|---|---|
| `fable-architekt` | Claude | **low/medium** | **Langhorizont über Stunden.** Feature end-to-end, tiefe Bug-Jagd (61,1% Recall). Stärkstes Modell im Feld (Index 59,86) — Kraft kommt aus dem Modell, nicht aus Effort | Kritiker mit hohem Bug-Recall |
| `opus-builder` | Claude | max | Terminal-/Agent-Arbeit, Debugging, Root-Cause; SWE-bench Verified 96,0% | Kritiker (rauscharm), Glätter, Rechercheur |
| `luna-worker` | GPT | max | **Motor.** Goal je Stück: Mechanik, Tests, Fix-Schleifen, Backend | Kritiker (Mechanik/Zahlen), Glätter |
| `terra-bulk` | GPT | max | Architektur, Migration, Multi-File-Volumen | Kritiker (Konsistenz über viele Dateien) |
| `sol-pruefer` | GPT | max | Ship-Urteil, Chairman, finale Abnahme | **auch Builder**: harte Code-Fälle, Planung |
| `haiku-worker` | Claude | max | Massen-Lesen, Boilerplate, billige Schleifen | **auch Builder** (mechanische Edits), Kritiker (Screenshot-Vergleich) |
| `kimi-worker` | Kimi K3 | high | Frontend/UI, DE-Texte, Kreatives, 3D — **und schweres Denken**: Platz 4 im Intelligence Index (57,11), 1M Kontext, Thinking immer an | Kritiker (Design/Ton/Analyse), Glätter, Deep-Search |
| `grok-worker` | Grok 4.5 | max | Tempo und Volumen, Prototypen, Tool-Use | Kritiker (vierte Perspektive) |
| `kimi-recherche` | Kimi K3 | high | Lesende Gegenprobe, Latten-Suche | Kritiker ohne Schreibrechte |

**Effort (Raphael 03.08.2026):** alles auf **max** — außer **Kimi auf high**
(Thinking ist immer an, max verbrennt versteckte Denk-Tokens) und **Fable auf
low/medium**. Fable ist stark genug ohne Denk-Aufschlag; genau der Aufschlag
macht ihn unbezahlbar. Braucht ein Stück wirklich maximales Nachdenken, ist das
`opus-builder` oder `sol-pruefer` auf max — nicht Fable auf max.
Immer explizit im Auftrag mitgeben. `sonnet-worker` ist nur Notnagel bei Ausfall.

### Die zwei festen Tandems

**Sol + Opus = Urteil.** Immer zusammen, wenn beurteilt oder ein harter Fehler
gejagt wird. Sol findet und benennt EINE Lücke, Opus verifiziert sie am echten
Code mit Beleg. Erst was beide tragen, geht zurück an den Builder. Das
neutralisiert Sols Eval-Gaming-Risiko. Verschiedene Familien → Regel 8 erfüllt.

**Kimi + Fable = austauschbares Denk-Paar, nicht additiv.** Beide sind stark bei
Denken, Frontend und langem Kontext (Index 57,11 vs. 59,86). **Default ist
Kimi** — dasselbe zum Bruchteil des Preises. Fable kommt erst, wenn Kimi zweimal
an derselben Lücke scheitert oder das Stück echte Langhorizont-Autonomie über
Stunden braucht. Nie beide gleichzeitig am selben Stück. Als Kritiker
füreinander sind sie erlaubt (verschiedene Familien) — das ist die günstigste
Art, Fable-Output abzunehmen.

**Fable und Opus sind Teil der Flotte** (Freigabe 03.08.2026). Beide zählen als
**Claude-Familie** für Regel 8 — Fable prüft nie Opus, keiner von beiden prüft
Haiku.

**Cockpit** zerlegt, entscheidet, destilliert und fällt das Letzt-Urteil über
das geglättete Ganze. Raphaels direkte Ansprache läuft über **Grok 4.5**.

Erst-/Zweit-/Drittwahl je Werkstück-Typ, die vollständige Kritiker-Matrix und
die Zwei-Familien-Duelle stehen in `references/besetzung.md`. **Nachschlagen,
nicht raten** — besonders die Kritiker-Paarung.

**Varianten-Duell (Tournament):** bei hohem Einsatz bauen **zwei Builder aus
verschiedenen Familien** dasselbe Stück, ein Kritiker aus einer dritten Familie
wählt per Blind-A/B. Die verlierende Variante wird nicht weggeworfen — ihre beste
Idee wandert als Lücken-Ansage in die Gewinner-Variante.

## Breite-Mandat: viele Agenten, nicht wenige (Raphael 03.08.2026)

Der Gauntlet ist ein **Flotten**-Modus. Eine Welle mit 1–2 Subagents ist ein
Fehlbild — richtig sind **20 bis 100+ Agenten pro Welle**, so schnell UND so
gründlich wie möglich:

- **Je Stück ein eigenes Paar** (Builder + Kritiker) — bei 10 Stücken sind das
  allein 20 Agenten, parallel über `pipeline()`.
- **Luna-Schwarm als Motor:** jedes isolierbare Teilproblem (ein Test, ein
  Fix, ein Verify-Skript, eine Datei) bekommt seinen EIGENEN `luna-worker`
  auf max mit eigenem 5-Teile-Goal — nicht ein Luna für alles.
- **Massen-Arbeit fächern:** Referenzen sichten, Screenshots vergleichen,
  Lint-Runden → je Einheit ein `haiku-worker`/`grok-worker`, 20–60 parallel
  sind normal (jeder schreibt eine ANDERE Datei — `write_set` disjunkt).
- **Duelle kosten nichts extra an Zeit:** zwei Builder parallel + ein Kritiker
  ist EIN Zeitschritt, nicht drei.
- Die Workflow-Engine queued selbst (~10 laufen gleichzeitig, Rest wartet) —
  100 Agenten übergeben ist okay, sie verhungern nicht.
- **Selbstkontrolle je Welle:** vor dem Start die geplante Agentenzahl nennen.
  Unter 10 bei einem Substanz-Werkstück → Zerlegung ist zu grob, feiner
  schneiden. Die RAM-Grenze (4–6 gleichzeitig) gilt für Worktree-Threads,
  nicht für Workflow-Agenten — die Engine drosselt selbst.

## Ablauf

### 1. Messlatte setzen

Konkret und **inspizierbar** — der Kritiker muss sie ansehen, ausführen oder
messen können: Screenshots einer Best-in-Class-Seite (Desktop + Mobil), die
eigene Referenz-Anzeige, eine Testsuite, ein Latenz-Budget, ein Referenztext.
„Mach es großartig" scheitert immer.

- Keine Latte da? → **erster Auftrag** an `kimi-recherche` oder `haiku-worker`:
  drei Referenzen finden und als Datei ablegen.
- Latte als Datei speichern (`gauntlet/<name>/latte/`), Pfad in JEDEN
  Kritiker-Prompt.
- Sie darf unerreichbar sein. Ihr Zweck ist, dass niemand bei „ganz okay für
  KI" stehenbleibt.

### 2. Graph zeichnen (vor dem ersten Bau)

Nodes, Routen, Checkpoints, Gates, Frozen Rules — Format in
`references/gauntlet-graph.md`, gespeichert als `gauntlet/<name>.graph.md`.

- **Nodes** = die kleinsten Stücke, die getrennt gebaut UND getrennt bewertet
  werden können. Der Lead zerlegt, nie ein Builder.
- **Routen** = auch rückwärts. Ein später Fehlschlag routet meist WEIT zurück
  (Layout-Miss → zurück zur Referenz-Analyse, nicht zum letzten CSS-Fix).
- **Gates** = mindestens eines ist ein **externer Anker**: Build grün,
  Test grün, Screenshot existiert, Lighthouse-Wert. Reine Agenten-Rubriken
  bestehen sich selbst.
- **Frozen Rules** = Brand-Voice, Rot-Klassen, verbotene Claims — wandern
  wörtlich in jeden Node-Prompt.

### 3. Je Stück ein Paar mit Goal-Loop

Jedes Stück bekommt ein Builder-Kritiker-Paar aus **verschiedenen Familien**,
beide mit frischem Kontext. Der Builder — im Standardfall `luna-worker` auf
Max-Effort — bekommt kein Prosa-Briefing, sondern ein **Goal** (5 Teile aus
`orchestrate/references/dispatch.md`):

```
OBJECTIVE:   ein Satz, ein konkretes Ergebnis
CONSTRAINTS: was NICHT angefasst wird (Dateien, API, Libs, Stil)
VALIDATION:  der exakte Shell-Befehl, der Fortschritt beweist
STOP:        "Stopp, wenn X grün ist" ODER "wenn menschliches Urteil nötig ist"
DOCS:        ein Satz Doku je Änderung
```

Dazu: **kein Reward-Hacking** (Tests nicht löschen/überspringen/aufweichen, um
die Stop-Condition zu erreichen), **kein Scope-Creep**, und die
Long-Horizon-Klausel („long horizon session, human is away") für alle
Nicht-Claude-Worker.

### 4. Die Runde

1. Builder baut gegen sein Goal.
2. Kritiker (andere Familie) vergleicht am **echten Artefakt** — gerenderter
   Screenshot, laufende Seite, echte Testausgabe. **Nie an einer vom Builder
   geschriebenen Zusammenfassung.** Blind A/B gegen die Latte, wo möglich.
3. Rückgabe streng: `GEWINNER: <A|B>` · `GRÖSSTE LÜCKE: <ein Satz>` ·
   `BELEG: <was genau gesehen/gemessen wurde>`. **Genau EINE Lücke** — zehn
   Punkte lähmen den Builder, einer bewegt ihn. Kein „erkläre deinen
   Gedankengang" (Regel 19).
4. Verliert unser Stück → zurück an den Builder mit dieser einen Lücke.
   Rückrouten mit Rundenlimit (Default 5 je Stück).
5. Gate prüfen. Rot → nicht weiterrouten.

### 5. Glätten nach jeder Welle

Ein **frischer** Agent (`opus-builder`, ersatzweise `luna-worker`) zieht die unabhängig verbesserten
Stücke zu einem Ganzen zusammen: Abstände, Typo, Ton, Namensgebung.
Kein Redesign — nur Angleich. Ohne diesen Schritt wirkt das Ergebnis
zusammengestückelt, obwohl jedes Stück für sich gut ist.

### 6. Stand sichtbar halten

`gauntlet/<name>/workbench.md` — je Stück: Screenshot-Pfad, letztes Verdikt,
offene Lücke, Rundenzahl, Builder/Kritiker-Paarung. Raphael schaut vom Handy,
ohne den Lauf zu unterbrechen.

### 7. Dauerlauf — der Loop startet immer wieder neu

**Der Gauntlet ist kein Einmal-Lauf.** Er läuft über Stunden: Welle für Welle,
per Cron alle 20–30 Minuten, bis die Abbruchbedingung greift. Vollständige
Mechanik in `references/dauerlauf.md`. Das Wichtigste:

1. **Mandat als Datei** (`gauntlet/<name>/mandat.md`): Werkstück, Latte, Gates,
   Tabu, Abbruch, Budget.
2. **Abbruchbedingung steht VOR dem ersten Fire fest** — sonst wird nicht
   gestartet. Mindestens eine: Plateau (2 Wellen ohne dass ein Verdikt von
   `LATTE` auf `UNSERES` kippt), Wellenlimit, Zeitfenster, alle Stücke gewonnen,
   Budget erreicht.
3. **Cron anlegen** (session-only, Minute NICHT auf :00/:30 — z. B. `17,47`).
   Der Prompt trägt: Mandat lesen, Workflow-Pflicht, Besetzung nachschlagen,
   Stand fortschreiben, Abbruch prüfen, Long-Horizon-Klausel.
4. **Welle 1 sofort fahren**, nicht auf den ersten Fire warten.
5. **Jede Welle beginnt mit `git status`** — Reste einer abgebrochenen Vorwelle
   einordnen, bevor neue Arbeit startet. Der Runden-Körper ist idempotent:
   zweimal dieselbe Welle = derselbe Endzustand.
6. **Erreicht der Loop die Abbruchbedingung → `CronDelete`**, Abschluss ins
   `workbench.md`. Nicht weiterdrehen, weil noch Zeit ist.

**Bail-out:** dreimal am selben Punkt gescheitert → erst `unstuck` (externe
Wand?), dann **Besetzung wechseln** (Zweitwahl aus anderer Familie — dafür ist
die Überlappung da), erst dann anhalten.

**„Noch nicht fertig" ist der Normalzustand beim Stoppen** — und wird als
solcher protokolliert.

Über 7 Stunden hinaus: systemd-Timer + `claude -p --resume` vorschlagen
(Session-Crons sterben mit der Session). Bauen erst nach Raphaels Freigabe.

## Ziel nennen, Route offen lassen

Dem Lead werden **Ziel und Latte** gegeben — nicht der Bauplan. Vorgeschriebene
Architektur, feste Zerlegung oder eine feste Rundenzahl ersetzen das Urteil des
Modells durch das eigene. Der Graph legt die **Stationen und Prüfungen** fest,
nicht die Lösung innerhalb eines Nodes.

## Harte Regeln

- **Builder benotet sich nie selbst.** Er erinnert seine eigene Begründung und
  rechtfertigt jede Entscheidung überzeugend — gebraucht wird ein unabhängiges
  Urteil, kein plausibles.
- **Builder-Familie ≠ Kritiker-Familie**, je Stück belegt.
- **Kein Gate ohne externen Anker** im Graph.
- **Fable/Opus nur über `fable-architekt`/`opus-builder`** (nie roher
  `model:`-Override; Fable auf low/medium); Kimi immer K3, nie HighSpeed.
- **Rot-Klassen bleiben rot:** nichts geht live, nichts wird veröffentlicht,
  keine Kundennachricht — Ausgabe bleibt lokal bis zur Signatur.
- **Screenshot-Pflicht** bei allem Visuellen: der Kritiker prüft gerenderte
  Bilder, nie Code oder Beschreibung.
- **Git:** nur bearbeitete Pfade stagen (nie `git add -A`), kein Push ohne
  Anordnung.

## Fallen

- **Latte zu vage** → der Loop dreht sich, ohne besser zu werden. Häufigster Fehler.
- **Kritiker liest die Zusammenfassung des Builders** → er benotet eine
  Erzählung, nicht das Werk.
- **Kritiker liefert zehn Punkte** → Builder verzettelt sich.
- **Kein Glättungsschritt** → sichtbar zusammengestückelt.
- **Feste Rundenzahl vorgegeben** → gestoppt wird bei „drei Runden rum", nicht
  bei „Zugewinn klein".
- **Parallele Stücke auf derselben Datei** → Race. `write_set` disjunkt halten,
  geteilte Dateien bekommen EINEN Owner am Ende.
- **Familien-Ausfall verschweigen** → fällt eine Familie aus (Quota, Seat), wird
  das im Protokoll benannt und mit den verbleibenden weitergefahren, nie
  abgebrochen. Weil jede Rolle mehrfach besetzt ist, kostet ein Ausfall
  Auswahl, nie den Lauf.
- **Immer dieselbe Besetzung fahren** → die Überlappung ist da, um genutzt zu
  werden. Wenn ein Stück zweimal am selben Kritiker scheitert, die Zweitwahl
  aus einer anderen Familie ansetzen statt eine dritte Runde mit demselben Paar.
