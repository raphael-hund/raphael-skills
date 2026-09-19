---
title: "Die Awareness-Stufe bestimmt den Hook: Cold verkauft das Offer, Retargeting zeigt nur Proof"
type: swipe
confidence: medium
status: approved
created: 2026-07-20
tags: [awareness, funnel, retargeting, cold, hooks, offer, proof, referenz-ads]
---

# Die Awareness-Stufe bestimmt den Hook: Cold verkauft das Offer, Retargeting zeigt nur Proof

## TLDR

Kalte Ads erklären das ganze Angebot, warme Ads zeigen nur noch Beweise, dass es wirklich klappt.

## Regeln

- Konzept-Erzeugung nach dieser Zuordnung läuft über `2026-07-20-static-ad-konzept-prinzipien.md` (Konzept = Persona × Angle × Offer).
- Je höher die Awareness, desto weniger Erklärung und desto mehr Proof: problem-aware Ads führen mit Problem Hook und Curiosity Hook (25 von 41 Records), solution-aware Ads mit Offer Hook (25 von 84), most-/product-aware Ads fast nur mit Proof Hook (13 von 20); die Awareness-Stufe bestimmt damit auch, ob eine Kampagne als Testing oder Scaling angelegt wird (siehe [[2026-07-20-testing-vs-scaling-kampagnenstruktur]]).
- Cold-Ads (120 Records) tragen das komplette Offer in der Ad: Call-Out Hook (30) oder Offer Hook (20), dazu Preisfrage oder Garantie, CTA direkt auf Lead-Strecke; 116 von 120 sind Static Ads.
- Retargeting-Ads (20 Records) pitchen kein neues Offer: 15 von 20 nutzen einen Proof Hook, das "Offer"-Feld enthält nur Ergebnis-Aussagen ("6 Erstgespräche in 3 Tagen"), 13 von 20 sind WhatsApp-Chat-Screenshots als Creative, alle 20 sind Static Ads.
- Problem-aware Ansprache benennt den Schmerz als Frage, ohne Mechanismus vorauszusetzen; das Offer ist niedrigschwellig (Gratis-Check, Gratis-Video), Angle-Familie Pain dominiert (28 von 41).
- Solution-aware Ansprache setzt die Lösung als bekannt voraus und beantwortet die Preis- oder Anbieterfrage; Angle-Familie Dream-Outcome dominiert (47 von 84).
- Most-/product-aware Ansprache nennt Produkt, Preis oder zeigt Kundenresultate; sie verkauft die Entscheidung, nicht die Lösung (Angle Dream-Outcome 17 von 20).
- MOFU-Ads (16 Records) verlinken auf Gratis-Content statt aufs Offer (YouTube-Video, Lead-Magnet); Hook-Familien Proof und Curiosity.
- Webinar-Ads (12 Records, alle Video) nutzen Curiosity Hook (7) oder Nightmare Hook (3) und bieten immer ein kostenloses Training als Offer.

## Taktiken

- Cold-Ad bauen: Call-Out im ersten Satz (Rolle plus Filter), dann Offer mit Zahl und Frist, dann Garantie, dann Proof-Einblendung, CTA auf Lead-Strecke — die Referenzen stapeln alles in eine Ad.
- Preisfrage als Cold-Static testen: "Was kostet X bei mir?" ist die meistwiederholte Cold-Formel im Datensatz (14 nahezu identische Statics einer Brand) — Bedarfsfrage plus sofortiges Liefer-Versprechen, null Reibung.
- Retargeting-Ad bauen: ein einziges echtes Artefakt pro Ad (Chat-Screenshot, voller Kalender, Ranking-Dashboard), eine Zahl, kein CTA-Druck, kein neues Versprechen — die Ad erinnert, sie argumentiert nicht.
- Retargeting-Serie statt Einzel-Ad: die Referenz fährt 14 Varianten desselben Proof-Formats mit je anderem Kundenresultat; Volumen ersetzt Argumentation.
- Die Kalt/Warm-Zuordnung steuert die Kampagnen-Architektur bzw. den Funnel (siehe `../strategie/2026-07-20-testing-vs-scaling-kampagnenstruktur.md`).
- Für das Referenzkonto (ICP ist solution aware): Cold mit Offer Hook oder Guarantee Hook fahren — "neue Webseite + Platz 1 bei Google in 30 Tagen, Garantie" komplett in der Ad aussprechen, Call-Out mit Mitarbeiter-Filter davor; siehe die eigenen Video-Ad-Skripte und den Wunschkunde-Entwurf des Referenzkontos (Konto-Auswertung 07/2026).
- Für das Referenzkonto Retargeting getrennt bauen: reine Proof-Statics ohne Offer-Wiederholung — Vorher/Nachher-Ranking (Platz 20+ zu Platz 1), Kunden-Chat-Nachricht mit Anfragen-Zahl, Google-Search-Console-Screenshot; ein Beweis pro Ad, mehrere Varianten.
- Sprachmuster für beide Stufen aus den eigenen Ad-Sprachmustern des Referenzkontos (Konto-Auswertung 07/2026) übernehmen; Hook-Familien-Definitionen liegen kanonisch in wiki/craft/hooks/.

## Beispiele

- Problem-aware Cold (Enpal, Video): Problem-Frage "Sie heizen noch mit Gas oder Öl?" plus niedrigschwelliges Offer "Wärmepumpe für 0 € Anzahlung, kostenloser 2-Minuten-Haus-Check" — Schmerz zuerst, Mechanismus egal (raw/evidence/2026-07-20-airtable-ads-snapshot/referenz-ads.jsonl:11).
- Problem-aware MOFU (Marc Evers): Content-Ad verlinkt nicht aufs Offer, sondern auf ein kostenloses YouTube-Video mit "Zwischenstand aus 54 skalierten Webdesignern" (referenz-ads.jsonl:52, referenz-ads.jsonl:82).
- Solution-aware Cold (Mario Müller, Static): Offer Hook "Was kostet eine Website bei mir?" plus Offer "Gerne erstelle ich dir eine Website oder Onlineshop" — die Lösung Website ist bekannt, die Ad beantwortet nur die Preisfrage (referenz-ads.jsonl:32, referenz-ads.jsonl:70).
- Solution-aware Cold (Marc Evers, Video): Outcome-Zahl plus kompletter Mechanismus plus Kundenbeispiel in einer Ad: "30.000 Euro Monatsumsatz in 3 Monaten über das No-Funnel-Ads-Framework, ohne Kaltakquise" (referenz-ads.jsonl:38); Schwester-Ad mit Garantie "5 Neukunden in 60 Tagen oder du zahlst 0 Euro" (referenz-ads.jsonl:36).
- Most-aware Retargeting (Marc Evers, Static): WhatsApp-Chat-Screenshot als einziges Creative, Proof Hook "Von 3k Monatsumsatz beim Start auf 15k geknackt, nach 3 Wochen mit der neuen Ad" — kein Offer, kein Mechanismus (referenz-ads.jsonl:179, referenz-ads.jsonl:269).
- Retargeting mit Pain-Einstieg: Pain-Frage plus Kalender-Beweis "6 Erstgespräche in 3 Tagen, allein durch 50 Euro Daily Werbung" (referenz-ads.jsonl:237).
- Webinar (TradingFreaks, Video): Curiosity Hook "Kontraintuitive Warnung 'Vorsicht vor ETFs'" plus Offer "kostenloses 60-minütiges Trader Training" (referenz-ads.jsonl:344, referenz-ads.jsonl:122).

## Gilt nicht wenn

- Das Offer selbst der Proof ist (Preisfrage-Statics): dort verschwimmt die Trennung, weil das Cold-Creative bereits ein echtes Arbeits-Artefakt zeigt.
- Kein warmes Publikum existiert: Retargeting-Proof-Statics ohne vorherige Cold-Reichweite laufen ins Leere.
- Das ICP unaware ist: dann greift keine der drei Stufen-Formeln; im Datensatz nur 2 Records (Recruiting-Kontext).
- Wörtliche Copy oder Markenlook übernommen werden soll — Rechte-Regel: fremde Referenzen nur strukturell abstrahieren.

## Datenlücken

- awareness_level ist nur bei 200 von 610 Records gefüllt, funnel_type nur bei 308; die Verteilungen gelten für die indexierten Teilmengen, nicht den Gesamtbestand.
- Die Retargeting-Stichprobe (20) besteht zu 14 Records aus einer einzigen Brand (Marc Evers) — das Proof-Static-Muster ist dort validiert, aber brandlastig.
- Die Felder tragen keine Performance-Daten; ob Retargeting-Proof-Statics besser konvertieren als Offer-Wiederholung, ist aus diesem Datensatz nicht belegbar (confidence: medium).
- Awareness-Labels sind uneinheitlich vergeben (58 Schreibvarianten, teils Mischstufen); die Zählung beruht auf Normalisierung.
- funnel_type "cold=120" enthält zusätzlich 103 Records mit beschreibenden Landingpage-/Lead-Strecken-Werten, die faktisch meist Cold-Traffic sind; die Cold-Zahl ist eher unter- als überschätzt.

## Quelle

- raw/evidence/2026-07-20-airtable-ads-snapshot/referenz-ads.jsonl:11
- raw/evidence/2026-07-20-airtable-ads-snapshot/referenz-ads.jsonl:32
- raw/evidence/2026-07-20-airtable-ads-snapshot/referenz-ads.jsonl:36
- raw/evidence/2026-07-20-airtable-ads-snapshot/referenz-ads.jsonl:38
- raw/evidence/2026-07-20-airtable-ads-snapshot/referenz-ads.jsonl:52
- raw/evidence/2026-07-20-airtable-ads-snapshot/referenz-ads.jsonl:70
- raw/evidence/2026-07-20-airtable-ads-snapshot/referenz-ads.jsonl:82
- raw/evidence/2026-07-20-airtable-ads-snapshot/referenz-ads.jsonl:122
- raw/evidence/2026-07-20-airtable-ads-snapshot/referenz-ads.jsonl:179
- raw/evidence/2026-07-20-airtable-ads-snapshot/referenz-ads.jsonl:237
- raw/evidence/2026-07-20-airtable-ads-snapshot/referenz-ads.jsonl:269
- raw/evidence/2026-07-20-airtable-ads-snapshot/referenz-ads.jsonl:344
