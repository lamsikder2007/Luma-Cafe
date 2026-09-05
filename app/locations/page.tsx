import type { Metadata } from "next";
import LocationsClient from "./LocationsClient";

export const metadata: Metadata = {
  title: "Roasteries & Reservations — Luma Café",
  description:
    "Find your space to pause. Live atmosphere at Mirpur 10 Flagship, table reservations, cuppings, and upcoming brew bars.",
};

export default function LocationsPage() {
  return <LocationsClient />;
}
