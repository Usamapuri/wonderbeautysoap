"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

import { Eyebrow } from "@/components/brand/eyebrow"
import { home } from "@/content/home"
import { reveal } from "@/lib/reveal"

// §4.1 #4 — muted, looping campaign film. Plays only while on screen and never for reduced motion.
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
      controls
      preload="none"
      poster={home.film.poster}
      aria-label={home.film.label}
      className="block aspect-[0.98] w-full bg-clay object-cover sm:aspect-[1.6] md:aspect-[1.42]"
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}

export function CampaignFilm() {
  const { film } = home
  return (
    <section
      aria-labelledby="film-heading"
      className="grid items-center gap-[30px] bg-moss px-[22px] py-[67px] text-paper sm:gap-[38px] sm:px-[clamp(22px,8vw,128px)] sm:py-[clamp(65px,9vw,132px)] md:grid-cols-[0.7fr_1.3fr] md:gap-[clamp(40px,8vw,120px)]"
    >
      <div {...reveal()}>
        <Eyebrow tone="gilt">{film.eyebrow}</Eyebrow>
        <h2 id="film-heading" className="font-display my-7 text-[62px] leading-[0.82] tracking-[-0.045em] sm:text-[clamp(55px,7.4vw,100px)]">
          {film.heading.before}
          <br />
          <em className="text-gilt not-italic">{film.heading.emphasis}</em>
        </h2>
        <p className="max-w-[520px] text-xs leading-[1.9] text-paper/80 md:max-w-[330px]">{film.body}</p>
        <span className="mt-7 block text-[8px] uppercase tracking-[0.22em] text-gilt">{film.caption}</span>
      </div>

      <figure {...reveal(150)} className="m-0">
        <div className="relative before:pointer-events-none before:absolute before:inset-[-8px_8px_8px_-8px] before:z-10 before:border before:border-gilt/70 sm:before:inset-[-12px_12px_12px_-12px]">
          {film.src ? (
            <Film src={film.src} />
          ) : (
            <div className="relative aspect-[0.98] w-full bg-clay sm:aspect-[1.6] md:aspect-[1.42]">
              <Image src={film.poster} alt={film.label} fill sizes="(max-width: 850px) 100vw, 60vw" className="object-cover" />
            </div>
          )}
        </div>
        <figcaption className="pt-3 text-[8px] uppercase tracking-[0.15em] text-paper/70">{film.frameCaption}</figcaption>
      </figure>
    </section>
  )
}
