---
name: handoff
version: 0.6.0
description: >
  Feuert für JEDE Übergabe — zwei Modi: (1) SESSION: vor jedem /clear und am
  Session-Ende einen Übergabe-Brief für die eigene nächste Session schreiben
  (PROGRESS.md/DECISIONS.md, Write-Set committen, hartes /clear). (2) EXTERN:
  das Gespräch zu einem redigierten Übergabe-Dokument für eine andere Instanz,
  einen Subagenten oder eine externe Person verdichten (Verweis statt Duplikat,
  Ablage im OS-Temp). Fakten statt Anweisungen, inkl. Fallen/Sackgassen und
  Secret-Redaktion. Handoff ist Closeout: Brief schreiben, keine neue
  Produktarbeit. Trigger: "handoff", "übergeben", "vor /clear", "Session
  beenden", "Session-Handoff fällig", "Handoff für einen anderen Agenten",
  "an Subagenten übergeben", "externe Übergabe", "handoff-ext".
class: O
scope: agency
sensitivity: internal
loads: [references/handoff-template.md]
requires_skills: []
completion_criteria:
  - "Modus SESSION: Übergabe-Brief nach Template ohne Secrets im Klartext liegt; PROGRESS.md/DECISIONS.md nur falls schon vorhanden aktualisiert; Git nur für das Write-Set dieser Session (Hook-Fail = uncommitted + im Brief genannt); keine neue Produktarbeit im Handoff-Turn"
  - "Modus SESSION Pflicht-Abschluss: Datei liegt unter /root/eingang/ausgang/handoff/<projekt>-<YYYY-MM-DD>.md (nicht nur /tmp, nicht nur Repo), ist per SendUserFile mit display render zugestellt, und ihr letzter Block heißt 'Prompt für die nächste Session' und enthält Originalauftrag wörtlich + geladene Skills als /slash-Liste + Worktree-Pfad"
  - "Modus EXTERN: Dokument verweist auf Artefakte statt sie zu duplizieren, Redaktion geprüft (keine Geheimnisse/PII), Ablage im OS-Temp-Verzeichnis statt im Repo; keine neue Produktarbeit im Handoff-Turn"
---

# handoff — Übergabe (Session + Extern)

## Modus wählen

- **SESSION** (Default): die eigene nächste Session im selben Repo macht weiter
  (nach `/clear` oder Modellwechsel). Ablauf unten.
- **EXTERN**: eine **andere Instanz** macht weiter — Subagent, anderes
  Werkzeug/Modell oder externe Person ohne Zugriff auf unser Git-Ritual.
  Ablauf siehe Abschnitt "Modus EXTERN".

**Lies zuerst (Modus SESSION):** das aktuelle `PROGRESS.md` / `DECISIONS.md` /
`worklog/` der in **dieser Session berührten** Repos. Nicht `AGENTS.md`, nicht
das Wiki, nicht unberührte Repos.

## Zweck (1 Satz)

Den Stand so auf die Festplatte schreiben, dass eine frische Session (nach `/clear` oder
Modellwechsel) verlustfrei weitermacht — denn nur Git-getrackte Dateien zählen.

## Wann

- Sobald [`session-failover`](/root/.claude/skills/session-failover/SKILL.md)
  den Session-Handoff auslöst: `/handoff` schreiben, dann **hart `/clear`**.
- Vor jedem Modellwechsel (= neue Session, Regel 6).
- Am Session-Ende (Ritual: Write-Set committen + Handoff, Regel 9).

## Härtegrenze

Handoff ist Closeout. Der Turn schreibt den Brief und hört auf.
Keine neue Produktarbeit, kein Pilot, kein Skeleton, kein unstuck-Lauf.
Nächster Schritt steht im Brief und startet in der **nächsten** Session.

**Zeitbudget:** höchstens 8 Tool-Runden. Danach den Brief aus dem schon
Gelesenen schreiben, auch wenn Git hakt.

## Ablauf (SESSION)

1. **Brief zuerst** — `references/handoff-template.md` ausfüllen und unter
   `/root/eingang/ausgang/handoff/<projekt>-<YYYY-MM-DD>.md` ablegen. Fertig =
   Datei existiert.
2. **Stand nachziehen** — nur vorhandene `PROGRESS.md` / `DECISIONS.md` der
   berührten Repos; nichts neu anlegen, keine extra Repos scannen.
3. **Git nur Write-Set** — committen/pushen, was diese Session selbst
   geschrieben hat. `git add -A` ist verboten. Precommit-Deny: Datei
   unstaged lassen, Deny im Brief nennen, Turn nicht aufblähen.
4. **Pflicht-Abschluss** — die drei Punkte unten, keiner ist optional.
5. Stopp. Raphael `/clear`.

## Pflicht-Abschluss (SESSION) — drei Punkte, keiner optional

1. **Ablage im Ausgang** — die Handoff-Datei liegt unter
   `/root/eingang/ausgang/handoff/<projekt>-<YYYY-MM-DD>.md`. Nie nur unter
   `/tmp`, nie nur im Repo. Eine Repo-Kopie ist optional zusätzlich erlaubt,
   ersetzt die Ablage im Ausgang aber nicht: `/tmp` und Worktree sind vom Mac
   aus nicht erreichbar, der Ausgang ist synchron.
2. **Zustellen** — SendUserFile auf genau diese Datei, `display: render`.
   Ohne Zustellung ist der Brief geschrieben, aber nicht übergeben.
3. **Letzter Block der Datei** — heißt `Prompt für die nächste Session` und
   enthält den Originalauftrag wörtlich (nicht paraphrasiert, nicht gekürzt),
   die in dieser Session geladenen Skills als `/slash`-Liste und den
   Worktree-Pfad. Damit startet die nächste Session ohne Rekonstruktion.

Aufnehmende Seite: `/aufnehmen <pfad-zur-handoff-datei>`
(`/root/.claude/commands/aufnehmen.md`) liest den Brief, prüft Worktree,
Branch und Dev-Server und beginnt beim ersten offenen Punkt.

## Modus EXTERN — Übergabe an eine andere Instanz

Das laufende Gespräch so zu einem eigenständigen, redigierten Dokument verdichten,
dass eine fremde Instanz ohne Rückfragen anschließen kann. Kein Commit/Push-Zwang,
kein PROGRESS.md — das Dokument selbst ist die Übergabe.

1. Gespräch zusammenfassen: Ziel, Stand, offene Fragen, nächster konkreter Schritt.
2. **Nicht duplizieren** — was bereits in Specs, Plänen, ADRs, Issues, Commits oder
   Diffs steht, wird per Pfad/URL referenziert, nicht erneut ausgeschrieben.
3. Abschnitt "Empfohlene nächste Skills" ergänzen — welche Skills die aufnehmende
   Instanz sinnvollerweise aufruft.
4. Wenn Argumente übergeben wurden (Fokus der nächsten Session), das Dokument darauf
   zuschneiden.
5. **Redaktion** — API-Keys, Passwörter, personenbezogene Daten konsequent entfernen,
   bevor das Dokument irgendwo landet, an das eine fremde Instanz Zugriff hat.
6. Ablage im OS-Temp-Verzeichnis, nicht im Workspace/Repo — das Dokument ist eine
   Übergabe, kein Projekt-Artefakt.

## Kein Abschluss mit neuer Arbeit (beide Modi)

Der Bericht endet mit Stand, nächstem Schritt und Offen-Liste.
Nicht mit „Soll ich mit Punkt X anfangen?“ und nicht mit dem Start von Punkt X.
Produktentscheidungen und fehlende Zugangsdaten gehören in die Offen-Liste.

## Gotchas

- **"Fast fertig, mach ich gleich" reicht nicht** — Stand lebt auf der Platte, nicht im
  Kontext. Ungespeichert = verloren.
- Nach dem Handoff **hart** `/clear` — nicht "nur noch schnell". Kontext ist Verbrauchsgut.
- **Brief nur in `/tmp` oder nur im Repo ist keine Übergabe** — beides sieht Raphael
  am Mac nicht. Ausgang plus SendUserFile, sonst ist der Handoff nicht zugestellt.
- Übergabe-Brief kurz und konkret: nächste Session soll in 30 Sekunden loslegen können,
  nicht erst 20 Min Kontext rekonstruieren.
- Uncommittete Änderungen nie im Handoff "erwähnen" — Write-Set erst committen, dann
  übergeben; Hook-Fail im Brief als uncommitted nennen, nicht nachträglich debuggen.
- Fehlende Fallen/Sackgassen-Sektion kostet die nächste Session Zeit — nur bereits
  bekannte Fallen, kein unstuck-Lauf während des Handoffs.
- **"Ging nicht" ohne Beleg ist Vermutung** — als offen markieren, nicht als Wand
  vererben. unstuck gehört in die nächste Session, nicht in diesen Turn.
- **EXTERN: Ungeprüfte Redaktion ist ein Leck, kein Detail** — Geheimnisse/PII vor
  Ablage aktiv suchen, nicht nur hoffen, dass keine drin sind.
- **EXTERN: Referenz statt Kopie** hält Dokument und Quelle synchron — eine Kopie
  veraltet sofort. Externe Empfänger kennen unsere internen Pfade/Konventionen
  nicht — das Dokument muss für sich allein verständlich sein.
