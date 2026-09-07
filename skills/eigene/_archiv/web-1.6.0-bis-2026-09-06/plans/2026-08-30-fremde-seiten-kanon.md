---
title: Web-Skill lernt an fremden Seiten, nicht an unfertigen Kunden
date: 2026-08-30
type: plan
artifact_contract: ce-unified-plan/v1
artifact_readiness: implementation-ready
product_contract_source: ce-plan-bootstrap
execution: knowledge-work
---

# Web-Skill lernt an fremden Seiten

## Goal Capsule

**Ziel:** Der Agent baut Seiten, die wie Raphaels Geschmack aussehen, weil er vor Art-Direction echte, von Raphael gestempelte **fremde** Referenzstudien gelesen hat — nicht weil 15 Slash-Skills im Prompt liegen.

**Mittel:** Eine Studien-Pipeline (Capture + Sektion + Tokens + Steal/Don't-copy). Regeln entstehen erst **nach** mehreren Raphael-Stamps. Unfertige Kunden-Sites sind kein Kanon.

**Stop:** Kein Regelbuch aus BRAUN, Swisshelp, Salsaflow, Kita. Kein Hineinkopieren von design/copywriting/emil/frontend-design in `SKILL.md`.

## Product Contract

### Settled decisions

- Kein Kanon aus unfertigen Kunden. BRAUN, Swisshelp, Salsaflow, Kita sind nicht fertig. `(session-settled: user-directed — chosen over House-Lock-Regelbuch aus DESIGN.md: die Seiten sind kein Vorbild, solange Raphael sie nicht abgenommen hat.)`
- Raphael liefert **fremde** URLs oder Screenshots, die er gut findet. `(session-settled: user-directed — chosen over Agent-erfundene Kandidatenliste.)`
- Jede gelieferte Seite wird massiv detailliert analysiert (was gebaut ist, wie, stilistisch), bevor irgendetwas in ein Regelbuch wandert. `(session-settled: user-directed.)`
- Slash-Skills nicht in den Web-Skill-Text kippen. `(session-settled: unlabeled agent recommendation, writing-skills: Primitive komponieren, nicht Workflows buendeln. User-Wunsch "waere so geil" ist Wunsch nach einem Load, nicht nach einer 2000-Zeilen-SKILL.md.)`

### Requirements

- **R1** Raphael schickt 1–n URLs (Chat) oder legt Screenshots in `eingang`. Eine URL reicht als Start.
- **R2** Pro URL entsteht eine Case-Datei nach dem schweren Studien-Rubrik (unten). Capture 1440×900 und 390×844, kein fullPage als Kritik.
- **R3** Jede Studie trennt **Steal** (Prinzip, Rhythmus, Sektionsjob) von **Don't-copy** (Farbe, Font, Logo, Copy, Pixel-Layout).
- **R4** Raphael stampft GO / NO-GO / gemischt. Ohne Stamp keine Regel.
- **R5** Erst ab mindestens 3 konkordanten Stamps darf eine Beobachtung nach `stil-regeln.md`. Davor bleibt sie Kandidat in der Case-Datei.
- **R6** Site-Build-Load bleibt `web` + `design` + `copywriting`. Andere Skills routen oder sind bedarfsweise.
- **R7** `SKILL.md` wird dünner, nicht dicker. Ziel 60–120 Zeilen Kern; Studien liegen in `references/muster-bibliothek/`.

### Scope out

- Kunden-DESIGN.md als verbindlicher Geschmack (unfertig).
- 15 Skills in eine Datei mergen.
- Regeln aus einer einzelnen schönen Seite generalisieren.
- 1:1-Klone fremder Sites (Lizenz: `references/web-clone-playbook.md`).

### Actors

- Raphael: wählt Seiten, stampft Urteil.
- Controller: startet Studie, hält Kanon sauber.
- Leaf (vision): liest PNGs, schreibt Sektions-Inventar.
- Leaf (tokens): misst Farbe/Typo/Spacing aus CSS + Shot.

## Planning Contract

### Warum der Skill wild baut (nicht raten)

1. Prozess ohne Vorbild. `web` sagt *wie* gebaut wird, nicht *wonach es aussehen soll*.
2. taste-kern Baseline 8/6/4. Für MAKE-Handwerk zu wild. Liegt in `design/references/taste-kern.md`.
3. frontend-design verlangt ein "aesthetic risk". Das ist ein zweites Geschmackssystem.
4. 15 Slash-Loads. Context tot, Regeln widersprechen sich. `writing-skills`: ein Skill = eine Disziplin.
5. House-Cases aus dieser Session sind **ungültiger Kanon** nach Raphaels Nein. Dateien dürfen als Studien-Übung liegen bleiben, dürfen aber **nicht** Pflicht-Load vor Art-Direction sein, bis Raphael eine **fremde** Seite gestempelt hat.

### Wie der Web-Skill besser wird (Empfehlung)

Nicht mehr Text. Drei Schichten:

| Schicht | Was | Wo |
|---|---|---|
| Weg | strategy → sitemap → copy → art-direction → build → QA | `SKILL.md` dünn, `anfaenger-pfad.md` |
| Auge | 2–3 Raphael-gestempelte Cases der passenden Art, als PNG gelesen | `references/muster-bibliothek/<slug>.md` |
| Gate | nur checkbare Verbote (Inter-Default, Purple-Gradient, keine H1, Formular E-Mail zuerst) | `design/scripts/detect.mjs`, `scripts/craft-check.mjs` |

Fusion der "coolen Skills" heisst **Router**, nicht Copy-Paste:

| Skill | Bleibt | Web sieht davon |
|---|---|---|
| design | Doktrin, Detektoren, taste-Linie | ein Load, Dial-Override erst nach Studien |
| copywriting | G1→G2, forbidden.md | ein Load |
| higgsfield | Bilder | nur bei Asset-Job |
| emil-design-eng | Motion-Handwerk | schon in `design` / `motion-doktrin.md` |
| frontend-design | "risk" | **nicht** laden beim Site-Build |
| taste/impeccable/kill-ai-slop | Router | nicht extra |
| seo | Loop 4 | nur SEO-Auftrag |
| ce-work/wayfinder/unlazy/poteto | andere Jobs | nicht Site-Build |

### Studien-Rubrik (das eigentliche Upgrade)

Schwerer als das jetzige `_template.md`. Pro fremder Seite:

1. **Job der Seite** — eine Handlung, eine Zielgruppe, ein Satz.
2. **Capture** — Fold Desktop 1440×900, Fold Mobil 390×844, dann Sektions-Shots (kein fullPage als Urteil). Jedes PNG per Read.
3. **Chrome** — Header, Nav, Footer: Höhe, Verhalten beim Scroll, CTA-Ort.
4. **Sektions-Inventar** — Reihenfolge. Je Sektion: Name, Job, Layout-Familie (Split / Stack / Band / Raster / Akkordeon), Bildrolle, Copy-Rolle, CTA ja/nein.
5. **Tokens** — 4–8 Farben mit Rolle, Display+Body+irgendwas drittes, Spacing-Rhythmus, Radii, Schatten ja/nein.
6. **Typo-Verhalten** — Headline-Länge, Satzspiegel, Tracking, eine Signatur (Underline, Kicker, Zahl).
7. **Motion** — was sich bewegt, wie oft der User es sieht, Reduced-Motion.
8. **Steal** — 3–7 übertragbare Prinzipien (ohne Farbe/Font).
9. **Don't-copy** — Marke, Copy, Pixel, Lizenz.
10. **Raphael-Stamp** — leer, bis er GO/NO-GO/gemischt sagt.

Bestehende Werkzeuge: `scripts/muster-studie.mjs` (shot-sweep-Wrapper), `design/references/design-dna-schema.md` (Tokens, nicht als 120-Felder-Pflicht). Die Studie ist Prosa + Shots, kein leeres JSON.

### Sequenz

1. Raphael schickt die erste fremde URL.
2. Studie nach Rubrik, Shots lesen, Case-Datei, INDEX-Zeile, Stamp-Feld leer.
3. Raphael stampft.
4. Wiederholen. Nach 5 Stamps: gemeinsame Muster als **Kandidaten** in `stil-regeln.md`, Status kandidat.
5. Nach 10–15 Stamps: verbindliche Regeln nur mit ≥3 Belegen. Pflicht-Load vor Art-Direction **nur** gestempelte Cases.
6. Parallel, klein: House-Cases und `stil-regeln.md` aus unfertigen Kunden **aus dem Pflicht-Load nehmen** (anfaenger-pfad, SKILL Start-hier). Dateien nicht löschen, Status "nicht Kanon".

## Implementation Units

### U1 Parken des Kunden-Kanons

Dateien: `references/anfaenger-pfad.md`, `SKILL.md` (Start-hier + Routing), `references/stil-regeln.md` Kopf, `references/muster-bibliothek/INDEX.md`.

Haus-Cases und S-Regeln aus BRAUN/Swisshelp/Salsaflow/Kita tragen Label `nicht-kanon / Kunde unfertig`. Landing-Zeile lädt sie nicht mehr als Pflicht.

Verify: `rg "Pflicht vor Art-Direction" references/anfaenger-pfad.md` trifft keine House-Case-Pflicht ohne Raphael-Stamp.

### U2 Studien-Rubrik scharf machen

Dateien: `references/muster-bibliothek/_template.md`, `scripts/muster-studie.mjs` (nur Capture, Urteil nie auto).

Verify: Template enthält die 10 Rubrik-Punkte; Skript spawnt nur `shot-sweep.mjs`.

### U3 Erste fremde Studie (blockiert auf Raphael-URL)

Dateien: `references/muster-bibliothek/<slug>.md`, INDEX-Zeile.

Verify: zwei Fold-PNGs existieren und wurden gelesen; Steal/Don't-copy nicht leer; Stamp-Feld `offen`.

### U4 Destillation (erst nach ≥5 Stamps)

Dateien: `references/stil-regeln.md` nur Kandidaten mit Case-Slugs.

Verify: keine Regel `verbindlich` ohne drei Case-Slugs; keine Kunden-unfertig-Slugs als Beleg.

## Verification Contract

- `node evals/run-muster-bibliothek-check.mjs` anpassen: Pflicht-Load darf House-Cases nicht mehr verlangen.
- Jede Studie: shot-sweep Exit 0, PNG-Read-Beleg in der Case-Datei (Pfade, nicht "gesehen").
- Raphael-Stamp ist manuell. Ein Skript darf ihn nicht setzen.

## Definition of Done

- Raphael hat mindestens eine fremde Seite gestempelt.
- Der Site-Build lädt vor Art-Direction nur gestempelte fremde Cases, sobald es welche gibt; sonst explizit "kein Kanon, Raphael-Refs in eingang prüfen".
- `SKILL.md` ist nicht um fremde Skill-Texte gewachsen.
- Unfertige Kunden sind aus dem Geschmacks-Pflicht-Load draußen.

## Appendix — was du tun musst

Eine Nachricht: URL plus optional ein Satz, *warum* die Seite gut ist (Hero, Ruhe, Typo, Beweis, Formular). Rest macht die Studie.

Drei URLs in einer Nachricht gehen. Fünfzig auf einmal nicht — sonst wird die Studie flach.
