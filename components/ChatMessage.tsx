"use client";

import { useEffect, useRef } from "react";

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
      messageRef.current.classList.add("animate-message-in");
    }
  }, []);

  // Loading indicator
  if (isLoading) {
    return (
      <div className="flex items-start gap-3 animate-message-in">
        <div className="chat-avatar" aria-hidden="true">
          L
        </div>
        <div className="chat-bubble chat-bubble-ai">
          <div className="typing-indicator" aria-label="AI is typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  }

  // Error message
  if (isError) {
    return (
      <div className="flex items-start gap-3 animate-message-in" ref={messageRef}>
        <div className="chat-avatar" aria-hidden="true">
          L
        </div>
        <div className="chat-bubble chat-bubble-error">
          <p>{content}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="retry-button"
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
      <div className="flex items-start gap-3 animate-message-in" ref={messageRef}>
        <div className="chat-avatar" aria-hidden="true">
          L
        </div>
        <div className="chat-bubble chat-bubble-ai">
          <p>{content}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-start gap-3 justify-end animate-message-in"
      ref={messageRef}
    >
      <div className="chat-bubble chat-bubble-user">
        <p>{content}</p>
      </div>
    </div>
  );
}
