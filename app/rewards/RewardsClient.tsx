"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Stars,
  QrCode,
  PlusCircle,
  Nfc,
  RefreshCw,
  Gift,
  Copy,
  Check,
  BadgeCheck,
  Medal,
  CircleHelp,
  X,
} from "lucide-react";

const BALANCE = 1240;
const NEXT_TIER_AT = 1500;

const REWARDS = [
  {
    beans: 250,
    title: "Artisan Milk or Botanical Syrup",
    copy: "Upgrade any espresso to Madagascar vanilla, cardamom rose, or oat milk.",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80",
    locked: false,
  },
  {
    beans: 400,
    title: "Handcrafted Espresso Cup",
    copy: "A double ristretto Flat White, Cortado, or Ethiopian Guji Cappuccino.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
    locked: false,
  },
  {
    beans: 650,
    title: "Morning Pastry & Brew Pairing",
    copy: "Daily viennoiserie with a batch brew or iced long black.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",
    locked: false,
  },
  {
    beans: 1200,
    title: "Small-Batch Reserve Bag (250g)",
    copy: "Seasonal origin — jasmine, peach nectar, bergamot. Whole or ground.",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80",
    locked: false,
  },
  {
    beans: 2500,
    title: "Artisan Ceramic Travel Tumbler",
    copy: "Hand-thrown double-walled stoneware with a cork lid.",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
    locked: true,
  },
];

const LEDGER = [
  {
    when: "Today · 8:42 AM",
    where: "Mobile Pick-up · Mirpur 10 Brew Bar",
    what: "1x Flat White (Oat Milk), 1x Cardamom Braid · Order #2890",
    delta: "+48",
    total: "1,240",
    negative: false,
  },
  {
    when: "Nov 18 · 4:15 PM",
    where: "In-Store Counter · Gulshan 2 Roastery",
    what: "1x Single-Origin Pour Over (Kenya Nyeri) · Order #2741",
    delta: "+26",
    total: "1,192",
    negative: false,
  },
  {
    when: "Nov 12 · 11:30 AM",
    where: "Marketplace Reward · Online App",
    what: "Redeemed: Handcrafted Espresso Cup · Voucher #RW-9941",
    delta: "-400",
    total: "1,166",
    negative: true,
  },
  {
    when: "Nov 04 · 9:05 AM",
    where: "Whole Bean Purchase · Mirpur 10 Brew Bar",
    what: "2x 250g Colombia Geisha Washed · Order #2611",
    delta: "+180",
    total: "1,566",
    negative: false,
  },
];

const TIERS = [
  {
    name: "Silver Origin",
    range: "0–499 Beans",
    copy: "For casual explorers.",
    perks: ["Birthday handcrafted beverage", "10% off bean bags", "Mobile order-ahead + express pickup"],
    foot: "Completed Status",
    current: false,
  },
  {
    name: "Gold Brewmaster",
    range: "500–1,499 Beans",
    copy: "Everything in Silver, plus:",
    perks: ["Free alt milks & syrups anytime", "Free same-visit Batch Brew refill", "Seasonal harvest cupping invites"],
    foot: "You are 260 Beans from Diamond",
    current: true,
  },
  {
    name: "Diamond Connoisseur",
    range: "1,500+ Beans",
    copy: "Everything in Gold, plus:",
    perks: ["Free monthly 250g Micro-lot Reserve", "Priority lounge & brew bar reservations", "Bespoke pottery anniversary gift"],
    foot: "Next goal to unlock",
    current: false,
  },
];

export default function RewardsClient() {
  const [scanOpen, setScanOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const progress = Math.round((BALANCE / NEXT_TIER_AT) * 1000) / 10;

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText("LUMA-RAYAN-GOLD");
    } catch {
      /* clipboard unavailable — still show feedback */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Announcement bar */}
      <div className="bg-surface-container-high">
        <div className="max-w-[1200px] mx-auto px-gutter-mobile lg:px-gutter-desktop py-2.5 flex items-center justify-between gap-4 text-[13px]">
          <p className="flex items-center gap-2 font-medium">
            <Stars size={15} className="text-accent" />
            Double Bean Tuesdays: Earn 2x beans on all single-origin pour-overs
          </p>
          <p className="hidden sm:block text-text-secondary">
            Active Bar: Mirpur 10 Express Counter ·{" "}
            <span className="font-bold text-primary">Scan at Till</span>
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto w-full px-gutter-mobile lg:px-gutter-desktop">
        {/* Header */}
        <header className="pt-10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-text-tertiary mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              The Artisan Collective · Member since Nov 2023
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold">
              Luma Circle Loyalty
            </h1>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setScanOpen(true)}
              className="h-11 px-5 rounded-full bg-surface-container text-sm font-bold flex items-center gap-2 hover:bg-surface-container-high transition-colors"
            >
              <QrCode size={16} /> Show Scan Pass
            </button>
            <button className="h-11 px-5 rounded-full bg-primary text-on-primary text-sm font-bold flex items-center gap-2 hover:bg-primary-container transition-colors">
              <PlusCircle size={16} /> Add Card to Wallet
            </button>
          </div>
        </header>

        {/* Member hero */}
        <section className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-primary text-on-primary rounded-3xl p-8 md:p-10 min-h-[380px] shadow-xl relative overflow-hidden flex flex-col">
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-secondary/30 blur-3xl rounded-full" />
            <div className="absolute -left-16 -bottom-16 w-72 h-72 bg-on-tertiary-container/20 blur-3xl rounded-full" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] bg-white/10 rounded-full px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim animate-pulse" />
                  Gold Brewmaster
                </span>
                <h2 className="font-serif text-2xl font-medium mt-4">Rayan Siddiqui</h2>
                <p className="text-xs tracking-[0.14em] text-on-primary-container mt-1">
                  MEMBER #LC-884920 · MIRPUR ROASTERY
                </p>
              </div>
              <span className="font-serif text-3xl font-bold text-tertiary-fixed-dim">L</span>
            </div>
            <div className="relative mt-8">
              <p className="font-serif text-5xl sm:text-6xl font-semibold tabular-nums">
                {BALANCE.toLocaleString("en-US")}{" "}
                <span className="text-lg font-sans font-semibold text-tertiary-fixed-dim">Beans</span>
              </p>
              <p className="flex items-center gap-1.5 text-sm text-on-primary-container mt-2">
                <BadgeCheck size={15} /> Approx. value $12.40 · Unlocks 3 Reserve Drinks
              </p>
            </div>
            <div className="relative mt-auto pt-8">
              <div className="bg-white/5 backdrop-blur rounded-2xl p-4">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <Medal size={16} className="text-tertiary-fixed-dim" />
                  Next Tier: Diamond Connoisseur · {NEXT_TIER_AT - BALANCE} Beans to Go
                </p>
                <div className="h-2.5 bg-white/15 rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-tertiary-fixed-dim via-on-tertiary-container to-secondary-fixed"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-on-primary-container mt-2">
                  <span>500 (Gold)</span>
                  <span>Free 250g reserve bag unlocked at 1,500</span>
                  <span>1,500 (Diamond)</span>
                </div>
              </div>
            </div>
          </div>

          {/* QR widget */}
          <div className="lg:col-span-4 bg-surface-container rounded-3xl p-6 md:p-8 flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-semibold flex items-center gap-2">
                <Nfc size={20} /> Touch &amp; Scan
              </h3>
              <span className="text-[11px] font-bold bg-secondary-container text-on-secondary-fixed rounded-full px-2.5 py-1">
                Fast Pay
              </span>
            </div>
            <p className="text-sm text-on-surface-variant mt-2">
              Hold this QR near the optical scanner at the register or order pickup dock.
            </p>
            <button
              onClick={() => setScanOpen(true)}
              className="bg-surface-container-lowest rounded-2xl p-5 mt-4 flex flex-col items-center gap-3 hover:shadow-md transition-shadow"
            >
              <QrCode size={120} className="text-primary" strokeWidth={1.25} />
              <span className="flex items-center gap-1.5 text-xs text-text-tertiary">
                <RefreshCw size={12} /> Refreshes every 60 seconds
              </span>
            </button>
            <div className="flex items-center justify-between mt-4 text-sm">
              <span className="font-mono font-semibold tracking-wider">4920-8849-01</span>
              <button className="font-bold text-primary underline underline-offset-2">
                Download Pass
              </button>
            </div>
          </div>
        </section>

        {/* Referral */}
        <section className="mt-6 bg-surface-container-low rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5">
          <span className="w-14 h-14 rounded-full bg-secondary-container text-secondary flex items-center justify-center shrink-0">
            <Gift size={24} />
          </span>
          <div className="flex-1">
            <h2 className="font-serif text-2xl font-semibold">
              Share the Warmth: Invite Fellow Drinkers
            </h2>
            <p className="text-sm text-on-surface-variant mt-1">
              Gift 150 beans to a friend for their first morning brew. Receive 200
              beans when they complete their first pour.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <code className="bg-surface-container-lowest border border-outline-variant/30 rounded-full px-4 h-11 flex items-center text-sm font-bold tracking-wider select-all">
              LUMA-RAYAN-GOLD
            </code>
            <button
              onClick={copyCode}
              className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors"
              aria-label="Copy referral code"
            >
              {copied ? <Check size={18} className="text-secondary" /> : <Copy size={18} />}
            </button>
            <button className="h-11 px-6 rounded-full bg-primary-container text-on-primary text-sm font-bold hover:bg-primary transition-colors">
              Share Invite
            </button>
          </div>
        </section>

        {/* Marketplace */}
        <section className="pt-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-tertiary">
            Marketplace
          </p>
          <div className="flex flex-wrap items-end justify-between gap-3 mt-1 mb-6">
            <h2 className="font-serif text-3xl font-semibold">Redeem Your Beans</h2>
            <p className="text-sm text-text-secondary">
              You currently qualify for 4 out of 5 rewards in this collection.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REWARDS.map((r) => (
              <article
                key={r.title}
                className={`bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/20 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 ${
                  r.locked ? "opacity-90" : ""
                }`}
              >
                <div className="relative h-44">
                  <Image src={r.image} alt={r.title} fill className="object-cover" />
                  <span className="absolute top-3 left-3 text-[11px] font-bold bg-surface-container-lowest/90 rounded-full px-3 py-1 tabular-nums">
                    {r.beans.toLocaleString("en-US")} Beans
                  </span>
                  {r.locked && (
                    <span className="absolute top-3 right-3 text-[11px] font-bold bg-primary text-on-primary rounded-full px-3 py-1">
                      Locked
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold">{r.title}</h3>
                  <p className="text-sm text-on-surface-variant mt-1">{r.copy}</p>
                  {r.locked ? (
                    <div className="mt-4">
                      <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full w-1/2 bg-secondary rounded-full" />
                      </div>
                      <p className="text-xs text-text-secondary mt-2">
                        Needs {(r.beans - BALANCE).toLocaleString("en-US")} more · 50% there
                      </p>
                      <button
                        disabled
                        className="mt-3 w-full h-11 rounded-full bg-surface-container text-text-tertiary text-sm font-bold cursor-not-allowed"
                      >
                        Locked
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-text-secondary tabular-nums">
                        Balance after: {(BALANCE - r.beans).toLocaleString("en-US")}
                      </span>
                      <button className="h-10 px-5 rounded-full bg-primary text-on-primary text-sm font-bold hover:bg-primary-container transition-colors">
                        Redeem Now
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))}
            <article className="bg-secondary text-on-secondary rounded-2xl p-6 flex flex-col justify-between min-h-[280px]">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-secondary-fixed">
                  Luma Roastery Privilege
                </p>
                <h3 className="font-serif text-2xl font-semibold mt-2">
                  Want Custom Roasting Advice?
                </h3>
                <p className="text-sm text-secondary-fixed mt-2 leading-relaxed">
                  Gold Brewmasters receive a complimentary 15-min cupping
                  calibration with Head Roaster Aminul at the Mirpur 10 bar.
                </p>
              </div>
              <button className="mt-6 h-11 rounded-full bg-surface-container-lowest text-primary text-sm font-bold">
                Book Tasting Session →
              </button>
            </article>
          </div>
        </section>

        {/* Tiers */}
        <section className="pt-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-tertiary">
            Privileges
          </p>
          <h2 className="font-serif text-3xl font-semibold mt-1">
            Tiers of Hospitality
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            Points accrue automatically with every cup, bag, or pastry purchased.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {TIERS.map((t, i) => (
              <article
                key={t.name}
                className={`rounded-3xl p-6 border flex flex-col ${
                  t.current
                    ? "bg-surface-container-lowest border-accent shadow-md ring-2 ring-accent/40"
                    : "bg-surface-container border-outline-variant/20"
                }`}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-tertiary">
                  Tier 0{i + 1}
                </p>
                <h3 className="font-serif text-2xl font-semibold mt-1">{t.name}</h3>
                <p className="text-xs font-bold text-accent tabular-nums">{t.range}</p>
                <p className="text-sm text-on-surface-variant mt-2">{t.copy}</p>
                <ul className="mt-4 flex flex-col gap-2 text-sm">
                  {t.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <Check size={15} className="text-secondary mt-0.5 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
                <p className={`mt-auto pt-5 text-xs font-bold ${t.current ? "text-accent" : "text-text-tertiary"}`}>
                  {t.current && (
                    <span className="inline-block bg-tertiary-fixed text-on-tertiary-fixed rounded-full px-2.5 py-0.5 mr-2">
                      Current Tier
                    </span>
                  )}
                  {t.foot}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Ledger */}
        <section className="pt-14">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-tertiary">
                Ledger
              </p>
              <h2 className="font-serif text-3xl font-semibold mt-1">
                Recent Bean Activity
              </h2>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-text-secondary">Viewing past 30 days</span>
              <button className="font-bold text-primary underline underline-offset-2">
                Download Statement (PDF)
              </button>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[720px]">
                <thead>
                  <tr className="bg-surface-container text-left text-[11px] uppercase tracking-[0.08em] text-text-tertiary">
                    <th className="font-bold px-5 py-3">Date &amp; Time</th>
                    <th className="font-bold px-5 py-3">Location</th>
                    <th className="font-bold px-5 py-3">Items Purchased</th>
                    <th className="font-bold px-5 py-3 text-right">Points</th>
                    <th className="font-bold px-5 py-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {LEDGER.map((row) => (
                    <tr key={row.what} className="hover:bg-surface-container-low/60 transition-colors">
                      <td className="px-5 py-4 font-semibold whitespace-nowrap">{row.when}</td>
                      <td className="px-5 py-4 text-text-secondary">{row.where}</td>
                      <td className="px-5 py-4 text-text-secondary">{row.what}</td>
                      <td className={`px-5 py-4 text-right font-bold tabular-nums ${row.negative ? "text-error" : "text-secondary"}`}>
                        {row.delta}
                      </td>
                      <td className="px-5 py-4 text-right font-semibold tabular-nums">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Help strip */}
        <section className="mt-10 bg-surface-container rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <span className="w-12 h-12 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0">
            <CircleHelp size={22} />
          </span>
          <div className="flex-1">
            <h3 className="font-serif text-xl font-semibold">
              Questions about your bean accrual?
            </h3>
            <p className="text-sm text-on-surface-variant">
              Beans never expire as long as you visit once within any 12-month
              rolling window.
            </p>
          </div>
          <div className="flex gap-4 text-sm font-bold">
            <button className="text-primary underline underline-offset-2">Read Program Terms</button>
            <button className="text-primary underline underline-offset-2">Speak with Concierge</button>
          </div>
        </section>
      </div>

      <Footer />

      {/* Scan modal */}
      {scanOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
            onClick={() => setScanOpen(false)}
          />
          <div className="relative bg-surface-container-lowest rounded-3xl p-8 max-w-sm w-full text-center shadow-xl">
            <button
              onClick={() => setScanOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-container flex items-center justify-center"
              aria-label="Close scan pass"
            >
              <X size={18} />
            </button>
            <p className="font-serif text-xl font-bold">LUMA CIRCLE PASS</p>
            <p className="text-sm text-text-secondary mt-1">Rayan Siddiqui</p>
            <p className="text-xs font-bold text-accent mt-0.5">
              Gold Brewmaster · #LC-884920
            </p>
            <div className="flex justify-center my-5">
              <QrCode size={180} className="text-primary" strokeWidth={1} />
            </div>
            <p className="flex items-center justify-center gap-2 text-xs font-semibold text-secondary">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Ready to scan at Mirpur 10 register
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
