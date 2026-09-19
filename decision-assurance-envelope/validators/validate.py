#!/usr/bin/env python3
"""
Minimal, dependency-free structural validator for the NeuFin Decision
Assurance Envelope v1. Checks that required fields are present and that
`disposition` is one of the four allowed values.

This is an example, not a full JSON Schema validator. For production use,
validate against ../schema/v1.schema.json with a standard JSON Schema
library (e.g. jsonschema).

Usage: python3 validate.py path/to/envelope.json
"""

import json
import sys

REQUIRED_FIELDS = [
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
]

VALID_DISPOSITIONS = {"PROCEED", "REVIEW", "ESCALATE", "DENY"}


def validate_envelope(envelope: dict) -> list[str]:
    errors = []

    for field in REQUIRED_FIELDS:
        if envelope.get(field) is None:
            errors.append(f"Missing required field: {field}")

    disposition = envelope.get("disposition")
    if isinstance(disposition, str) and disposition not in VALID_DISPOSITIONS:
        errors.append(
            f'Invalid disposition "{disposition}" — must be one of '
            f"{', '.join(sorted(VALID_DISPOSITIONS))}"
        )

    proposed_action = envelope.get("proposed_action")
    if isinstance(proposed_action, dict):
        if not isinstance(proposed_action.get("type"), str):
            errors.append("proposed_action.type must be a string")
        if not isinstance(proposed_action.get("description"), str):
            errors.append("proposed_action.description must be a string")

    return errors


def main() -> None:
    if len(sys.argv) != 2:
        print("Usage: python3 validate.py path/to/envelope.json", file=sys.stderr)
        sys.exit(2)

    with open(sys.argv[1], "r", encoding="utf-8") as f:
        envelope = json.load(f)

    errors = validate_envelope(envelope)
    if errors:
        print(f"INVALID: {sys.argv[1]}", file=sys.stderr)
        for e in errors:
            print(f"  - {e}", file=sys.stderr)
        sys.exit(1)

    print(f"VALID: {sys.argv[1]}")


if __name__ == "__main__":
    main()
