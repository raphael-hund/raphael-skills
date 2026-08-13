---
name: ads-statics
version: 0.4.0
description: >
  Feuert für statische Meta-/Paid-Ad-Creatives: Angle × Visual-Style-Briefs,
  Copy-Bauformen, Grounding-Check vor Bildproduktion. Trigger: "Statics bauen",
  "Static-Briefs", "Bildanzeigen", "Testwelle Statics", "Angle-Matrix für Creatives".
  Ergänzt ads (Loop 3, Schritt 6 „statics") um die Tiefe der Visual-Style- und
  Copy-Bauform-Wahl; Bild-Erzeugung selbst bleibt bei design/Bildgenerierung-Policy.
class: F
scope: agency
sensitivity: internal
source: kondensiert aus MAKE-Testwelle 1
  (`/root/clients/client-make/ads/statics/2026-07-22-MAKE-Statics-Briefs.md`) +
  konsolidierten Candidate-Seiten Stand 2026-07-23
  (`/root/raphael-brain/wiki/_candidates/konsolidiert-2026-07-23/`), die nach Freigabe
  in `wiki/craft/ads/creative/` aufgehen.
loads:
  - references/visual-styles.md
  - references/copy-bauformen.md
  - references/brief-schema.md
requires_skills: [copywriting@^0]
loads_external: ["/root/.claude/forbidden.md"]
completion_criteria:
  - "copywriting/scripts/forbidden-check.py auf allen Copy-Elementen im Brief gelaufen, Exit 0"
  - "jeder Static-Brief hat Angle × Visual Style × Copy-Bauform × Grounding-Quelle ausgefüllt"
  - "kein Brief ohne Grounding-Quelle ausgeliefert (harter Blocker, kein Statusfeld-Trick)"
  - "Welle hat vorab eine definierte Stopp-Regel (Entscheidungsmetrik + Mindestlaufzeit), bevor produziert wird"
---

# ads-statics — Angle × Visual-Style-Briefs für statische Ads

**Aufruf:** `ads-statics(kunde: slug [pflicht], welle: int = 1)`

**Schritt 0 — Wissens-Landkarte laden (PFLICHT):**

```bash
python3 /root/raphael-brain/scripts/brain-context.py index craft/ads
```

Liefert alle freigegebenen Ads-Wissensseiten mit Titel und TLDR (~17.000 Zeichen, keine
Volltexte). Lies daraus die 1–3 passenden Seiten per Read-Tool nach. Läuft der Befehl
nicht, melde `BLOCKED` statt zu raten.

**Lies zuerst:**
- MAKE (`kunde: make`, Sonderfall: Agentur ist eigener Kunde, ICP/Offer/Voice liegen im
  gemeinsamen Brain statt in einem Kundenrepo-Wiki): `/root/raphael-brain/wiki/company/`
  (Landkarte: `brain-context.py index company`)
  (`icp/`, `offer/`, `voice/`) + bisherige Statics/Ad-Artefakte als Stil-Referenz
  `/root/clients/client-make/ads/statics/`.
- Alle anderen Kunden: `/root/clients/client-<slug>/wiki/` (Dossier-Dateien aus Loop 1:
  vorhandene ICP/Offer/Proof/Voice/VOC lesen, Dateinamen können je Kunde variieren) +
  `/root/clients/client-<slug>/ads/`.
- **Fehlt der Wissens-Pfad** (bei MAKE: `wiki/company/` leer oder icp/offer/voice fehlen;
  bei anderen Kunden: kein `wiki/` unter dem Kundenpfad, oder kein Dossier darin): stoppen
  und Raphael fragen, nicht aus dem Gedächtnis oder mit erfundenen Annahmen weiterbauen.

## Zweck (1 Satz)

Aus Angle + Kunden-Wissen produzierbare Static-Briefs bauen: Visual Style und Copy-Bauform
gemeinsam gewählt, jedes Konzept mit echter Grounding-Quelle statt erfundenem Claim.

## Verhältnis zu ads

`ads-statics` ist die Tiefe hinter Schritt 6 („statics") im Loop-3-Ablauf von `ads`
(`eigene/ads/references/loop3-ablauf.md` dort). `ads` bleibt der Einstieg für den gesamten Loop
(Voice-of-Customer → Angles → Hooks → ... → Statics → Claims-QA → Schaltung); dieser Skill
übernimmt nur den Statics-Schritt im Detail. Layout-Vorlagen (15 Templates) und das
Kunden-Review-Artefakt bleiben im ads-Router und werden hier nur referenziert, nicht
kopiert: `../ads/references/vendor/coreyhaines-ads/static-ad-templates-en.md`.

## Ablauf

1. **Kunden-Wissen laden.** ICP/Offer/Proof/Voice + vorhandene voc.md-Zitate und bisherige
   Statics-Performance (falls vorhanden) lesen. Ohne Kunden-Wiki: stoppen, siehe oben.
2. **Angles vom ads-Router übernehmen.** Nicht neu erfinden — Angles kommen aus
   `creative/ads-create.md` bzw. bereits bestehenden Angle-Listen des Kunden
   (Referenz-Framing-Pflicht: jeder Angle steht an einem belegten Long-Runner oder eigenen
   Gewinner-Ad, nie freihändig erfunden).
3. **Je Angle Visual Style + Copy-Bauform wählen (Matrix).** `references/visual-styles.md`
   für den Rahmen, `references/copy-bauformen.md` für die Textform. Eine Zelle = eine Ad;
   Botschaft fix pro Angle, Rahmen fix pro Style: keine Misch-Copy, sonst misst die
   Testwelle zwei Variablen gleichzeitig. Über alle 15 Layout-Vorlagen des ads-Routers
   zyklen statt auf 2-3 Favoriten zu clustern.
4. **Briefs nach Schema bauen** (`references/brief-schema.md`). Text-Feinschliff (Hook,
   Primary Text, Onscreen-Copy) läuft über `copywriting`. Dieser Skill liefert die
   Struktur, nicht den fertigen Stil.
5. **Grounding-Check.** Jeder Brief bekommt vor Auslieferung eine echte Quelle (Review,
   Winning-Ad, Ad-Kommentar, Kundenzitat aus voc.md/PROOF.md). **Fehlt die Quelle: Brief
   ist ein Blocker, nicht auslieferbar**: Zelle geht in die Material-Warteliste, keine
   Erfindung als Lückenfüller.
6. **Bild-Erzeugung nur als Verweis, nicht hier ausführen.** Sobald ein Brief steht, geht
   die eigentliche Bildproduktion an `design` mit der geltenden Bildgenerierung-Policy:
   GPT Image 2 als Standard (Referenzen + Illustrationen), Referenz-Doktrin (inhaltliche +
   stilistische Referenzen als Add Image, Rollen im Prompt benennen), KI-Menschen nur als
   A/B-Test mit hartem Uncanny-Check, Beweis-Kontexte (S3/S4 aus visual-styles.md) **nie
   KI-generiert**. Nach jedem Render: Screenshot-Pflicht vor Auslieferung.

## Welle & Stopp-Regel

Jede Welle definiert vor Produktionsstart: welche Zellen sofort produzierbar sind (kein
fehlendes Material), welche auf eine Material-Liste warten, und die Entscheidungsmetrik der
Testwelle (bei MAKE: qualifizierte Anfrage, nicht CTR, CTR > 2 % ist dort ein Warnsignal
für zu schwache Filterung). Ohne vorab festgelegte Stopp-Regel keine Welle starten:
wiederholtes Peeken und Abbruch beim ersten guten Ergebnis produziert Falsch-Positive.
Die harten Gates vor Schaltung (Claims-QA, Nennungs-Zustimmungen, Tracking) bleiben bei
`ads` (Schaltung = Signatur + Budget-Egress-Gate, nie autonom).

## Gotchas

- **Statics ohne Grounding-Quelle sind ein Blocker, keine Stilfrage.** Aus dem ads-Router
  übernommen: dieselbe Härte wie claims-qa, nur schon am Brief statt erst am Text.
- **Ein neues Design ist kein neues Konzept.** Neu ist nur, was Angle, Offer, Persona oder
  Format ändert: Mikro-Variationen sind nicht separat messbar und werden von Meta ohnehin
  zur selben Ad-ID gruppiert (siehe `brief-schema.md`).
- **KI-Bilder können hohe CTR bei schlechterer Conversion-Qualität erzeugen.** Eigenes Risiko
  schon in der Test-Phase, nicht nur ein Skalierungs-Kompromiss. Deshalb die harte
  Beweis-Kontexte-nie-KI-Regel in Schritt 6.
- **CTR > 2 % ist ein Warnsignal, kein Erfolg** (mindestens bei MAKE eigene, belegte
  Datenlage): Entscheidungsmetrik bleibt die qualifizierte Anfrage/das echte Ergebnis, nie
  die plattforminterne Metrik allein.
- **Mehr Headline-/Hook-Varianten schlagen mehr Body-Varianten** bei gleichem Zeitbudget:
  siehe `copy-bauformen.md`.
- **S3/S4-Zellen ohne echtes Material sind kein Kompromiss.** Kein Stock-Ersatz, keine
  Mock-Chats: Zelle wartet, bis Material da ist.
