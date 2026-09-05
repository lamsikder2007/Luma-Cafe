"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/CartContext";
import { CircleCheck, TriangleAlert, ArrowRight, Sparkles } from "lucide-react";

interface VerifiedOrder {
  orderNumber: string;
  total: number;
  beans: number;
  mode: "pickup" | "delivery";
  name: string;
}

export default function SuccessClient() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const { clearCart } = useCart();
  const cleared = useRef(false);
  const [state, setState] = useState<"loading" | "paid" | "failed">("loading");
  const [order, setOrder] = useState<VerifiedOrder | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setState("failed");
      return;
    }
    fetch(`/api/checkout/verify?session_id=${encodeURIComponent(sessionId)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.paid) {
          setOrder(d);
          setState("paid");
          if (!cleared.current) {
            cleared.current = true;
            clearCart();
          }
        } else {
          setState("failed");
        }
      })
      .catch(() => setState("failed"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="max-w-[1200px] mx-auto w-full px-gutter-mobile lg:px-gutter-desktop py-10">
        <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/20 p-8 md:p-14 text-center max-w-2xl mx-auto">
          {state === "loading" && (
            <>
              <h1 className="font-serif text-3xl font-semibold">Confirming your payment…</h1>
              <p className="text-on-surface-variant mt-2">One moment while we verify with Stripe.</p>
            </>
          )}
          {state === "paid" && order && (
            <>
              <span className="w-16 h-16 rounded-full bg-secondary-container text-secondary flex items-center justify-center mx-auto">
                <CircleCheck size={32} />
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-semibold mt-5">
                Payment confirmed — see you soon{order.name ? `, ${order.name.split(" ")[0]}` : ""}!
              </h1>
              <p className="font-mono font-bold tracking-[0.2em] text-accent mt-2">{order.orderNumber}</p>
              <p className="text-on-surface-variant mt-3">
                {order.mode === "pickup" ? "Pickup at Mirpur 10 Flagship" : "Courier on its way"} · ready in{" "}
                {order.mode === "pickup" ? "12–15 minutes" : "about 30 minutes"}.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-6 text-left">
                <div className="bg-surface-container-low rounded-2xl p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary">Charged</p>
                  <p className="font-serif text-2xl font-bold tabular-nums">${order.total.toFixed(2)}</p>
                </div>
                <div className="bg-secondary-container/50 rounded-2xl p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-on-secondary-fixed-variant flex items-center gap-1">
                    <Sparkles size={12} /> Beans earned
                  </p>
                  <p className="font-serif text-2xl font-bold text-secondary tabular-nums">+{order.beans}</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                <Link href="/" className="h-12 px-8 rounded-full bg-primary text-on-primary font-semibold flex items-center hover:bg-primary-container transition-colors">
                  Back to Home
                </Link>
                <Link href="/rewards" className="h-12 px-8 rounded-full bg-surface-container font-semibold flex items-center gap-2 hover:bg-surface-container-high transition-colors">
                  View Rewards <ArrowRight size={16} />
                </Link>
              </div>
            </>
          )}
          {state === "failed" && (
            <>
              <span className="w-16 h-16 rounded-full bg-error-bg text-error flex items-center justify-center mx-auto">
                <TriangleAlert size={30} />
              </span>
              <h1 className="font-serif text-3xl font-semibold mt-5">Payment couldn&apos;t be confirmed</h1>
              <p className="text-on-surface-variant mt-2">
                No charge was completed. Your tray is untouched — please try checkout again.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                <Link href="/checkout" className="h-12 px-8 rounded-full bg-primary text-on-primary font-semibold flex items-center hover:bg-primary-container transition-colors">
                  Back to Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
