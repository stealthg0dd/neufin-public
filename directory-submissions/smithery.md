# Smithery submission — NeuFin Behavioral Signals

## Status

**Defer until a runnable beta endpoint is stable.**

## Reason

Smithery-style listings often expect installable/runnable MCP server
flows — the platform may attempt to connect to and validate the server
at submission or install time. Do not submit a docs-only repo if the
platform validates runtime behavior; a submission that can't be
connected to will fail validation or misrepresent the server's current
status.

## Required before submission

- [ ] Stable private beta endpoint (consistent uptime, not a moving
      target)
- [ ] Auth docs finalized (API key issuance flow, header format —
      already drafted in [`../README.md`](../README.md) and
      [`../docs/mcp-tools.md`](../docs/mcp-tools.md), but should be
      reconfirmed against the live endpoint before listing)
- [ ] Rate limits confirmed and documented (currently documented as 100
      requests/minute per API key in `docs/mcp-tools.md` — verify this
      matches production before submission)
- [ ] Test connection performed against the real endpoint using a real
      (non-demo) beta key, end to end
- [ ] Clean support process in place (an actual person/queue behind
      info@neufin.ai able to handle Smithery-driven inbound)

## Do not

- Do not submit while the MCP server is private-beta-only with no
  public test path.
- Do not claim public production availability anywhere in the
  submission text.
