# Planner-Executor-Protokoll (Zwei-Session-Betrieb)

Verbindlich (Raphael 01.09.2026): Raphael fährt Website-Arbeit in zwei
parallelen Sessions — eine **Planner-Session** und eine **Executor-Session**.
Die Sessions kommunizieren ausschließlich über Handoff-Prompts, die Raphael
kopiert oder die per `SendMessage`/cross-session zugestellt werden. Jede
Session muss davon ausgehen, dass ihr Gegenüber NICHTS aus ihrem eigenen
Verlauf kennt.

## Rollen

| Session | Macht | Macht nie |
|---|---|---|
| **Planner** | Plan, Sitemap, Page-Specs, Kritik-Auswertung, Priorisierung, Abnahme-Vorbereitung | Production-Code, Deploys |
| **Executor** | Build, Fixes, QA-Gates, Screenshots, Deploy | Plan umwerfen, Scope erweitern |

Beide Rollen laufen im `web`-Skill (Planner = Modus plan/kritik,
Executor = Modus build). Das Protokoll ändert die Modi nicht — es regelt
die Übergaben.

## Die Truth-Datei: das Original überlebt jede Session

Kernproblem: Nach 2× Kritik steht eine Session bei ~400k Tokens; eine
frische Session braucht dann eine Zusammenfassung UND das unveränderte
Original — eine Zusammenfassung von Zusammenfassungen ist verboten.

Deshalb liegt der Zustand nie nur im Chatverlauf, sondern immer auf Platte:

```
client-<name>/web/handoff/
  PLAN.md          # das Original: der freigegebene Plan (nur Planner schreibt)
  STATUS.md        # laufender Zustand (beide schreiben, append-artig)
  KRITIK-<n>.md    # je Kritikrunde eine Datei mit Fixliste + Verdict
```

- **PLAN.md** ist das Original. Es wird nie zusammengefasst, nie umgeschrieben,
  nur per datiertem Änderungsblock ergänzt („Änderung 01.09: …“). Eine frische
  Session liest PLAN.md immer vollständig.
- **STATUS.md** hält je Arbeitspaket eine Zeile: `[offen|in-arbeit|gebaut|
  geprüft|abgenommen] — Paket — Beleg (Pfad/Gate) — Datum`. Kein Prosa-Log.
- **KRITIK-n.md** ist das Ergebnis einer Kritikrunde: Fixliste mit
  Screenshot-Pfaden und Verdicts. Alte Kritikrunden werden nicht in neue
  kopiert; erledigte Punkte werden in STATUS.md abgehakt.

## Handoff-Format (beide Richtungen)

Jeder Handoff-Prompt hat genau vier Blöcke, nichts weiter:

1. **Auftrag** — was die Empfänger-Session jetzt tut (imperativ, 1–5 Punkte).
2. **Quellen** — Dateipfade: immer `PLAN.md` + `STATUS.md`, plus die aktuelle
   `KRITIK-n.md`. Keine Inhalte inline duplizieren, die in den Dateien stehen.
3. **Grenzen** — was ausdrücklich NICHT Teil des Auftrags ist, inkl. aktueller
   Raphael-Neins (aus DESIGN.md/DECISIONS.md referenziert).
4. **Rückgabe** — was die Session zurückschicken soll: erledigte Pakete mit
   Beleg (Gate-Ausgabe, Screenshot-Pfad), Blocker als `BLOCKED` mit Grund,
   offene Entscheidungen für Raphael.

Planner→Executor: Blöcke 1–3 aus PLAN.md abgeleitet.
Executor→Planner: Block 4 zuerst; STATUS.md ist vor dem Handoff aktualisiert.

## Session-Rotation (bei vollem Kontext)

Wenn eine Session ersetzt werden muss (Kontext voll, ~ab 70–80 % Auslastung
proaktiv):

1. Die alte Session aktualisiert STATUS.md und schreibt einen
   **Rotations-Handoff** ans Ende von STATUS.md: 5–10 Zeilen — erledigt seit
   letzter Rotation, aktueller Schritt, nächster Schritt, aktive Neins.
2. Die frische Session startet mit genau einem Prompt:
   „`/web` — übernimm als [Planner|Executor] für client-<name>. Lies
   `handoff/PLAN.md` vollständig, dann `handoff/STATUS.md`, dann die höchste
   `KRITIK-n.md`. Mach beim nächsten offenen Schritt weiter.“
3. Verboten: die Zusammenfassung der alten Session als Ersatz für PLAN.md
   verwenden; Verworfenes aus altem Verlauf wieder einbauen (Neins stehen in
   DESIGN.md/DECISIONS.md und STATUS.md, nur die zählen).

## Regeln

- Compaction-Summaries und Chat-Rückblicke sind Beleg, nie Autorität.
  Autorität ist PLAN.md + STATUS.md + DESIGN.md/DECISIONS.md.
- Der Executor meldet jede Abweichung vom Plan als eigene Zeile in STATUS.md
  („Abweichung: … Grund: …“) statt sie still einzubauen; der Planner
  entscheidet, ob PLAN.md einen Änderungsblock bekommt.
- Kritikrunden nummerieren durch (KRITIK-1, KRITIK-2, …), auch über
  Session-Rotationen hinweg.
- Screenshots/PNGs bleiben in Leaf-Tasks; in Handoff-Dateien stehen nur Pfade
  und Verdicts.
