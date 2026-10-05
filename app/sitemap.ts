import type { MetadataRoute } from "next";
import { CONFIG } from "@/lib/config";
import { TOPICS } from "@/lib/topics";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const main = [{ url: `${CONFIG.siteUrl}/`, changeFrequency: "monthly" as const, priority: 1 }, { url: `${CONFIG.siteUrl}/inscriere/`, changeFrequency: "weekly" as const, priority: 0.8 }];
  const topics = TOPICS.map((t) => ({ url: `${CONFIG.siteUrl}/${t.slug}/`, changeFrequency: "monthly" as const, priority: 0.7 }));
  const legal = ["termeni/", "confidentialitate/", "acord-gdpr/"].map((p) => ({ url: `${CONFIG.siteUrl}/${p}`, changeFrequency: "yearly" as const, priority: 0.3 }));
  return [...main, ...topics, ...legal];
}
