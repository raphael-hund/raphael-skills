---
name: visual-aaa
version: 1.0.0
description: >
  Harter Qualitäts-Gate für ALLE visuellen Deliverables (PDF-Seiten, Folien,
  HTML-A4, Landingpages, Ads-Statics). Erzwingt Render → Self-Read → G1
  (deterministisch) → harter Kritiker (andere Modellfamilie) → Fix-Loop bis
  PASS. „Fertig“ ohne visual-ship.json mit g1_exit=0 und Critic-PASS ist
  verboten. Trigger: "visual-aaa", "visuell prüfen", "AAA-Qualität",
  "Screenshot-Gate", "PDF-QA", "Folien prüfen", "visuell fertig",
  "Triple-A Check", "harsh critic", "Pixel-QA".
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
  - references/autopsie-fc17bade.md
requires_skills: [eval@^0]
completion_criteria:
  - "Jedes visuelle Deliverable hat einen frischen Render (PNG pro Seite/Ansicht) unter einem versionierten out/-Pfad"
  - "Cockpit oder ausführende Rolle hat JEDES PNG per Read wirklich angesehen (Self-Read) und eine Befundliste geschrieben — nicht nur erzeugt"
  - "python3 …/visual-g1.py <out-dir> Exit-Code 0 (G1 deterministisch grün) BEVOR ein LLM-Kritiker zählt"
  - "Mindestens ein visual-kritiker aus ANDERER Modellfamilie als der Builder hat am echten PNG urteilt: pass|fail + BELEG; fail → Fix-Loop"
  - "visual-ship.json existiert mit g1_exit=0, self_read=true, critic_verdicts[].verdict=pass, pages[] vollständig"
  - "Kein DoneClaim ‚fertig‘ ohne visual-ship.json — Worker-Behauptungen gelten untrusted (eval Verifikations-Vertrag)"
  - "Nach JEDEM Fix: Re-Render ALLER betroffenen Seiten + Re-G1 + Re-Critic (nicht nur die geänderte Stelle)"
---

# visual-aaa — hartes Pixel-Gate

## Zweck (1 Satz)

Visuelle Arbeit endet erst, wenn Pixel-Belege und ein fremder Kritiker grün
sind — nie, wenn ein Worker „sieht gut aus“ sagt.

## Wann dieser Skill greift (hart)

| Deliverable | Pflicht? |
|---|---|
| Kunden-PDF / Offerte / Firmenvorstellung / Pitch-Deck | **immer** |
| Landingpage / Website vor Ship | **immer** (zusätzlich zu `web` screenshot-kritik-loop) |
| Ads-Statics / Creatives | **immer** |
| Interne Notiz-Skizze / Wireframe | nein (SOLO ok) |

Wenn Raphael „richtig gut / AAA / bombensicher / visuell prüfen“ sagt → dieser
Skill, Betriebsart **GAUNTLET** aus `orchestrate`/`orchestrate-gauntlet`.

## Die 6 Schritte (Reihenfolge ist Gesetz)

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
Für Web: `shot-sweep.mjs --base <url> --out <out-dir>/render …` (Skill `web`).

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

### 5. Critic-Loop (andere Modellfamilie)

Spawn `visual-kritiker` (oder Agent mit `agentType` aus anderer Familie als
Builder — Default: Builder=`opus-builder`/`kimi-worker` → Kritiker=`grok-worker`
oder `sol-pruefer` mit eingebettetem PNG-Kontext; Sol ist dateiblind → PNG
vorher beschreiben+Pfad + Base64-Hinweis im Prompt, besser: vision-fähige
Familie `grok-worker` / `kimi-worker` / `opus-builder`).

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
- Builder ≠ Kritiker-Familie (AGENTS Regel 8).

### 6. Ship-Manifest

```bash
python3 /root/raphael-skills/skills/eigene/visual-aaa/scripts/write-ship-manifest.py \
  --out <out-dir>/visual-ship.json \
  --render-dir <out-dir>/render \
  --g1 <out-dir>/g1-report.json \
  --critics <out-dir>/critics.json \
  --self-read true
```

Ship nur wenn `visual-ship.json` valid und `ok: true`
(`scripts/validate-ship-manifest.py` Exit 0).

## Verbote

- „Fertig“ melden ohne `visual-ship.json`.
- Critic auf Builder-Prosa statt auf PNG.
- Nur die gefixte Seite nachprüfen — immer Nachbarseiten mit-rendern.
- Blur-stretch, Spiegel-Streifen, `object-fit: fill` auf Personengruppen als
  „Outpaint-Ersatz“.
- Fake-Gradient: `linear-gradient` der in <80 px von 0→#000 springt und die
  untere Hälfte tot schwarz macht.
- Haiku als alleiniger visueller Kritiker (Raphael: keine Haiku-Subagents für
  Urteil — Luna/Grok/Kimi/Opus).

## Integration

| Kontext | Wie |
|---|---|
| `make-pdf` | vor Auslieferung `visual-aaa` Pflicht |
| `web` Ship | nach shot-sweep: G1 auf PNGs + Critic-Panel |
| `orchestrate` GAUNTLET | Messlatte + dieser Gate als externes Gate |
| `ads-statics` | Creative-PNG durch G1 + Critic |

## Autopsie-Anker

Die Fail-Klassen kommen aus [references/autopsie-fc17bade.md](references/autopsie-fc17bade.md)
(Session `fc17bade-58f2-4a3a-8c8c-ecab3671be5c`, AlpenEnergie v11–v14). Jede
neue Fail-Klasse, die Raphael fluchen lässt → hier + in `fail-katalog.md`
nachtragen (`skill-update`).
