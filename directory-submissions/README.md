# Directory submission pack

Prepared submission text and checklists for listing NeuFin Behavioral
Signals (MCP server + Signals API) in developer/MCP directories. The MCP
server and Signals API are **private beta** — none of these submissions
should claim general availability.

## Execution order

1. **Glama — Add Server.** See [`glama.md`](glama.md). Lowest-friction,
   docs-only-friendly listing — do this first.
2. **awesome-mcp-servers PR.** See [`awesome-mcp-servers.md`](awesome-mcp-servers.md).
   Static list entry, no runtime validation — safe to submit alongside
   or right after Glama.
3. **mcpservers.org, if applicable.** See [`mcpservers-org.md`](mcpservers-org.md).
   Confirm the directory's current submission process before opening
   anything — format may differ from the one-line entry drafted here.
4. **Smithery — only after a runnable endpoint is stable.** See
   [`smithery.md`](smithery.md). Do not submit until the checklist in
   that file is fully satisfied.
5. **Product Hunt — only after website, docs, and a live demo are
   ready.** See [`product-hunt.md`](product-hunt.md). This should be the
   last submission, and should position the **Signals API / MCP Beta**
   specifically, not the general NeuFin dashboard product.

## Files in this pack

| File | Target |
|---|---|
| [`glama.md`](glama.md) | Glama MCP directory |
| [`awesome-mcp-servers.md`](awesome-mcp-servers.md) | github.com/punkpeye/awesome-mcp-servers (or equivalent) |
| [`smithery.md`](smithery.md) | Smithery — deferred, see file |
| [`mcpservers-org.md`](mcpservers-org.md) | mcpservers.org |
| [`product-hunt.md`](product-hunt.md) | Product Hunt — deferred, see file |

## Standing rules for every submission

- State **private beta** clearly — never imply general availability.
- Link only to public, documented resources: this repo,
  [https://www.neufin.ai](https://www.neufin.ai),
  [https://www.neufin.ai/developer](https://www.neufin.ai/developer),
  [https://www.neufin.ai/contact-sales](https://www.neufin.ai/contact-sales).
- Never include API keys, real client data, or private repo links in any
  submission text.
- Every listing should carry the same safety notes: read-only,
  advisor-review-only, no trade execution, no portfolio mutation, no
  client communication, no investment advice.
