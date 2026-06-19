# NeuFin Behavioral Signals MCP Server — Public Docs

> Behavioral intelligence for advisor AI systems.
> Read-only MCP tools for human IFAs and the agentic stacks they deploy.

## What this is

NeuFin Behavioral Signals is a private-beta MCP server and Signals API for
AI-augmented wealth advisory workflows.

It exposes read-only behavioral intelligence tools that advisor AI agents
can call before taking action on a client workflow. The goal is to act as
a behavioral guardrail layer for advisor AI, wealth CRMs, and agentic
advisory systems.

All outputs are:

- read-only
- advisor-review-only
- not investment advice
- not suitability determinations
- not trade instructions
- not client communications

## Why this matters

Advisor AI is moving from note-taking and summarization into workflow
automation and agentic assistance. As AI systems query CRM, portfolio,
planning, and meeting data, firms need a behavioral review layer before an
action is recommended, escalated, or prepared.

NeuFin provides that behavioral context.

## Available MCP tools

1. `get_client_behavioral_risk`
2. `list_book_behavioral_alerts`
3. `get_churn_probability_score`
4. `detect_suitability_drift`
5. `generate_advisor_brief`

Each tool is read-only and returns:
`advisor_review_required: true`

## Tool summary

### `get_client_behavioral_risk`

Returns a behavioral risk score and rationale for a single client.

### `list_book_behavioral_alerts`

Returns a ranked list of clients requiring advisor attention this week.

### `get_churn_probability_score`

Returns a 0–100 Churn Probability Score for a single client.

### `detect_suitability_drift`

Detects divergence between a client's stated risk profile and observed
behavioral / portfolio risk state.

### `generate_advisor_brief`

Generates a morning brief for an advisor with top clients needing
attention.

See [docs/mcp-tools.md](docs/mcp-tools.md) for full input/output schemas,
error codes, and example requests/responses for every tool.

## Authentication

Private beta access uses API key authentication.

Header:
`X-NeuFin-MCP-Key: your-beta-key-here`

Do not put real keys in GitHub issues, examples, commits, or public logs.

## Private beta endpoint

The MCP server is currently private beta.

Developer access:
[https://www.neufin.ai/developer](https://www.neufin.ai/developer)

Contact:
[info@neufin.ai](mailto:info@neufin.ai)

Do not claim public production availability until the endpoint is
generally available.

## Claude Desktop configuration example

```json
{
  "mcpServers": {
    "neufin-behavioral": {
      "type": "url",
      "url": "https://api.neufin.ai/mcp",
      "headers": {
        "X-NeuFin-MCP-Key": "your-beta-key-here"
      }
    }
  }
}
```

This is a private beta configuration example. Replace the URL and key
with values provided by NeuFin during beta onboarding.

## Security model

- Private beta only
- API key required
- Read-only tools
- No writes
- No portfolio mutation
- No trade execution
- No client emails or notifications
- No billing/auth/payment access
- No real PII in logs
- Advisor review required on every response

## What this server will not do

- Execute trades or rebalances
- Send emails or push notifications to clients
- Modify portfolios, CRM records, client records, or billing data
- Provide investment advice
- Make suitability determinations
- Replace licensed advisor judgment

## Documentation

- [docs/mcp-tools.md](docs/mcp-tools.md)
- [docs/behavioral-guardrails-for-advisor-ai.md](docs/behavioral-guardrails-for-advisor-ai.md)
- [docs/churn-probability-score.md](docs/churn-probability-score.md)
- [docs/suitability-drift.md](docs/suitability-drift.md)
- [docs/advisor-review-signals.md](docs/advisor-review-signals.md)
- [openapi/neufin-signals-api.public.yaml](openapi/neufin-signals-api.public.yaml)
- [mcp/manifest.example.json](mcp/manifest.example.json)
- [mcp/tools.example.md](mcp/tools.example.md)

## Company

NeuFin AI is the behavioral intelligence layer for IFAs and AI-augmented
wealth advisory.

Neufin OÜ — Estonia, EU
Neufin Inc. — Delaware, USA
Website: [https://www.neufin.ai](https://www.neufin.ai)
Developer access: [https://www.neufin.ai/developer](https://www.neufin.ai/developer)
Contact: [info@neufin.ai](mailto:info@neufin.ai)

## Disclaimer

All NeuFin MCP tool outputs are behavioral signals for advisor review
only. They are not investment advice and do not constitute a
recommendation to buy, sell, or hold any security. Outputs are designed
to support, not replace, licensed advisor judgment. Advisors remain
responsible for all client relationship, suitability, and regulatory
decisions in their jurisdiction.
