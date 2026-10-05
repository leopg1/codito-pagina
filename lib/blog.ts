import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/*
 * Articolele de blog stau în content/blog/*.md.
 * Antet (frontmatter) între două linii „---”:
 *   title, description, date (AAAA-LL-ZZ), updated (opțional), category, excerpt (opțional)
 * Corp: Markdown simplu: ## titlu, ### subtitlu, paragrafe, **bold**, *italic*, [link](url),
 * liste cu „- ” sau „1. ”, citate cu „> ”, și blocul special „:::cta” (îndemn spre lecția gratuită).
 */

export type Post = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  date: string;
  updated: string;
  category: string;
  minutes: number;
  words: number;
  body: string;
  headings: { id: string; text: string }[];
};

const DIR = join(process.cwd(), "content", "blog");

export const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function parse(file: string): Post {
  const raw = readFileSync(join(DIR, file), "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`Articolul ${file} nu are antet (---).`);
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"(.*)"$/, "$1");
  }
  const body = m[2].trim();
  const words = body.replace(/[#>*_`\-\[\]()]/g, " ").split(/\s+/).filter(Boolean).length;
  const headings = [...body.matchAll(/^## (.+)$/gm)].map((h) => ({ id: slugify(h[1]), text: h[1].trim() }));
  return {
    slug: file.replace(/\.md$/, ""),
    title: meta.title,
    seoTitle: meta.seoTitle || meta.title,
    description: meta.description,
    excerpt: meta.excerpt || meta.description,
    date: meta.date,
    updated: meta.updated || meta.date,
    category: meta.category || "Pentru părinți",
    minutes: Math.max(2, Math.round(words / 180)),
    words,
    body,
    headings,
  };
}

/** Toate articolele, cele mai noi primele. */
export function getPosts(): Post[] {
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map(parse)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

const MONTHS = ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"];
export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};
