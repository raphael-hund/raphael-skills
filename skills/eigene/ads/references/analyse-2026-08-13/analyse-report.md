# Analyse-Report Ads-Suite 2026-08-13

**Zähl-Basis:** 711 Records in [counts.json](/root/raphael-skills/skills/eigene/ads/references/analyse-2026-08-13/counts.json).
**Belege:** [belege.json](/root/raphael-skills/skills/eigene/ads/references/analyse-2026-08-13/belege.json).
**Segmente:** [advertiser-segment.json](/root/raphael-skills/skills/eigene/ads/references/analyse-2026-08-13/advertiser-segment.json).
**Volltexte:** [scripts-711.jsonl](/root/raphael-skills/skills/eigene/ads/references/analyse-2026-08-13/scripts-711.jsonl).

## 1. Deckung

Der Report zählt alle 711 IDs aus `counts.json`. Die Datei ist vollständig, deshalb gibt es keinen Shortfall.

| Stand | n | Quelle |
|---|---:|---|
| Records gesamt | 711 | `n` |
| complete | 537 | original 535 + shard-title 2 |
| unrecovered | 174 | Textlücke, ID bleibt in der Zählung |
| Video | 328 | davon 325 complete, 3 ohne Skript |
| Static | 383 | davon 212 complete, 171 unrecovered |

Die 174 unrecovered IDs stehen in [rest-liste.md](/root/raphael-skills/skills/eigene/ads/references/analyse-2026-08-13/rest-liste.md). Sie fehlen als Volltext. Sie fehlen nicht in der Zählung.

Drei Videos haben Skript-Länge 0:

- `rec08ptsg7qJmKnfv` / Neuhaus Digital GmbH
- `rec6Zdd5RbsezIovq` / SEOLabs
- `recM9AP5Q301Jl2HV` / Ben Heath

## 2. Korpus-Lage

| Schnitt | Wert | n von 711 |
|---|---|---:|
| Segment agenturen-coaching | Coaching und Agentur | 327 |
| Segment b2b-dienstleister | B2B-Dienst | 211 |
| Segment local-service-handwerk | Lokal und Handwerk | 133 |
| Segment uebertragbar | ohne klare Marke | 40 |
| Anrede du | Record-Feld `anrede` | 694 |
| Anrede sie | Record-Feld `anrede` | 17 |
| Proof P-zahl | eine Zahl im Proof | 479 |
| Proof P-keine | kein Proof-Tag | 143 |
| Proof Rest | Case, Aggregat, Artefakt, Disclaimer, Eigen-Investment | 89 |
| CTA kein-cta | leeres oder unlesbares CTA | 301 |
| CTA meta-learn-more | Meta-Button | 143 |
| CTA klick-link | gesprochener Klick | 102 |
| CTA eintragen-rueckruf | Eintrag plus Rückruf | 53 |
| Hook-Feld gefüllt | erstes Hook-Feld | 455 |

Formel-Summe: F2 151, F? 234, F3 80, F8 62, F7 61, F11 60, F1 35, F4 17, F10 8, F13 2, F6 1. Das ergibt 711. F5, F9 und F12 haben 0 Treffer.

Architektur-Summe: STATIC 380, A2 166, A6 76, A1 61, A7 15, A3 7, A4 3, A5 3. Das ergibt 711.

STATIC 380 ist erwartet. 380 von 383 Statics tragen STATIC. Drei Enpal-Statics tragen A6: `recWM7htnP5rO2Hdk`, `recXTSsDfCtNyqmZW`, `recoZQrWMrqyZV0Eo`. Alle 328 Videos tragen A1 bis A7. A-IDs gelten primär für Video.

F? = 234 ist ehrlich. Alle 234 haben ein leeres Hook-Familie-Feld. Der Tagger fand kein F1-F13-Muster. 204 von 234 haben zusätzlich keinen Hook-Text. 30 haben Hook-Text ohne Muster-Treffer. Keine Familie erfinden.

## 3. F-Delta (F1–F13)

Alte Formel aus [hook-formeln.md](/root/raphael-skills/skills/eigene/ads-video/references/hook-formeln.md). Messwert ist das Feld `f_id` in `counts.json`.

| ID | Status | Messwert | Folge |
|---|---|---|---|
| F1 Garantie | bestätigt | 35 von 711 | High-Ticket mit einklagbarer Risiko-Umkehr |
| F2 Callout+Promise | bestätigt | 151 von 711 | häufigste zugewiesene Formel |
| F3 Proof-First | bestätigt | 80 von 711 | Case vor Versprechen |
| F4 Qualifizierung | bestätigt | 17 von 711 | selten, scharfer Status-Filter |
| F5 Ergebnis ohne Weg | geändert | 0 von 711 | Handbuch bleibt. Tagger trifft 0. SEOLabs-ohne-Werbung sitzt unter F2 (`recLhRPvEAiUQJFX6`) |
| F6 Konfrontation | geändert | 1 von 711 | nur Charlie Morgan `recNRkmhnqCUIjf3n` |
| F7 Gift | bestätigt | 61 von 711 | Lead-Magnet mit großer Zahl |
| F8 Schmerz-Callout | bestätigt | 62 von 711 | Pain im ersten Satz |
| F9 Pain-Montage | geändert | 0 von 711 | Speedscaling-Montage sitzt unter F8+A4 (3 Records) |
| F10 Demo | bestätigt | 8 von 711 | fast nur Finseo |
| F11 News/Buzzword | bestätigt | 60 von 711 | Tagger mischt News-Frage und YouTube-Breakdown |
| F12 Ich suche N | geändert | 0 von 711 | Matt-Shiver-Satz sitzt unter F? (`rec122MazcWWTvtOW`) oder F2 |
| F13 X ist tot | bestätigt | 2 von 711 | Finseo + Stefan Graf |
| F? | ergänzt | 234 von 711 | leer plus kein Muster. Kein erfundener F-Wert |

## 4. A-Delta (A1–A7)

Alte Architektur aus [skript-architekturen.md](/root/raphael-skills/skills/eigene/ads-video/references/skript-architekturen.md). Messwert ist das Feld `a_id` in `counts.json`.

| ID | Status | Messwert | Folge |
|---|---|---|---|
| A1 Case-Stack | bestätigt | 61 von 711, 51 in agenturen-coaching | High-Ticket-Video mit mehreren Cases |
| A2 Problem-Agitate-Solve | geändert | 166 von 328 Videos | Video-Default. Schlägt A1 in der Menge |
| A3 Lehr/Edutainment | bestätigt | 7 von 711 | selten, Finseo und Stefan Graf |
| A4 3-Wege | bestätigt | 3 von 711 | nur Speedscaling |
| A5 Lead-Magnet-Booklet | bestätigt | 3 von 711 | nur Speedscaling F7 |
| A6 Kurz-Lead-Direct | bestätigt | 76 von 711 | 73 Video + 3 Enpal-Static |
| A7 Testimonial-Longform | bestätigt | 15 von 711 | lang, selten |
| STATIC | bestätigt | 380 von 711 | erwartet bei 383 Statics |

[voice-dna-ads.md](/root/raphael-skills/skills/eigene/ads-video/references/voice-dna-ads.md) V8 nannte als Default die wörtliche Kette `Callout -> Problem -> Mechanism -> Proof -> Offer -> CTA` (6 Treffer im Struktur-String). Die A-ID-Messung setzt A2 als Video-Default.

## 5. V-Delta (V1–V12)

Quelle: [voice-dna-ads.md](/root/raphael-skills/skills/eigene/ads-video/references/voice-dna-ads.md).
Messung 2026-08-13 auf denselben 711 Records.

| ID | Status | Messwert | Folge |
|---|---|---|---|
| V1 Hook-Länge | bestätigt | Median 8 Wörter, n=455. Unter 10 Wörter: 236 von 455 | erster Satz bleibt kurz |
| V2 Fragment vor Frage | bestätigt | Fragment ≤4 Wörter: 160 von 455. Frage: 37 von 455 | Fragment bleibt Default |
| V3 Zahl früh | bestätigt | Ziffer im ersten Satz: 137 von 455 (30,1 %) | Zahl in Satz 1 bleibt Pflichtziel |
| V4 Anrede | geändert | Record-Feld: 694 du, 17 sie | Voice-DNA zählte Wort-Zeilen (685 zu 137). Neue Basis ist das Record-Feld |
| V5 Ich-Form | bestätigt | kein Record-Feld. Evers und Harting sprechen in Ich | Person als Gesicht bleibt Ich |
| V6 Hook-Familien | ergänzt | Callout-Hook 98, Proof-Hook 77. Hook-Familie leer: 286 | F? 234 erklärt die Lücke |
| V7 Angle | ergänzt | Dream-Outcome 123, Pain 84. Angle-Familie leer: 341 | Dream-Outcome bleibt Default. 341 ohne Tag |
| V8 Skriptstruktur | geändert | A2 = 166 von 328 Videos | Video-Default ist A2. Der 6er-String bleibt eine Schreibhilfe |
| V9 CTA | bestätigt | meta-learn-more 143, klick-link 102, eintragen-rueckruf 53, kein-cta 301 | Meta-Button nie schreiben. Gesprochenen CTA stapeln |
| V10 Rhythmus | bestätigt | qualitativ an 8 Auszügen | Satzlänge springt. Kein neuer Wortzähler |
| V11 Markt-Slop | bestätigt | Isokolon liegt im Korpus (`rec1ZSd1NIMFINAkM`) | Muster bleibt verboten |
| V12 Selbstcheck | bestätigt | Prozessregel, keine Korpus-Zählung | sechs Fragen vor Abgabe |

## 6. Streit: Static zuerst oder Video zuerst

Der Katalog entscheidet den Streit nicht.

**Seite ads-Skill (Statics-first für neue Angles).**
Quelle: [SKILL.md](/root/raphael-skills/skills/eigene/ads/SKILL.md) Abschnitt Strategie-Regel.

> neue Angles werden zuerst als einfache Statics getestet (billiger/schneller zu produzieren als Video), bevor überhaupt ein Video-Skript entsteht.

Einschränkung in derselben Datei: die Sequenz ist ein Einzelfall-Beleg für einen neuen, ungetesteten Angle. MAKE fährt sonst Static und Video desselben Angles im selben Testing-Ad-Set.

**Seite Evers (Video als Default zur Offer-Validierung).**
Wortlaut aus dem [Blueprint Zeile 259](/root/raphael-brain/raw/ads-quellen/2026-08-13-marc-evers-no-funnel-ads-blueprint.txt):

> Static Ads (Bilder) würde ich nur sehr selten empfehlen, um dein Angebot zu validieren. Auch wenn du hier meist günstigere Leadpreise bekommst, ist die Lead Qualität meist schlechter. Nutze stattdessen lieber Video Ads um zu schauen, ob du bereits qualifizierte Leads mit deinem Angebot bekommst.

Wortlaut aus dem [Meeting 2026-08-05](/root/raphael-brain/raw/meetings/2026-08-05-impromptu-zoom-meeting-170417796.md):

> Also Statics laufen bei mir gerade auch, ja, aber weil ich auf Open-VSL-Fonnel gehe.

Kandidat mit beiden Sätzen: [evers-budget-und-testlogik.md](/root/raphael-brain/wiki/_candidates/2026-08-13-evers-budget-und-testlogik.md).

Korpus-Hinweis, kein Sieger: Marc Evers plus Marc Evers Marketing & Consulting = 75 Records, 50 Video und 25 Static. Der Korpus ist video-lastiger als der Gesamtschnitt (328 Video von 711). Das belegt Evers-Praxis. Das widerlegt die Statics-first-Regel für neue Angles nicht.

**Geltungsbereich bleibt offen.** Raphael legt fest, wann Static zuerst gilt und wann Video das Offer prüft.

## 7. Was der Katalog macht

Regeln und Belege stehen in [regel-katalog.md](/root/raphael-skills/skills/eigene/ads/references/analyse-2026-08-13/regel-katalog.md).

Drei Klassen:

1. Immer-Regeln gelten auf allen 711 Records.
2. Manchmal-Regeln gelten nur mit Bedingung.
3. Markt-Regeln gelten nur in einem Segment.
