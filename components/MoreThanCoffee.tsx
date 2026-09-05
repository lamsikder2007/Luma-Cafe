import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function MoreThanCoffee() {
  return (
    <section id="about" className="w-full py-20 px-6 md:px-12 bg-surface">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Editorial Image */}
        <div className="w-full lg:w-1/2 relative">
          <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1600&q=80"
              alt="Cozy Cafe Interior"
              fill
              className="object-cover"
            />
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl -z-10" />
          <div className="absolute -top-6 -left-6 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -z-10" />
        </div>

        {/* Content */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
            More Than Coffee
          </h2>
          
          <div className="flex flex-col gap-6 text-text-secondary text-lg leading-relaxed font-light">
            <p>
              Luma Café isn’t just a place to grab your morning cup—it’s a destination to relax, connect, work, and enjoy quality moments.
            </p>
            <p>
              We believe in the power of a warm environment, carefully sourced beans, and the kind of hospitality that makes you feel instantly at home. Every detail, from the playlist to the pastry selection, is designed for your comfort.
            </p>
          </div>

          <Link href="/about" className="mt-10 px-8 py-3.5 border border-primary text-primary hover:bg-primary hover:text-surface font-medium rounded-full transition-all w-fit flex items-center gap-2">
            Read Our Story <span>&rarr;</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
