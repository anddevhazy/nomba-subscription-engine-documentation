"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ActionButton, useActionFeedback } from "@/components/demo/action-button";
import type { PaymentMethod } from "@/lib/demo/portal-data";

export function PaymentMethodModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (method: PaymentMethod) => void;
}) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const { phase, run } = useActionFeedback(null);

  const last4 = cardNumber.replace(/\D/g, "").slice(-4).padStart(4, "0");
  const canSave = cardNumber.replace(/\D/g, "").length >= 12 && expiry.length >= 4 && cvv.length >= 3;

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="rounded-2xl p-6 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">Add payment method</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Tokenised through Nomba Checkout. We never see or store your raw card number.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-500">Card number</label>
            <Input
              placeholder="1234 1234 1234 1234"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="h-10 rounded-md border-gray-300 focus-visible:border-[#6C5CE0] focus-visible:ring-[#6C5CE0]/20"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-500">Expiry</label>
              <Input
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="h-10 rounded-md border-gray-300 focus-visible:border-[#6C5CE0] focus-visible:ring-[#6C5CE0]/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-500">CVV</label>
              <Input
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="h-10 rounded-md border-gray-300 focus-visible:border-[#6C5CE0] focus-visible:ring-[#6C5CE0]/20"
              />
            </div>
          </div>
          <p className="text-xs text-gray-400">
            By continuing, you allow this merchant to charge this card for future subscription payments.
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            className="rounded-md border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200"
            onClick={onClose}
            disabled={phase !== "idle"}
          >
            Go back
          </Button>
          <ActionButton
            phase={phase}
            disabled={!canSave}
            className="rounded-full bg-[#6C5CE0] px-5 text-white hover:bg-[#5B4BD6]"
            label="Update"
            onClick={() => run(() => onSave({ brand: "Verve", last4, expiry }))}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
