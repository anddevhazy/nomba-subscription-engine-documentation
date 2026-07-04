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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add payment method</DialogTitle>
          <DialogDescription>
            Tokenised through Nomba Checkout. We never see or store your raw card number.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-text-secondary">Card number</label>
            <Input
              placeholder="1234 1234 1234 1234"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-text-secondary">Expiry</label>
              <Input placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text-secondary">CVV</label>
              <Input placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} />
            </div>
          </div>
          <p className="text-xs text-text-muted">
            By continuing, you allow this merchant to charge this card for future subscription payments.
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={phase !== "idle"}>
            Go back
          </Button>
          <ActionButton
            phase={phase}
            disabled={!canSave}
            label="Update"
            onClick={() => run(() => onSave({ brand: "Verve", last4, expiry }))}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
