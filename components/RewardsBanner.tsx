import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function RewardsBanner() {
  return (
    <section id="rewards" className="w-full py-12 px-6 md:px-12 bg-bg">
      <div className="max-w-7xl mx-auto relative rounded-[2rem] overflow-hidden flex flex-col md:flex-row items-center bg-secondary min-h-[300px]">
        {/* Background Image Setup */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/rewards.jpg"
            alt="Coffee Beans and Olive Leaves"
            fill
            className="object-cover opacity-40 mix-blend-multiply"
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 w-full md:w-1/2 p-8 sm:p-10 md:p-16 text-text-inverse">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Join Luma Rewards
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 opacity-90 max-w-md">
            Collect points, get free drinks and special offers!
          </p>
          <Link href="/rewards" className="px-8 py-3.5 bg-accent hover:bg-accent/90 text-primary-dark font-semibold rounded-full transition-all hover:scale-105 shadow-md flex items-center gap-2 inline-flex">
            Join Now <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
