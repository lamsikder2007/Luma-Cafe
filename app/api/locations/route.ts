import { NextResponse } from "next/server";
import { BRANCHES } from "@/lib/cafe-store";

/** GET /api/locations — live branch data. */
export async function GET() {
  return NextResponse.json({ branches: BRANCHES });
}
