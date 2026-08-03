---
name: ads-statics
version: 0.2.0
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
completion_criteria:
  - "jeder Static-Brief hat Angle × Visual Style × Copy-Bauform × Grounding-Quelle ausgefüllt"
  - "kein Brief ohne Grounding-Quelle ausgeliefert (harter Blocker, kein Statusfeld-Trick)"
  - "Welle hat vorab eine definierte Stopp-Regel (Entscheidungsmetrik + Mindestlaufzeit), bevor produziert wird"
  - "Brief besteht den Marc-Evers-Reduktionscheck: eine Zielgruppe, eine Kernzahl mit Zeitraum, ein Beweis, eine Handlung; jede Box trägt höchstens eine Behauptung"
---

# ads-statics — Angle × Visual-Style-Briefs für statische Ads

**Aufruf:** `ads-statics(kunde: slug [pflicht], welle: int = 1)`

**Lies zuerst:**
- MAKE (`kunde: make`, Sonderfall: Agentur ist eigener Kunde, ICP/Offer/Voice liegen im
  gemeinsamen Brain statt in einem Kundenrepo-Wiki): `/root/raphael-brain/wiki/company/`
  (`icp/`, `offer/`, `voice/`) + bisherige Statics/Ad-Artefakte als Stil-Referenz
  `/root/clients/client-make/ads/statics/`.
- Alle anderen Kunden: `/root/clients/client-<slug>/wiki/` (Dossier-Dateien aus Loop 1 —
  vorhandene ICP/Offer/Proof/Voice/VOC lesen, Dateinamen können je Kunde variieren) +
  `/root/clients/client-<slug>/ads/`.
- **Fehlt der Wissens-Pfad** (bei MAKE: `wiki/company/` leer oder icp/offer/voice fehlen;
  bei anderen Kunden: kein `wiki/` unter dem Kundenpfad, oder kein Dossier darin): stoppen
  und Raphael fragen, nicht aus dem Gedächtnis oder mit erfundenen Annahmen weiterbauen.

## Zweck (1 Satz)

Aus Angle + Kunden-Wissen produzierbare Static-Briefs bauen: Visual Style und Copy-Bauform
gemeinsam gewählt, jedes Konzept mit echter Grounding-Quelle statt erfundenem Claim.

## Marc-Evers-Reduktionsprinzip (Pflicht-Gate vor dem Brief)

Der Marc-Evers-Befund ist eine Bau- und Testregel, kein Copy-Template:

1. **Eine Zielgruppe:** Rolle und nötige Schwelle zuerst nennen; Anfänger/Anti-ICP nicht
   erst nach der Erklärung aussortieren.
2. **Eine Kernzahl mit Zeitraum:** eine große, belegte Zahl sichtbar machen; weitere Zahlen
   nur, wenn sie den einen Beweis verständlicher machen.
3. **Ein Beweis:** Review, echter Vorgang, verifizierter Screen oder zugestimmtes Foto;
   Beweis nicht durch eine zweite Behauptung ersetzen.
4. **Eine Handlung:** genau eine nächste Aktion und eine dazu passende CTA-Zone.
5. **Eine Box = eine Behauptung:** Die Karte muss scanbar sein; mehrere kleine Claims in
   derselben Box sind kein Proof-Stack, sondern unklare Messung.
6. **Static testet die Botschaft billig; Video vertieft ein validiertes Concept.** Der Static-
   Brief darf nicht schon die ganze Video-Erklärung nachbauen.
7. **Native-Look vor Design-Politur, aber nicht vor Wahrheit:** Story-Bubbles, echte Screens
   und rohe Fotos dürfen unperfekt wirken; Claims, Zahlen und Proof bleiben redaktionell echt.

Vor dem Status „sofort produzierbar" abhaken: 1 Zielgruppe | 1 Kernzahl + Zeitraum |
1 Beweis | 1 Handlung. Fehlt ein Beweis, greift zusätzlich der Grounding-Blocker.

## Verhältnis zu ads

`ads-statics` ist die Tiefe hinter Schritt 6 („statics") im Loop-3-Ablauf von `ads`
(`references/loop3-ablauf.md` dort). `ads` bleibt der Einstieg für den gesamten Loop
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
   für F1–F8 (S1–S5 sind Legacy-Aliase), `references/copy-bauformen.md` für die Textform.
   Vor der Auswahl den Marc-Evers-Reduktionscheck durchführen: eine Zielgruppe, eine
   Kernzahl mit Zeitraum, ein Beweis, eine Handlung. Eine Zelle = eine Ad;
   Botschaft fix pro Angle, Rahmen fix pro Style — keine Misch-Copy, sonst misst die
   Testwelle zwei Variablen gleichzeitig. Über alle 15 Layout-Vorlagen des ads-Routers
   zyklen statt auf 2-3 Favoriten zu clustern.
4. **Briefs nach Schema bauen** (`references/brief-schema.md`). Text-Feinschliff (Hook,
   Primary Text, Onscreen-Copy) läuft über `copywriting` — dieser Skill liefert die
   Struktur, nicht den fertigen Stil.
5. **Grounding-Check.** Jeder Brief bekommt vor Auslieferung eine echte Quelle (Review,
   Winning-Ad, Ad-Kommentar, Kundenzitat aus voc.md/PROOF.md). **Fehlt die Quelle: Brief
   ist ein Blocker, nicht auslieferbar** — Zelle geht in die Material-Warteliste, keine
   Erfindung als Lückenfüller.
6. **Bild-Erzeugung nur als Verweis, nicht hier ausführen.** Sobald ein Brief steht, geht
   die eigentliche Bildproduktion an `design` mit der geltenden Bildgenerierung-Policy:
   GPT Image 2 als Standard (Referenzen + Illustrationen), Referenz-Doktrin (inhaltliche +
   stilistische Referenzen als Add Image, Rollen im Prompt benennen), KI-Menschen nur als
   A/B-Test mit hartem Uncanny-Check, Beweis-Kontexte F4 (Chat) und F7 (Award-/UGC-Foto;
   Legacy S4/S3/S5) **nie KI-generiert**. F6-Dashboard-Screens nur als Proof, wenn der
   Screen echt und verifiziert ist. Nach jedem Render: Screenshot-Pflicht vor Auslieferung.

## Welle & Stopp-Regel

Jede Welle definiert vor Produktionsstart: welche Zellen sofort produzierbar sind (kein
fehlendes Material), welche auf eine Material-Liste warten, und die Entscheidungsmetrik der
Testwelle (bei MAKE: qualifizierte Anfrage, nicht CTR — CTR > 2 % ist dort ein Warnsignal
für zu schwache Filterung). Ohne vorab festgelegte Stopp-Regel keine Welle starten —
wiederholtes Peeken und Abbruch beim ersten guten Ergebnis produziert Falsch-Positive.
Die harten Gates vor Schaltung (Claims-QA, Nennungs-Zustimmungen, Tracking) bleiben bei
`ads` (Schaltung = Signatur + Budget-Egress-Gate, nie autonom).

**Mindestbudget je Anzeige — sonst misst die Welle nichts** (am MAKE-Konto gerechnet,
02.08.2026). Ein Lead ist ein seltenes Ereignis; wie oft eine voellig normale Anzeige
trotzdem leer ausgeht, folgt aus Spend und CPL:

| Spend je Anzeige | Anteil ohne Lead (CPL 39-59 CHF) |
|---|---|
| 12 CHF | **74-82 %** |
| 30 CHF | 46-60 % |
| **100 CHF** | **8-18 %** |

Unter ~30 CHF ist ein Nullergebnis eine Aussage ueber das Budget, nicht ueber die Anzeige.
**Erst ab rund 100 CHF wird "kein Lead" aussagekraeftig.** Am MAKE-Bestand nachgemessen:
Statics bekamen im Median 12 CHF, Videos 45 CHF — der scheinbare Formatnachteil der
Statics war fast vollstaendig ein Budget-Unterschied. Ab 100 CHF liegen beide gleichauf
(70 % gegen 73 % Trefferquote).

**Folge fuer die Wellenbreite:** Wellenbudget durch 100 CHF teilen ergibt die Zahl der
gleichzeitig testbaren Zellen. Bei 230 CHF/Woche sind das **zwei** — oder vier bei knapp
zwei Wochen Laufzeit. Mehr Zellen erzeugen mehr Zahlen, aber keine zusaetzliche Erkenntnis.

## Gotchas

- **Statics ohne Grounding-Quelle sind ein Blocker, keine Stilfrage.** Aus dem ads-Router
  übernommen: dieselbe Härte wie claims-qa, nur schon am Brief statt erst am Text.
- **Ein neues Design ist kein neues Konzept.** Neu ist nur, was Angle, Offer, Persona oder
  Format ändert — Mikro-Variationen sind nicht separat messbar und werden von Meta ohnehin
  zur selben Ad-ID gruppiert (siehe `brief-schema.md`).
- **KI-Bilder können hohe CTR bei schlechterer Conversion-Qualität erzeugen.** Eigenes Risiko
  schon in der Test-Phase, nicht nur ein Skalierungs-Kompromiss — deshalb die harte
  Beweis-Kontexte-nie-KI-Regel in Schritt 6.
- **CTR > 2 % ist ein Warnsignal, kein Erfolg** (mindestens bei MAKE eigene, belegte
  Datenlage) — Entscheidungsmetrik bleibt die qualifizierte Anfrage/das echte Ergebnis, nie
  die plattforminterne Metrik allein.
- **Mehr Headline-/Hook-Varianten schlagen mehr Body-Varianten** bei gleichem Zeitbudget —
  siehe `copy-bauformen.md`.
- **F4/F6/F7-Zellen ohne echtes Material sind kein Kompromiss** (Legacy S3/S4/S5). Kein
  Stock-Ersatz, keine Mock-Chats, kein KI-Proof — Zelle wartet, bis Material da ist.
- **Reduktion ist kein Stilgeschmack.** Eine Zielgruppe, eine Kernzahl, ein Beweis, eine
  Handlung; eine Box trägt eine Behauptung. Sind diese vier Teile nicht prüfbar, geht der
  Brief zurück in die Material-/Angle-Klärung.
- **Native/unpoliert heißt nicht absichtliche Tippfehler.** Den Marc-Look als Authentizität
  übernehmen, für MAKE aber die Klartext-Voice und korrekte Schreibweise halten.
- **Hook ohne Mittelteil ist kein Gewinner.** Benefit/Belief zuerst, danach Proof oder
  Einwandbehandlung und genau eine CTA; keine Feature-Laundry-List.
- **Das Export-Headline-Feld kann leer sein.** Onscreen-Copy und Primary Text müssen die
  Botschaft selbstständig tragen und ge-groundet sein.
- **Ein Claim ohne Beleg wird gestrichen, nicht abgeschwächt.** Belegt am MAKE-Fall
  03.08.2026: „Platz 1 in 60 Tagen, garantiert" braucht das Garantie-Dokument; eine
  weichgespülte Fassung derselben Zusage ist kein Fix, sondern derselbe Claim.
