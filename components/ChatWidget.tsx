"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, Minus } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import QuickQuestions from "./QuickQuestions";
import { useCart } from "@/lib/CartContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
}

type CartAction =
  | { type: "add_to_cart"; id: string; name: string; price: number; image: string; quantity: number }
  | { type: "remove_from_cart"; id: string }
  | { type: "update_cart_quantity"; id: string; quantity: number }
  | { type: "apply_offer"; code: string }
  | { type: "navigate"; href: string };

const GREETING =
  "👋 Good evening. I'm Luma's AI Concierge. How may I assist you today?";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm Luma AI ☕\nYour friendly café assistant.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastUserMessageRef = useRef<string>("");
  const router = useRouter();
  const { items: cartItems, addToCart, removeFromCart, updateQuantity } = useCart();

  // Prevent background page scroll while the mobile chat panel is expanded.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => {
      document.body.style.overflow = isOpen && mq.matches ? "hidden" : "";
    };
    apply();
    mq.addEventListener("change", apply);
    return () => {
      document.body.style.overflow = "";
      mq.removeEventListener("change", apply);
    };
  }, [isOpen]);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const sendMessage = useCallback(
    async (text: string) => {
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text,
      };

      lastUserMessageRef.current = text;
      setShowQuickQuestions(false);
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      let friendlyError: string | null = null;
      try {
        const history = messages
          .filter((m) => !m.isError && m.id !== "greeting")
          .map((m) => ({
            role: m.role,
            content: m.content,
          }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            history,
            cart: cartItems.map((i) => ({
              id: i.id,
              name: i.name,
              price: i.price,
              quantity: i.quantity,
            })),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          friendlyError =
            typeof data.error === "string" && data.error.length > 0
              ? data.error
              : "Something went wrong";
          throw new Error(friendlyError ?? "Something went wrong");
        }

        // Apply actions returned by AI tools (validated live server-side).
        const actions: CartAction[] = Array.isArray(data.actions)
          ? data.actions
          : [];
        for (const action of actions) {
          if (!action || typeof action.type !== "string") continue;
          if (
            action.type === "add_to_cart" &&
            typeof action.id === "string" &&
            typeof action.name === "string" &&
            typeof action.price === "number" &&
            typeof action.image === "string"
          ) {
            const qty = Math.max(
              1,
              Math.min(12, Math.floor(action.quantity) || 1)
            );
            for (let n = 0; n < qty; n++) {
              addToCart({
                id: action.id,
                name: action.name,
                price: action.price,
                image: action.image,
              });
            }
          } else if (action.type === "remove_from_cart" && typeof action.id === "string") {
            removeFromCart(action.id);
          } else if (
            action.type === "update_cart_quantity" &&
            typeof action.id === "string" &&
            typeof action.quantity === "number"
          ) {
            updateQuantity(action.id, Math.max(1, Math.min(12, Math.floor(action.quantity))));
          } else if (action.type === "apply_offer" && typeof action.code === "string") {
            try {
              localStorage.setItem("luma_offer", action.code);
            } catch {
              /* storage unavailable — code still confirmed in chat */
            }
          } else if (action.type === "navigate" && typeof action.href === "string") {
            router.push(action.href);
          }
        }

        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: data.reply,
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch {
        const errorMessage: Message = {
          id: `error-${Date.now()}`,
          role: "assistant",
          content:
            friendlyError ??
            "I apologize, but I encountered an error. Please try again.",
          isError: true,
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, cartItems, addToCart, removeFromCart, updateQuantity, router]
  );

  const handleRetry = useCallback(() => {
    setMessages((prev) => prev.filter((m) => !m.isError));
    if (lastUserMessageRef.current) {
      sendMessage(lastUserMessageRef.current);
    }
  }, [sendMessage]);

  const handleQuickQuestion = useCallback(
    (question: string) => {
      sendMessage(question);
    },
    [sendMessage]
  );

  return (
    <>
      {/* Chat Window — mobile: 100vw-24px × 70vh · tablet: 340×500 · desktop: 360×520 */}
      <div
        className={`fixed z-50 flex flex-col overflow-hidden bg-surface/80 backdrop-blur-xl border border-border-light/20 shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] left-3 right-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] h-[70vh] max-h-[620px] rounded-3xl md:left-auto md:right-6 md:bottom-24 md:w-[340px] md:h-[500px] md:max-h-[calc(100dvh-7rem)] md:rounded-2xl lg:w-[360px] lg:h-[520px] ${
          isOpen ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
        role="dialog"
        aria-label="Chat with Luma AI"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-bg to-surface border-b border-border-light/10 shrink-0">
          <div className="flex items-center gap-4">
              <Image
                src="/luma-ai.svg"
                alt="Luma AI"
                width={44}
                height={44}
                className="rounded-full shadow-inner"
              />
              <div>
                <h3 className="font-serif text-lg font-bold m-0 leading-tight">
                  Luma AI
                </h3>
                <div className="flex items-center gap-1.5 opacity-90 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#34D399] animate-[pulse-dot_2s_infinite]"></span>
                  <span className="text-xs font-medium tracking-wide">
                    Your Café Assistant
                  </span>
                </div>
              </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Minimize chat"
              title="Minimize"
            >
              <Minus size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 scroll-smooth custom-scrollbar">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              role={msg.role}
              content={msg.content}
              isError={msg.isError}
              onRetry={msg.isError ? handleRetry : undefined}
            />
          ))}
          {isLoading && <ChatMessage role="assistant" content="" isLoading />}

          <QuickQuestions
            onSelect={handleQuickQuestion}
            visible={showQuickQuestions && !isLoading}
          />

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>

      {/* Floating Button — mobile: 60×60 @ right:16 bottom:80 · always on top */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed right-4 bottom-[calc(80px+env(safe-area-inset-bottom))] md:right-6 md:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] h-[60px] w-[60px] md:h-16 md:w-16 rounded-full border-none overflow-hidden bg-primary-container text-on-primary flex items-center justify-center cursor-pointer shadow-[0_8px_32px_rgba(44,29,17,0.45)] z-[9999] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 ${
          isOpen ? "opacity-0 scale-75 pointer-events-none" : "opacity-100 scale-100"
        }`}
        aria-label="Open Luma AI"
      >
        <Image
          src="/luma-ai.svg"
          alt=""
          width={64}
          height={64}
          className="h-full w-full object-cover"
        />
      </button>
    </>
  );
}
