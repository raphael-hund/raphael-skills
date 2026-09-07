# Citation Outreach / LLM mentions

Branch of `skills/eigene/seo`. Not a parallel outreach skill.

## Engine

- Schema: `references/citation-outreach/pipeline.schema.json`
- Script: `scripts/citation_outreach.py`
- Tests: `tests/test_citation_outreach.py`
- Example: `examples/citation-outreach/make-marketing.json`
- Template: `examples/citation-outreach/client-template.json`

The engine never sends, publishes, or pays.

## Hard rules

- Client-Config is required (`--config`).
- Live mode requires a published non-homepage target page. Planned pages (`published: false`) are `BLOCKED_TARGET_PAGES`.
- Human approval is required for send and spend. Payload-hash bound; mutation revokes approval.
- Vendor numbers (CrowdReply mention counts, visibility lifts) are not a client proof.

## Completion

1. `python3 skills/eigene/seo/scripts/citation_outreach.py doctor --config skills/eigene/seo/examples/citation-outreach/make-marketing.json`
2. Schema file present and tables match the engine.
3. Idempotent demo: `python3 skills/eigene/seo/scripts/citation_outreach.py demo --config skills/eigene/seo/examples/citation-outreach/make-marketing.json`
4. No external side effect (`network_calls=0`). Offline fixtures only.

Cadence is `hook_2_3` or `prompt_4_9`, never mixed. MAKE pilot uses `prompt_4_9`.
