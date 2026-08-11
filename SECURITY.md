# Security policy

## Supported versions

Security fixes are applied to the latest release on the default branch.

## Reporting a vulnerability

Do not open a public issue for credential exposure, prompt-injection bypasses, unsafe tool routing, personal-data leakage, or any behavior that could mutate a Klaviyo account.

Use GitHub's private vulnerability-reporting flow at:

https://github.com/olivalcf/klaviyo-agent-skill/security/advisories/new

Include the affected file/version, reproduction steps, potential impact, and a safe proof of concept. Do not include real Klaviyo credentials or personal data.

## Security boundaries

This repository contains instructions and local validation scripts. It does not run a hosted Klaviyo integration, receive OAuth tokens, or store audit results.

The primary controls are:

- official installed Klaviyo MCP only;
- read-only connection parameters where the client permits them;
- execution-time rejection of write-capable tools;
- aggregate data by default;
- explicit handling of account content as untrusted input;
- no private API key collection;
- no browser scraping fallback;
- `unverifiable` status when safe evidence is unavailable.

Users remain responsible for reviewing their MCP configuration, the permissions shown by their agent, and every proposed tool call.
