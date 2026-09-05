import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/lib/cafe-store";

/** GET /api/menu/[id] — full live product data (ingredients, allergens, options, availability). */
export async function GET(
  _request: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  const product = getProduct(decodeURIComponent(id));
  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }
  return NextResponse.json({ product });
}
