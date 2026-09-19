---
title: "INDEX — Router des Skills ads"
type: reference
confidence: high
status: approved
created: 2026-09-18
tags: [ads, router, navigation, index]
---

# INDEX — Router

Ein Einstieg für alles: Arbeits-Teile, Craft-Kanon, Korpus, Segmente, Recherche.
Der Skill ist seit 18.09.2026 ein generisches Produktions-Framework
(Strategie auswerfen, Statics bauen, Videos bauen); was entfernt wurde und wo
Kern-Inhalte überleben, steht in `purge-log.md`.

**Lese-Regeln:**
- Nur laden, was die Aufgabe braucht — nie alle Ordner auf einmal.
- GROSSE Dateien (v. a. `korpus/`) nie vollständig ziehen, sondern gezielt
  den passenden Abschnitt lesen.
- Absolute Pfade unter `/root/...` in älteren Dateien sind Provenienz-Verweise
  auf das Quell-System und liegen nicht im Paket.
- Vorrang bei Konflikten: Kundenauftrag/Lern-Register > Chef-Entscheide
  (`konflikt-register.md`) > Craft-Kanon (`craft/`, `eigene-regeln.md`) >
  `doktieren-sop.md` (Anregung) > Creator-Rat (Playbooks) > Fremd-Benchmarks.

```bash
python3 "$ADS_ROOT/scripts/load-wissen.py" --skill ads --kunde <slug>
```

## 1. Aufgabe → Datei

| Aufgabe | Zuerst lesen |
|---|---|
| Strategie auswerfen (Konzept, Format, Testwelle, Messen) | `teil-strategie.md` → `strategie/2026-07-21-creative-testwellen-register-strategie.md` |
| Static-Brief bauen | `teil-statics.md` → `statics/brief-schema.md`, `statics/copy-bauformen.md`, `creative/2026-07-20-referenz-static-ad-muster.md` |
| Video-Skript schreiben | `teil-video.md` → `video/`, `video-produktion.md`, `creative/2026-07-20-referenz-video-skript-struktur.md` |
| Hooks schreiben | `hook-werkstatt.md` (Familien × Styles × Format-Matrix) → `video/hook-formeln.md` |
| Beispiele / Orientierung (Skript-Skelette, Static-Layouts) | `beispiele.md` — Bauformen mit wörtlichen Original-Hooks (nie 1:1 übernehmen) |
| Willington-System (Three C's, Stop-Prove-Tell, Service-Business-Funnel) | `brandon-willington-playbook.md` |
| Shiver/Gordon-Taktiken (Hook-Vierklang, CAPI-Events, Creative-Volumen) | `shiver-gordon-taktiken.md` |
| Primary Text / Copy schreiben | `ad-copy.md` (6 Bauformen + Anti-Stakkato-Regel) → `copy-referenztexte.md` (Beleg-Volltexte), `creative/direct-response-copywriting-prinzipien.md`, `creative/2026-07-27-headline-regeln-klartext.md` |
| Offer / Value Proposition bauen | `offer-architektur.md` → `creative/offer-ergebnis-risikoumkehr.md` |
| Psychologische Prinzipien (Cialdini) einsetzen | `cialdini-in-ads.md` |
| Recherche / Werbebibliothek (Meta Ads Library) | `teil-research.md` + `meta-ads-library.md` |
| Gewinner-Muster nachschlagen (Korpus) | `korpus/` (711 Ads; Zählbasis in `korpus/README.md`) — GROSS, gezielt lesen |
| Kill/Keep/Scale, 7/30 Tage | `loop3-ablauf.md`, `messung/2026-07-20-meta-ads-metrik-hierarchie-kpi.md`, `strategie/2026-07-20-lernen-und-ausweiten-brauchen-getrennte-entscheidungen.md` |
| Lead-Qualität diagnostizieren | `messung/2026-07-20-lead-qualifizierung-pixel-conversions-api.md`, `messung/2026-07-20-die-messkette-endet-beim-verkauf-statt-beim-kontakt.md` |
| Messlatten, CPL-Rechnung, Baseline-Methodik | `eigene-regeln.md` (Methodik mit Referenzwerten aus einem echten Konto, Juli/Aug 2026) + `leadgen-betriebsmodell.md` |
| Konflikte / Chef-Entscheide | `konflikt-register.md` — Chef-Entscheide gehen jedem Creator-Rat vor |
| Chef-Entscheide nachschlagen | `chef-entscheide.md` — Sammelstelle aller Entscheide vom 18.09.2026 (Thema → Entscheid → wo verankert) |
| Claims / Compliance vor Schaltung | `claims-verbote.md` |
| Markt-Segment wählen | `segment-map.md` → `maerkte/<segment>.md` |
| Neue Erkenntnisse (Stand 09/2026) | `recherche-2026-09-18/` (DACH + international), `chatgpt-ads.md` |
| Lead-Magnet / Funnel | `creative/2026-07-23-lead-magnet-und-funnel.md`, `creative/erweitert-lead-magnete.md` |
| Vorlagen für eigene Notizen | `templates/` (lesson, framework, contradiction-test-matrix) |
| Chef-Diktat / SOP-Fragen | `doktieren-sop.md` (Anregungs-Layer mit Korpus-Evidenz-Ampeln) |
| Bild-/Video-Assets | `assets/` (Vorlagen und Medienbausteine des Skills) |

## 2. Ordner-Landkarte

| Ordner/Datei | Zweck / Leitfrage |
|---|---|
| `teil-strategie.md` | Was zuerst — Konzept, Format, Welle, Messen? |
| `teil-icp.md` | Wer kauft, was tut weh? |
| `teil-research.md` | Welche Angles und Belege tragen das Konzept? |
| `teil-video.md` | Wie wird aus dem Dossier ein sprechbares Skript? |
| `teil-statics.md` | Wie wird aus dem Dossier ein Static-Brief? |
| `loop3-ablauf.md` | Was bedeuten 7/30 Tage — pausieren, halten, skalieren? |
| `claims-verbote.md` | Was darf die Ad nicht versprechen? |
| `meta-ads-library.md` | Wie belege ich Konkurrenz-Ads visuell? |
| `video-produktion.md` | Wie läuft Diktat → Drehbrief → Produktion? |
| `leadgen-betriebsmodell.md` | Wie hängen Ad, Formular, Termin und Abschluss zusammen? |
| `chatgpt-ads.md` | Was gilt auf dem Kanal ChatGPT Ads (einzige Plattform-Seite)? |
| `eigene-regeln.md` | Messlatten-Framework: Methodik mit Referenzwerten (Juli/Aug 2026) |
| `konflikt-register.md` | Welcher Widerspruch ist wie entschieden? (Chef-Entscheide) |
| `chef-entscheide.md` | Alle Chef-Entscheide vom 18.09.2026 auf einen Blick (Sammel-Tabelle) |
| `doktieren-sop.md` | Was regt die Chef-SOP an — und was ist korpusbelegt? |
| `offer-architektur.md` | Wie baut man ein Grand-Slam-Offer für DACH-Leadgen? |
| `cialdini-in-ads.md` | Welches Überzeugungsprinzip passt zu diesem Angle? |
| `hook-werkstatt.md` | Wie baue ich neue Hooks aus Familien × Styles? |
| `segment-map.md` / `maerkte/` | Welches Marktsegment passt zum Auftrag? |
| `craft/` | Übertragbares Handwerk: Statics, Video, Dossier-Schema, Referenzkatalog |
| `statics/` | Copy-Formeln, Bauformen, Visual-Styles, Brief-Schema, Angles, Wettbewerber |
| `video/` | Hook-Formeln, Skript-Architekturen, Visuals, Produktion |
| `korpus/` | 711-Ads-Referenzsammlung (711 Records / 682 mit Text / 455 Hook-Labels / 383 Statics / 328 Videos). GROSS — gezielt lesen |
| `creative/` | Referenz-Synthesen: Konzept-Prinzipien, Static-Muster, Skript-Struktur, Offer/Garantie/CTA, Copywriting, Lead-Magnete |
| `messung/` | Vier eigene Synthesen: Metrik-Hierarchie, Messkette bis Verkauf, Lead-Qualifizierung/CAPI, Anzeigenbericht-Warnungen |
| `strategie/` | Datierte eigene Seiten + `erweitert-*`, `retargeting-graveyard.md`, `skalierung-infrastruktur.md`, `ads-reihenfolge-und-diagnose.md` |
| `recherche-2026-09-18/` | Recherche-Destillate DACH + international (Stand 09/2026) |
| `maerkte/` | Segment-Definitionen für den Loader |
| `templates/` | Vorlagen `lesson.md`, `framework.md`, `contradiction-test-matrix.md` |
| `marc-evers-playbook.md`, `zac-regan-startrunningads.md`, `hormozi-paid-ads.md`, `brandon-willington-playbook.md`, `shiver-gordon-taktiken.md` | Creator-Playbooks als ergänzende Muster (Roh-Archive entfernt, siehe `purge-log.md`) |
| `beispiele.md` | Referenz-Sammlung: Video-Skript-Skelette + Static-Layouts zur Orientierung (Bauform ja, Claims nie kopieren) |

## 3. Übergabe zwischen den Teilen

Strategie nennt die begründete Formatwahl plus Konzept-Achsen.
ICP füllt Felder. Research schreibt `DOSSIER=` plus `SEGMENT=`.
Video und Statics lesen das Dossier. Ohne Dossier: ICP plus User.
Nach jedem Test: Beobachtung, Interpretation, nächste Testfrage ins
Lern-Register des Kunden.
