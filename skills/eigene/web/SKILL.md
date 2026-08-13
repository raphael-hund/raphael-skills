---
name: web
description: >
  Dach-Skill für Website-/Landingpage-Projekte (Loop 2) — immer dann, wenn
  eine komplette Site entsteht oder als Ganzes überarbeitet wird: Strategie,
  Sitemap, Copy, Build, QA, CRO-Learning, Website-Referenzen nachbauen,
  Bild-Rebuild, UI-Motion-Komponenten, Tool-Use-Case-Router
  (Defaults/Install statt Linkliste) und kuratierte Frontend-Referenzen.
  UI-Detailarbeit (Polish, Motion, Slop-Scan) delegiert er an den
  design-Skill. Trigger: "Website bauen", "Landingpage bauen",
  "Landingpage für einen Kunden", "Sitemap", "Webseite launchen", "CRO",
  "Referenzseite nachbauen", "Website clonen", "Popup/Lead-Magnet",
  "Screenshot nachbauen", "aus Bild bauen".
metadata:
  raphael-version: "0.13.1"
  raphael-class: "F"
  raphael-scope: "agency"
  raphael-sensitivity: "internal"
  raphael-loads: '["references/anfaenger-pfad.md","references/loop2-ablauf.md","references/sitemap-section-planung.md","references/qa-faecher.md","references/landingpage-struktur.md","references/informationsarchitektur.md","references/web-clone-playbook.md","references/rebuild-from-image.md","references/bildgenerierung.md","references/ui-components/INDEX.md","references/motion-doktrin.md","references/ui-layouts-catalog.md","references/cro-diagnose.md","references/experiment-programm.md","references/conversion-elemente.md","references/code-qualitaets-checkliste.md","references/security-audit-playbook.md","references/domain-safe-browsing-checkliste.md","references/readonly-db-rolle.md","references/design-systeme-vergleich.md","references/radix-shadcn-tailwind-stack.md","references/remotion-produktionsweg.md","references/screenshot-kritik-loop.md","references/tool-usecase-router.md","references/frontend-referenzbibliothek.md","references/lexlin-design-prinzipien.md","references/damien-design-methodik.md","references/agentur-rubrik.md","references/agent-roster.md","references/templates/statistics-page-template.html"]'
  raphael-requires-skills: '["copywriting@^0","design@^0","eval@^0","visual-aaa@^1"]'
  raphael-completion-criteria: '["Anfänger-Pfad: vor erstem Edit Auftrag aus references/anfaenger-pfad.md §1 benannt + nur gelistete Dateien geladen", "Lighthouse/axe = 0 Fehler (G1, hart)", "Formular-Reihenfolge: Kontaktdaten zuletzt; Drop-off pro Slide gemessen (G1, hart)", "G2 auf jedem Ship-Copy-Block >= 0.7", "Launch nur mit Raphaels Signatur + Deploy-Egress-Gate", "Bei Website-Referenz-Nachbau: Lizenz-Check aus web-clone-playbook.md dokumentiert vor Launch", "Bei components/art-direction/build mit UI-Tools: tool-usecase-router.md angewendet; Defaults+Install/Use dokumentiert; keine 160-Link-Dump-Antwort", "Messlatte-Szenario (Motion-Hero+Icons+Stock/FAQ): vier Default-Zeilen aus Router ohne Galerie-Dump", "Werkzeugtabelle in client-<name>/web/art-direction.md existiert vor dem ersten npm i; jede Zeile nennt Bedarf, Werkzeug, Befehl, Gate und Router-Anker", "Keine Dependency in package.json ohne Zeile in der Werkzeugtabelle (Nachweis: node /root/raphael-skills/skills/eigene/web/scripts/werkzeug-gate.mjs <projekt> Exit 0)", "Design-G1 nur via node design/scripts/detect.mjs (nie npx impeccable detect)", "shot-sweep immer mit --base <echte-Dev-URL> (ohne --base: Exit 2; kein stiller Default-Port)", "screenshot-kritik-loop inkl. Blind-A/B (3b) gegen Weltklasse-Referenz dokumentiert", "visual-aaa (G1 Exit 0 + visual-kritiker pass HIGH + visual-ship.json valid) — DoneClaim ohne Manifest verboten", "QA-Faecher 1-6 gruen (Conversion/Design/A11y/Technik/SEO/Trust); agentur-rubrik Zeilen 1-25 erfuellt oder Ausnahme dokumentiert", "Multi-Agent-Web-Lauf: Rollen aus agent-roster.md (agentType/Familie) — Build und Review unterschiedliche Familien"]'
---

# web — Loop 2: Website

## Start hier (Anfänger zuerst)

1. Lies **`references/anfaenger-pfad.md`** — wähle **eine** Auftrag-Zeile (§1).
2. Lade **nur** die dort genannten Dateien. Nicht die ganze loads-Liste.
3. Vor dem ersten Edit: Auftrag + geladene Pfade in einem Satz nennen.
4. Visuell? → Sweep mit **`--base`** (siehe Gotchas), jedes PNG per Read ansehen.

Detail-Ablauf und Gates: `references/loop2-ablauf.md`.

**Lies zuerst (Projekt):**  
`/root/clients/client-<name>/wiki/ICP.md`, `OFFER.md`, `PROOF.md`, `VOICE.md`
(Dossier Loop 1), `/root/raphael-brain/wiki/hot.md`.  
Alles Visuelle → Skill **design** (nicht hier neu erfinden).

**Mitgeladene Skills (keine Dateien):** `design`, `impeccable`, `taste`, `ui-ux`
— Linien/Detektoren liegen im **design**-Skill, nicht unter `web/references/`.

## Zweck (1 Satz)

Aus dem Dossier eine konversionsstarke, technisch fehlerfreie Website bauen und
aus echten Analytics verbessern.

## Eingang aus `website-plan` (fail-closed)

Wenn ein FULL-Plan unter `website-plan/` als Baukanon genannt ist, beginnt `build`
erst bei `PLAN_VERIFIED=YES` aus dessen Validator. `RUN_COMPLETE`, eine gewählte
Designrichtung oder vorhandene Briefs reichen nicht. Bei rotem Critic,
`OWNER-BLOCKER` oder fehlendem Route-/Mockup-Manifest bleibt der Build BLOCKED;
der Web-Skill entscheidet keine Kundenfakten eigenmächtig.

## Workspace-pro-Version (Raphael 10.08.2026, bindend für Bestandsseiten)

Update an einer bestehenden Site = immer neuer Workspace/Worktree von `main`
(in Orca: „New Workspace" — das IST ein Git-Worktree). Name egal, umbenennen
erlaubt. `main` trägt nur flache Squash-Commits.

- **Gefällt Raphael** → EIN Squash-Commit auf `main` (`git merge --squash`),
  Push/Deploy nur auf sein Wort, dann Workspace + Branch löschen.
- **Gefällt nicht** → Workspace + Branch ersatzlos löschen UND das Abgelehnte
  als Verboten-Eintrag in Root-`DESIGN.md`/`DECISIONS.md` schreiben. Erst dann
  gilt das Nein als eingearbeitet.
- Historie/Archiv-Ordner sind KEINE Quelle: nichts aus `git log`, alten Plänen
  oder Handoffs wieder einbauen. Was nicht im aktuellen Code oder `DESIGN.md`
  steht, ist verworfen. Muster-Repo: Wilhelm-Bedachung (`CLAUDE.md` dort).
- Nie alte Workspaces liegen lassen; nie parallel im Root-Checkout bauen.

## Worker-Präferenz (Raphael 05.08.2026)

Frontend + DE-Verkaufstext: **`opus-builder`** → Fallback **`kimi-worker`** (K3 only).  
3.-Familie-Verify: `kimi-recherche`. Nie HighSpeed/K2.7. Mapping: `agent-roster.md`.

## Reference-Routing — welche Datei wann

| Anliegen | Datei |
|---|---|
| Erster Einstieg / Auftrag wählen | `references/anfaenger-pfad.md` |
| Loop-2 Reihenfolge, Meaning-Capture, Gates, Output-Pfade | `references/loop2-ablauf.md` |
| Ads-Landing: eine Aktion, Formular-Reihenfolge | `references/landingpage-struktur.md` |
| Mehrseitige Sitemap + Section-Plan (Pflicht-Format) | `references/sitemap-section-planung.md` |
| IA-Wissen (Nav, URLs, Linkgraph) | `references/informationsarchitektur.md` |
| Rollen / agentType / Parallel | `references/agent-roster.md` |
| Tools/Defaults statt Link-Dump | `references/tool-usecase-router.md` |
| QA 6 Fächer + Formular-G1 | `references/qa-faecher.md` |
| AAA Visual/SEO/Trust (≠ WCAG AAA) | `references/agentur-rubrik.md` |
| Screenshots + Kritik-Panel + Blind-A/B | `references/screenshot-kritik-loop.md` |
| Premium Landing-Regeln (15) | `references/lexlin-design-prinzipien.md` |
| Foundations→Components→Composition | `references/damien-design-methodik.md` |
| URL-Referenz nachbauen + Lizenz | `references/web-clone-playbook.md` |
| Bild/Screenshot nachbauen | `references/rebuild-from-image.md` |
| Higgsfield / GPT Image 2 / Recraft | `references/bildgenerierung.md` |
| Motion-Regeln | `references/motion-doktrin.md` |
| Copy-paste Motion-UI | `references/ui-components/INDEX.md` |
| Default-Stack Next/Tailwind/shadcn/`motion` | `references/radix-shadcn-tailwind-stack.md` |
| Popup/Lead-Magnet | `references/conversion-elemente.md` |
| CRO Bestandsseite | `references/cro-diagnose.md` |
| A/B-Programm | `references/experiment-programm.md` |
| Security Formulare/Supply-Chain | `references/security-audit-playbook.md` |
| Custom-Code gegen AI-Slop (nach Build) | `references/code-qualitaets-checkliste.md` |
| Junge Domain vor Launch | `references/domain-safe-browsing-checkliste.md` |
| Statistik-Linkbait HTML | `references/templates/statistics-page-template.html` |
| Genau eine Ressource nach Router-Wahl (URL, Metadaten, kein Install; exakte Groß-/Kleinschreibung) | `node scripts/resource-access.mjs show "<exakter Name>"` |
| 160er-Katalog (nur nach Router-Zeile, max 3 URLs) | `references/frontend-referenzbibliothek.md` |

Vollständige Auftrag→Datei-Matrix inkl. „nicht laden“: `anfaenger-pfad.md`.

## Portabilitätsvertrag

- Koordination hält Plan, Freigaben, Abschlussbeweis.
- Rollen = Fähigkeiten, keine fest verdrahteten Provider.
- Nur Host-Werkzeuge nutzen; fehlende nie vortäuschen.
- Hintergrund-Jobs nur auf Nutzer-Wunsch; Gates (Egress, Screenshot, Abschluss) immer.

## Screenshot-Pflicht (hart)

Design wird **nur** an Screenshots entschieden. Standard-Werkzeug:

```bash
node /root/raphael-skills/skills/eigene/web/scripts/shot-sweep.mjs \
  --base http://127.0.0.1:<PORT> \
  --out /tmp/<projekt>-shots \
  --routes /
```

- Fold 1440×730, dann 1440×1500 @ 750 px Scroll, sequentiell pro Seite, Hover+Klick-Pass, `--static` für Kritik — **nie** fullPage / captureBeyondViewport.
- **`--base` Pflicht** (ohne Flag: Exit 2). Früherer Default-Port 5280 entfällt.
- Jedes PNG per Read ansehen; nach jedem Fix **alle** betroffenen Routen erneut.
- Kritik bekommt nur `manifest.json` + PNGs. Ablauf: `screenshot-kritik-loop.md`.
- Plan-Mockups sind Soll; Web-Screenshots sind Ist. Build-QA erfasst pro betroffener
  Route Desktop/Mobile sowie relevante Normal-, Loading-, Empty-, Error- und
  Success-Zustände. Reveal-Zwischenstände, unklare Cookie-/Datenzustände und
  Full-Page-Captures ohne lesbare Section-Zuordnung sind kein PASS.
- Motion-Abnahme prüft Trigger, Element, Dauer, Easing, Stagger und
  `prefers-reduced-motion` gegen den Planvertrag; ein statisches Bild allein
  beweist keine funktionierende Animation.

## Look & QA (design = einzige Design-Quelle)

| Aufgabe | Linie | Referenz |
|---|---|---|
| Landing/Kampagne | taste | design → `/root/raphael-skills/skills/design/references/taste-kern.md` |
| App/Dashboard | ui-ux | design → `/root/raphael-skills/skills/design/references/ui-ux-db-nutzung.md` |
| Design-G1 | impeccable | `node /root/raphael-skills/skills/design/scripts/detect.mjs` Exit 0 (Detektoren: `/root/raphael-skills/skills/design/references/impeccable-detektoren.md`) |
| Doktrin | fusioniert | design → `/root/raphael-skills/skills/design/references/design-doktrin.md` |

**AI-Slop-Sequenz:** design ZUERST (`/root/raphael-skills/skills/design/scripts/detect.mjs` + `/root/raphael-skills/skills/design/scripts/scan-ai-slop.mjs`) → danach
copywriting G1→G2. Nie `npx impeccable detect`.

## Landingpage (Kurz)

- Eine Aktion; Formular **im Fold** eingebettet.
- Mikro-Commitments → **Kontaktdaten zuletzt** (G1).
- Big Idea → FAQ/„Für wen“ → Testimonials → Details.
- Testimonials: Video/Screenshot, Menge nicht wegkürzen.  
Detail: `landingpage-struktur.md`.

## Ablauf (Detail: `loop2-ablauf.md`)

1. **strategy** — Ziel/Pfad; Meaning A–D schriftlich (`strategy.md`).
2. **sitemap** — Landing → `landingpage-struktur.md`; Multi-Page → `sitemap-section-planung.md` (Abnahme dort bindend).
3. **copy** — sektionsweise, copywriting G1→G2.
4. **art-direction** — design-Skill; G1 = `detect.mjs`. Premium: lexlin + damien.  
   URL-Vorlage → `web-clone-playbook.md` zuerst. Bild-Vorlage → `rebuild-from-image.md`.  
   Assets → Grafik-Baum im Router, dann ggf. `bildgenerierung.md`.  
   `imagegen-web`/`imagegen-mobile` = **kein Default** (nur Host+Router).
5. **components** — 5a Bedarf → 5b Router-Zeile → 5c einzelne Kandidaten bei Bedarf mit `scripts/resource-access.mjs show "<Name>"` nachschlagen (nie die gesamte Liste) → Abweichung belegt → **5d Werkzeugtabelle** in `art-direction.md`. Ohne Tabelle kein `npm i`.
6. **build** — nur Tabellen-Zeilen installieren; Review = andere Familie. Security/OWASP bei Formularen/Consent (`/root/raphael-skills/skills/methodik/code-review/references/owasp-checkliste.md`). Echtes Custom-UI → `code-qualitaets-checkliste.md`.
7. **qa-faecher** — 1–4 parallel, dann 5 SEO + 6 Trust. Fach 2 = Screenshot-Loop; Premium = Blind-A/B 3b. Fach 4 = `werkzeug-gate.mjs`.
8. **Launch** — Signatur + Deploy-Egress-Gate. Nie autonom. Junge Domain → Safe-Browsing-Checkliste.
9. **cro-learn** — nur echte Analytics (G4).

## Loop-2 (verbindlich, eine Zeile)

strategy → sitemap → copy → art-direction → components (Tabelle) → build →
QA 1–4 ‖ dann SEO+Trust → Launch (Signatur) → cro-learn.

## Gotchas

- **Anfänger lädt alles** → falsch. Nur `anfaenger-pfad.md` §1.
- **`shot-sweep` ohne `--base`** → Exit 2 (Usage); nie ohne echte Dev-URL.
- **`shot-sweep` schlägt fehl → Standard-Skript fixen, NIE eigenes Ad-hoc-Playwright-Skript schreiben.** Forensik 10.08.2026: beide Fehl-Sessions wichen nach einem Fehler/aus Bequemlichkeit auf eigene Skripte aus (1440×900, 12-Shot-Cap, kein Hover/Klick, kein Static) — genau das ist verboten. Auch alte `scratch/shot-*.cjs`-Skripte im Projekt nie wiederverwenden.
- **Kritik nur auf selbst angesehene Shots.** „Jedes PNG per Read" ist wörtlich: Read-Aufrufe auf PNGs müssen die Shot-Zahl decken, Agent-Berichte ersetzen das nicht.
- **`webdesigner-pro`** unter `~/.claude/skills/` = Fremdskill (Mac-Pfade). Nie routen; Kanon = `web` + `design`.
- **Design-G1** nur `node …/design/scripts/detect.mjs`, nie `npx impeccable detect`.
- **Tools** über `tool-usecase-router.md`, nicht Link-Dumps (max 3 URLs aus Bibliothek).
- **Paket `motion`**, Import `motion/react` — nie `framer-motion`.
- **Ein Icon-System**, Default Lucide.
- **Lighthouse/axe = 0** hart; Fertig = Environment-Tatsache.
- Build ≠ Review (Regel 8). Deploy = Rot + Signatur.
- **GitHub öffentlich ≠ frei nutzbar** — Lizenz-Check im Clone-Playbook.
- Junge Domain + Formular = Safe-Browsing-Risiko.
- Motion ohne `useReducedMotion` = Fail.
- Bilder: Higgsfield nach `bildgenerierung.md`; AVIF + Index; `reject` löscht Datei+Index.
- AAA hier = Agentur-Rubrik, nicht WCAG AAA (WCAG bleibt AA).
