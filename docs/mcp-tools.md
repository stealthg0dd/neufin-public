# NeuFin MCP Tool Reference

Full input/output schema and example request/response for every NeuFin
Behavioral Signals MCP tool. The MCP server is currently **private beta**;
see the [README](../README.md) for access and configuration.

All examples on this page use fake/demo identifiers only
(`demo-client-XXX`, `demo-advisor-XXX`). No real client data, advisor
data, or production identifiers appear anywhere in this repository.

## Overview

| Tool | Purpose | Read-only |
|---|---|---|
| `get_client_behavioral_risk` | Behavioral risk score for one client | yes |
| `list_book_behavioral_alerts` | Ranked at-risk clients across a book | yes |
| `get_churn_probability_score` | Churn Probability Score (0–100) | yes |
| `detect_suitability_drift` | Stated vs. observed risk profile divergence | yes |
| `generate_advisor_brief` | Morning brief summarizing book-wide signals | yes |

Every tool response includes `advisor_review_required: true` and
`not_investment_advice: true`. No tool can write to a client record,
portfolio, or CRM — see [advisor-review-signals.md](advisor-review-signals.md).

## Authentication

All requests require an API key, passed as a header:

```
X-NeuFin-MCP-Key: your-beta-key-here
```

Do not put real keys in GitHub issues, examples, commits, pull requests,
or public logs. Beta keys are issued individually during onboarding — see
[https://www.neufin.ai/developer](https://www.neufin.ai/developer).

## Rate limit

**100 requests/minute per API key.** Requests beyond this limit receive a
`429` response (see below).

## Error codes

| Code | Meaning |
|---|---|
| `401` | Invalid or missing API key |
| `422` | Invalid input (e.g. malformed `client_id`, missing required field) |
| `429` | Rate limit exceeded (100 requests/minute per key) |
| `503` | Private beta disabled or temporarily unavailable |

---

## `get_client_behavioral_risk`

Returns a behavioral risk score and rationale for a single client.

**Input schema**

| Field | Type | Required | Description |
|---|---|---|---|
| `client_id` | string | yes | Opaque client identifier, as assigned by the integrating platform |

**Output schema**

| Field | Type | Description |
|---|---|---|
| `client_id` | string | Echoes the requested client ID |
| `score` | number (0–100) | Behavioral risk score |
| `risk_band` | string | One of `low`, `medium`, `high`, `critical` |
| `confidence` | number (0–1) | Model confidence in the score |
| `data_quality` | string | One of `insufficient`, `sufficient`, `high` |
| `rationale` | string | Plain-English summary of the score |
| `contributing_signals` | string[] | Top factors behind the score |
| `recommended_advisor_action` | string[] | Suggested next steps for the advisor |
| `advisor_review_required` | boolean | Always `true` |
| `not_investment_advice` | boolean | Always `true` |
| `generated_at` | string (ISO 8601) | Timestamp the signal was computed |
| `model_version` | string | Versioned model identifier |

**Example request**

```json
{
  "client_id": "demo-client-001"
}
```

**Example response**

```json
{
  "client_id": "demo-client-001",
  "score": 67.4,
  "risk_band": "high",
  "confidence": 0.78,
  "data_quality": "sufficient",
  "rationale": "Behavioral drift elevated 22 points in 14 days. Panic propensity score above median. Last advisor engagement 47 days ago.",
  "contributing_signals": [
    "Behavioral drift: +22 points in 14 days",
    "Panic propensity: 0.71",
    "Days since engagement: 47"
  ],
  "recommended_advisor_action": [
    "Schedule proactive check-in call",
    "Review portfolio concentration before next market event"
  ],
  "advisor_review_required": true,
  "not_investment_advice": true,
  "generated_at": "2026-06-18T09:00:00Z",
  "model_version": "cps-v1-public-preview"
}
```

---

## `list_book_behavioral_alerts`

Returns a ranked list of clients requiring advisor attention this week.

**Input schema**

| Field | Type | Required | Description |
|---|---|---|---|
| `limit` | integer | no | Max number of alerts to return (default 10, max 100) |

**Output schema**

| Field | Type | Description |
|---|---|---|
| `alerts` | array | List of alert objects, ranked by severity |
| `alerts[].client_id` | string | Opaque client identifier |
| `alerts[].risk_band` | string | One of `low`, `medium`, `high`, `critical` |
| `alerts[].primary_signal` | string | The dominant signal driving the alert (e.g. `suitability_drift`, `churn_risk`) |
| `alerts[].score` | number (0–100) | Score for the primary signal |
| `advisor_review_required` | boolean | Always `true` |
| `not_investment_advice` | boolean | Always `true` |
| `generated_at` | string (ISO 8601) | Timestamp the alert list was computed |

**Example request**

```json
{
  "limit": 3
}
```

**Example response**

```json
{
  "alerts": [
    {
      "client_id": "demo-client-002",
      "risk_band": "critical",
      "primary_signal": "suitability_drift",
      "score": 81.2
    },
    {
      "client_id": "demo-client-001",
      "risk_band": "high",
      "primary_signal": "churn_risk",
      "score": 67.4
    },
    {
      "client_id": "demo-client-003",
      "risk_band": "high",
      "primary_signal": "panic_propensity",
      "score": 64.0
    }
  ],
  "advisor_review_required": true,
  "not_investment_advice": true,
  "generated_at": "2026-06-18T09:00:00Z"
}
```

---

## `get_churn_probability_score`

Returns a 0–100 Churn Probability Score for a single client. See
[churn-probability-score.md](churn-probability-score.md) for the concept.

**Input schema**

| Field | Type | Required | Description |
|---|---|---|---|
| `client_id` | string | yes | Opaque client identifier |

**Output schema**

| Field | Type | Description |
|---|---|---|
| `client_id` | string | Echoes the requested client ID |
| `churn_probability_score` | number (0–100) | The CPS value |
| `risk_band` | string | One of `low`, `medium`, `high`, `critical` |
| `top_reasons` | string[] | Top contributing factors |
| `advisor_next_action` | string[] | Suggested next steps for the advisor |
| `advisor_review_required` | boolean | Always `true` |
| `not_investment_advice` | boolean | Always `true` |
| `generated_at` | string (ISO 8601) | Timestamp the score was computed |
| `model_version` | string | Versioned model identifier |

**Example request**

```json
{
  "client_id": "demo-client-003"
}
```

**Example response**

```json
{
  "client_id": "demo-client-003",
  "churn_probability_score": 72.4,
  "risk_band": "high",
  "top_reasons": [
    "Behavioral drift increased over the last review period",
    "Panic propensity signal elevated"
  ],
  "advisor_next_action": [
    "Schedule advisor review",
    "Review portfolio concentration and client communication history"
  ],
  "advisor_review_required": true,
  "not_investment_advice": true,
  "generated_at": "2026-06-18T09:00:00Z",
  "model_version": "cps-v1-public-preview"
}
```

---

## `detect_suitability_drift`

Detects divergence between a client's stated risk profile and observed
behavioral / portfolio risk state. See
[suitability-drift.md](suitability-drift.md) for the concept.

**Input schema**

| Field | Type | Required | Description |
|---|---|---|---|
| `client_id` | string | yes | Opaque client identifier |

**Output schema**

| Field | Type | Description |
|---|---|---|
| `client_id` | string | Echoes the requested client ID |
| `drift_score` | number (0–100) | Magnitude of the divergence |
| `drift_band` | string | One of `within_tolerance`, `mild_drift`, `significant_drift`, `critical_drift` |
| `top_reasons` | string[] | Top contributing factors |
| `advisor_review_required` | boolean | Always `true` |
| `not_investment_advice` | boolean | Always `true` |
| `generated_at` | string (ISO 8601) | Timestamp the signal was computed |
| `model_version` | string | Versioned model identifier |

**Example request**

```json
{
  "client_id": "demo-client-004"
}
```

**Example response**

```json
{
  "client_id": "demo-client-004",
  "drift_score": 41.0,
  "drift_band": "mild_drift",
  "top_reasons": [
    "Reported life event: retirement",
    "Portfolio risk mismatch increased over the last quarter"
  ],
  "advisor_review_required": true,
  "not_investment_advice": true,
  "generated_at": "2026-06-18T09:00:00Z",
  "model_version": "drift-v1-public-preview"
}
```

---

## `generate_advisor_brief`

Generates a morning brief for an advisor with top clients needing
attention.

**Input schema**

| Field | Type | Required | Description |
|---|---|---|---|
| `advisor_id` | string | no | Opaque advisor identifier. If omitted, defaults to the authenticated key's associated advisor. |

**Output schema**

| Field | Type | Description |
|---|---|---|
| `summary` | string | Plain-English summary of the brief |
| `highlighted_clients` | array | Clients flagged for review |
| `highlighted_clients[].client_id` | string | Opaque client identifier |
| `highlighted_clients[].reason` | string | Why the client was flagged |
| `advisor_review_required` | boolean | Always `true` |
| `not_investment_advice` | boolean | Always `true` |
| `generated_at` | string (ISO 8601) | Timestamp the brief was generated |

**Example request**

```json
{
  "advisor_id": "demo-advisor-001"
}
```

**Example response**

```json
{
  "summary": "3 clients flagged for review this week: 1 critical suitability drift, 2 high churn risk.",
  "highlighted_clients": [
    {
      "client_id": "demo-client-002",
      "reason": "Critical suitability drift"
    },
    {
      "client_id": "demo-client-001",
      "reason": "High churn probability score"
    },
    {
      "client_id": "demo-client-003",
      "reason": "High churn probability score"
    }
  ],
  "advisor_review_required": true,
  "not_investment_advice": true,
  "generated_at": "2026-06-18T09:00:00Z"
}
```

---

## Disclaimer

All outputs documented on this page are behavioral signals for advisor
review only. They are not investment advice and do not constitute a
recommendation to buy, sell, or hold any security. NeuFin does not
execute trades, mutate portfolios, send client communications, or make
suitability determinations. Advisors remain responsible for all client
relationship, suitability, and regulatory decisions in their
jurisdiction.
