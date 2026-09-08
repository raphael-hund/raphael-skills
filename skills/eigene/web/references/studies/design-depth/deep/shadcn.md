# shadcn/ui (Base UI, Style base-nova) — Bauanalyse

Stand: 07.09.2026. Paket: `research/shadcn/` (5 Screenshots 1280×800, dunkles Theme; 7 Markdown-Quellen; `theming.html` als gerenderter DOM; `radix-button.json` als ältere Registry-Variante).
Evidenzarten: **Sicht** = im Bild gesehen; **DOM** = Klassen aus `theming.html`/Quell-md; **Quelle** = offizielle Docs-Text; **Ableitung** = Übertragung.
Alle px-Werte in Bildern sind Schätzungen bei Body 14px, falls nicht als DOM-Wert belegt.

## 0. Was shadcn ist — und was nicht

- shadcn ist kein Look, sondern ein Vertragssystem: Anatomie (Slots per `data-slot`), semantische Farbrollen (Paar Surface/Foreground), Variantenachsen (Betonung × Größe) und zustandsgebundene Selektoren (`focus-visible`, `aria-invalid`, `aria-expanded`, `disabled`, `data-open`). Quelle: `theming.md` Abschnitt „Token Convention“; DOM: `theming.html` `data-slot="button"`-Klassen.
- Die Docs-Optik (`button.png`, `card.png`, `field.png`, `dialog-open.png`) ist neutrales Grau-auf-Schwarz ohne Brandfarbe. Das ist das Default-Preset „neutral“, kein Kundendesign. Quelle: `theming.md` `:root`/`.dark` Werte, alle `oklch(L 0 0)`.

## 1. Seitenrahmen der Docs (alle Screenshots)

### Header/Nav (`button.png`, oben, y 0–64)
- Geometrie: Höhe ~64px, Nav-Items als Ghost-Buttons h-32, px 10, Gap ~6. DOM: `h-8 gap-1.5 rounded-md px-2.5` an `<a data-slot="button" data-variant="ghost" data-size="sm" href="/">Home` (`theming.html`).
- Material: Page-Hintergrund #0a0a0a (oklch 0.145 = `--background` dark). Keine Linie unter dem Header sichtbar; Trennung nur durch Weißraum. Sicht: `button.png` y 64.
- Suche rechts: Pill-Feld, ~256×32, Radius voll, Fläche #262626 (`bg-muted`), Placeholder grau #a3a3a3. DOM: `dialog-trigger ... h-8 w-full justify-start rounded-lg border-none bg-muted pl-3 ... xl:w-64 dark:bg-card`.
- Rechts: GitHub-Zähler „123k“ (Mono-ähnlich, Muted), Theme-Toggle als Icon-Ghost 32×32, „+ New“ als Primary-Button: Fläche #ebebeb (`--primary` dark = oklch 0.922), Text #333 (`--primary-foreground` dark), h ~32, Radius ~8. Sicht: `button.png` x 1175–1240, y 18–46.
- Typografie: Nav 14px/500, Tracking normal, Geist Sans. Belegt über REPORT.md DOM-Messung (Geist 14px/20px, 500).

### Sidebar links (`button.png`/`card.png`, x 24–290, y 90–720)
- Liste aus Ghost-Menübuttons, Zeilenhöhe ~32 (DOM: `h-[30px] w-fit ... text-[0.8rem] font-medium`), Gap 0–4 (`gap-0.5`/`gap-1`), Text 12.8px Regular, Farbe #fafafa.
- Aktives Item: Chip mit Fläche #262626 (`data-[active=true]:bg-accent`) + 1px Border in derselben Farbe (`border-accent`), Radius 6. Sicht: „Button“-Chip `button.png` x 26–84, y 380–408.
- Vertikaler Trenner rechts der Sidebar: 1px Linie #262626 (`bg-border` dark = weiß/10 %). Sicht: `button.png` x 288, y 70–720.
- Oben/unten faden die Listeneinträge aus. DOM: `scroll-fade` Klasse am `sidebar-content`. Bau: `mask-image: linear-gradient(transparent, black 24px, black calc(100% - 24px), transparent)`.

### Rechte Spalte „On This Page“ (`button.png`, x 1016–1230, y 96–480)
- Label „On This Page“ 12px Medium Muted; Einträge 13px Regular Muted (#a3a3a3), Zeilenabstand ~26. Zweite Ebene (API-Unterpunkte in `card.png`) rückt 16px ein.
- Promo-Card „Deploy your shadcn/ui app on Vercel“: 240×248, Radius ~16, Fläche #171717 (`bg-card` dark = oklch 0.205) ohne sichtbare Border; Titel 16px Semibold, zwei Absätze 14px Muted, Outline-Button „Deploy Now“ h-32 mit 1px Border #333. Sicht: `button.png` x 994–1232, y 505–752.

### Seiten-Hero (`button.png`, y 110–235)
- H1 „Button“ ~30px Semibold, Tracking tight. DOM: `<h1 class="scroll-m-24 text-3xl font-semibold tracking-tight">`.
- Subline 16.8px (`text-[1.05rem]`, sm: 16px) Muted #a3a3a3, `text-balance`, max 80 % Breite. DOM: `<p class="text-[1.05rem] text-muted-foreground sm:text-base sm:text-balance md:max-w-[80%]">`.
- Rechts: „Copy Page“ als Secondary-Split (Fläche #262626, Radius 8, h 32, Chevron als eigener Peer-Button) plus zwei Icon-Buttons ← → (Secondary, 32×32, md: 28×28). DOM: `data-variant="secondary" data-size="sm" ... peer -ml-0.5 size-8 shadow-none md:size-7 md:text-[0.8rem]`.
- Tabs „Base UI / React Aria / Radix UI“: 16px Regular, aktiver Tab #fafafa mit 2px Unterstrich, inaktive Muted. Sicht: `button.png` x 313–557, y 210–236. Bau: `border-bottom: 2px solid currentColor` nur am aktiven Tab.

### Preview-Rahmen (`button.png`, x 313–952, y 266–663)
- Container: 1px Border #262626, Radius ~12, Fläche = Page (#0a0a0a). Oben Demo mittig (min-height ~290), unten Code-Ausschnitt mit Fade und Floating-Button „View Code“.
- Code-Fade: Verlauf von `code/70` auf `code`, Höhe 80px. DOM: `collapsible-trigger ... h-20 ... bg-gradient-to-b from-code/70 to-code`. Bau: absolut positioniertes Element mit `linear-gradient(to bottom, rgb(23 23 23 / .7), #171717)`.
- „View Code“: Outline-Pill h 32, Border #333, Fläche #171717, Text 14px Medium, mittig über dem Fade. Sicht: `button.png` x 585–680, y 585–618.
- Zeilennummern: Muted 14px Mono; Keywords `import`/`from` in Rosa-Rot (#e879a0 geschätzt), Strings in Grau-Beige. Nur teils lesbar wegen Fade; Farben unsicher.

## 2. Button (`button.png`, Demo mittig x 579–686, y 394–428)

- Sicht: Outline-Button „Button“ 66×32 plus Icon-Button 32×32 mit Pfeil-nach-oben; Gap 8. Fläche minimal heller als Page (#141414, `dark:bg-input/30` = weiß 15 % × 30 %), Border 1px #2e2e2e (`dark:border-input`), Radius 10, Text 14px/500 #fafafa.
- DOM (Base-Version, `theming.html`): `group/button inline-flex shrink-0 items-center justify-center border bg-clip-padding font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 ... border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50`.
- Größen (Base): default `h-8 gap-1.5 px-2.5 rounded-lg`, sm `h-7 gap-1 px-2.5 text-[0.8rem] rounded-[min(var(--radius-md),12px)]`, Primary sm im Docs `h-[31px]`. Radix-Legacy (`radix-button.json`): default `h-9 px-4 py-2`, sm `h-8 px-3`, lg `h-10 px-6`, xs `h-6 px-2 text-xs`, icon `size-9`.
- Icon-Regel: `[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`; bei sm `size-3.5`. Asymmetrische Einrückung: `has-data-[icon=inline-start]:pl-2` / `inline-end:pr-2` (Base) bzw. `has-[>svg]:px-3` (Radix).
- Primary (`+ New`, `Deploy Now` ist Outline): `border border-transparent bg-primary text-primary-foreground hover:bg-primary/80`. Border ist transparent, damit Outline- und Primary-Buttons dieselbe Außenhöhe haben. `bg-clip-padding` verhindert, dass die Fläche unter dem transparenten Rand durchscheint.
- Press: `translate-y-px` nur wenn kein `aria-haspopup`. Fokus: 3px Ring `ring/50` + Border in `--ring`.
- Warum es funktioniert: nur eine Betonung pro Gruppe (Outline neutral, Primary invertiert), Höhe 32 = 8er-Raster, Radius 10 = `--radius`. Icon-Button ist exakt quadratisch zur Buttonhöhe.
- Slop-Risiko: 32px ist für Marketing-CTA zu klein; `whitespace-nowrap` bricht deutsche Labels nicht um; `cursor: default` (Tailwind v4) fühlt sich auf Marketing-Seiten falsch an.

Bau (Plain CSS):
```html
<button class="btn btn-outline"><svg data-icon="inline-start" …/>Label</button>
```
```css
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:32px;padding:0 10px;
  border:1px solid transparent;border-radius:var(--radius);font:500 14px/20px var(--font-sans);
  background-clip:padding-box;white-space:nowrap;transition:all .15s;outline:none;user-select:none}
.btn:focus-visible{border-color:var(--ring);box-shadow:0 0 0 3px color-mix(in oklch,var(--ring) 50%,transparent)}
.btn:active:not([aria-haspopup]){transform:translateY(1px)}
.btn:disabled{pointer-events:none;opacity:.5}
.btn-outline{border-color:var(--input);background:color-mix(in oklch,var(--input) 30%,transparent)}
.btn-outline:hover,.btn-outline[aria-expanded=true]{background:var(--muted);color:var(--foreground)}
.btn-primary{background:var(--primary);color:var(--primary-foreground)} .btn-primary:hover{opacity:.8}
.btn svg{width:16px;height:16px;flex-shrink:0;pointer-events:none}
```

## 3. Card (`card.png`, `card-invalid.png`, x 440–825, y 328–685)

- Sicht: Karte 384×357 (`max-w-sm`), Radius 14 (`rounded-xl` = 10×1.4), Fläche #171717 (`bg-card`), Rand als 1px Ring weiß/10 % (`ring-1 ring-foreground/10`), kein Schatten. Overflow hidden.
- Header (y 344–410): Titel „Login to your account“ 16px Semibold #fafafa; Beschreibung 14px Muted #a3a3a3, zweizeilig; rechts oben „Sign Up“ als Link-Text 14px, gleiche Zeile wie der Titel. DOM/Quelle: Header ist Grid `grid-cols-[1fr_auto] grid-rows-[auto_auto]`, Action sitzt in Spalte 2 über beide Zeilen (`card.md` Zeile ~644).
- Spacing: `--card-spacing: --spacing(4)` = 16px steuert Gap, py und px. Small = 12px. Quelle: `card.md` Zeilen 632–672.
- Content (y 425–565): zwei Felder, Gap 24 zwischen Feldern (`flex flex-col gap-6`), Label→Input Gap 8 (`grid gap-2`). Input: h 36, Radius ~8, Border 1px #333, Fläche #1c1c1c, Placeholder Muted. Label 14px Medium. „Forgot your password?“ rechtsbündig auf Label-Zeile per `ml-auto`, `underline-offset-4 hover:underline`.
- Footer (y 583–685): Fläche `bg-muted/50` (#1f1f1f), 1px Top-Border #262626, Padding 16, Buttons volle Breite: „Login“ Primary #ebebeb/#171717, „Login with Google“ Outline; Gap 8, `flex-col`. Root entfernt `pb` wenn Footer vorhanden (`has-data-[slot=card-footer]:pb-0`), Footer trägt eigenes `p-(--card-spacing)` und `rounded-b-xl`.
- `card-invalid.png`: Email-Feld enthält „invalid“; keine sichtbare Fehlerfarbe, kein FieldError. Beweis: native `checkValidity()` löst keine shadcn-Fehleroptik aus — `aria-invalid` und `data-invalid` müssen gesetzt werden.
- Warum es funktioniert: Hierarchie in drei Stufen (Titel 16/600 → Label 14/500 → Muted 14/400), einheitlicher 16px Inset, Footer als leicht abgesetzte Zone statt zweiter Border, Ring statt Schatten hält Dark Mode sauber.
- Slop-Risiko: `CardTitle` ist ein `div` — Heading-Semantik fehlt. Karten um jeden Absatz sind falsch; Karte nur, wenn Header/Content/Footer real existieren.

Bau:
```css
.card{--card-spacing:16px;display:flex;flex-direction:column;gap:var(--card-spacing);padding-block:var(--card-spacing);
  border-radius:calc(var(--radius)*1.4);background:var(--card);color:var(--card-foreground);font-size:14px;
  box-shadow:0 0 0 1px color-mix(in oklch,var(--foreground) 10%,transparent);overflow:hidden}
.card:has(.card-footer){padding-bottom:0}
.card-header{display:grid;gap:4px;padding-inline:var(--card-spacing);align-items:start}
.card-header:has(.card-action){grid-template-columns:1fr auto} .card-action{grid-column:2;grid-row:1/3;justify-self:end}
.card-title{font-weight:600;font-size:16px} .card-desc{color:var(--muted-foreground)}
.card-content{padding-inline:var(--card-spacing)}
.card-footer{display:flex;align-items:center;padding:var(--card-spacing);border-top:1px solid var(--border);
  background:color-mix(in oklch,var(--muted) 50%,transparent)}
.card-bleed{margin-inline:calc(var(--card-spacing)*-1);padding-inline:var(--card-spacing)}
```

## 4. Field / Formular (`field.png`, x 408–856, y 420–800)

- Sicht: Section-Titel „Payment Method“ 16px Semibold (FieldLegend), darunter Beschreibung 14px Muted; Gap 4. Zwischen Legend-Block und erstem Feld ~24.
- Feld: Label 14px Medium → Input h 36, Radius 8, Border 1px #333, Fläche #1c1c1c (`dark:bg-input/30`), Placeholder #8a8a8a; Gap Label→Control 8; Beschreibung „Enter your 16-digit card number“ 14px Muted, Gap 8 unter dem Input. Feld→Feld 24 (`FieldGroup gap-6`).
- Dreierzeile Month/Year/CVV: `grid grid-cols-3 gap-4` (Quelle `field.md` Zeile 91); Selects mit Chevron rechts, gleiche Höhe wie Input. Sicht: y 668–727.
- Trenner: 1px Linie #262626 volle Breite, dann nächste Section „Billing Address“ (FieldSeparator/FieldSet). Sicht: y 750.
- Quelle: Anatomie `FieldSet > FieldLegend + FieldDescription + FieldGroup > Field > (FieldLabel, Control, FieldDescription, FieldError)`. `FieldGroup` = `@container/field-group flex flex-col gap-6`; `orientation=responsive` schaltet per Container Query, nicht per Viewport (`field.md` Zeile 1104–1106, 1214).
- Fehlerzustand (Quelle): `data-invalid` am Wrapper (Selektor `data-[invalid=true]`), `aria-invalid` am Control (Border destructive + 3px Ring destructive/20, dark /40), `FieldError` direkt darunter, als Liste bei mehreren Fehlern.
- Fokus: identisch zum Button — Border `--ring`, 3px Ring `ring/50`. Sicht `dialog-open.png` Name-Feld: hellerer Rand plus weicher grauer Ring.
- Warum es funktioniert: Label außerhalb des Feldes (kein Floating Label), Hilfetext unter dem Feld in Muted, Fehler ersetzt nicht den Hilfetext sondern kommt hinzu; Rhythmus 4/8/16/24.
- Slop-Risiko: Hilfetext ohne `aria-describedby` (DOM-Befund REPORT.md); Demo-Copy „secure and encrypted“ ist kein Beweis.

Bau:
```css
.field{display:flex;flex-direction:column;gap:8px} .field-group{display:flex;flex-direction:column;gap:24px;container-type:inline-size}
.field[data-orientation=horizontal]{flex-direction:row;align-items:center;gap:12px}
.label{font:500 14px/1 var(--font-sans)} .hint{font-size:14px;color:var(--muted-foreground)}
.input{height:36px;padding:0 12px;border:1px solid var(--input);border-radius:calc(var(--radius)*.8);
  background:color-mix(in oklch,var(--input) 30%,transparent);font-size:14px;outline:none;transition:box-shadow .15s}
.input:focus-visible{border-color:var(--ring);box-shadow:0 0 0 3px color-mix(in oklch,var(--ring) 50%,transparent)}
.input[aria-invalid=true]{border-color:var(--destructive);box-shadow:0 0 0 3px color-mix(in oklch,var(--destructive) 20%,transparent)}
.field[data-invalid=true] .label{color:var(--destructive)} .error{font-size:14px;color:var(--destructive)}
```

## 5. Dialog (`dialog-open.png`, Popup x 440–825, y 247–553)

- Sicht: Seite hinter dem Dialog ist abgedunkelt und weichgezeichnet (Overlay mit Blur, ~4px). Das ist in den Quellklassen nicht belegt; Sicht zeigt es klar (Text der Sidebar unscharf). Unsicher, ob Blur vom Docs-Wrapper oder Overlay kommt.
- Popup: 384×306 (`sm:max-w-sm`), Radius 14, Fläche #171717 (`bg-popover`), Ring 1px weiß/10 %, Padding 16, Grid-Gap 16. Kein sichtbarer Drop-Shadow. Quelle REPORT.md DOM: `fixed top-1/2 left-1/2 -translate-1/2 max-w-[calc(100%-2rem)] rounded-xl ring-1 ring-foreground/10 z-50`.
- Header: Titel „Edit profile“ 16px Semibold; Beschreibung 14px Muted, zwei Zeilen, `text-balance`-artig. Close-X oben rechts 16px, Muted, Ghost, ~28×28 Hitbox. Sicht: x 795–805, y 264.
- Body: zwei Felder vertikal, Gap 16; Name-Feld hat Fokusring (Auto-Focus auf erstes Input). Sicht: y 366–398.
- Footer: 1px Top-Border, Fläche minimal heller (`bg-muted/50`, gleiche Regel wie Card-Footer), negative Margins gleichen das Popup-Padding aus; Buttons rechtsbündig: „Cancel“ Outline, „Save changes“ Primary; Gap 8; unter sm `flex-col-reverse` (primäre Aktion mobil oben). Sicht: y 490–553.
- Animation (Quelle): 100ms, Fade + Zoom von 95 %, gesteuert über `data-open`/`data-closed`.
- Warum es funktioniert: Popup nutzt exakt die Card-Anatomie (Header/Content/Footer) — Nutzer lernt ein Muster. Ring statt Schatten, weil Overlay bereits Tiefe erzeugt.
- Slop-Risiko: Escape/Fokusfalle/Scroll-Lock nicht belegt; blur auf Overlay kostet Performance auf Mobile.

Bau:
```css
.overlay{position:fixed;inset:0;z-index:50;background:rgb(0 0 0/.5);backdrop-filter:blur(4px)}
.dialog{position:fixed;top:50%;left:50%;translate:-50% -50%;z-index:50;width:100%;max-width:min(24rem,calc(100% - 2rem));
  display:grid;gap:16px;padding:16px;border-radius:calc(var(--radius)*1.4);background:var(--popover);color:var(--popover-foreground);
  box-shadow:0 0 0 1px color-mix(in oklch,var(--foreground) 10%,transparent)}
.dialog[data-closed]{opacity:0;scale:.95} .dialog{transition:opacity .1s,scale .1s}
.dialog-footer{display:flex;flex-direction:column-reverse;gap:8px;margin:0 -16px -16px;padding:16px;border-top:1px solid var(--border);background:color-mix(in oklch,var(--muted) 50%,transparent)}
@media(min-width:640px){.dialog-footer{flex-direction:row;justify-content:flex-end}}
.dialog-close{position:absolute;top:12px;right:12px;width:28px;height:28px;color:var(--muted-foreground);border-radius:6px}
```

## 6. Table (nur Quelle, kein Screenshot — `table.md`)

- Anatomie: `Table > TableCaption + TableHeader>TableRow>TableHead + TableBody>TableRow>TableCell + TableFooter`. Beträge `text-right`, Schlüsselspalte `font-medium`, feste erste Spalte `w-[100px]`, Caption unter der Tabelle als Muted-Text.
- Zeilenaktionen: Ghost-Icon-Button `size-8` mit `sr-only` „Open menu“ und Dropdown `align=end`; destruktive Aktion mit `variant="destructive"` getrennt durch Separator (`table.md` Zeilen 324–390).
- Ableitung: Kopfzellen Muted 14/500, Zeilen 14/400, Zeilenhöhe ~40–44, Zeilenlinien 1px `--border`, Hover `bg-muted/50`. Nicht sichtbar belegt — als Ableitung markiert.

## 7. Dropdown-Menü (nur Quelle — `dropdown-menu.md`)

- Anatomie: Trigger (`render={<Button variant="outline"/>}`) → Content `w-40 align=start` → Group > Label / Item / Shortcut / Separator; Sub mit SubTrigger + SubContent im Portal; CheckboxItem, RadioGroup.
- Slots im Item: Icon links, Label, Shortcut rechts in Muted, Tracking weit (`⇧⌘P`). Destruktiv als eigene Variante.
- Ableitung: Content = Popover-Fläche, Radius 10–14, Ring 1px, Padding 4, Item h 32, Radius 6, Hover `bg-accent`. Kein visueller Beleg im Paket.

## 8. Farblogik als Rollentabelle (Quelle `theming.md`, Sicht Dark-Screenshots)

| Rolle | Dark (Sicht ≈ Hex) | Light (Quelle) | Verwendung |
|---|---|---|---|
| Page (`background`) | #0a0a0a (oklch .145) | #ffffff | Body, Preview-Rahmen |
| Surface (`card`/`popover`) | #171717 (oklch .205) | #ffffff | Card, Dialog, Promo-Box, Menü |
| Raised/Muted (`muted`/`accent`/`secondary`) | #262626 (oklch .269) | #f7f7f7 | Suche, Sidebar-aktiv, Footer-Zone (50 %), Hover |
| Action (`primary`) | #ebebeb / Text #333 | #343434 / Text #fbfbfb | „+ New“, „Login“, „Save changes“ |
| Text (`foreground`) | #fafafa | #252525 | Titel, Labels, Nav |
| Muted Text | #b5b5b5 (oklch .708) | #8e8e8e (oklch .556) | Beschreibungen, Placeholder, TOC |
| Border | weiß 10 % | #ebebeb | Trenner, Card-Ring, Footer-Top |
| Input-Border | weiß 15 % (Fläche 30 % davon) | #ebebeb | Input, Outline-Button |
| Ring | #8e8e8e (oklch .556) 50 % | #b5b5b5 50 % | Fokus 3px |
| Accent/Brand | keine — nur Destructive (Rot oklch .704 .191 22) | oklch .577 .245 27 | Fehler, destruktive Items |

Radius-Familie: `--radius: 0.625rem` (10px); sm 6, md 8, lg 10, xl 14, 2xl 18. Belegt: Buttons 10 (Sicht/DOM), Cards/Dialog 14, Inputs 8.

## 9. Spacing-Rhythmus

- Basis 4px. Belegte Stufen: 4 (Header-Gap Title→Desc), 6 (Button-Gap Icon), 8 (Label→Input, Button-Gruppe), 12 (Card sm), 16 (Card/Dialog Inset, Grid-Gap), 24 (Field→Field, Section-Gap), 32 (Buttonhöhe), 36 (Inputhöhe).
- Ein Inset pro Container (`--card-spacing`), negativ zurückgerechnet für Bleed-Elemente. Footer-Zonen entfernen Parent-Padding statt Doppelpadding.

## 10. Gemeinsamkeiten im Paket

1. Tiefe entsteht nur durch Ring 1px (`foreground/10`) und Flächenstufen (.145 → .205 → .269), nie durch Drop-Shadows oder Gradients. Einzige Ausnahme: Code-Fade-Gradient.
2. Jede Interaktion hat dieselbe Fokusform: Border `--ring` + 3px Ring 50 %.
3. Header/Content/Footer-Anatomie ist identisch in Card und Dialog; Footer immer `border-top` + `muted/50`.
4. Betonung ist eine Achse (default/outline/secondary/ghost/destructive/link), Größe eine andere; beide über `data-variant`/`data-size` inspizierbar.
5. Typo-Stufen: 30/600 (H1), 16/600 (Card-/Dialog-Titel, Legend), 14/500 (Label, Button, Nav), 14/400 Muted (Body/Desc), 12.8/500 (Sidebar), 12/500 Muted (TOC-Label). Alles Geist Sans, Code in Mono.
6. Kein Farbakzent im Neutral-Preset; Hierarchie ausschließlich über Helligkeit und Gewicht.

## 11. Dos

- Rollen-Paare (Surface + Foreground) definieren, nie einzelne Hexwerte streuen.
- Ein Inset-Token pro Container; Bleed per negativem Margin auf demselben Token.
- Ring statt Schatten für Dark Surfaces; Border-Farbe als Weiß-Alpha, damit sie auf jeder Stufe passt.
- Primary/Outline mit transparenter bzw. sichtbarer 1px Border gleich hoch bauen (`bg-clip-padding`).
- Fokusring 3px halbtransparent plus Border-Wechsel; identisch für Button, Input, Select.
- Label über dem Feld, Hilfetext darunter, Fehler zusätzlich; `aria-invalid` + `data-invalid` + `aria-describedby` verdrahten.
- Footer-Zonen als `border-top` + `muted/50`, Aktionen rechtsbündig, mobil `column-reverse`.
- Header-Grid `1fr auto` mit Action über zwei Zeilen für Titel+Beschreibung+Link.
- Sidebar-Listen mit `mask-image`-Fade statt harter Kante.

## 12. Don'ts

- Keine Drop-Shadows, Glows, Grain oder Gradients auf Cards — das System lebt von Flächenstufen.
- Keine Karten um Absätze; Card nur mit realen Slots.
- Keinen 32px-Docs-Button als Marketing-CTA übernehmen; `whitespace-nowrap` bei langen deutschen Labels entfernen.
- `CardTitle` nicht als Heading-Ersatz verstehen; echte `h2/h3` setzen.
- Native Browservalidierung nicht mit shadcn-Fehleroptik verwechseln (`card-invalid.png`).
- Links nicht als Base-Button mit `render={<a/>}` bauen (Rolle wird überschrieben); `<a class="btn">` verwenden.
- Radius-Familie nicht mit „radius − 4px“-Rezepten mischen; multiplikativ bleiben.
- Overlay-Blur nicht ungeprüft auf Mobile ausrollen.

## 13. Mobile-Hinweise

- Nicht sichtbar im Paket (alle 1280px). Quelle: Dialog `max-w-[calc(100%-2rem)]`, Footer `flex-col-reverse` bis sm; Field `orientation=responsive` via Container Query; Sidebar `hidden lg:flex`; Preview-Buttons `size-8 md:size-7` (größere Touchziele unter md); Popover-Trigger `flex lg:hidden` für die mobile Navigation.

## 14. Unlesbar / nicht belegt

- `dialog-open.png`: Hintergrundseite ist absichtlich unscharf; Details der Sidebar/TOC dort unlesbar.
- `button.png` Code-Bereich: Zeile 3 hinter dem Fade nur teilweise lesbar; Syntaxfarben geschätzt.
- Table und Dropdown: kein Screenshot; Optik nur aus Klassen/Quelle abgeleitet.
- Overlay-Blur-Wert und Overlay-Alpha: Sicht ja, Klassen nicht im Paket.
- Light-Mode: nur Quellwerte, kein Render.
