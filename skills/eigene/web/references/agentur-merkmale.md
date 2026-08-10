# Agentur-Merkmale M1–M25 und KI-Tells T1–T10

Grundlage der Recherche vom 27.07.2026. Diese Datei ist die Belegquelle für
`scripts/craft-check.mjs`. Wer einen Schwellenwert ändern will, ändert ihn hier
**und** im Skript — sonst driften Doktrin und Werkzeug auseinander.

## Wofür das gut ist

Eine 10.000-€-Agenturseite und eine KI-Seite unterscheiden sich selten im Inhalt.
Sie unterscheiden sich in messbaren Kleinigkeiten: ob Radien konzentrisch sind, ob es
mehr als einen Abstandswert gibt, ob Zahlen in Tabellen springen. Diese Liste macht
genau die Kleinigkeiten prüfbar, die ein Betrachter als „teuer" oder „nach KI" liest,
ohne benennen zu können, warum.

**Zwei Werkzeuge, zwei Blickwinkel — beide nötig:**

| Werkzeug | Sieht | Blind für |
|---|---|---|
| `design/scripts/scan-ai-slop.mjs` | Quelltext (grep über Dateien) | alles, was erst im Browser entsteht |
| `web/scripts/craft-check.mjs` | gerendertes DOM (Computed Styles) | Dinge ohne visuelle Spur |

Belegt am eigenen Testfall: Auf einer bewusst „poliert-sloppy" gebauten Seite meldete
`scan-ai-slop.mjs` **0 Tells**, während `craft-check.mjs` **5 Blocker** fand
(Indigo-Gradient, identischer Innen-/Außen-Radius, 180ch Satzspiegel, fehlendes
`prefers-reduced-motion`, Em-Dashes). Gerenderter Slop ist per grep unsichtbar.

## Schweregrade

- **BLOCK** — verhindert die Auslieferung. Ein Mensch mit Auge sieht es sofort, oder es
  bricht Barrierefreiheit.
- **WARN** — Handwerksmangel. Einzeln verschmerzbar, in Summe der Unterschied zwischen
  „ordentlich" und „teuer".
- **INFO** — **nicht messbar, deshalb nie automatisch bestanden.** Braucht ein Auge.
  Das ist Absicht: ein Werkzeug, das Unmessbares grün meldet, lügt (Regel 14).

---

## M — Agentur-Merkmale

### Typografie und Rhythmus

**M1 · Typo-Skala** (WARN) — Schriftgrößen folgen einer Skala, nicht dem Zufall.
Mehr als ~8 verschiedene `font-size`-Werte auf einer Seite heißt: hier wurde pro
Element entschieden statt einmal ein System gebaut.

**M2 · Vertikaler Rhythmus** (WARN) — Abstände liegen auf einem 4px-Raster.
Werte wie `13px`, `27px`, `35px` entstehen durch Nachschieben im Browser, nicht durch
Gestaltung.

**M3 · Satzspiegel** (BLOCK) — Fließtext max. ~75 Zeichen pro Zeile. Darüber verliert
das Auge den Zeilenanschluss. Ein Textblock über die volle 1440px-Breite ist das
sicherste Zeichen für „nie gestaltet, nur ausgegeben".

**M4 · text-wrap** (WARN) — Überschriften `text-wrap: balance`, Fließtext
`text-wrap: pretty`. Verhindert einzelne Wörter auf der letzten Zeile (Schusterjungen).

**M6 · tabular-nums** (WARN) — Zahlen in Tabellen, Preisen und Zählern brauchen
`font-variant-numeric: tabular-nums`, sonst springt die Spaltenbreite bei jeder Änderung.

**M8 · Hierarchie-Kontrast** (BLOCK) — Zwischen größter und kleinster Schrift liegt
mindestens Faktor 1.8. Liegt alles zwischen 16 und 20px, gibt es keine Hierarchie,
sondern nur Text.

### Form und Tiefe

**M9 · Konzentrische Radien** (BLOCK) — Innerer Radius = äußerer Radius − Padding.
Ein Bild mit `rounded-2xl` in einer Karte mit `rounded-2xl` und `p-3` ist mathematisch
falsch: 16px innen müsste 4px sein. Klassischer Verräter, weil er nur aus
Copy-Paste-Klassen entsteht.

**M10 · Radius-Skala** (WARN) — Wenige, systematische Radien statt beliebiger Werte.

**M11 · Tiefen-Disziplin** (WARN) — Ein Element hat Rahmen **oder** Schatten, nicht
beides. Beides zusammen ist die „Geisterkarte", die auf keiner Agenturseite vorkommt.

**M12 · Spacing-Beziehung** (BLOCK) — Gleicher Abstand überall heißt: nichts gehört
zusammen. Zusammengehöriges steht enger als Getrenntes (Gestaltgesetz der Nähe).
Wenn ein einziger `gap`-Wert die ganze Seite trägt, fehlt die Gruppierung.

### Interaktion und Zugänglichkeit

**M16 · Hit-Area** (BLOCK) — Klickflächen mindestens 40×40px. Kleinere Ziele sind auf
Touch nicht sicher treffbar.

**M17 · Focus-Indikator** (BLOCK) — Sichtbarer Fokus für Tastaturbedienung.
`outline: none` ohne Ersatz ist ein Ausschluss, kein Designdetail.

**M18 · Reduced Motion** (BLOCK) — `@media (prefers-reduced-motion: reduce)` muss
existieren, sobald die Seite animiert. Ohne das ist Bewegung für Menschen mit
vestibulären Störungen nicht abschaltbar.

**M19 · Motion-Budget** (WARN) — Kein `transition: all`. Das animiert auch Layout-
Eigenschaften und kostet Bildrate. Gemessen wird nur, wenn tatsächlich eine Dauer > 0
gesetzt ist — `transitionProperty` steht per Default auf `all`, auch ohne jede Transition.

### Technik mit sichtbarer Wirkung

**M22 · CLS** (WARN) — Bilder brauchen `width`/`height` oder `aspect-ratio`, sonst
springt das Layout beim Laden.

**M23 · Head-Polish** (BLOCK bei fehlender Description, sonst WARN) — `title`,
`meta description`, `og:image`, `favicon`. Fehlt das, sieht der erste Eindruck beim
Teilen billig aus, egal wie gut die Seite ist.

**M13 · Mobile** (BLOCK bei Overflow, WARN bei steckengebliebenem Raster) — zweiter
Durchgang auf 390×844. Drei Befunde: die Seite selbst breiter als der Viewport,
einzelne Elemente, die rechts aus dem Bild ragen, und mehrspaltige Grids, die auf
dem Handy mehrspaltig geblieben sind (nur WARN — es gibt legitime Zwei-Spalter,
etwa Icon plus Text).

*Warum das drin ist:* Der Beweis-Build lief mit `performance=99 accessibility=100
best-practices=100 seo=100`, 0 axe-Violations, 0 Slop-Tells, 0 Craft-Blockern durchs
Tor — **während das Hero-Grid auf 390px nie umbrach und die Proof-Karte mitten im
Wort abschnitt** („ANSPRECHPARTNE…"). Ein Tor, das nur 1440 kennt, ist auf einer
Handy-Mehrheit blind. Gegenprobe an derselben Seite mit entfernter Umbruch-Regel:

| Seite | M13 | Exit |
|---|---|---|
| mit `.hero{grid-template-columns:1fr}` im 860px-Query | 0 Blocker | 0 |
| ohne diese eine Zeile | 2 Blocker (430px bei 390px Viewport, 14 Elemente ragen raus) | 1 |

*Regel-Falle:* `position: fixed` ausnehmen. Ein Cookie-Banner oder eine Sticky-Nav
darf rechnerisch aus dem Viewport ragen, ohne dass jemand scrollen muss.

### Nicht maschinell prüfbar (immer INFO)

**M20 · Signature-Moment** — Ein Detail, das man sich merkt. Genau das, was eine
10.000-€-Seite von einer korrekten Seite trennt. Braucht ein Auge.

**M24 · Bildwelt** — Echte Fotos statt Stock/KI-Renderings. Nur visuell beurteilbar.

**M25 · Proof** — Echte Zahlen, echte Namen, echte Referenzen. Inhaltlich, nicht messbar.

> **INFO im Skript heisst nicht INFO im Urteil.** Am 27.07.2026 gab das Tor den
> Beweis-Build frei (98/100/100/100, 0 Verstoesse) und das Panel stufte „kein einziges
> Foto auf einer Sanierungs-Seite" als **BLOCK** ein: „ein Content-Geruest, kein
> fertiges Produkt". Wer M24/M25 als erledigt abhakt, weil das Skript INFO sagt, hat
> die Zeile falsch gelesen.

**Die Grenze verlaeuft zwischen „ob" und „wie gut".** Anfangs war M24 komplett INFO,
mit der Begruendung, ein Skript koenne Bildqualitaet nicht beurteilen. Das stimmt —
aber es verdeckte eine Frage, die sehr wohl zaehlbar ist: **ist ueberhaupt eines da?**
Genau daran ist das Tor gescheitert. Seit 27.07. gilt:

| Frage | Wer entscheidet | Stufe |
|---|---|---|
| Ist ueberhaupt ein Bild ueber Icon-Groesse da? | `craft-check.mjs` (zaehlt) | **BLOCK** |
| Ist es echt, passend, gut? Stock? KI-Uncanny? | Panel + eigenes Auge | INFO im Skript |

Gezaehlt werden `img`, `picture`, `video` und CSS-`background-image` ab 120×120px —
Icons und Logos zaehlen nicht als Bildwelt, CSS-Verlaeufe erst recht nicht. Reine
Rechtstexte (Impressum, Datenschutz, AGB) haben legitim kein Bild und laufen mit
`--textseite`. Die Ausnahme muss hingeschrieben werden; still wegfallen darf sie nicht.

---

## T — KI-Tells

**T1 · KI-Font** (WARN) — Inter/Poppins/Montserrat als einzige Wahl. Nicht schlecht,
aber die Default-Antwort jedes Modells. Eine bewusste Schriftwahl ist selbst ein Merkmal.

**T2 · KI-Gradient** (BLOCK) — Indigo→Violett-Verlauf (`#6366f1` → `#8b5cf6` und
Nachbarschaft). Der mit Abstand häufigste generierte Farbverlauf 2024–2026.

**T5 · Kicker-Reflex** (WARN) — Über jeder Sektion ein kleines Uppercase-Label
(„UNSERE LEISTUNGEN"). Einmal Stilmittel, dreimal Schablone.

**T7 · Springy-Hover** (WARN) — `transform: scale()` auf allem, was hoverbar ist.
Bewegung ohne Information.

**T8 · Em-Dash** (BLOCK) — Sichtbare Em-/En-Dashes im deutschen Fließtext. Doktrin
ist null. Der bekannteste Text-Verräter überhaupt.

**T9 · Runde Zahlen** (WARN) — `10k+`, `99,9 %`, `24/7`, `100 %`. Erfundene
Glaubwürdigkeit. Echte Zahlen sind krumm.
*Regex-Falle:* kein `\b` nach `+` oder `%` — hinter einem Nicht-Wortzeichen kann keine
Wortgrenze stehen, der Ausdruck träfe nie.

---

## Bedienung

```bash
# gerendertes DOM prüfen
node scripts/craft-check.mjs --url http://localhost:3000/

# Quelltext prüfen (ergänzend, andere Blindstelle)
node ../../design/scripts/scan-ai-slop.mjs --src ./src

# beides plus Lighthouse/axe/Links in einem Exit-Code
node scripts/g1-gate.mjs --url http://localhost:3000/ --src .
```

`craft-check.mjs` endet mit Exit 1, sobald ein BLOCK vorliegt; Exit 2, wenn der Lauf
selbst kaputt ist (nie Exit 0 — ein kaputter Prüfer ist kein bestandener Prüfer).
