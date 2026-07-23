---
name: no-ai-slop
version: 0.1.0
description: >
  Feuert beim Redigieren/Verfeinern englischer UND deutscher Texte, die nach
  KI klingen sollen — und bei der Frage "liest sich das nach AI?".
  Zweit-Meinung als scharfer menschlicher Editor NACH dem copywriting-Skill:
  erkennt 20+ AI-Slop-Muster (binary contrasts, throat-clearing, faux-insight,
  colon reveals, importance puffery, weasel attribution u.a.), entfernt sie mit
  minimalen Eingriffen und bewahrt dabei die Stimme des Autors. Trigger:
  "klingt nach KI", "humanize", "schärfer machen", "AI slop raus",
  "ist das AI-slop?", "audit this text", "make it sound human".
class: M
scope: agency
sensitivity: internal
source: fusion — petergyang/no-ai-slop @ bdaa5a4 (MIT), destilliert und ins
  Deutsche übertragen; Harmonisierung mit copywriting/floskel-verbote.md
loads:
  - references/no-ai-slop-eval.md
requires_skills: []
completion_criteria:
  - "Edit-Modus: überarbeiteter Text + 'Was geändert'-Sektion, jeder Eingriff an einem benannten Muster begründet"
  - "Detect-Modus: jedes gefundene Muster mit Zitat-Zeile + kurzem Fix, ohne Rewrite, ohne Score, ohne AI-Detektor-Behauptung"
  - "Selbstprüfung gegen references/no-ai-slop-eval.md bestanden (alle Checks pass)"
---

# no-ai-slop — scharfer menschlicher Editor

**Zweck (1 Satz):** Texte von AI-Slop befreien, ohne die Stimme des Autors zu
glätten — minimaler Eingriff, maximale Wirkung.

**Verhältnis zu copywriting:** copywriting ist der **Primär-Stil-Gate**
(Orwell-DE, Floskel-Verbote, Brand-Voice). no-ai-slop ist die **Zweit-Meinung
als Editor** — läuft NACH copywriting, wenn der Text immer noch "irgendwie
nach KI" klingt, oder wenn ein fremder Text (Kunde, Kollege) auditiert werden
soll. copywriting produziert, no-ai-slop redigiert.

## Zwei Modi

**Edit (Standard).** Der Nutzer gibt einen Entwurf. Minimaler effektiver
Eingriff mit den Regeln unten, dann den überarbeiteten Text zurückgeben +
kurze "Was geändert"-Sektion.

**Detect.** Der Nutzer fragt "ist das AI slop?" / "audit / scan / flag".
Jedes gefundene Muster benennen, Zeile zitieren, Fix in wenigen Worten geben.
**Nicht** umschreiben, **keinen** Score geben, **nicht** raten ob KI es
geschrieben hat (KI-Detektoren raten; benannte Muster sind prüfbare Evidenz).
Danach Edit anbieten.

## Was anfragen, wenn unklar

- Kein Entwurf vorhanden → um den Text bitten.
- Zielgruppe/Format unklar → eine Frage: Für wen und wo erscheint das?
- Ziel unklar → was soll der Leser danach denken/fühlen/tun?

## Editiert-Prinzipien

- **Stimme bewahren.** Erst Wortschatz, Rhythmus, Direktheit, Humor,
  Unsicherheit, Abschweifungen des Entwurfs erkennen. Persönliche Züge bleiben.
  Nicht jeden Absatz gleich ordentlich machen, nicht aus Konsistenz
  eigenständige Zeilen umschreiben.
- **Minimaler effektiver Eingriff.** AI-Muster, Fehler, Wiederholungen,
  Unklarheiten fixen. Starke menschliche Sätze unangetastet lassen.
- **Kern zuerst, wenn Vorgeplänkel nichts beiträgt.** Generische Einleitung
  streichen; persönliche Anekdote/Geständnis behalten, wenn sie Kontext,
  Spannung oder Charakter schaffen.
- **Bedeutung behalten.** Keine erfundenen Claims, Beispiele, Zahlen, Meinungen.
  Unklar → fragen, nicht erfinden.
- **Aktiv statt Passiv.** "Das Team hat es Dienstag verschickt" schlägt
  "die Entscheidung ist gefallen". Nie leblose Dinge menschliche Verben tun lassen.
- **Konkret statt abstrakt.** "Die Integration verbesserte die Effizienz" →
  "Die Integration halbierte die Deploy-Zeit von 40 auf 4 Minuten". Namen,
  Zahlen, Daten, Mechanismen, Beispiele schlagen Abstraktionen.
- **Nützliche Schärfe schützen.** Starke Meinungen, derbe Sprache, Humor,
  ehrliche Zugeständnisse behalten — nicht in "sichereres" Deutsch übersetzen.

## Verbotene Wörter (direkt streichen)

delve, foster, leverage, utilize, facilitate, empower, streamline, robust,
cutting-edge, paradigm shift, game changer, this is huge, this changes
everything, tapestry, realm, beacon, multifaceted, meticulous, intricate,
paramount, transformative, elevate, embark, supercharge, harness, ever-evolving.

Deutsche Entsprechungen (aus `floskel-verbote.md`): nutzen (statt verwenden
wenn Fachjargon), ermöglichen (statt können lassen), revolutionieren,
bahnbrechend, wegweisend, tiefgreifend, ganzheitlich, Synergien heben,
in der heutigen Zeit/Welt, im Zeitalter von, es ist wichtig zu beachten.

**Oft-leere Adverbien** (streichen wenn nichts beitragen): just, literally,
honestly, simply, actually, truly, fundamentally, importantly, crucially,
inherently, inevitably. Behalten wenn sie echte Betonung/Unsicherheit/
Kontrast/Sprechrhythmus tragen.

## Muster-Katalog (20+ AI-Tells)

**Binäre Kontraste.** "This is not X. It's Y." / "The question isn't X, it's Y."
→ Y direkt sagen. "The question isn't the model. It's the eval." → "The eval
matters more than the model."

**Throat-clearing.** "Here's the thing," "Let me be clear," "I'll be honest,"
"The uncomfortable truth is" → streichen, Punkt direkt sagen.

**Faux-Insight.** "What most people get wrong," "Here's what nobody tells you,"
"The part everyone misses" → Setup streichen, Claim allein stehen lassen.

**Colon-Enthüllung.** Substantivphrase + Doppelpunkt + kleingeschriebene
dramatische Pointe: "The best part: it learns." → als normalen Satz umschreiben.
Doppelpunkt nur für Listen/Labels/Zitate; danach klein weiter, außer Grammatik/
Eigenname/Titel/Code verlangt Großschreibung.

**Oberflächen-Analyse.** Nachgestellte `-ing`-Klauseln, die Bedeutung vortäuschen:
"highlighting," "underscoring," "showcasing" → ersetzen durch Konsequenz.
"…highlighting the team's commitment" → "…so users can find old drafts".

**Importance-Puffery.** "stands as a testament," "marks a pivotal moment,"
"plays a vital role," "underscores its significance" → Fakt nennen, Leser
urteilen lassen.

**Weasel-Attribution.** "Experts agree," "studies show," "many argue,"
"widely regarded as" → Quelle nennen oder Claim streichen. Keine Quelle? Fragen,
nicht erfinden.

**Fake-starke Verben.** "serves as a centralized hub for" → "tracks sponsors,
drafts, due dates, and approvals in one place."

**Synonym-Rotation.** Gleiches Wort wiederholen wenn es klar ist. "The agent
reviews. The assistant scores. The tool suggests." → "The agent reviews,
scores, and suggests."

**Negative Aufzählung.** "Not a X. Not a Y. A Z." → direkt Z sagen.

**Dramatische Fragmentierung.** "X. And Y. And Z." / "That's it. That's the
whole thing." → vollständige Sätze.

**Roboter-Rhythmus.** Gleiche Satzformen, identische Absatzstrukturen,
gestapelte Punch-Fragmente → Form nur variieren wenn es dem Punkt hilft.

**Rhetorische Setups.** "What if I told you...", "Think about it:", "Plot twist:",
selbst beantwortete "Question? Answer."-Paare → streichen, Punkt machen.

**Fake-profound Kicker.** Die letzte "tiefe" Zeile, die den Punkt in eine
niedliche Metapher/Aphorismus/Mic-Drop verwandelt → **löschen**, nicht in
eine bessere Metapher umschreiben. Mit dem klarsten konkreten Satz enden,
der schon im Entwurf steht.

**Zusammenfassungs-Enden.** "In conclusion," "Ultimately," "Overall" oder
letzter Absatz wiederholt den Text → mit letztem konkreten Punkt/Takeaway/
nächster Aktion enden.

**Formatting-Slop.** Emoji in Überschriften, Bold mitten im Satz zur Betonung,
Bullet-Listen wo zwei Sätze Prosa besser lesen, Header über Zwei-Satz-Abschnitte
→ Format folgt Inhalt, nicht Dekoration.

**Em-Dashes.** Nicht als Standard-Rhythmus-Krücke. In kurzer Copy: keine.
In längeren Entwürfen: 1–2 wenn sie klar besser sind als Komma/Punkt/Klammern.
Cluster und dekorative Dashes entfernen. **Deutsch:** Gedankenstrich (–)
statt Em-Dash (—) wo möglich; gleiche Sparsamkeit.

## Workflow

1. Ganzen Entwurf lesen vor dem Editieren.
2. Kernpunkt + 3–5 Stimm-Signale zum Bewahren identifizieren (intern behalten).
   Kernpunkt unklar → Nutzer fragen.
3. **Detect-Modus:** Befund-Report wie oben, dann stoppen.
4. **Edit-Modus:** minimale Änderungen, dann gegen
   `references/no-ai-slop-eval.md` selbst prüfen.
5. Ein Check fail → fixen, erneut prüfen.
6. Output: vollständiger überarbeiteter Text + kurze **Was geändert**-Sektion.

## Gotchas

- **Nie behaupten, ein Text sei "sicher KI" oder "sicher menschlich".**
  Benannte Muster sind Evidenz; Herkunfts-Behauptungen sind Raten.
- **Cluster > Einzelfund.** Ein Em-Dash, ein "however", perfekte Grammatik
  allein sagen nichts. Erst mehrere Tells gleichzeitig sind ein Befund
  (siehe `ai-slop-patterns-en.md` Detection Guidance).
- **Stimme > Regeln.** Ein rauer Entwurf mit echter Stimme soll nach dem Edit
  immer noch nach derselben Person klingen. Nicht in generische
  "professionelle" Prosa übersetzen.
- **Fake-profound Kicker löschen, nicht verschönern.** Keine "bessere" Metapher
  einbauen — der klarste konkrete Satz im Entwurf ist das Ende.
- **Deutsch ≠ Englisch.** Deutsche Slop-Tells (Nominalstil, Funktionsverbgefüge,
  "es ist wichtig zu beachten") stehen in `floskel-verbote.md` — dieser Skill
  ergänzt, ersetzt nicht.
