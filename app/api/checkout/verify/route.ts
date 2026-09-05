import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

/**
 * GET /api/checkout/verify?session_id= — confirm a paid Checkout Session.
 * Returns only order facts (never secrets) for the success page.
 */
export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ paid: false }, { status: 400 });
  }
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return NextResponse.json({ paid: false });
    }
    const total = (session.amount_total ?? 0) / 100;
    const orderNumber = `LUMA-${session.id.replace(/[^a-z0-9]/gi, "").slice(-6).toUpperCase()}`;
    return NextResponse.json({
      paid: true,
      orderNumber,
      total,
      beans: Number(session.metadata?.beans ?? Math.round(total * 10)),
      mode: session.metadata?.mode === "delivery" ? "delivery" : "pickup",
      name: session.metadata?.name ?? "",
    });
  } catch (error) {
    console.error("Stripe verify error:", error);
    return NextResponse.json({ paid: false }, { status: 500 });
  }
}
