export type NavItem = { slug: string; title: string };
export type NavGroup = { group: string; items: NavItem[] };

export const ICONS: Record<string, string> = {
  "introduction": "🤝", "how-it-works": "🧭", "quick-start": "⚡", "mission": "🎯", "reviewer-setup": "💻",
  "job-seekers/overview": "👤", "job-seekers/sign-up": "✍️", "job-seekers/find-work": "🔍", "job-seekers/get-paid": "💵", "job-seekers/savings": "🐖", "job-seekers/standing-score": "📈",
  "employers/overview": "💼", "employers/post-a-job": "📝", "employers/pay-job-seekers": "💳", "employers/escrow": "🔒", "employers/link-a-bank": "🏦", "employers/reports": "📊",
  "traders/overview": "🏪", "traders/take-payments": "🧾", "traders/virtual-account": "🔢", "traders/sales-velocity": "📈", "traders/bills": "💡",
  "standing/how-it-works": "📈", "standing/tiers": "🏅", "standing/audit-ledger": "📒", "standing/feedback-loop": "🔁",
  "channels/voice": "📞", "channels/whatsapp-text": "💬", "channels/whatsapp-calling": "📱", "channels/sms": "✉️", "channels/web": "🖥️",
  "partners/overview": "🏛️", "partners/consent": "✅", "partners/api-keys": "🔑", "partners/snapshots": "📸", "partners/webhooks": "🔔", "partners/rate-limits": "⏱️",
  "security/audit-ledger": "📒", "security/kyc-tiers": "🪪", "security/ndpr": "🛡️", "security/rails": "🔐", "security/webhook-verification": "✔️",
  "architecture/overview": "🏗️", "architecture/services": "🧩", "architecture/data-flow": "🔄", "architecture/ml-layer": "🤖", "architecture/infrastructure": "🖧", "architecture/inter-service-comm": "🔗", "architecture/observability": "👁️", "architecture/resilience": "🧱", "architecture/sip-infrastructure": "☎️", "architecture/sms-infrastructure": "📡", "architecture/squad-integration": "🔌", "architecture/squad-reference": "📚",
  "api-reference/introduction": "📘", "api-reference/authentication": "🔐", "api-reference/errors": "⚠️", "api-reference/webhook-events": "🔔", "api-reference/partners/consent-links": "🔗", "api-reference/partners/disbursements": "💸", "api-reference/partners/snapshots": "📸",
};

export const NAV: NavGroup[] = [
  {
    group: "Get started", items: [
      { slug: "introduction", title: "Introduction" },
      { slug: "how-it-works", title: "How it works" },
      { slug: "quick-start", title: "Quick start" },
      { slug: "mission", title: "The mission" },
      { slug: "reviewer-setup", title: "Run Guild locally" },
    ],
  },
  {
    group: "Job seekers", items: [
      { slug: "job-seekers/overview", title: "For Job Seekers" },
      { slug: "job-seekers/sign-up", title: "Sign up" },
      { slug: "job-seekers/find-work", title: "Find work" },
      { slug: "job-seekers/get-paid", title: "Get paid" },
      { slug: "job-seekers/savings", title: "Savings" },
      { slug: "job-seekers/standing-score", title: "Standing score" },
    ],
  },
  {
    group: "Employers", items: [
      { slug: "employers/overview", title: "For Employers" },
      { slug: "employers/post-a-job", title: "Post a job" },
      { slug: "employers/pay-job-seekers", title: "Pay Job Seekers" },
      { slug: "employers/escrow", title: "Escrow" },
      { slug: "employers/link-a-bank", title: "Link a bank" },
      { slug: "employers/reports", title: "Workforce reports" },
    ],
  },
  {
    group: "Traders", items: [
      { slug: "traders/overview", title: "For Traders" },
      { slug: "traders/take-payments", title: "Take payments" },
      { slug: "traders/virtual-account", title: "Open a virtual account" },
      { slug: "traders/sales-velocity", title: "Sales velocity" },
      { slug: "traders/bills", title: "Bills" },
    ],
  },
  {
    group: "Standing", items: [
      { slug: "standing/how-it-works", title: "How the standing score works" },
      { slug: "standing/tiers", title: "The four tiers" },
      { slug: "standing/audit-ledger", title: "The audit ledger" },
      { slug: "standing/feedback-loop", title: "The feedback loop" },
    ],
  },
  {
    group: "Channels", items: [
      { slug: "channels/voice", title: "Voice" },
      { slug: "channels/whatsapp-text", title: "WhatsApp text" },
      { slug: "channels/whatsapp-calling", title: "WhatsApp Calling" },
      { slug: "channels/sms", title: "SMS" },
      { slug: "channels/web", title: "Web" },
    ],
  },
  {
    group: "Partners", items: [
      { slug: "partners/overview", title: "For Partners" },
      { slug: "partners/consent", title: "Consent" },
      { slug: "partners/api-keys", title: "API keys" },
      { slug: "partners/snapshots", title: "Snapshots" },
      { slug: "partners/webhooks", title: "Webhooks" },
      { slug: "partners/rate-limits", title: "Rate limits" },
    ],
  },
  {
    group: "Security", items: [
      { slug: "security/audit-ledger", title: "The append-only audit ledger" },
      { slug: "security/kyc-tiers", title: "KYC tiers & data protection" },
      { slug: "security/ndpr", title: "NDPR posture" },
      { slug: "security/rails", title: "How we secure the rails" },
      { slug: "security/webhook-verification", title: "Webhook signature verification" },
    ],
  },
  {
    group: "Architecture", items: [
      { slug: "architecture/overview", title: "Architecture" },
      { slug: "architecture/services", title: "Services" },
      { slug: "architecture/data-flow", title: "Data flow" },
      { slug: "architecture/ml-layer", title: "AI / ML layer" },
      { slug: "architecture/infrastructure", title: "Infrastructure" },
      { slug: "architecture/inter-service-comm", title: "Inter-service communication" },
      { slug: "architecture/observability", title: "Observability" },
      { slug: "architecture/resilience", title: "Resilience & scale" },
      { slug: "architecture/sip-infrastructure", title: "SIP infrastructure" },
      { slug: "architecture/sms-infrastructure", title: "SMS infrastructure" },
      { slug: "architecture/squad-integration", title: "Squad integration" },
      { slug: "architecture/squad-reference", title: "Squad: complete surface reference" },
    ],
  },
  {
    group: "API reference", items: [
      { slug: "api-reference/introduction", title: "API Reference" },
      { slug: "api-reference/authentication", title: "Authentication" },
      { slug: "api-reference/errors", title: "Errors" },
      { slug: "api-reference/webhook-events", title: "Webhook events" },
      { slug: "api-reference/partners/consent-links", title: "Consent links" },
      { slug: "api-reference/partners/disbursements", title: "Disbursements" },
      { slug: "api-reference/partners/snapshots", title: "Snapshots" },
    ],
  },
];

export const DESCRIPTIONS: Record<string, string> = {
  "quick-start": "Three ways to feel Guild in five minutes. Call Tola, post a test job, fetch a snapshot.",
  "mission": "Challenge 02. Five requirements. How Guild answers each one.",
  "reviewer-setup": "One script. Five minutes. Brings the whole stack up on macOS, Linux, or WSL with realistic demo data and four pre-seeded test accounts.",
  "job-seekers/overview": "Get found. Get paid. Build the record that gets you the loan.",
  "job-seekers/sign-up": "Three doors in. Same identity record on the other side.",
  "job-seekers/find-work": "How a job goes from posted in Bodija to ringing your phone in Modakeke in under five seconds.",
  "job-seekers/get-paid": "From the employer's tap to your bank account in under ten seconds. The full path.",
  "job-seekers/savings": "Tell Guild once. We pull from your wallet the moment money lands. No willpower required.",
  "job-seekers/standing-score": "Four tiers. How the model reads the ledger. What pushes you up and what pulls you down.",
  "employers/overview": "Hire who you actually need. Pay only who actually showed up. Stop losing 15% to ghost workers.",
  "employers/post-a-job": "From dashboard tap to ranked candidates in under a second. The full path.",
  "employers/pay-job-seekers": "How releases fire from escrow as attendance is marked, and the few manual moments along the way.",
  "employers/escrow": "How every Guild job is paid for. Budget debits at posting. Funds release per shift. Unfilled headcount refunds automatically.",
  "employers/link-a-bank": "Send fifty naira from your bank app. Done forever after. Squad's mandate API at work.",
  "employers/reports": "Hiring spend over time. Workforce composition. Repeat hires. The numbers your accountant actually wants.",
  "traders/overview": "Turn the cash drawer into a ledger. Take transfers. Build a sales history that unlocks inventory advances.",
  "traders/take-payments": "Customer transfers, wallet-to-wallet, QR, dynamic virtual accounts. Different paths, same audit row at the end.",
  "traders/virtual-account": "A ten-digit account number that's yours. Customers transfer to it. Inflows land in your wallet in real time.",
  "traders/sales-velocity": "Daily inflows turn into a monthly curve. The curve turns into a standing tier. The tier turns into an inventory-advance offer.",
  "traders/bills": "Airtime, data, electricity. From your wallet. Or buy on a customer's behalf and add it to their tab.",
  "standing/how-it-works": "Four tiers. The signals the model reads. How the score changes when you work, when you ghost, when a lender reads you.",
  "standing/tiers": "Building. Emerging. Trusted. Established. What each tier unlocks and what gets you to the next one.",
  "standing/audit-ledger": "Where the signals behind your standing come from. The permanent record of every job, every payment, every interaction.",
  "standing/feedback-loop": "Your standing shapes what the platform shows you. What you do shapes your standing. The loop closes.",
  "channels/whatsapp-text": "Twenty-three intents in five languages. Voice notes too. The dominant rail for Job Seekers, traders, and employers.",
  "channels/whatsapp-calling": "Tap the call button inside your Guild chat. Tola picks up. The unusual rail most platforms don't have.",
  "channels/sms": "Two-way conversational SMS over our own gateway. Plus one-way transactional through Squad SMS. The rail that works on a feature phone.",
  "channels/web": "guild.com.ng — Job Seeker, trader, employer, and partner dashboards. Phone + OTP. No password.",
  "partners/overview": "Underwrite Nigerian informal-economy borrowers on signed snapshot data. Not vouching letters.",
  "partners/consent": "Per-user, per-partner, scope-bounded, revocable. The permission model behind every snapshot fetch.",
  "partners/api-keys": "Bearer authentication. One key per environment. Rotation, scoping, revocation.",
  "partners/snapshots": "The signed JSON document that your underwriting model reads. Every field, every signal, every guarantee.",
  "partners/webhooks": "Push events for consent changes, standing tier moves, repayments. Subscribe once, receive forever.",
  "partners/rate-limits": "Per-key throughput, bursts, headers, dedicated capacity. The numbers.",
  "security/audit-ledger": "Two tables. Two triggers. The structural promise that makes Guild's history a credit signal lenders can trust.",
  "security/kyc-tiers": "Three tiers. What's verified at each. What's encrypted. How the data flows from collection to verification to storage.",
  "security/ndpr": "Consent, minimisation, erasure, portability. How Guild aligns with the Nigeria Data Protection Regulation, in practice.",
  "security/rails": "Defence in depth: HMAC, envelope encryption, reconcile guard, append-only audit, timing-safe everywhere.",
  "security/webhook-verification": "Every webhook we accept is signed. We verify every one. Here is exactly how.",
  "architecture/overview": "Eight services. Sixteen shared packages. One ledger. Built to make every kobo in Nigeria's informal economy visible to a lender.",
  "architecture/services": "Five backend services, two sibling processes. What each owns. How they boot. How they talk.",
  "architecture/data-flow": "The append-only ledger as the data substrate. How every signal flows in, gets enriched, and ends up readable by a partner.",
  "architecture/ml-layer": "Four models. Each one with the shape it has for a specific reason. The data they read. The feedback that improves them.",
  "architecture/infrastructure": "Virtual private servers. CloudPanel-managed nginx. PM2 supervision. The boring choices that ship on time.",
  "architecture/inter-service-comm": "HMAC-signed REST. 300-second skew window. Crockford Base32 nonces. The contract every internal call obeys.",
  "architecture/observability": "Structured logs with request-IDs. Error tracking. Metrics. Health checks. How we know what's happening, and what to do when it isn't.",
  "architecture/resilience": "Circuit breakers, idempotency, the reconcile guard, demo-resilience tooling. And the path from 10K to national.",
  "architecture/sip-infrastructure": "Asterisk bridging Meta's WhatsApp Calling to Tola. TLS 5061, Opus to PCMU, SDES-SRTP. The non-obvious rail.",
  "architecture/sms-infrastructure": "Our own gateway, paired Android devices, Nigerian SIMs. Why we own the SMS rails for two-way conversation.",
  "architecture/squad-integration": "23 surfaces. 5 demo-critical. One client. The reconcile guard, the three signature schemes, idempotency at every layer.",
  "architecture/squad-reference": "Every method, every webhook event, every signature scheme, every idempotency contract. The technical reference for the spine.",
  "api-reference/introduction": "The formal reference for the Guild Partner API. Authentication, endpoints, errors, webhooks.",
  "api-reference/errors": "Status codes, error codes, retry guidance.",
  "api-reference/webhook-events": "Subscribe once. Receive forever. Every event we fire to partners, with payloads and verification spec.",
  "api-reference/partners/consent-links": "Generate a consent URL. Send the user to it. They grant, you receive the consent ID via webhook or callback.",
  "api-reference/partners/disbursements": "Disburse approved credit to a user. Squad payout under the hood. Idempotent. Webhook on settlement.",
  "api-reference/partners/snapshots": "GET a signed snapshot of a user's standing tier, signals, and audit ledger window.",
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
