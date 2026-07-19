---
name: r-copywriting
version: 0.2.0
description: >
  Feuert für JEDEN deutschen Verkaufs-/Marketing-Text (Ads, Web, SEO, E-Mail):
  klarer, aktiver, floskelfreier Text in der Brand-Voice des Kunden. Trigger:
  "Text schreiben", "Copy", "umschreiben", "Stil prüfen", "entfloskeln".
class: F
scope: agency
sensitivity: internal
loads: [references/orwell-de.md, references/floskel-verbote.md, references/cta-framework.md, references/vsl-framework.md]
requires_skills: [r-eval@^0]
completion_criteria:
  - "G1 grün: Orwell-Regeln 2-5 + Passiv-/Nominalstil-Detektor + Floskelliste = 0 Treffer"
  - "G2 Judge: Regeln 1+6 (Override) + Brand-Voice-Treue >= 0.7"
---

# r-copywriting — deutscher Klartext in Brand-Voice

**Lies zuerst (brand-voice-Slot):**
`/root/raphael-brain/business/` (voice-Dateien, falls zentral) **und** zur Laufzeit
`/root/clients/client-<name>/wiki/VOICE.md` (kundenspezifische Voice) —
der Kunde gewinnt bei Widerspruch. Außerdem `/root/raphael-brain/wiki/swipes/`.

## Zweck (1 Satz)

Text produzieren/prüfen, der klar, aktiv und floskelfrei ist und wie der jeweilige Kunde
klingt — als Stil-Gate für r-ads, r-web, r-seo.

## Ablauf

1. **Voice laden** — VOICE.md des Kunden (Duzen/Siezen, Jargon-Level, Erlaubt-/Verboten-Sätze).
2. **Schreiben/Umschreiben** — nach Orwell-DE (`references/orwell-de.md`).
3. **G1 (deterministisch, immer zuerst):**
   - Orwell-Regeln **2–5** als Checks (kurzes Wort, Aktiv, kürzen, kein Fachjargon-Ballast).
   - **Passiv-/Nominalstil-Detektor** (`references/orwell-de.md` → Heuristik).
   - **LLM-Floskel-Verbotsliste** dt.+engl. (`references/floskel-verbote.md`) = 0 Treffer.
4. **G2 (Judge):** Orwell-Regeln **1** (abgedroschene Metaphern) + **6** (Override-Klausel:
   Regel brechen, bevor der Text hölzern/"barbarous" wird) + **Brand-Voice-Treue**. pass/fail
   mit eingefügtem Beweis, nie "erkläre dein Denken" (Regel 19 / Fable-Gotcha).
5. **Hook & CTA** — nach `references/cta-framework.md` (Hook = drei Funktionen + 1,8-s-Regel,
   Curious-vs-Committed-Diagnose, Financial Qualification über die Situation).
6. **Verkaufs-/VSL-Struktur** — bei Long-Form (VSL, Sales-Page, Nurture) nach
   `references/vsl-framework.md`: Reihenfolge nach Überzeugungskraft, Identitäts-Commitment
   auf Danke-Seiten, Nurture aus Empfängerperspektive.

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
