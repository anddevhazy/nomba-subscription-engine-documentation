"use client";

import { useReducer } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
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
import { portalReducer } from "@/lib/demo/portal-reducer";
import { InvoiceHistory } from "@/components/demo/invoice-history";
import { PaymentMethodModal } from "@/components/demo/payment-method-modal";
import { PaymentMethodBlock } from "@/components/demo/payment-method-block";
import { ActionButton, useActionFeedback } from "@/components/demo/action-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="ghost" size="sm" className="-ml-2.5 mb-4" onClick={onClick}>
      <ArrowLeft /> Back
    </Button>
  );
}

export function PortalDemo() {
  const [state, dispatch] = useReducer(portalReducer, undefined, initialPortalState);
  const plan = planById(state.planId);
  const { phase, run } = useActionFeedback(state.view);

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="flex w-64 shrink-0 flex-col gap-6 border-r border-border p-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🏋️</span>
            <span className="font-semibold">Lumen</span>
            <Badge variant="outline" className="ml-auto">
              Demo mode
            </Badge>
          </div>
          <p className="mt-2 text-sm text-text-secondary">Book classes. Track your plan. Show up.</p>
        </div>
        <Link href="/introduction" className="text-sm font-medium text-gold-dark hover:underline">
          ← Return to Lumen
        </Link>
      </aside>

      <main className="mx-auto w-full max-w-lg flex-1 px-8 py-10">
        <div className="mb-6 flex justify-end">
          <Button variant="ghost" size="sm" onClick={() => dispatch({ type: "RESET" })}>
            <RotateCcw /> Reset demo
          </Button>
        </div>

        {state.view === "home" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold tracking-tight">Active plan</h2>
            {state.status !== "canceled" ? (
              <button
                className="flex w-full items-center justify-between rounded-xl border border-border p-4 text-left transition-colors hover:border-gold"
                onClick={() => dispatch({ type: "OPEN_SUBSCRIPTION" })}
              >
                <div>
                  <div className="font-semibold">{plan.name}</div>
                  {state.status === "paused" && (
                    <Badge variant="outline" className="mt-1">
                      Paused
                    </Badge>
                  )}
                </div>
                <div className="text-right text-sm">
                  <div>
                    {formatNaira(plan.priceKobo)} due {formatDate(state.periodEnd)}
                  </div>
                  <div className="text-xs text-text-muted">
                    {state.paymentMethod.brand} •••• {state.paymentMethod.last4}
                  </div>
                </div>
              </button>
            ) : (
              <button
                className="flex w-full items-center justify-between rounded-xl border border-border p-4 text-left transition-colors hover:border-gold"
                onClick={() => dispatch({ type: "OPEN_SUBSCRIPTION" })}
              >
                <div>
                  <div className="font-semibold">{plan.name}</div>
                  <Badge variant="outline" className="mt-1 bg-amber-50 text-amber-700">
                    Canceled
                  </Badge>
                </div>
                <div className="text-right text-sm">
                  <div>Ends {state.cancelAt ? formatDate(state.cancelAt) : "-"}</div>
                </div>
              </button>
            )}

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
            <BackButton onClick={() => dispatch({ type: "GO_HOME" })} />
            <h2 className="text-xl font-bold tracking-tight">{plan.name}</h2>
            {state.status === "canceled" ? (
              <>
                <div className="mt-2 flex gap-2">
                  <Badge variant="outline">Active discounts: none</Badge>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700">
                    Canceled
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-text-secondary">
                  Ends {state.cancelAt ? formatDate(state.cancelAt) : "-"}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => dispatch({ type: "OPEN_REACTIVATE_CONFIRM" })}
                >
                  Reactivate plan
                </Button>
                <div className="mt-6 rounded-xl border border-border p-4">
                  <h3 className="mb-2 text-sm font-semibold">Upcoming payment</h3>
                  <p className="text-sm text-text-muted">No charges scheduled</p>
                </div>
              </>
            ) : (
              <>
                <p className="mt-2 text-sm text-text-secondary">
                  {state.status === "paused"
                    ? "Paused"
                    : `Bills monthly • ${formatNaira(plan.priceKobo)} due ${formatDate(state.periodEnd)}`}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => dispatch({ type: "OPEN_CHOOSE_PLAN" })}>
                    Update plan
                  </Button>
                  {state.status === "active" ? (
                    <Button variant="outline" size="sm" onClick={() => dispatch({ type: "OPEN_PAUSE_CONFIRM" })}>
                      Pause subscription
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => dispatch({ type: "RESUME_SUBSCRIPTION" })}>
                      Resume subscription
                    </Button>
                  )}
                  <Button variant="destructive" size="sm" onClick={() => dispatch({ type: "OPEN_CANCEL_DEFLECT" })}>
                    Cancel plan
                  </Button>
                </div>
                {state.status === "active" && (
                  <div className="mt-6 rounded-xl border border-border p-4">
                    <h3 className="mb-3 text-sm font-semibold">Upcoming payment</h3>
                    <div className="flex justify-between text-sm">
                      <div>
                        <div>{plan.name}</div>
                        <div className="text-xs text-text-muted">
                          {formatDate(state.periodStart)} to {formatDate(state.periodEnd)}
                        </div>
                      </div>
                      <div>{formatNaira(plan.priceKobo)}</div>
                    </div>
                    <Separator className="my-3" />
                    <div className="flex justify-between text-sm font-semibold">
                      <span>Total</span>
                      <span>{formatNaira(plan.priceKobo)}</span>
                    </div>
                  </div>
                )}
              </>
            )}
            <div className="mt-6">
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
            <BackButton onClick={() => dispatch({ type: "CANCEL_PLAN_SELECTION" })} />
            <h2 className="mb-4 text-xl font-bold tracking-tight">Choose your plan</h2>
            <div className="space-y-3">
              {PLANS.slice()
                .reverse()
                .map((p) => (
                  <div
                    key={p.id}
                    className={`rounded-xl border p-4 ${p.id === state.planId ? "border-gold bg-gold-light/40" : "border-border"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">{p.name}</div>
                      {p.id === state.planId && <Badge variant="outline">Current plan</Badge>}
                    </div>
                    <p className="mt-1 text-sm text-text-secondary">{p.description}</p>
                    <div className="mt-2 text-sm font-medium">{formatNaira(p.priceKobo)} / month</div>
                    {p.id !== state.planId && (
                      <Button
                        className="mt-3 w-full"
                        onClick={() => dispatch({ type: "SELECT_PLAN", planId: p.id })}
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
                <BackButton onClick={() => dispatch({ type: "OPEN_CHOOSE_PLAN" })} />
                <h2 className="mb-4 text-xl font-bold tracking-tight">Summary</h2>
                <div className="mb-4 rounded-xl border border-border p-4">
                  <h3 className="mb-2 text-sm font-semibold">Updated plan</h3>
                  <div className="font-semibold">{newPlan.name}</div>
                  <p className="mt-1 text-sm text-text-secondary">{newPlan.description}</p>
                  <div className="mt-2 text-sm font-medium">{formatNaira(newPlan.priceKobo)} / month</div>
                </div>
                <div className="mb-4 rounded-xl border border-border p-4">
                  <h3 className="mb-3 text-sm font-semibold">Upcoming payment</h3>
                  <div className="flex justify-between text-sm">
                    <div>
                      <div>Proration for {plan.name}</div>
                      <div className="text-xs text-text-muted">
                        {formatDate(new Date())} to {formatDate(addDays(new Date(), 15))}
                      </div>
                    </div>
                    <div>{formatNaira(credit)}</div>
                  </div>
                  <div className="mt-2 flex justify-between text-sm">
                    <div>
                      <div>Proration for {newPlan.name}</div>
                      <div className="text-xs text-text-muted">
                        {formatDate(new Date())} to {formatDate(addDays(new Date(), 15))}
                      </div>
                    </div>
                    <div>{formatNaira(charge)}</div>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between text-sm font-semibold">
                    <span>{total < 0 ? "Credit applied to next invoice" : "Total due now"}</span>
                    <span>{formatNaira(total)}</span>
                  </div>
                </div>
                <ActionButton
                  phase={phase}
                  fullWidth
                  label={total < 0 ? "Confirm plan change" : "Confirm and pay"}
                  onClick={() => run(() => dispatch({ type: "CONFIRM_PLAN_CHANGE" }))}
                />
              </div>
            );
          })()}

        {state.view === "pause-confirm" && (
          <div>
            <BackButton onClick={() => dispatch({ type: "OPEN_SUBSCRIPTION" })} />
            <h2 className="mb-2 text-xl font-bold tracking-tight">Pause subscription</h2>
            <p className="mb-4 text-sm text-text-secondary">
              Billing stops immediately. Your plan and history stay exactly as they are, resume any time and billing
              picks back up on the same cycle.
            </p>
            <ActionButton
              phase={phase}
              label="Pause subscription"
              onClick={() => run(() => dispatch({ type: "CONFIRM_PAUSE" }))}
            />
          </div>
        )}

        {state.view === "pause-success" && (
          <div>
            <h2 className="mb-2 text-xl font-bold tracking-tight">Subscription paused</h2>
            <p className="mb-4 text-sm text-text-secondary">
              {plan.name} is paused. No charges will fire until you resume.
            </p>
            <Button onClick={() => dispatch({ type: "GO_HOME" })}>Done</Button>
          </div>
        )}

        {state.view === "cancel-deflect" && (
          <div>
            <BackButton onClick={() => dispatch({ type: "OPEN_SUBSCRIPTION" })} />
            <h2 className="mb-2 text-xl font-bold tracking-tight">Before you cancel</h2>
            <p className="mb-4 text-sm text-text-secondary">
              Two alternatives that keep your history intact. No coupon, no discount code, just the two things a
              subscription can actually do besides end.
            </p>
            <div className="mb-4 flex gap-2">
              <Button variant="outline" size="sm" onClick={() => dispatch({ type: "OPEN_PAUSE_CONFIRM" })}>
                Pause instead
              </Button>
              <Button variant="outline" size="sm" onClick={() => dispatch({ type: "OPEN_CHOOSE_PLAN" })}>
                Downgrade instead
              </Button>
            </div>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => dispatch({ type: "CONTINUE_TO_CANCEL" })}
            >
              Continue to cancel
            </Button>
          </div>
        )}

        {state.view === "cancel-confirm" && (
          <div>
            <BackButton onClick={() => dispatch({ type: "OPEN_CANCEL_DEFLECT" })} />
            <h2 className="mb-2 text-xl font-bold tracking-tight">Cancel {plan.name}</h2>
            <p className="mb-4 text-sm text-text-secondary">
              You&apos;ll keep access until {formatDate(state.periodEnd)}.
            </p>
            <label className="mb-1 block text-xs font-medium text-text-secondary">
              Why are you cancelling? (optional)
            </label>
            <select
              className="mb-4 h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
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
              variant="destructive"
              label="Cancel plan"
              onClick={() => run(() => dispatch({ type: "CONFIRM_CANCEL" }))}
            />
          </div>
        )}

        {state.view === "cancel-success" && (
          <div>
            <h2 className="mb-2 text-xl font-bold tracking-tight">Plan canceled</h2>
            <p className="mb-4 text-sm text-text-secondary">
              {plan.name} ends {state.cancelAt ? formatDate(state.cancelAt) : "-"}. You still have access until then
              and can reactivate anytime.
            </p>
            <Button onClick={() => dispatch({ type: "GO_HOME" })}>Done</Button>
          </div>
        )}

        {state.view === "reactivate-confirm" && (
          <div>
            <BackButton onClick={() => dispatch({ type: "OPEN_SUBSCRIPTION" })} />
            <h2 className="mb-2 text-xl font-bold tracking-tight">Reactivate plan</h2>
            <p className="mb-4 text-sm text-text-secondary">
              {plan.name}. You&apos;ll be charged {formatNaira(plan.priceKobo)} on {formatDate(state.periodEnd)}.
            </p>
            <ActionButton
              phase={phase}
              label="Reactivate plan"
              onClick={() => run(() => dispatch({ type: "CONFIRM_REACTIVATE" }))}
            />
          </div>
        )}

        <footer className="mt-16 flex items-center gap-4 border-t border-border pt-4 text-xs text-text-muted">
          <span>Powered by Nomba</span>
          <a href="#" className="hover:text-foreground">
            Terms
          </a>
          <a href="#" className="hover:text-foreground">
            Privacy
          </a>
        </footer>
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
