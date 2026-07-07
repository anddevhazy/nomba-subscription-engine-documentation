import { Callout } from "@/components/docs/content/callout";
import { CardGrid, CardLink } from "@/components/docs/content/card-grid";
import { Mermaid } from "@/components/docs/content/mermaid";
import type { PageMeta } from "@/lib/content/types";
import { CreditCard, Lock } from "lucide-react";

export const meta: PageMeta = {
  eyebrow: "Architecture",
  title: "Nomba integration",
  lede: "Token issuance, Checkout, and Tokenised-card Charge. The three Nomba surfaces this engine is actually built on.",
};

export default function NombaIntegration() {
  return (
    <>
      <p>
        Every naira that moves through this platform moves through Nomba. The{" "}
        <code className="inline">payments</code> module is the only place that talks to Nomba directly, nothing
        else in the codebase holds a Nomba credential or constructs a Nomba request.
      </p>

      <h2 id="h-surfaces">The three surfaces</h2>
      <table>
        <tbody>
          <tr>
            <th>Surface</th>
            <th>Used for</th>
          </tr>
          <tr>
            <td>
              <strong>Auth token issuance</strong>
            </td>
            <td>
              <code className="inline">POST /v1/auth/token/issue</code>, client-credentials exchange, cached for
              an hour with a five-minute refresh buffer.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Checkout</strong>
            </td>
            <td>
              <code className="inline">POST /v1/checkout/order</code>. Initial card tokenisation at subscription
              signup, requested with <code className="inline">tokenizeCard: true</code>.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Tokenised-card Charge</strong>
            </td>
            <td>
              <code className="inline">POST /v1/tokenized-card/charge</code>. Executes every billing-cycle charge
              attempt and every dunning retry against the stored card reference.
            </td>
          </tr>
        </tbody>
      </table>
      <p className="body-secondary">
        There&apos;s no Transfers/payout surface wired up today, whatever platform-fee or payout handling exists
        outside this integration isn&apos;t part of it yet.
      </p>

      <Callout variant="note">
        <p>
          If Nomba credentials aren&apos;t configured for an environment, both Checkout and Charge simulate a
          response rather than failing outright, a fake checkout link, or a charge outcome with roughly an 85%
          simulated success rate. Useful for demos and local development, worth ruling out first if a charge
          behaves oddly in a non-production environment.
        </p>
      </Callout>

      <h2 id="h-inbound">Inbound webhooks from Nomba</h2>
      <p>
        Nomba&apos;s own payment events land on <code className="inline">POST /webhooks/nomba</code> and trigger
        internal state transitions, a settled charge, a failed charge, a completed transfer, each of which is what
        actually writes the corresponding domain event to the{" "}
        <a href="/concepts/event-store">event store</a>. The billing engine doesn&apos;t guess at payment outcomes
        from a synchronous API response alone; it waits for and verifies the authoritative webhook.
      </p>

      <h2 id="h-shape">The shape of a charge attempt</h2>
      <Mermaid
        chart={`flowchart LR
    A["Billing cycle fires"]:::accent --> B["Charge API call"] --> C["Nomba webhook confirms outcome"] --> D["Event written · subscription updated"]:::accent2

    classDef accent fill:#c9971f,stroke:#8a6416,color:#ffffff,font-weight:600;
    classDef accent2 fill:#1e9a5a,stroke:#166e42,color:#ffffff,font-weight:600;
`}
      />

      <h2 id="h-why-webhook">Why the webhook is authoritative, not the initial response</h2>
      <p>
        A synchronous response from a charge API can be pending, ambiguous, or lost to a network blip on the way
        back. Treating Nomba&apos;s webhook, signed, and independently verifiable, as the source of truth for
        whether a charge actually succeeded is what keeps the subscription state machine honest even when a
        request/response pair doesn&apos;t complete cleanly.
      </p>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/merchants/onboard-and-collect-payment"
          icon={CreditCard}
          title="Onboard a customer"
          description="Checkout and tokenisation, from the merchant's side."
        />
        <CardLink
          href="/security/data-protection"
          icon={Lock}
          title="Data & encryption posture"
          description="How stored payment references are protected."
        />
      </CardGrid>
    </>
  );
}
