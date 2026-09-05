"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/CartContext";
import {
  Store,
  Bike,
  Minus,
  Plus,
  Trash2,
  Lock,
  CircleCheck,
  ArrowLeft,
  ArrowRight,
  Tag,
  Sparkles,
  Wallet,
  Banknote,
  CreditCard,
  X,
} from "lucide-react";

type Step = 1 | 2 | 3;

const TIPS = [0, 10, 15, 20];
const SLOTS = ["ASAP", "8:45 AM", "12:30 PM", "2:30 PM", "5:30 PM"];
const PAYMENTS = [
  { id: "card", label: "Card", sub: "Secure Stripe checkout", icon: CreditCard },
  { id: "bkash", label: "bKash", sub: "Mobile banking", icon: Wallet },
  { id: "cash", label: "Cash on pickup", sub: "Pay at the counter", icon: Banknote },
];

interface PlacedOrder {
  number: string;
  itemCount: number;
  total: number;
  beans: number;
  eta: string;
  mode: "pickup" | "delivery";
}

export default function CheckoutClient() {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [mode, setMode] = useState<"pickup" | "delivery">("pickup");
  const [tip, setTip] = useState(15);
  const [promo, setPromo] = useState<string | null>("LUMAFIRST");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [slot, setSlot] = useState(SLOTS[0]);
  const [payment, setPayment] = useState("card");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);
  const searchParams = useSearchParams();
  const cancelled = searchParams.get("cancelled") === "true";

  // Promo pre-fill (e.g. saved by Luma AI) — after mount to match SSR.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("luma_offer");
      setPromo(saved ?? "LUMAFIRST");
    } catch {
      setPromo("LUMAFIRST");
    }
  }, []);

  const promoActive = promo?.trim().toUpperCase() === "LUMAFIRST";
  const discount = promoActive ? totalPrice * 0.1 : 0;
  const ecoFee = items.length > 0 ? 0.5 : 0;
  const tipAmount = (totalPrice * tip) / 100;
  const tax = totalPrice * 0.052;
  const total = totalPrice + ecoFee - discount + tipAmount + tax;

  const steps = useMemo(
    () => [
      { n: 1, label: "Review" },
      { n: 2, label: "Details" },
      { n: 3, label: "Confirmed" },
    ],
    []
  );

  const placeOrder = async () => {
    if (name.trim().length < 2) return setError("Please add your name so the bar can call it out.");
    if (!/^\+?[0-9\s-]{7,}$/.test(phone.trim()))
      return setError("Please add a valid phone number for pickup updates.");
    if (mode === "delivery" && address.trim().length < 8)
      return setError("Please add a delivery address.");
    setError(null);

    // Card goes through secure Stripe Checkout (hosted by Stripe —
    // card details never touch our servers).
    if (payment === "card") {
      setPlacing(true);
      try {
        const res = await fetch("/api/checkout/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
            mode,
            promo,
            tipPct: tip,
            name: name.trim(),
            phone: phone.trim(),
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.url) {
          setError(data.error ?? "Could not start secure payment. Please try again.");
          setPlacing(false);
          return;
        }
        window.location.href = data.url;
      } catch {
        setError("Could not start secure payment. Please try again.");
        setPlacing(false);
      }
      return;
    }

    const snapshot: PlacedOrder = {
      number: `LUMA-${Math.floor(1000 + Math.random() * 9000)}`,
      itemCount: items.reduce((s, i) => s + i.quantity, 0),
      total,
      beans: Math.round(total * 10),
      eta: mode === "pickup" ? "12–15 minutes" : "about 30 minutes",
      mode,
    };
    setPlaced(snapshot);
    clearCart();
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="max-w-[1200px] mx-auto w-full px-gutter-mobile lg:px-gutter-desktop py-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-tertiary">
              Almost sipping
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold mt-1">Checkout</h1>
          </div>          {/* Stepper */}
          <ol className="flex items-center gap-2">
            {steps.map((s, i) => (
              <li key={s.n} className="flex items-center gap-2">
                <span
                  className={`h-8 px-3.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                    step >= s.n ? "bg-primary text-on-primary" : "bg-surface-container text-text-tertiary"
                  }`}
                >
                  {step > s.n ? <CircleCheck size={14} /> : s.n} {s.label}
                </span>
                {i < steps.length - 1 && <span className="w-4 h-px bg-outline-variant" />}
              </li>
            ))}
          </ol>
        </header>

        {cancelled && !placed && (
          <p className="text-sm font-semibold text-on-tertiary-fixed bg-tertiary-fixed rounded-2xl px-5 py-3.5 mb-6">
            Payment was cancelled — no charge was made and your tray is untouched. You can try again whenever you&apos;re ready.
          </p>
        )}

        {items.length === 0 && !placed ? (
          <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/20 p-10 md:p-16 text-center">
            <h2 className="font-serif text-3xl font-semibold">Your tray is empty</h2>
            <p className="text-on-surface-variant mt-2">
              Add something handcrafted first — the bar is ready when you are.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Link href="/order" className="h-12 px-8 rounded-full bg-primary text-on-primary font-semibold flex items-center gap-2 hover:bg-primary-container transition-colors">
                Order Ahead <ArrowRight size={16} />
              </Link>
              <Link href="/menu" className="h-12 px-8 rounded-full bg-surface-container font-semibold flex items-center hover:bg-surface-container-high transition-colors">
                Browse Menu
              </Link>
            </div>
          </div>
        ) : step === 3 && placed ? (
          <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/20 p-8 md:p-14 text-center max-w-2xl mx-auto">
            <span className="w-16 h-16 rounded-full bg-secondary-container text-secondary flex items-center justify-center mx-auto">
              <CircleCheck size={32} />
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mt-5">
              Order confirmed — see you soon!
            </h2>
            <p className="font-mono font-bold tracking-[0.2em] text-accent mt-2">{placed.number}</p>
            <p className="text-on-surface-variant mt-3">
              {placed.itemCount} item(s) · {placed.mode === "pickup" ? "Pickup at Mirpur 10 Flagship" : "Courier on its way"} · ready in {placed.eta}.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-6 text-left">
              <div className="bg-surface-container-low rounded-2xl p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary">Charged</p>
                <p className="font-serif text-2xl font-bold tabular-nums">${placed.total.toFixed(2)}</p>
              </div>
              <div className="bg-secondary-container/50 rounded-2xl p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-on-secondary-fixed-variant flex items-center gap-1">
                  <Sparkles size={12} /> Beans earned
                </p>
                <p className="font-serif text-2xl font-bold text-secondary tabular-nums">+{placed.beans}</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <Link href="/" className="h-12 px-8 rounded-full bg-primary text-on-primary font-semibold flex items-center hover:bg-primary-container transition-colors">
                Back to Home
              </Link>
              <Link href="/rewards" className="h-12 px-8 rounded-full bg-surface-container font-semibold flex items-center hover:bg-surface-container-high transition-colors">
                View Rewards
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left: steps */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {step === 1 && (
                <section className="bg-surface-container-lowest rounded-3xl border border-outline-variant/20 p-6 md:p-8">
                  <h2 className="font-serif text-2xl font-semibold mb-4">Review your tray</h2>
                  <div className="flex flex-col divide-y divide-border">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 py-4">
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-surface-container">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-bold truncate">{item.name}</p>
                            <button onClick={() => removeFromCart(item.id)} className="text-text-tertiary hover:text-error" aria-label={`Remove ${item.name}`}>
                              <Trash2 size={15} />
                            </button>
                          </div>
                          <p className="text-sm font-semibold tabular-nums">${(item.price * item.quantity).toFixed(2)}</p>
                          <div className="flex items-center gap-2 mt-2 bg-surface-container rounded-full px-1.5 py-1 w-fit">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full bg-surface-container-lowest flex items-center justify-center" aria-label="Decrease">
                              <Minus size={13} />
                            </button>
                            <span className="text-sm font-bold w-5 text-center tabular-nums">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center" aria-label="Increase">
                              <Plus size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Link href="/order" className="h-12 px-6 rounded-full bg-surface-container text-sm font-bold flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors">
                      <ArrowLeft size={15} /> Back to Order
                    </Link>
                    <button onClick={() => { setStep(2); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex-1 h-12 rounded-full bg-primary text-on-primary font-semibold flex items-center justify-center gap-2 hover:bg-primary-container transition-colors">
                      Continue to Details <ArrowRight size={16} />
                    </button>
                  </div>
                </section>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-6">
                  <section className="bg-surface-container-lowest rounded-3xl border border-outline-variant/20 p-6 md:p-8">
                    <h2 className="font-serif text-2xl font-semibold mb-4">Fulfillment</h2>
                    <div className="bg-surface-container rounded-full p-1 flex">
                      <button onClick={() => setMode("pickup")} className={`flex-1 flex items-center justify-center gap-2 h-11 px-4 rounded-full text-[13px] sm:text-sm font-semibold transition-all ${mode === "pickup" ? "bg-primary text-on-primary shadow" : "text-text-secondary"}`}>
                        <Store size={15} /> Pickup · 12–15m
                      </button>
                      <button onClick={() => setMode("delivery")} className={`flex-1 flex items-center justify-center gap-2 h-11 px-4 rounded-full text-[13px] sm:text-sm font-semibold transition-all ${mode === "delivery" ? "bg-primary text-on-primary shadow" : "text-text-secondary"}`}>
                        <Bike size={15} /> Delivery · ~30m
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3 mt-4">
                      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="h-12 rounded-xl bg-surface-container-low px-4 text-sm focus:outline-none focus:ring-2 ring-primary-container" />
                      <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone — +880 ..." type="tel" className="h-12 rounded-xl bg-surface-container-low px-4 text-sm focus:outline-none focus:ring-2 ring-primary-container" />
                    </div>
                    {mode === "delivery" && (
                      <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Delivery address — house, road, area" className="h-12 rounded-xl bg-surface-container-low px-4 text-sm mt-3 w-full focus:outline-none focus:ring-2 ring-primary-container" />
                    )}
                    <div className="mt-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-text-tertiary mb-2">{mode === "pickup" ? "Pickup time" : "Delivery window"}</p>
                      <div className="flex flex-wrap gap-2">
                        {SLOTS.map((s) => (
                          <button key={s} onClick={() => setSlot(s)} className={`h-10 px-4 rounded-full text-xs font-bold transition-all ${slot === s ? "bg-primary text-on-primary" : "bg-surface-container text-text-secondary"}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section className="bg-surface-container-lowest rounded-3xl border border-outline-variant/20 p-6 md:p-8">
                    <h2 className="font-serif text-2xl font-semibold mb-4">Payment</h2>
                    <div className="grid sm:grid-cols-3 gap-2">
                      {PAYMENTS.map((p) => (
                        <button key={p.id} onClick={() => setPayment(p.id)} className={`rounded-2xl border p-4 text-left transition-all ${payment === p.id ? "border-primary bg-surface-container-low" : "border-outline-variant/30 hover:border-outline"}`}>
                          <p.icon size={20} className="text-accent" />
                          <span className="block text-sm font-bold mt-2">{p.label}</span>
                          <span className="block text-xs text-text-secondary">{p.sub}</span>
                        </button>
                      ))}
                    </div>
                    {payment === "card" && (
                      <p className="text-sm text-on-surface-variant mt-4 bg-surface-container-low rounded-2xl p-4 flex items-center gap-2">
                        <Lock size={15} className="text-accent shrink-0" />
                        You&apos;ll continue to Stripe&apos;s secure hosted checkout to enter card details — we never see or store them.
                      </p>
                    )}
                    {payment === "bkash" && (
                      <p className="text-sm text-on-surface-variant mt-4 bg-surface-container-low rounded-2xl p-4">
                        You&apos;ll receive a bKash payment request on your phone number to approve.
                      </p>
                    )}
                    {error && (
                      <p className="text-sm font-semibold text-error bg-error-bg rounded-2xl px-4 py-3 mt-4">{error}</p>
                    )}
                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                      <button onClick={() => setStep(1)} className="h-12 px-6 rounded-full bg-surface-container text-sm font-bold flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors">
                        <ArrowLeft size={15} /> Review
                      </button>
                      <button onClick={placeOrder} disabled={placing} className="flex-1 h-12 rounded-full bg-primary text-on-primary font-semibold flex items-center justify-center gap-2 hover:bg-primary-container transition-all active:scale-[0.98] shadow-md disabled:opacity-60">
                        <Lock size={15} /> {placing ? "Redirecting to secure payment…" : payment === "card" ? `Continue to Secure Payment — $${total.toFixed(2)}` : `Place Order — $${total.toFixed(2)}`}
                      </button>
                    </div>
                  </section>
                </div>
              )}
            </div>

            {/* Right: summary */}
            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-24 bg-surface-container-lowest rounded-3xl border border-outline-variant/20 shadow-md p-6">
                <h2 className="font-serif text-xl font-semibold mb-4">Order Summary</h2>
                <p className="text-xs font-bold uppercase tracking-wider text-text-tertiary mb-2">
                  Barista Gratuity
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {TIPS.map((t) => (
                    <button key={t} onClick={() => setTip(t)} className={`h-10 rounded-full text-sm font-bold transition-all ${tip === t ? "bg-primary text-on-primary" : "bg-surface-container text-text-secondary"}`}>
                      {t === 0 ? "None" : `${t}%`}
                    </button>
                  ))}
                </div>
                {promo ? (
                  <div className="flex items-center gap-2 mt-4 bg-surface-container-low rounded-full pl-4 pr-1.5 py-1.5">
                    <Tag size={15} className="text-accent shrink-0" />
                    <span className="flex-1 text-sm font-bold uppercase tracking-wider">{promo}</span>
                    <button onClick={() => { setPromo(null); try { localStorage.removeItem("luma_offer"); } catch {} }} className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center" aria-label="Remove promo">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-text-tertiary mt-4">No promo applied. Have a code? Add it on the Order page.</p>
                )}
                <dl className="text-[13px] mt-4 flex flex-col gap-1.5">
                  <div className="flex justify-between"><dt className="text-text-secondary">Subtotal</dt><dd className="font-semibold tabular-nums">${totalPrice.toFixed(2)}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-secondary">Eco fee</dt><dd className="font-semibold tabular-nums">${ecoFee.toFixed(2)}</dd></div>
                  {promoActive && totalPrice > 0 && (
                    <div className="flex justify-between text-secondary"><dt>Promo (10%)</dt><dd className="font-semibold tabular-nums">-${discount.toFixed(2)}</dd></div>
                  )}
                  <div className="flex justify-between"><dt className="text-text-secondary">Tip ({tip}%)</dt><dd className="font-semibold tabular-nums">${tipAmount.toFixed(2)}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-secondary">Tax</dt><dd className="font-semibold tabular-nums">${tax.toFixed(2)}</dd></div>
                  <div className="flex justify-between border-t border-border pt-2.5 mt-1"><dt className="font-serif text-lg font-semibold">Total</dt><dd className="font-serif text-lg font-bold tabular-nums">${total.toFixed(2)}</dd></div>
                </dl>
                <p className="flex items-center gap-1.5 text-xs font-semibold text-accent mt-3">
                  <Sparkles size={13} /> You&apos;ll earn {Math.round(total * 10)} beans
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
