"use client";

import { useEffect, useId, useRef, useState } from "react";

type MermaidProps = {
  chart: string;
  className?: string;
};

let mermaidInitialized = false;

export function Mermaid({ chart, className }: MermaidProps) {
  const id = useId().replace(/:/g, "-");
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    import("mermaid").then(async ({ default: mermaid }) => {
      if (!mermaidInitialized) {
        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          fontFamily: "var(--font-sans, ui-sans-serif)",
          flowchart: { curve: "basis", padding: 12 },
          themeVariables: {
            fontSize: "13.5px",
            primaryColor: "#ffffff",
            primaryBorderColor: "#e5e2d9",
            primaryTextColor: "#1a1a17",
            lineColor: "#c9c5b8",
            background: "#fafaf7",
          },
        });
        mermaidInitialized = true;
      }

      const { svg: rendered } = await mermaid.render(`mermaid-${id}`, chart);
      if (!cancelled) setSvg(rendered);
    });

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return (
    <div
      ref={containerRef}
      className={`mermaid-diagram mb-6 overflow-x-auto rounded-xl border border-border bg-[#fafaf7] p-5 ${className ?? ""}`}
    >
      {svg ? (
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <div className="py-8 text-center text-[12.5px] text-text-muted">Loading diagram…</div>
      )}
    </div>
  );
}
