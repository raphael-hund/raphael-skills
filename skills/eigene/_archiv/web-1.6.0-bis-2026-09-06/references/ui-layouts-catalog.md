# UI-Layouts-Katalog — Ideen-/Vokabular-Liste (kein Code)

**Wofür:** Wenn beim Sitemap-/Art-Direction-Schritt Ideen für schicke
Animation-/3D-/Glass-Komponenten fehlen — als Stichwortliste zum Nachschlagen
und Googeln/Bauen, **nicht** als Copy-Paste-Codequelle.

**Herkunft:** Kategorien-/Namensliste aus `ui-layouts/mcp` (`src/registry.ts`,
vendoriert unter `/root/tools/vendor/ui-layouts-mcp`), MIT-Lizenz. Der
eigentliche Komponenten-Code liegt dort **nicht** im Repo, sondern wird zur
Laufzeit remote von `ui-layouts.com/r/{key}.json` bezogen — deshalb hier nur
die Ideen-Liste, kein Code-Vendoring.

## Animation & Motion
Swapy Drag, Timeline-Animation, Text-Marquee, Randomized Text, Image-Mousetrail,
Horizontal Scroll, Stacking Card, Smooth-Scroll, Sticky Scroll, Sparkles,
Sparkles-Title, Marquee, Infinity-Brand-Leiste.

## Visuelle Effekte
Liquid-Glass, Noise, Blur-Vignette, Liquid-Gradient, Spotlight-Cards,
Image-Reveal, Blocks, Animated Beam.

## 3D & Visuals
Globe, Image-Ripple-Effect, R3F-Blob, Mesh-Gradients.

## Overlays
Dialog, Media-Modal, Linear-Modal, Gallery-Modal, Responsive-Modal, Motion-Drawer.

## Formulare
Color-Picker, Buttons, Motion-Number, Range-Slider, Password-Feld, Tags-Input
(YouTube-Style), Phone-Input, Datetime-Picker, Multi-Selector.

## Layout & Navigation
Footers, Responsive-Header, Grid, Masonry, Tabs, Image-Tabs, Magnified-Doc,
Framer-Carousel.

## Sonstiges (Data Display / Disclosure)
Buy-Me-a-Coffee-Button, Hover-Cards, Product-Cards, Gradient-Border, Accordion,
FAQs, Image-Accordion.

## Nutzung

1. Passenden Begriff hier finden (z. B. "Landingpage-Hero braucht etwas
   Auffälliges" → Mesh-Gradients, Liquid-Glass, Spotlight-Cards).
2. Danach entweder selbst mit design/impeccable-Doktrin bauen, oder aus der
   vendorierten `ui-components/`-Bibliothek (beUI, tatsächlicher Code
   vorhanden) das nächstliegende Pendant nehmen.
3. **Optional, sparsam:** Der MCP-Server selbst kann als Live-Connector
   verbunden werden, falls echter Code aus diesem Katalog gebraucht wird:
   `claude mcp add ui-layouts-mcp --scope user -- npx -y @ui-layouts/mcp`.
   Das ist ein laufender externer Prozess mit Internetzugriff — nur bei
   konkretem Bedarf aktivieren, nicht standardmäßig.
