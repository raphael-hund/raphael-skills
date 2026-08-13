# Mockup-Brief (GPT Images / imagegen-frontend-web)

Vor dem Brief `design-inspiration.md` ausführen. Nur dort manifestierte lokale
Captures dürfen als visuelle Referenzen in GPT-/Imagegen-Pakete eingehen.

## Harte Regeln

1. **Ein horizontales Bild pro Sektion** — nie mehrere Sektionen in einem Frame.  
2. **Exakte finale deutsche Copy** — keine Umformulierung, kein Lorem.  
3. **Konzept / Layout-Denken** — Hierarchie, Gruppierung, CTA-Klarheit.  
4. Nicht finales Brand-Polish erzwingen ( Raphael iteriert in G-DESIGN mit).  
5. Hero: nicht reflexartig Text-links / Bild-rechts.  
6. Über die Seite: Composition und Background Mode variieren.  
7. Eine grobe Palette über alle Frames einer Richtung konsistent.
8. Referenz-IDs und Attachment-Reihenfolge explizit; URL allein ist kein Input.
9. Gewählte Richtung braucht `mockup-manifest.tsv`; jede Zeile referenziert eine existierende Bilddatei.
10. P0: Desktop 1440×900 und Mobile 390×844; jede Section mindestens einmal lesbar. Full-Page-Captures ersetzen keine Section-Frames.
11. Screens zeigen den Endzustand: Fonts/Bilder geladen, Cookie-State dokumentiert, Reveals vollständig, Reduced-Motion dokumentiert.

## Brief-Template (pro Sektion)

```text
Website-Sektions-Mockup (1 Section, horizontal).

Projekt: […]
Seite: […]
Section-Name: […] (Section X of N)
Designrichtung-Variante: A | B | C — [Kurzname]

Zielgruppe: […]
Section-Job: [hook | proof | educate | convert | …]

Layout:
- Composition anchor: […]
- Background mode: […]
- Container/Grid-Idee: […]
- Primary CTA style: […]

COPY — EXAKT SO (nicht umformulieren):
Eyebrow: "…"
Headline: "…"
Sub: "…"
Body: "…"
CTA1: "…"
CTA2: "…"
Weitere UI-Texte: "…"

Visual:
- wireframe-ish bis semi-fidelity ok
- Bildplätze als klare Flächen oder grobe Motiv-Andeutung
- keine erfundenen Kundenfotos als „echte Referenz“
- Hierarchie und Abstände lesbar
- implementation-friendly (Builder soll Layout verstehen)

Referenzen (lokal tatsächlich anhängen):
- Primär: REF-[…] — nur für […]
- Sekundär: REF-[…] — nur für […]
- Nicht übernehmen: Logo, Copy, Originalassets, exakte Pixelgeometrie

Nicht:
- Lorem
- andere Copy
- mehrere Sektionen in einem Bild
- purple AI-glow Slop
```

## Drei Designrichtungen (G-DESIGN)

Vor den Bildern 3 Richtungen textlich skizzieren (je 5–8 Zeilen):

| | Ton | Layout-Logik | Foto vs Illu | Motion |
|---|---|---|---|---|
| A | … | … | … | … |
| B | … | … | … | … |
| C | … | … | … | … |

Zuerst je Richtung genau einen Hero mit identischer Copy und identischem Viewport
erzeugen. Raphael vergleicht A/B/C, wählt und iteriert danach weitere Sections.

## Manifest der gewählten Richtung

```tsv
route	section_id	section_name	viewport	file	copy_source	copy_sha256	reduced_motion	cookie_state	data_state	review
/	H00	Hero	1440x900	generated/A/home/H00-desktop.png	06-seiten/01-home.md#hero	<sha256>	reduce	dismissed	normal	PASS
```

Pflicht: `review=PASS`, Datei vorhanden, genau eine Section, Copy lesbar und wortgleich.
Loading/Empty/Error/Success werden als getrennte Frames geführt, nicht als Collage.
