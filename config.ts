import { ConfigProps } from "@/types/config";

const config = {
  appName: "The Auspicious Company",
  appDescription:
    "A collection of free tools and utilities provided by The Auspicious Company, including SEO and Security tools.",
  keywords: ["tools", "utilities", "free", "open source", "AI", "SEO", "business"],
  domainName: "www.theauspiciouscompany.com",
  resend: {
    fromNoReply: `The Auspicious Company Support <support@theauspiciouscompany.com>`,
    fromAdmin: `Ari at The Auspicious Company <ari@theauspiciouscompany.com>`,
    supportEmail: "ari@theauspiciouscompany.com",
    forwardRepliesTo: "ari@theauspiciouscompany.com",
  }
} as ConfigProps;

export default config;
