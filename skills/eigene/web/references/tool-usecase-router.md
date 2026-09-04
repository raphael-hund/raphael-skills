# Tool-Use-Case-Router — Frontend-Tools fest im Loop 2

**Wofür:** Verbindlicher Entscheidungsbaum für die Tweet-/AgentReach-Tools.
Agenten wählen **Default + Install/Use + Gate**, nicht eine 160-Link-Liste.

**Wann laden:** Immer in den Schritten `art-direction`, `components` und
`build`, sobald UI-Inspiration, Komponenten, Icons, Fonts, Hintergründe,
Motion, Shader, Stock-Media oder React-Native-UI gebraucht werden.

**Goldstandard-Muster:** `bildgenerierung.md` (Bedarf → Baum → Befehl → Gate
→ Wann-nie). Diese Datei ist dasselbe für Code-/Asset-Tools.

**Kandidaten-URLs** stehen nur in `frontend-referenzbibliothek.md`. Hier gibt
es **keine Galerie-Dumps**. Ein Agent, der die 160 Links in die Antwort kippt,
verletzt diesen Router. Nach Wahl dieses Router-Falls kann
`node scripts/resource-access.mjs show "<Name>"` genau einen Katalogeintrag
(URL + sicheren Modus) nachschlagen; `show` bleibt lokal und installiert nie.
**Nach jeder Router-Wahl ist `open` Pflicht:**
`node scripts/resource-access.mjs open "<Name>"` nimmt die Katalog-URL und liest
die offizielle Site (Fetch, sonst Firecrawl). Erst dieser Öffnen-/Lesen-Schritt
zählt als Nutzung; `show` oder ein URL-Dump allein nicht. Unbekannter Name =
Exit 1, nicht raten. Nie die 160er-Liste in die Antwort kippen. Tiefzugriff
(Suche, Style-Seite, Registry, eine Komponente) über
`scripts/inspiration.mjs`; Doku `references/inspirations-quellen.md`.

## Ergebnis: die Werkzeugtabelle (Pflichtartefakt)

Der Router wird nicht "gelesen", er wird **gezogen**. Ergebnis ist immer eine
Tabelle in `client-<name>/web/art-direction.md`, geschrieben **bevor** der erste
Install läuft. Nur der Block zwischen exakt diesen Markern ist die
Werkzeugtabelle; eine frühere Token- oder Entscheidungstabelle zählt nicht:

<!-- WERKZEUGTABELLE:START -->
| Bedarf | Werkzeug | Befehl | Gate | Router-Anker | geprüft-am |
|---|---|---|---|---|---|
| FAQ-Sektion | shadcn Accordion | `npx shadcn@latest add accordion` | axe = 0, `aria-expanded` | `#faq` | 2026-08-03 |
| Feature-Icons | Lucide | `npm i lucide-react` | genau ein Icon-System | `#icons` | 2026-08-03 |
<!-- WERKZEUGTABELLE:ENDE -->

- Die Marker `<!-- WERKZEUGTABELLE:START -->` und
  `<!-- WERKZEUGTABELLE:ENDE -->` stehen je genau einmal; dazwischen steht nur
  die Werkzeugtabelle.
- Eine Zeile pro Bedarf, jede Zeile mit Router-Anker.
- Abweichung vom Default: ein Satz Grund **plus** AgentReach-Beleg (Datum, URL,
  Lizenzstand) in derselben Zeile.
- **Kein Paket in `package.json` ohne Zeile in dieser Tabelle.**
- Geprüft wird das am Ende deterministisch:
  `node /root/raphael-skills/skills/eigene/web/scripts/werkzeug-gate.mjs <projekt> --tabelle <pfad>/art-direction.md --profile node|static|cms`
  — genau eines der Profile `node`, `static`, `cms` wählen. `node` verlangt
  `package.json` und prüft dessen Abhängigkeiten. `static` und `cms` verlangen
  keine `package.json`; vorhandene Quellen und Abhängigkeiten werden weiterhin
  geprüft. Für alle Profile gelten echte Tabellenzeilen mit gültigem
  Router-Anker · genau ein Icon-System (auch bei Subpath-Importen) · kein
  `framer-motion` · Reduced Motion in jeder animierenden Datei, **egal welche
  Animations-Bibliothek** (`motion`, gsap, react-spring, animejs, Lottie …) ·
  keine Abhängigkeit (auch `dev`/`optional`) ohne Zeile, die selbst einen
  gültigen Anker trägt. Das Gate liest echte Import-Pfade, keine Stichwörter —
  ein auskommentierter Hinweis zählt nicht.

## Harte Regeln (vor jedem Default)

1. **Problem zuerst:** einen Bedarf aus der Tabelle wählen, nicht „irgendwas
   Schönes aus der Liste“.
2. **Ein Default pro Bedarf.** Alternativen nur mit Begründung im Projekt-Log
   (Lizenz, fehlendes Primitive, Brief verlangt anderen Look).
3. **Nie die ganze Bibliothek installieren.** shadcn/Magic/Aceternity/Three
   nur gezielt, eine Komponente oder ein Effekt nach dem anderen.
4. **Lizenz + Aktualität vor Install:** `agent-reach doctor --json`, dann
   offizielle Doku/Repo/Lizenz der gewählten Quelle öffnen. Unklar → anderen
   Default-Kandidaten derselben Zeile, nicht raten.
5. **Raphael-Stack bleibt Default:** Next.js App Router + Tailwind + Radix/
   shadcn (kopierter Code in `components/ui/`) + Motion als Paket `motion` mit
   Import `motion/react` nur wo CSS nicht reicht — `framer-motion` ist blockiert.
   Details in `radix-shadcn-tailwind-stack.md` und `motion-doktrin.md`.
6. **Reduced Motion + A11y-Gate** bei jeder Motion-/Overlay-Komponente
   (`useReducedMotion` oder CSS-Äquivalent, Tastatur, Fokus, Kontrast).
7. **Bilder/Illustrationen:** zuerst den Grafik-Medium-Entscheidungsbaum
   (`#grafik-baum`) durchgehen. KI-Inhaltsassets laufen weiter **ausschließlich**
   über `bildgenerierung.md` (Higgsfield). Stock- und Illustrations-Bibliotheken
   nur, wenn der Baum dorthin zeigt oder der Brief echte Fotos/Stock verlangt
   bzw. KI-Bilder verbietet.

## 0. Grafik-Medium-Entscheidungsbaum

**Anker:** `#grafik-baum` — dieser Wert gehört in die Spalte Router-Anker der Werkzeugtabelle.

*Gedanklicher Anstoß: Leon Lin, X-Post „How To Actually Design With AI", 2026;
Ressourcenpost 02.08.2026. Formulierung und Regeln sind hauseigen.*

Vor jedem Bild-, Icon- oder Hintergrund-Bedarf zuerst hier entlanggehen. Die
Frage lautet nie „welches Tool", sondern **welches Medium** die Fläche braucht.

| | Frage | Antwort → Ziel |
|---|---|---|
| **A** | Nur Form, Farbe, Zustand — kein Motiv? | CSS/Tailwind, keine Datei. `#background` Stufe 1 |
| **B** | Organische Fläche: Welle, Blob, Mesh, Trenner zwischen Sektionen? | Generator-Export. `#background` Stufe 2 — Defaults Haikei, Get Waves, fffuel, Shape Divider |
| **C** | Kleines Bedienzeichen, 24px, Strichstärke wie die UI? | `#icons` (Lucide) |
| **D** | Flache, generische Szene (Empty State, Onboarding, Feature) — Marke egal? | `#illustration-flat` |
| **E** | Szene, die nach dieser Marke aussehen muss, oder fotorealistisch? | `#bilder` → `bildgenerierung.md` |
| **F** | Vektor mit mehreren Teilen, die einzeln animiert werden sollen? | `#svg-custom` |
| **G** | Partikel, GPU, 3D, echte Tiefe? | `#webgl` — nur mit vorher notiertem Performance-Budget |
| **H** | Zeitbasierte Erzählung, echte Bewegung, Produktdemo? | `#video` — für einfache Deko/Transitions gilt weiter A–F zuerst |

- Von oben nach unten lesen, die **erste** passende Zeile gewinnt.
- Zwei Zeilen wirken passend → die billigere nehmen (A vor B vor D vor E vor G).
- Jede Antwort landet als eigene Zeile in der Werkzeugtabelle, mit dem Anker des
  Ziels, nicht mit `#grafik-baum`.

## Schnellwahl — Messlatte-Szenario

Auftrag: *„Landingpage mit Motion-Hero, Icons, Stock-Foto, FAQ-Accordion“*

| Bedarf | Default | Install / Use | Gate |
|---|---|---|---|
| FAQ-Accordion | shadcn/Radix Accordion | `npx shadcn@latest add accordion` | Tastatur, `aria-expanded`, ein Panel offen testen |
| Icons | Lucide | `npm i lucide-react` → `import { Icon } from "lucide-react"` | eine Icon-Familie, 24px-Grid, `aria-hidden` dekorativ |
| Stock-Foto | Shutterstock (`scripts/stock.mjs`) **oder** Higgsfield wenn KI ok | `stock search` → `preview` → `license --out` → `stock add`; sonst `bildgenerierung.md` | Model-Release/Kundenrecht; nicht als Kundenbeweis ausgeben |
| Motion-Hero | CSS/Tailwind zuerst; sonst Motion (`motion`/`motion/react`) + vendorierte Motion aus `ui-components/` | Datei aus `references/ui-components/motion/` kopieren oder gezielt `npm i motion` | `useReducedMotion()`, LCP-Hero nicht mit schweren WebGL-Effekten blockieren |

Verboten in diesem Szenario: Magic UI + Aceternity + daisyUI + Three.js parallel
„zum Ausprobieren“; 160 Links zitieren; ganze shadcn-Bibliothek adden.

Auftrag: *„Empty-State + Feature-Icons + Hero-Blob-SVG + FAQ“*

| Bedarf | Default | Install / Use | Gate |
|---|---|---|---|
| Empty-State | unDraw (`#illustration-flat`) | SVG exportieren, lokal versionieren, Farbe auf Kunden-Token | Lizenznotiz im Log; eine Illu-Bibliothek; kein Standardmotiv als Kundenbeweis |
| Feature-Icons | Baum-Frage C vs. D: reines Strichzeichen → Lucide; farbige Mini-Szene → `#illustration-flat`, markenspezifisch → `#bilder` | `npm i lucide-react` **oder** SVG aus der gewählten Illu-Bibliothek | Entscheidung steht als Zeile in der Werkzeugtabelle; nicht beides im selben Grid mischen |
| Hero-Blob-SVG | `#background` Stufe 1 CSS; erst bei Nein Stufe 2 Haikei-Export | CSS-Gradient in Tailwind; sonst SVG exportieren und committen | Kontrast Text/Hintergrund; kein Generator-Runtime im Bundle |
| FAQ | shadcn/Radix Accordion (`#faq`) | `npx shadcn@latest add accordion` | Tastatur, `aria-expanded` |

## Router nach Bedarf (Loop-2-Bindung)

Jede Zeile: **Bedarf** · **Loop-Schritt** · **Default** · **Install/Use** ·
**Alternativen** · **Gate** · **Nie**.

### 1. UI-Inspiration / Look-Referenzen

**Anker:** `#inspiration` — dieser Wert gehört in die Spalte Router-Anker der Werkzeugtabelle.

| | |
|---|---|
| **Bedarf** | Referenz-Looks für Art Direction, nicht zum Kopieren von Layout/Assets |
| **Loop** | `art-direction` (vor design-DNA) |
| **Default** | Refero-MCP (Styles→Screens→Flows, Reference-Lock nach `references/inspirations-quellen.md` §0) **oder** Mobbin-MCP (App/Flows) **oder** Godly — **eine** Quelle passend zum Brief. App/Flows: Mobbin zuerst. Benannter Startpunkt für maschinenlesbare Design-Systeme: `styles.refero.design` (Unterseite des Katalogeintrags `Refero`, `resource-access.mjs open "Refero"`) — genau eine Referenz ziehen, nicht durchblättern. |
| **Install/Use** | MCP-Status: `claude mcp list` (refero) und `/root/tools/raphael-mcp-ondemand.sh status` (mobbin). Mobbin-MCP OFF → `raphael-chrome` oder AgentReach, 3–7 echte Screenshots/Notizen in `art-direction.md`. Nie ein Mobbin-Browse erfinden. Galerien-Tiefzugriff: `node scripts/inspiration.mjs refero|landdding|awwwards|siteinspire|curated|getlayers|behance|inspora|swiped|navbar …`; Sehen: `inspiration.mjs shot <url>` + PNG per Read. **kein** npm |
| **Alternativen** | Awwwards, Land-book, Lapa Ninja, SiteInspire, Page Flows, Screenlane (siehe Bibliothek §Inspiration) |
| **Gate** | Lizenz/Urheber: nur Muster analysieren; keine Assets/Copy/Logos übernehmen (`web-clone-playbook.md` wenn Nachbau) |
| **Nie** | Referenz-HTML clonen ohne Lizenz-Check; 20 Galerien gleichzeitig öffnen |

### 1b. DESIGN.md-Export (optional, Tokens maschinell lintbar)

**Anker:** `#design-md-export` — dieser Wert gehört in die Spalte Router-Anker der Werkzeugtabelle.

| | |
|---|---|
| **Bedarf** | Die Tokens aus `client-<name>/web/art-direction.md` sollen zusätzlich in einem fremden, maschinell prüfbaren Format vorliegen |
| **Loop** | `art-direction`, **nach** der Tokens-Entscheidung — nie davor |
| **Default** | **Kein Export.** `art-direction.md` bleibt die Quelle (Raphael 02.09.2026). Der Export ist ein Zusatzartefakt auf ausdrücklichen Wunsch, kein Schritt jedes Projekts |
| **Install/Use** | Spec: `github.com/google-labs-code/design.md` (Apache-2.0, geprüft 02.09.2026). Linter ohne Install: `npx @google/design.md lint <pfad>/DESIGN.md`. Export wird **aus** `art-direction.md` geschrieben, nie umgekehrt zurückgelesen |
| **Alternativen** | Keine — entweder dieses Format oder gar kein Export |
| **Gate** | Linter Exit 0; jeder Token-Wert stammt wörtlich aus `art-direction.md`; Divergenz = `art-direction.md` gewinnt und der Export wird neu geschrieben |
| **Nie** | Die Root-`DESIGN.md` überschreiben — die ist der Nein-Ledger (`anfaenger-pfad.md` §2 Punkt 3), nicht die Token-Datei. Kein `npm i` für den Linter, kein Import fremder Spec-Dateien als Stilquelle |

### 2. Design-System / Basis-Komponenten (Button, Dialog, Tabs, Accordion, Form)

**Anker:** `#stack-primitives` — dieser Wert gehört in die Spalte Router-Anker der Werkzeugtabelle.

| | |
|---|---|
| **Bedarf** | Interaktive, a11y-korrekte Primitives im Agentur-Stack |
| **Loop** | `components` → `build` |
| **Default** | Radix Primitive + shadcn/ui in `components/ui/` (Theme = Kunden-Tokens in Tailwind) |
| **Install/Use** | Einmal: `npx shadcn@latest init` (falls neu). Danach **gezielt**: `npx shadcn@latest add button` · `add accordion` · `add dialog` · `add tabs` · `add select` … Nur was der Sitemap-Schnitt braucht. |
| **Alternativen** | Origin UI / Untitled UI React / Park UI wenn Brief anderes System verlangt; Radix Themes nur bei internen Tools ohne Brand (siehe `design-systeme-vergleich.md`) |
| **Gate** | Tastatur + Screenreader-Smoke; Bundle: keine ungenutzten `components/ui/*`; Markenfarben aus Brief, nicht shadcn-Default-Blau |
| **Nie** | `add` für die gesamte Registry; daisyUI/HyperUI als Parallel-System neben shadcn |

### 3. FAQ / Accordion / Disclosure

**Anker:** `#faq` — dieser Wert gehört in die Spalte Router-Anker der Werkzeugtabelle.

| | |
|---|---|
| **Bedarf** | FAQ-Sektion, „Für wen“, Einwände |
| **Loop** | `components` / `build` (Copy kommt aus `copy`) |
| **Default** | shadcn Accordion (Radix) |
| **Install/Use** | `npx shadcn@latest add accordion` |
| **Alternativen** | vendoriertes `ui-components/motion/bouncy-accordion.tsx` wenn Motion-Brief es verlangt + Reduced-Motion |
| **Gate** | `aria-expanded`, Fokus-Ring, nur ein Item oder dokumentiertes multi; FAQ-Inhalt aus Copy-Gate G2 |
| **Nie** | eigene Accordion-Logik ohne A11y; Aceternity-FAQ-Block als Default |


### 3b. Formular / Lead-Magnet-Popup / Multi-Step

**Anker:** `#formular` — dieser Wert gehört in die Spalte Router-Anker der Werkzeugtabelle.

| | |
|---|---|
| **Bedarf** | Kontakt-/Qualifizierungsformular, eingebettetes Ads-Formular, Popup-Lead-Magnet |
| **Loop** | `components` / `build` (+ `conversion-elemente.md` für Platzierung) |
| **Default** | Native `<input>`/`<textarea>` + Tailwind; shadcn `dialog` für Popup; shadcn `select`/`checkbox`/`radio-group` nur wo A11y-Verhalten nötig |
| **Install/Use** | `npx shadcn@latest add dialog` · `add label` · `add input` · `add checkbox` · `add select` (optional `add form` + react-hook-form/zod wenn komplex). Multi-Step: eigene Slides, **Kontaktdaten zuletzt** (qa-faecher hart). DSGVO-Consent als sichtbare Checkbox vor Submit, wenn personenbezogen. |
| **Alternativen** | vendoriertes `ui-components/motion/morphing-modal.tsx` / `file-upload.tsx` bei Motion-Brief; kein Drittanbieter-Form-Builder als Default |
| **Gate** | Tab-Reihenfolge, Labels, Fehlerzustände, Consent/DSGVO-Feld wenn personenbezogen; Popup nicht ohne Dismiss/Escape; Mobile-Tastatur verdeckt CTA nicht |
| **Nie** | Kontaktdaten im ersten Step; unsichtbare Pflichtfelder; Popup ohne Keyboard-Dismiss; Tracking vor Consent |

### 4. Icons

**Anker:** `#icons` — dieser Wert gehört in die Spalte Router-Anker der Werkzeugtabelle.

| | |
|---|---|
| **Bedarf** | UI-Icons in einer Linie |
| **Loop** | `components` / `build` |
| **Default** | Lucide (`lucide-react`) — passt zu shadcn |
| **Install/Use** | `npm i lucide-react` · `import { ArrowRight } from "lucide-react"`. Andere Familie: `iconify-pp-cli icons --query "<begriff>" --prefixes <familien> --json` → Lizenz mit `collections` prüfen → `iconify-pp-cli svg <prefix> <name> --deliver file:<pfad>`; genau eine Familie. |
| **Alternativen** | Heroicons, Phosphor, Radix Icons, Tabler — nur eine Familie pro Produkt |
| **Gate** | einheitliche Stroke/Größe; dekorative Icons `aria-hidden`; Markenlogos ≠ Icon-Set (Simple Icons nur für Marken-Markierungen mit Markenrecht) |
| **Nie** | Lucide + Phosphor + Icons8 mischen; Icons8-Premium ohne Lizenz |

**Abgrenzung:** Ein Feature-Grid mit farbigen Mini-Illustrationen (Icon *mit
Szene*, mehrfarbig, größer als UI-Maß) ist **kein** Lucide-Fall. Solche Flächen
laufen über `#illustration-flat` — oder über `#bilder`, wenn der Brief eine
markenspezifische Bildsprache verlangt. Lucide bleibt UI-Chrome: Navigation,
Buttons, Zustände, Listen.

### 4b. Illustration-Kits (flache, generische Szenen)

**Anker:** `#illustration-flat` — dieser Wert gehört in die Spalte Router-Anker der Werkzeugtabelle.

| | |
|---|---|
| **Bedarf** | Empty State, Onboarding-Schritt, Feature-Illustration — generischer Stil ist ausdrücklich in Ordnung |
| **Loop** | `art-direction` → `components` / `build` |
| **Default** | unDraw (SVG, Farbe auf den Kunden-Token gestellt) |
| **Install/Use** | SVG exportieren, in `public/` oder als Komponente **lokal versionieren**, Lizenznotiz ins Projekt-Log; kein Hotlink auf die Anbieter-CDN |
| **Alternativen** | Storyset, Open Doodles, Humaaans, Blush, DrawKit, Illustrations.co — **maximal eine** Bibliothek pro Projekt |
| **Gate** | Lizenz gelesen und notiert; Stil passt zur Design-DNA; kein Bibliotheks-Standardmotiv als Kundenbeweis oder Referenz-Beleg |
| **Nie** | Library-Default nehmen, wenn der Brief eine Marken-Illustration verlangt → dann `#bilder`; zwei Illu-Bibliotheken mischen |

### 5. Motion-UI / Micro-Interactions

**Anker:** `#motion` — dieser Wert gehört in die Spalte Router-Anker der Werkzeugtabelle.

| | |
|---|---|
| **Bedarf** | Hover, Enter/Exit, Shared-Layout, gestische UI |
| **Loop** | `components` / `build` |
| **Default** | 1) CSS/Tailwind transitions 2) vendorierte Datei aus `references/ui-components/` 3) Motion — Paket `motion`, Import `motion/react` — nur wenn CSS nicht reicht (`motion-doktrin.md`) |
| **Install/Use** | `npm i motion` (NICHT `framer-motion`), `import { motion, useReducedMotion } from "motion/react"` · Komponente **ganz** aus `ui-components/motion/` kopieren (inkl. `lib/ease.ts` / `lib/utils.ts`). Komponente ziehen: `node scripts/komponenten.mjs libs` → `search <lib\|@ns> "<begriff>"` → `view <@ns/name>` → `node scripts/komponenten.mjs get @ns/name --out src/components/vendor/<ns>/`. Danach Werkzeugtabelle. |
| **Alternativen** | Magic UI, Motion Primitives, Aceternity, Animata — **eine** Komponente nach AgentReach-Lizenz/Wartungscheck, nicht das Starter-Kit |
| **Gate** | `useReducedMotion()` oder CSS `prefers-reduced-motion`; keine Layout-Shift-Fallen; Lighthouse a11y |
| **Nie** | `framer-motion`; Motion für jeden Button-Hover; drei Motion-Libraries parallel; JS-Animation ohne Reduced-Motion — gilt für **jede** Bibliothek (gsap, react-spring, animejs, Lottie), nicht nur für den Default; die globale CSS-Media-Query stoppt JS nicht |

### 6. Marketing-Sections / Blocks (Hero, Bento, Pricing, Logo-Cloud)

**Anker:** `#sections` — dieser Wert gehört in die Spalte Router-Anker der Werkzeugtabelle.

| | |
|---|---|
| **Bedarf** | Große Landing-Sektionen jenseits von Primitives |
| **Loop** | `components` / `build` |
| **Default** | Eigenes Tailwind-Markup nach `art-direction` + `landingpage-struktur.md`; shadcn-Blöcke nur als strukturelle Hilfe |
| **Install/Use** | Kein Mega-Kit. Komponente ziehen: `node scripts/komponenten.mjs libs` → `search <lib\|@ns> "<begriff>"` → `view <@ns/name>` → `node scripts/komponenten.mjs get @ns/name --out src/components/vendor/<ns>/`. 21st: `node scripts/design-mcp.mjs 21st search "<begriff>"` → `21st get <id> --out src/components/vendor/21st/`. Eine Komponente pro Bedarf, dann Werkzeugtabelle. |
| **Alternativen** | 21st.dev (`inspiration.mjs 21st code <id> --out src/components/vendor/21st/`, Builder-Plan), React Bits, Cult UI, Float UI, Preline — **eine** geprüfte Section |
| **Gate** | Design-DNA einhalten; Copy aus G2; Mobile-First; keine fremden Logos/Stock aus dem Demo |
| **Nie** | ganze Block-Library committen; Demo-Copy/Images aus dem Kit lassen |

### 7. Hero-Hintergrund / Gradient / Pattern / Blob

**Anker:** `#background` — dieser Wert gehört in die Spalte Router-Anker der Werkzeugtabelle.

**Stufen — erst hoch, wenn die Stufe darunter ein klares Nein ist:**

| Stufe | Mittel | Gilt wenn |
|---|---|---|
| 1 | Gradient/Pattern rein aus CSS + Kunden-Token | Farbverlauf oder einfaches Muster reicht |
| 2 | Exportiertes Wave-/Blob-/Mesh-SVG (Haikei, fffuel, Get Waves) | Stufe 1 kann die organische Form nicht |
| 3 | Shape Divider zwischen zwei Sektionen (optional) | ein Sektionsübergang soll gebrochen werden |
| 4 | Fotoähnliche Fläche → `#bilder` | der Hintergrund ist eigentlich ein Bild |
| 5 | Heavy/GPU → `#webgl` | Bewegung/Tiefe, die SVG nicht leistet |

| | |
|---|---|
| **Bedarf** | Dekorativer Hintergrund ohne schwere 3D-Pipeline |
| **Loop** | `art-direction` → `build` |
| **Default** | **CSS zuerst** (Stufe 1). Generator erst, wenn Stufe 1 begründet nicht reicht |
| **Install/Use** | Generator über `node scripts/resource-access.mjs open "<exakter Name>"` öffnen → **SVG/CSS lokal exportieren und committen**; Generator-Skript nicht in Produktion. Wiederverwendbare Registry-Backgrounds über `komponenten.mjs search → view → get --out`, danach Werkzeugtabelle. |
| **Alternativen** | BGJar, SVG Backgrounds, MagicPattern, Coolors nur für Palette; tsParticles/Vanta.js **nur** wenn der Brief einen Partikel-Hintergrund verlangt |
| **Gate** | SVG auf eingebettete Skripte prüfen; Dateigröße; Kontrast Text/Hintergrund; bei tsParticles/Vanta zusätzlich Reduced-Motion-Fallback (statische Fläche) |
| **Nie** | Generator-Runtime in den Client bundlen; unlizenzierte PNG-Texturen |

### 7b. Custom-SVG / Layered-SVG

**Anker:** `#svg-custom` — dieser Wert gehört in die Spalte Router-Anker der Werkzeugtabelle.

| | |
|---|---|
| **Bedarf** | Mehrteilige Vektorgrafik, deren Teile einzeln auf Hover/Scroll reagieren sollen — oder eine Icon-Marke |
| **Loop** | `art-direction` → `components` / `build` |
| **Default** | Von Hand gebautes, einfaches SVG mit benannten Gruppen. Komplexe Generierung nur mit Quiver, und erst nach Lizenzcheck |
| **Install/Use** | SVG nach `public/` **oder** als React-Komponente inlinen; Teile über CSS-Klassen bzw. `motion` ansteuern; Reduced Motion ist Pflicht |
| **Alternativen** | Statisches SVG ohne Layer, wenn die Bewegung nicht trägt; Lottie (`#video`) bei erzählender Animation |
| **Gate** | kein `<script>` und keine externen Fonts/Referenzen im SVG; Dateigröße geprüft; `aria-hidden` wenn rein dekorativ, sonst `role="img"` + Titel |
| **Nie** | Fremd-SVG mit unklarer Lizenz inlinen; Layer-Animation ohne `prefers-reduced-motion` |

### 8. Shader / WebGL / 3D-Hero

**Anker:** `#webgl` — dieser Wert gehört in die Spalte Router-Anker der Werkzeugtabelle.

| | |
|---|---|
| **Bedarf** | Bewusst „heavy“ Creative-Hero, nur wenn Brief/Performance es tragen |
| **Loop** | `components` / `build` (nach Performance-Budget in art-direction) |
| **Default** | Kein Shader. Wenn nötig: React Three Fiber **oder** leichter Canvas (OGL) mit Mobile-Fallback-Bild |
| **Install/Use** | `npm i three @react-three/fiber @react-three/drei` nur bei R3F-Wahl; weitere Runtime-Pakete laut `zugangskarte.md`. Shader-/Demo-Recherche: `codrops-pp-cli posts list --search "webgl" --per-page 10 --json` → `posts get <id>` oder `resource-access.mjs open "<Quelle>"`; Code erst nach Lizenzprüfung. Lazy-load; Fallback `<Image>`. |
| **Alternativen** | Three.js vanilla, PixiJS, Theatre.js, GSAP (Lizenz!), Shadertoy nur zum Lernen |
| **Gate** | Mobile FPS/Fallback; Reduced Motion → statisches Poster; Bundle-Budget dokumentiert; keine Autoplay-Audio |
| **Nie** | Shadertoy-Demo 1:1 in Kundenprod; WebGL ohne Fallback; GSAP-Club-Plugins ohne Lizenz |

### 9. Inhalts-Bilder / Illustrationen (keine UI-Mockups)

**Anker:** `#bilder` — dieser Wert gehört in die Spalte Router-Anker der Werkzeugtabelle.

| | |
|---|---|
| **Bedarf** | Hero-Foto, Produkt, Szene, 2D/3D-Illustration auf der Seite |
| **Loop** | `art-direction` → Assets vor/während `build` |
| **Default** | Skill **`higgsfield`** (`/higgsfield`), CLI-Details in `bildgenerierung.md` (GPT Image 2) |
| **Install/Use** | Skill `higgsfield` zuerst, dann `bildgenerierung.md` + `scripts/bilder.mjs` (AVIF + Index). Pexels-Fallback: `pexels-pp-cli photos search --query "<begriff>" --per-page 6 --json`; nur die gewählte `src.large`-URL mit `curl -L` lokal speichern (kein Download-`--out`). |
| **Alternativen** | Kundenechte Fotos; **Shutterstock über `scripts/stock.mjs`** (Abo, Standardlizenz, `references/stock-bilder.md`) wenn echte Menschen/Orte/Produkte oder KI-Verbot; Unsplash/Pexels nur ohne Abo-Passung |
| **Gate** | AVIF + `bilder-index.json`; Uncanny-Check bei KI-Menschen; kein Stock als „Kundenbeweis“; Stock: Zeile in `stock-lizenzen.json` |
| **Nie** | Stock-Pipeline als Default wenn Higgsfield erlaubt; Nano Banana als Final; doppelte Bild-Doktrin erfinden |

### 10. Video / Lottie / Rive

**Anker:** `#video` — dieser Wert gehört in die Spalte Router-Anker der Werkzeugtabelle.

| | |
|---|---|
| **Bedarf** | Motion-Explainers, Mikro-Illustrationen, Produkt-Loops |
| **Loop** | `components` / `build` |
| **Default** | Lottie sparsam **oder** kurzes Mute-Loop (Mixkit/Coverr/eigenes); schwere Product-Videos → `remotion-produktionsweg.md` |
| **Install/Use** | `npm i lottie-react` bei Lottie; Datei lokal hosten; `prefers-reduced-motion` → statischer Frame |
| **Alternativen** | Rive, Spline (3D-Interaktiv, Performance prüfen), Remotion für programmatisches Video |
| **Gate** | Autoplay nur muted; Dateigröße; Reduced Motion; Tracking-freie Self-Host-Files |
| **Nie** | externe Lottie-CDN-Abhängigkeit ohne Fallback; Spline-Hero auf Low-End-Mobile ohne Poster |

### 11. Fonts / Typografie

**Anker:** `#fonts` — dieser Wert gehört in die Spalte Router-Anker der Werkzeugtabelle.

| | |
|---|---|
| **Bedarf** | Webfonts für Marke |
| **Loop** | `art-direction` → `build` |
| **Default** | Immer die **Adobe Fonts Library** nutzen. Familie dort wählen. Seite lädt über das hinterlegte Kit (`use.typekit.net/<id>.css` plus die Kit-`font-family`-Namen). Lokales Pack: `references/adobe-fonts/` (`head.html`, `tokens.css`, `next-head.tsx`). Quelle: `node scripts/adobe-fonts-kit.mjs files`. Liegen lizenzierte Kunden-Brand-Dateien vor, gelten diese Dateien zuerst — dann nur diese lokal einbinden. |
| **Install/Use** | Immer die **Adobe Fonts Library**. `node scripts/adobe-fonts-kit.mjs apply <projekt>` schreibt Embed + Tokens nach `<projekt>/adobe-fonts/`. Familie nachschlagen: `node scripts/adobe-fonts-kit.mjs show Fieldwork` (Bibliothek `/root/tools/adobe-fonts-library`). Fontshare nur zur Recherche: `fontshare-pp-cli fonts list --search "<begriff>" --limit 20 --json` → `fonts get <slug>`; Lizenzfeld prüfen, nicht installieren. Höchstens zwei Familien. Kein Adobe-Login. |
| **Alternativen** | Keine andere Foundry. Nur lizenzierte Kunden-Brand-Dateien ersetzen die Adobe Fonts Library. Typewolf/Fonts In Use nur zur Recherche. |
| **Gate** | Kit-Embed im Dokument; keine Adobe-`.woff`/`.ttf` im Repo; Zeichensatz DE; Fallback-Stack |
| **Nie** | Adobe-Bibliothek herunterladen; Adobe-Webfonts selbst hosten; Google-Fonts-CDN als Default; `next/font/google` als Default; fünf Familien |

### 12. Texturen / 3D-Assets

**Anker:** `#texturen` — dieser Wert gehört in die Spalte Router-Anker der Werkzeugtabelle.

| | |
|---|---|
| **Bedarf** | PBR-Texturen, einfache 3D-Props |
| **Loop** | `build` (nur mit 3D/Shader-Bedarf) |
| **Default** | ambientCG oder Poly Haven (Lizenz pro Asset lesen) |
| **Install/Use** | Poly Haven: `polyhaven-pp-cli assets --type textures\|hdris\|models --categories <wert> --json` → `info <id>` → `files <id>`; nur die gewählte Datei-URL mit `curl -L` lokal speichern (kein Download-`--out`). ambientCG: `curl -s 'https://ambientcg.com/api/v2/full_json?q=<begriff>&type=Material&limit=5&include=downloadData'` → `downloadLink` per `curl -L` (CC0). Andere Quellen: `resource-access.mjs open "<exakter Name>"`, lokal versionieren, Lizenz/Attribution ins Projekt-Log. |
| **Alternativen** | Texturelabs, Kenney, Quaternius, FreePBR |
| **Gate** | Lizenz/Attribution; Auflösung/LOD; keine Scraping-Pakete |
| **Nie** | ganze Texture-Packs ungenutzt committen |

### 13. React Native / Mobile UI

**Anker:** `#mobile` — dieser Wert gehört in die Spalte Router-Anker der Werkzeugtabelle.

| | |
|---|---|
| **Bedarf** | Native App-UI (nicht responsive Web) |
| **Loop** | `components` / `build` nur bei RN-Brief |
| **Default** | React Native Reusables **oder** gluestack — an Expo/RN-Version koppeln |
| **Install/Use** | offizielle CLI/Doku des Defaults; New Architecture-Kompat prüfen |
| **Alternativen** | Tamagui, Paper, RN UI Lib, Elements |
| **Gate** | iOS+Android-Parität der genutzten Components; A11y-APIs; Reanimated-Version |
| **Nie** | Web-shadcn 1:1 nach RN kopieren; RN-Kit auf reine Marketing-Website ziehen |

## AgentReach-Pflicht vor Install (kurz)

Vor jeder Empfehlung oder Installation `agent-reach doctor --json` ausführen
und den aktiven öffentlichen Web-/Search-Kanal verwenden. Danach die
öffentliche Website und offizielle Doku der gewählten Quelle öffnen; bei Code
zusätzlich offizielles Repository und Lizenzdatei prüfen.

Im Projekt-Log festhalten: Datum, URL, Lizenzstand, Version/Release und jede
offene Unsicherheit. Scheitert der Check oder bleibt die Lizenz unklar, nichts
installieren, sondern eine besser belegte Alternative aus derselben
Router-Zeile wählen.

Vollständige Kandidatenlisten: `frontend-referenzbibliothek.md`.
Stack-Details: `radix-shadcn-tailwind-stack.md`.
Motion-Prinzipien: `motion-doktrin.md`.
Bild-Assets: `bildgenerierung.md`.
