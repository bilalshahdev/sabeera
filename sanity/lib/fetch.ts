import { client } from "@/sanity/lib/client";
import { portfolioQuery } from "@/sanity/lib/queries";
import type { PortfolioData } from "@/sanity/lib/types";

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    return await client.fetch<PortfolioData>(portfolioQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error("Unable to load Sanity content; using local fallback.", error);
    return { settings: null, experiences: [], projects: [], projectCategories: [], projectTotal: 0 };
  }
}
