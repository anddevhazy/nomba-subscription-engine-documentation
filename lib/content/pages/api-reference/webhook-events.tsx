import { CardGrid, CardLink } from "@/components/docs/content/card-grid";
import { CodeBlock } from "@/components/docs/code-block";
import type { PageMeta } from "@/lib/content/types";

export const meta: PageMeta = {
  eyebrow: "API reference",
  title: "Webhook events",
  lede: "Every event type we emit, with payload shape and the signature header that proves it came from us.",
};

export default function ApiWebhookEvents() {
  return (
    <>
      <p>
        This is the reference table for every event type, for the delivery mechanics (retry, dead-letter, replay),
        see <a href="/developer/webhooks">Webhooks</a>. For verifying the signature on any of these, see{" "}
        <a href="/security/webhook-verification">Webhook signature verification</a>.
      </p>

      <h2 id="h-events">Event catalogue</h2>
      <table>
        <tbody>
          <tr>
            <th>Event</th>
            <th>
              <code className="inline">data</code> shape
            </th>
          </tr>
          <tr>
            <td>
              <code className="inline">subscription.created</code>
            </td>
            <td>
              <code className="inline">{"{ subscriptionId, customerId, planId, status }"}</code>
            </td>
          </tr>
          <tr>
            <td>
              <code className="inline">subscription.updated</code>
            </td>
            <td>
              <code className="inline">{"{ subscriptionId, changes: { field: { from, to } } }"}</code>
            </td>
          </tr>
          <tr>
            <td>
              <code className="inline">subscription.cancelled</code>
            </td>
            <td>
              <code className="inline">
                {'{ subscriptionId, cancelledBy: "merchant" | "subscriber", effectiveAt, cancellationReason? }'}
              </code>
            </td>
          </tr>
          <tr>
            <td>
              <code className="inline">subscription.renewed</code>
            </td>
            <td>
              <code className="inline">{"{ subscriptionId, cycleStart, cycleEnd }"}</code>
            </td>
          </tr>
          <tr>
            <td>
              <code className="inline">invoice.paid</code>
            </td>
            <td>
              <code className="inline">{"{ invoiceId, subscriptionId, amount, currency }"}</code>
            </td>
          </tr>
          <tr>
            <td>
              <code className="inline">payment.failed</code>
            </td>
            <td>
              <code className="inline">
                {"{ subscriptionId, invoiceId, amount, currency, failureReason }"}
              </code>
            </td>
          </tr>
          <tr>
            <td>
              <code className="inline">payment.recovered</code>
            </td>
            <td>
              <code className="inline">
                {
                  '{ subscriptionId, invoiceId, amount, currency, recoveredVia: "whatsapp" | "sms" | "email" | "ussd" | "portal" }'
                }
              </code>
            </td>
          </tr>
        </tbody>
      </table>
      <p className="body-secondary">
        <code className="inline">cancellationReason</code> is only present on{" "}
        <code className="inline">subscription.cancelled</code> when a merchant has enabled reason capture in the
        portal, see <a href="/merchants/customer-portal/cancellation-page">Add a cancellation page</a>.
      </p>

      <h2 id="h-envelope">The envelope every event shares</h2>
      <CodeBlock
        language="json"
        code={`{
  "id": "evt_01HMFB...",
  "type": "payment.recovered",
  "createdAt": "2026-08-14T11:04:02Z",
  "data": { /* event-specific, see table above */ },
  "merchantId": "mrc_01HK...",
  "apiVersion": "v1"
}`}
      />

      <h2 id="h-headers">Delivery headers</h2>
      <CodeBlock
        language="text"
        code={`X-Nomba-Subs-Signature: t=1755168153,v1=5d9c8...
X-Nomba-Subs-Webhook-Id: whk_01HMFB...
X-Nomba-Subs-Event-Id: evt_01HMFB...`}
      />

      <p>
        See <a href="/security/webhook-verification">Webhook signature verification</a> for exactly how to check the{" "}
        <code className="inline">X-Nomba-Subs-Signature</code> header.
      </p>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/developer/webhooks"
          icon="🔔"
          title="Webhooks (guide)"
          description="Subscribing, retries, dead-letter, and replay."
        />
        <CardLink
          href="/security/webhook-verification"
          icon="✔️"
          title="Signature verification"
          description="Code in five languages."
        />
      </CardGrid>
    </>
  );
}
