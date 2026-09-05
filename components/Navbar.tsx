"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, MapPin, ShoppingBag, Menu, X, User, LogOut } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import SiteLogo from "./SiteLogo";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/order", label: "Order Online" },
  { href: "/about", label: "About" },
  { href: "/rewards", label: "Rewards" },
  { href: "/locations", label: "Locations" },
];

interface SessionMember {
  id: string;
  name: string;
  tier: string;
  beans: number;
}

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [member, setMember] = useState<SessionMember | null>(null);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [demoMembers, setDemoMembers] = useState<SessionMember[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/session")
      .then((r) => r.json())
      .then((d) => setMember(d.member ?? null))
      .catch(() => setMember(null));
  }, []);

  const openSignIn = () => {
    setIsSignInOpen(true);
    fetch("/api/session/members")
      .then((r) => r.json())
      .then((d) => setDemoMembers(Array.isArray(d.members) ? d.members : []))
      .catch(() => setDemoMembers([]));
  };

  const signInAs = async (id: string) => {
    const res = await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memberId: id }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.member) {
      setMember(data.member);
      setIsSignInOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const signOut = async () => {
    await fetch("/api/session", { method: "DELETE" }).catch(() => {});
    setMember(null);
    setIsMobileMenuOpen(false);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-40 w-full bg-surface/90 backdrop-blur-xl border-b border-border transition-all">
      <div className="max-w-[1200px] mx-auto px-gutter-mobile lg:px-gutter-desktop flex items-center justify-between h-20">
        {/* Left: Logo & Tagline */}
        <Link href="/" className="shrink-0" aria-label="Luma Café home">
          <SiteLogo className="h-11 md:h-12 w-auto drop-shadow-[0_2px_12px_rgba(198,139,89,0.4)]" />
        </Link>

        {/* Center: Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-primary after:transition-transform after:duration-300 ${
                isActive(item.href)
                  ? "text-primary font-bold after:scale-x-100"
                  : "text-text-secondary hover:text-primary after:scale-x-0 hover:after:scale-x-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <Link
            href="/menu"
            className="text-text-secondary hover:text-primary transition-colors"
            aria-label="Search the menu"
          >
            <Search size={18} />
          </Link>

          <Link
            href="/locations"
            className="flex items-center gap-1.5 text-text-secondary hover:text-primary cursor-pointer transition-colors group"
          >
            <MapPin size={16} className="group-hover:text-accent" />
            <span className="text-sm font-medium">Dhaka / Mirpur 10</span>
          </Link>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative text-text-secondary hover:text-primary transition-colors"
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-accent text-primary text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>

          {member ? (
            <div className="flex items-center gap-2">
              <Link
                href="/rewards"
                className="flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-primary transition-colors"
                title={`${member.tier} · ${member.beans} beans`}
              >
                <span className="w-8 h-8 rounded-full bg-secondary-container text-secondary flex items-center justify-center">
                  <User size={15} />
                </span>
                <span className="max-w-24 truncate">
                  {member.name.split(" ")[0]}
                </span>
                <span className="text-[11px] font-bold bg-tertiary-fixed text-on-tertiary-fixed rounded-full px-2 py-0.5 tabular-nums">
                  {member.beans}
                </span>
              </Link>
              <button
                onClick={signOut}
                className="text-text-tertiary hover:text-primary transition-colors"
                aria-label="Sign out"
                title="Sign out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={openSignIn}
              className="text-sm font-semibold text-on-primary bg-primary-container hover:bg-primary px-5 py-2.5 rounded-full transition-colors"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative text-text-secondary hover:text-primary transition-colors"
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-accent text-primary text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-text-primary"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-surface border-b border-border shadow-lg py-4 px-6 flex flex-col gap-4 animate-fade-in-down">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-base font-medium ${
                isActive(item.href) ? "text-primary" : "text-text-secondary"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div className="h-px bg-border my-2" />

          <div className="flex items-center gap-2 text-text-secondary">
            <MapPin size={16} />
            <span className="text-sm font-medium">Dhaka / Mirpur 10</span>
          </div>
          {member ? (
            <div className="flex items-center gap-3 mt-2">
              <span className="text-sm font-semibold">
                {member.name} · {member.beans} beans
              </span>
              <button
                onClick={signOut}
                className="text-sm font-medium text-text-tertiary"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={openSignIn}
              className="text-left text-sm font-medium text-primary mt-2"
            >
              Sign In
            </button>
          )}
        </div>
      )}

      {/* Demo sign-in modal */}
      {isSignInOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
            onClick={() => setIsSignInOpen(false)}
          />
          <div className="relative bg-surface-container-lowest rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-xl">
            <button
              onClick={() => setIsSignInOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-container flex items-center justify-center"
              aria-label="Close sign in"
            >
              <X size={18} />
            </button>
            <h3 className="font-serif text-2xl font-semibold">Welcome back</h3>
            <p className="text-sm text-on-surface-variant mt-1">
              Demo sign-in — pick a Luma Circle profile to unlock points,
              favorites, and order history for Luma AI.
            </p>
            <div className="flex flex-col gap-2 mt-5">
              {demoMembers.map((m) => (
                <button
                  key={m.id}
                  onClick={() => signInAs(m.id)}
                  className="text-left rounded-2xl border border-outline-variant/30 p-4 hover:border-primary hover:shadow-sm transition-all"
                >
                  <span className="block text-sm font-bold">{m.name}</span>
                  <span className="block text-xs text-text-secondary mt-0.5">
                    {m.tier} · {m.beans.toLocaleString("en-US")} beans
                  </span>
                </button>
              ))}
              {demoMembers.length === 0 && (
                <p className="text-sm text-text-tertiary">Loading profiles…</p>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
