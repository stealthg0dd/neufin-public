# Contributing

This repository hosts NeuFin AI's public developer documentation, API
contracts, and examples — not application source code. Contributions are
welcome for:

- Fixing typos, broken links, or unclear wording in `docs/`
- Improving examples in `examples/`
- Reporting inconsistencies between this repo and the live API/MCP
  contracts described here

## What this repo is not for

- Feature requests for the NeuFin product itself — use
  [contact-sales](https://www.neufin.ai/contact-sales) or
  info@neufin.ai instead.
- Bug reports about the production app, dashboard, or billing — those
  live in a private repository and aren't tracked here.
- Security reports — see [SECURITY.md](SECURITY.md).

## How to propose a change

1. Open an issue describing the change, or open a pull request directly
   for small fixes (typos, broken links).
2. Keep changes scoped to documentation, contracts, and examples. Do not
   submit real API keys, tokens, client data, or production
   configuration in any issue or PR.
3. A NeuFin maintainer will review and merge.

## Style

- Match the existing tone: descriptive, advisor-review-oriented, no
  investment-advice language (avoid prescriptive "buy/sell/hold" framing
  anywhere in this repo).
- OpenAPI and MCP examples should stay synthetic — no real client IDs,
  account numbers, or production hostnames beyond the documented public
  API gateway placeholder.
