# Gauntlet-Graph — Format der Karte und das Workflow-Skelett

## Die Karten-Datei

Speicherort: `gauntlet/<name>.graph.md` im Projektordner. Die Karte ist die
Quelle der Wahrheit, das Workflow-Script nur ein Kompilat — Änderungen zuerst
in der Karte.

```markdown
# Gauntlet: <name>

RUN-IDS:   wf_xxxx (R1), wf_yyyy (R2)
LATTE:     gauntlet/<name>/latte/   (Screenshots, URLs, Referenztext, Testsuite)
STAND:     gauntlet/<name>/workbench.md

## Frozen Rules  (wandern WÖRTLICH in jeden Node-Prompt)
- Brand-Voice: <…>
- Verbotene Claims: <…>
- Rot-Klassen: nichts live, kein Deploy, keine Kundennachricht
- Zielordner: <…>; nichts außerhalb anfassen
- Kein Reward-Hacking: Tests nie löschen/überspringen/aufweichen
- long horizon session, human is away — nicht auf Rückfrage warten

## Nodes
| id | Stück | Builder (agentType) | Kritiker (andere Familie!) | write_set | Output |
|---|---|---|---|---|---|
| n1 | Hero-Sektion | kimi-worker | sol-pruefer | src/hero.* | gerenderter Screenshot |
| n2 | Preis-Sektion | kimi-worker | opus-builder | src/pricing.* | gerenderter Screenshot |
| n3 | Build + Tests | luna-worker | sol-critic + opus-critic | tests/* | Testausgabe |

## Routen
n1 → check1 → n2 → check2 → n3 → gate_build → glätten → fertig
check1 FAIL → n1 (max 5)
check2 FAIL → n2 (max 5)
gate_build FAIL → n3 (max 3)
Spät-Fehlschlag „Gesamtwirkung verliert" → zurück zu n1 (nicht zum letzten Fix)

## Checkpoints (Agenten-Urteil, routen vor/zurück)
- check1: GEWINNER gegen Latte-Screenshot Hero + EINE Lücke + BELEG
- check2: dito für Preis-Sektion

## Gates (unüberspringbar, mind. eines ein EXTERNER ANKER)
- gate_build  [EXTERNER ANKER]: `npm run build` exit 0
- gate_shot   [EXTERNER ANKER]: Screenshot-Datei existiert und ist nicht leer
- gate_abnahme: sol-pruefer PASS auf das geglättete Ganze
```

**Ohne externen Anker kein Graph.** Reine Agenten-Rubriken bestehen sich selbst;
ein Build-Exit-Code, ein Testlauf, eine existierende Screenshot-Datei oder ein
Lighthouse-Wert nicht.

## Workflow-Skelett

Gebaut nach `orchestrate/references/workflow-vorlage.md`, validiert mit
`python3 /root/raphael-skills/skills/eigene/orchestrate/scripts/validate-workflow.py <script>`
— FAIL heißt nicht starten.

```javascript
export const meta = {
  name: 'gauntlet-<name>-R<N>',
  description: '<Werkstück> gegen die Latte hochziehen',
  phases: [
    { title: 'Bauen',   detail: 'je Stück ein Builder' },
    { title: 'Richten', detail: 'Kritiker anderer Familie, EINE Lücke' },
    { title: 'Glätten', detail: 'ein frischer Agent zieht alles zusammen' },
  ],
}

const stuecke = typeof args === 'string' ? JSON.parse(args) : (args || [])
const LATTE = 'gauntlet/<name>/latte/'   // PFAD, nie Inline-Dump
// PFLICHT: beide vor dem ersten agent()-Call definieren — sonst ReferenceError.
const FROZEN_RULES = `<die Frozen Rules aus der Graph-Datei, woertlich>`
const GATES = '<exakter Shell-Befehl der Gates, z. B. npm run build && npm test>'

const VERDIKT = { type:'object', additionalProperties:false, properties:{
  gewinner: { enum:['LATTE','UNSERES'] },
  luecke:   { type:'string' },   // GENAU EINE
  beleg:    { type:'string' },   // was gesehen/gemessen wurde
}, required:['gewinner','luecke','beleg'] }

// Bauen-Richten-Loop je Stück, unabhängig voneinander (pipeline, keine Barriere)
const ergebnisse = await pipeline(stuecke,
  async (s) => {
    let runde = 0, letzte = null
    while (runde < 5) {
      runde++
      await agent(
        `${FROZEN_RULES}\n\nOBJECTIVE: ${s.ziel}\nCONSTRAINTS: nur ${s.write_set}\n` +
        `VALIDATION: ${s.pruefbefehl}\nSTOP: wenn VALIDATION gruen\nDOCS: ein Satz je Aenderung\n` +
        (letzte ? `\nSCHLIESSE GENAU DIESE LUECKE: ${letzte.luecke}\nBELEG: ${letzte.beleg}` : ''),
        { label:`bau:${s.id}:r${runde}`, phase:'Bauen', agentType: s.builder })

      const v = await agent(
        `${FROZEN_RULES}\n\nDu bist Kritiker. Vergleiche das ECHTE Artefakt gegen die Latte.\n` +
        `LATTE (Dateien lesen/ansehen): ${LATTE}\nARTEFAKT: ${s.artefakt}\n` +
        `Pruefe am gerenderten Bild bzw. an der echten Testausgabe — NIE an einer ` +
        `Zusammenfassung des Builders. Blind A/B wo moeglich.\n` +
        `Gib zurueck: gewinner, GENAU EINE groesste Luecke, beleg. Keine Wunschliste. ` +
        `Kein "erklaere deinen Gedankengang".`,
        { label:`richt:${s.id}:r${runde}`, phase:'Richten',
          agentType: s.kritiker,          // ANDERE FAMILIE — Tabelle in besetzung.md
          schema: VERDIKT })

      if (!v) break
      letzte = v
      if (v.gewinner === 'UNSERES') break
    }
    return { stueck: s.id, runden: runde, verdikt: letzte }
  }
)

phase('Glätten')
const glatt = await agent(
  `${FROZEN_RULES}\n\nDie Stuecke wurden unabhaengig verbessert. Gleiche sie zu EINEM ` +
  `Ganzen an: Abstaende, Typografie, Ton, Namensgebung. KEIN Redesign, nur Angleich. ` +
  `Danach ${GATES} laufen lassen und die Ausgabe einfuegen.`,
  { label:'glätten', phase:'Glätten', agentType:'sonnet-worker' })

return { ergebnisse: ergebnisse.filter(Boolean), glatt }
```

## Merkregeln

- `pipeline()` ist Default — Stück A darf in Runde 4 sein, während Stück B noch
  in Runde 1 ist. `parallel()` nur, wenn eine Stufe wirklich alle Stücke
  zusammen braucht.
- `meta` ist ein pures Literal; kein `Date.now()`, kein `Math.random()`.
- Args-Liste als echtes JSON-Array übergeben UND defensiv parsen.
- Latte und große Zwischenergebnisse als **Pfad** übergeben, nie als
  Inline-Dump (Slice-Falle: alles über ~8k Zeichen wird still gekappt).
- Agent-Ausfälle liefern `null` → `.filter(Boolean)`.
- Bei Crash: Script patchen, `resumeFromRunId` — fertige Agenten kommen aus dem
  Cache. Vor „Ergebnis leer"-Diagnosen `journal.jsonl` lesen.
- Rundenlimit je Stück (Default 5) verhindert Endlos-Kreisen; der Gesamtlauf
  hat trotzdem **keine** feste Rundenzahl.

## Loop-in-Node

Der Bauen-Richten-Loop oben IST der Loop im Node. Ein Node darf zusätzlich
intern schleifen (z. B. Builder wiederholt bis `VALIDATION` grün), aber die
Bewertung gegen die Latte macht immer der externe Kritiker.
