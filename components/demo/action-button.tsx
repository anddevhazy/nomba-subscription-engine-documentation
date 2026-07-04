"use client";

import { useEffect, useState } from "react";
import { Loader2, Check } from "lucide-react";
import { Button, type buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

export type ActionPhase = "idle" | "loading" | "success";

export function useActionFeedback(resetKey: unknown) {
  const [phase, setPhase] = useState<ActionPhase>("idle");

  useEffect(() => {
    setPhase("idle");
  }, [resetKey]);

  function run(action: () => void) {
    setPhase("loading");
    setTimeout(() => {
      setPhase("success");
      setTimeout(() => {
        action();
      }, 450);
    }, 650);
  }

  return { phase, run };
}

type ActionButtonProps = {
  phase: ActionPhase;
  onClick: () => void;
  label: string;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  className?: string;
};

export function ActionButton({
  phase,
  onClick,
  label,
  disabled = false,
  fullWidth = false,
  variant = "default",
  size = "default",
  className,
}: ActionButtonProps) {
  const isBusy = phase !== "idle";
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled || isBusy}
      className={cn(
        fullWidth && "w-full",
        className,
        phase === "success" &&
          "bg-green-600 text-white hover:bg-green-600 disabled:opacity-100",
      )}
    >
      {phase === "idle" && label}
      {phase === "loading" && <Loader2 className="size-4 animate-spin" />}
      {phase === "success" && <Check className="size-4" />}
    </Button>
  );
}
