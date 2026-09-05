"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  MapPin,
  Sun,
  CloudDownload,
  Coffee,
  Gauge,
  Wifi,
  Plug,
  PawPrint,
  Factory,
  FlaskConical,
  Accessibility,
  Car,
  Armchair,
  BadgeCheck,
  CalendarDays,
  Train,
  SquareParking,
  Clock,
  Navigation,
  Phone,
  ArrowRight,
  CircleCheck,
  Compass,
} from "lucide-react";

const LocationMap = dynamic(() => import("@/components/LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="h-56 bg-surface-container-low flex items-center justify-center text-sm text-text-tertiary">
      Loading map…
    </div>
  ),
});

const PARTY = ["1 · Solo Focus", "2 · Duo Table", "3–4 · Small Circle", "5+ · Studio Pod"];
const ZONES = [
  { icon: "window", title: "Window Sunlit Nook", copy: "Soft natural daylight, view over Avenue 5" },
  { icon: "mezzanine", title: "Study Mezzanine", copy: "Library silence, dual power outlets & desk lamps" },
  { icon: "roastery", title: "Main Roastery Floor", copy: "Sensory aroma of fresh roasts, lively hum" },
  { icon: "patio", title: "Garden Patio", copy: "Open air, potted olive trees, pet welcoming" },
];
const SLOTS = ["8:00 AM", "10:30 AM", "12:30 PM", "2:30 PM", "5:30 PM", "8:00 PM"];

const AMENITIES = [
  { icon: <Wifi size={20} />, title: "High-Speed Fiber", copy: "300 Mbps Mesh" },
  { icon: <Plug size={20} />, title: "Work Pods", copy: "USB-C & 220V" },
  { icon: <PawPrint size={20} />, title: "Pet-Friendly Patio", copy: "Water Bowls & Shade" },
  { icon: <Factory size={20} />, title: "Roastery Mezzanine", copy: "Live Giesen 15kg" },
  { icon: <FlaskConical size={20} />, title: "Cupping Lab", copy: "SCA Standard" },
  { icon: <Accessibility size={20} />, title: "Fully Accessible", copy: "Ramp & Wide Aisles" },
  { icon: <Car size={20} />, title: "Valet & Parking", copy: "Complimentary" },
];

export default function LocationsClient() {
  const [party, setParty] = useState(PARTY[0]);
  const [zone, setZone] = useState(ZONES[0].title);
  const [slot, setSlot] = useState(SLOTS[1]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [flight, setFlight] = useState(true);
  const [reserved, setReserved] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="max-w-[1200px] mx-auto w-full px-gutter-mobile lg:px-gutter-desktop">
        {/* Title */}
        <header className="pt-10 pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-secondary bg-secondary-container/60 rounded-full px-4 py-1.5 mb-4">
              <MapPin size={13} /> Spaces of Unhurried Calm
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-tight">
              Find Your Space to Pause — Roasteries &amp; Brew Bars in Dhaka
            </h1>
            <p className="text-on-surface-variant text-lg mt-3 leading-relaxed">
              Designed with raw lime plaster, sunlit Romanesque arches, and the
              gentle rhythm of small-batch roasting. Step in for quiet morning
              focus or slow afternoon conversations.
            </p>
            <div className="flex flex-wrap gap-2 mt-5 bg-surface-container-high rounded-full p-1.5 w-fit">
              <span className="bg-primary-container text-on-primary text-xs font-bold rounded-full px-4 py-2">
                Mirpur 10 Flagship Roastery · Open Now
              </span>
              <span className="text-xs font-semibold text-text-secondary rounded-full px-4 py-2">
                Gulshan 2 Brew Bar · Autumn 2025
              </span>
              <span className="text-xs font-semibold text-text-secondary rounded-full px-4 py-2 hidden sm:inline">
                Dhanmondi 27 Kiosk · Late 2025
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-surface-container rounded-2xl px-5 py-4 shrink-0 text-sm">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary">
                Live Barista Bar
              </p>
              <p className="font-semibold">Batch No. 84 Gesha on Pour-over</p>
            </div>
          </div>
        </header>

        {/* Showcase bento */}
        <section className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[460px] rounded-3xl overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80"
              alt="Luma Café Mirpur 10 flagship warm lime plaster arched interior"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
            <div className="absolute bottom-0 p-8 text-surface">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] bg-surface/15 backdrop-blur rounded-full px-3 py-1.5">
                <Sun size={13} /> Morning Sanctuary · South Exposure
              </span>
              <h2 className="font-serif text-3xl font-semibold mt-3">
                The Sanctuary Hall &amp; Arched Colonies
              </h2>
              <p className="text-surface/85 text-sm mt-2 max-w-md">
                Textured terracotta limewash walls, natural ashwood benches, and
                curated acoustics engineered for reflective thinking and
                unhurried meetings.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative h-[220px] rounded-3xl overflow-hidden group shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80"
                alt="Flat white with latte art beside artisan croissant"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
              <span className="absolute bottom-4 left-4 text-[11px] font-bold uppercase tracking-[0.08em] text-surface bg-surface/15 backdrop-blur rounded-full px-3 py-1.5">
                Slow Bar: Single-Origin Natural Ethiopian Heirloom
              </span>
            </div>
            <div className="bg-surface-container-low rounded-3xl p-6 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <CloudDownload size={17} /> Current Atmosphere
                </h3>
                <span className="text-[11px] font-bold bg-secondary-container text-on-secondary-fixed rounded-full px-3 py-1">
                  Moderate Crowd
                </span>
              </div>
              <p className="text-sm font-semibold mt-4">
                Available Seating Right Now ·{" "}
                <span className="text-secondary">64% Available</span>
              </p>
              <div className="h-2.5 bg-surface-container-highest rounded-full mt-2 overflow-hidden">
                <div className="h-full w-[36%] bg-secondary rounded-full" />
              </div>
              <p className="text-[13px] text-text-secondary mt-3">
                Optimal quiet time: 8:00 AM – 11:30 AM. Peak pour-over rush:
                4:30 PM – 7:30 PM.
              </p>
              <div className="flex flex-wrap gap-4 mt-4 text-[13px] font-medium">
                <span className="flex items-center gap-1.5">
                  <Coffee size={15} className="text-accent" /> Dual Synesso MVP Bar
                </span>
                <span className="flex items-center gap-1.5">
                  <Gauge size={15} className="text-accent" /> 300 Mbps Dedicated Fiber
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section className="pt-12">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold">
            Thoughtful Amenities for Mindful Stays
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            Crafted for tactile comfort &amp; uninterrupted deep work
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mt-5">
            {AMENITIES.map((a) => (
              <div
                key={a.title}
                className="bg-surface-container rounded-2xl p-4 hover:bg-surface-container-high transition-colors"
              >
                <span className="w-10 h-10 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
                  {a.icon}
                </span>
                <p className="text-[13px] font-bold mt-3 leading-snug">{a.title}</p>
                <p className="text-xs text-text-secondary">{a.copy}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reservation + map */}
        <section className="grid lg:grid-cols-12 gap-8 mt-12">
          <div className="lg:col-span-7 bg-surface-container-low rounded-3xl p-6 md:p-10">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-text-tertiary">
              <Armchair size={15} /> Guaranteed Space
            </p>
            <h2 className="font-serif text-3xl font-semibold mt-2">
              Reserve Your Table or Work Pod
            </h2>
            <p className="text-sm text-on-surface-variant mt-2">
              We hold your table for up to 20 minutes past your reserved time.
              Walk-ins are always welcomed at our central brew bar.
            </p>

            {reserved ? (
              <div className="mt-6 bg-secondary-container rounded-2xl p-6 flex gap-3">
                <CircleCheck size={24} className="text-secondary shrink-0" />
                <div>
                  <h3 className="font-serif text-xl font-semibold text-on-secondary-fixed">
                    Table Reserved at Mirpur 10 Flagship!
                  </h3>
                  <p className="text-sm text-on-secondary-fixed-variant mt-1">
                    Booking reference <strong>#LUMA-8842</strong> · {party} ·{" "}
                    {zone} · {slot}. An SMS with directions has been sent to{" "}
                    {phone || "your phone"}.
                  </p>
                  <button
                    onClick={() => setReserved(false)}
                    className="text-sm font-bold text-secondary underline underline-offset-2 mt-2"
                  >
                    Modify reservation
                  </button>
                </div>
              </div>
            ) : (
              <form
                className="mt-6 flex flex-col gap-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setReserved(true);
                }}
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-text-tertiary mb-2">
                    Guest Party Size
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {PARTY.map((p) => (
                      <button
                        type="button"
                        key={p}
                        onClick={() => setParty(p)}
                        className={`h-11 rounded-full text-[13px] font-bold transition-all ${
                          party === p
                            ? "bg-primary-container text-on-primary"
                            : "bg-surface-container-lowest text-text-secondary"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-text-tertiary mb-2">
                    Atmosphere Zone
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {ZONES.map((z) => (
                      <button
                        type="button"
                        key={z.title}
                        onClick={() => setZone(z.title)}
                        className={`text-left rounded-2xl p-4 border transition-all ${
                          zone === z.title
                            ? "bg-surface-container-lowest border-primary"
                            : "bg-surface-container-lowest/60 border-transparent hover:bg-surface-container-lowest"
                        }`}
                      >
                        <span className="text-sm font-bold">{z.title}</span>
                        <span className="block text-xs text-text-secondary mt-0.5">
                          {z.copy}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-text-tertiary mb-2">
                      Date
                    </p>
                    <div className="flex gap-2">
                      {["Today", "Tomorrow"].map((d, i) => (
                        <span
                          key={d}
                          className={`h-11 px-4 rounded-full text-[13px] font-bold flex items-center ${
                            i === 0
                              ? "bg-primary-container text-on-primary"
                              : "bg-surface-container-lowest text-text-secondary"
                          }`}
                        >
                          {d}
                        </span>
                      ))}
                      <span className="h-11 px-4 rounded-full bg-surface-container-lowest text-text-secondary flex items-center gap-1.5 text-[13px] font-bold">
                        <CalendarDays size={15} /> Oct 24
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-text-tertiary mb-2">
                      Arrival Slot
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {SLOTS.map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => setSlot(s)}
                          className={`h-10 rounded-full text-xs font-bold transition-all ${
                            slot === s
                              ? "bg-primary-container text-on-primary"
                              : "bg-surface-container-lowest text-text-secondary"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Full Name — Tanvir Rahman"
                    className="h-12 rounded-xl bg-surface-container-lowest px-4 text-sm focus:outline-none focus:ring-2 ring-primary-container"
                  />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    type="tel"
                    placeholder="Phone — +880 1712 345678"
                    className="h-12 rounded-xl bg-surface-container-lowest px-4 text-sm focus:outline-none focus:ring-2 ring-primary-container"
                  />
                </div>

                <label className="flex gap-3 bg-secondary-container/40 rounded-2xl p-4 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={flight}
                    onChange={(e) => setFlight(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-[#2c1d11]"
                  />
                  <span>
                    <strong>Barista Origin Flight (+৳450).</strong>{" "}
                    <span className="text-text-secondary">
                      A 3-cup mini cupping flight (Natural Ethiopia, Washed
                      Colombia, Anaerobic Panama) served upon arrival.
                    </span>
                  </span>
                </label>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <p className="flex items-center gap-1.5 text-xs text-text-secondary">
                    <BadgeCheck size={14} className="text-secondary" />
                    Instant confirmation SMS &amp; Apple Wallet pass
                  </p>
                  <button
                    type="submit"
                    className="sm:ml-auto h-14 px-8 rounded-full bg-primary-container hover:bg-primary text-on-primary font-semibold transition-all active:scale-95 flex items-center gap-2 group"
                  >
                    Reserve Your Table
                    <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-surface-container rounded-3xl p-6">
              <h3 className="font-serif text-xl font-semibold flex items-center gap-2">
                <MapPin size={19} className="text-accent" /> Mirpur 10 Flagship
              </h3>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-tertiary">
                Main Roastery
              </p>
              <div className="relative h-56 rounded-2xl overflow-hidden mt-4">
                <LocationMap className="h-56 w-full" zoom={15} />
                <span className="absolute bottom-3 left-3 right-3 text-xs font-semibold bg-surface/90 backdrop-blur rounded-full px-4 py-2 text-center pointer-events-none z-[500]">
                  Plot 14, Avenue 5, Mirpur 10 · Metro Pillar 248
                </span>
              </div>
              <ul className="mt-4 flex flex-col gap-3 text-[13px] text-text-secondary">
                <li className="flex gap-2.5">
                  <Train size={16} className="shrink-0 mt-0.5 text-primary" />
                  Dhaka Metro Rail (MRT Line 6): Mirpur 10 Station, Exit Gate 2 — a brisk 4-minute shaded walk.
                </li>
                <li className="flex gap-2.5">
                  <SquareParking size={16} className="shrink-0 mt-0.5 text-primary" />
                  Underground lot with 20 dedicated slots and 4 Level-2 EV charging points.
                </li>
                <li className="flex gap-2.5">
                  <Clock size={16} className="shrink-0 mt-0.5 text-primary" />
                  Barista Hours: Monday – Sunday, 7:30 AM – 10:30 PM (Kitchen closes 9:45 PM).
                </li>
              </ul>
              <div className="flex gap-2 mt-5">
                <a
                  href="https://maps.google.com/?q=Mirpur+10+Dhaka"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 h-12 rounded-full bg-primary-container text-on-primary text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary transition-colors"
                >
                  <Navigation size={15} /> Directions
                </a>
                <a
                  href="tel:+8801700000000"
                  className="flex-1 h-12 rounded-full bg-surface-container-high text-sm font-bold flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-colors"
                >
                  <Phone size={15} /> Call Bar Counter
                </a>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-3xl p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-tertiary">
                Community &amp; Culture
              </p>
              <h3 className="font-serif text-xl font-semibold mt-1 flex items-center gap-2">
                <CalendarDays size={19} className="text-accent" /> In-Store Cuppings &amp; Sessions
              </h3>
              {[
                {
                  date: "OCT 26",
                  title: "Saturday Home Barista V60 Masterclass",
                  meta: "10:00 AM – 12:00 PM · Brew Lab Mezzanine",
                  extra: "3 spots left · ৳1,800 / person",
                },
                {
                  date: "NOV 02",
                  title: "Public Sensory Cupping: Autumn Ethiopian Harvest",
                  meta: "5:00 PM – 6:30 PM · Complimentary Event",
                  extra: "Free Entry · RSVP",
                },
              ].map((e) => (
                <div key={e.title} className="flex gap-3 mt-4 bg-surface-container-lowest rounded-2xl p-4">
                  <span className="bg-primary-container text-on-primary text-xs font-bold rounded-xl px-3 py-2 h-fit whitespace-nowrap">
                    {e.date}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{e.title}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{e.meta}</p>
                    <p className="text-xs font-bold text-accent mt-1">{e.extra}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Future locations */}
        <section className="mt-12 mb-4">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-text-tertiary">
            <Compass size={14} /> Expanding Our Footprint
          </p>
          <h2 className="font-serif text-3xl font-semibold mt-2">
            Future Brew Bars Opening in 2025
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            Extending our calm sanctuaries to central hubs across Dhaka. Sign up
            for soft-launch tasting invitations.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <article className="bg-surface-container rounded-3xl p-6 md:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-tertiary">
                Flagship Espresso Lounge
              </p>
              <h3 className="font-serif text-2xl font-semibold mt-1">Gulshan 2 Brew Bar</h3>
              <p className="text-sm text-on-surface-variant mt-2">
                Road 50, Near Gulshan 2 Circle · Glasshouse atrium, cascading
                botanicals, and bespoke cold-drip towers.
              </p>
              <span className="inline-block mt-3 text-[11px] font-bold bg-tertiary-fixed text-on-tertiary-fixed rounded-full px-3 py-1">
                Autumn 2025
              </span>
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-outline-variant/30">
                <span className="text-xs font-semibold text-text-secondary">
                  Includes Rooftop Garden Pods
                </span>
                <Link href="/about" className="text-sm font-bold text-primary flex items-center gap-1">
                  Join VIP Waitlist <ArrowRight size={15} />
                </Link>
              </div>
            </article>
            <article className="bg-surface-container rounded-3xl p-6 md:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-tertiary">
                Artisan Express Kiosk
              </p>
              <h3 className="font-serif text-2xl font-semibold mt-1">Dhanmondi 27 Express</h3>
              <p className="text-sm text-on-surface-variant mt-2">
                Old 27 (Shatmasjid Road) · Quick pick-up bar, freshly roasted
                whole-bean station, and pour-over on-the-go.
              </p>
              <span className="inline-block mt-3 text-[11px] font-bold bg-surface-container-highest text-text-secondary rounded-full px-3 py-1">
                Late 2025
              </span>
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-outline-variant/30">
                <span className="text-xs font-semibold text-text-secondary">
                  Fast 2-minute Mobile Dispatch
                </span>
                <Link href="/about" className="text-sm font-bold text-primary flex items-center gap-1">
                  Notify on Opening <ArrowRight size={15} />
                </Link>
              </div>
            </article>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
