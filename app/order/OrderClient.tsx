"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/CartContext";
import { MENU_ITEMS } from "@/lib/menu-data";
import {
  Store,
  Bike,
  Clock,
  BadgeCheck,
  AlarmClock,
  Sparkles,
  Trash2,
  Minus,
  Plus,
  Tag,
  Lock,
  Zap,
  Check,
  MapPin,
} from "lucide-react";

const TIPS = [10, 15, 20];

export default function OrderClient() {
  const { items, addToCart, updateQuantity, removeFromCart, totalPrice } =
    useCart();
  const [mode, setMode] = useState<"pickup" | "delivery">("pickup");
  const [tip, setTip] = useState(15);
  // Promo pre-filled when Luma AI validates a code (saved to localStorage).
  // Read after mount so server and client render identically (no hydration mismatch).
  const [promo, setPromo] = useState("LUMAFIRST");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("luma_offer");
      if (saved) setPromo(saved);
    } catch {
      /* storage unavailable */
    }
  }, []);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2400);
  };

  const promoActive = promo.trim().toUpperCase() === "LUMAFIRST";
  const discount = promoActive ? totalPrice * 0.1 : 0;
  const ecoFee = items.length > 0 ? 0.5 : 0;
  const tipAmount = (totalPrice * tip) / 100;
  const tax = totalPrice * 0.052;
  const total = totalPrice + ecoFee - discount + tipAmount + tax;
  const beans = Math.round(total * 10);

  const sections = useMemo(
    () => [
      {
        id: "signature",
        eyebrow: "Small-Batch Extraction",
        title: "Signature Espresso Bar",
        meta: "La Marzocco PB · 9 Bar Profile",
        items: MENU_ITEMS.filter((m) =>
          ["velvet-cappuccino", "iced-caramel-shakerato"].includes(m.id)
        ),
      },
      {
        id: "boosters",
        eyebrow: "Clean Energy",
        title: "Morning Boosters",
        meta: "Brewed fresh daily",
        items: MENU_ITEMS.filter((m) =>
          ["yirgacheffe-pourover", "uji-matcha"].includes(m.id)
        ),
      },
      {
        id: "bakery",
        eyebrow: "Oven Hearth",
        title: "Bakery & Light Bites",
        meta: "Baked fresh 5:30 AM & 1:00 PM",
        items: MENU_ITEMS.filter((m) =>
          ["wild-berry-muffin", "almond-croissant"].includes(m.id)
        ),
      },
      {
        id: "beans",
        eyebrow: "Roastery Reserve",
        title: "Coffee Beans & Merch",
        meta: "Roasted Wednesdays",
        items: MENU_ITEMS.filter((m) => m.id === "solstice-beans"),
      },
    ],
    []
  );

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Fulfillment banner */}
      <div className="bg-surface-container-low border-b border-border/50">
        <div className="max-w-[1200px] mx-auto px-gutter-mobile lg:px-gutter-desktop py-4 flex flex-col md:flex-row md:items-center gap-4">
          <div className="bg-surface-container rounded-full p-1 flex w-full md:w-auto">
            <button
              onClick={() => setMode("pickup")}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 sm:px-6 rounded-full text-[13px] sm:text-sm font-semibold text-center leading-tight transition-all ${
                mode === "pickup"
                  ? "bg-primary text-on-primary shadow"
                  : "text-text-secondary"
              }`}
            >
              <Store size={16} /> Pickup at Mirpur 10 Flagship
              <span
                className={`text-[11px] font-bold rounded-full px-2 py-0.5 ${
                  mode === "pickup" ? "bg-white/15" : "bg-surface-container-high"
                }`}
              >
                12–15m
              </span>
            </button>
            <button
              onClick={() => setMode("delivery")}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 sm:px-6 rounded-full text-[13px] sm:text-sm font-semibold text-center leading-tight transition-all ${
                mode === "delivery"
                  ? "bg-primary text-on-primary shadow"
                  : "text-text-secondary"
              }`}
            >
              <Bike size={16} /> Courier Delivery
              <span className="text-[11px] font-bold rounded-full px-2 py-0.5 bg-secondary-container text-on-secondary-container">
                ~30m
              </span>
            </button>
          </div>
          <p className="flex items-center gap-2 text-sm text-text-secondary">
            {mode === "pickup" ? (
              <>
                <Clock size={16} className="text-secondary" />
                Roastery bar active · Closes 10:00 PM
                <span className="text-border">•</span>
                <BadgeCheck size={16} className="text-secondary" />
                Express Lane Pick-up Counter
              </>
            ) : (
              <>
                <MapPin size={16} className="text-secondary" />
                Delivering to: Plot 14, Road 3, Mirpur DOHS
                <button className="font-bold text-primary underline underline-offset-2">
                  Change
                </button>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto w-full px-gutter-mobile lg:px-gutter-desktop py-10 grid lg:grid-cols-12 gap-8">
        {/* Left: express menu */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          {sections.map((section) => (
            <section key={section.id}>
              <div className="flex items-end justify-between gap-4 mb-5">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-accent">
                    {section.eyebrow}
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl font-semibold">
                    {section.title}
                  </h2>
                </div>
                <p className="text-xs text-text-tertiary hidden sm:block">
                  {section.meta}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {section.items.map((item) => (
                  <article
                    key={item.id}
                    className="group bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden flex flex-col sm:flex-row"
                  >
                    <div className="relative sm:w-52 h-48 sm:h-auto shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-serif text-lg font-semibold">
                          {item.name}
                        </h3>
                        <span className="font-bold tabular-nums">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-on-surface-variant mt-1 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {item.badges.map((b) => (
                          <span
                            key={b}
                            className="text-[11px] font-bold bg-secondary-container/50 text-on-secondary-fixed rounded-full px-2.5 py-0.5"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          addToCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                          });
                          showToast(`${item.name} added to your order.`);
                        }}
                        className="mt-4 h-11 px-6 bg-primary text-on-primary text-sm font-semibold rounded-full hover:bg-primary-container transition-all active:scale-95"
                      >
                        Add to Order · ${item.price.toFixed(2)}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Right: order summary */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-24 bg-surface-container-lowest rounded-3xl border border-outline-variant/20 shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl font-semibold">Your Order</h2>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold bg-surface-container rounded-full px-3 py-1">
                  {items.reduce((n, i) => n + i.quantity, 0)} items
                </span>
                {items.length > 0 && (
                  <button
                    onClick={() => items.forEach((i) => removeFromCart(i.id))}
                    className="text-xs font-semibold text-text-tertiary hover:text-error flex items-center gap-1"
                  >
                    <Trash2 size={13} /> Clear
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm bg-surface-container-low rounded-2xl px-4 py-3 mb-4">
              <AlarmClock size={16} className="text-accent" />
              <span className="text-text-tertiary">Ready by</span>
              <span className="font-bold">8:45 AM (Today)</span>
              <button className="ml-auto text-xs font-bold text-primary underline underline-offset-2">
                Change
              </button>
            </div>

            {items.length === 0 ? (
              <p className="text-sm text-text-tertiary text-center py-8">
                Your tray is empty — add something handcrafted from the menu.
              </p>
            ) : (
              <div className="flex flex-col divide-y divide-border">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 py-3">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-surface-container">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-bold truncate">{item.name}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-text-tertiary hover:text-error"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-sm font-semibold tabular-nums">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex items-center gap-2 bg-surface-container rounded-full px-1.5 py-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-surface-container-lowest flex items-center justify-center"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Sommelier upsell */}
            <div className="mt-4 bg-secondary-container/40 rounded-2xl p-4">
              <p className="text-xs font-bold flex items-center gap-1.5 text-on-secondary-fixed">
                <Sparkles size={14} /> Luma Sommelier AI
              </p>
              <p className="text-[13px] text-on-secondary-fixed-variant mt-1 leading-relaxed">
                Add an organic butter croissant for $2.80? Pairs delightfully
                with your hot cappuccino.
              </p>
              <button
                onClick={() => {
                  const croissant = MENU_ITEMS.find((m) => m.id === "almond-croissant");
                  if (croissant) {
                    addToCart({
                      id: croissant.id,
                      name: croissant.name,
                      price: 2.8,
                      image: croissant.image,
                    });
                    showToast("Butter croissant added ($2.80).");
                  }
                }}
                className="mt-2 h-9 px-4 bg-secondary text-on-secondary text-xs font-bold rounded-full"
              >
                + Add Croissant ($2.80)
              </button>
            </div>

            {/* Gratuity */}
            <p className="text-xs font-bold uppercase tracking-wider text-text-tertiary mt-5 mb-2">
              Barista Gratuity
            </p>
            <div className="grid grid-cols-3 gap-2">
              {TIPS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTip(t)}
                  className={`h-10 rounded-full text-sm font-bold transition-all ${
                    tip === t
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container text-text-secondary"
                  }`}
                >
                  {t}%
                </button>
              ))}
            </div>

            {/* Promo */}
            <div className="flex items-center gap-2 mt-4 bg-surface-container-low rounded-full pl-4 pr-1.5 py-1.5">
              <Tag size={15} className="text-accent shrink-0" />
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                className="bg-transparent flex-1 min-w-0 text-sm font-bold uppercase tracking-wider focus:outline-none"
                aria-label="Promo code"
              />
              {promoActive && (
                <span className="text-[11px] font-bold bg-secondary-container text-on-secondary-fixed rounded-full px-2.5 py-1">
                  10% OFF
                </span>
              )}
            </div>

            {/* Breakdown */}
            <dl className="text-[13px] mt-5 flex flex-col gap-1.5">
              <div className="flex justify-between">
                <dt className="text-text-secondary">Items Subtotal</dt>
                <dd className="font-semibold tabular-nums">${totalPrice.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text-secondary">Eco-Packaging Fee</dt>
                <dd className="font-semibold tabular-nums">${ecoFee.toFixed(2)}</dd>
              </div>
              {promoActive && totalPrice > 0 && (
                <div className="flex justify-between text-secondary">
                  <dt>Luma Welcome Promo (10%)</dt>
                  <dd className="font-semibold tabular-nums">-${discount.toFixed(2)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-text-secondary">Barista Tip ({tip}%)</dt>
                <dd className="font-semibold tabular-nums">${tipAmount.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text-secondary">Estimated Tax</dt>
                <dd className="font-semibold tabular-nums">${tax.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2.5 mt-1">
                <dt className="font-serif text-lg font-semibold">Total</dt>
                <dd className="font-serif text-lg font-bold tabular-nums">
                  ${total.toFixed(2)}
                </dd>
              </div>
            </dl>

            {items.length > 0 && (
              <p className="flex items-center gap-1.5 text-xs font-semibold text-accent mt-3">
                <Sparkles size={13} /> You will earn {beans} Luma Points with this order
              </p>
            )}

            <Link
              href="/checkout"
              className="mt-4 w-full h-14 bg-primary-container hover:bg-primary text-on-primary font-semibold rounded-full transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-md"
            >
              Proceed to Checkout — ${total.toFixed(2)}
            </Link>
            <p className="flex items-center justify-center gap-1.5 text-[11px] text-text-tertiary mt-3">
              <Lock size={11} /> Secure contactless dispatch &amp; instant receipts
            </p>
          </div>

          <div className="mt-4 bg-surface-container rounded-3xl p-5 flex gap-3">
            <span className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
              <Zap size={18} />
            </span>
            <p className="text-[13px] text-on-surface-variant leading-relaxed">
              <span className="font-bold text-on-surface">Skip the morning line.</span>{" "}
              Your order is queued to brew 5 minutes before your estimated
              arrival time.
            </p>
          </div>
        </aside>
      </div>

      <Footer />

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-primary text-on-primary text-sm font-medium rounded-full px-5 py-3 shadow-lg flex items-center gap-2 animate-fade-in-up">
          <Check size={16} /> {toast}
        </div>
      )}
    </main>
  );
}
