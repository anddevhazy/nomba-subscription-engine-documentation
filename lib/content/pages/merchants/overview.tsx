import { CardGrid, CardLink } from "@/components/docs/content/card-grid";
import type { PageMeta } from "@/lib/content/types";

export const meta: PageMeta = {
  eyebrow: "For merchants",
  title: "For merchants",
  lede: "Stop building billing logic in-house. Plans, customers, invoices, recovery, and analytics, one API, one dashboard.",
};

export default function MerchantsOverview() {
  return (
    <>
      <p>
        Adaeze&apos;s first version of Lumen&apos;s billing was a cron job and a spreadsheet. It worked until it
        didn&apos;t, a card would fail silently, a member would want to pause instead of cancel and have no way to
        ask for that, and every month-end she&apos;d manually add up payments in a separate tab to guess at revenue.
        None of that is a Lumen-specific problem. It&apos;s what happens when recurring billing is treated as a
        feature instead of a system.
      </p>
      <p>Here&apos;s what you can actually do.</p>

      <CardGrid cols={2}>
        <CardLink
          href="/merchants/create-a-plan"
          icon="📝"
          title="Create a plan"
          description="Name, price, interval, monthly, quarterly, yearly, or custom, with optional trial support."
        />
        <CardLink
          href="/merchants/onboard-and-collect-payment"
          icon="💳"
          title="Onboard a customer"
          description="Tokenise a card once via Nomba Checkout. Charge it automatically on every billing cycle after."
        />
        <CardLink
          href="/merchants/billing-and-invoicing"
          icon="🧾"
          title="Billing & invoicing"
          description="Invoices generate themselves. Proration handles upgrades and downgrades mid-cycle."
        />
        <CardLink
          href="/merchants/team-and-roles"
          icon="🔐"
          title="Team & roles"
          description="Bring on a Team Member for day-to-day support without handing over API keys."
        />
        <CardLink
          href="/merchants/analytics"
          icon="📊"
          title="Analytics"
          description="MRR, churn, recovery rate, and plan performance, computed on demand, always current."
        />
        <CardLink
          href="/merchants/customer-portal/overview"
          icon="🚪"
          title="Customer portal"
          description="Let subscribers manage themselves. Setup, configuration, deep links, and cancellation, in one subsection."
        />
      </CardGrid>

      <h2 id="h-why">Why this works</h2>
      <p>
        <strong>One: your subscribers manage themselves.</strong> Pause, cancel, resume, update a card, all from the
        customer portal, authenticated separately from your merchant account. None of it lands in your support queue
        unless something&apos;s genuinely gone wrong.
      </p>
      <p>
        <strong>Two: a failed payment isn&apos;t a lost customer by default.</strong> The moment a charge fails,
        recovery starts on whichever channel actually reaches that subscriber, email always, plus WhatsApp, SMS, or
        USSD, inside the grace period, not after someone happens to check a report.
      </p>

      <h2 id="h-surfaces">Where you work</h2>
      <table>
        <tr>
          <th>Surface</th>
          <th>What you do there</th>
        </tr>
        <tr>
          <td>
            <strong>Merchant dashboard</strong>
          </td>
          <td>Create plans, manage customers, watch analytics, configure webhooks, rotate API keys, manage your team.</td>
        </tr>
        <tr>
          <td>
            <strong>API</strong>
          </td>
          <td>Everything the dashboard does, programmatically, for merchants embedding subscription management into their own product.</td>
        </tr>
        <tr>
          <td>
            <strong>Audit log</strong>
          </td>
          <td>Every material action, plan changes, API key rotation, webhook configuration, recorded and queryable.</td>
        </tr>
      </table>

      <h2 id="h-start">Where to start</h2>
      <p>
        If you&apos;re new, start with <a href="/merchants/create-a-plan">Create a plan</a>. If you already have
        plans and want to know how money actually moves, go to{" "}
        <a href="/merchants/billing-and-invoicing">Billing & invoicing</a>.
      </p>
    </>
  );
}
