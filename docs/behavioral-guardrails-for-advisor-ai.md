# Behavioral guardrails for advisor AI

AI agents are starting to act directly on wealth management workflows —
querying CRMs, reading portfolios, and proposing actions. What they
typically lack is behavioral context: whether a specific client is in a
panic state, drifting from their risk profile, or showing signs they're
about to leave. A **behavioral guardrail** is a pre-action check that
surfaces that context to a human advisor before an action fires.

## What's happening in agentic wealth right now

Wealth management is moving toward agentic workflows. Wealth platforms are
opening infrastructure to external AI agents, CRMs are introducing AI
agents directly into client workflows, and advisor "AI operating system"
platforms are expanding the set of actions an agent can take on an
advisor's behalf — from meeting notes to client follow-ups to portfolio
review prep.

## The gap

Most of these agents have access to market data, portfolio holdings, and
CRM notes — but not behavioral context. An agent can see that a client's
portfolio is concentrated in one sector, but it generally can't tell
whether that client is in a panic state, about to leave the practice, or
drifting away from the risk profile they originally agreed to. That gap is
what lets an otherwise well-intentioned automated action create a bad
outcome for a client an advisor would have caught with a five-minute
review.

## What a behavioral guardrail is

A behavioral guardrail is a pre-action validation check an AI agent makes
before executing. It calls a behavioral intelligence API or MCP tool to
check whether an action is appropriate given a client's current behavioral
state. It is **not** a block on the agent — it's a signal routed to the
advisor for review. The agent keeps moving; the advisor gets visibility
into a risk they would otherwise have missed.

## Signals involved

- **Churn Probability Score** — see [churn-probability-score.md](churn-probability-score.md)
- **Suitability Drift** — see [suitability-drift.md](suitability-drift.md)
- **Panic / overreaction propensity** — a signal estimating how likely a
  client is to overreact to short-term volatility
- **Behavioral attention risk** — a composite flag indicating a client's
  recent behavior warrants advisor review before any account-level action

This repo does not document how these signals are computed internally —
only the contract each one exposes. See
[advisor-review-signals.md](advisor-review-signals.md) for the shared
response shape every NeuFin signal follows.

## How NeuFin provides this layer

NeuFin exposes behavioral guardrails as MCP tools (see
[`mcp/tools.example.md`](../mcp/tools.example.md)) and REST API endpoints
(see [`openapi/neufin-signals-api.public.yaml`](../openapi/neufin-signals-api.public.yaml))
that advisor AI agents and CRMs can call before taking client-facing
action. Every response is designed for advisor review — none of it
triggers trades, communications, or portfolio changes on its own.

## Read more

- [https://www.neufin.ai/intelligence/behavioral-guardrails-for-advisor-ai](https://www.neufin.ai/intelligence/behavioral-guardrails-for-advisor-ai)
- [https://www.neufin.ai/developer](https://www.neufin.ai/developer)
