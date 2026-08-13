# Deliverables + Definition of Done

Zielordner: `$OUT` (Default `<repo-oder-cwd>/website-plan`).

## Dateiliste (SCOPE=FULL)

| Datei | Inhalt |
|---|---|
| `00-meta-plan.md` | Quellen, SCOPE, Run-ID(s), Phasen, Rollen, DoD |
| `01-firma-dossier.md` | Firma, Markt, SERP, **Proof-Inventar** |
| `01b-online-praesenz.md` | Social, GBP, Maps; fehlende Kanäle = „nicht vorhanden“ |
| `01c-research-critic.md` | Adversariale Research-Kritik |
| `02-asset-inventar.md` | Medien + Alt-Text-Vorschläge + Einsatz |
| `02b-asset-gaps.md` | Wollen \| Haben \| Fehlt \| Beschaffen wie |
| `03-seo-audit.md` | Nur wenn Live-URL |
| `04-seo-plan.md` | Schema: `seo-plan-schema.md` (**AEO Pflicht**) |
| `04b-seo-critic.md` | SEO-Angriff |
| `04c-growth-critic.md` | Conversion vs SEO |
| `05-ia-variants.md` | 3 Optionen vor User-Wahl |
| `05-sitemap-ia.md` | Nach G-IA freigeschrieben |
| `05b-copy-style.md` | Archetyp + Begründung (`copy-archetypes.md`) |
| `06-seiten/route-manifest.tsv` | jede indexierbare URL genau einmal: Owner, Meta/H1/H2/Links/Schema/Status |
| `06-seiten/<slug>.md` | humanisierte Copy + Section-Specs; FINAL erst nach Verifikation |
| `07-design-system-plan.md` | Tokens, Buttons/Hover-Vision, Typo (Adobe first) |
| `08-component-map.md` | Repo first; Library nur Inspiration |
| `09-mockups/references/` | 2–3 lokale Referenz-Captures je Richtung |
| `09-mockups/reference-manifest.md` | URL, Capture, Muster, Grenzen, Richtung, Modellrolle |
| `09-mockups/reference-manifest.tsv` | maschinenlesbarer G-REF-Vertrag |
| `09-mockups/briefs.md` | Richtungen + Section-Briefs (`mockup-brief.md`) |
| `09-mockups/gpt-prompts.md` | 3 eigenständige Prompts + Attachment-Mapping |
| `09-mockups/generated/` | Vergleichsbilder; bei fehlendem Bildtool vor Wahl nachzuliefern |
| `09-mockups/comparison-manifest.tsv` | exakt A/B/C, gleicher Viewport/Copy-Hash, Review PASS |
| `09-mockups/mockup-manifest.tsv` | Route, Section, Viewport, Datei, Copy-Quelle/-Hash, Reduced-Motion, Cookie-/Datenzustand, Review |
| `10-roadmap.md` | P0 / P1 / P2 |
| `11-open-questions.md` | Nur echte Blocker |
| `12-verbote-und-gates.md` | Entscheidungen + `G-DESIGN_CHOICE: A|B|C|MIX:…` |
| `13-final-critic.md` | Gesamtpaket-Angriff |

Enger SCOPE: mind. `00-meta` (mit Delta zum FULL), Asset/Alt- bzw. Sektions-Artefakte laut Auftrag; **kein** FULL-DoD-Claim.

## DoD FULL (pass/fail)

- [ ] Research-Paket `00`–`02*` vorhanden  
- [ ] SEO `04` (+ `03` wenn Live-URL) inkl. AEO-Block  
- [ ] G-IA entschieden + `05-sitemap-ia`  
- [ ] Route-Manifest deckt jede indexierbare IA-URL genau einmal; Owner-Datei existiert und führt Per-URL Meta/H1/H2/Links/Schema  
- [ ] Priority-Seiten humanisiert; keine veröffentlichungsrelevanten `OWNER-BLOCKER`, `PLACEHOLDER`, `TODO`, `wie oben` oder Fake-Proofs  
- [ ] Jede sichtbare Section hat einen eigenen Spec-Block; ein globaler Sammelblock pro Datei zählt nicht  
- [ ] `G-REF=PASS`: je A/B/C 2–3 lesbare lokale Captures mit Herkunft/Region  
- [ ] `reference-manifest.md` + `briefs.md` + 3 eigenständige Prompt-Pakete  
- [ ] Drei vergleichbare Hero-Outputs vorhanden; danach G-DESIGN entschieden  
- [ ] `scripts/validate-design-gate.py "$OUT"` Exit 0 vor der G-DESIGN-Wahl  
- [ ] Gewählte Richtung: jede P0-Seite Desktop+Mobile, jede Section mindestens in einem lesbaren Frame; daten-/formulargetriebene Kernstates separat  
- [ ] Mockup-Manifest vollständig; jede referenzierte Datei existiert und enthält genau eine Section  
- [ ] `07`–`08`–`10`–`12`–`13`  
- [ ] Run-ID(s) in `00` oder `12` dokumentiert  
- [ ] Final Critic `PASS` und `scripts/validate-plan.py "$OUT"` Exit 0; erst dann `PLAN_VERIFIED`  

## Quellen-Hierarchie

1. Recherche (Web, Social, GBP, Maps, Reach)  
2. Kunden-Live-URL (eine Quelle unter vielen)  
3. Repo nur bei `MITNUTZEN` — nie Source of Truth  
4. Nur belegbare Claims  
