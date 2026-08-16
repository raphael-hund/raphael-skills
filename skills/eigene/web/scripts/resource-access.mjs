#!/usr/bin/env node
/**
 * Einzelzugriff auf den kanonischen Frontend-Ressourcen-Katalog.
 *
 * `check` und `show` bleiben lokal: sie lesen nur Referenzen, ohne Netz,
 * Shell, Schreib- oder Paketaktionen.
 * `open` nimmt die Katalog-URL und liest die offizielle Site (Fetch, sonst
 * Firecrawl). Unbekannter Name = Exit 1, keine geratene URL.
 *
 * Usage:
 *   node resource-access.mjs check
 *   node resource-access.mjs show <exakter-Name> [--json]
 *   node resource-access.mjs open <exakter-Name> [--json]
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const CATALOG_PATH = join(HERE, "..", "references", "frontend-referenzbibliothek.md");
const ROUTER_PATH = join(HERE, "..", "references", "tool-usecase-router.md");
const INSPIRATION_CATEGORY = "Website- und UI-Inspiration";

// The external contract deliberately binds only the 133 requested resources.
// It hashes sorted, exact `name<TAB>officialUrl` pairs, never catalog prose.
const REQUESTED_CONTRACT = Object.freeze({
  count: 133,
  extraInspirationCount: 27,
  sha256: "6f7d266145227d7cb5dbd45ba5f91cc33fe991a62da61a283fe3e62f91b597c4",
});

const CATEGORY_ADAPTERS = Object.freeze({
  [INSPIRATION_CATEGORY]: Object.freeze({ kind: "inspiration-source", mode: "browser-research", routerAnchor: "#inspiration" }),
  "React, UI und Komponenten": Object.freeze({ kind: "component-source", mode: "selected-component", routerAnchor: "#sections" }),
  "Shader, WebGL und Creative Coding": Object.freeze({ kind: "research-source", mode: "browser-research", routerAnchor: "#webgl" }),
  "Gradients, SVGs und Hintergründe": Object.freeze({ kind: "generator", mode: "export-local", routerAnchor: "#background" }),
  "Texturen und 3D-Assets": Object.freeze({ kind: "asset-library", mode: "download-local-with-license", routerAnchor: "#texturen" }),
  "Inhaltsfotos und KI-Bilder": Object.freeze({ kind: "asset-library", mode: "download-local-with-license", routerAnchor: "#bilder" }),
  "2D-Illustration-Kits": Object.freeze({ kind: "asset-library", mode: "download-local-with-license", routerAnchor: "#illustration-flat" }),
  "Motion-Assets und Stock-Video": Object.freeze({ kind: "asset-library", mode: "download-local-with-license", routerAnchor: "#video" }),
  Icons: Object.freeze({ kind: "icon-source", mode: "selected-icon-family", routerAnchor: "#icons" }),
  "Fonts und Typografie": Object.freeze({ kind: "font-source", mode: "adobe-kit-embed", routerAnchor: "#fonts" }),
  "React Native und Mobile UI": Object.freeze({ kind: "mobile-ecosystem", mode: "official-docs-only", routerAnchor: "#mobile" }),
});

// Values are official, resolved package or CLI identities. A CLI is an access
// tool, not a target-project dependency. Runtime peers and optional companions
// are separate so a target-project plan cannot mistake an optional helper for a
// required peer. Command text remains solely in the router.
const PACKAGE_IDENTITIES = Object.freeze({
  "shadcn/ui": { ecosystem: "npm", type: "cli", package: "shadcn", source: "official shadcn CLI" },
  "Magic UI": { ecosystem: "npm", type: "cli", package: "shadcn", source: "official Magic UI registry documentation" },
  "Aceternity UI": { ecosystem: "npm", type: "cli", package: "shadcn", source: "official Aceternity registry documentation" },
  "React Bits": { ecosystem: "npm", type: "cli", package: "shadcn", source: "official React Bits registry documentation" },
  "Cult UI": { ecosystem: "npm", type: "cli", package: "shadcn", source: "official Cult UI registry" },
  "Motion Primitives": { ecosystem: "npm", type: "cli", package: "shadcn", source: "official Motion Primitives registry" },
  "Shadcn Blocks": { ecosystem: "npm", type: "cli", package: "shadcn", source: "official Shadcn Blocks registry" },
  "Park UI": { ecosystem: "npm", type: "cli", package: "@park-ui/cli", source: "official Park UI CLI package" },
  "Untitled UI React": { ecosystem: "npm", type: "cli", package: "untitledui", source: "official Untitled UI CLI package" },
  "daisyUI": { ecosystem: "npm", type: "package", package: "daisyui", requiredRuntimePeers: [], optionalCompanions: [], source: "official daisyUI package" },
  "Preline UI": { ecosystem: "npm", type: "package", package: "preline", requiredRuntimePeers: [], optionalCompanions: [], source: "official Preline package" },
  "Three.js": { ecosystem: "npm", type: "package", package: "three", requiredRuntimePeers: [], optionalCompanions: [], source: "official Three.js package" },
  OGL: { ecosystem: "npm", type: "package", package: "ogl", requiredRuntimePeers: [], optionalCompanions: [], source: "official OGL package" },
  PixiJS: { ecosystem: "npm", type: "package", package: "pixi.js", requiredRuntimePeers: [], optionalCompanions: [], source: "official PixiJS package" },
  "React Three Fiber": { ecosystem: "npm", type: "package", package: "@react-three/fiber", requiredRuntimePeers: ["react", "three"], optionalCompanions: ["@react-three/drei"], source: "official React Three Fiber package metadata" },
  "Theatre.js": { ecosystem: "npm", type: "package", package: "@theatre/core", requiredRuntimePeers: [], optionalCompanions: ["@theatre/studio"], source: "official Theatre.js packages" },
  GSAP: { ecosystem: "npm", type: "package", package: "gsap", requiredRuntimePeers: [], optionalCompanions: [], source: "official GSAP package" },
  tsParticles: { ecosystem: "npm", type: "package", package: "tsparticles", requiredRuntimePeers: [], optionalCompanions: [], source: "official tsParticles package" },
  "Vanta.js": { ecosystem: "npm", type: "package", package: "vanta", requiredRuntimePeers: ["three"], optionalCompanions: [], source: "official Vanta package and site" },
  LottieFiles: { ecosystem: "npm", type: "package", package: "@lottiefiles/dotlottie-react", requiredRuntimePeers: ["react"], optionalCompanions: [], source: "official LottieFiles React runtime" },
  Spline: { ecosystem: "npm", type: "package", package: "@splinetool/react-spline", requiredRuntimePeers: ["@splinetool/runtime", "react", "react-dom"], optionalCompanions: ["next"], source: "official Spline React package metadata" },
  Rive: { ecosystem: "npm", type: "package", package: "@rive-app/react-canvas", requiredRuntimePeers: ["react"], optionalCompanions: [], source: "official Rive React package metadata" },
  Lucide: { ecosystem: "npm", type: "package", package: "lucide-react", requiredRuntimePeers: ["react"], optionalCompanions: [], source: "official Lucide React package" },
  "Tabler Icons": { ecosystem: "npm", type: "package", package: "@tabler/icons-react", requiredRuntimePeers: ["react"], optionalCompanions: [], source: "official Tabler React package" },
  "Phosphor Icons": { ecosystem: "npm", type: "package", package: "@phosphor-icons/react", requiredRuntimePeers: ["react", "react-dom"], optionalCompanions: [], source: "official Phosphor React package" },
  Heroicons: { ecosystem: "npm", type: "package", package: "@heroicons/react", requiredRuntimePeers: ["react"], optionalCompanions: [], source: "official Heroicons React package" },
  "Remix Icon": { ecosystem: "npm", type: "package", package: "remixicon", requiredRuntimePeers: [], optionalCompanions: [], source: "official Remix Icon package" },
  Iconoir: { ecosystem: "npm", type: "package", package: "iconoir-react", requiredRuntimePeers: ["react"], optionalCompanions: [], source: "official Iconoir React package" },
  "Simple Icons": { ecosystem: "npm", type: "package", package: "simple-icons", requiredRuntimePeers: [], optionalCompanions: [], source: "official Simple Icons package" },
  "Radix Icons": { ecosystem: "npm", type: "package", package: "@radix-ui/react-icons", requiredRuntimePeers: ["react"], optionalCompanions: [], source: "official Radix Icons package" },
  Iconify: { ecosystem: "npm", type: "package", package: "@iconify/react", requiredRuntimePeers: ["react"], optionalCompanions: [], source: "official Iconify React package" },
  Hugeicons: { ecosystem: "npm", type: "package", package: "@hugeicons/react", requiredRuntimePeers: ["react"], optionalCompanions: [], source: "official Hugeicons React package" },
  "Atlas Icons": { ecosystem: "npm", type: "package", package: "@vectoricons/atlas-icons-react", requiredRuntimePeers: [], optionalCompanions: [], source: "official Atlas Icons React package" },
  "React Native Reusables": { ecosystem: "npm", type: "cli", package: "@react-native-reusables/cli", source: "official React Native Reusables CLI" },
  "gluestack UI": { ecosystem: "npm", type: "package", package: "@gluestack-ui/themed", requiredRuntimePeers: ["react", "react-dom", "react-native", "react-native-svg", "react-native-web", "@types/react-native", "@gluestack-style/react"], optionalCompanions: [], source: "official gluestack package metadata" },
  "Tamagui UI": { ecosystem: "npm", type: "package", package: "tamagui", requiredRuntimePeers: ["react"], optionalCompanions: [], source: "official Tamagui package metadata" },
  "React Native Paper": { ecosystem: "npm", type: "package", package: "react-native-paper", requiredRuntimePeers: ["react", "react-native", "react-native-safe-area-context"], optionalCompanions: [], source: "official React Native Paper package metadata" },
  "React Native UI Lib": { ecosystem: "npm", type: "package", package: "react-native-ui-lib", requiredRuntimePeers: ["react", "react-native", "uilib-native", "react-native-reanimated", "react-native-gesture-handler", "react-native-safe-area-context"], optionalCompanions: [], source: "official React Native UI Lib package metadata" },
  "React Native Elements": { ecosystem: "npm", type: "package", package: "@rneui/themed", requiredRuntimePeers: ["@rneui/base"], optionalCompanions: [], source: "official React Native Elements package metadata" },
  "UI Kitten": { ecosystem: "npm", type: "package", package: "@ui-kitten/components", requiredRuntimePeers: ["react-native-svg"], optionalCompanions: [], source: "official UI Kitten package metadata" },
  GetWidget: { ecosystem: "pub", type: "package", package: "getwidget", requiredRuntimePeers: [], optionalCompanions: [], source: "official pub.dev GetWidget package" },
});

const OVERRIDES = Object.freeze({
  "shadcn/ui": { kind: "component-registry", mode: "selected-component", routerAnchor: "#stack-primitives" },
  "shadcn.io": { kind: "research-source", mode: "browser-research", routerAnchor: "#stack-primitives" },
  "daisyUI": { kind: "npm-plugin", mode: "npm-after-router", routerAnchor: "#stack-primitives" },
  "Preline UI": { kind: "npm-plugin", mode: "npm-after-router", routerAnchor: "#sections" },
  "Motion Primitives": { routerAnchor: "#motion" },
  Animata: { routerAnchor: "#motion" },
  "Three.js": { kind: "runtime-code", mode: "npm-after-router", routerAnchor: "#webgl" },
  OGL: { kind: "runtime-code", mode: "npm-after-router", routerAnchor: "#webgl" },
  PixiJS: { kind: "runtime-code", mode: "npm-after-router", routerAnchor: "#webgl" },
  "React Three Fiber": { kind: "runtime-code", mode: "npm-after-router", routerAnchor: "#webgl" },
  "Theatre.js": { kind: "runtime-code", mode: "npm-after-router", routerAnchor: "#webgl" },
  GSAP: { kind: "runtime-code", mode: "npm-after-router", routerAnchor: "#webgl" },
  tsParticles: { kind: "runtime-code", mode: "npm-after-router", routerAnchor: "#background" },
  "Vanta.js": { kind: "runtime-code", mode: "npm-after-router", routerAnchor: "#background" },
  LottieFiles: { kind: "runtime-code", mode: "npm-after-router", routerAnchor: "#video" },
  Spline: { kind: "runtime-code", mode: "npm-after-router", routerAnchor: "#video" },
  Rive: { kind: "runtime-code", mode: "npm-after-router", routerAnchor: "#video" },
  "Transparent Textures": { routerAnchor: "#background" },
  "Subtle Patterns": { routerAnchor: "#background" },
  Typewolf: { kind: "typography-research", mode: "browser-research" },
  "Fonts In Use": { kind: "typography-research", mode: "browser-research" },
  "Google Fonts": { kind: "typography-research", mode: "browser-research" },
  Fontshare: { kind: "typography-research", mode: "browser-research" },
  Velvetyne: { kind: "typography-research", mode: "browser-research" },
  "Open Foundry": { kind: "typography-research", mode: "browser-research" },
  Uncut: { kind: "typography-research", mode: "browser-research" },
  "Use & Modify": { kind: "typography-research", mode: "browser-research" },
  Fontesk: { kind: "typography-research", mode: "browser-research" },
  Collletttivo: { kind: "typography-research", mode: "browser-research" },
  "The League of Moveable Type": { kind: "typography-research", mode: "browser-research" },
  "Omnibus Type": { kind: "typography-research", mode: "browser-research" },
  "Atipo Foundry": { kind: "typography-research", mode: "browser-research" },
  Lucide: { kind: "icon-package", mode: "npm-after-router", routerAnchor: "#icons" },
  "Tabler Icons": { kind: "icon-package", mode: "npm-after-router", routerAnchor: "#icons" },
  "Phosphor Icons": { kind: "icon-package", mode: "npm-after-router", routerAnchor: "#icons" },
  Heroicons: { kind: "icon-package", mode: "npm-after-router", routerAnchor: "#icons" },
  "Remix Icon": { kind: "icon-package", mode: "npm-after-router", routerAnchor: "#icons" },
  Iconoir: { kind: "icon-package", mode: "npm-after-router", routerAnchor: "#icons" },
  "Simple Icons": { kind: "icon-package", mode: "npm-after-router", routerAnchor: "#icons" },
  "Radix Icons": { kind: "icon-package", mode: "npm-after-router", routerAnchor: "#icons" },
  Iconify: { kind: "icon-package", mode: "npm-after-router", routerAnchor: "#icons" },
  Hugeicons: { kind: "icon-package", mode: "npm-after-router", routerAnchor: "#icons" },
  "Atlas Icons": { kind: "icon-package", mode: "npm-after-router", routerAnchor: "#icons" },
  "React Native Reusables": { mode: "selected-component" },
  "gluestack UI": { mode: "npm-after-router" },
  "Tamagui UI": { mode: "npm-after-router" },
  "React Native Paper": { mode: "npm-after-router" },
  "React Native UI Lib": { mode: "npm-after-router" },
  "React Native Elements": { mode: "npm-after-router" },
  "UI Kitten": { mode: "npm-after-router" },
  GetWidget: { kind: "mobile-package", mode: "pub-after-router" },
});

const VALID_KINDS = new Set(["inspiration-source", "component-source", "component-registry", "npm-plugin", "runtime-code", "research-source", "generator", "asset-library", "icon-source", "icon-package", "font-source", "typography-research", "mobile-ecosystem", "mobile-package"]);
const VALID_MODES = new Set(["selected-component", "npm-after-router", "pub-after-router", "browser-research", "export-local", "download-local-with-license", "selected-icon-family", "self-host-after-license", "adobe-kit-embed", "official-docs-only"]);
const VALID_ECOSYSTEMS = new Set(["npm", "pub"]);
const PACKAGE_NAME = /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/;

function parseCatalog(rawCatalog) {
  let category = null;
  const resources = [];
  for (const [index, line] of rawCatalog.split(/\r?\n/).entries()) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) { category = heading[1]; continue; }
    const bullet = line.match(/^- \[([^\]]+)\]\((https:\/\/[^)]+)\)$/);
    if (!bullet || !CATEGORY_ADAPTERS[category]) continue;
    const [name, officialUrl] = bullet.slice(1);
    const base = CATEGORY_ADAPTERS[category];
    const override = OVERRIDES[name] ?? {};
    resources.push({ name, officialUrl, category, sourceLine: index + 1, kind: override.kind ?? base.kind, mode: override.mode ?? base.mode, routerAnchor: override.routerAnchor ?? base.routerAnchor });
  }
  return resources;
}

function routerAnchors() {
  const text = readFileSync(ROUTER_PATH, "utf8");
  return new Set([...text.matchAll(/\*\*Anker:\*\*\s*`(#[a-z-]+)`/g)].map((match) => match[1]));
}

function nonPackage(resource) {
  const reason = resource.mode === "browser-research" ? "web-only research or learning source" : resource.mode === "selected-component" ? "registry or copy source; no source package is installed" : resource.mode === "export-local" ? "generator export, not a production package" : resource.mode === "download-local-with-license" ? "asset download, not a production package" : resource.mode === "adobe-kit-embed" ? "Adobe Fonts load via official kit embed, not as a package" : resource.mode === "self-host-after-license" ? "font files are self-hosted after license review" : resource.mode === "selected-icon-family" ? "web-only icon source; no verified package identity" : "official documentation or copied asset; no verified package identity";
  return Object.freeze({ status: "non-package", ecosystem: null, reason });
}

function targetProjectPlan(resource, identity) {
  if (identity.type !== "package") return null;
  return Object.freeze({
    target: "target project",
    condition: `Only after ${resource.routerAnchor} is selected and its Werkzeugtabelle row exists.`,
    ecosystem: identity.ecosystem,
    package: identity.package,
    requiredRuntimePeers: identity.requiredRuntimePeers,
    optionalCompanions: identity.optionalCompanions,
    action: "Use only these verified identities after the router gate; this lookup performs no package change.",
  });
}

function usePlan(resource) {
  const plans = {
    "selected-component": "Open the official source and select one component or section; do not add a whole kit.",
    "npm-after-router": "Read official documentation, repository, and license before the router-conditioned npm target-project step.",
    "pub-after-router": "Read official documentation, repository, and license before the router-conditioned pub target-project step.",
    "browser-research": "Use for research or learning only; do not treat demo code as production-ready without license and performance checks.",
    "export-local": "Export selected SVG or CSS locally, inspect scripts and external references, then version only that export.",
    "download-local-with-license": "Download one selected asset locally and document license, attribution, and client rights; do not hotlink.",
    "selected-icon-family": "Choose one icon family for the product and check icon and trademark rights before local use.",
    "adobe-kit-embed": "Load fonts via the official Adobe kit embed (use.typekit.net). Do not download or self-host Adobe webfont files.",
    "self-host-after-license": "Verify web-embedding rights, download only selected files, and self-host them.",
    "official-docs-only": "Use only for a native-app brief and verify platform compatibility in official documentation.",
  };
  return `${plans[resource.mode]} Follow ${resource.routerAnchor} in tool-usecase-router.md.`;
}

function adapter(resource) {
  const packageIdentity = PACKAGE_IDENTITIES[resource.name] ?? nonPackage(resource);
  return { ...resource, usePlan: usePlan(resource), packageIdentity, targetProjectPlan: targetProjectPlan(resource, packageIdentity) };
}

function pairHash(resources) {
  return createHash("sha256").update(resources.map(({ name, officialUrl }) => `${name}\t${officialUrl}`).sort().join("\n")).digest("hex");
}

function validateIdentity(resource, identity, failures) {
  if (!identity) { failures.push(`${resource.name}: package access metadata must be explicit`); return; }
  if (identity.status === "non-package") {
    if (identity.ecosystem !== null || !identity.reason) failures.push(`${resource.name}: invalid non-package metadata`);
    return;
  }
  if (!VALID_ECOSYSTEMS.has(identity.ecosystem) || !["package", "cli"].includes(identity.type) || !PACKAGE_NAME.test(identity.package) || !identity.source) failures.push(`${resource.name}: invalid package identity metadata`);
  if (identity.type === "package") {
    for (const field of ["requiredRuntimePeers", "optionalCompanions"]) {
      if (!Array.isArray(identity[field]) || identity[field].some((name) => !PACKAGE_NAME.test(name))) failures.push(`${resource.name}: invalid ${field}`);
    }
    if (identity.requiredRuntimePeers?.some((peer) => identity.optionalCompanions?.includes(peer))) failures.push(`${resource.name}: a runtime peer cannot be optional`);
    const plan = targetProjectPlan(resource, identity);
    if (!plan || plan.target !== "target project" || !plan.condition.includes(resource.routerAnchor) || !plan.condition.includes("Werkzeugtabelle") || plan.package !== identity.package || plan.requiredRuntimePeers !== identity.requiredRuntimePeers || plan.optionalCompanions !== identity.optionalCompanions) failures.push(`${resource.name}: missing router-conditioned target-project plan metadata`);
  }
}

function validate(resources) {
  const failures = [];
  const requested = resources.filter((resource) => resource.category !== INSPIRATION_CATEGORY);
  const extras = resources.filter((resource) => resource.category === INSPIRATION_CATEGORY);
  const names = resources.map(({ name }) => name);
  const urls = resources.map(({ officialUrl }) => officialUrl);
  const duplicateNames = names.filter((name, index) => names.indexOf(name) !== index);
  const duplicateUrls = urls.filter((url, index) => urls.indexOf(url) !== index);
  const anchors = routerAnchors();

  if (requested.length !== REQUESTED_CONTRACT.count) failures.push(`requested count is ${requested.length}, expected ${REQUESTED_CONTRACT.count}`);
  if (extras.length !== REQUESTED_CONTRACT.extraInspirationCount) failures.push(`extra inspiration count is ${extras.length}, expected ${REQUESTED_CONTRACT.extraInspirationCount}`);
  if (pairHash(requested) !== REQUESTED_CONTRACT.sha256) failures.push("requested name<TAB>officialUrl SHA-256 does not match the contract");
  if (duplicateNames.length) failures.push(`duplicate resource names: ${[...new Set(duplicateNames)].join(", ")}`);
  if (duplicateUrls.length) failures.push(`duplicate official URLs: ${[...new Set(duplicateUrls)].join(", ")}`);

  for (const resource of resources) {
    if (!/^https:\/\/[^\s]+$/.test(resource.officialUrl)) failures.push(`${resource.name}: invalid official URL`);
    if (!VALID_KINDS.has(resource.kind)) failures.push(`${resource.name}: invalid kind ${resource.kind}`);
    if (!VALID_MODES.has(resource.mode)) failures.push(`${resource.name}: invalid mode ${resource.mode}`);
    if (!anchors.has(resource.routerAnchor)) failures.push(`${resource.name}: unknown router anchor ${resource.routerAnchor}`);
    validateIdentity(resource, PACKAGE_IDENTITIES[resource.name] ?? nonPackage(resource), failures);
  }
  return failures;
}

const FETCH_TIMEOUT_MS = 20000;
const MIN_BODY_CHARS = 200;
const EXCERPT_CHARS = 480;

function siteMarkers(name, officialUrl) {
  const tokens = new Set();
  for (const part of String(name).toLowerCase().split(/[^a-z0-9]+/)) {
    if (part.length >= 3) tokens.add(part);
  }
  try {
    const host = new URL(officialUrl).hostname.replace(/^www\./, "");
    const labels = host.split(".");
    const first = labels[0] || "";
    if (first.length >= 3 && first !== "www") tokens.add(first);
    if (labels.length >= 3 && first.length <= 3 && (labels[1] || "").length >= 3) tokens.add(labels[1]);
  } catch {
    /* catalog URL already validated as https */
  }
  return [...tokens];
}

function findMarker(body, markers) {
  const lower = String(body).toLowerCase();
  return markers.find((token) => lower.includes(token)) ?? null;
}

function excerptAround(body, marker) {
  const text = String(body).replace(/\s+/g, " ").trim();
  if (!text) return "";
  if (!marker) return text.slice(0, EXCERPT_CHARS);
  const at = text.toLowerCase().indexOf(marker.toLowerCase());
  if (at < 0) return text.slice(0, EXCERPT_CHARS);
  const start = Math.max(0, at - 80);
  return text.slice(start, start + EXCERPT_CHARS);
}

function loginWallOnly(body, marker) {
  const text = String(body);
  if (marker) return false;
  if (text.trim().length >= MIN_BODY_CHARS) return false;
  return /log[\s-]?in|sign[\s-]?in|anmelden/i.test(text);
}

async function readViaFetch(url) {
  const res = await fetch(url, {
    redirect: "follow",
    headers: {
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "user-agent": "raphael-web-resource-open/1.0",
    },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  const body = await res.text();
  return { channel: "fetch", httpStatus: res.status, finalUrl: res.url || url, body };
}

function readViaFirecrawl(url) {
  const run = spawnSync("firecrawl", ["scrape", url, "-f", "markdown", "--only-main-content"], {
    encoding: "utf8",
    timeout: 60000,
  });
  if (run.error) throw new Error(`firecrawl missing: ${run.error.message}`);
  if (run.status !== 0) {
    const detail = `${run.stderr || ""}${run.stdout || ""}`.split("\n").find(Boolean) || `exit ${run.status}`;
    throw new Error(`firecrawl failed: ${detail}`);
  }
  return { channel: "firecrawl", httpStatus: 200, finalUrl: url, body: run.stdout || "" };
}

async function openOfficialPage(resource) {
  const markers = siteMarkers(resource.name, resource.officialUrl);
  let lastError = "";
  let page = null;
  try {
    page = await readViaFetch(resource.officialUrl);
  } catch (error) {
    lastError = error instanceof Error ? error.message : String(error);
  }
  const fetchOk = page && page.httpStatus >= 200 && page.httpStatus < 400;
  const fetchMarker = page ? findMarker(page.body, markers) : null;
  if (page && fetchOk && loginWallOnly(page.body, fetchMarker)) {
    throw new Error(`empty or login-wall body without site marker from ${resource.officialUrl}`);
  }
  if (page && fetchOk && !fetchMarker) {
    throw new Error(`fetched ${resource.officialUrl} but found no site marker (${markers.join(", ") || "none"})`);
  }
  if (!fetchOk || !page) {
    try {
      page = readViaFirecrawl(resource.officialUrl);
    } catch (error) {
      const firecrawlError = error instanceof Error ? error.message : String(error);
      const why = lastError ? `${lastError}; ${firecrawlError}` : firecrawlError;
      const fail = new Error(`HOST_UNAVAILABLE ${resource.name} ${resource.officialUrl} (${why})`);
      fail.code = "HOST_UNAVAILABLE";
      throw fail;
    }
  }
  const marker = findMarker(page.body, markers);
  if (!marker || loginWallOnly(page.body, marker)) {
    throw new Error(`empty or login-wall body without site marker from ${resource.officialUrl}`);
  }
  const body = String(page.body);
  return Object.freeze({
    url: resource.officialUrl,
    finalUrl: page.finalUrl,
    channel: page.channel,
    httpStatus: page.httpStatus,
    bytes: Buffer.byteLength(body),
    marker,
    excerpt: excerptAround(body, marker),
  });
}

function usage(message) {
  if (message) console.error(message);
  console.error("usage: resource-access.mjs check | show <exakter-Name> [--json] | open <exakter-Name> [--json]");
  process.exit(2);
}

function loadCatalogOrDie() {
  const resources = parseCatalog(readFileSync(CATALOG_PATH, "utf8"));
  const failures = validate(resources);
  if (failures.length) {
    console.error("Resource access: FAIL");
    for (const failure of failures) console.error(`  - ${failure}`);
    process.exit(1);
  }
  return resources;
}

function printShow(item, json) {
  if (json) console.log(JSON.stringify(item, null, 2));
  else {
    console.log(`${item.name}\n  URL: ${item.officialUrl}\n  Kategorie: ${item.category}\n  Modus: ${item.mode} (${item.routerAnchor})\n  Plan: ${item.usePlan}`);
    if (item.packageIdentity.status === "non-package") console.log(`  Paketidentität: keine (${item.packageIdentity.reason})`);
    else console.log(`  Paketidentität: ${item.packageIdentity.ecosystem}/${item.packageIdentity.type} ${item.packageIdentity.package} (${item.packageIdentity.source})`);
  }
}

function printOpen(item, opened, json) {
  if (json) console.log(JSON.stringify({ ...item, opened }, null, 2));
  else {
    console.log(`${item.name}\n  URL: ${opened.url}\n  Final: ${opened.finalUrl}\n  Kanal: ${opened.channel}\n  Status: ${opened.httpStatus}\n  Marker: ${opened.marker}\n  Bytes: ${opened.bytes}\n  Gelesen: ${opened.excerpt}`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const command = args.shift();
  if (command === "--help" || command === "-h" || command === "help") {
    console.log(`resource-access.mjs — Einzelzugriff auf den Katalog

usage:
  node resource-access.mjs check
  node resource-access.mjs show <exakter-Name> [--json]
  node resource-access.mjs open <exakter-Name> [--json]

check  Katalog + Router-Anker + Paketmetadaten (lokal, kein Netz)
show   genau einen Eintrag (lokal, kein Netz)
open   Katalog-URL öffnen und Site lesen (Fetch, sonst Firecrawl)`);
    process.exit(0);
  }
  const json = args.includes("--json");
  const cleanArgs = args.filter((arg) => arg !== "--json");
  if (!command || args.length !== cleanArgs.length + (json ? 1 : 0)) usage();

  const resources = loadCatalogOrDie();

  if (command === "check") {
    if (cleanArgs.length || json) usage("check accepts no arguments");
    console.log(`Resource access: OK (${REQUESTED_CONTRACT.count} requested + ${REQUESTED_CONTRACT.extraInspirationCount} extra inspiration sources; sorted pair SHA-256; router and package metadata valid)`);
    process.exit(0);
  }
  if (command === "show") {
    if (cleanArgs.length !== 1) usage("show requires one exact resource name");
    const resource = resources.find(({ name }) => name === cleanArgs[0]);
    if (!resource) { console.error(`Resource not found: ${cleanArgs[0]}`); process.exit(1); }
    printShow(adapter(resource), json);
    process.exit(0);
  }
  if (command === "open") {
    if (cleanArgs.length !== 1) usage("open requires one exact resource name");
    const resource = resources.find(({ name }) => name === cleanArgs[0]);
    if (!resource) { console.error(`Resource not found: ${cleanArgs[0]}`); process.exit(1); }
    const item = adapter(resource);
    try {
      const opened = await openOfficialPage(resource);
      printOpen(item, opened, json);
      process.exit(0);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (error && error.code === "HOST_UNAVAILABLE") {
        console.error(`Resource open: HOST_UNAVAILABLE`);
        console.error(`  name: ${resource.name}`);
        console.error(`  url: ${resource.officialUrl}`);
        console.error(`  error: ${message}`);
        process.exit(3);
      }
      console.error(`Resource open: FAIL`);
      console.error(`  name: ${resource.name}`);
      console.error(`  url: ${resource.officialUrl}`);
      console.error(`  error: ${message}`);
      process.exit(1);
    }
  }
  usage(`Unknown command: ${command}`);
}

export {
  parseCatalog,
  adapter,
  openOfficialPage,
  siteMarkers,
  CATALOG_PATH,
};

const invokedDirectly = Boolean(process.argv[1]) && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
if (invokedDirectly) await main();
