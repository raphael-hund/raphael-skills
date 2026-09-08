#!/usr/bin/env node
// Deterministische Regressionen für den echten resource-access-Pfad.
// Der Standardlauf nutzt ausschließlich kontrollierte Fetch-/Firecrawl-Fixtures.
// Provider-Ausfälle können daher keinen positiven Inhaltszugriff ersetzen.
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  CATALOG_PATH,
  adapter,
  assertAllowedTargetUrl,
  openOfficialPage,
  parseCatalog,
  resolveResource,
  saveOpenedContent,
  validate,
} from "../scripts/resource-access.mjs";

const HIER = path.dirname(fileURLToPath(import.meta.url));
const ACCESS = path.join(HIER, "..", "scripts", "resource-access.mjs");
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "resource-open-check-"));

let fehler = 0;
let geprueft = 0;

function zeile(ok, text, detail = "") {
  geprueft++;
  if (!ok) fehler++;
  console.log(`  [${ok ? "OK" : "!!"}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
}

function fixtureFetch({ body, status = 200, finalUrl = null, contentType = "text/html; charset=utf-8" }) {
  const calls = [];
  const fake = async (url) => {
    calls.push(url);
    return {
      status,
      url: finalUrl ?? url,
      headers: { get: (name) => name.toLowerCase() === "content-type" ? contentType : null },
      text: async () => body,
    };
  };
  fake.calls = calls;
  return fake;
}

function unavailableFirecrawl(label = "fixture forbids provider access") {
  const calls = [];
  const fake = (url) => {
    calls.push(url);
    throw new Error(label);
  };
  fake.calls = calls;
  return fake;
}

async function expectReject(label, expectedCode, run, extraCheck = () => true) {
  try {
    await run();
    zeile(false, label, `accepted; expected ${expectedCode}`);
  } catch (error) {
    const ok = error?.code === expectedCode && extraCheck(error);
    zeile(ok, label, `${error?.classification || "unclassified"}/${error?.code || "no-code"}: ${error?.message || error}`);
  }
}

function expectThrow(label, expectedCode, run) {
  try {
    run();
    zeile(false, label, `accepted; expected ${expectedCode}`);
  } catch (error) {
    zeile(error?.code === expectedCode, label, `${error?.classification || "unclassified"}/${error?.code || "no-code"}: ${error?.message || error}`);
  }
}

try {
  const catalog = parseCatalog(fs.readFileSync(CATALOG_PATH, "utf8"));
  const catalogFailures = validate(catalog);
  zeile(catalog.length > 0, "Katalog enthält mindestens einen gültig geparsten Eintrag", `${catalog.length} Einträge`);
  zeile(catalogFailures.length === 0, "Katalogprüfung ist dynamisch und vollständig grün", catalogFailures.join("; "));

  const minimalCatalog = parseCatalog("## Gradients, SVGs und Hintergründe\n- [Fixture Source](https://fixture.example/docs)");
  zeile(
    minimalCatalog.length === 1 && validate(minimalCatalog).length === 0,
    "ein gültiger Eintrag besteht ohne historischen Count-/Hash-Vertrag",
  );
  zeile(
    validate([]).some((failure) => /zero valid resource entries/.test(failure)),
    "null gültige Einträge schlagen explizit fehl",
  );
  const duplicateFailures = validate([
    minimalCatalog[0],
    { ...minimalCatalog[0], name: minimalCatalog[0].name.toUpperCase() },
  ]);
  zeile(
    duplicateFailures.some((failure) => /duplicate resource names/.test(failure))
      && duplicateFailures.some((failure) => /duplicate official URLs/.test(failure)),
    "case-insensitive Namen- und kanonische URL-Duplikate bleiben Fehler",
  );
  const invalidUrlCatalog = parseCatalog("## Gradients, SVGs und Hintergründe\n- [Invalid Fixture](http://fixture.example/docs)");
  const invalidUrlFailures = validate(invalidUrlCatalog);
  zeile(
    invalidUrlFailures.some((failure) => /invalid official URL/.test(failure))
      && invalidUrlFailures.some((failure) => /zero valid resource entries/.test(failure)),
    "ungültige URL wird nicht still übersprungen und zählt nicht als gültiger Eintrag",
  );
  const invalidMetadataFailures = validate([{
    ...minimalCatalog[0],
    kind: "guessed-registry",
    routerAnchor: "#missing",
  }]);
  zeile(
    invalidMetadataFailures.some((failure) => /invalid kind/.test(failure))
      && invalidMetadataFailures.some((failure) => /unknown router anchor/.test(failure)),
    "Metadaten- und Router-Anker-Prüfungen bleiben erhalten",
  );

  const spline = resolveResource(catalog, "Spline");
  zeile(Boolean(spline), "Fixture-Ressource Spline ist im Katalog");
  if (!spline) throw new Error("Spline fixture cannot continue without its catalog row");

  zeile(resolveResource(catalog, "sPlInE") === spline, "Namens-Lookup ist case-insensitive");
  zeile(
    resolveResource(catalog, "https://www.spline.design") === spline,
    "Katalog-URL-Lookup normalisiert www und Root-Slash",
  );
  zeile(resolveResource(catalog, "DieseBibliothekGibtEsNicht") === null, "unbekannte Namen erzeugen keinen geratenen Eintrag");

  const toolResource = resolveResource(catalog, "VibeIndex");
  const toolItem = toolResource ? adapter(toolResource) : null;
  zeile(
    toolItem?.category === "Werkzeuge und Spezialanwendungen"
      && toolItem?.kind === "research-source"
      && toolItem?.mode === "official-docs-only"
      && toolItem?.routerAnchor === "#tools"
      && toolItem?.packageIdentity?.status === "non-package"
      && /do not infer an unverified registry or package/.test(toolItem?.usePlan || ""),
    "Werkzeug-Kategorie bleibt official-docs-only und rät keine Registry/Paketidentität",
    toolItem ? `${toolItem.name}: ${toolItem.kind}/${toolItem.mode} ${toolItem.routerAnchor}` : "VibeIndex fehlt",
  );

  const detailUrl = "https://www.spline.design/guides/interactive-scenes?mode=docs";
  zeile(
    assertAllowedTargetUrl(spline, detailUrl) === detailUrl,
    "--url erlaubt eine konkrete HTTPS-Detailseite auf demselben www-normalisierten Host",
  );
  expectThrow(
    "--url blockiert einen fremden Host vor jedem Zugriff",
    "INVALID_DETAIL_URL",
    () => assertAllowedTargetUrl(spline, "https://spline.design.evil.example/guide"),
  );

  const validHtml = `<!doctype html>
    <html><head><title>Spline interactive scene documentation</title>
    <script>window.__hidden = "login checkpoint sale";</script></head>
    <body><nav>Products Resources Sign in</nav><main>
    <h1>Build interactive 3D scenes for the web</h1>
    <p>This practical guide explains how designers create a scene, arrange objects, tune lighting,
    connect hover events, and publish an accessible experience for a responsive product page.</p>
    <p>The documentation includes export choices, runtime controls, performance recommendations,
    browser compatibility notes, and concrete examples for production teams reviewing an implementation.</p>
    </main></body></html>`;
  const positiveFetch = fixtureFetch({ body: validHtml, finalUrl: detailUrl });
  const positiveFirecrawl = unavailableFirecrawl();
  const opened = await openOfficialPage(spline, {
    url: detailUrl,
    fetchImpl: positiveFetch,
    firecrawlReader: positiveFirecrawl,
  });
  zeile(
    opened.readStatus === "CONTENT_READ"
      && opened.channel === "fetch"
      && opened.httpStatus === 200
      && opened.url === detailUrl
      && opened.content.includes("performance recommendations")
      && !opened.content.includes("window.__hidden")
      && positiveFetch.calls.length === 1
      && positiveFirecrawl.calls.length === 0,
    "positive Fetch-Fixture liefert den vollständigen lesbaren Quellinhalt",
    `${opened.channel} HTTP ${opened.httpStatus} bytes=${opened.bytes} sha256=${opened.contentSha256}`,
  );
  zeile(
    /does not prove visual inspection or application in a project/i.test(opened.successMeaning),
    "CONTENT_READ grenzt visuelle Sichtung und Projektanwendung ausdrücklich aus",
    opened.successMeaning,
  );

  const loginComponentHtml = `<!doctype html><html><head><title>Login Form Component — Spline Documentation</title></head>
    <body><main><h1>Login form component example</h1><p>This documentation explains installation,
    component props, accessible labels, validation messages, keyboard focus, responsive layout, source code,
    usage guidance, theming choices, and integration details for a product interface.</p>
    <form><label>Email</label><input type="email"><label>Password</label><input type="password">
    <button>Sign in</button></form><p>Copy and paste the selected example, then review every dependency,
    interaction state, error message, and accessibility requirement before adapting it to the project.</p>
    </main></body></html>`;
  const componentOpened = await openOfficialPage(spline, {
    url: detailUrl,
    fetchImpl: fixtureFetch({ body: loginComponentHtml, finalUrl: detailUrl }),
    firecrawlReader: unavailableFirecrawl(),
  });
  zeile(
    componentOpened.readStatus === "CONTENT_READ" && componentOpened.content.includes("Login form component example"),
    "dokumentierte Login-Komponente bleibt lesbarer Quellinhalt statt falscher Auth-Wall",
  );

  const outPath = path.join(tempDir, "spline-source.txt");
  zeile(saveOpenedContent(opened, outPath) === outPath, "--out-Helfer akzeptiert einen absoluten Pfad");
  const saved = fs.readFileSync(outPath, "utf8");
  zeile(
    saved === opened.content
      && createHash("sha256").update(saved).digest("hex") === opened.contentSha256,
    "gespeicherter Klartext entspricht dem zurückgegebenen Inhalt und Hash",
  );
  expectThrow(
    "--out lehnt relative Pfade ab",
    "INVALID_OUTPUT_PATH",
    () => saveOpenedContent(opened, "relative-source.txt"),
  );

  const loginHtml = `<!doctype html><html><head><title>Spline account login</title></head><body>
    <main><h1>Sign in to Spline</h1><form><label>Email</label><input type="email">
    <label>Password</label><input type="password"><button>Log in</button></form>
    <p>${"Account checkpoint. ".repeat(20)}</p></main></body></html>`;
  await expectReject(
    "HTTP 200 Loginseite bleibt trotz Name/Domain im Markup BLOCKED",
    "CONTENT_BLOCKED",
    () => openOfficialPage(spline, {
      fetchImpl: fixtureFetch({ body: loginHtml }),
      firecrawlReader: unavailableFirecrawl(),
    }),
    (error) => error.classification === "BLOCKED" && error.httpStatus === 200,
  );

  const checkpointHtml = `<!doctype html><html><head><title>Spline security</title></head><body>
    <main><h1>Verify you are human</h1><p>Complete the security checkpoint before accessing Spline.
    Your browser request is being checked by the challenge platform.</p>
    <p>${"Security validation request pending. ".repeat(12)}</p></main></body></html>`;
  await expectReject(
    "HTTP 200 Checkpointseite bleibt trotz Markenbezug BLOCKED",
    "CONTENT_BLOCKED",
    () => openOfficialPage(spline, {
      fetchImpl: fixtureFetch({ body: checkpointHtml }),
      firecrawlReader: unavailableFirecrawl(),
    }),
    (error) => error.classification === "BLOCKED",
  );

  const saleHtml = `<!doctype html><html><head><title>Spline design domain</title></head><body>
    <main><h1>This domain is for sale</h1><p>Buy this domain and start your next business.
    A brokerage specialist can answer pricing questions and process a secure transfer.</p>
    <p>${"Make an offer for this domain today. ".repeat(10)}</p></main></body></html>`;
  await expectReject(
    "HTTP 200 Domain-Sale-Seite zählt nicht als Quellinhalt",
    "CONTENT_BLOCKED",
    () => openOfficialPage(spline, {
      fetchImpl: fixtureFetch({ body: saleHtml }),
      firecrawlReader: unavailableFirecrawl(),
    }),
    (error) => error.classification === "BLOCKED",
  );

  const markerOnlyMarkup = `<!doctype html><html><head><script>
    window.siteName = "Spline"; window.domain = "spline.design";
    </script></head><body><main>${"Loading. ".repeat(35)}</main></body></html>`;
  await expectReject(
    "Name/Domain nur im Script-Markup kann CONTENT_EMPTY nicht überstimmen",
    "CONTENT_EMPTY",
    () => openOfficialPage(spline, {
      fetchImpl: fixtureFetch({ body: markerOnlyMarkup }),
      firecrawlReader: unavailableFirecrawl(),
    }),
    (error) => error.classification === "EMPTY",
  );

  const fallbackMarkdown = `# Interactive scene documentation

This official Spline guide describes scene structure, object controls, material settings, lighting choices,
event connections, keyboard behavior, responsive embedding, runtime loading, browser support, export formats,
performance budgets, and review steps for a production implementation with accessible interaction.`;
  const fallbackOpened = await openOfficialPage(spline, {
    url: detailUrl,
    fetchImpl: async () => { throw new Error("fixture network unavailable"); },
    firecrawlReader: (url) => ({
      channel: "firecrawl",
      httpStatus: null,
      finalUrl: url,
      contentType: "text/markdown",
      body: fallbackMarkdown,
    }),
  });
  zeile(
    fallbackOpened.readStatus === "CONTENT_READ"
      && fallbackOpened.channel === "firecrawl"
      && fallbackOpened.httpStatus === null,
    "Firecrawl-Erfolg meldet unbekannten HTTP-Status als null statt erfundener 200",
  );

  await expectReject(
    "bekannter Upstream-HTTP-Fehler bleibt klassifiziert und wird nicht zu 200",
    "UPSTREAM_HTTP",
    () => openOfficialPage(spline, {
      fetchImpl: fixtureFetch({ body: "Service unavailable", status: 503 }),
      firecrawlReader: unavailableFirecrawl("fixture fallback unavailable"),
    }),
    (error) => error.classification === "UPSTREAM_HTTP" && error.httpStatus === 503,
  );

  await expectReject(
    "HTTP 401 wird als BLOCKED mit echtem Status gemeldet",
    "CONTENT_BLOCKED",
    () => openOfficialPage(spline, {
      fetchImpl: fixtureFetch({ body: "Authentication required", status: 401 }),
      firecrawlReader: unavailableFirecrawl(),
    }),
    (error) => error.classification === "BLOCKED" && error.httpStatus === 401,
  );

  await expectReject(
    "zwei kontrollierte Provider-Ausfälle ergeben HOST_UNAVAILABLE, nie Inhalts-Erfolg",
    "HOST_UNAVAILABLE",
    () => openOfficialPage(spline, {
      fetchImpl: async () => { throw new Error("fixture fetch unavailable"); },
      firecrawlReader: unavailableFirecrawl("fixture Firecrawl unavailable"),
    }),
    (error) => error.classification === "HOST_UNAVAILABLE" && error.httpStatus === null,
  );

  await expectReject(
    "Redirect auf fremden Host wird nicht als offizieller Inhalt akzeptiert",
    "UNEXPECTED_REDIRECT",
    () => openOfficialPage(spline, {
      fetchImpl: fixtureFetch({ body: validHtml, finalUrl: "https://accounts.example.test/login" }),
      firecrawlReader: unavailableFirecrawl(),
    }),
    (error) => error.classification === "WRONG",
  );

  const checkCli = spawnSync("node", [ACCESS, "check"], { encoding: "utf8", timeout: 10000 });
  zeile(
    checkCli.status === 0
      && checkCli.stdout.includes(`${catalog.length} catalog entries`)
      && !/133 requested|sorted pair SHA-256/.test(checkCli.stdout),
    "CLI check behält die Schnittstelle ohne historischen Count-/Hash-Gate",
    (checkCli.stderr || checkCli.stdout).trim(),
  );

  const showNameCli = spawnSync("node", [ACCESS, "show", "sPlInE", "--json"], { encoding: "utf8", timeout: 10000 });
  let shownByName = null;
  try { shownByName = JSON.parse(showNameCli.stdout); } catch {}
  zeile(
    showNameCli.status === 0 && shownByName?.name === "Spline" && shownByName?.officialUrl === spline.officialUrl,
    "CLI show löst Namen case-insensitive auf",
    (showNameCli.stderr || "").trim(),
  );

  const showUrlCli = spawnSync("node", [ACCESS, "show", "https://www.spline.design", "--json"], { encoding: "utf8", timeout: 10000 });
  let shownByUrl = null;
  try { shownByUrl = JSON.parse(showUrlCli.stdout); } catch {}
  zeile(
    showUrlCli.status === 0 && shownByUrl?.name === "Spline",
    "CLI show löst die normalisierte Katalog-URL auf",
    (showUrlCli.stderr || "").trim(),
  );

  const wrongHostCli = spawnSync(
    "node",
    [ACCESS, "open", "Spline", "--url", "https://example.test/guide"],
    { encoding: "utf8", timeout: 10000 },
  );
  zeile(
    wrongHostCli.status === 2
      && /Resource open: WRONG/.test(wrongHostCli.stderr)
      && /does not match catalog host/.test(wrongHostCli.stderr),
    "CLI --url klassifiziert fremde Hosts vor einem Provider-Aufruf",
    wrongHostCli.stderr.split("\n").filter(Boolean)[0] || "",
  );

  const relativeOutCli = spawnSync(
    "node",
    [ACCESS, "open", "Spline", "--out", "relative-source.txt"],
    { encoding: "utf8", timeout: 10000 },
  );
  zeile(
    relativeOutCli.status === 2 && /--out requires an absolute path/.test(relativeOutCli.stderr),
    "CLI --out verlangt vor einem Provider-Aufruf einen absoluten Pfad",
    relativeOutCli.stderr.split("\n").filter(Boolean)[0] || "",
  );

  const unknownCli = spawnSync(
    "node",
    [ACCESS, "open", "DieseBibliothekGibtEsNicht"],
    { encoding: "utf8", timeout: 10000 },
  );
  zeile(
    unknownCli.status === 1
      && /Resource not found in catalog/.test(unknownCli.stderr)
      && !/https:\/\//.test(`${unknownCli.stdout}${unknownCli.stderr}`),
    "unbekannter CLI-Name endet ohne geratenen URL-/Registry-Zugriff",
    unknownCli.stderr.trim(),
  );
} catch (error) {
  zeile(false, "Eval-Harness läuft vollständig", error?.stack || String(error));
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

console.log(`\n${geprueft - fehler}/${geprueft} wie erwartet.`);
if (fehler) process.exit(1);
console.log("Deterministische Resource-open-Fixtures stimmen (kein Live-Netztest).");
