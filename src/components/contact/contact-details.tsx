import { Mail, MapPin, MessageCircle, Phone } from "lucide-react"

import { SocialTextLinks } from "@/components/brand/social-links"
import { contact } from "@/content/contact"
import { site } from "@/content/site"

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-[19px] border-b border-rule pb-[19px] sm:mb-7 sm:pb-7">
      <span className="mb-[15px] block text-[8px] uppercase tracking-[0.18em] text-ink-muted">{label}</span>
      {children}
    </div>
  )
}

// §4.5 #1 — direct details, above the form. Phone/WhatsApp/address only when the client supplies them.
export function ContactDetails() {
  const { details } = contact
  const linkClass = "inline-flex min-h-10 items-center gap-[11px] text-xs text-ink hover:text-gold"
  return (
    <div>
      <Detail label={details.emailLabel}>
        <a href={`mailto:${site.email}`} className={`${linkClass} underline decoration-gold underline-offset-4`}>
          <Mail aria-hidden className="size-[17px]" /> {site.email}
        </a>
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
        <p className="mt-3 max-w-[295px] text-[11px] leading-[1.8] text-ink-soft">{details.replyLine}</p>
        {contact.responseTime && <p className="mt-1 text-[11px] leading-[1.8] text-ink-soft">{contact.responseTime}</p>}
      </Detail>
      <Detail label={details.socialLabel}>
        <SocialTextLinks stacked />
      </Detail>
      <Detail label={details.goodToKnow.label}>
        <p className="max-w-[295px] text-[11px] leading-[1.8] text-ink-soft">{details.goodToKnow.text}</p>
      </Detail>
    </div>
  )
}
