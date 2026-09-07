# HTML-first stack and hosting decisions

Raphael's current default is semantic HTML output, custom CSS and vanilla JavaScript where sufficient. Ordinary service, agency, personal-brand and editorial websites keep this structure, including multi-page SEO sites. When actual component-library reuse is useful, use [Astro with component islands](component-islands.md): static components render at build time, interactive components hydrate only their own areas. This does not require converting the whole site to React.

## Default structure

Use actual HTML documents for indexable routes, e.g. `index.html`, `leistungen/index.html`, `leistungen/beratung/index.html`, `kontakt/index.html`; one stylesheet/token source and focused JavaScript ES modules. A small build-time template/content generator may reuse navigation, footer and route metadata when it reduces duplicated maintenance. Its output must still contain complete page HTML. Do not load essential page content with client-side fetch or require a SPA router.

Use CSS custom properties, Grid/Flexbox, responsive images, native forms and semantic links/buttons. Use CSS transitions/keyframes or the Web Animations API for purposeful movement; add a specialist library only for a documented interaction requirement. Verify current browser support for selected APIs. A sticky header, tabs, disclosure, map, gallery, calculator or form is ordinarily achievable without a framework. Native forms still need a genuine receiving endpoint. [MDN forms](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms).

For maps distinguish useful geography from decoration. Provide accurate service areas/markers and an accessible location list or address/directions link. Choose a static graphic when interaction adds no user value; load an interactive map deliberately and retain required attribution. Do not invent locations from an inspirational image.

## Component islands and full React applications

Choose a bounded React island when a suitable real library component provides worthwhile reuse, behavior or maintainability; record its hydration, dependencies and cost. Prefer Astro's static HTML output for new HTML-oriented sites needing these components. Keep existing plain HTML when a small bundled widget suffices. Purely static React components need no browser React. Follow [component-islands.md](component-islands.md) for source, CSS, context, portal and fallback boundaries.

Choose a full React application when functionality justifies a shared application system: many interconnected views, state with complex updates, substantial client-side editing or an established application architecture. Write a short decision naming the states/views and why separate modules or islands would be harder to maintain. One component does not justify a whole-site migration. Preserve a viable existing React application for a targeted change.

If HTML is later converted, keep the route map, semantic DOM, visual tokens, asset manifest, accessible states, metadata and approved behavior as the conversion contract. Convert by component/page family, then compare the same URLs/viewports/states before and after. Avoid an unrequested redesign. Verify the chosen framework's installed versions and current APIs; Next.js, TypeScript and Tailwind are options, not defaults. Use prerendering/SSR for public content and isolate browser-only behavior. [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

## Hosting and release

Preserve a functioning project and its hosting contract. With `.openai/hosting.json`, load Sites building/hosting instructions and use the supported output. If hosting truly requires a framework scaffold, record that constraint, retain HTML-first composition and minimal client runtime within it, and never assert unsupported deployment compatibility.

Check direct loading of every route, trailing-slash/canonical policy, assets from nested paths, genuine 404 responses, redirects, sitemap/robots and the actual receiving endpoint. Static HTML does not supply server actions or a form backend. Capture production HTTP statuses; a visually convincing 404 component returned with status 200 is not a correct missing-page response.

Use a single route/content source where it helps keep pages, navigation, breadcrumbs and sitemap consistent. Navigation and useful content must appear in response HTML. Build-time reuse and documented component islands are supported; a complete runtime application requires the broader justification above.

## Performance and accessibility

Use deliberate image dimensions/formats/crops, restrained font payloads, eager loading for the actual initial large image and lazy loading below it. Keep readable content available without animation. Test keyboard, touch, zoom, long content and reduced motion, plus relevant automated checks. A clean automated scan is partial evidence.

Font subsetting must preserve actual project languages, including German umlauts and any required ß; an ASCII-only example is not a safe default. Apply native and library performance recipes to the observed bottleneck, preserving component resource ownership and usable partial-load failure states as detailed in [UI Skills](ui-skills.md#motion-that-survives-real-interaction).

Measure the production build with the route, tool version and device/network settings recorded. Separate field data from lab observations; Lighthouse/TBT is not field INP. Good Core Web Vitals thresholds are LCP ≤2.5 s, INP ≤200 ms and CLS ≤0.1 at p75; recheck current primary guidance when using these metrics. [Web Vitals](https://web.dev/articles/vitals).

When a performance decision depends on a headline lab value, compare equivalent runs and report median/spread alongside CPU/network, cache, route/state, consent and experiment settings. Distinguish URL data from origin-wide data and state the field window/cohort. Missing CrUX data means unknown; it is not a pass or failure. Diagnose LCP discovery/transfer/render delay, INP input/processing/presentation delay and the initiator of CLS instead of fixing only the element visibly shifted. Do not claim an immediate field improvement from a fresh lab run (Addy's UI Skills measurement/CWV sources).

21st.dev, shadcn/ui, Mantine and other libraries supply reference patterns or actual reusable components. Choose native implementation, build-time rendering or an interactive island by need; do not force a manual port or a whole-site React migration. Record licensing, dependencies, adaptation and unported behavior through the [dependency adapter](dependencies.md#shadcnui-selected-components-within-the-chosen-stack); preserve existing primitives, local customizations and DESIGN.md tokens.
