# Analyse prior_corpus: Taste-Skill und Unslop als Bau-Regeln in HTML/CSS/SVG

Stand: 2026-09-07. Paket-Typ: **platform-text**. Es liegen **keine Bilder** vor.
Jede Geometrie-, Material- und Typo-Angabe unten ist aus Code-Signaturen der Textquellen abgeleitet
(Tailwind-Klassen, CSS-Snippets, Hex-Listen), nicht aus Screenshots gemessen. Wo die Quelle nur
einen Namen und keinen Wert liefert, steht „unlesbar/nicht belegt".

Basis: `/Users/raphaelhund/skill-workspace/web-design-depth/research/prior_corpus/`
- `REPORT.md` (Zeilen 1-99): Quellen- und Bestandsprüfung, eigene Übertragung, Effekt-Tabelle.
- `sources/taste-SKILL.md` (1206 Zeilen, Commit ccbc156, MIT): Anti-Slop-Skill mit konkreten CSS-Signaturen.
- `sources/unslop-SKILL.md` (40 Zeilen), `sources/unslop-README.md` (114 Zeilen): Messmethode, keine Design-Werte.
- `sources/unslop-react-design.md` (75 Zeilen, Commit edcb623, MIT): Vermeidungsprofil aus 20 SaaS-Samples (Samples selbst nicht im Paket).

## 0. Was das Paket belegt und was nicht

- Belegt: konkrete Code-Signaturen, die LLM-Slop erzeugen (Glow-Blobs, `background-clip:text`, `fixed`+`backdrop-filter`, Gradient-H1, `h-screen`-Drama, Eyebrow über jeder Section).
- Belegt: konkrete Gegenwerte (Radius-Familien, Nav-Höhe, Hero-Padding-Cap, Zeilencaps, Kontrastwerte, Schattentönung, Glas-Rezept mit Fallback).
- Nicht belegt: irgendein gemessenes Pixelbild. Die 20 Unslop-Screenshots liegen nicht vor (`REPORT.md:44-45`). Die 34 X-Posts/69 Bilder der früheren Lieferung sind nicht auffindbar (`REPORT.md:7-11`).
- Kontextbericht `REPORT.md` korrigiert Taste an drei Stellen: Kontrast-Schwelle für Large Text (`REPORT.md:66`), Dial-Werte/Darkmode-Pflicht nicht übernehmen (`REPORT.md:66`), 768-px-Single-Column-Dogma nicht übernehmen (`REPORT.md:72`).

## 1. Element für Element (aus Code-Signaturen)

### 1.1 Header/Nav
- Geometrie: eine Zeile bei Desktop, Höhe 64-72 px, Cap 80 px (`taste-SKILL.md:247-248`). Container `max-w-[1400px] mx-auto` oder `max-w-7xl` = 1280 px (`taste-SKILL.md:152`).
- Material Slop-Default: `position:fixed` + `backdrop-filter` als Glas-Chrome (`unslop-react-design.md:9,61`), Logo links, 3-4 Links, ein CTA rechts (`unslop-react-design.md:8`).
- Nachbau ohne Slop: `<header>` mit `position:sticky; top:0` nur, wenn Sticky eine Nutzerfunktion hat (Anker-Navigation, Warenkorb). Fläche opak oder `background: color-mix(in oklab, var(--page) 92%, transparent)` mit `border-bottom:1px solid var(--border)`; kein Blur, wenn nichts dahinter scrollt, das Blur rechtfertigt.
- Warum: Blur-Nav ist Merkmal, nicht Funktion. Der Unslop-Zähler markiert es als wiederkehrenden Default.

### 1.2 Hero
- Geometrie: Headline ≤ 2 Zeilen, Subtext ≤ 20 Wörter und ≤ 4 Zeilen, CTA ohne Scroll sichtbar (`taste-SKILL.md:236`). Top-Padding max `pt-24` = 96 px (`taste-SKILL.md:238`). Max 4 Textelemente: Eyebrow ODER Brand-Strip, Headline, Subtext, CTAs (`taste-SKILL.md:239-244`). `min-h-[100dvh]` statt `h-screen` (`taste-SKILL.md:153`). REPORT relativiert die Zahlen 20 Wörter/2 Zeilen zu Vorschlägen (`REPORT.md:73`).
- Slop-Default: zentrierter Headline-Block in max-width-Spalte mit zwei Buttons darunter (`unslop-react-design.md:11`); dahinter radialer Glow, Blur-Orbs, Haze (`unslop-react-design.md:21`); absolut positionierte Glow-Blobs (`unslop-react-design.md:62`); Stats-Reihe unter dem Hero als Reflex (`unslop-react-design.md:13`).
- Nachbau: `<section class="hero">` mit `display:grid; grid-template-columns: minmax(0,7fr) minmax(0,5fr); gap: clamp(24px,4vw,64px); padding-block: clamp(48px,8vh,96px)`. Text links, echtes Bild/Objekt rechts (Asymmetric Split, `taste-SKILL.md:206`). Kein Pseudo-Element-Glow. Wenn Licht, dann mit räumlichem Zweck (`REPORT.md:59`).
- Warum: Ein reales Motiv trägt die Aussage; Glow kaschiert fehlendes Motiv (`REPORT.md:59`).

### 1.3 Headline
- Typo: Display-Default `text-4xl md:text-6xl tracking-tighter leading-none` = 36 px mobil / 60 px Desktop, Tracking −0.05em, Zeilenhöhe 1.0 (`taste-SKILL.md:166`). Größe an Wortzahl koppeln: 3-5 Wörter dürfen `text-6xl md:text-7xl` (60/72 px), sonst `text-4xl md:text-5xl lg:text-6xl` (`taste-SKILL.md:237`). Hierarchie über Gewicht + Farbe, nicht über Rohgröße (`taste-SKILL.md:606`).
- Farbabstufung in der Headline: Betonung über Italic/Bold derselben Familie, nie fremde Serif in Sans-Zeile (`taste-SKILL.md:175`). Italic mit Unterlängen braucht `line-height:1.1` und `padding-bottom:4px` (`taste-SKILL.md:183`).
- Slop: Gradient-Text auf dem Schlüsselwort (`unslop-react-design.md:25,63`), Inter als Default (`unslop-react-design.md:32`, `taste-SKILL.md:170`), `<br>`-gebrochene kursive Zeilen (`taste-SKILL.md:650`), Em-Dash (`taste-SKILL.md:649,684-700`).
- Nachbau: `h1{font-size:clamp(2.25rem,5vw,3.75rem);line-height:1;letter-spacing:-0.03em;max-width:14ch}` plus `<em>` mit `font-style:italic;line-height:1.1;padding-bottom:.1em`. Farbe der Headline = `--text`; abgestufter Teil `color:var(--muted)` als `<span>`, kein `background-clip`.

### 1.4 Buttons / CTA
- Geometrie: Label auf einer Zeile bei Desktop, max 3 Wörter primär (`taste-SKILL.md:226`). Tactile: `:active{transform:translateY(1px)}` oder `scale(.98)` (`taste-SKILL.md:224`). Ein Label pro Intent auf der ganzen Seite (`taste-SKILL.md:227`).
- Kontrast: 4.5:1 Body, Large Text 3:1; Quelle sagt 18 px+, REPORT korrigiert auf 24 px bzw. 18,67 px fett (`taste-SKILL.md:225`, `REPORT.md:66`). Ghost-Button über Foto braucht Scrim oder Stroke (`taste-SKILL.md:225`).
- Zustände: Default, Hover, Focus-visible, Active, Disabled, Pending nur wo Funktion sie hat; Breite bei Pending halten, zugänglicher Name bleibt (`REPORT.md:70`).
- Slop: Copy `Get Started`, `Book a Demo`, `Talk to Sales` (`unslop-react-design.md:57`), Sticky-CTA-Banner am Seitenende (`unslop-react-design.md:48`).
- Nachbau: `<button class="btn btn-primary">` mit `min-height:44px; padding:.75em 1.25em; border-radius:var(--r-ctl); white-space:nowrap; background:var(--action); color:var(--on-action)`; `:focus-visible{outline:2px solid var(--action);outline-offset:2px}`; `[aria-busy=true]{color:transparent}` plus Spinner im `::after`, damit die Breite bleibt.

### 1.5 Badges / Eyebrows / Pills
- Typo-Signatur Eyebrow: `text-[11px] uppercase tracking-[0.18em]` oder `font-mono text-[10.5px] uppercase tracking-[0.22em]` (`taste-SKILL.md:253`). Genau diese Signatur ist der Zähl-Marker im Pre-Flight.
- Cap: max 1 Eyebrow je 3 Sections, Hero zählt (`taste-SKILL.md:254`).
- Slop: Versionslabel im Hero (`taste-SKILL.md:632`), Nummerierungs-Eyebrows `001 · Capabilities` (`taste-SKILL.md:636`), farbige Status-Punkte überall (`taste-SKILL.md:646,672`), Pills über Bildern (`taste-SKILL.md:660`), `Most Popular`-Badge als Preis-Reflex (`unslop-react-design.md:41`).
- Nachbau, wenn ein Eyebrow nötig ist: `<p class="eyebrow">` mit `font-size:.6875rem; text-transform:uppercase; letter-spacing:.18em; color:var(--muted); margin-bottom:.75rem`. Keine Pill-Hülle, kein Punkt davor. Status-Punkt nur bei echtem Zustand: `<span role="status">` mit 8-px-Kreis in Semantikfarbe.

### 1.6 Karten / Bento / Feature-Grid
- Geometrie: Radius-Familie festlegen: all-sharp 0, all-soft 12-16 px, all-pill; Mischung nur mit dokumentierter Regel „Buttons pill, Cards 16, Inputs 8" (`taste-SKILL.md:217`). Bento-Zellenzahl = Inhaltszahl, keine Leerzelle (`taste-SKILL.md:250`). 2-3 Zellen mit realer Fläche (Bild, Verlauf, Muster, Tint) (`taste-SKILL.md:259`).
- Material: Karten nur bei echter Hierarchie, sonst `border-top`, `divide-y` oder Whitespace (`taste-SKILL.md:214`). Schatten in Hintergrundton tönen, kein reines Schwarz auf Hell (`taste-SKILL.md:215`). Dichte > 7: keine Card-Boxen, 1-px-Linien, Mono für Zahlen (`taste-SKILL.md:568`).
- Slop: drei gleiche Feature-Karten (`taste-SKILL.md:612`), Frosted-Glass-Karten als Politur (`unslop-react-design.md:26`), Raster-Textur/Dot-Field/Fake-Noise als Füller (`unslop-react-design.md:27`).
- Nachbau Bento: `.bento{display:grid;grid-template-columns:repeat(6,1fr);gap:16px}` mit `grid-column:span 4|2` je Zelle; Bildzelle `<img>` mit `object-fit:cover; aspect-ratio:4/3`; Tint-Zelle `background:color-mix(in oklab,var(--accent) 12%,var(--surface))`. Schatten: `box-shadow:0 1px 2px color-mix(in oklab,var(--page) 40%,black 12%)`.
- Spotlight-Border (REPORT-Übertragung `REPORT.md:84`): `--mx/--my` per Pointer setzen, `::before` mit `background:radial-gradient(160px circle at var(--mx) var(--my), var(--accent), transparent 70%)` unter einer inneren opaken Fläche (`inset:1px`); Focus-Ring unabhängig davon; auf Touch statisch.

### 1.7 Formulare
- Struktur: Label über Input, Helper optional aber im Markup, Error unter Input, `gap:8px` je Block (`taste-SKILL.md:231`). Kein Placeholder als Label (`taste-SKILL.md:232`). Feldfehler beim Feld, Meldung erklärt Reparatur, Eingaben bleiben erhalten (`REPORT.md:70`).
- Kontrast: Input, Placeholder, Focus-Ring, Helper, Error alle ≥ 4.5:1 gegen Section-Hintergrund (`taste-SKILL.md:228`).
- Nachbau: `<div class="field"><label for=e>…</label><input id=e aria-describedby="e-help e-err"><p id=e-help class=help></p><p id=e-err class=err role=alert></p></div>`; `.field{display:grid;gap:.5rem}`; `input{min-height:44px;border:1px solid var(--border);border-radius:var(--r-input);background:var(--surface)}`; `input:focus-visible{outline:2px solid var(--action);outline-offset:1px}`.

### 1.8 Tabellen / Listen / Spec-Sheets
- Regel: keine `border-top`+`border-bottom` auf jeder Zeile; eine Linie sparsam (`taste-SKILL.md:677`). > 5 Items brauchen ein anderes Component: 2-Spalten-Gruppen, Card-Grid, Tabs/Accordion, Scroll-Snap-Pills, Carousel, Marquee (`taste-SKILL.md:312-318`). Spec-Sheets: 2-col-Cards, gruppierte Chunks, Featured-vs-Rest (`taste-SKILL.md:319-323`).
- REPORT-Korrektur: Datenvergleich darf horizontales Scrollen oder priorisierte Spalten behalten; Wiederholung bei gleichen Daten ist Kohärenz, nicht Monotonie (`REPORT.md:72,74`).
- Slop: Vergleichs-Progressbars mit gefüllter Track-Fläche (`taste-SKILL.md:678`), FAQ als identische Hairline-Rows mit Plus rechts (`unslop-react-design.md:42`), dreistufiges Pricing zweimal (Cards, dann Tabelle) (`unslop-react-design.md:40`).
- Nachbau Spec-Gruppe: `<dl class="specs">` mit `display:grid;grid-template-columns:1fr 1fr;gap:24px 48px`; Gruppentitel als `<h3>` mit `border-top:1px solid var(--border);padding-top:16px`; Zeilen ohne Linie, Trennung über `gap`.

### 1.9 Charts
- Keine Chart-Beispiele im Paket. Nur Verbot: Score-Balken mit Hintergrund-Track als Vergleichsvisual (`taste-SKILL.md:678`). Ersatz: Zahl + kleines Icon oder Inline-Balken ohne Track. Nachbau: `<span class=bar style="--v:.62">` mit `::before{width:calc(var(--v)*100%);height:2px;background:var(--accent)}`, kein Track-Hintergrund.
- Sonst: unlesbar/nicht belegt.

### 1.10 Footer
- Slop: Versions-Footer `v1.4.2`, `Build 0048`, `last sync 4s ago · main` auf Marketing-Seiten (`taste-SKILL.md:662`), Wetter/Locale-Strips (`taste-SKILL.md:669`), Sticky-Abschluss-CTA (`unslop-react-design.md:48`), `Ready to …?` als Abschluss-Headline (`unslop-react-design.md:55`).
- Nachbau: Footer als opake Fläche gleicher Theme-Familie (`taste-SKILL.md:347`), eine Kontaktadresse erlaubt (`taste-SKILL.md:669`), Linkspalten mit `display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr))`.

### 1.11 Bilder
- Regel: Bild-Gen-Tool zuerst, dann `picsum.photos/seed/{beschreibend}/{w}/{h}`, sonst beschrifteter Slot (`taste-SKILL.md:270-279`). Auch minimalistische Seiten brauchen 2-3 echte Bilder (`taste-SKILL.md:281`; REPORT stuft das als Vorschlag ein, `REPORT.md:73`). Logo-Wall nur Logos als SVG (Simple Icons / devicon), keine Branchenlabels darunter (`taste-SKILL.md:283-288`). Keine Div-Fake-Screenshots (`taste-SKILL.md:296-300`). Keine Pills/Credits über oder unter Bildern als Deko (`taste-SKILL.md:660-661`).
- Material-Rollen (REPORT-Übertragung `REPORT.md:73`): Text und echte Controls = HTML; Foto, Illustration, Textur = Raster; geometrisch skalierbare Formen = SVG/CSS.
- Nachbau Bildmaske (`REPORT.md:88`): `<figure>` mit `clip-path:inset(0 round 16px)` oder SVG `<mask>`; Bild als `<img>` mit `object-position` als Focal-Point; Alt-Text nicht in Clip verstecken.

### 1.12 Hintergründe und Effekte
- Verbote: neon/outer glows (`taste-SKILL.md:600`), pures `#000`/`#fff` (`taste-SKILL.md:585,601`), übersättigte Akzente (`taste-SKILL.md:602`), gestapelte `linear-gradient`+`radial-gradient` überall (`unslop-react-design.md:22`), Grid-Textur/Dot-Field/Noise als Füller (`unslop-react-design.md:27`), Crosshair-Hairlines als Deko (`taste-SKILL.md:653`).
- Grain, wenn gewollt: nur auf `position:fixed; inset:0; pointer-events:none` Pseudo-Element mit hohem z-index, nie auf scrollenden Containern (`taste-SKILL.md:540`).
- Glas-Rezept mit Belegwerten (`taste-SKILL.md:1144-1200`): `border:1px solid rgb(255 255 255/.32)`; `background: linear-gradient(135deg, rgb(255 255 255/.30), rgb(255 255 255/.08)), rgb(255 255 255/.12)`; `backdrop-filter: blur(24px) saturate(180%) contrast(1.05)`; `box-shadow: inset 0 1px 0 rgb(255 255 255/.48), inset 0 -1px 0 rgb(255 255 255/.12), 0 18px 60px rgb(0 0 0/.18)`; `::before` mit radialem Highlight bei 20% 0%; `::after` als innerer 1-px-Rand `inset:1px`; Dark: `rgb(15 23 42/.42)` Basis; Fallback `@media (prefers-reduced-transparency: reduce){background:rgb(255 255 255/.96);backdrop-filter:none}`. Kürzeres Rezept: 1-px-Innenrand `border-white/10` + `inset 0 1px 0 rgba(255,255,255,.1)` (`taste-SKILL.md:356`). Nur für Premium-Consumer/Apple-nah/Media-Overlay, nicht für Dashboards/Public-Sector/B2B (`taste-SKILL.md:356`). Unslop zählt Glas-Karten als Default-Politur (`unslop-react-design.md:26`).
- Schatten: in Hintergrundton tönen (`taste-SKILL.md:215`); REPORT: Schattenfarbe aus der Fläche ableiten, keine starre Ein-Schatten-Formel (`REPORT.md:71`).

### 1.13 Motion
- Nur `transform` und `opacity` animieren (`taste-SKILL.md:527`). Easing `cubic-bezier(0.16,1,0.3,1)`, 0.3 s für Fluid-CSS (`taste-SKILL.md:561`); Reveal 0.6 s, Stagger 60 ms (`taste-SKILL.md:482-486`). `prefers-reduced-motion` ab Intensität > 3 Pflicht (`taste-SKILL.md:531`). Kein `window.addEventListener('scroll')` (`taste-SKILL.md:511`); CSS `animation-timeline: view()` erlaubt.
- Jede Animation in einem Satz begründbar: Hierarchie, Story, Feedback, Zustand (`taste-SKILL.md:361`). Marquee max 1 pro Seite (`taste-SKILL.md:362`).
- Slop: Fade-up als reflexhafte Politur (`unslop-react-design.md:64`, `REPORT.md:60`).
- Nachbau Sticky-Stack ohne GSAP (`REPORT.md:87`): `.stack>*{position:sticky;top:var(--stack-offset,24px)}` in begrenztem Container; Karte i bekommt `top:calc(24px + i*12px)`; ausreichend Scrollweg, kein verdeckter Inhalt mobil.
- Nachbau Reveal in CSS: `@media (prefers-reduced-motion:no-preference){.reveal{animation:up .6s cubic-bezier(.16,1,.3,1) both;animation-timeline:view();animation-range:entry 0% entry 30%}}`.

## 2. Farblogik als Rollentabelle

Keine Seite im Paket definiert eine Palette. Quellen liefern Verbote und Familien. Werte sind abgeleitete Startwerte, kein Beleg für ein konkretes Design.

| Rolle | Regel aus Quelle | Ableitung / Startwert |
|---|---|---|
| Page | kein reines `#fff`/`#000` (`taste-SKILL.md:585`) | Hell `#f7f7f6` neutral, Dark `#09090b` (zinc-950, `taste-SKILL.md:347,577`) |
| Surface | gleiche Theme-Familie, nur Tint-Stufe (`taste-SKILL.md:347`) | eine Stufe von Page entfernt, z. B. `#ffffff`→ vermeiden, besser `#fcfcfb`; Dark `#18181b` |
| Raised | Karte nur bei echter Hierarchie (`taste-SKILL.md:214`) | Surface + getönter Schatten `0 1px 2px` in Page-Hue |
| Action | 1 Akzent, Sättigung < 80 %, seitenweit gelockt (`taste-SKILL.md:186,189`) | z. B. Emerald, Electric Blue, Deep Rose, Burnt Orange (`taste-SKILL.md:187`) |
| Text | off-black (`taste-SKILL.md:601`) | `#111113`; Dark `#f4f4f5` |
| Muted | Body-Default `text-gray-600` (`taste-SKILL.md:167`) | `#52525b`, muss 4.5:1 halten |
| Border | 1-px-Linien statt Boxen bei Dichte (`taste-SKILL.md:568`) | `color-mix(in oklab, var(--text) 12%, var(--page))` |
| Accent (Glow/Deko) | keine Neon-/Outer-Glows (`taste-SKILL.md:600`) | nicht vorgesehen |
| Verbotene Familien | Beige+Brass+Espresso für Premium-Consumer (`taste-SKILL.md:194-196`); Charcoal+Cyan für Devtools; Cream+Sky für „friendly" (`unslop-react-design.md:23-24,70-71`) | Rotation: Cold Luxury, Forest, Black+Tan, Cobalt+Cream, Terracotta+Slate, Olive+Brick, Mono+Pop (`taste-SKILL.md:198-205`) |

REPORT: Kein Pflicht-Darkmode; Theme folgt Auftrag (`REPORT.md:66`). Taste: Page-Theme-Lock, keine Section invertiert (`taste-SKILL.md:343-347`).

## 3. Spacing-Rhythmus

- Section-Padding nach Dichte: Art Gallery `py-32`-`py-48` (128-192 px), Daily App `py-16`-`py-24` (64-96 px), Cockpit eng (`taste-SKILL.md:566-568`).
- Hero `pt-24` Cap (96 px) (`taste-SKILL.md:238`). Nav 64-72 px (`taste-SKILL.md:248`).
- Form-Block `gap:8px` (`taste-SKILL.md:231`). Grid-Gap Default `gap-6` = 24 px (`taste-SKILL.md:155`).
- Body `max-width:65ch`, `leading-relaxed` = 1.625 (`taste-SKILL.md:167`).
- Unslop: keine leeren Höhenbänder, keine `min-height:100vh` zum Kaschieren (`unslop-react-design.md:16-17,65`; `REPORT.md:58`). Proportion folgt Inhalt.
- Layout-Familien: ≥ 4 verschiedene bei 8 Sections (`taste-SKILL.md:251`); max 2 Zigzag in Folge (`taste-SKILL.md:252`). REPORT relativiert: Wiederholung bei gleichen Daten bewusst erhalten (`REPORT.md:74`).

## 4. Mobile-Hinweise

- Breakpoints `640/768/1024/1280/1536` (`taste-SKILL.md:151`). Taste: Varianz 4-10 kollabiert unter 768 px zwingend auf eine Spalte `w-full px-4 py-8` (`taste-SKILL.md:555`). REPORT korrigiert: explizite Anpassung ja, Einspaltigkeit nein; Tabellen dürfen horizontal scrollen, kleine Karten zwei Spalten (`REPORT.md:72`).
- `100dvh` statt `100vh` gegen iOS-Adressleiste (`taste-SKILL.md:153`).
- Grain nur auf fixiertem Pseudo-Element wegen Mobile-FPS (`taste-SKILL.md:540`).
- Spotlight/Tilt auf Touch statisch (`REPORT.md:84-85`).
- Keine Mobile-Screenshots im Paket: Tap-Größen, mobile Nav und Stack-Verhalten sind nicht belegt.

## 5. Gemeinsamkeiten im Paket

1. Beide Quellen definieren Slop über **wiederholte Code-Signaturen**, nicht über Geschmack: Unslop zählt (`unslop-README.md:22-30`), Taste bannt mechanisch prüfbare Muster (Eyebrow-Count `taste-SKILL.md:256`, Em-Dash `taste-SKILL.md:684-700`).
2. Beide verbieten dieselben CSS-Primitive als Default: `backdrop-filter`-Nav, Glow-Blobs per absolut positioniertem Pseudo-Element, `background-clip:text`, Viewport-Höhe als Drama (`unslop-react-design.md:61-65`; `taste-SKILL.md:600-604,153`).
3. Beide fordern **Beleg statt Trust-Patch**: keine `Trusted by`, keine erfundenen Metriken, keine Compliance-Logos ohne Bedarf (`unslop-react-design.md:45-47,51-52`; `taste-SKILL.md:616-619`; `REPORT.md:59`).
4. REPORT ist die Korrekturschicht: Zahlen sind Vorschläge, Zustände und Geometrie folgen der Aufgabe, Wiederholung ist erlaubt, wenn Daten gleich sind (`REPORT.md:66-74`).
5. Unslop selbst liefert **keine** Bauwerte, nur Verbote; die Methode verlangt Vorher/Nachher bei gleichem Brief und Viewport (`REPORT.md:52`).

## 6. Dos

- Radius-Familie schriftlich festlegen (z. B. Buttons pill, Cards 16, Inputs 8) und überall anwenden.
- Einen Akzent wählen, Sättigung < 80 %, auf jeder Section identisch.
- Hero als Grid mit echtem Motiv, Top-Padding ≤ 96 px, ≤ 4 Textelemente.
- Nav 64-72 px, eine Zeile, opak oder leicht transparent ohne Blur-Reflex.
- Schatten in Page-Hue tönen; Karten nur, wenn Elevation Hierarchie trägt.
- Label über Input, Error unter Input, `gap:8px`, alle Texte ≥ 4.5:1.
- Zustände aus der Funktion ableiten; Pending hält Breite und Namen.
- Reveal über CSS `animation-timeline:view()` oder IntersectionObserver, nur `transform`/`opacity`, Reduced-Motion-Block.
- Logos als SVG, ohne Labels; Bilder als `<img>` mit `object-fit`, Formen als SVG/CSS.
- Bei Serienarbeit Merkmal-Tabelle führen: Merkmal → IDs → n/N → Zweck → Alternative → Risiko (`REPORT.md:48`).

## 7. Don'ts

- `position:fixed`+`backdrop-filter` als Nav-Rezept ohne Funktion.
- Absolut positionierte Glow-Blobs, gestapelte Radial/Linear-Gradients, Noise/Dot-Grid als Füller.
- `background-clip:text` auf dem H1-Schlüsselwort; Serif-Wort in Sans-Headline; Fraunces/Instrument Serif als Reflex.
- Eyebrow über jeder Section; Nummern-Eyebrows; Versionslabel im Hero; Deko-Punkte; Em-Dash.
- Drei gleiche Feature-Cards; drei Pricing-Cards mit Mitte-Badge, danach dieselben Tarife als Tabelle.
- `h-screen`/`min-height:100vh` zum Strecken dünner Inhalte; leere Höhenbänder.
- Hairline über und unter jeder Zeile; Progressbars mit Track als Vergleich.
- Div-Fake-Screenshots; Pills und Foto-Credits über Bildern; Versions-Footer; Wetter/Locale-Strips; Scroll-Cues.
- `Trusted by`, `2,400+`, `99.9%`, `Get Started`, `Ready to …?` ohne Beleg oder Bezug.
- Reines `#000`/`#fff`; Neon-Outer-Glow; Warm-und-Kalt-Grau gemischt; Section-Theme-Flip mitten auf der Seite.

## 8. Unlesbar / nicht belegt

- Alle Screenshots: keine im Paket. Die 20 Unslop-Samples fehlen (`REPORT.md:44`). Die 34 Posts/69 Bilder sind nicht auffindbar (`REPORT.md:7-11`).
- Konkrete Hex-Werte für Page/Surface/Action einer realen Seite: nicht belegt; Tabelle oben ist Ableitung.
- Chart-Gestaltung, Tabellen-Zellenmaße, mobile Nav-Muster, Tap-Ziele: nicht belegt.
- Wirksamkeit der Unslop-Vorher/Nachher-Messung: CLI nicht ausgeführt (`REPORT.md:41`).
