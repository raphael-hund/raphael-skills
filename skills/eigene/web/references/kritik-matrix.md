# Kritik-Matrix — eine Flotte, drei Achsen, Screenshots only

**Zweck:** Die Kritik-Session deckt eine Site ab, ohne 80 Agenten und ohne
einen Parent, der PNGs schluckt. Überlappung ist Absicht. Ein Befund zählt
erst nach Merge.

**Owner:** Skill `web`. Diese Datei ist der einzige Spawn-Plan. Nicht parallel
in Roster, Loop 3a und QA-Fächer noch einmal ausformulieren.

## Drei Phasen in einem Chat (Raphael 02.09.2026)

| Phase | Chip | Macht | Macht nie |
|---|---|---|---|
| **Plan** | `/web` | PLAN.md, PRUEFGEGEN.md, Reihenfolge | Code, PNG-Read, Subagenten |
| **Kritik** | `/web` + `/orchestrate` | Sweep-Skript + Kritik-Leaves, KRITIK-n.md, Shot-Ledger | Code, Deploy, PNG-Dump in den Parent |
| **Bau** | `/web` + `/orchestrate` | Nur überlebende Fixliste umsetzen, Re-Sweep, Ledger nachziehen | Neue Kritik erfinden, Plan umwerfen |

Plan schreibt, wogegen geprüft wird. Kritik prüft. Bau setzt um und prüft den
Fix am neuen Shot. Die drei Phasen laufen in **einem** Chat als drei
Workflow-Phasen; der Zustand lebt auf Platte (`PLAN.md`, `PRUEFGEGEN.md`,
`STATUS.md`, `KRITIK-n.md`), nie im Verlauf. `session-gate.mjs` bleibt das
Phasen-Gate.

## PRUEFGEGEN.md (Plan schreibt das, Kritik liest es)

Eine Tabelle, sonst nichts. Ohne diese Datei startet Kritik nicht.

```
| Linse        | Skill (intern)     | Referenz-Dateien                         | Shot-Input              |
| Design       | web + design       | taste-kern.md, motion-doktrin.md         | Fold+Hover je Route     |
| Conversion   | web                | landingpage-struktur.md, qa-faecher 1    | Fold-CTA, Formular      |
| Copy         | copywriting        | VOICE.md, forbidden.md                   | Fold + Key-Sections     |
| SEO          | seo                | qa-faecher 5, agentur-rubrik 11–17       | H1/Title sichtbar       |
| Trust        | web                | PROOF.md, qa-faecher 6; Vorschau: Platzhalter ok | Proof-Slots sichtbar    |
| Konsistenz   | web                | diese Matrix, Achse SITE                 | alle Folds nebeneinander|
```

## Spawn (Kritik-Session, ein Workflow)

Zuerst Skript, dann Leaves. Parent dispatcht und merged. Parent liest keine PNGs.

```
0  SKRIPT   shot-sweep --base <url> --static --states --mobile
            → manifest.json + PNG-Pfade. Kein Agent.

1  PAGE     je Route zwei unabhängige Leaves, dieselben Shots:
            multi-family: A = visual-kritiker (Grok)
                          B = opus-critic (nur wenn Opus NICHT gebaut hat), sonst zweite Grok-Instanz mit anderem Katalog-Fokus (Kimi tot 03.09.2026)
            claude-only:  A = visual-kritiker (Sonnet)
                          B = zweite frische Sonnet-Instanz, anderer
                              Katalog-Fokus als A (opus-critic entfällt,
                              sobald Opus gebaut hat)
            Katalog: Hierarchie, Spacing, Typo, Bildschnitt, CTA, Sektion.

2  SITE     je eine Leaf über ALLE Fold/Key-Shots (Überlappung zu PAGE):
            buttons  → multi-family grok-critic     | claude-only Sonnet-Instanz
            typo     → multi-family opus-critic     | claude-only Sonnet-Instanz
            spacing  → multi-family visual-kritiker | claude-only Sonnet-Instanz
            images   → multi-family visual-kritiker | claude-only Sonnet-Instanz
            claude-only: je Leaf eine frische Instanz mit genau einer Achse.

3  LENS     je eine Leaf über alle Folds, andere Frage als PAGE/SITE:
            design      → multi-family opus-critic    | claude-only Sonnet-Instanz
            conversion  → multi-family grok-critic    | claude-only Sonnet-Instanz
            copy        → multi-family sol-pruefer (Text-Input, keine Bildpfade) + grok-critic am Bild | claude-only Sonnet-Instanz
            seo         → multi-family sol-pruefer (Text-Input)  | claude-only Sonnet-Instanz
                          (onpage-check.mjs + Shot: Titel, H1)
            trust       → multi-family opus-critic (nur wenn Opus nicht gebaut hat), sonst grok-critic | claude-only Sonnet-Instanz
                          (Proof sichtbar? FAKT-GATE parken)
            claude-only: je Leaf eine frische Instanz mit genau einer Achse.

4  MERGE    Controller, kein fünfter Geschmack. Zuerst zählt er die
            tatsächlich verschiedenen Modellfamilien der Flotte und
            schreibt die Zahl in KRITIK-n.md (V11). Bei genau einer
            Familie belegen (a)-(c) keine Unabhängigkeit mehr: sie
            gelten nur noch mit sichtbarem Label
            "claude-only, Instanz-Trennung", und (d) — der
            deterministische Gate-Beleg — ist das primäre Urteil.
            Überlebt, wer (a) zwei PAGE-Leaves unabhängig fanden, oder
            (b) eine SITE-Achse UND mindestens eine PAGE, oder
            (c) eine LENS UND mindestens eine PAGE/SITE, oder
            (d) eine LENS MIT deterministischem Gate-Beleg:
                SEO   → Ausgabezeile aus scripts/onpage-check.mjs
                Copy  → copywriting G0/G1 mit Datei und Stelle
                Trust → Zeile aus PROOF.md oder deren Fehlen
                Der Beleg ist die kopierte Ausgabe, nicht die
                Behauptung, geprüft zu haben. Ohne Beleg gilt (a)-(c).
            Rest = Parkplatz, nicht Fixliste.
            Widerspricht ein LENS-Befund dem Code oder mehreren PAGE-Leaves,
            misst der Parent den Punkt im DOM (Playwright, Geometrie/Text,
            kein PNG-Read) und verwirft den Leaf-Befund mit Beleg. Ein
            einzelner LENS-Leaf hat im MAKE-Pilot (03.09.2026) eine
            Proof-Zeile erfunden, die weder im Code noch in vier
            PAGE-Leaves stand.
            content-park / FAKT-GATE / ops-park nie biggest_gap.
            Preview-Blocker nur visual-block oder struktur-block
            (Ablauf, Sitemap, Idee, Design). Satz, Wort, Bild, Sektion,
            Review-Platzhalter = Swap.
            Jedes Finding trägt eine Klasse: visual-block, struktur-block,
            swap, content-park, ops-park, sweep-artefakt. sweep-artefakt =
            fixed Header plus 750-px-Scrollpunkt schneidet eine Zeile an;
            das ist bei jeder Website so und nie ein Befund. Der Leaf
            prüft: liegt der Anschnitt am Sektionsstart (Befund) oder am
            beliebigen Scrollpunkt (Artefakt)? Ohne Klasse wiederholt jede
            Runde denselben Nicht-Befund (MAKE-Pilot Kritik 2 → 3).
```

Die Familien-Pflicht hängt am aktiven Flottenprofil (`/root/.claude/fleet-profile`):

- **multi-family:** drei Familien sind Pflicht, sobald mehr als eine Route
  existiert — Grok, Opus, GPT (Kimi tot, Raphael 03.09.2026; Sol nur Text-Input:
  Code-Ursache, Copy, SEO — keine Bildpfade an Sol). Hat Opus gebaut, trägt Grok
  die Bild-Achsen allein und Sol die Text-Achsen; Opus-Leaves entfallen. Masse
  >40 Shot-Pfade: Luna.
- **claude-only:** eine Familie, deshalb keine Familien-Pflicht. Statt dessen
  **Instanz-Trennung**: jede Leaf ist eine frische Sonnet-Instanz, sieht nur
  Shots plus `PRUEFGEGEN.md`, nie den Build-Verlauf, und trägt in ihrer
  Rückgabe sichtbar das Label `claude-only, Instanz-Trennung` als
  ausdrücklich **schwächere** Garantie als Fremdfamilie. Masse >40
  Shot-Pfade: Haiku.

Kein Agent nur „damit die Familie da ist“ — jede Leaf hat eine Achse aus dieser
Tabelle, nie Urteil aus der Massen-Rolle.

## Drei Ausgänge je Kritik-Durchlauf — kein vierter

Jeder Durchlauf endet in genau einem dieser drei Zustände. Das ist die
Abbruchlogik des Kritik-Loops; `agent-roster.md` verweist hierher.

| Ausgang | Wann | Was passiert |
|---|---|---|
| `clear` | Fixliste nach Merge leer, oder nur begründete „bewusst so“-Einträge | Kritik-Phase fertig, weiter zur Bau-Phase |
| `miss-with-feedback` | mindestens ein überlebender Befund | Rückgabe nennt die **benannte Fehlzeile** (Shot-Datei + Region, oder Datei:Zeile aus dem Gate-Beleg); Bau fixt, dann Re-Sweep und neuer Durchlauf |
| `escalate` | dritter Durchlauf ohne `clear`, Panel-Divergenz ohne 2er-Mehrheit, oder ein Befund, den kein Gate und keine zweite Leaf entscheiden kann | Eskalation an Raphael mit Belegen, keine Runde 4 |

Ein Durchlauf ohne einen dieser drei Ausgänge ist nicht abgeschlossen. Der
Ausgang steht als erste Zeile in `KRITIK-n.md`.

## Was eine Leaf zurückgibt

Genau dieses Schema, eine Datei je Leaf unter `handoff/leaves/`:

```
route_or_axis: /
family: grok            # claude-only: sonnet + Label "claude-only, Instanz-Trennung"
lens: page | buttons | typo | spacing | images | design | conversion | copy | seo | trust
verdict: fail | pass
biggest_gap: <ein Satz oder none>
beleg: <png-dateiname + Region>
findings:
- shot: home-desktop-00-fold.png
  was: Button-Radius weicht von /leistungen ab
  overlap_hint: SITE/buttons
```

Keine PNGs, kein Base64, keine Transkripte.

## Shot-Vertrag

- 1440×900 Fold und 390×844 Mobil je geänderter Route. Hover-Shots für CTAs.
- fullPage ist kein Kritik-Input.
- Leaf bekommt nur die Pfade seiner Achse plus `manifest.json` — als
  **Listendatei** (`handoff/leaves/lists/<achse>.txt`, ≤12 Zeilen), nie als
  Pfade im Prompt-String. Der Shot-Budget-Hook zählt Pfade über das ganze
  Workflow-Skript und lehnt sonst den Start ab, auch wenn jede Achse für sich
  unter 12 liegt (MAKE-Pilot 03.09.2026: «21 Shot-Pfade im Prompt»).
  Manifest behält die PNG-Identität; das Leaf liest die stemgleichen `/small/`-Kacheln (`<stem>.jpg` oder `<stem>-k1.jpg`, `-k2.jpg` …, native Auflösung)
  (vorher `/root/tools/shots-verkleinern.sh`). Hartes Budget 12 Shots — der Hook
  denyt darüber. Parent bekommt nur Verdict plus Pfad, nie das Bild.
- Parent-Ledger: `pfad | viewport | gelesen-von | verdict`.
- Nach jedem Bau-Fix: neuer Sweep, Ledger-Zeilen mit Zeitstempel nach dem Fix.

## Aufräumen — was diese Datei ersetzt

Nicht mehr parallel pflegen:

- screenshot-kritik-loop.md §3a Spawn-Liste (zeigt nur noch hierher)
- ad-hoc „noch ein Kritiker“ ohne Achse in dieser Tabelle
- Parent, der alle PNGs selbst liest
- Kritik und Bau in derselben Phase (ein Chat ja, eine Phase nie)
- eine zweite Abbruchlogik neben den drei Ausgängen oben

qa-faecher.md und agentur-rubrik.md bleiben die **Maßstäbe** (Spalte Referenz
in PRUEFGEGEN.md), nicht der Spawn-Plan.
