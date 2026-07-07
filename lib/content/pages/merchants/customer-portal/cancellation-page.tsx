import { Callout } from "@/components/docs/content/callout";
import { CardGrid, CardLink } from "@/components/docs/content/card-grid";
import type { PageMeta } from "@/lib/content/types";
import { DoorOpen, Link2 } from "lucide-react";

export const meta: PageMeta = {
  eyebrow: "Customer portal",
  title: "Add a cancellation page",
  lede: "Cancellation is on by default. Here's how to learn why it happened, and what to offer before it does.",
};

export default function CancellationPage() {
  return (
    <>
      <p>
        A subscriber can cancel from the portal the moment you turn nothing off, it&apos;s on by default. What you
        can add on top is a reason prompt and a last offer, both optional, both configured from{" "}
        <a href="/merchants/customer-portal/configure">Configure the customer portal</a>.
      </p>

      <h2 id="h-reason">Collect a cancellation reason</h2>
      <p>Turn on Cancellation reason and a subscriber picks one before their cancellation completes:</p>
      <ul>
        <li>Too expensive</li>
        <li>Missing a feature I need</li>
        <li>Found a better alternative</li>
        <li>No longer need it</li>
        <li>Switching to a different plan</li>
        <li>Other, with a short free-text field</li>
      </ul>
      <Callout variant="note">
        <p>
          This isn&apos;t a requirement in the platform&apos;s original spec, it&apos;s a small, low-risk addition:
          the reason is stored as metadata on the cancellation event, not a new entity in the domain model. If
          it&apos;s not useful to you, leave the toggle off.
        </p>
      </Callout>

      <h2 id="h-find">Finding the reasons your subscribers give</h2>
      <p>Two places, both already covered elsewhere in these docs:</p>
      <table>
        <tbody>
          <tr>
            <th>Where</th>
            <th>What you see</th>
          </tr>
          <tr>
            <td>Merchant dashboard</td>
            <td>The subscription&apos;s detail page shows the reason alongside its cancellation date.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">subscription.cancelled</code> webhook
            </td>
            <td>
              The event payload carries a <code className="inline">cancellationReason</code> field when reason capture
              is on. See <a href="/api-reference/webhook-events">Webhook events</a>.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 id="h-offer">Offer Pause or Downgrade first</h2>
      <p>
        Turn this on and a subscriber who taps Cancel sees two alternatives before the cancellation goes through:
        Pause, if the timing&apos;s wrong, or Downgrade, if the price is the actual problem. Same two actions already
        covered in <a href="/subscribers/manage-your-subscription">Manage your subscription</a> and in every dunning
        message a failed charge triggers, nothing new to build, just offered a step earlier.
      </p>
      <p>
        There&apos;s no coupon or discount involved. This platform has no coupon entity, no discount code, nothing
        that changes a plan&apos;s price for one subscriber. If the reason for cancelling is price, the honest answer
        is a cheaper plan, not a temporary markdown on the current one.
      </p>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/merchants/customer-portal/deep-links-and-flows"
          icon={Link2}
          title="Deep links and flows"
          description="Send a subscriber straight to the cancellation screen, reason prompt included."
        />
        <CardLink
          href="/merchants/customer-portal/overview"
          icon={DoorOpen}
          title="Customer portal overview"
          description="Back to the start of this subsection."
        />
      </CardGrid>
    </>
  );
}
