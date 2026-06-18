# NeuFin MCP tools (example)

NeuFin is building a private MCP (Model Context Protocol) server so
approved AI agents can call behavioral signals as tools before taking
action on wealth management workflows. This is currently in **private
beta**. See [`manifest.example.json`](manifest.example.json) for an
example server manifest (no real keys or endpoints).

Every tool below is **read-only** and **advisor-review-only**: calling a
tool never executes a trade, mutates a portfolio, sends a client
communication, or makes a suitability determination. Every tool response
includes `advisor_review_required: true` and `not_investment_advice: true`
(see [`docs/advisor-review-signals.md`](../docs/advisor-review-signals.md)).

## Tools

### `get_client_behavioral_risk`

Returns a behavioral risk score for a single client.

- **Read-only.** Advisor-review-only.
- Maps conceptually to `GET /v1/signals/client-risk/{client_id}` in the
  [public OpenAPI contract](../openapi/neufin-signals-api.public.yaml).

### `list_book_behavioral_alerts`

Returns a ranked list of at-risk clients across an advisor's book.

- **Read-only.** Advisor-review-only.
- Maps conceptually to `GET /v1/signals/book-alerts`.

### `get_churn_probability_score`

Returns the [Churn Probability Score](../docs/churn-probability-score.md)
(0–100) for a client, with the top contributing reasons.

- **Read-only.** Advisor-review-only.
- Maps conceptually to `GET /v1/signals/churn-score/{client_id}`.

### `detect_suitability_drift`

Returns the [suitability drift](../docs/suitability-drift.md) signal for a
client — the divergence between observed behavior and their stated risk
profile.

- **Read-only.** Advisor-review-only.
- Maps conceptually to `GET /v1/signals/suitability-drift/{client_id}`.

### `generate_advisor_brief`

Returns a generated morning brief summarizing behavioral signals across an
advisor's book.

- **Read-only.** Advisor-review-only.
- Maps conceptually to `GET /v1/advisor/brief`.

## Beta access

Request access via [https://www.neufin.ai/developer](https://www.neufin.ai/developer)
or [https://www.neufin.ai/contact-sales](https://www.neufin.ai/contact-sales).
