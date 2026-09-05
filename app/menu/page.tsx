import type { Metadata } from "next";
import MenuClient from "./MenuClient";

export const metadata: Metadata = {
  title: "Artisan Menu — Luma Café",
  description:
    "Handcrafted brews, single-origin pour-overs, and slow-fermented bakes. Filter by roast, category, and dietary needs.",
};

export default function MenuPage() {
  return <MenuClient />;
}
