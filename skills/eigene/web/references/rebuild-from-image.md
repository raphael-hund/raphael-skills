# Bild-Rebuild — Website aus Screenshot/Mockup/Referenzbild nachbauen

**Wofür:** Wenn die Vorlage kein lebendiger Klick-Link ist, sondern ein
**Bild** — Screenshot, Figma-Export, Mockup, Fullpage-Longshot, Foto einer
Referenzseite. "Bild zu Website", "Screenshot nachbauen", "aus diesem Mockup
eine echte Seite bauen", "pixelgenau aus dem Bild umsetzen".

**Herkunft:** destilliert aus `/root/tools/vendor/webdesigner-pro/skills/
rebuild-website-from-image/` (SKILL.md, MODULES.md, references/). Die
Higgsfield-Asset-Pipeline (`higgsfield-pipeline.md`, `higgsfield-doctor.mjs`,
Vendor-Abo-Kopplung) und die Node-Gate-Scripts (`contract-gate.mjs`,
`render-strategy.mjs`) sind **bewusst nicht übernommen** — das ist
Vendor-/Abo-Infrastruktur, kein portabler Ablauf. Was hier steht, ist der
Denkweg dahinter, werkzeugunabhängig nutzbar.

## Abgrenzung zu web-clone-playbook.md — nicht doppelt lesen

| | **web-clone-playbook.md** | **dieses Dokument** |
|---|---|---|
| Vorlage ist | eine lebendige URL | ein Bild (Screenshot/Mockup/Foto) |
| Erster Schritt | echten Quellcode suchen (GitHub) | Bild-Herkunft/Nutzungsrecht klären |
| Kernrisiko | KI erfindet Code-Details, die nicht im Source stehen | KI erfindet Zustände, die im Bild nicht sichtbar sind |
| Ergebnis-Basis | Framework/DOM/Netzwerk-Recon | Sektions-Zerlegung + Renderstrategie pro Element |
| Lizenz-Check | Repo-Lizenz (MIT/Apache/keine/proprietär) | Bild-Nutzungsstatus (`owned`/`licensed`/`reference-only`/`unknown`) |

Beide münden in denselben Build- und QA-Schritt (Haupt-SKILL.md, Abschnitt
Ablauf). Bei **beidem zugleich** (Kunde zeigt Screenshot einer Seite, deren
URL man auch hat) — zuerst web-clone-playbook.md (echter Code schlägt jede
Bild-Vermutung), dieses Dokument nur für Bildteile ohne erreichbaren Source
(z. B. reine Mockups ohne Live-Seite).

## Eiserne Regel: Bild ist visuelle Wahrheit, nie mehr

Ein Bild beweist nur, was auf ihm sichtbar ist. Alles andere ist Vermutung —
und Vermutung, die als Tatsache verkauft wird, ist der teuerste Fehler in
diesem Ablauf. Jede Angabe bekommt eine von drei Marken:

- **observed** — direkt im Bild sichtbar, an eine Region gebunden
- **inferred** — für eine funktionierende Seite sinnvoll ergänzt (Hover-Zustand, Mobile-Reflow, Footer-Links)
- **unknown** — aus dem Bild nicht bestimmbar, offen gelassen statt erfunden

Ein einzelner Desktop-Screenshot beweist **kein** Mobile-Layout, keinen
Hover-Zustand, kein Backend und keine außerhalb des Bildausschnitts
liegenden Seitenbereiche. Fremde Logos, Wasserzeichen, Personen,
Bewertungen und Zertifikate werden nicht neu erfunden oder aus dem Bild
herausgelöst — das ist Copy-/Rechte-Territorium, kein Design-Territorium.

## Image-first-Workflow (LexLin) — wenn die Bilder erst erzeugt werden

Wenn es noch **kein** Kunden-Screenshot gibt, sondern Design-Mockups per
Image-Gen (ein Bild pro Sektion) gebaut und danach codiert werden sollen:
Methodik in `lexlin-design-prinzipien.md` → Abschnitt **Image-first**. Danach
gelten ab Schritt 2 unten dieselben Regeln (observed/inferred/unknown, Sektion
für Sektion, Screenshot-Feedback). Assets: generate-and-extract, nicht nur
croppen; Einbau über `bildgenerierung.md`.

## Ablauf in fünf Schritten

### 1. Intake — Bild-Herkunft festnageln, bevor irgendwas gebaut wird

- Originaldatei unverändert sichern (kein Zuschneiden/Nachschärfen vor der Analyse).
- Bildtyp festhalten: Einzel-Viewport, Fullpage-Longshot, Section-Mockup oder zusammengesetztes Board.
- Referenz-Viewport (Breite in px) notieren, sonst `unknown`.
- Nutzungsstatus: `owned` (eigenes Werk) / `licensed` (Lizenz vorhanden) /
  `reference-only` (nur als Stilvorlage, keine Nutzungsrechte) / `unknown`.
- `copyMode` festlegen: **`design-only` ist der Default** — nur Layout/Look
  übernehmen, eigene Copy schreiben. `binding` nur wenn der Kunde die
  sichtbare Copy ausdrücklich als seine eigene bestätigt.
- Bei `reference-only`/`unknown`: nur Design-DNA übernehmen, Marke/Copy/
  Personen/Claims/fremde Assets ersetzen oder offen als Platzhalter markieren.

### 2. Sektions-Analyse — vom Bild zur Region-Map

Nicht vom Hero direkt in Code springen. Erst eine vertikale Region-Map
bauen, oben nach unten:

1. globaler Hintergrund und Seitengitter
2. Header/Navigation
3. sichtbare Sections in Reihenfolge
4. überlagernde/sticky/fixed Elemente
5. Footer
6. Crop-Grenzen und außerhalb des Bildes liegende Unbekannte (ausdrücklich benennen, nicht stillschweigend weglassen)

Für jede Section: stabile ID, Funktion im Nutzerfluss, sichtbare Anatomie,
Layer-Reihenfolge, extrahierte Design-Tokens (Farben messen, Typo-Kandidaten
mit Unsicherheit markieren, Raster/Abstände/Radien), Component-Kandidat,
Asset-Kandidat, observed/inferred/unknown-Zuordnung, Responsive-Regel.

Ein Fullpage-Bild gilt erst als vollständig zerlegt, wenn Header, Footer
und Overlays einen ausdrücklichen Entscheid haben — auch wenn der Entscheid
`keine vorhanden` lautet.

**Renderstrategie pro Element** — vor dem Bau jedes Elements entscheiden,
womit es umgesetzt wird:

| Bedarf | Strategie | Beispiel |
|---|---|---|
| Lesbarer Inhalt oder Steuerung | echtes DOM | Navigation, CTA, Formular, Preis |
| Einfache Geometrie | CSS/SVG | Border, Grid, Fläche, Linie |
| Dekoratives Standbild ohne Bedienung | generiertes/vorhandenes Asset | Textur, Illustration, 3D-Szene |
| Visual plus lesbare Information | hybrid | Chart-Bild plus echte Werte im DOM |
| Bedienung oder Live-Daten | echte Integration | Kartensuche, Filter, Live-Dashboard |

Blocker, die nie durchgehen: statische Karte mit scheinbar klickbaren
Markern/Zoom/Suche; Formular/Button/Navigation als Teil eines Bildes;
veraltete Daten als Live-Dashboard ausgeben; Logos/Bewertungen/Zertifikate/
Personen generieren und als echt darstellen; zentralen Text nur im
Rasterbild verstecken statt im DOM.

### 3. Deterministischer Rebuild-Prompt — der Build-Handoff

Die Implementierungs-Rolle bekommt **nur**, nicht das Bild zur freien
Neuinterpretation:

- die Region-Map aus Schritt 2 (Sections, IDs, Reihenfolge, Tokens)
- die Renderstrategie-Entscheidung pro Element
- den `copyMode`-Entscheid (design-only vs. binding)
- die Responsive-/Interaction-Vorgaben (siehe unten)
- Akzeptanz-Viewports: **1440, 768, 390 px** (bei dichten Apps zusätzlich 1024)

Responsive aus einem einzelnen Bild: alle Nicht-Referenz-Breiten sind
`inferred`. Pro Section vorab festlegen — Container/Seitenränder,
Spaltenzahl und Reflow-Reihenfolge, Wrap-/Stack-/Collapse-Punkte, Typo mit
`clamp()` oder begründeten Stufen, Bildratio/Fokuspunkt/Crop, mobile
Navigation, Sticky-Verhalten, Touch-Ziele. Mobile nie als geschrumpften
Desktop bauen.

Interaktionsvertrag pro bedienbarer Component (soweit relevant): default,
hover, focus-visible, active, disabled, loading, success, error, empty,
Keyboard-Verhalten, Screenreader-Name, Reduced-Motion-Fallback. Ein Bild
belegt höchstens den sichtbaren Default-Zustand — alles andere ist
abgeleitet und muss zum bestehenden Design-System passen (→ **design**-Skill).

Statische Simulation (z. B. Kartenbild statt echter Karte) ist nur erlaubt,
wenn keine Bedienung erwartet wird, keine wechselnden Daten behauptet
werden, keine scheinbaren Controls im Bild verbleiben und Bedeutung als
Text/zugänglicher Fallback existiert (z. B. echte Adresse im DOM neben dem
Kartenbild).

### 4. Build

Bestehenden Stack bewahren, Section-Reihenfolge/Geometrie/Typohierarchie/
Bildbalance/visuelle Signaturen erhalten. Für Umsetzung, Stack-Wahl und
Motion-Komponenten gilt der normale Build-Schritt aus dem Haupt-SKILL.md
(Abschnitt Ablauf, Punkt 6) — hier keine Parallelregeln.

### 5. Pixel-Treue-Check — gegen echte Renderings beweisen, nicht per Gefühl

1. Referenzbild und Build im selben Referenz-Viewport erfassen (Browser-Zoom, DPR, Font-Ladezustand dokumentieren; Scroll-Reveal/Lazy-Load/Animation vor dem Screenshot stabilisieren).
2. Side-by-side und 50-%-Overlay erzeugen.
3. Sections einzeln vergleichen, nicht nur den Gesamteindruck.
4. Getrennt bewerten: Layout/Geometrie, Typografie, Farbe/Material, Assets/Crop, Responsive, Interaction, Accessibility. Kein einzelner Pixel- oder Wahrnehmungsscore reicht als Gesamturteil.
5. Pro Iteration nur die fehlerhafte Achse reparieren, keine neue Designrichtung nebenbei einführen.
6. Erst Referenzbreite sperren, danach 768 und 390 px abschließen.
7. Frischer Reviewer gibt frei — der Builder darf sich nicht selbst abnehmen (deckt sich mit dem `qa-faecher`-Grundsatz im Haupt-SKILL.md).

Antialiasing, dynamische Daten und Videos dürfen mit begründeten Masken
behandelt werden — ganze schwache Sections nie maskieren, sondern
neu bauen. Kein Reviewer erreichbar heißt `blocked`, nie Auto-PASS.

## Fertig-Kriterium (ohne Vendor-Gate-Scripts, gleicher Maßstab)

- sichtbare Referenzfläche vollständig abgedeckt (Header/Footer/Overlays mit explizitem Entscheid)
- observed/inferred/unknown sauber getrennt dokumentiert
- keine statische Attrappe an Stelle erwarteter Funktion (siehe Blocker-Liste oben)
- Screenshots auf 1440, 768, 390 px vorhanden
- alle sieben Fidelity-Achsen (Layout, Typo, Farbe, Assets, Responsive, Interaction, A11y) einzeln bewertet, keine offen
- Lighthouse/axe = 0 (Haupt-SKILL.md G1, gilt unverändert)
- frischer Reviewer hat freigegeben, keine offenen hohen Risiken

## Bewusst weggelassen

- **Higgsfield-Asset-Pipeline** (`image_decompose`, `outpaint`, `gpt_image_2`,
  `recraft_v4_1`, Upscale-Modelle) — Vendor-Abo-Bindung, kein portabler
  Ablaufschritt. Wird ein generiertes Asset für eine dekorative Fläche
  gebraucht, läuft das über `references/bildgenerierung.md` (Higgsfield CLI /
  GPT Image 2 / Recraft), nicht über den Vendor-Pfad und nicht über ein
  separates `imagegen-web`-Skill als Default (nur Host+Router, kein Pflichtpfad).
- **`contract-gate.mjs` / `render-strategy.mjs` / `higgsfield-doctor.mjs`** —
  Node-Scripts, die Vendor-JSON-Contracts (`site-contract.json`,
  `asset-plan.json`, `final-evidence.json`) gegen ein Higgsfield-Setup
  prüfen. Der *Inhalt* dieser Gates (Wahrheitsmodell, Renderstrategie-Matrix,
  Fidelity-Achsen) ist oben eingearbeitet — die Scripts selbst nicht vendoriert.
- **fremde Runner-Metadaten** — nicht aus dem Vendor-Paket übernommen; die
  kanonische Skill-Metadatei wird unabhängig für diesen Skill gepflegt.

## Abgrenzung zu rebuild-prompt-vertrag.md — nicht doppelt lesen

Der zuvor hier vorgemerkte Brain-Kandidat ist inzwischen freigegeben im
Second-Brain-Wiki: `wiki/craft/webdesign/2026-07-20-rebuild-prompt-vertrag.md`
(voller Pfad: `/root/raphael-brain/wiki/craft/webdesign/2026-07-20-rebuild-prompt-vertrag.md`). Er
vertieft nur Schritt 3 dieses Dokuments (Region-Map + Renderstrategie →
deterministischer Build-Handoff) zu einer eigenständigen, werkzeugunabhängigen
Vertrags-Anatomie (feste Reihenfolge, Verbatim-Blöcke, exakte px-Werte,
explizite Verbote). Die anderen vier Schritte hier — Intake/Bild-Herkunft,
Sektions-Analyse, Build, Pixel-Treue-Check — bleiben bildspezifisch und
gehören nicht dorthin. Bei Bedarf an der reinen Prompt-Anatomie (auch für
Nicht-Bild-Vorlagen) dort nachlesen, bei Bedarf am Bild-Ablauf selbst hier.
