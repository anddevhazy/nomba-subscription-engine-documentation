"use client";

import { useEffect, useReducer, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Dumbbell, RotateCcw } from "lucide-react";
import {
  PLANS,
  CANCELLATION_REASONS,
  planById,
  prorate,
  formatNaira,
  formatDate,
  addDays,
  initialPortalState,
} from "@/lib/demo/portal-data";
import { portalReducer, type PortalAction } from "@/lib/demo/portal-reducer";
import { InvoiceHistory } from "@/components/demo/invoice-history";
import { PaymentMethodModal } from "@/components/demo/payment-method-modal";
import { PaymentMethodBlock } from "@/components/demo/payment-method-block";
import { ActionButton, useActionFeedback } from "@/components/demo/action-button";
import { PortalSkeleton, type LoadableView } from "@/components/demo/portal-skeletons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const PRIMARY_BTN = "rounded-full bg-[#6C5CE0] px-5 text-white hover:bg-[#5B4BD6]";
const SECONDARY_BTN = "rounded-md border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200";
const DANGER_BTN = "rounded-md border-transparent bg-red-50 text-red-600 hover:bg-red-100";
const GRAY_PILL = "rounded-full border-transparent bg-gray-100 text-gray-600";
const AMBER_PILL = "rounded-full border-transparent bg-amber-50 text-amber-700";

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="ghost" size="sm" className="-ml-2.5 mb-5 text-gray-500 hover:text-gray-900" onClick={onClick}>
      <ArrowLeft /> Back
    </Button>
  );
}

export function PortalDemo() {
  const [state, dispatch] = useReducer(portalReducer, undefined, initialPortalState);
  const plan = planById(state.planId);
  const { phase, run } = useActionFeedback(`${state.view}:${state.status}`);
  const [loadingView, setLoadingView] = useState<LoadableView | null>("home");

  useEffect(() => {
    const timer = setTimeout(() => setLoadingView(null), 600);
    return () => clearTimeout(timer);
  }, []);

  function navigate(view: LoadableView, action: PortalAction) {
    setLoadingView(view);
    setTimeout(() => {
      dispatch(action);
      setLoadingView(null);
    }, 550);
  }

  return (
    <div className="flex min-h-screen flex-col bg-white md:flex-row">
      <aside className="flex w-full shrink-0 flex-col justify-between gap-8 bg-[#4B5568] p-6 text-white sm:p-8 md:w-[360px] md:p-10">
        <div>
          <div className="flex items-center gap-2">
            <Dumbbell className="size-5" strokeWidth={2} />
            <span className="font-semibold">Lumen</span>
            <Badge variant="outline" className={cn(AMBER_PILL, "ml-auto")}>
              Demo mode
            </Badge>
          </div>
          <p className="mt-6 text-xl leading-snug font-medium sm:mt-8 sm:text-2xl">Book classes. Track your plan. Show up.</p>
          <Link href="/introduction" className="mt-6 inline-block text-sm text-white/70 hover:text-white sm:mt-8">
            ← Return to Lumen
          </Link>
        </div>
        <footer className="flex items-center gap-4 text-xs text-white/50">
          <span>Powered by Nomba</span>
          <a href="#" className="hover:text-white/80">
            Terms
          </a>
          <a href="#" className="hover:text-white/80">
            Privacy
          </a>
        </footer>
      </aside>

      <main className="mx-auto w-full min-w-0 max-w-2xl flex-1 px-5 py-6 sm:px-8 sm:py-8 md:px-12 md:py-12">
        <div className="mb-6 flex justify-end sm:mb-8">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-700" onClick={() => dispatch({ type: "RESET" })}>
            <RotateCcw /> Reset demo
          </Button>
        </div>

        {loadingView ? (
          <PortalSkeleton view={loadingView} />
        ) : (
          <>
        {state.view === "home" && (
          <div className="space-y-10">
            <div>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">Active plan</h2>
              {state.status !== "canceled" ? (
                <button
                  className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-5 text-left transition-colors hover:border-gray-300"
                  onClick={() => navigate("subscription", { type: "OPEN_SUBSCRIPTION" })}
                >
                  <div>
                    <div className="font-semibold text-gray-900">{plan.name}</div>
                    {state.status === "paused" && (
                      <Badge variant="outline" className={cn(GRAY_PILL, "mt-1")}>
                        Paused
                      </Badge>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-700">
                    <div>
                      {formatNaira(plan.priceKobo)} due {formatDate(state.periodEnd)}
                    </div>
                    <div className="mt-1 text-xs text-gray-400">
                      {state.paymentMethod.brand} •••• {state.paymentMethod.last4}
                    </div>
                  </div>
                </button>
              ) : (
                <button
                  className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-5 text-left transition-colors hover:border-gray-300"
                  onClick={() => navigate("subscription", { type: "OPEN_SUBSCRIPTION" })}
                >
                  <div>
                    <div className="font-semibold text-gray-900">{plan.name}</div>
                    <Badge variant="outline" className={cn(AMBER_PILL, "mt-1")}>
                      Canceled
                    </Badge>
                  </div>
                  <div className="text-right text-sm text-gray-700">
                    <div>Ends {state.cancelAt ? formatDate(state.cancelAt) : "-"}</div>
                  </div>
                </button>
              )}
            </div>

            <PaymentMethodBlock
              paymentMethod={state.paymentMethod}
              onChangeClick={() => dispatch({ type: "OPEN_PAYMENT_MODAL" })}
              changeLabel="Add payment method"
            />

            <InvoiceHistory invoices={state.invoices} paymentMethod={state.paymentMethod} />
          </div>
        )}

        {state.view === "subscription" && (
          <div>
            <BackButton onClick={() => navigate("home", { type: "GO_HOME" })} />
            <h2 className="text-xl font-semibold text-gray-900">{plan.name}</h2>
            {state.status === "canceled" ? (
              <>
                <div className="mt-3 flex gap-2">
                  <Badge variant="outline" className={GRAY_PILL}>
                    Active discounts: none
                  </Badge>
                  <Badge variant="outline" className={AMBER_PILL}>
                    Canceled
                  </Badge>
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  Ends {state.cancelAt ? formatDate(state.cancelAt) : "-"}
                </p>
                <Button
                  size="sm"
                  className={cn(SECONDARY_BTN, "mt-4")}
                  onClick={() => dispatch({ type: "OPEN_REACTIVATE_CONFIRM" })}
                >
                  Reactivate plan
                </Button>
                <div className="mt-8 rounded-lg border border-gray-200 p-5">
                  <h3 className="mb-2 text-sm font-semibold text-gray-900">Upcoming payment</h3>
                  <p className="text-sm text-gray-400">No charges scheduled</p>
                </div>
              </>
            ) : (
              <>
                <p className="mt-3 text-sm text-gray-500">
                  {state.status === "paused"
                    ? "Paused"
                    : `Bills monthly • ${formatNaira(plan.priceKobo)} due ${formatDate(state.periodEnd)}`}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button size="sm" className={SECONDARY_BTN} onClick={() => navigate("choose-plan", { type: "OPEN_CHOOSE_PLAN" })}>
                    Update plan
                  </Button>
                  {state.status === "active" ? (
                    <Button size="sm" className={SECONDARY_BTN} onClick={() => dispatch({ type: "OPEN_PAUSE_CONFIRM" })}>
                      Pause subscription
                    </Button>
                  ) : (
                    <ActionButton
                      phase={phase}
                      size="sm"
                      className={SECONDARY_BTN}
                      label="Resume subscription"
                      onClick={() => run(() => dispatch({ type: "RESUME_SUBSCRIPTION" }))}
                    />
                  )}
                  <Button size="sm" className={DANGER_BTN} onClick={() => dispatch({ type: "OPEN_CANCEL_DEFLECT" })}>
                    Cancel plan
                  </Button>
                </div>
                {state.status === "active" && (
                  <div className="mt-8 rounded-lg border border-gray-200 p-5">
                    <h3 className="mb-4 text-sm font-semibold text-gray-900">Upcoming payment</h3>
                    <div className="flex justify-between text-sm text-gray-700">
                      <div>
                        <div>{plan.name}</div>
                        <div className="mt-1 text-xs text-gray-400">
                          {formatDate(state.periodStart)} to {formatDate(state.periodEnd)}
                        </div>
                      </div>
                      <div>{formatNaira(plan.priceKobo)}</div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between text-sm font-semibold text-gray-900">
                      <span>Total</span>
                      <span>{formatNaira(plan.priceKobo)}</span>
                    </div>
                  </div>
                )}
              </>
            )}
            <div className="mt-8">
              <PaymentMethodBlock
                paymentMethod={state.paymentMethod}
                onChangeClick={() => dispatch({ type: "OPEN_PAYMENT_MODAL" })}
                changeLabel="Change payment method"
              />
            </div>
          </div>
        )}

        {state.view === "choose-plan" && (
          <div>
            <BackButton onClick={() => navigate("subscription", { type: "CANCEL_PLAN_SELECTION" })} />
            <h2 className="mb-5 text-xl font-semibold text-gray-900">Choose your plan</h2>
            <div className="space-y-4">
              {PLANS.slice()
                .reverse()
                .map((p) => (
                  <div
                    key={p.id}
                    className={cn(
                      "rounded-lg border p-5",
                      p.id === state.planId ? "border-[#6C5CE0] bg-[#6C5CE0]/5" : "border-gray-200",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-gray-900">{p.name}</div>
                      {p.id === state.planId && (
                        <Badge variant="outline" className={GRAY_PILL}>
                          Current plan
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{p.description}</p>
                    <div className="mt-2 text-sm font-medium text-gray-900">{formatNaira(p.priceKobo)} / month</div>
                    {p.id !== state.planId && (
                      <Button
                        className={cn(PRIMARY_BTN, "mt-4 w-full")}
                        onClick={() => navigate("confirm-plan", { type: "SELECT_PLAN", planId: p.id })}
                      >
                        Select plan
                      </Button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {state.view === "confirm-plan" &&
          state.pendingPlanId &&
          (() => {
            const newPlan = planById(state.pendingPlanId!);
            const { credit, charge, total } = prorate(plan, newPlan);
            return (
              <div>
                <BackButton onClick={() => navigate("choose-plan", { type: "OPEN_CHOOSE_PLAN" })} />
                <h2 className="mb-5 text-xl font-semibold text-gray-900">Summary</h2>
                <div className="mb-5 rounded-lg border border-gray-200 p-5">
                  <h3 className="mb-2 text-sm font-semibold text-gray-900">Updated plan</h3>
                  <div className="font-semibold text-gray-900">{newPlan.name}</div>
                  <p className="mt-1 text-sm text-gray-500">{newPlan.description}</p>
                  <div className="mt-2 text-sm font-medium text-gray-900">{formatNaira(newPlan.priceKobo)} / month</div>
                </div>
                <div className="mb-5 rounded-lg border border-gray-200 p-5">
                  <h3 className="mb-4 text-sm font-semibold text-gray-900">Upcoming payment</h3>
                  <div className="flex justify-between text-sm text-gray-700">
                    <div>
                      <div>Proration for {plan.name}</div>
                      <div className="mt-1 text-xs text-gray-400">
                        {formatDate(new Date())} to {formatDate(addDays(new Date(), 15))}
                      </div>
                    </div>
                    <div>{formatNaira(credit)}</div>
                  </div>
                  <div className="mt-3 flex justify-between text-sm text-gray-700">
                    <div>
                      <div>Proration for {newPlan.name}</div>
                      <div className="mt-1 text-xs text-gray-400">
                        {formatDate(new Date())} to {formatDate(addDays(new Date(), 15))}
                      </div>
                    </div>
                    <div>{formatNaira(charge)}</div>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between text-sm font-semibold text-gray-900">
                    <span>{total < 0 ? "Credit applied to next invoice" : "Total due now"}</span>
                    <span>{formatNaira(total)}</span>
                  </div>
                </div>
                <ActionButton
                  phase={phase}
                  fullWidth
                  className={PRIMARY_BTN}
                  label={total < 0 ? "Confirm plan change" : "Confirm and pay"}
                  onClick={() => run(() => dispatch({ type: "CONFIRM_PLAN_CHANGE" }))}
                />
              </div>
            );
          })()}

        {state.view === "pause-confirm" && (
          <div>
            <BackButton onClick={() => navigate("subscription", { type: "OPEN_SUBSCRIPTION" })} />
            <h2 className="mb-2 text-xl font-semibold text-gray-900">Pause subscription</h2>
            <p className="mb-5 text-sm text-gray-500">
              Billing stops immediately. Your plan and history stay exactly as they are, resume any time and billing
              picks back up on the same cycle.
            </p>
            <ActionButton
              phase={phase}
              className={PRIMARY_BTN}
              label="Pause subscription"
              onClick={() => run(() => dispatch({ type: "CONFIRM_PAUSE" }))}
            />
          </div>
        )}

        {state.view === "pause-success" && (
          <div>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">Subscription paused</h2>
            <p className="mb-5 text-sm text-gray-500">
              {plan.name} is paused. No charges will fire until you resume.
            </p>
            <Button className={PRIMARY_BTN} onClick={() => navigate("home", { type: "GO_HOME" })}>
              Done
            </Button>
          </div>
        )}

        {state.view === "cancel-deflect" && (
          <div>
            <BackButton onClick={() => navigate("subscription", { type: "OPEN_SUBSCRIPTION" })} />
            <h2 className="mb-2 text-xl font-semibold text-gray-900">Before you cancel</h2>
            <p className="mb-5 text-sm text-gray-500">
              Two alternatives that keep your history intact. No coupon, no discount code, just the two things a
              subscription can actually do besides end.
            </p>
            <div className="mb-5 flex gap-2">
              <Button size="sm" className={SECONDARY_BTN} onClick={() => dispatch({ type: "OPEN_PAUSE_CONFIRM" })}>
                Pause instead
              </Button>
              <Button size="sm" className={SECONDARY_BTN} onClick={() => navigate("choose-plan", { type: "OPEN_CHOOSE_PLAN" })}>
                Downgrade instead
              </Button>
            </div>
            <Button
              className={cn(DANGER_BTN, "w-full")}
              onClick={() => dispatch({ type: "CONTINUE_TO_CANCEL" })}
            >
              Continue to cancel
            </Button>
          </div>
        )}

        {state.view === "cancel-confirm" && (
          <div>
            <BackButton onClick={() => dispatch({ type: "OPEN_CANCEL_DEFLECT" })} />
            <h2 className="mb-2 text-xl font-semibold text-gray-900">Cancel {plan.name}</h2>
            <p className="mb-5 text-sm text-gray-500">
              You&apos;ll keep access until {formatDate(state.periodEnd)}.
            </p>
            <label className="mb-1.5 block text-xs font-medium text-gray-500">
              Why are you cancelling? (optional)
            </label>
            <select
              className="mb-5 h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 text-sm text-gray-900 outline-none focus-visible:border-[#6C5CE0] focus-visible:ring-3 focus-visible:ring-[#6C5CE0]/20"
              value={state.cancelReason ?? ""}
              onChange={(e) => dispatch({ type: "SET_CANCEL_REASON", reason: e.target.value as never })}
            >
              <option value="" disabled>
                Select a reason
              </option>
              {CANCELLATION_REASONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
            <ActionButton
              phase={phase}
              fullWidth
              className={DANGER_BTN}
              label="Cancel plan"
              onClick={() => run(() => dispatch({ type: "CONFIRM_CANCEL" }))}
            />
          </div>
        )}

        {state.view === "cancel-success" && (
          <div>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">Plan canceled</h2>
            <p className="mb-5 text-sm text-gray-500">
              {plan.name} ends {state.cancelAt ? formatDate(state.cancelAt) : "-"}. You still have access until then
              and can reactivate anytime.
            </p>
            <Button className={PRIMARY_BTN} onClick={() => navigate("home", { type: "GO_HOME" })}>
              Done
            </Button>
          </div>
        )}

        {state.view === "reactivate-confirm" && (
          <div>
            <BackButton onClick={() => navigate("subscription", { type: "OPEN_SUBSCRIPTION" })} />
            <h2 className="mb-2 text-xl font-semibold text-gray-900">Reactivate plan</h2>
            <p className="mb-5 text-sm text-gray-500">
              {plan.name}. You&apos;ll be charged {formatNaira(plan.priceKobo)} on {formatDate(state.periodEnd)}.
            </p>
            <ActionButton
              phase={phase}
              className={PRIMARY_BTN}
              label="Reactivate plan"
              onClick={() => run(() => dispatch({ type: "CONFIRM_REACTIVATE" }))}
            />
          </div>
        )}
          </>
        )}
      </main>

      {state.showPaymentModal && (
        <PaymentMethodModal
          onClose={() => dispatch({ type: "CLOSE_PAYMENT_MODAL" })}
          onSave={(method) => dispatch({ type: "UPDATE_PAYMENT_METHOD", method })}
        />
      )}
    </div>
  );
}
