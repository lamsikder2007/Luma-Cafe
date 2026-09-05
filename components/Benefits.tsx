import React from "react";
import { Coffee, Users, Leaf, Gift } from "lucide-react";

const benefits = [
  {
    title: "Premium Coffee",
    description: "Carefully sourced",
    icon: Coffee,
  },
  {
    title: "A Warm Community",
    description: "People over coffee",
    icon: Users,
  },
  {
    title: "Sustainable Choices",
    description: "A greener tomorrow",
    icon: Leaf,
  },
  {
    title: "Loyalty Rewards",
    description: "Good coffee pays off",
    icon: Gift,
  },
];

export default function Benefits() {
  return (
    <section className="w-full bg-surface py-16 px-6 md:px-12 border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={idx} 
                className="flex flex-col items-center text-center group p-6 rounded-2xl transition-all duration-300 hover:bg-bg hover:shadow-sm"
              >
                <div className="w-14 h-14 rounded-full bg-bg border border-border flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-accent/10 group-hover:border-accent/30 group-hover:text-accent transition-all duration-300">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl font-bold text-primary mb-2">
                  {benefit.title}
                </h3>
                <p className="text-text-secondary text-sm font-medium">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
