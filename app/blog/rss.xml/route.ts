import { CONFIG } from "@/lib/config";
import { getPosts } from "@/lib/blog";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Flux RSS al blogului (pentru cititoare de știri și pentru indexare mai rapidă). */
export function GET() {
  const posts = getPosts();
  const items = posts.map((p) => `
    <item>
      <title>${esc(p.title)}</title>
      <link>${CONFIG.siteUrl}/blog/${p.slug}/</link>
      <guid isPermaLink="true">${CONFIG.siteUrl}/blog/${p.slug}/</guid>
      <description>${esc(p.description)}</description>
      <category>${esc(p.category)}</category>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    </item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blogul Codito</title>
    <link>${CONFIG.siteUrl}/blog/</link>
    <description>Articole pentru părinți despre programare, inteligență artificială și timpul pe ecran.</description>
    <language>ro</language>
    <atom:link href="${CONFIG.siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
