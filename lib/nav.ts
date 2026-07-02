export type NavItem = { slug: string; title: string };
export type NavGroup = { group: string; items: NavItem[] };

export const ICONS: Record<string, string> = {
  "introduction": "🤝", "how-it-works": "🧭", "quick-start": "⚡", "mission": "🎯", "the-team": "👥",
  "merchants/overview": "🏬", "merchants/create-a-plan": "📝", "merchants/onboard-and-collect-payment": "💳", "merchants/billing-and-invoicing": "🧾", "merchants/team-and-roles": "🔐", "merchants/analytics": "📊",
  "subscribers/overview": "🙋", "subscribers/manage-your-subscription": "⚙️", "subscribers/when-a-payment-fails": "🔁",
  "concepts/subscription-lifecycle": "🔄", "concepts/event-store": "📒", "concepts/recovery-orchestration": "🧭",
  "channels/web": "🖥️", "channels/whatsapp": "💬", "channels/sms": "✉️", "channels/ussd": "☎️",
  "developer/authentication": "🔑", "developer/webhooks": "🔔", "developer/rate-limits": "⏱️",
  "architecture/overview": "🏗️", "architecture/modules": "🧩", "architecture/nomba-integration": "🔌", "architecture/data-flow": "🔄", "architecture/queues-and-async": "🗂️", "architecture/resilience": "🧱",
  "security/overview": "🛡️", "security/webhook-verification": "✔️", "security/data-protection": "🔐",
  "api-reference/introduction": "📘", "api-reference/authentication": "🔐", "api-reference/errors": "⚠️", "api-reference/webhook-events": "🔔",
};

export const NAV: NavGroup[] = [
  {
    group: "Get started", items: [
      { slug: "introduction", title: "Introduction" },
      { slug: "how-it-works", title: "How it works" },
      { slug: "quick-start", title: "Quick start" },
      { slug: "mission", title: "The mission" },
      { slug: "the-team", title: "The team" },
    ],
  },
  {
    group: "For merchants", items: [
      { slug: "merchants/overview", title: "For merchants" },
      { slug: "merchants/create-a-plan", title: "Create a plan" },
      { slug: "merchants/onboard-and-collect-payment", title: "Onboard a customer" },
      { slug: "merchants/billing-and-invoicing", title: "Billing & invoicing" },
      { slug: "merchants/team-and-roles", title: "Team & roles" },
      { slug: "merchants/analytics", title: "Analytics" },
    ],
  },
  {
    group: "For subscribers", items: [
      { slug: "subscribers/overview", title: "For subscribers" },
      { slug: "subscribers/manage-your-subscription", title: "Manage your subscription" },
      { slug: "subscribers/when-a-payment-fails", title: "When a payment fails" },
    ],
  },
  {
    group: "Core concepts", items: [
      { slug: "concepts/subscription-lifecycle", title: "Subscription lifecycle" },
      { slug: "concepts/event-store", title: "The event store" },
      { slug: "concepts/recovery-orchestration", title: "Recovery orchestration" },
    ],
  },
  {
    group: "Channels", items: [
      { slug: "channels/web", title: "Web" },
      { slug: "channels/whatsapp", title: "WhatsApp" },
      { slug: "channels/sms", title: "SMS" },
      { slug: "channels/ussd", title: "USSD" },
    ],
  },
  {
    group: "Developer", items: [
      { slug: "developer/authentication", title: "Authentication" },
      { slug: "developer/webhooks", title: "Webhooks" },
      { slug: "developer/rate-limits", title: "Rate limits" },
    ],
  },
  {
    group: "Architecture", items: [
      { slug: "architecture/overview", title: "Architecture" },
      { slug: "architecture/modules", title: "Modules" },
      { slug: "architecture/nomba-integration", title: "Nomba integration" },
      { slug: "architecture/data-flow", title: "Data flow" },
      { slug: "architecture/queues-and-async", title: "Queues & async processing" },
      { slug: "architecture/resilience", title: "Resilience & scale" },
    ],
  },
  {
    group: "Security & trust", items: [
      { slug: "security/overview", title: "Security overview" },
      { slug: "security/webhook-verification", title: "Webhook signature verification" },
      { slug: "security/data-protection", title: "Data & encryption posture" },
    ],
  },
  {
    group: "API reference", items: [
      { slug: "api-reference/introduction", title: "API Reference" },
      { slug: "api-reference/authentication", title: "Authentication" },
      { slug: "api-reference/errors", title: "Errors" },
      { slug: "api-reference/webhook-events", title: "Webhook events" },
    ],
  },
];

export const DESCRIPTIONS: Record<string, string> = {
  "how-it-works": "A merchant creates a plan. A customer subscribes. Nomba collects the charge. If it fails, recovery kicks in. The whole arc, end to end, in one page.",
  "quick-start": "Three ways to feel the engine in five minutes. Create a plan, break a payment on purpose, replay a webhook.",
  "mission": "The objectives behind the build, and the six things explicitly left out of this release.",
  "the-team": "The people behind the Nomba Subscription Engine, and why recurring billing in Nigeria needed a second look.",
  "merchants/overview": "Stop building billing logic in-house. Plans, customers, invoices, recovery, analytics — one API, one dashboard.",
  "merchants/create-a-plan": "Name, price, interval, trial. From an idea for a pricing tier to something a customer can subscribe to.",
  "merchants/onboard-and-collect-payment": "Tokenise a card once. Charge it on every billing cycle after, without asking the customer again.",
  "merchants/billing-and-invoicing": "Invoices generate themselves. Charges fire themselves. Proration does the maths so you don't have to.",
  "merchants/team-and-roles": "Owner and Team Member. Who can rotate an API key, and who just needs to handle today's support queue.",
  "merchants/analytics": "MRR, churn, recovery rate, plan performance — computed from the same event store that powers your webhooks.",
  "subscribers/overview": "View it. Pause it. Cancel it. Fix a failed card. Without emailing the merchant and waiting.",
  "subscribers/manage-your-subscription": "Everything you can do from the portal, and why it doesn't touch the merchant's dashboard to do it.",
  "subscribers/when-a-payment-fails": "A card fails. A message arrives on WhatsApp before you even notice. Here's the whole recovery path.",
  "concepts/subscription-lifecycle": "Eight states. One state machine. Why `past_due` and `grace_period` are different states, not the same failure twice.",
  "concepts/event-store": "Every domain event, persisted once, read by webhooks, notifications, and analytics. One source of truth, not three.",
  "concepts/recovery-orchestration": "One component decides which channel reaches a customer first, and what to do when that channel doesn't answer.",
  "channels/web": "The API and docs site, the merchant dashboard, and the customer portal — three applications, one API underneath.",
  "channels/whatsapp": "Retry Now, Pause Subscription, Downgrade Plan. A failed charge, three buttons, no phone call.",
  "channels/sms": "Reply YES to retry. The rail that works when a customer has neither an app nor a smartphone worth the name.",
  "channels/ussd": "Dial a short code, check your status, pause or cancel. No data connection required, ever.",
  "developer/authentication": "Live and test keys per merchant. Bearer auth, rotation, and what happens the moment a request lands.",
  "developer/webhooks": "Subscribe once. Every domain event, delivered with retry, dead-letter handling, and replay by subscription ID or time range.",
  "developer/rate-limits": "Per-key throughput, burst headroom, and the headers that tell you exactly where you stand.",
  "architecture/overview": "One NestJS API. Postgres for the ledger. Redis and BullMQ for everything that shouldn't block a response.",
  "architecture/modules": "Sixteen modules, each owning one slice of the domain. What each one is responsible for, and who it talks to.",
  "architecture/nomba-integration": "Checkout, Tokenised Cards, Charge, Transfers. The four Nomba surfaces this engine is built on.",
  "architecture/data-flow": "How a single event — a payment failing, a subscription renewing — reaches webhooks, notifications, and analytics without three separate write paths.",
  "architecture/queues-and-async": "Dunning retries, webhook delivery, invoice generation. Why none of them happen inline on the request that triggered them.",
  "architecture/resilience": "Async by default, retried with backoff, degraded gracefully when WhatsApp or SMS goes down for an hour.",
  "security/overview": "The defence-in-depth posture across authentication, webhook signing, and data at rest.",
  "security/webhook-verification": "Every webhook we send is signed. Here's exactly how to verify one, in five languages.",
  "security/data-protection": "AES-256-GCM at rest for anything sensitive. What's encrypted, what isn't, and why.",
  "api-reference/introduction": "The formal reference for the Subscription Engine API. Authentication, resources, errors, webhooks.",
  "api-reference/authentication": "Bearer tokens, scoped to a merchant. Live and test environments, never crossed.",
  "api-reference/errors": "Status codes, error codes, and what each one means for your retry logic.",
  "api-reference/webhook-events": "Every event type we emit, with payload shape and the signature header that proves it came from us.",
};

export function titleFor(slug: string): string {
  for (const g of NAV) {
    for (const it of g.items) {
      if (it.slug === slug) return it.title;
    }
  }
  return slug;
}

export function groupFor(slug: string): NavGroup | undefined {
  return NAV.find((g) => g.items.some((it) => it.slug === slug));
}

export function allSlugs(): string[] {
  return NAV.flatMap((g) => g.items.map((it) => it.slug));
}
