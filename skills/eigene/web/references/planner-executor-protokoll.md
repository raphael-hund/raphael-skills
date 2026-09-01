# Plan-Kritik-Bau-Protokoll (Drei-Session-Betrieb)

**Einstieg: `rolle-plan.md` / `rolle-kritik.md` / `rolle-bau.md` — dort steht,
was deine Session tut.** Dieses Dokument ist die Detail-Ebene dahinter.

Verbindlich (Raphael 01.09.2026): Raphael fährt Website-Arbeit in drei getrennten
Sessions — **Plan**, **Kritik** und **Bau**. Die Sessions kommunizieren ausschließlich
über Handoff-Prompts, die Raphael kopiert oder die per `SendMessage`/cross-session
zugestellt werden. Jede Session muss davon ausgehen, dass ihr Gegenüber NICHTS aus
ihrem eigenen Verlauf kennt. Nie zwei Modi in einem Chat.

## Rollen

| Session | Macht | Macht nie |
|---|---|---|
| **Plan** | PLAN.md, PRUEFGEGEN.md, Reihenfolge | Code, PNG-Read, Subagenten |
| **Kritik** | Sweep-Skript + Flotte nach `kritik-matrix.md`, KRITIK-n.md, Ledger | Code, Deploy, PNG-Dump |
| **Bau** | Nur überlebende Fixes, Re-Sweep, Ledger | Neue Kritik erfinden, Plan umwerfen |

Drei Chats. `web` in allen. Kritik und Bau zusätzlich `/orchestrate`.
Spawn-Plan: `kritik-matrix.md`.

## Die Truth-Datei: das Original überlebt jede Session

Kernproblem: Nach 2× Kritik steht eine Session bei ~400k Tokens; eine
frische Session braucht dann eine Zusammenfassung UND das unveränderte
Original — eine Zusammenfassung von Zusammenfassungen ist verboten.

Deshalb liegt der Zustand nie nur im Chatverlauf, sondern immer auf Platte
(absoluter Pfad, beim ersten Handoff anlegen):

```
/root/clients/client-<name>/web/handoff/
  PLAN.md          # das Original: der freigegebene Plan (nur Plan schreibt)
  PRUEFGEGEN.md    # Prüflinsen, Skills und Referenzen (nur Plan schreibt)
  STATUS.md        # laufender Zustand (Kritik und Bau schreiben append-artig)
  KRITIK-<n>.md    # je Kritikrunde eine Datei mit Fixliste + Verdict
```

**Abgrenzung:** Dieses Session-Handoff ist NICHT das Run-Evidence-Handoff
aus SKILL.md (Completion, fail-closed). Beide gelten nebeneinander:
PLAN.md ersetzt keinen `website-plan`-v3-Vertrag und `run-evidence.json`
nicht. Ist der Plan ein v3-Plan, verweist PLAN.md auf dessen Pfad und
Hash; die Bau-Session läuft trotzdem durch alle Gates (v3-Validator, G1,
shot-sweep, visual-aaa). Eine frische Bau-Session darf keinen Gate
überspringen, nur weil PLAN.md existiert.

- **PLAN.md** ist das Original. Es wird nie zusammengefasst, nie umgeschrieben,
  nur per datiertem Änderungsblock ergänzt („Änderung 01.09: …“). Eine frische
  Session liest PLAN.md immer vollständig.
- **PRUEFGEGEN.md** ist der Prüflinsen-Vertrag des Plans; Kritik liest ihn vor
  jedem Spawn vollständig. Ohne diese Datei startet die Kritik-Session nicht.
- **STATUS.md** hält je Arbeitspaket eine Zeile: `[offen|in-arbeit|gebaut|
  geprüft|abgenommen] — Paket — Beleg (Pfad/Gate) — Datum`. Kein Prosa-Log.
  Sobald ein Sweep existiert, zusätzlich Shot-Ledger:
  `| pfad | viewport | gelesen-von | verdict |` — eine Zeile pro Fold/Hover/Mobil-Shot.
  `gelesen-von` nennt das Leaf (z. B. `visual-kritiker`), nie „Parent hat reingeschaut“.
- **KRITIK-n.md** ist das Ergebnis einer Kritikrunde: Fixliste mit
  Screenshot-Pfaden und Verdicts. Alte Kritikrunden werden nicht in neue
  kopiert; erledigte Punkte werden in STATUS.md abgehakt.

## Handoff-Format (beide Richtungen)

Jeder Handoff-Prompt hat genau vier Blöcke, nichts weiter:

1. **Auftrag** — was die Empfänger-Session jetzt tut (imperativ, 1–5 Punkte).
2. **Quellen** — Dateipfade: immer `PLAN.md` + `PRUEFGEGEN.md` + `STATUS.md`,
   plus die aktuelle `KRITIK-n.md`. Keine Inhalte inline duplizieren, die in den
   Dateien stehen.
3. **Grenzen** — was ausdrücklich NICHT Teil des Auftrags ist, inkl. aktueller
   Raphael-Neins (aus DESIGN.md/DECISIONS.md referenziert).
4. **Rückgabe** — was die Session zurückschicken soll: erledigte Pakete mit
   Beleg (Gate-Ausgabe, Screenshot-Pfad), Blocker als `BLOCKED` mit Grund,
   offene Entscheidungen für Raphael.

Plan→Kritik/Bau: Blöcke 1–3 aus PLAN.md und PRUEFGEGEN.md abgeleitet.
Kritik/Bau→Plan: Block 4 zuerst; STATUS.md ist vor dem Handoff aktualisiert.

**Ausgefülltes Beispiel (Plan→Bau):**

```
/web /orchestrate — Bau für client-braun.

Auftrag:
1. Fixliste aus KRITIK-2 Punkt 1–4 umsetzen (Hero-H1, Stats-Band, FAQ-Intro, CTA-Farbe).
2. Danach shot-sweep --base http://127.0.0.1:4321 und G1 laufen lassen.

Quellen: /root/clients/client-braun/web/handoff/PLAN.md,
/root/clients/client-braun/web/handoff/PRUEFGEGEN.md,
/root/clients/client-braun/web/handoff/STATUS.md,
/root/clients/client-braun/web/handoff/KRITIK-2.md

Grenzen: Kein Redesign der Leistungs-Sektion (Raphael-Nein 28.08.,
DECISIONS.md Zeile 14). Keine neuen Dependencies.

Rückgabe: Je Punkt erledigt/BLOCKED mit Beleg (Gate-Ausgabe oder
Screenshot-Pfad), STATUS.md aktualisiert, offene Raphael-Entscheidungen.
```

**Beispiel Rückgabe (Bau→Plan):**

```
Rückgabe client-braun, KRITIK-2:
1. Hero-H1 SEO-direkt umgeschrieben — erledigt (shots/hero-desktop-00-fold.png)
2. Stats-Band Belegsätze — erledigt (G1 Exit 0)
3. FAQ-Intro — erledigt
4. CTA-Farbe — BLOCKED: Token-Konflikt mit S1, braucht Plan-Entscheid.
STATUS.md aktualisiert. Offen für Raphael: keine.
```

## Session-Rotation (bei vollem Kontext)

Wenn eine Session ersetzt werden muss (Kontext voll, ~ab 70–80 % Auslastung
proaktiv):

1. Die alte Session aktualisiert STATUS.md und schreibt einen
   **Rotations-Handoff** ans Ende von STATUS.md: 5–10 Zeilen — erledigt seit
   letzter Rotation, aktueller Schritt, nächster Schritt, aktive Neins.
2. Die frische Session startet mit genau einem Prompt:
   „`/web` — übernimm als [Plan|Kritik|Bau] für client-<name>. Lies
   `handoff/PLAN.md` vollständig, dann `handoff/PRUEFGEGEN.md`,
   `handoff/STATUS.md`, dann die höchste `KRITIK-n.md`. Mach beim nächsten
   offenen Schritt weiter.“
3. Verboten: die Zusammenfassung der alten Session als Ersatz für PLAN.md
   verwenden; Verworfenes aus altem Verlauf wieder einbauen (Neins stehen in
   DESIGN.md/DECISIONS.md und STATUS.md, nur die zählen).

## Regeln

- Compaction-Summaries und Chat-Rückblicke sind Beleg, nie Autorität.
  Autorität ist PLAN.md + PRUEFGEGEN.md + STATUS.md + DESIGN.md/DECISIONS.md.
- Die Bau-Session meldet jede Abweichung vom Plan als eigene Zeile in STATUS.md
  („Abweichung: … Grund: …“) statt sie still einzubauen; die Plan-Session
  entscheidet, ob PLAN.md einen Änderungsblock bekommt.
- Kritikrunden nummerieren durch (KRITIK-1, KRITIK-2, …), auch über
  Session-Rotationen hinweg.
- Screenshots/PNGs bleiben in Leaf-Tasks; in Handoff-Dateien stehen nur Pfade
  und Verdicts.

## Vorschau vs Launch (hart, 01.09.2026)

Raphael will dem Kunden eine geile Vorschau zeigen. Plan, Kritik und Bau
dürfen Fakten-Nits nicht als `BLOCKED` führen.

- **Parken, nicht blocken:** Satz, Wort, Bild, Sektion, Review-Platzhalter,
  50 vs 60, 24 vs 28 Stunden, Domain/Vercel. Inhalt ist ein Swap.
  Preview-Blocker: Ablauf, Sitemap, Idee, Design.
- **`biggest_gap` einer KRITIK-n.md ist visuell.** Klassifizierer:
  `node /root/raphael-skills/skills/eigene/web/scripts/preview-befund-klasse.mjs "<befund>"`.
  `preview: park` kommt nicht in den Bau-Auftrag als Blocker.
- **Proof nicht erfinden.** Unklare echte Zahl = Working-Zahl plus FAKT-GATE.
- Domain/DNS/Vercel ist Ops, fünf Minuten, kein Design-Gate.

## Skills je Session (Chips, hart)

Nicht eine Skill-Liste in den Prompt kippen. Genau diese Chips, sonst nichts.

| Session | Chip-Leiste | Effort | Nie |
|---|---|---|---|
| **Plan** | nur `/web` | high | `/orchestrate`, Slash `/ultracode`, `/website-plan`, `/design`, `/visual-aaa`. website-plan: 0 Children. |
| **Kritik** | `/web` + `/orchestrate` | high | Code; PNG-Dump; Slash `/ultracode`. Flotte = `kritik-matrix.md`. |
| **Bau** | `/web` + `/orchestrate` | Ultracode-Session-Default | Slash `/ultracode`; `/design`; PNG-Dump; neue Kritik erfinden |

`web` lädt intern: screenshot-kritik-loop, shot-sweep, visual-aaa als Gate, design, FAKT-GATE. Extra-Chips dafür machen den Parent dicker, nicht besser.

**Kritik-Startzeile:**

```
/web /orchestrate — Kritik, client-<name>. Controller, kein Builder.
Lies PRUEFGEGEN.md. Ohne die Datei STOP.
Starte die Flotte aus kritik-matrix.md (PAGE + SITE + LENS).
Parent liest keine PNGs. Ledger + KRITIK-n.md mit Merge-Regel.
```

**Bau-Startzeile (wörtlich, vor dem Handoff):**

```
/web /orchestrate — Bau, client-<name>. Du bist Controller, nicht der Builder.
Der Ultracode-Session-Default genügt; kein /ultracode-Slash nötig.
Parent editiert keine CSS-/TSX-Datei und liest keine PNG-Binaries.
Starte im ersten Turn JETZT einen Dynamic Workflow. Leaves, so viele wie Pakete:
1. shot-sweep --base <dev-url> --static --states --mobile → manifest.json + PNG-Pfade
2. visual-kritiker (Grok) und kimi-recherche unabhängig auf denselben Fold/Hover-Shots
3. grok-worker nur für belegte Code-Ursachen (datei:zeile), Input = Shot-Pfad + CSS-Ausschnitt
4. opus-builder nur als Integrator für sichtbare UI-Fixes
Rückgabe an Plan: STATUS.md + KRITIK-n.md mit Shot-Pfaden, biggest_gap visuell,
FAKT-GATE geparkt. Kein Solo-Debug von wipe.css im Parent.
```

**Screenshot-Vertrag (Bau):** Sweep-Leaf erzeugt die Liste. Jeder visuelle Leaf
bekommt NUR `manifest.json` + die PNG-Pfade seiner Route. Parent führt die Liste
(`pfad | viewport | gelesen-von | verdict`). 1440×900 Fold + 390×844 Pflicht.
fullPage ist kein Kritik-Input. Ohne frischen Sweep nach einem Fix = nicht geprüft.
