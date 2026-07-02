import type { Heading } from "@/lib/content";

export function Toc({ headings }: { headings: Heading[] }) {
  if (!headings.length) return <aside className="toc" />;
  return (
    <aside className="toc">
      <div className="toc-title">☰ On this page</div>
      {headings.map((h) => (
        <a key={h.id} href={`#h-${h.id}`}>
          {h.text}
        </a>
      ))}
    </aside>
  );
}
