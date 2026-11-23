// The only place contact-form submissions are sent from the browser (brief §5.2). The form posts to
// /api/enquiry, which validates and e-mails it (Resend). Only when the server answers "handoff" does the
// browser post to Formspree itself, as it did before. There is no email-app (mailto) fallback: when nothing
// is configured the visitor is told the message could not be sent (client error deck, slide 29).

import { integrations } from "@/content/site"
import { enquirySubject, productLabel, typeLabel, HONEYPOT, type Enquiry, type FormResult } from "@/lib/forms"

export type { Enquiry }

export type EnquiryResult =
  | { status: "sent" }
  | { status: "unavailable" }
  | { status: "invalid"; errors: Record<string, string> }
  /** Network or provider failure, or too many attempts: worth trying again later. */
  | { status: "error" }

export async function submitEnquiry(enquiry: Enquiry, honeypot = ""): Promise<EnquiryResult> {
  let result: FormResult
  try {
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...enquiry, [HONEYPOT]: honeypot }),
    })
    result = (await res.json()) as FormResult
  } catch {
    return { status: "error" }
  }

  switch (result.status) {
    case "sent":
    case "unavailable":
    case "invalid":
      return result
    case "handoff":
      return integrations.formspreeId ? sendToFormspree(integrations.formspreeId, enquiry, honeypot) : { status: "unavailable" }
    default:
      return { status: "error" }
  }
}

async function sendToFormspree(id: string, enquiry: Enquiry, honeypot: string): Promise<EnquiryResult> {
  try {
    const res = await fetch(`https://formspree.io/f/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: enquiry.name,
        email: enquiry.email,
        _replyto: enquiry.email,
        _subject: enquirySubject(enquiry),
        enquiryType: typeLabel(enquiry.type),
        product: productLabel(enquiry.product || "none"),
        message: enquiry.message,
        consent: enquiry.consent ? "Yes" : "No",
        _gotcha: honeypot,
      }),
    })
    return res.ok ? { status: "sent" } : { status: "error" }
  } catch {
    return { status: "error" }
  }
}
