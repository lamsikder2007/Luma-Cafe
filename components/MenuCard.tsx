"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Plus } from "lucide-react";
import { useCart, CartItem } from "@/lib/CartContext";

interface MenuCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function MenuCard({ id, name, description, price, image }: MenuCardProps) {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAdd = () => {
    addToCart({ id, name, price, image });
  };

  return (
    <div className="group flex flex-col bg-surface rounded-3xl overflow-hidden border border-border transition-all duration-300 hover:shadow-lg hover:border-border-light hover:-translate-y-1 relative">
      {/* Favorite Button */}
      <button 
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-4 right-4 z-10 w-8 h-8 bg-surface/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary transition-transform hover:scale-110 shadow-sm"
        aria-label="Toggle favorite"
      >
        <Heart size={16} className={isFavorite ? "fill-primary" : ""} />
      </button>

      {/* Image */}
      <div className="relative w-full aspect-square bg-bg overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-serif text-lg font-bold text-primary mb-1">{name}</h3>
          <p className="text-text-secondary text-sm line-clamp-2">{description}</p>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <span className="font-bold text-lg text-primary">${price.toFixed(2)}</span>
          <button 
            onClick={handleAdd}
            className="w-10 h-10 bg-primary hover:bg-primary-light text-surface rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-sm hover:shadow-md"
            aria-label="Add to cart"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
