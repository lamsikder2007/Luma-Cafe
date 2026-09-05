import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe, toCents } from "@/lib/stripe";
import { getProduct, ORDERING } from "@/lib/cafe-store";

interface SessionItem {
  id?: unknown;
  quantity?: unknown;
}

/**
 * POST /api/checkout/session — create a Stripe Checkout Session.
 * Prices are recomputed server-side from the live catalog; client totals
 * are never trusted. Card details are entered on Stripe's hosted page.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Tray is empty." }, { status: 400 });
    }

    const mode = body.mode === "delivery" ? "delivery" : "pickup";
    const tipPct =
      typeof body.tipPct === "number" && body.tipPct >= 0 && body.tipPct <= 50
        ? body.tipPct
        : 0;
    const promo =
      typeof body.promo === "string" && body.promo.trim().toUpperCase() === "LUMAFIRST"
        ? "LUMAFIRST"
        : null;
    const name = typeof body.name === "string" ? body.name.slice(0, 80) : "";
    const phone = typeof body.phone === "string" ? body.phone.slice(0, 30) : "";

    // Resolve + validate every line against live data.
    const lines: { name: string; unit: number; qty: number }[] = [];
    for (const raw of body.items.slice(0, 50) as SessionItem[]) {
      if (!raw || typeof raw.id !== "string") continue;
      const product = getProduct(raw.id);
      const qty =
        typeof raw.quantity === "number"
          ? Math.max(1, Math.min(12, Math.floor(raw.quantity)))
          : 1;
      if (!product) {
        return NextResponse.json(
          { error: `"${raw.id}" is not on the live menu.` },
          { status: 400 }
        );
      }
      if (!product.available) {
        return NextResponse.json(
          { error: `${product.name} is paused today.` },
          { status: 400 }
        );
      }
      lines.push({ name: product.name, unit: product.price, qty });
    }
    if (lines.length === 0) {
      return NextResponse.json({ error: "Tray is empty." }, { status: 400 });
    }

    const subtotal = lines.reduce((s, l) => s + l.unit * l.qty, 0);
    const tip = (subtotal * tipPct) / 100;
    const tax = subtotal * ORDERING.taxRate;

    const stripe = getStripe();
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      ...lines.map((l) => ({
        price_data: {
          currency: "usd",
          product_data: { name: l.name },
          unit_amount: toCents(l.unit),
        },
        quantity: l.qty,
      })),
      {
        price_data: {
          currency: "usd",
          product_data: { name: "Eco packaging" },
          unit_amount: toCents(ORDERING.ecoFee),
        },
        quantity: 1,
      },
    ];
    if (tip > 0) {
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: { name: `Barista gratuity (${tipPct}%)` },
          unit_amount: toCents(tip),
        },
        quantity: 1,
      });
    }
    // Tax as an explicit line so the receipt matches the site's breakdown.
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Estimated tax" },
        unit_amount: toCents(tax),
      },
      quantity: 1,
    });

    const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = [];
    if (promo) {
      const coupon = await stripe.coupons.create({
        percent_off: 10,
        duration: "once",
        name: "LUMAFIRST — 10% off first order",
      });
      discounts.push({ coupon: coupon.id });
    }

    const itemCount = lines.reduce((s, l) => s + l.qty, 0);
    const origin = request.nextUrl.origin;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      discounts: discounts.length > 0 ? discounts : undefined,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?cancelled=true`,
      metadata: {
        mode,
        name,
        phone,
        promo: promo ?? "",
        itemCount: String(itemCount),
        beans: String(Math.round((subtotal + ORDERING.ecoFee + tip + tax) * 10)),
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Could not start secure payment." },
        { status: 500 }
      );
    }
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error);
    return NextResponse.json(
      { error: "Could not start secure payment. Please try again." },
      { status: 500 }
    );
  }
}
