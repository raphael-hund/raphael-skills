# PLAN — Referenz-Studium: dem web-Skill Geschmack beibringen

**Überschrieben 30.08.2026 (Raphael):** Kein Kanon aus unfertigen Kunden.
Gültiger Plan: `plans/2026-08-30-fremde-seiten-kanon.md`.
House-Cases und S-Regeln aus BRAUN/Swisshelp/Salsaflow/Kita sind **nicht Kanon**.

Stand: 30.08.2026 · Auftraggeber: Raphael · Status: **Phase 0 gebaut, Kanon-Pflicht zurückgenommen** (30.08.)

**Ehrlicher Reststand:**
- House-Cases stehen, aber **ohne Screenshot-Capture** — jeder Case trägt
  `Capture: fehlt` und darf nicht als visueller Beweis zitiert werden.
- Externe Kandidaten sind **ungestempelt**: 8 Platzhalter in
  `stil-regeln.md` §6, keine erfundenen Fremd-URLs.
- `scripts/muster-studie.mjs` ist gebaut.

## Umsetzungslog Phase 0 (erledigt 30.08.)

- [x] `references/muster-bibliothek/` mit `_template.md` + `INDEX.md` angelegt
- [x] `references/stil-regeln.md` **mit Substanz gefüllt** (30.08.): 18 Regeln
      S1–S18 mit Belegstellen `datei:zeile`, Sektor-Dial-Tabelle, 10er
      Sektionen-Katalog, 8 ungestempelte externe Kandidatenplätze
- [x] `references/load-graph.md` (Always / On demand / Never on site-build)
- [x] 5 House-Cases: braun-services, salsaflow, kraftwerk-garage,
      swisshelp-elektro, kita-wunderkiste — alle **ohne Screenshot-Capture**
- [x] `references/anfaenger-pfad.md`: 2 neue Tabellenzeilen (Stil-Entscheidung =
      Pflicht-Load; Referenzseite einlernen), Pipeline-Schritt vor art-direction,
      Anfänger-Falle #11
- [x] `SKILL.md`: Pflicht-Load in Schritt 4 art-direction, 2 Router-Zeilen,
      Gotcha ergänzt
- [ ] Pilot: 5 Referenzseiten von Raphael einlernen (nächster Schritt)
- [x] `scripts/muster-studie.mjs` (URL → Tokens+Shots) — gebaut

## Diagnose (warum der Skill „wilde Sachen" baut)

1. **Nur Verbote, keine Vorbilder.** Der Skill kennt viele No-Gos
   (`agentur-merkmale.md`, `scan-ai-slop`, `craft-check`), aber null kuratierte
   positive Muster: keine einzige von Raphael abgenommene Referenzseite mit
   Begründung. Geschmack ohne Beispiele = Agent improvisiert.
2. **Regeln auf der falschen Ebene.** Was deterministisch prüfbar ist, steht
   teils nur in Prosa-References, die der Agent laden *kann*. Was nicht prüfbar
   ist, hat keinen Beleg-Anker.
3. **Load-Stack ist aufgebläht und redundant** (Analyse unten): 16 Skills,
   davon ca. 8 Router/Dubletten/Meta-Workflows, die keinen Geschmack beitragen.

## Zielbild

- Eine **Muster-Bibliothek** aus 20–40 realen Referenzseiten, jede mit
  Raphael-Urteil (GO / NO-GO / gemischt) und Sektionen-Inventar.
- Ein **Stil-Regelbuch** (`stil-regeln.md`): Go's und No-Go's mit ID,
  Quelle (welche Referenzseiten belegen die Regel), Status
  (Kandidat → bestätigt ab ≥3 Belegen → verbindlich).
- **Deterministische Gates** für jede maschinell prüfbare No-Go-Regel
  (Ausbau `craft-check.mjs` / `scan-ai-slop.mjs`), damit Text-Regeln, die
  checkbar sind, nicht auf Modell-Disziplin angewiesen sind.
- Pflicht-Verdrahtung im Ablauf: vor art-direction → Regelbuch lesen;
  im Build → pro Section eine Zeile „welche Regel/welches Muster angewandt";
  in QA → Abgleich gegen Regelbuch.

## Neuer Bestand im Skill (Phase 0, einmalig)

```
references/muster-bibliothek/
  INDEX.md            # 1 Zeile pro Studie: Name, URL, Datum, Urteil, Tags
  _template.md        # feste Studien-Rubrik (unten)
  <slug>.md           # eine Case-Datei pro Referenzseite
references/stil-regeln.md   # das lebende Regelbuch
scripts/muster-studie.mjs   # NEU: URL → Tokens + Screenshots + Section-Liste
```

### Studien-Rubrik (`_template.md`, fix für jede Seite)

1. **Capture:** Desktop 1440 + Mobile 390, Sections-Shots (nicht fullPage als
   Kritik-Input — derselbe Standard wie shot-sweep).
2. **Tokens:** Fonts, Farben (OKLCH), Spacing-Skala, Radii, Shadows —
   maschinell extrahiert, nicht geraten.
3. **Sektionen-Inventar:** Reihenfolge und Typ (Hero, Proof, Offer, Mechanik,
   FAQ, Footer …) + je 1 Satz „wie gebaut".
4. **Raphael-Urteil:** GO / NO-GO / gemischt + 3–5 Stichpunkte warum
   (Raphael liefert kurz, Agent strukturiert).
5. **Regel-Kandidaten:** Jede Beobachtung → Kandidat in `stil-regeln.md`
   mit Beleg-Link auf diese Case-Datei.

## Ablauf (4 Phasen)

**Phase 1 — Sammel-Loop** (pro Seite ~15–25 Min, Batches à 5, Checkpoint nach
jedem Batch): Raphael gibt URL oder legt Screenshot in `/root/eingang` →
Agent führt Studien-Rubrik aus → Case-Datei + INDEX-Zeile + Regel-Kandidaten.
Skalierbar über Sessions, weil Zustand komplett in Dateien liegt.

**Phase 2 — Destillation** (nach ~10 / ~20 / ~30 Seiten): Kandidaten mit ≥3
konkordanten Belegen → „verbindlich". Widersprüche werden explizit aufgelöst
(„Variante A für Branche X, B für Y"). Sektionen-Musterkatalog: pro
Section-Typ 2–4 freigegebene Layout-Varianten mit Do/Don't.

**Phase 3 — Einbau/Enforcement:**
- `anfaenger-pfad.md` + 1 Zeile: vor art-direction `stil-regeln.md` + passende
  2–3 Cases aus INDEX laden.
- `SKILL.md` + 3 Zeilen (Pflicht-Load, Muster-Zitat im Build, QA-Abgleich).
- Checkbare No-Gos → neue Detektoren in `craft-check.mjs` / `scan-ai-slop.mjs`
  + Evals (`evals/`), damit Regeln nicht wieder verkommen.
- Screenshot-Kritik-Panel bekommt das Regelbuch als Kontext.

**Phase 4 — Drift-Schutz:** Jede neue Referenz läuft durch denselben Loop;
Regel-Änderungen nur über Belege, nie ad hoc im Chat.

## Load-Stack-Empfehlung (Antwort auf „zu viele Skills?")

**Ja, zu viele.** Von den 16 tragen nur 5 Geschmack/Substanz beim Site-Build:

| Skill | Verdict | Grund |
|---|---|---|
| `web` | **behalten** | Router/Dach, unverändert |
| `design` | **behalten** | v0.4.0 hat taste + impeccable + kill-ai-slop + emil-Motion bereits fusioniert |
| `copywriting` | **behalten** | G1→G2 Text-Gates |
| `higgsfield` | bedarfsweise | nur bei Bild-Generierung |
| `seo` | bedarfsweise | nur Loop-4/SEO-Aufträge |
| `taste`, `impeccable`, `no-ai-slop` | **nicht mehr laden** | sind `disable-model-invocation`-Router, die nur in design/copywriting zeigen |
| `kill-ai-slop` | **nicht mehr laden** | in design fusioniert (scan-ai-slop) |
| `emil-design-eng` | **nicht mehr laden** | in design fusioniert |
| `frontend-design` | **nicht mehr laden** | generisches Dritt-Skill, design deckt ab |
| `visual-harness` | **nicht mehr laden** | Dublette zu `shot-sweep.mjs` (kanonischer Capture-Weg) |
| `ce-work`, `wayfinder`, `unlazy` | **nicht beim Site-Bau** | Meta-Workflows; unlazy nur bei explizitem Gauntlet |
| `poteto`/`peteto` | **nicht beim Site-Bau** | Persona-Modus, orthogonal |

Effekt: Standard-Load für Site-Build = **web + design + copywriting**
(+ higgsfield/seo nach Bedarf). Alles andere nur noch auf expliziten Slash-Befehl.

## Entschieden (Raphael 30.08.2026) — nicht mehr offen

1. **Gerüst gebaut**, Phase 0 inklusive 5 House-Cases als Pilot-Batch.
2. **`stil-regeln.md` ist Pflicht-Load vor jeder Art-Direction**, nicht nur
   bei Neubauten.
3. **Referenzen kommen von Raphael** (URL oder Screenshot in `/root/eingang`).
   Der Agent erfindet keine Fremd-URLs; die 8 externen Plätze bleiben
   ungestempelt, bis Raphael liefert.
4. **House-Locks aus einer Kunden-`DESIGN.md` sind sofort verbindlich**, nicht
   Kandidat. Raphael hat sie gelockt.
5. **Sektor-Dials gewinnen gegen die taste-kern-Baseline 8/6/4** (Regel S15).
6. **Site-Build-Load = `web` + `design` + `copywriting`**; Rest bedarfsweise
   oder nie (`references/load-graph.md`).

## Done-Kriterium für diesen Plan-Prozess

- Phase 0 gebaut und `anfaenger-pfad`-Zeile verdrahtet
- Erste 5 Case-Dateien + INDEX + ≥10 Regel-Kandidaten aus Pilot-Batch
- `stil-regeln.md` existiert und ist aus `anfaenger-pfad.md` erreichbar
