# UI-Components-Bibliothek (beUI v2) — Index

**Wofür:** Copy-paste-fertige React/Next.js/Tailwind/`motion`(framer-motion)-
Komponenten für Website- und Web-App-Builds. Statt eine Interaktion neu zu
bauen: hier nachschlagen, Datei kopieren, `import`-Pfade an Raphaels Projekt
anpassen.

**Herkunft:** `starc007/ui-components` ("beUI v2"), MIT-Lizenz (Copyright
Saurabh Chauhan, 2026) — vollständige Attribution in `VENDORING.md`
im Repo-Root (`/root/raphael-skills/VENDORING.md`). Code unverändert vendoriert, nur diese INDEX.md ist neu
(deutsche Übersetzung der Original-Katalogtabelle aus dem Repo).

**Wie laden:** Diese INDEX.md gibt den Überblick. Den Code einer konkreten
Komponente erst bei Bedarf öffnen — `motion/<datei>.tsx`. Multi-Datei-Widgets
liegen in einem Unterordner (`swap/`, `button/`, `table/`, `wallet-card/`,
`availability-scheduler/`, `not-found/`).

**Gemeinsame Basis (fast jede Komponente importiert davon):**
- `lib/ease.ts` — alle Motion-Tokens (`EASE_OUT`, `EASE_IN_OUT`, `SPRING_PRESS`, `SPRING_LAYOUT`, …). Siehe `../motion-doktrin.md`.
- `lib/utils.ts` — `cn()` Classname-Merge-Helfer.
- `lib/hooks/use-hover-capable.ts` — Hover-Fähigkeit erkennen (gegen Touch-Phantom-Hover, siehe Motion-Doktrin).

## Primitive Komponenten (`motion/`, Kategorie "Components")

| Datei | Was sie tut |
|---|---|
| `tilt-card.tsx` | 3D-Perspektiv-Tilt bei Hover mit cursor-getracktem Glanzlicht |
| `button/` | `Button` (Spring-Press, optional Ripple), `StatefulButton` (idle/loading/success/error), `MagneticButton` |
| `marquee.tsx` | Endlos-Scroll horizontal/vertikal, Pause bei Hover |
| `tabs.tsx` | Pill-/Segment-/Underline-Tabs mit Spring-`layoutId`-Indikator |
| `switch.tsx` | Toggle mit Spring-Thumb und Press-Feedback |
| `checkbox.tsx` | Checkbox mit gezeichnetem Häkchen-Pfad, auch Indeterminate-Zustand |
| `radio.tsx` | Radio-Gruppe (Context-basiert) mit animiertem Auswahlpunkt |
| `input.tsx` | Textfeld mit Fehler-Shake, rotem Rand und Fehlermeldung |
| `loader.tsx` | Loader in mehreren Varianten (Spinner, Dots, …), skaliert über eine Basisgröße |
| `drawer.tsx` | Seitliches Drawer-Panel mit Backdrop, Klick-zum-Schließen |
| `expanding-arrow-button.tsx` | Button, dessen Pfeil bei Hover ausfährt |
| `hold-action-button.tsx` | Gedrückt-halten-Button für destruktive Aktionen (Füll-Fortschritt) |
| `slide-action-button.tsx` | Slide-to-confirm-Button (Schieberegler als Bestätigung) |
| `shader-background.tsx` | GPU-Shader-Hintergrund in mehreren Varianten (Paper-Shaders) — Reduced-Motion-Gate aus `../frontend-referenzbibliothek.md` `#webgl` beachten |
| `cylinder-carousel.tsx` | 3D-Zylinder-Karussell (konkav/konvex) mit Momentum |
| `select.tsx`, `select-morph.tsx` | Komposierbare Select-Primitives; `MorphSelect` mit Shared-Layout-Variante |
| `range-slider.tsx` | Range-Slider mit Tick-Punkten, Drag + Tastatur |
| `wheel-picker.tsx` | iOS-artiges Picker-Wheel mit Momentum-Physik |
| `bottom-sheet.tsx` | Draggable Bottom-Sheet mit Snap-Points, Glass-Oberfläche |
| `pull-to-refresh.tsx` | Refresh-Container mit Touch-/Maus-Pull-Widerstand |
| `shared-layout-bg.tsx` | Pill, die zwischen gehoverten Items via Shared-Layout gleitet |
| `preview-rail.tsx` | Vertikale/horizontale Nav-Ticks mit Vorschaukarte |
| `dock.tsx` | macOS-artiges Dock mit gruppierten Aktionen |
| `tooltip.tsx` | Hover-/Fokus-Tooltip mit Blur-Enter/Exit |
| `popover.tsx`, `popover-morph.tsx` | Popover in zwei Varianten (Gooey-SVG-Filter / Morph-Clip) |
| `morphing-modal.tsx` | Panel, das über innere Views hinweg die Höhe morpht |
| `text-reveal.tsx` | Wort-/Zeichen-Reveal mit Spring-Slide + Blur |
| `text-shimmer.tsx` | Gradient-Sweep über Text (Loading/Emphasis) |
| `text-cascade.tsx` | Buchstabe-für-Buchstabe Slot-Roll |
| `number-ticker.tsx` | Slot-Machine-Ziffern-Rolling |
| `animated-number.tsx` | Spring-Count-up bei Viewport-Eintritt |
| `animated-badge.tsx` | Status-Badge mit animierten Zustandsicons |
| `action-swap*.tsx` | Swap-Primitives für Button/Text/Icon in 3 Varianten (Blur/Roll/Cascade) |
| `animated-toast-stack.tsx` | Gestapelte Toasts mit Status-Morph, Swipe-Dismiss |
| `theme-toggle.tsx` | Theme-Toggle mit Clip-Path-Reveal (View Transition API) |
| `bouncy-accordion.tsx` | Single-Open-Accordion mit gewichtetem Spring-Layout |
| `magnetic.tsx` | Cursor-Magnet-Wrapper |
| `smooth-scroll.tsx`, `scroll-progress.tsx`, `parallax.tsx`, `scroll-to.tsx`, `scroll-reveal.tsx` | Scroll-Motion-Gruppe (Lenis-Provider, Progress-Bar/-Ring, Parallax, Scroll-Reveal) |
| `checkbox.tsx` | Checkbox mit gezeichnetem Häkchen und Indeterminate-Zustand |
| `input.tsx` | Textfeld mit Fehler-Shake, roter Kante und eingeblendeter Meldung |
| `loader.tsx` | Ladeanzeige in 9 Varianten (Spinner, Dots, Bars, Dot-Matrix, Dither, 4× ASCII) |
| `expanding-arrow-button.tsx` | Button, dessen Pfeil bei Hover aus dem Label herauswächst |
| `hold-action-button.tsx` | Gedrückthalten statt Klick — Fortschrittsring, löst erst am Ende aus |
| `slide-action-button.tsx` | Zum Bestätigen schieben (Slide-to-Confirm), mit Zurückfedern |
| `shader-background.tsx` | Animierte Shader-Flächen als Hintergrund (Farbfelder, Dithering; nicht jede Variante bewegt sich) |

## Zusammengesetzte Widgets (`motion/`, Kategorie "Blocks")

| Datei | Was sie tut |
|---|---|
| `infinite-masonry.tsx` | Virtualisiertes Masonry mit variabler Kartenhöhe, Infinite-Loading |
| `notification-stack.tsx` | Notification-Karten, die von Stapel zu Liste aufspringen |
| `swap.tsx` + `swap/` | Cross-Chain-Swap-Widget (Einstieg `swap.tsx`, Teile im Unterordner) mit Chain-/Token-Auswahl (Krypto-spezifisch, Struktur trotzdem als Muster für "Umtausch-Formular" nutzbar) |
| `feedback-widget.tsx` | Feedback-Formular-Widget mit Sende-Zustand (async Submit) |
| `knockout-bracket.tsx` | Turnierbaum (K.-o.-Runden) mit Länderflaggen via flagcdn.com |
| `dynamic-island.tsx` | iOS-artige Island-Pill, morpht zwischen Live-Views |
| `command-palette.tsx` | ⌘K-Palette mit Fuzzy-Filter |
| `expandable-action-bar.tsx` | Icon-Aktionen, die bei Hover/Fokus zu Labels aufklappen |
| `overflow-actions.tsx` | Pill-Leiste, die zusätzliche Controls aufspringt |
| `expandable-tabs.tsx` | Icon-Tab-Bar, aktiver Tab expandiert zu Label-Pill |
| `swipeable-list.tsx` | Listenzeilen mit Swipe-Aktionen |
| `file-upload.tsx` | Drag-and-Drop-Upload-Queue mit Progress/Retry |
| `prediction-market.tsx` | Trade-Ticket-Muster (Buy/Sell, Preise) |
| `otp-input.tsx` | Einmalcode-Input mit gleitendem Fokusring, Fehler-Shake |
| `bloom-menu.tsx` | Button, der zu Menü aufblüht (Shared-Layout + Clip-Path) |
| `availability-scheduler/` | Wochenverfügbarkeits-Editor mit Shared-Layout-Toggles |
| `feedback-widget.tsx` | Feedback-Kasten mit Sende-Zustand, wartet auf die Antwort des Servers |
| `knockout-bracket.tsx` | Turnierbaum mit Länderflaggen (K.-o.-Runden), 802 Zeilen |
| `swap.tsx` | Einzeldatei-Variante des Swap-Widgets (`MultiChainSwap`) neben dem Ordner `swap/` |
| `wallet-card/`, `table/`, `not-found/` | Weitere komplette Widget-Beispiele (Wallet-Karte, Daten-Tabelle mit Spalten-Resize/Sort/Reorder, 404-Varianten) |

## Der Slop-Scanner meldet hier 232 Treffer — und keiner ist echt

Gemessen 31.07.2026: `scan-ai-slop.mjs` über diesen Ordner ergibt 232 Treffer
in 114 Dateien, davon **11 in Blocker-Kategorien**. Wer das für bare Münze
nimmt, baut eine funktionierende Bibliothek kaputt. Jeder einzelne nachgesehen:

| Tell | Treffer | Warum es hier keiner ist |
|---|---|---|
| `19` max-radius | 91 | `rounded-full` an Pills, Icon-Buttons, Avataren. Die Regel meint Karten und Inputs — steht so in `ai-slop-detection.md`. |
| `21`/`22` Ecken | 70 | Verschachtelte Radien in Komponenten, die genau dafür gebaut sind (Sheet im Sheet, Chip in Karte). |
| `02` Verlauf-Headline | 1 | `text-shimmer.tsx` — ein Shimmer-Effekt *braucht* `bg-clip-text` mit Verlauf. Das ist der Zweck der Datei. |
| `14` KI-Textstimme | 1 | Das Wort „seamless" in einem **Code-Kommentar**, nicht in Kundencopy. |
| `24` KI-SVG-Icon | 9 | Fünf `<circle>` als Punktmuster in `expanding-arrow-button.tsx`. Ein gezeichnetes Icon, kein Füll-Ornament. |

**Die Lehre ist nicht „der Scanner ist schlecht".** Er ist auf
*Kundenseiten* geeicht, nicht auf eine Komponentenbibliothek. Dort ist
`rounded-full` an einer Karte ein nicht getroffener Default; hier ist es die
Entscheidung, die die Komponente ausmacht. Deshalb steht in der Doktrin, dass
jeder Fund **triagiert** wird: Slop ist die Abwesenheit einer Entscheidung.

Praktisch: den Scanner auf das **Kundenprojekt** fahren, nicht auf diesen
Ordner. Wer ihn doch hier braucht, erwartet diese 232 und sucht das, was neu
dazukommt.

## Wo diese Bibliothek NICHT die Antwort ist

Für sieben Aufgaben steht hier eine handgeschriebene Komponente **und** im
Bibliotheks-Tresor (`../bibliotheks-tresor.md`) eine installierte Library. Das
sind zwei Antworten auf dieselbe Frage — und die Datei hier ist bei diesen
sieben die schlechtere: sie löst dasselbe Problem in mehr Zeilen und ohne die
Randfälle, an denen die Library jahrelang gearbeitet hat.

| Aufgabe | Hier liegt | Genommen wird | Warum |
|---|---|---|---|
| Toasts | `animated-toast-stack.tsx` (503 Z) | **`sonner`** | Promise-Toasts, Stapel-Limit, Fokus-Rückgabe, `aria-live`. |
| Einmalcode / OTP | `otp-input.tsx` (392 Z) | **`input-otp`** | Paste über alle Felder, iOS-SMS-Autofill, Composition-Events. |
| Command-Palette (⌘K) | `command-palette.tsx` (341 Z) | **`cmdk`** | Fuzzy-Scoring, Gruppen, `aria-activedescendant`. |
| Drawer / Bottom-Sheet | `drawer.tsx`, `bottom-sheet.tsx` | **`vaul`** | Snap-Points, Scroll-Lock, iOS-Rubber-Band. |
| Zahlen animieren | `number-ticker.tsx`, `animated-number.tsx` | **`@number-flow/react`** | Ziffernweiser Übergang statt neu gerendertem Text; lokalisiert. |
| Lange Listen | `infinite-masonry.tsx` | **`react-virtuoso`** | Variable Höhen ohne eigene Messlogik. |
| Karussell | `cylinder-carousel.tsx` | **`embla-carousel-react`** | Touch-Physik, Tastatur, `aria`-Rollen. |

**Diese sieben Dateien sind trotzdem nützlich — als Vorlage, nicht als Bauteil.**
Sie zeigen die Motion, die auf die Library gehört: wie der Toast-Stapel beim
Hover auffächert, wie der Fokusring im OTP-Feld gleitet, wie die Ziffern rollen.
Richtiger Ablauf: Library installieren, dann die *Bewegung* von hier
übernehmen (`sonner` nimmt eigenes Markup, `input-otp` rendert per
Render-Prop). Was die Library kann, wird nicht nachgebaut; was sie offen lässt,
kommt von hier.

### Neun weitere Überschneidungen — und die sind die gefährlicheren

Bis 29.07.2026 stand hier: „alle übrigen Komponenten haben **keine**
Entsprechung im Tresor". Nachgezählt ist das falsch. `@base-ui/react` liefert
`select`, `popover`, `tooltip`, `checkbox`, `switch`, `radio`, `tabs`,
`dialog`, `menu` — also fast alles, was hier als interaktives Bauteil liegt.

Der Unterschied zu den sieben oben ist nicht die Zeilenzahl, sondern die
Bedienbarkeit. Gemessen:

| Datei | Rolle | Pfeiltasten vorher | Stand |
|---|---|---|---|
| `select.tsx` (411 Z) | `listbox` / `option` | keine | **repariert** |
| `select-morph.tsx` | `listbox` | keine | **repariert** |
| `tabs.tsx` | `tablist` | keine | **repariert** |
| `expandable-tabs.tsx` | `tablist` | keine | **repariert** |
| `radio.tsx` | `radiogroup` | keine | **repariert** |
| `table/table-menu.tsx` | `menu` / `menuitem` | keine | **repariert** |
| `wallet-card/account-switcher.tsx` | `listbox` | keine | **repariert** |

Sieben von zehn zusammengesetzten Widgets. Alle mit sauberen ARIA-Attributen,
alle grün bei axe — und keines mit der Tastatur benutzbar.

**Alle sieben sind seit 29.07.2026 repariert** (Pfeiltasten, Home/End, Escape,
Roving-Tabindex, Fokus folgt der Auswahl, Fokus-Rückgabe an den Auslöser).
`node scripts/tastatur-check.mjs references/ui-components` meldet 0 Blocker.
Damit sind sie wieder benutzbar — die Empfehlung unten bleibt trotzdem
bestehen, aus einem anderen Grund.

**Die Rolle ist ein Versprechen.** `role="listbox"` sagt einem
Screenreader-Nutzer: *hier kommt eine Listbox, die kennst du, Pfeiltasten
funktionieren.* Wer das Versprechen gibt und die Tastatur nicht liefert, hat es
schlimmer gemacht als mit einem simplen `<select>` — der Nutzer weiß jetzt, was
es sein sollte, und kommt trotzdem nicht durch.

Deshalb: **bei diesen neun das Primitive aus dem Tresor nehmen**
(`@base-ui/react`, unstyled), die Optik und die Motion von hier. Genau derselbe
Ablauf wie bei den sieben oben — die Library übernimmt das Verhalten, diese
Dateien liefern die Bewegung.

Die Reparatur ändert daran nichts. Was hier steht, ist jetzt das *Minimum* des
Patterns; `@base-ui/react` bringt zusätzlich Typeahead, Fokus-Falle, korrektes
`aria-activedescendant`, RTL und die Randfälle, an denen die Library jahrelang
gearbeitet hat. Sieben Widgets von Hand nachzubauen war der Beweis, dass es
geht — nicht die Empfehlung, es in jedem Kundenprojekt zu wiederholen.

Erzwungen wird das von `scripts/tastatur-check.mjs`, dem siebten
Qualitäts-Prüfer im G1-Tor. Er findet eine Widget-Rolle ohne die Tasten, die
ihr Pattern verlangt.

Alles außerhalb dieser sechzehn Dateien hat wirklich keine Entsprechung im
Tresor — dort ist diese Bibliothek die richtige und einzige Antwort.

## Nutzungsregel

Immer die **ganze Datei** (bzw. den ganzen Unterordner) kopieren, nicht nur
Ausschnitte — Komponenten sind gegen `lib/ease.ts`/`lib/utils.ts`/die Hooks
verdrahtet. Beim Einbau ins Kundenprojekt: Motion-Doktrin (`../motion-doktrin.md`)
befolgen, insbesondere Reduced-Motion-Fallback nicht vergessen.

Vier Dateien bringen eigene Abhängigkeiten mit, die im Tresor stehen und im
Zielprojekt installiert sein müssen: `infinite-masonry.tsx` und `table/`
(`@tanstack/*`), `smooth-scroll.tsx` (Lenis), `theme-toggle.tsx`
(View Transition API — Fallback für Firefox/Safari-Altversionen mitdenken).

Für weitere, nicht vendorierte Komponenten-Ideen (Glass/Mesh-Gradient/3D-Karten
etc.) siehe `../ui-layouts-catalog.md` — dort nur Vokabular/Ideenliste, kein
Code.
