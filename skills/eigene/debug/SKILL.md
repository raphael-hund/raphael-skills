---
name: debug
version: 0.2.2
description: >
  Feuert bei jedem harten Bug, Testfehler oder unerwartetem Verhalten — BEVOR ein Fix
  vorgeschlagen wird. Disziplin: erst einen engen pass/fail-Loop bauen, dann Root Cause,
  dann Fix. Nach 3 Fehlversuchen wird die Architektur hinterfragt, nicht Fix Nr. 4
  probiert. Trigger: "debug", "diagnose", "warum schlägt der Test fehl", "kaputt",
  "geht nicht" (nur wenn Code/Test falsch läuft — bei externer Wand: unstuck),
  "Regression", "langsam geworden".
class: M
scope: agency
sensitivity: internal
provenance: >
  Fusion aus mattpocock/skills `engineering/diagnosing-bugs` (Commit 9603c1cc) und
  superpowers `systematic-debugging` (Commit d884ae04) — beide Quellen unter
  /root/tools/vendor, Protokoll in VENDORING.md. Auf Deutsch kondensiert, auf unser
  Frontmatter-Schema gebracht, keine Fremdskripte übernommen (reine Methode).
completion_criteria:
  - "Ein enger pass/fail-Loop existiert und wurde mindestens einmal rot gesehen (Aufruf + Ausgabe eingefügt)"
  - "Die Root Cause ist benannt und mit einem Beleg belegt (nicht: eine Vermutung)"
  - "Der Fix adressiert die Root Cause, der Loop ist danach grün (Ausgabe eingefügt)"
  - "Ein Regressionstest fixiert den Bug (oder das Fehlen einer korrekten Test-Naht ist dokumentiert)"
  - "Alle Debug-Instrumentierung ist entfernt (grep auf den Tag zeigt nichts mehr)"
---

# debug — Debug-Disziplin: Loop vor Hypothese, Root Cause vor Fix

**Lies zuerst:** `/root/raphael-command-center/AGENTS.md` Regel 4 (zurückspulen statt
korrigieren), 14 (fertig = Umgebungstatsache), Karpathy-Prinzip 4 (Goal-Driven Execution).

## Abgrenzung zu `unstuck`

`debug` greift, wenn **etwas kaputt ist**: Bug, roter Test, Regression, Absturz,
unerwartetes Verhalten im eigenen oder fremden Code. Es gibt einen Zustand, den man
reproduzieren und dessen Ursache man finden kann.

`unstuck` ([methodik/unstuck/SKILL.md](/root/raphael-skills/skills/methodik/unstuck/SKILL.md)) greift bei **externen Wänden**, die kein Fehlverhalten
sind: Login/2FA, fehlende Rechte, Quota/Rate-Limit, IP-Block, fehlendes Werkzeug, „die
API kann das angeblich nicht". Dort gibt es keine Root Cause zu finden, sondern einen
Weg herum — und den Pflicht-Schnellpfad, bevor „geht nicht" an Raphael gemeldet wird.
Sitzt ein Bug hinter einer solchen Wand: erst `unstuck` (Zugang), dann `debug` (Ursache).

## Das Eiserne Gesetz

```
KEIN FIX OHNE VORHERIGE ROOT-CAUSE-UNTERSUCHUNG
```

Wer Phase 1 nicht abgeschlossen hat, schlägt keine Fixes vor. Symptom-Flickschusterei
ist ein Fehlschlag, kein Fortschritt. Gerade unter Zeitdruck gilt das doppelt —
Raten ist langsamer als Systematik.

## Phase 1 — Engen pass/fail-Loop bauen (DAS ist der Skill)

Alles andere ist Mechanik. Wer ein **enges** pass/fail-Signal hat — eines, das bei
**diesem** Bug rot wird — findet die Ursache; Bisect, Hypothesen und Instrumentierung
verbrauchen es nur. Wer keins hat, den rettet kein Code-Anstarren. Hier gehört der
unverhältnismäßige Aufwand hin.

**Wege, einen Loop zu bauen (grober Reihenfolge nach):**

1. **Fehlschlagender Test** an der Naht, die den Bug erreicht (unit/integration/e2e).
2. **curl-/HTTP-Skript** gegen einen laufenden Dev-Server.
3. **CLI-Aufruf** mit Fixture-Input, stdout gegen bekannt-guten Snapshot diffen.
4. **Headless-Browser-Skript** (Playwright/Puppeteer) mit Asserts auf DOM/Konsole/Netz.
5. **Trace-Replay:** echten Request/Payload/Event-Log auf Platte sichern, isoliert
   durch den Codepfad jagen.
6. **Wegwerf-Harness:** minimale Teilmenge des Systems (ein Service, gemockte Deps),
   die den Bug-Pfad mit einem Funktionsaufruf ausübt.
7. **Property-/Fuzz-Loop:** bei „manchmal falschem Output" 1000 Zufalls-Inputs laufen
   lassen und den Fehlermodus suchen.
8. **Bisect-Harness:** Bug trat zwischen zwei Ständen auf → „boote bei Stand X, prüfe,
   wiederhole" automatisieren, `git bisect run`-fähig.
9. **Differential-Loop:** gleichen Input durch Alt- vs. Neu-Version (oder zwei Configs)
   laufen lassen, Outputs diffen.

**Den Loop anziehen** — einmal gebaut, als Produkt behandeln: schneller machen
(Setup cachen, Scope verengen), Signal schärfen (auf das exakte Symptom asserten, nicht
„stürzt nicht ab"), deterministischer machen (Zeit pinnen, RNG seeden, Netz einfrieren).
Ein 30-Sekunden-Flaky-Loop ist kaum besser als keiner; ein 2-Sekunden-deterministischer
ist eine Debug-Superkraft.

**Nicht-deterministische Bugs:** Ziel ist kein sauberes Repro, sondern eine **höhere
Reproduktionsrate** — Trigger 100× loopen, parallelisieren, Stress, Timing-Fenster
verengen. Ein 50-%-Flake ist debuggbar, 1 % nicht — Rate hochtreiben, bis es geht.

**Erledigt-Kriterium Phase 1:** Du kannst **einen Befehl** nennen (Skript-Pfad,
Test-Aufruf, curl), den du **mindestens einmal ausgeführt** hast (Aufruf + Ausgabe
einfügen) und der ist:

- **rot-fähig** — treibt den echten Bug-Pfad und assertet das **exakte Nutzer-Symptom**
  (nicht „läuft ohne Fehler" — er muss **diesen** Bug fangen können),
- **deterministisch** — gleiches Urteil bei jedem Lauf (Flakes: gepinnte hohe Rate),
- **schnell** — Sekunden, nicht Minuten,
- **agenten-laufbar** — unbeaufsichtigt ausführbar.

Wer vor diesem Befehl Code liest, um eine Theorie zu bauen: **Stopp — genau das ist der
Fehlschlag, den dieser Skill verhindert.** Kein rot-fähiger Befehl, keine Phase 2.

**Geht wirklich kein Loop:** explizit sagen, auflisten was versucht wurde, beim
Menschen anfragen: (a) Zugang zur reproduzierenden Umgebung, (b) eingefangenes Artefakt
(HAR, Log-Dump, Core Dump, Screen-Recording mit Timestamps), (c) Erlaubnis für
temporäre Produktions-Instrumentierung. Nicht ohne Loop hypothesieren.

## Phase 2 — Reproduzieren + Minimieren

Loop laufen lassen, rot sehen. Bestätigen:

- Der Loop erzeugt den Fehlermodus, den der **Nutzer** beschrieben hat — nicht einen
  anderen Bug in der Nähe. Falscher Bug = falscher Fix.
- Das exakte Symptom ist festgehalten (Fehlermeldung, falsches Output, Timing).

Dann das Repro auf das **kleinste Szenario, das noch rot wird**, schrumpfen: Inputs,
Caller, Config, Daten, Schritte **einzeln** entfernen, nach jedem Schnitt den Loop
erneut laufen lassen. Fertig, wenn jedes verbleibende Element tragend ist (entfernen
→ grün). Das Minimal-Repro wird in Phase 5 der Regressionstest.

## Phase 3 — Hypothesen (3–5, falsifizierbar, gerankt)

Vor dem Testen **3–5 gerankte Hypothesen** erzeugen — eine Einzelhypothese ankert auf
der ersten plausiblen Idee. Jede Hypothese muss eine Vorhersage machen:

> „Wenn <X> die Ursache ist, dann lässt <Änderung Y> den Bug verschwinden /
> macht <Änderung Z> ihn schlimmer."

Keine Vorhersage = Vibe = verwerfen oder schärfen. Die gerankte Liste dem Menschen
zeigen, bevor getestet wird (Domänenwissen rankt oft sofort um — „an #3 wurde gestern
gedeployt"). Nicht blockieren: bei Abwesenheit mit dem eigenen Ranking weiter.

**Muster-Analyse als Hypothesen-Input:** funktionierende Vergleichsbeispiele im selben
Codebase suchen, Unterschiede auflisten (auch die „kann nichts ausmachen"-Kleinen),
bei Mehr-Komponenten-Systemen Evidenz an jeder Komponenten-Grenze sammeln (was geht
rein, was kommt raus) — erst dann ist klar, **welche** Schicht bricht. Fehler tief im
Call-Stack: Datenfluss rückwärts tracen bis zur Quelle des schlechten Werts; an der
Quelle fixen, nicht am Symptom.

## Phase 4 — Instrumentieren

Jede Sonde bildet auf eine konkrete Vorhersage aus Phase 3 ab. **Eine Variable pro
Experiment.** Werkzeug-Präferenz: 1. Debugger/REPL (ein Breakpoint schlägt zehn Logs),
2. gezielte Logs an den Grenzen, die Hypothesen unterscheiden. Nie „alles loggen und
greppen". **Jeden Debug-Log mit Unique-Prefix taggen** (z. B. `[DEBUG-a4f2]`) —
Cleanup wird ein einziges grep.

**Perf-Zweig:** bei Performance-Regressionen sind Logs meist falsch. Erst Baseline
messen (Timing-Harness, Profiler, Query-Plan), dann bisecten. Messen vor Fixen.

## Phase 5 — Fix + Regressionstest

Regressionstest **vor dem Fix** schreiben — aber nur, wenn es eine **korrekte Naht**
gibt (der Test übt das echte Bug-Muster so aus, wie es am Call-Site auftritt). Gibt es
keine korrekte Naht, **ist das selbst der Befund**: die Architektur verhindert, dass
der Bug eingemauert wird — dokumentieren, für Phase 6 merken.

Bei korrekter Naht: 1. Minimal-Repro als fehlschlagenden Test gießen, 2. fehlschlagen
sehen, 3. Fix anwenden (**eine** Änderung, kein „while I'm here"), 4. grün sehen,
5. den Phase-1-Loop gegen das originale, un-minimierte Szenario erneut laufen lassen.

**Schlägt der Fix fehl: STOPP und zählen.**

- < 3 Fehlversuche: zurück zu Phase 1, mit neuer Information neu analysieren. Kein
  weiterer Fix auf den alten gestapelt.
- **≥ 3 Fehlversuche: Architektur hinterfragen, nicht Fix Nr. 4 probieren.**
  Warnsignale: jeder Fix deckt neuen Shared State/Kopplung an anderer Stelle auf,
  Fixes erfordern „massives Refactoring", jeder Fix erzeugt neue Symptome. Dann mit
  dem Menschen diskutieren: Ist das Muster grundsätzlich tragfähig? Das ist keine
  gescheiterte Hypothese, sondern eine falsche Architektur.

## Phase 6 — Cleanup + Post-Mortem

Pflicht vor „fertig":

- [ ] Original-Repro reproduziert nicht mehr (Phase-1-Loop erneut gelaufen)
- [ ] Regressionstest grün (oder fehlende Naht dokumentiert)
- [ ] Alle `[DEBUG-…]`-Instrumentierung entfernt (grep auf den Prefix zeigt nichts)
- [ ] Wegwerf-Prototypen gelöscht (oder klar markiert abgelegt)
- [ ] Die zutreffende Hypothese steht in Commit-/PR-Message — der nächste Debugger lernt

Dann fragen: **Was hätte diesen Bug verhindert?** Empfehlung erst **nach** dem Fix
geben — jetzt weiß man mehr als am Anfang.

## Red Flags — STOPP, zurück zu Phase 1

- „Schnell fixen, später untersuchen" · „Probier mal X, schauen was passiert"
- „Mehrere Änderungen auf einmal, dann Tests" · „Ist vermutlich X, fix ich mal"
- Lösungen vorschlagen, bevor der Datenfluss getraced ist
- „Noch ein Fix-Versuch" nach bereits 2+ Fehlschlägen
- Jeder Fix offenbart ein neues Problem an anderer Stelle

## Gotchas

- **„Einfacher Bug, braucht keinen Prozess"** — einfache Bugs haben auch Root Causes;
  der Prozess ist bei einfachen Bugs schnell, nicht überflüssig.
- **„Notfall, keine Zeit"** — Systematik ist schneller als guess-and-check-Thrashing
  (Erfahrungswerte upstream: 15–30 min systematisch vs. 2–3 h raten).
- **Untestete Fixes bleiben nicht** — Test zuerst beweist den Fix, nicht umgekehrt.
- **Mehrere Fixes gleichzeitig** — danach ist unisolierbar, was wirkte; erzeugt neue Bugs.
- **95 % der „keine Root Cause"-Fälle sind unvollständige Untersuchung.** Ist die
  Ursache wirklich environmental/extern: dokumentieren, was untersucht wurde, dann
  angemessenes Handling (Retry, Timeout, Fehlermeldung) + Monitoring bauen.
- **Fail-closed bei Unsicherheit über den Zustand.** Ist unklar, ob ein Zustand
  (Remote-Head, laufender Prozess, Datenintegrität) sicher ist, lieber verweigern
  und melden als raten und "clever" reparieren — eine falsche Recovery-Annahme
  unter Unsicherheit verursacht mehr Schaden als ein Stopp mit Erklärung.
- **Regel-19-konform berichten:** Befund als pass/fail mit eingefügtem Beleg (Aufruf,
  Ausgabe, Diff) — nie eine Gedankengang-Erklärung verlangen oder liefern
  (Fable-Gotcha: solche Phrasen lösen stille Fallbacks aus).
