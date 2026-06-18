# NeuFin AI Public Developer Docs

**Behavioral intelligence layer for advisor AI systems.**

This repository contains NeuFin AI's **public** developer documentation:
API contracts, conceptual docs, MCP (Model Context Protocol) beta examples,
and sample responses. It exists to make NeuFin's behavioral-signals
approach discoverable, reviewable, and integrable by developers, advisor AI
platforms, and search/LLM crawlers.

**NeuFin's production application — the web app, backend services, scoring
engine, and infrastructure — is closed-source and lives in a private
repository.** Nothing in this repo is runnable application code. Everything
here is a contract: what the API and MCP tools look like from the outside,
and what concepts they implement, without exposing how they're computed
internally.

## What's in this repo

| Path | Contents |
|---|---|
| `docs/behavioral-guardrails-for-advisor-ai.md` | What a "behavioral guardrail" is and why agentic wealth workflows need one |
| `docs/churn-probability-score.md` | Concept doc for the Churn Probability Score (CPS) |
| `docs/suitability-drift.md` | Concept doc for Suitability Drift detection |
| `docs/advisor-review-signals.md` | The shared response contract every NeuFin signal follows |
| `openapi/neufin-signals-api.public.yaml` | Public OpenAPI contract for the NeuFin Signals API (private beta) |
| `mcp/manifest.example.json` | Example MCP server manifest (no real keys or endpoints) |
| `mcp/tools.example.md` | Description of each MCP tool exposed to advisor AI agents |
| `examples/*.json` | Sample (synthetic) API responses |

## Links

- Product: [https://www.neufin.ai](https://www.neufin.ai)
- Developer hub: [https://www.neufin.ai/developer](https://www.neufin.ai/developer)
- Behavioral guardrails explainer: [https://www.neufin.ai/intelligence/behavioral-guardrails-for-advisor-ai](https://www.neufin.ai/intelligence/behavioral-guardrails-for-advisor-ai)
- Glossary — Churn Probability Score: [https://www.neufin.ai/glossary/churn-probability-score](https://www.neufin.ai/glossary/churn-probability-score)
- Glossary — Suitability Drift: [https://www.neufin.ai/glossary/suitability-drift](https://www.neufin.ai/glossary/suitability-drift)
- Talk to us: [https://www.neufin.ai/contact-sales](https://www.neufin.ai/contact-sales)

## What NeuFin does — and does not — do

NeuFin surfaces behavioral signals for human advisors and the AI agents
they deploy. Every signal in this repo's contracts is designed for advisor
review, not autonomous action.

NeuFin does **not**:
- give investment advice
- execute trades
- mutate portfolios
- send client communications
- make suitability determinations

Every API and MCP response described in this repo includes
`advisor_review_required: true` and `not_investment_advice: true`.

## Status

The Signals API and MCP server are in **private beta**. Endpoints and
schemas in this repo are public contracts subject to change before general
availability. Request access via [contact-sales](https://www.neufin.ai/contact-sales)
or the [developer hub](https://www.neufin.ai/developer).

## License

Documentation and examples in this repo are provided for integration
reference. See [CONTRIBUTING.md](CONTRIBUTING.md) for how to propose
changes and [SECURITY.md](SECURITY.md) for how to report a security issue.
