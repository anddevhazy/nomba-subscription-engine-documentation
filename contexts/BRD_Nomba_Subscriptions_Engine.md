# Business Requirements Document (BRD)
## Nomba Subscription Engine

**Document Version:** 3.0

---

## 1. Executive Summary

The Nomba Subscription Engine is a multi-tenant Subscription-as-a-Service platform built on Nomba's payment infrastructure. It provides merchants with plan management, subscription lifecycle management, invoicing, payment collection, failed-payment recovery, outbound event delivery, programmatic API access, audit logging, and business analytics.

The platform is designed to be integrated by merchants directly, or embedded by downstream product teams building customer-facing billing experiences on top of it. It is delivered through three applications: an API and accompanying documentation/API reference site, a merchant dashboard, and a customer self-service portal.

This document defines the functional and non-functional requirements for the platform.

---

## 2. Business Objectives

| Objective | Description |
|---|---|
| O1 | Provide merchants with a subscription billing system that removes the need to build recurring-billing logic in-house |
| O2 | Reduce revenue loss from failed payments through structured, multi-channel recovery workflows |
| O3 | Support customers who transact primarily through mobile channels beyond web and app, including SMS, USSD, and WhatsApp |
| O4 | Give merchants operational visibility into subscription business performance (revenue, churn, recovery, plan performance) |
| O5 | Provide a stable, well-documented integration surface for downstream developers building on the platform |

---

## 3. Scope

### 3.1 In Scope — Core Platform

- Merchant accounts with authenticated, multi-user access (JWT access + refresh tokens)
- Plan management (create, update, retire pricing plans; monthly, quarterly, yearly, custom intervals; trial support)
- Customer and subscription lifecycle: create, pause, resume, cancel, reactivate, change plan
- Automated invoice generation with line-item detail, and proration on plan changes
- Payment collection via Nomba Checkout, with full payment-attempt history per charge
- Failed-payment recovery workflow with grace periods
- Customer self-service portal (view subscription, pause/resume/cancel, update payment method), authenticated separately from merchant users
- Outbound webhooks: merchant-configured event delivery with retry and dead-letter handling
- Programmatic access via live/test API keys, including rotation
- Audit logging of workspace actions
- Business analytics: MRR, ARR, churn, revenue trends, plan performance, customer insights, recovery metrics, webhook delivery health, and an activity feed
- Event store: all domain events persisted as the system of record for webhooks, notifications, and analytics
- Recovery notifications delivered via SMS and USSD, in addition to email
- Recovery notifications delivered via WhatsApp, with SMS as a fallback channel when WhatsApp delivery is unavailable
- Webhook event replay, allowing downstream integrators to request re-delivery of events by subscription ID or time range

### 3.2 Out of Scope (initial release)

- Full KYC/compliance workflows (customers are assumed pre-verified via Nomba)
- Tax calculation and invoicing compliance (VAT, WHT)
- Multi-currency settlement beyond NGN, including FX-aware proration
- Native mobile applications (web dashboard, web customer portal, USSD, SMS, and WhatsApp channels only)
- Granular, per-feature role permissioning beyond an Owner / Team Member distinction on merchant accounts

---

## 4. Stakeholders

| Role | Interest |
|---|---|
| Merchant (platform user) | Configures plans, monitors business health via analytics, manages API keys and webhook endpoints, audits account activity |
| Downstream Developer | Consumes the platform via API key; requires clear documentation, predictable webhooks, and reliable event replay for integration and debugging |
| End Subscriber | Manages their own subscription (pause, cancel, update payment method) via web portal, SMS, USSD, or WhatsApp |
| Nomba (Payment Infrastructure Provider) | Provides the underlying Checkout, Tokenised Card, Charge, and Transfers APIs the platform is built on |

---

## 5. Functional Requirements

### 5.1 Merchant Accounts & Access

| ID | Requirement |
|---|---|
| FR-1 | System shall allow merchant signup, creating a merchant account and an associated user in a single flow |
| FR-2 | System shall authenticate users via JWT access and refresh tokens, and support password reset |
| FR-3 | System shall scope every business resource (plans, customers, subscriptions, invoices, payments, webhooks, API keys, audit logs) to a `merchantId` for tenant isolation |
| FR-4 | System shall support live and test API keys per merchant, with key rotation and revocation |

### 5.2 Plans & Subscriptions

| ID | Requirement |
|---|---|
| FR-5 | System shall allow creation of subscription plans with name, price, billing interval (monthly, quarterly, yearly, custom), and trial period |
| FR-6 | System shall model subscription state as an explicit state machine: `pending → trialing → active → past_due → grace_period → suspended → cancelled / expired` |
| FR-7 | System shall support subscription lifecycle actions: create, pause, resume, cancel, reactivate, and change plan |
| FR-8 | System shall calculate and apply proration when a customer upgrades or downgrades mid-cycle |

### 5.3 Billing, Invoicing & Payments

| ID | Requirement |
|---|---|
| FR-9 | System shall automatically generate invoices, with line-item detail, on each billing cycle |
| FR-10 | System shall attempt charge via Nomba Checkout/Charge API using the stored tokenised card on each billing cycle |
| FR-11 | System shall record every charge attempt, successful or failed, as a payment attempt linked to its invoice and subscription |
| FR-12 | System shall handle charge failure by transitioning the subscription to `past_due`, applying a grace period, and initiating the recovery workflow |

### 5.4 Customer Self-Service Portal

| ID | Requirement |
|---|---|
| FR-13 | System shall expose a customer-authenticated portal, separate from merchant authentication, for viewing the active subscription |
| FR-14 | System shall allow customers to pause, resume, or cancel their own subscription via the portal |
| FR-15 | System shall allow customers to update their stored payment method via the portal |

### 5.5 USSD & SMS Channels

| ID | Requirement |
|---|---|
| FR-16 | System shall expose a USSD menu flow allowing a customer to check subscription status, pause, or cancel |
| FR-17 | System shall send an SMS notification on charge failure with a reply-based retry mechanism (e.g., "Reply YES to retry") |
| FR-18 | System shall process inbound USSD sessions and SMS replies and route them into the same recovery state machine used by the web portal and WhatsApp |
| FR-19 | System shall log the channel (web, USSD, SMS, WhatsApp) used for every customer action, for audit and reporting |

### 5.6 WhatsApp Recovery Channel

| ID | Requirement |
|---|---|
| FR-20 | On charge failure, system shall send a WhatsApp message to the customer offering: Retry Now / Pause Subscription / Downgrade Plan |
| FR-21 | System shall process the customer's WhatsApp reply and execute the corresponding action against the subscription state machine |
| FR-22 | System shall fall back to SMS (FR-17) if WhatsApp delivery fails or is unavailable for that customer |
| FR-23 | System shall log WhatsApp conversation outcomes as recovery-channel events, feeding into recovery-rate reporting |

### 5.7 Event Store & Outbound Webhooks

| ID | Requirement |
|---|---|
| FR-24 | System shall persist every domain event (`SubscriptionCreated`, `SubscriptionUpdated`, `SubscriptionCancelled`, `SubscriptionRenewed`, `PaymentFailed`, `PaymentRecovered`, `InvoicePaid`, etc.) as an immutable, timestamped record in an event store |
| FR-25 | System shall allow merchants to configure outbound webhook endpoints and select which events they receive |
| FR-26 | System shall retry failed webhook deliveries and move persistently failing deliveries to a dead-letter state, visible to the merchant |
| FR-27 | System shall expose a webhook replay endpoint allowing re-delivery of events by subscription ID or time range, sourced from the event store |
| FR-28 | System shall guarantee idempotency on replayed webhook deliveries so integrators can safely reprocess without duplicating side effects |
| FR-29 | System shall provide a delivery log per webhook endpoint, showing attempts, response codes, and retry/dead-letter status |

### 5.8 Audit Logging

| ID | Requirement |
|---|---|
| FR-30 | System shall record an audit log entry for material workspace actions (plan changes, API key rotation, webhook configuration, subscription overrides) |
| FR-31 | System shall expose a paginated audit log query endpoint per merchant |

### 5.9 Analytics & Reporting

| ID | Requirement |
|---|---|
| FR-32 | System shall compute core business metrics on demand: MRR, ARR, churn rate, ARPU, and recovery rate |
| FR-33 | System shall provide revenue and subscription trend reporting over configurable time granularity (day, week, month) |
| FR-34 | System shall provide plan-level performance reporting (MRR and subscriber count per plan) |
| FR-35 | System shall provide payment funnel reporting (attempt success rate, recovery rate) |
| FR-36 | System shall provide recovery-specific reporting (past-due volume, grace-period volume, recovery rate, broken down by channel) |
| FR-37 | System shall provide webhook delivery health reporting (success rate per endpoint) |
| FR-38 | System shall provide a paginated, merchant-facing activity feed sourced from the event store |

### 5.10 Documentation & API Reference

| ID | Requirement |
|---|---|
| FR-39 | System shall provide a documentation site describing authentication, all API resources, request/response schemas, and webhook event types |
| FR-40 | System shall provide interactive API reference (Swagger/OpenAPI) allowing a developer to inspect and test endpoints directly |

---

## 6. Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-1 | API responses for core subscription operations shall return within 2 seconds under normal load |
| NFR-2 | Multi-tenant data isolation shall be enforced at the data-access layer (entity-level `merchantId` scoping), not only in the application layer |
| NFR-3 | All webhook payloads shall be signed so downstream integrators can verify authenticity |
| NFR-4 | Sensitive data, including stored payment references, shall be encrypted at rest (AES-256-GCM) |
| NFR-5 | Recovery and webhook delivery jobs shall run asynchronously via a queue, decoupled from the request/response cycle |
| NFR-6 | System shall degrade gracefully if the WhatsApp or SMS provider is unreachable; affected jobs are queued and retried rather than failing silently |
| NFR-7 | Documentation shall be sufficient for a developer unfamiliar with the system to complete a basic integration without direct support |

---

## 7. Integration Requirements (Nomba APIs)

| API | Usage |
|---|---|
| Checkout API | Initial card tokenisation at subscription signup, and portal-driven payment-method updates |
| Tokenised Cards | Stored payment method reused for recurring charges |
| Charge API | Executes each billing-cycle charge attempt |
| Transfers API | Payout-side handling for platform fee splits, where applicable |
| Webhooks (inbound from Nomba) | Nomba payment events trigger internal state transitions and are persisted to the event store |

---

## 8. Platform Dependencies

- Nomba APIs are available and stable in both sandbox and production environments
- WhatsApp integration is provisioned via Twilio, with production business verification in place
- USSD integration is provisioned via a telco/aggregator short-code arrangement
- Customers are pre-verified via Nomba; the platform does not perform independent KYC
- The customer self-service portal, merchant dashboard, and documentation site are separate applications consuming this API

---



## 9. Architectural Design Decisions

| Decision | Rationale |
|---|---|
| Analytics is a read-model over the event store, not a separately maintained data path | Avoids divergence between analytics and the event store, since both draw from the same underlying data |
| Channel selection and fallback logic (WhatsApp, SMS, USSD) is centralized in a single recovery-orchestration component | Avoids duplicating multi-provider logic across the codebase as recovery channels scale |
---

## 10. Success Criteria

The platform meets its requirements when:
- A merchant can create a plan, onboard a customer, and collect recurring payment end-to-end without manual intervention
- A failed payment is detected, a recovery notification is sent through the appropriate channel, and successful recovery updates the subscription and invoice state correctly
- A downstream developer can integrate against the API using only the published documentation
- Webhook replay reliably reconstructs missed events without duplicating downstream side effects
- Merchant-facing analytics accurately reflect the underlying transactional and event data at all times
