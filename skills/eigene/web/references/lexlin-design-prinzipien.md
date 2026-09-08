# Lex Lin Design-Prinzipien (Leon Lin / taste-skill)

**Verbund (08.09.2026):** Weitere Creator-Methoden mit Attribution: [creator-methods.md](creator-methods.md).

**Quelle:** Recherche 2026-08-04 (Librarian-Brief). Leon "Lex" Lin
(x.com/LexnLin) ist der Autor des taste-skill
(github.com/Leonxlnx/taste-skill), der bereits als `taste-kern.md` im
design-Skill vendored ist. Diese Datei ergaenzt die dort fehlenden
konkreten Arbeitsregeln aus seiner Praxis. Bei Konflikt gewinnt
`design-doktrin.md`.

**Wann laden:** In `art-direction`, wenn die Flaeche Landing/Brand ist und
"premium, nicht Template" gefordert wird.

## Stil-Signatur

- Editorial/Premium-Landing-Sensibilitaet statt SaaS-Baukasten.
- Display-Sans mit Charakter, enges Tracking, kompaktes Leading.
- Grosse, kurze Headlines; Copy wird gekuerzt statt Komposition geschrumpft.
- Asymmetrische, wechselnde Layouts statt wiederholter zentrierter Sektionen.
- Grosszuegiger Whitespace, eher niedrige bis mittlere Dichte.
- Neutrale Basis + EINE kontrollierte Akzentfarbe; keine Auto-Gradients.
- Cards nur wenn Elevation Hierarchie kommuniziert; sonst Border/Whitespace.
- Motion gezielt: Hover = Affordance, Scroll = Narrativ, Physik nur begruendet.

## 15 Arbeitsregeln

1. Design-Read zuerst: Zielgruppe, Seitentyp, Vibe, Constraints VOR Komponentenwahl.
2. Display-Sans mit Persoenlichkeit; nie Inter als Default.
3. Hero-Headline max ~2 Zeilen; erst Copy kuerzen, dann Layout aendern.
4. Hero = EIN Moment: kleines Label, Headline, kurzer Absatz, eine Primaeraktion.
5. Hero-Support-Copy unter ~20 Woertern.
6. Hero-Konstruktion: split, links-ausgerichtet, asymmetrisch oder scroll-pinned — nicht automatisch zentriert.
7. Drei Dials explizit setzen: VARIANCE (Layout), MOTION, DENSITY.
8. Grosse Raumintervalle als Luxussignal; ein Fokuselement pro Viewport.
9. Palette einfrieren: Neutrals + 1 Akzent; kein Akzent-Drift.
10. Layout-Familie pro Sektion wechseln; keine wiederholten Card-Grids/Zickzacks.
11. Eyebrows sparsam (~1 pro 3 Sektionen); Headlines tragen die Hierarchie.
12. Cards nur bei echtem Containment-Bedarf; sonst Divider/Whitespace.
13. Corner-Radius-Logik seitenweit konsistent (sharp ODER soft ODER pill).
14. Motion bedeutungsvoll: keine Deko-Animation ohne Funktion; Reduced-Motion Pflicht.
15. Bilder art-direzieren; keine Fake-Screenshots, keine generische AI-Aesthetik.

## Methoden-Wahl und Arbeitsweise (Aufwands-Entscheidung)

**Quelle:** Leon Lin, X-Post 2026 (paraphrasiert, kein Zitat).

| Methode | Dauer | Qualitaet | Einsatz | Workflow |
|---|---|---|---|---|
| Skill-only | schnell | ok | Template-Niveau, Zeitdruck | einen Brief 2-3x prompten, nachfixen, ausliefern |
| Component-by-Component | langsam | beste | Premium, nichts Template-artiges | jede Sektion einzeln bauen, mit benanntem Referenz-Stil, nie die Ganzseite |
| Inspiration Board | mittel | gut | Mittelweg | mehrere Referenz-Screenshots kuratieren, KI kombiniert den Stil (kein Clone), Brief steht am Anfang |

**Regel:** nie ein Ganzseiten-Prompt. Immer eine Sektion nach der anderen, mit
benanntem Referenz-Stil.

### Component-by-Component Arbeitsweise

Brief zuerst in Sektionen zerlegen. Dann pro Sektion:

- **A** — einen Referenz-Stil waehlen und screenshotten.
- **B** — ein One-Shot-Prompt pro Sektion: "Erstelle Hero [/Cards/FAQ/...]
  basierend auf diesem Stil [...], angepasst auf unser Branding [...]".
- **C** — nie den ganzen Brief in ein einziges Prompt geben.
- **D** — Vorteil: bessere KI-Qualitaet und volle Kontrolle ueber jede Sektion.

### Image-first (vierte Methode, Premium-Frontend)

**Quelle:** Leon Lin, X 2026 (Posts 2048791596137632126, 2050179260892029179) —
Ideen-Merge, kein Zitat.

Wenn Coding-Agenten allein zu generischen Landings tendieren: **visuelle
Design-Phase vor Code** trennen.

1. **Ein Bild pro Sektion** generieren (nicht ein Fullpage als einzige Vorlage).
2. Mehrere Runs / Chats; beste Hero/Feature/CTA-Teile mischen.
3. Assets aus den Bildern **generate and extract** (nicht nur croppen), BG
   entfernen, dann AVIF/WebP ins Projekt (`bildgenerierung.md` / `bilder.mjs`).
4. Coding-Agent: Sektion fuer Sektion — Referenzbild + extrahierte Assets +
   Dateinamen + Stack; **Assets nicht neu erfinden**.
5. Screenshot → gezieltes Feedback (Alignment, Spacing, Responsiveness, Brand,
   Smoothness) → naechste Sektion.
6. Neue Website-Illustrationen (Higgsfield): Seiten-Screenshots und
   hochgeladene Stilbilder = **Stilkontext**. Echte Map/Schnitt/Ort =
   **Inhaltkontext**. Siehe `bildgenerierung.md` Abschnitt
   „Neue Illustration vs. wiederverwenden“.

Abgrenzung: Bild = Vorlage ohne URL → zusaetzlich `rebuild-from-image.md`.
URL-Clone → `web-clone-playbook.md` zuerst. Image-Skills (optional, extern):
Leonxlnx taste-skill `imagegen-skills/frontend-web` und `frontend-mobile` (MIT).

### Inspiration-Qualitaet

Schlechte Referenzlisten produzieren generische Sites. Inspiration kuratieren
(warum Layout/Spacing/Typo gut ist), in Ordnern (Hero, Pricing, Cards…), nie
ganze Designs klonen. Ressourcen-Tweet + Router statt Link-Dump im Build.

## Komplement: Damien Ghader

Fuer Design-System-Schichten (Foundations→Components→Composition), Brandbook-
Spec mit Hex/Grid, Ultra-Premium-Prompt-Skelett (Product·Stack·Aesthetic) und
SEO/Conversion-Section-Order: **`damien-design-methodik.md`** laden. LexLin =
Taste/Dials/Sektionsbau; Damien = System + Prompt-Architektur.

## Referenzen

- taste-skill Repo: https://github.com/Leonxlnx/taste-skill (MIT, vendored als taste-kern.md)
- SKILL.md raw: https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/taste-skill/SKILL.md
- Profil: https://x.com/LexnLin
- Ressourcen-Tweet (Basis der frontend-referenzbibliothek.md): https://x.com/LexnLin/status/2083898950755471520
- Image-to-code: https://x.com/LexnLin/status/2048791596137632126
- Image-to-code Beispiel: https://x.com/LexnLin/status/2050179260892029179
- Methoden-Post: https://x.com/LexnLin/status/2076422557180608888
