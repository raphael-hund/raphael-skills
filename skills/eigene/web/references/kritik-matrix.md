# Kritik-Matrix — eine Flotte, drei Achsen, Screenshots only

**Zweck:** Die Kritik-Session deckt eine Site ab, ohne 80 Agenten und ohne
einen Parent, der PNGs schluckt. Überlappung ist Absicht. Ein Befund zählt
erst nach Merge.

**Owner:** Skill `web`. Diese Datei ist der einzige Spawn-Plan. Nicht parallel
in Roster, Loop 3a und QA-Fächer noch einmal ausformulieren.

## Drei Sessions (nicht zwei Modi in einem Chat)

| Session | Chip | Macht | Macht nie |
|---|---|---|---|
| **Plan** | `/web` | PLAN.md, PRUEFGEGEN.md, Reihenfolge | Code, PNG-Read, Subagenten |
| **Kritik** | `/web` + `/orchestrate` | Sweep-Skript + Kritik-Leaves, KRITIK-n.md, Shot-Ledger | Code, Deploy, PNG-Dump in den Parent |
| **Bau** | `/web` + `/orchestrate` | Nur überlebende Fixliste umsetzen, Re-Sweep, Ledger nachziehen | Neue Kritik erfinden, Plan umwerfen |

Plan schreibt, wogegen geprüft wird. Kritik prüft. Bau setzt um und prüft den
Fix am neuen Shot.

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

1  PAGE     je Route zwei Familien, dieselben Shots:
            A = visual-kritiker (Grok)
            B = kimi-recherche  (wenn Opus gebaut hat) oder opus-critic
            Katalog: Hierarchie, Spacing, Typo, Bildschnitt, CTA, Sektion.

2  SITE     je eine Leaf über ALLE Fold/Key-Shots (Überlappung zu PAGE):
            buttons  → grok-critic
            typo     → opus-critic
            spacing  → visual-kritiker
            images   → kimi-recherche

3  LENS     je eine Leaf über alle Folds, andere Frage als PAGE/SITE:
            design      → opus-critic
            conversion  → grok-critic
            copy        → kimi-critic
            seo         → kimi-recherche   (onpage-check.mjs + Shot: Titel, H1)
            trust       → kimi-recherche   (Proof sichtbar? FAKT-GATE parken)

4  MERGE    Controller, kein fünfter Geschmack:
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
            content-park / FAKT-GATE / ops-park nie biggest_gap.
            Preview-Blocker nur visual-block oder struktur-block
            (Ablauf, Sitemap, Idee, Design). Satz, Wort, Bild, Sektion,
            Review-Platzhalter = Swap.
```

Vier Familien sind Pflicht, sobald mehr als eine Route existiert:
Grok, Kimi, Opus, GPT (Sol nur Code-Ursache zu überlebenden visuellen Befunden,
keine Bildpfade an Sol). Kein Agent nur „damit die Familie da ist“ — jede
Leaf hat eine Achse aus dieser Tabelle.

Luna nur wenn >40 Shot-Pfade klassifiziert werden müssen (Ledger-Zeilen), nie Urteil.

## Was eine Leaf zurückgibt

Genau dieses Schema, eine Datei je Leaf unter `handoff/leaves/`:

```
route_or_axis: /
family: grok
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
- Leaf bekommt nur die Pfade seiner Achse plus `manifest.json`.
- Parent-Ledger: `pfad | viewport | gelesen-von | verdict`.
- Nach jedem Bau-Fix: neuer Sweep, Ledger-Zeilen mit Zeitstempel nach dem Fix.

## Aufräumen — was diese Datei ersetzt

Nicht mehr parallel pflegen:

- screenshot-kritik-loop.md §3a Spawn-Liste (zeigt nur noch hierher)
- ad-hoc „noch ein Kritiker“ ohne Achse in dieser Tabelle
- Parent, der alle PNGs selbst liest
- Kritik und Bau in derselben Session

qa-faecher.md und agentur-rubrik.md bleiben die **Maßstäbe** (Spalte Referenz
in PRUEFGEGEN.md), nicht der Spawn-Plan.
