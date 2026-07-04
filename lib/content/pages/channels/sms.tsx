import { CardGrid, CardLink } from "@/components/docs/content/card-grid";
import type { PageMeta } from "@/lib/content/types";

export const meta: PageMeta = {
  eyebrow: "Channels",
  title: "SMS",
  lede: "Reply YES to retry. The rail that works when a customer has neither an app nor a smartphone worth the name.",
};

export default function ChannelsSms() {
  return (
    <>
      <p>
        SMS is the fallback push channel, where <a href="/channels/whatsapp">WhatsApp</a> can&apos;t reach a
        subscriber, SMS does. It&apos;s also, for some merchants&apos; customer bases, the primary push channel by
        default: not every subscriber has WhatsApp, but nearly all of them can receive a text. An{" "}
        <a href="/channels/email">email</a> with the same notice goes out in parallel regardless of how SMS
        resolves.
      </p>

      <h2 id="h-what">What arrives by SMS</h2>
      <blockquote>Lumen: payment of ₦15,000 failed. Reply YES to retry.</blockquote>
      <p>
        The subscriber replies <strong>YES</strong>, and the retry fires against the stored card, the same action
        as tapping Retry Now on WhatsApp, just over a rail that works on any handset.
      </p>

      <h2 id="h-scope">One job, done reliably</h2>
      <p>
        Unlike WhatsApp&apos;s three inline actions, SMS carries one clear instruction, because the interaction
        model is more limited by design, a short reply-driven exchange, not a menu. A subscriber who needs to pause
        or downgrade rather than retry is directed to the customer portal or USSD instead of trying to cram those
        options into a text exchange.
      </p>

      <table>
        <tbody>
          <tr>
            <th>Message</th>
            <th>What it does</th>
          </tr>
          <tr>
            <td>Failed-charge alert</td>
            <td>Outbound. Prompts a reply of YES to retry.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">YES</code> reply
            </td>
            <td>Inbound. Triggers a retry against the stored card, same as WhatsApp&apos;s Retry Now.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="h-when">When SMS is the primary channel, not the fallback</h2>
      <p>
        For a subscriber with no WhatsApp presence, recovery orchestration goes straight to SMS as the first
        attempt, see <a href="/concepts/recovery-orchestration">Recovery orchestration</a> for exactly how that
        channel preference resolves.
      </p>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={3}>
        <CardLink
          href="/channels/email"
          icon="✉️"
          title="Email"
          description="The channel that fires no matter what happens here."
        />
        <CardLink
          href="/channels/ussd"
          icon="☎️"
          title="USSD"
          description="Full self-service, no data connection at all."
        />
        <CardLink
          href="/subscribers/when-a-payment-fails"
          icon="🔁"
          title="When a payment fails"
          description="The recovery flow, from the subscriber's side."
        />
      </CardGrid>
    </>
  );
}
