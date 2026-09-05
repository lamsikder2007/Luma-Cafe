import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/lib/CartContext";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Luma Café — Good Coffee · Brighter Days",
  description:
    "Single-origin micro-lot coffee, slow-fermented patisserie, and warm biophilic spaces in Dhaka. Order ahead, reserve a table, or ask Luma AI.",
  keywords: ["café", "coffee", "Dhaka", "specialty coffee", "AI concierge"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable}`}>
      <body>
        <CartProvider>
          {children}
          <ChatWidget />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
