import type { Metadata } from "next";
import RewardsClient from "./RewardsClient";

export const metadata: Metadata = {
  title: "Luma Circle Rewards — Luma Café",
  description:
    "Earn beans on every cup, redeem handcrafted rewards, and climb from Silver Origin to Diamond Connoisseur.",
};

export default function RewardsPage() {
  return <RewardsClient />;
}
