import { CardGrid, CardLink } from "@/components/docs/content/card-grid";
import { Steps, Step } from "@/components/docs/content/steps";
import type { PageMeta } from "@/lib/content/types";
import { FolderOpen, Mail, MessageCircle } from "lucide-react";

export const meta: PageMeta = {
  eyebrow: "Core concepts",
  title: "Recovery orchestration",
  lede: "One component decides which channel reaches a customer first, and what to do when that channel doesn't answer.",
};

export default function RecoveryOrchestration() {
  return (
    <>
      <p>
        Every channel, email, WhatsApp, SMS, USSD, has its own provider, its own delivery quirks, and its own
        failure modes. Without a single place that owns the decision of &quot;who gets contacted, how, and in what
        order,&quot; that logic ends up duplicated across every place a failed payment needs to trigger a message.
        Recovery orchestration is that single place.
      </p>

      <h2 id="h-why-centralized">Why this is centralized, not per-channel</h2>
      <p>
        As recovery channels scale, and email, WhatsApp, SMS, and USSD are unlikely to be the last four, duplicating
        fallback logic across each integration point is exactly the kind of thing that quietly rots. One component
        owning channel selection and fallback means adding a fifth channel later is a change in one place, not a hunt
        across the codebase for every spot that assumed there were four.
      </p>

      <h2 id="h-decision">The decision, step by step</h2>
      <Steps>
        <Step number={1} title="A PaymentFailed event lands">
          <p>Recovery orchestration picks it up from the event store the moment it&apos;s written.</p>
        </Step>
        <Step number={2} title="Email always sends">
          <p>
            The durable baseline. Every subscriber has an address on file from checkout, so this fires on every
            recovery attempt regardless of what else does.
          </p>
        </Step>
        <Step number={3} title="The subscriber's push-channel preference resolves">
          <p>
            WhatsApp if they&apos;re reachable there; SMS otherwise. USSD stays available as a subscriber-initiated
            pull regardless.
          </p>
        </Step>
        <Step number={4} title="A recovery message fires">
          <p>
            Retry Now / Pause Subscription / Downgrade Plan as inline actions on WhatsApp, or as links in the email;
            a reply-YES-to-retry prompt on SMS. The buttons and links are scoped portal links under the hood, the
            same primitive documented in{" "}
            <a href="/merchants/customer-portal/deep-links-and-flows">Deep links and flows</a>, which any merchant
            can also generate directly, not just this component.
          </p>
        </Step>
        <Step number={5} title="If WhatsApp delivery fails or goes unanswered">
          <p>
            The same message falls back to SMS automatically. Email has already gone out in parallel either way, so
            recovery never depends on a single channel being read.
          </p>
        </Step>
        <Step number={6} title="The outcome is logged as a channel event">
          <p>
            Which channel recovered the subscriber, and what action they took, feeds directly into recovery-rate
            reporting broken down by channel.
          </p>
        </Step>
      </Steps>

      <h2 id="h-degrade">Degrading gracefully</h2>
      <p>
        If WhatsApp, SMS, or the email provider is unreachable, a provider outage, not a subscriber issue, the
        affected notification jobs are queued and retried rather than failing silently. A merchant should never lose
        a recovery attempt because a third-party provider had a bad hour; the job comes back and tries again.
      </p>

      <h2 id="h-reporting">What this feeds</h2>
      <p>
        Every recovery attempt, channel used, action taken, outcome, rolls up into the dunning metrics on a
        merchant&apos;s analytics: past-due volume, grace-period volume, recovery rate, and a breakdown by channel
        showing which one is actually converting for a given customer base.
      </p>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={3}>
        <CardLink
          href="/channels/email"
          icon={Mail}
          title="Email"
          description="The always-on baseline, in detail."
        />
        <CardLink
          href="/channels/whatsapp"
          icon={MessageCircle}
          title="WhatsApp"
          description="The primary push channel, in detail."
        />
        <CardLink
          href="/architecture/queues-and-async"
          icon={FolderOpen}
          title="Queues & async processing"
          description="How retries and fallbacks are actually scheduled."
        />
      </CardGrid>
    </>
  );
}
