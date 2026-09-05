"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { SendHorizontal } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="flex items-end gap-2 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] md:pb-4 bg-gradient-to-b from-surface/50 to-bg border-t border-border-light/10 shrink-0">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        placeholder="Type your message…"
        disabled={disabled}
        rows={1}
        className="flex-1 resize-none bg-surface/80 border border-border-light/20 rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all disabled:opacity-60 disabled:cursor-not-allowed max-h-[120px] overflow-y-auto custom-scrollbar shadow-inner backdrop-blur-md"
        aria-label="Type your message"
      />
      <button
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        className="flex items-center justify-center w-11 h-11 shrink-0 rounded-xl bg-primary text-bg border-none cursor-pointer transition-all duration-200 hover:bg-primary-light hover:scale-105 hover:shadow-[0_4px_12px_rgba(212,163,115,0.3)] disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-none disabled:cursor-not-allowed"
        aria-label="Send message"
      >
        <SendHorizontal size={18} strokeWidth={2.5} className={(!disabled && value.trim()) ? "translate-x-0.5" : ""} />
      </button>
    </div>
  );
}
