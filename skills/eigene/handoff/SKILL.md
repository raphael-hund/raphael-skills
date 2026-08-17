---
name: handoff
version: 0.3.1
description: >
  Feuert für JEDE Übergabe — zwei Modi: (1) SESSION: vor jedem /clear und am
  Session-Ende einen Übergabe-Brief für die eigene nächste Session schreiben
  (PROGRESS.md/DECISIONS.md, Commit+Push, hartes /clear). (2) EXTERN: das
  Gespräch zu einem redigierten Übergabe-Dokument für eine andere Instanz,
  einen Subagenten oder eine externe Person verdichten (Verweis statt Duplikat,
  Ablage im OS-Temp). Fakten statt Anweisungen, inkl. Fallen/Sackgassen und
  Secret-Redaktion. Trigger: "handoff", "übergeben", "vor /clear", "Session
  beenden", "~300-400k Tokens erreicht", "Handoff für einen anderen Agenten",
  "an Subagenten übergeben", "externe Übergabe", "handoff-ext".
class: O
scope: agency
sensitivity: internal
loads: [references/handoff-template.md]
requires_skills: []
completion_criteria:
  - "Modus SESSION: PROGRESS.md aktualisiert (Stand, offene Punkte, nächster Schritt, Gates-Status), Repos committet + gepusht/gebackupt, Übergabe-Brief nach Template ohne Secrets im Klartext"
  - "Modus EXTERN: Dokument verweist auf Artefakte statt sie zu duplizieren, Redaktion geprüft (keine Geheimnisse/PII), Ablage im OS-Temp-Verzeichnis statt im Repo"
---

# handoff — Übergabe (Session + Extern)

## Modus wählen

- **SESSION** (Default): die eigene nächste Session im selben Repo macht weiter
  (nach `/clear` oder Modellwechsel). Ablauf unten.
- **EXTERN**: eine **andere Instanz** macht weiter — Subagent, anderes
  Werkzeug/Modell oder externe Person ohne Zugriff auf unser Git-Ritual.
  Ablauf siehe Abschnitt "Modus EXTERN".

**Lies zuerst (Modus SESSION):**
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
   Session nicht neu diskutiert). Raphael-Nein zu einem Asset: Route + Dateipfad
   + Ersatz in DECISIONS/DESIGN, nicht nur als Satz im Brief.
3. **Nächster Schritt exakt** — eine konkrete, sofort startbare Anweisung.
4. **Commit + Push/Backup** in jedem berührten Repo.
5. **Übergabe-Brief** nach `references/handoff-template.md` — an den Anfang des nächsten
   Prompts (Cache-Prefix).

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
- **EXTERN: Ungeprüfte Redaktion ist ein Leck, kein Detail** — Geheimnisse/PII vor
  Ablage aktiv suchen, nicht nur hoffen, dass keine drin sind.
- **EXTERN: Referenz statt Kopie** hält Dokument und Quelle synchron — eine Kopie
  veraltet sofort. Externe Empfänger kennen unsere internen Pfade/Konventionen
  nicht — das Dokument muss für sich allein verständlich sein.
