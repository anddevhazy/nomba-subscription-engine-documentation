import { Callout } from "@/components/docs/content/callout";
import { CardGrid, Card, CardLink } from "@/components/docs/content/card-grid";
import type { PageMeta } from "@/lib/content/types";

export const meta: PageMeta = {
  eyebrow: "For subscribers",
  title: "Manage your subscription",
  lede: "Everything you can do from the portal, and why it doesn't touch the merchant's dashboard to do it.",
};

export default function ManageYourSubscription() {
  return (
    <>
      <p>
        The customer portal is authenticated separately from the merchant&apos;s dashboard, your login has nothing
        to do with the merchant&apos;s account, and nothing you do here requires them to act on it. That separation
        is deliberate: a subscription is yours to manage, not a request you file with someone else.
      </p>

      <h2 id="h-actions">What you can do</h2>
      <CardGrid cols={2}>
        <Card icon="👀" title="View your subscription">
          Current plan, price, next billing date, and payment history.
        </Card>
        <Card icon="⏸️" title="Pause">
          Stop billing without cancelling outright. Resume whenever you&apos;re ready.
        </Card>
        <Card icon="▶️" title="Resume">
          Billing picks back up on your original cycle date.
        </Card>
        <Card icon="✋" title="Cancel">
          Ends the subscription. What happens to the current billing period depends on the merchant&apos;s
          cancellation policy.
        </Card>
      </CardGrid>
      <CardGrid cols={1}>
        <Card icon="💳" title="Update your payment method">
          Your card expired, or you just want to switch which one gets charged. The new card is tokenised the same
          way as at signup, the portal never sees or stores the raw card number.
        </Card>
      </CardGrid>

      <h2 id="h-signin">Signing in</h2>
      <p>
        Phone or email plus a one-time code, no separate password to lose. The portal recognises you by the identity
        the merchant registered you under at signup.
      </p>

      <h2 id="h-pause-vs-cancel">Pause vs. cancel</h2>
      <p>
        Pausing is the better move if you just don&apos;t need the service this month but expect to come back, no
        re-onboarding, no re-entering a card, billing resumes exactly where it left off. Cancelling ends things
        properly; if you change your mind later, you subscribe again as a new signup.
      </p>

      <Callout variant="tip">
        <p>
          If the only reason you&apos;re thinking about cancelling is a failed payment you haven&apos;t gotten
          around to fixing, updating your payment method is usually the faster path back to normal, see{" "}
          <a href="/subscribers/when-a-payment-fails">When a payment fails</a>.
        </p>
      </Callout>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/subscribers/when-a-payment-fails"
          icon="🔁"
          title="When a payment fails"
          description="The recovery flow, from your side."
        />
        <CardLink
          href="/channels/ussd"
          icon="☎️"
          title="USSD"
          description="Manage your subscription without a data connection."
        />
      </CardGrid>
    </>
  );
}
