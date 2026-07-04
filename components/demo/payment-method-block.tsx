"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PaymentMethod } from "@/lib/demo/portal-data";

export function PaymentMethodBlock({
  paymentMethod,
  onChangeClick,
  changeLabel = "Add payment method",
}: {
  paymentMethod: PaymentMethod;
  onChangeClick: () => void;
  changeLabel?: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleDeleteClick() {
    setShowTooltip(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowTooltip(false), 3200);
  }

  return (
    <div className="rounded-xl border border-border p-4">
      <h3 className="mb-3 text-sm font-semibold">Payment method</h3>
      <div className="flex items-center justify-between">
        <div className="text-sm">
          {paymentMethod.brand} •••• {paymentMethod.last4}
          <div className="text-xs text-text-muted">Expires {paymentMethod.expiry}</div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-text-secondary">
            Default
          </Badge>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleDeleteClick}
              aria-label="Remove payment method"
            >
              <X />
            </Button>
            {showTooltip && (
              <div className="absolute top-full right-0 z-10 mt-1.5 w-56 rounded-lg border border-border bg-popover p-2.5 text-xs text-text-secondary shadow-md">
                Your default payment method can&apos;t be deleted because you have an active plan.
              </div>
            )}
          </div>
        </div>
      </div>
      <Button variant="outline" size="sm" className="mt-3" onClick={onChangeClick}>
        {changeLabel}
      </Button>
    </div>
  );
}
