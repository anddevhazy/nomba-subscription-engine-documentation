import { CardGrid, CardLink } from "@/components/docs/content/card-grid";
import type { PageMeta } from "@/lib/content/types";
import { Plug, RefreshCw } from "lucide-react";

export const meta: PageMeta = {
  eyebrow: "Architecture",
  title: "Modules",
  lede: "Sixteen modules, each owning one slice of the domain. What each one is responsible for, and who it talks to.",
};

export default function ArchitectureModules() {
  return (
    <>
      <p>
        This is a NestJS monolith organised into modules by domain, not a fleet of microservices. Module boundaries
        give the same separation of ownership a service boundary would, without the deployment and network
        overhead, every module runs in the same process, talking to its neighbours through TypeScript imports
        rather than HTTP.
      </p>

      <h2 id="h-table">What each module owns</h2>
      <table>
        <tbody>
          <tr>
            <th>Module</th>
            <th>Owns</th>
          </tr>
          <tr>
            <td>
              <code className="inline">auth</code>
            </td>
            <td>Signup, login, JWT access/refresh issuance and rotation.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">merchants</code>
            </td>
            <td>The merchant entity itself, the tenant root everything else scopes to.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">team</code>
            </td>
            <td>Owner/Team Member roles and membership management.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">api-keys</code>
            </td>
            <td>Live/test key issuance, rotation, revocation.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">plans</code>
            </td>
            <td>Pricing plan CRUD and deactivation.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">customers</code>
            </td>
            <td>Customer records, scoped per merchant.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">subscriptions</code>
            </td>
            <td>The lifecycle state machine, create, pause, resume, cancel, reactivate, change plan.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">billing</code>
            </td>
            <td>Invoice generation and proration math.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">invoices</code>
            </td>
            <td>Invoice queries and line-item detail.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">payments</code>
            </td>
            <td>Checkout, the Nomba integration, inbound webhooks, and transfers.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">dunning</code>
            </td>
            <td>Failed-payment retry logic and grace-period tracking.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">notifications</code>
            </td>
            <td>Email, SMS, WhatsApp, and USSD delivery, the channel layer recovery orchestration sits on top of.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">portal</code>
            </td>
            <td>Customer-facing self-service, separate auth, separate surface, same underlying subscription data.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">webhooks</code>
            </td>
            <td>Outbound event delivery, retry, dead-letter handling, and replay.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">events</code>
            </td>
            <td>The event store and its processor, the substrate every other module&apos;s history reads from.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">analytics</code>
            </td>
            <td>
              Merchant-facing metrics, computed as a read-model over <code className="inline">events</code>.
            </td>
          </tr>
          <tr>
            <td>
              <code className="inline">audit</code>
            </td>
            <td>Workspace action history, who did what, queryable per merchant.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="h-shared">Shared infrastructure</h2>
      <table>
        <tbody>
          <tr>
            <th>Module</th>
            <th>Owns</th>
          </tr>
          <tr>
            <td>
              <code className="inline">database</code>
            </td>
            <td>TypeORM configuration and migrations.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">shared</code>
            </td>
            <td>Enums and cross-cutting utilities used by more than one domain module.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="h-discipline">Why the boundary matters even in one process</h2>
      <p>
        A module doesn&apos;t reach into another module&apos;s repository directly, it goes through that
        module&apos;s service layer, the same discipline a network boundary would force. This is what keeps the
        option open to peel a module out into its own service later, without a rewrite, if a specific one
        (payments, most likely) ever needs to scale or deploy independently of the rest.
      </p>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/architecture/nomba-integration"
          icon={Plug}
          title="Nomba integration"
          description="A closer look at what the payments module actually wraps."
        />
        <CardLink
          href="/architecture/data-flow"
          icon={RefreshCw}
          title="Data flow"
          description="How events and webhooks connect across module boundaries."
        />
      </CardGrid>
    </>
  );
}
