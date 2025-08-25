import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Break Even Analysis - The Auspicious Company",
  description: "Calculate when your business will break even with our interactive break-even analysis tool. Visualize your path to profitability.",
};

export default function BreakEvenLayout({ children }: { children: ReactNode }) {
  return children;
}