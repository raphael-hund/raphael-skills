> Vendoriert aus claude-skill-web-clone (github.com/Jane-xiaoer/
> claude-skill-web-clone), MIT-Lizenz. Schema urspruenglich adaptiert von
> zanwei/design-dna (github.com/zanwei/design-dna, MIT). Details:
> `../VENDORING.md`.

# Design-DNA-Schema — Referenz-Site zu eigenem Stil destillieren

Optionales Werkzeug fuer die taste-Linie, wenn eine bestehende Referenz-Seite
(Wettbewerber, Inspirationsseite, Kunden-Altsystem) als **Stil-Vorlage**
dienen soll — Design-DNA extrahieren, dann Inhalt gegen den Kunden tauschen.

## Abgrenzung — WANN nicht benutzen

Design-DNA ist Naeherung ("ein stimmiger neuer Auftritt"), keine 1:1-Kopie.

| Modus | DNA nutzen? |
|---|---|
| Treuer Nachbau (echter Quellcode vorhanden, Byte-genau) | **Nein** — der echte Code ist die Wahrheit, DNA wuerde ihn zu einer Naeherung verwaesseren |
| Visuelle Anlehnung (Wirkung uebernehmen, Umsetzung vereinfachen) | **Ja** — das ist der Hauptfall |
| Content-Umbau (Struktur/Rhythmus/visuelle Grammatik behalten, Inhalt komplett tauschen) | **Ja** — DNA definiert, was bleibt |

Kurz: DNA ist fuer "einen eigenen Auftritt im Stil von X bauen", nicht fuer
"X 1:1 nachbauen". Fuer 1:1-Nachbau siehe web (Website-Clone-Workflow,
Lizenz-Pruefpflicht vor jedem Nachbau).

## Drei Ebenen

1. **`design_system`** — messbare Tokens: Farbe, Typografie, Spacing,
   Layout, Form, Elevation, Iconografie, Motion, Komponenten. Wird direkt zu
   CSS-Variablen.
2. **`design_style`** — subjektive Wahrnehmung: Aesthetik (Mood/Genre/Era),
   visuelle Sprache, Komposition, Bildsprache, Interaction-Feel,
   Markenstimme im UI. Steuert bewusste Entscheidungen, keine Messwerte.
3. **`visual_effects`** — Rendering jenseits normalem CSS: Hintergrund,
   Partikel, 3D, Shader, Scroll, Text, Cursor, Bild, Glass/Neu, Canvas, SVG.
   Entscheidet, ob Canvas/WebGL/GSAP noetig ist.

## Workflow

1. **Structure** — Schema unten pruefen, nicht relevante Dimensionen
   kappen.
2. **Analyze** — aus Recon-Material extrahieren: Farben aus CSS-Variablen +
   Section-Backgrounds (Flaeche -> primary, CTA -> accent), Fonts aus
   `font-family`-Deklarationen (Heading/Body/Mono trennen), Spacing/Layout
   aus Screenshots + Rect-Messungen, Effekte aus erkannten Frameworks
   (Three.js/GSAP/Lenis) + Canvas-Vorkommen. **Jedes Feld ausfuellen, nie
   leer lassen** — was nicht belegt ist, als `TODO` markieren mit Angabe,
   welcher Beleg fehlt statt es zu erfinden.
3. **Generate** — DNA parsen -> CSS-Custom-Properties generieren ->
   `design_style` fuer subjektive Entscheidungen nutzen ->
   Effekt-Intensitaet bestimmt die Umsetzungsebene (lightweight = CSS/SVG/
   Vanilla, medium = Canvas2D/GSAP/Lottie, heavy = Three.js/GLSL/Pixi) ->
   Seite bauen -> Kunden-Content einfuellen. Assets moeglichst aus der
   Originalseite entnehmen (nicht per KI neu erzeugen).

## Skelett generieren

```bash
node scripts/dna-scaffold.mjs --out design-dna.json [--recon <recon.json>] [--name <projekt>]
```

Funktioniert auch ohne `--recon` (reines leeres Skelett zum Selbst-Ausfuellen).
Mit `--recon` (JSON von einem Recon-Schritt, z.B. aus web) fuellt das
Script Font-/Farb-Kandidaten und Framework-Signale best-effort vor — Rest
bleibt `""` fuer die manuelle Analyse. Disziplin: nur echt erfasste Signale
uebernehmen, nichts erfinden; unsichere Farbrollen landen gesammelt in
`_recon_signals` fuer die manuelle Zuweisung.

## JSON-Schema (vollstaendig)

```json
{
  "meta": { "name": "", "description": "", "source_references": "", "created_at": "" },

  "design_system": {
    "color": {
      "palette_type": "monochromatic | complementary | analogous | triadic | split-complementary",
      "primary":   { "hex": "", "role": "" },
      "secondary": { "hex": "", "role": "" },
      "accent":    { "hex": "", "role": "" },
      "neutral":   { "scale": "", "usage": "" },
      "semantic":  { "success": "", "warning": "", "error": "", "info": "" },
      "surface":   { "background": "", "card": "", "elevated": "" },
      "contrast_strategy": "high contrast | subtle layers | dark-on-light dominant"
    },
    "typography": {
      "type_scale": {
        "display": {}, "heading_1": {}, "heading_2": {}, "heading_3": {},
        "body": {}, "body_small": {}, "caption": {}, "overline": {}
      },
      "font_families": { "heading": "", "body": "", "mono": "" },
      "font_style_notes": ""
    },
    "spacing": { "base_unit": "", "scale": "", "content_density": "compact | comfortable | spacious", "section_rhythm": "" },
    "layout":  { "grid_system": "", "max_content_width": "", "columns": "", "gutter": "", "breakpoints": "", "alignment_tendency": "strict grid | centered | asymmetric | mixed" },
    "shape":   { "border_radius": {}, "border_usage": "none | subtle 1px | bold borders | only on inputs", "divider_style": "" },
    "elevation": { "shadow_style": "none | soft diffused | hard drop | layered", "levels": {}, "depth_cues": "shadows | overlapping layers | blur/glass | color intensity" },
    "iconography": { "style": "", "stroke_weight": "", "size_scale": "", "preferred_set": "" },
    "motion": { "easing": "", "duration_scale": {}, "entrance_pattern": "", "exit_pattern": "", "philosophy": "minimal functional | playful bouncy | cinematic | none" },
    "components": { "button_style": "", "input_style": "", "card_style": "", "navigation_pattern": "", "modal_style": "", "list_style": "", "component_notes": "" }
  },

  "design_style": {
    "aesthetic": { "mood": [], "visual_metaphor": "", "era_influence": "", "genre": "", "personality_traits": [], "adjectives": [] },
    "visual_language": { "complexity": "minimal | moderate | rich | maximal", "ornamentation": "none | subtle accents | decorative | heavily ornamented", "whitespace_usage": "", "visual_weight_distribution": "", "focal_strategy": "single hero element | distributed interest | progressive reveal", "contrast_level": "", "texture_usage": "" },
    "composition": { "hierarchy_method": "scale contrast | color weight | spatial isolation | typographic hierarchy", "balance_type": "symmetric | asymmetric | radial | mosaic", "flow_direction": "", "grouping_strategy": "", "negative_space_role": "" },
    "imagery": { "photo_treatment": "", "illustration_style": "", "graphic_elements": "", "pattern_usage": "", "image_shape": "" },
    "interaction_feel": { "feedback_style": "", "hover_behavior": "", "transition_personality": "snappy | smooth glide | bouncy elastic | fade-subtle", "loading_style": "", "microinteraction_density": "" },
    "brand_voice_in_ui": { "tone": "", "formality": "", "cta_style": "direct imperative | friendly invitation | urgent scarcity | subtle suggestion", "empty_state_approach": "", "error_tone": "" }
  },

  "visual_effects": {
    "overview": { "effect_intensity": "none | subtle-accent | moderate | heavy-immersive", "performance_tier": "lightweight | medium | heavy", "fallback_strategy": "", "primary_technology": "CSS only | Canvas 2D | WebGL/Three.js | GSAP | Lottie | SVG SMIL | Pixi.js" },
    "background_effects": {}, "particle_systems": { "enabled": false },
    "3d_elements": { "enabled": false }, "shader_effects": { "enabled": false },
    "scroll_effects": {}, "text_effects": {}, "cursor_effects": { "enabled": false },
    "image_effects": {}, "glassmorphism_neumorphism": { "enabled": false },
    "canvas_drawings": { "enabled": false }, "svg_animations": {},
    "composite_notes": ""
  }
}
```
(Vollstaendige Feldliste inkl. aller `params`-Unterfelder im generierten
Skelett — `node scripts/dna-scaffold.mjs --out <datei>` ausfuehren.)

## Abgrenzung zu Effekt-Reverse-Engineering

Seiten, deren `visual_effects` als `heavy-immersive`/`WebGL`/Shader markiert
sind: DNA soll den Effekt NICHT naeherungsweise nachbilden — echte
Reverse-Engineering-Arbeit (Shader/Draw-Calls) ist Aufgabe von web, nicht
dieses Schemas. DNA deckt hier nur die Design-Ebene **ausserhalb** des
Effekts ab (Farbe/Typo/Layout/normale Motion).
