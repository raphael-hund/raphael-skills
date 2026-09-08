# Design-Depth Router: Aufgabe → Kapitel

Stand 07.09.2026, Skill-Version 2.2.0. Vierzehn tiefe Kapitel aus 54 Einzelanalysen (X-Posts, Videos, Mobbin, Refero, shadcn, 21st.dev, designmd, Neuform, GetLayers, OpenDesign, Prior-Corpus). Jedes Kapitel trägt TLDR, belegte Regeln, Bauanleitungen als eigene Umsetzung, Varianten je Stilfamilie, Dos, Don'ts mit Gegenbeispiel, Gilt-nicht-wenn und Quellen. Zahlen sind gemessen, wenn eine Analyse-Datei folgt; sonst stehen sie als Startwert.

Die Kurzmodule [design-anatomy.md](../design-anatomy.md), [design-effects.md](../design-effects.md) und [design-ux-decisions.md](../design-ux-decisions.md) tragen die je zehn wichtigsten Regeln. Ein Kapitel hier lädt, wer eine Bauanleitung, einen Messwert oder eine Stilfamilien-Variante braucht. Einzelanalysen liegen unter [studies/design-depth/deep/](../studies/design-depth/deep/); Originalbilder bleiben private Recherchebelege (`research/`).

## Router

| Aufgabe | Kapitel | Kurzmodul |
|---|---|---|
| Stilfamilie wählen, Slop prüfen, Skelett vor Haut | [commonalities-dos-donts.md](commonalities-dos-donts.md) | [design-depth.md](../design-depth.md) §5 |
| Seitenfolge, Container, Grid, Sektionsabstände, Hero-Muster | [spacing-layout.md](spacing-layout.md) | anatomy |
| Farbrollen, Tonstufen, ein Akzent, Dark Mode, Chartfarben | [color.md](color.md) | anatomy |
| Schriftrollen, Display-Gewicht, Tracking, Eyebrow, Zahlen | [typography.md](typography.md) | anatomy |
| Primär/Sekundär-CTA, Icon-Button, Pill, Badge, Segmented | [buttons.md](buttons.md) | anatomy |
| Karte, Panel, Bento, Radius-Konzentrik, Divider, Testimonial-Karte | [cards.md](cards.md) | anatomy |
| Tabelle, Liste, KPI, Chart, Filterleiste, Zahlenformat | [tables-data.md](tables-data.md) | anatomy |
| Mobile Rekomposition, Touch, Sticky-CTA, Breakpoints | [mobile.md](mobile.md) | anatomy |
| Glow, Grain, Glas, Gradient-Border, Schraffur, Raster, Schatten, Shader | [effects.md](effects.md) | effects |
| Reveal, Step-Wechsel, Chart-Draw-in, Marquee, Reduced Motion | [motion.md](motion.md) | effects |
| Hero-Foto, Mockup auf Material, Scrim, Fade, Illustration, Logos, Avatare | [imagery.md](imagery.md) | effects |
| Input, Label, Fehler, Multi-Step, Booking, Auth, Bestätigung | [forms.md](forms.md) | ux-decisions |
| Header, Nav-Kapsel, Mega-Menü, Mobile-Menü, Footer, App-Sidebar | [navigation.md](navigation.md) | ux-decisions |
| Empty/Loading/Error/Success, Proof-Kette, Pricing, FAQ | [states-proof-pricing.md](states-proof-pricing.md) | ux-decisions |

## Ladefolge

1. Referenzlernen oder neue Identität: [design-depth.md](../design-depth.md) → commonalities → betroffene Kapitel.
2. Full Build: Kurzmodule immer; je Sektion das Kapitel mit der passenden Bauanleitung.
3. Targeted Improvement: nur das Kapitel der betroffenen Komponente, plus [motion-native.md](../motion-native.md) bei Bewegung.
4. Vor Token-Übernahme: [design-depth.md](../design-depth.md) §4 Konfliktgate; Screenshots sind Belege, exportierte Zahlen Hypothesen.

## Vorrangregeln bei Widerspruch

- Radius: eine Familie pro Seite schriftlich festlegen ([cards.md](cards.md) B). Konzentrik innen = aussen − Inset gilt für verschachtelte Flächen; die multiplikative shadcn-Familie gilt für Komponentenrollen. Beide gleichzeitig nur, wenn der innere Wert nicht negativ wird.
- Verbote (Inter, zentrierter Hero, Grain, Glas, Pille): Default-Warnung, kein Dogma. Ein gebanntes Primitive bleibt, wenn es einen belegten Job hat ([commonalities-dos-donts.md](commonalities-dos-donts.md) Anti-Slop 47–56).
- Trefferfläche: 44 px Untergrenze auf Touch ([mobile.md](mobile.md) 8); 24 px ist das AA-Minimum aus [ui-playbook.md](../ui-playbook.md), kein Zielwert.
- Einzelquelle beweist eine lokale Stilentscheidung, keine universelle Regel. Häufigkeitsaussagen brauchen IDs und n/N ([design-depth.md](../design-depth.md) §5).
