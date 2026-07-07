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
            name, price, interval, optional trial, and grab your test API key from API Keys.
          </p>
          <p>Then create a test customer and subscription against your test key:</p>
          <CodeBlock
            code={`curl -X POST https://api.nomba-subscriptions.com/subscriptions \\
  -H "Authorization: Bearer nsub_test_..." \\
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
        <Card icon={Repeat} title="Force a decline and watch the failure notice fire">
          <p>
            Nomba&apos;s test rails include a card that always declines. Subscribe a test customer with it and let
            the first charge attempt fail.
          </p>
          <p>
            The subscription flips to <code className="inline">past_due</code>, a{" "}
            <code className="inline">PaymentFailed</code> event lands in the event store, and an email fires within
            a minute, whatever else is configured. If you&apos;ve also set a test WhatsApp or SMS number on the
            customer, those send too, over a real Twilio call. What doesn&apos;t happen instantly is the retry
            itself: dunning runs on a fixed schedule, 24 hours, 72 hours, then 7 days, so recovery in this
            walkthrough means watching the notification arrive, not watching the subscription flip back to{" "}
            <code className="inline">active</code> inside your five minutes. See{" "}
            <a href="/concepts/recovery-orchestration">Recovery orchestration</a> for exactly what&apos;s live on
            each channel today.
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
  -H "Authorization: Bearer nsub_test_..." \\
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
  -H "Authorization: Bearer nsub_test_..."`}
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
