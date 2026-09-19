# NeuFin Decision Assurance Envelope

**Version 1.0.0**

The NeuFin Decision Assurance Envelope is a machine-readable structure for
representing a single proposed financial decision — the investor context,
mandate, suitability, evidence, and disposition behind it — so it can be
reviewed, audited, and replayed independent of the system that produced it.

This is a **NeuFin specification**, not an industry standard, a regulatory
standard, or an official standard of any kind. It's published so
developers, AI agent frameworks, and other systems can adopt a shared
structure for representing investor-aware decisions, and so it can be
cited, reviewed, and reused outside NeuFin's own product.

Canonical documentation: **https://www.neufin.ai/developers/decision-assurance-envelope**

## Why agentic financial systems need this

Agentic and AI-assisted wealth workflows produce a lot of proposed
decisions — rebalance suggestions, outreach flags, drafted
recommendations. Without a shared structure, the context behind each
decision (who proposed it, under what mandate, based on what investor and
portfolio state, checked against what suitability and policy constraints)
tends to live in system-specific formats that are hard to audit or move
between tools.

A decision that's fluent and technically well-reasoned about a market can
still carry almost no information about the specific investor it affects.
The Decision Assurance Envelope exists to make that information explicit,
travel with the decision, and be checkable by a human reviewer or a
downstream audit process — regardless of which system originated it.

## What's in this repo

| Path | Contents |
|---|---|
| `schema/v1.schema.json` | The JSON Schema (draft 2020-12) defining the envelope |
| `examples/proceed.json` | A decision that passed suitability and policy checks cleanly |
| `examples/review.json` | A decision flagged for advisor review (suitability mismatch) |
| `examples/escalate.json` | A decision requiring senior/specialist review (policy threshold + behavioral risk) |
| `examples/deny.json` | A decision that should not proceed as proposed (hard policy violation) |
| `docs/field-reference.md` | Field-by-field reference for every property in the schema |
| `docs/integration.md` | How to produce, validate, and consume envelopes in your own systems |
| `validators/validate.ts` | Minimal TypeScript example: validate a JSON file against the schema |
| `validators/validate.py` | Minimal Python example: validate a JSON file against the schema |
| `CHANGELOG.md` | Version history |

## Fields (summary)

| Field | Type | Description |
|---|---|---|
| `decision_id` | string | Unique identifier for this specific proposed decision |
| `trace_id` | string | Links this decision to a broader workflow trace |
| `organization_id` | string | The organization this decision was evaluated within |
| `investor_id` | string | The specific investor this decision concerns |
| `actor_id` / `agent_id` | string | The human actor or AI agent associated with this decision |
| `actor_or_agent` | object | Structured identity of whoever proposed the decision |
| `mandate` | object | What the actor or agent is actually authorized to do |
| `investor_context` | object | Risk tolerance, time horizon, investment policy, behavioral history |
| `portfolio_context` | object | Current, relevant state of the investor's holdings |
| `proposed_action` | object | The specific action being proposed for review |
| `suitability` | object | Result of comparing the proposed action to the investor's mandate |
| `policy` | object | Result of comparing the proposed action to firm-level policy |
| `evidence` | object | The traceable basis for the decision — sources and reasoning |
| `confidence` | number | System-assigned confidence score, 0 to 1 |
| `human_approval` | object | Record of human review, when required |
| `disposition` | string | `PROCEED`, `REVIEW`, `ESCALATE`, or `DENY` |

See [`docs/field-reference.md`](./docs/field-reference.md) for the full,
field-by-field reference, and [`schema/v1.schema.json`](./schema/v1.schema.json)
for the authoritative machine-readable definition.

## Disposition model

Every envelope resolves to exactly one of four business dispositions:

- **PROCEED** — investor context, suitability, and policy checks passed cleanly.
- **REVIEW** — something warrants advisor attention before the action moves forward.
- **ESCALATE** — the mismatch or stakes require senior or specialist review.
- **DENY** — the action should not proceed as proposed.

Technical systems may separately represent a `NOT_EVALUATED` state where a
check could not be completed — this is outside the four-value business
vocabulary above, and is a systems-integration concern rather than part of
the disposition model itself.

## Examples

See [`examples/proceed.json`](./examples/proceed.json),
[`examples/review.json`](./examples/review.json),
[`examples/escalate.json`](./examples/escalate.json), and
[`examples/deny.json`](./examples/deny.json) for one worked example of
each disposition.

## Integration patterns

See [`docs/integration.md`](./docs/integration.md) for a full walkthrough.
In short: any system that proposes a financial decision — a human advisor
tool, an AI copilot, or an autonomous agent — can produce a JSON document
conforming to `schema/v1.schema.json`, and any reviewing or auditing system
can validate and consume that same document, regardless of which system
produced it.

## Versioning

This is **v1.0.0** of the specification. The schema is published at a
versioned path (`schema/v1.schema.json`) so that future versions can be
added without breaking existing integrations. See
[`CHANGELOG.md`](./CHANGELOG.md) for version history.

## Limitations

- This specification describes a **proposed** decision under review, not a
  completed or executed action.
- It does not itself enforce anything — enforcement is the responsibility
  of the systems that produce and consume envelopes.
- It is **not** an industry standard, a regulatory standard, or an
  official standard. It is not a certification, and conforming to this
  schema does not imply regulatory compliance of any kind.
- Field values (e.g. `suitability.match`, `confidence`) reflect whatever
  logic the producing system used to compute them — this specification
  defines the structure, not the correctness of any particular
  implementation's scoring.

## Usage

This specification is published by NeuFin for reference and integration
purposes. See NeuFin's [Terms and Conditions](https://www.neufin.ai/terms-and-conditions)
for usage terms.

## Links

- Canonical documentation: https://www.neufin.ai/developers/decision-assurance-envelope
- AI Advice Evidence Benchmark (related research framework): https://www.neufin.ai/research/ai-advice-evidence-benchmark
- NeuFin MCP developer docs: https://www.neufin.ai/developers/mcp
