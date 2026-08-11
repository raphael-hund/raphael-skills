---
name: ads-video
version: 0.2.0
description: >
  Feuert wenn aus Angle/Hook (aus dem ads-Router) ein Video-Ad-Skript für Meta/TikTok
  entstehen soll: Beat-Struktur, Sprechtext, Einblendungs-/Illustrationsplan.
  Trigger: "Video-Skript schreiben", "Ad-Skript", "Drehbuch für Ads", "Skripte für
  Testwelle", "Hook-Varianten fürs Video". Lernt Pflicht aus dem Airtable-Korpus
  (Winner + Referenz-Volltexte) und dem Playbook, analysiert Kunden-Referenzen nach
  fester Methodik, schreibt nie aus dem Gedächtnis, und endet erst nach no-ai-slop-Pass
  + Messlatte.
class: F
scope: agency
sensitivity: internal
loads:
  - references/playbook-geile-ads.md
  - references/korpus/eigene-ads.md
  - references/korpus/referenz-ads.md
  - references/skript-analyse-methodik.md
  - references/hook-formeln.md
  - references/skript-architekturen.md
  - references/beat-struktur-und-aufbau.md
  - references/sprech-text-regeln.md
  - references/sprech-sprache.md
  - references/video-visuals.md
requires_skills: [copywriting@^0, no-ai-slop@^0]
completion_criteria:
  - "Winner-Basis-Feld gesetzt (Ad-Name/ID + Hookrate/Spend/CTR oder ehrlich 'kein Performance-Datensatz')"
  - "F-ID + A-ID benannt; je mindestens 1 wörtliche Belegzeile aus Korpus/Refs derselben Bauform gelesen"
  - "jedes Skript hat Beat-Tabelle (Funktion, Zeile, Wortzahl, Device) + Gesamt-/Hook-Wortzahl + CTA-Typ"
  - "Hook: erste 12 Wörter hart (Callout|Proof|Garantie|Outcome|Pain); Zahl oder Name in Satz 1"
  - "Mechanismus-Eigenname gesetzt; Proof früh (Case) + spät/Aggregat; mind. 1 filmbarer Proof-Beat"
  - "CTA = Aktion + Ort + was danach + Zeitrahmen/Reibung"
  - "≥3 Hook-Varianten, ≥2 verschiedene F-IDs, je On-Ramp + Caption-Job + Visual-Job (keine Paraphrasen-Triplette)"
  - "jeder Claim/jede Zahl grounded (Dossier-Datei oder Winner-Korpus); sonst BLOCKED mit Materialfrage"
  - "no-ai-slop Edit-Pass auf Sprechtext dokumentiert (Was geändert oder 'keine Muster'); Spoken-Ausnahmen R2/R3 bewahrt"
  - "Messlatte aus skript-architekturen.md (10 Assertions) grün; Onscreen≠VO; Laut-lesen-Pass"
  - "Einblendungs-/Visuals-Plan liegt vor (ein Beat je Einblendungszeile)"
---

# ads-video — Video-Ad-Skripte aus Winner-Korpus + Angle

**Aufruf:** `ads-video(kunde: slug [pflicht], anzahl: int = 3)`

**Version 0.2 (2026-08-11):** Korpus+Playbook Pflicht, no-ai-slop verdrahtet, loads
schließen Craft-Lücke (F/A/Spoken/Messlatte), Performance steuert Schreibregel.
Root-Cause: `raphael-command-center/docs/plans/2026-08-11-ads-video-rootcause-grok.md`.

## Lies zuerst (Lese-Pfade)

### A. Referenz-Datenbank (Pflicht — vor jedem Entwurf)

| Quelle | Pfad | Job |
|---|---|---|
| Playbook | `references/playbook-geile-ads.md` | Winner/Loser-Regeln, Skelett, Ship-Checkliste |
| Eigene Ads (Performance) | `references/korpus/eigene-ads.md` | Top-Spend × Hookrate; Winner-Basis wählen |
| Referenz-Ads (Markt) | `references/korpus/referenz-ads.md` | 2 Volltexte derselben Hook-Familie wörtlich lesen |
| Hook-Formeln | `references/hook-formeln.md` | F1–F13 wählen, ≥2 F-IDs in Varianten |
| Architekturen + Messlatte | `references/skript-architekturen.md` | A1–A7 + 10 Assertions vor Ship |
| Spoken-Härtung | `references/sprech-sprache.md` | R1–R8, Kraftwort-Regeln |
| Export-Refresh | `scripts/export-airtable-korpus.sh` | wenn Korpus-Kopfdatum >30 Tage |

**Korpus-Klassen:** nur Records mit Volltext für Phase-1-Zitate.  
`[UNVOLLSTÄNDIG — nur in Notion]` → ausschließen, nicht erfinden.  
Drafts/Konzepte im Kundenordner = Stil/Dialekt, **nicht** Beat-Skelett-Quelle.  
Skelett-Quelle = `winner` / `laufend` (Performance oder klarer Flight).

**Refresh:** `bash /root/raphael-skills/skills/eigene/ads-video/scripts/export-airtable-korpus.sh`  
Auth: `/root/tools/secrets/airtable.env` · Base `app9VvWqeSNAOwwmV`.  
Kein Live-API-Zwang im Schreibpfad — Datei-Korpus reicht.

### B. Kunden-Wissen (Pflicht)

| `kunde` | Wissens-Pfad | Stil-Referenz (zusätzlich zum Korpus) |
|---|---|---|
| `make` | `/root/raphael-brain/wiki/company/` (`icp/`, `offer/`, `voice/`) | `/root/clients/client-make/ads/` — **Winner/Transkripte zuerst**, nicht Storytime-Illustrationen als Skelett |
| `<slug>` | `/root/clients/client-<slug>/wiki/` | `/root/clients/client-<slug>/ads/` |

**Fehlt der Wissens-Pfad** → stoppen und Raphael fragen. Kein generisches Weiterschreiben.

## Ablauf

0. **Korpus + Playbook laden.** Playbook §0–§2 lesen. Aus `korpus/eigene-ads.md`
   Top-3 Video-Ads nach Spend×Hookrate (14T) bestimmen (Hookrate 0 + alter High-Spend =
   Metrik-Lücke, nicht automatisch Flop; ROAS 0 bei Lead-Gen ignorieren).  
   **Winner-Basis** notieren. Zwei Referenz-Volltexte derselben Bauform aus
   `korpus/referenz-ads.md` wörtlich lesen. Korpus >30 Tage → Refresh-Skript anbieten/ausführen.

1. **Kunden-Wissen laden.** ICP, Offer, Voice aus Pfad B. Ohne belastbares
   ICP/Offer/Voice kein Entwurf.

2. **Angle/Hook vom Router übernehmen.** Angle kommt aus `ads` (angles/hooks,
   `eigene/ads/references/hook-taxonomie.md`). `ads-video` erfindet keine Strategie.
   Fehlt freigegebenes Angle → nachfragen, nicht raten.

3. **Proof-Inventar (Positiv-Zwang).** Aus Dossier + Winner-Korpus alle freigegebenen
   Zahlen, Namen, filmbaren Artefakte listen. Mindestens **1 früher Case** und
   **1 filmbarer Proof** müssen ins Skript — sonst **BLOCKED** mit konkreter
   Materialfrage (nicht entkernt weiterschreiben). Stärksten erlaubten Claim wählen.

4. **Referenz-Analyse (Methodik).** Kunden- und Korpus-Volltexte nach
   `skript-analyse-methodik.md` Phase 1+2 zerlegen. Nur `winner`/`laufend` + Volltext
   fürs Skelett. Ergänzend: Playbook §5 Skelett; `hook-formeln.md` + `skript-architekturen.md`
   als Markt-Rahmen. `beat-struktur-und-aufbau.md` nur Fallback wenn <3 brauchbare
   Referenzen — die Zeile „Wenn du [ICP] bist und [Outcome] willst, brauchst du [Offer]"
   ist **Anti-Beispiel**, keine Vorlage.

5. **F-ID + A-ID wählen, dann schreiben.** Vor dem ersten Satz: eine Hook-Formel
   (F1–F13) und eine Architektur (A1–A7) benennen; je 1 Belegzeile aus denselben Refs.
   Body vom Winner clonen, wenn derselbe Funnel läuft — nur Angle/Hook-Variante neu.
   Text/Ton: `copywriting` + `sprech-text-regeln.md` + `sprech-sprache.md`.  
   Je finalem Skript **≥3 Hook-Varianten mit ≥2 F-IDs**, je Variante On-Ramp (Sek. 3–15),
   Caption-Job, Visual-Job. Paraphrasen derselben Formel zählen nicht.

6. **Beat-Tabelle + Grounding-Checkliste + Winner-Basis-Feld.**  
   Pro Skript: Beat-Tabelle (Funktion, Zeile, Wortzahl, Device), Gesamt-/Hook-Wortzahl,
   CTA-Typ, **Winner-Basis:** `<Ad-Name/ID> | Hookrate/Spend/CTR` oder
   `kein Performance-Datensatz`. Jede Zahl/Case mit Quelle.

7. **no-ai-slop Pflicht-Gate.** Sprechtext durch `no-ai-slop` **Edit-Modus**.
   Muster-Katalog anwenden; jeden Eingriff benennen; Stimme bewahren.  
   **Spoken-Ausnahme:** Füllwörter/Kraftwörter im Hook (R2/R3 `sprech-sprache.md`)
   nicht glätten. Ohne dokumentierten Pass gilt das Skript als unfertig.

8. **Messlatte grün.** Alle 10 Assertions in `skript-architekturen.md` (Form, erste
   12 Wörter, Zahl im Hook, Mechanismus-Name, Proof×2+filmbar, Disclaimer, voller CTA,
   Neg-Quali wenn High-Ticket, Laut-lesen, Onscreen≠VO). Eine rot → fixen, nicht shippen.

9. **Visuals-Plan.** Nach `video-visuals.md`: Sprech-Zeile ↔ Einblendung,
   Illustrations-Rezept falls nötig, Markenfarben nur aus `client-*/brand/` (nie raten).

## Grounding-Pflicht (hart)

Jede Zahl, jeder Kundenname, jedes Ergebnis braucht Quelle aus Dossier (Proof/VOC)
oder Winner-Korpus/freigegebenem Case. Fehlt Rohmaterial: stoppen und fragen —
identisch zur Grounding-Pflicht der Statics-Briefs im `ads`-Router.

## Claims-QA bleibt beim Router

`ads-video` schreibt, prüft aber nicht final gegen Meta-Policy/HWG/UWG — das ist
`claims-qa` (Sol, frische Session, `eigene/ads/references/claims-verbote.md`).
Beim Schreiben grob gegensteuern (`sprech-text-regeln.md`).

## Hierarchie bei Regelkonflikt

1. Winner-Korpus + Playbook (was messbar hält/skaliert)  
2. `hook-formeln.md` + `skript-architekturen.md` (Markt-Craft + Messlatte)  
3. Kunden-Voice / `copywriting` + `sprech-sprache.md`  
4. Generisches 5-Beat in `beat-struktur-und-aufbau.md` nur als Fallback  

## Gotchas

- **Hook-Ende inhaltlich, nicht per Satzzahl.** Funktion zählt (Retention vor Delivery).
- **Direktheit Standard, Curiosity Ausnahme.** Curiosity ohne Payoff = Anti-Muster.
- **Testimonial-Roh-Format** ist bewusste CTA-Ausnahme — nur mit echtem Call-Outcome.
- **Markenfarbe/-Assets nie aus dem Gedächtnis** — gegen `client-*/brand/` prüfen.
- **Fable-Gotcha (Regel 19):** Verifier nur pass/fail + eingefügter Beweis, nie
  „erkläre deinen Gedankengang".
- **Tote Verweise vermeiden:** „Referenz-Datenbank" = Abschnitt A dieses Files.
- **Root-Cause D1–D9 (2026-08-11):** Craft-Refs müssen in `loads` bleiben; Performance
  muss im Output-Feld stehen; no-ai-slop muss feuern; entkernte Story ohne Proof-Inventar
  ist BLOCKED, nicht „kreativ".
