# Taktiken — Programmatic SEO (Skalierung mit Substanz)

Seiten in Masse aus Daten erzeugen — 2026 mit KI-Unterstützung einfacher denn
je, aber die Qualitätslatte ist gestiegen: Google straft dünne Template-Masse
ab (Scaled-Content-Abuse), während datenreiche pSEO-Portfolios weiter
funktionieren (levelsio: 55k Seiten, $16k/Monat; iannuttall: 80 Mio.
Impressions/Monat, Stand 2025–2026). Quellen: X-Threads iannuttall/
kalashvasaniya/startupideaspod 2024–2026 + Bestand aus
taktiken-content-distribution — Details `quellen-2026-09.md`.

## Wann pSEO — und wann nicht

**Ja, wenn:** echte, differenzierende Daten pro Seite vorhanden sind;
ein wiederholbares Keyword-Pattern existiert; jede Seite einem echten
Nutzerproblem dient. Für Dienstleister ist das Kern-Pattern **Leistung ×
Region** (z. B. "Rohbau abdichten {Ort}") plus eigene Daten (Preise,
Projektbelege, Regionen-Erfahrung).
**Nein, wenn:** nur Variablen-Swap ("{Stadt} + {Service}") ohne eigenen
Datenwert; kein Indexierungs-Monitoring möglich; die Domain keine Autorität
hat und keine aufgebaut werden soll.

## Der 5-Schritte-Playbook (iannuttall, verdichtet)

1. **Domain-Strategie.** Bestcase: gealterte, bereits rankende Domain
   akquirieren und darauf bauen (Beispiel: visualfractions.com für $2k gekauft,
   mit Mathe-Kalkulatoren ausgebaut). Alternative: pSEO-Ordner auf der
   bestehenden Kundendomain — Unterordner statt Subdomain
   (`site.de/vorlagen/` konsolidiert Autorität).
2. **Keyword-Pattern finden.** Wiederholbare Muster mit echter Suchintention:
   "best X for Y", "service in {city}", "{Zahl} geteilt durch {Bruch}",
   "X vs Y", "X in Y umrechnen". Entscheidend: Pattern mit viel
   manipulierbaren Daten dahinter. Erst gezielt (wenige, hochwertige
   Patterns), später Scattergun.
3. **Daten extrahieren, bereinigen, anreichern.** Das ist der eigentliche
   Moat: Tage in Datenqualität investieren (Scraping,
   Cleaning, Enrichment). Detailtiefe entscheidet — Formatierung ("LLC" statt
   "Llc"), nutzerfokussierte Darstellung jedes Datenpunkts. Eigene Daten
   schlagen öffentliche in der Verteidigungsfähigkeit.
4. **Template-Engineering.** Ein Page-Layout pro Pattern; KI generiert
   **eindeutige Absätze** pro Seite, nicht Variablen-Swaps. Jede Seite muss
   den "Paid-Ads-Test" bestehen: würdest du für Traffic auf genau diese
   Seite zahlen?
5. **Interne Verlinkung früh lösen.** Jede Seite ≤3 Klicks von der Homepage;
   Hub-Seiten pro Pattern-Kategorie; programmatische Querverlinkung nach
   Regeln (Geschwister-Seiten, nächsthöhere Kategorie). Click-Depth ist ein
   beobachteter Qualitätsfaktor.

## Die 12 etablierten Muster (kombinierbar)

| Muster | Beispiel |
|---|---|
| Templates | "Offertvorlage Renovation" |
| Curation | "beste Treuhänder in Zürich" |
| Umrechner | "10 EUR in USD" |
| Vergleiche | "Treuhand vs. selber buchhalten" |
| Beispiele | "Expose-Beispiele Einfamilienhaus" |
| Standorte | "Zahnarzt in Wien" |
| Zielgruppen | "Steuerberatung für Ärzte" |
| Kosten | "Kosten Kernsanierung pro m²" |
| Glossar | "was ist pSEO" |
| Directory | "Elektriker in der Region Bern" |
| Profile | "[Name] Geschäftsführer" |
| Kalkulatoren | "Brutto-Netto-Rechner 2026" |

## Skalierungs-Protokoll (MVP → Monitor → Scale)

1. **MVP: 100 Seiten**, nicht 10.000. Manuelle Qualitätsprüfung jeder Seite
   der ersten Charge.
2. **Indexierungs-Monitoring:** GSC-Coverage beobachten — werden die Seiten
   indexiert? Bekommen sie Impressions? Erst bei sauberer Indexierung
   weiter skalieren. "Crawled – currently not indexed" in der Masse =
   Qualitätsproblem, stoppen und Template nachschärfen.
3. **Dünne Varianten `noindex`**: Kombinationen ohne Suchvolumen oder ohne
   eigenen Datenwert raus aus dem Index, statt Crawl-Budget zu verbrennen.
4. **Skalieren in Chargen** (100 → 1.000 → 10.000+), nach jeder Charge
   Indexierung + Impressions prüfen.
5. **Refresh einplanen:** Daten altern; pSEO-Seiten brauchen
   Daten-Refresh-Zyklen, sonst Decay.

## Kosten-Realität (2026)

- Content-Generierung: z. B. 100k Seiten ≈ 22 Mio. Tokens
  (Referenzprojekt kalashvasaniya, 2026).
- Infrastruktur skaliert mit Traffic (Edge-Requests, Bandwidth, Compute) —
  bei Traffic-Anstieg Hosting-Kosten einpreisen; ROI trägt es typischerweise,
  aber nicht gratis.
- **Manuelle Nachbearbeitung bleibt Pflicht** bei allem, was ranken soll:
  "draft at scale, manually edit before posting" (ConnorShowler, 2026).

## Qualitäts-Gates (hart)

1. Jede Seite hat **eigenen, nicht austauschbaren Datenwert**.
2. Jede Seite beantwortet die Pattern-Intention **vollständig** (nicht nur
   die Daten, auch Kontext: Erklärung, Beispiel, FAQ).
3. Template besteht den **Paid-Ads-Test**.
4. Indexierungsrate der letzten Charge ≥ ~70 %, sonst keine nächste Charge.
5. Kein pSEO auf Parasite-Domains (Medium/Substack/GitHub) ohne Graustufen-Go
   (siehe `graustufen.md` — Site-Reputation-Abuse).
6. pSEO-Cluster in die normale IA einbinden (Pillar-Links, keine
   abgehängten Template-Silos).

## Verknüpfung mit KI-Suche

- pSEO-Seiten mit echten Daten werden von KI-Engines gern zitiert (konkrete
  Antworten auf Long-Tail-Sub-Queries des Fan-Out).
- Umrechner/Kalkulatoren sind **Aktions-Queries** (siehe
  taktiken-search-everywhere) — KI kann sie nicht befriedigen, der Klick
  bleibt. Tool-Seiten sind damit der AIO-sicherste pSEO-Typ.
