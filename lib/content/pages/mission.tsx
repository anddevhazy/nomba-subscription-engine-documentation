import { CardGrid, Card, CardLink } from "@/components/docs/content/card-grid";
import type { PageMeta } from "@/lib/content/types";

export const meta: PageMeta = {
  eyebrow: "Get started",
  title: "The mission",
  lede: "The Nomba Hackathon, Infrastructure Track: Subscriptions Engine. How this platform maps to the brief.",
};

export default function Mission() {
  return (
    <>
      <p>
        This page exists so anyone evaluating this submission for the Nomba Hackathon can verify the alignment in
        two minutes.
      </p>

      <h2 id="h-track">The track</h2>
      <p>
        Two track categories, five focus areas. This submission targets the Infrastructure Track, under the focus
        area named, precisely, <strong>Subscriptions Engine</strong>.
      </p>

      <blockquote>
        Build a managed recurring-billing layer on top of Nomba&apos;s checkout and tokenised-card primitives for
        downstream product teams.
      </blockquote>

      <p>And the stated reason it&apos;s on the catalogue at all:</p>

      <blockquote>
        Nomba exposes payment primitives but does not ship a managed subscriptions layer, so teams repeatedly
        rebuild this capability from scratch.
      </blockquote>

      <p>
        That&apos;s the whole thesis. A Checkout API and a Charge API are primitives, not a product. Every team that
        wants recurring billing on Nomba rails currently has to invent a subscription state machine, a proration
        formula, a dunning sequence, and a self-service portal on their own, and most of them get the unhappy paths
        wrong the first time because nobody budgets real time for a card that fails on a Friday. This is the layer
        that means the next team doesn&apos;t have to.
      </p>

      <h2 id="h-must-include">The six things the brief requires</h2>
      <p>
        The Infrastructure Track listing is specific about what &quot;managed recurring-billing layer&quot; has to
        include. Each one is a real, working surface in this submission today.
      </p>

      <CardGrid cols={2}>
        <Card icon="📝" title="Plan management">
          <p>
            Name, price, interval, and optional trial, created through the API or the merchant dashboard, live the
            moment they&apos;re submitted. See <a href="/merchants/create-a-plan">Create a plan</a>.
          </p>
        </Card>
        <Card icon="🔄" title="Billing cycles">
          <p>
            Monthly, quarterly, yearly, and custom intervals, with trial support built into the subscription
            lifecycle rather than bolted on as a flag. See{" "}
            <a href="/concepts/subscription-lifecycle">Subscription lifecycle</a>.
          </p>
        </Card>
        <Card icon="➗" title="Proration">
          <p>
            A mid-cycle upgrade credits the unused portion of the old plan and charges the prorated remainder of the
            new one, in the same motion. See <a href="/merchants/billing-and-invoicing">Billing &amp; invoicing</a>.
          </p>
        </Card>
        <Card icon="🔁" title="Dunning & failed-payment recovery">
          <p>
            A failed charge starts a recovery sequence on email, WhatsApp, SMS, and USSD within minutes, not a daily
            batch job that catches it a day late. See{" "}
            <a href="/concepts/recovery-orchestration">Recovery orchestration</a>.
          </p>
        </Card>
        <Card icon="🙋" title="Customer self-service portal">
          <p>
            View, pause, resume, cancel, and update a payment method, authenticated separately from the
            merchant&apos;s own account. See{" "}
            <a href="/subscribers/manage-your-subscription">Manage your subscription</a>.
          </p>
        </Card>
        <Card icon="🔔" title="Webhooks for downstream systems">
          <p>
            Every domain event, signed, retried with backoff, dead-lettered on exhaustion, and replayable by
            subscription ID or time range. See <a href="/developer/webhooks">Webhooks</a>.
          </p>
        </Card>
      </CardGrid>

      <h2 id="h-key-apis">The Nomba primitives underneath</h2>
      <p>
        The brief names four Nomba surfaces as the foundation. All four are wired in, and none of them are used
        decoratively.
      </p>

      <table>
        <thead>
          <tr>
            <th>API</th>
            <th>What it does in this system</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Checkout API</td>
            <td>
              Hosted card entry at subscription signup, and at every payment-method update from the portal. The raw
              card number never touches our servers.
            </td>
          </tr>
          <tr>
            <td>Tokenised cards</td>
            <td>
              The stored reference reused for every billing-cycle charge and every dunning retry, so a subscriber
              enters a card once and never again unless it changes.
            </td>
          </tr>
          <tr>
            <td>Charge API</td>
            <td>
              Executes every recurring charge attempt. Its outcome, confirmed by webhook, is what drives the
              subscription state machine forward or into recovery.
            </td>
          </tr>
          <tr>
            <td>Transfers API</td>
            <td>Payout-side handling for platform fee splits, where a merchant&apos;s plan calls for one.</td>
          </tr>
        </tbody>
      </table>

      <p>
        Full detail: <a href="/architecture/nomba-integration">Nomba integration</a>.
      </p>

      <h2 id="h-judged-on">How we address each judging criterion</h2>
      <p>The catalogue names four things this track is judged on. Here&apos;s where each one lives.</p>

      <CardGrid cols={2}>
        <Card icon="🧭" title="State-machine completeness">
          <p>
            Eight explicit states, not a boolean and a hope: pending, trialing, active, past_due, grace_period,
            suspended, cancelled, expired. Every transition writes an immutable domain event rather than being
            inferred after the fact from a pile of payment rows. See{" "}
            <a href="/concepts/subscription-lifecycle">Subscription lifecycle</a>.
          </p>
        </Card>
        <Card icon="🔁" title="Dunning sophistication">
          <p>
            Not a single retry-and-forget email. A centralized recovery-orchestration component sends email as the
            always-on baseline, reaches for WhatsApp first when a phone&apos;s on file with three inline actions,
            falls back to SMS automatically, keeps USSD available regardless, and degrades gracefully, queuing and
            retrying rather than dropping a notification, if a provider has an outage. See{" "}
            <a href="/concepts/recovery-orchestration">Recovery orchestration</a>.
          </p>
        </Card>
        <Card icon="🏢" title="Multi-tenant cleanliness">
          <p>
            Every business entity below the merchant carries a merchantId, enforced at the data-access layer, not
            only in application-level checks. Owner and Team Member roles keep account-level actions, API keys,
            webhook configuration, team membership, separate from day-to-day operations. See{" "}
            <a href="/architecture/overview">Architecture</a>.
          </p>
        </Card>
        <Card icon="🧩" title="API ergonomics for downstream developers">
          <p>
            A documented resource model, signed and replayable webhooks, idempotency keys on writes, and an
            interactive Swagger reference served straight from the API. A developer should be able to integrate from
            documentation alone. See <a href="/developer/webhooks">Webhooks</a> and{" "}
            <a href="/api-reference/introduction">API Reference</a>.
          </p>
        </Card>
      </CardGrid>

      <h2 id="h-unhappy-paths">Where the unhappy paths actually live</h2>
      <p>
        The Checkout, Recurring build track (the sibling track for merchant-facing subscription products built on
        top of a layer like this one) is explicit that judging weighs &quot;unhappy-path depth: card decline,
        insufficient funds, expired card, pause or cancel handling, not only the happy path.&quot; That bar applies
        just as much to the infrastructure underneath it, arguably more, since every unhandled edge case here
        becomes every downstream team&apos;s bug.
      </p>

      <table>
        <thead>
          <tr>
            <th>Unhappy path</th>
            <th>How it&apos;s handled</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Card decline on a billing cycle</td>
            <td>
              Subscription moves to <code className="inline">past_due</code>, a grace period starts, recovery fires
              within minutes. See <a href="/how-it-works">How it works</a>.
            </td>
          </tr>
          <tr>
            <td>Expired card nobody noticed</td>
            <td>
              The most common real-world failure mode, and the reason WhatsApp recovery leads with Retry Now, Pause,
              and Downgrade rather than a bare &quot;payment failed&quot; notice. See{" "}
              <a href="/subscribers/when-a-payment-fails">When a payment fails</a>.
            </td>
          </tr>
          <tr>
            <td>Grace period lapses with no recovery</td>
            <td>
              Subscription moves to <code className="inline">suspended</code>, not straight to cancelled, so a
              subscriber can still self-serve their way back without re-onboarding as a new signup.
            </td>
          </tr>
          <tr>
            <td>A merchant&apos;s webhook endpoint is down</td>
            <td>
              Deliveries retry with backoff for up to fourteen days, then dead-letter, then replay on demand once the
              endpoint is fixed. See <a href="/developer/webhooks">Webhooks</a>.
            </td>
          </tr>
          <tr>
            <td>A subscriber wants to pause, not cancel</td>
            <td>
              A first-class action in the portal, on WhatsApp, and over USSD, not a support ticket. See{" "}
              <a href="/subscribers/manage-your-subscription">Manage your subscription</a>.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 id="h-scale">How it scales</h2>
      <p>
        The build was meant to just prove a concept in a weekend. But this one is infact ready for national and
        continental scale.
      </p>

      <table>
        <thead>
          <tr>
            <th>Concern</th>
            <th>How this is positioned for it</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>More merchants, more subscribers</td>
            <td>
              Tenant isolation is enforced at the data-access layer, not bolted on with an application-side filter
              that a future query could forget. Onboarding a new merchant is a signup, not a schema change.
            </td>
          </tr>
          <tr>
            <td>More events, more webhooks, more notifications</td>
            <td>
              Nothing in the recovery or delivery path runs inline on a request. BullMQ on Redis carries every
              webhook delivery, every dunning retry, every notification send, so throughput scales by adding
              workers, not by the API getting slower under load. See{" "}
              <a href="/architecture/queues-and-async">Queues &amp; async processing</a>.
            </td>
          </tr>
          <tr>
            <td>A provider outage</td>
            <td>
              Email, WhatsApp, SMS, and Nomba itself can all have a bad hour without a lost recovery attempt or a
              lost charge, jobs queue and retry instead of failing silently. See{" "}
              <a href="/architecture/resilience">Resilience &amp; scale</a>.
            </td>
          </tr>
          <tr>
            <td>A second consumer of the same data</td>
            <td>
              Analytics, notifications, and webhooks all read the same event store rather than three separately
              maintained paths that can quietly drift from each other. Adding a fourth consumer later is a
              subscription, not a rewrite. See <a href="/concepts/event-store">The event store</a>.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 id="h-commitments">Three commitments the brief implicitly assumes</h2>
      <p>
        The brief mentions a recurring-billing layer that sits on top of somebody else&apos;s money and somebody
        else&apos;s customer relationship. We took that personal.
      </p>

      <table>
        <thead>
          <tr>
            <th>Commitment</th>
            <th>What it means here</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Every webhook we send is provably ours.</td>
            <td>
              HMAC-SHA256 signatures on every delivery, verifiable independently by the receiving service, with
              replay protection on the timestamp. See{" "}
              <a href="/security/webhook-verification">Webhook signature verification</a>.
            </td>
          </tr>
          <tr>
            <td>A retried or replayed request never becomes a duplicate charge.</td>
            <td>
              Idempotency keys on writes, stable event IDs on replay. Reprocessing is always safe by construction,
              not by convention.
            </td>
          </tr>
          <tr>
            <td>Sensitive data is encrypted, and access to it is narrow.</td>
            <td>
              Stored payment references are encrypted at rest with AES-256-GCM, and there&apos;s no endpoint or
              dashboard view that surfaces a raw reference, only the ability to use it. See{" "}
              <a href="/security/data-protection">Data &amp; encryption posture</a>.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 id="h-next">What to read next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/introduction"
          icon="🚪"
          title="Introduction"
          description="Adaeze's story. The thesis. The four channels."
        />
        <CardLink
          href="/how-it-works"
          icon="🧭"
          title="How it works"
          description="A merchant creates a plan. A customer subscribes. A charge fails. Recovery closes the loop."
        />
        <CardLink
          href="/architecture/overview"
          icon="🏗️"
          title="Architecture"
          description="The stack, the module boundaries, the deliberate choices."
        />
        <CardLink
          href="/developer/webhooks"
          icon="🔔"
          title="Webhooks"
          description="The API ergonomics story, for the downstream developer reading this."
        />
      </CardGrid>
    </>
  );
}
