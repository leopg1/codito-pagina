import type { MetadataRoute } from "next";
import { CONFIG } from "@/lib/config";
import { TOPICS } from "@/lib/topics";
import { getPosts } from "@/lib/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-10-05"); // actualizează data când schimbi conținutul paginilor
  const u = (p: string) => `${CONFIG.siteUrl}/${p}`;
  const posts = getPosts();
  const latest = posts[0] ? new Date(posts[0].updated) : now;
  return [
    { url: u(""), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: u("inscriere/"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...TOPICS.map((t) => ({ url: u(`${t.slug}/`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: u("blog/"), lastModified: latest, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((p) => ({ url: u(`blog/${p.slug}/`), lastModified: new Date(p.updated), changeFrequency: "monthly" as const, priority: 0.6 })),
    ...["termeni/", "confidentialitate/", "acord-gdpr/"].map((p) => ({ url: u(p), lastModified: now, changeFrequency: "yearly" as const, priority: 0.2 })),
  ];
}
