import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://xn--b1aajbbhwfgep.xn--p1ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/tours/", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/parties/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/camp/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/culture/", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/rehab/", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/reviews/", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/contacts/", priority: 0.8, changeFrequency: "yearly" as const },
  ];

  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
