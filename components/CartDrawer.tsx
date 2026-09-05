"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, totalPrice } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md bg-bg border-l border-border flex flex-col p-0 h-full">
        <SheetHeader className="p-6 border-b border-border bg-surface text-left">
          <SheetTitle className="font-serif text-2xl text-primary flex items-center gap-2">
            <ShoppingBag /> Your Order
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-text-tertiary">
              <ShoppingBag size={48} className="mb-4 opacity-20" />
              <p>Your cart is empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="mt-6 text-primary hover:text-accent font-medium underline underline-offset-4"
              >
                Continue browsing
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center bg-surface p-4 rounded-2xl border border-border">
                <div className="relative w-20 h-20 bg-bg rounded-xl overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-primary text-sm">{item.name}</h4>
                    <button 
                      onClick={() => updateQuantity(item.id, 0)}
                      className="text-text-tertiary hover:text-error transition-colors p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  <span className="text-text-secondary font-medium text-sm mb-3">
                    ${item.price.toFixed(2)}
                  </span>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full bg-bg border border-border flex items-center justify-center text-text-primary hover:border-primary transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-medium text-sm w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-primary text-surface flex items-center justify-center hover:bg-primary-light transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 bg-surface border-t border-border shrink-0">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-lg text-text-secondary">Total</span>
              <span className="font-serif text-2xl font-bold text-primary">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full py-4 bg-primary hover:bg-primary-light text-surface font-medium rounded-full transition-all shadow-md flex items-center justify-center gap-2"
            >
              Checkout <span>&rarr;</span>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
