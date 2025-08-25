import { ConfigProps } from "@/types/config";

const config = {
  appName: "The Auspicious Company",
  appDescription:
    "A collection of free tools and utilities provided by The Auspicious Company, including SEO and Security tools.",
  keywords: ["tools", "utilities", "free", "open source", "AI", "SEO", "business"],
  domainName: "www.theauspiciouscompany.com",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (resend.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    plans: [
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1O5KtcAxyNprDp7iftKnrrpw"
            : "price_1PuEe7LWOx2Oj7mbQVZpf4rg",
        // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
        isFeatured: true,
        name: "Testimonial Pro",
        description: "Transform feedback into powerful social proof",
        price: 149,
        priceAnchor: 299,
        features: [
          { name: "Export unlimited testimonials for up to 5 products" },
          { name: "AI-powered testimonial formatting and highlights" },
          { name: "One-click export to website widgets" },
          { name: "Custom branding and styling options" },
          { name: "Priority product featuring in marketplace" },
          { name: "Export to PDF/Social media formats" }
        ],
      }
    ],
  },
  resend: {
    fromNoReply: `The Auspicious Company Support <support@theauspiciouscompany.com>`,
    fromAdmin: `Ari at The Auspicious Company <ari@theauspiciouscompany.com>`,
    supportEmail: "ari@theauspiciouscompany.com",
    forwardRepliesTo: "ari@theauspiciouscompany.com",
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/signin",
    // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
    callbackUrl: "/",
  },
  spacy : {
    ADJ: 'adjective',
    ADP: 'adposition',
    ADV: 'adverb',
    AUX: 'auxiliary',
    CCONJ: 'coordinating conjunction',
    DET: 'determiner',
    INTJ: 'interjection',
    NOUN: 'noun',
    NUM: 'numeral',
    PART: 'particle',
    PRON: 'pronoun',
    PROPN: 'proper noun',
    PUNCT: 'punctuation',
    SCONJ: 'subordinating conjunction',
    SYM: 'symbol',
    VERB: 'verb',
    X: 'other'
  }
} as ConfigProps;

export default config;
