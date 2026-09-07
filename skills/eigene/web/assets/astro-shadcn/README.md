# Astro + actual shadcn proof

Node >=22.12.0; built with Node 22.23.2 and npm 10.9.8. Dependencies are exact pins
in package.json and the complete dependency tree is locked in package-lock.json.

```sh
npm ci --no-audit --no-fund
npm run check
npm run build
npm run preview
```

Preview serves http://127.0.0.1:4600. Astro 7 may run preview in the background;
use `npx astro preview status` and `npx astro preview stop` to inspect/stop it.
The static `dist/` directory can be served by any normal static server.

`src/pages/index.astro` owns the HTML page. `StaticCard` has no client directive.
Only `DetailsDialog client:load` hydrates. `/service/` imports no React component
and emits no script or island. The trigger is disabled while hydration is pending;
the ordinary service link outside the island always works.

Card, Dialog and Button came from official shadcn-ui/ui commit
`5c7072da672b0048bc6771e3204063a2537df91a`. See
`vendor/shadcn/PROVENANCE.json` for URLs and SHA-256 hashes. Original source and
the MIT license remain in that directory. Card and Button are verbatim. The sole
Dialog adaptation targets the static document-owned `#shadcn-portals` container.
Its direct Portal children, Presence lifecycle, behavior and classes remain. The `cn` and `@/` aliases resolve
upstream imports project-locally without rewriting them.

Tailwind 4 omits Preflight, scans only the component source directories, and emits
utilities inside native CSS `@scope`. Shared tokens, property registrations and
keyframes are global. This is not Shadow DOM isolation. Page selectors can reach
component descendants, and portals inherit document tokens, not tokens set only
on an island ancestor. See DESIGN.md for the measured limitation and chosen seam.

The repeatable regression driver is an ordinary Playwright application harness,
not a CE browser workflow. Reuse an available Playwright installation:

```sh
PLAYWRIGHT_MODULE=/absolute/path/to/playwright-core/index.mjs node scripts/qa.mjs
PLAYWRIGHT_MODULE=/absolute/path/to/playwright-core/index.mjs node scripts/motion-qa.mjs
```

This run used Playwright 1.62.1 from `/root/tools/node-deps/node_modules/playwright-core/index.mjs`
and Chromium 151.0.7922.34. Browser tooling is not a runtime dependency. Results
and screenshots are written to the sibling `evidence/` directory.

For an existing non-Astro HTML build, a locally bundled React `createRoot` mount
is a documented alternative, but static HTML SSR and island bootstrapping would
then need separate build integration. That alternative is not implemented here.
