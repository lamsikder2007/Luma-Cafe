"use client";

import { MessageCircle } from "lucide-react";

export default function HeroCTA() {
  return (
    <button
      className="hero-cta"
      onClick={() => {
        const fab = document.querySelector(".chat-fab") as HTMLButtonElement;
        if (fab) fab.click();
      }}
      id="hero-cta-button"
    >
      <MessageCircle size={18} />
      Chat with AI Assistant
    </button>
  );
}
