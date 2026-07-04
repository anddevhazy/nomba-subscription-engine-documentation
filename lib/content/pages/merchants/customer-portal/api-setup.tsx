import { CardGrid, CardLink } from "@/components/docs/content/card-grid";
import { CodeBlock } from "@/components/docs/code-block";
import { Steps, Step } from "@/components/docs/content/steps";
import type { PageMeta } from "@/lib/content/types";

export const meta: PageMeta = {
  eyebrow: "Customer portal",
  title: "Set up the customer portal with the API",
  lede: "Generate a portal link server-side, redirect your customer, listen for what they change.",
};

export default function ApiSetup() {
  return (
    <>
      <p>
        Efe&apos;s bookkeeping tool resells access via the Subscription Engine, and his own product has a
        &quot;Manage billing&quot; button inside its own settings page. He doesn&apos;t want that button to dump a
        customer into a generic login screen, he wants it to drop them straight into the portal, already identified,
        ready to act. That&apos;s what this page covers.
      </p>

      <h2 id="h-roadmap">The integration, in four steps</h2>
      <Steps>
        <Step number={1} title="Configure the portal">
          <p>
            In the Dashboard or via the API, decide what subscribers can do. See{" "}
            <a href="/merchants/customer-portal/configure">Configure the customer portal</a>.
          </p>
        </Step>
        <Step number={2} title="Implement a redirect">
          <p>Generate a portal link server-side, send your customer to it.</p>
        </Step>
        <Step number={3} title="Listen to webhooks">
          <p>Know when a subscriber changes something without polling for it.</p>
        </Step>
        <Step number={4} title="Launch">
          <p>Flip from sandbox to live keys, confirm your live webhook endpoint is registered.</p>
        </Step>
      </Steps>

      <h2 id="h-configure">A common mistake</h2>
      <p>
        Every portal link is generated against a <code className="inline">customerId</code>. That customer belongs
        to exactly one merchant, scoped by <code className="inline">merchantId</code> at the data-access layer, the
        same tenant isolation covered in <a href="/architecture/overview">Architecture</a>. Requesting a link for a
        customer ID that isn&apos;t yours doesn&apos;t leak that customer&apos;s data, it fails outright:
      </p>
      <CodeBlock
        code={`{ "error_code": "resource_not_found", "message": "Customer cus_01... was not found." }`}
        language="json"
      />
      <p>
        If you see this and you&apos;re confident the customer exists, you&apos;re almost certainly authenticated as
        the wrong merchant, check which API key you&apos;re using before assuming the customer record is missing.
      </p>

      <h2 id="h-plans">Which plans a subscriber can switch to</h2>
      <p>
        If you&apos;ve enabled plan switching (see <a href="/merchants/customer-portal/configure">Configure</a>), you
        can optionally restrict the portal to a specific list of plans a subscriber is allowed to move between,
        rather than every active plan on your account. This matters if you sell plans that aren&apos;t meant to be
        self-serve, an enterprise tier sold manually, for instance. Leave the list empty and every active plan is
        eligible.
      </p>

      <h2 id="h-test">Preview and test</h2>
      <p>
        Generate portal links against your sandbox key (<code className="inline">nse_sandbox_*</code>) and a sandbox
        customer before going live. Sandbox charges never touch Nomba&apos;s real rails, so you can walk through
        pause, resume, cancel, and payment-method update without risk.
      </p>

      <h2 id="h-redirect">Implement a redirect</h2>
      <p>On your site, add a button that requests a portal link and redirects:</p>
      <CodeBlock
        code={`<form method="POST" action="/create-portal-link">
  <button type="submit">Manage billing</button>
</form>`}
        language="html"
      />
      <p>Server-side, request the link and redirect your customer to the URL you get back:</p>
      <CodeBlock
        code={`curl -X POST https://api.nomba-subscriptions.com/portal/links \\
  -H "Authorization: Bearer nse_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "customerId": "cus_01HMFD...",
    "redirectUrl": "https://efe-ledgerly.example.com/settings"
  }'`}
        language="bash"
      />
      <p>Response:</p>
      <CodeBlock
        code={`{
  "url": "https://portal.nomba-subscriptions.com/l/plnk_01HMFF...",
  "expiresAt": "2026-08-14T11:17:00Z"
}`}
        language="json"
      />
      <p>
        The link is single-use and short-lived. A customer who opens it lands in the full portal, already
        identified, no OTP required, this is the general-access version of the same primitive covered in depth in{" "}
        <a href="/merchants/customer-portal/deep-links-and-flows">Deep links and flows</a>.
      </p>

      <h2 id="h-webhooks">Listen to webhooks</h2>
      <p>
        Portal-driven changes fire through the same event catalogue as everything else on the platform, there&apos;s
        no separate webhook system for the portal. The subset that matters here:
      </p>
      <table>
        <tbody>
          <tr>
            <th>Event</th>
            <th>Fires when</th>
          </tr>
          <tr>
            <td>
              <code className="inline">subscription.updated</code>
            </td>
            <td>A subscriber pauses, resumes, or changes plan from the portal.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">subscription.cancelled</code>
            </td>
            <td>
              A subscriber cancels, with a <code className="inline">cancellationReason</code> field if you&apos;ve
              enabled reason capture, see{" "}
              <a href="/merchants/customer-portal/cancellation-page">Add a cancellation page</a>.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        There&apos;s no dedicated event for a payment-method update; the next successful charge against the new card
        is your confirmation it worked. Full event reference: <a href="/developer/webhooks">Webhooks</a> and{" "}
        <a href="/api-reference/webhook-events">Webhook events</a>.
      </p>

      <h2 id="h-launch">Launch the portal</h2>
      <ul>
        <li>
          Switch from <code className="inline">nse_sandbox_*</code> to <code className="inline">nse_live_*</code>{" "}
          keys.
        </li>
        <li>Confirm your production webhook endpoint is registered and returning 2xx.</li>
        <li>Generate one live portal link against a real customer and walk the full flow yourself before you ship the button.</li>
      </ul>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/merchants/customer-portal/deep-links-and-flows"
          icon="🔗"
          title="Deep links and flows"
          description="Scope a link to exactly one action instead of the general portal."
        />
        <CardLink
          href="/developer/webhooks"
          icon="🔔"
          title="Webhooks"
          description="The full event catalogue, retry, and replay."
        />
      </CardGrid>
    </>
  );
}
