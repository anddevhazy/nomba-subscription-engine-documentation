import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Flow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-0 rounded-xl border border-border bg-[#fafaf7] p-5">
      {children}
    </div>
  );
}

export function FlowNode({
  variant,
  children,
}: {
  variant?: "accent" | "accent2";
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "min-w-[110px] rounded-lg border border-border bg-white px-3 py-2.5 text-center text-[12.5px] leading-[1.35] font-medium",
        variant === "accent" && "border-gold bg-gold font-semibold text-white",
        variant === "accent2" &&
          "border-green bg-green font-semibold text-white",
      )}
    >
      {children}
    </div>
  );
}

export function FlowArrow() {
  return <div className="px-2 text-base text-text-muted">→</div>;
}
