# taste-Linie — Landing/Portfolio-Kern

> Fuer Landing Pages, Portfolios und Redesigns. NICHT fuer Dashboards/Datentabellen/
> mehrstufige Produkt-UI (dann ui-ux-Linie). Quelle: taste-skill (design-taste-frontend).
> Jede Regel ist **kontextuell** — erst den Brief lesen, dann nur ziehen, was passt.
>
> **ENTFERNT (imagegen):** taste's Pflicht "Image-Generation-Tool zuerst, MUSS
> `generate_image`/MCP-Bildtool nutzen" ist hier gestrichen. Bilderstrategie unten
> ist auf **reale Quellen + markierte Slots** reduziert (siehe §6).
>
> Die deduplizierten Detail-Regeln (Typo/Farbe/Layout/Komponenten/Motion) stehen in
> `design-doktrin.md`. Diese Datei ist der **prozedurale Kern** der Landing-Linie.
>
> `[fd]` = Ideen-Merge aus **frontend-design** (Anthropic, Apache-2.0), paraphrasiert.

## 1. Brief-Inference (Read the Room, vor allem anderen)
Signale lesen: Seitenart (SaaS/consumer/agency/event Landing · dev/designer
Portfolio · Redesign · editorial) · Vibe-Worte ("minimal/Linear/Awwwards/brutalist/
Apple-y/playful/serious B2B/editorial/glassy/dark tech") · Referenzen (URLs,
Screenshots, genannte Marken) · Zielgruppe (die waehlt die Aesthetik, nicht dein
Geschmack) · vorhandene Marken-Assets · stille Constraints (a11y-first, Public-
Sector, reguliert, Kinder — die OVERRIDEN Aesthetik).

**Anti-Default-Disziplin:** NICHT default zu AI-Purple-Gradients, zentriertem Hero
ueber Dark-Mesh, drei gleichen Feature-Cards, Glassmorphism ueberall, Infinite-Loop-
Mikro-Animationen, Inter + slate-900.

## 2. Design-Read (1 Zeile, vor Code)
> *"Lese das als: \<Seitenart> fuer \<Zielgruppe>, \<Vibe>-Sprache, Richtung
> \<Design-System oder Aesthetik>."*
Bei echter Zweideutigkeit **genau eine** Frage. Sonst annehmen und bauen.
Dazu Pflichtfeld `Signature-Element` (genau eins, Skalierung nach Dial in §3a). `[fd]`

## 3. Drei Dials (nach dem Read setzen)
- `DESIGN_VARIANCE` 1 (symmetrisch) … 10 (asymmetrisch/chaotisch)
- `MOTION_INTENSITY` 1 (statisch) … 10 (cinematisch)
- `VISUAL_DENSITY` 1 (Galerie/luftig) … 10 (Cockpit/dicht)

Baseline **8 / 6 / 4**, ausser der Read ueberschreibt. Presets:

| Use-Case | VAR | MOT | DENS |
|---|---|---|---|
| Landing SaaS mainstream | 7 | 6 | 4 |
| Landing Agency/creative | 9 | 8 | 3 |
| Landing Premium consumer | 7 | 6 | 3 |
| Portfolio Designer/Studio | 8 | 7 | 3 |
| Portfolio Developer | 6 | 5 | 4 |
| Editorial/Blog | 6 | 4 | 3 |
| Public-Sector Service | 3 | 2 | 5 |
| Redesign preserve | match | match+1 | match |
| Redesign overhaul | +2 | +2 | match |

Dieselben Dials lassen sich an die ui-ux-DB uebergeben (`--variance/--motion/--density`).

## 3a. Zwei-Pass (nach den Dials, VOR dem ersten Code) `[fd]`
Der Plan wird einmal gegen sich selbst gehalten, bevor eine Zeile entsteht:
1. **Gegenpruefen:** "Was wuerde jeder Agent aus diesem Brief bauen?" Wer den Brief
   sinngemaess ein zweites Mal durchspielt und bei derselben Palette/Typo/Sektionsfolge
   landet, hat den generischen Default beschrieben, keine Entscheidung getroffen.
2. **Abweichung benennen:** Fuer jeden Teil, der wie dieser Default liest, eine Zeile —
   was geaendert wird und warum es aus diesem Brief folgt (nicht aus Geschmack).
3. **Erst dann Code**, und zwar nach dem revidierten Plan; Farben und Typo werden aus
   ihm abgeleitet, nicht beim Bauen neu erfunden.

Das ergaenzt den Copy-Selbstaudit (§7): der laeuft nach dem Bau, dieser Schritt davor.

**Pflichtfeld `Signature-Element` im Design-Read (§2):** genau EIN benanntes Element,
an das die Seite erinnert wird — nicht zwei, nicht "die Gesamtwirkung". Der Mut wird an
diesem einen Ort ausgegeben, alles daneben bleibt still. Das Feld entfaellt nie; nur sein
Ausschlag haengt am VARIANCE-Dial:

| VARIANCE | Ausschlag des Signature-Elements |
|---|---|
| ≥ 7 (Premium/Editorial/Agency-creative, kein daempfender Sektor-Dial) | ungedaempft — Layout, Formsprache oder Typo duerfen die Traeger sein |
| 5–6 (z.B. `kita`, `tanz-community`, `ads-lp` aus `stil-regeln.md` §1) | gedaempft — ein wiederkehrendes Motiv oder eine Typo-Pairing-Entscheidung, kein Layoutbruch |
| ≤ 4 (z.B. `handwerk-local`, `b2b-dienst`) | klein und kontrolliert — ein Detail oder eine praezise Mikro-Interaktion, nie Farbmut oder Layoutbruch |

Der Sektor-Dial aus `stil-regeln.md` §1 (Regel S15) ersetzt im Site-Build die Baseline
oben und entscheidet damit auch diese Zeile. Layering/Parallax als Signature ist
Premium-Ausnahme mit eigener Regel — `eigene/web/references/ui-layouts-catalog.md`.

## 4. Brief -> Design-System-Map
Wenn der Brief einem echten System entspricht, das **offizielle** Paket nutzen (nicht
CSS nachbauen, nicht 90% der Tokens ueberschreiben). **Ein System pro Projekt.**

| Brief liest sich als … | Reach for |
|---|---|
| Microsoft/Enterprise SaaS/Dashboards | `@fluentui/react-components` |
| Google/Material-Produkt | `@material/web` + Material 3 |
| IBM-B2B/Analytics | `@carbon/react` + `@carbon/styles` |
| Shopify-App | Polaris |
| Atlassian/Jira | `@atlaskit/*` |
| GitHub-Devtool/Community | `@primer/css` / `@primer/react-brand` |
| UK Public-Sector | `govuk-frontend` |
| US Public-Sector/trust-first | `uswds` |
| Schnelle lokale Agentur-MVP | Bootstrap 5.3 |
| Moderne accessible React-Basis | `@radix-ui/themes` |
| Modernes SaaS, eigene Komponenten | shadcn/ui (nie im Default-State) |
| Tailwind-SaaS/AI-Marketing | Tailwind v4 + `dark:` |

Ist der Brief eine **Aesthetik** statt eines Systems (Glassmorphism, Bento, Brutalism,
Editorial, Dark-Tech, Aurora, Kinetic-Type, "Apple Liquid Glass"): native CSS +
Tailwind + gepflegte Lib, und im Code ehrlich labeln, was Approximation ist. Es gibt
kein offizielles `liquid-glass.css`.

## 5. Layout-Disziplin (harte Regeln — Bruch = kaputte Arbeit)
- **Hero passt in den ersten Viewport:** Headline ≤ 2 Zeilen desktop, Subtext ≤ 20
  Woerter UND ≤ 3–4 Zeilen, CTA sichtbar ohne Scroll. Zu lang -> Skala runter ODER
  Copy kuerzen. Font+Bildgroesse zusammen planen.
- **Hero-Top-Padding max `pt-24`** desktop (sonst schwebt der Inhalt = Bug-Optik).
- **Hero-Stack max 4 Textelemente:** (Eyebrow ODER Brand-Strip — max eins) + Headline
  + Subtext + CTAs (1 primaer + max 1 sekundaer). BANNED im Hero: Tagline unter CTAs,
  Trust-Mikro-Strip, Pricing-Teaser, Feature-Bullets, Avatar-Reihe -> eigene Sektion
  darunter. "Used by/Trusted by"-Logowall gehoert UNTER den Hero.
- **Nav auf EINER Zeile** desktop, Hoehe ≤ 80px (Default 64–72). Sonst kondensieren/
  Hamburger.
- **Eyebrow-Restraint (meistverletzte Regel):** max **1 Eyebrow pro 3 Sektionen**
  (Hero zaehlt 1). Mechanischer Check: Instanzen von `uppercase tracking`-Labels ueber
  Headlines zaehlen; Count ≤ ceil(Sektionen/3). Am besten: Eyebrow weglassen.
- **Split-Header-Ban:** "grosse Headline links + kleiner Erklaer-Absatz rechts" als
  Sektionskopf = verboten. Stattdessen vertikal stapeln (max-w-65ch).
- **Zigzag-Cap:** max 2 aufeinanderfolgende Image+Text-Split-Sektionen. Die 3. bricht
  das Muster (Full-Width / Vertical-Stack / Bento / andere Familie).
- **Section-Layout-Repetition:** eine Layout-Familie pro Seite max einmal; 8 Sektionen
  -> min 4 verschiedene Familien.
- **Bento hat Rhythmus UND exakte Zellenzahl** (N Items -> N Zellen, keine leeren
  Zellen). Mindestens 2–3 Zellen mit echter visueller Variation (Bild/Gradient/Muster),
  nicht nur Weiss-auf-Weiss-Text.
- **Lange Listen (> 5 Items) brauchen eine andere UI**, nicht eine laengere Liste
  (2-Spalten-Split, Card-Grid, Tabs/Accordion, Scroll-Snap-Pills, Carousel/Marquee).
  Kein `border-t`+`border-b` auf jeder Zeile.
- **Mobile-Collapse pro Sektion explizit** deklarieren (`w-full`, `px-4`), kein
  "Tailwind regelt das schon".
- **Keine Umrandungen als Default** (Raphael 2x explizit, 28.08.2026: "Ich mag diese
  Umrandungen immer nicht" / "Das muss nicht immer alles umrandet sein"): Karten,
  Chips und Info-Boxen trennen ueber Flaeche, Weissraum oder sanften Schatten —
  Border nur, wo sie funktional noetig ist (Inputs, Fokus-Ring, Tabellen).

## 6. Bilder & Assets (imagegen entfernt)
Landing/Portfolio sind **visuelle Produkte** — reine Textseiten mit Fake-Screenshot-
Divs sind Slop. Prioritaet ohne Bildgenerierung:
1. **Reale Web-Bilder:** `https://picsum.photos/seed/{beschreibender-seed}/{w}/{h}`
   fuer Platzhalterfotos; echte Stock-/Marken-URLs, wenn der Brief sie liefert;
   Open-License-Quellen wenn erlaubt.
2. **Letzter Ausweg:** klar markierte Slots setzen
   (`<!-- TODO: Hero-Produktfoto 1600x1200 -->`) und am Ende dem Nutzer sagen, wo
   reale Bilder fehlen. **Nie** die Seite mit handgemalten Deko-SVGs oder div-Fake-
   Screenshots fuellen.
- **Social-Proof-Logos:** echte SVGs (Simple Icons `https://cdn.simpleicons.org/{slug}`,
  devicon) statt Text-Wordmarks; in Light+Dark rendern; **Logowall = nur Logos**
  (keine Kategorie-Labels darunter).
- Falls ein Task echte Bild-/Logo-/Icon-Generierung braucht (bezahlt): als TODO an
  Raphael, nicht selbst starten.

## 7. Copy-Selbstaudit (vor Ship, Pflicht)
Jeden sichtbaren String neu lesen: grammatisch kaputt? unklare Bezuege? klingt nach
AI-Halluzination (niedliche-aber-falsche Wortspiele)? klingt nach LLM-das-tief-klingen-
will? -> umschreiben, im Zweifel durch schlichten Funktionssatz ersetzen. Fake-praezise
Zahlen (92%, 4.1×, 5.8mm) nur wenn real oder als Mock markiert. Ein Copy-Register pro Seite.

## 8. Redesign-Protokoll (wenn Redesign)
- **Modus erkennen (erste Handlung):** Greenfield · Preserve (modernisieren ohne Marke
  zu brechen) · Overhaul (neue Bildsprache auf bestehendem Content). Zweideutig -> einmal
  fragen.
- **Audit vor Aenderung:** Marken-Tokens, IA/Nav, Content-Bloecke, zu bewahrende Muster,
  zu pensionierende Slop-Tells, Dial-Reading der Ist-Seite, **SEO-Baseline (Redesign-
  Risiko #1)**.
- **Nie still aendern:** URL-Struktur/Slugs, primaere Nav-Labels, Formularfeld-Namen/
  Reihenfolge (bricht Analytics/Autofill), Logo/Wordmark, Legal/Consent-Copy.
- **Modernisierungs-Hebel (Reihenfolge, stoppen wenn Brief erfuellt):** 1 Typo · 2
  Spacing/Rhythmus · 3 Farb-Rekalibrierung (Marken-Akzent halten) · 4 Motion-Layer · 5
  Hero/Key-Sektion neu komponieren · 6 Voll-Block-Ersatz nur wenn unrettbar.

## 9. Landing-Pre-Flight (mechanisch, vor Ausgabe)
Erst danach QA via impeccable-Detektoren. Kritische Boxen:
- [ ] Design-Read (1 Zeile) deklariert, Dials begruendet (nicht still Baseline)?
- [ ] Signature-Element benannt (genau eins) und Zwei-Pass-Abweichung notiert (§3a)?
- [ ] Design-System aus §4 gewaehlt oder Aesthetik ehrlich gelabelt? **Ein** System?
- [ ] Redesign-Modus erkannt + Audit gemacht (falls zutreffend)?
- [ ] **Null Em-Dash** `—`/`–` irgendwo sichtbar (Doktrin §6, nicht verhandelbar)?
- [ ] Page-Theme-Lock, Color-Consistency-Lock, Shape-Consistency-Lock?
- [ ] Button-Kontrast (kein Weiss-auf-Weiss, AA 4.5:1)? CTA-Label ohne Zeilenumbruch desktop?
- [ ] Kein Duplicate-CTA-Intent (nicht "Get in touch" + "Let's talk" auf einer Seite)?
- [ ] Hero passt in Viewport, Top-Padding ≤ pt-24, max 4 Textelemente?
- [ ] Eyebrow-Count ≤ ceil(Sektionen/3)? Kein Split-Header? Zigzag ≤ 2 in Folge?
- [ ] Section-Layout-Repetition (≥ 4 Familien / 8 Sektionen)? Bento exakte Zellenzahl?
- [ ] Reale Bilder / markierte Slots — keine div-Fake-Screenshots, keine Deko-SVGs?
- [ ] Logowall unter Hero, echte SVG-Logos, nur Logos?
- [ ] Copy-Selbstaudit gemacht? Quotes ≤ 3 Zeilen, Attribution sauber?
- [ ] Motion behauptet = Motion gezeigt? Marquee ≤ 1/Seite? Reduced-Motion?
- [ ] Dark Mode in beiden Modi getestet? `min-h-[100dvh]` statt `h-screen`?
- [ ] Empty/Loading/Error-States? Icons nur aus erlaubter Lib (kein Emoji)?

## 10. Ausserhalb dieser Linie
Dashboards/dichte Produkt-UI/Admin -> ui-ux-Linie + offizielle Systeme. Datentabellen
-> TanStack/AG Grid. Native Mobile -> HIG/Material direkt. Realtime-Collab -> anderer
Problemtyp. In solchen Faellen explizit sagen und nur die Marketing-/About-Teile aus
dieser Linie anwenden.
