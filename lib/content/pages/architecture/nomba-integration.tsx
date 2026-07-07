import { CardGrid, CardLink } from "@/components/docs/content/card-grid";
import { Mermaid } from "@/components/docs/content/mermaid";
import type { PageMeta } from "@/lib/content/types";
import { CreditCard, Lock } from "lucide-react";

export const meta: PageMeta = {
  eyebrow: "Architecture",
  title: "Nomba integration",
  lede: "Checkout, Tokenised Cards, Charge, Transfers. The four Nomba surfaces this engine is built on.",
};

export default function NombaIntegration() {
  return (
    <>
      <p>
        Every naira that moves through this platform moves through Nomba. The{" "}
        <code className="inline">payments</code> module is the only place that talks to Nomba directly, nothing
        else in the codebase holds a Nomba credential or constructs a Nomba request.
      </p>

      <h2 id="h-surfaces">The four surfaces</h2>
      <table>
        <tbody>
          <tr>
            <th>Surface</th>
            <th>Used for</th>
          </tr>
          <tr>
            <td>
              <strong>Checkout API</strong>
            </td>
            <td>Initial card tokenisation at subscription signup, and portal-driven payment-method updates.</td>
          </tr>
          <tr>
            <td>
              <strong>Tokenised Cards</strong>
            </td>
            <td>The stored reference reused for every recurring charge, never the raw card number.</td>
          </tr>
          <tr>
            <td>
              <strong>Charge API</strong>
            </td>
            <td>Executes every billing-cycle charge attempt and every dunning retry.</td>
          </tr>
          <tr>
            <td>
              <strong>Transfers API</strong>
            </td>
            <td>Payout-side handling for platform fee splits, where applicable.</td>
          </tr>
        </tbody>
      </table>

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
