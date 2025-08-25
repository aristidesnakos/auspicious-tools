import React from 'react';
import config from '../config';

// Define a type for JSON-LD schema objects
export type JsonLdSchema = Record<string, unknown>;

// Base Organization schema
export const getOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.appName,
    url: `https://${config.domainName}`,
    logo: `https://${config.domainName}/logo.png`,
    sameAs: [
      'https://twitter.com/just_aristides',
      // Add other social profiles here
    ]
  };
};

// Blog article schema
export const getBlogPostSchema = (article: {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  slug: string;
  image: {
    src: string;
    alt: string;
  };
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: article.image.src,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: config.appName,
      logo: {
        '@type': 'ImageObject',
        url: `https://${config.domainName}/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://${config.domainName}/blog/${article.slug}`
    }
  };
};


// BreadcrumbList schema
export const getBreadcrumbListSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://${config.domainName}${item.url}`
    }))
  };
};

// Component to render JSON-LD structured data
export const JsonLd = ({ data }: { data: JsonLdSchema }) => {
  // Remove undefined values from the data
  const cleanData = JSON.parse(
    JSON.stringify(data, (key, value) => (value === undefined ? null : value))
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanData) }}
    />
  );
};

// Tools page schema
export const getToolsPageSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Free Tools",
    "description": "A collection of free tools and utilities provided by The Auspicious Company, including SEO and Security tools.",
    "url": `https://${config.domainName}`,
    "isPartOf": {
      "@type": "WebSite",
      "name": config.appName,
      "url": `https://${config.domainName}`
    },
    "publisher": {
      "@id": `https://${config.domainName}/#organization`
    },
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Break Even Analysis Tool",
        "description": "Calculate when your business will break even with our interactive break-even analysis tool. Visualize your path to profitability.",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "url": `https://${config.domainName}/break-even`
      },
      {
        "@type": "SoftwareApplication",
        "name": "AI Token Cost Modeler",
        "description": "Calculate and compare costs across different AI models and providers, including OpenRouter LLMs.",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web",
        "url": `https://${config.domainName}/cost-modeler`
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
  };
};

// Helper to combine multiple schema objects
export const combineSchemas = (...schemas: JsonLdSchema[]): JsonLdSchema => {
  // Combine all schemas into a single object with @graph property
  return {
    '@context': 'https://schema.org',
    '@graph': schemas.filter(Boolean)
  };
};
