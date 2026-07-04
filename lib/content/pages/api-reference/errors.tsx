import { CardGrid, CardLink } from "@/components/docs/content/card-grid";
import { CodeBlock } from "@/components/docs/code-block";
import type { PageMeta } from "@/lib/content/types";

export const meta: PageMeta = {
  eyebrow: "API reference",
  title: "Errors",
  lede: "Status codes, error codes, and what each one means for your retry logic.",
};

export default function ApiErrors() {
  return (
    <>
      <p>
        Errors follow the same envelope everywhere in the API, a status code that tells your HTTP client what class
        of problem it is, and an <code className="inline">error_code</code> that tells your application code exactly
        what happened.
      </p>

      <CodeBlock
        language="json"
        code={`{
  "status": "error",
  "error_code": "resource_not_found",
  "message": "Subscription sub_01... was not found.",
  "requestId": "req_01HMFB..."
}`}
      />

      <h2 id="h-table">Common error codes</h2>
      <table>
        <tbody>
          <tr>
            <th>HTTP</th>
            <th>Code</th>
            <th>Meaning</th>
            <th>Retry?</th>
          </tr>
          <tr>
            <td>400</td>
            <td>
              <code className="inline">validation_failed</code>
            </td>
            <td>Request body failed schema validation.</td>
            <td>No, fix the request.</td>
          </tr>
          <tr>
            <td>401</td>
            <td>
              <code className="inline">invalid_auth</code>
            </td>
            <td>Bad or revoked API key.</td>
            <td>No.</td>
          </tr>
          <tr>
            <td>403</td>
            <td>
              <code className="inline">forbidden</code>
            </td>
            <td>
              Authenticated, but not permitted for this action (e.g. a Team Member key hitting an Owner-only
              endpoint).
            </td>
            <td>No.</td>
          </tr>
          <tr>
            <td>404</td>
            <td>
              <code className="inline">resource_not_found</code>
            </td>
            <td>The ID doesn&apos;t exist, or doesn&apos;t belong to your merchant.</td>
            <td>No.</td>
          </tr>
          <tr>
            <td>409</td>
            <td>
              <code className="inline">conflict</code>
            </td>
            <td>
              The action doesn&apos;t make sense for the resource&apos;s current state (e.g. cancelling an
              already-cancelled subscription).
            </td>
            <td>No, check state first.</td>
          </tr>
          <tr>
            <td>422</td>
            <td>
              <code className="inline">invalid_state_transition</code>
            </td>
            <td>
              The requested lifecycle transition isn&apos;t valid from the subscription&apos;s current state. See{" "}
              <a href="/concepts/subscription-lifecycle">Subscription lifecycle</a>.
            </td>
            <td>No.</td>
          </tr>
          <tr>
            <td>429</td>
            <td>
              <code className="inline">rate_limited</code>
            </td>
            <td>
              Too many requests. Respect <code className="inline">Retry-After</code>.
            </td>
            <td>Yes, with backoff.</td>
          </tr>
          <tr>
            <td>500</td>
            <td>
              <code className="inline">internal_error</code>
            </td>
            <td>Something broke on our side.</td>
            <td>Yes, with backoff.</td>
          </tr>
          <tr>
            <td>503</td>
            <td>
              <code className="inline">upstream_unavailable</code>
            </td>
            <td>Nomba or another upstream dependency is temporarily unreachable.</td>
            <td>Yes, with backoff.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="h-retry-logic">A sane default retry policy</h2>
      <p>
        Retry on 429, 500, 502, 503, and network-level failures, with exponential backoff and jitter. Don&apos;t
        retry on 4xx codes other than 429, those mean the request itself needs to change, not that trying again will
        help.
      </p>

      <h2 id="h-requestid">Always log the requestId</h2>
      <p>
        Every error response carries a <code className="inline">requestId</code>. If you need to escalate an issue,
        that ID is what lets us find the exact request in our own logs without you needing to reproduce the full
        payload.
      </p>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/api-reference/webhook-events"
          icon="🔔"
          title="Webhook events"
          description="The same error discipline, applied to what we send you."
        />
        <CardLink
          href="/developer/rate-limits"
          icon="⏱️"
          title="Rate limits"
          description="The specifics behind every 429."
        />
      </CardGrid>
    </>
  );
}
