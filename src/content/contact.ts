// Get in Touch page copy (brief §4.5, §5.2; client website brief deck slide 19).
// Phone / WhatsApp / address / response time are shown only once the client supplies them —
// set them here (null = hidden). Never invent contact details or an SLA.

import { products } from "./products"

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
    title: { before: "Let's ", emphasis: "talk." },
    body: "We'd be glad to hear from you. Choose the way that feels easiest.",
  },
  details: {
    emailLabel: "Email",
    replyLine: "We reply to questions and business opportunities by email.",
    phone: null as string | null,
    whatsapp: null as string | null,
    address: null as string | null,
    goodToKnow: {
      label: "Good to know",
      text: "Royal Basket is not able to offer medical advice. If you have a skin concern, please speak with a qualified healthcare professional.",
    },
  },
  bulk: {
    eyebrow: "Bulk & trade",
    heading: ["Bulk orders", "& stockists."],
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
      consent: "You may contact me about my enquiry",
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
    success: { heading: "Thank you", body: "Thank you — we'll reply by email." },
    mailtoSuccess: {
      heading: "Almost there",
      body: "Your email app should have opened with your enquiry ready to send. If it didn't, email us directly at",
    },
    error: { heading: "Something went wrong", body: "Your enquiry couldn't be sent.", retry: "Try again", fallback: "Or email us directly at" },
    another: "Send another enquiry",
  },
  // Response-time line — client-confirmed wording only (§4.5 #4). null = omitted.
  responseTime: null as string | null,
  social: {
    eyebrow: "Keep in touch",
    heading: "Wonder, in your feed.",
  },
} as const
