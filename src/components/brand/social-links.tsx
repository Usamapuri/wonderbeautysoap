import { ArrowUpRight } from "lucide-react"
import { siFacebook, siInstagram, siTiktok, type SimpleIcon } from "simple-icons"

import { socials, type Social } from "@/content/site"
import { cn } from "@/lib/utils"

const icons: Record<Social["name"], SimpleIcon> = {
  Instagram: siInstagram,
  TikTok: siTiktok,
  Facebook: siFacebook,
}

export function SocialIcon({ name, className }: { name: Social["name"]; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-4 fill-current", className)}>
      <path d={icons[name].path} />
    </svg>
  )
}

/** Social icon links from Appendix A. Always open in a new tab (§4 global elements). */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {socials.map((s) => (
        <li key={s.name}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.name} — ${s.handle} (opens in a new tab)`}
            className="grid size-10 place-items-center text-ink transition-colors hover:text-gold"
          >
            <SocialIcon name={s.name} />
          </a>
        </li>
      ))}
    </ul>
  )
}

/** Labelled social links ("Instagram ↗") for contact details and follow CTAs. */
export function SocialTextLinks({
  only,
  stacked = false,
  className,
}: {
  only?: readonly Social["name"][]
  stacked?: boolean
  className?: string
}) {
  const list = only ? socials.filter((s) => only.includes(s.name)) : socials
  return (
    <ul className={cn("flex gap-x-7 gap-y-1", stacked ? "flex-col" : "flex-wrap justify-center", className)}>
      {list.map((s) => (
        <li key={s.name}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.name} — ${s.handle} (opens in a new tab)`}
            className="group inline-flex min-h-10 items-center gap-[11px] text-xs text-ink transition-colors hover:text-gold"
          >
            <SocialIcon name={s.name} />
            {s.name}
            <span className="text-ink-muted">{s.handle}</span>
            <ArrowUpRight aria-hidden className="size-3.5 text-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </li>
      ))}
    </ul>
  )
}
