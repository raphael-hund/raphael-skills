# Dauerlauf — der Gauntlet läuft über Stunden von selbst weiter

> Der Gauntlet ist kein Einmal-Lauf. Er startet immer wieder neu, bis die
> Zugewinne klein sind, das Budget endet oder Raphael stoppt. Diese Datei
> beschreibt die Mechanik, die das trägt.

## Das Bild

```
Cron/Wakeup alle 20–30 Min
   └─ Welle N startet
        ├─ Stand lesen (workbench.md) → offene Lücken je Stück
        ├─ pro Stück: Builder (Familie A) → Kritiker (Familie B) → EINE Lücke
        ├─ Gates prüfen (externer Anker!)
        ├─ Glätten (frischer Agent)
        ├─ workbench.md fortschreiben (Runde, Verdikt, Zugewinn)
        └─ Abbruch prüfen → weiter oder CronDelete
```

Jede Welle ist ein eigener Workflow-Run mit eigener Run-ID. Der Loop merkt sich
seinen Stand **auf der Platte** (`workbench.md`), nicht im Kontext — sonst
stirbt er mit der Session.

## Aufsetzen (4 Schritte)

### 1. Mandat schreiben

Vor dem ersten Fire festlegen und in `gauntlet/<name>/mandat.md` ablegen:

```
WERKSTÜCK:   <was hochgezogen wird>
LATTE:       gauntlet/<name>/latte/   (inspizierbar, als Datei)
GATES:       <exakte Shell-Befehle, mind. einer ein externer Anker>
TABU:        Fremd-Baustellen, `git add -A`, Reward-Hacking, Rot-Klassen
ABBRUCH:     <mindestens EINE Bedingung, siehe unten>
BUDGET:      <Token-/Zeitrahmen oder "bis Raphael stoppt">
```

### 2. Abbruchbedingung — Pflicht vor dem Start

Mindestens eine, besser zwei. Ohne Abbruchbedingung wird der Loop nicht
gestartet:

- **Plateau:** 2 Wellen in Folge ohne dass ein Kritiker-Verdikt von `LATTE` auf
  `UNSERES` gekippt ist → Zugewinn ist klein, Schluss.
- **Rundenlimit gesamt:** z. B. 20 Wellen.
- **Zeitfenster:** z. B. bis 06:00 Uhr.
- **Alle Stücke gewonnen:** jedes Stück hat `gewinner: UNSERES` und alle Gates
  sind grün.
- **Budget:** Token-Rahmen erreicht.

Erreicht → `CronDelete <job-id>`, Abschluss-Eintrag im `workbench.md`, fertig.
Nicht weiterdrehen „weil noch Zeit ist".

### 3. Cron anlegen

```
CronCreate:
  cron:      "17,47 * * * *"     # NICHT :00/:30 — siehe Faustregel unten
  recurring: true
  durable:   false               # session-only, stirbt bewusst mit der Session
  prompt:    <das Wellen-Mandat, siehe unten>
```

**Minute nicht auf :00 oder :30 legen.** Alle Welt legt Cronjobs dorthin; ein
krummer Wert verteilt die Last. Bei 20–30-Minuten-Takt: z. B. `7,37` oder `17,47`.

Der Cron-Prompt trägt **immer** diese Bausteine:

```
Führe die nächste Gauntlet-Welle aus. Skill: orchestrate-gauntlet.
MANDAT:  gauntlet/<name>/mandat.md  (zuerst lesen)
STAND:   gauntlet/<name>/workbench.md  (lesen UND am Ende fortschreiben)
PFLICHT: Workflow-Tool starten, nicht solo arbeiten. Besetzung aus
         references/besetzung.md nachschlagen — Builder-Familie ≠ Kritiker-Familie.
EINE WELLE = ein Durchgang über alle offenen Stücke. Nicht zehn Dinge anfangen.
ABBRUCH prüfen: <die Bedingung aus dem Mandat>. Erreicht → CronDelete und melden.
long horizon session, human is away — autonom weiterarbeiten, bei Unsicherheit
nicht stoppen, Rot-Klassen bleiben bindend.
```

### 4. Welle 1 sofort fahren

Nicht auf den ersten Fire warten. Welle 1 zeigt sofort, ob die Latte taugt und
die Gates greifen.

## Sessionübergreifend (über Nacht, über Tage)

Session-Crons sterben mit der Session und laufen maximal 7 Tage. Für echte
Dauerläufe über Nacht oder über Tage:

- **systemd-Timer + `claude -p --resume`** — überlebt Session-Tod und Neustart.
  Wird Raphael vorgeschlagen und erst nach Freigabe gebaut (Rot-Klasse:
  neue Berechtigungen/Dienste).
- **`ScheduleWakeup`** nur für ein einzelnes Warten auf ein externes Ereignis,
  nicht als Loop-Motor.

Faustregel: alles unter ~7 Stunden → Session-Cron. Darüber → systemd vorschlagen.

## Idempotenz — die wichtigste Eigenschaft

**Zweimal dieselbe Welle = derselbe Endzustand.** Cron-Fires überlappen,
Sessions sterben mitten drin, ein Workflow bricht zwischen Fix und Commit ab.
Deshalb beginnt jede Welle mit:

1. `git status` lesen — unbestätigte Reste einer abgebrochenen Vorwelle
   einordnen: committen (wenn erkennbar fertig und verifiziert) oder verwerfen
   (wenn halb/unklar). Als `ABGEBROCHEN W<N>` protokollieren.
2. `workbench.md` lesen — welches Stück hat welche offene Lücke?
3. Vor dem Schreiben prüfen, ob der Fix schon drin ist (Grep auf die Zielzeile).

Ohne Schritt 1–3 baut die nächste Welle auf Trümmern auf.

## Cache-Klippe

Der Prompt-Cache lebt nur ~5 Minuten. Ein 20–30-Minuten-Takt trifft **immer**
einen kalten Cache — der stabile Teil (Doktrin, Skill, Mandat) wird jede Welle
neu bezahlt. Folgen:

- **Pro Fire EINE Welle mit Substanz**, nicht viele Mini-Fires.
- Stabilen Kontext nach vorne (Cache-Prefix-Regel).
- **Takt nicht verkürzen „für mehr Durchsatz"** — das kostet nur Tokens.

## Bail-out bei Wiederholungsfehler

Dreimal dieselbe Welle am selben Punkt gescheitert:

1. Erst prüfen, ob der Blocker eine **externe Wand** ist (Quota, Seat, Login,
   fehlendes Tool) → `unstuck`-Skill fahren, nicht abbrechen.
2. Sonst: **Besetzung wechseln.** Die Zweitwahl aus einer anderen Familie
   ansetzen — ein anderer Builder sieht das Problem oft sofort. Das ist der
   Sinn der überlappenden Rollen.
3. Hilft auch das nicht: Loop anhalten, Blocker im `workbench.md` benennen,
   nicht Versuch Nr. 4 mit demselben Paar fahren.

## workbench.md — Format

```markdown
# Gauntlet <name> — Stand

JOB-ID:   <cron-id>   ANGELEGT: <zeit>
ABBRUCH:  <die Bedingung>
BUDGET:   <rahmen>

## Wellen
| # | Run-ID | Stücke bearbeitet | Kipp-Punkte (LATTE→UNSERES) | Dauer |
|---|---|---|---|---|
| 1 | wf_xxx | hero, preise | 1 (hero) | 12 min |
| 2 | wf_yyy | preise, footer | 0 | 9 min |

## Stücke
### hero
- Runde: 4 · Builder: kimi-worker · Kritiker: sol-pruefer
- Verdikt: UNSERES ✅ · Gates: build ✅ shot ✅
- Screenshot: gauntlet/<name>/shots/hero-r4.png
- Offene Lücke: —

### preise
- Runde: 6 · Builder: sonnet-worker (gewechselt von kimi-worker in W2) · Kritiker: luna-worker
- Verdikt: LATTE ❌
- Offene Lücke: "Preistabelle bricht auf 390px um, Referenz stapelt sauber"
- Screenshot: gauntlet/<name>/shots/preise-r6.png

## Ausfälle
- W2: kimi-Quota 429 → mit sonnet-worker weitergefahren, Regel 8 über sol-pruefer gewahrt.
```

## Was der Loop NIE tut

- Rot-Klassen anfassen: nichts live schalten, nichts deployen, keine
  Kundennachricht, kein Geld ausgeben. Ein Publish-Node endet an der
  Review-Inbox.
- `git add -A` — nur konkret bearbeitete Pfade.
- Pushen ohne Anordnung. Vor jedem Push den ahead-Stand prüfen: sitzen fremde
  ungepushte Commits darunter, würde ein Push deren Gate umgehen.
- Fremde Baustellen anderer Sessions anfassen.
- „Fertig" melden, ohne dass ein Gate grün ist (Regel 14).
- Eine leere Welle als Erfolg protokollieren — findet eine Welle nichts
  Belegbares, wird genau das eingetragen.
