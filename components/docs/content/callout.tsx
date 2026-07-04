import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CalloutProps = {
  variant: "note" | "tip";
  icon?: string;
  children: ReactNode;
};

const defaultIcon: Record<CalloutProps["variant"], string> = {
  note: "ⓘ",
  tip: "💡",
};

const variantClasses: Record<CalloutProps["variant"], string> = {
  note: "border-[#d3e0fa] bg-blue-light text-blue-dark",
  tip: "border-[#ccebd9] bg-green-light text-green-dark",
};

export function Callout({ variant, icon, children }: CalloutProps) {
  return (
    <div
      className={cn(
        "mb-5 flex gap-2.5 rounded-[10px] border p-[14px_16px] text-[14.5px]",
        "[&>p]:m-0 [&>p+p]:mt-2 [&_strong]:text-inherit",
        variantClasses[variant],
      )}
    >
      <div className="shrink-0 font-bold">{icon ?? defaultIcon[variant]}</div>
      {children}
    </div>
  );
}
