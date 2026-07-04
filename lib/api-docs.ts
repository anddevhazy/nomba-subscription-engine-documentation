import { SWAGGER_URL } from "./constants";

export type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

export type ApiEndpointDoc = {
  method: HttpMethod;
  path: string;
  description: string;
  auth: "public" | "jwt" | "hmac";
  requestBody?: Record<string, unknown>;
  requestSchema?: {
    field: string;
    type: string;
    required?: boolean;
    description?: string;
  }[];
  queryParams?: { field: string; type: string; description?: string }[];
  exampleRequest?: string;
  exampleResponse: string;
  swaggerPath?: string;
};

export type ApiTagGroup = {
  tag: string;
  slug: string;
  description: string;
  endpoints: ApiEndpointDoc[];
};

const envelope = (data: unknown, message = "Operation successful") =>
  JSON.stringify({ status: "success", data, message }, null, 2);

export const apiTagGroups: ApiTagGroup[] = [
  {
    tag: "Auth",
    slug: "auth",
    description:
      "Merchant authentication via JWT. Access tokens expire in 15 minutes; use refresh tokens to obtain new credentials.",
    endpoints: [
      {
        method: "POST",
        path: "/auth/signup",
        description: "Register a new merchant account and receive JWT tokens.",
        auth: "public",
        requestSchema: [
          { field: "businessName", type: "string", required: true },
          { field: "email", type: "string", required: true },
          {
            field: "password",
            type: "string",
            required: true,
            description: "Min 8 characters",
          },
          { field: "firstName", type: "string" },
          { field: "lastName", type: "string" },
          { field: "phone", type: "string" },
        ],
        exampleRequest: `{
  "businessName": "Acme SaaS Ltd",
  "email": "founder@acme.ng",
  "password": "securePass123",
  "firstName": "Ada",
  "lastName": "Okafor"
}`,
        exampleResponse: envelope({
          user: {
            id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
            email: "founder@acme.ng",
            merchantId: "m1e2r3c4-h5a6-7890-merc-hant12345678",
            firstName: "Ada",
            lastName: "Okafor",
          },
          tokens: {
            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            expiresIn: 900,
          },
        }),
        swaggerPath: `${SWAGGER_URL}#/Auth/AuthController_signup`,
      },
      {
        method: "POST",
        path: "/auth/login",
        description: "Authenticate with email and password.",
        auth: "public",
        requestSchema: [
          { field: "email", type: "string", required: true },
          { field: "password", type: "string", required: true },
        ],
        exampleRequest: `{
  "email": "founder@acme.ng",
  "password": "securePass123"
}`,
        exampleResponse: envelope({
          user: {
            id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
            email: "founder@acme.ng",
            merchantId: "m1e2r3c4-h5a6-7890-merc-hant12345678",
          },
          tokens: {
            accessToken: "eyJhbG...",
            refreshToken: "eyJhbG...",
            expiresIn: 900,
          },
        }),
        swaggerPath: `${SWAGGER_URL}#/Auth/AuthController_login`,
      },
      {
        method: "POST",
        path: "/auth/refresh",
        description: "Exchange a refresh token for a new access token pair.",
        auth: "public",
        requestSchema: [
          { field: "refreshToken", type: "string", required: true },
        ],
        exampleRequest: `{ "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }`,
        exampleResponse: envelope({
          user: {
            id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
            email: "founder@acme.ng",
            merchantId: "m1e2r3c4-h5a6-7890-merc-hant12345678",
          },
          tokens: {
            accessToken: "eyJhbG...",
            refreshToken: "eyJhbG...",
            expiresIn: 900,
          },
        }),
      },
    ],
  },
  {
    tag: "API Keys",
    slug: "api-keys",
    description:
      "Programmatic access keys for server-to-server integrations. Keys use the format nsub_live_ or nsub_test_ prefixes.",
    endpoints: [
      {
        method: "POST",
        path: "/api-keys",
        description: "Create a new API key. The raw key is only returned once.",
        auth: "jwt",
        requestSchema: [
          {
            field: "environment",
            type: "enum",
            required: true,
            description: "live | test",
          },
          { field: "name", type: "string", description: "Friendly label" },
        ],
        exampleRequest: `{ "environment": "test", "name": "Production Backend" }`,
        exampleResponse: envelope({
          apiKey: {
            id: "k1e2y3i4-d5e6-7890-key1-234567890abc",
            prefix: "nsub_test_",
            lastFour: "9c2e",
            environment: "test",
            name: "Production Backend",
            isActive: true,
          },
          rawKey: "nsub_test_sk_live_demo_7f3a9c2e1b8d4f6a",
        }),
      },
      {
        method: "GET",
        path: "/api-keys",
        description: "List all API keys for the merchant.",
        auth: "jwt",
        exampleResponse: envelope([
          {
            id: "k1e2y3i4-d5e6-7890-key1-234567890abc",
            prefix: "nsub_test_",
            lastFour: "9c2e",
            environment: "test",
            name: "Production Backend",
            isActive: true,
            createdAt: "2026-07-01T10:00:00.000Z",
          },
        ]),
      },
      {
        method: "DELETE",
        path: "/api-keys/:id",
        description: "Revoke an API key immediately.",
        auth: "jwt",
        exampleResponse: envelope({
          id: "k1e2y3i4-d5e6-7890-key1-234567890abc",
          isActive: false,
          revokedAt: "2026-07-02T14:30:00.000Z",
        }),
      },
      {
        method: "POST",
        path: "/api-keys/:id/rotate",
        description: "Revoke the current key and issue a new one atomically.",
        auth: "jwt",
        exampleResponse: envelope({
          apiKey: {
            id: "k2e3y4i5-d6e7-8901-key2-345678901bcd",
            prefix: "nsub_test_",
            lastFour: "4f6a",
          },
          rawKey: "nsub_test_sk_new_rotated_key_8b1d4e7f",
        }),
      },
    ],
  },
  {
    tag: "Plans",
    slug: "plans",
    description:
      "Define recurring billing plans with intervals, trial periods, and pricing.",
    endpoints: [
      {
        method: "POST",
        path: "/plans",
        description: "Create a new subscription plan.",
        auth: "jwt",
        requestSchema: [
          { field: "name", type: "string", required: true },
          { field: "description", type: "string" },
          {
            field: "amount",
            type: "number",
            required: true,
            description: "Amount in major currency units",
          },
          { field: "currency", type: "string", description: "Default: NGN" },
          {
            field: "interval",
            type: "enum",
            required: true,
            description: "monthly | quarterly | yearly | custom",
          },
          { field: "trialDays", type: "number", description: "Default: 0" },
          {
            field: "customIntervalDays",
            type: "number",
            description: "Required when interval is custom",
          },
        ],
        exampleRequest: `{
  "name": "Pro Plan",
  "description": "Full access to all features",
  "amount": 15000,
  "currency": "NGN",
  "interval": "monthly",
  "trialDays": 14
}`,
        exampleResponse: envelope({
          id: "p1l2a3n4-d5e6-7890-plan-123456789abc",
          name: "Pro Plan",
          amount: "15000.00",
          currency: "NGN",
          interval: "monthly",
          trialDays: 14,
          isActive: true,
        }),
      },
      {
        method: "GET",
        path: "/plans",
        description: "List plans with pagination.",
        auth: "jwt",
        queryParams: [
          { field: "page", type: "number", description: "Default: 1" },
          {
            field: "limit",
            type: "number",
            description: "Default: 20, max: 100",
          },
        ],
        exampleResponse: envelope({
          data: [
            {
              id: "p1l2a3n4-d5e6-7890-plan-123456789abc",
              name: "Pro Plan",
              amount: "15000.00",
              interval: "monthly",
            },
          ],
          total: 1,
          page: 1,
          limit: 20,
        }),
      },
      {
        method: "GET",
        path: "/plans/:id",
        description: "Retrieve a single plan by ID.",
        auth: "jwt",
        exampleResponse: envelope({
          id: "p1l2a3n4-d5e6-7890-plan-123456789abc",
          name: "Pro Plan",
          amount: "15000.00",
          currency: "NGN",
          interval: "monthly",
          trialDays: 14,
          isActive: true,
        }),
      },
      {
        method: "PATCH",
        path: "/plans/:id",
        description: "Update plan details. Partial updates supported.",
        auth: "jwt",
        exampleRequest: `{ "amount": 18000, "description": "Updated pricing" }`,
        exampleResponse: envelope({
          id: "p1l2a3n4-d5e6-7890-plan-123456789abc",
          name: "Pro Plan",
          amount: "18000.00",
        }),
      },
      {
        method: "DELETE",
        path: "/plans/:id",
        description:
          "Soft-deactivate a plan. Existing subscriptions are unaffected.",
        auth: "jwt",
        exampleResponse: envelope({
          id: "p1l2a3n4-d5e6-7890-plan-123456789abc",
          isActive: false,
        }),
      },
    ],
  },
  {
    tag: "Customers",
    slug: "customers",
    description: "Manage end-customers who subscribe to your plans.",
    endpoints: [
      {
        method: "POST",
        path: "/customers",
        description: "Create a new customer record.",
        auth: "jwt",
        requestSchema: [
          { field: "name", type: "string", required: true },
          { field: "email", type: "string", required: true },
          { field: "phone", type: "string" },
          { field: "metadata", type: "object" },
        ],
        exampleRequest: `{
  "name": "Chidi Nwosu",
  "email": "chidi@example.com",
  "phone": "+2348012345678",
  "metadata": { "company": "Nwosu Ventures" }
}`,
        exampleResponse: envelope({
          id: "c1u2s3t4-d5e6-7890-cust-123456789abc",
          name: "Chidi Nwosu",
          email: "chidi@example.com",
          phone: "+2348012345678",
          metadata: { company: "Nwosu Ventures" },
        }),
      },
      {
        method: "GET",
        path: "/customers",
        description: "List customers with pagination.",
        auth: "jwt",
        queryParams: [
          { field: "page", type: "number" },
          { field: "limit", type: "number" },
        ],
        exampleResponse: envelope({
          data: [
            {
              id: "c1u2s3t4-d5e6-7890-cust-123456789abc",
              name: "Chidi Nwosu",
              email: "chidi@example.com",
            },
          ],
          total: 1,
          page: 1,
          limit: 20,
        }),
      },
      {
        method: "GET",
        path: "/customers/:id",
        description: "Retrieve a customer by ID.",
        auth: "jwt",
        exampleResponse: envelope({
          id: "c1u2s3t4-d5e6-7890-cust-123456789abc",
          name: "Chidi Nwosu",
          email: "chidi@example.com",
        }),
      },
      {
        method: "PATCH",
        path: "/customers/:id",
        description: "Update customer details.",
        auth: "jwt",
        exampleRequest: `{ "phone": "+2348098765432" }`,
        exampleResponse: envelope({
          id: "c1u2s3t4-d5e6-7890-cust-123456789abc",
          phone: "+2348098765432",
        }),
      },
    ],
  },
  {
    tag: "Subscriptions",
    slug: "subscriptions",
    description:
      "Create and manage recurring subscriptions. Creating a subscription returns a Nomba checkout URL for the initial payment.",
    endpoints: [
      {
        method: "POST",
        path: "/subscriptions",
        description:
          "Create a subscription and initiate Nomba checkout for the first invoice.",
        auth: "jwt",
        requestSchema: [
          { field: "customerId", type: "uuid", required: true },
          { field: "planId", type: "uuid", required: true },
          { field: "callbackUrl", type: "url", required: true },
          { field: "metadata", type: "object" },
        ],
        exampleRequest: `{
  "customerId": "c1u2s3t4-d5e6-7890-cust-123456789abc",
  "planId": "p1l2a3n4-d5e6-7890-plan-123456789abc",
  "callbackUrl": "https://acme.ng/billing/callback",
  "metadata": { "source": "onboarding" }
}`,
        exampleResponse: envelope({
          subscription: {
            id: "s1u2b3s4-d5e6-7890-subs-123456789abc",
            status: "pending",
            customerId: "c1u2s3t4-d5e6-7890-cust-123456789abc",
            planId: "p1l2a3n4-d5e6-7890-plan-123456789abc",
          },
          checkoutUrl: "https://checkout.nomba.com/pay/abc123",
          paymentId: "pay_789xyz",
          invoiceId: "inv_456def",
        }),
      },
      {
        method: "GET",
        path: "/subscriptions",
        description: "List all subscriptions with customer and plan relations.",
        auth: "jwt",
        exampleResponse: envelope([
          {
            id: "s1u2b3s4-d5e6-7890-subs-123456789abc",
            status: "active",
            customer: { name: "Chidi Nwosu" },
            plan: { name: "Pro Plan" },
          },
        ]),
      },
      {
        method: "GET",
        path: "/subscriptions/:id",
        description: "Get subscription details by ID.",
        auth: "jwt",
        exampleResponse: envelope({
          id: "s1u2b3s4-d5e6-7890-subs-123456789abc",
          status: "active",
          currentPeriodStart: "2026-07-01T00:00:00.000Z",
          currentPeriodEnd: "2026-08-01T00:00:00.000Z",
        }),
      },
      {
        method: "POST",
        path: "/subscriptions/:id/pause",
        description: "Pause an active subscription. Sets status to suspended.",
        auth: "jwt",
        exampleResponse: envelope({
          id: "s1u2b3s4-d5e6-7890-subs-123456789abc",
          status: "suspended",
          pausedAt: "2026-07-15T10:00:00.000Z",
        }),
      },
      {
        method: "POST",
        path: "/subscriptions/:id/resume",
        description: "Resume a paused subscription. Sets status to active.",
        auth: "jwt",
        exampleResponse: envelope({
          id: "s1u2b3s4-d5e6-7890-subs-123456789abc",
          status: "active",
        }),
      },
      {
        method: "POST",
        path: "/subscriptions/:id/cancel",
        description: "Cancel a subscription at period end or immediately.",
        auth: "jwt",
        exampleResponse: envelope({
          id: "s1u2b3s4-d5e6-7890-subs-123456789abc",
          status: "cancelled",
          cancelledAt: "2026-07-20T12:00:00.000Z",
        }),
      },
      {
        method: "POST",
        path: "/subscriptions/:id/reactivate",
        description: "Reactivate a cancelled subscription.",
        auth: "jwt",
        exampleResponse: envelope({
          id: "s1u2b3s4-d5e6-7890-subs-123456789abc",
          status: "active",
        }),
      },
      {
        method: "PATCH",
        path: "/subscriptions/:id/plan",
        description: "Upgrade or downgrade subscription plan with proration.",
        auth: "jwt",
        requestSchema: [{ field: "newPlanId", type: "uuid", required: true }],
        exampleRequest: `{ "newPlanId": "p2l3a4n5-d6e7-8901-plan-234567890bcd" }`,
        exampleResponse: envelope({
          subscription: {
            id: "s1u2b3s4-d5e6-7890-subs-123456789abc",
            planId: "p2l3a4n5-d6e7-8901-plan-234567890bcd",
          },
          proration: { creditAmount: "5000.00", chargeAmount: "25000.00" },
        }),
      },
    ],
  },
  {
    tag: "Invoices",
    slug: "invoices",
    description:
      "View billing invoices generated for subscription renewals and one-time charges.",
    endpoints: [
      {
        method: "GET",
        path: "/invoices",
        description: "List invoices with pagination.",
        auth: "jwt",
        queryParams: [
          { field: "page", type: "number" },
          { field: "limit", type: "number" },
        ],
        exampleResponse: envelope({
          data: [
            {
              id: "i1n2v3o4-d5e6-7890-inv1-234567890abc",
              invoiceNumber: "INV-2026-00042",
              status: "paid",
              total: "15000.00",
              currency: "NGN",
            },
          ],
          total: 1,
          page: 1,
          limit: 20,
        }),
      },
      {
        method: "GET",
        path: "/invoices/:id",
        description: "Get invoice with line items.",
        auth: "jwt",
        exampleResponse: envelope({
          id: "i1n2v3o4-d5e6-7890-inv1-234567890abc",
          invoiceNumber: "INV-2026-00042",
          status: "paid",
          subtotal: "15000.00",
          total: "15000.00",
          currency: "NGN",
          items: [
            {
              description: "Pro Plan (July 2026)",
              quantity: 1,
              unitAmount: "15000.00",
              totalAmount: "15000.00",
            },
          ],
          paidAt: "2026-07-01T10:30:00.000Z",
        }),
      },
    ],
  },
  {
    tag: "Payments",
    slug: "payments",
    description:
      "Process payments via Nomba checkout and track payment attempts.",
    endpoints: [
      {
        method: "POST",
        path: "/payments/checkout",
        description:
          "Create a Nomba checkout session for an outstanding invoice.",
        auth: "jwt",
        requestSchema: [
          { field: "invoiceId", type: "uuid", required: true },
          { field: "callbackUrl", type: "url", required: true },
        ],
        exampleRequest: `{
  "invoiceId": "i1n2v3o4-d5e6-7890-inv1-234567890abc",
  "callbackUrl": "https://acme.ng/billing/callback"
}`,
        exampleResponse: envelope({
          checkoutUrl: "https://checkout.nomba.com/pay/def456",
          paymentId: "pay_retry_001",
        }),
      },
      {
        method: "GET",
        path: "/payments",
        description: "List payments with pagination.",
        auth: "jwt",
        exampleResponse: envelope({
          data: [
            {
              id: "pay_789xyz",
              status: "succeeded",
              amount: "15000.00",
              currency: "NGN",
            },
          ],
          total: 1,
        }),
      },
      {
        method: "GET",
        path: "/payments/:id",
        description: "Get payment details including attempt history.",
        auth: "jwt",
        exampleResponse: envelope({
          id: "pay_789xyz",
          status: "succeeded",
          amount: "15000.00",
          nombaTransactionId: "TXN-NOMBA-001234",
          paidAt: "2026-07-01T10:30:00.000Z",
          attempts: [{ attemptNumber: 1, status: "succeeded" }],
        }),
      },
    ],
  },
  {
    tag: "Webhooks",
    slug: "webhooks",
    description:
      "Register webhook endpoints to receive real-time events. Outbound deliveries are signed with HMAC-SHA256 and retried via BullMQ.",
    endpoints: [
      {
        method: "POST",
        path: "/webhooks",
        description: "Register a webhook endpoint for event notifications.",
        auth: "jwt",
        requestSchema: [
          { field: "url", type: "url", required: true },
          { field: "events", type: "string[]", required: true },
          { field: "description", type: "string" },
          { field: "isActive", type: "boolean", description: "Default: true" },
        ],
        exampleRequest: `{
  "url": "https://acme.ng/webhooks/nse",
  "events": [
    "subscription.created",
    "subscription.renewed",
    "payment.failed",
    "payment.recovered",
    "invoice.paid"
  ],
  "description": "Production webhook handler"
}`,
        exampleResponse: envelope({
          id: "w1h2o3o4-d5e6-7890-hook-123456789abc",
          url: "https://acme.ng/webhooks/nse",
          events: ["subscription.created", "payment.failed", "invoice.paid"],
          secret: "whsec_auto_generated_secret",
          isActive: true,
        }),
      },
      {
        method: "GET",
        path: "/webhooks",
        description: "List registered webhook endpoints.",
        auth: "jwt",
        exampleResponse: envelope({
          data: [
            {
              id: "w1h2o3o4-d5e6-7890-hook-123456789abc",
              url: "https://acme.ng/webhooks/nse",
              isActive: true,
            },
          ],
        }),
      },
      {
        method: "GET",
        path: "/webhooks/:id/deliveries",
        description: "View delivery logs for a webhook (last 50 attempts).",
        auth: "jwt",
        exampleResponse: envelope({
          data: [
            {
              id: "d1e2l3i4-d5e6-7890-del1-234567890abc",
              eventType: "invoice.paid",
              status: "delivered",
              attemptCount: 1,
              responseStatusCode: 200,
              deliveredAt: "2026-07-01T10:31:00.000Z",
            },
          ],
        }),
      },
      {
        method: "POST",
        path: "/webhooks/nomba",
        description:
          "Inbound Nomba payment webhook (HMAC-verified, public endpoint).",
        auth: "hmac",
        exampleRequest: `{
  "event_type": "payment_success",
  "requestId": "req_nomba_001",
  "data": {
    "transaction": {
      "transactionId": "TXN-NOMBA-001234",
      "merchantTxRef": "pay_789xyz",
      "transactionAmount": 15000,
      "responseCode": "00"
    }
  }
}`,
        exampleResponse: JSON.stringify({ received: true }, null, 2),
      },
    ],
  },
];

export const webhookEvents = [
  {
    type: "subscription.created",
    description: "Fired when a new subscription is created.",
    payload: {
      id: "evt_001",
      type: "subscription.created",
      data: {
        subscription: {
          id: "s1u2b3s4-d5e6-7890-subs-123456789abc",
          status: "pending",
        },
        customer: {
          id: "c1u2s3t4-d5e6-7890-cust-123456789abc",
          name: "Chidi Nwosu",
        },
        plan: { id: "p1l2a3n4-d5e6-7890-plan-123456789abc", name: "Pro Plan" },
        invoiceId: "i1n2v3o4-d5e6-7890-inv1-234567890abc",
      },
      createdAt: "2026-07-01T10:00:00.000Z",
    },
  },
  {
    type: "subscription.renewed",
    description: "Fired when a subscription successfully renews.",
    payload: {
      id: "evt_002",
      type: "subscription.renewed",
      data: {
        subscription: {
          id: "s1u2b3s4-d5e6-7890-subs-123456789abc",
          status: "active",
        },
        invoice: {
          id: "i1n2v3o4-d5e6-7890-inv1-234567890abc",
          total: "15000.00",
        },
      },
      createdAt: "2026-08-01T00:05:00.000Z",
    },
  },
  {
    type: "payment.failed",
    description: "Fired when a payment attempt fails.",
    payload: {
      id: "evt_003",
      type: "payment.failed",
      data: {
        payment: {
          id: "pay_789xyz",
          status: "failed",
          failureReason: "Insufficient funds",
        },
        invoice: {
          id: "i1n2v3o4-d5e6-7890-inv1-234567890abc",
          status: "failed",
        },
      },
      createdAt: "2026-08-01T00:10:00.000Z",
    },
  },
  {
    type: "payment.recovered",
    description: "Fired when a previously failed payment succeeds.",
    payload: {
      id: "evt_004",
      type: "payment.recovered",
      data: {
        payment: { id: "pay_789xyz", status: "succeeded" },
        invoice: { id: "i1n2v3o4-d5e6-7890-inv1-234567890abc", status: "paid" },
      },
      createdAt: "2026-08-03T14:00:00.000Z",
    },
  },
  {
    type: "invoice.paid",
    description: "Fired when an invoice is marked as paid.",
    payload: {
      id: "evt_005",
      type: "invoice.paid",
      data: {
        invoice: {
          id: "i1n2v3o4-d5e6-7890-inv1-234567890abc",
          status: "paid",
          total: "15000.00",
        },
        payment: { id: "pay_789xyz", nombaTransactionId: "TXN-NOMBA-001234" },
        subscription: {
          id: "s1u2b3s4-d5e6-7890-subs-123456789abc",
          status: "active",
        },
      },
      createdAt: "2026-07-01T10:30:00.000Z",
    },
  },
  {
    type: "subscription.cancelled",
    description: "Fired when a subscription is cancelled.",
    payload: {
      id: "evt_006",
      type: "subscription.cancelled",
      data: {
        subscription: {
          id: "s1u2b3s4-d5e6-7890-subs-123456789abc",
          status: "cancelled",
          cancelledAt: "2026-07-20T12:00:00.000Z",
        },
      },
      createdAt: "2026-07-20T12:00:00.000Z",
    },
  },
];

export const subscriptionStatuses = [
  "pending",
  "trialing",
  "active",
  "past_due",
  "grace_period",
  "suspended",
  "cancelled",
  "expired",
] as const;
