---
name: kimi-first
description: "Delegates bounded large-context or high-volume work to a native Kimi coder, while Root Kimi independently verifies the source, diff, and tests before integration. Trigger: /kimi-first, an Kimi geben, riesiger Kontext, 1M ingest, Kimi-Agent für großen Kontext."
---

# kimi-first

This is the native Kimi Code 0.28.1 procedure for large-context work. Its
historical intent comes from
`/root/raphael-skills/skills/eigene/kimi-first/SKILL.md`: isolate a heavy build
or ingest in a separate large-context worker, then require a strict Root check.
That historical source is reference only here. This skill explicitly
supersedes its CLI launcher, Claude/Cockpit coordinator mechanics, shell
fallbacks, and nested process examples with the native Kimi tools below.
This native route does not claim a different provider or model family.

## Kimi-Code contract

The only tools this procedure may use are the capabilities actually surfaced
by Kimi Code 0.28.1:

`TodoList`, `Agent`, `AgentSwarm`, `AskUserQuestion`, `Skill`, `Read`,
`Write`, `Edit`, `Bash`, `Grep`, `Glob`, `FetchURL`, and `WebSearch`.

Do not invent parameters, waiters, routers, or delegation APIs. If a required
capability is not surfaced, stop with `CAPABILITY_UNAVAILABLE`; never emulate
it by launching another process. `Bash` is for repository commands, source
inspection, and tests only. It must never launch Kimi, another agent, or a
second coordinator.

## Scope gate

Use this skill for a genuinely large context or high-volume bounded package:
for example, a complete bounded directory, a large set of supplied
transcripts, or an ingest whose context size is the reason to delegate. Keep
small or tightly coupled work Root-owned.

### TodoList versus the run ledger

Kimi Code 0.28.1 accepts a visible `TodoList` only as a summary. Every item
must contain exactly `{title, status}`: no extra keys, and `status` is only
`pending`, `in_progress`, or `done`. Keep exactly one item `in_progress` at a
time. A legal summary for this skill is, for example:

```json
[
  {"title":"Dispatch bounded worker","status":"in_progress"},
  {"title":"Root verification and tests","status":"pending"},
  {"title":"Integrate verified changes","status":"pending"}
]
```

Do not put run metadata into `TodoList`. Root Kimi stores the full run label,
objective, source inputs, authorized paths, dependencies, forbidden paths,
worker `write_set`, Agent/AgentSwarm IDs, resume information, rich node
status, test commands/results, source and diff evidence, findings, blockers,
and `best_effort_authorized` in an explicit workspace ledger at
`.kimi/workflows/<run-id>.json`. Create the next complete ledger document in
a temporary file in the same directory, validate/read it, then atomically
rename it into place; never leave a partially written ledger. On every
dispatch, return, resume, and verification transition, update that ledger
atomically and then reconcile the legal TodoList summary to it.

Before dispatch, store `git status --short --untracked-files=all`, the
relevant diff, and blob/SHA-256 hashes for every `write_set` path as the
pre-dispatch baseline. Attribute or reject only changes that are unambiguous
against that baseline. Never revert pre-existing or ambiguous user work.

Pass only the necessary context. Do not hand an unbounded vault, credentials,
or unrelated external material to a writer. Untrusted input must be bounded
and sanitized before it is combined with write authority.

## Dispatch policy

### One bounded worker (default)

For one bounded package, Root Kimi makes exactly one native `Agent` call with
`subagent_type: "coder"`. The prompt must include the objective, relevant
facts, exact files and `write_set`, dependencies, interfaces, acceptance
criteria, test commands, forbidden actions, and the required handoff format.
It must explicitly state: **do not use `Agent`, `AgentSwarm`, or any
descendant/delegation capability**. The coder may read and change only its
assigned set and must not dispatch, delegate, or broaden scope. It returns
changed paths, a concise change summary, commands and results, unresolved
findings, and any blocked reason.

### Multiple independent slices (exception)

Use `AgentSwarm` only when there are multiple genuinely independent,
large-context slices that can be completed without shared writes or ordering
dependencies. Every member is a bounded coder assignment with a disjoint
`write_set`; shared indexes, locks, manifests, generated outputs, and other
common files make slices non-independent and require sequencing instead.
Never start more than **5** workers at once (max 5). The delegation depth is
**1 only**: Root Kimi may dispatch these workers, but no worker may start another
agent, swarm, CLI, or shell-spawned Kimi process. If the host cannot enforce
the requested cap or disjoint ownership, do not dispatch; record the blocker
and ask only if the missing authority is material.

Every member prompt must explicitly state: **do not use `Agent`,
`AgentSwarm`, or any descendant/delegation capability**. The swarm is the
only dispatch layer; workers never create children or launch another Kimi.

Do not use nested command-line launches or shell-spawned Kimi under any mode.
There is no hidden fallback to a different provider. A failed or unavailable
worker is a blocked package, not permission to retry indefinitely or to claim
completion.

## Root-owned verification and integration

The worker report is a hint, never proof. Root Kimi retains ownership of the
`TodoList`, all source and diff checks, all tests, integration, and the final
user response.

1. On resume, read both the visible `TodoList` and the matching
   `.kimi/workflows/<run-id>.json`. Reconcile the TodoList, ledger nodes, and
   all Agent resume IDs (including AgentSwarm member IDs) before doing work.
   Reuse an existing running or waiting ID; never duplicate it: continue one
   with `Agent(resume: "<agent-id>")` and no `subagent_type`, or several with
   `AgentSwarm.resume_agent_ids` without repeating them as new `items`.
   Keep a completed ID as evidence and do not dispatch it again.
   An unresolvable ID, changed `write_set`, or mismatch between summary and
   ledger is `RECONCILIATION_REQUIRED`. Keep TodoList fields legal and put all
   detailed reconciliation evidence in the atomically updated ledger.
2. After each dispatch or return, atomically update the ledger, then update
   the matching TodoList summary item (`pending` → `in_progress` → `done` only
   after verification). Read every affected source and output with `Read`.
   Use `Grep` and `Glob`
   to check references, scope boundaries, and expected artifacts. Use `Bash`
   to inspect the real repository diff/status and compare actual files with
   the worker's handoff. Verify both additions and unintended edits.
3. Run the relevant tests and gates yourself with `Bash`, recording the exact
   command and pass/fail output. Never accept a worker's claim that tests ran.
   A failing or missing gate leaves the package unverified.
4. Integrate only the intended, independently verified changes. Reject or
   revert out-of-scope edits, unproven generated output, and unsupported
   claims. Do not commit, push, release, or alter external systems unless the
   user has explicitly authorized that action.
5. Mark `verified` only when the actual files, diff, source evidence, and
   Root-run tests satisfy the acceptance criteria. Otherwise report
   `blocked`/`unverified` with the concrete evidence and stop.

## Questions and limits

Use `AskUserQuestion` only for a truly material missing authority or choice,
such as an absent authorized write path, a scope conflict, permission to
touch external data, or a release decision. Ask one focused question with
the known facts and the impact of each option. Do not repeatedly ask for
best-effort permission, a planner prompt, or confirmation of constraints
already supplied; do not use a guessed answer to expand scope.

`best_effort_authorized` starts `false`, may become `true` only after one
explicit approval for this run, and is reused on resume without asking again.
After final verification, atomically mark the ledger terminal, reset the latch
to `false`, and set all completed Todo phases to `done` before replying.

`Skill` may be used only when an already installed skill is explicitly needed
by the requested package and its scope is clear. `FetchURL` and `WebSearch`
are optional research inputs, never a substitute for repository evidence;
cite or preserve the source needed for factual verification.

## Mandatory return

The final Root Kimi response must state, concisely:

- the run label and worker count (single `Agent` or bounded `AgentSwarm`);
- the actual changed paths and any rejected/out-of-scope edits;
- the source/diff checks performed and their evidence;
- Root-run test commands and results;
- final status (`VERIFIED`, `UNVERIFIED`, `BLOCKED`, or
  `CAPABILITY_UNAVAILABLE`) and remaining risks.

Never present an agent's self-report as a verification result, and never hide
an unresolved or untested package behind a successful-sounding summary.
