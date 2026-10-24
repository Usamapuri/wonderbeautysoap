// Site-wide values. Sources: implementation-plan.md Appendix A (master data) and the client's
// Wonder_Website_Brief.pptx (2026-10-25: taglines, tab names, footer line). Developer decision
// 2026-10-25: the site's brand is Royal Basket (Group); Wonder is the soap. The site targets bulk
// orders only, so every call to action leads to the bulk-order enquiry.
// Edit here only — every page and component reads from this file.

export const site = {
  brand: "Royal Basket",
  productLine: "Wonder Beauty Bar",
  company: "Royal Basket Group",
  domain: "www.royalbasketgroup.com",
  url: "https://www.royalbasketgroup.com",
  email: "hello@royalbasketgroup.com",
  founded: 2019,
  topline: "Everyday luxury, within reach",
  // Deck slide 20 "Taglines and lines to place on the site" — spread through the pages.
  taglines: {
    hero: "Scent. Lather. Wonder.",
    everyScent: "Every scent tells a story.",
    everydayLuxury: "Everyday luxury, within reach.",
    celebration: "Lather that feels like a little celebration.",
    wherever: "Wonder, wherever you are.",
    footer: "Made with care, from us to you.",
    // Brand promises (slides 20 + 24).
    promises: ["Fragrance", "Premium quality", "Good lather"],
    promiseWords: ["Scent", "Glow", "Wonder"],
    // On-pack claim lines (brief §0 rule 4) — keep exactly.
    formula: "Triple Action Formula — Glow | Hydrate | Protect",
    formulaShort: "Triple Action Formula — Glow · Hydrate · Protect",
    dermatologist: "Dermatologist Recommended",
  },
  aiDisclaimer:
    "These AI-generated images are campaign concepts created to explore the Wonder world. They are not documentary photographs, customer images or claims about where the products are sold.",
  seo: {
    title: "Royal Basket — Scent. Lather. Wonder.",
    // Deck slide 5, first line.
    description:
      "Wonder is a Pakistani artisan soap brand, made with meticulous attention to detail and with both skin comfort and sensory pleasure in mind.",
  },
} as const

// Third-party endpoints (brief §5). Public URLs, not secrets. Set once the client's accounts exist (§9).
export const integrations = {
  // Formspree form ID, e.g. "xyzabcde" from https://formspree.io/f/xyzabcde. While null, the contact
  // form falls back to opening a pre-filled email draft to site.email.
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? null,
  // Mailchimp embedded-form action URL (Audience → Signup forms → Embedded form), e.g.
  // https://<dc>.list-manage.com/subscribe/post?u=<u>&id=<id>&f_id=<f>. While null, sign-ups fail
  // with the pop-up's error state — the site must not launch without it.
  mailchimpAction: process.env.NEXT_PUBLIC_MAILCHIMP_ACTION ?? null,
}

export const socials = [
  { name: "Instagram", handle: "@wonderbeautysoap", href: "https://www.instagram.com/wonderbeautysoap" },
  { name: "TikTok", handle: "@royal_basket_group", href: "https://www.tiktok.com/@royal_basket_group" },
  { name: "Facebook", handle: "Wonder Beauty Soap", href: "https://www.facebook.com/share/1KZhQyQ8e8/?mibextid=wwXIfr" },
] as const

export type Social = (typeof socials)[number]

// The deck's five tabs, in order (slide 2). "In the city" is now "Around the World" (old URL
// redirects in next.config.ts). The Collection opens a dropdown of the five bars (slide 23).
export type NavItem = { label: string; href: string; bars?: true }

export const nav: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/our-story" },
  { label: "The Collection", href: "/collection", bars: true },
  { label: "Around the World", href: "/around-the-world" },
  { label: "Get in Touch", href: "/contact" },
]

// The one call to action: bulk orders (deck slide 28 wording; slide 17 "Bulk orders, talk to us").
export const ordersCta = { label: "For orders, speak to us", short: "Bulk orders", href: "/contact?type=bulk" } as const

/** Each flavour's own page (deck slide 17: "Each product page needs …"). */
export const barHref = (slug: string) => `/collection/${slug}`
