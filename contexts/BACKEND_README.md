# Nomba Subscription Engine

Multi-tenant Subscription-as-a-Service API for recurring billing on Nomba payment infrastructure. Merchants can define plans, manage customers and subscriptions, collect payments, handle dunning, dispatch webhooks, and track business analytics.

Companion merchant dashboard: [`nomba-subscription-engine-dashboard`](../nomba-subscription-engine-dashboard)

## Tech stack

| Layer        | Technology                    |
| ------------ | ----------------------------- |
| Framework    | NestJS 11                     |
| Language     | TypeScript                    |
| Database     | PostgreSQL + TypeORM          |
| Queue / jobs | BullMQ + Redis                |
| Auth         | JWT (access + refresh tokens) |
| Payments     | Nomba API                     |
| API docs     | Swagger (`/docs`)             |

## Features

- **Multi-tenant merchants** — every resource is scoped by `merchantId`
- **Team roles** — Owner and Team Member roles per merchant; Owners manage API keys, webhook configuration, and team membership, while Team Members handle day-to-day subscription and customer operations
- **Plans & pricing** — monthly, quarterly, yearly, and custom intervals with trial support
- **Customers & subscriptions** — full lifecycle (create, pause, resume, cancel, reactivate, change plan)
- **Customer self-service portal** — customers manage their own subscription (pause, cancel, resume, update payment method) without merchant involvement
- **Billing & invoices** — automated invoice generation and payment collection
- **Payments** — Nomba checkout, webhooks, payment attempts, recovery tracking, and payout transfers for platform fee splits
- **Dunning** — retry logic for failed payments with grace periods, delivered via WhatsApp, SMS, USSD, and email
- **Conversational WhatsApp dunning** — failed-charge notifications with inline Retry / Pause / Downgrade actions, processed directly from the customer's reply
- **USSD self-service & recovery** — subscription status, pause, and cancel available via USSD menu for feature-phone and low-data customers, with SMS-based retry replies as fallback
- **Outbound webhooks** — merchant-configured event delivery with retry, dead-letter handling, and on-demand replay
- **API keys** — live/test keys for programmatic access
- **Audit logs** — workspace action history
- **Analytics** — MRR, churn, revenue trends, plan breakdown, customer insights, dunning metrics, and activity feed
- **Event store** — domain events persisted for webhooks, notifications, analytics, and replay

## Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL 14+
- Redis 6+

## Getting started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Key variables:

| Variable                                                          | Description                     | Default                 |
| ----------------------------------------------------------------- | -------------------------------- | ----------------------- |
| `PORT`                                                            | HTTP port                       | `6555`                  |
| `DB_HOST` / `DB_PORT` / `DB_USERNAME` / `DB_PASSWORD` / `DB_NAME` | PostgreSQL connection           | `localhost:5432`        |
| `REDIS_HOST` / `REDIS_PORT`                                       | Redis for BullMQ                | `localhost:6379`        |
| `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET`                        | JWT signing keys                | —                       |
| `ENCRYPTION_KEY`                                                  | AES-256-GCM key (32 bytes)      | —                       |
| `NOMBA_*`                                                         | Nomba API credentials           | —                       |
| `CORS_ORIGINS`                                                    | Comma-separated allowed origins | `http://localhost:3000` |

### 3. Run database migrations

```bash
pnpm migration:run
```

### 4. Start the server

```bash
# development (watch mode)
pnpm start:dev

# production
pnpm build && pnpm start:prod
```

The API starts on `http://localhost:6555` by default. Swagger docs are at `http://localhost:6555/docs`.

## API overview

All authenticated endpoints require a Bearer token:

```
Authorization: Bearer <access_token>
```

Signup and login return `{ user, tokens }`. The JWT payload includes `merchantId` and `role`, which scope all merchant data and authorize account-level actions.

### Response format

Successful responses are wrapped:

```json
{
  "status": "success",
  "message": "Request successful",
  "data": {}
}
```

Paginated list endpoints return `{ data: [], total: number }` inside `data`.

### Auth

| Method | Endpoint                       | Description            |
| ------ | ------------------------------- | ----------------------- |
| `POST` | `/auth/signup`                 | Create merchant + user (Owner) |
| `POST` | `/auth/login`                  | Login                  |
| `POST` | `/auth/refresh`                | Refresh access token   |
| `POST` | `/auth/password-reset/request` | Request password reset |
| `POST` | `/auth/password-reset/confirm` | Confirm password reset |

### Core resources

| Module               | Endpoints                                                                                                                                                              | Notes                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| **Team**              | `POST /team/invite`, `GET /team`, `PATCH /team/:id/role`, `DELETE /team/:id`                                                                                             | Owner-only; manages Team Member access to the merchant account   |
| **Plans**             | `POST/GET/PATCH/DELETE /plans`                                                                                                                                          | CRUD + deactivate                                                  |
| **Customers**         | `POST/GET/PATCH /customers`                                                                                                                                             | Paginated list                                                    |
| **Customer portal**   | `GET /portal/subscription`, `POST /portal/subscription/pause`, `POST /portal/subscription/resume`, `POST /portal/subscription/cancel`, `PATCH /portal/payment-method` | Customer-authenticated self-service, separate from merchant auth  |
| **Subscriptions**     | `POST/GET /subscriptions`, lifecycle actions on `/:id`                                                                                                                  | Pause, resume, cancel, reactivate, change plan                    |
| **Invoices**          | `GET /invoices`, `GET /invoices/:id`                                                                                                                                    | Paginated list                                                    |
| **Payments**          | `POST /payments/checkout`, `GET /payments`                                                                                                                              | Nomba checkout + history                                          |
| **Transfers**         | `GET /transfers`, `GET /transfers/:id`                                                                                                                                  | Payout-side transfers via Nomba Transfers API for platform fee splits |
| **API keys**          | `POST/GET/DELETE /api-keys`, `POST /api-keys/:id/rotate`                                                                                                                | Live/test environments; Owner-only                                |
| **Webhooks**          | `POST/GET /webhooks`, `GET /webhooks/:id/deliveries`                                                                                                                    | Outbound event delivery                                           |
| **Audit**             | `GET /audit/logs`                                                                                                                                                       | Paginated action history                                          |

### Analytics

Merchant analytics are computed on demand from subscriptions, payments, invoices, customers, webhook deliveries, and the event store.

| Method | Endpoint                         | Description                                                                                    |
| ------ | ---------------------------------- | -------------------------------------------------------------------------------------------------- |
| `GET`  | `/analytics/metrics`             | Core snapshot: MRR, ARR, churn, recovery, subscription counts, revenue, ARPU, dunning              |
| `GET`  | `/analytics/overview`            | Full dashboard payload (metrics + payments + customers + dunning + webhooks + plan breakdown)      |
| `GET`  | `/analytics/revenue-trend`       | Revenue over time (`?from=&to=&granularity=day\|week\|month`)                                       |
| `GET`  | `/analytics/subscriptions/trend` | New vs cancelled subscriptions over time                                                           |
| `GET`  | `/analytics/plans`               | MRR and subscriber breakdown per plan                                                              |
| `GET`  | `/analytics/payments`            | Payment funnel, success rate, recovery, attempts                                                   |
| `GET`  | `/analytics/customers`           | Customer growth and top customers by revenue                                                       |
| `GET`  | `/analytics/dunning`             | Past-due, grace period, and recovery-after-dunning stats                                           |
| `GET`  | `/analytics/webhooks`            | Webhook delivery success rate                                                                      |
| `GET`  | `/analytics/activity`            | Paginated recent events (`?page=&limit=`)                                                          |

### Webhooks

| Method | Endpoint                  | Description                                                                                  |
| ------ | -------------------------- | ---------------------------------------------------------------------------------------------- |
| `POST` | `/webhooks/nomba`         | Nomba payment and transfer webhook receiver                                                   |
| `POST` | `/webhooks/whatsapp`      | Inbound WhatsApp reply receiver (dunning actions)                                              |
| `POST` | `/webhooks/sms`           | Inbound SMS reply receiver (retry confirmations)                                               |
| `POST` | `/webhooks/ussd`          | USSD session handler for status/pause/cancel                                                   |
| `GET`  | `/webhooks/:id/deliveries` | Delivery log for a configured outbound webhook                                                |
| `POST` | `/webhooks/replay`        | Re-deliver events by subscription ID or time range, replayed from the event store with idempotent delivery |

### Health

| Method | Endpoint  | Description          |
| ------ | ---------- | ---------------------- |
| `GET`  | `/health` | Service health check |

## Domain model

```
merchants
  ├── users (role: owner | team_member)
  ├── api_keys
  ├── plans
  ├── customers
  │     └── subscriptions
  │           ├── invoices → invoice_items
  │           └── payments → payment_attempts
  ├── transfers
  ├── webhooks → webhook_deliveries
  ├── audit_logs
  ├── event_store
  └── notifications
```

All business entities (except `Merchant`, `User`, `AuditLog`, `EventStore`) inherit `merchantId` from `BaseEntity` for tenant isolation. Each `User` carries a `role` of `owner` or `team_member`, which gates account-level actions — API key management, webhook configuration, and team membership — to Owners.

### Subscription statuses

`pending` · `trialing` · `active` · `past_due` · `grace_period` · `suspended` · `cancelled` · `expired`

### Domain events

`SubscriptionCreated` · `SubscriptionUpdated` · `SubscriptionCancelled` · `SubscriptionRenewed` · `PaymentFailed` · `PaymentRecovered` · `InvoicePaid`

## Project structure

```
src/
  analytics/       # Merchant analytics and reporting
  api-keys/        # Programmatic API access
  audit/           # Audit log queries
  auth/            # Signup, login, JWT
  billing/         # Invoice generation and proration
  customers/       # Customer management
  dunning/         # Failed payment retry logic
  events/          # Event store and processor
  invoices/        # Invoice queries
  merchants/       # Merchant entity
  notifications/   # Email, SMS, WhatsApp, and USSD notifications and dunning flows
  payments/        # Checkout, Nomba integration, webhooks, and transfers
  plans/           # Pricing plans
  portal/          # Customer-facing self-service subscription management
  subscriptions/   # Subscription lifecycle
  team/            # Owner/Team Member roles and membership management
  webhooks/        # Outbound webhook delivery
  database/        # TypeORM config and migrations
  shared/          # Enums and utilities
```

## Scripts

| Command                   | Description               |
| --------------------------- | --------------------------- |
| `pnpm start:dev`          | Start with hot reload     |
| `pnpm build`              | Compile for production    |
| `pnpm start:prod`         | Run compiled app          |
| `pnpm test`               | Unit tests                 |
| `pnpm test:e2e`           | End-to-end tests           |
| `pnpm lint`               | ESLint                      |
| `pnpm migration:generate` | Generate a new migration  |
| `pnpm migration:run`      | Apply pending migrations  |
| `pnpm migration:revert`   | Revert last migration      |

## Testing

```bash
pnpm test
pnpm test:cov
pnpm test:e2e
```

## License

UNLICENSED — private project.
