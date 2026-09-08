# Screenshots that support real visual judgement

Read for reference inspection, browser critique, responsive review and visual retesting. This protocol turns actual rendered pages into inspectable evidence. It does not prescribe a screenshot quota or make still images certify functionality, accessibility or SEO.

The transferable lesson from documented builders is to combine visual inspection with runtime observations, then retest the changed result. Lovable documents browser screenshots alongside actions, console/network observations and explicit limitations in subtle visual judgement. Base44 documents screenshot-based critique and refinement from global design to individual elements. These are public workflows, not evidence of either product's hidden prompts or implementation. [Lovable browser testing](https://docs.lovable.dev/features/browser-testing), [Base44 design guidance](https://docs.base44.com/Building-your-app/Designing-with-AI).

## Use the actual capture surface

Discover the available browser, screenshot, image-viewing and artifact capabilities before choosing a capture method. Read their exact schemas and supported operations; do not guess an API because it resembles Playwright.

When the host's Browser skill applies, load it and use its documented native browser surface. Do not launch a separate Playwright browser, attach an alternative automation client, or use shell-based browser access to work around its limits. For a normal project CI workflow where Playwright is supported and authorised, use the project's runner and installed version. The examples in public Playwright documentation do not grant capabilities to another browser tool.

The website request already authorises routine screenshots and read-only verification; do not add a permission checkpoint for each capture. Preserve existing limits on live submissions, credentials and external mutations. Record an unavailable capture capability as a limitation, not as a passed review.

## Bundled helper for authorised Playwright environments

Use [capture-site.mjs](../scripts/capture-site.mjs) when this environment permits a local Playwright runner. It does not replace a mandated host browser surface. Node ≥18, an installed Playwright package and a working Chromium executable are required; no installer runs automatically.

```sh
node <skill-dir>/scripts/capture-site.mjs --url <actual-preview-url> --out <new-absolute-evidence-directory> --revision <actual-build-id>
```

Use `--module-path <installed-playwright-package>` and `--executable-path <existing-chromium>` only when ordinary resolution is unavailable. `--ready-selector <real-selector>` adds a visible application readiness condition. `--help` lists bounded time and scroll options. Each invocation needs a new output directory to retain earlier evidence.

The helper produces desktop (1440×1000, DPR 1) and touch-emulated mobile (390×844 CSS px, DPR 2), viewport/fullpage PNGs and `manifest.json`. A mobile viewport PNG is 780×1688 raster pixels. It checks late fonts, main-document image decoding, bounded lazy scrolling, element geometry and resource errors. Exit 0 means technical readiness within the observation window; exit 1 preserves incomplete/error evidence; exit 2 means invalid CLI. Horizontal overflow is a finding even when technically ready. Every screenshot starts as `reviewed: false`: open the files and record your actual review separately.

**Composition baseline only:** this helper uses light theme, en-US locale, reduced motion and disabled screenshot CSS animations. It does not dismiss consent or operate menus/forms. Record those settings and inspect normal-motion, scrolled, consent, focused and interaction states through the supported browser separately. No motion pass follows from these baseline PNGs. Stable geometry does not certify video/canvas pixels; decoding does not cover CSS backgrounds, inner frames or shadow DOM. Fullpage images do not replace readable segment captures. A conservative error on hidden/lazy resources needs diagnosis, not deletion of the failure record.

## Prepare the page, then capture

1. **Identify the build.** Record the real preview or deployed URL, route including meaningful query/hash, commit/build identifier and any uncommitted revision. Preview and production are different targets. Confirm the intended page loaded rather than a redirect, error page or stale development build.
2. **Establish the state.** Record language, theme, consent state, user/test-data identity where relevant, navigation disclosure, focused element and active tab/accordion. Use representative real content. Use fixtures, deterministic seeds or a fixed clock only when the application and authorised test harness actually support them; label them. Never replace awkward content or broken data with prettier evidence.
3. **Check readiness.** Wait for expected content and usable controls, not only a navigation event or an arbitrary delay. Verify actual fonts/weights loaded, relevant images loaded and decoded, and hydration completed without obvious runtime errors. Font readiness alone does not prove the intended face loaded; inspect the actual rendered family and weights when questionable. Check image failures and layout shifts before judging spacing. A continuously connected app may never reach network silence; use page-specific readiness.
4. **Exercise lazy content.** Scroll through the real page at a human-readable pace, allow assets and intersection-triggered sections to appear, and return to the required capture position. Recheck layout after loading. Do not bypass missing content by replacing it with screenshot-only markup.
5. **Check stability.** Observe whether dimensions, line wrapping and content remain settled across successive frames. For continuously moving content, select a documented stable state for composition and inspect the live behaviour separately. An unstable capture is useful failure evidence, but not a clean comparison baseline.

Preserve an initial-load or error-state capture when it exposes a meaningful visitor defect. Waiting for a final state must not erase evidence of severe shifts, invisible content, long skeletons or failed assets.

## Capture the right views

| View | What it reveals | Capture guidance |
| --- | --- | --- |
| First viewport | First impression, hierarchy, navigation, hero crop and primary action | Capture at the actual top position with normal interface layers visible. |
| Full page | Section order, density, pacing, repetition and footer | Use as an overview; a tiny long thumbnail cannot establish typography quality. |
| Overlapping viewport segments | Readable detail throughout long pages | Scroll and capture enough overlap to show section boundaries. Record each scroll position; inspect every content region. |
| Element/detail | Specific image crop, type, component alignment or local defect | Keep a contextual viewport companion. Do not crop away the cause or impact. |
| Interaction state | Menu, modal, focus, validation, loading, success/failure | Reach the state through the real interface and record the actions. A still state does not prove the transition or destination. |

Playwright separately supports page, full-page and element captures; choose the equivalent operation only if the current surface exposes it. [Playwright screenshots](https://playwright.dev/docs/screenshots).

Use practical CSS viewport defaults such as desktop **1440 × 1000** and mobile **390 × 844**, then adapt to the project's supported devices, content and breakpoints. Inspect intermediate widths where composition changes, and narrower supported screens when actual content creates risk. These are starting points, not universal acceptance thresholds.

Mobile means a genuine narrow browser viewport with the available mobile/touch settings—not a desktop screenshot scaled down. Record viewport width/height in CSS pixels, raster image dimensions, device pixel ratio, screenshot scale, browser/version, zoom and device emulation. A DPR 2 capture can contain twice the raster width without having twice the layout width. Record which settings were actually available; do not imply physical-device testing from emulation. [Playwright emulation](https://playwright.dev/docs/emulation), [Screenshot scale options](https://playwright.dev/docs/api/class-page#page-screenshot).

## Handle capture traps explicitly

- **Sticky/fixed elements:** inspect real scrolled viewports. Full-page capture can represent these differently from normal browsing or obscure section relationships. Do not remove a faulty sticky header to make the page look cleaner.
- **Nested scrolling and iframes:** identify the actual scrolling container and frame. The outer page overview does not expose all inner content. Capture relevant inner states using supported interactions; record anything inaccessible. Do not flatten an iframe into a supposed original page capture.
- **Virtualised lists:** capture visible data states and representative scrolling, not a fictional image of all items. Record that virtualisation limits full-page coverage.
- **Animations:** inspect normal motion, interruption and reduced-motion behaviour separately. Record any paused/disabled animation mode used for comparison. A screenshot option that stops CSS animation does not guarantee deterministic video, canvas or JavaScript motion. Never hide essential content to stabilise a shot.
- **Overlays:** dismiss consent or menus only through their normal controls when reviewing the dismissed state, retaining relevant open-state evidence. Do not mask failed images, overflowing text, banners, navigation or defects. Capture-only styles/masks belong only to explicitly labelled supplemental regression checks with an unaltered companion.
- **Tool limits:** if a full page is clipped or too large, use original viewport segments. Save the browser's unedited originals. An annotated copy is a separate aid, never a replacement or manufactured screenshot.

## Keep evidence usable and current

Use existing project conventions or a path such as `docs/qa/<build-id>/<route-key>/<viewport-key>/<state>/`. Save full-page, viewport/segment and detail captures with distinguishable filenames. Keep each original image accessible to the reviewer at readable resolution; contact sheets are navigation aids.

Maintain one evidence matrix derived from `SEO-PAGE-MAP.json`, covering **every agreed route, including every SEO subpage**, at desktop and mobile, plus relevant responsive and interaction states. Per entry record:

- URL/route, page family, build/revision and capture timestamp.
- CSS viewport, DPR/raster size, browser/device settings and motion mode.
- Data/environment, readiness observations, scroll/container position, state and reproduction actions.
- Actual artifact paths, capture limitations, reviewer identity and review status.
- Specific findings, severity, responsible owner, fix acceptance condition and replacement evidence.

Distinguish `captured`, `opened`, `reviewed`, `needs-fix`, `retested` and `stale`. A file's existence, dimensions, timestamp, manifest entry, successful tool result or builder assurance does not prove its pixels were inspected. The independent reviewer must actually open the images and cite visible evidence. If an image cannot be opened, say it remains unreviewed.

Token, font, asset, shared-component or content changes invalidate affected approvals. Mark the affected captures stale, recapture the impacted routes/states and inspect them again. Preserve earlier evidence for comparison; never relabel an old image as a new build. An unchanged route need not be recaptured after an unrelated isolated edit.

Use a stable join between the page map and screenshot evidence. For example, the page's `evidence.desktop` can be `docs/qa/screenshots.json#services-desktop-default`; the fragment identifies the exact record below. Paths are relative to the project root. Replace all example values with observed ones:

```json
{
  "version": 1,
  "records": [{
    "id": "services-desktop-default",
    "route": "/services",
    "url": "https://example.com/services",
    "revision": "actual-commit-and-dirty-diff-id",
    "capturedAt": "actual-ISO-timestamp",
    "viewport": {"width": 1440, "height": 1000, "dpr": 1},
    "raster": {"width": 1440, "height": 1000},
    "browser": "actual-browser-and-version",
    "state": "default; scrollY=0; natural motion",
    "readiness": "observed font, image and layout checks",
    "images": ["docs/qa/actual-build/services/desktop/viewport.jpg"],
    "reviewer": "actual-independent-agent-id",
    "status": "reviewed",
    "findings": []
  }]
}
```

Each release desktop/mobile reference must resolve to a `reviewed` or `retested` record applicable to the current affected revision, with real readable images and resolved findings. Give separate mobile and state records distinct IDs. These are traceability fields, not proof of review: the lead still opens referenced artifacts and checks the critic's findings and actual pixels. Keep existing equivalent evidence conventions when already consistent.

## Compare, diagnose and retest

Compare before/after at matched CSS viewport, DPR/scale, browser, content/data, scroll, state and motion settings. Keep matching environments for automated regression snapshots; browser rendering can vary across platforms. Do not update a baseline simply to make a failing comparison pass. Inspect and explain accepted changes first. [Playwright visual comparisons](https://playwright.dev/docs/test-snapshots).

For external references, match page purpose and viewport as closely as possible and document unavoidable differences. Inspect typography, image congruency, hierarchy, density, brand specificity and responsive transformation. Record what the reference does better and the specific adaptation; do not replace a useful SEO page with a decorative homepage composition.

Give the independent critic the actual images, selected references, DESIGN.md and visitor task, without builder self-praise. Each finding names route/state, visible region, observed defect, user impact and a verifiable improvement. Fix the highest-impact issue, capture the same state again and check nearby/shared contexts for regression. Follow [quality-agents.md](quality-agents.md) for ownership and completion.

For a contract-based finding, cite the exact DESIGN.md section/rule and connect it to the observed component and current evidence. Explicitly flag newly invented patterns and missing rules rather than treating every difference as an error. Return actionable mismatches, missing states, accessibility/responsive risks and justified exception decisions; keep matched-rule evidence compact in the existing reconciliation record. Apply [the contract-update procedure](design-contract.md#values-reasons-and-explicit-rule-references) when the same failure recurs. Neither a self-review nor a rule citation substitutes for the actual screenshots and behavior being assessed.

For component resilience, use the source-informed [UI Skills guidance](ui-skills.md#behavior-before-decorative-polish): exercise long/translated labels, missing media, empty versus failed data, loading, double activation, rapid open/close reversal, zoom and relevant container widths. A temporary component-state gallery can make failures inspectable; do not ship its debug controls. Automated accessibility diffs distinguish newly introduced violations from existing ones but do not erase either or replace manual keyboard/task checks. Annotate exact selectors and reproduce the failing state before fixing it.

Keep visual evidence separate from raw HTML/indexability, semantic accessibility, interaction and delivery checks. Screenshots reveal appearance; they do not prove search crawlability, real submission receipt, field performance or conversion superiority.

Keep severity separate from evidence strength: an observed mechanical violation, an interpretive concern and an untested assistive-technology outcome are different records. `aria-live` and an accessibility-tree node do not establish an actual screen-reader announcement; programmatic `focus()` does not prove keyboard navigation, and CSS zoom does not reproduce real browser zoom. Record what was exercised, not a synthetic claim of user experience (AccessLint catalog sources).
