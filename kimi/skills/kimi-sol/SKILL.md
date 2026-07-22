---
name: kimi-sol
description: "Nur fuer die exakten Trigger /kimi-sol, Kimi→Sol, Kimi -> Sol, Kimi mit Sol prüfen oder Kimi mit Sol pruefen: Root-Kimi baut, dann prueft der lokale sol-subagent-Runner read-only mit frischer Einmalfreigabe."
---

# kimi-sol

Root-Kimi baut oder recherchiert ein begrenztes Artefakt. Danach laedt sie die
installierte Nutzer-Skill `sol-subagent` mit `Skill`, folgt deren aktuellem
Vertrag und startet deren lokalen Runner in `read`-Modus fuer eine
unabhaengige Sol-Pruefung.

## Exakte Aktivierung

Nur diese fuenf Trigger sind erlaubt:

- `/kimi-sol`
- `Kimi→Sol`
- `Kimi -> Sol`
- `Kimi mit Sol prüfen`
- `Kimi mit Sol pruefen`

Die nackten Begriffe `Kimi` oder `Sol`, generische Review-Wuensche und andere
Kombinationen aktivieren diesen Skill nicht. Trigger nicht erweitern,
normalisieren oder aus aehnlichen Formulierungen ableiten.

## Kimi-Code- und Todo-Vertrag

Zielhost ist Kimi Code 0.28.1. Nutze `TodoList`, `AskUserQuestion`, `Skill`,
`Read`, `Write`, `Edit`, `Bash`, `Grep`, `Glob`, `FetchURL` und `WebSearch`.
`Agent` und `AgentSwarm` werden in diesem Skill nicht aufgerufen; es gibt
keine rekursive Kimi-Delegation.

TodoList dient nur sichtbaren Phasen. Jeder Eintrag hat exakt `title` und
`status`; nur `pending`, `in_progress`, `done` sind erlaubt, waehrend der
Arbeit genau ein `in_progress`. `request_id`, Pfad, Hash, Route und Verdict
sind keine Todo-Zusatzfelder.

## Ablauf

1. **Paket und Artefakt.** Root grenzt Aufgabe, Repository, erlaubte Pfade,
   Quellen, Tests und eine nicht-leere `request_id` ab. Das finale Artefakt
   liegt unter einem offengelegten absoluten Pfad. Root misst die Bytezahl und
   berechnet mit `Bash` `sha256sum --binary` ueber exakt diese Bytes. Zwischen
   Hash und Review keine Normalisierung, Umkodierung oder Mutation.
2. **Abhaengigkeit laden.** Rufe `Skill` mit dem exakten Namen
   `sol-subagent` auf. Folge der geladenen Fassung; rate weder Runner-Pfad noch
   Route. Ist Skill oder Runner nicht verfuegbar, stoppe fail-closed mit
   `REVIEWER_UNAVAILABLE`.
3. **Kosten offenlegen und frisch freigeben.** Sage vor jedem Runner-Aufruf
   explizit: Dieser eine Aufruf geht cross-provider an GPT-5.6 Sol ueber die
   lokale CLI, kann Kosten/Quota verbrauchen und versucht mechanisch Seat 1,
   dann Seat 2 derselben Modellfamilie. Frage **unmittelbar vor dem Bash-
   Aufruf** mit `AskUserQuestion` nach einer frischen Einmalfreigabe fuer
   genau `request_id`, Artefaktpfad, SHA-256, Repository und `read`-Modus.
   Zwischen Ja und Runner keine fremde Aktion. Fruehere Zustimmung, Trigger,
   Abo oder Session-Vorgabe zaehlt nicht. Ohne klares Ja:
   `APPROVAL_REQUIRED`, kein Runner.
4. **Read-only Runner starten.** Verwende den vom geladenen Skill genannten
   absoluten lokalen Runner-Befehl mit `read`, absolutem Repository-Pfad und
   Prompt ueber stdin. Kopiere den absoluten Runner-Pfad aus der **neu
   geladenen `sol-subagent`-Anweisung**; verwende insbesondere nicht den
   `KIMI_SKILL_DIR`-Wert dieses `kimi-sol`-Skills.

   Der Prompt nennt Ziel, `request_id`, absoluten Artefaktpfad, Bytezahl,
   SHA-256, Pruefkriterien und verlangt: keine Datei aendern; keine Subagents,
   Agents oder Nachkommen; nicht pushen, mergen, releasen, deployen oder zum
   Nutzer sprechen. Er fordert das untenstehende strikte Verdictformat.
5. **Mechanische Runner-Belege pruefen.** Lies die Bash-Ausgabe und verlange
   `SOL_SUBAGENT_STATUS=ok`, `SOL_SUBAGENT_SEAT=1` oder `2`, exakt
   `SOL_SUBAGENT_OUTPUT=streamed` und einen nicht-leeren
   `SOL_SUBAGENT_FINAL_B64`-Wert. Das vor den Markern gestreamte
   CLI-Transkript dient nur der Diagnose; parse daraus kein Verdict. Dekodiere
   `SOL_SUBAGENT_FINAL_B64` mit Base64 vollstaendig im laufenden Kontext. Der
   Runner loescht seine temporaeren Prompt-, Transkript- und Final-Dateien
   beim Exit. Bei `SOL_SUBAGENT_STATUS=error`, fehlendem Seat oder
   fehlendem/ungueltigem Base64-Finalwert:
   `REVIEWER_UNAVAILABLE`; kein Retry, Provider- oder Modellfallback ohne
   neue Nutzerentscheidung.
6. **Verdikt und Bytes validieren.** Die erste nichtleere Zeile des
   dekodierten Finaltexts ist exakt `REVIEW_PASS` oder `REVIEW_FAIL`.
   Das Verdict muss
   dieselbe `request_id`, denselben 64-stelligen SHA-256, Findings mit
   Pfad/Beleg und Tests enthalten. Root hasht das Artefakt nach dem Lauf erneut.
   Unbekannter Token, Hash-/Request-Abweichung oder geaenderte Bytes ergeben
   `MALFORMED_VERDICT` bzw. `MALFORMED_ARTIFACT`.
7. **Root behebt und recheckt.** Root verifiziert Findings selbst gegen
   Dateien, Diff und Gates. Bei `REVIEW_FAIL` behebt Root nur bestaetigte
   Punkte, erzeugt den neuen Byte-Hash und wiederholt ab Schritt 3: erneute
   Offenlegung, frische Einmalfreigabe, neuer read-only Lauf. Ein altes
   Verdict gilt nie fuer neue Bytes. Erst mechanisches `REVIEW_PASS` plus
   Roots eigene Pruefung ergibt `VERIFIED`.

## Striktes Sol-Prompt-Verdict

```text
REVIEW_PASS
request_id: <exakt uebernommene ID>
artifact_sha256: <exakt uebernommene 64 hex Zeichen>
findings: <Pfad, Beleg, Schweregrad; leer nur mit Begruendung>
tests: <Befehl und Ergebnis>
```

oder dieselben Pflichtfelder unter dem exakten ersten Token `REVIEW_FAIL`.
Andere erste Tokens werden nicht interpretiert.

## Unabhaengigkeit und Grenzen

Unabhaengigkeit folgt nicht aus Selbstauskunft oder einer behaupteten
Kontext-ID. Beleg sind die separate `run-sol.sh`-Invocation, der
fixierte lokale Sol-Profilpfad im geladenen Skill und die mechanischen
`SOL_SUBAGENT_STATUS`-, `SOL_SUBAGENT_SEAT`-, `SOL_SUBAGENT_OUTPUT`- und
`SOL_SUBAGENT_FINAL_B64`-Werte samt vollstaendig dekodiertem Finaltext.
`route accepted` allein
beweist keine Identitaet.

- Immer `read`, niemals `write`; der Sol-Lauf darf keine Dateien aendern.
- Genau ein Runner-Aufruf pro frischer Einmalfreigabe.
- Keine Credential-/Auth-Aktion, automatische Providerwahl, rekursive Kimi-
  Delegation, Commit-, Push-, Merge-, Release- oder Deploy-Aktion.
- Skill-/Runner-/Output-Fehler bleiben fail-closed; kein Ersatzreviewer.

## Gotchas

- `Skill` nur zu erwaehnen laedt `sol-subagent` nicht; das Tool muss wirklich
  aufgerufen und dessen geladener Vertrag befolgt werden.
- `SOL_SUBAGENT_STATUS=ok` ohne gueltigen Base64-Finaltext ist kein Review; das
  Transkript in `SOL_SUBAGENT_OUTPUT` ist niemals das strikte Verdict.
- Nach jedem Root-Fix sind Hash und Freigabe veraltet; beides neu erzeugen.
