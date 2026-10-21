import type { MetadataRoute } from "next";
import { getPortfolioData } from "@/sanity/lib/fetch";
import { client } from "@/sanity/lib/client";
import { projectSitemapQuery } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { settings } = await getPortfolioData();
  if (settings?.noIndex) return [];
  const siteUrl = (settings?.canonicalUrl || "https://sabeera.vercel.app").replace(/\/$/, "");
  const projects = await client.fetch<{ _id: string; slug?: string; _updatedAt: string }[]>(projectSitemapQuery, {}, { next: { revalidate: 60 } });

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projects.map(project => ({
      url: `${siteUrl}/projects/${encodeURIComponent(project.slug || project._id)}`,
      lastModified: new Date(project._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
