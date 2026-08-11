# Testing and validation

## Automated checks

Run:

```bash
npm test
```

The repository test suite verifies:

- required Skill frontmatter;
- relative files referenced by `SKILL.md` exist;
- the rubric dimension weights total 100 points;
- the recommended OpenAI dependency is the official Klaviyo MCP in read-only mode;
- a valid focused-audit fixture passes the validator;
- scoring returns the expected maturity, coverage, and confidence values;
- personal-data field names are rejected by the validator.

GitHub Actions runs the same suite on pushes and pull requests.

## Live MCP test completed

The first live test was completed in Codex on 2026-08-04 against an official connected Klaviyo MCP using read-only, aggregate tools.

| Item | Test value |
| --- | --- |
| Mode | Quick Audit |
| Current window | 2026-07-05 through 2026-08-03 |
| Comparison window | 2026-06-05 through 2026-07-04 |
| Rubric checks | 30 |
| Maturity | 3.2/100 |
| Coverage | 31% |
| Evidence confidence | 29.2% |
| Classification | Directional |
| Profiles or PII retrieved | None |
| Write-capable tools called | None |

The connected organization is intentionally omitted from the public fixture. It was a real, low-activity account. The low coverage validated that missing campaigns, flows, forms, content, and authoritative business-conversion evidence remain `unverifiable` instead of becoming artificial failures.

## What the first test did not prove

- full flow/action/message pagination on a mature account;
- high-volume performance comparisons;
- form targeting and version analysis;
- comprehensive message/template content review;
- business-model-specific lifecycle coverage at scale;
- end-to-end behavior in Claude Code, GitHub Copilot CLI, ChatGPT, or other clients.

Those gaps are tracked in [`ROADMAP.md`](../ROADMAP.md).

## Safe live-test protocol

1. Use a maintainer-controlled or explicitly authorized account.
2. Confirm the returned organization before deeper collection.
3. Use a read-only connection and inspect tool descriptions before every call.
4. Retrieve aggregates and inventories only; do not retrieve profiles or members.
5. Record exact windows, cursors, capabilities, and limitations.
6. Validate the structured audit and inspect the final report for identifiers.
7. Publish only fictional or irreversibly sanitized examples.
