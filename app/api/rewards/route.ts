import { NextResponse } from "next/server";
import { REWARDS } from "@/lib/cafe-store";

/** GET /api/rewards — live loyalty program info. */
export async function GET() {
  return NextResponse.json({ rewards: REWARDS });
}
