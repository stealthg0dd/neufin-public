# Suitability Drift

> **Advisor-review-only.** NeuFin does not execute trades, mutate
> portfolios, send client communications, provide investment advice, or
> make suitability determinations. All outputs require advisor review.

## What it is

Suitability drift is the divergence between a client's stated or inferred
risk profile and their observed behavioral or portfolio risk state,
created by life events, market shocks, or gradual behavioral change.

## Why it matters

Risk profiles are typically captured once — at onboarding or an annual
review — under frameworks like the FCA Consumer Duty, MAS conduct
requirements, or MiFID II suitability obligations. Client behavior,
however, changes continuously. A risk profile that was accurate six months
ago may no longer reflect how a client is actually behaving today.

> **Compliance note:** NeuFin's Suitability Drift signal is designed to
> support suitability review workflows. Advisors remain responsible for
> all suitability determinations in their jurisdiction. NeuFin does not
> make suitability assessments or give investment advice.

## Drift bands

| Band | Meaning |
|---|---|
| Within tolerance | Behavior is consistent with the stated risk profile |
| Mild drift | Small divergence worth noting at the next scheduled review |
| Significant drift | Advisor should review before the next client touchpoint |
| Critical drift | Advisor should prioritize a suitability review in the near term |

## What can trigger drift (conceptually)

Life events (job change, divorce, inheritance, retirement), market shocks
that produce panic-sell behavior, changes in concentration anxiety, and
sustained drops in engagement. This repo documents the **contract** for
the drift signal — see `GET /v1/signals/suitability-drift/{client_id}` in
[`openapi/neufin-signals-api.public.yaml`](../openapi/neufin-signals-api.public.yaml)
— not the internal detection logic.

## Related concepts

- [Churn Probability Score](churn-probability-score.md)
- [Behavioral guardrails for advisor AI](behavioral-guardrails-for-advisor-ai.md)
- [Advisor review signal contract](advisor-review-signals.md)

## Read more

[https://www.neufin.ai/glossary/suitability-drift](https://www.neufin.ai/glossary/suitability-drift)
