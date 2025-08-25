import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tools = [
  {
    name: "Break Even Analysis Tool",
    description: "Calculate when your business will break even with our interactive break-even analysis tool. Visualize your path to profitability.",
    status: "Available",
    path: "/break-even",
    category: "Business",
    isExternal: false
  },
  {
    name: "AI Token Cost Modeler",
    description: "Calculate and compare costs across different AI models and providers",
    status: "Available",
    path: "/cost-modeler",
    category: "AI/ML",
    isExternal: false
  },
  {
    name: "Organic Google Traffic Checker",
    description: "Check the organic Google traffic and keywords for a website and see estimated traffic per keyword.",
    status: "Available",
    path: "https://findleads.agency/tools/organic-traffic-checker",
    category: "SEO",
    isExternal: true
  },
  {
    name: "Schema Markup Generator",
    description: "Create and validate structured data markup for your website to improve search engine visibility.",
    status: "Available",
    path: "https://findleads.agency/tools/schema-markup-generator",
    category: "SEO",
    isExternal: true
  },
  {
    name: "Meta Description Generator",
    description: "Automatically craft concise, SEO-friendly meta descriptions from a page or user-supplied text.",
    status: "Available",
    path: "https://findleads.agency/tools/meta-description-generator",
    category: "SEO",
    isExternal: true
  },
  {
    name: "Canonical Tag Generator",
    description: "Inspect existing canonical tags and generate normalized canonical URLs for one or more pages.",
    status: "Available",
    path: "https://findleads.agency/tools/canonical-tag-generator",
    category: "SEO",
    isExternal: true
  },
  {
    name: "robots.txt Validator",
    description: "Validate and test your robots.txt file to ensure search engines can properly crawl your website.",
    status: "Available",
    path: "https://findleads.agency/tools/robots-txt-validator",
    category: "SEO",
    isExternal: true
  },
  {
    name: "XML Sitemap Validator",
    description: "Validate XML sitemaps against protocol standards and check for common issues.",
    status: "Available",
    path: "https://findleads.agency/tools/xml-sitemap-validator",
    category: "SEO",
    isExternal: true
  },
  {
    name: "XML Sitemap Extractor",
    description: "Extract and analyze URLs from XML sitemaps, including support for sitemap indexes.",
    status: "Available",
    path: "https://findleads.agency/tools/xml-sitemap-extractor",
    category: "SEO",
    isExternal: true
  },
  {
    name: "Favicon Checker",
    description: "Check if your favicon meets Google&apos;s requirements for display in search results.",
    status: "Available",
    path: "https://findleads.agency/tools/favicon-checker",
    category: "SEO",
    isExternal: true
  },
  {
    name: "Organic YouTube Video Traffic",
    description: "Check the YouTube video results for a keyword and analyze their performance metrics.",
    status: "Available",
    path: "https://findleads.agency/tools/organic-youtube-traffic",
    category: "SEO",
    isExternal: true
  },
  {
    name: "HTTP Header Checker",
    description: "Check HTTP headers for a website and analyze security headers. Identify missing or insecure headers.",
    status: "Available",
    path: "https://findleads.agency/tools/http-header-checker",
    category: "Security",
    isExternal: true
  },
  {
    name: "Open Graph Tester",
    description: "Validate and test your Open Graph meta tags to ensure proper social media sharing.",
    status: "Available",
    path: "https://findleads.agency/tools/open-graph-tester",
    category: "SEO",
    isExternal: true
  }
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Free Tools</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of free tools and utilities provided by The Auspicious Company. 
            These tools are designed to help with various tasks and calculations.
          </p>
        </div>

        <div className="bg-card rounded-xl border shadow-sm p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Tool Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[120px]">Category</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[100px] text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tools.map((tool) => (
                <TableRow key={tool.name}>
                  <TableCell className="font-medium">{tool.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {tool.description}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      tool.category === 'AI/ML' ? 'bg-blue-50 text-blue-700 ring-blue-700/10' :
                      tool.category === 'SEO' ? 'bg-purple-50 text-purple-700 ring-purple-700/10' :
                      tool.category === 'Security' ? 'bg-orange-50 text-orange-700 ring-orange-700/10' :
                      tool.category === 'Business' ? 'bg-green-50 text-green-700 ring-green-700/10' :
                      'bg-gray-50 text-gray-700 ring-gray-700/10'
                    }`}>
                      {tool.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {tool.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm">
                      {tool.isExternal ? (
                        <a 
                          href={tool.path}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Use Tool
                        </a>
                      ) : (
                        <Link href={tool.path}>
                          Use Tool
                        </Link>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-muted/50 rounded-xl p-8">
            <h2 className="text-2xl font-semibold mb-4">Need Custom Automations?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Looking for more advanced automation solutions? Check out our premium 
              automation packages and custom development services.
            </p>
            <Button asChild size="lg">
              <a 
                href="https://arinakos.gumroad.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View Automations
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
