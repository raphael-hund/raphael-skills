import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

export function loadPlaywright() {
  const candidates = [
    "playwright",
    // Global installiert — der Pfad, den die uebrigen Browser-Werkzeuge des
    // Skills (craft-check, axe-run, formular-check, shot-sweep) fest
    // verdrahtet haben. Gemessen 31.07.2026: er ist der EINZIGE, der auf
    // diesem Rechner existiert. Ohne ihn meldeten alle sechs
    // Browser-Klon-Werkzeuge "Playwright not found" und waren unbenutzbar,
    // waehrend dieselbe Bibliothek zwei Ordner weiter taeglich lief.
    "/usr/lib/node_modules/playwright",
    // Lokale Vendor-Kopie, falls das Klon-Repo einmal eigene Abhaengigkeiten
    // mitbringt. Existiert auf diesem Rechner nicht — bleibt als Fallback.
    "/root/tools/vendor/claude-skill-web-clone/node_modules/playwright",
  ];
  for (const candidate of candidates) {
    try {
      return require(candidate);
    } catch {
      // Try next candidate.
    }
  }
  throw new Error("Playwright not found. Run `npm install -D playwright` in the clone project, or install the Browser skill dependencies.");
}

export async function launchChromium(chromium) {
  try {
    return await chromium.launch({ headless: true });
  } catch (firstError) {
    try {
      return await chromium.launch({ headless: true, channel: "chrome" });
    } catch {
      throw firstError;
    }
  }
}
