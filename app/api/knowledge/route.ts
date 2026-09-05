import { NextRequest, NextResponse } from "next/server";
import { searchKnowledge } from "@/lib/luma-knowledge/retrieve";

/** GET /api/knowledge?q=&section= — retrieve site knowledge passages (RAG layer). */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const passages = searchKnowledge(
    params.get("q") ?? "",
    params.get("section") ?? undefined
  );
  return NextResponse.json({
    passages: passages.map((p) => ({
      title: p.title,
      section: p.section,
      body: p.body,
      links: p.links ?? [],
    })),
  });
}
