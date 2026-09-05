import { NextRequest, NextResponse } from "next/server";
import { getMember, toMemberCard } from "@/lib/account-store";
import { SESSION_COOKIE } from "@/lib/session";

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
};

/** GET /api/session — current demo session (public card only). */
export async function GET() {
  const { getSessionMember } = await import("@/lib/session");
  const member = await getSessionMember();
  return NextResponse.json({ member: member ? toMemberCard(member) : null });
}

/** POST /api/session { memberId } — demo sign-in. */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const member = getMember(typeof body.memberId === "string" ? body.memberId : "");
  if (!member) {
    return NextResponse.json({ error: "Unknown member." }, { status: 400 });
  }
  const res = NextResponse.json({ member: toMemberCard(member) });
  res.cookies.set(SESSION_COOKIE, member.id, COOKIE_OPTS);
  return res;
}

/** DELETE /api/session — sign out. */
export async function DELETE() {
  const res = NextResponse.json({ member: null });
  res.cookies.set(SESSION_COOKIE, "", { ...COOKIE_OPTS, maxAge: 0 });
  return res;
}
