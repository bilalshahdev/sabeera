import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { projectsPageQuery } from "@/sanity/lib/queries";
import type { PortfolioProject } from "@/sanity/lib/types";

const PAGE_SIZE = 6;

export async function GET(request: NextRequest) {
  const start = Math.max(0, Number.parseInt(request.nextUrl.searchParams.get("start") || "0", 10) || 0);
  const category = request.nextUrl.searchParams.get("category") || "all";
  const result = await client.fetch<{ projects: PortfolioProject[]; total: number }>(projectsPageQuery, {
    category,
    start,
    end: start + PAGE_SIZE,
  }, { next: { revalidate: 60 } });
  return NextResponse.json(result, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } });
}
