import { CardGrid, CardLink } from "@/components/docs/content/card-grid";
import { Mermaid } from "@/components/docs/content/mermaid";
import type { PageMeta } from "@/lib/content/types";
import { Compass, Settings } from "lucide-react";

export const meta: PageMeta = {
  eyebrow: "Channels",
  title: "USSD",
  lede: "Dial a short code, check your status, pause or cancel. No data connection required, ever.",
};

export default function ChannelsUssd() {
  return (
    <>
      <p>
        USSD is the channel for a subscriber with no data connection at all, no app, no WhatsApp, sometimes no SMS
        reply flow they trust. Dialling a short code opens a menu session that works on the most basic handset,
        over the same signal that carries a phone call.
      </p>

      <h2 id="h-menu">The menu</h2>
      <Mermaid
        chart={`flowchart TD
    A["Dial short code"]:::accent --> B["1. Check status"]
    A --> C["2. Pause subscription"]
    A --> D["3. Cancel subscription"]

    classDef accent fill:#c9971f,stroke:#8a6416,color:#ffffff,font-weight:600;
`}
      />

      <table>
        <tbody>
          <tr>
            <th>Option</th>
            <th>What it shows or does</th>
          </tr>
          <tr>
            <td>
              <strong>1. Check status</strong>
            </td>
            <td>Current plan, price, next billing date, and whether the subscription is active, past due, or in a grace period.</td>
          </tr>
          <tr>
            <td>
              <strong>2. Pause subscription</strong>
            </td>
            <td>Same effect as pausing from the portal, billing stops, resumable any time.</td>
          </tr>
          <tr>
            <td>
              <strong>3. Cancel subscription</strong>
            </td>
            <td>Ends the subscription, same as cancelling from the portal.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="h-why">Why this exists as its own channel</h2>
      <p>
        USSD is provisioned through a telco or aggregator short-code arrangement, not something the platform runs
        itself, the way it might a webhook receiver. It has its own lead time to stand up, independent of
        engineering effort, which is why it&apos;s sequenced after WhatsApp and SMS rather than shipped alongside
        them. But it closes a real gap: a subscriber on a feature phone, or simply out of data for the day, still
        has a way to manage their subscription rather than just losing access silently.
      </p>

      <h2 id="h-limits">What USSD doesn&apos;t do</h2>
      <p>
        Updating a payment method isn&apos;t available over USSD, entering card details through a USSD session
        isn&apos;t a safe pattern, and doing it well would mean building a menu flow around a redirect to the
        portal, which defeats the purpose of a no-data channel. A subscriber who needs to fix a card gets directed
        to the web portal for that one step; everything else, status, pause, cancel, works entirely within the
        USSD session.
      </p>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/subscribers/manage-your-subscription"
          icon={Settings}
          title="Manage your subscription"
          description="The full-featured equivalent, from the portal."
        />
        <CardLink
          href="/concepts/recovery-orchestration"
          icon={Compass}
          title="Recovery orchestration"
          description="Where USSD fits as a fallback, not just a self-serve channel."
        />
      </CardGrid>
    </>
  );
}
