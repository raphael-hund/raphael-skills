import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const SHARED_PREFIX = "/root/.local/share/web-skill-node";
const SHARED_NODE_MODULES = join(SHARED_PREFIX, "node_modules");
const INSTALL_HINT =
  "npm install --prefix /root/.local/share/web-skill-node playwright@latest && npx --prefix /root/.local/share/web-skill-node playwright install chromium";

function expandRoot(root) {
  if (!root) return [];
  const abs = resolve(String(root));
  return [abs, join(abs, "playwright"), join(abs, "node_modules", "playwright")];
}

export function playwrightSearchRoots(opt = {}) {
  const roots = [];
  if (opt.modulePath) roots.push(resolve(opt.modulePath));
  if (process.env.PLAYWRIGHT_ROOT) roots.push(...expandRoot(process.env.PLAYWRIGHT_ROOT));
  roots.push(join(process.cwd(), "node_modules", "playwright"));
  roots.push(join(SHARED_NODE_MODULES, "playwright"));
  return roots;
}

function tryRequireFrom(candidate) {
  const requireFromMeta = createRequire(import.meta.url);
  const attempts = [];
  if (existsSync(join(candidate, "package.json"))) {
    attempts.push({ require: createRequire(join(candidate, "package.json")), id: candidate });
    attempts.push({ require: createRequire(join(candidate, "package.json")), id: "playwright" });
  }
  attempts.push({ require: requireFromMeta, id: candidate });
  try {
    attempts.push({ require: createRequire(join(dirname(candidate), "package.json")), id: "playwright" });
  } catch {
    /* candidate has no sibling package.json */
  }
  for (const { require, id } of attempts) {
    try {
      const entry = require.resolve(id);
      const playwright = require(entry);
      if (playwright && playwright.chromium) {
        return { playwright, chromium: playwright.chromium, entry };
      }
    } catch {
      /* next */
    }
  }
  return null;
}

export function loadPlaywright(opt = {}) {
  const tried = [];
  for (const candidate of playwrightSearchRoots(opt)) {
    tried.push(candidate);
    const loaded = tryRequireFrom(candidate);
    if (loaded) return loaded;
  }
  for (const pkgJson of [join(SHARED_PREFIX, "package.json"), join(process.cwd(), "package.json")]) {
    tried.push(`${pkgJson}#playwright`);
    try {
      const require = createRequire(pkgJson);
      const entry = require.resolve("playwright");
      const playwright = require(entry);
      if (playwright && playwright.chromium) {
        return { playwright, chromium: playwright.chromium, entry };
      }
    } catch {
      /* next */
    }
  }
  throw new Error(
    `Playwright not found (PLAYWRIGHT_ROOT → cwd/node_modules → ${SHARED_NODE_MODULES}). Tried: ${tried.join(" | ")}. Install with: ${INSTALL_HINT}`,
  );
}

const DEFAULT_ARGS = [
  "--no-sandbox",
  "--disable-dev-shm-usage",
  "--use-gl=swiftshader",
  "--disable-software-rasterizer",
  "--force-color-profile=srgb",
  "--disable-lcd-text",
  "--hide-scrollbars",
];

export async function launchChromium(chromium, opts = {}) {
  if (!chromium || typeof chromium.launch !== "function") {
    throw new Error("launchChromium: chromium.launch is missing");
  }
  const launchOpts = { headless: true, args: DEFAULT_ARGS, ...opts };
  try {
    return await chromium.launch(launchOpts);
  } catch (firstError) {
    try {
      return await chromium.launch({ ...launchOpts, channel: "chrome" });
    } catch {
      throw firstError;
    }
  }
}
