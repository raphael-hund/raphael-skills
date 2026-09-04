---
name: ads-statics
version: 2.10.1
description: >
  Zeigt auf ads Teil Statics. Angle mal Visual-Style-Briefs, acht Styles S1–S8.
  Hook-, Callout- und Angle-Formeln plus kategorisierte Referenz-Bibliothek
  (eine Datei pro Angle A01–A08 unter references/angles/, mit wörtlichem
  Onscreen-Text, Shortcuts und MAKE-Transfer) liegen als Pflicht-Lesen in
  references/. Copy ist ganze Sätze, Hook UND Deal in einer Ad, nur der ICP
  fühlt sich angesprochen. v2.6.1: Hormozi-Mapping der Callout-Typen,
  Likeness/Szene, WHAT×WHO×WHEN für Varianten.
  v2.7.0 (Raphael 03.09.2026): Deliverable ist Text plus visuelle Idee je Karte,
  nie ein Render. Bild-Produktion ist ein eigener Schritt (higgsfield, Shooting, Handy).
  v2.8.0 (Raphael 03.09.2026): Klarheit vor Handwerk. Ohne Case-Zahl auf der Karte
  gilt die Drei-Zeilen-Form: Zustand, Versprechen mit Frist, Null. Keine Schwellen,
  keine Bedingungen, kein Bundle-Beiwerk onscreen.
  v2.9.0 (Raphael 03.09.2026): Objektverkauf (Immobilie, Neubau, Produkt mit Preis)
  ist Produkt-Fakten-Preis-Button, keine Angle-Wahl; Abschnitt in teil-statics.md.
  v2.10.0 (Raphael 03.09.2026): Bild mit GPT Image 2. Logo, Look und Text als
  --image-Referenzen, JSON-Spec, Logo nie neu zeichnen. Pillow-Overlay verboten.
  Referenzen Raphael zuerst zeigen, dann Higgsfield. Beleg: PROPFIN-Welle 1.
  Trigger: "Statics bauen", "Static-Briefs",
  "Bildanzeigen", "Testwelle Statics", "S1-S8".
class: F
scope: agency
sensitivity: internal
loads:
  - ../ads/references/teil-statics.md
  - references/copy-formeln.md
  - references/referenz-statics-index.md
  - references/visual-styles.md
  - references/copy-bauformen.md
  - references/zac-regan-playbook.md
  - references/wettbewerber/grigoletti-ch.md
  - references/wettbewerber/mario-de.md
loads_external: ["/root/.claude/forbidden.md"]
requires_skills: [ads@^2, higgsfield@^0]
completion_criteria:
  - "Teil Statics in ads/references/teil-statics.md gelesen und befolgt"
  - "copy-formeln.md und referenz-statics-index.md gelesen; Hook-, Callout- und Angle-ID stehen im Brief"
  - "Dienstleistung: Die Angle-Datei des gewählten Angles (references/angles/a01..a08) gelesen; die Referenz, von der die Bauform kommt, steht namentlich im Brief. Objektverkauf: Abschnitt Objektverkauf in teil-statics.md befolgt, keine Angle-ID"
  - "Lern-Register des Kunden gelesen, wenn vorhanden; als tot markierte Bauformen werden nicht wieder gebaut"
  - "Jede Onscreen-Zeile ist ein ganzer Satz; Hook UND Deal stehen auf der Ad; nur der ICP fühlt sich angesprochen; Hypothese steht im Brief. Objektverkauf: Fakten-Zeilen dürfen Aufzählung sein (Zimmer · m² · Preis), eine Botschaft je Welle, nur das Foto wechselt"
  - "copywriting/scripts/forbidden-check.py auf jedem Brief Exit 0"
  - "Klarheits-Regel: ohne Case-Zahl onscreen höchstens drei Aussagen (Zustand, Versprechen mit Frist, Null). Umsatzschwelle, Bundle-Bestandteile und Garantiebedingungen stehen nie auf der Karte."
  - "Deliverable ist Text plus visuelle Idee je Karte, Raphael sieht Logo/Look/Text-Referenzen, dann Higgsfield gpt_image_2 mit Logo plus Look plus JSON-Spec. Pillow-Overlay und neu gezeichnetes Logo sind Fail."
---

# ads-statics → ads Teil Statics

Arbeit steht in `/root/raphael-skills/skills/eigene/ads/SKILL.md`
dann `references/teil-statics.md`.

Drei Pflicht-Referenzen liegen hier:

- `references/copy-formeln.md` — Hook F01–F12, Callout C01–C06, Angle A01–A08.
- `references/referenz-statics-index.md` — Router auf die kategorisierte Bibliothek:
  eine Datei pro Angle unter `references/angles/`, dazu die zehn Shortcuts über alle
  Gewinner. Vor jedem Brief den Index UND die Angle-Datei des gewählten Angles lesen.
- `references/visual-styles.md` — die acht Rahmen S1–S8.
- `references/zac-regan-playbook.md` — Zac Regan destilliert aus 258 Reels: Hook-Häufigkeiten,
  zwölf Copy-Gesetze, was für Statics gilt, was wir nicht übernehmen.
- `references/wettbewerber/` — CH/DE-Wettbewerber (Grigoletti, Mario Reinwarth, 28.08.2026)
  als Kontrast- und Baustein-Referenzen. Kontrast-Warnungen oben in jeder Datei beachten.

## Klarheit vor Handwerk (Raphael, 03.09.2026)

Wenn keine gute Zahl auf die Karte darf (kein Case, kein Screen), muss die Karte
viel klarer werden, nicht voller. Die Formeln F01 bis F12 und C01 bis C06 sind Werkzeug,
kein Pflichtprogramm. Auf einer Karte ohne Case:

1. **Zustand in einem Satz**, den der Leser sofort mit Ja oder Nein beantwortet.
   «Deine Kunden googeln dich. Bist du in den Top 3?»
2. **Versprechen mit Frist.** «Wir bringen dich in 90 Tagen in die Top 3 bei Google.»
3. **Null.** «Oder du zahlst 0 CHF.»

Fertig. Kein «ab 20k Monatsumsatz», kein «mit Fotoshooting», kein «in deiner Stadt
für deine Keywords», keine Mitwirkungsklausel. Das gehört ins Formular und in den Vertrag,
nicht aufs Bild. Branche kommt als ein Wort in Zeile 1 oder als Szene im Bild.

Test: Liest ein Fremder die Karte in einer Sekunde und kann das Versprechen in einem
Satz nachsprechen? Wenn nicht, streichen, bis es geht.

Anti-Beispiel (Welle 4 erste Fassung, 03.09. vormittags):
«Neue Website mit Fotoshooting plus Top 3 bei Google in deiner Stadt in 90 Tagen,
sonst keinen Rappen.» Sieben Bausteine in einem Satz, nicht nachsprechbar.

Richtig: «Top 3 bei Google in 90 Tagen, oder du zahlst 0 CHF.»

## Objektverkauf (Raphael, 03.09.2026)

Immobilie, Neubau, Produkt mit Preis: keine Angle-Wahl. Produkt gross, drei bis fünf Fakten,
Preis, Verknappung klein, ein Button. Regel und Belege stehen in
`../ads/references/teil-statics.md`, Abschnitt «Objektverkauf». Beispiel:
`/root/clients/ak-omega/ads/statics/welle-1-umiken/TEXT-UND-IDEE.md`.

## Deliverable (Raphael, 03.09.2026, Bild-Schritt 03.09. abends)

Je Karte zuerst Text und Idee, **dann das Bild**, nicht Pillow.

1. Onscreen-Zeilen (Callout, Problem oder Hook, Deal, CTA), ganze Sätze, unter 35 Wörter.
2. Primary Text, erster Absatz trägt allein.
3. Visuelle Idee: Szene in zwei Sätzen, Bildquelle, Stil-Chassis (S1 bis S8).
4. IDs: Style, Angle, Hook, Callout, Grounding-Referenz.
5. **Referenzen Raphael zeigen**, bevor Higgsfield läuft: Logo-Datei, Look, Onscreen-Text wortgleich. Look = Schriftart, Farben als Hex, Signaturelement, Buttonform, Bildstil; als Referenzbild plus als Wörter in der JSON-Spec (Definition in `higgsfield/references/ops.md`, Ads-Static). Fehlt Logo oder Look, nicht bauen.
6. **Bild** über Skill higgsfield, Job `gpt_image_2`. Drei `--image`: (1) Logo, (2) Look, (3) Inhaltfoto oder Portrait. Prompt = JSON-Spec plus Text-Fidelity-Regel aus `higgsfield/references/ops.md` Abschnitt Ads-Static. Logo compositen, nie neu zeichnen. Umlaute 1:1, kein ß, kein ae/oe/ue.
7. Ergebnis mit Read prüfen: Headline vollständig, Logo lesbar, Text = Spec. Fail → neuer Job, kein Pillow-Flicken.

Pillow, ImageMagick-Text und `build.py` sind für Onscreen-Copy und Markenlogo **Fail**. Beleg: PROPFIN-Welle 1 (`/root/clients/propfin/ads/creatives/`), Umiken-Karten v1 Headline «Umike» und Logo-Matsch (KRITIK-KARTEN.md).
Beispiel Text: `/root/clients/make/ads/statics/welle-4-branchen/TEXT-UND-IDEE.md`.
Beispiel Bild: `/root/clients/propfin/ads/creatives/feed/07-haus-zu-gross.png`.

Der Skill lernt aus den Referenzen. Er schreibt nicht aus dem Gedächtnis.
Ein Brief ohne gelesene Angle-Datei ist unbelegt und wird nicht ausgeliefert.
