/**
 * Luma AI domain guard — backend-level scope enforcement.
 *
 * Runs BEFORE any model call: clear out-of-domain requests get the fixed
 * redirect with zero LLM involvement (also saves API quota). Ambiguous
 * messages pass through as "unsure" so the model + tools can decide smartly.
 *
 * Scoring: explicit Luma anchors weigh 3 (they beat generic out-signals, so
 * "who is the founder of Luma?" stays in-domain); generic café words weigh 1;
 * each distinct out-of-domain pattern weighs 2. Verdict is OUT when
 * out-signals fire without a Luma anchor to ground them.
 */

export const REDIRECT_MESSAGE =
  "I'm Luma AI, the virtual assistant for Luma Café ☕ I can help with our menu, orders, locations, rewards, offers, and other Luma Café information. What can I help you with?";

export type ScopeVerdict = "in" | "out" | "unsure";

/** Explicit Luma anchors — weight 3. */
const ANCHORS = [
  "luma",
  "mirpur",
  "gulshan",
  "dhanmondi",
  "cappuccino",
  "shakerato",
  "flat white",
  "dolce latte",
  "pour-over",
  "pourover",
  "yirgacheffe",
  "geisha",
  "kyoto",
  "matcha",
  "muffin",
  "croissant",
  "brioche",
  "avocado toast",
  "espresso",
  "barista",
  "luma circle",
  "roastery",
  "brew bar",
  "cupping",
];

/** Generic café-domain words — weight 1. */
const DOMAIN_WORDS = [
  "coffee",
  "café",
  "cafe",
  "latte",
  "cocoa",
  "chocolate",
  "mocha",
  "tea",
  "drink",
  "beverage",
  "breakfast",
  "brunch",
  "lunch",
  "dessert",
  "pastry",
  "bakery",
  "cake",
  "snack",
  "hungry",
  "thirsty",
  "sweet",
  "bitter",
  "caffeine",
  "decaf",
  "milk",
  "oat",
  "almond",
  "sugar",
  "menu",
  "order",
  "cart",
  "tray",
  "checkout",
  "pickup",
  "pick up",
  "deliver",
  "location",
  "branch",
  "address",
  "direction",
  "hour",
  "open",
  "close",
  "price",
  "cost",
  "cheap",
  "budget",
  "$",
  "৳",
  "taka",
  "reward",
  "bean",
  "point",
  "tier",
  "offer",
  "promo",
  "discount",
  "coupon",
  "voucher",
  "deal",
  "redeem",
  "earn",
  "reserv",
  "table",
  "booking",
  "party size",
  "allerg",
  "vegan",
  "vegetarian",
  "gluten",
  "dairy",
  "lactose",
  "nut",
  "ingredient",
  "recipe",
  "nutrition",
  "calorie",
  "wifi",
  "parking",
  "pet",
  "event",
  "workshop",
  "masterclass",
  "class",
  "story",
  "founder",
  "team",
  "sustainab",
  "compost",
  "eco",
  "career",
  "hiring",
  "job",
  "contact",
  "phone",
  "email",
  "subscrib",
  "newsletter",
  "account",
  "sign in",
  "signin",
  "sign up",
  "signup",
  "profile",
  "favorite",
  "history",
  "website",
  "webpage",
  "navigate",
  "recommend",
  "suggest",
  "craving",
  "crave",
  "prefer",
  "kha",
  // Bangla anchors for Dhaka guests
  "কফি",
  "মেনু",
  "অর্ডার",
  "দাম",
  "ঠিকানা",
  "খোলা",
  "বন্ধ",
  "অফার",
  "কোথায়",
  "কখন",
];

/** Out-of-domain patterns — weight 2 each (distinct). */
const OUT_PATTERNS: RegExp[] = [
  /\bpython\b|\bjavascript\b|\btypescript\b|\bjava\b|\bc\+\+\b|\bsql\b|\bhtml\b|\bcss\b/,
  /\bcode\b(?!\s*(reader|scanner))/, // "promo/discount/voucher/coupon/qr/barcode" stripped first
  /\bprogram\b/, // "rewards/loyalty program" stripped first
  /\bdebug\b|\bregex\b|\balgorithm\b|\bfunction\b|\bscript\b/,
  /\bhomework\b|\bassignment\b|\bexam\b|\bthesis\b|\bpresentation\b/,
  /\bmath\b|\balgebra\b|\bcalculus\b|\bequation\b|\bintegral\b/,
  /\bsolve\b|\bcalculate\b/,
  /\d+\s*[+\-*/^%]\s*\d+/,
  /\bpolitics\b|\bpolitical\b|\belection\b|\bpresident\b|\bminister\b|\bnews\b/,
  /\bjoke\b|\bfunny\b|\bmeme\b/,
  /\bessay\b|\bpoem\b|\bstory\b/, // "our/brand/luma story" stripped first
  /\bhistory\b/, // "order history" stripped first
  /\bbook\b/, // "book a table"/booking stripped first
  /\bwho\s+(is|was|are)\b/,
  /\bcapital\s+of\b/,
  /\bmeaning\s+of\s+life\b/,
  /\brelationship\s+advice\b|\bdating\b/,
  /\bclimate\s+change\b/,
  /\bcelebrity\b|\bkardashian\b|\bmusk\b|\belon\b/,
  /\bmovie\b|\bfilm\b|\bsong\b|\bmusic\b|\bnovel\b|\bauthor\b|\bgame\b|\bcricket\b|\bfootball\b/,
  /\bpizza\b|\bburger\b|\bsushi\b|\bbiryani\b|\bkacchi\b|\bpasta\b/,
  /পিজ্জা|বার্গার/,
  /\bother\s+(restaurant|café|cafe|coffee)\b|\banother\s+restaurant\b/,
  /\bstarbucks\b|\bnorth\s+end\b|\bthird\s+wave\b/,
  /\bfoodpanda\b|\bpathao\b|\bhungrynaki\b/,
  /\bbank\b|\bloan\b|\binsurance\b|\bstock\b|\bcrypto\b/,
  /\bvisa\b|\bpassport\b|\btravel\b|\bflight\b|\bhotel\b/,
  /\bdoctor\b|\bmedicine\b|\bdisease\b|\bhospital\b|\blawyer\b|\bcourt\b/,
  /\bpowerpoint\b|\bphotoshop\b|\bexcel\b/,
  /\bspeech\b/,
];

/** Phrases stripped before matching (they contain out-words innocently). */
const STRIP_PHRASES = [
  "promo code",
  "discount code",
  "voucher code",
  "coupon code",
  "qr code",
  "bar code",
  "barcode",
  "rewards program",
  "loyalty program",
  "program terms",
  "our story",
  "brand story",
  "luma story",
  "your story",
  "tell me about",
  "order history",
  "book a table",
];

/** Known in-domain intents — weight 2 (compensates for stripping above). */
const IN_PHRASES = [
  "promo code",
  "discount code",
  "voucher code",
  "coupon code",
  "rewards program",
  "loyalty program",
  "order history",
  "book a table",
  "our story",
  "brand story",
  "sign in",
  "sign up",
];

export function checkScope(message: string): { verdict: ScopeVerdict } {
  const raw = message.toLowerCase().trim();
  if (!raw) return { verdict: "unsure" };

  let text = raw;
  for (const phrase of STRIP_PHRASES) {
    text = text.split(phrase).join(" ");
  }

  let inScore = 0;
  for (const phrase of IN_PHRASES) {
    if (raw.includes(phrase)) inScore += 2;
  }
  for (const anchor of ANCHORS) {
    if (text.includes(anchor)) {
      inScore += 3;
      break; // one anchor is enough to ground the message
    }
  }
  if (inScore === 0) {
    for (const word of DOMAIN_WORDS) {
      if (text.includes(word)) inScore += 1;
    }
  }

  let outScore = 0;
  for (const pattern of OUT_PATTERNS) {
    if (pattern.test(text)) outScore += 2;
  }

  // "best X in <place>" without a café anchor is still answered by the model
  // under strict Luma-only framing rules — never refused here.

  if (outScore > 0 && inScore < 3) return { verdict: "out" };
  if (inScore > 0) return { verdict: "in" };
  return { verdict: "unsure" };
}
