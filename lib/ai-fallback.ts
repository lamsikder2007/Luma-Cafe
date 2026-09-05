/**
 * Local fallback responder — guarantees Luma AI ALWAYS answers, even when
 * the LLM provider is down, rate-limited, or out of quota.
 *
 * It reads the SAME live sources as the AI tools (cafe-store, knowledge
 * corpus, session member) and returns the same { reply, actions } shape, so
 * the widget, cart, and promo handoff behave identically. Tone matches the
 * concierge personality: warm, concise, premium.
 */
import {
  OFFERS,
  searchMenu,
  getProduct,
  getBranch,
  pausedItems,
  MENU_ITEMS,
  type MenuItem,
} from "./cafe-store";
import { searchKnowledge } from "./luma-knowledge/retrieve";
import { getMember } from "./account-store";
import { checkScope, REDIRECT_MESSAGE } from "./domain-guard";
import type { CartSnapshotItem, CartAction } from "./ai";

const money = (n: number) => `$${n.toFixed(2)}`;

function listItems(items: MenuItem[]): string {
  return items
    .slice(0, 6)
    .map((i) => `${i.name} (${money(i.price)})`)
    .join(", ");
}

function productDetail(p: MenuItem): string {
  const lines = [
    `${p.name} is ${money(p.price)} — ${p.description}`,
    p.available ? p.availableNote : `Heads up: it's paused today. ${p.availableNote}`,
    `Ingredients: ${p.ingredients.join(", ") || "just coffee and care"}.`,
  ];
  if (p.allergens.length > 0) lines.push(`Allergens: ${p.allergens.join(", ")}.`);
  return lines.join(" ");
}

/** Recommend a drink + pairing for a taste, available-only. */
function recommend(taste: string): string {
  const t = taste.toLowerCase();
  const avail = (id: string) => MENU_ITEMS.find((i) => i.id === id && i.available);
  let drink: MenuItem | undefined;
  let reason = "";
  if (/sweet|dessert|sugar/.test(t)) {
    drink = avail("spanish-dolce-latte") ?? avail("iced-caramel-shakerato");
    reason = "slow-cooked sweetness with real espresso character";
  } else if (/strong|bold|energy|tired|sleepy|wake|kick/.test(t)) {
    drink = avail("velvet-cappuccino") ?? avail("silken-flat-white");
    reason = "a proper double-shot backbone";
  } else if (/mild|light|smooth|not too strong|gentle|soft/.test(t)) {
    drink = avail("iced-latte") ?? avail("yirgacheffe-pourover");
    reason = "mellow and easy-drinking";
  } else if (/cold|iced|chill|refresh|summer|hot day/.test(t)) {
    drink = searchMenu({ category: "cold" })[0];
    reason = "chilled and refreshing";
  } else if (/matcha|green|tea|no coffee|without coffee/.test(t)) {
    drink = avail("uji-matcha");
    reason = "gentle green-tea energy, no coffee at all";
  } else if (/savory|hungry|hungry|breakfast|lunch|brunch|eat|food|meal/.test(t)) {
    drink = avail("heirloom-avocado-toast") ?? avail("truffle-brioche");
    reason = "proper savory fuel";
  } else if (/cheap|budget|affordable/.test(t)) {
    drink = searchMenu({}).sort((a, b) => a.price - b.price)[0];
    reason = "kind to the wallet";
  } else {
    drink = avail("velvet-cappuccino") ?? avail("silken-flat-white");
    reason = "our house signature";
  }
  if (!drink) {
    const any = searchMenu({})[0];
    if (!any) return "Our menu is being updated right now — please check the Menu page in a moment.";
    drink = any;
    reason = "a guest favorite";
  }
  const pairing =
    /savory|hungry|breakfast|lunch|brunch|eat|food|meal/.test(t) || drink.category === "brunch" || drink.category === "bakery"
      ? avail("yirgacheffe-pourover") ?? avail("iced-latte")
      : avail("wild-berry-muffin") ?? avail("almond-croissant");
  let reply = `Try our ${drink.name} (${money(drink.price)}) — ${reason}. ${drink.description}`;
  if (pairing && pairing.id !== drink.id) {
    reply += ` It pairs beautifully with the ${pairing.name} (${money(pairing.price)}). Want me to add either to your tray?`;
  }
  return reply;
}

function cartSummary(cart: CartSnapshotItem[]): string {
  if (cart.length === 0)
    return "Your tray is empty at the moment. Tell me a craving and I'll find you something — or browse the Menu page.";
  const lines = cart.map(
    (i) => `${i.quantity}× ${i.name} (${money(i.price * i.quantity)})`
  );
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  return `Your tray right now: ${lines.join(", ")}. Estimated subtotal ${money(subtotal)} — ready in 12–15 minutes for pickup.`;
}

export function fallbackRespond(
  message: string,
  cart: CartSnapshotItem[] = [],
  memberId: string | null = null
): { reply: string; actions: CartAction[] } {
  const actions: CartAction[] = [];
  const text = message.toLowerCase().trim();
  const member = getMember(memberId);

  // 1. Domain gate (same rule as the AI loop).
  if (checkScope(message).verdict === "out") {
    return { reply: REDIRECT_MESSAGE, actions };
  }

  // 2. Greetings & pleasantries.
  if (/^(hi|hello|hey|yo|good\s?(morning|afternoon|evening)|salam|assalam|salaam|adaab|thanks|thank you|shukriya|dhonnobad|bye|ok|okay|great)\b/.test(text)) {
    return {
      reply:
        "Hello and welcome to Luma Café ☕ I can recommend drinks, check prices and availability, explain offers and rewards, find our branches, or add things to your tray. What are you craving today?",
      actions,
    };
  }

  // 3. Add to tray: "add X to my cart/tray/order".
  const addMatch = text.match(/add\s+(.+?)\s+(to\s+)?(my\s+|the\s+)?(cart|tray|order)\b/) ?? text.match(/^add\s+(.+)$/);
  if (addMatch) {
    let rest = (addMatch[1] ?? "").replace(/^(me|us)?\s*(a|an|the|some)?\s*/, "").trim();
    const qtyMatch = rest.match(/^(\d+)\s*x?\s+/);
    const qty = qtyMatch ? Math.max(1, Math.min(12, parseInt(qtyMatch[1], 10))) : 1;
    rest = rest.replace(/^(\d+)\s*x?\s+/, "").trim();
    if (!rest) {
      return {
        reply: `Which one should I add? Right now guests love the Velvet Cappuccino (${money(4.5)}), Iced Latte (${money(4.75)}), and Blueberry Muffin (${money(3.5)}).`,
        actions,
      };
    }
    const product = getProduct(rest);
    if (!product) {
      return {
        reply: `I can't verify "${addMatch[1].trim()}" on our live menu, so I didn't add anything. Try one of these: ${listItems(searchMenu({}).slice(0, 5))}.`,
        actions,
      };
    }
    if (!product.available) {
      return {
        reply: `${product.name} is paused today — ${product.availableNote} I didn't add it. How about the ${recommend("default").split("Try our ")[1]?.split(" (")[0] ?? "Velvet Cappuccino"} instead?`,
        actions,
      };
    }
    actions.push({ type: "add_to_cart", id: product.id, name: product.name, price: product.price, image: product.image, quantity: qty });
    return {
      reply: `Done — ${qty}× ${product.name} (${money(product.price * qty)}) is in your tray! Anything else to go with it?`,
      actions,
    };
  }

  // 4. Offers.
  if (/offer|promo|discount|deal|coupon|voucher|\bcode\b|luma\w*first|tuesday/.test(text)) {
    return {
      reply: `Current offers: ${OFFERS.map((o) => `${o.title} — ${o.detail}`).join(" ")} Shall I apply LUMAFIRST to your checkout?`,
      actions,
    };
  }

  // 5. Hours / locations / contact.
  if (/hour|open|close|timing|location|address|where|direction|branch|mirpur|gulshan|dhanmondi|contact|phone|visit|nearest|find|parking|metro/.test(text)) {
    const branch = getBranch(text) ?? getBranch("mirpur-10")!;
    if (branch.kind === "upcoming") {
      return {
        reply: `${branch.name} is ${branch.status.toLowerCase()} at ${branch.address}. Our open branch is Mirpur 10 Flagship — Plot 14, Avenue 5, open daily 7:30 AM–10:30 PM.`,
        actions,
      };
    }
    return {
      reply: `${branch.name}: ${branch.address}. Open ${branch.hours.days}, ${branch.hours.open}–${branch.hours.close} (${branch.hours.note}) Reach us at ${branch.phone}. ${branch.transit}.`,
      actions,
    };
  }

  // 6. Rewards (+ member balance).
  if (/reward|bean|point|tier|circle|loyalty|gold|silver|diamond|membership/.test(text)) {
    const base =
      "Luma Circle earns about 10 beans per $1, automatically. Tiers: Silver Origin (0–499), Gold Brewmaster (500–1,499), Diamond Connoisseur (1,500+). Redeem from 250 beans for syrups up to 1,200 for a reserve bag.";
    if (member) {
      return {
        reply: `${member.name}, you hold ${member.beans.toLocaleString()} beans as ${member.tier} — ${member.beansToNextTier} beans to ${member.nextTier}. ${base}`,
        actions,
      };
    }
    return {
      reply: `${base} Sign in (top right) and I'll tell you your exact balance.`,
      actions,
    };
  }

  // 7. Account / orders.
  if (/my (account|profile|order|history|favorite)|sign in|log in|order history|previous order/.test(text)) {
    if (!member) {
      return {
        reply: "You're browsing as a guest, so I can't see rewards or order history. Sign in (top right) and ask me again — I'll pull up your points, favorites, and past orders.",
        actions,
      };
    }
    const favs = member.favorites.map((id) => getProduct(id)?.name ?? id).join(", ");
    const last = member.orders[0];
    return {
      reply: `${member.name} · ${member.tier} · ${member.beans.toLocaleString()} beans. Your favorites: ${favs}. Last order ${last.id} (${last.date}): ${last.items.join(", ")} — ${money(last.total)}, +${last.beansEarned} beans.`,
      actions,
    };
  }

  // 8. Tray / order status / checkout.
  if (/order status|my order|tray|cart|checkout|status|bill|total/.test(text)) {
    return { reply: cartSummary(cart), actions };
  }

  // 9. Availability.
  if (/availab|in stock|sold out|still (have|serve|offer)|left|remaining/.test(text)) {
    const hit = MENU_ITEMS.map((p) => ({ p, hit: text.includes(p.name.toLowerCase()) || p.aliases.some((a) => text.includes(a.toLowerCase())) })).find((x) => x.hit)?.p;
    if (hit) {
      return {
        reply: hit.available
          ? `Yes — ${hit.name} is available right now. ${hit.availableNote} It's ${money(hit.price)}. Want me to add it?`
          : `Not today, unfortunately — ${hit.name} is paused. ${hit.availableNote}`,
        actions,
      };
    }
    const paused = pausedItems();
    return {
      reply: `Almost everything is available right now.${paused.length > 0 ? ` Only paused today: ${paused.map((p) => p.name).join(", ")}.` : ""} Name any item and I'll check it exactly.`,
      actions,
    };
  }

  // 10. Specific product question (name/alias mentioned).
  const mentioned = MENU_ITEMS.find(
    (p) => text.includes(p.name.toLowerCase()) || p.aliases.some((a) => text.includes(a.toLowerCase())) || text.includes(p.id)
  );
  if (mentioned) {
    return { reply: productDetail(mentioned), actions };
  }

  // 11. Recommendations.
  if (/recommend|suggest|best|favorite|favourite|sweet|strong|mild|light|bold|cold|hot|caffeine|sleepy|tired|cheap|budget|craving|want something|like something/.test(text)) {
    return { reply: recommend(text), actions };
  }

  // 12. Menu browsing (+ price filter).
  if (/menu|show|list|all|drink|food|item|under|below|cheap|price|\$\s*\d|\b\d+\s*(dollar|taka|৳)/.test(text)) {
    const priceMatch = text.match(/under\s*\$?\s*(\d+(?:\.\d+)?)/);
    const category = /cold|iced|chill/.test(text)
      ? "cold"
      : /hot|espresso/.test(text)
        ? "hot"
        : /pour|geisha|filter/.test(text)
          ? "pourover"
          : /bakery|pastry|cake|muffin|croissant|baked/.test(text)
            ? "bakery"
            : /brunch|breakfast|savory|toast|egg/.test(text)
              ? "brunch"
              : /seasonal|signature|special/.test(text)
                ? "seasonal"
                : undefined;
    const items = searchMenu({
      maxPrice: priceMatch ? parseFloat(priceMatch[1]) : undefined,
      category,
    });
    if (items.length === 0) {
      return { reply: "Nothing on the live menu matches that combination. Try raising the budget or clearing the category — or ask me for a recommendation.", actions };
    }
    const paused = pausedItems();
    return {
      reply: `Here's what's pouring${priceMatch ? ` under ${money(parseFloat(priceMatch[1]))}` : ""}${category ? ` (${category})` : ""}: ${listItems(items)}.${paused.length > 0 ? ` Paused today: ${paused.map((p) => p.name).join(", ")}.` : ""} Ask about any item for ingredients and allergens, or say "add" to put it in your tray.`,
      actions,
    };
  }

  // 13. Website knowledge (RAG).
  const passages = searchKnowledge(message);
  if (passages.length > 0) {
    const top = passages[0];
    const link = top.links?.[0] ? ` More here: ${top.links[0].label}.` : "";
    return { reply: `${top.body}${link}`, actions };
  }

  // 14. Default capabilities.
  return {
    reply:
      "I can help with our menu, prices, ingredients, today's offers, opening hours, locations, rewards, your tray, and finding your way around the site. Try: “What's sweet and under $5?” or “Add an iced latte to my cart.”",
    actions,
  };
}
