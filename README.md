# Klaviyo Agent Audit

An open-source skill that turns the official Klaviyo MCP into a structured, evidence-based account audit inside Codex, Claude, and other agents that support skills plus MCP.

It is read-only by design. The skill audits and recommends; it never creates, changes, sends, schedules, subscribes, suppresses, or deletes anything in Klaviyo.

## What it audits

- flows and lifecycle coverage;
- data and measurement;
- deliverability and consent;
- campaign program;
- audience and segmentation;
- forms and acquisition;
- content and experimentation.

The report separates **account maturity**, **audit coverage**, and **evidence confidence**. Missing MCP evidence becomes `unverifiable`, not an invented failure.

## Install

### 1. Connect Klaviyo inside your agent

Follow [Klaviyo’s official MCP setup guide](https://developers.klaviyo.com/en/docs/klaviyo_mcp_server). The recommended audit connection is:

```text
https://mcp.klaviyo.com/mcp?read-only=true&core-tools-only=false
```

The Klaviyo connection belongs to your agent. This project and SPARKCRM do not proxy the connection, authenticate your account, or receive your Klaviyo data.

### 2. Add the skill

Download this repository, then install or copy the [`klaviyo-agent-audit`](./klaviyo-agent-audit) folder using your agent’s skill installation flow.

### 3. Run an audit

```text
Use $klaviyo-agent-audit to run a Quick Audit of my connected Klaviyo account.
```

Available modes:

- **Quick:** last 30 complete days plus the preceding comparable period.
- **Full:** last 90 complete days, full pagination, and expanded structure/content review.
- **Focused:** one domain such as flows, deliverability, forms, campaigns, or measurement.

## Safety model

- official installed Klaviyo MCP only;
- read tools only, even if the MCP exposes write tools;
- aggregate evidence by default;
- no private API keys requested or stored;
- no profiles or personal data needed for a standard audit;
- account content is treated as untrusted data, never as instructions;
- no guaranteed revenue, conversion, or deliverability claims.

## Methodology

The transparent 100-point rubric lives in [`audit-rubric.yaml`](./klaviyo-agent-audit/references/audit-rubric.yaml). Reproducible status rules live in [`check-criteria.md`](./klaviyo-agent-audit/references/check-criteria.md).

When Node.js is available, validate and score an audit JSON file with:

```bash
node klaviyo-agent-audit/scripts/validate-audit.mjs audit.json
node klaviyo-agent-audit/scripts/score-audit.mjs audit.json
```

## About

The project is maintained by [SPARKCRM](https://sparkcrm.cc/klaviyo-agent-skill) as a free resource for the Klaviyo and AI-agent community. It is independent from Klaviyo and is not an official Klaviyo product.

## License

[MIT](./LICENSE)
