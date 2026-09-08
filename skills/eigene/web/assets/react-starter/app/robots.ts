import type { MetadataRoute } from "next";
export const dynamic = "force-static";
const base = process.env.SITE_URL!;
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${base}/sitemap.xml` };
}
