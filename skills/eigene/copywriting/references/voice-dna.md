# Voice-DNA — Casing, Rhythmus, Lexikon als Regeln

> Quelle: 8 live analysierte Referenzseiten aus Raphaels Referenz-Set
> (elephantsolar.de, matthias-aumann.de, speedscaling.de, go.ruempelwelt.de,
> acquisition.com, enpal.de ×3). Stand 2026-08-13.
>
> **Verhältnis zu anderen Dateien:**
> - `sprachstile-referenz.md` = WELCHER der 6 Stile passt (Wahl pro Auftrag).
> - **Diese Datei** legt fest, WIE du schreibst, sobald der Stil steht. Gilt in allen Stilen.
> - `/root/.claude/forbidden.md` = WAS nie vorkommt. Härtestes Gate.
> - `VOICE.md` des Kunden = gewinnt bei jedem Widerspruch.

---

## 1. Casing

| Element | Regel | Beispiel |
|---|---|---|
| Headline | Satz-Case, kein Title Case | "So senkst du deine Stromkosten" |
| Subline | Satz-Case | "Ab 98 € im Monat, ohne Anzahlung" |
| Button | Satz-Case, Verb zuerst | "Ersparnis berechnen" |
| Anrede "Du" | groß, wenn der Kunde respektvoll duzt | "Du" / "Dein" |
| Versalien | max. 1 Wort pro Seite, nur bei echtem Beweis | "live BEWEISEN" |
| Produktnamen | exakt wie der Kunde schreibt | "Enpal.One+" |
| Zahlen | Ziffern ab 2, Tausenderpunkt | "2 Wochen", "70.925 €" |
| Prozent | Ziffer + Leerzeichen + % | "85 %" |
| Euro | Ziffer + Leerzeichen + € | "13.000 €" |

**Nie:** Title Case im Deutschen. Kein "Jetzt Ihr Kostenloses Erstgespräch Sichern".

---

## 2. Rhythmus

**Gemessen an den Referenzseiten:** Hooks und Benefit-Zeilen liegen bei 5–12 Wörtern.
Erklär-Absätze liegen bei 15–25 Wörtern.

### Regel R1 — Der Sprung
Satzlängen müssen springen. Nach einem langen Satz kommt ein kurzer.
Drei Sätze mit fast gleicher Wortzahl hintereinander sind ein Fail
(`forbidden.md` A7).

Muster, das trägt: **lang → kurz → mittel**.

> "Du hast solche Versprechen schon 1.000-mal gehört. 1.000-mal steckte nichts
> dahinter. Deshalb zeigen wir dir die Zahlen aus dem Werbekonto, bevor du
> irgendetwas entscheidest."

### Regel R2 — Fragment sparsam
Ein Fragment (Satz ohne Verb) pro Sektion. Zwei hintereinander ergeben ein
Staccato-Paar (`forbidden.md` A1).

- ✓ "Festpreis. Und das Angebot kommt in 24 Stunden."
- ✗ "Kein Warten. Kein Vertrösten."

### Regel R3 — Absatzlänge
Web-Copy: max. 3 Zeilen pro Absatz. Ad-Copy: max. 2.
Skeptiker-Stil (Stil 3): Ein-Zeilen-Absätze erlaubt, aber max. 4 in Folge.

### Regel R4 — Zahl früh
Die erste konkrete Zahl steht spätestens im zweiten Satz der Sektion.
Zahl ohne Quelle = Zahl raus (`forbidden.md` E1).

### Regel R5 — Ein Gedanke pro Satz (ASD-STE100)
Max. 20 Wörter im Fließtext. Max. 25 in Anleitungsschritten.
Kein "und außerdem", kein Nebensatz-Stapel.

**Kanal-Ausnahme:** Im Body einer Landingpage und in SEO-Texten gilt die Grenze
aus `kanaele.md` (15–25 Wörter pro Satz). Dort trägt ein längerer Erklär-Satz.
In Ads, Video-Skripten, E-Mails und Social gilt R5 ohne Ausnahme.

---

## 3. Lexikon

### Erlaubt und erwünscht

| Statt | Schreib |
|---|---|
| Lösung | das, was der Kunde bekommt ("Festpreis-Angebot") |
| Prozess | Ablauf, Schritte |
| optimieren | verbessern, senken, erhöhen — mit Zahl |
| individuell | für dich gerechnet, auf deine PLZ |
| effizient | schneller, günstiger — mit Zahl |
| implementieren | einbauen, einrichten |
| Investition | Preis, Kosten (außer der Kunde will "Investition") |
| Potenzial | konkreter Betrag |

### Verbotene Wörter (Kern-Set)

robust · nahtlos · leistungsstark · ganzheitlich · maßgeschneidert ·
innovativ · zukunftssicher · Game-Changer · revolutionär · einzigartig ·
State-of-the-Art · Synergien · Mehrwert (allein stehend) · perfekt abgestimmt

→ Vollständige Liste: `references/floskel-verbote.md` + `/root/.claude/forbidden.md`.

### Fach-Anglizismen, die bleiben dürfen
Nur im Ads-/Marketing-Kontext gegenüber Fachpublikum:
ROAS · Adspend · Hookrate · CPL · CTR · Funnel · Creative · Retargeting.

Gegenüber Endkunden (Hausbesitzer, Privatperson): keiner davon.

---

## 4. Anrede

**Default: Duzen.** Fünf von sechs Referenzstilen duzen.

**Siezen nur bei:** hoher Kaufpreis (> 10.000 €) UND breiter Zielgruppe mit
älteren Käufern (Stil 6, Enpal-Muster). Dann warm siezen.

**Nie mischen.** Ein Wechsel Du→Sie innerhalb einer Seite ist der dokumentierte
Rümpelwelt-Fehler. Vor dem Schreiben festlegen, danach durchhalten.

---

## 5. Beweis-Muster

Jede Referenzseite belegt anders. Das Muster folgt dem Preis:

| Preisklasse | Beweisform |
|---|---|
| lokal, < 3.000 € | Bewertungsdichte ("1257+ Bewertungen, 5,0 auf Google") |
| lokal, high-ticket | Meisterbetrieb + Ortsname + Stückzahl ("30000+ verbaute Module") |
| B2B-Coaching | Fallzahl mit Namen + Vorher/Nachher ("980.000 € → 14.000.000 €") |
| übersättigter Markt | Werbekonto-Screenshot-Zahl ("70.925 € bei 9.433 € Adspend") |
| Enterprise D2C | Auszeichnungen gestapelt (TÜV, Testsieger) + Kundenzahl |

**Regel:** Proof steht nie weiter als einen Viewport vom CTA entfernt.

---

## 6. CTA-Regeln

1. **Ein einziger CTA-Text** durch die ganze Seite. Nicht variieren.
2. **Wert-CTA vor Kontakt-CTA.** "Ersparnis berechnen" schlägt "Nachricht senden".
3. **Risiko-Umkehr direkt am Button** als Microcopy: "kostenlos, 15 Minuten,
   unverbindlich".
4. **Nie "Hier klicken".** Der CTA beschreibt, was der Leser bekommt.
5. **First-Person-CTA** nur im Velvet-Rope-Stil ("Ich bin bereit zu skalieren").

---

## 7. Kanal-Dials

Dieselbe Idee klingt je Kanal anders. Die Voice bleibt konstant, während der
Ton sich dem Kanal anpasst.

| Kanal | Satzlänge | Fragmente | Zahl-Dichte | CTA |
|---|---|---|---|---|
| Meta-Ad Primary Text | 8–15 W | 1 pro Absatz | hoch, im 1. Satz | 1, am Ende |
| Video-Skript | 6–12 W (Sprechsprache) | erlaubt | hoch, in Sek. 1–3 | 1, letzte 3 Sek. |
| Landingpage Hero | 5–10 W | 1 | 1 Zahl | 1, wiederholt |
| Landingpage Body | 15–25 W | 0 | pro Sektion 1 | derselbe |
| E-Mail | 10–18 W | 0 | 1–2 gesamt | 1 Link |
| SEO-Text | 15–25 W | 0 | belegt | 1 am Ende |

---

## 8. Selbstcheck vor Abgabe

Fünf Fragen. Ein Nein = zurück in den Text.

1. Springen die Satzlängen? (kein Dreier-Block gleicher Länge)
2. Steht die erste Zahl im ersten oder zweiten Satz?
3. Ist die Anrede durchgehend gleich?
4. Steht `forbidden.md` auf null Treffer?
5. Könnte dieser Text für jeden Wettbewerber stehen? Falls ja: eine echte
   Zahl, einen Eigennamen oder eine echte Konsequenz einsetzen.
