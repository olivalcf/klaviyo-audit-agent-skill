# Klaviyo Agent Audit

[![CI](https://github.com/olivalcf/klaviyo-agent-skill/actions/workflows/validate.yml/badge.svg)](https://github.com/olivalcf/klaviyo-agent-skill/actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-111111.svg)](./LICENSE)
[![Agent Skills](https://img.shields.io/badge/format-Agent%20Skills-FF6B5E.svg)](https://agentskills.io/)
[![Klaviyo MCP](https://img.shields.io/badge/data-official%20Klaviyo%20MCP-7F54B3.svg)](https://developers.klaviyo.com/en/docs/klaviyo_mcp_server)

An open-source, read-only Agent Skill that turns the official Klaviyo MCP into a structured account audit for Codex, Claude, GitHub Copilot, and other agents that support Skills plus MCP.

The skill reviews flows, measurement, deliverability, campaigns, audiences, forms, and content. It separates **account maturity**, **audit coverage**, and **evidence confidence**, so unavailable MCP evidence becomes `unverifiable` instead of an invented failure.

> [!IMPORTANT]
> The Klaviyo connection lives inside your AI agent. This repository and the SPARKCRM website do not proxy the connection, authenticate your Klaviyo account, or receive your Klaviyo data.

## One-prompt setup

Want your agent to handle the installation and connection steps? Copy and paste this prompt into any MCP-capable AI agent:

```text
Install the Klaviyo Agent Audit skill from https://github.com/olivalcf/klaviyo-agent-skill and help me connect it to Klaviyo's official MCP.

First, identify which AI agent or client I am using and follow its supported Skill and MCP installation method. If you cannot install either directly, give me the exact steps and commands, then stop whenever I must approve OAuth or restart the client.

For the MCP connection:
- First determine whether this client supplies Klaviyo through an installed app/plugin, a custom remote MCP, or both. Treat those as independent connections and use only one surface for this audit.
- If the client has an official Klaviyo app/plugin, use its supported install and OAuth flow. Do not assume a CLI-configured MCP changes that plugin's account.
- Otherwise, ask me for the Klaviyo account name, create a unique custom connector name such as klaviyo-<account-slug>, and use this URL: https://mcp.klaviyo.com/mcp?company=<account-slug>&read-only=true&disable-tools-with-user-generated-content=true&core-tools-only=false
- Use OAuth when supported. Never ask me to paste a Klaviyo API key or authorization callback URL into chat.
- Keep the audit read-only. Use server-side read-only filtering when the connection surface supports it, and never create, update, delete, send, schedule, subscribe, suppress, or import anything.

After installation or restart:
1. Identify the exact app/plugin or custom connector that supplies the visible Klaviyo tools.
2. Call only get_account_details and ask me to confirm the account name before reading anything else.
3. If it returns another organization, stop. Do not fall back to a different Klaviyo connection or repeat restarts without checking which connection surface the task loaded.
4. If a newly connected surface is missing from the tool catalog, follow the client's supported fresh-task or reload flow.
5. Do not access individual profiles or personal data for the standard audit.
6. Invoke klaviyo-agent-audit (or $klaviyo-agent-audit where supported) in Quick mode for the last 30 complete days.
7. Report maturity, coverage, confidence, evidence gaps, and a Now / Next / Later action plan.
```

The agent should pause whenever you need to approve OAuth, replace an existing account binding, or restart the client. A custom connection using the URL above disables write tools and user-generated-content tools; a listed app/plugin may expose a broader catalog, so the skill still verifies every call is read-only. You can enable content reads later for a Full content audit.

## Why this exists

Most Klaviyo audit prompts mix three different questions: what exists, whether it is configured well, and whether it performs. They also tend to produce precise scores when the agent could only inspect part of the account.

This skill provides a repeatable audit protocol:

- retrieve evidence through the installed official Klaviyo MCP;
- use read-only tools only;
- compare like-for-like periods and objects;
- score only checks supported by evidence;
- keep missing evidence visible through coverage and confidence;
- turn findings into a prioritized, operator-ready plan.

## What it audits

| Dimension | Weight | Evidence reviewed |
| --- | ---: | --- |
| Flows and lifecycle | 25 | Coverage, triggers, filters, timing, overlap, consent, and performance |
| Data and measurement | 15 | Mapped metrics, event continuity, attribution semantics, and integrations |
| Deliverability and consent | 15 | Bounces, complaints, unsubscribes, engagement, authentication, and suppression |
| Campaign program | 15 | Cadence, audiences, exclusions, testing, tracking, and outcomes |
| Audience and segmentation | 10 | Lifecycle cohorts, engagement/suppression audiences, health, usage, and governance |
| Forms and acquisition | 10 | Coverage, conversion, targeting, frequency, consent, and handoff |
| Content and experimentation | 10 | Hierarchy, subject/preview alignment, mobile accessibility, tests, tracking, and localization |

The complete rubric is in [`audit-rubric.yaml`](./klaviyo-agent-audit/references/audit-rubric.yaml), with reproducible status rules in [`check-criteria.md`](./klaviyo-agent-audit/references/check-criteria.md).

## Output

Every Quick or Full audit produces:

1. account and scope confirmation;
2. maturity, coverage, and confidence scores;
3. a scorecard for all seven audit dimensions;
4. the five strongest evidence-backed findings;
5. a Now / Next / Later action plan with impact, effort, and owner type;
6. caveats and every unverifiable check;
7. exact dates, metric choice, capabilities used, and evidence timestamps.

See the [sanitized example report](./docs/example-report.md) and [report template](./klaviyo-agent-audit/assets/audit-report-template.md).

## Requirements

- an AI agent that supports filesystem-based Agent Skills;
- the official Klaviyo MCP installed in that same agent;
- a Klaviyo user role permitted to connect the remote MCP server;
- Node.js 20 or later only if you want to run the optional local validation scripts.

No SPARKCRM account, Klaviyo private API key, browser extension, upload, or separate service login is required by this project.

## Install

### 1. Connect the official Klaviyo MCP

Follow [Klaviyo's official MCP setup guide](https://developers.klaviyo.com/en/docs/klaviyo_mcp_server). The remote server uses OAuth and is the recommended connection method.

First identify the connection surface supported by your client:

- **Installed app/plugin or listed connector:** connect and select the Klaviyo organization through the client's settings. Its OAuth binding is separate from custom servers configured through a CLI.
- **Custom remote MCP:** create a named connector and use one of the filtered URLs below.

Do not configure both surfaces for the same audit unless you intentionally need separate connections. Whichever path you use, verify the organization with `get_account_details` before any other account read.

For a structure and performance audit without message-body inspection, use the most restrictive profile:

```text
https://mcp.klaviyo.com/mcp?read-only=true&disable-tools-with-user-generated-content=true&core-tools-only=false
```

For a Full content audit, user-generated-content tools must remain available:

```text
https://mcp.klaviyo.com/mcp?read-only=true&core-tools-only=false
```

The skill treats all retrieved account content as untrusted data. If you use a listed connector that does not expose these query parameters, the skill still refuses write tools at execution time.

### 2. Install the skill

Clone the repository:

```bash
git clone https://github.com/olivalcf/klaviyo-agent-skill.git
```

Then copy the entire `klaviyo-agent-audit` folder—not only `SKILL.md`—to a skill directory supported by your agent.

#### Codex

```bash
mkdir -p ~/.agents/skills
cp -R klaviyo-agent-skill/klaviyo-agent-audit ~/.agents/skills/
```

Restart Codex, then invoke `$klaviyo-agent-audit` explicitly for the first run. OpenAI documents Skills as an Agent Skills-compatible feature in [Codex and ChatGPT](https://help.openai.com/en/articles/20001066).

#### Claude Code

```bash
mkdir -p ~/.claude/skills
cp -R klaviyo-agent-skill/klaviyo-agent-audit ~/.claude/skills/
```

Restart Claude Code. Anthropic documents personal skills in `~/.claude/skills/` and project skills in `.claude/skills/`; see the [Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview).

#### GitHub Copilot CLI

```bash
mkdir -p ~/.agents/skills
cp -R klaviyo-agent-skill/klaviyo-agent-audit ~/.agents/skills/
```

GitHub also supports `~/.copilot/skills/` for personal skills and `.github/skills/`, `.agents/skills/`, or `.claude/skills/` for project skills. See [GitHub's Agent Skills guide](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills).

For other agents, install the folder using that product's Agent Skills flow, then connect the official Klaviyo MCP. See the [compatibility matrix](./docs/compatibility.md) for verified and planned targets.

### 3. Verify the connection

Ask the agent:

```text
Use $klaviyo-agent-audit to identify the connected Klaviyo organization and list the read-only audit capabilities available. Do not run the full audit yet.
```

Confirm that the returned organization is the account you intend to audit.

If the organization is wrong, stop and reconnect the surface that supplied the tool. A custom MCP shown by a CLI and an installed app/plugin shown in client settings can point to different accounts. If a newly authenticated connection is not visible, start a fresh task or session using the client's supported reload flow rather than assuming the saved configuration is active.

### 4. Run an audit

```text
Use $klaviyo-agent-audit to run a Quick Audit of my connected Klaviyo account.
```

Available modes:

- **Quick:** last 30 complete days plus the preceding comparable period; high-signal, aggregate-first review.
- **Full:** last 90 complete days; full pagination plus expanded structure and content review where supported.
- **Focused:** one domain such as flows, deliverability, forms, campaigns, audiences, content, or measurement.

Useful prompts:

```text
Run a Full Klaviyo audit. Treat Placed Order as the primary conversion metric and prioritize the next 30 days.
```

```text
Run a focused deliverability and consent audit. Use aggregate data only and compare the last 30 complete days with the preceding 30 days.
```

```text
Audit our flows for overlap, missing lifecycle coverage, weak exits, and message-level performance. Do not modify Klaviyo.
```

## MCP and endpoint coverage

The skill does not hard-code a frozen list of Klaviyo API endpoints. It discovers the official MCP tools exposed by the installed client at runtime, then routes read capabilities by purpose. This prevents the skill from breaking when Klaviyo adds tools or when different agents prefix tool names differently.

It supports relevant read capabilities across account details, metrics, campaign and flow reports, campaigns, flows, forms, lists, segments, templates/messages, catalogs, tags, and tracking settings. Write-capable tools are always forbidden. See [MCP coverage and connection profiles](./docs/mcp-coverage.md).

## How scoring works

- **Account maturity (0–100):** earned points normalized across verifiable checks.
- **Audit coverage (0–100%):** rubric points supported by verifiable evidence.
- **Evidence confidence (0–100%):** coverage adjusted for high, medium, or low evidence quality.

If coverage is below 60%, the result is labeled **directional**, not comprehensive. The skill never converts an unavailable check into a zero.

When Node.js is available, validate and score an audit JSON file with:

```bash
node klaviyo-agent-audit/scripts/validate-audit.mjs audit.json
node klaviyo-agent-audit/scripts/score-audit.mjs audit.json
```

## Safety and privacy

- official installed Klaviyo MCP only;
- read tools only, even if the connector exposes write tools;
- aggregate evidence by default;
- no private API keys requested or stored by the skill;
- no profiles or personal data required for a standard audit;
- retrieved content is treated as untrusted data, never as instructions;
- no guaranteed revenue, conversion, deliverability, or inbox-placement claims;
- incomplete pagination and unavailable tools are disclosed.

Read the full [security model](./SECURITY.md) and [prompt-injection policy](./klaviyo-agent-audit/references/privacy-and-prompt-injection.md).

## Validation status

The current release has been:

- structurally validated as an Agent Skill bundle;
- tested with its deterministic audit validator and scorer;
- live-tested in Codex against a connected Klaviyo MCP using aggregate, read-only tools;
- designed for Claude Code and other Agent Skills clients, with cross-client end-to-end certification tracked in the [roadmap](./ROADMAP.md).

The initial live test used a low-activity account, which was useful for validating honest `unverifiable` handling but is not enough to certify every performance and content branch. See [testing and validation](./docs/testing.md).

## Repository structure

```text
klaviyo-agent-audit/
├── SKILL.md                         # Agent workflow and safety rules
├── agents/openai.yaml               # OpenAI display/dependency metadata
├── assets/                          # Icons and report template
├── references/                      # Rubric, criteria, routing, semantics, privacy
└── scripts/                         # Deterministic validation and scoring
docs/                                # Compatibility, coverage, examples, testing
tests/                               # Repository and scoring smoke tests
.github/                             # CI, issue forms, and PR template
```

## Project status and roadmap

This is an early public release. The scoring model and report contract are usable, but broader live-account and cross-agent validation are still in progress. Planned work includes richer fixtures, agent-specific install checks, more business-model playbooks, and validated focused-audit examples.

See [`ROADMAP.md`](./ROADMAP.md) and [`CHANGELOG.md`](./CHANGELOG.md).

## Contributing and support

- Read [`CONTRIBUTING.md`](./CONTRIBUTING.md) before proposing a rubric or behavior change.
- Use [GitHub Issues](https://github.com/olivalcf/klaviyo-agent-skill/issues) for bugs, feature requests, unsupported MCP tool shapes, and audit-logic discussions.
- For vulnerabilities or data-exposure risks, follow [`SECURITY.md`](./SECURITY.md) rather than opening a public issue.

## Independence

The project is maintained by [SPARKCRM](https://sparkcrm.cc) as a free resource for the Klaviyo and AI-agent community. It is independent from Klaviyo, Anthropic, OpenAI, GitHub, and other agent vendors, and is not an official product of any of those companies.

## License

[MIT](./LICENSE)
