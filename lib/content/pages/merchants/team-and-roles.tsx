import { Card, CardGrid, CardLink } from "@/components/docs/content/card-grid";
import { Steps, Step } from "@/components/docs/content/steps";
import type { PageMeta } from "@/lib/content/types";
import { BarChart3, Briefcase, Crown, KeyRound } from "lucide-react";

export const meta: PageMeta = {
  eyebrow: "For merchants",
  title: "Team & roles",
  lede: "Owner and Team Member. Who can rotate an API key, and who just needs to handle today's support queue.",
};

export default function TeamAndRoles() {
  return (
    <>
      <p>
        A merchant account isn&apos;t necessarily one person. The platform supports multiple users per merchant, with
        two roles that draw a clear line between running the business and running today&apos;s support queue.
      </p>

      <h2 id="h-roles">The two roles</h2>
      <CardGrid cols={2}>
        <Card icon={Crown} title="Owner">
          Everything a Team Member can do, plus API key management, webhook configuration, and team membership,
          inviting, removing, and changing roles.
        </Card>
        <Card icon={Briefcase} title="Team Member">
          Day-to-day subscription and customer operations, plans, customers, invoices, manual retries, analytics. No
          account-level access.
        </Card>
      </CardGrid>

      <h2 id="h-why">Why the line sits here</h2>
      <p>
        The split isn&apos;t about seniority, it&apos;s about blast radius. An API key or a webhook endpoint is
        infrastructure that, if misconfigured or leaked, can affect every customer on the account. Day-to-day
        subscription work, approving a manual retry, looking up why a customer&apos;s invoice is what it is,
        shouldn&apos;t require that level of access, and shouldn&apos;t be gated behind someone who has it.
      </p>

      <h2 id="h-manage">Managing your team</h2>
      <Steps>
        <Step number={1} title="Invite">
          <p>Dashboard → Team → Invite. Enter an email, pick a role. They get an invite link.</p>
        </Step>
        <Step number={2} title="Change a role">
          <p>Owner-only. Promote a Team Member to Owner, or the reverse.</p>
        </Step>
        <Step number={3} title="Remove">
          <p>Revokes their session and access immediately. Their past actions stay in the audit log under their name.</p>
        </Step>
      </Steps>

      <h2 id="h-not-yet">What this doesn&apos;t do, yet</h2>
      <p>
        This is deliberately a two-role model, not a custom-permission builder, no &quot;can view analytics but not
        customers&quot; granularity at v1. If your team needs finer-grained access control than Owner/Team Member,
        that&apos;s a real gap worth telling us about, not a hidden setting.
      </p>

      <h2 id="h-audit">Every action, attributed</h2>
      <p>
        Plan changes, API key rotation, webhook configuration, and subscription overrides all write to the
        merchant&apos;s audit log with the acting user attached, so &quot;who changed this&quot; is always
        answerable, regardless of role.
      </p>

      <h2 id="h-next">Next</h2>
      <CardGrid cols={2}>
        <CardLink
          href="/developer/authentication"
          icon={KeyRound}
          title="Authentication"
          description="API keys are Owner-only, here's how they work."
        />
        <CardLink
          href="/merchants/analytics"
          icon={BarChart3}
          title="Analytics"
          description="What both roles see on the dashboard."
        />
      </CardGrid>
    </>
  );
}
