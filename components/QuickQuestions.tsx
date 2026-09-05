"use client";

import { UtensilsCrossed, Tag, MapPin, ShoppingBag } from "lucide-react";

interface QuickQuestionsProps {
  onSelect: (question: string) => void;
  visible: boolean;
}

const questions = [
  {
    label: "Show me the menu",
    question: "Show me the menu",
    icon: UtensilsCrossed,
  },
  {
    label: "Today's offers",
    question: "What are today's offers?",
    icon: Tag,
  },
  {
    label: "Nearest location",
    question: "Where is the nearest location?",
    icon: MapPin,
  },
  {
    label: "I want to order",
    question: "I want to order",
    icon: ShoppingBag,
  },
];

export default function QuickQuestions({
  onSelect,
  visible,
}: QuickQuestionsProps) {
  if (!visible) return null;

  return (
    <div className="flex flex-wrap gap-2 pt-2 animate-fade-in-up" aria-label="Quick questions">
      {questions.map((q) => {
        const Icon = q.icon;
        return (
          <button
            key={q.label}
            onClick={() => onSelect(q.question)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface/50 border border-border-light/30 rounded-full text-xs font-medium text-text-secondary hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-0.5"
            aria-label={`Ask: ${q.label}`}
          >
            <Icon size={12} />
            <span>{q.label}</span>
          </button>
        );
      })}
    </div>
  );
}
