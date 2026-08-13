# Regel-Katalog aus 711 Referenz-Records (2026-08-13)

Zähl-Basis: [counts.json](/root/raphael-skills/skills/eigene/ads/references/analyse-2026-08-13/counts.json).
Belege: [belege.json](/root/raphael-skills/skills/eigene/ads/references/analyse-2026-08-13/belege.json) und Stichproben aus [scripts-711.jsonl](/root/raphael-skills/skills/eigene/ads/references/analyse-2026-08-13/scripts-711.jsonl).
Streit Static/Video: [analyse-report.md](/root/raphael-skills/skills/eigene/ads/references/analyse-2026-08-13/analyse-report.md) Abschnitt 6.

Drei Klassen stehen im Katalog. Eine Immer-Regel gilt auf allen 711 Records. Eine Manchmal-Regel gilt nur mit Bedingung. Eine Markt-Regel gilt nur in einem Segment.

---

## Immer-Regeln

### I1. Schreibe Du

**Zähl-Basis:** 694 von 711 Records tragen `anrede=du`.

**Regel:** Schreibe Du. Wechsle die Anrede im Skript nicht.

**Belege:**

`rec2swcIR2LqdpIVS` / Marc Evers Marketing & Consulting:

> Trag dich ein, ich rufe dich in den nächsten 48h persönlich an

`rec3uFofF8HKO3Zl9` / Neuhaus Digital:

> Wenn du als Bildungseinrichtung deine Teilnehmer oder Schüler rein über Empfehlungen oder deine Webseite generierst, dann pass jetzt gut auf.

`rec4SpzSkEzdgjsj3` / SEOLabs:

> Schau mal, wir haben diesen Handwerksbetrieb hier auf Platz 1 für sein wichtigstes Keyword gebracht in der Google-Suche

### I2. Setze eine belegte Zahl neben die Behauptung

**Zähl-Basis:** 479 von 711 Records tragen `proof_form=P-zahl`. 568 von 711 tragen irgendeine Proof-Form. 143 tragen `P-keine`.

**Regel:** Jede Behauptung bekommt innerhalb von 2 Sätzen eine Zahl oder einen Namen. Zahl ohne Quelle bleibt draußen.

**Belege:**

`rec1uTXeqZGKfIVlb` / Dr. Matt Shiver:

> This one coach spent $423 on this low budget Instagram ad strategy and made $13,494.

`rec0GAPHVqcMbmj7u` / Neuhaus Digital:

> Headline: „Noch Kapazitäten frei? Für Bildungsträger: von 60% auf 95% Auslastung“.

`rec4RgEIepy8iSrKg` / Marc Evers:

> Webdesigner, ich bringe dich auf 30.000€ Monatsumsatz in den nächsten 3 Monaten, so wie hier, hier, hier oder hier.

### I3. Vergib STATIC an Statics und A1–A7 an Videos

**Zähl-Basis:** 380 von 383 Statics tragen `a_id=STATIC`. 328 von 328 Videos tragen A1 bis A7.

**Regel:** Eine Static bekommt STATIC. Ein Video bekommt eine A-ID. A-IDs gelten primär für Video.

**Ausnahme, 3 von 383:** Enpal-Statics `recWM7htnP5rO2Hdk`, `recXTSsDfCtNyqmZW`, `recoZQrWMrqyZV0Eo` tragen A6.

**Belege:**

`rec0GAPHVqcMbmj7u` / Neuhaus Digital / STATIC:

> Neuhaus-Digital-Anzeige mit jungem lockigem Mann im weißen Hemd. Headline: „Noch Kapazitäten frei? Für Bildungsträger: von 60% auf 95% Auslastung“.

`rec0cPviC7FjT8f8t` / Maximilian Saal / STATIC:

> Die größte Marketing-Lüge der Selbstständigkeit wurde Realität: Ein 99 % automatisiertes Business mit KI.

`rec0tZBHxVRQvBjBn` / SEOLabs / STATIC:

> Sehr schlichtes schwarzes Quadrat mit weißem, kreisförmigem SEOLabs-Logo in der Mitte.

### I4. Lass F? stehen, wenn Familie und Muster fehlen

**Zähl-Basis:** 234 von 711 Records tragen `f_id=F?`. Alle 234 haben ein leeres Hook-Familie-Feld. 204 haben zusätzlich keinen Hook-Text.

**Regel:** Setze F? wenn das Hook-Familie-Feld leer ist und kein F1–F13-Muster greift. Erfinde keine Familie.

**Belege:**

`rec0GAPHVqcMbmj7u` / Neuhaus Digital / F?:

> Headline: „Noch Kapazitäten frei? Für Bildungsträger: von 60% auf 95% Auslastung“. CTA „Video-Training sichern!“.

`rec0tZBHxVRQvBjBn` / SEOLabs / F?:

> Sehr schlichtes schwarzes Quadrat mit weißem, kreisförmigem SEOLabs-Logo in der Mitte.

`rec122MazcWWTvtOW` / Dr. Matt Shiver / F?:

> Overlay: „I’m looking for 5 online coaches who want to scale to $100k/mo in 2026 with paid ads. We’ll script, edit, and launch your ads in 14 days.“

---

## Manchmal-Regeln

### M1. Garantie in Satz 1

**Bedingung:** High-Ticket und eine einklagbare Risiko-Umkehr.

**Zähl-Basis:** 35 von 711 Records tragen F1.

**Regel:** Stell die Garantie in Satz 1. Liefere direkt danach den Proof, warum du sie trägst.

**Belege:**

`rec1DdladvtwlByM7` / Pascal Harting:

> Ich bringe dich garantiert in den nächsten 31 Tagen auf Platz 1 bei Google – oder du bezahlst mir keinen Cent

`rec4fEZavywqR2dpR` / Pascal Harting:

> Ich bringe dich in den nächsten 31 Tagen auf Platz 1 bei Google oder du bezahlst mir keinen Cent. So wie diesen, diesen und diesen Kunden von mir!

`rec64ay7LBnThz9MX` / Dr. Matt Shiver:

> I want to make your Facebook ads for you. And if they don't work, you simply won't pay.

### M2. Eintragen plus persönlicher Rückruf

**Bedingung:** Call-Funnel mit persönlichem Close.

**Zähl-Basis:** 53 von 711 Records tragen `cta_form=eintragen-rueckruf`. Davon 21 in agenturen-coaching, 13 in b2b-dienstleister, 13 in local-service-handwerk, 6 in uebertragbar.

**Regel:** Der CTA nennt Aktion, Ort und was in welcher Frist passiert.

**Belege:**

`rec2swcIR2LqdpIVS` / Marc Evers Marketing & Consulting:

> Trag dich ein, ich rufe dich in den nächsten 48h persönlich an

`recEVRHeML19flQza` / Pascal Harting:

> Trage dich unten ein für einen persönlichen Rückruf innerhalb von 48 Stunden

`rec4SpzSkEzdgjsj3` / SEOLabs:

> Klicke auf den Button, trag dich mit deiner E-Mail ein und sichere dir die kostenlose KI-Sichtbarkeitsanalyse

### M3. Siezen

**Bedingung:** Kaufpreis über 10.000 Euro und breite Zielgruppe mit älteren Käufern. Im Korpus fast nur Enpal.

**Zähl-Basis:** 17 von 711 Records tragen `anrede=sie`. Davon Enpal 10, Mario Müller 4, Dr. Matt Shiver 3.

**Regel:** Siezen nur unter dieser Bedingung. Innerhalb eines Skripts bleibt die Anrede gleich.

**Belege:**

`rec0lu32t2vpLbYnh` / Enpal:

> Hi, wir suchen Hausbesitzer in ganz Nordrhein-Westfalen, die Lust auf ein Solar-Komplettpaket für 0 Euro Anzahlung inklusive Montage haben.

`rec17U3mWcOXU4YCO` / Enpal:

> Sie heizen noch mit Gas oder Öl? Dann sucht Enpal genau Sie! Holen Sie sich Ihre Wärmepumpe für 0 € Anzahlung inklusive Montage.

`recNQfcqaatrShyBH` / Enpal:

> Warum hat eigentlich noch nicht jedes Haus in Deutschland eine Solaranlage auf dem Dach? Wie viel kostet so etwas?

### M4. Case-Stack A1

**Bedingung:** Video, High-Ticket und mindestens 2 benannte Cases.

**Zähl-Basis:** 61 von 711 Records tragen A1. 51 von 61 liegen in agenturen-coaching. P1-case-kette: 28 von 711, davon 27 in agenturen-coaching.

**Regel:** Bau Hook, benannten Mechanismus, 3 bis 4 Cases, Authority, dann den persönlichen CTA.

**Belege:**

`rec1uTXeqZGKfIVlb` / Dr. Matt Shiver:

> This is crazy. This one coach spent $423 on this low budget Instagram ad strategy and made $13,494.

`rec2swcIR2LqdpIVS` / Marc Evers Marketing & Consulting:

> Marketing-Agenturbetreiber über 10k pro Monat. Das hier ist das konkrete Setup, um mit 100 Euro Adspend pro Tag auf über 50 000 Euro Monatsumsatz zu kommen

`rec4L8AnwSoaizUMn` / Marc Evers Marketing & Consulting:

> Du bist Webdesigner und willst planbar neue Kunden über Ads gewinnen, ... sodass dein Kalender auch so aussieht?

---

## Markt-Regeln

### R1. agenturen-coaching: Callout plus Case

**Segment:** agenturen-coaching

**Zähl-Basis:** 327 von 711 Records. In diesem Segment: F2 100, F3 60, F11 33, F8 32, F1 19, A1 51.

**Regel:** Ruf die Nische im ersten Satz. Versprich eine Zahl mit Frist. Zeig Cases mit Namen.

**Belege:**

`rec4VbYDuFXq8FRXr` / Marc Evers Marketing & Consulting:

> Webdesigner, ich bringe dich auf 30.000€ Monatsumsatz in den nächsten 3 Monaten, so wie hier, hier, hier oder hier.

`rec1iktyZHnKXGeeS` / Speedscaling.de:

> Hier ist das 100-Millionen-Euro-Webinar-Skript von Speedscaling, das kannst du dir auf der nächsten Seite völlig kostenfrei herunterladen.

`rec1gRbe4WftrVuB2` / Charlie Morgan:

> Marketing agency owners, do you remember when you thought you'd be driving a Lamborghini by 25 years old? Instead, you're over here begging local businesses to pay your teeny tiny $500 a month retainer

### R2. local-service-handwerk: Kurz-Lead mit Ort und Offer

**Segment:** local-service-handwerk

**Zähl-Basis:** 133 von 711 Records. Enpal allein 59. A6 im Segment: 17. F2 27, F7 21, F8 16.

**Regel:** Nenn Ort oder Haus-Zustand in Satz 1. Pack das Offer in einen Satz. CTA rechnet die Reibung klein (2 Minuten, 0 Euro).

**Belege:**

`rec0lu32t2vpLbYnh` / Enpal:

> Hi, wir suchen Hausbesitzer in ganz Nordrhein-Westfalen, die Lust auf ein Solar-Komplettpaket für 0 Euro Anzahlung inklusive Montage haben.

`rec17U3mWcOXU4YCO` / Enpal:

> Sie heizen noch mit Gas oder Öl? Dann sucht Enpal genau Sie! Holen Sie sich Ihre Wärmepumpe für 0 € Anzahlung inklusive Montage. Jetzt hier klicken und in zwei Minuten herausfinden, ob Ihr Haus geeignet ist.

`rec85borzu19aW6Pz` / SEOLabs:

> Als Handwerksbetrieb musst du dir in 6 Monaten nie wieder Sorgen um Aufträge machen, wenn wir dich bei Google und ChatGPT auf die 1 gebracht haben.

### R3. b2b-dienstleister: Kurz-PAS plus Demo oder Garantie

**Segment:** b2b-dienstleister

**Zähl-Basis:** 211 von 711 Records. A2 im Segment: 74. F1 16, F10 6, F7 29. F? 128 (viele Statics ohne Hook-Feld).

**Regel:** Callout, Pain, ein Case, dann CTA. Demo (F10) wenn der Screen der Beweis ist. Garantie (F1) wenn du sie tragen kannst.

**Belege:**

`rec1DdladvtwlByM7` / Pascal Harting:

> Ich bringe dich garantiert in den nächsten 31 Tagen auf Platz 1 bei Google – oder du bezahlst mir keinen Cent –, indem ich deine Webseite mit meinem einzigartigen Suchflowsystem neu baue

`rec8jcwXTUhFXXziZ` / Finseo:

> Wie sichtbar ist dein Unternehmen eigentlich bei ChatGPT und kriegst du da auch schon Kunden? Gib mir 20 Sekunden, ich zeige dir Schritt für Schritt, wie du es rausfinden kannst.

`rec3uFofF8HKO3Zl9` / Neuhaus Digital:

> Wenn du als Bildungseinrichtung deine Teilnehmer oder Schüler rein über Empfehlungen oder deine Webseite generierst, dann pass jetzt gut auf.

### R4. uebertragbar: kein Extra-Default

**Segment:** uebertragbar

**Zähl-Basis:** 40 von 711 Records. F8 12, F2 10, F11 9, F3 6, F? 3.

**Regel:** Nimm die Immer-Regeln. Bau keinen Markt-Ton dazu. Orts-Platzhalter bleiben Platzhalter.

**Belege:**

`rec54yzQRHYZiCPKo` / ohne Brand:

> Du hast einen Betrieb hier in (Name der Stadt) oder der Umgebung und weisst genau, dass deine Website schon ordentlich in die Jahre gekommen ist?

`recWPUZfFvK6Ykkcg` / ohne Brand:

> Du bist Selbständiger oder Unternehmer hier aus (Name der Stadt) oder der Umgebung? Und deine aktuelle Website ist schon etwas in die Jahre gekommen?

`recF4aHD6BzyhC4jd` / Unklar:

> Niemand redet über diesen einen Schritt im Trading, der letztendlich der entscheidende ist, um profitabel zu werden.

---

## Streit-Hinweis (kein Sieger)

MAKE und der ads-Router testen neue Angles zuerst als Static.
Evers prüft ein Offer zuerst als Video und hängt Statics an den Open-VSL.

Die beiden Sätze bleiben nebeneinander stehen, bis Raphael den Geltungsbereich festlegt.

Belege: [SKILL.md](/root/raphael-skills/skills/eigene/ads/SKILL.md) Strategie-Regel. [Evers-Blueprint Zeile 259](/root/raphael-brain/raw/ads-quellen/2026-08-13-marc-evers-no-funnel-ads-blueprint.txt). [segment-map.md](/root/raphael-skills/skills/eigene/ads/references/segment-map.md).
