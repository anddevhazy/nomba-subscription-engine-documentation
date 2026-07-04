import { Card, CardGrid, CardLink } from "@/components/docs/content/card-grid";
import type { PageMeta } from "@/lib/content/types";

export const meta: PageMeta = {
  eyebrow: "Channels",
  title: "Web",
  lede: "The API and docs site, the merchant dashboard, and the customer portal, three applications, one API underneath.",
};

export default function ChannelsWeb() {
  return (
    <>
      <p>
        Everything on this platform is reachable from a browser, split across three separate applications that all
        sit on top of the same API.
      </p>

      <h2 id="h-three">The three applications</h2>
      <CardGrid cols={3}>
        <Card icon="📘" title="API & docs">
          This site, plus the interactive Swagger reference at <code className="inline">/docs</code> on the API
          itself. For developers integrating the platform into their own product.
        </Card>
        <Card icon="🏬" title="Merchant dashboard">
          Plans, customers, invoices, analytics, webhooks, API keys, team management. Where a merchant runs the
          business day to day.
        </Card>
        <Card icon="🙋" title="Customer portal">
          Where a subscriber views and manages their own subscription, authenticated separately from the
          merchant&apos;s account.
        </Card>
      </CardGrid>

      <h2 id="h-auth">How sign-in differs across them</h2>
      <table>
        <tbody>
          <tr>
            <th>App</th>
            <th>Auth</th>
          </tr>
          <tr>
            <td>Merchant dashboard</td>
            <td>
              Email + password, JWT access and refresh tokens. Scoped to a merchant and a role (Owner or Team Member).
            </td>
          </tr>
          <tr>
            <td>Customer portal</td>
            <td>
              Phone or email plus a one-time code. Scoped to a single subscriber identity, with no path into merchant
              data.
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

      <h2 id="h-separation">Why the separation matters</h2>
      <p>
        A subscriber&apos;s login has nothing to do with a merchant&apos;s account, and can&apos;t reach merchant
        data even by accident, no shared session, no shared token type. This is what makes the customer portal a
        genuinely self-service surface rather than a &quot;customer view&quot; bolted onto the merchant dashboard
        with a different permission check.
      </p>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/merchants/overview"
          icon="🏬"
          title="For merchants"
          description="What the dashboard actually does."
        />
        <CardLink
          href="/subscribers/overview"
          icon="🙋"
          title="For subscribers"
          description="What the portal actually does."
        />
      </CardGrid>
    </>
  );
}
