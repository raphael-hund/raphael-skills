#!/usr/bin/env node
/**
 * Deterministic integration check for x-bookmarks-pull.mjs.
 * It uses private temporary directories and fixture JSON only; it never invokes X.
 */
import { createHash } from "node:crypto";
import {
  chmodSync,
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const HERE = dirname(fileURLToPath(import.meta.url));
const ADAPTER = join(HERE, "..", "scripts", "x-bookmarks-pull.mjs");
const ROOT = mkdtempSync(join(tmpdir(), "x-bookmark-pipeline-check-"));
let checks = 0;
let failures = 0;

function check(ok, label, detail = "") {
  checks += 1;
  if (!ok) failures += 1;
  console.log(`[${ok ? "OK" : "FAIL"}] ${label}${!ok && detail ? `: ${detail}` : ""}`);
}

function fixture(count = 55) {
  return {
    ok: true,
    schema_version: "1.0",
    data: Array.from({ length: count }, (_, index) => {
      const id = String(2095000000000000000n + BigInt(index));
      return {
        id,
        text: index === 0 ? "Original short link https://t.co/unchanged" : `Bookmark text ${index}`,
        author: {
          id: String(800000 + index),
          name: `Author ${index}`,
          screenName: `author_${index}`,
          profileImageUrl: `https://example.test/avatar-${index}.jpg`,
          verified: index % 2 === 0,
        },
        metrics: {
          likes: index + 1,
          retweets: index + 2,
          replies: index + 3,
          quotes: index + 4,
          views: index + 5,
          bookmarks: index + 6,
        },
        createdAt: "Wed Sep 02 03:16:27 +0000 2026",
        createdAtLocal: "2026-09-02 05:16:27 CEST",
        createdAtISO: `2026-09-02T03:${String(index % 60).padStart(2, "0")}:27+00:00`,
        media: [],
        urls: index === 0
          ? ["https://t.co/unchanged", "https://example.test/reference"]
          : [`https://example.test/reference-${index}`],
        isRetweet: false,
        retweetedBy: null,
        lang: "en",
        score: null,
        articleTitle: "",
      };
    }),
  };
}

function makeCase(name, payload = fixture()) {
  const base = join(ROOT, name);
  const raw = join(base, "raw");
  const ledger = join(base, "ledger.md");
  const input = join(base, "input.json");
  mkdirSync(base, { recursive: true, mode: 0o700 });
  const bytes = typeof payload === "string" ? payload : `${JSON.stringify(payload, null, 2)}\n`;
  writeFileSync(input, bytes, { mode: 0o600 });
  chmodSync(input, 0o600);
  return { base, raw, ledger, input, bytes };
}

function run(testCase, args = [], extraEnv = {}) {
  return spawnSync(process.execPath, [ADAPTER, ...args], {
    encoding: "utf8",
    timeout: 30_000,
    maxBuffer: 8 * 1024 * 1024,
    env: {
      ...process.env,
      X_BOOKMARKS_RAW_DIR: testCase.raw,
      X_BOOKMARKS_LEDGER: testCase.ledger,
      ...extraEnv,
    },
  });
}

function summary(result) {
  try {
    return JSON.parse((result.stdout || "").trim());
  } catch {
    return null;
  }
}

function digestTree(testCase) {
  const hash = createHash("sha256");
  if (existsSync(testCase.raw)) {
    for (const name of readdirSync(testCase.raw).sort()) {
      hash.update(name);
      hash.update(readFileSync(join(testCase.raw, name)));
    }
  }
  if (existsSync(testCase.ledger)) hash.update(readFileSync(testCase.ledger));
  return hash.digest("hex");
}

try {
  check(existsSync(ADAPTER), "adapter exists", ADAPTER);

  const help = spawnSync(process.execPath, [ADAPTER, "--help"], { encoding: "utf8", timeout: 10_000 });
  check(help.status === 0, "--help exits zero", `exit ${help.status}`);
  check(/default:\s*50/i.test(help.stdout || "") && /--input-json/.test(help.stdout || "")
    && /--snapshot/.test(help.stdout || "") && /--dry-run/.test(help.stdout || ""),
  "help documents default and modes");

  const firstCase = makeCase("first");
  const first = run(firstCase, ["--input-json", firstCase.input, "-n", "10"]);
  const firstSummary = summary(first);
  check(first.status === 0, "fixture ingest exits zero", (first.stderr || first.stdout || "").trim());
  check(firstSummary?.fetched === 10 && firstSummary?.new === 10 && firstSummary?.existing === 0,
    "first summary counts 10 new", JSON.stringify(firstSummary));
  const names = existsSync(firstCase.raw) ? readdirSync(firstCase.raw).sort() : [];
  check(names.filter((name) => name.endsWith(".md") && !name.endsWith(".provenance.md")).length === 10
    && names.filter((name) => name.endsWith(".provenance.md")).length === 10,
  "ten raw Markdown files and ten sidecars exist", names.join(","));
  check(names.every((name) => (statSync(join(firstCase.raw, name)).mode & 0o777) === 0o600)
    && (statSync(firstCase.ledger).mode & 0o777) === 0o600,
  "raw files, sidecars, and ledger use mode 600");
  const firstRawName = names.find((name) => name.includes("2095000000000000000")
    && !name.endsWith(".provenance.md"));
  const firstRaw = firstRawName ? readFileSync(join(firstCase.raw, firstRawName), "utf8") : "";
  const firstSidecar = firstRawName
    ? readFileSync(join(firstCase.raw, `${firstRawName}.provenance.md`), "utf8") : "";
  check(firstRaw.includes("@author_0") && firstRaw.includes("2026-09-02T03:00:27+00:00")
    && firstRaw.includes("likes: 1") && firstRaw.includes("https://example.test/reference"),
  "raw note contains author, time, metrics, and URLs");
  check(firstRaw.includes("https://t.co/unchanged"), "t.co URL remains unresolved");
  check(/sha256: [a-f0-9]{64}/.test(firstSidecar) && firstSidecar.includes(firstRawName),
    "sidecar binds raw filename and SHA-256");
  const ledger = readFileSync(firstCase.ledger, "utf8");
  check(/^\| ID \| Autor \| Datum \| Links \| Status \|$/m.test(ledger)
    && (ledger.match(/^\| 2095/gm) || []).length === 10,
  "ledger has required columns and ten rows");

  const before = digestTree(firstCase);
  const second = run(firstCase, ["--input-json", firstCase.input, "--n", "10"]);
  const secondSummary = summary(second);
  const after = digestTree(firstCase);
  check(second.status === 0 && secondSummary?.new === 0 && secondSummary?.existing === 10,
    "second run reports zero new", JSON.stringify(secondSummary));
  check(before === after, "second run is byte-idempotent");

  const defaultCase = makeCase("default");
  const defaultRun = run(defaultCase, ["--input-json", defaultCase.input]);
  check(defaultRun.status === 0 && summary(defaultRun)?.fetched === 50 && summary(defaultRun)?.new === 50,
    "default limit is 50", (defaultRun.stderr || defaultRun.stdout || "").trim());

  const dryCase = makeCase("dry");
  const dry = run(dryCase, ["--input-json", dryCase.input, "--n", "12", "--dry-run"]);
  check(dry.status === 0 && summary(dry)?.new === 12 && summary(dry)?.dry_run === true,
    "dry-run reports planned writes");
  check(!existsSync(dryCase.raw) && !existsSync(dryCase.ledger), "dry-run writes nothing");

  const snapshotCase = makeCase("snapshot", fixture(3));
  const snapshotPath = join(snapshotCase.base, "snapshot.json");
  const snap = run(snapshotCase, ["--input-json", snapshotCase.input, "--n", "3", "--snapshot", snapshotPath]);
  check(snap.status === 0 && existsSync(snapshotPath), "snapshot is written after valid input");
  check(readFileSync(snapshotPath, "utf8") === snapshotCase.bytes
    && (statSync(snapshotPath).mode & 0o777) === 0o600,
  "snapshot preserves bytes and uses mode 600");

  const brokenCase = makeCase("broken", "{ definitely-not-json");
  const broken = run(brokenCase, ["--input-json", brokenCase.input]);
  check(broken.status !== 0, "broken JSON exits nonzero");
  check(!existsSync(brokenCase.raw) && !existsSync(brokenCase.ledger), "broken JSON writes nothing");

  const unsafePayload = fixture(2);
  unsafePayload.data[1].id = "../../escape";
  const unsafeCase = makeCase("unsafe", unsafePayload);
  const unsafe = run(unsafeCase, ["--input-json", unsafeCase.input, "--n", "2"]);
  check(unsafe.status !== 0, "unsafe ID exits nonzero");
  check(!existsSync(unsafeCase.raw) && !existsSync(unsafeCase.ledger), "unsafe ID fails before any write");

  const authorPayload = fixture(1);
  authorPayload.data[0].author = "author_0";
  const authorCase = makeCase("author-schema", authorPayload);
  const badAuthor = run(authorCase, ["--input-json", authorCase.input]);
  check(badAuthor.status !== 0 && !existsSync(authorCase.raw) && !existsSync(authorCase.ledger),
    "author must be an object with screenName");
} finally {
  rmSync(ROOT, { recursive: true, force: true });
}

console.log(`${checks - failures}/${checks} Pruefungen wie erwartet.`);
process.exit(failures ? 1 : 0);
