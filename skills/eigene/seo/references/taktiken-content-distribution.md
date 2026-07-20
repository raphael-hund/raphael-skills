# Taktiken — Content-Distribution, Local SEO & Skalierung

Quellen: Instagram-Carousel-, GBP- und Newsjacking-Workflow in eigenen Worten aus dem
distribb-skill paraphrasiert (kein LICENSE-File → keine wörtliche Übernahme, API-Calls/Code
entfernt); Vergleichs-/Programmatic-SEO-Formate aus coreyhaines/marketingskills (MIT),
übersetzt und condensiert.

## Instagram-Carousel als SEO/AEO-Distributionskanal

Carousels sind kein Selbstzweck, sondern ein Distributionshebel für dieselbe Content-Story,
die auch als Artikel/Statistikseite existiert — die Save-Rate zählt als KPI, nicht Likes
(Saves signalisieren Instagram, dass der Inhalt später erneut relevant ist, was organische
Reichweite treibt).

**Feste Ausgangswerte (Pinned Defaults):** 8 Slides als Standard (Range 6–10), Canvas
1080×1350 px, 0–5 Hashtags. Ein Cover-Slide trägt ~80 % des Ergebnisses — er muss allein aus
dem Feed-Thumbnail heraus einen Hook liefern, der zum Wischen zwingt.

**Vor dem Rendern — Validierungscheck (Auszug, sinngemäß aus einer 11-Punkte-Liste):**
Cover-Hook klar erkennbar auch als Thumbnail; jede Slide funktioniert auch isoliert (kein
Kontext aus vorherigen Slides vorausgesetzt); Kontrast/Lesbarkeit auf Mobile geprüft; Anzahl
Slides innerhalb der Range; Call-to-Action auf der letzten Slide; keine Off-Brand-Farben.

## Google Business Profile / Local SEO

Ein wöchentlicher Rhythmus reicht für die meisten lokalen Kunden:

1. **Triage:** unbeantwortete Reviews zuerst, dann negative/neutrale Reviews.
2. **Antworten:** 2–4 Sätze, Reviewer namentlich ansprechen, bei negativen Reviews
   professionell bleiben und die eigentliche Klärung ins Persönliche/Offline verlagern statt
   öffentlich zu diskutieren.
3. **Ein neuer GBP-Post** pro Woche (Angebot, Update, Ereignis).

**Harte Regel:** Antworten auf Reviews sind **sofort öffentlich** und irreversibel (die Review
selbst kann nicht gelöscht werden, nur die eigene Antwort) — vor dem Absenden immer Freigabe
vom Kunden einholen, nie automatisch posten.

**Weitere lokale SEO-Basics** (ergänzt die technische Checkliste in
`regeln-technischer-audit.md`): konsistentes NAP (Name/Adresse/Telefon) über alle Verzeichnisse,
`LocalBusiness`-Schema (siehe `regeln-schema-markup.md`), eigene Standort-Seiten statt einer
generischen Kontaktseite bei mehreren Filialen.

## Newsjacking — aktuelle Nachrichten statt Evergreen-Keyword

Gegenstück zur normalen Content-Produktion: statt eines Evergreen-Keywords wird eine **frische**
Nachricht aus der Kunden-Nische aufgegriffen und mit News-Stimme geschrieben.

1. 3–5 spezifische News-Suchanfragen ableiten (zwei- bis vierwortige Phrasen, nicht "SEO" oder
   "News" — zu generisch, zieht Off-Topic-Rauschen).
2. Frische Themen über Google-News-RSS ziehen (schlüssellos, kein API-Key nötig), Near-Duplikate
   über verschiedene Outlets zu einem Thema clustern.
3. Die besten 3 auswählen nach: aktuell (letzte Tage), relevant für DIESE Zielgruppe, klarer
   On-Brand-Winkel ("was heißt das für unsere Kunden").
4. **Vor dem Schreiben** 1–2 echte Quellen-URLs pro Story abrufen — nie allein aus der
   Headline schreiben.
5. News-Stil: Lede-first (Wer/Was/Wann/Warum-wichtig in den ersten 2–3 Sätzen), dann
   Hintergrund (attributiert), dann der On-Brand-Bezug. Kurze, selbststehende, zitierbare Sätze
   ("X tat Y am Datum, laut Quelle") — genau das Format, das AI-Suchmaschinen gerne als Antwort
   übernehmen.

Kein Widerspruch zur Belegpflicht aus `loop4-ablauf.md`: jede Behauptung braucht eine
abgerufene Quelle, keine erfundenen Zitate/Daten/Namen.

## Vergleichs- & Alternative-Seiten (vier Formate)

Etabliertes SEO-Content-Format mit hohem Kaufsignal — passt in die Content-Brief-Produktion
von Loop 4, wenn der Kunde in einem umkämpften Markt steht.

| Format | Suchintention | URL-Muster | Ziel-Keywords |
|---|---|---|---|
| **Alternative (singular)** | will aktiv von einem bestimmten Wettbewerber wechseln | `/alternativen/[wettbewerber]` | "[Wettbewerber] Alternative" |
| **Alternativen (plural)** | recherchiert noch, früher im Entscheidungsprozess | `/[wettbewerber]-alternativen` | "[Wettbewerber] Alternativen", "beste [Wettbewerber] Alternativen" |
| **Du vs. Wettbewerber** | vergleicht direkt zwei konkrete Optionen | `/vergleich/[du]-vs-[wettbewerber]` | "[Du] vs [Wettbewerber]" |
| **Wettbewerber A vs. B** | vergleicht zwei fremde Optionen (Kunde tritt als dritte Option auf) | `/vergleich/[a]-vs-[b]` | "[A] vs [B]" |

**Pflicht-Bausteine jeder Seite:** TL;DR-Zusammenfassung ganz oben, Vergleichstabelle,
detaillierter Absatzvergleich pro Kriterium (nicht nur Tabelle), ehrliche Angabe wer für wen
besser passt (auch wenn das bedeutet, den Wettbewerber für einen Use-Case zu empfehlen), Migration/
Umstiegs-Hinweise.

**Ehrlichkeit ist die Kernregel:** Wettbewerber-Stärken nennen, eigene Schwächen nicht
verschweigen — Leser vergleichen und verifizieren Behauptungen. Bei der Plural-Variante
mindestens 4–7 echte Alternativen nennen (nicht nur das eigene Produkt hervorheben), das baut
Vertrauen auf und rankt besser.

**Erwartungsmanagement bei AI-Zitaten:** Plural-Alternative-Seiten werden von AI-Suchmaschinen
oft *zitiert*, aber die *Empfehlung* hängt von externem Konsens ab (Reviews, Foren, Analysten)
— eine selbst geschriebene Liste kann in der AI-Antwort auch die genannten Wettbewerber
empfehlen statt den Auftraggeber. Trotzdem publizieren (Suchintention + Themen-Framing lohnen
sich), Erwartung beim Kunden aber realistisch halten.

## Programmatic SEO (Seiten-Skalierung über Templates)

Nur einsetzen, wenn echte, differenzierende Daten pro Seite vorhanden sind — sonst Thin-Content-
Risiko. Zwölf etablierte Muster, in Kombination einsetzbar (z. B. "beste Coworking-Spaces in
München" = Curation + Location):

| Muster | Beispiel |
|---|---|
| Templates | "Rechnungsvorlage" |
| Curation | "beste Website-Baukästen" |
| Umrechner | "10 EUR in USD" |
| Vergleiche | "Webflow vs. WordPress" |
| Beispiele | "Landingpage-Beispiele" |
| Standorte | "Zahnarzt in Wien" |
| Zielgruppen | "CRM für Immobilienmakler" |
| Integrationen | "Slack-Asana-Integration" |
| Glossar | "was ist pSEO" |
| Directory | "KI-Copywriting-Tools" |
| Profile | "[Name] Geschäftsführer" |

**Grundregeln:** jede Seite braucht echten, unterschiedlichen Wert (nicht nur ausgetauschte
Variablen), eigene Daten schlagen fremde/öffentliche Daten in der Verteidigungsfähigkeit,
Unterordner statt Subdomains (`seite.de/vorlagen/` konsolidiert Domain-Autorität, eine
Subdomain splittet sie), lieber 100 gute Seiten als 10.000 dünne. Dünne Varianten ohne
Suchvolumen lieber `noindex`, statt Crawl-Budget zu verschwenden.

## Onboarding-Fahrplan für neue/DA-schwache Projekte (Sprint-Idee, kein starres Programm)

Als optionaler 90-Tage-Fahrplan bei einem komplett neuen Projekt oder einer domainschwachen
Seite — vier Phasen, jede mit klarem Ziel statt starrer Task-Liste:

1. **Vorbereitung (Tag 0):** eindeutige Title/Description auf jeder Seite, Schema-Grundgerüst,
   Search-Console verifiziert + Sitemap eingereicht, wichtigste URLs zur Indexierung angefragt.
2. **Fundament (Tag 1–30):** technische Hygiene (Lighthouse, robots.txt, Canonicals, CWV),
   20–30 gewinnbare Keywords (Wettbewerbsdichte niedrig) identifiziert und nach Intent
   klassifiziert, die ersten 2–3 Kernseiten live.
3. **Content-Engine (Tag 31–60):** 2–3 Artikel/Woche, Vergleichs-/Alternative-Seiten zuerst
   (höchste Kaufabsicht), dann Use-Case-Seiten, dann Problem-bewusste Blogartikel; erste
   Backlink-Grundlage über Directories + Digital PR (siehe `taktiken-linkbuilding-digitalpr.md`).
4. **Autorität & Verstetigung (Tag 61–90):** GSC-Seiten auf Position 8–20 überarbeiten und
   erweitern (eine Seite von Position 14 auf 4 kann den Traffic verdreifachen), ersten
   Themen-Cluster fertigstellen, FAQ-Schema auf allen Kernseiten.

Am Tag 90: GSC-Impressions-Verlauf gegen Tag-0-Baseline prüfen — wachsende Impressions sind der
Beleg, dass der Sprint funktioniert hat (Belegpflicht, kein Bauchgefühl).

## Gotchas

- **Instagram-Carousels sind Distribution, nicht Content-Strategie.** Sie brauchen eine
  zugrundeliegende Story (Artikel/Statistikseite), sonst ist es nur ein hübsches Format ohne
  SEO-Wert.
- **GBP-Antworten sind unumkehrbar öffentlich** — nie ohne Freigabe posten.
- **Newsjacking braucht echte Quellen**, sonst ist es dieselbe Belegpflicht-Verletzung wie ein
  erfundener Brief-Fakt.
- **Vergleichsseiten ohne Ehrlichkeit ranken schlechter**, nicht besser — AI-Engines und Leser
  gleichen Behauptungen gegen die Realität ab.
