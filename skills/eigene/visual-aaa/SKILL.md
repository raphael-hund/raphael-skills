---
name: visual-aaa
version: 1.2.0
description: >
  Visuelle Abnahme von PDF-Seiten, Folien, HTML-A4, Ads-Statics und Websites.
  Prüft tatsächlich gerenderte Ansichten gegen Auftrag und Referenz. Für Web
  bestimmt der Web-Owner Umfang und nötige Nachweise; dieser Skill liefert
  die vertiefte Bildprüfung bei entsprechender Anforderung. Trigger: "visuell
  prüfen", "Screenshot-Check", "PDF vor Auslieferung", "visual-aaa".
class: E
scope: agency
sensitivity: internal
source: >
  Destilliert aus Session-Autopsie fc17bade (AlpenEnergie Offerte v11–v14,
  2026-08-06): wiederholte Fail-Klassen (Köpfe/Personen abgeschnitten,
  harter Schwarz-Block statt Gradient, Blur/Spiegel-Pfusch, abgeschnittener
  CTA-Text, „fertig“ ohne Self-Read). Verankert Memories screenshot-pflicht,
  visuelle-qa-screenshot-subagent, koepfe-nie-anschneiden + web/screenshot-
  kritik-loop + orchestrate-gauntlet + eval Verifikations-Vertrag.
loads:
  - references/fail-katalog.md
  - references/kritiker-kontrakt.md
  - references/ship-manifest.md
requires_skills: [eval@^0]
completion_criteria:
  - "Die beauftragten Ansichten wurden tatsächlich geöffnet und gegen die aktuelle Referenz geprüft; fehlender Bildzugriff ist BLOCKED"
  - "Bei Web bestimmt /root/raphael-skills/skills/eigene/_archiv/web-1.6.0-bis-2026-09-06/references/qa-faecher.md die anwendbaren Nachweise; Bilder belegen keine Funktion"
  - "Für die vollständige Abnahme von PDF/Ads: Render, Self-Read, Pixel-G1 und unabhängige Kritik sind dokumentiert"
  - "Ein angefordertes Ship-Manifest validiert im aktuellen Vertrag; Fehler, fremde Revisionen und ungeprüfte Pflichtansichten ergeben kein PASS"
  - "Nach Änderungen werden betroffene Ansichten und bekannte gemeinsame Verbraucher erneut geprüft; subjektive Abnahme bleibt beim Nutzer"

---

# visual-aaa — visuelle Abnahme

## Zweck (1 Satz)

Visuelle Arbeit endet erst, wenn Pixel-Belege und ein fremder Kritiker grün
sind — nie, wenn ein Worker „sieht gut aus“ sagt.

## Rolle im Workflow (hart)

`visual-aaa` ist ausschließlich der **terminale DoneClaim-Gate**, nie
Workflow-Owner, Planer, Builder oder zweite Capture-Pipeline. Der jeweilige
Host-Skill besitzt Auftrag, Scope und Produktion; bei Websites bleibt `web` der
einzige Workflow-Owner und `shot-sweep.mjs` der Capture-Kanon. `visual-aaa`
prüft nur die frischen Artefakte und Receipts dieses Owners. Ein AAA-PASS kann
weder einen roten funktionalen Flow noch eine rote Regression überstimmen.

## Wann dieser Skill greift

| Deliverable | Pflicht? |
|---|---|
| Kunden-PDF / Offerte / Firmenvorstellung / Pitch-Deck | **immer** |
| Website mit vertiefter visueller Abnahme | nach Web-Auftrag und QA-Auswahl |
| Ads-Statics / Creatives | **immer** |
| Interne Notiz-Skizze / Wireframe | nein (SOLO ok) |

Eine ausdrückliche AAA-Abnahme verlangt eine unabhängige Bildprüfung. Die
benötigten Rollen und Werkzeuge folgen dem tatsächlichen Hostvertrag.

## Web-Aufträge

Web bleibt der Workflow-Owner. Maßgeblich sind dessen
`/root/raphael-skills/skills/eigene/_archiv/web-1.6.0-bis-2026-09-06/references/qa-faecher.md` und
`/root/raphael-skills/skills/eigene/_archiv/web-1.6.0-bis-2026-09-06/references/screenshot-kritik-loop.md`:

1. Vorhandene aktuelle Bilder der betroffenen Ansichten verwenden. Neue Bilder
   nur bei fehlendem oder veraltetem Beleg; kein zweiter vollständiger Sweep.
2. Referenz und Ergebnis wirklich ansehen. Hierarchie, Typografie, Bildschnitt,
   Konsistenz und beauftragte Viewports beurteilen. FullPage dient der Übersicht,
   Detailurteile brauchen eine lesbare Ansicht oder einen Crop.
3. Konkrete Abweichung mit Datei/Region und Bedeutung melden. Ein technischer
   Bilddetektor ist eine Heuristik, keine automatische Geschmacksentscheidung.
4. Nach einem Fix die betroffene Fläche und gemeinsame Verbraucher prüfen.
   Funktion, Netzwerk, Datenwirkung und Reduced Motion haben eigene Nachweise.

Keine universelle Hover-/Loading-/Mobile-Quote: Zustände werden als konkrete
`route|viewport|target|state`-Anforderungen vereinbart. `--static` kennzeichnet
stabilisierte Vergleichsbilder und beweist kein natürliches Laufzeitverhalten.
Wenn ein Ship-Receipt verlangt ist, den bestehenden Writer nach
`references/ship-manifest.md` verwenden. Alle Belege binden denselben Run,
dieselbe Revision und Basis. Ein `FAIL`, `BLOCKED` oder fehlender Pflichtbeleg
kann dadurch nicht zu Ready werden.

Der folgende vollständige Renderablauf gilt für PDF, Folien und Ads-Statics;
Web übernimmt daraus nur die benötigte Bildprüfung und gegebenenfalls den
Ship-Writer.

## Vollständige Abnahme für PDF, Folien und Ads

### 1. Messlatte + Scope

- Datei `visual-lattee.md` im Arbeitsordner: was gilt als gut (Referenz-Shots,
  Kunden-CI, Randregeln, verbotene Tricks).
- Liste der Seiten/Views: `pages = [01-cover, …]`.

### 2. Render (G0)

Für A4-HTML:

```bash
node /root/raphael-skills/skills/eigene/visual-aaa/scripts/render-a4-html.mjs \
  --dir <seiten-ordner> \
  --out <out-dir>/render \
  --pattern '*.html'
```

Für PDF: `pdftoppm -png -r 144 <pdf> <out-dir>/render/page`.
**Exit-Code des Renders muss 0 sein.** Leere/0-Byte-PNGs = FAIL.

### 3. Self-Read (nicht delegierbar fürs DoneClaim)

Die ausführende Rolle öffnet **jedes** PNG mit dem Bildlese-Werkzeug (`Read`)
und schreibt `befunde.md`:

```
befund: <datei> | <was falsch> | <vermutete Ursache>
```

Katalog (jedes Bild, jede Frage beantworten):

1. Personen/Köpfe angeschnitten oder am Rand?
2. Harter Schwarz-/Farbblock statt weichem Verlauf?
3. Blur-/Spiegel-/Stretch-Pfusch sichtbar?
4. Text abgeschnitten, CTA unvollständig, Logo kollidiert?
5. Safe-Margin (~40–48 px A4 @794 CSS / ~5 % Kante) verletzt?
6. Würde Raphael fluchen? → Befund, egal ob „technisch korrekt“.

Ohne Self-Read zählt kein Critic und kein Ship.

### 4. G1 deterministisch (ohne LLM)

```bash
python3 /root/raphael-skills/skills/eigene/visual-aaa/scripts/visual-g1.py \
  <out-dir>/render \
  --json <out-dir>/g1-report.json
```

Exit **0** = grün. Exit **1** = rot (Findings im JSON + stdout).
**Kein Critic und kein „fertig“, solange Exit ≠ 0.**

Was G1 prüft (siehe `scripts/visual-g1.py`):

| Check-ID | Fail-Klasse (aus Autopsie) |
|---|---|
| `empty-or-tiny` | 0-Byte / zu kleines PNG |
| `hard-black-slab` | langer fast-schwarzer Streifen unten ohne weichen Verlauf |
| `blur-mirror-band` | symmetrischer Blur-/Spiegel-Streifen am Bildrand |
| `edge-content-crush` | hoher Kontrast-Inhalt klebt an der äußeren Kante |
| `bottom-text-clip-risk` | helle/rote UI-Fläche endet abrupt am unteren Rahmen |
| `low-variance-dead-zone` | große tote Einfarb-Fläche, die wie abgeschnitten wirkt |

### 5. Unabhängige Bildprüfung

Ein frischer Prüfer sieht die tatsächlichen Bilder und die Akzeptanzkriterien.
Modell und Bildzugriff folgen dem aktuellen Host-/Nutzervertrag; historische
Providerfehler sind keine dauerhaften Modelleigenschaften. Bei fehlendem
Bildzugriff meldet der Owner `BLOCKED`. Eine andere Instanz ist keine Garantie
für ein anderes Modell. Nachweise verwenden Dateipfade und bei Bedarf Crops.

Prompt-Kern: `references/kritiker-kontrakt.md`. Format **nur**:

```
verdict: pass | fail
biggest_gap: <genau EIN Satz oder "none">
beleg: <was im PNG gesehen, Dateiname + Region>
confidence: HIGH | MED | LOW
```

- `fail` → Builder bekommt **nur** `biggest_gap`, fixt, Re-Render **aller**
  betroffenen Seiten, Re-G1, Re-Critic.
- Max **5** Critic-Runden pro Seite, dann Eskalation an Raphael mit Belegen.
- Der unabhängige Prüfer hat nicht denselben Build-Kontext.

### 6. Ship-Manifest

```bash
python3 /root/raphael-skills/skills/eigene/visual-aaa/scripts/write-ship-manifest.py \
  --schema visual-aaa/ship/v2 \
  --run-id <run-id> --build-revision <revision> \
  --out <out-dir>/visual-ship.json \
  --render-dir <out-dir>/render \
  --g1 <out-dir>/g1-report.json \
  --critics <out-dir>/critics.json \
  --self-read true
```

Ship nur wenn `visual-ship.json` im Schema `visual-aaa/ship/v2` valid und
`ok: true` ist, seine `run_id`/`build_revision` zu Web-G1, Sweep und
`run-evidence.json` passen und `scripts/validate-ship-manifest.py` Exit 0 liefert.
`visual-aaa/ship/v1`, unbekannte Schemas oder stale Identität bleiben Historie,
nie aktueller DoneClaim-Beleg.

## Verbote

- „Fertig“ melden ohne `visual-ship.json`.
- Critic auf Builder-Prosa statt auf PNG.
- Nur die gefixte Seite nachprüfen — immer Nachbarseiten mit-rendern.
- Blur-stretch, Spiegel-Streifen, `object-fit: fill` auf Personengruppen als
  „Outpaint-Ersatz“.
- Fake-Gradient: `linear-gradient` der in <80 px von 0→#000 springt und die
  untere Hälfte tot schwarz macht.
- Ein Bildurteil ohne tatsächlichen Bildzugriff oder entgegen aktueller Rollenfreigabe.

## Integration

Der aufrufende Fachskill hält Auftrag und Ergebnisumfang. Für Web gilt der
Web-Zweig oben. Für PDF, Offerten, Folien und Ads bleiben die bestehenden
vollständigen Render- und Abnahmeverträge gültig; dieser Skill ergänzt keine
ungefragte Produktionsarbeit.

## Autopsie-Anker

**Herkunft:** Die Fail-Klassen kommen aus [references/autopsie-fc17bade.md](references/autopsie-fc17bade.md)
(Session `fc17bade-58f2-4a3a-8c8c-ecab3671be5c`, AlpenEnergie v11–v14). Jede
neue Fail-Klasse, die Raphael fluchen lässt → hier + in `fail-katalog.md`
nachtragen (`skill-update`).
