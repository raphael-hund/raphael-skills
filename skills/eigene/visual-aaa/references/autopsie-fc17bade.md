# Autopsie — AlpenEnergie Offerte Session fc17bade (2026-08-06)

**Session:** `fc17bade-58f2-4a3a-8c8c-ecab3671be5c`  
**Artefakt:** [`/root/clients/client-alpenenergie/offerte-v2/`](/root/clients/client-alpenenergie/offerte-v2/)  
**Stand geprüft:** v14 PNGs unter `export/v14/check-*.png`

## Was Raphael wollte

Firmenvorstellung (nicht reine Preisliste) in AAA-Qualität: Cover nur Eyebrow +
Headline + Subheader, DJI-Haus als Hero, weicher Gradient auf „Verantwortung“,
Monteure auf der Abschluss-Seite bei „50+ Fachkräfte“, Ränder/Safe-Zone,
kein Pfusch.

## Was schiefging (Belege)

| # | Fail | Beleg | Root Cause Prozess |
|---|---|---|---|
| 1 | Cover-Crop: Haus nicht dominant / abgeschnitten | User-Messages v11–v12; mehrfache DJI-Nacharbeit | Crop ohne Self-Read am finalen A4-Render; Asset-Outpaint spekulativ |
| 2 | „Verantwortung“: kein echter Gradient, harter Schwarz-Block | `export/v14/check-05-verantwortung.png` — untere ~40 % tot-schwarz, Beine/Rasen im Dunkel | Overlay zu aggressiv + `backdrop-filter` Maske; als „fertig“ gemeldet ohne Critic-FAIL |
| 3 | Personen abgeschnitten nach „Fix“ | User: „Leute sind abgeschnitten“ | `object-fit: cover/fill` auf vorbereitetem Motiv ohne erneuten Personen-Katalog |
| 4 | Blur-/Spiegel-Streifen als Outpaint-Fake | Assistant gab zu: „geblurter Spiegel-Streifen war Pfusch“ | Trick statt echtem Outpaint; kein G1 gegen Mirror-Band |
| 5 | CTA-Text unvollständig | `check-06-abschluss.png`: Button endet bei „…liegt bei“ | Copy/Layout ohne Text-Vollständigkeits-Check am PNG |
| 6 | Monteure-Anweisung mehrfach falsch umgesetzt | User musste 3× korrigieren (Team-Seite vs. letzte Seite) | Scope nicht als Checkliste; keine Acceptance-Zeile pro Feedback-Punkt |
| 7 | „v14 ist fertig“ trotz sichtbarer Mängel | Assistant-Claim vor User-Wut-Message | DoneClaim ohne fremden Critic am PNG; Regel 14 verletzt |

## Prozess-Lücken (systemisch)

1. **Screenshot-Pflicht existierte als Memory/Skill-Text, nicht als Gate.**
   Agent konnte „fertig“ sagen, ohne dass ein Skript Exit 1 erzwingt.
2. **Self-Read war optional im Kopf, nicht im Ship-Manifest.**
3. **Critic fehlte oder prüfte Builder-Prosa**, nicht Pixel.
4. **Fix-Tunnelblick:** eine Seite gefixt, Nachbarseiten/Regressions nicht
   im selben Zyklus.
5. **Feedback-Items nicht als binäre Acceptance-Checks** (Monteure auf Seite 06
   ja/nein) — stattdessen freie Interpretation.
6. **Workflow mit vielen Agenten ≠ Qualität**, wenn G1 und Critic-Loop weich sind.

## Was das Setup braucht (umgesetzt in visual-aaa)

| Lücke | Gegenmaßnahme |
|---|---|
| Weiches „fertig“ | `visual-ship.json` Pflicht, validate Exit 0 |
| Kein Pixel-G1 | `visual-g1.py` (black-slab, mirror-band, edge-crush, …) |
| Kein Self-Read-Beweis | Manifest-Feld `self_read: true` + `befunde.md` |
| Kein harter Critic | Agent `visual-kritiker`, andere Familie, max 5 Runden |
| Feedback drift | `visual-lattee.md` + pro Feedback-Punkt `check: pass/fail` |
| Blur-Pfusch | Fail-Katalog verbietet Mirror/Blur-Outpaint-Ersatz |

## Messbare Pixel-Fakten v14 (Verantwortung)

- PNG 992×1404; ab ca. y≈1265 lange near-black rows (Mittel ~13).
- Starker Luminanz-Drop in der Mitte; untere Hälfte wirkt wie Platte, nicht wie
  Foto→Text-Verlauf.
- Das ist **G1 `hard-black-slab`**, kein Geschmacksurteil.
