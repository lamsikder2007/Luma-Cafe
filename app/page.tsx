import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import FavoritesSection from "@/components/FavoritesSection";
import RewardsBanner from "@/components/RewardsBanner";
import MoreThanCoffee from "@/components/MoreThanCoffee";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-bg">
      <Navbar />
      <Hero />
      <Benefits />
      <FavoritesSection />
      <RewardsBanner />
      <MoreThanCoffee />
      <LocationSection />
      <Footer />
    </main>
  );
}
