// The only place contact-form submissions are sent (brief §5.2). Swap the transport here
// (e.g. a route handler + Resend) without touching the page.

import { enquiryTypes, productOptions, type EnquiryType } from "@/content/contact"
import { integrations, site } from "@/content/site"

export type Enquiry = {
  name: string
  email: string
  type: EnquiryType
  product: string
  message: string
  consent: boolean
}

export type EnquiryResult = "sent" | "mailto"

const typeLabel = (type: EnquiryType) => enquiryTypes.find((t) => t.value === type)?.label ?? type
const productLabel = (product: string) => productOptions.find((p) => p.value === product)?.label ?? "Not specified"

/** Subject pattern the client triages by: `[Website] <Enquiry type> — <Name>`. */
export const enquirySubject = (e: Pick<Enquiry, "type" | "name">) => `[Website] ${typeLabel(e.type)} — ${e.name}`

export async function submitEnquiry(enquiry: Enquiry, honeypot = ""): Promise<EnquiryResult> {
  const subject = enquirySubject(enquiry)

  if (!integrations.formspreeId) {
    // Not wired yet: hand the visitor a pre-filled email draft instead (the starter's behaviour).
    const body = [
      enquiry.message,
      "",
      `Name: ${enquiry.name}`,
      `Email: ${enquiry.email}`,
      `Enquiry type: ${typeLabel(enquiry.type)}`,
      `Product: ${productLabel(enquiry.product)}`,
    ].join("\n")
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    return "mailto"
  }

  const res = await fetch(`https://formspree.io/f/${integrations.formspreeId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: enquiry.name,
      email: enquiry.email,
      _replyto: enquiry.email,
      _subject: subject,
      enquiryType: typeLabel(enquiry.type),
      product: productLabel(enquiry.product),
      message: enquiry.message,
      consent: enquiry.consent ? "Yes" : "No",
      _gotcha: honeypot,
    }),
  })
  if (!res.ok) throw new Error(`Formspree responded ${res.status}`)
  return "sent"
}
