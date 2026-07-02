import Link from "next/link";
import { DESCRIPTIONS, groupFor, titleFor } from "@/lib/nav";
import type { PageMeta } from "./types";

export function stubMeta(slug: string): PageMeta {
  const group = groupFor(slug);
  return {
    eyebrow: group ? group.group : "Docs",
    title: titleFor(slug),
    lede: DESCRIPTIONS[slug] || "Documentation for this page.",
  };
}

export function StubBody() {
  return (
    <>
      <div className="stub-badge">Template page, content pending</div>
      <p className="body-secondary">
        This page follows the same structure as the built-out pages (Introduction, How it works, Webhooks, Webhook
        signature verification). Draft it from{" "}
        <code className="inline">docs-reference/BRD_Nomba_Subscriptions_Engine.md</code>,{" "}
        <code className="inline">docs-reference/PRD_Nomba_Subscriptions_Engine.md</code>, and{" "}
        <code className="inline">docs-reference/BACKEND_README.md</code> to complete this section.
      </p>
      <div className="card-grid cols-2" style={{ marginTop: "28px" }}>
        <Link className="card" href="/introduction">
          <div className="card-icon">←</div>
          <div className="card-title">Introduction</div>
          <div className="card-desc">Back to the start.</div>
        </Link>
        <Link className="card" href="/how-it-works">
          <div className="card-icon">→</div>
          <div className="card-title">How it works</div>
          <div className="card-desc">See the full arc end to end.</div>
        </Link>
      </div>
    </>
  );
}
