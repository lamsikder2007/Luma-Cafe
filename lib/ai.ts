import {
  GoogleGenAI,
  Type,
  type Content,
  type FunctionDeclaration,
} from "@google/genai";
import {
  STORE,
  OFFERS,
  REWARDS,
  ORDERING,
  BRANCHES,
  searchMenu,
  getProduct,
  getBranch,
  pausedItems,
  toMenuCard,
} from "./cafe-store";
import { searchKnowledge } from "./luma-knowledge/retrieve";
import { getMember } from "./account-store";
import { checkScope, REDIRECT_MESSAGE } from "./domain-guard";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const PAGES = {
  home: "/",
  menu: "/menu",
  order: "/order",
  checkout: "/checkout",
  rewards: "/rewards",
  locations: "/locations",
  about: "/about",
} as const;

/**
 * No website facts live in this prompt. Static knowledge comes from the
 * retrieval tool, dynamic facts from live-data tools, private data only
 * from the signed-in session — all reading the app's own data layer.
 */
function buildSystemPrompt(
  today: string,
  cartCount: number,
  memberName: string | null
): string {
  return `You are "Luma AI", the knowledgeable digital concierge of Luma Café — Good Coffee · Brighter Days. Sip · Relax · Belong.

Today is ${today}. The guest's tray holds ${cartCount} item(s). ${
    memberName
      ? `Signed in as ${memberName}. You may use their account tools; never reveal anyone else's data.`
      : "Browsing as a guest (not signed in). Account tools will say so — invite them to sign in instead of guessing."
  }

Tone: friendly, natural, concise, premium, brand-consistent. A concierge, not a form. 2–4 sentences, prices in dollars. Remember conversation context; never make guests repeat themselves.

DOMAIN — Luma Café only. You answer: the café, this website's content, menu/products, orders/tray, locations/hours, offers, rewards, policies, the signed-in guest's own account data, recommendations from OUR menu, and site navigation/actions. NOTHING else.
- Off-scope (people, code, math/homework, news/politics, jokes — even coffee-themed ones, essays, general knowledge, other restaurants or cafés, competitors, delivery apps, life advice): refuse with exactly this line and nothing more: "${REDIRECT_MESSAGE}" — never answer from world knowledge, even if you know it.
- Coding, math-solving, or writing tasks are off-scope even when café-flavored.
- Greetings, thanks, goodbyes, "who are you": brief warm reply in character + offer help. No tools needed.
- BORDERLINE SMARTS: "best coffee" → recommend from OUR menu via tools. "best in Bangladesh/the city" → Luma only: never rank, review, or compare other cafés; say you can only speak for Luma and offer our best. "help me order" → guide OUR flow + tools. Ordering from other restaurants or non-Luma food → refuse. Generic coffee knowledge ("what is espresso?") → at most one line, then pivot to our menu. "Tell me about Luma" → search_knowledge (about), never memory.

HOW YOU KNOW THINGS (follow strictly):
- Brand story, concept, FAQs, how-tos, policies, site guidance → search_knowledge FIRST, answer only from returned passages.
- Menu, prices, ingredients, allergens, availability, offers, hours, locations, rewards program → the matching live tool FIRST, answer only from its result.
- The guest's own tray, points, favorites, orders → cart/account tools FIRST.
- Never invent products, prices, offers, hours, or policies. If a tool can't verify something, say so plainly and offer a verified alternative.
- Never claim availability without checking when a live check exists. Never claim an order/payment completed — checkout always happens with the guest in control.

ACTIONS (real functions, effects the guest will see):
- add_to_cart needs no pre-confirmation; confirm warmly afterwards with the live price.
- remove_from_cart / update_cart_quantity: if the item is named unambiguously, do it and confirm; if ambiguous, ask which first.
- apply_offer: validate the code with the tool; on success tell them it's saved for checkout.
- navigate: ONLY when the guest wants to go somewhere ("take me to…", "open…", "show me the page"). Answer content questions in chat instead.
- You cannot check out, pay, book, or see other customers' data. Ever.`;
}

const TOOLS: FunctionDeclaration[] = [
  {
    name: "search_knowledge",
    description:
      "Retrieve website knowledge passages (brand story, concept, FAQs, how-tos, policies, site guidance). Use for anything that is not live data.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        query: { type: Type.STRING, description: "What to look up." },
        section: {
          type: Type.STRING,
          description:
            "Optional filter: home, menu, order, locations, rewards, about, offers, account, faq, policies.",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "search_menu",
    description:
      "Search the live café menu. Returns matching items with name, price, description, category, tags, and availability.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        query: { type: Type.STRING, description: "Keyword, e.g. 'cold sweet', 'matcha'." },
        category: {
          type: Type.STRING,
          description: "One of: hot, cold, pourover, bakery, brunch, seasonal.",
        },
        maxPrice: { type: Type.NUMBER, description: "Maximum price in dollars." },
        tag: { type: Type.STRING, description: "Flavor/badge tag, e.g. 'Vegan'." },
      },
    },
  },
  {
    name: "get_product",
    description:
      "Full live details for one product: description, price, ingredients, allergens, options, availability.",
    parameters: {
      type: Type.OBJECT,
      properties: { name: { type: Type.STRING, description: "Product name or id." } },
      required: ["name"],
    },
  },
  {
    name: "check_availability",
    description: "Whether a named menu item can be ordered right now.",
    parameters: {
      type: Type.OBJECT,
      properties: { name: { type: Type.STRING, description: "Product name or id." } },
      required: ["name"],
    },
  },
  {
    name: "get_offers",
    description: "Current live promotions, discount codes, and deals.",
    parameters: { type: Type.OBJECT, properties: {} },
  },
  {
    name: "get_store_info",
    description: "Flagship address, hours, contact, pickup/delivery options.",
    parameters: { type: Type.OBJECT, properties: {} },
  },
  {
    name: "get_locations",
    description: "All café branches with status, address, and hours summary.",
    parameters: { type: Type.OBJECT, properties: {} },
  },
  {
    name: "get_location",
    description: "Full details for one branch: hours, services, transit, contact.",
    parameters: {
      type: Type.OBJECT,
      properties: { branch: { type: Type.STRING, description: "Branch name or id." } },
      required: ["branch"],
    },
  },
  {
    name: "get_rewards",
    description: "Luma Circle program: earn rate, tiers, redemptions.",
    parameters: { type: Type.OBJECT, properties: {} },
  },
  {
    name: "get_order_status",
    description: "The guest's current tray: items, quantities, estimated total.",
    parameters: { type: Type.OBJECT, properties: {} },
  },
  {
    name: "add_to_cart",
    description: "Add a real menu product to the tray. Validates availability first.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: "Product name or id." },
        quantity: { type: Type.INTEGER, description: "How many. Defaults to 1." },
      },
      required: ["name"],
    },
  },
  {
    name: "remove_from_cart",
    description: "Remove an item already in the guest's tray.",
    parameters: {
      type: Type.OBJECT,
      properties: { name: { type: Type.STRING, description: "Item name as shown in the tray." } },
      required: ["name"],
    },
  },
  {
    name: "update_cart_quantity",
    description: "Set a tray item's quantity (1 or more).",
    parameters: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: "Item name as shown in the tray." },
        quantity: { type: Type.INTEGER, description: "New quantity, 1–12." },
      },
      required: ["name", "quantity"],
    },
  },
  {
    name: "apply_offer",
    description: "Validate a promo code and save it for checkout.",
    parameters: {
      type: Type.OBJECT,
      properties: { code: { type: Type.STRING, description: "Promo code, e.g. LUMAFIRST." } },
      required: ["code"],
    },
  },
  {
    name: "get_my_account",
    description:
      "Signed-in guest's own profile: tier, bean balance, favorites. Requires sign-in.",
    parameters: { type: Type.OBJECT, properties: {} },
  },
  {
    name: "get_my_orders",
    description: "Signed-in guest's own recent orders. Requires sign-in.",
    parameters: { type: Type.OBJECT, properties: {} },
  },
  {
    name: "navigate",
    description:
      "Take the guest to a website page. Only for explicit go/open intents.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        page: {
          type: Type.STRING,
          description: "One of: home, menu, order, checkout, rewards, locations, about.",
        },
      },
      required: ["page"],
    },
  },
];

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface CartSnapshotItem {
  id?: string;
  name: string;
  price: number;
  quantity: number;
}

export type CartAction =
  | { type: "add_to_cart"; id: string; name: string; price: number; image: string; quantity: number }
  | { type: "remove_from_cart"; id: string }
  | { type: "update_cart_quantity"; id: string; quantity: number }
  | { type: "apply_offer"; code: string }
  | { type: "navigate"; href: string };

export interface ChatResult {
  reply: string;
  actions: CartAction[];
  guard?: "domain-redirect";
}

const MAX_TOOL_TURNS = 6;
const MAX_ACTIONS = 8;

export const PRIMARY_MODEL =
  process.env.GEMINI_MODEL ?? "gemini-3.5-flash-lite";
export const FAILOVER_MODEL =
  process.env.GEMINI_FAILOVER_MODEL ?? "gemini-3.6-flash";

/**
 * Full model chain tried in order — every entry verified working with
 * generateContent on this API. Override with GEMINI_MODELS="a,b,c".
 * Anything else (retired 2.x, empty preview aliases) is excluded on purpose.
 */
const DEFAULT_CHAIN = [
  PRIMARY_MODEL,
  "gemini-flash-lite-latest",
  FAILOVER_MODEL,
].filter((m, i, arr) => arr.indexOf(m) === i);

export const MODEL_CHAIN: string[] = (() => {
  const fromEnv = (process.env.GEMINI_MODELS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return fromEnv.length > 0 ? fromEnv : DEFAULT_CHAIN;
})();

function strArg(args: Record<string, unknown> | undefined, key: string): string {
  const v = args?.[key];
  return typeof v === "string" ? v : "";
}

function numArg(args: Record<string, unknown> | undefined, key: string): number | undefined {
  const v = args?.[key];
  return typeof v === "number" && Number.isFinite(v) ? v : undefined;
}

function findInCart(cart: CartSnapshotItem[], needle: string) {
  const n = needle.trim().toLowerCase();
  return (
    cart.find((i) => i.id?.toLowerCase() === n) ??
    cart.find((i) => i.name.toLowerCase() === n) ??
    cart.find((i) => i.name.toLowerCase().includes(n))
  );
}

export async function generateChatResponse(
  messages: ChatMessage[],
  cart: CartSnapshotItem[] = [],
  memberId: string | null = null,
  model: string = PRIMARY_MODEL
): Promise<ChatResult> {
  // Backend-level domain gate: clear out-of-domain requests are refused
  // deterministically — no model call, no quota spent, no world knowledge.
  const latestUser = [...messages].reverse().find((m) => m.role === "user");
  if (latestUser && checkScope(latestUser.content).verdict === "out") {
    return { reply: REDIRECT_MESSAGE, actions: [], guard: "domain-redirect" };
  }

  const actions: CartAction[] = [];
  const member = getMember(memberId);

  const pushAction = (a: CartAction): boolean => {
    if (actions.length >= MAX_ACTIONS) return false;
    actions.push(a);
    return true;
  };

  const execute = (
    name: string | undefined,
    args: Record<string, unknown> | undefined
  ): Record<string, unknown> => {
    switch (name) {
      case "search_knowledge": {
        const passages = searchKnowledge(strArg(args, "query"), strArg(args, "section") || undefined);
        return {
          passages: passages.map((p) => ({
            title: p.title,
            section: p.section,
            body: p.body,
            links: p.links ?? [],
          })),
        };
      }
      case "search_menu": {
        const items = searchMenu({
          query: strArg(args, "query") || undefined,
          category: strArg(args, "category") || undefined,
          maxPrice: numArg(args, "maxPrice"),
          tag: strArg(args, "tag") || undefined,
        }).slice(0, 8);
        return { results: items.map(toMenuCard), pausedToday: pausedItems().map((i) => i.name) };
      }
      case "get_product": {
        const product = getProduct(strArg(args, "name"));
        if (!product) return { found: false };
        return { found: true, product };
      }
      case "check_availability": {
        const product = getProduct(strArg(args, "name"));
        if (!product) return { found: false, message: "No such item on the menu." };
        return { found: true, name: product.name, available: product.available, note: product.availableNote };
      }
      case "get_offers":
        return { offers: OFFERS };
      case "get_store_info":
        return { store: STORE, ordering: ORDERING };
      case "get_locations":
        return {
          branches: BRANCHES.map((b) => ({
            id: b.id,
            name: b.name,
            status: b.status,
            address: b.address,
            hours: `${b.hours.days}: ${b.hours.open} – ${b.hours.close}`,
          })),
        };
      case "get_location": {
        const branch = getBranch(strArg(args, "branch"));
        if (!branch) return { found: false };
        return { found: true, branch };
      }
      case "get_rewards":
        return { rewards: REWARDS };
      case "get_order_status": {
        if (cart.length === 0)
          return { activeOrder: false, message: "The tray is empty — no active order." };
        const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
        return {
          activeOrder: true,
          items: cart.map((i) => ({
            name: i.name,
            quantity: i.quantity,
            lineTotal: Math.round(i.price * i.quantity * 100) / 100,
          })),
          itemCount: cart.reduce((s, i) => s + i.quantity, 0),
          estimatedSubtotal: Math.round(subtotal * 100) / 100,
          readyBy: "12–15 minutes for pickup",
        };
      }
      case "add_to_cart": {
        const product = getProduct(strArg(args, "name"));
        if (!product)
          return { ok: false, error: `I can't verify "${strArg(args, "name")}" — it's not on the live menu, so I didn't add anything.` };
        if (!product.available)
          return { ok: false, error: `${product.name} is paused today (${product.availableNote}) — I didn't add it.` };
        const qty = Math.max(1, Math.min(12, Math.round(numArg(args, "quantity") ?? 1)));
        if (!pushAction({ type: "add_to_cart", id: product.id, name: product.name, price: product.price, image: product.image, quantity: qty }))
          return { ok: false, error: "Action limit reached for this message." };
        return { ok: true, added: { name: product.name, price: product.price, quantity: qty } };
      }
      case "remove_from_cart": {
        const item = findInCart(cart, strArg(args, "name"));
        if (!item || !item.id)
          return { ok: false, error: `I can't find "${strArg(args, "name")}" in the tray, so nothing was removed.` };
        if (!pushAction({ type: "remove_from_cart", id: item.id }))
          return { ok: false, error: "Action limit reached for this message." };
        return { ok: true, removed: item.name };
      }
      case "update_cart_quantity": {
        const item = findInCart(cart, strArg(args, "name"));
        if (!item || !item.id)
          return { ok: false, error: `I can't find "${strArg(args, "name")}" in the tray.` };
        const qty = Math.round(numArg(args, "quantity") ?? 0);
        if (qty <= 0) {
          if (!pushAction({ type: "remove_from_cart", id: item.id }))
            return { ok: false, error: "Action limit reached for this message." };
          return { ok: true, removed: item.name };
        }
        const clamped = Math.max(1, Math.min(12, qty));
        if (!pushAction({ type: "update_cart_quantity", id: item.id, quantity: clamped }))
          return { ok: false, error: "Action limit reached for this message." };
        return { ok: true, updated: { name: item.name, quantity: clamped } };
      }
      case "apply_offer": {
        const code = strArg(args, "code").trim().toUpperCase();
        const offer = OFFERS.find((o) => o.code.toUpperCase() === code);
        if (!offer)
          return { ok: false, error: `Code "${strArg(args, "code")}" isn't a live offer, so nothing was applied.` };
        if (!pushAction({ type: "apply_offer", code: offer.code }))
          return { ok: false, error: "Action limit reached for this message." };
        return { ok: true, applied: { code: offer.code, title: offer.title, detail: offer.detail } };
      }
      case "get_my_account": {
        if (!member)
          return { signedIn: false, message: "Browsing as a guest — sign in to see rewards and profile." };
        return {
          signedIn: true,
          profile: {
            name: member.name,
            tier: member.tier,
            beans: member.beans,
            progress: `${member.beansToNextTier} beans to ${member.nextTier}`,
            memberSince: member.memberSince,
            favorites: member.favorites
              .map((id) => getProduct(id)?.name ?? id),
          },
        };
      }
      case "get_my_orders": {
        if (!member)
          return { signedIn: false, message: "Browsing as a guest — sign in to see order history." };
        return { signedIn: true, orders: member.orders };
      }
      case "navigate": {
        const page = strArg(args, "page").toLowerCase() as keyof typeof PAGES;
        const href = PAGES[page];
        if (!href) return { ok: false, error: "Unknown page." };
        if (!pushAction({ type: "navigate", href }))
          return { ok: false, error: "Action limit reached for this message." };
        return { ok: true, href };
      }
      default:
        return { error: `Unknown tool: ${name}` };
    }
  };

  const contents: Content[] = messages.map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  const today = new Date().toDateString();
  const cartCount = cart.reduce((s, i) => s + (i.quantity || 0), 0);

  for (let turn = 0; turn < MAX_TOOL_TURNS; turn++) {
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: buildSystemPrompt(today, cartCount, member?.name ?? null),
        tools: [{ functionDeclarations: TOOLS }],
        temperature: 0.7,
        maxOutputTokens: 512,
      },
    });

    const calls = response.functionCalls ?? [];
    if (calls.length === 0) {
      const text = response.text;
      if (!text) throw new Error("No response generated");
      return { reply: text, actions };
    }

    // Echo the model's raw turn (preserves thought signatures required by the API).
    const modelTurn = response.candidates?.[0]?.content;
    contents.push(
      modelTurn ?? {
        role: "model",
        parts: calls.map((c) => ({ functionCall: { name: c.name, args: c.args, id: c.id } })),
      }
    );
    contents.push({
      role: "user",
      parts: calls.map((c) => ({
        functionResponse: { id: c.id, name: c.name, response: { output: execute(c.name, c.args) } },
      })),
    });
  }

  if (actions.length > 0) {
    return { reply: "Done — your tray is updated.", actions };
  }
  throw new Error("No response generated");
}
