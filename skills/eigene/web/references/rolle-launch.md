# Rolle: Launch

Einstiegs-Ebene für die **Launch**-Phase — der Übergang von „geile
Kunden-Vorschau“ zu „öffentlich live“. Launch ist keine vierte Chat-Session,
sondern die Endstufe der Bau-Session (`rolle-bau.md`): dieselben Chips,
dieselben Truth-Dateien, aber alle harten Gates zählen jetzt.

Detail-Ebene: `qa-faecher.md` (Fächer 1–6), `agentur-rubrik.md` (25 Merkmale),
`run-evidence-contract.md`, `vercel-git-deploy.md`,
`domain-safe-browsing-checkliste.md`, `security-audit-playbook.md`.

## Der Unterschied zur Vorschau in einem Satz

Die **Vorschau** entscheidet das Bild: Blocker sind nur Ablauf, Sitemap, Idee,
Design; Fach 2 visuell muss sitzen, der Rest darf offen sein.
Der **Launch** entscheidet die Fakten: alles unten ist hart.

## Launch-Gates (alle grün, sonst kein Launch)

### 1. Lighthouse / axe = 0

- **axe = 0 Fehler** (QA Fach 3, hart). Farbkontrast AA, Fokus-Reihenfolge,
  Alt-Texte, Labels. Target-lokal je `Route × Viewport × Target × State`, nicht
  als Seitenpauschale: echte Tastatursequenz, erwarteter und tatsächlicher
  Fokus, Rolle + Accessible Name, ARIA-/Live-Region, Escape-Pfad, Axe auf dem
  DOM **nach** dem Übergang.
- **Lighthouse = 0 Fehler** (QA Fach 4, hart): Performance, Best-Practices, SEO;
  dazu Link-Check und HTML-validate.
- „Fertig“ ist hier eine Environment-Tatsache, keine Einschätzung.
- WCAG bleibt AA. „AAA“ in `agentur-rubrik.md` ist das Agentur-Qualitätsraster,
  nicht WCAG AAA.

### 2. Copy-G2 ≥ 0.7

Jeder Ship-Copy-Block wird sektionsweise gegen `evals/rubrics/web.md` gejudged,
Schwelle **0.7**. Reihenfolge der Anti-Slop-Sequenz ist bindend: zuerst `design`
(`detect.mjs` Exit 0 **und** `scan-ai-slop.mjs` mit `--rules=…/rules.de.mjs` bei
deutschem Text), danach `copywriting` G1→G2. Nie `npx impeccable detect`.

In der Vorschau ist Working-Copy erlaubt; beim Launch nicht mehr.

### 3. Proof-Wahrheit (hart)

Jede sichtbare Zahl, jedes Logo, jedes Testimonial ist in `PROOF.md` bzw. im
Dossier belegt. **Erfundener Proof darf nie als echt rausgehen** — auch nicht
mit „später belegen“. Testimonials: Video/Screenshot plus Identität. Keine
KI-Personen in Beweis-Kontexten ohne Raphaels Freigabe. Partner-Logos nur
freigegeben; Marken-Logos als Original, nie generiert.

### 4. FAKT-GATE-Liste abarbeiten

Alles, was Vorschau und Kritik als `content-park` / `ops-park` geparkt haben
(`preview-befund-klasse.mjs`), steht als `FAKT-GATE`-Zeile in `PLAN.md` bzw.
`STATUS.md`. Vor dem Launch wird jede Zeile **einzeln aufgelöst**: echte Zahl
eingesetzt oder Aussage gestrichen. Eine unklare echte Zahl (50 vs 60 Reviews,
24 vs 28 Stunden) wird verifiziert, nicht gerundet und nicht erfunden. Offene
`FAKT-GATE`-Zeilen = kein Launch.

### 5. Domain / DNS

- Custom-Domain verbunden, DNS aufgelöst, HTTPS gültig, Canonical korrekt,
  Weiterleitungen sauber. In der Vorschau ist das Ops und kein Design-Gate —
  beim Launch ist es Pflicht.
- **Junge Domain + Formular** = Safe-Browsing-Risiko →
  `domain-safe-browsing-checkliste.md` abarbeiten.
- Impressum und Datenschutz erreichbar und vollständig (DE); 404-Route
  gebrandet, Status 404, `noindex`, klarer Rückweg.
- Consent vor nicht-essentiellem Tracking, wo nötig
  (`security-audit-playbook.md`; OWASP bei Formularen/Consent).

### 6. QA-Fächer 1–6 grün

Kein Launch, solange ein G1-Fach rot ist. Findings nach
`client-<name>/wiki/qa-<datum>.md`.

| Fach | Inhalt |
|---|---|
| 1 Conversion | eine Aktion, CTA, Formular-Reihenfolge — **Kontaktdaten zuletzt**, Drop-off pro Slide gemessen; Thank-You-Regeln; Testimonial-Check |
| 2 Design | `design/scripts/detect.mjs` Exit 0 + `scan-ai-slop.mjs`; Grafik-Assets-Gate |
| 3 A11y | axe = 0, Zustände target-lokal belegt |
| 4 Technik | Lighthouse = 0, Link-Check, HTML-validate, Meta/OG/Schema, `werkzeug-gate.mjs` Exit 0, bei Custom-TS/JS `npx oxlint` Exit 0 |
| 5 SEO | je indexierbarer Route unique title ≤60, meta ≤160, clean slug, genau eine H1, Canonical; crawlbares HTML (SSR/SSG/Prerender), keine leere Client-Shell; Kontexttiefe-Regel |
| 6 Trust | Impressum/Datenschutz/404, Proof-Echtheit, Consent |

### 7. `agentur-rubrik.md` 1–25

Alle 25 Merkmale erfüllt oder als benannte Ausnahme dokumentiert. Gewichtung:
Design/Visual 40 %, Usability/Conversion 30 %, Creativity 15 %, Content/Trust+SEO
15 %. Premium/Ship zusätzlich Blind-A/B (`screenshot-kritik-loop.md` 3b) gegen
eine Weltklasse-Referenz: kanonische Achsen **Visual · Usability · Creativity ·
Content-Trust**, jedes Paar **zweimal** bewertet (Kandidat einmal A, einmal B,
nicht zusammenhängende IDs), widersprüchliche Läufe = „kein Befund
(Positions-Bias)“, nie ein Sieg. Vor jeder Bewertung: echte Bildbreiten beider
Shots gleich (`identify -format '%w'`), sonst neu aufnehmen.

Bei Website-Referenz-Nachbau: Lizenz-Check aus `web-clone-playbook.md`
dokumentiert vor dem Launch. GitHub öffentlich ≠ frei nutzbar.

Alle Shots, die in diese Bewertung eingehen, stammen aus einem über **HTTP**
ausgelieferten Build, nie aus `file://`, und je eine HTML-, CSS- und Bild-URL
war vorab mit **HTTP 200** belegt (Vertrag in `rolle-kritik.md`). Ein Urteil
über Shots eines halb geladenen Builds zählt nicht.

Konnte für einen Prüfschritt keine fremde Modellfamilie erreicht werden, steht
die Sichtprüfung ausdrücklich als **Eigenprüfung** im Protokoll und der
fehlende Fremdblick als offener Punkt in `DECISIONS.md` — Raphael entscheidet,
ob der Launch trotzdem geht. Still auf die Builderfamilie umgeleitete Kritik
ist `BLOCKED`, nie ein PASS.

### 8. Run-Evidence-Bindung (fail-closed)

`<run-out>/run-evidence.json` ist der einzige run-isolierte Completion-Index.
Er bindet die Kette `truth` → optionaler `plan` → `design` → Build →
`web/shot-sweep/v2` → `web/g1-report/v2` → `visual-aaa/ship/v2` an genau einen
Lauf. Das Receipt ist kein Controller und kein Fortschritts-Tracker.

1. `create` friert `truth` und `design` mit aktuellem SHA-256 ein. Nur wenn die
   Lane einen Website-Plan nennt, sind `plan`, dessen v3-PASS-Receipt und die
   aktuellen Hashes zusätzlich Pflicht; sonst bleiben `plan.required=false` und
   `plan.path=null` zulässig.
2. Nach **jedem** Build `bind-build --revision <build_revision>`. Der neue Build
   setzt alte G1-, Sweep- und Ship-QA auf `null`.
3. `attach` für Plan (falls Pflicht), Shot, G1 und Ship. Jede `run_id` gleich der
   Root-`run_id`, jede `build_revision` gleich `target.revision`, jede
   `contracts[].sha256` gleich dem aktuellen Contract-SHA256, jeder
   Evidence-Hash gleich der aktuellen Receipt-Datei.
4. Completion/DoneClaim erst bei Exit 0 und `RUN_EVIDENCE=PASS`:

```bash
node /root/raphael-skills/skills/eigene/web/scripts/run-evidence.mjs \
  validate --out <run-out> --ready
```

Misch-Runs, Hash-Drift, stale Revisionen, partielles/unknown JSON sowie
`visual-aaa/ship/v1` sind `BLOCKED`; v1 bleibt nur historische Lesbarkeit. Nie
auf einen älteren PASS zurückfallen. Details: `run-evidence-contract.md`.

`visual-aaa` ist das terminale Pixel-/DoneClaim-Gate (G1 Exit 0,
`visual-kritiker` pass HIGH, gültige `visual-ship.json`) — kein zweiter
Workflow-Owner. Ein DoneClaim ohne Manifest ist verboten.

### 9. Raphaels Signatur + Deploy-Egress-Gate

**Nie autonomer Production-Deploy.** Der Launch braucht

- Raphaels ausdrückliche Signatur für genau diese Aktion — Zustimmung zum
  Ergebnis ist keine Deploy-Freigabe, und
- das deterministische Bash-Egress-Gate (Domain-Whitelist, Ziel-Env) plus
  `git commit -S` in die review-inbox.

Git für Kunden-Sites: `vercel-git-deploy.md`. `origin` ist die Org, `personal`
der private Spiegel; nach `main` auf `origin` läuft
`/root/tools/git-personal-mirror.sh`. Preview über Feature-Branch, Production
nur nach Signatur.

Vor Ship zusätzlich: gesperrte Pfade aus `DESIGN.md`/`DECISIONS.md` kommen auf
der Route nicht mehr vor (`rg` prüfen).

## Nach dem Launch

`cro-learn` — nur echte Analytics (G4: CVR, Scroll, Bounce). Kein Learning aus
Vermutungen. Ergebnis nach `client-<name>/web/cro-<datum>.md`; es korrigiert die
Rubriken.
