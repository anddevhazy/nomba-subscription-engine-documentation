import { CardGrid, CardLink } from "@/components/docs/content/card-grid";
import { CodeBlock } from "@/components/docs/code-block";
import { Steps, Step } from "@/components/docs/content/steps";
import type { PageMeta } from "@/lib/content/types";
import { AlertTriangle, Bell } from "lucide-react";

export const meta: PageMeta = {
  eyebrow: "Developer",
  title: "Authentication",
  lede: "Live and test keys per merchant. Bearer auth, rotation, and what happens the moment a request lands.",
};

export default function DeveloperAuthentication() {
  return (
    <>
      <p>
        Authentication is a bearer token, scoped to a single merchant. Pass it in the{" "}
        <code className="inline">Authorization</code> header on every request:
      </p>

      <CodeBlock
        code={`curl https://api.nomba-subscriptions.com/subscriptions \\
  -H "Authorization: Bearer nse_live_01HKBZ..."`}
        language="bash"
      />

      <h2 id="h-format">Key format</h2>
      <table>
        <tbody>
          <tr>
            <th>Prefix</th>
            <th>Environment</th>
          </tr>
          <tr>
            <td>
              <code className="inline">nse_sandbox_&lt;id&gt;</code>
            </td>
            <td>Sandbox, no real charges ever fire.</td>
          </tr>
          <tr>
            <td>
              <code className="inline">nse_live_&lt;id&gt;</code>
            </td>
            <td>Production.</td>
          </tr>
        </tbody>
      </table>
      <p>
        A sandbox key against a production endpoint (or vice versa) fails with 401, there&apos;s no accidental
        cross-environment traffic.
      </p>

      <h2 id="h-getting">Getting a key</h2>
      <p>
        Dashboard → Settings → API Keys, once your merchant account is verified. The full secret is shown exactly
        once at creation.
      </p>

      <h2 id="h-order">What happens when a request arrives</h2>
      <Steps>
        <Step number={1} title="Extract the bearer token">
          <p>
            Missing → <code className="inline">401 missing_auth</code>.
          </p>
        </Step>
        <Step number={2} title="Hash and look up">
          <p>
            We store a hash of the secret, never the raw value. No match → <code className="inline">401 invalid_auth</code>.
          </p>
        </Step>
        <Step number={3} title="Status check">
          <p>Revoked or expired keys fail here.</p>
        </Step>
        <Step number={4} title="Rate limit">
          <p>
            Per-key token bucket. Exceeded → <code className="inline">429 rate_limited</code>. See{" "}
            <a href="/developer/rate-limits">Rate limits</a>.
          </p>
        </Step>
        <Step number={5} title="Execute, scoped to your merchantId">
          <p>
            Every resource you can read or write is scoped to your own merchant account, tenant isolation is
            enforced at this layer, not just in application logic.
          </p>
        </Step>
      </Steps>

      <h2 id="h-rotate">Rotating a key</h2>
      <p>
        Generate a new key, roll it out to your services, confirm the old key&apos;s usage has dropped to zero, then
        revoke it. If a key leaks, revoke it immediately and generate a fresh one, there&apos;s no
        &quot;un-revoke.&quot;
      </p>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/developer/webhooks"
          icon={Bell}
          title="Webhooks"
          description="What to subscribe to once you're authenticated."
        />
        <CardLink
          href="/api-reference/errors"
          icon={AlertTriangle}
          title="Errors"
          description="Every auth-related error code, explained."
        />
      </CardGrid>
    </>
  );
}
