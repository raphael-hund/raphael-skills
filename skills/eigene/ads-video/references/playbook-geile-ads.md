# Playbook: Geile Video-Ad-Skripte

Stand: 2026-08-11  
Quellen: `korpus/eigene-ads.md` (224), `korpus/referenz-ads.md` (711)  
Export-Basis: Airtable `app9VvWqeSNAOwwmV` · Tabellen Ads + Referenz-Ads

## 0. Wie dieses Playbook benutzt wird

Vor dem Schreiben: (1) Top-Winner der eigenen Ads nach Spend×Hookrate laden,  
(2) 2 Volltexte derselben Hook-Familie aus dem Referenz-Korpus wörtlich lesen,  
(3) Body vom Winner clonen, nur Angle/Hook-Variante neu,  
(4) Verlierer-Muster und Anti-Muster unten aktiv meiden.  
ROAS 14T ist im MAKE-Export oft 0 (Lead-Gen) — **nicht** als Flop-Signal missbrauchen.  
Primär-Signale: Hookrate % 14T + Ausgaben gesamt + CTR % 14T.  
Fehlende Metrik (Hookrate 0 bei altem High-Spend) = „unbekannt", nicht „schlecht".

## 1. Winner-Muster aus eigenen Ads (Performance-belegt)

### W1: Garantie + ICP-Filter + Frist in Satz 1
- **Regel:** Hook = Callout (Umsatz-/ICP-Filter) + messbares Ergebnis + harte Frist + Risiko-Umkehr im **selben** Atemzug.
- **Warum:** Höchste gemessene Hookrates im Konto bei relevantem Spend.
- **Belege:**
  - `24.06. · Video · CH | PLATZ-1 SEO` — Hookrate **31,85 %**, Ausgaben **2.337 CHF**, CTR 1,36 %  
    Hook: „Betriebe ab 100'000 Franken Jahresumsatz aufgepasst, wir bringen dich in den naechsten 30 Tagen bei Google auf Platz 1 oder du bezahlst keinen einzigen Rappen."
  - `06.07. · Video · CH | PLATZ-1 SEO` — Hookrate **28,11 %**, Ausgaben **1.732 CHF**  
    (gleiche Formel, zweiter Flight)
- **Anti-Muster:** Mission-Statement oder Story-Frame vor dem Filter („Es Gschichtli…", „Dominic vo MAKE. Mir bauet…").

### W2: Body vom Winner clonen — Offer/Mechanismus vor Story
- **Regel:** Wenn ein Winner denselben Funnel bedient, kein neues Body-Skelett erfinden. Hook-Varianten ja, Aufbau (Seite + Sichtbarkeitssystem + Case + CTA-Geschenk) fest.
- **Warum:** Beide PLATZ-1-SEO-Flights teilen denselben Body und dominieren Spend+Hold.
- **Belege:** `24.06.…PLATZ-1 SEO` + `06.07.…PLATZ-1 SEO` (identischer Aufbau-Block im Korpus-Skript).
- **Anti-Muster:** Storytime ohne Proof-Artefakt als „neues Konzept" gegen laufenden Winner.

### W3: Lokaler Callout + echte Kulisse (Geo-UGC)
- **Regel:** Stadt/Region im Hook + erkennbarer Ort im Bild (Münster, Skyline) schlägt Studio/anonyme Agentur-Claims.
- **Warum:** Stabile Hookrates 15–29 % bei 200–800 CHF Spend.
- **Belege:**
  - `26.06. · Video · BROAD ZÜRICH | JUN26` — Hookrate **28,73 %**, Spend 570 — Angle „Webdesign direkt aus Zürich"
  - `24.04. · Video · CAM BASEL | MARC EVERS` — Hookrate **28,03 %**, Spend 514 — „Basler Münster" + Teaser
  - `24.04. · Video · CAM BASEL | MARC EVERS` — Hookrate **23,37 %**, Spend 813 — „Webdesign direkt aus Basel"
- **Anti-Muster:** „Wir sind eine Agentur aus der Schweiz" ohne Ort, ohne Gesicht, ohne Kulisse.

### W4: Proof-First mit benanntem Kunden + krummer Zahl
- **Regel:** Name + Rolle/Größe + messbares Ergebnis **vor** dem eigenen Pitch. Filmbar: Monitor/SERP im Bild.
- **Warum:** Proof-Variante hält bei Spend ≥350 und öffnet den Case-Stack.
- **Belege:**
  - `03.08. · Video · CH | PLATZ-1 SEO` — Hookrate **15,03 %**, Spend 351  
    „Wir haben diese Webseite gebaut… AlpenEnergie… über 50 Mitarbeitern… 64 Anfragen ohne Werbung in 3 Monaten" (Korpus-Skript)
  - Referenz `SEOLabs` Proof-Hook: „Schau mal, wir haben diesen Handwerksbetrieb hier auf Platz 1… über 20 qualifizierte…"
- **Anti-Muster:** „zahlreiche Kunden vertrauen uns" ohne Name.

### W5: UGC Face-to-Camera + Karaoke-Untertitel durchgehend
- **Regel:** Talking-Head nah, Selfie-Perspektive, Untertitel unten durchgehend — nicht nur Endcard.
- **Warum:** Alle gemessenen Video-Winner im Korpus sind UGC/Talking-Head mit Caption-Overlay; reine Visuals ohne Wort verlieren den Mute-Scroll.
- **Belege:** CAM BASEL Marc-Evers-Flights (Hookrate 15–28 %) + ZÜRICH JUN26 (28,73 %) — Korpus beschreibt jeweils Untertitel-Overlay / UGC-Stil.
- **Anti-Muster:** Musik-only + Text-on-Screen ohne gesprochenen Hook.

### W6: CTA = Aktion + Ort + was danach + Frist/Reibung
- **Regel:** Nicht „Jetzt klicken". Sondern: eintragen/Kommentar + was passiert + Zeit (24h/48h) + Reibung klein.
- **Warum:** Account-übergreifendes Winner-Muster in Referenz + MAKE-Offer-First-Rewrite.
- **Belege:**
  - `Pascal Harting` `rec1DdladvtwlByM7` (ad_archive_id 1824244865210795): „trag dich jetzt unten ein, und ich ruf dich in den nächsten 48 Stunden persönlich an."
  - `Marc Evers Marketing & Consulting` `rec2swcIR2LqdpIVS` (ad_archive_id 4035794803389226): CTA-Feld „Trag dich ein, ich rufe dich in den nächsten 48h persönlich an" + Skript-Schluss mit 48-Stunden-Anruf.
  - MAKE Top-Spender-Rewrite (nicht nur Korpus-Thumbnail): „Trag dich hier unten ein… kostenlosen Sichtbarkeits-Check… in 24 Stunden… Entwurf" — `/root/clients/client-make/ads/skripte/2026-08-05-SKRIPT-top-spender-seo-offer-first.md`; Korpus-Winner-IDs derselben Familie: `recGXs9DVhe1nbDvv` (24.06. PLATZ-1), `rec1zsx2QWdBsPgdb` (06.07. PLATZ-1).
- **Anti-Muster:** „Träg di under em Video ii. Denn luegemer, öb's passt." ohne Frist und ohne Post-Click-Vorschau.

### W7: Qualifizierer mit Zahl im ersten Satz
- **Regel:** ICP-Filter enthält eine harte Zahl (Umsatz, Mitarbeiter, Region), nicht nur Berufsbezeichnung.
- **Warum:** Top-Hookrate-Ads filtern mit „ab 100'000 Jahresumsatz"; weiche Filter erzeugen teure Klicks.
- **Belege:** PLATZ-1 SEO 24.06 + 06.07 (100k-Filter); Referenz Callout Enpal „Hausbesitzer in NRW".
- **Anti-Muster:** „Wenn du in irgendeiner Weise im Marketing unterwegs bist…"

## 2. Verlierer-Muster (meiden)

### L1: Throat-clearing / Story-Frame vor dem Claim
- **Regel:** Kein „Es Gschichtli…", „Herzlich willkommen…", „In diesem Video zeige ich…".
- **Belege:** Anti-Muster in `skript-architekturen.md` (Weichspüler-Eröffnung); Storytime-FINAL-Hook „Es Gschichtli. Truurig…" vs. Winner-Hook mit 100k+Garantie.
- **Belege-2:** Referenz-Korpus starke Opener starten mit Callout/Proof/Garantie, nicht mit Meta-Ansage.

### L2: Behauptung ohne benannten Proof
- **Regel:** Superlative („gottlos", „beste", „Nr. 1") ohne Case-Name + Zahl = nicht shippen.
- **Belege:** `skript-architekturen.md` Anti-Muster 1 (Marc Evers REC ohne Case vs. mit Proof); DatAds Feature-Wiederholung ohne Kundennamen.
- **Belege-2:** Eigene Winner brauchen AlpenEnergie / SERP / 64 Anfragen — nicht „wir sind gut".

### L3: Drei Paraphrasen desselben Hooks als „Varianten"
- **Regel:** ≥3 Hooks brauchen ≥2 verschiedene F-IDs (siehe hook-formeln.md). Paraphrase zählt nicht.
- **Belege:** Grok-Root-Cause D7 an Storytime (3× Verlust-Familie) + v3 (nur 2 Alternativen).
- **Belege-2:** hook-formeln.md Bau-Regel: Matrix Segment × Motivation × Familie.

### L4: Body neu erfinden gegen laufenden High-Spend-Winner
- **Regel:** Gegen PLATZ-1-SEO-Body (2k+ Spend, 28–32 % Hookrate) kein illustratives Story-Skelett ohne Winner-Basis-Feld.
- **Belege:** Spend-Dominanz der PLATZ-1-Flights vs. Storytime/v3 ohne Performance-Bezug.
- **Belege-2:** Top-Spender-Rewrite `2026-08-05-SKRIPT-top-spender-seo-offer-first.md` zeigt den richtigen Pfad manuell — Skill muss ihn erzwingen.

### L5: Fehlende Metrik als Flop lesen / ROAS=0 als Killer
- **Regel:** Hookrate 0,0 bei altem High-Spend = Datenlücke. ROAS 0 bei Lead-Gen = normal. Entscheide über Spend-Kontinuität + CTR + qualitative Winner-Nähe.
- **Belege:** Korpus: viele Marc-Evers-Flights mit Spend 300–1200 und Hookrate 0,0; ROAS 14T flächig 0.
- **Belege-2:** Plan-Evidenz + dieses Playbook §0.

## 3. Referenz-Muster nach Hook-/Angle-Familie

Häufigkeit Hook-Familie im Korpus (Records mit Familie): Callout 98, Proof 77, Curiosity 60, Outcome 49, Problem/Pain 45, Offer/Preis 45, Garantie 21, Nightmare 16.  
Angle-Familien: Dream-Outcome 123, Pain 84, Mechanism 50, Social-Proof 37.

| Familie | Was der Hook tut | Typische Beat-Reihenfolge | 2 Belege |
|---|---|---|---|
| **Callout-Hook** | Filtert Ort/Avatar in Sekunde 0 | Callout → Offer/Problem → Mechanism → CTA | Enpal „Hausbesitzer in NRW… Solar-Komplettpaket 0 €"; MAKE Zürich/Basel Geo-UGC |
| **Proof-Hook** | Beweis vor Pitch | Proof → Mechanism → Outcome → Offer → CTA | SEOLabs Handwerk Platz 1; MAKE AlpenEnergie Monitor-Schwenk |
| **Garantie-Hook** | Risiko-Umkehr Satz 1 | Garantie → warum wir das können (Proof) → System → CTA | Pascal Harting 31 Tage Platz 1 oder 0 €; MAKE PLATZ-1 30 Tage / 0 Rappen |
| **Outcome-Hook** | Großes Ergebnis zuerst | Outcome → Benefit/Mechanism → CTA | Maximilian Saal „CLAUDE ERSETZT DEIN TEAM…"; Speedscaling 100-Mio-Skript |
| **Problem-/Pain-Hook** | Schmerzfrage + visueller Gag | Pain-Frage → Offer → CTA (kurz) | Enpal „Sie heizen noch mit Gas oder Öl?"; Storytime-Verlust nur **nach** hartem Opener erlaubt |
| **Curiosity-/Lehr-Hook** | Verspricht Mechanism-Reveal | Curiosity → Lehr-Payoff muss kommen | Marc Evers VID-0008 big-number-outcome; **verboten** ohne Payoff (Schneider-Anti-Muster) |
| **Offer-/Preis-Hook** | Geschenk/Preis in Satz 1 | Offer → Value-Stack → CTA | Speedscaling „100-Millionen-Euro-Webinar-Skript… kostenfrei" |

**Angle-Priorität für MAKE-Video (aus eigenen Winners):** Guarantee/Offer-first → Local/Personal → Proof/Case → erst dann Story/Pain-explainer.

## 4. Sprachmuster (Sprechtext) + Schnittstelle no-ai-slop

### Sprachregeln (Korpus-belegt)
1. **Du-Form, kurze Hauptsätze.** Winner sprechen wie Sprachnachricht, nicht wie Broschüre.  
   Belege: PLATZ-1-Hook (eine Atem-Linie); Enpal Callout-Skript.
2. **Harte, möglichst krumme Zahl oder Name in Satz 1.**  
   Belege: 100'000 / 30 Tage / 0 Rappen; AlpenEnergie / 64 Anfragen; SEOLabs „über 20".
3. **Kraftwort nur im Hook/Pain, CTA sachlich.**  
   Belege: sprech-sprache.md R2/R3 + Winner-CTAs ohne Superlativ-Geschrei.
4. **Mechanismus braucht Eigennamen.** „Sichtbarkeitssystem", „Suchflow-System" — nicht „unsere Lösung".  
   Belege: PLATZ-1 Aufbau-Block; Pascal Harting „Suchflowsystem" im Referenz-Skript.
5. **Kein Weichmacher-Cluster:** individuell, massgeschneidert, ganzheitlich, auf Augenhöhe, innovativ.  
   Belege: sprech-text-regeln.md + no-ai-slop Verbotsliste.

### no-ai-slop — Pflicht nach Entwurf
Jeder Sprechtext läuft durch `no-ai-slop` **Edit-Modus**. Häufige Ads-Slop-Muster:
- Throat-clearing / Faux-Insight / Colon-Enthüllung
- Binäre Kontraste („Es ist nicht X. Es ist Y.")
- Roboter-Rhythmus (gleiche Satzlänge gestapelt)
- Fake-profound Kicker am Ende
- Importance-Puffery

**Spoken-Ausnahme (nicht glätten):** echte Füllwörter, Selbstkorrekturen, Kraftwörter im Hook — siehe `sprech-sprache.md` R2/R3 und `sprech-text-regeln.md` § no-ai-slop.

## 5. Beat-Skelett der Gewinner (Fill-in-the-blank)

Abgeleitet aus PLATZ-1-SEO-Winners + Referenz Garantie/Proof/Callout-Volltexten:

```
[HOOK / F-ID: ___ ]
[ICP-Callout mit Zahl] + [Outcome + Frist] + [Risiko-Umkehr ODER Proof-Name]
Erste 12 Wörter hart. Kein Throat-clearing.

[ON-RAMP 3–15s]
Ein Satz Brücke Hook → Body (warum das jetzt / was du gleich siehst).

[MECHANISMUS]
Benanntes System (Eigenname) in 1–2 Sätzen. Kein Feature-Katalog.

[PROOF früh]
1 benannter Case: Name + von X auf Y in Z + filmbares Artefakt (SERP/Monitor/Overlay).

[PROOF spät / Aggregat]
Menge oder Authority („>N Betriebe", „in Region …").

[OFFER]
Was der Zuschauer bekommt, unmittelbar vor CTA (Check / Entwurf / Call).

[CTA]
Aktion + Ort (unten / Link / Kommentar-Wort) + was danach + Zeitrahmen + Reibung klein.
Optional: 1 Satz Neg-Quali bei High-Ticket.

[HOOK-VARIANTEN ≥3, ≥2 F-IDs]
Je Variante: F-ID | erste 12 Wörter | Zahl/Name | On-Ramp-Satz | Caption-Job | Visual-Job
```

**Fallback nur wenn <3 Winner-Referenzen:** generisches 5-Beat aus `beat-struktur-und-aufbau.md` — aber die Zeile „Wenn du [ICP] bist und [Outcome] willst, brauchst du [Offer]" ist **Anti-Beispiel**, keine Vorlage (siehe skript-architekturen Verbote).

## 6. Checkliste vor Ship (max 12, ja/nein)

1. Winner-Basis genannt (Ad-Name/ID + Hookrate/Spend) oder ehrlich „kein Performance-Datensatz"?
2. F-ID + A-ID benannt und 2 Belegzeilen derselben Bauform gelesen?
3. Erste 12 Wörter = Callout|Proof|Garantie|Outcome|Pain (kein Throat-clearing)?
4. Zahl oder Name im Hook?
5. Mechanismus-Eigenname gesetzt?
6. Proof früh (Case) + Proof spät/Aggregat + 1 filmbarer Proof-Beat?
7. CTA = Aktion + Ort + Danach + Zeit/Reibung?
8. ≥3 Hook-Varianten, ≥2 F-IDs, je On-Ramp (keine Paraphrasen-Triplette)?
9. Onscreen-Caption ≠ wortgleich VO geplant?
10. no-ai-slop Edit-Pass dokumentiert (Was geändert / keine Muster)?
11. Jede Zahl/Case im Skript grounded (Dossier oder Winner-Korpus)?
12. Laut-lesen-Test bestanden (Sprachnachricht, nicht Broschüre)?

---

## Korpus-Notizen (Ehrlichkeit)

- Eigene Ads: 224 Records; 3 als unvollständig markiert.
- Referenz-Ads: 711 Records; 176 unvollständig/Notion-Lücke — **nur Volltext** für Phase-1-Zitate nutzen.
- Gemessene Winner-Menge mit Hookrate≥15 und Spend≥150: **8 Ads** (Stand Export 2026-08-11) — kleine, aber klare Cluster (Garantie-SEO + Geo-UGC + Proof).
- Refresh: `bash /root/raphael-skills/skills/eigene/ads-video/scripts/export-airtable-korpus.sh` wenn Korpus >30 Tage alt.
