/**
 * Luma website knowledge corpus — the STATIC side of the knowledge layer.
 *
 * Brand story, concept, FAQs, how-tos, and policies live here as short
 * passages. Luma AI retrieves only the relevant passages per question
 * (see retrieve.ts) instead of stuffing the whole site into its prompt.
 *
 * DYNAMIC facts (prices, availability, offers, hours, balances, cart) are
 * NEVER stored here — they come from live tools reading lib/cafe-store.ts.
 */

export interface KnowledgeLink {
  label: string;
  href: string;
}

export interface KnowledgePassage {
  id: string;
  section:
    | "home"
    | "menu"
    | "order"
    | "locations"
    | "rewards"
    | "about"
    | "offers"
    | "account"
    | "faq"
    | "policies";
  title: string;
  body: string;
  links?: KnowledgeLink[];
}

export const CORPUS: KnowledgePassage[] = [
  {
    id: "home-intro",
    section: "home",
    title: "Welcome to Luma Café",
    body: "Luma Café — Good Coffee · Brighter Days — is an artisan specialty café in Dhaka. Every cup is crafted to bring people closer: single-origin micro-lot coffee, slow-fermented patisserie, and calm biophilic spaces to relax, work, and connect. Sip · Relax · Belong.",
    links: [
      { label: "Our story", href: "/about" },
      { label: "Find us", href: "/locations" },
    ],
  },
  {
    id: "home-sections",
    section: "home",
    title: "What you can do on this website",
    body: "Home introduces the café with curated favorites and rewards. Menu is the full catalog with filters. Order Online is order-ahead pickup or delivery with a live tray. Rewards explains Luma Circle. Locations covers branches and table reservations. About tells the brand story. The floating Luma AI panel helps with all of it.",
    links: [
      { label: "Menu", href: "/menu" },
      { label: "Order Online", href: "/order" },
      { label: "Rewards", href: "/rewards" },
      { label: "Locations", href: "/locations" },
    ],
  },
  {
    id: "home-favorites",
    section: "home",
    title: "Featured favorites on Home",
    body: "Home spotlights four handpicked favorites: Cappuccino ($4.50), Iced Latte ($4.75), Blueberry Muffin ($3.50), and Avocado Toast ($6.50). Each card has a favorite heart and a + button that adds it straight to the tray. View Full Menu opens the complete catalog.",
    links: [{ label: "Full menu", href: "/menu" }],
  },
  {
    id: "menu-overview",
    section: "menu",
    title: "Browsing the Menu page",
    body: "The Menu page lists every current offering across Espresso & Hot Brews, Cold Brew & Iced, Handcrafted Pour Over, House Patisserie, Savory Brunch, and Signature Seasonal. Filter by category or dietary tags (Vegan, Gluten-Free, Nut-Free), search drinks, notes or beans, and sort by price. A Roaster's Reserve spotlight features Lot #42 Ethiopian Geisha.",
    links: [{ label: "Open the menu", href: "/menu" }],
  },
  {
    id: "menu-customize",
    section: "menu",
    title: "Customizing a drink",
    body: "Tapping Add on any drink opens the Custom Craft panel: milk and alternatives (oat or almond +$0.65), espresso intensity (standard double, triple +$0.85, Swiss decaf), sweetness from 0% to 100%, and temperature. The total updates live before adding to the tray.",
  },
  {
    id: "menu-dietary",
    section: "menu",
    title: "Dietary and allergen information",
    body: "Every product carries its own allergen and tag data — for example the Almond Croissant contains almonds, gluten, dairy and eggs, while the Yirgacheffe Pour-Over is allergen-free. Use the Vegan, Gluten-Free and Nut-Free filters, or ask for a specific item's full ingredient and allergen list.",
  },
  {
    id: "order-how",
    section: "order",
    title: "How ordering works",
    body: "Order Online is order-ahead: pick up at the Mirpur 10 Flagship in 12–15 minutes, or courier delivery in about 30 minutes across Mirpur DOHS and nearby areas. Build your tray, then check out on the Checkout page — card via secure Stripe checkout, bKash, or cash. You earn about 10 beans per $1.",
    links: [
      { label: "Start an order", href: "/order" },
      { label: "Go to checkout", href: "/checkout" },
    ],
  },
  {
    id: "order-totals",
    section: "order",
    title: "Order totals, fees, and pickup timing",
    body: "Totals add an eco-packaging fee ($0.50), any promo discount, the chosen barista tip, and estimated tax. Orders are queued to brew about 5 minutes before your estimated arrival so a pickup is fresh. The default ready-by window shown is 8:45 AM today and can be changed.",
  },
  {
    id: "order-manage",
    section: "order",
    title: "Managing the tray",
    body: "The sliding cart drawer (shopping-bag icon, top right) shows the live tray on every page: change quantities, remove items, or clear and keep browsing. Luma AI can also add, remove, or adjust items for you — just say what you'd like.",
  },
  {
    id: "locations-flagship",
    section: "locations",
    title: "Mirpur 10 Flagship Roastery",
    body: "The flagship at Plot 14, Avenue 5, Mirpur 10, Dhaka 1216 sits by Metro Pillar 248 (MRT Line 6, Mirpur 10 Station, Exit Gate 2). Facilities include 300 Mbps fiber, USB-C work pods, a pet-friendly patio, the live Giesen roastery mezzanine, an SCA cupping lab, full accessibility, and complimentary valet and parking.",
    links: [
      { label: "Reservations & directions", href: "/locations" },
      { label: "Order for pickup", href: "/order" },
    ],
  },
  {
    id: "locations-upcoming",
    section: "locations",
    title: "Upcoming brew bars",
    body: "Two more sanctuaries are on the way: the Gulshan 2 Brew Bar, a flagship espresso lounge with rooftop garden pods opening Autumn 2025, and the Dhanmondi 27 Express kiosk for two-minute mobile dispatch opening Late 2025. Join the waitlist on the Locations page.",
    links: [{ label: "See expansion plans", href: "/locations" }],
  },
  {
    id: "locations-reserve",
    section: "locations",
    title: "Reserving a table",
    body: "Reserve a Solo Focus, Duo, Small Circle (3–4), or Studio Pod (5+) table in the Window Sunlit Nook, Study Mezzanine, Main Roastery Floor, or Garden Patio. Pick a date and 30-minute arrival slot; tables are held 20 minutes past the reserved time. An optional 3-cup origin flight (+৳450) can be served on arrival.",
    links: [{ label: "Reserve a table", href: "/locations" }],
  },
  {
    id: "locations-events",
    section: "locations",
    title: "Cuppings and masterclasses",
    body: "The flagship hosts a Saturday Home Barista V60 Masterclass (10 AM–12 PM, Brew Lab Mezzanine, ৳1,800 per person, limited spots) and a public sensory cupping of the autumn Ethiopian harvest (5–6:30 PM, free entry with RSVP). Details and sign-ups are on the Locations page.",
    links: [{ label: "See events", href: "/locations" }],
  },
  {
    id: "rewards-program",
    section: "rewards",
    title: "Luma Circle loyalty program",
    body: "Luma Circle turns every cup into beans: about 10 beans per $1, credited automatically. Tiers are Silver Origin (0–499 beans), Gold Brewmaster (500–1,499), and Diamond Connoisseur (1,500+). Beans never expire as long as you visit once within any 12-month window.",
    links: [{ label: "Explore rewards", href: "/rewards" }],
  },
  {
    id: "rewards-redeem",
    section: "rewards",
    title: "Earning and redeeming beans",
    body: "Earn on cups, bags, and pastries — Double Bean Tuesdays doubles beans on single-origin pour-overs. Redeem from 250 beans for syrups and alt milks, 400 for a handcrafted cup, 650 for a pastry pairing, up to 1,200 for a 250g reserve bag. Scan the member QR at the register to collect and spend.",
  },
  {
    id: "about-story",
    section: "about",
    title: "The Luma story",
    body: "Luma began in Dhaka with one belief: great coffee is more than caffeine — it is a sensory ritual, an ethical bond with regenerative farmers, and a warm sanctuary where community flourishes. Founder and Q-grader Rayan Siddiqui built it as an invitation to pause: 'We do not rush the bean, and we do not rush the guest.'",
    links: [{ label: "Read our story", href: "/about" }],
  },
  {
    id: "about-sourcing",
    section: "about",
    title: "Direct-trade sourcing",
    body: "Luma buys green coffee directly from partner family estates at a minimum of 2.8x Fair Trade base prices — on average 280% above Fair Trade minimums. Current origins: Ethiopia Yirgacheffe & Sidama (2,100 MASL, natural), Colombia Huila micro-estates (1,850 MASL, washed), and Costa Rica Tarrazú Valley (1,700 MASL, white honey). Every harvest is 100% traceable.",
  },
  {
    id: "about-roasting",
    section: "about",
    title: "Roasting craft",
    body: "Nordic-inspired light-to-medium profiles from a restored 1978 cast-iron drum, roasted in small batches and rested 7–21 days before brewing. Every pouch lists harvest month, farm coordinates, varietal, roast date, and roaster signature. Public sensory cuppings run every Saturday at Mirpur.",
  },
  {
    id: "about-spaces",
    section: "about",
    title: "Biophilic café design",
    body: "Spaces are designed for mindful presence: Romanesque limewash arches that soften sound, living olive and fiddle-leaf courtyards that freshen the air, and solid ashwood desks with cane seating, linen cushions, and discreet USB-C for quiet work and reading.",
  },
  {
    id: "about-sustainability",
    section: "about",
    title: "Regenerative hospitality",
    body: "Takeaway cups, lids, and bean packaging are 100% compostable within 90 days. All spent espresso grounds go to community rooftop gardens across Dhaka. Rooftop solar preheats roast air, cutting gas use 38% per roast. Baristas earn living wages with health insurance and paid guild apprenticeships.",
  },
  {
    id: "about-team",
    section: "about",
    title: "The hospitality guild",
    body: "Luma is run by a guild: founder and green-coffee buyer Rayan Siddiqui, master roaster and 2023 National Roasting Champion Aminul Islam, Parisian-trained pastry chef Samira Khan, and head of the barista guild Tasmia Rahman.",
  },
  {
    id: "offers-current",
    section: "offers",
    title: "Current offers",
    body: "First order? Use code LUMAFIRST at checkout for 10% off. Every Tuesday earns double beans on single-origin pour-overs. Seasonal signatures like the Spanish Dolce Latte and Iced Caramel Shakerato rotate through the menu.",
    links: [{ label: "Order with offers", href: "/order" }],
  },
  {
    id: "offers-codes",
    section: "offers",
    title: "Using promo codes",
    body: "Enter a promo code in the promo field on the Order Online page and the discount applies to the tray before checkout. Codes are validated live — expired or unknown codes are rejected. Luma AI can check and pre-fill an eligible code for you.",
  },
  {
    id: "account-signin",
    section: "account",
    title: "Signing in",
    body: "Use Sign In (top right) to access your Luma Circle profile: bean balance, tier progress, favorites, and order history. Browsing as a guest is always fine — the menu, ordering, and reservations work without an account, but points and history need one.",
  },
  {
    id: "account-privacy",
    section: "account",
    title: "Your data and privacy",
    body: "Luma AI only ever sees your own tray and, when you're signed in, your own rewards and orders. It can never see another guest's information, and it will never complete a payment for you — checkout always happens with you in control.",
  },
  {
    id: "faq-hours",
    section: "faq",
    title: "Opening hours",
    body: "The Mirpur 10 Flagship is open every day, 7:30 AM to 10:30 PM, with the kitchen closing at 9:45 PM. Quietest between 8:00 and 11:30 AM; the pour-over rush peaks 4:30 to 7:30 PM.",
  },
  {
    id: "faq-find",
    section: "faq",
    title: "Finding us",
    body: "Plot 14, Avenue 5, Mirpur 10, Dhaka 1216 — by Metro Pillar 248. Take MRT Line 6 to Mirpur 10 Station, Exit Gate 2, a four-minute shaded walk. Underground parking includes EV charging. Call the bar counter at +880 1712-345678.",
  },
  {
    id: "faq-order",
    section: "faq",
    title: "Pickup, delivery, and reservations",
    body: "Order ahead for 12–15 minute pickup or ~30 minute courier delivery around Mirpur. Tables can be reserved for parties of 1 to 5+ across four atmosphere zones and are held 20 minutes past your slot. Walk-ins are always welcome at the brew bar.",
  },
  {
    id: "faq-ai",
    section: "faq",
    title: "What Luma AI can do",
    body: "Luma AI answers anything about the café, searches the live menu, checks prices, ingredients, and availability, explains offers and rewards, finds locations, guides you around the site — and can add items to your tray, adjust quantities, or pre-fill a promo code. Just ask in plain words.",
  },
  {
    id: "policies-allergen",
    section: "policies",
    title: "Allergen policy",
    body: "Allergen information is listed on every product: common flags include dairy, gluten, eggs, tree nuts, and oat cross-contact. The kitchen handles many allergens, so guests with severe allergies should confirm with the bar team at +880 1712-345678 before ordering.",
  },
  {
    id: "policies-reserve",
    section: "policies",
    title: "Reservation and house notes",
    body: "Reservations are free and held 20 minutes past the slot. The brew bar welcomes walk-ins anytime. Pets are welcome on the Garden Patio with water bowls and shade. High-speed fiber and work pods make the mezzanine ideal for focused work.",
  },
];
