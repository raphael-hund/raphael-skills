---
name: idea-filter
version: 0.1.0
description: >
  Bewertet eine Geschäfts-/Produktidee entlang von neun festen Dimensionen gegen
  Raphaels tatsächliches Portfolio (ICP, Angebot, Voice, Kunden) und endet immer in
  genau einem von vier Verdikten — Build, Sleep on it, Pass oder Angle klauen.
  Erzwingt Belege statt Bauchgefühl und legt jede bewertete Idee als Kandidat ab,
  auch die abgelehnten. Trigger: "Idee bewerten", "lohnt sich das", "Geschäftsidee
  prüfen", "soll ich das bauen", "idea-filter", "Ideen filtern".
class: M
scope: agency
sensitivity: internal
source: eigenständig geschrieben; Idee der Verdikt-Disziplin aus coreyhaines31/makerskills business-brainstorm (Ideen-Merge, kein Vendoring)
loads:
  - references/framework.md
completion_criteria:
  - "Alle neun Dimensionen sind mit ✅/🟡/❌/❓ bewertet, keine ausgelassen"
  - "Jedes ✅ und jedes ❌ nennt einen Beleg als datei:zeile aus wiki/ oder raw/; ohne Beleg steht dort ❓"
  - "Portfolio-Overlay wurde gelesen (icp/, offer/, voice/, clients/) und grep über wiki/_candidates/ auf Doppel-Bewertung gelaufen"
  - "Genau ein Verdikt aus Build / Sleep on it / Pass / Angle klauen ist gesetzt; bei ❌ auf Problem oder Energie-Fit lautet es Pass"
  - "Ergebnis liegt als /root/raphael-brain/wiki/_candidates/ideen/<YYYY-MM-DD>-<slug>.md mit type: idea-brief, und die README.md des Ordners hat eine neue Zeile"
  - "Bei Verdikt Build: Eintrag in /root/raphael-command-center/ops/review-inbox.md mit Bitte um Gegenlesen durch eine andere Modellfamilie"
---

# idea-filter — Ideen gegen das echte Portfolio filtern

**Lies zuerst:** `/root/raphael-command-center/AGENTS.md` (Regel 8 — nichts prüft die
eigene Hausarbeit; Regel 15 — Datenminimierung).

## Zweck (1 Satz)

Eine Idee bekommt neun ehrliche Noten und ein einziges Verdikt — inklusive des
Verdikts "Nein", das sonst nie ausgesprochen wird.

## Wann

- Eine neue Geschäfts-, Angebots- oder Produktidee steht im Raum.
- Mehrere Ideen konkurrieren um dieselbe Woche Arbeitszeit.
- **Nicht** für Feature-/Code-Design → `brainstorm`.
- **Nicht** als offener Stresstest ohne feste Dimensionen → `grill`.

## Schritt 1 — Portfolio-Overlay laden (Pflicht, vor jeder Bewertung)

Nur lesend, in dieser Reihenfolge:

- `/root/raphael-brain/wiki/company/icp/` — für wen wird gearbeitet, wer ausdrücklich nicht.
- `/root/raphael-brain/wiki/company/offer/` — was heute verkauft wird, zu welchen Ankern.
- `/root/raphael-brain/wiki/company/voice/` — welche Sprache/Positionierung schon steht.
- `/root/raphael-brain/wiki/clients/` — welche Kunden real bedient werden.

Danach Doppel-Check gegen bereits bewertete Ideen:
`grep -rn -i "<kernbegriff>" /root/raphael-brain/wiki/_candidates/`
Gibt es schon einen Brief zur selben Idee, wird der **fortgeschrieben**, nicht ein
zweiter angelegt.

**`/root/raphael-brain/business/` bleibt tabu** — dieser Ordner gehört ausschließlich
Raphael und wird von diesem Skill nicht gelesen und nicht geschrieben.

## Schritt 2 — neun Dimensionen bewerten

Skala je Dimension: ✅ stark · 🟡 unklar/mittel · ❌ schwach · ❓ unbelegt.

| # | Dimension | Kernfrage |
|---|---|---|
| 1 | Problem | Existiert der Schmerz nachweisbar, und ist er teuer genug? |
| 2 | Zielgruppe | Ist sie benennbar, erreichbar und deckt sie sich mit dem ICP? |
| 3 | Wedge | Was ist der schmale erste Einstieg, der zuerst gewinnt? |
| 4 | Monetarisierung | Wer zahlt wann wie viel wofür? (`offers` liefert zu) |
| 5 | Moat | Was ist in 12 Monaten schwerer nachzubauen als heute? |
| 6 | Portfolio-Fit | Zahlt es auf bestehendes Angebot/ICP/Voice ein oder zieht es weg? |
| 7 | Distribution | Über welchen Kanal kommen die ersten 10 Kunden konkret? |
| 8 | Energie-Fit | Will Raphael das über Monate wirklich machen? |
| 9 | Opportunitätskosten | Was fällt dafür weg, und ist der Tausch gut? |

Details, Leitfragen und Bewertungsbeispiele je Dimension:
`references/framework.md`.

## Schritt 3 — Belegpflicht

- Jedes ✅ und jedes ❌ braucht einen Beleg aus `wiki/` oder `raw/` als `datei:zeile`.
- Kein Beleg → die Note ist ❓, nicht 🟡. 🟡 heißt "belegt, aber gemischt".
- **Ab 2 ❓ wird nicht weitergeraten**: erst `methodik/research` (Sachfragen, Primärquellen)
  bzw. `last30days` (was Leute gerade wirklich sagen) aufrufen, Befunde einarbeiten, dann
  neu bewerten. Ein Brief mit ≥2 ❓ ist nicht abschließbar.
- `confidence` im Frontmatter ergibt sich aus der Zahl der ❓:
  0 ❓ = `high` · 1 ❓ = `medium` · 2 ❓ = `low` · ≥3 ❓ = `uncertain`.

## Schritt 4 — Verdikt (genau eines)

**Harte Regel:** ❌ auf Dimension 1 (Problem) **oder** Dimension 8 (Energie-Fit) →
Verdikt ist **Pass**. Keine Ausnahme, keine Verrechnung mit starken anderen Noten.

| Verdikt | Bedeutung | Folge |
|---|---|---|
| **Build** | tragfähig und jetzt dran | Vier-Augen (Schritt 6), dann Umsetzungsplan |
| **Sleep on it** | plausibel, eine Kernfrage offen | offene Frage benennen + Revisit-Vorschlag in `ops/schedule/` |
| **Pass** | trägt nicht | Grabstein-Brief mit `status: rejected` und Ablehnungsgrund |
| **Angle klauen** | Idee trägt nicht, ein Teil davon schon | den brauchbaren Teil benennen und dorthin verweisen, wo er hingehört |

## Schritt 5 — Ablage

- Datei: `/root/raphael-brain/wiki/_candidates/ideen/<YYYY-MM-DD>-<slug>.md`
- Frontmatter nach `/root/raphael-brain/templates/notiz-template.md`, dazu
  `type: idea-brief`, `confidence:` nach Schritt 3, `status: candidate` — bei Verdikt
  Pass stattdessen `status: rejected` mit Ablehnungsgrund direkt nach dem TLDR.
  Kills werden nie gelöscht; der Grabstein verhindert, dass dieselbe Idee in drei
  Monaten erneut durchgekaut wird.
- `README.md` im selben Ordner ist der Index: pro Idee **eine** Zeile —
  Datum · Titel · Verdikt · Ein-Satz-Grund. Der Index wird im selben Zug fortgeschrieben.

## Schritt 6 — Vier-Augen bei "Build"

Verdikt "Build" hat Geldfolge. Deshalb (AGENTS.md Regel 8):

1. Gegenlesen durch eine **andere Modellfamilie** als die bewertende — der Verifier
   prüft pass/fail je Dimension gegen die genannten Belege.
2. Eintrag in `/root/raphael-command-center/ops/review-inbox.md` mit Link auf den Brief.
3. Umgesetzt wird erst nach Raphaels Signatur.

## Rote Linien

- Nie in `/root/raphael-brain/business/` lesen oder schreiben.
- Nie direkt ins kanonische `wiki/` schreiben — immer `_candidates/`.
- Nie zwei Verdikte oder ein "kommt drauf an" — genau eines der vier.
- Keine ✅/❌ ohne Beleg.
- Kein Revisit als Session-Cron (stirbt mit der Session); "Sleep on it" schlägt einen
  Eintrag unter `/root/raphael-command-center/ops/schedule/` vor.

## Nachbarn

- [`brainstorm`](/root/raphael-skills/skills/methodik/brainstorm/SKILL.md) — produkt-/
  codeseitige Ausarbeitung, wenn das Verdikt "Build" steht.
- [`grill`](/root/raphael-skills/skills/methodik/grill/SKILL.md) — offener Stresstest
  ohne feste Dimensionen, wenn die Idee noch keine Form hat.
- [`offers`](/root/raphael-skills/skills/eigene/offers/SKILL.md) — liefert Dimension 4
  (Monetarisierung) zu.
