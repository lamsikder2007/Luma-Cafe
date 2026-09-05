import { NextResponse } from "next/server";
import { STORE, ORDERING } from "@/lib/cafe-store";

/** GET /api/store — live location, hours, contact, fulfillment info. */
export async function GET() {
  return NextResponse.json({ store: STORE, ordering: ORDERING });
}
