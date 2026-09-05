import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.jpg"
          alt="Premium Latte"
          fill
          priority
          className="object-cover object-center scale-105 animate-slow-pan"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/80 via-primary-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start justify-center h-full text-text-inverse animate-fade-in-up">
        <p className="text-accent text-sm md:text-base font-semibold tracking-widest uppercase mb-4 opacity-90">
          Sip &middot; Relax &middot; Belong
        </p>
        
        <h1 className="font-serif text-[clamp(2.75rem,9vw,7rem)] font-bold leading-[1.04] tracking-tight mb-6 text-balance">
          GOOD COFFEE<br />
          <span className="text-surface">BRIGHTER DAYS</span>
        </h1>
        
        <p className="max-w-xl text-[clamp(1rem,2.6vw,1.25rem)] font-light leading-relaxed mb-10 text-surface/90">
          At Luma Café, every cup is crafted to bring people closer. Great coffee, good vibes, always.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/order" className="px-8 py-4 bg-accent hover:bg-accent/90 text-primary-dark font-medium rounded-full transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2">
            Order Now <span>&rarr;</span>
          </Link>
          <Link href="/locations" className="px-8 py-4 bg-surface/10 hover:bg-surface/20 text-surface border border-surface/30 backdrop-blur-md font-medium rounded-full transition-all hover:scale-105 flex items-center justify-center">
            Find a Location
          </Link>
        </div>
      </div>
    </section>
  );
}
