# Rolle: Plan-Session

Einstiegs-Ebene für die **Plan**-Session der Drei-Sessions-Ordnung
(Plan / Kritik / Bau, Raphael 01.09.2026). Detail-Ebene:
`planner-executor-protokoll.md`, `sitemap-section-planung.md`,
`landingpage-struktur.md`, `informationsarchitektur.md`.

Chip-Leiste: **nur `/web`**, Effort high. Die Plan-Phase darf gezielte Planungs-, Research- und Art-Direction-Leaves aus Stufe 1 nutzen (`astra-worker`, `kimi-worker`, `fable-builder`); sie startet keinen Bau- oder Kritik-Workflow und lädt weder `/design` noch `/visual-aaa` als zweiten Owner.

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
| `PLAN.md`, `PRUEFGEGEN.md`, Reihenfolge, Copy-Briefing; gezielte Planungs-, Research- und Art-Direction-Leaves | Production-Code, Build-/Kritik-Workflows; mehr als drei Eingang-Referenzen |

Kein Screenshot-Sweep, keine Kritik-Flotte, keine finale Copy. Ergebnis der
Plan-Session sind zwei Textdateien und ein Handoff-Prompt.

## Die zwei Truth-Dateien

Ablageort (absolut, beim ersten Handoff anlegen):
`/root/clients/<kunde>/web/handoff/`

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

## Seitenkarte, DESIGN.md-Seed und Stack (seit 08.09.2026)

Die Plan-Phase legt zusätzlich an: `SEO-PAGE-MAP.json` nach `references/seo-pages.md` (jede Route mit Intent, eigenem Wert, Links, Indexierbarkeit; Prüfung `node scripts/validate-page-map.mjs SEO-PAGE-MAP.json --phase plan`), den `DESIGN.md`-Seed aus `assets/DESIGN.template.md` (Tokens, Elementmanifest, Komponentenabschnitt mit Registry-Herkunft) und die Stack-Entscheidung: Neuaufbau = React-Projekt aus `assets/react-starter` (`references/stack.md`); bestehendes Projekt bleibt auf seinem Stack. Die Werkzeugtabelle (`references/tool-usecase-router.md`) nennt je Komponentenfamilie den Registry-Namespace oder das npm-Paket aus `references/component-registries.md`.

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

**Copy-Briefing:** Die Plan-Session schreibt das Briefing als Text in `PLAN.md`.
Quellen sind **beide** Kunden-Wahrheitsdateien: `/root/clients/<name>/wiki/absprachen.md`
(jede Raphael-Ansage, auch ohne Decision-Eintrag) **und** `DECISIONS.md`. Tote
Formulierungen, kanonische Zahlen und der CTA-Wortlaut stehen als eigene Zeilen im
Briefing; ein Copy-Leaf, das nur eine der beiden Dateien kennt, schreibt Absprachen
zurück in den Text (MAKE-Pilot 04.09.2026: Google-Rating und CTA aus `absprachen.md`
rutschten durch, G2 0,49).
Drei Felder sind Pflicht und werden in der Kritik-Phase gegen den Fold geprüft —
ein leeres Feld ist kein Briefing, sondern ein Blocker der Plan-Abnahme:

- **Pain** — der eine Satz, den der Besucher als sein Problem wiedererkennt.
- **Person** — wer genau vor der Seite sitzt, in welcher Lage (Meaning-Frage A,
  schärfer als „Zielgruppe“).
- **Promise** — was die Seite verspricht, in der Sprache des Ergebnisses, nicht
  der Leistung.

Die Kritik-Phase prüft alle drei am Fold-Shot (1440×900 und 390×844): Steht Pain
sichtbar über dem Fold? Ist Person daraus ablesbar? Ist Promise die Headline
oder die Primäraktion? Ein Feld, das im Fold nicht wiederzufinden ist, ist ein
Befund gegen den Fold, nicht gegen das Briefing.

Dazu weiterhin:

- **Zielgruppe** — konkret, keine Sammelbegriffe (Meaning-Frage A).
- **Ton** — ein Vibe-Wort plus VOICE-Referenz
  (`/root/clients/client-<name>/wiki/VOICE.md`).
- **Keyword je Route** — aus der SEO-Entscheidung oben.
- **Proof-Lage je Route** — was echt belegt ist (`PROOF.md`) und was
  Platzhalter bleibt.

**Plan schreibt keine finale Copy.** Planungs-Leaves dürfen Fakten, Sitemap, Gegenposition und Art Direction vorbereiten; die finale Copy schreibt erst der eigene Copy-Leaf im Bau. Das
Briefing ist Text; die Copy schreibt später im Bau-Workflow `astra-worker`, dann `kimi-worker` oder `fable-builder` (`rolle-bau.md`).

## Meaning-Capture (vor der Sitemap)

Vier Pflichtfragen schriftlich in `client-<name>/web/strategy.md`, Abschnitt
`Meaning`: (A) Für wen? (B) Welches Problem? (C) Welches Gefühl (ein Vibe-Wort)?
(D) Was soll es repräsentieren? Aufschreiben, nicht denken — hier nur fragen,
nicht designen. Fail = nicht an `art-direction` weitergehen.

## Eine Art-Direction je Kunde (Pflicht, MAKE 04.09.2026)

Bevor der Plan Tokens oder Look nennt: alle vorhandenen Stil-Quellen des Kunden
listen (`brand/DESIGN.md`, `website-plan/art-direction.md`,
`client-<name>/web/art-direction.md`, Inspirations-Lock, Live-Seite) und jeden
Widerspruch benennen (MAKE hatte drei: Lock «weisses Canvas», Plan «#131a1a
all-sharp», Raphael «dunkel, Anthrazit, 20px-Karten»). Auflösung: Raphaels
jüngstes Wort gewinnt, dann die Live-Seite, dann `DESIGN.md`. Die Auflösung
steht als datierte Zeile in `brand/DESIGN.md`; `art-direction.md`-Dateien
verweisen nur noch dorthin. Ein Plan mit zwei gültigen Looks ist kein Plan.

## Fold-Duell vor Welle 1 (Pflicht bei Neuaufbau, Redesign, «Look von null»)

Der Plan legt drei Fold-Richtungen mit benannter Achse fest
(`references/fold-duell.md`), eine davon immer «Live-Seite oder Raphaels
jüngste Referenz, sauber weitergebaut». Die Bau-Phase startet damit; Welle 1
(Design-System, Routen) wartet auf Raphaels Wahl in `DECISIONS.md`. Erstes
Bild für Raphael spätestens 30 Minuten nach Auftrag. Fertig-Kriterium des Plans
ist damit auch: `PLAN.md` enthält den Abschnitt «Fold-Duell» mit drei Zeilen
`slug | Achse | Referenzbilder | Copy-Quelle`.

## Referenzen aus dem Briefkasten (Pflicht)

Vor jeder Stilentscheidung: `ls -lt /root/eingang | head -20`; bildhafte Dateien
der letzten 7 Tage per `Read` ansehen — **höchstens 3 Stück**, und nur
Kundenreferenzen aus dem Briefkasten. Das PNG-Verbot der Rollen-Tabelle meint
Build- und Kritik-Shots (die Massenware, die Parents historisch geflutet hat),
nicht die Handvoll Referenzbilder, ohne die kein Stilurteil geht. Raphael legt
Referenzen dort ab, ohne sie im Prompt zu erwähnen. Verwendetes kommt in den
Plan; ist nichts relevant, steht dort in einem Satz warum.

**Bilder bleiben Bilder.** Der Plan beschreibt eine Referenz in einer Zeile,
aber die Datei geht als Pfad in `handoff/referenzen/BILDLISTE.txt` und wird von
jedem Builder- und Judge-Leaf per Read gelesen (Bericht: Zeile «gesehen:» je
Bild). Eine Prosa-Beschreibung («leuchtende Verbindungslinie mit Knoten») ist
kein Ersatz; aus Prosa bauten die Leaves am 04.09. flache Karten ohne Glow.

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
