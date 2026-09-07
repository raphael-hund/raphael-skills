# Playbook: Geile Video-Ad-Skripte

Stand: 2026-08-11
Quelle: `korpus/referenz-ads.md` (711 Markt-Records aus der Meta Ad Library) plus die
Craft-Referenzen dieses Skills (`hook-formeln.md`, `skript-architekturen.md`,
`sprech-sprache.md`, `strategien-taktiken.md`).

Dieses Playbook ist **kundenneutral**. Es hält die Regeln, die im Markt messbar tragen.
Die Zahlen eines einzelnen Kontos gehören ins Kunden-Playbook
(`/root/clients/<slug>/ads/playbook-<slug>.md`), nicht hierher.

## 0. Wie dieses Playbook benutzt wird

Vor dem Schreiben, in dieser Reihenfolge:

1. **Winner des Kunden laden: falls vorhanden.** Existiert
   `/root/clients/<slug>/ads/korpus/eigene-ads.md`, die Top-Ads nach
   Spend × Hookrate bestimmen und die Winner-Basis notieren. Existiert ein Kunden-Playbook
   `playbook-<slug>.md`, dessen Instanz-Belege dazu lesen.
   **Kein eigener Korpus da** → reiner Markt-Referenz-Pfad, und das Winner-Basis-Feld sagt
   ehrlich „kein Performance-Datensatz". Nicht die Zahlen eines anderen Kunden borgen.
2. **Zwei Markt-Volltexte derselben Hook-Familie wörtlich lesen** aus
   `korpus/referenz-ads.md`. Wörtlich heißt: die echten Zeilen, nicht die Erinnerung daran.
3. **Body vom Winner clonen, wenn derselbe Funnel läuft.** Nur Angle/Hook-Variante ist neu.
   Ohne laufenden Winner: Architektur aus `skript-architekturen.md` (A1–A7) wählen.
4. **Verlierer-Muster (§2) und Anti-Muster aktiv meiden.**

### Metriken lesen (gilt für jedes Konto)

- Primär-Signale: **Hookrate % + Ausgaben gesamt + CTR %** im gleichen Zeitfenster.
- **Hookrate 0 bei relevantem Spend = Datenlücke, nicht Flop.** Alte Flights liefern das
  Feld oft nicht mehr. „Unbekannt" ist nicht „schlecht".
- **ROAS 0 bei Lead-Gen ≠ Flop.** Wo der Umsatz erst im Call entsteht, misst ROAS nichts.
  Dann über Spend-Kontinuität, CTR und qualitative Winner-Nähe entscheiden.
- Ein Signal allein entscheidet nie. Spend, der über Wochen gehalten wird, ist das
  ehrlichste Votum des Kontos.

## 1. Winner-Muster (Regeln)

Jede Regel unten hält im Markt-Korpus über mehrere Werbetreibende. Wo ein Konto eigene
Zahlen dazu hat, steht der **Instanz-Beleg im Kunden-Playbook**.

### W1: Garantie + ICP-Filter + Frist in Satz 1
- **Regel:** Hook = Callout (Umsatz-/ICP-Filter) + messbares Ergebnis + harte Frist +
  Risiko-Umkehr im **selben** Atemzug.
- **Warum:** Die Risiko-Umkehr ersetzt langen Vertrauensaufbau und filtert gleichzeitig.
- **Markt-Belege:** Pascal Harting „Ich bringe dich garantiert in den nächsten 31 Tagen auf
  Platz 1 bei Google – oder du bezahlst mir keinen Cent" (3× im selben Account gefahren);
  Marc Evers „Webdesigner aufgepasst! Ich bringe dir 5 neue Webdesign Kunden in den
  nächsten 60 Tagen: Garantiert oder du zahlst keinen Cent".
- **Instanz-Beleg im Kunden-Playbook.**
- **Anti-Muster:** Mission-Statement oder Story-Frame vor dem Filter.

### W2: Body vom Winner clonen — Offer/Mechanismus vor Story
- **Regel:** Bedient ein Winner denselben Funnel, kein neues Body-Skelett erfinden.
  Hook-Varianten ja, Aufbau (Offer + benanntes System + Case + CTA) fest.
- **Warum:** Der Body ist der Teil, der bereits gegen echtes Geld getestet ist. Neu ist
  nur das, was die Aufmerksamkeit holt.
- **Markt-Beleg:** Werbetreibende mit Hold fahren dieselbe Bauform über viele Flights und
  variieren nur den Opener (Harting 3× dieselbe Garantie-Formel).
- **Instanz-Beleg im Kunden-Playbook.**
- **Anti-Muster:** Storytime ohne Proof-Artefakt als „neues Konzept" gegen einen laufenden
  Winner stellen.

### W3: Lokaler Callout + echte Kulisse (Geo-UGC)
- **Regel:** Stadt/Region im Hook + erkennbarer Ort im Bild schlägt Studio und anonyme
  Agentur-Claims.
- **Warum:** Der Ort filtert und beweist gleichzeitig. Er ist Callout und Proof in einem.
- **Markt-Beleg:** Enpal „Hausbesitzer in NRW" als harter Geo-Callout.
- **Instanz-Beleg im Kunden-Playbook.**
- **Anti-Muster:** „Wir sind eine Agentur aus der Region" ohne Ort, ohne Gesicht, ohne
  Kulisse.

### W4: Proof-First mit benanntem Kunden + krummer Zahl
- **Regel:** Name + Rolle/Größe + messbares Ergebnis **vor** dem eigenen Pitch. Filmbar:
  Monitor, SERP, Dashboard im Bild.
- **Warum:** Der fremde Name trägt die Behauptung, die der eigene Name nicht tragen kann.
- **Markt-Beleg:** SEOLabs Proof-Hook „Schau mal, dieser Handwerksbetrieb hier ist auf Platz 1 bei Google und auf ChatGPT und erhält dadurch jeden Monat über 100 qualifizierte Anfragen alleine über seine Website."
- **Instanz-Beleg im Kunden-Playbook.**
- **Anti-Muster:** „zahlreiche Kunden vertrauen uns" ohne Name.

### W5: UGC Face-to-Camera + Karaoke-Untertitel durchgehend
- **Regel:** Talking-Head nah, Selfie-Perspektive, Untertitel unten durchgehend: nicht
  nur als Endcard.
- **Warum:** Der Feed läuft stumm. Ohne Caption stirbt der Hook vor dem ersten Wort.
- **Markt-Beleg:** Fast alle starken Ads der Shards fahren Wort-für-Wort-Karaoke-Captions
  (`skript-architekturen.md`, Anti-Muster 10).
- **Instanz-Beleg im Kunden-Playbook.**
- **Anti-Muster:** Musik-only + Text-on-Screen ohne gesprochenen Hook.

### W6: CTA = Aktion + Ort + was danach + Frist/Reibung
- **Regel:** Nicht „Jetzt klicken". Sondern: eintragen/Kommentar + was danach passiert +
  Zeit (24h/48h) + Reibung klein.
- **Warum:** Der Zuschauer klickt nicht auf ein Ziel, das er sich nicht vorstellen kann.
- **Markt-Belege:**
  - Pascal Harting `rec1DdladvtwlByM7` (ad_archive_id 1824244865210795): „trag dich jetzt
    unten ein, und ich ruf dich in den nächsten 48 Stunden persönlich an."
  - Marc Evers `rec2swcIR2LqdpIVS` (ad_archive_id 4035794803389226): CTA-Feld „Trag dich
    ein, ich rufe dich in den nächsten 48h persönlich an" + Skript-Schluss mit
    48-Stunden-Anruf.
- **Instanz-Beleg im Kunden-Playbook.**
- **Anti-Muster:** „Trag dich unter dem Video ein. Dann schauen wir, ob es passt." — ohne
  Frist, ohne Post-Click-Vorschau.

### W7: Qualifizierer mit Zahl im ersten Satz
- **Regel:** Der ICP-Filter enthält eine harte Zahl (Umsatz, Mitarbeiter, Region), nicht
  nur eine Berufsbezeichnung.
- **Warum:** Weiche Filter erzeugen billige Klicks und teure Leads.
- **Markt-Belege:** Enpal „Hausbesitzer in NRW"; Marc Evers „Andreas Pütter ist Webdesigner
  und macht mit Standard-Webdesign über 30.000 Euro Monatsumsatz".
- **Instanz-Beleg im Kunden-Playbook.**
- **Anti-Muster:** „Wenn du in irgendeiner Weise im Marketing unterwegs bist…"

## 2. Verlierer-Muster (meiden)

### L1: Throat-clearing / Story-Frame vor dem Claim
- **Regel:** Kein „Herzlich willkommen…", „In diesem Video zeige ich…", kein
  Geschichten-Anlauf vor dem Filter.
- **Belege:** `skript-architekturen.md` Anti-Muster 3 (Weichspüler-Eröffnung); starke
  Opener im Referenz-Korpus starten mit Callout, Proof oder Garantie, nie mit Meta-Ansage.

### L2: Behauptung ohne benannten Proof
- **Regel:** Superlative („gottlos", „beste", „Nr. 1") ohne Case-Name + Zahl = nicht shippen.
- **Belege:** `skript-architekturen.md` Anti-Muster 1 — Marc Evers REC 23 („gottlos
  dominieren, 50k, 10x ROAS") nennt nur Superlative, keinen Case; DatAds wiederholt
  Feature-Blöcke ohne einen einzigen Kundennamen.

### L3: Drei Paraphrasen desselben Hooks als „Varianten"
- **Regel:** ≥3 Hooks brauchen ≥2 verschiedene F-IDs (`hook-formeln.md`). Eine Paraphrase
  zählt nicht als Variante.
- **Belege:** `hook-formeln.md` Bau-Regel (Matrix Segment × Motivation × Familie); drei
  Hooks derselben Familie testen dieselbe Hypothese dreimal.

### L4: Body neu erfinden gegen einen laufenden High-Spend-Winner
- **Regel:** Gegen einen Body mit Spend-Hold kein illustratives Story-Skelett ohne
  ausgefülltes Winner-Basis-Feld.
- **Belege:** W2; Instanz-Beleg im Kunden-Playbook.

### L5: Fehlende Metrik als Flop lesen / ROAS = 0 als Killer
- **Regel:** Hookrate 0 bei altem High-Spend = Datenlücke. ROAS 0 bei Lead-Gen = normal.
  Entscheide über Spend-Kontinuität + CTR + qualitative Winner-Nähe.
- **Belege:** §0 „Metriken lesen"; Instanz-Beleg im Kunden-Playbook.

## 3. Referenz-Muster nach Hook-/Angle-Familie

Häufigkeit Hook-Familie im Markt-Korpus (Records mit Familie): Callout 98, Proof 77,
Curiosity 60, Outcome 49, Problem/Pain 45, Offer/Preis 45, Garantie 21, Nightmare 16.
Angle-Familien: Dream-Outcome 123, Pain 84, Mechanism 50, Social-Proof 37.

| Familie | Was der Hook tut | Typische Beat-Reihenfolge | Markt-Belege |
|---|---|---|---|
| **Callout-Hook** | Filtert Ort/Avatar in Sekunde 0 | Callout → Offer/Problem → Mechanism → CTA | Enpal „Wir suchen Hausbesitzer in Baden-Württemberg, die ein Solar-Komplettpaket für 0 € Anzahlung … haben wollen."; Marc Evers „Webdesigner aufgepasst!" |
| **Proof-Hook** | Beweis vor Pitch | Proof → Mechanism → Outcome → Offer → CTA | SEOLabs Handwerk Platz 1; Marc Evers „[Andreas Pütter] ist Webdesigner und macht mit Standard-Webdesign über 30.000 € Monatsumsatz" |
| **Garantie-Hook** | Risiko-Umkehr Satz 1 | Garantie → warum wir das können (Proof) → System → CTA | Pascal Harting 31 Tage Platz 1 oder 0 €; Charlie Morgan „if I don't get you 20 clients in 180 days, I will give you not only a full refund, but $5,000 in cash on top." |
| **Outcome-Hook** | Großes Ergebnis zuerst | Outcome → Benefit/Mechanism → CTA | Maximilian Saal „CLAUDE ERSETZT DEIN TEAM"; Speedscaling 100-Mio-Webinar-Skript (§ Offer-Hook) |
| **Problem-/Pain-Hook** | Schmerzfrage + visueller Gag | Pain-Frage → Offer → CTA (kurz) | Enpal „Sie heizen noch mit Gas oder Öl?"; Verlust-Story nur **nach** hartem Opener |
| **Curiosity-/Lehr-Hook** | Verspricht Mechanism-Reveal | Curiosity → Lehr-Payoff muss kommen | Marc Evers VID-0008 big-number-outcome; **verboten** ohne Payoff (Schneider-Anti-Muster) |
| **Offer-/Preis-Hook** | Geschenk/Preis in Satz 1 | Offer → Value-Stack → CTA | Speedscaling „Hier ist das 100 Millionen Euro Webinar-Skript von Speedscaling, das kannst du dir auf der nächsten Seite völlig kostenfrei herunterladen." |

**Angle-Priorität bestimmt der Kunde, nicht das Playbook.** Existiert ein eigener Korpus,
gewinnt die Reihenfolge, die im Konto misst (steht im Kunden-Playbook). Ohne eigenen
Korpus: die Familie wählen, die zum Awareness-Level und Funnel passt
(`skript-architekturen.md`, Awareness → Form-Routing).

## 4. Sprachmuster (Sprechtext) + Schnittstelle no-ai-slop

### Sprachregeln (Korpus-belegt)
1. **Du-Form, kurze Hauptsätze.** Winner sprechen wie eine Sprachnachricht, nicht wie eine
   Broschüre. Beleg: `sprech-sprache.md` R1; Enpal-Callout-Skript.
2. **Harte, möglichst krumme Zahl oder ein Name in Satz 1.** Beleg: `sprech-sprache.md` R4;
   SEOLabs „über 20"; Marc Evers „über 30.000 Euro".
3. **Kraftwort nur im Hook/Pain, CTA sachlich.** Beleg: `sprech-sprache.md` R2/R3; starke
   Referenz-CTAs kommen ohne Superlativ-Geschrei aus.
4. **Mechanismus braucht einen Eigennamen.** „Suchflow-System", „No-Funnel-Ads-Framework":
   nicht „unsere Lösung". Beleg: Pascal Harting „Suchflowsystem" im Referenz-Skript;
   `skript-architekturen.md` Messlatte Punkt 4.
5. **Kein Weichmacher-Cluster:** individuell, maßgeschneidert, ganzheitlich, auf Augenhöhe,
   innovativ. Beleg: `sprech-text-regeln.md` + no-ai-slop-Verbotsliste.

### no-ai-slop — Pflicht nach Entwurf
Jeder Sprechtext läuft durch `no-ai-slop` **Edit-Modus**. Häufige Ads-Slop-Muster:
- Throat-clearing / Faux-Insight / Colon-Enthüllung
- Binäre Kontraste („Es ist nicht X. Es ist Y.")
- Roboter-Rhythmus (gleiche Satzlänge gestapelt)
- Fake-profound Kicker am Ende
- Importance-Puffery

**Spoken-Ausnahme (nicht glätten):** echte Füllwörter, Selbstkorrekturen, Kraftwörter im
Hook. Siehe `sprech-sprache.md` R2/R3 und `sprech-text-regeln.md` § no-ai-slop.

## 5. Beat-Skelett der Gewinner (Fill-in-the-blank)

Abgeleitet aus den Garantie-, Proof- und Callout-Volltexten des Markt-Korpus; deckungsgleich
mit A1/A2/A6 in `skript-architekturen.md`.

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

**Fallback nur wenn <3 brauchbare Referenzen:** generisches 5-Beat aus
`beat-struktur-und-aufbau.md`, aber die Zeile „Wenn du [ICP] bist und [Outcome] willst,
brauchst du [Offer]" ist ein **Anti-Beispiel** (siehe `skript-architekturen.md`
Verbote).

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
11. Jede Zahl/Case im Skript grounded (Kunden-Dossier oder Kunden-Korpus)?
12. Laut-lesen-Test bestanden (Sprachnachricht, nicht Broschüre)?

---

## Korpus-Notizen (Ehrlichkeit)

- Markt-Referenz-Ads: 711 Records; 176 unvollständig/Notion-Lücke: **nur Volltext** für
  Phase-1-Zitate nutzen. `[UNVOLLSTÄNDIG. Nur in Notion]` ausschließen, nicht erfinden.
- Ein eigener Performance-Korpus ist optional und liegt beim Kunden:
  `/root/clients/<slug>/ads/korpus/eigene-ads.md`. Fehlt er, ist das kein Fehler:
  dann trägt der Markt-Pfad, und das Winner-Basis-Feld sagt es ehrlich.
- Drafts und Konzepte im Kundenordner sind Stil- und Dialekt-Referenz, **nicht**
  Beat-Skelett-Quelle. Skelett-Quelle = `winner` / `laufend` mit Performance oder klarem Flight.
- Refresh eines Kunden-Korpus:
  `KUNDE=<slug> bash /root/raphael-skills/skills/eigene/ads-video/scripts/export-airtable-korpus.sh`
  wenn der Korpus-Kopf >30 Tage alt ist.
