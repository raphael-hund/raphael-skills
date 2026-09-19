---
title: "Purge-Log — Radikal-Verschlankung 18.09.2026"
type: register
status: approved
created: 2026-09-18
tags: [ads, purge, chef-direktive, historie]
---

# Purge-Log — Chef-Direktive 18.09.2026

**Direktive (Chef, 18.09.2026):** „Der Skill ist zu riesig, zu viel ungeprüftes
Zeug reingepackt. Alles mit MAKE-Marketing raus. Der Skill soll nur Frameworks
haben — er hilft: Strategie auswerfen, Statics bauen, Videos bauen. Generell
für alle Kunden, nicht MAKE."

Ergebnis: Der Skill ist ein **generisches Produktions-Framework**. MAKE-Interna,
Vendor-Dumps, Roh-Archive und die Creator-Rohbibliothek wurden entfernt
(501 → 102 Dateien, 35 MB → 3,8 MB). Diese Tabelle sichert die Verlustfreiheit
der Entscheidung: Was wurde gelöscht, warum, und wo der Kern überlebt.

## Verschoben / umbenannt (vor dem Löschen)

| Was | Wohin | Grund |
|---|---|---|
| `wissen/leadgen-betriebsmodell.md` | `references/leadgen-betriebsmodell.md` | Wird von `teil-strategie.md`, `loop3-ablauf.md` und SKILL.md referenziert |
| `plattformen/chatgpt-ads.md` | `references/chatgpt-ads.md` | Einzige behaltene Plattform-Seite (DACH-Neueintritt 2026) |
| `creative/2026-07-20-referenz-nischen-transfer-make.md` | `creative/2026-07-20-referenz-nischen-transfer.md` | Ent-MARKEn: Marke aus Dateiname und Inhalt entfernt |

## Gelöschte Ordner (komplett)

| Gelöscht | Umfang | Grund (Chef-Direktive) | Wo der Kern überlebt |
|---|---|---|---|
| `references/wissen/` | 104 Dateien, ~23 MB | Creator-Rohbibliothek: Autorenregister, `bestand/` (Roh-Korpora, Screenshots, Quellenregister), `make/ads-regeln.md`, Quellenpflege | Destillate in den drei Root-Playbooks (`marc-evers-playbook.md`, `zac-regan-startrunningads.md`, `hormozi-paid-ads.md`); Betriebsmodell verschoben; Vorrang-Regel jetzt: Chef-Entscheide in `konflikt-register.md` |
| `references/lehren/` | 194 Dateien, ~5 MB | Datierte Lehren + `creator-rat/` = ungeprüfter Rohbestand aus einem einzigen Konto | Takeaways und Kennzahlen in `eigene-regeln.md` (Messlatten-Framework); alle Streit-Entscheide in `konflikt-register.md` |
| `references/nuggets/` | 8 Dateien, ~1,7 MB | Nugget-Sammlungen (zur Hälfte Dubletten laut eigenem Befund) | Verworfene Nuggets im Verwerfungs-Protokoll von `konflikt-register.md` |
| `references/grundlagen/` | 11 Dateien | Vendor-Audit-Maschinerie (Audit-/Compliance-/Scoring-Seiten) | Diagnose-Baum in `eigene-regeln.md`; Claims in `claims-verbote.md` |
| `references/vendor/` | 6 Dateien | Drittanbieter-Dumps (claude-ads, coreyhaines-ads) | Layout-Baupläne in `creative/2026-07-20-referenz-static-ad-muster.md`, `statics/visual-styles.md` |
| `references/analyse-2026-08-13/` | 23 Dateien | Roh-Archiv einer historischen Konto-Analyse | Segment-Ergebnisse in `segment-map.md` und `maerkte/` |
| `references/plattformen/` | 12 Steckbriefe | Vendor-Steckbriefe (Meta, Google, TikTok u. a.) | `chatgpt-ads.md` verschoben; Kanal-Fragen laufen über Werbebibliothek-Recherche (`meta-ads-library.md`) |
| `scripts/pipeline/` | 19 Dateien | Creator-Ingestion-Maschinerie (Scraper, Review, Promotion) | Entfällt mit der Rohbibliothek; „Creator-Wissen aktualisieren“ gibt es nicht mehr |

## Gelöschte Einzeldateien

| Datei | Grund | Wo der Kern überlebt |
|---|---|---|
| `scripts/export-airtable-korpus.sh` | Explizite Chef-Anweisung (Korpus-Refresh nur noch auf Auftrag) | `korpus/README.md` (Refresh-Hinweis) |
| `creative/ads-create.md`, `ads-creative.md`, `ads-dna.md`, `ads-generate.md`, `ads-landing.md`, `ads-photoshoot.md` | Vendor-/Wiki-Seiten, ungeprüft | `creative/2026-07-20-static-ad-konzept-prinzipien.md`, `creative/2026-07-20-referenz-*` |
| `creative/ai-lead-magnet-playbook.md` | Fremd-Playbook | `creative/2026-07-23-lead-magnet-und-funnel.md`, `creative/erweitert-lead-magnete.md` |
| `creative/static-ads-acht-visual-style-familien.md` | Archiv-Dublette | Inhalt lebt in `creative/2026-07-20-referenz-static-ad-muster.md` |
| `messung/ads-attribution.md`, `ads-report.md`, `ads-server-side-tracking.md`, `erweitert-tracking-qualifizierung.md` | Vendor-/Wiki-Seiten | Die 4 eigenen Synthesen in `messung/` (Metrik-Hierarchie, Messkette, Lead-Qualifizierung/CAPI, Anzeigenbericht) |
| `strategie/ads-budget.md`, `ads-competitor.md`, `ads-launch.md`, `ads-monitor.md`, `ads-optimize.md`, `ads-plan.md`, `ads-setup.md`, `ads-test.md`, `bidding-strategien.md` | Vendor-/Wiki-Seiten | Datierte eigene Seiten + `erweitert-*`, `retargeting-graveyard.md`, `skalierung-infrastruktur.md` in `strategie/` |

## Ent-MAKE-en (Inhalte behalten, Marke entfernt)

| Datei | Massnahme |
|---|---|
| `eigene-regeln.md` | Neuer Titel „Messlatten-Framework — Methodik mit Referenzwerten aus einem echten Konto (Juli/Aug 2026)“; „MAKE“ → „das Referenzkonto“; Lehren-Quellenverweise → „Konto-Auswertung 07/2026“ bzw. 08/2026; Zahlen und Methodik unverändert |
| `konflikt-register.md` | „MAKE“ → „Referenzkonto“; Verweise auf gelöschte Lehren/Nuggets/creator-rat → Klartext-Herkunft; Entscheide K1–K12, S1–S9, D1–D2 unverändert |
| Alle übrigen `references/*.md` | „MAKE“ als Marke/Konto → „das Referenzkonto“ (mechanisch, ~300 Stellen); „Make“ als englisches Wort in Creator-Zitaten unangetastet |
| `SKILL.md`, `INDEX.md` | Neu geschrieben (Version 6.0.0); Vorrang-Regel „MAKE-Beschlüsse gehen vor“ ersetzt durch „Chef-Entscheide (konflikt-register.md) gehen jedem Creator-Rat vor“; Abschnitt „Creator-Wissen aktualisieren“ entfernt |
| `scripts/load-wissen.py`, `scripts/test_load_wissen.py` | Kunden-Slug „make“ entfernt; Kern-Pfade auf überlebende Dateien umgestellt |

**Schluss-Regel:** Wer einen Purge-Eintrag für falsch hält, legt den Inhalt als
geprüfte, datierte eigene Seite neu an — nicht als Roh-Dump.
