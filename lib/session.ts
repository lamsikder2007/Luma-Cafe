import { cookies } from "next/headers";
import { getMember } from "./account-store";

export const SESSION_COOKIE = "luma_member";

/** Resolve the signed-in member id from the session cookie (server only). */
export async function getSessionMemberId(): Promise<string | null> {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value ?? null;
}

/** Signed-in member, or undefined for guests. */
export async function getSessionMember() {
  return getMember(await getSessionMemberId());
}
