import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function CardGrid({
  cols,
  children,
}: {
  cols: 1 | 2 | 3;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mb-[22px] grid grid-cols-1 gap-3.5",
        cols === 2 && "sm:grid-cols-2",
        cols === 3 && "sm:grid-cols-3",
      )}
    >
      {children}
    </div>
  );
}

const cardBase =
  "rounded-xl border border-border bg-white px-5 py-[18px] text-[13.5px] leading-[1.55] text-text-secondary";
const cardIconBase = "mb-3 flex size-7 items-center justify-center text-[17px] text-gold-dark";
const cardTitleBase = "mb-1.5 text-[15.5px] font-semibold text-foreground";

export function CardLink({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: string;
  title: string;
  description: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(cardBase, "hover:border-gold hover:shadow-[0_2px_12px_rgba(201,151,31,0.1)]")}
    >
      <div className={cardIconBase}>{icon}</div>
      <div className={cardTitleBase}>{title}</div>
      <div>{description}</div>
    </Link>
  );
}

export function Card({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={cardBase}>
      <div className={cardIconBase}>{icon}</div>
      <div className={cardTitleBase}>{title}</div>
      <div className="[&>p]:mb-3 [&>p:last-child]:mb-0">{children}</div>
    </div>
  );
}
