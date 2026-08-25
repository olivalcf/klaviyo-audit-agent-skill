# Changelog

All notable changes to this project are documented here. The project follows [Semantic Versioning](https://semver.org/) while the public interface stabilizes.

## [Unreleased]

- Cross-client end-to-end validation for Claude Code and GitHub Copilot CLI.
- Additional ecommerce and B2B audit fixtures.

### Fixed

- Distinguished installed Klaviyo apps/plugins from custom CLI MCP servers during setup and preflight.
- Added wrong-account and stale-tool-catalog recovery guidance before audit data collection.

## [0.2.1] - 2026-08-11

### Fixed

- Made the personal-data rejection test portable across macOS and Linux runners.
- Updated GitHub Actions to current Node runtimes and added Node.js 20/24 coverage.

## [0.2.0] - 2026-08-11

### Added

- Complete installation and compatibility documentation.
- MCP capability coverage and safer connection profiles.
- Sanitized example report and live-testing disclosure.
- Repository tests and GitHub Actions validation.
- Contribution, support, security, conduct, issue, and pull-request guidance.

### Changed

- Clarified the distinction between Agent Skills, the official Klaviyo MCP, and the independent SPARKCRM distribution page.
- Made `disable-tools-with-user-generated-content=true` the recommended profile when content inspection is not required.

## [0.1.0] - 2026-08-04

### Added

- Initial read-only Klaviyo audit skill.
- 100-point rubric with 30 checks across seven dimensions.
- Audit validator, scorer, report template, MCP routing, benchmark policy, reporting semantics, lifecycle playbooks, and prompt-injection controls.

[Unreleased]: https://github.com/olivalcf/klaviyo-agent-skill/compare/v0.2.1...HEAD
[0.2.1]: https://github.com/olivalcf/klaviyo-agent-skill/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/olivalcf/klaviyo-agent-skill/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/olivalcf/klaviyo-agent-skill/releases/tag/v0.1.0
