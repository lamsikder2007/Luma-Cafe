# Product Requirement Document (PRD) & Product Brief
## Project: Luma Café — Digital Platform & AI Concierge Experience

---

### 1. Executive Summary & Brand Overview
* **Brand Name:** Luma Café
* **Tagline:** *Good Coffee · Brighter Days* | *Sip · Relax · Belong*
* **Mission:** To cultivate unhurried sanctuaries across high-velocity urban centers (originating in Dhaka, Bangladesh), combining world-class single-origin micro-lot roasting, mindful biophilic hospitality, and intuitive AI-assisted customer digital touchpoints.
* **Product Vision:** A unified web platform and digital flagship that brings the tactile, warm atmosphere of Luma’s physical roasteries into an artisanal, modern digital interface. It bridges physical in-café dining/reservations, digital order-ahead, loyalty perks, and an AI-driven concierge (*Luma AI*).

---

### 2. Objectives & Key Results (OKRs)

#### Primary Objectives
1. **Elevate Digital Hospitality:** Deliver an online ordering and reservation experience that matches the serenity and aesthetic refinement of the physical Mirpur 10 flagship.
2. **AI Concierge Adoption:** Enable customers to effortlessly navigate pairing selections, bean profiles, and customized orders via natural language dialogue with *Luma AI*.
3. **Omnichannel Loyalty & Retention:** Drive repeat visits and basket size through the *Luma Circle* tiered membership program.
4. **Transparency & Brand Loyalty:** Communicate radical direct-trade sourcing, regenerative farm partnerships, and SCA cupping scores to conscious coffee drinkers.

#### Target Metrics
* **Digital Conversion Rate:** > 8.5% on web order-ahead and table reservations.
* **AI Assist Engagement:** > 25% of first-time visitors engaging with Luma AI for pairing recommendations or table availability queries.
* **Luma Circle Sign-ups:** 40% conversion of online checkout guests into active loyalty members.
* **Cart Abandonment Reduction:** < 18% via express slide-out cart drawer and instant location pickup presets.

---

### 3. User Personas

| Persona | Archetype | Key Needs & Pain Points | Primary Journey |
| :--- | :--- | :--- | :--- |
| **Tanvir (The Remote Creator / Professional)** | 29, Product Designer in Dhaka | Seeks calm, well-lit spaces with dedicated power, high-speed fiber, and guaranteed table reservations during peak morning/afternoon hours. | Checks live atmosphere index at Mirpur 10, books a *Window Sunlit Nook* or *Work Pod*, orders ahead. |
| **Samira (The Specialty Coffee Purist)** | 34, Architect & Coffee Enthusiast | Cares about origin MASL, process methods (anaerobic, washed, honey), tasting notes, and roaster transparency. | Explores the *About / Origins* and *Artisan Menu* pages, purchases 250g whole bean reserve bags, attends cupping workshops. |
| **Nafis & Areeba (The Weekend Socialites)** | 24–28, Urbanites | Looking for aesthetic atmosphere, artisan viennoiserie bakes, iced drinks, and seamless rewards redemption. | Asks Luma AI for sweet, light caffeine pairings; redeems beans in Luma Circle; orders for quick counter collection. |

---

### 4. Information Architecture & Core Screens

The platform is structured into five core desktop web screens anchored by a persistent, unified navigation and footer shell:

```
[Sticky Artisan Navbar]
  ├── Home & Luma AI (Hero, Benefits, Favorites, Rewards Teaser, Flagship Spotlight)
  ├── Menu (Categorized Catalog, Dietary Filters, Origin Flight Spotlights)
  ├── Order Online (Pickup/Delivery Mode, Drink Configurator, Slide-out Cart Drawer)
  ├── Rewards (Luma Circle Pass, QR Terminal Scanner, Redemption Marketplace, Tier Matrix)
  ├── Locations (Mirpur 10 Flagship, Seating Meter, Table Reservation Engine, Expansion Hubs)
  └── About (Dhaka Genesis, Terroir & Direct-Trade Sourcing, Biophilic Architecture, Team Guild)
[Persistent Global Footer & Morning Dispatch Newsletter]
```

#### Screen Specifications

1. **Home & Luma AI Concierge (`SCREEN_13`)**
   * **Hero Section:** High-resolution morning ambience photography, Playfair Display typography, "SIP · RELAX · BELONG" pill, primary CTAs (*"Order Now →"* & *"Find a Location"*).
   * **Benefit Strip:** 4 value pillars (*Premium Coffee, A Warm Community, Sustainable Choices, Loyalty Rewards*).
   * **Curated Favorites:** Real-time product cards (*Cappuccino, Iced Latte, Blueberry Muffin, Avocado Toast*) with instant add-to-cart.
   * **Luma AI Floating Panel:** Integrated conversational assistant with prompt recommendations (*"Show me the menu"*, *"Today's offers"*, *"I want something sweet and not too strong"*), item pairing logic, and one-click add to cart.
   * **Flagship Map & Hours:** Dhaka / Mirpur 10 live status and coordinates.

2. **Full Artisan Menu & Catalog (`SCREEN_11`)**
   * **Interactive Filtering:** Filter by roast and category (*Espresso & Hot Brews, Cold Brew & Iced, Handcrafted Pour Over, House Patisserie, Savory Brunch*).
   * **Dietary Badges:** Caffeine level toggles, plant-milk compatibility (Oat, Almond), allergen flags (Vegan, Gluten-Free, Nut-Free).
   * **Roaster's Reserve Spotlight:** Highlighted micro-lot feature (*Ethiopia Yirgacheffe & Panama Geisha Blend*, Lot #42, 2,150 MASL) with SCA score and acidity/body dials.
   * **Artisan Quality Indicators:** 9-Stage Mineral Water metrics, direct-trade pricing multiplier (2.8x Fair Trade), and peak degas window indicator.

3. **Order Online & Express Cart Drawer (`SCREEN_9`)**
   * **Fulfillment Switcher:** Toggle between *Pickup at Mirpur 10 Flagship (12–15 min)* and *Courier Delivery (30 min)*.
   * **Item Customization:** Milk choices (Whole, Oat, Almond), sweetness dials (0%, 50%, Regular), temperature, and sizing (12oz, 16oz).
   * **Slide-out Cart & Checkout:** Real-time line item modification, gratuity picker (10%, 15%, 20%), packaging eco-fee, coupon validation (`LUMAFIRST`), and reward point accrual forecast (+147 Beans).
   * **Luma Sommelier Upsell:** AI-driven complementary pastry pairing prompts within the checkout flow.

4. **Luma Circle Rewards & Loyalty (`SCREEN_7`)**
   * **Digital Member Pass:** High-end gold and espresso card displaying member ID, current Bean balance (`1,240 Beans`), and progress to Diamond tier.
   * **Contactless QR Code:** Auto-refreshing security QR code and barcode for one-tap POS register scanning.
   * **Redemption Marketplace:** Tiered point rewards (250 Beans for house syrups, 400 Beans for handcrafted cups, up to 2,500 Beans for handmade stoneware travel tumblers).
   * **Tier Breakdown:** *Silver Origin* (0–499), *Gold Brewmaster* (500–1,499), and *Diamond Connoisseur* (1,500+).
   * **Bean Activity Ledger:** Auditable 30-day transaction history detailing earn/burn events.

5. **Roasteries & Table Reservation (`SCREEN_6`)**
   * **Live Atmosphere Sensor:** Real-time seating availability indicator (`64% Available`), crowd status (`Moderate Crowd`), and peak hour guidance.
   * **Interactive Booking Engine:** Select party size (1, 2, 3–4, 5+), atmosphere zone (*Window Sunlit Nook, Study Mezzanine, Main Roastery Floor, Garden Patio*), reservation date, and preferred 30-minute arrival slot.
   * **Barista Origin Flight Add-on:** Optional 3-cup mini cupping flight pre-booking (+৳450).
   * **In-Store Cuppings & Masterclasses:** Calendar RSVP for weekly SCA public sensory cuppings and home barista workshops.
   * **Pipeline Expansion:** Roadmap cards for upcoming *Gulshan 2 Brew Bar* and *Dhanmondi 27 Express*.

6. **About, Origins & Our Story (`SCREEN_2`)**
   * **Editorial Purpose Narrative:** Story of founder Rayan Siddiqui and the Dhaka Genesis.
   * **Terroir & Stewardship:** Direct-trade partnership cards across Ethiopia, Colombia, and Costa Rica with farm elevations, varieties, and flavor notes.
   * **Biophilic Architecture Principles:** Architectural focus on Romanesque limewash arches for acoustic absorption, natural ashwood desks, and living olive flora.
   * **Leadership Guild:** Profiles of Founder, Master Roaster, Executive Pastry Chef, and Head of Barista Guild.
   * **Regenerative Hospitality:** Commitments to 100% compostable packaging, urban ground upcycling, and solar-preheated roasting drums.

---

### 5. Design System & Visual Architecture

* **Design System Name:** *Warm Artisan Modernism* (`DESIGN_SYSTEM_1`)
* **Color Hierarchy:**
  * **Surface / Canvas:** `#fcf9f4` (Warm Cream Limewash)
  * **Containers & Cards:** `#ffffff` (Pure Crisp White) and `#f6f3ee` (Muted Warm Alabaster)
  * **Primary Brand / Espresso:** `#2c1d11` (Deep Roasted Espresso)
  * **Accent / Botanical Olive:** `#2f3b2f` (Deep Muted Garden Olive)
  * **Warm Caramel / Amber:** `#b47b48` / `#c89658` (Golden Crema)
* **Typography:**
  * **Headings & Display:** *Playfair Display* (Editorial luxury serif with custom tracking and relaxed line-height)
  * **Body & UI Elements:** Clean modern sans-serif (*Inter / Plus Jakarta Sans*) with high legibility across small numerical badges and currency tags.
* **Component Styling:**
  * **Borders & Radii:** Rounded-2xl to rounded-full pills, subtle hairline borders (`border-stone-200/60`).
  * **Shadow Treatments:** Ultra-soft ambient diffusion (`shadow-[0_4px_24px_rgba(44,29,17,0.04)]`).
  * **Imagery Style:** Natural golden hour morning illumination, tactile stoneware ceramics, linen textures, shallow depth of field.

---

### 6. Technical Stack & Implementation Guidelines

* **Frontend Framework:** Next.js (App Router, Server Components where appropriate)
* **UI Component Library:** Tailwind CSS, Radix UI / shadcn/ui primitives, Lucide React icons
* **State Management:** Zustand / React Context for Cart Drawer, Reservation state, and Loyalty bean balance
* **AI Chat Architecture:**
  * Streaming API route with context-injected menu metadata and real-time inventory tags.
  * Function calling / tool calling for:
    * `recommendDish(flavorProfile, caffeinePreference, dietaryRestrictions)`
    * `checkTableAvailability(date, time, partySize, zone)`
    * `applyRewardVoucher(memberId, voucherCode)`
* **Accessibility (a11y):** WCAG 2.1 AA compliance, ARIA live regions for cart drawer and chat, minimum 4.5:1 contrast ratios on all text elements.
* **Performance Targets:** LCP < 1.4s, FID/INP < 100ms, CLS < 0.05 on standard 4G mobile and desktop fiber.

---

### 7. Release Roadmap & Milestones

* **Phase 1 (MVP — Completed in Prototype):**
  * Core 6 responsive screens generated with Warm Artisan Modernism tokens.
  * Interactive UI components: Add to cart, slide-out drawer, atmosphere indicator, reservation form selector, and floating Luma AI concierge.
* **Phase 2 (Production Beta):**
  * Real-time POS integration (Toast / Square / local Dhaka gateway) for Mirpur 10 kitchen and barista display units (KDS).
  * SMS & Apple Wallet / Google Pay pass generation for Luma Circle loyalty QR barcodes.
  * Table management sync for barista host stand.
* **Phase 3 (Expansion):**
  * Multi-location dynamic switcher for launch of Gulshan 2 and Dhanmondi 27 branches.
  * Mobile native wrappers (iOS / Android) leveraging the same design system tokens.
