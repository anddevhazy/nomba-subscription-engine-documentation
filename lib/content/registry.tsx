import type { ComponentType } from "react";
import type { PageMeta } from "./types";

import * as introductionTolu from "./pages/introduction-tolu";
import * as introduction from "./pages/introduction";
import * as mission from "./pages/mission";
import * as howItWorks from "./pages/how-it-works";
import * as theTeam from "./pages/the-team";
import * as quickStart from "./pages/quick-start";

import * as subscriptionLifecycle from "./pages/concepts/subscription-lifecycle";
import * as eventStore from "./pages/concepts/event-store";
import * as recoveryOrchestration from "./pages/concepts/recovery-orchestration";

import * as subscribersOverview from "./pages/subscribers/overview";
import * as manageYourSubscription from "./pages/subscribers/manage-your-subscription";
import * as whenAPaymentFails from "./pages/subscribers/when-a-payment-fails";

import * as merchantsOverview from "./pages/merchants/overview";
import * as createAPlan from "./pages/merchants/create-a-plan";
import * as onboardAndCollectPayment from "./pages/merchants/onboard-and-collect-payment";
import * as billingAndInvoicing from "./pages/merchants/billing-and-invoicing";
import * as teamAndRoles from "./pages/merchants/team-and-roles";
import * as merchantsAnalytics from "./pages/merchants/analytics";

import * as portalOverview from "./pages/merchants/customer-portal/overview";
import * as noCodeSetup from "./pages/merchants/customer-portal/no-code-setup";
import * as apiSetup from "./pages/merchants/customer-portal/api-setup";
import * as configure from "./pages/merchants/customer-portal/configure";
import * as deepLinksAndFlows from "./pages/merchants/customer-portal/deep-links-and-flows";
import * as cancellationPage from "./pages/merchants/customer-portal/cancellation-page";

import * as developerAuthentication from "./pages/developer/authentication";
import * as developerWebhooks from "./pages/developer/webhooks";
import * as rateLimits from "./pages/developer/rate-limits";

import * as channelsWeb from "./pages/channels/web";
import * as channelsEmail from "./pages/channels/email";
import * as channelsWhatsapp from "./pages/channels/whatsapp";
import * as channelsSms from "./pages/channels/sms";
import * as channelsUssd from "./pages/channels/ussd";

import * as architectureOverview from "./pages/architecture/overview";
import * as architectureModules from "./pages/architecture/modules";
import * as nombaIntegration from "./pages/architecture/nomba-integration";
import * as dataFlow from "./pages/architecture/data-flow";
import * as queuesAndAsync from "./pages/architecture/queues-and-async";
import * as resilience from "./pages/architecture/resilience";

import * as securityOverview from "./pages/security/overview";
import * as webhookVerification from "./pages/security/webhook-verification";
import * as dataProtection from "./pages/security/data-protection";

type PageModule = { meta: PageMeta; default: ComponentType };

const modules: Record<string, PageModule> = {
  "introduction-tolu": introductionTolu,
  introduction: introduction,
  mission: mission,
  "how-it-works": howItWorks,
  "the-team": theTeam,
  "quick-start": quickStart,

  "concepts/subscription-lifecycle": subscriptionLifecycle,
  "concepts/event-store": eventStore,
  "concepts/recovery-orchestration": recoveryOrchestration,

  "subscribers/overview": subscribersOverview,
  "subscribers/manage-your-subscription": manageYourSubscription,
  "subscribers/when-a-payment-fails": whenAPaymentFails,

  "merchants/overview": merchantsOverview,
  "merchants/create-a-plan": createAPlan,
  "merchants/onboard-and-collect-payment": onboardAndCollectPayment,
  "merchants/billing-and-invoicing": billingAndInvoicing,
  "merchants/team-and-roles": teamAndRoles,
  "merchants/analytics": merchantsAnalytics,

  "merchants/customer-portal/overview": portalOverview,
  "merchants/customer-portal/no-code-setup": noCodeSetup,
  "merchants/customer-portal/api-setup": apiSetup,
  "merchants/customer-portal/configure": configure,
  "merchants/customer-portal/deep-links-and-flows": deepLinksAndFlows,
  "merchants/customer-portal/cancellation-page": cancellationPage,

  "developer/authentication": developerAuthentication,
  "developer/webhooks": developerWebhooks,
  "developer/rate-limits": rateLimits,

  "channels/web": channelsWeb,
  "channels/email": channelsEmail,
  "channels/whatsapp": channelsWhatsapp,
  "channels/sms": channelsSms,
  "channels/ussd": channelsUssd,

  "architecture/overview": architectureOverview,
  "architecture/modules": architectureModules,
  "architecture/nomba-integration": nombaIntegration,
  "architecture/data-flow": dataFlow,
  "architecture/queues-and-async": queuesAndAsync,
  "architecture/resilience": resilience,

  "security/overview": securityOverview,
  "security/webhook-verification": webhookVerification,
  "security/data-protection": dataProtection,
};

export function getPageModule(slug: string): { meta: PageMeta; Content: ComponentType } | null {
  const mod = modules[slug];
  if (!mod) return null;
  return { meta: mod.meta, Content: mod.default };
}
