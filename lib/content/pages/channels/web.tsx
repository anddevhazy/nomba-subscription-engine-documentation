import { Card, CardGrid, CardLink } from "@/components/docs/content/card-grid";
import type { PageMeta } from "@/lib/content/types";
import { Activity, BookOpen, Store } from "lucide-react";

export const meta: PageMeta = {
  eyebrow: "Channels",
  title: "Web",
  lede: "The API and docs site, and the merchant dashboard, two applications, one API underneath. There's no separate subscriber-facing app yet.",
};

export default function ChannelsWeb() {
  return (
    <>
      <p>
        Everything on this platform today is reachable through two applications, both sitting on top of the same
        API.
      </p>

      <h2 id="h-two">The two applications</h2>
      <CardGrid cols={2}>
        <Card icon={BookOpen} title="API & docs">
          This site, plus the interactive Swagger reference at <code className="inline">/docs</code> on the API
          itself. For developers integrating the platform into their own product.
        </Card>
        <Card icon={Store} title="Merchant dashboard">
          Plans, customers, subscriptions, invoices, payments, analytics, webhooks, API keys, and audit logs.
          Where a merchant runs the business day to day.
        </Card>
      </CardGrid>

      <h2 id="h-no-portal">What&apos;s deliberately not here</h2>
      <p>
        There&apos;s no third, subscriber-facing web application. A subscriber&apos;s only touchpoint today is a
        single-use recovery link, redeemed through a minimal confirmation page, not a full account you can log
        into. See <a href="/concepts/recovery-orchestration">Recovery orchestration</a> for exactly what that link
        can and can&apos;t do.
      </p>

      <h2 id="h-auth">Sign-in</h2>
      <table>
        <tbody>
          <tr>
            <th>App</th>
            <th>Auth</th>
          </tr>
          <tr>
            <td>Merchant dashboard</td>
            <td>
              Email + password, JWT access and refresh tokens, scoped to a merchant. One user per merchant today,
              there&apos;s no additional role tier yet.
            </td>
          </tr>
          <tr>
            <td>API</td>
            <td>
              Bearer key, scoped to a merchant. See <a href="/developer/authentication">Authentication</a>.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 id="h-ops">Inside the dashboard: two operational surfaces worth knowing about</h2>
      <p>
        Beyond the day-to-day merchant pages, the dashboard also carries two engineering-facing views: a live
        event feed (<a href="/architecture/mission-control">Mission Control</a>) and an inbound-webhook debug
        console (<a href="/developer/service-info">Service info</a>). Neither is a separate application, both live
        behind the same dashboard login.
      </p>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/merchants/overview"
          icon={Store}
          title="For merchants"
          description="What the dashboard actually does."
        />
        <CardLink
          href="/architecture/mission-control"
          icon={Activity}
          title="Mission control"
          description="The live event feed underneath the dashboard's observability view."
        />
      </CardGrid>
    </>
  );
}
