# Hook-Taxonomie (Scroll-Stopper)

Ein Hook stoppt den Daumen in < 1 Sekunde. Baue je Angle mehrere Typen, teste breit.

## Kern-Typen (aus voice-analysis.md / copywriting geteilt)

- **contrarian claim** — gegen die verbreitete Meinung ("Mehr Content bringt dir keine Kunden.").
- **direct question** — spricht die Situation des ICP an, ohne persönliche Merkmale zu
  unterstellen (Meta-Policy!). ("Warum floppt jede zweite Kampagne im ersten Monat?").
- **confession bait** — Insider-Geständnis ("Ich habe 4 Jahre falsch geschaltet — das hier
  hätte es gespart.").

## Weitere bewährte Muster

- **Specific number** ("In 11 Tagen von 4,20 € auf 1,80 € CPL.") — Zahl muss belegt sein (PROOF.md).
- **Callout ICP** ("Für Zahnärzte mit halbleerem Terminkalender:").
- **Pattern interrupt** — visuell/sprachlich unerwarteter Einstieg.
- **Curiosity gap** — Lücke, die zum Weiterschauen zwingt (nicht Clickbait — Versprechen einlösen).
- **Geographical affinity** (lokale Kunden) — Hook + erstes Frame an lokal erkennbaren Landmarks
  aufhängen (Opening vor dem echten Firmenschild an einer Hauptstraße). Nähe schafft schneller
  Rapport als abstraktes Vertrauen. Produktionsdetails in `loop3-ablauf.md`.

## Committed-Sprache — der Filter im Hook (wichtigste 2026-Lektion)

**TLDR:** Viele Klicks sind nicht das Ziel. Der Hook soll die Falschen wegfiltern, nicht möglichst
viele anlocken. Ein Hook muss drei Dinge gleichzeitig tun.

Jeder Hook muss in ~1,8 s: (1) **Neugier** wecken, (2) **committed language** tragen, die
Angebot/Mechanismus grob erkennbar macht (Erwartungsmanagement für die LP), (3) unqualifizierte
Klicks **filtern**. Nie mit Selbstvorstellung starten — sofort das Problem des Prospects spiegeln.

- Fehlt (2), gibt es hohe CTR, aber schlechte LP-Conversion, weil die Leute nur raten.
- **Curious → Committed verschieben**, wenn CTR hoch, aber Conversion/Qualität niedrig ist:
  präzisierende Zusätze, Zielgruppen-Situation, ggf. Fachjargon. Das senkt Klicks, hebt aber die
  Downstream-Conversion.
- Beispiel: „Are you a business owner relying on word of mouth?" (nur Neugier, ~2,5 % CTR, falsche
  Erwartung) → „After these two days creating content, business owners don't need to rely on word
  of mouth for leads" (Zeitrahmen + Thema + Zielgruppe).
- **Diagnose:** Link-CTR > ~2 % = zu wenig Filterung (siehe SKILL.md Gotchas / perf-analyse).

## Regeln

- Hook aus echter Kundensprache (voc.md), nicht aus Marketing-Floskeln.
- Jede Zahl im Hook: belegt (PROOF.md) — sonst raus (claims-qa blockt).
- Keine unterstellten persönlichen Merkmale (Meta personal attributes).
- Stil-Gate über copywriting (Anti-Floskel, Orwell-DE) vor G2.

## Ein Hook ist drei Komponenten, keine Zeile

> Kondensiert aus coreyhaines31/marketingskills, `skills/ad-creative/references/hook-system.md`
> (MIT-Lizenz).

Bei Video laufen drei Komponenten gleichzeitig — **Visual** (was in Sek. 0–3 zu sehen ist),
**gesprochene Zeile** (erste Worte VO/Dialog), **Caption** (Overlay-Text für Sound-off-Zuschauer).
**No-Duplication-Regel:** die drei dürfen sich nie wiederholen — sagt die VO "Ich zahle keine
200 €/Monat mehr fürs Fitnessstudio" und die Caption denselben Satz über einem statischen
Talking-Head, sind zwei von drei Slots verschwendet. Visual zeigt die Kündigungsmail, VO sagt
die Zeile, Caption nennt die Alternative — Arbeit aufteilen. Bei Statics fällt das auf zwei
Komponenten zusammen (Visual + Headline) — dieselbe Regel: Headline captiont nicht das Bild.

**Generierungs-Pipeline (von oben nach unten arbeiten):** Segment (schmales ICP-Slice mit
gemeinsamer Situation, aus voc.md) → Motivation (ein Pain/Wunsch/Einwand in *deren* Worten,
wörtlich aus voc.md) → Format (Straßeninterview, POV-Selfie, Screenrecording, Founder-to-Camera
…) → erst dann die drei Hook-Komponenten schreiben. Als Matrix ausgeben (Segment × Motivation ×
Format), nicht als 10 Umformulierungen einer Zelle — Matrix-Diversität ist Zielgruppen-Diversität.

**Diagnose-Trichter (bei Underperformance zuerst hier nachschauen, bevor die ganze Ad verworfen wird):**

| Stufe | Metrik | Schwach → Problem liegt bei | Fix |
|---|---|---|---|
| Stop | Thumbstop/3-Sek-View-Rate | Visual (+Caption) | Neuer visueller Einstieg, Rest unverändert |
| Stay | Hold-Rate (3s→15s) | Der On-Ramp (was nach dem Hook kommt) | Sekunden 3–15 überarbeiten, nicht den Hook |
| Klick | CTR | Angebots-/Wunsch-Klarheit Mitte der Ad | Versprechen/CTA/Proof schärfen |
| Convert | CVR nach Klick | Kongruenz LP↔Ad | Landingpage oder Claim fixen (web/CRO) |

**Ein hoher Thumbstop ist keine gute Ad** — ein Clickbait-Visual zieht die Falschen an: hoher
Thumbstop + eingebrochene Hold-Rate/CVR. Immer den ganzen Trichter lesen, nie beim Stop stoppen.
**On-Ramp-Regel:** jeder Hook-Test ist auch ein On-Ramp-Test — wird ein neuer Hook auf einen
bestehenden Body gesetzt, bricht meist die Prämissen-Brücke; On-Ramp beim Hook-Wechsel mitschreiben.

## Ergänzungen aus IG-Bookmarks-Konsolidierung (04.08.2026, Beleg: wiki/craft/hooks/erweitert-hooks.md)

- **Vierte Hook-Ebene: der Primary Text.** Die drei Video-Komponenten oben (Visual, gesprochene
  Zeile, Caption) bleiben der Rahmen — der Primary Text über der Ad ist eine zusätzliche,
  eigene Hook-Fläche außerhalb des Videos und wird beim Hook-Schreiben mitgeplant.
- **Die zweite Zeile ist so wichtig wie der Hook** — der On-Ramp beginnt schon im Text, nicht
  erst in Sekunde 3.
- **Desire-Hook statt Info-Hook.** Info-Hooks ("3 Dinge, die…") ziehen Viewer, die nie kaufen;
  der Hook muss am Wunsch/Ergebnis ansetzen, nicht an der Neugier auf Information.
- **Trap-Hook-Formel:** eine Aussage, die das Zielsegment nicht ignorieren kann, weil sie es
  direkt betrifft oder seiner Annahme widerspricht.
- **Hook-Rate und Watchtime hängen zusammen** — ein Hook-Test ohne Blick auf die Hold-Rate
  misst nur die halbe Wirkung (passt zum Diagnose-Trichter oben).
