"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/CartContext";
import { MENU_ITEMS, CATEGORIES, type MenuItem } from "@/lib/menu-data";
import {
  Search,
  Heart,
  Plus,
  X,
  Thermometer,
  Droplets,
  Wheat,
  Clock,
  Check,
} from "lucide-react";

type SortKey = "curated" | "low" | "high";

const DIETARY = ["Vegan", "Gluten-Free", "Nut-Free"] as const;

export default function MenuClient() {
  const { addToCart } = useCart();
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("curated");
  const [dietary, setDietary] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [customizing, setCustomizing] = useState<MenuItem | null>(null);
  const [milk, setMilk] = useState("Whole Organic");
  const [shots, setShots] = useState("Standard (Double)");
  const [sweetness, setSweetness] = useState(50);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  };

  const toggleFav = (id: string, name: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast(`Removed ${name} from favorites.`);
      } else {
        next.add(id);
        showToast(`Added ${name} to your favorite pours.`);
      }
      return next;
    });
  };

  const toggleDietary = (tag: string) =>
    setDietary((prev) =>
      prev.includes(tag) ? prev.filter((d) => d !== tag) : [...prev, tag]
    );

  const filtered = useMemo(() => {
    let items = MENU_ITEMS.filter(
      (item) =>
        (category === "all" || item.category === category) &&
        (query.trim() === "" ||
          `${item.name} ${item.description} ${item.tags.join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase())) &&
        dietary.every((d) =>
          `${item.description} ${item.tags.join(" ")} ${item.meta}`
            .toLowerCase()
            .includes(d.split("-")[0].toLowerCase())
        )
    );
    if (sort === "low") items = [...items].sort((a, b) => a.price - b.price);
    if (sort === "high") items = [...items].sort((a, b) => b.price - a.price);
    return items;
  }, [category, query, sort, dietary]);

  const openCustomizer = (item: MenuItem) => {
    setCustomizing(item);
    setMilk("Whole Organic");
    setShots("Standard (Double)");
    setSweetness(50);
  };

  const sweetnessLabel =
    sweetness === 0
      ? "Unsweet (0%)"
      : sweetness === 25
        ? "Light (25%)"
        : sweetness === 50
          ? "Balanced (50%)"
          : sweetness === 75
            ? "Sweet (75%)"
            : "Full (100%)";

  const modalPrice = (customizing?.price ?? 0) + (milk.includes("Oat") || milk.includes("Almond") ? 0.65 : 0) + (shots.includes("Triple") ? 0.85 : 0);

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="max-w-[1200px] mx-auto w-full px-gutter-mobile lg:px-gutter-desktop">
        {/* Page header */}
        <header className="pt-10 pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-secondary bg-secondary-container/60 rounded-full px-4 py-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              Single Batch · Spring Harvest 2025
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-tight text-on-surface">
              Handcrafted Brews &amp; Artisan Bakes
            </h1>
            <p className="text-on-surface-variant text-lg mt-3 leading-relaxed">
              Carefully extracted micro-lots, hand-poured single origins, and
              slow-fermented pastries prepared at dawn with wholesome local
              grains and churned butter.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm px-5 py-4 shrink-0">
            <span className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
              <Thermometer size={18} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-text-tertiary">
                Roastery Bar Weather
              </p>
              <p className="font-semibold text-on-surface text-sm">
                21°C · Crisp Sunlight
              </p>
            </div>
          </div>
        </header>

        {/* Roaster's Reserve spotlight */}
        <section className="rounded-3xl bg-primary-container text-on-primary p-8 md:p-12 mb-10 shadow-lg relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-tertiary-fixed-dim/20 blur-3xl rounded-full" />
          <div className="flex flex-wrap gap-2 mb-5">
            {["Roaster's Reserve", "Lot #42 · Washed Process"].map((pill) => (
              <span
                key={pill}
                className="text-[11px] font-bold uppercase tracking-[0.08em] bg-white/10 rounded-full px-3 py-1.5"
              >
                {pill}
              </span>
            ))}
            <span className="text-[11px] font-semibold text-on-primary-container px-1 py-1.5">
              Elevation: 2,150 MASL
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-medium max-w-xl leading-tight">
            Ethiopia Yirgacheffe &amp; Panama Geisha Blend
          </h2>
          <p className="text-on-primary-container mt-3 max-w-xl leading-relaxed">
            A luminous cup bursting with wild jasmine blossom, bergamot rind,
            white peach nectar, and an unhurried, silky honey finish. Roasted
            delicately in 4kg micro-batches every Tuesday.
          </p>
          <div className="flex flex-wrap gap-6 mt-6 text-sm">
            <Meter label="Acidity" value={4} />
            <Meter label="Body" value={2} />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-on-primary-container mb-1.5">
                Roast
              </p>
              <p className="font-semibold">Ultra-Light Nordic</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 mt-8">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-on-primary-container">
                Tasting Flight / 250g Bean
              </p>
              <p className="font-serif text-2xl font-semibold">
                $7.00 <span className="text-base text-on-primary-container">/ $24.00</span>
              </p>
            </div>
            <button
              onClick={() => {
                const item = MENU_ITEMS.find((m) => m.id === "yirgacheffe-pourover");
                if (item) openCustomizer(item);
              }}
              className="ml-auto bg-tertiary-fixed-dim text-on-tertiary-fixed font-semibold px-8 h-12 rounded-full hover:bg-tertiary-fixed transition-all active:scale-95"
            >
              Order Pour-Over
            </button>
          </div>
        </section>

        {/* Sticky filter bar */}
        <div className="sticky top-20 z-30 bg-surface/95 backdrop-blur-md -mx-gutter-mobile lg:-mx-gutter-desktop px-gutter-mobile lg:px-gutter-desktop py-3 border-b border-border/60">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`h-10 px-4 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all border ${
                  category === c.id
                    ? "bg-primary-container text-on-primary border-primary-container"
                    : "bg-surface-container-lowest text-text-secondary border-outline-variant/30 hover:border-outline"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="text-xs font-semibold text-text-tertiary mr-1">
              Filter by:
            </span>
            {DIETARY.map((d) => (
              <button
                key={d}
                onClick={() => toggleDietary(d)}
                className={`h-9 px-3 rounded-full text-xs font-semibold border transition-all ${
                  dietary.includes(d)
                    ? "bg-secondary text-on-secondary border-secondary"
                    : "bg-surface-container-lowest text-text-secondary border-outline-variant/30"
                }`}
              >
                {d}
              </button>
            ))}
            <div className="relative ml-auto flex items-center gap-2">
              <Search size={16} className="absolute left-3 text-text-tertiary" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search drinks, notes, beans..."
                className="h-9 rounded-full bg-surface-container-lowest border border-outline-variant/30 pl-9 pr-4 text-sm w-56 focus:outline-none focus:border-accent"
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-9 rounded-full bg-surface-container-lowest border border-outline-variant/30 px-3 text-sm hidden sm:block"
                aria-label="Sort menu"
              >
                <option value="curated">Curated Order</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="group bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/20 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {!item.available && (
                    <span className="text-[11px] font-bold bg-primary text-on-primary rounded-full px-3 py-1">
                      Paused Today
                    </span>
                  )}
                  {item.badges.slice(0, 1).map((b) => (
                    <span
                      key={b}
                      className="text-[11px] font-bold bg-surface-container-lowest/90 backdrop-blur rounded-full px-3 py-1"
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => toggleFav(item.id, item.name)}
                  aria-label="Toggle favorite"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur flex items-center justify-center transition-transform hover:scale-110"
                >
                  <Heart
                    size={16}
                    className={favorites.has(item.id) ? "fill-error text-error" : "text-primary"}
                  />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-xl font-semibold text-on-surface">
                    {item.name}
                  </h3>
                  <span className="font-bold text-lg text-on-surface tabular-nums">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant mt-2 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-medium bg-surface-container-low border border-outline-variant/20 rounded-full px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-text-tertiary mt-3">{item.available ? item.meta : item.availableNote}</p>
                <button
                  onClick={() => item.available && openCustomizer(item)}
                  disabled={!item.available}
                  className={`mt-4 w-full h-11 font-semibold rounded-full transition-all flex items-center justify-center gap-2 ${
                    item.available
                      ? "bg-primary text-on-primary hover:bg-primary-container active:scale-[0.98]"
                      : "bg-surface-container text-text-tertiary cursor-not-allowed"
                  }`}
                >
                  {item.available ? (<><Plus size={16} /> Add</>) : "Unavailable Today"}
                </button>
              </div>
            </article>
          ))}
        </section>

        {filtered.length === 0 && (
          <p className="text-center text-text-tertiary py-16">
            No offerings match your filters. Try clearing search or dietary tags.
          </p>
        )}

        {/* Assurance strip */}
        <section className="bg-surface-container-low rounded-3xl p-8 md:p-10 grid md:grid-cols-3 gap-8 mb-4">
          {[
            {
              icon: <Droplets size={20} />,
              title: "9-Stage Mineral Water",
              copy: "Remineralized reverse-osmosis brew water balanced at 120 PPM to unlock delicate fruit acidity.",
            },
            {
              icon: <Wheat size={20} />,
              title: "Direct-Trade Transparency",
              copy: "Green coffee purchased directly from partner family estates at a minimum of 2.8x Fair Trade base prices.",
            },
            {
              icon: <Clock size={20} />,
              title: "Peak Degas Window",
              copy: "Every batch rested 7–21 days post-roast before dial-in for velvet extraction with zero harsh gas.",
            },
          ].map((f) => (
            <div key={f.title} className="flex flex-col gap-3">
              <span className="w-12 h-12 rounded-2xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
                {f.icon}
              </span>
              <h3 className="font-serif text-xl font-semibold">{f.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{f.copy}</p>
            </div>
          ))}
        </section>
      </div>

      <Footer />

      {/* Customizer modal */}
      {customizing && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-primary/25 backdrop-blur-sm"
            onClick={() => setCustomizing(null)}
          />
          <div className="relative bg-surface-container-lowest rounded-3xl w-full max-w-lg p-6 md:p-8 shadow-xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button
              onClick={() => setCustomizing(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-container flex items-center justify-center"
              aria-label="Close customizer"
            >
              <X size={18} />
            </button>
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-text-tertiary">
              Custom Craft
            </p>
            <h3 className="font-serif text-2xl font-semibold mt-1">
              {customizing.name}
            </h3>
            <p className="text-sm text-on-surface-variant mt-1">
              Tailor temperature, extraction ratio, and dairy choice to your palate.
            </p>

            <p className="text-sm font-bold mt-6 mb-2">Milk &amp; Alternative</p>
            <div className="grid grid-cols-2 gap-2">
              {["Whole Organic", "Oat Barista +$0.65", "Almond Milk +$0.65", "Skim Milk"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMilk(m)}
                  className={`h-11 rounded-xl text-sm font-medium border px-3 transition-all ${
                    milk === m
                      ? "bg-primary text-on-primary border-primary"
                      : "bg-surface border-outline-variant/30"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <p className="text-sm font-bold mt-5 mb-2">Espresso Intensity</p>
            <div className="flex flex-wrap gap-2">
              {["Standard (Double)", "Triple Shot (+$0.85)", "Swiss Decaf"].map((s) => (
                <button
                  key={s}
                  onClick={() => setShots(s)}
                  className={`h-10 px-4 rounded-full text-sm font-medium border transition-all ${
                    shots === s
                      ? "bg-primary text-on-primary border-primary"
                      : "bg-surface border-outline-variant/30"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mt-5 mb-2">
              <p className="text-sm font-bold">Sweetness Level</p>
              <span className="text-sm text-accent font-semibold">{sweetnessLabel}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={25}
              value={sweetness}
              onChange={(e) => setSweetness(Number(e.target.value))}
              className="w-full accent-[#2c1d11]"
              aria-label="Sweetness level"
            />
            <div className="flex justify-between text-[11px] text-text-tertiary mt-1">
              <span>Unsweet</span>
              <span>Light</span>
              <span>Medium</span>
              <span>Full</span>
            </div>

            <div className="flex items-center justify-between mt-6 pt-5 border-t border-border">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-text-tertiary">
                  Total Price
                </p>
                <p className="font-serif text-2xl font-bold">${modalPrice.toFixed(2)}</p>
              </div>
              <button
                onClick={() => {
                  addToCart({
                    id: `${customizing.id}-${milk}-${shots}-${sweetness}`,
                    name: customizing.name,
                    price: modalPrice,
                    image: customizing.image,
                  });
                  setCustomizing(null);
                  showToast("Handcrafted drink added to your order.");
                }}
                className="bg-primary-container hover:bg-primary text-on-primary font-semibold px-8 h-12 rounded-full transition-all active:scale-95"
              >
                Add to Tray
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-primary text-on-primary text-sm font-medium rounded-full px-5 py-3 shadow-lg flex items-center gap-2 animate-fade-in-up">
          <Check size={16} /> {toast}
        </div>
      )}
    </main>
  );
}

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-wider text-on-primary-container mb-1.5">
        {label}
      </p>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`w-2.5 h-2.5 rounded-full ${i <= value ? "bg-tertiary-fixed-dim" : "bg-white/20"}`}
          />
        ))}
      </div>
    </div>
  );
}
