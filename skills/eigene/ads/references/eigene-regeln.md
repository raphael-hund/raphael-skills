---
title: "Messlatten-Framework — Methodik mit Referenzwerten aus einem echten Konto (Juli/Aug 2026)"
type: synthesis
confidence: high
status: approved
created: 2026-09-18
tags: [ads, kanon, kennzahlen, eigene-daten]
---

# Messlatten-Framework — Methodik mit Referenzwerten aus einem echten Konto (Juli/Aug 2026)

> **Geltungsbereich dieses Dokuments (geschärft 18.09.2026):** Dies ist eine **Referenz-Implementierung an einem echten Konto** (das Referenzkonto: 173 Anzeigen / 16.505 CHF / 26 Wochen, Juli/Aug 2026). Die **METHODIK ist der Kanon**; die konkreten CHF-Werte zeigen, wie eine eigene Baseline aussieht — sie sind **keine Vorgabe für andere Konten**. Kundenkonten bauen ihre eigene Baseline nach denselben Methoden. Kontointerne Betriebsdetails gehören nicht in den Skill (Chef 18.09.2026).
>
> Herkunft: alle Angaben stammen aus der eigenen Konto-Auswertung 07/2026–08/2026 (Rohakten am 18.09.2026 auf Chef-Direktive entfernt, siehe `purge-log.md`); Chef-Entscheide stehen in `konflikt-register.md`.

## 1. Metaregeln (gelten vor jeder einzelnen Zahl)

1. **Geltungsbereich-Pflicht je Zahl.** Jede Ads-Zahl trägt Zweck (Test/Scaling), Tagesbudget, Cold/Warm, Modell und Plattform — oder wird nicht zitiert. — Konto-Auswertung 07/2026
2. **Eigene Daten > Fremdwerte.** Ab 30 Tagen eigener Historie schlagen eigene Kontodaten jede Fremdzahl. Fremdregeln ohne Zählweise sind weder bestätig- noch widerlegbar. — Konto-Auswertung 07/2026
3. **Keine Zahl autorisiert eine Kontoänderung** (Mutation-Gate). Eine Kennzahl ist ein Befund, kein Handlungsbefehl. — Konto-Auswertung 07/2026
4. **Nenner bei jeder Quote mitschreiben.** Eine Kennzahl ohne Messdefinition ist keine (belegte Fehler: Quartil 292 vs. 321 CHF je nach Methode; Lead→Verkauf 14/94 vs. 14/149 verwechselt; Lag 22,5 vs. 19,5 Tage). — Konto-Auswertung 07/2026
5. **CTR = drei Kennzahlen** (CTR-all / Link-CTR / Unique Outbound). 157 von 176 Wiki-Nennungen ohne Zusatz; Werte 0,5–6 % sind Definitionsproblem, kein Widerspruch. CTR nie ohne Zusatz zitieren. — Konto-Auswertung 07/2026
6. **Was datentechnisch gewinnt, gewinnt — ansonsten ist Stil egal.** Stil-Debatten (Ton, Rohheit, Ästhetik) werden nicht geführt; die Daten entscheiden. — Entscheid Raphael 18.09.2026
7. **Auswertungs-Kadenz ist wöchentlich.** Ads werden immer nur wöchentlich ausgewertet; nie nach 48 h killen, nie nach einem guten Tag Budget erhöhen (3–5 Tage Ruhe). — Entscheid Raphael 18.09.2026
8. **Bauchgefühl ist erlaubt**, wenn es auf den wichtigen Daten basiert (Terminpreis, Abschlussquote). — Entscheid Raphael 18.09.2026

## 2. Das eigene Kennzahlen-Set (Referenzkonto-Baseline)

| Kennzahl | Wert | Geltungsbereich / Anmerkung | Quelle |
|---|---|---|---|
| **Hook-Rate-Schwelle** | **25 %** (3-Sek-Views/Impressionen) | Nur Video, nur `funnel_zweck=Lead`. <20 % → 15 % der Ads bringen Anfrage; ab 25 % → 59 %. Unter 25 %: Einstieg neu bauen, kein Budget nachschieben. Frühwarnung, keine Kill-Regel. Fremde 20-%-Schwelle liegt auf eigenem Median (18,9 %); fremde „40–50 %" erreicht keine eigene Anzeige (max 35,3 %). CPL 70 CHF (≥25 %) vs. 113–116 CHF (<25 %); ROAS 3,06 vs. 1,12 | Konto-Auswertung 07/2026 |
| **Hit-Rate** | **13 %** (streng 7 %) | Eigen, aus 173 Anzeigen. Fremd 5–15 % nicht prüfbar (Zählweise fehlt). **Eine Hit-Rate von ~10 % ist ok, wenn der Terminpreis stimmt (Entscheid Raphael 18.09.2026)** | Konto-Auswertung 07/2026; Entscheid Raphael 18.09.2026 |
| **Hit-Rate Planungswert** | **5 %** | Ohne eigene Daten mit 5 % planen, nie mit 20–33 %-Zielwerten einzelner Praktiker — wer damit plant, produziert 1/6 der nötigen Creatives | Konto-Auswertung 07/2026 |
| **Volumenrechnung** | 2 Winner/Monat ÷ 5 % = **40 neue Ads/Monat** | Konsequenz aus Planungswert 5 % | Konto-Auswertung 07/2026 |
| **Trefferquote ≥1 Lead** | **20 %** der Anzeigen (43/212) | 80 % aller Leads kommen von 14 Anzeigen (7 %) | Konto-Auswertung 07/2026 |
| **Trefferquote nach Format** | Video **26,4 %** vs. Static **14,9 %** | Trefferquote ≠ Effizienz je Treffer (s. Format-Urteil unten) | Konto-Auswertung 07/2026, Konto-Auswertung 08/2026 |
| **Terminpreis-Korridor** | **90–320 CHF, Median 158 CHF** | 26 eigene Wochen (14.899 CHF Spend, 94 Termine, 14 Verkäufe). KW31-Wert 318 CHF = oberer Rand, kein Alarm; KW32-Wert 487 CHF bei n=2 nicht belastbar. **Steuergrösse des Skills: Wir optimieren auf Termine, nicht auf Lead-Preis und nicht auf Kosten (Chef 18.09.2026); CPL ist Diagnosegrösse, nie Zielgrösse** | Konto-Auswertung 07/2026, `2026-07-31-ads-woche-2026-KW31`, `2026-08-03-ads-woche-2026-KW32` |
| **Lead→Termin** | **63 %** | Eigene 26-Wochen-Baseline | Konto-Auswertung 07/2026 |
| **Termin→Verkauf** | reif (≥42 Tage) **27,0 %** vs. Stichtag **14,9 %** | Kein Widerspruch: Reifeeffekt (Faktor ~2). Für Planung/CPL gilt 27,0 %; für Signal-Stärke (Meta-Rückmeldung) 14,9 % — Kontext mitnehmen | Konto-Auswertung 07/2026, Konto-Auswertung 08/2026 |
| **Lag Lead→Abschluss** | Median **22,5 Tage** (max 58) | Abschlussquote nach Kohorten-Alter: <3 Wochen 3,6 %, 3–6 Wochen 10,3 %, >6 Wochen 27,0 % (Faktor 7,5). **Reife für ein Urteil: ~3 Wochen, bei langem Sales-Cycle bis 6 Wochen; ohne Verkäufe kein Urteil (Entscheid Raphael 18.09.2026).** ROAS erst nach 6–8 Wochen lesen | Konto-Auswertung 07/2026, Konto-Auswertung 08/2026; Entscheid Raphael 18.09.2026 |
| **Erlaubter CPL** | **= Deckungsbeitrag je Auftrag × Lead→Verkauf-Rate** | Nulllinie; **Ziel-CPL = 50 % davon**. Nie vom Umsatz rechnen (überschätzt um Faktor 1/Marge; bei 30 % Marge = 3,3×). Bei 60 % Marge: erlaubter CPL 192 CHF; bei 31,2 %: Break-even 100 CHF; bei 25 %: jeder Lead Verlust. Nur eine Rate annehmen, die andere messen. Erlaubter Terminpreis = DB × Termin→Verkauf-Rate | Konto-Auswertung 07/2026 |
| **Ist-CPL / Konto-CPL** | Ist **42 CHF**; Konto-Schnitt **93 CHF**/Anfrage; Anzeigen-Mittel 61 CHF | Anzeigen-Mittel < Konto-Schnitt, weil 80 % der Anzeigen keine Anfrage bringen | Konto-Auswertung 07/2026 |
| **Frequenz-Band (Cold)** | 2,0–2,5 = Diagnose-Band · ab 2,5 Creative tauschen als Richtwert · >3,0 faktisch Retargeting | **Frequenz ist nur eine Diagnosegrösse — Entscheidungen laufen nie über die Frequenz, sondern nur über den Terminpreis (Entscheid Raphael 18.09.2026, schliesst K4).** Retargeting: Alarm erst ~10. Fremde „<1,5" ist Elite-Zielwert, keine Reißleine | Konto-Auswertung 07/2026, Konto-Auswertung 08/2026; Entscheid Raphael 18.09.2026 |
| **Skalierung** | Schritt **20–30 %**, nur bei stabilem Ergebnis; **Entscheid wöchentlich** (Entscheid Raphael 18.09.2026, schliesst K3) | Nie nach einem einzelnen guten Tag erhöhen — 3–5 Tage abwarten (Veto 69). Fremd-Streit 5–30 % vs. 50–200 % erledigt durch Kadenz-Entscheid | Konto-Auswertung 07/2026; Entscheid Raphael 18.09.2026 |
| **Testwelle** | **1 volle Kalenderwoche** Mindestlaufzeit ohne Eingriff | Täglicher Delivery-Check nur auf „spendet die Ad?"; Sofort-Kill nur bei Null-Spend/Ablehnung. Nie neue Ads in laufende Adsets nachschieben | Konto-Auswertung 07/2026 |
| **Creatives je Test-Ad-Set** | **3–5** bei Referenzkonto-Budget (~230 CHF/Woche, Beispiel aus dem Referenzkonto, keine Vorgabe) | Fremde „Minimum 15" bekäme je <3 CHF/Tag = nicht auswertbar. Kanon-Korridor allgemein: 3–10 Ads je Ad-Set (10–20 je Konzept-Test, Meta-Grenze 50) | Konto-Auswertung 07/2026, Streit-/Disput-Akte, s. `konflikt-register.md` |
| **Spend-Messschwellen** | unter **30 CHF** Spend/Ad sagt ein Nullergebnis nichts; ab **100 CHF** aussagekräftig | Einzige belastbare Regel aus der Filterketten-Analyse | Konto-Auswertung 08/2026 |
| **Datenmengen-Check** | <1.000 Impressionen/Ad oder <50 Klicks/Ad-Set = Rauschen → „warten" | Vor jeder Diagnose | Konto-Auswertung 07/2026 |
| **Attribution-Lücke** | nur **12,9 %** der Abschlüsse (82 von 637 CRM-Vorgängen) tragen Anzeigen-Kennung | → Anzeigen nur nach Preis je Anfrage + Hook-Rate bewerten, nie nach Umsatz/ROAS; Wirtschaftlichkeit nur auf Kontoebene | Konto-Auswertung 07/2026 |
| **Format-Urteil Video vs. Static** | Roh: Video CPL 39 < Static 59 CHF; **gefiltert: Statics 55,30 CHF günstiger als Videos 85,30 CHF** je Lead | Je Creative mit Lead: Median 77 vs. 72 CHF, p=0,84 → **kein Format-Beweis**; Unterschied steckt in Trefferquote + 3,7× Spend-Aussteuerung. Rohzahlen verzerrt durch 10 Recruiting-Creatives (213 Leads zu 0,36 CHF) + Kleinstbudgets. Hook-Rate nie formatübergreifend (Statics = 0 % per Definition) | Konto-Auswertung 08/2026, Streit-/Disput-Akte, s. `konflikt-register.md` |

## 3. Diagnose-Baum (Entscheidungs-SOP)

**Sechs Glieder:** Ausspielung → Aufmerksamkeit → Klick → Formular → Termin → Abschluss.

- **Steuergrösse = Preis je Termin, nicht CPL (Chef 18.09.2026).** Wir optimieren auf Termine. Der Korridor aus dem Referenzkonto ist 90–320 CHF je Termin (Median 158 CHF, Kapitel 2). CPL ist **Diagnosegrösse, nie Zielgrösse** — er hilft beim Lokalisieren der Bruchstelle, entscheidet aber nie über Ads.

- **Erste-Bruchstelle-Regel:** Repariert wird das erste brechende Glied, nie mehrere gleichzeitig. — Konto-Auswertung 07/2026
- **Von hinten lesen:** Steuerung läuft rückwärts (Verkauf → Termin → Lead → Klick → Impression); erst CPA/ROAS, dann CTR/CPM. Jede vermutete Ursache mit einer Zahl nachprüfen, dann nur eine Sache ändern. — Konto-Auswertung 07/2026
- **Datenmengen-Check zuerst:** <1.000 Impressionen/Ad oder <50 Klicks/Ad-Set = Rauschen → Maßnahme „warten". Spend-Messschwellen 30/100 CHF beachten (Kapitel 2). — Konto-Auswertung 07/2026, Konto-Auswertung 08/2026
- **Abschaltkriterien:** Link-CTR unter dem halben Kontoschnitt **oder** 1,5× Lead-Preis ohne Lead → **Diagnose-Frühwarnung, kein automatischer Kill**: die Ad wird markiert und in der wöchentlichen Auswertung geprüft; über Abschalten/Pausieren entscheidet allein der Terminpreis (Steuergrösse, Chef 18.09.2026), CPL/CTR bleiben Diagnosegrössen. Frequenz >2,5 Cold → Creative tauschen als Richtwert — aber Frequenz ist nur Diagnose; entschieden wird über den Terminpreis (Entscheid Raphael 18.09.2026). — Konto-Auswertung 07/2026; Entscheid Raphael 18.09.2026 (CPL-Kill zu Frühwarnung entschärft)
- **Glied 5 und 6 (Termin/Abschluss) sind Prozess, nie Werbekonto.** Bricht die Kette dort, wird nicht die Anzeige geändert, sondern der Vertriebsprozess (s. Kapitel 4). — Konto-Auswertung 07/2026

## 4. Prozess vor Creative

Bevor über Anzeigen, Hooks oder Formate geredet wird, wird die Kontaktquote geprüft.

- **Reaktionszeit: so schnell wie möglich, am selben Tag.** — Entscheid Raphael 18.09.2026
- **Wer zurückruft: der Kunde selbst.** Der Rest des Vertriebsprozesses (Nachfass-Staffeln, Kapazität, Prüf-Rhythmen) ist nicht Skill-Thema. — Entscheid Raphael 18.09.2026

Messmethodik, die weiter gilt (Framework-Form): Reife-Filter vor jeder Quoten-Bewertung (junger Kohorten-Abschluss unterschätzt); Nullfall-Filter-Verbot (vor Gruppenvergleichen zählen, wie viele Fälle der Filter je Gruppe entfernt); Attribution-Deckel (keine Umsatz-Bewertung je Einzel-Ad — Bewertung im Gesamtbestand, s. Kap. 2 und 6).

## 5. Qualifizierung nach vorn

> **Chef-Korrektur (18.09.2026):** Qualifizierung nach vorn ist ein **Werkzeug, kein Gesetz** — Disqualifizieren ist optional, nicht Pflicht. Default: lieber alle mitnehmen und routen, die ein echtes Bedürfnis haben (z.B. <10k-Umsatz → Website-Offer, gute eigene Erfahrung damit). Die Befunde unten (34 % Preis-Verluste) bleiben der Beleg, WANN das Werkzeug greift — nicht die Pflicht, es immer zu nutzen.

- **34 % der Verluste sind Preis/Budget** (mind. 28 von 83 verlorenen Deals); 16 % nie erreicht; 46 % Freitext ohne Kategorie → Rangfolge der Verlustursachen formal unbekannt, „34 % scheitern am Preis" ist Interpretation mit Beleg-Richtung. — Konto-Auswertung 07/2026
- **Preis-/Budget-Qualifizierung gehört in Ad und Formular**, nicht ins Erstgespräch. Gewinner-Muster: Ad mit Qualifier „ab 100.000 Jahresumsatz" erreichte **53 % Lead→Termin** (Kontoschnitt 63 % bei unqualifiziertem Volumen — der Qualifier filtert vor dem Lead, nicht danach). 8 der 10 Gewinner-Anzeigen nennen Ort oder Garantie im Einstieg. — Konto-Auswertung 07/2026
- **Garantie-Ads: Entscheidungsmetrik = Lead-Qualität, nicht CPL.** Ob die Ad gut ist, entscheidet die Qualität der Leads, nicht ihr Preis. ~~Die Garantie-Anzeige weckt eine Erwartung, die Anti-ICP-Typ G („unhaltbare Garantie als Kaufbedingung") disqualifiziert~~ — **aufgehoben per Chef-Entscheid 18.09.2026: Garantie-Ads sind absolut möglich, der Anti-ICP-Einwand ist gelöscht.** Streit entschieden (K7, 18.09.2026, Raphael) → `konflikt-register.md`. — Streit-/Disput-Akte, s. `konflikt-register.md` (Historie)
- **Instant Forms: phasenabhängig** (aufgelöst, K10, Neufassung Chef 18.09.2026): <20–30k €/Monat + unvalidiertes Angebot → ja; validierter High-Ticket-Funnel → nein. ~~ja, mit 2 Filterfragen~~ **Filterfragen sind ein optionales Werkzeug, keine Pflicht — Default ist routen statt wegfiltern** (Chef-Korrektur Kap. 5 Kopf; ausführlich in `teil-strategie.md` «Landingpage oder Lead-Formular»). Wo Filter bewusst eingesetzt werden: Qualifizierungsfragen + bewusste Friction + getrennte Danke-Seiten mit eigenem Qualified-Event, tiefe Events per CAPI nachsenden. — Konto-Auswertung 08/2026; Entscheid Raphael 18.09.2026

## 6. Winner-Definition

- **„Winner = unter Ziel-CPL über ≥7 Tage" ist eine Haus-Definition, kein Gesetz (Entscheid Raphael 18.09.2026).** Entscheidend sind **Terminpreis und Abschlussquote im Gesamtbestand**, nicht die Einzel-Ad und nicht der CPL. Es braucht keine starren Winner-Definitionen — bewertet wird gesamt. Reife für ein Urteil: ~3 Wochen, bei langem Sales-Cycle bis 6 Wochen; **keine Verkäufe → kein Urteil**.
- **Nie undefinierte Prozente zitieren.** „Winner" stand 134× in 36 Seiten ohne eine Definition; vier plausible Definitionen am eigenen Konto ergeben Trefferquoten 57 % / 35 % / 24 % / 19 % — **Faktor 3 allein durch Definitionswahl** (über alle 212 Anzeigen: 20/14/9/8 %). Wer „Winner-Rate" sagt, nennt die Bewertungsbasis (Terminpreis/Abschlussquote im Bestand) oder schweigt. — Konto-Auswertung 07/2026; geschärft Entscheid Raphael 18.09.2026

---

*Randnotiz:* Die Meta-Rückmeldung (CAPI-Kaskade Lead → qualifizierter Lead → Call → Kauf) gehört zum Kanon dazu: Aktuell lernt Meta nur von Formular-Ausfüllern (9,4 % werden Kunden); bei ~128 CHF/Tag und 22,5 Tagen Lag ist „Kauf" als Event zu dünn — richtige Stufe heute: Termin/qualifizierter Lead. Gate: Rechtsgrundlage + Raphael-Freigabe. — Konto-Auswertung 07/2026
