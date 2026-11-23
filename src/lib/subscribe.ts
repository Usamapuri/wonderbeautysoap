// Email-list sign-up (brief §5.1; client error deck, slide 30). The pop-up posts to /api/subscribe, which
// validates the address and, with no Mailchimp form configured, e-mails it to the enquiry inbox (Resend).
// When a Mailchimp form is configured the server answers "handoff" and the browser signs up through
// Mailchimp's embedded-form endpoint as before. That endpoint has no CORS, so it uses its JSONP variant
// (`/subscribe/post-json?...&c=<callback>`). No API key.

import { integrations } from "@/content/site"
import { HONEYPOT, type FormResult } from "@/lib/forms"

export type SubscribeResult = "sent" | "unavailable" | "invalid" | "error"

export async function subscribe(email: string, honeypot = ""): Promise<SubscribeResult> {
  let result: FormResult
  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, [HONEYPOT]: honeypot }),
    })
    result = (await res.json()) as FormResult
  } catch {
    return "error"
  }
  switch (result.status) {
    case "sent":
    case "unavailable":
    case "invalid":
      return result.status
    case "handoff":
      if (!integrations.mailchimpAction) return "unavailable"
      try {
        await subscribeMailchimp(integrations.mailchimpAction, email)
        return "sent"
      } catch {
        return "error"
      }
    default:
      return "error"
  }
}

type MailchimpResponse = { result: "success" | "error"; msg: string }

async function subscribeMailchimp(action: string, email: string): Promise<void> {
  const url = new URL(action.replace("/subscribe/post?", "/subscribe/post-json?"))
  const u = url.searchParams.get("u")
  const id = url.searchParams.get("id")
  const callback = `wonderSubscribe_${Math.random().toString(36).slice(2)}`
  url.searchParams.set("EMAIL", email)
  url.searchParams.set(`b_${u}_${id}`, "") // Mailchimp's bot honeypot — must stay empty
  url.searchParams.set("c", callback)

  const response = await new Promise<MailchimpResponse>((resolve, reject) => {
    const script = document.createElement("script")
    const w = window as unknown as Record<string, unknown>
    const cleanup = () => {
      delete w[callback]
      script.remove()
      clearTimeout(timer)
    }
    const timer = setTimeout(() => {
      cleanup()
      reject(new Error("Mailchimp timed out"))
    }, 10_000)
    w[callback] = (data: MailchimpResponse) => {
      cleanup()
      resolve(data)
    }
    script.onerror = () => {
      cleanup()
      reject(new Error("Mailchimp request failed"))
    }
    script.src = url.toString()
    document.body.appendChild(script)
  })

  // "already subscribed" is a success from the visitor's point of view.
  if (response.result !== "success" && !/already subscribed/i.test(response.msg)) {
    throw new Error(response.msg)
  }
}
