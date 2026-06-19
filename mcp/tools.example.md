# NeuFin MCP tools (example)

> **Advisor-review-only.** NeuFin does not execute trades, mutate
> portfolios, send client communications, provide investment advice, or
> make suitability determinations. All outputs require advisor review.

NeuFin is building a private MCP (Model Context Protocol) server so
approved AI agents can call behavioral signals as tools before taking
action on wealth management workflows. This is currently in **private
beta**. See [`manifest.example.json`](manifest.example.json) for an
example server manifest (no real keys or endpoints), and
[`docs/mcp-tools.md`](../docs/mcp-tools.md) for full input/output schemas
and example requests/responses.

Every tool below is **read-only** and **advisor-review-only**: calling a
tool never executes a trade, mutates a portfolio, sends a client
communication, or makes a suitability determination. Every tool response
includes `advisor_review_required: true` and `not_investment_advice: true`
(see [`docs/advisor-review-signals.md`](../docs/advisor-review-signals.md)).

## Tool summary

| Tool | Purpose | Input | Output | Read-only | Advisor review required |
|---|---|---|---|---|---|
| `get_client_behavioral_risk` | Behavioral risk score and rationale for a single client | `client_id` | `score`, `risk_band`, `rationale`, `contributing_signals`, `recommended_advisor_action` | yes | yes |
| `list_book_behavioral_alerts` | Ranked list of clients requiring advisor attention this week | `limit` (optional) | `alerts[]` (`client_id`, `risk_band`, `primary_signal`, `score`) | yes | yes |
| `get_churn_probability_score` | 0–100 Churn Probability Score for a client | `client_id` | `churn_probability_score`, `risk_band`, `top_reasons`, `advisor_next_action` | yes | yes |
| `detect_suitability_drift` | Divergence between stated risk profile and observed behavior | `client_id` | `drift_score`, `drift_band`, `top_reasons` | yes | yes |
| `generate_advisor_brief` | Morning brief summarizing book-wide signals | `advisor_id` (optional) | `summary`, `highlighted_clients[]` | yes | yes |

See [`docs/mcp-tools.md`](../docs/mcp-tools.md) for the full field-by-field
schema and example request/response for every tool.

## Beta access

Request access via [https://www.neufin.ai/developer](https://www.neufin.ai/developer)
or [https://www.neufin.ai/contact-sales](https://www.neufin.ai/contact-sales).
