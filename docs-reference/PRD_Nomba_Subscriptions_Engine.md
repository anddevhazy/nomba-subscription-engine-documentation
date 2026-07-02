# Product Requirements Document (PRD)
## Nomba Subscription Engine


---

## 1. Overview

The Nomba Subscription Engine is a subscription billing platform built on Nomba's payment infrastructure. It consists of four components:

1. **API** — the core billing engine (plans, subscriptions, invoicing, payments, recovery, webhooks, analytics)
2. **Documentation / API Reference site** — for developers integrating against the API
3. **Merchant Dashboard** — the operator interface for businesses running subscriptions on the platform
4. **Customer Self-Service Portal** — where end subscribers manage their own subscription


---

## 2. Problem Statement

Businesses accepting recurring payments in Nigeria today either integrate raw payment primitives (tokenised cards, charge APIs) and build billing logic themselves, or use subscription tools not built for the local payment and communication landscape — where a meaningful share of customers are reached more reliably by SMS, USSD, or WhatsApp than by email or in-app notification, and where failed-card recovery is a significant, recoverable source of lost revenue if handled well.

Merchants need a subscription system that handles the full billing lifecycle correctly, gives them visibility into the health of that revenue, and reaches their customers on the channels those customers actually use — without the merchant having to build any of it themselves.

---

## 3. Goals & Non-Goals

### 3.1 Goals

- Let a merchant go from "I have a Nomba account" to "I am billing customers on a recurring basis" without custom backend work
- Recover a materially higher share of failed payments than email-only dunning, by reaching customers on WhatsApp, SMS, and USSD
- Give merchants an accurate, real-time view of subscription business health
- Give developers a stable, well-documented API and reliable webhook delivery, including the ability to replay missed events

### 3.2 Non-Goals (this release)

- Tax/compliance automation (VAT, WHT)
- Multi-currency billing or FX-aware pricing
- Native mobile apps
- Granular, per-permission role customization beyond Owner / Team Member

---

## 4. Personas

| Persona | Description | Primary Surface |
|---|---|---|
| **Merchant Owner** | Runs the business; sets up plans, monitors revenue and churn, manages API keys and webhooks, manages team access | Merchant Dashboard |
| **Merchant Team Member** | Handles day-to-day operations — customer issues, dunning follow-up, plan adjustments — without account-level access | Merchant Dashboard |
| **Integrating Developer** | Builds or maintains the merchant's integration with the platform; consumes the API directly | Documentation / API Reference site |
| **Subscriber** | The merchant's end customer; pays recurring charges and occasionally needs to pause, cancel, or fix a failed payment | Customer Portal, SMS, USSD, WhatsApp |

---

## 5. User Stories

### Merchant Owner
- As a Merchant Owner, I want to create a pricing plan with a trial period, so I can start collecting subscriptions immediately.
- As a Merchant Owner, I want to see MRR, churn, and recovery rate on one screen, so I can assess business health at a glance.
- As a Merchant Owner, I want to generate and rotate API keys, so I can manage developer access securely.
- As a Merchant Owner, I want to configure a webhook endpoint and see its delivery history, so I can trust that my downstream systems stay in sync.
- As a Merchant Owner, I want to replay missed webhook events, so a temporary outage on my side doesn't cause permanent data loss.

### Merchant Team Member
- As a Team Member, I want to see which subscriptions are past due and why, so I can follow up where needed.
- As a Team Member, I want to manually trigger a payment retry for a specific customer, so I can resolve support requests directly.

### Integrating Developer
- As a Developer, I want complete API documentation with request/response examples, so I can integrate without needing direct support.
- As a Developer, I want webhook payloads to be signed, so I can verify they originated from the platform.
- As a Developer, I want idempotent webhook replay, so reprocessing an event doesn't create duplicate side effects downstream.

### Subscriber
- As a Subscriber, I want to view and cancel my own subscription without contacting the merchant, so I can manage it on my own time.
- As a Subscriber, I want to be notified by WhatsApp or SMS if my payment fails, so I don't lose access to a service I still want.
- As a Subscriber without reliable internet access, I want to check my subscription status by USSD, so I'm not excluded from managing my own subscription.

---

## 6. Feature Prioritization

Priority reflects what's required for the platform to function end-to-end (P0), what's required for it to be trustworthy and operable at a business level (P1), and what materially improves it but isn't blocking (P2).

### P0 — Required for a working release

| Feature | Traceability (BRD) |
|---|---|
| Merchant signup/auth, tenant isolation | FR-1–FR-4 |
| Plan creation and management | FR-5 |
| Subscription lifecycle (create, pause, resume, cancel, reactivate, change plan) | FR-6, FR-7 |
| Proration on plan change | FR-8 |
| Invoice generation and payment collection via Nomba | FR-9–FR-11 |
| Failed-payment handling and grace period | FR-12 |
| Customer portal: view, pause, resume, cancel, update payment method | FR-13–FR-15 |
| Event store and outbound webhooks (basic delivery, no replay yet) | FR-24, FR-25 |
| API documentation site covering core resources | FR-39, FR-40 |

### P1 — Required for the platform to be trustworthy and commercially credible

| Feature | Traceability (BRD) |
|---|---|
| WhatsApp recovery channel with SMS fallback | FR-20–FR-23 |
| SMS-only recovery (independent of WhatsApp availability) | FR-17–FR-19 |
| Webhook retry, dead-letter handling, and replay | FR-26–FR-29 |
| Audit logging | FR-30, FR-31 |
| Core analytics: MRR, ARR, churn, ARPU, recovery rate | FR-32 |
| API key management (live/test, rotation) | FR-4 |

### P2 — Improves the platform but does not block initial usage

| Feature | Traceability (BRD) |
|---|---|
| USSD recovery and self-service channel | FR-16, FR-18 |
| Full analytics suite (trend reporting, plan-level performance, payment funnel, webhook health, activity feed) | FR-33–FR-38 |
| Channel-level recovery reporting | FR-36 |

**Rationale for P2 placement of USSD:** USSD depends on a telco or aggregator short-code relationship with its own lead time, independent of engineering effort. It is sequenced after WhatsApp and SMS, which can be stood up against standard third-party APIs without that dependency.

---

## 7. Release Phases

### Phase 1 — Core Billing (P0)
A merchant can create a plan, onboard a customer, and collect recurring payments end-to-end. Customers can self-serve via the portal. Developers can integrate using published documentation. This phase is the minimum viable product.

### Phase 2 — Recovery & Trust (P1)
Multi-channel recovery (WhatsApp, SMS) goes live. Webhook reliability is hardened with retry, dead-letter handling, and replay. Merchants gain audit logging, API key management, and core business analytics. This phase is what makes the platform viable for a merchant to depend on operationally.

### Phase 3 — Full Visibility (P2)
USSD is added as a recovery and self-service channel. The analytics suite is completed with trend reporting, plan-level performance, and channel-level recovery breakdowns.

---

## 8. Success Metrics

| Metric | Definition | Target Signal |
|---|---|---|
| Time to first live subscription | Time from merchant signup to first successfully collected recurring payment | Should require no manual intervention or support contact |
| Recovery rate | Share of failed payments recovered within the grace period | Should be materially higher than email-only baseline once WhatsApp/SMS are live |
| Webhook delivery reliability | Share of webhook events successfully delivered (including via retry/replay) | Approaching 100% once replay is available |
| Developer time-to-integration | Time for a developer unfamiliar with the platform to complete a basic integration using only documentation | Should not require direct support for standard integration paths |
| Customer self-service rate | Share of subscription actions (pause/cancel/update) completed by the customer directly, across all channels | Reduces merchant support burden as it increases |


