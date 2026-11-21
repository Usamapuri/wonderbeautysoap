"use client"

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react"
import Image, { getImageProps } from "next/image"

type PortraitVersion = {
  /** Portrait cut of the clip and its poster, used while `query` matches (phones held upright). */
  src: string
  poster: string
  query?: string
}

type CampaignVideoProps = {
  src: string
  poster: string
  label: string
  sizes: string
  position?: string
  /** First-screen video: the poster (the LCP image) loads at once, and the clip is fetched in full
   *  as soon as it is mounted (`preload="auto"`) instead of waiting until it scrolls into view. */
  preload?: boolean
  /** Optional art direction: a portrait clip + poster for tall frames. */
  portrait?: PortraitVersion
}

const PORTRAIT_QUERY = "(max-aspect-ratio: 1/1)"
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

/** Whether `query` matches; null on the server and during hydration (not known yet), false without a query. */
function useMediaQuery(query: string | undefined) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!query) return () => {}
      const mql = window.matchMedia(query)
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    },
    [query],
  )
  return useSyncExternalStore(
    subscribe,
    () => (query ? window.matchMedia(query).matches : false),
    () => (query ? null : false),
  )
}

// Fits an existing image frame. The poster image is always rendered underneath; the <video> is laid
// over it only on the client, once it is known that motion is allowed, so with reduced motion the
// clip is never mounted and never downloaded. The video has no `poster` attribute: until its first
// frame it is transparent and the optimised poster image below shows through (no second download).
export function CampaignVideo({ src, poster, label, sizes, position = "50% 50%", preload = false, portrait }: CampaignVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)
  const query = portrait ? (portrait.query ?? PORTRAIT_QUERY) : undefined
  const isPortrait = useMediaQuery(query)
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY)
  // With art direction the clip is only chosen once the screen shape is known, so a phone never
  // downloads the landscape cut (or the other way round).
  const clip = isPortrait === null || reducedMotion !== false ? null : isPortrait && portrait ? portrait.src : src

  useEffect(() => {
    const video = ref.current
    if (!video || !clip) return
    let visible = false
    const syncPlayback = () => {
      if (visible && !document.hidden) video.play().catch(() => {})
      else video.pause()
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      syncPlayback()
    }, { threshold: 0.25 })
    observer.observe(video)
    document.addEventListener("visibilitychange", syncPlayback)
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", syncPlayback)
      video.pause()
    }
  }, [clip, failed])

  const style = { objectPosition: position }
  return (
    <>
      {portrait ? (
        <ArtDirectedPoster landscape={poster} portrait={portrait.poster} query={query!} label={label} sizes={sizes} eager={preload} position={position} />
      ) : (
        <Image src={poster} alt={label} fill sizes={sizes} preload={preload} className="object-cover" style={style} />
      )}
      {!failed && clip && (
        <video
          key={clip}
          ref={ref}
          muted
          loop
          playsInline
          preload={preload ? "auto" : "none"}
          aria-hidden="true"
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover"
          style={style}
        >
          <source src={clip} type="video/mp4" onError={() => setFailed(true)} />
        </video>
      )}
    </>
  )
}

/** Poster with art direction (Next.js `getImageProps` + `<picture>`): portrait file while `query` matches. */
function ArtDirectedPoster({
  landscape,
  portrait,
  query,
  label,
  sizes,
  eager,
  position,
}: {
  landscape: string
  portrait: string
  query: string
  label: string
  sizes: string
  eager: boolean
  position: string
}) {
  // Two candidates, so no `preload` (it would fetch both); eager + high priority instead (Image docs).
  const common = { alt: label, fill: true, sizes, ...(eager ? { loading: "eager" as const, fetchPriority: "high" as const } : {}) }
  const {
    props: { srcSet: tall },
  } = getImageProps({ ...common, src: portrait })
  const {
    props: { srcSet: wide, ...rest },
  } = getImageProps({ ...common, src: landscape })
  return (
    <picture>
      <source media={query} srcSet={tall} />
      <source srcSet={wide} />
      {/* Props from next/image's getImageProps (art direction, per the Next.js Image docs). */}
      <img {...rest} alt={label} className="object-cover" style={{ ...rest.style, objectPosition: position }} />
    </picture>
  )
}
