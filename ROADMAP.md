# Roadmap

The roadmap prioritizes audit reliability before breadth. Items are directional and do not represent release commitments.

## Now

- Validate the full workflow on at least one active ecommerce account with campaigns, flows, forms, segments, mapped conversions, and sufficient reporting volume.
- Validate a non-ecommerce/B2B account with an explicitly mapped business conversion.
- Run end-to-end installation and invocation tests in Claude Code and GitHub Copilot CLI.
- Add fixtures for incomplete pagination, ambiguous conversion metrics, low volume, no forms, and user-generated-content tools disabled.

## Next

- Add focused-audit examples for deliverability, flow architecture, campaigns, forms, and measurement.
- Expand business-model playbooks for ecommerce, subscription, marketplace, B2B lead generation, and multi-region programs.
- Add machine-readable collection logs and source manifests.
- Add optional Markdown-to-PDF and Markdown-to-Doc report adapters without sending account data to SPARKCRM.

## Later

- Publish a versioned compatibility test matrix for additional Agent Skills clients.
- Add a benchmark-source registry with source dates and expiry checks.
- Add multilingual report templates.
- Evaluate a community registry or package installation flow after the open Agent Skills ecosystem stabilizes.

## Non-goals

- Writing to Klaviyo during an audit.
- Hosting or proxying a user's Klaviyo MCP connection.
- Storing account data, credentials, reports, or profile information on SPARKCRM.
- Presenting universal performance benchmarks as deterministic pass/fail thresholds.
