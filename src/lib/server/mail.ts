// Server-side mail for the contact form and the sign-up list. Read only by the route handlers in
// src/app/api/; the settings below are server environment variables and never reach the browser.
//
//   RESEND_API_KEY  Resend API key (https://resend.com). Without it nothing is sent from the server.
//   ENQUIRY_TO      inbox that receives enquiries and sign-ups; defaults to site.email.
//   ENQUIRY_FROM    sender, e.g. "Royal Basket website <website@royalbasketgroup.com>", on a domain verified
//                   in Resend. Defaults to Resend's test sender, which only delivers to the Resend account's
//                   own address, so set it for real delivery.
//   ENQUIRY_CONFIRM_FROM  optional sender of the visitor's confirmation; defaults to
//                   "Royal Basket Group <hello@royalbasketgroup.com>" (site.company and site.email).
//
// Nothing here logs a visitor's message or address.

import "server-only"

import { enquiryConfirmation } from "@/content/contact"
import { site } from "@/content/site"

const RESEND_ENDPOINT = "https://api.resend.com/emails"

export type MailConfig = { apiKey: string; to: string; from: string }

export function resendConfig(): MailConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) return null
  return {
    apiKey,
    to: process.env.ENQUIRY_TO?.trim() || site.email,
    from: process.env.ENQUIRY_FROM?.trim() || `${site.brand} website <onboarding@resend.dev>`,
  }
}

/** `to`/`from` default to the inbox and the configured sender. `html` adds an HTML alternative. */
export type Mail = { subject: string; text: string; html?: string; replyTo?: string; to?: string; from?: string }

/** Sends one e-mail through Resend's HTTPS API. Throws on any non-2xx answer. */
export async function sendMail(config: MailConfig, mail: Mail): Promise<void> {
  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: mail.from ?? config.from,
      to: [mail.to ?? config.to],
      subject: mail.subject,
      text: mail.text,
      ...(mail.html && { html: mail.html }),
      ...(mail.replyTo && { reply_to: mail.replyTo }),
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  })
  // Status only: the response body may echo the message.
  if (!res.ok) throw new Error(`Resend responded ${res.status}`)
}

// ---- The visitor's confirmation (auto-reply) -------------------------------------------------------------

/**
 * The first name for the greeting, or null. Strict, because the address may not be the sender's own: the
 * whole name may hold only letters (any script), plain spaces, hyphens and apostrophes, so digits, "@", URLs,
 * line breaks and angle brackets all fail; its first word must be 1–40 characters with at least one letter.
 */
export function greetingName(name: string): string | null {
  const raw = name.trim()
  if (!raw || !/^[\p{L}\p{M} '’-]+$/u.test(raw)) return null
  const first = raw.split(" ").find(Boolean) ?? ""
  if (first.length < 1 || first.length > 40 || !/\p{L}/u.test(first)) return null
  return first
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string)

/** The fixed confirmation text (src/content/contact.ts), as plain text and a minimal HTML alternative. */
export function confirmationMail(name: string): Pick<Mail, "subject" | "text" | "html"> {
  const c = enquiryConfirmation
  const greeting = c.greeting(greetingName(name))
  const text = [greeting, "", ...c.paragraphs.flatMap((p) => [p, ""]), c.signOff, ...c.signature].join("\n")
  const p = (body: string, margin = "0 0 16px") => `<p style="margin:${margin}">${escapeHtml(body)}</p>`
  const html = [
    `<!doctype html><html lang="en"><body style="margin:0;padding:0;background:#f6f2e8">`,
    `<div style="max-width:560px;margin:0 auto;padding:32px 24px;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.7;color:#25231d;background:#f6f2e8">`,
    p(greeting),
    ...c.paragraphs.map((body) => p(body)),
    `<hr style="border:0;border-top:1px solid #d8cfbd;margin:24px 0">`,
    p(c.signOff, "0 0 4px"),
    `<p style="margin:0">${c.signature.map(escapeHtml).join("<br>")}</p>`,
    `</div></body></html>`,
  ].join("")
  return { subject: c.subject, text, html }
}

/** Sender of the confirmation: ENQUIRY_CONFIRM_FROM, or "<company> <site e-mail>". Replies go to site.email. */
export const confirmationFrom = () => process.env.ENQUIRY_CONFIRM_FROM?.trim() || `${site.company} <${site.email}>`

// At most one confirmation per recipient address per window (best effort, per server instance), so the form
// cannot be used to send repeated mail to someone else's address.
const CONFIRM_WINDOW_MS = 30 * 60 * 1000
const confirmed = new Map<string, number>()

export function claimConfirmation(address: string): boolean {
  const key = address.trim().toLowerCase()
  const now = Date.now()
  if (confirmed.size > 5000) for (const [k, t] of confirmed) if (now - t > CONFIRM_WINDOW_MS) confirmed.delete(k)
  const last = confirmed.get(key)
  if (last !== undefined && now - last < CONFIRM_WINDOW_MS) return false
  confirmed.set(key, now)
  return true
}

// A simple fixed-window limit per visitor and route. It lives in the server instance's memory, so on
// Vercel each instance counts separately: a brake on floods from one address, not a hard quota.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, { count: number; start: number }>()

export function rateLimited(route: string, request: Request): boolean {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown"
  const key = `${route}:${ip}`
  const now = Date.now()
  if (hits.size > 5000) for (const [k, v] of hits) if (now - v.start > WINDOW_MS) hits.delete(k)
  const entry = hits.get(key)
  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(key, { count: 1, start: now })
    return false
  }
  entry.count += 1
  return entry.count > MAX_PER_WINDOW
}

/** Reads a JSON body, or null if it is missing, too large or not an object. */
export async function readJson(request: Request, maxBytes = 20_000): Promise<Record<string, unknown> | null> {
  try {
    const text = await request.text()
    if (text.length > maxBytes) return null
    const data: unknown = JSON.parse(text)
    return data && typeof data === "object" && !Array.isArray(data) ? (data as Record<string, unknown>) : null
  } catch {
    return null
  }
}

export const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } })
