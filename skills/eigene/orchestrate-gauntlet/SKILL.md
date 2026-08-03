---
name: orchestrate-gauntlet
version: 1.0.0
description: >
  Der Maximal-Modus von orchestrate: ein Werkstück wird gegen eine
  inspizierbare Messlatte gebaut, bis der Abstand klein ist — als gezeichneter
  Graph, mit einer festen Cross-Family-Besetzung (Luna max, Sonnet, Haiku,
  Terra, Sol, Kimi K3, Grok 4.5) und einem Kritiker, der NIE aus der Familie
  des Builders kommt. Jedes Stück läuft seinen eigenen Bauen-Richten-Loop.
  Trigger: "/orchestrate-gauntlet", "Gauntlet", "Gauntlet-Loop", "gegen eine
  Messlatte bauen", "bis es richtig gut ist", "so krass wie möglich",
  "maximaler Modus", "alle Modelle drauf".
class: O
scope: agency
sensitivity: internal
source: >
  Muster „Gauntlet Loop" von Matt Shumer (somethingbig.ai/gauntlet-loop) —
  Ideen-Merge, kein Vendoring (keine Lizenzdatei), komplett neu formuliert.
  Graph-Ebene aus shannholmberg Graph-Engineering (paraphrasiert). Besetzung
  aus Raphael-Ansage 03.08.2026 plus last30days-Recherche zum Modell-Stand
  (r/LocalLLaMA 1.903 pts, BridgeMind/TheAIGRID-Vergleichsläufe, 08/2026).
loads:
  - references/besetzung.md
  - references/gauntlet-graph.md
requires_skills: [orchestrate@^1, eval@^0]
completion_criteria:
  - "Die Messlatte existiert als Datei (Screenshots/URLs/Referenztext/Testsuite) und hängt in JEDEM Kritiker-Prompt"
  - "Der Graph liegt als Datei vor (gauntlet/<name>.graph.md) mit Nodes, Routen, Checkpoints, Gates und Frozen Rules"
  - "Mindestens ein Gate ist ein externer Anker (Test, Lint, Screenshot-Diff, Build) — kein reines Agenten-Urteil"
  - "Je Stück ist Builder-Familie ≠ Kritiker-Familie, und das ist im Protokoll je Runde belegt"
  - "Jeder Kritiker urteilte am echten Artefakt (Screenshot/Testausgabe) und gab GEWINNER + genau EINE größte Lücke + BELEG zurück"
  - "Mindestens drei Modellfamilien waren im Lauf aktiv (oder der Ausfall ist benannt)"
  - "workbench.md ist fortgeschrieben: je Stück Screenshot, Verdikt, offene Lücke, Rundenzahl"
  - "Nach jeder Welle lief ein Glättungs-Schritt; das Ergebnis wirkt als ein Stück"
  - "Gestoppt wurde begründet (Zugewinn klein / Budget / Ansage) — nicht bei einer festen Rundenzahl"
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

## Die Besetzung (fest vorgegeben, Details in references/besetzung.md)

| agentType | Familie | Rolle im Gauntlet |
|---|---|---|
| `luna-worker` | GPT | **Motor.** Läuft auf Max-Effort mit einem Goal je Stück: baut, testet, schließt Lücken, wiederholt. Der Default-Builder für alles Mechanische. |
| `terra-bulk` | GPT | Architektur, Volumen, Multi-File-Umbau |
| `sonnet-worker` | Claude | Solider Bau, Integration, Glättung |
| `haiku-worker` | Claude | Massen-Lesen, Vergleiche vorbereiten, billige Verify-Schleifen |
| `kimi-worker` | Kimi K3 | **Frontend und deutsche Texte.** Kimi K3 führt aktuell die Frontend-Arena an — bei UI/Web ist er erste Wahl, nicht Ausweichlösung. |
| `grok-worker` | Grok 4.5 | Tempo und Volumen, Tool-Use, vierte Perspektive |
| `sol-pruefer` | GPT | Urteil, Chairman, finale Abnahme |
| `kimi-recherche` | Kimi K3 | Lesende Gegenprobe |

**Kreatives (Texte, Frontend-Feinschliff, 3D/visuelle Ideen)** läuft über
`kimi-worker` plus Cockpit-Urteil. **Opus wird nicht als Subagent gestartet** —
Cockpit-Modelle bleiben Cockpit (Doktrin), und Raphael arbeitet nicht direkt auf
Opus. Direkte Ansprache läuft über **Grok 4.5** im Cockpit-Preset.

**Kritiker-Paarung (hart):** Builder-Familie ≠ Kritiker-Familie. Die
Paarungstabelle steht in `references/besetzung.md` — sie ist nicht optional.

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

Ein **frischer** Agent (`sonnet-worker`) zieht die unabhängig verbesserten
Stücke zu einem Ganzen zusammen: Abstände, Typo, Ton, Namensgebung.
Kein Redesign — nur Angleich. Ohne diesen Schritt wirkt das Ergebnis
zusammengestückelt, obwohl jedes Stück für sich gut ist.

### 6. Stand sichtbar halten

`gauntlet/<name>/workbench.md` — je Stück: Screenshot-Pfad, letztes Verdikt,
offene Lücke, Rundenzahl, Builder/Kritiker-Paarung. Raphael schaut vom Handy,
ohne den Lauf zu unterbrechen.

### 7. Stoppen

Kein festes Rundenlimit für den Gesamtlauf. Schluss ist, wenn die Zugewinne
erkennbar klein werden, das Budget endet, oder Raphael es sagt.
**„Noch nicht fertig" ist der Normalzustand beim Stoppen** — und wird als
solcher protokolliert.

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
- **Nie Fable/Opus als Subagent**; Kimi immer K3, nie HighSpeed.
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
  abgebrochen.
