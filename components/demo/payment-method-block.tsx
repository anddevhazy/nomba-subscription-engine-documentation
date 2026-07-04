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
    <div>
      <h3 className="mb-3 text-xl font-semibold text-gray-900">Payment method</h3>
      <div className="flex items-center justify-between rounded-lg border border-gray-200 p-5">
        <div className="text-sm text-gray-900">
          {paymentMethod.brand} •••• {paymentMethod.last4}
          <div className="mt-1 text-xs text-gray-400">Expires {paymentMethod.expiry}</div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="rounded-full border-transparent bg-gray-100 text-gray-600">
            Default
          </Badge>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-gray-400 hover:text-gray-700"
              onClick={handleDeleteClick}
              aria-label="Remove payment method"
            >
              <X />
            </Button>
            {showTooltip && (
              <div className="absolute top-full right-0 z-10 mt-1.5 w-56 rounded-lg border border-gray-200 bg-white p-2.5 text-xs text-gray-500 shadow-md">
                Your default payment method can&apos;t be deleted because you have an active plan.
              </div>
            )}
          </div>
        </div>
      </div>
      <Button
        size="sm"
        className="mt-3 rounded-md border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200"
        onClick={onChangeClick}
      >
        {changeLabel}
      </Button>
    </div>
  );
}
