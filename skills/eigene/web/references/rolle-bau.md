# Rolle: Bau-Phase

Einstiegs-Ebene für die **Bau**-Phase der Drei-Phasen-Ordnung
(Plan / Kritik / Bau, drei Phasen in **einem** Chat, Zustand auf Platte —
Raphael 02.09.2026). Detail-Ebene: `loop2-ablauf.md` (Reihenfolge, Gates,
Output-Pfade), `planner-executor-protokoll.md` (Handoff),
`agent-roster.md` + `orchestrierung.md` (Rollen, Parallelität),
`tool-usecase-router.md` (Werkzeugtabelle), `load-graph.md` (was geladen wird).

Chip-Leiste: **`/web` + `/orchestrate`**, Ultracode-Session-Default genügt —
kein zusätzlicher `/ultracode`-Slash, kein `/design`.

## Start der Phase (hart)

```bash
node /root/raphael-skills/skills/eigene/web/scripts/session-gate.mjs \
  --rolle bau --client /root/clients/client-<name>/web/handoff
```

Exit 2 = gesperrt: ohne mindestens eine `KRITIK-n.md` baut niemand. Dann
zurück an die Kritik-Phase.

## Erster Turn = Dynamic Workflow

Die Bau-Phase startet **im ersten Turn** einen Dynamic Workflow. Kein
Solo-CSS im Parent, keine „ich schau mal schnell selbst“-Runde davor.
`/orchestrate` ist der Controller-Owner.

**Welle 0 bei Neuaufbau/Redesign = Fold-Duell** (`references/fold-duell.md`):
drei Fold-Richtungen parallel (je ein `fable-builder`/`opus-builder`, 25 min),
Montage per `scripts/fold-duell-montage.mjs`, Bild in
`/root/eingang/ausgang/<kunde>/fold-duell/` per `SendUserFile`, Tunnel-Link.
Parallel dürfen nur SEO-Map, Copy und Asset-Inventar laufen. Design-System,
Pattern-Bibliothek und Routen starten erst nach Raphaels Wahl in
`DECISIONS.md`. Kein Judge-PASS ersetzt diese Wahl.

**Referenzbilder und Komponenten im Bau-Leaf (Pflicht):**
- Jeder Builder-Prompt nennt `handoff/referenzen/BILDLISTE.txt`; der Leaf liest
  jede Datei per Read und schreibt je Bild eine Zeile «gesehen: …» in seinen
  Bericht. Ohne diese Zeilen ist das Paket nicht fertig (Judge-Frage).
- Für Glow-Card, Bento, Carousel, Connector/Beam, Number-Ticker, Marquee,
  Spotlight, Dock, Border-Beam zuerst `scripts/komponenten.mjs search
  <@magicui|@aceternity|@react-bits|21st> "<name>"` und `get` nach
  `src/components/vendor/<lib>/`; Eigenbau nur mit Zeile «gesucht in …, nichts
  passte, weil …» im Bericht und Zeile in der Werkzeugtabelle. Am 04.09. lagen
  drei 21st-Kandidaten (Logo Cloud, Stats, Bento) im Inspirationsordner und
  wurden nie eingebaut; alle Muster entstanden flach von Hand.

## Der Parent ist Controller, nicht Builder

| Parent macht | Parent macht nie |
|---|---|
| Zerlegen, dispatchen, Ledger führen, mergen, abnehmen | CSS-/TSX-Datei editieren, Animationen durchrechnen, PNG-Binaries lesen |

Kein Solo-Debug von `wipe.css` im Parent: belegte Ursachen (datei:zeile) gehen
an Leaves. Der Parent führt das Shot-Ledger
(`pfad | viewport | gelesen-von | verdict`) in `STATUS.md` und zählt es gegen
`manifest.json`.

## Leaves — so viele wie Pakete

Typischer Zuschnitt, adaptiv bis zur Live-Kapazität:

| Paket | multi-family | claude-only |
|---|---|---|
| Sweep-Skript (kein Agent) | `shot-sweep --base <dev-url> --static --states --mobile` | dasselbe Skript |
| Visuelle Kritik derselben Shots | fremde tatsächliche Familien, `visual-kritiker` (Grok) + `opus-critic` (nur wenn Opus nicht gebaut hat) | zwei frische Sonnet-Instanzen, Label `claude-only, Instanz-Trennung` (`kritik-matrix.md`) |
| Belegte Code-Ursache (datei:zeile) | `grok-worker`, Input = Shot-Pfad + CSS-Ausschnitt | Sonnet-Instanz, gleicher Input |
| **Copy** | `sol-builder` (Kimi tot, Raphael 03.09.2026) | eigener Opus-**Copy-Leaf**, nie der Integrator-Leaf |
| Integration gemeinsamer UI-Flächen | **genau ein** `fable-builder` (Qualität) oder `opus-builder` | **genau ein** `opus-builder` |
| Code-Ursache / Ship-Review (Textausschnitt) | `sol-pruefer` — nie Bildpfade an Sol | Sonnet-Instanz, Textausschnitt statt Pfad |

Unabhängige Analysen und disjunkte Baupakete laufen parallel; abhängige oder
write-set-überlappende Pakete laufen sequenziell oder in Worktrees.

**Zeitbudget je Leaf (hart, MAKE-Pilot 03.09.2026):** Jeder Bau- und Kritik-Leaf
bekommt im Prompt ein Budget in Minuten und die Anweisung, spätestens 5 Minuten vor
Ablauf `StructuredOutput` mit dem erreichten Stand zurückzugeben (offene Punkte als
`offen`, nie stumm weiterarbeiten). Der Harness-Watchdog tötet Leaves nach 60 Minuten
ohne Rückgabe; ein Opus-Integrator lief so 63 Minuten und starb ohne Schema, der
Parent musste den Stand aus dem Transkript rekonstruieren. Richtwerte: Integrator
45 min, Routen-Leaf 2–3 Routen 40 min, Kritik-Leaf 25 min, Copy-Leaf 20 min, Mini-Fix 15 min.
Vor dem Fan-out `orchestrate/scripts/preflight.sh <worktree>` (Familien OK/DOWN, Owner-Run, Budget). Fable nur
über `fable-builder` (Raphael 04.09.2026), nie Haiku als Urteil. Wer baut, reviewt nicht.

## Copy im Bau: wer schreiben darf, hängt am Profil

Das Copy-Briefing kommt in beiden Profilen aus `PLAN.md` (Zielgruppe, Ton,
VOICE-Referenz, Keyword je Route, Proof-Lage). Die Bau-Phase erfindet es nicht
neu.

- **multi-family:** Copy schreibt **`sol-builder`** (Kimi tot, Raphael 03.09.2026).
  `opus-builder` hat ein **absolutes Copy-Verbot** — keine Headlines, keinen
  Fließtext, keine CTAs, keine Microcopy, keine Fehlermeldungen.
- **claude-only** (Raphael 02.09.2026): Copy schreibt ein **eigener
  Opus-Copy-Leaf**, **nie** der Integrator-Leaf. G0 und G1 laufen im
  Copy-Leaf, G2 judged eine Sonnet-Instanz zum Launch.

In beiden Profilen gilt für den Integrator dasselbe: Er baut freigegebene Texte
**unverändert** ein. Passt ein Text nicht ins Layout, meldet er den
Layoutkonflikt zurück, statt den Text zu ändern.

Vorschau-Copy darf Working-Copy sein: Platzhalter-Reviews und offene Zahlen
sind erlaubt (`content-park`). G2-Judge und echte Proofs sind Launch-Gates
(`rolle-launch.md`).

**Der Copy-Auftrag nennt seine Gates mit.** Working-Copy heißt nicht
gate-frei — zwei Gates laufen schon beim Schreiben, eines erst zum Launch:

| Gate | Wann | Wer |
|---|---|---|
| G0 `forbidden.md` | im Copy-Leaf, vor Rückgabe | der schreibende Leaf selbst |
| G1 (Orwell/Slop, `web-anti-slop`) | im Copy-Leaf, vor Rückgabe | der schreibende Leaf selbst |
| G2 ≥ 0.7 | erst zum Launch | multi-family: Judge einer fremden Familie; claude-only: Sonnet-Judge (`rolle-launch.md`) |

Kommt Copy ohne G0/G1-Beleg zurück, ist sie nicht fertig — nicht einbauen,
zurück an denselben Leaf. Details: Skill `copywriting`.

## Nur Kritik-Überlebende umsetzen

Die Fixliste ist die Liste der Befunde, die die Merge-Regel aus
`kritik-matrix.md` überlebt haben — nicht die Sammelmenge aller Leaf-Meinungen.

- **Keine neue Kritik erfinden.** Fällt dem Parent im Bau etwas auf, das nicht
  in `KRITIK-n.md` steht, geht es als Zeile an die Kritik-Phase, nicht als
  stiller Extra-Fix in den Build.
- **Den Plan nicht umwerfen.** Jede Abweichung vom Plan bekommt eine eigene
  Zeile in `STATUS.md` („Abweichung: … Grund: …“); ob `PLAN.md` einen
  Änderungsblock bekommt, entscheidet die Plan-Phase.
- `park`-Befunde (`content-park`, `ops-park`) sind kein Bau-Blocker; sie bleiben
  `FAKT-GATE`-Zeilen für den Launch.

## Re-Sweep nach Fixes (hart)

Nach jedem Fix werden **alle** betroffenen Routen erneut gesweept; die neuen
Ledger-Zeilen tragen einen Zeitstempel nach dem Fix. **Ohne frischen Sweep nach
einem Fix = nicht geprüft** — ein Code-Diff ist kein Sichtbeweis.

Jeder neue Build invalidiert alte G1-, Sweep- und Ship-QA (Run-Evidence-Kette,
`run-evidence-contract.md`); nach jedem Build läuft
`run-evidence.mjs bind-build --revision <build_revision>`.

## Kostenspur (Fertig-Kriterium `STATUS.md` aktuell)

Nach jedem Bau-Workflow läuft `/cost` (ersatzweise `/usage`); die Zahl kommt mit
Datum als eigene Zeile in `STATUS.md`:

```
| Kosten | 02.09.2026 | /cost | 6:34 min | $4,53 |
```

Ohne diese Zeile ist `STATUS.md` nicht aktuell. Grund: Betriebsregel 3 verlangt
für jede Zahl an Raphael genau eine benannte Quelle — ohne Spur gibt es sie für
Projektkosten nicht.

## Werkzeugtabelle vor dem ersten `npm i`

Reihenfolge: Bedarf → Router-Zeile aus `tool-usecase-router.md` → bei einer der
zehn Vendor-Quellen zuerst lokal `resources/components/INDEX.md`, dann den
Site-Index → Werkzeugtabelle.

Die Tabelle steht genau einmal in `client-<name>/web/art-direction.md` zwischen
`<!-- WERKZEUGTABELLE:START -->` und `<!-- WERKZEUGTABELLE:ENDE -->`; jede Zeile
nennt Bedarf, Werkzeug, Befehl, Gate und Router-Anker. **Ohne Tabelle kein
`npm i`.** Keine Dependency in `package.json` ohne Zeile:

```bash
node /root/raphael-skills/skills/eigene/web/scripts/werkzeug-gate.mjs <projekt> \
  --tabelle <pfad>/art-direction.md --profile node|static|cms
```

Genau eines der Profile `node`, `static`, `cms`. Bei eigenem TypeScript/
JavaScript zusätzlich `npx oxlint` Exit 0
(`code-qualitaets-checkliste.md`, Skill `install-anti-slop`).

## Art-Direction im Bau

Pflicht-Load zuerst: `stil-regeln.md` (Sektor-Dials §1) plus 2–3 passende Cases
aus `muster-bibliothek/INDEX.md`. Erst dann der `design`-Skill; Design-G1 ist
`node /root/raphael-skills/skills/design/scripts/detect.mjs` Exit 0 — nie
`npx impeccable detect`. Jede Section zitiert eine Regel-ID oder einen Case.
Art-Direction ohne `stil-regeln.md` + Cases ist improvisierter Geschmack.

Vor der ersten Zeile Code laufen Zwei-Pass und Signature-Element aus
`design/references/taste-kern.md` §3a — dort steht auch, wie der Sektor-Dial den
Ausschlag skaliert.

Trust-/Social-Proof-Logos laufen **nicht** über `higgsfield`: Marken-Logos als
Original beschaffen (offizielles Brand-Kit → `vectorlogo.zone`/`simpleicons.org`
→ CDN/Wikimedia), SVG vor PNG.

## Workspace-pro-Version (Bestandsseiten, bindend)

Update an einer bestehenden Site = immer neuer Workspace/Worktree von `main`.
`main` trägt nur flache Squash-Commits.

- **Gefällt Raphael** → EIN Squash-Commit auf `main` vorschlagen. Zustimmung zum
  Ergebnis ist **keine** Commit-Freigabe: Commit, Push und Deploy je nur auf
  ausdrückliche Freigabe für genau diese Aktion. Danach Workspace + Branch
  löschen.
- **Gefällt nicht** → Workspace + Branch ersatzlos löschen **und** das
  Abgelehnte als Verboten-Eintrag in Root-`DESIGN.md`/`DECISIONS.md` schreiben.
- **Raphael-Nein in derselben Session** (ein Asset, ein Motiv, ein Muster):
  sofort Route + Dateipfad + Ersatz in `DESIGN.md`/`DECISIONS.md`, Datei per
  `bilder.mjs reject` löschen, Code auf den Ersatz umstellen. Der gesperrte Pfad
  darf auf dieser Route nicht mehr vorkommen (`rg` vor Ship). Nur die Datei zu
  löschen reicht nicht.
- Historie und Archiv-Ordner sind keine Quelle: nichts aus `git log`, alten
  Plänen oder Chat-Handoffs wieder einbauen.
- Nie alte Workspaces liegen lassen, nie parallel im Root-Checkout bauen.

## Startzeile (wörtlich)

```
/web /orchestrate — Bau, client-<name>. Du bist Controller, nicht der Builder.
Der Ultracode-Session-Default genügt; kein /ultracode-Slash nötig.
Parent editiert keine CSS-/TSX-Datei und liest keine PNG-Binaries.
Starte im ersten Turn JETZT einen Dynamic Workflow. Bei Neuaufbau/Redesign zuerst
Welle 0 Fold-Duell (references/fold-duell.md): drei Richtungen, Montage, Bild an
Raphael, Welle 1 erst nach seiner Wahl. Leaves, so viele wie Pakete:
1. shot-sweep --base <dev-url> --static --states --mobile → manifest.json + PNG-Pfade
2. zwei unabhängige Kritik-Leaves auf denselben Fold/Hover-Shots (Besetzung je Profil: kritik-matrix.md)
3. eine Leaf nur für belegte Code-Ursachen (datei:zeile), Input = Shot-Pfad + CSS-Ausschnitt
4. eigener Copy-Leaf nach dem Briefing aus PLAN.md — nie der Integrator
5. fable-builder (oder opus-builder) nur als Integrator für sichtbare UI-Fixes (baut Copy unverändert ein); jedes Bau-Paket mit Qualitätsschleife (G1 → Judge-Score → ≤3 Runden)
Rückgabe an Plan: STATUS.md + KRITIK-n.md mit Shot-Pfaden, biggest_gap visuell,
FAKT-GATE geparkt. Kein Solo-Debug von wipe.css im Parent.
```
