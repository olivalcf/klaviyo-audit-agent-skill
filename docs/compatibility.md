# Compatibility

This project uses the open, filesystem-based Agent Skills format: a folder containing `SKILL.md` plus referenced resources and scripts. The agent must also support an installed MCP connection because the skill itself does not contain a Klaviyo client.

## Support matrix

| Client | Skill support | Klaviyo MCP path | Project status |
| --- | --- | --- | --- |
| Codex | Native Agent Skills | Installed Klaviyo app/plugin or custom remote MCP; verify the loaded surface | **Live-tested** |
| Claude Code | Native custom Skills | Listed Klaviyo connector or custom remote MCP | Format-reviewed; end-to-end test pending |
| GitHub Copilot CLI | Native Agent Skills | Custom MCP server | Format-reviewed; end-to-end test pending |
| Claude.ai | Custom Skill upload on eligible plans | Listed Klaviyo connector | Not yet certified |
| ChatGPT | Skills on eligible workspaces | Listed or custom Klaviyo connector, subject to workspace availability | Not yet certified |
| Claude API / managed agents | Custom Skill upload | MCP availability and network/runtime behavior depend on the integration | Not yet certified |
| Cursor / VS Code agents | Official Klaviyo MCP setup is documented | Remote or local MCP | Native Skill discovery varies by client; not yet certified |

**Live-tested** means the skill was invoked against a real connected account and the read-only audit path produced a report. **Format-reviewed** means the public client documentation supports the Skill structure and MCP connection pattern, but this repository has not yet completed an end-to-end run on that client.

## Portable core

The portable contract is:

- `SKILL.md` has `name`, `description`, and instructions;
- references use paths relative to the skill folder;
- tool discovery is capability-based rather than namespace-based;
- scripts require only Node.js built-ins;
- no client-specific command is required to audit;
- the official Klaviyo MCP is installed separately in the client.

The optional `agents/openai.yaml` file improves presentation and dependency metadata in OpenAI clients. Other clients can ignore it.

## Multiple connection surfaces

A listed app/plugin and a custom remote MCP are separate OAuth and tool-loading surfaces. Saving a custom MCP does not rebind an installed plugin, and seeing a connector in client configuration does not prove the current task loaded its tools. The portable verification sequence is therefore provider discovery, `get_account_details`, organization confirmation, then deeper audit reads. Use a fresh task or session after connection changes when the client does not hot-reload tools.

## Installation locations

| Scope | Common location |
| --- | --- |
| Cross-agent personal | `~/.agents/skills/klaviyo-agent-audit/` |
| Codex personal | `~/.agents/skills/klaviyo-agent-audit/` |
| Claude Code personal | `~/.claude/skills/klaviyo-agent-audit/` |
| Claude Code project | `.claude/skills/klaviyo-agent-audit/` |
| GitHub Copilot personal | `~/.copilot/skills/klaviyo-agent-audit/` or `~/.agents/skills/klaviyo-agent-audit/` |
| GitHub Copilot project | `.github/skills/`, `.agents/skills/`, or `.claude/skills/` |

Always copy the complete folder. The report template, rubric, policies, and scripts are part of the skill.

## Known portability limits

- Tool names and prefixes differ across clients; the skill discovers them by description and capability.
- Listed connectors may not let users set Klaviyo MCP query parameters. The skill still refuses write-capable tools itself.
- Some clients restrict filesystem access, scripts, custom Skills, or MCP to specific plans or administrators.
- A client with a small context window may struggle with the complete Klaviyo tool catalog. `core-tools-only=true` can improve tool selection, but reduces audit coverage.
- Content checks require user-generated-content tools and therefore a stricter prompt-injection posture.

Please open a compatibility issue with the agent version, installation location, MCP connection type, visible read capabilities, and sanitized behavior if you complete a test on an unlisted client.
