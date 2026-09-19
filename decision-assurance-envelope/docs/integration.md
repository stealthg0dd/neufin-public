# Integration guide — NeuFin Decision Assurance Envelope v1

This guide walks through producing, validating, and consuming a Decision
Assurance Envelope in your own systems.

## 1. Producing an envelope

Any system that proposes a financial decision — a human advisor tool, an
AI copilot, or an autonomous agent — can produce a JSON document
conforming to [`schema/v1.schema.json`](../schema/v1.schema.json). At
minimum, populate the required fields: `decision_id`, `trace_id`,
`organization_id`, `investor_id`, `actor_or_agent`, `mandate`,
`investor_context`, `portfolio_context`, `proposed_action`, `suitability`,
`evidence`, and `disposition`.

A minimal example:

```json
{
  "decision_id": "dec_001",
  "trace_id": "trace_001",
  "organization_id": "org_example",
  "investor_id": "inv_001",
  "actor_or_agent": { "type": "ai_agent", "id": "agent_example" },
  "mandate": { "scope": "propose_only" },
  "investor_context": { "risk_tolerance": "moderate" },
  "portfolio_context": { "as_of": "2026-09-19T00:00:00Z" },
  "proposed_action": { "type": "rebalance", "description": "Example rebalance" },
  "suitability": { "match": true },
  "evidence": { "reasoning_summary": "Example reasoning" },
  "disposition": "PROCEED"
}
```

See [`examples/`](../examples/) for one fully-populated example per
disposition.

## 2. Validating an envelope

Validate a produced envelope against the schema before persisting or
transmitting it. Minimal examples are provided for TypeScript and Python
in [`validators/`](../validators/) — both use dependency-free, structural
checks against the required-field list rather than pulling in a full
JSON Schema library, so they have no external paid dependency. For
production use, validating against `schema/v1.schema.json` with a
standard JSON Schema library (e.g. `ajv` for TypeScript/JavaScript, or
`jsonschema` for Python) is recommended.

```bash
# TypeScript example (see validators/validate.ts)
npx tsx validators/validate.ts examples/proceed.json

# Python example (see validators/validate.py)
python3 validators/validate.py examples/proceed.json
```

## 3. Consuming an envelope

A reviewing system (an advisor dashboard, a compliance review queue, an
audit log) reads the `disposition` field to determine the envelope's
outcome, and can render the `investor_context`, `suitability`, `policy`,
and `evidence` fields to give a human reviewer the context they need
without re-deriving it from scratch.

For `REVIEW` and `ESCALATE` dispositions, a consuming system typically
surfaces the envelope to a human reviewer and, once resolved, records the
`human_approval` object back onto the envelope (or an updated copy of it)
before persisting a final record.

## 4. Cross-system portability

Because the envelope is a plain JSON document validated against a public
schema, it can move between systems that don't share any other
integration: an AI agent framework can produce an envelope, a separate
compliance system can validate and log it, and a third-party audit tool
can replay it later — all without a shared API or vendor relationship,
as long as each system agrees on the schema.

## 5. Versioning

This document describes v1.0.0. Future versions of the schema will be
published at a new versioned path (e.g. `schema/v2.schema.json`) rather
than modifying `v1.schema.json` in place, so existing integrations
continue to work against the version they were built for. See
[`../CHANGELOG.md`](../CHANGELOG.md).
