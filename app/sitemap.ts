import type { MetadataRoute } from "next";
import { getPortfolioData } from "@/sanity/lib/fetch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { settings } = await getPortfolioData();
  if (settings?.noIndex) return [];

  return [
    {
      url: settings?.canonicalUrl || "https://sabeera.vercel.app",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
