"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, ICONS } from "@/lib/nav";
import { useSidebar } from "./SidebarContext";

export function Sidebar() {
  const pathname = usePathname();
  const activeSlug = pathname.replace(/^\//, "");
  const { isOpen, close } = useSidebar();

  return (
    <nav className={`sidebar${isOpen ? " open" : ""}`}>
      {NAV.map((g) => (
        <div className="nav-group" key={g.group}>
          <div className="nav-group-title">{g.group}</div>
          {g.items.map((it) => (
            <Link
              key={it.slug}
              href={`/${it.slug}`}
              className={`nav-item${it.slug === activeSlug ? " active" : ""}`}
              onClick={close}
            >
              <span className="ic">{ICONS[it.slug] || "•"}</span>
              {it.title}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
