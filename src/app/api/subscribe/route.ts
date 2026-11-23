// POST /api/subscribe — the email pop-up's list (slide 30 of the client's error deck: "The subscriber list
// is not working"). Same checks as /api/enquiry (validation, honeypot, rate limit). When a Mailchimp form is
// configured (NEXT_PUBLIC_MAILCHIMP_ACTION) the browser signs up there as before; otherwise, when
// RESEND_API_KEY is set, each sign-up is e-mailed to the enquiry inbox so the client receives every address.
// With neither, it answers "unavailable" and the pop-up says so honestly.

import { integrations, site } from "@/content/site"
import { fieldErrors, HONEYPOT, subscribeSchema, type FormResult } from "@/lib/forms"
import { json, rateLimited, readJson, resendConfig, sendMail } from "@/lib/server/mail"

export async function POST(request: Request) {
  const reply = (body: FormResult, status = 200) => json(body, status)

  if (rateLimited("subscribe", request)) return reply({ status: "limited" }, 429)

  const data = await readJson(request, 2_000)
  if (!data) return reply({ status: "invalid", errors: {} }, 400)

  if (typeof data[HONEYPOT] === "string" && data[HONEYPOT].trim() !== "") return reply({ status: "sent" })

  const parsed = subscribeSchema.safeParse({ email: typeof data.email === "string" ? data.email.trim() : data.email })
  if (!parsed.success) return reply({ status: "invalid", errors: fieldErrors(parsed.error) }, 400)

  if (integrations.mailchimpAction) return reply({ status: "handoff", provider: "mailchimp" })

  const config = resendConfig()
  if (!config) return reply({ status: "unavailable" }, 503)

  try {
    await sendMail(config, {
      subject: "New Wonder list sign-up",
      replyTo: parsed.data.email,
      text: [
        "Someone joined the Wonder list from the website pop-up.",
        "",
        `Email: ${parsed.data.email}`,
        "",
        `Add this address to your mailing list. (Sent by ${site.domain}.)`,
      ].join("\n"),
    })
    return reply({ status: "sent" })
  } catch (error) {
    console.error("[subscribe] send failed:", error instanceof Error ? error.message : "unknown error")
    return reply({ status: "failed" }, 502)
  }
}
