import { Callout } from "@/components/docs/content/callout";
import { CardGrid, Card, CardLink } from "@/components/docs/content/card-grid";
import type { PageMeta } from "@/lib/content/types";

export const meta: PageMeta = {
  eyebrow: "Get started",
  title: "The team",
  lede: "Built by people who'd already lost a weekend to a billing cron job before deciding to fix it properly.",
};

export default function TheTeam() {
  return (
    <>
      <p>
        The Nomba Subscription Engine started as an internal frustration, not a product brief. A small backend team
        kept getting pulled off feature work to patch the same recurring-billing gaps, a webhook that silently
        stopped firing, a customer who wanted to pause instead of cancel and had no way to do it, a Friday-night
        card decline nobody saw until Monday. Each fix was reasonable on its own. Together they were a second
        product nobody had budgeted for.
      </p>
      <p>
        So the team stopped patching and built the thing properly: a real subscription lifecycle instead of a
        status column, an event store instead of three different write paths for webhooks and analytics, and a
        recovery flow that reaches a customer on the channel they actually check instead of an email that sits
        unread.
      </p>

      <h2 id="h-builders">The builders</h2>
      <CardGrid cols={2}>
        <Card icon="🧭" title="Engineering lead">
          Owns the subscription lifecycle and the event store, the two pieces everything else is built on top of.
        </Card>
        <Card icon="💳" title="Payments engineer">
          Owns the Nomba integration, Checkout, Tokenised Cards, Charge, and Transfers, and the reconciliation logic
          that sits on top of it.
        </Card>
        <Card icon="🔁" title="Recovery & notifications engineer">
          Owns dunning: the retry schedule, the grace period, and the email/WhatsApp/SMS/USSD orchestration that
          decides who gets contacted, how, and when.
        </Card>
        <Card icon="📊" title="Platform engineer">
          Owns analytics, audit logging, and the webhook delivery pipeline, the parts merchants and integrators
          trust the platform on.
        </Card>
      </CardGrid>

      <h2 id="h-why">Why this exists</h2>
      <p>
        Most subscription tooling available to a Nigerian business is either a raw set of payment primitives,
        tokenised cards, a charge endpoint, that still leaves the billing logic, the recovery logic, and the
        reporting to be built from scratch, or a subscription platform built for a market where a customer is more
        reliably reached by email than by WhatsApp, SMS, or a USSD code. Neither fits a business collecting
        recurring naira payments from customers who live on their phones, not their inboxes.
      </p>
      <p>
        This platform is the version built for that reality: recurring billing that works the way payment behaviour
        actually works here, and recovery that reaches people on the rails they&apos;re already using.
      </p>

      <Callout variant="note">
        <p>
          This page is a placeholder for the real team, names, roles, and the actual story of why this got built.
          Replace it with the real thing.
        </p>
      </Callout>

      <h2 id="h-next">What to read next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/mission"
          icon="🎯"
          title="The mission"
          description="The objectives behind the build, and what's explicitly out of scope."
        />
        <CardLink href="/how-it-works" icon="🧭" title="How it works" description="The full arc, end to end." />
      </CardGrid>
    </>
  );
}
