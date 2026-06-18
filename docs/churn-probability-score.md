# Churn Probability Score (CPS)

## What it is

A Churn Probability Score (CPS) is a 0–100 score estimating the likelihood
that a client requires proactive advisor attention, based on behavioral
drift, unusual portfolio activity, a detected mismatch between stated risk
profile and observed behavior, or declining engagement signals.

CPS is **not** a prediction that a client will close their account. It is
a behavioral attention signal for the advisor to review.

> **Compliance note:** CPS is designed as an advisor-review signal only.
> It does not constitute investment advice, a prediction of client
> behavior, or a recommendation to take action. Advisors remain
> responsible for all client relationship decisions.

## Risk bands

| Band | Range | Meaning |
|---|---|---|
| Low | 0–25 | No action needed — behavior is consistent with the client's profile |
| Medium | 26–50 | Worth noting at the next scheduled review |
| High | 51–75 | Advisor should review before the next client touchpoint |
| Critical | 76–100 | Advisor should prioritize a review in the near term |

## What contributes to the score (conceptually)

CPS is a composite of multiple behavioral and portfolio signals — for
example, behavioral drift relative to a client's own baseline, panic
propensity, concentration anxiety, time since last engagement, and
portfolio-risk mismatch. This repo intentionally does not document the
exact weighting or computation — that's proprietary to NeuFin's scoring
engine. What's public is the **contract**: the score range, bands, and
response shape, documented in
[`openapi/neufin-signals-api.public.yaml`](../openapi/neufin-signals-api.public.yaml)
under `GET /v1/signals/churn-score/{client_id}`.

## How advisors typically use it

- A Monday-morning list of the top at-risk clients to follow up with
- A weekly digest summarizing book-wide attention risk
- A pre-meeting prep flag ahead of a scheduled review

## Related concepts

- [Suitability Drift](suitability-drift.md)
- [Behavioral guardrails for advisor AI](behavioral-guardrails-for-advisor-ai.md)
- [Advisor review signal contract](advisor-review-signals.md)

## Read more

[https://www.neufin.ai/glossary/churn-probability-score](https://www.neufin.ai/glossary/churn-probability-score)
