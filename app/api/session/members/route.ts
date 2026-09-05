import { NextResponse } from "next/server";
import { MEMBERS, toMemberCard } from "@/lib/account-store";

/** GET /api/session/members — demo accounts available for sign-in. */
export async function GET() {
  return NextResponse.json({ members: MEMBERS.map(toMemberCard) });
}
