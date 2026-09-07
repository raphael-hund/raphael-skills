# Sitemap- und Abschnittsplanung für größere Websites

Diese Referenz vertieft größere Sitemap-/Abschnittsplanungen. Der aktuelle
Auftrag begrenzt die Routen; eine kleine Änderung braucht dieses Format nicht.
`rolle-plan.md` bestimmt den Einstieg, `website-plan` einen gegebenenfalls
benötigten maschinellen Planvertrag. Inhalt und Beispiele hier helfen dabei,
die beauftragten Seiten ausreichend konkret zu beschreiben.

Herkunft: Sorglos-Projekt, 05.08.2026. Das damalige ausführliche Muster liegt in
`/root/website-projects/sorglos-entruempeln-next/docs/masterplan/75-sitemap-sections-komplett.md`.
Es ist ein Kundenbeispiel, kein Pflichtumfang für andere Projekte.

## Fünf Bestandteile eines ausführlichen Plans

```
Schritt 1  VOLLE Sitemap        — beauftragte Seiten und ausdrücklich gewünschte Ausbaustufen
Schritt 2  Section-Design-System — Layer + Layout-Patterns EINMAL definieren
Schritt 3  Section-Plan je Seite — Inhalt, Layout und bei Bedarf Pattern/Bild
Schritt 4  Querschnitt           — Funnel/CTA-System, Bildliste, interne Links
Schritt 5  Bau-Reihenfolge       — Abhängigkeiten und passende Nachweise
```

## Schritt 1 — Volle Sitemap (Denkfehler-Schutz)

**Zielbild im beauftragten Umfang planen.** Für eine ausdrücklich gewünschte
Ausbaustrategie zusätzlich Kandidaten und Stufen betrachten:

1. Alle Seitenkandidaten sammeln: Kern-Services, Preis-/Kosten-Seite, Über-uns,
   B2B-Varianten, Orts-/Stadtteilseiten, Geld-/Zuschuss-Themen, Ratgeber/Blog.
2. Jeden Kandidaten entscheiden: **bauen (Stufe n)** oder **bewusst NICHT bauen —
   mit einem Satz Begründung** (Kannibalisierung, Duplikat, Risiko). Die
   Nicht-bauen-Liste gehört ins Dokument.
3. In Ausbaustufen schneiden (Stufe 1 = Kern-Silo, 2 = Vertrauen/Ausbau,
   3 = Ortsseiten, 4 = Content). Jede Stufe hat ein Gate vor der nächsten.

**Pflicht-Ausgabe:** ASCII-Baum mit Stufen-Labels + URL-Map-Tabelle
(Seite | URL | Parent | Nav-Ort | Stufe | Ziel-Keyword) + Navigations-Spec
(Header wörtlich, Footer-Spalten, Breadcrumb) + Verlinkungsregeln
(Hub-&-Spoke, „jede Seite ≥ 3 eingehende interne Links", Ortsseiten nie
untereinander verlinken).

**Ortsseiten nur mit Doorway-Schutz:** Template mit ≥ 40 % einzigartigem Inhalt
über feste Lokal-Slots (Ort-Beschreibung, lokale Entsorgungs-/Behörden-Fakten,
lokaler Case) + Recherche-Checkliste pro Ort. Ohne Recherche keine Ortsseite.

## Schritt 2 — Vorhandenes visuelles System und nötige Layouts

Kundenrichtung, Tokens und bereits freigegebene Komponenten referenzieren.
Neue Flächen-/Typo-/Layoutregeln nur entscheiden, wenn der Auftrag diese Arbeit
verlangt. Offene Raster, Split-Hero, Karten oder Prozessschritte sind mögliche
Muster, keine Mindestliste. Wiederverwendete Patterns nach Bedarf benennen;
keine feste Layerzahl oder Wiederholungsquote. Relevantes Verhalten bei anderen
Breiten an den tatsächlich verwendeten Komponenten beschreiben.

## Schritt 3 — Section-Plan je Seite (die eigentliche Arbeit)

**Jede Seite bekommt einen Kopfblock + eine Sektionstabelle. Pflicht-Spalten:**

```
Kopf:  Besucher (wer, in welchem Zustand) · Job der Seite (der EINE Satz,
       den der Besucher danach glauben soll)
Tabelle je Sektion:
  # | Sektion | Layer | Pattern | Inhalt KONKRET | Bild
```

„Inhalt KONKRET" heißt: nicht „USPs zeigen", sondern die tatsächlichen 3 Karten
mit ihren Aussagen, die tatsächlichen Tabellenzeilen, die FAQ-Fragen wörtlich.
Wenn Texte zum Auftrag gehören, liefert der geltende Copy-Owner ausformulierte
Hero-Copy. Sonst enthält der Plan Textbedarf, Quellen und vorhandene freigegebene
Copy; ein Planauftrag erzeugt keine ungefragte Textproduktion.
Fehlende Fakten (Preise, Zahlen) werden als benanntes **FAKT-GATE** geführt
(z. B. „Ruben-Gate", „50 vs 60 Google-Bewertungen", „24 vs 28 Stunden"),
werden nach ihrer Wirkung eingeordnet: bereits verlangte Inhalte müssen auch
in einer Vorschau stimmen; bewusst provisorische Aussagen bleiben markiert.
Custom-Domain noch nicht an Vercel ist Ops, kein Plan-Blocker.

**Dramaturgie je Seite:** Die Reihenfolge folgt dem Seitenjob und tatsächlichen
Informationsbedarf. Angebot, Beweis, Person und FAQ sind mögliche Bausteine;
keine davon wird allein wegen eines festen Skeletts eingefügt.

## Schritt 4 — Querschnitt

- **Ein Funnel-System:** eine Komponente, pro Seite nur Prefill + `lead_source` —
  als Tabelle festhalten.
- **Eine Bild-Produktionsliste** über alle Seiten (ein Generierungslauf,
  Stilhinweise aus `bildgenerierung.md`), sofern neue Bilder beauftragt sind.
- Interne-Link-Matrix, sofern nicht schon in Schritt 1 vollständig.

## Schritt 5 — Bau-Reihenfolge

Schritte mit passendem Nachweis nach `qa-faecher.md` und echten Abhängigkeiten.
Gemeinsame Komponenten haben einen Owner; abhängige Seiten folgen danach.
Unabhängige Teile dürfen parallel entstehen. Bereits autorisierte Arbeit
braucht keine zusätzliche Freigaberunde.

## Abnahme-Checkliste (der Plan ist erst fertig, wenn alles ✅)

- [ ] Beauftragte Sitemap, bei Strategieauftrag zusätzlich gewünschte Ausbaustufen
- [ ] URL-Map-Tabelle + wörtliche Header/Footer/Breadcrumb-Spec
- [ ] Bestehendes visuelles System referenziert; neue Layoutentscheidungen nur bei Bedarf
- [ ] JEDE Seite: Besucher + Job + Sektionstabelle mit konkretem Inhalt je Sektion
- [ ] Copybedarf und Quellen je Seite; ausformulierte Copy nur wenn beauftragt
- [ ] Faktenlücken mit Wirkung auf den konkreten Auftrag benannt
- [ ] Benötigte Nutzerwege und Assets beschrieben
- [ ] Bau-Reihenfolge mit tatsächlichen Abhängigkeiten und passenden Nachweisen
