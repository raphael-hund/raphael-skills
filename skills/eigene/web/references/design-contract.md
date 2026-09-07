# DESIGN.md as an executable design contract

Read for a new direction, redesign, DESIGN.md generation or final reconciliation. The supplied OFF+BRAND sample establishes desired descriptive precision, not a universal palette, font or layout. [Refero Styles](https://styles.refero.design/) was directly inspected on 2026-09-06; its gallery links colours, type, spacing, components and AI-readable design documents. Reference extraction is evidence to evaluate, not automatic design authority.

## Three sources must agree

1. **Approved intent:** the project DESIGN.md records why the system fits the audience and brand.
2. **Executable values:** a single declared token file plus component implementations govern actual values.
3. **Rendered evidence:** browser measurements, screenshots, font loading and states establish what was delivered.

Seed the document before implementation. Reconcile it at delivery. Resolve accidental code drift; record deliberate adaptations with reasons. Do not make the final document silently bless every implementation mistake. Keep a reproducible build/commit identifier and material revision notes.

For existing-site extraction, apply the [UI Skills evidence procedure](ui-skills.md#extract-designmd-from-evidence): label observed, inferred, proposed and approved decisions in the reference ledger. Describe the existing system before prescribing a redesign. Use primitive → semantic → component token layers only where they express real reusable roles; equal current values do not prove two roles are interchangeable. Preserve source provenance through Figma/Paper imports and component-library adaptation.

Use the eight top-level sections in `assets/DESIGN.template.md`: Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts. This resembles Impeccable's portable document structure; it does not claim schema compatibility. If the installed Impeccable documenter requires normative YAML or a sidecar, read its actual schema and validate it. Do not invent a machine-readable namespace.

## Values, reasons and explicit rule references

Raphael requested the workflow in [George Nurijanian's DESIGN.md article](https://x.com/nurijanian/status/2048327986777350425), published 2026-04-26 and read on 2026-09-07. Its useful addition is **active use of the contract**: read it before a UI task, name the rules that justify the change, then show where the result follows, extends or violates them. The primary [Google DESIGN.md format](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md), checked on 2026-09-07, explicitly makes YAML frontmatter optional; the article's two-layer description must not become a false universal format requirement.

For a new dossier, use the template's machine-readable token block when actual values are available, followed by human-readable roles and reasons. Populate it from the declared token source; it is a derived snapshot unless the project deliberately makes DESIGN.md the executable source. Do not maintain competing values by hand. Preserve a sound existing prose-only dossier; add structured tokens when the assignment or a real consumer needs them. Unknown values stay unknown rather than becoming plausible numbers. Omit unavailable/inapplicable groups with a reason; retain required research gaps in prose. A YAML parse does not certify the consumer schema or the rendered UI. Check the actual alpha/current consumer format before claiming compatibility; keep unsupported fluid expressions or project extensions in explicit prose rather than forcing them into a restricted dimension field.

At the start of a substantial design task, record the governed surface, mode (**exploration**, **production** or **review only**), its best existing/reference screen and any useful warning example. Link actual route/frame, viewport/state and the concrete behavior to preserve or avoid. A warning example can be a known defect in the current product; do not invent one or reject a whole source because of one flaw. Reuse this context in later sessions instead of reopening settled visual direction.

### Before changing UI

1. Read the current DESIGN.md and the affected local component/token sources. Use a heading anchor and a short rule paraphrase, or an existing stable rule ID, to identify the applicable color/CTA, typography, layout, component/state, motion and responsive decisions. There is no need to number every line of the document.
2. Briefly connect the proposed change to those rules in the existing plan/task record. Name actual component reuse and any proposed new pattern. For a small edit, one concise source-linked sentence is enough; no new report or approval ceremony.
3. If a requested change conflicts with DESIGN.md, state the conflict and its impact before editing. An explicit new user decision governs: implement within that authorization and reconcile the affected contract. Do not silently override the user with the older file or rewrite the file to conceal accidental drift.
4. If the file is silent, label the gap. Infer a routine local choice from established components and the approved direction, document its scope and continue. Ask only when an unresolved consequential product/brand decision cannot be made from the brief and existing authorization; continue independent work. Silence is neither permission to invent a new identity nor a universal reason to stop.

### After implementation and during review

Use the existing QA/reconciliation record, not a parallel scorecard. For affected components/pages link **DESIGN.md rule → actual file/selector → current viewport/state evidence → result**. Record followed rules compactly and give details for mismatches, missing states, accessibility/responsive risks and newly introduced patterns. A cited heading alone is not evidence of compliance. Distinguish source-consistent, rendered-and-verified, proposed exception and unverified; never call a pending browser check passed.

Classify an unplanned pattern as an accidental mismatch to fix, an intentional local exception with scope/reason, or a reusable system extension with rationale. Check the relevant button, card, input, typography, spacing and mobile behavior together so locally plausible screens still belong to the same product. Human design/product feedback supplies decisions when present; independent agent critique supplies additional evidence, not a fabricated human sign-off. An explicitly requested human review remains pending until it occurs; do not invent one as a requirement for every authorized build.

### When the contract evolves

Review the contract when a component pattern recurs, a designer/user changes direction, the same critique or agent mistake keeps returning, a feature needs different density, or mobile needs a distinct pattern. Recurrence is a signal to evaluate reuse, not a mandatory “exactly twice” abstraction threshold. Decide whether to repair the implementation, preserve a bounded exception or extend the shared system. Record the decision, affected consumers, token/source revision and required retests. Do not promote a personal preference or one-off experiment into a global rule without a reason. On the next relevant task, read the updated contract.

The article's one-accent examples, 15–16px body sizes and light-shadow preference illustrate specificity; they do not replace the project's design direction. Its statement that Figma is invisible to agents does not override an actual connected Figma tool. [getdesign.md](https://getdesign.md/) is an additional discovery collection; its public homepage was read, not every paid/private dossier. Its source values and compatibility claims need the same evidence checks as Refero exports. The linked PM OS sale/setup and migration instructions are outside this Web-skill update and are not imported.

## Required detail without one universal aesthetic

The dossier must resolve the following 24 topics. Group them under the eight root sections and link deeper notes when needed; do not create 24 empty headings.

| # | Topic | Decision to record |
|---|---|---|
| 1 | Business/audience | Visitor task and offer that the design supports |
| 2 | Brand signals | Concrete recognisable traits beyond 'premium' |
| 3 | Reference evidence | Exact page, viewport, observed principle and confidence |
| 4 | Direction choice | Alternatives considered, choice and rejected elements |
| 5 | Colour roles | Semantic tokens, exact values, usage and supported themes |
| 6 | Contrast | Real foreground/background/state pairs and verification |
| 7 | Font identity | Licensed source, files, actual weights and fallbacks |
| 8 | Type hierarchy | Fluid/breakpoint sizes, leading, tracking, reading width |
| 9 | Content hierarchy | Semantic headings versus their visual styling |
| 10 | Grid | Containers, gutters, columns and optical exceptions |
| 11 | Spacing | Named rhythm/density roles, valid CSS values |
| 12 | Responsive composition | What changes, why, at exact breakpoints |
| 13 | Imagery | Subjects, authenticity, colour, light, focal points, crops |
| 14 | Asset delivery | Source/rights, dimensions, formats, loading and alt purpose |
| 15 | Surface/depth | Borders, shadows, layers and overlay stacking |
| 16 | Shape language | Radius/stroke/icon family and explicit exceptions |
| 17 | Navigation | Desktop/mobile structure, focus, sticky and disclosure rules |
| 18 | Components | Source files, variants and semantic elements |
| 19 | Interaction states | Default, focus, active, disabled, pending, success, failure |
| 20 | Motion | Purpose, triggers, easing, sequencing and interruption |
| 21 | Reduced motion | Fully usable alternate layouts with all content retained |
| 22 | Page archetypes | Homepage, service, hub, useful local, proof and editorial layouts |
| 23 | Conversion/trust | Real destinations, evidence placement and content clarity |
| 24 | Reconciliation | Actual implementation evidence, revisions and unresolved issues |

Choose only themes, page families and interaction types the project needs. Explain a justified omission. Use full-page rhythm and content hierarchy rather than mechanically alternating coloured sections or using a fixed section count. Keep UI implementation notes in project documentation, not in the visitor-facing product.

## Linked notes

Use `docs/design/references.md` for source URL, author where verified, access date, capture path/viewport, observed principle, adaptation, rejection, rights and confidence. Distinguish direct observation, supplied reference, indexed excerpt and inference.

Use `docs/design/imagery.md` when the asset set needs coordination. Record file/source, factual or illustrative role, rights, aspect ratio, focal point at each layout and rejected crops. For reference-led compositions use [image-to-code.md](image-to-code.md): identify every selected element, its code or individual asset, extraction/alpha evidence, selector and desktop/mobile placement. Authenticity and image congruency matter more than mandating any generator. Reuse a documentary image only when it communicates the same truthful claim; do not recolour logos contrary to supplied rules.

Use `docs/design/motion.md` for nontrivial interactions. Each motion has purpose, target, trigger, timing/easing, sequencing, cleanup and reduced-motion behaviour. Content remains accessible without animation. A still screenshot cannot prove a transition works.

Use page briefs for the exact content/section jobs per route. A homepage reference does not define a service-detail page. Preserve a common design language while matching the different reading and decision tasks.

## Avoid extraction errors found in the supplied example

- `76-119px` is not an executable CSS length range. Choose breakpoint values or an intentional `clamp()` expression.
- Keep solid colour tokens separate from gradient/image tokens. `rgb(250,203,14)` corresponds to `#facb0e`, not `#facb00`.
- Remove unexplained fractional radii that conflict with named component radii, or assign an actual role and rationale.
- A declared base spacing unit does not explain every measured value. Mark optical exceptions; do not turn screenshot measurement noise into a design system.
- Resolve contradictory claims such as 'no fills' alongside filled hover states, or 'sole colour event' alongside coloured logos.
- A custom reference font does not establish a licence. Keep a tested fallback even when the brand face is preferred.
- Do not copy 103px headlines, 0.8 leading or a 600px object into narrow layouts without checking actual copy, diacritics, zoom and font failure.
- Tailwind v4's coupled typography defaults use e.g. `--text-display--line-height`; adjacent `--leading-display` does not automatically attach to `text-display`. Verify generated CSS with the installed version. [Tailwind font-size docs](https://tailwindcss.com/docs/font-size).

## Current Refero/Mobbin source check

On 06.09.2026, Refero MCP tools existed but returned `NO_SUBSCRIPTION`; no successful `get_style` is claimed. The complete public [Hyer style](https://styles.refero.design/style/f61cf515-ccd5-4494-bdd1-be9fe4d7258c) and [OFF+BRAND style](https://styles.refero.design/style/6b667ffc-5158-4000-9252-3a107d5161ee) remained accessible, including CSS examples. Mobbin returned five inspected section images; these establish visible layouts, not source tokens or behavior.

The live [Hyer](https://www.flyhyer.com/) comparison found no custom-property declarations in its four retrieved stylesheets, while the exported style invents useful alias names. Label those as new project names. Actual buttons were dark; the warm accent belonged to an offer card. The H1 changed from absolute placement beside the motif to relative placement below it on narrow samples. A sampled viewport is not a verified breakpoint. The hero used canvas, so an `img`-only inventory would miss its main medium. [Desktop evidence](../assets/gallery-reference-evidence/hyer-desktop.png) and [mobile evidence](../assets/gallery-reference-evidence/hyer-mobile.png) retain visible consent overlays; neither is an unobstructed final-state approval.

A local CSS consumption check reproduced the unitless-leading error: `line-height:150` multiplies font size, whereas `150px` is a length. Validate computed values at the actual selector. OFF+BRAND's original tokens and loaded face also differ from export aliases; desktop remained behind a loader. Preserve those limits instead of treating generated DESIGN.md prose as verified implementation.

## Final verification

Sample each semantic token in a real component and record its computed property. Check actual font family/weight, container widths, responsive changes, image crop and all meaningful interaction states. Review every page independently at desktop and mobile widths. Record approved exceptions. Deliver a reconciled document whose statements match both intent and implementation, with remaining limitations plainly identified.
