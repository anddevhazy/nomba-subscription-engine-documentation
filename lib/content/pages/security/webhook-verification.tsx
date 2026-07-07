import { CardGrid, CardLink } from "@/components/docs/content/card-grid";
import { CodeBlock } from "@/components/docs/code-block";
import { Steps, Step } from "@/components/docs/content/steps";
import type { PageMeta } from "@/lib/content/types";
import { Bell, CheckCircle2, Lock } from "lucide-react";

export const meta: PageMeta = {
  eyebrow: "Security & trust",
  title: "Webhook signature verification",
  lede: "Every webhook we send is signed. Here's exactly how to verify one, in five languages.",
};

export default function WebhookVerification() {
  return (
    <>
      <p>
        Anyone who knows your webhook URL can POST to it. Signature verification is what lets you tell the
        difference between an event we actually sent and someone else&apos;s request pretending to be one.
      </p>

      <h2 id="h-headers">What arrives with every delivery</h2>
      <CodeBlock
        language="text"
        code={`X-Nomba-Subs-Signature: t=1755168153,v1=5d9c8...
X-Nomba-Subs-Webhook-Id: whk_01HMFB...
X-Nomba-Subs-Event-Id: evt_01HMFB...
Content-Type: application/json`}
      />

      <p>
        The signature header carries two fields: <code className="inline">t</code>, the Unix timestamp when we
        signed the payload, and <code className="inline">v1</code>, the HMAC-SHA256 of{" "}
        <code className="inline">{"{timestamp}.{raw_body}"}</code> using your webhook secret.
      </p>

      <h2 id="h-verify">Verifying, step by step</h2>
      <Steps>
        <Step number={1} title="Extract t and v1">
          <p>
            Split the header on <code className="inline">,</code> and parse the key=value pairs.
          </p>
        </Step>
        <Step number={2} title="Check the timestamp">
          <p>
            Reject if <code className="inline">t</code> is more than 5 minutes off your server&apos;s clock, this is
            replay protection.
          </p>
        </Step>
        <Step number={3} title="Compute the expected signature">
          <p>
            <code className="inline">{'HMAC_SHA256(secret, "{t}." + raw_body)'}</code>, hex-encoded.
          </p>
        </Step>
        <Step number={4} title="Compare in constant time">
          <p>
            <code className="inline">crypto.timingSafeEqual</code> in Node,{" "}
            <code className="inline">hmac.compare_digest</code> in Python,{" "}
            <code className="inline">hash_equals</code> in PHP,{" "}
            <code className="inline">CryptographicOperations.FixedTimeEquals</code> in C#,{" "}
            <code className="inline">MessageDigest.isEqual</code> in Java. Never plain string equality, timing
            differences leak information an attacker can use.
          </p>
        </Step>
        <Step number={5} title="Process only on a match">
          <p>Otherwise return 401 and log the event for investigation.</p>
        </Step>
      </Steps>

      <h2 id="h-node">Node.js</h2>
      <CodeBlock
        language="javascript"
        code={`const crypto = require('crypto');

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
}`}
      />

      <h2 id="h-python">Python</h2>
      <CodeBlock
        language="python"
        code={`import hmac, hashlib, time

def verify(raw_body, header, secret):
    parts = dict(p.split("=") for p in header.split(","))
    t, v1 = parts["t"], parts["v1"]

    if abs(time.time() - int(t)) > 300:
        return False

    expected = hmac.new(
        secret.encode(), f"{t}.{raw_body}".encode(), hashlib.sha256
    ).hexdigest()

    return hmac.compare_digest(expected, v1)`}
      />

      <h2 id="h-checklist">Checklist</h2>
      <ul className="[&>li]:flex [&>li]:items-start [&>li]:gap-2 [&_svg]:mt-[3px] [&_svg]:shrink-0 [&_svg]:text-green-dark">
        <li>
          <CheckCircle2 className="size-4" strokeWidth={2} /> Verify the signature on every request. Reject on
          mismatch.
        </li>
        <li>
          <CheckCircle2 className="size-4" strokeWidth={2} /> Reject events older than 5 minutes.
        </li>
        <li>
          <CheckCircle2 className="size-4" strokeWidth={2} /> Check idempotency using the event{" "}
          <code className="inline">id</code>, deliveries are at-least-once.
        </li>
        <li>
          <CheckCircle2 className="size-4" strokeWidth={2} /> Return 2xx quickly. Push heavy processing to your own
          queue instead of doing it inline.
        </li>
        <li>
          <CheckCircle2 className="size-4" strokeWidth={2} /> Keep your webhook URL stable, update the subscription
          before changing DNS, not after.
        </li>
      </ul>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/developer/webhooks"
          icon={Bell}
          title="Webhooks"
          description="Event types, payload shape, retry behaviour."
        />
        <CardLink
          href="/security/data-protection"
          icon={Lock}
          title="Data & encryption posture"
          description="What's encrypted at rest, and why."
        />
      </CardGrid>
    </>
  );
}
