import { Callout } from "@/components/docs/content/callout";
import { CardGrid, CardLink } from "@/components/docs/content/card-grid";
import type { PageMeta } from "@/lib/content/types";
import { Check, Plug } from "lucide-react";

export const meta: PageMeta = {
  eyebrow: "Security & trust",
  title: "Data & encryption posture",
  lede: "AES-256-GCM at rest for anything sensitive. What's encrypted, what isn't, and why.",
};

export default function DataProtection() {
  return (
    <>
      <p>
        Sensitive data, stored payment references chief among it, is encrypted at rest with AES-256-GCM. This page
        is what that covers, and, just as importantly, what it doesn&apos;t claim to cover.
      </p>

      <h2 id="h-what">What&apos;s encrypted</h2>
      <table>
        <tbody>
          <tr>
            <th>Data</th>
            <th>Protection</th>
          </tr>
          <tr>
            <td>Stored payment references (Nomba tokens)</td>
            <td>AES-256-GCM at rest.</td>
          </tr>
          <tr>
            <td>API key secrets</td>
            <td>Hashed, not encrypted, we never store or need the raw value back. A lookup match, not a decrypt.</td>
          </tr>
          <tr>
            <td>Webhook secrets</td>
            <td>Encrypted at rest; used only to sign outbound payloads.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="h-what-not">What&apos;s deliberately not covered by full KYC/identity encryption</h2>
      <p>
        This platform assumes customers are pre-verified via Nomba, it does not run its own KYC or
        identity-verification workflow, and consequently doesn&apos;t hold the kind of BVN/NIN-grade identity data
        that would require its own dedicated envelope-encryption scheme the way a lending or identity platform would.
        What it holds and protects is narrower and payments-specific: tokenised card references, not raw card
        numbers or identity documents.
      </p>

      <Callout variant="note">
        <p>
          This page reflects what the BRD commits to (NFR-4: sensitive data, including stored payment references,
          encrypted at rest). It intentionally doesn&apos;t claim a broader compliance posture, like a full NDPR
          rights workflow, that isn&apos;t in scope for this release. If that&apos;s needed, it belongs on this page
          as a deliberate addition, not an assumed one.
        </p>
      </Callout>

      <h2 id="h-transit">In transit</h2>
      <p>
        All API traffic, webhook deliveries, and dashboard/portal sessions run over TLS. Raw card numbers never
        transit our servers at all, they go directly from the customer&apos;s browser into Nomba&apos;s hosted
        Checkout session, tokenised before we ever see a reference to them.
      </p>

      <h2 id="h-access">Who can decrypt what</h2>
      <p>
        Decryption of a stored payment reference happens only at the point of initiating a charge or a refund, never
        surfaced in a list view, a report, or a support tool. There&apos;s no &quot;show me the token&quot; endpoint;
        the reference is used, not displayed.
      </p>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/security/webhook-verification"
          icon={Check}
          title="Webhook signature verification"
          description="The other half of the trust story, outbound, not at rest."
        />
        <CardLink
          href="/architecture/nomba-integration"
          icon={Plug}
          title="Nomba integration"
          description="Where the tokenised reference actually comes from."
        />
      </CardGrid>
    </>
  );
}
