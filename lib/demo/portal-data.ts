export type Plan = {
  id: string;
  name: string;
  description: string;
  priceKobo: number;
};

export const PLANS: Plan[] = [
  { id: "lumen_basic", name: "Lumen Basic", description: "Class bookings only.", priceKobo: 800000 },
  { id: "lumen_monthly", name: "Lumen Monthly", description: "Class bookings + workout plan.", priceKobo: 1500000 },
  { id: "lumen_pro", name: "Lumen Pro", description: "Class bookings, workout plan, and personal trainer chat.", priceKobo: 2500000 },
];

export const CYCLE_LENGTH_DAYS = 30;
/** Fixed mid-cycle point so proration math is always the same, tidy numbers on every load. */
export const DAYS_REMAINING = 15;

export function planById(id: string): Plan {
  const plan = PLANS.find((p) => p.id === id);
  if (!plan) throw new Error(`Unknown plan: ${id}`);
  return plan;
}

export function formatNaira(kobo: number): string {
  const naira = Math.round(kobo / 100);
  const sign = naira < 0 ? "-" : "";
  return `${sign}₦${Math.abs(naira).toLocaleString("en-NG")}`;
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function addDays(d: Date, days: number): Date {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + days);
  return copy;
}

/** Prorate a mid-cycle plan switch: credit the unused portion of the old plan,
 * charge the prorated remainder of the new one, for the days left in the cycle. */
export function prorate(oldPlan: Plan, newPlan: Plan) {
  const fraction = DAYS_REMAINING / CYCLE_LENGTH_DAYS;
  const credit = -Math.round(oldPlan.priceKobo * fraction);
  const charge = Math.round(newPlan.priceKobo * fraction);
  const total = credit + charge;
  return { credit, charge, total };
}

export type InvoiceStatus = "paid";

export type Invoice = {
  id: string;
  dueDate: Date | null;
  status: InvoiceStatus;
  amountKobo: number;
  items: string;
};

export type SubscriptionStatus = "active" | "paused" | "canceled";

export type PaymentMethod = {
  brand: string;
  last4: string;
  expiry: string;
};

export type CancellationReason =
  | "too_expensive"
  | "missing_feature"
  | "found_alternative"
  | "no_longer_need"
  | "switching_plan"
  | "other";

export const CANCELLATION_REASONS: { value: CancellationReason; label: string }[] = [
  { value: "too_expensive", label: "Too expensive" },
  { value: "missing_feature", label: "Missing a feature I need" },
  { value: "found_alternative", label: "Found a better alternative" },
  { value: "no_longer_need", label: "No longer need it" },
  { value: "switching_plan", label: "Switching to a different plan" },
  { value: "other", label: "Other" },
];

export type PortalState = {
  view:
    | "home"
    | "subscription"
    | "choose-plan"
    | "confirm-plan"
    | "pause-confirm"
    | "pause-success"
    | "cancel-deflect"
    | "cancel-confirm"
    | "cancel-success"
    | "reactivate-confirm";
  planId: string;
  status: SubscriptionStatus;
  periodStart: Date;
  periodEnd: Date;
  cancelAt: Date | null;
  pendingPlanId: string | null;
  cancelReason: CancellationReason | null;
  paymentMethod: PaymentMethod;
  invoices: Invoice[];
  showPaymentModal: boolean;
};

export function initialPortalState(): PortalState {
  const periodStart = addDays(new Date(), -DAYS_REMAINING);
  const periodEnd = addDays(periodStart, CYCLE_LENGTH_DAYS);
  return {
    view: "home",
    planId: "lumen_monthly",
    status: "active",
    periodStart,
    periodEnd,
    cancelAt: null,
    pendingPlanId: null,
    cancelReason: null,
    paymentMethod: { brand: "Verve", last4: "0116", expiry: "07/2029" },
    invoices: [
      {
        id: "inv_lumen_0001",
        dueDate: periodStart,
        status: "paid",
        amountKobo: 1500000,
        items: "Lumen Monthly",
      },
    ],
    showPaymentModal: false,
  };
}
