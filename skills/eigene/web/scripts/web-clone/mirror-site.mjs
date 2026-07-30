#!/usr/bin/env node
// mirror-site.mjs — 把"静态构建站"(Astro / Vite SSG / Hugo 等)的部署资产整套镜像下来，做 1:1 忠实复刻。
// 原理: 这类站的"真源码"不在 GitHub，但部署出来的静态资产(HTML + bundle + CSS + 运行时 fetch 的
//       .sog/.buf/.wasm/.riv/字体/图)就是真相。用真浏览器全程滚动一遍捕获每一个真实请求，按路径镜像同源资产。
// 用法:
//   node scripts/mirror-site.mjs --url <URL> --out <dir> [--scroll-step 700] [--settle 2500] [--max-ms 90000]
// 产物:
//   <dir>/site/...                镜像的同源资产(保留路径；目录 URL 存为 index.html)
//   <dir>/mirror-manifest.json    全部请求(同源+第三方) + 每项状态
//   <dir>/own-asset-urls.txt      同源资产路径清单
//   <dir>/third-party.json        第三方 host + 需自托管的 webfont CSS(typekit/google) 提示
// 纪律: 只搬"真实请求到的"资产，不臆造路径。第三方 CDN(字体/wasm/视频)不自动改写——按 third-party.json 人工处理。
//       后续手工: 自托管锁域名字体(典型 Typekit @import) → 改写 CSS @import 为本地 → 删追踪 → 从 site/ 作 web 根服务。
//       完整配方见 references/web-clone-playbook.md。

import { loadPlaywright, launchChromium } from "./lib/playwright-loader.mjs";
import fs from "node:fs";
import path from "node:path";

function parseArgs(argv) {
  const o = { url: "", out: "", scrollStep: 700, settle: 2500, maxMs: 90000, help: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") o.help = true;
    else if (a === "--url") o.url = argv[++i] || "";
    else if (a === "--out") o.out = argv[++i] || "";
    else if (a === "--scroll-step") o.scrollStep = parseInt(argv[++i] || "700", 10);
    else if (a === "--settle") o.settle = parseInt(argv[++i] || "2500", 10);
    else if (a === "--max-ms") o.maxMs = parseInt(argv[++i] || "90000", 10);
  }
  return o;
}

function usage() {
  console.log(`mirror-site.mjs — alle Dateien einer statisch gebauten Site spiegeln (1:1)

  node scripts/mirror-site.mjs --url <URL> --out <dir> [--scroll-step 700] [--settle 2500] [--max-ms 90000]

Passt fuer: Astro / Vite SSG / Hugo — jede Site, die ihre Dateien fertig zum Herunterladen ausliefert (auch WebGL/Canvas-lastig).
Passt NICHT fuer: echtes Server-Rendering oder datengetriebene SPAs — dort braucht es network-capture.mjs als API-Ersatz.
Rezept und die naechsten Schritte (Schriften selbst hosten, Tracker raus, ausliefern) → references/web-clone-playbook.md`);
}

// 同源资产 URL → 本地相对路径(去 query；目录结尾存 index.html)
function urlToLocalPath(u, origin) {
  let p = u.slice(origin.length);
  const q = p.indexOf("?");
  if (q >= 0) p = p.slice(0, q);
  if (p === "" || p.endsWith("/")) p += "index.html";
  return p.replace(/^\/+/, "");
}

// Der Zielpfad kommt aus der URL der FREMDEN Seite. Bis 29.07.2026 ging er
// ungeprueft in join() — und `../` blieb dabei stehen. Nachgemessen:
//
//   https://opfer.test/x/../../../root/.ssh/authorized_keys
//     -> rel = "x/../../../root/.ssh/authorized_keys"
//     -> dest = /root/.ssh/authorized_keys
//
//   https://opfer.test/../../etc/cron.d/boese   ->  /etc/cron.d/boese
//
// Das ist genau der Fall, vor dem die Quarantaene-Regel warnt (AGENTS.md Nr. 17,
// "untrusted rein ODER maechtig raus"): dieses Skript liest eine fremde Seite und
// schreibt Dateien. Der Server der Zielseite bestimmt dabei, WOHIN — ein
// praeparierter Link im Manifest reicht, um in /root/.ssh oder /etc/cron.d zu
// schreiben. Der Umweg ueber `path.resolve` faengt jede Schreibweise ab, auch
// die getarnten (`a/b/../../..`), weil er den Pfad zuerst aufloest und dann
// vergleicht.
function zielImOrdner(basis, rel) {
  const wurzel = path.resolve(basis);
  const ziel = path.resolve(wurzel, rel);
  return ziel === wurzel || ziel.startsWith(wurzel + path.sep) ? ziel : null;
}

const args = parseArgs(process.argv.slice(2));
if (args.help || !args.url || !args.out) {
  usage();
  process.exit(args.help ? 0 : 1);
}

const origin = new URL(args.url).origin;
const siteDir = path.join(path.resolve(args.out), "site");
fs.mkdirSync(siteDir, { recursive: true });

const responses = new Map(); // url -> {status, type, ct}
const pw = loadPlaywright();
const browser = await launchChromium(pw.chromium);
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
page.on("response", (resp) => {
  try {
    const h = resp.headers();
    responses.set(resp.url(), { status: resp.status(), type: resp.request().resourceType(), ct: h["content-type"] || "" });
  } catch {}
});

console.log(`▸ Laden und ueber die ganze Seite scrollen: ${args.url}`);
await page.goto(args.url, { waitUntil: "networkidle", timeout: args.maxMs }).catch((e) => console.warn("  goto:", e.message));
const total = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y <= total; y += args.scrollStep) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(180);
}
await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
await page.waitForTimeout(args.settle);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(1200);

const all = [...responses.entries()].map(([url, m]) => ({ url, ...m }));
const ownUrls = all.filter((r) => r.url.startsWith(origin + "/") || r.url === origin || r.url === origin + "/");

console.log(`▸ ${all.length} Anfragen gesehen, ${ownUrls.length} davon von derselben Domain — Download laeuft …`);
let ok = 0, fail = 0;
const failed = [];
const abgewehrt = [];
for (const r of ownUrls) {
  const rel = urlToLocalPath(r.url, origin);
  const dest = zielImOrdner(siteDir, rel);
  if (!dest) {
    // Nicht still ueberspringen: wer eine Seite spiegelt und hinterher Dateien
    // vermisst, sucht am falschen Ende. Und ein Ausbruchsversuch ist ein Befund
    // ueber die Zielseite, kein Randfall des Werkzeugs.
    abgewehrt.push(rel);
    fail++;
    continue;
  }
  try {
    const resp = await ctx.request.get(r.url); // ueber den Browser laden, damit Cookies und Proxy dieselben sind
    if (!resp.ok()) { fail++; failed.push(`HTTP${resp.status()} ${rel}`); continue; }
    const buf = await resp.body();
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, buf);
    ok++;
  } catch (e) {
    fail++; failed.push(`${e.message} ${rel}`);
  }
}

// 第三方 + webfont 提示
const thirdHosts = [...new Set(all.filter((r) => !r.url.startsWith(origin)).map((r) => { try { return new URL(r.url).host; } catch { return r.url; } }))];
const webfontCss = all.map((r) => r.url).filter((u) => /use\.typekit\.net\/[a-z0-9]+\.css|fonts\.googleapis\.com\/css/i.test(u));
const outRoot = path.resolve(args.out);
fs.writeFileSync(path.join(outRoot, "mirror-manifest.json"), JSON.stringify(all, null, 2));
fs.writeFileSync(path.join(outRoot, "own-asset-urls.txt"), ownUrls
  .map((r) => urlToLocalPath(r.url, origin))
  .filter((rel) => zielImOrdner(siteDir, rel))
  .sort().join("\n") + "\n");
fs.writeFileSync(path.join(outRoot, "third-party.json"), JSON.stringify({ hosts: thirdHosts, webfont_css_to_selfhost: webfontCss }, null, 2));

console.log(`✅ Spiegelung fertig: ${ok} geladen, ${fail} fehlgeschlagen → ${siteDir}`);
if (abgewehrt.length) {
  console.log(`\n  ⛔ ${abgewehrt.length} Pfad(e) zeigten AUS dem Zielordner heraus und wurden NICHT geschrieben:`);
  for (const a of abgewehrt.slice(0, 10)) console.log(`     ${a}`);
  console.log('     (Die Zielseite bestimmt hier den Dateipfad — das ist ein Befund ueber sie, nicht ueber dieses Werkzeug.)');
}
if (failed.length) console.log("  ⚠️ fehlgeschlagen:\n   " + failed.slice(0, 20).join("\n   "));
console.log(`▸ Fremde Hosts: ${thirdHosts.join(", ") || "(keine)"}`);
if (webfontCss.length) console.log(`▸ Webfont-CSS, das selbst gehostet werden muss (siehe references/web-clone-playbook.md): \n   ${webfontCss.join("\n   ")}`);
console.log(`▸ Naechster Schritt: Schriften selbst hosten, CSS-@import umschreiben, Tracker entfernen → cd ${siteDir} && python3 -m http.server 8124`);
await browser.close();
