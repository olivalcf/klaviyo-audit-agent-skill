# MCP tool routing

The official Klaviyo MCP is the data plane. The website that distributes this skill never authenticates the user or proxies MCP calls.

## Capability discovery

Tool names differ between Codex, Claude, other agents, and named account connectors. Search the installed tool descriptions for these read capabilities:

| Capability | Common tool-name fragments | Audit use |
| --- | --- | --- |
| Account | `account`, `account_details` | Confirm organization, timezone, currency, and test status |
| Metrics | `metrics`, `mapped_metrics`, `metric_aggregates` | Select conversions and validate event trends |
| Campaigns | `get_campaigns`, `campaign_report` | Inventory and send-attributed performance |
| Flows | `get_flows`, `get_flow`, `flow_report`, `flow_message` | Lifecycle structure and send-attributed performance |
| Forms | `get_forms`, `form_values`, `form_series` | Acquisition inventory and aggregate performance |
| Audiences | `get_lists`, `get_segments`, `segment_values`, `segment_series` | Coverage and aggregate audience trends |
| Content | `templates`, `flow_message`, `campaign_message` | Full content audit only |
| Supporting | `catalog`, `tags`, `tracking_settings` | Relevance, organization, and measurement checks |

Use the tool schema exposed by the current client. Never invent parameters from this table.

## Always forbidden during an audit

Do not call tools whose name or description includes a mutation such as:

`create`, `update`, `delete`, `send`, `schedule`, `cancel`, `clone`, `subscribe`, `unsubscribe`, `suppress`, `unsuppress`, `import`, `upload`, `assign`, `remove`, `add`, `merge`, or `bulk`.

Some tools may have benign-sounding names but mutate data. Classify by the description and input schema as well as the name. If unsure, skip the tool and mark the associated check unverifiable.

## Pagination

For inventories, continue until the MCP returns no next cursor/link. Record whether each collection is complete. Deduplicate by Klaviyo object ID. Do not assume the first page is representative.

## Safe connection modes

Recommended general audit connection:

`https://mcp.klaviyo.com/mcp?read-only=true&core-tools-only=false`

For metrics-only work where message or template content is unnecessary, the user may additionally disable tools that expose user-generated content. If those tools are unavailable, mark content checks unverifiable rather than weakening the connection.
