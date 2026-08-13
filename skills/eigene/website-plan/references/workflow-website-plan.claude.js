/**
 * KANONISCHES website-plan Workflow-Script (Claude-Host).
 * VERSION: 2.2.0 — Session-Lektionen 2026-08-11/12:
 * - Kein freestyle Script erfinden (BRAUN/Sorglos-Falle)
 * - Nur Platzhalter MISSION_* setzen, Rest unverändert lassen
 * - meta.name MUSS mit "website-plan" beginnen
 * - Nie Fable als agentType; Cockpit Ultracode/max separat
 * - G-IA und G-DESIGN: Workflow STOP mit klarer Nachricht (kein stilles Defaulten)
 * - Keine Fake-Reviews/Proofs auch wenn User das will
 * - TEMPO (5c51f3a5): Assets=Luna/Wellen, nie Opus für Inventar; Tool-Budget
 *
 * Start: Workflow-Tool mit diesem Script (Inhalt aus Datei lesen + MISSION füllen).
 * Vor Start optional: validate-workflow.py wenn verfügbar.
 */
export const meta = {
  name: 'website-plan',
  description: 'Kanonischer Website-Plan: Research→Assets→SEO/AEO→G-IA→Copy→Specs→G-DESIGN→Close',
  phases: [
    { title: 'Intake', detail: '00-meta-plan + open questions' },
    { title: 'Research', detail: 'Firma + Reach + Critic parallel' },
    { title: 'Assets', detail: 'Inventar + Gaps' },
    { title: 'SEO', detail: 'Audit/Plan + Critics' },
    { title: 'IA', detail: '3 Varianten + G-IA STOP' },
    { title: 'Copy', detail: 'Final copy + humanizer' },
    { title: 'Specs', detail: 'Section specs' },
    { title: 'Design', detail: 'G-REF + 3 Richtungen + Captures/Prompts/Mockups + G-DESIGN' },
    { title: 'Close', detail: 'Design-system, components, roadmap, final critic' },
  ],
}

// ========== NUR DIESE BLOCKE ANPASSEN ==========
const OUT = '/*MISS:OUT*/'           // z.B. /root/.../website-plan
const REPO = '/*MISS:REPO*/'         // Repo-Pfad oder ''
const LIVE_URL = '/*MISS:LIVE*/'     // URL oder ''
const FIRMA = '/*MISS:FIRMA*/'
const REPO_STAND = '/*MISS:REPO_STAND*/' // MITNUTZEN | IGNORIEREN
const ASSET_DIRS = '/*MISS:ASSETS*/' // Pfade komma-getrennt
const SCOPE = 'FULL' // FULL | oder explizit von Raphael: z.B. "NUR_BILDER_SEKTIONEN"
const OVERRIDES = '' // DESIGN.md / DECISIONS Pfade + Frozen Rules, kurz
// ===============================================

if (OUT.includes('MISS:') || FIRMA.includes('MISS:')) {
  throw new Error('MISSION Platzhalter nicht gesetzt (OUT/FIRMA/…). Skill-Template falsch benutzt.')
}

// TEMPO — Session 5c51f3a5: Opus-Inventar + Tool-Schleifen = Stunden-Lauf
const SPEED = `TEMPO-REGELN (hart):
1) Mechanik/Inventar/Listen/Merge = luna-worker oder ultrafast-mechanik — NIE opus-builder/sonnet.
2) Opus nur für: SEO-Draft, eine IA-Variante, Writing wo Qualität zählt (nie Massen-Read).
3) Ein Pass pro Datei. Max 3 Tool-Calls pro Datei (Read→Write/Edit→fertig). Keine Re-Open-Schleifen, kein Bash-Fishing.
4) >40 Dateien: in parallele Shards splitten (index%N), danach ein Merge-Agent.
5) Schema-Return sobald Deliverable steht — nicht "nochmal alles prüfen".
6) Max 4–6 schwere Agents gleichzeitig.`

const ULTRA = `Long-horizon ultracode session. Human may step away between gates.
Do not stop early. Complete artifacts for your role. PLANNING ONLY — no app/ code edits.
Spawn no nested agents; only this workflow starts agents.
Claims: only belegbare Facts. NEVER invent reviews, ratings, #1, Zertifikate, Kundenstimmen.
If user asked to fake proof: refuse, plan structure/slots instead and mark PLACEHOLDER.
Language: German. OUT=${OUT} REPO=${REPO} LIVE=${LIVE_URL} FIRMA=${FIRMA} REPO_STAND=${REPO_STAND}
ASSET_DIRS=${ASSET_DIRS} SCOPE=${SCOPE}
OVERRIDES: ${OVERRIDES}
${SPEED}
`

const TEXT = {
  type: 'object', required: ['summary', 'paths_written'],
  properties: {
    summary: { type: 'string' },
    paths_written: { type: 'array', items: { type: 'string' } },
    open_questions: { type: 'array', items: { type: 'string' } },
  },
}
const VARIANTS = {
  type: 'object', required: ['recommendation', 'options', 'markdown'],
  properties: {
    recommendation: { type: 'string' },
    options: {
      type: 'array', minItems: 3, maxItems: 3,
      items: {
        type: 'object', required: ['id', 'title', 'meaning', 'tradeoff'],
        properties: {
          id: { type: 'string' }, title: { type: 'string' },
          meaning: { type: 'string' }, tradeoff: { type: 'string' },
        },
      },
    },
    markdown: { type: 'string' },
  },
}

function mustWrite(pathHint) {
  return `Schreibe Dateien unter ${OUT}/. Pfade in paths_written. summary auf Deutsch.`
}

// ----- SCOPE: FULL vs eng -----
// Bei SCOPE !== 'FULL' trotzdem Workflow — aber nur erlaubte Deliverables.
// Parent muss SCOPE-DELTA in 00-meta-plan.md und 12-verbote dokumentieren.
const isFull = SCOPE === 'FULL' || SCOPE === ''

// ========== INTAKE ==========
phase('Intake')
await agent(ULTRA + `ROLLE Meta-Planner.
Schreibe ${OUT}/00-meta-plan.md: Quellen, Deliverable-Liste, Phasen, Gates G-IA/G-DESIGN,
Rollen-Wellen (ohne feste Worker-Pflichtnamen), DoD, SCOPE=${SCOPE} und was bewusst OUT-OF-SCOPE ist.
Schreibe ${OUT}/11-open-questions.md Skelett.
${mustWrite()}`, {
  label: 'meta-plan', phase: 'Intake',
  agentType: 'luna-worker', effort: 'low', schema: TEXT, stallMs: 0})

// ========== RESEARCH ==========
phase('Research')
const research = await parallel([
  () => agent(ULTRA + `ROLLE Research-Lead (Firma/Markt/SERP).
WebSearch/WebFetch. Live-URL nur EINE Quelle. Proof-Inventar (belegbar vs ungeprüft).
Datei ${OUT}/01-firma-dossier.md. ${mustWrite()}`, {
    label: 'research-company', phase: 'Research',
    agentType: 'grok-worker', schema: TEXT, stallMs: 0 }),
  () => agent(ULTRA + `ROLLE Reach/Social/GBP/Maps.
Prüfe Socials + GBP/Maps-Signale; fehlende Kanäle = "nicht vorhanden".
Datei ${OUT}/01b-online-praesenz.md. ${mustWrite()}`, {
    label: 'research-reach', phase: 'Research',
    agentType: 'kimi-worker', schema: TEXT, stallMs: 0 }),
  () => agent(ULTRA + `ROLLE Research-Critic (andere Familie, adversarial).
Lies Dossier/Reach falls da; greife Lücken/Proof-Risiken an.
Datei ${OUT}/01c-research-critic.md. ${mustWrite()}`, {
    label: 'research-critic', phase: 'Research',
    agentType: 'sol-pruefer', schema: TEXT, stallMs: 0 }),
])
log('research done: ' + research.filter(Boolean).length)

// ========== ASSETS (Luna/Wellen — nie Opus; Tempo 5c51f3a5) ==========
phase('Assets')
// 4 parallele Inventar-Shards (alphabetisch index%4). Merge schreibt die kanonischen Dateien.
await parallel([0, 1, 2, 3].map((shard) => () =>
  agent(ULTRA + `ROLLE Asset-Inventar Shard ${shard}/4.
Liste alle Bild-/Medien-Dateien aus ASSET_DIRS und Repo-Medien (ls, sortiert).
Bearbeite NUR Dateien mit (index % 4) === ${shard}.
Pro Bild: Pfad, Typ, Kurzbeschreibung, Alt-Text-Vorschlag DE, Einsatz-Hinweis.
Read nur wenn Name/Ordner den Inhalt nicht klären — bei >80 Dateien max 25 Reads gezielt.
Datei ${OUT}/02-teile/inventar-shard-${shard}.md. ${mustWrite()}`, {
    label: 'assets-shard-' + shard, phase: 'Assets',
    agentType: 'luna-worker', effort: 'low', schema: TEXT, stallMs: 0,
  })
))
await agent(ULTRA + `ROLLE Asset-Merge + Gap-Matrix.
Lies ${OUT}/02-teile/inventar-shard-0.md … -3.md (fehlende Shards = leer).
Schreibe:
1) ${OUT}/02-asset-inventar.md — EIN Gesamtinventar, nichts weglassen.
2) ${OUT}/02b-asset-gaps.md — Wollen-vor-Haben + Gap-Matrix:
   pro Lücke VORHANDEN | ERSTELLEN | SUCHEN | FOTOGRAFIEREN | GESPERRT.
Kein erneutes Massen-Read der Bilder. ${mustWrite()}`, {
  label: 'assets-merge', phase: 'Assets',
  agentType: 'luna-worker', schema: TEXT, stallMs: 0,
})

if (isFull) {
  // ========== SEO ==========
  phase('SEO')
  await agent(ULTRA + `ROLLE SEO-Draft.
${LIVE_URL ? `Audit Live → ${OUT}/03-seo-audit.md.` : 'Kein Live-Audit (keine URL).'}
Voller ${OUT}/04-seo-plan.md (Keyword→URL, Tech, On-Page, Internal Links, Local oder N/A,
E-E-A-T, Schema, CWV, PFLICHT AEO/AI-Search, Analytics, P0/P1/P2, Verbote).
SEO-Data-API wenn verfügbar, sonst Schätzungen KENNZEICHNEN. ${mustWrite()}`, {
    label: 'seo-draft', phase: 'SEO',
    agentType: 'opus-builder', effort: 'high', schema: TEXT, stallMs: 0,
  })
  await parallel([
    () => agent(ULTRA + `ROLLE SEO-Critic adversarial.
Lies 04-seo-plan (+03). Cannibalization, Intent, AEO, Doorways.
Datei ${OUT}/04b-seo-critic.md. ${mustWrite()}`, {
      label: 'seo-critic', phase: 'SEO',
      agentType: 'kimi-recherche', schema: TEXT, stallMs: 0,
    }),
    () => agent(ULTRA + `ROLLE Growth-Critic.
Killt SEO die Conversion? CTA-Modell?
Datei ${OUT}/04c-growth-critic.md. ${mustWrite()}`, {
      label: 'growth-critic', phase: 'SEO',
      agentType: 'grok-worker', schema: TEXT, stallMs: 0,
    }),
  ])

  // ========== IA + G-IA STOP ==========
  phase('IA')
  await parallel([
    () => agent(ULTRA + `ROLLE IA-Worker A.
Zwei echte Sitemap/Sektions-Alternativen → ${OUT}/05-ia-entwurf-a.md. ${mustWrite()}`, {
      label: 'ia-a', phase: 'IA', agentType: 'kimi-worker', schema: TEXT, stallMs: 0,
    }),
    () => agent(ULTRA + `ROLLE IA-Worker B (andere Familie).
Zwei andere Alternativen → ${OUT}/05-ia-entwurf-b.md. ${mustWrite()}`, {
      label: 'ia-b', phase: 'IA', agentType: 'opus-builder', schema: TEXT, stallMs: 0,
    }),
  ])
  const ia = await agent(ULTRA + `ROLLE IA-Judge.
Forme GENAU 3 Optionen A/B/C (keine Schein-Varianten). Empfehlung.
Schreibe ${OUT}/05-ia-variants.md mit voller Ausarbeitung.
Return recommendation + options + markdown.`, {
    label: 'ia-judge', phase: 'IA',
    agentType: 'sol-pruefer', effort: 'high', schema: VARIANTS, stallMs: 0,
  })
  // HARD STOP — Parent muss Raphael fragen und Lauf 2 starten (oder resume)
  return {
    gate: 'G-IA',
    status: 'AWAITING_USER',
    recommendation: ia && ia.recommendation,
    options: ia && ia.options,
    message: 'G-IA STOP: Raphael wählt A/B/C (oder Mix). Danach Workflow FORTSETZEN mit SCOPE=FULL_AFTER_GIA und gewählter Variante in OVERRIDES. Nicht defaulten.',
    out_dir: OUT,
  }
}

// Enger Scope (z.B. nur Bilder/Sektionen): Duell statt vollem SEO/IA
phase('IA')
const duel = await parallel([
  () => agent(ULTRA + `ROLLE Konzept-Worker A (eng SCOPE=${SCOPE}).
Voller Plan für erlaubten Scope (Bilder/Sektionen/Layouts). Datei ${OUT}/duell/vorschlag-a.md. ${mustWrite()}`, {
    label: 'duel-a', phase: 'IA', agentType: 'kimi-worker', schema: TEXT, stallMs: 0 }),
  () => agent(ULTRA + `ROLLE Konzept-Worker B. Datei ${OUT}/duell/vorschlag-b.md. ${mustWrite()}`, {
    label: 'duel-b', phase: 'IA', agentType: 'opus-builder', schema: TEXT, stallMs: 0 }),
  () => agent(ULTRA + `ROLLE Konzept-Worker C. Datei ${OUT}/duell/vorschlag-c.md. ${mustWrite()}`, {
    label: 'duel-c', phase: 'IA', agentType: 'grok-worker', schema: TEXT, stallMs: 0 }),
])
const judge = await agent(ULTRA + `ROLLE Judge. Ranking + Sieger + was geklaut wird.
Datei ${OUT}/03-sektionen-layout-plan.md (oder scope-passender Name). ${mustWrite()}`, {
  label: 'duel-judge', phase: 'IA', agentType: 'sol-pruefer', schema: TEXT, stallMs: 0})
return {
  gate: 'SCOPE_NARROW_DONE',
  status: 'COMPLETE_NARROW',
  message: 'Enger SCOPE fertig. Für FULL-Plan neuen website-plan Lauf mit SCOPE=FULL starten.',
  out_dir: OUT,
  duel_ok: duel.filter(Boolean).length,
  judge: !!judge,
}

// HINWEIS: Phasen Copy/Specs/Design/Close laufen in website-plan-after-gia.js
// nach G-IA-Freigabe (siehe Skill AUTO-START Lauf 2).
