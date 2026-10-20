// Email-list sign-up via Mailchimp's embedded-form endpoint (brief §5.1). The plain endpoint has
// no CORS, so this uses its JSONP variant (`/subscribe/post-json?...&c=<callback>`). No API key.

import { integrations } from "@/content/site"

type MailchimpResponse = { result: "success" | "error"; msg: string }

export async function subscribe(email: string): Promise<void> {
  const action = integrations.mailchimpAction
  if (!action) throw new Error("Mailchimp is not configured (NEXT_PUBLIC_MAILCHIMP_ACTION)")

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
