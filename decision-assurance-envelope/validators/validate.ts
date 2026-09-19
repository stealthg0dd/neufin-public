/**
 * Minimal, dependency-free structural validator for the NeuFin Decision
 * Assurance Envelope v1. Checks that required fields are present and that
 * `disposition` is one of the four allowed values.
 *
 * This is an example, not a full JSON Schema validator. For production use,
 * validate against `../schema/v1.schema.json` with a standard JSON Schema
 * library (e.g. ajv).
 *
 * Usage: npx tsx validate.ts path/to/envelope.json
 */

const REQUIRED_FIELDS = [
  "decision_id",
  "trace_id",
  "organization_id",
  "investor_id",
  "actor_or_agent",
  "mandate",
  "investor_context",
  "portfolio_context",
  "proposed_action",
  "suitability",
  "evidence",
  "disposition",
] as const;

const VALID_DISPOSITIONS = ["PROCEED", "REVIEW", "ESCALATE", "DENY"] as const;

export function validateEnvelope(envelope: Record<string, unknown>): string[] {
  const errors: string[] = [];

  for (const field of REQUIRED_FIELDS) {
    if (!(field in envelope) || envelope[field] === null || envelope[field] === undefined) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  if (
    typeof envelope.disposition === "string" &&
    !VALID_DISPOSITIONS.includes(envelope.disposition as (typeof VALID_DISPOSITIONS)[number])
  ) {
    errors.push(
      `Invalid disposition "${envelope.disposition}" — must be one of ${VALID_DISPOSITIONS.join(", ")}`,
    );
  }

  if (envelope.proposed_action && typeof envelope.proposed_action === "object") {
    const action = envelope.proposed_action as Record<string, unknown>;
    if (typeof action.type !== "string") errors.push("proposed_action.type must be a string");
    if (typeof action.description !== "string") errors.push("proposed_action.description must be a string");
  }

  return errors;
}

// CLI entry point.
if (require.main === module) {
  const fs = require("fs");
  const path = process.argv[2];
  if (!path) {
    console.error("Usage: npx tsx validate.ts path/to/envelope.json");
    process.exit(2);
  }
  const envelope = JSON.parse(fs.readFileSync(path, "utf8"));
  const errors = validateEnvelope(envelope);
  if (errors.length) {
    console.error(`INVALID: ${path}`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  console.log(`VALID: ${path}`);
}
