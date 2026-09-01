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

Deshalb liegt der Zustand nie nur im Chatverlauf, sondern immer auf Platte
(absoluter Pfad, beim ersten Handoff anlegen):

```
/root/clients/client-<name>/web/handoff/
  PLAN.md          # das Original: der freigegebene Plan (nur Planner schreibt)
  STATUS.md        # laufender Zustand (beide schreiben, append-artig)
  KRITIK-<n>.md    # je Kritikrunde eine Datei mit Fixliste + Verdict
```

**Abgrenzung:** Dieses Session-Handoff ist NICHT das Run-Evidence-Handoff
aus SKILL.md (Completion, fail-closed). Beide gelten nebeneinander:
PLAN.md ersetzt keinen `website-plan`-v3-Vertrag und `run-evidence.json`
nicht. Ist der Plan ein v3-Plan, verweist PLAN.md auf dessen Pfad und
Hash; der Executor läuft trotzdem durch alle Gates (v3-Validator, G1,
shot-sweep, visual-aaa). Eine frische Executor-Session darf keinen Gate
überspringen, nur weil PLAN.md existiert.

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

**Ausgefülltes Beispiel (Planner→Executor):**

```
/web — Executor für client-braun. 

Auftrag:
1. Fixliste aus KRITIK-2 Punkt 1–4 umsetzen (Hero-H1, Stats-Band, FAQ-Intro, CTA-Farbe).
2. Danach shot-sweep --base http://127.0.0.1:4321 und G1 laufen lassen.

Quellen: /root/clients/client-braun/web/handoff/PLAN.md,
/root/clients/client-braun/web/handoff/STATUS.md,
/root/clients/client-braun/web/handoff/KRITIK-2.md

Grenzen: Kein Redesign der Leistungs-Sektion (Raphael-Nein 28.08.,
DECISIONS.md Zeile 14). Keine neuen Dependencies.

Rückgabe: Je Punkt erledigt/BLOCKED mit Beleg (Gate-Ausgabe oder
Screenshot-Pfad), STATUS.md aktualisiert, offene Raphael-Entscheidungen.
```

**Beispiel Rückgabe (Executor→Planner):**

```
Rückgabe client-braun, KRITIK-2:
1. Hero-H1 SEO-direkt umgeschrieben — erledigt (shots/hero-desktop-00-fold.png)
2. Stats-Band Belegsätze — erledigt (G1 Exit 0)
3. FAQ-Intro — erledigt
4. CTA-Farbe — BLOCKED: Token-Konflikt mit S1, braucht Planner-Entscheid.
STATUS.md aktualisiert. Offen für Raphael: keine.
```

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
