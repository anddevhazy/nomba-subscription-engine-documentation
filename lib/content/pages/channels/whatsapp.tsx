import { CardGrid, CardLink } from "@/components/docs/content/card-grid";
import type { PageMeta } from "@/lib/content/types";

export const meta: PageMeta = {
  eyebrow: "Channels",
  title: "WhatsApp",
  lede: "Retry Now, Pause Subscription, Downgrade Plan. A failed charge, three buttons, no phone call.",
};

export default function ChannelsWhatsapp() {
  return (
    <>
      <p>
        WhatsApp is the primary push channel, the first one recovery orchestration reaches for after a failed
        charge, ahead of SMS. An email with the same notice goes out in parallel every time, regardless of what
        happens here; see <a href="/channels/email">Email</a>. WhatsApp itself is provisioned via Twilio, with
        production business verification in place.
      </p>

      <h2 id="h-what">What arrives on WhatsApp</h2>
      <p>A single scenario, deliberately: a failed-charge notification with three inline actions.</p>
      <blockquote>
        Your Lumen Monthly payment of ₦15,000 didn&apos;t go through.
        <br />
        [Retry Now] &nbsp; [Pause Subscription] &nbsp; [Downgrade Plan]
      </blockquote>
      <p>
        The subscriber&apos;s tap is read directly and routed to the matching action against the subscription, no
        additional login, no separate app. Under the hood, each button is a scoped portal link, the same primitive
        documented in <a href="/merchants/customer-portal/deep-links-and-flows">Deep links and flows</a>, generated
        by recovery orchestration instead of by you.
      </p>

      <h2 id="h-actions">The three actions</h2>
      <table>
        <tbody>
          <tr>
            <th>Action</th>
            <th>What fires</th>
          </tr>
          <tr>
            <td>
              <strong>Retry Now</strong>
            </td>
            <td>Immediately re-attempts the charge against the card on file.</td>
          </tr>
          <tr>
            <td>
              <strong>Pause Subscription</strong>
            </td>
            <td>Moves the subscription to paused, billing stops, access can resume whenever the subscriber&apos;s ready.</td>
          </tr>
          <tr>
            <td>
              <strong>Downgrade Plan</strong>
            </td>
            <td>Switches to a lower-priced plan the merchant has configured as a downgrade path, and retries at the new price.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="h-scope">What WhatsApp is, and isn&apos;t, used for</h2>
      <p>
        This channel is scoped to dunning, failed-charge notification and the actions above. It is not a
        general-purpose conversational interface for browsing plans, managing a team, or reading analytics; those
        live on the web dashboard and portal. Keeping the scope narrow keeps the failure modes narrow too.
      </p>

      <h2 id="h-fallback">When WhatsApp isn&apos;t available</h2>
      <p>
        If the subscriber doesn&apos;t have WhatsApp, or delivery fails, the same message falls back to{" "}
        <a href="/channels/sms">SMS</a> automatically, see{" "}
        <a href="/concepts/recovery-orchestration">Recovery orchestration</a> for exactly how that decision is made.
      </p>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={3}>
        <CardLink
          href="/channels/sms"
          icon="📱"
          title="SMS"
          description="The fallback channel, and where it's the primary one instead."
        />
        <CardLink
          href="/channels/email"
          icon="✉️"
          title="Email"
          description="The channel that fires no matter what happens here."
        />
        <CardLink
          href="/subscribers/when-a-payment-fails"
          icon="🔁"
          title="When a payment fails"
          description="The same flow, from the subscriber's side."
        />
      </CardGrid>
    </>
  );
}
