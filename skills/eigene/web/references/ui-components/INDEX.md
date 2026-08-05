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

## Zusammengesetzte Widgets (`motion/`, Kategorie "Blocks")

| Datei | Was sie tut |
|---|---|
| `infinite-masonry.tsx` | Virtualisiertes Masonry mit variabler Kartenhöhe, Infinite-Loading |
| `notification-stack.tsx` | Notification-Karten, die von Stapel zu Liste aufspringen |
| `swap/` | Cross-Chain-Swap-Widget mit Chain-/Token-Auswahl (Krypto-spezifisch, Struktur trotzdem als Muster für "Umtausch-Formular" nutzbar) |
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
| `wallet-card/`, `table/`, `not-found/` | Weitere komplette Widget-Beispiele (Wallet-Karte, Daten-Tabelle mit Spalten-Resize/Sort/Reorder, 404-Varianten) |

## Nutzungsregel

Immer die **ganze Datei** (bzw. den ganzen Unterordner) kopieren, nicht nur
Ausschnitte — Komponenten sind gegen `lib/ease.ts`/`lib/utils.ts`/die Hooks
verdrahtet. Beim Einbau ins Kundenprojekt: Motion-Doktrin (`../motion-doktrin.md`)
befolgen, insbesondere Reduced-Motion-Fallback nicht vergessen.

Für weitere, nicht vendorierte Komponenten-Ideen (Glass/Mesh-Gradient/3D-Karten
etc.) siehe `../ui-layouts-catalog.md` — dort nur Vokabular/Ideenliste, kein
Code.
