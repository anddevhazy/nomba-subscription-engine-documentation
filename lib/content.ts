import { DESCRIPTIONS, groupFor, titleFor } from "./nav";

export type PageContent = {
  eyebrow: string;
  title: string;
  lede: string;
  /** Raw HTML for everything after the lede paragraph. */
  body: string;
};

const FLAGSHIP: Record<string, PageContent> = {
  "introduction": {
    eyebrow: "Get started",
    title: "Recurring billing, without building it twice.",
    lede: "A subscription engine for merchants who'd rather ship a product than a payments team.",
    body: `
<p>Adaeze runs Lumen, a boutique fitness app in Lagos. Fifteen hundred members pay ₦15,000 a month for class bookings and a workout plan. For the first year, Lumen's "billing system" was a cron job Adaeze's one backend engineer wrote in a weekend: charge every card on file, log the failures to a spreadsheet, and email anyone whose card declined. Nobody read the spreadsheet on weekends. By the time someone did, the member had usually cancelled out of quiet frustration, not malice — their card expired, nobody told them, and nobody made it easy to fix.</p>
<p>That's not a Lumen problem. It's what happens to every business that builds recurring billing as an afterthought: the happy path (card works, subscription renews) takes an afternoon. Everything else — a card declining on day one of a new cycle, a customer who wants to pause instead of cancel, a webhook that needs replaying after a weekend outage — takes months, and most teams never quite finish it.</p>
<p>The Nomba Subscription Engine is the version of this where the hard parts ship on day one. Plans, customers, and subscriptions have a real lifecycle. Invoices generate themselves. A failed charge doesn't wait for someone to notice a spreadsheet — it starts a recovery sequence on WhatsApp, SMS, or USSD within minutes, on whichever rail the subscriber actually uses. Every event is written once, to one place, and read by webhooks, notifications, and analytics alike.</p>

<div class="callout note"><div class="ic">ⓘ</div><p><strong>Adaeze and the developer you'll meet a few pages from now are illustrative composites</strong> — useful stand-ins for real merchant and integrator workflows, not real people or companies. We use them throughout these docs to keep the abstract concrete.</p></div>

<h2 id="h-what-it-is">What this is</h2>
<p>A multi-tenant Subscription-as-a-Service API built on Nomba's payment infrastructure. A merchant signs up, defines pricing plans, and starts collecting recurring payments — without writing a line of billing logic themselves. Underneath, every card charge, every invoice, and every recovery attempt runs through the same four Nomba surfaces: Checkout for tokenisation, Charge for the recurring debit, Transfers for payout splits, and signed webhooks tying it all back together.</p>
<p>The platform ships as three applications sharing one API: this documentation and API reference, a merchant dashboard for running the business day to day, and a customer portal where a subscriber manages their own plan without ever emailing the merchant.</p>

<h2 id="h-connects">What it actually connects</h2>
<p>Three sides. One event store underneath all of them.</p>
<div class="card-grid cols-3">
  <div class="card"><div class="card-icon">🏬</div><div class="card-title">Merchants</div><div class="card-desc">The businesses running subscriptions — from a solo creator to a multi-seat operations team. They get plans, invoicing, recovery, and analytics without building any of it themselves.</div></div>
  <div class="card"><div class="card-icon">🧑‍💻</div><div class="card-title">Downstream developers</div><div class="card-desc">Engineers integrating the API into a merchant's product, or building on top of it. They get documented resources, signed webhooks, and reliable replay.</div></div>
  <div class="card"><div class="card-icon">🙋</div><div class="card-title">Subscribers</div><div class="card-desc">The merchant's own customers. They get a portal to manage their subscription and a recovery flow that reaches them on the channel they actually use — web, WhatsApp, SMS, or USSD.</div></div>
</div>
<p>Connecting any two of these solves a piece of the problem. All three together is what makes the platform something a merchant can depend on operationally — not just a checkout button.</p>

<h2 id="h-underneath">What is underneath</h2>
<p>Every charge, every tokenisation, every payout split runs through <strong>Nomba</strong> — Checkout API, Tokenised Cards, Charge API, and Transfers API, wired together behind one billing engine. Nomba moves the money; the engine decides when to move it, what to do when it fails, and who to tell.</p>
<p>There is no AI or machine-learning layer in this release. Recovery sequencing is a deterministic, configurable orchestration component — not a model — because the goal here is a predictable, auditable billing system, not a scored one.</p>

<h2 id="h-channels">Four channels, one API underneath</h2>
<div class="card-grid cols-2">
  <a class="card" href="/channels/web"><div class="card-icon">🖥️</div><div class="card-title">Web</div><div class="card-desc">The API, the merchant dashboard, and the customer portal.</div></a>
  <a class="card" href="/channels/whatsapp"><div class="card-icon">💬</div><div class="card-title">WhatsApp</div><div class="card-desc">Retry Now, Pause, or Downgrade — right inside a failed-charge message.</div></a>
  <a class="card" href="/channels/sms"><div class="card-icon">✉️</div><div class="card-title">SMS</div><div class="card-desc">Reply YES to retry. Works on any phone, any network.</div></a>
  <a class="card" href="/channels/ussd"><div class="card-icon">☎️</div><div class="card-title">USSD</div><div class="card-desc">Check status, pause, or cancel — no data connection needed.</div></a>
</div>

<h2 id="h-next">Where to go from here</h2>
<div class="card-grid cols-2">
  <a class="card" href="/how-it-works"><div class="card-icon">→</div><div class="card-title">How it works</div><div class="card-desc">Walk through the whole arc, end to end, in one page.</div></a>
  <a class="card" href="/quick-start"><div class="card-icon">⚡</div><div class="card-title">Quick start</div><div class="card-desc">Three ways to feel the engine in five minutes.</div></a>
  <a class="card" href="/merchants/overview"><div class="card-icon">🏬</div><div class="card-title">For merchants</div><div class="card-desc">Plans, customers, invoices, and analytics.</div></a>
  <a class="card" href="/developer/webhooks"><div class="card-icon">🔔</div><div class="card-title">Webhooks</div><div class="card-desc">Subscribe once, receive every domain event forever.</div></a>
</div>
`,
  },

  "the-team": {
    eyebrow: "Get started",
    title: "The team",
    lede: "Built by people who'd already lost a weekend to a billing cron job before deciding to fix it properly.",
    body: `
<p>The Nomba Subscription Engine started as an internal frustration, not a product brief. A small backend team kept getting pulled off feature work to patch the same recurring-billing gaps — a webhook that silently stopped firing, a customer who wanted to pause instead of cancel and had no way to do it, a Friday-night card decline nobody saw until Monday. Each fix was reasonable on its own. Together they were a second product nobody had budgeted for.</p>
<p>So the team stopped patching and built the thing properly: a real subscription lifecycle instead of a status column, an event store instead of three different write paths for webhooks and analytics, and a recovery flow that reaches a customer on the channel they actually check instead of an email that sits unread.</p>

<h2 id="h-builders">The builders</h2>
<div class="card-grid cols-2">
  <div class="card"><div class="card-icon">🧭</div><div class="card-title">Engineering lead</div><div class="card-desc">Owns the subscription lifecycle and the event store — the two pieces everything else is built on top of.</div></div>
  <div class="card"><div class="card-icon">💳</div><div class="card-title">Payments engineer</div><div class="card-desc">Owns the Nomba integration — Checkout, Tokenised Cards, Charge, and Transfers — and the reconciliation logic that sits on top of it.</div></div>
  <div class="card"><div class="card-icon">🔁</div><div class="card-title">Recovery & notifications engineer</div><div class="card-desc">Owns dunning: the retry schedule, the grace period, and the WhatsApp/SMS/USSD orchestration that decides who gets contacted, how, and when.</div></div>
  <div class="card"><div class="card-icon">📊</div><div class="card-title">Platform engineer</div><div class="card-desc">Owns analytics, audit logging, and the webhook delivery pipeline — the parts merchants and integrators trust the platform on.</div></div>
</div>

<h2 id="h-why">Why this exists</h2>
<p>Most subscription tooling available to a Nigerian business is either a raw set of payment primitives — tokenised cards, a charge endpoint — that still leaves the billing logic, the recovery logic, and the reporting to be built from scratch, or a subscription platform built for a market where a customer is more reliably reached by email than by WhatsApp, SMS, or a USSD code. Neither fits a business collecting recurring naira payments from customers who live on their phones, not their inboxes.</p>
<p>This platform is the version built for that reality: recurring billing that works the way payment behaviour actually works here, and recovery that reaches people on the rails they're already using.</p>

<div class="callout note"><div class="ic">ⓘ</div><p>This page is a placeholder for the real team — names, roles, and the actual story of why this got built. Replace it with the real thing.</p></div>

<h2 id="h-next">What to read next</h2>
<div class="card-grid cols-2">
  <a class="card" href="/mission"><div class="card-icon">🎯</div><div class="card-title">The mission</div><div class="card-desc">The objectives behind the build, and what's explicitly out of scope.</div></a>
  <a class="card" href="/how-it-works"><div class="card-icon">🧭</div><div class="card-title">How it works</div><div class="card-desc">The full arc, end to end.</div></a>
</div>
`,
  },

  "how-it-works": {
    eyebrow: "Get started",
    title: "How it works",
    lede: "A merchant creates a plan. A customer subscribes. Nomba collects the charge. If it fails, recovery kicks in. The whole arc, end to end, in one page.",
    body: `
<p>Adaeze runs Lumen, a fitness app charging ₦15,000 a month. She needs three things from a billing system: get paid on time, don't lose a member to a card that quietly expired, and know at a glance whether the business is growing or leaking. Here's what happens on the Subscription Engine, from the moment she defines a plan to the moment a failed charge recovers itself.</p>

<div class="flow">
  <div class="flow-node accent">1. Merchant creates a plan</div><div class="flow-arrow">→</div>
  <div class="flow-node">2. Customer subscribes<br>(card tokenised via Checkout)</div><div class="flow-arrow">→</div>
  <div class="flow-node">3. Billing cycle fires</div><div class="flow-arrow">→</div>
  <div class="flow-node accent">4. Charge attempted via Nomba</div><div class="flow-arrow">→</div>
  <div class="flow-node accent2">5a. Success: invoice paid, event stored</div>
  <div class="flow-node">5b. Failure: past_due → grace period</div><div class="flow-arrow">→</div>
  <div class="flow-node">6. Recovery fires on WhatsApp / SMS / USSD</div><div class="flow-arrow">→</div>
  <div class="flow-node accent2">7. Recovered — subscription returns to active</div>
</div>

<h2 id="h-plan">1. Adaeze creates a plan</h2>
<div class="steps">
  <div class="step"><div class="step-num">1</div><div class="step-body"><div class="step-title">She opens the merchant dashboard</div><p>Signed up last week with her work email, verified, and landed in the plans screen with an empty state.</p></div></div>
  <div class="step"><div class="step-num">2</div><div class="step-body"><div class="step-title">She fills in the plan</div><p>Name: "Lumen Monthly." Price: ₦15,000. Interval: monthly. Trial: 7 days. Submit.</p></div></div>
  <div class="step"><div class="step-num">3</div><div class="step-body"><div class="step-title">The plan is live</div><p>It shows up wherever her app reads plans from the API — no redeploy needed on her end.</p></div></div>
</div>
<p class="body-secondary">See <a href="/merchants/create-a-plan">Create a plan</a> for the full field list, including quarterly, yearly, and custom intervals.</p>

<h2 id="h-subscribe">2. A customer subscribes</h2>
<p>A new member opens Lumen's app, picks the monthly plan, and enters a card. Lumen's app calls the Subscription Engine, which hands back a Nomba Checkout session. The customer completes card entry inside that session — the raw card number never touches Lumen's servers or the Subscription Engine's. Nomba tokenises the card and returns a reference. That reference is what gets charged on every future billing cycle; nobody re-enters card details again unless the card itself changes.</p>

<h2 id="h-cycle">3. The billing cycle fires</h2>
<p>Seven days later, the trial ends and the first billing cycle starts. The subscription is <code class="inline">trialing</code> right up until that moment, then flips to <code class="inline">active</code> as the first charge attempt begins.</p>

<h2 id="h-charge">4. The charge runs against Nomba</h2>
<p>The billing engine calls Nomba's Charge API with the stored token. Two branches from here.</p>

<h2 id="h-success">5a. It succeeds</h2>
<p>An invoice is marked paid with line-item detail. An <code class="inline">InvoicePaid</code> event writes to the event store. Adaeze's MRR ticks up by ₦15,000 the next time she opens her analytics — no batch job to wait on, since analytics reads the same event store the webhook pipeline does.</p>

<h2 id="h-failure">5b. It fails</h2>
<p>Say the member's card expired last week and they haven't noticed. Nomba returns a decline. The subscription transitions to <code class="inline">past_due</code>, a grace period starts, and a <code class="inline">PaymentFailed</code> event writes to the event store in the same motion. Nothing here is a cron job scanning for failures after the fact — the failure and the state transition happen atomically, in the same request.</p>

<h2 id="h-recovery">6. Recovery fires — on the channel that actually reaches them</h2>
<p>Within minutes, not days, the recovery-orchestration component sends a WhatsApp message: <em>"Your Lumen Monthly payment of ₦15,000 didn't go through. [Retry Now] [Pause Subscription] [Downgrade Plan]."</em> The member taps <strong>Retry Now</strong>. Their reply is read directly — no separate app, no login. If they don't have WhatsApp, the same message goes out as an SMS: <em>"Lumen: payment of ₦15,000 failed. Reply YES to retry."</em> If neither channel gets a response inside the grace period, a USSD-based nudge and the customer portal remain available as a self-serve fallback.</p>

<div class="callout note"><div class="ic">ⓘ</div><p>The developer maintaining Lumen's backend doesn't have to poll for any of this. A <code class="inline">repayment.failed</code> webhook fired the moment the charge failed; a <code class="inline">repayment.settled</code> webhook will fire the moment recovery succeeds. See <a href="/developer/webhooks">Webhooks</a>.</p></div>

<h2 id="h-recovered">7. The subscription recovers</h2>
<p>The retried charge succeeds. The subscription transitions back to <code class="inline">active</code>. A new invoice is marked paid. A <code class="inline">PaymentRecovered</code> event writes to the event store, and Adaeze's dashboard shows the recovery in her dunning metrics the next time she looks — no manual reconciliation, no spreadsheet.</p>

<h2 id="h-loop">The loop, closed</h2>
<p>Every one of these steps — plan created, card tokenised, charge attempted, event stored, message sent, webhook delivered — traces back to the same event store. That's what makes the analytics trustworthy and the webhook replay reliable: there's one write path, read three different ways.</p>

<div class="card-grid cols-3">
  <a class="card" href="/merchants/overview"><div class="card-icon">🏬</div><div class="card-title">Merchants</div><div class="card-desc">Plans, billing, and analytics from the operator's side.</div></a>
  <a class="card" href="/subscribers/overview"><div class="card-icon">🙋</div><div class="card-title">Subscribers</div><div class="card-desc">The portal and the recovery experience from the customer's side.</div></a>
  <a class="card" href="/developer/webhooks"><div class="card-icon">🔔</div><div class="card-title">Developers</div><div class="card-desc">The events that let you build on top of any of this.</div></a>
</div>
`,
  },

  "quick-start": {
    eyebrow: "Get started",
    title: "Quick start",
    lede: "Three ways to feel the engine in five minutes. Create a plan, break a payment on purpose, replay a webhook.",
    body: `
<p>Pick one of these and go. Each takes about five minutes and shows a different side of the platform.</p>

<div class="card-grid cols-1">
  <div class="card"><div class="card-icon">📝</div><div class="card-title">Create a plan and subscribe a test customer</div><div class="card-desc">
    Sign up at the merchant dashboard, verify your email, and land in an empty plans screen. Create a plan — name, price, interval, optional trial — and grab your sandbox API key from Settings → API Keys.<br><br>
    Then create a test customer and subscription against the sandbox:
    <pre><code>curl -X POST https://api.nomba-subscriptions.com/subscriptions \\
  -H "Authorization: Bearer nse_sandbox_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "customerId": "cus_test_01",
    "planId": "plan_lumen_monthly",
    "paymentMethod": "tok_test_visa_4242"
  }'</code></pre>
    You'll get back a subscription in <code class="inline">trialing</code> or <code class="inline">active</code> state, depending on whether the plan has a trial.
  </div></div>
</div>

<div class="card-grid cols-1">
  <div class="card"><div class="card-icon">🔁</div><div class="card-title">Break a payment on purpose and watch recovery fire</div><div class="card-desc">
    Sandbox card tokens include one that always declines: <code class="inline">tok_test_visa_decline</code>. Subscribe a test customer with it, then trigger a billing cycle manually:
    <pre><code>curl -X POST https://api.nomba-subscriptions.com/subscriptions/sub_test_01/charge-now \\
  -H "Authorization: Bearer nse_sandbox_..."</code></pre>
    The subscription flips to <code class="inline">past_due</code>, a <code class="inline">PaymentFailed</code> event lands in the event store, and — if you've configured a sandbox WhatsApp or SMS number on the test customer — a recovery message fires within a minute. Reply, or hit the retry endpoint yourself, and watch the subscription return to <code class="inline">active</code>.
  </div></div>
</div>

<div class="card-grid cols-1">
  <div class="card"><div class="card-icon">🔔</div><div class="card-title">Subscribe a webhook and pull analytics</div><div class="card-desc">
    Point a webhook at a throwaway URL (<a href="https://webhook.site" target="_blank" rel="noreferrer">webhook.site</a> works well for this) and subscribe to the events from the first two steps:
    <pre><code>curl -X POST https://api.nomba-subscriptions.com/webhooks \\
  -H "Authorization: Bearer nse_sandbox_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://webhook.site/your-id",
    "events": ["invoice.paid", "payment.failed", "payment.recovered"]
  }'</code></pre>
    Then fetch your merchant analytics snapshot:
    <pre><code>curl https://api.nomba-subscriptions.com/analytics/metrics \\
  -H "Authorization: Bearer nse_sandbox_..."</code></pre>
    You'll see MRR, churn, and recovery rate computed from the exact same event store your webhook just read from.
  </div></div>
</div>

<h2 id="h-next">What's next</h2>
<div class="card-grid cols-2">
  <a class="card" href="/how-it-works"><div class="card-icon">🧭</div><div class="card-title">How it works</div><div class="card-desc">The full arc, end to end, with the reasoning behind each step.</div></a>
  <a class="card" href="/concepts/subscription-lifecycle"><div class="card-icon">🔄</div><div class="card-title">Subscription lifecycle</div><div class="card-desc">All eight states, and what moves a subscription between them.</div></a>
  <a class="card" href="/developer/webhooks"><div class="card-icon">🔔</div><div class="card-title">Webhooks</div><div class="card-desc">Every event type, payload shape, and signature verification.</div></a>
  <a class="card" href="/merchants/analytics"><div class="card-icon">📊</div><div class="card-title">Analytics</div><div class="card-desc">MRR, churn, recovery rate, and where each number comes from.</div></a>
</div>
`,
  },

  "mission": {
    eyebrow: "Get started",
    title: "The mission",
    lede: "Five business objectives. Six things deliberately left out of this release.",
    body: `
<p>This page is the contract: what the platform commits to solving, and what it explicitly doesn't try to solve yet. Both halves matter — the second one is what keeps the first one honest.</p>

<h2 id="h-objectives">The objectives</h2>
<div class="card-grid cols-2">
  <div class="card"><div class="card-icon">🧱</div><div class="card-title">Remove the need to build billing in-house</div><div class="card-desc">A merchant should never need to write their own recurring-charge cron job, invoice generator, or proration logic.</div></div>
  <div class="card"><div class="card-icon">🔁</div><div class="card-title">Reduce revenue lost to failed payments</div><div class="card-desc">Structured, multi-channel recovery instead of a single retry-and-forget email.</div></div>
  <div class="card"><div class="card-icon">📱</div><div class="card-title">Reach subscribers where they actually are</div><div class="card-desc">Web and app aren't the only channels that matter. SMS and USSD keep working when data doesn't.</div></div>
  <div class="card"><div class="card-icon">📊</div><div class="card-title">Give merchants operational visibility</div><div class="card-desc">Revenue, churn, and recovery performance, without a separate BI project.</div></div>
</div>
<div class="card-grid cols-1">
  <div class="card"><div class="card-icon">📘</div><div class="card-title">Provide a stable, well-documented integration surface</div><div class="card-desc">Downstream developers should be able to integrate from documentation alone — no support ticket required for a standard integration.</div></div>
</div>

<h2 id="h-outofscope">Explicitly out of scope, this release</h2>
<p>Each of these was a deliberate line, not an oversight.</p>
<table>
  <tr><th>Not in scope</th><th>Why</th></tr>
  <tr><td>Full KYC / compliance workflows</td><td>Customers are assumed pre-verified via Nomba. This platform doesn't re-run identity verification.</td></tr>
  <tr><td>Tax calculation and invoicing compliance (VAT, WHT)</td><td>Left to the merchant's own accounting, for now.</td></tr>
  <tr><td>Multi-currency settlement beyond NGN</td><td>Including FX-aware proration — a real problem, just not this release's problem.</td></tr>
  <tr><td>Native mobile apps</td><td>Web dashboard, web portal, USSD, and WhatsApp/SMS channels only.</td></tr>
  <tr><td>Granular, per-feature role permissioning</td><td>Owner and Team Member is the whole permission model at v1 — no custom role builder yet.</td></tr>
</table>

<div class="callout note"><div class="ic">ⓘ</div><p>None of these are "never." They're "not yet, and saying so beats pretending otherwise."</p></div>

<h2 id="h-next">What to read next</h2>
<div class="card-grid cols-2">
  <a class="card" href="/the-team"><div class="card-icon">👥</div><div class="card-title">The team</div><div class="card-desc">Who's building this and why.</div></a>
  <a class="card" href="/how-it-works"><div class="card-icon">🧭</div><div class="card-title">How it works</div><div class="card-desc">The objectives above, made concrete.</div></a>
</div>
`,
  },

  "merchants/overview": {
    eyebrow: "For merchants",
    title: "For merchants",
    lede: "Stop building billing logic in-house. Plans, customers, invoices, recovery, and analytics — one API, one dashboard.",
    body: `
<p>Adaeze's first version of Lumen's billing was a cron job and a spreadsheet. It worked until it didn't — a card would fail silently, a member would want to pause instead of cancel and have no way to ask for that, and every month-end she'd manually add up payments in a separate tab to guess at revenue. None of that is a Lumen-specific problem. It's what happens when recurring billing is treated as a feature instead of a system.</p>
<p>Here's what you can actually do.</p>

<div class="card-grid cols-2">
  <a class="card" href="/merchants/create-a-plan"><div class="card-icon">📝</div><div class="card-title">Create a plan</div><div class="card-desc">Name, price, interval — monthly, quarterly, yearly, or custom — with optional trial support.</div></a>
  <a class="card" href="/merchants/onboard-and-collect-payment"><div class="card-icon">💳</div><div class="card-title">Onboard a customer</div><div class="card-desc">Tokenise a card once via Nomba Checkout. Charge it automatically on every billing cycle after.</div></a>
  <a class="card" href="/merchants/billing-and-invoicing"><div class="card-icon">🧾</div><div class="card-title">Billing & invoicing</div><div class="card-desc">Invoices generate themselves. Proration handles upgrades and downgrades mid-cycle.</div></a>
  <a class="card" href="/merchants/team-and-roles"><div class="card-icon">🔐</div><div class="card-title">Team & roles</div><div class="card-desc">Bring on a Team Member for day-to-day support without handing over API keys.</div></a>
  <a class="card" href="/merchants/analytics"><div class="card-icon">📊</div><div class="card-title">Analytics</div><div class="card-desc">MRR, churn, recovery rate, and plan performance — computed on demand, always current.</div></a>
</div>

<h2 id="h-why">Why this works</h2>
<p><strong>One: your subscribers manage themselves.</strong> Pause, cancel, resume, update a card — all from the customer portal, authenticated separately from your merchant account. None of it lands in your support queue unless something's genuinely gone wrong.</p>
<p><strong>Two: a failed payment isn't a lost customer by default.</strong> The moment a charge fails, recovery starts on whichever channel actually reaches that subscriber — WhatsApp, SMS, or USSD — inside the grace period, not after someone happens to check a report.</p>

<h2 id="h-surfaces">Where you work</h2>
<table>
  <tr><th>Surface</th><th>What you do there</th></tr>
  <tr><td><strong>Merchant dashboard</strong></td><td>Create plans, manage customers, watch analytics, configure webhooks, rotate API keys, manage your team.</td></tr>
  <tr><td><strong>API</strong></td><td>Everything the dashboard does, programmatically — for merchants embedding subscription management into their own product.</td></tr>
  <tr><td><strong>Audit log</strong></td><td>Every material action — plan changes, API key rotation, webhook configuration — recorded and queryable.</td></tr>
</table>

<h2 id="h-start">Where to start</h2>
<p>If you're new, start with <a href="/merchants/create-a-plan">Create a plan</a>. If you already have plans and want to know how money actually moves, go to <a href="/merchants/billing-and-invoicing">Billing & invoicing</a>.</p>
`,
  },

  "merchants/create-a-plan": {
    eyebrow: "For merchants",
    title: "Create a plan",
    lede: "Name, price, interval, trial. From an idea for a pricing tier to something a customer can subscribe to.",
    body: `
<p>A plan is the thing a customer actually subscribes to. Everything downstream — the billing cycle, the invoice amount, the proration math on an upgrade — reads from the plan definition. Get this right once and the rest of the lifecycle takes care of itself.</p>

<h2 id="h-fields">What a plan needs</h2>
<table>
  <tr><th>Field</th><th>What goes in</th></tr>
  <tr><td><strong>Name</strong></td><td>"Lumen Monthly," "Pro Annual" — whatever your customers will recognise on their statement and in the portal.</td></tr>
  <tr><td><strong>Price</strong></td><td>The amount charged per billing cycle, in your settlement currency.</td></tr>
  <tr><td><strong>Interval</strong></td><td>Monthly, quarterly, yearly, or a custom interval you define.</td></tr>
  <tr><td><strong>Trial period</strong></td><td>Optional. Days before the first charge fires. A subscription sits in <code class="inline">trialing</code> for this window.</td></tr>
</table>

<h2 id="h-create">Creating one</h2>
<div class="steps">
  <div class="step"><div class="step-num">1</div><div class="step-body"><div class="step-title">Dashboard: Plans → New plan</div><p>Fill in the fields above. Submit.</p></div></div>
  <div class="step"><div class="step-num">2</div><div class="step-body"><div class="step-title">Or via the API</div><p><pre><code>curl -X POST https://api.nomba-subscriptions.com/plans \\
  -H "Authorization: Bearer nse_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Lumen Monthly",
    "amount": 1500000,
    "currency": "NGN",
    "interval": "monthly",
    "trialDays": 7
  }'</code></pre></p></div></div>
  <div class="step"><div class="step-num">3</div><div class="step-body"><div class="step-title">It's live immediately</div><p>Any customer you subscribe against this plan ID picks up these terms. No redeploy, no propagation delay.</p></div></div>
</div>
<p class="body-secondary">Amounts are handled in the smallest currency unit (kobo, for NGN) end to end — the API never accepts or returns a decimal naira amount, to avoid rounding drift across proration and refunds.</p>

<h2 id="h-update">Updating and retiring a plan</h2>
<p>You can update a plan's name and description freely. Changing the price or interval on an existing plan does <strong>not</strong> retroactively change what active subscribers on that plan are charged — existing subscriptions keep their original terms until they're explicitly migrated to a new plan. This is intentional: silently changing what someone already agreed to pay is the kind of thing that should require an explicit action, not a side effect of an unrelated edit.</p>
<p>Deactivating a plan stops new subscriptions from being created against it. Existing subscriptions on a deactivated plan continue to bill normally.</p>

<h2 id="h-next">Next</h2>
<div class="card-grid cols-2">
  <a class="card" href="/merchants/onboard-and-collect-payment"><div class="card-icon">💳</div><div class="card-title">Onboard a customer</div><div class="card-desc">Subscribe someone to the plan you just created.</div></a>
  <a class="card" href="/concepts/subscription-lifecycle"><div class="card-icon">🔄</div><div class="card-title">Subscription lifecycle</div><div class="card-desc">What state a subscription moves through after it's created.</div></a>
</div>
`,
  },

  "merchants/billing-and-invoicing": {
    eyebrow: "For merchants",
    title: "Billing & invoicing",
    lede: "Invoices generate themselves. Charges fire themselves. Proration does the maths so you don't have to.",
    body: `
<p>Here's the thing most new merchants are surprised by: after a subscription is created, you don't tap anything. The billing cycle runs on its own, an invoice generates itself with line-item detail, a charge fires against the stored card, and the outcome — paid or failed — writes to the event store automatically. Your job is to watch the dashboard, not operate it.</p>

<h2 id="h-cycle">How a billing cycle runs</h2>
<div class="steps">
  <div class="step"><div class="step-num">1</div><div class="step-body"><div class="step-title">The cycle boundary arrives</div><p>Determined by the plan's interval and the subscription's anchor date — the date the subscription first went active.</p></div></div>
  <div class="step"><div class="step-num">2</div><div class="step-body"><div class="step-title">An invoice generates</div><p>Line items reflect the plan price, plus any proration from a mid-cycle change (see below).</p></div></div>
  <div class="step"><div class="step-num">3</div><div class="step-body"><div class="step-title">A charge attempt fires</div><p>Against the tokenised card on file, via Nomba's Charge API.</p></div></div>
  <div class="step"><div class="step-num">4</div><div class="step-body"><div class="step-title">The outcome writes to the event store</div><p>Success → <code class="inline">InvoicePaid</code>. Failure → <code class="inline">PaymentFailed</code>, and the subscription moves to <code class="inline">past_due</code>. See <a href="/concepts/subscription-lifecycle">Subscription lifecycle</a>.</p></div></div>
</div>

<h2 id="h-proration">Proration on plan changes</h2>
<p>A customer upgrades from "Lumen Monthly" to "Lumen Pro" halfway through a billing cycle. Rather than charging the full new price immediately or waiting until the next cycle, the engine prorates: credits the unused portion of the old plan, charges the prorated cost of the new one for the remainder of the current cycle, and the next full cycle bills at the new plan's full price.</p>
<div class="callout note"><div class="ic">ⓘ</div><p>The same logic runs in reverse for a downgrade — the difference just shows up as a credit against the next invoice rather than an immediate charge.</p></div>

<h2 id="h-attempts">Every attempt, tracked</h2>
<p>Every charge attempt — successful or failed — is recorded as a payment attempt, linked to its invoice and its subscription. If a charge fails and later recovers through dunning, you see both attempts on the same invoice, in order, not just the final outcome. This is what makes a support conversation ("why was I charged twice") answerable from the dashboard instead of an escalation to engineering.</p>

<h2 id="h-failure">When a charge fails</h2>
<p>The subscription transitions to <code class="inline">past_due</code>, a grace period begins, and recovery starts on the subscriber's preferred channel. None of this requires you to do anything — it's the same mechanism covered in <a href="/how-it-works">How it works</a> and detailed in <a href="/concepts/recovery-orchestration">Recovery orchestration</a>.</p>

<h2 id="h-next">Next</h2>
<div class="card-grid cols-2">
  <a class="card" href="/concepts/subscription-lifecycle"><div class="card-icon">🔄</div><div class="card-title">Subscription lifecycle</div><div class="card-desc">The full state machine, including grace periods and suspension.</div></a>
  <a class="card" href="/merchants/analytics"><div class="card-icon">📊</div><div class="card-title">Analytics</div><div class="card-desc">How billing outcomes roll up into MRR, churn, and recovery rate.</div></a>
</div>
`,
  },

  "subscribers/overview": {
    eyebrow: "For subscribers",
    title: "For subscribers",
    lede: "View it. Pause it. Cancel it. Fix a failed card. Without emailing the merchant and waiting.",
    body: `
<p>If you're paying for something on the Nomba Subscription Engine — a fitness app, a SaaS tool, a media subscription — this is the side built for you. You shouldn't have to email a merchant and wait to pause a subscription you're not using this month, and you shouldn't find out your card expired only when the app stops working.</p>

<div class="card-grid cols-2">
  <a class="card" href="/subscribers/manage-your-subscription"><div class="card-icon">⚙️</div><div class="card-title">Manage your subscription</div><div class="card-desc">View your plan, pause, resume, cancel, or update your payment method — from the portal, on your own time.</div></a>
  <a class="card" href="/subscribers/when-a-payment-fails"><div class="card-icon">🔁</div><div class="card-title">When a payment fails</div><div class="card-desc">What happens the moment a charge doesn't go through, and how to fix it in one reply.</div></a>
</div>

<h2 id="h-why">Why this matters</h2>
<p>The usual failure mode for a subscription isn't a customer deciding to leave — it's a card quietly expiring and nobody noticing until access is already cut off. That's not a decision to churn, it's a support gap. Recovery on this platform is built to close that gap fast: a message reaches you inside minutes of a failed charge, on WhatsApp if you have it, SMS if you don't, with a one-tap or one-reply way to fix it.</p>

<h2 id="h-channels">How you reach your subscription</h2>
<table>
  <tr><th>Channel</th><th>What you can do</th></tr>
  <tr><td><strong>Web portal</strong></td><td>Full self-service: view, pause, resume, cancel, update payment method.</td></tr>
  <tr><td><strong>WhatsApp</strong></td><td>Act on a failed-charge message directly — Retry Now, Pause, or Downgrade.</td></tr>
  <tr><td><strong>SMS</strong></td><td>Reply YES to retry a failed charge. No app required.</td></tr>
  <tr><td><strong>USSD</strong></td><td>Check status, pause, or cancel by dialling a short code — no data connection needed.</td></tr>
</table>

<h2 id="h-start">Where to start</h2>
<p>If you're already subscribed and just want to make a change, go to <a href="/subscribers/manage-your-subscription">Manage your subscription</a>. If a payment failed and you got a message, see <a href="/subscribers/when-a-payment-fails">When a payment fails</a>.</p>
`,
  },

  "subscribers/manage-your-subscription": {
    eyebrow: "For subscribers",
    title: "Manage your subscription",
    lede: "Everything you can do from the portal, and why it doesn't touch the merchant's dashboard to do it.",
    body: `
<p>The customer portal is authenticated separately from the merchant's dashboard — your login has nothing to do with the merchant's account, and nothing you do here requires them to act on it. That separation is deliberate: a subscription is yours to manage, not a request you file with someone else.</p>

<h2 id="h-actions">What you can do</h2>
<div class="card-grid cols-2">
  <div class="card"><div class="card-icon">👀</div><div class="card-title">View your subscription</div><div class="card-desc">Current plan, price, next billing date, and payment history.</div></div>
  <div class="card"><div class="card-icon">⏸️</div><div class="card-title">Pause</div><div class="card-desc">Stop billing without cancelling outright. Resume whenever you're ready.</div></div>
  <div class="card"><div class="card-icon">▶️</div><div class="card-title">Resume</div><div class="card-desc">Billing picks back up on your original cycle date.</div></div>
  <div class="card"><div class="card-icon">✋</div><div class="card-title">Cancel</div><div class="card-desc">Ends the subscription. What happens to the current billing period depends on the merchant's cancellation policy.</div></div>
</div>
<div class="card-grid cols-1">
  <div class="card"><div class="card-icon">💳</div><div class="card-title">Update your payment method</div><div class="card-desc">Your card expired, or you just want to switch which one gets charged. The new card is tokenised the same way as at signup — the portal never sees or stores the raw card number.</div></div>
</div>

<h2 id="h-signin">Signing in</h2>
<p>Phone or email plus a one-time code — no separate password to lose. The portal recognises you by the identity the merchant registered you under at signup.</p>

<h2 id="h-pause-vs-cancel">Pause vs. cancel</h2>
<p>Pausing is the better move if you just don't need the service this month but expect to come back — no re-onboarding, no re-entering a card, billing resumes exactly where it left off. Cancelling ends things properly; if you change your mind later, you subscribe again as a new signup.</p>

<div class="callout tip"><div class="ic">💡</div><p>If the only reason you're thinking about cancelling is a failed payment you haven't gotten around to fixing, updating your payment method is usually the faster path back to normal — see <a href="/subscribers/when-a-payment-fails">When a payment fails</a>.</p></div>

<h2 id="h-next">Next</h2>
<div class="card-grid cols-2">
  <a class="card" href="/subscribers/when-a-payment-fails"><div class="card-icon">🔁</div><div class="card-title">When a payment fails</div><div class="card-desc">The recovery flow, from your side.</div></a>
  <a class="card" href="/channels/ussd"><div class="card-icon">☎️</div><div class="card-title">USSD</div><div class="card-desc">Manage your subscription without a data connection.</div></a>
</div>
`,
  },

  "subscribers/when-a-payment-fails": {
    eyebrow: "For subscribers",
    title: "When a payment fails",
    lede: "A card fails. A message arrives on WhatsApp before you even notice. Here's the whole recovery path.",
    body: `
<p>Your card expired last week and you hadn't gotten around to updating it. On your next billing date, the charge fails quietly — you don't feel anything happen. What happens next is the part most billing systems get wrong, and the part this one is built around.</p>

<h2 id="h-flow">What happens, in order</h2>
<div class="steps">
  <div class="step"><div class="step-num">1</div><div class="step-body"><div class="step-title">The charge fails</div><p>Your subscription enters a grace period — you're not cut off immediately.</p></div></div>
  <div class="step"><div class="step-num">2</div><div class="step-body"><div class="step-title">A message reaches you, fast</div><p>Inside minutes, not days. WhatsApp if you have it: <em>"Your Lumen Monthly payment of ₦15,000 didn't go through. [Retry Now] [Pause Subscription] [Downgrade Plan]."</em></p></div></div>
  <div class="step"><div class="step-num">3</div><div class="step-body"><div class="step-title">You act, in one tap or one reply</div><p>Tap <strong>Retry Now</strong> if your card is fine and it was a fluke. Update your card in the portal first if it's expired, then retry. No WhatsApp? The same message reaches you by SMS: <em>"Reply YES to retry."</em></p></div></div>
  <div class="step"><div class="step-num">4</div><div class="step-body"><div class="step-title">It recovers</div><p>The retried charge succeeds, your subscription returns to normal, and nothing about your access was ever silently revoked mid-conversation.</p></div></div>
</div>

<h2 id="h-options">Your three options on a failed charge</h2>
<table>
  <tr><th>Option</th><th>What it does</th></tr>
  <tr><td><strong>Retry Now</strong></td><td>Attempts the same charge again immediately — the right choice if the card is fine and it was a temporary decline.</td></tr>
  <tr><td><strong>Pause Subscription</strong></td><td>Stops billing without cancelling. Good if you need a break, not a card fix.</td></tr>
  <tr><td><strong>Downgrade Plan</strong></td><td>Switches to a cheaper plan if the price, not the card, is the actual issue.</td></tr>
</table>

<h2 id="h-noresponse">If you don't respond</h2>
<p>The grace period gives you time. If it lapses without a successful retry, the subscription moves to <code class="inline">suspended</code> rather than being cancelled outright — you can still come back and fix it from the portal without starting over as a new signup. See <a href="/concepts/subscription-lifecycle">Subscription lifecycle</a> for the exact state progression.</p>

<div class="callout note"><div class="ic">ⓘ</div><p>You'll never be asked to reply with your full card number over WhatsApp or SMS. Updating a card always happens through the portal's secure checkout, never a chat message.</p></div>

<h2 id="h-next">Next</h2>
<div class="card-grid cols-2">
  <a class="card" href="/subscribers/manage-your-subscription"><div class="card-icon">⚙️</div><div class="card-title">Manage your subscription</div><div class="card-desc">Update your card before the next cycle, and avoid this altogether.</div></a>
  <a class="card" href="/concepts/recovery-orchestration"><div class="card-icon">🧭</div><div class="card-title">Recovery orchestration</div><div class="card-desc">How the system decides which channel to try, and in what order.</div></a>
</div>
`,
  },

  "concepts/subscription-lifecycle": {
    eyebrow: "Core concepts",
    title: "Subscription lifecycle",
    lede: "Eight states. One state machine. Why past_due and grace_period are different states, not the same failure twice.",
    body: `
<p>A subscription isn't just "active" or "not active." It moves through a defined state machine, and every transition is explicit — nothing about a subscription's status is inferred after the fact from a pile of payment records. This page is the whole machine.</p>

<h2 id="h-states">The eight states</h2>
<div class="flow">
  <div class="flow-node accent">pending</div><div class="flow-arrow">→</div>
  <div class="flow-node">trialing</div><div class="flow-arrow">→</div>
  <div class="flow-node accent2">active</div><div class="flow-arrow">→</div>
  <div class="flow-node">past_due</div><div class="flow-arrow">→</div>
  <div class="flow-node">grace_period</div><div class="flow-arrow">→</div>
  <div class="flow-node">suspended</div>
</div>
<p class="body-secondary">Plus two terminal states reachable from most points in the flow: <code class="inline">cancelled</code> (subscriber or merchant ends it) and <code class="inline">expired</code> (a fixed-term subscription runs its course).</p>

<table>
  <tr><th>State</th><th>What it means</th></tr>
  <tr><td><code class="inline">pending</code></td><td>Created, not yet activated — usually waiting on card tokenisation to complete.</td></tr>
  <tr><td><code class="inline">trialing</code></td><td>Inside the plan's trial window. No charge has fired yet.</td></tr>
  <tr><td><code class="inline">active</code></td><td>Billing normally. The healthy state.</td></tr>
  <tr><td><code class="inline">past_due</code></td><td>A charge just failed. The clock on the grace period starts here.</td></tr>
  <tr><td><code class="inline">grace_period</code></td><td>Recovery is actively in progress — messages have gone out, retries are expected.</td></tr>
  <tr><td><code class="inline">suspended</code></td><td>The grace period lapsed without recovery. Access is paused, but the subscription record and history are intact.</td></tr>
  <tr><td><code class="inline">cancelled</code></td><td>Ended, by the subscriber or the merchant. Terminal.</td></tr>
  <tr><td><code class="inline">expired</code></td><td>A fixed-term subscription reached its natural end. Terminal.</td></tr>
</table>

<h2 id="h-why-split">Why past_due and grace_period are separate states</h2>
<p>It would be simpler to collapse these into one "payment failed" state. They're kept separate because they mean different things to a merchant reading the dashboard: <code class="inline">past_due</code> is a fact (a charge failed), <code class="inline">grace_period</code> is a process (recovery is actively running, with a defined end). A merchant scanning for subscriptions that need manual attention wants to see the ones where recovery has stalled, not every subscription that's ever had a single failed charge.</p>

<h2 id="h-transitions">What triggers each transition</h2>
<div class="card-grid cols-2">
  <div class="card"><div class="card-icon">✅</div><div class="card-title">trialing → active</div><div class="card-desc">Trial window ends and the first charge succeeds.</div></div>
  <div class="card"><div class="card-icon">❌</div><div class="card-title">active → past_due</div><div class="card-desc">A billing-cycle charge attempt fails.</div></div>
  <div class="card"><div class="card-icon">🔁</div><div class="card-title">past_due → grace_period</div><div class="card-desc">Recovery orchestration picks up the failure and starts sending recovery messages.</div></div>
  <div class="card"><div class="card-icon">🔄</div><div class="card-title">grace_period → active</div><div class="card-desc">A retried charge succeeds — recovery worked.</div></div>
  <div class="card"><div class="card-icon">⛔</div><div class="card-title">grace_period → suspended</div><div class="card-desc">The grace period lapses with no successful retry.</div></div>
  <div class="card"><div class="card-icon">🚪</div><div class="card-title">any → cancelled</div><div class="card-desc">Subscriber cancels from the portal, or a merchant cancels on their behalf.</div></div>
</div>

<h2 id="h-events">Every transition is an event</h2>
<p>Each state change writes a domain event to the <a href="/concepts/event-store">event store</a> — <code class="inline">SubscriptionCreated</code>, <code class="inline">SubscriptionUpdated</code>, <code class="inline">SubscriptionRenewed</code>, <code class="inline">SubscriptionCancelled</code>, <code class="inline">PaymentFailed</code>, <code class="inline">PaymentRecovered</code>. This is what lets webhooks, notifications, and analytics all react to the same state change without needing to poll the subscription record for a diff.</p>

<h2 id="h-next">Next</h2>
<div class="card-grid cols-2">
  <a class="card" href="/concepts/event-store"><div class="card-icon">📒</div><div class="card-title">The event store</div><div class="card-desc">Where every one of these transitions actually lands.</div></a>
  <a class="card" href="/concepts/recovery-orchestration"><div class="card-icon">🧭</div><div class="card-title">Recovery orchestration</div><div class="card-desc">What happens during grace_period, specifically.</div></a>
</div>
`,
  },

  "concepts/event-store": {
    eyebrow: "Core concepts",
    title: "The event store",
    lede: "Every domain event, persisted once, read by webhooks, notifications, and analytics. One source of truth, not three.",
    body: `
<p>Here's a mistake that's easy to make and expensive to unwind: build webhooks against one data path, analytics against another, and notifications against a third. The three drift. A number in a merchant's dashboard stops matching what a webhook reported an hour ago, and nobody can say with confidence which one is right.</p>
<p>The event store exists specifically to prevent that. Every domain event — a subscription created, a payment failed, an invoice paid — is written once, as an immutable, timestamped record. Webhooks, notifications, and analytics all read from this same store. They can disagree about how they present a fact. They cannot disagree about what the fact was.</p>

<h2 id="h-events">What gets written</h2>
<table>
  <tr><th>Event</th><th>Fired when</th></tr>
  <tr><td><code class="inline">SubscriptionCreated</code></td><td>A new subscription is created.</td></tr>
  <tr><td><code class="inline">SubscriptionUpdated</code></td><td>A plan change, pause, or resume happens.</td></tr>
  <tr><td><code class="inline">SubscriptionCancelled</code></td><td>A subscription is cancelled, by either side.</td></tr>
  <tr><td><code class="inline">SubscriptionRenewed</code></td><td>A billing cycle completes and the subscription rolls into the next period.</td></tr>
  <tr><td><code class="inline">PaymentFailed</code></td><td>A charge attempt fails.</td></tr>
  <tr><td><code class="inline">PaymentRecovered</code></td><td>A previously failed charge succeeds on retry.</td></tr>
  <tr><td><code class="inline">InvoicePaid</code></td><td>An invoice is settled in full.</td></tr>
</table>

<h2 id="h-consumers">Three consumers, one store</h2>
<div class="card-grid cols-3">
  <div class="card"><div class="card-icon">🔔</div><div class="card-title">Webhooks</div><div class="card-desc">Every subscribed event is delivered to your endpoint the moment it's written — see <a href="/developer/webhooks">Webhooks</a>.</div></div>
  <div class="card"><div class="card-icon">📣</div><div class="card-title">Notifications</div><div class="card-desc">WhatsApp, SMS, and USSD recovery messages are triggered by the same events, read by the recovery-orchestration component.</div></div>
  <div class="card"><div class="card-icon">📊</div><div class="card-title">Analytics</div><div class="card-desc">MRR, churn, and recovery rate are computed on demand directly from event aggregates — not a separately maintained rollup table that can drift out of sync.</div></div>
</div>

<h2 id="h-immutable">Why it's immutable</h2>
<p>Once an event is written, it isn't edited or deleted. If a later action needs to correct something, it writes a new event that supersedes the old one in effect — the history of what actually happened stays intact either way. This is what makes webhook replay trustworthy: replaying an event from a week ago returns exactly what was true a week ago, not whatever the record has since been edited to say.</p>

<h2 id="h-replay">What immutability buys you</h2>
<ul>
  <li><strong>Reliable webhook replay.</strong> Re-deliver any event by subscription ID or time range, and get back exactly what was originally sent — see <a href="/developer/webhooks">Webhooks</a>.</li>
  <li><strong>Analytics you can trust.</strong> A number in the dashboard is always a live aggregate over real events, not a cached snapshot that might be stale.</li>
  <li><strong>An answerable audit trail.</strong> "What happened to this subscription, and when" has one authoritative answer.</li>
</ul>

<h2 id="h-next">Next</h2>
<div class="card-grid cols-2">
  <a class="card" href="/developer/webhooks"><div class="card-icon">🔔</div><div class="card-title">Webhooks</div><div class="card-desc">Subscribing to events, delivery, retry, and replay.</div></a>
  <a class="card" href="/architecture/data-flow"><div class="card-icon">🔄</div><div class="card-title">Data flow</div><div class="card-desc">The engineering-level view of how an event reaches each consumer.</div></a>
</div>
`,
  },

  "concepts/recovery-orchestration": {
    eyebrow: "Core concepts",
    title: "Recovery orchestration",
    lede: "One component decides which channel reaches a customer first, and what to do when that channel doesn't answer.",
    body: `
<p>Every channel — WhatsApp, SMS, USSD — has its own provider, its own delivery quirks, and its own failure modes. Without a single place that owns the decision of "who gets contacted, how, and in what order," that logic ends up duplicated across every place a failed payment needs to trigger a message. Recovery orchestration is that single place.</p>

<h2 id="h-why-centralized">Why this is centralized, not per-channel</h2>
<p>As recovery channels scale — and WhatsApp, SMS, and USSD are unlikely to be the last three — duplicating fallback logic across each integration point is exactly the kind of thing that quietly rots. One component owning channel selection and fallback means adding a fourth channel later is a change in one place, not a hunt across the codebase for every spot that assumed there were three.</p>

<h2 id="h-decision">The decision, step by step</h2>
<div class="steps">
  <div class="step"><div class="step-num">1</div><div class="step-body"><div class="step-title">A PaymentFailed event lands</div><p>Recovery orchestration picks it up from the event store the moment it's written.</p></div></div>
  <div class="step"><div class="step-num">2</div><div class="step-body"><div class="step-title">The subscriber's channel preference resolves</div><p>WhatsApp if they're reachable there; SMS otherwise. USSD stays available as a subscriber-initiated fallback regardless.</p></div></div>
  <div class="step"><div class="step-num">3</div><div class="step-body"><div class="step-title">A recovery message fires</div><p>Retry Now / Pause Subscription / Downgrade Plan on WhatsApp; a reply-YES-to-retry prompt on SMS.</p></div></div>
  <div class="step"><div class="step-num">4</div><div class="step-body"><div class="step-title">If WhatsApp delivery fails or goes unanswered</div><p>The same message falls back to SMS automatically — the subscriber doesn't need to have done anything differently for this to work.</p></div></div>
  <div class="step"><div class="step-num">5</div><div class="step-body"><div class="step-title">The outcome is logged as a channel event</div><p>Which channel reached the subscriber, and what action they took, feeds directly into recovery-rate reporting broken down by channel.</p></div></div>
</div>

<h2 id="h-degrade">Degrading gracefully</h2>
<p>If WhatsApp or SMS is unreachable — a provider outage, not a subscriber issue — the affected notification jobs are queued and retried rather than failing silently. A merchant should never lose a recovery attempt because a third-party provider had a bad hour; the job comes back and tries again.</p>

<h2 id="h-reporting">What this feeds</h2>
<p>Every recovery attempt — channel used, action taken, outcome — rolls up into the dunning metrics on a merchant's analytics: past-due volume, grace-period volume, recovery rate, and a breakdown by channel showing which one is actually converting for a given customer base.</p>

<h2 id="h-next">Next</h2>
<div class="card-grid cols-2">
  <a class="card" href="/channels/whatsapp"><div class="card-icon">💬</div><div class="card-title">WhatsApp</div><div class="card-desc">The primary recovery channel, in detail.</div></a>
  <a class="card" href="/architecture/queues-and-async"><div class="card-icon">🗂️</div><div class="card-title">Queues & async processing</div><div class="card-desc">How retries and fallbacks are actually scheduled.</div></a>
</div>
`,
  },

  "developer/webhooks": {
    eyebrow: "Developer",
    title: "Webhooks",
    lede: "Subscribe once. Every domain event, delivered with retry, dead-letter handling, and replay by subscription ID or time range.",
    body: `
<p>Efe maintains the backend for a bookkeeping tool that resells access via the Subscription Engine — his product needs to know the moment a customer's subscription lapses, so it can gate a feature, and the moment it recovers, so it can un-gate it. Polling for that would mean a cron job hitting the API on a guess-and-check schedule. Webhooks mean his system reacts within moments of the event actually happening, and never has to guess.</p>

<h2 id="h-events">Event types</h2>
<table>
  <tr><th>Event</th><th>Fires when</th></tr>
  <tr><td><code class="inline">subscription.created</code></td><td>A new subscription is created.</td></tr>
  <tr><td><code class="inline">subscription.updated</code></td><td>A plan change, pause, or resume.</td></tr>
  <tr><td><code class="inline">subscription.cancelled</code></td><td>A subscription is cancelled.</td></tr>
  <tr><td><code class="inline">subscription.renewed</code></td><td>A billing cycle completes successfully.</td></tr>
  <tr><td><code class="inline">invoice.paid</code></td><td>An invoice is settled in full.</td></tr>
  <tr><td><code class="inline">payment.failed</code></td><td>A billing-cycle charge attempt fails.</td></tr>
  <tr><td><code class="inline">payment.recovered</code></td><td>A previously failed charge succeeds on retry.</td></tr>
</table>

<h2 id="h-subscribe">Subscribing</h2>
<pre><code>curl -X POST https://api.nomba-subscriptions.com/webhooks \\
  -H "Authorization: Bearer nse_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://efe-ledgerly.example.com/webhooks/nomba-subs",
    "events": ["payment.failed", "payment.recovered", "subscription.cancelled"]
  }'</code></pre>
<p>Response includes a <code class="inline">secret</code>, shown exactly once. Save it — it's what you'll use to verify every delivery. See <a href="/security/webhook-verification">Webhook signature verification</a>.</p>

<h2 id="h-payload">Payload shape</h2>
<pre><code>{
  "id": "evt_01HMFB...",
  "type": "payment.failed",
  "createdAt": "2026-08-14T11:02:33Z",
  "data": {
    "subscriptionId": "sub_01HMFC...",
    "customerId": "cus_01HMFD...",
    "invoiceId": "inv_01HMFE...",
    "amount": 1500000,
    "currency": "NGN",
    "failureReason": "card_declined"
  },
  "merchantId": "mrc_01HK...",
  "apiVersion": "v1"
}</code></pre>

<h2 id="h-retry">Delivery and retries</h2>
<p>Order is not guaranteed across events for the same subscription — use <code class="inline">createdAt</code> if ordering matters to your handler. On a non-2xx response, we retry with exponential backoff:</p>
<table>
  <tr><th>Attempt</th><th>Delay since last</th></tr>
  <tr><td>1</td><td>30 seconds</td></tr>
  <tr><td>2</td><td>5 minutes</td></tr>
  <tr><td>3</td><td>30 minutes</td></tr>
  <tr><td>4</td><td>2 hours</td></tr>
  <tr><td>5+</td><td>12–24 hours, up to 14 days total</td></tr>
</table>
<p>After 14 days of failed delivery, an event moves to a dead-letter state — visible in your dashboard, and replayable manually once your endpoint is healthy again.</p>

<h2 id="h-replay">Replay</h2>
<p>Request re-delivery of events by subscription ID or by time range — useful after your own outage, or when debugging a handler that silently dropped events during a bad deploy.</p>
<pre><code>curl -X POST https://api.nomba-subscriptions.com/webhooks/replay \\
  -H "Authorization: Bearer nse_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "subscriptionId": "sub_01HMFC...",
    "from": "2026-08-01T00:00:00Z",
    "to": "2026-08-14T00:00:00Z"
  }'</code></pre>
<p>Replayed deliveries carry the same event <code class="inline">id</code> as the original — your idempotency check (below) means reprocessing them is safe by construction, not by convention.</p>

<h2 id="h-idempotency">Idempotency</h2>
<p>Treat every webhook as at-least-once. Store the event <code class="inline">id</code> after successful processing; if you see it again, return 200 without reprocessing. A simple <code class="inline">events_processed(event_id PRIMARY KEY, received_at)</code> table covers almost every case.</p>

<h2 id="h-next">Next</h2>
<div class="card-grid cols-2">
  <a class="card" href="/security/webhook-verification"><div class="card-icon">✔️</div><div class="card-title">Signature verification</div><div class="card-desc">How to confirm a delivery actually came from us.</div></a>
  <a class="card" href="/developer/rate-limits"><div class="card-icon">⏱️</div><div class="card-title">Rate limits</div><div class="card-desc">Throughput on the API side, for when you're not just receiving.</div></a>
</div>
`,
  },

  "developer/authentication": {
    eyebrow: "Developer",
    title: "Authentication",
    lede: "Live and test keys per merchant. Bearer auth, rotation, and what happens the moment a request lands.",
    body: `
<p>Authentication is a bearer token, scoped to a single merchant. Pass it in the <code class="inline">Authorization</code> header on every request:</p>
<pre><code>curl https://api.nomba-subscriptions.com/subscriptions \\
  -H "Authorization: Bearer nse_live_01HKBZ..."</code></pre>

<h2 id="h-format">Key format</h2>
<table>
  <tr><th>Prefix</th><th>Environment</th></tr>
  <tr><td><code class="inline">nse_sandbox_&lt;id&gt;</code></td><td>Sandbox — no real charges ever fire.</td></tr>
  <tr><td><code class="inline">nse_live_&lt;id&gt;</code></td><td>Production.</td></tr>
</table>
<p>A sandbox key against a production endpoint (or vice versa) fails with 401 — there's no accidental cross-environment traffic.</p>

<h2 id="h-getting">Getting a key</h2>
<p>Dashboard → Settings → API Keys, once your merchant account is verified. The full secret is shown exactly once at creation.</p>

<h2 id="h-order">What happens when a request arrives</h2>
<div class="steps">
  <div class="step"><div class="step-num">1</div><div class="step-body"><div class="step-title">Extract the bearer token</div><p>Missing → <code class="inline">401 missing_auth</code>.</p></div></div>
  <div class="step"><div class="step-num">2</div><div class="step-body"><div class="step-title">Hash and look up</div><p>We store a hash of the secret, never the raw value. No match → <code class="inline">401 invalid_auth</code>.</p></div></div>
  <div class="step"><div class="step-num">3</div><div class="step-body"><div class="step-title">Status check</div><p>Revoked or expired keys fail here.</p></div></div>
  <div class="step"><div class="step-num">4</div><div class="step-body"><div class="step-title">Rate limit</div><p>Per-key token bucket. Exceeded → <code class="inline">429 rate_limited</code>. See <a href="/developer/rate-limits">Rate limits</a>.</p></div></div>
  <div class="step"><div class="step-num">5</div><div class="step-body"><div class="step-title">Execute, scoped to your merchantId</div><p>Every resource you can read or write is scoped to your own merchant account — tenant isolation is enforced at this layer, not just in application logic.</p></div></div>
</div>

<h2 id="h-rotate">Rotating a key</h2>
<p>Generate a new key, roll it out to your services, confirm the old key's usage has dropped to zero, then revoke it. If a key leaks, revoke it immediately and generate a fresh one — there's no "un-revoke."</p>

<h2 id="h-next">Next</h2>
<div class="card-grid cols-2">
  <a class="card" href="/developer/webhooks"><div class="card-icon">🔔</div><div class="card-title">Webhooks</div><div class="card-desc">What to subscribe to once you're authenticated.</div></a>
  <a class="card" href="/api-reference/errors"><div class="card-icon">⚠️</div><div class="card-title">Errors</div><div class="card-desc">Every auth-related error code, explained.</div></a>
</div>
`,
  },

  "channels/whatsapp": {
    eyebrow: "Channels",
    title: "WhatsApp",
    lede: "Retry Now, Pause Subscription, Downgrade Plan. A failed charge, three buttons, no phone call.",
    body: `
<p>WhatsApp is the primary recovery channel — the first one recovery orchestration reaches for after a failed charge, ahead of SMS. It's provisioned via Twilio, with production business verification in place.</p>

<h2 id="h-what">What arrives on WhatsApp</h2>
<p>A single scenario, deliberately: a failed-charge notification with three inline actions.</p>
<blockquote>Your Lumen Monthly payment of ₦15,000 didn't go through.<br>[Retry Now] &nbsp; [Pause Subscription] &nbsp; [Downgrade Plan]</blockquote>
<p>The subscriber's tap is read directly and routed to the matching action against the subscription — no additional login, no separate app.</p>

<h2 id="h-actions">The three actions</h2>
<table>
  <tr><th>Action</th><th>What fires</th></tr>
  <tr><td><strong>Retry Now</strong></td><td>Immediately re-attempts the charge against the card on file.</td></tr>
  <tr><td><strong>Pause Subscription</strong></td><td>Moves the subscription to paused — billing stops, access can resume whenever the subscriber's ready.</td></tr>
  <tr><td><strong>Downgrade Plan</strong></td><td>Switches to a lower-priced plan the merchant has configured as a downgrade path, and retries at the new price.</td></tr>
</table>

<h2 id="h-scope">What WhatsApp is, and isn't, used for</h2>
<p>This channel is scoped to dunning — failed-charge notification and the actions above. It is not a general-purpose conversational interface for browsing plans, managing a team, or reading analytics; those live on the web dashboard and portal. Keeping the scope narrow keeps the failure modes narrow too.</p>

<h2 id="h-fallback">When WhatsApp isn't available</h2>
<p>If the subscriber doesn't have WhatsApp, or delivery fails, the same message falls back to <a href="/channels/sms">SMS</a> automatically — see <a href="/concepts/recovery-orchestration">Recovery orchestration</a> for exactly how that decision is made.</p>

<h2 id="h-next">Next</h2>
<div class="card-grid cols-2">
  <a class="card" href="/channels/sms"><div class="card-icon">✉️</div><div class="card-title">SMS</div><div class="card-desc">The fallback channel, and where it's the primary one instead.</div></a>
  <a class="card" href="/subscribers/when-a-payment-fails"><div class="card-icon">🔁</div><div class="card-title">When a payment fails</div><div class="card-desc">The same flow, from the subscriber's side.</div></a>
</div>
`,
  },

  "architecture/overview": {
    eyebrow: "Architecture",
    title: "Architecture",
    lede: "One NestJS API. Postgres for the ledger. Redis and BullMQ for everything that shouldn't block a response.",
    body: `
<p>This is the altitude page — read it once, then drill into any chapter on the left.</p>

<h2 id="h-stack">The stack</h2>
<table>
  <tr><th>Layer</th><th>Technology</th></tr>
  <tr><td>Framework</td><td>NestJS 11, TypeScript</td></tr>
  <tr><td>Database</td><td>PostgreSQL + TypeORM</td></tr>
  <tr><td>Queue / async jobs</td><td>BullMQ + Redis</td></tr>
  <tr><td>Auth</td><td>JWT — access + refresh tokens</td></tr>
  <tr><td>Payments</td><td>Nomba API</td></tr>
  <tr><td>API docs</td><td>Swagger, served at <code class="inline">/docs</code></td></tr>
</table>

<h2 id="h-shape">The shape of the system</h2>
<p>One NestJS process, organised into modules by domain — not a microservice mesh. A request comes in through a controller, runs through service-layer domain logic, and reads or writes through a repository. Anything that shouldn't block the response — a webhook delivery, a dunning retry, invoice generation — goes onto a BullMQ queue backed by Redis instead of running inline.</p>

<div class="flow">
  <div class="flow-node">Merchant / Customer / Developer</div><div class="flow-arrow">→</div>
  <div class="flow-node accent">NestJS API</div><div class="flow-arrow">→</div>
  <div class="flow-node">Postgres (TypeORM)</div>
</div>
<div class="flow" style="margin-top:12px;">
  <div class="flow-node accent">NestJS API</div><div class="flow-arrow">→</div>
  <div class="flow-node accent2">BullMQ / Redis</div><div class="flow-arrow">→</div>
  <div class="flow-node">Webhook delivery · Dunning · Invoicing</div>
</div>

<h2 id="h-domain">The domain model</h2>
<pre><code>merchants
  ├── users (role: owner | team_member)
  ├── api_keys
  ├── plans
  ├── customers
  │     ├── subscriptions
  │           ├── invoices → invoice_items
  │           └── payments → payment_attempts
  ├── transfers
  ├── webhooks → webhook_deliveries
  ├── audit_logs
  └── event_store</code></pre>
<p>Every business entity below <code class="inline">Merchant</code> carries a <code class="inline">merchantId</code> for tenant isolation, enforced at the data-access layer — not only in application code. See <a href="/architecture/modules">Modules</a> for what owns each part of this.</p>

<h2 id="h-decisions">A few deliberate choices</h2>
<table>
  <tr><th>Decision</th><th>Why</th></tr>
  <tr><td>One NestJS monolith, not microservices</td><td>Operational simplicity at this scale. Module boundaries give the same separation of concerns without the deployment overhead.</td></tr>
  <tr><td>Analytics as a read-model over the event store</td><td>One data path means analytics and webhooks can never quietly drift apart from each other.</td></tr>
  <tr><td>Recovery orchestration as one centralized component</td><td>Channel fallback logic (WhatsApp → SMS → USSD) lives in one place, not duplicated at every call site that needs to notify a subscriber.</td></tr>
  <tr><td>BullMQ over inline processing for anything slow or external</td><td>A webhook delivery or a WhatsApp send shouldn't hold open the request that triggered it.</td></tr>
</table>

<h2 id="h-next">What to read next</h2>
<div class="card-grid cols-2">
  <a class="card" href="/architecture/modules"><div class="card-icon">🧩</div><div class="card-title">Modules</div><div class="card-desc">What each of the sixteen modules owns.</div></a>
  <a class="card" href="/architecture/nomba-integration"><div class="card-icon">🔌</div><div class="card-title">Nomba integration</div><div class="card-desc">The four payment surfaces this is built on.</div></a>
  <a class="card" href="/architecture/data-flow"><div class="card-icon">🔄</div><div class="card-title">Data flow</div><div class="card-desc">How one event reaches three consumers.</div></a>
  <a class="card" href="/architecture/resilience"><div class="card-icon">🧱</div><div class="card-title">Resilience & scale</div><div class="card-desc">Async by default, retried with backoff.</div></a>
</div>
`,
  },

  "security/webhook-verification": {
    eyebrow: "Security & trust",
    title: "Webhook signature verification",
    lede: "Every webhook we send is signed. Here's exactly how to verify one, in five languages.",
    body: `
<p>Anyone who knows your webhook URL can POST to it. Signature verification is what lets you tell the difference between an event we actually sent and someone else's request pretending to be one.</p>

<h2 id="h-headers">What arrives with every delivery</h2>
<pre><code>X-Nomba-Subs-Signature: t=1755168153,v1=5d9c8...
X-Nomba-Subs-Webhook-Id: whk_01HMFB...
X-Nomba-Subs-Event-Id: evt_01HMFB...
Content-Type: application/json</code></pre>
<p>The signature header carries two fields: <code class="inline">t</code>, the Unix timestamp when we signed the payload, and <code class="inline">v1</code>, the HMAC-SHA256 of <code class="inline">{timestamp}.{raw_body}</code> using your webhook secret.</p>

<h2 id="h-verify">Verifying, step by step</h2>
<div class="steps">
  <div class="step"><div class="step-num">1</div><div class="step-body"><div class="step-title">Extract t and v1</div><p>Split the header on <code class="inline">,</code> and parse the key=value pairs.</p></div></div>
  <div class="step"><div class="step-num">2</div><div class="step-body"><div class="step-title">Check the timestamp</div><p>Reject if <code class="inline">t</code> is more than 5 minutes off your server's clock — this is replay protection.</p></div></div>
  <div class="step"><div class="step-num">3</div><div class="step-body"><div class="step-title">Compute the expected signature</div><p><code class="inline">HMAC_SHA256(secret, "{t}." + raw_body)</code>, hex-encoded.</p></div></div>
  <div class="step"><div class="step-num">4</div><div class="step-body"><div class="step-title">Compare in constant time</div><p><code class="inline">crypto.timingSafeEqual</code> in Node, <code class="inline">hmac.compare_digest</code> in Python, <code class="inline">hash_equals</code> in PHP, <code class="inline">CryptographicOperations.FixedTimeEquals</code> in C#, <code class="inline">MessageDigest.isEqual</code> in Java. Never plain string equality — timing differences leak information an attacker can use.</p></div></div>
  <div class="step"><div class="step-num">5</div><div class="step-body"><div class="step-title">Process only on a match</div><p>Otherwise return 401 and log the event for investigation.</p></div></div>
</div>

<h2 id="h-node">Node.js</h2>
<pre><code>const crypto = require('crypto');

function verify(rawBody, header, secret) {
  const [tPart, vPart] = header.split(',');
  const t = tPart.split('=')[1];
  const v1 = vPart.split('=')[1];

  if (Math.abs(Date.now() / 1000 - Number(t)) > 300) return false;

  const expected = crypto
    .createHmac('sha256', secret)
    .update(\`\${t}.\${rawBody}\`)
    .digest('hex');

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(v1));
}</code></pre>

<h2 id="h-python">Python</h2>
<pre><code>import hmac, hashlib, time

def verify(raw_body, header, secret):
    parts = dict(p.split("=") for p in header.split(","))
    t, v1 = parts["t"], parts["v1"]

    if abs(time.time() - int(t)) > 300:
        return False

    expected = hmac.new(
        secret.encode(), f"{t}.{raw_body}".encode(), hashlib.sha256
    ).hexdigest()

    return hmac.compare_digest(expected, v1)</code></pre>

<h2 id="h-checklist">Checklist</h2>
<ul>
  <li>✅ Verify the signature on every request. Reject on mismatch.</li>
  <li>✅ Reject events older than 5 minutes.</li>
  <li>✅ Check idempotency using the event <code class="inline">id</code> — deliveries are at-least-once.</li>
  <li>✅ Return 2xx quickly. Push heavy processing to your own queue instead of doing it inline.</li>
  <li>✅ Keep your webhook URL stable — update the subscription before changing DNS, not after.</li>
</ul>

<h2 id="h-next">Next</h2>
<div class="card-grid cols-2">
  <a class="card" href="/developer/webhooks"><div class="card-icon">🔔</div><div class="card-title">Webhooks</div><div class="card-desc">Event types, payload shape, retry behaviour.</div></a>
  <a class="card" href="/security/data-protection"><div class="card-icon">🔐</div><div class="card-title">Data & encryption posture</div><div class="card-desc">What's encrypted at rest, and why.</div></a>
</div>
`,
  },
};

function stubPage(slug: string): PageContent {
  const title = titleFor(slug);
  const desc = DESCRIPTIONS[slug] || "Documentation for this page.";
  const group = groupFor(slug);
  return {
    eyebrow: group ? group.group : "Docs",
    title,
    lede: desc,
    body: `
<div class="stub-badge">Template page — content pending</div>
<p class="body-secondary">This page follows the same structure as the built-out pages (Introduction, How it works, Webhooks, Webhook signature verification). Draft it from <code class="inline">contexts/BRD_Nomba_Subscriptions_Engine.md</code>, <code class="inline">contexts/PRD_Nomba_Subscriptions_Engine.md</code>, and <code class="inline">contexts/BACKEND_README.md</code> to complete this section.</p>
<div class="card-grid cols-2" style="margin-top:28px;">
  <a class="card" href="/introduction"><div class="card-icon">←</div><div class="card-title">Introduction</div><div class="card-desc">Back to the start.</div></a>
  <a class="card" href="/how-it-works"><div class="card-icon">→</div><div class="card-title">How it works</div><div class="card-desc">See the full arc end to end.</div></a>
</div>
`,
  };
}

export function getPageContent(slug: string): PageContent {
  return FLAGSHIP[slug] || stubPage(slug);
}

export type Heading = { id: string; text: string };

export function extractHeadings(html: string): Heading[] {
  const heads: Heading[] = [];
  const re = /<h2 id="h-([a-z0-9-]+)">(.*?)<\/h2>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html))) {
    heads.push({ id: match[1], text: match[2].replace(/<[^>]+>/g, "") });
  }
  return heads;
}
