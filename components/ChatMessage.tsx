"use client";

import { useEffect, useRef } from "react";
import { Coffee } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

export default function ChatMessage({
  role,
  content,
  isLoading,
  isError,
  onRetry,
}: ChatMessageProps) {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      // Small delay to allow initial render before animating
      setTimeout(() => {
        messageRef.current?.classList.remove("opacity-0", "translate-y-2");
        messageRef.current?.classList.add("opacity-100", "translate-y-0");
      }, 50);
    }
  }, []);

  const baseContainerClass = "flex items-start gap-3 transition-all duration-300 ease-out opacity-0 translate-y-2";

  // Loading indicator
  if (isLoading) {
    return (
      <div className={baseContainerClass} ref={messageRef}>
        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0" aria-hidden="true">
           <Coffee className="w-4 h-4 text-primary" />
        </div>
        <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tl-sm bg-surface/50 border border-border-light/20 backdrop-blur-sm">
          <div className="flex items-center gap-1.5 py-1" aria-label="AI is typing">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-[typing-bounce_1.4s_infinite_ease-in-out]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-[typing-bounce_1.4s_infinite_ease-in-out_0.2s]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-[typing-bounce_1.4s_infinite_ease-in-out_0.4s]"></span>
          </div>
        </div>
      </div>
    );
  }

  // Error message
  if (isError) {
    return (
      <div className={baseContainerClass} ref={messageRef}>
        <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0" aria-hidden="true">
           <Coffee className="w-4 h-4 text-red-400" />
        </div>
        <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tl-sm bg-red-500/5 border border-red-500/20 text-red-400 text-sm leading-relaxed backdrop-blur-sm">
          <p className="m-0">{content}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors"
              aria-label="Retry sending message"
            >
              ↻ Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  if (role === "assistant") {
    return (
      <div className={baseContainerClass} ref={messageRef}>
        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary font-serif font-bold text-sm shadow-[0_0_8px_rgba(212,163,115,0.15)]" aria-hidden="true">
          L
        </div>
        <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tl-sm bg-surface border border-border-light/20 text-text-primary text-sm leading-relaxed backdrop-blur-sm shadow-sm">
          <p className="m-0 font-light">{content}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${baseContainerClass} justify-end`}
      ref={messageRef}
    >
      <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tr-sm bg-gradient-to-br from-primary to-primary-dark text-bg text-sm leading-relaxed shadow-[0_4px_12px_rgba(212,163,115,0.2)]">
        <p className="m-0 font-medium">{content}</p>
      </div>
    </div>
  );
}
