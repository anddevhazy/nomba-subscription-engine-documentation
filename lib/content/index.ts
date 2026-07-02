import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import { StubBody, stubMeta } from "./stub";
import type { Heading, PageMeta } from "./types";

export type { PageMeta, Heading };

type MdxModule = { default: ComponentType; meta: PageMeta };

async function loadMdxModule(slug: string): Promise<MdxModule | null> {
  try {
    return (await import(`@/content/${slug}.mdx`)) as MdxModule;
  } catch {
    return null;
  }
}

export async function getPage(slug: string): Promise<{ meta: PageMeta; Content: ComponentType }> {
  const mod = await loadMdxModule(slug);
  if (mod) return { meta: mod.meta, Content: mod.default };
  return { meta: stubMeta(slug), Content: StubBody };
}

export function getHeadings(slug: string): Heading[] {
  const filePath = path.join(process.cwd(), "content", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return [];
  const source = fs.readFileSync(filePath, "utf8");
  const heads: Heading[] = [];
  const re = /<h2 id="h-([a-z0-9-]+)">(.*?)<\/h2>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(source))) {
    heads.push({ id: match[1], text: match[2].replace(/<[^>]+>/g, "") });
  }
  return heads;
}
