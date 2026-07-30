---
name: web
version: 0.7.0
description: >
  Dach-Skill für Websites/Landingpages (Loop 2): Strategie, Sitemap, Copy,
  Look/QA (design integriert), Build, QA, CRO-Learning, Website-Referenzen
  nachbauen, Bild-Rebuild, UI-Motion-Komponenten. Trigger: "Website bauen",
  "Landingpage", "Sitemap", "Website-QA", "CRO", "Design polieren",
  "Slop entfernen", "Referenzseite nachbauen", "Website clonen",
  "Popup/Lead-Magnet", "Screenshot nachbauen", "aus Bild bauen".
class: F
scope: agency
sensitivity: internal
loads:
  - references/loop2-ablauf.md
  - references/qa-faecher.md
  - references/screenshot-kritik-loop.md
  - references/landingpage-struktur.md
  - references/informationsarchitektur.md
  - references/web-clone-playbook.md
  - references/rebuild-from-image.md
  - references/bildgenerierung.md
  - references/ui-components/INDEX.md
  - references/motion-doktrin.md
  - references/ui-layouts-catalog.md
  - references/cro-diagnose.md
  - references/experiment-programm.md
  - references/conversion-elemente.md
  - references/code-qualitaets-checkliste.md
  - references/security-audit-playbook.md
  - references/domain-safe-browsing-checkliste.md
  - references/readonly-db-rolle.md
  - references/design-systeme-vergleich.md
  - references/radix-shadcn-tailwind-stack.md
  - references/bibliotheks-tresor.md
  - references/shadcn-arbeitsweise.md
  - references/motion-gsap.md
  - references/react-next-performance.md
  - references/varianten-picker.md
  - references/remotion-produktionsweg.md
  - references/templates/statistics-page-template.html
  - references/agentur-merkmale.md
  - references/orchestrierung.md
provenance: >
  Eigener Skill; der fremde Anteil ist vendoriert und in VENDORING.md dieses
  Skills belegt (beUI v2 / starc007, MIT, 114 Dateien, plus die weiteren dort
  gelisteten Quellen). Die Datei entstand am 30.07.2026, nachdem die
  Verweis-Pruefung fand, dass zwei Referenzen seit ihrer Entstehung eine
  Attribution zusagten, die es nicht gab.
requires_skills: [copywriting@^0, design@^0, eval@^0, impeccable@^0, taste@^0, ui-ux@^0]
# eval_scorecard — was dieser Skill belegen kann, nicht was er verspricht.
# Jede Zeile ist ein Lauf, der Exit 0 liefern muss; die Zahlen haelt
# evals/run-doku-zahlen.mjs gegen die echten Laeufe (sonst veralten sie hier
# genauso wie ueberall sonst).
eval_scorecard:
  stand: 2026-07-30
  laeufe:
    - "evals/run-antiset.mjs — 15 Faelle: reisst das Tor an jedem eingebauten Fehler?"
    - "evals/run-sabotage.mjs — 13 Faelle: merkt jede Eval, wenn ihr Pruefer kaputtgeht?"
    - "evals/run-eval-umfang.mjs — 25 Evals: hat jede noch ihre Faelle?"
    - "evals/run-doku-zahlen.mjs — 20 Zahlen: verspricht SKILL.md den echten Umfang?"
    - "evals/run-verweise-check.mjs — jeder Pfad, jeder loads-Eintrag, jede Versionsspanne"
    - "23 weitere Pruefer-Evals (craft, slop-de, tastatur, motion, formular, import, klon-gate …)"
  grenzen:
    - "pruefstand.mjs ist nicht sabotage-geprueft — er faellt kein Urteil, das gruen werden koennte"
    - "Ein gruener Lauf heisst 'die bekannten Fehler sind raus', nicht 'die Seite ist gut'"

completion_criteria:
  - "`node scripts/g1-gate.mjs --url <url> --src <projekt> --build <dist>` endet mit Exit 0 (G1, hart — Lighthouse, axe, tote Links, Slop, Craft, Formular, Importe, Motion, Sweep in einem Exit-Code). `--src` ist Pflicht: ohne Quelle bleiben Import- und Motion-Check ungelaufen, und uebersprungen ist nicht bestanden"
  - "Dieser Lauf ohne `--budget`. Mit gelockertem Budget ist Exit 0 kein Bestehen, sondern ein Vorbehalt — die Schlusszeile sagt dann `BESTANDEN MIT GELOCKERTEM BUDGET` und die Lockerung braucht eine schriftliche Begruendung"
  - "`node scripts/craft-check.mjs --url <url>` meldet 0 BLOCK (Agentur-Merkmale, belegt in references/agentur-merkmale.md)"
  - "Jede im Build genutzte UI-Library ist per `node scripts/lib-lookup.mjs <name>` nachgeschlagen; jeder Import steht in deren `Export:`-Zeile — maschinell erzwungen durch den Import-Check im G1-Tor, der dieselbe Quelle liest (references/bibliotheks-tresor.md)"
  - "`node scripts/formular-check.mjs --url <url>` meldet 0 BLOCK (richtiger input-type, Einfuegen nicht blockiert — im G1-Tor enthalten)"
  - "Formular-Reihenfolge: Kontaktdaten zuletzt (F6, WARN im Tor); Drop-off pro Slide gemessen (G1, hart)"
  - "G2 auf jedem Ship-Copy-Block >= 0.7"
  - "Launch nur mit Raphaels Signatur + Deploy-Egress-Gate"
  - "Bei Website-Referenz-Nachbau: Lizenz-Check aus web-clone-playbook.md dokumentiert vor Launch"
---

# web — Loop 2: Website

**Lies zuerst:**
`/root/clients/client-<name>/wiki/ICP.md`, `OFFER.md`, `PROOF.md`, `VOICE.md`
(Dossier aus Loop 1 — Pflicht), `/root/raphael-brain/wiki/hot.md`.
Für alles Visuelle → **design** (Art Direction, impeccable-QA).

**Lädt automatisch mit:** `design` (Wissensquelle: Doktrin, Detektoren,
beide Register-Linien) **und** `impeccable` (Kommandosprache + Craft-Floor)
**sowie** `taste` und `ui-ux` (Register-Router: taste = Landing/brand-Linie,
ui-ux = App/product-Linie — beide zeigen auf die Linien im design-Skill).

## Zweck (1 Satz)

Aus dem Dossier eine konversionsstarke, technisch fehlerfreie Website bauen und aus echten
Analytics verbessern.

## Screenshot-Pflicht (Raphael-Regel, hart — gilt fuer jede sichtbare Aenderung)

**Design wird NUR noch an Screenshots entschieden (Raphael 23.07.). Desktop zuerst.**
Fuer WEB-Seiten/URL-Routen ist `scripts/shot-sweep.mjs` das Standard-Werkzeug: First Fold
exakt 1440×730, danach 1440×1400 im 50-%-Schritt, echte Scroll-Events, NIEMALS
fullPage/captureBeyondViewport. Bei PDFs/Folien/Creatives gilt weiterhin: rendern
(z. B. pdftoppm) und jedes PNG per Read ansehen. Das Skript schreibt ein
`manifest.json` — Kritik-Agents bekommen ausschliesslich dieses Manifest + die PNGs,
keine selbst geratenen Pfade. Der vollstaendige Ablauf
(Sweep → eigenes Ansehen → Panel Sol/Sonnet/Kimi → verifizierte Fixliste → Fix →
Re-Sweep-Vergleich) steht in `references/screenshot-kritik-loop.md` und ist bei
jeder visuellen Arbeit verbindlich.

Nach JEDER Aenderung an Seiten/Folien/Creatives: Sweep fahren und jedes PNG
**per Read wirklich ansehen** — nicht nur erzeugen. Jedes Bild-Asset VOR dem Einbau
einzeln ansehen: Freisteller wirklich freigestellt (kein Hintergrund-Kasten),
richtiges Produkt/Motiv, Stil passt zu den Nachbar-Assets (sonst Higgsfield
`image_background_remover` bzw. neu generieren). Fehler fixen -> ERNEUT Sweep.
Erst fertig melden, wenn der letzte Zyklus sauber war. Diese Pflicht in jeden
Subagent-Prompt fuer visuelle Arbeit explizit hineinschreiben (inkl. absoluter
Pfade zum Skript und zum out-Verzeichnis). Bei PDF-Export zusaetzlich
`pdffonts <datei.pdf>` laufen lassen: Nur die CI-Fonts duerfen eingebettet sein
(Fallback auf Arimo/Roboto/Arial = Webfont war beim Headless-Render nicht da ->
Fonts lokal per `@font-face` buendeln, neu rendern).

**Nach JEDEM Fix ALLES nochmal pruefen, nicht nur die geaenderte Stelle.**
Wer einen Fehler fixt (Pfad, Layout, Bild-Quelle, CSS) und dann nur die
gefixte Seite anschaut, uebersieht dasselbe Problem auf den anderen Seiten.
Nach jedem Fix: ALLE Seiten/Assets erneut rendern und ansehen. Beispiel:
Bild-Pfad auf Seite 3 gefixt -> Seiten 1-11 alle nochmal ansehen, ob die
Bilder ueberall laden. Erst wenn ALLE Seiten sauber sind, ist die Arbeit
fertig.

## Das Auslieferungs-Tor (G1) — "fertig" ist ein Exit-Code

Vor jeder Auslieferung und vor jeder Fertig-Meldung läuft **ein** Befehl:

```bash
node scripts/g1-gate.mjs --url http://localhost:3000/ --src . --build dist
```

`--src` ist die **Quelle** (Import-Check), `--build` der ausgelieferte Ordner
(Slop-Scan, Routen-Zähler). Ohne `--build` sucht das Tor ihn selbst und schreibt in
den Bericht, welchen es genommen hat — Begründung unter „Quelle und Build sind nicht
derselbe Ordner".

Er bündelt Erreichbarkeit, Lighthouse (4 Kategorien), axe, tote Links, AI-Slop,
Craft-Check, Formular-Check, Import-Check, Motion-Check, Tastatur-Check und den
Screenshot-Sweep in einem einzigen Exit-Code:

- **Exit 0** — bestanden. Nur dann darf „fertig" gesagt werden.
- **Exit 1** — Qualität gerissen. Der Bericht nennt Kategorie und Ist/Soll.
- **Exit 2** — das Tor selbst ist kaputt (Server nicht erreichbar, Werkzeug fehlt).
  **Ausdrücklich kein Bestanden.** Ein Prüfer, der nicht laufen konnte, hat nichts geprüft.

Fehlende Werkzeuge meldet das Tor als SKIP, nie still als PASS. Wer einen SKIP sieht,
hat ein ungeprüftes Feld — kein grünes. **Und das Tor zählt selbst mit:** ist auch nur
**einer** der sieben Qualitäts-Prüfer (Lighthouse, axe, AI-Slop, Craft, Formular,
Motion, Tastatur) überhaupt nicht gelaufen, endet es mit Exit 2 statt Exit 0. Sonst hätte ein
Rechner ohne installierte Werkzeuge jede beliebige Seite mit „G1 BESTANDEN — 0 Checks
grün" durchgewinkt.

> Praktische Folge: **ohne `--src` ist kein grünes Tor mehr möglich.** Import- und
> Motion-Check brauchen die Quelle; ohne sie stehen sie als `[SKIP]` da, und
> übersprungen ist nicht bestanden. Wer nur `--url` übergibt, bekommt Exit 2 — nicht
> als Schikane, sondern weil zwei Fragen dann schlicht ungestellt blieben.

> Bis 27.07. reichten hier **zwei von vier**. Diese Schwelle war willkürlich: fehlten
> Lighthouse und der Slop-Scan, meldeten axe und Craft allein ein grünes Tor — Tempo,
> Suchmaschinen und KI-Tells waren schlicht ungeprüft. Jeder beantwortet eine
> eigene Frage, keiner vertritt einen anderen.

### Das Formular sah keiner der vier an

```bash
node scripts/formular-check.mjs --url <url>
```

Testfall 29.07.: eine Seite mit `<input type="text" name="e">` für die E-Mail-Adresse,
ohne `autocomplete`, ohne `inputmode`. **axe meldete 0 Violations** (31 Passes),
**craft-check meldete keinen einzigen Formular-Befund.** Beide haben recht — axe prüft
Zugänglichkeit, craft-check prüft Handwerk am Aussehen. Ob das Feld auf dem Telefon die
richtige Tastatur öffnet und ob der Passwortmanager es ausfüllt, fragte niemand.

Auf einer Landingpage ist das Formular die **einzige** Conversion. Ein E-Mail-Feld mit
Buchstabentastatur kostet mehr Leads als jeder Kontrastfehler, den alle vier Prüfer
zuverlässig finden.

| ID | Was | Stufe |
|---|---|---|
| F1 | E-Mail/Telefon/URL mit falschem `type` | **BLOCK** |
| F3 | `onpaste` verhindert Einfügen | **BLOCK** |
| F2 | Kontaktfeld ohne `autocomplete` | WARN |
| F4 | Eingabefeld unter 36px hoch | WARN |
| F5 | Feldschrift unter 16px (iOS zoomt beim Fokus) | WARN |
| F6 | Kontaktdaten vor den Sachfragen (`landingpage-struktur.md`) | WARN |
| F7 | kein submit-Knopf, oder beim Laden deaktiviert | WARN |

Regelherkunft: Vercel Web Interface Guidelines (Forms, Touch & Interaction,
Anti-patterns) plus Raphaels eigene Formular-Reihenfolge. Der Vercel-Skill holt seine
Regeln live per WebFetch — hier sind genau die **maschinell prüfbaren** fest verdrahtet,
damit das Tor ohne Netz urteilt. Was sich mit axe überschneiden würde (Label vorhanden,
Kontrast, Fokus), steht bewusst **nicht** drin: zwei Prüferstimmen zum selben Befund
machen ihn nicht wahrer, nur lauter.

Belegt in beide Richtungen: `a7-formular-kaputt` reißt an `formular`, und die
Kontroll-Fixture trägt seit demselben Tag ein **korrekt** gebautes Formular — ein
Wächter, der nur rot werden kann, wird nach dem dritten Fehlalarm abgeschaltet.

### Die Motion-Entscheidung war eine Bitte, kein Prüfer

```bash
node scripts/motion-check.mjs <projektordner>
```

Die Motion-Doktrin entscheidet den Kurven-Konflikt in Prosa: vendorierte Komponenten
behalten `[0.16, 1, 0.3, 1]`, neuer eigener Code nimmt `cubic-bezier(0.23, 1, 0.32, 1)`,
und *„beides im selben Projekt → eine wählen"*. Der letzte Satz ist der wichtige — und
genau er war unverbindlich. Nichts hat je nachgesehen.

Nachgemessen in der eigenen Komponentenbibliothek: **drei** Ease-Kurven statt der zwei
dokumentierten. Die dritte, `cubic-bezier(0.4, 0, 0.2, 1)` (Material-Default), stand in
keiner Doktrin-Zeile. Niemand hatte sie entschieden, sie war einfach da.

Das ist der typische Motion-Fehler: nicht eine falsche Kurve, sondern drei richtige
nebeneinander. Einzeln ist jede verteidigbar, zusammen ergeben sie keine Sprache. Ein
Auge sieht das erst, wenn zwei Elemente nebeneinander laufen — ein Zähler sofort.

| ID | Was | Stufe |
|---|---|---|
| M-motion-1 | drei oder mehr verschiedene Ease-Kurven | **BLOCK** |
| M-motion-1 | zwei Kurven (dokumentierte Übergangslage: vendoriert + eigen) | WARN |
| M-motion-3 | Animation ohne jede Reduced-Motion-Vorkehrung | **BLOCK** |
| M-motion-2 | nacktes `ease`/`ease-out`/`linear` — laut Doktrin zu schwach | WARN |

Liest **Quelltext**, keine URL: die Kurven stehen im CSS/TSX, im gerenderten DOM sind
sie als Werte nicht mehr sichtbar. Erkennt beide Schreibweisen — `cubic-bezier(…)` im
CSS und `ease: [0.16, 1, 0.3, 1]` in einer motion-Transition; ohne die zweite sieht der
Prüfer in einem React-Projekt fast nichts.

> **Reduced Motion hat zwei richtige Formen.** Die erste Fassung dieses Prüfers kannte
> nur `@media (prefers-reduced-motion)` und färbte damit die eigene Bibliothek rot — die
> löst es per `useReducedMotion()` in JS. Eine korrekte Umsetzung als Blocker zu melden
> ist schlimmer als gar nicht zu prüfen: nach dem dritten Fehlalarm schaltet man den
> Wächter ab, und dann schützt er auch im echten Fall nicht mehr.

Was er **nicht** prüft: ob eine Bewegung überhaupt sein sollte (Frequenz-Gate), ob die
Dauer zur Distanz passt, ob sie unterbrechbar ist. Das steht in
`design/references/motion-doktrin.md` und braucht Augen. Dieser Prüfer zählt nur, was
zählbar ist.

```bash
node evals/run-motion-check.mjs   # 15 Fälle: 4 müssen reißen, 5 durchgehen, 6 Verdrahtung
```

### axe prüft die Rolle, nicht das Versprechen

```bash
node scripts/tastatur-check.mjs <projektordner>
```

axe prüft, ob die ARIA-Rollen stimmen. Es prüft **nicht**, ob das Ding, das sich
`role="listbox"` nennt, auf Pfeiltasten reagiert. In der eigenen
Komponentenbibliothek gemessen: **7 von 10** zusammengesetzten Widgets hatten saubere
Rollen und keine Tastaturbedienung. `select.tsx` sind 411 Zeilen mit
`role="listbox"`, `role="option"` und ARIA-Attributen — und hatte null Pfeiltasten.

**Alle sieben sind seit 29.07.2026 repariert** (Pfeiltasten, Home/End, Escape,
Roving-Tabindex, Fokus folgt der Auswahl, Fokus-Rückgabe an den Auslöser).
`node scripts/tastatur-check.mjs references/ui-components` meldet 0 Blocker bei
10 gefundenen Widgets. Die Vergangenheitsform oben ist Absicht: der Befund bleibt
dokumentiert, weil er erklärt, warum es diesen Prüfer gibt — aber wer nur diesen
Abschnitt liest, soll nicht sieben offene Baustellen vermuten.

Die Rolle ist ein **Versprechen** an Screenreader-Nutzer: *hier kommt eine Listbox,
die kennst du.* Wer es gibt und die Tastatur nicht liefert, hat es schlimmer gemacht
als mit einem simplen `<select>` — der Nutzer weiß jetzt, was es sein sollte, und
kommt trotzdem nicht durch. axe meldet dazu 0 Violations, weil die Rollen ja stimmen.

| Rolle | verlangt mindestens | Stufe |
|---|---|---|
| `listbox`, `combobox`, `menu`, `tree` | Pfeil hoch **und** runter | **BLOCK** |
| `tablist`, `menubar`, `radiogroup` | eine Pfeil-Achse | **BLOCK** |
| `grid` | alle vier Pfeile | **BLOCK** |
| Overlays (`listbox`, `menu`, `dialog`) | Escape schließt | WARN |

> **Ein Nachbar ist kein Beleg.** Die erste Fassung zählte den ganzen Ordner als
> Nachweis. In dieser Bibliothek liegen 60 Komponenten flach nebeneinander, und
> `command-palette.tsx` belegt Pfeiltasten — damit galt die Bedingung für alle 60 als
> erfüllt, und der Prüfer meldete „alles gut" über sieben kaputte Widgets. Jetzt zählt
> die Datei **plus das, was sie tatsächlich importiert**: ein ausgelagerter
> `use-listbox-keys.ts` erfüllt die Bedingung, ein zufälliger Nachbar nicht.

Was er nicht kann: beurteilen, ob die Tastenlogik *richtig* ist — nur, ob sie da ist.
Ein Fund ist ein Blocker, ein Nicht-Fund kein Freispruch.

```bash
node evals/run-tastatur-check.mjs   # 18 Fälle: reißen, durchgehen, Overlay-Grenze, Verdrahtung
```

### Jeder Fehler dieser Runde saß in der Naht, nicht im Werkzeug

```bash
node evals/run-naht-check.mjs
```

Drei Befunde vom 29./30.07.2026, alle dieselbe Sorte:

- `visual-diff.mjs` rechnete eine Note von 5 bis 1 aus und endete **immer** mit
  Exit 0 — niemand hielt die Zahl gegen etwas.
- `audit-clone.mjs` fand vier Launch-Blocker (darunter einen Google-Tracker) und
  schrieb sie nur als Markdown. Das Klon-Tor erwartete JSON, das es nie gab.
- `slopNamen()` im G1-Tor war toter Code — von `slopTeilen()` abgelöst, aber
  liegen geblieben. Die zugehörige Eval schnitt sie sogar heraus und prüfte sie:
  eine Funktion, die das Tor nie aufruft.

**Jedes einzelne Werkzeug funktionierte.** Kaputt war die Stelle, an der zwei sich
berühren — und eine Eval mit selbstgebauten Eingaben sieht dort nie hin. Sie
prüft ein Werkzeug, nie die Verbindung. Deshalb dieser Prüfer:

| Was er prüft | Warum |
|---|---|
| kein toter Code in G1- und Klon-Tor | ein halb fertiger Umbau hat meist noch eine zweite Stelle |
| jeder `checkX()` wird aufgerufen | `motion-check` war fertig und lief nie |
| jeder Qualitäts-Prüfer steht in `QUALITAET` | sonst zählt das Tor ihn beim „ist überhaupt einer gelaufen?" nicht mit |
| jede herausgeschnittene Funktion existiert noch | sonst prüft die Eval ihre eigene Kopie weiter |
| jedes Werkzeug, dessen Urteil ein Tor liest, kann `--json` | ein Fund, den niemand abfragen kann, stoppt nichts |
| Klon-Tor und `audit-clone` benutzen denselben Feldnamen | beide Seiten der Naht in einer Prüfung |

> **Zwei eigene Fehlalarme beim Bauen**, beide aus Vermutungen darüber, wie
> etwas *aussieht* statt was es *tut*: Der Prüfer suchte die nackte Zeile
> `checkX();` und meldete `checkServer`/`checkSweep` als nie aufgerufen — die
> werden bedingt aufgerufen (`if (!checkServer())`), und das ist richtig so.
> Und er suchte alle Schnittmarken im G1-Tor, obwohl `run-clone-pfade` aus
> `mirror-site.mjs` schneidet. Jetzt zählt er Vorkommen statt Schreibweisen und
> liest nach, welche Datei eine Eval wirklich öffnet.

### 28 Handwerks-Regeln, 10 davon je einmal ausgelöst

```bash
node evals/run-craft-check.mjs           # 22 Fälle, Kontrolle inbegriffen
node evals/run-craft-check.mjs --nur M6  # eine Regel einzeln
```

`craft-check.mjs` hat **23 echte Pruefstellen**. Wie viele davon jemals angeschlagen
haben, wusste niemand — bis es gemessen wurde, indem jede Anti-Set-Fixture einzeln
durch den Prüfer lief:

```
_basis T5 · a1 T1,T2,T5 · a2 T5,T8,T9 · a3 M13,T5
a4 M17,T5 · a5 M11,T5 · a6 M24,T5 · a8 T5
```

**Neun Regeln belegt, vierzehn nie.** Das ist kein Beweis, dass sie falsch sind — aber
auch keiner, dass sie funktionieren. Eine Regel ohne Fixture steht in der Liste, taucht
im Bericht nie auf, und beim nächsten Umbau des Prüfers fällt ihr Ausfall nicht auf.

> **Die Zahl 28 stand hier zuerst und war falsch.** Sie kam aus einem grep über die
> ganze Datei und zählte Kommentar-Erwähnungen mit: M7, M25 und T10 erschienen als
> „ungeprüft", obwohl es für sie gar keine `add()`-Stelle gibt — M25 ist laut Doktrin
> ausdrücklich *„inhaltlich, nicht messbar"*. Eine Abdeckungszahl, die zu **niedrig**
> lügt, kostet genauso Zeit wie eine, die zu hoch lügt: man sucht Fixtures für Regeln,
> die es nicht gibt.

Die Eval baut pro Regel eine winzige Seite mit **genau diesem einen** Fehler und läuft
über `file://` — kein Server nötig, nur Chrome. Sie deckt inzwischen **alle 23** ab,
prüft zusätzlich die BLOCK-Stufe der zehn Blocker-Regeln und **nennt jede Ausnahme
namentlich**, statt eine runde Zahl wie volle Abdeckung aussehen zu lassen.

> **Die Kontrollseite ist der wichtigste Fall, und sie steht zuerst.** Mein erstes
> Grundgerüst meldete `M23` (fehlende `meta description`) und `M4` (keine Überschrift mit
> `text-wrap: balance`). Beide Befunde waren korrekt — mein Gerüst war unvollständig,
> nicht der Prüfer. Erst als es alle Regeln erfüllte, wurden `M23` und `M4` überhaupt
> testbar: man nimmt die eine Zeile wieder heraus und prüft, dass es auffällt.
> Ein zweiter eigener Fehler derselben Art: `M11` (Rahmen **und** Schatten) griff nicht,
> weil die Regel ab **drei** solchen Kästen feuert und mein Testfall einen hatte.

```bash
node evals/run-formular-check.mjs      # 17 Fälle, jeder ändert genau einen Umstand
```

**Was eine Heuristik falsch machen kann, macht sie auch — in beide Richtungen.**
Der Prüfer erkennt Kontaktfelder an ihrer Beschriftung. Der erste Erkennungstest
fand zwei Übersehen-Fälle (`aria-labelledby` wurde nicht gelesen; „Telefonnummer"
scheiterte an der Wortgrenze, weil Deutsch Komposita bildet). Die Lockerung auf
offene Wortanfänge erzeugte prompt die Gegenrichtung: „Mobiliar" wurde als
Telefonfeld gemeldet. Fünf der 14 Fälle dürfen deshalb **nicht** anschlagen.

Ein Roast-Durchgang durch Sol (Regel 18, andere Modellfamilie, Auftrag mit genau
einer Richtung — *„finde Wege, auf denen ein kaputtes Formular grün gemeldet
wird"*) fand sechs weitere. Alle sind zu und im Eval festgenagelt:

| Weg zu falschem Grün | Warum es durchging |
|---|---|
| Formular im **Shadow DOM** | `querySelectorAll` steigt nicht ein — bei eingekauften Booking-/CRM-Widgets der Normalfall |
| `<form style="display:contents">` | hat keine eigene Box, fiel aus der Sichtbarkeitsprüfung und damit aus F6 **und** F7 |
| Formular **ohne `<form>`-Tag** | F6/F7 liefen nur über `querySelectorAll('form')`; React-Widgets senden per `fetch()` |
| `<button type="submit" hidden>` | erfüllte F7, obwohl für den Besucher kein Knopf da ist |
| `type="file"` auf dem E-Mail-Feld | stand in der Ausschlussliste und verdeckte genau den Fehler, den F1 sucht |
| `addEventListener('paste', …)` | F3 las nur das Attribut. Wird jetzt **ausprobiert** statt gesucht — echtes Event, `defaultPrevented` lesen |

Bewusst offen: wer die DOM-APIs der eigenen Seite manipuliert, um das eigene Tor
zu täuschen, ist kein Bedrohungsmodell für dieses Werkzeug. Erst nach Klick
sichtbare Felder und per CSS `order` umsortierte Reihenfolgen brauchen einen
Interaktions-Durchlauf — eigene Runde, hier ehrlich als ungeprüft vermerkt.

**Lighthouse-Performance misst die Maschine mit.** Dieselbe unveränderte Testseite
lieferte am 28.07. einmal 92 und einmal 72 — nur weil der VPS zwischendurch unter
Last stand. Auf einem beschäftigten Rechner ist ein Performance-Rot deshalb erst ein
Befund, wenn er sich bei ruhiger Maschine wiederholt. Die anderen drei Kategorien
(accessibility, best-practices, seo) sind deterministisch und gelten sofort.

Drei Läufe belegen, dass das Tor unterscheidet — dieselbe Seite, drei Umgebungen:

| Lauf | Ergebnis | Exit |
|---|---|---|
| Beweis-Build, alle Werkzeuge da | 7 Checks grün | **0** |
| dieselbe Seite ohne die Mobile-Umbruch-Regel | craft/ gerissen, 2× M13 | **1** |
| dieselbe Seite, Werkzeuge nicht auffindbar | 1 von 4 Prüfern gelaufen | **2** |

> Diese drei Läufe stammen vom 27./28.07., als das Tor vier Qualitäts-Prüfer hatte.
> Seit dem Formular-Check sind es fünf; die Zeile „7 Checks grün" wäre heute eine
> andere Zahl. Der belastbare, täglich wiederholte Beweis ist ohnehin das Anti-Set
> (`node evals/run-antiset.mjs`, 11 Fälle) — es prüft jede Richtung einzeln, statt
> einmalig eine Gesamtzahl festzuhalten. Der Beweis-Build hat selbst kein Formular
> und kein Bild und würde heute an M24 reißen: er ist ein Zeitdokument, kein
> Zielbild. Wer eine aktuelle Referenz braucht, nimmt `evals/antiset/_basis.html`.

### Der Prüfstand muss sich verhalten wie die Produktion

```bash
node scripts/pruefstand.mjs --dir dist --port 5399          # servieren
node scripts/pruefstand.mjs --dir dist --routen             # nur die Routenliste
```

**Nie `python3 -m http.server` für einen Build, der auf Vercel läuft.** Am
28.07. meldete das Tor an einer echten Kundenseite **172 tote Links**. Kein
einziger war echt: die Seite läuft mit `cleanUrls: true`, `/team` liefert dort
`team.html`. Der nackte Dateiserver kennt diese Regel nicht und antwortete 404.

Falsches Rot ist auf Dauer genauso schädlich wie falsches Grün — nach dem dritten
Fehlalarm schaut niemand mehr hin. Der Prüfstand liest darum `vercel.json` und
wendet `cleanUrls`, `redirects` und `rewrites` an, bevor er urteilen lässt. Eine
SPA-Auffangregel hat er bewusst **nicht**: die macht aus jedem toten Link eine
200-Antwort und schaltet die Link-Prüfung praktisch ab.

```bash
node evals/run-pruefstand.mjs      # 10 Fälle, braucht keinen Browser
```

Ein Werkzeug, das andere Werkzeuge vor Fehlalarm schützt, ist selbst die neue
Schwachstelle: sagt es fälschlich 200, verschwindet ein echter toter Link
ungesehen. Der Lauf prüft beide Richtungen — `cleanUrls`, Ordner-Index und
Wildcard-Redirects müssen greifen, tote Links müssen **404 bleiben**, ohne
`vercel.json` darf `cleanUrls` nicht stillschweigend anspringen, und `/../` darf
nicht aus dem Build-Ordner ausbrechen.

Der erste Lauf fand sofort einen echten Fehler: in `zuRegex` fehlten `*` und `(`
in der Escape-Klasse, aus `(.*)` wurde `(\.*)` — ein Muster, das nur auf Punkte
passt. **Jeder Wildcard-Redirect war still wirkungslos.** Der Prüfstand hatte
also genau den Fehlertyp, gegen den er gebaut wurde.

### Erfundene Imports fallen vor dem Build auf

Läuft seit dem 29.07.2026 **im Tor mit** (`--src` genügt), einzeln aufrufbar mit:

```bash
node scripts/import-check.mjs --src .
```

**`--src` ist Pflicht, nicht Kür.** Ein blanker Pfad
(`import-check.mjs /pfad/projekt`) wurde bis zum 30.07.2026 still verworfen:
geprüft wurde der Ordner, in dem man gerade stand, und darüber kam Exit 0 —
ein grünes Urteil über ein Projekt, das der Prüfer nie gesehen hat. Er bricht
jetzt mit Exit 2 ab und nennt die richtige Form.

Davor war er ein Angebot, kein Tor: die Regel „erst `lib-lookup`, dann
importieren" stand als Prosa-Bitte da, obwohl sie maschinell prüfbar ist
(Doktrin-Regel 11 — erzwingen statt erbitten). Er ist der einzige Prüfer, der
nicht die laufende Seite liest, sondern den Quellcode; ohne `--src` erscheint er
als SKIP. Deshalb zählt er **nicht** zu den fünf Pflicht-Familien — sonst würde
aus einem fehlenden Argument ein Exit 2. Zwei Anti-Set-Fälle belegen beide
Richtungen: `import-erfunden` → Exit 1, `import-echt` → Exit 0.

Modelle erfinden Exportnamen. `import { ToastProvider } from 'sonner'` sieht
plausibel aus und existiert nicht — in TypeScript stirbt der Build, in JavaScript
ist die Komponente zur Laufzeit `undefined` und die Seite bleibt still leer. Das
Skript vergleicht jeden benannten Import gegen die echten Typdeklarationen im
Tresor (`/root/tools/uikit-vault`, per `UIKIT_VAULT` umstellbar).

Es urteilt nur, wo es sicher ist: Bleibt eine Weiterleitung offen oder findet
sich keine Typdatei, gilt der Importpfad als **unprüfbar** und wird still
übersprungen — nie als „Import existiert nicht" gemeldet. Exit 2 heißt „Prüfer
selbst kaputt" (Tresor fehlt), ausdrücklich kein Bestanden.

**Prüfer und Nachschlagewerk lesen aus derselben Quelle** (`scripts/lib-exporte.mjs`).
Das ist kein Aufräumen, sondern die Reparatur eines Lochs: Bis zum 29.07.2026 löste
`import-check` Exporte selbst auf, schwächer als `lib-lookup` — und schwieg damit
zu genau den Fällen, für die der Tresor gebaut wurde.

| Was der Prüfer nicht ansah | Folge |
|---|---|
| Jede Library mit `export * from` | `zustand`, `date-fns`, `motion`, `leva`, `clsx`, `gsap` — **6 von 30** nie geprüft |
| Jeden Unterpfad (`motion/react`) | Der einzige Motion-Pfad, den dieser Skill lehrt (75× in den References) |
| Verschachtelte `exports`-Bedingungen | Bei `clsx` die CommonJS-Datei statt der ESM-Datei gelesen |

Die ersten beiden waren falsches Grün: ein erfundener `import { gibtEsNicht }
from 'zustand'` kam durch, und darunter stand „Kein erfundener Import". Der
dritte war falsches Rot — `import { clsx } from "clsx"` im **eigenen**
`lib/utils.ts` des Skills wurde als erfunden gemeldet.

```bash
node evals/run-import-check.mjs
```

17 Fälle, Exit 0: sieben erfundene Namen, die auffallen **müssen**, neun echte
Importe, die durchgehen müssen, plus die eigene Komponenten-Bibliothek als
Flächenprobe (314 echte Importe in 113 Dateien). Die Flächenprobe hat eine
Untergrenze — unter 200 geprüften Importen wird sie rot, sonst wäre ein Prüfer,
der alles überspringt, hier grün. Beide Fixes sind rückwärts belegt:
Subpfad-Fix zurückgedreht → 3 rot, Bedingungs-Fix zurückgedreht → 1 rot.

### Grün für eine Seite ist kein Grün für die Website

`--routes` steht ohne Angabe auf `/`. Derselbe Build hatte **28 Seiten** — geprüft
wurde eine, gemeldet wurde grün fürs Ganze. Die anderen 27 waren nicht bestanden,
sie waren ungesehen.

Mit `--src` merkt das Tor das jetzt selbst: es vergleicht die genannten `--routes`
mit den Seiten im Build. Bleibt eine übrig → **Exit 2**, nicht Exit 0. Es wählt die
Routen nicht selbst aus, es weigert sich nur, stillschweigend für Unbesehenes zu
bürgen. Vollständige Liste: `node scripts/pruefstand.mjs --dir <build> --routen`.

> Die erste Fassung fragte nur, **ob** `--routes` gesetzt ist. Wer 2 von 28 Seiten
> nannte, bekam Grün fürs Ganze — dieselbe Lücke, eine Ebene tiefer. Eine Regel, die
> nur die nackte Anwesenheit einer Angabe prüft, prüft in Wahrheit gar nichts.

### Wer prüft den Prüfer

```bash
node evals/run-antiset.mjs
```

Unter `evals/antiset/` liegt siebenmal **dieselbe** saubere Seite: einmal als
Kontrolle, sechsmal mit je **genau einem** eingebauten Fehler. Der Lauf besteht nur,
wenn die Kontrolle durchgeht **und** jede kaputte Fixture am erwarteten Check reißt —
nicht an einem anderen und nicht an gar keinem.

Ein Tor, das nie grün wird, ist genauso nutzlos wie eins, das nie rot wird. Nur der
Unterschied ist der Beweis. `a5` prüft zusätzlich den Schweregrad: Ghost-Card und
Springy-Hover sind laut Doktrin WARN und dürfen im Normallauf **nicht** blocken,
müssen aber mit `--strict` rot werden.

Dazu sechs Fälle anderer Bauform, weil sie mehr als eine Seite brauchen: drei für
den Routen-Wächter (keine, halbe, alle Routen genannt) und zwei für den
Import-Check (erfundener vs. echter Import) — **13 Fälle, Exit 0**. Der Lauf
dauert rund sechs Minuten; das ist der teuerste Prüfstand im Skill und der
einzige, der das echte Tor gegen echte Seiten fährt.

Das hat sich sofort gelohnt: Der erste Lauf legte zwei Bugs frei, die vorher grün
gemeldet hatten. `ai-slop` zählte vier gefundene Tells als null (der Scanner liefert
`hits` als Zahl, nicht als Liste), und `--strict` war wirkungslos, weil das Gate den
Exit-Code des Craft-Prüfers wegwarf. **Beide Fehler zeigten sich nur in Richtung
falsches Grün** — die Richtung, die ein Gate nie haben darf.

Unter `evals/briefings/` liegen fünf Aufträge als Gegenstück (Handwerk, B2B-SaaS,
Beratung, Produkt, Relaunch). Sie messen nicht das Tor, sondern das Ergebnis: jedes
Briefing endet mit prüfbaren Kriterien, nicht mit „wirkt professionell".

### Das Anti-Set findet nur, woran gedacht wurde

Es prüft die Fälle, für die jemand eine Fixture gebaut hat. Es prüft **nicht**, was
passiert, wenn ein Werkzeug mitten im Lauf stirbt — dafür bräuchte es eine Fixture pro
Absturzart. Diese Lücke schließt ein zweiter, andersartiger Prüfschritt: ein Auditor
aus einer **fremden Modellfamilie** liest die Skripte mit genau einem Auftrag —
*„finde Wege, auf denen ein kaputtes Ergebnis grün gemeldet wird"*. Nur diese Richtung.
Falsches Rot darf er ignorieren.

Der Lauf vom 27.07. brachte elf Befunde, davon neun **derselbe Fehler an neun Stellen**:

```js
const violations = parsed.violations || [];   // ← stirbt das Werkzeug, ist das "0 Probleme"
```

`|| []` macht aus einer fehlenden Antwort eine leere Liste — und aus einem Absturz
eine Bestnote. Ersetzt durch einen Helfer `liste(parsed, feld, werkzeug)`, der wirft,
wenn das Feld fehlt oder keine Liste ist. **Fehlendes Feld ist nicht dasselbe wie
leeres Feld.** Der Aufrufer fängt das ohnehin und meldet ehrlich „Ausgabe unlesbar".

Dieselbe Denkart in drei weiteren Ecken:

| Stelle | vorher grün, obwohl… |
|---|---|
| Lighthouse-Score fehlt | Kategorie wurde als `?` gedruckt und nicht gewertet |
| Screenshot-Sweep bei HTTP 500 | Fehlerseiten wurden hübsch fotografiert und gezählt |
| Screenshot-Sweep bei weißer Seite | leere Bilder bestehen jede Prüfung, weil niemand hineinsieht |

Der Sweep verlangt jetzt vor dem ersten Auslöser mindestens 40 Zeichen Text und
10 Elemente im Body. Eine App, die nicht hydratisiert, liefert damit einen ehrlichen
Fehler statt einer Serie weißer PNGs.

Aus dem Befund wurde ein dauerhafter Prüfschritt — sonst schleicht sich `|| []` beim
nächsten Umbau wieder ein:

```bash
node evals/run-kaputte-ausgaben.mjs     # braucht weder Browser noch Server, läuft in Sekunden
```

Er füttert die Auswertung mit neun Antworten, wie ein sterbendes Werkzeug sie liefert
(`{}`, `null`, `0`, `"Segmentation fault"`, fehlendes Feld) und verlangt, dass keine
davon als „0 Probleme" durchgeht. Dazu zwei **echte** leere Antworten, die durchgehen
müssen — sonst hätte man das Tor nur in die andere Richtung kaputtgemacht.

**Merksatz:** Das Anti-Set prüft, ob das Tor Fehler *erkennt*. Dieser Lauf prüft, ob
das Tor einen Absturz *überlebt*. Beides ist nötig, und der Anstoß dazu muss aus
anderer Hand kommen als der Code selbst (Regel 8).

### Ein neuer Blocker braucht am selben Tag seine Fixture

Am 27.07. bekam `craft-check.mjs` den M24-Blocker („kein einziges Bild über
Icon-Größe"). Am selben Tag bekamen **alle sechs** Fixtures ein Bild — sonst wäre die
Kontrolle daran gerissen. Damit prüfte das Anti-Set den neuen Blocker nicht mehr: es
gab keine bildlose Seite mehr. Der Blocker war scharf, aber ungeprüft — niemand hätte
gemerkt, wenn er nie auslöst.

`a6-ohne-bildwelt.html` schließt das. Sie ist eine Kopie der Kontrolle, aus der genau
eine Zeile entfernt wurde. Das ist die Bauform für jede Fixture:

> **Eine Fixture ändert genau einen Umstand gegenüber `_basis.html`.** Reißt sie an
> zwei Checks, weiß man nicht, welcher der beiden den Fehler wirklich sieht.

**Regel:** Wer einen BLOCK-Befund einbaut, baut im selben Zug die Fixture, die ihn
auslöst, und trägt sie in `ERWARTET` ein. Ein Blocker ohne Fixture ist eine Behauptung.

Und die Fixture muss **beide** Richtungen abdecken. Der Routen-Wächter hatte zuerst
nur den Fall „`--routes` fehlt ganz". Damit war die eigentliche Lücke ungeprüft — 2
von 28 Seiten nennen und Grün bekommen — und der Fall „alle Routen genannt, darf grün
werden" ebenfalls. Ein Wächter, der nie grün wird, wird nach dem dritten Fehlalarm
abgeschaltet. `ROUTEN_FAELLE` in `run-antiset.mjs` prüft darum alle drei Ausgänge.

Das prüft aber nur, **ob** der Wächter blockt — nicht, ob er die richtigen Seiten
zählt. Beides kann getrennt kaputtgehen, und der zweite Fall ist der leisere: zählt
`seitenImBuild` eine Seite nicht mit, gilt sie als bestanden, obwohl sie niemand
geöffnet hat. Der Wächter meldet dann grün und liegt falsch, ohne je rot geworden zu
sein.

```bash
node evals/run-routen-check.mjs      # 15 Fälle, weder Browser noch Server
```

Er baut einen Testordner, wie ihn ein echter Build hinterlässt, und verlangt beide
Richtungen: `/`, `/impressum`, `/team`, `/leistungen`, `/leistungen/sanierung` müssen
gefunden werden — `404.html`, `assets/`, `robots.txt`, `sitemap.xml`, `node_modules/`
dürfen es nicht. Dazu die Gegenprobe, dass ein unlesbarer Ordner **laut** scheitert
statt eine leere Liste zurückzugeben; leer hieße „Build ohne Unterseiten", und das
wäre stilles Grün für eine Website, die das Tor nie gesehen hat.

### `--budget` war die offene Hintertür

Jeder Prüfer im Tor liest sein Limit aus `BUDGET`. Und `BUDGET` kommt aus einer Datei,
die der Aufrufer selbst mitbringt. Damit ist `--budget` die einzige Stelle, an der man
dem Tor *sagen* darf, weniger streng zu sein — und sie war bis zum 29.07. die einzige
Eingabe ohne jede Prüfung. Drei Wege zu falschem Grün lagen offen:

| Eingabe | vorher | jetzt |
|---|---|---|
| `{"axeViolation": 99}` (ein Buchstabe fehlt) | still ignoriert, Lauf geht weiter | Exit 2, erlaubte Schlüssel werden aufgelistet |
| kaputtes JSON, fehlende Datei, `[1,2]`, `"5"` | nackter Stacktrace, **Exit 1** | Exit 2 mit Klartext |
| `{"lighthousePerformance": 0}` | grün, ohne dass irgendwo steht warum | grün, aber `G1 BESTANDEN MIT GELOCKERTEM BUDGET` |

Der zweite Punkt ist der heimtückische: Exit 1 heißt in diesem Tor **„Qualität
gerissen"**. Ein Werkzeugfehler tarnte sich als Befund über die Seite. Werkzeugfehler
ist Exit 2 — das ist der ganze Unterschied zwischen „die Seite ist schlecht" und „ich
konnte nicht urteilen".

Der dritte ist der teuerste. Ein erkauftes Grün sah aus wie ein verdientes. Wer den
Report las, sah `G1 BESTANDEN` und nicht, dass jemand das Tempo-Limit auf null gesetzt
hatte. Jetzt steht die Lockerung in der Kopfzeile, in der Schlusszeile und im
`g1-report.json` (`budgetGelockert`).

```bash
node evals/run-budget-check.mjs      # 23 Fälle, weder Browser noch Server
```

Elf Eingaben, die stoppen müssen. Sieben, die durchgehen müssen (inkl. `_`-Kommentare
und legitimer Lockerungen). Fünf Prüfungen auf die Standardwerte selbst — hätte jemand
`DEFAULT_BUDGET` aufgeweicht, wären alle anderen Fälle weiterhin grün und das Tor
trotzdem stumpf.

**Gegenprobe gefahren:** Mit der alten Fassung von `budgetLaden` meldet derselbe Lauf
**9/23, Exit 1**. Ein Prüfstand, der nie rot wird, beweist nichts — dieser wird rot.

### Ein Sweep ohne Bilder bestand jede Prüfung

Der Screenshot-Sweep ist die Grundlage der ganzen Sichtprüfung: was er nicht
fotografiert, sieht der Panel-Schritt nie. Sein Urteil im Tor hing bis zum 29.07. an
einer einzigen Frage — steht in irgendeiner Route ein `error`? Alles andere galt als
in Ordnung, auch das Gegenteil von Ordnung:

| Manifest | altes Urteil |
|---|---|
| `{routes: []}` — gar keine Route drin | **bestanden**, „0 Screenshots" |
| Route mit `shots: []` | **bestanden**, „0 Screenshots" |
| 1 von 3 verlangten Routen im Manifest | **bestanden**, „1 Screenshots" |
| `shots` nennt eine Datei, die es nicht gibt | **bestanden**, „1 Screenshots" |

Alle vier sind derselbe Fehler wie überall in dieser Woche: **nichts gefunden** und
**nicht nachgesehen** ergaben dieselbe Zahl. Ein leeres Bild besteht jede Prüfung,
weil es nichts zu beanstanden gibt.

`sweepMaengel()` prüft jetzt vier Dinge statt einem: gemeldete Fehler, jede verlangte
Route im Manifest, mindestens ein Bild pro Route, und jede genannte Datei tatsächlich
auf der Platte. Ein Dateiname im Manifest ist eine Behauptung — nachsehen kostet nichts.

```bash
node evals/run-sweep-check.mjs       # 14 Fälle, weder Browser noch Server
```

Sieben Manifeste, die reißen müssen. Drei, die durchgehen müssen — darunter derselbe
Pfad mit und ohne Schrägstrich am Ende und dieselbe Route zweimal (Desktop + Mobile),
sonst wäre das Tor nur in die andere Richtung kaputt. Drei unlesbare Manifeste, die
über `liste()` **werfen** müssen statt still „keine Mängel" zu ergeben.

**Gegenprobe gefahren:** Die alte Urteilslogik, isoliert nachgebaut, lässt alle vier
Manifeste aus der Tabelle als grün durch. Der Fund war echt, nicht behauptet.

### „0 Links, 0 tot" hieß: linkinator hat nichts gesehen

Derselbe Fehler, eine Zeile weiter oben im Tor. Der Aufruf trug `--silent` — und das
Flag unterdrückt bei linkinator die **funktionierenden** Links. Übrig bleibt nur, was
kaputt ist. Auf einer sauberen Seite ist die Antwort deshalb immer `{"links": []}`.

Das Gate las diese leere Liste als Ergebnis und meldete `0 Links, 0 tot` — **bestanden**.
Dieselbe Zeile käme heraus, wenn linkinator die Seite nie geöffnet hätte, wenn der
Server tot wäre, wenn die URL falsch wäre. Nachgemessen an der Kontroll-Fixture: vier
`href`-Attribute im Quelltext, Tor meldete null geprüfte Links.

> **Ein Prüfer, dessen Bestanden-Meldung von seinem Nicht-gelaufen-Zustand
> ununterscheidbar ist, prüft nichts.** Das ist der schärfste Test für jeden Check im
> Tor: sähe seine Erfolgsmeldung anders aus, wenn er gar nicht gelaufen wäre?

Behoben: `--silent` ist weg, und eine leere Liste gilt als kaputter Lauf. Ohne das Flag
liefert dieselbe Seite zwei Links mit `state: 'OK'` — es gibt also immer mindestens
einen, nämlich die Startseite selbst.

```bash
node evals/run-link-check.mjs        # 10 Fälle, weder Browser noch Server noch linkinator
```

Vier Ausgaben, die reißen müssen (leere Liste zweimal, ein toter Link, nur tote). Drei,
die durchgehen müssen — darunter `state: 'SKIPPED'` für `mailto:`, das kein toter Link
ist. Drei unlesbare, die werfen müssen.

**Am echten Werkzeug gegengeprüft, beide Richtungen:** saubere Seite → `2 Links geprüft,
0 tot`, Exit 0. Derselbe Ordner mit einem eingebauten toten Link → `1 von 3 tot`, Exit 1.

### Dieselbe Frage an jeden Check gestellt

Der Link-Fund war kein Einzelfall, sondern eine **Frage, die man an jeden Prüfer stellen
kann**. Direkt danach durchgemessen — alle acht Checks des Tores mit einer leeren
Eingabe gefüttert und nachgesehen, was sie melden:

| Prüfer | leere Eingabe | altes Urteil |
|---|---|---|
| `links` | Seite mit 4 `href` | „0 Links, 0 tot" → **bestanden** |
| `ai-slop` | Ordner ohne HTML-Datei | „0 Slop-Tells" → **bestanden** |
| `ai-slop` | deutsche Floskel-Seite | „0 Slop-Tells" → **bestanden** (Regeln nur englisch, s.u.) |
| `formular` | Seite ohne Formular | „0 Blocker, 0 Warnungen" → **bestanden** |
| `lighthouse` / `axe` / `craft` | Route existiert nicht | „Navigation fehlgeschlagen" → reißt korrekt |
| `axe` | Tag-Liste unbekannt | „0 Violations" → **bestanden** (siehe unten) |
| `shot-sweep` | leeres Manifest | seit heute früh behoben |

Drei von acht meldeten Bestanden für einen Lauf, der nichts angesehen hatte. Die anderen
reißen, weil sie an einer echten Navigation hängen — die scheitert sichtbar.

Beim `ai-slop` ist der praktische Fall häufig: `--src` zeigt auf den Quell- statt den
Build-Ordner, auf ein noch leeres `dist/` oder auf einen Tippfehler. Der Scanner meldet
dann brav `filesScanned: 0`, und genau dieses Feld hat das Gate nie gelesen.

Beim `formular` ist eine Seite ohne Formular **nicht kaputt** — Impressum, Datenschutz,
eine Über-uns-Seite haben legitim keines. Der Prüfer sagt das mit `F0`. Falsch war nur,
dass das Gate es verschwieg und `0 Blocker` meldete. Jetzt steht dort *„kein Formular auf
dieser Seite — nichts zu prüfen"*: dieselbe Farbe, aber die Wahrheit.

Beim `ai-slop` gibt es eine zweite, unabhängige Art von Blindheit: der Scanner las die
Seite zwar, aber in der falschen Sprache. Deutsche Floskeln standen in keiner seiner 33
Regeln. Das ist der schlimmere Fall, weil `filesScanned` dabei stimmt — es sah nach einem
echten, sauberen Lauf aus. Behoben über `design/scripts/rules.de.mjs` (Abschnitt
„Deutscher Text: der Scanner braucht den deutschen Regelsatz").

```bash
node evals/run-slop-check.mjs        # 9 Fälle, weder Browser noch Server noch Scanner
node evals/run-slop-de-check.mjs     # 50 Fälle in 0,4s: Treffer, Gegenproben, Einstufung, Laufzeit
node evals/run-sabotage.mjs          # merken die Evals, wenn ihr Prüfer kaputtgeht?
node evals/run-eval-umfang.mjs       # hat jede Eval überhaupt noch ihre Fälle?
```

> **Evals starten einen Prozess, nicht fünfzig.** Die erste Fassung von
> `run-slop-de-check.mjs` rief den Scanner einmal pro Testfall auf. Unter Last
> (Load 100 auf diesem VPS) lief sie über zehn Minuten und wurde zweimal vom
> Zeitlimit abgeschossen — eine Eval, die niemand zu Ende laufen lässt, prüft
> nichts. Alle Sätze in eine Datei, ein Lauf, Zuordnung über die Zeilennummer:
> **0,4 Sekunden**, gleiche Aussagekraft. Gilt für jede neue Eval hier.

Sechs Ausgaben, die reißen müssen — darunter drei ältere, bereits behobene Fehler als
Regressionsschutz (`hits: 0` bei voller Fundliste, `hits: 1` bei leerer, ID als Zahl
statt `"01"`). Drei, die durchgehen müssen, darunter eine Scanner-Version ganz **ohne**
`filesScanned` — sonst hätte der neue Blocker ältere Werkzeuge falsch rot gemacht.

### Ein Tippfehler legte die halbe Barrierefreiheits-Prüfung still

Die Frage von oben ein drittes Mal gestellt, diesmal an `axe` — und sie hat wieder
etwas gefunden. `axe.run(document, {runOnly: {type: 'tag', values: [...]}})` prüft
die Liste **auf Leere**, aber nicht **auf Existenz** der Namen. Ein unbekannter Tag
wirft nicht; seine Regeln fallen einfach weg.

Am 29.07. an einer Seite mit vier echten Fehlern (Bild ohne `alt`, Link ohne Namen)
gemessen:

| Tag-Liste | Regeln gelaufen | Violations | Exit |
|---|---|---|---|
| `wcag2a` | 90 | 6 | 1 |
| `wcag2a-Tippfehler` | **0** | 0 | **0** |
| ein falscher Tag von fünf | **32** statt 89 | 0 | **0** |

Diese halbe Validierung ist die eigentliche Falle: Wer den lauten Fall kennt (leere
Liste → axe wirft), hält den stillen für miterledigt. Und die dritte Zeile ist die
gefährlichste — sie sieht nach einem normalen Ergebnis aus.

> Ein erster Fix, der nur zählte, ob überhaupt Regeln liefen, hätte genau diesen
> Fall durchgelassen: 32 Regeln sind nicht null. Erst der **Namensabgleich pro Tag**
> gegen `axe.getRules([tag])` fängt ihn.

Behoben in `scripts/axe-run.mjs`: unbekannte Tags → Exit 2 vor dem Lauf; zusätzlich
gilt „keine einzige Regel gelaufen" als kaputter Lauf. `g1-gate.mjs` liest die Zahl
`regeln` mit — fehlt sie, ist die Ausgabe von einer alten Fassung und kein Bestanden.

```bash
node evals/run-axe-check.mjs         # 8 Fälle, braucht einen Browser, aber keinen Server
```

**Am echten Werkzeug gegengeprüft, beide Richtungen:** saubere Seite → `0 Violations,
14 Passes, 89 Regeln gelaufen`, Exit 0. Dieselbe Seite mit einem verfälschten Tag →
`axe kennt diese Tags nicht: … ihre Regeln liefen NICHT`, Exit 2.

### Lighthouse bewertete die Startseite und nannte sie „/preise"

Derselbe Fehlertyp wie bei axe, eine Ebene höher: Das Werkzeug **lief**, lieferte
einen vollständigen Bericht — nur über eine andere Seite als die gefragte.

| Fall | Bericht | Exit | was wirklich gemessen wurde |
|---|---|---|---|
| `/preise` leitet auf `/` um | performance=100, seo=82 | **0** | die Startseite |
| `/suche?q=dach` verliert die Query | vollständig | **0** | die leere Suchseite |
| Route existiert nicht (404) | vollständig, `runtimeError` gesetzt | **0** | nichts |

Eine Umleitung ist im Bericht kein Fehler — sie steht nur als `finalDisplayedUrl`
neben der angefragten URL, und die las das Tor nicht. Bei einer Route, die man
gerade erst gebaut hat und die noch nicht verdrahtet ist, ist genau das der
Normalfall: Die Seite ist ungeprüft, das Tor meldet grün.

Behoben in `scripts/g1-gate.mjs`: Vergleich von `finalDisplayedUrl` mit der
angefragten URL über Pfad **und** Query (abschließender Schrägstrich egal), plus
Abbruch bei gesetztem `runtimeError`.

```bash
node evals/run-lighthouse-check.mjs  # 10 Fälle, weder Browser noch Server noch lighthouse
```

### Zwei Läufe, ein Ergebnis: das Tor war nicht parallel-fest

Am 28.07. liefen zwei Anti-Set-Läufe gleichzeitig. Die Kontrolle meldete **rot** an
`lighthouse`, obwohl an der Seite nichts kaputt war. Ursachen, alle drei derselbe
Fehlertyp — geteilter Zustand ohne Eigentümer:

| Geteilt | Folge |
|---|---|
| `/tmp/g1-gate/lh_.json` für alle Läufe | Lauf A schrieb das Ergebnis, Lauf B las es als seines |
| Port 5321 fest verdrahtet | zweiter Server starb still, beide maßen gegen fremde Dateien |
| eine Protokolldatei | Zeilen zweier Läufe verschränkt, unlesbar |

Behoben: `--out` legt ohne Angabe je Lauf einen eigenen Ordner an (`mkdtemp`), der
Anti-Set-Läufer beweist per Testdatei, dass der Server auf dem Port **seiner** ist,
und das Protokoll trägt die Prozessnummer.

> **Falsches Rot ist auf Dauer so schädlich wie falsches Grün.** Nach dem dritten
> Fehlalarm schaut niemand mehr hin — und dann übersieht man den echten Befund.

### Quelle und Build sind nicht derselbe Ordner

```bash
node scripts/g1-gate.mjs --url <url> --src . --build dist
node evals/run-ordner-check.mjs      # 16 Fälle, startet seinen Server selbst
```

Bis 29.07. bekamen **alle** dateilesenden Prüfer dasselbe `--src`. Sie brauchen aber
Gegensätzliches:

| Prüfer | Braucht | Warum |
|---|---|---|
| Import-Check | **Quelle** | `import`-Zeilen stehen nur in `.tsx`/`.jsx`, im Build sind sie wegkompiliert |
| Slop-Scan | **Build** | dort steht der Text, den der Besucher wirklich bekommt |
| Routen-Zähler | **Build** | er zählt ausgelieferte HTML-Seiten |

An der MAKE-Website gemessen — derselbe Scan, zwei Ordner:

| Ordner | Dateien | Slop-Treffer |
|---|---|---|
| Quelle | 44 | **96** |
| `dist/` | 5 | **6** |

Mit `--src .` bekommt man 90 Befunde über Dateien, die nie ausgeliefert werden — der
Lärm, an dem ein Wächter stirbt. Mit `--src dist` verliert man den Import-Check ganz.
Ohne `--build` sucht das Tor `dist/`, `build/`, `out/`, `.output/public`, `.next`;
findet es keinen, gilt `--src` als Build. **Beide Ordner stehen jetzt im Bericht** —
genau weil das nicht dastand, fiel es monatelang nicht auf.

### Das Urteil muss die Pipe überleben

Der Exit-Code ist das eigentliche Urteil des Tores — und er ist unsichtbar. Wer die
Ausgabe durch `grep`, `tail` oder `head` schickt, liest danach `$?` **der Pipe**, nicht
des Tores. Das ist am 29.07. zweimal an einem Tag passiert, beide Male mit demselben
falschen Schluss: „meldet Blocker und besteht trotzdem." Das Urteil war jedes Mal
korrekt, nur weggeworfen.

Darum steht der Exit-Code jetzt **im Text**:

```
G1 BESTANDEN (Exit 0) — 8 Check(s) gruen.
G1 GERISSEN (Exit 1) — 3 Check(s): lighthouse/, axe/, craft/
G1 KANN NICHT URTEILEN (Exit 2) — 4 Seite(n) im Build wurden nie geoeffnet.
```

> Wer den Exit-Code misst, misst ihn **ohne Pipe**: `node … > /tmp/x.txt 2>&1; echo $?`.
> Und wer ein Urteil ausgibt, das beim Weiterreichen verlorengehen kann, schreibt es
> zusätzlich in den Text. Das gilt für jedes Werkzeug hier, nicht nur fürs Tor.

> **Die Gegenprobe ist kein Beiwerk.** Der erste Eval-Lauf stand bei 7/8: Der
> Testserver lag auf Port 1, also tot, und das Tor bricht bei unerreichbarem Server ab,
> *bevor* der Slop-Scan läuft. Der Hauptfall hätte bestanden, ohne irgendetwas zu
> messen. Aufgefallen ist es nur, weil daneben ein Fall steht, der bei absichtlich
> falscher Einstellung Alarm schlagen **muss** — und stattdessen ebenfalls schwieg.

Zwei Prüfer, zwei Blindstellen, beide nötig: `scan-ai-slop.mjs` liest **Dateien**,
`craft-check.mjs` liest das **gerenderte DOM**. Auf demselben Testfall meldete der
Datei-Scan 0 Tells, während der DOM-Scan 5 Blocker fand. Details und Schwellen:
`references/agentur-merkmale.md`.

## Look & QA (design ist die einzige Design-Wissensquelle)

Dieser Skill ist das **Dach**: eine Anleitung von Strategie bis Launch. Alles Visuelle
(Art Direction) **und** die finale Design-Prüfung laufen über **design** — nicht
zwischen zwei Skills springen, aber Design auch nie hier neu erfinden. So teilt sich design auf:

| Aufgabe | r-design-Linie | Referenz in design |
|---|---|---|
| Landing/Kampagne/Portfolio (Design IST das Produkt) | **taste-Linie** | `design/references/taste-kern.md` |
| App/Dashboard/Tool (Design DIENT dem Produkt) | **ui-ux-Linie** (Offline-DB) | `design/references/ui-ux-db-nutzung.md` |
| Finale Design-QA (immer, hart) | **impeccable-Detektoren** | `design/references/impeccable-detektoren.md` |
| Konflikte/Doktrin (Typo/Farbe/Layout) | fusionierte Regeln | `design/references/design-doktrin.md` |

Regel: In den Schritten `art-direction` und `qa-faecher` (Fach 2 Design) **design laden
und befolgen**. impeccable = Exit 0 ist harte Ship-Bedingung. Herkunft der Design-Regeln
(impeccable/taste/ui-ux-pro-max, Lizenzen) steht in `design/VENDORING.md`.

### Deutscher Text: der Scanner braucht den deutschen Regelsatz

Der Slop-Scanner ist vendoriert und englisch. Seine Copy-Regel sucht „seamless",
„game-changer", „say goodbye to". Raphaels Seiten sind deutsch — und eine Seite mit
„maßgeschneiderte Lösungen", „in der heutigen schnelllebigen Welt", „auf das nächste
Level" und „Rundum-sorglos-Paket" kam bis 29.07.2026 mit **0 Treffern, Exit 0** durch.
Das Tor schrieb „0 Slop-Tells", bestanden. Der Prüfer, der Verkaufstext-Slop stoppen
soll, war auf der einzigen Sprache blind, die hier ausgeliefert wird.

`design/scripts/rules.de.mjs` schließt das: `de-14` (deutsche KI-Textstimme) zählt wie
das englische Gegenstück als **Blocker**, `de-15` (Werbe-Interpunktion) und `de-16`
(Leerformel) als Warnung. Die Muster sind nicht neu erfunden, sondern die maschinell
prüfbare Hälfte von `copywriting/references/floskel-verbote.md`.

Das Tor hängt den Regelsatz selbst an — von Hand also:

```bash
node ../../design/scripts/scan-ai-slop.mjs <projekt> \
  --rules=../../design/scripts/rules.de.mjs --json
```

Fehlt die Datei, läuft der Scan englisch weiter, aber das Urteil sagt es an
(`[nur englische Regeln — rules.de.mjs fehlt]`) statt still grün zu melden.
Beleg: `evals/run-slop-de-check.mjs` — 17 Treffer-Fälle, 8 Gegenproben gegen
Fehlalarm, 5 Einstufungs-Prüfungen, 30/30. Dieselbe Beispielseite: vorher
„0 Slop-Tells / bestanden", jetzt „4 Blocker (deutsche KI-Textstimme)".

> Ein grüner Scan heißt weiterhin nicht „klingt menschlich". Satzrhythmus,
> Absatzstruktur und die Em-Dash-Schwelle pro Dokument sind nicht greppbar und
> bleiben Lesearbeit im copywriting-Durchgang.

**Feste Reihenfolge bei kombiniertem Design+Copy-Check (z.B. AI-Slop-Check über mehrere
Seiten):** immer **design ZUERST** (Detektoren `node ../../design/scripts/detect.mjs` + `node
../../design/scripts/scan-ai-slop.mjs --rules=../../design/scripts/rules.de.mjs` je Exit 0), **danach copywriting G1→G2** auf denselben Seiten
— orchestriert über web als Dach-Skill. "Unklar" ist hier kein zulässiges Ergebnis;
wenn wirklich kein Skill passt, erst dann als unklar zurückmelden.

## Landingpage-Struktur (Besucher → qualifizierte Leads)

Detail in `references/landingpage-struktur.md` (Quelle: Ads-Kurs-Synthese, siehe dort).
Kurz — eine Landingpage für Ads-Traffic ist **eine Aktion**, kein Website-Menü:

- **Eine Aktion:** kein Menü, kein Blog, kein "About us". Formular **direkt eingebettet**
  (nicht hinter einer "Apply Now"-Button-Seite). CTA/Formular **im oder knapp unter dem Fold**.
- **Formular = Kette kleiner Ja's:** Identifikation → Qualifizierung → **Kontaktdaten ZULETZT**
  (harte QA-Regel, siehe qa-faecher). Website-URL statt Firmenname abfragen.
- **Reihenfolge:** Big Idea oben → FAQ (4 Quadranten) + "Für wen" → Testimonials → Details.
  FAQ-vor-Testimonials ist eine **selbst zu testende Hypothese** (A/B), kein Gesetz.
- **Testimonials:** Video/Screenshot statt Fließtext, nach Identität/Branche gelabelt,
  Menge NICHT wegkürzen (Kürzung halbierte die Conversion).

## Ablauf (Detail in references/loop2-ablauf.md)

1. **strategy** — Ziel, Zielgruppe, Konversionspfad (Fable, Checkpoint Raphael).
2. **sitemap** — Seitenstruktur + Sektionsplan (Sonnet). Landing → Struktur aus
   `references/landingpage-struktur.md` (eine Aktion, Reihenfolge nach Überzeugungskraft).
   Mehrseitige Website (kein Ads-Landing) → `references/informationsarchitektur.md`
   (Seitenhierarchie, Navigation, URL-Struktur, internes Verlinken).
3. **copy** — Copy sektionsweise (Sonnet, Brand-Voice + Proof über copywriting). G1-Stil → G2.
4. **art-direction** — **verweist auf design.** G1 = impeccable-46-Regeln (`npx impeccable detect --json`).
   Soll eine bestehende Referenzseite als Vorlage/Stil dienen ("baue mir etwas Ähnliches
   wie X", "clone diese Landingpage") → **zuerst** `references/web-clone-playbook.md` laden
   (Entscheidungsbaum, Lizenz-Check, Komplexitätsskala L1–L6) **bevor** Art Direction beginnt.

   > **Die fremde Seite bestimmt den Inhalt, nicht den Ort.** `mirror-site.mjs`
   > bildete den Dateipfad aus der URL der Zielseite, und `../` blieb dabei stehen:
   > `https://opfer.test/x/../../../root/.ssh/authorized_keys` schrieb nach
   > `/root/.ssh/authorized_keys`, `/../../etc/cron.d/boese` nach `/etc/cron.d/`.
   > Nachgemessen, nicht vermutet. Genau der Fall aus der Quarantäne-Regel
   > (AGENTS.md Nr. 17, *untrusted rein ODER mächtig raus*) — das Skript liest eine
   > fremde Seite **und** schreibt Dateien, ein präparierter Link im Manifest
   > reichte. Seit 29.07.2026 wird jeder Zielpfad aufgelöst und gegen den
   > Site-Ordner geprüft; abgewiesene Pfade stehen am Ende des Laufs **namentlich**
   > im Bericht, statt still zu fehlen — wer eine Seite spiegelt und hinterher
   > Dateien vermisst, sucht sonst am falschen Ende.
   > `sourcemap-hunt` und `network-capture` sind nicht betroffen: dort entsteht der
   > Dateiname aus einem Filter auf `[a-z0-9._-]` plus Hash, ein Schrägstrich kann
   > nicht übrig bleiben. Auch das steht als Fall in der Eval, damit ein späteres
   > Lockern des Filters auffällt. `node evals/run-clone-pfade.mjs` (15 Fälle:
   > 4 Ausbruchsversuche, 7 normale Asset-Pfade, 4 zur Gegenprobe).
   Ist die Vorlage kein Link, sondern ein **Bild** (Screenshot, Mockup,
   Figma-Export, Fullpage-Longshot — "Screenshot nachbauen", "aus Bild bauen",
   "pixelgenau aus dem Bild umsetzen") → **zuerst** `references/rebuild-from-image.md`
   laden (Sektions-Analyse, Renderstrategie pro Element, Rebuild-Prompt,
   Pixel-Treue-Check gegen 1440/768/390 px). Beide Vorlagen gleichzeitig
   vorhanden (Screenshot einer Seite, deren URL man auch hat) → web-clone-
   playbook.md zuerst, rebuild-from-image.md nur für Bildteile ohne
   erreichbaren Source.
   Sobald **echte Bild-Assets** gebraucht werden (Hero-Foto, Produkt-Shot, Szene,
   2D/3D-Illustration) → `references/bildgenerierung.md` laden: Standard-Werkzeug ist
   die **Higgsfield CLI**, mit festem Entscheidungsbaum — **Referenz vorhanden →
   GPT Image 2** (`--image-references` = „Add Image 1/2/…", für inhaltliche UND
   stilistische Referenzen; GPT Image 2 ist auch der beste **Illustrator**, 2D/3D auch
   ohne Referenz), **nur echt fotorealistisch ohne Referenz → Recraft V4.1** mit
   JSON-Prompting, ohne Color-Grading und ohne Nahaufnahme-Gesichter echter Menschen,
   **Nano Banana 2 nur für Previews**, Finals in 4k/2k. Nicht
   verwechseln mit den **Design-Referenz-Mockups** aus `imagegen-web`/`imagegen-mobile`
   (ein Mockup pro Sektion) — die Tabelle „Abgrenzung" in `bildgenerierung.md` trennt das.
5. **components** — Komponenten-Spezifikation aus Art Direction. **Erster Griff ist
   immer der Bibliotheks-Tresor, nicht der eigene Kopf:**
   `node scripts/lib-lookup.mjs --task <aufgabe>` sagt, welche der 30 lokal
   installierten Libraries diese Aufgabe löst, `node scripts/lib-lookup.mjs <name>`
   nennt Version, Doku-Pfad und die **echten** Exportnamen. Regeln, Zuordnung und
   Lizenzen → `references/bibliotheks-tresor.md`. Ein Import, der nicht in der
   `Export:`-Zeile steht, existiert nicht — das ersetzt jedes Raten aus dem
   Gedächtnis. Kommen die Komponenten aus shadcn oder Appica, gilt zusätzlich
   `references/shadcn-arbeitsweise.md` (lokale Registry statt Browser,
   Audit→Plan→Ausführung, Marken-Tokens **vor** der Auslieferung — der
   Default-Look ist der Anfang der Arbeit, nicht das Ergebnis).
   Steht die **Form** eines tragenden Stücks (Hero, Preisblock, Formularschritt)
   noch nicht fest und gibt es keine Vorlage → `references/varianten-picker.md`
   (drei divergente Varianten hinter einem Umschalter, statt eine zu raten).
   Copy-paste-fertige
   Motion-Komponenten (Buttons, Modals, Tabs, …) → `references/ui-components/INDEX.md`.
   **Vorfahrt: Tresor vor Bibliothek.** Für sieben Aufgaben gibt es beides — eine
   handgeschriebene Datei in `ui-components/` **und** eine installierte Library im
   Tresor. Dort gewinnt immer die Library (Toasts→`sonner`, OTP→`input-otp`,
   ⌘K→`cmdk`, Drawer→`vaul`, Zahlen→`@number-flow/react`, lange Listen→
   `react-virtuoso`, Karussell→`embla-carousel-react`); die Datei bleibt Vorlage
   für die *Bewegung*, nicht Bauteil. Vollständige Tabelle im INDEX, Abschnitt
   „Wo diese Bibliothek NICHT die Antwort ist".
   Motion-**Regeln** stehen nicht in diesem Skill: `references/motion-doktrin.md`
   nennt nur die Projekt-Bindung (ease-Token, Reduced-Motion je Framework) und
   verweist für alle Werte auf die kanonische design-Doktrin;
   Scroll-Sequenzen, Timelines und SVG-Morphing brauchen das dritte Werkzeug →
   `references/motion-gsap.md` (Entscheidungstabelle CSS/Framer Motion/GSAP,
   `useGSAP`-Pflichtmuster gegen Leaks, `gsap.matchMedia()` für Reduced-Motion).
   Weitere Komponenten-Ideen (Glass/Mesh-Gradient/3D) nur als Vokabular →
   `references/ui-layouts-catalog.md`. Welches Design-System zum Brief passt
   (Radix/shadcn/Tailwind, Fluent, Carbon, Polaris, Atlassian, Material, …) →
   `references/design-systeme-vergleich.md`. Raphaels Default-Stack für eigene
   Agenturprojekte (Next.js + Tailwind + Radix/shadcn + Framer Motion) →
   `references/radix-shadcn-tailwind-stack.md`. Braucht das Projekt ein
   Hero-/Teaser-Video oder eine React-basierte Video-Composition (kein
   normales CSS-Motion) → `references/remotion-produktionsweg.md`.
6. **build** — Umsetzung (Terra/Sol, Cross-Vendor `/codex:review`). Bei echtem Custom-Code
   zusätzlich `references/code-qualitaets-checkliste.md` gegen AI-Slop prüfen. Entsteht
   echter React/Next-Code (eigene Komponenten, Data-Fetching, Server Actions) →
   `references/react-next-performance.md`: Waterfalls und Bundle zuerst (das sind die
   beiden größten Hebel), dazu die vier grep-Befehle am Ende der Datei, die
   Barrel-Imports und rohe `<img>` deterministisch finden — das zahlt direkt auf den
   Lighthouse-Teil von G1 ein. Formular-
   Backends, Kundendaten-Handling, npm-Abhängigkeiten (Formular/Tracking/Payment) →
   `references/security-audit-playbook.md` (Fail-Open-Defaults, Footgun-Configs,
   Supply-Chain-Check, Quelle Trail of Bits). Bei Code-Review von Formularen/API-Routes/
   Webhooks/**Cookie-Banner/Consent-Layer/Tracking-Einbindung** (z.B. Popup-Lead-Magnet
   mit E-Mail-Erfassung, DSGVO-Consent-Formular, Tracking-Skript-Einbindung) zusätzlich
   `/root/raphael-skills/skills/methodik/code-review/references/owasp-checkliste.md`
   nachladen (A02/A03/A05/A08/A10-Einträge, DSGVO-Consent des Formularfelds prüfen).
   Braucht der
   Build Datenbankzugriff zur Content-Prüfung → `references/readonly-db-rolle.md` (nie
   Schreibzugriff für Agenten).
7. **qa-faecher** — QA parallel: **Conversion · Design · A11y · Technik** (Schwarm gemischt).
   G1 Lighthouse/axe = 0, hart. Fach 2 Design laeuft ab jetzt als Screenshot-Kritik-Loop
   nach references/screenshot-kritik-loop.md.
   (Panel: sol-pruefer=Code+Befundliste, sonnet-worker=Screenshots, kimi-recherche=Screenshots.)
   Bei kombiniertem Design+Copy-Check (AI-Slop) gilt die feste
   Sequenz aus "Look & QA": design ZUERST, **danach copywriting G1→G2 als fester zweiter
   Schritt** (nicht optional) — Details in `references/qa-faecher.md`. Optional Persona-QA
   (Beginner/Engineer/Business-Owner). Conversion-Elemente (Popup/Lead-Magnet/Free-Tool) →
   `references/conversion-elemente.md`. Tiefere CRO-Diagnose bei Bestandsseiten →
   `references/cro-diagnose.md`.
8. **Launch** — **Signatur + Deploy-Egress-Gate.** Nie autonom. Neue/junge Domain →
   vorher `references/domain-safe-browsing-checkliste.md` durchgehen (Google-Safe-Browsing-Flag
   verhindern). Bei Referenz-Nachbau: Lizenz-Check aus `web-clone-playbook.md` muss geklärt sein.
9. **cro-learn** — CRO aus echten Analytics (Sonnet, G4). Für ein laufendes Test-Programm
   statt Einzelfixes → `references/experiment-programm.md` (ICE-Score, Experiment-Playbook).

## Loop-2-Ablauf (verbindlich)

Strategie (Fable, Checkpoint Raphael) → Sitemap + Copy sektionsweise (Sonnet, Voice+Proof;
G1-Stil → G2) → Art Direction (design, G1 impeccable) → Build (Terra/Sol, Cross-Vendor
`/codex:review`) → QA-Fächer parallel (G1 Lighthouse/axe = 0, hart) → Launch (Signatur +
Deploy-Egress-Gate) → CRO-Learning aus echten Analytics (Sonnet, G4).

## Statistik-/Linkbait-Seite als Vorlage

Für eine eigenständige Statistik-/Datenseite (Linkbait für seo, oder als
Ressourcenseite auf der Kundenwebsite): `references/templates/statistics-page-template.html`
— eigenständige HTML-Vorlage mit Chart.js, Article+FAQPage-Schema.org, mobile-first,
Print-Styles. Unverändert übernehmen, nur Inhalte/Branding ersetzen.

## Gotchas

- **Lighthouse/axe = 0 ist hart** — kein "fast fertig". Fertig = Environment-Tatsache (Regel 14).
- Art Direction nie selbst erfinden — Design läuft über **design** (Details in Sektion
  "Look & QA" oben, nicht doppelt hier).
- Build läuft Cross-Vendor geprüft: wer baut (Terra/Sol) ist nicht wer reviewt.
- Deploy = Rot-Klasse: nie autonom, immer Egress-Gate (Domain-Whitelist) + Signatur.
- CRO-Behauptungen nur aus echten Analytics (G4), nie aus Judge-Scores.
- **"Auf GitHub öffentlich" ≠ "frei nutzbar"** — beim Nachbauen einer Referenzseite immer
  den Lizenz-Check aus `web-clone-playbook.md` machen, sonst Urheberrechtsrisiko im
  Kunden-Launch (siehe dortige Iron Rule).
- **Junge Domain + Formular ist das Safe-Browsing-Flag-Muster** — vor jedem Launch auf
  neuer Domain die Checkliste in `domain-safe-browsing-checkliste.md` durchgehen, nicht
  erst wenn der rote Warnbildschirm schon da ist.
- Motion-Komponenten aus `ui-components/` nie ohne `useReducedMotion()`-Äquivalent
  einbauen — die globale CSS-Media-Query stoppt keine JS-Animationen. Bei GSAP ist
  das Äquivalent `gsap.matchMedia()`, nicht `useReducedMotion()` (siehe
  `references/motion-gsap.md`).
- **Keine Interaktion von Hand nachbauen, für die eine Library im Tresor steht.**
  Toast, Command-Palette, OTP-Feld, Drawer, Drag-and-Drop, Virtualisierung,
  animierte Zahlen — für jedes gibt es genau eine Antwort in
  `references/bibliotheks-tresor.md`. Ein selbstgebauter Toast-Stapel ohne
  Swipe-Dismiss und Fokus-Rückgabe ist kein Sparen, sondern ein Craft-Befund.
  **Das gilt auch gegen die eigene Bibliothek:** `ui-components/` liefert für
  sieben dieser Aufgaben eine handgeschriebene Datei mit (503 Zeilen Toast-Stapel,
  392 Zeilen OTP, 341 Zeilen ⌘K). Die Regel war bis 29.07. nicht durchsetzbar, weil
  der Skill sie aufstellte und gleichzeitig das Gegenteil auslieferte. Jetzt
  entschieden: Library bauen, Bewegung von der Datei abschauen. Tabelle in
  `references/ui-components/INDEX.md`.
- **Das Formular prüft niemand nebenbei mit.** axe und craft-check ließen ein
  E-Mail-Feld mit `type="text"` ohne `autocomplete` beide durch (gemessen 29.07.).
  `scripts/formular-check.mjs` ist deshalb der fünfte Pflicht-Prüfer im Tor — auf
  einer Landingpage ist das Formular die einzige Conversion.
- **`shadcn add` ist der Anfang, nicht das Ergebnis.** Kopierte Komponenten mit
  Default-Farben, Default-Radius und Default-Schatten auszuliefern gibt dem Kunden
  exakt die Optik jedes KI-generierten Templates. Mindestens Marken-Tokens (Farbe,
  Radius, Font) setzen — `references/shadcn-arbeitsweise.md` Punkt 5.
- **GSAP ist nicht MIT.** Alle Plugins sind seit dem Webflow-Kauf kostenlos, aber
  es gilt die GSAP-Standard-Lizenz, kein OSS-Kürzel. Vor dem ersten kommerziellen
  Kunden-Build mit GSAP die Lizenzseite lesen (`references/bibliotheks-tresor.md`,
  Abschnitt Lizenzen).
- **Bild-Assets über die Higgsfield CLI, nach `references/bildgenerierung.md`** —
  Referenz vorhanden **oder Illustration (2D/3D)** → **GPT Image 2**; Recraft nur für
  **echt fotorealistische** Bilder ohne Referenz (JSON-Prompt gegen den Filmlook,
  **kein** Color-Grading, **keine** Nahaufnahme-Gesichter echter Menschen — nur
  Distanz/beiläufig). Nano Banana nur als Nano Banana 2 für Previews. Bei Kundenseiten
  vorher klären, ob KI-Bilder erlaubt sind (manche wollen nur echte Fotos) —
  Datenminimierung (TB2) beachten.
- **Jedes Bild → AVIF + Index, Verwerfen löscht komplett.** Alle Bilder (generiert wie
  geliefert) sofort nach AVIF konvertieren und in `bilder-index.json` führen
  (typ/motiv/style/modell/refs) — deterministisch über `scripts/bilder.mjs`
  (`add`/`list`/`reject`). „Bild ist scheiße" → `reject` löscht Datei **und**
  Index-Eintrag in einem Schritt. Details in `references/bildgenerierung.md`.

  > **`reject` ist die einzige Stelle im ganzen Skill, die unwiderruflich löscht**
  > — `rmSync`, kein Papierkorb, keine Rückfrage. Und sie hatte bis 29.07.2026
  > keinen Test. Den zu löschenden Pfad nahm sie aus dem Index-Feld `datei` und
  > gab ihn ungeprüft an `join()`. Mit `"datei": "../opfer.txt"` im Index löschte
  > `reject` eine Datei **außerhalb** des Asset-Ordners: Exit 0, brave
  > Erfolgsmeldung, Datei weg (nachgemessen, nicht vermutet). Den Index schreiben
  > Agenten — ein Eintrag darf bestimmen, *welche* Datei im Ordner drankommt,
  > nicht *dass es eine außerhalb ist*. Jetzt wird der aufgelöste Pfad gegen
  > `<assets-dir>/<dateiname>` geprüft und bei Abweichung abgebrochen, **bevor**
  > der Index gespeichert wird — sonst wäre der Eintrag weg und die Datei noch
  > da. `node evals/run-bilder-check.mjs` (9 Fälle: 5 Ausbruchsversuche, 4 Mal
  > Normalbetrieb). Der zweite Teil ist der wichtigere: ein Wächter, der auch das
  > Löschen im eigenen Ordner blockiert, wird ausgebaut statt repariert.
  > `add` ist von derselben Lücke nicht betroffen — dort entsteht der Dateiname
  > aus `slugify()`, das nur `\w` durchlässt, also keine Punkte und Schrägstriche.
