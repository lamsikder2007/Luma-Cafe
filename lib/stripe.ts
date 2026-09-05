import Stripe from "stripe";

let client: Stripe | null = null;

/** Server-only Stripe client. Secret never leaves the server. */
export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe is not configured (missing STRIPE_SECRET_KEY).");
  }
  if (!client) {
    client = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return client;
}

export const toCents = (dollars: number) => Math.round(dollars * 100);
