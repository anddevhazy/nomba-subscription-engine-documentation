import { CardGrid, CardLink } from "@/components/docs/content/card-grid";
import type { PageMeta } from "@/lib/content/types";

export const meta: PageMeta = {
  eyebrow: "For subscribers",
  title: "For subscribers",
  lede: "View it. Pause it. Cancel it. Fix a failed card. Without emailing the merchant and waiting.",
};

export default function SubscribersOverview() {
  return (
    <>
      <p>
        If you&apos;re paying for something on the Nomba Subscription Engine, a fitness app, a SaaS tool, a media
        subscription, this is the side built for you. You shouldn&apos;t have to email a merchant and wait to pause
        a subscription you&apos;re not using this month, and you shouldn&apos;t find out your card expired only when
        the app stops working.
      </p>

      <CardGrid cols={2}>
        <CardLink
          href="/subscribers/manage-your-subscription"
          icon="⚙️"
          title="Manage your subscription"
          description="View your plan, pause, resume, cancel, or update your payment method, from the portal, on your own time."
        />
        <CardLink
          href="/subscribers/when-a-payment-fails"
          icon="🔁"
          title="When a payment fails"
          description="What happens the moment a charge doesn't go through, and how to fix it in one reply."
        />
      </CardGrid>

      <h2 id="h-why">Why this matters</h2>
      <p>
        The usual failure mode for a subscription isn&apos;t a customer deciding to leave, it&apos;s a card quietly
        expiring and nobody noticing until access is already cut off. That&apos;s not a decision to churn, it&apos;s
        a support gap. Recovery on this platform is built to close that gap fast: an email lands every time inside
        minutes of a failed charge, WhatsApp too if you have it, SMS if you don&apos;t, with a one-tap or one-reply
        way to fix it.
      </p>

      <h2 id="h-channels">How you reach your subscription</h2>
      <table>
        <tbody>
          <tr>
            <th>Channel</th>
            <th>What you can do</th>
          </tr>
          <tr>
            <td>
              <strong>Web portal</strong>
            </td>
            <td>Full self-service: view, pause, resume, cancel, update payment method.</td>
          </tr>
          <tr>
            <td>
              <strong>Email</strong>
            </td>
            <td>
              A written record of every failed charge, with Retry Now, Pause, or Downgrade as links. Always sent,
              whatever else fires.
            </td>
          </tr>
          <tr>
            <td>
              <strong>WhatsApp</strong>
            </td>
            <td>Act on a failed-charge message directly, Retry Now, Pause, or Downgrade.</td>
          </tr>
          <tr>
            <td>
              <strong>SMS</strong>
            </td>
            <td>Reply YES to retry a failed charge. No app required.</td>
          </tr>
          <tr>
            <td>
              <strong>USSD</strong>
            </td>
            <td>Check status, pause, or cancel by dialling a short code, no data connection needed.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="h-start">Where to start</h2>
      <p>
        If you&apos;re already subscribed and just want to make a change, go to{" "}
        <a href="/subscribers/manage-your-subscription">Manage your subscription</a>. If a payment failed and you got
        a message, see <a href="/subscribers/when-a-payment-fails">When a payment fails</a>.
      </p>
    </>
  );
}
