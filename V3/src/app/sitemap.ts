import type { MetadataRoute } from "next";
import { SITE } from "@/lib/georgian-menu";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/menu/", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "/delivery/", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/about/", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/contacts/", priority: 0.85, changeFrequency: "yearly" as const },
  ];

  return routes.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
