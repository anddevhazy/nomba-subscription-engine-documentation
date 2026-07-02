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
    title: "It starts with Musa.",
    lede: "Receipts for the people the banks forgot.",
    body: `
<p>He is twenty-eight. A bricklayer in Modakeke, just outside Ile-Ife. On a good day he lays block until his hands crack and walks home with ₦4,000 in his pocket — cash, always cash. On a bad day he sits at the junction with the other men, waiting on a foreman who skims twenty percent off the top before he passes the rest down.</p>
<p>Musa cannot read or write. When there is a form, a neighbour fills it. When there is work nearby, he hears about it by luck — or he doesn't, and someone else gets the day.</p>
<p>Last year he needed ₦15,000. Just enough for his own set of tools, so he could stop renting Sule's. The bank asked for a transaction history he does not have. The cash was real. The sweat was real. But to the people who decide who gets credit, Musa does not exist.</p>
<p>There are <strong>forty-one million</strong> Nigerians like Musa. The work is real. The money is real. The proof is not.</p>

<h2 id="h-and-mama-bisi">And there is Mama Bisi</h2>
<p>She has sold from the same corner of the market for years. Money moves through her hands every single day — a sachet here, a measure of rice there, naira folded into the hem of her wrapper. She has raised children on it. She has not missed a day in longer than she can remember.</p>
<p>Ask her bank for a small loan to restock and it asks for statements she cannot produce. Every kobo she has ever earned ran through her fingers and left no trace a system could read. The most dependable trader on the street is, to a lender, a complete stranger.</p>
<p>Guild is for both of them.</p>

<h2 id="h-what-guild-is">What Guild is</h2>
<p>Guild gives Musa a receipt for every day he works.</p>
<p>Engr. Adekunle Ogundimu, a site contractor in Bodija, posts a job through his dashboard — five bricklayers, three days, ₦4,000 a day, Yoruba preferred. The moment he hits submit, ₦60,000 leaves his account and lands in escrow tied to this exact job. The money is committed before the first brick is laid.</p>
<p>Our matching model puts Musa at the top of Adekunle's list. WhatsApp pings him: <em>"Adekunle dey hire bricklayers for Bodija, ₦4,000/day. Reply YES to apply."</em> He replies YES. Adekunle approves.</p>
<p>Three days, three shifts. Each day Musa shows up, the foreman marks attendance, ₦4,000 releases from escrow to Musa's Guild wallet automatically. End of the third day, Musa has ₦12,000. He sends <em>withdraw</em> on WhatsApp and payout lands in his bank account in under ten seconds.</p>
<p>Every step — the escrow fund, each shift release, the final payout — writes to an append-only ledger nobody can edit. Not Adekunle. Not us.</p>
<p>Three months of this, and Musa walks into a bank with the receipts.</p>

<div class="callout note"><div class="ic">ⓘ</div><p><strong>Receipts for the people the banks forgot.</strong> Every job, every kobo, every conversation runs through a payment rail and lands in a ledger a lender can verify.</p></div>

<h2 id="h-connects">What Guild actually connects</h2>
<p>Three sides. One ledger.</p>
<div class="card-grid cols-3">
  <div class="card"><div class="card-icon">👤</div><div class="card-title">Job Seekers</div><div class="card-desc">Bricklayers, tailors, drivers, mechanics, cleaners, traders' apprentices. They get visibility, voice in their own language, and a record that compounds into credit identity.</div></div>
  <div class="card"><div class="card-icon">💼</div><div class="card-title">Employers</div><div class="card-desc">Site contractors, hospitality operators, retail owners, smallholder agribusinesses. They get verified candidates, attendance proof, and per-shift releases.</div></div>
  <div class="card"><div class="card-icon">🏦</div><div class="card-title">Banks &amp; financial services</div><div class="card-desc">Commercial banks, microfinance institutions, credit fintechs, insurers. They get consent-gated signed snapshots of real economic activity.</div></div>
</div>
<p>Connecting any two of these solves a piece of the problem. Connecting all three is the loop that closes — work creates receipts, receipts unlock credit, credit funds more work.</p>

<h2 id="h-underneath">What is underneath</h2>
<p>Every payment runs through our banking partner rails — direct debit, payouts, virtual accounts, webhooks, transactional SMS, card linking, bills, reconciliation.</p>
<p>And the intelligence layer transcribes voice notes across five languages and reads a photo of a paper sales notebook, turning scattered, spoken proof into one structured record a lender can verify.</p>

<h2 id="h-channels">Five rails, one identity</h2>
<div class="card-grid cols-2">
  <a class="card" href="/channels/voice"><div class="card-icon">📞</div><div class="card-title">Voice</div><div class="card-desc">For Job Seekers. Tola, our voice agent, code-switches into Pidgin, Yoruba, Igbo, Hausa.</div></a>
  <a class="card" href="/channels/whatsapp-text"><div class="card-icon">💬</div><div class="card-title">WhatsApp text</div><div class="card-desc">Twenty-three intents across five languages. Send a voice note and we transcribe it.</div></a>
  <a class="card" href="/channels/whatsapp-calling"><div class="card-icon">📱</div><div class="card-title">WhatsApp Calling</div><div class="card-desc">Tap the call button inside your chat. We route the call straight to Tola.</div></a>
  <a class="card" href="/channels/sms"><div class="card-icon">✉️</div><div class="card-title">SMS</div><div class="card-desc">Two-way conversational SMS over our own gateway infrastructure.</div></a>
</div>

<h2 id="h-personal">Why this is personal</h2>
<p>We did not meet Musa and Mama Bisi in a research deck. We grew up in their homes. Guild is built by five students from a Nigerian university — children of bricklayers and traders. We are not building for a persona. We are building for the people who raised us.</p>

<h2 id="h-next">Where to go from here</h2>
<div class="card-grid cols-2">
  <a class="card" href="/how-it-works"><div class="card-icon">→</div><div class="card-title">How it works</div><div class="card-desc">Walk through the whole arc, end to end, in one page.</div></a>
  <a class="card" href="/quick-start"><div class="card-icon">⚡</div><div class="card-title">Quick start</div><div class="card-desc">Three ways to feel Guild in five minutes.</div></a>
  <a class="card" href="/standing/how-it-works"><div class="card-icon">📈</div><div class="card-title">Standing score</div><div class="card-desc">Four tiers, calibrated to Nigerian informal-economy patterns.</div></a>
  <a class="card" href="/partners/overview"><div class="card-icon">🏛️</div><div class="card-title">Partner Portal</div><div class="card-desc">Underwrite on signed data, not vouching letters.</div></a>
</div>
`,
  },
  "how-it-works": {
    eyebrow: "Get started",
    title: "How it works",
    lede: "Adekunle posts a job. Musa applies. Money moves. The score updates. The whole arc, end to end, in one page.",
    body: `
<p>Picture a small site office in Bodija, Ibadan, on a Tuesday morning. Engr. Adekunle Ogundimu needs five bricklayers for a three-day patch job starting Thursday. Last time, two of the men his foreman brought didn't show up after day one, and he paid for ghosts. He doesn't want to do that again. Here's what happens when he opens the Guild dashboard.</p>

<div class="flow">
  <div class="flow-node accent">1. Posts a job<br>(escrow funds immediately)</div><div class="flow-arrow">→</div>
  <div class="flow-node">2. Matching model ranks candidates</div><div class="flow-arrow">→</div>
  <div class="flow-node">3. Musa hears on WhatsApp</div><div class="flow-arrow">→</div>
  <div class="flow-node">4. Adekunle approves</div><div class="flow-arrow">→</div>
  <div class="flow-node">5. Work happens, attendance marked</div><div class="flow-arrow">→</div>
  <div class="flow-node accent">6. Per-shift release from escrow</div><div class="flow-arrow">→</div>
  <div class="flow-node">7. Musa withdraws to his bank</div><div class="flow-arrow">→</div>
  <div class="flow-node">8. Standing score updates</div><div class="flow-arrow">→</div>
  <div class="flow-node accent2">9. Lender reads signed snapshot</div>
</div>

<h2 id="h-post">1. He posts the job, and the money moves</h2>
<div class="steps">
  <div class="step"><div class="step-num">1</div><div class="step-body"><div class="step-title">He opens the dashboard</div><p>He signed up last week, linked his bank account through a direct-debit mandate, sent a small confirmation transfer, got the mandate-ready notification minutes later.</p></div></div>
  <div class="step"><div class="step-num">2</div><div class="step-body"><div class="step-title">He fills the form</div><p>Five bricklayers. Bodija. Three days starting Thursday. ₦4,000 a day. Yoruba preferred. Total budget ₦60,000. Submit.</p></div></div>
  <div class="step"><div class="step-num">3</div><div class="step-body"><div class="step-title">The escrow funds, immediately</div><p>The moment he hits submit, ₦60,000 is debited via direct debit and lands in an escrow balance tied to this exact job. The money is committed before any worker even sees the job.</p></div></div>
  <div class="step"><div class="step-num">4</div><div class="step-body"><div class="step-title">The job goes live</div><p>Posted at 9:02am. Available across voice, WhatsApp, SMS, and the marketplace.</p></div></div>
</div>

<h2 id="h-match">2. The matching model ranks the candidates</h2>
<p>The moment the job posts, the matching model runs over every Job Seeker who could plausibly do it. Four factors weigh in:</p>
<div class="card-grid cols-2">
  <div class="card"><div class="card-icon">🔨</div><div class="card-title">Skill</div><div class="card-desc">Bricklayer matches bricklayer. Skill tags are exact; trade category is a fallback.</div></div>
  <div class="card"><div class="card-icon">📍</div><div class="card-title">Location</div><div class="card-desc">Bodija is the centre of the search. We expand outward with distance decay.</div></div>
  <div class="card"><div class="card-icon">🗣️</div><div class="card-title">Language</div><div class="card-desc">Adekunle asked for Yoruba. Musa speaks Yoruba and Pidgin — a fit.</div></div>
  <div class="card"><div class="card-icon">📊</div><div class="card-title">Economic context</div><div class="card-desc">Standing tier, on-time rate, repayment streak, employer feedback, recent activity.</div></div>
</div>
<p class="body-secondary">Musa lands at the top of the list. Eight other names follow. The whole call takes under a hundred milliseconds.</p>

<h2 id="h-hears">3. Musa hears about it on WhatsApp</h2>
<blockquote>Adekunle dey hire 5 bricklayers for Bodija. ₦4,000/day, 3 days. Reply YES to apply.</blockquote>
<p>He replies <strong>YES</strong>. The intent engine recognises the affirmative, reads the conversation state, posts the application — in under a second.</p>
<div class="callout note"><div class="ic">ⓘ</div><p>A Job Seeker who isn't on WhatsApp hears about the same job by SMS, or can dial in and ask directly. Same matching model, different rails.</p></div>

<h2 id="h-approve">4. Adekunle approves</h2>
<p>His dashboard shows: <em>Musa Bello (bricklayer, Modakeke) applied.</em> He taps the row, sees Musa's standing tier — <strong>Emerging</strong>, twelve completed jobs in sixty days, average review 4.7 — and taps Approve. The approval writes to the audit ledger and feeds the matching model.</p>

<h2 id="h-work">5. The work happens, releases fire automatically</h2>
<p>Thursday morning, Musa shows up at 7:30am. The foreman marks him present. That evening, the scheduler reads the day's attendance against the escrowed budget. For every worker marked present, one day's wage releases from escrow to their wallet — automatically, no Pay button required.</p>
<p>Each attendance entry and each release is its own audit row. The foreman cannot retroactively edit attendance once it's marked; the ledger structurally rejects edits or deletes. By Saturday evening, Musa has ₦12,000 in his wallet.</p>

<h2 id="h-withdraw">6. Musa withdraws to his bank</h2>
<p>He sends <em>withdraw</em> on WhatsApp. ₦10,000, his linked account, confirmed. The payout API fires, the receiving name is pre-validated before the transfer goes out, and the payout settles in under ten seconds.</p>

<h2 id="h-score">7. The standing score updates</h2>
<p>His standing tier sits at <strong>Emerging</strong>, ticking upward — completed jobs +1, on-time rate holding at 100%. When Adekunle leaves a 5-star review, the model recomputes and Musa moves from Emerging to <strong>Trusted</strong>.</p>
<p>This is the moment the work compounds. Three months of jobs like this, and Musa has a transaction history a lender can verify — not a vouching letter, not a foreman's word, but receipts in an immutable ledger.</p>

<h2 id="h-lender">8. A lender reads the signal</h2>
<p>Months later, Musa needs ₦25,000 for a new wheelbarrow. He applies through a partner lender integrated with the Partner API. He grants consent in his dashboard, the lender fetches a signed snapshot of his standing, verifies it, underwrites, and disburses. Repayments run on the schedule he accepted.</p>
<p>That's the loop.</p>

<h2 id="h-roles">The three roles, one ledger</h2>
<div class="card-grid cols-3">
  <a class="card" href="/job-seekers/sign-up"><div class="card-icon">👤</div><div class="card-title">Job Seekers</div><div class="card-desc">Sign up by voice, WhatsApp, or web. Build a standing score that compounds.</div></a>
  <a class="card" href="/traders/virtual-account"><div class="card-icon">🏪</div><div class="card-title">Traders</div><div class="card-desc">Open a virtual account. Sales velocity unlocks inventory advance offers.</div></a>
  <a class="card" href="/employers/post-a-job"><div class="card-icon">💼</div><div class="card-title">Employers</div><div class="card-desc">Link a bank. Post jobs. Pay per-shift without middlemen.</div></a>
</div>
`,
  },
  "channels/voice": {
    eyebrow: "Channels",
    title: "Voice",
    lede: "Tola, our voice agent. Inbound calls, outbound nudges. Nigerian English with code-switching. Job Seekers only.",
    body: `
<p>Tola is the voice agent. She picks up when a Job Seeker dials, and places outbound calls when the matching model surfaces someone worth nudging. She speaks Nigerian English and code-switches into Pidgin, Yoruba, Igbo, or Hausa depending on the caller.</p>

<h2 id="h-who">Who can use voice</h2>
<p><strong>Job Seekers, primarily.</strong> Voice is the rail for people whose phones don't make WhatsApp practical — a budget smartphone with a low-data plan, or an older handset that does calls and SMS but not much else.</p>
<p>Traders and employers usually don't dial; they live on smartphones with WhatsApp. If one calls the Guild number, Tola politely deflects them to WhatsApp for their setup.</p>

<h2 id="h-reach">How to reach Tola</h2>
<ol>
  <li><strong>Dial the Guild number</strong> from any Nigerian phone. Standard call, standard carrier charges.</li>
  <li><strong>Tap the call button</strong> inside the Guild WhatsApp chat, routed through our bridge to Tola.</li>
</ol>

<h2 id="h-tools">What Tola can do</h2>
<p>Six tools live on every call: sign up, list open jobs, get job details, apply to a job, update your profile, set your skills.</p>
<blockquote>"You get five jobs. One: bricklayer for Bodija, three days, ₦4,000 daily. Two: labourer for Mokola, two days, ₦3,000 daily..."</blockquote>
<p>Every application is confirmed verbally before it's submitted — Tola won't act on an ambiguous instruction.</p>

<h2 id="h-sound">What Tola sounds like</h2>
<p>Conversational Nigerian English, not a stiff IVR voice. Code-switching is natural — if you speak Pidgin, she responds in Pidgin; switch to Yoruba mid-call, she follows. The voice is calibrated for clarity over a typical Nigerian phone connection.</p>

<h2 id="h-outbound">Outbound calls</h2>
<p>Tola can place outbound calls too — most often when the matching model surfaces a Trusted-tier Job Seeker who's a strong fit for a job that just posted, and a nudge faster than a text might help. Outbound calls are rate-limited so no one gets pestered: at most one nudge per active job period for a given Job Seeker.</p>

<div class="callout tip"><div class="ic">💡</div><p>Same six tools are available whether you called Tola or Tola called you.</p></div>

<h2 id="h-technical">What happens on the call, technically</h2>
<p>You don't need to know this to use the platform — here in case you're curious. The caller's phone number resolves to a user record, which sets Tola's language and greeting. During natural speaking pauses, tool calls run against the core API and, where ranking is needed, the ML service. End-to-end response latency runs 1–2 seconds, timed so the user doesn't perceive a delay.</p>

<h2 id="h-wont">What Tola will not do</h2>
<ul>
  <li>She won't sign you up for an employer or trader account — voice signup is Job Seeker only.</li>
  <li>She won't approve job applications on an employer's behalf.</li>
  <li>She won't move money — wallet operations require text or web confirmation.</li>
  <li>She won't share another user's data with you.</li>
</ul>
<p class="body-secondary">These are intentional guardrails. Voice is high-bandwidth and easy to use, which makes it the rail you'd want to abuse if you were going to — so it stays focused on discovery and application.</p>

<h2 id="h-more">Where to read more</h2>
<div class="card-grid cols-2">
  <a class="card" href="/channels/whatsapp-calling"><div class="card-icon">📱</div><div class="card-title">WhatsApp Calling</div><div class="card-desc">The tap-to-call path that lands on Tola.</div></a>
  <a class="card" href="/architecture/services"><div class="card-icon">🧩</div><div class="card-title">Voice in the architecture</div><div class="card-desc">The technical deep dive on the voice service.</div></a>
</div>
`,
  },
  "api-reference/authentication": {
    eyebrow: "API reference",
    title: "Authentication",
    lede: "Bearer tokens. Scope-bounded. IP-allowlisted. Rotated quarterly.",
    body: `
<p>The Partner API authenticates with bearer tokens. Pass the token in the <code class="inline">Authorization</code> header on every request:</p>
<pre><code>curl https://api.guild.com.ng/partner/v1/users/usr_01HMFB.../snapshot \\
  -H "Authorization: Bearer gld_live_01HKBZ..."</code></pre>
<p class="body-secondary">Same shape as most modern payment APIs.</p>

<h2 id="h-format">Token format</h2>
<table>
  <tr><th>Format</th><th>Example</th><th>Where it works</th></tr>
  <tr><td><code class="inline">gld_sandbox_&lt;ulid&gt;</code></td><td><code class="inline">gld_sandbox_01HKAR...</code></td><td>Sandbox only</td></tr>
  <tr><td><code class="inline">gld_live_&lt;ulid&gt;</code></td><td><code class="inline">gld_live_01HKBZ...</code></td><td>Production only</td></tr>
</table>
<p>A sandbox key returns 401 against production endpoints and vice versa — no accidental cross-environment usage.</p>

<h2 id="h-getting">Getting a key</h2>
<p>From the Partner Portal. The full secret is shown exactly once at creation — copy it to your secrets manager immediately. Keys are issued only after partner onboarding completes.</p>

<h2 id="h-scopes">Scopes</h2>
<table>
  <tr><th>Scope</th><th>Permits</th></tr>
  <tr><td><code class="inline">read:snapshots</code></td><td>Read user snapshots, consents, usage</td></tr>
  <tr><td><code class="inline">write:consent-links</code></td><td>Create consent links</td></tr>
  <tr><td><code class="inline">write:disbursements</code></td><td>Create and read disbursements</td></tr>
  <tr><td><code class="inline">read:webhooks</code></td><td>Read webhook subscriptions</td></tr>
  <tr><td><code class="inline">write:webhooks</code></td><td>Create, update, delete webhooks</td></tr>
  <tr><td><code class="inline">admin:org</code></td><td>Organization-level settings</td></tr>
</table>
<p>A key without the required scope returns <code class="inline">403 scope_insufficient</code>.</p>

<h2 id="h-ip">IP allowlisting</h2>
<p>Optional but recommended for production keys. Up to 32 entries per key, IPv4 and IPv6, CIDR notation accepted. A request from an IP not in the allowlist returns <code class="inline">401 ip_not_allowed</code>.</p>

<h2 id="h-order">What happens when a request arrives</h2>
<div class="steps">
  <div class="step"><div class="step-num">1</div><div class="step-body"><div class="step-title">Extract bearer token</div><p>Missing → <code class="inline">401 missing_auth</code>.</p></div></div>
  <div class="step"><div class="step-num">2</div><div class="step-body"><div class="step-title">Hash and look up</div><p>We store a salted hash of the secret, never the raw value. Miss → <code class="inline">401 invalid_auth</code>.</p></div></div>
  <div class="step"><div class="step-num">3</div><div class="step-body"><div class="step-title">Status check</div><p>Key must be active. Revoked, suspended, expired → <code class="inline">401 invalid_auth</code>.</p></div></div>
  <div class="step"><div class="step-num">4</div><div class="step-body"><div class="step-title">IP allowlist</div><p>If configured, source IP must match.</p></div></div>
  <div class="step"><div class="step-num">5</div><div class="step-body"><div class="step-title">Scope check</div><p>Requested operation must be in the key's scope set.</p></div></div>
  <div class="step"><div class="step-num">6</div><div class="step-body"><div class="step-title">Rate limit</div><p>Per-key token bucket. Exceeded → <code class="inline">429 rate_limited</code> with a Retry-After header.</p></div></div>
  <div class="step"><div class="step-num">7</div><div class="step-body"><div class="step-title">Consent check</div><p>For snapshot reads, a consent-token header must reference an active consent for the target user.</p></div></div>
</div>

<h2 id="h-rotate">Rotating keys</h2>
<p>Recommended every 90 days: generate a new key with matching scopes, roll it out gradually, watch usage on the old key drop to zero, then revoke it.</p>

<h2 id="h-compromise">Compromise response</h2>
<p>If a key leaks, revoke it immediately with a compromised reason code. We mark it revoked, open an incident, scan for unusual usage, and notify you within an hour.</p>

<h2 id="h-next">What to read next</h2>
<div class="card-grid cols-2">
  <a class="card" href="/api-reference/errors"><div class="card-icon">⚠️</div><div class="card-title">Errors</div><div class="card-desc">What every auth-related error code means.</div></a>
  <a class="card" href="/api-reference/partners/snapshots"><div class="card-icon">✍️</div><div class="card-title">Snapshots</div><div class="card-desc">The endpoint you'll use most.</div></a>
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
<p class="body-secondary">This page follows the same structure as the built-out pages (Introduction, How it works, Voice, Authentication). Populate it from the source content at <code class="inline">docs.guild.com.ng/${slug}.md</code> to complete the clone.</p>
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
