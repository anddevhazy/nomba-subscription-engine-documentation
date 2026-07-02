"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarContext";

export function TopBar() {
  const pathname = usePathname();
  const { toggle } = useSidebar();
  const isApiReference = pathname.startsWith("/api-reference");

  return (
    <div className="topbar">
      <div className="topbar-row1">
        <button
          className="menu-btn"
          onClick={toggle}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
        <Link className="brand" href="/introduction">
          <span className="mark">N</span> Nomba Subscriptions
        </Link>
        <div className="searchbox">
          🔎&nbsp; Search docs... <kbd>⌘K</kbd>
        </div>
        <div className="top-right">
          <Link className="btn-cta" href="/quick-start">
            Dashboard →
          </Link>
          <div className="theme-toggle">☀️</div>
        </div>
      </div>
      <div className="topbar-row2">
        <div className="top-tabs">
          <Link href="/introduction" className={isApiReference ? "" : "active"}>
            Documentation
          </Link>
          <Link
            href="/api-reference/introduction"
            className={isApiReference ? "active" : ""}
          >
            API Reference
          </Link>
        </div>
      </div>
    </div>
  );
}
