#!/usr/bin/env node
// Front Door Autoload — Registry ist die einzige Routingquelle.
// Vertrag: /root/eingang/2026-09-01-skill-betriebssystem-klarplan.md
// Gibt hoechstens EINEN Hauptmodus plus dessen requires aus. Nie zwei Modi.
// Endet immer mit Exit 0 und blockiert nie einen Prompt (fail-closed nur fuer die Injektion).
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";

const REGISTRY = process.env.FRONTDOOR_REGISTRY || "/root/.claude/skill-inventory-all.json";
const STATE_ROOT = process.env.FRONTDOOR_STATE_DIR || null;
const MAX_PROMPT = 20000;
const MAX_CONTEXT = 1200;
const MAX_REQUIRES = 8;
const MAX_DEPTH = 4;
const STATE_TTL_MS = 6 * 60 * 60 * 1000;
const PROMPT_ONLY_OWNERS = new Set(["poteto"]);

const PATH_ALLOWLIST = [
  "/root/.claude/skills/",
  "/root/raphael-skills/",
  "/root/.agents/skills/",
  "/root/.gstack/",
  "/opt/raphael/",
];

// N5: Harness-Dumps und untergeschobene Hook-Ausgaben sind keine Nutzerabsicht.
const DUMP_MARKERS = [
  "SYSTEM NOTIFICATION",
  "<task-notification>",
  "<task-id>",
  "NOT USER INPUT",
  "hookSpecificOutput",
];

// Abschnitt 4: explizite Abwahl loescht den Zustand und unterdrueckt die Ausgabe.
const DESELECT = [
  /\bohne\s+([a-z][a-z0-9-]{2,})/iu,
  /\bkein(?:e|en)?\s+([a-z][a-z0-9-]{2,})/iu,
  /\blass\s+das\s+weg\b/iu,
  /\bstopp?\s+mit\b/iu,
  /\bvergiss\b/iu,
];

function out(text) {
  if (text) {
    process.stdout.write(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: "UserPromptSubmit",
          additionalContext: text,
        },
      }),
    );
  }
  process.exit(0);
}

function promptFrom(body) {
  if (!body || typeof body !== "object") return "";
  const keys = ["prompt", "user_prompt", "userPrompt", "userprompt", "text", "message"];
  for (const k of keys) {
    const v = body[k];
    if (typeof v === "string" && v.trim()) return v;
  }
  if (body.user && typeof body.user === "object") {
    for (const k of keys) {
      const v = body.user[k];
      if (typeof v === "string" && v.trim()) return v;
    }
  }
  return "";
}

// Uebernommen aus skill-trigger.mjs: Unicode-Wortgrenzen, Regex-Escaping, includes-Fallback.
export function wordMatch(hay, phrase) {
  const p = String(phrase || "").trim();
  if (!p) return false;
  const esc = p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  try {
    const re = new RegExp(`(^|[^\\p{L}\\p{N}_/])${esc}([^\\p{L}\\p{N}_/]|$)`, "iu");
    return re.test(hay);
  } catch {
    return hay.toLowerCase().includes(p.toLowerCase());
  }
}

export function usablePhrase(phrase) {
  const p = String(phrase || "").trim();
  if (!p) return false;
  if (p.startsWith("/")) return p.length >= 2;
  if (p.length >= 5) return true;
  if (p.length >= 3 && p === p.toUpperCase()) return true;
  return false;
}

function allowedPath(p) {
  return (
    typeof p === "string" &&
    p.startsWith("/") &&
    p.endsWith("SKILL.md") &&
    PATH_ALLOWLIST.some((pre) => p.startsWith(pre)) &&
    existsSync(p)
  );
}

// Abschnitt 9: billige Drift-Pruefung bei jedem Lauf.
export function loadRegistry(path) {
  let data;
  try {
    data = JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
  if (!data || data.schema_version !== 1) return null;
  if (!Array.isArray(data.skills)) return null;
  if (data.skill_count !== data.skills.length) return null;
  return data;
}

// Abschnitt 5: woertliche Nennung eines Skills = Nutzerwahl, Ableitung entfaellt.
export function userChoice(prompt, byName) {
  const slash = prompt.match(/(^|\s)\/([a-z][a-z0-9-]{1,60})/iu);
  if (slash && byName.has(slash[2].toLowerCase())) return byName.get(slash[2].toLowerCase());
  const verb = prompt.match(
    /\b(?:skill|nutze|nutz|benutze|verwende|lade|use|load)\s+([a-z][a-z0-9-]{2,60})/iu,
  );
  if (verb && byName.has(verb[1].toLowerCase())) return byName.get(verb[1].toLowerCase());
  return null;
}

// Abschnitt 3.1: auto-router + active + eigener Owner. internal/hidden/always nie.
export function candidates(skills) {
  return skills.filter(
    (s) =>
      s &&
      s.activation === "auto-router" &&
      s.status === "active" &&
      s.owner === s.name &&
      Array.isArray(s.auto_when),
  );
}

// Abschnitt 3.2/3.3: laengste getroffene Phrase gewinnt, Gleichstand ist fail-closed.
export function pickMode(prompt, skills) {
  const hits = [];
  for (const c of candidates(skills)) {
    let best = 0;
    const phrases = [...(c.auto_when || [])];
    for (const s of skills) {
      if (s?.activation !== "internal" || s.owner !== c.name) continue;
      if (s.status === "deprecated") continue;
      phrases.push(...(s.auto_when || []));
    }
    for (const phrase of phrases) {
      if (!usablePhrase(phrase)) continue;
      if (!wordMatch(prompt, phrase)) continue;
      best = Math.max(best, String(phrase).trim().length);
    }
    if (best > 0) hits.push({ skill: c, len: best });
  }
  if (hits.length === 0) return { mode: null, reason: "no-hit" };
  // Abschnitt 6 / N8: Trifft mehr als ein Front Door, ist die Absicht mehrdeutig ->
  // kein Modus. Die Phrasenlaenge aus 3.3 ist dafuer kein tauglicher Massstab: bei
  // "Landingpage bauen und Design polieren" ist der Abstand 17 zu 15 reiner Zufall,
  // bei "Landingpage bauen und ins Brain einspeisen" 17 zu 9 — beide Male will der
  // Vertrag keinen Modus. Gemessen an den echten auto_when-Phrasen trifft bei jedem
  // eindeutigen Prompt genau ein Kandidat, daher ist "mehr als einer" das richtige
  // und zugleich einfachste Kriterium.
  if (hits.length > 1) return { mode: null, reason: "ambiguous" };
  hits.sort((a, b) => b.len - a.len);

  const winner = hits[0].skill;
  // never_when: nur woertlich matchbare Saetze wirken (Abschnitt 6).
  for (const nw of winner.never_when || []) {
    if (usablePhrase(nw) && wordMatch(prompt, nw)) return { mode: null, reason: "never_when" };
  }
  // conflicts: steht der Gewinner im conflicts eines anderen Treffers -> kein Modus.
  for (const h of hits.slice(1)) {
    if ((h.skill.conflicts || []).includes(winner.name)) return { mode: null, reason: "conflict" };
    if ((winner.conflicts || []).includes(h.skill.name)) return { mode: null, reason: "conflict" };
  }
  if (!allowedPath(winner.source)) return { mode: null, reason: "bad-source" };
  return { mode: winner, reason: "ok" };
}

// requires transitiv, zyklusfrei (seen-Set), begrenzt (MAX_DEPTH, MAX_REQUIRES).
// Statische requires: alles, was der Owner immer braucht.
export function resolveRequires(mode, byName) {
  const acc = [];
  const seen = new Set([mode.name]);
  let frontier = [...(mode.requires || [])];
  for (let depth = 0; depth < MAX_DEPTH && frontier.length && acc.length < MAX_REQUIRES; depth++) {
    const next = [];
    for (const name of frontier) {
      if (acc.length >= MAX_REQUIRES) break;
      if (seen.has(name)) continue;
      seen.add(name);
      const s = byName.get(name);
      if (!s) continue;
      if (s.status === "deprecated") continue;
      if (s.owner !== mode.name) continue; // nur eigene Kette, kein Fremd-Fanout
      if (!allowedPath(s.source)) continue;
      if (PROMPT_ONLY_OWNERS.has(mode.name) && s.activation === "internal") continue;
      acc.push(s);
      for (const r of s.requires || []) if (!seen.has(r)) next.push(r);
    }
    frontier = next;
  }
  return acc;
}

// Owner wie poteto tragen 44 internal-Kinder. Alle zu laden sprengt jedes
// Budget und waere fast immer falsch. Geladen wird deshalb nur, was der Prompt
// selbst nennt: ein internal-Skill DESSELBEN Owners, dessen eigene auto_when-
// Phrase im Prompt vorkommt. Ohne Treffer bleibt es bei den statischen requires.
export function promptInternals(prompt, mode, byName, taken) {
  const acc = [];
  for (const s of byName.values()) {
    if (acc.length + taken >= MAX_REQUIRES) break;
    if (!s || s.activation !== "internal") continue;
    if (s.owner !== mode.name) continue;
    if (s.status === "deprecated") continue;
    if (s.name === mode.name) continue;
    if (!allowedPath(s.source)) continue;
    const hit = (s.auto_when || []).some((p) => usablePhrase(p) && wordMatch(prompt, p));
    if (hit) acc.push(s);
  }
  return acc;
}

function stateFile(sessionId) {
  const roots = STATE_ROOT ? [STATE_ROOT] : ["/run/user/0/claude-frontdoor", "/tmp/claude-frontdoor"];
  for (const root of roots) {
    try {
      mkdirSync(root, { recursive: true, mode: 0o700 });
      return join(root, `${createHash("sha256").update(sessionId).digest("hex").slice(0, 32)}.json`);
    } catch {
      /* naechster Root */
    }
  }
  return null;
}

function readState(file) {
  try {
    const st = JSON.parse(readFileSync(file, "utf8"));
    if (!st || typeof st.mode !== "string") return null;
    if (!Number.isFinite(st.ts) || Date.now() - st.ts > STATE_TTL_MS) return null;
    return st;
  } catch {
    return null;
  }
}

function main() {
  let raw = "";
  try {
    raw = readFileSync(0, "utf8");
  } catch {
    out("");
  }
  let body = {};
  try {
    body = JSON.parse(raw || "{}");
  } catch {
    out("");
  }

  const prompt = promptFrom(body);
  if (!prompt) out(""); // Payload ohne Prompt
  if (prompt.length > MAX_PROMPT) out(""); // N6: grosse Pastes sind Daten
  if (DUMP_MARKERS.some((m) => prompt.includes(m))) out(""); // N5

  const registry = loadRegistry(REGISTRY);
  if (!registry) out("");
  const byName = new Map(registry.skills.map((s) => [s.name, s]));

  const sessionId = typeof body.session_id === "string" ? body.session_id : "";
  const file = sessionId ? stateFile(sessionId) : null;

  // Abschnitt 4: explizite Abwahl -> Zustand loeschen, nichts ausgeben.
  if (DESELECT.some((re) => re.test(prompt))) {
    if (file) {
      try {
        writeFileSync(file, JSON.stringify({ mode: "", ts: 0 }), { mode: 0o600 });
      } catch {
        /* Zustand ist Komfort, nie Bedingung */
      }
    }
    out("");
  }

  // Abschnitt 5: Nutzerwahl schlaegt Ableitung und ueberspringt sie komplett.
  const chosen = userChoice(prompt, byName);
  if (chosen) {
    if (chosen.status === "deprecated") {
      const canon = typeof chosen.canonical_of === "string" ? chosen.canonical_of : "";
      out(`HINWEIS (Registry): ${chosen.name} ist deprecated.${canon ? ` Kanonisch: ${canon}.` : ""}`);
    }
    out("");
  }

  const { mode } = pickMode(prompt, registry.skills);
  if (!mode) out("");

  // N4: derselbe Modus wird nicht wiederholt. Anderer Modus = neuer Task, ersetzt sofort.
  const prev = file ? readState(file) : null;
  if (prev && prev.mode === mode.name) out("");
  const switched = Boolean(prev && prev.mode && prev.mode !== mode.name);
  if (file) {
    try {
      writeFileSync(file, JSON.stringify({ mode: mode.name, ts: Date.now() }), { mode: 0o600 });
    } catch {
      /* Zustand ist Komfort, nie Bedingung */
    }
  }

  // Ausgabe ausschliesslich aus Registry-Feldern. Kein Zeichen aus dem Prompt.
  // Der Name ist die Anweisung, der Pfad nur Beleg — das Skill tool nimmt Namen.
  const reqs = resolveRequires(mode, byName);
  const extra = promptInternals(prompt, mode, byName, reqs.length);
  const load = [...reqs, ...extra].slice(0, MAX_REQUIRES);
  const lines = [
    `FRONT DOOR (Registry): ${mode.name}${switched ? " (Moduswechsel)" : ""}`,
    `Lade jetzt genau diesen Hauptmodus per Skill tool: ${mode.name}`,
  ];
  if (load.length) {
    lines.push(`Mitzuladen per Skill tool: ${load.map((s) => s.name).join(" ")}`);
  }
  lines.push(`Beleg: ${[mode, ...load].map((s) => s.source).join(" ")}`);
  lines.push("Kein weiterer Hauptmodus fuer diesen Task. Nutzerwahl schlaegt diese Ableitung.");

  const text = lines.join("\n");
  // Bei Ueberlaenge faellt der Beleg weg, nie die Namen — sie sind die Anweisung.
  out(text.length > MAX_CONTEXT ? lines.slice(0, 3).join("\n") : text);
}

if (process.argv[2] === "--verify") {
  const reg = loadRegistry(REGISTRY);
  if (!reg) {
    process.stdout.write("VERIFY FAIL: registry unreadable/invalid\n");
    process.exit(1);
  }
  const names = new Set(reg.skills.map((s) => s.name));
  const problems = [];
  for (const s of reg.skills) {
    if (s.status === "duplicate" && !s.canonical_of) problems.push(`${s.name}: duplicate ohne canonical_of`);
    if ((s.activation === "explicit" || s.activation === "hidden") && (s.auto_when || []).length)
      problems.push(`${s.name}: ${s.activation} mit auto_when`);
    for (const r of [...(s.requires || []), ...(s.conflicts || [])])
      if (!names.has(r)) problems.push(`${s.name}: dangling ${r}`);
    if (s.status === "unclassified") problems.push(`${s.name}: unclassified`);
    if (!existsSync(s.source)) problems.push(`${s.name}: source fehlt`);
  }
  const age = (Date.now() - Date.parse(reg.generated_at || 0)) / 86400000;
  if (!(age < 30)) problems.push(`generated_at ${Math.round(age)}d alt (>30)`);
  process.stdout.write(
    problems.length ? `VERIFY FAIL:\n${problems.join("\n")}\n` : `VERIFY OK: ${reg.skill_count} Eintraege\n`,
  );
  process.exit(problems.length ? 1 : 0);
} else if (process.env.FRONTDOOR_TEST !== "1") {
  try {
    main();
  } catch {
    process.exit(0); // interne Ausnahme -> kein Modus, nie ein Block
  }
}
