import React from "react";
import Link from "next/link";
import MenuCard from "./MenuCard";

const favoriteItems = [
  {
    id: "velvet-cappuccino",
    name: "Cappuccino",
    description: "Rich espresso with velvety milk foam",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80",
  },
  {
    id: "iced-latte",
    name: "Iced Latte",
    description: "Chilled espresso with creamy milk",
    price: 4.75,
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80",
  },
  {
    id: "wild-berry-muffin",
    name: "Blueberry Muffin",
    description: "Freshly baked, full of flavor",
    price: 3.50,
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&q=80",
  },
  {
    id: "heirloom-avocado-toast",
    name: "Avocado Toast",
    description: "Simple. Fresh. Delicious.",
    price: 6.50,
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&q=80",
  },
];

export default function FavoritesSection() {
  return (
    <section id="menu" className="w-full py-20 px-6 md:px-12 bg-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-3">
              Our Favorites
            </h2>
            <p className="text-text-secondary text-lg">
              Handpicked for a brighter day.
            </p>
          </div>
          <Link href="/menu" className="text-primary hover:text-accent font-medium flex items-center gap-2 transition-colors">
            View Full Menu <span>&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {favoriteItems.map((item) => (
            <MenuCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
