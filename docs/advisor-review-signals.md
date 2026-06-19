# Advisor review signal contract

Every signal NeuFin exposes — via the Signals API or the MCP server —
shares a common contract, regardless of which behavioral concept it
represents. This page documents that shared shape.

## Required fields on every response

| Field | Type | Meaning |
|---|---|---|
| `advisor_review_required` | boolean | Always `true`. Signals are inputs to a human review step, never an autonomous trigger. |
| `not_investment_advice` | boolean | Always `true`. No NeuFin output should be interpreted as a recommendation to buy, sell, or hold any security. |
| `generated_at` | string (ISO 8601) | When the signal was computed. |

Endpoint-specific fields (scores, bands, reasons) are documented per-path
in [`openapi/neufin-signals-api.public.yaml`](../openapi/neufin-signals-api.public.yaml).

> **Advisor-review-only.** NeuFin does not execute trades, mutate
> portfolios, send client communications, provide investment advice, or
> make suitability determinations. All outputs require advisor review.

## What NeuFin signals never do

- Execute a trade
- Mutate a portfolio
- Send a client communication
- Provide investment advice
- Make a suitability determination on the advisor's behalf

## Why this matters for AI agents

If you're building an AI agent or CRM integration that calls NeuFin's
Signals API or MCP tools, treat every response as a **recommendation to
surface to a human**, not as authorization to act. See
[behavioral-guardrails-for-advisor-ai.md](behavioral-guardrails-for-advisor-ai.md)
for the pattern this is designed to support.

## Example responses

See [`examples/`](../examples/) for sample (synthetic) responses:

- [`client-risk-response.json`](../examples/client-risk-response.json)
- [`suitability-drift-response.json`](../examples/suitability-drift-response.json)
- [`weekly-digest-response.json`](../examples/weekly-digest-response.json)
