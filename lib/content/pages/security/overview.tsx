import { CardGrid, CardLink } from "@/components/docs/content/card-grid";
import type { PageMeta } from "@/lib/content/types";
import { Check, KeyRound, Lock } from "lucide-react";

export const meta: PageMeta = {
  eyebrow: "Security & trust",
  title: "Security overview",
  lede: "The defence-in-depth posture across authentication, webhook signing, and data at rest.",
};

export default function SecurityOverview() {
  return (
    <>
      <p>Three layers, each assuming the one below it might be bypassed.</p>

      <h2 id="h-layers">The layers</h2>
      <CardGrid cols={3}>
        <CardLink
          href="/developer/authentication"
          icon={KeyRound}
          title="Authentication"
          description="Bearer keys, hashed at rest, scoped per merchant, rate-limited, revocable instantly."
        />
        <CardLink
          href="/security/webhook-verification"
          icon={Check}
          title="Webhook signing"
          description="Every outbound webhook is HMAC-signed. Every signature is independently verifiable by you."
        />
        <CardLink
          href="/security/data-protection"
          icon={Lock}
          title="Data at rest"
          description="Sensitive data, including stored payment references, is encrypted with AES-256-GCM."
        />
      </CardGrid>

      <h2 id="h-tenant">Tenant isolation</h2>
      <p>
        Every business resource, plans, customers, subscriptions, invoices, payments, webhooks, API keys, audit logs,
        carries a <code className="inline">merchantId</code>, enforced at the data-access layer, not only in
        application-level checks. A bug in a controller can&apos;t accidentally leak one merchant&apos;s data into
        another&apos;s response if the query itself is scoped before it ever reaches application logic.
      </p>

      <h2 id="h-idempotent">Idempotency as a security property, not just a reliability one</h2>
      <p>
        Idempotency keys on writes and stable event IDs on webhook replay mean a retried or replayed request can
        never be turned into a duplicate charge or a duplicate side effect, whether the retry was benign (a network
        blip) or adversarial (someone replaying a captured request).
      </p>

      <h2 id="h-audit">Everything material is audited</h2>
      <p>
        Plan changes, API key rotation, webhook configuration, and subscription overrides all write to a per-merchant
        audit log, attributed to the acting user. &quot;What changed, and who changed it&quot; has one answer,
        queryable from the dashboard.
      </p>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/security/webhook-verification"
          icon={Check}
          title="Webhook signature verification"
          description="The exact steps, in five languages."
        />
        <CardLink
          href="/security/data-protection"
          icon={Lock}
          title="Data & encryption posture"
          description="What's encrypted, and what deliberately isn't."
        />
      </CardGrid>
    </>
  );
}
