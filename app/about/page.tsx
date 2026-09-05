import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Handshake,
  BadgeCheck,
  Flame,
  ScanLine,
  Coffee,
  Landmark,
  Leaf,
  Armchair,
  Recycle,
  SunDim,
  HeartHandshake,
  ArrowRight,
  Store,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story & Origins — Luma Café",
  description:
    "From Dhaka genesis to direct-trade micro-lots: the roasting craft, biophilic spaces, guild, and regenerative hospitality behind Luma Café.",
};

const STATS = [
  { value: "14", label: "Direct-Trade Micro-Lots" },
  { value: "100%", label: "Traceable Harvests" },
  { value: "88+", label: "SCA Average Cupping Score" },
  { value: "2026", label: "Zero-Waste Roasting Goal" },
];

const ORIGINS = [
  {
    country: "Ethiopia",
    masl: "2,100 MASL",
    lot: "Yirgacheffe & Sidama",
    process: "Heirloom Varietals · Natural Process",
    copy: "Grown by eight independent family smallholders under native canopy shade — wild honeysuckle, bergamot tea, white peach.",
    flavors: ["Peach Nectar", "Bergamot", "Jasmine"],
  },
  {
    country: "Colombia",
    masl: "1,850 MASL",
    lot: "Huila Micro-Estates",
    process: "Pink Bourbon & Gesha · Washed",
    copy: "Slow aerobic fermentation in cool mountain cisterns — citric vibrancy, panela sugar, green apple.",
    flavors: ["Green Apple", "Panela Sugar", "Lemon Verbena"],
  },
  {
    country: "Costa Rica",
    masl: "1,700 MASL",
    lot: "Tarrazú Valley",
    process: "Caturra & Catuai · White Honey",
    copy: "Solar-dried on raised cedar beds — silky mouthfeel, almond praline, golden raisin.",
    flavors: ["Almond Praline", "Golden Raisin", "Milk Chocolate"],
  },
];

const TEAM = [
  {
    initials: "RS",
    name: "Rayan Siddiqui",
    role: "Founder & Green Coffee Buyer",
    copy: "Licensed Q-Grader with 12 years sourcing micro-lots across East Africa and Latin America.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    initials: "AI",
    name: "Aminul Islam",
    role: "Master Roaster & Quality Director",
    copy: "National Roasting Champion 2023, orchestrating proprietary heat-flow profiles.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
  },
  {
    initials: "SK",
    name: "Samira Khan",
    role: "Executive Pastry Chef",
    copy: "Parisian-trained baker specializing in slow wild-fermentation brioche and seasonal tarts.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
  },
  {
    initials: "TR",
    name: "Tasmia Rahman",
    role: "Head of Barista Guild",
    copy: "Overseeing barista apprenticeships, customer education, and precision pour-over calibration.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
  },
];

const PILLARS = [
  {
    icon: <Recycle size={20} />,
    title: "100% Compostable",
    copy: "Takeaway cups, bio-polymer cold lids, and bean packaging decompose within 90 days.",
  },
  {
    icon: <Leaf size={20} />,
    title: "Urban Ground Upcycling",
    copy: "100% of spent espresso cakes donated to community vegetable rooftops across Dhaka.",
  },
  {
    icon: <SunDim size={20} />,
    title: "Solar Preheated Air",
    copy: "Rooftop solar thermal collectors reduce gas consumption by 38% per roast.",
  },
  {
    icon: <HeartHandshake size={20} />,
    title: "Living Wage Guarantee",
    copy: "Comprehensive health insurance, paid guild apprenticeships, and thriving wage standards.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="max-w-[1200px] mx-auto w-full px-gutter-mobile lg:px-gutter-desktop">
        {/* Hero */}
        <header className="pt-12 pb-10 text-center max-w-3xl mx-auto">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-secondary bg-secondary-container/60 rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            Our Story · Crafted with Purpose
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-semibold leading-tight mt-5">
            Coffee as an Art of Unhurried Connection
          </h1>
          <p className="text-on-surface-variant text-lg mt-4 leading-relaxed">
            Founded in Dhaka with an enduring belief: that great coffee is more
            than morning caffeine — it is a sensory ritual, an ethical bond with
            regenerative farmers, and a warm sanctuary where community flourishes.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 bg-surface-container-low rounded-2xl p-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-surface-container-lowest rounded-xl py-5 px-3">
                <p className="font-serif text-3xl font-semibold tabular-nums">{s.value}</p>
                <p className="text-xs text-text-secondary mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </header>

        {/* Genesis */}
        <section className="grid lg:grid-cols-2 gap-10 items-center py-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-tertiary">
              The Dhaka Genesis
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mt-2 leading-tight">
              Cultivating Calm Amidst the City&apos;s Relentless Rhythm
            </h2>
            <p className="text-on-surface-variant mt-4 leading-relaxed">
              We set out to carve unhurried spaces in Dhaka — inspired by the
              city&apos;s literary history and tea addas, and a yearning for
              contemporary craft and slow living.
            </p>
            <p className="text-on-surface-variant mt-3 leading-relaxed">
              Caffeine, re-anchored as an intentional pause: acoustic plaster
              arches, ceramic vessels from Rayer Bazar potters, and roasts that
              never rush the bean — or the guest.
            </p>
            <blockquote className="mt-6 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 relative overflow-hidden">
              <p className="font-serif text-xl italic leading-relaxed">
                “We do not rush the bean, and we do not rush the guest. In a
                world moving at breakneck speed, Luma is an invitation to pause,
                breathe, and savor.”
              </p>
              <footer className="flex items-center gap-3 mt-4">
                <span className="w-10 h-10 rounded-full bg-primary-container text-on-primary font-serif font-bold flex items-center justify-center">
                  RS
                </span>
                <span>
                  <span className="block text-sm font-bold">Rayan Siddiqui</span>
                  <span className="block text-xs text-text-secondary">
                    Founder &amp; Head of Coffee
                  </span>
                </span>
              </footer>
            </blockquote>
          </div>
          <div className="relative h-[420px] lg:h-[520px] rounded-3xl overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1000&q=80"
              alt="Our Mirpur 10 Flagship Roastery and Brew Bar"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-surface">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-surface/80">
                Sanctuary Architecture
              </p>
              <p className="font-serif text-xl font-semibold">
                Our Mirpur 10 Flagship Roastery &amp; Brew Bar
              </p>
            </div>
          </div>
        </section>

        {/* Origins */}
        <section className="py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-tertiary">
                Terroir &amp; Traceability
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mt-2">
                Soil, Altitude &amp; Stewardship
              </h2>
              <p className="text-on-surface-variant mt-2 max-w-xl">
                Our relationships begin in high-elevation volcanic soils — and in
                contracts negotiated directly with the families who farm them.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-bold bg-secondary-container/60 text-secondary rounded-full px-4 py-2 w-fit">
              <Handshake size={16} /> 100% Direct-Negotiated Contracts
            </span>
          </div>

          <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden mt-6 group">
            <Image
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1400&q=80"
              alt="Coffee harvest at partner family estates"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
            <div className="absolute bottom-0 p-8 text-surface max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] bg-surface/15 backdrop-blur rounded-full px-3 py-1.5">
                <BadgeCheck size={13} /> Ethical Direct Sourcing
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-semibold mt-3">
                Empowering the Hands at the Harvest
              </h3>
              <p className="text-surface/85 text-sm mt-2">
                We pay on average 280% above standard Fair Trade minimums to
                guarantee living wages, soil regeneration, and healthcare access.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {ORIGINS.map((o) => (
              <article
                key={o.country}
                className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="uppercase tracking-[0.08em] text-accent">{o.country}</span>
                  <span className="tabular-nums text-text-secondary">{o.masl}</span>
                </div>
                <h3 className="font-serif text-xl font-semibold mt-2">{o.lot}</h3>
                <p className="text-xs font-semibold text-text-secondary">{o.process}</p>
                <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">{o.copy}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {o.flavors.map((f) => (
                    <span
                      key={f}
                      className="text-[11px] font-medium bg-surface-container-low border border-outline-variant/20 rounded-full px-2.5 py-1"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Roasting craft */}
        <section className="grid lg:grid-cols-2 gap-10 items-center py-10">
          <div className="relative h-[380px] rounded-3xl overflow-hidden group order-2 lg:order-1">
            <Image
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1000&q=80"
              alt="Small-batch roasting drum"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute bottom-5 left-5 inline-flex items-center gap-1.5 text-xs font-bold bg-surface/90 backdrop-blur rounded-full px-4 py-2">
              <Flame size={14} className="text-accent" /> Restored 1978 Cast Iron Drum
            </span>
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-tertiary">
              Small-Batch Science
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mt-2">
              Precision Roasting for Terroir Brilliance
            </h2>
            <p className="text-on-surface-variant mt-4 leading-relaxed">
              Nordic-inspired light-to-medium profiles with gentle conductive heat
              highlight each lot&apos;s genetic sweetness and preserve delicate
              florals — never baked, never ashy.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mt-6">
              <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-5">
                <ScanLine size={20} className="text-accent" />
                <h3 className="font-bold text-sm mt-2">Total Lot Transparency</h3>
                <p className="text-[13px] text-text-secondary mt-1">
                  Every pouch lists harvest month, farm coordinates, varietal, roast date, and roaster signature.
                </p>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-5">
                <Coffee size={20} className="text-accent" />
                <h3 className="font-bold text-sm mt-2">Weekly Sensory Cuppings</h3>
                <p className="text-[13px] text-text-secondary mt-1">
                  Every Saturday at the Mirpur cupping table — open to all, scored on SCA sheets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Biophilic design */}
        <section className="py-10 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-tertiary">
            Biophilic Design
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mt-2">
            Spaces Designed for Mindful Presence
          </h2>
          <p className="text-on-surface-variant mt-2 max-w-xl mx-auto">
            The vessel shapes the thoughts. We reject stark fluorescent hurry for
            limewash, timber, and living green.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8 text-left">
            {[
              {
                icon: <Landmark size={20} />,
                title: "Romanesque Limewash Arches",
                copy: "Curved earthen thresholds diffuse sunbeams and soften conversation.",
                tag: "Natural Acoustic Absorption",
              },
              {
                icon: <Leaf size={20} />,
                title: "Living Olive & Fiddle Figs",
                copy: "Indoor botanical courtyards cycle air and slow the pulse of the room.",
                tag: "Enhanced Air Purity & Mood",
              },
              {
                icon: <Armchair size={20} />,
                title: "Solid Ashwood Craftsmanship",
                copy: "Locally milled timber tables, cane backrests, linen cushions, discrete USB-C.",
                tag: "Mindful Work & Reading Desks",
              },
            ].map((c) => (
              <article key={c.title} className="bg-surface-container-low rounded-3xl p-7">
                <span className="w-12 h-12 rounded-2xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
                  {c.icon}
                </span>
                <h3 className="font-serif text-xl font-semibold mt-4">{c.title}</h3>
                <p className="text-sm text-on-surface-variant mt-2">{c.copy}</p>
                <span className="inline-block mt-4 text-[11px] font-bold bg-surface-container-lowest border border-outline-variant/30 rounded-full px-3 py-1">
                  {c.tag}
                </span>
              </article>
            ))}
          </div>
        </section>

        {/* Guild */}
        <section className="py-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-tertiary">
            The Guild
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mt-2">
            Custodians of Hospitality
          </h2>
          <p className="text-on-surface-variant mt-2 max-w-xl">
            Certified Q-Graders, roasters, pastry chefs, and hospitality leaders
            united by quiet excellence.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {TEAM.map((m) => (
              <article
                key={m.name}
                className="group bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/20 hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-surface-container">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold">{m.name}</h3>
                  <p className="text-xs font-bold text-accent">{m.role}</p>
                  <p className="text-[13px] text-text-secondary mt-2">{m.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Sustainability */}
        <section className="py-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-tertiary">
            Earth &amp; People
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mt-2">
            Regenerative Hospitality
          </h2>
          <p className="text-on-surface-variant mt-2 max-w-xl">
            We measure success not solely by cups served, but by ecological
            footprint left lighter.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {PILLARS.map((p) => (
              <article
                key={p.title}
                className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <span className="w-11 h-11 rounded-2xl bg-secondary-container text-secondary flex items-center justify-center">
                  {p.icon}
                </span>
                <h3 className="font-bold mt-3">{p.title}</h3>
                <p className="text-[13px] text-text-secondary mt-1.5 leading-relaxed">
                  {p.copy}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="my-10 bg-primary-container text-on-primary rounded-3xl p-8 md:p-14 relative overflow-hidden">
          <span className="absolute -right-8 -top-8 font-serif text-[180px] leading-none text-on-primary/10 select-none">
            L
          </span>
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-tertiary-fixed-dim">
            Hospitality Awaits
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold mt-2 max-w-xl">
            Experience the Craft in Person
          </h2>
          <p className="text-on-primary-container mt-3 max-w-xl">
            Step into our sunlit sanctuary in Mirpur 10. Breathe the aroma of
            fresh small-batch roasts and stay for one more pour.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/locations"
              className="h-13 px-8 py-3.5 rounded-full bg-surface-container-lowest text-primary font-semibold flex items-center gap-2 hover:bg-tertiary-fixed-dim transition-colors"
            >
              <Store size={17} /> Visit Mirpur 10 Roastery
            </Link>
            <Link
              href="/menu"
              className="px-8 py-3.5 rounded-full border border-on-primary/30 font-semibold flex items-center gap-2 hover:bg-white/10 transition-colors"
            >
              Explore Seasonal Menu <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
