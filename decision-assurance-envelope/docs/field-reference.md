# Field reference — NeuFin Decision Assurance Envelope v1

This is the authoritative field-by-field reference for
[`schema/v1.schema.json`](../schema/v1.schema.json). If this document and
the schema ever disagree, the schema is the source of truth.

## Top-level required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `decision_id` | string | yes | Unique identifier for this specific proposed decision. |
| `trace_id` | string | yes | Identifier linking this decision to a broader workflow or conversation trace, for cross-system correlation. |
| `organization_id` | string | yes | Identifier for the organization (advisory firm, platform, enterprise tenant) this decision was evaluated within. |
| `investor_id` | string | yes | Identifier for the specific investor this decision concerns. |
| `actor_or_agent` | object | yes | Identity of whoever proposed this decision. See below. |
| `mandate` | object | yes | What the actor or agent is actually authorized to do. |
| `investor_context` | object | yes | What is known about the investor relevant to this decision. |
| `portfolio_context` | object | yes | The current, relevant state of the investor's holdings. |
| `proposed_action` | object | yes | The specific action being proposed for review. |
| `suitability` | object | yes | Result of comparing the proposed action to the investor's stated mandate and risk profile. |
| `evidence` | object | yes | The traceable basis for this decision. |
| `disposition` | string | yes | `PROCEED`, `REVIEW`, `ESCALATE`, or `DENY`. |

## Optional top-level fields

| Field | Type | Description |
|---|---|---|
| `actor_id` | string | Identifier for the human actor (advisor, ops user) associated with this decision, when applicable. |
| `agent_id` | string | Identifier for the AI agent associated with this decision, when applicable. |
| `policy` | object | Result of comparing the proposed action to firm-level or configured policy constraints. |
| `confidence` | number | System-assigned confidence score for this decision, 0 to 1. |
| `human_approval` | object | Record of human review, when the disposition requires or received one. |
| `created_at` | string (date-time) | ISO 8601 timestamp for when the envelope was created. |

## `actor_or_agent`

| Field | Type | Description |
|---|---|---|
| `type` | `"human_actor"` \| `"ai_agent"` | Whether a human or an AI agent proposed the decision. |
| `id` | string | Identifier for the actor or agent. |
| `name` | string | Human-readable name (optional). |

## `mandate`

| Field | Type | Description |
|---|---|---|
| `scope` | string | The scope of authorization, e.g. `"propose_only"`. |
| `authorized_actions` | string[] | The specific action types this actor/agent may propose. |
| `constraints` | string[] | Freeform constraint labels, e.g. `"no_direct_execution"`. |

## `investor_context`

| Field | Type | Description |
|---|---|---|
| `risk_tolerance` | string | The investor's stated risk tolerance. |
| `time_horizon` | string | The investor's stated time horizon. |
| `investment_policy_summary` | string | A summary of the investor's applicable investment policy. |
| `behavioral_history_summary` | string | A summary of relevant prior behavior (e.g. reactions to volatility). |

## `portfolio_context`

| Field | Type | Description |
|---|---|---|
| `as_of` | string (date-time) | Timestamp the portfolio state was captured. |
| `concentration_summary` | string | Summary of concentration risk in the current portfolio. |
| `exposure_summary` | string | Summary of relevant exposure (sector, geography, asset class). |
| `recent_activity_summary` | string | Summary of recent account activity relevant to this decision. |

## `proposed_action`

| Field | Type | Description |
|---|---|---|
| `type` | string | A short label for the action type, e.g. `"rebalance"`. |
| `description` | string | A human-readable description of the proposed action. |
| `parameters` | object | Freeform structured parameters specific to the action type. |

## `suitability` / `policy`

Both objects share the same shape:

| Field | Type | Description |
|---|---|---|
| `match` | boolean | Whether the proposed action matches the investor's suitability profile (or firm policy). |
| `notes` | string | A short explanation of the match or mismatch. |

## `evidence`

| Field | Type | Description |
|---|---|---|
| `sources` | string[] | Identifiers or labels for the data sources that informed this decision. |
| `reasoning_summary` | string | A short, human-readable summary of the reasoning behind the decision. |

## `human_approval`

| Field | Type | Description |
|---|---|---|
| `reviewed_by` | string | Identifier for the human reviewer. |
| `reviewed_at` | string (date-time) | Timestamp of review. |
| `decision` | string | The reviewer's decision (freeform — e.g. `"approved"`, `"overridden"`). |

## `disposition`

One of exactly four values:

- `PROCEED`
- `REVIEW`
- `ESCALATE`
- `DENY`

A separate `NOT_EVALUATED` state is sometimes used by systems that
integrate this schema to represent "a check could not be completed" — this
is a systems-integration concern, not part of the four-value business
disposition enum itself, and is not present in `schema/v1.schema.json`'s
`disposition` enum.
