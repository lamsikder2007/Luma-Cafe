"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Minus } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import QuickQuestions from "./QuickQuestions";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
}

const GREETING =
  "👋 Hi! I'm Luma Café's AI assistant. How can I help you today?";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "greeting",
      role: "assistant",
      content: GREETING,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastUserMessageRef = useRef<string>("");

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

      try {
        // Build history from existing messages (exclude errors)
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
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Something went wrong");
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
          content: "Sorry, something went wrong. Please try again.",
          isError: true,
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  const handleRetry = useCallback(() => {
    // Remove the last error message and resend
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
      {/* Chat Window */}
      <div
        className={`chat-window ${isOpen ? "chat-window-open" : "chat-window-closed"}`}
        role="dialog"
        aria-label="Chat with Luma AI"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-header-avatar" aria-hidden="true">
              L
            </div>
            <div>
              <h2 className="chat-header-title">Luma AI</h2>
              <div className="chat-header-status">
                <span className="status-dot" aria-hidden="true"></span>
                <span className="text-xs">Online</span>
              </div>
            </div>
          </div>
          <div className="chat-header-actions">
            <button
              onClick={() => setIsOpen(false)}
              className="chat-header-button"
              aria-label="Minimize chat"
              title="Minimize"
            >
              <Minus size={16} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="chat-header-button"
              aria-label="Close chat"
              title="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
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

          {/* Quick Questions */}
          <QuickQuestions
            onSelect={handleQuickQuestion}
            visible={showQuickQuestions && !isLoading}
          />

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`chat-fab ${isOpen ? "chat-fab-hidden" : "chat-fab-visible"}`}
        aria-label={isOpen ? "Close chat" : "Chat with AI Assistant"}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <MessageCircle size={24} />
        )}
      </button>
    </>
  );
}
