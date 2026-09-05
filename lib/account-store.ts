/**
 * Demo member accounts for Luma Circle.
 *
 * These stand in for a real customer database until production auth lands.
 * Account tools ONLY ever resolve the member id from the signed-in session
 * cookie — never from user input — so one guest can never see another's data.
 */

export interface MemberOrder {
  id: string;
  date: string;
  items: string[];
  total: number;
  beansEarned: number;
  channel: string;
}

export interface Member {
  id: string;
  name: string;
  tier: string;
  beans: number;
  beansToNextTier: number;
  nextTier: string;
  memberSince: string;
  barcode: string;
  favorites: string[];
  orders: MemberOrder[];
}

export const MEMBERS: Member[] = [
  {
    id: "member-rayan",
    name: "Rayan Siddiqui",
    tier: "Gold Brewmaster",
    beans: 1240,
    beansToNextTier: 260,
    nextTier: "Diamond Connoisseur",
    memberSince: "Nov 2023",
    barcode: "4920-8849-01",
    favorites: ["yirgacheffe-pourover", "velvet-cappuccino", "almond-croissant"],
    orders: [
      {
        id: "#2890",
        date: "Today, 8:42 AM",
        items: ["Flat White (Oat Milk)", "Cardamom Braid"],
        total: 8.3,
        beansEarned: 48,
        channel: "Mobile Pick-up · Mirpur 10",
      },
      {
        id: "#2741",
        date: "Nov 18, 4:15 PM",
        items: ["Single-Origin Pour Over (Kenya Nyeri)"],
        total: 5.25,
        beansEarned: 26,
        channel: "In-Store · Gulshan 2",
      },
      {
        id: "#2611",
        date: "Nov 04, 9:05 AM",
        items: ["2× Colombia Geisha Washed 250g"],
        total: 33.0,
        beansEarned: 180,
        channel: "Mirpur 10 Brew Bar",
      },
    ],
  },
  {
    id: "member-samira",
    name: "Samira Khan",
    tier: "Silver Origin",
    beans: 320,
    beansToNextTier: 180,
    nextTier: "Gold Brewmaster",
    memberSince: "Jun 2024",
    barcode: "7712-0093-44",
    favorites: ["uji-matcha", "heirloom-avocado-toast"],
    orders: [
      {
        id: "#2810",
        date: "Nov 20, 10:15 AM",
        items: ["Ceremonial Uji Matcha", "Avocado Toast"],
        total: 12.0,
        beansEarned: 62,
        channel: "Mobile Pick-up · Mirpur 10",
      },
    ],
  },
];

export function getMember(id: string | null | undefined): Member | undefined {
  if (!id) return undefined;
  return MEMBERS.find((m) => m.id === id);
}

/** Public (non-sensitive) member card for the UI. */
export function toMemberCard(member: Member) {
  return {
    id: member.id,
    name: member.name,
    tier: member.tier,
    beans: member.beans,
  };
}
