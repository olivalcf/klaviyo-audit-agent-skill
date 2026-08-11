# Contributing

Contributions are welcome, especially reproducible audit logic, safe MCP routing improvements, sanitized test fixtures, and cross-agent compatibility findings.

## Before opening a pull request

1. Open or find an issue for material scoring, privacy, or behavior changes.
2. Keep the audit read-only. Do not add write-capable Klaviyo operations.
3. Never commit credentials, MCP tokens, profile data, message recipients, or identifiable account exports.
4. Use fictional or irreversibly sanitized fixtures.
5. Preserve the distinction between maturity, coverage, and confidence.
6. Cite current first-party guidance when a rule depends on a vendor threshold or product behavior.
7. Run `npm test` with Node.js 20 or later.

## Audit-rule changes

A proposed check or threshold should be:

- observable through the official Klaviyo MCP;
- relevant to a stated business model or lifecycle intent;
- denominator-aware and explicit about analysis windows;
- actionable by an operator;
- safe when evidence is missing;
- free of universal performance claims unless supported by current first-party guidance.

Include the evidence requirement, pass/partial/fail/unverifiable behavior, scoring weight impact, and at least one sanitized test case.

## Pull requests

Keep pull requests focused. Describe what changed, why it improves audit reliability, how it was tested, and whether compatibility or privacy behavior changed.

By contributing, you agree that your contribution is licensed under the project's MIT License.
