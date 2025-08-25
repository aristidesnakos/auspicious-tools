import { ReactNode } from "react";
import { Metadata } from "next";
import { JsonLd } from "./jsonld";

export const metadata: Metadata = {
  title: "Free Tools - The Auspicious Company",
  description: "A collection of free tools and utilities provided by The Auspicious Company, including SEO and Security tools.",
};

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* JSON-LD Schema for Tools Page */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Free Tools",
        "description": "A collection of free tools and utilities provided by The Auspicious Company, including SEO and Security tools.",
        "url": "https://www.theauspiciouscompany.com/tools",
        "isPartOf": {
          "@type": "WebSite",
          "name": "The Auspicious Company",
          "url": "https://www.theauspiciouscompany.com"
        },
        "publisher": {
          "@id": "https://theauspiciouscompany.com/#organization"
        },
        "mainEntity": [
          {
            "@type": "SoftwareApplication",
            "name": "AI Token Cost Modeler",
            "description": "Calculate and compare costs across different AI models and providers, including OpenRouter LLMs.",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Web",
            "url": "https://www.theauspiciouscompany.com/tools/cost-modeler"
          },
          {
            "@type": "SoftwareApplication",
            "name": "Organic Google Traffic Checker",
            "description": "Check the organic Google traffic and keywords for a website and see estimated traffic per keyword.",
            "applicationCategory": "SEOApplication",
            "operatingSystem": "Web",
            "url": "https://findleads.agency/tools/organic-traffic-checker"
          },
          {
            "@type": "SoftwareApplication",
            "name": "Schema Markup Generator",
            "description": "Create and validate structured data markup for your website to improve search engine visibility.",
            "applicationCategory": "SEOApplication",
            "operatingSystem": "Web",
            "url": "https://findleads.agency/tools/schema-markup-generator"
          },
          {
            "@type": "SoftwareApplication",
            "name": "Meta Description Generator",
            "description": "Automatically craft concise, SEO-friendly meta descriptions from a page or user-supplied text.",
            "applicationCategory": "SEOApplication",
            "operatingSystem": "Web",
            "url": "https://findleads.agency/tools/meta-description-generator"
          },
          {
            "@type": "SoftwareApplication",
            "name": "Canonical Tag Generator",
            "description": "Inspect existing canonical tags and generate normalized canonical URLs for one or more pages.",
            "applicationCategory": "SEOApplication",
            "operatingSystem": "Web",
            "url": "https://findleads.agency/tools/canonical-tag-generator"
          },
          {
            "@type": "SoftwareApplication",
            "name": "robots.txt Validator",
            "description": "Validate and test your robots.txt file to ensure search engines can properly crawl your website.",
            "applicationCategory": "SEOApplication",
            "operatingSystem": "Web",
            "url": "https://findleads.agency/tools/robots-txt-validator"
          },
          {
            "@type": "SoftwareApplication",
            "name": "XML Sitemap Validator",
            "description": "Validate XML sitemaps against protocol standards and check for common issues.",
            "applicationCategory": "SEOApplication",
            "operatingSystem": "Web",
            "url": "https://findleads.agency/tools/xml-sitemap-validator"
          },
          {
            "@type": "SoftwareApplication",
            "name": "XML Sitemap Extractor",
            "description": "Extract and analyze URLs from XML sitemaps, including support for sitemap indexes.",
            "applicationCategory": "SEOApplication",
            "operatingSystem": "Web",
            "url": "https://findleads.agency/tools/xml-sitemap-extractor"
          },
          {
            "@type": "SoftwareApplication",
            "name": "Favicon Checker",
            "description": "Check if your favicon meets Google's requirements for display in search results.",
            "applicationCategory": "SEOApplication",
            "operatingSystem": "Web",
            "url": "https://findleads.agency/tools/favicon-checker"
          },
          {
            "@type": "SoftwareApplication",
            "name": "Organic YouTube Video Traffic",
            "description": "Check the YouTube video results for a keyword and analyze their performance metrics.",
            "applicationCategory": "SEOApplication",
            "operatingSystem": "Web",
            "url": "https://findleads.agency/tools/organic-youtube-traffic"
          },
          {
            "@type": "SoftwareApplication",
            "name": "HTTP Header Checker",
            "description": "Check HTTP headers for a website and analyze security headers. Identify missing or insecure headers.",
            "applicationCategory": "SecurityApplication",
            "operatingSystem": "Web",
            "url": "https://findleads.agency/tools/http-header-checker"
          },
          {
            "@type": "SoftwareApplication",
            "name": "Open Graph Tester",
            "description": "Validate and test your Open Graph meta tags to ensure proper social media sharing.",
            "applicationCategory": "SecurityApplication",
            "operatingSystem": "Web",
            "url": "https://findleads.agency/tools/open-graph-tester"
          }
        ]
      }} />
      {children}
    </>
  );
}
