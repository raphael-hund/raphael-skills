# Impeccable-Regelwerk (pbakaus/impeccable)

Komplementär-Referenz zum Web-Design-Skill: Visitor-Modes, Detector-Regeln, Intensitäts-Kommandos, Audit-Frameworks und der new-work-Prozess aus impeccable.style / github.com/pbakaus/impeccable. Typo-Floors, OKLCH-Grundlagen, Motion-Doktrin und der Anti-Slop-Katalog stehen in `design-doktrin.md`, `motion.md` und `review-qa.md`; hier steht nur, was jene Dateien nicht decken.

**Inhalt:** 1 Visitor-Modes · 2 Detector-Regeln (61) · 3 Craft Floor · 4 Bolder/Quieter/Distill · 5 Delight · 6 Clarify/UX-Copy · 7 Hardening · 8 Onboarding · 9 Adaptation · 10 Performance · 11 Overdrive · 12 Audit & Critique · 13 new-work · 14 Design-System-Doku

Grundprinzipien über allem:

- **Design Specificity:** Könnte ein fremdes Produkt dieses Design unverändert übernehmen? Wenn ja, überarbeiten. Für Product UI umgekehrt: Würde ein kategorie-fluenter Nutzer dem Interface sofort vertrauen (earned familiarity)?
- **The brief wins:** Ein gepinnter Brief (Ästhetik, Ära, Material, Fonts, Palette) schlägt jede Slop-Warnung. Den Brief Richtung eigenem Geschmack umzuleiten ist Scheitern.
- **Verifizieren in gebundenen Runden** (max. 2 Inspektionsrunden), keine Endlos-Self-QA. Ein sauberer Detector-Run ist Evidence, kein Beweis: die gerenderte Seite ansehen bleibt Pflicht.
- **Wahrheit:** Kommerzielle und faktische Claims (Preise, Kunden, Benchmarks, Capabilities) sind unerfindbar. Demonstrations-Daten sind autorisierbar, müssen aber als synthetisch labelbar sein.

## 1. Die vier Visitor-Modes

Der Mode beschreibt, wie Erfolg für den Besucher DIESES Surface aussieht. Pro Surface wählen, nicht pro Produkt: die Landingpage eines Tools ist Persuade, seine Doku ist Read.

| Mode | Erfolg des Besuchers | Surfaces | Design-Konsequenz |
|---|---|---|---|
| **Persuade** | Entscheidet und handelt | Landingpages, Marketing, Pricing | Design ist das Produkt. Opening macht das Angebot verständlich und begehrenswert, zeigt klare Aktion, beweist etwas, das nur dieses Produkt beweisen kann. Echtes Imagery, wenn der Brief es braucht. |
| **Operate** | Erledigt eine Aufgabe | App-UI, Dashboards, Settings, Tools | Scanability, Konsistenz, Plattform-Erwartungen und reale Nutzungsszene schlagen Expression. Marke lebt in präzisen Details. Das Tool verschwindet in der Aufgabe. |
| **Read** | Versteht etwas | Docs, Artikel, Guides | Struktur für Verständnis, dann Leseerlebnis, in dem man bleiben will. |
| **Experience** | Ist im Werk selbst | Portfolios, Galerien | Das Artefakt führt ab dem ersten Viewport; das Interface tritt zurück. |

### Operate-Tiefenregeln

Der Failure-Mode von Product UI ist nicht Flachheit, sondern **Zwecklos-Fremdheit**: überdekorierte Buttons, inkonsistente Form-Controls, gratuite Motion, Display-Fonts in Labels, erfundene Affordances.

- **Typografie:** EINE Familie reicht oft. **Fixe rem-Skala, kein fluid clamp.** Skalen-Ratio **1.125–1.2** zwischen Steps. Prose 65–75ch, Tabellen dürfen 120ch+.
- **Farbe:** Default Restrained (Neutrals + 1 Akzent). Akzent nur für Primary Actions, aktuelle Selektion, State-Indikatoren. Zweite Neutral-Schicht für Sidebars/Panels. Vollständiges semantisches State-Vokabular: hover, focus, active, disabled, selected, loading, error, warning, success, info.
- **Komponenten:** Jeder interaktive Baustein braucht default, hover, focus, active, disabled, loading, error. Skeletons statt Spinner. Empty States, die das Interface lehren. Overlays müssen ihren Container verlassen können (`<dialog>`, Popover API, `position: fixed`, Portal; kein absolut positioniertes Dropdown in `overflow: hidden`).
- **Motion:** **150–250 ms** für die meisten Transitions. Motion transportiert State, nicht Dekoration. Keine orchestrierten Page-Load-Sequenzen.
- **Verbote:** dekorative Motion ohne State; inkonsistente Component-Vokabulare; Display-Fonts in UI-Labels; Neu-erfinden von Standard-Affordances (Custom Scrollbars, weird Form Controls); Full-Saturation-Akzente auf inaktiven States; **Modal als erster Gedanke (Modals sind meist Faulheit: erst Inline- und Progressive-Disclosure-Alternativen ausschöpfen)**.
- **Erlaubt:** Systemfonts, Standard-Navigationsmuster, Dichte (viele Rows/Labels wenn nötig), Konsistenz vor Überraschung.

## 2. Die 61 Detector-Regeln

Exakt 61 Regeln aus `registry.rs`. Kategorien: **slop** (AI-Tells, 32) und **quality** (Design-Qualität, 29). Severity: advisory = Hinweis statt Warnung, error = kritisch. Unmarkierte Regeln warnen regulär. Scope type/layout steuert `--scope`-Filter.

### Slop: Visuelle Details & Komponenten

| ID | Kernpunkt | Severity |
|---|---|---|
| side-tab | Dicker farbiger Border nur auf einer Card-Seite ist der bekannteste AI-Tell (≥2px, min. doppelt so breit wie andere Seiten; seitlich ≥3px ohne Radius): subtileren Akzent oder entfernen. | |
| border-accent-on-rounded | Dicker Akzent-Border kollidiert mit Card-Radien: Border oder Radius entfernen. | |
| icon-tile-stack (layout) | Rounded-Square-Icon-Container über jeder Überschrift ist das universelle AI-Feature-Card-Template: Icon neben Heading oder ohne eigenen Container im Fluss. | |
| gpt-thin-border-wide-shadow | Hairline-Border plus breiter diffuser Schatten ist eine GPT-Signatur: auf eins committen, definierte Kante ODER weiche Elevation. | advisory |
| repeating-stripes-gradient | Repeating-Gradient-Streifen als Flächendeko: bewusste Textur oder plain Surface. | advisory |
| codex-grid-background | Dekorativer Grid-/Linien-Hintergrund aus Hairline-Gradients: nur für echte Canvas-/Map-/Blueprint-/Mess-Flächen. | advisory |
| numbered-section-labels | Numerische Sektions-Indizes (01/02/03) neben Headings sind AI-Editorial-Gerüst: Hierarchie, Content und Rhythmus tragen die Sequenz. | advisory |

### Slop: Typografie

| ID | Kernpunkt | Severity |
|---|---|---|
| overused-font (type) | Inter, Roboto, Fraunces, Geist, Plus Jakarta Sans, Space Grotesk sind zu verbreitet für Distinktion: Face mit Persönlichkeit wählen. | |
| flat-type-hierarchy (type) | Heading- und Body-Rollen unterscheiden sich um <1.25×: mindestens einen stärkeren Size-Step einbauen. | |
| italic-serif-display (type) | Oversized Italic Serif als Hero-Headline ist der universelle AI-Startup-Hero: Roman setzen oder Nicht-Serif-Display; Editorial-Kontext kann legitimieren. | |
| hero-eyebrow-chip (type) | Uppercase letter-spaced Label oder Pill-Chip über oversized Hero-Headline ist Default-AI-SaaS: streichen, in Headline integrieren oder als Breadcrumb. | |
| kicker-above-heading (type) | Kicker/Eyebrow-Label als eigener Block über einer Überschrift ist **outright banned**, auch einzeln: die Worte in Heading oder Body arbeiten. | |
| oversized-h1 (type) | Ganzer Satz als Display-Size-Headline dominiert den Viewport: kurze 1-2-Wort-Headline ok, lange Headlines kleiner setzen oder Copy straffen. | |
| extreme-negative-tracking (type) | Letter-Spacing enger als die Zeichenformen vertragen kostet Lesbarkeit: Display-Type optisch tighten, nicht destruktiv. | |

### Slop: Farbe

| ID | Kernpunkt | Severity |
|---|---|---|
| gradient-text | Gradient-Text ist dekorativ statt bedeutungsvoll, besonders auf Headings/Metriken: solide Farben für Text. | |
| ai-color-palette | Purple/Violet-Gradients und Cyan-on-Dark sind die bekanntesten AI-Tells: distinktive, intentionale Palette wählen. | |
| cream-palette | Warmer Creme/Beige-Page-Hintergrund ist der reflexhafte tasteful-Default: Hintergrund aus bewusster Palette wählen. | |
| dark-glow | Farbige Glow-Schatten (Zero-Offset chromatic Halo, farbige geblurte Shadow auf Dunkel) sind Default-Cool-Look: neutrale Elevation, subtile zweckvolle Beleuchtung. | |
| radial-halo | Chromatischer Radial-Gradient-Wash (satt in der Mitte nach transparent) als dekorativer Background-Glow: Surface mit solider/subtil verschobener Farbe erden. | |
| radial-spotlight-glow | Weicher opaker Akzent-Radial-Spotlight hinter Hero/Sektion, der transluzente Cousin des radial-halo: Surface allein stehen lassen oder bewusst beleuchten. | |

### Slop: Layout

| ID | Kernpunkt | Severity |
|---|---|---|
| nested-cards (layout) | Cards in Cards erzeugen Noise und übertriebene Tiefe: Hierarchie über Spacing, Typografie und Divider flachziehen. | |
| monotonous-spacing (layout) | Derselbe Spacing-Wert überall ist kein Rhythmus: enge Gruppierung für Verwandtes, großzügige Trennung zwischen Sektionen. | |

### Slop: Motion

| ID | Kernpunkt | Severity |
|---|---|---|
| bounce-easing | Bounce/Elastic wirkt datiert und billig: exponentielles Ease-out (quart/quint/expo), z. B. `cubic-bezier(0.16, 1, 0.3, 1)`. | |
| pulsing-dot | Pulsierende Status-Dots simulieren dekorativ Liveness: Pulse nur mit echten Live-Daten, sonst statischer Indikator mit Labelung. | |
| blinking-cursor | Blinkender Text-Cursor im Hero simuliert Tippen ohne Input: Komposition muss ohne Fake-Prompt Aufmerksamkeit halten. | advisory |
| marquee | Auto-scrollende Marquees verlangen unverdiente Aufmerksamkeit und verstecken die Hälfte des Contents: Motion nur für sich ändernden Content. | |
| image-hover-transform | Bild-Scale/Rotate bei Hover ist AI-Signatur: Imagery stillstehen lassen oder subtilere, zweckvolle Interaktion. | advisory |

### Slop: Copy

| ID | Kernpunkt | Severity |
|---|---|---|
| em-dash-overuse | Em-Dash-Sättigung ist AI-Kadenz (feuert bei ≥8 Em-Dashes, ~1 pro 500 Zeichen): Kommas, Doppelpunkte, Punkte, Klammern bevorzugen. | advisory |
| marketing-buzzword | Generische SaaS-Phrasen (streamline, empower, supercharge, world-class, enterprise-grade) sind sofortige AI-Tells: spezifisches Verb + Nomen, das sagt, was das Produkt wörtlich tut. | |
| aphoristic-cadence | 3+ Sektionen mit Rebuttal-Pointe („X. No Y.") sind Muster statt Voice: einmal ok, das Muster ist der Tell. | |
| theater-slop-phrase | Etwas als „theater" abzutun ist ein Generated-Copy-Tic: plain sagen, was das Ding tut oder nicht tut. | advisory |

### Slop: Imagery

| ID | Kernpunkt | Severity |
|---|---|---|
| shape-assembled-illustration | Großes Inline-SVG aus Primitiv-Formen wirkt wie Placeholder-Clipart: Icons/Logos/Datengrafiken ok, Hero-Visuals verdienen echtes Artwork, Foto oder authored Grafik. | advisory |

### Quality: Kontrast & Text-Lesbarkeit

| ID | Kernpunkt | Severity |
|---|---|---|
| low-contrast | Text erfüllt WCAG AA nicht (**4.5:1 Body, 3:1 Large Text**): Kontrast erhöhen. | |
| gray-on-color | Grauer Text auf farbigem Hintergrund wirkt ausgewaschen: dunkleren Ton der Hintergrundfarbe oder Weiß/Near-White. | |
| tiny-text (type) | Body-Text unter 12px ist schwer lesbar: mindestens 14px, ideal 16px. | |
| undersized-ui-text (type) | Funktionaler UI-Text (Links, Buttons, Nav, Labels, Table-Cells, Meta, Timecodes) unter 11px ist ein Lesbarkeits-Fail, auch im Footer; nur nicht-interaktives Legal-Smallprint bekommt 10px. Ausnahmen: sup/sub, sr-only, Code/Terminal. Ein DESIGN.md-Ramp-Platz befreit NICHT. | |
| tight-leading (type) | Line-Height unter 1.3× macht mehrzeiligen Text schwer lesbar: **1.5–1.7 für Body**. | |
| all-caps-body (type) | Lange Passagen in Uppercase sind schwer lesbar: Uppercase nur für kurze Labels/Headings. | |
| wide-tracking (type) | Letter-Spacing über 0.05em auf Body stört Zeichengruppierung: Wide Tracking nur für kurze Uppercase-Labels. | |
| justified-text (type) | Blocksatz ohne Silbentrennung erzeugt rivers of white: `text-align: left` oder `hyphens: auto`. | |
| skipped-heading (type) | Heading-Levels dürfen nicht überspringen (h1 nach h3 ohne h2 bricht die Document Outline für Screenreader). | |

### Quality: Layout & Overflow

| ID | Kernpunkt | Severity |
|---|---|---|
| line-length (type, layout) | Zeilen über ~80 Zeichen sind schwer lesbar: `max-width: 65ch–75ch` auf Text-Container. | |
| cramped-padding (layout) | Text zu nah am Container-Rand: mindestens **8px, ideal 12–16px** Padding in bordered/outlined/farbigen Containern. | |
| body-text-viewport-edge (layout) | Body-Paragraphs kleben am Viewport-Rand: mindestens **16px, ideal 24–32px** horizontales Padding oder `max-width` + `mx-auto`. | |
| text-overflow (layout) | Content breiter als Container (Spill, horizontaler Scrollbar): Text wrappen, Breiten begrenzen oder bewusste Scroll-Affordance. | |
| edge-flush-cards (layout) | Cards in horizontalem Scroller/Tab-Panel kleben an einer Kante und werden abgeschnitten: konsistente Insets beidseitig. | |
| text-occlusion (layout) | Text wird von opakem Element oder zweitem Text übermalt: überlappende Ebenen entzerren. | |
| first-viewport-column-overflow (layout) | Eine Spalte läuft weit über den Fold, während die Schwester in einen Viewport passt: Spalten balancieren oder langen Content unter die Opening-Row fließen lassen. | |
| clipped-overflow-container (layout) | `overflow: hidden/clip` schneidet absolut positionierte Children ab (Tooltips, Menüs, Popovers): Overflow sichtbar lassen oder Layer aus dem Clip ziehen. | |
| heading-rhythm (layout, type) | Über einem Heading muss MEHR Raum sein als darunter, sonst liest sich jede Sektion wie die Caption der vorherigen. | |
| content-hidden-at-rest (layout) | Großer Textteil bleibt auf `opacity: 0`/`visibility: hidden`, auch nach Reveal-Handlern: Content default sichtbar machen; JS enhanct den Eingang, gated nicht die Existenz. | **error** |
| script-error | Uncaught Exception/Parse-Fehler beim Laden killt Reveals, Interaktionen, Dynamic Content: vor allem anderen fixen. | **error** |
| broken-image | `<img>` mit leerem/fehlendem `src` oder Placeholder erzeugt Broken-Image-Box: echte/generierte Assets oder Tag entfernen. | |
| repeated-container-text | Derselbe wörtliche Text 3+ Mal an strukturell verschiedenen Stellen in einer Card/einem Panel ist redundante Message: einmal sagen, im wichtigsten Slot. | |

### Quality: Motion-Implementierung

| ID | Kernpunkt | Severity |
|---|---|---|
| layout-transition | Animation von `width`, `height`, `padding`, `margin` verursacht Layout Thrash: `transform`/`opacity` nutzen oder `grid-template-rows` für Height-Animationen. | |

### Quality: Imagery

| ID | Kernpunkt | Severity |
|---|---|---|
| organic-clip-path | Clip-path-Polygon mit vielen willkürlichen Vertices oder curved `path()` als Pseudo-Torn-Edge/Blob ist die billige Version: Alpha-Matte aus dem echten Bild ableiten oder Cut-out-Raster shippen; clip-path für Geometrie behalten. | |
| buried-raster | Hintergrundbild unter fast opaker Gradient-Wash oder Raster bei ~0 Opacity erreicht den Screen nie: Material zeigen (Tint < 0.9 Alpha, Blend-Mode, sichtbare Opacity) oder Datei entfernen. | |

### Quality: Design-System-Drift (nur mit aktiver DESIGN.md)

| ID | Kernpunkt | Severity |
|---|---|---|
| design-system-font (type) | Font außerhalb der DESIGN.md-Typografie: dokumentiertes System nutzen oder DESIGN.md aktualisieren. | |
| design-system-color | Literale Farbe außerhalb der DESIGN.md-Palette/Tonal-Ramps: sollte intentionale System-Ergänzung sein, nicht Drift. | advisory |
| design-system-radius | Border-Radius außerhalb der dokumentierten Skala. | advisory |
| design-system-font-size (type) | Literale Font-Size neben der dokumentierten Type-Ramp. | advisory |

**Hook-Immediate-Tier** (wird beim Edit sofort gemeldet): broken-image, text-overflow, clipped-overflow-container, body-text-viewport-edge, low-contrast, gray-on-color, tiny-text, gradient-text, dark-glow plus die vier design-system-*-Regeln.

## 3. Craft Floor

Qualitäts-Untergrenze vor jedem UI-Edit. Verify am gebauten Ergebnis, nicht an der Absicht.

**Verify-Checks:**

- **Contrast:** Body- und Placeholder-Text ≥4.5:1, Large Text ≥3:1. Sekundärtext auf farbigen Flächen aus Hue/Foreground tönen, nie grau.
- **Depth:** Schatten tragen Offset + weichen Blur. Zero-Offset-Farbhalo ist Deko.
- **Spacing:** enge Gruppen, großzügige Trennung, mehr Raum ÜBER einem Heading als darunter.
- **Type:** Body-Measure 65–75ch, Display max 6rem, Tracking-Floor −0.04em, offensichtliche Scale-/Weight-Steps; echte Copy an jedem Breakpoint prüfen.
- **Motion:** EIN authored Moment, nicht verstreute Effekte und nicht derselbe Entrance auf jeder Sektion. Exponentielles Ease-out aus bereits sichtbarem Default. Über transform/opacity hinaus gehören blur, backdrop-filter, clip-path, mask, shadow zur Palette, wenn sie smooth bleiben.
- **States:** hover, disabled, loading, error, empty, plus echter Content, funktionierende Controls, responsive Komposition, Keyboard-Fokus.
- **Browser surfaces:** Text-Selection, Caret, Custom Scrollbars, Focus-Rings, Underline-Offset, tabellarische Numerale aus der Palette themen. Das billigste Signal, dass eine Seite gebaut statt zusammengesetzt wurde.
- **Copy:** Produktsprache; Controls benennen ihre Aktion; Errors benennen Problem und Recovery.
- **Coverage:** Jede Brief-Anforderung vorhanden und in Sekunden auffindbar.

**Refuse-Liste** (Kategorie-Defaults; ein Brief kann sie verdienen, Reflex nicht):

- Same-size-Cards (Icon+Heading+Text) als Seitenstruktur; Cards als Lazy-Container; nested cards immer falsch.
- Hero-Metric-Template (große Zahl, kleines Label, Supporting Stats, Akzent).
- Kicker/Eyebrow über Headings: echtes Ban.
- Sektions-Nummern (01/02/03), außer die Sequenz trägt selbst Information.
- Modal für Tasks, die weder Unterbrechung noch geschützten Fokus brauchen.
- Gradient-Text; Glass/Blur als Deko statt als spezifischer Effekt.
- Farbiger border-left/right > 1px auf Cards, List-Items, Callouts, Alerts.
- Hard-Offset-Shadows (`4px 4px 0`) außerhalb einer explizit neobrutalistischen Welt.
- Sparklines, Progress-Rings, Soft-Shadow-Rectangles als Content-Ersatz.
- Monospace als technical-Kostüm statt für Code/Daten/Messung.
- System-Display-Faces (Impact, Arial Black, Platform-Sans) als Display-Voice: selbst-hosten, passenden Face sourcen. Der nächste installierte Font ist ein Failure, kein Fallback.
- Unicode-Glyphs/Emoji als Icon-System: Icons gezeichnet, aus echter Library oder authored SVG, konsistenter Stroke/Weight.
- Geometrische Masken für organische Konturen.
- Light/Dark nach Kategorie gewählt: aus der Nutzungsszene wählen (wer, wo, welches Umgebungslicht).

## 4. Bolder / Quieter / Distill

Drei Intensitäts-Kommandos. Keines davon ist ein Redesign.

### Bolder (verstärken, ohne neu zu erfinden)

- **Scope ist sovereign:** nur das benannte Ziel anfassen; keine neuen Farben/Fonts/Radii/Shadows/System-Primitives hinzufügen.
- **Flatness-Diagnose:** Ein Abschnitt wirkt flat, weil er sich aus den stärksten Moves des eigenen Systems herausnimmt. Die zuverlässigste Bolder-Pass bringt ihn auf das expressive Niveau seiner Nachbarn, im eigenen Vokabular.
- **Commit, then clarify:** Halbmaßnahmen lesen sich als Noise. Einen entscheidenden Move komplett machen, alles drumherum leiser. Wenn jedes Element lauter wurde, wurde die Sektion flacher.
- Eigener Rhythmus: Peak im Scroll, Dichte-/Pace-Wechsel.
- **Skeleton-Test:** Copy entfernen. Sagt das Skelett durch Hierarchie und System-Devices allein, was diese Sektion ist und warum sie zählt? Wenn erst die Worte es retten, war die Boldness nur Textgröße.

### Quieter (leiser, aber nicht generisch)

Quieter heißt refined und augenschonend: luxury, nicht laziness. Intensitätsquellen identifizieren: Saturation, Kontrast-Extreme, konkurrierende Weights, Motion-Exzess, Komplexität, fehlende Hierarchie durch durchgehende Größe.

- **Farbe:** Sättigung auf **70–85%** senken; weniger Farben; Neutrals arbeiten lassen, Farbe als Akzent (**10%-Regel**); getönte Grays statt purem Grau; nie Grau auf Farbe.
- **Visual Weight:** Font-Weights senken (900→600, 700→500); Hierarchie durch Weight/Size/Space statt Color/Boldness; mehr Weißraum; Borders dünner/transparenter/weg.
- **Simplification:** Gradients/Shadows/Patterns ohne Zweck entfernen; Radius-Extreme reduzieren; Layering flachziehen; Blur/Glows/Multi-Shadows abbauen.
- **Motion:** kürzere Distanzen (10–20px statt 40px), ease-out-quart, nie Bounce/Elastic; dekorative Animationen entfernen, funktionale behalten.
- **Komposition:** kleinere Scale-Sprünge, Grid-Alignment, gleichmäßigerer Spacing-Rhythmus.
- **NIE:** alles gleiche Größe/Weight; alle Farbe entfernen; Personality opfern; Usability opfern; alles klein+leicht (Anker nötig).

### Distill (auf die Essenz reduzieren)

Simplicity entfernt keine Features, sondern Hindernisse zwischen Nutzern und Zielen. Every element should justify its existence. Saint-Exupéry-Prinzip: Perfektion ist erreicht, wenn nichts mehr wegzunehmen ist.

- EIN Primary Goal; die 20%, die 80% des Werts liefern.
- **Info-Architektur:** Secondary Actions entfernen, Progressive Disclosure, ähnliche Buttons mergen, EINE Primary Action, Redundanz streichen (said elsewhere, don't repeat).
- **Visuell:** 1–2 Farben + Neutrals (nicht 5–7); eine Font-Familie, **3–4 Sizes max, 2–3 Weights**; Borders/Shadows/Backgrounds ohne Funktion entfernen; nie Cards in Cards; Cards nicht für Basic Layout (Spacing/Alignment stattdessen); eine Spacing-Skala.
- **Layout:** linearer Flow statt komplexer Grids; Sidebars inline/versteckt; volle Breite großzügig; konsistente Ausrichtung (links ODER center); großzügiger Weißraum.
- **Interaktion:** weniger Choices (Paradox of Choice); Smart Defaults; Inline- statt Modal-Flows; Steps streichen; EIN offensichtlicher Next Action.
- **Content:** jeden Satz halbieren, dann nochmal; Aktiv („Save changes" nicht „Changes will be saved"); kein Jargon; scannbar; keine Header, die Intros wiederholen.
- **Code:** Dead CSS/Components/Files entfernen; Component-Trees flachziehen; Varianten konsolidieren (3 statt 12, wenn 90% abgedeckt).
- **NIE:** nötige Funktionalität entfernen; A11y opfern; so einfach, dass es unklar wird (mystery ist nicht minimalism); entscheidungsrelevante Info entfernen; Hierarchie komplett eliminieren; komplexe Domänen übervereinfachen.

## 5. Delight

- Delight ist Produkt-Charakter durch nützliche Interaktion, humane Reaktion oder unerwartet bedachtes Detail, keine generische Whimsy-Schicht.
- EINE Delight-Thesis in einem Satz: was soll der Nutzer fühlen und warum gehört das zu diesem Produkt. Kleinstes lieferbares System wählen.
- **Momente:** Success (Response proportional zu Effort/Konsequenz; Milestones dürfen expandieren, Routine-Saves fühlen sich einfach sicher an); Waiting (wahrheitsgemäßer Progress, nützlicher Kontext; nie Arbeit vortäuschen oder Completion verzögern); Empty/First-Use (nächste Aktion klar vor Personality); Error/Recovery (Problem+Recovery zuerst; Witze trivialisieren nie Verlust/Geld/Privacy/blockierte Arbeit); wiederholte Nutzung (**100.-Mal-Test:** muss beim hundertsten Mal noch funktionieren); Discovery (Neugier belohnen ohne Pflichtfunktionen zu verstecken).
- **Delight darf nie:** Primary Task verzögern/blockieren/verdecken; Plattform-Konventionen/A11y überschreiben; unerbetene faktische Claims; Sound ohne Consent; mandatory/unskippable/bei Wiederholung ermüdend sein; unverhältnismäßige Asset-Kosten.
- **Specificity-Test:** Der Moment ist spezifisch genug, dass ein Nachbarprodukt ihn nicht unverändert nutzen könnte.

## 6. Clarify / UX-Copy

- **Message-Hierarchie pro State:** 1) die eine Tatsache, die der Nutzer jetzt braucht; 2) die verfügbare nächste Aktion; 3) entscheidungsverändernder Kontext; 4) passender Ton. Jede Idee einmal sagen.
- **Actions:** spezifisches Verb+Objekt; Label beschreibt, was passiert, nicht die Geste; gleiche Begriffe produktweit. Destruktive Actions: Objekt+Konsequenz benennen; **Undo vor Confirmation**; bei nötiger Confirmation Aktion auf Message UND Button nennen (nie Yes/No/OK/Submit).
- **Forms:** persistente Labels (Placeholders sind Beispiele, keine Labels); Format-/Eligibility-Anforderungen VOR Submit; Validation sagt, was Aufmerksamkeit braucht und wie zu korrigieren, ohne Vorwurf; Errors barrierefrei announcen.
- **Errors beantworten:** 1) was schiefging, 2) warum (wenn bekannt+nützlich), 3) wie Recovery/welche Alternative. Keine internen Codes als Primary Message; keine Ursache/Auflösung versprechen, die das System nicht kennen kann; Privacy/Payment/Deletion/Blocked-Work ernst nehmen (Wärme ja, Witze nein).
- **Loading:** echte Operation benennen, ehrliche Erwartung; determinate Progress wenn verfügbar; **nie Progress erfinden**.
- **Empty States unterscheiden:** first use / no results / filters / permissions / failure; Zustand erklären + nächste nützliche Aktion.
- **Success:** Outcome bestätigen, nächste Konsequenz nur wenn handlungsrelevant; Routine-Success kurz.
- Helper-Text beantwortet eine implizite Frage statt das Control zu wiederholen; Link-Text muss aus dem Kontext funktionieren; Icon-only Controls brauchen accessible Names.
- **i18n:** vollständige übersetzbare Messages statt Concatenation; Variablen reorderbar; Expansions-Spielraum; Alt-Text transportiert Information (Deko = leeres alt); Screenreader-Namen = sichtbare Labels; nie auf Interpunktion/Farbe/Icons allein verlassen; keine Wortvariation für literarischen Effekt; Terminologie-Glossar pflegen.
- Ziel: so kurz wie möglich, ohne Bedeutung oder Recovery zu verlieren.

## 7. Hardening

Designs, die nur mit perfekten Daten funktionieren, sind nicht production-ready.

- **Extreme Inputs testen:** sehr lang/kurz, Emoji, RTL, Akzente, große Zahlen, 1000+ Items, 50+ Options, No Data.
- **Text-Overflow:** `.truncate` (Ellipsis), `.line-clamp` (Multi-Line), `overflow-wrap: break-word` + `hyphens: auto`; Flex/Grid-Items `min-width: 0`/`min-height: 0`; `clamp()` für fluid Type; **16px Body auf Mobile** (iOS Safari force-zoomt Inputs <16px); 200%-Zoom-Test.
- **i18n:** **30–40% Expansions-Budget** (Deutsch oft 30% länger); keine Fixed Widths auf Text-Containern (padding statt width); logische Properties (`margin-inline-start` etc.) für RTL; UTF-8; CJK/Emoji testen; `Intl.DateTimeFormat`/`Intl.NumberFormat`; echte Pluralisierungs-Library statt `${count} item${s}`.
- **Error-Handling:** klare Messages + Retry; API-Codes spezifisch (400 Validation, 401 Login, 403 Permission, 404 Not-Found, 429 Rate-Limit, 500 generisch+Support); Input bei Error bewahren; Graceful Degradation (Core ohne JS, Alt-Texte, Progressive Enhancement).
- **Edge Cases:** Empty States mit klarer Next Action; Loading mit benannter Operation; große Datensets (Pagination/Virtual Scrolling, nie 10.000 Items auf einmal); Concurrent Ops (**Double-Submit blocken**, Race Conditions, Optimistic+Rollback); **Interrupted Gestures** (zweiter Finger mid-drag, `pointercancel`, `lostpointercapture`, Release außerhalb, Window-Blur führt zu Drag-State clearen; danach muss der nächste Tap/Drag ohne Reload funktionieren); Permission-States; Browser-Kompatibilität per Feature-Detection, nicht Browser-Detection.
- **Validation:** immer serverseitig zusätzlich; nie Client-only vertrauen; Constraints mit `maxlength`/`pattern`/`aria-describedby` kommunizieren.
- **A11y-Resilienz:** komplette Keyboard-Bedienung, logische Tab-Order, Fokus-Management in Modals, Skip-Links; ARIA + Live-Regions; High-Contrast-Mode testen.
- **Performance-Resilienz:** Skeletons, Optimistic UI, Offline; Event-Listener/Subscriptions/Timer/Requests aufräumen; Debounce Search (300ms), Throttle Scroll (100ms).
- **NIE:** perfekten Input annehmen; i18n ignorieren; generische Errors („Error occurred"); Offline vergessen; Fixed Widths für Text; English-Länge annehmen; ganzes Interface bei einem Komponenten-Fehler blockieren.

## 8. Onboarding & Empty States

Onboardings Job ist nicht, das Produkt zu lehren, sondern Menschen zum Moment zu bringen, der beweist, dass das Produkt ihre Zeit wert ist: **Time-to-Value**, Aha-Moment so schnell wie möglich. Die 20% lehren, die 80% des Werts liefern.

- **Prinzipien:** Show don't Tell (funktionierende Beispiele statt Tutorial-Mode); optional/skippbar; Context over Ceremony (beim Bedarf lehren, Empty States als Onboarding, Tooltips am Point of Use); Nutzer-Intelligenz respektieren.
- **Welcome Screen:** klare Value Proposition, ehrliche Zeitschätzung, Skip-Option. **Account Setup:** minimale Pflichtinfos, „warum fragen wir" erklären, Smart Defaults. **Core Concepts:** 1–3, interaktiv, Progress (step 1 of 3). **First Success:** echtes Etwas erreichen lassen, Templates/Sample Data, klare Next Steps.
- **Empty-State-Anatomie:** Was wird hier sein + Warum es zählt + Wie starten (CTA/Template) + visuelles Interesse (Illustration/Icon) + kontextuelle Hilfe.
- **5 Empty-State-Typen:** first use / user cleared / no results / no permissions / error, je mit passender Handlung.
- **Guided Tours:** 3–7 Steps max, Spotlight, frei durchklickbar, Skip, replayable; Workflow- statt Feature-Fokus („Create a project" nicht „This is the project button").
- Dismissals respektieren (localStorage-Tracking), nie dasselbe Onboarding zweimal zeigen.
- **NIE:** langes Pflicht-Onboarding vorm Produkt; bevormundende Erklärungen; UI komplett blockieren; Tutorial-Mode abgekoppelt vom echten Produkt; alles auf einmal (Progressive Disclosure); Skip verstecken; Returning Users das Initial-Onboarding zeigen.

## 9. Responsive / Adaptation

**Adaptation is rethinking the experience for the new context, not scaling pixels.**

- **Touch-Targets:** **44×44px Minimum** (iOS 44pt, Android 48dp mit 8dp Abstand).
- **Mobile:** Single-Column, Full-Width, Bottom-Nav, Bottom Sheets statt Dropdowns, Thumb-First, Progressive Disclosure, 16px Text Minimum.
- **Tablet:** Two-Column, Master-Detail, orientierungs-adaptiv, Touch+Pointer.
- **Desktop:** Multi-Column, persistente Side-Nav, max-width (nicht bis 4K strecken), Hover/Keyboard-Shortcuts/Context-Menüs/Drag&Drop, mehr Info upfront.
- **Print:** Page-Breaks an logischen Punkten, Nav/Interaktives entfernen, URLs/Metadaten expandieren.
- **Email:** 600px max, Single-Column, Inline-CSS, Table-Layouts, große CTA-Buttons, keine Hover-Abhängigkeit.
- **Mobile-First:** Base-Styles für Mobile, `min-width`-Queries schichten Komplexität.
- **Content-driven Breakpoints:** schmal starten, strecken bis es bricht, dort Breakpoint; meist reichen 3 (640/768/1024); `clamp()` für fluide Werte.
- **Input-Detection statt Screen-Size:** `@media (pointer: fine|coarse)`, `@media (hover: hover|none)`; Hover nie für Funktionalität voraussetzen.
- **Safe Areas:** `env(safe-area-inset-*)` + `viewport-fit=cover`.
- **Responsive Images:** `srcset` mit w-Descriptors + `sizes`; `<picture>` für Art Direction. `display: none` lädt trotzdem; Progressive Enhancement; Lazy Loading.
- **Testen auf echten Geräten** (billige Androids zeigen Performance-Probleme). Custom Controls (Slider, Drag-Surfaces) müssen unter Touch per Geste verifiziert werden: ein gerendertes Viewport beweist Layout, nie die Geste. Evidence benennen (Emulation? Engine? physisches Gerät? Chromium ≠ Safari).
- **NIE:** Core-Funktionalität auf Mobile verstecken; Desktop = powerful annehmen; unterschiedliche IA pro Kontext; Landscape vergessen; generische Breakpoints blind; Touch auf Desktop ignorieren; Device-Detection statt Feature-Detection; separate Mobile/Desktop-Codebases.

## 10. Performance

Performance is a feature. **Erst messen, dann den echten Bottleneck fixen, dann nachmessen.** Größter Bottleneck zuerst.

- **Core Web Vitals:** LCP < 2.5s, INP < 200ms, CLS < 0.1 (INP ersetzte FID März 2024).
- **Images:** WebP/AVIF, richtige Größen (kein 3000px für 300px), Lazy Loading unter dem Fold (NIE above-fold lazen), srcset/picture, 80–85% Qualität, CDN; Dimensionen/`aspect-ratio` setzen gegen CLS.
- **JS:** Code-Splitting, Tree-Shaking, Dynamic Imports, ungenutzte Deps entfernen.
- **Fonts:** `font-display: swap|optional`, Subsetting (`unicode-range`), Preload kritischer Fonts, Weight-Anzahl begrenzen.
- **Rendering-Budgets:** Layout Thrashing vermeiden (Reads batchen, dann Writes); CSS `contain`; flache DOMs; `content-visibility: auto`; Virtual Scrolling; GPU: transform/opacity statt left/width; **16ms/Frame (60fps)**; `requestAnimationFrame`; IntersectionObserver; `will-change` sparsam (erzeugt Layer/Memory).
- **React:** memo/useMemo/useCallback, Routen-Splitting.
- **Netzwerk:** Requests reduzieren, SVG-Sprites, Pagination, Compression, Caching, adaptive Loading via `navigator.connection`.
- **NIE:** ohne Messung optimieren; A11y/Funktionalität opfern; Micro-Optimierungen vor dem Haupt-Bottleneck; Mobile-Performance vergessen; auf Desktop+Fast-Connection allein messen (echte Geräte, 3G-Throttling).

## 11. Overdrive

„Extraordinary" ist kontextabhängig: Partikelsystem auf Portfolio = beeindruckend, auf Settings = peinlich; Settings mit instant optimistic saves = auch extraordinary. Technik dient der Erfahrung, nicht umgekehrt. Erst 2–3 Richtungen vorschlagen und wählen lassen.

**Toolkit nach Ziel:**

- **Cinematic Transitions:** View Transitions API (same-doc überall, cross-doc ohne Firefox), `@starting-style`, Spring Physics mit Masse/Tension/Damping statt cubic-bezier.
- **Scroll-driven Animations:** `animation-timeline: scroll()`, CSS-only; Firefox nur per Flag, Fallback nötig.
- **Beyond CSS:** WebGL (Three.js/OGL/regl); WebGPU mit WebGL2-Fallback; Canvas 2D/OffscreenCanvas+Worker; SVG-Filter-Chains für organische Distortion.
- **Lebendige Daten:** Virtual Scrolling für 100k Rows @60fps; GPU-Charts via Canvas/WebGL/deck.gl; D3-`transition()`/View-Transitions für Chart-Morphing.
- **Komplexe Properties:** `@property` für animierbare Gradients/Custom Props; WAAPI.
- **Performance-Grenzen:** Web Workers, OffscreenCanvas, WASM.
- **Device:** Web Audio (braucht User Gesture); Orientation/Geolocation sparsam.

**Disziplin:**

- Progressive Enhancement non-negotiable (`@supports`, Feature-Checks, CSS-Fallback muss gut aussehen).
- 60fps Ziel: unter 50 vereinfachen. Heavy Resources lazy + pausieren wenn offscreen. Auf Mid-Range-Geräten testen.
- **The last 20%:** Der Unterschied zwischen cool und extraordinary sind Easing-Kurve, Timing-Offset, sekundäre Motion. Nicht die erste funktionierende Version shippen.
- **NIE:** Jank auf Mid-Range; Bleeding-Edge ohne funktionalen Fallback; Sound ohne Opt-in; technische Ambition als Deckmantel für schwache Design-Fundamente; mehrere konkurrierende Extraordinary-Momente.
- **Tests:** Wow-Test (reagiert ein Unbeteiligter?), Removal-Test (vermisst es jemand?), Device-Test, Context-Test.

## 12. Audit & Critique

### Audit: 5 Dimensionen

Je 0–4 Punkte, Total /20. Bänder: **18–20 Excellent, 14–17 Good, 10–13 Acceptable, 6–9 Poor, 0–5 Critical.**

1. **Accessibility:** Kontrast <4.5:1 (7:1 AAA); `prefers-reduced-motion` braucht intentionale Alternative (globaler `0.01ms`-Kill ist ein Befund, kein Fix); ARIA/Roles/Labels/States; Keyboard (Fokus-Indikatoren, Tab-Order, Traps); Semantik (Heading-Hierarchie, Landmarks, div statt button); Alt-Texte; Form-Labels/Required/Errors.
2. **Performance:** Layout Thrashing; Casual Layout-Property-Animation; unbounded Blur/Filter/Shadow; fehlendes Lazy Loading; `will-change`-Overuse; Bundle; Re-Renders.
3. **Theming:** Hard-coded Farben statt Tokens; broken Dark Mode; inkonsistente Token-Nutzung; Theme-Switch-Brüche.
4. **Responsive:** Fixed Widths; Touch-Targets <44px; broken Touch-Gesten (fehlendes `touch-action`, Drag-State ohne Cleanup); Horizontal-Scroll; Text-Scaling-Brüche; fehlende Breakpoints.
5. **Implementation Integrity (CRITICAL):** Detector-Findings im Kontext verifizieren; Shortcuts, Design-System-Drift, strukturelle Austauschbarkeit mit fremdem Produkt; False Positives benennen.

**Severity-Tagging:** **P0** Blocking (verhindert Task-Completion), **P1** Major (erhebliche Schwierigkeit/WCAG-AA-Verletzung, vor Release), **P2** Minor (Workaround existiert), **P3** Polish. Faustregel: Würde ein Nutzer deshalb Support kontaktieren? Dann mindestens P1.

### Critique: Design-Review-Framework

- **Zwei isolierte Assessments:** A = Design-Review (LLM, unverankert), B = Detector/Browser-Evidence. A fertig, bevor B einfließt; der Detektor verankert Urteile.
- **Design Specificity Verdict zuerst:** Fühlt sich das Ergebnis für DIESES Produkt authored an, oder kategorie-austauschbar?

**Nielsen's 10 Heuristiken**, je 0–4, Gesamt /40. Bänder: **36–40 Excellent, 28–35 Good, 20–27 Acceptable, 12–19 Poor, 0–11 Critical** (bei n/a prozentual: 90%+ Excellent, 70%+ Good, 50%+ Acceptable, 30%+ Poor).

1. Visibility of System Status
2. Match System/Real World
3. User Control & Freedom
4. Consistency & Standards
5. Error Prevention
6. Recognition rather than Recall
7. Flexibility & Efficiency (darf auf Persuade/Experience n/a sein)
8. Aesthetic & Minimalist Design
9. Error Recovery
10. Help & Documentation (darf auf Persuade/Experience n/a sein)

Die meisten realen Interfaces scoren 20–32/40; 4 heißt genuinely excellent.

**Cognitive Load:** 3 Typen: Intrinsic (Aufgabe; strukturieren: Steps, Scaffolding, Progressive Disclosure, Gruppierung), Extraneous (schlechtes Design; rücksichtslos eliminieren: verwirrende Nav, unklare Labels, Clutter, Inkonsistenz, unnötige Steps), Germane (Lernen; gut; fördern).

**8er-Checkliste:** Single Focus · Chunking ≤4 Items/Gruppe · Grouping · visuelle Hierarchie · One Thing at a Time · ≤4 sichtbare Optionen pro Entscheidung · Working Memory (kein Merken über Screens) · Progressive Disclosure. Scoring: 0–1 Fail = gut, 2–3 = moderat, 4+ = kritisch.

**Working-Memory-Regel (Cowan): ≤4 Items gleichzeitig.** Praktisch: 1 primary + 1–2 secondary Buttons, Rest ins Menü; ≤5 Top-Level-Nav-Items; ≤4 Sibling-Choices pro Sidebar-Level; ein Reading Path; eine Entscheidung pro Screen bei Galerien.

**8 typische Load-Violations:** Wall of Options; Memory Bridge; Hidden Navigation; Jargon Barrier; Visual Noise Floor (alles gleiches Gewicht: 1 primary, 2–3 secondary, Rest muted); Inconsistent Pattern; Multi-Task Demand; Context Switch.

**5 Test-Personas:**

| Persona | Fokus | Kriterien |
|---|---|---|
| Alex (Power User) | Effizienz | Shortcuts, Bulk, Skip, <60s Core Task |
| Jordan (First-Timer) | Orientierung | erste Aktion in 5s klar, gelabelte Icons, Hilfe, kein Jargon |
| Sam (Accessibility) | Barrieren | kompletter Keyboard-Flow, Fokus sichtbar, 4.5:1, Zoom 200%, SR-Announcements, Farbe nie allein |
| Riley (Stress-Tester) | Robustheit | 0/1000 Items, Emoji/RTL/lange Strings, Refresh mid-flow, stille Fehler |
| Casey (Distracted Mobile) | Kontext | Thumb-Zone unten, State-Persistence, 3G, Autocomplete, 44×44 |

Auswahl nach Interface-Typ: Landing = Jordan/Riley/Casey; Dashboard = Alex/Sam; Checkout = Casey/Riley/Jordan; Onboarding = Jordan/Casey; Analytics = Alex/Sam; Forms = Jordan/Sam/Casey.

**Emotional Journey:** Peak-End-Rule, emotionale Täler, Reassurance bei High-Stakes-Momenten.

## 13. new-work: Neue visuelle Welten

- **Visual Authority ist Evidence, kein Dateiname:** Fehlendes DESIGN.md macht ein Projekt nicht greenfield; kohärente Identität im Code dokumentieren statt Ersatz erfinden. Redesign: Produktwahrheit/Content/Funktion bewahren, alte Optik als Evidenz und Anti-Referenz behandeln.
- **Sieben-Kandidaten-Prozess:** Produkt-Mechanismus in einem Satz + reale Szene der Audience + kulturelle Heimat benennen; die Kategorie-Default-Seite und ihr vorhersagbares Gegenteil als rut ausschließen; 7 konkrete visuelle Systeme/Artefakte/Orte/Rituale aus der Welt der Audience ableiten (inkl. ihrer grafischen/screen Traditionen), mindestens 3 Material-Familien. Leitfrage: Wie sähe dieses Ding als physisches Objekt aus; wie sah seine Welt vor dem Web aus?
- **Der First Viewport ist eine Thesis, kein Header.** Memory-Test: Wenn jemand nach einem Viewport geht, was beschreibt er eine Stunde später? Ist die Antwort eine Stimmung, hat das Konzept nicht committed.
- **Prove, don't claim:** Das Subjekt bei der Arbeit zeigen; Spezifika, die ein Wettbewerber nicht copy-pasten kann. Demonstrations-Daten sind Design-Material (voll autorisieren, synthetisch labeln); Claims bleiben unerfindbar.

**Font-Blacklist (Training-Data-Defaults = you stopped looking):**

Fraunces · Playfair Display · Cormorant · Lora · Crimson · Newsreader · Syne · Space Grotesk · Space Mono · IBM Plex · Inter-as-display · DM Sans · DM Serif · Outfit · Plus Jakarta Sans · Instrument Sans.

Wer einen davon trotzdem nimmt, braucht einen Grund, den kein anderer Face erfüllen könnte. Subjekt-Assoziation (Bücher→Serif, Tech→Mono) ist nie dieser Grund.

**Kalibrierung gegen AI-Cluster-Looks:**

1. Warm cream ground + High-Contrast-Serif-Display + Terracotta/Signal-Red-Akzent
2. Near-Black + ein Neon-Akzent + Glow-Edges
3. Broadsheet-Editorial-Hairlines + Italic-Display-Serif + tracked Mono-Labels

Alle legitim bei Brief. Aber: if someone could guess your aesthetic from the category alone, rework. Negative Constraints (kein Hype) schließen Devices aus, nicht Energie; Produkt-Adjektive („calm coaching") diktieren nicht die Surface-Energie. Buchnahe/warme Subjekte: Cream+Serif ist the default wearing the subject's clothes; Buchstoff, Faden, Jacken, Vorsatzpapier spannen das ganze satte Spektrum auf.

**Direction Contract (6 Blöcke, dev-only):**

| Block | Inhalt |
|---|---|
| THESIS | Die eine Idee + welches Kategorie-Default sie verweigert |
| OWN-WORLD | Palette/Komponentensprache, erkennbar ohne Content |
| STORY | Was der Besucher versteht/glaubt/tut |
| FIRST VIEWPORT | Exakte Komposition + Primary-Action-Position |
| FORM | Gewählte Form + Listenposition + Seed |
| FINISH | Unreviewed and undocumented is unfinished |

- **Commit fully:** Build the assigned direction, not a safer interpretation of it. Stock-Komponente in committed Form = Lapse. In unattended work, the safe rendition is the known risk.
- **Scroll-Pacing:** Dichte, Scale, Imagery, Motion und Ruhe innerhalb einer Grammatik variieren; eine dichte Passage verdient eine leise; die Seite endet mit einem echten Schluss; ein Spacing-Rhythmus, mehr Raum über Headings als darunter.
- **Assets authoren statt Chrome ersetzen:** Gradients, Glass, generische Icon-Tiles und viel-Vertex-Clip-Paths dort, wo ein authored Asset hingehört, sind the gap wearing chrome.
- **Reale Imagery** wenn der Brief es impliziert: nach dem physischen Objekt des Subjekts suchen statt nach der Kategorie; ein entscheidendes Foto schlägt fünf mittelmäßige; Stock-URLs verifizieren.

## 14. Design-System-Dokumentation

- **PRODUCT.md** = dauerhafte Produktwahrheit: Platform (web/ios/android/adaptive), Stack, Users, Product Purpose, Positioning, Operating Context, Capabilities/Constraints, Brand Commitments, Evidence on Hand, Product Principles, Accessibility. Explizit NICHT: visuelle Welten, Paletten, Typografie, Page-Konzepte, erfundene Testimonials/Preise/Benchmarks.
- **DESIGN.md** (google-labs-code/design.md-Format): YAML-Frontmatter mit maschinenlesbaren Tokens (`colors`, `typography`, `rounded`, `spacing`, `components`; Komponenten-Subtokens max. 8 Props: backgroundColor, textColor, typography, rounded, padding, size, height, width; Token-Refs `{colors.primary}`), dann **8 kanonische Sektionen in fixer Reihenfolge: Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts.** Tokens sind normativ, Prosa kontextualisiert. Das Basisformat steht in `planung-und-seo.md`.
- **Named-Rules-Stil:** 1–3 benannte Regeln pro Sektion („The One Voice Rule. The primary accent is used on ≤10% of any given screen. Its rarity is the point."); Creative North Star als benannte Metapher; deskriptiv vor technisch („Gently curved edges (8px)"); funktional vor dekorativ (WO und WARUM, nicht nur WAS); exakte Werte in Klammern; Farben nach Rolle gruppieren (Primary/Secondary/Tertiary/Neutral); kein Duplikat von Token-Werten zwischen Frontmatter und Prosa; keine erfundenen Komponenten; bestehende DESIGN.md nie still überschreiben.
- **Extract-Regel:** nur extrahieren, was **3+ Mal mit gleicher Intention** vorkommt. Premature abstraction is worse than duplication. Tokens brauchen semantische Bedeutung; ähnlich aussehende, aber unterschiedlich gemeinte Elemente bleiben getrennt.
