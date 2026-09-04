# Rolle: Kritik-Phase

Einstiegs-Ebene für die **Kritik**-Phase der Drei-Phasen-Ordnung
(Plan / Kritik / Bau, drei Phasen in **einem** Chat, Zustand auf Platte —
Raphael 02.09.2026). Detail-Ebene: `kritik-matrix.md` (Spawn-Plan, Gesetz),
`screenshot-kritik-loop.md` (Ablauf, Blind-A/B),
`planner-executor-protokoll.md` (Handoff), `qa-faecher.md` +
`agentur-rubrik.md` (Maßstäbe).

Chip-Leiste: **`/web` + `/orchestrate`**, Effort high. Kein `/ultracode`-Slash.

## Start der Phase (hart)

```bash
node /root/raphael-skills/skills/eigene/web/scripts/session-gate.mjs \
  --rolle kritik --client /root/clients/client-<name>/web/handoff
```

Exit 2 = gesperrt: ohne ausgefüllte `PRUEFGEGEN.md` startet die Kritik nicht.
Dann zurück an die Plan-Phase, nicht selbst eine Prüflinsen-Tabelle erfinden.

## Was die Kritik-Phase macht — und was nie

| Macht | Macht nie |
|---|---|
| Sweep-Skript, Flotte nach `kritik-matrix.md`, `KRITIK-n.md`, Shot-Ledger | Code schreiben, Deploy, PNG-Dump in den Parent, Plan umwerfen |

**Kein Code.** Die Kritik-Phase findet und belegt; die Bau-Phase fixt.

## `kritik-matrix.md` ist das Gesetz

`references/kritik-matrix.md` ist der **einzige** Spawn-Plan. Nicht daneben
noch eine Agentenliste aus Roster, Loop 3a oder QA-Fächern bauen, keine
Ad-hoc-„noch ein Kritiker“ ohne Achse aus der Tabelle.

Drei Achsen, Überlappung ist Absicht:

- **PAGE** — je Route **zwei unabhängige Leaves** auf denselben Shots.
  Katalog: Hierarchie, Spacing, Typo, Bildschnitt, CTA, Sektion.
- **SITE** — je eine Leaf über alle Fold/Key-Shots: buttons, typo, spacing,
  images.
- **LENS** — je eine Leaf über alle Folds mit anderer Frage: **Design,
  Conversion, Copy, SEO, Trust**.

Wer welche Leaf besetzt und ob eine Familien-Pflicht gilt, hängt am aktiven
Flottenprofil und steht **nur** in `kritik-matrix.md` — hier nicht zweitschreiben.
Auch die drei Ausgänge je Durchlauf (`clear` / `miss-with-feedback` /
`escalate`) stehen dort.

Der Kritik-Auftrag nennt `ACTUAL_BUILDER_FAMILY` (tatsächlich gelaufenes
Modell, nicht nur der angeforderte `agentType`). Ist der geprüfte Stand
Bestandscode ohne Modell-Herkunft (Git-Autoren sind Menschen), lautet der Wert
`human` plus Commit-SHAs; erst ab dem ersten Bau-Paket steht dort die
Builder-Familie. Fehlt der Stempel, bricht der Kritiker korrekt ab (MAKE-Pilot
03.09.2026: 11 Grok-Leaves BLOCKED auf dem Git-Bestand). Derselbe Agent prüft seinen eigenen Bau nie: Self-Review bleibt in
jedem Profil `BLOCKED` — auch bei sauberem PASS.

## Build-Frische vor dem Sweep

Vor dem ersten Sweep prüft der Parent, ob das Build-Artefakt zur Quelle passt:
`find src -newer dist/index.html -type f | wc -l` muss 0 sein, sonst frisch bauen
(`vite build` in ein eigenes Ausgabeverzeichnis, nie in den Root-`dist/`). Ein
stales `dist/` liefert einen Sweep vom falschen Stand; `--build-revision` bindet
nur die Identität, nicht die Frische (MAKE-Pilot 03.09.2026: `dist/` vom 01.09.,
zehn Quelldateien neuer, erster Sweep zeigte den alten Hero).

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
  Manifest behält die PNG-Identität; das Leaf liest die stemgleichen `/small/`-Kacheln (`<stem>.jpg` oder `<stem>-k1.jpg`, `-k2.jpg` …, native Auflösung)
  (vorher `/root/tools/shots-verkleinern.sh`). Hartes Budget 12 Shots — der Hook
  denyt darüber. Parent bekommt nur Verdict plus Pfad, nie das Bild.
- Schlägt der Sweep fehl: Standard-Skript fixen, **nie** ein eigenes
  Ad-hoc-Playwright-Skript schreiben.

## Wenn nur eine Modellfamilie da ist (Profil `claude-only`)

Das ist seit 02.09.2026 der Normalfall, kein Ausfall. Es wird trotzdem nicht so
getan, als hätte jemand fremd geprüft:

- Jede Leaf ist eine **frische Instanz** und sieht nur die Shots plus
  `PRUEFGEGEN.md`, nie den Build-Verlauf.
- Jede Rückgabe trägt sichtbar `claude-only, Instanz-Trennung` — ausdrücklich
  eine **schwächere** Garantie als Fremdfamilie, keine Äquivalenz.
- Der Merge zählt die tatsächlich verschiedenen Familien; bei einer Familie ist
  der deterministische Gate-Beleg (d) das primäre Urteil (`kritik-matrix.md`).
- Ein stiller Familienwechsel oder ein Kritiker, der denselben Bau geprüft hat,
  bleibt `BLOCKED` und kein PASS.

## Merge-Regel — ein Befund lebt nur mit zwei unabhängigen Leaves

Die Bedingungen (a)-(d) und die Familien-Zählung stehen in `kritik-matrix.md`
Abschnitt 4 MERGE — hier nicht wiederholen. Der Controller merged, er ist kein
fünfter Geschmack; alles, was (a)-(d) nicht überlebt, ist Parkplatz.

Bei PAGE laufen die zwei Leaves zuerst unabhängig; danach bekommt jede die
Befunde der anderen und darf nur **bestätigen oder widerlegen** — das ist der
Gegencheck, keine Mehrheitsabstimmung.

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
| SEO | Zeile aus `scripts/onpage-check.mjs` (Title, Meta, genau eine H1, Canonical, crawlbares Markup — QA-Fach 5 G1) |
| Copy | `copywriting` G0 (`forbidden.md`-Treffer) oder G1 mit Datei und Stelle |
| Trust | Zeile aus `PROOF.md` oder deren belegtes Fehlen |

```bash
node /root/raphael-skills/skills/eigene/web/scripts/onpage-check.mjs \
  --base http://127.0.0.1:<PORT> --routes / /leistungen /kontakt
# Exit 0 = On-Page sauber, Exit 1 = jede Zeile ist ein belegter Befund
```

Ein LENS-Befund mit solchem Beleg überlebt allein — der Beleg ist die
**kopierte Ausgabezeile**, nicht die Behauptung, man habe geprüft. Wer keinen
Beleg mitliefert, fällt zurück auf (a)–(c): eine SEO- oder Copy-Behauptung ohne
Check-Ausgabe ist eine Meinung und parkt.

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
