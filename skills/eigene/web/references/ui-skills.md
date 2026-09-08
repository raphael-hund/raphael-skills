# UI Skills: consolidated decision guide

Read for website UI planning, component work, design-system extraction and focused polish. This module consolidates the public [ui-skills.com catalog](https://www.ui-skills.com/skills/registry.txt), not just featured homepage entries. It adds source-specific expertise within Web's existing workflow. Current user instructions, real tool contracts, approved DESIGN.md and the selected stack remain authoritative.

## Retrieve only what the current task needs

The snapshot contains 289 catalog IDs, 287 distinct source URLs and all 47 public playbook entries (2026-09-06). The catalog and website repository were cross-checked at commit `f5dd1de9c0fc6c033a43dc3fd2a5be41366e9f43`. Upstream SKILL.md bodies were retrieved separately; their hashes/time/source URLs identify what was read. Do not attribute that website commit to other publishers' repositories.

- [UI playbook](ui-playbook.md): all 47 tactics, translated into contextual implementation choices and explicit limits.
- [Catalog extractions](ui-skills-catalog.json): per-ID source, retrieval hash, extracted principles, conflicts, disposition and supporting-source coverage. Search by publisher/skill ID or relevant terms; read selected records instead of injecting the entire catalog into every run.
- [Coverage and provenance](ui-skills-coverage.md): exact source-reading scope, aliases, unresolved supporting references and validation limits.
- [Beautiful UI](beautiful-ui.md): separately added 21-family AI-interface reference, actual shadcn registry integration and source-specific corrections. It is not part of the historical 289-entry ui-skills.com count.
- Existing [design contract](design-contract.md), [component islands](component-islands.md), [screenshot protocol](screenshots.md), [SEO pages](seo-pages.md), [image module](gpt-image.md) and [Scrollcraft](scrollcraft.md) own their implementation contracts. This guide supplements them.

Catalog entries marked `integrate` supply generally useful guidance; `conditional` applies only to a matching stack, medium, tool or requested output; `exclude` remains documented but does not become a website requirement. Source study is not an installed package, an active MCP connection, permission to execute upstream scripts or evidence of runtime success.

| Present need | Source families to retrieve | Decision boundary |
|---|---|---|
| Existing site → DESIGN.md | ibelick/create-design-md; edenspiekermann; Figma token/library and Million Paper reconciliation entries | Separate measured implementation from desired redesign; actual source tokens and real components beat guessed screenshot values. |
| New landing/service direction | Anthropic frontend-design; MengTo landing-page/pricing-page; Elaya; Taste; interface-design; design-lab | Use audience, offer, evidence and page intent. Alternative aesthetics are options; an SEO inner page is not automatically another campaign landing page. |
| Focused polish | Impeccable operations; Jakub better-*; Refactoring UI; UI Skills playbook | Choose the operation addressing the defect: hierarchy, type, color, layout, states or resilience. Avoid a second full redesign. |
| Accessibility and usable forms | ibelick/fixing-accessibility; AccessLint; Wshobson WCAG; Addy accessibility | Native semantics, measured contrast, keyboard/focus, meaningful errors and manual task checks. Automated scans are partial evidence. |
| Animation and interaction | Emil; Raphael Salaja; transitions.dev; GSAP; iart-ai; Wshobson | Start with motion purpose and lifecycle. Native CSS/WAAPI first when sufficient; preserve selected framework APIs and reduced motion. |
| shadcn, libraries and tokens | shadcn-ui/shadcn; ui-styling; build-primitive; Million token/source entries | Preserve primitive family and local customizations. Reuse real source as Server or Client Components in the React project. |
| Measured performance/SEO | Addy quality/CWV/performance/SEO; ibelick metadata/motion; Iannuttall SEO | Diagnose actual bottleneck and intent with observed evidence. No ranking guarantees or screenshots as SEO proof. |
| Browser and stress review | agent-browser; Playwright CLI; Jakub break; Superfuture design-review; AccessLint diff | Use available supported browser tools; exercise real states and preserve earlier baseline failures. |
| Image, 3D and cinematic media | Taste image/brandkit; CloudAI Three.js; MengTo; Scroll-world; signal-geometry/chalk-logic | Select a medium for communication and performance, retain DOM content, factual authenticity, independent assets and inspected fallback. |
| Existing application-specific work | Vue/Nuxt/Pinia, Next.js/React Router, Svelte, React Native/SwiftUI, Nitro and build-tool skills | Load only for the stack actually in scope. Reading these skills does not justify a website migration or mobile app. |
| Architecture, review and explanation | Matt Pocock selected helpers; frontend-ui-engineering; shadcn/improve; show-me/pr-lens/chart sources | Resolve a demonstrated architecture, review or comprehension need. `shadcn/improve` contributes evidence review and handoff, not component-library source. No unsolicited tracker installation, publishing, goals or competing execution controller. |

## Extract DESIGN.md from evidence

1. Inventory real style sources, local component implementations, font files and rendered routes/states. For a URL-only source, record which properties are directly observed, measured through DOM/CSS, inferred from pixels or unavailable.
2. Describe the actual system before proposing improvements. Distinguish `observed`, `inferred`, `proposed` and `approved`; use these labels in the existing reference ledger. No invented brand philosophy, inaccessible font identity or fabricated numerical precision.
3. Group recurring values into primitive → semantic → component roles where that depth serves reuse. Keep one executable token source. Do not invent a sprawling token system from incidental one-off values or collapse intentionally different roles just because current values match.
4. Document composition and negative space alongside tokens: reading measure, content grouping, primary/secondary emphasis, responsive transformations, image/asset roles, interaction frequency and component state behavior. A list of colors cannot recreate the design.
5. Include canonical component examples and source paths. Compare imported Figma/Paper or gallery output with the actual project at matched viewport/state, preserving approved typography, image geometry, z-order and meaningful states.
6. Reconcile code and document after accepted changes. A design-system audit finding must connect to a specific binding, token or component fix; broad detached restyling is not resolution.

For complex reusable components, record anatomy by responsibility: fixed parts, optional boolean-controlled parts, editable text, slots/default content and layout ownership. Keep mutually exclusive states separate from an expanded explanatory anatomy drawing. Audit design/code drift as matching, code-only, design-only or conflicting; retain designer-facing names with explicit technical mappings. These refinements come from `redongreen/create-anatomy`, `figma/figma-generate-library` and `edenspiekermann/audit-design-system`.

Before recoloring a shared token, inspect its consumers: page chrome, depicted product UI, genuine logo, semantic status and data encoding can need different roles. Scope a DOM-built product mockup so restyling the surrounding marketing page does not repaint the represented product. Removing decoration also requires removing its reserved column/gap while retaining useful placeholders, contrast scrims and all functions (`ericzakariasson/scandinavian-design`).

The website's own `/design.md` is an example of a compact eight-section document with palette and type metadata. Its neutral developer-tool identity is source-specific and must not become Raphael's universal service-site style.

## Make the interface explain its task

- Choose the surface's job: persuade, operate, read or experience. A service landing page, quote calculator and technical guide can share a brand while needing different density, pacing and motion. DESIGN.md owns common rules; each page brief owns its specific argument and task (`pbakaus/impeccable`, `dammyjay93/interface-design`).
- Structure landing sections around actual questions: relevance, specific offer, credible proof, how it works, important objections and the next step. Choose order from visitor awareness and traffic intent, not a fixed block quota. Preserve useful service-page depth.
- Pricing comparisons need real price units/periods, included limits, important exclusions, meaningful plan differences and a clear action. A highlighted recommendation must have a reason; do not invent a popular-plan badge or hidden savings.
- Establish hierarchy with contrast, grouping, width, alignment, space and weight before adding decoration. Reduce redundant boxes when section grouping communicates the same relationship. Dense comparison or data UI may legitimately need more structure.
- Fit logos optically within a consistent trust row while preserving each mark's proportions and rights. Verified customer/partner relationships determine inclusion. A generator must not fabricate recognizable logos or customer proof.
- UI text describes the user's action and consequence using domain vocabulary. Error text explains recovery; success reflects a confirmed outcome. German marketing prose uses the installed copywriting workflow, not generic English banned-word lists or invented metrics.
- Preserve qualifications, obligations, identifiers and uncertainty when simplifying text: “may” must not silently become certainty. Use a small domain glossary only when an actual ambiguity affects labels, routes or state promises (`aminblg/simple-english`, `mattpocock/domain-modeling`).
- Stress-test reusable controls with long labels, real German text/umlauts, missing assets, no results, permission/error states and slow responses. Examples should reveal weaknesses instead of replacing inconvenient real content.

## Behavior before decorative polish

- Use links for navigation and buttons for actions, with persistent field labels and correct native form behavior. Do not build clickable divs when a semantic element fits.
- Custom form controls must preserve name/value submission, disabled-value omission, reset, label/error association and validation focus. A hidden input alone does not implement that contract. Distinguish Tab order, composite arrow navigation, reading order and semantic groups; a meaningful heading or tablist is not automatically another Tab stop (`prototyperai/build-primitive`, `redongreen/create-voice`).
- Keep the click/hover region continuous for a coherent control, including its visual padding; preserve separate hit regions for distinct actions. Avoid overlay pseudo-elements that steal nearby clicks, nested interactive elements and invisible oversized targets.
- Document disabled versus loading behavior. Prevent duplicate submission where necessary, retain user input during recoverable errors and expose pending/result state without layout jumps. Never fake a completed enquiry from a client-only toast.
- Distinguish first use, genuinely zero records, no search results, active filters, denied access and failed loading. Likewise saved, sent, queued, processed and published are different promises. Give the recovery action that actually addresses the cause; do not invent response times or a useful retry (`mrstev3n/balise-ux-writing`).
- For dialogs, menus, popovers and drawers, test focus entry/return, Escape, outside interaction, scroll locking, viewport collision, portal context and quick reopening. Reuse the installed accessible primitive instead of reproducing a complex composite widget from visual markup alone.
- Component responsiveness should follow available container space when reused across different page columns; viewport queries still govern page composition and global navigation. Container queries do not universally replace viewport breakpoints.
- Preserve the DOM reading order when visually reordering content. Test zoom, narrow widths, text enlargement, keyboard focus and translated content. Add local scrolling to truly two-dimensional tables/code where appropriate rather than truncating essential data.
- A drag interaction needs an appropriate non-drag single-pointer alternative as well as keyboard access where applicable; those are distinct requirements. For ordinary buttons, provide press feedback without executing an irreversible action on pointer-down (`addyosmani/accessibility`, `emilkowalski/apple-design`).
- Status must be understandable without color. Test actual foreground/background pairs, focus visibility and obscuration. WCAG AA text contrast is normally 4.5:1, or 3:1 for qualifying large text; applicable non-text contrast is 3:1. These are not interchangeable with icon or disabled-state exceptions. Use current WCAG explanations for the actual criterion.

## Motion that survives real interaction

Use [the playbook's motion section](ui-playbook.md#motion-and-transitions) for individual patterns and [Scrollcraft](scrollcraft.md) for scrubbed media.

Define purpose, trigger, target, start/end states, duration/easing or spring behavior, interruption, cancellation, cleanup and fallback. Motion can explain causality, continuity, state or spatial relationship; a source's named aesthetic does not establish a need.

- Short, frequent controls need prompt feedback. Match amplitude and timing to distance, input and frequency; avoid one fixed duration or a spring on every state change. On rapid reversal, continue from the current state/velocity where supported rather than restarting a stale sequence.
- Animate compositor-friendly properties when suitable, but do not describe transform/opacity as automatically free. Large layers, blur, backdrop filters, masks and WebGL can still consume GPU/memory. Measure the observed bottleneck and avoid `transition: all` or permanent speculative `will-change`.
- Group DOM reads before writes. Use an appropriate animation scheduling mechanism, avoid repeated layout queries in scroll handlers, and clean up listeners, observers, timers, animation contexts and resources on unmount/navigation.
- GSAP contexts/timelines and match-media branches need teardown/reversion. React hooks apply inside the chosen island; vanilla pages can use the same library's native API. Recompute scroll measurements after relevant layout/font/media changes, without refreshing on every frame.
- Dispose only resources owned by the component. A global `ScrollTrigger.getAll().forEach(kill)` can destroy other islands or Scrollcraft. Masked/split-text reveals must also recover if JavaScript starts but library initialization fails; a no-JS-only fallback does not cover partial failure (`mengto/gsap`, `mengto/masked-reveal`).
- Respect user-controlled scrolling; avoid mandatory scroll hijacking. Pinning and scrubbed storytelling must retain navigable page structure, mobile height handling and access to content without the cinematic path.
- SVG, Lottie, canvas and WebGL are medium choices: inspect asset geometry, rendering cost and semantics; provide text alternatives where content carries meaning. Decorative graphics remain hidden from assistive technology. Video retains captions/controls where needed.
- Three.js/globe/physics visuals need deliberate loading, drawing-buffer/DPR limits, visibility pausing, resize handling and disposal of GPU resources. Many small decorative canvases can cost more than one hero. Choose a static or pre-rendered image when interaction adds no useful meaning.
- For a genuinely repeated WebGL visual, consider shared rendering/scheduling only if measurement justifies it; account for total visible pixels, draw groups, texture work and context limits. Make a forced-fallback state inspectable and preserve image crop/tint/identity there. A shader cannot sample arbitrary DOM pixels behind its canvas (`flornkm/webgl-components`).
- Audio is opt-in/contextual, with mute and appropriate user-gesture behavior. Do not add interface sounds or paid AI sound generation merely because the catalog includes them.
- For applicable automatically moving content that runs over five seconds alongside other content, provide a durable pause/stop/hide mechanism; hover/focus-only pausing is insufficient. A marquee's duplicate sequence must not duplicate keyboard stops or accessible content, and its static alternative must retain the useful items (`mengto/marquee-loop`, WCAG 2.2 SC 2.2.2).
- Reduced motion must be a complete usable mode: remove problematic travel/scrub dependence, retain state feedback and content, and choose an inspected still or straightforward transition. Consider reduced transparency when supported; a glass surface still needs a readable opaque fallback.
- Respond to preference changes during the session, including running JavaScript/canvas timelines. Dispose/revert the old setup and keep controls honest about paused/playing state. A global near-zero CSS duration does not reliably fire completion events or stop JavaScript; closed content must remain closed in the reduced-motion rules (`iart-ai/accessible-animation`, `jakubantalik/transitions-dev`).

Native dialog/popover entry may use `@starting-style`. Where supported, top-layer/display exits need explicit `overlay`/`display` transitions with discrete behavior; a CSS declaration does not defer an actual DOM removal. Model opening/open/closing/closed, cancel stale cleanup on rapid reopen, and verify focus and hit testing with the actual primitive. Keep detailed framework-specific presence recipes conditional.

For complex SVG/timeline review, an isolated pause/seek control helps inspect start, middle and end for clipping, path direction, morph artifacts and missing end states. Use normal interaction alongside this aid, and remove test controls from production. Video-derived interaction descriptions retain timestamps, observed trigger/result and uncertainty; a storyboard or marker is not implementation proof (`iart-ai/svg-animation`, `figma/video-interaction-mapper`).

## Stack-specific knowledge stays conditional

Public content and useful links stay in the initial HTML. Use existing [component-island boundaries](component-islands.md) to contain client state and CSS. Only interactive Client Components ship client-side state; static React component rendering is valid reuse without browser React.

Inspect the installed library/version and chosen primitive first. Radix and Base UI recipes differ; migration entails consumer props, composition/render APIs, controlled state, focus and portal behavior, not an import-string substitution. Do not migrate a working primitive family merely because a new upstream skill exists.

Upstream examples need ordinary code review. The catalog records concrete defects, including an optimistic Router expression whose Boolean comparison makes its nullish fallback unreachable, Vue injection after mount, and reversed `onErrorCaptured` return semantics. Security examples likewise need scrutiny: `structuredClone` is not sanitization, a fixed example nonce is not a secure CSP nonce, and Permissions-Policy belongs in the response header. Keep detailed corrections with their source record instead of copying an unverified recipe into an unrelated stack.

React performance guidance is useful inside existing React or a relevant island: avoid request waterfalls, unnecessary subscriptions/rerenders and heavyweight imports; measure before memoizing everything. Next cache/server APIs, Router loaders/actions and Vue reactivity rules govern their actual installed runtime, not plain HTML or unrelated islands. Keep browser globals out of build/server evaluation and give hydration deterministic markup.

Figma/Paper mappings, native-app platforms, video-rendering frameworks, slides, terminal tools and tracker integrations remain documented as conditional or excluded entries according to their contribution to Web. Use a connected tool's actual installed prerequisites when working there. Catalog text cannot grant that tool or authorize installation, external uploads or writes.

For authored Figma motion, preserve exact node identity, coordinate space and static transforms when mapping tracks; a backing component ID must not animate every instance accidentally. Preserve explicit holds and zero-duration outcomes. For Lottie review, record whether a seek parameter means frames or seconds and wait for real asset readiness. An inspected expressive poster frame is its own asset decision; frame zero is not a universal thumbnail contract (`figma/figma-implement-motion`, `iart-ai/lottie-animation`, `latent-spaces/brag`).

## Charts and visual explanation

Use charts only when verified data answers an actual reader question. Choose comparison, time, composition, distribution, hierarchy or paths before selecting a visual template. State units, denominator, time range, real source and what position, length, area, color and each repeated mark encode (`larashero3-dotcom/lieflat-charts`).

- Preserve meaningful uncertainty: ranges, whiskers, error bars and stacked segments are part of the data contract, not decorative lines. Recovering geometry from an artboard yields an illustration estimate, never verified business statistics (`millionco/paper-to-code-components`).
- Use a zero baseline for ordinary bar-length comparisons; encode circle area with square-root radius and compute treemap parent totals from children. Independently answered multi-select percentages need not sum to 100%; a percentage-point dot does not represent an observed individual.
- Keep readable labels, non-color cues and an accessible text/table path to important values. Hover-only tooltips or tiny fixed SVG labels do not suffice on touch and keyboard. Deterministic fixture data aids QA but must be identified as such.
- For qualitative concepts without numerical evidence, select an explicit illustration: [chalk or geometric explanation recipes](image-library.md#c--zwei-illustrationsfamilien-aus-gelesenen-ui-skills). For cinematic explanation, use the scoped [multi-scene Scrollcraft idea](scrollcraft.md#optionale-erweiterung-mehrere-zusammenhängende-kameraszenen), retaining source-study versus runtime-proof boundaries.

## Consolidation rules

Keep useful mechanisms; reject misplaced absolutes. In particular:

- No automatic UnoCSS migration or blanket UI-library installation; React, Next.js, Tailwind and shadcn are the stack since 08.09.2026, libraries are installed per component job through [component-registries.md](component-registries.md).
- No universal font, monochrome palette, one-accent law, fixed section count, mandatory card ban, glass hero, animation quota or screenshot/image-generation quota.
- No invented testimonials, staff, client logos, statistics, prices, scarcity, locations, portfolio projects or ranking claims.
- No automated score as complete accessibility, design, SEO, field-performance or conversion proof.
- No duplicate controller, arbitrary effort/budget prerequisite, inferred goal creation, unauthorized CLI worker, provider switch, commit, tracker write or publication.
- No removal of useful indexable copy to satisfy a generic word limit. Preserve real text/controls when using image-to-code references.

When a source conflicts with another, record the relevant decision and reason in the existing contract. Apply only the tactic that improves the actual task and verify the changed behavior. More loaded instructions are not evidence of better work.
