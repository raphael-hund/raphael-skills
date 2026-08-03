---
name: unstuck
version: 0.1.0
description: >
  Feuert, wenn die Arbeit an einer Wand steht, die KEIN Bug ist: Login/2FA verlangt,
  API-Limit erreicht, Werkzeug fehlt, Anbieter blockt, Weg scheint versperrt — und
  IMMER als Pflicht-Schnellpfad, bevor eine "geht nicht"/"ist nicht möglich"-Meldung
  an Raphael geht. Klassifiziert die Sackgasse (falsche Annahme / falsches Framing /
  Gatekeeper / Werkzeug), sammelt mindestens 10 Winkel, bevor bewertet wird, und
  erzwingt so die Autonomie-Doktrin "Raphael ist der ALLERLETZTE Ausweg".
  Trigger: "geht nicht", "ich komme nicht weiter", "steckt fest", "keine Möglichkeit",
  "blockiert", "unstuck", "gibt es einen anderen Weg", "bin in einer Sackgasse".
class: M
scope: agency
sensitivity: internal
provenance: >
  Ideen-Merge (kein Vendoring) aus `coreyhaines31/makerskills` Skill `unstuck` —
  übernommen wurde nur das Konzept "Sackgasse klassifizieren + lateral viele Winkel
  vor der Bewertung". Text, Klassen, Schnellpfad und Doktrin-Bindung sind eigen.
  Analyse: raphael-command-center/ops/research/2026-08-03-makerskills-eval/PLAN.md:125.
completion_criteria:
  - "Die Sackgasse ist genau einer der vier Klassen zugeordnet und die Zuordnung ist mit einem Beleg (Fehlertext, Statuscode, Doku-Zeile, Befehlsausgabe) unterlegt"
  - "Mindestens 10 Winkel wurden schriftlich gesammelt, BEVOR einer bewertet wurde (die Liste liegt vor)"
  - "Mindestens die drei bestbewerteten Winkel wurden tatsächlich ausprobiert, jeder mit eingefügtem Ergebnis (Aufruf + Ausgabe), nicht nur gedanklich verworfen"
  - "Falls doch an Raphael eskaliert wird: die Meldung enthält die vier Pflichtteile (Wand, Beleg, Liste der versuchten Winkel mit Ergebnis, genau eine konkrete Bitte) und keine Menü-Frage"
---

# unstuck — aus der Sackgasse, bevor jemand gefragt wird

**Lies zuerst:** `/root/raphael-command-center/AGENTS.md` (Regel 4: zurückspulen statt
korrigieren; Regel 14: „fertig" ist eine Umgebungstatsache) und die Autonomie-Doktrin in
`~/.claude-raphael/CLAUDE.md`: **Raphael ist der ALLERLETZTE Ausweg.**

## Abgrenzung — wann NICHT dieser Skill

| Situation | Zuständig |
|---|---|
| Code tut etwas Falsches, Test rot, Regression, Absturz, Performance-Einbruch | **`debug`** (eigene/debug) — dort: enger pass/fail-Loop, Root Cause, Fix |
| Externe Wand: Login/2FA, Rechte, Quota, Anbieter blockt IP, Tool fehlt, Doku behauptet „unmöglich", Weg scheint versperrt | **`unstuck`** (hier) |
| Ein Plan/eine Entscheidung ist unklar, aber nichts ist blockiert | `grill` |
| Die Wand ist ein Bug **hinter** einer externen Wand | erst `unstuck` (Zugang herstellen), dann `debug` |

Merksatz: **`debug` repariert etwas, das kaputt ist. `unstuck` findet einen Weg um etwas
herum, das nicht kaputt ist, sondern nur zu ist.**

---

## Das eiserne Gesetz

```
KEINE "GEHT NICHT"-MELDUNG OHNE VORHER GELAUFENEN SCHNELLPFAD
```

„Geht nicht", „ist nicht möglich", „dafür bräuchte ich von dir …" sind Auslieferungen an
Raphael. Sie kosten ihn Zeit und sind fast immer verfrüht. Wer sie sagen will, hat vorher
Schritt 1–4 gemacht und kann die Liste zeigen.

---

## Schritt 1 — Wand exakt benennen (kein Gefühl, ein Beleg)

Pflichtform in einem Satz:

> „Ich wollte **[Ziel]**. Beim Versuch **[konkreter Schritt]** kam **[exakter Fehlertext /
> Statuscode / Beobachtung]**. Deshalb geht **[Weg X]** nicht."

Wer keinen exakten Fehlertext hat, hat noch keine Wand, sondern eine Vermutung — dann
erst den Versuch wirklich fahren und die Ausgabe einfügen.

## Schritt 2 — Klasse bestimmen

Genau eine Klasse wählen. Die Klasse bestimmt die Technik in Schritt 3.

| Klasse | Woran man sie erkennt | Typischer Irrtum | Erste Gegenfrage |
|---|---|---|---|
| **A — Falsche Annahme** | Etwas wird für wahr gehalten, was nie geprüft wurde („die API kann das nicht", „das Feld gibt es nicht", „die Datei liegt dort") | Erinnerung statt Nachschlagen | Woher weiß ich das? Wann habe ich es zuletzt **gemessen**? |
| **B — Falsches Framing** | Die Wand steht nur vor der gewählten **Lösung**, nicht vor dem **Ziel** | Das Mittel wurde zum Ziel | Was will Raphael eigentlich erreichen — und geht das anders? |
| **C — Gatekeeper** | Ein Dritter lässt nicht durch: Login/2FA, Captcha, Rechte, Quota, IP-Block, Bezahlschranke, Freigabepflicht | Sofort eskalieren | Gibt es einen zweiten Eingang zu denselben Daten? |
| **D — Werkzeug** | Das benutzte Tool kann es nicht, ist nicht installiert, ist die falsche Ebene | Am kaputten Tool weiterbasteln | Welches andere Tool auf diesem VPS kann dasselbe? |

Mischfälle gibt es nicht — es gibt eine **dominante** Klasse. Bei Unsicherheit: die
Klasse wählen, deren Auflösung den größten Teil des Problems verschwinden ließe.

## Schritt 3 — Mindestens 10 Winkel sammeln, BEVOR bewertet wird

**Die Regel ist die halbe Wirkung des Skills.** Wer sofort bewertet, bricht nach Winkel 3
ab und landet bei „geht nicht". Also: erst schreiben, dann urteilen. Blöde Winkel
ausdrücklich mitschreiben — sie erzeugen die guten.

Verboten während des Sammelns: „das geht sicher nicht", „zu aufwändig", „unrealistisch".

**Lateral-Techniken (aus jeder mindestens einen Winkel ziehen):**

1. **Umkehren** — statt hin zur Quelle: Wer hat die Daten schon? Gibt es einen Export,
   einen Cache, ein Webhook, das sie zu mir bringt?
2. **Ebene wechseln** — UI blockt → API; API blockt → CLI; CLI blockt → Datei/DB;
   alles blockt → Browser-Automatisierung mit bestehender Session.
3. **Zeit verschieben** — Rate-Limit/Quota: später, langsamer, in Batches, anderer Seat,
   anderes Fenster. (Bei Modell-Quota nie stoppen — das Gateway rotiert selbst.)
4. **Identität wechseln** — anderer Seat, anderes Profil, anderer Token, anderer User,
   anderer Ausgangs-Host. Nur innerhalb erlaubter Zugänge, nie Umgehung einer
   Sicherheitsgrenze.
5. **Zerlegen** — geht das Ganze nicht, welche 80 % gehen? Teil-Ergebnis ist besser als
   nichts und deckt oft den echten Bedarf.
6. **Ersetzen** — braucht es exakt diese Quelle, oder tut eine Näherung es auch
   (andere API, öffentliche Daten, Archiv/Wayback, Stichprobe statt Vollzug)?
7. **Vorgänger lesen** — hat jemand das hier schon gelöst? `grep` über
   `/root/raphael-command-center/ops/`, `ops/incidents/`, `/root/raphael-brain/wiki/`
   und die Skills. Erschreckend oft ja.
8. **Doku statt Gedächtnis** — offizielle Doku, Changelog, Source Code, Issue-Tracker.
   Erinnerungen an APIs sind unzuverlässig; Doku ist billig (`research`-Skill).
9. **Frage aufweichen** — muss es *heute*, *vollautomatisch*, *exakt so* sein? Welche
   Randbedingung ist Wunsch und welche ist Pflicht?
10. **Werkzeug bauen statt suchen** — 20 Zeilen Skript ersetzen oft das fehlende Tool.
11. **Gegenprobe** — funktioniert es woanders (anderes Repo, anderer Host, minimaler
    Fall)? Der Unterschied ist die Ursache.
12. **Andere Modellfamilie fragen** — ein Sonnet-/Kimi-/GPT-Subagent kennt manchmal den
    Weg, den diese Session nicht sieht (`orchestrate`).

Ziel: **≥ 10 Zeilen** in einer Liste. Erst dann weiter.

## Schritt 4 — Bewerten und die besten drei WIRKLICH fahren

Je Winkel zwei Zahlen im Kopf: *Aufwand* (Minuten) und *Erfolgschance*. Sortieren nach
Chance ÷ Aufwand. Dann:

- Die **drei** besten tatsächlich ausführen — nicht gedanklich verwerfen. Ein Winkel
  gilt erst als erledigt, wenn Aufruf und Ausgabe vorliegen.
- Nach jedem Fehlschlag: Klasse neu prüfen. Fehlschläge verschieben oft A → B.
- Erfolg → zurück in die eigentliche Aufgabe, Winkel-Liste kurz im Ergebnis erwähnen.

## Schritt 5 — Pflicht-Schnellpfad vor jeder „geht nicht"-Meldung

Bevor irgendetwas an Raphael geht, alle sechs Haken setzen:

- [ ] Exakter Fehlertext liegt vor (nicht paraphrasiert)
- [ ] Klasse A–D bestimmt
- [ ] ≥ 10 Winkel gesammelt, schriftlich
- [ ] ≥ 3 Winkel ausgeführt, jeder mit Ergebnis
- [ ] Offizielle Doku der blockierenden Sache gelesen (nicht aus dem Gedächtnis)
- [ ] `grep` über `ops/`, `ops/incidents/`, Brain-Wiki und Skills nach dem Stichwort

Ist auch nur ein Haken offen: **nicht melden, sondern den Haken setzen.**

## Schritt 6 — Wenn wirklich eskaliert wird

Eskalation ist erlaubt (und richtig) bei: Login/2FA/Captcha, fehlendem Secret, Geld
ausgeben, Kundenkontakt, Unumkehrbarem, Rot-Klasse ohne Signatur. Dann gilt: **alles
andere vorher fertig machen**, damit nach Raphaels einer Handlung sofort weiterläuft.

Format — vier Teile, kein Menü, keine Multiple-Choice-Frage:

1. **Wand** — ein Satz, was zu ist.
2. **Beleg** — der exakte Fehlertext/Statuscode, eine Zeile.
3. **Versucht** — die ausgeführten Winkel als Bullets, je Zeile Ergebnis.
4. **Bitte** — genau EINE konkrete Handlung („Log dich einmal bei X ein und sag Bescheid").

Alles Übrige ist bis zu diesem Punkt erledigt und wartet nur noch auf diese eine Handlung.

---

## Gotchas

- **„Ich habe doch schon viel probiert."** Ohne geschriebene Liste zählt es nicht — das
  Gefühl von Aufwand ist kein Beleg (Regel 14).
- **Bewerten während des Sammelns** killt die Technik. Erst 10 Zeilen, dann urteilen.
- **Klasse C wird zu früh gerufen.** Login-Wand heißt nicht Eskalation: erst Umkehren,
  Ebene wechseln, Identität wechseln, Archiv prüfen.
- **Doku-Behauptung „nicht möglich"** ist eine Aussage über die dokumentierte Nutzung,
  nicht über die Welt. Changelog und Issue-Tracker prüfen.
- **Quota-Fehler sind nie ein Stopp.** Weiterrotieren, das Gateway macht das selbst.
- **Nicht in `debug` abrutschen.** Wird die Wand plötzlich ein Testfehler: Skill wechseln,
  nicht hier weiterwursteln.
- **Sicherheitsgrenzen sind keine Sackgassen.** Rot-Klassen, Signaturpflicht und die
  Verbote aus Regel 11 werden nicht „lateral umgangen" — dort ist Eskalation der richtige
  Weg, nicht ein 13. Winkel.
- **Regel-19-konform berichten:** pass/fail mit eingefügtem Beleg, nie eine
  Gedankengang-Erklärung verlangen oder liefern.
