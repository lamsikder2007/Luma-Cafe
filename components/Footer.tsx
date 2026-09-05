"use client";

import React from "react";
import Link from "next/link";
import SiteLogo from "./SiteLogo";
import { Leaf } from "lucide-react";

const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    path: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    ),
  },
  {
    label: "X",
    href: "#",
    path: (
      <path d="M4 4l16 16M20 4L4 20" />
    ),
  },
  {
    label: "Facebook",
    href: "#",
    path: (
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    ),
  },
];

const NAV_LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/order", label: "Order Online" },
  { href: "/rewards", label: "Rewards" },
  { href: "/locations", label: "Locations" },
  { href: "/about", label: "About" },
  { href: "mailto:hello@lumacafe.co", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-container-low mt-space-4xl">
      <div className="max-w-[1200px] mx-auto px-gutter-mobile lg:px-gutter-desktop pt-space-3xl pb-space-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Brand + socials */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link
              href="/"
              aria-label="Luma Café home"
            >
              <SiteLogo className="h-12 w-auto drop-shadow-[0_2px_12px_rgba(198,139,89,0.35)]" />
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Crafting unhurried sensory experiences with responsibly sourced
              single-origin coffees, mindful patisserie, and community warmth.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-text-secondary hover:bg-primary hover:text-on-primary transition-all"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {s.path}
                  </svg>
                </a>
              ))}
            </div>
            <p className="flex items-center gap-2 text-xs font-semibold text-secondary">
              <Leaf size={14} />
              100% Certified Direct-Trade Beans
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.08em] text-text-tertiary mb-1">
              Explore
            </h4>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-text-secondary hover:text-primary transition-colors w-fit"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h4 className="font-serif text-xl font-bold text-primary">
              Get brighter updates.
            </h4>
            <p className="text-text-secondary text-sm">
              Subscribe for exclusive offers, seasonal harvests, and tasting
              invitations.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email address"
                aria-label="Email address"
                className="bg-surface-container-lowest border border-transparent rounded-full px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent w-full h-12"
                required
              />
              <button
                type="submit"
                className="bg-primary-container hover:bg-primary text-on-primary font-semibold px-6 py-3 rounded-full transition-colors whitespace-nowrap h-12"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-outline-variant/40 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-text-tertiary text-xs">
          <p>© 2026 Luma Café. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Hospitality</Link>
            <span>Dhaka / Mirpur 10</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
