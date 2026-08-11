# MCP coverage and connection profiles

## MCP, not a second integration

The skill uses the official Klaviyo MCP already installed in the user's agent. It does not call Klaviyo from SPARKCRM, ship an API client, request a private key, or proxy OAuth.

Klaviyo's tool catalog evolves and different agents may prefix or rename tools. For that reason, the skill discovers capabilities from the runtime tool descriptions rather than pinning itself to a static namespace or copying every raw Klaviyo API endpoint into `SKILL.md`.

The current source of truth for individual MCP tools is Klaviyo's [official MCP server documentation](https://developers.klaviyo.com/en/docs/klaviyo_mcp_server#available-tools).

## Audit capability matrix

| Capability family | Typical evidence | Used for | Required? |
| --- | --- | --- | --- |
| Account | Organization, timezone, currency, test status | Identity and complete-day windows | Minimum preflight |
| Mapped metrics and metrics | Business conversions, engagement events, continuity | Metric choice and measurement | Required for performance scoring |
| Campaign inventory | Status, channel, send state, audience/message metadata | Cadence and program structure | Required for campaign dimension |
| Campaign reporting | Delivered, bounce, complaint, unsubscribe, click, conversion/value data | Send-attributed campaign outcomes | Required for campaign performance |
| Flow inventory and details | Status, trigger, filters, actions, timing, exits | Lifecycle coverage and logic | Required for flow structure |
| Flow reporting | Flow/message outcomes | Send-attributed lifecycle performance | Required for flow performance |
| Forms and form reporting | Status, targeting, views, submits, conversion | Acquisition coverage and performance | Optional; absence lowers coverage where applicable |
| Lists and segments | Inventory, definitions, processing/usage signals | Audience governance and lifecycle cohorts | Required for audience dimension |
| Aggregate segment reporting | Size and trend without member profiles | Audience health | Optional but preferred |
| Templates and messages | Subject, preview, hierarchy, links, accessibility, tracking | Full content review | Optional; user-generated content |
| Catalogs, tags, tracking, integrations | Product/business context and measurement controls | Relevance and operational quality | Optional supporting evidence |

The skill never retrieves profile/member records for a standard audit. If a client exposes only member-level tools for a check, the check remains `unverifiable` unless the user explicitly requests that data and the task truly requires it.

## Connection profiles

### Aggregate-first profile — recommended default

```text
https://mcp.klaviyo.com/mcp?read-only=true&disable-tools-with-user-generated-content=true&core-tools-only=false
```

Use for Quick Audits and most performance/structure reviews. It exposes the broader read tool set while disabling tools that can return account-authored content. Content checks will be `unverifiable`.

### Full content profile

```text
https://mcp.klaviyo.com/mcp?read-only=true&core-tools-only=false
```

Use when the user explicitly wants message, template, subject, preview, accessibility, tracking, or localization analysis. Read and apply the prompt-injection policy before interpreting content.

### Smaller-context profile

```text
https://mcp.klaviyo.com/mcp?read-only=true&disable-tools-with-user-generated-content=true&core-tools-only=true
```

Use only if the agent cannot reliably select from the complete tool catalog. Fewer tools can reduce context and improve routing but will lower audit coverage.

## Write tools

Write-capable Klaviyo tools are outside the audit scope even if the installed connector exposes them. The skill rejects tools that create, update, delete, send, schedule, subscribe, suppress, import, upload, clone, merge, assign, or otherwise change data.

Read-only is enforced twice:

1. by the connection query parameter where the client supports custom MCP URLs;
2. by the skill's execution rules before every tool call.

## Reporting semantics

Campaign and flow reporting answer send-attributed performance questions. Generic metric aggregates answer event-time questions. The skill does not mix these clocks into one performance claim. Exact rules are in [`reporting-semantics.md`](../klaviyo-agent-audit/references/reporting-semantics.md).
