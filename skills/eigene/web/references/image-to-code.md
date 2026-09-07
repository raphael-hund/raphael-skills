# Reference → individual elements → responsive code

Read whenever Raphael supplies a screenshot, section mockup or reference whose imagery/components must survive implementation. This is MAKE's operational synthesis; an exact creator prompt must have its own retrieved source. A missing X article is not evidence for an invented quotation.

## Source and adaptation

Leon's May example and July article were read in full directly on X on 7 Sep 2026 (see the verified sequence below); the earlier mirror reading is superseded. His concrete sequence is section mockups, individual regenerated assets, optional background removal, then section-by-section code and screenshot corrections. See [creator-methods.md](creator-methods.md) for source/evidence limits and the short original prompt excerpt. This operational version uses Raphael's HTML default and the host's supported image tools; it does not copy the example's React/Adobe choices.

## Leon's verified sequence (X, 1 May 2026, read in full on 7 Sep 2026)

Raphael wants this exact workflow available, element by element. The post "How To Turn An Image Into A Website (EXAMPLE)" was read directly in the browser; full text, descriptions of all ten images and the thread replies are in [x-posts-volltext-2026-09.md](corpus/x-posts-volltext-2026-09.md); six viewed screenshots (bild02, 04, 05, 06, 07, 08) are in `../assets/creator-evidence/leon-image-to-code/`, the remaining captures stay in the research folder. Its steps and literal prompts:

1. **One mockup image per section.** Generate section images with the `imagegen-frontend-web` skill; horizontal, one image per section, several runs in separate chats, thinking mode on. His prompt: *"Based on this skill above, generate images for a website for an AI agency. The design should include eight sections, with one image per section, eight distinct images in total. The website should feel polished and clean and rather minimalist with less info, but with striking image effects/visuals and creative layouts. Use orange as the main color. All images should be horizontal"*. Refine single images ("remove the 3 cards on the right") or restyle all ("change the theme to liquid glass") before downloading.
2. **Mark the image objects.** In each chosen mockup, box every pictorial element that is not text or UI: glass forms, product renders, data cards used as decoration, icons. [Viewed markup](../assets/creator-evidence/leon-image-to-code/bild04-website-vorlage-mit-markierten-elementen.png).
3. **Extract them in one prompt, count stated, appearance frozen.** Literal prompts: *"extract the images on the right, generate them total should be 7 extracted generated images, please dont change them, they should look exactly the same"* and *"in this image there are 4 images used. extract them and generate all 4. so generate 4 different images in total"*. The generator returns each object as its own image. [Viewed result](../assets/creator-evidence/leon-image-to-code/bild05-extraktions-prompt-7-bilder.png).
4. **Remove backgrounds separately.** ChatGPT no longer outputs transparency, so he uses Adobe Express; MAKE uses the Higgsfield `image_background_remover` job or the native editing tool per [gpt-image.md](gpt-image.md), then inspects real alpha.
5. **Build one section at a time and hand over the assets.** Literal Codex prompt: *"lets build a website. i will provide the images and you just clone the rest of the website. so do NOT generate or build the asset in this image. focus on the components and details. here is the hero section. copy it. after that give me the dir of the folder where i need to put my images in  use react + nextjs / start local dev server afterwards"*. (MAKE drops the React/Next.js clause; see adaptations.) The agent reports the folder and exact filename; drop the cutouts there. Text, buttons and cards become code; only the boxed objects are images.
6. **Screenshot, fix, repeat per section.** Alignment or overlap issues: screenshot, hand to the agent, fix. Then *"Add animations when scrolling into a new section. Should feel smooth and clean"*, hover states, responsiveness.

MAKE adaptations: HTML/CSS/vanilla JS instead of his React/Next.js example; [motion-native.md](motion-native.md) for step 6; real business copy and truthful proof instead of the mockup's decorative numbers; the element inventory below records every boxed object with ID before extraction so nothing is silently dropped. Regenerated objects are derivatives and are compared against the mockup; brand logos, UI icons and real product photos come from originals, svgl/Iconify or [image-search.md](image-search.md), never from step 3; boxed icons in step 2 are inventoried, then sourced, not regenerated. Independent replication of the method exists in the thread (Yan, 22-second rebuild video).

**Extraction prompt, MAKE form:**

> Aus dem Sektionsbild [DATEI] die markierten Bildobjekte [ID-LISTE, ANZAHL] einzeln erzeugen. Jedes Objekt als eigenes Bild, Aussehen unverändert: gleiche Form, Material, Farbe, Perspektive und Licht. Keine neue Komposition, kein Text, keine UI-Elemente, kein Logo. Genau [ANZAHL] Ausgaben.

## 1. Establish the source and break it apart

Open the original local image at full useful resolution before editing. For live references capture the section at a known CSS viewport, and inspect the real page/DOM as well as pixels. Preserve the original unchanged with URL/author/date or user-file provenance. Record which aspect the user wants: composition, object, card behavior, typography, motion, or all of them.

Create an element inventory in the existing reference/asset record, using stable IDs. For each selected section include every important visible element, not just its background: headline, copy, navigation, buttons, foreground people/products, backdrop, logos, individual cards, map, pins, labels, shadows and decoration. Record position/bounding box or selector, overlap order, source/crop, intended role, interaction, and narrow-screen transformation.

Classify by the element's real job:

| Element | Preferred implementation | What must remain separate |
|---|---|---|
| Headline/body/labels | Semantic HTML with real text | Searchable words, reading order and responsive wrap |
| Button/navigation/form/card UI | HTML/CSS with vanilla JS where needed | Links, focus, controls, loading/error states |
| Person/product/complex illustration | Individual licensed raster asset with transparency when useful | Foreground silhouette and independent backdrop |
| Existing brand logo | Supplied/authorised original SVG or image | Exact identity, proportions and protected clear space |
| Simple vector/diagram/shape | Existing SVG or code-native geometry | Accessible text/content and meaningful geometry |
| Map/location card | Truthful static map or working map widget with accessible alternative | Accurate geography, markers, labels and interaction |
| Background/texture/shadow | CSS or separate suitable image | Independent scaling, stacking and legibility |

Do not turn the whole reference into a hero background with invisible clickable overlays. Reconstruct editable interface elements in code. A decorative screenshot of a product can remain an image when it is explicitly illustrative; it must not pretend to be a working interface.

## 2. Obtain and isolate assets

For generation and style matching use the integrated [GPT Image module](gpt-image.md): complete images and separate raster assets are different deliverables; content and style references are separate roles. Its [JSON spec](../assets/IMAGE-SPEC.template.json) records observed style, verified metadata and desired parameters without confusing them. The [library](image-library.md) supplies selected source-grounded examples and clearly labelled new ideas.

Prefer original user assets and authorised source files over screenshot crops. For logos, icons and reference photos, [image-search.md](image-search.md) governs: search, record source and date in the manifest, place directly without a rights query; a foreign photo becomes a GPT Image content reference when a new variant is wanted. When only a permitted composite exists, extract each needed raster object separately using the available supported image-editing tool. Read that tool's skill and inspect the input image first. In this Codex host, image edits use the native image-generation/editing tool unless the user explicitly requests another method. Use Higgsfield only when the user's requested route and active tool rules permit it. Never silently install a substitute or route media to a new paid provider.

For a cutout specify the element ID, source region and exact retention: preserve shape, pose, perspective, real product details and brand markings; remove only the background; output genuine alpha transparency, not a checkerboard printed into pixels. Ask for separate assets, not another flattened composition. Logos are reused/composited from their original files, never redrawn by a generator. Save any new derivative alongside its original, linked in the manifest. Distinguish a lossless crop, background removal and regenerated interpretation. Regeneration is not guaranteed pixel-identical extraction; compare identity-critical details and keep the original asset if fidelity is required.

Define the retained foreground group deliberately. In the inspected [building preview](../assets/video-reference-evidence/viktor-building-cutout-preview.png), the roof contour is isolated while a rectangular water base remains. That can support a layered scene; it is not evidence that every background pixel was removed. The image is a video frame, so its checkerboard cannot certify the underlying asset’s alpha.

Inspect each resulting file and its relevant edge region against both light and dark surfaces. Check hairs/edges, holes, semitransparency, halo, unwanted background remnants, perspective, clipping and a plausible contact shadow. Verify dimensions and alpha channel; an RGBA file alone does not prove a useful cutout. Record foreground bounds and `object-position`/mobile focal points. Mark synthetic imagery as illustrative when appropriate; it cannot prove real staff, premises or customer work.

If an extraction tool or lawful asset is missing, document the exact affected element. Continue with original approved assets or a functional code-native equivalent where that preserves intent. Do not certify the unavailable cutout as finished or replace a requested person/product image with arbitrary CSS blobs.

**Asset-edit prompt, MAKE synthesis:**

> Verwende [ORIGINALDATEI] und die markierte Region [ELEMENT-ID / REGION]. Stelle ausschliesslich [OBJEKT] frei. Erhalte Form, Pose, Perspektive, Materialdetails und vorhandene Markenmerkmale. Entferne den Hintergrund samt fremdem Text und Nachbarobjekten. Liefere das Objekt als einzelne Datei mit echtem Alphakanal, ausreichendem Rand und ohne eingemaltes Schachbrett. Erzeuge keine neue Website-Komposition und zeichne das Logo nicht neu. Wenn eine unveränderte Extraktion nicht möglich ist, kennzeichne eine Neugenerierung ausdrücklich. Die anschliessende Dateiprüfung entscheidet, ob Identität und Kanten ausreichend erhalten sind.

## 3. Compose the elements in HTML

Build section structure and text flow first. Give visual objects independent layers/containers and CSS variables for scale, offsets and stacking. Use Grid/Flexbox for layout and restrained absolute positioning for intentional overlays. Match relationships rather than copying desktop pixel coordinates onto mobile.

For each element record its source file or implementation selector, desktop placement, mobile placement, crop/scale limits, contrast and interactive states. Cards containing useful content remain individual semantic elements, even when their decoration is image-based. If several cards are windows into one continuous image (as in the inspected MotionSites/WellWorks demonstration), use a shared image coordinate system and preserve continuity at resize; independent `cover` crops are not equivalent. This is a source-specific option, not a universal card treatment. A map overlay receives a real address/list fallback and keyboard/touch behavior if interactive.

Use explicit filenames/element IDs when combining a motion reference and a subject image: state which supplies movement and which object must move. Avoid ambiguous “first/second image” references. For pinned or moving compositions name every member of the group, including foreground, backdrop, gradient and shadow, so they retain their relationship during scroll.

Create the still composition before choreography. Then assign a purpose, trigger, duration/easing, interruption and reduced-motion alternative to each moving element. Use CSS or vanilla animation APIs for ordinary sequences. Content and actions remain available without motion. Do not hide whole SEO pages behind scroll-triggered opacity.

## 4. Compare and close the loop

Capture the implemented section at matching reference dimensions plus real mobile widths, then inspect full context and relevant close-ups. Check dominant hierarchy, object scale, crop, overlaps, text baseline/wrapping, whitespace, contrast and depth. Test each real control independently; pixels do not prove behavior.

Update the existing element record with `implemented`, `verified` or a concrete blocker and paths to current screenshots. Re-capture affected views after a fix. Carry the selected element decisions into DESIGN.md under Imagery, Components, Layout and Motion; do not maintain a competing design contract.

Acceptance: every selected element is accounted for with a genuine asset or functioning code, the requested composition survives desktop/mobile, text is indexable, controls work, and evidence points to the current output. A screenshot alone is not an implementation.

## Reusable implementation prompt (MAKE synthesis)

> Inspect the supplied reference and list its individual elements before coding. Assign each element a stable ID and choose semantic HTML/CSS/SVG or a separate raster asset according to its job. Preserve original files. Extract only the licensed foreground objects that need independent placement; inspect real transparency and edges. Keep text, cards, navigation, buttons and forms as editable functioning code. Compose the section using HTML, custom CSS and vanilla JavaScript, with explicit desktop/mobile relationships and reduced-motion behavior. Implement every selected element, compare actual browser captures against the reference, correct concrete mismatches and record the final source/selector and evidence in DESIGN.md and the existing asset manifest.

Visual review detail from current Impeccable: do not approximate a genuinely organic photographic contour with arbitrary CSS polygons, or bury a selected raster under an almost opaque overlay. Use appropriate extracted imagery and inspect the resulting visible contribution; these are review questions, not claims that a detector ran. See [dependency evidence](dependencies.md).
