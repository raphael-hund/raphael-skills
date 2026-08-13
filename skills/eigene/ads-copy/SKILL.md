---
name: ads-copy
version: 1.2.0
description: >
  Feuert für den Primary Text einer Meta-Ad — den Fliesstext über/unter dem Creative,
  plus Headline und Description. Baut ihn nach gemessenen Mustern aus 105 echten Ads
  von 10 Werbetreibenden (Marc Evers, Speedscaling, SEOLabs, Neuhaus Digital, Pascal
  Harting, Dr. Matt Shiver, Charlie Morgan, Ben Heath, Enpal, Tim Krasenbrink) statt
  aus dem Gefühl. Trigger: "Primary Text schreiben", "Ad-Text", "Anzeigentext",
  "Copy unter der Ad", "Text zur Anzeige", "Ad Copy". Für Video-Skripte siehe
  ads-video, für Statics-Briefs ads-statics, für den Loop-3-Ablauf ads.
class: F
scope: agency
sensitivity: internal
loads_external: ["/root/.claude/forbidden.md", "/root/raphael-skills/skills/eigene/ads-video/references/voice-dna-ads.md"]
completion_criteria:
  - "copywriting/scripts/forbidden-check.py gelaufen, Exit 0 — hartes Gate vor pruefen.py; Ausgabe im Output zitiert"
  - "Jeder Text durch scripts/pruefen.py: 0 harte Verstösse (Exit-Code 0)"
  - "Erster Absatz <= 125 Zeichen (steht vor Metas 'Mehr anzeigen')"
  - "Höchstens 1 Gedankenstrich (—) pro Text — im Korpus haben 98 % gar keinen"
  - "Mindestens 5 Absätze, kein Absatz über 250 Zeichen (Ausnahme Bauform 2: 3 Absätze, dann pruefen.py --kurzform)"
  - "Jede Zahl im Text hat eine benannte Quelle oder ist als Zuspitzung markiert"
provenance: >
  Korpus am 03.08.2026 über die Foreplay-API erhoben (105 eindeutige Ad-Texte,
  56 deutsch). Rohdaten in raphael-brain/raw/ads-copy-2026-08-03/.
  Auslöser: Raphaels Kritik an den MAKE-SEO-Texten vom 03.08. — zu viele
  Gedankenstriche, zu wenige Absätze.
loads:
  - references/referenz-korpus.md
  - references/bauformen.md
requires_skills:
  - copywriting
  - no-ai-slop
---

# ads-copy — der Text unter der Anzeige

## Zweck (1 Satz)

Einen Primary Text schreiben, der wie die Texte aussieht, die im Markt tatsächlich
laufen — nicht wie ein sauberer KI-Aufsatz.

## Der Auslöser dieses Skills

Am 03.08.2026 hat Raphael die MAKE-SEO-Texte kritisiert: zu viele Gedankenstriche,
zu wenige Absätze. Beides ist nachgemessen worden statt diskutiert. Ergebnis:

| | Korpus (56 deutsche Ads) | Meine Texte |
|---|---|---|
| Texte mit Gedankenstrich `—` | **2 %** (1 von 56) | 100 %, ~4 pro Text |
| Absätze (Median) | 6 | 6 |
| Zeichen je Absatz (Median) | 102 | ~180 |

Der Gedankenstrich war der eigentliche Fehler. Er ist ein Schriftsprache-Zeichen;
diese Leute schreiben Sprechsprache. Die zweite Hälfte stimmte fast — die Absätze
waren zu fett, nicht zu wenige.

## Die harten Zahlen (gemessen, nicht geschätzt)

Basis: 56 deutschsprachige Ad-Texte, `references/referenz-korpus.md` zeigt die Volltexte.

| Metrik | 25 % | **Median** | 75 % |
|---|---|---|---|
| Zeichen gesamt | 461 | **755** | 1093 |
| Absätze (durch Leerzeile getrennt) | 3 | **6** | 8 |
| Zeichen je Absatz | 61 | **102** | 158 |
| Wörter je Satz | 7 | **13** | 20 |

Weitere Anteile: 96 % nennen eine Zahl · 57 % stellen eine Frage · 55 % nutzen eine
Bullet-Liste · 55 % nutzen Emoji als Listenzeichen · 45 % enden auf einem
Imperativ-CTA · 34 % bauen eine „ohne …"-Konstruktion.

Der letzte Absatz (der CTA) hat im Median nur **57 Zeichen** — er ist immer der
kürzeste des Textes.

## Die sieben Regeln

1. **Höchstens ein Gedankenstrich, besser keiner.** Wo einer stehen will: Punkt
   setzen und einen neuen Satz beginnen. Aus „Er bekommt die Anfrage — der Rest
   erfährt nie, dass es sie gab" wird „Er bekommt die Anfrage. Der Rest erfährt nie,
   dass es sie gab." Das ist die Regel, die Raphael eingefordert hat.

2. **Absätze von 1 bis 3 Zeilen.** Median sind 102 Zeichen. Ein Absatz über 250
   Zeichen wird geteilt. Auf dem Handy ist ein Fünfzeiler eine graue Wand.

3. **Der erste Absatz steht allein und trägt allein.** Meta schneidet nach ~125
   Zeichen mit „Mehr anzeigen" ab. Was danach kommt, liest nur, wer vom ersten
   Absatz gehalten wurde. Kein Aufwärmen, keine Einleitung.

4. **Zahlen statt Adjektive.** 96 % der Referenz-Ads nennen eine Zahl. „75
   Agenturbetreiber", „31 Tage", „500 € Ad-Spend", „64 Anfragen". Nicht „viele
   zufriedene Kunden".

5. **Kurze Sätze mischen.** Median 13 Wörter, aber 30 % der Sätze haben höchstens
   8. Der Rhythmus entsteht aus dem Wechsel. Drei gleich lange Sätze
   hintereinander lesen sich wie eine Broschüre.

6. **Beweis vor Behauptung.** Die stärksten Texte im Korpus nennen zuerst ein
   nachprüfbares Ergebnis mit Namen und Zahl, dann erst das Angebot. Marc Evers
   nennt Kunden beim Namen mit Eurobetrag. Am stärksten ist ein Beweis, den der
   Leser selbst prüfen kann.

7. **Der CTA ist ein Satz, nicht ein Absatz.** Median 57 Zeichen, Imperativ,
   und wenn möglich mit Zeitangabe: „Trag dich hier ein, ich rufe dich in den
   nächsten 48 Stunden persönlich an."

## Ablauf

1. **Material holen.** Kunden-Dossier (`wiki/ICP.md`, `OFFER.md`, `PROOF.md`,
   `VOICE.md`), die laufenden Ads des Kunden aus Meta und — falls es um ein Video
   geht — dessen Transkript. Nie ohne das Transkript schreiben: der Text verlängert
   den Hook des Videos, er wiederholt ihn nicht.
2. **Bauform wählen.** `references/bauformen.md` — sechs Formen, aus dem Korpus
   abgeleitet, je mit Beleg-Ad.
3. **Schreiben.** Erst der erste Absatz allein, bis er unter 125 Zeichen trägt.
   Dann der Rest.
4. **Prüfen — zwei Skripte, beide grün.**
   - `python3 /root/raphael-skills/skills/eigene/copywriting/scripts/forbidden-check.py <datei>`
     misst die Slop-Muster A–F. Läuft **zuerst**. Exit 1 = nicht ausliefern.
   - `scripts/pruefen.py <datei>` misst die Korpus-Kriterien (Länge, Absätze,
     Gedankenstriche, Zahl, CTA). Exit 1 = nicht ausliefern.
   - Bei **Bauform 2** (Kurzform, 3 Absätze unter 300 Zeichen):
     `scripts/pruefen.py --kurzform <datei>`. Ohne den Schalter blockt das
     Skript diese belegte Bauform, weil die Standardgrenzen bei 5 Absätzen
     und 300 Zeichen liegen.

   Beide Skripte messen Form, keine Bedeutung. Sie ersetzen den Eval-Agenten
   nicht, sie filtern vor ihm.
5. **Claims.** Jede Zahl und jede Garantie durch `ads` → Schritt claims-qa. Der
   Prüfer ist nie der Autor (Regel 8).

## Gotchas

- **Der Gedankenstrich ist der Verräter.** Er ist das häufigste Einzelmerkmal von
  KI-Text in deutscher Werbung. Ein Text mit vier Gedankenstrichen liest sich
  redigiert; die echten Ads lesen sich gesprochen.
- **„Mehr anzeigen" ist kein Absatzende.** Meta schneidet mitten im Satz. Wer den
  Hook auf 200 Zeichen anlegt, verliert die Hälfte davon ungelesen.
- **Emoji-Bullets sind im Meta-Primary-Text Norm.** 55 % des Korpus nutzen sie.
  ✅ für das, was der Kunde bekommt, ❌ für das, was er nicht mehr braucht,
  👉 für Beweise. Nie mehr als eine Liste pro Text.

  **Vorrang-Regel (sonst Konflikt):** `copywriting/references/floskel-verbote.md`
  verbietet Emoji-Aufzählungen in seriöser Copy, `/root/.claude/forbidden.md` B7
  verbietet sie als Ersatz für Sätze. Für **Meta-Ad-Primary-Text** gewinnt die
  hier belegte Korpus-Norm — aber nur, wenn jeder Punkt eine eigene Information
  trägt ("✅ Festpreis vor Anfahrt"), nie als Adjektiv-Kette
  ("✅ Schnell ✅ Günstig"). Auf allen anderen Kanälen (Landingpage, SEO, E-Mail,
  Social) gilt das Verbot ohne Ausnahme.
- **Der Text darf das Video nicht nacherzählen.** Er verlängert den Hook um das,
  was im Video keinen Platz hatte — meist die Beweise und die Qualifikation.
- **Kein Text ohne Zahl.** Fehlt eine belegbare Zahl, ist nicht der Text das
  Problem, sondern das fehlende Material. Dann Beweise beschaffen, nicht schwurbeln.
- **Vier der von Raphael genannten Werbetreibenden fehlen im Korpus**
  (Michael Diaz, Daniel Kremmer, MMG, Dead Ads) — in Foreplay gibt es unter diesen
  Namen nur Namensgleiche. Die Regeln stehen also auf 10 von 14 Konten. Wer die
  vier nachträgt, erhöht die Basis; die gemessenen Werte sollten dann neu gerechnet
  werden.
