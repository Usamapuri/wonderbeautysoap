// Validation shared by the browser forms and the server routes (/api/enquiry, /api/subscribe), so both
// check exactly the same fields with the same messages. No browser or server-only code here.

import { z } from "zod"

import { contact, enquiryTypes, productOptions, type EnquiryType } from "@/content/contact"
import { popup } from "@/content/popup"

const { errors } = contact.form
const typeValues = enquiryTypes.map((t) => t.value) as [EnquiryType, ...EnquiryType[]]
const productValues = productOptions.map((p) => p.value) as [string, ...string[]]

export const enquirySchema = z.object({
  name: z.string().trim().min(1, errors.name).max(200, errors.name),
  email: z.email(errors.email).max(320, errors.email),
  type: z.enum(typeValues, errors.type),
  // "" = no product chosen (sent as "none").
  product: z.union([z.enum(productValues), z.literal("")]),
  message: z.string().trim().min(10, errors.message).max(5000),
  consent: z.boolean().refine(Boolean, errors.consent),
})

export type Enquiry = z.infer<typeof enquirySchema>

export const subscribeSchema = z.object({
  email: z.email(popup.errors.invalid).max(320, popup.errors.invalid),
})

/** Name of the hidden honeypot field both forms send: people leave it empty, bots fill it. */
export const HONEYPOT = "_gotcha"

/** What the routes answer. `sent` also covers a honeypot hit (silently dropped, never delivered). */
export type FormResult =
  | { status: "sent" }
  /** Server mail is not set up, but a browser-side service is: the client hands off to it. */
  | { status: "handoff"; provider: "formspree" | "mailchimp" }
  /** Nothing is configured: nothing was sent, and the visitor is told so. */
  | { status: "unavailable" }
  | { status: "invalid"; errors: Record<string, string> }
  | { status: "limited" }
  | { status: "failed" }

export const typeLabel = (type: EnquiryType) => enquiryTypes.find((t) => t.value === type)?.label ?? type
export const productLabel = (product: string) => productOptions.find((p) => p.value === product)?.label ?? "Not specified"

/** Subject pattern the client triages by: `[Website] <Enquiry type> — <Name>`. */
export const enquirySubject = (e: Pick<Enquiry, "type" | "name">) => `[Website] ${typeLabel(e.type)} — ${e.name}`

/** First message per field, for showing next to the inputs. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {}
  for (const issue of error.issues) out[String(issue.path[0])] ??= issue.message
  return out
}
