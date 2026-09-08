# GPT-6 Astra: grounded skill guidance

Read for Astra-specific orchestration and resumable long tasks. Source review: 2026-09-06.

## Official facts

GPT-6 Astra (`gpt-6-astra`) is the requested target. OpenAI describes stronger coherence over long tasks, stronger instruction following, and sensitivity to conflicting skills/AGENTS.md guidance. It recommends explicitly directing autonomous follow-through, when/how much to delegate, concise writing, and risk-appropriate verification. Its API supports compaction and multi-agent orchestration. These are model/API facts, not permission to change ChatGPT Work settings. [Astra guidance](https://developers.openai.com/api/docs/guides/latest-model)

ChatGPT Work supports subagents for eligible accounts. Explicit delegation requests are appropriate; Ultra can delegate proactively where available. Subagents help isolate exploration noise; bounded work and distilled returns protect the lead context. Concurrent writes require coordination. Availability does not establish a universal concurrency limit or guaranteed runtime. [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)

The official frontend prompt page explicitly targets **GPT-5.5**, while saying many patterns transfer. It is not Astra-specific guidance. Useful transferable principles: audience/domain fit, respect existing systems, purposeful visual assets, complete interactions, and inspect desktop/mobile screenshots. Its opinionated visual defaults must not silently override Raphael’s actual brand contract. [Frontend guidance](https://developers.openai.com/api/docs/guides/frontend-prompt)

## Recommended skill implementation — our synthesis

1. Put one short execution contract first: deliver the complete agreed HTML-first SEO site, using native code or documented component islands as appropriate; resolve reversible choices autonomously; use existing authorisation; ask only about material blockers; preserve task scope through steering.
2. Audit loaded instructions for conflicts. Keep `/unlazy`, Impeccable, Taste, Compound, and SEO modules scoped to their responsibilities. Never invent `/loop`, `ultracode`, background execution, or model settings.
3. Stage durable contracts: business evidence → search-intent/page map → reference observations → `DESIGN.md` and tokens → representative homepage/service-page build → remaining SEO pages → independent review → authorised deployment.
4. Save checkpoints containing decisions, current implementation, remaining defects, screenshots, checks run, and exact next actions. Resume these after compaction; do not restart research.
5. When explicitly requested, execute **20 real, bounded agent assignments in dependency waves**, constrained by actual slots. Record IDs, ownership, input contracts, acceptance evidence, and concise results. Keep a single integration owner; reviewers should inspect work they did not implement.
6. Give critics source screenshots, rendered screenshots at matching widths, and explicit criteria. Distinguish measured failures from taste judgments. Recheck changed areas and unresolved risks; stop redundant testing.
7. Treat 5–24 hours as a sustained-work preference, never a reason for idle waiting or a fabricated runtime guarantee. Report actual completion and limitations.
