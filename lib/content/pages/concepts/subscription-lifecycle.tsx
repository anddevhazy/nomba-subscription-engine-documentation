import { CardGrid, Card, CardLink } from "@/components/docs/content/card-grid";
import { Flow, FlowNode, FlowArrow } from "@/components/docs/content/flow";
import type { PageMeta } from "@/lib/content/types";

export const meta: PageMeta = {
  eyebrow: "Core concepts",
  title: "Subscription lifecycle",
  lede: "Eight states. One state machine. Why past_due and grace_period are different states, not the same failure twice.",
};

export default function SubscriptionLifecycle() {
  return (
    <>
      <p>
        A subscription isn&apos;t just &quot;active&quot; or &quot;not active.&quot; It moves through a defined
        state machine, and every transition is explicit, nothing about a subscription&apos;s status is inferred
        after the fact from a pile of payment records. This page is the whole machine.
      </p>

      <h2 id="h-states">The eight states</h2>
      <Flow>
        <FlowNode variant="accent">pending</FlowNode>
        <FlowArrow />
        <FlowNode>trialing</FlowNode>
        <FlowArrow />
        <FlowNode variant="accent2">active</FlowNode>
        <FlowArrow />
        <FlowNode>past_due</FlowNode>
        <FlowArrow />
        <FlowNode>grace_period</FlowNode>
        <FlowArrow />
        <FlowNode>suspended</FlowNode>
      </Flow>
      <p className="body-secondary">
        Plus two terminal states reachable from most points in the flow: <code className="inline">cancelled</code>{" "}
        (subscriber or merchant ends it) and <code className="inline">expired</code> (a fixed-term subscription runs
        its course).
      </p>

      <table>
        <tbody>
          <tr>
            <th>State</th>
            <th>What it means</th>
          </tr>
          <tr>
            <td>
              <code className="inline">pending</code>
            </td>
            <td>Created, not yet activated, usually waiting on card tokenisation to complete.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">trialing</code>
            </td>
            <td>Inside the plan&apos;s trial window. No charge has fired yet.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">active</code>
            </td>
            <td>Billing normally. The healthy state.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">past_due</code>
            </td>
            <td>A charge just failed. The clock on the grace period starts here.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">grace_period</code>
            </td>
            <td>Recovery is actively in progress, messages have gone out, retries are expected.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">suspended</code>
            </td>
            <td>The grace period lapsed without recovery. Access is paused, but the subscription record and history are intact.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">cancelled</code>
            </td>
            <td>Ended, by the subscriber or the merchant. Terminal.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">expired</code>
            </td>
            <td>A fixed-term subscription reached its natural end. Terminal.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="h-why-split">Why past_due and grace_period are separate states</h2>
      <p>
        It would be simpler to collapse these into one &quot;payment failed&quot; state. They&apos;re kept separate
        because they mean different things to a merchant reading the dashboard: <code className="inline">past_due</code>{" "}
        is a fact (a charge failed), <code className="inline">grace_period</code> is a process (recovery is actively
        running, with a defined end). A merchant scanning for subscriptions that need manual attention wants to see
        the ones where recovery has stalled, not every subscription that&apos;s ever had a single failed charge.
      </p>

      <h2 id="h-transitions">What triggers each transition</h2>
      <CardGrid cols={2}>
        <Card icon="✅" title="trialing → active">
          Trial window ends and the first charge succeeds.
        </Card>
        <Card icon="❌" title="active → past_due">
          A billing-cycle charge attempt fails.
        </Card>
        <Card icon="🔁" title="past_due → grace_period">
          Recovery orchestration picks up the failure and starts sending recovery messages.
        </Card>
        <Card icon="🔄" title="grace_period → active">
          A retried charge succeeds, recovery worked.
        </Card>
        <Card icon="⛔" title="grace_period → suspended">
          The grace period lapses with no successful retry.
        </Card>
        <Card icon="🚪" title="any → cancelled">
          Subscriber cancels from the portal, or a merchant cancels on their behalf.
        </Card>
      </CardGrid>

      <h2 id="h-events">Every transition is an event</h2>
      <p>
        Each state change writes a domain event to the <a href="/concepts/event-store">event store</a>,{" "}
        <code className="inline">SubscriptionCreated</code>, <code className="inline">SubscriptionUpdated</code>,{" "}
        <code className="inline">SubscriptionRenewed</code>, <code className="inline">SubscriptionCancelled</code>,{" "}
        <code className="inline">PaymentFailed</code>, <code className="inline">PaymentRecovered</code>. This is
        what lets webhooks, notifications, and analytics all react to the same state change without needing to poll
        the subscription record for a diff.
      </p>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/concepts/event-store"
          icon="📒"
          title="The event store"
          description="Where every one of these transitions actually lands."
        />
        <CardLink
          href="/concepts/recovery-orchestration"
          icon="🧭"
          title="Recovery orchestration"
          description="What happens during grace_period, specifically."
        />
      </CardGrid>
    </>
  );
}
