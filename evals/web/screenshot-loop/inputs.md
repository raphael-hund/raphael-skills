# Test-Inputs — Screenshot-Loop-Eval (web-Skill)

3 realistische Aufträge in Raphaels Ton. Jeder Input wird einer frischen Session gegeben,
die den web-Skill lädt. Erwartung: Der Agent folgt dem Screenshot-Kritik-Loop
(shot-sweep → Panel → Fixliste → Re-Sweep), ohne dass das Cockpit nachhelfen muss.
Gleiche Inputs bei jeder SKILL.md-Mutation — 1 Änderung je Experiment, Score
schlechter/gleich = revert.

---

## Input A — Polish /kursplan auf salsaflow Worktree

> Polish mal die /kursplan-Seite im salsaflow-Worktree. Worktree liegt unter
> /root/clients/client-salsaflow/.claude/worktrees/, Dev-Server läuft schon auf :5173.
> Vor „fertig" will ich, dass du die Seite richtig durch den Screenshot-Loop jagst
> und mir sagst, was das Panel gefunden hat und was du gefixt hast.

Kontext: React/Tailwind-Seite, salsaflow-Repo, Worktree-Regeln aus der Dauer-Doktrin
gelten. Mobile-Check ist Pflicht.

## Input B — Neue Landing-Sektion bauen

> Bau mir auf der salsaflow-Landing eine neue Sektion „So läuft die Probestunde" —
> 3 Schritte, kompakt, im bestehenden Design. Route ist /, Komponenten liegen in
> src/components/. Wenn du fertig bist, will ich Beweise sehen, dass es auf Desktop
> und Mobile sauber sitzt — nicht nur dein Wort.

Kontext: Bestehendes Design-System im Repo, keine neuen Farben/Fonts. Sektion muss
sich in den bestehenden Seitenfluss einfügen.

## Input C — Raum-Hero-Bild ersetzen

> Das Hero-Bild in der Raum-Sektion (Landing, Sektion „Der Raum") tauschen: neues
> Bild liegt unter src/assets/raum-neu.jpg. Prüf danach, ob der Text auf dem Hero
> noch lesbar ist und der Fold nicht kippt — Desktop und Mobile. Erst melden, wenn
> du es gesehen hast.

Kontext: Bildtausch ist visuell heikel (Textzone, Fold). Der Agent soll das Problem
selbst sehen, nicht raten.

---

## Durchführung

1. Frische Session pro Input, web-Skill laden, Auftrag ausführen lassen.
2. Protokollieren, welche der 6 Checks aus `checks.md` der Skill von sich aus trägt
   und welche das Cockpit einfordern musste.
3. Ergebnis als neue Zeile in `results.tsv` (Tab-getrennt, 10 Spalten).
