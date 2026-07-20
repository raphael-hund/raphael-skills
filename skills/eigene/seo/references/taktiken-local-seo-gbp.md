# Taktiken — Local SEO & Google Business Profile (GBP)

Neue Lücke gegenüber dem Bestand: bisher stand Local SEO nur als kurzer Häufig-Fehlbild-Punkt
in `regeln-technischer-audit.md` ("inkonsistentes NAP … keine gepflegte GBP-Präsenz"). Diese
Datei liefert die Taktik-Tiefe dahinter — für Kunden mit stationärem Geschäft, Service-Area-
Business (SAB) oder mehreren Standorten.

Quelle: `seo-local`-Skill aus AgriciDaniel/claude-seo (MIT-Lizenz, Commit `6cf1ea9`), übersetzt
und condensiert. Zahlenwerte (Whitespark 2026, BrightLocal LCRS 2026, Sterling Sky u. a.) sind
Studienangaben aus dem Quell-Repo — als Priorisierungs-Hinweis nutzen, nicht ungeprüft als
eigene Kennzahl in einen Kundenreport übernehmen (Belegpflicht gilt weiter: Zahlen im
Kundenreport brauchen den eigenen Nachweis, z. B. GBP-Insights-Export).

## Geschäftstyp zuerst erkennen (bestimmt, welche Checks greifen)

| Typ | Erkennungsmerkmale | Konsequenz |
|---|---|---|
| **Stationär** | Sichtbare Adresse, Maps-Embed mit Pin, "Besuchen Sie uns" | Volle NAP- + Karten-Prüfung |
| **Service Area (SAB)** | Keine Adresse, "kommen zu Ihnen", `areaServed` ohne Straße | Kartenprüfung/Adresskonsistenz entfällt |
| **Hybrid** | Beides gleichzeitig | Beide Checks kombiniert |

## GBP-Signale — das wichtigste zuerst

- **Primärkategorie ist der wichtigste Einzelfaktor** für den Local Pack — eine falsche
  Primärkategorie ist umgekehrt der stärkste Negativfaktor. Zuerst prüfen, vor allem anderen.
- Sekundärkategorien ergänzen (Richtwert: einige zusätzliche, passende Kategorien).
- Fotos/Videos erhöhen laut Quelle nachweislich die Zahl der "Route berechnen"-Klicks.
- GBP-Q&A wurde laut Quelle Ende 2025 von Google durch eine AI-Antwortfunktion ("Ask Maps")
  abgelöst, bestehende Q&A-Inhalte ohne Export entfernt — bestehende Q&A-Inhalte vorsorglich als
  eigene FAQ-Sektion auf der Website nachbilden, bevor sie verloren gehen.
- Öffnungszeiten sichtbar halten — Geschäfte, die zum Suchzeitpunkt geöffnet sind, werden
  bevorzugt gerankt.
- **Nicht die stärkste Website-Seite als GBP-Link verwenden** — laut Quelle (Sterling-Sky-
  Analyse) Risiko, dass es die organische Zielseite selbst schwächt.

## Bewertungen & Reputation

- **18-Tage-Regel:** Rankings können abstürzen, wenn 3 Wochen lang keine neue Bewertung
  eingeht — Bewertungs-**Geschwindigkeit** zählt mehr als die Gesamtzahl.
- Magische Schwelle laut Quelle: ab **10 Bewertungen** kippt die Wahrnehmung deutlich.
- Sternebewertung: ein relevanter Anteil der Konsumenten filtert laut Quelle nur ab 4,5+ bzw.
  4+ Sternen — unter 4 Sternen sinkt die Sichtbarkeit in der Kunden-Auswahl stark.
- **Review-Gating ist verboten:** jede Vorab-Filterung ("waren Sie zufrieden?" vor dem
  Bewertungslink) verstößt gegen Googles Richtlinie zu gefälschtem Engagement — und in den USA
  gegen FTC-Regeln. Nie empfehlen, auch nicht "nur für die guten Kunden".
- Auf Bewertungen antworten (Eigner-Antworten erhöhen laut Quelle die Vertrauenswirkung
  deutlich) — bei Gesundheit/Recht: keine Patienten-/Mandantenbestätigung in der Antwort
  (Datenschutz/Verschwiegenheitspflicht).

## On-Page für lokale Signale

- **Eigene Service-Seite pro Kernleistung** ist laut Quelle der stärkste einzelne organische
  Local-Faktor — eine generische "Leistungen"-Seite reicht nicht.
- Title/H1 mit Stadt + Leistung kombinieren.
- NAP (Name/Adresse/Telefon) sichtbar in Footer/Kontakt — nicht nur in Schema.
- **Swap-Test für Multi-Standort-Seiten:** wenn man den Stadtnamen austauschen kann und der
  Text weiterhin Sinn ergibt, ist es eine Doorway-Seite — Google-Strafrisiko. Jede
  Standortseite braucht eigene, nicht austauschbare Inhalte (Richtwert: deutlich über die
  Hälfte einzigartiger Inhalt, lokale Fotos, lokale Testimonials, lokale FAQs).
- Hub-and-Spoke-Struktur: jede wichtige Seite in ≤3 Klicks von der Startseite (deckt sich mit
  der allgemeinen Regel in `regeln-technischer-audit.md`).
- Subdirectory-Struktur (`domain.de/standorte/stadt/`) statt Subdomain — konsolidiert
  Linkkraft besser.

## NAP-Konsistenz & Citations

- NAP an drei Stellen abgleichen: sichtbare Seite, LocalBusiness-Schema, GBP-Eintrag —
  jede Abweichung ist ein Befund.
- Tier-1-Verzeichnisse prüfen (Google, Yelp-Äquivalente, Branchenverzeichnisse, Facebook-
  Unternehmensseite).
- **Bing Places nicht vergessen** — versorgt laut Quelle ChatGPT, Copilot und Alexa mit
  lokalen Daten; oft übersehen, weil kein Google-Produkt.
- Apple Business Connect zusätzlich claimen (laut Quelle wachsende Nutzung).

## Schema (siehe auch `regeln-schema-markup.md` für allgemeine JSON-LD-Regeln)

- Schema ist **kein direkter Rankingfaktor** (von Google bestätigt), aber ermöglicht Rich
  Results und hilft KI-Systemen, Geschäftsdaten zu parsen.
- Richtigen Subtyp statt generischem `LocalBusiness` verwenden: `Restaurant`, `LegalService`,
  `MedicalClinic`/`Dentist`, `AutoDealer`, `RealEstateAgent` — generische Typen verschenken
  Klarheit.
- `geo`-Koordinaten mit mindestens 5 Nachkommastellen angeben.
- Bei Multi-Standort: jede Standortseite eigenes `LocalBusiness`-Schema mit eigener `@id`,
  über `branchOf` mit der `Organization` auf der Startseite verknüpft.

## Branchen-Erkennung (steuert, welche Sonderchecks greifen)

| Branche | Erkennungsmerkmale |
|---|---|
| Restaurant | Speisekarte, Reservierung, "Take-away" |
| Gesundheit | Versicherung, Termine, medizinische Begriffe, "Dr." |
| Recht | Anwalt, Rechtsgebiete, "kostenlose Erstberatung" |
| Handwerk/Home Services | Einsatzgebiet, Notdienst, "kostenloses Angebot", lizenziert/versichert |
| Immobilien | Exposés, Maklerprofil, "Besichtigung" |
| Automotive | Bestand, Probefahrt, Autohaus |

## KI-Sichtbarkeit lokal (Kurzhinweis, Verweis statt Duplikat)

- **Nicht mit `ideen-ai-sichtbarkeit-aeo.md` duplizieren** — dort steht die allgemeine
  AI-Sichtbarkeits-Methodik. Lokal-spezifisch nur ergänzen:
- ChatGPT greift laut Quelle **nicht direkt** auf GBP zu, sondern bezieht lokale Daten aus dem
  Bing-Index, Bewertungsportalen u. Ä. — Bing Places entsprechend wichtiger als es aussieht.
- "Beste von …"-Listen-Platzierungen sind laut Quelle der stärkste Einzelfaktor für
  KI-Sichtbarkeit im Lokalbereich — Digital-PR-Ziel für lokale Kunden (siehe
  `taktiken-linkbuilding-digitalpr.md`).

## Quick Wins (niedriger Aufwand)

1. Primärkategorie in GBP prüfen/korrigieren.
2. NAP-Abgleich Website ↔ Schema ↔ GBP.
3. `LocalBusiness`-Schema mit korrektem Subtyp ergänzen.
4. `tel:`-Link fürs Telefon, Google Maps eingebettet (lazy-loaded wegen Ladezeit).
5. Bing Places und Apple Business Connect claimen.

## Gotchas

- **Swap-Test vor jedem Multi-Standort-Rollout.** Austauschbare Standortseiten sind ein
  bekanntes Abstrafungsmuster (Doorway-Pages) — vor dem Go-Live jede Standortseite einzeln
  gegen den Swap-Test prüfen.
- **Review-Gating nie empfehlen**, auch nicht als "kleiner Trick" — Policy- und Rechtsrisiko.
- **GBP-Link nicht auf die stärkste eigene Seite legen** — Gegenteil der Intuition, aber laut
  Quelle mit Rankingrisiko für genau diese Seite.
- **Local SEO ≠ AI-Sichtbarkeit lokal** — beide Themen getrennt denken, siehe Verweis oben.
