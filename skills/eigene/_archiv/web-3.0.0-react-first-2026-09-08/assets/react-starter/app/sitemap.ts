import type { MetadataRoute } from "next";
import { routes } from "@/lib/routes";
export const dynamic = "force-static";
const base = process.env.SITE_URL ?? "https://example.invalid";
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.filter((r) => r.indexable).map((r) => ({ url: `${base}${r.path}` }));
}
