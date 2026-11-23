// Get in Touch page copy (brief §4.5, §5.2; client website brief deck slide 19).
// Phone / WhatsApp / address / response time are shown only once the client supplies them —
// set them here (null = hidden). Never invent contact details or an SLA.

import { products } from "./products"
import { site } from "./site"

// Bulk order first and pre-selected: the site targets bulk orders only.
export const enquiryTypes = [
  { value: "bulk", label: "Bulk order" },
  { value: "stockist", label: "Stock the range" },
  { value: "general", label: "General question" },
  { value: "press", label: "Press / other" },
] as const

export type EnquiryType = (typeof enquiryTypes)[number]["value"]

export const productOptions = [
  ...products.map((p) => ({ value: p.slug, label: p.variety })),
  { value: "none", label: "Not product-specific" },
] as const

export const contact = {
  seo: {
    title: "Get in Touch",
    description: "Get in touch with Royal Basket for bulk orders of Wonder beauty bars.",
  },
  heading: {
    eyebrow: "A note, a question, a hello",
    title: { before: "Let’s ", emphasis: "talk" },
    body: "We’d be glad to hear from you. Choose the way that feels easiest.",
  },
  // The email reply line and the "Good to know" medical note were removed (audit slide 47).
  details: {
    emailLabel: "Email",
    phone: null as string | null,
    whatsapp: null as string | null,
    address: null as string | null,
  },
  bulk: {
    eyebrow: "Bulk & trade",
    heading: ["Bulk orders", "& stockists"],
    body: "For bulk orders, retail stocking and distribution enquiries, tell us a little about your business:",
    include: ["Your business name", "Where you are based", "Estimated quantity"],
    // Minimum order quantity, if any — client to confirm (§10). null = not shown.
    minimumOrder: null as string | null,
  },
  form: {
    eyebrow: "Your words, your way",
    heading: "Leave a message",
    fields: {
      name: "Your name",
      email: "Your email",
      type: "Enquiry type",
      typePlaceholder: "Choose one",
      product: "Product of interest",
      productHint: "(optional)",
      productPlaceholder: "Any bar",
      message: "Message",
      consent: "You may contact me about my enquiry.",
    },
    errors: {
      name: "Please tell us your name.",
      email: "Please enter a valid email address.",
      type: "Please choose an enquiry type.",
      message: "Please write a little more (at least 10 characters).",
      consent: "Please confirm we may contact you about your enquiry.",
    },
    submit: "Send enquiry",
    submitting: "Sending…",
    success: { heading: "Thank you", body: "Thank you — we’ll reply by email." },
    // No email-app (mailto) step any more (client error deck, slide 29): the "Almost there" panel is gone.
    // `unavailable`: no sending service is configured, so nothing was sent; `error`: the send failed. Both
    // end with the address shown as plain text, then a full stop (contact-form.tsx).
    unavailable: { heading: "Message not sent", body: "Sorry, we couldn’t send your message right now. Please email us at" },
    error: { heading: "Something went wrong", body: "Your enquiry couldn’t be sent.", retry: "Try again", fallback: "Or email us directly at" },
    another: "Send another enquiry",
  },
  // Response-time line — client-confirmed wording only (§4.5 #4). null = omitted.
  responseTime: null as string | null,
  social: {
    eyebrow: "Keep in touch",
    heading: "Wonder, in your feed",
  },
} as const

// The automatic confirmation e-mailed to a visitor after their enquiry reached the inbox (owner, 2026-11-24:
// "professional and client friendly and subtle"). Fixed text only: it never repeats what the visitor wrote,
// because anyone can type someone else's address. The greeting may use a first name that passes a strict
// check (src/lib/server/mail.ts); otherwise it reads "Hello,". Edit the wording here; both the plain-text and
// the HTML version are built from it.
export const enquiryConfirmation = {
  subject: "Thank you for getting in touch",
  greeting: (firstName: string | null) => (firstName ? `Hello ${firstName},` : "Hello,"),
  paragraphs: [
    `Thank you for contacting ${site.company}. We have received your message, and a member of our team will be in touch soon.`,
    "If there is anything you would like to add in the meantime, simply reply to this email.",
  ],
  signOff: "Warm regards,",
  signature: [site.company, site.domain],
} as const
