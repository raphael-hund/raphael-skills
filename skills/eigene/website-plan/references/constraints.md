# Constraints (MUSS / MUSS-NICHT)

## MUSS

1. Kanon-Workflow starten (Run-ID vorhanden).  
2. Cockpit Ultracode / max Effort.  
3. `SCOPE=FULL` default; eng nur bei explizitem User-Wort + Delta-Doku.  
4. Sub-Agents in Research/SEO/IA/Copy/Design (Gauntlet: Draft ≠ Critic-Familie).  
5. G-IA und G-DESIGN hard stop mit 3 echten Varianten + Empfehlung.  
6. Social + GBP + Maps + Reach abdecken (sonst eine Zeile „nicht vorhanden“).  
7. Bei FULL: SEO-Plan inkl. **AEO**; Keywords über SEO-Data-API wenn verfügbar (sonst Schätzung kennzeichnen).  
8. Finale UI-Copy humanisieren (Humanizer / no-ai-slop).  
9. Claims nur aus Proof-Inventar.  
10. Adobe Fonts first wenn keine Brand-Font; Repo-Components first.  
11. Vor G-DESIGN: `G-REF=PASS` nach `design-inspiration.md` — echte lokale
    Referenz-Captures, Herkunftsmanifest und drei GPT-Prompt-Pakete.  
12. Worker mit Datei-Output müssen Schreibrecht haben; read-only Critics liefern
    Urteil an einen separaten Writer/Persist-Schritt.  
13. **TEMPO:** Assets/Inventar/Listen/Merge = `luna-worker` (Shards bei >40 Dateien).
    Copy/Humanize/Specs in parallelen Shards. Max 3 Tool-Calls pro Datei, ein Pass.  

## MUSS-NICHT

1. Freestyle-Workflow-Script erfinden oder Phasen aus dem Kanon streichen ohne SCOPE-Delta.  
2. Solo-Parent schreibt den Plan ohne Workflow-Run-ID.  
3. Fable als Workflow-`agentType`.  
4. Erfundene Reviews, Ratings, Zertifikate, „#1“ — auch wenn User faken will.  
5. G-IA/G-DESIGN still defaulten.  
6. FULL-DoD bei engem SCOPE behaupten.  
7. Production-Code bauen (`app/`, `components/`) in diesem Skill.  
8. Keyword-Dump ohne Keyword→URL-Map.  
9. AskUserQuestion-Kaskade vor dem ersten Workflow.  
10. `orchestrate-gauntlet` **statt** website-plan-Kanon (nur optional zusätzlich).  
11. Link-Dump, Moodboard nur aus URLs oder behaupteter Mobbin-Zugriff ohne
    exponierten Connector und lokale Captures.  
12. G-DESIGN-Wahl ohne drei visuell vergleichbare Hero-Outputs; ohne Bildtool
    lautet der Stop `AWAITING_MOCKUPS`.  
13. `opus-builder` / `sonnet-worker` für Asset-Inventar, Massen-Read oder
    einen einzelnen Humanizer über alle Seiten.  
14. Bild-Generierung sequentiell in einem Agent mit langem Wait-Timeout
    (≤5 parallel, 1 Bild/Agent, Wait kurz).  

## Gate-Format

```markdown
### Entscheidung: G-IA | G-DESIGN
**Empfehlung: Option B** — (1 Satz warum)

| Option | Was das bedeutet | Tradeoff |
| A | … | … |
| B | … | … |
| C | … | … |
```

Varianten müssen strukturell verschieden sein (keine kosmetischen Umformulierungen).
