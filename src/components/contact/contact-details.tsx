import { MapPin, MessageCircle, Phone } from "lucide-react"

import { contact } from "@/content/contact"

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line pt-5">
      <span className="mb-3 block text-[8px] uppercase tracking-[0.18em] text-ink-muted">{label}</span>
      {children}
    </div>
  )
}

// The small print under the enquiry card, on the same width and grid: how we reply (plus phone /
// WhatsApp / address once the client supplies them) and the good-to-know line. Email sits in the
// bulk brief; socials in the band below.
export function ContactDetails() {
  const { details } = contact
  const linkClass = "inline-flex min-h-10 items-center gap-[11px] text-xs text-ink hover:text-gold"
  return (
    <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
      <Detail label={details.emailLabel}>
        <p className="max-w-[420px] text-[12px] leading-[1.8] text-ink-soft">{details.replyLine}</p>
        {contact.responseTime && <p className="mt-1 text-[12px] leading-[1.8] text-ink-soft">{contact.responseTime}</p>}
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
          <p className="mt-2 flex gap-[11px] text-xs text-ink">
            <MapPin aria-hidden className="size-[17px] shrink-0" /> {details.address}
          </p>
        )}
      </Detail>
      <Detail label={details.goodToKnow.label}>
        <p className="max-w-[420px] text-[12px] leading-[1.8] text-ink-soft">{details.goodToKnow.text}</p>
      </Detail>
    </div>
  )
}
