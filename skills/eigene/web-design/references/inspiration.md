# Inspiration & Recherche-Quellen

Websites werden immer nach Ideen untersucht, bevor designt wird. Diese Datei ist der
kuratierte Quellen-Katalog: nutze die spezialisierte Quelle für die konkrete Aufgabe,
nicht die generelle.

Inhalt: 1 Recherche-Ritual · 2 Spezial-Galerien (nach Sektion) · 3 Ganze Websites ·
4 Pattern-Datenbanken · 5 Motion · 6 AI-native Quellen · 7 Csaba-Kissi-Vorrat ·
8 Trend-Feeds

---

## 1. Das Recherche-Ritual (vor dem Design-Read)

1. **3–5 Referenzen sammeln**: eine aus der Branche des Briefs, eine aus einer fremden
   Branche (gegen Category-Reflex), eine mutige (Awwwards/Godly), eine Pattern-Referenz
   (Mobbin/Refero) für die Kernsektion.
2. Pro Referenz eine Zeile: **Was genau ist gut?** (Sektions-Idee, Hover-Detail,
   Typo-Move, Farb-Mut): konkret, nicht "sieht edel aus".
3. Diese Funde fließen in DESIGN.md (Signature-Element, Komponenten-Ideen) ein.

## 2. Spezial-Galerien (beste Quelle pro Sektion)

| Aufgabe | Quelle | Nutzen |
|---|---|---|
| Hero-Sektion | **supahero.io** | Hero-Bibliothek: Layout, Copy, CTA, BG-Logik; Filter nach Stil/Industrie |
| Navigation | **navbar.gallery** | Einzige dedizierte Nav-Galerie: Static, Mega Menu, Sidebar, Full Screen … |
| CTA-Sektion | **cta.gallery** | Call-to-Actions, die konvertieren |
| Mobile-mutig | **loadmo.re** | 360+ unkonventionelle Mobile-Sites (Drag-Physik, experimentell) |
| Social/Launch-Visuals | **posts.design** | "posts worth stealing" |
| 404/Loader/Toggles/Cursor/Text | **Colorion-Netzwerk** (s. Abschnitt 7) | Pure-CSS Snippets, MIT |
| Buttons | **animatedbuttons.colorion.co** | 99 CSS-Buttons |
| Footer | **footer.design** | Dedizierte Footer-Galerie |
| 404-Seiten | **404s.design** | Error-Pages als Design-Moment |
| Sektions-Layouts | **unsection.com** | Sektions-Bibliothek für alle Page-Bereiche |
| Micro-Interactions | **designspells.com** | Design-Details und Micro-Interactions |
| Bento-Grids | **bentogrids.com** | Bento-Kompositionen |

Sektionsweise Inspiration suchen schlägt ganze Sites (Kuration: @tranmautritam).

## 3. Ganze Websites (Level & Stil)

| Quelle | Charakter | Wann |
|---|---|---|
| **awwwards.com/websites** | Jury-bewertete High-End-Sites; Filter nach Tech (WebGL/GSAP/Three.js), Land, Farbe | Mut, Signature-Momente. Achtung: oft Show > Conversion → mit kommerziellen Quellen balancieren |
| **godly.design** | Modernste Startup/SaaS/AI-Sites, Video-Previews zeigen Motion | Aktuelle Premium-Referenz |
| **siteinspire.com** | Ruhigere, editorialere Kurierung; beste Filter (Style/Type/Subject) | Competitive Research: "Was shippen Agenturen in dieser Kategorie?" |
| **landdding.com** | Landing-Galerie, täglich, Tag-Filter | Frische Landing-Muster |
| **curated.design** | Echte Live-Sites nach Kategorie & Style, Lang-Screenshots | Kommerzielle Realität statt Dribbble-Konzepte |
| **umanmade.com** | Nur geprüft menschengemachte Arbeiten | Craft-Benchmark |
| **behance.net** | Case-Studies mit Prozess | Branding + UI im Kontext |

## 4. Pattern-Datenbanken (echte Produkte, konkrete Sektionen)

| Quelle | Nutzen |
|---|---|
| **mobbin.com** | Größte UI/UX-Bibliothek: Screens echter Apps/Web inkl. kompletter Flows. "Wie löst Produkt X Pattern Y?" Filter: UI-Element, UX-Pattern, Kategorie |
| **refero.design** | 112.000+ Screens, getaggt nach Page-Type/Pattern/Element; Volltextsuche im Screen-Text. Beste Recherche für Pricing, Dashboard, Empty State, Funnel |
| **styles.refero.design** ⭐ | 2.000+ maschinenlesbare **DESIGN.md-Dateien** echter Marken (Apple, Mercury, Modal…). In den Kontext legen → deterministische statt generischer Designs. Auch als Format-Vorbild für die eigene DESIGN.md |
| **component.gallery** | 2.600+ Beispiele realer Design-Systeme |

## 5. Motion-Referenzen

- **60fps.design**: 1.200+ Videos echter UI-Animationen (ein Video = eine Interaktion),
  108+ Interaktions-Tags. Easing/Timing Frame für Frame studieren.
- **kinetics.colorion.co**: 153 Spring-Micro-Interactions mit CSS + React + Prompt.
- **loadmo.re**: Mobile-Interaktionen jenseits des Standards.

## 6. AI-native Quellen (Prompt statt Screenshot)

- **21st.dev**: "Copy prompt" pro Komponente (Details: komponenten-ideation.md).
- **kage.design**: echte Produkt-Interfaces zerlegt → fertige Prompts.
- **vibeprompts.dev**: Prompts pro UI-Section.
- **getlayers.ai**: 175+ Templates als Prompt-Kontext, Filter nach Tone/Mood, MCP.
- **aicanvas.me**: animierte Komponenten mit Reproduktions-Prompts.
- **designsystems.one**: 88 Design-Systeme mit Tokens + DESIGN.md.
- **ui-skills.com**: Design-Playbooks für Agents.
- **interfaces.rauno.me**: Interaction-Detail-Checkliste (Craft-Ansporn).

## 7. Csaba-Kissi-Vorrat (@csaba_kissi, GitHub: ckissi, alle MIT, Pure CSS)

| Projekt | Inhalt | Kern-Techniken |
|---|---|---|
| kinetics.colorion.co | 153 Spring-Micro-Interactions (CSS+React+Prompt) | stiffness/damping-Mindset, `cubic-bezier(0.34,1.56,0.64,1)`, `:has()`-Dock, Border-Beam (conic), Skeleton-Shimmer, Marquee-Duplikation |
| texteffects.colorion.co | 81 Text-Effekte | `--ink`-Token-System, per-Letter-Stagger `--i`, Glitch via `data-text` |
| csscursors.colorion.co | 36 Custom Cursor | `mix-blend-mode: difference`, Pointer-Lerp |
| 404.colorion.co | 42 404-Animationen | self-contained, `prefers-reduced-motion`-Fallbacks |
| colorion-toggles / animatedbuttons / circleloaders | 36 Toggles, 99 Buttons, Loader | `:checked`-States, Pseudo-Element-Sweeps, Ein-Element-Spinner |

Prinzipien übernehmen: Pure CSS first · Spring-Denken (zwei Zahlen statt Dauer) ·
tokenisierte Snippets (`--ink`) · Reduced-Motion eingebaut · kleine fokussierte Lösungen.

## 8. Trend-Feeds (X-Design ohne X zu scrollen)

- **bestdesignsonx.com**: stündlich kuratierte X-Design-Posts (6.800+).
- **inspora.design**: tägliche X-Design-Kuration.
- **recent.design**: "best of recent design", täglich (+ Newsletter).
- **posts.design**: Social-Post-Design.
- **vibeindex.dev**: Verzeichnis aktueller Vibe-Coding-Tools.
