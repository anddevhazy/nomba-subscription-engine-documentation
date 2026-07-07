import { CardGrid, Card, CardLink } from "@/components/docs/content/card-grid";
import { CodeBlock } from "@/components/docs/code-block";
import type { PageMeta } from "@/lib/content/types";
import { BarChart3, Bell, Compass, FileText, RefreshCw, Repeat } from "lucide-react";

export const meta: PageMeta = {
  eyebrow: "Get started",
  title: "Quick start",
  lede: "Three ways to feel the engine in five minutes. Create a plan, break a payment on purpose, replay a webhook.",
};

export default function QuickStart() {
  return (
    <>
      <p>Pick one of these and go. Each takes about five minutes and shows a different side of the platform.</p>

      <CardGrid cols={1}>
        <Card icon={FileText} title="Create a plan and subscribe a test customer">
          <p>
            Sign up at the merchant dashboard, verify your email, and land in an empty plans screen. Create a plan,
            name, price, interval, optional trial, and grab your sandbox API key from Settings → API Keys.
          </p>
          <p>Then create a test customer and subscription against the sandbox:</p>
          <CodeBlock
            code={`curl -X POST https://api.nomba-subscriptions.com/subscriptions \\
  -H "Authorization: Bearer nse_sandbox_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "customerId": "cus_test_01",
    "planId": "plan_lumen_monthly",
    "paymentMethod": "tok_test_visa_4242"
  }'`}
            language="bash"
          />
          <p>
            You&apos;ll get back a subscription in <code className="inline">trialing</code> or{" "}
            <code className="inline">active</code> state, depending on whether the plan has a trial.
          </p>
        </Card>
      </CardGrid>

      <CardGrid cols={1}>
        <Card icon={Repeat} title="Break a payment on purpose and watch recovery fire">
          <p>
            Sandbox card tokens include one that always declines:{" "}
            <code className="inline">tok_test_visa_decline</code>. Subscribe a test customer with it, then trigger
            a billing cycle manually:
          </p>
          <CodeBlock
            code={`curl -X POST https://api.nomba-subscriptions.com/subscriptions/sub_test_01/charge-now \\
  -H "Authorization: Bearer nse_sandbox_..."`}
            language="bash"
          />
          <p>
            The subscription flips to <code className="inline">past_due</code>, a{" "}
            <code className="inline">PaymentFailed</code> event lands in the event store, and a recovery email
            fires within a minute regardless of what else is configured. If you&apos;ve also set a sandbox WhatsApp
            or SMS number on the test customer, those fire too. Reply, or hit the retry endpoint yourself, and watch
            the subscription return to <code className="inline">active</code>.
          </p>
        </Card>
      </CardGrid>

      <CardGrid cols={1}>
        <Card icon={Bell} title="Subscribe a webhook and pull analytics">
          <p>
            Point a webhook at a throwaway URL (<a href="https://webhook.site">webhook.site</a> works well for this)
            and subscribe to the events from the first two steps:
          </p>
          <CodeBlock
            code={`curl -X POST https://api.nomba-subscriptions.com/webhooks \\
  -H "Authorization: Bearer nse_sandbox_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://webhook.site/your-id",
    "events": ["invoice.paid", "payment.failed", "payment.recovered"]
  }'`}
            language="bash"
          />
          <p>Then fetch your merchant analytics snapshot:</p>
          <CodeBlock
            code={`curl https://api.nomba-subscriptions.com/analytics/metrics \\
  -H "Authorization: Bearer nse_sandbox_..."`}
            language="bash"
          />
          <p>
            You&apos;ll see MRR, churn, and recovery rate computed from the exact same event store your webhook just
            read from.
          </p>
        </Card>
      </CardGrid>

      <h2 id="h-next">What&apos;s next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/how-it-works"
          icon={Compass}
          title="How it works"
          description="The full arc, end to end, with the reasoning behind each step."
        />
        <CardLink
          href="/concepts/subscription-lifecycle"
          icon={RefreshCw}
          title="Subscription lifecycle"
          description="All eight states, and what moves a subscription between them."
        />
        <CardLink
          href="/developer/webhooks"
          icon={Bell}
          title="Webhooks"
          description="Every event type, payload shape, and signature verification."
        />
        <CardLink
          href="/merchants/analytics"
          icon={BarChart3}
          title="Analytics"
          description="MRR, churn, recovery rate, and where each number comes from."
        />
      </CardGrid>
    </>
  );
}
