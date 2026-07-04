import { CardGrid, CardLink } from "@/components/docs/content/card-grid";
import { CodeBlock } from "@/components/docs/code-block";
import type { PageMeta } from "@/lib/content/types";

export const meta: PageMeta = {
  eyebrow: "Customer portal",
  title: "Deep links and flows",
  lede: "A signed, single-use link into exactly one action. The same primitive that already powers our recovery messages, now available to call directly.",
};

export default function DeepLinksAndFlows() {
  return (
    <>
      <p>
        Look back at <a href="/channels/email">Email</a> or <a href="/channels/whatsapp">WhatsApp</a> and
        you&apos;ll notice something: Retry Now, Pause Subscription, and Downgrade Plan were never buttons wired to
        the general portal. Each one is a signed, single-use link scoped to exactly that action, for exactly that
        subscriber, expiring after a short window. This page formalizes that primitive as something you can generate
        yourself, for anything, not just a failed charge.
      </p>

      <h2 id="h-concept">What a flow actually is</h2>
      <p>
        A flow is a portal link scoped to one action instead of the whole portal. Opening it drops a subscriber
        straight into that single screen, with the rest of the portal&apos;s navigation hidden, so there&apos;s
        nothing to get lost in. You can set what happens when they finish: redirect back to your own site, or show a
        plain confirmation and stop.
      </p>

      <h2 id="h-types">Flow types</h2>
      <table>
        <tr>
          <th>Type</th>
          <th>What it does</th>
        </tr>
        <tr>
          <td>
            <code className="inline">update_payment_method</code>
          </td>
          <td>Land the subscriber straight on the card-update screen. The exact link our dunning messages send on a failed charge.</td>
        </tr>
        <tr>
          <td>
            <code className="inline">pause_subscription</code>
          </td>
          <td>One tap pauses, no navigation required.</td>
        </tr>
        <tr>
          <td>
            <code className="inline">resume_subscription</code>
          </td>
          <td>For a subscriber who paused and is ready to come back.</td>
        </tr>
        <tr>
          <td>
            <code className="inline">cancel_subscription</code>
          </td>
          <td>Opens straight to cancellation, including the reason prompt and Pause/Downgrade offer if you&apos;ve enabled them.</td>
        </tr>
        <tr>
          <td>
            <code className="inline">change_plan</code>
          </td>
          <td>Opens the plan-switch screen, respecting whatever plan restrictions you&apos;ve configured.</td>
        </tr>
      </table>

      <h2 id="h-create">Creating a flow</h2>
      <p>
        Same endpoint as a general portal link, with an <code className="inline">action</code> specified:
      </p>
      <CodeBlock
        code={`curl -X POST https://api.nomba-subscriptions.com/portal/links \\
  -H "Authorization: Bearer nse_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "customerId": "cus_01HMFD...",
    "action": "update_payment_method",
    "subscriptionId": "sub_01HMFC...",
    "redirectUrl": "https://efe-ledgerly.example.com/billing/updated"
  }'`}
        language="bash"
      />
      <p>Response is the same shape as a general link:</p>
      <CodeBlock
        code={`{
  "url": "https://portal.nomba-subscriptions.com/l/plnk_01HMFF...",
  "expiresAt": "2026-08-14T11:17:00Z"
}`}
        language="json"
      />
      <p>
        Use this from your own support tooling, &quot;here&apos;s a link to update your card&quot; is a much better
        reply to a support ticket than a password-reset-style explanation of how to log in.
      </p>

      <h2 id="h-after">Customizing what happens after</h2>
      <p>
        Set <code className="inline">redirectUrl</code> and a subscriber lands back on your own site the moment they
        finish the action, useful when the flow is embedded inside your own product&apos;s settings page and you
        don&apos;t want them stranded on our domain. Leave it out and they see a plain confirmation screen instead,
        with a link back to the full portal if they want to look around.
      </p>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/merchants/customer-portal/api-setup"
          icon="💻"
          title="Set up with the API"
          description="The general-access version of this same link primitive."
        />
        <CardLink
          href="/concepts/recovery-orchestration"
          icon="🧭"
          title="Recovery orchestration"
          description="Where this pattern was actually born."
        />
      </CardGrid>
    </>
  );
}
