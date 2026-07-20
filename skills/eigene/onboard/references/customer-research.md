# Customer-Research-Methodik (icp-synth/proof-miner)

> Kondensiert aus coreyhaines31/marketingskills, `skills/customer-research/SKILL.md` +
> `references/source-guides.md` sowie `skills/competitor-profiling/SKILL.md` (MIT-Lizenz).
> Liefert die Methodik für Schritt 3 (icp-synth) und 5 (proof-miner) in `loop1-ablauf.md`.

## Zwei Modi

1. **Bestehende Assets analysieren** — Transkripte, Reviews, Support-Tickets, die der
   Kunde schon hat (liegen in `client-<name>/raw/`).
2. **Digital-Watering-Hole-Recherche** — fehlt Rohmaterial, aktiv suchen (Reddit, G2,
   Foren, Kommentare) nach ungefiltertem O-Ton zum Problemfeld.

Meistens beides kombinieren. Zuerst klären, was vorliegt, dann entscheiden, wie viel
Modus 2 zusätzlich nötig ist.

## Extraction-Framework (pro Quelle)

Für jedes Transkript/jede Review/jeden Tickettext extrahieren:

1. **Job to be Done** — funktional (die Aufgabe selbst), emotional (wie er sich fühlen
   will), sozial (wie er wahrgenommen werden will).
2. **Pain Points** — was ist frustrierend/kaputt/unzureichend — unaufgefordert genannte
   Pains mit emotionaler Sprache priorisieren.
3. **Trigger-Events** — was hat sich geändert, dass er jetzt eine Lösung sucht (Team-
   Wachstum, verpasstes Ziel, peinlicher Vorfall, Wettbewerber macht etwas Neues).
4. **Gewünschtes Ergebnis** — Erfolg in seinen eigenen Worten, wörtlich zitiert, nicht
   paraphrasiert.
5. **Sprache/Vokabular** — genaue Wörter/Phrasen ("Wir sind in Excel-Tabellen ertrunken"
   schlägt "ineffizienter manueller Prozess") — das ist der Rohstoff für VOICE.md und
   für ads' voc-mine.
6. **Betrachtete Alternativen** — was sonst probiert/angeschaut (inkl. "nichts tun",
   selbst gebaut, jemanden eingestellt).

## Confidence-Level (Pflicht vor jeder Aussage — deckt sich mit proof-miners "Beleg-Pflicht")

| Confidence | Kriterium |
|---|---|
| **Hoch** | Thema in 3+ unabhängigen Quellen, unaufgefordert genannt, über Segmente konsistent |
| **Mittel** | Thema in 2 Quellen, oder nur auf Nachfrage, oder auf ein Segment begrenzt |
| **Niedrig** | Eine Quelle — könnte Ausreißer sein, braucht Validierung |

Recency-Fenster: Quellen der letzten 12 Monate stärker gewichten — ein 3 Jahre altes
Transkript kann ein anderes Produkt/eine andere Käuferschicht beschreiben. Sample-Bias
mitdenken: Online-Reviewer sind meist Power-User mit starker Meinung; Support-Tickets
sind Problem-verzerrt, nicht Wert-verzerrt; Reddit ist technischer/skeptischer als der
Durchschnittskäufer. **Mindeststichprobe: keine Persona/Aussage aus <5 unabhängigen
Datenpunkten pro Segment bauen.**

## Digital Watering Holes — wo suchen

| ICP-Typ | Primärquellen |
|---|---|
| B2B/technisch | Reddit (rollenspezifische Subs), G2/Capterra, Hacker News, LinkedIn |
| KMU/Gründer | Reddit r/entrepreneur, r/smallbusiness, lokale Facebook-Gruppen |
| B2C/Konsument | App-Store-Reviews (1–3 Sterne), Reddit-Hobby-Subs, YouTube-Kommentare |
| Handwerk/lokale Dienstleister | Google-/Trustpilot-Reviews, lokale Facebook-Gruppen, Branchenforen |

Schnellentscheidung: Produktkategorie vorhanden → zuerst G2/Trustpilot-Reviews (eigene +
Wettbewerber). Rohsprache gebraucht → Reddit/Kommentare. Trigger-Events gebraucht →
LinkedIn-Posts, Stellenausschreibungen.

Für jeden Fund erfassen: Quelle (Plattform, Link/Ort, Datum), wörtliches Zitat, Kontext
(was hat den Kommentar ausgelöst), Sentiment, Themen-Tag (Pain/Trigger/Outcome/Sprache).

## Persona-Struktur

```
## [Rolle/Segment]
**Profil**: Branche, Betriebsgröße, Rolle
**Primärer Job to be Done**: [ein Satz]
**Trigger-Events**: [1-2]
**Top-Pains**: [in seinen Worten, wenn möglich]
**Gewünschtes Ergebnis**: [woran misst er Erfolg]
**Einwände/Ängste**: [was ihn zögern lässt]
**Betrachtete Alternativen**: [Wettbewerber/DIY/nichts tun]
**Schlüssel-Vokabular**: ["wörtliche Phrase 1", "wörtliche Phrase 2"]
```

## Persona-Anti-Patterns (harte Qualitätsbremse)

- **Keine niedliche Namensgebung** ("Marketing-Maria") — reine Ablenkung, kein Mehrwert.
- **Nicht über Segmente hinweg mitteln** — eine Persona, die alle repräsentiert,
  repräsentiert niemanden.
- **Nichts erfinden** — keine Datenlage zu einem Feld → leer lassen, nicht raten.
  (Deckt sich 1:1 mit r-onboards "Proof ohne Zitat = Block, kein Weichzeichnen".)
- **Vierteljährlich revisitieren** — Personas verfallen mit Markt/Produkt.

## Neue Kategorie ohne First-Party-Reviews (frühe Kunden)

Kein Erfinden — stattdessen über Proxy-Quellen nach außen gehen, in Reihenfolge:
eigenes Differenzierungsmerkmal (Hypothese, als solche markiert) → Reviews direkter
Wettbewerber → vergleichbare Produkte auf Marktplätzen (Amazon/App-Store für
angrenzende Lösungen) → angrenzende Marken, die dieselbe Zielgruppe teilen. Jede so
gebaute Persona als **vorläufig** markieren (Proxy-Quelle nennen), durch First-Party-
Evidenz ersetzen, sobald echte Reviews/Interviews da sind.

## Wettbewerbs-Recherche (leichte Variante, ohne API-Tooling)

Für den Wettbewerbs-Teil des Dossiers reicht ein manueller Quick-Scan statt eines vollen
Firecrawl/DataForSEO-Setups: Homepage + Pricing-Seite der wichtigsten 2-3 Wettbewerber
lesen und erfassen — Value-Proposition/Headline, Zielgruppen-Signale, Preis-Tiers, 3-5
Stärken/Schwächen mit Quelle (Screenshot/Zitat). Immer mit Datum versehen (Snapshot, kein
Dauerzustand). Nur bei ausdrücklichem Kundenwunsch nach tieferer SEO-Konkurrenzanalyse an
`seo` übergeben (dort liegt das Comparison-Page-Format).

## Deliverable-Formate

Je nach Bedarf: Synthese-Report (Themen/Zitate/Implikationen), VOC-Zitat-Bank (nach Thema
sortiert, für copywriting/ads), Persona-Dokument, Wettbewerbs-Kurzprofil. Vor
Generierung fragen, welches Format gebraucht wird — nicht alle auf einmal liefern.
