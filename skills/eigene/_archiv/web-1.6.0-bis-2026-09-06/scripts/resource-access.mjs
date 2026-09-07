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
 *   node resource-access.mjs show <Name|Katalog-URL> [--json]
 *   node resource-access.mjs open <Name|Katalog-URL> [--url <Detail-URL>] [--out <absoluter-Pfad>] [--json]
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const CATALOG_PATH = join(HERE, "..", "references", "frontend-referenzbibliothek.md");
const ROUTER_PATH = join(HERE, "..", "references", "tool-usecase-router.md");
const INSPIRATION_CATEGORY = "Website- und UI-Inspiration";
const TOOLS_CATEGORY = "Werkzeuge und Spezialanwendungen";

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
  [TOOLS_CATEGORY]: Object.freeze({ kind: "research-source", mode: "official-docs-only", routerAnchor: "#tools" }),
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
  tsParticles: { ecosystem: "npm", type: "package", package: "@tsparticles/react", requiredRuntimePeers: [], optionalCompanions: [], source: "official tsParticles package" },
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
    const bullet = line.match(/^- \[([^\]]+)\]\(([^)]+)\)$/);
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
    condition: `Only after ${resource.routerAnchor} is selected for the current project.`,
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
  const plan = resource.category === TOOLS_CATEGORY
    ? "Read the named tool's official documentation for the concrete project need; do not infer an unverified registry or package."
    : plans[resource.mode];
  return `${plan} Follow ${resource.routerAnchor} in tool-usecase-router.md.`;
}

function adapter(resource) {
  const packageIdentity = PACKAGE_IDENTITIES[resource.name] ?? nonPackage(resource);
  return { ...resource, usePlan: usePlan(resource), packageIdentity, targetProjectPlan: targetProjectPlan(resource, packageIdentity) };
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
    if (!plan || plan.target !== "target project" || !plan.condition.includes(resource.routerAnchor) || plan.package !== identity.package || plan.requiredRuntimePeers !== identity.requiredRuntimePeers || plan.optionalCompanions !== identity.optionalCompanions) failures.push(`${resource.name}: missing router-conditioned target-project plan metadata`);
  }
}

function parsedHttpsUrl(value) {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "https:" || !parsed.hostname || parsed.username || parsed.password) return null;
    return parsed;
  } catch {
    return null;
  }
}

function normalizedHost(value) {
  const parsed = value instanceof URL ? value : parsedHttpsUrl(value);
  return parsed ? parsed.hostname.toLowerCase().replace(/^www\./, "") : null;
}

function catalogUrlKey(value) {
  const parsed = parsedHttpsUrl(value);
  if (!parsed) return null;
  parsed.hash = "";
  parsed.hostname = normalizedHost(parsed);
  parsed.pathname = parsed.pathname.replace(/\/+$/, "") || "/";
  return parsed.toString();
}

function validate(resources) {
  const failures = [];
  const names = resources.map(({ name }) => name.trim().toLowerCase());
  const urls = resources.map(({ officialUrl }) => catalogUrlKey(officialUrl) ?? officialUrl);
  const duplicateNames = names.filter((name, index) => names.indexOf(name) !== index);
  const duplicateUrls = urls.filter((url, index) => urls.indexOf(url) !== index);
  const anchors = routerAnchors();
  const validEntries = resources.filter((resource) => {
    const parsed = parsedHttpsUrl(resource.officialUrl);
    return parsed
      && !/\s/.test(resource.officialUrl)
      && (!parsed.port || parsed.port === "443")
      && VALID_KINDS.has(resource.kind)
      && VALID_MODES.has(resource.mode)
      && anchors.has(resource.routerAnchor);
  });

  if (!validEntries.length) failures.push("catalog has zero valid resource entries");
  if (duplicateNames.length) failures.push(`duplicate resource names: ${[...new Set(duplicateNames)].join(", ")}`);
  if (duplicateUrls.length) failures.push(`duplicate official URLs: ${[...new Set(duplicateUrls)].join(", ")}`);

  for (const resource of resources) {
    const parsedUrl = parsedHttpsUrl(resource.officialUrl);
    if (!parsedUrl || /\s/.test(resource.officialUrl) || (parsedUrl.port && parsedUrl.port !== "443")) failures.push(`${resource.name}: invalid official URL`);
    if (!VALID_KINDS.has(resource.kind)) failures.push(`${resource.name}: invalid kind ${resource.kind}`);
    if (!VALID_MODES.has(resource.mode)) failures.push(`${resource.name}: invalid mode ${resource.mode}`);
    if (!anchors.has(resource.routerAnchor)) failures.push(`${resource.name}: unknown router anchor ${resource.routerAnchor}`);
    validateIdentity(resource, PACKAGE_IDENTITIES[resource.name] ?? nonPackage(resource), failures);
  }
  return failures;
}

const FETCH_TIMEOUT_MS = 20000;
const MIN_CONTENT_CHARS = 120;
const MIN_CONTENT_WORDS = 18;
const MIN_UNIQUE_WORDS = 10;
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

function normalizeReadableText(value) {
  return String(value)
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.replace(/[\t\f\v ]+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function decodeHtmlEntities(value) {
  const named = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: '"' };
  return String(value).replace(/&(#x[0-9a-f]+|#[0-9]+|amp|apos|gt|lt|nbsp|quot);/gi, (entity, key) => {
    const lower = key.toLowerCase();
    if (lower.startsWith("#")) {
      const point = Number.parseInt(lower.slice(lower.startsWith("#x") ? 2 : 1), lower.startsWith("#x") ? 16 : 10);
      return Number.isInteger(point) && point >= 0 && point <= 0x10ffff ? String.fromCodePoint(point) : entity;
    }
    return named[lower] ?? entity;
  });
}

function htmlToReadableText(html) {
  const withoutNonContent = String(html)
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style|noscript|template|svg)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, " ")
    .replace(/<(?:br|hr)\b[^>]*>/gi, "\n")
    .replace(/<\/(?:article|aside|blockquote|dd|div|dl|dt|figcaption|figure|footer|form|h[1-6]|header|li|main|nav|ol|p|pre|section|table|td|th|tr|ul)\s*>/gi, "\n")
    .replace(/<[^>]+>/g, " ");
  return normalizeReadableText(decodeHtmlEntities(withoutNonContent));
}

function readableContent(body, contentType = "") {
  const raw = String(body);
  const htmlLike = /(?:text\/html|application\/xhtml\+xml)/i.test(contentType)
    || /<!doctype\s+html|<html\b|<body\b|<main\b|<article\b/i.test(raw);
  return htmlLike ? htmlToReadableText(raw) : normalizeReadableText(raw);
}

function contentStats(content) {
  const words = String(content).match(/[\p{L}\p{N}][\p{L}\p{N}'’._/-]*/gu) ?? [];
  const uniqueWords = new Set(words.map((word) => word.toLowerCase()));
  return { chars: String(content).length, words: words.length, uniqueWords: uniqueWords.size };
}

function blockedContentReason(content, rawBody, httpStatus) {
  if (httpStatus === 401) return "upstream requires authentication (HTTP 401)";
  if (httpStatus === 403) return "upstream denied access (HTTP 403)";

  const text = String(content);
  const raw = String(rawBody);
  const titleText = htmlToReadableText(raw.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
  const sourceCues = text.match(/\b(?:component|documentation|example|installation|usage|source code|copy and paste|props)\b/gi) ?? [];
  const accountLoginTitle = /^(?:log[\s-]?in|sign[\s-]?in)(?:\s*(?:[|—:-]|\bto\b).*)?$/i.test(titleText);
  const documentedExample = (!accountLoginTitle && /\b(?:component|documentation|guide|template)\b/i.test(titleText))
    || (/<(?:pre|code)\b/i.test(raw) && sourceCues.length >= 1)
    || (text.length >= 800 && sourceCues.length >= 2 && contentStats(text).uniqueWords >= 30);
  const passwordForm = /<input\b[^>]*\btype\s*=\s*["']?password\b/i.test(raw);
  const authCue = /\b(?:log[\s-]?in|sign[\s-]?in|anmelden|authentication|required account)\b/i.test(text);
  if (passwordForm && authCue && !documentedExample) return "authentication form instead of source content";

  const checkpoint = [
    /\b(?:security|account|identity) checkpoint\b/i,
    /\b(?:complete|pass) (?:the )?(?:security|human) check\b/i,
    /\bverify (?:that )?you(?:'re| are) (?:a )?human\b/i,
    /\bchecking (?:your )?browser before accessing\b/i,
    /\b(?:captcha|cf-chl-|challenge-platform|cloudflare ray id)\b/i,
  ].find((pattern) => pattern.test(text) || pattern.test(raw));
  if (checkpoint) return "security checkpoint instead of source content";

  const parkedDomain = [
    /\bthis domain(?: name)? is (?:available )?for sale\b/i,
    /\bbuy this domain\b/i,
    /\bmake an offer (?:for|on) this domain\b/i,
    /\bdomain (?:brokerage|parking service)\b/i,
  ].find((pattern) => pattern.test(text));
  if (parkedDomain) return "domain-sale page instead of source content";

  const titleWall = /\b(?:access denied|security checkpoint)\b/i.test(titleText)
    || /\bdomain(?: name)? (?:is )?(?:available )?for sale\b/i.test(titleText)
    || (accountLoginTitle && !documentedExample);
  const shortAuthWall = text.length < 1200
    && /\b(?:log[\s-]?in|sign[\s-]?in) to (?:continue|view|access)\b/i.test(text);
  const shortPaywall = text.length < 1200
    && /\b(?:subscribe|upgrade) to (?:continue|read|view|access)\b/i.test(text);
  if (titleWall || shortAuthWall || shortPaywall) return "access wall instead of source content";
  return null;
}

function accessError(code, classification, message, details = {}) {
  return Object.assign(new Error(message), { code, classification, ...details });
}

function assertAllowedTargetUrl(resource, requestedUrl = resource.officialUrl) {
  const official = parsedHttpsUrl(resource.officialUrl);
  const target = parsedHttpsUrl(requestedUrl);
  if (!official || !target || (target.port && target.port !== "443")) {
    throw accessError("INVALID_DETAIL_URL", "WRONG", "detail URL must be an absolute HTTPS URL without credentials or a non-standard port");
  }
  if (normalizedHost(official) !== normalizedHost(target)) {
    throw accessError(
      "INVALID_DETAIL_URL",
      "WRONG",
      `detail URL host ${target.hostname} does not match catalog host ${official.hostname} (www is ignored)`,
    );
  }
  return target.toString();
}

function responseContentType(response) {
  return response?.headers && typeof response.headers.get === "function"
    ? response.headers.get("content-type") || ""
    : "";
}

async function readViaFetch(url, fetchImpl = globalThis.fetch) {
  if (typeof fetchImpl !== "function") throw new Error("fetch is unavailable");
  const res = await fetchImpl(url, {
    redirect: "follow",
    headers: {
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "user-agent": "raphael-web-resource-open/1.0",
    },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  const body = await res.text();
  return {
    channel: "fetch",
    httpStatus: Number.isInteger(res.status) ? res.status : null,
    finalUrl: res.url || url,
    contentType: responseContentType(res),
    body,
  };
}

function firecrawlEnv() {
  // Keyless laeuft in das Free-Tier-Ratenlimit (8 Bot-Wall-Sites am 04.09.2026 nur mit Key lesbar).
  if (process.env.FIRECRAWL_API_KEY) return process.env;
  try {
    const line = readFileSync("/root/.secrets/api-keys.env", "utf8").split("\n")
      .map((l) => l.replace(/^export\s+/, "")).find((l) => l.startsWith("FIRECRAWL_API_KEY="));
    if (line) return { ...process.env, FIRECRAWL_API_KEY: line.slice("FIRECRAWL_API_KEY=".length).trim().replace(/^["']|["']$/g, "") };
  } catch { /* ohne Key weiter */ }
  return process.env;
}

function readViaFirecrawl(url) {
  const run = spawnSync("firecrawl", ["scrape", url, "-f", "markdown", "--only-main-content"], {
    encoding: "utf8",
    timeout: 60000,
    env: firecrawlEnv(),
  });
  if (run.error) throw new Error(`firecrawl missing: ${run.error.message}`);
  if (run.status !== 0) {
    const detail = `${run.stderr || ""}${run.stdout || ""}`.split("\n").find(Boolean) || `exit ${run.status}`;
    throw new Error(`firecrawl failed: ${detail}`);
  }
  return {
    channel: "firecrawl",
    httpStatus: null,
    finalUrl: url,
    contentType: "text/markdown",
    body: run.stdout || "",
  };
}

function upstreamHttpFailure(resource, targetUrl, status) {
  const blocked = status === 401 || status === 403;
  return accessError(
    blocked ? "CONTENT_BLOCKED" : "UPSTREAM_HTTP",
    blocked ? "BLOCKED" : "UPSTREAM_HTTP",
    `upstream returned HTTP ${status} for ${targetUrl}`,
    { httpStatus: status, resourceName: resource.name, url: targetUrl },
  );
}

function inspectPage(resource, targetUrl, page) {
  if (Number.isInteger(page.httpStatus) && (page.httpStatus < 200 || page.httpStatus >= 300)) {
    throw upstreamHttpFailure(resource, targetUrl, page.httpStatus);
  }

  const finalUrl = parsedHttpsUrl(page.finalUrl || targetUrl);
  if (!finalUrl || (finalUrl.port && finalUrl.port !== "443") || normalizedHost(finalUrl) !== normalizedHost(targetUrl)) {
    throw accessError(
      "UNEXPECTED_REDIRECT",
      "WRONG",
      `source redirected outside the selected catalog host: ${page.finalUrl || "(unknown)"}`,
      { httpStatus: page.httpStatus ?? null },
    );
  }

  const contentType = String(page.contentType || "");
  if (contentType && !/^(?:text\/|application\/(?:[a-z0-9.+-]*\+)?(?:json|xml)|application\/(?:javascript|xhtml\+xml|markdown))/i.test(contentType)) {
    throw accessError(
      "WRONG_CONTENT_TYPE",
      "WRONG",
      `source returned non-readable content type ${contentType}`,
      { httpStatus: page.httpStatus ?? null },
    );
  }

  const body = String(page.body || "");
  const content = readableContent(body, contentType);
  const blockedReason = blockedContentReason(content, body, page.httpStatus);
  if (blockedReason) {
    throw accessError(
      "CONTENT_BLOCKED",
      "BLOCKED",
      `${blockedReason} from ${targetUrl}`,
      { httpStatus: page.httpStatus ?? null },
    );
  }

  const stats = contentStats(content);
  if (stats.chars < MIN_CONTENT_CHARS || stats.words < MIN_CONTENT_WORDS || stats.uniqueWords < MIN_UNIQUE_WORDS) {
    throw accessError(
      "CONTENT_EMPTY",
      "EMPTY",
      `source returned too little readable content from ${targetUrl} (chars=${stats.chars}, words=${stats.words}, unique=${stats.uniqueWords})`,
      { httpStatus: page.httpStatus ?? null, stats },
    );
  }

  const markers = siteMarkers(resource.name, resource.officialUrl);
  const marker = findMarker(content, markers);
  const contentSha256 = createHash("sha256").update(content).digest("hex");
  return Object.freeze({
    url: targetUrl,
    finalUrl: finalUrl.toString(),
    channel: page.channel,
    httpStatus: page.httpStatus ?? null,
    contentType: contentType || null,
    bytes: Buffer.byteLength(content),
    rawBytes: Buffer.byteLength(body),
    contentSha256,
    marker,
    readStatus: "CONTENT_READ",
    successMeaning: "Source text was fetched and returned. This does not prove visual inspection or application in a project.",
    excerpt: excerptAround(content, marker),
    content,
  });
}

function preferredFailure(resource, targetUrl, fetchFailure, fallbackFailure) {
  const semanticCodes = new Set([
    "CONTENT_BLOCKED",
    "CONTENT_EMPTY",
    "INVALID_DETAIL_URL",
    "UNEXPECTED_REDIRECT",
    "UPSTREAM_HTTP",
    "WRONG_CONTENT_TYPE",
  ]);
  if (fetchFailure && semanticCodes.has(fetchFailure.code)) {
    fetchFailure.fallbackError = fallbackFailure instanceof Error ? fallbackFailure.message : String(fallbackFailure || "");
    return fetchFailure;
  }
  if (fallbackFailure && semanticCodes.has(fallbackFailure.code)) return fallbackFailure;
  const fetchMessage = fetchFailure instanceof Error ? fetchFailure.message : String(fetchFailure || "fetch failed");
  const fallbackMessage = fallbackFailure instanceof Error ? fallbackFailure.message : String(fallbackFailure || "Firecrawl failed");
  return accessError(
    "HOST_UNAVAILABLE",
    "HOST_UNAVAILABLE",
    `neither fetch nor Firecrawl returned readable source content for ${resource.name} ${targetUrl} (${fetchMessage}; ${fallbackMessage})`,
    { httpStatus: null },
  );
}

async function openOfficialPage(resource, options = {}) {
  const targetUrl = assertAllowedTargetUrl(resource, options.url ?? resource.officialUrl);
  const fetchImpl = options.fetchImpl ?? globalThis.fetch;
  const firecrawlReader = options.firecrawlReader ?? readViaFirecrawl;
  let fetchFailure = null;
  try {
    const page = await readViaFetch(targetUrl, fetchImpl);
    return inspectPage(resource, targetUrl, page);
  } catch (error) {
    fetchFailure = error;
  }

  let fallbackFailure = null;
  try {
    const page = await firecrawlReader(targetUrl);
    return inspectPage(resource, targetUrl, page);
  } catch (error) {
    fallbackFailure = error;
  }
  throw preferredFailure(resource, targetUrl, fetchFailure, fallbackFailure);
}

function usage(message) {
  if (message) console.error(message);
  console.error("usage: resource-access.mjs check | show <Name|Katalog-URL> [--json] | open <Name|Katalog-URL> [--url <Detail-URL>] [--out <absoluter-Pfad>] [--json]");
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

function resolveResource(resources, query) {
  const normalizedName = String(query).normalize("NFKC").trim().toLowerCase();
  const byName = resources.find(({ name }) => name.normalize("NFKC").trim().toLowerCase() === normalizedName);
  if (byName) return byName;
  const urlKey = catalogUrlKey(query);
  if (!urlKey) return null;
  return resources.find(({ officialUrl }) => catalogUrlKey(officialUrl) === urlKey) ?? null;
}

function saveOpenedContent(opened, outPath) {
  if (!isAbsolute(outPath)) {
    throw accessError("INVALID_OUTPUT_PATH", "WRONG", "--out requires an absolute path");
  }
  writeFileSync(outPath, opened.content, "utf8");
  return outPath;
}

function printOpen(item, opened, json, savedTo = null) {
  const result = savedTo ? { ...opened, savedTo } : opened;
  if (json) console.log(JSON.stringify({ ...item, opened: result }, null, 2));
  else {
    const status = opened.httpStatus === null ? "unbekannt (Provider meldet keinen HTTP-Status)" : opened.httpStatus;
    console.log(`${item.name}\n  URL: ${opened.url}\n  Final: ${opened.finalUrl}\n  Kanal: ${opened.channel}\n  HTTP-Status: ${status}\n  Bytes: ${opened.bytes}\n  SHA-256: ${opened.contentSha256}\n  Erfolg: ${opened.readStatus} — ${opened.successMeaning}`);
    if (savedTo) console.log(`  Gespeichert: ${savedTo}`);
    else console.log(`\n--- Gelesener Quellinhalt ---\n${opened.content}`);
  }
}

function parseCommandArgs(args) {
  const options = { json: false, url: null, out: null };
  const positional = [];
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg === "--json") {
      if (options.json) usage("--json may be supplied only once");
      options.json = true;
      continue;
    }
    if (arg === "--url" || arg === "--out") {
      const key = arg.slice(2);
      if (options[key] !== null) usage(`${arg} may be supplied only once`);
      const value = args[++index];
      if (!value || value.startsWith("--")) usage(`${arg} requires a value`);
      options[key] = value;
      continue;
    }
    if (arg.startsWith("--")) usage(`Unknown option: ${arg}`);
    positional.push(arg);
  }
  return { positional, options };
}

async function main() {
  const args = process.argv.slice(2);
  const command = args.shift();
  if (command === "--help" || command === "-h" || command === "help") {
    console.log(`resource-access.mjs — Einzelzugriff auf den Katalog

usage:
  node resource-access.mjs check
  node resource-access.mjs show <Name|Katalog-URL> [--json]
  node resource-access.mjs open <Name|Katalog-URL> [--url <Detail-URL>] [--out <absoluter-Pfad>] [--json]

check  Katalog + Router-Anker + Paketmetadaten (lokal, kein Netz)
show   genau einen Eintrag per Name oder exakter Katalog-URL (lokal, kein Netz)
open   Katalog- oder gleichnamige Detail-URL lesen (Fetch, sonst Firecrawl);
       CONTENT_READ belegt Textzugriff, keine visuelle Sichtung oder Projektanwendung`);
    process.exit(0);
  }
  if (!command) usage();
  const { positional, options } = parseCommandArgs(args);

  const resources = loadCatalogOrDie();

  if (command === "check") {
    if (positional.length || options.json || options.url || options.out) usage("check accepts no arguments");
    console.log(`Resource access: OK (${resources.length} catalog entries; URLs, metadata, router anchors and uniqueness valid)`);
    process.exit(0);
  }
  if (command === "show") {
    if (positional.length !== 1 || options.url || options.out) usage("show requires one resource name or catalog URL; only --json is optional");
    const resource = resolveResource(resources, positional[0]);
    if (!resource) { console.error(`Resource not found in catalog: ${positional[0]}`); process.exit(1); }
    printShow(adapter(resource), options.json);
    process.exit(0);
  }
  if (command === "open") {
    if (positional.length !== 1) usage("open requires one resource name or catalog URL");
    if (options.out && !isAbsolute(options.out)) usage("--out requires an absolute path");
    const resource = resolveResource(resources, positional[0]);
    if (!resource) { console.error(`Resource not found in catalog: ${positional[0]}`); process.exit(1); }
    const item = adapter(resource);
    try {
      const opened = await openOfficialPage(resource, { url: options.url ?? resource.officialUrl });
      const savedTo = options.out ? saveOpenedContent(opened, options.out) : null;
      printOpen(item, opened, options.json, savedTo);
      process.exit(0);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const classification = error?.classification || "ERROR";
      console.error(`Resource open: ${classification}`);
      console.error(`  name: ${resource.name}`);
      console.error(`  url: ${options.url ?? resource.officialUrl}`);
      if (Number.isInteger(error?.httpStatus)) console.error(`  upstream HTTP: ${error.httpStatus}`);
      console.error(`  error: ${message}`);
      if (error?.code === "INVALID_DETAIL_URL") process.exit(2);
      if (classification === "HOST_UNAVAILABLE" || classification === "UPSTREAM_HTTP") process.exit(3);
      if (classification === "BLOCKED") process.exit(4);
      process.exit(1);
    }
  }
  usage(`Unknown command: ${command}`);
}

export {
  parseCatalog,
  validate,
  adapter,
  openOfficialPage,
  resolveResource,
  assertAllowedTargetUrl,
  readableContent,
  saveOpenedContent,
  siteMarkers,
  CATALOG_PATH,
};

const invokedDirectly = Boolean(process.argv[1]) && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
if (invokedDirectly) await main();
