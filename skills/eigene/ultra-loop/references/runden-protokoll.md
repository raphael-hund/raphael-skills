# Runden-Protokoll — Format für den Loop-Stand

Lebt in der Stand-Datei der Mission (Standard:
`/root/raphael-brain/PROGRESS.md`, Abschnitt `## Skill-Loop`). Jede Runde
schreibt VOR dem Rundenende ihren Eintrag. Das Protokoll ist Arbeitsstand
(PROGRESS), KEIN Wiki-Wissen — Dauer-Erkenntnisse wandern separat als
Kandidat mit raw/-Beleg nach `wiki/_candidates/`.

## Kopf (einmal beim Aufsetzen)

```markdown
## Skill-Loop (Session <datum>, cron <job-id>, alle <N> Min)
Mission: <1 Satz>. Gates: <Liste>. Tabu: <Liste>.
```

## Eintrag pro Runde

```markdown
- [x] R<N> (<uhrzeit>, wf_<run-id>, <agentenzahl> Agents): <was fertig wurde>.
      Funde: <k> verifiziert / <g> gefixt / <s> verworfen (warum).
      Commits: <repo> <hash>. Nächstes: <1 Punkt>.
```

- Solo-Runde (Kleinst-Fix ohne Workflow): statt Run-ID `SOLO` schreiben +
  Begründung (eine Datei, <5 Min).
- Leere Runde: `- [x] R<N>: nichts Belegbares gefunden — <was geprüft wurde>.`
  Nichts erfinden.

## Offene-Punkte-Liste

Unter den Runden-Einträgen eine `- [ ]`-Liste als Backlog. Jede Runde nimmt
den obersten offenen Punkt, es sei denn, ein Kritiker-Fund ist KRITISCH
(dann der zuerst).
