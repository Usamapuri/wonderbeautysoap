import { MapPin, MessageCircle, Phone } from "lucide-react"

import { contact } from "@/content/contact"

// The strip under the enquiry card. The audit removed its email reply line and "Good to know" note
// (slide 47), so it renders only once the client supplies a phone / WhatsApp number, an address or
// a response-time line (contact.ts; null = hidden). Email sits in the bulk brief; socials below.
export function ContactDetails() {
  const { details, responseTime } = contact
  if (!details.phone && !details.whatsapp && !details.address && !responseTime) return null
  const linkClass = "inline-flex min-h-10 items-center gap-[11px] text-xs text-ink hover:text-gold"
  return (
    <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 border-t border-line pt-5 sm:mt-14">
      {responseTime && <p className="w-full text-[12px] leading-[1.8] text-ink-soft">{responseTime}</p>}
      {details.phone && (
        <a href={`tel:${details.phone.replace(/\s/g, "")}`} className={linkClass}>
          <Phone aria-hidden className="size-[17px]" /> {details.phone}
        </a>
      )}
      {details.whatsapp && (
        <a href={`https://wa.me/${details.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <MessageCircle aria-hidden className="size-[17px]" /> WhatsApp {details.whatsapp}
        </a>
      )}
      {details.address && (
        <p className="flex min-h-10 items-center gap-[11px] text-xs text-ink">
          <MapPin aria-hidden className="size-[17px] shrink-0" /> {details.address}
        </p>
      )}
    </div>
  )
}
