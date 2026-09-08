# Learn from service websites

Read for new service-business builds and when Raphael supplies websites to analyse or add to MAKE's knowledge. For the current learned preferences, read [service-patterns.md](service-patterns.md). Use the indexed evidence in `references/corpus/` and the relevant source studies: [solar](service-sites-solar.md), [agencies and local services](service-sites-agencies.md), [specialists](service-sites-specialists.md), [SEO Labs and clients](service-sites-seolabs.md), and [visual evidence](service-sites-visual.md).

## What learning means here

Maintain retrievable, source-linked observations, design decisions and explicit user feedback. This changes what the skill reads and does on future jobs; it does not train model weights, create an autonomous background crawler, prove conversion performance, or make an MCP connection exist. A list of URLs alone is not learned design judgment.

Treat Raphael's supplied sites as positive preference seeds. A positive seed can contain weak copy, accessibility problems, unsupported claims or irrelevant features. Learn at page, section and interaction level. Distinguish three judgments:

- **Preference:** Raphael likes this example or a specific property. Preserve the exact scope of his feedback.
- **Observed quality:** a particular task, layout or interaction succeeds or fails under an inspected condition.
- **Business performance:** rankings, enquiries, sales or speed supported by actual measurements with source, period and method. Marketing claims remain claims.

Prefer clear, credible service websites by default: understandable offers, substantial proof, useful service details and an easy next action. This preference does not prohibit distinctive typography, bold branding or animation. Give expressive elements a visitor purpose. Do not turn every client into an experimental portfolio or reuse one solar brand's identity across industries.

## Retrieve before designing

For a full service build, read the pattern synthesis and retrieve examples for the actual business model, page family and decision problem. The helper supports local retrieval without external services:

```sh
node <skill-dir>/scripts/reference-corpus.mjs list
node <skill-dir>/scripts/reference-corpus.mjs search --domain mission-mittelstand.de
node <skill-dir>/scripts/reference-corpus.mjs search --query solar
node <skill-dir>/scripts/reference-corpus.mjs search --query service --type service
node <skill-dir>/scripts/reference-corpus.mjs validate
```

For a known company use `--domain`: free-text search matches substrings across observations, so `Mission` also matches `submission`. A broad text hit does not identify the requested company.

Choose one primary visual reference, plus specific secondary examples for architecture, proof or interaction. Open matching evidence and recheck live behaviour before relying on details that may have changed. A text record supports content architecture; it cannot settle colour, spacing or animation. Preserve established brand decisions and the current brief over the corpus.

Record the resulting choices in the project's existing `docs/design/references.md`: question → source and evidence → observed relationship → fit → adaptation → rejection → implementation evidence. Use 21st.dev through [21st-dev.md](21st-dev.md) to research and implement the selected component jobs; its catalogue does not choose the client's strategy or aesthetic.

## Add or deepen a supplied reference set

1. **Inventory every supplied URL.** Retain the supplied address, final address, date, access outcome and reference role. Discover internal pages through real navigation, footer, hubs, linked case studies and accessible sitemap indexes. Follow sitemap children where supported; record source and pagination. Keep meaningful locales and product variants; separate query noise, anchors, legal pages and off-domain destinations. A failed sitemap request is not proof there are no subpages.
2. **Classify the discovered pages.** Useful families include homepage, service hub, service detail, product/category, audience/sector, genuine local page, project index/detail, company/team, contact/booking, calculator/configurator and guide. Keep an inventory of discovered, inspected, deferred and inaccessible pages with reasons. Onepagers remain onepagers; legal pages do not substitute for service-detail evidence.
3. **Inspect across families and journeys.** Prioritise every distinct family, major offering and important enquiry route, then deepen meaningful variations. Large shops and knowledge bases can contain thousands of near-repeated URLs: report the exact sample and outstanding scope instead of claiming a complete crawl. If the user explicitly requests every URL, continue within authorised capability and preserve unresolved coverage; do not silently redefine that as one page per family.
4. **Analyse page structure in reading order.** Record who arrives, what they need, the H1/offer, each section's job and content form, proof placement, objections, CTA destination and internal links. Summarise copy techniques in original words; retain only short quotations when essential. Avoid reproducing complete site text.
5. **Inspect rendered design.** Follow [screenshots.md](screenshots.md): top view, readable scrolled regions, relevant details and important states. Record actual CSS viewport and readiness. Inspect the saved images, not only the DOM. Fonts, colour values and dimensions are measured only when obtained from supported inspection; screenshot estimates remain estimates.
6. **Observe interaction over time.** Exercise menus, tabs, accordions, comparisons, sliders, sticky controls and public configurator steps through their real controls. Record trigger, before/after state, action, visible result and route. Do not submit leads, book meetings or contact businesses for reference research. Read rendered structure and supported style/runtime evidence to distinguish observed implementation from a proposed equivalent.
7. **Synthesize and challenge.** Compare relevant patterns across independently built sites and different page families. Several clients of one agency are correlated evidence, not independent proof that a method is universal. Preserve exceptions and counterexamples. User-positive does not mean everything should be copied.
8. **Save useful knowledge.** Save compact source studies, structured page records and inspectable original captures. On an explicitly requested skill update, validate and sync the named personal skill through the skill-creator workflow. Ordinary website work saves new lessons in that project first; it does not silently modify personal skills.

## Capture motion without inventing video evidence

Discover actual recording capabilities before promising video. Where the supported browser can record, save a short original clip for each materially different interaction, with source URL, capture time, viewport, actions and clip timecodes. Inspect the clip. Record start/end state, direction, sequencing and whether the interaction can be interrupted; only state exact duration/easing when measured or inspected in supported code/style evidence.

When recording is unavailable, capture timestamped before/after and intermediate states through the supported browser. Label them **state sequence, not video**. The wall-clock interval between screenshots includes tool latency and does not measure animation duration. A slide show or GIF assembled from sparse frames is not continuous footage and must not be presented as such. Do not launch a different browser surface to evade a host limitation.

For each motion study record: visitor purpose, target, trigger, observed state change, original evidence, reproducible actions, timing confidence, mobile evidence, keyboard evidence, reduced-motion evidence, and proposed implementation. Mark untested dimensions. Watching a reveal does not identify GSAP, Motion, CSS transitions or the original source code. Prefer the simplest maintainable implementation that reproduces the useful behaviour.

## Source-linked pattern records

Use a stable ID and one concrete principle per record. Capture:

| Field | Required meaning |
|---|---|
| `context` | Business model, audience, page family, decision problem |
| `sources` | Exact inspected URLs and available screenshot/state IDs |
| `observation` | What is actually present or happened |
| `interpretation` | Why it may help; explicitly an inference |
| `adaptation` | How to apply with the client's own content and brand |
| `avoidWhen` | The mismatch or failure condition |
| `evidenceLevel` | Supplied preference, indexed excerpt, web text, DOM, image, state sequence, video, measured implementation, measured outcome |
| `feedback` | User's explicit reaction, date and scope, if any |

The corpus JSON shards store compact site/page observations. `visual.json` and its capture manifest supplement them; they do not upgrade every textual page to visually inspected. `reference-corpus.mjs` validates and retrieves records, but never visits websites or certifies quality. Do not manufacture missing evidence to satisfy its output.

## Judge quality by the visitor's task

Compare the current implementation and selected references at equivalent page/state/viewports. Use supported observations for:

- Offer comprehension and fit: what is offered, for whom and where; what makes it credible.
- Hierarchy and reading rhythm: coherent typography, purposeful section length and useful imagery.
- Proof: relevant projects, people, specifications or attributable testimonials at the decision point.
- Content and search architecture: distinct intent, useful depth, crawlable connections and correct route behaviour.
- Conversion: appropriate effort, transparent next step and real working destinations.
- Interaction: discoverability, feedback, keyboard/touch behaviour and reduced motion.
- Maintainability and access: reliable loading, readable content and truthful degraded states.

Mark each dimension `supported`, `mixed`, `weak` or `unverified`, with specific evidence. Do not average these into a fabricated scientific quality or conversion score. A critical broken journey remains a blocker even if the page is attractive. Fix the highest-impact observable problem, recapture affected states and preserve the lesson only when the retest supports it.
