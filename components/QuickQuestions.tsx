"use client";

import { Clock, UtensilsCrossed, Truck, MapPin } from "lucide-react";

interface QuickQuestionsProps {
  onSelect: (question: string) => void;
  visible: boolean;
}

const questions = [
  {
    label: "Opening Hours",
    question: "What are your opening hours?",
    icon: Clock,
  },
  {
    label: "Menu",
    question: "What are your popular menu items?",
    icon: UtensilsCrossed,
  },
  {
    label: "Delivery",
    question: "Do you offer delivery?",
    icon: Truck,
  },
  {
    label: "Location",
    question: "Where are you located?",
    icon: MapPin,
  },
];

export default function QuickQuestions({
  onSelect,
  visible,
}: QuickQuestionsProps) {
  if (!visible) return null;

  return (
    <div className="quick-questions" aria-label="Quick questions">
      {questions.map((q) => {
        const Icon = q.icon;
        return (
          <button
            key={q.label}
            onClick={() => onSelect(q.question)}
            className="quick-question-button"
            aria-label={`Ask about ${q.label}`}
          >
            <Icon size={14} />
            <span>{q.label}</span>
          </button>
        );
      })}
    </div>
  );
}
