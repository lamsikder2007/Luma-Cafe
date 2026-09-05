import { NextResponse } from "next/server";
import { OFFERS } from "@/lib/cafe-store";

/** GET /api/offers — live offers. */
export async function GET() {
  return NextResponse.json({ offers: OFFERS });
}
