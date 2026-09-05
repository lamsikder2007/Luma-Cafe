/**
 * Luma Café — Single Source of Truth.
 *
 * Website pages (/menu, /order), the public data APIs (/api/menu, /api/offers,
 * /api/store, /api/rewards) and the Luma AI tool layer ALL read from this
 * module. Update data here once and the site and the assistant update together —
 * nothing is hardcoded inside the chatbot prompt.
 */

export type MenuCategory =
  | "hot"
  | "cold"
  | "pourover"
  | "bakery"
  | "brunch"
  | "seasonal";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategory;
  badges: string[];
  tags: string[];
  meta: string;
  ingredients: string[];
  allergens: string[];
  options: {
    milk: string[];
    sizes: string[];
    sweetness: string;
  };
  /** Alternate names guests use (e.g. home-page short names). */
  aliases: string[];
  /** Live availability flag — the only thing check_availability() reports. */
  available: boolean;
  availableNote: string;
}

export const STORE = {
  name: "Luma Café",
  tagline: "Good Coffee · Brighter Days",
  address: "Plot 14, Avenue 5, Mirpur 10, Dhaka 1216",
  transit: "Dhaka Metro Rail MRT Line 6, Mirpur 10 Station, Exit Gate 2",
  phone: "+880 1712-345678",
  email: "hello@lumacafe.co",
  hours: {
    days: "Monday–Sunday",
    open: "7:30 AM",
    close: "10:30 PM",
    note: "Kitchen closes 9:45 PM.",
  },
} as const;

export const OFFERS = [
  {
    code: "LUMAFIRST",
    title: "10% off your first order",
    detail:
      "Apply code LUMAFIRST at checkout for 10% off your first order-ahead purchase.",
  },
  {
    code: "DOUBLE-BEAN-TUESDAY",
    title: "Double Bean Tuesdays",
    detail: "Earn 2x beans on all single-origin pour-overs every Tuesday.",
  },
] as const;

export const REWARDS = {
  program: "Luma Circle",
  earnRate: "Earn about 10 beans per $1 spent, credited automatically.",
  tiers: [
    "Silver Origin (0–499 beans)",
    "Gold Brewmaster (500–1,499 beans)",
    "Diamond Connoisseur (1,500+ beans)",
  ],
  redemptions: [
    "250 beans — artisan milk or botanical syrup",
    "400 beans — handcrafted espresso cup",
    "650 beans — morning pastry & brew pairing",
    "1,200 beans — small-batch reserve bag (250g)",
  ],
} as const;

export const ORDERING = {
  pickup: "Pickup at Mirpur 10 Flagship, ready in 12–15 minutes.",
  delivery:
    "Courier delivery in about 30 minutes across Mirpur DOHS and nearby areas.",
  ecoFee: 0.5,
  taxRate: 0.052,
} as const;

const DRINK_OPTIONS = {
  milk: ["Whole Organic", "Oat Barista +$0.65", "Almond Milk +$0.65", "Skim Milk"],
  sizes: ["12oz", "16oz"],
  sweetness: "0%, 25%, 50%, 75% or 100%",
};

const FOOD_OPTIONS = {
  milk: [],
  sizes: ["Regular"],
  sweetness: "N/A",
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "velvet-cappuccino",
    name: "Velvet Cappuccino",
    description:
      "Double ristretto espresso folded with micro-textured whole milk, dense velvet crema, and a light dusting of cacao.",
    price: 4.5,
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80",
    category: "hot",
    badges: ["House Staple", "Direct Trade"],
    tags: ["Dark Chocolate", "Roasted Hazelnut", "Brown Sugar"],
    meta: "Colombia Huila · 130 kcal",
    ingredients: ["Double ristretto espresso", "Whole milk", "Cacao dust"],
    allergens: ["Dairy"],
    options: DRINK_OPTIONS,
    available: true,
    availableNote: "Available now at the espresso bar.",
    aliases: ["Cappuccino"],
  },
  {
    id: "iced-caramel-shakerato",
    name: "Iced Caramel Shakerato",
    description:
      "Chilled double espresso aerated over hand-cut ice with house-made salted caramel and raw Madagascar vanilla.",
    price: 5.25,
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80",
    category: "cold",
    badges: ["Seasonal Best"],
    tags: ["Smoked Sea Salt", "Bourbon Vanilla", "Toffee"],
    meta: "Guatemala Antigua · 180 kcal",
    ingredients: [
      "Double espresso",
      "House salted caramel",
      "Madagascar vanilla",
      "Milk",
      "Hand-cut ice",
    ],
    allergens: ["Dairy"],
    options: DRINK_OPTIONS,
    available: true,
    availableNote: "Available now at the espresso bar.",
    aliases: ["Iced Caramel Latte", "Caramel Latte"],
  },
  {
    id: "iced-latte",
    name: "Iced Latte",
    description:
      "Chilled double espresso poured over creamy whole milk and crystal-clear craft ice.",
    price: 4.75,
    image:
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80",
    category: "cold",
    badges: ["Seasonal"],
    tags: ["Smooth", "Creamy", "Cold Milk"],
    meta: "Double Espresso · 150 kcal",
    ingredients: ["Double espresso", "Whole milk", "Craft ice"],
    allergens: ["Dairy"],
    options: DRINK_OPTIONS,
    available: true,
    availableNote: "Available now, poured over fresh ice.",
    aliases: [],
  },
  {
    id: "wild-berry-muffin",
    name: "Wild Berry Crumble Muffin",
    description:
      "Tender sour-cream crumb loaded with tart mountain blueberries, cinnamon oat streusel and lemon zest.",
    price: 3.5,
    image:
      "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&q=80",
    category: "bakery",
    badges: ["Baked Fresh Today"],
    tags: ["Cinnamon Crisp", "Organic Berries", "Vegetarian"],
    meta: "Farmhouse Hearth · 320 kcal",
    ingredients: [
      "Mountain blueberries",
      "Sour cream",
      "Flour",
      "Cinnamon oat streusel",
      "Lemon zest",
      "Butter",
      "Eggs",
    ],
    allergens: ["Gluten", "Dairy", "Eggs"],
    options: FOOD_OPTIONS,
    available: true,
    availableNote: "Baked fresh this morning, while trays last.",
    aliases: ["Blueberry Muffin"],
  },
  {
    id: "heirloom-avocado-toast",
    name: "Heirloom Avocado Toast",
    description:
      "Mashed Hass avocado over thick seeded sourdough, watermelon radish, pea shoots, olive oil and Aleppo chili.",
    price: 6.5,
    image:
      "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&q=80",
    category: "brunch",
    badges: ["Chef Special", "Vegan Option"],
    tags: ["Plant-Based", "Slow Ferment"],
    meta: "36h Country Levain · 380 kcal",
    ingredients: [
      "Seeded sourdough",
      "Hass avocado",
      "Watermelon radish",
      "Pea shoots",
      "Cold-pressed olive oil",
      "Aleppo chili",
    ],
    allergens: ["Gluten"],
    options: FOOD_OPTIONS,
    available: true,
    availableNote: "Available from the warm kitchen.",
    aliases: ["Avocado Toast"],
  },
  {
    id: "silken-flat-white",
    name: "Silken Flat White",
    description:
      "Origin-focused double shot with ultra-thin wet foam — sweet toasted almond, mild citrus, velvety texture.",
    price: 4.75,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
    category: "hot",
    badges: ["Barista Favorite"],
    tags: ["Costa Rica Tarrazú", "Sweet Cream"],
    meta: "6 oz Standard · 115 kcal",
    ingredients: ["Double espresso", "Whole milk"],
    allergens: ["Dairy"],
    options: DRINK_OPTIONS,
    available: true,
    availableNote: "Available now at the espresso bar.",
    aliases: ["Flat White"],
  },
  {
    id: "kyoto-slow-drip",
    name: "Kyoto Slow Drip",
    description:
      "Drop-by-drop extraction with chilled mountain water. Wine-like body, zero astringency, natural cocoa sweetness.",
    price: 5.5,
    image:
      "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&q=80",
    category: "cold",
    badges: ["18hr Extraction"],
    tags: ["Black Cherry", "Cacao Nibs"],
    meta: "Batch limited daily · 5 kcal",
    ingredients: ["Single-origin coffee", "Chilled mountain water", "Ice sphere"],
    allergens: [],
    options: { milk: [], sizes: ["Regular"], sweetness: "Unsweetened" },
    available: false,
    availableNote:
      "Today's slow-drip batch is poured out — back tomorrow at 8:00 AM.",
    aliases: ["Cold Drip", "Cold Brew"],
  },
  {
    id: "spanish-dolce-latte",
    name: "Spanish Dolce Latte",
    description:
      "Slow-cooked organic milk infusion with house dark roast espresso and a Ceylon cinnamon quill.",
    price: 5.0,
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80",
    category: "seasonal",
    badges: ["Signature Sweet"],
    tags: ["Dulce de Leche", "Ceylon Cinnamon"],
    meta: "Hot or Over Ice · 210 kcal",
    ingredients: [
      "Dark roast espresso",
      "Slow-cooked organic milk",
      "Dulce de leche",
      "Ceylon cinnamon",
    ],
    allergens: ["Dairy"],
    options: DRINK_OPTIONS,
    available: true,
    availableNote: "Available hot or over ice.",
    aliases: ["Dolce Latte"],
  },
  {
    id: "almond-croissant",
    name: "Almond Frangipane Croissant",
    description:
      "Laminated French butter pastry with rich almond cream, orange blossom syrup and sliced almonds.",
    price: 4.25,
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",
    category: "bakery",
    badges: ["Double Baked"],
    tags: ["Toasted Almond", "Normandy Butter"],
    meta: "Contains Almonds, Gluten · 410 kcal",
    ingredients: [
      "French butter pastry",
      "Almond cream",
      "Orange blossom syrup",
      "Sliced almonds",
    ],
    allergens: ["Gluten", "Dairy", "Tree Nuts (Almond)", "Eggs"],
    options: FOOD_OPTIONS,
    available: true,
    availableNote: "Baked fresh at 7:00 AM, while trays last.",
    aliases: ["Croissant"],
  },
  {
    id: "truffle-brioche",
    name: "Truffle Scramble Brioche",
    description:
      "Pasture-raised eggs folded with cultured butter, black winter truffle, parmigiano and organic chives.",
    price: 7.5,
    image:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80",
    category: "brunch",
    badges: ["Warm Kitchen"],
    tags: ["Black Truffle", "House Brioche"],
    meta: "Made to order · 440 kcal",
    ingredients: [
      "Pasture-raised eggs",
      "Cultured butter",
      "Black winter truffle",
      "Parmigiano reggiano",
      "House brioche",
      "Chives",
    ],
    allergens: ["Gluten", "Dairy", "Eggs"],
    options: FOOD_OPTIONS,
    available: true,
    availableNote: "Made to order, 8–10 minutes.",
    aliases: ["Truffle Eggs", "Scramble"],
  },
  {
    id: "yirgacheffe-pourover",
    name: "Yirgacheffe Pour-Over",
    description:
      "Luminous washed Ethiopia with wild jasmine, bergamot rind and white peach nectar. Roasted in 4kg micro-batches.",
    price: 5.25,
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
    category: "pourover",
    badges: ["Roaster's Reserve", "Lot #42"],
    tags: ["Jasmine", "Bergamot", "White Peach"],
    meta: "2,150 MASL · Washed Process",
    ingredients: ["Ethiopia Yirgacheffe & Panama Geisha blend", "Filtered water"],
    allergens: [],
    options: { milk: [], sizes: ["Regular"], sweetness: "Unsweetened" },
    available: true,
    availableNote: "Brewing now at the slow bar.",
    aliases: ["Pour Over", "Geisha"],
  },
  {
    id: "uji-matcha",
    name: "Ceremonial Uji Matcha",
    description:
      "First-harvest stone-ground green tea from Kyoto, whisked to order over an oat base.",
    price: 5.5,
    image:
      "https://images.unsplash.com/photo-1536013455962-2b9d4a0e0a2e?w=800&q=80",
    category: "cold",
    badges: ["Kyoto Direct"],
    tags: ["Stone-Ground", "Oat Base"],
    meta: "Ceremonial Grade · Low Caffeine",
    ingredients: ["Ceremonial matcha", "Oat milk", "Filtered water"],
    allergens: ["Oats (cross-contact with gluten)"],
    options: { milk: ["Oat Barista", "Whole Organic", "Almond Milk"], sizes: ["12oz", "16oz"], sweetness: "0%, 25%, 50%, 75% or 100%" },
    available: true,
    availableNote: "Whisked to order.",
    aliases: ["Matcha", "Matcha Latte"],
  },
  {
    id: "solstice-beans",
    name: "Solstice Seasonal Espresso Blend",
    description:
      "Guatemala Huehuetenango + Ethiopia Sidama natural. Sweet praline, dried fig and rich cocoa butter. 250g whole bean.",
    price: 16.5,
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80",
    category: "seasonal",
    badges: ["Direct Trade", "250g Whole Bean"],
    tags: ["Praline", "Dried Fig", "Cocoa Butter"],
    meta: "Roasted Wednesdays",
    ingredients: ["Whole coffee beans (Guatemala + Ethiopia)"],
    allergens: [],
    options: { milk: [], sizes: ["250g Whole Bean", "250g Ground"], sweetness: "N/A" },
    available: true,
    availableNote: "Fresh roast available at the bean station.",
    aliases: ["Coffee Beans", "Bean Bag"],
  },
];

export const CATEGORIES: { id: MenuCategory | "all"; label: string }[] = [
  { id: "all", label: "All Offerings" },
  { id: "hot", label: "Espresso & Hot Brews" },
  { id: "cold", label: "Cold Brew & Iced" },
  { id: "pourover", label: "Handcrafted Pour Over" },
  { id: "bakery", label: "House Patisserie" },
  { id: "brunch", label: "Savory Brunch" },
  { id: "seasonal", label: "Signature Seasonal" },
];

/* ─── Live query helpers (used by pages, APIs and AI tools alike) ─── */

export interface MenuSearch {
  query?: string;
  category?: string;
  maxPrice?: number;
  tag?: string;
  /** default false — paused items are hidden unless explicitly requested */
  includeUnavailable?: boolean;
}

export function searchMenu(filters: MenuSearch = {}): MenuItem[] {
  const q = (filters.query ?? "").trim().toLowerCase();
  return MENU_ITEMS.filter((item) => {
    if (!item.available && !filters.includeUnavailable) return false;
    if (filters.category && filters.category !== "all" && item.category !== filters.category)
      return false;
    if (filters.maxPrice !== undefined && item.price > filters.maxPrice) return false;
    if (
      filters.tag &&
      !`${item.tags.join(" ")} ${item.badges.join(" ")}`.toLowerCase().includes(filters.tag.toLowerCase())
    )
      return false;
    if (
      q &&
      !`${item.name} ${item.description} ${item.tags.join(" ")} ${item.category}`
        .toLowerCase()
        .includes(q)
    )
      return false;
    return true;
  });
}

/** Items currently paused (for availability questions). */
export function pausedItems(): MenuItem[] {
  return MENU_ITEMS.filter((i) => !i.available);
}

/* ─── Branches (live location data for pages, APIs and AI tools) ─── */

export interface Branch {
  id: string;
  name: string;
  kind: "flagship" | "upcoming";
  status: string;
  address: string;
  hours: { days: string; open: string; close: string; note: string };
  phone: string;
  transit: string;
  services: string[];
}

export const BRANCHES: Branch[] = [
  {
    id: "mirpur-10",
    name: "Mirpur 10 Flagship Roastery",
    kind: "flagship",
    status: "Open now",
    address: "Plot 14, Avenue 5, Mirpur 10, Dhaka 1216",
    hours: {
      days: "Monday–Sunday",
      open: "7:30 AM",
      close: "10:30 PM",
      note: "Kitchen closes 9:45 PM.",
    },
    phone: "+880 1712-345678",
    transit: "MRT Line 6, Mirpur 10 Station, Exit Gate 2 (4-minute shaded walk, by Metro Pillar 248)",
    services: [
      "Dine-in",
      "Order-ahead pickup (12–15 min)",
      "Courier delivery (~30 min)",
      "Table reservations",
      "300 Mbps dedicated fiber",
      "USB-C work pods",
      "Pet-friendly garden patio",
      "Live roastery mezzanine",
      "SCA cupping lab",
      "Step-free access",
      "Complimentary valet & parking with EV charging",
    ],
  },
  {
    id: "gulshan-2",
    name: "Gulshan 2 Brew Bar",
    kind: "upcoming",
    status: "Opening Autumn 2025",
    address: "Road 50, Near Gulshan 2 Circle, Dhaka",
    hours: { days: "TBA", open: "TBA", close: "TBA", note: "Join the VIP waitlist." },
    phone: "+880 1712-345678",
    transit: "Details at opening",
    services: ["Flagship espresso lounge", "Rooftop garden pods", "Cold-drip towers"],
  },
  {
    id: "dhanmondi-27",
    name: "Dhanmondi 27 Express",
    kind: "upcoming",
    status: "Opening Late 2025",
    address: "Old 27, Shatmasjid Road, Dhanmondi, Dhaka",
    hours: { days: "TBA", open: "TBA", close: "TBA", note: "Get notified at opening." },
    phone: "+880 1712-345678",
    transit: "Details at opening",
    services: ["Quick pick-up bar", "Whole-bean station", "Pour-over on the go"],
  },
];

export function getBranch(idOrName: string): Branch | undefined {
  const needle = idOrName.trim().toLowerCase();
  if (!needle) return undefined;
  return (
    BRANCHES.find((b) => b.id === needle) ??
    BRANCHES.find((b) => b.name.toLowerCase() === needle) ??
    BRANCHES.find((b) => b.name.toLowerCase().includes(needle)) ??
    BRANCHES.find((b) => needle.split(/\s+/).every((w) => b.name.toLowerCase().includes(w)))
  );
}

/** Find a product by id, exact name, alias, or (fuzzy) name. */
export function getProduct(idOrName: string): MenuItem | undefined {
  const needle = idOrName.trim().toLowerCase();
  if (!needle) return undefined;
  // Tolerate plurals ("iced lattes" → "iced latte").
  const needles = [needle];
  if (needle.endsWith("s") && !needle.endsWith("ss")) {
    needles.push(needle.slice(0, -1));
  }
  for (const n of needles) {
    const hit =
      MENU_ITEMS.find((i) => i.id === n) ??
      MENU_ITEMS.find((i) => i.name.toLowerCase() === n) ??
      MENU_ITEMS.find((i) => i.aliases.some((a) => a.toLowerCase() === n)) ??
      MENU_ITEMS.find((i) => i.name.toLowerCase().includes(n)) ??
      MENU_ITEMS.find((i) => i.aliases.some((a) => a.toLowerCase().includes(n)));
    if (hit) return hit;
  }
  return undefined;
}

/** Public card fields for list views. */
export function toMenuCard(item: MenuItem) {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image,
    category: item.category,
    badges: item.badges,
    tags: item.tags,
    meta: item.meta,
    available: item.available,
    availableNote: item.availableNote,
  };
}
