import type { MetadataRoute } from "next";
import { getPortfolioData } from "@/sanity/lib/fetch";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { settings } = await getPortfolioData();
  const siteUrl = (settings?.canonicalUrl || "https://sabeera.vercel.app").replace(/\/$/, "");

  return {
    rules: settings?.noIndex
      ? { userAgent: "*", disallow: "/" }
      : { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
