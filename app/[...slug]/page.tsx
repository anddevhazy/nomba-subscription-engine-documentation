import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allSlugs } from "@/lib/nav";
import { getPageContent, extractHeadings } from "@/lib/content";
import { Toc } from "@/components/Toc";

type Params = { slug: string[] };

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug: slug.split("/") }));
}

function slugFromParams(slug: string[]): string | null {
  const joined = slug.join("/");
  return allSlugs().includes(joined) ? joined : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resolved = slugFromParams(slug);
  if (!resolved) return {};
  const content = getPageContent(resolved);
  return {
    title: `${content.title} — Nomba Subscription Engine`,
    description: content.lede,
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const resolved = slugFromParams(slug);
  if (!resolved) notFound();

  const content = getPageContent(resolved);
  const headings = extractHeadings(content.body);

  return (
    <>
      <div className="content-col">
        <main>
          <div className="eyebrow">{content.eyebrow}</div>
          <div className="title-row">
            <h1>{content.title}</h1>
            <div className="ask-ai-btn">☀️ Open in Claude ▾</div>
          </div>
          <p className="lede">{content.lede}</p>
          <div dangerouslySetInnerHTML={{ __html: content.body }} />
          <div className="page-footer">
            <span>Nomba Subscription Engine</span>
            <span>Edit this page on GitHub</span>
          </div>
        </main>
      </div>
      <Toc headings={headings} />
    </>
  );
}
