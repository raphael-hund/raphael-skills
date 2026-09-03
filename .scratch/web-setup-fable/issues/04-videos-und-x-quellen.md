# Videos und X-Quellen auswerten (läuft)

Type: research
Status: resolved
Blocked by: 

## Question

Was lehren die 6 Videos (Nate Herk ×3, Goldie, Finn, Saraev) und 5 X-Quellen (tranmautritam-Post, LexnLin, EXM7777, shannholmberg, kunchenguid) konkret für ein Claude-Code-Website-Setup unter Fable 5.1, was ist Hype, was hat das Setup schon? Läuft als Workflow wf_33249fdc-34d; Synthese landet in scratchpad/recherche/SYNTHESE.md.

## Answer

Synthese: /tmp/claude-997/-root/eeba6b3f-9784-4222-a9db-d2265e8f025e/scratchpad/recherche/SYNTHESE.md (405 Zeilen), Einzelauswertungen unter /tmp/claude-997/-root/eeba6b3f-9784-4222-a9db-d2265e8f025e/scratchpad/recherche/videos/*/auswertung.md und /tmp/claude-997/-root/eeba6b3f-9784-4222-a9db-d2265e8f025e/scratchpad/recherche/x/*.auswertung.md.

**Videos:** Nur ein Video trägt Substanz für das Setup: Nate Herk "Fable 5.1 kills website slop" (FFWtxjvW2ts): Referenzseiten benennen statt Adjektive, Layering/Parallax als Premium-Signal, eigener Design-Skill ("ScrollCraft"), Desktop+Mobile-Screenshot-Loop, Pain/Person/Promise-Briefing. "Claude Code vs Codex" (bg0C-2iUUqM) belegt: Claude baut textlastig ("too wordy, feels like a report"), maximal spezifische Prompts nivellieren den Modellunterschied; Fable kommt darin nicht vor. Die vier anderen (Herk kurz, Goldie, Finn, Saraev) sind Benchmark-Recaps oder Funnel-Videos ohne Prompt, Skill oder Screenshot. Keine Quelle belegt eine Fable-5.1-spezifische Design-Eigenschaft; alle Zahlen stammen aus Anthropics Launch-Blog. Auto-Untertitel transkribieren "Claude/Opus" teils als "Fable".

**X:** tranmautritam-Post = Linkliste zur Google-Labs-Spec DESIGN.md (getdesign.md, styles.refero.design, CLI-Linter). LexnLin = taste-skill (schon vendored als taste-kern.md), Profil hinter Login-Wall. EXM7777 = Agentur/Community, Style-Cloning-Prompt und Slash-Command-Workflow Setup→Vision→Plan→Sprint→Review. shannholmberg = "Loop/Graph/Harness Engineering" für Marketing: Rubrik-Score 0–1, drei Ausgänge clear/miss-with-feedback/escalate, Rubrik wächst mit jedem manuell gefundenen Fehler. kunchenguid (Kun Chen) = Autor von firstmate, axi, gnhf, treehouse, no-mistakes, lavish-axi, backpass ("AGENTS.md trainieren statt schreiben"), quota-axi.

**Themenkarte (15):** SCHON: Referenz-getrieben (T1), Screenshot-Beweis (T3), Mobile (T4), Evidenz-Ende (T9), Worktree (T15). TEILWEISE: Kanon (T2), Layering-Vokabular (T5), Pain/Person/Promise (T6), DESIGN.md-Spec (T7), Kritik-Ausgänge + wachsende Rubrik (T8), Modell-Benchmark (T10), periodischer Setup-Audit (T11), Copy-Dichte nach Fold (T14). NICHT: Kostenspur je Build (T12). KONFLIKT ohne Vorschlag: Subagenten-Fan-out (T13, Quelle n=1 schwächer als Raphaels Regel).

**11 Vorschläge in Pflichtform** (V1–V11 in SYNTHESE.md §2 und §3.3) mit Zieldatei; **5 Pipelines** (P1 Eingang-Watcher, P2 Wochen-Stamp-Batch, P3 Bookmark-Kanal, P4 Video-Vorfilter mit Haiku, P5 Quellen-Ledger mit Ablaufdatum). **Blocker:** Firecrawl-MCP meldete "API key invalid or revoked" in 4 von 5 X-Läufen; X-Profile hinter Login-Wall nach ~5 Posts.
