import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allSlugs } from "@/lib/nav";
import { getPage, getHeadings } from "@/lib/content";
import { Toc } from "@/components/docs/Toc";

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
  const { meta } = await getPage(resolved);
  return {
    title: `${meta.title} — Nomba Subscription Engine`,
    description: meta.lede,
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

  const { meta, Content } = await getPage(resolved);
  const headings = getHeadings(resolved);

  return (
    <>
      <div className="content-col">
        <main>
          <div className="eyebrow">{meta.eyebrow}</div>
          <div className="title-row">
            <h1>{meta.title}</h1>
            <div className="ask-ai-btn">☀️ Open in Claude ▾</div>
          </div>
          <p className="lede">{meta.lede}</p>
          <Content />
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
