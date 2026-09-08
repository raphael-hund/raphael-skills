---
version: alpha
name: "[Brand]"
description: "[Specific product surface and visual direction]"
colors: {}
typography: {}
rounded: {}
spacing: {}
components: {}
---

# [Brand] — Design and implementation contract

Status: [seed | approved for implementation | reconciled]
Updated: [ISO date]
Implementation snapshot: [commit or reproducible build]
Design owner: [role]
Executable token source: [relative file]
Component source: [relative directory]
Business truth: [PRODUCT.md or equivalent]
Route contract: [SEO-PAGE-MAP.json or equivalent]
Reference ledger: [docs/design/references.md; source URLs/IDs, access date and extraction method]
QA evidence: [docs/qa/ index]

This is a template. Replace brackets with researched project decisions. Populate the optional YAML groups with verified values from the named token source and compatible component references; do not deliver empty groups as a completed token system. Omit unavailable/inapplicable groups with an explicit reason, retain open research gaps in prose, and remove the token block when preserving a justified prose-only contract. Check the actual consumer schema before claiming alpha-format compatibility. At delivery, preserve genuine unresolved issues with owners; never disguise unknowns as verified facts. Use one token source, not independently maintained duplicate CSS and prose definitions.

## Overview

[One specific paragraph explaining atmosphere, hierarchy, image language and interaction character in relation to the real audience and offer.]

- Primary audience and visitor task: [...]
- Governed surfaces and mode: [routes/components; exploration | production | review only]
- Taste anchor: [actual screen/route/frame, viewport/state and specific traits to preserve]
- Warning example, when useful: [actual example, observed defect and boundary to avoid; otherwise state none established]
- Recognisable brand signals: [...]
- Selected direction and reason: [...]
- Supported theme(s): [...]
- Reference principles adopted and adapted: [IDs; primary source owns these traits, secondary source contributes only this detail]
- Decision evidence: [observed | inferred | proposed | approved, with source/selector and any material uncertainty in the reference ledger]
- Alternatives rejected and why: [...]
- Taste choices, if used: DESIGN_VARIANCE [...], MOTION_INTENSITY [...], VISUAL_DENSITY [...], with contextual reasons.
- Boundaries: [brand identity, languages, content, devices, licensed assets]

The approved contract governs intent, the named token source governs executable values, and browser evidence proves the delivered state. Resolve conflicts explicitly.

For each adopted reference decision, record its source role, intended adaptation and evidence kind (style guidance, inspected image, live DOM/CSS, or project decision) in the existing reference ledger. Full style data can contradict its own examples or the current site. Record which claim wins and why; search previews and generated token names are not proof of the source implementation. Do not add a separate research document if the ledger already holds this information.

## Colors

| Semantic role | Token | Exact value | Use and restrictions | Contrast evidence |
|---|---|---|---|---|
| Canvas / text | [...] | [...] | [...] | [...] |
| Surface / border | [...] | [...] | [...] | [...] |
| Action / focus | [...] | [...] | [...] | [...] |
| Feedback, if used | [...] | [...] | [...] | [...] |

Values above are snapshots from the canonical token source. Distinguish original CSS variables from new project aliases; map each alias to its semantic role and actual selector.
Gradients and overlays: [separate tokens, purpose, exact definition].
Authentic logo exceptions: [...]. Theme transitions, if supported: [...].

## Typography

| Role | Family/file/weight | Valid size rule | Leading | Tracking | Reading measure |
|---|---|---|---|---|---|
| Display / H1 | [...] | [...] | [...] | [...] | [...] |
| H2 / H3 | [...] | [...] | [...] | [...] | [...] |
| Body / support | [...] | [...] | [...] | [...] | [...] |
| UI / data | [...] | [...] | [...] | [...] | [...] |

Font source/rights: [...]. Delivered weights: [...]. Fallbacks and loading: [...].
Heading semantics: [...]. Responsive wrapping, language and long-content rules: [...].
Avoid forced line breaks that fail with real copy or fallback fonts.
State whether leading is a unitless ratio or a CSS length. Validate the computed line-height on the consuming element; a unitless value multiplies its font size. Declared font-family and loaded font files do not by themselves prove which face rendered the text.

## Layout

| Context | Exact breakpoint | Container/gutter | Columns/gaps | Composition change |
|---|---|---|---|---|
| Narrow | [...] | [...] | [...] | [...] |
| Intermediate | [...] | [...] | [...] | [...] |
| Wide | [...] | [...] | [...] | [...] |

Spacing roles and canonical source: [...]. Optical exceptions: [...].
Page rhythm and reading widths: [...]. Overflow/zoom behaviour: [...].
Navigation/footer hierarchy and mobile transitions: [...]. Distinguish observed viewport samples from verified CSS breakpoints; record which elements reflow, reorder, crop, hide or change positioning. Test adjacent widths only when a specific breakpoint claim needs confirmation.

### Page families

| Archetype | Visitor/search job | Distinct content/proof | Layout/reading decision | Primary action |
|---|---|---|---|---|
| Homepage | [...] | [...] | [...] | [...] |
| Service hub/detail | [...] | [...] | [...] | [...] |
| Useful local page, when justified | [...] | [...] | [...] | [...] |
| Case study/guide, when justified | [...] | [...] | [...] | [...] |
| About/contact | [...] | [...] | [...] | [...] |

Use the actual route map for complete coverage, metadata and links. Record why absent families are unnecessary. Every approved SEO subpage must be implemented and reviewed.

### Imagery and motion

Image direction: [subject, lighting, palette, authenticity, crops]. Asset manifest: [...].
For new media, record complete image versus individual asset, photographic/illustrative/material family, content-reference IDs and style-reference IDs, exact retained features, actual provider/model, prompt/spec and output files. Keep observed traits, EXIF-backed values, inferences and desired camera settings separate. Use the existing manifest with [IMAGE-SPEC.template.json](IMAGE-SPEC.template.json) where helpful. Alpha bounds, trim offsets and static/video/scroll handoff belong to the same element record.
Identify whether the reference media is an image, CSS background, SVG, video or canvas/WebGL before choosing its implementation. Record any intentional static substitute and what visual or interaction behavior it omits; a rendered screenshot is not an extracted foreground asset.

Element-to-code inventory (for selected image/reference compositions):

| Element ID | Source/crop/rights | HTML/CSS/SVG, separate raster or justified runtime media | File/selector | Desktop/mobile placement and overlap order | Alpha/edge or state check | Current evidence |
|---|---|---|---|---|---|---|
| [...] | [...] | [...] | [...] | [...] | [...] | [...] |

Keep text and interactive cards/controls in the DOM; preserve independent foreground/background layers when the chosen composition needs them.
Motion: [purpose, target, trigger, timing/easing, cleanup, device behaviour].
Reduced motion: [complete usable alternate state retaining all content].
Link extended notes only where the complexity requires them.

## Elevation & Depth

| Layer/effect | Token/component | Exact value | Usage and stacking rules |
|---|---|---|---|
| [...] | [...] | [...] | [...] |

[Explain surface separation, borders, overlays and shadow strategy. A shadowless design is a project decision, not a universal rule.]

## Shapes

| Element | Radius/stroke/geometry | Token | Justified exceptions |
|---|---|---|---|
| [...] | [...] | [...] | [...] |

Icons: [family/assets, stroke, size, accessible meaning].
Decorative shapes: [purpose, limits and responsive behaviour].

## Components

| Component | Source | Semantic element | Variants | States/keyboard | Evidence |
|---|---|---|---|---|---|
| Main action | [...] | [...] | [...] | [...] | [...] |
| Navigation | [...] | [...] | [...] | [...] | [...] |
| Form/field | [...] | [...] | [...] | [...] | [...] |
| Other actual components | [...] | [...] | [...] | [...] | [...] |

Specify applicable default, hover, focus-visible, active, disabled, loading, success and failure states. Explain inapplicable states. Include actual hit area, accessible name, touch behaviour and mobile transformation. Define real destinations in the functional contract; never imply message delivery from a toast alone.

For reusable components, record container-driven reflow versus page-level viewport changes; important long/translated labels, empty/error states and rapid interaction reversals; and the UI Skills tactics selected to address actual risks. Match primitive, semantic and component token roles to the existing source instead of duplicating equal-looking values indiscriminately.

Canonical examples and source paths: [...]. Repeated composition rules: [...].
For selected library components: [registry namespace and item (e.g. `@magicui/marquee`, `@21st/<author>/<slug>`), version or commit, licence, local file, server or client component and reason, primitive/provider/portal boundaries, token mapping, dependencies added and removed, actual JS/CSS requests and raw/gzip size, state evidence]. Preserve existing customized components; use one implementation per component job. A hand-built component records why no registry item fit.

## Do's and Don'ts

Do: [specific rules protecting this brand and its visitor tasks].
Avoid: [concrete demonstrated failure modes].
Exceptions: [rule, scope, reason and owner].

Do not shorten useful content merely to obey a generic SEO word count or visual formula. Do not invent proof, licences, reviews, people or results. Do not turn taste preferences into search-ranking claims.

### Reconciliation

Before editing UI, cite the relevant section/rule and connect it to the planned change in the existing task record. Name any new pattern or uncovered decision. Reuse established patterns for routine gaps; escalate only an unresolved consequential choice. Explicit user changes can revise the contract; accidental drift must be fixed rather than silently adopted.

| DESIGN.md section/rule and affected component | Expected role/value | Actual file/selector and computed value | Current evidence: viewport/state, or explicitly unverified | Source match, verified match, scoped exception, system extension or unresolved mismatch |
|---|---|---|---|---|
| [...] | [...] | [...] | [...] | [...] |

Evidence readiness: [loaded fonts/media, consent/loader state, animation settled or sampled phase, and whether inspected visually]. A loading screen, obstructing overlay or animation frame does not establish the final composition. Keep the capture and its limit; recapture only the affected state when needed.

Open issues: [specific issue, owner, impact; none only when verified].
Material revisions: [decision, reason, changed files, retest evidence].

Contract-update decisions: [recurring pattern/critique, changed direction, density or mobile need → fix implementation | retain local exception | extend shared rule; scope, rationale, affected consumers and retest].
