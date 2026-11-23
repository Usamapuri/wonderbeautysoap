// POST /api/enquiry — the contact form's transport (slide 29 of the client's error deck: "It should send
// message directly to our email"). Validates the same fields as the form, drops honeypot hits silently,
// applies a simple rate limit, then sends the enquiry by e-mail through Resend when RESEND_API_KEY is set.
// Without it, a configured Formspree form (NEXT_PUBLIC_FORMSPREE_ID) takes the enquiry from the browser as
// before; with neither, it answers "unavailable" and the form says so. There is no email-app fallback.
// Once the enquiry has reached the inbox (and only then) the visitor gets one short confirmation from hello@
// (fixed text, see src/content/contact.ts enquiryConfirmation); if that fails the enquiry still counts as sent.

import { integrations, site } from "@/content/site"
import { enquirySchema, enquirySubject, fieldErrors, HONEYPOT, productLabel, typeLabel, type FormResult } from "@/lib/forms"
import { claimConfirmation, confirmationFrom, confirmationMail, json, rateLimited, readJson, resendConfig, sendMail } from "@/lib/server/mail"

export async function POST(request: Request) {
  const reply = (body: FormResult, status = 200) => json(body, status)

  if (rateLimited("enquiry", request)) return reply({ status: "limited" }, 429)

  const data = await readJson(request)
  if (!data) return reply({ status: "invalid", errors: {} }, 400)

  // Honeypot filled: answer as if sent, deliver nothing.
  if (typeof data[HONEYPOT] === "string" && data[HONEYPOT].trim() !== "") return reply({ status: "sent" })

  const parsed = enquirySchema.safeParse(data)
  if (!parsed.success) return reply({ status: "invalid", errors: fieldErrors(parsed.error) }, 400)
  const enquiry = parsed.data

  const config = resendConfig()
  if (!config) {
    if (integrations.formspreeId) return reply({ status: "handoff", provider: "formspree" })
    return reply({ status: "unavailable" }, 503)
  }

  try {
    await sendMail(config, {
      subject: enquirySubject(enquiry),
      replyTo: enquiry.email,
      text: [
        enquiry.message,
        "",
        "—",
        `Name: ${enquiry.name}`,
        `Email: ${enquiry.email}`,
        `Enquiry type: ${typeLabel(enquiry.type)}`,
        `Product: ${productLabel(enquiry.product || "none")}`,
        `Consent to be contacted: ${enquiry.consent ? "Yes" : "No"}`,
        "",
        "Sent from the contact form on the website.",
      ].join("\n"),
    })
  } catch (error) {
    // The provider's status only; never the visitor's message or address.
    console.error("[enquiry] send failed:", error instanceof Error ? error.message : "unknown error")
    return reply({ status: "failed" }, 502)
  }

  // The auto-reply: fixed text, at most one per address per window, never echoing the visitor's fields.
  if (claimConfirmation(enquiry.email)) {
    try {
      await sendMail(config, { ...confirmationMail(enquiry.name), to: enquiry.email, from: confirmationFrom(), replyTo: site.email })
    } catch (error) {
      console.error("[enquiry] confirmation failed:", error instanceof Error ? error.message : "unknown error")
    }
  }
  return reply({ status: "sent" })
}
