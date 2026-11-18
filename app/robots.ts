import type { MetadataRoute } from "next";
import { siteMeta } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  if (!siteMeta.indexable) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/thanks", "/prepare", "/demo"] }],
    sitemap: new URL("/sitemap.xml", siteMeta.url).toString(),
  };
}
