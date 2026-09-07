# Transferable practices from website builders

Use this reference when deciding how to organise a substantial website build or redesign. The methods below adapt publicly documented Lovable, Base44 and Replit workflows to MAKE. They do not reproduce private prompts, training data, model routing or internal architecture. Keep MAKE's lead, project contract and host capabilities authoritative; do not introduce another orchestrator or require a platform account.

## Resolve direction before expanding implementation

Lovable separates planning from execution and documents lightweight rendered direction studies. Base44 separates discussion, building and visual editing. Transfer this into a short, concrete decision record: visitor task, business evidence, section responsibilities, design direction, affected routes and acceptance criteria. Proceed with authorised implementation once those decisions are sufficiently clear. A product's separate planning interface does not create an additional permission requirement here. [Lovable Plan mode](https://docs.lovable.dev/features/plan-mode), [Base44 chat modes](https://docs.base44.com/Building-your-app/AI-chat-modes).

When a new brand direction remains unresolved, render a few genuinely different compositions with comparable content. Compare typography, image treatment, hierarchy and mobile transformation before investing in all pages. Lovable's documented direction previews are studies, potentially containing placeholders; they are not production deliverables. Replace provisional copy and imagery before release. When the brief already provides a strong approved identity, implement it without compulsory alternative designs. [Lovable design guidance](https://docs.lovable.dev/features/design-guidance).

Base44's progression from global design to page composition to selected elements is useful for avoiding local polish on an unstable foundation. Establish the token system and shared navigation, prove one representative page, then extend the approved system to the remaining page families. The representative page is a checkpoint: every agreed SEO subpage still belongs to the delivery. [Base44 design guidance](https://docs.base44.com/Building-your-app/Designing-with-AI).

## Turn design knowledge into working code

Keep durable brand facts, constraints and architecture in the existing project records; load specialist instructions for the task that needs them. Lovable distinguishes persistent project knowledge from task-specific skills. MAKE should likewise keep PRODUCT.md, DESIGN.md and current acceptance criteria discoverable without repeating the entire research archive in every worker brief. [Lovable knowledge](https://docs.lovable.dev/features/knowledge).

Treat the initial DESIGN.md as selected intent, with unresolved asset or font choices labelled. Bind that intent to actual semantic tokens, component variants and usage rules. Verify CSS imports, providers, font loading, dependencies and build integration. Reconcile the final dossier against code and rendered pages; neither a polished Markdown file nor a token export establishes a functioning design system. Lovable's design-system documentation combines code, machine-readable constraints, human guidance and setup validation. [Lovable design systems](https://docs.lovable.dev/features/design-systems).

For each meaningful change, identify the owned scope: global token, shared component, page family, single route or local element. Record the intended improvement and affected consumers. A selected element or annotated screenshot locates feedback, but the implementation may involve shared styles. Check those dependencies before applying a supposedly local edit. [Lovable preview toolbar](https://docs.lovable.dev/features/preview-toolbar).

## Identify what “extract a component” actually means

| Input and method | Result | MAKE implementation rule |
|---|---|---|
| Screenshot interpretation | Inferred color, type, spacing and shape rules | Record estimates and verify the rendered equivalent; no recovered source-code claim. [Base44 foundations](https://docs.base44.com/Building-your-app/Design-foundations-and-layout) |
| Supplied Figma CSS | Selected style properties | Check missing layout, states and behavior separately. [Base44 foundations](https://docs.base44.com/Building-your-app/Design-foundations-and-layout) |
| Existing repeated code | Refactored reusable component | Preserve consumers and test affected pages; no framework conversion just for reuse. |
| 21st.dev registry prompt | Acquired component implementation | Check source, licence, dependencies and preview in the selected stack. [Lovable 21st.dev](https://docs.lovable.dev/tips-tricks/21stdev) |
| Curated component preview | Base44 documents rebuilding it in React | A rebuild is not byte-identical extraction. MAKE retains HTML by default. [Base44 components](https://docs.base44.com/Building-your-app/Components-library) |
| Token/component source | Generated schema and implementation guidance | Verify exports and token consumers. A schema is not a screenshot or a working integration. [Lovable design systems](https://docs.lovable.dev/features/design-systems) |

Lovable's current Preview Toolbar replaces its old Visual edits panel. Selected elements, inline text editing, annotated screenshots and pinned comments locate feedback. Base44 can select repeated elements as a group. A local visual selection therefore does not guarantee an isolated source change: check shared components and global styles. [Lovable toolbar](https://docs.lovable.dev/features/preview-toolbar), [Base44 chat controls](https://docs.base44.com/Building-your-app/AI-chat-modes).

Figma inputs also differ. Lovable's `.fig` upload supplies design context, not interactive component import; its plugin and local MCP are separate routes. Base44 documents frame import with fill/font/effect limitations. Retest actual responsive and interactive behavior after any import. [Lovable Figma](https://docs.lovable.dev/integrations/figma), [Base44 Figma](https://docs.base44.com/Getting-Started/import-from-figma).

## Combine screenshots with observable behaviour

Follow [screenshots.md](screenshots.md) for capture readiness, real viewport settings, readable page segments, evidence metadata and independent pixel inspection. Use a baseline and a fresh capture of the same route, state and viewport after a repair. Include the actual build identity so reviewers can distinguish the preview from production and detect stale evidence.

Public builder documentation supports combining several kinds of evidence:

| Question | Evidence to obtain |
| --- | --- |
| Does the composition work? | Opened screenshots, relevant references and specific independent critique |
| Does the visitor complete the task? | Real navigation, input, submission and observable result |
| What caused a failure? | Relevant console, network, runtime and application observations |
| Can search systems access the page? | Actual delivered HTML, links, metadata, statuses and host-specific checks |

Lovable explicitly describes limitations in subtle visual and colour judgement, even though its browser testing observes screenshots and runtime signals. Do not treat a testing agent's general approval as an art director's review. Base44 documents browser journeys, an activity log and rerunning scenarios after fixes. Replit documents real-browser testing with mock data and video replay after meaningful changes. Borrow the evidence and retest discipline; do not infer access to these proprietary tools in the current host. [Lovable browser testing](https://docs.lovable.dev/features/browser-testing), [Base44 testing agent](https://docs.base44.com/documentation/managing-app-data/testing-agent), [Replit App Testing](https://docs.replit.com/features/agent/app-testing).

Checkpoint a coherent implementation change, then review it with a separate brief. Retest the observed failure after correction and inspect affected shared contexts. Avoid rerunning unrelated clean suites after every message. Use the host's real agent capabilities: Lovable documents its own subagents as temporary read-only researchers and reviewers, which does not establish restrictions or powers for MAKE's workers. [Lovable subagents](https://docs.lovable.dev/features/subagents).

Current documented limits, checked 06.09.2026: Lovable supports standard file inputs but has limitations around complex upload widgets, drag/drop, canvas and subtle visual judgment; authenticated browser tests require its Cloud backend in this snapshot. Base44's test agent uses a separate environment/fresh user and can mark results stale after code changes; login/OTP verification itself is not tested. These are vendor-documented capabilities, not scenarios exercised by MAKE here. Do not impose those proprietary product constraints on the local Playwright helper. [Lovable testing limits](https://docs.lovable.dev/features/browser-testing#limitations), [Base44 testing](https://docs.base44.com/documentation/managing-app-data/testing-agent).

Persistent design instructions also have concrete update boundaries. Lovable copies released code/rules to consumers and documents accepting updates; it is not unspecified automatic live synchronization. Base44 says applying a workspace design system to an existing app regenerates it, rather than merely changing styles. Those mechanisms are not permission for an unrelated rewrite. Keep MAKE's existing files and narrowly chosen token/component changes authoritative. [Lovable systems](https://docs.lovable.dev/features/design-systems), [Base44 systems](https://docs.base44.com/Building-your-app/Design-system).

## Keep versions, data and delivery distinct

Record code revision, environment, test data and live integration targets before a journey test. A branch is not automatically an isolated data environment: Base44 documents independent branch code and previews that normally share live records and integrations, with separate test-data facilities. Choose the actual supported test environment and honour the user's existing authorisation for external actions. [Base44 branches](https://docs.base44.com/Building-your-app/working-with-branches).

Inspect the existing framework and host before choosing rendering or metadata behaviour. As documented on the research date, Lovable apps created from May 13, 2026 use TanStack Start SSR; older React/Vite projects use request-time prerendering for verified crawlers. An unverified scanner can receive their SPA response. Record what was tested and use appropriate provider-supported verification; do not copy crawler-specific serving into an unrelated React project. MAKE's compatible-project stack default remains governed by [stack.md](stack.md). [Lovable SEO and AEO](https://docs.lovable.dev/features/seo-aeo).

Base44 documents crawler rendering and platform controls that can override code-level metadata. Inspect the delivered result rather than assuming a component's head tags win. Platform scores are diagnostics, not evidence of rankings or conversion performance. [Base44 search visibility](https://docs.base44.com/Performance-and-SEO/SEO-and-search-visibility), [Base44 SEO controls](https://docs.base44.com/Performance-and-SEO/checking-your-seo-and-geo).

Finally, separate a working preview from a published release. Lovable documents publication as a snapshot, so later preview edits require another publication to become live. Apply the general lesson on any host: verify the actual deployed revision, public route responses and critical journeys after authorised publication. [Lovable hosting](https://docs.lovable.dev/features/hosting).

**Capability and source status — 2026-09-06:** This reference synthesises first-party public documentation researched on that date. The latest focused check retrieved 16 content pages and two official indexes for Lovable/Base44; unchanged Replit/SEO/hosting material retains its earlier evidence. A native browser countercheck failed twice before context creation, so no successful proprietary builder test or new rendered-document review is claimed. No private builder projects, internal prompts or source implementations were inspected, and no builder account, integration or installation is required or implied. Recheck changing product behaviour before relying on it in a live platform project.
