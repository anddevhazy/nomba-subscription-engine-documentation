import { CardGrid, CardLink } from "@/components/docs/content/card-grid";
import { Flow, FlowArrow, FlowNode } from "@/components/docs/content/flow";
import type { PageMeta } from "@/lib/content/types";

export const meta: PageMeta = {
  eyebrow: "Architecture",
  title: "Data flow",
  lede: "How a single event, a payment failing, a subscription renewing, reaches webhooks, notifications, and analytics without three separate write paths.",
};

export default function DataFlow() {
  return (
    <>
      <p>
        This is the engineering-level companion to <a href="/concepts/event-store">The event store</a>, same idea,
        closer to the code.
      </p>

      <h2 id="h-path">One write, three reads</h2>
      <Flow>
        <FlowNode variant="accent">
          Domain action
          <br />
          (e.g. charge fails)
        </FlowNode>
        <FlowArrow />
        <FlowNode variant="accent2">Event written to event store</FlowNode>
      </Flow>
      <Flow>
        <FlowNode variant="accent2">Event store</FlowNode>
        <FlowArrow />
        <FlowNode>
          webhooks module
          <br />
          (delivers to subscribers)
        </FlowNode>
      </Flow>
      <Flow>
        <FlowNode variant="accent2">Event store</FlowNode>
        <FlowArrow />
        <FlowNode>
          dunning module
          <br />
          (triggers recovery orchestration)
        </FlowNode>
      </Flow>
      <Flow>
        <FlowNode variant="accent2">Event store</FlowNode>
        <FlowArrow />
        <FlowNode>
          analytics module
          <br />
          (read-model aggregation)
        </FlowNode>
      </Flow>

      <h2 id="h-why-one">Why this isn&apos;t three separate write paths</h2>
      <p>
        The tempting shortcut is to have the subscriptions module call the notifications module directly on a
        failure, and separately increment an analytics counter, and separately queue a webhook. Three call sites,
        three chances for one of them to be missed on a future code change. Writing one event and letting three
        independent consumers read it means adding a fourth consumer later, a data warehouse export, say,
        doesn&apos;t require touching the subscriptions module at all.
      </p>

      <h2 id="h-processor">The event processor</h2>
      <p>
        The <code className="inline">events</code> module&apos;s processor is what turns a written event into
        action for its consumers, it&apos;s the dispatcher, not the event store itself. It runs asynchronously via
        BullMQ (see <a href="/architecture/queues-and-async">Queues & async processing</a>), so writing an event
        and reacting to it are decoupled: a slow webhook delivery never blocks the request that triggered the
        underlying domain action.
      </p>

      <h2 id="h-consistency">What this buys, concretely</h2>
      <ul>
        <li>
          A merchant&apos;s analytics dashboard and their webhook stream can never disagree about whether an event
          happened, they&apos;re reading the same rows.
        </li>
        <li>Adding a new webhook event type is a subscription change, not a new write path.</li>
        <li>
          Replaying a webhook (<a href="/developer/webhooks">Webhooks</a>) is just re-running the dispatch step
          against an already-durable event, nothing about the underlying fact is reconstructed or guessed at.
        </li>
      </ul>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/concepts/event-store"
          icon="📒"
          title="The event store"
          description="The conceptual version of this page."
        />
        <CardLink
          href="/architecture/queues-and-async"
          icon="🗂️"
          title="Queues & async processing"
          description="How the dispatch step actually runs."
        />
      </CardGrid>
    </>
  );
}
