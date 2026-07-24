# Test-Inputs — Screenshot-Loop-Eval (web-Skill)

3 realistische Aufträge in Raphaels Ton. Jeder Input wird einer frischen Session gegeben,
die den web-Skill lädt. Erwartung: Der Agent folgt dem Screenshot-Kritik-Loop
(shot-sweep → Panel → Fixliste → Re-Sweep), ohne dass das Cockpit nachhelfen muss.
Gleiche Inputs bei jeder SKILL.md-Mutation — 1 Änderung je Experiment, Score
schlechter/gleich = revert.

---

## Input A — Polish /kursplan auf salsaflow Worktree

> Polish mal die /kursplan-Seite im salsaflow-Worktree. Worktree liegt unter
> /root/clients/salsaflow-dc/.claude/worktrees/site-polish, Dev-Server läuft schon
> auf http://localhost:5280. Vor „fertig" will ich, dass du die Seite richtig durch
> den Screenshot-Loop jagst (shot-sweep gegen :5280) und mir sagst, was das Panel
> gefunden hat und was du gefixt hast.

Kontext: React/Tailwind-Seite, salsaflow-Repo, Worktree-Regeln aus der Dauer-Doktrin
gelten. Mobile-Check ist Pflicht.

## Input B — Neue Landing-Sektion bauen

> Bau mir auf der salsaflow-Landing eine neue Sektion „So läuft die Probestunde" —
> 3 Schritte, kompakt, im bestehenden Design. Route ist /, die Seiten-Komponenten
> liegen unter src/public/ (HomePage.tsx + src/public/home/), neue Datei nach den
> vorhandenen Mustern dort. Dev-Server: http://localhost:5280. Wenn du fertig bist,
> will ich shot-sweep-Beweise sehen, dass es auf Desktop und Mobile sauber sitzt —
> nicht nur dein Wort.

Kontext: Bestehendes Design-System im Repo, keine neuen Farben/Fonts. Sektion muss
sich in den bestehenden Seitenfluss einfügen.

## Input C — Raum-Hero-Bild ersetzen

> Das Hero-Bild auf der Standort-Seite (/kontakt/standort-raumvermietung, Datei
> src/public/contact/standort-content.ts) tauschen: nimm stattdessen
> public/photos/kurse/kurs-03.jpg. Prüf danach per shot-sweep gegen
> http://localhost:5280, ob der Text auf dem Hero noch lesbar ist und der Fold
> nicht kippt — Desktop und Mobile. Erst melden, wenn du es gesehen hast.

Kontext: Bildtausch ist visuell heikel (Textzone, Fold). Der Agent soll das Problem
selbst sehen, nicht raten.

---

## Durchführung

1. Frische Session pro Input, web-Skill laden, Auftrag ausführen lassen.
2. Protokollieren, welche der 6 Checks aus `checks.md` der Skill von sich aus trägt
   und welche das Cockpit einfordern musste.
3. Ergebnis als neue Zeile in `results.tsv` (Tab-getrennt, 10 Spalten).
