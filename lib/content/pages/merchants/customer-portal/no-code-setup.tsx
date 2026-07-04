import { CardGrid, CardLink } from "@/components/docs/content/card-grid";
import { Steps, Step } from "@/components/docs/content/steps";
import type { PageMeta } from "@/lib/content/types";

export const meta: PageMeta = {
  eyebrow: "Customer portal",
  title: "Create a customer portal",
  lede: "There's nothing to activate. Here's what you actually configure, in the Dashboard, without writing a line of code.",
};

export default function NoCodeSetup() {
  return (
    <>
      <p>
        Unlike a lot of what&apos;s in these docs, this page isn&apos;t a setup
        flow, because there isn&apos;t one. The moment you create your first
        subscription, that customer already has a portal to log into. What you
        do in the Dashboard isn&apos;t turning the portal on, it&apos;s deciding
        what it&apos;s allowed to do.
      </p>

      <h2 id="h-steps">What you actually do</h2>
      <Steps>
        <Step number={1} title="Nothing, at first">
          <p>
            Portal access exists the moment a customer record exists.
            There&apos;s no toggle to flip and no link to generate before this
            works.
          </p>
        </Step>
        <Step number={2} title="Decide what's exposed">
          <p>
            Dashboard → Settings → Customer portal. Toggle plan switching,
            cancellation, and reason capture on or off. See{" "}
            <a href="/merchants/customer-portal/configure">
              Configure the customer portal
            </a>{" "}
            for every option.
          </p>
        </Step>
        <Step number={3} title="Point subscribers at it">
          <p>
            The portal lives at a fixed URL for every merchant on the platform.
            Subscribers log in with the phone or email they signed up with, plus
            a one-time code. Or skip login entirely and send a scoped deep link
            straight into one action, see{" "}
            <a href="/merchants/customer-portal/deep-links-and-flows">
              Deep links and flows
            </a>
            .
          </p>
        </Step>
      </Steps>

      <h2 id="h-security">What the login can&apos;t do</h2>
      <p>
        Signing in gets a subscriber into their own subscription and nothing
        else, scoped strictly to the customer identity the phone or email
        resolves to. A few deliberate limits:
      </p>
      <ul>
        <li>
          A subscriber can&apos;t change the email or phone number their account
          is registered under from inside the portal. That&apos;s an identity
          change, not a billing change, and it stays outside self-serve.
        </li>
        <li>
          If the one-time code doesn&apos;t arrive, the most common cause is a
          phone or email that doesn&apos;t match an existing customer record
          exactly, check the customer&apos;s record in your Dashboard before
          assuming it&apos;s a delivery problem.
        </li>
        <li>
          A portal session recognises one customer. There&apos;s no concept of a
          subscriber managing multiple merchants&apos; subscriptions from a
          single login, each merchant relationship is its own identity.
        </li>
      </ul>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/merchants/customer-portal/configure"
          icon="🎛️"
          title="Configure the customer portal"
          description="Every toggle, what it does, and its default."
        />
        <CardLink
          href="/merchants/customer-portal/api-setup"
          icon="💻"
          title="Set up with the API"
          description="For generating portal links and listening to webhooks programmatically."
        />
      </CardGrid>
    </>
  );
}
