---
name: ads-video
version: 0.1.0
description: >
  Feuert wenn aus Angle/Hook (aus dem ads-Router) ein Video-Ad-Skript für Meta/TikTok
  entstehen soll: Beat-Struktur, Sprechtext, Einblendungs-/Illustrationsplan.
  Trigger: "Video-Skript schreiben", "Ad-Skript", "Drehbuch für Ads", "Skripte für
  Testwelle", "Hook-Varianten fürs Video". Analysiert bestehende Referenz-Skripte des
  Kunden nach fester Methodik, bevor neu geschrieben wird — nie aus dem Gedächtnis.
class: F
scope: agency
sensitivity: internal
loads:
  - references/skript-analyse-methodik.md
  - references/beat-struktur-und-aufbau.md
  - references/sprech-text-regeln.md
  - references/video-visuals.md
requires_skills: [copywriting@^0]
completion_criteria:
  - "jedes Skript hat eine Beat-Tabelle mit Wortzahlen (Funktion, Zeile, Wortzahl, Device je Beat)"
  - "jeder Claim/jede Zahl im Skript trägt eine Grounding-Quelle (vorhandene Dossier-Datei z.B. Proof/VOC, oder echter Case)"
  - "Sprechtext ohne Regel-Sätze/Weichmacher (references/sprech-text-regeln.md, Wort-Substitutionstest bestanden)"
  - "je Skript mindestens 3 Hook-Varianten"
  - "Einblendungs-/Visuals-Plan liegt vor, ein Beat je Einblendungszeile"
---

# ads-video — Video-Ad-Skripte aus Angle + Referenz-Skelett

**Aufruf:** `ads-video(kunde: slug [pflicht], anzahl: int = 3)`

## Lies zuerst (Lese-Pfade, fest verdrahtet nach Kunde)

| `kunde` | Wissens-Pfad | Stil-Referenz (bestehende Skripte) |
|---|---|---|
| `make` (Sonderfall: Agentur ist eigener Kunde, ICP/Offer/Voice liegen im gemeinsamen Brain statt in einem Kundenrepo-Wiki) | `/root/raphael-brain/wiki/company/` (`icp/`, `offer/`, `voice/`) | `/root/clients/client-make/ads/` (bestehende Skripte/Statics als Stil-Referenz) |
| `<slug>` (jeder andere Kunde) | `/root/clients/client-<slug>/wiki/` (Dossier-Dateien aus Loop 1 — vorhandene ICP/Offer/Proof/Voice/VOC lesen, Dateinamen können je Kunde variieren) | `/root/clients/client-<slug>/ads/` |

**Fehlt der Wissens-Pfad** (bei MAKE: `wiki/company/` leer oder icp/offer/voice fehlen; bei
anderen Kunden: kein `wiki/` unter dem Kundenpfad, oder kein Dossier darin) → **stoppen und
Raphael fragen**, nicht mit generischer Annahme weiterschreiben. Das Kunden-/Agentur-Wissen ist
Pflicht-Voraussetzung (Loop-1-Dossier bzw. Agentur-Brain), kein optionaler Kontext.

## Ablauf

1. **Kunden-Wissen laden.** ICP (wer, Situationen/Schmerz, Glaubenssätze/Sprache,
   Kauftrigger), Offer (Angebot, Garantie/Preisanker), Voice (Sprachmuster, Ton) aus dem
   Lese-Pfad oben. Ohne belastbares ICP/Offer/Voice kein Skript-Entwurf — siehe Stopp-Regel.
2. **Angle/Hook übernehmen, nicht selbst erfinden.** Das Angle bzw. der gewählte Hook-Typ
   kommt aus der Vorarbeit des `ads`-Routers (Schritte `angles`/`hooks` im dortigen
   Ablauf, `eigene/ads/references/hook-taxonomie.md`). `ads-video` macht keine eigene
   Strategie-/Angle-Arbeit — dafür ist der Router da. Fehlt ein freigegebenes Angle,
   beim Router/bei Raphael nachfragen statt eines zu raten.
3. **Referenz-Skripte analysieren.** Bestehende Kunden-Skripte (Stil-Referenz-Pfad oben)
   nach `references/skript-analyse-methodik.md` (Phase 1 + Phase 2) zerlegen: Beats,
   Wortzahlen, Devices je Skript, dann Vergleichstabelle + gemeinsames Skelett +
   Fill-in-the-blank-Template. Ergänzend `references/beat-struktur-und-aufbau.md`
   (Standard-Skelett, Awareness-Stufen, ABT-Framework) für den allgemeinen Rahmen, falls
   noch keine oder zu wenige Kunden-Referenzskripte existieren.
4. **Skript nach Skelett schreiben.** Für Text/Ton/Stil-Gate den `copywriting`-Skill
   nutzen (Voice laden, Orwell-DE, Floskel-Check, Hook & CTA nach `cta-framework.md`).
   `references/sprech-text-regeln.md` gilt zusätzlich als Härtungsregel: Vorlage vor
   Regel, keine Regel-Sätze/Weichmacher im Sprechtext. Je Skript **mindestens 3
   Hook-Varianten** nach dem Fill-in-the-blank-Template aus Schritt 3 schreiben, Body
   meist fest (siehe MAKE-Muster: 1 Body × mehrere Hook-Varianten).
5. **Beat-Tabelle + Grounding-Checkliste ausgeben.** Pro finalem Skript: Beat-Tabelle
   (Funktion, Zeile, Wortzahl, Device — gleiches Format wie Phase 1 der Analyse-Methodik),
   Gesamt-/Hook-Wortzahl, CTA-Typ. Grounding-Checkliste: jede Zahl/jeder Case-Name im
   Skript mit Quelle (Zeile/Zitat aus vorhandener Dossier-Datei, oder als offene Frage an
   Raphael/Kunden markiert, falls (noch) unbelegt) — kein erfundener Claim.
6. **Visuals-Plan.** Einblendungs-/Illustrations-/B-Roll-Plan nach
   `references/video-visuals.md`: Tabelle Sprech-Zeile ↔ Einblendung, Illustrations-
   Stil-Rezept (falls neue Doodles nötig), Referenzbilder-Hinweis.

## Grounding-Pflicht (hart)

Jede Zahl, jeder Kundenname, jedes Ergebnis im Skript braucht eine Quelle aus einer
vorhandenen Dossier-Datei (z.B. Proof/VOC) oder einem echten freigegebenen Case. Fehlt Rohmaterial: stoppen und
Raphael/Kunden um Material bitten, nicht ungegroundet weiterproduzieren — identisch zur
Grounding-Pflicht der Statics-Briefs im `ads`-Router.

## Claims-QA bleibt beim Router

`ads-video` schreibt und produziert, prüft aber nicht final gegen Meta-Policy/HWG/UWG —
das läuft laut `ads`-Ablauf als eigener Schritt (`claims-qa`, Sol, frische Session,
`eigene/ads/references/claims-verbote.md` des `ads`-Skills). Beim Schreiben trotzdem grob
gegensteuern (siehe `sprech-text-regeln.md`).

## Gotchas

- **Hook-Ende ist inhaltlich definiert, nicht per Satzzahl.** Manche Hooks sind 1 Satz,
  manche 3-4 Zeilen — für die Beat-Tabelle zählt die Funktion (Retention vor Delivery),
  nicht eine Wortzahl-Regel.
- **Direktheit ist Standard, Curiosity ist die Ausnahme.** Nur eine Minderheit
  erfolgreicher Referenz-Hooks nutzt Curiosity-Gap-Wörter — bei aware/direkten Angeboten
  nicht künstlich auf Rätsel-Hooks drängen.
- **Testimonial-Roh-Format ist eine bewusste Ausnahme von der CTA-Pflicht**, kein
  Vergessen — nur einsetzen, wenn ein echter Kunden-Call mit klarem Outcome vorliegt.
- **Markenfarbe/-Assets nie aus dem Gedächtnis annehmen** — vor dem Visuals-Batch gegen
  `client-<name>/brand/` (o. Ä.) verifizieren.
- **Fable-Gotcha (Regel 19):** falls ein Skript-Judge/Verifier gebaut wird, nie "erkläre
  deinen Gedankengang" verlangen — "pass/fail mit eingefügtem Beweis" verlangen.
- Noch keine weiteren Fallen aus echter Ship-Praxis beobachtet — junger Skill (Stand
  2026-07-23); bei der nächsten Anwendung hier ergänzen.
