# Graph-Vorlage — Karte (graph.md) und Kompilat (Workflow-Script)

## 1. Die Karten-Datei: `graphs/<name>.graph.md`

```markdown
# Graph: seo-artikel
Stand: <Datum> · Läufe: <Run-IDs mit Datum anhängen>

## Frozen Rules
- Brand-Voice: <...>
- Verbotene Claims: <...>
- Rot-Klassen: publish endet in ops/review-inbox.md, nie live.

## Nodes
| Node | Worker (agentType) | Kontext-Pack | Output | Loop? |
|---|---|---|---|---|
| research | opus-builder | brain-hot + Keyword-Brief | research.md | nein |
| brief | opus-builder | research.md | brief.md | nein |
| draft | opus-builder | NUR brief.md (bewusst eng) | draft.md | nein |
| score | sol-pruefer | draft.md + Rubrik | verdict JSON | ja, max 3 |
| publish-vorschlag | luna-worker | draft.md final | Inbox-Eintrag | nein |

## Routen + Checkpoints
- research → brief (Checkpoint: hat Suchintention + Konkurrenz + Fragen? sonst → research)
- brief → draft
- draft → score
- score PASS → publish-vorschlag · score FAIL → draft (max 3, danach → brief)
- GATE (extern): Lint/Wortzahl/Link-Check per Bash — kein Agenten-Urteil
- ANKER (nach Livegang, außerhalb des Graphen): indexiert? klettert? zitiert? — Miss → research

## Input je Lauf
<Keyword / Kunde / Thema — das Einzige, was pro Lauf wechselt>
```

## 2. Das Kompilat: Workflow-Script-Muster

Ein Graph kompiliert zu einem Workflow-Script. Muster für die drei
Grundformen:

**Kette (research → brief → draft):** sequenzielle `await agent(...)`-Aufrufe,
jeder bekommt die PFADE der Vorergebnisse (Slice-Falle!).

**Loop-in-Node (draft ↔ score, max 3, danach Rückroute → brief):**
```javascript
// LONGHORIZON gehört in JEDEN Node-Prompt (Pflicht bei Luna und bei jedem
// ausdrücklich gewählten Fremdmodell — die erben
// das private CLAUDE.md nicht und bleiben sonst bei Unsicherheit stehen):
const LONGHORIZON = 'Long horizon session, human is away — autonom arbeiten, ' +
  'nicht rückfragen, bei Unsicherheit weiterarbeiten. Rot-Klassen bleiben bindend.'

// Äußerer Loop = die Karten-Route "score FAIL → draft (max 3, danach → brief)":
// nach 3 roten Score-Runden wird der Brief EINMAL neu geschrieben, dann
// nochmal 3 Draft-Runden. Erst wenn auch das rot bleibt: Abbruch.
let verdict = null
for (let briefRunde = 0; briefRunde < 2; briefRunde++) {
  if (briefRunde > 0) {
    await agent(`${LONGHORIZON} Überarbeite ${DIR}/brief.md grundlegend — der ` +
      `Draft scheiterte 3x am Score, letzte Mängel: ${JSON.stringify(verdict.maengel)}.`,
      { label: 'brief:neu', phase: 'Brief', agentType: 'opus-builder' , stallMs: 0 })
  }
  for (let runde = 0; runde < 3; runde++) {
    await agent(`${LONGHORIZON} Schreibe/überarbeite den Artikel nach ${DIR}/brief.md` +
      (verdict ? ` und diesen Mängeln: ${JSON.stringify(verdict.maengel)}` : '') +
      `. Schreibe nach ${DIR}/draft.md. Frozen Rules: ${FROZEN}`,
      { label: `draft:b${briefRunde}r${runde}`, phase: 'Draft', agentType: 'opus-builder' })
    verdict = await agent(`${LONGHORIZON} Bewerte ${DIR}/draft.md gegen die Rubrik: ${RUBRIK}.`,
      { label: `score:b${briefRunde}r${runde}`, phase: 'Score', agentType: 'sol-pruefer', schema: VERDICT })
    if (verdict && verdict.pass) break
  }
  if (verdict && verdict.pass) break
}
if (!verdict || !verdict.pass) return { abbruch: 'score auch nach Brief-Neuschrieb rot', verdict }
```

**Externes Gate (Bash-Anker):** ein Agent führt den Check aus und liefert
das ROHE Ergebnis (Exit-Code + Ausgabe) — er interpretiert nicht weg:
```javascript
const gate = await agent(`${LONGHORIZON} Führe aus: <GATE-KOMMANDO>. Gib {exitCode, output} zurück, ungeschönt.`,
  { label: 'gate:lint', phase: 'Gate', agentType: 'luna-worker', schema: GATE_SCHEMA , stallMs: 0 })
if (!gate || gate.exitCode !== 0) return { abbruch: 'Gate rot', gate }
```
Das Cockpit prüft das Gate nach dem Run NOCHMAL selbst (Bash) —
Agenten-Report ist Hinweis, nicht Beweis.

**Fan-out über Inputs (Karte wiederverwenden):** `pipeline(inputs, lauf1, lauf2, ...)`
— jeder Input durchläuft die ganze Kette unabhängig; getrennte
Output-Ordner je Input (Schreib-Rennen).

## 3. Merkregeln

- `meta.phases` = die Node-Namen der Karte (gleiche Titel wie `phase()`/`opts.phase`).
- Rundenlimits IMMER (Default 3) — Abbruch ist ein Ergebnis, kein Fehler.
- Verdict-Schemas klein halten: `{pass, maengel[], beleg}`.
- Vor Start: validate-workflow.py. Nach Crash: patchen + `resumeFromRunId`.
- Run-ID + Datum in den Karten-Header — die Karte sammelt ihre Historie.

## Beispiel: Kunden-Onboarding-Graph (Vault-Accelerator-Muster)

Node 1 „research" — Worker: sol-pruefer (Urteil/Tiefe).
  Liest: /root/raphael-brain/wiki/hot.md, /root/clients/client-<slug>/wiki/
  (ICP/OFFER/PROOF/VOICE aus Loop 1), vergangene Kampagnen/Reports
  (/root/clients/client-<slug>/state/). Output: Cohort-Brief (wer, welches
  Angle, welcher Beweis zieht).
Node 2 „landingpage" — Skill: web (Loop 2), Worker nach Modell-Matrix.
  Input: Cohort-Brief aus Node 1 (Pfad, kein Inline-Dump). Output: Seite +
  Screenshot-Sweep (shot-sweep.mjs).
Node 3 „content" — Skill: ads-video/ads-statics + seo, Worker nach Modell-Matrix.
  Input: Cohort-Brief + Landingpage-URL. Enthält eigenen Loop-in-Node: Kritiker
  (eval-Skill, G2-Judge) schickt Drafts zurück, bis Rubrik >= 0.7.

Checkpoints zwischen den Nodes: Handoff nur mit Dateipfad, nie Copy-Paste.
Gate (extern, Pflicht): Node 2 hängt an web's G1 (Lighthouse/axe) UND am
Screenshot-Kritik-Loop (siehe web/references/screenshot-kritik-loop.md) —
kein „sieht fertig aus", bevor der Screenshot es zeigt.
Frozen Rules: Rot-Klassen aus AGENTS.md (Kundennachricht, Deploy, Budget)
bleiben Raphaels Signatur, kein Node darf sie überspringen.
