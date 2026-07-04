"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNav } from "@/components/docs/mobile-nav";
import { DASHBOARD_URL, SWAGGER_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function DocsHeader() {
  const pathname = usePathname();
  const isApiReference = pathname.startsWith("/api-reference");

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[106px] border-b border-border bg-white">
      <div className="flex h-[62px] items-center gap-[18px] border-b border-border px-6">
        <MobileNav />
        <Link
          href="/introduction"
          className="flex items-center gap-2 text-lg font-bold whitespace-nowrap"
        >
          <img src="/brand/nomba-icon-dark.svg" alt="Nomba" className="h-[26px] w-[22px]" />
          Nomba Subscriptions
        </Link>
        <div className="mx-auto hidden max-w-[420px] flex-1 items-center gap-2 rounded-[10px] border border-border bg-[#f7f6f2] px-3.5 py-2.5 text-sm text-text-muted max-[820px]:hidden sm:flex">
          🔎 Search docs...
          <kbd className="ml-auto rounded border border-border bg-white px-1.5 py-px text-[11px] text-text-muted">
            ⌘K
          </kbd>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <a
            href={SWAGGER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1 rounded-lg border border-border px-4 py-2 text-[13.5px] font-semibold whitespace-nowrap text-text-secondary hover:bg-[#f7f6f2] hover:text-foreground sm:flex"
          >
            Swagger
          </a>
          <a
            href={DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-lg bg-gold px-4 py-2 text-[13.5px] font-semibold whitespace-nowrap text-white"
          >
            Dashboard
            <ChevronRight className="size-4" strokeWidth={2.5} />
          </a>
        </div>
      </div>
      <div className="flex h-11 items-center gap-2 px-6">
        <div className="flex h-full gap-[26px]">
          <Link
            href="/introduction"
            className={cn(
              "flex h-full items-center border-b-2 border-transparent text-[14.5px] font-medium text-text-secondary",
              !isApiReference && "border-gold font-semibold text-foreground",
            )}
          >
            Documentation
          </Link>
          <Link
            href="/api-reference"
            className={cn(
              "flex h-full items-center border-b-2 border-transparent text-[14.5px] font-medium text-text-secondary",
              isApiReference && "border-gold font-semibold text-foreground",
            )}
          >
            API Reference
          </Link>
        </div>
      </div>
    </header>
  );
}
