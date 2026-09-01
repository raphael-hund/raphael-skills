# Rolle: Plan-Session

Einstiegs-Ebene für die **Plan**-Session der Drei-Sessions-Ordnung
(Plan / Kritik / Bau, Raphael 01.09.2026). Detail-Ebene:
`planner-executor-protokoll.md`, `sitemap-section-planung.md`,
`landingpage-struktur.md`, `informationsarchitektur.md`.

Chip-Leiste: **nur `/web`**, Effort high. Nie `/orchestrate`, nie `/ultracode`,
nie `/design`, nie `/visual-aaa`.

## Start der Session (hart)

```bash
node /root/raphael-skills/skills/eigene/web/scripts/session-gate.mjs \
  --rolle plan --client /root/clients/client-<name>/web/handoff
```

Exit 0 = frei. Fehlt `PRUEFGEGEN.md`, legt das Gate sie aus
`references/templates/PRUEFGEGEN-template.md` an — sie wird danach ausgefüllt,
nicht als Template stehen gelassen.

## Was die Plan-Session macht — und was nie

| Macht | Macht nie |
|---|---|
| `PLAN.md`, `PRUEFGEGEN.md`, Reihenfolge, Copy-Briefing | Production-Code, Build-/Kritik-Shot-Reads (Eingang-Referenzen: max 3, siehe unten), Subagenten, Workflows |

Kein Screenshot-Sweep, keine Kritik-Flotte, keine finale Copy. Ergebnis der
Plan-Session sind zwei Textdateien und ein Handoff-Prompt.

## Die zwei Truth-Dateien

Ablageort (absolut, beim ersten Handoff anlegen):
`/root/clients/client-<name>/web/handoff/`

- **`PLAN.md`** — das Original. Nie zusammenfassen, nie umschreiben, nur per
  datiertem Änderungsblock ergänzen („Änderung 01.09: …“). Eine frische Session
  liest PLAN.md immer vollständig. Eine Zusammenfassung von Zusammenfassungen
  ist verboten.
- **`PRUEFGEGEN.md`** — der Prüflinsen-Vertrag. Format und Beispielzeilen:
  `references/templates/PRUEFGEGEN-template.md`. Eine Tabelle
  (Linse | Skill/Quelle | Datei/Referenz | Shot/Viewport | Prüffrage), sonst
  nichts. Ohne diese Datei startet die Kritik-Session nicht.

`STATUS.md` und `KRITIK-n.md` schreiben Kritik und Bau, nicht Plan.

**Abgrenzung:** Dieses Session-Handoff ist nicht das Run-Evidence-Handoff.
`PLAN.md` ersetzt weder einen `website-plan`-v3-Vertrag noch
`run-evidence.json`. Ist der Plan ein v3-Plan, verweist `PLAN.md` auf dessen
Pfad und Hash; die Bau-Session läuft trotzdem durch alle Gates.

## Sitemap und Section-Plan

Landing → `landingpage-struktur.md`. Mehrseitig →
`sitemap-section-planung.md`; die dortige Abnahme-Checkliste ist bindend
(5 Schritte, keine Auslassung: volle Sitemap → Section-Design-System →
Section-Plan je Seite → Querschnitt → Bau-Reihenfolge). Beide nie zusammen
laden — entweder Landing oder Multi-Page.

IA-Wissen (Nav, URLs, Linkgraph): `informationsarchitektur.md`.

## Verhältnis website-plan (v3) ↔ Section-Plan

Beide dürfen nebeneinander existieren, aber sie haben verschiedene Rollen:

- Das **v3-Manifest** (`plan-manifest.json` + `plan-verification.json`,
  Schema `website-plan/verification/v3`) ist die **maschinelle Wahrheit**:
  Route-Abhängigkeiten, Write-Sets, Shared Owners, Hashes. Der Build liest
  seine Pakete daraus.
- Der **Section-Plan** aus `sitemap-section-planung.md` ist die **menschliche
  Sicht**: welche Sektion welchen Job hat, welcher Layer, welches Pattern.

**Bei Divergenz gewinnt v3.** Weicht der Section-Plan vom Manifest ab, wird der
Section-Plan nachgezogen und die Abweichung als datierter Änderungsblock in
`PLAN.md` vermerkt — nie umgekehrt still am Manifest vorbeigebaut.

Ist `website-plan/` Baukanon, gilt fail-closed: v3-Validator Exit 0,
`PLAN_VERIFIED=YES`, `manifest_sha256` gleich dem aktuellen Manifest-SHA-256,
jeder attestierte Plan-Hash gleich dem aktuellen Planartefakt. Hash-Drift,
`OWNER-BLOCKER`, doppelte Owner oder Write-Set-Overlap bleiben `BLOCKED`.
Inhalt und unklare Zahlen sind dagegen `FAKT-GATE` / `content-park` — kein
Blocker.

## SEO- und Copy-Grundlage (Plan legt sie, schreibt sie nicht)

**SEO:** Die Plan-Session lädt den Skill `seo` für Keyword- und
Sitemap-Entscheidungen auf **On-Page-Level** — Keyword je Route, Title/H1-Absicht,
URL- und Nav-Struktur. Das ist nicht das Loop-4-Vollprogramm: kein
SERP-Research-Export, kein Ranking-Plan, kein technischer Audit. Diese
Entscheidungen gehören in `PLAN.md`, weil sie die Sitemap formen; alles darüber
hinaus ist ein eigener Loop-4-Auftrag.

**Copy-Briefing:** Die Plan-Session schreibt das Briefing als Text in `PLAN.md`:

- **Zielgruppe** — konkret, keine Sammelbegriffe (Meaning-Frage A).
- **Ton** — ein Vibe-Wort plus VOICE-Referenz
  (`/root/clients/client-<name>/wiki/VOICE.md`).
- **Keyword je Route** — aus der SEO-Entscheidung oben.
- **Proof-Lage je Route** — was echt belegt ist (`PROOF.md`) und was
  Platzhalter bleibt.

**Plan schreibt keine finale Copy** und startet dafür keine Subagenten. Das
Briefing ist Text; die Copy schreibt später im Bau-Workflow `kimi-worker` oder
`sol-builder` (`rolle-bau.md`).

## Meaning-Capture (vor der Sitemap)

Vier Pflichtfragen schriftlich in `client-<name>/web/strategy.md`, Abschnitt
`Meaning`: (A) Für wen? (B) Welches Problem? (C) Welches Gefühl (ein Vibe-Wort)?
(D) Was soll es repräsentieren? Aufschreiben, nicht denken — hier nur fragen,
nicht designen. Fail = nicht an `art-direction` weitergehen.

## Referenzen aus dem Briefkasten (Pflicht)

Vor jeder Stilentscheidung: `ls -lt /root/eingang | head -20`; bildhafte Dateien
der letzten 7 Tage per `Read` ansehen — **höchstens 3 Stück**, und nur
Kundenreferenzen aus dem Briefkasten. Das PNG-Verbot der Rollen-Tabelle meint
Build- und Kritik-Shots (die Massenware, die Parents historisch geflutet hat),
nicht die Handvoll Referenzbilder, ohne die kein Stilurteil geht. Raphael legt
Referenzen dort ab, ohne sie im Prompt zu erwähnen. Verwendetes kommt in den
Plan; ist nichts relevant, steht dort in einem Satz warum.

## Handoff-Format (vier Blöcke, nichts weiter)

1. **Auftrag** — was die Empfänger-Session jetzt tut (imperativ, 1–5 Punkte).
2. **Quellen** — Dateipfade: immer `PLAN.md` + `PRUEFGEGEN.md` + `STATUS.md`,
   plus die aktuelle `KRITIK-n.md`. Keine Inhalte inline duplizieren.
3. **Grenzen** — was ausdrücklich nicht Teil des Auftrags ist, inkl. aktueller
   Raphael-Neins (aus `DESIGN.md`/`DECISIONS.md` referenziert).
4. **Rückgabe** — erledigte Pakete mit Beleg (Gate-Ausgabe, Screenshot-Pfad),
   Blocker als `BLOCKED` mit Grund, offene Entscheidungen für Raphael.

Ausgefüllte Beispiele beider Richtungen: `planner-executor-protokoll.md`.

## Vorschau vs Launch (Plan-Sicht)

Die Plan-Session plant für eine geile Kunden-Vorschau. Preview-Blocker sind
**Ablauf, Sitemap, Idee, Design**. Satz, Wort, Bild, Sektion,
Review-Platzhalter, 50 vs 60, Domain/Vercel sind Swaps und werden geparkt —
sie kommen nicht als Blocker in den Bau-Auftrag. Unklare echte Zahl =
Working-Zahl plus `FAKT-GATE`-Eintrag in `PLAN.md`, damit der Launch sie
abarbeitet (`rolle-launch.md`).

## Session-Rotation

Ab ~70–80 % Kontextauslastung proaktiv rotieren: `STATUS.md` aktualisieren,
5–10 Zeilen Rotations-Handoff ans Ende (erledigt / aktueller Schritt / nächster
Schritt / aktive Neins). Die frische Session startet mit einem Prompt und liest
`PLAN.md` vollständig. Verboten: die Zusammenfassung der alten Session als
Ersatz für `PLAN.md`. Detail: `planner-executor-protokoll.md`.
