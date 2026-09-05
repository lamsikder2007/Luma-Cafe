import { NextRequest, NextResponse } from "next/server";
import { searchMenu, toMenuCard } from "@/lib/cafe-store";

/** GET /api/menu?q=&category=&maxPrice=&tag=&includeUnavailable= — live catalog. */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const maxPrice = params.get("maxPrice");
  const items = searchMenu({
    query: params.get("q") ?? undefined,
    category: params.get("category") ?? undefined,
    maxPrice: maxPrice === null ? undefined : Number(maxPrice),
    tag: params.get("tag") ?? undefined,
    includeUnavailable: params.get("includeUnavailable") === "true",
  });
  return NextResponse.json({ items: items.map(toMenuCard), count: items.length });
}
