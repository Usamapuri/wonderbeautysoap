// Site-wide values. Sources: implementation-plan.md Appendix A (master data) and the client's
// Wonder_Website_Brief.pptx (2026-10-25: taglines, tab names, footer line). Developer decision
// 2026-10-25: the site's brand is Royal Basket (Group); Wonder is the soap. The site targets bulk
// orders only, so every call to action leads to the bulk-order enquiry.
// Edit here only — every page and component reads from this file.

// The site's canonical origin, the ONE place the domain is written. Everything else derives from it:
// metadataBase (and with it every canonical link and the og:image URL), robots.txt and sitemap.xml.
// www is the primary domain on Vercel (set by the owner on 2026-11-23); the apex redirects to it at the
// platform level, so no host redirect exists in next.config.ts (one there would loop).
const url = "https://www.royalbasketgroup.com"

export const site = {
  brand: "Royal Basket",
  productLine: "Wonder Beauty Bar",
  company: "Royal Basket Group",
  domain: new URL(url).host,
  url,
  email: "hello@royalbasketgroup.com",
  founded: 2019,
  topline: "Everyday luxury, within reach",
  // Deck slide 20 "Taglines and lines to place on the site" — spread through the pages.
  taglines: {
    hero: "Scent, Lather, Wonder",
    everyScent: "Every scent tells a story",
    everydayLuxury: "Everyday luxury, within reach",
    celebration: "Lather that feels like a little celebration",
    wherever: "Wonder, wherever you are",
    footer: "Made with care, from us to you",
    // Brand promises (slides 20 + 24).
    promises: ["Fragrance", "Premium quality", "Good lather"],
    promiseWords: ["Scent", "Glow", "Wonder"],
    // On-pack claim lines (brief §0 rule 4) — keep exactly.
    formula: "Triple Action Formula — Glow | Hydrate | Protect",
    formulaShort: "Triple Action Formula — Glow · Hydrate · Protect",
    // The three on-pack words alone (Home promise strip, audit slide 8).
    formulaWords: ["Glow", "Hydrate", "Protect"],
    dermatologist: "Dermatologist Recommended",
  },
  aiDisclaimer:
    "These AI-generated images are campaign concepts created to explore the Wonder world. They are not documentary photographs, customer images or claims about where the products are sold.",
  seo: {
    title: "Royal Basket — Scent, Lather, Wonder",
    // The Home welcome's lines, as replaced by the Website Audit deck (2026-11-20, slide 9).
    description:
      "Wonder is a premium quality soap brand, made with a promise to hydrate, moisturise and protect your skin. Designed with love and attention.",
  },
} as const

// Browser-side third-party endpoints (brief §5). Public values, not secrets; NEXT_PUBLIC_ values are
// inlined at build time, so changing them needs a redeploy. The server-side mail settings (RESEND_API_KEY,
// ENQUIRY_TO, ENQUIRY_FROM) are read only in src/lib/server/mail.ts. See DELIVERY-NOTES "Form and list".
export const integrations = {
  // Formspree form ID, e.g. "xyzabcde" from https://formspree.io/f/xyzabcde. Used for the contact form
  // only when the server has no Resend key (/api/enquiry decides). There is no email-app fallback.
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? null,
  // Mailchimp embedded-form action URL (Audience → Signup forms → Embedded form), e.g.
  // https://<dc>.list-manage.com/subscribe/post?u=<u>&id=<id>&f_id=<f>. When set, the pop-up signs people
  // up there; otherwise /api/subscribe emails each sign-up to the enquiry inbox (needs RESEND_API_KEY).
  mailchimpAction: process.env.NEXT_PUBLIC_MAILCHIMP_ACTION ?? null,
}

export const socials = [
  { name: "Instagram", handle: "@wonderbeautysoap", href: "https://www.instagram.com/wonderbeautysoap" },
  { name: "TikTok", handle: "@royal_basket_group", href: "https://www.tiktok.com/@royal_basket_group" },
  { name: "Facebook", handle: "Wonder Beauty Soap", href: "https://www.facebook.com/share/1KZhQyQ8e8/?mibextid=wwXIfr" },
] as const

export type Social = (typeof socials)[number]

// The deck's five tabs, in order (slide 2). "In the city" is now "Around the World" (old URL
// redirects in next.config.ts). The Collection is a plain link to /collection (owner 2026-11-21; the
// earlier dropdown of the five bars was removed).
/** `cta`: shown as the header's button (owner request 2026-11-21). Every other item is a plain link. */
export type NavItem = { label: string; href: string; cta?: true }

export const nav: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/our-story" },
  { label: "The Collection", href: "/collection" },
  { label: "Around the World", href: "/around-the-world" },
  { label: "Get in Touch", href: "/contact", cta: true },
]

// The one call to action: bulk orders (deck slide 28 wording; slide 17 "Bulk orders, talk to us").
export const ordersCta = { label: "For orders, speak to us", short: "Bulk orders", href: "/contact?type=bulk" } as const

/** Each flavour's own page (deck slide 17: "Each product page needs …"). */
export const barHref = (slug: string) => `/collection/${slug}`
