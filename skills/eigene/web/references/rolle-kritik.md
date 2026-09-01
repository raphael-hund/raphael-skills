# Rolle: Kritik-Session

Einstiegs-Ebene für die **Kritik**-Session der Drei-Sessions-Ordnung
(Plan / Kritik / Bau). Detail-Ebene: `kritik-matrix.md` (Spawn-Plan, Gesetz),
`screenshot-kritik-loop.md` (Ablauf, Blind-A/B),
`planner-executor-protokoll.md` (Handoff), `qa-faecher.md` +
`agentur-rubrik.md` (Maßstäbe).

Chip-Leiste: **`/web` + `/orchestrate`**, Effort high. Kein `/ultracode`-Slash.

## Start der Session (hart)

```bash
node /root/raphael-skills/skills/eigene/web/scripts/session-gate.mjs \
  --rolle kritik --client /root/clients/client-<name>/web/handoff
```

Exit 2 = gesperrt: ohne ausgefüllte `PRUEFGEGEN.md` startet die Kritik nicht.
Dann zurück an die Plan-Session, nicht selbst eine Prüflinsen-Tabelle erfinden.

## Was die Kritik-Session macht — und was nie

| Macht | Macht nie |
|---|---|
| Sweep-Skript, Flotte nach `kritik-matrix.md`, `KRITIK-n.md`, Shot-Ledger | Code schreiben, Deploy, PNG-Dump in den Parent, Plan umwerfen |

**Kein Code.** Die Kritik-Session findet und belegt; die Bau-Session fixt.

## `kritik-matrix.md` ist das Gesetz

`references/kritik-matrix.md` ist der **einzige** Spawn-Plan. Nicht daneben
noch eine Agentenliste aus Roster, Loop 3a oder QA-Fächern bauen, keine
Ad-hoc-„noch ein Kritiker“ ohne Achse aus der Tabelle.

Drei Achsen, Überlappung ist Absicht:

- **PAGE** — je Route **zwei Familien** auf denselben Shots
  (A = `visual-kritiker`/Grok, B = `kimi-recherche` nach Opus-Bau, sonst
  `opus-critic`). Katalog: Hierarchie, Spacing, Typo, Bildschnitt, CTA, Sektion.
- **SITE** — je eine Leaf über alle Fold/Key-Shots: buttons, typo, spacing,
  images.
- **LENS** — je eine Leaf über alle Folds mit anderer Frage: **Design,
  Conversion, Copy, SEO, Trust**.

Vier Familien sind Pflicht, sobald mehr als eine Route existiert: Grok, Kimi,
Opus, GPT. Sol nur für Code-Ursachen zu überlebenden visuellen Befunden — nie
Bildpfade an Sol. Luna nur zum Klassifizieren von >40 Shot-Pfaden, nie als
Urteil. Kein Fable, nie Haiku.

Der Kritik-Auftrag nennt `ACTUAL_BUILDER_FAMILY` (tatsächlich gelaufenes
Modell, nicht nur der angeforderte `agentType`). Fehlt sie, bricht der Kritiker
korrekt ab. Still auf die Builderfamilie umgeleitete Kritik ist Self-Review und
damit `BLOCKED` — auch bei sauberem PASS.

## Parent führt nur das Ledger

Der Parent/Controller liest **nie** PNGs. Jedes PNG liest ausschließlich das
Kritik-Leaf. Der Parent zählt Ledger-Zeilen gegen `manifest.json`:

```
| pfad | viewport | gelesen-von | verdict |
```

`gelesen-von` nennt das Leaf (z. B. `visual-kritiker`), nie „Parent hat
reingeschaut“. Builder-Prosa und PNG-Dump ersetzen das Ledger nicht. Das Ledger
steht in `STATUS.md`.

## Shot-Vertrag

Zuerst Skript, dann Leaves:

```bash
node /root/raphael-skills/skills/eigene/web/scripts/shot-sweep.mjs \
  --base http://127.0.0.1:<PORT> --static --states --mobile \
  --out /tmp/<projekt>-shots --routes /
```

- `--base` ist Pflicht (ohne Flag Exit 2), echte Dev-URL, nie `file://`.
- **Vor dem ersten Shot: je eine HTML-, CSS- und Bild-URL mit HTTP 200 belegen.**
  Ein statischer Build, dessen CSS 404 liefert, sieht auf dem Screenshot kaputt
  aus — dann kritisiert die Flotte den Server, nicht das Design.
  ```bash
  for u in / /assets/index.css /bilder/hero.webp; do
    printf '%s -> ' "$u"; curl -s -o /dev/null -w '%{http_code}\n' "http://127.0.0.1:<PORT>$u"
  done
  ```
- 1440×900 Fold **und** 390×844 Mobil je geänderter Route, Hover-Shots für CTAs.
- **fullPage ist kein Kritik-Input** — höchstens Übersichts-Anhang.
- Jede Leaf bekommt nur `manifest.json` plus die PNG-Pfade ihrer Achse.
- Schlägt der Sweep fehl: Standard-Skript fixen, **nie** ein eigenes
  Ad-hoc-Playwright-Skript schreiben.

## Wenn keine fremde Familie erreichbar ist

Jeder Kritik-Auftrag nennt `ACTUAL_BUILDER_FAMILY` — das tatsächlich gelaufene
Modell, nicht den angefragten `agentType`. Läuft die Kritik still auf der
Builderfamilie, ist das `BLOCKED` und kein PASS.

Ist wirklich keine fremde Familie erreichbar, wird nicht so getan, als hätte
jemand fremd geprüft: Die Sichtprüfung wird ausdrücklich als **Eigenprüfung**
deklariert, und der fehlende Fremdblick kommt als offener Punkt in
`DECISIONS.md`. Erst Raphael entscheidet, ob das für diesen Stand reicht.

## Merge-Regel — ein Befund lebt nur mit zwei unabhängigen Leaves

Der Controller merged, er ist kein fünfter Geschmack. Es überlebt, wer

- (a) von **zwei PAGE-Leaves unabhängig** gefunden wurde, **oder**
- (b) von einer **SITE-Achse und mindestens einer PAGE**, **oder**
- (c) von einer **LENS und mindestens einer PAGE/SITE**, **oder**
- (d) von **einer LENS mit deterministischem Gate-Beleg** (siehe unten).

Alles andere ist Parkplatz, nicht Fixliste. Ein Einzelbefund einer Familie ist
kein Befund. Bei PAGE laufen die zwei Familien zuerst unabhängig; danach
bekommt jede die Befunde der anderen und darf nur **bestätigen oder
widerlegen** — das ist der Gegencheck, keine Mehrheitsabstimmung.

### (d) Warum SEO und Copy einen eigenen Weg brauchen

Die Regeln (a)–(c) verlangen einen zweiten **Blick**. PAGE und SITE schauen auf
Gestaltung — fehlendes Canonical, doppelter Title oder ein Voice-Bruch fallen
dort niemandem auf. Ohne (d) landet **jeder** reine SEO- und Copy-Befund per
Konstruktion auf dem Parkplatz, während Design drei Überlebenswege hat. Genau
so wird eine Disziplin zum Anhängsel.

Design ist Geschmack und braucht deshalb eine zweite Meinung. SEO und Copy
haben **prüfbare Wahrheiten** — die brauchen keinen zweiten Geschmack, sondern
einen Beleg, den jeder nachfahren kann:

| Linse | Gate-Beleg statt zweitem Leaf |
|---|---|
| SEO | Ausgabe eines Checks auf dem gebauten HTML: Title-Länge, Meta, genau eine H1, Canonical, Slug, crawlbares Markup (QA-Fach 5 G1, `qa-faecher.md`) |
| Copy | `copywriting` G0 (`forbidden.md`-Treffer) oder G1 mit Datei und Stelle |
| Trust | Zeile aus `PROOF.md` oder deren belegtes Fehlen |

Ein LENS-Befund mit solchem Beleg überlebt allein. Ohne Beleg gilt weiter
(a)–(c): eine SEO-Behauptung ohne Check-Ausgabe ist eine Meinung und parkt.

## Klassifizierung jedes Befunds (Pflicht)

```bash
node /root/raphael-skills/skills/eigene/web/scripts/preview-befund-klasse.mjs "<befund>"
```

| Klasse | Bedeutung | Folge |
|---|---|---|
| `visual-block` | Vorschau-Gap (Bild, Hierarchie, Platzhalter sichtbar) | darf `biggest_gap` sein |
| `struktur-block` | Vorschau-Gap (Ablauf, Sitemap, Idee) | darf `biggest_gap` sein |
| `content-park` | Satz, Wort, Bild, Sektion, Review-Platzhalter, 50 vs 60 | parken, **nie** `biggest_gap` |
| `ops-park` | Domain, DNS, Vercel | parken, **nie** `biggest_gap` |

`biggest_gap` einer `KRITIK-n.md` ist **visuell**. Ein `park`-Befund kommt nicht
als Blocker in den Bau-Auftrag; er wird als `FAKT-GATE`-Zeile geführt und beim
Launch abgearbeitet (`rolle-launch.md`). Erfundener Proof bleibt für den Launch
hart, für die Vorschau nicht.

## Ausgabe: `KRITIK-n.md`

Eine Datei je Kritikrunde unter
`/root/clients/client-<name>/web/handoff/KRITIK-<n>.md`, durchnummeriert auch
über Session-Rotationen hinweg. Inhalt: überlebende Fixliste mit
Screenshot-Pfaden und Verdicts, `biggest_gap` (visuell), geparkte
`FAKT-GATE`-Zeilen getrennt. Alte Kritikrunden werden nicht in neue kopiert;
Erledigtes wird in `STATUS.md` abgehakt.

Jede Leaf liefert ihre eigene Datei unter `handoff/leaves/` im Schema aus
`kritik-matrix.md` (`route_or_axis`, `family`, `lens`, `verdict`,
`biggest_gap`, `beleg`, `findings`). Keine PNGs, kein Base64, keine
Transkripte.

## Startzeile

```
/web /orchestrate — Kritik, client-<name>. Controller, kein Builder.
Lies PRUEFGEGEN.md. Ohne die Datei STOP.
Starte die Flotte aus kritik-matrix.md (PAGE + SITE + LENS).
Parent liest keine PNGs. Ledger + KRITIK-n.md mit Merge-Regel.
```
