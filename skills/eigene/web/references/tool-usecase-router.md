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
verletzt diesen Router.

## Ergebnis: die Werkzeugtabelle (Pflichtartefakt)

Der Router wird nicht "gelesen", er wird **gezogen**. Ergebnis ist immer eine
Tabelle in `client-<name>/web/art-direction.md`, geschrieben **bevor** der erste
Install läuft:

| Bedarf | Werkzeug | Befehl | Gate | Router-Anker | geprüft-am |
|---|---|---|---|---|---|
| FAQ-Sektion | shadcn Accordion | `npx shadcn@latest add accordion` | axe = 0, `aria-expanded` | `#faq` | 2026-08-03 |
| Feature-Icons | Lucide | `npm i lucide-react` | genau ein Icon-System | `#icons` | 2026-08-03 |

- Eine Zeile pro Bedarf, jede Zeile mit Router-Anker.
- Abweichung vom Default: ein Satz Grund **plus** AgentReach-Beleg (Datum, URL,
  Lizenzstand) in derselben Zeile.
- **Kein Paket in `package.json` ohne Zeile in dieser Tabelle.**
- Geprüft wird das am Ende deterministisch:
  `node scripts/werkzeug-gate.mjs <projekt> --tabelle <pfad>/art-direction.md`
  — echte Tabellenzeilen mit gültigem Router-Anker · genau ein Icon-System
  (auch bei Subpath-Importen) · kein `framer-motion` · Reduced Motion in jeder
  animierenden Datei, **egal welche Animations-Bibliothek** (motion, gsap,
  react-spring, animejs, Lottie …) · keine Abhängigkeit (auch `dev`/`optional`)
  ohne Zeile, die selbst einen gültigen Anker trägt. Das Gate liest echte
  Import-Pfade, keine Stichwörter — ein auskommentierter Hinweis zählt nicht.

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
   shadcn (kopierter Code in `components/ui/`) + Framer Motion nur wo CSS nicht
   reicht — Details in `radix-shadcn-tailwind-stack.md` und `motion-doktrin.md`.
6. **Reduced Motion + A11y-Gate** bei jeder Motion-/Overlay-Komponente
   (`useReducedMotion` oder CSS-Äquivalent, Tastatur, Fokus, Kontrast).
7. **Bilder/Illustrationen** laufen weiter über `bildgenerierung.md`
   (Higgsfield). Stock ist nur Fallback, wenn der Brief echte Fotos/Stock will
   oder KI-Bilder verboten sind.

## Schnellwahl — Messlatte-Szenario

Auftrag: *„Landingpage mit Motion-Hero, Icons, Stock-Foto, FAQ-Accordion“*

| Bedarf | Default | Install / Use | Gate |
|---|---|---|---|
| FAQ-Accordion | shadcn/Radix Accordion | `npx shadcn@latest add accordion` | Tastatur, `aria-expanded`, ein Panel offen testen |
| Icons | Lucide | `npm i lucide-react` → `import { Icon } from "lucide-react"` | eine Icon-Familie, 24px-Grid, `aria-hidden` dekorativ |
| Stock-Foto | Unsplash (Lizenz lesen) **oder** Higgsfield wenn KI ok | Download + Attribution laut Lizenz; sonst `bildgenerierung.md` | Model-Release/Kundenrecht; nicht als Kundenbeweis ausgeben |
| Motion-Hero | CSS/Tailwind zuerst; sonst Framer + vendorierte Motion aus `ui-components/` | Datei aus `references/ui-components/motion/` kopieren oder gezieltes `motion`-API | `useReducedMotion()`, LCP-Hero nicht mit schweren WebGL-Effekten blockieren |

Verboten in diesem Szenario: Magic UI + Aceternity + daisyUI + Three.js parallel
„zum Ausprobieren“; 160 Links zitieren; ganze shadcn-Bibliothek adden.

## Router nach Bedarf (Loop-2-Bindung)

Jede Zeile: **Bedarf** · **Loop-Schritt** · **Default** · **Install/Use** ·
**Alternativen** · **Gate** · **Nie**.

### 1. UI-Inspiration / Look-Referenzen

**Anker:** `#inspiration` — dieser Wert gehört in die Spalte Router-Anker der Werkzeugtabelle.

| | |
|---|---|
| **Bedarf** | Referenz-Looks für Art Direction, nicht zum Kopieren von Layout/Assets |
| **Loop** | `art-direction` (vor design-DNA) |
| **Default** | Godly (Marketing/Awwwards-Look) **oder** Mobbin (App/Flows) **oder** Refero (UI-Patterns) — **eine** Quelle passend zum Brief |
| **Install/Use** | Seite im Browser/AgentReach öffnen, 3–7 Screenshots/Notizen in `art-direction.md`; **kein** npm |
| **Alternativen** | Awwwards, Land-book, Lapa Ninja, SiteInspire, Page Flows, Screenlane (siehe Bibliothek §Inspiration) |
| **Gate** | Lizenz/Urheber: nur Muster analysieren; keine Assets/Copy/Logos übernehmen (`web-clone-playbook.md` wenn Nachbau) |
| **Nie** | Referenz-HTML clonen ohne Lizenz-Check; 20 Galerien gleichzeitig öffnen |

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
| **Install/Use** | `npm i lucide-react` · `import { ArrowRight } from "lucide-react"` |
| **Alternativen** | Heroicons, Phosphor, Radix Icons, Tabler — nur eine Familie pro Produkt |
| **Gate** | einheitliche Stroke/Größe; dekorative Icons `aria-hidden`; Markenlogos ≠ Icon-Set (Simple Icons nur für Marken-Markierungen mit Markenrecht) |
| **Nie** | Lucide + Phosphor + Icons8 mischen; Icons8-Premium ohne Lizenz |

### 5. Motion-UI / Micro-Interactions

**Anker:** `#motion` — dieser Wert gehört in die Spalte Router-Anker der Werkzeugtabelle.

| | |
|---|---|
| **Bedarf** | Hover, Enter/Exit, Shared-Layout, gestische UI |
| **Loop** | `components` / `build` |
| **Default** | 1) CSS/Tailwind transitions 2) vendorierte Datei aus `references/ui-components/` 3) Framer Motion — Paket heißt `motion`, Import `motion/react` — nur wenn CSS nicht reicht (`motion-doktrin.md`) |
| **Install/Use** | `npm i motion` (NICHT `framer-motion`), `import { motion, useReducedMotion } from "motion/react"` · Komponente **ganz** aus `ui-components/motion/` kopieren (inkl. `lib/ease.ts` / `lib/utils.ts`) |
| **Alternativen** | Magic UI, Motion Primitives, Aceternity, Animata — **eine** Komponente nach AgentReach-Lizenz/Wartungscheck, nicht das Starter-Kit |
| **Gate** | `useReducedMotion()` oder CSS `prefers-reduced-motion`; keine Layout-Shift-Fallen; Lighthouse a11y |
| **Nie** | Framer für jeden Button-Hover; drei Motion-Libraries parallel; JS-Animation ohne Reduced-Motion — gilt für **jede** Bibliothek (gsap, react-spring, animejs, Lottie), nicht nur für den Default; die globale CSS-Media-Query stoppt JS nicht |

### 6. Marketing-Sections / Blocks (Hero, Bento, Pricing, Logo-Cloud)

**Anker:** `#sections` — dieser Wert gehört in die Spalte Router-Anker der Werkzeugtabelle.

| | |
|---|---|
| **Bedarf** | Große Landing-Sektionen jenseits von Primitives |
| **Loop** | `components` / `build` |
| **Default** | Eigenes Tailwind-Markup nach `art-direction` + `landingpage-struktur.md`; shadcn-Blöcke nur als strukturelle Hilfe |
| **Install/Use** | Kein Mega-Kit. Optional gezielt: shadcn blocks / einzelne Magic-UI-Section nach Prüfung |
| **Alternativen** | React Bits, 21st.dev, Cult UI, Float UI, Preline — Inspiration oder **eine** geprüfte Section |
| **Gate** | Design-DNA einhalten; Copy aus G2; Mobile-First; keine fremden Logos/Stock aus dem Demo |
| **Nie** | ganze Block-Library committen; Demo-Copy/Images aus dem Kit lassen |

### 7. Hero-Hintergrund / Gradient / Pattern / Blob

**Anker:** `#background` — dieser Wert gehört in die Spalte Router-Anker der Werkzeugtabelle.

| | |
|---|---|
| **Bedarf** | Dekorativer Hintergrund ohne schwere 3D-Pipeline |
| **Loop** | `art-direction` → `build` |
| **Default** | CSS/Tailwind Gradients + ggf. SVG-Pattern (Hero Patterns / eigenes SVG) |
| **Install/Use** | Generator (Haikei, fffuel, Get Waves, Mesh Gradient …) → **SVG/CSS exportieren und committen**; Generator-Skript nicht in Produktion |
| **Alternativen** | BGJar, SVG Backgrounds, MagicPattern, Coolors nur für Palette |
| **Gate** | SVG auf eingebettete Skripte prüfen; Dateigröße; Kontrast Text/Hintergrund |
| **Nie** | Generator-Runtime in den Client bundlen; unlizenzierte PNG-Texturen |

### 8. Shader / WebGL / 3D-Hero

**Anker:** `#webgl` — dieser Wert gehört in die Spalte Router-Anker der Werkzeugtabelle.

| | |
|---|---|
| **Bedarf** | Bewusst „heavy“ Creative-Hero, nur wenn Brief/Performance es tragen |
| **Loop** | `components` / `build` (nach Performance-Budget in art-direction) |
| **Default** | Kein Shader. Wenn nötig: React Three Fiber **oder** leichter Canvas (OGL) mit Mobile-Fallback-Bild |
| **Install/Use** | `npm i three @react-three/fiber @react-three/drei` nur bei R3F-Wahl; Lazy-load; Fallback `<Image>` |
| **Alternativen** | Three.js vanilla, PixiJS, Theatre.js, GSAP (Lizenz!), Shadertoy nur zum Lernen |
| **Gate** | Mobile FPS/Fallback; Reduced Motion → statisches Poster; Bundle-Budget dokumentiert; keine Autoplay-Audio |
| **Nie** | Shadertoy-Demo 1:1 in Kundenprod; WebGL ohne Fallback; GSAP-Club-Plugins ohne Lizenz |

### 9. Inhalts-Bilder / Illustrationen (keine UI-Mockups)

**Anker:** `#bilder` — dieser Wert gehört in die Spalte Router-Anker der Werkzeugtabelle.

| | |
|---|---|
| **Bedarf** | Hero-Foto, Produkt, Szene, 2D/3D-Illustration auf der Seite |
| **Loop** | `art-direction` → Assets vor/während `build` |
| **Default** | **Higgsfield laut `bildgenerierung.md`** (GPT Image 2 / Recraft-Baum) |
| **Install/Use** | siehe `bildgenerierung.md` + `scripts/bilder.mjs` (AVIF + Index) |
| **Alternativen** | Kundenechte Fotos; Stock nur wenn Brief Stock/KI-Verbot: Unsplash/Pexels/Pixabay mit Lizenznotiz |
| **Gate** | AVIF + `bilder-index.json`; Uncanny-Check bei KI-Menschen; kein Stock als „Kundenbeweis“ |
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
| **Default** | **Kunden-/Brand-Fonts self-hosted** (`@font-face`, subset). Kein Google-Fonts-CDN-Default. |
| **Install/Use** | Dateien nach `public/fonts/` · Tailwind `fontFamily` · `pdffonts`/Screenshot-Check bei PDF-Export |
| **Alternativen** | Fontshare, Bunny/Google **self-hosted** nach Lizenz; Typewolf/Fonts In Use nur Inspiration |
| **Gate** | Lizenz erlaubt Web/Kundenprojekt; FOIT/FOUT geplant; Zeichensatz DE; Fallback-Stack |
| **Nie** | Google-Fonts-CDN in Prod ohne Freigabe; gefundene Display-Font ohne Lizenz; fünf Familien |

### 12. Texturen / 3D-Assets

**Anker:** `#texturen` — dieser Wert gehört in die Spalte Router-Anker der Werkzeugtabelle.

| | |
|---|---|
| **Bedarf** | PBR-Texturen, einfache 3D-Props |
| **Loop** | `build` (nur mit 3D/Shader-Bedarf) |
| **Default** | ambientCG oder Poly Haven (Lizenz pro Asset lesen) |
| **Install/Use** | Asset downloaden, lokal versionieren, Attribution in Projekt-Log |
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

```bash
agent-reach doctor --json
# dann öffentliche Doku/Repo/Lizenz der GEWÄHLTEN Quelle öffnen
```

Log im Projekt: Datum, URL, Lizenz, Version/Release, Unsicherheit.
Scheitert der Check → Alternative aus derselben Router-Zeile, nicht Blind-Install.

Vollständige Kandidatenlisten: `frontend-referenzbibliothek.md`.
Stack-Details: `radix-shadcn-tailwind-stack.md`.
Motion-Prinzipien: `motion-doktrin.md`.
Bild-Assets: `bildgenerierung.md`.
