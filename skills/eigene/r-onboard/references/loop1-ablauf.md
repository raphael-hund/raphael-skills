# Loop 1 — Ablauf im Detail

## Reihenfolge & Abhängigkeit

intake-grill → ingest → icp-synth → offer-architect → proof-miner → brand-voice → Dossier.
Jeder Schritt schreibt eine Datei; der nächste liest sie. Assembly-Line: nach großen
Ingest-/Synthese-Schritten `/clear`, dann mit frischem Kontext weiter.

## Outputs (Zielpfade)

| Artefakt | Pfad |
|---|---|
| Rohmaterial | `/root/clients/client-<name>/raw/` (append-only, gehasht) |
| ICP | `/root/clients/client-<name>/wiki/ICP.md` |
| Offer | `/root/clients/client-<name>/wiki/OFFER.md` |
| Proof | `/root/clients/client-<name>/wiki/PROOF.md` |
| Voice | `/root/clients/client-<name>/wiki/VOICE.md` |
| Lesson (anonymisiert) | `/root/raphael-brain/wiki/_candidates/` |

Kanonisch ins zentrale `raphael-brain/business/` schreibt **nur Raphael**.

## Gates je Schritt

- **G1 (deterministisch, immer zuerst):** Format-Check, tenants-Scan, Secret-Scan auf Ingest.
- **G2 (Judge):** icp-synth, brand-voice — Rubrik als Ja/Nein-Checkliste, Schwelle 0.7,
  jede Behauptung mit eingefügtem Beleg ("pasted proof").
- **Block-Gate:** proof-miner — jede Zahl ohne raw-Zitat blockt die Ship-Bedingung.

## Ship-Bedingung Loop 1

100 % der ICP-/Proof-Claims mit raw-Zitat. Erst dann geht das Dossier in die review-inbox
zur Signatur.
