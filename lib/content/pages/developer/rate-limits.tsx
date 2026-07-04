import { Callout } from "@/components/docs/content/callout";
import { CardGrid, CardLink } from "@/components/docs/content/card-grid";
import { CodeBlock } from "@/components/docs/code-block";
import type { PageMeta } from "@/lib/content/types";

export const meta: PageMeta = {
  eyebrow: "Developer",
  title: "Rate limits",
  lede: "Per-key throughput, burst headroom, and the headers that tell you exactly where you stand.",
};

export default function RateLimits() {
  return (
    <>
      <Callout variant="note">
        <p>
          The specific numbers below are illustrative, the BRD commits to a 2-second response time under normal load
          (NFR-1) but doesn&apos;t fix exact throughput ceilings. Treat the shape of this page as final and the
          numbers as a starting point to confirm against your actual provisioning.
        </p>
      </Callout>

      <h2 id="h-numbers">Indicative limits</h2>
      <table>
        <tbody>
          <tr>
            <th>Resource</th>
            <th>Per-key limit</th>
          </tr>
          <tr>
            <td>Read endpoints (subscriptions, customers, invoices, analytics)</td>
            <td>100 requests/second sustained, burst to 200 for 5 seconds</td>
          </tr>
          <tr>
            <td>Write endpoints (create/update subscription, create plan)</td>
            <td>30 requests/second sustained, burst to 60</td>
          </tr>
          <tr>
            <td>Webhook subscription management</td>
            <td>10 requests/second sustained</td>
          </tr>
          <tr>
            <td>Inbound webhook delivery to you</td>
            <td>Unlimited, you&apos;re receiving, not requesting</td>
          </tr>
        </tbody>
      </table>

      <h2 id="h-headers">Headers on every response</h2>
      <table>
        <tbody>
          <tr>
            <th>Header</th>
            <th>Meaning</th>
          </tr>
          <tr>
            <td>
              <code className="inline">X-RateLimit-Limit</code>
            </td>
            <td>The current limit for this resource.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">X-RateLimit-Remaining</code>
            </td>
            <td>Requests left in the current window.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">X-RateLimit-Reset</code>
            </td>
            <td>Unix timestamp when the bucket refills.</td>
          </tr>
        </tbody>
      </table>
      <p>Exceeding the limit returns:</p>

      <CodeBlock
        code={`HTTP/1.1 429 Too Many Requests
Retry-After: 3
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0

{"error_code":"rate_limited","message":"Rate limit exceeded. Retry in 3 seconds."}`}
        language="json"
      />

      <h2 id="h-idempotency">Idempotency keys don&apos;t cost you a request</h2>
      <p>
        For write operations, pass an <code className="inline">Idempotency-Key</code> header. Retrying the same key
        after a 5xx replays the original outcome rather than double-processing, and doesn&apos;t consume a fresh
        rate-limit token.
      </p>

      <CodeBlock
        code={`curl -X POST https://api.nomba-subscriptions.com/subscriptions \\
  -H "Authorization: Bearer nse_live_..." \\
  -H "Idempotency-Key: $(uuidgen)" \\
  -d '{"customerId": "cus_01...", "planId": "plan_lumen_monthly"}'`}
        language="bash"
      />

      <h2 id="h-more">If you need more</h2>
      <p>
        Most integrations run well under these limits. If yours doesn&apos;t, a batch job re-syncing a large
        customer base, for instance, schedule it off-peak, or talk to us about a dedicated capacity tier.
      </p>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/developer/authentication"
          icon="🔑"
          title="Authentication"
          description="How a key is scoped in the first place."
        />
        <CardLink
          href="/api-reference/errors"
          icon="⚠️"
          title="Errors"
          description="What every error code, including 429, means for your retry logic."
        />
      </CardGrid>
    </>
  );
}
