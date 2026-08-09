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

      PLAN-Step-Map:
      | Step-ID | depends_on | Owner | Gate | Ergebnis/Beleg |
      | <echte Plan-Step-ID> | <...> | <tatsächlich gelaufene agentType(s)> | <...> | <...> |
      | <nächste Plan-Step-ID> | <...> | <tatsächlich gelaufene agentType(s)> | <...> | <...> |
      | review | <alle Plan-Step-IDs> | <tatsächlich gelaufene Reviewer> | <...> | <...> |

      Familienabdeckung:
      - Kimi: <agentType + echte Rolle + Ergebnis/Beleg>
      - Grok: <agentType + echte Rolle + Ergebnis/Beleg>
      - Sol: <agentType + echte Rolle + Ergebnis/Beleg>
      - Terra: <agentType + echte Rolle + Ergebnis/Beleg>
      - Luna: <agentType + echte Rolle + Ergebnis/Beleg>
      - Opus: <agentType + echte Rolle + Ergebnis/Beleg>
      - Sonnet: <agentType + echte Rolle + Ergebnis/Beleg>
      - Haiku: <agentType + echte Rolle + Ergebnis/Beleg>

      Nested-Delegation:
      - Lead <agentType> → Runtime-Child <agentType>: <Step-ID>, <child_call_id>,
        <echte Welle>, <Child-Auftrag>, <Child-Ergebnis>, Beleg: <Output/Datei>.
      - <Step-ID>: nicht sicher zerlegbar — Begründung: <warum kein sinnvoller
        Child-Schnitt möglich war>.

      Routenausfälle/Ersatz:
      - Keine.
      - <Familie/Route>: <Fehlercode und Beleg> → Ersatz: <agentType/Familie> →
        Auswirkung: <was dadurch anders war>.
```

Die Map muss jeden Plan-Step als `Step → Owner → Gate → Ergebnis` belegen. Eine
Familie darf nur dann fehlen, wenn der echte Routenausfall mit Beleg und der
Ersatz dokumentiert ist. Für einen sinnvoll zerlegbaren Step ist ein Lead→Child-
Beleg Pflicht; nur wenn der Schnitt nicht sicher ist, steht dort ausdrücklich
`nicht sicher zerlegbar` mit Begründung. Das Cockpit protokolliert seine
Verifikation, aber keinen solo erledigten Plan-Step.

- Solo-Runde (Kleinst-Fix ohne Workflow): statt Run-ID `SOLO` schreiben +
  Begründung (eine Datei, <5 Min). Bei einer Substanz-Runde ist SOLO nicht
  zulässig.
- Leere Runde: `- [x] R<N>: nichts Belegbares gefunden — <was geprüft wurde>.`
  Die Plan-Step-Map und Familienabdeckung trotzdem ausfüllen; nichts erfinden.
- Abgebrochene Vorrunde (Working-Tree bei Rundenstart nicht sauber, Schritt 0
  der Runden-Mechanik): `- [x] ABGEBROCHEN R<N>: <was lag halb vor (Dateien,
  git status)> → <committet mit Hash | verworfen mit git-Befehl>. Ursache falls
  bekannt: <Session-Tod/Cron-Timeout/Workflow-Abbruch>.` Erst danach beginnt
  die neue Runde regulär mit Schritt 1.

## Offene-Punkte-Liste

Unter den Runden-Einträgen eine `- [ ]`-Liste als Backlog. Jede Runde nimmt
den obersten offenen Punkt, es sei denn, ein Kritiker-Fund ist KRITISCH
(dann der zuerst).
