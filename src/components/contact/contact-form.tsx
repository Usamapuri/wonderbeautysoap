"use client"

import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowRight, Loader2 } from "lucide-react"

import { Eyebrow } from "@/components/brand/eyebrow"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { SplitText } from "@/components/brand/split-text"
import { contact, enquiryTypes, productOptions, type EnquiryType } from "@/content/contact"
import { site } from "@/content/site"
import { submitEnquiry, type Enquiry } from "@/lib/enquiry"
import { enquirySchema, fieldErrors } from "@/lib/forms"
import { cn } from "@/lib/utils"

const { form } = contact
const typeValues = enquiryTypes.map((t) => t.value) as [EnquiryType, ...EnquiryType[]]
const productValues = productOptions.map((p) => p.value) as string[]

type Values = Omit<Enquiry, "type" | "product"> & { type: EnquiryType | ""; product: string }
type Errors = Partial<Record<keyof Values, string>>
// "sent": delivered. "unavailable": no sending service is configured, nothing was sent. "error": failed.
type Status = "idle" | "submitting" | "sent" | "unavailable" | "error"

// The site targets bulk orders only, so "Bulk order" is pre-selected (developer decision 2026-10-25).
const empty: Values = { name: "", email: "", type: "bulk", product: "", message: "", consent: false }

/** Marks that the visitor has engaged with the form — the email pop-up stays away after this (§5.1). */
const markTouched = () => {
  try {
    sessionStorage.setItem("wonder-contact-touched", "1")
  } catch {}
}

// Fields are light parchment wells so they read clearly on the card's warmer stone surface.
const inputClass = "h-auto rounded-lg border-ink/20 bg-parchment px-3 py-[13px] text-xs md:text-xs"
const labelClass = "type-label font-normal uppercase tracking-[0.12em]"

// §5.2 — validated enquiry form. ?product=<slug> and ?type=bulk pre-fill it (must render under <Suspense>).
export function ContactForm() {
  const params = useSearchParams()
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>("idle")
  const [honeypot, setHoneypot] = useState("")
  const panelRef = useRef<HTMLHeadingElement>(null)

  // Apply ?type= / ?product= whenever they change (adjusting state during render, not in an effect).
  const paramKey = `${params.get("type")}|${params.get("product")}`
  const [appliedKey, setAppliedKey] = useState<string | null>(null)
  if (appliedKey !== paramKey) {
    setAppliedKey(paramKey)
    const type = typeValues.find((t) => t === params.get("type"))
    const product = productValues.find((p) => p === params.get("product"))
    if (type || product) setValues((v) => ({ ...v, ...(type && { type }), ...(product && { product }) }))
  }

  useEffect(() => {
    if (status !== "idle" && status !== "submitting") panelRef.current?.focus()
  }, [status])

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const showErrors = (next: Errors) => {
    setErrors(next)
    document.getElementById(`enquiry-${Object.keys(next)[0]}`)?.focus()
  }

  async function send() {
    // The same schema the server checks (src/lib/forms.ts).
    const parsed = enquirySchema.safeParse(values)
    if (!parsed.success) return showErrors(fieldErrors(parsed.error) as Errors)
    setStatus("submitting")
    const result = await submitEnquiry(parsed.data, honeypot)
    if (result.status === "invalid") {
      setStatus("idle")
      if (Object.keys(result.errors).length) showErrors(result.errors as Errors)
      else setStatus("error")
      return
    }
    setStatus(result.status)
  }

  const reset = () => {
    setValues(empty)
    setErrors({})
    setStatus("idle")
  }

  // The address as plain, selectable text (client: "email app doesn't open. Just display our email").
  const address = <span className="font-medium text-ink select-all">{site.email}</span>

  return (
    // The right pane of the enquiry card on Get in Touch (the bulk brief is the left pane); the card
    // itself — frame, gold top bar, shadow — lives in the page.
    <section
      id="enquiry"
      aria-labelledby="enquiry-heading"
      className="scroll-mt-[calc(var(--header-height)+16px)] bg-linear-to-br from-stone via-stone to-wheat p-panel"
    >
      <Eyebrow>{form.eyebrow}</Eyebrow>
      <h2 id="enquiry-heading" className="font-display type-card mt-[18px] mb-6">
        <SplitText text={form.heading} now />
      </h2>

      {status === "sent" || status === "unavailable" || status === "error" ? (
        <div role="status" className="p-card rounded-lg border border-gold/50 bg-parchment">
          <h3 ref={panelRef} tabIndex={-1} className="font-display text-[32px] tracking-normal outline-none">
            {status === "sent" ? form.success.heading : status === "unavailable" ? form.unavailable.heading : form.error.heading}
          </h3>
          <p className="mt-3 text-xs leading-[1.8] text-ink-soft">
            {status === "sent" && form.success.body}
            {status === "unavailable" && (
              <>
                {form.unavailable.body} {address}.
              </>
            )}
            {status === "error" && (
              <>
                {form.error.body} {form.error.fallback} {address}.
              </>
            )}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {status !== "sent" && (
              <Button variant="wonder" size="wonder" onClick={send}>
                {form.error.retry}
              </Button>
            )}
            <Button variant="wonder-outline" size="wonder" onClick={reset}>
              {form.another}
            </Button>
          </div>
        </div>
      ) : (
        <form
          noValidate
          onFocusCapture={markTouched}
          onSubmit={(e) => {
            e.preventDefault()
            send()
          }}
          className="grid gap-x-[15px] gap-y-4 sm:grid-cols-2"
        >
          <Field data-invalid={!!errors.name || undefined}>
            <FieldLabel htmlFor="enquiry-name" className={labelClass}>
              {form.fields.name}
            </FieldLabel>
            <Input
              id="enquiry-name"
              autoComplete="name"
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              aria-invalid={!!errors.name || undefined}
              className={inputClass}
            />
            <FieldError className="type-small">{errors.name}</FieldError>
          </Field>

          <Field data-invalid={!!errors.email || undefined}>
            <FieldLabel htmlFor="enquiry-email" className={labelClass}>
              {form.fields.email}
            </FieldLabel>
            <Input
              id="enquiry-email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              aria-invalid={!!errors.email || undefined}
              className={inputClass}
            />
            <FieldError className="type-small">{errors.email}</FieldError>
          </Field>

          <Field data-invalid={!!errors.type || undefined}>
            <FieldLabel htmlFor="enquiry-type" className={labelClass}>
              {form.fields.type}
            </FieldLabel>
            <Select value={values.type} onValueChange={(v) => set("type", v as EnquiryType)}>
              <SelectTrigger id="enquiry-type" aria-invalid={!!errors.type || undefined} className={cn(inputClass, "w-full data-[size=default]:h-auto")}>
                <SelectValue placeholder={form.fields.typePlaceholder} />
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                {enquiryTypes.map((t) => (
                  <SelectItem key={t.value} value={t.value} className="rounded-md text-xs">
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError className="type-small">{errors.type}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="enquiry-product" className={labelClass}>
              {form.fields.product}
              <span className="tracking-normal normal-case text-ink-muted">{form.fields.productHint}</span>
            </FieldLabel>
            <Select value={values.product} onValueChange={(v) => set("product", v)}>
              <SelectTrigger id="enquiry-product" className={cn(inputClass, "w-full data-[size=default]:h-auto")}>
                <SelectValue placeholder={form.fields.productPlaceholder} />
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                {productOptions.map((p) => (
                  <SelectItem key={p.value} value={p.value} className="rounded-md text-xs">
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field data-invalid={!!errors.message || undefined} className="sm:col-span-2">
            <FieldLabel htmlFor="enquiry-message" className={labelClass}>
              {form.fields.message}
            </FieldLabel>
            <Textarea
              id="enquiry-message"
              rows={5}
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
              aria-invalid={!!errors.message || undefined}
              className={cn(inputClass, "min-h-[130px] resize-y")}
            />
            <FieldError className="type-small">{errors.message}</FieldError>
          </Field>

          <Field orientation="horizontal" data-invalid={!!errors.consent || undefined} className="sm:col-span-2">
            <Checkbox
              id="enquiry-consent"
              checked={values.consent}
              onCheckedChange={(c) => set("consent", c === true)}
              aria-invalid={!!errors.consent || undefined}
              className="size-5 rounded-sm border-ink/40 bg-parchment"
            />
            <FieldLabel htmlFor="enquiry-consent" className="text-xs font-normal">
              {form.fields.consent}
            </FieldLabel>
          </Field>
          {errors.consent && <FieldError className="type-small -mt-2 sm:col-span-2">{errors.consent}</FieldError>}

          {/* Honeypot: hidden from people, filled by bots. */}
          <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="enquiry-gotcha">Leave this empty</label>
            <input id="enquiry-gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </div>

          <Button type="submit" variant="wonder" size="wonder" disabled={status === "submitting"} className="mt-2 w-full sm:col-span-2 sm:w-max">
            {status === "submitting" ? (
              <>
                <Loader2 aria-hidden className="size-3.5 animate-spin" /> {form.submitting}
              </>
            ) : (
              <>
                {form.submit} <ArrowRight aria-hidden className="size-3.5" />
              </>
            )}
          </Button>
        </form>
      )}
    </section>
  )
}
