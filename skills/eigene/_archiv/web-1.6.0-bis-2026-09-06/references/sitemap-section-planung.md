# Sitemap- & Section-Planung — das verbindliche Step-by-Step-Format

> Entstanden 05.08.2026 nach Raphael-Rüge im Sorglos-Projekt: Ein Plan mit „5 Unterseiten
> und je einer Sektionsliste" ist ZU DÜNN. Dieses Dokument definiert, was ein fertiger
> Website-Plan enthalten MUSS, bevor irgendetwas gebaut wird. Es ergänzt
> `informationsarchitektur.md` (dort: IA-Wissen/Muster — hier: der Arbeitsablauf und
> das Pflicht-Ausgabeformat). Muster-Beispiel in voller Tiefe:
> `/root/website-projects/sorglos-entruempeln/docs/masterplan/75-sitemap-sections-komplett.md`.

## Die 5 Schritte (Reihenfolge fix, kein Überspringen)

```
Schritt 1  VOLLE Sitemap        — alle Seiten, die die Site je braucht, in Ausbaustufen
Schritt 2  Section-Design-System — Layer + Layout-Patterns EINMAL definieren
Schritt 3  Section-Plan je Seite — jede Sektion: Inhalt konkret + Layer + Pattern + Bild
Schritt 4  Querschnitt           — Funnel/CTA-System, Bildliste, interne Links
Schritt 5  Bau-Reihenfolge       — Schritte mit verify:-Gates und Freigabepunkten
```

## Schritt 1 — Volle Sitemap (Denkfehler-Schutz)

**Regel: Erst das VOLLE Zielbild denken, dann in Stufen schneiden.** Der klassische
Fehler ist, nur die Seiten zu planen, die sofort gebaut werden — das produziert eine
Mini-Site ohne Wachstumspfad. Stattdessen:

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

## Schritt 2 — Section-Design-System (Layer + Patterns)

Bevor Seiten geplant werden: das Vokabular EINMAL definieren, damit jede Sektion
in Schritt 3 mit einem Wort beschreibbar ist statt jedes Mal neu erfunden.

**Layer (Hintergrund-Ebenen) — 4 Stück, projektspezifisch einfärben:**

| Layer | Rolle | Regel |
|---|---|---|
| L0 Papier | Grundfarbe, ruhige Inhalte | Standard |
| L1 Tonfläche | warmes Full-bleed-Band als Rhythmus-Brecher | nie 2× direkt hintereinander |
| L2 Karte | weiße Karte mit Schatten für alles Zählbare | liegt AUF L0/L1 |
| L3 Akzent | dunkle Conversion-Fläche | GENAU 2× pro Seite: Hero-Funnel + Abschluss-CTA |

**Layout-Patterns — benannte Bausteine (P1…Pn), je mit Desktop- UND Mobil-Aufbau:**
mindestens Split-Hero, Karten-Reihe, Text+Bild-Split (gespiegelt alternierend),
Step-Leiste, Tabelle, Akkordeon, Review-Strip, CTA-Band. Plus feste Maße
(Content-Breite, Text-Spalten-Max, Sektions-Padding D/M, Schriftgrößen,
Touch-Ziele) und die Sektions-Anatomie
(Eyebrow → H2-als-Antwort → Answer-first-Lead → Pattern-Körper → max. 1 Ausleitung).

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
Hero-Copy (Eyebrow/H1/Sub/Checks) wird ausformuliert, nicht beschrieben.
Fehlende Fakten (Preise, Zahlen) werden als benanntes **FAKT-GATE** geführt
(z. B. „Ruben-Gate", „50 vs 60 Google-Bewertungen", „24 vs 28 Stunden"),
blockieren aber nur den Zahlen-Launch, nie den Bau und nie die Kunden-Vorschau.
Custom-Domain noch nicht an Vercel ist Ops, kein Plan-Blocker.

**Dramaturgie-Prüfung je Seite:** Ein gemeinsames Skelett
(Hero → Kernangst-Sektion → Substanz → Beweis → Mensch → FAQ → Abschluss-Funnel),
aber pro Seite EINE andere Kernangst, die Sektion 2 abräumt. Seiten dürfen
kürzer sein (pragmatische Zielgruppe = weniger Sektionen), nie länger als nötig.

## Schritt 4 — Querschnitt

- **Ein Funnel-System:** eine Komponente, pro Seite nur Prefill + `lead_source` —
  als Tabelle festhalten.
- **Eine Bild-Produktionsliste** über alle Seiten (ein Generierungslauf,
  Stil-Referenz-Doktrin aus `bildgenerierung.md`). Launch-Regel: Bilder blockieren nie.
- Interne-Link-Matrix, sofern nicht schon in Schritt 1 vollständig.

## Schritt 5 — Bau-Reihenfolge

Nummerierte Schritte, jeder mit `verify:`-Zeile (Screenshot-Sweep, Link-Check,
Review-Instanz) und expliziten Freigabe-Gates (pro Stufe, nicht pro Seite).
Schritt 0 ist immer das Fundament: Nav/Footer/Breadcrumb/Funnel-Komponente/
Section-Baukasten — erst dann Seiten.

## Abnahme-Checkliste (der Plan ist erst fertig, wenn alles ✅)

- [ ] Volle Sitemap inkl. Ausbaustufen UND Nicht-bauen-Liste mit Begründungen
- [ ] URL-Map-Tabelle + wörtliche Header/Footer/Breadcrumb-Spec
- [ ] Layer- und Pattern-Vokabular definiert (mit Mobil-Verhalten + Maßen)
- [ ] JEDE Seite: Besucher + Job + Sektionstabelle mit konkretem Inhalt je Sektion
- [ ] Hero-Copy je Seite ausformuliert
- [ ] Fakten-Gates benannt (blockieren Zahlen, nicht Bau, nicht Vorschau)
- [ ] Funnel-/lead_source-Tabelle + Bildliste
- [ ] Bau-Reihenfolge mit verify: und Freigabe-Gates
