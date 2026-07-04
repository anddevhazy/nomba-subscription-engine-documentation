import { CardGrid, CardLink } from "@/components/docs/content/card-grid";
import { CodeBlock } from "@/components/docs/code-block";
import type { PageMeta } from "@/lib/content/types";

export const meta: PageMeta = {
  eyebrow: "API reference",
  title: "API Reference",
  lede: "The formal reference for the Subscription Engine API. Authentication, resources, errors, webhooks.",
};

export default function ApiIntroduction() {
  return (
    <>
      <p>
        This section is the endpoint-level reference. For the narrative version of how the API fits together, start
        with <a href="/how-it-works">How it works</a> instead, come back here once you&apos;re ready to integrate.
      </p>

      <h2 id="h-base">Base URLs</h2>
      <table>
        <tbody>
          <tr>
            <th>Environment</th>
            <th>Base URL</th>
          </tr>
          <tr>
            <td>Sandbox</td>
            <td>
              <code className="inline">https://api.sandbox.nomba-subscriptions.com</code>
            </td>
          </tr>
          <tr>
            <td>Production</td>
            <td>
              <code className="inline">https://api.nomba-subscriptions.com</code>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        An interactive Swagger reference is also served directly from the API at <code className="inline">/docs</code>{" "}
        on either environment, useful for trying a request without leaving your browser.
      </p>

      <h2 id="h-format">Response format</h2>
      <p>Successful responses are wrapped consistently:</p>

      <CodeBlock
        language="json"
        code={`{
  "status": "success",
  "message": "Request successful",
  "data": {}
}`}
      />

      <p>
        Paginated list endpoints return <code className="inline">{"{ data: [], total: number }"}</code> inside{" "}
        <code className="inline">data</code>.
      </p>

      <h2 id="h-resources">Core resources</h2>
      <table>
        <tbody>
          <tr>
            <th>Resource</th>
            <th>Endpoints</th>
          </tr>
          <tr>
            <td>Plans</td>
            <td>
              <code className="inline">POST/GET/PATCH/DELETE /plans</code>
            </td>
          </tr>
          <tr>
            <td>Customers</td>
            <td>
              <code className="inline">POST/GET/PATCH /customers</code>
            </td>
          </tr>
          <tr>
            <td>Subscriptions</td>
            <td>
              <code className="inline">POST/GET /subscriptions</code>, plus lifecycle actions on{" "}
              <code className="inline">/subscriptions/:id</code>
            </td>
          </tr>
          <tr>
            <td>Invoices</td>
            <td>
              <code className="inline">GET /invoices</code>, <code className="inline">GET /invoices/:id</code>
            </td>
          </tr>
          <tr>
            <td>Payments</td>
            <td>
              <code className="inline">POST /payments/checkout</code>, <code className="inline">GET /payments</code>
            </td>
          </tr>
          <tr>
            <td>Webhooks</td>
            <td>
              <code className="inline">POST/GET /webhooks</code>,{" "}
              <code className="inline">GET /webhooks/:id/deliveries</code>
            </td>
          </tr>
          <tr>
            <td>Analytics</td>
            <td>
              <code className="inline">GET /analytics/*</code>, see{" "}
              <a href="/merchants/analytics">Analytics</a>
            </td>
          </tr>
        </tbody>
      </table>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/api-reference/authentication"
          icon="🔐"
          title="Authentication"
          description="Bearer tokens and environment scoping."
        />
        <CardLink
          href="/api-reference/errors"
          icon="⚠️"
          title="Errors"
          description="Status codes and error codes."
        />
      </CardGrid>
    </>
  );
}
