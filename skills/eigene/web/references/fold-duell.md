# Fold-Duell — Raphael sieht drei Folds, bevor eine Route gebaut wird

**Wofür:** Neuaufbau, Redesign oder «Look von null» einer Website. Das Duell
ist die erste Bau-Welle und das einzige Paket, das vor Raphaels Wahl läuft.
Grund (MAKE 04.09.2026): Ein 20-KB-Plan entschied in 13 Minuten Typo-Hero,
all-sharp, Grünschwarz; 15 Leaves bauten 57 Minuten daran; Raphael sah nach
96 Minuten das erste Bild und sagte «von null». Ein Fold-Duell hätte das in
25 Minuten geklärt.

**Abgrenzung:** `varianten-picker.md` ist das Werkzeug für *ein UI-Stück* im
laufenden Projekt (Toast, Preiskarte). Das Fold-Duell ist der *Look der ganzen
Seite* am Fold, als Pflicht-Gate vor Welle 1.

## Regeln (hart)

1. **Kein Routenpaket, kein Design-System, keine Pattern-Bibliothek vor der
   Wahl.** SEO-Map, Copy-Briefing und Asset-Inventar dürfen parallel laufen,
   weil sie den Look nicht festlegen. Alles, was CSS-Tokens oder Sektionen
   festschreibt, wartet.
2. **Drei Richtungen, jede mit benannter Achse** (Layout, Dichte, Tiefe,
   Motion), nie nur Farbe. Namen beschreiben («Dunkel mit Glow-Karten»,
   «Foto-Hero wie live, vertieft», «Editorial-Beweis wie seo-labs»), nie A/B/C.
   Eine Richtung ist immer **die Live-Seite oder Raphaels jüngste Referenz,
   sauber weitergebaut** (Sektor `clone-parity`), damit das Duell eine
   sichere Basis hat.
3. **Echte Zutaten:** freigegebene oder Working-Copy aus `PLAN.md`, echte
   Assets (Logo, Freisteller, Kundenlogos), echte Marken-Tokens aus
   `brand/DESIGN.md`. Kein Lorem, keine Platzhalterkästen.
4. **Referenzbilder als Bilder:** Jeder Duell-Leaf liest Raphaels
   Referenzbilder (Eingang, `handoff/referenzen/`) und die Referenz-Folds
   (`shots/ref-*-fold.png`) per Read und zitiert je Bild eine Zeile
   «gesehen: …» im Bericht. Prosa-Beschreibungen aus dem Plan ersetzen das
   nicht.
5. **Komponenten vor Eigenbau:** Glow-Card, Bento, Carousel, Connector/Beam,
   Number-Ticker, Marquee, Spotlight zuerst über
   `scripts/komponenten.mjs search` (Magic UI, Aceternity, React Bits, 21st)
   ziehen; Eigenbau nur mit Zeile «gesucht in …, nichts passte, weil …».
6. **Ein Leaf je Richtung, 25 Minuten: zwei `fable-builder` plus ein
   `opus-builder`** (Fable maximal zwei parallel, SKILL.md), disjunkte Routen `/duell/<slug>` im selben Workspace (oder drei
   HTML-Dateien ohne Dev-Server). Gates: typecheck, `detect.mjs`, Sweep
   1440×900 + 390×844.
7. **Sicht für Raphael in einem Bild:** Die drei Desktop-Folds nebeneinander
   und die drei Mobil-Folds nebeneinander als je ein PNG unter
   `/root/eingang/ausgang/<kunde>/fold-duell/` (Skript unten), per
   `SendUserFile` mit `display: render`, plus Tunnel-Link auf `/duell`.
   Zeitziel: erstes Bild ≤30 Minuten nach Auftrag.
8. **Raphael wählt oder mischt.** Seine Wahl geht wörtlich in `DECISIONS.md`
   im festen Format `- <Datum> · Raphael · GO: Fold-Duell <Richtung, Mischung>`
   (Listenzeile, GO als erstes Wort des Entscheidungsfelds, dann «Fold-Duell»;
   Tabellenform `| Datum | Raphael | GO | Fold-Duell … |` geht auch). Ein NEIN
   heisst `NO-GO: Fold-Duell …`, nie «GO … abgelehnt». Nur dieses Format öffnet
   `session-gate --rolle bau`; Fliesstext, «noch nicht GO», «kein GO» öffnen
   nicht) und als datierter Änderungsblock in
   `PLAN.md`; erst dann startet Welle 1. Bei «keine davon» ein zweites Duell mit
   seinen Worten als Achsen, nie stumm eine vierte Richtung raten.
9. **Nach der Wahl aufräumen:** Gewinner wird Design-System und Startseiten-
   Fold; `/duell/*` wird gelöscht, ausser Raphael will es behalten.

## Gates

```bash
node /root/raphael-skills/skills/eigene/web/scripts/session-gate.mjs --rolle fold-duell --client <handoff>
```
Exit 0 nur mit Abschnitt `## Fold-Duell` in `PLAN.md` (drei Zeilen
`slug | Achse | Referenzbilder | Copy-Quelle`). `--rolle bau` bleibt gesperrt,
bis `DECISIONS.md` eine GO-Zeile mit «Fold-Duell» trägt; die Plan-Session
startet die Duell-Leaves nicht selbst, sondern übergibt an die Bau-Phase, die
mit dem Duell beginnt (Drei-Phasen-Ordnung bleibt).

## Ablauf im Workflow-Script

```js
// Welle 0: Fold-Duell (vor jedem Routenpaket bei Neuaufbau/Redesign)
const RICHTUNGEN = [
  { slug: 'live-vertieft', achse: 'Tiefe', prompt: '…Live-Seite als Basis, Anthrazit, Team-Freisteller, Phones, mehr Tiefe im Hero…' },
  { slug: 'glow-karten',   achse: 'Layout', prompt: '…Raphaels Referenzbilder ref-01..03: 20px-Karten, Hairline, roter Glow, Connector…' },
  { slug: 'beweis-editorial', achse: 'Dichte', prompt: '…seo-labs/leadfluss-Struktur: Beweis als Artefakt, Typo-Hero mit echtem Artefakt rechts…' },
]
const BUILDER = ['fable-builder', 'fable-builder', 'opus-builder'] // Fable max zwei parallel
const folds = await parallel(RICHTUNGEN.map((r, i) => () => agent(
  `${LEAF}\n${COMMON}\nFOLD-DUELL Richtung «${r.slug}» (Achse ${r.achse}). Baue NUR den Fold plus die erste Beweis-Sektion unter /duell/${r.slug}. Lies zuerst per Read: ${WS}/handoff/referenzen/BILDLISTE.txt (jede Datei). Echte Copy aus COPY-1.md, echte Assets. Komponenten zuerst über node ${WEB}/scripts/komponenten.mjs search … ziehen. ${r.prompt}\nDann: typecheck, detect.mjs, shot-sweep --base … --routes /duell/${r.slug} --mobile --static --out ${WS}/shots/duell/${r.slug}. Bericht ${WS}/handoff/leaves/duell-${r.slug}.md mit Zeile «gesehen:» je Referenzbild und «Komponenten: …». Zeitbudget 25 Minuten.`,
  { label: `duell:${r.slug}`, phase: 'Fold-Duell', agentType: BUILDER[i], schema: RESULT })))
// Montage (kein Agent): node <web>/scripts/fold-duell-montage.mjs --shots <WS>/shots/duell --out /root/eingang/ausgang/<kunde>/fold-duell
// Exit 2 = eine Richtung ohne Desktop- oder Mobil-Fold: Richtung nachziehen, nicht Welle 1 starten.
return { phase: 'fold-duell', folds, montage: '/root/eingang/ausgang/<kunde>/fold-duell/desktop.png' }
// HARTER STOPP: Dieses Script endet hier. Welle 1 ist ein zweiter Workflow-Aufruf,
// den der Controller erst startet, wenn `session-gate.mjs --rolle bau` Exit 0 gibt
// (GO-Zeile «Fold-Duell» in DECISIONS.md). Kein `await` auf Raphael im Script.
```

Montage-Skript: `node scripts/fold-duell-montage.mjs --shots <dir> --out <dir>`
legt `desktop.png` (Folds je 1440 px breit nebeneinander, Slug-Label) und
`mobile.png` (390-Folds) ab. Exit 0 nur, wenn jede Richtung beide Folds hat;
Exit 2 nennt die fehlenden (`fehlend` im JSON).

## Bericht je Richtung (Pflichtfelder)

```
Richtung: <slug> · Achse: <…>
gesehen: ref-01 … (eine Zeile je Referenzbild)
Komponenten: @magicui/… (get) | Eigenbau <Name>: gesucht in @magicui,@aceternity, nichts passte, weil …
Tokens: Grund/Karte/Akzent/Display/Body (aus brand/DESIGN.md)
Gates: typecheck 0 · detect 0 · Shots <pfade>
offen: …
```

## Nie

- Ein Design-System oder eine Pattern-Bibliothek «schon mal vorbereiten».
- Die drei Richtungen aus Regeln (`stil-regeln.md`) statt aus Raphaels
  Referenzen ableiten; die Regeln sind Leitplanke, die Referenz ist Ziel.
- Das Duell im Parent montieren, indem der Parent PNGs liest: die Montage ist
  ein Skript, die Sicht ist Raphaels.
- Auf ein Judge-PASS warten, bevor Raphael die Folds sieht. Das Duell ist
  Raphaels Urteil, nicht das eines Kritikers.
