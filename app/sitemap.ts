import type { MetadataRoute } from "next";
import book from "@/content/book.json";
import { playbookCatalog } from "@/content/playbooks";
import { siteMeta } from "@/content/site";
import { toolPages } from "@/content/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/approach",
    "/results",
    "/industries",
    "/team",
    "/contact",
    "/turn-tax-calculator",
    "/retention-checkup",
    "/insights",
    "/white-papers",
    "/industry-playbooks",
    "/articles",
    "/media",
    "/compare",
    "/security",
    "/free-poc",
    "/channel-partners",
    "/solutions-providers",
    "/privacy",
    "/terms",
    "/for-ai",
    ...toolPages.map((tool) => `/tools/${tool.slug}`),
    ...playbookCatalog.map((item) => `/industry-playbooks/${item.slug}`),
    ...book.map((chapter) => `/white-papers/${chapter.slug}`),
  ];
  return paths.map((path) => ({
    url: new URL(path, siteMeta.url).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
