# Screenshot-Kritik-Loop — wie Design ab jetzt entschieden wird (23.07.2026, Raphael)

**Kernregel:** Design wird NUR noch an Screenshots entschieden. Kein „muesste passen",
kein Code-Lesen als Ersatz fuer das Ansehen. Desktop zuerst (1440) — Mobile folgt als
Pflicht-Check, nicht als Design-Quelle.

**Harter Ship-Gate (seit 06.08.2026):** Kunden-PDF/A4-HTML/Folien/Ads-Statics und
jedes Premium-Web-Ship enden erst über Skill
[`visual-aaa`](/root/raphael-skills/skills/eigene/visual-aaa/SKILL.md):
Render → Self-Read → `visual-g1.py` Exit 0 → Agent `visual-kritiker` (andere Familie)
→ `visual-ship.json` valid. „Fertig“ ohne dieses Manifest ist verboten (eval
Verifikations-Vertrag). Dieser Loop hier bleibt der Web-Sweep-Ablauf; `web` bleibt
der einzige Website-Workflow-Owner. `visual-aaa` ist ausschließlich der terminale
DoneClaim-Blocker, nie Workflow-Owner oder zweite Produktionspipeline.

## Ablauf (immer diese Reihenfolge)

### 0. Wiederkehrender Health-Sweep (optional, nur für Live-Kundenseiten, per Cron)

Unterschied zum Rest dieser Datei: DAS hier läuft nicht auf expliziten Auftrag,
sondern regelmäßig im Hintergrund über einen Cron-Job (nie als versteckte
Runtime-Schleife — Cron ist einziger Zeitplan-Besitzer, siehe AGENTS.md).
Erst Gesundheit (Konsole-Fehler, 404s, Ladezeit, Mobile-Viewport), dann Ästhetik.

1. Cron ruft `shot-sweep.mjs` auf denselben Kern-Routen einer Live-Kundenseite
   auf (z. B. täglich), Output in `state/health-sweeps/<datum>/`.
2. Eine kostengünstige Vergleichs-Rolle vergleicht den neuen Sweep NUR gegen den
   Besucher-Blick-Katalog (Schritt 2 unten) und schreibt Auffälligkeiten
   in ein Ledger: `state/screenshot-ledger.md` — eine Zeile pro Beobachtung
   (Datum, Route, Befund, Screenshot-Pfad). Kein Fix, keine Bewertung, nur
   Beobachtung.
3. **3-4x-Regel:** Eine Beobachtung wird erst zum "Befund" (und landet auf der
   echten Fixliste), wenn dieselbe Auffälligkeit an derselben Stelle **3-4 Mal
   an unterschiedlichen Tagen** im Ledger auftaucht. Einmalige Glitches (CDN-
   Hickup, kaputter Screenshot) werden so herausgefiltert, bevor sie einen
   Panel-Lauf auslösen.
4. Erst wenn ein Muster bestätigt ist: normaler Ablauf ab Schritt 1 dieser
   Datei (Sweep→Selbst-ansehen→Panel→Fixliste→Fix→Re-Sweep) — der
   Health-Sweep liefert nur den Auslöser, nicht die Entscheidung.

Cron-Vorschlag (Raphael muss freigeben, nicht Teil dieser Synthese-Datei):
täglich außerhalb der Stoßzeiten, ein Job pro aktivem Kundenprojekt mit
Live-Website.

**WICHTIG:** Kein Cron wird von einer ausführenden Rolle selbst angelegt. Dauerbetrieb nur
mit Raphael-Einzelfreigabe pro Kunde + Kostenlimit.

### 1. Sweep (Spec Raphael 10.08.2026)

```bash
node /root/raphael-skills/skills/eigene/web/scripts/shot-sweep.mjs \
  --base <url> --out <dir> --routes <liste> \
  --static --states --mobile \
  --run-id <run-id> --build-revision <revision> \
  [--state-spec <projekt>/web/state-spec.json] [--hover ...] [--state-sel ...]
```

- **Kanonischer Capture-Weg ist Playwright** in diesem Skript. Chrome-CLI und `raphael-chrome` sind kein Ersatz. Ad-hoc-Playwright neben dem Standard-Skript bleibt verboten.
- **`--base` ist Pflicht** mit der echten Dev-/Live-URL. Ohne Flag: Exit 2 + Usage (Anfänger-Falle #2 in `anfaenger-pfad.md`; stiller Port-5280-Default ist entfernt).
- **Identity ist Pflicht:** `--run-id` und `--build-revision` müssen zum aktuellen `run-evidence.json` passen. Ein anonymes, fremdes oder stale Manifest ist `BLOCKED`, auch wenn alle PNGs existieren.
- **Kanonisches Ship-Profil:** `--static --states --mobile` ist eine unteilbare Pflichtkombination. `manifest.json.capture_profile` muss exakt `static=true`, `states=true`, `mobile=true` melden. `--no-interact` ist nur für einen schnellen Regression-Sweep zulässig und kann keinen Kritik-/Ship-Sweep erfüllen.
- **Sequentiell pro Seite**: Fold → State-Pass → Scroll+Klick, dann erst die nächste Route. Primär Desktop, danach dieselbe geänderte Route mobil.
- **Fold-Viewports (Audit 23.08.2026): 1440×900 Desktop UND 390×844 mobil.** Kein fullPage als Kritik-Input — fullPage höchstens als Übersichts-Anhang. Danach Viewport **1440×1500**, Scroll-Schritt **exakt 750 px** (halber Viewport). Ziel: jede Seite lückenlos abgedeckt, nicht nur top/mid/deep/full-Stichproben.
- **Stabile Screenshots:** `animations: 'disabled'`, `caret: 'hide'`, `networkidle` + Fonts abwarten (sonst leere Reveal-Sektionen), Fonts/Seite gesetzt. Wiederholbar, nicht leer, Fold 1440×900. Nach Änderung am Sweep: Screenshots testen mit `node evals/run-shot-stable-check.mjs`.
- **Zustände:** Hover, Fokus und Open/Expanded werden generisch je Target erfasst. Loading, Empty, Error und Success kommen für anwendbare Form-, Listen-, Submit- und Async-Flächen aus `web/state-spec.json` hinzu.
- **State-Matrix:** Primärschlüssel ist `Route × Viewport × Target × State`; Target ist eine stabile Target-ID oder ein semantisches Label. Ein Shot eines Controls darf nie ein zweites Control desselben Typs abdecken. Das Manifest führt getrennt `required`, `captured`, `not_applicable` und `failed`; jeder Required-Schlüssel braucht genau seinen eigenen Capture- oder einen validatorgeprüften N/A-Beleg. Freitext ist kein N/A. Erlaubte Gründe sind nur `static-page`, `no-form` und `no-async-data`.
- **Deterministische Terminalzustände:** Loading wird bei pausiertem Request nach der Aktion und vor der Antwort fotografiert; danach werden Success und Error getrennt freigegeben, asserted und fotografiert. Nach jedem Szenario Route und Ausgangszustand zurücksetzen. Setup-Fehler landen in `failed`, nie als leerer Shot oder PASS.
- **A11y je Target und Übergang:** Jeder State-Beleg nennt echte Tastatursequenz, erwarteten Fokus, Rolle + Accessible Name, relevantes ARIA-/Live-Region-Ergebnis, Escape-/Recovery-Pfad und einen Axe-Receipt auf dem übergegangenen DOM. Ein korrekt aussehendes Menü mit falschem Fokus oder `aria-expanded` bleibt rot.
- **Komplexe Geschäftslogik:** Braucht ein Zustand Schleifen, mehrstufige Datenvorbereitung oder Buchungslogik, referenziert die State-Spec einen vorhandenen projektspezifischen Playwright-Test und übernimmt dessen Screenshot- und A11y-Receipt. Keine zweite E2E-Sprache im Sweep erfinden.
- **Mobile-Pflicht:** `--mobile` über ALLE geänderten Routen, nicht nur die Startseite; die State-Matrix gilt auch mobil.
- **Interaktiv-Pass ist Pflicht** (Default an): Header-Nav wird gehovert (Shot je Eintrag), alles Klickbare (Buttons, Accordions, Tabs, `aria-expanded`) wird geklickt mit Shot und zurückgetoggelt.
- **`--static` für Kritik-Sweeps Pflicht**: erzwingt Reduced Motion + tötet CSS-Animationen + macht `data-reveal` sichtbar — keine leeren Reveal-Flächen, deterministische Shots.
- Das Skript schreibt `manifest.json` im Schema `web/shot-sweep/v2` — NUR dieses Manifest wird an die Kritik-Rollen gegeben.

### 1a. Web-G1 bindet Basis, Profil und Identität

```bash
node /root/raphael-skills/skills/eigene/web/scripts/g1-gate.mjs \
  --base <url> --routes <liste> --src <projekt-root> --build <build-root> \
  --out <run-out>/g1 --run-id <run-id> --build-revision <revision>
```

`--base`, `--run-id` und `--build-revision` sind explizite Pflichtfelder; fehlend
bedeutet Aufruffehler/Exit 2 vor Browserstart. G1 ruft denselben Sweep mit
`--static --states --mobile` auf und lehnt ein falsches Capture-Profil,
Hover-only-Evidence, fehlende Matrixzeilen oder `state_matrix.failed` ab. Der
Bericht `web/g1-report/v2`, das Sweep-Manifest und `run-evidence.json` müssen
Basis-URL, Run-ID und Build-Revision identisch binden.

### 1b. Motion erst nach statischem und funktionalem PASS

Motion-Polish startet erst, wenn der statische Basisstand und die funktionale
Task-/State-QA auf derselben Revision PASS sind. Danach braucht Motion zusätzlich
reale Eingabe- und Timing-Belege, einen Reduced-Motion-Pass sowie Lifecycle-Belege
für Fresh Load, Hard Reload, Back/Forward, Resize und Unterbrechung mit Recovery.
Der statische Sweep bleibt Pflicht; Motion kann kein rotes Visual-, Functional-
oder Regression-Gate ausgleichen.

### 2. Selbst ansehen (Pflicht für die Kritik-Rolle)
Wer urteilt, öffnet JEDES ihm zugeteilte PNG. Builder-Prosa ersetzt das nicht.
In der Zwei-Session ist das das Kritik-Leaf (`visual-kritiker` / `kimi-recherche`),
nicht der Executor-Parent. Parent führt nur das Shot-Ledger
(`pfad | viewport | gelesen | verdict`) und zählt Zeilen gegen `manifest.json`.
PNG-Binaries in die Hauptsession = Fail. Befundliste:
`befund: <shot-datei> | <was falsch ist> | <vermutete Ursache>`.
Ohne Leaf-Read kein Panel-PASS.

**Besucher-Blick-Katalog (pro Shot explizit durchgehen, nicht nur "draufschauen"):**
1. **Koepfe/Gesichter angeschnitten?** Jedes Bild mit Personen: Ist irgendein Kopf am
   Rahmen abgeschnitten oder klebt am Rand? → immer HOCH, immer fixen (object-position
   auf Kopfhoehe, nicht Bildmitte). Diese Frage pro Personen-Bild einzeln beantworten.
2. Seltsamer Crop: Nur Ruecken/Haare/Koerperteile ohne erkennbares Motiv?
3. Text lesbar? (Kontrast auf Foto, Scrim vorhanden, nichts abgeschnitten)
4. Layout kaputt? (Ueberlappungen, Elemente ausserhalb, horizontales Scrollen auf Mobile)
5. Leere/kaputte Bilder, sichtbare Platzhalter?
6. Wuerde ein Besucher lachen oder stutzen? Wenn ja → Befund, egal ob "technisch korrekt".

Regel dazu (Raphael, 24.07.2026): Diese Dinge muessen von ALLEINE auffallen — er will
sie nicht ansagen muessen. Ein Sweep ohne diesen Katalog gilt als nicht angesehen.

### 3. Kritik-Panel (dieselbe Seite, zwei Familien + Gegencheck)

Besetzung kommt aus `agent-roster.md`. **Nie Haiku.** Builder der Seite ist `opus-builder` — dann ist A = Grok und B **nicht** Opus (gleiche Familie). B = `kimi-recherche`. Sol prüft Code, nicht die Shots. Nie A=B, nie dieselbe Familie wie der Builder.

| Rolle | Fähigkeit | Liest | Auftrag |
|---|---|---|---|
| Code-Kritik („Zoll") | `sol-pruefer` | Befundliste + Source als Textausschnitt (keine Bildpfade) | „Verifiziere pro Befund die Code-Ursache (datei:zeile) oder widerlege ihn. Keine Design-Meinung ohne Code-Beleg." |
| Visuelle Kritik A | Grok / `visual-kritiker` | manifest.json + Shots **dieser einen Seite** | „Kritisiere Hierarchie, Spacing, Typo, Bildschnitt, CTA-Fuehrung pro Shot. Befund + Shot-Datei als Beleg. `biggest_gap` einer Vorschau ist visuell — nie Bewertungszahl, Custom-Domain/Vercel oder SLA-Stunden (das ist FAKT-GATE / fakt-park)." |
| Visuelle Kritik B | `kimi-recherche` (andere Familie als A und als Builder) | dieselben Shots wie A | „Zweite, unabhaengige Sicht. Befund + Shot-Datei als Beleg. Dieselbe biggest_gap-Regel: Fakten-Nits parken, Bild zuerst." |

**Gegencheck (Pflicht, nicht optional):** Nach dem ersten Pass bekommt A die Befundliste von B, B die von A. Jeder Satz darf nur `bestätigt` oder `widerlegt` + ein Satz Beleg sein. Kein neuer Katalog. Fixliste = Befunde, die (a) beide unabhängig fanden oder (b) den Gegencheck überleben.

Judge-Prompt-Form: IMMER „pass/fail + eingefuegter Beweis", NIE eine Aufforderung,
internes Denken offenzulegen. Jeder Befund ohne Shot-Beleg gilt als nicht gefunden.

### 3a. Kritik-Flotte (Matrix, nicht ad-hoc)

Spawn, Familien, Überlappung und Merge stehen nur in
`kritik-matrix.md`. Hier nicht noch eine zweite Liste. Maßstäbe bleiben
`design` (taste-kern, Detektoren, scan-ai-slop) plus web/seo — im Leaf-Prompt
die **design-Pfade** nennen, nicht die Einzel-Skills extra laden.

### 3b. Blind-A/B vs. Weltklasse-Referenz (Pflicht bei Ship / Premium / Gauntlet)

Das Panel allein bewertet nur die eigene Seite. Self-Preference-Bias bleibt.
Deshalb zusaetzlich (frische Session, andere Modellfamilie als Builder):

1. **Kandidat-Shots** aus dem aktuellen Sweep (First Fold + 1–2 Key-Sections).
2. **1–2 Referenz-Shots** derselben Seitentyp-Klasse (Awwwards/Land-book-Niveau
   oder Raphael-gewaehlte Best-in-Class). Lizenz: nur intern vergleichen, nicht
   klonen — `web-clone-playbook.md` Iron Rule bleibt.
3. **Paarweise Runs (hart):** Jeder Richter-Lauf bewertet **genau ein Paar**
   (ein Kandidat-Shot vs. ein Referenz-Shot als A/B). Mehrere Shots = mehrere
   getrennte Runs, kein Mehrbild-Dump in einem Prompt.
4. Dateien **anonymisieren** (`shot-a.png`, `shot-b.png`). Labels „unsere
   Seite“ / Markennamen entfernen.
4a. **Doppelmessung statt Positions-Wechsel (hart).** Jedes Paar wird
   **zweimal** bewertet: einmal Kandidat als A, einmal als B — beide Laeufe
   mit nicht zusammenhaengenden IDs, damit der Richter das Paar nicht
   wiedererkennt. Auswertung: **nur wenn beide Laeufe dieselbe Seite
   bevorzugen, gilt der Befund.** Widerspruch = `kein Befund
   (Positions-Bias)`, nie ein Sieg und nie eine Niederlage.
   *Warum hart:* „in der Haelfte der Laeufe tauschen“ verteilt die Position
   nur — ohne Gegenprobe je Paar ist ein Urteilswechsel nicht von
   Positions-Bias unterscheidbar. Belegt am 01.09.2026: 3 von 6 Paarungen
   flippten die Seite zwischen zwei Runden, das Ergebnis war unbrauchbar.
4b. **Viewport-Gleichheit vor der Bewertung pruefen (hart).** Nach dem
   Capture die **echten Bildbreiten** vergleichen (`identify -format '%w'`
   oder PNG-IHDR). Weicht eine ab, ist der Vergleich ungueltig — neu
   aufnehmen, nicht bewerten.
   *Fallstrick:* Off-Canvas-Menue-Wrapper (z. B. `.ocm-effect-wrap`) blaehen
   `document.body.scrollWidth` auf, obwohl `window.innerWidth` stimmt.
   Playwright rendert `fullPage` nach `scrollWidth` und liefert dann ein
   ueberbreites Bild. Fix: **`fullPage: true` UND `clip: {x:0,y:0,
   width:<viewport>, height:H}` zusammen** — `clip` allein greift nur im
   sichtbaren Viewport und liefert ein 900px hohes Bild; `fullPage` allein
   uebernimmt die falsche Breite. Nur beides zusammen ergibt volle Hoehe bei
   fester Breite. `H` erst **nach** dem Scroll-Durchlauf aus
   `Math.max(documentElement.scrollHeight, body.scrollHeight)` lesen, sonst
   steht das Layout noch nicht. Belegt: Referenz mit innerW 1440, bodySW 2723.
5. Richter-Prompt (nur pass/fail-Form):
   - Pro Achse aus `agentur-rubrik.md` (Visual / Usability / Creativity / Content-Trust):
     `besser A | besser B | unentschieden` + **ein** Satz Beleg am Bild.
     Content-Trust im Shot = wirkt der Proof visuell glaubwürdig (echte Fotos,
     Namen sichtbar, keine Stock-Gesichter). Nicht: ist die Bewertungszahl 50 oder 60.
   - Am Ende: `GEWINNER: A|B|unentschieden` · **genau EINE** groesste Luecke des
     Verlierers · `BELEG: <dateiname>`.
   - Kein „erklaere deinen Gedankengang“.
6. Kandidat verliert klar auf Visual oder Usability → groesste Luecke auf die
   Fixliste (P0), nicht „Geschmackssache“.
7. Optional Gauntlet: wiederholen bis Zugewinn klein oder max. Kritik-Zyklen
   (unten) erreicht — Messlatte bleibt die Referenz, nicht „ok fuer KI“.

Rollen-Mapping: `agent-roster.md` → Blind-A/B-Richter.

### 4. Verifizierte Fixliste
Die aktuelle Koordination merged: nur Befunde, die (a) von >=2 Panel-Mitgliedern ODER
(b) vom eigenen Auge + 1 Panel-Mitglied getragen werden, kommen auf die Fixliste.
Blind-A/B-Luecken (Kandidat verliert) zaehlen wie Panel-Mehrheit.
Code-Befunde ohne sichtbaren Effekt kommen auf eine getrennte Hygiene-Liste.

**Vorschau-Triage (hart, 01.09.2026):** Jeden Fixlisten-Kandidaten durch
`node scripts/preview-befund-klasse.mjs "<befund>"` jagen. `preview: park`
(`fakt-park`, `ops-park`) gehört auf den FAKT-GATE-Parkplatz, nicht auf die
visuelle Fixliste und nie als `biggest_gap`. `preview: block` bleibt der
Zyklus. `fake-proof` bleibt Launch-Sperre — Proof wird nicht erfunden.

**Belegter Lauf (27.07.2026, Beweis-Build).** Das Tor hatte die Seite freigegeben:
Lighthouse 98/100/100/100, 0 axe-Verstoesse, 0 Craft-Blocker, 0 Slop-Blocker.
Das Panel fand darauf vier Dinge, die kein Exit-Code sieht:

| Befund | Schwere | vom eigenen Auge bestaetigt |
|---|---|---|
| kein einziges Foto auf einer Handwerker-Seite | BLOCK | ja |
| Zitat schwebt ohne Anker in ~280px Leerraum | WARN | ja |
| Footer ohne Impressum/Datenschutz | WARN | ja |
| kein Signature-Moment, sauber aber austauschbar | INFO | ja |

Das ist der Grund, warum Schritt 3 existiert. Ein gruenes Tor heisst „nichts ist
kaputt", nicht „das ist eine 10.000-Euro-Seite". Die BLOCK-Meldung „kein Bild"
kann kein Skript stellen: die Merkmale M24 (Bildwelt) und M25 (Proof) sind in
`agentur-merkmale.md` ausdruecklich als INFO gefuehrt, weil sie nur ein Auge
beurteilen kann. Genau dort schlug das Panel zu.

### 5. Fix (Worker nach Doktrin)
Die Implementierungs-Rolle erhält: Fixliste MIT Shot-Belegen
(Dateipfade der relevanten PNGs pro Befund), betroffene Dateien, Verify-Kommandos
(Build/TS + Re-Sweep), Screenshot-Pflicht.

### 6. Re-Sweep + Vergleich
Gleiche Routes, gleiche Spec, NEUES out-Verzeichnis. Die aktuelle Koordination vergleicht
vorher/nachher pro Befund Shot fuer Shot. Nicht behoben → zurueck auf die Liste mit
Kommentar. Dann ALLE Seiten erneut pruefen (Nebenwirkungen), nicht nur die gefixte.

### 7. Abschluss + Abbruchkriterium
„Fertig" heisst: Fixliste leer ODER jeder Restpunkt hat einen begruendeten
„bewusst so"-Eintrag. Abschluss-Report listet pro Befund: vorher-Shot, nachher-Shot,
Status. Screenshots sind der Beweis, nicht Prosa.

Abschluss-Checkliste (Pflichtzeilen im Report):

- [ ] `web/shot-sweep/v2` meldet `static=true`, `states=true`, `mobile=true` sowie aktuelle Run-ID + Build-Revision — EVIDENCE: Manifest-Pfad
- [ ] State-Matrix `Route × Viewport × Target × State` vollständig: jeder Required-Eintrag captured oder validatorgeprüft N/A, `failed=[]` — EVIDENCE: Manifest-Schlüssel
- [ ] Target-lokale A11y je Übergang gelesen: Tastatur, Fokus, Rolle/Accessible Name, ARIA/Live-Region, Escape/Recovery, Axe — EVIDENCE: Manifest-/Receipt-Pfade
- [ ] Fold-Shots 1440×900 UND 390×844 fuer alle geaenderten Routen vorhanden — EVIDENCE: Pfade
- [ ] `web/g1-report/v2` bindet dieselbe Basis-URL, Run-ID und Build-Revision — EVIDENCE: Berichtspfad
- [ ] Falls Motion geändert: statischer + funktionaler PASS lag vorher vor; Reduced Motion und Lifecycle erneut geprüft — EVIDENCE: Receipt-Pfade

**Max. 3 Zyklen** Panel/Blind → Fix → Re-Sweep. Danach keine Runde 4:
- Panel-Divergenz &gt;20 % der Befunde (keine 2er-Mehrheit) → Eskalation Cockpit.
- Blind-A/B weiter klar verloren und kein messbarer Shot-Fortschritt → Raphael
  oder Richtungswechsel (Art Direction), nicht weiteres Pixel-Schleifen.


## Verbote (hart)
- Kein fullPage-Screenshot, kein captureBeyondViewport (R20-Schein-Funde = Fullpage-Artefakte:
  fixed Elemente schweben mitten im Inhalt, leere Reveal-Flaechen).
- Kein Panel ohne vorheriges eigenes Ansehen der Shots.
- Kein „fixed" ohne Nachher-Shot, der das belegt.
- Keine Design-Entscheidung aus dem Code heraus (z.B. „sticky ist gesetzt" statt
  „auf dem Shot klebt der Tag sichtbar").
