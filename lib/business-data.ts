export const businessData = {
  name: "Luma Café",
  tagline: "Your everyday café, made simple.",
  description: "Fresh coffee, great food, and friendly service.",

  location: {
    address: "123 Market Street, Austin, Texas",
  },

  hours: {
    weekday: {
      days: "Monday–Friday",
      open: "8:00 AM",
      close: "9:00 PM",
    },
    weekend: {
      days: "Saturday–Sunday",
      open: "9:00 AM",
      close: "10:00 PM",
    },
  },

  services: ["Dine-in", "Takeaway", "Local delivery"],

  popularItems: [
    { name: "Cappuccino", category: "Coffee" },
    { name: "Latte", category: "Coffee" },
    { name: "Iced Coffee", category: "Coffee" },
    { name: "Chicken Sandwich", category: "Food" },
    { name: "Veggie Sandwich", category: "Food" },
    { name: "Chocolate Cake", category: "Dessert" },
  ],

  delivery: {
    available: true,
    radius: "5 miles",
    description: "Local delivery is available within 5 miles.",
  },

  contact: {
    phone: "(555) 123-4567",
    email: "hello@lumacafe.demo",
  },
} as const;

export type BusinessData = typeof businessData;
