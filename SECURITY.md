# Security Policy

This repository contains public documentation, API contracts, and
examples only — it does not contain runnable application code, so most
traditional vulnerability classes (RCE, injection, auth bypass) don't
apply directly to its contents. If you find an issue in NeuFin's actual
product (the API, MCP server, or web app) that you discovered through
information in this repo, please still report it.

The NeuFin Behavioral Signals MCP server and Signals API are currently
**private beta** — they are not generally available, and the contracts
documented in this repo are subject to change before general
availability.

## Reporting a vulnerability

**Do not file a public GitHub issue for a security report.**

Email **info@neufin.ai** with:
- A description of the issue
- Steps to reproduce (if applicable)
- Potential impact
- Your suggested fix, if you have one (optional)

We aim to acknowledge reports within 48 hours and triage within 7 days.

## No bounty program

NeuFin does not currently run a paid bug bounty program. We're grateful
for responsible disclosure and will credit reporters (with permission) in
release notes where applicable, but no monetary reward is committed at
this time.

## Do not submit client or account data

Never include real client data, account identifiers, API keys, or any
other sensitive information in a GitHub issue, pull request, commit, or
public report against this repository. If your report requires sharing
such material to demonstrate the issue, send it directly to
**info@neufin.ai** instead, and reference it generically in any public
issue you open.

> **Advisor-review-only.** NeuFin does not execute trades, mutate
> portfolios, send client communications, provide investment advice, or
> make suitability determinations. All outputs require advisor review.
