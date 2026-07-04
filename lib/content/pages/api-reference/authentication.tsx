import { CardGrid, CardLink } from "@/components/docs/content/card-grid";
import { CodeBlock } from "@/components/docs/code-block";
import type { PageMeta } from "@/lib/content/types";

export const meta: PageMeta = {
  eyebrow: "API reference",
  title: "Authentication",
  lede: "Bearer tokens, scoped to a merchant. Live and test environments, never crossed.",
};

export default function ApiAuthentication() {
  return (
    <>
      <p>
        This is the reference-level version of <a href="/developer/authentication">Authentication</a>, same
        mechanism, formatted for lookup rather than a first read.
      </p>

      <h2 id="h-header">Required header</h2>
      <CodeBlock language="text" code={`Authorization: Bearer nse_live_01HKBZ...`} />

      <h2 id="h-envs">Environments</h2>
      <table>
        <tbody>
          <tr>
            <th>Prefix</th>
            <th>Base URL it&apos;s valid against</th>
          </tr>
          <tr>
            <td>
              <code className="inline">nse_sandbox_*</code>
            </td>
            <td>
              <code className="inline">api.sandbox.nomba-subscriptions.com</code>
            </td>
          </tr>
          <tr>
            <td>
              <code className="inline">nse_live_*</code>
            </td>
            <td>
              <code className="inline">api.nomba-subscriptions.com</code>
            </td>
          </tr>
        </tbody>
      </table>

      <h2 id="h-errors">Auth-specific error codes</h2>
      <table>
        <tbody>
          <tr>
            <th>HTTP</th>
            <th>Code</th>
            <th>Meaning</th>
          </tr>
          <tr>
            <td>401</td>
            <td>
              <code className="inline">missing_auth</code>
            </td>
            <td>
              No <code className="inline">Authorization</code> header present.
            </td>
          </tr>
          <tr>
            <td>401</td>
            <td>
              <code className="inline">invalid_auth</code>
            </td>
            <td>Key not recognised, revoked, or expired.</td>
          </tr>
          <tr>
            <td>401</td>
            <td>
              <code className="inline">environment_mismatch</code>
            </td>
            <td>Sandbox key against a production URL, or the reverse.</td>
          </tr>
          <tr>
            <td>429</td>
            <td>
              <code className="inline">rate_limited</code>
            </td>
            <td>
              See <a href="/developer/rate-limits">Rate limits</a>.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/developer/authentication"
          icon="🔑"
          title="Authentication (guide)"
          description="The narrative walkthrough, including key rotation."
        />
        <CardLink
          href="/api-reference/errors"
          icon="⚠️"
          title="Errors"
          description="Every error code across the API, not just auth."
        />
      </CardGrid>
    </>
  );
}
