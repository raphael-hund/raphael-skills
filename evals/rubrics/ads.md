# Rubrik: Ads (evals/rubrics/ads.md)
Schwelle: 0.7   Skala je Frage: 0/1/2

> Gilt für jeden Ship-Output der ads-Familie: Primary Text (`ads-copy`),
> Video-Skript (`ads-video`), Static-Brief (`ads-statics`), Hook-Sets (`ads`).
>
> Angelegt 2026-08-13. Auslöser: Das Kriterium "G2 >= 0.7 … Rubrik
> `evals/rubrics/ads.md`" stand in `ads/SKILL.md` und `loop3-ablauf.md`,
> die Datei existierte aber nicht. Das Gate war nicht berechenbar.
>
> Format nach `skills/eigene/eval/references/rubric-author.md`.
> Judge-Vertrag: pass/fail je Frage mit **wörtlich eingefügtem Beleg**.
> Nie "erkläre dein Denken" fragen (Regel 19 / Fable-Gotcha).

---

1. **[VETO] Jede Zahl, jeder Name, jedes Ergebnis hat eine benannte Quelle.**
   Keine Quelle = keine Zahl. Markt-Referenzen belegen Bauform, nie die Zahlen
   des Kunden.
   Beleg: Zitat aus `client-<slug>/wiki/PROOF.md`, `voc.md` oder dem
   Kunden-Korpus, je Zahl im Output.
   (< 2 ⇒ Gesamt-FAIL)

2. **[VETO] `forbidden-check.py` lief mit Exit 0.**
   Skript: `skills/eigene/copywriting/scripts/forbidden-check.py`.
   Hinweise (A1/A5/A6/A7/B6b) sind einzeln beurteilt, nicht ignoriert.
   Beleg: Skript-Ausgabe im Output zitiert, plus je Hinweis "gefixt" oder
   "bewusst behalten weil <Grund>".
   (< 2 ⇒ Gesamt-FAIL)

3. **Der Hook trägt allein.**
   Erste Zeile funktioniert ohne Bild, ohne Ton, ohne Kontext. Zahl, Einwand
   oder Zielgruppen-Callout in Satz 1. Keine Aufwärm-Zeile davor.
   Beleg: erste Zeile wörtlich zitiert, plus die gewählte F-ID
   (`ads-video/references/hook-formeln.md`) oder Hook-Familie
   (`voice-dna-ads.md` V6).

4. **Brand-Voice getroffen.**
   Anrede, Jargon-Level und Verbots-Sätze stimmen mit der `VOICE.md` des Kunden
   überein. Bei Widerspruch gewinnt der Kunde.
   Beleg: eine Zeile aus dem Output gegen eine Zeile aus `VOICE.md` gestellt.

5. **Der CTA verspricht einen Wert und benennt die Reibung.**
   Aktion + Ort + was danach passiert + Zeitrahmen. Kein "Hier klicken".
   Ein CTA-Text, im ganzen Output identisch.
   Beleg: CTA wörtlich zitiert.

6. **Der Output ist nicht generisch.**
   Test: Könnte dieser Text für jeden Wettbewerber derselben Branche stehen?
   Falls ja, fehlt eine echte Zahl, ein Eigenname oder eine echte Konsequenz.
   Beleg: die konkrete Stelle benennen, die nur auf diesen Kunden passt.

---

## Gewichtung

Alle sechs Fragen gleich gewichtet, Skala 0/1/2, maximal 12 Punkte.
Schwelle 0.7 = mindestens 9 von 12.

Frage 1 und 2 sind Veto: unter 2 Punkten ist das Gesamt-Verdikt FAIL,
egal wie hoch die Summe liegt. Ein grüner Gesamtscore darf einen erfundenen
Claim oder ungeprüften Slop nie überdecken.

## Kalibrierung (G4-Rückkopplung)

Floppt ein hoch bewerteter Output im echten Konto (Hookrate, CPL, qualifizierte
Anfrage), wird der Fall zum Anti-Beispiel und diese Rubrik nachgeschärft.
Der Judge wird nicht beschönigt. Entscheidungsmetrik bleibt die qualifizierte
Anfrage, nie CTR allein — hohe CTR bei schwacher Conversion ist ein Warnsignal
(`ads/SKILL.md`, Gotchas).
