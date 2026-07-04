import {
  type PortalState,
  type CancellationReason,
  type PaymentMethod,
  planById,
  prorate,
  initialPortalState,
} from "./portal-data";

export type PortalAction =
  | { type: "OPEN_SUBSCRIPTION" }
  | { type: "GO_HOME" }
  | { type: "OPEN_CHOOSE_PLAN" }
  | { type: "SELECT_PLAN"; planId: string }
  | { type: "CANCEL_PLAN_SELECTION" }
  | { type: "CONFIRM_PLAN_CHANGE" }
  | { type: "OPEN_PAUSE_CONFIRM" }
  | { type: "CONFIRM_PAUSE" }
  | { type: "RESUME_SUBSCRIPTION" }
  | { type: "OPEN_CANCEL_DEFLECT" }
  | { type: "CONTINUE_TO_CANCEL" }
  | { type: "SET_CANCEL_REASON"; reason: CancellationReason }
  | { type: "CONFIRM_CANCEL" }
  | { type: "OPEN_REACTIVATE_CONFIRM" }
  | { type: "CONFIRM_REACTIVATE" }
  | { type: "OPEN_PAYMENT_MODAL" }
  | { type: "CLOSE_PAYMENT_MODAL" }
  | { type: "UPDATE_PAYMENT_METHOD"; method: PaymentMethod }
  | { type: "RESET" };

export function portalReducer(state: PortalState, action: PortalAction): PortalState {
  switch (action.type) {
    case "OPEN_SUBSCRIPTION":
      return { ...state, view: "subscription" };
    case "GO_HOME":
      return { ...state, view: "home" };
    case "OPEN_CHOOSE_PLAN":
      return { ...state, view: "choose-plan" };
    case "SELECT_PLAN":
      return { ...state, pendingPlanId: action.planId, view: "confirm-plan" };
    case "CANCEL_PLAN_SELECTION":
      return { ...state, pendingPlanId: null, view: "subscription" };
    case "CONFIRM_PLAN_CHANGE": {
      if (!state.pendingPlanId) return state;
      const oldPlan = planById(state.planId);
      const newPlan = planById(state.pendingPlanId);
      const { credit, charge, total } = prorate(oldPlan, newPlan);
      const invoiceDate = new Date();
      const newInvoices =
        total === 0
          ? state.invoices
          : [
              {
                id: `inv_${Math.random().toString(36).slice(2, 10)}`,
                dueDate: invoiceDate,
                status: "paid" as const,
                amountKobo: total,
                items: `Plan change: ${oldPlan.name} → ${newPlan.name} (credit ${credit / 100 < 0 ? "-" : ""}₦${Math.abs(credit) / 100}, charge ₦${charge / 100})`,
              },
              ...state.invoices,
            ];
      return {
        ...state,
        planId: state.pendingPlanId,
        pendingPlanId: null,
        invoices: newInvoices,
        view: "home",
      };
    }
    case "OPEN_PAUSE_CONFIRM":
      return { ...state, view: "pause-confirm" };
    case "CONFIRM_PAUSE":
      return { ...state, status: "paused", view: "pause-success" };
    case "RESUME_SUBSCRIPTION":
      return { ...state, status: "active", view: "subscription" };
    case "OPEN_CANCEL_DEFLECT":
      return { ...state, view: "cancel-deflect" };
    case "CONTINUE_TO_CANCEL":
      return { ...state, view: "cancel-confirm" };
    case "SET_CANCEL_REASON":
      return { ...state, cancelReason: action.reason };
    case "CONFIRM_CANCEL":
      return { ...state, status: "canceled", cancelAt: state.periodEnd, view: "cancel-success" };
    case "OPEN_REACTIVATE_CONFIRM":
      return { ...state, view: "reactivate-confirm" };
    case "CONFIRM_REACTIVATE":
      return { ...state, status: "active", cancelAt: null, cancelReason: null, view: "home" };
    case "OPEN_PAYMENT_MODAL":
      return { ...state, showPaymentModal: true };
    case "CLOSE_PAYMENT_MODAL":
      return { ...state, showPaymentModal: false };
    case "UPDATE_PAYMENT_METHOD":
      return { ...state, paymentMethod: action.method, showPaymentModal: false };
    case "RESET":
      return initialPortalState();
    default:
      return state;
  }
}
