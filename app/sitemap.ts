import type { MetadataRoute } from "next";
import { CONFIG } from "@/lib/config";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "termeni/", "confidentialitate/", "acord-gdpr/"].map((p) => ({ url: `${CONFIG.siteUrl}/${p}`, changeFrequency: "monthly", priority: p ? 0.3 : 1 }));
}
