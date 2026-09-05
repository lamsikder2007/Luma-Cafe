import type { Metadata } from "next";
import OrderClient from "./OrderClient";

export const metadata: Metadata = {
  title: "Order Online — Luma Café",
  description:
    "Order ahead for pickup at Mirpur 10 Flagship or courier delivery. Customize milk, sweetness, and size.",
};

export default function OrderPage() {
  return <OrderClient />;
}
