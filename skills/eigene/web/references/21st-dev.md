# 21st.dev: required component research and real MCP use

Read for every new website, substantial redesign, or new component family. Raphael explicitly wants 21st.dev used regularly. Make this an actual implementation input: when the connection is available, call its tools before building a relevant new component family. Merely mentioning 21st in a plan does not satisfy the request.

## Fit within MAKE

The user brief, inspected reference websites, Refero research and DESIGN.md determine the design. Use 21st to find suitable component behaviour and implementation candidates within that direction. For service businesses, prioritise clear navigation, proof, service comparisons, project galleries, tabs, FAQs, offer calculators and usable enquiry flows. Search for the visitor's task before a visual effect. A solar installer does not need an animated SaaS dashboard because the catalogue has one.

1. At the start of a relevant build, discover the current 21st tools and connection state. Use an existing verified connection; do not repeatedly reconfigure it.
2. Translate the page map and chosen reference patterns into component families. Search 21st for each materially different family that needs a new implementation, batching independent searches where supported. Reuse the results across routes with the same family.
3. Inspect useful candidates, their demos, source, dependencies and usage terms. Retrieve code only for candidates worth adopting. Record the actual source identifier and why it fits or was rejected.
4. Adapt the selected implementation to MAKE's content, tokens, accessibility and existing stack. Retain only useful dependencies and behaviour. Check the rendered result against the chosen references on desktop and mobile.
5. Use generation or refinement only when existing candidates do not meet the requirement, or the user asks for it. Pass the selected service-business direction and exact content requirements. Do not generate spectacle to fulfil a usage quota.

A new family warrants a fresh search; every repetition of that family does not. A text correction, spacing fix, dependency repair or reuse of an already selected component does not need another external request. If the catalogue has no suitable match, record that result and implement a better fit locally. There is no minimum number of imported components.

## Discover current names rather than inventing calls

The current product is **21st MCP**. Magic MCP is its former name; the old package is a compatibility proxy. Prefer the unified server at `https://21st.dev/api/mcp`. Old Magic-console keys were reset, so an existing old key is not evidence of working authentication. [Official migration](https://github.com/21st-dev/magic-mcp), [current naming and authentication](https://21st.dev/llms.txt).

Discover tool names, namespaces and schemas from the connected host. The official installation guide documents these current capabilities; it does not establish that they are exposed in the current chat. [Installation guide](https://github.com/21st-dev/magic-mcp/blob/main/llms-install.md).

| Capability | Documented current name | MAKE use |
|---|---|---|
| Catalogue discovery | `search` | Find real candidate implementations for the required component family. |
| Source retrieval | `get_component` | Inspect selected code, dependencies and metadata before integration. |
| Direction examples | `get_inspiration` | Resolve an implementation pattern within the reference direction. |
| Custom UI | `generate` | Fill a justified gap or refine a specific component. |
| Brand assets | `search_logo` | Find an explicitly needed brand; validate identity and usage. |

The host may prefix these names. Legacy names such as `21st_magic_component_builder` are not a reason to fabricate tools when none are available. Natural-language requests are sufficient; `/ui` is not an MCP protocol requirement. [Official migration](https://github.com/21st-dev/magic-mcp).

Use current account allowances. Catalogue retrieval and generation can have separate limits; check returned quota information when relevant. Do not create paid subscriptions, purchase credits, unlock paid components, or publish user work without authorisation for that action. Existing authorised usage need not trigger a new permission ritual. [Current access and plans](https://21st.dev/mcp).

## Connection: distinguish the host

**Hosted ChatGPT Work:** Discover an installed 21st plugin and its actual tools. If missing, search the plugin directory for `21st` and `21st.dev`. A local `config.toml` edit cannot connect the hosted chat: ChatGPT web obtains remote MCP tools through plugins and does not read local Codex configuration. Do not invent a plugin ID or claim that a skill dependency declaration creates a connection. [OpenAI host distinction](https://learn.chatgpt.com/docs/extend/mcp?surface=cli).

**A real local Codex host:** Use its supported MCP setup surface and preserve other server entries. 21st's current setup command is `npx @21st-dev/cli@latest init --client codex`; it prints a TOML block. Run setup only when the requested host, available runtime and credential source are established. New installs should use the unified server rather than the legacy proxy. [21st per-client setup](https://21st.dev/blog/introducing-agents-cli).

For a Codex host with a securely provisioned `API_KEY_21ST`, the following is a **configuration example, not an activated connection**:

```toml
[mcp_servers."21st"]
url = "https://21st.dev/api/mcp"
bearer_token_env_var = "API_KEY_21ST"
```

Codex supports a bearer-token environment reference for HTTP MCP; 21st accepts bearer authentication. Set the real key through the target host's supported secret mechanism. Never commit a key or add a fake placeholder to active configuration. [Codex configuration](https://learn.chatgpt.com/docs/extend/mcp?surface=cli), [21st authentication](https://21st.dev/llms.txt).

The official 21st repository also contains a Codex plugin manifest, pointing to its MCP configuration and UI skill. Availability in that upstream repository is separate from installation in ChatGPT Work. [Official plugin manifest](https://github.com/21st-dev/magic-mcp/blob/main/.codex-plugin/plugin.json).

**Verify:** A configuration entry or successful installation command is not enough. Discover the server tools and complete one relevant read-only catalogue request successfully. Then record the exact tool and result. If auth, host support or quota blocks use, name the specific missing prerequisite once, continue independent reference research and local implementation, and leave MCP use explicitly incomplete.

## Evidence in the existing dependency record

Record `host`, `checked_at`, `connection_status`, discovered tools, query/component family, returned candidate IDs or URLs, retrieval status, adoption/rejection reason, changed component paths and browser evidence. Keep credentials out of the record. Separate `MCP used`, `public catalogue researched`, `configured but unverified`, and `unavailable`; these are different outcomes.

Example queries for this user's direction: `service business navigation mega menu`, `solar installation quote multi step form`, `project gallery filter`, `service comparison tabs`, `customer testimonial video`, `accessible FAQ accordion`. Tighten them using the actual requirement. Do not request all families when the page does not need them.

## Historical setup observation from the imported package; superseded on this VPS

The earlier imported package described a different inspected environment that exposed no 21st/Magic tools. Plugin-directory searches returned no relevant 21st entry. The inspected environment had no 21st-specific credential variables, no known 21st auth directory, and no `codex` or `21st` executable; the inspected Codex MCP configuration listed only `node_repl`. No MCP connection or authenticated 21st call was completed, and no active host configuration was changed.

That earlier environment required a supported target-host connection. The current VPS result below supersedes that missing-access claim; do not start setup again solely because this historical record exists.

## HTML default

A retrieved React component is a candidate for native adaptation, build-time rendering or a bounded React island. For HTML-first websites, use [component-islands.md](component-islands.md) to retain actual compatible library code where useful without converting the whole site to React. Inspect framework-specific imports and required context; an island does not automatically provide Next.js routing or server actions. Record the source, permitted reuse, adaptation and verified behavior. Whole-application migration remains subject to the broader decision in stack.md.

## Verified connection snapshot: 2026-09-06

The connected `mcp__21st__search` returned live component metadata for Services Card (7795), Service Card (8223) and Interactive Broker Card (8414) for a service/cards/map query. The forward test additionally retrieved the source of Service Card 8223. It included React/Framer Motion/CVA/Lucide imports despite empty registryDependencies, so actual imports must be inspected. The response supplied no explicit component/image licence; no source or demo asset was copied into the test site. The useful text/link/image relationship was implemented independently in HTML/CSS/SVG. This establishes working search and source retrieval, without certifying arbitrary reuse rights or generated output. [Services Card](https://21st.dev/@ravikatiyar162/components/services-card).

## Logo lookup (verified 2026-09-07)

`mcp__21st__search_logo` queries the open svgl.app library and returned five Google marks (coloured symbol, wordmark, Drive, Play, Classroom) without login or limit. Use it as the first stop for brand logos before `scripts/find-images.mjs`; see [image-search.md](image-search.md).
