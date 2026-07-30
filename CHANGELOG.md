# CHANGELOG — raphael-skills

**TLDR:** Hier steht grob, was sich an den Skill-Vertraegen und am
Pruef-Werkzeug geaendert hat. Neueste Aenderung oben. Format lehnt sich an
"Keep a Changelog" an, bleibt aber bewusst kurz und deutsch.

Versionierung einzelner Skills laeuft ueber `version:` in der jeweiligen
SKILL.md (semver) und einen Git-Tag `r-<name>@<semver>` beim main-Merge. Dieses
CHANGELOG beschreibt das Repo drumherum (Vertrag, Validator, Marker).

---

## 2026-07-30 — Zweite Haelfte: wer prueft die Pruefer?

**TLDR:** 43 weitere Commits. Der erste Teil (unten) gab jeder Regel einen
Testfall. Dieser Teil stellt die Frage eine Ebene hoeher — und sie war noetig:
sechs Mal in zwei Tagen sah *nichts geprueft* aus wie *sauber geprueft*.

**Zwei neue Wachen, in allen drei Skills**
- **Sabotage** (`run-sabotage.mjs`): beschaedigt jeden Pruefer gezielt an EINER
  Zeile und prueft, ob seine Eval reisst. Nicht "Datei kaputt" — das faengt jeder
  Parser — sondern *still das falsche Urteil faellen*. Gefunden: `craft-check`
  las den Schweregrad nicht (Blocker konnte zur Warnung werden, Eval blieb bei
  22/22), `axe-run` und `shot-sweep` konnten ihren Exit-Code verlieren, ohne dass
  etwas fehlte, und das G1-Tor haette auch mit **null** gelaufenen
  Qualitaets-Pruefern geurteilt.
- **Umfang** (`run-eval-umfang.mjs`, gemeinsamer Kern): haelt fest, wie viele
  Faelle jede Eval mindestens melden muss. Anlass: die Fall-Liste einer Eval
  geleert, und sie meldete "6/6 wie erwartet", Exit 0 — die Zahlen kamen aus dem
  Verdrahtungs-Abschnitt, die Regel-Faelle waren still weg.

**Sicherheit und Naht**
- `mirror-site.mjs` liess die **fremde** Seite bestimmen, wohin geschrieben wird:
  `/x/../../../root/.ssh/authorized_keys` landete dort. Quarantaene-Regel,
  AGENTS.md Nr. 17.
- `bilder.mjs reject` (die einzige unwiderruflich loeschende Stelle) loeschte
  Dateien ausserhalb des Asset-Ordners.
- Vier Mal dieselbe Naht: ein Werkzeug arbeitet korrekt, und seine Aussage kommt
  nicht an. `visual-diff` rechnete eine Note aus, die niemand abfragte;
  `audit-clone` fand einen Google-Tracker und schrieb ihn nur als Markdown;
  `axe-run` und `shot-sweep` beim Exit-Code.

**Vollstaendige Abdeckung, ehrlich ausgewiesen**
- `detect.mjs` Datei-Modus 13/13, Browser-Pfad 37/37, `craft-check` 23/23,
  `validate-workflow.py` 7/7. Wo etwas nicht erreichbar ist, steht der Grund
  daneben statt einer Prozentzahl.
- Der Browser-Pfad war nie geprueft **und nicht lauffaehig**: er verlangt
  puppeteer, installiert ist playwright. Der injizierte Detektor selbst ist
  browserneutral, die Eval laedt ihn direkt — der Sackgassen-Weg ist dokumentiert.

**Was ich dabei ueber mich gelernt habe** (steht so in den Commits, weil es die
naechste Runde spart)
- Rund ein Dutzend Mal war mein Testfall zu schwach, nie der Pruefer. Meist weil
  eine Schwelle nur im Code stand (`single-font` braucht 20 Textelemente,
  `oversized-h1` drei Bedingungen gleichzeitig).
- Viermal habe ich geprueft, wie etwas **geschrieben** ist, statt was dabei
  **herauskommt** — und Fehlalarme gebaut. Einmal 118 auf einen Schlag.
- Dreimal hiess "die Eval merkt es nicht" in Wahrheit "ich habe die falsche
  gefragt".
- Mein eigener Sabotage-Test mass eine Stunde lang nichts: `-k "not Sabotage"`
  filtert bei unittest alle Tests weg, und "Ran 0 tests" gilt als Erfolg. Genau
  das Muster, gegen das er gebaut war.
- Eine Umfang-Wache mit Grenze 16 bei 17 Tests stellte ihren eigenen Puffer —
  ein geloeschter Test waere durch ihre Existenz ausgeglichen worden.

---

## 2026-07-29/30 — Webdesigner-Pro: jeder Pruefer hat jetzt einen Testfall

**TLDR:** 79 Commits am `web`- und `design`-Skill. Kein neues Feature, sondern
die Antwort auf eine Frage, die niemand gestellt hatte: *woher wissen wir, dass
die Pruefer funktionieren?* Ergebnis: 27 Pruefläufe, alle gruen, und jede Regel
in jedem Detektor durch mindestens einen Testfall belegt.

**Neu integriert (nicht addiert, sondern verbunden)**
- Deutscher AI-Slop-Regelsatz (`design/scripts/rules.de.mjs`): der vendorte
  Scanner ist englisch und lief auf deutschen Seiten mit **0 Treffern, Exit 0**.
  Muster sind die maschinell pruefbare Haelfte von Raphaels bereits
  freigegebener `floskel-verbote.md` — beide Dateien verweisen jetzt
  aufeinander.
- Drei neue Tor-Pruefer: `motion-check` (spricht das Projekt EINE
  Bewegungssprache? — drei Ease-Kurven im Bestand statt der zwei
  dokumentierten), `tastatur-check` (7 von 10 Widgets trugen ARIA-Rollen ohne
  Tastaturbedienung, alle gruen bei axe), `klon-gate` (der Klon-Weg hatte zwoelf
  Werkzeuge und kein Annahmekriterium).
- `naht-check`: prueft die Verbindungen statt der Werkzeuge. Jeder Fehler dieser
  Runde sass in der Naht — `visual-diff` rechnete eine Note aus, die niemand
  abfragte; `audit-clone` fand einen Google-Tracker und schrieb ihn nur als
  Markdown; `slopNamen()` war toter Code, den eine Eval trotzdem prueft.

**Sicherheit**
- `bilder.mjs reject` (die einzige unwiderruflich loeschende Stelle im Skill)
  loeschte Dateien **ausserhalb** des Asset-Ordners: `"datei": "../opfer.txt"`
  im Index genuegte. Exit 0, brave Erfolgsmeldung, Datei weg.
- `web-clone/mirror-site.mjs` liess die **fremde** Seite bestimmen, wohin
  geschrieben wird: `/x/../../../root/.ssh/authorized_keys` landete dort.
  Genau der Fall aus der Quarantaene-Regel (AGENTS.md Nr. 17).

**Abdeckung, ehrlich ausgewiesen**
- `craft-check` 23/23 Regeln, `detect.mjs` Datei-Modus 13/13, Browser-Pfad
  37/37, `validate-workflow.py` 7/7 Pruefer. Vorher: 10 von 28 bzw. 4 von 46
  bzw. 3 von 7 — und niemand konnte die Zahl nennen.
- Der Tresor meldete `@base-ui/react` als UNPRUEFBAR, also genau die Library,
  die die Komponenten-Doku fuer neun Widgets empfiehlt. Jetzt 53 Namen,
  0 UNPRUEFBAR im ganzen Tresor.

**Die Lehre, die jede Eval jetzt erzwingt**
Ein Waechter braucht **beide** Richtungen. Reissen allein ist auch durch "melde
immer" erfuellbar, und ein Pruefer, der korrekte Arbeit rot faerbt, wird nach dem
dritten Fehlalarm abgeschaltet — dann schuetzt er auch im echten Fall nicht mehr.
Gefunden habe ich das an eigenen Fehlalarmen: Escape von einem eingebetteten
Rad-Picker verlangt, `useReducedMotion()` in JS nicht als Reduced Motion
erkannt, `..-2f..` fuer einen Pfad-Ausbruch gehalten.

Und: wer prueft, wie etwas **geschrieben** ist statt was dabei **herauskommt**,
baut Fehlalarme. Rund ein Dutzend Mal war mein Testfall zu schwach, nie der
Pruefer — meist weil eine Schwelle nur im Code stand (`single-font` braucht 20
Textelemente, `oversized-h1` drei Bedingungen gleichzeitig, `monotonous-spacing`
liest Markup statt DOM). Die Tabelle "welche Regel liest was" steht deshalb im
`design`-SKILL.

---

## 2026-07-20 — Karpathy-Deep-Dive: Council- und Autoresearch-Muster eingearbeitet

**Geaendert**
- `skills/eigene/orchestrate/` 0.2.0 → 0.3.0: neues Council-Muster (3
  Modellfamilien antworten unabhaengig, anonymes Peer-Ranking mit
  randomisierter Zuordnung, Chairman-Synthese) als Abschnitt in SKILL.md +
  neue `references/council.md`. Idee nach Karpathys llm-council @ 92e1fcc
  (Lese-Referenz, keine Lizenz — kein Code/Text uebernommen) und der
  Advisor-Variante claude-skills-llm-council @ 55ee36e.
- `skills/eigene/eval/` 0.2.0 → 0.3.0: G3 um den Autoresearch-Mutations-Loop
  ergaenzt (Baseline zuerst, genau eine Mutation je Experiment, gleich =
  revertieren, Changelog-Pflicht, Plateau-Stopp) mit Verweis auf den
  vendorierten `autoresearch`-Skill; Abgrenzung Panel (judgt ein Artefakt)
  vs. Council (waehlt zwischen Antworten) ergaenzt.
- Karpathy-Coding-Prinzipien NICHT erneut eingearbeitet — seit Runde 1
  Doktrin in `raphael-command-center/AGENTS.md`; llm-wikid nicht
  uebernommen — Muster lebt bereits als raphael-brain.
- Lektionen-Seite: `raphael-brain/wiki/_candidates/karpathy-methodik.md`.

**Geprueft**
- `python3 tools/validate-skill.py skills/eigene/orchestrate/SKILL.md
  skills/eigene/eval/SKILL.md`: beide gruen (nur bekannte Warnungen zu
  optionalen Feldern).

---

## 2026-07-20 — Vendoring-Runde 2 (Housekeeping)

Große parallele Vendoring-Runde: Build-Agenten haben 18 zusaetzliche Fremdquellen
(humanizer, kill-ai-slop, anti-ai-slop-writing, distribb-skill,
qwoted-seo-backlinks-skill, no-mistakes, coreyhaines-marketingskills,
shadcn-improve, emilkowalski-skills, vercel-labs-skills, starc007-ui-components,
claude-skill-web-clone, openui, ui-layouts-mcp, oh-my-openagent,
davidondrej-skills, jakubkrehel-skills, conradcaffier-gist) in bestehende Skills
eingearbeitet (keine neuen Skill-Ordner). Je Skill-Ordner lag eine
`VENDORING-NOTE.md`; diese wurden in `VENDORING.md` (neuer Abschnitt
"Vendoring-Runde 2026-07-20") konsolidiert und danach geloescht.

**Geaendert**
- `skills/design/` (2. Fusionsrunde: kill-ai-slop-Scanner, emilkowalski-Motion-
  Doktrin, jakubkrehel Farben/Typo/UI-Polish, claude-skill-web-clone Design-DNA).
- `skills/eigene/web/`, `ads/`, `copywriting/`, `offers/`, `onboard/`,
  `seo/`, `watch/`, `debug/`, `eval/`, `orchestrate/` sowie
  `skills/methodik/brainstorm/`, `plan/`, `writing-skills/`, `sdd/`,
  `code-review/`, `tickets/`, `research/`, `skills/eigene/handoff/` je um
  Referenzen/Gotchas aus den oben genannten Quellen ergaenzt (Details:
  `VENDORING.md`).

**Geprueft**
- `python3 tools/validate-skill.py`: 29/29 SKILL.md gruen (nur unveraenderte
  Warnungen zu optionalen Feldern, keine Fehler).
- `python3 tools/build-index.py`: 29 Skills (unveraendert ggue. vor der Runde —
  keine neuen Skill-Ordner angelegt).
- Alle 29 Skills bereits unter `/root/.claude/skills/` verlinkt, keine neuen
  Symlinks noetig.

---

## 2026-07-19 — Neue Skills watch + debug

**Neu**
- `skills/eigene/watch/`: lokale Video-Analyse (yt-dlp + ffmpeg, Hook-Kontaktboegen
  15 s @ 15 fps, Body 1 Frame/3,5 s, YouTube-Auto-Subs statt Whisper) inkl. Helper
  `scripts/watch-extract.sh` (eigener Code). Quelle: quellenreview-2026-07-19 Teil D.
- `skills/eigene/debug/`: kombinierte Debug-Disziplin aus mattpocock
  `diagnosing-bugs` + superpowers `systematic-debugging` (enger pass/fail-Loop vor
  Hypothesen, Root Cause vor Fix, nach 3 Fehlversuchen Architektur hinterfragen).

---

## 2026-07-19 — Skill-Vertraege gehaertet

Grundlage: v5-Plan Abschnitt 9.1 (Skill-Vertrag) und 9.2 (Progressive
Disclosure). Keine bestehende SKILL.md wurde angefasst.

**Neu**
- `.skill-namespace` (Inhalt `r-`): technischer Marker fuer den Pflicht-Praefix
  aller eigenen Skills.
- `SKILL-VERTRAG.md`: erklaert die sieben Pflichtfelder
  (`name`, `version`, `description`, `class`, `scope`, `sensitivity`,
  `completion_criteria`), die sieben Skill-Klassen (R/M/F/O/E/W/G) und die
  Zeilenlimits der Progressive Disclosure. Auf Fuenfjaehrigen-Niveau erklaert.

**Geaendert**
- `tools/validate-skill.py` additiv erweitert:
  - `class`, `scope`, `sensitivity` sind jetzt Pflichtfelder (fehlt/leer = rot).
    Alle 27 vorhandenen Skills fuehren diese Felder bereits, keiner wird rot.
  - Werte werden weich geprueft: unbekannte `class`/`scope`/`sensitivity`-Werte
    geben nur eine Warnung, brechen den Lauf nicht ab (alte Skills bleiben gruen).
  - Fehlende empfohlene Felder (`provenance`, `eval_scorecard`, `expires`,
    `loads`, `requires_skills`) geben nur eine Warnung, nie rot.

**Status:** Vertrag + Validator sind ein Runbook-/Lint-Stand, kein Nachweis
bestandener Evals oder erteilter Freigaben. Skill-Mutationen bleiben eine der
7 Rot-Klassen und laufen ueber `ops/review-inbox.md` mit Raphaels Signatur.

## 2026-07-20 — Umbenennung: r-Praefix entfernt (Raphael-Anweisung)
Alle 28 r-*-Skills heissen jetzt einfach nach ihrer Disziplin (seo, design, copywriting, ...).
Ordner per git mv umbenannt, Querverweise in raphael-skills, raphael-command-center und
raphael-brain/wiki aktualisiert, .skill-namespace geleert, SKILL-VERTRAG angepasst,
Symlinks in ~/.claude/skills neu gesetzt. Rote Linie "kein Fremdcode-Skript kopieren"
aus writing-skills entfernt (Raphael-Entscheid, scan-ai-slop.mjs bleibt).

## 2026-07-20 — Vendoring-Runde 3 (Top-Kandidaten)
claude-seo (E-E-A-T, Local/GBP, SERP-Features, Cluster/interne Verlinkung, AEO-Update) -> seo v0.4.0;
claude-ads (deterministisches Audit-Scoring, Benchmark-Belegpflicht, Testwellen-Regeln, Automatisierungs-Tiers) -> ads v0.4.0;
knowledge-work-plugins/brand-voice (Voice-Analyse-Vorlage, Voice-vs-Ton) -> copywriting v0.4.0 + onboard v0.3.0.
Details in VENDORING.md Runde 3.
