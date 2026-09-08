# web 4.0.0 (08.09.2026)

Der Einstieg ist [SKILL.md](SKILL.md). Gepflegte Quelle: `/root/raphael-skills/skills/eigene/web`, verlinkt nach `/root/.claude/skills/web` (Claude Code, `/web`), `/root/.codex/skills/web` (`$web`) und `/root/.agents/skills/web`.

4.0.0 führt drei Stände zusammen:

- **0.34.0 (bis 06.09.2026):** Rollen Plan/Kritik/Bau/Launch mit `session-gate.mjs`, Fold-Duell, Kritik-Matrix, Agent-Roster, Stil-Regeln, Muster-Bibliothek mit Cases, Werkzeugtabelle und `werkzeug-gate.mjs`, 31 Skripte (`shot-sweep`, `axe-run`, `craft-check`, `formular-check`, `tastatur-check`, `g1-gate`, `onpage-check`, `komponenten`, `inspiration`, `design-mcp`, `stock`, `bilder`, `run-evidence`, Web-Clone) und 60 Evals.
- **2.0.0–2.2.0 (07.09.2026, MAKE Web Astra):** 56 Galerien, 50 UI-Bibliotheken mit Lizenzkorpus, Emil-Kowalski-Motion nativ, Bildsuche mit `find-images.mjs`, GPT-Image-Modul, Bildbibliothek, Image-to-Code, Scrollcraft, Service-Referenzkorpus, 14 Design-Depth-Kapitel mit Messwerten, SEO-Seitenkarte mit `validate-page-map.mjs`, DESIGN.md-Vertrag.
- **3.0.0 (08.09.2026):** React-Stack (Next.js App Router, Tailwind v4, shadcn), geprüfter `assets/react-starter`, `component-registries.md` mit 31 live geprüften Registry-Namespaces, npm-Bibliotheken und den MCP-Servern `21st`, `shadcn`, `mantine`, 21st-CLI mit Design Context.

Neu in 4.0.0: Agentenkatalog auf Fable/Astra/Kimi (Stufe 1) plus Opus/Grok (Stufe 2), Sol nur Backend; Workflow-Tool statt `/orchestrate`; gemeinsamer Playwright-Loader für alle Screenshot-Skripte; Verbund-Hinweise zwischen alten und neuen Modulen; `references/_archiv/vault-abhaengig/` für Dateien, die den nicht mehr vorhandenen Library-Tresor brauchten.

Was der Skill nicht mehr voraussetzt: `web-anti-slop`, `orchestrate`-Chip, `/root/tools/uikit-vault`, `/root/tools/vendor/claude-skill-web-clone`, Radix-Themes-Vendor.
