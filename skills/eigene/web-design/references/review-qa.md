# Review & QA: Pre-Flight, Anti-Slop-Katalog, Review-Methodik

Dual-Oracle-Prinzip: deterministische Checks PLUS gerenderte Sichtprüfung. Ein grüner
Scan ersetzt den Blick nie. Coverage-Pflicht (jede Seite/jeder State, keine Stichprobe),
Frische-Pflicht (Screenshot älter als letzte Quelländerung = ungültig).

Inhalt: 1 Pre-Flight-Checkliste · 2 Anti-Slop-Katalog (Tells) · 3 Review-Methodik ·
4 Verify-Loop · 5 Technischer Audit · 6 Prompt-Bausteine für Bau-Aufträge ·
7 Launch-Readiness-Checkliste

Mechanische Gates (Detector, AI-Slop-Scanner, Dash-Grep, Motion-Grep) und die
impeccable-Review-Pässe stehen in SKILL.md Phase 10. Die Anti-Pattern-Tabelle der
Referenz-Sites (`seitentyp-blueprints.md` §4) und der Feel-Check für Motion
(`animation-rezepte.md` §18) sind Teil der Sichtprüfung. Der Reporting-Contract
steht in `handwerk.md` §13.

---

## 1. Pre-Flight-Checkliste (vor jeder Übergabe, mechanisch prüfbar)

**Richtung**
- [ ] Design-Read deklariert, Register gewählt (brand/product), Dials begründet (nicht still Baseline)
- [ ] Signature-Element benannt; Generik-Check durchlaufen (keine unbegründeten Defaults)
- [ ] EIN Design-System/Ästhetik, ehrlich gelabelt; Redesign-Modus erkannt + Audit

**Locks & Verbote**
- [ ] Null Em-Dash (`—`) im sichtbaren Text
- [ ] Color-Lock: 1 Akzent; Page-Theme-Lock: 1 Theme; Shape-Lock: 1 Radius-Skala
- [ ] Kein AI-Lila-Gradient, keine Cream/Messing-Defaultpalette, kein reines #000/#fff
- [ ] Kein Gradient-Text, kein Glassmorphism-Default, keine Side-Stripe-Borders, keine Sektionsnummern

**Hero & Sektionen**
- [ ] Hero: Viewport-Fit, pt ≤ 24, ≤ 4 Textelemente, 1 Primär-CTA + 1 Trust-Signal; Logo-Wall darunter
- [ ] Eyebrow ≤ ceil(Sektionen/3); kein Split-Header; Zigzag ≤ 2; ≥ 4 Layout-Familien bei 8 Sektionen
- [ ] Sektions-Dramaturgie: Trust früh → Wert/System → Funnel Mitte → Prozess → Social Proof (3 Varianten) → FAQ → Lead-Magnet → Final-CTA
- [ ] Ein Primär-Funnel, CTA nach fast jeder Sektion, EIN Label pro CTA-Intent

**Typo, Farbe, Komponenten**
- [ ] Typo-Floors (16px Body, 60–75ch, unitless Line-Height, Tracking-Floor −0.04em); Serif-Disziplin; kein LLM-Default-Font ohne Grund
- [ ] Kontrast AA verifiziert (computed, beide Themes, alle States, Placeholder)
- [ ] Keine verschachtelten Cards; Elevation einmal deklariert (Border ODER Shadow); Concentric Radius
- [ ] Alle Control-States (hover/focus/active/disabled/loading/empty/error); Touch-Ziele ≥ 44px
- [ ] Icons aus einer erlaubten Library; Browser-Oberflächen thematisiert (Selection, Caret, Scrollbar, Focus-Ring)

**Bilder, Copy, Motion**
- [ ] Reale Bilder/Assets oder klar markierte Slots; keine Fake-Screenshots, Deko-SVGs, Stock-Links
- [ ] Copy-Audit durchlaufen; Quotes ≤ 3 Zeilen mit Attribution; keine Fake-Zahlen/Namen; keine Filler-Verben
- [ ] Motion motiviert + benannt; Frequenz-Gate geprüft; UI < 300ms; kein `ease-in`/`scale(0)`/`transition: all`; Reduced-Motion + Hover-Gating mitgeliefert; Marquee ≤ 1
- [ ] Dark Mode in beiden Modi getestet; `min-h-[100dvh]`; Mobile-Collapse explizit; Web Vitals plausibel (LCP < 2.5s, INP < 200ms, CLS < 0.1)

## 2. Anti-Slop-Katalog (Tells: "sagt ein Betrachter sofort: KI?")

**Farbe**: Indigo→Violet-Gradient · Gradient-Headline-Text · Amber-Wash-Cozy ·
Stock-Semantic-Palette · Ein-Hue-Statusbox · Atmosphären-Glows (Dark-Premium-Default) ·
Near-black + Neon-Akzent.

**Typo**: Serif-Italic-Einzelwort in Sans-Headline · Serif auf Devtool (Playfair) ·
dekorative Strikes/Highlighter · Kicker über jeder Überschrift · ganzer Satz in
Display-Größe · flache Hierarchie (alles 14–18px) · Inter/Geist/Manrope-Reflex ·
Fraunces/Instrument-Default.

**Copy**: Highlighted Keywords mitten im Absatz · "It's not just X, it's Y" ·
"Say goodbye to X" · Dreier-Triaden · Emoji überall · deutsche Pendants:
"maßgeschneiderte Lösungen", "Rundum-sorglos-Paket", "auf das nächste Level".

**Komponenten**: Glow-Status-Dot (Halo/Puls) · farbige Left-Border-Cards ·
Icon-Kachel-Raster (inkl. `bg-{color}/10`-Tint hinter Icon) · Max-Radius + Glass überall ·
Ghost-Card (Hairline + breiter Weichschatten) · nicht-nistende Ecken (gleicher Radius
innen/außen) · Border stirbt an der Rundung · Badge-/Pill-Spam · AI-gezeichnete
SVG-Maskottchen · Emoji als Icons.

**Layout**: All-Caps-Card-Grid · erfundene Stat-Row · 01/02/03-Sektionsmarker ·
Cards-in-Cards · ein Gap-Wert überall · Hero-Metrik-Template · Split-Header.

**Motion**: Springy-Hover (scale-105 + transition-all) · identischer Section-Fade
überall · ease-in auf UI · scale(0).

**Evolved Kostüme (2026)**: "Tasteful Terminal" (Mono überall, Near-black, ASCII-Art) ·
Broadsheet/Hairline-Default (Zeitungsraster, Radius 0) · Cream/Serif-Premium. Poliert
genug, um der neue Default zu sein, trotzdem Tells.

**Production-Test-Tells**: Scroll-Cues ("scroll to explore") · Version-Footer ·
Locale/Wetter-Strips · Deko-Dots · Micro-Meta-Sätze · Foto-Credit-Deko.

## 3. Review-Methodik

**Zwei isolierte Assessments**: Design-Review (unverankert) + deterministischer
Detector-Scan; Detector-Funde dürfen das Design-Urteil nicht ankern. Clean Scan =
Floor, kein Qualitätsbeweis.

**Design Specificity Verdict zuerst**: "Könnte ein beliebiges anderes Produkt diese
Komposition unverändert nutzen?" Ja → generisch, Fail.

**Instrumente**:
- Nielsen-Heuristiken 0–4 als Tabelle (nur passende scoren, Maximum normieren, ehrlich).
- Impeccable-Audit-Scoring (Alternative/Ergänzung zu Nielsen): 5 Dimensionen (A11y, Performance, Theming, Responsive, Implementation Integrity) × 0–4 = /20. Einordnung: 18–20 Excellent · 14–17 Good · 10–13 Acceptable · 6–9 Poor · 0–5 Critical.
- Cognitive-Load-Checkliste (0–1 Fails gut, 2–3 moderat, 4+ kritisch): Single Focus ·
  Chunking ≤ 4/Gruppe · Grouping · Visual Hierarchy · One thing at a time ·
  ≤ 4 Optionen pro Entscheidung · Working Memory · Progressive Disclosure.
- Emotional Journey: Peak-End-Rule, Reassurance bei High-Stakes-Momenten.
- Persona-Test: 2–3 Personas (Power User, First-Timer) den Primary Action Path durchspielen.
- Skeleton-Test: Funktioniert die Komposition ohne Deko?

**Output-Format**: Markdown-Tabelle `| Before | After | Why |` (eine Zeile pro Issue,
mit `file:line`), Issues mit P0–P3-Severity und konkretem Fix, danach explizites
**Block/Approve**. Provokante Frage stellen: "Wie sähe eine selbstbewusste Version aus?"

**Reporting-Contract** (aus jakubkrehel/better-*): Severity HIGH/MEDIUM/LOW, Tabelle
`| Severity | Location | Before | After | Why |`, Verdict `Block` bei offenem HIGH,
sonst `Approve`. Nur inspizierte Coverage approven ("Never approve coverage you did
not inspect"); Nicht-Prüfbares explizit als `Not verified` deklarieren.

## 4. Verify-Loop (bounded, kein Endlos-Polish)

1. Vollständig bauen.
2. EINE gebatachte Inspektionsrunde (Desktop + Mobile zusammen; alle Checks teilen
   sich einen Render: Kontrast, Depth, Spacing, Type, Motion, States, Browser-Surfaces,
   Copy, Brief-Coverage).
3. Alles in einem Batch fixen.
4. Max. eine Bestätigungsrunde → stoppen.
Nachweise mit gerendeter/Source-Evidence, kein nacktes "ja". Jede Brief-Anforderung
muss innerhalb von Sekunden auffindbar sein.

**Polish-Triage-Reihenfolge**: 1 kaputte Tasks/Datenverlust/irreführende States →
2 fehlende States → 3 Flow/Hierarchie/Responsive/Drift → 4 visuelle/Motion-Inkonsistenz →
5 Code-Cleanup. Drift-Ursache auf schmalster Ebene fixen (Token > Komponente > Einzelstelle > Copy).

## 5. Technischer Audit

- **A11y**: Kontrast computed, ARIA/Roles/Labels, Keyboard/Focus/Tab-Order, semantisches HTML, Alt-Text, Form-Labels, Motion-Sensitivity.
- **Performance**: Layout-Thrashing, Layout-Property-Animation, unbounded blur/filter, `will-change`-Overuse, Lazy-Loading, Bundle. Core Web Vitals: LCP < 2.5s (Hero-Bild priority), INP < 200ms, CLS < 0.1. Perf-Fixes auf Architektur-Ebene (Preload, Bundle-Split), nie durch Content/Animation-Entfernung erkauft.
- **Theming**: harte Farben statt Tokens, kaputter Dark Mode, Token-Mix.
- **Responsive**: fixed widths, Touch-Targets < 44px, mouse-only Handler, fehlendes `touch-action`, Horizontal-Scroll, Text-Scaling.

## 6. Prompt-Bausteine für Bau-Aufträge (aus erprobten Rebuild-Prompts)

Für Pixel-Rebuilds bzw. wenn der Auftrag Code/Assets mitliefert:

- **Code ist Ground Truth**: Werte nie aus Prosa neu ableiten; bei Konflikt gewinnt Code. Keine Klassennamen, Timings, Easings, Magic Numbers ändern.
- **Asset-Regel**: exakte URLs/Dateinamen, flach, keine Unterordner, kein Umbenennen, keine lokalen Imports; Placeholder/Unsplash/data-URIs strikt verboten.
- **Never-clip-text**: keine feste Höhe + `overflow:hidden` auf Textcontainern; nowrap-desktop/wrap-mobile-Patterns erhalten; Wort-Reveal-Masken bleiben.
- **Scaling-Pattern respektieren**: fixer Pixel-Canvas + `transform: scale()`-Hook 1:1 übernehmen; nie zu fluid CSS "vereinfachen"; `transformOrigin: top left` behalten; getrennte Mobile/Desktop-Layouts nicht mergen.
- **Anti-Vereinfachung**: Multi-Pass-/Physics-Effekte nicht durch Easing-Approximationen ersetzen, WebGL nicht durch statische Bilder, Fonts nicht substituieren, ähnlich benannte Komponenten nicht mergen.
- Effektive Prompts sind fehler-präemptiv: Jede Regel adressiert einen beobachteten LLM-Fehlmodus (Platzhalter, erfundene Tokens, paraphrasierte Werte, zweite Lenis-Instanz).

---

## 7. Launch-Readiness-Checkliste (unsichtbare Infrastruktur)

Pretty is easy. Diese Liste ist, was wirklich shipped. Vor jedem Launch vollständig
abhaken (nach @Manixh02).

**SEO/Meta**
- [ ] Meta Title + Description auf jeder Seite
- [ ] OG-Image
- [ ] Favicon-Set
- [ ] robots.txt
- [ ] sitemap.xml

**Legal/Trust**
- [ ] Privacy Policy
- [ ] Terms
- [ ] Cookie-Banner
- [ ] Echte Kontaktadresse

**UX-Robustheit**
- [ ] Custom 404
- [ ] CTA above the fold
- [ ] Mobile Breakpoints geprüft
- [ ] Sticky Mobile CTA
- [ ] Loading States
- [ ] Form Error States
- [ ] Thank-You-Page nach Form-Submit
- [ ] Alt-Texte auf allen Bildern

**Performance/Tracking**
- [ ] Analytics
- [ ] Komprimierte Bilder
