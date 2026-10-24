"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

import { Eyebrow } from "@/components/brand/eyebrow"
import { home } from "@/content/home"
import { reveal } from "@/lib/reveal"

// Muted, looping campaign film. Plays only while on screen and never for reduced motion.
function Film({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduced.matches) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.25 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={home.film.poster}
      aria-label={home.film.label}
      className="absolute inset-0 size-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}

// The visual between the two welcome notes (deck slides 6 + 31), as a full-width banner with the
// copy over the picture (Gisou home reference). Shows the poster until a video is supplied.
export function CampaignFilm() {
  const { film } = home
  return (
    <section aria-labelledby="film-heading" className="px-3 sm:px-5">
      <div {...reveal()} className="group relative isolate min-h-[560px] overflow-hidden rounded-lg text-paper sm:min-h-[620px] md:min-h-[min(760px,88svh)]">
        {film.src ? (
          <Film src={film.src} />
        ) : (
          <Image
            src={film.poster}
            alt={film.label}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.03]"
          />
        )}
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/25 to-transparent md:bg-linear-to-r md:from-ink/75 md:via-ink/30" />
        <div className="relative flex min-h-[inherit] flex-col justify-end p-7 sm:p-12 md:max-w-[620px] md:justify-center md:p-16">
          <Eyebrow tone="gilt">{film.eyebrow}</Eyebrow>
          <h2 id="film-heading" className="font-display my-6 text-[clamp(56px,14vw,84px)] leading-[0.88] md:text-[clamp(64px,7vw,108px)]">
            {film.heading.before}
            <br />
            <em className="text-gilt">{film.heading.emphasis}</em>
          </h2>
          <p className="max-w-[400px] text-[13px] leading-[1.8] text-paper/85">{film.body}</p>
          {film.src && <span className="mt-7 block text-[8px] uppercase tracking-[0.22em] text-gilt">{film.caption}</span>}
        </div>
      </div>
    </section>
  )
}
