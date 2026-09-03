# Map: Website-Setup für Claude Code mit Fable 5.1 als Controller

Label: wayfinder:map · angelegt 2026-09-02 · Tracker: lokal (`.scratch/`)
Owner: Raphael (Stamps, Geschmack) · Controller: Fable-Hauptsession · Flotte: multi-family; Fable nie Subagent

## Destination

Ein Website-Setup, mit dem Raphael in Claude Code unter Fable 5.1 als Controller Agentur-Websites baut, die er blind neben einer von ihm gestempelten Referenz als "so würde ich es rausschicken" abnimmt. Bestandteile: überarbeiteter `web`-Skill (dünner, mit Vorbildern statt nur Verboten, Impeccable-Verben als Phasen), ein aktives Flottenprofil `multi-family` mit `claude-only` als geprüftem Schalter im Arbeitsvertrag, eine laufende Pipeline von X-Bookmarks/Videos/Referenzseiten in den Geschmacks-Kanon, und eine Pilot-Seite als Abnahme.

## Notes

- Domäne: Skill-Engineering am Repo `/root/raphael-skills` (Skills `web`, `design`, `copywriting`, `visual-aaa`, `web-anti-slop`, `website-plan`) plus `/root/.claude/CLAUDE.md` Abschnitt 3.
- Skills je Ticket: Research → `research`; Grilling → `plan` (Grill-Stufe) + `grilling`; Skill-Änderung → `skill-update` (Pflichtform) und `writing-skills` (Form, Subtraktion erlaubt).
- Gültige Vorentscheidungen (Raphael): kein Kanon aus unfertigen Kunden (30.08.); Site-Build-Load = web + design + copywriting (01.09.); Stil-Regeln Pflicht vor Art-Direction; S22 Detailfragen selbst entscheiden; keine Fable-Subagents (02.09.); „nur Opus/Sonnet/Haiku“ (02.09. ~12:00) ist durch Raphaels spätere Ansage in Session 267c4022 (02.09. 14:19 UTC: alle Claude-, GPT-, Grok-, Kimi-Modelle nutzbar) überholt — Raphael 02.09. 17:xx UTC: „multi-family bleibt“ — Live-Profil multi-family ist Entscheidung, claude-only bleibt Schalter.
- Defaults dieser Session: Ziel = ganzes Setup (1B); multi-family bleibt aktiv, claude-only bleibt als Schalter und erlaubt Sonnet read-only (2); Copy schreibt Opus im eigenen Leaf, Sonnet judged (3A); Impeccable-Verben als Phasen in `design` (4B); Kanon-Pipeline aus Bookmarks/Accounts (5 ja); Cookies für Bookmarks (6A); Design-System im Code (7A); ein Chat, drei Workflow-Phasen (8B); Subtraktion erlaubt (9 ja); frontend-design nur Ideen-Merge (10B); Pilot = MAKE-eigene Website (11); Erfolgskriterium = Blind-Abnahme am Screenshot plus deterministische Gates (12).
- Execution ist in dieser Map erlaubt (Raphael: "lass dir die Skills von Opus, Sonnet … machen"); Task-Tickets 11–16 bauen, nach Entscheidung des jeweils blockierenden Grilling-Tickets.
- Geprüfte Fakten 02.09.: google-labs-code/design.md ist Apache-2.0 (grün). taste-skill upstream HEAD ccbc1563 vom 24.08.2026; vendored Commit in design/VENDORING.md nicht als Zeile gefunden = Drift nicht geprüft. Firecrawl-MCP in ~/.mcp.json mit Header-Key konfiguriert, Key laut 4 Läufen ungültig (Betrieb).
- Quellen-Recherche abgeschlossen: Workflows `wf_33249fdc-34d` und `wf_9cc83efd-833`, Output `/tmp/claude-997/-root/eeba6b3f-9784-4222-a9db-d2265e8f025e/scratchpad/recherche/`.

## Decisions so far

- [Impeccable-Original gegen vendored design-Skill: was fehlt](issues/05-impeccable-delta.md) — Detektor 46 → 59 Regeln, craft-floor Refuse-Block fehlt; Verben schon 1:1 drin, Context-Flow bewusst weggelassen; Lizenz grün für Detektor-Kern.
- [Anthropic frontend-design gegen design-Skill: Delta](issues/06-frontend-design-delta.md) — emil/apple/animation sind Dubletten; echtes Delta: Zwei-Pass-Review vor Code, Signature-Element, dritter Slop-Cluster; Risiko-Konflikt dial-abhängig auflösen.
- [Videos und X-Quellen auswerten](issues/04-videos-und-x-quellen.md) — nur Herk (FFWtxjvW2ts) und "Claude vs Codex" tragen Substanz; kein Beleg für Fable-spezifische Design-Stärke; 15 Themen, 5 schon drin, 9 teilweise, 1 fehlt (Kostenspur); 11 Vorschläge V1–V11, 5 Pipelines P1–P5 in SYNTHESE.md.
- [Audit fremde Modellfamilien](issues/10-familien-abhaengigkeiten-audit.md) — 17 von 24 Agent-Dateien tragen fremde Modelle und sind der einzige Runtime-Hebel; ca. 55 Prosa-Gates; Reihenfolge Agent-Dateien → CLAUDE.md §3 → Proxy-Doc → dispatch.md → kritik-matrix.md.
- [Flottenprofil claude-only und Ziel](issues/01-flottenprofil-und-ziel.md) — dauerhaft mit Schalter; Opus baut, Sonnet kritisiert read-only (Instanz-Trennung, sichtbar gelabelt), Opus schreibt Copy im eigenen Leaf; Ziel = ganzes Setup.
- [Impeccable-Tiefe, DS, frontend-design](issues/07-impeccable-ds-frontenddesign.md) — Verben als Phasen in design, DS im Code je Sektor, frontend-design Ideen-Merge, Layering Premium-Ausnahme, DESIGN.md-Export zusätzlich.
- [Sessions und Subtraktion](issues/08-sessions-und-subtraktion.md) — ein Chat, drei Phasen, gleiche Dateiwahrheit; Subtraktion erlaubt.
- [Pilot und Erfolgskriterium](issues/09-pilot-und-erfolgskriterium.md) — MAKE-Website, Blind-Abnahme plus Gates, V7 klein, /cost Pflicht.
- [Synthese-Vorschläge V1–V11 umsetzen](issues/14-synthese-vorschlaege-umsetzen.md) — alle elf als minimale Diffs in web (0.30.0) gelandet, Opus-Bau, Sonnet-Review PASS; vier Load-Path-Fails vorbestehend.
- [Profil claude-only umsetzen](issues/11-claude-only-profil-umsetzen.md) — Schalter, zwei Profilordner, Hooks, Policy, orchestrate/web/visual-aaa/copywriting profilabhängig; alle Pakete PASS. Live steht multi-family (neuere Ansage 14:19 UTC), claude-only ist der Schalter.
- [Referenzseiten stempeln](issues/03-referenz-urls-stempeln.md) — zwölf URLs von Raphael (02.09.), vier schon GO-Cases vom 31.08., acht neu für Ticket 15; Begründungssatz je URL offen.

- [Impeccable-Detektoren auf v4.0.5 nachziehen](issues/12-impeccable-detektor-refresh.md) — resolved; design 0.5.0, 59 Regeln, 36/36 Datei- und 40/40 Browser-Eval, Grok-Review PASS.
- [Zwei-Pass und Signature-Element](issues/13-zwei-pass-und-signature.md) — resolved; ein Bedeutungsort in taste-kern, Broadsheet/Hairline ergänzt, Grok-Review PASS.
- [Kanon-Pipeline bauen](issues/15-kanon-pipeline-bauen.md) — resolved; acht Studien, URL-Watcher, Stamp-Batch, Video-Vorfilter, 23-Quellen-Ledger, Wochenjob aktiv.
- [X-Bookmark-Pipeline bauen](issues/16-bookmark-pipeline-bauen.md) — resolved; 30 Rohnotizen + Provenance + Auswertungen, zwei Kandidaten, Wiederlauf 0 neu.

## Not yet specified

- Ob Kun Chens Tools (no-mistakes als Gate, lavish-axi HTML-Artefakte, backpass AGENTS.md-Training) ins Setup passen: erst nach Lizenz-/Sicherheits-Check je Repo, hängt an Ticket 16.
- EXM7777-Muster Setup→Vision→Plan→Sprint→Review gegen die Drei-Sessions-Ordnung: hängt an Ticket 08.
- Ob das Design-System pro Sektor (handwerk-local, kita, ads-lp …) als Code-Basis in `resources/` liegt oder je Kunde entsteht, hängt an Ticket 07.

## Out of scope

- Bau einer Kundenseite in dieser Map (der Pilot ist Abnahme, kein Kundenauftrag).
- Rückbau der Skill-Registry/Autoload-Hook vom 01.09. (eigene Baustelle).
- Reparatur der Proxy-Routen Kimi/Grok/Sol (Betrieb, nicht Skill).
