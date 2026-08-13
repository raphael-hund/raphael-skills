---
name: ads-video
version: 0.6.0
description: >
  Feuert wenn aus Angle/Hook (aus dem ads-Router) ein Video-Ad-Skript für Meta/TikTok
  entstehen soll: Beat-Struktur, Sprechtext, Einblendungs-/Illustrationsplan.
  Trigger: "Video-Skript schreiben", "Ad-Skript", "Drehbuch für Ads", "Skripte für
  Testwelle", "Hook-Varianten fürs Video". Funktioniert für jeden Kunden: Craft kommt
  Pflicht aus den Markt-Referenzen (Hooks, Architekturen, Sprache, Strategien/Taktiken,
  Referenz-Volltexte), Performance-Daten optional aus dem Kundenrepo. Schreibt nie aus
  dem Gedächtnis, endet erst nach no-ai-slop-Pass + Messlatte.
class: F
scope: agency
sensitivity: internal
loads:
  - references/voice-dna-ads.md
  - references/playbook-geile-ads.md
  - references/korpus/referenz-ads.md
  - references/skript-architekturen.md
  - references/hook-formeln.md
  - references/strategien-taktiken.md
  - references/sprech-sprache.md
  - references/sprech-text-regeln.md
  - references/skript-analyse-methodik.md
  - references/beat-struktur-und-aufbau.md
  - references/video-visuals.md
loads_external: ["/root/.claude/forbidden.md"]
requires_skills: [copywriting@^0, no-ai-slop@^0]
completion_criteria:
  - "copywriting/scripts/forbidden-check.py auf dem Skript gelaufen, Exit 0 (harte Sperre, vor der Messlatte); Ausgabe im Output zitiert"
  - "jede genutzte Spoken-Ausnahme (R1-R3, sprech-sprache.md Vorrang-Tabelle) im Output benannt: Regel + Zeile + Grund; nie im CTA, max 1x pro Skript, nie fuer A2/A3/B4/B5"
  - "voice-dna-ads V12-Selbstcheck (6 Fragen) = 6x ja, im Output dokumentiert"
  - "Hook-Länge ≤ 8 Wörter (oder ≤ 12 mit exakter belegter Zahl) — V1"
  - "Winner-Basis-Feld gesetzt (Ad-Name/ID + Hookrate/Spend/CTR oder ehrlich 'kein Performance-Datensatz')"
  - "F-ID + A-ID benannt; je mindestens 1 wörtliche Belegzeile aus Markt-Referenzen/Kunden-Korpus derselben Bauform gelesen"
  - "mindestens 1 S-ID (Strategie) + 1 T-ID (Taktik) aus strategien-taktiken.md benannt und im Skript sichtbar"
  - "jedes Skript hat Beat-Tabelle (Funktion, Zeile, Wortzahl, Device) + Gesamt-/Hook-Wortzahl + CTA-Typ"
  - "Hook: erste 12 Wörter hart (Callout|Proof|Garantie|Outcome|Pain); Zahl oder Name in Satz 1"
  - "Mechanismus-Eigenname gesetzt; Proof früh (Case) + spät/Aggregat; mind. 1 filmbarer Proof-Beat"
  - "CTA = Aktion + Ort + was danach + Zeitrahmen/Reibung"
  - "≥3 Hook-Varianten, ≥2 verschiedene F-IDs, je On-Ramp + Caption-Job + Visual-Job (keine Paraphrasen-Triplette)"
  - "jeder Claim/jede Zahl grounded (Kunden-Dossier oder Kunden-Korpus); sonst BLOCKED mit Materialfrage"
  - "no-ai-slop Edit-Pass auf Sprechtext dokumentiert (Was geändert oder 'keine Muster'); Spoken-Ausnahmen R2/R3 bewahrt"
  - "Messlatte aus skript-architekturen.md (10 Assertions) grün; Onscreen≠VO; Laut-lesen-Pass"
  - "Einblendungs-/Visuals-Plan liegt vor (ein Beat je Einblendungszeile)"
---

# ads-video — Video-Ad-Skripte aus Markt-Craft + Kunden-Layer

**Aufruf:** `ads-video(kunde: slug [pflicht], anzahl: int = 3)`

**Version 0.3 (2026-08-11):** generalisiert, Craft-Kern gilt für jeden Kunden,
Performance-Daten und Kunden-Playbook liegen im Kundenrepo, Strategien/Taktiken als
Pflicht-Load ergänzt.

## Zwei Schichten

1. **Craft-Kern (immer gleich, kundenunabhängig).** Sechs Referenzen, aus echten
   Markt-Ads destilliert. Sie liefern Aufbau, Hooks, Sprache, Strategien und Taktiken.
2. **Kunden-Layer (pro `kunde`).** ICP, Offer, Voice: plus optional ein eigener
   Performance-Korpus und ein Kunden-Playbook. Fehlt der Performance-Teil, schreibt der
   Skill trotzdem, nur eben rein aus dem Markt-Pfad.

## Lies zuerst (Lese-Pfade)

### A. Craft-Kern (Pflicht-Loads — vor jedem Entwurf)

| Quelle | Pfad | Job |
|---|---|---|
| **Voice-DNA (gemessen)** | `references/voice-dna-ads.md` | **V1–V12: Hook-Länge, Anrede, Zahl-Position, Sprechrhythmus, Struktur-Default, CTA-Form — aus 711 Records ausgezählt** |
| **Verbots-Katalog** | `/root/.claude/forbidden.md` | **Slop-Muster, die nie ins Skript kommen. Hartes Gate vor der Messlatte.** |
| Playbook | `references/playbook-geile-ads.md` | Nutzungs-Loop, Winner-/Verlierer-Muster, Skelett, Ship-Checkliste |
| Architekturen + Messlatte | `references/skript-architekturen.md` | Aufbau A1–A7 + 10 Assertions vor Ship |
| Hook-Formeln | `references/hook-formeln.md` | F1–F13 wählen, ≥2 F-IDs in den Varianten |
| Sprache | `references/sprech-sprache.md` + `references/sprech-text-regeln.md` | R1–R8, Kraftwort-Regeln, Verbote im Sprechtext |
| Strategien + Taktiken | `references/strategien-taktiken.md` | S-IDs (Strategie) + T-IDs (Taktik) — je ≥1 benennen |
| Markt-Volltexte | `references/korpus/referenz-ads.md` | 2 Volltexte derselben Hook-Familie wörtlich lesen |

Ergänzend: `references/skript-analyse-methodik.md` (Phase 1+2 zum Zerlegen von
Referenzen), `references/beat-struktur-und-aufbau.md` (Fallback), `references/video-visuals.md`
(Einblendungsplan).

**Korpus-Klassen:** nur Records mit Volltext für Phase-1-Zitate.
`[UNVOLLSTÄNDIG — nur in Notion oder leer]` → ausschließen, nicht erfinden.
(Wortlaut exakt wie in `scripts/export-airtable-korpus.sh`.)
Drafts/Konzepte im Kundenordner = Stil/Dialekt, **nicht** Beat-Skelett-Quelle.
Skelett-Quelle = `winner` / `laufend` (Performance oder klarer Flight).

### B. Kunden-Layer (`kunde: slug`)

| Was | Pfad | Pflicht? |
|---|---|---|
| Wissen (ICP/Offer/Voice) | `/root/clients/client-<slug>/wiki/` | **ja** |
| Stil-/Material-Referenz | `/root/clients/client-<slug>/ads/` | ja, wenn vorhanden |
| Eigener Performance-Korpus | `/root/clients/client-<slug>/ads/korpus/eigene-ads.md` | optional |
| Kunden-Playbook (Instanz-Belege) | `/root/clients/client-<slug>/ads/playbook-<slug>.md` | optional |
| Marke/Assets | `/root/clients/client-<slug>/brand/` | für Visuals |

Beispielzeile: `kunde: make` → Wissen liegt abweichend in
`/root/raphael-brain/wiki/company/` (`icp/`, `offer/`, `voice/`), Material in
`/root/clients/client-make/ads/` (Winner/Transkripte zuerst, nicht Storytime-Illustrationen
als Skelett), Korpus in `/root/clients/client-make/ads/korpus/eigene-ads.md`, Playbook in
`/root/clients/client-make/ads/playbook-make.md`.

**Kein eigener Korpus vorhanden** → reiner Markt-Referenz-Pfad. Winner-Basis-Feld sagt
ehrlich `kein Performance-Datensatz`. Nie die Zahlen eines anderen Kunden borgen.

**Fehlt der Wissens-Pfad** → stoppen und Raphael fragen. Kein generisches Weiterschreiben.

**Korpus-Refresh (nur wo Airtable existiert):**
`KUNDE=<slug> bash /root/raphael-skills/skills/eigene/ads-video/scripts/export-airtable-korpus.sh`
Auth: `/root/tools/secrets/airtable.env`. Base über `AIRTABLE_BASE` überschreibbar.
Kein Live-API-Zwang im Schreibpfad. Der Datei-Korpus reicht.

## Ablauf

0. **Craft-Kern + Kunden-Korpus laden.** Playbook §0–§2 lesen. Existiert
   `client-<slug>/ads/korpus/eigene-ads.md`: Top-3 Video-Ads nach Spend×Hookrate (14T)
   bestimmen (Hookrate 0 + alter High-Spend = Metrik-Lücke, nicht automatisch Flop;
   ROAS 0 bei Lead-Gen ignorieren) und **Winner-Basis** notieren; Kunden-Playbook dazu
   lesen. Existiert er nicht: Winner-Basis = `kein Performance-Datensatz`.
   Immer: zwei Referenz-Volltexte derselben Bauform aus `korpus/referenz-ads.md` wörtlich
   lesen. Kunden-Korpus >30 Tage → Refresh-Skript anbieten/ausführen.

1. **Kunden-Wissen laden.** ICP, Offer, Voice aus Pfad B. Ohne belastbares
   ICP/Offer/Voice kein Entwurf.

2. **Angle/Hook vom Router übernehmen.** Angle kommt aus `ads` (angles/hooks,
   `eigene/ads/references/hook-taxonomie.md`). `ads-video` erfindet keine Strategie.
   Fehlt freigegebenes Angle → nachfragen, nicht raten.

3. **Proof-Inventar (Positiv-Zwang).** Aus Kunden-Dossier + Kunden-Korpus alle
   freigegebenen Zahlen, Namen, filmbaren Artefakte listen. Mindestens **1 früher Case**
   und **1 filmbarer Proof** müssen ins Skript, sonst **BLOCKED** mit konkreter
   Materialfrage (nicht entkernt weiterschreiben). Stärksten erlaubten Claim wählen.

4. **Referenz-Analyse (Methodik).** Kunden- und Markt-Volltexte nach
   `skript-analyse-methodik.md` Phase 1+2 zerlegen. Nur `winner`/`laufend` + Volltext
   fürs Skelett. Ergänzend: Playbook §5 Skelett; `hook-formeln.md` +
   `skript-architekturen.md` als Markt-Rahmen. `beat-struktur-und-aufbau.md` nur Fallback
   wenn <3 brauchbare Referenzen. Die Zeile „Wenn du [ICP] bist und [Outcome] willst,
   brauchst du [Offer]" ist ein **Anti-Beispiel**.

5. **F-ID + A-ID + S-ID/T-ID wählen, dann schreiben.** Vor dem ersten Satz: eine
   Hook-Formel (F1–F13), eine Architektur (A1–A7) und mindestens eine Strategie (S-ID)
   plus eine Taktik (T-ID) aus `strategien-taktiken.md` benennen; je 1 Belegzeile aus
   denselben Refs. Body vom Winner clonen, wenn derselbe Funnel läuft. Nur
   Angle/Hook-Variante neu. Text/Ton: `copywriting` + `sprech-text-regeln.md` +
   `sprech-sprache.md`.
   **Voice-DNA bindet den Satzbau** (`references/voice-dna-ads.md` Teil 2):
   Hook ≤ 8 Wörter (V1), Fragment schlägt Frage (V2), exakte Zahl in Sek. 1–3 (V3),
   Duzen als Default (V4), Ich-Form bei Personenmarken (V5), Default-Struktur
   Callout → Problem → Mechanism → Proof → Offer → CTA (V8), CTA sagt den Nutzen
   plus Risiko-Umkehr (V9), Satzlängen springen 6–15 Wörter (V10).
   **Nicht aus dem Korpus kopiert werden** die dort belegten Slop-Muster (V11):
   Isokolon-Metaphern, Versalien-Schreie, ungedeckte Superlative,
   Ergebnis-Disclaimer als Deckmantel.
   Je finalem Skript **≥3 Hook-Varianten mit ≥2 F-IDs**, je Variante On-Ramp (Sek. 3–15),
   Caption-Job, Visual-Job. Paraphrasen derselben Formel zählen nicht.

6. **Beat-Tabelle + Grounding-Checkliste + Winner-Basis-Feld.**
   Pro Skript: Beat-Tabelle (Funktion, Zeile, Wortzahl, Device), Gesamt-/Hook-Wortzahl,
   CTA-Typ, gewählte S-ID/T-ID, **Winner-Basis:** `<Ad-Name/ID> | Hookrate/Spend/CTR` oder
   `kein Performance-Datensatz`. Jede Zahl/Case mit Quelle.

7. **no-ai-slop Pflicht-Gate.** Sprechtext durch `no-ai-slop` **Edit-Modus**.
   Muster-Katalog anwenden; jeden Eingriff benennen; Stimme bewahren.
   **Spoken-Ausnahme:** Füllwörter/Kraftwörter im Hook (R2/R3 `sprech-sprache.md`)
   nicht glätten. Ohne dokumentierten Pass gilt das Skript als unfertig.

7b. **Skript-Gate + V12-Selbstcheck (hart, vor der Messlatte).**

   ```
   python3 /root/raphael-skills/skills/eigene/copywriting/scripts/forbidden-check.py <skript.md>
   ```

   Exit 1 = nicht shippen. Ausgabe im Output zitieren. Häufigste Treffer im
   Ad-Text: Staccato-Paare (A1), "nicht X, sondern Y" (A2), Metapher-Paare (A3),
   Drei-Wort-Triaden (A5), Wert-Adjektive ohne Zahl (B4).

   **Spoken-Ausnahme (VO-Zeilen):** Meldet das Skript A1 oder A6 auf einer
   gesprochenen Zeile, entscheidet die Vorrang-Tabelle in
   `references/sprech-sprache.md` → "Vorrang bei Konflikt". R1–R3 gewinnen dort
   im Hook und beim Pain, **nie im CTA**, **nie mehr als einmal pro Skript**,
   **nie für A2/A3/B4/B5**. Jede genutzte Ausnahme wird im Output benannt:
   welche Regel, welche Zeile, warum. Ohne Nennung gilt das Gate.

   Onscreen-Text, Primary Text und Beschreibung haben **keine** Spoken-Ausnahme.
   Dort ist jeder Treffer ein Fail.

   Danach die 6 Fragen aus `references/voice-dna-ads.md` V12 beantworten und
   das Ergebnis im Output dokumentieren.

   **Nachtragspflicht:** Jedes neu erwischte Slop-Muster wandert sofort nach
   `forbidden.md` Abschnitt F: mit kaputtem Beispiel und Fix.

8. **Messlatte grün.** Alle 10 Assertions in `skript-architekturen.md` (Form, erste
   12 Wörter, Zahl im Hook, Mechanismus-Name, Proof×2+filmbar, Disclaimer, voller CTA,
   Neg-Quali wenn High-Ticket, Laut-lesen, Onscreen≠VO). Eine rot → fixen, nicht shippen.

9. **Visuals-Plan.** Nach `video-visuals.md`: Sprech-Zeile ↔ Einblendung,
   Illustrations-Rezept falls nötig, Markenfarben nur aus `client-*/brand/` (nie raten).

## Grounding-Pflicht (hart)

Jede Zahl, jeder Kundenname, jedes Ergebnis braucht eine Quelle aus dem Kunden-Dossier
(Proof/VOC) oder dem Kunden-Korpus / einem freigegebenen Case. Markt-Referenzen belegen
**Bauform**, nie die Zahlen des Kunden. Fehlt Rohmaterial: stoppen und fragen, identisch
zur Grounding-Pflicht der Statics-Briefs im `ads`-Router.

## Claims-QA bleibt beim Router

`ads-video` schreibt, prüft aber nicht final gegen Meta-Policy/HWG/UWG. Das ist
`claims-qa` (Sol, frische Session, `eigene/ads/references/claims-verbote.md`).
Beim Schreiben grob gegensteuern (`sprech-text-regeln.md`).

## Hierarchie bei Regelkonflikt

0. `/root/.claude/forbidden.md`: schlägt alles. Ein verbotenes Muster bleibt
   verboten, auch wenn ein Winner-Skript es benutzt.
   **Einzige Ausnahme:** die Spoken-Vorrang-Tabelle in `sprech-sprache.md`
   (R1–R3 auf gesprochenen Zeilen, mit den vier dort genannten Grenzen).
   Sie deckt Rhythmus und Register, nie A2/A3/B4/B5.
1. Kunden-Winner-Korpus + Kunden-Playbook (was im Konto messbar hält/skaliert):
   falls vorhanden
2. Zentrales Playbook + `hook-formeln.md` + `skript-architekturen.md` +
   `strategien-taktiken.md` (Markt-Craft + Messlatte)
2b. `voice-dna-ads.md` V1–V12 (gemessener Satzbau): bindet den Sprechtext,
   solange die Kunden-VOICE.md nicht ausdrücklich widerspricht
3. Kunden-Voice / `copywriting` + `sprech-sprache.md`
4. Generisches 5-Beat in `beat-struktur-und-aufbau.md` nur als Fallback

## Gotchas

- **Kein Performance-Zwang.** Ohne eigenen Korpus ist der Markt-Pfad vollwertig, aber das
  Winner-Basis-Feld muss das ehrlich sagen, statt Zahlen zu erfinden oder zu borgen.
- **Hook-Ende inhaltlich, nicht per Satzzahl.** Funktion zählt (Retention vor Delivery).
- **Direktheit Standard, Curiosity Ausnahme.** Curiosity ohne Payoff = Anti-Muster.
- **Testimonial-Roh-Format** ist bewusste CTA-Ausnahme. Nur mit echtem Call-Outcome.
- **Markenfarbe/-Assets nie aus dem Gedächtnis**: gegen `client-*/brand/` prüfen.
- **Fable-Gotcha (Regel 19):** Verifier nur pass/fail + eingefügter Beweis, nie
  „erkläre deinen Gedankengang".
- **Tote Verweise vermeiden:** „Craft-Kern" = Abschnitt A dieses Files.
- **Der Korpus ist Beleg, kein Vorbild.** 711 laufende Ads enthalten auch Slop
  (`voice-dna-ads.md` V11). Übernommen werden Bauform und Beweismuster, nie eine
  Formulierung, die in `forbidden.md` steht: Laufzeit im Konto adelt kein Muster.
- **Voice-DNA neu messen nach jedem Korpus-Refresh.** Ändert sich der Median der
  Hook-Länge oder das Du/Sie-Verhältnis deutlich, wandern die Regeln in
  `voice-dna-ads.md` Teil 2 mit. Zahlen von 2026-08-13: Median 8 Wörter, 83,3 % Duzen.
- **Schreiber-Kontext unter 50 %.** Der Korpus ist ~15.000 Zeilen. Nie komplett
  laden: gezielt greppen oder per Subagent auswerten. Über 50 % Füllstand fällt
  die Sprechtext-Qualität hart ab.
- **Root-Cause D1–D9 (2026-08-11):** Craft-Refs müssen in `loads` bleiben; Performance
  muss im Output-Feld stehen; no-ai-slop muss feuern; entkernte Story ohne Proof-Inventar
  ist BLOCKED, nicht „kreativ".
