// Site-wide values. Source of truth: implementation-plan.md, Appendix A (Master data).
// Edit here only — every page and component reads from this file.

export const site = {
  brand: "Wonder Beauty Soap",
  productLine: "Wonder Beauty Bar",
  company: "Royal Basket Group",
  domain: "www.royalbasketgroup.com",
  url: "https://www.royalbasketgroup.com",
  email: "hello@royalbasketgroup.com",
  founded: 2019,
  heroHeadline: "A little everyday wonder.",
  topline: "Wonder Beauty Soap · A beauty bar for every day",
  taglines: {
    formula: "Triple Action Formula — Glow | Hydrate | Protect",
    formulaShort: "Triple Action Formula — Glow · Hydrate · Protect",
    dermatologist: "Dermatologist Recommended",
  },
  cityDisclaimer:
    "These AI-generated images are campaign concepts created to explore the Wonder world. They are not documentary photographs, customer images or claims about where the products are sold.",
  seo: {
    title: "Wonder Beauty Soap — five botanical varieties",
    description:
      "Discover Wonder Beauty Soap: five botanical varieties in gold-and-white packaging. Explore Coconut, Aloe Vera, Lemon, Lavender and Rose.",
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

// Order and labels as on the original site (developer decision 2026-10-21; brief §4 order not used).
export const nav = [
  { label: "Home", href: "/" },
  { label: "In the city", href: "/in-the-city" },
  { label: "Our story", href: "/our-story" },
  { label: "The collection", href: "/collection" },
  { label: "Contact", href: "/contact" },
] as const
