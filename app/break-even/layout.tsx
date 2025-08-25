import { ReactNode } from "react";
import { Metadata } from "next";
import { JsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Break Even Analysis Chart - The Auspicious Company",
  description: "Calculate when your business will break even with our interactive break-even analysis tool. Visualize your path to profitability.",
};

export default function BreakEvenLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* JSON-LD Schema for Break Even Analysis */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Break Even Analysis Chart",
        "description": "Calculate when your business will break even with our interactive break-even analysis tool. Visualize your path to profitability.",
        "url": "https://tools.theauspiciouscompany.com/break-even",
        "image": "https://tools.theauspiciouscompany.com/assets/breakeven-analysis-chart.png",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "isPartOf": {
          "@type": "WebSite",
          "name": "The Auspicious Company",
          "url": "https://www.theauspiciouscompany.com"
        },
        "publisher": {
          "@id": "https://theauspiciouscompany.com/#organization"
        }
      }} />
      {children}
    </>
  );
}