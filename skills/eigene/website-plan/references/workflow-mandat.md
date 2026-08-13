# Workflow-Mandat (Kurz)

Autoritative Details: `host-launch.md`, `constraints.md`, `deliverables-dod.md`.

**Pflicht in einem Satz:** Ultracode/max + Kanon-Script + Run-ID + G-IA/G-DESIGN
hard stops + `G-REF=PASS` mit lokalen Captures/Manifest/3 GPT-Prompts + keine
Fake-Proofs.

**Verify vor „fertig“:**

```bash
ls "$OUT"/00-meta-plan.md "$OUT"/01-firma-dossier.md "$OUT"/02-asset-inventar.md
# FULL:
ls "$OUT"/04-seo-plan.md "$OUT"/05-sitemap-ia.md
ls "$OUT"/09-mockups/reference-manifest.md "$OUT"/09-mockups/gpt-prompts.md
find "$OUT"/09-mockups/references -type f | head
```
