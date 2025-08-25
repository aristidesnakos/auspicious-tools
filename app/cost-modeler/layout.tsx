import { ReactNode } from "react";
import { Metadata } from "next";
import { JsonLd } from "../../lib/jsonld";

export const metadata: Metadata = {
  title: "LLM Cost Visualizer - The Auspicious Company",
  description: "Estimate, compare, and visualize processing costs and pricing across 100+ models on OpenRouter.",
};

export default function CostModelerLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* JSON-LD Schema for LLM Cost Visualizer */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "LLM Cost Visualizer",
        "description": "Estimate, compare, and visualize processing costs and pricing across 400+ models on OpenRouter.",
        "url": "https://www.theauspiciouscompany.com/tools/cost-modeler",
        "image": "https://www.theauspiciouscompany.com/assets/llm-cost-modeler.png",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web",
        "isPartOf": {
          "@type": "WebSite",
          "name": "The Auspicious Company",
          "url": "https://www.theauspiciouscompany.com"
        },
        "publisher": {
          "@id": "https://theauspiciouscompany.com/#organization"
        },
        "video": {
          "@type": "VideoObject",
          "name": "This Tool Makes AI Credits Super Simple!",
          "description": "This Tool Makes AI Credits Super Simple!",
          "contentUrl": "https://youtu.be/Iw6ZDw71VkU"
        }
      }} />
      {children}
    </>
  );
}
