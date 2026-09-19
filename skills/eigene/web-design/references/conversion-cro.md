# Conversion & CRO: Das Optimierungs-Modul

Conversion ist kein Anstrich, sondern ein System aus Diagnose, Evidenz und
typgerechter Architektur. Diese Datei ergänzt sektionen-und-funnels.md (die die
Struktur/Dramaturgie liefert) um den Optimierungs-Prozess, die psychologischen
Hebel mit Studienlage, das Multi-Step-Formular-Handwerk und die Playbooks pro
Website-Typ.

Erste Regel: **"Conversion" bedeutet je nach Website-Typ etwas Fundamental
anderes** (Geld vs. Termin vs. Anruf vs. E-Mail vs. Registrierung). Benchmarks
sind niemals typ-übergreifend vergleichbar. Deshalb steht die Typ-Diagnose an
Position 1, vor jedem Hebel.

Inhalt: 1 Typ-Diagnose (Pflicht, vor allem anderen) · 2 Der CRO-Prozess ·
3 Universelle Hebel mit Zahlen · 4 Conversion-Psychologie ·
5 Multi-Step-Formulare & Funnel-Handwerk · 6 Typ-Playbooks ·
7 Checkout-Spezifika (E-Commerce) · 8 Testing-Disziplin ·
9 Messung & Benchmarks · 10 Ehrlichkeits-Regeln für Conversion-Zahlen

---

## 1. Typ-Diagnose (Pflicht, vor allem anderen)

Bevor eine einzige Conversion-Entscheidung fällt, wird der Website-Typ
festgelegt und in der DESIGN.md dokumentiert. Der Typ bestimmt: Primär-CTA,
Friction-Strategie, Trust-Quelle, Benchmark, Messpunkte.

| Typ | Primär-CTA | Conversion-Währung | Trust-Quelle | Friction | Benchmark (grob) | Verborgener 2. Schritt |
|---|---|---|---|---|---|---|
| **SaaS/Software** | Trial / Demo | Zeit (Testen) | G2/Capterra, Logos, SOC2 | minimal (außer bewusstes opt-out) | LP-Median 3,8 %; Visitor→Trial opt-in 7–9 % | Trial→Paid (Median 18,5 %) |
| **E-Commerce** | Add to Cart | Geld sofort | Reviews, Retoure, Zahlarten | minimal | CR 2,5–3 %; Add-to-Cart ~6 % | AOV, Retourenrate |
| **Lokaler Dienstleister** | Anruf (dann Formular) | Offline-Vertrauen | Google-Bewertungen, Team, Referenzen | minimal (Anruf!) | Website→Lead 2,5–5 % | Reaktionszeit (<5 min = 8–10×) |
| **Agentur/B2B High-Ticket** | Call buchen | qualifizierte Zeit | Case Studies mit Zahlen | absichtlich erhöht (Filter) | 2–5 %, Show-up 55–72 % | Termin→Auftrag (15–35 %) |
| **Content/Newsletter** | E-Mail-Signup | Identität | Content-Qualität, Lead-Magnet | 1 Feld | Popup 3–4 %, Top 10 % >9 % | Nurture→Abo/Kauf |
| **Event/Webinar/Kurs** | Registrieren | Zeitpunkt | Instructor-Proof | 1–2 Felder | Reg-Seite 20–40 % | Show-up (Ø 57 %) |

**Jeder Typ hat einen verborgenen zweiten Funnel-Schritt**, der oft mehr Hebel
bietet als die Seite selbst: SaaS lebt an Trial→Paid, E-Commerce an AOV, der
Dienstleister an der Reaktionszeit nach der Anfrage, die Agentur und das Event
an der Show-up-Rate. Wer nur die Seite optimiert, optimiert die halbe Gleichung.

Mischtypen (z. B. Agentur mit Shop) bekommen pro Surface einen eigenen Typ-Eintrag.

## 2. Der CRO-Prozess (Research schlägt Bauchgefühl)

Testing ist nur ~30 % der Arbeit; 70 % sind Research und Analyse (CXL-Methodik).
Der Loop: Research → Hypothese → Priorisieren → Testen → Lernen → Iterieren.

### 2.1 ResearchXL: die sechs Research-Säulen (triangulieren, nie eine allein)

1. **Technical Analysis**: Cross-Browser/-Device-Bugs, Core Web Vitals, JS-Fehler,
   kaputte Formulare, Tracking-Health (misst Analytics überhaupt richtig?).
2. **Heuristic Analysis**: Key Pages entlang Relevancy, Clarity, Value, Friction,
   Distraction prüfen. Liefert Verdachtsmomente, keine Wahrheiten.
3. **Analytics**: WO sind die Probleme: Funnel-Drop-offs, Exit-Rates, Segmente
   (Device, Quelle, Geo), Site-Search-Queries.
4. **Mouse Tracking**: Click-Maps (Klicks auf Nicht-Klickbares?), Scroll-Maps,
   Session Recordings (Rage Clicks, Zögern), Form-Analytics (welches Feld tötet?).
5. **Qualitativ**: WARUM: On-Site-Umfragen ("Was hat dich fast abgehalten?"),
   Kundeninterviews, Chat-Logs, Support-Tickets, Sales-Call-Mitschnitte. Die
   wiederkehrenden Einwände daraus werden FAQ und Copy.
6. **User Testing**: 5–10 Zielgruppen-User lösen die Conversion-Aufgabe laut denkend.

Ergebnis-Sortierung in drei Eimer: **Implement** (kaputt/offensichtlich: einfach
fixen, nicht testen) · **Investigate** (Problem weiter eingrenzen) · **Test**
(datengestützte Hypothese).

### 2.2 Hypothesen-Format (Pflicht)

*IF we [Änderung] THEN [Metrik] will [Richtung] by [Schätzung] BECAUSE [Befund
aus Research].* Eine Änderung ohne BECAUSE ist keine Hypothese, sondern Dekoration.

### 2.3 Priorisierung

- **PIE**: Potential × Importance × Ease (je 1–10). Gut für den Einstieg.
- **ICE**: Impact × Confidence × Ease. Confidence nur aus Daten, nie aus Meinung.
- **PXL** (CXL): binäre Ja/Nein-Fragen statt Gefühlsskalen: Above the fold? In 5 s
  wahrnehmbar? Element hinzugefügt/entfernt (statt modifiziert)? Durch User-Tests/
  Research/Analytics/Heatmaps gestützt? High-Traffic-Page? Idee ohne Belege kann
  nicht hoch scoren.
- Reihenfolge-Heuristik: erst Fix-Bugs, dann Speed, dann Klarheit (Value
  Proposition/Headline), dann Friction (Formular), dann Persuasion (Proof, CTA).

## 3. Universelle Hebel mit Zahlen

Gilt typ-übergreifend. Einordnung der Evidenz in Klammern; Einzelfälle und
Vendor-Daten sind keine Gesetze (§10).

### 3.1 Speed zuerst (härtester belegter Hebel)

- E-Commerce-CVR: 1 s Ladezeit 3,05 % vs. 4 s Ladezeit 0,67 % (Portent 2022).
- +0,1 s mobil: +8,4 % CVR, +9,2 % AOV (Google/Deloitte "Milliseconds Make Millions").
- Bounce-Wahrscheinlichkeit: 1 s→3 s +32 %, 1 s→5 s +90 % (Google/SOASTA).
- 53 % der Mobile-User brechen über 3 s ab (Google).
- Regel: **>3 s Ladezeit → Speed fixen vor jeder anderen Optimierung.** Ziele:
  LCP < 2,5 s, INP < 200 ms, CLS < 0,1.

### 3.2 Klarheit in 5 Sekunden

- Ein Fremder muss in 5 Sekunden beantworten: Was ist es? Für wen? Was tue ich
  als Nächstes? Die Mehrheit der SaaS-Pages scheitert daran (CXL-Tests).
- Spezifische, ausführlichere Value Propositions werden schneller erfasst und
  besser erinnert als kurze vage. Clarity beats cleverness.
- Erster Eindruck: ~50 ms (Lindgaard et al. 2006). Copy auf 5.–7.-Klasse-Niveau
  konvertiert 11,1 % vs. 5,3 % bei College-Niveau (Unbounce).
- Fold-Realität (NN/g 2018): 57 % der Betrachtungszeit above the fold, 74 % in
  den ersten zwei Screenfuls. Der Fold ist ein Filter, keine Wand: der erste
  Viewport verkauft die nächste Scroll-Bewegung, Beweise dürfen darunter liegen.

### 3.3 Attention Ratio 1:1

- Attention Ratio = interaktive Elemente : Kampagnenziele. Landing = 1:1
  (Oli Gardner). Unbounce über 18.639 Pages: ein CTA 13,5 % CVR, zwei CTAs
  11,9 %, drei+ 10,5 %.
- Konsequenz: Landing-Pages ohne Hauptnav; Paid Traffic nie auf die Homepage;
  ein Label pro Intent sitewide (gilt schon in sektionen-und-funnels.md §3).

### 3.4 Message Match

- Headline/Bildwelt der Landing spiegelt die Anzeige, die den Klick brachte
  (Unbounce). Senkt Bounce, hebt den Google-Ads-Quality-Score (günstigere CPCs).
  Pro Ad Group idealerweise eine dedizierte Landing.

### 3.5 Formular-Länge

- 11→4 Felder: +120 % (Imagescape-Case, Einzelfall). 4→3 Felder: fast +50 %
  (Zarrella/HubSpot, 40.000 Pages). Optimum ~3 Felder (~25 % CVR in der Analyse).
- Jedes Feld muss seine Existenz rechtfertigen ("Wofür brauchen wir das JETZT?").
  Telefon nur mit Reassurance-Mikrotext. Textareas und Dropdowns bremsen
  stärker als Textfelder.

### 3.6 Social Proof (stärkster Vertrauens-Hebel)

- Reviews zeigen: bis +270 % Conversion; der größte Sprung ist 0→5 Reviews
  (Spiegel Research Center, 111.460 Produkte). Hochpreisig +380 %.
- Optimum 4,2–4,7 Sterne; 5,0 konvertiert ~8 % schlechter (wirkt gefälscht).
  Einzelne negative Reviews unter vielen positiven erhöhen Vertrauen.
- Platzierung: Sterne + Anzahl direkt am Titel/CTA; Proof an jedem Friction
  Point (nach Hero, vor CTA, beim Preis), nie als ein Block vorm Footer.

### 3.7 Risk Reversal

- Garantie-Sprache: +26 % in dokumentierten Cases (Conversion Fanatics);
  längere Garantie (90 Tage→1 Jahr) verdoppelte dort Conversion bei nur +3
  Prozentpunkten Refunds. Spezifisch formulieren: "30 Tage volle
  Rückerstattung ohne Fragen" > "Zufriedenheitsgarantie".
- Stufenleiter schwach→stark: vage Zufriedenheit → Geld-zurück mit Bedingungen
  → No-Questions-Refund → Trial vor Zahlung → Pay-for-Results.

### 3.8 Preis-Framing & Transparenz

- Anchoring: teuerste Option zuerst/Streichpreis setzt die Referenz. Decoy:
  3 Tiers, das mittlere als Empfehlung markieren.
- Pennies-a-day: "1 € pro Tag" statt "365 €/Jahr". Preis gegen die Kosten des
  Nicht-Handelns rechnen.
- Transparenz-Trade-off (HockeyStack, 31 Mio. Besucher): versteckte Preise
  erzeugen mehr Leads (4,6 % vs. 2,8 %), aber schlechtere Qualität; transparente
  Preise qualifizieren vor. Bei Custom-Preisen: "ab"-Preise oder Beispielrechnung,
  nie komplett schweigen. 48 % der B2B-Käufer nennen Preistransparenz als
  Top-Auswahlkriterium.
- Keine Überraschungskosten: 39–48 % der Cart-Abbrüche wegen später Zusatzkosten
  (Baymard). Gesamtpreis inkl. Versand/Steuer vor dem letzten Schritt.

### 3.9 Video, Live-Chat, Exit-Intent (zweite Reihe, bewusst dosiert)

- Video: Demo-/Erklärvideo kann stark heben (bis +80 % in vielzitierten Cases,
  Einzelfälle); Autoplay aus, Untertitel, nie als Ersatz für Text-Value-Prop.
- Live-Chat: Chat-Nutzer konvertieren 2,8× (Forrester), ABER nur ~4 % der
  Besucher öffnen Chat überhaupt. Die Antworten auf die 5 häufigsten Fragen
  gehören auf die Seite selbst (hilft 100 %); Chat-Logs sind primär ein
  Research-Instrument.
- Exit-Intent: Ø 3,9 % CVR, bei Cart-Abbruch bis 17 % (Vendor-Daten). Nur als
  letztes Netz, nie als Ersatz für eine funktionierende Seite; Rabatt-Popups
  konditionieren Schnäppchenjäger. Mobile ohne Cursor: Scroll-/Zeit-Trigger.

---

## 4. Conversion-Psychologie (evidenzbasiert, mit Design-Konsequenz)

- **Fogg B=MAP**: Behavior = Motivation × Ability × Prompt, alle drei gleichzeitig.
  Billigster Hebel ist fast immer Ability (weniger Felder, Klicks, Denkarbeit),
  nicht mehr Motivation. Der CTA (Prompt) feuert nur, wenn M und A reichen.
- **System 1/System 2** (Kahneman): ~95 % der Web-Entscheidungen laufen intuitiv.
  Sobald System 2 (Analyse) nötig wird, steigt der Abbruch. Design-Regel:
  Entscheidungen System-1-tauglich machen (vertraute Muster, ein CTA, klare
  Hierarchie, Cognitive-Load-Checkliste aus review-qa.md §3).
- **Cialdini**: Reciprocity (Lead Magnet vorab), Commitment/Consistency (kleine
  Ja's kaskadieren: Fundament der Multi-Step-Funnels), Social Proof, Authority
  (Siegel, Medienlogos), Liking (echte Gesichter statt Stock), Scarcity (nur
  echt, §10), Unity (geteilte Identität: "für Handwerker, von Handwerkern").
- **Loss Aversion**: Verluste wiegen ~2–2,25× schwerer als Gewinne (Prospect
  Theory). Copy-Hebel: "Keine Kunden an langsame Websites verlieren" schlägt
  "mehr Kunden gewinnen"; Trial-Ende als Verlust framen.
- **Anchoring & Decoy**: die erste Zahl verzerrt alle folgenden Urteile
  (Tversky/Kahneman 1974). Premium-Tier zuerst zeigen macht das Mittel-Tier
  attraktiv; 3 Tiers mit markiertem Mittel-Tier = Compromise Effect.
- **Choice Overload (mit Vorbehalt)**: Jam-Study (Iyengar/Lepper 2000): 24
  Sorten 3 % Kauf vs. 6 Sorten 30 % Kauf. ABER Meta-Analyse (Scheibehenne 2010,
  63 Studien): mittlerer Effekt nahe null, stark kontextabhängig. Regel: bei
  homogenen, schwer unterscheidbaren Optionen Auswahl radikal reduzieren +
  eine Empfehlung markieren; bei klar differenzierten Optionen darf Auswahl groß sein.
- **Endowed Progress** (Nunes/Drèze 2006, JCR): 10-Stempel-Karte mit 2 Bonus-
  Stempeln 34 % Completion vs. 8-Stempel-Karte 19 % bei identischem Aufwand.
  Regel: Progress nie bei 0 % starten, Schritt 1 trivial, der Vorsprung braucht
  einen plausiblen Grund.
- **Goal-Gradient**: Motivation steigt mit Zielnähe (Hull 1932; Kivetz 2006).
  Progress-Indikatoren, "nur noch ein Schritt", Profil-Balken.
- **Peak-End-Rule**: Erlebnisse werden nach Höhepunkt und Ende bewertet
  (Kahneman 1993). Die Thank-You-Page und ein einzelner Frust-Peak (Fehler,
  Überraschungskosten) dominieren die Erinnerung an den ganzen Funnel.
- **Scarcity/Urgency**: wirkt über Reactance + Loss Aversion, ABER nur mit
  wahrem Grund (echte Plätze, echte Deadlines). Fake-Countdowns und erfundene
  Verfügbarkeit sind in der EU rechtlich angreifbar (Omnibus-Richtlinie, UWG)
  und zerstören Vertrauen dauerhaft (§10).

## 5. Multi-Step-Formulare & Funnel-Handwerk

Der stärkste dokumentierte Conversion-Hebel im Lead-Bereich. Grundregeln aus
sektionen-und-funnels.md §4 gelten; hier steht das vollständige Handwerk.

### 5.1 Wann Multi-Step, wann Single-Step

| Befund | Zahl | Einordnung |
|---|---|---|
| BrokerNotes (quiz-artiger Funnel) | 11 % → 46 % | Einzelfall, ikonisch |
| Venture Harbour (Consulting) | 0,96 % → 8,1 % (+743 %, 5 Jahre) | Einzelfall |
| Formstack-Analyse | 13,85 % vs. 4,53 % Single-Page | Sekundärquelle |
| Instapage A/B-Test (25.500+ Sessions/Variante) | +18 bis +21 % | sauber dokumentierter Test |
| Typeform-Plattformdaten (1 Frage/Screen) | 47,3 % vs. 21,5 % Completion | Vendor-Daten |

- **Faustregel**: ≤5 Felder und hohe Intent (Checkout, Demo, Newsletter) →
  Single-Step. 6+ Felder, sensible Fragen (Budget, Telefon), Mobile-lastig,
  Qualifizierung nötig → Multi-Step. Kurze Formulare auf Multi-Step aufzublähen
  ERZEUGT Friction.
- **Warum es wirkt**: Endowed Progress + Goal-Gradient (sichtbarer Fortschritt
  früh) + Commitment (nach Schritt 1 fühlt sich Abbruch wie Verlust an) +
  Chunking (kognitive Last pro Screen klein) + Kontaktdaten erst am Ende, wenn
  der User investiert ist.

### 5.2 Architektur (Reihenfolge ist der Hebel)

1. **Einstieg trivial und engagierend**: Auswahlfrage mit Kacheln, keine
   Freitextfelder, keine E-Mail. ("Wofür interessieren Sie sich?")
2. **K.O.-Kriterien früh**: "Sind Sie Eigentümer?" spart beiden Seiten Zeit
   (Solar-Pattern).
3. **Inhaltliche Fragen mittig**, aufsteigende Sensibilität; Nutzen-Framing bei
   heiklen Fragen ("PLZ: damit wir die regionalen Sonnenstunden prüfen").
4. **Kontaktdaten zuletzt**: E-Mail/Telefon erst, wenn das Ergebnis lockt
   ("Wohin dürfen wir Ihre Potenzialanalyse schicken?").
5. **Schritte**: Sweet Spot 2–4; ab 5 steigt Ermüdung. "Schritt 1 von 9" ist
   schlechter als kein Indikator. Mehr Inhalt → Conditional Logic statt mehr Schritte.
6. **Pro Schritt**: 1 Frage (Typeform-Stil, bester Mobile-Flow) oder 2–4
   thematisch geclusterte Felder. Nie >4 Felder pro Schritt.
7. **Kacheln/Radio-Cards statt Dropdowns**: 2–6 Optionen → Kacheln (2,5 s
   schneller, CXL-Test n=708), 7+ → Dropdown, 15+ → Suche/Autocomplete.
   Bild-Kacheln (Dachformen mit Foto) senken Fehlinterpretation.
8. **Auto-Advance** nur bei exklusiver Auswahl (Klick = Antwort + Weiter), nie
   bei Freitext/Multi-Select; Zurück immer möglich.
9. **Progress**: benannte Steps ("Ihr Projekt → Ihre Daten → Termin") schlagen
   Prozent-Balken, weil sie die E-Mail-Frage ankündigen und Angst nehmen.
10. **Zurück-Navigation mit State** (nie Daten wipen), Auto-Save pro Schritt
    (ermöglicht Partial-Entry-Capture).
11. **Review-Screen vor Submit** ("Alles richtig?") senkt Nachfehler und baut
    Vertrauen (LukeW-Klassiker).
12. **Funnel-Seiten ablenkungsfrei**: keine Hauptnav, Trust-Elemente (Volltext-
    Rezensionen) unter dem Funnel als Einwandbehandlung während des Ausfüllens.

### 5.3 Felder-Design (die Mechanik, die entscheidet)

- **Labels über dem Feld** (top-aligned): Label+Input in einer Fixation, ~10×
  schnellere Saccade als left-aligned, fast halbe Completion-Zeit (Penzo/
  LukeW Eye-Tracking 2006). Floating Labels nur bei kurzen Formularen;
  Placeholder-als-Label verboten.
- **Inline-Validierung on-blur** (nicht on-keystroke): +22 % Erfolg, −22 %
  Fehler, −42 % Completion-Zeit, +31 % Zufriedenheit (LukeW × Etre, A List
  Apart 2009). Success-State (grüner Haken) zeigen, persistent.
- **Fehlermeldungen**: direkt UNTER dem Feld, Icon+Text (nie nur Farbe),
  spezifisch mit Fix ("Die E-Mail braucht ein @. Beispiel: name@firma.de"),
  niemals generisch ("Ungültige Eingabe"). 98 % der Sites nutzen dieselbe
  generische Meldung für alles (Baymard).
- **Pflichtfeld-Inversion**: die Minderheit kennzeichnen. Meist Pflicht →
  "(optional)" an den Ausnahmen statt überall `*`.
- **Autocomplete-Attribute** (`name`, `email`, `tel`, `street-address`,
  `postal-code`): Autofill-User schließen zu 71 % ab vs. 59 % manuell (Zuko,
  215 Formulare).
- **Flexible Formate schlagen Masken**: Telefon mit Leerzeichen/Bindestrichen
  akzeptieren, serverseitig normalisieren. DACH-Falle: PLZ-Validierung, die
  nur 5-stellige deutsche PLZ akzeptiert, blockiert AT/CH (4-stellig).
  False Negatives blockieren echte Kunden.
- **Feldlänge = Affordance**: PLZ kurz, E-Mail lang; zu kurze Felder erzeugen
  Fehler, weil die Eingabe nicht voll sichtbar ist.
- **Smart Defaults**: häufigste Option vorbelegen, ABER nie bei DSGVO-
  Einwilligungen (nie vorausgekreuzt).

### 5.4 Mobile Formulare (hier wird gewonnen oder verloren)

- Mobile Abbruchraten 25–30 % über Desktop (Formisimo); Mobile ~75–83 % des
  Traffics, konvertiert aber schlechter. Die Mobile-Version ist der Hauptfokus.
- **Inputs ≥16 px** (sonst iOS-Zoom; nie mit `user-scalable=no` "fixen").
- **Tastatur-Typen** (kostenlos, ~36 % weniger Eingabefehler): `type="email"`,
  `type="tel"`, `inputmode="numeric" pattern="[0-9]*"` für PLZ, `inputmode="decimal"`
  für Beträge, `enterkeyhint="next"/"done"/"send"`.
- **Single-Column ausnahmslos**; Sticky-CTA (`position: sticky; bottom: 0`)
  auch über der Tastatur sichtbar; fokussiertes Feld bleibt über der Tastatur
  (dvh/svh statt vh); Touch-Targets ≥44×44 px, Abstand ≥8 px.
- Dropdowns auf Mobile vermeiden (Radio/Segmented Controls stattdessen).

### 5.5 DSGVO & deutscher Markt (keine Rechtsberatung, aber Design-Realität)

- **Double-Opt-in** ist faktischer Standard (§ 7 UWG). Bestätigungsraten
  60–80 %: Bestätigungsmail SOFORT senden, Betreff klar, auf der Zwischenseite
  auf den Spam-Ordner hinweisen, Resend-Button. DOI-Listen haben 20–40 %
  höhere Öffnungsraten: Qualitätsfilter, kein Verlust.
- **Checkbox-Disziplin**: nie vorausgekreuzt, nur notwendige Einwilligungen,
  Marketing-Consent separat und optional, Datenminimierung (jede Zusatzfrage
  braucht einen Grund). Koppelungsverbot beachten.
- **Anfrage-Funnels** (Beratung/Angebot) können die Kontaktaufnahme meist über
  Art. 6 Abs. 1 lit. b DSGVO (vorvertraglich) abbilden; die schwere
  Einwilligungs-Checkbox ist dann nur für Newsletter nötig. Im Zweifel:
  juristischen Rat des Kunden einholen, nicht raten.
- **Telefon als gleichwertiger Pfad** (deutscher Dienstleister-Markt, ältere
  Zielgruppen): klickbare `tel:`-Nummer im Header, Sticky-Call-Button mobil,
  Nummer auf jeder Seite. Telefon-Abfrage IM Formular kostet dagegen Conversion
  (6,3 % Feld-Abbruch, Zuko): anbieten ≠ abfragen.

### 5.6 Thank-You-Page als Conversion-Asset (Peak-End nutzen)

1. Konkrete Bestätigung + was als Nächstes passiert ("Ihre Analyse wird
   erstellt, ein Experte meldet sich innerhalb von 24 h"): Erwartungsmanagement
   senkt No-Shows und hebt Anruf-Annahme.
2. **Terminbuchung direkt einbetten** (Calendly/Cal.com inline, nie Redirect):
   eliminiert Telefon-Ping-Pong.
3. Eigene Danke-Seite mit stabiler URL (Conversion-Tracking, GA4).
4. Trust-Elemente (Team, Rezensionen), DOI-Hinweis falls nötig, Next-Step-
   Content (Case Study) zur Vorwärmung. E-Mail-Sequenz: sofort Bestätigung,
   +24 h Case, +48 h FAQ.

### 5.7 Lead-Qualität vs. Lead-Menge (Friction als Werkzeug)

- Eine Qualifizierungsfrage kostet typisch 15–25 % Leads, hebt aber die
  Sales-Acceptance um 40–60 % (Typeform Lead-Gen-Guide). Red Flag: Drop >25 %.
- Landing-Page-Leads (mehr Friction) werden zu 40–55 % SQL vs. 25–40 % bei
  Instant-Forms (Sekundärquelle).
- **Speed-to-Lead**: Kontakt innerhalb 5 Minuten konvertiert 8–10× höher als
  nach 30 Minuten (InsideSales 2007/2011, alt aber Dauerbrenner). Sofort-Auto-
  Antwort, Rückruf-Ziel <5 min, SMS-Bestätigung gehören zum Funnel-Design.
- Qualification Bias prüfen: "Zwingen wir GUTE Leads, zu hart zu arbeiten?"

### 5.8 Messung: Field-Level-Analytics

GA4 trackt nur `form_start`/`form_submit`. Für Conversion-kritische Funnels:
dediziertes Form-Analytics (Zuko, Hotjar) oder GTM-Custom-Events.

- **Metriken**: Views→Starts→Completions→Abandons pro Formular UND pro Schritt;
  Field-Drop-off (letztes berührtes Feld vor Abbruch); Time-on-Field/Hesitation;
  Error-Rate pro Feld; Field-Returns (zurückkehren/neu tippen = Formatproblem).
- **Zuko-Benchmarks** (1.362 Formulare): Passwort schlimmstes Feld (10,5 %
  Abbruch, 7,2 s), E-Mail 6,4 %, Telefon 6,3 %, Name 5,3 % (erstes Feld =
  Intent-Filter, nicht "fixen"), Adresse 4,3 % (7,4 s).
- **Typische Drop-Punkte im Funnel**: Schritt 1 (Tire-Kicker, normal) ·
  Übergang zu Kontaktdaten (größter echter Drop: Reassurance + Nutzen-Framing) ·
  Passwort-/Account-Schritte (in Funnels nie verlangen) · Adress-Blöcke
  (Address-Lookup statt "Address Line 2") · Schritte mit >4 Feldern.

---

## 6. Typ-Playbooks

Kondensiert pro Typ: Ziele, Benchmarks, Top-Hebel, häufigste Fehler, das
Unterscheidungsmerkmal. Zahlen-Qualität: [Q] Studie/Datensatz, [V] Vendor/
Agentur, [S] Schätzwert (Details in §10).

### 6.1 SaaS / Software

- **Ziele**: Trial-Signup, Demo-Request, (später Trial→Paid, Aktivierung).
- **Benchmarks**: Visitor→Trial opt-in 7–9 %, opt-out (mit Kreditkarte) 2–2,5 %
  aber 48–51 % Trial→Paid; Freemium 13,3 %→Free aber nur 2,6 %→Paid [Q].
  Website→Lead Median 2,2–2,4 %, Top 11,5 %.
- **Hebel**: (1) Trial-Modell-Entscheidung vor jedem Design: opt-out liefert
  ~3× zahlende Kunden pro 1.000 Besucher trotz niedrigerer Signup-Rate [Q].
  (2) Signup-Friction: Demo-Form <5 Felder; Kreditkarten-Pflicht kostet 40–60 %
  Signups [V]. (3) Pricing-Page: 3–4 Pläne, "Most popular"-Badge, Decoy,
  Annual-Toggle mit sichtbarem Rabatt, teuerster Plan links. (4) Trust-Stack
  above the fold: G2/Capterra-Rating + 1 Security-Badge nahe CTA + ICP-passende
  Logos. (5) Demo-Booking: Kalender eingebettet statt Callback-Formular;
  3-Touch-Reminder (24 h Mail, 4 h SMS, 1 h Mail) hebt Show-up von 55–72 %
  auf 80–92 % [V]. (6) Risk Reversal am CTA: "Keine Kreditkarte nötig",
  "Jederzeit kündbar".
- **Fehler**: CC-Pflicht ohne die 3×-Rechnung; Demo-Formular mit 10+ Feldern;
  generische Logo-Leiste; Pricing-Page als Conversion-Seite missverstehen
  (ihre Aufgabe ist Klarheit, niedrige CVR dort ist normal).
- **Merkmal**: ZWEI Conversion-Events (Signup UND Trial→Paid); Social Proof ist
  institutionalisiert (G2); die Modell-Entscheidung liegt vor jedem Design.

### 6.2 E-Commerce / Shop

- **Ziele**: Add-to-Cart, Checkout-Abschluss, AOV (zweite gleichwertige Größe).
- **Benchmarks**: CR 2,5–3 % [Q Dynamic Yield]; Add-to-Cart 6,2 % (Food 13 %,
  Luxury 3,2 %); Warenkorbabbruch 70,2 % (Baymard-Meta, 50 Studien); Shopify
  Schnitt 1,4 %, Top 10 % 4,7 %+ [Q Littledata].
- **Hebel**: (1) Reviews auf der PDP: 0→5 Reviews = bis +270 %, Peak 4,2–4,7
  Sterne [Q Spiegel]. (2) Versandkosten-Schwelle 20–30 % über AOV mit
  Progress-Bar ("Dir fehlen 12 €"): AOV +17–30 % [Q/V]. (3) Sticky Add-to-Cart
  nur MIT kompletter Variantenwahl im Bar; Win-Rate in Tests nur 12,5–27 %,
  kein garantierter Win [Q]. (4) Cart-Drawer statt Cart-Page (+3–12 %
  Cart→Checkout) [V]. (5) Post-Purchase-Upsell nach Zahlung: +10–15 % AOV bei
  null Risiko [V]. (6) Versand-/Retouren-Info VOR dem ATC; Retourenrecht als
  Conversion-Asset. (7) Speed (§3.1). (8) Zahlarten DE: PayPal + Kauf auf
  Rechnung sind Pflicht [S].
- **Fehler**: Versandkosten erst im Checkout (Abbruchgrund Nr. 1); Reviews auf
  separater URL; Auto-Slider-Hero; versteckte Retouren-Info.
- **Merkmal**: Sofortige Geld-Transaktion: Vertrauen (Retoure, Versand,
  Zahlung) schlägt Persuasion. Mehrstufiger Funnel mit eigener Benchmark je
  Stufe. Mobile-PDP ist die Hauptbaustelle.

### 6.3 Lokaler Dienstleister / Handwerk (deutscher Markt)

- **Ziele**: Anruf (wichtigster!), Formular-Anfrage, Termin, Rechner-Funnel.
- **Benchmarks**: Website→Lead 2,5–5 %, bei Brand/Local-Traffic 5–10 % [V];
  Telefon-Leads→Kunde 18–25 % [V]; 76 % der mobilen lokalen Suchenden besuchen
  binnen 24 h ein Geschäft [Q Google].
- **Hebel**: (1) Telefon zuerst: klickbare Nummer im Header + Sticky mobil, auf
  jeder Seite, Call-Tracking. (2) Google-Bewertungen: >80 % der deutschen
  Konsumenten prüfen sie vor lokalem Kauf [Q Bitkom]; Vertrauen erst ab >20
  Bewertungen; 4,5★ wird 3× mehr vertraut als 5,0; auf Reviews antworten
  (62 % der deutschen KMU tun es nicht [Q IHK]). (3) Notdienst-Pattern:
  kontraststarker 24/7-Button im Hero, eigener Pfad, seriöse Versprechen.
  (4) Persönliche Nähe: echte Team-Fotos mit Namen, "Meisterbetrieb seit
  1995", Vorher/Nachher-Galerie als wichtigstes Trust-Asset, kein Stock.
  (5) Ortsbezug: Stadt in der H1, Gewerk×Ort-Landingpages, NAP-Konsistenz.
  (6) Prozess-Klarheit: 4 Schritte (Kontakt → Besichtigung → Festpreis →
  Ausführung), Bild-Upload im Formular (Schaden fotografieren qualifiziert).
  (7) Rechner-/Quiz-Funnel nach §5 (Solar-Pattern). (8) Reaktionszeit <5 min
  (8–10× Conversion) mit Sofort-Auto-Antwort.
- **Fehler**: Nummer nur im Footer/nicht klickbar; 8-Felder-Formular ohne
  Anruf-Option; Stockphotos; Bewertungen nicht eingebettet; keine Sofort-
  Bestätigung nach Formular.
- **Merkmal**: Conversion passiert oft OFFLINE; die Site ist Übergabepunkt.
  Vertrauen kommt von Dritten (Google-Sterne), das Business-Profil ist faktisch
  Teil der Website. Lokale Suchintention ist die kaufstärkste überhaupt.

### 6.4 Agentur / Beratung / Freelancer (B2B High-Ticket)

- **Ziele**: Discovery-Call, qualifizierte Anfrage (nicht Masse), Nurture-Signup.
- **Benchmarks**: B2B-Service-Sites ~2,9 % [V]; Booking→Deal 20–40 % [V];
  Show-up 55–72 %, optimiert 80–92 % [V]; Antwort <5 min = 21× höhere
  Qualifizierung [Q HBR].
- **Hebel**: (1) Case Studies als Asset Nr. 1: Problem → Prozess → Ergebnis mit
  Zahlen ("+200 % Leads in 3 Monaten"), Full-Page-Narrativ schlägt Card-Grid,
  Kundenkontext zur Selbst-Identifikation, CTA aus der Story. (2) Qualifizierung
  statt Masse: Application-Page mit Budget-/Fit-Fragen VOR dem Kalender;
  Buchungsformular 4–7 Felder. (3) Calendly-Pattern: Widget in gebrandete Seite
  mit Proof drumherum einbetten, Buchungsfenster max 14–21 Tage, 3-Touch-
  Reminder, einfaches Rescheduling. (4) About-Page als Entscheidungsseite:
  Gesichter, Namen, Haltung. (5) Wenige starke CTAs: "Book a 30-minute call"
  + Microcopy, die sagt, was passiert. (6) "Ab"-Preise als Gesprächsöffner und
  Filter. (7) Newsletter-Nurture: 79 % der Leads konvertieren nie ohne
  Nurturing [V].
- **Fehler**: Portfolio ohne Zahlen; Cases im "Resources"-Tab versteckt;
  generisches Kontaktformular; Kalender voller Low-Intent-Calls (fehlende
  Qualifizierung); anonyme Testimonials.
- **Merkmal**: Ziel ist Lead-QUALITÄT: Friction wird absichtlich eingebaut. Der
  Verkauf passiert im Gespräch; die Site erzeugt nur den vorqualifizierten
  Call. Der Mensch ist Teil des Produkts.

### 6.5 Content / Newsletter / Medien

- **Ziele**: E-Mail-Signup (Hauptziel), Registration, Paid-Subscription.
- **Benchmarks**: Popup-Schnitt 3,1–4,1 %, Top 10 % >9,3 % [Q Sumo/Sleeknote];
  Exit-Intent 2–14 % [V]; Inline 1–3 %; Sidebar <0,1–1 % ("effectively dead");
  Registration-Wall: 16× mehr Registrierungen als passive Form [Q];
  Registered→Paid ~10 % vs. 0,22 % anonym [Q Piano].
- **Hebel**: (1) Das Angebot ist der Hebel, nicht das Formular: Checklisten/
  Templates/Tools schlagen lange E-Books; Content Upgrade (exakt passend zum
  Artikel) schlägt den generischen Magneten; Lead Magnet verdoppelt Popup-
  Conversion [Q Getsitecontrol]. (2) Placement-Hierarchie: Exit-Intent +
  Inline-Form nach 300–500 Wörtern in Top-Posts + Sticky Bar; Sidebar
  entfernen. (3) Ein Feld nur: 1 Feld 2,9 % vs. 3 Felder 1,9 % [Q Sleeknote].
  (4) Popup-Mechanik: mit Bild 4,1 % vs. 0,7 %; Mobile-Popups 5,6 % vs.
  Desktop 2,9 %: Mobile NICHT deaktivieren [Q]. (5) Copy: "SEO-Checkliste
  holen" (5–8 %) schlägt "Newsletter abonnieren" (1–2 %) [V]. (6) Registration
  vor Paywall (Identität zuerst kostenlos), Meter kalibrieren, Gate nach
  40–60 % Scroll. (7) Inline-CTAs im Lesefluss, Mid-Post schlägt End-of-Post.
- **Fehler**: "Subscribe to our newsletter" ohne Angebot; Sidebar als einziger
  Capture; Popup bei Page-Load auf jeder Seite; ein Magnet für die ganze Site.
- **Merkmal**: Conversion = Identitäts-Tausch (E-Mail gegen Wert), kein Geld:
  Raten 5–10× höher, Wert entsteht später (Nurture). Abgestufte Ladder:
  lesen → registriert → Subscriber → Käufer. Test the offer before the colour.

### 6.6 Event / Webinar / Kurs (Info-Produkte)

- **Ziele**: Registrierung, Show-up (eigene Stufe!), Kurs-Kauf, Deadline.
- **Benchmarks**: Webinar-Reg-Seite 20–40 % typisch [V]; Registration→
  Attendance 57 % [Q ON24], branchenüblich 30–45 %; Kurs-Sales-Page 2–5 %
  (<$500: 3–5 %, >$2k: 0,1–0,5 %) [V].
- **Hebel**: (1) Registrierungs-Seite ohne Navigation: Headline [Ergebnis] für
  [Zielgruppe] in [Zeit] ohne [Pain], 3 Curiosity-Bullets, Speaker-Bio mit
  Proof, Auto-Timezone, 1–2 Felder, EIN CTA. (2) Show-up als eigener Funnel-
  Schritt: SMS-Reminder + .ics-Invite + Live-only-Bonus hebt 30–40 % auf
  50–65 % [V]. (3) ECHTE Deadlines (Evergreen pro User, kein Reset bei
  Refresh); Fake-Countdowns zerstören Trust (§10). (4) Preisstaffelung:
  Early-Bird-Phasen mit sichtbarem Preisanstieg; Payment-Plan ab $500
  (40–60 % wählen ihn, 1,5–2× Conversion) [V]; Value-Stack-Anker. (5)
  Transformation vor Curriculum: Ergebnis → Problem → Methode → After-State →
  Proof → DANN Curriculum → Instructor → FAQ → Garantie → CTA (Transformations-
  Copy +47 % Enrollments [V]). (6) Instructor-Trust: Credentials, konkrete
  Ergebnisse, Video-Testimonials. (7) Garantie: 30 Tage Money-Back kostet <3 %
  Refunds, hebt +20–40 % [V]. (8) Replay-Strecke nutzen (44 % schauen
  on-demand [Q]).
- **Fehler**: Navigation auf der Reg-Seite; Curriculum-First ("8 Module, 47
  Lektionen": niemand kauft Lektionen); Fake-Countdown; kein Payment-Plan ab
  $500; Optimierung am Pitch, obwohl die Show-up-Rate das Leck ist.
- **Merkmal**: ZEIT ist die Conversion-Währung (fixes Datum = strukturell echte
  Urgency). Einzigartige Zwischenstufe Show-up. Long-Form-Sales-Page ist hier
  Mainstream. Instructor = Produkt.

## 7. Checkout-Spezifika (E-Commerce, Baymard-Kernbefunde)

- **Abbruchrate 70,2 %** (Meta-Analyse, 50 Studien, seit Jahren stabil). 42 %
  davon "nur geschaut" (nicht behebbar). Mobile 80 % vs. Desktop 69 %.
- **Abbruchgründe** (aktuelle Baymard-US-Survey, behebbare Gründe): Zusatzkosten
  40 % · Lieferung zu langsam 20 % · Kreditkarten-Misstrauen 19 % · Account-
  Zwang 18 % · zu lang/komplex 17 % · Website-Fehler 17 % · Retouren-Policy
  13 % · Gesamtkosten nicht vorab kalkulierbar 12 % · zu wenig Zahlarten 9 %.
  (Ältere Welle: 48/24/22 %; beim Zitieren die Welle nennen.)
- **Hebel**: besseres Checkout-Design bis +35 % Conversion (Baymard, modellierte
  Obergrenze). Idealer Checkout 12–14 Form-Elemente (7–8 Felder); US-Schnitt
  23,5 Elemente.
- **Guest Checkout als Default**, Account nach dem Kauf anbieten ("Für nächstes
  Mal speichern").
- **Kosten früh**: Versand/Steuern auf Produkt-/Warenkorbseite, nie Überraschung
  im letzten Schritt.
- **Express Checkout** (Apple Pay, Google Pay, PayPal) prominent oben im
  Warenkorb; Shop Pay konvertiert ~1,7× (Vendor-Daten). 5–7 Zahlarten als
  Optimum.
- **Trust-Signale in Sichtweite des Pay-Buttons** (19 % brechen aus Kreditkarten-
  Misstrauen ab).
- **Adress-Autocomplete** (Google Places o. ä.) statt Address-Line-2-Chaos.
- Format: kein universeller Gewinner Single-Page vs. Multi-Step; Guest-First-
  Design wichtiger als das Format.

## 8. Testing-Disziplin (wer testet, testet sauber oder gar nicht)

- **Sample Size vorab** (Evan Miller: n = 16σ²/δ², σ² = p(1−p)). Referenz pro
  Variante bei 3 % Baseline: ~20.700 Besucher für 10 % MDE, ~5.200 für 20 %,
  ~2.300 für 30 %. Heuristik: mindestens 100–400 Conversions pro Variante.
- **95 % Signifikanz, 80 % Power**, Testdauer in VOLLEN Wochenzyklen
  (1–2 Business-Zyklen, ideal 2–6 Wochen), nie über Feiertage/Aktionen.
- **Peeking ist Fehler Nr. 1**: kontinuierliches Schauen + Stoppen beim ersten
  Grün treibt die False-Positive-Rate von 5 % auf >40 % (Evan-Miller-Simulation;
  bei A/A-Tests erreichten 531 von 1.000 irgendwann 95 %). Regel: Stoppkriterium
  vor dem Start committen, Zwischenstände ausblenden.
- **SUTV beachten**: keine Preis-Tests, bei denen Varianten sich kannibalisieren;
  keine parallelen Tests auf demselben Element; Cookie-/Device-Switching im Blick.
- **Nicht testen**: offensichtlich Kaputtes (implementieren), Kleinkram ohne
  Hypothese, Seiten unter ~1.000 Conversions/Monat (qualitativ optimieren),
  mehrere Änderungen gleichzeitig.
- **Metriken**: Micro-Conversions (Scroll, Form-Start, Pricing-Visit) als Proxy
  bei dünnen Macro-Daten; Macro als Guardrail. Revenue per Visitor schlägt CVR,
  wenn Preise/AOV im Spiel sind. Relative vs. absolute Prozentangaben sauber
  trennen ("+2 Prozentpunkte" ≠ "+2 %").

## 9. Messung & Benchmarks (Baselines richtig lesen)

- **Drei Metriken heißen "Conversion Rate"**: Landing-Page-Rate, Sitewide-Rate,
  Ad-Platform-Rate. Vergleiche nur innerhalb derselben Art.
- **Referenzwerte**: Landing-Pages Median 6,6 % (Unbounce 2024, 41.000 Pages,
  464 Mio. Visits); SaaS 3,8 %, E-Commerce 4,2 %, Financial/Education ~8,4 %;
  Sitewide-Mean 5,1 % (Ruler, 110 Mio. Sessions); Google Ads Mean 8,2 %
  (WordStream); E-Com Desktop 3,1 % vs. Mobile 2,9 % (Dynamic Yield).
- **Baseline-Methodik**: (1) Tracking-Health zuerst. (2) 4–8 volle Wochen
  messen, nicht 3 gute Tage. (3) Immer segmentiert lesen (Device, Kanal,
  neu/wiederkehrend; Simpson-Paradox). (4) Drop-off pro Funnel-Stufe
  dokumentieren; Potenzial = Traffic × (Referenz-CVR − eigene CVR) × Wert pro
  Conversion. (5) Ziele als relativen Uplift mit MDE definieren, daraus Sample
  Size ableiten (§8).
- **Messpunkte einplanen** (Pflicht, auch in sektionen-und-funnels.md §3):
  Funnel-Start, Schritt-Completion, Absendung, Telefon-Klick, Termin-Buchung,
  jeweils als Event mit Segment-Dimensionen.

## 10. Ehrlichkeits-Regeln für Conversion-Zahlen

Conversion-Literatur ist voller Marketing-Zahlen. Der Skill spielt offen:

- **Einzelfall-Cases labeln**: "11 %→46 %" (BrokerNotes), "+90 % First-Person-
  CTA" (ContentVerve), "+120 % Felder-Reduktion" (Imagescape): reale Tests,
  aber je EIN unkontrollierter Case. Als Richtung verwenden, nie als Versprechen.
- **Vendor-Daten labeln**: Zahlen von Typeform, Shopify, Popup- und Chat-Tools
  haben Eigeninteresse. Als "Vendor-Daten" kennzeichnen.
- **Alte Zahlen datieren**: "−7 % Conversion pro Sekunde" (Akamai) stammt aus
  ~2008; Speed-to-Lead 8–10× aus 2007/2011. Mit Jahr zitieren oder aktuellere
  Quellen (Portent, Google/Deloitte) nutzen.
- **Modellierte Obergrenzen**: Baymards "+35 %" und "$260 Mrd." sind
  Projektionen aus Usability-Tests, keine Garantien.
- **Widersprüchliche Evidenz benennen**: Choice Overload hat eine Meta-Analyse
  mit Effekt nahe null (Scheibehenne 2010); Sticky-ATC gewinnt nur 12,5–27 %
  seiner Tests. Regeln daraus kontextabhängig formulieren.
- **Baymard-Wellen**: Abbruchgründe existieren in zwei Survey-Wellen; beim
  Zitieren Welle/Datum nennen.
- **Niemals erfundene Zahlen in Deliverables**: weder in Mockups noch in
  Kunden-Präsentationen ("bis zu +X %") ohne Quelle. Das deckt sich mit dem
  Fake-Zahlen-Verbot in den harten No-Gos.
- **Scarcity nur echt**: Fake-Countdowns, erfundene Verfügbarkeit und "X Personen
  schauen gerade"-Widgets sind in der EU rechtlich angreifbar
  (Omnibus-Richtlinie 2019/2161, UWG) und ein Vertrauensbruch. Erlaubt: echte
  Plätze, echte Deadlines, echte Saison.

**Quellen-Hauptliste**: cxl.com (ResearchXL, Testing) · evanmiller.org
(Sample Size, Peeking) · baymard.com (Checkout, Formulare) · zuko.io/blog
(Field-Level-Daten) · static.lukew.com/webforms_lukew.pdf (Form-Design) ·
unbounce.com (Benchmarks, Attention Ratio) · nngroup.com (Fold, F-Pattern) ·
spiegel.medill.northwestern.edu (Reviews) · ventureharbour.com + instapage.com
(Multi-Step-Cases) · Nunes & Drèze 2006 JCR (Endowed Progress) ·
wordstream.com (Ads-Benchmarks) · bitkom.org / brightlocal.com (DACH-Reviews).
