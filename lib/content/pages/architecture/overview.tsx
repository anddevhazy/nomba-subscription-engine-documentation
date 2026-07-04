import { CardGrid, CardLink } from "@/components/docs/content/card-grid";
import { CodeBlock } from "@/components/docs/code-block";
import { Flow, FlowArrow, FlowNode } from "@/components/docs/content/flow";
import type { PageMeta } from "@/lib/content/types";

export const meta: PageMeta = {
  eyebrow: "Architecture",
  title: "Architecture",
  lede: "One NestJS API. Postgres for the ledger. Redis and BullMQ for everything that shouldn't block a response.",
};

export default function ArchitectureOverview() {
  return (
    <>
      <p>This is the altitude page, read it once, then drill into any chapter on the left.</p>

      <h2 id="h-stack">The stack</h2>
      <table>
        <tbody>
          <tr>
            <th>Layer</th>
            <th>Technology</th>
          </tr>
          <tr>
            <td>Framework</td>
            <td>NestJS 11, TypeScript</td>
          </tr>
          <tr>
            <td>Database</td>
            <td>PostgreSQL + TypeORM</td>
          </tr>
          <tr>
            <td>Queue / async jobs</td>
            <td>BullMQ + Redis</td>
          </tr>
          <tr>
            <td>Auth</td>
            <td>JWT, access + refresh tokens</td>
          </tr>
          <tr>
            <td>Payments</td>
            <td>Nomba API</td>
          </tr>
          <tr>
            <td>API docs</td>
            <td>
              Swagger, served at <code className="inline">/docs</code>
            </td>
          </tr>
        </tbody>
      </table>

      <h2 id="h-shape">The shape of the system</h2>
      <p>
        One NestJS process, organised into modules by domain, not a microservice mesh. A request comes in through a
        controller, runs through service-layer domain logic, and reads or writes through a repository. Anything
        that shouldn&apos;t block the response, a webhook delivery, a dunning retry, invoice generation, goes onto a
        BullMQ queue backed by Redis instead of running inline.
      </p>

      <Flow>
        <FlowNode>Merchant / Customer / Developer</FlowNode>
        <FlowArrow />
        <FlowNode variant="accent">NestJS API</FlowNode>
        <FlowArrow />
        <FlowNode>Postgres (TypeORM)</FlowNode>
      </Flow>
      <Flow>
        <FlowNode variant="accent">NestJS API</FlowNode>
        <FlowArrow />
        <FlowNode variant="accent2">BullMQ / Redis</FlowNode>
        <FlowArrow />
        <FlowNode>Webhook delivery · Dunning · Invoicing</FlowNode>
      </Flow>

      <h2 id="h-domain">The domain model</h2>

      <CodeBlock
        code={`merchants
  ├── users (role: owner | team_member)
  ├── api_keys
  ├── plans
  ├── customers
  │     ├── subscriptions
  │           ├── invoices → invoice_items
  │           └── payments → payment_attempts
  ├── transfers
  ├── webhooks → webhook_deliveries
  ├── audit_logs
  └── event_store`}
        language="text"
      />

      <p>
        Every business entity below <code className="inline">Merchant</code> carries a{" "}
        <code className="inline">merchantId</code> for tenant isolation, enforced at the data-access layer, not only
        in application code. See <a href="/architecture/modules">Modules</a> for what owns each part of this.
      </p>

      <h2 id="h-decisions">A few deliberate choices</h2>
      <table>
        <tbody>
          <tr>
            <th>Decision</th>
            <th>Why</th>
          </tr>
          <tr>
            <td>One NestJS monolith, not microservices</td>
            <td>
              Operational simplicity at this scale. Module boundaries give the same separation of concerns without
              the deployment overhead.
            </td>
          </tr>
          <tr>
            <td>Analytics as a read-model over the event store</td>
            <td>One data path means analytics and webhooks can never quietly drift apart from each other.</td>
          </tr>
          <tr>
            <td>Recovery orchestration as one centralized component</td>
            <td>
              Channel selection and fallback logic (email always, WhatsApp → SMS, USSD as pull) lives in one place,
              not duplicated at every call site that needs to notify a subscriber.
            </td>
          </tr>
          <tr>
            <td>BullMQ over inline processing for anything slow or external</td>
            <td>A webhook delivery or a WhatsApp send shouldn&apos;t hold open the request that triggered it.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="h-next">What to read next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/architecture/modules"
          icon="🧩"
          title="Modules"
          description="What each of the sixteen modules owns."
        />
        <CardLink
          href="/architecture/nomba-integration"
          icon="🔌"
          title="Nomba integration"
          description="The four payment surfaces this is built on."
        />
        <CardLink
          href="/architecture/data-flow"
          icon="🔄"
          title="Data flow"
          description="How one event reaches three consumers."
        />
        <CardLink
          href="/architecture/resilience"
          icon="🧱"
          title="Resilience & scale"
          description="Async by default, retried with backoff."
        />
      </CardGrid>
    </>
  );
}
