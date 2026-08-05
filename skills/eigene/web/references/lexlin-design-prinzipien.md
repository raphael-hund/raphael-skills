# Lex Lin Design-Prinzipien (Leon Lin / taste-skill)

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

## Referenzen

- taste-skill Repo: https://github.com/Leonxlnx/taste-skill (MIT, vendored als taste-kern.md)
- SKILL.md raw: https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/taste-skill/SKILL.md
- Profil: https://x.com/LexnLin
- Ressourcen-Tweet (Basis der frontend-referenzbibliothek.md): https://x.com/LexnLin/status/2083898950755471520
