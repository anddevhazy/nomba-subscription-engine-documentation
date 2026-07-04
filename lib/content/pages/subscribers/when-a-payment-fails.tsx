import { Callout } from "@/components/docs/content/callout";
import { CardGrid, CardLink } from "@/components/docs/content/card-grid";
import { Steps, Step } from "@/components/docs/content/steps";
import type { PageMeta } from "@/lib/content/types";

export const meta: PageMeta = {
  eyebrow: "For subscribers",
  title: "When a payment fails",
  lede: "A card fails. A message arrives on WhatsApp before you even notice. Here's the whole recovery path.",
};

export default function WhenAPaymentFails() {
  return (
    <>
      <p>
        Your card expired last week and you hadn&apos;t gotten around to updating it. On your next billing date, the
        charge fails quietly, you don&apos;t feel anything happen. What happens next is the part most billing
        systems get wrong, and the part this one is built around.
      </p>

      <h2 id="h-flow">What happens, in order</h2>
      <Steps>
        <Step number={1} title="The charge fails">
          <p>Your subscription enters a grace period, you&apos;re not cut off immediately.</p>
        </Step>
        <Step number={2} title="A message reaches you, fast">
          <p>
            Inside minutes, not days. An email lands every time, with the full detail and the same options as
            links. WhatsApp too, if you have it:{" "}
            <em>
              &quot;Your Lumen Monthly payment of ₦15,000 didn&apos;t go through. [Retry Now] [Pause Subscription]
              [Downgrade Plan].&quot;
            </em>
          </p>
        </Step>
        <Step number={3} title="You act, in one tap or one reply">
          <p>
            Tap <strong>Retry Now</strong> if your card is fine and it was a fluke. Update your card in the portal
            first if it&apos;s expired, then retry. No WhatsApp? Use the links in the email, or reply to the SMS:{" "}
            <em>&quot;Reply YES to retry.&quot;</em>
          </p>
        </Step>
        <Step number={4} title="It recovers">
          <p>
            The retried charge succeeds, your subscription returns to normal, and nothing about your access was ever
            silently revoked mid-conversation.
          </p>
        </Step>
      </Steps>

      <h2 id="h-options">Your three options on a failed charge</h2>
      <table>
        <tbody>
          <tr>
            <th>Option</th>
            <th>What it does</th>
          </tr>
          <tr>
            <td>
              <strong>Retry Now</strong>
            </td>
            <td>Attempts the same charge again immediately, the right choice if the card is fine and it was a temporary decline.</td>
          </tr>
          <tr>
            <td>
              <strong>Pause Subscription</strong>
            </td>
            <td>Stops billing without cancelling. Good if you need a break, not a card fix.</td>
          </tr>
          <tr>
            <td>
              <strong>Downgrade Plan</strong>
            </td>
            <td>Switches to a cheaper plan if the price, not the card, is the actual issue.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="h-noresponse">If you don&apos;t respond</h2>
      <p>
        The grace period gives you time. If it lapses without a successful retry, the subscription moves to{" "}
        <code className="inline">suspended</code> rather than being cancelled outright, you can still come back and
        fix it from the portal without starting over as a new signup. See{" "}
        <a href="/concepts/subscription-lifecycle">Subscription lifecycle</a> for the exact state progression.
      </p>

      <Callout variant="note">
        <p>
          You&apos;ll never be asked to reply with your full card number over email, WhatsApp, or SMS. Updating a
          card always happens through the portal&apos;s secure checkout, never a message.
        </p>
      </Callout>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/subscribers/manage-your-subscription"
          icon="⚙️"
          title="Manage your subscription"
          description="Update your card before the next cycle, and avoid this altogether."
        />
        <CardLink
          href="/concepts/recovery-orchestration"
          icon="🧭"
          title="Recovery orchestration"
          description="How the system decides which channel to try, and in what order."
        />
      </CardGrid>
    </>
  );
}
