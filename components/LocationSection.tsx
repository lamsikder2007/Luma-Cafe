"use client";

import React from "react";
import dynamic from "next/dynamic";
import { MapPin, Clock, Phone } from "lucide-react";

const LocationMap = dynamic(() => import("./LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full min-h-[400px] bg-surface-container flex items-center justify-center">
      <div className="text-text-tertiary font-medium flex flex-col items-center gap-2">
        <MapPin size={48} className="text-accent" />
        <p>Loading map…</p>
      </div>
    </div>
  ),
});

export default function LocationSection() {
  return (
    <section id="locations" className="w-full py-20 px-6 md:px-12 bg-bg border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-20">

        {/* Info */}
        <div className="w-full md:w-1/3 flex flex-col">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-8">
            Find Us
          </h2>

          <div className="bg-surface p-6 md:p-8 rounded-3xl border border-border shadow-sm flex flex-col gap-6">
            <h3 className="font-serif text-2xl font-bold text-primary">Dhaka <span className="text-accent">/ Mirpur 10</span></h3>

            <div className="flex items-start gap-4 text-text-secondary">
              <MapPin className="text-primary mt-1 shrink-0" size={20} />
              <p className="leading-relaxed">
                Plot 14, Avenue 5<br />
                Mirpur 10, Dhaka 1216
              </p>
            </div>

            <div className="flex items-start gap-4 text-text-secondary">
              <Clock className="text-primary mt-1 shrink-0" size={20} />
              <div className="flex flex-col">
                <span>Mon - Sun: 7:30 AM - 10:30 PM</span>
                <span className="text-sm text-text-tertiary">Kitchen closes 9:45 PM</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-text-secondary">
              <Phone className="text-primary shrink-0" size={20} />
              <span>+880 1712-345678</span>
            </div>

            <a
              href="https://maps.google.com/?q=Mirpur+10+Dhaka"
              target="_blank"
              rel="noreferrer"
              className="mt-4 w-full py-3.5 bg-primary hover:bg-primary-light text-surface font-medium rounded-full transition-all shadow-sm text-center"
            >
              Get Directions
            </a>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="w-full md:w-2/3 h-[400px] md:h-auto md:min-h-[480px] rounded-3xl overflow-hidden relative border border-border shadow-sm">
          <LocationMap className="h-full w-full min-h-[400px]" />
        </div>
      </div>
    </section>
  );
}
