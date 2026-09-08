# Rolle: Bau-Phase

Die Bau-Phase baut genau den freigegebenen Umfang. Der Parent ist Controller: Er plant Pakete, dispatcht, integriert Berichte und führt Ledger. Er editiert keine CSS-/TSX-Datei und liest keine PNG-Binaries.

## Start der Phase

```bash
node /root/raphael-skills/skills/eigene/web/scripts/session-gate.mjs \
  --rolle bau --client /root/clients/<kunde>/web/handoff
```

Für den ersten Bau eines Neuaufbaus öffnet Raphaels GO-Zeile zum Fold-Duell die Phase. Für spätere Fix-Bauten braucht das Gate eine nicht-leere `KRITIK-n.md`. Das Fold-Duell selbst ist eine eigene Phase mit `--rolle fold-duell`, siehe `fold-duell.md`.

## Erster Turn

Die Bau-Phase startet im ersten Turn einen Dynamic Workflow, Profil `multi-family`. Jeder Leaf ist per globalem `agentType` gebunden; mindestens zwei tatsächliche Familien sind vertreten. Der Parent vergleicht nach dem Lauf `workflowProgress[].agentType`, `workflowProgress[].model` und sichtbare FAILOVER-Hinweise.

Vor dem Fan-out läuft der Preflight aus `SKILL.md`: MCP-Verbindungen, Unix-User und Dateieigentum, Schreibprobe auf Projekt und Ausgabeordner, `api-keys.env` lesbar, PLAN/DECISIONS/STATUS/KRITIK vollständig.

## Eingaben

- `PLAN.md`, `PRUEFGEGEN.md`, `SEO-PAGE-MAP.json`, `DESIGN.md`, `DECISIONS.md`, `STATUS.md` und höchste `KRITIK-n.md`.
- `handoff/referenzen/BILDLISTE.txt`; jeder Builder liest jede Datei und schreibt «gesehen: <pfad>» in den Bericht.
- Werkzeugtabelle aus `tool-usecase-router.md`; kein Paket ohne Zeile.
- Stack-Vertrag aus `stack.md`; neue Sites starten aus `assets/react-starter`.

## Pakete und Agenten

| Paket | Agenten | Regel |
|---|---|---|
| Art Direction und Frontend | `fable-builder`, `astra-worker`, `kimi-worker`; `opus-builder` ergänzend | Stufe 1 zuerst; disjunkte `write_set`s, genau ein Integrator |
| Copy | `astra-worker`, dann `kimi-worker`, dann `fable-builder` | eigener Copy-Leaf; `forbidden-check.py` und G1 vor Rückgabe; Integrator ändert Copy nicht |
| Technik, Browser, Debug | `grok-worker` | kleinster reproduzierbarer Fix, Befehlsbeleg |
| Backend, Formular-Endpoint, API, Tests | `grok-worker`, `sol-worker`; `composer-worker` experimentell | Sol nie Frontend |
| Serien und Massen-Read | `sonnet-worker`, `luna-worker`, `terra-worker` | feste Liste und Prüfbefehl; kein Urteil |
| Komponenten-Suche | shadcn-MCP/CLI, 21st-MCP/CLI, Mantine-MCP | kein Agent baut eine Standardkomponente ohne Suchbeleg |

Jedes Paket nennt Ziel, Eingaben, `write_set`, Prüfbefehl, Stop-Bedingung, Zeitbudget und Rückgabeformat. Richtwerte: Integrator 45 min, Routen-Leaf 40 min, Copy-Leaf 20 min, Mini-Fix 15 min. Spätestens fünf Minuten vor Ablauf liefert der Leaf StructuredOutput mit dem erreichten Stand.

## React- und Komponentenvertrag

1. Jede Route der `SEO-PAGE-MAP.json` wird als Next.js-App-Router-Seite gebaut.
2. Public Content bleibt in Server Components; Zustand, Events und Browser-APIs liegen in Client Components.
3. Jede neue Komponentenfamilie folgt der Suchreihenfolge in `component-registries.md`: Basis über shadcn, Marketing/Effects über höchstens drei Registry-Kandidaten und 21st mit Design Context, Spezialjobs über Kibo/Mantine/HeroUI/AI Elements.
4. `shadcn view` oder `add --dry-run` liest Dateien, rekursive Abhängigkeiten, CSS-Vars und Lizenz vor dem Install.
5. Nach `add`: `package.json`-Diff lesen, unnötige Pakete entfernen, Primitive-Familie erhalten, Tokens auf DESIGN.md abbilden.
6. Eigenbau nur mit Zeile «gesucht in …, nichts passte, weil …» im Bericht und in DESIGN.md.
7. Jede Datei in `components/ui/` wird vor Abnahme einem Registry-Item oder einer Eigenbau-Begründung zugeordnet.

## Copy

Das Briefing aus PLAN.md enthält Zielgruppe, Ton, VOICE-Referenz, Keyword je Route und Proof-Lage. Der Copy-Leaf schreibt Headlines, Fliesstext, CTA, Microcopy und Fehlermeldungen. G0 `forbidden.md` und G1 laufen im Copy-Leaf; G2 gehört zum Launch. Passt Text nicht ins Layout, meldet der Integrator den Konflikt an den Copy-Leaf.

Working-Copy und offene Zahlen dürfen in der Vorschau als `content-park` stehen. Sie blockieren den Launch, nicht den sichtbaren Zwischenstand. Keine erfundenen Reviews, Personen, Leistungen oder Ergebnisse.

## Baufolge

### Erster Bau nach Fold-GO

1. Gewinner-Richtung aus DECISIONS.md in DESIGN.md als Tokens, Typografie, Raster, Bildrollen, Motion und Komponentenvertrag festschreiben.
2. Foundations und Shared Components bauen.
3. Alle Routen der SEO-Seitenkarte mit echtem Inhalt und Links bauen.
4. Formularziel und Fehlerzustände anbinden oder den ehrlichen Kontakt-Fallback zeigen.
5. Produktionsbuild, Raw-HTML, Status, Links und Metadaten prüfen.
6. Deterministische Gates und frischen Sweep ausführen.
7. Genau einen Stufe-2-Kritiker anderer Familie nach `kritik-matrix.md` starten.

### Fix-Bau nach Kritik

1. Nur die höchstens drei Findings aus der letzten `KRITIK-n.md` umsetzen.
2. Keine neue Kritik erfinden und keinen Plan umwerfen; neue Befunde gehen zurück an die Kritik-Phase.
3. Betroffene Routen frisch bauen und alle betroffenen Gates erneut ausführen.
4. Betroffene Shots ersetzen; neue Ledger-Zeilen tragen Build-Revision und Zeit nach dem Fix.
5. Kritikphase startet den nächsten Kritiker. Ein zweiter Kritiker oder `xhigh` ist erst nach diesem FAIL/Fix-Zyklus zulässig.

## Qualitätsschleife

Die verbindliche Folge steht nur in `kritik-matrix.md`: Bau, ein Stufe-2-Kritiker anderer Familie, bei FAIL höchstens drei Notizen zurück an denselben Builder, Rebuild und Re-Sweep, dann optional zweiter Kritiker; maximal drei Runden; Stufe-1-Abnahme vor Auslieferung.

## Fertig

- Alle Routen der Seitenkarte gebaut; `validate-page-map.mjs --phase release` grün.
- `next build` grün; `out/<route>/index.html` bei Export vorhanden.
- Raw-HTML enthält h1, Hauptcopy, Links, Titel, Canonical.
- Funktion, Formular, Tastatur, axe, craft, motion und Werkzeugtabelle geprüft.
- Screenshots für Desktop 1440×900 und Mobil 390×844 aktuell; Kritik-Leaf hat sie gelesen.
- DESIGN.md stimmt mit CSS, Tokens, Komponenten, Fonts, Assets und gerendertem Stand überein.
- STATUS.md nennt Build-Revision, Gate-Ergebnisse, Shot-Ledger, offene `content-park`/`ops-park` und nächste Aktion.

## Startzeile

```text
/web: Bau, <kunde>. Parent ist Controller und liest keine PNG-Binaries.
Starte jetzt einen Dynamic Workflow (multi-family).
Lies PLAN.md, PRUEFGEGEN.md, SEO-PAGE-MAP.json, DESIGN.md, DECISIONS.md,
STATUS.md und die höchste KRITIK-n.md. Baue den freigegebenen Umfang aus
assets/react-starter; hole Komponenten nach component-registries.md; Copy kommt
aus einem eigenen Astra/Kimi/Fable-Leaf. Nach Produktionsbuild und frischem
shot-sweep genau ein Stufe-2-Kritiker anderer Familie nach kritik-matrix.md.
```
