---
name: copywriting
version: 0.4.0
description: >
  Feuert für JEDEN deutschen Verkaufs-/Marketing-Text (Ads, Web, SEO, E-Mail)
  UND für das Vermenschlichen/Entfloskeln von KI-generiertem Text: klarer,
  aktiver, floskelfreier Text in der Brand-Voice des Kunden, frei von
  AI-Slop-Tells. Trigger: "Text schreiben", "Copy", "umschreiben", "Stil
  prüfen", "entfloskeln", "klingt nach KI", "humanize", "AI-Slop raus".
class: F
scope: agency
sensitivity: internal
source: ergänzt um voice-analysis.md — adaptiert aus knowledge-work-plugins/
  partner-built/brand-voice (Tribe AI, MIT-Lizenz), Stand 2026-07-20
loads: [references/orwell-de.md, references/floskel-verbote.md, references/cta-framework.md, references/vsl-framework.md, references/ai-slop-patterns-en.md, references/mental-models-en.md, references/copy-editing-sweeps.md, references/voice-analysis.md]
requires_skills: [eval@^0]
completion_criteria:
  - "G1 grün: Orwell-Regeln 2-5 + Passiv-/Nominalstil-Detektor + Floskelliste (inkl. quantifizierter Interpunktions-Schwellen) = 0 Treffer"
  - "Selbstkritik-Zwischenschritt durchlaufen: 'was ist an diesem Entwurf noch offensichtlich KI-generiert?' beantwortet, vor G2"
  - "G2 Judge: Regeln 1+6 (Override) + Brand-Voice-Treue >= 0.7"
---

# copywriting — deutscher Klartext in Brand-Voice

**Lies zuerst (brand-voice-Slot):**
`/root/raphael-brain/business/` (voice-Dateien, falls zentral) **und** zur Laufzeit
`/root/clients/client-<name>/wiki/VOICE.md` (kundenspezifische Voice) —
der Kunde gewinnt bei Widerspruch. Außerdem `/root/raphael-brain/wiki/swipes/`.

## Zweck (1 Satz)

Text produzieren/prüfen, der klar, aktiv und floskelfrei ist und wie der jeweilige Kunde
klingt — als Stil-Gate für ads, web, seo.

## Ablauf

1. **Voice laden** — VOICE.md des Kunden (Duzen/Siezen, Jargon-Level, Erlaubt-/Verboten-Sätze).
   Fehlt eine belastbare Voice in VOICE.md, vor dem Schreiben kurz klären (oder aus einer
   echten Textprobe des Kunden ableiten statt aus einer generischen "natürlichen" Stimme):
   Duzen/Siezen, welcher Humor (trocken/sarkastisch/keiner), was würde dieser Kunde **nie**
   sagen, für welche Plattform (Landingpage ≠ Ad ≠ Newsletter ≠ WhatsApp). Muss VOICE.md neu
   gebaut werden, Vorlage + Modell in `references/voice-analysis.md` nutzen: **Voice ist
   konstant, Ton flext** — "Wir sind/Wir sind nicht"-Tabelle mit Beleg, Terminologie-Tabelle,
   Tonalitäts-Matrix je Kanal, Confidence-Stufe pro Sektion.
2. **Schreiben/Umschreiben** — nach Orwell-DE (`references/orwell-de.md`). Perfekte Grammatik
   oder gehobenes Vokabular allein ist **kein** KI-Beweis (siehe Detection Guidance in
   `references/ai-slop-patterns-en.md`) — nicht jede saubere Formulierung kaputt-editieren.
3. **G1 (deterministisch, immer zuerst):**
   - Orwell-Regeln **2–5** als Checks (kurzes Wort, Aktiv, kürzen, kein Fachjargon-Ballast).
   - **Passiv-/Nominalstil-Detektor** (`references/orwell-de.md` → Heuristik).
   - **LLM-Floskel-Verbotsliste** dt.+engl. inkl. quantifizierter Interpunktions-Schwellen und
     Struktur-Regeln (`references/floskel-verbote.md`) = 0 Treffer.
   - Bei englischer Copy zusätzlich gegen den 33-Pattern-Katalog prüfen
     (`references/ai-slop-patterns-en.md`) — auf **Cluster** von Tells achten, nicht auf
     Einzelfunde.
4. **Selbstkritik-Zwischenschritt (billig, vor dem teuren G2):** Entwurf laut durchlesen und
   knapp beantworten: "Was macht diesen Text noch offensichtlich KI-generiert?" Die Antwort
   direkt einarbeiten, bevor G2 läuft — hebt die Qualität vor dem Judge-Call günstig an.
5. **G2 (Judge):** Orwell-Regeln **1** (abgedroschene Metaphern) + **6** (Override-Klausel:
   Regel brechen, bevor der Text hölzern/"barbarous" wird) + **Brand-Voice-Treue**. pass/fail
   mit eingefügtem Beweis, nie "erkläre dein Denken" (Regel 19 / Fable-Gotcha).
6. **Hook & CTA** — nach `references/cta-framework.md` (Hook = drei Funktionen + 1,8-s-Regel,
   Curious-vs-Committed-Diagnose, Financial Qualification über die Situation). Für
   Persuasion-Framing (Anchoring, Verlust-Aversion, Decoy-Effekt etc.) siehe
   `references/mental-models-en.md` — ersetzt keine echte Voice-of-Customer-Recherche.
7. **Verkaufs-/VSL-Struktur** — bei Long-Form (VSL, Sales-Page, Nurture) nach
   `references/vsl-framework.md`: Reihenfolge nach Überzeugungskraft, Identitäts-Commitment
   auf Danke-Seiten, Nurture aus Empfängerperspektive.
8. **Selbstcheck vor Abgabe (letzter Schritt, still anwenden):** Banned Words? Drei
   gleichlange Sätze in Folge? Parataxe (drei+ kurze Sätze hintereinander)? Hedging statt
   klarer Position? Mehr als 1 Em-Dash/500 Wörter? Erfundene Zahlen/Zitate? "Könnte das
   jede KI für jeden Kunden geschrieben haben?" — falls ja, eine konkrete Zahl/Nomen/Konsequenz
   ergänzen. Bei langer Copy (Sales-Page, Landingpage) zusätzlich optional die
   Seven-Sweeps (`references/copy-editing-sweeps.md`) als Qualitäts-Gate vor Auslieferung.

## Gotchas

- **Orwell-Split:** Regeln 2–5 sind G1 (deterministisch), Regeln 1+6 sind G2 (Judge). Regel 6
  ist die **Override-Klausel** — ein starrer Regel-Roboter produziert steifen Text; der Judge
  darf Regelbruch belohnen, wenn er den Text menschlicher macht.
- **Voice-Slot: Kunde vor Zentrale.** Ein globaler Skill kopiert nie Kundeninhalt — VOICE.md
  wird zur Laufzeit als Verweis geladen (scope/sensitivity!).
- **Judge-Prompt nie nach dem Denkweg fragen ("erklaere dein Denken"-Muster)** → Fable `reasoning_extraction`-Refusal, stiller
  Opus-Fallback (Regel 19). Immer "pass/fail + eingefügter Beweis".
- Deutsch ist nicht Englisch: Nominalstil ("die Durchführung der Optimierung") und
  Funktionsverbgefüge ("zur Anwendung bringen") sind die deutschen Haupt-Floskeln — der
  Detektor zielt darauf, nicht auf englische Passiv-Marker.
- Anglizismen sind nur dann Fehler, wenn ein Alltagswort existiert (Orwell Regel 5) — die
  Voice mancher Kunden erlaubt sie bewusst.
- **Hohe CTR ist ein Warnsignal, kein Ziel.** CTR > ~2 % + schwache Conversion = Copy zu
  „curious" → Richtung „committed" verschieben (filtert vor). Nie auf reine Klickmenge
  optimieren (`references/cta-framework.md`).
- **Show-Rate ist die echte KPI für Danke-/Nurture-Texte — kein Judge-Score.** Der Judge
  bewertet Klartext/Voice, nicht ob ein Text „verkauft"; ob Identitäts-Commitment wirkt,
  zeigt nur das echte Erscheinen der Leads.
- **Nurture nur aus Empfängerperspektive** („das hilft DIR"). Die Hammer-Sequenz (hohe
  Frequenz) ist Grauzone und **nur für bereits gebuchte** Leads — bei kalten Leads Spam.
- **LLM nie „schreib eine Anzeige für X" fragen** (Mittelwert-Regression) — erst 2–3 eigene
  funktionierende Beispiele + Begründung als Referenz geben (`references/vsl-framework.md`).
- **Einzelfund ≠ Beweis.** Ein Em-Dash, ein "however", perfekte Grammatik oder gehobenes
  Vokabular allein sagen nichts über KI-Herkunft aus — erst ein **Cluster** mehrerer Tells
  gleichzeitig ist ein Fund (Detection Guidance in `references/ai-slop-patterns-en.md`). Ein
  zu aggressiver Detektor zerstört sonst legitime, nur zufällig KI-ähnliche Texte.
- **AI-Copywriting-Voice ist kein Stilmittel, sondern ein Tell:** "Nicht nur X — sondern Y",
  "Sag Goodbye zu X", Drei-Wort-Triaden als Slogan-Reflex, "X-Theater"-Framing wirken beim
  Schreiben originell, lesen sich aber bei jedem Kunden gleich generisch
  (`references/floskel-verbote.md` → AI-Copywriting-Voice).
- **Voice vs. Ton nicht verwechseln.** Will der Kunde "lockerer", ist das ein Ton-Dial
  (Formalität runter, Energie hoch) — nicht ein neuer Charakter. Alle Voice-Attribute auf
  Maximum zu ziehen wirkt aufgesetzt; 2-3 führende pro Text reichen
  (`references/voice-analysis.md`).
