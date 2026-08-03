---
name: handoff
version: 0.2.0
description: >
  Feuert vor jedem /clear und am Session-Ende: schreibt einen Übergabe-Brief,
  damit die nächste Session ohne Verlust weiterarbeitet. Fakten statt
  Anweisungen (State, not instructions), inkl. Fallen/Sackgassen-Sektion und
  Secret-Redaktion. Trigger: "handoff", "übergeben", "vor /clear", "Session
  beenden", "~300-400k Tokens erreicht".
class: O
scope: agency
sensitivity: internal
loads: [references/handoff-template.md]
requires_skills: []
completion_criteria:
  - "PROGRESS.md aktualisiert: Stand, offene Punkte, nächster Schritt, Gates-Status"
  - "Alle berührten Repos committet + gepusht/gebackupt"
  - "Übergabe-Brief nach dem Template geschrieben, inkl. Fallen/Sackgassen und ohne Secret-Werte im Klartext"
---

# handoff — Session-Übergabe

**Lies zuerst:**
`/root/raphael-command-center/AGENTS.md` (Session-Ritual, Regeln 3, 5, 9),
das aktuelle `PROGRESS.md` / `DECISIONS.md` / `worklog/` des berührten Repos.

## Zweck (1 Satz)

Den Stand so auf die Festplatte schreiben, dass eine frische Session (nach `/clear` oder
Modellwechsel) verlustfrei weitermacht — denn nur Git-getrackte Dateien zählen.

## Wann

- Ab ~300–400k Tokens: `/handoff` schreiben, dann **hart `/clear`** (Regel 3).
- Vor jedem Modellwechsel (= neue Session, Regel 6).
- Am Session-Ende (Ritual: Commit + Push/Backup + Handoff, Regel 9).

## Ablauf

1. **Stand sichern** — PROGRESS.md: was erledigt, was WIP=1 gerade offen, Gates-Status.
2. **Entscheidungen festhalten** — DECISIONS.md: was warum entschieden (damit die nächste
   Session nicht neu diskutiert).
3. **Nächster Schritt exakt** — eine konkrete, sofort startbare Anweisung.
4. **Commit + Push/Backup** in jedem berührten Repo.
5. **Übergabe-Brief** nach `references/handoff-template.md` — an den Anfang des nächsten
   Prompts (Cache-Prefix).

## Gotchas

- **"Fast fertig, mach ich gleich" reicht nicht** — Stand lebt auf der Platte, nicht im
  Kontext. Ungespeichert = verloren.
- Nach dem Handoff **hart** `/clear` — nicht "nur noch schnell". Kontext ist Verbrauchsgut.
- Übergabe-Brief kurz und konkret: nächste Session soll in 30 Sekunden loslegen können,
  nicht erst 20 Min Kontext rekonstruieren.
- Uncommittete Änderungen nie im Handoff "erwähnen" — erst committen, dann übergeben.
- Fehlende Fallen/Sackgassen-Sektion kostet die nächste Session Zeit: bereits gescheiterte
  Ansätze sind die teuerste, am schlechtesten wiederherstellbare Information — Code zeigt
  das Was, nur der Handoff kennt das Warum und was schon nicht ging.
- **"Ging nicht" gehört erst nach dem Schnellpfad in den Brief** — eine als unmöglich
  übergebene Wand wird von der nächsten Session als Tatsache geerbt. Vorher
  [unstuck](/root/raphael-skills/skills/methodik/unstuck/SKILL.md) fahren und die
  Winkel-Liste mit übergeben; ohne Liste ist es eine Vermutung, kein Stand.
