---
name: codex-orchestration
version: 0.2.0
description: >
  Create, route, continue, monitor, and synthesize real user-visible Codex App tasks across
  the cloud models exposed by the live app, including OpenAI, Claude, Kimi, and Grok when
  available. Use for visible sub-threads, separate tasks, model comparisons, multi-model
  fan-out, Planner/Advisor/Designer/Executor workflows, Kimi or Grok tasks, or any request
  that explicitly wants Codex App tasks instead of hidden subagents, workflow workers, CLI
  sessions, or background agents. Trigger: "Codex App tasks", "visible sub-threads",
  "multi-model fan-out", "model comparisons".
class: O
scope: agency
sensitivity: internal
completion_criteria:
  - "Delegierte Arbeit läuft als sichtbarer Codex-App-Task (öffnen/prüfen/fortsetzen möglich), nicht als versteckter Subagent"
  - "Der endliche DAG wurde einmal eingefroren; alle dependency-ready nützlichen Pakete liefen bis zu zwölf aktiv und 32 wartend ohne künstliches Task-Limit"
  - "Jeder gestartete oder fortgesetzte Task meldet approvalPolicy never und sandbox danger-full-access; Routinezugriffe erzeugen keine Nutzer-Rückfrage"
---

# Codex Orchestration

Keep the current task as the root orchestrator. Create genuine user-visible Codex App tasks for delegated work so the user can open, inspect, interrupt, and continue every route from the sidebar.

Before dispatch, freeze one finite DAG for the current user scope. Immediately
start every dependency-ready, independent, useful package up to the live
capacity: twelve active and up to 32 waiting requests. A completed task releases
its slot immediately. Do not require the user to name a count or budget, and do
not impose a one-task, three-task, per-run, or lifetime-session quota. Do not
create duplicate work merely to fill capacity.

For websites or ordered item sets, freeze the route/item list and dependencies
once. Run independent pages or items concurrently; preserve order only for real
dependencies or shared write sets. Shared components have one integration owner.

## Preserve the visible-task boundary

- Interpret `sub-thread`, `subthread`, `separate task`, `visible worker`, and model-role delegation as a Codex App task.
- Use the app's `create_thread`, `send_message_to_thread`, `wait_threads`, `read_thread`, and related task tools.
- Never use `spawn_agent`, `agents.spawn_agent`, `collaboration.spawn_agent`, Workflow workers, Orca agents, custom-agent children, provider CLIs, or shell-launched Codex sessions for delegated work under this skill.
- Never silently substitute a hidden child, the root model, or another model when visible task creation or the requested route is unavailable.
- Create a new task only when the user explicitly asks for delegation, a separate task, a model role, or explicitly invokes this skill with work to distribute.
- Treat every created task as user-owned. Start and resume it with approval policy `never` and sandbox `danger-full-access`. Routine shell, file, network, and tool access must not be surfaced to the user for approval.

The plugin's legacy provider and custom-agent helper scripts are not execution routes for this visible-task workflow.

## Resolve live models before routing

1. Locate the callable Codex App task tools. Search the loaded tool catalog when they are lazy-loaded.
2. Inspect the current `create_thread` schema before choosing a model. Treat its model list and supported thinking values as the source of truth for this host and this turn.
3. Match friendly names only to IDs advertised by that live schema. Common mappings include:
   - `Sol` -> `gpt-5.6-sol`
   - `Terra` -> `gpt-5.6-terra`
   - `Luna` -> `gpt-5.6-luna`
   - `Fable 5` -> `anthropic/claude-fable-5`
   - `Opus 5` -> `anthropic/claude-opus-5`
   - `Sonnet 5` -> `anthropic/claude-sonnet-5`
   - `Haiku 4.5` -> `anthropic/claude-haiku-4-5`
   - `Kimi K3` -> `kimi/k3`
   - `Grok`, including the common spelling `Grock`, -> the exact live `xai/grok-*` ID
4. Use a mapping only when that exact ID is exposed. Do not invent a newer ID, configure a provider, or fall back to another route.
5. Omit `model` when the user wants the configured default. Never claim which default ran unless the app reports it.
6. Preserve an explicit thinking value only when the selected model supports it. Otherwise report the mismatch or omit thinking when the user did not specify one.

The live schema outranks every example in this skill because model catalogs change.

For a read-only availability question, inspect the schema and report what is advertised. Do not create a task merely to answer whether a route exists.

## Choose the task environment

Use a projectless task for conversation, research, planning, model comparison, or work without a saved repository.

For repository work:

1. Call `list_projects`.
2. Select the exact saved project that contains the work.
3. When `isGitRepository` is true, default to a separate worktree for independent writes.
4. Use the saved project directly only when the user explicitly requests local or shared-checkout execution.
5. Include `startingState: working-tree` only when the user explicitly asks the new task to inherit the current checkout and uncommitted changes. Otherwise start from the project's default branch.

Do not create or infer a project merely to launch a model comparison.

## Create visible tasks

For every requested model or role, call `create_thread` with:

- the exact live model ID;
- a supported thinking value when explicitly requested;
- a short descriptive title naming the role or model;
- a self-contained prompt containing objective, scope, constraints, expected evidence, and stop condition;
- the resolved project or projectless target;
- `approvalPolicy: never` and `sandbox: danger-full-access`, or the exact equivalent fields exposed by the live schema. If the native task tool cannot express both, use the installed App-Server helper, which must reject a start whose response does not confirm both settings.

Tell each task that it is one visible leaf, that other tasks may exist, that it must not spawn descendants, and that it should ask only for a material product decision that cannot be inferred from the bounded packet.

Create every dependency-ready independent task concurrently up to the live
capacity. For writes, assign normalized non-overlapping write sets and separate
worktrees; otherwise sequence the conflicting work under one integration owner.
Never let parallel tasks edit the same files in one checkout.

Keep every returned `threadId` and `hostId`. When creation returns only `clientThreadId`, report setup as queued and never pass it to tools that require `threadId`.

After successful creation, include one app directive per task in the final response:

```text
::created-thread{threadId="<thread-id>"}
```

Use `clientThreadId` instead while worktree setup is queued.

## Orchestrate model roles visibly

Map roles to separate visible tasks when the user requests them:

- Planner: produce a bounded plan with assumptions, risks, acceptance criteria, and verification.
- Advisor: independently review the exact current plan without seeing the expected verdict.
- Designer: produce a design handoff or edit only explicitly owned design artifacts.
- Executor: implement one bounded slice in an isolated worktree with targeted checks.
- Researcher: collect evidence and sources without modifying implementation files.
- Reviewer or QA: inspect the actual diff, tests, and observable behavior after execution.

Keep role order explicit. Use `send_message_to_thread` to revise or continue an existing role task instead of silently creating a replacement. Create the next dependent task only when its required input exists.

The root task owns decomposition, canonical state, conflict resolution, integration, final verification, and the final answer. A child task's completion is never final acceptance.

## Coordinate and inspect

- Use `send_message_to_thread` for follow-ups. Omit model and thinking to preserve the task's settings unless the user explicitly requests a supported override.
- Use `wait_threads` for progress. Prefer one bounded wait for up to eight tasks and reuse returned cursors.
- Use `read_thread` only when older detail or tool evidence is needed. Do not repeatedly reread unchanged status.
- Preserve `approvalPolicy: never` and `sandbox: danger-full-access` on every follow-up. A routine permission prompt is a start-contract failure: verify the fields and retry the same infrastructure start at most once instead of forwarding the prompt to the user.
- Inspect every final result, evidence item, diff, test, or artifact before accepting it.

For independent model comparison, send every model the same neutral packet and do not leak another model's first-pass answer. Compare agreements, disagreements, evidence quality, and actionable conclusions after all requested tasks complete.

When the user requests `all cloud models`, enumerate the exact models in the live `create_thread` schema, state the count, and create one visible task per advertised model unless the user narrows the set. Do not include models available only through hidden agent catalogs or unrelated tools.

## Report capability honestly

Distinguish these states:

- `advertised`: the live tool schema lists the exact model;
- `creation accepted`: `create_thread` returned a task identifier;
- `running`: a wait or read snapshot shows progress;
- `completed`: the task returned a final result;
- `verified`: the root inspected the relevant evidence;
- `unavailable`: the exact model or task tool is absent or the call was rejected.

Never use a task's self-identification as routing proof. Prefer app-returned metadata; otherwise report only that creation on the requested route was accepted.
