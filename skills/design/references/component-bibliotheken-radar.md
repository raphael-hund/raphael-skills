# Component-Bibliotheken-Radar — externe Quellen als Rezeptkarten, nie als Installation

**Herkunft:** destilliert aus dem vendorten Fremd-Repo
`webdesigner-pro` (Skills `webdesign-component-registry` und dessen Wiki-Seite
`external-skill-libraries.md`), NICHT als Ganzes uebernommen. Details im
Vendor-Repo: `/root/tools/vendor/webdesigner-pro/skills/webdesign-component-registry/`.

**Wofuer:** Bevor eine UI-Komponente, ein Motion-Pattern oder ein visueller
Effekt komplett neu erfunden wird — kurz pruefen, ob eine kuratierte externe
Quelle das Muster schon sauber dokumentiert. Ersetzt keine eigene Umsetzung,
sondern verhindert Neuerfindung des Rads UND unreflektiertes Copy-Paste.

## Der Kernpunkt: Rezeptkarte lesen, nicht Repo installieren

Externe Skill-Bibliotheken (siehe Katalog unten) sind Nachschlagewerke. Man
liest genau die eine passende Karte (`SKILL.md` bzw. Provider-Eintrag), notiert
Lizenz und Quelle, und setzt das Prinzip mit eigenen Projekt-Tokens neu um —
nie den ganzen fremden Katalog pauschal laden oder installieren.

## Katalog (Stand Vendor-Repo, 2026-07)

| Quelle | Lizenz | Rolle |
|---|---|---|
| **MengTo/Skills** (github.com/MengTo/skills) | MIT, ~75 Skills unter `agent-skills/<kategorie>/<name>/SKILL.md` | Rezeptkarten fuer konkrete Effekte: GSAP-Scroll-Storytelling, WebGL-Hintergruende, CSS-Details (`beautiful-shadows`, `progressive-blur`), Layout-Systeme, ~20 Visual Styles |
| **emilkowalski/skills** (github.com/emilkowalski/skills) | MIT, 6 Skills | Animations-/Design-Taste aus Vercel/Linear-Arbeit — bereits eigenstaendig in unseren `design`-Skill eingeflossen (`apple-fluid-interfaces.md`, `animation-vokabular.md`, `motion-audit-workflow.md`) |
| **Leonxlnx/taste-skill** (tasteskill.dev) | Open Source | Upstream-Inspiration unseres bereits kuratierten `taste-kern.md` — bei neuen Releases gegen unsere Anti-Slop-Taxonomie abgleichen |
| **Animmaster Lib** (animmasterlib.dev) | kommerziell, Lizenz ungeklaert; Komponenten sind Nachbauten fremder Website-Designs | NUR Taxonomie-/Inspirationsquelle (Kategorienraster fuer Motion-Arten: Scroll, Hero, Hover, Page Transitions, WebGL Shaders). NICHT als Code-Quelle fuer Kundenprojekte |
| beUI, Amicro, transitions.dev, FeralUI, 21st.dev, shadcn | je nach Provider unterschiedlich | Component-/Motion-/Gradient-Provider, im Zweifel `license_gate` pruefen bevor irgendetwas verbaut wird |

## Nutzungsregeln

1. Bedarf konkret benennen (Component, Section, Motion, Visual, Integration) —
   dann gezielt suchen, nicht breit browsen.
2. Lizenz IMMER zuerst pruefen. MIT erlaubt Adaption mit eigenen Tokens ohne
   1:1-Copy. Ohne pruefbare Lizenzdatei gilt "reference-only": nur das
   beobachtete Prinzip lernen, keinen fremden Code, keine Assets kopieren.
3. Hoechstens drei Kandidaten pro Bedarf tief pruefen, Rest verwerfen.
4. Jede genutzte Karte dokumentieren: Quelle/URL, Stand, Pick-Grund,
   Reject-Grund fuer Alternativen. Ohne das keine Uebernahme.
5. FeralUI und aehnliche Quellen mit ungeklaerter Lizenz bis zu einer
   pruefbaren Lizenzdatei nur im Browser ansehen, danach eigenstaendig im
   Projektstack neu umsetzen (Geometrie/Mischung/Koernung nachbauen, nicht
   Assets extrahieren).
6. Das Plan/Execute-Split-Muster (starkes Modell auditiert und plant,
   guenstiges Modell fuehrt aus) bestaetigt unsere bestehende Trennung
   Review vs. Builder — bei Nachbau-Aufgaben beibehalten.

## Falscher Fall (Warnsignal)

Alle ~75 MengTo-Skills pauschal in den Kontext laden, oder eine
Animmaster-Komponente direkt in ein Kundenprojekt kopieren, ohne Lizenzcheck
und ohne Referenzkarte mit Pick-Grund. Schaden: widerspruechliche Regeln
ueberlagern die Projektregeln, ungeklaert lizenzierter Nachbau-Code landet
beim Kunden.
