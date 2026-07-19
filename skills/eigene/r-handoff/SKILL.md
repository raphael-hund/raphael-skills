---
name: r-handoff
version: 0.1.0
description: >
  Feuert vor jedem /clear und am Session-Ende: schreibt einen Übergabe-Brief,
  damit die nächste Session ohne Verlust weiterarbeitet. Trigger: "handoff",
  "übergeben", "vor /clear", "Session beenden", "~300-400k Tokens erreicht".
class: O
scope: agency
sensitivity: internal
loads: [references/handoff-template.md]
requires_skills: []
completion_criteria:
  - "PROGRESS.md aktualisiert: Stand, offene Punkte, nächster Schritt, Gates-Status"
  - "Alle berührten Repos committet + gepusht/gebackupt"
  - "Übergabe-Brief nach dem Template geschrieben"
---

# r-handoff — Session-Übergabe

**Lies zuerst:**
`/root/raphael-command-center/AGENTS.md` (Session-Ritual, Regeln 3, 5, 9),
das aktuelle `PROGRESS.md` / `DECISIONS.md` / `worklog/` des berührten Repos.

## Zweck (1 Satz)

Den Stand so auf die Festplatte schreiben, dass eine frische Session (nach `/clear` oder
Modellwechsel) verlustfrei weitermacht — denn nur Git-getrackte Dateien zählen.

## Wann

- Ab ~300–400k Tokens: `/r-handoff` schreiben, dann **hart `/clear`** (Regel 3).
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
